"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlObject = require("../../../xmlObject");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
	function Style(style, styles) {
		var basedOn = arguments.length <= 2 || arguments[2] === undefined ? "basedOn" : arguments[2];

		_classCallCheck(this, Style);

		this.raw = style.get ? style : (0, _xmlObject.getable)(style);
		this.styles = styles;
		this.basedOn = basedOn;
	}

	_createClass(Style, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0lBRXFCO0FBQ3BCLFVBRG9CLEtBQ3BCLENBQVksS0FBWixFQUFtQixNQUFuQixFQUE2QztNQUFsQixnRUFBUSx5QkFBVTs7d0JBRHpCLE9BQ3lCOztBQUM1QyxPQUFLLEdBQUwsR0FBUyxNQUFNLEdBQU4sR0FBWSxLQUFaLEdBQW9CLHdCQUFRLEtBQVIsQ0FBcEIsQ0FEbUM7QUFFNUMsT0FBSyxNQUFMLEdBQVksTUFBWixDQUY0QztBQUc1QyxPQUFLLE9BQUwsR0FBYSxPQUFiLENBSDRDO0VBQTdDOztjQURvQjs7c0JBT2hCLE1BQUs7QUFDUixPQUFJLFFBQU0sS0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLElBQWIsQ0FBTixDQURJO0FBRVIsT0FBRyxTQUFPLFNBQVAsRUFDRixRQUFNLEtBQUssY0FBTCxhQUF1QixTQUF2QixDQUFOLENBREQ7QUFFQSxVQUFPLEtBQVAsQ0FKUTs7OzsrQkFPRztBQUNYLE9BQUcsQ0FBQyxLQUFLLE9BQUwsRUFDSCxPQUFPLFNBQVAsQ0FERDtBQUVBLE9BQUcsT0FBTyxLQUFLLE9BQUwsS0FBZ0IsUUFBdkIsRUFDRCxPQUFPLEtBQUssT0FBTCxDQURUO0FBRUEsT0FBRyxLQUFLLE1BQUwsRUFDRixPQUFPLEtBQUssTUFBTCxDQUFZLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxLQUFLLE9BQUwsQ0FBekIsQ0FBUCxDQUREO0FBRUEsVUFBTyxTQUFQLENBUFc7Ozs7aUNBVUcsTUFBSztBQUNuQixPQUFJLFVBQVEsS0FBSyxVQUFMLEVBQVIsQ0FEZTtBQUVuQixPQUFHLE9BQUgsRUFDQyxPQUFPLFFBQVEsR0FBUixnQkFBZSxTQUFmLENBQVAsQ0FERDtBQUVBLFVBQU8sU0FBUCxDQUptQjs7OztRQXhCQSIsImZpbGUiOiJiYXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi4vLi4vLi4veG1sT2JqZWN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBzdHlsZXMsIGJhc2VkT249XCJiYXNlZE9uXCIpe1xyXG5cdFx0dGhpcy5yYXc9c3R5bGUuZ2V0ID8gc3R5bGUgOiBnZXRhYmxlKHN0eWxlKVxyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0XHR0aGlzLmJhc2VkT249YmFzZWRPblxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucmF3LmdldChwYXRoKVxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0dmFsdWU9dGhpcy5nZXRGcm9tQmFzZWRPbiguLi5hcmd1bWVudHMpXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdGdldEJhc2VkT24oKXtcclxuXHRcdGlmKCF0aGlzLmJhc2VkT24pXHJcblx0XHRcdHJldHVybiB1bmRlZmluZWRcclxuXHRcdGlmKHR5cGVvZih0aGlzLmJhc2VkT24pIT09J3N0cmluZycpXHJcblx0XHQgXHRyZXR1cm4gdGhpcy5iYXNlZE9uXHJcblx0XHRpZih0aGlzLnN0eWxlcylcclxuXHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzW3RoaXMucmF3LmdldCh0aGlzLmJhc2VkT24pXVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdH1cclxuXHJcblx0Z2V0RnJvbUJhc2VkT24ocGF0aCl7XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcbn1cclxuIl19