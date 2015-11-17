'use strict'

class Main extends require('./text'){
	get type(){return 'tab'}

	getText(){
		return String.fromCharCode(0x9)
	}
}

module.exports=Main
