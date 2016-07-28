import {getable} from "../../xmlObject"
import Style from "./style/base"
import TableStyle from "./style/table"
import Numberings from "./style/numbering"

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
		
		this.numberings=new Numberings(numbering,this)
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
			let value=undefined
			
			if(path=="label"){
				return this.styles.numberings.get(path, id||this.numId,level||this.level)
			}else if(path.substr(0,6)=='label.'){
				value=this.styles.numberings.get(path.substr(6), id||this.numId,level||this.level)
				if(value==undefined)
					return super.get(path.substr(6), id||this.numId,level||this.level)
			}else{
				if(path.substr(0,3)=='rPr')
					return super.get(path)
					
				value=this.styles.numberings.get(path, id||this.numId,level||this.level)
				
				if(value==undefined)
					value=super.get(...arguments)
			}
			return value
		}
	}
}

