'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var symbol = function (_require) {
	_inherits(symbol, _require);

	function symbol() {
		_classCallCheck(this, symbol);

		return _possibleConstructorReturn(this, (symbol.__proto__ || Object.getPrototypeOf(symbol)).apply(this, arguments));
	}

	_createClass(symbol, [{
		key: 'getText',
		value: function getText() {
			return String.fromCharCode(ParseInt('0x' + this._attr('w:char')));
		}
	}, {
		key: 'getFont',
		value: function getFont() {
			return this._attr('w:font');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'symbol';
		}
	}]);

	return symbol;
}(require('./text'));

exports.default = symbol;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3ltYm9sLmpzIl0sIm5hbWVzIjpbInN5bWJvbCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIlBhcnNlSW50IiwiX2F0dHIiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsTTs7Ozs7Ozs7Ozs7NEJBRVg7QUFDUixVQUFPQyxPQUFPQyxZQUFQLENBQW9CQyxTQUFTLE9BQUssS0FBS0MsS0FBTCxDQUFXLFFBQVgsQ0FBZCxDQUFwQixDQUFQO0FBQ0E7Ozs0QkFDUTtBQUNSLFVBQU8sS0FBS0EsS0FBTCxDQUFXLFFBQVgsQ0FBUDtBQUNBOzs7c0JBTmdCO0FBQUMsVUFBTyxRQUFQO0FBQWdCOzs7O0VBRENDLFFBQVEsUUFBUixDOztrQkFBZkwsTSIsImZpbGUiOiJzeW1ib2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBzeW1ib2wgZXh0ZW5kcyByZXF1aXJlKCcuL3RleHQnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzeW1ib2wnfVxuXHRnZXRUZXh0KCl7XG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoUGFyc2VJbnQoJzB4Jyt0aGlzLl9hdHRyKCd3OmNoYXInKSkpXG5cdH1cblx0Z2V0Rm9udCgpe1xuXHRcdHJldHVybiB0aGlzLl9hdHRyKCd3OmZvbnQnKVxuXHR9XG59XG4iXX0=