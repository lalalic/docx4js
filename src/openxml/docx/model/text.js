export default class Text extends require('../model'){
	static get type(){return 'text'}
	getText(){
		return this.wXml.textContent
	}
}
