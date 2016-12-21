"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createElement = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

exports.identify = identify;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function identify(wXml, officeDocument) {
	var tag = wXml.name.split(":").pop();
	if (identities[tag]) return identities[tag].apply(identities, arguments) || tag;

	return tag;
}

var identities = {
	document: function document(wXml) {
		return { type: "document", children: wXml.children[0].children };
	},
	p: function p(wXml, officeDocument) {
		var $ = officeDocument.content(wXml);
		var type = "p";

		var identity = { type: type, pr: wXml.children.find(function (_ref) {
				var name = _ref.name;
				return name == "w:pPr";
			}), children: wXml.children.filter(function (_ref2) {
				var name = _ref2.name;
				return name != "w:pPr";
			}) };

		var pPr = $.find("w\\:pPr");
		if (pPr.length) {
			var styleId = pPr.find("w\\:pStyle").attr("w:val");

			var numPr = pPr.find("w\\:numPr");
			if (!numPr.length && styleId) {
				numPr = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr");
			}

			if (numPr.length) {
				identity.type = "list";
				identify.numId = numPr.find("w\\:numId").attr("w:val");
				identify.level = numPr.find("w\\:ilvl").attr("w:val");
			} else {
				var outlineLvl = pPr.find("w\\:outlineLvl").attr("w:val");
				if (!outlineLvl && styleId) outlineLvl = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:outlineLvl").attr("w:val");

				if (outlineLvl) {
					identity.type = "heading";
					identity.level = parseInt(outlineLvl) + 1;
				}
			}
		}

		return identity;
	},
	r: function r(wXml) {
		return { type: "r", pr: wXml.children.find(function (_ref3) {
				var name = _ref3.name;
				return name == "w:rPr";
			}), children: wXml.children.filter(function (_ref4) {
				var name = _ref4.name;
				return name != "w:rPr";
			}) };
	},
	fldChar: function fldChar(wXml) {
		return wXml.attribs["w:fldCharType"];
	},
	inline: function inline(wXml, officeDocument) {
		var $ = officeDocument.content(wXml);
		var type = $.find('a\\:graphic>a\\:graphicData').attr('uri').split('/').pop();
		var props = { type: "inline." + type, children: null };
		switch (type) {
			case "picture":
				var rid = $.find('a\\:blip').attr('r:embed');
				(0, _assign2.default)(props, officeDocument.getRel(rid));
				break;
		}
		return props;
	},
	sdt: function sdt(wXml, officeDocument) {
		var $ = officeDocument.content(wXml);
		var pr = $.find('>w\\:sdtPr');
		var content = $.find('>w\\:sdtContent');
		var children = content.children().toArray();

		var elBinding = pr.find('w\\:dataBinding').get(0);
		if (elBinding) {
			//properties
			var path = elBinding.attribs['w:xpath'],
			    d = path.split(/[\/\:\[]/),
			    name = (d.pop(), d.pop());
			var value = content.text();

			return { type: "property", name: name, value: value, children: children };
		} else {
			var _ret = function () {
				//controls
				var prChildren = pr.get(0).children;
				var elType = prChildren[prChildren.length - 1];
				var name = elType.name.split(":").pop();
				var type = "text, picture, docPartList, comboBox, dropDownList, date, checkbox".split(",").find(function (a) {
					return a == name;
				});
				if (type) return {
						v: { type: "control." + type, children: null }
					};else {
					//container
					if (content.find("w\\:p,w\\:tbl").length) {
						return {
							v: { type: "block", children: children }
						};
					} else {
						return {
							v: { type: "inline", children: children }
						};
					}
				}
			}();

			if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
		}
	},
	hyperlink: function hyperlink(wXml, officeDocument) {
		var url = officeDocument.getRel(wXml.attribs["r:id"]);
		return { type: "hyperlink", url: url };
	}
};

var createElement = exports.createElement = function createElement(type, props, children) {
	return _react2.default.createElement.apply(_react2.default, [getComponent(type), props].concat((0, _toConsumableArray3.default)(children)));
};

var getComponent = function getComponent(name) {
	var existing = getComponent[name];
	if (existing) return existing;
	var Type = function Type(props) {
		return null;
	};
	Type.displayName = name;
	return getComponent[name] = Type;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJkb2N1bWVudCIsInR5cGUiLCJjaGlsZHJlbiIsInAiLCIkIiwiY29udGVudCIsImlkZW50aXR5IiwicHIiLCJmaW5kIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsImF0dHIiLCJudW1QciIsInN0eWxlcyIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImF0dHJpYnMiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImdldFJlbCIsInNkdCIsInRvQXJyYXkiLCJlbEJpbmRpbmciLCJnZXQiLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJhIiwiaHlwZXJsaW5rIiwidXJsIiwiY3JlYXRlRWxlbWVudCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRWdCQSxRLEdBQUFBLFE7O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QkMsY0FBeEIsRUFBdUM7QUFDN0MsS0FBTUMsTUFBSUYsS0FBS0csSUFBTCxDQUFVQyxLQUFWLENBQWdCLEdBQWhCLEVBQXFCQyxHQUFyQixFQUFWO0FBQ0EsS0FBR0MsV0FBV0osR0FBWCxDQUFILEVBQ0MsT0FBT0ksV0FBV0osR0FBWCxvQkFBbUJLLFNBQW5CLEtBQStCTCxHQUF0Qzs7QUFFRCxRQUFPQSxHQUFQO0FBQ0E7O0FBRUQsSUFBTUksYUFBVztBQUNoQkUsU0FEZ0Isb0JBQ1BSLElBRE8sRUFDRjtBQUNiLFNBQU8sRUFBQ1MsTUFBSyxVQUFO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TXVDLGVBQWEsU0FBYkEsWUFBYSxPQUFNO0FBQ3hCLEtBQUlDLFdBQVNELGFBQWE5QyxJQUFiLENBQWI7QUFDQSxLQUFHK0MsUUFBSCxFQUNDLE9BQU9BLFFBQVA7QUFDRCxLQUFJQyxPQUFLLFNBQUxBLElBQUs7QUFBQSxTQUFPLElBQVA7QUFBQSxFQUFUO0FBQ0FBLE1BQUtDLFdBQUwsR0FBaUJqRCxJQUFqQjtBQUNBLFFBQU84QyxhQUFhOUMsSUFBYixJQUFtQmdELElBQTFCO0FBQ0EsQ0FQRCIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG5cdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG5cdGlmKGlkZW50aXRpZXNbdGFnXSlcblx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cyl8fHRhZ1xuXG5cdHJldHVybiB0YWdcbn1cblxuY29uc3QgaWRlbnRpdGllcz17XG5cdGRvY3VtZW50KHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxuXHR9LFxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcblx0XHRsZXQgdHlwZT1cInBcIlxuXHRcdFxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XG5cblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxuXHRcdGlmKHBQci5sZW5ndGgpe1xuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHRcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByXCIpXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByYClcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxuXHRcdFx0XHRpZGVudGlmeS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHRcdGlkZW50aWZ5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0XHRcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcblx0XHRcdFx0fVx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBpZGVudGl0eVxuXHR9LFxuXHRyKHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxuXHR9LFxuXHRmbGRDaGFyKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXG5cdH0sXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXG5cdFx0bGV0IHR5cGU9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIFwicGljdHVyZVwiOlxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCkpXG5cdFx0YnJlYWtcblx0XHR9XG5cdFx0cmV0dXJuIHByb3BzXG5cdH0sXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXG5cdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50Jylcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxuXHRcdFxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXG5cdFx0XHRcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cblx0XHR9ZWxzZSB7Ly9jb250cm9sc1xuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIi5zcGxpdChcIixcIilcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcblx0XHRcdGlmKHR5cGUpXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cblx0XHRcdGVsc2V7Ly9jb250YWluZXJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0YmxcIikubGVuZ3RoKXtcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaW5saW5lXCIsIGNoaWxkcmVufVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxuXHR9XG59XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57XG5cdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGdldENvbXBvbmVudCh0eXBlKSxwcm9wcywuLi5jaGlsZHJlbilcbn1cblxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9Pntcblx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxuXHRpZihleGlzdGluZylcblx0XHRyZXR1cm4gZXhpc3Rpbmdcblx0bGV0IFR5cGU9cHJvcHM9Pm51bGxcblx0VHlwZS5kaXNwbGF5TmFtZT1uYW1lXG5cdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxufVxuIl19