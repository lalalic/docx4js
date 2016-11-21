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
							v: parseInt(x['val']) / 2
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsibm9kZSIsIm5hbWUiLCJwYXJlbnQiLCJ0YWciLCJzcGxpdCIsInBvcCIsImFyZ3VtZW50cyIsInN0eWxlcyIsIm9mZmljZURvY3VtZW50IiwiZGlyZWN0U3R5bGUiLCJhdHRyaWJ1dGVzIiwidHlwZSIsImdldCIsInVuZGVmaW5lZCIsImdyYXBoaWMiLCJncmFwaGljVHlwZSIsImlkIiwiZXh0ZW50Iiwic3JjIiwiQnVmZmVyIiwiZ2V0UmVsIiwidG9TdHJpbmciLCJjaGlsZHJlbiIsImNvbnRyb2wiLCJvbkNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVEaXJlY3RTdHlsZSIsImtleSIsIiQiLCJ4cGF0aCIsInNwbGljZSIsIngiLCJvblRvQ29udHJvbFByb3BlcnR5IiwidmFsdWUiLCJ3aWR0aCIsImR4YTJQeCIsImhlaWdodCIsImZvckVhY2giLCJhIiwibnVtIiwicGFyc2VJbnQiLCJzcGFjZSIsImNvbCIsImRhdGEiLCJtYXAiLCJ3IiwidmFsIiwidG9TcGFjaW5nIiwiZmlsdGVyIiwidG9Cb3JkZXIiLCJhc2NpaSIsImZvbnRUaGVtZSIsImFzaWEiLCJhc1RvZ2dsZSIsImFzQ29sb3IiLCJ0aGVtZUNvbG9yIiwiZ3JpZENvbCIsImZpbGwiLCJjbTJQeCIsImN4IiwiY3kiLCJyIiwibyIsImJlZm9yZUF1dG9zcGFjaW5nIiwiYmVmb3JlTGluZXMiLCJ0b3AiLCJiZWZvcmUiLCJhZnRlckF1dG9zcGFjaW5nIiwiYWZ0ZXJMaW5lcyIsImJvdHRvbSIsImFmdGVyIiwibGluZSIsImxpbmVSdWxlIiwibGluZUhlaWdodCIsImJvcmRlciIsInN6IiwiY29sb3IiLCJwYXJ0IiwiSGVhZGVyRm9vdGVyIiwicmVscyIsInRhcmdldCIsInBhcnNlIiwiT2ZmaWNlRG9jdW1lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7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QUNBO0FBQ0QsU0FBSyxNQUFMO0FBQ0E7QUFDQ1QsT0FBRVcsVUFBRixHQUFjakMsU0FBU3FCLEVBQUVVLElBQVgsSUFBaUIsR0FBakIsR0FBcUIsR0FBdEIsR0FBMkIsR0FBeEM7QUFQRDtBQVNBVCxLQUFFVSxRQUFGLEdBQVd6QyxFQUFFeUMsUUFBYjtBQUNBLFVBQU9WLENBQVA7QUFDQTs7OzJCQUVRL0IsQyxFQUFFO0FBQ1YsT0FBSTJDLFNBQU8zQyxDQUFYO0FBQ0EyQyxVQUFPQyxFQUFQLEtBQWNELE9BQU9DLEVBQVAsR0FBVUQsT0FBT0MsRUFBUCxHQUFVLENBQWxDO0FBQ0FELFVBQU9FLEtBQVAsS0FBaUJGLE9BQU9FLEtBQVAsR0FBYSxLQUFLdEIsT0FBTCxDQUFhb0IsT0FBT0UsS0FBcEIsQ0FBOUI7QUFDQSxVQUFPRixNQUFQO0FBQ0E7OztpQ0FFY3pFLEksRUFBS0csRyxFQUFJO0FBQUEsaUJBQ0ZILElBREUsQ0FDaEIyQixDQURnQjtBQUFBLE9BQ2JYLEVBRGEsV0FDYkEsRUFEYTtBQUFBLE9BQ1RMLElBRFMsV0FDVEEsSUFEUzs7QUFFdkIsT0FBSWlFLE9BQUssSUFBSUMsWUFBSixDQUFpQixLQUFLckUsY0FBTCxDQUFvQnNFLElBQXBCLENBQXlCOUQsRUFBekIsRUFBNkIrRCxNQUE5QyxFQUFzRCxJQUF0RCxFQUE0RHBFLElBQTVELENBQVQ7QUFDQSxVQUFPaUUsS0FBS0ksS0FBTCxFQUFQO0FBQ0E7OztzQkF0UGU7QUFBQyxVQUFPLE1BQVA7QUFBYzs7Ozs7T0FFeEJDLGMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxyXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XHJcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxyXG5cclxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcclxuXHJcblx0aXNQcm9wZXJ0eShub2RlKXtcclxuXHRcdGxldCB7bmFtZSxwYXJlbnR9PW5vZGVcclxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRpZihzdXBlci5pc1Byb3BlcnR5KC4uLmFyZ3VtZW50cykgfHwgdGFnPT0ndGJsR3JpZCcpXHJcblx0XHRcdHJldHVybiB0cnVlXHJcblx0XHRcclxuXHRcdGlmKHBhcmVudCAmJiBwYXJlbnQubmFtZSAmJiBwYXJlbnQubmFtZS5zcGxpdCgnOicpLnBvcCgpPT0naW5saW5lJylcclxuXHRcdFx0cmV0dXJuIHRydWVcclxuXHRcdFxyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG5cdFxyXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XHJcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XHJcblx0XHRsZXQge25hbWUsIGF0dHJpYnV0ZXM6e2RpcmVjdFN0eWxlfX09bm9kZVxyXG5cdFx0bGV0IHR5cGU9bmFtZS5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlIFwicFwiOlxyXG5cdFx0XHR0eXBlPVwicGFyYWdyYXBoXCJcclxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGUuZ2V0KCdwUHIubnVtUHInKSE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHR5cGU9XCJsaXN0XCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiclwiOlxyXG5cdFx0XHR0eXBlPVwiaW5saW5lXCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwidFwiOlxyXG5cdFx0XHR0eXBlPVwidGV4dFwiXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcInRibFwiOlxyXG5cdFx0XHR0eXBlPVwidGFibGVcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJ0clwiOlxyXG5cdFx0XHR0eXBlPVwicm93XCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwidGNcIjpcclxuXHRcdFx0dHlwZT1cImNlbGxcIlxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgXCJoZHJcIjpcclxuXHRcdFx0dHlwZT1cImhlYWRlclwiXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcImZ0clwiOlxyXG5cdFx0XHR0eXBlPVwiZm9vdGVyXCJcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlIFwiaW5saW5lXCI6XHJcblx0XHRcdGxldCBncmFwaGljPW5vZGUuYXR0cmlidXRlcy5ncmFwaGljXHJcblx0XHRcdGxldCBncmFwaGljVHlwZT1ncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKClcclxuXHRcdFx0c3dpdGNoKGdyYXBoaWNUeXBlKXtcclxuXHRcdFx0Y2FzZSAncGljdHVyZSc6XHJcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcclxuXHRcdFx0XHRsZXQgaWQ9Z3JhcGhpYy5nZXQoXCJncmFwaGljRGF0YS5waWMuYmxpcEZpbGwuYmxpcC4kLmVtYmVkXCIpXHJcblx0XHRcdFx0bm9kZS5hdHRyaWJ1dGVzPXtcclxuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxyXG5cdFx0XHRcdFx0c3JjOmBkYXRhOmltYWdlL2pwZztiYXNlNjQsJHtuZXcgQnVmZmVyKHRoaXMub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKGlkKSkudG9TdHJpbmcoJ2Jhc2U2NCcpfWBcclxuXHRcdFx0XHR9XHJcblx0XHRcdGJyZWFrXHJcblx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0dHlwZT1ncmFwaGljVHlwZVxyXG5cdFx0XHRicmVha1xyXG5cdFx0XHR9XHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSBcImRyYXdpbmdcIjpcclxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cclxuXHRcdGNhc2UgXCJzZHRcIjpcclxuXHRcdFx0bGV0IGNvbnRyb2w9ZGlyZWN0U3R5bGUuZ2V0KFwiY29udHJvbFwiKVxyXG5cdFx0XHRpZihjb250cm9sPT11bmRlZmluZWQpXHJcblx0XHRcdFx0Y29udHJvbD1kaXJlY3RTdHlsZS5jb250cm9sPXt0eXBlOlwiY29udHJvbC5yaWNodGV4dFwifVxyXG5cdFx0XHR0eXBlPWNvbnRyb2wudHlwZVxyXG5cdFx0YnJlYWtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSlcclxuXHR9XHJcblxyXG5cdHRvUHJvcGVydHkobm9kZSwgdHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMuY3JlYXRlRGlyZWN0U3R5bGUoc3VwZXIudG9Qcm9wZXJ0eShub2RlLHR5cGUpLHR5cGUpXHJcblx0fVxyXG5cdFxyXG5cdG9uVG9Db250cm9sUHJvcGVydHkobm9kZSx0eXBlKXtcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgJ2RhdGFCaW5kaW5nJzpcclxuXHRcdFx0bGV0IGtleT1ub2RlLiQueHBhdGguc3BsaXQoL1tcXC9cXDpcXFtdLykuc3BsaWNlKC0yLDEpXHJcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTonZG9jdW1lbnRQcm9wZXJ0eScsIGtleX1cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICd0ZXh0JzpcclxuXHRcdFx0aWYoIW5vZGUucGFyZW50LiQuY29udHJvbClcclxuXHRcdFx0XHRub2RlLnBhcmVudC4kLmNvbnRyb2w9e3R5cGU6YGNvbnRyb2wuJHt0eXBlfWB9XHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSAncGljdHVyZSc6XHJcblx0XHRjYXNlICdkb2NQYXJ0TGlzdCc6IFxyXG5cdFx0Y2FzZSAnY29tYm9Cb3gnOiBcclxuXHRcdGNhc2UgJ2Ryb3BEb3duTGlzdCc6IFxyXG5cdFx0Y2FzZSAnZGF0ZSc6XHJcblx0XHRjYXNlICdjaGVja2JveCc6XHJcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpgY29udHJvbC4ke3R5cGV9YH1cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdyaWNodGV4dCc6XHJcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpcImNvbnRyb2wucmljaHRleHRcIn1cclxuXHRcdGJyZWFrXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcclxuXHRcdGNvbnN0IHskOngsIHBhcmVudH09bm9kZVxyXG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lPT0ndzpzZHRQcicpXHJcblx0XHRcdHJldHVybiBvblRvQ29udHJvbFByb3BlcnR5KC4uLmFyZ3VtZW50cylcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0XHQvL3NlY3Rpb24sIHNlY3RQclxyXG5cdFx0Y2FzZSAncGdTeic6XHJcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5keGEyUHgoeFsndyddKSwgaGVpZ2h0OnRoaXMuZHhhMlB4KHhbJ2gnXSl9XHJcblx0XHRjYXNlICdwZ01hcic6XHJcblx0XHRcdHZhbHVlPXt9XHJcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+dmFsdWVbYS5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmR4YTJQeCh4W2FdKSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHRjYXNlICdjb2xzJzpcclxuXHRcdFx0eC5udW0gJiYgKHgubnVtPXBhcnNlSW50KHgubnVtKSk7XHJcblx0XHRcdHguc3BhY2UgJiYgKHguc3BhY2U9dGhpcy5keGEyUHgoeC5zcGFjZSkpO1xyXG5cclxuXHRcdFx0aWYoeC5jb2wpe1xyXG5cdFx0XHRcdHguZGF0YT14LmNvbC5tYXAoY29sPT4oe1xyXG5cdFx0XHRcdFx0d2lkdGg6dGhpcy5keGEyUHgoY29sLncpLFxyXG5cdFx0XHRcdFx0c3BhY2U6dGhpcy5keGEyUHgoY29sLnNwYWNlKVxyXG5cdFx0XHRcdH0pKVxyXG5cdFx0XHRcdGRlbGV0ZSB4LmNvbFxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB4XHJcblx0XHQvL3BhcmFncmFwaCwgcFByXHJcblx0XHRjYXNlICdqYyc6XHJcblx0XHRcdHJldHVybiB4LnZhbFxyXG5cdFx0Y2FzZSAnaW5kJzpcclxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT54W2FdPXRoaXMuZHhhMlB4KHhbYV0pKVxyXG5cdFx0XHRyZXR1cm4geFxyXG5cdFx0Y2FzZSAnc3BhY2luZyc6XHJcblx0XHRcdHJldHVybiB0aGlzLnRvU3BhY2luZyh4KVxyXG5cdFx0Y2FzZSAncEJkcic6XHJcblx0XHRcdHZhbHVlPXt9XHJcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZpbHRlcihhPT5hIT0nJCcpLmZvckVhY2goYT0+dmFsdWVbYV09dGhpcy50b0JvcmRlcih4W2FdWzBdKSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHQvL2lubGluZSwgclByXHJcblx0XHRjYXNlICdyRm9udHMnOlxyXG5cdFx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcclxuXHRcdFx0bGV0IGFzaWE9eFsnZWFzdEFzaWEnXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2Vhc3RBc2lhVGhlbWUnXSlcclxuXHJcblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXHJcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdsYW5nJzpcclxuXHRcdGNhc2UgJ3ZlcnRBbGlnbic6XHJcblx0XHRcdHJldHVybiB4LnZhbFxyXG5cdFx0Y2FzZSAnc3onOlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeFsndmFsJ10pLzJcclxuXHRcdGNhc2UgJ3cnOlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzEwMC4wXHJcblx0XHRjYXNlICdrZXJuJzpcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8yXHJcblx0XHRjYXNlICdzcGFjaW5nJzpcclxuXHRcdGNhc2UgJ3Bvc2l0aW9uJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuZHhhMlB4KHgudmFsKVxyXG5cdFx0Y2FzZSAnaSc6XHJcblx0XHRjYXNlICd2YW5pc2gnOlxyXG5cdFx0Y2FzZSAndSc6XHJcblx0XHRjYXNlICdzbWFsbENhcHMnOlxyXG5cdFx0Y2FzZSAnYic6XHJcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXHJcblx0XHRjYXNlICdoaWdodGxpZ2h0JzpcclxuXHRcdGNhc2UgJ2NvbG9yJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LnZhbCB8fCB0aGlzLm9mZmljZURvY3VtZW50LnRoZW1lQ29sb3IuZ2V0KHgudGhlbWVDb2xvcikpXHJcblx0XHRjYXNlICd1JzpcclxuXHRcdFx0cmV0dXJuIHhcclxuXHRcdGNhc2UgJ2JkeCc6XHJcblx0XHRcdHJldHVybiB0aGlzLnRvQm9yZGVyKHgpXHJcblx0XHQvL3RhYmxlXHJcblx0XHRjYXNlICd0YmxMb29rJzpcclxuXHRcdFx0cmV0dXJuIHhcclxuXHRcdGNhc2UgJ3RibEdyaWQnOlxyXG5cdFx0XHRyZXR1cm4gbm9kZS5ncmlkQ29sLm1hcChhPT50aGlzLmR4YTJQeChhLiQudykpXHJcblx0XHRjYXNlICd0Y0JvcmRlcnMnOlxyXG5cdFx0Y2FzZSAndGJsQm9yZGVycyc6XHJcblx0XHRcdGxldCB2YWx1ZT17fVxyXG5cdFx0XHRPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0XHR2YWx1ZVthXT10aGlzLnRvQm9yZGVyKG5vZGVbYV1bMF0uJClcclxuXHRcdFx0fSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlO1xyXG5cdFx0Y2FzZSAnc2hkJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmZpbGwpXHJcblx0XHQvL2RyYXdpbmdcclxuXHRcdGNhc2UgJ2V4dGVudCc6XHJcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5jbTJQeCh4LmN4KSxoZWlnaHQ6dGhpcy5jbTJQeCh4LmN5KX1cclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXNUb2dnbGUoeCl7XHJcblx0XHRpZih4PT11bmRlZmluZWQgfHwgeC52YWw9PXVuZGVmaW5lZCl7XHJcblx0XHRcdHJldHVybiAtMVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHRvU3BhY2luZyh4KXtcclxuXHRcdHZhciByPXgsIG89e31cclxuXHJcblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxyXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmVMaW5lcykpXHJcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxyXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxyXG5cclxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxyXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcclxuXHRcdGVsc2UgaWYoci5hZnRlcilcclxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxyXG5cclxuXHRcdGlmKCFyLmxpbmUpXHJcblx0XHRcdHJldHVybiBvXHJcblxyXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xyXG5cdFx0Y2FzZSAnYXRMZWFzdCc6XHJcblx0XHRjYXNlICdleGFjdCc6XHJcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLmR4YTJQeCgoeC5saW5lKSlcclxuXHRcdFx0YnJlYWtcclxuXHRcdGNhc2UgJ2F1dG8nOlxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xyXG5cdFx0fVxyXG5cdFx0by5saW5lUnVsZT14LmxpbmVSdWxlXHJcblx0XHRyZXR1cm4gb1xyXG5cdH1cclxuXHJcblx0dG9Cb3JkZXIoeCl7XHJcblx0XHR2YXIgYm9yZGVyPXhcclxuXHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcclxuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxyXG5cdFx0cmV0dXJuIGJvcmRlclxyXG5cdH1cclxuXHRcclxuXHR0b0hlYWRlckZvb3Rlcihub2RlLHRhZyl7XHJcblx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1ub2RlXHJcblx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMub2ZmaWNlRG9jdW1lbnQucmVsc1tpZF0udGFyZ2V0LCB0aGlzLCB0eXBlKVxyXG5cdFx0cmV0dXJuIHBhcnQucGFyc2UoKVxyXG5cdH1cclxufVxyXG4iXX0=