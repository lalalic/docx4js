'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hyperlink = function (_require) {
	_inherits(hyperlink, _require);

	function hyperlink(instruct) {
		_classCallCheck(this, hyperlink);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(hyperlink).apply(this, arguments));

		_this.link = '#' + instruct.split(/\s+/)[1];
		return _this;
	}

	return hyperlink;
}(require('./hyperlink'));

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvcmVmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLFNBQ3BCLENBQVksUUFBWixFQUFxQjt3QkFERCxXQUNDOztxRUFERCx1QkFFVixZQURXOztBQUVwQixRQUFLLElBQUwsR0FBVSxNQUFJLFNBQVMsS0FBVCxDQUFlLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBSixDQUZVOztFQUFyQjs7UUFEb0I7RUFBa0IsUUFBUSxhQUFSOztrQkFBbEIiLCJmaWxlIjoicmVmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgaHlwZXJsaW5rIGV4dGVuZHMgcmVxdWlyZSgnLi9oeXBlcmxpbmsnKXtcblx0Y29uc3RydWN0b3IoaW5zdHJ1Y3Qpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmxpbms9JyMnK2luc3RydWN0LnNwbGl0KC9cXHMrLylbMV1cblx0fVxufVxuIl19