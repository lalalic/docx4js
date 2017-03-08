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

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

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
				if (type == "customXml") return;
				var target = $.attr("Target");
				Object.defineProperty(_this2, type, {
					get: function get() {
						return this.getRelObject(target);
					}
				});
			});
		}
	}, {
		key: "themeColor",
		value: function themeColor(name) {
			if (name == 'phClr') return name;
			var key = this.settings("w\\:clrSchemeMapping").attr("w:" + name) || name;
			var found = this.theme("a\\:clrScheme>a\\:" + key);
			var color = found.find("a\\:srgbClr").attr("w:val") || found.find("a\\:sysClr").attr("w:lastClr") || "000000";
			return "#" + color;
		}
	}, {
		key: "themeFont",
		value: function themeFont(name) {
			var _name$split = name.split(/(?=[A-Z])/g),
			    _name$split2 = _toArray(_name$split),
			    first = _name$split2[0],
			    second = _name$split2.slice(1);

			second = { HAnsi: 'latin', Ascii: 'latin', Bidi: 'cs', EastAsia: 'ea' }[second.join().toLowerCase()];
			var font = this.theme("a\\:" + second, "a\\:fontScheme>a\\:" + first).attr("typeface");
			if (!font && (second == 'cs' || second == 'ea')) {
				var lang = this.settings("w\\:themeFontLang").attr("w:" + { cs: 'bidi', ea: 'eastAsia' }[second]);
				font = this.theme("a\\:font[script=" + { 'zh-CN': 'Hans' }[lang] + "]", "a\\:fontScheme>a\\:" + first).attr("typeface");
			}
			return font;
		}
	}, {
		key: "themeFormat",
		value: function themeFormat(type, idx) {
			var kind = { line: 'ln', fill: 'bgFillStyleLst', bgFill: 'bgFillStyleLst', effect: 'effectStyle', font: 'fontScheme' }[type];
			return this.theme("a\\:" + kind + ":nth-child(" + (parseInt(idx) + 1) + ")", "a\\:fmtScheme");
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

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
		return { type: "section", children: wXml.content };
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
	},
	object: function object(wXml) {
		return { type: "object", children: [] };
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsInRhcmdldCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwibmFtZSIsImtleSIsInNldHRpbmdzIiwiZm91bmQiLCJ0aGVtZSIsImNvbG9yIiwiZmluZCIsImZpcnN0Iiwic2Vjb25kIiwiSEFuc2kiLCJBc2NpaSIsIkJpZGkiLCJFYXN0QXNpYSIsImpvaW4iLCJ0b0xvd2VyQ2FzZSIsImZvbnQiLCJsYW5nIiwiY3MiLCJlYSIsImlkeCIsImtpbmQiLCJsaW5lIiwiZmlsbCIsImJnRmlsbCIsImVmZmVjdCIsInBhcnNlSW50IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwicmVuZGVyTm9kZSIsImNvbnRlbnQiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJhcmd1bWVudHMiLCJlbWl0IiwiZG9jdW1lbnQiLCJzdHlsZXMiLCJudW1iZXJpbmciLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsImEiLCJhdHRyaWJzIiwiSWQiLCJzdWJzdHJpbmciLCJ0YXJnZXROYW1lIiwidCIsIm1hdGNoIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyYXciLCJmaWxlIiwicGFydHMiLCJhcHBlbmQiLCJ1cmwiLCJ3WG1sIiwidGFnIiwiaWRlbnRpdGllcyIsImN1cnJlbnQiLCJjaGlsZHJlbiIsInNlY3QiLCJlbmQiLCJjbG9zZXN0IiwicHJldlVudGlsIiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsInAiLCJpZGVudGl0eSIsInByIiwiZmlsdGVyIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsInByb3BzIiwicmlkIiwiYXNzaWduIiwiZ2V0UmVsIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiaHlwZXJsaW5rIiwidGJsIiwicmVkdWNlIiwic3RhdGUiLCJub2RlIiwiY29scyIsInRyIiwiaXNIZWFkZXIiLCJyUHJEZWZhdWx0IiwicFByRGVmYXVsdCIsInN0eWxlIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7Ozs7Ozs7Ozs7OzBCQUNMO0FBQUE7O0FBQ047QUFDQSxRQUFLQyxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxRQUFHSCxRQUFNLFdBQVQsRUFDQztBQUNELFFBQUlJLFNBQU9MLEVBQUVFLElBQUYsQ0FBTyxRQUFQLENBQVg7QUFDQUksV0FBT0MsY0FBUCxTQUEyQk4sSUFBM0IsRUFBZ0M7QUFDL0JPLFFBRCtCLGlCQUMxQjtBQUNKLGFBQU8sS0FBS0MsWUFBTCxDQUFrQkosTUFBbEIsQ0FBUDtBQUNBO0FBSDhCLEtBQWhDO0FBS0EsSUFYRDtBQVlBOzs7NkJBRVVLLEksRUFBSztBQUNmLE9BQUdBLFFBQU0sT0FBVCxFQUNDLE9BQU9BLElBQVA7QUFDRCxPQUFJQyxNQUFJLEtBQUtDLFFBQUwsQ0FBYyxzQkFBZCxFQUFzQ1YsSUFBdEMsUUFBZ0RRLElBQWhELEtBQXlEQSxJQUFq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SCxJQTlJZ0IsZUE4SVpuRCxJQTlJWSxFQThJUDtBQUNSLFNBQU8sRUFBQ3RFLE1BQUssT0FBTixFQUFjbUQsSUFBR21CLEtBQUtiLE9BQUwsQ0FBYSxTQUFiLENBQWpCLEVBQXlDUixXQUFVcUIsS0FBS0ksUUFBTCxDQUFjM0QsSUFBZCxDQUFtQjtBQUFBLFdBQUd5QyxFQUFFL0MsSUFBRixJQUFRLGlCQUFYO0FBQUEsSUFBbkIsRUFBaURnRCxPQUFqRCxDQUF5RCxPQUF6RCxDQUFuRCxFQUFQO0FBQ0EsRUFoSmU7QUFpSmhCaUUsYUFqSmdCLDBCQWlKRjtBQUNiLFNBQU8sSUFBUDtBQUNBLEVBbkplO0FBb0poQkMsT0FwSmdCLGtCQW9KVHJELElBcEpTLEVBb0pKO0FBQ1gsU0FBTyxFQUFDdEUsTUFBSyxRQUFOLEVBQWUwRSxVQUFTLEVBQXhCLEVBQVA7QUFDQTtBQXRKZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGlmKHR5cGU9PVwiY3VzdG9tWG1sXCIpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHR0aGVtZUNvbG9yKG5hbWUpe1xyXG5cdFx0aWYobmFtZT09J3BoQ2xyJylcclxuXHRcdFx0cmV0dXJuIG5hbWVcclxuXHRcdGxldCBrZXk9dGhpcy5zZXR0aW5ncyhcIndcXFxcOmNsclNjaGVtZU1hcHBpbmdcIikuYXR0cihgdzoke25hbWV9YCl8fG5hbWVcclxuXHRcdGxldCBmb3VuZD10aGlzLnRoZW1lKGBhXFxcXDpjbHJTY2hlbWU+YVxcXFw6JHtrZXl9YClcclxuXHRcdGxldCBjb2xvcj1mb3VuZC5maW5kKFwiYVxcXFw6c3JnYkNsclwiKS5hdHRyKFwidzp2YWxcIikgfHwgZm91bmQuZmluZChcImFcXFxcOnN5c0NsclwiKS5hdHRyKFwidzpsYXN0Q2xyXCIpIHx8IFwiMDAwMDAwXCJcclxuXHRcdHJldHVybiBgIyR7Y29sb3J9YFxyXG5cdH1cclxuXHRcclxuXHR0aGVtZUZvbnQobmFtZSl7XHJcblx0XHRsZXQgW2ZpcnN0LC4uLnNlY29uZF09bmFtZS5zcGxpdCgvKD89W0EtWl0pL2cpXHJcblx0XHRzZWNvbmQ9e0hBbnNpOidsYXRpbicsQXNjaWk6J2xhdGluJyxCaWRpOidjcycsRWFzdEFzaWE6J2VhJ31bc2Vjb25kLmpvaW4oKS50b0xvd2VyQ2FzZSgpXVxyXG5cdFx0bGV0IGZvbnQ9dGhpcy50aGVtZShgYVxcXFw6JHtzZWNvbmR9YCxgYVxcXFw6Zm9udFNjaGVtZT5hXFxcXDoke2ZpcnN0fWApLmF0dHIoXCJ0eXBlZmFjZVwiKVxyXG5cdFx0aWYoIWZvbnQgJiYgKHNlY29uZD09J2NzJyB8fCBzZWNvbmQ9PSdlYScpKXtcclxuXHRcdFx0bGV0IGxhbmc9dGhpcy5zZXR0aW5ncyhcIndcXFxcOnRoZW1lRm9udExhbmdcIikuYXR0cihgdzoke3tjczonYmlkaScsZWE6J2Vhc3RBc2lhJ31bc2Vjb25kXX1gKVxyXG5cdFx0XHRmb250PXRoaXMudGhlbWUoYGFcXFxcOmZvbnRbc2NyaXB0PSR7eyd6aC1DTic6J0hhbnMnfVtsYW5nXX1dYCxgYVxcXFw6Zm9udFNjaGVtZT5hXFxcXDoke2ZpcnN0fWApLmF0dHIoXCJ0eXBlZmFjZVwiKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZvbnRcclxuXHR9XHJcblx0XHJcblx0dGhlbWVGb3JtYXQodHlwZSxpZHgpe1xyXG5cdFx0bGV0IGtpbmQ9e2xpbmU6J2xuJyxmaWxsOidiZ0ZpbGxTdHlsZUxzdCcsYmdGaWxsOidiZ0ZpbGxTdHlsZUxzdCcsZWZmZWN0OidlZmZlY3RTdHlsZScsZm9udDonZm9udFNjaGVtZSd9W3R5cGVdXHJcblx0XHRyZXR1cm4gdGhpcy50aGVtZShgYVxcXFw6JHtraW5kfTpudGgtY2hpbGQoJHtwYXJzZUludChpZHgpKzF9KWAsYGFcXFxcOmZtdFNjaGVtZWApXHJcblx0fVxyXG5cdFxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0YWRkSW1hZ2UoZGF0YSl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0vJHt0YXJnZXROYW1lfWBcclxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxyXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBUeXBlPVwiJHt0eXBlfVwiIElkPVwiJHtpZH1cIiBUYXJnZXQ9XCIke3BhcnROYW1lfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkRXh0ZXJuYWxJbWFnZSh1cmwpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cclxuXHRcdGxldCBpZD1gcklkJHtNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKGlkZW50aXRpZXNbdGFnXSlcclxuXHRcdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0fSxcclxuXHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7IFxyXG5cdFx0cmV0dXJuIHt0eXBlOlwic2VjdGlvblwiLCBjaGlsZHJlbjp3WG1sLmNvbnRlbnR9XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1Qcj53XFxcXDpudW1JZFwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxvZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKSlcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcHJvcHNcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0aWYodHlwZSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHRcdGVsc2V7Ly9jb250YWluZXJcclxuXHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJpbmxpbmVcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cclxuXHR9LFxyXG5cdHRibCh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXHJcblx0fSxcclxuXHR0cih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHRyUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipyXCJ9XHJcblx0fSxcclxuXHRwUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipwXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm51bWJlcmluZ1wiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PVwidzpsdmxcIil9XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sbnVtYmVyaW5nOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdG9iamVjdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGNoaWxkcmVuOltdfVxyXG5cdH1cclxufVxyXG4iXX0=