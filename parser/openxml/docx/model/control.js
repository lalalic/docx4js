'use strict';

define(['./sdt'], function (SDT) {
	return SDT.extend({
		getTag: function getTag(t) {
			return (t = this.wXml.$1('>sdtPr>tag')) && t.attr('w:val') || '';
		},
		isInline: function isInline() {
			return !this.wXml.$1('p,table');
		}
	});
});
//# sourceMappingURL=control.js.map