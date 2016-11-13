'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var tab = function (_require) {
	_inherits(tab, _require);

	function tab() {
		_classCallCheck(this, tab);

		return _possibleConstructorReturn(this, (tab.__proto__ || Object.getPrototypeOf(tab)).apply(this, arguments));
	}

	_createClass(tab, [{
		key: 'getText',
		value: function getText() {
			return String.fromCharCode(0x9);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'tab';
		}
	}]);

	return tab;
}(require('./text'));

exports.default = tab;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFiLmpzIl0sIm5hbWVzIjpbInRhYiIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxHOzs7Ozs7Ozs7Ozs0QkFHWDtBQUNSLFVBQU9DLE9BQU9DLFlBQVAsQ0FBb0IsR0FBcEIsQ0FBUDtBQUNBOzs7c0JBSmdCO0FBQUMsVUFBTyxLQUFQO0FBQWE7Ozs7RUFEQ0MsUUFBUSxRQUFSLEM7O2tCQUFaSCxHIiwiZmlsZSI6InRhYi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYiBleHRlbmRzIHJlcXVpcmUoJy4vdGV4dCcpe1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3RhYid9XG5cblx0Z2V0VGV4dCgpe1xuXHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4OSlcblx0fVxufVxuIl19