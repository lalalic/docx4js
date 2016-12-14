import Part from "../part"
import parse from "cheerio"

export default class extends Part{
	_init(){
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})

		const buffer=this.doc.getPart(this.name).asNodeBuffer()
		this.content=parse("w\\:document",buffer,{xmlMode:true})
	}

	render(container){

	}
}
