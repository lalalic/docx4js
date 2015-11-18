'use strict';

define(['../model', './style/inline'], function (Model, Style) {
	return Model.extend({

		getStyleId: function getStyleId() {
			return this._val('>rPr>rStyle');
		},
		getNamedStyle: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type);
		},
		getDirectStyle: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>rPr')) && new Style.Properties(pr, this.wDoc, this);
		},
		_shouldIgnore: function _shouldIgnore(wXml) {
			return wXml.localName == 'rPr';
		},
		isWebHidden: function isWebHidden() {
			return this.wXml.$1('>rPr>webHidden');
		},
		isHidden: function isHidden() {
			return this.wXml.$1('>rPr>vanish');
		}
	}, { type: 'inline' });
});
//# sourceMappingURL=inline.js.map