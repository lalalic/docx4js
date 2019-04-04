import Base from "../officeDocument"
import Part from "../part"
import drawml from "../drawml"

export default class extends Base{
    _init(){
		super._init()
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
        const target=this.rels(`Relationship[Id="${rid}"]`).attr("Target")
        const $=this.getRelObject(target)
        Object.assign($.root()[0].attribs,{id,rid,part:target})
        if(context){
            const node=$(context)[0]
            const attribs=Object.keys(node.attribs).filter(a=>a.startsWith("xmlns")).reduce((a,k)=>(delete a[k], a),{...node.attribs})
            return {children:node.children, ...attribs, part:target}
        }
        return {}
    }

    node(wXml){
		return this.getRelObject(root(wXml).attribs.part.replace("../",""))(wXml)
    }

    static identities={
        presentation(wXml,officeDocument){
			const $=officeDocument.content("p\\:presentation")
            const children=$.children().not("p\\:sldSz, p\\:notesSz").toArray()
            const orders={"p:embeddedFontLst":1,"p:defaultTextStyle":3,"p:sldMasterIdLst":5, "p:sldIdLst":7,}
            children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))
            const model={type:"document",children}

            const normalize=({cx=0, cy=0, ...attr})=>({...attr, width:officeDocument.doc.dxa2Px(cx),height:officeDocument.doc.dxa2Px(cy)})
            const size=($.find("p\\:sldSz").get(0)||{}).attribs
            const noteSize=($.find("p\\:notesSz").get(0)||{}).attribs

            if(size)
                model.size=normalize(size)

            if(noteSize)
                model.noteSize=normalize(noteSize)

			return model
		},

        sldMasterId(wXml, officeDocument){
            const model={...officeDocument.linkRel(wXml,"p\\:sldMaster"),type:"slideMaster",}
            const orders={"p:clrMap":1, "p:sldLayoutLst":100, "p:cSld":101}
            model.children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))
            return model
        },

        sldId(wXml,officeDocument){
            const slidePart=officeDocument.getRelPart(wXml.attribs["r:id"])
            const layoutTarget=officeDocument.doc.normalizePath(slidePart.folder+slidePart.getRelTarget("slideLayout"))
            const model={...officeDocument.linkRel(wXml,"p\\:sld"),type:"slide",layout:layoutTarget}
            const orders={"p:clrMapOvr":1, "p:cSld":101}
            model.children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))

            return model
        },

        notesMasterId(wXml, officeDocument){
            return { ...officeDocument.linkRel(wXml,"p\\:notesMaster"),type:"noteMaster",}
        },

        handoutMasterId(wXml, officeDocument){
            return {...officeDocument.linkRel(wXml,"p\\:handoutMaster"),type:"handoutMaster", }
        },

        sldLayoutId(wXml,officeDocument){
            const {rid}=root(wXml).attribs
            const master=officeDocument.getRelPart(rid)
            const attribs=officeDocument.linkRel.call(master, wXml,"p\\:sldLayout")
            const model={...attribs,type:"slideLayout", master:master.name}

            const orders={"p:clrMapOvr":1, "p:cSld":101}
            model.children.sort((a,b)=>(orders[a.name]||99)-(orders[b.name]||99))
            return model
        },

        spTree(wXml,od){
            debugger
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
            const node=officeDocument.node(wXml)
            const blip=node.children("a\\:blip")
            const rid=blip.attr('r:embed')||blip.attr('r:link')
            return {type:"picture",...part.getRel(rid)}
        },

        sp(wXml, officeDocument){
			const $=officeDocument.node(wXml)
            const nvSpPr=$.children("p\\:nvSpPr")[0]
            const spPr=$.children("p\\:spPr")[0]
			return {
                ...(nvSpPr ? drawml.nvSpPr(nvSpPr, officeDocument) : {}),
                ...(spPr ? drawml.spPr(spPr, officeDocument) : {}),
                type:"shape",
                children:$.children("p\\:txBody").toArray()
            }
        },

        txBody(wXml,officeDocument){
            const model={type:"textBox", children:wXml.children.filter(a=>a.name && a.name.endsWith(":p"))}
            const pr=wXml.children.find(a=>a.name && a.name.endsWith(":bodyPr"))
            if(pr)
                Object.assign(model,pr.attribs)
            const listStyle=wXml.children.find(a=>a.name && a.name.endsWith(":lstStyle"))
            if(listStyle)
                model.list=drawml.lstStyle(listStyle,officeDocument)
            return model
        },

        p({children, attribs}, od){
            const model={type:"p", children:children.filter(a=>a.name && !a.name.endsWith(":pPr")), }
            const pr=children.find(a=>a.name && a.name.endsWith(":pPr"))
            if(pr){
                Object.assign(model, drawml.pPr(pr, od))
            }
            return model
        },

        r({children, attribs},od){
            const model={type:"r", children:children.filter(a=>a.name && !a.name.endsWith(":rPr")), }
            const pr=children.find(a=>a.name && a.name.endsWith(":rPr"))
            if(pr){
                Object.assign(model, drawml.rPr(pr, od))
            }
            return model
        },

        graphicFrame(wXml, officeDocument){
            return {type:"graphic", children:officeDocument.node(wXml).find("c\\:chart, dgm\\:relIds, a\\:tbl").toArray()}
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

const root=a=>a.root || root(a.parent)
