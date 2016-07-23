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
			return new Styles.paragraph(pr, this.officeDocument.styles, 'pStyle')
		break
		case 'rPr':
			return new Styles.character(pr, this.officeDocument.styles, 'rStyle')
		break
		case 'tblPr':
			return new Styles.table(pr, this.officeDocument.styles, 'tblStyle')
		break
		default:
			return pr
		}
	}

	onToProperty(node, type){
		const {$:x}=node
		let value
		switch(type){
		case 'rFonts':
			let ascii=x['ascii']||this.officeDocument.fontTheme.get(x['asciiTheme'])
			let asia=x['eastAsia']||this.officeDocument.fontTheme.get(x['eastAsiaTheme'])

			if(ascii || asia)
				return {ascii, asia}
		break
		case 'sz':
			return this.pt2Px(parseInt(x['val'])/2)
		break
		case 'pgSz':
			return {width:this.dxa2Px(x['w']), height:this.dxa2Px(x['h'])}
		break
		case 'pgMar':
			value={}
			Object.keys(x).forEach(a=>value[a.split(':').pop()]=this.dxa2Px(x[a]))
			return value
		break
		case 'cols':
			value={space:this.dxa2Px(x['space'])}
			if(x.col){
				value.data=x.col.map(col=>({
					width:this.dxa2Px(col['w']),
					space:this.dxa2Px(col['space'])
				}))
			}

			return value
		break

		default:
			return super.onToProperty(...arguments)
		}
	}
}
