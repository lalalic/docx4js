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
		key: "toProperty",
		value: function toProperty(node) {
			var _this2 = this;

			var attributes = node.attributes;
			var children = node.children;

			(children || []).forEach(function (a) {
				return attributes[a.name] = _this2.toProperty(a);
			});
			return attributes;
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this3 = this;

			var parts = this.parts;
			var p1 = this.getObjectPart("[Content_Types].xml").then(function (o) {
				return parts["[Content_Types].xml"] = o;
			});

			var p2 = Promise.all(Object.keys(this.rels).map(function (key) {
				var target = _this3.rels[key];
				return _this3.getObjectPart(target).then(function (o) {
					return parts[target] = _this3.rels[key] = o;
				});
			}));

			return Promise.all([p1, p2]).then(function (a) {
				return _this3.officeDocument.parse();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLEtBQUk7QUFDZCxVQUFPLElBQUksTUFBSixDQUFXLENBQUMsQ0FBRCxDQUFYLElBQWdCLElBQWhCLENBRE87Ozs7NkJBSUosTUFBSzs7O09BQ1YsYUFBc0IsS0FBdEIsV0FEVTtPQUNFLFdBQVUsS0FBVixTQURGOztBQUVmLElBQUMsWUFBVSxFQUFWLENBQUQsQ0FBZSxPQUFmLENBQXVCO1dBQUcsV0FBVyxFQUFFLElBQUYsQ0FBWCxHQUFtQixPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBbkI7SUFBSCxDQUF2QixDQUZlO0FBR2YsVUFBTyxVQUFQLENBSGU7Ozs7MEJBTVQ7OztBQUNOLE9BQU0sUUFBTSxLQUFLLEtBQUwsQ0FETjtBQUVOLE9BQUksS0FBRyxLQUFLLGFBQUwsQ0FBbUIscUJBQW5CLEVBQ0wsSUFESyxDQUNBO1dBQUcsTUFBTSxxQkFBTixJQUE2QixDQUE3QjtJQUFILENBREgsQ0FGRTs7QUFLTixPQUFJLEtBQUcsUUFBUSxHQUFSLENBQVksT0FBTyxJQUFQLENBQVksS0FBSyxJQUFMLENBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsZUFBSztBQUNsRCxRQUFJLFNBQU8sT0FBSyxJQUFMLENBQVUsR0FBVixDQUFQLENBRDhDO0FBRWxELFdBQU8sT0FBSyxhQUFMLENBQW1CLE1BQW5CLEVBQ0wsSUFESyxDQUNBO1lBQUcsTUFBTSxNQUFOLElBQWMsT0FBSyxJQUFMLENBQVUsR0FBVixJQUFlLENBQWY7S0FBakIsQ0FEUCxDQUZrRDtJQUFMLENBQXZDLENBQUgsQ0FMRTs7QUFXTixVQUFPLFFBQVEsR0FBUixDQUFZLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FBWixFQUFzQixJQUF0QixDQUEyQjtXQUFHLE9BQUssY0FBTCxDQUFvQixLQUFwQjtJQUFILENBQWxDLENBWE07Ozs7c0JBbEJLOzs7c0JBRUM7QUFBQyxVQUFPLGFBQVAsQ0FBRDs7Ozs7OztPQThCTiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9bmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzXG5cdFx0dGhpcy5yZWxzPXt9XG5cdFx0T2JqZWN0LmtleXMocmVscykuZm9yRWFjaChpZD0+e1xuXHRcdFx0bGV0IHJlbD1yZWxzW2lkXVxuXHRcdFx0dGhpcy5yZWxzW3JlbC50eXBlXT1yZWwudGFyZ2V0XG5cdFx0fSlcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cdFxuXHRjcmVhdGVFbGVtZW50KG5vZGUpe1xuXHRcdHJldHVybiBub2RlXG5cdH1cblxuXHRpc1Byb3BlcnR5KHRhZyl7XG5cdFx0cmV0dXJuIHRhZy5zdWJzdHIoLTIpPT0nUHInXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW59PW5vZGU7XG5cdFx0KGNoaWxkcmVufHxbXSkuZm9yRWFjaChhPT5hdHRyaWJ1dGVzW2EubmFtZV09dGhpcy50b1Byb3BlcnR5KGEpKVxuXHRcdHJldHVybiBhdHRyaWJ1dGVzXG5cdH1cblx0XG5cdHBhcnNlKCl7XG5cdFx0Y29uc3QgcGFydHM9dGhpcy5wYXJ0c1xuXHRcdGxldCBwMT10aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpXG5cdFx0XHQudGhlbihvPT5wYXJ0c1tcIltDb250ZW50X1R5cGVzXS54bWxcIl09bylcblx0XHRcdFxuXHRcdGxldCBwMj1Qcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChrZXk9Pntcblx0XHRcdGxldCB0YXJnZXQ9dGhpcy5yZWxzW2tleV1cblx0XHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQodGFyZ2V0KVxuXHRcdFx0XHQudGhlbihvPT5wYXJ0c1t0YXJnZXRdPXRoaXMucmVsc1trZXldPW8pXG5cdFx0fSkpXG5cdFx0XHRcdFxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbcDEsIHAyXSkudGhlbihhPT50aGlzLm9mZmljZURvY3VtZW50LnBhcnNlKCkpXG5cdH1cblx0XG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XG59XG5cbiJdfQ==