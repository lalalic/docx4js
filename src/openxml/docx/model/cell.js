import TableStyle from "./style/table"

export default class cell extends require('../model'){
	static get type(){return 'cell'}
	
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>tcPr'))
			&& new TableStyle.CellProperties(pr,this.wDoc,this)
	}
}
