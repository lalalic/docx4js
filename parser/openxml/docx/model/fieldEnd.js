define(['../model'],function(Super){
	return Super.extend({

		_iterate: function(f, factories, visitors){
			this.wDoc.parseContext.field.end(visitors)
		}
	},{type:'fieldEnd'})
})
