define(['./rangeBase'],function(Range){
	return Range.extend({
		type:'bookmarkEnd',
		getName: function(){
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')]
		}
	})
})