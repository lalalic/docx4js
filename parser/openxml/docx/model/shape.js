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
			naming: $.extend(Style.Properties.prototype.naming, Drawing.SpProperties.prototype.naming,{
				
			}),
			_getValidChildren: function(t){
				var children=((t=this.wXml.$('>style>*')) && t.asArray() ||[])
					.concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
				var bodyPr=this.wXml.$1('bodyPr')
				if(bodyPr){
					for(var i=0, attrs=bodyPr.attributes, len=attrs.length;i<len;i++)
						children.push(attrs[i])
				}
				return children
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
			},
			lIns: function(x){
				if(x=parseInt(x.value))
					return this.asPt(x,'cm')
				return this.EMPTY
			},
			tIns: function(x){
				return this.lIns(x)
			},
			rIns: function(x){
				return this.lIns(x)
			},
			bIns: function(x){
				return this.lIns(x)
			},
			anchor: function(x){
				switch(x.value){
				case 'b':
					return 'bottom'
				case 't':
					return 'top'
				default:
					return 'middle'
				}
			},
			vert: function(x){
				switch(x.value){
				case 'horz':
					return this.EMPTY
				case 'eaVert':
					return 90
				case 'vert270':
					return 270
				default:
					console.warn('not support')
					return this.EMPTY
				}
			}
		}))
	})
})