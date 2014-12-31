define(['../model'], function(Model){
	return Model.extend({
		type:'text',
		getText:function(){
			return this.wXml.textContent
		}
	})
})