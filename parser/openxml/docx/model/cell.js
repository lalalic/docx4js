define(['../model','./style/table'], function(Model,Style){
	return Model.extend({
		type:'cell',
		getDirectStyle: function(pr){
			return (pr=this.wXml.$1('>tcPr')) && new Style.CellProperties(pr,this.wDoc,this)
		}
	})
})