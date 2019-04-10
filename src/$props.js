import cheerio from "cheerio"

cheerio.prototype.props=function(opt={}){
    if(this.length==0)
        return {}
    const _xmlns=attribs=>Object.keys(attribs).filter(k=>!k.startsWith("xmlns")).reduce((o,k)=>(o[k]=attribs[k],o),{})
	const $=this.constructor
    const {nameFn=a=>a,filter='*',tidy=a=>a}=opt
    const set=(a,o,k=a.name.split(":").pop(),b=opt[k]?opt[k](a):toJS(a))=>(b!=undefined && (o[nameFn(k,a,o)]=b),o)
    const toJS=(node,p)=>{
        if($(node).is(filter)){
            const{children,attribs}=node
            const o={..._xmlns(attribs)}
            children.filter(a=>a.name).forEach(a=>set(a,o))
            return o
        }
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
