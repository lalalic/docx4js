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

    static identities={
        presentation(wXml,officeDocument){
			const $=officeDocument.content("p\\:presentation")
            const content="p\\:handoutMasterIdLst,p\\:notesMasterIdLst,p\\:sldIdLst,p\\:sldMasterIdLst"
            const children=$.children(content).toArray()
            const orders={"p:sldMasterIdLst":1, "p:sldIdLst":2}
            children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))

            const sz=({attribs:{cx,cy}})=>({width:officeDocument.doc.emu2Px(cx),height:officeDocument.doc.emu2Px(cy)})
            const props=$.props({
                ...drawml(officeDocument),
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
                ...drawml(officeDocument),
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
                ...drawml(officeDocument),
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

        spTree(wXml,officeDocument){
            const content=":not(p\\:nvGrpSpPr,p\\:grpSpPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const props=officeDocument.$(wXml).props({
                ...drawml(officeDocument),
                filter:`p\\:nvGrpSpPr,p\\:grpSpPr`,
                tidy:({grpSpPr, nvGrpSpPr:{cNvPr={},cNvSpPr={},nvPr={}}, ...others})=>({...grpSpPr, ...cNvPr,...cNvSpPr,...nvPr,...others})
            })

            return {...props,type:"spTree", children}
        },

        pic(wXml, officeDocument){
            const props=officeDocument.$(wXml).props({
                ...drawml(officeDocument),
                tidy:({spPr, nvPicPr:{cNvPr={},cNvSpPr={},nvPr={}}, ...others})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr,...others})
            })
            return {...props,type:"picture"}
        },

        sp(wXml, officeDocument){
            const content="p\\:txBody"
			const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const commonProps=drawml(officeDocument)
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
                ...drawml(officeDocument),
                filter:`:not(a\\:p,a\\:extLst)`,
                tidy:({lstStyle={},bodyPr={},...others})=>({...others, ...bodyPr, ...lstStyle})
            })
			return {textStyle, children, type:"txBody"}
        },

        p(wXml, officeDocument){
            const content=":not(a\\:pPr,a\\:endParaRPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:pPr").props(drawml(officeDocument))
            const defaultStyle=$.children("a\\:endParaRPr").props(drawml(officeDocument))
            return {style:{lvl:0, ...style}, defaultStyle, children, type:"p"}
        },

        r(wXml,officeDocument){
            const content=":not(a\\:rPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:rPr").props({...drawml(officeDocument)})
            return {style, children, type:"r"}
        },

        chart(wXml, officeDocument){
            return {type: "chart"}
        },

        relIds(wXml, officeDocument){
            return {type:"diagram"}
        },

        graphicFrame(wXml, officeDocument){
            const content="a\\:graphic"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const props=$.props({
                ...drawml(officeDocument),
                filter:`:not(${content},a\\:extLst)`,
                tidy:({spPr, nvGraphicFramePr:{cNvPr={},cNvSpPr={},nvPr={}}, ...others})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr,...others})
            })
            return {...props, children, type:"graphicFrame"}
        },

        tbl(wXml, officeDocument){
            const content="a\\:tr"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const props=$.props({
                ...drawml(officeDocument),
                filter:`:not(${content}, a\\:extLst)`,
                tableStyleId:({children})=>children.find(a=>a.data).data,
                tblGrid:({children})=>children.filter(a=>a.name).reduce((cols,{attribs:{w}})=>{
                    cols.push(officeDocument.doc.emu2Px(w))
                    return cols
                },[]),
                tidy:({tblPr, tblGrid:cols, ...others})=>({...tblPr, cols, ...others})
            })
            return {...props, children, type:"tbl"}
        },

        tblStyle(wXml, officeDocument){
            const $=officeDocument.$(wXml)
            const props=$.props(drawml(officeDocument))
            return {...props, type:"tblStyle"}
        },

        tr(wXml, officeDocument){
            const $=officeDocument.$(wXml)
            const props=$.props({
                ...drawml(officeDocument),
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
