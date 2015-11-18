define(['../model','./style/table'], function(Model,Style){
	return Model.extend({

		getDirectStyle: function(pr){
			return (pr=this.wXml.$1('>tcPr')) && new Style.CellProperties(pr,this.wDoc,this)
		}
	},{
		type:'cell'
	})
})
