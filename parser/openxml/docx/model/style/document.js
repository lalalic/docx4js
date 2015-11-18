"use strict"
class Document extends require("./paragraph"){
	constructor(wXml,wDoc,mParent){
		super(wXml,wDoc,mParent)
		wDoc.style.setDefault(this)
	}

	isDefault(){
		return true
	}
}
Object.assign(module.exports=Document,{type:'style.document'})
