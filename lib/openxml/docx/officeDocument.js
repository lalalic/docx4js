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
						model.value = $(content).text();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50Iiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY3VycmVudCIsImNoaWxkcmVuIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJhdHRyaWJzIiwiZ2V0UmVsIiwiTWFwIiwiZm9vdGVycyIsImhhc1RpdGxlUGFnZSIsImZpbmQiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwiYmxpcCIsInJpZCIsIndzcCIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwic2VsZWN0ZWQiLCJvcHRpb25zIiwibWFwIiwibGkiLCJkaXNwbGF5VGV4dCIsIm5zIiwiY2hlY2tlZCIsIkRhdGUiLCJmb3JtYXQiLCJsb2NhbGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJpZCIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Iiwib2xlIiwiZW1iZWQiLCJwcm9nIiwiZ2V0UmVsT2xlT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLE9BQU1DLFlBQVUsa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZVAsS0FBZixDQUFxQixHQUFyQixFQUEwQlEsR0FBMUIsRUFBVDtBQUNBLFFBQUdULFVBQVVVLE9BQVYsQ0FBa0JILElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5QixVQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLGFBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxVQUQrQixpQkFDMUI7QUFDSixlQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixPQUFoQztBQUY4QjtBQU85QjtBQUNELElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFB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QUFPLEVBQUN4QixNQUFLLEtBQU4sRUFBWTRHLElBQUdwRixLQUFLcUIsT0FBTCxDQUFhLFNBQWIsQ0FBZixFQUF1Q2dFLGFBQVlyRixLQUFLSyxRQUFMLENBQWNxQixJQUFkLENBQW1CO0FBQUEsV0FBR1QsRUFBRWYsSUFBRixJQUFRLGlCQUFYO0FBQUEsSUFBbkIsRUFBaURtQixPQUFqRCxDQUF5RCxPQUF6RCxDQUFuRCxFQUFQO0FBQ0EsRUE1TmU7QUE2TmhCa0UsYUE3TmdCLDBCQTZORjtBQUNiLFNBQU8sSUFBUDtBQUNBLEVBL05lO0FBZ09oQkMsT0FoT2dCLGtCQWdPVHhGLElBaE9TLEVBZ09KUixjQWhPSSxFQWdPVztBQUMxQixNQUFJaUcsTUFBSWpHLGVBQWVGLE9BQWYsQ0FBdUJVLElBQXZCLEVBQTZCMEIsSUFBN0IsQ0FBa0MsZUFBbEMsQ0FBUjtBQUNBLE1BQUlsRCxPQUFLaUgsSUFBSWhILElBQUosQ0FBUyxRQUFULENBQVQ7QUFDQSxNQUFJaUgsUUFBTUQsSUFBSWhILElBQUosQ0FBUyxNQUFULE1BQW1CLE9BQTdCO0FBQ0EsTUFBSW1HLE1BQUlhLElBQUloSCxJQUFKLENBQVMsTUFBVCxDQUFSO0FBQ0EsU0FBTyxFQUFDRCxNQUFLLFFBQU4sRUFBZWtILFlBQWYsRUFBc0JDLE1BQU1uSCxJQUE1QixFQUFrQ3FHLE1BQUtyRixlQUFlb0csZUFBZixDQUErQmhCLEdBQS9CLENBQXZDLEVBQVA7QUFDQTtBQXRPZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdGNvbnN0IHN1cHBvcnRlZD1cInN0eWxlcyxudW1iZXJpbmcsdGhlbWUsc2V0dGluZ3NcIi5zcGxpdChcIixcIilcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdGlmKHN1cHBvcnRlZC5pbmRleE9mKHR5cGUpIT0tMSl7XHJcblx0XHRcdFx0bGV0IHRhcmdldD0kLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyx0eXBlLHtcclxuXHRcdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdHRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHR0aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LCBpZGVudGlmeSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9b2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYobW9kZWwgJiYgdHlwZW9mKG1vZGVsKT09XCJvYmplY3RcIil7XHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGlmKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0ZG9jLmRvY3VtZW50PXRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gZG9jXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKGlkZW50aXRpZXNbdGFnXSlcclxuXHRcdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0bGV0IGNoaWxkcmVuPSQoXCJ3XFxcXDpzZWN0UHJcIikuZWFjaCgoaSxzZWN0KT0+e1xyXG5cdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRpZighZW5kLmlzKHNlY3QpKVxyXG5cdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHR9KS50b0FycmF5KClcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdH0sXHJcblx0c2VjdFByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgaGY9dHlwZT0+d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lPT1gdzoke3R5cGV9UmVmZXJlbmNlYCkucmVkdWNlKChoZWFkZXJzLGEpPT57XHJcblx0XHRcdFx0aGVhZGVycy5zZXQoYS5hdHRyaWJzW1widzp0eXBlXCJdLG9mZmljZURvY3VtZW50LmdldFJlbChhLmF0dHJpYnNbXCJyOmlkXCJdKSlcclxuXHRcdFx0XHRyZXR1cm4gaGVhZGVyc1xyXG5cdFx0XHR9LG5ldyBNYXAoKSlcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR0eXBlOlwic2VjdGlvblwiLFxyXG5cdFx0XHRjaGlsZHJlbjp3WG1sLmNvbnRlbnQsXHJcblx0XHRcdGhlYWRlcnM6aGYoXCJoZWFkZXJcIiksXHJcblx0XHRcdGZvb3RlcnM6aGYoXCJmb290ZXJcIiksXHJcblx0XHRcdGhhc1RpdGxlUGFnZTogISF3WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGl0bGVQZ1wiKVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByPndcXFxcOm51bUlkYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aXR5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHJcblx0aW5saW5lKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0cmV0dXJuIHt0eXBlOmBkcmF3aW5nLmlubGluZWAsIGNoaWxkcmVuOiQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdH0sXHJcblx0YW5jaG9yKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBncmFwaGljRGF0YT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKVxyXG5cdFx0bGV0IHR5cGU9Z3JhcGhpY0RhdGEuYXR0cihcInVyaVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdGxldCBjaGlsZHJlbj1ncmFwaGljRGF0YS5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cdFx0aWYodHlwZT09XCJ3b3JkcHJvY2Vzc2luZ0dyb3VwXCIpXHJcblx0XHRcdGNoaWxkcmVuPWNoaWxkcmVuWzBdLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUuc3BsaXQoXCI6XCIpWzBdIT1cIndwZ1wiKVxyXG5cclxuXHRcdHJldHVybiB7dHlwZTpcImRyYXdpbmcuYW5jaG9yXCIsY2hpbGRyZW59XHJcblx0fSxcclxuXHRwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IGJsaXA9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiYVxcXFw6YmxpcFwiKVxyXG5cdFx0bGV0IHJpZD1ibGlwLmF0dHIoJ3I6ZW1iZWQnKXx8YmxpcC5hdHRyKCdyOmxpbmsnKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwicGljdHVyZVwiLC4uLm9mZmljZURvY3VtZW50LmdldFJlbChyaWQpfVxyXG5cdH0sXHJcblx0d3NwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdHJldHVybiB7dHlwZTpcInNoYXBlXCIsIGNoaWxkcmVuOm9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcIj53cHNcXFxcOnR4Yng+d1xcXFw6dHhieENvbnRlbnRcIikuY2hpbGRyZW4oKS50b0FycmF5KCl9XHJcblx0fSxcclxuXHRGYWxsYmFjaygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94LHJlcGVhdGluZ1NlY3Rpb24scmVwZWF0aW5nU2VjdGlvbkl0ZW1cIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRsZXQgbW9kZWw9e2NoaWxkcmVufVxyXG5cdFx0XHRpZih0eXBlKXtcclxuXHRcdFx0XHRtb2RlbC50eXBlPWBjb250cm9sLiR7dHlwZX1gXHJcblx0XHRcdH1lbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdG1vZGVsLnR5cGU9XCJibG9ja1wiXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRtb2RlbC50eXBlPVwiaW5saW5lXCJcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdCQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0XHRzd2l0Y2gobW9kZWwudHlwZSl7XHJcblx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuZHJvcERvd25MaXN0XCI6XHRcclxuXHRcdFx0XHRjYXNlIFwiY29udHJvbC5jb21ib0JveFwiOntcclxuXHRcdFx0XHRcdGxldCBzZWxlY3RlZD0kKGNvbnRlbnQpLnRleHQoKVxyXG5cdFx0XHRcdFx0bW9kZWwub3B0aW9ucz0kKGVsVHlwZSlcclxuXHRcdFx0XHRcdFx0LmZpbmQoXCJ3XFxcXDpsaXN0SXRlbVwiKVxyXG5cdFx0XHRcdFx0XHQubWFwKChpLGxpKT0+e1xyXG5cdFx0XHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdFx0XHRkaXNwbGF5VGV4dDogbGkuYXR0cmlic1tcInc6ZGlzcGxheVRleHRcIl0sXHJcblx0XHRcdFx0XHRcdFx0XHR2YWx1ZTogbGkuYXR0cmlic1tcInc6dmFsdWVcIl1cclxuXHRcdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHRcdC5nZXQoKVxyXG5cdFx0XHRcdFx0bW9kZWwudmFsdWU9KG1vZGVsLm9wdGlvbnMuZmluZChhPT5hLmRpc3BsYXlUZXh0PT1zZWxlY3RlZCl8fHt9KS52YWx1ZVxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuY2hlY2tib3hcIjp7XHJcblx0XHRcdFx0XHRsZXQgbnM9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpWzBdXHJcblx0XHRcdFx0XHRtb2RlbC5jaGVja2VkPSQoZWxUeXBlKS5maW5kKGAke25zfVxcXFw6Y2hlY2tlZGApLmF0dHIoYCR7bnN9OnZhbGApPT1cIjFcIlxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y2FzZSBcImNvbnRyb2wudGV4dFwiOlxyXG5cdFx0XHRcdFx0bW9kZWwudmFsdWU9JChjb250ZW50KS50ZXh0KClcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuZGF0ZVwiOlxyXG5cdFx0XHRcdFx0bW9kZWwudmFsdWU9bmV3IERhdGUoJChlbFR5cGUpLmF0dHIoXCJ3OmZ1bGxEYXRlXCIpKVxyXG5cdFx0XHRcdFx0bW9kZWwuZm9ybWF0PSQoZWxUeXBlKS5maW5kKFwid1xcXFw6ZGF0ZUZvcm1hdFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdG1vZGVsLmxvY2FsZT0kKGVsVHlwZSkuZmluZChcIndcXFxcOmxpZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblx0fSxcclxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cclxuXHR9LFxyXG5cdHRibCh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXHJcblx0fSxcclxuXHR0cih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHR0Yyh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRjUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRjXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHRhbHRDaHVuayh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgcklkPXdYbWwuYXR0cmlic1sncjppZCddXHJcblx0XHRsZXQgZGF0YT1vZmZpY2VEb2N1bWVudC5nZXRSZWwocklkKVxyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1vZmZpY2VEb2N1bWVudC5mb2xkZXIrb2ZmaWNlRG9jdW1lbnQucmVscyhgW0lkPSR7cklkfV1gKS5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRsZXQgY29udGVudFR5cGU9b2ZmaWNlRG9jdW1lbnQuZG9jLmNvbnRlbnRUeXBlcyhgT3ZlcnJpZGVbUGFydE5hbWU9JyR7cGFydE5hbWV9J11gKS5hdHRyKFwiQ29udGVudFR5cGVcIilcclxuXHRcdHJldHVybiB7dHlwZTpcImNodW5rXCIsIGRhdGEsIGNvbnRlbnRUeXBlfVxyXG5cdH0sXHJcblx0ZG9jRGVmYXVsdHMod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdH0sXHJcblx0c3R5bGUod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdH0sXHJcblx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJhYnN0cmFjdE51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXX1cclxuXHR9LFxyXG5cdG51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sYWJzdHJhY3ROdW06d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdH0sXHJcblx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH0sXHJcblx0b2JqZWN0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IG9sZT1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCJvXFxcXDpPTEVPYmplY3RcIilcclxuXHRcdGxldCB0eXBlPW9sZS5hdHRyKFwiUHJvZ0lEXCIpXHJcblx0XHRsZXQgZW1iZWQ9b2xlLmF0dHIoXCJUeXBlXCIpPT09XCJFbWJlZFwiXHJcblx0XHRsZXQgcklkPW9sZS5hdHRyKFwicjppZFwiKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwib2JqZWN0XCIsZW1iZWQsIHByb2c6IHR5cGUsIGRhdGE6b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsT2xlT2JqZWN0KHJJZCl9XHJcblx0fVxyXG59XHJcbiJdfQ==