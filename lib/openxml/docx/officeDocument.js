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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsInRhcmdldCIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0IiwiZ2V0UmVsT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5Iiwic3R5bGVzIiwicmVuZGVyTm9kZSIsIm51bWJlcmluZyIsImNvbnRlbnQiLCJkb21IYW5kbGVyIiwib2ZmaWNlRG9jdW1lbnQiLCJkb2MiLCJiaW5kIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJhcmd1bWVudHMiLCJlbWl0IiwiZG9jdW1lbnQiLCJkYXRhIiwiaWQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsInN1YnN0cmluZyIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsImZvbGRlciIsInJhdyIsImZpbGUiLCJwYXJ0cyIsImFwcGVuZCIsInVybCIsIndYbWwiLCJ0YWciLCJuYW1lIiwiaWRlbnRpdGllcyIsImN1cnJlbnQiLCJjaGlsZHJlbiIsInNlY3QiLCJlbmQiLCJjbG9zZXN0IiwicHJldlVudGlsIiwicmV2ZXJzZSIsImlzIiwicHVzaCIsInNlY3RQciIsInAiLCJpZGVudGl0eSIsInByIiwiZmluZCIsImZpbHRlciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwiciIsImZsZENoYXIiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImFzc2lnbiIsImdldFJlbCIsInNkdCIsImVsQmluZGluZyIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImh5cGVybGluayIsInRibCIsInJlZHVjZSIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJ0ciIsImlzSGVhZGVyIiwidGMiLCJkb2NEZWZhdWx0cyIsInN0eWxlIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjOzs7Ozs7Ozs7OzswQkFDTDtBQUFBOztBQUNOO0FBQ0EsUUFBS0MsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixFQUFUO0FBQ0EsUUFBR0gsUUFBTSxXQUFULEVBQ0M7QUFDRCxRQUFJSSxTQUFPTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFYO0FBQ0FJLFdBQU9DLGNBQVAsU0FBMkJOLElBQTNCLEVBQWdDO0FBQy9CTyxRQUQrQixpQkFDMUI7QUFDSixhQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQWxCLENBQVA7QUFDQTtBQUg4QixLQUFoQztBQUtBLElBWEQ7QUFZQTs7O3lCQUVNSyxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QmhCLGVBQWVnQixRQUFTOztBQUN0RCxPQUFHLEtBQUtDLE1BQVIsRUFDQyxLQUFLQyxVQUFMLENBQWdCLEtBQUtELE1BQUwsQ0FBWSxZQUFaLEVBQTBCSixHQUExQixDQUE4QixDQUE5QixDQUFoQixFQUFpREUsYUFBakQsRUFBK0RDLFFBQS9EO0FBQ0QsT0FBRyxLQUFLRyxTQUFSLEVBQ0MsS0FBS0QsVUFBTCxDQUFnQixLQUFLQyxTQUFMLENBQWUsZUFBZixFQUFnQ04sR0FBaEMsQ0FBb0MsQ0FBcEMsQ0FBaEIsRUFBdURFLGFBQXZELEVBQXFFQyxRQUFyRTtBQUNELFVBQU8sS0FBS0UsVUFBTCxDQUFnQixLQUFLRSxPQUFMLENBQWEsY0FBYixFQUE2QlAsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsRUFBb0RFLGFBQXBELEVBQW1FQyxRQUFuRSxDQUFQO0FBQ0E7Ozt3QkFFS0ssVSxFQUE0QztBQUFBLE9BQWpDTCxRQUFpQyx1RUFBeEJNLGVBQWVOLFFBQVM7O0FBQ2pELE9BQU1PLE1BQUksRUFBVjtBQUNBLE9BQU1SLGdCQUFjTSxXQUFXTixhQUFYLENBQXlCUyxJQUF6QixDQUE4QkgsVUFBOUIsQ0FBcEI7QUFDQSxZQUFTSSxTQUFULEdBQW9CO0FBQ25CLFFBQUlDLFFBQU1WLDBCQUFZVyxTQUFaLENBQVY7QUFDQSxRQUFHRCxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsTUFBZSxRQUEzQixFQUFvQztBQUNuQ0wsZ0JBQVdPLElBQVgsb0JBQWdCLEdBQWhCLEVBQW9CRixLQUFwQixvQ0FBNkJDLFNBQTdCO0FBQ0FOLGdCQUFXTyxJQUFYLG9CQUFnQkYsTUFBTXBCLElBQXRCLEVBQTRCb0IsS0FBNUIsb0NBQXFDQyxTQUFyQztBQUNBLFNBQUdOLGtCQUFnQkssTUFBTXBCLElBQXRCLENBQUgsRUFDQ2Usa0JBQWdCSyxNQUFNcEIsSUFBdEIscUJBQThCb0IsS0FBOUIsb0NBQXVDQyxTQUF2QztBQUNEO0FBQ0QsV0FBT0QsS0FBUDtBQUNBOztBQUVELE9BQUcsS0FBS1QsTUFBUixFQUNDTSxJQUFJTixNQUFKLEdBQVcsS0FBS0MsVUFBTCxDQUFnQixLQUFLRCxNQUFMLENBQVksWUFBWixFQUEwQkosR0FBMUIsQ0FBOEIsQ0FBOUIsQ0FBaEIsRUFBaURFLGFBQWpELEVBQStEVSxTQUEvRCxDQUFYO0FBQ0QsT0FBRyxLQUFLTixTQUFSLEVBQ0NJLElBQUlKLFNBQUosR0FBYyxLQUFLRCxVQUFMLENBQWdCLEtBQUtDLFNBQUwsQ0FBZSxlQUFmLEVBQWdDTixHQUFoQyxDQUFvQyxDQUFwQyxDQUFoQixFQUF1REUsYUFBdkQsRUFBcUVVLFNBQXJFLENBQWQ7QUFDREYsT0FBSU0sUUFBSixHQUFhLEtBQUtYLFVBQUwsQ0FBZ0IsS0FBS0UsT0FBTCxDQUFhLGNBQWIsRUFBNkJQLEdBQTdCLENBQWlDLENBQWpDLENBQWhCLEVBQW9ERSxhQUFwRCxFQUFrRVUsU0FBbEUsQ0FBYjtBQUNBLFVBQU9GLEdBQVA7QUFDQTs7OzJCQUVRTyxJLEVBQUs7QUFDYixPQUFNeEIsT0FBSywyRUFBWDtBQUNBLE9BQUl5QixjQUFTQyxLQUFLQyxHQUFMLGdDQUFZLEtBQUtoQyxJQUFMLENBQVUsY0FBVixFQUEwQmlDLE9BQTFCLEdBQW9DQyxHQUFwQyxDQUF3QztBQUFBLFdBQUdDLFNBQVNDLEVBQUVDLE9BQUYsQ0FBVUMsRUFBVixDQUFhQyxTQUFiLENBQXVCLENBQXZCLENBQVQsQ0FBSDtBQUFBLElBQXhDLENBQVosS0FBNkYsQ0FBdEcsQ0FBSjs7QUFFQSxPQUFJQyxhQUFXLGlCQUFlVCxLQUFLQyxHQUFMLGdDQUFZLEtBQUtoQyxJQUFMLENBQVUsNkJBQVYsRUFBeUNpQyxPQUF6QyxHQUFtREMsR0FBbkQsQ0FBdUQsYUFBRztBQUNuRyxXQUFPQyxTQUFTTSxFQUFFSixPQUFGLENBQVU1QixNQUFWLENBQWlCaUMsS0FBakIsQ0FBdUIsS0FBdkIsRUFBOEIsQ0FBOUIsS0FBa0MsR0FBM0MsQ0FBUDtBQUNBLElBRnlDLENBQVosS0FFMUIsQ0FGVyxJQUVSLE1BRlA7O0FBSUEsT0FBSUMsV0FBWSxLQUFLQyxNQUFqQixTQUEyQkosVUFBL0I7QUFDQSxRQUFLbEIsR0FBTCxDQUFTdUIsR0FBVCxDQUFhQyxJQUFiLENBQWtCSCxRQUFsQixFQUE0QmQsSUFBNUI7QUFDQSxRQUFLUCxHQUFMLENBQVN5QixLQUFULENBQWVKLFFBQWYsSUFBeUIsS0FBS3JCLEdBQUwsQ0FBU3VCLEdBQVQsQ0FBYUMsSUFBYixDQUFrQkgsUUFBbEIsQ0FBekI7O0FBRUEsUUFBSzNDLElBQUwsQ0FBVSxlQUFWLEVBQ0VnRCxNQURGLDJCQUNnQzNDLElBRGhDLGdCQUM2Q3lCLEVBRDdDLG9CQUM0RGEsUUFENUQ7O0FBR0EsVUFBT2IsRUFBUDtBQUNBOzs7bUNBRWdCbUIsRyxFQUFJO0FBQ3BCLE9BQU01QyxPQUFLLDJFQUFYOztBQUVBLE9BQUl5QixjQUFTQyxLQUFLQyxHQUFMLGdDQUFZLEtBQUtoQyxJQUFMLENBQVUsY0FBVixFQUEwQmlDLE9BQTFCLEdBQW9DQyxHQUFwQyxDQUF3QztBQUFBLFdBQUdDLFNBQVNDLEVBQUVDLE9BQUYsQ0FBVUMsRUFBVixDQUFhQyxTQUFiLENBQXVCLENBQXZCLENBQVQsQ0FBSDtBQUFBLElBQXhDLENBQVosS0FBNkYsQ0FBdEcsQ0FBSjs7QUFFQSxRQUFLdkMsSUFBTCxDQUFVLGVBQVYsRUFDRWdELE1BREYsMkJBQ2dDM0MsSUFEaEMsZ0JBQzZDeUIsRUFEN0MsNENBQ2tGbUIsR0FEbEY7O0FBR0EsVUFBT25CLEVBQVA7QUFDQTs7OzJCQUVlb0IsSSxFQUFNN0IsYyxFQUFlO0FBQ3BDLE9BQU04QixNQUFJRCxLQUFLRSxJQUFMLENBQVU3QyxLQUFWLENBQWdCLEdBQWhCLEVBQXFCQyxHQUFyQixFQUFWO0FBQ0EsT0FBRzZDLFdBQVdGLEdBQVgsQ0FBSCxFQUNDLE9BQU9FLFdBQVdGLEdBQVgsb0JBQW1CekIsU0FBbkIsS0FBK0J5QixHQUF0Qzs7QUFFRCxVQUFPQSxHQUFQO0FBQ0E7Ozs7OztrQkFHYXBELGM7OztBQUVmLElBQU1zRCxhQUFXO0FBQ2hCekIsU0FEZ0Isb0JBQ1BzQixJQURPLEVBQ0Y3QixjQURFLEVBQ2E7QUFDNUIsTUFBSWpCLElBQUVpQixlQUFlRixPQUFyQjtBQUNBLE1BQUltQyxVQUFRLElBQVo7QUFDQSxNQUFJQyxXQUFTbkQsRUFBRSxZQUFGLEVBQWdCSCxJQUFoQixDQUFxQixVQUFDQyxDQUFELEVBQUdzRCxJQUFILEVBQVU7QUFDM0MsT0FBSUMsTUFBSXJELEVBQUVvRCxJQUFGLEVBQVFFLE9BQVIsQ0FBZ0IsWUFBaEIsQ0FBUjtBQUNBRixRQUFLckMsT0FBTCxHQUFhc0MsSUFBSUUsU0FBSixDQUFjTCxPQUFkLEVBQXVCckIsT0FBdkIsR0FBaUMyQixPQUFqQyxFQUFiO0FBQ0EsT0FBRyxDQUFDSCxJQUFJSSxFQUFKLENBQU9MLElBQVAsQ0FBSixFQUNDQSxLQUFLckMsT0FBTCxDQUFhMkMsSUFBYixDQUFrQkwsSUFBSTdDLEdBQUosQ0FBUSxDQUFSLENBQWxCO0FBQ0QwQyxhQUFRRyxHQUFSO0FBQ0EsR0FOWSxFQU1WeEIsT0FOVSxFQUFiO0FBT0EsU0FBTyxFQUFDNUIsTUFBSyxVQUFOLEVBQWtCa0Qsa0JBQWxCLEVBQVA7QUFDQSxFQVplO0FBYWhCUSxPQWJnQixrQkFhVGIsSUFiUyxFQWFKN0IsY0FiSSxFQWFXO0FBQzFCLFNBQU8sRUFBQ2hCLE1BQUssU0FBTixFQUFpQmtELFVBQVNMLEtBQUsvQixPQUEvQixFQUFQO0FBQ0EsRUFmZTtBQWdCaEI2QyxFQWhCZ0IsYUFnQmRkLElBaEJjLEVBZ0JUN0IsY0FoQlMsRUFnQk07QUFDckIsTUFBSWpCLElBQUVpQixlQUFlRixPQUFmLENBQXVCK0IsSUFBdkIsQ0FBTjtBQUNBLE1BQUk3QyxPQUFLLEdBQVQ7O0FBRUEsTUFBSTRELFdBQVMsRUFBQzVELFVBQUQsRUFBTTZELElBQUdoQixLQUFLSyxRQUFMLENBQWNZLElBQWQsQ0FBbUI7QUFBQSxRQUFFZixJQUFGLFFBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBVCxFQUFxREcsVUFBU0wsS0FBS0ssUUFBTCxDQUFjYSxNQUFkLENBQXFCO0FBQUEsUUFBRWhCLElBQUYsU0FBRUEsSUFBRjtBQUFBLFdBQVVBLFFBQU0sT0FBaEI7QUFBQSxJQUFyQixDQUE5RCxFQUFiOztBQUVBLE1BQUlpQixNQUFJakUsRUFBRStELElBQUYsQ0FBTyxTQUFQLENBQVI7QUFDQSxNQUFHRSxJQUFJQyxNQUFQLEVBQWM7QUFDYixPQUFJQyxVQUFRRixJQUFJRixJQUFKLENBQVMsWUFBVCxFQUF1QjdELElBQXZCLENBQTRCLE9BQTVCLENBQVo7O0FBRUEsT0FBSWtFLFFBQU1ILElBQUlGLElBQUosQ0FBUyxxQkFBVCxDQUFWO0FBQ0EsT0FBRyxDQUFDSyxNQUFNRixNQUFQLElBQWlCQyxPQUFwQixFQUE0QjtBQUMzQkMsWUFBTW5ELGVBQWVMLE1BQWYsOEJBQWdEdUQsT0FBaEQsNkJBQU47QUFDQTs7QUFFRCxPQUFHQyxNQUFNRixNQUFULEVBQWdCO0FBQ2ZMLGFBQVM1RCxJQUFULEdBQWMsTUFBZDtBQUNBNEQsYUFBU1EsS0FBVCxHQUFlRCxNQUFNTCxJQUFOLENBQVcsV0FBWCxFQUF3QjdELElBQXhCLENBQTZCLE9BQTdCLENBQWY7QUFDQTJELGFBQVNTLEtBQVQsR0FBZUYsTUFBTUwsSUFBTixDQUFXLFVBQVgsRUFBdUI3RCxJQUF2QixDQUE0QixPQUE1QixDQUFmO0FBQ0EsSUFKRCxNQUlLO0FBQ0osUUFBSXFFLGFBQVdOLElBQUlGLElBQUosQ0FBUyxnQkFBVCxFQUEyQjdELElBQTNCLENBQWdDLE9BQWhDLENBQWY7QUFDQSxRQUFHLENBQUNxRSxVQUFELElBQWVKLE9BQWxCLEVBQ0NJLGFBQVd0RCxlQUFlTCxNQUFmLDhCQUFnRHVELE9BQWhELHlCQUE0RWpFLElBQTVFLENBQWlGLE9BQWpGLENBQVg7O0FBRUQsUUFBR3FFLFVBQUgsRUFBYztBQUNiVixjQUFTNUQsSUFBVCxHQUFjLFNBQWQ7QUFDQTRELGNBQVNTLEtBQVQsR0FBZXZDLFNBQVN3QyxVQUFULElBQXFCLENBQXBDO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU9WLFFBQVA7QUFDQSxFQWhEZTtBQWlEaEJXLEVBakRnQixhQWlEZDFCLElBakRjLEVBaURUO0FBQ04sU0FBTyxFQUFDN0MsTUFBSyxHQUFOLEVBQVc2RCxJQUFJaEIsS0FBS0ssUUFBTCxDQUFjWSxJQUFkLENBQW1CO0FBQUEsUUFBRWYsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQW5CLENBQWYsRUFBNERHLFVBQVVMLEtBQUtLLFFBQUwsQ0FBY2EsTUFBZCxDQUFxQjtBQUFBLFFBQUVoQixJQUFGLFNBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBckIsQ0FBdEUsRUFBUDtBQUNBLEVBbkRlO0FBb0RoQnlCLFFBcERnQixtQkFvRFIzQixJQXBEUSxFQW9ESDtBQUNaLFNBQU9BLEtBQUtiLE9BQUwsQ0FBYSxlQUFiLENBQVA7QUFDQSxFQXREZTtBQXVEaEJ5QyxPQXZEZ0Isa0JBdURUNUIsSUF2RFMsRUF1REo3QixjQXZESSxFQXVEVztBQUMxQixNQUFJakIsSUFBRWlCLGVBQWVGLE9BQWYsQ0FBdUIrQixJQUF2QixDQUFOO0FBQ0EsTUFBSTdDLE9BQUtELEVBQUUrRCxJQUFGLENBQU8sNkJBQVAsRUFBc0M3RCxJQUF0QyxDQUEyQyxLQUEzQyxFQUFrREMsS0FBbEQsQ0FBd0QsR0FBeEQsRUFBNkRDLEdBQTdELEVBQVQ7QUFDQSxNQUFJdUUsUUFBTSxFQUFDMUUsa0JBQWVBLElBQWhCLEVBQXdCa0QsVUFBUyxJQUFqQyxFQUFWO0FBQ0EsVUFBT2xELElBQVA7QUFDQSxRQUFLLFNBQUw7QUFDQyxRQUFJMkUsTUFBSTVFLEVBQUUrRCxJQUFGLENBQU8sVUFBUCxFQUFtQjdELElBQW5CLENBQXdCLFNBQXhCLENBQVI7QUFDQUksV0FBT3VFLE1BQVAsQ0FBY0YsS0FBZCxFQUFvQjFELGVBQWU2RCxNQUFmLENBQXNCRixHQUF0QixDQUFwQjtBQUNEO0FBSkE7QUFNQSxTQUFPRCxLQUFQO0FBQ0EsRUFsRWU7QUFtRWhCSSxJQW5FZ0IsZUFtRVpqQyxJQW5FWSxFQW1FUDdCLGNBbkVPLEVBbUVRO0FBQ3ZCLE1BQUlqQixJQUFFaUIsZUFBZUYsT0FBZixDQUF1QitCLElBQXZCLENBQU47QUFDQSxNQUFJZ0IsS0FBRzlELEVBQUUrRCxJQUFGLENBQU8sWUFBUCxDQUFQO0FBQ0EsTUFBSWhELFVBQVFmLEVBQUUrRCxJQUFGLENBQU8saUJBQVAsQ0FBWjtBQUNBLE1BQUlaLFdBQVNwQyxRQUFRb0MsUUFBUixHQUFtQnRCLE9BQW5CLEVBQWI7O0FBRUEsTUFBSW1ELFlBQVVsQixHQUFHQyxJQUFILENBQVEsaUJBQVIsRUFBMkJ2RCxHQUEzQixDQUErQixDQUEvQixDQUFkO0FBQ0EsTUFBR3dFLFNBQUgsRUFBYTtBQUFDO0FBQ2IsT0FBSUMsT0FBS0QsVUFBVS9DLE9BQVYsQ0FBa0IsU0FBbEIsQ0FBVDtBQUFBLE9BQ0NpRCxJQUFFRCxLQUFLOUUsS0FBTCxDQUFXLFVBQVgsQ0FESDtBQUFBLE9BRUM2QyxRQUFNa0MsRUFBRTlFLEdBQUYsSUFBUThFLEVBQUU5RSxHQUFGLEVBQWQsQ0FGRDtBQUdBLE9BQUkrRSxRQUFNcEUsUUFBUXFFLElBQVIsRUFBVjs7QUFFQSxVQUFPLEVBQUNuRixNQUFLLFVBQU4sRUFBa0IrQyxVQUFsQixFQUF3Qm1DLFlBQXhCLEVBQStCaEMsa0JBQS9CLEVBQVA7QUFDQSxHQVBELE1BT0s7QUFBQTtBQUFDO0FBQ0wsUUFBSWtDLGFBQVd2QixHQUFHdEQsR0FBSCxDQUFPLENBQVAsRUFBVTJDLFFBQXpCO0FBQ0EsUUFBSW1DLFNBQU9ELFdBQVdBLFdBQVduQixNQUFYLEdBQWtCLENBQTdCLENBQVg7QUFDQSxRQUFJbEIsT0FBS3NDLE9BQU90QyxJQUFQLENBQVk3QyxLQUFaLENBQWtCLEdBQWxCLEVBQXVCQyxHQUF2QixFQUFUO0FBQ0EsUUFBSUgsT0FBSywrREFBK0RFLEtBQS9ELENBQXFFLEdBQXJFLEVBQ1A0RCxJQURPLENBQ0Y7QUFBQSxZQUFHL0IsS0FBR2dCLElBQU47QUFBQSxLQURFLENBQVQ7QUFFQSxRQUFHL0MsSUFBSCxFQUNDO0FBQUEsU0FBTyxFQUFDQSxtQkFBZ0JBLElBQWpCLEVBQXlCa0QsVUFBUyxJQUFsQztBQUFQLE9BREQsS0FFSTtBQUFDO0FBQ0osU0FBR3BDLFFBQVFnRCxJQUFSLENBQWEsNkJBQWIsRUFBNENHLE1BQS9DLEVBQXNEO0FBQ3JEO0FBQUEsVUFBTyxFQUFDakUsTUFBSyxPQUFOLEVBQWVrRCxrQkFBZjtBQUFQO0FBQ0EsTUFGRCxNQUVLO0FBQ0o7QUFBQSxVQUFPLEVBQUNsRCxNQUFLLFFBQU4sRUFBZ0JrRCxrQkFBaEI7QUFBUDtBQUNBO0FBQ0Q7QUFkRzs7QUFBQTtBQWVKO0FBQ0QsRUFqR2U7QUFrR2hCb0MsVUFsR2dCLHFCQWtHTnpDLElBbEdNLEVBa0dEN0IsY0FsR0MsRUFrR2M7QUFDN0IsTUFBSTRCLE1BQUk1QixlQUFlNkQsTUFBZixDQUFzQmhDLEtBQUtiLE9BQUwsQ0FBYSxNQUFiLENBQXRCLENBQVI7QUFDQSxTQUFPLEVBQUNoQyxNQUFLLFdBQU4sRUFBbUI0QyxRQUFuQixFQUFQO0FBQ0EsRUFyR2U7QUFzR2hCMkMsSUF0R2dCLGVBc0daMUMsSUF0R1ksRUFzR1A7QUFDUixTQUFPQSxLQUFLSyxRQUFMLENBQWNzQyxNQUFkLENBQXFCLFVBQUNDLEtBQUQsRUFBT0MsSUFBUCxFQUFjO0FBQ3pDLFdBQU9BLEtBQUszQyxJQUFaO0FBQ0EsU0FBSyxTQUFMO0FBQ0MwQyxXQUFNNUIsRUFBTixHQUFTNkIsSUFBVDtBQUNEO0FBQ0EsU0FBSyxXQUFMO0FBQ0NELFdBQU1FLElBQU4sR0FBV0QsS0FBS3hDLFFBQWhCO0FBQ0Q7QUFDQTtBQUNDdUMsV0FBTXZDLFFBQU4sQ0FBZU8sSUFBZixDQUFvQmlDLElBQXBCO0FBUkQ7QUFVQSxVQUFPRCxLQUFQO0FBQ0EsR0FaTSxFQVlMLEVBQUN6RixNQUFLLEtBQU4sRUFBWWtELFVBQVMsRUFBckIsRUFBd0JXLElBQUcsSUFBM0IsRUFBZ0M4QixNQUFLLEVBQXJDLEVBWkssQ0FBUDtBQWFBLEVBcEhlO0FBcUhoQkMsR0FySGdCLGNBcUhiL0MsSUFySGEsRUFxSFI7QUFDUCxTQUFPQSxLQUFLSyxRQUFMLENBQWNzQyxNQUFkLENBQXFCLFVBQUNDLEtBQUQsRUFBT0MsSUFBUCxFQUFjO0FBQ3pDLFdBQU9BLEtBQUszQyxJQUFaO0FBQ0EsU0FBSyxRQUFMO0FBQ0MwQyxXQUFNNUIsRUFBTixHQUFTNkIsSUFBVDtBQUNBRCxXQUFNSSxRQUFOLEdBQWUsQ0FBQyxDQUFDSCxLQUFLeEMsUUFBTCxDQUFjWSxJQUFkLENBQW1CO0FBQUEsYUFBRy9CLEVBQUVnQixJQUFGLElBQVEsYUFBWDtBQUFBLE1BQW5CLENBQWpCO0FBQ0Q7QUFDQTtBQUNDMEMsV0FBTXZDLFFBQU4sQ0FBZU8sSUFBZixDQUFvQmlDLElBQXBCO0FBTkQ7QUFRQSxVQUFPRCxLQUFQO0FBQ0EsR0FWTSxFQVVMLEVBQUN6RixNQUFLLElBQU4sRUFBV2tELFVBQVMsRUFBcEIsRUFBdUJXLElBQUcsSUFBMUIsRUFWSyxDQUFQO0FBV0EsRUFqSWU7QUFrSWhCaUMsR0FsSWdCLGNBa0liakQsSUFsSWEsRUFrSVI7QUFDUCxTQUFPQSxLQUFLSyxRQUFMLENBQWNzQyxNQUFkLENBQXFCLFVBQUNDLEtBQUQsRUFBT0MsSUFBUCxFQUFjO0FBQ3pDLFdBQU9BLEtBQUszQyxJQUFaO0FBQ0EsU0FBSyxRQUFMO0FBQ0MwQyxXQUFNNUIsRUFBTixHQUFTNkIsSUFBVDtBQUNEO0FBQ0E7QUFDQ0QsV0FBTXZDLFFBQU4sQ0FBZU8sSUFBZixDQUFvQmlDLElBQXBCO0FBTEQ7QUFPQSxVQUFPRCxLQUFQO0FBQ0EsR0FUTSxFQVNMLEVBQUN6RixNQUFLLElBQU4sRUFBV2tELFVBQVMsRUFBcEIsRUFBdUJXLElBQUcsSUFBMUIsRUFUSyxDQUFQO0FBVUEsRUE3SWU7QUE4SWhCa0MsWUE5SWdCLHVCQThJSmxELElBOUlJLEVBOElDO0FBQ2hCLFNBQU8sRUFBQzdDLE1BQUssT0FBTixFQUFQO0FBQ0EsRUFoSmU7QUFpSmhCZ0csTUFqSmdCLGlCQWlKVm5ELElBakpVLEVBaUpMO0FBQ1YsU0FBTyxFQUFDN0MsTUFBSyxPQUFOLEVBQWV5QixJQUFHb0IsS0FBS2IsT0FBTCxDQUFhLFdBQWIsQ0FBbEIsRUFBUDtBQUNBLEVBbkplO0FBb0poQmlFLFlBcEpnQix1QkFvSkpwRCxJQXBKSSxFQW9KQztBQUNoQixTQUFPLEVBQUM3QyxNQUFLLGFBQU4sRUFBb0J5QixJQUFHb0IsS0FBS2IsT0FBTCxDQUFhLGlCQUFiLENBQXZCLEVBQVA7QUFDQSxFQXRKZTtBQXVKaEJrRSxJQXZKZ0IsZUF1SlpyRCxJQXZKWSxFQXVKUDtBQUNSLFNBQU8sRUFBQzdDLE1BQUssS0FBTixFQUFZeUIsSUFBR29CLEtBQUtiLE9BQUwsQ0FBYSxTQUFiLENBQWYsRUFBdUNpRSxhQUFZcEQsS0FBS0ssUUFBTCxDQUFjWSxJQUFkLENBQW1CO0FBQUEsV0FBRy9CLEVBQUVnQixJQUFGLElBQVEsaUJBQVg7QUFBQSxJQUFuQixFQUFpRGYsT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBekplO0FBMEpoQm1FLGFBMUpnQiwwQkEwSkY7QUFDYixTQUFPLElBQVA7QUFDQSxFQTVKZTtBQTZKaEJDLE9BN0pnQixrQkE2SlR2RCxJQTdKUyxFQTZKSjtBQUNYLFNBQU8sRUFBQzdDLE1BQUssUUFBTixFQUFla0QsVUFBUyxFQUF4QixFQUFQO0FBQ0E7QUEvSmUsQ0FBakIiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHRpZih0eXBlPT1cImN1c3RvbVhtbFwiKVxyXG5cdFx0XHRcdHJldHVyblxyXG5cdFx0XHRsZXQgdGFyZ2V0PSQuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyx0eXBlLHtcclxuXHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT1PZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5udW1iZXJpbmcpXHJcblx0XHRcdHRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT1vZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRjb25zdCBkb2M9e31cclxuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcclxuXHRcdGZ1bmN0aW9uIF9pZGVudGlmeSgpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQoXCIqXCIsbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGRvbUhhbmRsZXIuZW1pdChtb2RlbC50eXBlLCBtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXHJcblx0XHRcdFx0XHRkb21IYW5kbGVyW2BvbiR7bW9kZWwudHlwZX1gXShtb2RlbCwuLi5hcmd1bWVudHMpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG1vZGVsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdGRvYy5zdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRkb2MubnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRkb2MuZG9jdW1lbnQ9dGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdHJldHVybiBkb2NcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzF9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9LyR7dGFyZ2V0TmFtZX1gXHJcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcclxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0PVwiJHtwYXJ0TmFtZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gaWRcclxuXHR9XHJcblxyXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHJcblx0XHRsZXQgaWQ9YHJJZCR7TWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0c3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcclxuXHRcdGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXHJcblx0XHRpZihpZGVudGl0aWVzW3RhZ10pXHJcblx0XHRcdHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKXx8dGFnXHJcblxyXG5cdFx0cmV0dXJuIHRhZ1xyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgT2ZmaWNlRG9jdW1lbnRcclxuXHJcbmNvbnN0IGlkZW50aXRpZXM9e1xyXG5cdGRvY3VtZW50KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudFxyXG5cdFx0bGV0IGN1cnJlbnQ9bnVsbFxyXG5cdFx0bGV0IGNoaWxkcmVuPSQoXCJ3XFxcXDpzZWN0UHJcIikuZWFjaCgoaSxzZWN0KT0+e1xyXG5cdFx0XHRsZXQgZW5kPSQoc2VjdCkuY2xvc2VzdCgnd1xcXFw6Ym9keT4qJylcclxuXHRcdFx0c2VjdC5jb250ZW50PWVuZC5wcmV2VW50aWwoY3VycmVudCkudG9BcnJheSgpLnJldmVyc2UoKVxyXG5cdFx0XHRpZighZW5kLmlzKHNlY3QpKVxyXG5cdFx0XHRcdHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpXHJcblx0XHRcdGN1cnJlbnQ9ZW5kXHJcblx0XHR9KS50b0FycmF5KClcclxuXHRcdHJldHVybiB7dHlwZTpcImRvY3VtZW50XCIsIGNoaWxkcmVufVxyXG5cdH0sXHJcblx0c2VjdFByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpeyBcclxuXHRcdHJldHVybiB7dHlwZTpcInNlY3Rpb25cIiwgY2hpbGRyZW46d1htbC5jb250ZW50fVxyXG5cdH0sXHJcblx0cCh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbClcclxuXHRcdGxldCB0eXBlPVwicFwiXHJcblxyXG5cdFx0bGV0IGlkZW50aXR5PXt0eXBlLHByOndYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnBQclwiKSxjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnBQclwiKX1cclxuXHJcblx0XHRsZXQgcFByPSQuZmluZChcIndcXFxcOnBQclwiKVxyXG5cdFx0aWYocFByLmxlbmd0aCl7XHJcblx0XHRcdGxldCBzdHlsZUlkPXBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0bGV0IG51bVByPXBQci5maW5kKFwid1xcXFw6bnVtUHI+d1xcXFw6bnVtSWRcIilcclxuXHRcdFx0aWYoIW51bVByLmxlbmd0aCAmJiBzdHlsZUlkKXtcclxuXHRcdFx0XHRudW1Qcj1vZmZpY2VEb2N1bWVudC5zdHlsZXMoYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke3N0eWxlSWR9XCJdIHdcXFxcOm51bVByPndcXFxcOm51bUlkYClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYobnVtUHIubGVuZ3RoKXtcclxuXHRcdFx0XHRpZGVudGl0eS50eXBlPVwibGlzdFwiXHJcblx0XHRcdFx0aWRlbnRpdHkubnVtSWQ9bnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlkZW50aXR5LmxldmVsPW51bVByLmZpbmQoXCJ3XFxcXDppbHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgb3V0bGluZUx2bD1wUHIuZmluZChcIndcXFxcOm91dGxpbmVMdmxcIikuYXR0cihcInc6dmFsXCIpXHJcblx0XHRcdFx0aWYoIW91dGxpbmVMdmwgJiYgc3R5bGVJZClcclxuXHRcdFx0XHRcdG91dGxpbmVMdmw9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpvdXRsaW5lTHZsYCkuYXR0cihcInc6dmFsXCIpXHJcblxyXG5cdFx0XHRcdGlmKG91dGxpbmVMdmwpe1xyXG5cdFx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImhlYWRpbmdcIlxyXG5cdFx0XHRcdFx0aWRlbnRpdHkubGV2ZWw9cGFyc2VJbnQob3V0bGluZUx2bCkrMVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBpZGVudGl0eVxyXG5cdH0sXHJcblx0cih3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInJcIiwgcHI6IHdYbWwuY2hpbGRyZW4uZmluZCgoe25hbWV9KT0+bmFtZT09XCJ3OnJQclwiKSwgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInc6clByXCIpfVxyXG5cdH0sXHJcblx0ZmxkQ2hhcih3WG1sKXtcclxuXHRcdHJldHVybiB3WG1sLmF0dHJpYnNbXCJ3OmZsZENoYXJUeXBlXCJdXHJcblx0fSxcclxuXHRpbmxpbmUod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT0kLmZpbmQoJ2FcXFxcOmdyYXBoaWM+YVxcXFw6Z3JhcGhpY0RhdGEnKS5hdHRyKCd1cmknKS5zcGxpdCgnLycpLnBvcCgpXHJcblx0XHRsZXQgcHJvcHM9e3R5cGU6YGlubGluZS4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJwaWN0dXJlXCI6XHJcblx0XHRcdGxldCByaWQ9JC5maW5kKCdhXFxcXDpibGlwJykuYXR0cigncjplbWJlZCcpXHJcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCkpXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHByb3BzXHJcblx0fSxcclxuXHRzZHQod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgcHI9JC5maW5kKCc+d1xcXFw6c2R0UHInKVxyXG5cdFx0bGV0IGNvbnRlbnQ9JC5maW5kKCc+d1xcXFw6c2R0Q29udGVudCcpXHJcblx0XHRsZXQgY2hpbGRyZW49Y29udGVudC5jaGlsZHJlbigpLnRvQXJyYXkoKVxyXG5cclxuXHRcdGxldCBlbEJpbmRpbmc9cHIuZmluZCgnd1xcXFw6ZGF0YUJpbmRpbmcnKS5nZXQoMClcclxuXHRcdGlmKGVsQmluZGluZyl7Ly9wcm9wZXJ0aWVzXHJcblx0XHRcdGxldCBwYXRoPWVsQmluZGluZy5hdHRyaWJzWyd3OnhwYXRoJ10sXHJcblx0XHRcdFx0ZD1wYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG5cdFx0XHRcdG5hbWU9KGQucG9wKCksZC5wb3AoKSk7XHJcblx0XHRcdGxldCB2YWx1ZT1jb250ZW50LnRleHQoKVxyXG5cclxuXHRcdFx0cmV0dXJuIHt0eXBlOlwicHJvcGVydHlcIiwgbmFtZSwgdmFsdWUsIGNoaWxkcmVufVxyXG5cdFx0fWVsc2V7Ly9jb250cm9sc1xyXG5cdFx0XHRsZXQgcHJDaGlsZHJlbj1wci5nZXQoMCkuY2hpbGRyZW5cclxuXHRcdFx0bGV0IGVsVHlwZT1wckNoaWxkcmVuW3ByQ2hpbGRyZW4ubGVuZ3RoLTFdXHJcblx0XHRcdGxldCBuYW1lPWVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxyXG5cdFx0XHRsZXQgdHlwZT1cInRleHQscGljdHVyZSxkb2NQYXJ0TGlzdCxjb21ib0JveCxkcm9wRG93bkxpc3QsZGF0ZSxjaGVja2JveFwiLnNwbGl0KFwiLFwiKVxyXG5cdFx0XHRcdC5maW5kKGE9PmE9PW5hbWUpXHJcblx0XHRcdGlmKHR5cGUpXHJcblx0XHRcdFx0cmV0dXJuIHt0eXBlOmBjb250cm9sLiR7dHlwZX1gLCBjaGlsZHJlbjpudWxsfVxyXG5cdFx0XHRlbHNley8vY29udGFpbmVyXHJcblx0XHRcdFx0aWYoY29udGVudC5maW5kKFwid1xcXFw6cCx3XFxcXDp0Ymwsd1xcXFw6dHIsd1xcXFw6dGNcIikubGVuZ3RoKXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImJsb2NrXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIHt0eXBlOlwiaW5saW5lXCIsIGNoaWxkcmVufVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblx0aHlwZXJsaW5rKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0IHVybD1vZmZpY2VEb2N1bWVudC5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcclxuXHRcdHJldHVybiB7dHlwZTpcImh5cGVybGlua1wiLCB1cmx9XHJcblx0fSxcclxuXHR0Ymwod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0YmxQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0Y2FzZSBcInc6dGJsR3JpZFwiOlxyXG5cdFx0XHRcdHN0YXRlLmNvbHM9bm9kZS5jaGlsZHJlblxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0YmxcIixjaGlsZHJlbjpbXSxwcjpudWxsLGNvbHM6W119KVxyXG5cdH0sXHJcblx0dHIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0clByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRcdHN0YXRlLmlzSGVhZGVyPSEhbm9kZS5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OnRibEhlYWRlclwiKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0clwiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0dGMod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoKHN0YXRlLG5vZGUpPT57XHJcblx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRjYXNlIFwidzp0Y1ByXCI6XHJcblx0XHRcdFx0c3RhdGUucHI9bm9kZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdHN0YXRlLmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se3R5cGU6XCJ0Y1wiLGNoaWxkcmVuOltdLHByOm51bGx9KVxyXG5cdH0sXHJcblx0ZG9jRGVmYXVsdHMod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwifVxyXG5cdH0sXHJcblx0c3R5bGUod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLCBpZDp3WG1sLmF0dHJpYnNbJ3c6c3R5bGVJZCddfVxyXG5cdH0sXHJcblx0YWJzdHJhY3ROdW0od1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJhYnN0cmFjdE51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6YWJzdHJhY3ROdW1JZFwiXX1cclxuXHR9LFxyXG5cdG51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcIm51bVwiLGlkOndYbWwuYXR0cmlic1tcInc6bnVtSWRcIl0sYWJzdHJhY3ROdW06d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdH0sXHJcblx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH0sXHJcblx0b2JqZWN0KHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwib2JqZWN0XCIsY2hpbGRyZW46W119XHJcblx0fVxyXG59XHJcbiJdfQ==