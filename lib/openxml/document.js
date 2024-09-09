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

		_this.main = _this.rels = new _part2.default("", _this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJyZWxzIiwib2ZmaWNlRG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsIk9mZmljZURvY3VtZW50IiwiZ2V0UmVsVGFyZ2V0IiwicmVuZGVyIiwicGFyc2UiLCJhIiwicHQyUHgiLCJwdCIsImNtIiwicGFyc2VJbnQiLCJ2IiwidHJhbnNmb3JtIiwibGVuZ3RoIiwic3BsaXQiLCJyZ2IiLCJjaGFyQXQiLCJSR0IiLCJ0ZXN0IiwibHVtTW9kIiwibHVtT2ZmIiwidGludCIsInNoYWRlIiwiY29sb3IiLCJ1bmRlZmluZWQiLCJsaWdodGVuIiwiZGFya2VuIiwicmVkIiwiZ3JlZW4iLCJibHVlIiwiaGV4IiwicmVwbGFjZSIsInZhbHVlIiwicGFyc2VGbG9hdCIsInVuaXRzIiwiU3RyaW5nIiwibWF0Y2giLCJSRV9MRU5HVEhfVU5JVCIsImNtMlB4IiwiZ2V0T2JqZWN0UGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhO0FBQUE7O0FBQUEsK0dBQ0hBLFNBREc7O0FBRVosUUFBS0MsSUFBTCxHQUFVLE1BQUtDLElBQUwsR0FBVSxtQkFBUyxFQUFULFFBQXBCO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtKLElBQUwsQ0FBVUssWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQVNPO0FBQUE7O0FBQ1AsVUFBTyx3QkFBS0gsY0FBTCxFQUFvQkksTUFBcEIsd0JBQThCUCxTQUE5QixDQUFQO0FBQ0E7OzswQkFFTTtBQUFBOztBQUNOLFVBQU8seUJBQUtHLGNBQUwsRUFBb0JLLEtBQXBCLHlCQUE2QlIsU0FBN0IsQ0FBUDtBQUNBOzs7eUJBRU1TLEMsRUFBRTtBQUNSLFVBQU8sS0FBS0Ms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QUFDakIsVUFBTyxLQUFLTyxhQUFMLENBQW1CLHFCQUFuQixFQUEwQyxPQUExQyxDQUFQO0FBQ0E7Ozs7OztPQTRFTXJDLGM7OztBQUVSLElBQU1lLE1BQUksdUJBQVY7QUFDQSxJQUFNb0IsaUJBQWUsZUFBckIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5tYWluPXRoaXMucmVscz1uZXcgUGFydChcIlwiLHRoaXMpXG5cdFx0dGhpcy5vZmZpY2VEb2N1bWVudD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudCh0aGlzLm1haW4uZ2V0UmVsVGFyZ2V0KFwib2ZmaWNlRG9jdW1lbnRcIiksIHRoaXMpXG5cdH1cblx0Z2V0IHZlbmRlcigpe1wiTWljcm9zb2Z0XCJ9XG5cblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cblxuXHRnZXQgY29udGVudFR5cGVzKCl7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0T2JqZWN0UGFydChcIltDb250ZW50X1R5cGVzXS54bWxcIikoXCJUeXBlc1wiKVxuXHR9XG5cblx0cmVuZGVyKCl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQucmVuZGVyKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHBhcnNlKCl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQucGFyc2UoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0ZHhhMlB4KGEpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KGEvMjAuMClcblx0fVxuXG5cdGVtdTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChhLzEyNzAwKVxuXHR9XG5cdFxuXG5cdHB0MlB4KHB0KXtcblx0XHRyZXR1cm4gcHQqOTYvNzJcblx0fVxuXG5cdGNtMlB4KGNtKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChjbSkqMjguMzQ2NDU2Nylcblx0fVxuXG5cdGFzQ29sb3IodiwgdHJhbnNmb3JtKXtcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXG5cdFx0XHRyZXR1cm4gJyMwMDAwMDAnXG5cdFx0dj12LnNwbGl0KCcgJylbMF1cblx0XHRjb25zdCByZ2I9di5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXG5cdFx0aWYodHJhbnNmb3JtKXtcblx0XHRcdGNvbnN0IHtsdW1Nb2QsbHVtT2ZmLHRpbnQsc2hhZGV9PXRyYW5zZm9ybVxuXHRcdFx0aWYobHVtTW9kfHxsdW1PZmZ8fHRpbnQpe1xuXHRcdCAgICAgICAgbGV0IGNvbG9yPUNvbG9yKHJnYilcblxuXHRcdCAgICAgICAgaWYodGludCE9dW5kZWZpbmVkKXtcblx0XHQgICAgICAgICAgICBjb2xvcj1jb2xvci5saWdodGVuKDEtdGludClcblx0XHQgICAgICAgIH1cblxuXHRcdCAgICAgICAgaWYobHVtTW9kIT11bmRlZmluZWQpe1xuXHRcdCAgICAgICAgICAgIGNvbG9yPWNvbG9yLmxpZ2h0ZW4obHVtTW9kKVxuXHRcdCAgICAgICAgfVxuXG5cdFx0ICAgICAgICBpZihsdW1PZmYhPXVuZGVmaW5lZCl7XG5cdFx0ICAgICAgICAgICAgY29sb3I9Y29sb3IuZGFya2VuKGx1bU9mZilcblx0XHQgICAgICAgIH1cblxuXHRcdFx0XHRpZihzaGFkZSE9dW5kZWZpbmVkKXtcblx0XHRcdFx0XHRjb2xvcj1jb2xvclxuXHRcdFx0XHRcdFx0LnJlZChjb2xvci5yZWQoKSooMStzaGFkZSkpXG5cdFx0XHRcdFx0XHQuZ3JlZW4oY29sb3IuZ3JlZW4oKSooMStzaGFkZSkpXG5cdFx0XHRcdFx0XHQuYmx1ZShjb2xvci5ibHVlKCkqKDErc2hhZGUpKVxuXHRcdFx0XHR9XG5cblx0XHQgICAgICAgIHJldHVybiBgJHtjb2xvci5oZXgoKX1gLnJlcGxhY2UoL14weC8sXCIjXCIpXG5cdFx0ICAgIH1cblx0XHR9XG5cdFx0cmV0dXJuIHJnYlxuXHR9XG5cdFxuXHR0b1B4KGxlbmd0aCkge1xuXHRcdHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobGVuZ3RoKSxcblx0XHRcdHVuaXRzID0gU3RyaW5nKGxlbmd0aCkubWF0Y2goUkVfTEVOR1RIX1VOSVQpWzFdO1xuXG5cdFx0c3dpdGNoICh1bml0cykge1xuXHRcdFx0Y2FzZSAnY20nIDogcmV0dXJuIHRoaXMuY20yUHgodmFsdWUpO1xuXHRcdFx0Y2FzZSAnbW0nIDogcmV0dXJuIHRoaXMuY20yUHgodmFsdWUgLyAxMCk7XG5cdFx0XHRjYXNlICdpbicgOiByZXR1cm4gdGhpcy5wdDJQeCh2YWx1ZSAqIDcyKTtcblx0XHRcdGNhc2UgJ3B0JyA6IHJldHVybiB0aGlzLnB0MlB4KHZhbHVlKTtcblx0XHRcdGNhc2UgJ2Z0JyA6IHJldHVybiB0aGlzLnB0MlB4KHZhbHVlKjg2NClcblx0XHRcdGRlZmF1bHQgICA6IHJldHVybiB2YWx1ZTtcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9UGFydFxufVxuY29uc3QgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xuY29uc3QgUkVfTEVOR1RIX1VOSVQ9L14oW2EtekEtWl0rKSQvXG4iXX0=