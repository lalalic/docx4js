import Base from "../officeDocument"
import Part from "../part"
import drawml from "../drawml"

export default class OfficeDocument extends Base{
    _init(){
        super._init()
        this._assignRel("tableStyles,viewProps,presProps".split(","))
    }

    render(createElement, identify=this.constructor.identify.bind(this.constructor)){
        if(this.tableStyles){
            this.renderNode(this.tableStyles.root().children().get(0), createElement, identify)
        }
        return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify)
    }

    slide({id,"r:id":rid}){
        return this.getRel(rid)
    }

    master({id,"r:id":rid}){
        return this.slide(...arguments)
    }

    notesMaster(){
        return this.slide(...arguments)
    }

    handoutMaster(){
        return this.slide(...arguments)
    }

    masterPartOfLayout(wXmlLayoutIdInMaster){
        const masterRoot=this.$(wXmlLayoutIdInMaster).root().get(0)
        const {part:masterPartName}=masterRoot.attribs
        return this.doc.getRelObject(masterPartName)
    }

    tableStyle(id){
        retu
    }

    static identities={
        presentation(wXml,officeDocument){
			const $=officeDocument.content("p\\:presentation")
            const content="p\\:handoutMasterIdLst,p\\:notesMasterIdLst,p\\:sldIdLst,p\\:sldMasterIdLst"
            const children=$.children(content).toArray()
            const orders={"p:sldMasterIdLst":1, "p:sldIdLst":2}
            children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))

            const sz=({attribs:{cx,cy}})=>({width:officeDocument.doc.emu2Px(cx),height:officeDocument.doc.emu2Px(cy)})
            const props=$.props({
                ...common(officeDocument),
                filter:`:not(${content},a\\:extLst)`,
                sldSz:sz, notesSz:sz,
            })

            return {...props, type:"document",children}
		},

        sldMasterId(wXml, officeDocument){
            const content="p\\:sldLayoutIdLst,p\\:cSld"
            const $=officeDocument.master(wXml.attribs)
            const $master=$("p\\:sldMaster")
            const props=$master.props({
                ...common(officeDocument),
                filter:`:not(${content},a\\:extLst)`,
            })
            const children=$master.children(content).toArray()
            const orders={"p:sldLayoutLst":1, "p:cSld":2}
            children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))

            return {...props, part: $.part, children,type:"slideMaster"}
        },

        sldId(wXml,officeDocument){
            const content="p\\:cSld"
            const $=officeDocument.slide(wXml.attribs)
            const $slide=$('p\\:sld')
            const props=$slide.props({
                ...common(officeDocument),
                filter:`:not(${content},a\\:extLst)`,
            })
            const children=$slide.children(content).toArray()

            const slidePart=officeDocument.getRelPart(wXml.attribs["r:id"])
            const layoutTarget=officeDocument.doc.normalizePath(slidePart.folder+slidePart.getRelTarget("slideLayout"))
            const layoutPart=new Part(layoutTarget,officeDocument.doc)
            const masterTarget=officeDocument.doc.normalizePath(layoutPart.folder+layoutPart.getRelTarget("slideMaster"))
            return {...props,part:$.part, layout:layoutTarget, master:masterTarget, children, type:"slide"}
        },

        notesMasterId(wXml, officeDocument){
            const $=officeDocument.notesMaster(wXml.attribs)
            return {part:$.part,type:"noteMaster",}
        },

        handoutMasterId(wXml, officeDocument){
            const $=officeDocument.handoutMaster(wXml.attribs)
            return {part:$.part,type:"handoutMaster", }
        },

        sldLayoutId(wXml,officeDocument){//in master
            const content="p\\:cSld"
            const master=officeDocument.$(wXml).part()
            const $=new Part(master,officeDocument.doc).getRel(wXml.attribs["r:id"])
            const $layout=$("p\\:sldLayout")
            const props=$layout.props({filter:`:not(${content},a\\:extLst)`})
            const children=$layout.children(content).toArray()

            return {...props,part:$.part, master, children, type:"slideLayout", }
        },

        spTree(wXml,od){
            const nvGrpSpPr=wXml.children.find(a=>a.name=="p:nvGrpSpPr")
            const grpSpPr=wXml.children.find(a=>a.name=="p:grpSpPr")
            const model={type:"frame"}
            if(nvGrpSpPr){
                const {type, ...props}=drawml.nvGrpSpPr(nvGrpSpPr,od)
                Object.assign(model, props)
            }

            if(grpSpPr){
                const {type, ...props}=drawml.grpSpPr(grpSpPr,od)
                Object.assign(model, props)
            }
            return model
        },

        pic(wXml, officeDocument){
            const props=officeDocument.$(wXml).props({
                ...common(officeDocument),
                tidy:({spPr, nvPicPr:{cNvPr={},cNvSpPr={},nvPr={}}, ...others})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr,...others})
            })
            return {...props,type:"picture"}
        },

        sp(wXml, officeDocument){
            const content="p\\:txBody"
			const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const commonProps=common(officeDocument)
            const names={spLocks:"locks", ph:"placeholder", ...commonProps.names}
            const props=$.props({
                ...commonProps,
                filter:`:not(${content},a\\:extLst)`,
                names,
                ph:({attribs:{type="body",idx}})=>({type,idx}),
                tidy:({spPr, nvSpPr:{cNvPr={},cNvSpPr={},nvPr={}}})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr})
            })

            const txBody=OfficeDocument.identities.txBody(children[0],officeDocument)
            return {...props, children, ...txBody, type:"shape"}
        },

        txBody(wXml, officeDocument){
            const content="a\\:p"
			const $=officeDocument.$(wXml)
            const children=$.children("a\\:p").toArray()
            const textStyle=$.props({
                ...common(officeDocument),
                filter:`:not(a\\:p,a\\:extLst)`,
                tidy:({lstStyle={},bodyPr={},...others})=>({...others, ...bodyPr, ...lstStyle})
            })
			return {textStyle, children, type:"txBody"}
        },

        p(wXml, officeDocument){
            const content=":not(a\\:pPr,a\\:endParaRPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:pPr").props(common(officeDocument))
            const defaultStyle=$.children("a\\:endParaRPr").props(common(officeDocument))
            return {style:{lvl:0, ...style}, defaultStyle, children, type:"p"}
        },

        r(wXml,officeDocument){
            const content=":not(a\\:rPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:rPr").props({...common(officeDocument)})
            return {style, children, type:"r"}
        },

        chart(wXml, officeDocument){
            return {type: "chart"}
        },

        relIds(wXml, officeDocument){
            return {type:"diagram"}
        },

        tbl(wXml, officeDocument){
            const $=officeDocument.$(wXml)
            const props=$.closest("p\\:graphicFrame").props({
                ...common(officeDocument),
                filter:`:not(a\\:graphic,a\\:extLst)`,
                tidy:({spPr, nvGraphicFramePr:{cNvPr={},cNvSpPr={},nvPr={}}, ...others})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr,...others})
            })

            const content="a\\:tr"
            const tableProps=$.props({
                ...common(officeDocument),
                filter:`:not(${content}, a\\:extLst)`,
                tableStyleId:({children})=>children.find(a=>a.data).data,
                tblGrid:({children})=>children.filter(a=>a.name).reduce((cols,{attribs:{w}})=>{
                    cols.push(officeDocument.doc.emu2Px(w))
                    return cols
                },[]),
                tidy:({tblPr, tblGrid:cols, ...others})=>({...tblPr, cols, ...others})
            })
            const children=$.children(content).toArray()
            return {...props, ...tableProps, children, type:"tbl"}
        },

        tblStyle(wXml, officeDocument){
            const $=officeDocument.$(wXml)
            const props=$.props({
                ...common(officeDocument)
            })
            return {...props, type:"tblStyle"}
        },

        tr(wXml, officeDocument){
            const $=officeDocument.$(wXml)
            const props=$.props({
                filter:":not(*)",
                h:v=>officeDocument.doc.emu2Px(v),
                names:{h:"height"}
            })
            return {...props, children:wXml.children, type:"tr"}
        },

        tc(wXml, officeDocument){
            const content="a\\:txBody"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const props=$.props({
                filter:`:not(${content},a\\:extLst)`
            })
            return {...props, type:"tc", children}
        }
    }
}

