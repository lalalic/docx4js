define(['../model','./style/paragraph'], function(Model, Style){
	return Model.extend({
		getStyleId: function(a){
			return this._val('>pPr>pStyle')
		},
		getNamedStyle: function(){
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type)
		},
		getDirectStyle: function(pr){
			if(pr=this.wXml.$1('>pPr'))
				return new Style.Properties(pr,this.wDoc,this)
		},
		_shouldIgnore: function(wXml){
			return wXml.localName=='pPr'
		}
	},{
		type:'paragraph'
	})
})
