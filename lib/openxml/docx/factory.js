"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = identify;

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identify(wXml, officeDocument) {
	var tag = wXml.name.split(":").pop();
	if (identities[tag]) return identities[tag].apply(identities, arguments) || tag;

	return tag;
}

var identities = {
	p: function p(wXml, officeDocument) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var styleId = $("w\\:pPr>w\\:pStyle").attr("w:val");

		if ($("w\\:pPr>w\\:numPr").length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr").length) return "list";

		if ($("w\\:pPr>w\\:outlineLvl").length || styleId && officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:outlineLvl").length) return "heading";
	},
	fldChar: function fldChar(wXml) {
		return wXml.attribs["w:fldCharType"];
	},
	inline: function inline(wXml) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		return $('w\\:graphic>w\\:graphicData').attr('uri').split('/').pop();
	},
	std: function std(wXml) {
		var $ = _cheerio2.default.load(wXml, { xmlMode: true });
		var elBinding = $('w\\:sdtPr>w\\:dataBinding').get(0);
		if (elBinding) {
			//properties
			var path = elBinding.attribs['w:xpath'],
			    d = path.split(/[\/\:\[]/),
			    _name = (d.pop(), d.pop());
			return "property." + _name;
		} else {
			//controls
			var elType = $('w\\:sdtPr').find("text, picture, docPartList, comboBox, dropDownList, date, checkbox").get(0);
			var type = (elType ? elType.name : 'richtext').split(":").pop();
			return "control." + name;
		}
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJwIiwiJCIsImxvYWQiLCJ4bWxNb2RlIiwic3R5bGVJZCIsImF0dHIiLCJsZW5ndGgiLCJzdHlsZXMiLCJmbGRDaGFyIiwiYXR0cmlicyIsImlubGluZSIsInN0ZCIsImVsQmluZGluZyIsImdldCIsInBhdGgiLCJkIiwiZWxUeXBlIiwiZmluZCIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O2tCQUV3QkEsUTs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxjQUF4QixFQUF1QztBQUNyRCxLQUFNQyxNQUFJRixLQUFLRyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQVY7QUFDQSxLQUFHQyxXQUFXSixHQUFYLENBQUgsRUFDQyxPQUFPSSxXQUFXSixHQUFYLG9CQUFtQkssU0FBbkIsS0FBK0JMLEdBQXRDOztBQUVELFFBQU9BLEdBQVA7QUFDQTs7QUFFRCxJQUFNSSxhQUFXO0FBQ2hCRSxFQURnQixhQUNkUixJQURjLEVBQ1RDLGNBRFMsRUFDTTtBQUNyQixNQUFJUSxJQUFFLGtCQUFNQyxJQUFOLENBQVdWLElBQVgsRUFBZ0IsRUFBQ1csU0FBUSxJQUFULEVBQWhCLENBQU47QUFDQSxNQUFJQyxVQUFRSCxFQUFFLG9CQUFGLEVBQXdCSSxJQUF4QixDQUE2QixPQUE3QixDQUFaOztBQUVBLE1BQUdKLEVBQUUsbUJBQUYsRUFBdUJLLE1BQXZCLElBQ0RGLFdBQVlYLGVBQWVjLE1BQWYsOEJBQWdESCxPQUFoRCxvQkFBdUVFLE1BRHJGLEVBRUMsT0FBTyxNQUFQOztBQUVELE1BQUdMLEVBQUUsd0JBQUYsRUFBNEJLLE1BQTVCLElBQ0RGLFdBQVdYLGVBQWVjLE1BQWYsOEJBQWdESCxPQUFoRCx5QkFBNEVFLE1BRHpGLEVBRUMsT0FBTyxTQUFQO0FBQ0QsRUFaZTtBQWFoQkUsUUFiZ0IsbUJBYVJoQixJQWJRLEVBYUg7QUFDWixTQUFPQSxLQUFLaUIsT0FBTCxDQUFhLGVBQWIsQ0FBUDtBQUNBLEVBZmU7QUFnQmhCQyxPQWhCZ0Isa0JBZ0JUbEIsSUFoQlMsRUFnQko7QUFDWCxNQUFJUyxJQUFFLGtCQUFNQyxJQUFOLENBQVdWLElBQVgsRUFBZ0IsRUFBQ1csU0FBUSxJQUFULEVBQWhCLENBQU47QUFDQSxTQUFPRixFQUFFLDZCQUFGLEVBQWlDSSxJQUFqQyxDQUFzQyxLQUF0QyxFQUE2Q1QsS0FBN0MsQ0FBbUQsR0FBbkQsRUFBd0RDLEdBQXhELEVBQVA7QUFDQSxFQW5CZTtBQW9CaEJjLElBcEJnQixlQW9CWm5CLElBcEJZLEVBb0JQO0FBQ1IsTUFBSVMsSUFBRSxrQkFBTUMsSUFBTixDQUFXVixJQUFYLEVBQWdCLEVBQUNXLFNBQVEsSUFBVCxFQUFoQixDQUFOO0FBQ0EsTUFBSVMsWUFBVVgsRUFBRSwyQkFBRixFQUErQlksR0FBL0IsQ0FBbUMsQ0FBbkMsQ0FBZDtBQUNBLE1BQUdELFNBQUgsRUFBYTtBQUFDO0FBQ2IsT0FBSUUsT0FBS0YsVUFBVUgsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQ00sSUFBRUQsS0FBS2xCLEtBQUwsQ0FBVyxVQUFYLENBREg7QUFBQSxPQUVDRCxTQUFNb0IsRUFBRWxCLEdBQUYsSUFBUWtCLEVBQUVsQixHQUFGLEVBQWQsQ0FGRDtBQUdBLHdCQUFtQkYsS0FBbkI7QUFDQSxHQUxELE1BS007QUFBQztBQUNOLE9BQUlxQixTQUFPZixFQUFFLFdBQUYsRUFBZWdCLElBQWYsQ0FBb0Isb0VBQXBCLEVBQTBGSixHQUExRixDQUE4RixDQUE5RixDQUFYO0FBQ0EsT0FBSUssT0FBSyxDQUFDRixTQUFTQSxPQUFPckIsSUFBaEIsR0FBdUIsVUFBeEIsRUFBb0NDLEtBQXBDLENBQTBDLEdBQTFDLEVBQStDQyxHQUEvQyxFQUFUO0FBQ0EsdUJBQWtCRixJQUFsQjtBQUNBO0FBQ0Q7QUFqQ2UsQ0FBakIiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcblx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcblx0aWYoaWRlbnRpdGllc1t0YWddKVxuXHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXG5cblx0cmV0dXJuIHRhZ1xufVxuXG5jb25zdCBpZGVudGl0aWVzPXtcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1jaGVlci5sb2FkKHdYbWwse3htbE1vZGU6dHJ1ZX0pXG5cdFx0bGV0IHN0eWxlSWQ9JChcIndcXFxcOnBQcj53XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXG5cblx0XHRpZigkKFwid1xcXFw6cFByPndcXFxcOm51bVByXCIpLmxlbmd0aCB8fFxuXHRcdFx0KHN0eWxlSWQgJiYgIG9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHJgKS5sZW5ndGgpKVxuXHRcdFx0cmV0dXJuIFwibGlzdFwiXG5cblx0XHRpZigkKFwid1xcXFw6cFByPndcXFxcOm91dGxpbmVMdmxcIikubGVuZ3RoIHx8XG5cdFx0XHQoc3R5bGVJZCAmJiBvZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5sZW5ndGgpKVxuXHRcdFx0cmV0dXJuIFwiaGVhZGluZ1wiXG5cdH0sXG5cdGZsZENoYXIod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cblx0fSxcblx0aW5saW5lKHdYbWwpe1xuXHRcdGxldCAkPWNoZWVyLmxvYWQod1htbCx7eG1sTW9kZTp0cnVlfSlcblx0XHRyZXR1cm4gJCgnd1xcXFw6Z3JhcGhpYz53XFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcblx0fSxcblx0c3RkKHdYbWwpe1xuXHRcdGxldCAkPWNoZWVyLmxvYWQod1htbCx7eG1sTW9kZTp0cnVlfSlcblx0XHRsZXQgZWxCaW5kaW5nPSQoJ3dcXFxcOnNkdFByPndcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcblx0XHRcdHJldHVybiBgcHJvcGVydHkuJHtuYW1lfWBcblx0XHR9ZWxzZSB7Ly9jb250cm9sc1xuXHRcdFx0bGV0IGVsVHlwZT0kKCd3XFxcXDpzZHRQcicpLmZpbmQoXCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIikuZ2V0KDApXG5cdFx0XHRsZXQgdHlwZT0oZWxUeXBlID8gZWxUeXBlLm5hbWUgOiAncmljaHRleHQnKS5zcGxpdChcIjpcIikucG9wKClcblx0XHRcdHJldHVybiBgY29udHJvbC4ke25hbWV9YFxuXHRcdH1cblx0fVxufVxuIl19