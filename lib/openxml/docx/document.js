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
					if (directStyle && directStyle['numPr']) tag = "list";
					break;
			}

			return this.onCreateElement(node, tag);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			var pr = _get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node);

			switch (type) {
				case 'pPr':
					return new _styles2.default.paragraph(pr, this.officeDocument.styles, 'pStyle');
					break;
				case 'rPr':
					return new _styles2.default.character(pr, this.officeDocument.styles, 'rStyle');
					break;
				case 'tblPr':
					return new _styles2.default.table(pr, this.officeDocument.styles, 'tblStyle');
					break;
				default:
					return pr;
			}
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			var _this2 = this;

			var x = node.$;

			var value = void 0;
			switch (type) {
				case 'rFonts':
					var ascii = x['ascii'] || this.officeDocument.fontTheme.get(x['asciiTheme']);
					var asia = x['eastAsia'] || this.officeDocument.fontTheme.get(x['eastAsiaTheme']);

					if (ascii || asia) return { ascii: ascii, asia: asia };
					break;
				case 'sz':
					return this.pt2Px(parseInt(x['val']) / 2);
					break;
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
					value = { space: this.dxa2Px(x['space']) };
					if (x.col) {
						value.data = x.col.map(function (col) {
							return {
								width: _this2.dxa2Px(col['w']),
								space: _this2.dxa2Px(col['space'])
							};
						});
					}

					return value;
					break;

				default:
					return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).apply(this, arguments);
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
			return Math.ceil(pt * 96 / 92);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2UsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksT0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsSUFKa0I7O0FBV2xCLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLENBQVAsQ0FYa0I7Ozs7NkJBY1IsTUFBTSxNQUFLO0FBQ3JCLE9BQUksa0ZBQW9CLEtBQXBCLENBRGlCOztBQUdyQixXQUFPLElBQVA7QUFDQSxTQUFLLEtBQUw7QUFDQyxZQUFPLElBQUksaUJBQU8sU0FBUCxDQUFpQixFQUFyQixFQUF5QixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsUUFBckQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssS0FBTDtBQUNDLFlBQU8sSUFBSSxpQkFBTyxTQUFQLENBQWlCLEVBQXJCLEVBQXlCLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0QixRQUFyRCxDQUFQLENBREQ7QUFFQSxXQUZBO0FBSkEsU0FPSyxPQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPLEtBQVAsQ0FBYSxFQUFqQixFQUFxQixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBakQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQVBBO0FBV0MsWUFBTyxFQUFQLENBREQ7QUFWQSxJQUhxQjs7OzsrQkFrQlQsTUFBTSxNQUFLOzs7T0FDZCxJQUFHLEtBQUwsRUFEZ0I7O0FBRXZCLE9BQUksY0FBSixDQUZ1QjtBQUd2QixXQUFPLElBQVA7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFJLFFBQU0sRUFBRSxPQUFGLEtBQVksS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsWUFBRixDQUFsQyxDQUFaLENBRFg7QUFFQyxTQUFJLE9BQUssRUFBRSxVQUFGLEtBQWUsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsZUFBRixDQUFsQyxDQUFmLENBRlY7O0FBSUMsU0FBRyxTQUFTLElBQVQsRUFDRixPQUFPLEVBQUMsWUFBRCxFQUFRLFVBQVIsRUFBUCxDQUREO0FBRUQsV0FOQTtBQURBLFNBUUssSUFBTDtBQUNDLFlBQU8sS0FBSyxLQUFMLENBQVcsU0FBUyxFQUFFLEtBQUYsQ0FBVCxJQUFtQixDQUFuQixDQUFsQixDQUREO0FBRUEsV0FGQTtBQVJBLFNBV0ssTUFBTDtBQUNDLFlBQU8sRUFBQyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFaLENBQU4sRUFBMkIsUUFBTyxLQUFLLE1BQUwsQ0FBWSxFQUFFLEdBQUYsQ0FBWixDQUFQLEVBQW5DLENBREQ7QUFFQSxXQUZBO0FBWEEsU0FjSyxPQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsT0FBZixDQUF1QjthQUFHLE1BQU0sRUFBRSxLQUFGLENBQVEsR0FBUixFQUFhLEdBQWIsRUFBTixJQUEwQixPQUFLLE1BQUwsQ0FBWSxFQUFFLENBQUYsQ0FBWixDQUExQjtNQUFILENBQXZCLENBRkQ7QUFHQyxZQUFPLEtBQVAsQ0FIRDtBQUlBLFdBSkE7QUFkQSxTQW1CSyxNQUFMO0FBQ0MsYUFBTSxFQUFDLE9BQU0sS0FBSyxNQUFMLENBQVksRUFBRSxPQUFGLENBQVosQ0FBTixFQUFQLENBREQ7QUFFQyxTQUFHLEVBQUUsR0FBRixFQUFNO0FBQ1IsWUFBTSxJQUFOLEdBQVcsRUFBRSxHQUFGLENBQU0sR0FBTixDQUFVO2NBQU07QUFDMUIsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLEdBQUosQ0FBWixDQUFOO0FBQ0EsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLE9BQUosQ0FBWixDQUFOOztPQUZvQixDQUFyQixDQURRO01BQVQ7O0FBT0EsWUFBTyxLQUFQLENBVEQ7QUFVQSxXQVZBOztBQW5CQTtBQWdDQyw0RkFBNkIsVUFBN0IsQ0FERDtBQS9CQSxJQUh1Qjs7Ozt5QkF1Q2pCLEdBQUU7QUFDUixVQUFPLEtBQUssS0FBTCxDQUFXLFNBQVMsQ0FBVCxJQUFZLElBQVosQ0FBbEIsQ0FEUTs7Ozt3QkFJSCxJQUFHO0FBQ1IsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFHLEVBQUgsR0FBTSxFQUFOLENBQWpCLENBRFE7Ozs7c0JBL0VPO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRjcmVhdGVFbGVtZW50KG5vZGUpe1xuXHRcdGNvbnN0IHtzdHlsZXN9PXRoaXMub2ZmaWNlRG9jdW1lbnRcblx0XHRsZXQge25hbWUsIGF0dHJpYnV0ZXM6e2RpcmVjdFN0eWxlfSwgY2hpbGRyZW59PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdHN3aXRjaCh0YWcpe1xuXHRcdGNhc2UgXCJwXCI6XG5cdFx0XHRpZihkaXJlY3RTdHlsZSAmJiBkaXJlY3RTdHlsZVsnbnVtUHInXSlcblx0XHRcdFx0dGFnPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdGFnKVxuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRsZXQgcHI9c3VwZXIudG9Qcm9wZXJ0eShub2RlKVxuXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ3BQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5wYXJhZ3JhcGgocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAncFN0eWxlJylcblx0XHRicmVha1xuXHRcdGNhc2UgJ3JQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5jaGFyYWN0ZXIocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAnclN0eWxlJylcblx0XHRicmVha1xuXHRcdGNhc2UgJ3RibFByJzpcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHByLCB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcywgJ3RibFN0eWxlJylcblx0XHRicmVha1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gcHJcblx0XHR9XG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0Y29uc3QgeyQ6eH09bm9kZVxuXHRcdGxldCB2YWx1ZVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdyRm9udHMnOlxuXHRcdFx0bGV0IGFzY2lpPXhbJ2FzY2lpJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4Wydhc2NpaVRoZW1lJ10pXG5cdFx0XHRsZXQgYXNpYT14WydlYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnZWFzdEFzaWFUaGVtZSddKVxuXG5cdFx0XHRpZihhc2NpaSB8fCBhc2lhKVxuXHRcdFx0XHRyZXR1cm4ge2FzY2lpLCBhc2lhfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnc3onOlxuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoeFsndmFsJ10pLzIpXG5cdFx0YnJlYWtcblx0XHRjYXNlICdwZ1N6Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5keGEyUHgoeFsndyddKSwgaGVpZ2h0OnRoaXMuZHhhMlB4KHhbJ2gnXSl9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdwZ01hcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT52YWx1ZVthLnNwbGl0KCc6JykucG9wKCldPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0YnJlYWtcblx0XHRjYXNlICdjb2xzJzpcblx0XHRcdHZhbHVlPXtzcGFjZTp0aGlzLmR4YTJQeCh4WydzcGFjZSddKX1cblx0XHRcdGlmKHguY29sKXtcblx0XHRcdFx0dmFsdWUuZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbFsndyddKSxcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2xbJ3NwYWNlJ10pXG5cdFx0XHRcdH0pKVxuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXG5cdGR4YTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxuXHR9XG5cblx0cHQyUHgocHQpe1xuXHRcdHJldHVybiBNYXRoLmNlaWwocHQqOTYvOTIpXG5cdH1cbn1cbiJdfQ==