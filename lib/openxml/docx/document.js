"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _officeDocument = require("./officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "isProperty",
		value: function isProperty(node) {
			var name = node.name,
			    parent = node.parent;

			var tag = name.split(':').pop();
			if ((0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "isProperty", this).apply(this, arguments) || tag == 'tblGrid') return true;

			if (parent && parent.name && parent.name.split(':').pop() == 'inline') return true;

			return false;
		}
	}, {
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name,
			    directStyle = node.attributes.directStyle;

			var type = name.split(':').pop();
			switch (type) {
				case "p":
					type = "paragraph";
					if (directStyle && directStyle.get('pPr.numPr') != undefined) type = "list";
					break;
				case "r":
					type = "inline";
					break;
				case "t":
					type = "text";
					break;
				case "tbl":
					type = "table";
					break;
				case "tr":
					type = "row";
					break;
				case "tc":
					type = "cell";
					break;
				case "hdr":
					type = "header";
					break;
				case "ftr":
					type = "footer";
					break;
				case "inline":
					var graphic = node.attributes.graphic;
					var graphicType = graphic.get("graphicData.$.uri").split('/').pop();
					switch (graphicType) {
						case 'picture':
							type = "image";
							var id = graphic.get("graphicData.pic.blipFill.blip.$.embed");
							node.attributes = {
								extent: node.attributes.extent,
								src: "data:image/jpg;base64," + new Buffer(this.officeDocument.getRel(id)).toString('base64')
							};
							break;
						default:
							type = graphicType;
							break;
					}
					break;
				case "drawing":
					return node.children[0];
				case "sdt":
					var control = directStyle.get("control");
					if (control == undefined) control = directStyle.control = { type: "control.richtext" };
					type = control.type;
					break;
			}

			return this.onCreateElement(node, type);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return this.officeDocument.styles.createDirectStyle((0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "toProperty", this).call(this, node, type), type);
		}
	}, {
		key: "onToControlProperty",
		value: function onToControlProperty(node, type) {
			switch (type) {
				case 'dataBinding':
					var key = node.$.xpath.split(/[\/\:\[]/).splice(-2, 1);
					node.parent.$.control = { type: 'documentProperty', key: key };
					break;
				case 'text':
					if (!node.parent.$.control) node.parent.$.control = { type: "control." + type };
					break;
				case 'picture':
				case 'docPartList':
				case 'comboBox':
				case 'dropDownList':
				case 'date':
				case 'checkbox':
					node.parent.$.control = { type: "control." + type };
					break;
				case 'richtext':
					node.parent.$.control = { type: "control.richtext" };
					break;
			}
			return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onToProperty", this).apply(this, arguments);
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			var _this2 = this;

			var x = node.$,
			    parent = node.parent;

			if (parent && parent.name == 'w:sdtPr') return onToControlProperty.apply(undefined, arguments);
			var value = void 0;
			switch (type) {
				//section, sectPr
				case 'pgSz':
					return { width: this.dxa2Px(x['w']), height: this.dxa2Px(x['h']) };
				case 'pgMar':
					value = {};
					(0, _keys2.default)(x).forEach(function (a) {
						return value[a.split(':').pop()] = _this2.dxa2Px(x[a]);
					});
					return value;
				case 'cols':
					x.num && (x.num = parseInt(x.num));
					x.space && (x.space = this.dxa2Px(x.space));

					if (x.col) {
						x.data = x.col.map(function (col) {
							return {
								width: _this2.dxa2Px(col.w),
								space: _this2.dxa2Px(col.space)
							};
						});
						delete x.col;
					}
					return x;
				//paragraph, pPr
				case 'jc':
					return x.val;
				case 'ind':
					(0, _keys2.default)(x).forEach(function (a) {
						return x[a] = _this2.dxa2Px(x[a]);
					});
					return x;
				case 'spacing':
					return this.toSpacing(x);
				case 'pBdr':
					value = {};
					(0, _keys2.default)(x).filter(function (a) {
						return a != '$';
					}).forEach(function (a) {
						return value[a] = _this2.toBorder(x[a][0]);
					});
					return value;
				//inline, rPr
				case 'rFonts':
					var ascii = x['ascii'] || this.officeDocument.fontTheme.get(x['asciiTheme']);
					var asia = x['eastAsia'] || this.officeDocument.fontTheme.get(x['eastAsiaTheme']);

					if (ascii || asia) return { ascii: ascii, asia: asia };
					break;
				case 'lang':
				case 'vertAlign':
					return x.val;
				case 'sz':
					return parseInt(x['val']) / 2;
				case 'w':
					return parseInt(x.val) / 100.0;
				case 'kern':
					return parseInt(x.val) / 2;
				case 'spacing':
				case 'position':
					return this.dxa2Px(x.val);
				case 'i':
				case 'vanish':
				case 'u':
				case 'smallCaps':
				case 'b':
					return this.asToggle(x);
				case 'hightlight':
				case 'color':
					return this.asColor(x.val || this.officeDocument.themeColor.get(x.themeColor));
				case 'u':
					return x;
				case 'bdx':
					return this.toBorder(x);
				//table
				case 'tblLook':
					return x;
				case 'tblGrid':
					return node.gridCol.map(function (a) {
						return _this2.dxa2Px(a.$.w);
					});
				case 'tcBorders':
				case 'tblBorders':
					{
						var _ret = function () {
							var value = {};
							(0, _keys2.default)(node).forEach(function (a) {
								value[a] = _this2.toBorder(node[a][0].$);
							});
							return {
								v: value
							};
						}();

						if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
					}
				case 'tblCellMar':
					{
						var _ret2 = function () {
							var value = {};
							(0, _keys2.default)(node).forEach(function (a) {
								value[a] = _this2.dxa2Px(node[a][0].$.w);
							});
							return {
								v: value
							};
						}();

						if ((typeof _ret2 === "undefined" ? "undefined" : (0, _typeof3.default)(_ret2)) === "object") return _ret2.v;
					}
				case 'shd':
					return this.asColor(x.fill);
				case 'tcW':
					return this.dxa2Px(x.w);
				//drawing
				case 'extent':
					return { width: this.cm2Px(x.cx), height: this.cm2Px(x.cy) };
				default:
					return (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onToProperty", this).apply(this, arguments);
			}
		}
	}, {
		key: "asToggle",
		value: function asToggle(x) {
			if (x == undefined || x.val == undefined) {
				return -1;
			} else {
				return parseInt(x.val);
			}
		}
	}, {
		key: "toSpacing",
		value: function toSpacing(x) {
			var r = x,
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.dxa2Px(r.beforeLines);else if (r.before) o.top = this.dxa2Px(r.before);

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.dxa2Px(r.afterLines);else if (r.after) o.bottom = this.dxa2Px(r.after);

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.dxa2Px(x.line);
					break;
				case 'auto':
				default:
					o.lineHeight = parseInt(r.line) * 100 / 240 + '%';
			}
			o.lineRule = x.lineRule;
			return o;
		}
	}, {
		key: "toBorder",
		value: function toBorder(x) {
			var border = x;
			border.sz && (border.sz = this.pt2Px(border.sz / 8));
			border.color && (border.color = this.asColor(border.color));
			return border;
		}
	}, {
		key: "toHeaderFooter",
		value: function toHeaderFooter(node, tag) {
			var _node$$ = node.$,
			    id = _node$$.id,
			    type = _node$$.type;

			var part = new HeaderFooter(this.officeDocument.rels[id].target, this, type);
			return part.parse();
		}
	}], [{
		key: "ext",
		get: function get() {
			return 'docx';
		}
	}]);
	return _class;
}(_document2.default);

