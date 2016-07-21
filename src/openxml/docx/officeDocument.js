import {PassThrough} from "stream"
import sax from "sax"
import Part from "../part"

const builtIn='settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',')
export default class extends Part{
	parse(){
		let args=arguments
		return Promise.all(Object.keys(this.rels).map(id=>{
			let rel=this.rels[id]
			if(builtIn.indexOf(rel.type)!=-1){
				return this.doc.getObjectPart(rel.target)
					.then(parsed=>this[rel.type]=parsed)
			}
		}).filter(a=>a)).then(a=>{
			return new Promise(resolve=>{
				let root={
					name:this.doc.constructor.ext,
					children:[]
				}
				let body=null, sect=null, pr=null, current=root
				let sections=[]

				let stream=new PassThrough()
				stream.end(new Buffer(this.data.asUint8Array()))
				stream.pipe(sax.createStream(true,{xmlns:false}))
				.on("opentag", node=>{
					node.children=[]

					current.children.push(node)
					node.parent=current

					current=node

					switch(node.name){
					case 'w:body':
						body=current
					break
					case 'w:sectPr':
						pr=sect=current
					break
					default:
						if(this.doc.isProperty(node.name) && pr==null)
							pr=current
					}
				})
				.on("closetag",tag=>{
					const {attributes, parent, children, local,name}=current
					if(pr==null){
						let index=parent.children.indexOf(current)
						attributes.key=index
						let element=this.doc.createElement(current,...args)

						parent.children.splice(index,1,element)
						current=parent
					}else if(current==pr){
						let property=this.doc.toProperty(current)
						current=parent
						if(pr!=sect)
							current.attributes.contentStyle=property
						else
							sect=property
						pr=null
					}else
						current=parent

					if(current==body && sect!=null){
						sections.push(this.doc.createElement({name:'section', attributes: sect, children: body.children.splice(0)},...args))
						sect=null
					}

				})
				.on("end", a=>{
					current.children[0].children=sections
					current.attributes=this
					resolve(this.doc.createElement(current,...args))
				})
				.on("text", text=>{
					if(current.parent && current.parent.name=="w:t")
						current.children.push(text)
				})
			})
		})
	}
}