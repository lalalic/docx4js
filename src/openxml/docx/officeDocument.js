import Part from "../part"

export class OfficeDocument extends Part{
	_init(){
		super._init()
		const supported="styles,numbering,theme,settings".split(",")
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			if(supported.indexOf(type)!=-1){
				let target=$.attr("Target")
				Object.defineProperty(this,type,{
					get(){
						return this.getRelObject(target)
					}
				})
			}
		})
	}

	render(createElement, identify=OfficeDocument.identify){
		if(this.styles)
			this.renderNode(this.styles("w\\:styles").get(0),createElement,identify)
		if(this.numbering)
			this.renderNode(this.numbering("w\\:numbering").get(0),createElement,identify)
		return this.renderNode(this.content("w\\:document").get(0),createElement, identify)
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

		if(this.styles)
			doc.styles=this.renderNode(this.styles("w\\:styles").get(0),createElement,_identify)
		if(this.numbering)
			doc.numbering=this.renderNode(this.numbering("w\\:numbering").get(0),createElement,_identify)
		doc.document=this.renderNode(this.content("w\\:document").get(0),createElement,_identify)
		return doc
	}

	static identify(wXml, officeDocument){
		const tag=wXml.name.split(":").pop()
		if(identities[tag])
			return identities[tag](...arguments)

		return tag
	}
}

export default OfficeDocument

const identities={
	document(wXml,officeDocument){
		let $=officeDocument.content
		let current=null
		let children=$("w\\:sectPr").each((i,sect)=>{
			let end=$(sect).closest('w\\:body>*')
			sect.content=end.prevUntil(current).toArray().reverse()
			if(!end.is(sect))
				sect.content.push(end.get(0))
			current=end
		}).toArray()
		return {type:"document", children}
	},
	sectPr(wXml,officeDocument){
		const hf=type=>wXml.children.filter(a=>a.name==`w:${type}Reference`).reduce((headers,a)=>{
				headers.set(a.attribs["w:type"],officeDocument.getRel(a.attribs["r:id"]))
				return headers
			},new Map())

		return {
			type:"section",
			children:wXml.content,
			headers:hf("header"),
			footers:hf("footer"),
			hasTitlePage: !!wXml.children.find(a=>a.name=="w:titlePg")
		}
	},
	p(wXml,officeDocument){
		let $=officeDocument.content(wXml)
		let type="p"

		let identity={type,pr:wXml.children.find(({name})=>name=="w:pPr"),children:wXml.children.filter(({name})=>name!="w:pPr")}

		let pPr=$.find("w\\:pPr")
		if(pPr.length){
			let styleId=pPr.find("w\\:pStyle").attr("w:val")

			let numPr=pPr.find("w\\:numPr>w\\:numId")
			if(!numPr.length && styleId){
				numPr=officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:numPr>w\\:numId`)
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
		return {type:`drawing.inline`, children:$.find('a\\:graphic>a\\:graphicData').children().toArray()}
	},
	anchor(wXml, officeDocument){
		let $=officeDocument.content(wXml)
		let graphicData=$.find('a\\:graphic>a\\:graphicData')
		let type=graphicData.attr("uri").split("/").pop()
		let children=graphicData.children().toArray()
		if(type=="wordprocessingGroup")
			children=children[0].children.filter(a=>a.name.split(":")[0]!="wpg")

		return {type:"drawing.anchor",children}
	},
	pic(wXml, officeDocument){
		let blip=officeDocument.content(wXml).find("a\\:blip")
		let rid=blip.attr('r:embed')||blip.attr('r:link')
		return {type:"picture",...officeDocument.getRel(rid)}
	},
	wsp(wXml, officeDocument){
		return {type:"shape", children:officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray()}
	},
	Fallback(){
		return null
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
			let type="text,picture,docPartList,comboBox,dropDownList,date,checkbox,repeatingSection,repeatingSectionItem".split(",")
				.find(a=>a==name)
			let model={children}
			if(type){
				model.type=`control.${type}`
			}else{//container
				if(content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length){
					model.type="block"
				}else{
					model.type="inline"
				}
			}
			
			$=officeDocument.content
			switch(model.type){
				case "control.dropDownList":	
				case "control.comboBox":{
					let selected=$(content).text()
					model.options=$(elType)
						.find("w\\:listItem")
						.map((i,li)=>{
							return {
								displayText: li.attribs["w:displayText"],
								value: li.attribs["w:value"]
							}
						})
						.get()
					model.value=(model.options.find(a=>a.displayText==selected)||{}).value
					break
				}
				case "control.checkbox":{
					let ns=elType.name.split(":")[0]
					model.checked=$(elType).find(`${ns}\\:checked`).attr(`${ns}:val`)=="1"
					break
				}
				case "control.text":
					model.value=$(content).text()
					break
				case "control.date":
					model.value=new Date($(elType).attr("w:fullDate"))
					model.format=$(elType).find("w\\:dateFormat").attr("w:val")
					model.locale=$(elType).find("w\\:lid").attr("w:val")
					break
			}
			return model
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
	tc(wXml){
		return wXml.children.reduce((state,node)=>{
			switch(node.name){
			case "w:tcPr":
				state.pr=node
			break
			default:
				state.children.push(node)
			}
			return state
		},{type:"tc",children:[],pr:null})
	},
	altChunk(wXml, officeDocument){
		let rId=wXml.attribs['r:id']
		let data=officeDocument.getRel(rId)

		let partName=officeDocument.folder+officeDocument.rels(`[Id=${rId}]`).attr("Target")
		let contentType=officeDocument.doc.contentTypes(`Override[PartName='${partName}']`).attr("ContentType")
		return {type:"chunk", data, contentType}
	},
	docDefaults(wXml){
		return {type:"style"}
	},
	style(wXml){
		return {type:"style", id:wXml.attribs['w:styleId']}
	},
	abstractNum(wXml){
		return {type:"abstractNum",id:wXml.attribs["w:abstractNumId"]}
	},
	num(wXml){
		return {type:"num",id:wXml.attribs["w:numId"],abstractNum:wXml.children.find(a=>a.name=="w:abstractNumId").attribs["w:val"]}
	},
	latentStyles(){
		return null
	},
	object(wXml,officeDocument){
		let ole=officeDocument.content(wXml).find("o\\:OLEObject")
		let type=ole.attr("ProgID")
		let embed=ole.attr("Type")==="Embed"
		let rId=ole.attr("r:id")
		return {type:"object",embed, prog: type, data:officeDocument.getRelOleObject(rId)}
	}
}
