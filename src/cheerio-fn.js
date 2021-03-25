import cheerio from "cheerio"

cheerio.prototype.props=function(opt={}){
    if(this.length==0)
        return {}
    const $=this.constructor
    const {names, nameFn=a=>names&&names[a]||a,__filter='*',tidy=a=>a}=opt

    const propsAttribs=attribs=>Object.keys(attribs)
        .filter(k=>!k.startsWith("xmlns"))
        .reduce((props,attribKey)=>{
            const value=attribs[attribKey]
            attribKey=attribKey.split(":").pop()
            const parsedValue=opt[attribKey] ? opt[attribKey](value) : value
            if(parsedValue!=undefined){
                props[nameFn(attribKey)]=parsedValue
            }
            return props
        },{})

	const propsChild=(node,parentProps,index)=>{
        const tagName=node.name.split(":").pop()
        const parsed=opt[tagName]?opt[tagName](node):toJS(node)
        if(parsed!=undefined){
            const key= Array.isArray(parentProps) ? index : nameFn(tagName,node,parentProps)
            parentProps[key=="[]"? tagName : key]=opt[`tidy_${tagName}`] ? opt[`tidy_${tagName}`](parsed) : parsed
        }
        return parentProps
    }

    const toJS=(node,p)=>{
        const{children,attribs,name="",tagName=name.split(":").pop()}=node
        return children
            .filter(a=>a.name && $(a).is(__filter))
            .reduce(
                (parentProps,child,i)=>propsChild(child,parentProps,i),
                nameFn(tagName,node)==="[]" ? [] : propsAttribs(attribs)
            )
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
