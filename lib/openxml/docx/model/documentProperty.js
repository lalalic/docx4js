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

		var _this = _possibleConstructorReturn(this, (documentProperty.__proto__ || Object.getPrototypeOf(documentProperty)).apply(this, arguments));

		_this.key = name.toLowerCase();
		_this.value = wXml.$1('>sdtContent').textContent.trim();
		if (!_this.wDoc.props[_this.key]) _this.wDoc.props[_this.key] = _this.value;
		return _this;
	}

	_createClass(documentProperty, null, [{
		key: 'type',
		get: function get() {
			return 'documentProperty';
		}
	}]);

	return documentProperty;
}(require('./sdt'));

exports.default = documentProperty;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRQcm9wZXJ0eS5qcyJdLCJuYW1lcyI6WyJkb2N1bWVudFByb3BlcnR5Iiwid1htbCIsImIiLCJjIiwibmFtZSIsImFyZ3VtZW50cyIsImtleSIsInRvTG93ZXJDYXNlIiwidmFsdWUiLCIkMSIsInRleHRDb250ZW50IiwidHJpbSIsIndEb2MiLCJwcm9wcyIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxnQjs7O0FBQ3BCLDJCQUFZQyxJQUFaLEVBQWlCQyxDQUFqQixFQUFtQkMsQ0FBbkIsRUFBc0JDLElBQXRCLEVBQTJCO0FBQUE7O0FBQUEsbUlBQ2pCQyxTQURpQjs7QUFFMUIsUUFBS0MsR0FBTCxHQUFTRixLQUFLRyxXQUFMLEVBQVQ7QUFDQSxRQUFLQyxLQUFMLEdBQVdQLEtBQUtRLEVBQUwsQ0FBUSxhQUFSLEVBQXVCQyxXQUF2QixDQUFtQ0MsSUFBbkMsRUFBWDtBQUNBLE1BQUcsQ0FBQyxNQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0IsTUFBS1AsR0FBckIsQ0FBSixFQUNDLE1BQUtNLElBQUwsQ0FBVUMsS0FBVixDQUFnQixNQUFLUCxHQUFyQixJQUEwQixNQUFLRSxLQUEvQjtBQUx5QjtBQU0xQjs7OztzQkFDZ0I7QUFBQyxVQUFPLGtCQUFQO0FBQTBCOzs7O0VBUkNNLFFBQVEsT0FBUixDOztrQkFBekJkLGdCIiwiZmlsZSI6ImRvY3VtZW50UHJvcGVydHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBkb2N1bWVudFByb3BlcnR5IGV4dGVuZHMgcmVxdWlyZSgnLi9zZHQnKXtcblx0Y29uc3RydWN0b3Iod1htbCxiLGMsIG5hbWUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmtleT1uYW1lLnRvTG93ZXJDYXNlKClcblx0XHR0aGlzLnZhbHVlPXdYbWwuJDEoJz5zZHRDb250ZW50JykudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0aWYoIXRoaXMud0RvYy5wcm9wc1t0aGlzLmtleV0pXG5cdFx0XHR0aGlzLndEb2MucHJvcHNbdGhpcy5rZXldPXRoaXMudmFsdWVcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2RvY3VtZW50UHJvcGVydHknfVxufVxuIl19