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
		getAppliedStyles: function() {
			var pr = this.wXml.$1('>rPr');
			if (!pr) {
				return {};
			}
			var styleObj = new Style.Properties(pr, this.wDoc, this);
			var styles = styleObj.appliedStyles();
			if (styles.b) {
				styles.b = true;
			}
			if (styles.i) {
				styles.i = true;
			}
			if (styles.u) {
				styles.u = true;
			}
			if (styles.strike) {
				styles.strike = true;
			}
			return styles;
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
