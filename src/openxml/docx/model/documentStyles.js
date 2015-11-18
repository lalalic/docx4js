export default class documentStyles extends require('../model'){
	_getValidChildren(){
		return this.wXml.$('docDefaults,style')
	}
	static get type(){return 'documentStyles'}
}
