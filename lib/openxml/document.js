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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZSIsImEiLCJwdDJQeCIsInB0IiwiY20iLCJwYXJzZUludCIsInYiLCJ0cmFuc2Zvcm0iLCJsZW5ndGgiLCJzcGxpdCIsInJnYiIsImNoYXJBdCIsIlJHQiIsInRlc3QiLCJsdW1Nb2QiLCJsdW1PZmYiLCJ0aW50Iiwic2hhZGUiLCJjb2xvciIsInVuZGVmaW5lZCIsImxpZ2h0ZW4iLCJkYXJrZW4iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJoZXgiLCJyZXBsYWNlIiwidmFsdWUiLCJwYXJzZUZsb2F0IiwidW5pdHMiLCJTdHJpbmciLCJtYXRjaCIsIlJFX0xFTkdUSF9VTklUIiwiY20yUHgiLCJnZXRPYmplY3RQYXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7QUFBQTs7QUFBQSwrR0FDSEEsU0FERzs7QUFFWixRQUFLQyxJQUFMLEdBQVUsbUJBQVMsRUFBVCxRQUFWO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtILElBQUwsQ0FBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQVNPO0FBQUE7O0FBQ1AsVUFBTyx3QkFBS0gsY0FBTCxFQUFvQkksTUFBcEIsd0JBQThCTixTQUE5QixDQUFQO0FBQ0E7OzswQkFFTTtBQUFBOztBQUNOLFVBQU8seUJBQUtFLGNBQUwsRUFBb0JLLEtBQXBCLHlCQUE2QlAsU0FBN0IsQ0FBUDtBQUNBOzs7eUJBRU1RLEMsRUFBRTtBQUNSLFVBQU8sS0FBS0MsS0FBTCxDQUFXRCxJQUFFLElBQWIsQ0FB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QW1CLHFCQUFuQixFQUEwQyxPQUExQyxDQUFQO0FBQ0E7Ozs7OztPQTRFTXJDLGM7OztBQUVSLElBQU1lLE1BQUksdUJBQVY7QUFDQSxJQUFNb0IsaUJBQWUsZUFBckIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5tYWluPW5ldyBQYXJ0KFwiXCIsdGhpcylcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMubWFpbi5nZXRSZWxUYXJnZXQoXCJvZmZpY2VEb2N1bWVudFwiKSwgdGhpcylcblx0fVxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cblxuXHRnZXQgcHJvZHVjdCgpe3JldHVybiAnT2ZmaWNlIDIwMTAnfVxuXG5cdGdldCBjb250ZW50VHlwZXMoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRPYmplY3RQYXJ0KFwiW0NvbnRlbnRfVHlwZXNdLnhtbFwiKShcIlR5cGVzXCIpXG5cdH1cblxuXHRyZW5kZXIoKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5yZW5kZXIoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRkeGEyUHgoYSl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgoYS8yMC4wKVxuXHR9XG5cblx0ZW11MlB4KGEpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KGEvMTI3MDApXG5cdH1cblx0XG5cblx0cHQyUHgocHQpe1xuXHRcdHJldHVybiBwdCo5Ni83MlxuXHR9XG5cblx0Y20yUHgoY20pe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGNtKSoyOC4zNDY0NTY3KVxuXHR9XG5cblx0YXNDb2xvcih2LCB0cmFuc2Zvcm0pe1xuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxuXHRcdGNvbnN0IHJnYj12LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcblx0XHRpZih0cmFuc2Zvcm0pe1xuXHRcdFx0Y29uc3Qge2x1bU1vZCxsdW1PZmYsdGludCxzaGFkZX09dHJhbnNmb3JtXG5cdFx0XHRpZihsdW1Nb2R8fGx1bU9mZnx8dGludCl7XG5cdFx0ICAgICAgICBsZXQgY29sb3I9Q29sb3IocmdiKVxuXG5cdFx0ICAgICAgICBpZih0aW50IT11bmRlZmluZWQpe1xuXHRcdCAgICAgICAgICAgIGNvbG9yPWNvbG9yLmxpZ2h0ZW4oMS10aW50KVxuXHRcdCAgICAgICAgfVxuXG5cdFx0ICAgICAgICBpZihsdW1Nb2QhPXVuZGVmaW5lZCl7XG5cdFx0ICAgICAgICAgICAgY29sb3I9Y29sb3IubGlnaHRlbihsdW1Nb2QpXG5cdFx0ICAgICAgICB9XG5cblx0XHQgICAgICAgIGlmKGx1bU9mZiE9dW5kZWZpbmVkKXtcblx0XHQgICAgICAgICAgICBjb2xvcj1jb2xvci5kYXJrZW4obHVtT2ZmKVxuXHRcdCAgICAgICAgfVxuXG5cdFx0XHRcdGlmKHNoYWRlIT11bmRlZmluZWQpe1xuXHRcdFx0XHRcdGNvbG9yPWNvbG9yXG5cdFx0XHRcdFx0XHQucmVkKGNvbG9yLnJlZCgpKigxK3NoYWRlKSlcblx0XHRcdFx0XHRcdC5ncmVlbihjb2xvci5ncmVlbigpKigxK3NoYWRlKSlcblx0XHRcdFx0XHRcdC5ibHVlKGNvbG9yLmJsdWUoKSooMStzaGFkZSkpXG5cdFx0XHRcdH1cblxuXHRcdCAgICAgICAgcmV0dXJuIGAke2NvbG9yLmhleCgpfWAucmVwbGFjZSgvXjB4LyxcIiNcIilcblx0XHQgICAgfVxuXHRcdH1cblx0XHRyZXR1cm4gcmdiXG5cdH1cblx0XG5cdHRvUHgobGVuZ3RoKSB7XG5cdFx0dmFyIHZhbHVlID0gcGFyc2VGbG9hdChsZW5ndGgpLFxuXHRcdFx0dW5pdHMgPSBTdHJpbmcobGVuZ3RoKS5tYXRjaChSRV9MRU5HVEhfVU5JVClbMV07XG5cblx0XHRzd2l0Y2ggKHVuaXRzKSB7XG5cdFx0XHRjYXNlICdjbScgOiByZXR1cm4gdGhpcy5jbTJQeCh2YWx1ZSk7XG5cdFx0XHRjYXNlICdtbScgOiByZXR1cm4gdGhpcy5jbTJQeCh2YWx1ZSAvIDEwKTtcblx0XHRcdGNhc2UgJ2luJyA6IHJldHVybiB0aGlzLnB0MlB4KHZhbHVlICogNzIpO1xuXHRcdFx0Y2FzZSAncHQnIDogcmV0dXJuIHRoaXMucHQyUHgodmFsdWUpO1xuXHRcdFx0Y2FzZSAnZnQnIDogcmV0dXJuIHRoaXMucHQyUHgodmFsdWUqODY0KVxuXHRcdFx0ZGVmYXVsdCAgIDogcmV0dXJuIHZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XG59XG5jb25zdCBSR0I9LyhbYS1mQS1GMC05XXsyfT8pezN9Py87XG5jb25zdCBSRV9MRU5HVEhfVU5JVD0vXihbYS16QS1aXSspJC9cbiJdfQ==