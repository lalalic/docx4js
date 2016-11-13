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

		return _possibleConstructorReturn(this, (Inline.__proto__ || Object.getPrototypeOf(Inline)).apply(this, arguments));
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

		return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbIklubGluZSIsImYiLCJmYWN0b3JpZXMiLCJ2aXNpdG9ycyIsInByIiwid1htbCIsIiQxIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwid0RvYyIsInBhcnNlIiwieCIsInQiLCJhc2NpaSIsImFzaWEiLCJhdHRyIiwiZ2V0Rm9udFRoZW1lIiwiZ2V0IiwiYXNUb2dnbGUiLCJwdDJQeCIsInBhcnNlRmxvYXQiLCJhc0NvbG9yIiwiZ2V0Q29sb3JUaGVtZSIsImFzT2JqZWN0IiwiYm9yZGVyIiwic3oiLCJjb2xvciIsInBhcnNlSW50IiwiYXNQdCIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxNOzs7Ozs7Ozs7OzsyQkFHWEMsQyxFQUFFQyxTLEVBQVVDLFEsRUFBUztBQUM3QixPQUFJQyxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBUDtBQUNBRixTQUFNLElBQUksS0FBS0csV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NKLEVBQWhDLEVBQW1DLEtBQUtLLElBQXhDLEVBQTZDLElBQTdDLEVBQW1EQyxLQUFuRCxDQUF5RFAsUUFBekQsQ0FBTjtBQUNBOzs7c0JBTGdCO0FBQUMsVUFBTyxjQUFQO0FBQXNCOzs7Ozs7QUFEcEJILE0sQ0FRYlEsVTs7Ozs7Ozs7Ozs7eUJBR0NHLEMsRUFBRTtBQUNSLE9BQUlDLENBQUosRUFBT0MsS0FBUCxFQUFjQyxJQUFkO0FBQ0EsT0FBR0YsSUFBRUQsRUFBRUksSUFBRixDQUFPLFNBQVAsQ0FBTCxFQUNDRixRQUFNRCxDQUFOLENBREQsS0FFSyxJQUFHQSxJQUFFRCxFQUFFSSxJQUFGLENBQU8sY0FBUCxDQUFMLEVBQ0pGLFFBQU0sS0FBS0osSUFBTCxDQUFVTyxZQUFWLEdBQXlCQyxHQUF6QixDQUE2QkwsQ0FBN0IsQ0FBTjs7QUFF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IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmxpbmUgZXh0ZW5kcyBTdHlsZXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5pbmxpbmUnfVxuXG5cdF9pdGVyYXRlKGYsZmFjdG9yaWVzLHZpc2l0b3JzKXtcblx0XHR2YXIgcHI9dGhpcy53WG1sLiQxKCc+clByJylcblx0XHRwciAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycylcblx0fVxuXG5cdHN0YXRpYyBQcm9wZXJ0aWVzPWNsYXNzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0XHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2lubGluZSd9XG5cblx0XHRyRm9udHMoeCl7XG5cdFx0XHR2YXIgdCwgYXNjaWksIGFzaWFcblx0XHRcdGlmKHQ9eC5hdHRyKCd3OmFzY2lpJykpXG5cdFx0XHRcdGFzY2lpPXRcblx0XHRcdGVsc2UgaWYodD14LmF0dHIoJ3c6YXNjaWlUaGVtZScpKVxuXHRcdFx0XHRhc2NpaT10aGlzLndEb2MuZ2V0Rm9udFRoZW1lKCkuZ2V0KHQpXG5cblx0XHRcdGlmKHQ9eC5hdHRyKCd3OmVhc3RBc2lhJykpXG5cdFx0XHRcdGFzaWE9dFxuXHRcdFx0ZWxzZSBpZih0PXguYXR0cigndzplYXN0QXNpYVRoZW1lJykpXG5cdFx0XHRcdGFzaWE9dGhpcy53RG9jLmdldEZvbnRUaGVtZSgpLmdldCh0KVxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHR9XG5cdFx0Yih4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0fVxuXHRcdHN6KHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VGbG9hdCh4LmF0dHIoJ3c6dmFsJykpLzIpXG5cdFx0fVxuXHRcdGNvbG9yKHgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcigoeC5hdHRyKCd3OnZhbCcpIHx8IHRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KHguYXR0cigndzp0aGVtZUNvbG9yJykpKSlcblx0XHR9XG5cdFx0aSh4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0fVxuXHRcdHZhbmlzaCh4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0fVxuXHRcdHUoeCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4KVxuXHRcdH1cblx0XHRiZHIoeCl7XG5cdFx0XHR2YXIgYm9yZGVyPXRoaXMuYXNPYmplY3QoeClcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdFx0cmV0dXJuIGJvcmRlclxuXHRcdH1cblx0XHRsYW5nKHgpe1xuXHRcdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHRcdH1cblx0XHR2ZXJ0QWxpZ24oeCl7XG5cdFx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdFx0fVxuXHRcdGhpZ2hsaWdodCh4KXtcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5hdHRyKCd3OnZhbCcpKVxuXHRcdH1cblx0XHRcblx0XHRrZXJuKHgpey8vd29yZCBzcGFjaW5nXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKS8yXG5cdFx0fVxuXHRcdFxuXHRcdHcoeCl7Ly9jaGFyIHNjYWxlXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKS8xMDAuMFxuXHRcdH1cblx0XHRcblx0XHRzcGFjaW5nKHgpey8vY2hhciBzcGFjaW5nXG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKFwidzp2YWxcIikpKVxuXHRcdH1cblx0XHRcblx0XHRwb3NpdGlvbih4KXsvL2Jhc2VsaW5lIHNoaWZ0XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKFwidzp2YWxcIikpKVxuXHRcdH1cblx0XHRcblx0XHRzbWFsbENhcHMoKXtcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdFxuXHRcdGFzVG9nZ2xlKHgpe1xuXHRcdFx0bGV0IHZhbD14LmF0dHIoJ3c6dmFsJylcblx0XHRcdGlmKCF2YWwpe1xuXHRcdFx0XHRyZXR1cm4gLTFcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VJbnQodmFsKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuIl19