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
		return { type: "drawing.inline", children: $.find('a\\:graphic>a\\:graphicData').children().toArray() };
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
		var children = $.children(content).children("w\\:txbxContent").children().toArray();
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
			filter: ":not(" + content + ")",
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
			var _ret = function () {
				//controls
				var prChildren = pr.get(0).children;
				var elType = prChildren[prChildren.length - 1];
				var name = elType.name.split(":").pop();
				var type = "text,picture,docPartList,docPartObj,comboBox,dropDownList,date,checkbox,repeatingSection,repeatingSectionItem".split(",").find(function (a) {
					return a == name;
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
							var _ret2 = function () {
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
								return "break";
							}();

							if (_ret2 === "break") break;
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
				return {
					v: model
				};
			}();

			if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiX2Fzc2lnblJlbCIsInNwbGl0IiwiJCIsInN0eWxlcyIsInByb3RvdHlwZSIsImJhc2VzdCIsInNlbGVjdG9yIiwiY3VycmVudCIsImxlbmd0aCIsImlzIiwicm9vdCIsImZpbmQiLCJjaGlsZHJlbiIsImF0dHIiLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJ0eXBlIiwiZG9jdW1lbnQiLCJpZGVudGl0aWVzIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiZWFjaCIsImkiLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInRvQXJyYXkiLCJyZXZlcnNlIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJoZWFkZXJzIiwic2V0IiwiYXR0cmlicyIsImdldFJlbCIsIk1hcCIsImZvb3RlcnMiLCJoYXNUaXRsZVBhZ2UiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJwYXJzZUludCIsInN0YXJ0c1dpdGgiLCJvdXRsaW5lTHZsIiwib3V0bGluZSIsInIiLCJmbGRDaGFyIiwiaW5saW5lIiwiYW5jaG9yIiwiZ3JhcGhpY0RhdGEiLCJwb3AiLCJwaWMiLCJwcm9wcyIsInRpZHkiLCJzcFByIiwibnZQaWNQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJzdHlsZSIsImxuUmVmIiwiZmlsbFJlZiIsImVmZmVjdFJlZiIsIm90aGVycyIsIndzcCIsInNhbWUiLCJrZXlzIiwiZngiLCJmcyIsImsiLCJtYXAiLCJlbXUyUHgiLCJ2IiwiZm9udFJlZiIsInRleHRTdHlsZSIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwic2VsZWN0ZWQiLCJvcHRpb25zIiwibGkiLCJkaXNwbGF5VGV4dCIsIm5zIiwiY2hlY2tlZCIsIkRhdGUiLCJmb3JtYXQiLCJsb2NhbGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyZWxzIiwiY29udGVudFR5cGUiLCJjb250ZW50VHlwZXMiLCJkb2NEZWZhdWx0cyIsImlkIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiLCJvbGUiLCJlbWJlZCIsInByb2ciLCJnZXRSZWxPbGVPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUNOO0FBQ0EsUUFBS0EsVUFBTCxDQUFnQiw0QkFBNEJDLEtBQTVCLENBQWtDLEdBQWxDLENBQWhCOztBQUVBLE9BQUlDLElBQUUsS0FBS0MsTUFBWDtBQUNBLFFBQUtBLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsR0FBNkIsVUFBU0MsUUFBVCxFQUFrQjtBQUM5QyxRQUFJQyxVQUFRLElBQVo7QUFDQSxXQUFNQSxRQUFRQyxNQUFSLEdBQWUsQ0FBckIsRUFBdUI7QUFDdEIsU0FBR0QsUUFBUUUsRUFBUixDQUFXSCxRQUFYLENBQUgsRUFBd0I7QUFDdkIsYUFBT0osRUFBRUssT0FBRixDQUFQO0FBQ0E7QUFDREEsZUFBUUwsRUFBRVEsSUFBRixHQUFTQyxJQUFULDhCQUF3Q0osUUFBUUssUUFBUixDQUFpQixhQUFqQixFQUFnQ0MsSUFBaEMsQ0FBcUMsT0FBckMsQ0FBeEMsU0FB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cVBqQnFGLElBclBpQixlQXFQYnhHLElBclBhLEVBcVBSO0FBQ1IsU0FBTyxFQUFDSCxNQUFLLEtBQU4sRUFBWXlHLElBQUd0RyxLQUFLbUIsT0FBTCxDQUFhLFNBQWIsQ0FBZixFQUF1Q29GLGFBQVl2RyxLQUFLcEIsUUFBTCxDQUFjRCxJQUFkLENBQW1CO0FBQUEsV0FBR21DLEVBQUVDLElBQUYsSUFBUSxpQkFBWDtBQUFBLElBQW5CLEVBQWlESSxPQUFqRCxDQUF5RCxPQUF6RCxDQUFuRCxFQUFQO0FBQ0EsRUF2UGdCO0FBd1BqQnNGLGFBeFBpQiwwQkF3UEg7QUFDYixTQUFPLElBQVA7QUFDQSxFQTFQZ0I7QUEyUGpCQyxPQTNQaUIsa0JBMlBWMUcsSUEzUFUsRUEyUExDLGNBM1BLLEVBMlBVO0FBQzFCLE1BQUkwRyxNQUFJMUcsZUFBZVgsT0FBZixDQUF1QlUsSUFBdkIsRUFBNkJyQixJQUE3QixDQUFrQyxlQUFsQyxDQUFSO0FBQ0EsTUFBSWtCLE9BQUs4RyxJQUFJOUgsSUFBSixDQUFTLFFBQVQsQ0FBVDtBQUNBLE1BQUkrSCxRQUFNRCxJQUFJOUgsSUFBSixDQUFTLE1BQVQsTUFBbUIsT0FBN0I7QUFDQSxNQUFJaUgsTUFBSWEsSUFBSTlILElBQUosQ0FBUyxNQUFULENBQVI7QUFDQSxTQUFPLEVBQUNnQixNQUFLLFFBQU4sRUFBZStHLFlBQWYsRUFBc0JDLE1BQU1oSCxJQUE1QixFQUFrQ2tHLE1BQUs5RixlQUFlNkcsZUFBZixDQUErQmhCLEdBQS9CLENBQXZDLEVBQVA7QUFDQTtBQWpRZ0IsQyIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9vZmZpY2VEb2N1bWVudFwiXHJcbmltcG9ydCBkcmF3bWwgZnJvbSBcIi4uL2RyYXdtbFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMuX2Fzc2lnblJlbChcInN0eWxlcyxudW1iZXJpbmcsc2V0dGluZ3NcIi5zcGxpdChcIixcIikpXHJcblxyXG5cdFx0dmFyICQ9dGhpcy5zdHlsZXNcclxuXHRcdHRoaXMuc3R5bGVzLnByb3RvdHlwZS5iYXNlc3Q9ZnVuY3Rpb24oc2VsZWN0b3Ipe1xyXG5cdFx0XHRsZXQgY3VycmVudD10aGlzXHJcblx0XHRcdHdoaWxlKGN1cnJlbnQubGVuZ3RoPjApe1xyXG5cdFx0XHRcdGlmKGN1cnJlbnQuaXMoc2VsZWN0b3IpKXtcclxuXHRcdFx0XHRcdHJldHVybiAkKGN1cnJlbnQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGN1cnJlbnQ9JC5yb290KCkuZmluZChgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7Y3VycmVudC5jaGlsZHJlbihcIndcXFxcOmJhc2VkT25cIikuYXR0cihcInc6dmFsXCIpfVwiXWApXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHRoaXMubm90KHRoaXMpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcclxuXHRcdGxldCBzdHlsZXMsIG51bWJlcmluZ1xyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdHN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0bnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5LCB7c3R5bGVzLG51bWJlcmluZ30pXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PXRoaXMuY29uc3RydWN0b3IuaWRlbnRpZnkuYmluZCh0aGlzLmNvbnN0cnVjdG9yKSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdGRvYy5zdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRkb2MubnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBpZGVudGl0aWVzPXtcclxuXHRcdGRvY3VtZW50KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRcdGxldCBjdXJyZW50PW51bGxcclxuXHRcdFx0bGV0IGNoaWxkcmVuPSQoXCJ3XFxcXDpzZWN0UHJcIikuZWFjaCgoaSxzZWN0KT0+e1xyXG5cdFx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRcdHNlY3QuY29udGVudD1lbmQucHJldlVudGlsKGN1cnJlbnQpLnRvQXJyYXkoKS5yZXZlcnNlKClcclxuXHRcdFx0XHRpZighZW5kLmlzKHNlY3QpKVxyXG5cdFx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0XHRjdXJyZW50PWVuZFxyXG5cdFx0XHR9KS50b0FycmF5KClcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0XHR9LFxyXG5cdFx0c2VjdFByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRjb25zdCBoZj10eXBlPT53WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PWB3OiR7dHlwZX1SZWZlcmVuY2VgKS5yZWR1Y2UoKGhlYWRlcnMsYSk9PntcclxuXHRcdFx0XHRcdGhlYWRlcnMuc2V0KGEuYXR0cmlic1tcInc6dHlwZVwiXSxvZmZpY2VEb2N1bWVudC5nZXRSZWwoYS5hdHRyaWJzW1wicjppZFwiXSkpXHJcblx0XHRcdFx0XHRyZXR1cm4gaGVhZGVyc1xyXG5cdFx0XHRcdH0sbmV3IE1hcCgpKVxyXG5cclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOlwic2VjdGlvblwiLFxyXG5cdFx0XHRcdGNoaWxkcmVuOndYbWwuY29udGVudCxcclxuXHRcdFx0XHRoZWFkZXJzOmhmKFwiaGVhZGVyXCIpLFxyXG5cdFx0XHRcdGZvb3RlcnM6aGYoXCJmb290ZXJcIiksXHJcblx0XHRcdFx0aGFzVGl0bGVQYWdlOiAhIXdYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0aXRsZVBnXCIpXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcclxuXHRcdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGxldCBudW1Qcj1wUHIuY2hpbGRyZW4oXCJ3XFxcXDpudW1QclwiKVxyXG5cdFx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XHJcblx0XHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudFxyXG5cdFx0XHRcdFx0XHQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXWApXHJcblx0XHRcdFx0XHRcdC5iYXNlc3QoYDpoYXMod1xcXFw6bnVtUHIpYClcclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpudW1QclwiKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRcdGlkZW50aXR5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKXx8MClcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKHN0eWxlSWQgJiYgc3R5bGVJZC5zdGFydHNXaXRoKFwiSGVhZGluZ1wiKSl7XHJcblx0XHRcdFx0XHRsZXQgb3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudFxyXG5cdFx0XHRcdFx0XHQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXWApXHJcblx0XHRcdFx0XHRcdC5iYXNlc3QoXCI6aGFzKHdcXFxcOm91dGxpbmVMdmwpXCIpXHJcblx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKVxyXG5cdFx0XHRcdFx0XHQuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRpZihvdXRsaW5lTHZsKXtcclxuXHRcdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0XHRpZGVudGl0eS5vdXRsaW5lPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBpZGVudGl0eVxyXG5cdFx0fSxcclxuXHRcdHIod1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdFx0fSxcclxuXHRcdGZsZENoYXIod1htbCl7XHJcblx0XHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0XHR9LFxyXG5cclxuXHRcdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6YGRyYXdpbmcuaW5saW5lYCwgY2hpbGRyZW46JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuY2hpbGRyZW4oKS50b0FycmF5KCl9XHJcblx0XHR9LFxyXG5cdFx0YW5jaG9yKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0XHRsZXQgZ3JhcGhpY0RhdGE9JC5maW5kKCc+YVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpXHJcblx0XHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGxldCBjaGlsZHJlbj1ncmFwaGljRGF0YS5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cdFx0XHRpZih0eXBlPT1cIndvcmRwcm9jZXNzaW5nR3JvdXBcIilcclxuXHRcdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImRyYXdpbmcuYW5jaG9yXCIsY2hpbGRyZW59XHJcblx0XHR9LFxyXG5cclxuXHRcdHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxyXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcclxuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXHJcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZQaWNQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgc3R5bGU6e2xuUmVmPXt9LGZpbGxSZWY9e30sZWZmZWN0UmVmPXt9fT17fSwuLi5vdGhlcnN9KT0+KHsuLi5sblJlZiwuLi5maWxsUmVmLCAuLi5lZmZlY3RSZWYsLi4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsdHlwZTpcInBpY3R1cmVcIn1cclxuICAgICAgICB9LFxyXG5cclxuXHRcdHdzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGNvbnN0IGNvbnRlbnQ9XCJ3cHNcXFxcOnR4YnhcIlxyXG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcclxuXHRcdFx0Y29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS5jaGlsZHJlbihcIndcXFxcOnR4YnhDb250ZW50XCIpLmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblx0XHRcdGNvbnN0IHNhbWU9KGtleXMsZngpPT5rZXlzLnJlZHVjZSgoZnMsIGspPT4oZnNba109ZngsIGZzKSx7fSlcclxuXHJcblx0XHRcdGNvbnN0IHByb3BzPSQucHJvcHMoe1xyXG5cdFx0XHRcdC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXHJcblx0XHRcdFx0Li4uc2FtZShcInIsdCxsLGJcIi5zcGxpdChcIixcIikubWFwKGE9PmAke2F9SW5zYCksIHY9Pm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodikpLFxyXG5cdFx0XHRcdGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9KWAsXHJcblx0XHRcdFx0dGlkeTooe2NOdlNwUHI9e30sIHNwUHI9e30sIHN0eWxlOntsblJlZj17fSxmaWxsUmVmPXt9LGVmZmVjdFJlZj17fSxmb250UmVmPXt9fT17fSwuLi5vdGhlcnN9KT0+KHsuLi5jTnZTcFByLCAuLi5sblJlZiwuLi5maWxsUmVmLCAuLi5lZmZlY3RSZWYsIC4uLnNwUHIsIHRleHRTdHlsZTogZm9udFJlZiwgLi4ub3RoZXJzfSlcclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInNoYXBlXCIsIGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHRcdEZhbGxiYWNrKCl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9LFxyXG5cdFx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxkb2NQYXJ0T2JqLGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94LHJlcGVhdGluZ1NlY3Rpb24scmVwZWF0aW5nU2VjdGlvbkl0ZW1cIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdFx0bGV0IG1vZGVsPXtjaGlsZHJlbn1cclxuXHRcdFx0XHRpZih0eXBlKXtcclxuXHRcdFx0XHRcdG1vZGVsLnR5cGU9YGNvbnRyb2wuJHt0eXBlfWBcclxuXHRcdFx0XHR9ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1cImJsb2NrXCJcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPVwiaW5saW5lXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0XHRcdHN3aXRjaChtb2RlbC50eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmRyb3BEb3duTGlzdFwiOlxyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuY29tYm9Cb3hcIjp7XHJcblx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZD0kKGNvbnRlbnQpLnRleHQoKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5vcHRpb25zPSQoZWxUeXBlKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6bGlzdEl0ZW1cIilcclxuXHRcdFx0XHRcdFx0XHQubWFwKChpLGxpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheVRleHQ6IGxpLmF0dHJpYnNbXCJ3OmRpc3BsYXlUZXh0XCJdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogbGkuYXR0cmlic1tcInc6dmFsdWVcIl1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC52YWx1ZT0obW9kZWwub3B0aW9ucy5maW5kKGE9PmEuZGlzcGxheVRleHQ9PXNlbGVjdGVkKXx8e30pLnZhbHVlXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5jaGVja2JveFwiOntcclxuXHRcdFx0XHRcdFx0bGV0IG5zPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKVswXVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5jaGVja2VkPSQoZWxUeXBlKS5maW5kKGAke25zfVxcXFw6Y2hlY2tlZGApLmF0dHIoYCR7bnN9OnZhbGApPT1cIjFcIlxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdFx0XHRpZihjb250ZW50LmZpbmQoJ3dcXFxcOnIgW3dcXFxcOnZhbH49UGxhY2Vob2xkZXJdJykubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5kYXRlXCI6XHJcblx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPW5ldyBEYXRlKCQoZWxUeXBlKS5hdHRyKFwidzpmdWxsRGF0ZVwiKSlcclxuXHRcdFx0XHRcdFx0bW9kZWwuZm9ybWF0PSQoZWxUeXBlKS5maW5kKFwid1xcXFw6ZGF0ZUZvcm1hdFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdFx0bW9kZWwubG9jYWxlPSQoZWxUeXBlKS5maW5kKFwid1xcXFw6bGlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0aWYod1htbC5hdHRyaWJzW1wicjppZFwiXSl7XHJcblx0XHRcdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdFx0XHR9ZWxzZSBpZih3WG1sLmF0dHJpYnNbXCJ3OmFuY2hvclwiXSl7XHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybDpgIyR7d1htbC5hdHRyaWJzW1widzphbmNob3JcIl19YH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRibCh3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHRcdH0sXHJcblx0XHR0cih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdHRjKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IHJJZD13WG1sLmF0dHJpYnNbJ3I6aWQnXVxyXG5cdFx0XHRsZXQgZGF0YT1vZmZpY2VEb2N1bWVudC5nZXRSZWwocklkKVxyXG5cclxuXHRcdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlPW9mZmljZURvY3VtZW50LmRvYy5jb250ZW50VHlwZXMoYE92ZXJyaWRlW1BhcnROYW1lPScke3BhcnROYW1lfSddYCkuYXR0cihcIkNvbnRlbnRUeXBlXCIpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImNodW5rXCIsIGRhdGEsIGNvbnRlbnRUeXBlfVxyXG5cdFx0fSxcclxuXHRcdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdFx0fSxcclxuXHRcdHN0eWxlKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdFx0fSxcclxuXHRcdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJhYnN0cmFjdE51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXX1cclxuXHRcdH0sXHJcblx0XHRudW0od1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcIm51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sYWJzdHJhY3ROdW06d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdFx0fSxcclxuXHRcdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fSxcclxuXHRcdG9iamVjdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IG9sZT1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCJvXFxcXDpPTEVPYmplY3RcIilcclxuXHRcdFx0bGV0IHR5cGU9b2xlLmF0dHIoXCJQcm9nSURcIilcclxuXHRcdFx0bGV0IGVtYmVkPW9sZS5hdHRyKFwiVHlwZVwiKT09PVwiRW1iZWRcIlxyXG5cdFx0XHRsZXQgcklkPW9sZS5hdHRyKFwicjppZFwiKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixlbWJlZCwgcHJvZzogdHlwZSwgZGF0YTpvZmZpY2VEb2N1bWVudC5nZXRSZWxPbGVPYmplY3QocklkKX1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19