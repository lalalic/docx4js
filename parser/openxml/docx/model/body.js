'use strict';

define(['../model', './section'], function (Model, Section) {
	return Model.extend({
		_getValidChildren: function _getValidChildren() {
			return this.wXml.$('sectPr');
		}
	}, {
		type: 'body'
	});
});
//# sourceMappingURL=body.js.map