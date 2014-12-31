define(['../style'],function(Style){
	return Style.Properties.extend({
		type:'section',
		naming:$.extend(Style.Properties.prototype.naming,{
			pgSz:'size',
			pgMar:'margin'
		}),
		pgSz: function(x){
			return {width:parseInt(x.attr('w:w'))/20, height:parseInt(x.attr('w:h')/20)}
		},
		pgMar: function(x){
			var value=this.asObject(x, function(v){return parseFloat(v)/20})
			if(value.gutter && this.wDoc.getPart('settings').root.$1('gutterAtTop'))
				value.gutterAtRight=1;
			return value;
		},
		cols: function(x){
			var o=this.asObject(x, parseInt)
			o.space && (o.space=o.space/20.0)
			return o
		}
	})
})