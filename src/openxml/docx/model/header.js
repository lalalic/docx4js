export default class header extends require('../model'){
	constructor(wXml, wDoc, mParent, location){
		super(...arguments)
		this.location=location
	}
	static get type(){return 'header'}
}
