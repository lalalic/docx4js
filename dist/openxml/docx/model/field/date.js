'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = function (_require) {
	_inherits(Date, _require);

	function Date() {
		_classCallCheck(this, Date);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Date).apply(this, arguments));
	}

	_createClass(Date, null, [{
		key: 'type',
		get: function get() {
			return 'fied.date';
		}
	}, {
		key: 'FieldCode',
		get: function get() {
			return FieldCode;
		}
	}]);

	return Date;
}(require('./field'));

exports.default = Date;

var FieldCode = function (_require$FieldCode) {
	_inherits(FieldCode, _require$FieldCode);

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
}(require('./field').FieldCode);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7c0JBQ0g7QUFBQyxVQUFPLFdBQVAsQ0FBRDs7OztzQkFDSztBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBRkY7RUFBYSxRQUFRLFNBQVI7O2tCQUFiOztJQUtmOzs7Ozs7Ozs7OzswQkFDRTtBQUNOLE9BQUksU0FBTyxJQUFQLENBREU7QUFFTixVQUFNLFNBQU8sS0FBSyxVQUFMLEVBQVAsRUFBeUI7QUFDOUIsWUFBTyxPQUFPLElBQVA7QUFDUCxVQUFLLEdBQUw7QUFDQyxVQUFJLElBQUUsT0FBTyxJQUFQLENBQVksT0FBWixDQUFvQixHQUFwQixDQUFGLENBREw7QUFFQyxVQUFHLEtBQUcsQ0FBQyxDQUFELEVBQ0wsS0FBSyxNQUFMLEdBQVksT0FBTyxJQUFQLENBQVksU0FBWixDQUFzQixDQUF0QixFQUF3QixDQUF4QixDQUFaLENBREQsS0FHQyxLQUFLLE1BQUwsR0FBWSxPQUFPLElBQVAsQ0FIYjtBQUlBLFlBTkQ7QUFEQSxLQUQ4QjtJQUEvQjs7OztRQUhJO0VBQWtCLFFBQVEsU0FBUixFQUFtQixTQUFuQiIsImZpbGUiOiJkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZSBleHRlbmRzIHJlcXVpcmUoJy4vZmllbGQnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdmaWVkLmRhdGUnfVxuXHRzdGF0aWMgZ2V0IEZpZWxkQ29kZSgpe3JldHVybiBGaWVsZENvZGV9XG59XG5cbmNsYXNzIEZpZWxkQ29kZSBleHRlbmRzIHJlcXVpcmUoJy4vZmllbGQnKS5GaWVsZENvZGV7XG5cdHBhcnNlKCl7XG5cdFx0dmFyIG9wdGlvbj1udWxsO1xuXHRcdHdoaWxlKG9wdGlvbj10aGlzLm5leHRTd2l0Y2goKSl7XG5cdFx0XHRzd2l0Y2gob3B0aW9uLnR5cGUpe1xuXHRcdFx0Y2FzZSAnQCc6XG5cdFx0XHRcdHZhciBpPW9wdGlvbi5kYXRhLmluZGV4T2YoJ1wiJyk7XG5cdFx0XHRcdGlmKGkhPS0xKVxuXHRcdFx0XHRcdHRoaXMuZm9ybWF0PW9wdGlvbi5kYXRhLnN1YnN0cmluZygwLGkpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0dGhpcy5mb3JtYXQ9b3B0aW9uLmRhdGE7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl19