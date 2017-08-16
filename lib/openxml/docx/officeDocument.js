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
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : officeDocument.identify;

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
	altChunk: function altChunk(wXml, officeDocument) {
		var rId = wXml.attribs['r:id'];
		var data = officeDocument.getRel(rId);

		var partName = officeDocument.folder + officeDocument.rels("[Id=" + rId + "]").attr("Target");
		var contentType = officeDocument.doc.contentTypes("Override[PartName='" + partName + "']").attr("ContentType");
		return { type: "chunk", data: data, contentType: contentType };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50Iiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY3VycmVudCIsImNoaWxkcmVuIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJhdHRyaWJzIiwiZ2V0UmVsIiwiTWFwIiwiZm9vdGVycyIsImhhc1RpdGxlUGFnZSIsImZpbmQiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJpZCIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLE9BQU1DLFlBQVUsa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZVAsS0FBZixDQUFxQixHQUFyQixFQUEwQlEsR0FBMUIsRUFBVDtBQUNBLFFBQUdULFVBQVVVLE9BQVYsQ0FBa0JILElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5QixVQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLGFBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxVQUQrQixpQkFDMUI7QUFDSixlQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixPQUFoQztBQUY4QjtBQU85QjtBQUNELElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QmxCLGVBQWVrQixRQUFTOztBQUN0RCxPQUFHLEtBQUtDLE1BQVIsRUFDQyxLQUFLQyxVQUFMLENBQWdCLEtBQUtELE1BQUwsQ0FBWSxZQUFaLEVBQTBCSixHQUExQixDQUE4QixDQUE5QixDQUFoQixFQUFpREUsYUFB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bnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZmljZURvY3VtZW50IGV4dGVuZHMgUGFydHtcclxuXHRfaW5pdCgpe1xyXG5cdFx0c3VwZXIuX2luaXQoKVxyXG5cdFx0Y29uc3Qgc3VwcG9ydGVkPVwic3R5bGVzLG51bWJlcmluZyx0aGVtZSxzZXR0aW5nc1wiLnNwbGl0KFwiLFwiKVxyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0aWYoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkhPS0xKXtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0PSQuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT1PZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdHRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdGRvYy5zdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRkb2MubnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCB0YWc9d1htbC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0aWYoaWRlbnRpdGllc1t0YWddKVxyXG5cdFx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0fSxcclxuXHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCBoZj10eXBlPT53WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PWB3OiR7dHlwZX1SZWZlcmVuY2VgKS5yZWR1Y2UoKGhlYWRlcnMsYSk9PntcclxuXHRcdFx0XHRoZWFkZXJzLnNldChhLmF0dHJpYnNbXCJ3OnR5cGVcIl0sb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGEuYXR0cmlic1tcInI6aWRcIl0pKVxyXG5cdFx0XHRcdHJldHVybiBoZWFkZXJzXHJcblx0XHRcdH0sbmV3IE1hcCgpKVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHR5cGU6XCJzZWN0aW9uXCIsXHJcblx0XHRcdGNoaWxkcmVuOndYbWwuY29udGVudCxcclxuXHRcdFx0aGVhZGVyczpoZihcImhlYWRlclwiKSxcclxuXHRcdFx0Zm9vdGVyczpoZihcImZvb3RlclwiKSxcclxuXHRcdFx0aGFzVGl0bGVQYWdlOiAhIXdYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0aXRsZVBnXCIpXHJcblx0XHR9XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1Qcj53XFxcXDpudW1JZFwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRyZXR1cm4ge3R5cGU6YGRyYXdpbmcuaW5saW5lYCwgY2hpbGRyZW46JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuY2hpbGRyZW4oKS50b0FycmF5KCl9XHJcblx0fSxcclxuXHRhbmNob3Iod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IGdyYXBoaWNEYXRhPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpXHJcblx0XHRsZXQgdHlwZT1ncmFwaGljRGF0YS5hdHRyKFwidXJpXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWdyYXBoaWNEYXRhLmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblx0XHRpZih0eXBlPT1cIndvcmRwcm9jZXNzaW5nR3JvdXBcIilcclxuXHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW5bMF0uY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZS5zcGxpdChcIjpcIilbMF0hPVwid3BnXCIpXHJcblxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZHJhd2luZy5hbmNob3JcIixjaGlsZHJlbn1cclxuXHR9LFxyXG5cdHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgcmlkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIikuYXR0cigncjplbWJlZCcpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJwaWN0dXJlXCIsLi4ub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCl9XHJcblx0fSxcclxuXHR3c3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic2hhcGVcIiwgY2hpbGRyZW46b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiPndwc1xcXFw6dHhieD53XFxcXDp0eGJ4Q29udGVudFwiKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdEZhbGxiYWNrKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH0sXHJcblx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcclxuXHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHJcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXHJcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxyXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcclxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRsZXQgdmFsdWU9Y29udGVudC50ZXh0KClcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cclxuXHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LHBpY3R1cmUsZG9jUGFydExpc3QsY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3hcIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRpZih0eXBlKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHRjKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGNcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBySWQ9d1htbC5hdHRyaWJzWydyOmlkJ11cclxuXHRcdGxldCBkYXRhPW9mZmljZURvY3VtZW50LmdldFJlbChySWQpXHJcblxyXG5cdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGxldCBjb250ZW50VHlwZT1vZmZpY2VEb2N1bWVudC5kb2MuY29udGVudFR5cGVzKGBPdmVycmlkZVtQYXJ0TmFtZT0nJHtwYXJ0TmFtZX0nXWApLmF0dHIoXCJDb250ZW50VHlwZVwiKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiY2h1bmtcIiwgZGF0YSwgY29udGVudFR5cGV9XHJcblx0fSxcclxuXHRkb2NEZWZhdWx0cyh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRvYmplY3Qod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixjaGlsZHJlbjpbXX1cclxuXHR9XHJcbn1cclxuIl19