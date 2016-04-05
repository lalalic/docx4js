export default class row extends require('../model'){
	getDirectStyle(pr){
		return (pr=this.wXml.$1('>trPr')) && new require('./style/table').RowProperties(pr,this.wDoc,this)
	}
	static get type(){return 'row'}
}
