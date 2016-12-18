import Part from "../part"
import cheer from "cheerio"
import React from "react"
import ReactDOM from "react-dom"
import EventEmitter from "events"
import {Parser, DomHandler} from "htmlparser2"
import defaultIdentify from "./factory"

export default class extends Part{
	_init(){
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})
	}

	render(container,customziedComponents={}){
		const render=(node,key=0)=>{
			const {tagName, childNodes,type}=node
			if(type=="text")
				return <span>{node.data}</span>
			return React.createElement(customizedComponents[tagName]||getComponent(tagName),{key,children: childNodes ? childNodes.map((a,i)=>render(a,i)) : []})
		}

		const buffer=this.doc.getPart(this.name).asNodeBuffer()
		let content=cheer.load(buffer,{xmlMode:true})

		return ReactDOM.render(render(content("w\\:document").get(0)), container)
	}

	parser(identify=defaultIdentify){
		let opt={xmlMode:true}
		let emitter=new EventEmitter()
		let buffer=this.doc.getPart(this.name).asNodeBuffer()
		let handler=new DomHandler(opt,el=>{
			if(el.name){
				if(identify)
					emitter.emit(identify(el,this),el,this)
				else
					emitter.emit(el.name,el,this)
			}
		})
		let parser=new Parser(handler,opt)
		return {
			start(){
				parser.end(buffer)
				return this
			},
			on(){
				emitter.on(...arguments)
				return this
			}
		}
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
