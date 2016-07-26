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

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

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
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name;
			var directStyle = node.attributes.directStyle;
			var children = node.children;

			var tag = name.split(':').pop();
			switch (tag) {
				case "p":
					if (directStyle && directStyle['numPr']) tag = "list";
					break;

				case 'gridCol':
					return this.dxa2Px(node.attributes['w:w']);
				case 'tblGrid':
					return children;
				case 'tbl':
					var _children = _toArray(children);

					var tblGrid = _children[0];

					var rows = _children.slice(1);

					node.attributes.cols = tblGrid;
					node.children = rows;
			}

			return this.onCreateElement(node, tag);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FPZSxNQUFLO09BQ1gsU0FBUSxLQUFLLGNBQUwsQ0FBUixPQURXO09BRWIsT0FBMEMsS0FBMUMsS0FGYTtPQUVLLGNBQXdCLEtBQXBDLFdBQVksWUFGTDtPQUVtQixXQUFVLEtBQVYsU0FGbkI7O0FBR2xCLE9BQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUosQ0FIYztBQUlsQixXQUFPLEdBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxPQUFaLENBQWYsRUFDRixNQUFJLE1BQUosQ0FERDtBQUVELFdBSEE7O0FBREEsU0FNSyxTQUFMO0FBQ0MsWUFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBWixDQUFQLENBREQ7QUFOQSxTQVFLLFNBQUw7QUFDQyxZQUFPLFFBQVAsQ0FERDtBQVJBLFNBVUssS0FBTDs4QkFDMEIsVUFEMUI7O1NBQ1EsdUJBRFI7O1NBQ29CLDBCQURwQjs7QUFFQyxVQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsR0FBcUIsT0FBckIsQ0FGRDtBQUdDLFVBQUssUUFBTCxHQUFjLElBQWQsQ0FIRDtBQVZBLElBSmtCOztBQW9CbEIsVUFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsR0FBM0IsQ0FBUCxDQXBCa0I7Ozs7NkJBdUJSLE1BQU0sTUFBSztBQUNyQixVQUFPLEtBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixpQkFBM0IsOEVBQThELE1BQUssS0FBbkUsRUFBeUUsSUFBekUsQ0FBUCxDQURxQjs7OzsrQkFJVCxNQUFNLE1BQUs7OztPQUNkLElBQUcsS0FBTCxFQURnQjs7QUFFdkIsT0FBSSxjQUFKLENBRnVCO0FBR3ZCLFdBQU8s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O0FBMEJYLFVBQU8sQ0FBUCxDQTFCVzs7OzsyQkE2QkgsR0FBRTtBQUNWLE9BQUksU0FBTyxDQUFQLENBRE07QUFFVixVQUFPLEVBQVAsS0FBYyxPQUFPLEVBQVAsR0FBVSxPQUFPLEVBQVAsR0FBVSxDQUFWLENBQXhCLENBRlU7QUFHVixVQUFPLEtBQVAsS0FBaUIsT0FBTyxLQUFQLEdBQWEsS0FBSyxPQUFMLENBQWEsT0FBTyxLQUFQLENBQTFCLENBQWpCLENBSFU7QUFJVixVQUFPLE1BQVAsQ0FKVTs7OztzQkE5Sks7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7Ozs7OztPQUVUIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCBPZmZpY2VEb2N1bWVudCBmcm9tIFwiLi9vZmZpY2VEb2N1bWVudFwiXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1PZmZpY2VEb2N1bWVudFxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0Y29uc3Qge3N0eWxlc309dGhpcy5vZmZpY2VEb2N1bWVudFxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9LCBjaGlsZHJlbn09bm9kZVxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0c3dpdGNoKHRhZyl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlWydudW1QciddKVxuXHRcdFx0XHR0YWc9XCJsaXN0XCJcblx0XHRicmVha1xuXG5cdFx0Y2FzZSAnZ3JpZENvbCc6XG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgobm9kZS5hdHRyaWJ1dGVzWyd3OncnXSlcblx0XHRjYXNlICd0YmxHcmlkJzpcblx0XHRcdHJldHVybiBjaGlsZHJlblxuXHRcdGNhc2UgJ3RibCc6XG5cdFx0XHRjb25zdCBbdGJsR3JpZCwgLi4ucm93c109Y2hpbGRyZW5cblx0XHRcdG5vZGUuYXR0cmlidXRlcy5jb2xzPXRibEdyaWRcblx0XHRcdG5vZGUuY2hpbGRyZW49cm93c1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0YWcpXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShzdXBlci50b1Byb3BlcnR5KG5vZGUsdHlwZSksdHlwZSlcblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRjb25zdCB7JDp4fT1ub2RlXG5cdFx0bGV0IHZhbHVlXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdC8vc2VjdGlvbiwgc2VjdFByXG5cdFx0Y2FzZSAncGdTeic6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuZHhhMlB4KHhbJ3cnXSksIGhlaWdodDp0aGlzLmR4YTJQeCh4WydoJ10pfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGdNYXInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+dmFsdWVbYS5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnY29scyc6XG5cdFx0XHR4Lm51bSAmJiAoeC5udW09cGFyc2VJbnQoeC5udW0pKTtcblx0XHRcdHguc3BhY2UgJiYgKHguc3BhY2U9dGhpcy5keGEyUHgoeC5zcGFjZSkpO1xuXG5cdFx0XHRpZih4LmNvbCl7XG5cdFx0XHRcdHguZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbC53KSxcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2wuc3BhY2UpXG5cdFx0XHRcdH0pKVxuXHRcdFx0XHRkZWxldGUgeC5jb2xcblx0XHRcdH1cblx0XHRcdHJldHVybiB4XG5cdFx0YnJlYWtcblx0XHQvL3BhcmFncmFwaCwgcFByXG5cdFx0Y2FzZSAnamMnOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnaW5kJzpcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+eFthXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b1NwYWNpbmcoeClcblx0XHRjYXNlICdwQmRyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5maWx0ZXIoYT0+YSE9JyQnKS5mb3JFYWNoKGE9PnZhbHVlW2FdPXRoaXMudG9Cb3JkZXIoeFthXVswXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHQvL2lubGluZSwgclByXG5cdFx0Y2FzZSAnckZvbnRzJzpcblx0XHRcdGxldCBhc2NpaT14Wydhc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnYXNjaWlUaGVtZSddKVxuXHRcdFx0bGV0IGFzaWE9eFsnZWFzdEFzaWEnXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2Vhc3RBc2lhVGhlbWUnXSlcblxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ2xhbmcnOlxuXHRcdGNhc2UgJ3ZlcnRBbGlnbic6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd2YWwnXSkvMilcblx0XHRjYXNlICd3Jzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMTAwLjBcblx0XHRjYXNlICdrZXJuJzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMlxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdGNhc2UgJ3Bvc2l0aW9uJzpcblx0XHRcdHJldHVybiB0aGlzLmR4YTJQeCh4LnZhbClcblx0XHRjYXNlICdpJzpcblx0XHRjYXNlICd2YW5pc2gnOlxuXHRcdGNhc2UgJ3UnOlxuXHRcdGNhc2UgJ3NtYWxsQ2Fwcyc6XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdGNhc2UgJ2hpZ2h0bGlnaHQnOlxuXHRcdGNhc2UgJ2NvbG9yJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC52YWwgfHwgdGhpcy5vZmZpY2VEb2N1bWVudC50aGVtZUNvbG9yLmdldCh4LnRoZW1lQ29sb3IpKVxuXHRcdGNhc2UgJ3UnOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdiZHgnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9Cb3JkZXIoeClcblx0XHQvL3RhYmxlXG5cdFx0Y2FzZSAndGJsTG9vayc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3RibEdyaWQnOlxuXHRcdFx0cmV0dXJuIG5vZGUuZ3JpZENvbC5tYXAoYT0+dGhpcy5keGEyUHgoYS4kLncpKVxuXHRcdGNhc2UgJ3RjQm9yZGVycyc6XG5cdFx0Y2FzZSAndGJsQm9yZGVycyc6XG5cdFx0XHRsZXQgdmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xuXHRcdFx0XHR2YWx1ZVthXT10aGlzLnRvQm9yZGVyKG5vZGVbYV1bMF0uJClcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0Y2FzZSAnc2hkJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5maWxsKVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cdH1cblxuXHRhc1RvZ2dsZSh4KXtcblx0XHRpZih4PT11bmRlZmluZWQgfHwgeC52YWw9PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gLTFcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbClcblx0XHR9XG5cdH1cblxuXHR0b1NwYWNpbmcoeCl7XG5cdFx0dmFyIHI9eCwgbz17fVxuXG5cdFx0aWYoIXIuYmVmb3JlQXV0b3NwYWNpbmcgJiYgci5iZWZvcmVMaW5lcylcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZUxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlKSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXJMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmFmdGVyKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxuXG5cdFx0aWYoIXIubGluZSlcblx0XHRcdHJldHVybiBvXG5cblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XG5cdFx0Y2FzZSAnYXRMZWFzdCc6XG5cdFx0Y2FzZSAnZXhhY3QnOlxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMuZHhhMlB4KCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cblx0dG9Cb3JkZXIoeCl7XG5cdFx0dmFyIGJvcmRlcj14XG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdHJldHVybiBib3JkZXJcblx0fVxufVxuIl19