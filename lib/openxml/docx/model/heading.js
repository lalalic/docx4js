'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var heading = function (_require) {
	_inherits(heading, _require);

	function heading() {
		_classCallCheck(this, heading);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(heading).apply(this, arguments));
	}

	_createClass(heading, [{
		key: 'getOutlineLevel',
		value: function getOutlineLevel() {
			return this.getNamedStyle().getOutlineLevel();
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'heading';
		}
	}]);

	return heading;
}(require('./paragraph'));

exports.default = heading;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaGVhZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7b0NBQ0g7QUFDaEIsVUFBTyxLQUFLLGFBQUwsR0FBcUIsZUFBckIsRUFBUCxDQURnQjs7OztzQkFHQTtBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBSkc7RUFBZ0IsUUFBUSxhQUFSOztrQkFBaEIiLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWRpbmcgZXh0ZW5kcyByZXF1aXJlKCcuL3BhcmFncmFwaCcpe1xuXHRnZXRPdXRsaW5lTGV2ZWwoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXROYW1lZFN0eWxlKCkuZ2V0T3V0bGluZUxldmVsKClcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2hlYWRpbmcnfVxufVxuIl19