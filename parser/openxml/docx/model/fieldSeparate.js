'use strict';

define(['../model'], function (Super) {
	return Super.extend({

		parse: function parse(factories) {
			this.wDoc.parseContext.field.seperate(this);
		}
	}, { type: 'fieldEnd' });
});
//# sourceMappingURL=fieldSeparate.js.map