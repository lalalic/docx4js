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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
				var type = "text,picture,docPartList,comboBox,dropDownList,date,checkbox,repeatingSection,repeatingSectionItem".split(",").find(function (a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsic3VwcG9ydGVkIiwic3BsaXQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJnZXRSZWxPYmplY3QiLCJzdHlsZXMiLCJwcm90b3R5cGUiLCJiYXNlc3QiLCJzZWxlY3RvciIsImN1cnJlbnQiLCJsZW5ndGgiLCJpcyIsInJvb3QiLCJmaW5kIiwiY2hpbGRyZW4iLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJkb2N1bWVudCIsImlkZW50aXRpZXMiLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInRvQXJyYXkiLCJyZXZlcnNlIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJoZWFkZXJzIiwic2V0IiwiYXR0cmlicyIsImdldFJlbCIsIk1hcCIsImZvb3RlcnMiLCJoYXNUaXRsZVBhZ2UiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJwYXJzZUludCIsInN0YXJ0c1dpdGgiLCJvdXRsaW5lTHZsIiwib3V0bGluZSIsInIiLCJmbGRDaGFyIiwiaW5saW5lIiwiYW5jaG9yIiwiZ3JhcGhpY0RhdGEiLCJwaWMiLCJibGlwIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJzZWxlY3RlZCIsIm9wdGlvbnMiLCJtYXAiLCJsaSIsImRpc3BsYXlUZXh0IiwibnMiLCJjaGVja2VkIiwiRGF0ZSIsImZvcm1hdCIsImxvY2FsZSIsImh5cGVybGluayIsInVybCIsInRibCIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwidGMiLCJhbHRDaHVuayIsInJJZCIsImRhdGEiLCJwYXJ0TmFtZSIsImZvbGRlciIsImNvbnRlbnRUeXBlIiwiY29udGVudFR5cGVzIiwiZG9jRGVmYXVsdHMiLCJzdHlsZSIsImlkIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiLCJvbGUiLCJlbWJlZCIsInByb2ciLCJnZXRSZWxPbGVPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUdRO0FBQUE7O0FBQ047QUFDQSxPQUFNQSxZQUFVLGtDQUFrQ0MsS0FBbEMsQ0FBd0MsR0FBeEMsQ0FBaEI7QUFDQSxRQUFLQyxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVQLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJRLEdBQTFCLEVBQVQ7QUFDQSxRQUFHVCxVQUFVVSxPQUFWLENBQWtCSCxJQUFsQixLQUF5QixDQUFDLENBQTdCLEVBQStCO0FBQUE7QUFDOUIsVUFBSUksU0FBT0wsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBWDtBQUNBSSxhQUFPQyxjQUFQLFNBQTJCTixJQUEzQixFQUFnQztBQUMvQk8sVUFEK0IsaUJBQzFCO0FBQ0osZUFBTyxLQUFLQyxZQUFMLENBQWtCSixNQUFsQixDQUFQO0FBQ0E7QUFIOEIsT0FBaEM7QUFGOEI7QUFPOUI7QUFDRCxJQVhEOztBQWFBLE9BQUlMLElBQUUsS0FBS1UsTUFBWDtBQUNBLFFBQUtBLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsR0FBNkIsVUFBU0MsUUFBVCxFQUFrQjtBQUM5QyxRQUFJQyxVQUFRLElBQVo7QUFDQSxXQUFNQSxRQUFRQyxNQUFSLEdBQWUsQ0FBckIsRUFBdUI7QUFDdEIsU0FBR0QsUUFBUUUsRUFBUixDQUFXSCxRQUFYLENBQUgsRUFBd0I7QUFDdkIsYUFBT2IsRUFBRWMsT0FBRixDQUFQO0FBQ0E7QUFDREEsZUFBUWQsRUFBRWlCLElBQUYsR0FBU0MsSUFBVCw4QkFBd0NKLFFBQVFLLFFBQVIsQ0FBaUIsYUFBakIsRUFBZ0NqQixJQUFoQyxDQUFxQyxPQUFyQyxDQUF4QyxTQUFSO0FBQ0E7QUFDRCxXQUFPLEtBQUtrQixHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0EsSUFURDtBQVVBOzs7eUJBRU1DLGEsRUFBeUU7QUFBQSxPQUExREMsUUFBMEQsdUVBQWpELEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxDQUFpRDs7QUFDL0UsT0FBSWIsZUFBSjtBQUFBLE9BQVllLGtCQUFaO0FBQ0EsT0FBRyxLQUFLZixNQUFSLEVBQ0NBLFNBQU8sS0FBS2dCLFVBQUwsQ0FBZ0IsS0FBS2hCLE1BQUwsQ0FBWSxZQUFaLEVBQTBCRixHQUExQixDQUE4QixDQUE5QixDQUFoQixFQUFpRGEsYUFBakQsRUFBK0RDLFFBQS9ELENBQVA7QUFDRCxPQUFHLEtBQUtHLFNBQVIsRUFDQ0EsWUFBVSxLQUFLQyxVQUFMLENBQWdCLEtBQUtELFNBQUwsQ0FBZSxlQUFmLEVBQWdDakIsR0FBaEMsQ0FBb0MsQ0FBcEMsQ0FBaEIsRUFBdURhLGFBQXZELEVBQXFFQyxRQUFyRSxDQUFWO0FBQ0QsVUFBTyxLQUFLSSxVQUFMLENBQWdCLEtBQUtDLE9BQUwsQ0FBYSxjQUFiLEVBQTZCbkIsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsRUFBb0RhLGFBQXBELEVBQW1FQyxRQUFuRSxFQUE2RSxFQUFDWixjQUFELEVBQVFlLG9CQUFSLEVBQTdFLENBQVA7QUFDQTs7O3dCQUVLRyxVLEVBQXFFO0FBQUEsT0FBMUROLFFBQTBELHVFQUFqRCxLQUFLQyxXQUFMLENBQWlCRCxRQUFqQixDQUEwQkUsSUFBMUIsQ0FBK0IsS0FBS0QsV0FBcEMsQ0FBaUQ7O0FBQzFFLE9BQU1NLE1BQUksRUFBVjtBQUNBLE9BQU1SLGdCQUFjTyxXQUFXUCxhQUFYLENBQXlCRyxJQUF6QixDQUE4QkksVUFBOUIsQ0FBcEI7QUFDQSxZQUFTRSxTQUFULEdBQW9CO0FBQ25CLFFBQUlDLFFBQU1ULDBCQUFZVSxTQUFaLENBQVY7QUFDQSxRQUFHRCxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsTUFBZSxRQUEzQixFQUFvQztBQUNuQ0gsZ0JBQVdLLElBQVgsb0JBQWdCLEdBQWhCLEVBQW9CRixLQUFwQixvQ0FBNkJDLFNBQTdCO0FBQ0FKLGdCQUFXSyxJQUFYLG9CQUFnQkYsTUFBTTlCLElBQXRCLEVBQTRCOEIsS0FBNUIsb0NBQXFDQyxTQUFyQztBQUNBLFNBQUdKLGtCQUFnQkcsTUFBTTlCLElBQXRCLENBQUgsRUFDQzJCLGtCQUFnQkcsTUFBTTlCLElBQXRCLHFCQUE4QjhCLEtBQTlCLG9DQUF1Q0MsU0FBdkM7QUFDRDtBQUNELFdBQU9ELEtBQVA7QUFDQTs7QUFFRCxPQUFHLEtBQUtyQixNQUFSLEVBQ0NtQixJQUFJbkIsTUFBSixHQUFXLEtBQUtnQixVQUFMLENBQWdCLEtBQUtoQixNQUFMLENBQVksWUFBWixFQUEwQkYsR0FBMUIsQ0FBOEIsQ0FBOUIsQ0FBaEIsRUFBaURhLGFBQWpELEVBQStEUyxTQUEvRCxDQUFYO0FBQ0QsT0FBRyxLQUFLTCxTQUFSLEVBQ0NJLElBQUlKLFNBQUosR0FBYyxLQUFLQyxVQUFMLENBQWdCLEtBQUtELFNBQUwsQ0FBZSxlQUFmLEVBQWdDakIsR0FBaEMsQ0FBb0MsQ0FBcEMsQ0FBaEIsRUFBdURhLGFBQXZELEVBQXFFUyxTQUFyRSxDQUFkO0FBQ0RELE9BQUlLLFFBQUosR0FBYSxLQUFLUixVQUFMLENBQWdCLEtBQUtDLE9BQUwsQ0FBYSxjQUFiLEVBQTZCbkIsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsRUFBb0RhLGFBQXBELEVBQWtFUyxTQUFsRSxDQUFiO0FBQ0EsVUFBT0QsR0FBUDtBQUNBOzs7Ozs7T0FFTU0sVSxHQUFXO0FBQ2pCRCxTQURpQixvQkFDUkUsSUFEUSxFQUNIQyxjQURHLEVBQ1k7QUFDNUIsTUFBSXJDLElBQUVxQyxlQUFlVixPQUFyQjtBQUNBLE1BQUliLFVBQVEsSUFBWjtBQUNBLE1BQUlLLFdBQVNuQixFQUFFLFlBQUYsRUFBZ0JILElBQWhCLENBQXFCLFVBQUNDLENBQUQsRUFBR3dDLElBQUgsRUFBVTtBQUMzQyxPQUFJQyxNQUFJdkMsRUFBRXNDLElBQUYsRUFBUUUsT0FBUixDQUFnQixZQUFoQixDQUFSO0FBQ0FGLFFBQUtYLE9BQUwsR0FBYVksSUFBSUUsU0FBSixDQUFjM0IsT0FBZCxFQUF1QjRCLE9BQXZCLEdBQWlDQyxPQUFqQyxFQUFiO0FBQ0EsT0FBRyxDQUFDSixJQUFJdkIsRUFBSixDQUFPc0IsSUFBUCxDQUFKLEVBQ0NBLEtBQUtYLE9BQUwsQ0FBYWlCLElBQWIsQ0FBa0JMLElBQUkvQixHQUFKLENBQVEsQ0FBUixDQUFsQjtBQUNETSxhQUFReUIsR0FBUjtBQUNBLEdBTlksRUFNVkcsT0FOVSxFQUFiO0FBT0EsU0FBTyxFQUFDekMsTUFBSyxVQUFOLEVBQWtCa0Isa0JBQWxCLEVBQVA7QUFDQSxFQVpnQjtBQWFqQjBCLE9BYmlCLGtCQWFWVCxJQWJVLEVBYUxDLGNBYkssRUFhVTtBQUMxQixNQUFNUyxLQUFHLFNBQUhBLEVBQUc7QUFBQSxVQUFNVixLQUFLakIsUUFBTCxDQUFjNEIsTUFBZCxDQUFxQjtBQUFBLFdBQUdDLEVBQUVDLElBQUYsV0FBYWhELElBQWIsY0FBSDtBQUFBLElBQXJCLEVBQXNEaUQsTUFBdEQsQ0FBNkQsVUFBQ0MsT0FBRCxFQUFTSCxDQUFULEVBQWE7QUFDdkZHLFlBQVFDLEdBQVIsQ0FBWUosRUFBRUssT0FBRixDQUFVLFFBQVYsQ0FBWixFQUFnQ2hCLGVBQWVpQixNQUFmLENBQXNCTixFQUFFSyxPQUFGLENBQVUsTUFBVixDQUF0QixDQUFoQztBQUNBLFdBQU9GLE9BQVA7QUFDQSxJQUhhLEVBR1osSUFBSUksR0FBSixFQUhZLENBQU47QUFBQSxHQUFUOztBQUtBLFNBQU87QUFDTnRELFNBQUssU0FEQztBQUVOa0IsYUFBU2lCLEtBQUtULE9BRlI7QUFHTndCLFlBQVFMLEdBQUcsUUFBSCxDQUhGO0FBSU5VLFlBQVFWLEdBQUcsUUFBSCxDQUpGO0FBS05XLGlCQUFjLENBQUMsQ0FBQ3JCLEtBQUtqQixRQUFMLENBQWNELElBQWQsQ0FBbUI7QUFBQSxXQUFHOEIsRUFBRUMsSUFBRixJQUFRLFdBQVg7QUFBQSxJQUFuQjtBQUxWLEdBQVA7QUFPQSxFQTFCZ0I7QUEyQmpCUyxFQTNCaUIsYUEyQmZ0QixJQTNCZSxFQTJCVkMsY0EzQlUsRUEyQks7QUFDckIsTUFBSXJDLElBQUVxQyxlQUFlVixPQUFmLENBQXVCUyxJQUF2QixDQUFOO0FBQ0EsTUFBSW5DLE9BQUssR0FBVDs7QUFFQSxNQUFJMEQsV0FBUyxFQUFDMUQsVUFBRCxFQUFNMkQsSUFBR3hCLEtBQUtqQixRQUFMLENBQWNELElBQWQsQ0FBbUI7QUFBQSxRQUFFK0IsSUFBRixRQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQW5CLENBQVQsRUFBcUQ5QixVQUFTaUIsS0FBS2pCLFFBQUwsQ0FBYzRCLE1BQWQsQ0FBcUI7QUFBQSxRQUFFRSxJQUFGLFNBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBckIsQ0FBOUQsRUFBYjs7QUFFQSxNQUFJWSxNQUFJN0QsRUFBRWtCLElBQUYsQ0FBTyxTQUFQLENBQVI7QUFDQSxNQUFHMkMsSUFBSTlDLE1BQVAsRUFBYztBQUNiLE9BQUkrQyxVQUFRRCxJQUFJM0MsSUFBSixDQUFTLFlBQVQsRUFBdUJoQixJQUF2QixDQUE0QixPQUE1QixDQUFaOztBQUVBLE9BQUk2RCxRQUFNRixJQUFJMUMsUUFBSixDQUFhLFdBQWIsQ0FBVjtBQUNBLE9BQUcsQ0FBQzRDLE1BQU1oRCxNQUFQLElBQWlCK0MsT0FBcEIsRUFBNEI7QUFDM0JDLFlBQU0xQixlQUNKM0IsTUFESSw4QkFDNkJvRCxPQUQ3QixVQUVKbEQsTUFGSSxvQkFHSk0sSUFISSxDQUdDLFdBSEQsQ0FBTjtBQUlBOztBQUVELE9BQUc2QyxNQUFNaEQsTUFBVCxFQUFnQjtBQUNmNEMsYUFBUzFELElBQVQsR0FBYyxNQUFkO0FBQ0EwRCxhQUFTSyxLQUFULEdBQWVELE1BQU03QyxJQUFOLENBQVcsV0FBWCxFQUF3QmhCLElBQXhCLENBQTZCLE9BQTdCLENBQWY7QUFDQXlELGFBQVNNLEtBQVQsR0FBZUMsU0FBU0gsTUFBTTdDLElBQU4sQ0FBVyxVQUFYLEVBQXVCaEIsSUFBdkIsQ0FBNEIsT0FBNUIsS0FBc0MsQ0FBL0MsQ0FBZjtBQUNBOztBQUVELE9BQUc0RCxXQUFXQSxRQUFRSyxVQUFSLENBQW1CLFNBQW5CLENBQWQsRUFBNEM7QUFDM0MsUUFBSUMsYUFBVy9CLGVBQ2IzQixNQURhLDhCQUNvQm9ELE9BRHBCLFVBRWJsRCxNQUZhLENBRU4sc0JBRk0sRUFHYk0sSUFIYSxDQUdSLGdCQUhRLEVBSWJoQixJQUphLENBSVIsT0FKUSxDQUFmO0FBS0EsUUFBR2tFLFVBQUgsRUFBYztBQUNiVCxjQUFTMUQsSUFBVCxHQUFjLFNBQWQ7QUFDQTBELGNBQVNVLE9BQVQsR0FBaUJILFNBQVNFLFVBQVQsSUFBcUIsQ0FBdEM7QUFDQTtBQUNEO0FBQ0Q7O0FBRUQsU0FBT1QsUUFBUDtBQUNBLEVBakVnQjtBQWtFakJXLEVBbEVpQixhQWtFZmxDLElBbEVlLEVBa0VWO0FBQ04sU0FBTyxFQUFDbkMsTUFBSyxHQUFOLEVBQVcyRCxJQUFJeEIsS0FBS2pCLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQjtBQUFBLFFBQUUrQixJQUFGLFNBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBZixFQUE0RDlCLFVBQVVpQixLQUFLakIsUUFBTCxDQUFjNEIsTUFBZCxDQUFxQjtBQUFBLFFBQUVFLElBQUYsU0FBRUEsSUFBRjtBQUFBLFdBQVVBLFFBQU0sT0FBaEI7QUFBQSxJQUFyQixDQUF0RSxFQUFQO0FBQ0EsRUFwRWdCO0FBcUVqQnNCLFFBckVpQixtQkFxRVRuQyxJQXJFUyxFQXFFSjtBQUNaLFNBQU9BLEtBQUtpQixPQUFMLENBQWEsZUFBYixDQUFQO0FBQ0EsRUF2RWdCO0FBeUVqQm1CLE9BekVpQixrQkF5RVZwQyxJQXpFVSxFQXlFTEMsY0F6RUssRUF5RVU7QUFDMUIsTUFBSXJDLElBQUVxQyxlQUFlVixPQUFmLENBQXVCUyxJQUF2QixDQUFOO0FBQ0EsU0FBTyxFQUFDbkMsc0JBQUQsRUFBd0JrQixVQUFTbkIsRUFBRWtCLElBQUYsQ0FBTyw2QkFBUCxFQUFzQ0MsUUFBdEMsR0FBaUR1QixPQUFqRCxFQUFqQyxFQUFQO0FBQ0EsRUE1RWdCO0FBNkVqQitCLE9BN0VpQixrQkE2RVZyQyxJQTdFVSxFQTZFSkMsY0E3RUksRUE2RVc7QUFDM0IsTUFBSXJDLElBQUVxQyxlQUFlVixPQUFmLENBQXVCUyxJQUF2QixDQUFOO0FBQ0EsTUFBSXNDLGNBQVkxRSxFQUFFa0IsSUFBRixDQUFPLDZCQUFQLENBQWhCO0FBQ0EsTUFBSWpCLE9BQUt5RSxZQUFZeEUsSUFBWixDQUFpQixLQUFqQixFQUF3QlAsS0FBeEIsQ0FBOEIsR0FBOUIsRUFBbUNRLEdBQW5DLEVBQVQ7QUFDQSxNQUFJZ0IsV0FBU3VELFlBQVl2RCxRQUFaLEdBQXVCdUIsT0FBdkIsRUFBYjtBQUNBLE1BQUd6QyxRQUFNLHFCQUFULEVBQ0NrQixXQUFTQSxTQUFTLENBQVQsRUFBWUEsUUFBWixDQUFxQjRCLE1BQXJCLENBQTRCO0FBQUEsVUFBR0MsRUFBRUMsSUFBRixDQUFPdEQsS0FBUCxDQUFhLEdBQWIsRUFBa0IsQ0FBbEIsS0FBc0IsS0FBekI7QUFBQSxHQUE1QixDQUFUOztBQUVELFNBQU8sRUFBQ00sTUFBSyxnQkFBTixFQUF1QmtCLGtCQUF2QixFQUFQO0FBQ0EsRUF0RmdCO0FBdUZqQndELElBdkZpQixlQXVGYnZDLElBdkZhLEVBdUZQQyxjQXZGTyxFQXVGUTtBQUN4QixNQUFJdUMsT0FBS3ZDLGVBQWVWLE9BQWYsQ0FBdUJTLElBQXZCLEVBQTZCbEIsSUFBN0IsQ0FBa0MsVUFBbEMsQ0FBVDtBQUNBLE1BQUkyRCxNQUFJRCxLQUFLMUUsSUFBTCxDQUFVLFNBQVYsS0FBc0IwRSxLQUFLMUUsSUFBTCxDQUFVLFFBQVYsQ0FBOUI7QUFDQSxvQkFBUUQsTUFBSyxTQUFiLElBQTBCb0MsZUFBZWlCLE1BQWYsQ0FBc0J1QixHQUF0QixDQUExQjtBQUNBLEVBM0ZnQjtBQTRGakJDLElBNUZpQixlQTRGYjFDLElBNUZhLEVBNEZQQyxjQTVGTyxFQTRGUTtBQUN4QixTQUFPLEVBQUNwQyxNQUFLLE9BQU4sRUFBZWtCLFVBQVNrQixlQUFlVixPQUFmLENBQXVCUyxJQUF2QixFQUE2QmxCLElBQTdCLENBQWtDLDZCQUFsQyxFQUFpRUMsUUFBakUsR0FBNEV1QixPQUE1RSxFQUF4QixFQUFQO0FBQ0EsRUE5RmdCO0FBK0ZqQnFDLFNBL0ZpQixzQkErRlA7QUFDVCxTQUFPLElBQVA7QUFDQSxFQWpHZ0I7QUFrR2pCQyxJQWxHaUIsZUFrR2I1QyxJQWxHYSxFQWtHUkMsY0FsR1EsRUFrR087QUFDdkIsTUFBSXJDLElBQUVxQyxlQUFlVixPQUFmLENBQXVCUyxJQUF2QixDQUFOO0FBQ0EsTUFBSXdCLEtBQUc1RCxFQUFFa0IsSUFBRixDQUFPLFlBQVAsQ0FBUDtBQUNBLE1BQUlTLFVBQVEzQixFQUFFa0IsSUFBRixDQUFPLGlCQUFQLENBQVo7QUFDQSxNQUFJQyxXQUFTUSxRQUFRUixRQUFSLEdBQW1CdUIsT0FBbkIsRUFBYjs7QUFFQSxNQUFJdUMsWUFBVXJCLEdBQUcxQyxJQUFILENBQVEsaUJBQVIsRUFBMkJWLEdBQTNCLENBQStCLENBQS9CLENBQWQ7QUFDQSxNQUFHeUUsU0FBSCxFQUFhO0FBQUM7QUFDYixPQUFJQyxPQUFLRCxVQUFVNUIsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQzhCLElBQUVELEtBQUt2RixLQUFMLENBQVcsVUFBWCxDQURIO0FBQUEsT0FFQ3NELFFBQU1rQyxFQUFFaEYsR0FBRixJQUFRZ0YsRUFBRWhGLEdBQUYsRUFBZCxDQUZEO0FBR0EsT0FBSWlGLFFBQU16RCxRQUFRMEQsSUFBUixFQUFWOztBQUVBLFVBQU8sRUFBQ3BGLE1BQUssVUFBTixFQUFrQmdELFVBQWxCLEVBQXdCbUMsWUFBeEIsRUFBK0JqRSxrQkFBL0IsRUFBUDtBQUNBLEdBUEQsTUFPSztBQUFBO0FBQUM7QUFDTCxRQUFJbUUsYUFBVzFCLEdBQUdwRCxHQUFILENBQU8sQ0FBUCxFQUFVVyxRQUF6QjtBQUNBLFFBQUlvRSxTQUFPRCxXQUFXQSxXQUFXdkUsTUFBWCxHQUFrQixDQUE3QixDQUFYO0FBQ0EsUUFBSWtDLE9BQUtzQyxPQUFPdEMsSUFBUCxDQUFZdEQsS0FBWixDQUFrQixHQUFsQixFQUF1QlEsR0FBdkIsRUFBVDtBQUNBLFFBQUlGLE9BQUsscUdBQXFHTixLQUFyRyxDQUEyRyxHQUEzRyxFQUNQdUIsSUFETyxDQUNGO0FBQUEsWUFBRzhCLEtBQUdDLElBQU47QUFBQSxLQURFLENBQVQ7QUFFQSxRQUFJbEIsUUFBTSxFQUFDWixrQkFBRCxFQUFWO0FBQ0EsUUFBR2xCLElBQUgsRUFBUTtBQUNQOEIsV0FBTTlCLElBQU4sZ0JBQXNCQSxJQUF0QjtBQUNBLEtBRkQsTUFFSztBQUFDO0FBQ0wsU0FBRzBCLFFBQVFULElBQVIsQ0FBYSw2QkFBYixFQUE0Q0gsTUFBL0MsRUFBc0Q7QUFDckRnQixZQUFNOUIsSUFBTixHQUFXLE9BQVg7QUFDQSxNQUZELE1BRUs7QUFDSjhCLFlBQU05QixJQUFOLEdBQVcsUUFBWDtBQUNBO0FBQ0Q7O0FBRURELFFBQUVxQyxlQUFlVixPQUFqQjtBQUNBLFlBQU9JLE1BQU05QixJQUFiO0FBQ0MsVUFBSyxzQkFBTDtBQUNBLFVBQUssa0JBQUw7QUFBd0I7QUFBQTtBQUN2QixZQUFJdUYsV0FBU3hGLEVBQUUyQixPQUFGLEVBQVcwRCxJQUFYLEVBQWI7QUFDQXRELGNBQU0wRCxPQUFOLEdBQWN6RixFQUFFdUYsTUFBRixFQUNackUsSUFEWSxDQUNQLGNBRE8sRUFFWndFLEdBRlksQ0FFUixVQUFDNUYsQ0FBRCxFQUFHNkYsRUFBSCxFQUFRO0FBQ1osZ0JBQU87QUFDTkMsdUJBQWFELEdBQUd0QyxPQUFILENBQVcsZUFBWCxDQURQO0FBRU4rQixpQkFBT08sR0FBR3RDLE9BQUgsQ0FBVyxTQUFYO0FBRkQsVUFBUDtBQUlBLFNBUFksRUFRWjdDLEdBUlksRUFBZDtBQVNBdUIsY0FBTXFELEtBQU4sR0FBWSxDQUFDckQsTUFBTTBELE9BQU4sQ0FBY3ZFLElBQWQsQ0FBbUI7QUFBQSxnQkFBRzhCLEVBQUU0QyxXQUFGLElBQWVKLFFBQWxCO0FBQUEsU0FBbkIsS0FBZ0QsRUFBakQsRUFBcURKLEtBQWpFO0FBQ0E7QUFadUI7O0FBQUEsOEJBWXZCO0FBQ0E7QUFDRCxVQUFLLGtCQUFMO0FBQXdCO0FBQ3ZCLFdBQUlTLEtBQUdOLE9BQU90QyxJQUFQLENBQVl0RCxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLENBQXZCLENBQVA7QUFDQW9DLGFBQU0rRCxPQUFOLEdBQWM5RixFQUFFdUYsTUFBRixFQUFVckUsSUFBVixDQUFrQjJFLEVBQWxCLGlCQUFrQzNGLElBQWxDLENBQTBDMkYsRUFBMUMsY0FBcUQsR0FBbkU7QUFDQTtBQUNBO0FBQ0QsVUFBSyxjQUFMO0FBQ0MsVUFBR2xFLFFBQVFULElBQVIsQ0FBYSw4QkFBYixFQUE2Q0gsTUFBN0MsSUFBcUQsQ0FBeEQsRUFDQ2dCLE1BQU1xRCxLQUFOLEdBQVl6RCxRQUFRMEQsSUFBUixFQUFaO0FBQ0Q7QUFDRCxVQUFLLGNBQUw7QUFDQ3RELFlBQU1xRCxLQUFOLEdBQVksSUFBSVcsSUFBSixDQUFTL0YsRUFBRXVGLE1BQUYsRUFBVXJGLElBQVYsQ0FBZSxZQUFmLENBQVQsQ0FBWjtBQUNBNkIsWUFBTWlFLE1BQU4sR0FBYWhHLEVBQUV1RixNQUFGLEVBQVVyRSxJQUFWLENBQWUsZ0JBQWYsRUFBaUNoQixJQUFqQyxDQUFzQyxPQUF0QyxDQUFiO0FBQ0E2QixZQUFNa0UsTUFBTixHQUFhakcsRUFBRXVGLE1BQUYsRUFBVXJFLElBQVYsQ0FBZSxTQUFmLEVBQTBCaEIsSUFBMUIsQ0FBK0IsT0FBL0IsQ0FBYjtBQUNBO0FBN0JGO0FBK0JBO0FBQUEsUUFBTzZCO0FBQVA7QUFqREk7O0FBQUE7QUFrREo7QUFDRCxFQW5LZ0I7QUFvS2pCbUUsVUFwS2lCLHFCQW9LUDlELElBcEtPLEVBb0tGQyxjQXBLRSxFQW9LYTtBQUM3QixNQUFJOEQsTUFBSTlELGVBQWVpQixNQUFmLENBQXNCbEIsS0FBS2lCLE9BQUwsQ0FBYSxNQUFiLENBQXRCLENBQVI7QUFDQSxTQUFPLEVBQUNwRCxNQUFLLFdBQU4sRUFBbUJrRyxRQUFuQixFQUFQO0FBQ0EsRUF2S2dCO0FBd0tqQkMsSUF4S2lCLGVBd0tiaEUsSUF4S2EsRUF3S1I7QUFDUixTQUFPQSxLQUFLakIsUUFBTCxDQUFjK0IsTUFBZCxDQUFxQixVQUFDbUQsS0FBRCxFQUFPQyxJQUFQLEVBQWM7QUFDekMsV0FBT0EsS0FBS3JELElBQVo7QUFDQSxTQUFLLFNBQUw7QUFDQ29ELFdBQU16QyxFQUFOLEdBQVMwQyxJQUFUO0FBQ0Q7QUFDQSxTQUFLLFdBQUw7QUFDQ0QsV0FBTUUsSUFBTixHQUFXRCxLQUFLbkYsUUFBaEI7QUFDRDtBQUNBO0FBQ0NrRixXQUFNbEYsUUFBTixDQUFleUIsSUFBZixDQUFvQjBELElBQXBCO0FBUkQ7QUFVQSxVQUFPRCxLQUFQO0FBQ0EsR0FaTSxFQVlMLEVBQUNwRyxNQUFLLEtBQU4sRUFBWWtCLFVBQVMsRUFBckIsRUFBd0J5QyxJQUFHLElBQTNCLEVBQWdDMkMsTUFBSyxFQUFyQyxFQVpLLENBQVA7QUFhQSxFQXRMZ0I7QUF1TGpCQyxHQXZMaUIsY0F1TGRwRSxJQXZMYyxFQXVMVDtBQUNQLFNBQU9BLEtBQUtqQixRQUFMLENBQWMrQixNQUFkLENBQXFCLFVBQUNtRCxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLckQsSUFBWjtBQUNBLFNBQUssUUFBTDtBQUNDb0QsV0FBTXpDLEVBQU4sR0FBUzBDLElBQVQ7QUFDQUQsV0FBTUksUUFBTixHQUFlLENBQUMsQ0FBQ0gsS0FBS25GLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQjtBQUFBLGFBQUc4QixFQUFFQyxJQUFGLElBQVEsYUFBWDtBQUFBLE1BQW5CLENBQWpCO0FBQ0Q7QUFDQTtBQUNDb0QsV0FBTWxGLFFBQU4sQ0FBZXlCLElBQWYsQ0FBb0IwRCxJQUFwQjtBQU5EO0FBUUEsVUFBT0QsS0FBUDtBQUNBLEdBVk0sRUFVTCxFQUFDcEcsTUFBSyxJQUFOLEVBQVdrQixVQUFTLEVBQXBCLEVBQXVCeUMsSUFBRyxJQUExQixFQVZLLENBQVA7QUFXQSxFQW5NZ0I7QUFvTWpCOEMsR0FwTWlCLGNBb01kdEUsSUFwTWMsRUFvTVQ7QUFDUCxTQUFPQSxLQUFLakIsUUFBTCxDQUFjK0IsTUFBZCxDQUFxQixVQUFDbUQsS0FBRCxFQUFPQyxJQUFQLEVBQWM7QUFDekMsV0FBT0EsS0FBS3JELElBQVo7QUFDQSxTQUFLLFFBQUw7QUFDQ29ELFdBQU16QyxFQUFOLEdBQVMwQyxJQUFUO0FBQ0Q7QUFDQTtBQUNDRCxXQUFNbEYsUUFBTixDQUFleUIsSUFBZixDQUFvQjBELElBQXBCO0FBTEQ7QUFPQSxVQUFPRCxLQUFQO0FBQ0EsR0FUTSxFQVNMLEVBQUNwRyxNQUFLLElBQU4sRUFBV2tCLFVBQVMsRUFBcEIsRUFBdUJ5QyxJQUFHLElBQTFCLEVBVEssQ0FBUDtBQVVBLEVBL01nQjtBQWdOakIrQyxTQWhOaUIsb0JBZ05SdkUsSUFoTlEsRUFnTkZDLGNBaE5FLEVBZ05hO0FBQzdCLE1BQUl1RSxNQUFJeEUsS0FBS2lCLE9BQUwsQ0FBYSxNQUFiLENBQVI7QUFDQSxNQUFJd0QsT0FBS3hFLGVBQWVpQixNQUFmLENBQXNCc0QsR0FBdEIsQ0FBVDs7QUFFQSxNQUFJRSxXQUFTekUsZUFBZTBFLE1BQWYsR0FBc0IxRSxlQUFlekMsSUFBZixVQUEyQmdILEdBQTNCLFFBQW1DMUcsSUFBbkMsQ0FBd0MsUUFBeEMsQ0FBbkM7QUFDQSxNQUFJOEcsY0FBWTNFLGVBQWVSLEdBQWYsQ0FBbUJvRixZQUFuQix5QkFBc0RILFFBQXRELFNBQW9FNUcsSUFBcEUsQ0FBeUUsYUFBekUsQ0FBaEI7QUFDQSxTQUFPLEVBQUNELE1BQUssT0FBTixFQUFlNEcsVUFBZixFQUFxQkcsd0JBQXJCLEVBQVA7QUFDQSxFQXZOZ0I7QUF3TmpCRSxZQXhOaUIsdUJBd05MOUUsSUF4TkssRUF3TkE7QUFDaEIsU0FBTyxFQUFDbkMsTUFBSyxPQUFOLEVBQVA7QUFDQSxFQTFOZ0I7QUEyTmpCa0gsTUEzTmlCLGlCQTJOWC9FLElBM05XLEVBMk5OO0FBQ1YsU0FBTyxFQUFDbkMsTUFBSyxPQUFOLEVBQWVtSCxJQUFHaEYsS0FBS2lCLE9BQUwsQ0FBYSxXQUFiLENBQWxCLEVBQVA7QUFDQSxFQTdOZ0I7QUE4TmpCZ0UsWUE5TmlCLHVCQThOTGpGLElBOU5LLEVBOE5BO0FBQ2hCLFNBQU8sRUFBQ25DLE1BQUssYUFBTixFQUFvQm1ILElBQUdoRixLQUFLaUIsT0FBTCxDQUFhLGlCQUFiLENBQXZCLEVBQVA7QUFDQSxFQWhPZ0I7QUFpT2pCaUUsSUFqT2lCLGVBaU9ibEYsSUFqT2EsRUFpT1I7QUFDUixTQUFPLEVBQUNuQyxNQUFLLEtBQU4sRUFBWW1ILElBQUdoRixLQUFLaUIsT0FBTCxDQUFhLFNBQWIsQ0FBZixFQUF1Q2dFLGFBQVlqRixLQUFLakIsUUFBTCxDQUFjRCxJQUFkLENBQW1CO0FBQUEsV0FBRzhCLEVBQUVDLElBQUYsSUFBUSxpQkFBWDtBQUFBLElBQW5CLEVBQWlESSxPQUFqRCxDQUF5RCxPQUF6RCxDQUFuRCxFQUFQO0FBQ0EsRUFuT2dCO0FBb09qQmtFLGFBcE9pQiwwQkFvT0g7QUFDYixTQUFPLElBQVA7QUFDQSxFQXRPZ0I7QUF1T2pCQyxPQXZPaUIsa0JBdU9WcEYsSUF2T1UsRUF1T0xDLGNBdk9LLEVBdU9VO0FBQzFCLE1BQUlvRixNQUFJcEYsZUFBZVYsT0FBZixDQUF1QlMsSUFBdkIsRUFBNkJsQixJQUE3QixDQUFrQyxlQUFsQyxDQUFSO0FBQ0EsTUFBSWpCLE9BQUt3SCxJQUFJdkgsSUFBSixDQUFTLFFBQVQsQ0FBVDtBQUNBLE1BQUl3SCxRQUFNRCxJQUFJdkgsSUFBSixDQUFTLE1BQVQsTUFBbUIsT0FBN0I7QUFDQSxNQUFJMEcsTUFBSWEsSUFBSXZILElBQUosQ0FBUyxNQUFULENBQVI7QUFDQSxTQUFPLEVBQUNELE1BQUssUUFBTixFQUFleUgsWUFBZixFQUFzQkMsTUFBTTFILElBQTVCLEVBQWtDNEcsTUFBS3hFLGVBQWV1RixlQUFmLENBQStCaEIsR0FBL0IsQ0FBdkMsRUFBUDtBQUNBO0FBN09nQixDIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL29mZmljZURvY3VtZW50XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcclxuXHRfaW5pdCgpe1xyXG5cdFx0c3VwZXIuX2luaXQoKVxyXG5cdFx0Y29uc3Qgc3VwcG9ydGVkPVwic3R5bGVzLG51bWJlcmluZyx0aGVtZSxzZXR0aW5nc1wiLnNwbGl0KFwiLFwiKVxyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0aWYoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkhPS0xKXtcclxuXHRcdFx0XHRsZXQgdGFyZ2V0PSQuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xyXG5cdFx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHJcblx0XHR2YXIgJD10aGlzLnN0eWxlc1xyXG5cdFx0dGhpcy5zdHlsZXMucHJvdG90eXBlLmJhc2VzdD1mdW5jdGlvbihzZWxlY3Rvcil7XHJcblx0XHRcdGxldCBjdXJyZW50PXRoaXNcclxuXHRcdFx0d2hpbGUoY3VycmVudC5sZW5ndGg+MCl7XHJcblx0XHRcdFx0aWYoY3VycmVudC5pcyhzZWxlY3Rvcikpe1xyXG5cdFx0XHRcdFx0cmV0dXJuICQoY3VycmVudClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y3VycmVudD0kLnJvb3QoKS5maW5kKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtjdXJyZW50LmNoaWxkcmVuKFwid1xcXFw6YmFzZWRPblwiKS5hdHRyKFwidzp2YWxcIil9XCJdYClcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5ub3QodGhpcylcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xyXG5cdFx0bGV0IHN0eWxlcywgbnVtYmVyaW5nXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0c3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRudW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnksIHtzdHlsZXMsbnVtYmVyaW5nfSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aXRpZXM9e1xyXG5cdFx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdFx0bGV0IGVuZD0kKHNlY3QpLmNsb3Nlc3QoJ3dcXFxcOmJvZHk+KicpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0XHRzZWN0LmNvbnRlbnQucHVzaChlbmQuZ2V0KDApKVxyXG5cdFx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbn1cclxuXHRcdH0sXHJcblx0XHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGNvbnN0IGhmPXR5cGU9PndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09YHc6JHt0eXBlfVJlZmVyZW5jZWApLnJlZHVjZSgoaGVhZGVycyxhKT0+e1xyXG5cdFx0XHRcdFx0aGVhZGVycy5zZXQoYS5hdHRyaWJzW1widzp0eXBlXCJdLG9mZmljZURvY3VtZW50LmdldFJlbChhLmF0dHJpYnNbXCJyOmlkXCJdKSlcclxuXHRcdFx0XHRcdHJldHVybiBoZWFkZXJzXHJcblx0XHRcdFx0fSxuZXcgTWFwKCkpXHJcblxyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHR5cGU6XCJzZWN0aW9uXCIsXHJcblx0XHRcdFx0Y2hpbGRyZW46d1htbC5jb250ZW50LFxyXG5cdFx0XHRcdGhlYWRlcnM6aGYoXCJoZWFkZXJcIiksXHJcblx0XHRcdFx0Zm9vdGVyczpoZihcImZvb3RlclwiKSxcclxuXHRcdFx0XHRoYXNUaXRsZVBhZ2U6ICEhd1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRpdGxlUGdcIilcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0bGV0IG51bVByPXBQci5jaGlsZHJlbihcIndcXFxcOm51bVByXCIpXHJcblx0XHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50XHJcblx0XHRcdFx0XHRcdC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdYClcclxuXHRcdFx0XHRcdFx0LmJhc2VzdChgOmhhcyh3XFxcXDpudW1QcilgKVxyXG5cdFx0XHRcdFx0XHQuZmluZChcIndcXFxcOm51bVByXCIpXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQobnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpfHwwKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoc3R5bGVJZCAmJiBzdHlsZUlkLnN0YXJ0c1dpdGgoXCJIZWFkaW5nXCIpKXtcclxuXHRcdFx0XHRcdGxldCBvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50XHJcblx0XHRcdFx0XHRcdC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdYClcclxuXHRcdFx0XHRcdFx0LmJhc2VzdChcIjpoYXMod1xcXFw6b3V0bGluZUx2bClcIilcclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpXHJcblx0XHRcdFx0XHRcdC5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRcdGlkZW50aXR5Lm91dGxpbmU9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0XHR9LFxyXG5cdFx0cih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0XHR9LFxyXG5cdFx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHRcdH0sXHJcblxyXG5cdFx0aW5saW5lKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdHJldHVybiB7dHlwZTpgZHJhd2luZy5pbmxpbmVgLCBjaGlsZHJlbjokLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHRcdH0sXHJcblx0XHRhbmNob3Iod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCBncmFwaGljRGF0YT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKVxyXG5cdFx0XHRsZXQgdHlwZT1ncmFwaGljRGF0YS5hdHRyKFwidXJpXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdFx0aWYodHlwZT09XCJ3b3JkcHJvY2Vzc2luZ0dyb3VwXCIpXHJcblx0XHRcdFx0Y2hpbGRyZW49Y2hpbGRyZW5bMF0uY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZS5zcGxpdChcIjpcIilbMF0hPVwid3BnXCIpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHRcdHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCBibGlwPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIilcclxuXHRcdFx0bGV0IHJpZD1ibGlwLmF0dHIoJ3I6ZW1iZWQnKXx8YmxpcC5hdHRyKCdyOmxpbmsnKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwaWN0dXJlXCIsLi4ub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCl9XHJcblx0XHR9LFxyXG5cdFx0d3NwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwic2hhcGVcIiwgY2hpbGRyZW46b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiPndwc1xcXFw6dHhieD53XFxcXDp0eGJ4Q29udGVudFwiKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHRcdH0sXHJcblx0XHRGYWxsYmFjaygpe1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fSxcclxuXHRcdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHJcblx0XHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxyXG5cdFx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0XHRsZXQgdmFsdWU9Y29udGVudC50ZXh0KClcclxuXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LHBpY3R1cmUsZG9jUGFydExpc3QsY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3gscmVwZWF0aW5nU2VjdGlvbixyZXBlYXRpbmdTZWN0aW9uSXRlbVwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0XHRsZXQgbW9kZWw9e2NoaWxkcmVufVxyXG5cdFx0XHRcdGlmKHR5cGUpe1xyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1gY29udHJvbC4ke3R5cGV9YFxyXG5cdFx0XHRcdH1lbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0XHRtb2RlbC50eXBlPVwiYmxvY2tcIlxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9XCJpbmxpbmVcIlxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0JD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRcdFx0c3dpdGNoKG1vZGVsLnR5cGUpe1xyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuZHJvcERvd25MaXN0XCI6XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5jb21ib0JveFwiOntcclxuXHRcdFx0XHRcdFx0bGV0IHNlbGVjdGVkPSQoY29udGVudCkudGV4dCgpXHJcblx0XHRcdFx0XHRcdG1vZGVsLm9wdGlvbnM9JChlbFR5cGUpXHJcblx0XHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpsaXN0SXRlbVwiKVxyXG5cdFx0XHRcdFx0XHRcdC5tYXAoKGksbGkpPT57XHJcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5VGV4dDogbGkuYXR0cmlic1tcInc6ZGlzcGxheVRleHRcIl0sXHJcblx0XHRcdFx0XHRcdFx0XHRcdHZhbHVlOiBsaS5hdHRyaWJzW1widzp2YWx1ZVwiXVxyXG5cdFx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdFx0LmdldCgpXHJcblx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPShtb2RlbC5vcHRpb25zLmZpbmQoYT0+YS5kaXNwbGF5VGV4dD09c2VsZWN0ZWQpfHx7fSkudmFsdWVcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmNoZWNrYm94XCI6e1xyXG5cdFx0XHRcdFx0XHRsZXQgbnM9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpWzBdXHJcblx0XHRcdFx0XHRcdG1vZGVsLmNoZWNrZWQ9JChlbFR5cGUpLmZpbmQoYCR7bnN9XFxcXDpjaGVja2VkYCkuYXR0cihgJHtuc306dmFsYCk9PVwiMVwiXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC50ZXh0XCI6XHJcblx0XHRcdFx0XHRcdGlmKGNvbnRlbnQuZmluZCgnd1xcXFw6ciBbd1xcXFw6dmFsfj1QbGFjZWhvbGRlcl0nKS5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRcdFx0bW9kZWwudmFsdWU9Y29udGVudC50ZXh0KClcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmRhdGVcIjpcclxuXHRcdFx0XHRcdFx0bW9kZWwudmFsdWU9bmV3IERhdGUoJChlbFR5cGUpLmF0dHIoXCJ3OmZ1bGxEYXRlXCIpKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5mb3JtYXQ9JChlbFR5cGUpLmZpbmQoXCJ3XFxcXDpkYXRlRm9ybWF0XCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0XHRtb2RlbC5sb2NhbGU9JChlbFR5cGUpLmZpbmQoXCJ3XFxcXDpsaWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdFx0fSxcclxuXHRcdHRibCh3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHRcdH0sXHJcblx0XHR0cih3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdHRjKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdFx0fSxcclxuXHRcdGFsdENodW5rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IHJJZD13WG1sLmF0dHJpYnNbJ3I6aWQnXVxyXG5cdFx0XHRsZXQgZGF0YT1vZmZpY2VEb2N1bWVudC5nZXRSZWwocklkKVxyXG5cclxuXHRcdFx0bGV0IHBhcnROYW1lPW9mZmljZURvY3VtZW50LmZvbGRlcitvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0bGV0IGNvbnRlbnRUeXBlPW9mZmljZURvY3VtZW50LmRvYy5jb250ZW50VHlwZXMoYE92ZXJyaWRlW1BhcnROYW1lPScke3BhcnROYW1lfSddYCkuYXR0cihcIkNvbnRlbnRUeXBlXCIpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImNodW5rXCIsIGRhdGEsIGNvbnRlbnRUeXBlfVxyXG5cdFx0fSxcclxuXHRcdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdFx0fSxcclxuXHRcdHN0eWxlKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdFx0fSxcclxuXHRcdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJhYnN0cmFjdE51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXX1cclxuXHRcdH0sXHJcblx0XHRudW0od1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcIm51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sYWJzdHJhY3ROdW06d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdFx0fSxcclxuXHRcdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fSxcclxuXHRcdG9iamVjdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IG9sZT1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCJvXFxcXDpPTEVPYmplY3RcIilcclxuXHRcdFx0bGV0IHR5cGU9b2xlLmF0dHIoXCJQcm9nSURcIilcclxuXHRcdFx0bGV0IGVtYmVkPW9sZS5hdHRyKFwiVHlwZVwiKT09PVwiRW1iZWRcIlxyXG5cdFx0XHRsZXQgcklkPW9sZS5hdHRyKFwicjppZFwiKVxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJvYmplY3RcIixlbWJlZCwgcHJvZzogdHlwZSwgZGF0YTpvZmZpY2VEb2N1bWVudC5nZXRSZWxPbGVPYmplY3QocklkKX1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19