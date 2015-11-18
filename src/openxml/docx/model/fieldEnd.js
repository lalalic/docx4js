export default class fieldEnd extends require('../model'){
	_iterate(f, factories, visitors){
		this.wDoc.parseContext.field.end(visitors)
	}
	static get type(){return 'fieldEnd'}
}
