'use strict'

class Main extends require('./text'){
	get type(){return 'symbol'}

	getText(){
		return String.fromCharCode(ParseInt('0x'+this._attr('w:char')))
	}
	getFont(){
		return this._attr('w:font')
	}
}


module.exports=Main
