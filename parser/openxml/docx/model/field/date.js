'use strict';

define(['./field'], function (Super) {
	return Super.extend({}, {
		type: 'fied.date',
		FieldCode: Super.FieldCode.extend({
			parse: function parse() {
				var option = null;
				while (option = this.nextSwitch()) {
					switch (option.type) {
						case '@':
							var i = option.data.indexOf('"');
							if (i != -1) this.format = option.data.substring(0, i);else this.format = option.data;
							break;
					}
				}
			}
		})
	});
});
//# sourceMappingURL=date.js.map