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
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return Inline;
}(_style2.default);

exports.default = Inline;

var Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
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
	}], [{
		key: 'type',
		get: function get() {
			return 'inline';
		}
	}]);

	return Properties;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvaW5saW5lLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MkJBR1gsR0FBRSxXQUFVLFVBQVM7QUFDN0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUgsQ0FEeUI7QUFFN0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRjZCOzs7O3NCQUZiO0FBQUMsVUFBTyxjQUFQLENBQUQ7Ozs7c0JBT007QUFBQyxVQUFPLFVBQVAsQ0FBRDs7OztRQVJIOzs7OztJQVdmOzs7Ozs7Ozs7Ozt5QkFHRSxHQUFFO0FBQ1IsT0FBSSxJQUFFLEVBQUY7T0FBSyxDQUFULENBRFE7QUFFUixPQUFHLElBQUUsRUFBRSxJQUFGLENBQU8sU0FBUCxDQUFGLEVBQ0YsRUFBRSxLQUFGLEdBQVEsQ0FBUixDQURELEtBRUssSUFBRyxJQUFFLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBRixFQUNQLEVBQUUsS0FBRixHQUFRLEtBQUssSUFBTCxDQUFVLFlBQVYsR0FBeUIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBUixDQURJOztBQUdMLE9BQUcsSUFBRSxFQUFFLElBQUYsQ0FBTyxZQUFQLENBQUYsRUFDRixFQUFFLElBQUYsR0FBTyxDQUFQLENBREQsS0FFSyxJQUFHLElBQUUsRUFBRSxJQUFGLENBQU8saUJBQVAsQ0FBRixFQUNQLEVBQUUsSUFBRixHQUFPLEtBQUssSUFBTCxDQUFVLFlBQVYsR0FBeUIsR0FBekIsQ0FBNkIsQ0FBN0IsQ0FBUCxDQURJO0FBRUwsVUFBTyxDQUFQLENBWFE7Ozs7b0JBYVAsR0FBRTtBQUNILFVBQU8sRUFBUCxDQURHOzs7O3FCQUdELEdBQUU7QUFDSixVQUFPLFdBQVcsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFYLElBQTRCLENBQTVCLENBREg7Ozs7d0JBR0MsR0FBRTtBQUNQLFVBQU8sS0FBSyxPQUFMLENBQWMsRUFBRSxJQUFGLENBQU8sT0FBUCxLQUFtQixLQUFLLElBQUwsQ0FBVSxhQUFWLEdBQTBCLEdBQTFCLENBQThCLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBOUIsQ0FBbkIsQ0FBckIsQ0FETzs7OztvQkFHTixHQUFFO0FBQ0gsVUFBTyxFQUFQLENBREc7Ozs7b0JBR0YsR0FBRTtBQUNILFVBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFQLENBREc7Ozs7c0JBR0EsR0FBRTtBQUNMLE9BQUksU0FBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FEQztBQUVMLFVBQU8sRUFBUCxLQUFjLE9BQU8sRUFBUCxHQUFVLE9BQU8sRUFBUCxHQUFVLENBQVYsQ0FBeEIsQ0FGSztBQUdMLFVBQU8sS0FBUCxLQUFpQixPQUFPLEtBQVAsR0FBYSxLQUFLLE9BQUwsQ0FBYSxPQUFPLEtBQVAsQ0FBMUIsQ0FBakIsQ0FISztBQUlMLFVBQU8sTUFBUCxDQUpLOzs7O3VCQU1ELEdBQUU7QUFDTixVQUFPLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBUCxDQURNOzs7OzRCQUdHLEdBQUU7QUFDWCxVQUFPLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBUCxDQURXOzs7OzRCQUdGLEdBQUU7QUFDWCxVQUFPLEtBQUssT0FBTCxDQUFhLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBYixDQUFQLENBRFc7Ozs7c0JBMUNLO0FBQUMsVUFBTyxRQUFQLENBQUQ7Ozs7UUFEWjtFQUFtQixnQkFBTSxVQUFOIiwiZmlsZSI6ImlubGluZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5saW5lIGV4dGVuZHMgU3R5bGV7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUuaW5saW5lJ31cblxuXHRfaXRlcmF0ZShmLGZhY3Rvcmllcyx2aXNpdG9ycyl7XG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgnPnJQcicpXG5cdFx0cHIgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cbn1cblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnaW5saW5lJ31cblxuXHRyRm9udHMoeCl7XG5cdFx0dmFyIHY9e30sdDtcblx0XHRpZih0PXguYXR0cigndzphc2NpaScpKVxuXHRcdFx0di5hc2NpaT10XG5cdFx0ZWxzZSBpZih0PXguYXR0cigndzphc2NpaVRoZW1lJykpXG5cdFx0XHR2LmFzY2lpPXRoaXMud0RvYy5nZXRGb250VGhlbWUoKS5nZXQodClcblxuXHRcdGlmKHQ9eC5hdHRyKCd3OmVhc3RBc2lhJykpXG5cdFx0XHR2LmFzaWE9dFxuXHRcdGVsc2UgaWYodD14LmF0dHIoJ3c6ZWFzdEFzaWFUaGVtZScpKVxuXHRcdFx0di5hc2lhPXRoaXMud0RvYy5nZXRGb250VGhlbWUoKS5nZXQodClcblx0XHRyZXR1cm4gdlxuXHR9XG5cdGIoeCl7XG5cdFx0cmV0dXJuIHt9XG5cdH1cblx0c3ooeCl7XG5cdFx0cmV0dXJuIHBhcnNlRmxvYXQoeC5hdHRyKCd3OnZhbCcpKS8yXG5cdH1cblx0Y29sb3IoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNDb2xvcigoeC5hdHRyKCd3OnZhbCcpIHx8IHRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KHguYXR0cigndzp0aGVtZUNvbG9yJykpKSlcblx0fVxuXHRpKHgpe1xuXHRcdHJldHVybiB7fVxuXHR9XG5cdHUoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeClcblx0fVxuXHRiZHIoeCl7XG5cdFx0dmFyIGJvcmRlcj10aGlzLmFzT2JqZWN0KHgpXG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdHJldHVybiBib3JkZXJcblx0fVxuXHRsYW5nKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHR2ZXJ0QWxpZ24oeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGhpZ2hsaWdodCh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguYXR0cigndzp2YWwnKSlcblx0fVxufVxuIl19