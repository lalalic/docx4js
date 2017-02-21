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
				return parseInt(a.substring(3));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwicmVuZGVyTm9kZSIsImNvbnRlbnQiLCJhcmd1bWVudHMiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJlbWl0IiwiZG9jdW1lbnQiLCJzdHlsZXMiLCJudW1iZXJpbmciLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsInN1YnN0cmluZyIsInRhcmdldE5hbWUiLCJ0IiwidGFyZ2V0IiwibWF0Y2giLCJwYXJ0TmFtZSIsImZvbGRlciIsInJhdyIsImZpbGUiLCJwYXJ0cyIsImFwcGVuZCIsInVybCIsIndYbWwiLCJ0YWciLCJuYW1lIiwiaWRlbnRpdGllcyIsImNoaWxkcmVuIiwicCIsImlkZW50aXR5IiwicHIiLCJmaW5kIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsInByb3BzIiwicmlkIiwiYXNzaWduIiwiZ2V0UmVsIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiaHlwZXJsaW5rIiwidGJsIiwicmVkdWNlIiwic3RhdGUiLCJub2RlIiwiY29scyIsInB1c2giLCJ0ciIsImlzSGVhZGVyIiwiclByRGVmYXVsdCIsInBQckRlZmF1bHQiLCJz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ZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcclxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0PVwiJHtwYXJ0TmFtZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBUeXBlPVwiJHt0eXBlfVwiIElkPVwiJHtpZH1cIiBUYXJnZXRNb2RlPVwiRXh0ZXJuYWxcIiBUYXJnZXQ9XCIke3VybH1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCB0YWc9d1htbC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0aWYoaWRlbnRpdGllc1t0YWddKVxyXG5cdFx0XHRyZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cyl8fHRhZ1xyXG5cclxuXHRcdHJldHVybiB0YWdcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9mZmljZURvY3VtZW50XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRkb2N1bWVudCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuWzBdLmNoaWxkcmVufVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aXR5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5hdHRyKCd1cmknKS5zcGxpdCgnLycpLnBvcCgpXHJcblx0XHRsZXQgcHJvcHM9e3R5cGU6YGlubGluZS4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJwaWN0dXJlXCI6XHJcblx0XHRcdGxldCByaWQ9JC5maW5kKCdhXFxcXDpibGlwJykuYXR0cigncjplbWJlZCcpXHJcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCkpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByb3BzXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0XHRlbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImJsb2NrXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaW5saW5lXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0fSxcclxuXHR0Ymwod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0YmxQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInc6dGJsR3JpZFwiOlxyXG5cdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdH0sXHJcblx0dHIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0clByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0clByRGVmYXVsdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsaWQ6XCIqclwifVxyXG5cdH0sXHJcblx0cFByRGVmYXVsdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsaWQ6XCIqcFwifVxyXG5cdH0sXHJcblx0c3R5bGUod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdH0sXHJcblx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1iZXJpbmdcIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl0sY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1cInc6bHZsXCIpfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDp3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLG51bWJlcmluZzp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fVxyXG59XHJcbiJdfQ==