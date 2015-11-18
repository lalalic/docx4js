export default class fieldSeperate extends require('../model'){
	parse(factories){
		this.wDoc.parseContext.field.seperate(this)
	}
	static get type(){return 'fieldEnd'}
}
