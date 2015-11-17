'use strict'
class Main extends require('../model'){
	get type(){return 'text'}

	getText(){
		return this.wXml.textContent
	}
}

module.exports=Main
