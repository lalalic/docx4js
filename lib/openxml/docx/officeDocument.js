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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsInRhcmdldCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwicmVuZGVyTm9kZSIsImNvbnRlbnQiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJhcmd1bWVudHMiLCJlbWl0IiwiZG9jdW1lbnQiLCJzdHlsZXMiLCJudW1iZXJpbmciLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsInN1YnN0cmluZyIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsImZvbGRlciIsInJhdyIsImZpbGUiLCJwYXJ0cyIsImFwcGVuZCIsInVybCIsIndYbWwiLCJ0YWciLCJuYW1lIiwiaWRlbnRpdGllcyIsImN1cnJlbnQiLCJjaGlsZHJlbiIsInNlY3QiLCJlbmQiLCJjbG9zZXN0IiwicHJldlVudGlsIiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsInAiLCJpZGVudGl0eSIsInByIiwiZmluZCIsImZpbHRlciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwiciIsImZsZENoYXIiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImFzc2lnbiIsImdldFJlbCIsInNkdCIsImVsQmluZGluZyIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImh5cGVybGluayIsInRibCIsInJlZHVjZSIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwidGMiLCJkb2NEZWZhdWx0cyIsInN0eWxlIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7Ozs7Ozs7OzswQkFDTDtBQUFBOztBQUNOO0FBQ0EsUUFBS0MsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixFQUFUO0FBQ0EsUUFBR0gsUUFBTSxXQUFULEVBQ0M7QUFDRCxRQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLFdBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxRQUQrQixpQkFDMUI7QUFDSixhQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixLQUFoQztBQUtBLElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QmhCLGVBQWVnQixRQUFTOztBQUN0RCxVQUFPLEtBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsT0FBTCxDQUFhLGNBQWIsRUFBNkJMLEdBQTdCLENBQWlDLENBQWpDLENBQWhCLEVBQW9ERSxhQUFwRCxFQUFtRUMsUUFBbkUsQ0FBUDtBQUNBOzs7d0JBRUtHLFUsRUFBNEM7QUFBQSxPQUFqQ0gsUUFBaUMsdUVBQXhCSSxlQUFlSixRQUFTOztBQUNqRCxPQUFNSyxNQUFJLEVBQVY7QUFDQSxPQUFNTixnQkFBY0ksV0FBV0osYUFBWCxDQUF5Qk8sSUFBekIsQ0FBOEJILFVBQTlCLENBQXBCO0FBQ0EsWUFB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SUFBUDtBQUNBLEVBNUplO0FBNkpoQkMsT0E3SmdCLGtCQTZKVHZELElBN0pTLEVBNkpKO0FBQ1gsU0FBTyxFQUFDN0MsTUFBSyxRQUFOLEVBQWVrRCxVQUFTLEVBQXhCLEVBQVA7QUFDQTtBQS9KZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGlmKHR5cGU9PVwiY3VzdG9tWG1sXCIpXHJcblx0XHRcdFx0cmV0dXJuXHJcblx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PU9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcclxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0PVwiJHtwYXJ0TmFtZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXHJcblxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0bGV0IGNoaWxkcmVuPSQoXCJ3XFxcXDpzZWN0UHJcIikuZWFjaCgoaSxzZWN0KT0+e1xyXG5cdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRpZighZW5kLmlzKHNlY3QpKVxyXG5cdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHR9KS50b0FycmF5KClcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdH0sXHJcblx0c2VjdFByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpeyBcclxuXHRcdHJldHVybiB7dHlwZTpcInNlY3Rpb25cIiwgY2hpbGRyZW46d1htbC5jb250ZW50fVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByPndcXFxcOm51bUlkYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aXR5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5hdHRyKCd1cmknKS5zcGxpdCgnLycpLnBvcCgpXHJcblx0XHRsZXQgcHJvcHM9e3R5cGU6YGlubGluZS4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJwaWN0dXJlXCI6XHJcblx0XHRcdGxldCByaWQ9JC5maW5kKCdhXFxcXDpibGlwJykuYXR0cigncjplbWJlZCcpXHJcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCkpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByb3BzXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0XHRlbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImJsb2NrXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaW5saW5lXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0fSxcclxuXHR0Ymwod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0YmxQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInc6dGJsR3JpZFwiOlxyXG5cdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdH0sXHJcblx0dHIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0clByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0dGMod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0Y1ByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0ZG9jRGVmYXVsdHMod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdH0sXHJcblx0c3R5bGUod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdH0sXHJcblx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1iZXJpbmdcIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl0sY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1cInc6bHZsXCIpfVxyXG5cdH0sXHJcblx0bnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDp3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLG51bWJlcmluZzp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0fSxcclxuXHRsYXRlbnRTdHlsZXMoKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRvYmplY3Qod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixjaGlsZHJlbjpbXX1cclxuXHR9XHJcbn1cclxuIl19