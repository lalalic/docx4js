import Base from "../document"
import OfficeDocument from "./officeDocument"
import Styles from "./styles"

export default class extends Base{
	static get ext(){return 'docx'}

	static OfficeDocument=OfficeDocument

	createElement(node){
		const {styles}=this.officeDocument
		let {name, attributes:{directStyle}, children}=node
		let tag=name.split(':').pop()
		switch(tag){
		case "p":
			if(directStyle && directStyle['numPr'])
				tag="list"
		break
		}

		return this.onCreateElement(node, tag)
	}

	toProperty(node, type){
		let pr=super.toProperty(node)

		switch(type){
		case 'pPr':
			return new Styles.paragraph({pPr:pr}, this.officeDocument.styles, 'pPr.pStyle')
		break
		case 'rPr':
			return new Styles.character({rPr:pr}, this.officeDocument.styles, 'rPr.rStyle')
		break
		case 'tblPr':
			return new Styles.table({tblPr:pr}, this.officeDocument.styles, 'tblPr.tblStyle')
		break
		default:
			return pr
		}
	}

	onToProperty(node, type){
		const {$:x}=node
		let value
		switch(type){
		//section, sectPr
		case 'pgSz':
			return {width:this.dxa2Px(x['w']), height:this.dxa2Px(x['h'])}
		break
		case 'pgMar':
			value={}
			Object.keys(x).forEach(a=>value[a.split(':').pop()]=this.dxa2Px(x[a]))
			return value
		break
		case 'cols':
			x.num && (x.num=parseInt(x.num));
			x.space && (x.space=this.dxa2Px(x.space));

			if(x.col){
				x.data=x.col.map(col=>({
					width:this.dxa2Px(col.w),
					space:this.dxa2Px(col.space)
				}))
				delete x.col
			}
			return x
		break
		//paragraph, pPr
		case 'jc':
			return x.val
		case 'ind':
			Object.keys(x).forEach(a=>x[a]=this.dxa2Px(x[a]))
			return x
		case 'spacing':
			return this.toSpacing(x)
		case 'pBdr':
			value={}
			Object.keys(x).filter(a=>a!='$').forEach(a=>value[a]=this.toBorder(x[a][0]))
			return value
		//inline, rPr
		case 'rFonts':
			let ascii=x['ascii']||this.officeDocument.fontTheme.get(x['asciiTheme'])
			let asia=x['eastAsia']||this.officeDocument.fontTheme.get(x['eastAsiaTheme'])

			if(ascii || asia)
				return {ascii, asia}
		break
		case 'lang':
		case 'vertAlign':
			return x.val
		case 'sz':
			return this.pt2Px(parseInt(x['val'])/2)
		case 'w':
			return parseInt(x.val)/100.0
		case 'kern':
			return parseInt(x.val)/2
		case 'spacing':
		case 'position':
			return this.dxa2Px(x.val)
		case 'i':
		case 'vanish':
		case 'u':
		case 'smallCaps':
		case 'b':
			return this.asToggle(x)
		case 'hightlight':
		case 'color':
			return this.asColor(x.val || this.officeDocument.themeColor.get(x.themeColor))
		case 'u':
			return x
		case 'bdx':
			return this.toBorder(x)
		default:
			return super.onToProperty(...arguments)
		}
	}

	asToggle(x){
		if(x==undefined || x.val==undefined){
			return -1
		}else{
			return parseInt(x.val)
		}
	}

	toSpacing(x){
		var r=x, o={}

		if(!r.beforeAutospacing && r.beforeLines)
			o.top=this.dxa2Px((r.beforeLines))
		else if(r.before)
			o.top=this.dxa2Px((r.before))

		if(!r.afterAutospacing && r.afterLines)
			o.bottom=this.dxa2Px((r.afterLines))
		else if(r.after)
			o.bottom=this.dxa2Px((r.after))

		if(!r.line)
			return o

		switch(x.lineRule){
		case 'atLeast':
		case 'exact':
			o.lineHeight=this.dxa2Px((x.line))
			break
		case 'auto':
		default:
			o.lineHeight=(parseInt(r.line)*100/240)+'%'
		}
		o.lineRule=x.lineRule
		return o
	}

	toBorder(x){
		var border=x
		border.sz && (border.sz=border.sz/8);
		border.color && (border.color=this.asColor(border.color))
		return border
	}
}
