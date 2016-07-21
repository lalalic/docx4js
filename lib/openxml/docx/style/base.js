'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
	function Style(style, styles) {
		_classCallCheck(this, Style);

		this.raw = style;
		this.styles = styles;
	}

	_createClass(Style, [{
		key: 'get',
		value: function get(path) {
			var value = this.raw.get(path);
			if (value == undefined) value = this.getFromBasedOn.apply(this, arguments);
			return value;
		}
	}, {
		key: 'getBasedOn',
		value: function getBasedOn() {
			return this.styles[this.get('basedOn')];
		}
	}, {
		key: 'getFromBasedOn',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLEtBQ3BCLENBQVksS0FBWixFQUFtQixNQUFuQixFQUEwQjt3QkFETixPQUNNOztBQUN6QixPQUFLLEdBQUwsR0FBUyxLQUFULENBRHlCO0FBRXpCLE9BQUssTUFBTCxHQUFZLE1BQVosQ0FGeUI7RUFBMUI7O2NBRG9COztzQkFNaEIsTUFBSztBQUNSLE9BQUksUUFBTSxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsSUFBYixDQUFOLENBREk7QUFFUixPQUFHLFNBQU8sU0FBUCxFQUNGLFFBQU0sS0FBSyxjQUFMLGFBQXVCLFNBQXZCLENBQU4sQ0FERDtBQUVBLFVBQU8sS0FBUCxDQUpROzs7OytCQU9HO0FBQ1gsVUFBTyxLQUFLLE1BQUwsQ0FBWSxLQUFLLEdBQUwsQ0FBUyxTQUFULENBQVosQ0FBUCxDQURXOzs7O2lDQUlHLE1BQUs7QUFDbkIsT0FBSSxVQUFRLEtBQUssVUFBTCxFQUFSLENBRGU7QUFFbkIsT0FBRyxPQUFILEVBQ0MsT0FBTyxRQUFRLEdBQVIsZ0JBQWUsU0FBZixDQUFQLENBREQ7QUFFQSxVQUFPLFNBQVAsQ0FKbUI7Ozs7UUFqQkEiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBzdHlsZXMpe1xyXG5cdFx0dGhpcy5yYXc9c3R5bGVcclxuXHRcdHRoaXMuc3R5bGVzPXN0eWxlc1xyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5yYXcuZ2V0KHBhdGgpXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHR2YWx1ZT10aGlzLmdldEZyb21CYXNlZE9uKC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHRcclxuXHRnZXRCYXNlZE9uKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5zdHlsZXNbdGhpcy5nZXQoJ2Jhc2VkT24nKV1cclxuXHR9XHJcblx0XHJcblx0Z2V0RnJvbUJhc2VkT24ocGF0aCl7XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcbn0iXX0=