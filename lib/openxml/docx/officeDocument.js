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
						v: { type: "control." + type, children: children }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50Iiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY3VycmVudCIsImNoaWxkcmVuIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJhdHRyaWJzIiwiZ2V0UmVsIiwiTWFwIiwiZm9vdGVycyIsImhhc1RpdGxlUGFnZSIsImZpbmQiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJpZCIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLE9BQU1DLFlBQVUsa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZVAsS0FBZixDQUFxQixHQUFyQixFQUEwQlEsR0FBMUIsRUFBVDtBQUNBLFFBQUdULFVBQVVVLE9BQVYsQ0FBa0JILElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5QixVQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLGFBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxVQUQrQixpQkFDMUI7QUFDSixlQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixPQUFoQztBQUY4QjtBQU85QjtBQUNELElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QmxCLGVBQWVrQixRQUFTOztBQUN0RCxPQUFHLEtBQUtDLE1BQVIsRUFDQyxLQUFLQyxVQUFMLENBQWdCLEtBQUtELE1BQUwsQ0FBWSxZQUFaLEVBQTBCSixHQUExQixDQUE4QixDQUE5QixDQUFoQixFQUFpREUsYUFB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dCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHRjb25zdCBzdXBwb3J0ZWQ9XCJzdHlsZXMsbnVtYmVyaW5nLHRoZW1lLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRpZihzdXBwb3J0ZWQuaW5kZXhPZih0eXBlKSE9LTEpe1xyXG5cdFx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XHJcblx0XHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PU9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHR0aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHJldHVybiB0YWdcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9mZmljZURvY3VtZW50XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRkb2N1bWVudCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdGxldCBjdXJyZW50PW51bGxcclxuXHRcdGxldCBjaGlsZHJlbj0kKFwid1xcXFw6c2VjdFByXCIpLmVhY2goKGksc2VjdCk9PntcclxuXHRcdFx0bGV0IGVuZD0kKHNlY3QpLmNsb3Nlc3QoJ3dcXFxcOmJvZHk+KicpXHJcblx0XHRcdHNlY3QuY29udGVudD1lbmQucHJldlVudGlsKGN1cnJlbnQpLnRvQXJyYXkoKS5yZXZlcnNlKClcclxuXHRcdFx0aWYoIWVuZC5pcyhzZWN0KSlcclxuXHRcdFx0XHRzZWN0LmNvbnRlbnQucHVzaChlbmQuZ2V0KDApKVxyXG5cdFx0XHRjdXJyZW50PWVuZFxyXG5cdFx0fSkudG9BcnJheSgpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbn1cclxuXHR9LFxyXG5cdHNlY3RQcih3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IGhmPXR5cGU9PndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09YHc6JHt0eXBlfVJlZmVyZW5jZWApLnJlZHVjZSgoaGVhZGVycyxhKT0+e1xyXG5cdFx0XHRcdGhlYWRlcnMuc2V0KGEuYXR0cmlic1tcInc6dHlwZVwiXSxvZmZpY2VEb2N1bWVudC5nZXRSZWwoYS5hdHRyaWJzW1wicjppZFwiXSkpXHJcblx0XHRcdFx0cmV0dXJuIGhlYWRlcnNcclxuXHRcdFx0fSxuZXcgTWFwKCkpXHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHlwZTpcInNlY3Rpb25cIixcclxuXHRcdFx0Y2hpbGRyZW46d1htbC5jb250ZW50LFxyXG5cdFx0XHRoZWFkZXJzOmhmKFwiaGVhZGVyXCIpLFxyXG5cdFx0XHRmb290ZXJzOmhmKFwiZm9vdGVyXCIpLFxyXG5cdFx0XHRoYXNUaXRsZVBhZ2U6ICEhd1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRpdGxlUGdcIilcclxuXHRcdH1cclxuXHR9LFxyXG5cdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcclxuXHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByPndcXFxcOm51bUlkXCIpXHJcblx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XHJcblx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1Qcj53XFxcXDpudW1JZGApXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdGlkZW50aXR5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZGVudGl0eS5sZXZlbD1udW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IG91dGxpbmVMdmw9cFByLmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlmKCFvdXRsaW5lTHZsICYmIHN0eWxlSWQpXHJcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRpZihvdXRsaW5lTHZsKXtcclxuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHR9LFxyXG5cdHIod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHR9LFxyXG5cdGZsZENoYXIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdH0sXHJcblxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdHJldHVybiB7dHlwZTpgZHJhd2luZy5pbmxpbmVgLCBjaGlsZHJlbjokLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgZ3JhcGhpY0RhdGE9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJylcclxuXHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdGlmKHR5cGU9PVwid29yZHByb2Nlc3NpbmdHcm91cFwiKVxyXG5cdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdH0sXHJcblx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCByaWQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiYVxcXFw6YmxpcFwiKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKX1cclxuXHR9LFxyXG5cdHdzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzaGFwZVwiLCBjaGlsZHJlbjpvZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCI+d3BzXFxcXDp0eGJ4PndcXFxcOnR4YnhDb250ZW50XCIpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdH0sXHJcblx0RmFsbGJhY2soKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbn1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHRjKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGNcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBySWQ9d1htbC5hdHRyaWJzWydyOmlkJ11cclxuXHRcdGxldCBkYXRhPW9mZmljZURvY3VtZW50LmdldFJlbChySWQpXHJcblxyXG5cdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGxldCBjb250ZW50VHlwZT1vZmZpY2VEb2N1bWVudC5kb2MuY29udGVudFR5cGVzKGBPdmVycmlkZVtQYXJ0TmFtZT0nJHtwYXJ0TmFtZX0nXWApLmF0dHIoXCJDb250ZW50VHlwZVwiKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiY2h1bmtcIiwgZGF0YSwgY29udGVudFR5cGV9XHJcblx0fSxcclxuXHRkb2NEZWZhdWx0cyh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRvYmplY3Qod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixjaGlsZHJlbjpbXX1cclxuXHR9XHJcbn1cclxuIl19