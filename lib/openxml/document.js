"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _xmlObject = require("../xmlObject");

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		var rels = new _part2.default("", _this).rels;
		_this.rels = {};
		Object.keys(rels).forEach(function (id) {
			var rel = rels[id];
			_this.rels[rel.type] = rel.target;
		});
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.rels['officeDocument'], _this);
		return _this;
	}

	_createClass(_class, [{
		key: "createElement",
		value: function createElement(node) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(tag) {
			return tag.substr(-2) == 'Pr';
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			return node;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return (0, _xmlObject.getable)(this.onToProperty(node));
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this2 = this;

			var parts = this.parts;
			return this.getObjectPart("[Content_Types].xml").then(function (o) {
				return parts["[Content_Types].xml"] = o;
			}).then(function (a) {
				return _this2.officeDocument.parse();
			});
		}
	}, {
		key: "vender",
		get: function get() {}
	}, {
		key: "product",
		get: function get() {
			return 'Office 2010';
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _part2.default;
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLEtBQUk7QUFDZCxVQUFPLElBQUksTUFBSixDQUFXLENBQUMsQ0FBRCxDQUFYLElBQWdCLElBQWhCLENBRE87Ozs7K0JBSUYsTUFBTSxNQUFLO0FBQ3ZCLFVBQU8sSUFBUCxDQUR1Qjs7Ozs2QkFJYixNQUFLLE1BQUs7QUFDcEIsVUFBTyx3QkFBUSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsQ0FBUixDQUFQLENBRG9COzs7OzBCQUlkOzs7QUFDTixPQUFNLFFBQU0sS0FBSyxLQUFMLENBRE47QUFFTixVQUFPLEtBQUssYUFBTCxDQUFtQixxQkFBbkIsRUFDTCxJQURLLENBQ0E7V0FBRyxNQUFNLHFCQUFOLElBQTZCLENBQTdCO0lBQUgsQ0FEQSxDQUVMLElBRkssQ0FFQTtXQUFHLE9BQUssY0FBTCxDQUFvQixLQUFwQjtJQUFILENBRlAsQ0FGTTs7OztzQkFwQks7OztzQkFFQztBQUFDLFVBQU8sYUFBUCxDQUFEOzs7Ozs7O09BeUJOIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4uL3htbE9iamVjdFwiXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9bmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzXG5cdFx0dGhpcy5yZWxzPXt9XG5cdFx0T2JqZWN0LmtleXMocmVscykuZm9yRWFjaChpZD0+e1xuXHRcdFx0bGV0IHJlbD1yZWxzW2lkXVxuXHRcdFx0dGhpcy5yZWxzW3JlbC50eXBlXT1yZWwudGFyZ2V0XG5cdFx0fSlcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRyZXR1cm4gbm9kZVxuXHR9XG5cblx0aXNQcm9wZXJ0eSh0YWcpe1xuXHRcdHJldHVybiB0YWcuc3Vic3RyKC0yKT09J1ByJ1xuXHR9XG5cblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdHJldHVybiBub2RlXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsdHlwZSl7XG5cdFx0cmV0dXJuIGdldGFibGUodGhpcy5vblRvUHJvcGVydHkobm9kZSkpXG5cdH1cblxuXHRwYXJzZSgpe1xuXHRcdGNvbnN0IHBhcnRzPXRoaXMucGFydHNcblx0XHRyZXR1cm4gdGhpcy5nZXRPYmplY3RQYXJ0KFwiW0NvbnRlbnRfVHlwZXNdLnhtbFwiKVxuXHRcdFx0LnRoZW4obz0+cGFydHNbXCJbQ29udGVudF9UeXBlc10ueG1sXCJdPW8pXG5cdFx0XHQudGhlbihhPT50aGlzLm9mZmljZURvY3VtZW50LnBhcnNlKCkpXG5cdH1cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9UGFydFxufVxuIl19