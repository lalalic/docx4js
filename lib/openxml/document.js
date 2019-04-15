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
			return this.pt2Px(parseInt(a) / 20.0);
		}
	}, {
		key: "emu2Px",
		value: function emu2Px(a) {
			return this.pt2Px(parseInt(a) / 12700);
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
		value: function asColor(v, transform) {
			if (!v || v.length == 0 || v == 'auto') return '#000000';
			v = v.split(' ')[0];
			var rgb = v.charAt(0) == '#' ? v : RGB.test(v) ? '#' + v : v;
			if (transform) {
				var lumMod = transform.lumMod,
				    lumOff = transform.lumOff,
				    tint = transform.tint;

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
					return ("" + color.hex()).replace(/^0x/, "#");
				}
			}
			return rgb;
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
			    units = String(length).match(RE_LENGTH_UNIT)[2];

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
var RE_LENGTH_UNIT = /^(\d+)(\w)+$/;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZSIsImEiLCJwdDJQeCIsInBhcnNlSW50IiwicHQiLCJNYXRoIiwiY2VpbCIsImNtIiwidiIsInRyYW5zZm9ybSIsImxlbmd0aCIsInNwbGl0IiwicmdiIiwiY2hhckF0IiwiUkdCIiwidGVzdCIsImx1bU1vZCIsImx1bU9mZiIsInRpbnQiLCJjb2xvciIsInVuZGVmaW5lZCIsImxpZ2h0ZW4iLCJkYXJrZW4iLCJoZXgiLCJyZXBsYWNlIiwicGVyY2VudCIsIlIiLCJzdWJzdHJpbmciLCJHIiwiQiIsIlJSIiwidG9TdHJpbmciLCJHRyIsIkJCIiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidW5pdHMiLCJTdHJpbmciLCJtYXRjaCIsIlJFX0xFTkdUSF9VTklUIiwiZ2V0T2JqZWN0UGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhO0FBQUE7O0FBQUEsK0dBQ0hBLFNBREc7O0FBRVosUUFBS0MsSUFBTCxHQUFVLG1CQUFTLEVBQVQsUUFBVjtBQUNBLFFBQUtDLGNBQUwsR0FBb0IsSUFBSSxNQUFLQyxXQUFMLENBQWlCQyxjQUFyQixDQUFvQyxNQUFLSCxJQUFMLENBQVVJLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQXBDLFFBQXBCO0FBSFk7QUFJWjs7OzsyQkFTTztBQUFBOztBQUNQLFVBQU8sd0JBQUtILGNBQUwsRUFBb0JJLE1BQXBCLHdCQUE4Qk4sU0FBOUIsQ0FBUDtBQUNBOzs7MEJBRU07QUFBQTs7QUFDTixVQUFPLHlCQUFLRSxjQUFMLEVBQW9CSyxLQUFwQix5QkFBNkJQLFNBQTdCLENBQVA7QUFDQTs7O3lCQUVNUSxDLEVBQUU7QUFD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QUFxQjs7O3NCQUVqQjtBQUNqQixVQUFPLEtBQUtNLGFBQUwsQ0FBbUIscUJBQW5CLEVBQTBDLE9BQTFDLENBQVA7QUFDQTs7Ozs7O09BMkZNM0MsYzs7O0FBRVIsSUFBTWlCLE1BQUksdUJBQVY7QUFDQSxJQUFNeUIsaUJBQWUsY0FBckIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5tYWluPW5ldyBQYXJ0KFwiXCIsdGhpcylcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMubWFpbi5nZXRSZWxUYXJnZXQoXCJvZmZpY2VEb2N1bWVudFwiKSwgdGhpcylcblx0fVxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cblxuXHRnZXQgcHJvZHVjdCgpe3JldHVybiAnT2ZmaWNlIDIwMTAnfVxuXG5cdGdldCBjb250ZW50VHlwZXMoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPYmplY3RQYXJ0KFwiW0NvbnRlbnRfVHlwZXNdLnhtbFwiKShcIlR5cGVzXCIpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5yZW5kZXIoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRkeGEyUHgoYSl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoYSkvMjAuMClcblx0fVxuXG5cdGVtdTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8xMjcwMClcblx0fVxuXG5cdHB0MlB4KHB0KXtcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHB0Kjk2LzcyKVxuXHR9XG5cblx0Y20yUHgoY20pe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGNtKSoyOC4zNDY0NTY3LzM2MDAwMClcblx0fVxuXG5cdGFzQ29sb3IodiwgdHJhbnNmb3JtKXtcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXG5cdFx0XHRyZXR1cm4gJyMwMDAwMDAnXG5cdFx0dj12LnNwbGl0KCcgJylbMF1cblx0XHRjb25zdCByZ2I9di5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXG5cdFx0aWYodHJhbnNmb3JtKXtcblx0XHRcdGNvbnN0IHtsdW1Nb2QsbHVtT2ZmLHRpbnR9PXRyYW5zZm9ybVxuXHRcdFx0aWYobHVtTW9kfHxsdW1PZmZ8fHRpbnQpe1xuXHRcdCAgICAgICAgbGV0IGNvbG9yPUNvbG9yKHJnYilcblxuXHRcdCAgICAgICAgaWYodGludCE9dW5kZWZpbmVkKXtcblx0XHQgICAgICAgICAgICBjb2xvcj1jb2xvci5saWdodGVuKDEtdGludClcblx0XHQgICAgICAgIH1cblxuXHRcdCAgICAgICAgaWYobHVtTW9kIT11bmRlZmluZWQpe1xuXHRcdCAgICAgICAgICAgIGNvbG9yPWNvbG9yLmxpZ2h0ZW4obHVtTW9kKVxuXHRcdCAgICAgICAgfVxuXG5cdFx0ICAgICAgICBpZihsdW1PZmYhPXVuZGVmaW5lZCl7XG5cdFx0ICAgICAgICAgICAgY29sb3I9Y29sb3IuZGFya2VuKGx1bU9mZilcblx0XHQgICAgICAgIH1cblx0XHQgICAgICAgIHJldHVybiBgJHtjb2xvci5oZXgoKX1gLnJlcGxhY2UoL14weC8sXCIjXCIpXG5cdFx0ICAgIH1cblx0XHR9XG5cdFx0cmV0dXJuIHJnYlxuXHR9XG5cblx0c2hhZGVDb2xvcihjb2xvciwgcGVyY2VudCkge1xuXHRcdGlmKCFSR0IudGVzdChjb2xvcikpXG5cdFx0XHRyZXR1cm4gY29sb3Jcblx0XHR2YXIgUiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygxLDMpLDE2KTtcblx0XHR2YXIgRyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLDUpLDE2KTtcblx0XHR2YXIgQiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg1LDcpLDE2KTtcblxuXHRcdFIgPSBwYXJzZUludChSICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRHID0gcGFyc2VJbnQoRyAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cdFx0QiA9IHBhcnNlSW50KEIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXG5cdFx0UiA9IChSPDI1NSk/UjoyNTU7XG5cdFx0RyA9IChHPDI1NSk/RzoyNTU7XG5cdFx0QiA9IChCPDI1NSk/QjoyNTU7XG5cblx0XHR2YXIgUlIgPSAoKFIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrUi50b1N0cmluZygxNik6Ui50b1N0cmluZygxNikpO1xuXHRcdHZhciBHRyA9ICgoRy50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitHLnRvU3RyaW5nKDE2KTpHLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEJCID0gKChCLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0IudG9TdHJpbmcoMTYpOkIudG9TdHJpbmcoMTYpKTtcblxuXHRcdHJldHVybiBcIiNcIitSUitHRytCQjtcblx0fVxuXG5cdHRvUHgobGVuZ3RoKSB7XG5cdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChsZW5ndGgpLFxuXHRcdFx0dW5pdHMgPSBTdHJpbmcobGVuZ3RoKS5tYXRjaChSRV9MRU5HVEhfVU5JVClbMl07XG5cblx0XHRzd2l0Y2ggKHVuaXRzKSB7XG5cdFx0XHRjYXNlICdlbScgOiByZXR1cm4gdmFsdWUgKiAxNjtcblx0XHRcdGNhc2UgJ3JlbSc6IHJldHVybiB2YWx1ZSAqIDE2O1xuXHRcdFx0Y2FzZSAnY20nIDogcmV0dXJuIHZhbHVlICogOTYgLyAyLjU0O1xuXHRcdFx0Y2FzZSAnbW0nIDogcmV0dXJuIHZhbHVlICogOTYgLyAyLjU0IC8gMTA7XG5cdFx0XHRjYXNlICdpbicgOiByZXR1cm4gdmFsdWUgKiA5Njtcblx0XHRcdGNhc2UgJ3B0JyA6IHJldHVybiB2YWx1ZSAqIDcyO1xuXHRcdFx0Y2FzZSAncGMnIDogcmV0dXJuIHZhbHVlICogNzIgLyAxMjtcblx0XHRcdGRlZmF1bHQgICA6IHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9UGFydFxufVxuY29uc3QgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xuY29uc3QgUkVfTEVOR1RIX1VOSVQ9L14oXFxkKykoXFx3KSskL1xuIl19