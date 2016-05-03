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
			return this._val('>pPr>pStyle') || this.wDoc.style.getDefault(_paragraph2.default.type).id;
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUNxQjs7Ozs7Ozs7Ozs7NkJBQ1QsR0FBRTtBQUNaLFVBQU8sS0FBSyxJQUFMLENBQVUsYUFBVixLQUEwQixLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFVBQWhCLENBQTJCLG9CQUFNLElBQU4sQ0FBM0IsQ0FBdUMsRUFBdkMsQ0FEckI7Ozs7a0NBR0U7QUFDZCxVQUFPLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsS0FBSyxVQUFMLEVBQXBCLENBQVAsQ0FEYzs7OztpQ0FHQSxJQUFHO0FBQ2pCLE9BQUcsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsTUFBYixDQUFILEVBQ0YsT0FBTyxJQUFJLG9CQUFNLFVBQU4sQ0FBaUIsRUFBckIsRUFBd0IsS0FBSyxJQUFMLEVBQVUsSUFBbEMsQ0FBUCxDQUREOzs7O2dDQUdhLE1BQUs7QUFDbEIsVUFBTyxLQUFLLFNBQUwsSUFBZ0IsS0FBaEIsQ0FEVzs7OztzQkFHRjtBQUFDLFVBQU8sV0FBUCxDQUFEOzs7O1FBZEc7RUFBa0IsUUFBUSxVQUFSOztrQkFBbEIiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlL3BhcmFncmFwaFwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBwYXJhZ3JhcGggZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRnZXRTdHlsZUlkKGEpe1xuXHRcdHJldHVybiB0aGlzLl92YWwoJz5wUHI+cFN0eWxlJyl8fHRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFN0eWxlLnR5cGUpLmlkXG5cdH1cblx0Z2V0TmFtZWRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuZ2V0U3R5bGVJZCgpKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRpZihwcj10aGlzLndYbWwuJDEoJz5wUHInKSlcblx0XHRcdHJldHVybiBuZXcgU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmxvY2FsTmFtZT09J3BQcidcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3BhcmFncmFwaCd9XG59XG4iXX0=