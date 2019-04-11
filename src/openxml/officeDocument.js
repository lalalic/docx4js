import Part from "./part"

export default class extends Part{
    _init(){
        super._init(...arguments)
        const doc=this.doc
        const supported="theme".split(",")
		this.rels(`Relationship[Target$=".xml"]`).each((i,rel)=>{
			let $=this.rels(rel)
			let type=$.attr("Type").split("/").pop()
			if(supported.indexOf(type)!=-1){
				let target=$.attr("Target")
				Object.defineProperty(this,type,{
					get(){
						return this.getRelObject(target)
					}
				})
			}
		})

        Object.assign(this.theme,{
            font(typeface){
                const type={mn:"minor",mj:"major"}
                const [a,b]=typeface.split(/[+-]/g).filter(a=>a)
                return this(`a\\:fontScheme>a\\:${type[a]}Font>a\\:${b=="lt"?"latin":b}`).attr("typeface")
            },
            color(k){
                const $=this(`a\\:clrScheme>a\\:${k}`).children().eq(0)
                return doc.asColor($.attr("lastClr")||$.attr("val"))
            },
            format(){

            }
        })
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
