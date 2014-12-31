define(['./shape'],function(Super){
	return Super.extend({
		type:'textbox',
		_getValidChildren: function(){
			return this.wXml.$1('txbxContent').childNodes
		}
	})
})