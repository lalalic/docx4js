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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZW5kZXIiLCJwYXJzZXIiLCJSR0IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7QUFBQTs7QUFBQSwrR0FDSEEsU0FERzs7QUFFWixRQUFLQyxJQUFMLEdBQVUsbUJBQVMsRUFBVCxRQUFWO0FBQ0EsUUFBS0MsY0FBTCxHQUFvQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQW9DLE1BQUtILElBQUwsQ0FBVUksWUFBVixDQUF1QixnQkFBdkIsQ0FBcEMsUUFBcEI7QUFIWTtBQUlaOzs7OzJCQUtPO0FBQUE7O0FBQ1AsVUFBTyx3QkFBS0gsY0FBTCxFQUFvQkksTUFBcEIsd0JBQThCTixTQUE5QixDQUFQO0FBQ0E7OzsyQkFFTztBQUFBOztBQUNQLFVBQU8seUJBQUtFLGNBQUwsRUFBb0JLLE1BQXBCLHlCQUE4QlAsU0FBOUIsQ0FBUDtBQUNBOztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFaYTtBQUFDO0FBQVk7OztzQkFFWjtBQUFDLFVBQU8sYUFBUDtBQUFxQjs7Ozs7O09BbUQ1QkksYzs7O0FBRVIsSUFBSUksTUFBSSx1QkFBUiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXHJcbmltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5tYWluPW5ldyBQYXJ0KFwiXCIsdGhpcylcclxuXHRcdHRoaXMub2ZmaWNlRG9jdW1lbnQ9bmV3IHRoaXMuY29uc3RydWN0b3IuT2ZmaWNlRG9jdW1lbnQodGhpcy5tYWluLmdldFJlbFRhcmdldChcIm9mZmljZURvY3VtZW50XCIpLCB0aGlzKVxyXG5cdH1cclxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cclxuXHJcblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5yZW5kZXIoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0cGFyc2VyKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZXIoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcbi8qXHJcblx0ZHhhMlB4KGEpe1xyXG5cdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoYSkvMjAuMClcclxuXHR9XHJcblxyXG5cdHB0MlB4KHB0KXtcclxuXHRcdHJldHVybiBNYXRoLmNlaWwocHQqOTYvNzIpXHJcblx0fVxyXG5cclxuXHRjbTJQeChjbSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChjbSkqMjguMzQ2NDU2Ny8zNjAwMDApXHJcblx0fVxyXG5cclxuXHRhc0NvbG9yKHYpe1xyXG5cdFx0aWYoIXYgfHwgdi5sZW5ndGg9PTAgfHwgdj09J2F1dG8nKVxyXG5cdFx0XHRyZXR1cm4gJyMwMDAwMDAnXHJcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxyXG5cdFx0cmV0dXJuIHYuY2hhckF0KDApPT0nIycgPyB2IDogKFJHQi50ZXN0KHYpID8gJyMnK3YgOiB2KVxyXG5cdH1cclxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XHJcblx0XHRpZighUkdCLnRlc3QoY29sb3IpKVxyXG5cdFx0XHRyZXR1cm4gY29sb3JcclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xyXG5cdFx0dmFyIEcgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMyw1KSwxNik7XHJcblx0XHR2YXIgQiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg1LDcpLDE2KTtcclxuXHJcblx0XHRSID0gcGFyc2VJbnQoUiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblx0XHRHID0gcGFyc2VJbnQoRyAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XHJcblxyXG5cdFx0UiA9IChSPDI1NSk/UjoyNTU7XHJcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcclxuXHRcdEIgPSAoQjwyNTUpP0I6MjU1O1xyXG5cclxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XHJcblx0XHR2YXIgR0cgPSAoKEcudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrRy50b1N0cmluZygxNik6Ry50b1N0cmluZygxNikpO1xyXG5cdFx0dmFyIEJCID0gKChCLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0IudG9TdHJpbmcoMTYpOkIudG9TdHJpbmcoMTYpKTtcclxuXHJcblx0XHRyZXR1cm4gXCIjXCIrUlIrR0crQkI7XHJcblx0fVxyXG4qL1xyXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XHJcbn1cclxubGV0IFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcclxuIl19