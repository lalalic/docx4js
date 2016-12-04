"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

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

var _xmlObject = require("../xmlObject");

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
	(0, _inherits3.default)(_class, _Base);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));

		var rels = new _part2.default("", _this).rels;
		_this.rels = {};
		(0, _keys2.default)(rels).forEach(function (id) {
			var rel = rels[id];
			_this.rels[rel.type] = rel.target;
		});
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.rels['officeDocument'], _this);
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "createElement",
		value: function createElement(node) {
			return this.onCreateElement(node);
		}
	}, {
		key: "onCreateElement",
		value: function onCreateElement(node, type) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(node) {
			return node.name.substr(-2) == 'Pr';
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			return node;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return (0, _xmlObject.getable)(this.onToProperty(node, type));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsInJlbHMiLCJmb3JFYWNoIiwicmVsIiwiaWQiLCJ0eXBlIiwidGFyZ2V0Iiwib2ZmaWNlRG9jdW1lbnQiLCJjb25zdHJ1Y3RvciIsIk9mZmljZURvY3VtZW50Iiwibm9kZSIsIm9uQ3JlYXRlRWxlbWVudCIsIm5hbWUiLCJzdWJzdHIiLCJvblRvUHJvcGVydHkiLCJwYXJ0cyIsImdldE9iamVjdFBhcnQiLCJ0aGVuIiwibyIsInBhcnNlIiwiYSIsInB0MlB4IiwicGFyc2VJbnQiLCJwdCIsIk1hdGgiLCJjZWlsIiwiY20iLCJ2IiwibGVuZ3RoIiwic3BsaXQiLCJjaGFyQXQiLCJSR0IiLCJ0ZXN0IiwiY29sb3IiLCJwZXJjZW50IiwiUiIsInN1YnN0cmluZyIsIkciLCJCIiwiUlIiLCJ0b1N0cmluZyIsIkdHIiwiQkIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7OztBQUdDLG1CQUFhO0FBQUE7O0FBQUEscUlBQ0hBLFNBREc7O0FBRVosTUFBSUMsT0FBSyxtQkFBUyxFQUFULFNBQWtCQSxJQUEzQjtBQUNBLFFBQUtBLElBQUwsR0FBVSxFQUFWO0FBQ0Esc0JBQVlBLElBQVosRUFBa0JDLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSUMsTUFBSUYsS0FBS0csRUFBTCxDQUFSO0FBQ0EsU0FBS0gsSUFBTCxDQUFVRSxJQUFJRSxJQUFkLElBQW9CRixJQUFJRyxNQUF4QjtBQUNBLEdBSEQ7QUFJQSxRQUFLQyxjQUFMLEdBQW9CLElBQUksTUFBS0MsV0FBTCxDQUFpQkMsY0FBckIsQ0FBb0MsTUFBS1IsSUFBTCxDQUFVLGdCQUFWLENBQXBDLFFBQXBCO0FBUlk7QUFTWjs7OztnQ0FLYVMsSSxFQUFLO0FBQ2xCLFVBQU8sS0FBS0MsZUFBTCxDQUFxQkQsSUFBckIsQ0FBUDtBQUNBOzs7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QUVHLFFBQUYsQ0FBVyxFQUFYLENBQS9CLEdBQThDSCxFQUFFRyxRQUFGLENBQVcsRUFBWCxDQUF4RDtBQUNBLE9BQUlFLEtBQU9KLEVBQUVFLFFBQUYsQ0FBVyxFQUFYLEVBQWVaLE1BQWYsSUFBdUIsQ0FBeEIsR0FBMkIsTUFBSVUsRUFBRUUsUUFBRixDQUFXLEVBQVgsQ0FBL0IsR0FBOENGLEVBQUVFLFFBQUYsQ0FBVyxFQUFYLENBQXhEOztBQUVBLFVBQU8sTUFBSUQsRUFBSixHQUFPRSxFQUFQLEdBQVVDLEVBQWpCO0FBQ0E7OztzQkFyRVcsQ0FBYTs7O3NCQUVaO0FBQUMsVUFBTyxhQUFQO0FBQXFCOzs7OztPQW9FNUJqQyxjOzs7QUFFUixJQUFJc0IsTUFBSSx1QkFBUiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi94bWxPYmplY3RcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHZhciByZWxzPW5ldyBQYXJ0KFwiXCIsdGhpcykucmVsc1xuXHRcdHRoaXMucmVscz17fVxuXHRcdE9iamVjdC5rZXlzKHJlbHMpLmZvckVhY2goaWQ9Pntcblx0XHRcdGxldCByZWw9cmVsc1tpZF1cblx0XHRcdHRoaXMucmVsc1tyZWwudHlwZV09cmVsLnRhcmdldFxuXHRcdH0pXG5cdFx0dGhpcy5vZmZpY2VEb2N1bWVudD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudCh0aGlzLnJlbHNbJ29mZmljZURvY3VtZW50J10sdGhpcylcblx0fVxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cblxuXHRnZXQgcHJvZHVjdCgpe3JldHVybiAnT2ZmaWNlIDIwMTAnfVxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0cmV0dXJuIHRoaXMub25DcmVhdGVFbGVtZW50KG5vZGUpXG5cdH1cblx0XG5cdG9uQ3JlYXRlRWxlbWVudChub2RlLHR5cGUpe1xuXHRcdHJldHVybiBub2RlXG5cdH1cblxuXHRpc1Byb3BlcnR5KG5vZGUpe1xuXHRcdHJldHVybiBub2RlLm5hbWUuc3Vic3RyKC0yKT09J1ByJ1xuXHR9XG5cblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdHJldHVybiBub2RlXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsdHlwZSl7XG5cdFx0cmV0dXJuIGdldGFibGUodGhpcy5vblRvUHJvcGVydHkobm9kZSx0eXBlKSlcblx0fVxuXG5cdHBhcnNlKCl7XG5cdFx0Y29uc3QgcGFydHM9dGhpcy5wYXJ0c1xuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpXG5cdFx0XHQudGhlbihvPT5wYXJ0c1tcIltDb250ZW50X1R5cGVzXS54bWxcIl09bylcblx0XHRcdC50aGVuKGE9PnRoaXMub2ZmaWNlRG9jdW1lbnQucGFyc2UoKSlcblx0fVxuXG5cdGR4YTJQeChhKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChhKS8yMC4wKVxuXHR9XG5cblx0cHQyUHgocHQpe1xuXHRcdHJldHVybiBNYXRoLmNlaWwocHQqOTYvNzIpXG5cdH1cblx0XG5cdGNtMlB4KGNtKXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludChjbSkqMjguMzQ2NDU2Ny8zNjAwMDApXG5cdH1cblxuXHRhc0NvbG9yKHYpe1xuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxuXHRcdHJldHVybiB2LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcblx0fVxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XG5cdFx0aWYoIVJHQi50ZXN0KGNvbG9yKSlcblx0XHRcdHJldHVybiBjb2xvclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xuXHRcdHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsNSksMTYpO1xuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xuXG5cdFx0UiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcblx0XHRCID0gKEI8MjU1KT9COjI1NTtcblxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEdHID0gKChHLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0cudG9TdHJpbmcoMTYpOkcudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xuXG5cdFx0cmV0dXJuIFwiI1wiK1JSK0dHK0JCO1xuXHR9XG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XG59XG5sZXQgUkdCPS8oW2EtZkEtRjAtOV17Mn0/KXszfT8vO1xuIl19