define(['./rangeBase'],function(Range){
	return Range.extend({

		getName: function(){
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')]
		}
	},{
		type:'bookmarkEnd'
	})
})
