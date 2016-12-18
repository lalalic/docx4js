import Part from "../part"
import React from "react"
import EventEmitter from "events"
import defaultIdentify from "./factory"

const getComponent=name=>{
	let existing=getComponent[name]
	if(existing)
		return existing
	let Type=props=>null
	Type.displayName=name
	return getComponent[name]=Type
}

export default class extends Part{
	_init(){
		super._init()
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})
	}

	render(createComponent=getComponent){
		const render=node=>{
			const {tagName, children,type,id:key, parent}=node
			if(type=="text"){
				if(parent.name=="w:t"){
					return node.data
				}
				return null
			}

			return React.createElement(
					createComponent(tagName),
					{key},
					...(children ? children.map((a,i)=>render(a,i)).filter(a=>!!a) : [])
				)
		}

		return render(this.content("w\\:document").get(0))
	}

	parser(identify=defaultIdentify){
		let opt={xmlMode:true}
		let emitter=new EventEmitter()
		let buffer=this.doc.getPart(this.name).asNodeBuffer()
		let handler=new DocDomHandler(opt,el=>{
			if(el.name){
				if(identify){
					let type=identify(el,this)

					emitter.emit(identify(el,this),el,this)

				}else
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
			,get dom(){
				return handler.dom
			}
		}
	}
}
