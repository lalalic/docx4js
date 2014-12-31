define(['../model'],function(Super){
	return Super.extend({
		type:'fieldEnd',
		parse: function(factories){
			this.wDoc.parseContext.field.seperate(this)
		}
	})
})