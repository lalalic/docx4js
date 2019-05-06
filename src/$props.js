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
            k=k.split(":").pop()
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
        return children
            .filter(a=>a.name && $(a).is(filter))
            .reduce((o,a)=>set(a,o),{..._xmlns(attribs)})
    }

    const props=toJS(this[0])

    return tidy ? tidy(props) : props
}
