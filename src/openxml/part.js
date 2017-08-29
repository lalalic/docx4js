import * as OLE from "./ole"

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
			let url=this.doc.getDataPartAsUrl(this.folder+target, "image/*")
			let crc32=this.doc.getPartCrc32(this.folder+target)
			return {url,crc32}
		default:
			if(target.endsWith(".xml"))
				return this.getRelObject(target)
			else
				return this.doc.getPart(this.folder+target)
		}
	}

	_nextrId(){
		return Math.max(...this.rels('Relationship').toArray().map(a=>parseInt(a.attribs.Id.substring(3))))+1
	}

	addImage(data){
		const type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"
		let id=`rId${this._nextrId()}`

		let targetName="media/image"+(Math.max(...this.rels("Relationship[Type$='image']").toArray().map(t=>{
			return parseInt(t.attribs.target.match(/\d+/)[0]||"0")
		}))+1)+".jpg";

		let partName=`${this.folder}${targetName}`
		this.doc.raw.file(partName, data)
		this.doc.parts[partName]=this.doc.raw.file(partName)

		this.rels("Relationships")
			.append(`<Relationship Id="${id}" Type="${type}" Target="${partName}"/>`)

		return id
	}

	addExternalImage(url){
		const type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"

		let id=`rId${this._nextrId()}`

		this.rels("Relationships")
			.append(`<Relationship Id="${id}" Type="${type}" TargetMode="External" Target="${url}"/>`)

		return id
	}

	addChunk(data, relationshipType, contentType, ext){
		relationshipType=relationshipType||"http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk"
		contentType=contentType||this.doc.constructor.mime
		ext=ext||this.doc.constructor.ext

		let id=this._nextrId()
		let rId=`rId${id}`
		let targetName=`chunk/chunk${id}.${ext}`
		let partName=`${this.folder}${targetName}`
		this.doc.raw.file(partName, data)
		this.doc.parts[partName]=this.doc.raw.file(partName)

		this.rels("Relationships")
			.append(`<Relationship Id="${rId}" Type="${relationshipType}" Target="${targetName}"/>`)

		this.doc.contentTypes
			.append(`<Override PartName="/${partName}" ContentType="${contentType}"/>`)

		return rId
	}
	
	getRelOleObject(rid){
		let rel=this.rels(`Relationship[Id=${rid}]`)
		let type=rel.attr("Type")
		let targetName=rel.attr("Target")
		let data=this.doc.getDataPart(`${this.folder}${targetName}`)
		switch(type.split("/").pop()){
			case "oleObject":
				return OLE.parse(data)
			default:
				return data
		}
		
	}
	
	removeRel(id){
		let rel=this.rels(`Relationship[Id="${id}"]`)
		if(rel.attr("TargetMode")!=="External"){
			let partName=this.folder+rel.attr("Target")
			this.doc.contentTypes.find(`[PartName='/${partName}']`).remove()
			this.doc.raw.remove(partName)
			delete this.doc.parts[partName]
		}
		rel.remove()
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
