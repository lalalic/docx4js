define(['../model', './section'],function(Model, Section){
	return Model.extend({
		_getValidChildren: function(){
			return this.wXml.$('sectPr')
		}
	},{
		type:'body'
	})
})
