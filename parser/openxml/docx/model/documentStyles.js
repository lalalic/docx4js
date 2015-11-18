'use strict';

define(['../model'], function (Model) {
	return Model.extend({

		_getValidChildren: function _getValidChildren() {
			return this.wXml.$('docDefaults,style');
		}
	}, { type: 'documentStyles' });
});
//# sourceMappingURL=documentStyles.js.map