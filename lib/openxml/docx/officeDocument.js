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
			var _this2 = this;

			_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).call(this);
			this._assignRel("styles,numbering,settings".split(","));

			if (this.styles) {
				(function () {
					var $ = _this2.styles;
					_this2.styles.prototype.basest = function (selector) {
						var current = this;
						while (current.length > 0) {
							if (current.is(selector)) {
								return $(current);
							}
							current = $.root().find("w\\:style[w\\:styleId=\"" + current.children("w\\:basedOn").attr("w:val") + "\"]");
						}
						return this.not(this);
					};
				})();
			}
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
			var _ret2 = function () {
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
							var _ret3 = function () {
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

							if (_ret3 === "break") break;
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

			if ((typeof _ret2 === "undefined" ? "undefined" : _typeof(_ret2)) === "object") return _ret2.v;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiX2Fzc2lnblJlbCIsInNwbGl0Iiwic3R5bGVzIiwiJCIsInByb3RvdHlwZSIsImJhc2VzdCIsInNlbGVjdG9yIiwiY3VycmVudCIsImxlbmd0aCIsImlzIiwicm9vdCIsImZpbmQiLCJjaGlsZHJlbiIsImF0dHIiLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJ0eXBlIiwiZG9jdW1lbnQiLCJpZGVudGl0aWVzIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiZWFjaCIsImkiLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInRvQXJyYXkiLCJyZXZlcnNlIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJoZWFkZXJzIiwic2V0IiwiYXR0cmlicyIsImdldFJlbCIsIk1hcCIsImZvb3RlcnMiLCJoYXNUaXRsZVBhZ2UiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJwYXJzZUludCIsInN0YXJ0c1dpdGgiLCJvdXRsaW5lTHZsIiwib3V0bGluZSIsInIiLCJmbGRDaGFyIiwiaW5saW5lIiwicHJvcHMiLCJfX2ZpbHRlciIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicG9wIiwicGljIiwidGlkeSIsInNwUHIiLCJudlBpY1ByIiwiY052UHIiLCJjTnZTcFByIiwibnZQciIsInN0eWxlIiwibG5SZWYiLCJmaWxsUmVmIiwiZWZmZWN0UmVmIiwib3RoZXJzIiwid3NwIiwic2FtZSIsImtleXMiLCJmeCIsImZzIiwiayIsIm1hcCIsImVtdTJQeCIsInYiLCJmb250UmVmIiwidGV4dFN0eWxlIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJzZWxlY3RlZCIsIm9wdGlvbnMiLCJsaSIsImRpc3BsYXlUZXh0IiwibnMiLCJjaGVja2VkIiwiRGF0ZSIsImZvcm1hdCIsImxvY2FsZSIsImh5cGVybGluayIsInVybCIsInRibCIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwidGMiLCJhbHRDaHVuayIsInJJZCIsImRhdGEiLCJwYXJ0TmFtZSIsImZvbGRlciIsInJlbHMiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwiaWQiLCJhYnN0cmFjdE51bSIsIm51bSIsImxhdGVudFN0eWxlcyIsIm9iamVjdCIsIm9sZSIsImVtYmVkIiwicHJvZyIsImdldFJlbE9sZU9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUdRO0FBQUE7O0FBQ047QUFDQSxRQUFLQSxVQUFMLENBQWdCLDRCQUE0QkMsS0FBNUIsQ0FBa0MsR0FBbEMsQ0FBaEI7O0FBRUEsT0FBRyxLQUFLQyxNQUFSLEVBQWU7QUFBQTtBQUNkLFNBQUlDLElBQUUsT0FBS0QsTUFBWDtBQUNBLFlBQUtBLE1BQUwsQ0FBWUUsU0FBWixDQUFzQkMsTUFBdEIsR0FBNkIsVUFBU0MsUUFBVCxFQUFrQjtBQUM5QyxVQUFJQyxVQUFRLElBQVo7QUFDQSxhQUFNQSxRQUFRQyxNQUFSLEdBQWUsQ0FBckIsRUFBdUI7QUFDdEIsV0FBR0QsUUFBUUUsRUFBUixDQUFXSCxRQUFYLENBQUgsRUFBd0I7QUFDdkIsZUFBT0gsRUFBRUksT0FBRixDQUFQO0FBQ0E7QUFDREEsaUJBQVFKLEVBQUVPLElBQUYsR0FBU0MsSUFBVCw4QkFBd0NKLFFBQVFLLFFB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MVBLLEVBMFBBO0FBQ2hCLFNBQU8sRUFBQ0gsTUFBSyxhQUFOLEVBQW9CMEcsSUFBR3ZHLEtBQUttQixPQUFMLENBQWEsaUJBQWIsQ0FBdkIsRUFBUDtBQUNBLEVBNVBnQjtBQTZQakJzRixJQTdQaUIsZUE2UGJ6RyxJQTdQYSxFQTZQUjtBQUNSLFNBQU8sRUFBQ0gsTUFBSyxLQUFOLEVBQVkwRyxJQUFHdkcsS0FBS21CLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUNxRixhQUFZeEcsS0FBS3BCLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQjtBQUFBLFdBQUdtQyxFQUFFQyxJQUFGLElBQVEsaUJBQVg7QUFBQSxJQUFuQixFQUFpREksT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBL1BnQjtBQWdRakJ1RixhQWhRaUIsMEJBZ1FIO0FBQ2IsU0FBTyxJQUFQO0FBQ0EsRUFsUWdCO0FBbVFqQkMsT0FuUWlCLGtCQW1RVjNHLElBblFVLEVBbVFMQyxjQW5RSyxFQW1RVTtBQUMxQixNQUFJMkcsTUFBSTNHLGVBQWVYLE9BQWYsQ0FBdUJVLElBQXZCLEVBQTZCckIsSUFBN0IsQ0FBa0MsZUFBbEMsQ0FBUjtBQUNBLE1BQUlrQixPQUFLK0csSUFBSS9ILElBQUosQ0FBUyxRQUFULENBQVQ7QUFDQSxNQUFJZ0ksUUFBTUQsSUFBSS9ILElBQUosQ0FBUyxNQUFULE1BQW1CLE9BQTdCO0FBQ0EsTUFBSWtILE1BQUlhLElBQUkvSCxJQUFKLENBQVMsTUFBVCxDQUFSO0FBQ0EsU0FBTyxFQUFDZ0IsTUFBSyxRQUFOLEVBQWVnSCxZQUFmLEVBQXNCQyxNQUFNakgsSUFBNUIsRUFBa0NtRyxNQUFLL0YsZUFBZThHLGVBQWYsQ0FBK0JoQixHQUEvQixDQUF2QyxFQUFQO0FBQ0E7QUF6UWdCLEMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxyXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuLi9kcmF3bWxcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHR0aGlzLl9hc3NpZ25SZWwoXCJzdHlsZXMsbnVtYmVyaW5nLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpKVxyXG5cclxuXHRcdGlmKHRoaXMuc3R5bGVzKXtcclxuXHRcdFx0bGV0ICQ9dGhpcy5zdHlsZXNcclxuXHRcdFx0dGhpcy5zdHlsZXMucHJvdG90eXBlLmJhc2VzdD1mdW5jdGlvbihzZWxlY3Rvcil7XHJcblx0XHRcdFx0bGV0IGN1cnJlbnQ9dGhpc1xyXG5cdFx0XHRcdHdoaWxlKGN1cnJlbnQubGVuZ3RoPjApe1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5pcyhzZWxlY3Rvcikpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gJChjdXJyZW50KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y3VycmVudD0kLnJvb3QoKS5maW5kKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtjdXJyZW50LmNoaWxkcmVuKFwid1xcXFw6YmFzZWRPblwiKS5hdHRyKFwidzp2YWxcIil9XCJdYClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMubm90KHRoaXMpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xyXG5cdFx0bGV0IHN0eWxlcywgbnVtYmVyaW5nXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0c3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRudW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnksIHtzdHlsZXMsbnVtYmVyaW5nfSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aXRpZXM9e1xyXG5cdFx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdFx0bGV0IGVuZD0kKHNlY3QpLmNsb3Nlc3QoJ3dcXFxcOmJvZHk+KicpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0XHRzZWN0LmNvbnRlbnQucHVzaChlbmQuZ2V0KDApKVxyXG5cdFx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbn1cclxuXHRcdH0sXHJcblx0XHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGNvbnN0IGhmPXR5cGU9PndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09YHc6JHt0eXBlfVJlZmVyZW5jZWApLnJlZHVjZSgoaGVhZGVycyxhKT0+e1xyXG5cdFx0XHRcdFx0aGVhZGVycy5zZXQoYS5hdHRyaWJzW1widzp0eXBlXCJdLG9mZmljZURvY3VtZW50LmdldFJlbChhLmF0dHJpYnNbXCJyOmlkXCJdKSlcclxuXHRcdFx0XHRcdHJldHVybiBoZWFkZXJzXHJcblx0XHRcdFx0fSxuZXcgTWFwKCkpXHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHR5cGU6XCJzZWN0aW9uXCIsXHJcblx0XHRcdFx0Y2hpbGRyZW46d1htbC5jb250ZW50LFxyXG5cdFx0XHRcdGhlYWRlcnM6aGYoXCJoZWFkZXJcIiksXHJcblx0XHRcdFx0Zm9vdGVyczpoZihcImZvb3RlclwiKSxcclxuXHRcdFx0XHRoYXNUaXRsZVBhZ2U6ICEhd1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRpdGxlUGdcIilcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0bGV0IG51bVByPXBQci5jaGlsZHJlbihcIndcXFxcOm51bVByXCIpXHJcblx0XHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50XHJcblx0XHRcdFx0XHRcdC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdYClcclxuXHRcdFx0XHRcdFx0LmJhc2VzdChgOmhhcyh3XFxcXDpudW1QcilgKVxyXG5cdFx0XHRcdFx0XHQuZmluZChcIndcXFxcOm51bVByXCIpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQobnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpfHwwKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoc3R5bGVJZCAmJiBzdHlsZUlkLnN0YXJ0c1dpdGgoXCJIZWFkaW5nXCIpKXtcclxuXHRcdFx0XHRcdGxldCBvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50XHJcblx0XHRcdFx0XHRcdC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdYClcclxuXHRcdFx0XHRcdFx0LmJhc2VzdChcIjpoYXMod1xcXFw6b3V0bGluZUx2bClcIilcclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpXHJcblx0XHRcdFx0XHRcdC5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRcdGlkZW50aXR5Lm91dGxpbmU9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0XHR9LFxyXG5cdFx0cih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0XHR9LFxyXG5cdFx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHRcdH0sXHJcblxyXG5cdFx0aW5saW5lKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGNvbnN0IHByb3BzPSQucHJvcHMoe1xyXG5cdFx0XHRcdC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXHJcblx0XHRcdFx0X19maWx0ZXI6XCJ3cFxcXFw6ZXh0ZW50LHdwXFxcXDplZmZlY3RFeHRlbnRcIixcclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHR0eXBlOmBkcmF3aW5nLmlubGluZWAsIFxyXG5cdFx0XHRcdC4uLnByb3BzLFxyXG5cdFx0XHRcdGNoaWxkcmVuOiQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRhbmNob3Iod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCBncmFwaGljRGF0YT0kLmZpbmQoJz5hXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJylcclxuXHRcdFx0bGV0IHR5cGU9Z3JhcGhpY0RhdGEuYXR0cihcInVyaVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0bGV0IGNoaWxkcmVuPWdyYXBoaWNEYXRhLmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblx0XHRcdGlmKHR5cGU9PVwid29yZHByb2Nlc3NpbmdHcm91cFwiKVxyXG5cdFx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUuc3BsaXQoXCI6XCIpWzBdIT1cIndwZ1wiKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiZHJhd2luZy5hbmNob3JcIixjaGlsZHJlbn1cclxuXHRcdH0sXHJcblxyXG5cdFx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXHJcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xyXG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcclxuICAgICAgICAgICAgICAgIHRpZHk6KHtzcFByLCBudlBpY1ByOntjTnZQcj17fSxjTnZTcFByPXt9LG52UHI9e319LCBzdHlsZTp7bG5SZWY9e30sZmlsbFJlZj17fSxlZmZlY3RSZWY9e319PXt9LC4uLm90aGVyc30pPT4oey4uLmxuUmVmLC4uLmZpbGxSZWYsIC4uLmVmZmVjdFJlZiwuLi5zcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHIsLi4ub3RoZXJzfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyx0eXBlOlwicGljdHVyZVwifVxyXG4gICAgICAgIH0sXHJcblxyXG5cdFx0d3NwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0Y29uc3QgY29udGVudD1cIndwc1xcXFw6dHhieFwiXHJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxyXG5cdFx0XHRjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxyXG5cdFx0XHRjb25zdCBzYW1lPShrZXlzLGZ4KT0+a2V5cy5yZWR1Y2UoKGZzLCBrKT0+KGZzW2tdPWZ4LCBmcykse30pXHJcblxyXG5cdFx0XHRjb25zdCBwcm9wcz0kLnByb3BzKHtcclxuXHRcdFx0XHQuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxyXG5cdFx0XHRcdC4uLnNhbWUoXCJyLHQsbCxiXCIuc3BsaXQoXCIsXCIpLm1hcChhPT5gJHthfUluc2ApLCB2PT5vZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KHYpKSxcclxuXHRcdFx0XHRfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9KWAsXHJcblx0XHRcdFx0dGlkeTooe2NOdlNwUHI9e30sIHNwUHI9e30sIHN0eWxlOntsblJlZj17fSxmaWxsUmVmPXt9LGVmZmVjdFJlZj17fSxmb250UmVmPXt9fT17fSwuLi5vdGhlcnN9KT0+KHsuLi5jTnZTcFByLCAuLi5sblJlZiwuLi5maWxsUmVmLCAuLi5lZmZlY3RSZWYsIC4uLnNwUHIsIHRleHRTdHlsZTogZm9udFJlZiwgLi4ub3RoZXJzfSlcclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInNoYXBlXCIsIGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHRcdEZhbGxiYWNrKCl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9LFxyXG5cdFx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxkb2NQYXJ0T2JqLGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94LHJlcGVhdGluZ1NlY3Rpb24scmVwZWF0aW5nU2VjdGlvbkl0ZW1cIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdFx0bGV0IG1vZGVsPXtjaGlsZHJlbn1cclxuXHRcdFx0XHRpZih0eXBlKXtcclxuXHRcdFx0XHRcdG1vZGVsLnR5cGU9YGNvbnRyb2wuJHt0eXBlfWBcclxuXHRcdFx0XHR9ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1cImJsb2NrXCJcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPVwiaW5saW5lXCJcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdCQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0XHRcdHN3aXRjaChtb2RlbC50eXBlKXtcclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmRyb3BEb3duTGlzdFwiOlxyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuY29tYm9Cb3hcIjp7XHJcblx0XHRcdFx0XHRcdGxldCBzZWxlY3RlZD0kKGNvbnRlbnQpLnRleHQoKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5vcHRpb25zPSQoZWxUeXBlKVxyXG5cdFx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6bGlzdEl0ZW1cIilcclxuXHRcdFx0XHRcdFx0XHQubWFwKChpLGxpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0XHRcdFx0ZGlzcGxheVRleHQ6IGxpLmF0dHJpYnNbXCJ3OmRpc3BsYXlUZXh0XCJdLFxyXG5cdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogbGkuYXR0cmlic1tcInc6dmFsdWVcIl1cclxuXHRcdFx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC52YWx1ZT0obW9kZWwub3B0aW9ucy5maW5kKGE9PmEuZGlzcGxheVRleHQ9PXNlbGVjdGVkKXx8e30pLnZhbHVlXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5jaGVja2JveFwiOntcclxuXHRcdFx0XHRcdFx0bGV0IG5zPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKVswXVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5jaGVja2VkPSQoZWxUeXBlKS5maW5kKGAke25zfVxcXFw6Y2hlY2tlZGApLmF0dHIoYCR7bnN9OnZhbGApPT1cIjFcIlxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdFx0XHRpZihjb250ZW50LmZpbmQoJ3dcXFxcOnIgW3dcXFxcOnZhbH49UGxhY2Vob2xkZXJdJykubGVuZ3RoPT0wKVxyXG5cdFx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5kYXRlXCI6XHJcblx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPW5ldyBEYXRlKCQoZWxUeXBlKS5hdHRyKFwidzpmdWxsRGF0ZVwiKSlcclxuXHRcdFx0XHRcdFx0bW9kZWwuZm9ybWF0PSQoZWxUeXBlKS5maW5kKFwid1xcXFw6ZGF0ZUZvcm1hdFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdFx0bW9kZWwubG9jYWxlPSQoZWxUeXBlKS5maW5kKFwid1xcXFw6bGlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0aWYod1htbC5hdHRyaWJzW1wicjppZFwiXSl7XHJcblx0XHRcdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdFx0XHR9ZWxzZSBpZih3WG1sLmF0dHJpYnNbXCJ3OmFuY2hvclwiXSl7XHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybDpgIyR7d1htbC5hdHRyaWJzW1widzphbmNob3JcIl19YH1cclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHRibCh3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHRcdH0sXHJcblx0XHR0cih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdHRjKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IHJJZD13WG1sLmF0dHJpYnNbJ3I6aWQnXVxyXG5cdFx0XHRsZXQgZGF0YT1vZmZpY2VEb2N1bWVudC5nZXRSZWwocklkKVxyXG5cclxuXHRcdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlPW9mZmljZURvY3VtZW50LmRvYy5jb250ZW50VHlwZXMoYE92ZXJyaWRlW1BhcnROYW1lPScke3BhcnROYW1lfSddYCkuYXR0cihcIkNvbnRlbnRUeXBlXCIpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImNodW5rXCIsIGRhdGEsIGNvbnRlbnRUeXBlfVxyXG5cdFx0fSxcclxuXHRcdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdFx0fSxcclxuXHRcdHN0eWxlKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdFx0fSxcclxuXHRcdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJhYnN0cmFjdE51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXX1cclxuXHRcdH0sXHJcblx0XHRudW0od1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcIm51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sYWJzdHJhY3ROdW06d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdFx0fSxcclxuXHRcdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fSxcclxuXHRcdG9iamVjdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IG9sZT1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCJvXFxcXDpPTEVPYmplY3RcIilcclxuXHRcdFx0bGV0IHR5cGU9b2xlLmF0dHIoXCJQcm9nSURcIilcclxuXHRcdFx0bGV0IGVtYmVkPW9sZS5hdHRyKFwiVHlwZVwiKT09PVwiRW1iZWRcIlxyXG5cdFx0XHRsZXQgcklkPW9sZS5hdHRyKFwicjppZFwiKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixlbWJlZCwgcHJvZzogdHlwZSwgZGF0YTpvZmZpY2VEb2N1bWVudC5nZXRSZWxPbGVPYmplY3QocklkKX1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19