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
		value: function onToProperty(node) {
			var _this2 = this;

			var attributes = node.attributes;
			var children = node.children;

			(children || []).forEach(function (a) {
				var v = _this2.onToProperty(a);
				if (v != undefined) attributes[a.name] = v;
			});
			return attributes;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node) {
			return (0, _xmlObject.getable)(this.onToProperty(node));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLEtBQUk7QUFDZCxVQUFPLElBQUksTUFBSixDQUFXLENBQUMsQ0FBRCxDQUFYLElBQWdCLElBQWhCLENBRE87Ozs7K0JBSUYsTUFBSzs7O09BQ1osYUFBc0IsS0FBdEIsV0FEWTtPQUNBLFdBQVUsS0FBVixTQURBOztBQUVqQixJQUFDLFlBQVUsRUFBVixDQUFELENBQWUsT0FBZixDQUF1QixhQUFHO0FBQ3pCLFFBQUksSUFBRSxPQUFLLFlBQUwsQ0FBa0IsQ0FBbEIsQ0FBRixDQURxQjtBQUV6QixRQUFHLEtBQUcsU0FBSCxFQUNGLFdBQVcsRUFBRSxJQUFGLENBQVgsR0FBbUIsQ0FBbkIsQ0FERDtJQUZzQixDQUF2QixDQUZpQjtBQU9qQixVQUFPLFVBQVAsQ0FQaUI7Ozs7NkJBVVAsTUFBSztBQUNmLFVBQU8sd0JBQVEsS0FBSyxZQUFMLENBQWtCLElBQWxCLENBQVIsQ0FBUCxDQURlOzs7OzBCQUlUOzs7QUFDTixPQUFNLFFBQU0sS0FBSyxLQUFMLENBRE47QUFFTixPQUFJLEtBQUcsS0FBSyxhQUFMLENBQW1CLHFCQUFuQixFQUNMLElBREssQ0FDQTtXQUFHLE1BQU0scUJBQU4sSUFBNkIsQ0FBN0I7SUFBSCxDQURILENBRkU7O0FBS04sT0FBSSxLQUFHLFFBQVEsR0FBUixDQUFZLE9BQU8sSUFBUCxDQUFZLEtBQUssSUFBTCxDQUFaLENBQXVCLEdBQXZCLENBQTJCLGVBQUs7QUFDbEQsUUFBSSxTQUFPLE9BQUssSUFBTCxDQUFVLEdBQVYsQ0FBUCxDQUQ4QztBQUVsRCxXQUFPLE9BQUssYUFBTCxDQUFtQixNQUFuQixFQUNMLElBREssQ0FDQTtZQUFHLE1BQU0sTUFBTixJQUFjLE9BQUssSUFBTCxDQUFVLEdBQVYsSUFBZSxDQUFmO0tBQWpCLENBRFAsQ0FGa0Q7SUFBTCxDQUF2QyxDQUFILENBTEU7O0FBV04sVUFBTyxRQUFRLEdBQVIsQ0FBWSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBQVosRUFBc0IsSUFBdEIsQ0FBMkI7V0FBRyxPQUFLLGNBQUwsQ0FBb0IsS0FBcEI7SUFBSCxDQUFsQyxDQVhNOzs7O3NCQTFCSzs7O3NCQUVDO0FBQUMsVUFBTyxhQUFQLENBQUQ7Ozs7Ozs7T0FzQ04iLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi4veG1sT2JqZWN0XCJcbmltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz1uZXcgUGFydChcIlwiLHRoaXMpLnJlbHNcblx0XHR0aGlzLnJlbHM9e31cblx0XHRPYmplY3Qua2V5cyhyZWxzKS5mb3JFYWNoKGlkPT57XG5cdFx0XHRsZXQgcmVsPXJlbHNbaWRdXG5cdFx0XHR0aGlzLnJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXRcblx0XHR9KVxuXHRcdHRoaXMub2ZmaWNlRG9jdW1lbnQ9bmV3IHRoaXMuY29uc3RydWN0b3IuT2ZmaWNlRG9jdW1lbnQodGhpcy5yZWxzWydvZmZpY2VEb2N1bWVudCddLHRoaXMpXG5cdH1cblx0Z2V0IHZlbmRlcigpe1wiTWljcm9zb2Z0XCJ9XG5cblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cblx0XG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdGlzUHJvcGVydHkodGFnKXtcblx0XHRyZXR1cm4gdGFnLnN1YnN0cigtMik9PSdQcidcblx0fVxuXHRcblx0b25Ub1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7YXR0cmlidXRlcywgY2hpbGRyZW59PW5vZGU7XG5cdFx0KGNoaWxkcmVufHxbXSkuZm9yRWFjaChhPT57XG5cdFx0XHRsZXQgdj10aGlzLm9uVG9Qcm9wZXJ0eShhKVxuXHRcdFx0aWYodiE9dW5kZWZpbmVkKVxuXHRcdFx0XHRhdHRyaWJ1dGVzW2EubmFtZV09dlxuXHRcdH0pXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXNcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSl7XG5cdFx0cmV0dXJuIGdldGFibGUodGhpcy5vblRvUHJvcGVydHkobm9kZSkpXG5cdH1cblx0XG5cdHBhcnNlKCl7XG5cdFx0Y29uc3QgcGFydHM9dGhpcy5wYXJ0c1xuXHRcdGxldCBwMT10aGlzLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpXG5cdFx0XHQudGhlbihvPT5wYXJ0c1tcIltDb250ZW50X1R5cGVzXS54bWxcIl09bylcblx0XHRcdFxuXHRcdGxldCBwMj1Qcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChrZXk9Pntcblx0XHRcdGxldCB0YXJnZXQ9dGhpcy5yZWxzW2tleV1cblx0XHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQodGFyZ2V0KVxuXHRcdFx0XHQudGhlbihvPT5wYXJ0c1t0YXJnZXRdPXRoaXMucmVsc1trZXldPW8pXG5cdFx0fSkpXG5cdFx0XHRcdFxuXHRcdHJldHVybiBQcm9taXNlLmFsbChbcDEsIHAyXSkudGhlbihhPT50aGlzLm9mZmljZURvY3VtZW50LnBhcnNlKCkpXG5cdH1cblx0XG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1QYXJ0XG59XG5cbiJdfQ==