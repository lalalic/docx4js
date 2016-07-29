"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _officeDocument = require("./officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "isProperty",
		value: function isProperty(node) {
			var name = node.name;
			var parent = node.parent;

			var tag = name.split(':').pop();
			if (_get(Object.getPrototypeOf(_class.prototype), "isProperty", this).apply(this, arguments) || tag == 'tblGrid') return true;

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
					if (directStyle && directStyle.get('pPr.numPr') != undefined) type = "list";
					break;
				case "inline":
					var graphic = node.attributes.graphic;
					switch (graphic.get("graphicData.$.uri").split('/').pop()) {
						case 'picture':
							type = "image";
							var id = graphic.get("graphicData.pic.blipFill.blip.$.embed");
							node.attributes = {
								extent: node.attributes.extent,
								src: "data:image/jpg;base64," + new Buffer(this.officeDocument.getRel(id)).toString('base64')
							};
							break;
					}
					break;
				case "drawing":
					return node.children[0];
					break;
				case "sdt":
					var xpath = directStyle.get("dataBinding.$.xpath");
					if (xpath) {} else {}
					break;
			}

			return this.onCreateElement(node, type);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return this.officeDocument.styles.createDirectStyle(_get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node, type), type);
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			var _this2 = this;

			var x = node.$;

			var value = void 0;
			switch (type) {
				//section, sectPr
				case 'pgSz':
					return { width: this.dxa2Px(x['w']), height: this.dxa2Px(x['h']) };
					break;
				case 'pgMar':
					value = {};
					Object.keys(x).forEach(function (a) {
						return value[a.split(':').pop()] = _this2.dxa2Px(x[a]);
					});
					return value;
					break;
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
					break;
				//paragraph, pPr
				case 'jc':
					return x.val;
				case 'ind':
					Object.keys(x).forEach(function (a) {
						return x[a] = _this2.dxa2Px(x[a]);
					});
					return x;
				case 'spacing':
					return this.toSpacing(x);
				case 'pBdr':
					value = {};
					Object.keys(x).filter(function (a) {
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
					return this.pt2Px(parseInt(x['val']) / 2);
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
					var value = {};
					Object.keys(node).forEach(function (a) {
						value[a] = _this2.toBorder(node[a][0].$);
					});
					return value;
				case 'shd':
					return this.asColor(x.fill);
				//drawing
				case 'extent':
					return { width: this.cm2Px(x.cx), height: this.cm2Px(x.cy) };
				default:
					return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).apply(this, arguments);
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1ksTUFBSztPQUNWLE9BQWEsS0FBYixLQURVO09BQ0wsU0FBUSxLQUFSLE9BREs7O0FBRWYsT0FBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZXO0FBR2YsT0FBRyw4RUFBb0IsVUFBcEIsSUFBa0MsT0FBSyxTQUFMLEVBQ3BDLE9BQU8sSUFBUCxDQUREOztBQUdBLE9BQUcsVUFBVSxPQUFPLElBQVAsSUFBZSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLE1BQThCLFFBQTlCLEVBQzNCLE9BQU8sSUFBUCxDQUREOztBQUdBLFVBQU8sS0FBUCxDQVRlOzs7O2dDQVlGLE1BQUs7T0FDWCxTQUFRLEtBQUssY0FBTCxDQUFSLE9BRFc7T0FFYixPQUFnQyxLQUFoQyxLQUZhO09BRUssY0FBYyxLQUExQixXQUFZLFlBRkw7O0FBR2xCLE9BQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FIYztBQUlsQixXQUFPLElBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxHQUFaLENBQWdCLFdBQWhCLEtBQThCLFNBQTlCLEVBQ2pCLE9BQUssTUFBTCxDQUREO0FBRUQsV0FIQTtBQURBLFNBS0ssUUFBTDtBQUNDLFNBQUksVUFBUSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FEYjtBQUVDLGFBQU8sUUFBUSxHQUFSLENBQVksbUJBQVosRUFBaUMsS0FBakMsQ0FBdUMsR0FBdkMsRUFBNEMsR0FBNUMsRUFBUDtBQUNBLFdBQUssU0FBTDtBQUNDLGNBQUssT0FBTCxDQUREO0FBRUMsV0FBSSxLQUFHLFFBQVEsR0FBUixDQUFZLHVDQUFa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aUIsT0FBTyxLQUFQLEdBQWEsS0FBSyxPQUFMLENBQWEsT0FBTyxLQUFQLENBQTFCLENBQWpCLENBSFU7QUFJVixVQUFPLE1BQVAsQ0FKVTs7OztpQ0FPSSxNQUFLLEtBQUk7aUJBQ0YsS0FBZCxFQURnQjtPQUNiLGdCQURhO09BQ1Qsb0JBRFM7O0FBRXZCLE9BQUksT0FBSyxJQUFJLFlBQUosQ0FBaUIsS0FBSyxjQUFMLENBQW9CLElBQXBCLENBQXlCLEVBQXpCLEVBQTZCLE1BQTdCLEVBQXFDLElBQXRELEVBQTRELElBQTVELENBQUwsQ0FGbUI7QUFHdkIsVUFBTyxLQUFLLEtBQUwsRUFBUCxDQUh1Qjs7OztzQkFuTVI7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7Ozs7OztPQUVUIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCBPZmZpY2VEb2N1bWVudCBmcm9tIFwiLi9vZmZpY2VEb2N1bWVudFwiXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1PZmZpY2VEb2N1bWVudFxuXG5cdGlzUHJvcGVydHkobm9kZSl7XG5cdFx0bGV0IHtuYW1lLHBhcmVudH09bm9kZVxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0aWYoc3VwZXIuaXNQcm9wZXJ0eSguLi5hcmd1bWVudHMpIHx8IHRhZz09J3RibEdyaWQnKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRpZihwYXJlbnQgJiYgcGFyZW50Lm5hbWUgJiYgcGFyZW50Lm5hbWUuc3BsaXQoJzonKS5wb3AoKT09J2lubGluZScpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFxuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdFxuXHRjcmVhdGVFbGVtZW50KG5vZGUpe1xuXHRcdGNvbnN0IHtzdHlsZXN9PXRoaXMub2ZmaWNlRG9jdW1lbnRcblx0XHRsZXQge25hbWUsIGF0dHJpYnV0ZXM6e2RpcmVjdFN0eWxlfX09bm9kZVxuXHRcdGxldCB0eXBlPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlIFwicFwiOlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGUuZ2V0KCdwUHIubnVtUHInKSE9dW5kZWZpbmVkKVxuXHRcdFx0XHR0eXBlPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiaW5saW5lXCI6XG5cdFx0XHRsZXQgZ3JhcGhpYz1ub2RlLmF0dHJpYnV0ZXMuZ3JhcGhpY1xuXHRcdFx0c3dpdGNoKGdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEuJC51cmlcIikuc3BsaXQoJy8nKS5wb3AoKSl7XG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcblx0XHRcdFx0bGV0IGlkPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEucGljLmJsaXBGaWxsLmJsaXAuJC5lbWJlZFwiKVxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxuXHRcdFx0XHRcdHNyYzpgZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7bmV3IEJ1ZmZlcih0aGlzLm9mZmljZURvY3VtZW50LmdldFJlbChpZCkpLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cblx0XHRicmVha1xuXHRcdGNhc2UgXCJzZHRcIjpcblx0XHRcdGxldCB4cGF0aD1kaXJlY3RTdHlsZS5nZXQoXCJkYXRhQmluZGluZy4kLnhwYXRoXCIpXG5cdFx0XHRpZih4cGF0aCl7XG5cdFx0XHRcdFxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdFxuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMub25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShzdXBlci50b1Byb3BlcnR5KG5vZGUsdHlwZSksdHlwZSlcblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRjb25zdCB7JDp4fT1ub2RlXG5cdFx0bGV0IHZhbHVlXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdC8vc2VjdGlvbiwgc2VjdFByXG5cdFx0Y2FzZSAncGdTeic6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuZHhhMlB4KHhbJ3cnXSksIGhlaWdodDp0aGlzLmR4YTJQeCh4WydoJ10pfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGdNYXInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+dmFsdWVbYS5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnY29scyc6XG5cdFx0XHR4Lm51bSAmJiAoeC5udW09cGFyc2VJbnQoeC5udW0pKTtcblx0XHRcdHguc3BhY2UgJiYgKHguc3BhY2U9dGhpcy5keGEyUHgoeC5zcGFjZSkpO1xuXG5cdFx0XHRpZih4LmNvbCl7XG5cdFx0XHRcdHguZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbC53KSxcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2wuc3BhY2UpXG5cdFx0XHRcdH0pKVxuXHRcdFx0XHRkZWxldGUgeC5jb2xcblx0XHRcdH1cblx0XHRcdHJldHVybiB4XG5cdFx0YnJlYWtcblx0XHQvL3BhcmFncmFwaCwgcFByXG5cdFx0Y2FzZSAnamMnOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnaW5kJzpcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+eFthXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b1NwYWNpbmcoeClcblx0XHRjYXNlICdwQmRyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5maWx0ZXIoYT0+YSE9JyQnKS5mb3JFYWNoKGE9PnZhbHVlW2FdPXRoaXMudG9Cb3JkZXIoeFthXVswXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHQvL2lubGluZSwgclByXG5cdFx0Y2FzZSAnckZvbnRzJzpcblx0XHRcdGxldCBhc2NpaT14Wydhc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnYXNjaWlUaGVtZSddKVxuXHRcdFx0bGV0IGFzaWE9eFsnZWFzdEFzaWEnXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2Vhc3RBc2lhVGhlbWUnXSlcblxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ2xhbmcnOlxuXHRcdGNhc2UgJ3ZlcnRBbGlnbic6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd2YWwnXSkvMilcblx0XHRjYXNlICd3Jzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMTAwLjBcblx0XHRjYXNlICdrZXJuJzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMlxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdGNhc2UgJ3Bvc2l0aW9uJzpcblx0XHRcdHJldHVybiB0aGlzLmR4YTJQeCh4LnZhbClcblx0XHRjYXNlICdpJzpcblx0XHRjYXNlICd2YW5pc2gnOlxuXHRcdGNhc2UgJ3UnOlxuXHRcdGNhc2UgJ3NtYWxsQ2Fwcyc6XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdGNhc2UgJ2hpZ2h0bGlnaHQnOlxuXHRcdGNhc2UgJ2NvbG9yJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC52YWwgfHwgdGhpcy5vZmZpY2VEb2N1bWVudC50aGVtZUNvbG9yLmdldCh4LnRoZW1lQ29sb3IpKVxuXHRcdGNhc2UgJ3UnOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdiZHgnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9Cb3JkZXIoeClcblx0XHQvL3RhYmxlXG5cdFx0Y2FzZSAndGJsTG9vayc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3RibEdyaWQnOlxuXHRcdFx0cmV0dXJuIG5vZGUuZ3JpZENvbC5tYXAoYT0+dGhpcy5keGEyUHgoYS4kLncpKVxuXHRcdGNhc2UgJ3RjQm9yZGVycyc6XG5cdFx0Y2FzZSAndGJsQm9yZGVycyc6XG5cdFx0XHRsZXQgdmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xuXHRcdFx0XHR2YWx1ZVthXT10aGlzLnRvQm9yZGVyKG5vZGVbYV1bMF0uJClcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0Y2FzZSAnc2hkJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5maWxsKVxuXHRcdC8vZHJhd2luZ1xuXHRcdGNhc2UgJ2V4dGVudCc6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuY20yUHgoeC5jeCksaGVpZ2h0OnRoaXMuY20yUHgoeC5jeSl9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXG5cdGFzVG9nZ2xlKHgpe1xuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAtMVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKVxuXHRcdH1cblx0fVxuXG5cdHRvU3BhY2luZyh4KXtcblx0XHR2YXIgcj14LCBvPXt9XG5cblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlTGluZXMpKVxuXHRcdGVsc2UgaWYoci5iZWZvcmUpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlcikpXG5cblx0XHRpZighci5saW5lKVxuXHRcdFx0cmV0dXJuIG9cblxuXHRcdHN3aXRjaCh4LmxpbmVSdWxlKXtcblx0XHRjYXNlICdhdExlYXN0Jzpcblx0XHRjYXNlICdleGFjdCc6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9dGhpcy5keGEyUHgoKHgubGluZSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXG5cdFx0fVxuXHRcdG8ubGluZVJ1bGU9eC5saW5lUnVsZVxuXHRcdHJldHVybiBvXG5cdH1cblxuXHR0b0JvcmRlcih4KXtcblx0XHR2YXIgYm9yZGVyPXhcblx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0cmV0dXJuIGJvcmRlclxuXHR9XG5cdFxuXHR0b0hlYWRlckZvb3Rlcihub2RlLHRhZyl7XG5cdFx0Y29uc3QgeyQ6e2lkLCB0eXBlfX09bm9kZVxuXHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5vZmZpY2VEb2N1bWVudC5yZWxzW2lkXS50YXJnZXQsIHRoaXMsIHR5cGUpXG5cdFx0cmV0dXJuIHBhcnQucGFyc2UoKVxuXHR9XG59XG4iXX0=