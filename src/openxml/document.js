import Base from "../document"

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
		this.partMain=new Part(this.rels['officeDocument'],this)
	}
	get vender(){"Microsoft"}

	get product(){return 'Office 2010'}

	getPart(name){
		var part=this.parts[name] || ((name=this.rels[name])&&this.parts[name])
		if(!part)
			return null

		if(Part.is(part))
			return part

		return this.parts[name]=new Part(name,this)
	}
}

