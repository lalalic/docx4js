"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlObject = require("../../../xmlObject");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Style = function () {
	function Style(style, styles) {
		var basedOn = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "basedOn";

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvYmFzZS5qcyJdLCJuYW1lcyI6WyJTdHlsZSIsInN0eWxlIiwic3R5bGVzIiwiYmFzZWRPbiIsInJhdyIsImdldCIsInBhdGgiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImdldEZyb21CYXNlZE9uIiwiYXJndW1lbnRzIiwiZ2V0QmFzZWRPbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztJQUVxQkEsSztBQUNwQixnQkFBWUMsS0FBWixFQUFtQkMsTUFBbkIsRUFBNkM7QUFBQSxNQUFsQkMsT0FBa0IsdUVBQVYsU0FBVTs7QUFBQTs7QUFDNUMsT0FBS0MsR0FBTCxHQUFTSCxNQUFNSSxHQUFOLEdBQVlKLEtBQVosR0FBb0Isd0JBQVFBLEtBQVIsQ0FBN0I7QUFDQSxPQUFLQyxNQUFMLEdBQVlBLE1BQVo7QUFDQSxPQUFLQyxPQUFMLEdBQWFBLE9BQWI7QUFDQTs7OztzQkFFR0csSSxFQUFLO0FBQ1IsT0FBSUMsUUFBTSxLQUFLSCxHQUFMLENBQVNDLEdBQVQsQ0FBYUMsSUFBYixDQUFWO0FBQ0EsT0FBR0MsU0FBT0MsU0FBVixFQUNDRCxRQUFNLEtBQUtFLGNBQUwsYUFBdUJDLFNBQXZCLENBQU47QUFDRCxVQUFPSCxLQUFQO0FBQ0E7OzsrQkFFVztBQUNYLE9BQUcsQ0FBQyxLQUFLSixPQUFULEVBQ0MsT0FBT0ssU0FBUDtBQUNELE9BQUcsT0FBTyxLQUFLTCxPQUFaLEtBQXVCLFFBQTFCLEVBQ0UsT0FBTyxLQUFLQSxPQUFaO0FBQ0YsT0FBRyxLQUFLRCxNQUFSLEVBQ0MsT0FBTyxLQUFLQSxNQUFMLENBQVksS0FBS0UsR0FBTCxDQUFTQyxHQUFULENBQWEsS0FBS0YsT0FBbEIsQ0FBWixDQUFQO0FBQ0QsVUFBT0ssU0FBUDtBQUNBOzs7aUNBRWNGLEksRUFBSztBQUNuQixPQUFJSCxVQUFRLEtBQUtRLFVBQUwsRUFBWjtBQUNBLE9BQUdSLE9BQUgsRUFDQyxPQUFPQSxRQUFRRSxHQUFSLGdCQUFlSyxTQUFmLENBQVA7QUFDRCxVQUFPRixTQUFQO0FBQ0E7Ozs7OztrQkE3Qm1CUixLIiwiZmlsZSI6ImJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi8uLi94bWxPYmplY3RcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGV7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHN0eWxlcywgYmFzZWRPbj1cImJhc2VkT25cIil7XHJcblx0XHR0aGlzLnJhdz1zdHlsZS5nZXQgPyBzdHlsZSA6IGdldGFibGUoc3R5bGUpXHJcblx0XHR0aGlzLnN0eWxlcz1zdHlsZXNcclxuXHRcdHRoaXMuYmFzZWRPbj1iYXNlZE9uXHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5yYXcuZ2V0KHBhdGgpXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHR2YWx1ZT10aGlzLmdldEZyb21CYXNlZE9uKC4uLmFyZ3VtZW50cylcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0Z2V0QmFzZWRPbigpe1xyXG5cdFx0aWYoIXRoaXMuYmFzZWRPbilcclxuXHRcdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdFx0aWYodHlwZW9mKHRoaXMuYmFzZWRPbikhPT0nc3RyaW5nJylcclxuXHRcdCBcdHJldHVybiB0aGlzLmJhc2VkT25cclxuXHRcdGlmKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXNbdGhpcy5yYXcuZ2V0KHRoaXMuYmFzZWRPbildXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cclxuXHRnZXRGcm9tQmFzZWRPbihwYXRoKXtcclxuXHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRpZihiYXNlZE9uKVxyXG5cdFx0XHRyZXR1cm4gYmFzZWRPbi5nZXQoLi4uYXJndW1lbnRzKVxyXG5cdFx0cmV0dXJuIHVuZGVmaW5lZFxyXG5cdH1cclxufVxyXG4iXX0=