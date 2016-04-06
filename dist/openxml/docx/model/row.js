'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var row = function (_require) {
	_inherits(row, _require);

	function row() {
		_classCallCheck(this, row);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(row).apply(this, arguments));
	}

	_createClass(row, [{
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>trPr')) && new require('./style/table').RowProperties(pr, this.wDoc, this);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'row';
		}
	}]);

	return row;
}(require('../model'));

exports.default = row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvcm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7Ozs7Ozs7OztpQ0FDTCxJQUFHO0FBQ2pCLFVBQU8sQ0FBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxPQUFiLENBQUgsQ0FBRCxJQUE4QixJQUFJLE9BQUosQ0FBWSxlQUFaLEVBQTZCLGFBQTdCLENBQTJDLEVBQTNDLEVBQThDLEtBQUssSUFBTCxFQUFVLElBQXhELENBQTlCLENBRFU7Ozs7c0JBR0Q7QUFBQyxVQUFPLEtBQVAsQ0FBRDs7OztRQUpHO0VBQVksUUFBUSxVQUFSOztrQkFBWiIsImZpbGUiOiJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyByb3cgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRnZXREaXJlY3RTdHlsZShwcil7XG5cdFx0cmV0dXJuIChwcj10aGlzLndYbWwuJDEoJz50clByJykpICYmIG5ldyByZXF1aXJlKCcuL3N0eWxlL3RhYmxlJykuUm93UHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3Jvdyd9XG59XG4iXX0=