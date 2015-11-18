define(['../model'],function(Super){
	return Super.extend({

		parse: function(factories){
			this.wDoc.parseContext.field.seperate(this)
		}
	},{type:'fieldEnd'})
})
