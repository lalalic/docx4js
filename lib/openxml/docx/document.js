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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1ksTUFBSztPQUNWLE9BQWEsS0FBYixLQURVO09BQ0wsU0FBUSxLQUFSLE9BREs7O0FBRWYsT0FBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZXO0FBR2YsT0FBRyw4RUFBb0IsVUFBcEIsSUFBa0MsT0FBSyxTQUFMLEVBQ3BDLE9BQU8sSUFBUCxDQUREOztBQUdBLE9BQUcsVUFBVSxPQUFPLElBQVAsSUFBZSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLE1BQThCLFFBQTlCLEVBQzNCLE9BQU8sSUFBUCxDQUREOztBQUdBLFVBQU8sS0FBUCxDQVRlOzs7O2dDQVlGLE1BQUs7T0FDWCxTQUFRLEtBQUssY0FBTCxDQUFSLE9BRFc7T0FFYixPQUFnQyxLQUFoQyxLQUZhO09BRUssY0FBYyxLQUExQixXQUFZLFlBRkw7O0FBR2xCLE9BQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FIYztBQUlsQixXQUFPLElBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxHQUFaLENBQWdCLFdBQWhCLEtBQThCLFNBQTlCLEVBQ2pCLE9BQUssTUFBTCxDQUREO0FBRUQsV0FIQTtBQURBLFNBS0ssUUFBTDtBQUNDLFNBQUksVUFBUSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FEYjtBQUVDLGFBQU8sUUFBUSxHQUFSLENBQVksbUJBQVosRUFBaUMsS0FBakMsQ0FBdUMsR0FBdkMsRUFBNEMsR0FBNUMsRUFBUDtBQUNBLFdBQUssU0FBTDtBQUNDLGNBQUssT0FBTCxDQUREO0FBRUMsV0FBSSxLQUFHLFFBQVEsR0FBUixDQUFZLHVDQUFa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RUFEZ0I7T0FDYixnQkFEYTtPQUNULG9CQURTOztBQUV2QixPQUFJLE9BQUssSUFBSSxZQUFKLENBQWlCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixFQUF6QixFQUE2QixNQUE3QixFQUFxQyxJQUF0RCxFQUE0RCxJQUE1RCxDQUFMLENBRm1CO0FBR3ZCLFVBQU8sS0FBSyxLQUFMLEVBQVAsQ0FIdUI7Ozs7c0JBM0xSO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRpc1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7bmFtZSxwYXJlbnR9PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdGlmKHN1cGVyLmlzUHJvcGVydHkoLi4uYXJndW1lbnRzKSB8fCB0YWc9PSd0YmxHcmlkJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX19PW5vZGVcblx0XHRsZXQgdHlwZT1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlLmdldCgncFByLm51bVByJykhPXVuZGVmaW5lZClcblx0XHRcdFx0dHlwZT1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImlubGluZVwiOlxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcblx0XHRcdHN3aXRjaChncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKCkpe1xuXHRcdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0XHRcdHR5cGU9XCJpbWFnZVwiXG5cdFx0XHRcdGxldCBpZD1ncmFwaGljLmdldChcImdyYXBoaWNEYXRhLnBpYy5ibGlwRmlsbC5ibGlwLiQuZW1iZWRcIilcblx0XHRcdFx0bm9kZS5hdHRyaWJ1dGVzPXtcblx0XHRcdFx0XHRleHRlbnQ6bm9kZS5hdHRyaWJ1dGVzLmV4dGVudCxcblx0XHRcdFx0XHRzcmM6YGRhdGE6aW1hZ2UvanBnO2Jhc2U2NCwke25ldyBCdWZmZXIodGhpcy5vZmZpY2VEb2N1bWVudC5nZXRSZWwoaWQpKS50b1N0cmluZygnYmFzZTY0Jyl9YFxuXHRcdFx0XHR9XG5cdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImRyYXdpbmdcIjpcblx0XHRcdHJldHVybiBub2RlLmNoaWxkcmVuWzBdXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSlcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKHN1cGVyLnRvUHJvcGVydHkobm9kZSx0eXBlKSx0eXBlKVxuXHR9XG5cblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdGNvbnN0IHskOnh9PW5vZGVcblx0XHRsZXQgdmFsdWVcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Ly9zZWN0aW9uLCBzZWN0UHJcblx0XHRjYXNlICdwZ1N6Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5keGEyUHgoeFsndyddKSwgaGVpZ2h0OnRoaXMuZHhhMlB4KHhbJ2gnXSl9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdwZ01hcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT52YWx1ZVthLnNwbGl0KCc6JykucG9wKCldPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0YnJlYWtcblx0XHRjYXNlICdjb2xzJzpcblx0XHRcdHgubnVtICYmICh4Lm51bT1wYXJzZUludCh4Lm51bSkpO1xuXHRcdFx0eC5zcGFjZSAmJiAoeC5zcGFjZT10aGlzLmR4YTJQeCh4LnNwYWNlKSk7XG5cblx0XHRcdGlmKHguY29sKXtcblx0XHRcdFx0eC5kYXRhPXguY29sLm1hcChjb2w9Pih7XG5cdFx0XHRcdFx0d2lkdGg6dGhpcy5keGEyUHgoY29sLncpLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbC5zcGFjZSlcblx0XHRcdFx0fSkpXG5cdFx0XHRcdGRlbGV0ZSB4LmNvbFxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHhcblx0XHRicmVha1xuXHRcdC8vcGFyYWdyYXBoLCBwUHJcblx0XHRjYXNlICdqYyc6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdpbmQnOlxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT54W2FdPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLnRvU3BhY2luZyh4KVxuXHRcdGNhc2UgJ3BCZHInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZpbHRlcihhPT5hIT0nJCcpLmZvckVhY2goYT0+dmFsdWVbYV09dGhpcy50b0JvcmRlcih4W2FdWzBdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdC8vaW5saW5lLCByUHJcblx0XHRjYXNlICdyRm9udHMnOlxuXHRcdFx0bGV0IGFzY2lpPXhbJ2FzY2lpJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4Wydhc2NpaVRoZW1lJ10pXG5cdFx0XHRsZXQgYXNpYT14WydlYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnZWFzdEFzaWFUaGVtZSddKVxuXG5cdFx0XHRpZihhc2NpaSB8fCBhc2lhKVxuXHRcdFx0XHRyZXR1cm4ge2FzY2lpLCBhc2lhfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnbGFuZyc6XG5cdFx0Y2FzZSAndmVydEFsaWduJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ3N6Jzpcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KHhbJ3ZhbCddKS8yKVxuXHRcdGNhc2UgJ3cnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8xMDAuMFxuXHRcdGNhc2UgJ2tlcm4nOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8yXG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0Y2FzZSAncG9zaXRpb24nOlxuXHRcdFx0cmV0dXJuIHRoaXMuZHhhMlB4KHgudmFsKVxuXHRcdGNhc2UgJ2knOlxuXHRcdGNhc2UgJ3ZhbmlzaCc6XG5cdFx0Y2FzZSAndSc6XG5cdFx0Y2FzZSAnc21hbGxDYXBzJzpcblx0XHRjYXNlICdiJzpcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0Y2FzZSAnaGlnaHRsaWdodCc6XG5cdFx0Y2FzZSAnY29sb3InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LnZhbCB8fCB0aGlzLm9mZmljZURvY3VtZW50LnRoZW1lQ29sb3IuZ2V0KHgudGhlbWVDb2xvcikpXG5cdFx0Y2FzZSAndSc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ2JkeCc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b0JvcmRlcih4KVxuXHRcdC8vdGFibGVcblx0XHRjYXNlICd0YmxMb29rJzpcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAndGJsR3JpZCc6XG5cdFx0XHRyZXR1cm4gbm9kZS5ncmlkQ29sLm1hcChhPT50aGlzLmR4YTJQeChhLiQudykpXG5cdFx0Y2FzZSAndGNCb3JkZXJzJzpcblx0XHRjYXNlICd0YmxCb3JkZXJzJzpcblx0XHRcdGxldCB2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMobm9kZSkuZm9yRWFjaChhPT57XG5cdFx0XHRcdHZhbHVlW2FdPXRoaXMudG9Cb3JkZXIobm9kZVthXVswXS4kKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRjYXNlICdzaGQnOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmZpbGwpXG5cdFx0Ly9kcmF3aW5nXG5cdFx0Y2FzZSAnZXh0ZW50Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5jbTJQeCh4LmN4KSxoZWlnaHQ6dGhpcy5jbTJQeCh4LmN5KX1cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eSguLi5hcmd1bWVudHMpXG5cdFx0fVxuXHR9XG5cblx0YXNUb2dnbGUoeCl7XG5cdFx0aWYoeD09dW5kZWZpbmVkIHx8IHgudmFsPT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuIC0xXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpXG5cdFx0fVxuXHR9XG5cblx0dG9TcGFjaW5nKHgpe1xuXHRcdHZhciByPXgsIG89e31cblxuXHRcdGlmKCFyLmJlZm9yZUF1dG9zcGFjaW5nICYmIHIuYmVmb3JlTGluZXMpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmVMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmJlZm9yZSlcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZSkpXG5cblx0XHRpZighci5hZnRlckF1dG9zcGFjaW5nICYmIHIuYWZ0ZXJMaW5lcylcblx0XHRcdG8uYm90dG9tPXRoaXMuZHhhMlB4KChyLmFmdGVyTGluZXMpKVxuXHRcdGVsc2UgaWYoci5hZnRlcilcblx0XHRcdG8uYm90dG9tPXRoaXMuZHhhMlB4KChyLmFmdGVyKSlcblxuXHRcdGlmKCFyLmxpbmUpXG5cdFx0XHRyZXR1cm4gb1xuXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xuXHRcdGNhc2UgJ2F0TGVhc3QnOlxuXHRcdGNhc2UgJ2V4YWN0Jzpcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLmR4YTJQeCgoeC5saW5lKSlcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnYXV0byc6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdG8ubGluZUhlaWdodD0ocGFyc2VJbnQoci5saW5lKSoxMDAvMjQwKSsnJSdcblx0XHR9XG5cdFx0by5saW5lUnVsZT14LmxpbmVSdWxlXG5cdFx0cmV0dXJuIG9cblx0fVxuXG5cdHRvQm9yZGVyKHgpe1xuXHRcdHZhciBib3JkZXI9eFxuXHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHRyZXR1cm4gYm9yZGVyXG5cdH1cblx0XG5cdHRvSGVhZGVyRm9vdGVyKG5vZGUsdGFnKXtcblx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1ub2RlXG5cdFx0bGV0IHBhcnQ9bmV3IEhlYWRlckZvb3Rlcih0aGlzLm9mZmljZURvY3VtZW50LnJlbHNbaWRdLnRhcmdldCwgdGhpcywgdHlwZSlcblx0XHRyZXR1cm4gcGFydC5wYXJzZSgpXG5cdH1cbn1cbiJdfQ==