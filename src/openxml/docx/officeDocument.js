import Part from "../part"
import EventEmitter from "events"
import {identify as defaultIdentify, createElement as defaultCreateElement} from "./factory"

export default class extends Part{
	_init(){
		super._init()
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})
	}

	render(){
		Object.freeze(this.content)
		return this.renderNode(this.content("w\\:document").get(0),...arguments)
	}

	renderNode(node, createElement=defaultCreateElement, identify=defaultIdentify){
		let {name:tagName, children,id, parent}=node
		if(node.type=="text"){
			if(parent.name=="w:t"){
				return node.data
			}
			return null
		}

		let type=tagName
		let props={}

		if(identify){
			let model=identify(node,this)
			if(!model)
				return null

			if(typeof(model)=="string"){
				type=model
			}else{
				let content;
				({type, children:content, ...props}=model);
				if(content!==undefined)
					children=content
			}
		}
		props.key=id
		props.node=node
		props.type=type
		
		let childElements=[]
		if(children && children.length){
			childElements=children.map(a=>a ? this.renderNode(a,createElement,identify) : null)
				.filter(a=>!!a)
		}

		return createElement(
				type,
				props,
				childElements
			)
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
