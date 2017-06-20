"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.OfficeDocument = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
			var supported = "styles,numbering,theme,settings".split(",");
			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				if (supported.indexOf(type) != -1) {
					(function () {
						var target = $.attr("Target");
						Object.defineProperty(_this2, type, {
							get: function get() {
								return this.getRelObject(target);
							}
						});
					})();
				}
			});
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

			if (this.styles) this.renderNode(this.styles("w\\:styles").get(0), createElement, identify);
			if (this.numbering) this.renderNode(this.numbering("w\\:numbering").get(0), createElement, identify);
			return this.renderNode(this.content("w\\:document").get(0), createElement, identify);
		}
	}, {
		key: "parse",
		value: function parse(domHandler) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

			var doc = {};
			var createElement = domHandler.createElement.bind(domHandler);
			function _identify() {
				var model = identify.apply(undefined, arguments);
				if (model && (typeof model === "undefined" ? "undefined" : _typeof(model)) == "object") {
					domHandler.emit.apply(domHandler, ["*", model].concat(Array.prototype.slice.call(arguments)));
					domHandler.emit.apply(domHandler, [model.type, model].concat(Array.prototype.slice.call(arguments)));
					if (domHandler["on" + model.type]) domHandler["on" + model.type].apply(domHandler, [model].concat(Array.prototype.slice.call(arguments)));
				}
				return model;
			}

			if (this.styles) doc.styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, _identify);
			if (this.numbering) doc.numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, _identify);
			doc.document = this.renderNode(this.content("w\\:document").get(0), createElement, _identify);
			return doc;
		}
	}, {
		key: "addImage",
		value: function addImage(data) {
			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
			var id = "rId" + (Math.max.apply(Math, _toConsumableArray(this.rels('Relationship').toArray().map(function (a) {
				return parseInt(a.attribs.Id.substring(3));
			}))) + 1);

			var targetName = "media/image" + (Math.max.apply(Math, _toConsumableArray(this.rels("Relationship[Type$='image']").toArray().map(function (t) {
				return parseInt(t.attribs.target.match(/\d+/)[0] || "0");
			}))) + 1) + ".jpg";

			var partName = this.folder + "/" + targetName;
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);

			this.rels("Relationships").append("<Relationship Type=\"" + type + "\" Id=\"" + id + "\" Target=\"" + partName + "\"/>");

			return id;
		}
	}, {
		key: "addExternalImage",
		value: function addExternalImage(url) {
			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

			var id = "rId" + (Math.max.apply(Math, _toConsumableArray(this.rels('Relationship').toArray().map(function (a) {
				return parseInt(a.attribs.Id.substring(3));
			}))) + 1);

			this.rels("Relationships").append("<Relationship Type=\"" + type + "\" Id=\"" + id + "\" TargetMode=\"External\" Target=\"" + url + "\"/>");

			return id;
		}
	}], [{
		key: "identify",
		value: function identify(wXml, officeDocument) {
			var tag = wXml.name.split(":").pop();
			if (identities[tag]) return identities[tag].apply(identities, arguments);

			return tag;
		}
	}]);

	return OfficeDocument;
}(_part2.default);

exports.default = OfficeDocument;


var identities = {
	document: function document(wXml, officeDocument) {
		var $ = officeDocument.content;
		var current = null;
		var children = $("w\\:sectPr").each(function (i, sect) {
			var end = $(sect).closest('w\\:body>*');
			sect.content = end.prevUntil(current).toArray().reverse();
			if (!end.is(sect)) sect.content.push(end.get(0));
			current = end;
		}).toArray();
		return { type: "document", children: children };
	},
	sectPr: function sectPr(wXml, officeDocument) {
		var hf = function hf(type) {
			return wXml.children.filter(function (a) {
				return a.name == "w:" + type + "Reference";
			}).reduce(function (headers, a) {
				headers.set(a.attribs["w:type"], officeDocument.getRel(a.attribs["r:id"]));
				return headers;
			}, new Map());
		};

		return {
			type: "section",
			children: wXml.content,
			headers: hf("header"),
			footers: hf("footer"),
			hasTitlePage: !!wXml.children.find(function (a) {
				return a.name == "w:titlePg";
			})
		};
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

			var numPr = pPr.find("w\\:numPr>w\\:numId");
			if (!numPr.length && styleId) {
				numPr = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr>w\\:numId");
			}

			if (numPr.length) {
				identity.type = "list";
				identity.numId = numPr.find("w\\:numId").attr("w:val");
				identity.level = numPr.find("w\\:ilvl").attr("w:val");
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
		return { type: "drawing.inline", children: $.find('a\\:graphic>a\\:graphicData').children().toArray() };
	},
	anchor: function anchor(wXml, officeDocument) {
		var $ = officeDocument.content(wXml);
		var graphicData = $.find('a\\:graphic>a\\:graphicData');
		var type = graphicData.attr("uri").split("/").pop();
		var children = graphicData.children().toArray();
		if (type == "wordprocessingGroup") children = children[0].children.filter(function (a) {
			return a.name.split(":")[0] != "wpg";
		});

		return { type: "drawing.anchor", children: children };
	},
	pic: function pic(wXml, officeDocument) {
		var rid = officeDocument.content(wXml).find("a\\:blip").attr('r:embed');
		return _extends({ type: "picture" }, officeDocument.getRel(rid));
	},
	wsp: function wsp(wXml, officeDocument) {
		return { type: "shape", children: officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray() };
	},
	Fallback: function Fallback() {
		return null;
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
			var _ret2 = function () {
				//controls
				var prChildren = pr.get(0).children;
				var elType = prChildren[prChildren.length - 1];
				var name = elType.name.split(":").pop();
				var type = "text,picture,docPartList,comboBox,dropDownList,date,checkbox".split(",").find(function (a) {
					return a == name;
				});
				if (type) return {
						v: { type: "control." + type, children: null }
					};else {
					//container
					if (content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length) {
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

			if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
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
	tc: function tc(wXml) {
		return wXml.children.reduce(function (state, node) {
			switch (node.name) {
				case "w:tcPr":
					state.pr = node;
					break;
				default:
					state.children.push(node);
			}
			return state;
		}, { type: "tc", children: [], pr: null });
	},
	docDefaults: function docDefaults(wXml) {
		return { type: "style" };
	},
	style: function style(wXml) {
		return { type: "style", id: wXml.attribs['w:styleId'] };
	},
	abstractNum: function abstractNum(wXml) {
		return { type: "abstractNum", id: wXml.attribs["w:abstractNumId"] };
	},
	num: function num(wXml) {
		return { type: "num", id: wXml.attribs["w:numId"], abstractNum: wXml.children.find(function (a) {
				return a.name == "w:abstractNumId";
			}).attribs["w:val"] };
	},
	latentStyles: function latentStyles() {
		return null;
	},
	object: function object(wXml) {
		return { type: "object", children: [] };
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50IiwiZGF0YSIsImlkIiwiTWF0aCIsIm1heCIsInRvQXJyYXkiLCJtYXAiLCJwYXJzZUludCIsImEiLCJhdHRyaWJzIiwiSWQiLCJzdWJzdHJpbmciLCJ0YXJnZXROYW1lIiwidCIsIm1hdGNoIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyYXciLCJmaWxlIiwicGFydHMiLCJhcHBlbmQiLCJ1cmwiLCJ3WG1sIiwidGFnIiwibmFtZSIsImlkZW50aXRpZXMiLCJjdXJyZW50IiwiY2hpbGRyZW4iLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInJldmVyc2UiLCJpcyIsInB1c2giLCJzZWN0UHIiLCJoZiIsImZpbHRlciIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJnZXRSZWwiLCJNYXAiLCJmb290ZXJzIiwiaGFzVGl0bGVQYWdlIiwiZmluZCIsInAiLCJpZGVudGl0eSIsInByIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJoeXBlcmxpbmsiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiZG9jRGVmYXVsdHMiLCJzdHlsZSIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7Ozs7Ozs7OzswQkFDTDtBQUFBOztBQUNOO0FBQ0EsT0FBTUMsWUFBVSxrQ0FBa0NDLEtBQWxDLENBQXdDLEdBQXhDLENBQWhCO0FBQ0EsUUFBS0MsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlUCxLQUFmLENBQXFCLEdBQXJCLEVBQTBCUSxHQUExQixFQUFUO0FBQ0EsUUFBR1QsVUFBVVUsT0FBVixDQUFrQkgsSUFBbEIsS0FBeUIsQ0FBQyxDQUE3QixFQUErQjtBQUFBO0FBQzlCLFVBQUlJLFNBQU9MLEVBQUVFLElBQUYsQ0FBTyxRQUFQLENBQVg7QUFDQUksYUFBT0MsY0FBUCxTQUEyQk4sSUFBM0IsRUFBZ0M7QUFDL0JPLFVBRCtCLGlCQUMxQjtBQUNKLGVBQU8sS0FBS0MsWUFBTCxDQUFrQkosTUFBbEIsQ0FBUDtBQUNBO0FBSDhCLE9BQWhDO0FBRjhCO0FBTzlCO0FBQ0QsSUFYRDtBQVlBOzs7eUJBRU1LLGEsRUFBZ0Q7QUFBQSxPQUFqQ0MsUUFBaUMsdUVBQXhCbEIsZUFBZWtCLFFBQVM7O0FBQ3RELE9BQUcsS0FBS0MsTUFBUixFQUNDLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0QsTUFBTCxDQUFZ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QUFLLElBQU4sRUFBV2tELFVBQVMsRUFBcEIsRUFBdUJxQixJQUFHLElBQTFCLEVBVEssQ0FBUDtBQVVBLEVBcktlO0FBc0toQmlDLFlBdEtnQix1QkFzS0ozRCxJQXRLSSxFQXNLQztBQUNoQixTQUFPLEVBQUM3QyxNQUFLLE9BQU4sRUFBUDtBQUNBLEVBeEtlO0FBeUtoQnlHLE1BektnQixpQkF5S1Y1RCxJQXpLVSxFQXlLTDtBQUNWLFNBQU8sRUFBQzdDLE1BQUssT0FBTixFQUFleUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxXQUFiLENBQWxCLEVBQVA7QUFDQSxFQTNLZTtBQTRLaEIwRSxZQTVLZ0IsdUJBNEtKN0QsSUE1S0ksRUE0S0M7QUFDaEIsU0FBTyxFQUFDN0MsTUFBSyxhQUFOLEVBQW9CeUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxpQkFBYixDQUF2QixFQUFQO0FBQ0EsRUE5S2U7QUErS2hCMkUsSUEvS2dCLGVBK0taOUQsSUEvS1ksRUErS1A7QUFDUixTQUFPLEVBQUM3QyxNQUFLLEtBQU4sRUFBWXlCLElBQUdvQixLQUFLYixPQUFMLENBQWEsU0FBYixDQUFmLEVBQXVDMEUsYUFBWTdELEtBQUtLLFFBQUwsQ0FBY2tCLElBQWQsQ0FBbUI7QUFBQSxXQUFHckMsRUFBRWdCLElBQUYsSUFBUSxpQkFBWDtBQUFBLElBQW5CLEVBQWlEZixPQUFqRCxDQUF5RCxPQUF6RCxDQUFuRCxFQUFQO0FBQ0EsRUFqTGU7QUFrTGhCNEUsYUFsTGdCLDBCQWtMRjtBQUNiLFNBQU8sSUFBUDtBQUNBLEVBcExlO0FBcUxoQkMsT0FyTGdCLGtCQXFMVGhFLElBckxTLEVBcUxKO0FBQ1gsU0FBTyxFQUFDN0MsTUFBSyxRQUFOLEVBQWVrRCxVQUFTLEVBQXhCLEVBQVA7QUFDQTtBQXZMZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdGNvbnN0IHN1cHBvcnRlZD1cInN0eWxlcyxudW1iZXJpbmcsdGhlbWUsc2V0dGluZ3NcIi5zcGxpdChcIixcIilcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGlmKHN1cHBvcnRlZC5pbmRleE9mKHR5cGUpIT0tMSl7XHJcblx0XHRcdFx0bGV0IHRhcmdldD0kLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyx0eXBlLHtcclxuXHRcdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdHRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHR0aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LCBpZGVudGlmeSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9b2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYobW9kZWwgJiYgdHlwZW9mKG1vZGVsKT09XCJvYmplY3RcIil7XHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGlmKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gZG9jXHJcblx0fVxyXG5cclxuXHRhZGRJbWFnZShkYXRhKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHRcdGxldCBpZD1gcklkJHtNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KC4uLnRoaXMucmVscyhcIlJlbGF0aW9uc2hpcFtUeXBlJD0naW1hZ2UnXVwiKS50b0FycmF5KCkubWFwKHQ9PntcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHQuYXR0cmlicy50YXJnZXQubWF0Y2goL1xcZCsvKVswXXx8XCIwXCIpXHJcblx0XHR9KSkrMSkrXCIuanBnXCI7XHJcblxyXG5cdFx0bGV0IHBhcnROYW1lPWAke3RoaXMuZm9sZGVyfS8ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldD1cIiR7cGFydE5hbWV9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBUeXBlPVwiJHt0eXBlfVwiIElkPVwiJHtpZH1cIiBUYXJnZXRNb2RlPVwiRXh0ZXJuYWxcIiBUYXJnZXQ9XCIke3VybH1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCB0YWc9d1htbC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0aWYoaWRlbnRpdGllc1t0YWddKVxyXG5cdFx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cylcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0bGV0IGNoaWxkcmVuPSQoXCJ3XFxcXDpzZWN0UHJcIikuZWFjaCgoaSxzZWN0KT0+e1xyXG5cdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRpZighZW5kLmlzKHNlY3QpKVxyXG5cdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHR9KS50b0FycmF5KClcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdH0sXHJcblx0c2VjdFByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgaGY9dHlwZT0+d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1gdzoke3R5cGV9UmVmZXJlbmNlYCkucmVkdWNlKChoZWFkZXJzLGEpPT57XHJcblx0XHRcdFx0aGVhZGVycy5zZXQoYS5hdHRyaWJzW1widzp0eXBlXCJdLG9mZmljZURvY3VtZW50LmdldFJlbChhLmF0dHJpYnNbXCJyOmlkXCJdKSlcclxuXHRcdFx0XHRyZXR1cm4gaGVhZGVyc1xyXG5cdFx0XHR9LG5ldyBNYXAoKSlcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0eXBlOlwic2VjdGlvblwiLFxyXG5cdFx0XHRjaGlsZHJlbjp3WG1sLmNvbnRlbnQsXHJcblx0XHRcdGhlYWRlcnM6aGYoXCJoZWFkZXJcIiksXHJcblx0XHRcdGZvb3RlcnM6aGYoXCJmb290ZXJcIiksXHJcblx0XHRcdGhhc1RpdGxlUGFnZTogISF3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGl0bGVQZ1wiKVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByPndcXFxcOm51bUlkYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aXR5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHJcblx0aW5saW5lKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0cmV0dXJuIHt0eXBlOmBkcmF3aW5nLmlubGluZWAsIGNoaWxkcmVuOiQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdH0sXHJcblx0YW5jaG9yKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBncmFwaGljRGF0YT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKVxyXG5cdFx0bGV0IHR5cGU9Z3JhcGhpY0RhdGEuYXR0cihcInVyaVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdGxldCBjaGlsZHJlbj1ncmFwaGljRGF0YS5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cdFx0aWYodHlwZT09XCJ3b3JkcHJvY2Vzc2luZ0dyb3VwXCIpXHJcblx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUuc3BsaXQoXCI6XCIpWzBdIT1cIndwZ1wiKVxyXG5cclxuXHRcdHJldHVybiB7dHlwZTpcImRyYXdpbmcuYW5jaG9yXCIsY2hpbGRyZW59XHJcblx0fSxcclxuXHRwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHJpZD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCJhXFxcXDpibGlwXCIpLmF0dHIoJ3I6ZW1iZWQnKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwicGljdHVyZVwiLC4uLm9mZmljZURvY3VtZW50LmdldFJlbChyaWQpfVxyXG5cdH0sXHJcblx0d3NwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdHJldHVybiB7dHlwZTpcInNoYXBlXCIsIGNoaWxkcmVuOm9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcIj53cHNcXFxcOnR4Yng+d1xcXFw6dHhieENvbnRlbnRcIikuY2hpbGRyZW4oKS50b0FycmF5KCl9XHJcblx0fSxcclxuXHRGYWxsYmFjaygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0aWYodHlwZSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHRcdGVsc2V7Ly9jb250YWluZXJcclxuXHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJpbmxpbmVcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cclxuXHR9LFxyXG5cdHRibCh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXHJcblx0fSxcclxuXHR0cih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHR0Yyh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRjUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRjXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHRkb2NEZWZhdWx0cyh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRvYmplY3Qod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixjaGlsZHJlbjpbXX1cclxuXHR9XHJcbn1cclxuIl19