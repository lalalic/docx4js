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
			return this.asObject(x, this.asPt);
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			var r = this.asObject(x),
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.asPt(r.beforeLines);else r.before;
			o.top = this.asPt(r.before);

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.asPt(r.afterLines);else r.after;
			o.bottom = this.asPt(r.after);

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.asPt(x.line) + 'pt';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUI7Ozs7Ozs7Ozs7O2tDQUNKLEdBQUU7QUFDakIsT0FBRyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsWUFBVixDQUFGLENBQUQsSUFBNkIsSUFBN0IsRUFDRixPQUFPLFNBQVMsQ0FBVCxDQUFQLENBREQ7QUFFQSxPQUFHLENBQUMsSUFBRSxLQUFLLGNBQUwsRUFBRixDQUFELElBQTJCLElBQTNCLElBQW1DLEVBQUUsZUFBRixFQUNyQyxPQUFPLEVBQUUsZUFBRixFQUFQLENBREQ7QUFFQSxVQUFPLENBQUMsQ0FBRCxDQUxVOzs7OzJCQU9ULEdBQUU7QUFDVixPQUFHLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQUYsQ0FBRCxJQUF3QixJQUF4QixFQUNGLE9BQU8sQ0FBUCxDQUREO0FBRUEsT0FBRyxDQUFDLElBQUUsS0FBSyxjQUFMLEVBQUYsQ0FBRCxJQUEyQixJQUEzQixJQUFtQyxFQUFFLFFBQUYsRUFDckMsT0FBTyxFQUFFLFFBQUYsRUFBUCxDQUREO0FBRUEsVUFBTyxDQUFDLENBQUQsQ0FMRzs7OztxQ0FPTzs7O0FBQ2pCLFVBQU8sNkNBQVUsU0FBVixDQUFvQixnQkFBcEIsRUFBcUMsSUFBckMsK0JBQTBDLHdDQUFRLFdBQWxELENBQVAsQ0FEaUI7Ozs7MkJBR1QsR0FBRyxXQUFXLFVBQVM7QUFDL0IsT0FBSSxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxLQUFiLENBQUgsQ0FEMkI7QUFFL0IsU0FBTSxJQUFJLEtBQUssV0FBTCxDQUFpQixVQUFqQixDQUE0QixFQUFoQyxFQUFtQyxLQUFLLElBQUwsRUFBVSxJQUE3QyxFQUFtRCxLQUFuRCxDQUF5RCxRQUF6RCxDQUFOLENBRitCOztBQUkvQixJ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V0FBUCxDQUFEOzs7O1FBekNaO0VBQW1CLGdCQUFNLFVBQU47O0lBNENuQjs7Ozs7Ozs7Ozs7c0JBQ1k7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQURaO0VBQXdCLGdCQUFNLFVBQU4iLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcbmltcG9ydCBOdW1iZXJpbmcgZnJvbSAnLi9udW1iZXJpbmcnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZXtcblx0Z2V0T3V0bGluZUxldmVsKHYpe1xuXHRcdGlmKCh2PXRoaXMuX3ZhbCgnb3V0bGluZUx2bCcpKSE9bnVsbClcblx0XHRcdHJldHVybiBwYXJzZUludCh2KVxuXHRcdGlmKCh2PXRoaXMuZ2V0UGFyZW50U3R5bGUoKSkhPW51bGwgJiYgdi5nZXRPdXRsaW5lTGV2ZWwpXG5cdFx0XHRyZXR1cm4gdi5nZXRPdXRsaW5lTGV2ZWwoKVxuXHRcdHJldHVybiAtMVxuXHR9XG5cdGdldE51bUlkKHYpe1xuXHRcdGlmKCh2PXRoaXMuX3ZhbCgnbnVtSWQnKSkhPW51bGwpXG5cdFx0XHRyZXR1cm4gdlxuXHRcdGlmKCh2PXRoaXMuZ2V0UGFyZW50U3R5bGUoKSkhPW51bGwgJiYgdi5nZXROdW1JZClcblx0XHRcdHJldHVybiB2LmdldE51bUlkKClcblx0XHRyZXR1cm4gLTFcblx0fVxuXHRhc051bWJlcmluZ1N0eWxlKCl7XG5cdFx0cmV0dXJuIE51bWJlcmluZy5wcm90b3R5cGUuYXNOdW1iZXJpbmdTdHlsZS5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuXHR9XG5cdF9pdGVyYXRlKGYsIGZhY3RvcmllcywgdmlzaXRvcnMpe1xuXHRcdHZhciBwcj10aGlzLndYbWwuJDEoJ3BQcicpXG5cdFx0cHIgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXG5cdFx0KHByPXRoaXMud1htbC4kMSgnclByJykpICYmIG5ldyBJbmxpbmUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXG5cdFx0KHByPXRoaXMud1htbC4kMSgnbnVtUHInKSkgJiYgbmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cblx0XHQocHI9dGhpcy53WG1sLiQxKCdmcmFtZVByJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLkZyYW1lUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5wYXJhZ3JhcGgnfVxuXG5cdHN0YXRpYyBnZXQgUHJvcGVydGllcygpe3JldHVybiBQcm9wZXJ0aWVzfVxuXG5cdHN0YXRpYyBnZXQgRnJhbWVQcm9wZXJ0aWVzKCl7cmV0dXJuIEZyYW1lUHJvcGVydGllc31cbn1cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRqYyh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0aW5kKHgpe1xuXHRcdHJldHVybiB0aGlzLmFzT2JqZWN0KHgsIHRoaXMuYXNQdClcblx0fVxuXHRzcGFjaW5nKHgpe1xuXHRcdHZhciByPXRoaXMuYXNPYmplY3QoeCksIG89e31cblxuXHRcdGlmKCFyLmJlZm9yZUF1dG9zcGFjaW5nICYmIHIuYmVmb3JlTGluZXMpXG5cdFx0XHRvLnRvcD10aGlzLmFzUHQoci5iZWZvcmVMaW5lcylcblx0XHRlbHNlIChyLmJlZm9yZSlcblx0XHRcdG8udG9wPXRoaXMuYXNQdChyLmJlZm9yZSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5hc1B0KHIuYWZ0ZXJMaW5lcylcblx0XHRlbHNlIChyLmFmdGVyKVxuXHRcdFx0by5ib3R0b209dGhpcy5hc1B0KHIuYWZ0ZXIpXG5cblx0XHRpZighci5saW5lKVxuXHRcdFx0cmV0dXJuIG9cblxuXHRcdHN3aXRjaCh4LmxpbmVSdWxlKXtcblx0XHRjYXNlICdhdExlYXN0Jzpcblx0XHRjYXNlICdleGFjdCc6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9dGhpcy5hc1B0KHgubGluZSkrJ3B0J1xuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHBCZHIoeCl7XG5cdFx0bGV0IHI9e31cblx0XHRsZXQgYmRyPUlubGluZS5Qcm9wZXJ0aWVzLnByb3RvdHlwZS5iZHIuYmluZCh0aGlzKVxuXHRcdEFycmF5LmZyb20oeC5jaGlsZE5vZGVzKS5mb3JFYWNoKGE9PmEubG9jYWxOYW1lICYmIChyW2EubG9jYWxOYW1lXT1iZHIoYSkpKVxuXHRcdHJldHVybiByXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdwYXJhZ3JhcGgnfVxufVxuXG5jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZyYW1lJ31cbn1cbiJdfQ==