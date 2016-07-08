'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Inline = function (_Style) {
	_inherits(Inline, _Style);

	function Inline() {
		_classCallCheck(this, Inline);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Inline).apply(this, arguments));
	}

	_createClass(Inline, [{
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			var pr = this.wXml.$1('>rPr');
			pr && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.inline';
		}
	}]);

	return Inline;
}(_style2.default);

Inline.Properties = function (_Style$Properties) {
	_inherits(_class, _Style$Properties);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: 'rFonts',
		value: function rFonts(x) {
			var v = {},
			    t;
			if (t = x.attr('w:ascii')) v.ascii = t;else if (t = x.attr('w:asciiTheme')) v.ascii = this.wDoc.getFontTheme().get(t);

			if (t = x.attr('w:eastAsia')) v.asia = t;else if (t = x.attr('w:eastAsiaTheme')) v.asia = this.wDoc.getFontTheme().get(t);
			return v;
		}
	}, {
		key: 'b',
		value: function b(x) {
			return {};
		}
	}, {
		key: 'sz',
		value: function sz(x) {
			return this.pt2Px(parseFloat(x.attr('w:val')) / 2);
		}
	}, {
		key: 'color',
		value: function color(x) {
			return this.asColor(x.attr('w:val') || this.wDoc.getColorTheme().get(x.attr('w:themeColor')));
		}
	}, {
		key: 'i',
		value: function i(x) {
			return {};
		}
	}, {
		key: 'u',
		value: function u(x) {
			return this.asObject(x);
		}
	}, {
		key: 'bdr',
		value: function bdr(x) {
			var border = this.asObject(x);
			border.sz && (border.sz = border.sz / 8);
			border.color && (border.color = this.asColor(border.color));
			return border;
		}
	}, {
		key: 'lang',
		value: function lang(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'vertAlign',
		value: function vertAlign(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'highlight',
		value: function highlight(x) {
			return this.asColor(x.attr('w:val'));
		}
	}, {
		key: 'kern',
		value: function kern(x) {
			//word spacing
			return parseInt(x.attr('w:val')) / 2;
		}
	}, {
		key: 'w',
		value: function w(x) {
			//char scale
			return parseInt(x.attr('w:val')) / 100.0;
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			//char spacing
			return this.pt2Px(this.asPt(x.attr("w:val")));
		}
	}, {
		key: 'position',
		value: function position(x) {
			//baseline shift
			return this.pt2Px(this.asPt(x.attr("w:val")));
		}
	}, {
		key: 'smallCaps',
		value: function smallCaps() {
			return true;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'inline';
		}
	}]);

	return _class;
}(_style2.default.Properties);

