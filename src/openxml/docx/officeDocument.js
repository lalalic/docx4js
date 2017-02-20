import Part from "../part"

export class OfficeDocument extends Part{
	_init(){
		super._init()
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			this[type]=this.getRelObject($.attr("Target"))
		})
	}

	render(createElement, identify=OfficeDocument.identify){
		Object.freeze(this.content)
		return this.renderNode(this.content("w\\:document").get(0),...arguments)
	}

	parse(domHandler,identify=officeDocument.identify){
		const doc={}
		const createElement=domHandler.createElement.bind(domHandler)
		function _identify(){
			let model=identify(...arguments)
			if(model && typeof(model)=="object"){
				domHandler.emit("*",model,...arguments)
				domHandler.emit(model.type, model,...arguments)
				if(domHandler[`on${model.type}`])
					domHandler[`on${model.type}`](model,...arguments)
			}
			return model
		}

		doc.document=this.renderNode(this.content("w\\:document").get(0),createElement,_identify)
		if(this.styles)
			doc.styles=this.renderNode(this.styles("w\\:styles").get(0),createElement,_identify)
		if(this.numbering)
			doc.numbering=this.renderNode(this.numbering("w\\:numbering").get(0),createElement,_identify)
		return doc
	}

	addImage(data){
		const type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"
		let id=`rId${Math.max(...this.rels('Relationship').toArray().map(a=>parseInt(a.attribs.Id.substring(3))))+1}`

		let targetName="media/image"+(Math.max(...this.rels("Relationship[Type$='image']").toArray().map(t=>{
			return parseInt(t.attribs.target.match(/\d+/)[0]||"0")
		}))+1)+".jpg";

		let partName=`${this.folder}/${targetName}`
		this.doc.raw.file(partName, data)
		this.doc.parts[partName]=this.doc.raw.file(partName)

		this.rels("Relationships")
			.append(`<Relationship Type="${type}" Id="${id}" Target="${partName}"/>`)

		return id
	}

	addExternalImage(url){
		const type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"

		let id=`rId${Math.max(...this.rels('Relationship').toArray().map(a=>parseInt(a.substring(3))))+1}`

		this.rels("Relationships")
			.append(`<Relationship Type="${type}" Id="${id}" TargetMode="External" Target="${url}"/>`)

		return id
	}

	static identify(wXml, officeDocument){
		const tag=wXml.name.split(":").pop()
		if(identities[tag])
			return identities[tag](...arguments)||tag

		return tag
	}
}

export default OfficeDocument

const identities={
	document(wXml){
		return {type:"document", children: wXml.children[0].children}
	},
	p(wXml,officeDocument){
		let $=officeDocument.content(wXml)
		let type="p"

		let identity={type,pr:wXml.children.find(({name})=>name=="w:pPr"),children:wXml.children.filter(({name})=>name!="w:pPr")}

		let pPr=$.find("w\\:pPr")
		if(pPr.length){
			let styleId=pPr.find("w\\:pStyle").attr("w:val")

			let numPr=pPr.find("w\\:numPr")
			if(!numPr.length && styleId){
				numPr=officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:numPr`)
			}

			if(numPr.length){
				identity.type="list"
				identity.numId=numPr.find("w\\:numId").attr("w:val")
				identity.level=numPr.find("w\\:ilvl").attr("w:val")
			}else{
				let outlineLvl=pPr.find("w\\:outlineLvl").attr("w:val")
				if(!outlineLvl && styleId)
					outlineLvl=officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:outlineLvl`).attr("w:val")

				if(outlineLvl){
					identity.type="heading"
					identity.level=parseInt(outlineLvl)+1
				}
			}
		}

		return identity
	},
	r(wXml){
		return {type:"r", pr: wXml.children.find(({name})=>name=="w:rPr"), children: wXml.children.filter(({name})=>name!="w:rPr")}
	},
	fldChar(wXml){
		return wXml.attribs["w:fldCharType"]
	},
	inline(wXml,officeDocument){
		let $=officeDocument.content(wXml)
		let type=$.find('a\\:graphic>a\\:graphicData').attr('uri').split('/').pop()
		let props={type:`inline.${type}`, children:null}
		switch(type){
		case "picture":
			let rid=$.find('a\\:blip').attr('r:embed')
			Object.assign(props,officeDocument.getRel(rid))
		break
		}
		return props
	},
	sdt(wXml,officeDocument){
		let $=officeDocument.content(wXml)
		let pr=$.find('>w\\:sdtPr')
		let content=$.find('>w\\:sdtContent')
		let children=content.children().toArray()

		let elBinding=pr.find('w\\:dataBinding').get(0)
		if(elBinding){//properties
			let path=elBinding.attribs['w:xpath'],
				d=path.split(/[\/\:\[]/),
				name=(d.pop(),d.pop());
			let value=content.text()

			return {type:"property", name, value, children}
		}else{//controls
			let prChildren=pr.get(0).children
			let elType=prChildren[prChildren.length-1]
			let name=elType.name.split(":").pop()
			let type="text,picture,docPartList,comboBox,dropDownList,date,checkbox".split(",")
				.find(a=>a==name)
			if(type)
				return {type:`control.${type}`, children:null}
			else{//container
				if(content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length){
					return {type:"block", children}
				}else{
					return {type:"inline", children}
				}
			}
		}
	},
	hyperlink(wXml,officeDocument){
		let url=officeDocument.getRel(wXml.attribs["r:id"])
		return {type:"hyperlink", url}
	},
	tbl(wXml){
		return wXml.children.reduce((state,node)=>{
			switch(node.name){
			case "w:tblPr":
				state.pr=node
			break
			case "w:tblGrid":
				state.cols=node.children
			break
			default:
				state.children.push(node)
			}
			return state
		},{type:"tbl",children:[],pr:null,cols:[]})
	},
	tr(wXml){
		return wXml.children.reduce((state,node)=>{
			switch(node.name){
			case "w:trPr":
				state.pr=node
				state.isHeader=!!node.children.find(a=>a.name=="w:tblHeader")
			break
			default:
				state.children.push(node)
			}
			return state
		},{type:"tr",children:[],pr:null})
	},
	rPrDefault(wXml){
		return {type:"style",id:"*r"}
	},
	pPrDefault(wXml){
		return {type:"style",id:"*p"}
	},
	style(wXml){
		return {type:"style", id:wXml.attribs['w:styleId']}
	},
	abstractNum(wXml){
		return {type:"numbering",id:wXml.attribs["w:abstractNumId"],children:wXml.children.filter(a=>a.name=="w:lvl")}
	},
	num(wXml){
		return {type:"style",id:wXml.attribs["w:numId"],numbering:wXml.children.find(a=>a.name=="w:abstractNumId").attribs["w:val"]}
	},
	latentStyles(){
		return null
	}
}
