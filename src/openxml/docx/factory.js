export function identify(wXml, officeDocument){
	const tag=wXml.name.split(":").pop()
	if(identities[tag])
		return identities[tag](...arguments)||tag

	return tag
}

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
				identify.numId=numPr.find("w\\:numId").attr("w:val")
				identify.level=numPr.find("w\\:ilvl").attr("w:val")
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
		}else {//controls
			let prChildren=pr.get(0).children
			let elType=prChildren[prChildren.length-1]
			let name=elType.name.split(":").pop()
			let type="text, picture, docPartList, comboBox, dropDownList, date, checkbox".split(",")
				.find(a=>a==name)
			if(type)
				return {type:`control.${type}`, children:null}
			else{//container
				if(content.find("w\\:p,w\\:tbl").length){
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
	}
}

export function createReactElementFactory(React){
	const getComponent=name=>{
		let existing=getComponent[name]
		if(existing)
			return existing

		let Type=props=>null
		Type.displayName=name
		return getComponent[name]=Type
	}

	return  (type,props,children)=>React.createElement(getComponent(type),props,...children)
}

export function createElement(type,props,children){
	return {type,props,children}
}
