'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bookmarkEnd = function (_require) {
	_inherits(bookmarkEnd, _require);

	function bookmarkEnd() {
		_classCallCheck(this, bookmarkEnd);

		return _possibleConstructorReturn(this, (bookmarkEnd.__proto__ || Object.getPrototypeOf(bookmarkEnd)).apply(this, arguments));
	}

	_createClass(bookmarkEnd, [{
		key: 'getName',
		value: function getName() {
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')];
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'bookmarkEnd';
		}
	}]);

	return bookmarkEnd;
}(require('./rangeBase'));

exports.default = bookmarkEnd;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvYm9va21hcmtFbmQuanMiXSwibmFtZXMiOlsiYm9va21hcmtFbmQiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwiYm9va21hcmsiLCJ3WG1sIiwiYXR0ciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxXOzs7Ozs7Ozs7Ozs0QkFDWDtBQUNSLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsUUFBdkIsQ0FBZ0MsS0FBS0MsSUFBTCxDQUFVQyxJQUFWLENBQWUsTUFBZixDQUFoQztBQUNBOzs7c0JBQ2dCO0FBQUMsVUFBTyxhQUFQO0FBQXFCOzs7O0VBSkNDLFFBQVEsYUFBUixDOztrQkFBcEJOLFciLCJmaWxlIjoiYm9va21hcmtFbmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBib29rbWFya0VuZCBleHRlbmRzIHJlcXVpcmUoJy4vcmFuZ2VCYXNlJyl7XG5cdGdldE5hbWUoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LmJvb2ttYXJrW3RoaXMud1htbC5hdHRyKCd3OmlkJyldXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdib29rbWFya0VuZCd9XG59XG4iXX0=