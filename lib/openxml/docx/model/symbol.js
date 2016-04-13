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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(symbol).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3ltYm9sLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7Ozs7Ozs7Ozs0QkFFWDtBQUNSLFVBQU8sT0FBTyxZQUFQLENBQW9CLFNBQVMsT0FBSyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQUwsQ0FBN0IsQ0FBUCxDQURROzs7OzRCQUdBO0FBQ1IsVUFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLENBQVAsQ0FEUTs7OztzQkFKUTtBQUFDLFVBQU8sUUFBUCxDQUFEOzs7O1FBREc7RUFBZSxRQUFRLFFBQVI7O2tCQUFmIiwiZmlsZSI6InN5bWJvbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIHN5bWJvbCBleHRlbmRzIHJlcXVpcmUoJy4vdGV4dCcpe1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N5bWJvbCd9XG5cdGdldFRleHQoKXtcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShQYXJzZUludCgnMHgnK3RoaXMuX2F0dHIoJ3c6Y2hhcicpKSlcblx0fVxuXHRnZXRGb250KCl7XG5cdFx0cmV0dXJuIHRoaXMuX2F0dHIoJ3c6Zm9udCcpXG5cdH1cbn1cbiJdfQ==