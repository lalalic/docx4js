'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hyperlink = function (_require) {
	_inherits(hyperlink, _require);

	function hyperlink(instruct) {
		_classCallCheck(this, hyperlink);

		var _this = _possibleConstructorReturn(this, (hyperlink.__proto__ || Object.getPrototypeOf(hyperlink)).apply(this, arguments));

		_this.link = '#' + instruct.split(/\s+/)[1];
		return _this;
	}

	_createClass(hyperlink, null, [{
		key: 'type',
		get: function get() {
			return 'field.ref';
		}
	}]);

	return hyperlink;
}(require('./hyperlink'));

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvcmVmLmpzIl0sIm5hbWVzIjpbImh5cGVybGluayIsImluc3RydWN0IiwiYXJndW1lbnRzIiwibGluayIsInNwbGl0IiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLFM7OztBQUNwQixvQkFBWUMsUUFBWixFQUFxQjtBQUFBOztBQUFBLHFIQUNYQyxTQURXOztBQUVwQixRQUFLQyxJQUFMLEdBQVUsTUFBSUYsU0FBU0csS0FBVCxDQUFlLEtBQWYsRUFBc0IsQ0FBdEIsQ0FBZDtBQUZvQjtBQUdwQjs7OztzQkFFZ0I7QUFBQyxVQUFPLFdBQVA7QUFBbUI7Ozs7RUFOQ0MsUUFBUSxhQUFSLEM7O2tCQUFsQkwsUyIsImZpbGUiOiJyZWYuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBoeXBlcmxpbmsgZXh0ZW5kcyByZXF1aXJlKCcuL2h5cGVybGluaycpe1xuXHRjb25zdHJ1Y3RvcihpbnN0cnVjdCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubGluaz0nIycraW5zdHJ1Y3Quc3BsaXQoL1xccysvKVsxXVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkLnJlZid9XG59XG4iXX0=