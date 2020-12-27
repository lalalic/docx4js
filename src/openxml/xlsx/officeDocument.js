import Base from "../officeDocument"
const A="A".charCodeAt(0)
//A=>0, Z=>25, AA=>26
function colStrToInt(col){
    const last=col.substr(-1).charCodeAt(0)-A
    if(col.length>1){
        return 26*(colStrToInt(col.substring(0,col.length-1))+1)+last
    }
    return last
}
//0=>A, 25=>Z, 26=>AA
function colIntToStr(col){
    const i0=String.fromCharCode(A+col%26)
    if(col>=26){
        return colIntToStr(parseInt(col/26)-1)+i0
    }else{
        return i0
    }
}

export default class OfficeDocument extends Base{
    static colStrToInt=colStrToInt
    static colIntToStr=colIntToStr
    _init(){
        super._init()
        const doc=this.doc
        this._assignRel(["styles","sharedStrings"])
        Object.assign(this.sharedStrings,{
            eq(i){
                return this.root().children("sst").children().eq(parseInt(i))
            }, 
            doc, 
        })
        Object.assign(this.styles,{identities:this.constructor.identities,doc})
        this.theme.color=function(i){
            const $=this(`a\\:clrScheme>a\\:${ColorIndex[parseInt(i)]}`).children().first()
            return doc.asColor($.attr("lastClr")||$.attr("val"))
        }
        this.color=({attribs:{rgb,theme,indexed,tint}})=>{
            const v=(rgb&&`#${rgb.substr(2)}`)||(theme && this.theme.color(theme))|| (indexed!=undefined && `${XLSIcv[parseInt(indexed)]}`)
            return tint ? this.doc.asColor(v,{tint:parseFloat(tint)}) : v
        }
    }

    cellPlainText(sheetIndex,row,col){
        row=row+1
        col=colIntToStr(col)
        const sheet=this.sheet(this.content(`sheets>sheet`).get(sheetIndex).attribs)
        const s=sheet(`worksheet>sheetData>row[r=${row}]>c[r='${col}${row}']>v`).text()
        if(s){
            return this.sharedStrings.eq(s).text()
        }
        return ""
    }

    sheet({"r:id":rid}){
        return this.getRel(rid)
    }

    render(createElement, identify=this.constructor.identify.bind(this.constructor)){
        this.renderNode(this.styles("styleSheet").get(0),createElement,identify)
        return this.renderNode(this.content("workbook").get(0), createElement, identify)
    }

    static identities={
        workbook(wXml, officeDocument){
            const $=officeDocument.content("sheets")
            const children=$.children("sheet").toArray()
            return {
                type:"workbook",
                children
            }
        },
        sst({attribs:{count, uniqueCount}},od){
            return {type:"sharedStrings",count:parseInt(count),uniqueCount:parseInt(uniqueCount)}
        },
        sheet(wXml, od){
            const $=od.sheet(wXml.attribs)
            
            const {attribs:{baseColWidth,defaultRowHeight}}=$("sheetFormatPr").get(0)
            const children=$("sheetData>row").toArray()
            const {"r:id":rId,...props}=wXml.attribs
            const colProps="customWidth,min,max,style,hidden".split(",").reduce((o,k)=>(o[k]=parseInt,o),{
                width:parseFloat,
                tidy:({min,max,...props})=>({...props,min:min-1,max:max-1})
            })
            return {
                ...props,
                type:"sheet",
                children, 
                cols: $("cols").children().map((i,a)=>$(a).props(colProps)).get(),
                colWidth: parseFloat(baseColWidth), 
                rowHeight:parseFloat(defaultRowHeight),
                view:$("sheetViews>sheetView").props({xSplit:parseInt,ySplit:parseInt})
            }
        },
        row(wXml, od){
            const $=od.$(wXml)
            const {customFormat, hidden,s, style=customFormat&&parseInt(s)||undefined, r,customHeight,ht, height=ht && parseFloat(ht)*(od.doc.precision||1)}=wXml.attribs
            const children=$.children("c").toArray()
            return {type:"row",children, customHeight, height, i:parseInt(r)-1, style,hidden}
        },
        c(wXml, od){
            const {attribs:{r,s:style}}=wXml
            const children=od.$(wXml).children().toArray()
            const [,col,row,]=/([A-Z]+)(\d+$)/.exec(r)
            return {
                type:"cell",
                name:`${parseInt(row)-1}${col}`,
                col:colStrToInt(col),
                row:parseInt(row)-1, 
                children,
                style:style!=undefined ? parseInt(style) : undefined
            }
        },
        v(wXml,od){
            const {attribs:{t:kind}}=wXml.parent
            const {children:[{data}]}=wXml
            switch(kind){
            case "i":
                return {type:"paragraph",kind,children:[...wXml.children]}
            case "s":
                od.$(wXml).empty().append(od.sharedStrings.eq(data).clone().children())
                break
            default:
                od.$(wXml).empty().append(`<r><t>${data}</t></r>`)
                break
            }
            wXml.parent.attribs.t="i"
            return {type:"paragraph",kind,children:[...wXml.children]}
        },
        is(wXml,od){
            wXml.name="v"
            return {type:"paragraph",kind:"is",children:[...wXml.children]}
        },
        
        r(wXml,od){
            const style=od.$(wXml).find(">rPr").props(TextStyle(od))
            return {
                type:"run",
                style, 
                children: wXml.children.filter(({name})=>name!="rPr")
            }
        },

        //styles
        numFmt(wXml,od){
            return {children:null,...od.styles(wXml).props()}
        },
        cellStyle(wXml,od){
            return {children:null,...od.styles(wXml).props()}
        },
        xf(wXml,od){
            return {children:null,...od.styles(wXml).props({
                names:{
                    wrapText:"wrap",
                    horizontal:"align",
                    vertical:"vertAlign",
                },
                wrapText:v=>v=="true"||v=="1" ? true : false,
                ...parseInt4Keys("numFmtId,fontId,fillId,borderId,xfId,applyNumberFormat,applyFont,applyFill,applyBorder,applyAlignment"),
                tidy({applyNumberFormat,applyFont,applyFill,applyBorder,applyAlignment, ...a}){
                    if(applyNumberFormat==0)
                        delete a.numFmtId
                    if(applyFont==0)
                        delete a.fontId
                    if(applyFill==0)
                        delete a.fillId
                    if(applyBorder==0)
                        delete a.borderId
                    if(applyAlignment==0)
                        delete a.alignment
                    return a
                }
            })}
        },
        tableStyle(wXml,od){
            return {children:null,...od.styles(wXml).props()}
        },
        font(wXml,od){
            return {children:null,...od.styles(wXml).props(TextStyle(od))}
        },
        fill(wXml,od){
            return {children:null,...od.styles(wXml).props({
                bgColor:od.color,
                fgColor:od.color,
                tidy({patternFill:{fgColor:background,patternType}}){
                    if(patternType=="none")
                        return {}
                    if(patternType && patternType.startsWith("gray")){
                        const r=Number(parseInt(patternType.substring(4))).toString(16)
                        return {background:`#${r}${r}${r}`}
                    }
                    return {background}
                }
            })}
        },
        border(wXml,od){
            return {children:null,...od.styles(wXml).props({
                color:od.color,
                tidy_left:tidy_border,
                tidy_right:tidy_border,
                tidy_bottom:tidy_border,
                tidy_top:tidy_border,
                tidy_diagonal: tidy_border,
            })}
        },
    }
}


