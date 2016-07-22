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
			return typeof this.basedOn == 'string' ? this.styles[this.raw.get(this.basedOn)] : this.basedOn;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0lBRXFCO0FBQ3BCLFVBRG9CLEtBQ3BCLENBQVksS0FBWixFQUFtQixNQUFuQixFQUE2QztNQUFsQixnRUFBUSx5QkFBVTs7d0JBRHpCLE9BQ3lCOztBQUM1QyxPQUFLLEdBQUwsR0FBUyxNQUFNLEdBQU4sR0FBWSxLQUFaLEdBQW9CLHdCQUFRLEtBQVIsQ0FBcEIsQ0FEbUM7QUFFNUMsT0FBSyxNQUFMLEdBQVksTUFBWixDQUY0QztBQUc1QyxPQUFLLE9BQUwsR0FBYSxPQUFiLENBSDRDO0VBQTdDOztjQURvQjs7c0JBT2hCLE1BQUs7QUFDUixPQUFJLFFBQU0sS0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLElBQWIsQ0FBTixDQURJO0FBRVIsT0FBRyxTQUFPLFNBQVAsRUFDRixRQUFNLEtBQUssY0FBTCxhQUF1QixTQUF2QixDQUFOLENBREQ7QUFFQSxVQUFPLEtBQVAsQ0FKUTs7OzsrQkFPRztBQUNYLFVBQU8sT0FBTyxLQUFLLE9BQUwsSUFBZSxRQUF0QixHQUFpQyxLQUFLLE1BQUwsQ0FBWSxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsS0FBSyxPQUFMLENBQXpCLENBQWpDLEdBQTJFLEtBQUssT0FBTCxDQUR2RTs7OztpQ0FJRyxNQUFLO0FBQ25CLE9BQUksVUFBUSxLQUFLLFVBQUwsRUFBUixDQURlO0FBRW5CLE9BQUcsT0FBSCxFQUNDLE9BQU8sUUFBUSxHQUFSLGdCQUFlLFNBQWYsQ0FBUCxDQUREO0FBRUEsVUFBTyxTQUFQLENBSm1COzs7O1FBbEJBIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi8uLi94bWxPYmplY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGV7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHN0eWxlcywgYmFzZWRPbj1cImJhc2VkT25cIil7XHJcblx0XHR0aGlzLnJhdz1zdHlsZS5nZXQgPyBzdHlsZSA6IGdldGFibGUoc3R5bGUpXHJcblx0XHR0aGlzLnN0eWxlcz1zdHlsZXNcclxuXHRcdHRoaXMuYmFzZWRPbj1iYXNlZE9uXHJcblx0fVxyXG5cdFxyXG5cdGdldChwYXRoKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnJhdy5nZXQocGF0aClcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdHZhbHVlPXRoaXMuZ2V0RnJvbUJhc2VkT24oLi4uYXJndW1lbnRzKVxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cdFxyXG5cdGdldEJhc2VkT24oKXtcclxuXHRcdHJldHVybiB0eXBlb2YodGhpcy5iYXNlZE9uKT09J3N0cmluZycgPyB0aGlzLnN0eWxlc1t0aGlzLnJhdy5nZXQodGhpcy5iYXNlZE9uKV0gOiB0aGlzLmJhc2VkT25cclxuXHR9XHJcblx0XHJcblx0Z2V0RnJvbUJhc2VkT24ocGF0aCl7XHJcblx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0aWYoYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcbn0iXX0=