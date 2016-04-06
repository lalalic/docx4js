'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paragraph = require('./style/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paragraph = function (_require) {
	_inherits(paragraph, _require);

	function paragraph() {
		_classCallCheck(this, paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(paragraph).apply(this, arguments));
	}

	_createClass(paragraph, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>pPr>pStyle');
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(_paragraph2.default.type);
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			if (pr = this.wXml.$1('>pPr')) return new _paragraph2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'pPr';
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'paragraph';
		}
	}]);

	return paragraph;
}(require('../model'));

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUNxQjs7Ozs7Ozs7Ozs7NkJBQ1QsR0FBRTtBQUNaLFVBQU8sS0FBSyxJQUFMLENBQVUsYUFBVixDQUFQLENBRFk7Ozs7a0NBR0U7QUFDZCxVQUFPLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsS0FBSyxVQUFMLEVBQXBCLEtBQTBDLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsVUFBaEIsQ0FBMkIsb0JBQU0sSUFBTixDQUFyRSxDQURPOzs7O2lDQUdBLElBQUc7QUFDakIsT0FBRyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsRUFDRixPQUFPLElBQUksb0JBQU0sVUFBTixDQUFpQixFQUFyQixFQUF3QixLQUFLLElBQUwsRUFBVSxJQUFsQyxDQUFQLENBREQ7Ozs7Z0NBR2EsTUFBSztBQUNsQixVQUFPLEtBQUssU0FBTCxJQUFnQixLQUFoQixDQURXOzs7O3NCQUdGO0FBQUMsVUFBTyxXQUFQLENBQUQ7Ozs7UUFkRztFQUFrQixRQUFRLFVBQVI7O2tCQUFsQiIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvcGFyYWdyYXBoXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBhcmFncmFwaCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGdldFN0eWxlSWQoYSl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnBQcj5wU3R5bGUnKVxuXHR9XG5cdGdldE5hbWVkU3R5bGUoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldCh0aGlzLmdldFN0eWxlSWQoKSkgfHwgdGhpcy53RG9jLnN0eWxlLmdldERlZmF1bHQoU3R5bGUudHlwZSlcblx0fVxuXHRnZXREaXJlY3RTdHlsZShwcil7XG5cdFx0aWYocHI9dGhpcy53WG1sLiQxKCc+cFByJykpXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0X3Nob3VsZElnbm9yZSh3WG1sKXtcblx0XHRyZXR1cm4gd1htbC5sb2NhbE5hbWU9PSdwUHInXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdwYXJhZ3JhcGgnfVxufVxuIl19