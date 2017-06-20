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
					var target = $.attr("Target");
					Object.defineProperty(_this2, type, {
						get: function get() {
							return this.getRelObject(target);
						}
					});
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
			//controls
			var prChildren = pr.get(0).children;
			var elType = prChildren[prChildren.length - 1];
			var _name = elType.name.split(":").pop();
			var type = "text,picture,docPartList,comboBox,dropDownList,date,checkbox".split(",").find(function (a) {
				return a == _name;
			});
			if (type) return { type: "control." + type, children: null };else {
				//container
				if (content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length) {
					return { type: "block", children: children };
				} else {
					return { type: "inline", children: children };
				}
			}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50IiwiZGF0YSIsImlkIiwiTWF0aCIsIm1heCIsInRvQXJyYXkiLCJtYXAiLCJwYXJzZUludCIsImEiLCJhdHRyaWJzIiwiSWQiLCJzdWJzdHJpbmciLCJ0YXJnZXROYW1lIiwidCIsIm1hdGNoIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyYXciLCJmaWxlIiwicGFydHMiLCJhcHBlbmQiLCJ1cmwiLCJ3WG1sIiwidGFnIiwibmFtZSIsImlkZW50aXRpZXMiLCJjdXJyZW50IiwiY2hpbGRyZW4iLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInJldmVyc2UiLCJpcyIsInB1c2giLCJzZWN0UHIiLCJoZiIsImZpbHRlciIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJnZXRSZWwiLCJNYXAiLCJmb290ZXJzIiwiaGFzVGl0bGVQYWdlIiwiZmluZCIsInAiLCJpZGVudGl0eSIsInByIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJoeXBlcmxpbmsiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiZG9jRGVmYXVsdHMiLCJzdHlsZSIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7Ozs7Ozs7OzswQkFDTDtBQUFBOztBQUNOO0FBQ0EsT0FBTUMsWUFBVSxrQ0FBa0NDLEtBQWxDLENBQXdDLEdBQXhDLENBQWhCO0FBQ0EsUUFBS0MsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlUCxLQUFmLENBQXFCLEdBQXJCLEVBQTBCUSxHQUExQixFQUFUO0FBQ0EsUUFBR1QsVUFBVVUsT0FBVixDQUFrQkgsSUFBbEIsS0FBeUIsQ0FBQyxDQUE3QixFQUErQjtBQUM5QixTQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLFlBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxTQUQrQixpQkFDMUI7QUFDSixjQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixNQUFoQztBQUtBO0FBQ0QsSUFYRDtBQVlBOzs7eUJBRU1LLGEsRUFBZ0Q7QUFBQSxPQUFqQ0MsUUFBaUMsdUVBQXhCbEIsZUFBZWtCLFFBQVM7O0FBQ3RELE9BQUcsS0FBS0MsTUFBUixFQUNDLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0QsTUFBTCxDQUFZLFlBQVosRUFBMEJK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MUIsRUFUSyxDQUFQO0FBVUEsRUFyS2U7QUFzS2hCaUMsWUF0S2dCLHVCQXNLSjNELElBdEtJLEVBc0tDO0FBQ2hCLFNBQU8sRUFBQzdDLE1BQUssT0FBTixFQUFQO0FBQ0EsRUF4S2U7QUF5S2hCeUcsTUF6S2dCLGlCQXlLVjVELElBektVLEVBeUtMO0FBQ1YsU0FBTyxFQUFDN0MsTUFBSyxPQUFOLEVBQWV5QixJQUFHb0IsS0FBS2IsT0FBTCxDQUFhLFdBQWIsQ0FBbEIsRUFBUDtBQUNBLEVBM0tlO0FBNEtoQjBFLFlBNUtnQix1QkE0S0o3RCxJQTVLSSxFQTRLQztBQUNoQixTQUFPLEVBQUM3QyxNQUFLLGFBQU4sRUFBb0J5QixJQUFHb0IsS0FBS2IsT0FBTCxDQUFhLGlCQUFiLENBQXZCLEVBQVA7QUFDQSxFQTlLZTtBQStLaEIyRSxJQS9LZ0IsZUErS1o5RCxJQS9LWSxFQStLUDtBQUNSLFNBQU8sRUFBQzdDLE1BQUssS0FBTixFQUFZeUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUMwRSxhQUFZN0QsS0FBS0ssUUFBTCxDQUFja0IsSUFBZCxDQUFtQjtBQUFBLFdBQUdyQyxFQUFFZ0IsSUFBRixJQUFRLGlCQUFYO0FBQUEsSUFBbkIsRUFBaURmLE9BQWpELENBQXlELE9BQXpELENBQW5ELEVBQVA7QUFDQSxFQWpMZTtBQWtMaEI0RSxhQWxMZ0IsMEJBa0xGO0FBQ2IsU0FBTyxJQUFQO0FBQ0EsRUFwTGU7QUFxTGhCQyxPQXJMZ0Isa0JBcUxUaEUsSUFyTFMsRUFxTEo7QUFDWCxTQUFPLEVBQUM3QyxNQUFLLFFBQU4sRUFBZWtELFVBQVMsRUFBeEIsRUFBUDtBQUNBO0FBdkxlLENBQWpCIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZmljZURvY3VtZW50IGV4dGVuZHMgUGFydHtcclxuXHRfaW5pdCgpe1xyXG5cdFx0c3VwZXIuX2luaXQoKVxyXG5cdFx0Y29uc3Qgc3VwcG9ydGVkPVwic3R5bGVzLG51bWJlcmluZyx0aGVtZSxzZXR0aW5nc1wiLnNwbGl0KFwiLFwiKVxyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0aWYoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkhPS0xKXtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0PSQuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT1PZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdHRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdGRvYy5zdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRkb2MubnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcclxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0PVwiJHtwYXJ0TmFtZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0fSxcclxuXHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCBoZj10eXBlPT53WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PWB3OiR7dHlwZX1SZWZlcmVuY2VgKS5yZWR1Y2UoKGhlYWRlcnMsYSk9PntcclxuXHRcdFx0XHRoZWFkZXJzLnNldChhLmF0dHJpYnNbXCJ3OnR5cGVcIl0sb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGEuYXR0cmlic1tcInI6aWRcIl0pKVxyXG5cdFx0XHRcdHJldHVybiBoZWFkZXJzXHJcblx0XHRcdH0sbmV3IE1hcCgpKVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHR5cGU6XCJzZWN0aW9uXCIsXHJcblx0XHRcdGNoaWxkcmVuOndYbWwuY29udGVudCxcclxuXHRcdFx0aGVhZGVyczpoZihcImhlYWRlclwiKSxcclxuXHRcdFx0Zm9vdGVyczpoZihcImZvb3RlclwiKSxcclxuXHRcdFx0aGFzVGl0bGVQYWdlOiAhIXdYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0aXRsZVBnXCIpXHJcblx0XHR9XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1Qcj53XFxcXDpudW1JZFwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRyZXR1cm4ge3R5cGU6YGRyYXdpbmcuaW5saW5lYCwgY2hpbGRyZW46JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuY2hpbGRyZW4oKS50b0FycmF5KCl9XHJcblx0fSxcclxuXHRhbmNob3Iod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IGdyYXBoaWNEYXRhPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpXHJcblx0XHRsZXQgdHlwZT1ncmFwaGljRGF0YS5hdHRyKFwidXJpXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWdyYXBoaWNEYXRhLmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblx0XHRpZih0eXBlPT1cIndvcmRwcm9jZXNzaW5nR3JvdXBcIilcclxuXHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW5bMF0uY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZS5zcGxpdChcIjpcIilbMF0hPVwid3BnXCIpXHJcblxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZHJhd2luZy5hbmNob3JcIixjaGlsZHJlbn1cclxuXHR9LFxyXG5cdHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgcmlkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIikuYXR0cigncjplbWJlZCcpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJwaWN0dXJlXCIsLi4ub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCl9XHJcblx0fSxcclxuXHR3c3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic2hhcGVcIiwgY2hpbGRyZW46b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiPndwc1xcXFw6dHhieD53XFxcXDp0eGJ4Q29udGVudFwiKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdEZhbGxiYWNrKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH0sXHJcblx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcclxuXHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHJcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXHJcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxyXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcclxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRsZXQgdmFsdWU9Y29udGVudC50ZXh0KClcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cclxuXHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LHBpY3R1cmUsZG9jUGFydExpc3QsY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3hcIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRpZih0eXBlKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHRjKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGNcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIn1cclxuXHR9LFxyXG5cdHN0eWxlKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIiwgaWQ6d1htbC5hdHRyaWJzWyd3OnN0eWxlSWQnXX1cclxuXHR9LFxyXG5cdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiYWJzdHJhY3ROdW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl19XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLGFic3RyYWN0TnVtOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdG9iamVjdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGNoaWxkcmVuOltdfVxyXG5cdH1cclxufVxyXG4iXX0=