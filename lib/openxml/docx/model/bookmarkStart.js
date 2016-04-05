export default class bookmarkStart extends require('../model'){
	parse(){
		super.parse(...arguments)
		this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')]=this.wXml.attr('w:name')
	}
	getName(){
		return this.wXml.attr('w:name')
	}
	static get type(){return 'bookmarkStart'}
}
