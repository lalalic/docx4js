"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _xmlObject = require("../xmlObject");

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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		var rels = new _part2.default("", _this).rels;
		_this.rels = {};
		Object.keys(rels).forEach(function (id) {
			var rel = rels[id];
			_this.rels[rel.type] = rel.target;
		});
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.rels['officeDocument'], _this);
		return _this;
	}

	_createClass(_class, [{
		key: "createElement",
		value: function createElement(node) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(tag) {
			return tag.substr(-2) == 'Pr';
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			return node;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return (0, _xmlObject.getable)(this.onToProperty(node));
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this2 = this;

			var parts = this.parts;
			return this.getObjectPart("[Content_Types].xml").then(function (o) {
				return parts["[Content_Types].xml"] = o;
			}).then(function (a) {
				return _this2.officeDocument.parse();
			});
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
		get: function get() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLEtBQUk7QUFDZCxVQUFPLElBQUksTUFBSixDQUFXLENBQUMsQ0FBRCxDQUFYLElBQWdCLElBQWhCLENBRE87Ozs7K0JBSUYsTUFBTSxNQUFLO0FBQ3ZCLFVBQU8sSUFBUCxDQUR1Qjs7Ozs2QkFJYixNQUFLLE1BQUs7QUFDcEIsVUFBTyx3QkFBUSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBUixDQUFQLENBRG9COzs7OzBCQUlkOzs7QUFDTixPQUFNLFFBQU0sS0FBSyxLQUFMLENBRE47QUFFTixVQUFPLEtBQUssYUFBTCxDQUFtQixxQkFBbkIsRUFDTCxJQURLLENBQ0E7V0FBRyxNQUFNLHFCQUFOLElBQTZCLENBQTdCO0lBQUgsQ0FEQSxDQUVMLElBRkssQ0FFQTtXQUFHLE9BQUssY0FBTCxDQUFvQixLQUFwQjtJQUFILENBRlAsQ0FGTTs7Ozt5QkFPQSxHQUFFO0FBQ1IsVUFBTyxLQUFLLEtBQUwsQ0FBVyxTQUFTLENBQVQsSUFBWSxJQUFaLENBQWxCLENBRFE7Ozs7d0JBSUgsSUFBRztBQUNSLFVBQU8sS0FBSyxJQUFMLENBQVUsS0FBRyxFQUFILEdBQU0sRUFBTixDQUFqQixDQURROzs7OzBCQUlELEdBQUU7QUFDVCxPQUFHLENBQUMsQ0FBRCxJQUFNLEVBQUUsTUFBRixJQUFVLENBQVYsSUFBZSxLQUFHLE1BQUgsRUFDdkIsT0FBTyxTQUFQLENBREQ7QUFFQSxPQUFFLEVBQUUsS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBQUYsQ0FIUztBQUlULFVBQU8sRUFBRSxNQUFGLENBQVMsQ0FBVCxLQUFhLEdBQWIsR0FBbUIsQ0FBbkIsR0FBd0IsSUFBSSxJQUFKLENBQVMsQ0FBVCxJQUFjLE1BQUksQ0FBSixHQUFRLENBQXRCLENBSnRCOzs7OzZCQU1DLE9BQU8sU0FBUztBQUMxQixPQUFHLENBQUMsSUFBSSxJQUFKLENBQVMsS0FBVCxDQUFELEVBQ0YsT0FBTyxLQUFQLENBREQ7QUFFQSxPQUFJLElBQUksU0FBUyxNQUFNLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsQ0FBVCxFQUE4QixFQUE5QixDQUFKLENBSHNCO0FBSTFCLE9BQUksSUFBSSxTQUFTLE1BQU0sU0FBTixDQUFnQixDQUFoQixFQUFrQixDQUFsQixDQUFULEVBQThCLEVBQTlCLENBQUosQ0FKc0I7QUFLMUIsT0FBSSxJQUFJLFNBQVMsTUFBTSxTQUFOLENBQWdCLENBQWhCLEVBQWtCLENBQWxCLENBQVQsRUFBOEIsRUFBOUIsQ0FBSixDQUxzQjs7QUFPMUIsT0FBSSxTQUFTLEtBQUssTUFBTSxPQUFOLENBQUwsR0FBc0IsR0FBdEIsQ0FBYixDQVAwQjtBQVExQixPQUFJLFNBQVMsS0FBSyxNQUFNLE9BQU4sQ0FBTCxHQUFzQixHQUF0QixDQUFiLENBUjBCO0FBUzFCLE9BQUksU0FBUyxLQUFLLE1BQU0sT0FBTixDQUFMLEdBQXNCLEdBQXRCLENBQWIsQ0FUMEI7O0FBVzFCLE9BQUksQ0FBQyxHQUFFLEdBQUYsR0FBTyxDQUFSLEdBQVUsR0FBVixDQVhzQjtBQVkxQixPQUFJLENBQUMsR0FBRSxHQUFGLEdBQU8sQ0FBUixHQUFVLEdBQVYsQ0Fac0I7QUFhMUIsT0FBSSxDQUFDLEdBQUUsR0FBRixHQUFPLENBQVIsR0FBVSxHQUFWLENBYnNCOztBQWUxQixPQUFJLEtBQU0sQ0FBQyxDQUFFLFFBQUYsQ0FBVyxFQUFYLEVBQWUsTUFBZixJQUF1QixDQUF2QixHQUEwQixNQUFJLEVBQUUsUUFBRixDQUFXLEVBQVgsQ0FBSixHQUFtQixFQUFFLFFBQUYsQ0FBVyxFQUFYLENBQTlDLENBZmdCO0FBZ0IxQixPQUFJLEtBQU0sQ0FBQyxDQUFFLFFBQUYsQ0FBVyxFQUFYLEVBQWUsTUFBZixJQUF1QixDQUF2QixHQUEwQixNQUFJLEVBQUUsUUFBRixDQUFXLEVBQVgsQ0FBSixHQUFtQixFQUFFLFFBQUYsQ0FBVyxFQUFYLENBQTlDLENBaEJnQjtBQWlCMUIsT0FBSSxLQUFNLENBQUMsQ0FBRSxRQUFGLENBQVcsRUFBWCxFQUFlLE1BQWYsSUFBdUIsQ0FBdkIsR0FBMEIsTUFBSSxFQUFFLFFBQUYsQ0FBVyxFQUFYLENBQUosR0FBbUIsRUFBRSxRQUFGLENBQVcsRUFBWCxDQUE5QyxDQWpCZ0I7O0FBbUIxQixVQUFPLE1BQUksRUFBSixHQUFPLEVBQVAsR0FBVSxFQUFWLENBbkJtQjs7OztzQkF6Q2Y7OztzQkFFQztBQUFDLFVBQU8sYUFBUCxDQUFEOzs7Ozs7O09BNEROOzs7QUFFUixJQUFJLE1BQUksdUJBQUoiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi4veG1sT2JqZWN0XCJcbmltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz1uZXcgUGFydChcIlwiLHRoaXMpLnJlbHNcblx0XHR0aGlzLnJlbHM9e31cblx0XHRPYmplY3Qua2V5cyhyZWxzKS5mb3JFYWNoKGlkPT57XG5cdFx0XHRsZXQgcmVsPXJlbHNbaWRdXG5cdFx0XHR0aGlzLnJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXRcblx0XHR9KVxuXHRcdHRoaXMub2ZmaWNlRG9jdW1lbnQ9bmV3IHRoaXMuY29uc3RydWN0b3IuT2ZmaWNlRG9jdW1lbnQodGhpcy5yZWxzWydvZmZpY2VEb2N1bWVudCddLHRoaXMpXG5cdH1cblx0Z2V0IHZlbmRlcigpe1wiTWljcm9zb2Z0XCJ9XG5cblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cblxuXHRjcmVhdGVFbGVtZW50KG5vZGUpe1xuXHRcdHJldHVybiBub2RlXG5cdH1cblxuXHRpc1Byb3BlcnR5KHRhZyl7XG5cdFx0cmV0dXJuIHRhZy5zdWJzdHIoLTIpPT0nUHInXG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSx0eXBlKXtcblx0XHRyZXR1cm4gZ2V0YWJsZSh0aGlzLm9uVG9Qcm9wZXJ0eShub2RlKSlcblx0fVxuXG5cdHBhcnNlKCl7XG5cdFx0Y29uc3QgcGFydHM9dGhpcy5wYXJ0c1xuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpXG5cdFx0XHQudGhlbihvPT5wYXJ0c1tcIltDb250ZW50X1R5cGVzXS54bWxcIl09bylcblx0XHRcdC50aGVuKGE9PnRoaXMub2ZmaWNlRG9jdW1lbnQucGFyc2UoKSlcblx0fVxuXG5cdGR4YTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxuXHR9XG5cblx0cHQyUHgocHQpe1xuXHRcdHJldHVybiBNYXRoLmNlaWwocHQqOTYvOTIpXG5cdH1cblxuXHRhc0NvbG9yKHYpe1xuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxuXHRcdHJldHVybiB2LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcblx0fVxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XG5cdFx0aWYoIVJHQi50ZXN0KGNvbG9yKSlcblx0XHRcdHJldHVybiBjb2xvclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xuXHRcdHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsNSksMTYpO1xuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xuXG5cdFx0UiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcblx0XHRCID0gKEI8MjU1KT9COjI1NTtcblxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEdHID0gKChHLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0cudG9TdHJpbmcoMTYpOkcudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xuXG5cdFx0cmV0dXJuIFwiI1wiK1JSK0dHK0JCO1xuXHR9XG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XG59XG5sZXQgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xuIl19