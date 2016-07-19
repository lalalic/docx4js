"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

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
		_this.partMain = new _part2.default(_this.rels['officeDocument'], _this);
		return _this;
	}

	_createClass(_class, [{
		key: "getPart",
		value: function getPart(name) {
			var part = this.parts[name] || (name = this.rels[name]) && this.parts[name];
			if (!part) return null;

			if (_part2.default.is(part)) return part;

			return this.parts[name] = new _part2.default(name, this);
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

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssUUFBTCxHQUFjLG1CQUFTLE1BQUssSUFBTCxDQUFVLGdCQUFWLENBQVQsUUFBZCxDQVJZOztFQUFiOzs7OzBCQWNRLE1BQUs7QUFDWixPQUFJLE9BQUssS0FBSyxLQUFMLENBQVcsSUFBWCxLQUFxQixDQUFDLE9BQUssS0FBSyxJQUFMLENBQVUsSUFBVixDQUFMLENBQUQsSUFBd0IsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUF4QixDQURsQjtBQUVaLE9BQUcsQ0FBQyxJQUFELEVBQ0YsT0FBTyxJQUFQLENBREQ7O0FBR0EsT0FBRyxlQUFLLEVBQUwsQ0FBUSxJQUFSLENBQUgsRUFDQyxPQUFPLElBQVAsQ0FERDs7QUFHQSxVQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsSUFBaUIsbUJBQVMsSUFBVCxFQUFjLElBQWQsQ0FBakIsQ0FSSzs7OztzQkFKRDs7O3NCQUVDO0FBQUMsVUFBTyxhQUFQLENBQUQiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9bmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzXG5cdFx0dGhpcy5yZWxzPXt9XG5cdFx0T2JqZWN0LmtleXMocmVscykuZm9yRWFjaChpZD0+e1xuXHRcdFx0bGV0IHJlbD1yZWxzW2lkXVxuXHRcdFx0dGhpcy5yZWxzW3JlbC50eXBlXT1yZWwudGFyZ2V0XG5cdFx0fSlcblx0XHR0aGlzLnBhcnRNYWluPW5ldyBQYXJ0KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cblx0Z2V0UGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdIHx8ICgobmFtZT10aGlzLnJlbHNbbmFtZV0pJiZ0aGlzLnBhcnRzW25hbWVdKVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblxuXHRcdGlmKFBhcnQuaXMocGFydCkpXG5cdFx0XHRyZXR1cm4gcGFydFxuXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09bmV3IFBhcnQobmFtZSx0aGlzKVxuXHR9XG59XG5cbiJdfQ==