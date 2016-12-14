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

var _cheerio2 = _interopRequireDefault(_cheerio);

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
			this.content = (0, _cheerio2.default)("w\\:document", buffer, { xmlMode: true });
		}
	}, {
		key: "render",
		value: function render(container) {}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwibmFtZSIsImFzTm9kZUJ1ZmZlciIsImNvbnRlbnQiLCJ4bWxNb2RlIiwiY29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBR1E7QUFBQTs7QUFDTixRQUFLQSxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxXQUFLSCxJQUFMLElBQVcsT0FBS0ksWUFBTCxDQUFrQkwsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsQ0FBWDtBQUNBLElBSkQ7O0FBTUEsT0FBTUksU0FBTyxLQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUIsS0FBS0MsSUFBdEIsRUFBNEJDLFlBQTVCLEVBQWI7QUFDQSxRQUFLQyxPQUFMLEdBQWEsdUJBQU0sY0FBTixFQUFxQkwsTUFBckIsRUFBNEIsRUFBQ00sU0FBUSxJQUFULEVBQTVCLENBQWI7QUFDQTs7O3lCQUVNQyxTLEVBQVUsQ0FFaEIiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBwYXJzZSBmcm9tIFwiY2hlZXJpb1wiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHJcblx0XHRjb25zdCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHR0aGlzLmNvbnRlbnQ9cGFyc2UoXCJ3XFxcXDpkb2N1bWVudFwiLGJ1ZmZlcix7eG1sTW9kZTp0cnVlfSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjb250YWluZXIpe1xyXG5cclxuXHR9XHJcbn1cclxuIl19