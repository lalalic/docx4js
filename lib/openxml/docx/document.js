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
			var name = node.name;
			var parent = node.parent;

			var tag = name.split(':').pop();
			if ((0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "isProperty", this).apply(this, arguments) || tag == 'tblGrid') return true;

			if (parent && parent.name && parent.name.split(':').pop() == 'inline') return true;

			return false;
		}
	}, {
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name;
			var directStyle = node.attributes.directStyle;

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

			var x = node.$;
			var parent = node.parent;

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
			var _node$$ = node.$;
			var id = _node$$.id;
			var type = _node$$.type;

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsibm9kZSIsIm5hbWUiLCJwYXJlbnQiLCJ0YWciLCJzcGxpdCIsInBvcCIsImFyZ3VtZW50cyIsInN0eWxlcyIsIm9mZmljZURvY3VtZW50IiwiZGlyZWN0U3R5bGUiLCJhdHRyaWJ1dGVzIiwidHlwZSIsImdldCIsInVuZGVmaW5lZCIsImdyYXBoaWMiLCJncmFwaGljVHlwZSIsImlkIiwiZXh0ZW50Iiwic3JjIiwiQnVmZmVyIiwiZ2V0UmVsIiwidG9TdHJpbmciLCJjaGlsZHJlbiIsImNvbnRyb2wiLCJvbkNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImtleSIsIiQiLCJ4cGF0aCIsInNwbGljZSIsIngiLCJvblRvQ29udHJvbFByb3BlcnR5IiwidmFsdWUiLCJ3aWR0aCIsImR4YTJQeCIsImhlaWdodCIsImZvckVhY2giLCJhIiwibnVtIiwicGFyc2VJbnQiLCJzcGFjZSIsImNvbCIsImRhdGEiLCJtYXAiLCJ3IiwidmFsIiwidG9TcGFjaW5nIiwiZmlsdGVyIiwidG9Cb3JkZXIiLCJhc2NpaSIsImZvbnRUaGVtZSIsImFzaWEiLCJwdDJQeCIsImFzVG9nZ2xlIiwiYXNDb2xvciIsInRoZW1lQ29sb3IiLCJncmlkQ29sIiwiZmlsbCIsImNtMlB4IiwiY3giLCJjeSIsInIiLCJvIiwiYmVmb3JlQXV0b3NwYWNpbmciLCJiZWZvcmVMaW5lcyIsInRvcCIsImJlZm9yZSIsImFmdGVyQXV0b3NwYWNpbmciLCJhZnRlckxpbmVzIiwiYm90dG9tIiwiYWZ0ZXIiLCJsaW5lIiwibGluZVJ1bGUiLCJsaW5lSGVpZ2h0IiwiYm9yZGVyIiwic3oiLCJjb2xvciIsInBhcnQiLCJIZWFkZXJGb290ZXIiLCJyZWxzIiwidGFyZ2V0IiwicGFyc2UiLCJPZmZpY2VEb2N1bWVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1lBLEksRUFBSztBQUFBLE9BQ1ZDLElBRFUsR0FDR0QsSUFESCxDQUNWQyxJQURVO0FBQUEsT0FDTEMsTUFESyxHQUNHRixJQURILENBQ0xFLE1BREs7O0FBRWYsT0FBSUMsTUFBSUYsS0FBS0csS0FBTCxDQUFXLEdBQVgsRUFBZ0JDLEdBQWhCLEVBQVI7QUFDQSxPQUFHLGtJQUFvQkMsU0FBcEIsS0FBa0NILE9BQUssU0FBMUMsRUFDQyxPQUFPLElBQVA7O0FBRUQsT0FBR0QsVUFBVUEsT0FBT0QsSUFBakIsSUFBeUJDLE9BQU9ELElBQVAsQ0FBWUcsS0FBWixDQUFrQixHQUFsQixFQUF1QkMsR0FBdkIsTUFBOEIsUUFBMUQsRUFDQyxPQUFPLElBQVA7O0FBRUQsVUFBTyxLQUFQO0FBQ0E7OztnQ0FFYUwsSSxFQUFLO0FBQUEsT0FDWE8sTUFEVyxHQUNILEtBQUtDLGNBREYsQ0FDWEQsTUFEVztBQUFBLE9BRWJOLElBRmEsR0FFbUJELElBRm5CLENBRWJDLElBRmE7QUFBQSxPQUVLUSxXQUZMLEdBRW1CVCxJQUZuQixDQUVQVSxVQUZPLENBRUtELFdBRkw7O0FBR2xCLE9BQUlFLE9BQUtWLEtBQUtHLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxHQUFoQixFQUFUO0FBQ0EsV0FBT00sSUFBUDtBQUNBLFNBQUssR0FBTDtBQUNDQSxZQUFLLFdBQUw7QUFDQSxTQUFHRixlQUFlQSxZQUFZRyxHQUFaLENBQWdCLFdBQWhCLEtBQThCQyxTQUFoRCxFQUNDRixPQUFLLE1BQUw7QUFDRjtBQUNBLFNBQUssR0FBTDtBQUNDQSxZQUFLLFFBQUw7QUFDRDtBQUNBLFNBQUssR0FBTDtBQUNDQSxZQUFLLE1BQUw7QUFDRDtBQUNBLFNBQUssS0FBTDtBQUNDQSxZQUFLLE9BQUw7QUFDRDtBQUNBLFNBQUssSUFBTDtBQUNDQSxZQUFLLEtBQUw7QUFDRDtBQUNBLFNBQUssSUFBTDtBQUNDQSxZQUFLLE1BQUw7QUFDRDtBQUNBLFNBQUssS0FBTDtBQUNDQSxZQUFLLFFBQUw7QUFDRDtBQUNBLFNBQUssS0FBTDtBQUNDQSxZQUFLLFFBQUw7QUFDRDtBQUNBLFNBQUssUUFBTDtBQUNDLFNBQUlHLFVBQVFkLEtBQUtVLFVBQUwsQ0FBZ0JJLE9BQTVCO0FBQ0EsU0FBSUMsY0FBWUQsUUFBUUYsR0FBUixDQUFZLG1CQUFaLEVBQWlDUixLQUFqQyxDQUF1QyxHQUF2QyxFQUE0Q0MsR0FBNUMsRUFBaEI7QUFDQSxhQUFPVSxXQUFQO0FBQ0EsV0FBSyxTQUFMO0FBQ0NKLGNBQUssT0FBTDtBQUNBLFdBQUlLLEtBQUdGLFFBQVFGLEdBQVIsQ0FBWSx1Q0FBWixDQUFQO0FBQ0FaLFlBQUtVLFVBQUwsR0FBZ0I7QUFDZk8sZ0JBQU9qQixLQUFLVSxVQUFMLENBQWdCTyxNQURSO0FBRWZDLHdDQUE2QixJQUFJQyxNQUFKLENBQVcsS0FBS1gsY0FBTCxDQUFvQlksTUFBcEIsQ0FBMkJKLEVBQTNCLENBQVgsRUFBMkNLLFFBQTNDLENBQW9ELFFBQXBEO0FBRmQsUUFBaEI7QUFJRDtBQUNBO0FBQ0NWLGNBQUtJLFdBQUw7QUFDRDtBQVhBO0FBYUQ7QUFDQSxTQUFLLFNBQUw7QUFDQyxZQUFPZixLQUFLc0IsUUFBTCxDQUFjLENBQWQsQ0FBUDtBQUNELFNBQUssS0FBTDtBQUNDLFNBQUlDLFVBQVFkLFlBQVlHLEdBQVosQ0FBZ0IsU0FBaEIsQ0FBWjtBQUNBLFNBQUdXLFdBQVNWLFNBQVosRUFDQ1UsVUFBUWQsWUFBWWMsT0FBWixHQUFvQixFQUFDWixNQUFLLGtCQUFOLEVBQTVCO0FBQ0RBLFlBQUtZLFFBQVFaLElBQWI7QUFDRDtBQW5EQTs7QUFzREEsVUFBTyxLQUFLYSxlQUFMLENBQXFCeEIsSUFBckIsRUFBMkJXLElBQTNCLENBQVA7QUFDQTs7OzZCQUVVWCxJLEVBQU1XLEksRUFBSztBQUNyQixVQUFPLEtBQUtILGNBQUwsQ0FBb0JELE1BQXBCLENBQTJCa0IsaUJBQTNCLGtJQUE4RHpCLElBQTlELEVBQW1FVyxJQUFuRSxHQUF5RUEsSUFBekUsQ0FBUDtBQUNBOzs7c0NBRW1CWCxJLEVBQUtXLEksRUFBSztBQUM3QixXQUFPQSxJQUFQO0FBQ0EsU0FBSyxhQUFMO0FBQ0MsU0FBSWUsTUFBSTFCLEtBQUsyQixDQUFMLENBQU9DLEtBQVAsQ0FBYXhCLEtBQWIsQ0FBbUIsVUFBbkIsRUFBK0J5QixNQUEvQixDQUFzQyxDQUFDLENBQXZDLEVBQXlDLENBQXpDLENBQVI7QUFDQTdCLFVBQUtFLE1BQUwsQ0FBWXlCLENBQVosQ0FBY0osT0FBZCxHQUFzQixFQUFDWixNQUFLLGtCQUFOLEVBQTBCZSxRQUExQixFQUF0QjtBQUNEO0FBQ0EsU0FBSyxNQUFMO0FBQ0MsU0FBRyxDQUFDMUIsS0FBS0UsTUFBTCxDQUFZeUIsQ0FBWixDQUFjSixPQUFsQixFQUNDdkIsS0FBS0UsTUFBTCxDQUFZeUIsQ0FBWixDQUFjSixPQUFkLEdBQXNCLEVBQUNaLG1CQUFnQkEsSUFBakIsRUFBdEI7QUFDRjtBQUNBLFNBQUssU0FBTDtBQUNBLFNBQUssYUFBTDtBQUNBLFNBQUssVUFBTDtBQUNBLFNBQUssY0FBTDtBQUNBLFNBQUssTUFBTDtBQUNBLFNBQUssVUFBTDtBQUNDWCxVQUFLRSxNQUFMLENBQVl5QixDQUFaLENBQWNKLE9BQWQsR0FBc0IsRUFBQ1osbUJBQWdCQSxJQUFqQixFQUF0QjtBQUNEO0FBQ0EsU0FBSyxVQUFMO0FBQ0NYLFVBQUtFLE1BQUwsQ0FBWXlCLENBQVosQ0FBY0osT0FBZCxHQUFzQixFQUFDWixNQUFLLGtCQUFOLEVBQXRCO0FBQ0Q7QUFuQkE7QUFxQkEsOElBQTZCTCxTQUE3QjtBQUNBOzs7K0JBRVlOLEksRUFBTVcsSSxFQUFLO0FBQUE7QUFBQTs7QUFBQSxPQUNkbUIsQ0FEYyxHQUNIOUIsSUFERyxDQUNoQjJCLENBRGdCO0FBQUEsT0FDWHpCLE1BRFcsR0FDSEYsSUFERyxDQUNYRSxNQURXOztBQUV2QixPQUFHQSxVQUFVQSxPQUFPRCxJQUFQLElBQWEsU0FBMUIsRUFDQyxPQUFPOEIscUNBQXVCekIsU0FBdkIsQ0FBUDtBQUNELE9BQUkwQixjQUFKOztBQUp1QjtBQUt2QixZQUFPckIsSUFBUDtBQUNDO0FBQ0QsVUFBSyxNQUFMO0FBQ0M7QUFBQSxVQUFPLEVBQUNzQixPQUFNLE9BQUtDLE1BQUwsQ0FBWUosRUFBRSxHQUFGLENBQVosQ0FBUCxFQUE0QkssUUFBTyxPQUFLRCxNQUFMLENBQVlKLEVBQUUsR0FBRixDQUFaLENBQW5DO0FBQVA7QUFDRCxVQUFLLE9BQUw7QUFDQ0UsY0FBTSxFQUFOO0FBQ0EsMEJBQVlGLENBQVosRUFBZU0sT0FBZixDQUF1QjtBQUFBLGNBQUdKLE1BQU1LLEVBQUVqQyxLQUFGLENBQVEsR0FBUixFQUFhQyxHQUFiLEVBQU4sSUFBMEIsT0FBSzZCLE1BQUwsQ0FBWUosRUFBRU8sQ0FBRixDQUFaLENBQTdCO0FBQUEsT0FBdkI7QUFDQTtBQUFBLFVBQU9MO0FBQVA7QUFDRCxVQUFLLE1BQUw7QUFDQ0YsUUFBRVEsR0FBRixLQUFVUixFQUFFUSxHQUFGLEdBQU1DLFNBQVNULEVBQUVRLEdBQVgsQ0FBaEI7QUFDQVIsUUFBRVUsS0FBRixLQUFZVixFQUFFVSxLQUFGLEdBQVEsT0FBS04sTUFBTCxDQUFZSixFQUFFVSxLQUFkLENBQXBCOztBQUVBLFVBQUdWLEVBQUVXLEdBQUwsRUFBUztBQUNSWCxTQUFFWSxJQUFGLEdBQU9aLEVBQUVXLEdBQUYsQ0FBTUUsR0FBTixDQUFVO0FBQUEsZUFBTTtBQUN0QlYsZ0JBQU0sT0FBS0MsTUFBTCxDQUFZTyxJQUFJRyxDQUFoQixDQURnQjtBQUV0QkosZ0JBQU0sT0FBS04sTUFBTCxDQUFZTyxJQUFJRCxLQUFoQjtBQUZnQixTQUFOO0FBQUEsUUFBVixDQUFQO0FBSUEsY0FBT1YsRUFBRVcsR0FBVDtBQUNBO0FBQ0Q7QUFBQSxVQUFPWDtBQUFQO0FBQ0Q7QUFDQSxVQUFLLElBQUw7QUFDQztBQUFBLFVBQU9BLEVBQUVlO0FBQVQ7QUFDRCxVQUFLLEtBQUw7QUFDQywwQkFBWWYsQ0FBWixFQUFlTSxPQUFmLENBQXVCO0FBQUEsY0FBR04sRUFBRU8sQ0FBRixJQUFLLE9BQUtILE1BQUwsQ0FBWUosRUFBRU8sQ0FBRixDQUFaLENBQVI7QUFBQSxPQUF2QjtBQUNBO0FBQUEsVUFBT1A7QUFBUDtBQUNELFVBQUssU0FBTDtBQUNDO0FBQUEsVUFBTyxPQUFLZ0IsU0FBTCxDQUFlaEIsQ0FBZjtBQUFQO0FBQ0QsVUFBSyxNQUFMO0FBQ0NFLGNBQU0sRUFBTjtBQUNBLDBCQUFZRixDQUFaLEVBQWVpQixNQUFmLENBQXNCO0FBQUEsY0FBR1YsS0FBRyxHQUFOO0FBQUEsT0FBdEIsRUFBaUNELE9BQWpDLENBQXlDO0FBQUEsY0FBR0osTUFBTUssQ0FBTixJQUFTLE9BQUtXLFFBQUwsQ0FBY2xCLEVBQUVPLENBQUYsRUFBSyxDQUFMLENBQWQsQ0FBWjtBQUFBLE9BQXpDO0FBQ0E7QUFBQSxVQUFPTDtBQUFQO0FBQ0Q7QUFDQSxVQUFLLFFBQUw7QUFDQyxVQUFJaUIsUUFBTW5CLEVBQUUsT0FBRixLQUFZLE9BQUt0QixjQUFMLENBQW9CMEMsU0FBcEIsQ0FBOEJ0QyxHQUE5QixDQUFrQ2tCLEVBQUUsWUFBRixDQUFsQyxDQUF0QjtBQUNBLFVBQUlxQixPQUFLckIsRUFBRSxVQUFGLEtBQWUsT0FBS3RCLGNBQUwsQ0FBb0IwQyxTQUFwQixDQUE4QnRDLEdBQTlCLENBQWtDa0IsRUFBRSxlQUFGLENBQWxDLENBQXhCOztBQUVBLFVBQUdtQixTQUFTRSxJQUFaLEVBQ0M7QUFBQSxXQUFPLEVBQUNGLFlBQUQsRUFBUUUsVUFBUjtBQUFQO0FBQ0Y7QUFDQSxVQUFLLE1BQUw7QUFDQSxVQUFLLFdBQUw7QUFDQztBQUFBLFVBQU9yQixFQUFFZTtBQUFUO0FBQ0QsVUFBSyxJQUFMO0FBQ0M7QUFBQSxVQUFPLE9BQUtPLEtBQUwsQ0FBV2IsU0FBU1QsRUFBRSxLQUFGLENBQVQsSUFBbUIsQ0FBOUI7QUFBUDtBQUNELFVBQUssR0FBTDtBQUNDO0FBQUEsVUFBT1MsU0FBU1QsRUFBRWUsR0FBWCxJQUFnQjtBQUF2QjtBQUNELFVBQUssTUFBTDtBQUNDO0FBQUEsVUFBT04sU0FBU1QsRUFBRWUsR0FBWCxJQUFnQjtBQUF2QjtBQUNELFVBQUssU0FBTDtBQUNBLFVBQUssVUFBTDtBQUNDO0FBQUEsVUFBTyxPQUFLWCxNQUFMLENBQVlKLEVBQUVlLEdBQWQ7QUFBUDtBQUNELFVBQUssR0FBTDtBQUNBLFVBQUssUUFBTDtBQUNBLFVBQUssR0FBTDtBQUNBLFVBQUssV0FBTDtBQUNBLFVBQUssR0FBTDtBQUNDO0FBQUEsVUFBTyxPQUFLUSxRQUFMLENBQWN2QixDQUFkO0FBQVA7QUFDRCxVQUFLLFlBQUw7QUFDQSxVQUFLLE9BQUw7QUFDQztBQUFBLFVBQU8sT0FBS3dCLE9BQUwsQ0FBYXhCLEVBQUVlLEdBQUYsSUFBUyxPQUFLckMsY0FBTCxDQUFvQitDLFVBQXBCLENBQStCM0MsR0FBL0IsQ0FBbUNrQixFQUFFeUIsVUFBckMsQ0FBdEI7QUFBUDtBQUNELFVBQUssR0FBTDtBQUNDO0FBQUEsVUFBT3pCO0FBQVA7QUFDRCxVQUFLLEtBQUw7QUFDQztBQUFBLFVBQU8sT0FBS2tCLFFBQUwsQ0FBY2xCLENBQWQ7QUFBUDtBQUNEO0FBQ0EsVUFBSyxTQUFMO0FBQ0M7QUFBQSxVQUFPQTtBQUFQO0FBQ0QsVUFBSyxTQUFMO0FBQ0M7QUFBQSxVQUFPOUIsS0FBS3dELE9BQUwsQ0FBYWIsR0FBYixDQUFpQjtBQUFBLGVBQUcsT0FBS1QsTUFBTCxDQUFZRyxFQUFFVixDQUFGLENBQUlpQixDQUFoQixDQUFIO0FBQUEsUUFBakI7QUFBUDtBQUNELFVBQUssV0FBTDtBQUNBLFVBQUssWUFBTDtBQUNDLFVBQUlaLFFBQU0sRUFBVjtBQUNBLDBCQUFZaEMsSUFBWixFQUFrQm9DLE9BQWxCLENBQTBCLGFBQUc7QUFDNUJKLGFBQU1LLENBQU4sSUFBUyxPQUFLVyxRQUFMLENBQWNoRCxLQUFLcUMsQ0FBTCxFQUFRLENBQVIsRUFBV1YsQ0FBekIsQ0FBVDtBQUNBLE9BRkQ7QUFHQTtBQUFBLFVBQU9LO0FBQVA7QUFDRCxVQUFLLEtBQUw7QUFDQztBQUFBLFVBQU8sT0FBS3NCLE9BQUwsQ0FBYXhCLEVBQUUyQixJQUFmO0FBQVA7QUFDRDtBQUNBLFVBQUssUUFBTDtBQUNDO0FBQUEsVUFBTyxFQUFDeEIsT0FBTSxPQUFLeUIsS0FBTCxDQUFXNUIsRUFBRTZCLEVBQWIsQ0FBUCxFQUF3QnhCLFFBQU8sT0FBS3VCLEtBQUwsQ0FBVzVCLEVBQUU4QixFQUFiLENBQS9CO0FBQVA7QUFDRDtBQUNDO0FBQUE7QUFBQTtBQW5GRDtBQUx1Qjs7QUFBQTtBQTBGdkI7OzsyQkFFUTlCLEMsRUFBRTtBQUNWLE9BQUdBLEtBQUdqQixTQUFILElBQWdCaUIsRUFBRWUsR0FBRixJQUFPaEMsU0FBMUIsRUFBb0M7QUFDbkMsV0FBTyxDQUFDLENBQVI7QUFDQSxJQUZELE1BRUs7QUFDSixXQUFPMEIsU0FBU1QsRUFBRWUsR0FBWCxDQUFQO0FBQ0E7QUFDRDs7OzRCQUVTZixDLEVBQUU7QUFDWCxPQUFJK0IsSUFBRS9CLENBQU47QUFBQSxPQUFTZ0MsSUFBRSxFQUFYOztBQUVBLE9BQUcsQ0FBQ0QsRUFBRUUsaUJBQUgsSUFBd0JGLEVBQUVHLFdBQTdCLEVBQ0NGLEVBQUVHLEdBQUYsR0FBTSxLQUFLL0IsTUFBTCxDQUFhMkIsRUFBRUcsV0FBZixDQUFOLENBREQsS0FFSyxJQUFHSCxFQUFFSyxNQUFMLEVBQ0pKLEVBQUVHLEdBQUYsR0FBTSxLQUFLL0IsTUFBTCxDQUFhMkIsRUFBRUssTUFBZixDQUFOOztBQUVELE9BQUcsQ0FBQ0wsRUFBRU0sZ0JBQUgsSUFBdUJOLEVBQUVPLFVBQTVCLEVBQ0NOLEVBQUVPLE1BQUYsR0FBUyxLQUFLbkMsTUFBTCxDQUFhMkIsRUFBRU8sVUFBZixDQUFULENBREQsS0FFSyxJQUFHUCxFQUFFUyxLQUFMLEVBQ0pSLEVBQUVPLE1BQUYsR0FBUyxLQUFLbkMsTUFBTCxDQUFhMkIsRUFBRVMsS0FBZixDQUFUOztBQUVELE9BQUcsQ0FBQ1QsRUFBRVUsSUFBTixFQUNDLE9BQU9ULENBQVA7O0FBRUQsV0FBT2hDLEVBQUUwQyxRQUFUO0FBQ0EsU0FBSyxTQUFMO0FBQ0EsU0FBSyxPQUFMO0FBQ0NWLE9BQUVXLFVBQUYsR0FBYSxLQUFLdkMsTUFBTCxDQUFhSixFQUFFeUMsSUFBZixDQUFiO0FBQ0E7QUFDRCxTQUFLLE1BQUw7QUFDQTtBQUNDVCxPQUFFVyxVQUFGLEdBQWNsQyxTQUFTc0IsRUFBRVUsSUFBWCxJQUFpQixHQUFqQixHQUFxQixHQUF0QixHQUEyQixHQUF4QztBQVBEO0FBU0FULEtBQUVVLFFBQUYsR0FBVzFDLEVBQUUwQyxRQUFiO0FBQ0EsVUFBT1YsQ0FBUDtBQUNBOzs7MkJBRVFoQyxDLEVBQUU7QUFDVixPQUFJNEMsU0FBTzVDLENBQVg7QUFDQTRDLFVBQU9DLEVBQVAsS0FBY0QsT0FBT0MsRUFBUCxHQUFVRCxPQUFPQyxFQUFQLEdBQVUsQ0FBbEM7QUFDQUQsVUFBT0UsS0FBUCxLQUFpQkYsT0FBT0UsS0FBUCxHQUFhLEtBQUt0QixPQUFMLENBQWFvQixPQUFPRSxLQUFwQixDQUE5QjtBQUNBLFVBQU9GLE1BQVA7QUFDQTs7O2lDQUVjMUUsSSxFQUFLRyxHLEVBQUk7QUFBQSxpQkFDRkgsSUFERSxDQUNoQjJCLENBRGdCO0FBQUEsT0FDYlgsRUFEYSxXQUNiQSxFQURhO0FBQUEsT0FDVEwsSUFEUyxXQUNUQSxJQURTOztBQUV2QixPQUFJa0UsT0FBSyxJQUFJQyxZQUFKLENBQWlCLEtBQUt0RSxjQUFMLENBQW9CdUUsSUFBcEIsQ0FBeUIvRCxFQUF6QixFQUE2QmdFLE1BQTlDLEVBQXNELElBQXRELEVBQTREckUsSUFBNUQsQ0FBVDtBQUNBLFVBQU9rRSxLQUFLSSxLQUFMLEVBQVA7QUFDQTs7O3NCQXRQZTtBQUFDLFVBQU8sTUFBUDtBQUFjOzs7OztPQUV4QkMsYyIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRpc1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7bmFtZSxwYXJlbnR9PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdGlmKHN1cGVyLmlzUHJvcGVydHkoLi4uYXJndW1lbnRzKSB8fCB0YWc9PSd0YmxHcmlkJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX19PW5vZGVcblx0XHRsZXQgdHlwZT1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdHR5cGU9XCJwYXJhZ3JhcGhcIlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGUuZ2V0KCdwUHIubnVtUHInKSE9dW5kZWZpbmVkKVxuXHRcdFx0XHR0eXBlPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiclwiOlxuXHRcdFx0dHlwZT1cImlubGluZVwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidFwiOlxuXHRcdFx0dHlwZT1cInRleHRcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInRibFwiOlxuXHRcdFx0dHlwZT1cInRhYmxlXCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJ0clwiOlxuXHRcdFx0dHlwZT1cInJvd1wiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidGNcIjpcblx0XHRcdHR5cGU9XCJjZWxsXCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJoZHJcIjpcblx0XHRcdHR5cGU9XCJoZWFkZXJcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImZ0clwiOlxuXHRcdFx0dHlwZT1cImZvb3RlclwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiaW5saW5lXCI6XG5cdFx0XHRsZXQgZ3JhcGhpYz1ub2RlLmF0dHJpYnV0ZXMuZ3JhcGhpY1xuXHRcdFx0bGV0IGdyYXBoaWNUeXBlPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEuJC51cmlcIikuc3BsaXQoJy8nKS5wb3AoKVxuXHRcdFx0c3dpdGNoKGdyYXBoaWNUeXBlKXtcblx0XHRcdGNhc2UgJ3BpY3R1cmUnOlxuXHRcdFx0XHR0eXBlPVwiaW1hZ2VcIlxuXHRcdFx0XHRsZXQgaWQ9Z3JhcGhpYy5nZXQoXCJncmFwaGljRGF0YS5waWMuYmxpcEZpbGwuYmxpcC4kLmVtYmVkXCIpXG5cdFx0XHRcdG5vZGUuYXR0cmlidXRlcz17XG5cdFx0XHRcdFx0ZXh0ZW50Om5vZGUuYXR0cmlidXRlcy5leHRlbnQsXG5cdFx0XHRcdFx0c3JjOmBkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtuZXcgQnVmZmVyKHRoaXMub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGlkKSkudG9TdHJpbmcoJ2Jhc2U2NCcpfWBcblx0XHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHR5cGU9Z3JhcGhpY1R5cGVcblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cblx0XHRjYXNlIFwic2R0XCI6XG5cdFx0XHRsZXQgY29udHJvbD1kaXJlY3RTdHlsZS5nZXQoXCJjb250cm9sXCIpXG5cdFx0XHRpZihjb250cm9sPT11bmRlZmluZWQpXG5cdFx0XHRcdGNvbnRyb2w9ZGlyZWN0U3R5bGUuY29udHJvbD17dHlwZTpcImNvbnRyb2wucmljaHRleHRcIn1cblx0XHRcdHR5cGU9Y29udHJvbC50eXBlXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSlcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKHN1cGVyLnRvUHJvcGVydHkobm9kZSx0eXBlKSx0eXBlKVxuXHR9XG5cdFxuXHRvblRvQ29udHJvbFByb3BlcnR5KG5vZGUsdHlwZSl7XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2RhdGFCaW5kaW5nJzpcblx0XHRcdGxldCBrZXk9bm9kZS4kLnhwYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLnNwbGljZSgtMiwxKVxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOidkb2N1bWVudFByb3BlcnR5Jywga2V5fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAndGV4dCc6XG5cdFx0XHRpZighbm9kZS5wYXJlbnQuJC5jb250cm9sKVxuXHRcdFx0XHRub2RlLnBhcmVudC4kLmNvbnRyb2w9e3R5cGU6YGNvbnRyb2wuJHt0eXBlfWB9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRjYXNlICdkb2NQYXJ0TGlzdCc6IFxuXHRcdGNhc2UgJ2NvbWJvQm94JzogXG5cdFx0Y2FzZSAnZHJvcERvd25MaXN0JzogXG5cdFx0Y2FzZSAnZGF0ZSc6XG5cdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOmBjb250cm9sLiR7dHlwZX1gfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncmljaHRleHQnOlxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOlwiY29udHJvbC5yaWNodGV4dFwifVxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdGNvbnN0IHskOngsIHBhcmVudH09bm9kZVxuXHRcdGlmKHBhcmVudCAmJiBwYXJlbnQubmFtZT09J3c6c2R0UHInKVxuXHRcdFx0cmV0dXJuIG9uVG9Db250cm9sUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdGxldCB2YWx1ZVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdC8vc2VjdGlvbiwgc2VjdFByXG5cdFx0Y2FzZSAncGdTeic6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuZHhhMlB4KHhbJ3cnXSksIGhlaWdodDp0aGlzLmR4YTJQeCh4WydoJ10pfVxuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRjYXNlICdjb2xzJzpcblx0XHRcdHgubnVtICYmICh4Lm51bT1wYXJzZUludCh4Lm51bSkpO1xuXHRcdFx0eC5zcGFjZSAmJiAoeC5zcGFjZT10aGlzLmR4YTJQeCh4LnNwYWNlKSk7XG5cblx0XHRcdGlmKHguY29sKXtcblx0XHRcdFx0eC5kYXRhPXguY29sLm1hcChjb2w9Pih7XG5cdFx0XHRcdFx0d2lkdGg6dGhpcy5keGEyUHgoY29sLncpLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbC5zcGFjZSlcblx0XHRcdFx0fSkpXG5cdFx0XHRcdGRlbGV0ZSB4LmNvbFxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHhcblx0XHQvL3BhcmFncmFwaCwgcFByXG5cdFx0Y2FzZSAnamMnOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnaW5kJzpcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+eFthXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b1NwYWNpbmcoeClcblx0XHRjYXNlICdwQmRyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5maWx0ZXIoYT0+YSE9JyQnKS5mb3JFYWNoKGE9PnZhbHVlW2FdPXRoaXMudG9Cb3JkZXIoeFthXVswXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHQvL2lubGluZSwgclByXG5cdFx0Y2FzZSAnckZvbnRzJzpcblx0XHRcdGxldCBhc2NpaT14Wydhc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnYXNjaWlUaGVtZSddKVxuXHRcdFx0bGV0IGFzaWE9eFsnZWFzdEFzaWEnXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2Vhc3RBc2lhVGhlbWUnXSlcblxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ2xhbmcnOlxuXHRcdGNhc2UgJ3ZlcnRBbGlnbic6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd2YWwnXSkvMilcblx0XHRjYXNlICd3Jzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMTAwLjBcblx0XHRjYXNlICdrZXJuJzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMlxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdGNhc2UgJ3Bvc2l0aW9uJzpcblx0XHRcdHJldHVybiB0aGlzLmR4YTJQeCh4LnZhbClcblx0XHRjYXNlICdpJzpcblx0XHRjYXNlICd2YW5pc2gnOlxuXHRcdGNhc2UgJ3UnOlxuXHRcdGNhc2UgJ3NtYWxsQ2Fwcyc6XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdGNhc2UgJ2hpZ2h0bGlnaHQnOlxuXHRcdGNhc2UgJ2NvbG9yJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC52YWwgfHwgdGhpcy5vZmZpY2VEb2N1bWVudC50aGVtZUNvbG9yLmdldCh4LnRoZW1lQ29sb3IpKVxuXHRcdGNhc2UgJ3UnOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdiZHgnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9Cb3JkZXIoeClcblx0XHQvL3RhYmxlXG5cdFx0Y2FzZSAndGJsTG9vayc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3RibEdyaWQnOlxuXHRcdFx0cmV0dXJuIG5vZGUuZ3JpZENvbC5tYXAoYT0+dGhpcy5keGEyUHgoYS4kLncpKVxuXHRcdGNhc2UgJ3RjQm9yZGVycyc6XG5cdFx0Y2FzZSAndGJsQm9yZGVycyc6XG5cdFx0XHRsZXQgdmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xuXHRcdFx0XHR2YWx1ZVthXT10aGlzLnRvQm9yZGVyKG5vZGVbYV1bMF0uJClcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0Y2FzZSAnc2hkJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5maWxsKVxuXHRcdC8vZHJhd2luZ1xuXHRcdGNhc2UgJ2V4dGVudCc6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuY20yUHgoeC5jeCksaGVpZ2h0OnRoaXMuY20yUHgoeC5jeSl9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXG5cdGFzVG9nZ2xlKHgpe1xuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAtMVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKVxuXHRcdH1cblx0fVxuXG5cdHRvU3BhY2luZyh4KXtcblx0XHR2YXIgcj14LCBvPXt9XG5cblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlTGluZXMpKVxuXHRcdGVsc2UgaWYoci5iZWZvcmUpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlcikpXG5cblx0XHRpZighci5saW5lKVxuXHRcdFx0cmV0dXJuIG9cblxuXHRcdHN3aXRjaCh4LmxpbmVSdWxlKXtcblx0XHRjYXNlICdhdExlYXN0Jzpcblx0XHRjYXNlICdleGFjdCc6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9dGhpcy5keGEyUHgoKHgubGluZSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXG5cdFx0fVxuXHRcdG8ubGluZVJ1bGU9eC5saW5lUnVsZVxuXHRcdHJldHVybiBvXG5cdH1cblxuXHR0b0JvcmRlcih4KXtcblx0XHR2YXIgYm9yZGVyPXhcblx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0cmV0dXJuIGJvcmRlclxuXHR9XG5cdFxuXHR0b0hlYWRlckZvb3Rlcihub2RlLHRhZyl7XG5cdFx0Y29uc3QgeyQ6e2lkLCB0eXBlfX09bm9kZVxuXHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5vZmZpY2VEb2N1bWVudC5yZWxzW2lkXS50YXJnZXQsIHRoaXMsIHR5cGUpXG5cdFx0cmV0dXJuIHBhcnQucGFyc2UoKVxuXHR9XG59XG4iXX0=