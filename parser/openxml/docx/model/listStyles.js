'use strict';

define(['../model'], function (Model) {
	return Model.extend({

		_getValidChildren: function _getValidChildren() {
			return this.wXml.$('abstractNum');
		}
	}, { type: 'listStyles' });
});
//# sourceMappingURL=listStyles.js.map