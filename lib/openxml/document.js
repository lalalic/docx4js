"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

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
			return this.pt2Px(parseInt(a) / 20.0);
		}
	}, {
		key: "pt2Px",
		value: function pt2Px(pt) {
			return Math.ceil(pt * 96 / 72);
		}
	}, {
		key: "cm2Px",
		value: function cm2Px(cm) {
			return this.pt2Px(parseInt(cm) * 28.3464567 / 360000);
		}
	}, {
		key: "asColor",
		value: function asColor(v) {
			if (!v || v.length == 0 || v == 'auto') return '#000000';
			v = v.split(' ')[0];
			return v.charAt(0) == '#' ? v : RGB.test(v) ? '#' + v : v;
		}
	}, {
		key: "shadeColor",
		value: function shadeColor(color, percent) {
			if (!RGB.test(color)) return color;
			var R = parseInt(color.substring(1, 3), 16);
			var G = parseInt(color.substring(3, 5), 16);
			var B = parseInt(color.substring(5, 7), 16);

			R = parseInt(R * (100 + percent) / 100);
			G = parseInt(G * (100 + percent) / 100);
			B = parseInt(B * (100 + percent) / 100);

			R = R < 255 ? R : 255;
			G = G < 255 ? G : 255;
			B = B < 255 ? B : 255;

			var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
			var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
			var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

			return "#" + RR + GG + BB;
		}
	}, {
		key: "toPx",
		value: function toPx(length) {
			var value = parseFloat(length),
			    units = String(length).match(RE_LENGTH_UNIT)[1];

			switch (units) {
				case 'em':
					return value * 16;
				case 'rem':
					return value * 16;
				case 'cm':
					return value * 96 / 2.54;
				case 'mm':
					return value * 96 / 2.54 / 10;
				case 'in':
					return value * 96;
				case 'pt':
					return value * 72;
				case 'pc':
					return value * 72 / 12;
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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZSIsImEiLCJwdDJQeCIsInBhcnNlSW50IiwicHQiLCJNYXRoIiwiY2VpbCIsImNtIiwidiIsImxlbmd0aCIsInNwbGl0IiwiY2hhckF0IiwiUkdCIiwidGVzdCIsImNvbG9yIiwicGVyY2VudCIsIlIiLCJzdWJzdHJpbmciLCJHIiwiQiIsIlJSIiwidG9TdHJpbmciLCJHRyIsIkJCIiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidW5pdHMiLCJTdHJpbmciLCJtYXRjaCIsIlJFX0xFTkdUSF9VTklUIiwiZ2V0T2JqZWN0UGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUFHQyxtQkFBYTtBQUFBOztBQUFBLCtHQUNIQSxTQURHOztBQUVaLFFBQUtDLElBQUwsR0FBVSxtQkFBUyxFQUFULFFBQVY7QUFDQSxRQUFLQyxjQUFMLEdBQW9CLElBQUksTUFBS0MsV0FBTCxDQUFpQkMsY0FBckIsQ0FBb0MsTUFBS0gsSUFBTCxDQUFVSSxZQUFWLENBQXVCLGdCQUF2QixDQUFwQyxRQUFwQjtBQUhZO0FBSVo7Ozs7MkJBU087QUFBQTs7QUFDUCxVQUFPLHdCQUFLSCxjQUFMLEVBQW9CSSxNQUFwQix3QkFBOEJOLFNBQTlCLENBQVA7QUFDQTs7OzBCQUVNO0FBQUE7O0FBQ04sVUFBTyx5QkFBS0UsY0FBTCxFQUFvQkssS0FBcEIseUJBQTZCUCxTQUE3QixDQUFQO0FBQ0E7Ozt5QkFFTVEsQyxFQUFFO0FBQ1IsVUFBTyxLQUFLQyxLQUFMLENBQVdDLFNBQVNGLENBQVQsSUFBWSxJQUF2QixDQUFQO0FBQ0E7Ozt3QkFFS0csRSxFQUFHO0FBQ1IsVUFBT0MsS0FBS0MsSUFBTCxDQUFV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QUFDWixTQUFLLElBQUw7QUFBWSxZQUFPQSxRQUFRLEVBQWY7QUFDWixTQUFLLElBQUw7QUFBWSxZQUFPQSxRQUFRLEVBQVIsR0FBYSxFQUFwQjtBQUNaO0FBQVksWUFBT0EsS0FBUDtBQVJiO0FBVUE7OztzQkF2RVc7QUFBQztBQUFZOzs7c0JBRVo7QUFBQyxVQUFPLGFBQVA7QUFBcUI7OztzQkFFakI7QUFDakIsVUFBTyxLQUFLTSxhQUFMLENBQW1CLHFCQUFuQixFQUEwQyxPQUExQyxDQUFQO0FBQ0E7Ozs7OztPQW1FTWpDLGM7OztBQUVSLElBQUllLE1BQUksdUJBQVIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxyXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XHJcblx0Y29uc3RydWN0b3IoKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMubWFpbj1uZXcgUGFydChcIlwiLHRoaXMpXHJcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMubWFpbi5nZXRSZWxUYXJnZXQoXCJvZmZpY2VEb2N1bWVudFwiKSwgdGhpcylcclxuXHR9XHJcblx0Z2V0IHZlbmRlcigpe1wiTWljcm9zb2Z0XCJ9XHJcblxyXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XHJcblxyXG5cdGdldCBjb250ZW50VHlwZXMoKXtcclxuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpKFwiVHlwZXNcIilcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQucmVuZGVyKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRkeGEyUHgoYSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxyXG5cdH1cclxuXHJcblx0cHQyUHgocHQpe1xyXG5cdFx0cmV0dXJuIE1hdGguY2VpbChwdCo5Ni83MilcclxuXHR9XHJcblxyXG5cdGNtMlB4KGNtKXtcclxuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGNtKSoyOC4zNDY0NTY3LzM2MDAwMClcclxuXHR9XHJcblxyXG5cdGFzQ29sb3Iodil7XHJcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXHJcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcclxuXHRcdHY9di5zcGxpdCgnICcpWzBdXHJcblx0XHRyZXR1cm4gdi5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXHJcblx0fVxyXG5cclxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XHJcblx0XHRpZighUkdCLnRlc3QoY29sb3IpKVxyXG5cdFx0XHRyZXR1cm4gY29sb3JcclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xyXG5cdFx0dmFyIEcgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMyw1KSwxNik7XHJcblx0XHR2YXIgQiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg1LDcpLDE2KTtcclxuXHJcblx0XHRSID0gcGFyc2VJbnQoUiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblx0XHRHID0gcGFyc2VJbnQoRyAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblxyXG5cdFx0UiA9IChSPDI1NSk/UjoyNTU7XHJcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcclxuXHRcdEIgPSAoQjwyNTUpP0I6MjU1O1xyXG5cclxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XHJcblx0XHR2YXIgR0cgPSAoKEcudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrRy50b1N0cmluZygxNik6Ry50b1N0cmluZygxNikpO1xyXG5cdFx0dmFyIEJCID0gKChCLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0IudG9TdHJpbmcoMTYpOkIudG9TdHJpbmcoMTYpKTtcclxuXHJcblx0XHRyZXR1cm4gXCIjXCIrUlIrR0crQkI7XHJcblx0fVxyXG5cdFxyXG5cdHRvUHgobGVuZ3RoKSB7XHJcblx0XHR2YXIgdmFsdWUgPSBwYXJzZUZsb2F0KGxlbmd0aCksXHJcblx0XHRcdHVuaXRzID0gU3RyaW5nKGxlbmd0aCkubWF0Y2goUkVfTEVOR1RIX1VOSVQpWzFdO1xyXG5cclxuXHRcdHN3aXRjaCAodW5pdHMpIHtcclxuXHRcdFx0Y2FzZSAnZW0nIDogcmV0dXJuIHZhbHVlICogMTY7XHJcblx0XHRcdGNhc2UgJ3JlbSc6IHJldHVybiB2YWx1ZSAqIDE2O1xyXG5cdFx0XHRjYXNlICdjbScgOiByZXR1cm4gdmFsdWUgKiA5NiAvIDIuNTQ7XHJcblx0XHRcdGNhc2UgJ21tJyA6IHJldHVybiB2YWx1ZSAqIDk2IC8gMi41NCAvIDEwO1xyXG5cdFx0XHRjYXNlICdpbicgOiByZXR1cm4gdmFsdWUgKiA5NjtcclxuXHRcdFx0Y2FzZSAncHQnIDogcmV0dXJuIHZhbHVlICogNzI7XHJcblx0XHRcdGNhc2UgJ3BjJyA6IHJldHVybiB2YWx1ZSAqIDcyIC8gMTI7XHJcblx0XHRcdGRlZmF1bHQgICA6IHJldHVybiB2YWx1ZTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XHJcbn1cclxubGV0IFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcclxuIl19