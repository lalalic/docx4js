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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(bookmarkEnd).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvYm9va21hcmtFbmQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUI7Ozs7Ozs7Ozs7OzRCQUNYO0FBQ1IsUUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixRQUF2QixDQUFnQyxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQWUsTUFBZixDQUFoQyxFQURROzs7O3NCQUdRO0FBQUMsVUFBTyxhQUFQLENBQUQ7Ozs7UUFKRztFQUFvQixRQUFRLGFBQVI7O2tCQUFwQiIsImZpbGUiOiJib29rbWFya0VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGJvb2ttYXJrRW5kIGV4dGVuZHMgcmVxdWlyZSgnLi9yYW5nZUJhc2UnKXtcblx0Z2V0TmFtZSgpe1xuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQuYm9va21hcmtbdGhpcy53WG1sLmF0dHIoJ3c6aWQnKV1cblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2Jvb2ttYXJrRW5kJ31cbn1cbiJdfQ==