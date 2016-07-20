import {PassThrough} from "stream"
import sax from "sax"

import Base from "../document"

import FontTheme from './theme/font'
import ColorTheme from './theme/color'
import FormatTheme from './theme/format'

export default class extends Base{
	static get ext(){return 'docx'}

	constructor(){
		super(...arguments)
		var rels=this.rels,
			builtIn='settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',')
		Object.keys(this.partMain.rels).forEach(id=>{
			let rel=this.partMain.rels[id]
			if(builtIn.indexOf(rel.type)!=-1)
				this.getObjectPart(rel.target)
					.then(parsed=>{
						this[rel.type]=parsed
					})
		})
	}

	get colorTheme(){
		if(this._colorTheme)
			return this._colorTheme
		return this._colorTheme=new ColorTheme(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'))
	}

	get fontTheme(){
		if(this._fontTheme)
			return this._fontTheme
		return this.fontTheme=new FontTheme(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'))
	}
	get formatTheme(){
		if(this.formatTheme)
			return this.formatTheme
		return this.formatTheme=new FormatTheme(this.getPart('theme').documentElement.$1('fmtScheme'), this)
	}

	createElement(node){
		return node
	}

	isProperty(name){
		return name.substr(-2)=='Pr'
	}

	toProperty(node){
		let {attributes, children}=node;
		(children||[]).forEach(a=>attributes[a.name]=this.toProperty(a))
		return attributes
	}

	parse(){
		var args=arguments
		return new Promise((resolve, reject)=>{
			let docx={
				name:"docx",
				attributes:{
					styles: this.styles.get('w:styles'),
					numbering: this.numbering && this.numbering.get('w:numbering')
				},
				children:[]
			}
			let body=null, sect=null, pr=null, current=docx
			let sections=[]

			let stream=new PassThrough()
			stream.end(new Buffer(this.partMain.data.asUint8Array()))
			stream.pipe(sax.createStream(true,{xmlns:false}))
			.on("opentag", node=>{
				node.children=[]

				current.children.push(node)
				node.parent=current

				current=node

				switch(node.name){
				case 'w:body':
					body=current
				break
				case 'w:sectPr':
					pr=sect=current
				break
				default:
					if(this.isProperty(node.name) && pr==null)
						pr=current
				}
			})
			.on("closetag",tag=>{
				const {attributes, parent, children, local,name}=current
				if(pr==null){
					let index=parent.children.indexOf(current)
					attributes.key=index
					let element=this.createElement(current,...args)

					parent.children.splice(index,1,element)
					current=parent
				}else if(current==pr){
					let property=this.toProperty(current)
					current=parent
					if(pr!=sect)
						current.attributes.contentStyle=property
					else
						sect=property
					pr=null
				}else
					current=parent

				if(current==body && sect!=null){
					sections.push(this.createElement({name:'section', attributes: sect, children: body.children.splice(0)},...args))
					sect=null
				}

			})
			.on("end", a=>{
				if(current!=docx)
					throw new Error("it should be docx")

				docx.children[0].children=sections
				resolve(this.createElement(docx,...args))
			})
			.on("text", text=>{
				if(current.parent && current.parent.name=="w:t")
					current.children.push(text)
			})
		})
	}
}
