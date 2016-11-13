'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _field = require('./field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = function (_Field) {
	_inherits(Date, _Field);

	function Date() {
		_classCallCheck(this, Date);

		return _possibleConstructorReturn(this, (Date.__proto__ || Object.getPrototypeOf(Date)).apply(this, arguments));
	}

	_createClass(Date, null, [{
		key: 'type',
		get: function get() {
			return 'field.date';
		}
	}, {
		key: 'FieldCode',
		get: function get() {
			return FieldCode;
		}
	}]);

	return Date;
}(_field2.default);

exports.default = Date;

var FieldCode = function (_Code) {
	_inherits(FieldCode, _Code);

	function FieldCode() {
		_classCallCheck(this, FieldCode);

		return _possibleConstructorReturn(this, (FieldCode.__proto__ || Object.getPrototypeOf(FieldCode)).apply(this, arguments));
	}

	_createClass(FieldCode, [{
		key: 'parse',
		value: function parse() {
			var option = null;
			while (option = this.nextSwitch()) {
				switch (option.type) {
					case '@':
						var i = option.data.indexOf('"');
						if (i != -1) this.format = option.data.substring(0, i);else this.format = option.data;
						break;
				}
			}
		}
	}]);

	return FieldCode;
}(_field.FieldCode);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZGF0ZS5qcyJdLCJuYW1lcyI6WyJEYXRlIiwiRmllbGRDb2RlIiwib3B0aW9uIiwibmV4dFN3aXRjaCIsInR5cGUiLCJpIiwiZGF0YSIsImluZGV4T2YiLCJmb3JtYXQiLCJzdWJzdHJpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsSTs7Ozs7Ozs7Ozs7c0JBQ0g7QUFBQyxVQUFPLFlBQVA7QUFBb0I7OztzQkFDaEI7QUFBQyxVQUFPQyxTQUFQO0FBQWlCOzs7Ozs7a0JBRnBCRCxJOztJQUtmQyxTOzs7Ozs7Ozs7OzswQkFDRTtBQUNOLE9BQUlDLFNBQU8sSUFBWDtBQUNBLFVBQU1BLFNBQU8sS0FBS0MsVUFBTCxFQUFiLEVBQStCO0FBQzlCLFlBQU9ELE9BQU9FLElBQWQ7QUFDQSxVQUFLLEdBQUw7QUFDQyxVQUFJQyxJQUFFSCxPQUFPSSxJQUFQLENBQVlDLE9BQVosQ0FBb0IsR0FBcEIsQ0FBTjtBQUNBLFVBQUdGLEtBQUcsQ0FBQyxDQUFQLEVBQ0MsS0FBS0csTUFBTCxHQUFZTixPQUFPSSxJQUFQLENBQVlHLFNBQVosQ0FBc0IsQ0FBdEIsRUFBd0JKLENBQXhCLENBQVosQ0FERCxLQUdDLEtBQUtHLE1BQUwsR0FBWU4sT0FBT0ksSUFBbkI7QUFDRDtBQVBEO0FBU0E7QUFDRCIsImZpbGUiOiJkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEZpZWxkLCB7RmllbGRDb2RlIGFzIENvZGV9IGZyb20gXCIuL2ZpZWxkXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZSBleHRlbmRzIEZpZWxke1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkLmRhdGUnfVxuXHRzdGF0aWMgZ2V0IEZpZWxkQ29kZSgpe3JldHVybiBGaWVsZENvZGV9XG59XG5cbmNsYXNzIEZpZWxkQ29kZSBleHRlbmRzIENvZGV7XG5cdHBhcnNlKCl7XG5cdFx0dmFyIG9wdGlvbj1udWxsO1xuXHRcdHdoaWxlKG9wdGlvbj10aGlzLm5leHRTd2l0Y2goKSl7XG5cdFx0XHRzd2l0Y2gob3B0aW9uLnR5cGUpe1xuXHRcdFx0Y2FzZSAnQCc6XG5cdFx0XHRcdHZhciBpPW9wdGlvbi5kYXRhLmluZGV4T2YoJ1wiJyk7XG5cdFx0XHRcdGlmKGkhPS0xKVxuXHRcdFx0XHRcdHRoaXMuZm9ybWF0PW9wdGlvbi5kYXRhLnN1YnN0cmluZygwLGkpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5mb3JtYXQ9b3B0aW9uLmRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl19