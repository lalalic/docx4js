define(['../model','./style/table'], function(Model, Style){
	return Model.extend({
		type:'row',
		getDirectStyle: function(pr){
			return (pr=this.wXml.$1('>trPr')) && new Style.RowProperties(pr,this.wDoc,this)
		}
	})
})