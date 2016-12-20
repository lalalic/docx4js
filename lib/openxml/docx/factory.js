"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createElement = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

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
				props.url = officeDocument.getRel(rid);
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
					if (content.has("w\\:p,w\\:tbl")) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJkb2N1bWVudCIsInR5cGUiLCJjaGlsZHJlbiIsInAiLCIkIiwiY29udGVudCIsImlkZW50aXR5IiwicHIiLCJmaW5kIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsImF0dHIiLCJudW1QciIsInN0eWxlcyIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImF0dHJpYnMiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsInVybCIsImdldFJlbCIsInNkdCIsInRvQXJyYXkiLCJlbEJpbmRpbmciLCJnZXQiLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJhIiwiaGFzIiwiaHlwZXJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7UUFFZ0JBLFEsR0FBQUEsUTs7QUFGaEI7Ozs7OztBQUVPLFNBQVNBLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCQyxjQUF4QixFQUF1QztBQUM3QyxLQUFNQyxNQUFJRixLQUFLRyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQVY7QUFDQSxLQUFHQyxXQUFXSixHQUFYLENBQUgsRUFDQyxPQUFPSSxXQUFXSixHQUFYLG9CQUFtQkssU0FBbkIsS0FBK0JMLEdBQXRDOztBQUVELFFBQU9BLEdBQVA7QUFDQTs7QUFFRCxJQUFNSSxhQUFXO0FBQ2hCRSxTQURnQixvQkFDUFIsSUFETyxFQUNGO0FBQ2IsU0FBTyxFQUFDUyxNQUFLLFVB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QWEsU0FBYkEsWUFBYSxPQUFNO0FBQ3hCLEtBQUlDLFdBQVNELGFBQWEvQyxJQUFiLENBQWI7QUFDQSxLQUFHZ0QsUUFBSCxFQUNDLE9BQU9BLFFBQVA7QUFDRCxLQUFJQyxPQUFLLFNBQUxBLElBQUs7QUFBQSxTQUFPLElBQVA7QUFBQSxFQUFUO0FBQ0FBLE1BQUtDLFdBQUwsR0FBaUJsRCxJQUFqQjtBQUNBLFFBQU8rQyxhQUFhL0MsSUFBYixJQUFtQmlELElBQTFCO0FBQ0EsQ0FQRCIsImZpbGUiOiJmYWN0b3J5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXG5cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG5cdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG5cdGlmKGlkZW50aXRpZXNbdGFnXSlcblx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cyl8fHRhZ1xuXG5cdHJldHVybiB0YWdcbn1cblxuY29uc3QgaWRlbnRpdGllcz17XG5cdGRvY3VtZW50KHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxuXHR9LFxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcblx0XHRsZXQgdHlwZT1cInBcIlxuXHRcdFxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XG5cblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxuXHRcdGlmKHBQci5sZW5ndGgpe1xuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHRcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByXCIpXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByYClcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxuXHRcdFx0XHRpZGVudGlmeS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHRcdGlkZW50aWZ5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0XHRcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcblx0XHRcdFx0fVx0XG5cdFx0XHR9XG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiBpZGVudGl0eVxuXHR9LFxuXHRyKHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxuXHR9LFxuXHRmbGRDaGFyKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXG5cdH0sXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXG5cdFx0bGV0IHR5cGU9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIFwicGljdHVyZVwiOlxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcblx0XHRcdHByb3BzLnVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKVxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdHJldHVybiBwcm9wc1xuXHR9LFxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcblx0XHRcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XG5cdFx0fWVsc2Ugey8vY29udHJvbHNcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcblx0XHRcdGxldCB0eXBlPVwidGV4dCwgcGljdHVyZSwgZG9jUGFydExpc3QsIGNvbWJvQm94LCBkcm9wRG93bkxpc3QsIGRhdGUsIGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXG5cdFx0XHRpZih0eXBlKVxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XG5cdFx0XHRlbHNley8vY29udGFpbmVyXG5cdFx0XHRcdGlmKGNvbnRlbnQuaGFzKFwid1xcXFw6cCx3XFxcXDp0YmxcIikpe1xuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImJsb2NrXCIsIGNoaWxkcmVufVxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJpbmxpbmVcIiwgY2hpbGRyZW59XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XG5cdH1cbn1cblxuXG5leHBvcnQgY29uc3QgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pntcblx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoZ2V0Q29tcG9uZW50KHR5cGUpLHByb3BzLC4uLmNoaWxkcmVuKVxufVxuXG5jb25zdCBnZXRDb21wb25lbnQ9bmFtZT0+e1xuXHRsZXQgZXhpc3Rpbmc9Z2V0Q29tcG9uZW50W25hbWVdXG5cdGlmKGV4aXN0aW5nKVxuXHRcdHJldHVybiBleGlzdGluZ1xuXHRsZXQgVHlwZT1wcm9wcz0+bnVsbFxuXHRUeXBlLmRpc3BsYXlOYW1lPW5hbWVcblx0cmV0dXJuIGdldENvbXBvbmVudFtuYW1lXT1UeXBlXG59XG4iXX0=