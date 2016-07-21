import Base from "../document"
import OfficeDocument from "./officeDocument"

export default class extends Base{
	static get ext(){return 'docx'}
	
	static OfficeDocument=OfficeDocument

	onCreateElement(node, type){
		return node
	}
	
	createElement(node){
		const {styles}=this.officeDocument
		let {name, attributes:{directStyle}, children}=node
		let tag=name.split(':').pop()
		switch(){
		case "p":
			if(directStyle && directStyle['w:numPr']){
				return onCreateElement(node, "list")
			}
		break
		case "r":
			
		break
		case "tbl":
		break
		case "std":
		break
		}
		
		return onCreateElement(node, tag)
	}
}
