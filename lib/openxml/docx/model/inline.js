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

		return _possibleConstructorReturn(this, (inline.__proto__ || Object.getPrototypeOf(inline)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaW5saW5lLmpzIl0sIm5hbWVzIjpbImlubGluZSIsImEiLCJfdmFsIiwid0RvYyIsInN0eWxlIiwiZ2V0RGVmYXVsdCIsIlN0eWxlIiwidHlwZSIsImlkIiwiZ2V0IiwiZ2V0U3R5bGVJZCIsInByIiwid1htbCIsIiQxIiwiUHJvcGVydGllcyIsImxvY2FsTmFtZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTTs7Ozs7Ozs7Ozs7NkJBQ1RDLEMsRUFBRTtBQUNaLFVBQU8sS0FBS0MsSUFBTCxDQUFVLGFBQVYsS0FBNkIsQ0FBQ0QsSUFBRSxLQUFLRSxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLFVBQWhCLENBQTJCQyxpQkFBTUMsSUFBakMsQ0FBSCxLQUE4Q04sRUFBRU8sRUFBcEY7QUFDQTs7O2tDQUNjO0FBQ2QsVUFBTyxLQUFLTCxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JLLEdBQWhCLENBQW9CLEtBQUtDLFVBQUwsRUFBcEIsQ0FBUDtBQUNBOzs7aUNBQ2NDLEUsRUFBRztBQUNqQixVQUFPLENBQUNBLEtBQUcsS0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWEsTUFBYixDQUFKLEtBQTZCLElBQUlQLGlCQUFNUSxVQUFWLENBQXFCSCxFQUFyQixFQUF3QixLQUFLUixJQUE3QixFQUFrQyxJQUFsQyxDQUFwQztBQUNBOzs7Z0NBQ2FTLEksRUFBSztBQUNsQixVQUFPQSxLQUFLRyxTQUFMLElBQWdCLEtBQXZCO0FBQ0E7OztnQ0FDWTtBQUNaLFVBQU8sS0FBS0gsSUFBTCxDQUFVQyxFQUFWLENBQWEsZ0JBQWIsQ0FBUDtBQUNBOzs7NkJBQ1M7QUFDVCxVQUFPLEtBQUtELElBQUwsQ0FBVUMsRUFBVixDQUFhLGFBQWIsQ0FBUDtBQUNBOzs7c0JBQ2dCO0FBQUMsVUFBTyxRQUFQO0FBQWdCOzs7O0VBbkJDRyxRQUFRLFVBQVIsQzs7a0JBQWZoQixNIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgaW5saW5lIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Z2V0U3R5bGVJZChhKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+clByPnJTdHlsZScpIHx8ICgoYT10aGlzLndEb2Muc3R5bGUuZ2V0RGVmYXVsdChTdHlsZS50eXBlKSkgJiYgYS5pZClcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpIFxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnJQcicpKSAmJiBuZXcgU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmxvY2FsTmFtZT09J3JQcidcblx0fVxuXHRpc1dlYkhpZGRlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJDEoJz5yUHI+d2ViSGlkZGVuJylcblx0fVxuXHRpc0hpZGRlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJDEoJz5yUHI+dmFuaXNoJylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2lubGluZSd9XG59XG4iXX0=