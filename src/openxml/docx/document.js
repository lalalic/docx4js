import Factory from './factory'
import FontTheme from './theme/font'
import ColorTheme from './theme/color'
import FormatTheme from './theme/format'

import Table from "./model/table"
import List from "./model/list"

export default class document extends require('../document'){
	constructor(){
		super(...arguments)
		var rels=this.rels,
			builtIn='settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',')
		$.each(this.partMain.rels,function(id,rel){
			builtIn.indexOf(rel.type)!=-1 && (rels[rel.type]=rel.target)
		})
	}

	static clone(doc){
		let {parts,raw,props,rels,partMain}=doc
		return new document(parts,raw,props)
	}

	static get ext(){return 'docx'}

	parse(visitFactories){
		super.parse(...arguments)
		this.style=new this.constructor.Style()
		this.parseContext={
			section: new ParseContext(),
			part:new ParseContext(this.partMain),
			bookmark: new ParseContext(),
			numbering: new List.Context(this),
			table: new Table.Context(this),
			field: (function(ctx){
				ctx.instruct=function(t){
					this[this.length-1].instruct(t)
				}
				ctx.seperate=function(model){
					this[this.length-1].seperate(model)
				}
				ctx.end=function(endModel, endVisitors){
					this.pop().end(...arguments)
				}
				return ctx
			})([])
		}
		this.content=this.factory(this.partMain.documentElement, this)
		var roots=this.content.parse($.isArray(visitFactories) ? visitFactories : $.toArray(arguments))
		this.release()
		return roots.length==1 ? roots[0] : roots
	}
	getRel(id){
		return this.parseContext.part.current.getRel(id)
	}
	getColorTheme(){
		if(this.colorTheme)
			return this.colorTheme
		return this.colorTheme=new ColorTheme(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'))
	}
	getFontTheme(){
		if(this.fontTheme)
			return this.fontTheme
		return this.fontTheme=new FontTheme(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'))
	}
	getFormatTheme(){
		if(this.formatTheme)
			return this.formatTheme
		return this.formatTheme=new FormatTheme(this.getPart('theme').documentElement.$1('fmtScheme'), this)
	}
	release(){
		delete this.parseContext

		super.release(...arguments)
	}

	static get type(){return "Word"}

	static get Style(){return Style}

	static Factory=Factory
}

function Style(){
	var ids={},defaults={}
	Object.assign(this,{
		setDefault: function(style){
			defaults[style.type]=style
		},
		getDefault: function(type){
			return defaults[type]
		},
		get: function(id){
			return ids[id]
		},
		set: function(style, id){
			ids[id||style.id]=style
		}
	})
}

class ParseContext{
	constructor(current){
		this.current=current
	}
}
