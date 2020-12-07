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

cheerio.prototype.forwardUntil=function(selector,filter){
    const Empty=this.constructor.root().not(a=>true)
    const $=n=>Empty.not(a=>true).add(n)
    let until=Empty, filtered=Empty

    let next=this.get(0)
    const parentNext=node=>node&&(node.parent && (node.parent.next || parentNext(node.parent)))
    const getNext=node=>node && ((node.children&&node.children[0])||node.next||parentNext(node))
    while(next && (next=getNext(next))){
        let $n=$(next)
        if($n.is(selector)){
            until=until.add(next)
            break
        }else if(filter && $n.is(filter)){
            filtered=filtered.add(next)
        }
    }
    return filter ? filtered : until
}
cheerio.prototype.backwardUntil=function(selector,filter){
    const Empty=this.constructor.root().not(a=>true)
    const $=n=>Empty.not(a=>true).add(n)
    let until=Empty, filtered=Empty

    let prev=this.get(0)
    const parentPrev=node=>node && (node.parent && (node.parent.prev || parentPrev(node.parent)))
    const getPrev=node=>node && ((node.children&&node.children[node.children.length-1])||node.prev||parentPrev(node))
    while(prev && (prev=getPrev(prev))){
        let $n=$(prev)
        if($n.is(selector)){
            until=until.add(prev)
            break
        }else if(filter && $n.is(filter)){
            filtered=filtered.add(next)
        }
    }
    return filter ? filtered : until
}
