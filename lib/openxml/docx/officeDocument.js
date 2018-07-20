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

			var styles = void 0,
			    numbering = void 0;
			if (this.styles) styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, identify);
			if (this.numbering) numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, identify);
			return this.renderNode(this.content("w\\:document").get(0), createElement, identify, { styles: styles, numbering: numbering });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsIm51bWJlcmluZyIsInJlbmRlck5vZGUiLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50Iiwid1htbCIsInRhZyIsIm5hbWUiLCJpZGVudGl0aWVzIiwiY3VycmVudCIsImNoaWxkcmVuIiwic2VjdCIsImVuZCIsImNsb3Nlc3QiLCJwcmV2VW50aWwiLCJ0b0FycmF5IiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJhdHRyaWJzIiwiZ2V0UmVsIiwiTWFwIiwiZm9vdGVycyIsImhhc1RpdGxlUGFnZSIsImZpbmQiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwicGFyc2VJbnQiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwiYmxpcCIsInJpZCIsIndzcCIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwic2VsZWN0ZWQiLCJvcHRpb25zIiwibWFwIiwibGkiLCJkaXNwbGF5VGV4dCIsIm5zIiwiY2hlY2tlZCIsIkRhdGUiLCJmb3JtYXQiLCJsb2NhbGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJjb250ZW50VHlwZSIsImNvbnRlbnRUeXBlcyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJpZCIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Iiwib2xlIiwiZW1iZWQiLCJwcm9nIiwiZ2V0UmVsT2xlT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLE9BQU1DLFlBQVUsa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZVAsS0FBZixDQUFxQixHQUFyQixFQUEwQlEsR0FBMUIsRUFBVDtBQUNBLFFBQUdULFVBQVVVLE9BQVYsQ0FBa0JILElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5QixVQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLGFBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxVQUQrQixpQkFDMUI7QUFDSixlQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixPQUFoQztBQUY4QjtBQU85QjtBQUNELElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFB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TkksRUF3TkM7QUFDaEIsU0FBTyxFQUFDeEIsTUFBSyxhQUFOLEVBQW9CNEcsSUFBR3BGLEtBQUtxQixPQUFMLENBQWEsaUJBQWIsQ0FBdkIsRUFBUDtBQUNBLEVBMU5lO0FBMk5oQmlFLElBM05nQixlQTJOWnRGLElBM05ZLEVBMk5QO0FBQ1IsU0FBTyxFQUFDeEIsTUFBSyxLQUFOLEVBQVk0RyxJQUFHcEYsS0FBS3FCLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUNnRSxhQUFZckYsS0FBS0ssUUFBTCxDQUFjcUIsSUFBZCxDQUFtQjtBQUFBLFdBQUdULEVBQUVmLElBQUYsSUFBUSxpQkFBWDtBQUFBLElBQW5CLEVBQWlEbUIsT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBN05lO0FBOE5oQmtFLGFBOU5nQiwwQkE4TkY7QUFDYixTQUFPLElBQVA7QUFDQSxFQWhPZTtBQWlPaEJDLE9Bak9nQixrQkFpT1R4RixJQWpPUyxFQWlPSlIsY0FqT0ksRUFpT1c7QUFDMUIsTUFBSWlHLE1BQUlqRyxlQUFlRixPQUFmLENBQXVCVSxJQUF2QixFQUE2QjBCLElBQTdCLENBQWtDLGVBQWxDLENBQVI7QUFDQSxNQUFJbEQsT0FBS2lILElBQUloSCxJQUFKLENBQVMsUUFBVCxDQUFUO0FBQ0EsTUFBSWlILFFBQU1ELElBQUloSCxJQUFKLENBQVMsTUFBVCxNQUFtQixPQUE3QjtBQUNBLE1BQUltRyxNQUFJYSxJQUFJaEgsSUFBSixDQUFTLE1BQVQsQ0FBUjtBQUNBLFNBQU8sRUFBQ0QsTUFBSyxRQUFOLEVBQWVrSCxZQUFmLEVBQXNCQyxNQUFNbkgsSUFBNUIsRUFBa0NxRyxNQUFLckYsZUFBZW9HLGVBQWYsQ0FBK0JoQixHQUEvQixDQUF2QyxFQUFQO0FBQ0E7QUF2T2UsQ0FBakIiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHRjb25zdCBzdXBwb3J0ZWQ9XCJzdHlsZXMsbnVtYmVyaW5nLHRoZW1lLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRpZihzdXBwb3J0ZWQuaW5kZXhPZih0eXBlKSE9LTEpe1xyXG5cdFx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XHJcblx0XHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PU9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGxldCBzdHlsZXMsIG51bWJlcmluZ1xyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdHN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0bnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5LCB7c3R5bGVzLG51bWJlcmluZ30pXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHJldHVybiB0YWdcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE9mZmljZURvY3VtZW50XHJcblxyXG5jb25zdCBpZGVudGl0aWVzPXtcclxuXHRkb2N1bWVudCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdGxldCBjdXJyZW50PW51bGxcclxuXHRcdGxldCBjaGlsZHJlbj0kKFwid1xcXFw6c2VjdFByXCIpLmVhY2goKGksc2VjdCk9PntcclxuXHRcdFx0bGV0IGVuZD0kKHNlY3QpLmNsb3Nlc3QoJ3dcXFxcOmJvZHk+KicpXHJcblx0XHRcdHNlY3QuY29udGVudD1lbmQucHJldlVudGlsKGN1cnJlbnQpLnRvQXJyYXkoKS5yZXZlcnNlKClcclxuXHRcdFx0aWYoIWVuZC5pcyhzZWN0KSlcclxuXHRcdFx0XHRzZWN0LmNvbnRlbnQucHVzaChlbmQuZ2V0KDApKVxyXG5cdFx0XHRjdXJyZW50PWVuZFxyXG5cdFx0fSkudG9BcnJheSgpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbn1cclxuXHR9LFxyXG5cdHNlY3RQcih3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IGhmPXR5cGU9PndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09YHc6JHt0eXBlfVJlZmVyZW5jZWApLnJlZHVjZSgoaGVhZGVycyxhKT0+e1xyXG5cdFx0XHRcdGhlYWRlcnMuc2V0KGEuYXR0cmlic1tcInc6dHlwZVwiXSxvZmZpY2VEb2N1bWVudC5nZXRSZWwoYS5hdHRyaWJzW1wicjppZFwiXSkpXHJcblx0XHRcdFx0cmV0dXJuIGhlYWRlcnNcclxuXHRcdFx0fSxuZXcgTWFwKCkpXHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0dHlwZTpcInNlY3Rpb25cIixcclxuXHRcdFx0Y2hpbGRyZW46d1htbC5jb250ZW50LFxyXG5cdFx0XHRoZWFkZXJzOmhmKFwiaGVhZGVyXCIpLFxyXG5cdFx0XHRmb290ZXJzOmhmKFwiZm9vdGVyXCIpLFxyXG5cdFx0XHRoYXNUaXRsZVBhZ2U6ICEhd1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRpdGxlUGdcIilcclxuXHRcdH1cclxuXHR9LFxyXG5cdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcclxuXHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByPndcXFxcOm51bUlkXCIpXHJcblx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XHJcblx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1Qcj53XFxcXDpudW1JZGApXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdGlkZW50aXR5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZGVudGl0eS5sZXZlbD1udW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IG91dGxpbmVMdmw9cFByLmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlmKCFvdXRsaW5lTHZsICYmIHN0eWxlSWQpXHJcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRpZihvdXRsaW5lTHZsKXtcclxuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHR9LFxyXG5cdHIod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHR9LFxyXG5cdGZsZENoYXIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdH0sXHJcblxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdHJldHVybiB7dHlwZTpgZHJhd2luZy5pbmxpbmVgLCBjaGlsZHJlbjokLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgZ3JhcGhpY0RhdGE9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJylcclxuXHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdGlmKHR5cGU9PVwid29yZHByb2Nlc3NpbmdHcm91cFwiKVxyXG5cdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdH0sXHJcblx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBibGlwPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIilcclxuXHRcdGxldCByaWQ9YmxpcC5hdHRyKCdyOmVtYmVkJyl8fGJsaXAuYXR0cigncjpsaW5rJylcclxuXHRcdHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKX1cclxuXHR9LFxyXG5cdHdzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzaGFwZVwiLCBjaGlsZHJlbjpvZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpLmZpbmQoXCI+d3BzXFxcXDp0eGJ4PndcXFxcOnR4YnhDb250ZW50XCIpLmNoaWxkcmVuKCkudG9BcnJheSgpfVxyXG5cdH0sXHJcblx0RmFsbGJhY2soKXtcclxuXHRcdHJldHVybiBudWxsXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveCxyZXBlYXRpbmdTZWN0aW9uLHJlcGVhdGluZ1NlY3Rpb25JdGVtXCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0bGV0IG1vZGVsPXtjaGlsZHJlbn1cclxuXHRcdFx0aWYodHlwZSl7XHJcblx0XHRcdFx0bW9kZWwudHlwZT1gY29udHJvbC4ke3R5cGV9YFxyXG5cdFx0XHR9ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRtb2RlbC50eXBlPVwiYmxvY2tcIlxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0bW9kZWwudHlwZT1cImlubGluZVwiXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHQkPW9mZmljZURvY3VtZW50LmNvbnRlbnRcclxuXHRcdFx0c3dpdGNoKG1vZGVsLnR5cGUpe1xyXG5cdFx0XHRcdGNhc2UgXCJjb250cm9sLmRyb3BEb3duTGlzdFwiOlx0XHJcblx0XHRcdFx0Y2FzZSBcImNvbnRyb2wuY29tYm9Cb3hcIjp7XHJcblx0XHRcdFx0XHRsZXQgc2VsZWN0ZWQ9JChjb250ZW50KS50ZXh0KClcclxuXHRcdFx0XHRcdG1vZGVsLm9wdGlvbnM9JChlbFR5cGUpXHJcblx0XHRcdFx0XHRcdC5maW5kKFwid1xcXFw6bGlzdEl0ZW1cIilcclxuXHRcdFx0XHRcdFx0Lm1hcCgoaSxsaSk9PntcclxuXHRcdFx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHRcdFx0ZGlzcGxheVRleHQ6IGxpLmF0dHJpYnNbXCJ3OmRpc3BsYXlUZXh0XCJdLFxyXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWU6IGxpLmF0dHJpYnNbXCJ3OnZhbHVlXCJdXHJcblx0XHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdFx0XHQuZ2V0KClcclxuXHRcdFx0XHRcdG1vZGVsLnZhbHVlPShtb2RlbC5vcHRpb25zLmZpbmQoYT0+YS5kaXNwbGF5VGV4dD09c2VsZWN0ZWQpfHx7fSkudmFsdWVcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgXCJjb250cm9sLmNoZWNrYm94XCI6e1xyXG5cdFx0XHRcdFx0bGV0IG5zPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKVswXVxyXG5cdFx0XHRcdFx0bW9kZWwuY2hlY2tlZD0kKGVsVHlwZSkuZmluZChgJHtuc31cXFxcOmNoZWNrZWRgKS5hdHRyKGAke25zfTp2YWxgKT09XCIxXCJcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGNhc2UgXCJjb250cm9sLnRleHRcIjpcclxuXHRcdFx0XHRcdGlmKGNvbnRlbnQuZmluZCgnd1xcXFw6ciBbd1xcXFw6dmFsfj1QbGFjZWhvbGRlcl0nKS5sZW5ndGg9PTApXHJcblx0XHRcdFx0XHRcdG1vZGVsLnZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdGNhc2UgXCJjb250cm9sLmRhdGVcIjpcclxuXHRcdFx0XHRcdG1vZGVsLnZhbHVlPW5ldyBEYXRlKCQoZWxUeXBlKS5hdHRyKFwidzpmdWxsRGF0ZVwiKSlcclxuXHRcdFx0XHRcdG1vZGVsLmZvcm1hdD0kKGVsVHlwZSkuZmluZChcIndcXFxcOmRhdGVGb3JtYXRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRtb2RlbC5sb2NhbGU9JChlbFR5cGUpLmZpbmQoXCJ3XFxcXDpsaWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0fSxcclxuXHR0Ymwod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0YmxQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInc6dGJsR3JpZFwiOlxyXG5cdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdH0sXHJcblx0dHIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0clByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0dGMod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0Y1ByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0YWx0Q2h1bmsod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHJJZD13WG1sLmF0dHJpYnNbJ3I6aWQnXVxyXG5cdFx0bGV0IGRhdGE9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJJZClcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9b2ZmaWNlRG9jdW1lbnQuZm9sZGVyK29mZmljZURvY3VtZW50LnJlbHMoYFtJZD0ke3JJZH1dYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0bGV0IGNvbnRlbnRUeXBlPW9mZmljZURvY3VtZW50LmRvYy5jb250ZW50VHlwZXMoYE92ZXJyaWRlW1BhcnROYW1lPScke3BhcnROYW1lfSddYCkuYXR0cihcIkNvbnRlbnRUeXBlXCIpXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJjaHVua1wiLCBkYXRhLCBjb250ZW50VHlwZX1cclxuXHR9LFxyXG5cdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIn1cclxuXHR9LFxyXG5cdHN0eWxlKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIiwgaWQ6d1htbC5hdHRyaWJzWyd3OnN0eWxlSWQnXX1cclxuXHR9LFxyXG5cdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiYWJzdHJhY3ROdW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl19XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLGFic3RyYWN0TnVtOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdG9iamVjdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCBvbGU9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwib1xcXFw6T0xFT2JqZWN0XCIpXHJcblx0XHRsZXQgdHlwZT1vbGUuYXR0cihcIlByb2dJRFwiKVxyXG5cdFx0bGV0IGVtYmVkPW9sZS5hdHRyKFwiVHlwZVwiKT09PVwiRW1iZWRcIlxyXG5cdFx0bGV0IHJJZD1vbGUuYXR0cihcInI6aWRcIilcclxuXHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGVtYmVkLCBwcm9nOiB0eXBlLCBkYXRhOm9mZmljZURvY3VtZW50LmdldFJlbE9sZU9iamVjdChySWQpfVxyXG5cdH1cclxufVxyXG4iXX0=