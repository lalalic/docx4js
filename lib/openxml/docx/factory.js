"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.identify = identify;
exports.createReactElementFactory = createReactElementFactory;
exports.createElement = createElement;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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

			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
		}
	},
	hyperlink: function hyperlink(wXml, officeDocument) {
		var url = officeDocument.getRel(wXml.attribs["r:id"]);
		return { type: "hyperlink", url: url };
	}
};

function createReactElementFactory(React) {
	var getComponent = function getComponent(name) {
		var existing = getComponent[name];
		if (existing) return existing;

		var Type = function Type(props) {
			return null;
		};
		Type.displayName = name;
		return getComponent[name] = Type;
	};

	return function (type, props, children) {
		return React.createElement.apply(React, [getComponent(type), props].concat(_toConsumableArray(children)));
	};
}

function createElement(type, props, children) {
	return { type: type, props: props, children: children };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsImNyZWF0ZVJlYWN0RWxlbWVudEZhY3RvcnkiLCJjcmVhdGVFbGVtZW50Iiwid1htbCIsIm9mZmljZURvY3VtZW50IiwidGFnIiwibmFtZSIsInNwbGl0IiwicG9wIiwiaWRlbnRpdGllcyIsImFyZ3VtZW50cyIsImRvY3VtZW50IiwidHlwZSIsImNoaWxkcmVuIiwicCIsIiQiLCJjb250ZW50IiwiaWRlbnRpdHkiLCJwciIsImZpbmQiLCJmaWx0ZXIiLCJwUHIiLCJsZW5ndGgiLCJzdHlsZUlkIiwiYXR0ciIsIm51bVByIiwic3R5bGVzIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJwYXJzZUludCIsInIiLCJmbGRDaGFyIiwiYXR0cmlicyIsImlubGluZSIsInByb3BzIiwicmlkIiwidXJsIiwiZ2V0UmVsIiwic2R0IiwidG9BcnJheSIsImVsQmluZGluZyIsImdldCIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImEiLCJoYXMiLCJoeXBlcmxpbmsiLCJSZWFjdCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUFnQkEsUSxHQUFBQSxRO1FBb0dBQyx5QixHQUFBQSx5QjtRQWNBQyxhLEdBQUFBLGE7Ozs7QUFsSFQsU0FBU0YsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0JDLGNBQXhCLEVBQXVDO0FBQzdDLEtBQU1DLE1BQUlGLEtBQUtHLElBQUwsQ0FBVUMsS0FBVixDQUFnQixHQUFoQixFQUFxQkMsR0FBckIsRUFBVjtBQUNBLEtBQUdDLFdBQVdKLEdBQVgsQ0FBSCxFQUNDLE9BQU9JLFdBQVdKLEdBQVgsb0JBQW1CSyxTQUFuQixLQUErQkwsR0FBdEM7O0FBRUQsUUFBT0EsR0FBUDtBQUNBOztBQUVELElBQU1JLGFB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RUFDQyxPQUFPQSxRQUFQOztBQUVELE1BQUlDLE9BQUssU0FBTEEsSUFBSztBQUFBLFVBQU8sSUFBUDtBQUFBLEdBQVQ7QUFDQUEsT0FBS0MsV0FBTCxHQUFpQmxELElBQWpCO0FBQ0EsU0FBTytDLGFBQWEvQyxJQUFiLElBQW1CaUQsSUFBMUI7QUFDQSxFQVJEOztBQVVBLFFBQVEsVUFBQzNDLElBQUQsRUFBTXVCLEtBQU4sRUFBWXRCLFFBQVo7QUFBQSxTQUF1QnVDLE1BQU1sRCxhQUFOLGVBQW9CbUQsYUFBYXpDLElBQWIsQ0FBcEIsRUFBdUN1QixLQUF2Qyw0QkFBZ0R0QixRQUFoRCxHQUF2QjtBQUFBLEVBQVI7QUFDQTs7QUFFTSxTQUFTWCxhQUFULENBQXVCVSxJQUF2QixFQUE0QnVCLEtBQTVCLEVBQWtDdEIsUUFBbEMsRUFBMkM7QUFDakQsUUFBTyxFQUFDRCxVQUFELEVBQU11QixZQUFOLEVBQVl0QixrQkFBWixFQUFQO0FBQ0EiLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG5cdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG5cdGlmKGlkZW50aXRpZXNbdGFnXSlcblx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cyl8fHRhZ1xuXG5cdHJldHVybiB0YWdcbn1cblxuY29uc3QgaWRlbnRpdGllcz17XG5cdGRvY3VtZW50KHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxuXHR9LFxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcblx0XHRsZXQgdHlwZT1cInBcIlxuXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cblxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXG5cdFx0aWYocFByLmxlbmd0aCl7XG5cdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcblxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHJcIilcblx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHJgKVxuXHRcdFx0fVxuXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXG5cdFx0XHRcdGlkZW50aWZ5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcblx0XHRcdFx0aWRlbnRpZnkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IG91dGxpbmVMdmw9cFByLmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXG5cblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBpZGVudGl0eVxuXHR9LFxuXHRyKHdYbWwpe1xuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxuXHR9LFxuXHRmbGRDaGFyKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXG5cdH0sXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXG5cdFx0bGV0IHR5cGU9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIFwicGljdHVyZVwiOlxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcblx0XHRcdHByb3BzLnVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKVxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdHJldHVybiBwcm9wc1xuXHR9LFxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcblxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXG5cblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cblx0XHR9ZWxzZSB7Ly9jb250cm9sc1xuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIi5zcGxpdChcIixcIilcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcblx0XHRcdGlmKHR5cGUpXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cblx0XHRcdGVsc2V7Ly9jb250YWluZXJcblx0XHRcdFx0aWYoY29udGVudC5oYXMoXCJ3XFxcXDpwLHdcXFxcOnRibFwiKSl7XG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cblx0fVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhY3RFbGVtZW50RmFjdG9yeShSZWFjdCl7XG5cdGNvbnN0IGdldENvbXBvbmVudD1uYW1lPT57XG5cdFx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxuXHRcdGlmKGV4aXN0aW5nKVxuXHRcdFx0cmV0dXJuIGV4aXN0aW5nXG5cblx0XHRsZXQgVHlwZT1wcm9wcz0+bnVsbFxuXHRcdFR5cGUuZGlzcGxheU5hbWU9bmFtZVxuXHRcdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxuXHR9XG5cblx0cmV0dXJuICAodHlwZSxwcm9wcyxjaGlsZHJlbik9PlJlYWN0LmNyZWF0ZUVsZW1lbnQoZ2V0Q29tcG9uZW50KHR5cGUpLHByb3BzLC4uLmNoaWxkcmVuKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLHByb3BzLGNoaWxkcmVuKXtcblx0cmV0dXJuIHt0eXBlLHByb3BzLGNoaWxkcmVufVxufVxuIl19