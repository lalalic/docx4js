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
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});
		}
	}, {
		key: "render",
		value: function render(createElement) {
			var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : OfficeDocument.identify;

			Object.freeze(this.content);
			return this.renderNode.apply(this, [this.content("w\\:document").get(0)].concat(Array.prototype.slice.call(arguments)));
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
				return parseInt(a.substring(3));
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
	document: function document(wXml) {
		return { type: "document", children: wXml.children[0].children };
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

			var numPr = pPr.find("w\\:numPr");
			if (!numPr.length && styleId) {
				numPr = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"] w\\:numPr");
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
	}
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCIkIiwidHlwZSIsImF0dHIiLCJzcGxpdCIsInBvcCIsImdldFJlbE9iamVjdCIsImNyZWF0ZUVsZW1lbnQiLCJpZGVudGlmeSIsIk9iamVjdCIsImZyZWV6ZSIsImNvbnRlbnQiLCJyZW5kZXJOb2RlIiwiZ2V0IiwiYXJndW1lbnRzIiwiZG9tSGFuZGxlciIsIm9mZmljZURvY3VtZW50IiwiZG9jIiwiYmluZCIsIl9pZGVudGlmeSIsIm1vZGVsIiwiZW1pdCIsImRvY3VtZW50Iiwic3R5bGVzIiwibnVtYmVyaW5nIiwiZGF0YSIsImlkIiwiTWF0aCIsIm1heCIsInRvQXJyYXkiLCJtYXAiLCJwYXJzZUludCIsImEiLCJhdHRyaWJzIiwiSWQiLCJzdWJzdHJpbmciLCJ0YXJnZXROYW1lIiwidCIsInRhcmdldCIsIm1hdGNoIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyYXciLCJmaWxlIiwicGFydHMiLCJhcHBlbmQiLCJ1cmwiLCJ3WG1sIiwidGFnIiwibmFtZSIsImlkZW50aXRpZXMiLCJjaGlsZHJlbiIsInAiLCJpZGVudGl0eSIsInByIiwiZmluZCIsImZpbHRlciIsInBQciIsImxlbmd0aCIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJvdXRsaW5lTHZsIiwiciIsImZsZENoYXIiLCJpbmxpbmUiLCJwcm9wcyIsInJpZCIsImFzc2lnbiIsImdldFJlbCIsInNkdCIsImVsQmluZGluZyIsInBhdGgiLCJkIiwidmFsdWUiLCJ0ZXh0IiwicHJDaGlsZHJlbiIsImVsVHlwZSIsImh5cGVybGluayIsInRibCIsInJlZHVjZSIsInN0YXRlIiwibm9kZSIsImNvbHMiLCJwdXNoIiwidHIiLCJpc0hlYWRlciIsInJQckRlZmF1bHQiLCJwUHJEZWZhdWx0Iiwic3R5bGUiLCJhYnN0cmFjdE51bSIsIm51bSIsImxhdGVudFN0eWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7Ozs7Ozs7Ozs7OzBCQUNMO0FBQUE7O0FBQ047QUFDQSxRQUFLQyxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxXQUFLSCxJQUFMLElBQVcsT0FBS0ksWUFBTCxDQUFrQkwsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsQ0FBWDtBQUNBLElBSkQ7QUFLQTs7O3lCQUVNSSxhLEVBQWdEO0FBQUEsT0FBakNDLFFBQWlDLHVFQUF4QlosZUFBZVksUUFBUzs7QUFDdERDLFVBQU9DLE1BQVAsQ0FBYyxLQUFLQyxPQUFuQjtBQUNBLFVBQU8sS0FBS0MsVUFBTCxjQUFnQixLQUFLRCxPQUFMLENBQWEsY0FBYixFQUE2QkUsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsb0NBQXVEQyxTQUF2RCxHQUFQO0FBQ0E7Ozt3QkFFS0MsVSxFQUE0QztBQUFBLE9BQWpDUCxRQUFpQyx1RUFBeEJRLGVBQWVSLFFBQVM7O0FBQ2pELE9BQU1TLE1BQUksRUFBVjtBQUNBLE9BQU1WLGdCQUFjUSxXQUFXUixhQUFYLENBQXlCVyxJQUF6QixDQUE4QkgsVUFBOUIsQ0FBcEI7QUFDQSxZQUFTSSxTQUFULEdBQW9CO0FBQ25CLFFBQUlDLFFBQU1aLDBCQUFZTSxTQUFaLENBQVY7QUFDQSxRQUFHTSxTQUFTLFFBQU9BLEtBQVAseUNBQU9BLEtBQVAsTUFBZSxRQUEzQixFQUFvQztBQUNuQ0wsZ0JBQVdNLElBQVgsb0JBQWdCLEdBQWhCLEVBQW9CRCxLQUFwQixvQ0FBNkJOLFNBQTdCO0FBQ0FDLGdCQUFXTSxJQUFYLG9CQUFnQkQsTUFBTWxCLElBQXRCLEVBQTRCa0IsS0FBNUIsb0NBQXFDTixTQUFyQztBQUNBLFNBQUdDLGtCQUFnQkssTUFBTWxCLElBQXRCLENBQUgsRUFDQ2Esa0JBQWdCSyxNQUFNbEIsSUFBdEIscUJBQThCa0IsS0FBOUIsb0NBQXVDTixTQUF2QztBQUNEO0FBQ0QsV0FBT00sS0FBUDtBQUNBOztBQUVESCxPQUFJSyxRQUFKLEdBQWEsS0FBS1YsVUFBTCxDQUFnQixLQUFLRCxPQUFMLENBQWEsY0FBYixFQUE2QkUsR0FBN0IsQ0FBaUMsQ0FBakMsQ0FBaEIsRUFBb0ROLGFBQXBELEVBQWtFWSxTQUFsRSxDQUFiO0FBQ0EsT0FBRyxLQUFLSSxNQUFSLEVBQ0NOLElBQUlNLE1BQUosR0FBVyxLQUFLWCxVQUFMLENBQWdCLEtBQUtXLE1BQUwsQ0FBWSxZQUFaLEVBQTBCVixHQUExQixDQUE4QixDQUE5QixDQUFoQixFQUFpRE4sYUFBakQsRUFBK0RZLFNBQS9ELENBQVg7QUFDRCxPQUFHLEtBQUtLLFNBQVIsRUFDQ1AsSUFBSU8sU0FBSixHQUFjLEtBQUtaLFVBQUwsQ0FBZ0IsS0FBS1ksU0FBTCxDQUFlLGVBQWYsRUFBZ0NYLEdBQWhDLENBQW9DLENBQXBDLENBQWhCLEVBQXVETixhQUF2RCxFQUFxRVksU0FBckUsQ0FBZDtBQUNELFVBQU9GLEdBQVA7QUFDQTs7OzJCQUVRUSxJLEVBQUs7QUFDYixPQUFNdkIsT0FBSywyRUFBWDtBQUNBLE9BQUl3QixjQUFTQyxLQUFLQyxHQUFMLGdDQUFZLEtBQUsvQixJQUFMLENBQVUsY0FBVixFQUEwQmdDLE9BQTFCLEdBQW9DQyxHQUFwQyxDQUF3QztBQUFBLFdBQUdDLFNBQVNDLEVBQUVDLE9BQUYsQ0FBVUMsRUFBVixDQUFhQyxTQUFiLENBQXVCLENBQXZCLENBQVQsQ0FBSDtBQUFBLElBQXhDLENBQVosS0FBNkYsQ0FBdEcsQ0FBSjs7QUFFQSxPQUFJQyxhQUFXLGlCQUFlVCxLQUFLQyxHQUFMLGdDQUFZLEtBQUsvQixJQUFMLENBQVUsNkJBQVYsRUFBeUNnQyxPQUF6QyxHQUFtREMsR0FBbkQsQ0FBdUQsYUFBRztBQUNuRyxXQUFPQyxTQUFTTSxFQUFFSixPQUFGLENBQVVLLE1BQVYsQ0FBaUJDLEtBQWpCLENBQXVCLEtBQXZCLEVBQThCLENBQTlCLEtBQWtDLEdBQTNDLENBQVA7QUFDQSxJQUZ5QyxDQUFaLEtBRTFCLENBRlcsSUFFUixNQUZQOztBQUlBLE9BQUlDLFdBQVksS0FBS0MsTUFBakIsU0FBMkJMLFVBQS9CO0FBQ0EsUUFBS25CLEdBQUwsQ0FBU3lCLEdBQVQsQ0FBYUMsSUFBYixDQUFrQkgsUUFBbEIsRUFBNEJmLElBQTVCO0FBQ0EsUUFBS1IsR0FBTCxDQUFTMkIsS0FBVCxDQUFlSixRQUFmLElBQXlCLEtBQUt2QixHQUFMLENBQVN5QixHQUFULENBQWFDLElBQWIsQ0FBa0JILFFBQWxCLENBQXpCOztBQUVBLFFBQUszQyxJQUFMLENBQVUsZUFBVixFQUNFZ0QsTUFERiwyQkFDZ0MzQyxJQURoQyxnQkFDNkN3QixFQUQ3QyxvQkFDNERjLFFBRDVEOztBQUdBLFVBQU9kLEVBQVA7QUFDQTs7O21DQUVnQm9CLEcsRUFBSTtBQUNwQixPQUFNNUMsT0FBSywyRUFBWDs7QUFFQSxPQUFJd0IsY0FBU0MsS0FBS0MsR0FBTCxnQ0FBWSxLQUFLL0IsSUFBTCxDQUFVLGNBQVYsRUFBMEJnQyxPQUExQixHQUFvQ0MsR0FBcEMsQ0FBd0M7QUFBQSxXQUFHQyxTQUFTQyxFQUFFRyxTQUFGLENBQVksQ0FBWixDQUFULENBQUg7QUFBQSxJQUF4QyxDQUFaLEtBQWtGLENBQTNGLENBQUo7O0FBRUEsUUFBS3RDLElBQUwsQ0FBVSxlQUFWLEVBQ0VnRCxNQURGLDJCQUNnQzNDLElBRGhDLGdCQUM2Q3dCLEVBRDdDLDRDQUNrRm9CLEdBRGxGOztBQUdBLFVBQU9wQixFQUFQO0FBQ0E7OzsyQkFFZXFCLEksRUFBTS9CLGMsRUFBZTtBQUNwQyxPQUFNZ0MsTUFBSUQsS0FBS0UsSUFBTCxDQUFVN0MsS0FBVixDQUFnQixHQUFoQixFQUFxQkMsR0FBckIsRUFBVjtBQUNBLE9BQUc2QyxXQUFXRixHQUFYLENBQUgsRUFDQyxPQUFPRSxXQUFXRixHQUFYLG9CQUFtQmxDLFNBQW5CLEtBQStCa0MsR0FBdEM7O0FBRUQsVUFBT0EsR0FBUDtBQUNBOzs7Ozs7a0JBR2FwRCxjOzs7QUFFZixJQUFNc0QsYUFBVztBQUNoQjVCLFNBRGdCLG9CQUNQeUIsSUFETyxFQUNGO0FBQ2IsU0FBTyxFQUFDN0MsTUFBSyxVQUFOLEVBQWtCaUQsVUFBVUosS0FBS0ksUUFBTCxDQUFjLENBQWQsRUFBaUJBLFFBQTdDLEVBQVA7QUFDQSxFQUhlO0FBSWhCQyxFQUpnQixhQUlkTCxJQUpjLEVBSVQvQixjQUpTLEVBSU07QUFDckIsTUFBSWYsSUFBRWUsZUFBZUwsT0FBZixDQUF1Qm9DLElBQXZCLENBQU47QUFDQSxNQUFJN0MsT0FBSyxHQUFUOztBQUVBLE1BQUltRCxXQUFTLEVBQUNuRCxVQUFELEVBQU1vRCxJQUFHUCxLQUFLSSxRQUFMLENBQWNJLElBQWQsQ0FBbUI7QUFBQSxRQUFFTixJQUFGLFFBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBVCxFQUFxREUsVUFBU0osS0FBS0ksUUFBTCxDQUFjSyxNQUFkLENBQXFCO0FBQUEsUUFBRVAsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQXJCLENBQTlELEVBQWI7O0FBRUEsTUFBSVEsTUFBSXhELEVBQUVzRCxJQUFGLENBQU8sU0FBUCxDQUFSO0FBQ0EsTUFBR0UsSUFBSUMsTUFBUCxFQUFjO0FBQ2IsT0FBSUMsVUFBUUYsSUFBSUYsSUFBSixDQUFTLFlBQVQsRUFBdUJwRCxJQUF2QixDQUE0QixPQUE1QixDQUFaOztBQUVBLE9BQUl5RCxRQUFNSCxJQUFJRixJQUFKLENBQVMsV0FBVCxDQUFWO0FBQ0EsT0FBRyxDQUFDSyxNQUFNRixNQUFQLElBQWlCQyxPQUFwQixFQUE0QjtBQUMzQkMsWUFBTTVDLGVBQWVPLE1BQWYsOEJBQWdEb0MsT0FBaEQsbUJBQU47QUFDQTs7QUFFRCxPQUFHQyxNQUFNRixNQUFULEVBQWdCO0FBQ2ZMLGFBQVNuRCxJQUFULEdBQWMsTUFBZDtBQUNBbUQsYUFBU1EsS0FBVCxHQUFlRCxNQUFNTCxJQUFOLENBQVcsV0FBWCxFQUF3QnBELElBQXhCLENBQTZCLE9BQTdCLENBQWY7QUFDQWtELGFBQVNTLEtBQVQsR0FBZUYsTUFBTUwsSUFBTixDQUFXLFVBQVgsRUFBdUJwRCxJQUF2QixDQUE0QixPQUE1QixDQUFmO0FBQ0EsSUFKRCxNQUlLO0FBQ0osUUFBSTRELGFBQVdOLElBQUlGLElBQUosQ0FBUyxnQkFBVCxFQUEyQnBELElBQTNCLENBQWdDLE9BQWhDLENBQWY7QUFDQSxRQUFHLENBQUM0RCxVQUFELElBQWVKLE9BQWxCLEVBQ0NJLGFBQVcvQyxlQUFlTyxNQUFmLDhCQUFnRG9DLE9BQWhELHlCQUE0RXhELElBQTVFLENBQWlGLE9BQWpGLENBQVg7O0FBRUQsUUFBRzRELFVBQUgsRUFBYztBQUNiVixjQUFTbkQsSUFBVCxHQUFjLFNBQWQ7QUFDQW1ELGNBQVNTLEtBQVQsR0FBZS9CLFNBQVNnQyxVQUFULElBQXFCLENBQXBDO0FBQ0E7QUFDRDtBQUNEOztBQUVELFNBQU9WLFFBQVA7QUFDQSxFQXBDZTtBQXFDaEJXLEVBckNnQixhQXFDZGpCLElBckNjLEVBcUNUO0FBQ04sU0FBTyxFQUFDN0MsTUFBSyxHQUFOLEVBQVdvRCxJQUFJUCxLQUFLSSxRQUFMLENBQWNJLElBQWQsQ0FBbUI7QUFBQSxRQUFFTixJQUFGLFNBQUVBLElBQUY7QUFBQSxXQUFVQSxRQUFNLE9BQWhCO0FBQUEsSUFBbkIsQ0FBZixFQUE0REUsVUFBVUosS0FBS0ksUUFBTCxDQUFjSyxNQUFkLENBQXFCO0FBQUEsUUFBRVAsSUFBRixTQUFFQSxJQUFGO0FBQUEsV0FBVUEsUUFBTSxPQUFoQjtBQUFBLElBQXJCLENBQXRFLEVBQVA7QUFDQSxFQXZDZTtBQXdDaEJnQixRQXhDZ0IsbUJBd0NSbEIsSUF4Q1EsRUF3Q0g7QUFDWixTQUFPQSxLQUFLZCxPQUFMLENBQWEsZUFBYixDQUFQO0FBQ0EsRUExQ2U7QUEyQ2hCaUMsT0EzQ2dCLGtCQTJDVG5CLElBM0NTLEVBMkNKL0IsY0EzQ0ksRUEyQ1c7QUFDMUIsTUFBSWYsSUFBRWUsZUFBZUwsT0FBZixDQUF1Qm9DLElBQXZCLENBQU47QUFDQSxNQUFJN0MsT0FBS0QsRUFBRXNELElBQUYsQ0FBTyw2QkFBUCxFQUFzQ3BELElBQXRDLENBQTJDLEtBQTNDLEVBQWtEQyxLQUFsRCxDQUF3RCxHQUF4RCxFQUE2REMsR0FBN0QsRUFBVDtBQUNBLE1BQUk4RCxRQUFNLEVBQUNqRSxrQkFBZUEsSUFBaEIsRUFBd0JpRCxVQUFTLElBQWpDLEVBQVY7QUFDQSxVQUFPakQsSUFBUDtBQUNBLFFBQUssU0FBTDtBQUNDLFFBQUlrRSxNQUFJbkUsRUFBRXNELElBQUYsQ0FBTyxVQUFQLEVBQW1CcEQsSUFBbkIsQ0FBd0IsU0FBeEIsQ0FBUjtBQUNBTSxXQUFPNEQsTUFBUCxDQUFjRixLQUFkLEVBQW9CbkQsZUFBZXNELE1BQWYsQ0FBc0JGLEdBQXRCLENBQXBCO0FBQ0Q7QUFKQTtBQU1BLFNBQU9ELEtBQVA7QUFDQSxFQXREZTtBQXVEaEJJLElBdkRnQixlQXVEWnhCLElBdkRZLEVBdURQL0IsY0F2RE8sRUF1RFE7QUFDdkIsTUFBSWYsSUFBRWUsZUFBZUwsT0FBZixDQUF1Qm9DLElBQXZCLENBQU47QUFDQSxNQUFJTyxLQUFHckQsRUFBRXNELElBQUYsQ0FBTyxZQUFQLENBQVA7QUFDQSxNQUFJNUMsVUFBUVYsRUFBRXNELElBQUYsQ0FBTyxpQkFBUCxDQUFaO0FBQ0EsTUFBSUosV0FBU3hDLFFBQVF3QyxRQUFSLEdBQW1CdEIsT0FBbkIsRUFBYjs7QUFFQSxNQUFJMkMsWUFBVWxCLEdBQUdDLElBQUgsQ0FBUSxpQkFBUixFQUEyQjFDLEdBQTNCLENBQStCLENBQS9CLENBQWQ7QUFDQSxNQUFHMkQsU0FBSCxFQUFhO0FBQUM7QUFDYixPQUFJQyxPQUFLRCxVQUFVdkMsT0FBVixDQUFrQixTQUFsQixDQUFUO0FBQUEsT0FDQ3lDLElBQUVELEtBQUtyRSxLQUFMLENBQVcsVUFBWCxDQURIO0FBQUEsT0FFQzZDLFFBQU15QixFQUFFckUsR0FBRixJQUFRcUUsRUFBRXJFLEdBQUYsRUFBZCxDQUZEO0FBR0EsT0FBSXNFLFFBQU1oRSxRQUFRaUUsSUFBUixFQUFWOztBQUVBLFVBQU8sRUFBQzFFLE1BQUssVUFBTixFQUFrQitDLFVBQWxCLEVBQXdCMEIsWUFBeEIsRUFBK0J4QixrQkFBL0IsRUFBUDtBQUNBLEdBUEQsTUFPSztBQUFBO0FBQUM7QUFDTCxRQUFJMEIsYUFBV3ZCLEdBQUd6QyxHQUFILENBQU8sQ0FBUCxFQUFVc0MsUUFBekI7QUFDQSxRQUFJMkIsU0FBT0QsV0FBV0EsV0FBV25CLE1BQVgsR0FBa0IsQ0FBN0IsQ0FBWDtBQUNBLFFBQUlULE9BQUs2QixPQUFPN0IsSUFBUCxDQUFZN0MsS0FBWixDQUFrQixHQUFsQixFQUF1QkMsR0FBdkIsRUFBVDtBQUNBLFFBQUlILE9BQUssK0RBQStERSxLQUEvRCxDQUFxRSxHQUFyRSxFQUNQbUQsSUFETyxDQUNGO0FBQUEsWUFBR3ZCLEtBQUdpQixJQUFOO0FBQUEsS0FERSxDQUFUO0FBRUEsUUFBRy9DLElBQUgsRUFDQztBQUFBLFNBQU8sRUFBQ0EsbUJBQWdCQSxJQUFqQixFQUF5QmlELFVBQVMsSUFBbEM7QUFBUCxPQURELEtBRUk7QUFBQztBQUNKLFNBQUd4QyxRQUFRNEMsSUFBUixDQUFhLDZCQUFiLEVBQTRDRyxNQUEvQyxFQUFzRDtBQUNyRDtBQUFBLFVBQU8sRUFBQ3hELE1BQUssT0FBTixFQUFlaUQsa0JBQWY7QUFBUDtBQUNBLE1BRkQsTUFFSztBQUNKO0FBQUEsVUFBTyxFQUFDakQsTUFBSyxRQUFOLEVBQWdCaUQsa0JBQWhCO0FBQVA7QUFDQTtBQUNEO0FBZEc7O0FBQUE7QUFlSjtBQUNELEVBckZlO0FBc0ZoQjRCLFVBdEZnQixxQkFzRk5oQyxJQXRGTSxFQXNGRC9CLGNBdEZDLEVBc0ZjO0FBQzdCLE1BQUk4QixNQUFJOUIsZUFBZXNELE1BQWYsQ0FBc0J2QixLQUFLZCxPQUFMLENBQWEsTUFBYixDQUF0QixDQUFSO0FBQ0EsU0FBTyxFQUFDL0IsTUFBSyxXQUFOLEVBQW1CNEMsUUFBbkIsRUFBUDtBQUNBLEVBekZlO0FBMEZoQmtDLElBMUZnQixlQTBGWmpDLElBMUZZLEVBMEZQO0FBQ1IsU0FBT0EsS0FBS0ksUUFBTCxDQUFjOEIsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLbEMsSUFBWjtBQUNBLFNBQUssU0FBTDtBQUNDaUMsV0FBTTVCLEVBQU4sR0FBUzZCLElBQVQ7QUFDRDtBQUNBLFNBQUssV0FBTDtBQUNDRCxXQUFNRSxJQUFOLEdBQVdELEtBQUtoQyxRQUFoQjtBQUNEO0FBQ0E7QUFDQytCLFdBQU0vQixRQUFOLENBQWVrQyxJQUFmLENBQW9CRixJQUFwQjtBQVJEO0FBVUEsVUFBT0QsS0FBUDtBQUNBLEdBWk0sRUFZTCxFQUFDaEYsTUFBSyxLQUFOLEVBQVlpRCxVQUFTLEVBQXJCLEVBQXdCRyxJQUFHLElBQTNCLEVBQWdDOEIsTUFBSyxFQUFyQyxFQVpLLENBQVA7QUFhQSxFQXhHZTtBQXlHaEJFLEdBekdnQixjQXlHYnZDLElBekdhLEVBeUdSO0FBQ1AsU0FBT0EsS0FBS0ksUUFBTCxDQUFjOEIsTUFBZCxDQUFxQixVQUFDQyxLQUFELEVBQU9DLElBQVAsRUFBYztBQUN6QyxXQUFPQSxLQUFLbEMsSUFBWjtBQUNBLFNBQUssUUFBTDtBQUNDaUMsV0FBTTVCLEVBQU4sR0FBUzZCLElBQVQ7QUFDQUQsV0FBTUssUUFBTixHQUFlLENBQUMsQ0FBQ0osS0FBS2hDLFFBQUwsQ0FBY0ksSUFBZCxDQUFtQjtBQUFBLGFBQUd2QixFQUFFaUIsSUFBRixJQUFRLGFBQVg7QUFBQSxNQUFuQixDQUFqQjtBQUNEO0FBQ0E7QUFDQ2lDLFdBQU0vQixRQUFOLENBQWVrQyxJQUFmLENBQW9CRixJQUFwQjtBQU5EO0FBUUEsVUFBT0QsS0FBUDtBQUNBLEdBVk0sRUFVTCxFQUFDaEYsTUFBSyxJQUFOLEVBQVdpRCxVQUFTLEVBQXBCLEVBQXVCRyxJQUFHLElBQTFCLEVBVkssQ0FBUDtBQVdBLEVBckhlO0FBc0hoQmtDLFdBdEhnQixzQkFzSEx6QyxJQXRISyxFQXNIQTtBQUNmLFNBQU8sRUFBQzdDLE1BQUssT0FBTixFQUFjd0IsSUFBRyxJQUFqQixFQUFQO0FBQ0EsRUF4SGU7QUF5SGhCK0QsV0F6SGdCLHNCQXlITDFDLElBekhLLEVBeUhBO0FBQ2YsU0FBTyxFQUFDN0MsTUFBSyxPQUFOLEVBQWN3QixJQUFHLElBQWpCLEVBQVA7QUFDQSxFQTNIZTtBQTRIaEJnRSxNQTVIZ0IsaUJBNEhWM0MsSUE1SFUsRUE0SEw7QUFDVixTQUFPLEVBQUM3QyxNQUFLLE9BQU4sRUFBZXdCLElBQUdxQixLQUFLZCxPQUFMLENBQWEsV0FBYixDQUFsQixFQUFQO0FBQ0EsRUE5SGU7QUErSGhCMEQsWUEvSGdCLHVCQStISjVDLElBL0hJLEVBK0hDO0FBQ2hCLFNBQU8sRUFBQzdDLE1BQUssV0FBTixFQUFrQndCLElBQUdxQixLQUFLZCxPQUFMLENBQWEsaUJBQWIsQ0FBckIsRUFBcURrQixVQUFTSixLQUFLSSxRQUFMLENBQWNLLE1BQWQsQ0FBcUI7QUFBQSxXQUFHeEIsRUFBRWlCLElBQUYsSUFBUSxPQUFYO0FBQUEsSUFBckIsQ0FBOUQsRUFBUDtBQUNBLEVBakllO0FBa0loQjJDLElBbElnQixlQWtJWjdDLElBbElZLEVBa0lQO0FBQ1IsU0FBTyxFQUFDN0MsTUFBSyxPQUFOLEVBQWN3QixJQUFHcUIsS0FBS2QsT0FBTCxDQUFhLFNBQWIsQ0FBakIsRUFBeUNULFdBQVV1QixLQUFLSSxRQUFMLENBQWNJLElBQWQsQ0FBbUI7QUFBQSxXQUFHdkIsRUFBRWlCLElBQUYsSUFBUSxpQkFBWDtBQUFBLElBQW5CLEVBQWlEaEIsT0FBakQsQ0FBeUQsT0FBekQsQ0FBbkQsRUFBUDtBQUNBLEVBcEllO0FBcUloQjRELGFBcklnQiwwQkFxSUY7QUFDYixTQUFPLElBQVA7QUFDQTtBQXZJZSxDQUFqQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT1PZmZpY2VEb2N1bWVudC5pZGVudGlmeSl7XHJcblx0XHRPYmplY3QuZnJlZXplKHRoaXMuY29udGVudClcclxuXHRcdHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIsaWRlbnRpZnk9b2ZmaWNlRG9jdW1lbnQuaWRlbnRpZnkpe1xyXG5cdFx0Y29uc3QgZG9jPXt9XHJcblx0XHRjb25zdCBjcmVhdGVFbGVtZW50PWRvbUhhbmRsZXIuY3JlYXRlRWxlbWVudC5iaW5kKGRvbUhhbmRsZXIpXHJcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0aWYobW9kZWwgJiYgdHlwZW9mKG1vZGVsKT09XCJvYmplY3RcIil7XHJcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdGlmKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBtb2RlbFxyXG5cdFx0fVxyXG5cclxuXHRcdGRvYy5kb2N1bWVudD10aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsX2lkZW50aWZ5KVxyXG5cdFx0aWYodGhpcy5zdHlsZXMpXHJcblx0XHRcdGRvYy5zdHlsZXM9dGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LF9pZGVudGlmeSlcclxuXHRcdGlmKHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHRkb2MubnVtYmVyaW5nPXRoaXMucmVuZGVyTm9kZSh0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxfaWRlbnRpZnkpXHJcblx0XHRyZXR1cm4gZG9jXHJcblx0fVxyXG5cclxuXHRhZGRJbWFnZShkYXRhKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHRcdGxldCBpZD1gcklkJHtNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KC4uLnRoaXMucmVscyhcIlJlbGF0aW9uc2hpcFtUeXBlJD0naW1hZ2UnXVwiKS50b0FycmF5KCkubWFwKHQ9PntcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHQuYXR0cmlicy50YXJnZXQubWF0Y2goL1xcZCsvKVswXXx8XCIwXCIpXHJcblx0XHR9KSkrMSkrXCIuanBnXCI7XHJcblxyXG5cdFx0bGV0IHBhcnROYW1lPWAke3RoaXMuZm9sZGVyfS8ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIFR5cGU9XCIke3R5cGV9XCIgSWQ9XCIke2lkfVwiIFRhcmdldD1cIiR7cGFydE5hbWV9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblxyXG5cdFx0bGV0IGlkPWBySWQke01hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLnN1YnN0cmluZygzKSkpKSsxfWBcclxuXHJcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXHJcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgVHlwZT1cIiR7dHlwZX1cIiBJZD1cIiR7aWR9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgaWRlbnRpZnkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0Y29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdGlmKGlkZW50aXRpZXNbdGFnXSlcclxuXHRcdFx0cmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpfHx0YWdcclxuXHJcblx0XHRyZXR1cm4gdGFnXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBPZmZpY2VEb2N1bWVudFxyXG5cclxuY29uc3QgaWRlbnRpdGllcz17XHJcblx0ZG9jdW1lbnQod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJkb2N1bWVudFwiLCBjaGlsZHJlbjogd1htbC5jaGlsZHJlblswXS5jaGlsZHJlbn1cclxuXHR9LFxyXG5cdHAod1htbCxvZmZpY2VEb2N1bWVudCl7XHJcblx0XHRsZXQgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KHdYbWwpXHJcblx0XHRsZXQgdHlwZT1cInBcIlxyXG5cclxuXHRcdGxldCBpZGVudGl0eT17dHlwZSxwcjp3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpwUHJcIiksY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwidzpwUHJcIil9XHJcblxyXG5cdFx0bGV0IHBQcj0kLmZpbmQoXCJ3XFxcXDpwUHJcIilcclxuXHRcdGlmKHBQci5sZW5ndGgpe1xyXG5cdFx0XHRsZXQgc3R5bGVJZD1wUHIuZmluZChcIndcXFxcOnBTdHlsZVwiKS5hdHRyKFwidzp2YWxcIilcclxuXHJcblx0XHRcdGxldCBudW1Qcj1wUHIuZmluZChcIndcXFxcOm51bVByXCIpXHJcblx0XHRcdGlmKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCl7XHJcblx0XHRcdFx0bnVtUHI9b2ZmaWNlRG9jdW1lbnQuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXSB3XFxcXDpudW1QcmApXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKG51bVByLmxlbmd0aCl7XHJcblx0XHRcdFx0aWRlbnRpdHkudHlwZT1cImxpc3RcIlxyXG5cdFx0XHRcdGlkZW50aXR5Lm51bUlkPW51bVByLmZpbmQoXCJ3XFxcXDpudW1JZFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0XHRpZGVudGl0eS5sZXZlbD1udW1Qci5maW5kKFwid1xcXFw6aWx2bFwiKS5hdHRyKFwidzp2YWxcIilcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IG91dGxpbmVMdmw9cFByLmZpbmQoXCJ3XFxcXDpvdXRsaW5lTHZsXCIpLmF0dHIoXCJ3OnZhbFwiKVxyXG5cdFx0XHRcdGlmKCFvdXRsaW5lTHZsICYmIHN0eWxlSWQpXHJcblx0XHRcdFx0XHRvdXRsaW5lTHZsPW9mZmljZURvY3VtZW50LnN0eWxlcyhgd1xcXFw6c3R5bGVbd1xcXFw6c3R5bGVJZD1cIiR7c3R5bGVJZH1cIl0gd1xcXFw6b3V0bGluZUx2bGApLmF0dHIoXCJ3OnZhbFwiKVxyXG5cclxuXHRcdFx0XHRpZihvdXRsaW5lTHZsKXtcclxuXHRcdFx0XHRcdGlkZW50aXR5LnR5cGU9XCJoZWFkaW5nXCJcclxuXHRcdFx0XHRcdGlkZW50aXR5LmxldmVsPXBhcnNlSW50KG91dGxpbmVMdmwpKzFcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gaWRlbnRpdHlcclxuXHR9LFxyXG5cdHIod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJyXCIsIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHtuYW1lfSk9Pm5hbWU9PVwidzpyUHJcIiksIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJ3OnJQclwiKX1cclxuXHR9LFxyXG5cdGZsZENoYXIod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXVxyXG5cdH0sXHJcblx0aW5saW5lKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHR5cGU9JC5maW5kKCdhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhJykuYXR0cigndXJpJykuc3BsaXQoJy8nKS5wb3AoKVxyXG5cdFx0bGV0IHByb3BzPXt0eXBlOmBpbmxpbmUuJHt0eXBlfWAsIGNoaWxkcmVuOm51bGx9XHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIFwicGljdHVyZVwiOlxyXG5cdFx0XHRsZXQgcmlkPSQuZmluZCgnYVxcXFw6YmxpcCcpLmF0dHIoJ3I6ZW1iZWQnKVxyXG5cdFx0XHRPYmplY3QuYXNzaWduKHByb3BzLG9mZmljZURvY3VtZW50LmdldFJlbChyaWQpKVxyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHRcdHJldHVybiBwcm9wc1xyXG5cdH0sXHJcblx0c2R0KHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xyXG5cdFx0bGV0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKVxyXG5cdFx0bGV0IHByPSQuZmluZCgnPndcXFxcOnNkdFByJylcclxuXHRcdGxldCBjb250ZW50PSQuZmluZCgnPndcXFxcOnNkdENvbnRlbnQnKVxyXG5cdFx0bGV0IGNoaWxkcmVuPWNvbnRlbnQuY2hpbGRyZW4oKS50b0FycmF5KClcclxuXHJcblx0XHRsZXQgZWxCaW5kaW5nPXByLmZpbmQoJ3dcXFxcOmRhdGFCaW5kaW5nJykuZ2V0KDApXHJcblx0XHRpZihlbEJpbmRpbmcpey8vcHJvcGVydGllc1xyXG5cdFx0XHRsZXQgcGF0aD1lbEJpbmRpbmcuYXR0cmlic1sndzp4cGF0aCddLFxyXG5cdFx0XHRcdGQ9cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKSxcclxuXHRcdFx0XHRuYW1lPShkLnBvcCgpLGQucG9wKCkpO1xyXG5cdFx0XHRsZXQgdmFsdWU9Y29udGVudC50ZXh0KClcclxuXHJcblx0XHRcdHJldHVybiB7dHlwZTpcInByb3BlcnR5XCIsIG5hbWUsIHZhbHVlLCBjaGlsZHJlbn1cclxuXHRcdH1lbHNley8vY29udHJvbHNcclxuXHRcdFx0bGV0IHByQ2hpbGRyZW49cHIuZ2V0KDApLmNoaWxkcmVuXHJcblx0XHRcdGxldCBlbFR5cGU9cHJDaGlsZHJlbltwckNoaWxkcmVuLmxlbmd0aC0xXVxyXG5cdFx0XHRsZXQgbmFtZT1lbFR5cGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcclxuXHRcdFx0bGV0IHR5cGU9XCJ0ZXh0LHBpY3R1cmUsZG9jUGFydExpc3QsY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3hcIi5zcGxpdChcIixcIilcclxuXHRcdFx0XHQuZmluZChhPT5hPT1uYW1lKVxyXG5cdFx0XHRpZih0eXBlKVxyXG5cdFx0XHRcdHJldHVybiB7dHlwZTpgY29udHJvbC4ke3R5cGV9YCwgY2hpbGRyZW46bnVsbH1cclxuXHRcdFx0ZWxzZXsvL2NvbnRhaW5lclxyXG5cdFx0XHRcdGlmKGNvbnRlbnQuZmluZChcIndcXFxcOnAsd1xcXFw6dGJsLHdcXFxcOnRyLHdcXFxcOnRjXCIpLmxlbmd0aCl7XHJcblx0XHRcdFx0XHRyZXR1cm4ge3R5cGU6XCJibG9ja1wiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdHJldHVybiB7dHlwZTpcImlubGluZVwiLCBjaGlsZHJlbn1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG5cdGh5cGVybGluayh3WG1sLG9mZmljZURvY3VtZW50KXtcclxuXHRcdGxldCB1cmw9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXHJcblx0XHRyZXR1cm4ge3R5cGU6XCJoeXBlcmxpbmtcIiwgdXJsfVxyXG5cdH0sXHJcblx0dGJsKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dGJsUHJcIjpcclxuXHRcdFx0XHRzdGF0ZS5wcj1ub2RlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuXHRcdFx0XHRzdGF0ZS5jb2xzPW5vZGUuY2hpbGRyZW5cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidGJsXCIsY2hpbGRyZW46W10scHI6bnVsbCxjb2xzOltdfSlcclxuXHR9LFxyXG5cdHRyKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKChzdGF0ZSxub2RlKT0+e1xyXG5cdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0Y2FzZSBcInc6dHJQclwiOlxyXG5cdFx0XHRcdHN0YXRlLnByPW5vZGVcclxuXHRcdFx0XHRzdGF0ZS5pc0hlYWRlcj0hIW5vZGUuY2hpbGRyZW4uZmluZChhPT5hLm5hbWU9PVwidzp0YmxIZWFkZXJcIilcclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt0eXBlOlwidHJcIixjaGlsZHJlbjpbXSxwcjpudWxsfSlcclxuXHR9LFxyXG5cdHJQckRlZmF1bHQod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLGlkOlwiKnJcIn1cclxuXHR9LFxyXG5cdHBQckRlZmF1bHQod1htbCl7XHJcblx0XHRyZXR1cm4ge3R5cGU6XCJzdHlsZVwiLGlkOlwiKnBcIn1cclxuXHR9LFxyXG5cdHN0eWxlKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwic3R5bGVcIiwgaWQ6d1htbC5hdHRyaWJzWyd3OnN0eWxlSWQnXX1cclxuXHR9LFxyXG5cdGFic3RyYWN0TnVtKHdYbWwpe1xyXG5cdFx0cmV0dXJuIHt0eXBlOlwibnVtYmVyaW5nXCIsaWQ6d1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdLGNoaWxkcmVuOndYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09XCJ3Omx2bFwiKX1cclxuXHR9LFxyXG5cdG51bSh3WG1sKXtcclxuXHRcdHJldHVybiB7dHlwZTpcInN0eWxlXCIsaWQ6d1htbC5hdHRyaWJzW1widzpudW1JZFwiXSxudW1iZXJpbmc6d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJ3OmFic3RyYWN0TnVtSWRcIikuYXR0cmlic1tcInc6dmFsXCJdfVxyXG5cdH0sXHJcblx0bGF0ZW50U3R5bGVzKCl7XHJcblx0XHRyZXR1cm4gbnVsbFxyXG5cdH1cclxufVxyXG4iXX0=