define(['../model','./style', './drawing'], function(Super,Style, Drawing){
	function phClr(o, clr, a){
		for(var i in o){
			switch(typeof(a=o[i])){
			case 'string':
				if(a=='phClr')
					o[i]=clr
				break
			case 'object':
				phClr(a, clr)
			}
		}
		return o
	}
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
				return ((t=this.wXml.$('>style>*')) && t.asArray() ||[]).concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray())
			},
			lnRef: function(x){
				return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')),this.solidFill(x))
			},
			fillRef: function(x){
				return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')),this.solidFill(x))
			},
			fontRef: function(x){
				return {color:this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx'))}
			},
			effectRef: function(){
				
			},
			spAutoFit: function(){
				return true
			}
		}))
	})
})