define(['./graphic'],function(Super){
	return Super.extend({
		type:'image',
		asLink: function(){
			var blip=this.wXml.$1('blip'), rid=blip.attr('r:embed')
			return this.src=this.wDoc.getRel(rid)
		}
	})
})