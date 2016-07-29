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
			return this.onCreateElement(node);
		}
	}, {
		key: "onCreateElement",
		value: function onCreateElement(node, type) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(node) {
			return node.name.substr(-2) == 'Pr';
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			return node;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return (0, _xmlObject.getable)(this.onToProperty(node, type));
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
		key: "dxa2Px",
		value: function dxa2Px(a) {
			return this.pt2Px(parseInt(a) / 20.0);
		}
	}, {
		key: "pt2Px",
		value: function pt2Px(pt) {
			return Math.ceil(pt * 96 / 72);
		}
	}, {
		key: "cm2Px",
		value: function cm2Px(cm) {
			return this.pt2Px(parseInt(cm) * 28.3464567 / 360000);
		}
	}, {
		key: "asColor",
		value: function asColor(v) {
			if (!v || v.length == 0 || v == 'auto') return '#000000';
			v = v.split(' ')[0];
			return v.charAt(0) == '#' ? v : RGB.test(v) ? '#' + v : v;
		}
	}, {
		key: "shadeColor",
		value: function shadeColor(color, percent) {
			if (!RGB.test(color)) return color;
			var R = parseInt(color.substring(1, 3), 16);
			var G = parseInt(color.substring(3, 5), 16);
			var B = parseInt(color.substring(5, 7), 16);

			R = parseInt(R * (100 + percent) / 100);
			G = parseInt(G * (100 + percent) / 100);
			B = parseInt(B * (100 + percent) / 100);

			R = R < 255 ? R : 255;
			G = G < 255 ? G : 255;
			B = B < 255 ? B : 255;

			var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
			var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
			var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

			return "#" + RR + GG + BB;
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

var RGB = /([a-fA-F0-9]{2}?){3}?/;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsQ0FBUCxDQURrQjs7OztrQ0FJSCxNQUFLLE1BQUs7QUFDekIsVUFBTyxJQUFQLENBRHlCOzs7OzZCQUlmLE1BQUs7QUFDZixVQUFPLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsQ0FBQyxDQUFELENBQWpCLElBQXNCLElBQXRCLENBRFE7Ozs7K0JBSUgsTUFBTSxNQUFLO0FBQ3ZCLFVBQU8sSUFBUCxDQUR1Qjs7Ozs2QkFJYixNQUFLLE1BQUs7QUFDcEIsVUFBTyx3QkFBUSxLQUFLLFlBQUwsQ0FBa0IsSUFBbEIsRUFBdUIsSUFBdkIsQ0FBUixDQUFQLENBRG9COzs7OzBCQUlkOzs7QUFDTixPQUFNLFFBQU0sS0FBSyxLQUFMLENBRE47QUFFTixVQUFPLEtBQUssYUFBTCxDQUFtQixxQkFBbkIsRUFDTCxJQURLLENBQ0E7V0FBRyxNQUFNLHFCQUFOLElBQTZCLENBQTdC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ZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4uL3htbE9iamVjdFwiXG5pbXBvcnQgUGFydCBmcm9tICcuL3BhcnQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9bmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzXG5cdFx0dGhpcy5yZWxzPXt9XG5cdFx0T2JqZWN0LmtleXMocmVscykuZm9yRWFjaChpZD0+e1xuXHRcdFx0bGV0IHJlbD1yZWxzW2lkXVxuXHRcdFx0dGhpcy5yZWxzW3JlbC50eXBlXT1yZWwudGFyZ2V0XG5cdFx0fSlcblx0XHR0aGlzLm9mZmljZURvY3VtZW50PW5ldyB0aGlzLmNvbnN0cnVjdG9yLk9mZmljZURvY3VtZW50KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSlcblx0fVxuXHRcblx0b25DcmVhdGVFbGVtZW50KG5vZGUsdHlwZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdGlzUHJvcGVydHkobm9kZSl7XG5cdFx0cmV0dXJuIG5vZGUubmFtZS5zdWJzdHIoLTIpPT0nUHInXG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSx0eXBlKXtcblx0XHRyZXR1cm4gZ2V0YWJsZSh0aGlzLm9uVG9Qcm9wZXJ0eShub2RlLHR5cGUpKVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHRjb25zdCBwYXJ0cz10aGlzLnBhcnRzXG5cdFx0cmV0dXJuIHRoaXMuZ2V0T2JqZWN0UGFydChcIltDb250ZW50X1R5cGVzXS54bWxcIilcblx0XHRcdC50aGVuKG89PnBhcnRzW1wiW0NvbnRlbnRfVHlwZXNdLnhtbFwiXT1vKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZSgpKVxuXHR9XG5cblx0ZHhhMlB4KGEpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGEpLzIwLjApXG5cdH1cblxuXHRwdDJQeChwdCl7XG5cdFx0cmV0dXJuIE1hdGguY2VpbChwdCo5Ni83Milcblx0fVxuXHRcblx0Y20yUHgoY20pe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KGNtKSoyOC4zNDY0NTY3LzM2MDAwMClcblx0fVxuXG5cdGFzQ29sb3Iodil7XG5cdFx0aWYoIXYgfHwgdi5sZW5ndGg9PTAgfHwgdj09J2F1dG8nKVxuXHRcdFx0cmV0dXJuICcjMDAwMDAwJ1xuXHRcdHY9di5zcGxpdCgnICcpWzBdXG5cdFx0cmV0dXJuIHYuY2hhckF0KDApPT0nIycgPyB2IDogKFJHQi50ZXN0KHYpID8gJyMnK3YgOiB2KVxuXHR9XG5cdHNoYWRlQ29sb3IoY29sb3IsIHBlcmNlbnQpIHtcblx0XHRpZighUkdCLnRlc3QoY29sb3IpKVxuXHRcdFx0cmV0dXJuIGNvbG9yXG5cdFx0dmFyIFIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwzKSwxNik7XG5cdFx0dmFyIEcgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMyw1KSwxNik7XG5cdFx0dmFyIEIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoNSw3KSwxNik7XG5cblx0XHRSID0gcGFyc2VJbnQoUiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cdFx0RyA9IHBhcnNlSW50KEcgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEIgPSBwYXJzZUludChCICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblxuXHRcdFIgPSAoUjwyNTUpP1I6MjU1O1xuXHRcdEcgPSAoRzwyNTUpP0c6MjU1O1xuXHRcdEIgPSAoQjwyNTUpP0I6MjU1O1xuXG5cdFx0dmFyIFJSID0gKChSLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK1IudG9TdHJpbmcoMTYpOlIudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgR0cgPSAoKEcudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrRy50b1N0cmluZygxNik6Ry50b1N0cmluZygxNikpO1xuXHRcdHZhciBCQiA9ICgoQi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitCLnRvU3RyaW5nKDE2KTpCLnRvU3RyaW5nKDE2KSk7XG5cblx0XHRyZXR1cm4gXCIjXCIrUlIrR0crQkI7XG5cdH1cblx0c3RhdGljIE9mZmljZURvY3VtZW50PVBhcnRcbn1cbmxldCBSR0I9LyhbYS1mQS1GMC05XXsyfT8pezN9Py87XG4iXX0=