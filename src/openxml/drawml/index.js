export default {
    pic(wXml, officeDocument){
        let blip=officeDocument.content(wXml).find("a\\:blip")
        let rid=blip.attr('r:embed')||blip.attr('r:link')
        return {type:"picture",...officeDocument.getRel(rid)}
    },

    sp(wXml, officeDocument){
        return {type:"shape", children:officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray()}
    },

	nvSpPr(wXml,officeDocument){
        const props=wXml.children.filter(a=>a.name).find(a=>a.name.endsWith(":cNvPr")).attribs
		const sp=wXml.children.filter(a=>a.name).find(a=>a.name.endsWith(":cNvSpPr"))
        const nvPr=wXml.children.filter(a=>a.name).find(a=>a.name.endsWith(":nvPr"))
		var locks=undefined, nv=undefined
		if(sp){
			locks=sp.children.filter(a=>a.name).find(a=>a.name.endsWith(":spLocks"))
			if(locks){
				locks={...locks.attribs}
			}
		}

        if(nvPr){
            nv=this.nvPr(nvPr,officeDocument)
        }
		return {...props, locks, ...nv, type:"nonVisualProps"}
	},

	nvPicPr(wXml,od){
		return this.nvSpPr(...arguments)
	},

	nvGrpSpPr(){
		return this.nvSpPr(...arguments)
	},

    grpSpPr(){
		return this.spPr(...arguments)
	},

    nvPr(wXml,od){
        const ph=wXml.children.filter(a=>a.name).find(a=>a.name.endsWith(":ph"))
        if(ph){
            return {placeholder:this.ph(ph,od)}
        }
        return {}
    },

    ph({attribs}){
        return {...attribs}
    },

	spPr(wXml,od){
		const props=wXml.children.filter(a=>a.name).reduce((props,a)=>{
			const {type, ...attribs}=this[a.name.split(":").pop()](a,od)
			props[type]=attribs
			return props
		},{})
		return {type:"shapeProps", ...props, ...wXml.attribs}
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
        const isList=/\:lvl\dpPr$/
        return wXml.children.filter(a=>a.name && isList.test(a.name)).reduce((nums,a)=>{
            nums[a.name.substr(-4,1)]=this.lvl1pPr(a,od)
            return nums
        },{})
	},

    lvl1pPr({children,attribs},od){
        return children.filter(a=>a.name).reduce((props,a)=>{
            const k=a.name.split(":").pop()
            switch(k){
                case "buFont":
                    props.fonts={...a.attribs}
                    break
                case "buChar":
                    props.char=a.attribs.char
                    break
                case "buClr":
                    props.color=this.color(a,od)
                    break
                case "buAutoNum":
                    props.autoNum={...a.attribs}
            }
            return props
        },{...attribs})
    },

    srgbClr({attribs:{val}},od){
        return od.doc.asColor(val)
    },

	pPr({children,attribs:{marL,marR,indent}},od){
        const props={}
        if(indent!=undefined)
            props.indent=od.doc.dxa2Px(indent)
        if(marL!=undefined)
            props.marginLeft=od.doc.toPx(`${parseInt(marL)*2/457200}in`)
        if(marR!=undefined)
            props.marginRight=od.doc.toPx(`${parseInt(marR)*2/457200}in`)

        return children.filter(a=>a.name).reduce((props,a)=>{
            switch(a.name.split(":").pop()){
                case "lnSpc":
                    props.lineHeight=this.lnSpc(a,od);
                    break;
                case "spcAft":
                    props.after=this.lnSpc(a,od);
                    break;
                case "spcBef":
                    props.before=this.lnSpc(a,od);
                    break;
            }
            return props
        },props)
	},

    lnSpc({children},od){
        return od.doc.pt2Px(parseInt(children.find(a=>a.name).attribs.val)/100)
    },

	rPr({children, attribs:{sz, ...attribs}},od){
        const props={...attribs}
        if(sz!=undefined){
            props.size=parseInt(sz)/100
        }
        return children.filter(a=>a.name).reduce((props,a)=>{
            const {type, ...attr}=this[a.name.split(":").pop()](a,od)
            return Object.assign(props,type ? {[type]:attr} : attr)
        },props)
	},

    latin({attribs}){
        return {type:"fonts",...attribs}
    },

    hlinkClick(n,od){
        return {href:""}
    },

    uFill({children},od){
        return {underlineFill: this.color(...arguments)}
    },

    highlight(){
        return {highlight:this.color(...arguments)}
    },

    color({children},od){
        return children.filter(a=>a.name).reduce((v,a)=>this[a.name.split(":").pop()](a,od),null)
    }
}
