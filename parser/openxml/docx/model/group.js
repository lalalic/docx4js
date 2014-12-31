define(['./shape'],function(Super){
	return Super.extend({
		type:'group',
		_getValidChildren: function(){
			return this.wXml.$('wsp')
		}
	},{
		Properties: Super.Properties.extend({
			
		}) 
	})
})