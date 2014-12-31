define(['../model'],function(Super){
	return Super.extend({
		type:'bookmarkStart',
		parse: function(){
			Super.prototype.parse.apply(this,arguments)
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')]=this.wXml.attr('w:name')
		},
		getName: function(){
			return this.wXml.attr('w:name')
		}
	})
})