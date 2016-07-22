import Base from "../document"
import {getable} from "../xmlObject"
import Part from './part'

export default class extends Base{
	constructor(){
		super(...arguments)
		var rels=new Part("",this).rels
		this.rels={}
		Object.keys(rels).forEach(id=>{
			let rel=rels[id]
			this.rels[rel.type]=rel.target
		})
		this.officeDocument=new this.constructor.OfficeDocument(this.rels['officeDocument'],this)
	}
	get vender(){"Microsoft"}

	get product(){return 'Office 2010'}

	createElement(node){
		return node
	}

	isProperty(tag){
		return tag.substr(-2)=='Pr'
	}

	onToProperty(node){
		let pr=Object.assign({},node)
		pr.$=pr.attributes
		delete pr.attributes
		delete pr.name
		delete pr.parent
		return pr
	}

	toProperty(node){
		return getable(this.onToProperty(node))
	}

	parse(){
		const parts=this.parts
		return this.getObjectPart("[Content_Types].xml")
			.then(o=>parts["[Content_Types].xml"]=o)
			.then(a=>this.officeDocument.parse())
	}

	static OfficeDocument=Part
}
