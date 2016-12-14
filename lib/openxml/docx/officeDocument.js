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

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _cheerio = require("cheerio");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Part) {
	(0, _inherits3.default)(_class, _Part);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "_init",
		value: function _init() {
			var _this2 = this;

			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});

			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			this.content = (0, _cheerio.load)(buffer, { xmlMode: true });
		}
	}, {
		key: "render",
		value: function render(container) {
			var render = function render(node) {
				var tagName = node.tagName,
				    childNodes = node.childNodes;

				return _react2.default.createElement(getComponent(tagName), { children: childNodes ? childNodes.map(function (a) {
						return render(a);
					}) : [] });
			};

			return render(this.content("w\\:document"));
		}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;


var getComponent = function getComponent(name) {
	var existing = getComponent[name];
	if (existing) return existing;
	var Type = function Type(props) {
		return null;
	};
	Type.displayName = name;
	return getComponent[name] = Type;
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwibmFtZSIsImFzTm9kZUJ1ZmZlciIsImNvbnRlbnQiLCJ4bWxNb2RlIiwiY29udGFpbmVyIiwicmVuZGVyIiwidGFnTmFtZSIsIm5vZGUiLCJjaGlsZE5vZGVzIiwiY3JlYXRlRWxlbWVudCIsImdldENvbXBvbmVudCIsImNoaWxkcmVuIiwibWFwIiwiYSIsImV4aXN0aW5nIiwiVHlwZSIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBR1E7QUFBQTs7QUFDTixRQUFLQSxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxXQUFLSCxJQUFMLElBQVcsT0FBS0ksWUFBTCxDQUFrQkwsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsQ0FBWDtBQUNBLElBSkQ7O0FBTUEsT0FBTUksU0FBTyxLQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUIsS0FBS0MsSUFBdEIsRUFBNEJDLFlBQTVCLEVBQWI7QUFDQSxRQUFLQyxPQUFMLEdBQWEsbUJBQU1MLE1BQU4sRUFBYSxFQUFDTSxTQUFRLElBQVQsRUFBYixDQUFiO0FBQ0E7Ozt5QkFFTUMsUyxFQUFVO0FBQ2hCLE9BQU1DLFNBQU8sU0FBUEEsTUFBTyxPQUFNO0FBQUEsUUFDWEMsT0FEVyxHQUNVQyxJQURWLENBQ1hELE9BRFc7QUFBQSxRQUNGRSxVQURFLEdBQ1VELElBRFYsQ0FDRkMsVUFERTs7QUFFbEIsV0FBTyxnQkFBTUMsYUFBTixDQUFvQkMsYUFBYUosT0FBYixDQUFwQixFQUEwQyxFQUFDSyxVQUFVSCxhQUFhQSxXQUFXSSxHQUFYLENBQWU7QUFBQSxhQUFHUCxPQUFPUSxDQUFQLENBQUg7QUFBQSxNQUFmLENBQWIsR0FBNEMsRUFBdkQsRUFBMUMsQ0FBUDtBQUNBLElBSEQ7O0FBS0EsVUFBT1IsT0FBTyxLQUFLSCxPQUFMLENBQWEsY0FBYixDQUFQLENBQVA7QUFDQTs7Ozs7Ozs7QUFHRixJQUFNUSxlQUFhLFNBQWJBLFlBQWEsT0FBTTtBQUN4QixLQUFJSSxXQUFTSixhQUFhVixJQUFiLENBQWI7QUFDQSxLQUFHYyxRQUFILEVBQ0MsT0FBT0EsUUFBUDtBQUNELEtBQUlDLE9BQUssU0FBTEEsSUFBSztBQUFBLFNBQU8sSUFBUDtBQUFBLEVBQVQ7QUFDQUEsTUFBS0MsV0FBTCxHQUFpQmhCLElBQWpCO0FBQ0EsUUFBT1UsYUFBYVYsSUFBYixJQUFtQmUsSUFBMUI7QUFDQSxDQVBEIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQge2xvYWQgYXMgcGFyc2V9IGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHJcblx0XHRjb25zdCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHR0aGlzLmNvbnRlbnQ9cGFyc2UoYnVmZmVyLHt4bWxNb2RlOnRydWV9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNvbnRhaW5lcil7XHJcblx0XHRjb25zdCByZW5kZXI9bm9kZT0+e1xyXG5cdFx0XHRjb25zdCB7dGFnTmFtZSwgY2hpbGROb2Rlc309bm9kZVxyXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChnZXRDb21wb25lbnQodGFnTmFtZSkse2NoaWxkcmVuOiBjaGlsZE5vZGVzID8gY2hpbGROb2Rlcy5tYXAoYT0+cmVuZGVyKGEpKSA6IFtdfSlcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpKVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9PntcclxuXHRsZXQgZXhpc3Rpbmc9Z2V0Q29tcG9uZW50W25hbWVdXHJcblx0aWYoZXhpc3RpbmcpXHJcblx0XHRyZXR1cm4gZXhpc3RpbmdcclxuXHRsZXQgVHlwZT1wcm9wcz0+bnVsbFxyXG5cdFR5cGUuZGlzcGxheU5hbWU9bmFtZVxyXG5cdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxyXG59XHJcbiJdfQ==