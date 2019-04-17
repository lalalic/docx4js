import Part from "../part"

export default od=>({
    filter:":not(a\\:extLst)",
    id:()=>undefined,
    ...same("latin,ea,cs".split(","),({attribs:{typeface=""}})=>od.theme.font(typeface)),

    ...same("lumMod,lumOff,tint,shade".split(","),({attribs:{val}})=>parseInt(val)/100000),
    tidy_schemeClr:({val,...effect})=>od.doc.asColor(od.theme.color(val),effect),
    tidy_srgbClr:({val,...effect})=>od.doc.asColor(val,effect),
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
            				d.push('L '+px(a.children[0].attr('x'))+' '+px(a.children[0].attr('y')))
            				d.push('Q '+px(a.children[1].attr('x'))+' '+px(a.children[1].attr('y'))
            					+' '+px(a.children[2].attr('x'))+' '+px(a.children[2].attr('y')))
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

    buFont:({attribs:{typeface}})=>typeface,
    buChar:({attribs:{char}})=>char,
    buSzPts:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)/100),
    buSzPct:({attribs:{val}})=>parseInt(val)/1000/100,
    buAutoNum:({attribs})=>({...attribs}),
    tidy_buClr:({color})=>color,

    indent:v=>od.doc.emu2Px(v),
    marL:v=>od.doc.emu2Px(v),

    ext:({attribs:{cx,cy}})=>({width:od.doc.emu2Px(cx),height:od.doc.emu2Px(cy)}),
    off:({attribs:{x,y}})=>({x:od.doc.emu2Px(x),y:od.doc.emu2Px(y)}),
    tidy_xfrm:({ext={},off={}, ...transform})=>({...ext, ...off, ...transform}),

    ...same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(a=>'tidy_'+a),({w,...props})=>({...props, w:od.doc.emu2Px(w)})),
    ...same("left,right,top,bottom".split(",").map(a=>'tidy_'+a),({ln})=>ln),
    tidy_tcTxStyle:({color,...props})=>({...props, solidFill:color}),

    tidy_lnRef:({idx,...ph})=>od.theme.lnRef(idx,ph),
    tidy_fillRef:({idx,...ph})=>od.theme.fillRef(idx,ph),
    tidy_EffectRef:({idx,...ph})=>od.theme.effectRef(idx,ph),
    tidy_fontRef:({idx,...ph})=>od.theme.fontRef(idx,ph),

    names:{
        schemeClr:"color", srgbClr:"color", sysClr:"color",
        prstGeom:"geometry", custGeom:"geometry",
        lnB:"bottom", lnR:"right", lnL:"left", lnT:"top",
        rot:"rotate",
    }
})

const same=(keys,fx)=>keys.reduce((fs, k)=>(fs[k]=fx, fs),{})
