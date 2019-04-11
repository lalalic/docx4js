import cheerio from "cheerio"

cheerio.prototype.props=function(opt={}){
    if(this.length==0)
        return {}
    const $=this.constructor
    const {names, nameFn=a=>names&&names[a]||a,filter='*',tidy=a=>a}=opt

    const _xmlns=attribs=>Object.keys(attribs)
        .filter(k=>!k.startsWith("xmlns"))
        .reduce((o,k)=>{
            const v=attribs[k]
            const b=opt[k] ? opt[k](v) : v
            if(b!=undefined){
                o[nameFn(k)]=b
            }
            return o
        },{})

	const set=(a,o)=>{
        const k=a.name.split(":").pop()
        const b=opt[k]?opt[k](a):toJS(a)
        if(b!=undefined){
            o[nameFn(k,a,o)]=opt[`tidy_${k}`] ? opt[`tidy_${k}`](b) : b
        }
        return o
    }

    const toJS=(node,p)=>{
        const{children,attribs}=node
        const o={..._xmlns(attribs)}
        children.filter(a=>a.name && $(a).is(filter)).forEach(a=>set(a,o))
        return o
    }

    var ob
    if(this[0].name.endsWith("Pr")){
        ob=toJS(this[0])
    }else{
        const el=this.eq(0)
        ob=el.children()
            .filter((i,a)=>$(a).is(filter))
            .toArray()
            .reduce((o,a)=>set(a,o),{..._xmlns(el.get(0).attribs)})
    }

    return tidy ? tidy(ob) : ob
}
