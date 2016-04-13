'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var listStyles = function (_require) {
	_inherits(listStyles, _require);

	function listStyles() {
		_classCallCheck(this, listStyles);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(listStyles).apply(this, arguments));
	}

	_createClass(listStyles, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('abstractNum');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'listStyles';
		}
	}]);

	return listStyles;
}(require('../model'));

exports.default = listStyles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdFN0eWxlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7c0NBQ0Q7QUFDbEIsVUFBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksYUFBWixDQUFQLENBRGtCOzs7O3NCQUdGO0FBQUMsVUFBTyxZQUFQLENBQUQ7Ozs7UUFKRztFQUFtQixRQUFRLFVBQVI7O2tCQUFuQiIsImZpbGUiOiJsaXN0U3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGlzdFN0eWxlcyBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC4kKCdhYnN0cmFjdE51bScpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdsaXN0U3R5bGVzJ31cbn1cbiJdfQ==