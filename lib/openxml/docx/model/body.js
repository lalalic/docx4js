'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = function (_require) {
	_inherits(Body, _require);

	function Body() {
		_classCallCheck(this, Body);

		return _possibleConstructorReturn(this, (Body.__proto__ || Object.getPrototypeOf(Body)).apply(this, arguments));
	}

	_createClass(Body, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('sectPr');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'body';
		}
	}]);

	return Body;
}(require('../model'));

exports.default = Body;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvYm9keS5qcyJdLCJuYW1lcyI6WyJCb2R5Iiwid1htbCIsIiQiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsSTs7Ozs7Ozs7Ozs7c0NBQ0Q7QUFDbEIsVUFBTyxLQUFLQyxJQUFMLENBQVVDLENBQVYsQ0FBWSxRQUFaLENBQVA7QUFDQTs7O3NCQUVnQjtBQUFDLFVBQU8sTUFBUDtBQUFjOzs7O0VBTENDLFFBQVEsVUFBUixDOztrQkFBYkgsSSIsImZpbGUiOiJib2R5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9keSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC4kKCdzZWN0UHInKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdib2R5J31cbn1cbiJdfQ==