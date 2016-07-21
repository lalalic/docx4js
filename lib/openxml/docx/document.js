"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _officeDocument = require("./officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "createElement",
		value: function createElement(node) {
			var name = node.name;
			var attributes = node.attributes;
			var children = node.children;

			var tag = name.split(':').pop();

			return node;
		}
	}], [{
		key: "ext",
		get: function get() {
			return 'docx';
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _officeDocument2.default;
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FPZSxNQUFLO09BQ1gsT0FBNEIsS0FBNUIsS0FEVztPQUNMLGFBQXNCLEtBQXRCLFdBREs7T0FDTyxXQUFVLEtBQVYsU0FEUDs7QUFFbEIsT0FBTSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZZOztBQUlsQixVQUFPLElBQVAsQ0FKa0I7Ozs7c0JBSkg7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7Ozs7OztPQUVUIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCBPZmZpY2VEb2N1bWVudCBmcm9tIFwiLi9vZmZpY2VEb2N1bWVudFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXHRcblx0c3RhdGljIE9mZmljZURvY3VtZW50PU9mZmljZURvY3VtZW50XG5cblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7bmFtZSwgYXR0cmlidXRlcywgY2hpbGRyZW59PW5vZGVcblx0XHRjb25zdCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxufVxuIl19