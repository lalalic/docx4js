'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var text = function (_require) {
	_inherits(text, _require);

	function text() {
		_classCallCheck(this, text);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(text).apply(this, arguments));
	}

	_createClass(text, [{
		key: 'getText',
		value: function getText() {
			return this.wXml.textContent;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'text';
		}
	}]);

	return text;
}(require('../model'));

exports.default = text;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7NEJBRVg7QUFDUixVQUFPLEtBQUssSUFBTCxDQUFVLFdBQVYsQ0FEQzs7OztzQkFEUTtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O1FBREc7RUFBYSxRQUFRLFVBQVI7O2tCQUFiIiwiZmlsZSI6InRleHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyB0ZXh0IGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0ZXh0J31cblx0Z2V0VGV4dCgpe1xuXHRcdHJldHVybiB0aGlzLndYbWwudGV4dENvbnRlbnRcblx0fVxufVxuIl19