import cheerio from "cheerio"

cheerio.prototype.props=function(opt={}){
    if(this.length==0)
        return {}
	const $=this.constructor
    const {nameFn=a=>a,filter,tidy=a=>a}=opt
    const set=(a,o,k=a.name.split(":").pop(),b=opt[k]?opt[k](a):toJS(a))=>(b!=undefined && (o[nameFn(k,a,o)]=b),o)
    const toJS=(node,p)=>{
        if(!filter || $(node).is(filter)){
            const{children,attribs}=node
            const o={...attribs}
            children.filter(a=>a.name).forEach(a=>set(a,o))
            return Object.keys(o).length ? o : undefined
        }
    }
    
    var ob
    if(this[0].name.endsWith("Pr")){
        ob=toJS(this[0])
    }else{
        ob=this.eq(0).children()
            .filter((i,a)=>a.name.endsWith("Pr"))
            .toArray()
            .reduce((o,a)=>set(a,o),{})
    }
    
    return tidy ? tidy(ob) : ob
}