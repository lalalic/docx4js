import {getable} from "../../xmlObject"
import Style from "./style/base"
import TableStyle from "./style/table"

export default class Styles{
	constructor(styles){
		this.styles=styles
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
	}

	getDefault(type){
		return this[`${type}_default`]
	}

	createDirectStyle(pr, type){
		switch(type){
		case 'pPr':
			return new Styles.paragraph({pPr:pr}, this, 'pPr.pStyle')
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

	static numbering=Style

	static table=TableStyle
}
