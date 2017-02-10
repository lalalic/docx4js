"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OfficeDocument = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OfficeDocument = exports.OfficeDocument = function (_Part) {
	_inherits(OfficeDocument, _Part);

	function OfficeDocument() {
		_classCallCheck(this, OfficeDocument);

		return _possibleConstructorReturn(this, (OfficeDocument.__proto__ || Object.getPrototypeOf(OfficeDocument)).apply(this, arguments));
	}

	_createClass(OfficeDocument, [{
		key: "_init",
		value: function _init() {
			var _this2 = this;

			_get(OfficeDocument.prototype.__proto__ || Object.getPrototypeOf(OfficeDocument.prototype), "_init", this).call(this);
			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

			Object.freeze(this.content);
			return this.renderNode.apply(this, [this.content("w\\:document").get(0)].concat(Array.prototype.slice.call(arguments)));
		}
	}, {
		key: "parse",
		value: function parse(domHandler) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : officeDocument.identify;

			var doc = {};
			var createElement = domHandler.createElement.bind(domHandler);
			function _identify() {
				var model = identify.apply(undefined, arguments);
				domHandler.emit.apply(domHandler, ["*", model].concat(Array.prototype.slice.call(arguments)));
				domHandler.emit.apply(domHandler, [model.type, model].concat(Array.prototype.slice.call(arguments)));
				if (domHandler["on" + model.type]) domHandler["on" + model.type].apply(domHandler, [model].concat(Array.prototype.slice.call(arguments)));
				return model;
			}

			doc.document = this.renderNode(this.content("w\\:document").get(0), createElement, _identify);
			if (this.styles) doc.styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, _identify);
			if (this.numbering) doc.numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, _identify);
			return doc;
		}
	}], [{
		key: "identify",
		value: function identify(wXml, officeDocument) {
			var tag = wXml.name.split(":").pop();
			if (identities[tag]) return identities[tag].apply(identities, arguments) || tag;

			return tag;
		}
	}]);

	return OfficeDocument;
}(_part2.default);

