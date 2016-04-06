'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bookmarkStart = function (_require) {
	_inherits(bookmarkStart, _require);

	function bookmarkStart() {
		_classCallCheck(this, bookmarkStart);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(bookmarkStart).apply(this, arguments));
	}

	_createClass(bookmarkStart, [{
		key: 'parse',
		value: function parse() {
			_get(Object.getPrototypeOf(bookmarkStart.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')] = this.wXml.attr('w:name');
		}
	}, {
		key: 'getName',
		value: function getName() {
			return this.wXml.attr('w:name');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'bookmarkStart';
		}
	}]);

	return bookmarkStart;
}(require('../model'));

exports.default = bookmarkStart;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvYm9va21hcmtTdGFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7Ozs7Ozs7OzswQkFDYjtBQUNOLDhCQUZtQixxREFFSixVQUFmLENBRE07QUFFTixRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLFFBQXZCLENBQWdDLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxNQUFmLENBQWhDLElBQXdELEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxRQUFmLENBQXhELENBRk07Ozs7NEJBSUU7QUFDUixVQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxRQUFmLENBQVAsQ0FEUTs7OztzQkFHUTtBQUFDLFVBQU8sZUFBUCxDQUFEOzs7O1FBUkc7RUFBc0IsUUFBUSxVQUFSOztrQkFBdEIiLCJmaWxlIjoiYm9va21hcmtTdGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGJvb2ttYXJrU3RhcnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRwYXJzZSgpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LmJvb2ttYXJrW3RoaXMud1htbC5hdHRyKCd3OmlkJyldPXRoaXMud1htbC5hdHRyKCd3Om5hbWUnKVxuXHR9XG5cdGdldE5hbWUoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6bmFtZScpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdib29rbWFya1N0YXJ0J31cbn1cbiJdfQ==