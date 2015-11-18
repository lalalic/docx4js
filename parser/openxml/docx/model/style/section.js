'use strict';

define(['../style'], function (Style) {
	return Style.Properties.extend({
		naming: $.extend(Style.Properties.prototype.naming, {
			pgSz: 'size',
			pgMar: 'margin'
		}),
		pgSz: function pgSz(x) {
			return { width: parseInt(x.attr('w:w')) / 20, height: parseInt(x.attr('w:h') / 20) };
		},
		pgMar: function pgMar(x) {
			var value = this.asObject(x, function (v) {
				return parseFloat(v) / 20;
			});
			if (value.gutter && this.wDoc.getPart('settings').documentElement.$1('gutterAtTop')) value.gutterAtRight = 1;
			return value;
		},
		cols: function cols(x) {
			var o = this.asObject(x, parseInt);
			o.space && (o.space = o.space / 20.0);
			return o;
		}
	}, { type: 'section' });
});
//# sourceMappingURL=section.js.map