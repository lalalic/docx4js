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
	},
	tbl: function tbl(wXml) {
		return wXml.children.reduce(function (state, node) {
			switch (node.name) {
				case "w:tblPr":
					state.pr = node;
					break;
				case "w:tblGrid":
					state.cols = node.children;
					break;
				default:
					state.children.push(node);
			}
			return state;
		}, { type: "tbl", children: [], pr: null, cols: [] });
	},
	tr: function tr(wXml) {
		return wXml.children.reduce(function (state, node) {
			switch (node.name) {
				case "w:trPr":
					state.pr = node;
					state.isHeader = !!node.children.find(function (a) {
						return a.name == "w:tblHeader";
					});
					break;
				default:
					state.children.push(node);
			}
			return state;
		}, { type: "tr", children: [], pr: null });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRhZyIsIm5hbWUiLCJzcGxpdCIsInBvcCIsImlkZW50aXRpZXMiLCJhcmd1bWVudHMiLCJkb2N1bWVudCIsInR5cGUiLCJjaGlsZHJlbiIsInAiLCIkIiwiY29udGVudCIsImlkZW50aXR5IiwicHIiLCJmaW5kIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsImF0dHIiLCJudW1QciIsInN0eWxlcyIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImF0dHJpYnMiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImdldFJlbCIsInNkdCIsInRvQXJyYXkiLCJlbEJpbmRpbmciLCJnZXQiLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJhIiwiaHlwZXJsaW5rIiwidXJsIiwidGJsIiwicmVkdWNlIiwic3RhdGUiLCJub2RlIiwiY29scyIsInB1c2giLCJ0ciIsImlzSGVhZGVyIiwiY3JlYXRlRWxlbWVudCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBRWdCQSxRLEdBQUFBLFE7O0FBRmhCOzs7Ozs7QUFFTyxTQUFTQSxRQUFULENBQWtCQyxJQUFsQixFQUF3QkMsY0FBeEIsRUFBdUM7QUFDN0MsS0FBTUMsTUFBSUYsS0FBS0csSUFBTCxDQUFVQyxLQUFWLENBQWdCLEdBQWhCLEVBQXFCQyxHQUFyQixFQUFWO0FBQ0EsS0FBR0MsV0FBV0osR0FBWCxDQUFILEVBQ0MsT0FBT0ksV0FBV0osR0FBWCxvQkFBbUJLLFNBQW5CLEtBQStCTCxHQUF0Qzs7QUFFRCxRQUFPQSxHQUFQO0FBQ0E7O0FBRUQsSUFBTUks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QUFDQSxDQUZNOztBQUlQLElBQU0rQyxlQUFhLFNBQWJBLFlBQWEsT0FBTTtBQUN4QixLQUFJQyxXQUFTRCxhQUFhdEQsSUFBYixDQUFiO0FBQ0EsS0FBR3VELFFBQUgsRUFDQyxPQUFPQSxRQUFQO0FBQ0QsS0FBSUMsT0FBSyxTQUFMQSxJQUFLO0FBQUEsU0FBTyxJQUFQO0FBQUEsRUFBVDtBQUNBQSxNQUFLQyxXQUFMLEdBQWlCekQsSUFBakI7QUFDQSxRQUFPc0QsYUFBYXRELElBQWIsSUFBbUJ3RCxJQUExQjtBQUNBLENBUEQiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuXHRjb25zdCB0YWc9d1htbC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxuXHRpZihpZGVudGl0aWVzW3RhZ10pXG5cdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcblxuXHRyZXR1cm4gdGFnXG59XG5cbmNvbnN0IGlkZW50aXRpZXM9e1xuXHRkb2N1bWVudCh3WG1sKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlblswXS5jaGlsZHJlbn1cblx0fSxcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXG5cdFx0bGV0IHR5cGU9XCJwXCJcblx0XHRcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxuXG5cdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcblx0XHRpZihwUHIubGVuZ3RoKXtcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0XG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1QclwiKVxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcblx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1QcmApXG5cdFx0XHR9XG5cdFx0XHRcblx0XHRcdGlmKG51bVByLmxlbmd0aCl7XG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcblx0XHRcdFx0aWRlbnRpZnkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0XHRpZGVudGlmeS5sZXZlbD1udW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIilcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHRcdGlmKCFvdXRsaW5lTHZsICYmIHN0eWxlSWQpXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcblx0XHRcdFx0XG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXG5cdFx0XHRcdH1cdFxuXHRcdFx0fVxuXHRcdH1cblx0XHRcblx0XHRyZXR1cm4gaWRlbnRpdHlcblx0fSxcblx0cih3WG1sKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cblx0fSxcblx0ZmxkQ2hhcih3WG1sKXtcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxuXHR9LFxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxuXHRcdGxldCB0eXBlPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcblx0XHRsZXQgcHJvcHM9e3R5cGU6YGlubGluZS4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcblx0XHRcdGxldCByaWQ9JC5maW5kKCdhXFxcXDpibGlwJykuYXR0cigncjplbWJlZCcpXG5cdFx0XHRPYmplY3QuYXNzaWduKHByb3BzLG9mZmljZURvY3VtZW50LmdldFJlbChyaWQpKVxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdHJldHVybiBwcm9wc1xuXHR9LFxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcblx0XHRcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxuXHRcdFx0XG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XG5cdFx0fWVsc2Ugey8vY29udHJvbHNcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcblx0XHRcdGxldCB0eXBlPVwidGV4dCwgcGljdHVyZSwgZG9jUGFydExpc3QsIGNvbWJvQm94LCBkcm9wRG93bkxpc3QsIGRhdGUsIGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXG5cdFx0XHRpZih0eXBlKVxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XG5cdFx0XHRlbHNley8vY29udGFpbmVyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsXCIpLmxlbmd0aCl7XG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cblx0fSxcblx0dGJsKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9Pntcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxuXHRcdFx0YnJlYWtcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXG5cdFx0XHRicmVha1xuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXG5cdH0sXG5cdHRyKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9Pntcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxuXHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxuXHR9XG59XG5cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57XG5cdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGdldENvbXBvbmVudCh0eXBlKSxwcm9wcywuLi5jaGlsZHJlbilcbn1cblxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9Pntcblx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxuXHRpZihleGlzdGluZylcblx0XHRyZXR1cm4gZXhpc3Rpbmdcblx0bGV0IFR5cGU9cHJvcHM9Pm51bGxcblx0VHlwZS5kaXNwbGF5TmFtZT1uYW1lXG5cdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxufVxuIl19