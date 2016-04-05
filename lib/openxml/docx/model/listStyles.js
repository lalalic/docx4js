export default class listStyles extends require('../model'){
	_getValidChildren(){
		return this.wXml.$('abstractNum')
	}
	static get type(){return 'listStyles'}
}
