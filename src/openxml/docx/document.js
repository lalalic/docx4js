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
		switch(tag){
		case "p":
			if(directStyle && directStyle['w:numPr'])
				tag="list"
		break
		}
		
		return this.onCreateElement(node, tag)
	}
}
