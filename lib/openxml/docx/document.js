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
		key: "onCreateElement",
		value: function onCreateElement(node, type) {
			return node;
		}
	}, {
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name;
			var directStyle = node.attributes.directStyle;
			var children = node.children;

			var tag = name.split(':').pop();
			switch (tag) {
				case "p":
					if (directStyle && directStyle['w:numPr']) tag = "list";
					break;
			}

			return this.onCreateElement(node, tag);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0FPaUIsTUFBTSxNQUFLO0FBQzFCLFVBQU8sSUFBUCxDQUQwQjs7OztnQ0FJYixNQUFLO09BQ1gsU0FBUSxLQUFLLGNBQUwsQ0FBUixPQURXO09BRWIsT0FBMEMsS0FBMUMsS0FGYTtPQUVLLGNBQXdCLEtBQXBDLFdBQVksWUFGTDtPQUVtQixXQUFVLEtBQVYsU0FGbkI7O0FBR2xCLE9BQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUosQ0FIYztBQUlsQixXQUFPLEdBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxTQUFaLENBQWYsRUFDRixNQUFJLE1BQUosQ0FERDtBQUVELFdBSEE7QUFEQSxJQUprQjs7QUFXbEIsVUFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsR0FBM0IsQ0FBUCxDQVhrQjs7OztzQkFSSDtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7Ozs7O09BRVQiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29mZmljZURvY3VtZW50XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cdFxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRvbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXHRcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX0sIGNoaWxkcmVufT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godGFnKXtcblx0XHRjYXNlIFwicFwiOlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGVbJ3c6bnVtUHInXSlcblx0XHRcdFx0dGFnPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHR9XG5cdFx0XG5cdFx0cmV0dXJuIHRoaXMub25DcmVhdGVFbGVtZW50KG5vZGUsIHRhZylcblx0fVxufVxuIl19