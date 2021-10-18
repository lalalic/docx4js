"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

var _color = require("color");

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

		_this.main = new _part2.default("", _this);
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.main.getRelTarget("officeDocument"), _this);
		return _this;
	}

	_createClass(_class, [{
		key: "render",
		value: function render() {
			var _officeDocument;

			return (_officeDocument = this.officeDocument).render.apply(_officeDocument, arguments);
		}
	}, {
		key: "parse",
		value: function parse() {
			var _officeDocument2;

			return (_officeDocument2 = this.officeDocument).parse.apply(_officeDocument2, arguments);
		}
	}, {
		key: "dxa2Px",
		value: function dxa2Px(a) {
			return this.pt2Px(a / 20.0);
		}
	}, {
		key: "emu2Px",
		value: function emu2Px(a) {
			return this.pt2Px(a / 12700);
		}
	}, {
		key: "pt2Px",
		value: function pt2Px(pt) {
			return pt * 96 / 72;
		}
	}, {
		key: "cm2Px",
		value: function cm2Px(cm) {
			return this.pt2Px(parseInt(cm) * 28.3464567);
		}
	}, {
		key: "asColor",
		value: function asColor(v, transform) {
			if (!v || v.length == 0 || v == 'auto') return '#000000';
			v = v.split(' ')[0];
			var rgb = v.charAt(0) == '#' ? v : RGB.test(v) ? '#' + v : v;
			if (transform) {
				var lumMod = transform.lumMod,
				    lumOff = transform.lumOff,
				    tint = transform.tint,
				    shade = transform.shade;

				if (lumMod || lumOff || tint) {
					var color = (0, _color2.default)(rgb);

					if (tint != undefined) {
						color = color.lighten(1 - tint);
					}

					if (lumMod != undefined) {
						color = color.lighten(lumMod);
					}

					if (lumOff != undefined) {
						color = color.darken(lumOff);
					}

					if (shade != undefined) {
						color = color.red(color.red() * (1 + shade)).green(color.green() * (1 + shade)).blue(color.blue() * (1 + shade));
					}

					return ("" + color.hex()).replace(/^0x/, "#");
				}
			}
			return rgb;
		}
	}, {
		key: "toPx",
		value: function toPx(length) {
			var value = parseFloat(length),
			    units = String(length).match(RE_LENGTH_UNIT)[1];

			switch (units) {
				case 'cm':
					return this.cm2Px(value);
				case 'mm':
					return this.cm2Px(value / 10);
				case 'in':
					return this.pt2Px(value * 72);
				case 'pt':
					return this.pt2Px(value);
				case 'ft':
					return this.pt2Px(value * 864);
				default:
					return value;
			}
		}
	}, {
		key: "vender",
		get: function get() {
			"Microsoft";
		}
	}, {
		key: "product",
		get: function get() {
			return 'Office 2010';
		}
	}, {
		key: "contentTypes",
		get: function get() {
			return this.getObjectPart("[Content_Types].xml")("Types");
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _part2.default;
exports.default = _class;

var RGB = /([a-fA-F0-9]{2}?){3}?/;
var RE_LENGTH_UNIT = /^([a-zA-Z]+)$/;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJQYXJ0Iiwib2ZmaWNlRG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsIk9mZmljZURvY3VtZW50IiwiZ2V0UmVsVGFyZ2V0IiwicmVuZGVyIiwicGFyc2UiLCJhIiwicHQyUHgiLCJwdCIsImNtIiwicGFyc2VJbnQiLCJ2IiwidHJhbnNmb3JtIiwibGVuZ3RoIiwic3BsaXQiLCJyZ2IiLCJjaGFyQXQiLCJSR0IiLCJ0ZXN0IiwibHVtTW9kIiwibHVtT2ZmIiwidGludCIsInNoYWRlIiwiY29sb3IiLCJ1bmRlZmluZWQiLCJsaWdodGVuIiwiZGFya2VuIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiaGV4IiwicmVwbGFjZSIsInZhbHVlIiwicGFyc2VGbG9hdCIsInVuaXRzIiwiU3RyaW5nIiwibWF0Y2giLCJSRV9MRU5HVEhfVU5JVCIsImNtMlB4IiwiZ2V0T2JqZWN0UGFydCIsIkJhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFHQyxtQkFBYTtBQUFBOztBQUFBLCtHQUNIQSxTQURHOztBQUVaLFFBQUtDLElBQUwsR0FBVSxJQUFJQyxjQUFKLENBQVMsRUFBVCxRQUFWO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtKLElBQUwsQ0FBVUssWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQVNPO0FBQUE7O0FBQ1AsVUFBTyx3QkFBS0gsY0FBTCxFQUFvQkksTUFBcEIsd0JBQThCUCxTQUE5QixDQUFQO0FBQ0E7OzswQkFFTTtBQUFBOztBQUNOLFVBQU8seUJBQUtHLGNBQUwsRUFBb0JLLEtBQXBCLHlCQUE2QlIsU0FBN0IsQ0FBUDtBQUNBOzs7eUJBRU1TLEMsRUFBRTtBQUNSLFVBQU8sS0FBS0Ms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QUFDakIsVUFBTyxLQUFLTyxhQUFMLENBQW1CLHFCQUFuQixFQUEwQyxPQUExQyxDQUFQO0FBQ0E7Ozs7RUFaMkJDLGtCOztPQXdGckJ0QyxjLEdBQWVILGM7OztBQUV2QixJQUFNa0IsTUFBSSx1QkFBVjtBQUNBLElBQU1vQixpQkFBZSxlQUFyQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXG5pbXBvcnQgQ29sb3IgZnJvbSBcImNvbG9yXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLm1haW49bmV3IFBhcnQoXCJcIix0aGlzKVxuXHRcdHRoaXMub2ZmaWNlRG9jdW1lbnQ9bmV3IHRoaXMuY29uc3RydWN0b3IuT2ZmaWNlRG9jdW1lbnQodGhpcy5tYWluLmdldFJlbFRhcmdldChcIm9mZmljZURvY3VtZW50XCIpLCB0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cblx0Z2V0IGNvbnRlbnRUeXBlcygpe1xuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpKFwiVHlwZXNcIilcblx0fVxuXG5cdHJlbmRlcigpe1xuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnJlbmRlciguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRwYXJzZSgpe1xuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnBhcnNlKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdGR4YTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChhLzIwLjApXG5cdH1cblxuXHRlbXUyUHgoYSl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgoYS8xMjcwMClcblx0fVxuXHRcblxuXHRwdDJQeChwdCl7XG5cdFx0cmV0dXJuIHB0Kjk2LzcyXG5cdH1cblxuXHRjbTJQeChjbSl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoY20pKjI4LjM0NjQ1NjcpXG5cdH1cblxuXHRhc0NvbG9yKHYsIHRyYW5zZm9ybSl7XG5cdFx0aWYoIXYgfHwgdi5sZW5ndGg9PTAgfHwgdj09J2F1dG8nKVxuXHRcdFx0cmV0dXJuICcjMDAwMDAwJ1xuXHRcdHY9di5zcGxpdCgnICcpWzBdXG5cdFx0Y29uc3QgcmdiPXYuY2hhckF0KDApPT0nIycgPyB2IDogKFJHQi50ZXN0KHYpID8gJyMnK3YgOiB2KVxuXHRcdGlmKHRyYW5zZm9ybSl7XG5cdFx0XHRjb25zdCB7bHVtTW9kLGx1bU9mZix0aW50LHNoYWRlfT10cmFuc2Zvcm1cblx0XHRcdGlmKGx1bU1vZHx8bHVtT2ZmfHx0aW50KXtcblx0XHQgICAgICAgIGxldCBjb2xvcj1Db2xvcihyZ2IpXG5cblx0XHQgICAgICAgIGlmKHRpbnQhPXVuZGVmaW5lZCl7XG5cdFx0ICAgICAgICAgICAgY29sb3I9Y29sb3IubGlnaHRlbigxLXRpbnQpXG5cdFx0ICAgICAgICB9XG5cblx0XHQgICAgICAgIGlmKGx1bU1vZCE9dW5kZWZpbmVkKXtcblx0XHQgICAgICAgICAgICBjb2xvcj1jb2xvci5saWdodGVuKGx1bU1vZClcblx0XHQgICAgICAgIH1cblxuXHRcdCAgICAgICAgaWYobHVtT2ZmIT11bmRlZmluZWQpe1xuXHRcdCAgICAgICAgICAgIGNvbG9yPWNvbG9yLmRhcmtlbihsdW1PZmYpXG5cdFx0ICAgICAgICB9XG5cblx0XHRcdFx0aWYoc2hhZGUhPXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0Y29sb3I9Y29sb3Jcblx0XHRcdFx0XHRcdC5yZWQoY29sb3IucmVkKCkqKDErc2hhZGUpKVxuXHRcdFx0XHRcdFx0LmdyZWVuKGNvbG9yLmdyZWVuKCkqKDErc2hhZGUpKVxuXHRcdFx0XHRcdFx0LmJsdWUoY29sb3IuYmx1ZSgpKigxK3NoYWRlKSlcblx0XHRcdFx0fVxuXG5cdFx0ICAgICAgICByZXR1cm4gYCR7Y29sb3IuaGV4KCl9YC5yZXBsYWNlKC9eMHgvLFwiI1wiKVxuXHRcdCAgICB9XG5cdFx0fVxuXHRcdHJldHVybiByZ2Jcblx0fVxuXHRcblx0dG9QeChsZW5ndGgpIHtcblx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KGxlbmd0aCksXG5cdFx0XHR1bml0cyA9IFN0cmluZyhsZW5ndGgpLm1hdGNoKFJFX0xFTkdUSF9VTklUKVsxXTtcblxuXHRcdHN3aXRjaCAodW5pdHMpIHtcblx0XHRcdGNhc2UgJ2NtJyA6IHJldHVybiB0aGlzLmNtMlB4KHZhbHVlKTtcblx0XHRcdGNhc2UgJ21tJyA6IHJldHVybiB0aGlzLmNtMlB4KHZhbHVlIC8gMTApO1xuXHRcdFx0Y2FzZSAnaW4nIDogcmV0dXJuIHRoaXMucHQyUHgodmFsdWUgKiA3Mik7XG5cdFx0XHRjYXNlICdwdCcgOiByZXR1cm4gdGhpcy5wdDJQeCh2YWx1ZSk7XG5cdFx0XHRjYXNlICdmdCcgOiByZXR1cm4gdGhpcy5wdDJQeCh2YWx1ZSo4NjQpXG5cdFx0XHRkZWZhdWx0ICAgOiByZXR1cm4gdmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PVBhcnRcbn1cbmNvbnN0IFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbmNvbnN0IFJFX0xFTkdUSF9VTklUPS9eKFthLXpBLVpdKykkL1xuIl19