'use strict'

class Tab extends require('./text'){
	static get type(){return 'tab'}
	
	getText(){
		return String.fromCharCode(0x9)
	}
}

module.exports=Tab
