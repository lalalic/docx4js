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
			var name = node.name;

			var pr = _get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node);

			switch (name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2UsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksU0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsSUFKa0I7O0FBV2xCLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLENBQVAsQ0FYa0I7Ozs7NkJBY1IsTUFBSztPQUNSLE9BQU0sS0FBTixLQURROztBQUVmLE9BQUksa0ZBQW9CLEtBQXBCLENBRlc7O0FBSWYsV0FBTyxJQUFQO0FBQ0EsU0FBSyxPQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPLFNBQVAsQ0FBaUIsRUFBckIsRUFBeUIsS0FBSyxjQUFMLENBQW9CLE1BQXBCLEVBQTRCLFFBQXJELENBQVAsQ0FERDtBQUVBLFdBRkE7QUFEQSxTQUlLLE9BQUw7QUFDQyxZQUFPLElBQUksaUJBQU8sU0FBUCxDQUFpQixFQUFyQixFQUF5QixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsUUFBckQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQUpBLFNBT0ssU0FBTDtBQUNDLFlBQU8sSUFBSSxpQkFBTyxLQUFQLENBQWEsRUFBakIsRUFBcUIsS0FBSyxjQUFMLENBQW9CLE1BQXBCLEVBQTRCLFVBQWpELENBQVAsQ0FERDtBQUVBLFdBRkE7QUFQQTtBQVdDLFlBQU8sRUFBUCxDQUREO0FBVkEsSUFKZTs7OzsrQkFtQkgsTUFBSzs7O09BQ1YsT0FBOEIsS0FBOUIsS0FEVTtPQUNPLElBQWEsS0FBeEIsV0FESTtPQUNVLFdBQVUsS0FBVixTQURWOztBQUVqQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKO09BQTJCLGNBQS9CLENBRmlCO0FBR2pCLFdBQU8sR0FBUDtBQUNBLFNBQUssUUFBTDtBQUNDLFNBQUksUUFBTSxFQUFFLFNBQUYsS0FBYyxLQUFLLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBOEIsR0FBOUIsQ0FBa0MsRUFBRSxjQUFGLENBQWxDLENBQWQsQ0FEWDtBQUVDLFNBQUksT0FBSyxFQUFFLFlBQUYsS0FBaUIsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsaUJBQUYsQ0FBbEMsQ0FBakIsQ0FGVjs7QUFJQyxTQUFHLFNBQVMsSUFBVCxFQUNGLE9BQU8sRUFBQyxZQUFELEVBQVEsVUFBUixFQUFQLENBREQ7QUFFRCxXQU5BO0FBREEsU0FRSyxJQUFMO0FBQ0MsWUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFTLEVBQUUsT0FBRixDQUFULElBQXFCLENBQXJCLENBQWxCLENBREQ7QUFFQSxXQUZBO0FBUkEsU0FXSyxNQUFMO0FBQ0MsWUFBTyxFQUFDLE9BQU0sS0FBSyxNQUFMLENBQVksRUFBRSxLQUFGLENBQVosQ0FBTixFQUE2QixRQUFPLEtBQUssTUFBTCxDQUFZLEVBQUUsS0FBRixDQUFaLENBQVAsRUFBckMsQ0FERDtBQUVBLFdBRkE7QUFYQSxTQWNLLE9BQUw7QUFDQyxhQUFNLEVBQU4sQ0FERDtBQUVDLFlBQU8sSUFBUCxDQUFZLENBQVosRUFBZSxPQUFmLENBQXVCO2FBQUcsTUFBTSxFQUFFLEtBQUYsQ0FBUSxHQUFSLEVBQWEsR0FBYixFQUFOLElBQTBCLE9BQUssTUFBTCxDQUFZLEVBQUUsQ0FBRixDQUFaLENBQTFCO01BQUgsQ0FBdkIsQ0FGRDtBQUdDLFlBQU8sS0FBUCxDQUhEO0FBSUEsV0FKQTtBQWRBLFNBbUJLLE1BQUw7QUFDQyxhQUFNLEVBQUMsT0FBTSxLQUFLLE1BQUwsQ0FBWSxFQUFFLFNBQUYsQ0FBWixDQUFOLEVBQVAsQ0FERDtBQUVDLFNBQUcsRUFBRSxHQUFGLEVBQU07QUFDUixZQUFNLElBQU4sR0FBVyxFQUFFLEdBQUYsQ0FBTSxHQUFOLENBQVU7Y0FBTTtBQUMxQixlQUFNLE9BQUssTUFBTCxDQUFZLElBQUksS0FBSixDQUFaLENBQU47QUFDQSxlQUFNLE9BQUssTUFBTCxDQUFZLElBQUksU0FBSixDQUFaLENBQU47O09BRm9CLENBQXJCLENBRFE7TUFBVDs7QUFPQSxZQUFPLEtBQVAsQ0FURDtBQVVBLFdBVkE7O0FBbkJBO0FBZ0NDLDJGQUEwQixLQUExQixDQUREO0FBL0JBLElBSGlCOzs7O3lCQXVDWCxHQUFFO0FBQ1IsVUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFTLENBQVQsSUFBWSxJQUFaLENBQWxCLENBRFE7Ozs7d0JBSUgsSUFBRztBQUNSLFVBQU8sS0FBRyxFQUFILEdBQU0sRUFBTixDQURDOzs7O3NCQWhGTztBQUFDLFVBQU8sTUFBUCxDQUFEOzs7Ozs7O09BRVQiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29mZmljZURvY3VtZW50XCJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PU9mZmljZURvY3VtZW50XG5cblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX0sIGNoaWxkcmVufT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godGFnKXtcblx0XHRjYXNlIFwicFwiOlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGVbJ3c6bnVtUHInXSlcblx0XHRcdFx0dGFnPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdGFnKVxuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlKXtcblx0XHRjb25zdCB7bmFtZX09bm9kZVxuXHRcdGxldCBwcj1zdXBlci50b1Byb3BlcnR5KG5vZGUpXG5cblx0XHRzd2l0Y2gobmFtZSl7XG5cdFx0Y2FzZSAndzpwUHInOlxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMucGFyYWdyYXBoKHByLCB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcywgJ3BTdHlsZScpXG5cdFx0YnJlYWtcblx0XHRjYXNlICd3OnJQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5jaGFyYWN0ZXIocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAnclN0eWxlJylcblx0XHRicmVha1xuXHRcdGNhc2UgJ3c6dGJsUHInOlxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAndGJsU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwclxuXHRcdH1cblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlKXtcblx0XHRjb25zdCB7bmFtZSwgYXR0cmlidXRlczp4LCBjaGlsZHJlbn09bm9kZVxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpLCB2YWx1ZVxuXHRcdHN3aXRjaCh0YWcpe1xuXHRcdGNhc2UgJ3JGb250cyc6XG5cdFx0XHRsZXQgYXNjaWk9eFsndzphc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsndzphc2NpaVRoZW1lJ10pXG5cdFx0XHRsZXQgYXNpYT14Wyd3OmVhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4Wyd3OmVhc3RBc2lhVGhlbWUnXSlcblxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3N6Jzpcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KHhbJ3c6dmFsJ10pLzIpXG5cdFx0YnJlYWtcblx0XHRjYXNlICdwZ1N6Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5keGEyUHgoeFsndzp3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsndzpoJ10pfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGdNYXInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+dmFsdWVbYS5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnY29scyc6XG5cdFx0XHR2YWx1ZT17c3BhY2U6dGhpcy5keGEyUHgoeFsndzpzcGFjZSddKX1cblx0XHRcdGlmKHguY29sKXtcblx0XHRcdFx0dmFsdWUuZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbFsndzp3J10pLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbFsndzpzcGFjZSddKVxuXHRcdFx0XHR9KSlcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0YnJlYWtcblxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KG5vZGUpXG5cdFx0fVxuXHR9XG5cblx0ZHhhMlB4KGEpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGEpLzIwLjApXG5cdH1cblxuXHRwdDJQeChwdCl7XG5cdFx0cmV0dXJuIHB0Kjk2LzkyXG5cdH1cbn1cbiJdfQ==