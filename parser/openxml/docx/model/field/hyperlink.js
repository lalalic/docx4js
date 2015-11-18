'use strict';

define(['./field'], function (Super) {
	return Super.extend(function (instruct) {
		Super.apply(this, arguments);
		this.link = instruct.split('"')[1];
	}, {
		getLink: function getLink() {
			return this.link;
		}
	}, { type: 'field.hyperlink' });
});
//# sourceMappingURL=hyperlink.js.map