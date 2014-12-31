define(['../model','./style', './drawing'], function(Super,Style, Drawing){
	return Super.extend({
		type:'shape',
		getDirectStyle: function(){
			return new this.constructor.Properties(this.wXml,this.wDoc,this)
		},
		_getValidChildren: function(){
			return this.wXml.$('txbxContent')
		}
	},{
		Properties: Style.Properties.extend($.extend({},Drawing.SpProperties.prototype,{
			_getValidChildren: function(t){
				return ((t=this.wXml.$('>style>*')) && t.asArray() ||[]).concat(this.wXml.$('>spPr>*').asArray())
			},
			lnRef: function(x, t){
				var o=this.wDoc.getFormatTheme().line(x.attr('idx'))
				if(o.color=='phClr')
					o.color=this.solidFill(x)
				return o
			},
			fillRef: function(x, t){
				var o=this.wDoc.getFormatTheme().fill(x.attr('idx'))
				switch(typeof(o)){
				case 'string':
					if(o=='phClr')
						o=this.solidFill(x)
					break
				case 'object':
					if(o.color=='phClr')
						o.color=this.solidFill(x)
					break
				}
				return o
			},
			fontRef: function(x){
				return {color:this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx'))}
			},
			effectRef: function(){
				
			}
		}))
	})
})