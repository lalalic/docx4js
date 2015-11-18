'use strict';

define(['../model'], function (Super) {
	return Super.extend({

		parse: function parse() {
			Super.prototype.parse.apply(this, arguments);
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')] = this.wXml.attr('w:name');
		},
		getName: function getName() {
			return this.wXml.attr('w:name');
		}
	}, {
		type: 'bookmarkStart'
	});
});
//# sourceMappingURL=bookmarkStart.js.map