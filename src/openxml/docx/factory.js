import cheer from "cheerio"

export default function identify(wXml, officeDocument){
	const tag=wXml.name.split(":").pop()
	if(identities[tag])
		return identities[tag](...arguments)||tag

	return tag
}

const identities={
	p(wXml,officeDocument){
		let $=cheer.load(wXml,{xmlMode:true})
		let styleId=$("w\\:pPr>w\\:pStyle").attr("w:val")

		if($("w\\:pPr>w\\:numPr").length ||
			(styleId &&  officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:numPr`).length))
			return "list"

		if($("w\\:pPr>w\\:outlineLvl").length ||
			(styleId && officeDocument.styles(`w\\:style[w\\:styleId="${styleId}"] w\\:outlineLvl`).length))
			return "heading"
	},
	fldChar(wXml){
		return wXml.attribs["w:fldCharType"]
	},
	inline(wXml){
		let $=cheer.load(wXml,{xmlMode:true})
		return $('w\\:graphic>w\\:graphicData').attr('uri').split('/').pop()
	},
	std(wXml){
		let $=cheer.load(wXml,{xmlMode:true})
		let elBinding=$('w\\:sdtPr>w\\:dataBinding').get(0)
		if(elBinding){//properties
			let path=elBinding.attribs['w:xpath'],
				d=path.split(/[\/\:\[]/),
				name=(d.pop(),d.pop());
			return `property.${name}`
		}else {//controls
			let elType=$('w\\:sdtPr').find("text, picture, docPartList, comboBox, dropDownList, date, checkbox").get(0)
			let type=(elType ? elType.name : 'richtext').split(":").pop()
			return `control.${name}`
		}
	}
}
