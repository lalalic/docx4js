'use strict';

define(['./graphic'], function (Super) {
	return Super.extend({

		getImage: function getImage() {
			var blip = this.wXml.$1('blip'),
			    rid = blip.attr('r:embed');
			return this.wDoc.getRel(rid);
		}
	}, { type: 'image' });
});
//# sourceMappingURL=image.js.map