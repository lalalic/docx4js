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
			return parseFloat(x.attr('w:val')) / 2;
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
			return this.asPt(x.attr("w:val"));
		}
	}, {
		key: 'position',
		value: function position(x) {
			//baseline shift
			return this.asPt(x.attr("w:val"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBR1gsR0FBRSxXQUFVLFVBQVM7QUFDN0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsQ0FEeUI7QUFFN0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRjZCOzs7O3NCQUZiO0FBQUMsVUFBTyxjQUFQLENBQUQ7Ozs7UUFERzs7O09BUWI7Ozs7Ozs7Ozs7O3lCQUdDLEdBQUU7QUFDUixPQUFJLElBQUUsRUFBRjtPQUFLLENBQVQsQ0FEUTtBQUVSLE9BQUcsSUFBRSxFQUFFLElBQUYsQ0FBTyxTQUFQLENBQUYsRUFDRixFQUFFLEtBQUYsR0FBUSxDQUFSLENBREQsS0FFSyxJQUFHLElBQUUsRUFBRSxJQUFGLENBQU8sY0FBUCxDQUFGLEVBQ1AsRUFBRSxLQUFGLEdBQVEsS0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixDQUE3QixDQUFSLENBREk7O0FBR0wsT0FBRyxJQUFFLEVBQUUsSUFBRixDQUFPLFlBQVAsQ0FBRixFQUNGLEVBQUUsSUFBRixHQUFPLENBQVAsQ0FERCxLQUVLLElBQUcsSUFBRSxFQUFFLElBQUYsQ0FBTyxpQkFBUCxDQUFGLEVBQ1AsRUFBRSxJQUFGLEdBQU8sS0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixDQUE3QixDQUFQLENBREk7QUFFTCxVQUFPLENBQVAsQ0FYUTs7OztvQkFhUCxHQUFFO0FBQ0gsVUFBTyxFQUFQLENBREc7Ozs7cUJBR0QsR0FBRTtBQUNKLFVBQU8sV0FBVyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVgsSUFBNEIsQ0FBNUIsQ0FESDs7Ozt3QkFHQyxHQUFFO0FBQ1AsVUFBTyxLQUFLLE9BQUwsQ0FBYyxFQUFFLElBQUYsQ0FBTyxPQUFQLEtBQW1CLEtBQUssSUFBTCxDQUFVLGFBQVYsR0FBMEIsR0FBMUIsQ0FBOEIsRUFBRSxJQUFGLENBQU8sY0FBUCxDQUE5QixDQUFuQixDQUFyQixDQURPOzs7O29CQUdOLEdBQUU7QUFDSCxVQUFPLEVBQVAsQ0FERzs7OztvQkFHRixHQUFFO0FBQ0gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERzs7OztzQkFHQSxHQUFFO0FBQ0wsT0FBSSxTQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQURDO0FBRUwsVUFBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUZLO0FBR0wsVUFBTyxLQUFQLEtBQWlCLE9BQU8sS0FBUCxHQUFhLEtBQUssT0FBTCxDQUFhLE9BQU8sS0FBUCxDQUExQixDQUFqQixDQUhLO0FBSUwsVUFBTyxNQUFQLENBSks7Ozs7dUJBTUQsR0FBRTtBQUNOLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRE07Ozs7NEJBR0csR0FBRTtBQUNYLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRFc7Ozs7NEJBR0YsR0FBRTtBQUNYLFVBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFiLENBQVAsQ0FEVzs7Ozt1QkFJUCxHQUFFOztBQUNOLFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsQ0FBMUIsQ0FERDs7OztvQkFJTCxHQUFFOztBQUNILFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsS0FBMUIsQ0FESjs7OzswQkFJSSxHQUFFOztBQUNULFVBQU8sS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFWLENBQVAsQ0FEUzs7OzsyQkFJRCxHQUFFOztBQUNWLFVBQU8sS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFWLENBQVAsQ0FEVTs7Ozs4QkFJQTtBQUNWLFVBQU8sSUFBUCxDQURVOzs7O3NCQTlETTtBQUFDLFVBQU8sUUFBUCxDQUFEOzs7OztFQURjLGdCQUFNLFVBQU47O2tCQVJaIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUuaW5saW5lJ31cblxuXHRfaXRlcmF0ZShmLGZhY3Rvcmllcyx2aXNpdG9ycyl7XG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgnPnJQcicpXG5cdFx0cHIgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpXG5cdH1cblxuXHRzdGF0aWMgUHJvcGVydGllcz1jbGFzcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdFx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdpbmxpbmUnfVxuXG5cdFx0ckZvbnRzKHgpe1xuXHRcdFx0dmFyIHY9e30sdDtcblx0XHRcdGlmKHQ9eC5hdHRyKCd3OmFzY2lpJykpXG5cdFx0XHRcdHYuYXNjaWk9dFxuXHRcdFx0ZWxzZSBpZih0PXguYXR0cigndzphc2NpaVRoZW1lJykpXG5cdFx0XHRcdHYuYXNjaWk9dGhpcy53RG9jLmdldEZvbnRUaGVtZSgpLmdldCh0KVxuXG5cdFx0XHRpZih0PXguYXR0cigndzplYXN0QXNpYScpKVxuXHRcdFx0XHR2LmFzaWE9dFxuXHRcdFx0ZWxzZSBpZih0PXguYXR0cigndzplYXN0QXNpYVRoZW1lJykpXG5cdFx0XHRcdHYuYXNpYT10aGlzLndEb2MuZ2V0Rm9udFRoZW1lKCkuZ2V0KHQpXG5cdFx0XHRyZXR1cm4gdlxuXHRcdH1cblx0XHRiKHgpe1xuXHRcdFx0cmV0dXJuIHt9XG5cdFx0fVxuXHRcdHN6KHgpe1xuXHRcdFx0cmV0dXJuIHBhcnNlRmxvYXQoeC5hdHRyKCd3OnZhbCcpKS8yXG5cdFx0fVxuXHRcdGNvbG9yKHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcigoeC5hdHRyKCd3OnZhbCcpIHx8IHRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KHguYXR0cigndzp0aGVtZUNvbG9yJykpKSlcblx0XHR9XG5cdFx0aSh4KXtcblx0XHRcdHJldHVybiB7fVxuXHRcdH1cblx0XHR1KHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeClcblx0XHR9XG5cdFx0YmRyKHgpe1xuXHRcdFx0dmFyIGJvcmRlcj10aGlzLmFzT2JqZWN0KHgpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHRcdHJldHVybiBib3JkZXJcblx0XHR9XG5cdFx0bGFuZyh4KXtcblx0XHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0XHR9XG5cdFx0dmVydEFsaWduKHgpe1xuXHRcdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHRcdH1cblx0XHRoaWdobGlnaHQoeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguYXR0cigndzp2YWwnKSlcblx0XHR9XG5cdFx0XG5cdFx0a2Vybih4KXsvL3dvcmQgc3BhY2luZ1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSkvMlxuXHRcdH1cblx0XHRcblx0XHR3KHgpey8vY2hhciBzY2FsZVxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSkvMTAwLjBcblx0XHR9XG5cdFx0XG5cdFx0c3BhY2luZyh4KXsvL2NoYXIgc3BhY2luZ1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNQdCh4LmF0dHIoXCJ3OnZhbFwiKSlcblx0XHR9XG5cdFx0XG5cdFx0cG9zaXRpb24oeCl7Ly9iYXNlbGluZSBzaGlmdFxuXHRcdFx0cmV0dXJuIHRoaXMuYXNQdCh4LmF0dHIoXCJ3OnZhbFwiKSlcblx0XHR9XG5cdFx0XG5cdFx0c21hbGxDYXBzKCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0fVxufVxuIl19