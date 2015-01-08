define(['./graphic'],function(Super){
	return Super.extend({
		type:'image',
		getImage: function(){
			var blip=this.wXml.$1('blip'), rid=blip.attr('r:embed')
			return this.wDoc.getRel(rid)
		}
	})
})