'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fieldEnd = function (_require) {
	_inherits(fieldEnd, _require);

	function fieldEnd() {
		_classCallCheck(this, fieldEnd);

		return _possibleConstructorReturn(this, (fieldEnd.__proto__ || Object.getPrototypeOf(fieldEnd)).apply(this, arguments));
	}

	_createClass(fieldEnd, [{
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			this.wDoc.parseContext.field.end(this, visitors);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'fieldEnd';
		}
	}]);

	return fieldEnd;
}(require('../model'));

exports.default = fieldEnd;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRFbmQuanMiXSwibmFtZXMiOlsiZmllbGRFbmQiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwiZmllbGQiLCJlbmQiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsUTs7Ozs7Ozs7Ozs7MkJBQ1hDLEMsRUFBR0MsUyxFQUFXQyxRLEVBQVM7QUFDL0IsUUFBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QkMsR0FBN0IsQ0FBaUMsSUFBakMsRUFBc0NKLFFBQXRDO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFVBQVA7QUFBa0I7Ozs7RUFKQ0ssUUFBUSxVQUFSLEM7O2tCQUFqQlIsUSIsImZpbGUiOiJmaWVsZEVuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZWxkRW5kIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC5maWVsZC5lbmQodGhpcyx2aXNpdG9ycylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkRW5kJ31cbn1cbiJdfQ==