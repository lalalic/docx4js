import TableStyle from "./style/table"

export default class cell extends require('../model'){
	static get type(){return 'cell'}
	
	parse(){
		this.wDoc.parseContext.table.pushCell(this)
		super.parse(...arguments)
		this.wDoc.parseContext.table.popCell(this)
	}
	
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>tcPr'))
			&& new TableStyle.CellProperties(pr,this.wDoc,this)
	}
	
	isFirstRow(){
		return this.wDoc.parseContext.table.isFirstRow()
	}
	
	isLastRow(){
		return this.wDoc.parseContext.table.isLastRow()
	}
	
	isFirstCol(){
		return this.wDoc.parseContext.table.isFirstCol()
	}
	
	isLastCol(){
		return this.wDoc.parseContext.table.isLastCol()
	}
}
