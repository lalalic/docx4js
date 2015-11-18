'use strict'

class noBreakHyphen extends require('./text'){
	static get type(){return 'noBreakHyphen'}
	getText(){
		return String.fromCharCode(0x2011)
	}
}

module.exports=noBreakHyphen
