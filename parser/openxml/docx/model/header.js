define(['../model'], function(Model){
	return Model.extend(function(wXml, wDoc, mParent, location){
		Model.apply(this,arguments)
		this.location=location
	},{
		type:'header'
	})
})