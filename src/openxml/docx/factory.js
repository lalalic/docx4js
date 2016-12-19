import cheer from "cheerio"

export function identify(wXml, officeDocument){
	const tag=wXml.name.split(":").pop()
	if(identities[tag])
		return identities[tag](...arguments)||tag

	return tag
}

const identities={
	p(wXml,officeDocument){
		let $=cheer.load(wXml,{xmlMode:true})
		let pPr=$("w\\:pPr")
		if(pPr.length){
			let styleId=$("w\\:pStyle",pPr).attr("w:val")

			if($("w\\:numPr", pPr).length ||
				(styleId &&  officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:numPr`).length))
				return "list"

			if($("w\\:outlineLvl", pPr).length ||
				(styleId && officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:outlineLvl`).length))
				return "heading"
		}
	},
	fldChar(wXml){
		return wXml.attribs["w:fldCharType"]
	},
	inline(wXml){
		let $=cheer.load(wXml,{xmlMode:true})
		let type=`inline.${$('a\\:graphic>a\\:graphicData').attr('uri').split('/').pop()}`
		return {type,children:null}
	},
	std(wXml){
		let $=cheer.load(wXml,{xmlMode:true})
		let elBinding=$('w\\:sdtPr>w\\:dataBinding').get(0)
		if(elBinding){//properties
			let path=elBinding.attribs['w:xpath'],
				d=path.split(/[\/\:\[]/),
				name=(d.pop(),d.pop());
			let value=$('w\\:sdtContent:first').text()
			return {type:"property", name, value, children:null}
		}else {//controls
			let elType=$('w\\:sdtPr').find("text, picture, docPartList, comboBox, dropDownList, date, checkbox").get(0)
			let type=(elType ? elType.name : 'richtext').split(":").pop()
			return {type:`control.${type}`, children:null}
		}
	}
}


export const getComponent=name=>{
	let existing=getComponent[name]
	if(existing)
		return existing
	let Type=props=>null
	Type.displayName=name
	return getComponent[name]=Type
}