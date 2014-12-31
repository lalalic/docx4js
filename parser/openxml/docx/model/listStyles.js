define(['../model'],function(Model){
	return Model.extend({
		type:'listStyles',
		_getValidChildren: function(){
			return this.wXml.$('abstractNum')
		}
	})
})