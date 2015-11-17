'use strict'

class Main extends require('./text'){
	get type(){return 'softHyphen'}

	getText(){
		return String.fromCharCode(0xAD)
	}
}


module.exports=Main