_class.OfficeDocument = _officeDocument2.default;
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsibm9kZSIsIm5hbWUiLCJwYXJlbnQiLCJ0YWciLCJzcGxpdCIsInBvcCIsImFyZ3VtZW50cyIsInN0eWxlcyIsIm9mZmljZURvY3VtZW50IiwiZGlyZWN0U3R5bGUiLCJhdHRyaWJ1dGVzIiwidHlwZSIsImdldCIsInVuZGVmaW5lZCIsImdyYXBoaWMiLCJncmFwaGljVHlwZSIsImlkIiwiZXh0ZW50Iiwic3JjIiwiQnVmZmVyIiwiZ2V0UmVsIiwidG9TdHJpbmciLCJjaGlsZHJlbiIsImNvbnRyb2wiLCJvbkNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImtleSIsIiQiLCJ4cGF0aCIsInNwbGljZSIsIngiLCJvblRvQ29udHJvbFByb3BlcnR5IiwidmFsdWUiLCJ3aWR0aCIsImR4YTJQeCIsImhlaWdodCIsImZvckVhY2giLCJhIiwibnVtIiwicGFyc2VJbnQiLCJzcGFjZSIsImNvbCIsImRhdGEiLCJtYXAiLCJ3IiwidmFsIiwidG9TcGFjaW5nIiwiZmlsdGVyIiwidG9Cb3JkZXIiLCJhc2NpaSIsImZvbnRUaGVtZSIsImFzaWEiLCJhc1RvZ2dsZSIsImFzQ29sb3IiLCJ0aGVtZUNvbG9yIiwiZ3JpZENvbCIsImZpbGwiLCJjbTJQeCIsImN4IiwiY3kiLCJyIiwibyIsImJlZm9yZUF1dG9zcGFjaW5nIiwiYmVmb3JlTGluZXMiLCJ0b3AiLCJiZWZvcmUiLCJhZnRlckF1dG9zcGFjaW5nIiwiYWZ0ZXJMaW5lcyIsImJvdHRvbSIsImFmdGVyIiwibGluZSIsImxpbmVSdWxlIiwibGluZUhlaWdodCIsImJvcmRlciIsInN6IiwicHQyUHgiLCJjb2xvciIsInBhcnQiLCJIZWFkZXJGb290ZXIiLCJyZWxzIiwidGFyZ2V0IiwicGFyc2UiLCJPZmZpY2VEb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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IjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29mZmljZURvY3VtZW50XCJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PU9mZmljZURvY3VtZW50XG5cblx0aXNQcm9wZXJ0eShub2RlKXtcblx0XHRsZXQge25hbWUscGFyZW50fT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRpZihzdXBlci5pc1Byb3BlcnR5KC4uLmFyZ3VtZW50cykgfHwgdGFnPT0ndGJsR3JpZCcpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxuXHRcdFx0cmV0dXJuIHRydWVcblxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX19PW5vZGVcblx0XHRsZXQgdHlwZT1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdHR5cGU9XCJwYXJhZ3JhcGhcIlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGUuZ2V0KCdwUHIubnVtUHInKSE9dW5kZWZpbmVkKVxuXHRcdFx0XHR0eXBlPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiclwiOlxuXHRcdFx0dHlwZT1cImlubGluZVwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidFwiOlxuXHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInRibFwiOlxuXHRcdFx0dHlwZT1cInRhYmxlXCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJ0clwiOlxuXHRcdFx0dHlwZT1cInJvd1wiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidGNcIjpcblx0XHRcdHR5cGU9XCJjZWxsXCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJoZHJcIjpcblx0XHRcdHR5cGU9XCJoZWFkZXJcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImZ0clwiOlxuXHRcdFx0dHlwZT1cImZvb3RlclwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiaW5saW5lXCI6XG5cdFx0XHRsZXQgZ3JhcGhpYz1ub2RlLmF0dHJpYnV0ZXMuZ3JhcGhpY1xuXHRcdFx0bGV0IGdyYXBoaWNUeXBlPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEuJC51cmlcIikuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdFx0c3dpdGNoKGdyYXBoaWNUeXBlKXtcblx0XHRcdGNhc2UgJ3BpY3R1cmUnOlxuXHRcdFx0XHR0eXBlPVwiaW1hZ2VcIlxuXHRcdFx0XHRsZXQgaWQ9Z3JhcGhpYy5nZXQoXCJncmFwaGljRGF0YS5waWMuYmxpcEZpbGwuYmxpcC4kLmVtYmVkXCIpXG5cdFx0XHRcdG5vZGUuYXR0cmlidXRlcz17XG5cdFx0XHRcdFx0ZXh0ZW50Om5vZGUuYXR0cmlidXRlcy5leHRlbnQsXG5cdFx0XHRcdFx0c3JjOmBkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtuZXcgQnVmZmVyKHRoaXMub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGlkKSkudG9TdHJpbmcoJ2Jhc2U2NCcpfWBcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHR5cGU9Z3JhcGhpY1R5cGVcblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cblx0XHRjYXNlIFwic2R0XCI6XG5cdFx0XHRsZXQgY29udHJvbD1kaXJlY3RTdHlsZS5nZXQoXCJjb250cm9sXCIpXG5cdFx0XHRpZihjb250cm9sPT11bmRlZmluZWQpXG5cdFx0XHRcdGNvbnRyb2w9ZGlyZWN0U3R5bGUuY29udHJvbD17dHlwZTpcImNvbnRyb2wucmljaHRleHRcIn1cblx0XHRcdHR5cGU9Y29udHJvbC50eXBlXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSlcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKHN1cGVyLnRvUHJvcGVydHkobm9kZSx0eXBlKSx0eXBlKVxuXHR9XG5cblx0b25Ub0NvbnRyb2xQcm9wZXJ0eShub2RlLHR5cGUpe1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdkYXRhQmluZGluZyc6XG5cdFx0XHRsZXQga2V5PW5vZGUuJC54cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKS5zcGxpY2UoLTIsMSlcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTonZG9jdW1lbnRQcm9wZXJ0eScsIGtleX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3RleHQnOlxuXHRcdFx0aWYoIW5vZGUucGFyZW50LiQuY29udHJvbClcblx0XHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOmBjb250cm9sLiR7dHlwZX1gfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0Y2FzZSAnZG9jUGFydExpc3QnOlxuXHRcdGNhc2UgJ2NvbWJvQm94Jzpcblx0XHRjYXNlICdkcm9wRG93bkxpc3QnOlxuXHRcdGNhc2UgJ2RhdGUnOlxuXHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpgY29udHJvbC4ke3R5cGV9YH1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3JpY2h0ZXh0Jzpcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpcImNvbnRyb2wucmljaHRleHRcIn1cblx0XHRicmVha1xuXHRcdH1cblx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRjb25zdCB7JDp4LCBwYXJlbnR9PW5vZGVcblx0XHRpZihwYXJlbnQgJiYgcGFyZW50Lm5hbWU9PSd3OnNkdFByJylcblx0XHRcdHJldHVybiBvblRvQ29udHJvbFByb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHRsZXQgdmFsdWVcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHQvL3NlY3Rpb24sIHNlY3RQclxuXHRcdGNhc2UgJ3BnU3onOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cblx0XHRjYXNlICdwZ01hcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT52YWx1ZVthLnNwbGl0KCc6JykucG9wKCldPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0Y2FzZSAnY29scyc6XG5cdFx0XHR4Lm51bSAmJiAoeC5udW09cGFyc2VJbnQoeC5udW0pKTtcblx0XHRcdHguc3BhY2UgJiYgKHguc3BhY2U9dGhpcy5keGEyUHgoeC5zcGFjZSkpO1xuXG5cdFx0XHRpZih4LmNvbCl7XG5cdFx0XHRcdHguZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbC53KSxcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2wuc3BhY2UpXG5cdFx0XHRcdH0pKVxuXHRcdFx0XHRkZWxldGUgeC5jb2xcblx0XHRcdH1cblx0XHRcdHJldHVybiB4XG5cdFx0Ly9wYXJhZ3JhcGgsIHBQclxuXHRcdGNhc2UgJ2pjJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ2luZCc6XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnhbYV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9TcGFjaW5nKHgpXG5cdFx0Y2FzZSAncEJkcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZmlsdGVyKGE9PmEhPSckJykuZm9yRWFjaChhPT52YWx1ZVthXT10aGlzLnRvQm9yZGVyKHhbYV1bMF0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0Ly9pbmxpbmUsIHJQclxuXHRcdGNhc2UgJ3JGb250cyc6XG5cdFx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcblx0XHRcdGxldCBhc2lhPXhbJ2Vhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4WydlYXN0QXNpYVRoZW1lJ10pXG5cblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdsYW5nJzpcblx0XHRjYXNlICd2ZXJ0QWxpZ24nOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnc3onOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHhbJ3ZhbCddKS8yXG5cdFx0Y2FzZSAndyc6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzEwMC4wXG5cdFx0Y2FzZSAna2Vybic6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzJcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRjYXNlICdwb3NpdGlvbic6XG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC52YWwpXG5cdFx0Y2FzZSAnaSc6XG5cdFx0Y2FzZSAndmFuaXNoJzpcblx0XHRjYXNlICd1Jzpcblx0XHRjYXNlICdzbWFsbENhcHMnOlxuXHRcdGNhc2UgJ2InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNUb2dnbGUoeClcblx0XHRjYXNlICdoaWdodGxpZ2h0Jzpcblx0XHRjYXNlICdjb2xvcic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHgudmFsIHx8IHRoaXMub2ZmaWNlRG9jdW1lbnQudGhlbWVDb2xvci5nZXQoeC50aGVtZUNvbG9yKSlcblx0XHRjYXNlICd1Jzpcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnYmR4Jzpcblx0XHRcdHJldHVybiB0aGlzLnRvQm9yZGVyKHgpXG5cdFx0Ly90YWJsZVxuXHRcdGNhc2UgJ3RibExvb2snOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICd0YmxHcmlkJzpcblx0XHRcdHJldHVybiBub2RlLmdyaWRDb2wubWFwKGE9PnRoaXMuZHhhMlB4KGEuJC53KSlcblx0XHRjYXNlICd0Y0JvcmRlcnMnOlxuXHRcdGNhc2UgJ3RibEJvcmRlcnMnOntcblx0XHRcdGxldCB2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMobm9kZSkuZm9yRWFjaChhPT57XG5cdFx0XHRcdHZhbHVlW2FdPXRoaXMudG9Cb3JkZXIobm9kZVthXVswXS4kKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdH1cblx0XHRjYXNlICd0YmxDZWxsTWFyJzp7XG5cdFx0XHRsZXQgdmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xuXHRcdFx0XHR2YWx1ZVthXT10aGlzLmR4YTJQeChub2RlW2FdWzBdLiQudylcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHR9XG5cdFx0Y2FzZSAnc2hkJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5maWxsKVxuXHRcdGNhc2UgJ3RjVyc6XG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC53KVxuXHRcdC8vZHJhd2luZ1xuXHRcdGNhc2UgJ2V4dGVudCc6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuY20yUHgoeC5jeCksaGVpZ2h0OnRoaXMuY20yUHgoeC5jeSl9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXG5cdGFzVG9nZ2xlKHgpe1xuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAtMVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKVxuXHRcdH1cblx0fVxuXG5cdHRvU3BhY2luZyh4KXtcblx0XHR2YXIgcj14LCBvPXt9XG5cblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlTGluZXMpKVxuXHRcdGVsc2UgaWYoci5iZWZvcmUpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlcikpXG5cblx0XHRpZighci5saW5lKVxuXHRcdFx0cmV0dXJuIG9cblxuXHRcdHN3aXRjaCh4LmxpbmVSdWxlKXtcblx0XHRjYXNlICdhdExlYXN0Jzpcblx0XHRjYXNlICdleGFjdCc6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9dGhpcy5keGEyUHgoKHgubGluZSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXG5cdFx0fVxuXHRcdG8ubGluZVJ1bGU9eC5saW5lUnVsZVxuXHRcdHJldHVybiBvXG5cdH1cblxuXHR0b0JvcmRlcih4KXtcblx0XHR2YXIgYm9yZGVyPXhcblx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej10aGlzLnB0MlB4KGJvcmRlci5zei84KSk7XG5cdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0cmV0dXJuIGJvcmRlclxuXHR9XG5cblx0dG9IZWFkZXJGb290ZXIobm9kZSx0YWcpe1xuXHRcdGNvbnN0IHskOntpZCwgdHlwZX19PW5vZGVcblx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMub2ZmaWNlRG9jdW1lbnQucmVsc1tpZF0udGFyZ2V0LCB0aGlzLCB0eXBlKVxuXHRcdHJldHVybiBwYXJ0LnBhcnNlKClcblx0fVxufVxuIl19