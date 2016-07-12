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
			var t, ascii, asia;
			if (t = x.attr('w:ascii')) ascii = t;else if (t = x.attr('w:asciiTheme')) ascii = this.wDoc.getFontTheme().get(t);

			if (t = x.attr('w:eastAsia')) asia = t;else if (t = x.attr('w:eastAsiaTheme')) asia = this.wDoc.getFontTheme().get(t);
			if (ascii || asia) return { ascii: ascii, asia: asia };
		}
	}, {
		key: 'b',
		value: function b(x) {
			return this.asToggle(x);
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
			return this.asToggle(x);
		}
	}, {
		key: 'vanish',
		value: function vanish(x) {
			return this.asToggle(x);
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
	}, {
		key: 'asToggle',
		value: function asToggle(x) {
			var val = x.attr('w:val');
			if (!val) {
				return -1;
			} else {
				return parseInt(val);
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBR1gsR0FBRSxXQUFVLFVBQVM7QUFDN0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsQ0FEeUI7QUFFN0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRjZCOzs7O3NCQUZiO0FBQUMsVUFBTyxjQUFQLENBQUQ7Ozs7UUFERzs7O09BUWI7Ozs7Ozs7Ozs7O3lCQUdDLEdBQUU7QUFDUixPQUFJLENBQUosRUFBTyxLQUFQLEVBQWMsSUFBZCxDQURRO0FBRVIsT0FBRyxJQUFFLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FBRixFQUNGLFFBQU0sQ0FBTixDQURELEtBRUssSUFBRyxJQUFFLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBRixFQUNQLFFBQU0sS0FBSyxJQUFMLENBQVUsWUFBVixHQUF5QixHQUF6QixDQUE2QixDQUE3QixDQUFOLENBREk7O0FBR0wsT0FBRyxJQUFFLEVBQUUsSUFBRixDQUFPLFlBQVAsQ0FBRixFQUNGLE9BQUssQ0FBTCxDQURELEtBRUssSUFBRyxJQUFFLEVBQUUsSUFBRixDQUFPLGlCQUFQLENBQUYsRUFDUCxPQUFLLEtBQUssSUFBTCxDQUFVLFlBQVYsR0FBeUIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBTCxDQURJO0FBRUwsT0FBRyxTQUFTLElBQVQsRUFDRixPQUFPLEVBQUMsWUFBRCxFQUFRLFVBQVIsRUFBUCxDQUREOzs7O29CQUdDLEdBQUU7QUFDSCxVQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQURHOzs7O3FCQUdELEdBQUU7QUFDSixVQUFPLEtBQUssS0FBTCxDQUFXLFdBQVcsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFYLElBQTRCLENBQTVCLENBQWxCLENBREk7Ozs7d0JBR0MsR0FBRTtBQUNQLFVBQU8sS0FBSyxPQUFMLENBQWMsRUFBRSxJQUFGLENBQU8sT0FBUCxLQUFtQixLQUFLLElBQUwsQ0FBVSxhQUFWLEdBQTBCLEdBQTFCLENBQThCLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBOUIsQ0FBbkIsQ0FBckIsQ0FETzs7OztvQkFHTixHQUFFO0FBQ0gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERzs7Ozt5QkFHRyxHQUFFO0FBQ1IsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FEUTs7OztvQkFHUCxHQUFFO0FBQ0gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERzs7OztzQkFHQSxHQUFFO0FBQ0wsT0FBSSxTQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQURDO0FBRUwsVUFBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUZLO0FBR0wsVUFBTyxLQUFQLEtBQWlCLE9BQU8sS0FBUCxHQUFhLEtBQUssT0FBTCxDQUFhLE9BQU8sS0FBUCxDQUExQixDQUFqQixDQUhLO0FBSUwsVUFBTyxNQUFQLENBSks7Ozs7dUJBTUQsR0FBRTtBQUNOLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRE07Ozs7NEJBR0csR0FBRTtBQUNYLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRFc7Ozs7NEJBR0YsR0FBRTtBQUNYLFVBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFiLENBQVAsQ0FEVzs7Ozt1QkFJUCxHQUFFOztBQUNOLFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsQ0FBMUIsQ0FERDs7OztvQkFJTCxHQUFFOztBQUNILFVBQU8sU0FBUyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVQsSUFBMEIsS0FBMUIsQ0FESjs7OzswQkFJSSxHQUFFOztBQUNULFVBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFWLENBQVgsQ0FBUCxDQURTOzs7OzJCQUlELEdBQUU7O0FBQ1YsVUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQUwsQ0FBVSxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVYsQ0FBWCxDQUFQLENBRFU7Ozs7OEJBSUE7QUFDVixVQUFPLElBQVAsQ0FEVTs7OzsyQkFJRixHQUFFO0FBQ1YsT0FBSSxNQUFJLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBSixDQURNO0FBRVYsT0FBRyxDQUFDLEdBQUQsRUFBSztBQUNQLFdBQU8sQ0FBQyxDQUFELENBREE7SUFBUixNQUVLO0FBQ0osV0FBTyxTQUFTLEdBQVQsQ0FBUCxDQURJO0lBRkw7Ozs7c0JBeEVnQjtBQUFDLFVBQU8sUUFBUCxDQUFEOzs7OztFQURjLGdCQUFNLFVBQU47O2tCQVJaIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUuaW5saW5lJ31cblxuXHRfaXRlcmF0ZShmLGZhY3Rvcmllcyx2aXNpdG9ycyl7XG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgnPnJQcicpXG5cdFx0cHIgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpXG5cdH1cblxuXHRzdGF0aWMgUHJvcGVydGllcz1jbGFzcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdFx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdpbmxpbmUnfVxuXG5cdFx0ckZvbnRzKHgpe1xuXHRcdFx0dmFyIHQsIGFzY2lpLCBhc2lhXG5cdFx0XHRpZih0PXguYXR0cigndzphc2NpaScpKVxuXHRcdFx0XHRhc2NpaT10XG5cdFx0XHRlbHNlIGlmKHQ9eC5hdHRyKCd3OmFzY2lpVGhlbWUnKSlcblx0XHRcdFx0YXNjaWk9dGhpcy53RG9jLmdldEZvbnRUaGVtZSgpLmdldCh0KVxuXG5cdFx0XHRpZih0PXguYXR0cigndzplYXN0QXNpYScpKVxuXHRcdFx0XHRhc2lhPXRcblx0XHRcdGVsc2UgaWYodD14LmF0dHIoJ3c6ZWFzdEFzaWFUaGVtZScpKVxuXHRcdFx0XHRhc2lhPXRoaXMud0RvYy5nZXRGb250VGhlbWUoKS5nZXQodClcblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0fVxuXHRcdGIoeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdH1cblx0XHRzeih4KXtcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlRmxvYXQoeC5hdHRyKCd3OnZhbCcpKS8yKVxuXHRcdH1cblx0XHRjb2xvcih4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoKHguYXR0cigndzp2YWwnKSB8fCB0aGlzLndEb2MuZ2V0Q29sb3JUaGVtZSgpLmdldCh4LmF0dHIoJ3c6dGhlbWVDb2xvcicpKSkpXG5cdFx0fVxuXHRcdGkoeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdH1cblx0XHR2YW5pc2goeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdH1cblx0XHR1KHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeClcblx0XHR9XG5cdFx0YmRyKHgpe1xuXHRcdFx0dmFyIGJvcmRlcj10aGlzLmFzT2JqZWN0KHgpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHRcdHJldHVybiBib3JkZXJcblx0XHR9XG5cdFx0bGFuZyh4KXtcblx0XHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0XHR9XG5cdFx0dmVydEFsaWduKHgpe1xuXHRcdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHRcdH1cblx0XHRoaWdobGlnaHQoeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguYXR0cigndzp2YWwnKSlcblx0XHR9XG5cdFx0XG5cdFx0a2Vybih4KXsvL3dvcmQgc3BhY2luZ1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSkvMlxuXHRcdH1cblx0XHRcblx0XHR3KHgpey8vY2hhciBzY2FsZVxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSkvMTAwLjBcblx0XHR9XG5cdFx0XG5cdFx0c3BhY2luZyh4KXsvL2NoYXIgc3BhY2luZ1xuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cihcInc6dmFsXCIpKSlcblx0XHR9XG5cdFx0XG5cdFx0cG9zaXRpb24oeCl7Ly9iYXNlbGluZSBzaGlmdFxuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cihcInc6dmFsXCIpKSlcblx0XHR9XG5cdFx0XG5cdFx0c21hbGxDYXBzKCl7XG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdH1cblx0XHRcblx0XHRhc1RvZ2dsZSh4KXtcblx0XHRcdGxldCB2YWw9eC5hdHRyKCd3OnZhbCcpXG5cdFx0XHRpZighdmFsKXtcblx0XHRcdFx0cmV0dXJuIC0xXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHBhcnNlSW50KHZhbClcblx0XHRcdH1cblx0XHR9XG5cdH1cbn1cbiJdfQ==