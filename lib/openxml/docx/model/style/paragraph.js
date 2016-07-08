'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Paragraph = function (_Style) {
	_inherits(Paragraph, _Style);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Paragraph).apply(this, arguments));
	}

	_createClass(Paragraph, [{
		key: 'getOutlineLevel',
		value: function getOutlineLevel(v) {
			if ((v = this._val('outlineLvl')) != null) return parseInt(v);
			if ((v = this.getParentStyle()) != null && v.getOutlineLevel) return v.getOutlineLevel();
			return -1;
		}
	}, {
		key: 'getNumId',
		value: function getNumId(v) {
			if ((v = this._val('numId')) != null) return v;
			if ((v = this.getParentStyle()) != null && v.getNumId) return v.getNumId();
			return -1;
		}
	}, {
		key: 'asNumberingStyle',
		value: function asNumberingStyle() {
			var _Numbering$prototype$;

			return (_Numbering$prototype$ = _numbering2.default.prototype.asNumberingStyle).call.apply(_Numbering$prototype$, [this].concat(Array.prototype.slice.call(arguments)));
		}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			var pr = this.wXml.$1('pPr');
			pr && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('rPr')) && new _inline2.default.Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('numPr')) && new _numbering2.default.Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('framePr')) && new this.constructor.FrameProperties(pr, this.wDoc, this).parse(visitors);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.paragraph';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}, {
		key: 'FrameProperties',
		get: function get() {
			return FrameProperties;
		}
	}]);

	return Paragraph;
}(_style2.default);

exports.default = Paragraph;

var Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'jc',
		value: function jc(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'ind',
		value: function ind(x) {
			var _this3 = this;

			return this.asObject(x, function (a) {
				return _this3.pt2Px(_this3.asPt(a));
			});
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			var r = this.asObject(x),
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.pt2Px(this.asPt(r.beforeLines));else r.before;
			o.top = this.pt2Px(this.asPt(r.before));

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.pt2Px(this.asPt(r.afterLines));else r.after;
			o.bottom = this.pt2Px(this.asPt(r.after));

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.pt2Px(this.asPt(x.line));
					break;
				case 'auto':
				default:
					o.lineHeight = parseInt(r.line) * 100 / 240 + '%';
			}
			o.lineRule = x.lineRule;
			return o;
		}
	}, {
		key: 'pBdr',
		value: function pBdr(x) {
			var r = {};
			var bdr = _inline2.default.Properties.prototype.bdr.bind(this);
			Array.from(x.childNodes).forEach(function (a) {
				return a.localName && (r[a.localName] = bdr(a));
			});
			return r;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'paragraph';
		}
	}]);

	return Properties;
}(_style2.default.Properties);

