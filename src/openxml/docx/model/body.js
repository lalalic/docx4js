export default class Body extends require('../model'){
	_getValidChildren(){
		return this.wXml.$('sectPr')
	}

	static get type(){return 'body'}
}
