export default class Part{
	constructor(name,doc){
		this.name=name
		this.doc=doc

		let folder=""
		let relName="_rels/"+name+".rels"
		let i=name.lastIndexOf('/')
			
		if(i!==-1){
			folder=name.substring(0,i+1)
			relName=folder+"_rels/"+name.substring(i+1)+".rels";
		}

		if(doc.parts[relName]){
			this.folder=folder
			this.relName=relName
			Object.defineProperty(this,"rels",{
				get(){
					return this.doc.getObjectPart(this.relName)
				}
			})
		}
		this._init()
	}

	_init(){
		Object.defineProperty(this,"content",{
			get(){
				return this.doc.getObjectPart(this.name)
			}
		})
	}

	getRelTarget(type){
		return this.rels(`[Type$="${type}"]`).attr("Target")
	}

	getRelObject(target){
		return this.doc.getObjectPart(this.folder+target)
	}

	getRel(id){
		var rel=this.rels(`Relationship[Id="${id}"]`)
		var target=rel.attr("Target")
		if(rel.attr("TargetMode")==='External')
			return {url:target}

		switch(rel.attr("Type").split("/").pop()){
		case 'image':
			let data=this.doc.getDataPart(this.folder+target)
			let url=URL.createObjectURL(new Blob([data],{type:"image/*"}))
			return {url, crc32: data.crc32}
		default:
			return this.getRelObject(target)
		}
	}

	renderNode(node, createElement=(type,props,children)=>{type,props,children},identify=node=>node.name.split(":").pop()){
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
}