exports.default = Inline;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBR1gsR0FBRSxXQUFVLFVBQVM7QUFDN0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsQ0FEeUI7QUFFN0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRjZCOzs7O3NCQUZiO0FBQUMsVUFBTyxjQUFQLENBQUQ7Ozs7UUFERzs7O09BUWI7Ozs7Ozs7Ozs7O3lCQUdDLEdBQUU7QUFDUixPQUFJLElBQUUsRUFBRjtPQUFLLENBQVQsQ0FEUTtBQUVSLE9BQUcsSUFBRSxFQUFFLElBQUYsQ0FBTyxTQUFQLENBQUYsRUFDRixFQUFFLEtBQUYsR0FBUSxDQUFSLENBREQsS0FFSyxJQUFHLElBQUUsRUFBRSxJQUFGLENBQU8sY0FBUCxDQUFGLEVBQ1AsRUFBRSxLQUFGLEdBQVEsS0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixDQUE3QixDQUFSLENBREk7O0FBR0wsT0FBRyxJQUFFLEVBQUUsSUFBRixDQUFPLFlBQVAsQ0FBRixFQUNGLEVBQUUsSUFBRixHQUFPLENBQVAsQ0FERCxLQUVLLElBQUcsSUFBRSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxDQUFGLEVBQ1AsRUFBRSxJQUFGLEdBQU8sS0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixDQUE3QixDQUFQLENBREk7QUFFTCxVQUFPLENBQVAsQ0FYUTs7OztvQkFhUCxHQUFFO0FBQ0gsVUFBTyxFQUFQLENBREc7Ozs7cUJBR0QsR0FBRTtBQUNKLFVBQU8sS0FBSyxLQUFMLENBQVcsV0FBVyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVgsSUFBNEIsQ0FBNUIsQ0FBbEIsQ0FESTs7Ozt3QkFHQyxHQUFFO0FBQ1AsVUFBTyxLQUFLLE9BQUwsQ0FBYyxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQW1CLEtBQUssSUFBTCxDQUFVLGFBQVYsR0FBMEIsR0FBMUIsQ0FBOEIsRUFBRSxJQUFGLENBQU8sY0FBUCxDQUE5QixDQUFuQixDQUFyQixDQURPOzs7O29CQUdOLEdBQUU7QUFDSCxVQUFPLEVBQVAsQ0FERzs7OztvQkFHRixHQUFFO0FBQ0gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERzs7OztzQkFHQSxHQUFFO0FBQ0wsT0FBSSxTQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQURDO0FBRUwsVUFBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUZLO0FBR0wsVUFBTyxLQUFQLEtBQWlCLE9BQU8sS0FBUCxHQUFhLEtBQUssT0FBTCxDQUFhLE9BQU8sS0FBUCxDQUExQixDQUFqQixDQUhLO0FBSUwsVUFBTyxNQUFQLENBSks7Ozs7dUJBTUQsR0FBRTtBQUNOLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRE07Ozs7NEJBR0csR0FBRTtBQUNYLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRFc7Ozs7NEJBR0YsR0FBRTtBQUNYLFVBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFiLENBQVAsQ0FEVzs7Ozt1QkFJUCxHQUFFOztBQUNOLFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsQ0FBMUIsQ0FERDs7OztvQkFJTCxHQUFFOztBQUNILFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsS0FBMUIsQ0FESjs7OzswQkFJSSxHQUFFOztBQUNULFVBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFWLENBQVgsQ0FBUCxDQURTOzs7OzJCQUlELEdBQUU7O0FBQ1YsVUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQUwsQ0FBVSxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVYsQ0FBWCxDQUFQLENBRFU7Ozs7OEJBSUE7QUFDVixVQUFPLElBQVAsQ0FEVTs7OztzQkE5RE07QUFBQyxVQUFPLFFBQVAsQ0FBRDs7Ozs7RUFEYyxnQkFBTSxVQUFOOztrQkFSWiIsImZpbGUiOiJpbmxpbmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZSBleHRlbmRzIFN0eWxle1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLmlubGluZSd9XG5cblx0X2l0ZXJhdGUoZixmYWN0b3JpZXMsdmlzaXRvcnMpe1xuXHRcdHZhciBwcj10aGlzLndYbWwuJDEoJz5yUHInKVxuXHRcdHByICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKVxuXHR9XG5cblx0c3RhdGljIFByb3BlcnRpZXM9Y2xhc3MgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRcdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnaW5saW5lJ31cblxuXHRcdHJGb250cyh4KXtcblx0XHRcdHZhciB2PXt9LHQ7XG5cdFx0XHRpZih0PXguYXR0cigndzphc2NpaScpKVxuXHRcdFx0XHR2LmFzY2lpPXRcblx0XHRcdGVsc2UgaWYodD14LmF0dHIoJ3c6YXNjaWlUaGVtZScpKVxuXHRcdFx0XHR2LmFzY2lpPXRoaXMud0RvYy5nZXRGb250VGhlbWUoKS5nZXQodClcblxuXHRcdFx0aWYodD14LmF0dHIoJ3c6ZWFzdEFzaWEnKSlcblx0XHRcdFx0di5hc2lhPXRcblx0XHRcdGVsc2UgaWYodD14LmF0dHIoJ3c6ZWFzdEFzaWFUaGVtZScpKVxuXHRcdFx0XHR2LmFzaWE9dGhpcy53RG9jLmdldEZvbnRUaGVtZSgpLmdldCh0KVxuXHRcdFx0cmV0dXJuIHZcblx0XHR9XG5cdFx0Yih4KXtcblx0XHRcdHJldHVybiB7fVxuXHRcdH1cblx0XHRzeih4KXtcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlRmxvYXQoeC5hdHRyKCd3OnZhbCcpKS8yKVxuXHRcdH1cblx0XHRjb2xvcih4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoKHguYXR0cigndzp2YWwnKSB8fCB0aGlzLndEb2MuZ2V0Q29sb3JUaGVtZSgpLmdldCh4LmF0dHIoJ3c6dGhlbWVDb2xvcicpKSkpXG5cdFx0fVxuXHRcdGkoeCl7XG5cdFx0XHRyZXR1cm4ge31cblx0XHR9XG5cdFx0dSh4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzT2JqZWN0KHgpXG5cdFx0fVxuXHRcdGJkcih4KXtcblx0XHRcdHZhciBib3JkZXI9dGhpcy5hc09iamVjdCh4KVxuXHRcdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0XHRyZXR1cm4gYm9yZGVyXG5cdFx0fVxuXHRcdGxhbmcoeCl7XG5cdFx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdFx0fVxuXHRcdHZlcnRBbGlnbih4KXtcblx0XHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0XHR9XG5cdFx0aGlnaGxpZ2h0KHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmF0dHIoJ3c6dmFsJykpXG5cdFx0fVxuXHRcdFxuXHRcdGtlcm4oeCl7Ly93b3JkIHNwYWNpbmdcblx0XHRcdHJldHVybiBwYXJzZUludCh4LmF0dHIoJ3c6dmFsJykpLzJcblx0XHR9XG5cdFx0XG5cdFx0dyh4KXsvL2NoYXIgc2NhbGVcblx0XHRcdHJldHVybiBwYXJzZUludCh4LmF0dHIoJ3c6dmFsJykpLzEwMC4wXG5cdFx0fVxuXHRcdFxuXHRcdHNwYWNpbmcoeCl7Ly9jaGFyIHNwYWNpbmdcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoXCJ3OnZhbFwiKSkpXG5cdFx0fVxuXHRcdFxuXHRcdHBvc2l0aW9uKHgpey8vYmFzZWxpbmUgc2hpZnRcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoXCJ3OnZhbFwiKSkpXG5cdFx0fVxuXHRcdFxuXHRcdHNtYWxsQ2Fwcygpe1xuXHRcdFx0cmV0dXJuIHRydWVcblx0XHR9XG5cdH1cbn1cbiJdfQ==