'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var softHyphen = function (_require) {
	_inherits(softHyphen, _require);

	function softHyphen() {
		_classCallCheck(this, softHyphen);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(softHyphen).apply(this, arguments));
	}

	_createClass(softHyphen, [{
		key: 'getText',
		value: function getText() {
			return String.fromCharCode(0xAD);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'softHyphen';
		}
	}]);

	return softHyphen;
}(require('./text'));

exports.default = softHyphen;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc29mdEh5cGhlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7NEJBRVg7QUFDUixVQUFPLE9BQU8sWUFBUCxDQUFvQixJQUFwQixDQUFQLENBRFE7Ozs7c0JBRFE7QUFBQyxVQUFPLFlBQVAsQ0FBRDs7OztRQURHO0VBQW1CLFFBQVEsUUFBUjs7a0JBQW5CIiwiZmlsZSI6InNvZnRIeXBoZW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBzb2Z0SHlwaGVuIGV4dGVuZHMgcmVxdWlyZSgnLi90ZXh0Jyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc29mdEh5cGhlbid9XG5cdGdldFRleHQoKXtcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSgweEFEKVxuXHR9XG59XG4iXX0=