import TableStyle from './style/table'

export default class row extends require('../model'){
	parse(){
		this.wDoc.parseContext.table.pushRow(this)
		super.parse(...arguments)
		this.wDoc.parseContext.table.popRow(this)
	}
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>trPr')) && new TableStyle.RowProperties(pr,this.wDoc,this)
	}
	static get type(){return 'row'}
}
