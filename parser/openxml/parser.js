"use strict";

define([], function () {
	return $.newClass(function (wXml, wDoc) {
		this.wXml = wXml;
		this.wDoc = wDoc;
	}, {
		type: null,
		parse: function parse(visitFactories) {}
	});
});
//# sourceMappingURL=parser.js.map