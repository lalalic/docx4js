define(['../style'],function(Style){
	return Style.extend({
		type:'style.inline',
		_iterate: function(f,factories,visitors){
			var pr=this.wXml.$1('>rPr')
			pr && new this.constructor.Properties(pr,this.wDoc,this).parse(visitors)
		}
	},{
		Properties: Style.Properties.extend({
			type:'inline',
			rFonts:function(x){
				var v={},t;
				if(t=x.attr('w:ascii'))
					v.ascii=t
				else if(t=x.attr('w:asciiTheme'))
					v.ascii=this.wDoc.getFontTheme().get(t)
				
				if(t=x.attr('w:eastAsia'))
					v.asia=t
				else if(t=x.attr('w:eastAsiaTheme'))
					v.asia=this.wDoc.getFontTheme().get(t)
				return v
			},
			b:function(x){
				return {}
			},
			sz: function(x){
				return parseFloat(x.attr('w:val'))/2
			},
			color: function(x){
				return this.asColor((x.attr('w:val') || this.wDoc.getColorTheme().get(x.attr('w:themeColor'))))
			},
			i:function(x){
				return {}
			},
			u: function(x){
				return this.asObject(x)
			},
			bdr: function(x){
				var border=this.asObject(x)
				border.sz && (border.sz=border.sz/8);
				border.color && (border.color=this.asColor(border.color))
				return border
			},
			lang: function(x){
				return x.attr('w:val')
			},
			vertAlign: function(x){
				return x.attr('w:val')
			},
			highlight: function(x){
				return this.asColor(x.attr('w:val'))
			}
		})
	})
})