import Part from "../part"

export default od=>({
    __filter:":not(a\\:extLst)",
    id:()=>undefined,
    ...same("latin,ea,cs".split(","),({attribs:{typeface=""}})=>od.theme.font(typeface)),
    //sz:v=>od.doc.pt2Px(parseInt(v)/100),
    ...same("lumMod,lumOff,tint,shade".split(","),({attribs:{val}})=>parseInt(val)/100000),
    tidy_schemeClr:({val,...effect})=>od.doc.asColor(od.theme.color(val),effect),
    tidy_srgbClr:({val,...effect})=>od.doc.asColor(val,effect),
    tidy_prstClr:({val,...effect})=>od.doc.asColor(val,effect),
    sysClr:({attribs:{val}})=>val,
    tidy_solidFill:({color})=>color,
    rot:v=>parseInt(v)/60000,

    blip:n=>{
        const {attribs:{"r:embed":embed, "r:link":url}}=n
        if(url)
            return {url}
        const part=od.$(n).part()
        return new Part(part,od.doc).getRel(embed)
    },

    prstGeom(x){
		return x.attribs.prst
	},
	pathLst({children}){
		const px=x=>od.doc.emu2Px(x)
        return children.filter(a=>a.name=="a:path")
            .reduce((d,path)=>{
                path.children.filter(a=>a.name)
                    .forEach(a=>{
                        switch(a.name.split(":").pop()){
            			case 'moveTo':
            				d.push('M '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
            				break
            			case 'lnTo':
            				d.push('L '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
            				break
            			break
            			case 'cubicBezTo':
            				d.push('L '+px(a.children[0].attribs.x)+' '+px(a.children[0].attribs.y))
            				d.push('Q '+px(a.children[1].attribs.x)+' '+px(a.children[1].attribs.y)
            					+' '+px(a.children[2].attribs.x)+' '+px(a.children[2].attribs.y))
            			break
            			case 'arcTo':
            				d.push(`A`)
            			break
            			case 'close':
            				d.push('Z')
            			break
            			}
                    })
                return d
            },[]).join(" ")
	},
    tidy_custGeom:({pathLst})=>pathLst,

    lvl:v=>parseInt(v),
    spcPts:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)/100),
    tidy_spcAft:({spcPts:a})=>a,
    tidy_spcBef:({spcPts:a})=>a,

    buFont:({attribs:{typeface}})=>od.theme.font(typeface),
    buChar:({attribs:{char}})=>char,
    buSzPts:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)/100),
    buSzPct:({attribs:{val}})=>parseInt(val)/1000/100,
    buAutoNum:({attribs})=>({...attribs}),
    tidy_buClr:({color})=>color,

    indent:v=>od.doc.emu2Px(v),
    marL:v=>od.doc.emu2Px(v),
    marR:v=>od.doc.emu2Px(v),
    marT:v=>od.doc.emu2Px(v),
    marB:v=>od.doc.emu2Px(v),
    
    lIns:v=>od.doc.emu2Px(v),
    rIns:v=>od.doc.emu2Px(v),
    bIns:v=>od.doc.emu2Px(v),
    tIns:v=>od.doc.emu2Px(v),

    distL:v=>od.doc.emu2Px(v),
    distR:v=>od.doc.emu2Px(v),
    distT:v=>od.doc.emu2Px(v),
    distB:v=>od.doc.emu2Px(v),

    ext:({attribs:{cx,cy}})=>({width:od.doc.emu2Px(cx),height:od.doc.emu2Px(cy)}),
    extent:({attribs:{cx,cy}})=>({width:od.doc.emu2Px(cx),height:od.doc.emu2Px(cy)}),
    effectExtent:({attribs:{l,t,r,b}})=>({left:od.doc.emu2Px(l),right:od.doc.emu2Px(r),top:od.doc.emu2Px(t),bottom:od.doc.emu2Px(b)}),
    off:({attribs:{x,y}})=>({x:od.doc.emu2Px(x),y:od.doc.emu2Px(y)}),
    tidy_xfrm:({ext={},off={}, ...transform})=>({...ext, ...off, ...transform}),

    ...same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(a=>'tidy_'+a),({w,...props})=>({...props, w:w ? od.doc.emu2Px(w) : undefined})),
    ...same("left,right,top,bottom".split(",").map(a=>'tidy_'+a),({ln})=>ln),
    tidy_tcTxStyle:({color,...props})=>({...props, solidFill:color}),

    tidy_lnRef:({idx,...ph})=>od.theme.lnRef(idx,ph),
    tidy_fillRef:({idx,...ph})=>od.theme.fillRef(idx,ph),
    tidy_effectRef:({idx,...ph})=>od.theme.effectRef(idx,ph),
    tidy_fontRef:({idx,...ph})=>od.theme.fontRef(idx,ph),

    tidy_noAutoFit:()=>undefined,
    tidy_normAutoFit:props=>({type:"font",...props}),
    tidy_spAutoFit:props=>({type:"block",...props}),

    names:{
        schemeClr:"color", srgbClr:"color", sysClr:"color",prstClr:"color",
        prstGeom:"geometry", custGeom:"geometry",
        lnB:"bottom", lnR:"right", lnL:"left", lnT:"top",
        rot:"rotate",
        spAutoFit:"autofit",normAutoFit:"autofit",noAutoFit:"autofit",
        gsLst:"[]"
    },

    inherit(...additions){
        return additions.reduce(({__filter="",names={}, ...others}, {__filter:_filter="",names:_names={}, ..._others})=>{
            return {
                ...others,
                ..._others,
                __filter:[__filter,_filter].filter(a=>!!a).join(","),
                names:{...names, ..._names},
            }
        },this)
    }
})

const same=(keys,fx)=>keys.reduce((fs, k)=>(fs[k]=fx, fs),{})
