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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Date).apply(this, arguments));
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FieldCode).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O3NCQUNIO0FBQUMsVUFBTyxZQUFQLENBQUQ7Ozs7c0JBQ0s7QUFBQyxVQUFPLFNBQVAsQ0FBRDs7OztRQUZGOzs7OztJQUtmOzs7Ozs7Ozs7OzswQkFDRTtBQUNOLE9BQUksU0FBTyxJQUFQLENBREU7QUFFTixVQUFNLFNBQU8sS0FBSyxVQUFMLEVBQVAsRUFBeUI7QUFDOUIsWUFBTyxPQUFPLElBQVA7QUFDUCxVQUFLLEdBQUw7QUFDQyxVQUFJLElBQUUsT0FBTyxJQUFQLENBQVksT0FBWixDQUFvQixHQUFwQixDQUFGLENBREw7QUFFQyxVQUFHLEtBQUcsQ0FBQyxDQUFELEVBQ0wsS0FBSyxNQUFMLEdBQVksT0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUFaLENBREQsS0FHQyxLQUFLLE1BQUwsR0FBWSxPQUFPLElBQVAsQ0FIYjtBQUlBLFlBTkQ7QUFEQSxLQUQ4QjtJQUEvQjs7OztRQUhJIiwiZmlsZSI6ImRhdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmllbGQsIHtGaWVsZENvZGUgYXMgQ29kZX0gZnJvbSBcIi4vZmllbGRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRlIGV4dGVuZHMgRmllbGR7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGQuZGF0ZSd9XG5cdHN0YXRpYyBnZXQgRmllbGRDb2RlKCl7cmV0dXJuIEZpZWxkQ29kZX1cbn1cblxuY2xhc3MgRmllbGRDb2RlIGV4dGVuZHMgQ29kZXtcblx0cGFyc2UoKXtcblx0XHR2YXIgb3B0aW9uPW51bGw7XG5cdFx0d2hpbGUob3B0aW9uPXRoaXMubmV4dFN3aXRjaCgpKXtcblx0XHRcdHN3aXRjaChvcHRpb24udHlwZSl7XG5cdFx0XHRjYXNlICdAJzpcblx0XHRcdFx0dmFyIGk9b3B0aW9uLmRhdGEuaW5kZXhPZignXCInKTtcblx0XHRcdFx0aWYoaSE9LTEpXG5cdFx0XHRcdFx0dGhpcy5mb3JtYXQ9b3B0aW9uLmRhdGEuc3Vic3RyaW5nKDAsaSk7XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR0aGlzLmZvcm1hdD1vcHRpb24uZGF0YTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG4iXX0=