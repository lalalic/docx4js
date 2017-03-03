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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsInRhcmdldCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwicmVuZGVyTm9kZSIsImNvbnRlbnQiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJhcmd1bWVudHMiLCJlbWl0IiwiZG9jdW1lbnQiLCJzdHlsZXMiLCJudW1iZXJpbmciLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsInN1YnN0cmluZyIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsImZvbGRlciIsInJhdyIsImZpbGUiLCJwYXJ0cyIsImFwcGVuZCIsInVybCIsIndYbWwiLCJ0YWciLCJuYW1lIiwiaWRlbnRpdGllcyIsImN1cnJlbnQiLCJjaGlsZHJlbiIsInNlY3QiLCJlbmQiLCJjbG9zZXN0IiwicHJldlVudGlsIiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsInAiLCJpZGVudGl0eSIsInByIiwiZmluZCIsImZpbHRlciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwiciIsImZsZENoYXIiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImFzc2lnbiIsImdldFJlbCIsInNkdCIsImVsQmluZGluZyIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImh5cGVybGluayIsInRibCIsInJlZHVjZSIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwiclByRGVmYXVsdCIsInBQckRlZmF1bHQiLCJzdHlsZSIsImFic3RyYWN0TnVtIiwibnVtIiwibGF0ZW50U3R5bGVzIiwib2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7Ozs7Ozs7Ozs7MEJBQ0w7QUFBQTs7QUFDTjtBQUNBLFFBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZUMsS0FBZixDQUFxQixHQUFyQixFQUEwQkMsR0FBMUIsRUFBVDtBQUNBLFFBQUdILFFBQU0sV0FBVCxFQUNDO0FBQ0QsUUFBSUksU0FBT0wsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBWDtBQUNBSSxXQUFPQyxjQUFQLFNBQTJCTixJQUEzQixFQUFnQztBQUMvQk8sUUFEK0IsaUJBQzFCO0FBQ0osYUFBTyxLQUFLQyxZQUFMLENBQWtCSixNQUFsQixDQUFQO0FBQ0E7QUFIOEIsS0FBaEM7QUFLQSxJQVhEO0FBWUE7Ozt5QkFFTUssYSxFQUFnRDtBQUFBLE9BQWpDQyxRQUFpQyx1RUFBeEJoQixlQUFlZ0IsUUFBUzs7QUFDdEQsVUFBTyxLQUFLQyxVQUFMLENBQWdCLEtBQUtDLE9BQUwsQ0FBYSxjQUFiLEVBQTZCTCxHQUE3QixDQUFpQyxDQUFqQyxDQUFoQixFQUFvREUsYUFBcEQsRUFBbUVDLFFBQW5FLENBQVA7QUFDQTs7O3dCQUVLRyxVLEVBQTRDO0FBQUEsT0FBakNILFFBQWlDLHVFQUF4QkksZUFBZUosUUFBUzs7QUFDakQsT0FBTUssTUFBSSxFQUFWO0FBQ0EsT0FBTU4sZ0JBQWNJLFdBQVdKLGFBQVgsQ0FBeUJPLElBQXpCLENBQThCSCxVQUE5QixDQUFwQjtB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bEQsSUFySUssRUFxSUE7QUFDZixTQUFPLEVBQUM3QyxNQUFLLE9BQU4sRUFBY3lCLElBQUcsSUFBakIsRUFBUDtBQUNBLEVBdkllO0FBd0loQnVFLE1BeElnQixpQkF3SVZuRCxJQXhJVSxFQXdJTDtBQUNWLFNBQU8sRUFBQzdDLE1BQUssT0FBTixFQUFleUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxXQUFiLENBQWxCLEVBQVA7QUFDQSxFQTFJZTtBQTJJaEJpRSxZQTNJZ0IsdUJBMklKcEQsSUEzSUksRUEySUM7QUFDaEIsU0FBTyxFQUFDN0MsTUFBSyxXQUFOLEVBQWtCeUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxpQkFBYixDQUFyQixFQUFxRGtCLFVBQVNMLEtBQUtLLFFBQUwsQ0FBY2EsTUFBZCxDQUFxQjtBQUFBLFdBQUdoQyxFQUFFZ0IsSUFBRixJQUFRLE9BQVg7QUFBQSxJQUFyQixDQUE5RCxFQUFQO0FBQ0EsRUE3SWU7QUE4SWhCbUQsSUE5SWdCLGVBOElackQsSUE5SVksRUE4SVA7QUFDUixTQUFPLEVBQUM3QyxNQUFLLE9BQU4sRUFBY3lCLElBQUdvQixLQUFLYixPQUFMLENBQWEsU0FBYixDQUFqQixFQUF5Q1QsV0FBVXNCLEtBQUtLLFFBQUwsQ0FBY1ksSUFBZCxDQUFtQjtBQUFBLFdBQUcvQixFQUFFZ0IsSUFBRixJQUFRLGlCQUFYO0FBQUEsSUFBbkIsRUFBaURmLE9BQWpELENBQXlELE9BQXpELENBQW5ELEVBQVA7QUFDQSxFQWhKZTtBQWlKaEJtRSxhQWpKZ0IsMEJBaUpGO0FBQ2IsU0FBTyxJQUFQO0FBQ0EsRUFuSmU7QUFvSmhCQyxPQXBKZ0Isa0JBb0pUdkQsSUFwSlMsRUFvSko7QUFDWCxTQUFPLEVBQUM3QyxNQUFLLFFBQU4sRUFBZWtELFVBQVMsRUFBeEIsRUFBUDtBQUNBO0FBdEplLENBQWpCIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5cclxuZXhwb3J0IGNsYXNzIE9mZmljZURvY3VtZW50IGV4dGVuZHMgUGFydHtcclxuXHRfaW5pdCgpe1xyXG5cdFx0c3VwZXIuX2luaXQoKVxyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0aWYodHlwZT09XCJjdXN0b21YbWxcIilcclxuXHRcdFx0XHRyZXR1cm5cclxuXHRcdFx0bGV0IHRhcmdldD0kLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XHJcblx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyLGlkZW50aWZ5PW9mZmljZURvY3VtZW50LmlkZW50aWZ5KXtcclxuXHRcdGNvbnN0IGRvYz17fVxyXG5cdFx0Y29uc3QgY3JlYXRlRWxlbWVudD1kb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKVxyXG5cdFx0ZnVuY3Rpb24gX2lkZW50aWZ5KCl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGlmKG1vZGVsICYmIHR5cGVvZihtb2RlbCk9PVwib2JqZWN0XCIpe1xyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChcIipcIixtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRpZihkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXSlcclxuXHRcdFx0XHRcdGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbW9kZWxcclxuXHRcdH1cclxuXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRkb2Muc3R5bGVzPXRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRpZih0aGlzLm51bWJlcmluZylcclxuXHRcdFx0ZG9jLm51bWJlcmluZz10aGlzLnJlbmRlck5vZGUodGhpcy5udW1iZXJpbmcoXCJ3XFxcXDpudW1iZXJpbmdcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0cmV0dXJuIGRvY1xyXG5cdH1cclxuXHJcblx0YWRkSW1hZ2UoZGF0YSl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0vJHt0YXJnZXROYW1lfWBcclxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxyXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBUeXBlPVwiJHt0eXBlfVwiIElkPVwiJHtpZH1cIiBUYXJnZXQ9XCIke3BhcnROYW1lfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkRXh0ZXJuYWxJbWFnZSh1cmwpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cclxuXHRcdGxldCBpZD1gcklkJHtNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKGlkZW50aXRpZXNbdGFnXSlcclxuXHRcdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50XHJcblx0XHRsZXQgY3VycmVudD1udWxsXHJcblx0XHRsZXQgY2hpbGRyZW49JChcIndcXFxcOnNlY3RQclwiKS5lYWNoKChpLHNlY3QpPT57XHJcblx0XHRcdGxldCBlbmQ9JChzZWN0KS5jbG9zZXN0KCd3XFxcXDpib2R5PionKVxyXG5cdFx0XHRzZWN0LmNvbnRlbnQ9ZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpXHJcblx0XHRcdGlmKCFlbmQuaXMoc2VjdCkpXHJcblx0XHRcdFx0c2VjdC5jb250ZW50LnB1c2goZW5kLmdldCgwKSlcclxuXHRcdFx0Y3VycmVudD1lbmRcclxuXHRcdH0pLnRvQXJyYXkoKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiZG9jdW1lbnRcIiwgY2hpbGRyZW59XHJcblx0fSxcclxuXHRzZWN0UHIod1htbCxvZmZpY2VEb2N1bWVudCl7IFxyXG5cdFx0cmV0dXJuIHt0eXBlOlwic2VjdGlvblwiLCBjaGlsZHJlbjp3WG1sLmNvbnRlbnR9XHJcblx0fSxcclxuXHRwKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9XCJwXCJcclxuXHJcblx0XHRsZXQgaWRlbnRpdHk9e3R5cGUscHI6d1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6cFByXCIpLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6cFByXCIpfVxyXG5cclxuXHRcdGxldCBwUHI9JC5maW5kKFwid1xcXFw6cFByXCIpXHJcblx0XHRpZihwUHIubGVuZ3RoKXtcclxuXHRcdFx0bGV0IHN0eWxlSWQ9cFByLmZpbmQoXCJ3XFxcXDpwU3R5bGVcIikuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRsZXQgbnVtUHI9cFByLmZpbmQoXCJ3XFxcXDpudW1Qcj53XFxcXDpudW1JZFwiKVxyXG5cdFx0XHRpZighbnVtUHIubGVuZ3RoICYmIHN0eWxlSWQpe1xyXG5cdFx0XHRcdG51bVByPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRgKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihudW1Qci5sZW5ndGgpe1xyXG5cdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJsaXN0XCJcclxuXHRcdFx0XHRpZGVudGl0eS5udW1JZD1udW1Qci5maW5kKFwid1xcXFw6bnVtSWRcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9bnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBvdXRsaW5lTHZsPXBQci5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZighb3V0bGluZUx2bCAmJiBzdHlsZUlkKVxyXG5cdFx0XHRcdFx0b3V0bGluZUx2bD1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm91dGxpbmVMdmxgKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdFx0aWYob3V0bGluZUx2bCl7XHJcblx0XHRcdFx0XHRpZGVudGl0eS50eXBlPVwiaGVhZGluZ1wiXHJcblx0XHRcdFx0XHRpZGVudGl0eS5sZXZlbD1wYXJzZUludChvdXRsaW5lTHZsKSsxXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGlkZW50aXR5XHJcblx0fSxcclxuXHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwiclwiLCBwcjogd1htbC5jaGlsZHJlbi5maW5kKCh7bmFtZX0pPT5uYW1lPT1cInc6clByXCIpLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpyUHJcIil9XHJcblx0fSxcclxuXHRmbGRDaGFyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuYXR0cmlic1tcInc6ZmxkQ2hhclR5cGVcIl1cclxuXHR9LFxyXG5cdGlubGluZSh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPSQuZmluZCgnYVxcXFw6Z3JhcGhpYz5hXFxcXDpncmFwaGljRGF0YScpLmF0dHIoJ3VyaScpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdGxldCBwcm9wcz17dHlwZTpgaW5saW5lLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSBcInBpY3R1cmVcIjpcclxuXHRcdFx0bGV0IHJpZD0kLmZpbmQoJ2FcXFxcOmJsaXAnKS5hdHRyKCdyOmVtYmVkJylcclxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxvZmZpY2VEb2N1bWVudC5nZXRSZWwocmlkKSlcclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gcHJvcHNcclxuXHR9LFxyXG5cdHNkdCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCBwcj0kLmZpbmQoJz53XFxcXDpzZHRQcicpXHJcblx0XHRsZXQgY29udGVudD0kLmZpbmQoJz53XFxcXDpzZHRDb250ZW50JylcclxuXHRcdGxldCBjaGlsZHJlbj1jb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpXHJcblxyXG5cdFx0bGV0IGVsQmluZGluZz1wci5maW5kKCd3XFxcXDpkYXRhQmluZGluZycpLmdldCgwKVxyXG5cdFx0aWYoZWxCaW5kaW5nKXsvL3Byb3BlcnRpZXNcclxuXHRcdFx0bGV0IHBhdGg9ZWxCaW5kaW5nLmF0dHJpYnNbJ3c6eHBhdGgnXSxcclxuXHRcdFx0XHRkPXBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLyksXHJcblx0XHRcdFx0bmFtZT0oZC5wb3AoKSxkLnBvcCgpKTtcclxuXHRcdFx0bGV0IHZhbHVlPWNvbnRlbnQudGV4dCgpXHJcblxyXG5cdFx0XHRyZXR1cm4ge3R5cGU6XCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW59XHJcblx0XHR9ZWxzZXsvL2NvbnRyb2xzXHJcblx0XHRcdGxldCBwckNoaWxkcmVuPXByLmdldCgwKS5jaGlsZHJlblxyXG5cdFx0XHRsZXQgZWxUeXBlPXByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGgtMV1cclxuXHRcdFx0bGV0IG5hbWU9ZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRcdGxldCB0eXBlPVwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGNvbWJvQm94LGRyb3BEb3duTGlzdCxkYXRlLGNoZWNrYm94XCIuc3BsaXQoXCIsXCIpXHJcblx0XHRcdFx0LmZpbmQoYT0+YT09bmFtZSlcclxuXHRcdFx0aWYodHlwZSlcclxuXHRcdFx0XHRyZXR1cm4ge3R5cGU6YGNvbnRyb2wuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHRcdGVsc2V7Ly9jb250YWluZXJcclxuXHRcdFx0XHRpZihjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiYmxvY2tcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJpbmxpbmVcIiwgY2hpbGRyZW59XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHRoeXBlcmxpbmsod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgdXJsPW9mZmljZURvY3VtZW50LmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxyXG5cdFx0cmV0dXJuIHt0eXBlOlwiaHlwZXJsaW5rXCIsIHVybH1cclxuXHR9LFxyXG5cdHRibCh3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRibFByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRjYXNlIFwidzp0YmxHcmlkXCI6XHJcblx0XHRcdFx0c3RhdGUuY29scz1ub2RlLmNoaWxkcmVuXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRibFwiLGNoaWxkcmVuOltdLHByOm51bGwsY29sczpbXX0pXHJcblx0fSxcclxuXHR0cih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZSgoc3RhdGUsbm9kZSk9PntcclxuXHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdGNhc2UgXCJ3OnRyUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdFx0c3RhdGUuaXNIZWFkZXI9ISFub2RlLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInc6dGJsSGVhZGVyXCIpXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0c3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7dHlwZTpcInRyXCIsY2hpbGRyZW46W10scHI6bnVsbH0pXHJcblx0fSxcclxuXHRyUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipyXCJ9XHJcblx0fSxcclxuXHRwUHJEZWZhdWx0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIixpZDpcIipwXCJ9XHJcblx0fSxcclxuXHRzdHlsZSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsIGlkOndYbWwuYXR0cmlic1sndzpzdHlsZUlkJ119XHJcblx0fSxcclxuXHRhYnN0cmFjdE51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm51bWJlcmluZ1wiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PVwidzpsdmxcIil9XHJcblx0fSxcclxuXHRudW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sbnVtYmVyaW5nOndYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzphYnN0cmFjdE51bUlkXCIpLmF0dHJpYnNbXCJ3OnZhbFwiXX1cclxuXHR9LFxyXG5cdGxhdGVudFN0eWxlcygpe1xyXG5cdFx0cmV0dXJuIG51bGxcclxuXHR9LFxyXG5cdG9iamVjdCh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm9iamVjdFwiLGNoaWxkcmVuOltdfVxyXG5cdH1cclxufVxyXG4iXX0=