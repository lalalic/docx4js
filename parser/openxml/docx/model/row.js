'use strict';

define(['../model', './style/table'], function (Model, Style) {
	return Model.extend({

		getDirectStyle: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>trPr')) && new Style.RowProperties(pr, this.wDoc, this);
		}
	}, { type: 'row' });
});
//# sourceMappingURL=row.js.map