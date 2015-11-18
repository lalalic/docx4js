'use strict';

define(['./rangeBase'], function (Range) {
	return Range.extend({

		getName: function getName() {
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')];
		}
	}, {
		type: 'bookmarkEnd'
	});
});
//# sourceMappingURL=bookmarkEnd.js.map