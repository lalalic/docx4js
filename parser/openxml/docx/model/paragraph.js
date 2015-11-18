'use strict';

define(['../model', './style/paragraph'], function (Model, Style) {
	return Model.extend({
		getStyleId: function getStyleId(a) {
			return this._val('>pPr>pStyle');
		},
		getNamedStyle: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type);
		},
		getDirectStyle: function getDirectStyle(pr) {
			if (pr = this.wXml.$1('>pPr')) return new Style.Properties(pr, this.wDoc, this);
		},
		_shouldIgnore: function _shouldIgnore(wXml) {
			return wXml.localName == 'pPr';
		}
	}, {
		type: 'paragraph'
	});
});
//# sourceMappingURL=paragraph.js.map