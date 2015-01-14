define(['../model','./style/table'], function(Model, Style){
	return Model.extend({
		type:'table',
		getStyleId: function(a){
			return this._val('>tblPr>tblStyle')
		},
		getNamedStyle: function(){
			return this.wDoc.style.get(this.getStyleId())|| this.wDoc.style.getDefault(Style.prototype.type)
		},
		getDirectStyle: function(pr){
			return (pr=this.wXml.$1('>tblPr')) && new Style.Properties(pr,this.wDoc,this)
		},
		getColWidth: function(){
			var widths=[], sum=0
			for(var cols=this.wXml.$('>tblGrid>gridCol'),len=cols.length,i=0,a;i<len;i++){
				widths.push(a=parseInt(cols[i].attr('w:w')))
				sum+=a
			}
			return {sum:sum, cols:widths};
		},
		_shouldIgnore: function(wXml){
			return wXml.localName=='tblPr'||wXml.localName=='tblGrid'
		}
	})
})
