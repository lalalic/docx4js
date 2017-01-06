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
				Object.assign(props, officeDocument.getRel(rid));
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

			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJpZGVudGlmeSIsImNyZWF0ZVJlYWN0RWxlbWVudEZhY3RvcnkiLCJjcmVhdGVFbGVtZW50Iiwid1htbCIsIm9mZmljZURvY3VtZW50IiwidGFnIiwibmFtZSIsInNwbGl0IiwicG9wIiwiaWRlbnRpdGllcyIsImFyZ3VtZW50cyIsImRvY3VtZW50IiwidHlwZSIsImNoaWxkcmVuIiwicCIsIiQiLCJjb250ZW50IiwiaWRlbnRpdHkiLCJwciIsImZpbmQiLCJmaWx0ZXIiLCJwUHIiLCJsZW5ndGgiLCJzdHlsZUlkIiwiYXR0ciIsIm51bVByIiwic3R5bGVzIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJwYXJzZUludCIsInIiLCJmbGRDaGFyIiwiYXR0cmlicyIsImlubGluZSIsInByb3BzIiwicmlkIiwiT2JqZWN0IiwiYXNzaWduIiwiZ2V0UmVsIiwic2R0IiwidG9BcnJheSIsImVsQmluZGluZyIsImdldCIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImEiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJyZWR1Y2UiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwicHVzaCIsInRyIiwiaXNIZWFkZXIiLCJSZWFjdCIsImdldENvbXBvbmVudCIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztRQUFnQkEsUSxHQUFBQSxRO1FBZ0lBQyx5QixHQUFBQSx5QjtRQWNBQyxhLEdBQUFBLGE7Ozs7QUE5SVQsU0FBU0YsUUFBVCxDQUFrQkcsSUFBbEIsRUFBd0JDLGNBQXhCLEVBQXVDO0FBQzdDLEtBQU1DLE1BQUlGLEtBQUtHLElBQUwsQ0FBVUMsS0FBVixDQUFnQixHQUFoQixFQUFxQkMsR0FBckIsRUFBVjtBQUNBLEtBQUdDLFdBQVdKLEdBQVgsQ0FBSCxFQUNDLE9BQU9JLFdBQVdKLEdBQVgsb0JBQW1CSyxTQUFuQixLQUErQkwsR0FBdEM7O0FBRUQsUUFBT0EsR0FBUDtBQUNBOztBQUVELElBQU1JLGFBQVc7QUFDaEJFLFNBRGdCLG9CQUNQUixJQURPLEVBQ0Y7QUFDYixTQUFPLEVBQUNTLE1BQUssVUFBTixFQUFrQkMsVUFBVVYsS0FBS1UsUUFBTCxDQUFjLENBQWQsRUFBaUJBLFFBQTdDLEVBQVA7QUFDQSxFQUhlO0FBSWhCQyxFQUpnQixhQUlkWCxJQUpjLEVBSVRDLGNBSlMsRUFJTTtBQUNyQixNQUFJVyxJQUFFWCxlQUFlWSxPQUFmLENBQXVCYixJQUF2QixDQUFOO0FBQ0EsTUFBSVMsT0FBSyxHQUFUOztBQUVBLE1BQUlLLFdBQVMsRUFBQ0wsVUFBRCxFQUFNTSxJQUFHZixLQUFLVSxRQUFMLENBQWNNLElBQWQsQ0FBbUI7QUFBQSxRQUFFYixJQUFGLFFBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBVCxFQUFxRE8sVUFBU1YsS0FBS1UsUUFBTCxDQUFjTyxNQUFkLENBQXFCO0FBQUEsUUFBRWQsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQXJCLENBQTlELEVBQWI7O0FBRUEsTUFBSWUsTUFBSU4sRUFBRUksSUFBRixDQUFPLFNBQVAsQ0FBUjtBQUNBLE1BQUdFLElBQUlDLE1BQVAsRUFBYztBQUNiLE9BQUlDLFVBQVFGLElBQUlGLElBQUosQ0FBUyxZQUFULEVBQXVCSyxJQUF2QixDQUE0QixPQUE1QixDQUFaOztBQUVBLE9BQUlDLFFBQU1KLElBQUlGLElBQUosQ0FBUyxXQUFULENBQVY7QUFDQSxPQUFHLENBQUNNLE1BQU1ILE1BQVAsSUFBaUJDLE9BQXBCLEVBQTRCO0FBQzNCRSxZQUFNckIsZUFBZXNCLE1BQWYsOEJBQWdESCxPQUFoRCxtQkFBTjtBQUNBOztBQUVELE9BQUdFLE1BQU1ILE1BQVQsRUFBZ0I7QUFDZkwsYUFBU0wsSUFBVCxHQUFjLE1BQWQ7QUFDQVosYUFBUzJCLEtBQVQsR0FBZUYsTUFBTU4sSUFBTixDQUFXLFdBQVgsRUFBd0JLLElBQXhCLENBQTZCLE9BQTdCLENBQWY7QUFDQXhCLGFBQVM0QixLQUFULEdBQWVILE1BQU1OLElBQU4sQ0FBVyxVQUFYLEVBQXVCSyxJQUF2QixDQUE0QixPQUE1QixDQUFmO0FBQ0EsSUFKRCxNQUlLO0FBQ0osUUFBSUssYUFBV1IsSUFBSUYsSUFBSixDQUFTLGdCQUFULEVBQTJCSyxJQUEzQixDQUFnQyxPQUFoQyxDQUFmO0FBQ0EsUUFBRyxDQUFDSyxVQUFELElBQWVOLE9BQWxCLEVBQ0NNLGFBQVd6QixlQUFlc0IsTUFBZiw4QkFBZ0RILE9BQWhELHlCQUE0RUMsSUFBNUUsQ0FBaUYsT0FBakYsQ0FBWDs7QUFFRCxRQUFHSyxVQUFILEVBQWM7QUFDYlosY0FBU0wsSUFBVCxHQUFjLFNBQWQ7QUFDQUssY0FBU1csS0FBVCxHQUFlRSxTQUFTRCxVQUFULElBQXFCLENBQXBDO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU9aLFFBQVA7QUFDQSxFQXBDZTtBQXFDaEJjLEVBckNnQixhQXFDZDVCLElBckNjLEVBcUNUO0FBQ04sU0FBTyxFQUFDUyxNQUFLLEdBQU4sRUFBV00sSUFBSWYsS0FBS1UsUUFBTCxDQUFjTSxJQUFkLENBQW1CO0FBQUEsUUFBRWIsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQW5CLENBQWYsRUFBNERPLFVBQVVWLEtBQUtVLFFBQUwsQ0FBY08sTUFBZCxDQUFxQjtBQUFBLFFBQUVkLElBQUYsU0FBRUEsSUFBRjtBQUFBLFdBQVVBLFFBQU0sT0FBaEI7QUFBQSxJQUFyQixDQUF0RSxFQUFQO0FBQ0EsRUF2Q2U7QUF3Q2hCMEIsUUF4Q2dCLG1CQXdDUjdCLElBeENRLEVBd0NIO0FBQ1osU0FBT0EsS0FBSzhCLE9BQUwsQ0FBYSxlQUFiLENBQVA7QUFDQSxFQTFDZTtBQTJDaEJDLE9BM0NnQixrQkEyQ1QvQixJQTNDUyxFQTJDSkMsY0EzQ0ksRUEyQ1c7QUFDMUIsTUFBSVcsSUFBRVgsZUFBZVksT0FBZixDQUF1QmIsSUFBdkIsQ0FBTjtBQUNBLE1BQUlTLE9BQUtHLEVBQUVJLElBQUYsQ0FBTyw2QkFBUCxFQUFzQ0ssSUFBdEMsQ0FBMkMsS0FBM0MsRUFBa0RqQixLQUFsRCxDQUF3RCxHQUF4RCxFQUE2REMsR0FBN0QsRUFBVDtBQUNBLE1BQUkyQixRQUFNLEVBQUN2QixrQkFBZUEsSUFBaEIsRUFBd0JDLFVBQVMsSUFBakMsRUFBVjtBQUNBLFVBQU9ELElBQVA7QUFDQSxRQUFLLFNBQUw7QUFDQyxRQUFJd0IsTUFBSXJCLEVBQUVJLElBQUYsQ0FBTyxVQUFQLEVBQW1CSyxJQUFuQixDQUF3QixTQUF4QixDQUFSO0FBQ0FhLFdBQU9DLE1BQVAsQ0FBY0gsS0FBZCxFQUFvQi9CLGVBQWVtQyxNQUFmLENBQXNCSCxHQUF0QixDQUFwQjtBQUNEO0FBSkE7QUFNQSxTQUFPRCxLQUFQO0FBQ0EsRUF0RGU7QUF1RGhCSyxJQXZEZ0IsZUF1RFpyQyxJQXZEWSxFQXVEUEMsY0F2RE8sRUF1RFE7QUFDdkIsTUFBSVcsSUFBRVgsZUFBZVksT0FBZixDQUF1QmIsSUFBdkIsQ0FBTjtBQUNBLE1BQUllLEtBQUdILEVBQUVJLElBQUYsQ0FBTyxZQUFQLENBQVA7QUFDQSxNQUFJSCxVQUFRRCxFQUFFSSxJQUFGLENBQU8saUJBQVAsQ0FBWjtBQUNBLE1BQUlOLFdBQVNHLFFBQVFILFFBQVIsR0FBbUI0QixPQUFuQixFQUFiOztBQUVBLE1BQUlDLFlBQVV4QixHQUFHQyxJQUFILENBQVEsaUJBQVIsRUFBMkJ3QixHQUEzQixDQUErQixDQUEvQixDQUFkO0FBQ0EsTUFBR0QsU0FBSCxFQUFhO0FBQUM7QUFDYixPQUFJRSxPQUFLRixVQUFVVCxPQUFWLENBQWtCLFNBQWxCLENBQVQ7QUFBQSxPQUNDWSxJQUFFRCxLQUFLckMsS0FBTCxDQUFXLFVBQVgsQ0FESDtBQUFBLE9BRUNELFFBQU11QyxFQUFFckMsR0FBRixJQUFRcUMsRUFBRXJDLEdBQUYsRUFBZCxDQUZEO0FBR0EsT0FBSXNDLFFBQU05QixRQUFRK0IsSUFBUixFQUFWOztBQUVBLFVBQU8sRUFBQ25DLE1BQUssVUFBTixFQUFrQk4sVUFBbEIsRUFBd0J3QyxZQUF4QixFQUErQmpDLGtCQUEvQixFQUFQO0FBQ0EsR0FQRCxNQU9NO0FBQUE7QUFBQztBQUNOLFFBQUltQyxhQUFXOUIsR0FBR3lCLEdBQUgsQ0FBTyxDQUFQLEVBQVU5QixRQUF6QjtBQUNBLFFBQUlvQyxTQUFPRCxXQUFXQSxXQUFXMUIsTUFBWCxHQUFrQixDQUE3QixDQUFYO0FBQ0EsUUFBSWhCLE9BQUsyQyxPQUFPM0MsSUFBUCxDQUFZQyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCQyxHQUF2QixFQUFUO0FBQ0EsUUFBSUksT0FBSyxxRUFBcUVMLEtBQXJFLENBQTJFLEdBQTNFLEVBQ1BZLElBRE8sQ0FDRjtBQUFBLFlBQUcrQixLQUFHNUMsSUFBTjtBQUFBLEtBREUsQ0FBVDtBQUVBLFFBQUdNLElBQUgsRUFDQztBQUFBLFNBQU8sRUFBQ0EsbUJBQWdCQSxJQUFqQixFQUF5QkMsVUFBUyxJQUFsQztBQUFQLE9BREQsS0FFSTtBQUFDO0FBQ0osU0FBR0csUUFBUUcsSUFBUixDQUFhLGVBQWIsRUFBOEJHLE1BQWpDLEVBQXdDO0FBQ3ZDO0FBQUEsVUFBTyxFQUFDVixNQUFLLE9BQU4sRUFBZUMsa0JBQWY7QUFBUDtBQUNBLE1BRkQsTUFFSztBQUNKO0FBQUEsVUFBTyxFQUFDRCxNQUFLLFFBQU4sRUFBZ0JDLGtCQUFoQjtBQUFQO0FBQ0E7QUFDRDtBQWRJOztBQUFBO0FBZUw7QUFDRCxFQXJGZTtBQXNGaEJzQyxVQXRGZ0IscUJBc0ZOaEQsSUF0Rk0sRUFzRkRDLGNBdEZDLEVBc0ZjO0FBQzdCLE1BQUlnRCxNQUFJaEQsZUFBZW1DLE1BQWYsQ0FBc0JwQyxLQUFLOEIsT0FBTCxDQUFhLE1BQWIsQ0FBdEIsQ0FBUjtBQUNBLFNBQU8sRUFBQ3JCLE1BQUssV0FBTixFQUFtQndDLFFBQW5CLEVBQVA7QUFDQSxFQXpGZTtBQTBGaEJDLElBMUZnQixlQTBGWmxELElBMUZZLEVBMEZQO0FBQ1IsU0FBT0EsS0FBS1UsUUFBTCxDQUFjeUMsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLbEQsSUFBWjtBQUNBLFNBQUssU0FBTDtBQUNDaUQsV0FBTXJDLEVBQU4sR0FBU3NDLElBQVQ7QUFDRDtBQUNBLFNBQUssV0FBTDtBQUNDRCxXQUFNRSxJQUFOLEdBQVdELEtBQUszQyxRQUFoQjtBQUNEO0FBQ0E7QUFDQzBDLFdBQU0xQyxRQUFOLENBQWU2QyxJQUFmLENBQW9CRixJQUFwQjtBQVJEO0FBVUEsVUFBT0QsS0FBUDtBQUNBLEdBWk0sRUFZTCxFQUFDM0MsTUFBSyxLQUFOLEVBQVlDLFVBQVMsRUFBckIsRUFBd0JLLElBQUcsSUFBM0IsRUFBZ0N1QyxNQUFLLEVBQXJDLEVBWkssQ0FBUDtBQWFBLEVBeEdlO0FBeUdoQkUsR0F6R2dCLGNBeUdieEQsSUF6R2EsRUF5R1I7QUFDUCxTQUFPQSxLQUFLVSxRQUFMLENBQWN5QyxNQUFkLENBQXFCLFVBQUNDLEtBQUQsRUFBT0MsSUFBUCxFQUFjO0FBQ3pDLFdBQU9BLEtBQUtsRCxJQUFaO0FBQ0EsU0FBSyxRQUFMO0FBQ0NpRCxXQUFNckMsRUFBTixHQUFTc0MsSUFBVDtBQUNBRCxXQUFNSyxRQUFOLEdBQWUsQ0FBQyxDQUFDSixLQUFLM0MsUUFBTCxDQUFjTSxJQUFkLENBQW1CO0FBQUEsYUFBRytCLEVBQUU1QyxJQUFGLElBQVEsYUFBWDtBQUFBLE1BQW5CLENBQWpCO0FBQ0Q7QUFDQTtBQUNDaUQsV0FBTTFDLFFBQU4sQ0FBZTZDLElBQWYsQ0FBb0JGLElBQXBCO0FBTkQ7QUFRQSxVQUFPRCxLQUFQO0FBQ0EsR0FWTSxFQVVMLEVBQUMzQyxNQUFLLElBQU4sRUFBV0MsVUFBUyxFQUFwQixFQUF1QkssSUFBRyxJQUExQixFQVZLLENBQVA7QUFXQTtBQXJIZSxDQUFqQjs7QUF3SE8sU0FBU2pCLHlCQUFULENBQW1DNEQsS0FBbkMsRUFBeUM7QUFDL0MsS0FBTUMsZUFBYSxTQUFiQSxZQUFhLE9BQU07QUFDeEIsTUFBSUMsV0FBU0QsYUFBYXhELElBQWIsQ0FBYjtBQUNBLE1BQUd5RCxRQUFILEVBQ0MsT0FBT0EsUUFBUDs7QUFFRCxNQUFJQyxPQUFLLFNBQUxBLElBQUs7QUFBQSxVQUFPLElBQVA7QUFBQSxHQUFUO0FBQ0FBLE9BQUtDLFdBQUwsR0FBaUIzRCxJQUFqQjtBQUNBLFNBQU93RCxhQUFheEQsSUFBYixJQUFtQjBELElBQTFCO0FBQ0EsRUFSRDs7QUFVQSxRQUFRLFVBQUNwRCxJQUFELEVBQU11QixLQUFOLEVBQVl0QixRQUFaO0FBQUEsU0FBdUJnRCxNQUFNM0QsYUFBTixlQUFvQjRELGFBQWFsRCxJQUFiLENBQXBCLEVBQXVDdUIsS0FBdkMsNEJBQWdEdEIsUUFBaEQsR0FBdkI7QUFBQSxFQUFSO0FBQ0E7O0FBRU0sU0FBU1gsYUFBVCxDQUF1QlUsSUFBdkIsRUFBNEJ1QixLQUE1QixFQUFrQ3RCLFFBQWxDLEVBQTJDO0FBQ2pELFFBQU8sRUFBQ0QsVUFBRCxFQUFNdUIsWUFBTixFQUFZdEIsa0JBQVosRUFBUDtBQUNBIiwiZmlsZSI6ImZhY3RvcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0aWYoaWRlbnRpdGllc1t0YWddKVxyXG5cdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0cmV0dXJuIHRhZ1xyXG59XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRkb2N1bWVudCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpZnkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aWZ5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5hdHRyKCd1cmknKS5zcGxpdCgnLycpLnBvcCgpXHJcblx0XHRsZXQgcHJvcHM9e3R5cGU6YGlubGluZS4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJwaWN0dXJlXCI6XHJcblx0XHRcdGxldCByaWQ9JC5maW5kKCdhXFxcXDpibGlwJykuYXR0cigncjplbWJlZCcpXHJcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCkpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByb3BzXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2Ugey8vY29udHJvbHNcclxuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LCBwaWN0dXJlLCBkb2NQYXJ0TGlzdCwgY29tYm9Cb3gsIGRyb3BEb3duTGlzdCwgZGF0ZSwgY2hlY2tib3hcIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRpZih0eXBlKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZWFjdEVsZW1lbnRGYWN0b3J5KFJlYWN0KXtcclxuXHRjb25zdCBnZXRDb21wb25lbnQ9bmFtZT0+e1xyXG5cdFx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxyXG5cdFx0aWYoZXhpc3RpbmcpXHJcblx0XHRcdHJldHVybiBleGlzdGluZ1xyXG5cclxuXHRcdGxldCBUeXBlPXByb3BzPT5udWxsXHJcblx0XHRUeXBlLmRpc3BsYXlOYW1lPW5hbWVcclxuXHRcdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxyXG5cdH1cclxuXHJcblx0cmV0dXJuICAodHlwZSxwcm9wcyxjaGlsZHJlbik9PlJlYWN0LmNyZWF0ZUVsZW1lbnQoZ2V0Q29tcG9uZW50KHR5cGUpLHByb3BzLC4uLmNoaWxkcmVuKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0eXBlLHByb3BzLGNoaWxkcmVuKXtcclxuXHRyZXR1cm4ge3R5cGUscHJvcHMsY2hpbGRyZW59XHJcbn1cclxuIl19