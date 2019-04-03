{
    pic(wXml, officeDocument){
        let blip=officeDocument.content(wXml).find("a\\:blip")
        let rid=blip.attr('r:embed')||blip.attr('r:link')
        return {type:"picture",...officeDocument.getRel(rid)}
    },
    sp(wXml, officeDocument){
        return {type:"shape", children:officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray()}
    },
    
    graphicFrame(wXml, officeDocument){
        //chart: c:chart, diagram: dgm:relIds, table:a:tbl
        return {type:"chart"}
    },
	
	nvSpPr(wXml,officeDocument){
		const props=wXml.children.find(a=>a.name.endsWith("cNvPr")).attribs
		const sp=wXml.children.find(a=>a.name.endsWith("cNvSpPr"))
		var locks=undefined
		if(sp){
			locks=sp.children.find(a=>a.name.endsWith("spLocks"))
			if(locks){
				locks={...locks.attribs}
			}
		}
		return {...props, locks, type:"nonVisualProps"}
	},
	
	nvPicPr(wXml,od){
		return this.nvSpPr(...arguments)
	},
	
	nvGrpSpPr(){
		return this.nvSpPr(...arguments)
	},
	
	spPr(wXml,od){
		const props=wXml.children.reduce((props,a)=>{
			const {type, ...attribs}=this[a.name.split(":").pop()](a,od)
			props[type]=attribs
			return props
		},{})
		return {type:"shapeProps", ...props, ...wXml.attribs}
	},
	
	grpSpPr(){
		return this.spPr(...arguments)
	},
	
	xfrm(wXml, officeDocument){
		return {type:"transform",x:0,y:0,width:0,height:0,...wXml.attribs}
	},
	
	prstGeom(wXml,officeDocument){
		return {type:"geometry"}
	},
	
	custGeom(wXml, officeDocument){
		return {type:"geometry"}
	},
	
	solidFill(wXml, od){
		return {type:"fill"}	
	},
	
	blipFill(wXml,od){
		return {type:"fill"}
	},
	
	gradFill(wXml,od){
		return {type:"fill"}
	},
	
	pattFill(wXml,od){
		return {type:"fill"}
	},
	
	grpFill(wXml,od){
		return {type:"fill"}
	},
	
	effectLst(wXml,od){
		return {type:"effects"}
	},
	
	ln(wXml,od){
		return {type:"outline"}
	},
	
	sp3d(wXml,od){
		return {type:"shape3d"}
	},
	
	scene3d(wXml,od){
		return {type:"scene3d"}
	},
	
	lstStyle(wXml,od){
		
	},
	
	pPr(wXml,od){
		
	},
	
	rPr(wXml,od){
		
	},
	
	
	
}