exports.default = OfficeDocument;


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
	},
	rPrDefault: function rPrDefault(wXml) {
		return { type: "style", id: "*p" };
	},
	pPrDefault: function pPrDefault(wXml) {
		return { type: "style", id: "*r" };
	},
	style: function style(wXml) {
		return { type: "style" };
	},
	abstractNum: function abstractNum(wXml) {
		return { type: "numbering", id: wXml.attribs["w:abstractNumId"], children: wXml.children.filter(function (a) {
				return a.name == "w:lvl";
			}) };
	},
	latentStyles: function latentStyles() {
		return null;
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsIk9iamVjdCIsImZyZWV6ZSIsImNvbnRlbnQiLCJyZW5kZXJOb2RlIiwiZ2V0IiwiYXJndW1lbnRzIiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiZW1pdCIsImRvY3VtZW50Iiwic3R5bGVzIiwibnVtYmVyaW5nIiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY2hpbGRyZW4iLCJwIiwiaWRlbnRpdHkiLCJwciIsImZpbmQiLCJmaWx0ZXIiLCJwUHIiLCJsZW5ndGgiLCJzdHlsZUlkIiwibnVtUHIiLCJudW1JZCIsImxldmVsIiwib3V0bGluZUx2bCIsInBhcnNlSW50IiwiciIsImZsZENoYXIiLCJhdHRyaWJzIiwiaW5saW5lIiwicHJvcHMiLCJyaWQiLCJhc3NpZ24iLCJnZXRSZWwiLCJzZHQiLCJ0b0FycmF5IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiYSIsImh5cGVybGluayIsInVybCIsInRibCIsInJlZHVjZSIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJwdXNoIiwidHIiLCJpc0hlYWRlciIsInJQckRlZmF1bHQiLCJpZCIsInBQckRlZmF1bHQiLCJzdHlsZSIsImFic3RyYWN0TnVtIiwibGF0ZW50U3R5bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7Ozs7Ozs7Ozs7OzBCQUNMO0FBQUE7O0FBQ047QUFDQSxRQUFLQyxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxXQUFLSCxJQUFMLElBQVcsT0FBS0ksWUFBTCxDQUFrQkwsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsQ0FBWDtBQUNBLElBSkQ7QUFLQTs7O3lCQUVNSSxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QlosZUFBZVksUUFBUzs7QUFDdERDLFVBQU9DLE1BQVAsQ0FBYyxLQUFLQyxPQUFuQjtBQUNBLFVBQU8sS0FBS0MsVUFBTCxjQUFnQixLQUFLRCxPQUFMLENBQWEsY0FBYixFQUE2QkUsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsb0NBQXVEQyxTQUF2RCxHQUFQO0FBQ0E7Ozt3QkFFS0MsVSxFQUE0QztBQUFBLE9BQWpDUCxRQUFpQyx1RUFBeEJRLGVBQWVSLFFBQVM7O0FBQ2pELE9BQU1TLE1BQUksRUFBVjtBQUNBLE9BQU1WLGdCQUFjUSxXQUFXUixhQUFYLENBQXlCVyxJQUF6QixDQUE4QkgsVUFBOUIsQ0FBcEI7QUFDQSxZQUFTSSxTQUFULEdBQW9CO0FBQ25CLFFBQUlDLFFBQU1aLDBCQUFZTSxTQUFaLENBQVY7QUFDQUMsZUFBV00sSUFBWCxvQkFBZ0IsR0FBaEIsRUFBb0JELEtBQXBCLG9DQUE2Qk4sU0FBN0I7QUFDQUMsZUFBV00sSUFBWCxvQkFBZ0JELE1BQU1sQixJQUF0QixFQUE0QmtCLEtBQTVCLG9DQUFxQ04sU0FBckM7QUFDQSxRQUFHQyxrQkFBZ0JLLE1BQU1sQixJQUF0QixDQUFILEVBQ0NhLGtCQUFnQkssTUFBTWxCLElBQXRCLHFCQUE4QmtCLEtBQTlCLG9DQUF1Q04sU0FBdkM7QUFDRCxXQUFPTSxLQUFQO0FBQ0E7O0FBRURILE9BQUlLLFFBQUosR0FBYSxLQUFLVixVQUFMLENBQWdCLEtBQUtELE9BQUwsQ0FBYSxjQUFiLEVBQTZCRSxHQUE3QixDQUFpQyxDQUFqQyxDQUFoQixFQUFvRE4sYUFBcEQsRUFBa0VZLFNBQWxFLENBQWI7QUFDQSxPQUFHLEtBQUtJLE1BQVIsRUFDQ04sSUFBSU0sTUFBSixHQUFXLEtBQUtYLFVBQUwsQ0FBZ0IsS0FBS1csTUFBTCxDQUFZLFlBQVosRUFBMEJWLEdBQTFCLENBQThCLENBQTlCLENBQWhCLEVBQWlETixhQUFqRCxFQUErRFksU0FBL0QsQ0FBWDtBQUNELE9BQUcsS0FBS0ssU0FBUixFQUNDUCxJQUFJTyxTQUFKLEdBQWMsS0FBS1osVUFBTCxDQUFnQixLQUFLWSxTQUFMLENBQWUsZUFBZixFQUFnQ1gsR0FBaEMsQ0FBb0MsQ0FBcEMsQ0FBaEIsRUFBdUROLGFBQXZELEVBQXFFWSxTQUFyRSxDQUFkO0FBQ0QsVUFBT0YsR0FBUDtBQUNBOzs7MkJBRWVRLEksRUFBTVQsYyxFQUFlO0FBQ3BDLE9BQU1VLE1BQUlELEtBQUtFLElBQUwsQ0FBVXZCLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQVY7QUFDQSxPQUFHdUIsV0FBV0YsR0FBWCxDQUFILEVBQ0MsT0FBT0UsV0FBV0YsR0FBWCxvQkFBbUJaLFNBQW5CLEtBQStCWSxHQUF0Qzs7QUFFRCxVQUFPQSxHQUFQO0FBQ0E7Ozs7OztrQkFHYTlCLGM7OztBQUVmLElBQU1nQyxhQUFXO0FBQ2hCTixTQURnQixvQkFDUEcsSUFETyxFQUNGO0FBQ2IsU0FBTyxFQUFDdkIsTUFBSyxVQUFOLEVBQWtCMkIsVUFBVUosS0FBS0ksUUFBTCxDQUFjLENBQWQsRUFBaUJBLFFBQTdDLEVBQVA7QUFDQSxFQUhlO0FBSWhCQyxFQUpnQixhQUlkTCxJQUpjLEVBSVRULGNBSlMsRUFJTTtBQUNyQixNQUFJZixJQUFFZSxlQUFlTCxPQUFmLENBQXVCYyxJQUF2QixDQUFOO0FBQ0EsTUFBSXZCLE9BQUssR0FBVDs7QUFFQSxNQUFJNkIsV0FBUyxFQUFDN0IsVUFBRCxFQUFNOEIsSUFBR1AsS0FBS0ksUUFBTCxDQUFjSSxJQUFkLENBQW1CO0FBQUEsUUFBRU4sSUFBRixRQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQW5CLENBQVQsRUFBcURFLFVBQVNKLEtBQUtJLFFBQUwsQ0FBY0ssTUFBZCxDQUFxQjtBQUFBLFFBQUVQLElBQUYsU0FBRUEsSUFBRjtBQUFBLFdBQVVBLFFBQU0sT0FBaEI7QUFBQSxJQUFyQixDQUE5RCxFQUFiOztBQUVBLE1BQUlRLE1BQUlsQyxFQUFFZ0MsSUFBRixDQUFPLFNBQVAsQ0FBUjtBQUNBLE1BQUdFLElBQUlDLE1BQVAsRUFBYztBQUNiLE9BQUlDLFVBQVFGLElBQUlGLElBQUosQ0FBUyxZQUFULEVBQXVCOUIsSUFBdkIsQ0FBNEIsT0FBNUIsQ0FBWjs7QUFFQSxPQUFJbUMsUUFBTUgsSUFBSUYsSUFBSixDQUFTLFdBQVQsQ0FBVjtBQUNBLE9BQUcsQ0FBQ0ssTUFBTUYsTUFBUCxJQUFpQkMsT0FBcEIsRUFBNEI7QUFDM0JDLFlBQU10QixlQUFlTyxNQUFmLDhCQUFnRGMsT0FBaEQsbUJBQU47QUFDQTs7QUFFRCxPQUFHQyxNQUFNRixNQUFULEVBQWdCO0FBQ2ZMLGFBQVM3QixJQUFULEdBQWMsTUFBZDtBQUNBTSxhQUFTK0IsS0FBVCxHQUFlRCxNQUFNTCxJQUFOLENBQVcsV0FBWCxFQUF3QjlCLElBQXhCLENBQTZCLE9BQTdCLENBQWY7QUFDQUssYUFBU2dDLEtBQVQsR0FBZUYsTUFBTUwsSUFBTixDQUFXLFVBQVgsRUFBdUI5QixJQUF2QixDQUE0QixPQUE1QixDQUFmO0FBQ0EsSUFKRCxNQUlLO0FBQ0osUUFBSXNDLGFBQVdOLElBQUlGLElBQUosQ0FBUyxnQkFBVCxFQUEyQjlCLElBQTNCLENBQWdDLE9BQWhDLENBQWY7QUFDQSxRQUFHLENBQUNzQyxVQUFELElBQWVKLE9BQWxCLEVBQ0NJLGFBQVd6QixlQUFlTyxNQUFmLDhCQUFnRGMsT0FBaEQseUJBQTRFbEMsSUFBNUUsQ0FBaUYsT0FBakYsQ0FBWDs7QUFFRCxRQUFHc0MsVUFBSCxFQUFjO0FBQ2JWLGNBQVM3QixJQUFULEdBQWMsU0FBZDtBQUNBNkIsY0FBU1MsS0FBVCxHQUFlRSxTQUFTRCxVQUFULElBQXFCLENBQXBDO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU9WLFFBQVA7QUFDQSxFQXBDZTtBQXFDaEJZLEVBckNnQixhQXFDZGxCLElBckNjLEVBcUNUO0FBQ04sU0FBTyxFQUFDdkIsTUFBSyxHQUFOLEVBQVc4QixJQUFJUCxLQUFLSSxRQUFMLENBQWNJLElBQWQsQ0FBbUI7QUFBQSxRQUFFTixJQUFGLFNBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBZixFQUE0REUsVUFBVUosS0FBS0ksUUFBTCxDQUFjSyxNQUFkLENBQXFCO0FBQUEsUUFBRVAsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQXJCLENBQXRFLEVBQVA7QUFDQSxFQXZDZTtBQXdDaEJpQixRQXhDZ0IsbUJBd0NSbkIsSUF4Q1EsRUF3Q0g7QUFDWixTQUFPQSxLQUFLb0IsT0FBTCxDQUFhLGVBQWIsQ0FBUDtBQUNBLEVBMUNlO0FBMkNoQkMsT0EzQ2dCLGtCQTJDVHJCLElBM0NTLEVBMkNKVCxjQTNDSSxFQTJDVztBQUMxQixNQUFJZixJQUFFZSxlQUFlTCxPQUFmLENBQXVCYyxJQUF2QixDQUFOO0FBQ0EsTUFBSXZCLE9BQUtELEVBQUVnQyxJQUFGLENBQU8sNkJBQVAsRUFBc0M5QixJQUF0QyxDQUEyQyxLQUEzQyxFQUFrREMsS0FBbEQsQ0FBd0QsR0FBeEQsRUFBNkRDLEdBQTdELEVBQVQ7QUFDQSxNQUFJMEMsUUFBTSxFQUFDN0Msa0JBQWVBLElBQWhCLEVBQXdCMkIsVUFBUyxJQUFqQyxFQUFWO0FBQ0EsVUFBTzNCLElBQVA7QUFDQSxRQUFLLFNBQUw7QUFDQyxRQUFJOEMsTUFBSS9DLEVBQUVnQyxJQUFGLENBQU8sVUFBUCxFQUFtQjlCLElBQW5CLENBQXdCLFNBQXhCLENBQVI7QUFDQU0sV0FBT3dDLE1BQVAsQ0FBY0YsS0FBZCxFQUFvQi9CLGVBQWVrQyxNQUFmLENBQXNCRixHQUF0QixDQUFwQjtBQUNEO0FBSkE7QUFNQSxTQUFPRCxLQUFQO0FBQ0EsRUF0RGU7QUF1RGhCSSxJQXZEZ0IsZUF1RFoxQixJQXZEWSxFQXVEUFQsY0F2RE8sRUF1RFE7QUFDdkIsTUFBSWYsSUFBRWUsZUFBZUwsT0FBZixDQUF1QmMsSUFBdkIsQ0FBTjtBQUNBLE1BQUlPLEtBQUcvQixFQUFFZ0MsSUFBRixDQUFPLFlBQVAsQ0FBUDtBQUNBLE1BQUl0QixVQUFRVixFQUFFZ0MsSUFBRixDQUFPLGlCQUFQLENBQVo7QUFDQSxNQUFJSixXQUFTbEIsUUFBUWtCLFFBQVIsR0FBbUJ1QixPQUFuQixFQUFiOztBQUVBLE1BQUlDLFlBQVVyQixHQUFHQyxJQUFILENBQVEsaUJBQVIsRUFBMkJwQixHQUEzQixDQUErQixDQUEvQixDQUFkO0FBQ0EsTUFBR3dDLFNBQUgsRUFBYTtBQUFDO0FBQ2IsT0FBSUMsT0FBS0QsVUFBVVIsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQ1UsSUFBRUQsS0FBS2xELEtBQUwsQ0FBVyxVQUFYLENBREg7QUFBQSxPQUVDdUIsUUFBTTRCLEVBQUVsRCxHQUFGLElBQVFrRCxFQUFFbEQsR0FBRixFQUFkLENBRkQ7QUFHQSxPQUFJbUQsUUFBTTdDLFFBQVE4QyxJQUFSLEVBQVY7O0FBRUEsVUFBTyxFQUFDdkQsTUFBSyxVQUFOLEVBQWtCeUIsVUFBbEIsRUFBd0I2QixZQUF4QixFQUErQjNCLGtCQUEvQixFQUFQO0FBQ0EsR0FQRCxNQU9NO0FBQUE7QUFBQztBQUNOLFFBQUk2QixhQUFXMUIsR0FBR25CLEdBQUgsQ0FBTyxDQUFQLEVBQVVnQixRQUF6QjtBQUNBLFFBQUk4QixTQUFPRCxXQUFXQSxXQUFXdEIsTUFBWCxHQUFrQixDQUE3QixDQUFYO0FBQ0EsUUFBSVQsT0FBS2dDLE9BQU9oQyxJQUFQLENBQVl2QixLQUFaLENBQWtCLEdBQWxCLEVBQXVCQyxHQUF2QixFQUFUO0FBQ0EsUUFBSUgsT0FBSyxxRUFBcUVFLEtBQXJFLENBQTJFLEdBQTNFLEVBQ1A2QixJQURPLENBQ0Y7QUFBQSxZQUFHMkIsS0FBR2pDLElBQU47QUFBQSxLQURFLENBQVQ7QUFFQSxRQUFHekIsSUFBSCxFQUNDO0FBQUEsU0FBTyxFQUFDQSxtQkFBZ0JBLElBQWpCLEVBQXlCMkIsVUFBUyxJQUFsQztBQUFQLE9BREQsS0FFSTtBQUFDO0FBQ0osU0FBR2xCLFFBQVFzQixJQUFSLENBQWEsZUFBYixFQUE4QkcsTUFBakMsRUFBd0M7QUFDdkM7QUFBQSxVQUFPLEVBQUNsQyxNQUFLLE9BQU4sRUFBZTJCLGtCQUFmO0FBQVA7QUFDQSxNQUZELE1BRUs7QUFDSjtBQUFBLFVBQU8sRUFBQzNCLE1BQUssUUFBTixFQUFnQjJCLGtCQUFoQjtBQUFQO0FBQ0E7QUFDRDtBQWRJOztBQUFBO0FBZUw7QUFDRCxFQXJGZTtBQXNGaEJnQyxVQXRGZ0IscUJBc0ZOcEMsSUF0Rk0sRUFzRkRULGNBdEZDLEVBc0ZjO0FBQzdCLE1BQUk4QyxNQUFJOUMsZUFBZWtDLE1BQWYsQ0FBc0J6QixLQUFLb0IsT0FBTCxDQUFhLE1BQWIsQ0FBdEIsQ0FBUjtBQUNBLFNBQU8sRUFBQzNDLE1BQUssV0FBTixFQUFtQjRELFFBQW5CLEVBQVA7QUFDQSxFQXpGZTtBQTBGaEJDLElBMUZnQixlQTBGWnRDLElBMUZZLEVBMEZQO0FBQ1IsU0FBT0EsS0FBS0ksUUFBTCxDQUFjbUMsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLdkMsSUFBWjtBQUNBLFNBQUssU0FBTDtBQUNDc0MsV0FBTWpDLEVBQU4sR0FBU2tDLElBQVQ7QUFDRDtBQUNBLFNBQUssV0FBTDtBQUNDRCxXQUFNRSxJQUFOLEdBQVdELEtBQUtyQyxRQUFoQjtBQUNEO0FBQ0E7QUFDQ29DLFdBQU1wQyxRQUFOLENBQWV1QyxJQUFmLENBQW9CRixJQUFwQjtBQVJEO0FBVUEsVUFBT0QsS0FBUDtBQUNBLEdBWk0sRUFZTCxFQUFDL0QsTUFBSyxLQUFOLEVBQVkyQixVQUFTLEVBQXJCLEVBQXdCRyxJQUFHLElBQTNCLEVBQWdDbUMsTUFBSyxFQUFyQyxFQVpLLENBQVA7QUFhQSxFQXhHZTtBQXlHaEJFLEdBekdnQixjQXlHYjVDLElBekdhLEVBeUdSO0FBQ1AsU0FBT0EsS0FBS0ksUUFBTCxDQUFjbUMsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLdkMsSUFBWjtBQUNBLFNBQUssUUFBTDtBQUNDc0MsV0FBTWpDLEVBQU4sR0FBU2tDLElBQVQ7QUFDQUQsV0FBTUssUUFBTixHQUFlLENBQUMsQ0FBQ0osS0FBS3JDLFFBQUwsQ0FBY0ksSUFBZCxDQUFtQjtBQUFBLGFBQUcyQixFQUFFakMsSUFBRixJQUFRLGFBQVg7QUFBQSxNQUFuQixDQUFqQjtBQUNEO0FBQ0E7QUFDQ3NDLFdBQU1wQyxRQUFOLENBQWV1QyxJQUFmLENBQW9CRixJQUFwQjtBQU5EO0FBUUEsVUFBT0QsS0FBUDtBQUNBLEdBVk0sRUFVTCxFQUFDL0QsTUFBSyxJQUFOLEVBQVcyQixVQUFTLEVBQXBCLEVBQXVCRyxJQUFHLElBQTFCLEVBVkssQ0FBUDtBQVdBLEVBckhlO0FBc0hoQnVDLFdBdEhnQixzQkFzSEw5QyxJQXRISyxFQXNIQTtBQUNmLFNBQU8sRUFBQ3ZCLE1BQUssT0FBTixFQUFjc0UsSUFBRyxJQUFqQixFQUFQO0FBQ0EsRUF4SGU7QUF5SGhCQyxXQXpIZ0Isc0JBeUhMaEQsSUF6SEssRUF5SEE7QUFDZixTQUFPLEVBQUN2QixNQUFLLE9BQU4sRUFBY3NFLElBQUcsSUFBakIsRUFBUDtBQUNBLEVBM0hlO0FBNEhoQkUsTUE1SGdCLGlCQTRIVmpELElBNUhVLEVBNEhMO0FBQ1YsU0FBTyxFQUFDdkIsTUFBSyxPQUFOLEVBQVA7QUFDQSxFQTlIZTtBQStIaEJ5RSxZQS9IZ0IsdUJBK0hKbEQsSUEvSEksRUErSEM7QUFDaEIsU0FBTyxFQUFDdkIsTUFBSyxXQUFOLEVBQWtCc0UsSUFBRy9DLEtBQUtvQixPQUFMLENBQWEsaUJBQWIsQ0FBckIsRUFBcURoQixVQUFTSixLQUFLSSxRQUFMLENBQWNLLE1BQWQsQ0FBcUI7QUFBQSxXQUFHMEIsRUFBRWpDLElBQUYsSUFBUSxPQUFYO0FBQUEsSUFBckIsQ0FBOUQsRUFBUDtBQUNBLEVBakllO0FBa0loQmlELGFBbElnQiwwQkFrSUY7QUFDYixTQUFPLElBQVA7QUFDQTtBQXBJZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT1PZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRPYmplY3QuZnJlZXplKHRoaXMuY29udGVudClcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9b2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXHJcblxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW5bMF0uY2hpbGRyZW59XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1QclwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHJgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGlmeS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpZnkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxvZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKSlcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcHJvcHNcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZSB7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQsIHBpY3R1cmUsIGRvY1BhcnRMaXN0LCBjb21ib0JveCwgZHJvcERvd25MaXN0LCBkYXRlLCBjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0XHRlbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0YmxcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImJsb2NrXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaW5saW5lXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0fSxcclxuXHR0Ymwod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0YmxQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInc6dGJsR3JpZFwiOlxyXG5cdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdH0sXHJcblx0dHIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0clByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0clByRGVmYXVsdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsaWQ6XCIqcFwifVxyXG5cdH0sXHJcblx0cFByRGVmYXVsdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsaWQ6XCIqclwifVxyXG5cdH0sXHJcblx0c3R5bGUod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdH0sXHJcblx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1iZXJpbmdcIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl0sY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1cInc6bHZsXCIpfVxyXG5cdH0sXHJcblx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxufVxyXG4iXX0=