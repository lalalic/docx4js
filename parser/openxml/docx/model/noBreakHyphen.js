'use strict'

class Main extends require('./text'){
	get type(){return 'noBreakHyphen'}

	getText(){
		return String.fromCharCode(0x2011)
	}
}


module.exports=Main
