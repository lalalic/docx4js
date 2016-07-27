import {getable} from "../../xmlObject"
import Style from "./style/base"
import TableStyle from "./style/table"

export default class Styles{
	constructor(styles, numbering){
		styles.get('styles.style').forEach(a=>{
			a=getable(a)
			let type=a.get('$.type')
			let id=a.get('$.styleId')
			let isDefault=a.get('$.default')

			let style=this[id]=new Styles[type](a,this)
			if(isDefault)
				this[`${type}_default`]=style
		})

		let docDefault=styles.get('styles.docDefaults')
		this['document_default']=new Style({
			'pPr':docDefault.get('pPrDefault.pPr'),
			'rPr':docDefault.get('rPrDefault.rPr')
		}, this)
		
		this.numbering=new Numberings(numbering,this)
	}

	getDefault(type){
		return this[`${type}_default`]
	}

	createDirectStyle(pr, type){
		switch(type){
		case 'pPr':
			if(pr.get('numPr')==undefined)
				return new Styles.paragraph({pPr:pr}, this, 'pPr.pStyle')
			else
				return new Styles.numbering({pPr:pr}, this, 'pPr.pStyle')
		break
		case 'rPr':
			return new Styles.character({rPr:pr}, this, 'rPr.rStyle')
		break
		case 'tblPr':
			return new Styles.table({tblPr:pr}, this, 'tblPr.tblStyle')
		break
		case 'tcPr':
			return new Styles.table({tcPr:pr})
		case 'trPr':
			return new Styles.table({trPr:pr})
		case 'tblPrEx':
			return new Styles.table({tblPrEx:pr})
		default:
			return pr
		}
	}

	static paragraph=Style

	static character=Style
	
	static table=TableStyle

	static numbering=class numbering extends Styles.paragraph{
		constructor(){
			super(...arguments)
			this.numId=this.raw.get('pPr.numPr.numId')
			this.level=this.raw.get('pPr.numPr.ilvl')
		}
		
		get(path,id,level){
			if(path.substr(0,3)=='rPr')
				return super.get(path)
				
			let value=this.styles.numbering.get(path, id||this.numId,level||this.level)
			if(value==undefined)
				return super.get(...arguments)
			return value
		}
	}
}


class Numberings{
	constructor(numbering, styles){
		this.num={}
		numbering.get('numbering.num').forEach(num=>{
			let id=num.$.numId
			this.num[id]=new NumStyle(num,styles,this)
		})
			
		this.abstractNum={}
		numbering.get("numbering.abstractNum").forEach(def=>{
			let id=def.$.abstractNumId
			def.lvl.forEach(level=>{
				this.abstractNum[`${id}.${level.$.ilvl}`]=new Style(level,styles,null)
			})
		})
	}
	
	get(path,numId, level){
		return this.num[numId].get(path,level)
	}
}

class NumStyle extends Style{
	constructor(style, styles, numberings){
		super(style,styles, null)
		this.numberings=numberings
		this.abstractNumId=style.get("abstractNumId")
		;(style.get('lvlOverride')||[]).forEach(a=>{
			let level=a.$.ilvl
			let lvl=a.get('lvl')||{lvl:{$:{ilvl:level}}}, startOverride=a.get('startOverride')
			if(startOverride)
				lvl.lvl.start={$:{val:startOverride}}
			
			this[level]=new Style(lvl,styles,null)
		})
	}
	
	get(path,level){
		let value=undefined, style=this[level]
		if(style)
			value=style.get(path)
		
		if(value==undefined && (style=this.numberings.abstractNum[`${this.abstractNumId}.${level}`]))
			value=style.get(path)
		return value	
	}
}
