define(['../model'],function(Super){
	return Super.extend({
		type:'fieldEnd',
		_iterate: function(f, factories, visitors){
			this.wDoc.parseContext.field.end(visitors)
		}
	})
})