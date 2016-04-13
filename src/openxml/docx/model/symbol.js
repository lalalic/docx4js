export default class symbol extends require('./text'){
	static get type(){return 'symbol'}
	getText(){
		return String.fromCharCode(ParseInt('0x'+this._attr('w:char')))
	}
	getFont(){
		return this._attr('w:font')
	}
}