var FrameProperties = function (_Style$Properties2) {
	_inherits(FrameProperties, _Style$Properties2);

	function FrameProperties() {
		_classCallCheck(this, FrameProperties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(FrameProperties).apply(this, arguments));
	}

	_createClass(FrameProperties, null, [{
		key: 'type',
		get: function get() {
			return 'frame';
		}
	}]);

	return FrameProperties;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUI7Ozs7Ozs7Ozs7O2tDQUNKLEdBQUU7QUFDakIsT0FBRyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsWUFBVixDQUFGLENBQUQsSUFBNkIsSUFBN0IsRUFDRixPQUFPLFNBQVMsQ0FBVCxDQUFQLENBREQ7QUFFQSxPQUFHLENBQUMsSUFBRSxLQUFLLGNBQUwsRUFBRixDQUFELElBQTJCLElBQTNCLElBQW1DLEVBQUUsZUFBRixFQUNyQyxPQUFPLEVBQUUsZUFBRixFQUFQLENBREQ7QUFFQSxVQUFPLENBQUMsQ0FBRCxDQUxVOzs7OzJCQU9ULEdBQUU7QUFDVixPQUFHLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQUYsQ0FBRCxJQUF3QixJQUF4QixFQUNGLE9BQU8sQ0FBUCxDQUREO0FBRUEsT0FBRyxDQUFDLElBQUUsS0FBSyxjQUFMLEVBQUYsQ0FBRCxJQUEyQixJQUEzQixJQUFtQyxFQUFFLFFBQUYsRUFDckMsT0FBTyxFQUFFLFFBQUYsRUFBUCxDQUREO0FBRUEsVUFBTyxDQUFDLENBQUQsQ0FMRzs7OztxQ0FPTzs7O0FBQ2pCLFVBQU8sNkNBQVUsU0FBVixDQUFvQixnQkFBcEIsRUFBcUMsSUFBckMsK0JBQTBDLHdDQUFRLFdBQWxELENBQVAsQ0FEaUI7Ozs7MkJBR1QsR0FBRyxXQUFXLFVBQVM7QUFDL0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxLQUFiLENBQUgsQ0FEMkI7QUFFL0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRitCOztBQUkvQixJ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ekIsQ0FBaUM7V0FBRyxFQUFFLFNBQUYsS0FBZ0IsRUFBRSxFQUFFLFNBQUYsQ0FBRixHQUFlLElBQUksQ0FBSixDQUFmLENBQWhCO0lBQUgsQ0FBakMsQ0FITTtBQUlOLFVBQU8sQ0FBUCxDQUpNOzs7O3NCQU1VO0FBQUMsVUFBTyxXQUFQLENBQUQ7Ozs7UUF6Q1o7RUFBbUIsZ0JBQU0sVUFBTjs7SUE0Q25COzs7Ozs7Ozs7OztzQkFDWTtBQUFDLFVBQU8sT0FBUCxDQUFEOzs7O1FBRFo7RUFBd0IsZ0JBQU0sVUFBTiIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuaW1wb3J0IE51bWJlcmluZyBmcm9tICcuL251bWJlcmluZydcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcmFncmFwaCBleHRlbmRzIFN0eWxle1xuXHRnZXRPdXRsaW5lTGV2ZWwodil7XG5cdFx0aWYoKHY9dGhpcy5fdmFsKCdvdXRsaW5lTHZsJykpIT1udWxsKVxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHYpXG5cdFx0aWYoKHY9dGhpcy5nZXRQYXJlbnRTdHlsZSgpKSE9bnVsbCAmJiB2LmdldE91dGxpbmVMZXZlbClcblx0XHRcdHJldHVybiB2LmdldE91dGxpbmVMZXZlbCgpXG5cdFx0cmV0dXJuIC0xXG5cdH1cblx0Z2V0TnVtSWQodil7XG5cdFx0aWYoKHY9dGhpcy5fdmFsKCdudW1JZCcpKSE9bnVsbClcblx0XHRcdHJldHVybiB2XG5cdFx0aWYoKHY9dGhpcy5nZXRQYXJlbnRTdHlsZSgpKSE9bnVsbCAmJiB2LmdldE51bUlkKVxuXHRcdFx0cmV0dXJuIHYuZ2V0TnVtSWQoKVxuXHRcdHJldHVybiAtMVxuXHR9XG5cdGFzTnVtYmVyaW5nU3R5bGUoKXtcblx0XHRyZXR1cm4gTnVtYmVyaW5nLnByb3RvdHlwZS5hc051bWJlcmluZ1N0eWxlLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXG5cdH1cblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7XG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgncFByJylcblx0XHRwciAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cblx0XHQocHI9dGhpcy53WG1sLiQxKCdyUHInKSkgJiYgbmV3IElubGluZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cblx0XHQocHI9dGhpcy53WG1sLiQxKCdudW1QcicpKSAmJiBuZXcgTnVtYmVyaW5nLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblxuXHRcdChwcj10aGlzLndYbWwuJDEoJ2ZyYW1lUHInKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuRnJhbWVQcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLnBhcmFncmFwaCd9XG5cblx0c3RhdGljIGdldCBQcm9wZXJ0aWVzKCl7cmV0dXJuIFByb3BlcnRpZXN9XG5cblx0c3RhdGljIGdldCBGcmFtZVByb3BlcnRpZXMoKXtyZXR1cm4gRnJhbWVQcm9wZXJ0aWVzfVxufVxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGpjKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRpbmQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeCwgYT0+dGhpcy5wdDJQeCh0aGlzLmFzUHQoYSkpKVxuXHR9XG5cdHNwYWNpbmcoeCl7XG5cdFx0dmFyIHI9dGhpcy5hc09iamVjdCh4KSwgbz17fVxuXG5cdFx0aWYoIXIuYmVmb3JlQXV0b3NwYWNpbmcgJiYgci5iZWZvcmVMaW5lcylcblx0XHRcdG8udG9wPXRoaXMucHQyUHgodGhpcy5hc1B0KHIuYmVmb3JlTGluZXMpKVxuXHRcdGVsc2UgKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5wdDJQeCh0aGlzLmFzUHQoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLnB0MlB4KHRoaXMuYXNQdChyLmFmdGVyTGluZXMpKVxuXHRcdGVsc2UgKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLnB0MlB4KHRoaXMuYXNQdChyLmFmdGVyKSlcblxuXHRcdGlmKCFyLmxpbmUpXG5cdFx0XHRyZXR1cm4gb1xuXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xuXHRcdGNhc2UgJ2F0TGVhc3QnOlxuXHRcdGNhc2UgJ2V4YWN0Jzpcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHBCZHIoeCl7XG5cdFx0bGV0IHI9e31cblx0XHRsZXQgYmRyPUlubGluZS5Qcm9wZXJ0aWVzLnByb3RvdHlwZS5iZHIuYmluZCh0aGlzKVxuXHRcdEFycmF5LmZyb20oeC5jaGlsZE5vZGVzKS5mb3JFYWNoKGE9PmEubG9jYWxOYW1lICYmIChyW2EubG9jYWxOYW1lXT1iZHIoYSkpKVxuXHRcdHJldHVybiByXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdwYXJhZ3JhcGgnfVxufVxuXG5jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZyYW1lJ31cbn1cbiJdfQ==