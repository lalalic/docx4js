import Style from '../style'
import Inline from './inline'

export default class NumberingDefinition extends Style{
	constructor(wXml){
		super(...arguments)
		this.levels=[]

		this.name=this.id=this.constructor.asStyleId(wXml.attr('w:abstractNumId'))
		this.wDoc.style.set(this)
		var link=wXml.$1('numStyleLink')
		if(link)
			this.link=link.attr('w:val')
	}
	_iterate(f, factories, visitors){
		for(var i=0,children=this.wXml.$('lvl'),l=children.length, t; i<l; i++){
			this.levels.push(t=new this.constructor.Level(children[i],this.wDoc, this))
			t.parse(visitors)
		}
	}
	getDefinitionId(){
		return this.wXml.attr('w:abstractNumId')
	}

	static asStyleId(absNumId){
		return '_numberingDefinition'+absNumId
	}

	static get type(){return 'style.numbering.definition'}

	static get Level(){return Level}
}

class Level extends Style.Properties{
	constructor(wXml){
		super(...arguments)
		this.type=wXml.attr('w:ilvl')
	}
	parse(visitors){
		super.parse(...arguments)
		var t,pr;
		if(t=this.wXml.$1('>pPr')){
			pr=new (require('./paragraph').Properties)(t,this.wDoc,this)
			pr.type=this.type+' '+pr.type
			pr.parse(...arguments)
		}

		if(t=this.wXml.$1('>rPr')){
			pr=new Inline.Properties(t,this.wDoc,this)
			pr.type=this.type+' '+pr.type
			pr.parse(...arguments)
		}
	}
	start(x){
		return parseInt(x.attr('w:val'))
	}
	numFm(x){
		return x.attr('w:val')
	}
	lvlText(x){
		return x.attr('w:val')
	}
	lvlJc(x){
		return x.attr('w:val')
	}
	lvlPicBulletId(x){
		return x.attr('w:val')
	}
}
