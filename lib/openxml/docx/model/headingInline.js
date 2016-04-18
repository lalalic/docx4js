'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var headingChar = function (_require) {
	_inherits(headingChar, _require);

	_createClass(headingChar, null, [{
		key: 'type',
		get: function get() {
			return 'headingChar';
		}
	}]);

	function headingChar() {
		_classCallCheck(this, headingChar);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(headingChar).apply(this, arguments));

		_this.outlineLvl = arguments[arguments.length - 1];
		return _this;
	}

	_createClass(headingChar, [{
		key: 'getOutlineLevel',
		value: function getOutlineLevel() {
			return this.outlineLvl;
		}
	}]);

	return headingChar;
}(require('./inline'));

exports.default = headingChar;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaGVhZGluZ0lubGluZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7c0JBQ0g7QUFBQyxVQUFPLGFBQVAsQ0FBRDs7OztBQUVqQixVQUhvQixXQUdwQixHQUFhO3dCQUhPLGFBR1A7O3FFQUhPLHlCQUlWLFlBREc7O0FBRVosUUFBSyxVQUFMLEdBQWdCLFVBQVUsVUFBVSxNQUFWLEdBQWlCLENBQWpCLENBQTFCLENBRlk7O0VBQWI7O2NBSG9COztvQ0FPSDtBQUNoQixVQUFPLEtBQUssVUFBTCxDQURTOzs7O1FBUEc7RUFBb0IsUUFBUSxVQUFSOztrQkFBcEIiLCJmaWxlIjoiaGVhZGluZ0lubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGhlYWRpbmdDaGFyIGV4dGVuZHMgcmVxdWlyZSgnLi9pbmxpbmUnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdoZWFkaW5nQ2hhcid9XG5cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5vdXRsaW5lTHZsPWFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoLTFdXG5cdH1cblx0Z2V0T3V0bGluZUxldmVsKCl7XG5cdFx0cmV0dXJuIHRoaXMub3V0bGluZUx2bFxuXHR9XG5cbn1cbiJdfQ==