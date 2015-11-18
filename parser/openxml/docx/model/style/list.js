"use strict"

class List extends require('../style'){
	constructor(wXml, wDoc, mParent){
		super(wXml, wDoc, mParent)
		this.id=this.name=this.constructor.asStyleId(wXml.attr('w:numId'))
		this.wDoc.style.set(this)
	}

	static get type(){return 'style.list'}

	getParentStyle(){
		var definition=this.wDoc.style.get(require('./numberingDefinition').asStyleId(this.wXml.$1('abstractNumId').attr('w:val')))
		if(definition.link){
			return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle()
		}else
			return definition
	}
	getNumId(){
		return this.wXml.attr('w:numId')
	}
	hasOverride(){
		return this.wXml.childNodes.length!=1
	}

	static asStyleId(numId){
		return '_list'+numId
	}
}

module.exports=List
