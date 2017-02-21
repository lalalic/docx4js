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
		key: "vender",
		get: function get() {
			"Microsoft";
		}
	}, {
		key: "product",
		get: function get() {
			return 'Office 2010';
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _part2.default;
exports.default = _class;

var RGB = /([a-fA-F0-9]{2}?){3}?/;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZSIsImEiLCJwdDJQeCIsInBhcnNlSW50IiwicHQiLCJNYXRoIiwiY2VpbCIsImNtIiwidiIsImxlbmd0aCIsInNwbGl0IiwiY2hhckF0IiwiUkdCIiwidGVzdCIsImNvbG9yIiwicGVyY2VudCIsIlIiLCJzdWJzdHJpbmciLCJHIiwiQiIsIlJSIiwidG9TdHJpbmciLCJHRyIsIkJCIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQUdDLG1CQUFhO0FBQUE7O0FBQUEsK0dBQ0hBLFNBREc7O0FBRVosUUFBS0MsSUFBTCxHQUFVLG1CQUFTLEVBQVQsUUFBVjtBQUNBLFFBQUtDLGNBQUwsR0FBb0IsSUFBSSxNQUFLQyxXQUFMLENBQWlCQyxjQUFyQixDQUFvQyxNQUFLSCxJQUFMLENBQVVJLFlBQVYsQ0FBdUIsZ0JBQXZCLENBQXBDLFFBQXBCO0FBSFk7QUFJWjs7OzsyQkFLTztBQUFBOztBQUNQLFVBQU8sd0JBQUtILGNBQUwsRUFBb0JJLE1BQXBCLHdCQUE4Qk4sU0FBOUIsQ0FBUDtBQUNBOzs7MEJBRU07QUFBQTs7QUFDTixVQUFPLHlCQUFLRSxjQUFMLEVBQW9CSyxLQUFwQix5QkFBNkJQLFNBQTdCLENBQVA7QUFDQTs7O3lCQUVNUSxDLEVBQUU7QUFDUixVQUFPLEtBQUtDLEtBQUwsQ0FBV0MsU0FBU0YsQ0FBVCxJQUFZLElBQXZCLENBQVA7QUFDQTs7O3dCQUVLRyxFLEVBQUc7QUFDUixVQUFPQyxLQUFLQyxJQUFMLENBQVVGLEtBQUcsRUFBSCxHQUFNLEVBQWhCLENBQVA7QUFDQTs7O3dCQUVLRyxFLEVBQUc7QUFDUixVQUFPLEtBQUtMLEtBQUwsQ0FBV0MsU0FBU0ksRUFBVCxJQUFhLFVBQWIsR0FBd0IsTUFBbkMsQ0FBUDtBQUNBOzs7MEJBRU9DLEMsRUFBRTtBQUNULE9BQUcsQ0FBQ0EsQ0FBRCxJQUFNQSxFQUFFQyxNQUFGLElBQVUsQ0FBaEIsSUFBcUJELEtBQUcsTUFBM0IsRUFDQyxPQUFPLFNBQVA7QUFDREEsT0FBRUEsRUFBRUUsS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBQUY7QUFDQSxVQUFPRixFQUFFRyxNQUFGLENBQVMsQ0FBVCxLQUFhLEdBQWIsR0FBbUJILENBQW5CLEdBQXdCSSxJQUFJQyxJQUFKLENBQVNMLENBQVQsSUFBYyxNQUFJQSxDQUFsQixHQUFzQkEsQ0FBckQ7QUFDQTs7OzZCQUNVTSxLLEVBQU9DLE8sRUFBUztBQUMxQixPQUFHLENBQUNILElBQUlDLElBQUosQ0FBU0MsS0FBVCxDQUFKLEVBQ0MsT0FBT0EsS0FBUDtBQUNELE9BQUlFLElBQUliLFNBQVNXLE1BQU1HLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBVCxFQUE4QixFQUE5QixDQUFSO0FBQ0EsT0FBSUMsSUFBSWYsU0FBU1csTUFBTUcsU0FBTixDQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFULEVBQThCLEVBQTlCLENBQVI7QUFDQSxPQUFJRSxJQUFJaEIsU0FBU1csTUFBTUcsU0FBTixDQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFULEVBQThCLEVBQTlCLENBQVI7O0FBRUFELE9BQUliLFNBQVNhLEtBQUssTUFBTUQsT0FBWCxJQUFzQixHQUEvQixDQUFKO0FBQ0FHLE9BQUlmLFNBQVNlLEtBQUssTUFBTUgsT0FBWCxJQUFzQixHQUEvQixDQUFKO0FBQ0FJLE9BQUloQixTQUFTZ0IsS0FBSyxNQUFNSixPQUFYLElBQXNCLEdBQS9CLENBQUo7O0FBRUFDLE9BQUtBLElBQUUsR0FBSCxHQUFRQSxDQUFSLEdBQVUsR0FBZDtBQUNBRSxPQUFLQSxJQUFFLEdBQUgsR0FBUUEsQ0FBUixHQUFVLEdBQWQ7QUFDQUMsT0FBS0EsSUFBRSxHQUFILEdBQVFBLENBQVIsR0FBVSxHQUFkOztBQUVBLE9BQUlDLEtBQU9KLEVBQUVLLFFBQUYsQ0FBVyxFQUFYLEVBQWVaLE1BQWYsSUFBdUIsQ0FBeEIsR0FBMkIsTUFBSU8sRUFBRUssUUFBRixDQUFXLEVBQVgsQ0FBL0IsR0FBOENMLEVBQUVLLFFBQUYsQ0FBVyxFQUFYLENBQXhEO0FBQ0EsT0FBSUMsS0FBT0osRUFBRUcsUUFBRixDQUFXLEVBQVgsRUFBZVosTUFBZixJQUF1QixDQUF4QixHQUEyQixNQUFJUyxFQUFFRyxRQUFGLENBQVcsRUFBWCxDQUEvQixHQUE4Q0gsRUFBRUcsUUFBRixDQUFXLEVBQVgsQ0FBeEQ7QUFDQSxPQUFJRSxLQUFPSixFQUFFRSxRQUFGLENBQVcsRUFBWCxFQUFlWixNQUFmLElBQXVCLENBQXhCLEdBQTJCLE1BQUlVLEVBQUVFLFFBQUYsQ0FBVyxFQUFYLENBQS9CLEdBQThDRixFQUFFRSxRQUFGLENBQVcsRUFBWCxDQUF4RDs7QUFFQSxVQUFPLE1BQUlELEVBQUosR0FBT0UsRUFBUCxHQUFVQyxFQUFqQjtBQUNBOzs7c0JBbERXO0FBQUM7QUFBWTs7O3NCQUVaO0FBQUMsVUFBTyxhQUFQO0FBQXFCOzs7Ozs7T0FrRDVCMUIsYzs7O0FBRVIsSUFBSWUsTUFBSSx1QkFBUiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXHJcbmltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5tYWluPW5ldyBQYXJ0KFwiXCIsdGhpcylcclxuXHRcdHRoaXMub2ZmaWNlRG9jdW1lbnQ9bmV3IHRoaXMuY29uc3RydWN0b3IuT2ZmaWNlRG9jdW1lbnQodGhpcy5tYWluLmdldFJlbFRhcmdldChcIm9mZmljZURvY3VtZW50XCIpLCB0aGlzKVxyXG5cdH1cclxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cclxuXHJcblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5yZW5kZXIoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0cGFyc2UoKXtcclxuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdGR4YTJQeChhKXtcclxuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGEpLzIwLjApXHJcblx0fVxyXG5cclxuXHRwdDJQeChwdCl7XHJcblx0XHRyZXR1cm4gTWF0aC5jZWlsKHB0Kjk2LzcyKVxyXG5cdH1cclxuXHJcblx0Y20yUHgoY20pe1xyXG5cdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoY20pKjI4LjM0NjQ1NjcvMzYwMDAwKVxyXG5cdH1cclxuXHJcblx0YXNDb2xvcih2KXtcclxuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcclxuXHRcdFx0cmV0dXJuICcjMDAwMDAwJ1xyXG5cdFx0dj12LnNwbGl0KCcgJylbMF1cclxuXHRcdHJldHVybiB2LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcclxuXHR9XHJcblx0c2hhZGVDb2xvcihjb2xvciwgcGVyY2VudCkge1xyXG5cdFx0aWYoIVJHQi50ZXN0KGNvbG9yKSlcclxuXHRcdFx0cmV0dXJuIGNvbG9yXHJcblx0XHR2YXIgUiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygxLDMpLDE2KTtcclxuXHRcdHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsNSksMTYpO1xyXG5cdFx0dmFyIEIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoNSw3KSwxNik7XHJcblxyXG5cdFx0UiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG5cdFx0RyA9IHBhcnNlSW50KEcgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG5cdFx0QiA9IHBhcnNlSW50KEIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xyXG5cclxuXHRcdFIgPSAoUjwyNTUpP1I6MjU1O1xyXG5cdFx0RyA9IChHPDI1NSk/RzoyNTU7XHJcblx0XHRCID0gKEI8MjU1KT9COjI1NTtcclxuXHJcblx0XHR2YXIgUlIgPSAoKFIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrUi50b1N0cmluZygxNik6Ui50b1N0cmluZygxNikpO1xyXG5cdFx0dmFyIEdHID0gKChHLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0cudG9TdHJpbmcoMTYpOkcudG9TdHJpbmcoMTYpKTtcclxuXHRcdHZhciBCQiA9ICgoQi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitCLnRvU3RyaW5nKDE2KTpCLnRvU3RyaW5nKDE2KSk7XHJcblxyXG5cdFx0cmV0dXJuIFwiI1wiK1JSK0dHK0JCO1xyXG5cdH1cclxuXHJcblx0c3RhdGljIE9mZmljZURvY3VtZW50PVBhcnRcclxufVxyXG5sZXQgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xyXG4iXX0=