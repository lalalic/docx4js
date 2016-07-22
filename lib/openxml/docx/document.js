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
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name;
			var directStyle = node.attributes.directStyle;
			var children = node.children;

			var tag = name.split(':').pop();
			switch (tag) {
				case "p":
					if (directStyle && directStyle['w:numPr']) tag = "list";
					break;
			}

			return this.onCreateElement(node, tag);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node) {
			var pr = _get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node);

			switch (node.name) {
				case 'w:pPr':
					return new _styles2.default.paragraph(pr, this.officeDocument.styles, 'pStyle');
					break;
				case 'w:rPr':
					return new _styles2.default.character(pr, this.officeDocument.styles, 'rStyle');
					break;
				case 'w:tblPr':
					return new _styles2.default.table(pr, this.officeDocument.styles, 'tblStyle');
					break;
				default:
					return pr;
			}
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node) {
			var _this2 = this;

			var name = node.name;
			var x = node.attributes;
			var children = node.children;

			var tag = name.split(':').pop(),
			    value = void 0;
			switch (tag) {
				case 'rFonts':
					var ascii = x['w:ascii'] || this.officeDocument.fontTheme.get(x['w:asciiTheme']);
					var asia = x['w:eastAsia'] || this.officeDocument.fontTheme.get(x['w:eastAsiaTheme']);

					if (ascii || asia) return { ascii: ascii, asia: asia };
					break;
				case 'sz':
					return this.pt2Px(parseInt(x['w:val']) / 2);
					break;
				case 'pgSz':
					return { width: this.dxa2Px(x['w:w']), height: this.dxa2Px(x['w:h']) };
					break;
				case 'pgMar':
					value = {};
					Object.keys(x).forEach(function (a) {
						return value[a.split(':').pop()] = _this2.dxa2Px(x[a]);
					});
					return value;
					break;
				case 'cols':
					value = { space: this.dxa2Px(x['w:space']) };
					if (x.col) {
						value.data = x.col.map(function (col) {
							return {
								width: _this2.dxa2Px(col['w:w']),
								space: _this2.dxa2Px(col['w:space'])
							};
						});
					}

					return value;
					break;

				default:
					return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).call(this, node);
			}
		}
	}, {
		key: "dxa2Px",
		value: function dxa2Px(a) {
			return this.pt2Px(parseInt(a) / 20.0);
		}
	}, {
		key: "pt2Px",
		value: function pt2Px(pt) {
			return pt * 96 / 92;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2UsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksU0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsSUFKa0I7O0FBV2xCLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLENBQVAsQ0FYa0I7Ozs7NkJBY1IsTUFBSztBQUNmLE9BQUksa0ZBQW9CLEtBQXBCLENBRFc7O0FBR2YsV0FBTyxLQUFLLElBQUw7QUFDUCxTQUFLLE9BQUw7QUFDQyxZQUFPLElBQUksaUJBQU8sU0FBUCxDQUFpQixFQUFyQixFQUF5QixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsUUFBckQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssT0FBTDtBQUNDLFlBQU8sSUFBSSxpQkFBTyxTQUFQLENBQWlCLEVBQXJCLEVBQXlCLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0QixRQUFyRCxDQUFQLENBREQ7QUFFQSxXQUZBO0FBSkEsU0FPSyxTQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPLEtBQVAsQ0FBYSxFQUFqQixFQUFxQixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBakQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQVBBO0FBV0MsWUFBTyxFQUFQLENBREQ7QUFWQSxJQUhlOzs7OytCQWtCSCxNQUFLOzs7T0FDVixPQUE4QixLQUE5QixLQURVO09BQ08sSUFBYSxLQUF4QixXQURJO09BQ1UsV0FBVSxLQUFWLFNBRFY7O0FBRWpCLE9BQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUo7T0FBMkIsY0FBL0IsQ0FGaUI7QUFHakIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxRQUFMO0FBQ0MsU0FBSSxRQUFNLEVBQUUsU0FBRixLQUFjLEtBQUssY0FBTCxDQUFvQixTQUFwQixDQUE4QixHQUE5QixDQUFrQyxFQUFFLGNBQUYsQ0FBbEMsQ0FBZCxDQURYO0FBRUMsU0FBSSxPQUFLLEVBQUUsWUFBRixLQUFpQixLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsR0FBOUIsQ0FBa0MsRUFBRSxpQkFBRixDQUFsQyxDQUFqQixDQUZWOztBQUlDLFNBQUcsU0FBUyxJQUFULEVBQ0YsT0FBTyxFQUFDLFlBQUQsRUFBUSxVQUFSLEVBQVAsQ0FERDtBQUVELFdBTkE7QUFEQSxTQVFLLElBQUw7QUFDQyxZQUFPLEtBQUssS0FBTCxDQUFXLFNBQVMsRUFBRSxPQUFGLENBQVQsSUFBcUIsQ0FBckIsQ0FBbEIsQ0FERDtBQUVBLFdBRkE7QUFSQSxTQVdLLE1BQUw7QUFDQyxZQUFPLEVBQUMsT0FBTSxLQUFLLE1BQUwsQ0FBWSxFQUFFLEtBQUYsQ0FBWixDQUFOLEVBQTZCLFFBQU8sS0FBSyxNQUFMLENBQVksRUFBRSxLQUFGLENBQVosQ0FBUCxFQUFyQyxDQUREO0FBRUEsV0FGQTtBQVhBLFNBY0ssT0FBTDtBQUNDLGFBQU0sRUFBTixDQUREO0FBRUMsWUFBTyxJQUFQLENBQVksQ0FBWixFQUFlLE9BQWYsQ0FBdUI7YUFBRyxNQUFNLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxHQUFiLEVBQU4sSUFBMEIsT0FBSyxNQUFMLENBQVksRUFBRSxDQUFGLENBQVosQ0FBMUI7TUFBSCxDQUF2QixDQUZEO0FBR0MsWUFBTyxLQUFQLENBSEQ7QUFJQSxXQUpBO0FBZEEsU0FtQkssTUFBTDtBQUNDLGFBQU0sRUFBQyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQUUsU0FBRixDQUFaLENBQU4sRUFBUCxDQUREO0FBRUMsU0FBRyxFQUFFLEdBQUYsRUFBTTtBQUNSLFlBQU0sSUFBTixHQUFXLEVBQUUsR0FBRixDQUFNLEdBQU4sQ0FBVTtjQUFNO0FBQzFCLGVBQU0sT0FBSyxNQUFMLENBQVksSUFBSSxLQUFKLENBQVosQ0FBTjtBQUNBLGVBQU0sT0FBSyxNQUFMLENBQVksSUFBSSxTQUFKLENBQVosQ0FBTjs7T0FGb0IsQ0FBckIsQ0FEUTtNQUFUOztBQU9BLFlBQU8sS0FBUCxDQVREO0FBVUEsV0FWQTs7QUFuQkE7QUFnQ0MsMkZBQTBCLEtBQTFCLENBREQ7QUEvQkEsSUFIaUI7Ozs7eUJBdUNYLEdBQUU7QUFDUixVQUFPLEtBQUssS0FBTCxDQUFXLFNBQVMsQ0FBVCxJQUFZLElBQVosQ0FBbEIsQ0FEUTs7Ozt3QkFJSCxJQUFHO0FBQ1IsVUFBTyxLQUFHLEVBQUgsR0FBTSxFQUFOLENBREM7Ozs7c0JBL0VPO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblx0XG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1PZmZpY2VEb2N1bWVudFxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0Y29uc3Qge3N0eWxlc309dGhpcy5vZmZpY2VEb2N1bWVudFxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9LCBjaGlsZHJlbn09bm9kZVxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0c3dpdGNoKHRhZyl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlWyd3Om51bVByJ10pXG5cdFx0XHRcdHRhZz1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0fVxuXHRcdFxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0YWcpXG5cdH1cblx0XG5cdHRvUHJvcGVydHkobm9kZSl7XG5cdFx0bGV0IHByPXN1cGVyLnRvUHJvcGVydHkobm9kZSlcblx0XHRcblx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcblx0XHRjYXNlICd3OnBQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5wYXJhZ3JhcGgocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAncFN0eWxlJylcblx0XHRicmVha1xuXHRcdGNhc2UgJ3c6clByJzpcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLmNoYXJhY3RlcihwciwgdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMsICdyU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAndzp0YmxQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy50YWJsZShwciwgdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMsICd0YmxTdHlsZScpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByXG5cdFx0fVxuXHR9XG5cdFxuXHRvblRvUHJvcGVydHkobm9kZSl7XG5cdFx0Y29uc3Qge25hbWUsIGF0dHJpYnV0ZXM6eCwgY2hpbGRyZW59PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKSwgdmFsdWVcblx0XHRzd2l0Y2godGFnKXtcblx0XHRjYXNlICdyRm9udHMnOlxuXHRcdFx0bGV0IGFzY2lpPXhbJ3c6YXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ3c6YXNjaWlUaGVtZSddKVxuXHRcdFx0bGV0IGFzaWE9eFsndzplYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsndzplYXN0QXNpYVRoZW1lJ10pXG5cdFx0XHRcblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd3OnZhbCddKS8yKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGdTeic6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuZHhhMlB4KHhbJ3c6dyddKSwgaGVpZ2h0OnRoaXMuZHhhMlB4KHhbJ3c6aCddKX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXHRcdGNhc2UgJ2NvbHMnOlxuXHRcdFx0dmFsdWU9e3NwYWNlOnRoaXMuZHhhMlB4KHhbJ3c6c3BhY2UnXSl9XG5cdFx0XHRpZih4LmNvbCl7XHRcblx0XHRcdFx0dmFsdWUuZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbFsndzp3J10pLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbFsndzpzcGFjZSddKVxuXHRcdFx0XHR9KSlcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0YnJlYWtcblx0XHRcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eShub2RlKVxuXHRcdH1cdFx0XG5cdH1cblx0XG5cdGR4YTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxuXHR9XG5cdFxuXHRwdDJQeChwdCl7XG5cdFx0cmV0dXJuIHB0Kjk2LzkyXG5cdH1cbn1cbiJdfQ==