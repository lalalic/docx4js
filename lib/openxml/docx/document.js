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
			var _this2 = this,
			    _arguments = arguments;

			var x = node.$,
			    parent = node.parent;

			if (parent && parent.name == 'w:sdtPr') return onToControlProperty.apply(undefined, arguments);
			var value = void 0;

			var _ret = function () {
				switch (type) {
					//section, sectPr
					case 'pgSz':
						return {
							v: { width: _this2.dxa2Px(x['w']), height: _this2.dxa2Px(x['h']) }
						};
					case 'pgMar':
						value = {};
						(0, _keys2.default)(x).forEach(function (a) {
							return value[a.split(':').pop()] = _this2.dxa2Px(x[a]);
						});
						return {
							v: value
						};
					case 'cols':
						x.num && (x.num = parseInt(x.num));
						x.space && (x.space = _this2.dxa2Px(x.space));

						if (x.col) {
							x.data = x.col.map(function (col) {
								return {
									width: _this2.dxa2Px(col.w),
									space: _this2.dxa2Px(col.space)
								};
							});
							delete x.col;
						}
						return {
							v: x
						};
					//paragraph, pPr
					case 'jc':
						return {
							v: x.val
						};
					case 'ind':
						(0, _keys2.default)(x).forEach(function (a) {
							return x[a] = _this2.dxa2Px(x[a]);
						});
						return {
							v: x
						};
					case 'spacing':
						return {
							v: _this2.toSpacing(x)
						};
					case 'pBdr':
						value = {};
						(0, _keys2.default)(x).filter(function (a) {
							return a != '$';
						}).forEach(function (a) {
							return value[a] = _this2.toBorder(x[a][0]);
						});
						return {
							v: value
						};
					//inline, rPr
					case 'rFonts':
						var ascii = x['ascii'] || _this2.officeDocument.fontTheme.get(x['asciiTheme']);
						var asia = x['eastAsia'] || _this2.officeDocument.fontTheme.get(x['eastAsiaTheme']);

						if (ascii || asia) return {
								v: { ascii: ascii, asia: asia }
							};
						break;
					case 'lang':
					case 'vertAlign':
						return {
							v: x.val
						};
					case 'sz':
						return {
							v: _this2.pt2Px(parseInt(x['val']) / 2)
						};
					case 'w':
						return {
							v: parseInt(x.val) / 100.0
						};
					case 'kern':
						return {
							v: parseInt(x.val) / 2
						};
					case 'spacing':
					case 'position':
						return {
							v: _this2.dxa2Px(x.val)
						};
					case 'i':
					case 'vanish':
					case 'u':
					case 'smallCaps':
					case 'b':
						return {
							v: _this2.asToggle(x)
						};
					case 'hightlight':
					case 'color':
						return {
							v: _this2.asColor(x.val || _this2.officeDocument.themeColor.get(x.themeColor))
						};
					case 'u':
						return {
							v: x
						};
					case 'bdx':
						return {
							v: _this2.toBorder(x)
						};
					//table
					case 'tblLook':
						return {
							v: x
						};
					case 'tblGrid':
						return {
							v: node.gridCol.map(function (a) {
								return _this2.dxa2Px(a.$.w);
							})
						};
					case 'tcBorders':
					case 'tblBorders':
						var value = {};
						(0, _keys2.default)(node).forEach(function (a) {
							value[a] = _this2.toBorder(node[a][0].$);
						});
						return {
							v: value
						};
					case 'shd':
						return {
							v: _this2.asColor(x.fill)
						};
					//drawing
					case 'extent':
						return {
							v: { width: _this2.cm2Px(x.cx), height: _this2.cm2Px(x.cy) }
						};
					default:
						return {
							v: (0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "onToProperty", _this2).apply(_this2, _arguments)
						};
				}
			}();

			if ((typeof _ret === "undefined" ? "undefined" : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
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
			border.sz && (border.sz = border.sz / 8);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsibm9kZSIsIm5hbWUiLCJwYXJlbnQiLCJ0YWciLCJzcGxpdCIsInBvcCIsImFyZ3VtZW50cyIsInN0eWxlcyIsIm9mZmljZURvY3VtZW50IiwiZGlyZWN0U3R5bGUiLCJhdHRyaWJ1dGVzIiwidHlwZSIsImdldCIsInVuZGVmaW5lZCIsImdyYXBoaWMiLCJncmFwaGljVHlwZSIsImlkIiwiZXh0ZW50Iiwic3JjIiwiQnVmZmVyIiwiZ2V0UmVsIiwidG9TdHJpbmciLCJjaGlsZHJlbiIsImNvbnRyb2wiLCJvbkNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImtleSIsIiQiLCJ4cGF0aCIsInNwbGljZSIsIngiLCJvblRvQ29udHJvbFByb3BlcnR5IiwidmFsdWUiLCJ3aWR0aCIsImR4YTJQeCIsImhlaWdodCIsImZvckVhY2giLCJhIiwibnVtIiwicGFyc2VJbnQiLCJzcGFjZSIsImNvbCIsImRhdGEiLCJtYXAiLCJ3IiwidmFsIiwidG9TcGFjaW5nIiwiZmlsdGVyIiwidG9Cb3JkZXIiLCJhc2NpaSIsImZvbnRUaGVtZSIsImFzaWEiLCJwdDJQeCIsImFzVG9nZ2xlIiwiYXNDb2xvciIsInRoZW1lQ29sb3IiLCJncmlkQ29sIiwiZmlsbCIsImNtMlB4IiwiY3giLCJjeSIsInIiLCJvIiwiYmVmb3JlQXV0b3NwYWNpbmciLCJiZWZvcmVMaW5lcyIsInRvcCIsImJlZm9yZSIsImFmdGVyQXV0b3NwYWNpbmciLCJhZnRlckxpbmVzIiwiYm90dG9tIiwiYWZ0ZXIiLCJsaW5lIiwibGluZVJ1bGUiLCJsaW5lSGVpZ2h0IiwiYm9yZGVyIiwic3oiLCJjb2xvciIsInBhcnQiLCJIZWFkZXJGb290ZXIiLCJyZWxzIiwidGFyZ2V0IiwicGFyc2UiLCJPZmZpY2VEb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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TUFBTCxDQUFhSixFQUFFeUMsSUFBZixDQUFiO0FBQ0E7QUFDRCxTQUFLLE1BQUw7QUFDQTtBQUNDVCxPQUFFVyxVQUFGLEdBQWNsQyxTQUFTc0IsRUFBRVUsSUFBWCxJQUFpQixHQUFqQixHQUFxQixHQUF0QixHQUEyQixHQUF4QztBQVBEO0FBU0FULEtBQUVVLFFBQUYsR0FBVzFDLEVBQUUwQyxRQUFiO0FBQ0EsVUFBT1YsQ0FBUDtBQUNBOzs7MkJBRVFoQyxDLEVBQUU7QUFDVixPQUFJNEMsU0FBTzVDLENBQVg7QUFDQTRDLFVBQU9DLEVBQVAsS0FBY0QsT0FBT0MsRUFBUCxHQUFVRCxPQUFPQyxFQUFQLEdBQVUsQ0FBbEM7QUFDQUQsVUFBT0UsS0FBUCxLQUFpQkYsT0FBT0UsS0FBUCxHQUFhLEtBQUt0QixPQUFMLENBQWFvQixPQUFPRSxLQUFwQixDQUE5QjtBQUNBLFVBQU9GLE1BQVA7QUFDQTs7O2lDQUVjMUUsSSxFQUFLRyxHLEVBQUk7QUFBQSxpQkFDRkgsSUFERSxDQUNoQjJCLENBRGdCO0FBQUEsT0FDYlgsRUFEYSxXQUNiQSxFQURhO0FBQUEsT0FDVEwsSUFEUyxXQUNUQSxJQURTOztBQUV2QixPQUFJa0UsT0FBSyxJQUFJQyxZQUFKLENBQWlCLEtBQUt0RSxjQUFMLENBQW9CdUUsSUFBcEIsQ0FBeUIvRCxFQUF6QixFQUE2QmdFLE1BQTlDLEVBQXNELElBQXRELEVBQTREckUsSUFBNUQsQ0FBVDtBQUNBLFVBQU9rRSxLQUFLSSxLQUFMLEVBQVA7QUFDQTs7O3NCQXRQZTtBQUFDLFVBQU8sTUFBUDtBQUFjOzs7OztPQUV4QkMsYyIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXHJcbmltcG9ydCBPZmZpY2VEb2N1bWVudCBmcm9tIFwiLi9vZmZpY2VEb2N1bWVudFwiXHJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcclxuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XHJcblxyXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1PZmZpY2VEb2N1bWVudFxyXG5cclxuXHRpc1Byb3BlcnR5KG5vZGUpe1xyXG5cdFx0bGV0IHtuYW1lLHBhcmVudH09bm9kZVxyXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcclxuXHRcdGlmKHN1cGVyLmlzUHJvcGVydHkoLi4uYXJndW1lbnRzKSB8fCB0YWc9PSd0YmxHcmlkJylcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFxyXG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxyXG5cdFx0XHRyZXR1cm4gdHJ1ZVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHR9XHJcblx0XHJcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcclxuXHRcdGNvbnN0IHtzdHlsZXN9PXRoaXMub2ZmaWNlRG9jdW1lbnRcclxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9fT1ub2RlXHJcblx0XHRsZXQgdHlwZT1uYW1lLnNwbGl0KCc6JykucG9wKClcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgXCJwXCI6XHJcblx0XHRcdHR5cGU9XCJwYXJhZ3JhcGhcIlxyXG5cdFx0XHRpZihkaXJlY3RTdHlsZSAmJiBkaXJlY3RTdHlsZS5nZXQoJ3BQci5udW1QcicpIT11bmRlZmluZWQpXHJcblx0XHRcdFx0dHlwZT1cImxpc3RcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJyXCI6XHJcblx0XHRcdHR5cGU9XCJpbmxpbmVcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJ0XCI6XHJcblx0XHRcdHR5cGU9XCJ0ZXh0XCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwidGJsXCI6XHJcblx0XHRcdHR5cGU9XCJ0YWJsZVwiXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcInRyXCI6XHJcblx0XHRcdHR5cGU9XCJyb3dcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJ0Y1wiOlxyXG5cdFx0XHR0eXBlPVwiY2VsbFwiXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcImhkclwiOlxyXG5cdFx0XHR0eXBlPVwiaGVhZGVyXCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiZnRyXCI6XHJcblx0XHRcdHR5cGU9XCJmb290ZXJcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJpbmxpbmVcIjpcclxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcclxuXHRcdFx0bGV0IGdyYXBoaWNUeXBlPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEuJC51cmlcIikuc3BsaXQoJy8nKS5wb3AoKVxyXG5cdFx0XHRzd2l0Y2goZ3JhcGhpY1R5cGUpe1xyXG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcclxuXHRcdFx0XHR0eXBlPVwiaW1hZ2VcIlxyXG5cdFx0XHRcdGxldCBpZD1ncmFwaGljLmdldChcImdyYXBoaWNEYXRhLnBpYy5ibGlwRmlsbC5ibGlwLiQuZW1iZWRcIilcclxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xyXG5cdFx0XHRcdFx0ZXh0ZW50Om5vZGUuYXR0cmlidXRlcy5leHRlbnQsXHJcblx0XHRcdFx0XHRzcmM6YGRhdGE6aW1hZ2UvanBnO2Jhc2U2NCwke25ldyBCdWZmZXIodGhpcy5vZmZpY2VEb2N1bWVudC5nZXRSZWwoaWQpKS50b1N0cmluZygnYmFzZTY0Jyl9YFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0YnJlYWtcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHR0eXBlPWdyYXBoaWNUeXBlXHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdH1cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxyXG5cdFx0XHRyZXR1cm4gbm9kZS5jaGlsZHJlblswXVxyXG5cdFx0Y2FzZSBcInNkdFwiOlxyXG5cdFx0XHRsZXQgY29udHJvbD1kaXJlY3RTdHlsZS5nZXQoXCJjb250cm9sXCIpXHJcblx0XHRcdGlmKGNvbnRyb2w9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRjb250cm9sPWRpcmVjdFN0eWxlLmNvbnRyb2w9e3R5cGU6XCJjb250cm9sLnJpY2h0ZXh0XCJ9XHJcblx0XHRcdHR5cGU9Y29udHJvbC50eXBlXHJcblx0XHRicmVha1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0eXBlKVxyXG5cdH1cclxuXHJcblx0dG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShzdXBlci50b1Byb3BlcnR5KG5vZGUsdHlwZSksdHlwZSlcclxuXHR9XHJcblx0XHJcblx0b25Ub0NvbnRyb2xQcm9wZXJ0eShub2RlLHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnZGF0YUJpbmRpbmcnOlxyXG5cdFx0XHRsZXQga2V5PW5vZGUuJC54cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKS5zcGxpY2UoLTIsMSlcclxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOidkb2N1bWVudFByb3BlcnR5Jywga2V5fVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3RleHQnOlxyXG5cdFx0XHRpZighbm9kZS5wYXJlbnQuJC5jb250cm9sKVxyXG5cdFx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpgY29udHJvbC4ke3R5cGV9YH1cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdwaWN0dXJlJzpcclxuXHRcdGNhc2UgJ2RvY1BhcnRMaXN0JzogXHJcblx0XHRjYXNlICdjb21ib0JveCc6IFxyXG5cdFx0Y2FzZSAnZHJvcERvd25MaXN0JzogXHJcblx0XHRjYXNlICdkYXRlJzpcclxuXHRcdGNhc2UgJ2NoZWNrYm94JzpcclxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOmBjb250cm9sLiR7dHlwZX1gfVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3JpY2h0ZXh0JzpcclxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOlwiY29udHJvbC5yaWNodGV4dFwifVxyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xyXG5cdFx0Y29uc3QgeyQ6eCwgcGFyZW50fT1ub2RlXHJcblx0XHRpZihwYXJlbnQgJiYgcGFyZW50Lm5hbWU9PSd3OnNkdFByJylcclxuXHRcdFx0cmV0dXJuIG9uVG9Db250cm9sUHJvcGVydHkoLi4uYXJndW1lbnRzKVxyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRcdC8vc2VjdGlvbiwgc2VjdFByXHJcblx0XHRjYXNlICdwZ1N6JzpcclxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cclxuXHRcdGNhc2UgJ3BnTWFyJzpcclxuXHRcdFx0dmFsdWU9e31cclxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT52YWx1ZVthLnNwbGl0KCc6JykucG9wKCldPXRoaXMuZHhhMlB4KHhbYV0pKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdGNhc2UgJ2NvbHMnOlxyXG5cdFx0XHR4Lm51bSAmJiAoeC5udW09cGFyc2VJbnQoeC5udW0pKTtcclxuXHRcdFx0eC5zcGFjZSAmJiAoeC5zcGFjZT10aGlzLmR4YTJQeCh4LnNwYWNlKSk7XHJcblxyXG5cdFx0XHRpZih4LmNvbCl7XHJcblx0XHRcdFx0eC5kYXRhPXguY29sLm1hcChjb2w9Pih7XHJcblx0XHRcdFx0XHR3aWR0aDp0aGlzLmR4YTJQeChjb2wudyksXHJcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2wuc3BhY2UpXHJcblx0XHRcdFx0fSkpXHJcblx0XHRcdFx0ZGVsZXRlIHguY29sXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHhcclxuXHRcdC8vcGFyYWdyYXBoLCBwUHJcclxuXHRcdGNhc2UgJ2pjJzpcclxuXHRcdFx0cmV0dXJuIHgudmFsXHJcblx0XHRjYXNlICdpbmQnOlxyXG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnhbYV09dGhpcy5keGEyUHgoeFthXSkpXHJcblx0XHRcdHJldHVybiB4XHJcblx0XHRjYXNlICdzcGFjaW5nJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMudG9TcGFjaW5nKHgpXHJcblx0XHRjYXNlICdwQmRyJzpcclxuXHRcdFx0dmFsdWU9e31cclxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZmlsdGVyKGE9PmEhPSckJykuZm9yRWFjaChhPT52YWx1ZVthXT10aGlzLnRvQm9yZGVyKHhbYV1bMF0pKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdC8vaW5saW5lLCByUHJcclxuXHRcdGNhc2UgJ3JGb250cyc6XHJcblx0XHRcdGxldCBhc2NpaT14Wydhc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnYXNjaWlUaGVtZSddKVxyXG5cdFx0XHRsZXQgYXNpYT14WydlYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnZWFzdEFzaWFUaGVtZSddKVxyXG5cclxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcclxuXHRcdFx0XHRyZXR1cm4ge2FzY2lpLCBhc2lhfVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2xhbmcnOlxyXG5cdFx0Y2FzZSAndmVydEFsaWduJzpcclxuXHRcdFx0cmV0dXJuIHgudmFsXHJcblx0XHRjYXNlICdzeic6XHJcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KHhbJ3ZhbCddKS8yKVxyXG5cdFx0Y2FzZSAndyc6XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMTAwLjBcclxuXHRcdGNhc2UgJ2tlcm4nOlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzJcclxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxyXG5cdFx0Y2FzZSAncG9zaXRpb24nOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC52YWwpXHJcblx0XHRjYXNlICdpJzpcclxuXHRcdGNhc2UgJ3ZhbmlzaCc6XHJcblx0XHRjYXNlICd1JzpcclxuXHRcdGNhc2UgJ3NtYWxsQ2Fwcyc6XHJcblx0XHRjYXNlICdiJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuYXNUb2dnbGUoeClcclxuXHRcdGNhc2UgJ2hpZ2h0bGlnaHQnOlxyXG5cdFx0Y2FzZSAnY29sb3InOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHgudmFsIHx8IHRoaXMub2ZmaWNlRG9jdW1lbnQudGhlbWVDb2xvci5nZXQoeC50aGVtZUNvbG9yKSlcclxuXHRcdGNhc2UgJ3UnOlxyXG5cdFx0XHRyZXR1cm4geFxyXG5cdFx0Y2FzZSAnYmR4JzpcclxuXHRcdFx0cmV0dXJuIHRoaXMudG9Cb3JkZXIoeClcclxuXHRcdC8vdGFibGVcclxuXHRcdGNhc2UgJ3RibExvb2snOlxyXG5cdFx0XHRyZXR1cm4geFxyXG5cdFx0Y2FzZSAndGJsR3JpZCc6XHJcblx0XHRcdHJldHVybiBub2RlLmdyaWRDb2wubWFwKGE9PnRoaXMuZHhhMlB4KGEuJC53KSlcclxuXHRcdGNhc2UgJ3RjQm9yZGVycyc6XHJcblx0XHRjYXNlICd0YmxCb3JkZXJzJzpcclxuXHRcdFx0bGV0IHZhbHVlPXt9XHJcblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xyXG5cdFx0XHRcdHZhbHVlW2FdPXRoaXMudG9Cb3JkZXIobm9kZVthXVswXS4kKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRyZXR1cm4gdmFsdWU7XHJcblx0XHRjYXNlICdzaGQnOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguZmlsbClcclxuXHRcdC8vZHJhd2luZ1xyXG5cdFx0Y2FzZSAnZXh0ZW50JzpcclxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmNtMlB4KHguY3gpLGhlaWdodDp0aGlzLmNtMlB4KHguY3kpfVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eSguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRhc1RvZ2dsZSh4KXtcclxuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIC0xXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0dG9TcGFjaW5nKHgpe1xyXG5cdFx0dmFyIHI9eCwgbz17fVxyXG5cclxuXHRcdGlmKCFyLmJlZm9yZUF1dG9zcGFjaW5nICYmIHIuYmVmb3JlTGluZXMpXHJcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZUxpbmVzKSlcclxuXHRcdGVsc2UgaWYoci5iZWZvcmUpXHJcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZSkpXHJcblxyXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXHJcblx0XHRcdG8uYm90dG9tPXRoaXMuZHhhMlB4KChyLmFmdGVyTGluZXMpKVxyXG5cdFx0ZWxzZSBpZihyLmFmdGVyKVxyXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlcikpXHJcblxyXG5cdFx0aWYoIXIubGluZSlcclxuXHRcdFx0cmV0dXJuIG9cclxuXHJcblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XHJcblx0XHRjYXNlICdhdExlYXN0JzpcclxuXHRcdGNhc2UgJ2V4YWN0JzpcclxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMuZHhhMlB4KCh4LmxpbmUpKVxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnYXV0byc6XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXHJcblx0XHR9XHJcblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcclxuXHRcdHJldHVybiBvXHJcblx0fVxyXG5cclxuXHR0b0JvcmRlcih4KXtcclxuXHRcdHZhciBib3JkZXI9eFxyXG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xyXG5cdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXHJcblx0XHRyZXR1cm4gYm9yZGVyXHJcblx0fVxyXG5cdFxyXG5cdHRvSGVhZGVyRm9vdGVyKG5vZGUsdGFnKXtcclxuXHRcdGNvbnN0IHskOntpZCwgdHlwZX19PW5vZGVcclxuXHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5vZmZpY2VEb2N1bWVudC5yZWxzW2lkXS50YXJnZXQsIHRoaXMsIHR5cGUpXHJcblx0XHRyZXR1cm4gcGFydC5wYXJzZSgpXHJcblx0fVxyXG59XHJcbiJdfQ==