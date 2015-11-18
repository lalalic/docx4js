define(['../model'],function(Model){
	return Model.extend({

		_getValidChildren: function(){
			return this.wXml.$('abstractNum')
		}
	},{type:'listStyles'})
})
