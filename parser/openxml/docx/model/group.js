'use strict';

define(['./shape'], function (Super) {
	return Super.extend({

		_getValidChildren: function _getValidChildren() {
			return this.wXml.$('wsp');
		}
	}, {
		type: 'group',
		Properties: Super.Properties.extend({})
	});
});
//# sourceMappingURL=group.js.map