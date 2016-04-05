export default class fieldInstruct extends require('../model'){
	constructor(wXml,wDoc,mParent){
		super(...arguments)
		wDoc.parseContext.field.instruct(wXml.textContent.trim())
	}
	parse(){

	}
	static get type(){return 'fieldInstruct'}
}
