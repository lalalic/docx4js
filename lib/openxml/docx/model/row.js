'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.pushRow(this);
			_get(Object.getPrototypeOf(row.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.table.popRow(this);
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>trPr')) && new _table2.default.RowProperties(pr, this.wDoc, this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcm93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7OzswQkFDYjtBQUNOLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsS0FBdkIsQ0FBNkIsT0FBN0IsQ0FBcUMsSUFBckMsRUFETTtBQUVOLDhCQUhtQiwyQ0FHSixVQUFmLENBRk07QUFHTixRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLEtBQXZCLENBQTZCLE1BQTdCLENBQW9DLElBQXBDLEVBSE07Ozs7aUNBS1EsSUFBRztBQUNqQixVQUFPLENBQUMsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsT0FBYixDQUFILENBQUQsSUFBOEIsSUFBSSxnQkFBVyxhQUFYLENBQXlCLEVBQTdCLEVBQWdDLEtBQUssSUFBTCxFQUFVLElBQTFDLENBQTlCLENBRFU7Ozs7c0JBR0Q7QUFBQyxVQUFPLEtBQVAsQ0FBRDs7OztRQVRHO0VBQVksUUFBUSxVQUFSOztrQkFBWiIsImZpbGUiOiJyb3cuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tICcuL3N0eWxlL3RhYmxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyByb3cgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRwYXJzZSgpe1xuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUucHVzaFJvdyh0aGlzKVxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnBvcFJvdyh0aGlzKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRyUHInKSkgJiYgbmV3IFRhYmxlU3R5bGUuUm93UHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3Jvdyd9XG59XG4iXX0=