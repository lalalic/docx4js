define(['./drawing'],function(Super){
	return Super.extend(function(wXml){
		Super.apply(this,arguments)
		this.wDrawing=wXml
	},{
		
	},{
		Properties: Super.Properties.extend($.extend({},Super.SpProperties.prototype,{
			naming: $.extend({},Super.Properties.prototype.naming,Super.SpProperties.prototype.naming),
			_getValidChildren: function(t){
				return Super.Properties.prototype._getValidChildren.apply(this,arguments)
					.concat(this.wXml.$1('spPr').childNodes.asArray())
			}
		}))
	})
})