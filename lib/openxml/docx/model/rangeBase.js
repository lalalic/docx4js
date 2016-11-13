'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rangeBase = function (_require) {
	_inherits(rangeBase, _require);

	function rangeBase() {
		_classCallCheck(this, rangeBase);

		return _possibleConstructorReturn(this, (rangeBase.__proto__ || Object.getPrototypeOf(rangeBase)).apply(this, arguments));
	}

	_createClass(rangeBase, [{
		key: 'iterate',
		value: function iterate(visitor) {}
	}, {
		key: 'first',
		value: function first() {}
	}, {
		key: 'last',
		value: function last() {}
	}], [{
		key: 'type',
		get: function get() {
			return 'range';
		}
	}]);

	return rangeBase;
}(require('../model'));

exports.default = rangeBase;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcmFuZ2VCYXNlLmpzIl0sIm5hbWVzIjpbInJhbmdlQmFzZSIsInZpc2l0b3IiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsUzs7Ozs7Ozs7Ozs7MEJBQ1pDLE8sRUFBUSxDQUVmOzs7MEJBQ00sQ0FFTjs7O3lCQUNLLENBRUw7OztzQkFFZ0I7QUFBQyxVQUFPLE9BQVA7QUFBZTs7OztFQVhLQyxRQUFRLFVBQVIsQzs7a0JBQWxCRixTIiwiZmlsZSI6InJhbmdlQmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIHJhbmdlQmFzZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGl0ZXJhdGUodmlzaXRvcil7XG5cblx0fVxuXHRmaXJzdCgpe1xuXG5cdH1cblx0bGFzdCgpe1xuXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3JhbmdlJ31cbn1cbiJdfQ==