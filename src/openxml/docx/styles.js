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
			'w:pPr':docDefault.get('pPrDefault.pPr'),
			'w:rPr':docDefault.get('rPrDefault.rPr') 
		}, this)
	}
	
	getDefault(type){
		return this[`${type}_default`]
	}
	
	static paragraph=Style
	
	static character=Style
	
	static numbering=Style
	
	static table=TableStyle
}

