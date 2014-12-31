define(['../model'],function(Model){
	return Model.extend({
		type:'documentStyles',
		_getValidChildren: function(){
			return this.wXml.$('docDefaults,style')
		}
	})
})