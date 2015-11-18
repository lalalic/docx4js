'use strict';

define(['../model'], function (Super) {
	return Super.extend({

		_iterate: function _iterate(f, factories, visitors) {
			this.wDoc.parseContext.field.end(visitors);
		}
	}, { type: 'fieldEnd' });
});
//# sourceMappingURL=fieldEnd.js.map