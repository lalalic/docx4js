define(['../model', './section'],function(Model, Section){
	return Model.extend({
		type:'body',
		_getValidChildren: function(){
			return this.wXml.$('sectPr')
		}
	})
})