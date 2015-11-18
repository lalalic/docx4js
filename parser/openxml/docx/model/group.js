define(['./shape'],function(Super){
	return Super.extend({

		_getValidChildren: function(){
			return this.wXml.$('wsp')
		}
	},{
		type:'group',
		Properties: Super.Properties.extend({

		})
	})
})
