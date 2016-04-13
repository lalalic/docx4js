export default class text extends require('../model'){
	static get type(){return 'text'}
	getText(){
		return this.wXml.textContent
	}
}
