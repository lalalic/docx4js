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
		var blip = officeDocument.content(wXml).find("a\\:blip");
		var rid = blip.attr('r:embed') || blip.attr('r:link');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50Iiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY3VycmVudCIsImNoaWxkcmVuIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJhdHRyaWJzIiwiZ2V0UmVsIiwiTWFwIiwiZm9vdGVycyIsImhhc1RpdGxlUGFnZSIsImZpbmQiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwiYmxpcCIsInJpZCIsIndzcCIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiaHlwZXJsaW5rIiwidXJsIiwidGJsIiwic3RhdGUiLCJub2RlIiwiY29scyIsInRyIiwiaXNIZWFkZXIiLCJ0YyIsImFsdENodW5rIiwicklkIiwiZGF0YSIsInBhcnROYW1lIiwiZm9sZGVyIiwiY29udGVudFR5cGUiLCJjb250ZW50VHlwZXMiLCJkb2NEZWZhdWx0cyIsInN0eWxlIiwiaWQiLCJhYnN0cmFjdE51bSIsIm51bSIsImxhdGVudFN0eWxlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7Ozs7Ozs7Ozs7OzBCQUNMO0FBQUE7O0FBQ047QUFDQSxPQUFNQyxZQUFVLGtDQUFrQ0MsS0FBbEMsQ0FBd0MsR0FBeEMsQ0FBaEI7QUFDQSxRQUFLQyxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVQLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJRLEdBQTFCLEVBQVQ7QUFDQSxRQUFHVCxVQUFVVSxPQUFWLENBQWtCSCxJQUFsQixLQUF5QixDQUFDLENBQTdCLEVBQStCO0FBQUE7QUFDOUIsVUFBSUksU0FBT0wsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBWDtBQUNBSSxhQUFPQyxjQUFQLFNBQTJCTixJQUEzQixFQUFnQztBQUMvQk8sVUFEK0IsaUJBQzFCO0FBQ0osZUFBTyxLQUFLQyxZQUFMLENBQWtCSixNQUFsQixDQUFQO0FBQ0E7QUFIOEIsT0FBaEM7QUFGOEI7QUFPOUI7QUFDRCxJQVhEO0FBWUE7Ozt5QkFFTUssYSxFQUFnRDtBQUFBLE9BQWpDQyxRQUFpQyx1RUFBeEJsQixlQUFla0IsUUFBUzs7QUFDdEQsT0FBRyxLQUFLQyxNQUFSLEVBQ0MsS0FBS0MsVUFBTCxDQUFnQixLQUFLRCxNQUFMLENBQVksWUFBWixFQUEwQkosR0FBMUIsQ0FBOEIsQ0FBOUIsQ0FBaEIsRUFB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Q0E7QUFoTWUsQ0FBakIiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHRjb25zdCBzdXBwb3J0ZWQ9XCJzdHlsZXMsbnVtYmVyaW5nLHRoZW1lLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRpZihzdXBwb3J0ZWQuaW5kZXhPZih0eXBlKSE9LTEpe1xyXG5cdFx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XHJcblx0XHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PU9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHR0aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHJldHVybiB0YWdcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9mZmljZURvY3VtZW50XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRkb2N1bWVudCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdGxldCBjdXJyZW50PW51bGxcclxuXHRcdGxldCBjaGlsZHJlbj0kKFwid1xcXFw6c2VjdFByXCIpLmVhY2goKGksc2VjdCk9PntcclxuXHRcdFx0bGV0IGVuZD0kKHNlY3QpLmNsb3Nlc3QoJ3dcXFxcOmJvZHk+KicpXHJcblx0XHRcdHNlY3QuY29udGVudD1lbmQucHJldlVudGlsKGN1cnJlbnQpLnRvQXJyYXkoKS5yZXZlcnNlKClcclxuXHRcdFx0aWYoIWVuZC5pcyhzZWN0KSlcclxuXHRcdFx0XHRzZWN0LmNvbnRlbnQucHVzaChlbmQuZ2V0KDApKVxyXG5cdFx0XHRjdXJyZW50PWVuZFxyXG5cdFx0fSkudG9BcnJheSgpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbn1cclxuXHR9LFxyXG5cdHNlY3RQcih3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IGhmPXR5cGU9PndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09YHc6JHt0eXBlfVJlZmVyZW5jZWApLnJlZHVjZSgoaGVhZGVycyxhKT0+e1xyXG5cdFx0XHRcdGhlYWRlcnMuc2V0KGEuYXR0cmlic1tcInc6dHlwZVwiXSxvZmZpY2VEb2N1bWVudC5nZXRSZWwoYS5hdHRyaWJzW1wicjppZFwiXSkpXHJcblx0XHRcdFx0cmV0dXJuIGhlYWRlcnNcclxuXHRcdFx0fSxuZXcgTWFwKCkpXHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHlwZTpcInNlY3Rpb25cIixcclxuXHRcdFx0Y2hpbGRyZW46d1htbC5jb250ZW50LFxyXG5cdFx0XHRoZWFkZXJzOmhmKFwiaGVhZGVyXCIpLFxyXG5cdFx0XHRmb290ZXJzOmhmKFwiZm9vdGVyXCIpLFxyXG5cdFx0XHRoYXNUaXRsZVBhZ2U6ICEhd1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRpdGxlUGdcIilcclxuXHRcdH1cclxuXHR9LFxyXG5cdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcclxuXHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByPndcXFxcOm51bUlkXCIpXHJcblx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XHJcblx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1Qcj53XFxcXDpudW1JZGApXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdGlkZW50aXR5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZGVudGl0eS5sZXZlbD1udW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IG91dGxpbmVMdmw9cFByLmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlmKCFvdXRsaW5lTHZsICYmIHN0eWxlSWQpXHJcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRpZihvdXRsaW5lTHZsKXtcclxuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHR9LFxyXG5cdHIod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHR9LFxyXG5cdGZsZENoYXIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdH0sXHJcblxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdHJldHVybiB7dHlwZTpgZHJhd2luZy5pbmxpbmVgLCBjaGlsZHJlbjokLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgZ3JhcGhpY0RhdGE9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJylcclxuXHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdGlmKHR5cGU9PVwid29yZHByb2Nlc3NpbmdHcm91cFwiKVxyXG5cdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdH0sXHJcblx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBibGlwPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIilcclxuXHRcdGxldCByaWQ9YmxpcC5hdHRyKCdyOmVtYmVkJyl8fGJsaXAuYXR0cigncjpsaW5rJylcclxuXHRcdHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKX1cclxuXHR9LFxyXG5cdHdzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzaGFwZVwiLCBjaGlsZHJlbjpvZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCI+d3BzXFxcXDp0eGJ4PndcXFxcOnR4YnhDb250ZW50XCIpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdH0sXHJcblx0RmFsbGJhY2soKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbn1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHRjKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGNcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBySWQ9d1htbC5hdHRyaWJzWydyOmlkJ11cclxuXHRcdGxldCBkYXRhPW9mZmljZURvY3VtZW50LmdldFJlbChySWQpXHJcblxyXG5cdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGxldCBjb250ZW50VHlwZT1vZmZpY2VEb2N1bWVudC5kb2MuY29udGVudFR5cGVzKGBPdmVycmlkZVtQYXJ0TmFtZT0nJHtwYXJ0TmFtZX0nXWApLmF0dHIoXCJDb250ZW50VHlwZVwiKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiY2h1bmtcIiwgZGF0YSwgY29udGVudFR5cGV9XHJcblx0fSxcclxuXHRkb2NEZWZhdWx0cyh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRvYmplY3Qod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixjaGlsZHJlbjpbXX1cclxuXHR9XHJcbn1cclxuIl19