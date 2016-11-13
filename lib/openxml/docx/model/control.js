'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sdt = function (_require) {
	_inherits(sdt, _require);

	function sdt() {
		_classCallCheck(this, sdt);

		return _possibleConstructorReturn(this, (sdt.__proto__ || Object.getPrototypeOf(sdt)).apply(this, arguments));
	}

	_createClass(sdt, [{
		key: 'getTag',
		value: function getTag(t) {
			return (t = this.wXml.$1('>sdtPr>tag')) && t.attr('w:val') || '';
		}
	}, {
		key: 'isInline',
		value: function isInline() {
			return !this.wXml.$1('p,table');
		}
	}]);

	return sdt;
}(require('./sdt'));

exports.default = sdt;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvY29udHJvbC5qcyJdLCJuYW1lcyI6WyJzZHQiLCJ0Iiwid1htbCIsIiQxIiwiYXR0ciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxHOzs7Ozs7Ozs7Ozt5QkFDYkMsQyxFQUFFO0FBQ1IsVUFBTyxDQUFDQSxJQUFFLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLFlBQWIsQ0FBSCxLQUFrQ0YsRUFBRUcsSUFBRixDQUFPLE9BQVAsQ0FBbEMsSUFBcUQsRUFBNUQ7QUFDQTs7OzZCQUNTO0FBQ1QsVUFBTyxDQUFDLEtBQUtGLElBQUwsQ0FBVUMsRUFBVixDQUFhLFNBQWIsQ0FBUjtBQUNBOzs7O0VBTitCRSxRQUFRLE9BQVIsQzs7a0JBQVpMLEciLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIHNkdCBleHRlbmRzIHJlcXVpcmUoJy4vc2R0Jyl7XG5cdGdldFRhZyh0KXtcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCc+c2R0UHI+dGFnJykpICYmIHQuYXR0cigndzp2YWwnKSB8fCAnJ1xuXHR9XG5cdGlzSW5saW5lKCl7XG5cdFx0cmV0dXJuICF0aGlzLndYbWwuJDEoJ3AsdGFibGUnKVxuXHR9XG59XG4iXX0=