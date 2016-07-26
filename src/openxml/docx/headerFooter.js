import Part from "../part"

export default class extends Part{
	constructor(name,doc, type){
		super(name,doc)
		this.type=type
	}
	parse(){
		return new Promise(resolve=>{
			let root={
				children:[]
			}
			let  pr=null, current=root
			this.getContentStream()
			.on("opentag", node=>{
				node.parent=current
				current=node
				
				if(this.doc.isProperty(node) && pr==null){
					pr=node
				}

				if(pr==null){
					node.children=[]
					node.parent.children.push(node)
				}
			})
			.on("closetag",tag=>{
				const {attributes, parent, children, local,name}=current
				if(tag=='w:hdr' || tag=='w:ftr'){
					attributes.type=this.type
				}
				
				if(pr==null){
					let index=parent.children.indexOf(current)
					attributes.key=index
					let element=this.doc.createElement(current)

					parent.children.splice(index,1,element)
					current=parent
				}else if(current==pr){
					let type=tag.split(':').pop()
					let property=this.doc.toProperty(this.asXmlObject(current),type)
					current=parent
					if(tag.substr(-2)=='Pr')
						current.attributes.directStyle=property
					else
						current.attributes[type]=property
					pr=null
				}else{
					let type=tag.split(':').pop()
					let value=this.doc.onToProperty(this.asXmlObject(current),type)
					if(parent[type]==undefined)
						parent[type]=value
					else if(Array.isArray(parent[type]))
						parent[type].push(value)
					else 
						parent[type]=[parent[type],value]
					
					current=parent
				}
			})
			.on("end", a=>{
				resolve(root.children[0])
			})
			.on("text", text=>{
				if(current.name=="w:t")
					current.children=text
			})
		})
	}
}