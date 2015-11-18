'use strict';

define(['../model'], function (Model) {
	return Model.extend({

		getLink: function getLink(a) {
			return (a = this._attr('r:id')) ? this._getLocalLink(a) : '#' + this._attr('w:anchor');
		},
		_getLocalLink: function _getLocalLink(id) {
			return this.wDoc.partMain.getRel(id);
		}
	}, { type: 'hyperlink' });
});
//# sourceMappingURL=hyperlink.js.map