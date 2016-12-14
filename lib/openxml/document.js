"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

		_this.main = new _part2.default("", _this);
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.main.getRelTarget("officeDocument"), _this);
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "render",
		value: function render() {
			var _officeDocument;

			(_officeDocument = this.officeDocument).render.apply(_officeDocument, arguments);
		}

		/*
  	dxa2Px(a){
  		return this.pt2Px(parseInt(a)/20.0)
  	}
  
  	pt2Px(pt){
  		return Math.ceil(pt*96/72)
  	}
  
  	cm2Px(cm){
  		return this.pt2Px(parseInt(cm)*28.3464567/360000)
  	}
  
  	asColor(v){
  		if(!v || v.length==0 || v=='auto')
  			return '#000000'
  		v=v.split(' ')[0]
  		return v.charAt(0)=='#' ? v : (RGB.test(v) ? '#'+v : v)
  	}
  	shadeColor(color, percent) {
  		if(!RGB.test(color))
  			return color
  		var R = parseInt(color.substring(1,3),16);
  		var G = parseInt(color.substring(3,5),16);
  		var B = parseInt(color.substring(5,7),16);
  
  		R = parseInt(R * (100 + percent) / 100);
  		G = parseInt(G * (100 + percent) / 100);
  		B = parseInt(B * (100 + percent) / 100);
  
  		R = (R<255)?R:255;
  		G = (G<255)?G:255;
  		B = (B<255)?B:255;
  
  		var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  		var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  		var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
  
  		return "#"+RR+GG+BB;
  	}
  */

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJSR0IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7O0FBR0MsbUJBQWE7QUFBQTs7QUFBQSxxSUFDSEEsU0FERzs7QUFFWixRQUFLQyxJQUFMLEdBQVUsbUJBQVMsRUFBVCxRQUFWO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtILElBQUwsQ0FBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQUtPO0FBQUE7O0FBQ1AsMkJBQUtILGNBQUwsRUFBb0JJLE1BQXBCLHdCQUE4Qk4sU0FBOUI7QUFDQTs7QUFFRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBUmEsQ0FBYTs7O3NCQUVaO0FBQUMsVUFBTyxhQUFQO0FBQXFCOzs7OztPQStDNUJJLGM7OztBQUVSLElBQUlHLE1BQUksdUJBQVIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubWFpbj1uZXcgUGFydChcIlwiLHRoaXMpXG5cdFx0dGhpcy5vZmZpY2VEb2N1bWVudD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudCh0aGlzLm1haW4uZ2V0UmVsVGFyZ2V0KFwib2ZmaWNlRG9jdW1lbnRcIiksIHRoaXMpXG5cdH1cblx0Z2V0IHZlbmRlcigpe1wiTWljcm9zb2Z0XCJ9XG5cblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cblxuXHRyZW5kZXIoKXtcblx0XHR0aGlzLm9mZmljZURvY3VtZW50LnJlbmRlciguLi5hcmd1bWVudHMpXG5cdH1cblxuLypcblx0ZHhhMlB4KGEpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGEpLzIwLjApXG5cdH1cblxuXHRwdDJQeChwdCl7XG5cdFx0cmV0dXJuIE1hdGguY2VpbChwdCo5Ni83Milcblx0fVxuXG5cdGNtMlB4KGNtKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChjbSkqMjguMzQ2NDU2Ny8zNjAwMDApXG5cdH1cblxuXHRhc0NvbG9yKHYpe1xuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxuXHRcdHJldHVybiB2LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcblx0fVxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XG5cdFx0aWYoIVJHQi50ZXN0KGNvbG9yKSlcblx0XHRcdHJldHVybiBjb2xvclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xuXHRcdHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsNSksMTYpO1xuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xuXG5cdFx0UiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcblx0XHRCID0gKEI8MjU1KT9COjI1NTtcblxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEdHID0gKChHLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0cudG9TdHJpbmcoMTYpOkcudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xuXG5cdFx0cmV0dXJuIFwiI1wiK1JSK0dHK0JCO1xuXHR9XG4qL1xuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9UGFydFxufVxubGV0IFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbiJdfQ==