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
			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				Object.defineProperty(_this2, type, {
					get: function get() {
						this.getRelObject($.attr("Target"));
					}
				});
			});
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

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
				if (model && (typeof model === "undefined" ? "undefined" : _typeof(model)) == "object") {
					domHandler.emit.apply(domHandler, ["*", model].concat(Array.prototype.slice.call(arguments)));
					domHandler.emit.apply(domHandler, [model.type, model].concat(Array.prototype.slice.call(arguments)));
					if (domHandler["on" + model.type]) domHandler["on" + model.type].apply(domHandler, [model].concat(Array.prototype.slice.call(arguments)));
				}
				return model;
			}

			doc.document = this.renderNode(this.content("w\\:document").get(0), createElement, _identify);
			if (this.styles) doc.styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, _identify);
			if (this.numbering) doc.numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, _identify);
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
		return { type: "style", id: "*r" };
	},
	pPrDefault: function pPrDefault(wXml) {
		return { type: "style", id: "*p" };
	},
	style: function style(wXml) {
		return { type: "style", id: wXml.attribs['w:styleId'] };
	},
	abstractNum: function abstractNum(wXml) {
		return { type: "numbering", id: wXml.attribs["w:abstractNumId"], children: wXml.children.filter(function (a) {
				return a.name == "w:lvl";
			}) };
	},
	num: function num(wXml) {
		return { type: "style", id: wXml.attribs["w:numId"], numbering: wXml.children.find(function (a) {
				return a.name == "w:abstractNumId";
			}).attribs["w:val"] };
	},
	latentStyles: function latentStyles() {
		return null;
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwicmVuZGVyTm9kZSIsImNvbnRlbnQiLCJhcmd1bWVudHMiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJlbWl0IiwiZG9jdW1lbnQiLCJzdHlsZXMiLCJudW1iZXJpbmciLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsInN1YnN0cmluZyIsInRhcmdldE5hbWUiLCJ0IiwidGFyZ2V0IiwibWF0Y2giLCJwYXJ0TmFtZSIsImZvbGRlciIsInJhdyIsImZpbGUiLCJwYXJ0cyIsImFwcGVuZCIsInVybCIsIndYbWwiLCJ0YWciLCJuYW1lIiwiaWRlbnRpdGllcyIsImNoaWxkcmVuIiwicCIsImlkZW50aXR5IiwicHIiLCJmaW5kIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsInByb3BzIiwicmlkIiwiYXNzaWduIiwiZ2V0UmVsIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiaHlwZXJsaW5rIiwidGJsIiwicmVkdWNlIiwic3RhdGUiLCJub2RlIiwiY29scyIsInB1c2giLCJ0ciIsImlzSGVhZGVyIiwiclByRGVmYXVsdCIsInBQckRlZmF1bHQiLCJz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QUFDYixTQUFPLElBQVA7QUFDQTtBQXZJZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcclxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0PVwiJHtwYXJ0TmFtZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXHJcblxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW5bMF0uY2hpbGRyZW59XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1QclwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHJgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxvZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKSlcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcHJvcHNcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0aWYodHlwZSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHRcdGVsc2V7Ly9jb250YWluZXJcclxuXHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJpbmxpbmVcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cclxuXHR9LFxyXG5cdHRibCh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXHJcblx0fSxcclxuXHR0cih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHRyUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipyXCJ9XHJcblx0fSxcclxuXHRwUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipwXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm51bWJlcmluZ1wiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PVwidzpsdmxcIil9XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sbnVtYmVyaW5nOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9XHJcbn1cclxuIl19