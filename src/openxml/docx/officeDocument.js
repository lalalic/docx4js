import Part from "../part"
import {load as parse} from "cheerio"
import React from "react"
import ReactDOM from "react-dom"

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

	render(container,customziedComponents={}){
		const render=(node,key=0)=>{
			const {tagName, childNodes,type}=node
			if(type=="text")
				return <span>{node.data}</span>
			return React.createElement(customizedComponents[tagName]||getComponent(tagName),{key,children: childNodes ? childNodes.map((a,i)=>render(a,i)) : []})
		}

		return ReactDOM.render(render(this.content("w\\:document").get(0)), container)
	}
	
	parse(){
		
	}
	
	getComponent(tagName){
		return getComponent(...arguments)
	}
}

const getComponent=name=>{
	let existing=getComponent[name]
	if(existing)
		return existing
	let Type=({children})=>{
		if(children){
			if(children.length==1){
				return children[0]
			}else{
				return (<div>{children}</div>)
			}
		}else{
			return null
		}
	}
	Type.displayName=name
	return getComponent[name]=Type
}
