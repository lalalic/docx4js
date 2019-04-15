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
			var _ret = function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiX2Fzc2lnblJlbCIsInNwbGl0IiwiJCIsInN0eWxlcyIsInByb3RvdHlwZSIsImJhc2VzdCIsInNlbGVjdG9yIiwiY3VycmVudCIsImxlbmd0aCIsImlzIiwicm9vdCIsImZpbmQiLCJjaGlsZHJlbiIsImF0dHIiLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJ0eXBlIiwiZG9jdW1lbnQiLCJpZGVudGl0aWVzIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiZWFjaCIsImkiLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInRvQXJyYXkiLCJyZXZlcnNlIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJoZWFkZXJzIiwic2V0IiwiYXR0cmlicyIsImdldFJlbCIsIk1hcCIsImZvb3RlcnMiLCJoYXNUaXRsZVBhZ2UiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJwYXJzZUludCIsInN0YXJ0c1dpdGgiLCJvdXRsaW5lTHZsIiwib3V0bGluZSIsInIiLCJmbGRDaGFyIiwiaW5saW5lIiwiYW5jaG9yIiwiZ3JhcGhpY0RhdGEiLCJwb3AiLCJwaWMiLCJibGlwIiwicmlkIiwid3NwIiwiRmFsbGJhY2siLCJzZHQiLCJlbEJpbmRpbmciLCJwYXRoIiwiZCIsInZhbHVlIiwidGV4dCIsInByQ2hpbGRyZW4iLCJlbFR5cGUiLCJzZWxlY3RlZCIsIm9wdGlvbnMiLCJtYXAiLCJsaSIsImRpc3BsYXlUZXh0IiwibnMiLCJjaGVja2VkIiwiRGF0ZSIsImZvcm1hdCIsImxvY2FsZSIsImh5cGVybGluayIsInVybCIsInRibCIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwidGMiLCJhbHRDaHVuayIsInJJZCIsImRhdGEiLCJwYXJ0TmFtZSIsImZvbGRlciIsInJlbHMiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJpZCIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Iiwib2xlIiwiZW1iZWQiLCJwcm9nIiwiZ2V0UmVsT2xlT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUNOO0FBQ0EsUUFBS0EsVUFBTCxDQUFnQiw0QkFBNEJDLEtBQTVCLENBQWtDLEdBQWxDLENBQWhCOztBQUVBLE9BQUlDLElBQUUsS0FBS0MsTUFBWDtBQUNBLFFBQUtBLE1BQUwsQ0FBWUMsU0FBWixDQUFzQkMsTUFBdEIsR0FBNkIsVUFBU0MsUUFBVCxFQUFrQjtBQUM5QyxRQUFJQyxVQUFRLElBQVo7QUFDQSxXQUFNQSxRQUFRQyxNQUFSLEdBQWUsQ0FBckIsRUFBdUI7QUFDdEIsU0FBR0QsUUFBUUUsRUFBUixDQUFXSCxRQUFYLENBQUgsRUFBd0I7QUFDdkIsYUFBT0osRUFBRUssT0FBRixDQUFQO0FBQ0E7QUFDREEsZUFBUUwsRUFBRVEsSUFBRixHQUFTQyxJQUFULDhCQUF3Q0osUUFBUUssUUFBUixDQUFpQixhQUFqQixFQUFnQ0MsSUFBaEMsQ0FBcUMsT0FBckMsQ0FBeEMsU0FBUjtBQUNBO0FBQ0QsV0FBTyxLQUFLQyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0EsSUFURDtBQVVBOzs7eUJBRU1DLGEsRUFBeUU7QUFBQSxPQUExREMsUUFBMEQsdUVBQWpELEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxD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RSxJQWpPaUIsZUFpT2J0RixJQWpPYSxFQWlPUjtBQUNSLFNBQU8sRUFBQ0gsTUFBSyxLQUFOLEVBQVl1RixJQUFHcEYsS0FBS21CLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUNrRSxhQUFZckYsS0FBS3BCLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQjtBQUFBLFdBQUdtQyxFQUFFQyxJQUFGLElBQVEsaUJBQVg7QUFBQSxJQUFuQixFQUFpREksT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBbk9nQjtBQW9PakJvRSxhQXBPaUIsMEJBb09IO0FBQ2IsU0FBTyxJQUFQO0FBQ0EsRUF0T2dCO0FBdU9qQkMsT0F2T2lCLGtCQXVPVnhGLElBdk9VLEVBdU9MQyxjQXZPSyxFQXVPVTtBQUMxQixNQUFJd0YsTUFBSXhGLGVBQWVYLE9BQWYsQ0FBdUJVLElBQXZCLEVBQTZCckIsSUFBN0IsQ0FBa0MsZUFBbEMsQ0FBUjtBQUNBLE1BQUlrQixPQUFLNEYsSUFBSTVHLElBQUosQ0FBUyxRQUFULENBQVQ7QUFDQSxNQUFJNkcsUUFBTUQsSUFBSTVHLElBQUosQ0FBUyxNQUFULE1BQW1CLE9BQTdCO0FBQ0EsTUFBSThGLE1BQUljLElBQUk1RyxJQUFKLENBQVMsTUFBVCxDQUFSO0FBQ0EsU0FBTyxFQUFDZ0IsTUFBSyxRQUFOLEVBQWU2RixZQUFmLEVBQXNCQyxNQUFNOUYsSUFBNUIsRUFBa0MrRSxNQUFLM0UsZUFBZTJGLGVBQWYsQ0FBK0JqQixHQUEvQixDQUF2QyxFQUFQO0FBQ0E7QUE3T2dCLEMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHR0aGlzLl9hc3NpZ25SZWwoXCJzdHlsZXMsbnVtYmVyaW5nLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpKVxyXG5cclxuXHRcdHZhciAkPXRoaXMuc3R5bGVzXHJcblx0XHR0aGlzLnN0eWxlcy5wcm90b3R5cGUuYmFzZXN0PWZ1bmN0aW9uKHNlbGVjdG9yKXtcclxuXHRcdFx0bGV0IGN1cnJlbnQ9dGhpc1xyXG5cdFx0XHR3aGlsZShjdXJyZW50Lmxlbmd0aD4wKXtcclxuXHRcdFx0XHRpZihjdXJyZW50LmlzKHNlbGVjdG9yKSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gJChjdXJyZW50KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjdXJyZW50PSQucm9vdCgpLmZpbmQoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke2N1cnJlbnQuY2hpbGRyZW4oXCJ3XFxcXDpiYXNlZE9uXCIpLmF0dHIoXCJ3OnZhbFwiKX1cIl1gKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB0aGlzLm5vdCh0aGlzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PXRoaXMuY29uc3RydWN0b3IuaWRlbnRpZnkuYmluZCh0aGlzLmNvbnN0cnVjdG9yKSl7XHJcblx0XHRsZXQgc3R5bGVzLCBudW1iZXJpbmdcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRzdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdG51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LCBpZGVudGlmeSwge3N0eWxlcyxudW1iZXJpbmd9KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYobW9kZWwgJiYgdHlwZW9mKG1vZGVsKT09XCJvYmplY3RcIil7XHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGlmKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gZG9jXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpdGllcz17XHJcblx0XHRkb2N1bWVudCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRcdGxldCBjaGlsZHJlbj0kKFwid1xcXFw6c2VjdFByXCIpLmVhY2goKGksc2VjdCk9PntcclxuXHRcdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdFx0aWYoIWVuZC5pcyhzZWN0KSlcclxuXHRcdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdFx0fSkudG9BcnJheSgpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdFx0fSxcclxuXHRcdHNlY3RQcih3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0Y29uc3QgaGY9dHlwZT0+d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1gdzoke3R5cGV9UmVmZXJlbmNlYCkucmVkdWNlKChoZWFkZXJzLGEpPT57XHJcblx0XHRcdFx0XHRoZWFkZXJzLnNldChhLmF0dHJpYnNbXCJ3OnR5cGVcIl0sb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGEuYXR0cmlic1tcInI6aWRcIl0pKVxyXG5cdFx0XHRcdFx0cmV0dXJuIGhlYWRlcnNcclxuXHRcdFx0XHR9LG5ldyBNYXAoKSlcclxuXHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0dHlwZTpcInNlY3Rpb25cIixcclxuXHRcdFx0XHRjaGlsZHJlbjp3WG1sLmNvbnRlbnQsXHJcblx0XHRcdFx0aGVhZGVyczpoZihcImhlYWRlclwiKSxcclxuXHRcdFx0XHRmb290ZXJzOmhmKFwiZm9vdGVyXCIpLFxyXG5cdFx0XHRcdGhhc1RpdGxlUGFnZTogISF3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGl0bGVQZ1wiKVxyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRsZXQgbnVtUHI9cFByLmNoaWxkcmVuKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnRcclxuXHRcdFx0XHRcdFx0LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl1gKVxyXG5cdFx0XHRcdFx0XHQuYmFzZXN0KGA6aGFzKHdcXFxcOm51bVByKWApXHJcblx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6bnVtUHJcIilcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChudW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIil8fDApXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihzdHlsZUlkICYmIHN0eWxlSWQuc3RhcnRzV2l0aChcIkhlYWRpbmdcIikpe1xyXG5cdFx0XHRcdFx0bGV0IG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnRcclxuXHRcdFx0XHRcdFx0LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl1gKVxyXG5cdFx0XHRcdFx0XHQuYmFzZXN0KFwiOmhhcyh3XFxcXDpvdXRsaW5lTHZsKVwiKVxyXG5cdFx0XHRcdFx0XHQuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIilcclxuXHRcdFx0XHRcdFx0LmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdFx0aWRlbnRpdHkub3V0bGluZT1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHRcdH0sXHJcblx0XHRyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHRcdH0sXHJcblx0XHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdFx0fSxcclxuXHJcblx0XHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0cmV0dXJuIHt0eXBlOmBkcmF3aW5nLmlubGluZWAsIGNoaWxkcmVuOiQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdFx0fSxcclxuXHRcdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdFx0bGV0IGdyYXBoaWNEYXRhPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpXHJcblx0XHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGxldCBjaGlsZHJlbj1ncmFwaGljRGF0YS5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cdFx0XHRpZih0eXBlPT1cIndvcmRwcm9jZXNzaW5nR3JvdXBcIilcclxuXHRcdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImRyYXdpbmcuYW5jaG9yXCIsY2hpbGRyZW59XHJcblx0XHR9LFxyXG5cdFx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdFx0bGV0IGJsaXA9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiYVxcXFw6YmxpcFwiKVxyXG5cdFx0XHRsZXQgcmlkPWJsaXAuYXR0cigncjplbWJlZCcpfHxibGlwLmF0dHIoJ3I6bGluaycpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKX1cclxuXHRcdH0sXHJcblx0XHR3c3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJzaGFwZVwiLCBjaGlsZHJlbjpvZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCI+d3BzXFxcXDp0eGJ4PndcXFxcOnR4YnhDb250ZW50XCIpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdFx0fSxcclxuXHRcdEZhbGxiYWNrKCl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9LFxyXG5cdFx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveCxyZXBlYXRpbmdTZWN0aW9uLHJlcGVhdGluZ1NlY3Rpb25JdGVtXCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRcdGxldCBtb2RlbD17Y2hpbGRyZW59XHJcblx0XHRcdFx0aWYodHlwZSl7XHJcblx0XHRcdFx0XHRtb2RlbC50eXBlPWBjb250cm9sLiR7dHlwZX1gXHJcblx0XHRcdFx0fWVsc2V7Ly9jb250YWluZXJcclxuXHRcdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRcdG1vZGVsLnR5cGU9XCJibG9ja1wiXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0bW9kZWwudHlwZT1cImlubGluZVwiXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHQkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdFx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdFx0XHRjYXNlIFwiY29udHJvbC5kcm9wRG93bkxpc3RcIjpcclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLmNvbWJvQm94XCI6e1xyXG5cdFx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQ9JChjb250ZW50KS50ZXh0KClcclxuXHRcdFx0XHRcdFx0bW9kZWwub3B0aW9ucz0kKGVsVHlwZSlcclxuXHRcdFx0XHRcdFx0XHQuZmluZChcIndcXFxcOmxpc3RJdGVtXCIpXHJcblx0XHRcdFx0XHRcdFx0Lm1hcCgoaSxsaSk9PntcclxuXHRcdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRcdGRpc3BsYXlUZXh0OiBsaS5hdHRyaWJzW1widzpkaXNwbGF5VGV4dFwiXSxcclxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGxpLmF0dHJpYnNbXCJ3OnZhbHVlXCJdXHJcblx0XHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdFx0XHQuZ2V0KClcclxuXHRcdFx0XHRcdFx0bW9kZWwudmFsdWU9KG1vZGVsLm9wdGlvbnMuZmluZChhPT5hLmRpc3BsYXlUZXh0PT1zZWxlY3RlZCl8fHt9KS52YWx1ZVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuY2hlY2tib3hcIjp7XHJcblx0XHRcdFx0XHRcdGxldCBucz1lbFR5cGUubmFtZS5zcGxpdChcIjpcIilbMF1cclxuXHRcdFx0XHRcdFx0bW9kZWwuY2hlY2tlZD0kKGVsVHlwZSkuZmluZChgJHtuc31cXFxcOmNoZWNrZWRgKS5hdHRyKGAke25zfTp2YWxgKT09XCIxXCJcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNhc2UgXCJjb250cm9sLnRleHRcIjpcclxuXHRcdFx0XHRcdFx0aWYoY29udGVudC5maW5kKCd3XFxcXDpyIFt3XFxcXDp2YWx+PVBsYWNlaG9sZGVyXScpLmxlbmd0aD09MClcclxuXHRcdFx0XHRcdFx0XHRtb2RlbC52YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cdFx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuZGF0ZVwiOlxyXG5cdFx0XHRcdFx0XHRtb2RlbC52YWx1ZT1uZXcgRGF0ZSgkKGVsVHlwZSkuYXR0cihcInc6ZnVsbERhdGVcIikpXHJcblx0XHRcdFx0XHRcdG1vZGVsLmZvcm1hdD0kKGVsVHlwZSkuZmluZChcIndcXFxcOmRhdGVGb3JtYXRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRcdG1vZGVsLmxvY2FsZT0kKGVsVHlwZSkuZmluZChcIndcXFxcOmxpZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHRcdH1cclxuXHRcdH0sXHJcblx0XHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0XHR9LFxyXG5cdFx0dGJsKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdFx0fSxcclxuXHRcdHRyKHdYbWwpe1xyXG5cdFx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0XHR9LFxyXG5cdFx0dGMod1htbCl7XHJcblx0XHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0XHRjYXNlIFwidzp0Y1ByXCI6XHJcblx0XHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdFx0fSx7dHlwZTpcInRjXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0XHR9LFxyXG5cdFx0YWx0Q2h1bmsod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgcklkPXdYbWwuYXR0cmlic1sncjppZCddXHJcblx0XHRcdGxldCBkYXRhPW9mZmljZURvY3VtZW50LmdldFJlbChySWQpXHJcblxyXG5cdFx0XHRsZXQgcGFydE5hbWU9b2ZmaWNlRG9jdW1lbnQuZm9sZGVyK29mZmljZURvY3VtZW50LnJlbHMoYFtJZD0ke3JJZH1dYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRsZXQgY29udGVudFR5cGU9b2ZmaWNlRG9jdW1lbnQuZG9jLmNvbnRlbnRUeXBlcyhgT3ZlcnJpZGVbUGFydE5hbWU9JyR7cGFydE5hbWV9J11gKS5hdHRyKFwiQ29udGVudFR5cGVcIilcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwiY2h1bmtcIiwgZGF0YSwgY29udGVudFR5cGV9XHJcblx0XHR9LFxyXG5cdFx0ZG9jRGVmYXVsdHMod1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCJ9XHJcblx0XHR9LFxyXG5cdFx0c3R5bGUod1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0XHR9LFxyXG5cdFx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRcdHJldHVybiB7dHlwZTpcImFic3RyYWN0TnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdfVxyXG5cdFx0fSxcclxuXHRcdG51bSh3WG1sKXtcclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwibnVtXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxhYnN0cmFjdE51bTp3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6YWJzdHJhY3ROdW1JZFwiKS5hdHRyaWJzW1widzp2YWxcIl19XHJcblx0XHR9LFxyXG5cdFx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9LFxyXG5cdFx0b2JqZWN0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0XHRsZXQgb2xlPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcIm9cXFxcOk9MRU9iamVjdFwiKVxyXG5cdFx0XHRsZXQgdHlwZT1vbGUuYXR0cihcIlByb2dJRFwiKVxyXG5cdFx0XHRsZXQgZW1iZWQ9b2xlLmF0dHIoXCJUeXBlXCIpPT09XCJFbWJlZFwiXHJcblx0XHRcdGxldCBySWQ9b2xlLmF0dHIoXCJyOmlkXCIpXHJcblx0XHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGVtYmVkLCBwcm9nOiB0eXBlLCBkYXRhOm9mZmljZURvY3VtZW50LmdldFJlbE9sZU9iamVjdChySWQpfVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=