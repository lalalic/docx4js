import Part from "./part"
import drawml from "./drawml"
export default class extends Part{
    _init(){
        super._init(...arguments)
        this._assignRel(["theme"])

        const doc=this.doc
        const transform=ph=>({
            ...drawml(this),
            tidy_schemeClr:({val,...effect})=>{
                return this.doc.asColor(val=="phClr" ? ph.color :this.theme.color(val),effect)
            },
        })

        Object.assign(this.theme,{
            font(typeface){
                const type={mn:"minor",mj:"major"}
                const [a,b]=typeface.split(/[+-]/g).filter(a=>a)
                if(a && b)
                    return this(`a\\:fontScheme>a\\:${type[a]}Font>a\\:${b=="lt"?"latin":b}`).attr("typeface")
                return typeface
            },
            color(k){
                const $=this(`a\\:clrScheme>a\\:${k}`).children().eq(0)
                return doc.asColor($.attr("lastClr")||$.attr("val"))
            },

            fillRef(idx,ph){
                idx=parseInt(idx)
                if(idx==0 || idx==1000)
                    return {}
                if(idx>1000)
                    return this('a\\:fmtScheme>a\\:bgFillStyleLst')
                        .children()
                        .eq(idx-1001)
                        .props(transform(ph))

                return this('a\\:fmtScheme>a\\:fillStyleLst')
                    .children()
                    .eq(idx-1)
                    .props(transform(ph))
            },

            lnRef(idx,ph){
                return this('a\\:fmtScheme>a\\:lnStyleLst')
                    .children()
                    .eq(parseInt(idx)-1)
                    .props(transform(ph))
            },

            effectRef(idx, ph){
                return this('a\\:fmtScheme>a\\:effectStyleLst')
                    .children()
                    .eq(parseInt(idx)-1)
                    .children('a\\:effectLst')
                    .props(transform(ph))
            },

            fontRef(idx,ph){
                const $=this('a\\:fmtScheme>a\\:fontScheme>a\\:'+idx+'Font')
                const latin=$.children('a\\:latin')
                const ea=$.children('a\\:ea')
                const cs=$.children('a\\:cs')
                return {latin:latin.attr("typeface"),ea:ea.attr('typeface'),cs:cs.attr("typeface"),...ph}
            }
        })
    }

    _assignRel(supported){
        this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			if(supported.indexOf(type)!=-1){
				let target=$.attr("Target")
				Object.defineProperty(this,type,{
                    configurable:true,
					get(){
						return this.getRelObject(target)
					}
				})
			}
		})
    }

    render(createElement, identify=this.constructor.identify.bind(this.constructor)){

    }

    static identify(wXml, officeDocument){
        const identities=this.identities
        const tag=wXml.name.split(":").pop()
        if(identities[tag])
            return identities[tag](...arguments)

        return tag
    }

    static identities={
        
    }
}
