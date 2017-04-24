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
		var rid = officeDocument.content(wXml).find("a\\:blip").attr('r:embed');
		return _extends({ type: "picture" }, officeDocument.getRel(rid));
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
	object: function object(wXml) {
		return { type: "object", children: [] };
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJzdXBwb3J0ZWQiLCJzcGxpdCIsInJlbHMiLCJlYWNoIiwiaSIsInJlbCIsIiQiLCJ0eXBlIiwiYXR0ciIsInBvcCIsImluZGV4T2YiLCJ0YXJnZXQiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsInN0eWxlcyIsInJlbmRlck5vZGUiLCJudW1iZXJpbmciLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsImRvY3VtZW50IiwiZGF0YSIsImlkIiwiTWF0aCIsIm1heCIsInRvQXJyYXkiLCJtYXAiLCJwYXJzZUludCIsImEiLCJhdHRyaWJzIiwiSWQiLCJzdWJzdHJpbmciLCJ0YXJnZXROYW1lIiwidCIsIm1hdGNoIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyYXciLCJmaWxlIiwicGFydHMiLCJhcHBlbmQiLCJ1cmwiLCJ3WG1sIiwidGFnIiwibmFtZSIsImlkZW50aXRpZXMiLCJjdXJyZW50IiwiY2hpbGRyZW4iLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInJldmVyc2UiLCJpcyIsInB1c2giLCJzZWN0UHIiLCJoZiIsImZpbHRlciIsInJlZHVjZSIsImhlYWRlcnMiLCJzZXQiLCJnZXRSZWwiLCJNYXAiLCJmb290ZXJzIiwiaGFzVGl0bGVQYWdlIiwiZmluZCIsInAiLCJpZGVudGl0eSIsInByIiwicFByIiwibGVuZ3RoIiwic3R5bGVJZCIsIm51bVByIiwibnVtSWQiLCJsZXZlbCIsIm91dGxpbmVMdmwiLCJyIiwiZmxkQ2hhciIsImlubGluZSIsImFuY2hvciIsImdyYXBoaWNEYXRhIiwicGljIiwicmlkIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwiaHlwZXJsaW5rIiwidGJsIiwic3RhdGUiLCJub2RlIiwiY29scyIsInRyIiwiaXNIZWFkZXIiLCJ0YyIsImRvY0RlZmF1bHRzIiwic3R5bGUiLCJhYnN0cmFjdE51bSIsIm51bSIsImxhdGVudFN0eWxlcyIsIm9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLE9BQU1DLFlBQVUsa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZVAsS0FBZixDQUFxQixHQUFyQixFQUEwQlEsR0FBMUIsRUFBVDtBQUNBLFFBQUdULFVBQVVVLE9BQVYsQ0FBa0JILElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5QixVQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLGFBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxVQUQrQixpQkFDMUI7QUFDSixlQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixPQUFoQztBQUY4QjtBQU85QjtBQUNELElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QmxCLGVBQWVrQixRQUFTOztBQUN0RCxPQUFHLEtBQUtDLE1BQVIsRUFDQyxLQUFLQyxVQUFMLENBQWdCLEtBQUtELE1BQUwsQ0FBWSxZQUFaLEVBQTBCSixHQUEx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QixFQUFQO0FBQ0EsRUFwS2U7QUFxS2hCd0UsWUFyS2dCLHVCQXFLSjNELElBcktJLEVBcUtDO0FBQ2hCLFNBQU8sRUFBQzdDLE1BQUssYUFBTixFQUFvQnlCLElBQUdvQixLQUFLYixPQUFMLENBQWEsaUJBQWIsQ0FBdkIsRUFBUDtBQUNBLEVBdktlO0FBd0toQnlFLElBeEtnQixlQXdLWjVELElBeEtZLEVBd0tQO0FBQ1IsU0FBTyxFQUFDN0MsTUFBSyxLQUFOLEVBQVl5QixJQUFHb0IsS0FBS2IsT0FBTCxDQUFhLFNBQWIsQ0FBZixFQUF1Q3dFLGFBQVkzRCxLQUFLSyxRQUFMLENBQWNrQixJQUFkLENBQW1CO0FBQUEsV0FBR3JDLEVBQUVnQixJQUFGLElBQVEsaUJBQVg7QUFBQSxJQUFuQixFQUFpRGYsT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBMUtlO0FBMktoQjBFLGFBM0tnQiwwQkEyS0Y7QUFDYixTQUFPLElBQVA7QUFDQSxFQTdLZTtBQThLaEJDLE9BOUtnQixrQkE4S1Q5RCxJQTlLUyxFQThLSjtBQUNYLFNBQU8sRUFBQzdDLE1BQUssUUFBTixFQUFla0QsVUFBUyxFQUF4QixFQUFQO0FBQ0E7QUFoTGUsQ0FBakIiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHRjb25zdCBzdXBwb3J0ZWQ9XCJzdHlsZXMsbnVtYmVyaW5nLHRoZW1lLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRpZihzdXBwb3J0ZWQuaW5kZXhPZih0eXBlKSE9LTEpe1xyXG5cdFx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XHJcblx0XHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PU9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHR0aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0ZG9jLnN0eWxlcz10aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJ3XFxcXDpzdHlsZXNcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdGRvYy5udW1iZXJpbmc9dGhpcy5yZW5kZXJOb2RlKHRoaXMubnVtYmVyaW5nKFwid1xcXFw6bnVtYmVyaW5nXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0YWRkSW1hZ2UoZGF0YSl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0vJHt0YXJnZXROYW1lfWBcclxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxyXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBUeXBlPVwiJHt0eXBlfVwiIElkPVwiJHtpZH1cIiBUYXJnZXQ9XCIke3BhcnROYW1lfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkRXh0ZXJuYWxJbWFnZSh1cmwpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cclxuXHRcdGxldCBpZD1gcklkJHtNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKGlkZW50aXRpZXNbdGFnXSlcclxuXHRcdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0fSxcclxuXHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRjb25zdCBoZj10eXBlPT53WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PWB3OiR7dHlwZX1SZWZlcmVuY2VgKS5yZWR1Y2UoKGhlYWRlcnMsYSk9PntcclxuXHRcdFx0XHRoZWFkZXJzLnNldChhLmF0dHJpYnNbXCJ3OnR5cGVcIl0sb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGEuYXR0cmlic1tcInI6aWRcIl0pKVxyXG5cdFx0XHRcdHJldHVybiBoZWFkZXJzXHJcblx0XHRcdH0sbmV3IE1hcCgpKVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHR5cGU6XCJzZWN0aW9uXCIsXHJcblx0XHRcdGNoaWxkcmVuOndYbWwuY29udGVudCxcclxuXHRcdFx0aGVhZGVyczpoZihcImhlYWRlclwiKSxcclxuXHRcdFx0Zm9vdGVyczpoZihcImZvb3RlclwiKSxcclxuXHRcdFx0aGFzVGl0bGVQYWdlOiAhIXdYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0aXRsZVBnXCIpXHJcblx0XHR9XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1Qcj53XFxcXDpudW1JZFwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdHJldHVybiB7dHlwZTpgZHJhd2luZy5pbmxpbmVgLCBjaGlsZHJlbjokLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cclxuXHR9LFxyXG5cdGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgZ3JhcGhpY0RhdGE9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJylcclxuXHRcdGxldCB0eXBlPWdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRsZXQgY2hpbGRyZW49Z3JhcGhpY0RhdGEuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHRcdGlmKHR5cGU9PVwid29yZHByb2Nlc3NpbmdHcm91cFwiKVxyXG5cdFx0XHRjaGlsZHJlbj1jaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lLnNwbGl0KFwiOlwiKVswXSE9XCJ3cGdcIilcclxuXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkcmF3aW5nLmFuY2hvclwiLGNoaWxkcmVufVxyXG5cdH0sXHJcblx0cGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCByaWQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiYVxcXFw6YmxpcFwiKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5vZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKX1cclxuXHR9LFx0XHJcblx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcclxuXHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHJcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXHJcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxyXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcclxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRsZXQgdmFsdWU9Y29udGVudC50ZXh0KClcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cclxuXHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LHBpY3R1cmUsZG9jUGFydExpc3QsY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3hcIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRpZih0eXBlKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHRjKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGNQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGNcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdGRvY0RlZmF1bHRzKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIn1cclxuXHR9LFxyXG5cdHN0eWxlKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIiwgaWQ6d1htbC5hdHRyaWJzWyd3OnN0eWxlSWQnXX1cclxuXHR9LFxyXG5cdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiYWJzdHJhY3ROdW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3OmFic3RyYWN0TnVtSWRcIl19XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJudW1cIixpZDp3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLGFic3RyYWN0TnVtOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdG9iamVjdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGNoaWxkcmVuOltdfVxyXG5cdH1cclxufVxyXG4iXX0=