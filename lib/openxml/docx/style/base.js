"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _xmlObject = require("../../../xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Style = function () {
	function Style(style, styles) {
		var basedOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "basedOn";
		(0, _classCallCheck3.default)(this, Style);

		this.raw = style.get ? style : (0, _xmlObject.getable)(style);
		this.styles = styles;
		this.basedOn = basedOn;
	}

	(0, _createClass3.default)(Style, [{
		key: "get",
		value: function get(path) {
			var value = this.raw.get(path);
			if (value == undefined) value = this.getFromBasedOn.apply(this, arguments);
			return value;
		}
	}, {
		key: "getBasedOn",
		value: function getBasedOn() {
			if (!this.basedOn) return undefined;
			if (typeof this.basedOn !== 'string') return this.basedOn;
			if (this.styles) return this.styles[this.raw.get(this.basedOn)];
			return undefined;
		}
	}, {
		key: "getFromBasedOn",
		value: function getFromBasedOn(path) {
			var basedOn = this.getBasedOn();
			if (basedOn) return basedOn.get.apply(basedOn, arguments);
			return undefined;
		}
	}]);
	return Style;
}();

exports.default = Style;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvYmFzZS5qcyJdLCJuYW1lcyI6WyJTdHlsZSIsInN0eWxlIiwic3R5bGVzIiwiYmFzZWRPbiIsInJhdyIsImdldCIsInBhdGgiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImdldEZyb21CYXNlZE9uIiwiYXJndW1lbnRzIiwiZ2V0QmFzZWRPbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztJQUVxQkEsSztBQUNwQixnQkFBWUMsS0FBWixFQUFtQkMsTUFBbkIsRUFBNkM7QUFBQSxNQUFsQkMsT0FBa0IsdUVBQVYsU0FBVTtBQUFBOztBQUM1QyxPQUFLQyxHQUFMLEdBQVNILE1BQU1JLEdBQU4sR0FBWUosS0FBWixHQUFvQix3QkFBUUEsS0FBUixDQUE3QjtBQUNBLE9BQUtDLE1BQUwsR0FBWUEsTUFBWjtBQUNBLE9BQUtDLE9BQUwsR0FBYUEsT0FBYjtBQUNBOzs7O3NCQUVHRyxJLEVBQUs7QUFDUixPQUFJQyxRQUFNLEtBQUtILEdBQUwsQ0FBU0MsR0FBVCxDQUFhQyxJQUFiLENBQVY7QUFDQSxPQUFHQyxTQUFPQyxTQUFWLEVBQ0NELFFBQU0sS0FBS0UsY0FBTCxhQUF1QkMsU0FBdkIsQ0FBTjtBQUNELFVBQU9ILEtBQVA7QUFDQTs7OytCQUVXO0FBQ1gsT0FBRyxDQUFDLEtBQUtKLE9BQVQsRUFDQyxPQUFPSyxTQUFQO0FBQ0QsT0FBRyxPQUFPLEtBQUtMLE9BQVosS0FBdUIsUUFBMUIsRUFDRSxPQUFPLEtBQUtBLE9BQVo7QUFDRixPQUFHLEtBQUtELE1BQVIsRUFDQyxPQUFPLEtBQUtBLE1BQUwsQ0FBWSxLQUFLRSxHQUFMLENBQVNDLEdBQVQsQ0FBYSxLQUFLRixPQUFsQixDQUFaLENBQVA7QUFDRCxVQUFPSyxTQUFQO0FBQ0E7OztpQ0FFY0YsSSxFQUFLO0FBQ25CLE9BQUlILFVBQVEsS0FBS1EsVUFBTCxFQUFaO0FBQ0EsT0FBR1IsT0FBSCxFQUNDLE9BQU9BLFFBQVFFLEdBQVIsZ0JBQWVLLFNBQWYsQ0FBUDtBQUNELFVBQU9GLFNBQVA7QUFDQTs7Ozs7a0JBN0JtQlIsSyIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi4vLi4vLi4veG1sT2JqZWN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBzdHlsZXMsIGJhc2VkT249XCJiYXNlZE9uXCIpe1xyXG5cdFx0dGhpcy5yYXc9c3R5bGUuZ2V0ID8gc3R5bGUgOiBnZXRhYmxlKHN0eWxlKVxyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0XHR0aGlzLmJhc2VkT249YmFzZWRPblxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucmF3LmdldChwYXRoKVxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0dmFsdWU9dGhpcy5nZXRGcm9tQmFzZWRPbiguLi5hcmd1bWVudHMpXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdGdldEJhc2VkT24oKXtcclxuXHRcdGlmKCF0aGlzLmJhc2VkT24pXHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdGlmKHR5cGVvZih0aGlzLmJhc2VkT24pIT09J3N0cmluZycpXHJcblx0XHQgXHRyZXR1cm4gdGhpcy5iYXNlZE9uXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzW3RoaXMucmF3LmdldCh0aGlzLmJhc2VkT24pXVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdH1cclxuXHJcblx0Z2V0RnJvbUJhc2VkT24ocGF0aCl7XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcbn1cclxuIl19