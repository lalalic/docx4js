'use strict';

define(['./paragraph'], function (Paragraph) {
	return Paragraph.extend({

		getOutlineLevel: function getOutlineLevel() {
			return this.getNamedStyle().getOutlineLevel();
		}
	}, { type: 'heading' });
});
//# sourceMappingURL=heading.js.map