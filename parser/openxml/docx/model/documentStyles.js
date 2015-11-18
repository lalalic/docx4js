define(['../model'],function(Model){
	return Model.extend({

		_getValidChildren: function(){
			return this.wXml.$('docDefaults,style')
		}
	},{type:'documentStyles'})
})
