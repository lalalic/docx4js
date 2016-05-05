'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _inline = require('./style/inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inline = function (_require) {
	_inherits(inline, _require);

	function inline() {
		_classCallCheck(this, inline);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(inline).apply(this, arguments));
	}

	_createClass(inline, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>rPr>rStyle') || (a = this.wDoc.style.getDefault(_inline2.default.type)) && a.id;
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId());
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>rPr')) && new _inline2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'rPr';
		}
	}, {
		key: 'isWebHidden',
		value: function isWebHidden() {
			return this.wXml.$1('>rPr>webHidden');
		}
	}, {
		key: 'isHidden',
		value: function isHidden() {
			return this.wXml.$1('>rPr>vanish');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'inline';
		}
	}]);

	return inline;
}(require('../model'));

exports.default = inline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7NkJBQ1QsR0FBRTtBQUNaLFVBQU8sS0FBSyxJQUFMLENBQVUsYUFBVixLQUE2QixDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixVQUFoQixDQUEyQixpQkFBTSxJQUFOLENBQTdCLENBQUQsSUFBOEMsRUFBRSxFQUFGLENBRHRFOzs7O2tDQUdFO0FBQ2QsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLEtBQUssVUFBTCxFQUFwQixDQUFQLENBRGM7Ozs7aUNBR0EsSUFBRztBQUNqQixVQUFPLENBQUMsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsTUFBYixDQUFILENBQUQsSUFBNkIsSUFBSSxpQkFBTSxVQUFOLENBQWlCLEVBQXJCLEVBQXdCLEtBQUssSUFBTCxFQUFVLElBQWxDLENBQTdCLENBRFU7Ozs7Z0NBR0osTUFBSztBQUNsQixVQUFPLEtBQUssU0FBTCxJQUFnQixLQUFoQixDQURXOzs7O2dDQUdOO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsZ0JBQWIsQ0FBUCxDQURZOzs7OzZCQUdIO0FBQ1QsVUFBTyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsYUFBYixDQUFQLENBRFM7Ozs7c0JBR087QUFBQyxVQUFPLFFBQVAsQ0FBRDs7OztRQW5CRztFQUFlLFFBQVEsVUFBUjs7a0JBQWYiLCJmaWxlIjoiaW5saW5lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBpbmxpbmUgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRnZXRTdHlsZUlkKGEpe1xuXHRcdHJldHVybiB0aGlzLl92YWwoJz5yUHI+clN0eWxlJykgfHwgKChhPXRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFN0eWxlLnR5cGUpKSAmJiBhLmlkKVxuXHR9XG5cdGdldE5hbWVkU3R5bGUoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldCh0aGlzLmdldFN0eWxlSWQoKSkgXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+clByJykpICYmIG5ldyBTdHlsZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKVxuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwubG9jYWxOYW1lPT0nclByJ1xuXHR9XG5cdGlzV2ViSGlkZGVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC4kMSgnPnJQcj53ZWJIaWRkZW4nKVxuXHR9XG5cdGlzSGlkZGVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC4kMSgnPnJQcj52YW5pc2gnKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnaW5saW5lJ31cbn1cbiJdfQ==