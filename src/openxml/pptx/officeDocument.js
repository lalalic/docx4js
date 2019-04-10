import Base from "../officeDocument"
import Part from "../part"
import drawml from "../drawml"

export default class extends Base{
    _init(){
		super._init()
        return
        this.content("p\\:sldMasterId,p\\:sldId,p\\:notesMasterId,p\\:handoutMasterId")
            .each((i,a)=>this.linkRel(a))
            .filter("p\\:sldMasterId")
            .each((i,a)=>{
                const master=this.getRelPart(a.attribs["r:id"])
                master.content("p\\:sldLayoutId")
                    .each((i,a)=>this.linkRel.call(master,a))
            })
	}

    render(createElement, identify=this.constructor.identify.bind(this.constructor)){
        return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify)
    }

    linkRel({attribs:{id,"r:id":rid}},context){
        return {}
        const target=this.rels(`Relationship[Id="${rid}"]`).attr("Target")
        const $=this.getRelObject(target)
        if(context){
            const node=$(context)[0]
            const attribs=Object.keys(node.attribs).filter(a=>a.startsWith("xmlns")).reduce((a,k)=>(delete a[k], a),{...node.attribs})
            return {children:node.children, ...attribs, part:target}
        }
        return {}
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
                filter:`:not(${content})`,
                sldSz:sz, notesSz:sz,
                ...fonts(officeDocument),
            })

            return {...props, type:"document",children}
		},

        sldMasterId(wXml, officeDocument){
            const content="p\\:sldLayoutIdLst,p\\:cSld"
            const $=officeDocument.master(wXml.attribs)
            const $master=$("p\\:sldMaster")
            const props=$master.props({
                filter:`:not(${content})`,
                ...fonts(officeDocument),
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
                filter:`:not(${content})`,
                ...fonts(officeDocument),
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
            const props=$layout.props({filter:`:not(${content})`})
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
            const node=officeDocument.$(wXml)
            const blip=node.children("a\\:blip")
            const rid=blip.attr('r:embed')||blip.attr('r:link')
            return {type:"picture",...part.getRel(rid)}
        },

        sp(wXml, officeDocument){
            const content="p\\:txBody"
			const $=officeDocument.$(wXml)
            const children=$.children("p\\:txBody").children("a\\:p").toArray()
            const names={spLocks:"locks", ph:"placeholder"}
            const props=$.props({
                filter:`:not(${content})`,
                nameFn:k=>names[k]||k,
                ext:({attribs:{cx,cy}})=>({width:officeDocument.doc.emu2Px(cx),height:officeDocument.doc.emu2Px(cy)}),
                off:({attribs:{x,y}})=>({x:officeDocument.doc.emu2Px(x),y:officeDocument.doc.emu2Px(y)}),
    			tidy:({spPr, nvSpPr:{cNvPr={},cNvSpPr={},nvPr={}}})=>({...spPr, ...cNvPr,...cNvSpPr,...nvPr})
            })
            const textStyle=$.children("p\\:txBody").props({
                filter:`:not(a\\:p)`,
                ...fonts(officeDocument),
                tidy:({lstStyle={},bodyPr={},...others})=>({...others, ...bodyPr, ...lstStyle})
            })
			return {...props, textStyle, children, type:"shape"}
        },

        p(wXml, officeDocument){
            const content=":not(a\\:pPr,a\\:endParaRPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:pPr").props()
            const defaultStyle=$.children("a\\:endParaRPr").props({...fonts(officeDocument)})
            return {style:{lvl:1, ...style}, defaultStyle, children, type:"p"}
        },

        r(wXml,officeDocument){
            const content=":not(a\\:rPr)"
            const $=officeDocument.$(wXml)
            const children=$.children(content).toArray()
            const style=$.children("a\\:rPr").props({...fonts(officeDocument)})
            return {style, children, type:"r"}
        },

        graphicFrame(wXml, officeDocument){
            return {type:"graphic", children:officeDocument.$(wXml).find("c\\:chart, dgm\\:relIds, a\\:tbl").toArray()}
        },

        chart(wXml, officeDocument){
            return {type: "chart"}
        },

        relIds(wXml, officeDocument){
            return {type:"diagram"}
        },

        tbl(wXml, officeDocument){
            return {type:"table"}
        }
    }
}

const font=od=>({attribs:{typeface=""}})=>od.theme.font(typeface)
const fonts=od=>({latin:font(od),ea:font(od),cs:font(od)})
const pr=od=>({
    spcPts:({attribs:{val}})=>val
})