const common=od=>({
    filter:":not(a\\:extLst)",
    ...same("latin,ea,cs".split(","),({attribs:{typeface=""}})=>od.theme.font(typeface)),

    schemeClr:({attribs:{val}})=>od.theme.color(val),
    srgbClr:({attribs:{val}})=>od.doc.asColor(val),
    sysClr:({attribs:{val}})=>od.doc.asColor(val),
    tidy_solidFill:({color})=>color,

    blip:n=>{
        const {attribs:{"r:embed":embed, "r:link":url}}=n
        if(url)
            return {url}
        const part=od.$(n).part()
        return new Part(part,od.doc).getRel(embed)
    },

    prstGeom(x){
		return x.attribs.prst
	},
	pathLst({children}){
		const px=x=>od.doc.emu2Px(x)
        return children.filter(a=>a.name=="a:path")
            .reduce((d,path)=>{
                path.children.filter(a=>a.name)
                    .forEach(a=>{
                        switch(a.name.split(":").pop()){
            			case 'moveTo':
            				d.push('M '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
            				break
            			case 'lnTo':
            				d.push('L '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
            				break
            			break
            			case 'cubicBezTo':
            				d.push('L '+px(a.children[0].attr('x'))+' '+px(a.children[0].attr('y')))
            				d.push('Q '+px(a.children[1].attr('x'))+' '+px(a.children[1].attr('y'))
            					+' '+px(a.children[2].attr('x'))+' '+px(a.children[2].attr('y')))
            			break
            			case 'arcTo':
            				d.push(`A`)
            			break
            			case 'close':
            				d.push('Z')
            			break
            			}
                    })
                return d
            },[]).join(" ")
	},
    tidy_custGeom:({pathLst})=>pathLst,

    lvl:v=>parseInt(v),
    spcPts:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)/100),
    tidy_spcAft:({spcPts:a})=>a,
    tidy_spcBef:({spcPts:a})=>a,

    buFont:({attribs:{typeface}})=>typeface,
    buChar:({attribs:{char}})=>char,
    buSzPts:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)/100),
    buSzPct:({attribs:{val}})=>parseInt(val)/1000/100,
    buAutoNum:({attribs})=>({...attribs}),
    tidy_buClr:({color})=>color,

    indent:v=>od.doc.emu2Px(v),
    marL:v=>od.doc.emu2Px(v),

    ext:({attribs:{cx,cy}})=>({width:od.doc.emu2Px(cx),height:od.doc.emu2Px(cy)}),
    off:({attribs:{x,y}})=>({x:od.doc.emu2Px(x),y:od.doc.emu2Px(y)}),
    tidy_xfrm:({ext={},off={}, ...transform})=>({...ext, ...off, ...transform}),

    ...same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(","),({attribs:{w,...props}})=>({...props, w:od.doc.emu2Px(w)})),
    ...same("left,right,top,bottom".split(",").map(a=>'tidy_'+a),({ln})=>ln),
    names:{
        schemeClr:"color", srgbClr:"color", sysClr:"color",
        prstGeom:"geometry", custGeom:"geometry",
        lnB:"bottom", lnR:"right", lnL:"left", lnT:"top",
    }
})

const same=(keys,fx)=>keys.reduce((fs, k)=>(fs[k]=fx, fs),{})
