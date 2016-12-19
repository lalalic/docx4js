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

			return (_officeDocument = this.officeDocument).render.apply(_officeDocument, arguments);
		}
	}, {
		key: "parser",
		value: function parser() {
			var _officeDocument2;

			return (_officeDocument2 = this.officeDocument).parser.apply(_officeDocument2, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZXIiLCJSR0IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7O0FBR0MsbUJBQWE7QUFBQTs7QUFBQSxxSUFDSEEsU0FERzs7QUFFWixRQUFLQyxJQUFMLEdBQVUsbUJBQVMsRUFBVCxRQUFWO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtILElBQUwsQ0FBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQUtPO0FBQUE7O0FBQ1AsVUFBTyx3QkFBS0gsY0FBTCxFQUFvQkksTUFBcEIsd0JBQThCTixTQUE5QixDQUFQO0FBQ0E7OzsyQkFFTztBQUFBOztBQUNQLFVBQU8seUJBQUtFLGNBQUwsRUFBb0JLLE1BQXBCLHlCQUE4QlAsU0FBOUIsQ0FBUDtBQUNBOztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFaYTtBQUFDO0FBQVk7OztzQkFFWjtBQUFDLFVBQU8sYUFBUDtBQUFxQjs7Ozs7T0FtRDVCSSxjOzs7QUFFUixJQUFJSSxNQUFJLHVCQUFSIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcclxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLm1haW49bmV3IFBhcnQoXCJcIix0aGlzKVxyXG5cdFx0dGhpcy5vZmZpY2VEb2N1bWVudD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudCh0aGlzLm1haW4uZ2V0UmVsVGFyZ2V0KFwib2ZmaWNlRG9jdW1lbnRcIiksIHRoaXMpXHJcblx0fVxyXG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxyXG5cclxuXHRnZXQgcHJvZHVjdCgpe3JldHVybiAnT2ZmaWNlIDIwMTAnfVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnJlbmRlciguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRwYXJzZXIoKXtcclxuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnBhcnNlciguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuLypcclxuXHRkeGEyUHgoYSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxyXG5cdH1cclxuXHJcblx0cHQyUHgocHQpe1xyXG5cdFx0cmV0dXJuIE1hdGguY2VpbChwdCo5Ni83MilcclxuXHR9XHJcblxyXG5cdGNtMlB4KGNtKXtcclxuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGNtKSoyOC4zNDY0NTY3LzM2MDAwMClcclxuXHR9XHJcblxyXG5cdGFzQ29sb3Iodil7XHJcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXHJcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcclxuXHRcdHY9di5zcGxpdCgnICcpWzBdXHJcblx0XHRyZXR1cm4gdi5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXHJcblx0fVxyXG5cdHNoYWRlQ29sb3IoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRcdGlmKCFSR0IudGVzdChjb2xvcikpXHJcblx0XHRcdHJldHVybiBjb2xvclxyXG5cdFx0dmFyIFIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwzKSwxNik7XHJcblx0XHR2YXIgRyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLDUpLDE2KTtcclxuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xyXG5cclxuXHRcdFIgPSBwYXJzZUludChSICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHRcdEIgPSBwYXJzZUludChCICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHJcblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcclxuXHRcdEcgPSAoRzwyNTUpP0c6MjU1O1xyXG5cdFx0QiA9IChCPDI1NSk/QjoyNTU7XHJcblxyXG5cdFx0dmFyIFJSID0gKChSLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK1IudG9TdHJpbmcoMTYpOlIudG9TdHJpbmcoMTYpKTtcclxuXHRcdHZhciBHRyA9ICgoRy50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitHLnRvU3RyaW5nKDE2KTpHLnRvU3RyaW5nKDE2KSk7XHJcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xyXG5cclxuXHRcdHJldHVybiBcIiNcIitSUitHRytCQjtcclxuXHR9XHJcbiovXHJcblx0c3RhdGljIE9mZmljZURvY3VtZW50PVBhcnRcclxufVxyXG5sZXQgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xyXG4iXX0=