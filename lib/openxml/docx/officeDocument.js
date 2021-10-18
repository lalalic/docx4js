"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _officeDocument = require("../officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _drawml = require("../drawml");

var _drawml2 = _interopRequireDefault(_drawml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "_init",
		value: function _init() {
			_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).call(this);
			this._assignRel("styles,numbering,settings".split(","));

			var $ = this.styles;
			this.styles.prototype.basest = function (selector) {
				var current = this;
				while (current.length > 0) {
					if (current.is(selector)) {
						return $(current);
					}
					current = $.root().find("w\\:style[w\\:styleId=\"" + current.children("w\\:basedOn").attr("w:val") + "\"]");
				}
				return this.not(this);
			};
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

			var styles = void 0,
			    numbering = void 0;
			if (this.styles) styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, identify);
			if (this.numbering) numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, identify);
			return this.renderNode(this.content("w\\:document").get(0), createElement, identify, { styles: styles, numbering: numbering });
		}
	}, {
		key: "parse",
		value: function parse(domHandler) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

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
	}]);

	return _class;
}(_officeDocument2.default);

_class.identities = {
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

			var numPr = pPr.children("w\\:numPr");
			if (!numPr.length && styleId) {
				numPr = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"]").basest(":has(w\\:numPr)").find("w\\:numPr");
			}

			if (numPr.length) {
				identity.type = "list";
				identity.numId = numPr.find("w\\:numId").attr("w:val");
				identity.level = parseInt(numPr.find("w\\:ilvl").attr("w:val") || 0);
			}

			if (styleId && styleId.startsWith("Heading")) {
				var outlineLvl = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"]").basest(":has(w\\:outlineLvl)").find("w\\:outlineLvl").attr("w:val");
				if (outlineLvl) {
					identity.type = "heading";
					identity.outline = parseInt(outlineLvl) + 1;
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
		var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
			__filter: "wp\\:extent,wp\\:effectExtent"
		}));
		return _extends({
			type: "drawing.inline"
		}, props, {
			children: $.find('a\\:graphic>a\\:graphicData').children().toArray()
		});
	},
	anchor: function anchor(wXml, officeDocument) {
		var $ = officeDocument.content(wXml);
		var graphicData = $.find('>a\\:graphic>a\\:graphicData');
		var type = graphicData.attr("uri").split("/").pop();
		var children = graphicData.children().toArray();
		if (type == "wordprocessingGroup") children = children[0].children.filter(function (a) {
			return a.name.split(":")[0] != "wpg";
		});

		return { type: "drawing.anchor", children: children };
	},
	pic: function pic(wXml, officeDocument) {
		var $ = officeDocument.$(wXml);
		var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
			tidy: function tidy(_ref5) {
				var spPr = _ref5.spPr,
				    _ref5$nvPicPr = _ref5.nvPicPr,
				    _ref5$nvPicPr$cNvPr = _ref5$nvPicPr.cNvPr,
				    cNvPr = _ref5$nvPicPr$cNvPr === undefined ? {} : _ref5$nvPicPr$cNvPr,
				    _ref5$nvPicPr$cNvSpPr = _ref5$nvPicPr.cNvSpPr,
				    cNvSpPr = _ref5$nvPicPr$cNvSpPr === undefined ? {} : _ref5$nvPicPr$cNvSpPr,
				    _ref5$nvPicPr$nvPr = _ref5$nvPicPr.nvPr,
				    nvPr = _ref5$nvPicPr$nvPr === undefined ? {} : _ref5$nvPicPr$nvPr,
				    _ref5$style = _ref5.style;
				_ref5$style = _ref5$style === undefined ? {} : _ref5$style;

				var _ref5$style$lnRef = _ref5$style.lnRef,
				    lnRef = _ref5$style$lnRef === undefined ? {} : _ref5$style$lnRef,
				    _ref5$style$fillRef = _ref5$style.fillRef,
				    fillRef = _ref5$style$fillRef === undefined ? {} : _ref5$style$fillRef,
				    _ref5$style$effectRef = _ref5$style.effectRef,
				    effectRef = _ref5$style$effectRef === undefined ? {} : _ref5$style$effectRef,
				    others = _objectWithoutProperties(_ref5, ["spPr", "nvPicPr", "style"]);

				return _extends({}, lnRef, fillRef, effectRef, spPr, cNvPr, cNvSpPr, nvPr, others);
			}
		}));
		return _extends({}, props, { type: "picture" });
	},
	wsp: function wsp(wXml, officeDocument) {
		var content = "wps\\:txbx";
		var $ = officeDocument.$(wXml);
		var children = $.children(content).toArray();
		var same = function same(keys, fx) {
			return keys.reduce(function (fs, k) {
				return fs[k] = fx, fs;
			}, {});
		};

		var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), same("r,t,l,b".split(",").map(function (a) {
			return a + "Ins";
		}), function (v) {
			return officeDocument.doc.emu2Px(v);
		}), {
			__filter: ":not(" + content + ")",
			tidy: function tidy(_ref6) {
				var _ref6$cNvSpPr = _ref6.cNvSpPr,
				    cNvSpPr = _ref6$cNvSpPr === undefined ? {} : _ref6$cNvSpPr,
				    _ref6$spPr = _ref6.spPr,
				    spPr = _ref6$spPr === undefined ? {} : _ref6$spPr,
				    _ref6$style = _ref6.style;
				_ref6$style = _ref6$style === undefined ? {} : _ref6$style;

				var _ref6$style$lnRef = _ref6$style.lnRef,
				    lnRef = _ref6$style$lnRef === undefined ? {} : _ref6$style$lnRef,
				    _ref6$style$fillRef = _ref6$style.fillRef,
				    fillRef = _ref6$style$fillRef === undefined ? {} : _ref6$style$fillRef,
				    _ref6$style$effectRef = _ref6$style.effectRef,
				    effectRef = _ref6$style$effectRef === undefined ? {} : _ref6$style$effectRef,
				    _ref6$style$fontRef = _ref6$style.fontRef,
				    fontRef = _ref6$style$fontRef === undefined ? {} : _ref6$style$fontRef,
				    others = _objectWithoutProperties(_ref6, ["cNvSpPr", "spPr", "style"]);

				return _extends({}, cNvSpPr, lnRef, fillRef, effectRef, spPr, { textStyle: fontRef }, others);
			}
		}));
		return _extends({}, props, { type: "shape", children: children });
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
			var type = "text,picture,docPartList,docPartObj,comboBox,dropDownList,date,checkbox,repeatingSection,repeatingSectionItem".split(",").find(function (a) {
				return a == _name;
			});
			var model = { children: children };
			if (type) {
				model.type = "control." + type;
			} else {
				//container
				if (content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length) {
					model.type = "block";
				} else {
					model.type = "inline";
				}
			}

			$ = officeDocument.content;
			switch (model.type) {
				case "control.dropDownList":
				case "control.comboBox":
					{
						var selected = $(content).text();
						model.options = $(elType).find("w\\:listItem").map(function (i, li) {
							return {
								displayText: li.attribs["w:displayText"],
								value: li.attribs["w:value"]
							};
						}).get();
						model.value = (model.options.find(function (a) {
							return a.displayText == selected;
						}) || {}).value;
						break;
					}
				case "control.checkbox":
					{
						var ns = elType.name.split(":")[0];
						model.checked = $(elType).find(ns + "\\:checked").attr(ns + ":val") == "1";
						break;
					}
				case "control.text":
					if (content.find('w\\:r [w\\:val~=Placeholder]').length == 0) model.value = content.text();
					break;
				case "control.date":
					model.value = new Date($(elType).attr("w:fullDate"));
					model.format = $(elType).find("w\\:dateFormat").attr("w:val");
					model.locale = $(elType).find("w\\:lid").attr("w:val");
					break;
			}
			return model;
		}
	},
	hyperlink: function hyperlink(wXml, officeDocument) {
		if (wXml.attribs["r:id"]) {
			var url = officeDocument.getRel(wXml.attribs["r:id"]);
			return { type: "hyperlink", url: url };
		} else if (wXml.attribs["w:anchor"]) {
			return { type: "hyperlink", url: "#" + wXml.attribs["w:anchor"] };
		}
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
	object: function object(wXml, officeDocument) {
		var ole = officeDocument.content(wXml).find("o\\:OLEObject");
		var type = ole.attr("ProgID");
		var embed = ole.attr("Type") === "Embed";
		var rId = ole.attr("r:id");
		return { type: "object", embed: embed, prog: type, data: officeDocument.getRelOleObject(rId) };
	}
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiX2Fzc2lnblJlbCIsInNwbGl0IiwiJCIsInN0eWxlcyIsInByb3RvdHlwZSIsImJhc2VzdCIsInNlbGVjdG9yIiwiY3VycmVudCIsImxlbmd0aCIsImlzIiwicm9vdCIsImZpbmQiLCJjaGlsZHJlbiIsImF0dHIiLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJ0eXBlIiwiZG9jdW1lbnQiLCJCYXNlIiwiaWRlbnRpdGllcyIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsImVhY2giLCJpIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsInB1c2giLCJzZWN0UHIiLCJoZiIsImZpbHRlciIsImEiLCJuYW1lIiwicmVkdWNlIiwiaGVhZGVycyIsInNldCIsImF0dHJpYnMiLCJnZXRSZWwiLCJNYXAiLCJmb290ZXJzIiwiaGFzVGl0bGVQYWdlIiwicCIsImlkZW50aXR5IiwicHIiLCJwUHIiLCJzdHlsZUlkIiwibnVtUHIiLCJudW1JZCIsImxldmVsIiwicGFyc2VJbnQiLCJzdGFydHNXaXRoIiwib3V0bGluZUx2bCIsIm91dGxpbmUiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsInByb3BzIiwiX19maWx0ZXIiLCJhbmNob3IiLCJncmFwaGljRGF0YSIsInBvcCIsInBpYyIsInRpZHkiLCJzcFByIiwibnZQaWNQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJzdHlsZSIsImxuUmVmIiwiZmlsbFJlZiIsImVmZmVjdFJlZiIsIm90aGVycyIsIndzcCIsInNhbWUiLCJrZXlzIiwiZngiLCJmcyIsImsiLCJtYXAiLCJlbXUyUHgiLCJ2IiwiZm9udFJlZiIsInRleHRTdHlsZSIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwic2VsZWN0ZWQiLCJvcHRpb25zIiwibGkiLCJkaXNwbGF5VGV4dCIsIm5zIiwiY2hlY2tlZCIsIkRhdGUiLCJmb3JtYXQiLCJsb2NhbGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyZWxzIiwiY29udGVudFR5cGUiLCJjb250ZW50VHlwZXMiLCJkb2NEZWZhdWx0cyIsImlkIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiLCJvbGUiLCJlbWJlZCIsInByb2ciLCJnZXRSZWxPbGVPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUNOO0FBQ0EsUUFBS0EsVUFBTCxDQUFnQiw0QkFBNEJDLEtBQTVCLENBQWtDLEdBQWxDLENBQWhCOztBQUVBLE9BQUlDLElBQUUsS0FBS0MsTUFBWDtBQUNBLFFBQUtBLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsR0FBNkIsVUFBU0MsUUFBVCxFQUFrQjtBQUM5QyxRQUFJQyxVQUFRLElBQVo7QUFDQSxXQUFNQSxRQUFRQyxNQUFSLEdBQWUsQ0FBckIsRUFBdUI7QUFDdEIsU0FBR0QsUUFBUUUsRUFBUixDQUFXSCxRQUFYLENBQUgsRUFBd0I7QUFDdkIsYUFBT0osRUFBRUssT0FBRixDQUFQO0FBQ0E7QUFDREEsZUFBUUwsRUFBRVEsSUFBRixHQUFTQyxJQUFULDhCQUF3Q0osUUFBUUssUUFBUixDQUFpQixhQUFqQixFQUFnQ0MsSUFBaEMsQ0FB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dkIsRUFBUDtBQUNBLEVBNVBnQjtBQTZQakJzRixJQTdQaUIsZUE2UGJ6RyxJQTdQYSxFQTZQUjtBQUNSLFNBQU8sRUFBQ0osTUFBSyxLQUFOLEVBQVkyRyxJQUFHdkcsS0FBS21CLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUNxRixhQUFZeEcsS0FBS3JCLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQjtBQUFBLFdBQUdvQyxFQUFFQyxJQUFGLElBQVEsaUJBQVg7QUFBQSxJQUFuQixFQUFpREksT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBL1BnQjtBQWdRakJ1RixhQWhRaUIsMEJBZ1FIO0FBQ2IsU0FBTyxJQUFQO0FBQ0EsRUFsUWdCO0FBbVFqQkMsT0FuUWlCLGtCQW1RVjNHLElBblFVLEVBbVFMQyxjQW5RSyxFQW1RVTtBQUMxQixNQUFJMkcsTUFBSTNHLGVBQWVaLE9BQWYsQ0FBdUJXLElBQXZCLEVBQTZCdEIsSUFBN0IsQ0FBa0MsZUFBbEMsQ0FBUjtBQUNBLE1BQUlrQixPQUFLZ0gsSUFBSWhJLElBQUosQ0FBUyxRQUFULENBQVQ7QUFDQSxNQUFJaUksUUFBTUQsSUFBSWhJLElBQUosQ0FBUyxNQUFULE1BQW1CLE9BQTdCO0FBQ0EsTUFBSW1ILE1BQUlhLElBQUloSSxJQUFKLENBQVMsTUFBVCxDQUFSO0FBQ0EsU0FBTyxFQUFDZ0IsTUFBSyxRQUFOLEVBQWVpSCxZQUFmLEVBQXNCQyxNQUFNbEgsSUFBNUIsRUFBa0NvRyxNQUFLL0YsZUFBZThHLGVBQWYsQ0FBK0JoQixHQUEvQixDQUF2QyxFQUFQO0FBQ0E7QUF6UWdCLEMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxyXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuLi9kcmF3bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHR0aGlzLl9hc3NpZ25SZWwoXCJzdHlsZXMsbnVtYmVyaW5nLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpKVxyXG5cclxuXHRcdHZhciAkPXRoaXMuc3R5bGVzXHJcblx0XHR0aGlzLnN0eWxlcy5wcm90b3R5cGUuYmFzZXN0PWZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuXHRcdFx0bGV0IGN1cnJlbnQ9dGhpc1xyXG5cdFx0XHR3aGlsZShjdXJyZW50Lmxlbmd0aD4wKXtcclxuXHRcdFx0XHRpZihjdXJyZW50LmlzKHNlbGVjdG9yKSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gJChjdXJyZW50KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjdXJyZW50PSQucm9vdCgpLmZpbmQoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke2N1cnJlbnQuY2hpbGRyZW4oXCJ3XFxcXDpiYXNlZE9uXCIpLmF0dHIoXCJ3OnZhbFwiKX1cIl1gKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzLm5vdCh0aGlzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PXRoaXMuY29uc3RydWN0b3IuaWRlbnRpZnkuYmluZCh0aGlzLmNvbnN0cnVjdG9yKSl7XHJcblx0XHRsZXQgc3R5bGVzLCBudW1iZXJpbmdcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRzdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdG51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LCBpZGVudGlmeSwge3N0eWxlcyxudW1iZXJpbmd9KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYobW9kZWwgJiYgdHlwZW9mKG1vZGVsKT09XCJvYmplY3RcIil7XHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGlmKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gZG9jXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpdGllcz17XHJcblx0XHRkb2N1bWVudCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRcdGxldCBjaGlsZHJlbj0kKFwid1xcXFw6c2VjdFByXCIpLmVhY2goKGksc2VjdCk9PntcclxuXHRcdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdFx0aWYoIWVuZC5pcyhzZWN0KSlcclxuXHRcdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdFx0fSkudG9BcnJheSgpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHRcdHNlY3RQcih3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0Y29uc3QgaGY9dHlwZT0+d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1gdzoke3R5cGV9UmVmZXJlbmNlYCkucmVkdWNlKChoZWFkZXJzLGEpPT57XHJcblx0XHRcdFx0XHRoZWFkZXJzLnNldChhLmF0dHJpYnNbXCJ3OnR5cGVcIl0sb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGEuYXR0cmlic1tcInI6aWRcIl0pKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGhlYWRlcnNcclxuXHRcdFx0XHR9LG5ldyBNYXAoKSlcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpcInNlY3Rpb25cIixcclxuXHRcdFx0XHRjaGlsZHJlbjp3WG1sLmNvbnRlbnQsXHJcblx0XHRcdFx0aGVhZGVyczpoZihcImhlYWRlclwiKSxcclxuXHRcdFx0XHRmb290ZXJzOmhmKFwiZm9vdGVyXCIpLFxyXG5cdFx0XHRcdGhhc1RpdGxlUGFnZTogISF3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGl0bGVQZ1wiKVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRsZXQgbnVtUHI9cFByLmNoaWxkcmVuKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnRcclxuXHRcdFx0XHRcdFx0LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl1gKVxyXG5cdFx0XHRcdFx0XHQuYmFzZXN0KGA6aGFzKHdcXFxcOm51bVByKWApXHJcblx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChudW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIil8fDApXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzdHlsZUlkICYmIHN0eWxlSWQuc3RhcnRzV2l0aChcIkhlYWRpbmdcIikpe1xyXG5cdFx0XHRcdFx0bGV0IG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnRcclxuXHRcdFx0XHRcdFx0LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl1gKVxyXG5cdFx0XHRcdFx0XHQuYmFzZXN0KFwiOmhhcyh3XFxcXDpvdXRsaW5lTHZsKVwiKVxyXG5cdFx0XHRcdFx0XHQuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIilcclxuXHRcdFx0XHRcdFx0LmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdFx0aWRlbnRpdHkub3V0bGluZT1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHRcdH0sXHJcblx0XHRyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHRcdH0sXHJcblx0XHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdFx0fSxcclxuXHJcblx0XHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0Y29uc3QgcHJvcHM9JC5wcm9wcyh7XHJcblx0XHRcdFx0Li4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcclxuXHRcdFx0XHRfX2ZpbHRlcjpcIndwXFxcXDpleHRlbnQsd3BcXFxcOmVmZmVjdEV4dGVudFwiLFxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHR5cGU6YGRyYXdpbmcuaW5saW5lYCwgXHJcblx0XHRcdFx0Li4ucHJvcHMsXHJcblx0XHRcdFx0Y2hpbGRyZW46JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0bGV0IGdyYXBoaWNEYXRhPSQuZmluZCgnPmFcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKVxyXG5cdFx0XHRsZXQgdHlwZT1ncmFwaGljRGF0YS5hdHRyKFwidXJpXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdFx0aWYodHlwZT09XCJ3b3JkcHJvY2Vzc2luZ0dyb3VwXCIpXHJcblx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW5bMF0uY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZS5zcGxpdChcIjpcIilbMF0hPVwid3BnXCIpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHJcblx0XHRwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcclxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XHJcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxyXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52UGljUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIHN0eWxlOntsblJlZj17fSxmaWxsUmVmPXt9LGVmZmVjdFJlZj17fX09e30sLi4ub3RoZXJzfSk9Pih7Li4ubG5SZWYsLi4uZmlsbFJlZiwgLi4uZWZmZWN0UmVmLC4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHR5cGU6XCJwaWN0dXJlXCJ9XHJcbiAgICAgICAgfSxcclxuXHJcblx0XHR3c3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRjb25zdCBjb250ZW50PVwid3BzXFxcXDp0eGJ4XCJcclxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXHJcblx0XHRcdGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXHJcblx0XHRcdGNvbnN0IHNhbWU9KGtleXMsZngpPT5rZXlzLnJlZHVjZSgoZnMsIGspPT4oZnNba109ZngsIGZzKSx7fSlcclxuXHJcblx0XHRcdGNvbnN0IHByb3BzPSQucHJvcHMoe1xyXG5cdFx0XHRcdC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXHJcblx0XHRcdFx0Li4uc2FtZShcInIsdCxsLGJcIi5zcGxpdChcIixcIikubWFwKGE9PmAke2F9SW5zYCksIHY9Pm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodikpLFxyXG5cdFx0XHRcdF9fZmlsdGVyOmA6bm90KCR7Y29udGVudH0pYCxcclxuXHRcdFx0XHR0aWR5Oih7Y052U3BQcj17fSwgc3BQcj17fSwgc3R5bGU6e2xuUmVmPXt9LGZpbGxSZWY9e30sZWZmZWN0UmVmPXt9LGZvbnRSZWY9e319PXt9LC4uLm90aGVyc30pPT4oey4uLmNOdlNwUHIsIC4uLmxuUmVmLC4uLmZpbGxSZWYsIC4uLmVmZmVjdFJlZiwgLi4uc3BQciwgdGV4dFN0eWxlOiBmb250UmVmLCAuLi5vdGhlcnN9KVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gey4uLnByb3BzLCB0eXBlOlwic2hhcGVcIiwgY2hpbGRyZW59XHJcblx0XHR9LFxyXG5cdFx0RmFsbGJhY2soKXtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH0sXHJcblx0XHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcclxuXHRcdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXHJcblx0XHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcclxuXHRcdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cclxuXHRcdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGRvY1BhcnRPYmosY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3gscmVwZWF0aW5nU2VjdGlvbixyZXBlYXRpbmdTZWN0aW9uSXRlbVwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0XHRsZXQgbW9kZWw9e2NoaWxkcmVufVxyXG5cdFx0XHRcdGlmKHR5cGUpe1xyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gY29udHJvbC4ke3R5cGV9YFxyXG5cdFx0XHRcdH1lbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPVwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9XCJpbmxpbmVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRcdFx0c3dpdGNoKG1vZGVsLnR5cGUpe1xyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuZHJvcERvd25MaXN0XCI6XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5jb21ib0JveFwiOntcclxuXHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkPSQoY29udGVudCkudGV4dCgpXHJcblx0XHRcdFx0XHRcdG1vZGVsLm9wdGlvbnM9JChlbFR5cGUpXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpsaXN0SXRlbVwiKVxyXG5cdFx0XHRcdFx0XHRcdC5tYXAoKGksbGkpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5VGV4dDogbGkuYXR0cmlic1tcInc6ZGlzcGxheVRleHRcIl0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBsaS5hdHRyaWJzW1widzp2YWx1ZVwiXVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPShtb2RlbC5vcHRpb25zLmZpbmQoYT0+YS5kaXNwbGF5VGV4dD09c2VsZWN0ZWQpfHx7fSkudmFsdWVcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmNoZWNrYm94XCI6e1xyXG5cdFx0XHRcdFx0XHRsZXQgbnM9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpWzBdXHJcblx0XHRcdFx0XHRcdG1vZGVsLmNoZWNrZWQ9JChlbFR5cGUpLmZpbmQoYCR7bnN9XFxcXDpjaGVja2VkYCkuYXR0cihgJHtuc306dmFsYCk9PVwiMVwiXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0XCI6XHJcblx0XHRcdFx0XHRcdGlmKGNvbnRlbnQuZmluZCgnd1xcXFw6ciBbd1xcXFw6dmFsfj1QbGFjZWhvbGRlcl0nKS5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudmFsdWU9Y29udGVudC50ZXh0KClcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmRhdGVcIjpcclxuXHRcdFx0XHRcdFx0bW9kZWwudmFsdWU9bmV3IERhdGUoJChlbFR5cGUpLmF0dHIoXCJ3OmZ1bGxEYXRlXCIpKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5mb3JtYXQ9JChlbFR5cGUpLmZpbmQoXCJ3XFxcXDpkYXRlRm9ybWF0XCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5sb2NhbGU9JChlbFR5cGUpLmZpbmQoXCJ3XFxcXDpsaWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRpZih3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKXtcclxuXHRcdFx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0XHRcdH1lbHNlIGlmKHdYbWwuYXR0cmlic1tcInc6YW5jaG9yXCJdKXtcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsOmAjJHt3WG1sLmF0dHJpYnNbXCJ3OmFuY2hvclwiXX1gfVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0dGJsKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdFx0fSxcclxuXHRcdHRyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0XHR9LFxyXG5cdFx0dGMod1htbCl7XHJcblx0XHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0XHRjYXNlIFwidzp0Y1ByXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0fSx7dHlwZTpcInRjXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0XHR9LFxyXG5cdFx0YWx0Q2h1bmsod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgcklkPXdYbWwuYXR0cmlic1sncjppZCddXHJcblx0XHRcdGxldCBkYXRhPW9mZmljZURvY3VtZW50LmdldFJlbChySWQpXHJcblxyXG5cdFx0XHRsZXQgcGFydE5hbWU9b2ZmaWNlRG9jdW1lbnQuZm9sZGVyK29mZmljZURvY3VtZW50LnJlbHMoYFtJZD0ke3JJZH1dYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRsZXQgY29udGVudFR5cGU9b2ZmaWNlRG9jdW1lbnQuZG9jLmNvbnRlbnRUeXBlcyhgT3ZlcnJpZGVbUGFydE5hbWU9JyR7cGFydE5hbWV9J11gKS5hdHRyKFwiQ29udGVudFR5cGVcIilcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiY2h1bmtcIiwgZGF0YSwgY29udGVudFR5cGV9XHJcblx0XHR9LFxyXG5cdFx0ZG9jRGVmYXVsdHMod1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0XHR9LFxyXG5cdFx0c3R5bGUod1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0XHR9LFxyXG5cdFx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdFx0fSxcclxuXHRcdG51bSh3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0XHR9LFxyXG5cdFx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9LFxyXG5cdFx0b2JqZWN0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgb2xlPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcIm9cXFxcOk9MRU9iamVjdFwiKVxyXG5cdFx0XHRsZXQgdHlwZT1vbGUuYXR0cihcIlByb2dJRFwiKVxyXG5cdFx0XHRsZXQgZW1iZWQ9b2xlLmF0dHIoXCJUeXBlXCIpPT09XCJFbWJlZFwiXHJcblx0XHRcdGxldCBySWQ9b2xlLmF0dHIoXCJyOmlkXCIpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGVtYmVkLCBwcm9nOiB0eXBlLCBkYXRhOm9mZmljZURvY3VtZW50LmdldFJlbE9sZU9iamVjdChySWQpfVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=