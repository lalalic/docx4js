define(['../style','./numberingDefinition'],function(Style, Numbering){
	function asStyleId(numId){return '_list'+numId}
	return Style.extend(function(wXml, wDoc, mParent){
		Style.apply(this,arguments)
		this.id=this.name=asStyleId(wXml.attr('w:numId'))
		this.wDoc.style.set(this)
	},{
		type:'style.list',
		getParentStyle: function(){
			var definition=this.wDoc.style.get(Numbering.asStyleId(this.wXml.$1('abstractNumId').attr('w:val')))
			if(definition.link){
				return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle()
			}else
				return definition
		},
		getNumId: function(){
			return this.wXml.attr('w:numId')
		},
		hasOverride: function(){
			return this.wXml.childNodes.length!=1
		}
	},{
		asStyleId: asStyleId
	})
})