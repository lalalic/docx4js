'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var documentProperty = function (_require) {
	_inherits(documentProperty, _require);

	function documentProperty(wXml, b, c, name) {
		_classCallCheck(this, documentProperty);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(documentProperty).apply(this, arguments));

		_this.key = name.toLowerCase();
		_this.value = wXml.$1('>sdtContent').textContent.trim();
		if (!_this.wDoc.props[_this.key]) _this.wDoc.props[_this.key] = _this.value;
		return _this;
	}

	_createClass(documentProperty, null, [{
		key: 'type',
		get: function get() {}
	}]);

	return documentProperty;
}(require('./sdt'));

exports.default = documentProperty;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRQcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLGdCQUNwQixDQUFZLElBQVosRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBc0IsSUFBdEIsRUFBMkI7d0JBRFAsa0JBQ087O3FFQURQLDhCQUVWLFlBRGlCOztBQUUxQixRQUFLLEdBQUwsR0FBUyxLQUFLLFdBQUwsRUFBVCxDQUYwQjtBQUcxQixRQUFLLEtBQUwsR0FBVyxLQUFLLEVBQUwsQ0FBUSxhQUFSLEVBQXVCLFdBQXZCLENBQW1DLElBQW5DLEVBQVgsQ0FIMEI7QUFJMUIsTUFBRyxDQUFDLE1BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsTUFBSyxHQUFMLENBQWpCLEVBQ0YsTUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixNQUFLLEdBQUwsQ0FBaEIsR0FBMEIsTUFBSyxLQUFMLENBRDNCO2VBSjBCO0VBQTNCOztjQURvQjs7c0JBUUg7OztRQVJHO0VBQXlCLFFBQVEsT0FBUjs7a0JBQXpCIiwiZmlsZSI6ImRvY3VtZW50UHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBkb2N1bWVudFByb3BlcnR5IGV4dGVuZHMgcmVxdWlyZSgnLi9zZHQnKXtcblx0Y29uc3RydWN0b3Iod1htbCxiLGMsIG5hbWUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmtleT1uYW1lLnRvTG93ZXJDYXNlKClcblx0XHR0aGlzLnZhbHVlPXdYbWwuJDEoJz5zZHRDb250ZW50JykudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0aWYoIXRoaXMud0RvYy5wcm9wc1t0aGlzLmtleV0pXG5cdFx0XHR0aGlzLndEb2MucHJvcHNbdGhpcy5rZXldPXRoaXMudmFsdWVcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXsnZG9jdW1lbnRQcm9wZXJ0eSd9XG59XG4iXX0=