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
			if(directStyle && directStyle['w:numPr'])
				tag="list"
		break
		}

		return this.onCreateElement(node, tag)
	}

	toProperty(node){
		const {name}=node
		let pr=super.toProperty(node)

		switch(name){
		case 'w:pPr':
			return new Styles.paragraph(pr, this.officeDocument.styles, 'pStyle')
		break
		case 'w:rPr':
			return new Styles.character(pr, this.officeDocument.styles, 'rStyle')
		break
		case 'w:tblPr':
			return new Styles.table(pr, this.officeDocument.styles, 'tblStyle')
		break
		default:
			return pr
		}
	}

	onToProperty(node){
		const {name, attributes:x, children}=node
		let tag=name.split(':').pop(), value
		switch(tag){
		case 'rFonts':
			let ascii=x['w:ascii']||this.officeDocument.fontTheme.get(x['w:asciiTheme'])
			let asia=x['w:eastAsia']||this.officeDocument.fontTheme.get(x['w:eastAsiaTheme'])

			if(ascii || asia)
				return {ascii, asia}
		break
		case 'sz':
			return this.pt2Px(parseInt(x['w:val'])/2)
		break
		case 'pgSz':
			return {width:this.dxa2Px(x['w:w']), height:this.dxa2Px(x['w:h'])}
		break
		case 'pgMar':
			value={}
			Object.keys(x).forEach(a=>value[a.split(':').pop()]=this.dxa2Px(x[a]))
			return value
		break
		case 'cols':
			value={space:this.dxa2Px(x['w:space'])}
			if(x.col){
				value.data=x.col.map(col=>({
					width:this.dxa2Px(col['w:w']),
					space:this.dxa2Px(col['w:space'])
				}))
			}

			return value
		break

		default:
			return super.onToProperty(node)
		}
	}

	dxa2Px(a){
		return this.pt2Px(parseInt(a)/20.0)
	}

	pt2Px(pt){
		return pt*96/92
	}
}
