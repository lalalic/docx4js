'use strict';

define(['../model', './style/table'], function (Model, Style) {
	return Model.extend({
		getStyleId: function getStyleId(a) {
			return this._val('>tblPr>tblStyle');
		},
		getNamedStyle: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(Style.type);
		},
		getDirectStyle: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>tblPr')) && new Style.Properties(pr, this.wDoc, this);
		},
		getColWidth: function getColWidth() {
			var widths = [],
			    sum = 0;
			for (var cols = this.wXml.$('>tblGrid>gridCol'), len = cols.length, i = 0, a; i < len; i++) {
				widths.push(a = parseInt(cols[i].attr('w:w')));
				sum += a;
			}
			return { sum: sum, cols: widths };
		},
		_shouldIgnore: function _shouldIgnore(wXml) {
			return wXml.localName == 'tblPr' || wXml.localName == 'tblGrid';
		}
	}, { type: 'table' });
});
//# sourceMappingURL=table.js.map