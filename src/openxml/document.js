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

	onToProperty(node, type){
		return node
	}

	toProperty(node,type){
		return getable(this.onToProperty(node))
	}

	parse(){
		const parts=this.parts
		return this.getObjectPart("[Content_Types].xml")
			.then(o=>parts["[Content_Types].xml"]=o)
			.then(a=>this.officeDocument.parse())
	}

	dxa2Px(a){
		return this.pt2Px(parseInt(a)/20.0)
	}

	pt2Px(pt){
		return Math.ceil(pt*96/92)
	}
	static OfficeDocument=Part
}
