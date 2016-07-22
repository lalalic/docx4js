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
		let {attributes, children}=node;
		(children||[]).forEach(a=>{
			let v=this.onToProperty(a)
			if(v!=undefined)
				attributes[a.name]=v
		})
		return attributes
	}

	toProperty(node){
		return getable(this.onToProperty(node))
	}
	
	parse(){
		const parts=this.parts
		let p1=this.getObjectPart("[Content_Types].xml")
			.then(o=>parts["[Content_Types].xml"]=o)
			
		let p2=Promise.all(Object.keys(this.rels).map(key=>{
			let target=this.rels[key]
			return this.getObjectPart(target)
				.then(o=>parts[target]=this.rels[key]=o)
		}))
				
		return Promise.all([p1, p2]).then(a=>this.officeDocument.parse())
	}
	
	static OfficeDocument=Part
}