const parseInt4Keys=keys=>keys.split(",").reduce((s,k)=>(s[k]=parseInt,s),{})
const ColorIndex="lt1,dk1,lt2,dk2,accent1,accent2,accent3,accent4,accent5,accent6,hlink,folHlink".split(",")
const tidy_border=({style,...a})=>{
    switch(style){
        case "thin":
            a.sz=1
            break
        default:
            break
    }
    return a
}
const TextStyle=od=>({
    __filter:":not(scheme,family,charset)",
    names:{
        rFont:"fonts",
        name:"fonts",
        sz:"size",
        b:"bold",
        i:"italic",
        u:"underline",
        vanish:"hidden"
    },
    rFont:({attribs:{val}})=>val,
    name:({attribs:{val}})=>val,
    b:({attribs:{val=true}})=>!!val,
    i:({attribs:{val=true}})=>!!val,
    u:({attribs:{val="single"}})=>val,
    vanish:({attribs:{val=true}})=>!!val,
    sz:({attribs:{val}})=>od.doc.pt2Px(parseInt(val)),

    color:od.color,
})

const XLSIcv = [
    "#000000",
	"#FFFFFF",
	"#FF0000",
	"#00FF00",
	"#0000FF",
	"#FFFF00",
	"#FF00FF",
	"#00FFFF",
	"#000000",
	"#FFFFFF",
	"#FF0000",
	"#00FF00",
	"#0000FF",
	"#FFFF00",
	"#FF00FF",
	"#00FFFF",
	"#800000",
	"#008000",
	"#000080",
	"#808000",
	"#800080",
	"#008080",
	"#C0C0C0",
	"#808080",
	"#9999FF",
	"#993366",
	"#FFFFCC",
	"#CCFFFF",
	"#660066",
	"#FF8080",
	"#0066CC",
	"#CCCCFF",
	"#000080",
	"#FF00FF",
	"#FFFF00",
	"#00FFFF",
	"#800080",
	"#800000",
	"#008080",
	"#0000FF",
	"#00CCFF",
	"#CCFFFF",
	"#CCFFCC",
	"#FFFF99",
	"#99CCFF",
	"#FF99CC",
	"#CC99FF",
	"#FFCC99",
	"#3366FF",
	"#33CCCC",
	"#99CC00",
	"#FFCC00",
	"#FF9900",
	"#FF6600",
	"#666699",
	"#969696",
	"#003366",
	"#339966",
	"#003300",
	"#333300",
	"#993300",
	"#993366",
	"#333399",
	"#333333",
	"#000000", /* "#40 icvForeground ?? */
	"#000000", /* "#41 icvBackground ?? */
	"#000000", /* "#42 icvFrame ?? */
	"#000000", /* "#43 icv3D ?? */
	"#000000", /* "#44 icv3DText ?? */
	"#000000", /* "#45 icv3DHilite ?? */
	"#000000", /* "#46 icv3DShadow ?? */
	"#000000", /* "#47 icvHilite ?? */
	"#000000", /* "#48 icvCtlText ?? */
	"#000000", /* "#49 icvCtlScrl ?? */
	"#000000", /* "#4A icvCtlInv ?? */
	"#000000", /* "#4B icvCtlBody ?? */
	"#000000", /* "#4C icvCtlFrame ?? */
	"#000000", /* "#4D icvCtlFore ?? */
	"#000000", /* "#4E icvCtlBack ?? */
	"#000000", /* "#4F icvCtlNeutral */
	"#000000", /* "#50 icvInfoBk ?? */
	"#000000" /* "#51 icvInfoText ?? */
]
