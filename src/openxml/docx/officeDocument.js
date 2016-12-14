import Part from "../part"
import {load as parse} from "cheerio"
import React from "react"

export default class extends Part{
	_init(){
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})

		const buffer=this.doc.getPart(this.name).asNodeBuffer()
		this.content=parse(buffer,{xmlMode:true})
	}

	render(container){
		const render=node=>{
			const {tagName, childNodes}=node
			return React.createElement(getComponent(tagName),{children: childNodes ? childNodes.map(a=>render(a)) : []})
		}

		return render(this.content("w\\:document"))
	}
}

const getComponent=name=>{
	let existing=getComponent[name]
	if(existing)
		return existing
	let Type=props=>null
	Type.displayName=name
	return getComponent[name]=Type
}
