define(['../model'],function(Super){
	return Super.extend(function(wXml,wDoc,mParent){
		Super.apply(this,arguments)
		wDoc.parseContext.field.instruct(wXml.textContent)
	},{
		type:'fieldInstruct',
		parse: function(){}
	})
})