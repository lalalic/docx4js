define(['../model','./style/inline'], function(Model, Style){
	return Model.extend({
		type:'inline',
		getStyleId: function(){
			return this._val('>rPr>rStyle')
		},
		getNamedStyle: function(){
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.prototype.type)
		},
		getDirectStyle: function(pr){
			return (pr=this.wXml.$1('>rPr')) && new Style.Properties(pr,this.wDoc,this)
		},
		_shouldIgnore: function(wXml){
			return wXml.localName=='rPr'
		},
		isWebHidden: function(){
			return this.wXml.$1('>rPr>webHidden')
		},
		isHidden: function(){
			return this.wXml.$1('>rPr>vanish')
		}
	})
})