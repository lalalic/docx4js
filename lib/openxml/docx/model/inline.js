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
		value: function getStyleId() {
			return this._val('>rPr>rStyle');
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(_inline2.default.type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7K0JBQ1I7QUFDWCxVQUFPLEtBQUssSUFBTCxDQUFVLGFBQVYsQ0FBUCxDQURXOzs7O2tDQUdHO0FBQ2QsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLEtBQUssVUFBTCxFQUFwQixLQUEwQyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLFVBQWhCLENBQTJCLGlCQUFNLElBQU4sQ0FBckUsQ0FETzs7OztpQ0FHQSxJQUFHO0FBQ2pCLFVBQU8sQ0FBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsQ0FBRCxJQUE2QixJQUFJLGlCQUFNLFVBQU4sQ0FBaUIsRUFBckIsRUFBd0IsS0FBSyxJQUFMLEVBQVUsSUFBbEMsQ0FBN0IsQ0FEVTs7OztnQ0FHSixNQUFLO0FBQ2xCLFVBQU8sS0FBSyxTQUFMLElBQWdCLEtBQWhCLENBRFc7Ozs7Z0NBR047QUFDWixVQUFPLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxnQkFBYixDQUFQLENBRFk7Ozs7NkJBR0g7QUFDVCxVQUFPLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxhQUFiLENBQVAsQ0FEUzs7OztzQkFHTztBQUFDLFVBQU8sUUFBUCxDQUFEOzs7O1FBbkJHO0VBQWUsUUFBUSxVQUFSOztrQkFBZiIsImZpbGUiOiJpbmxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9pbmxpbmUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGlubGluZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGdldFN0eWxlSWQoKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+clByPnJTdHlsZScpXG5cdH1cblx0Z2V0TmFtZWRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuZ2V0U3R5bGVJZCgpKSB8fCB0aGlzLndEb2Muc3R5bGUuZ2V0RGVmYXVsdChTdHlsZS50eXBlKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnJQcicpKSAmJiBuZXcgU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmxvY2FsTmFtZT09J3JQcidcblx0fVxuXHRpc1dlYkhpZGRlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJDEoJz5yUHI+d2ViSGlkZGVuJylcblx0fVxuXHRpc0hpZGRlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJDEoJz5yUHI+dmFuaXNoJylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2lubGluZSd9XG59XG4iXX0=