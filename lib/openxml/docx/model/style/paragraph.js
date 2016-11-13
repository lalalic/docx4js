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

		return _possibleConstructorReturn(this, (Paragraph.__proto__ || Object.getPrototypeOf(Paragraph)).apply(this, arguments));
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

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
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

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.pt2Px(this.asPt(r.beforeLines));else if (r.before) o.top = this.pt2Px(this.asPt(r.before));

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.pt2Px(this.asPt(r.afterLines));else if (r.after) o.bottom = this.pt2Px(this.asPt(r.after));

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

		return _possibleConstructorReturn(this, (FrameProperties.__proto__ || Object.getPrototypeOf(FrameProperties)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsInYiLCJfdmFsIiwicGFyc2VJbnQiLCJnZXRQYXJlbnRTdHlsZSIsImdldE91dGxpbmVMZXZlbCIsImdldE51bUlkIiwicHJvdG90eXBlIiwiYXNOdW1iZXJpbmdTdHlsZSIsImNhbGwiLCJhcmd1bWVudHMiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJwciIsIndYbWwiLCIkMSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIndEb2MiLCJwYXJzZSIsIkZyYW1lUHJvcGVydGllcyIsIngiLCJhdHRyIiwiYXNPYmplY3QiLCJwdDJQeCIsImFzUHQiLCJhIiwiciIsIm8iLCJiZWZvcmVBdXRvc3BhY2luZyIsImJlZm9yZUxpbmVzIiwidG9wIiwiYmVmb3JlIiwiYWZ0ZXJBdXRvc3BhY2luZyIsImFmdGVyTGluZXMiLCJib3R0b20iLCJhZnRlciIsImxpbmUiLCJsaW5lUnVsZSIsImxpbmVIZWlnaHQiLCJiZHIiLCJiaW5kIiwiQXJyYXkiLCJmcm9tIiwiY2hpbGROb2RlcyIsImZvckVhY2giLCJsb2NhbE5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7O2tDQUNKQyxDLEVBQUU7QUFDakIsT0FBRyxDQUFDQSxJQUFFLEtBQUtDLElBQUwsQ0FBVSxZQUFWLENBQUgsS0FBNkIsSUFBaEMsRUFDQyxPQUFPQyxTQUFTRixDQUFULENBQVA7QUFDRCxPQUFHLENBQUNBLElBQUUsS0FBS0csY0FBTCxFQUFILEtBQTJCLElBQTNCLElBQW1DSCxFQUFFSSxlQUF4QyxFQUNDLE9BQU9KLEVBQUVJLGVBQUYsRUFBUDtBQUNELFVBQU8sQ0FBQyxDQUFSO0FBQ0E7OzsyQkFDUUosQyxFQUFFO0FBQ1YsT0FBRyxDQUFDQSxJQUFFLEtB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QVgsQ0FBVDs7QUFFRCxPQUFHLENBQUNULEVBQUVVLElBQU4sRUFDQyxPQUFPVCxDQUFQOztBQUVELFdBQU9QLEVBQUVpQixRQUFUO0FBQ0EsU0FBSyxTQUFMO0FBQ0EsU0FBSyxPQUFMO0FBQ0NWLE9BQUVXLFVBQUYsR0FBYSxLQUFLZixLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSixFQUFFZ0IsSUFBWixDQUFYLENBQWI7QUFDQTtBQUNELFNBQUssTUFBTDtBQUNBO0FBQ0NULE9BQUVXLFVBQUYsR0FBY3JDLFNBQVN5QixFQUFFVSxJQUFYLElBQWlCLEdBQWpCLEdBQXFCLEdBQXRCLEdBQTJCLEdBQXhDO0FBUEQ7QUFTQVQsS0FBRVUsUUFBRixHQUFXakIsRUFBRWlCLFFBQWI7QUFDQSxVQUFPVixDQUFQO0FBQ0E7Ozt1QkFDSVAsQyxFQUFFO0FBQ04sT0FBSU0sSUFBRSxFQUFOO0FBQ0EsT0FBSWEsTUFBSSxpQkFBT3ZCLFVBQVAsQ0FBa0JYLFNBQWxCLENBQTRCa0MsR0FBNUIsQ0FBZ0NDLElBQWhDLENBQXFDLElBQXJDLENBQVI7QUFDQUMsU0FBTUMsSUFBTixDQUFXdEIsRUFBRXVCLFVBQWIsRUFBeUJDLE9BQXpCLENBQWlDO0FBQUEsV0FBR25CLEVBQUVvQixTQUFGLEtBQWdCbkIsRUFBRUQsRUFBRW9CLFNBQUosSUFBZU4sSUFBSWQsQ0FBSixDQUEvQixDQUFIO0FBQUEsSUFBakM7QUFDQSxVQUFPQyxDQUFQO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFdBQVA7QUFBbUI7Ozs7RUF6Q2IsZ0JBQU1WLFU7O0lBNEN6QkcsZTs7Ozs7Ozs7Ozs7c0JBQ1k7QUFBQyxVQUFPLE9BQVA7QUFBZTs7OztFQURKLGdCQUFNSCxVIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5pbXBvcnQgTnVtYmVyaW5nIGZyb20gJy4vbnVtYmVyaW5nJ1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyYWdyYXBoIGV4dGVuZHMgU3R5bGV7XG5cdGdldE91dGxpbmVMZXZlbCh2KXtcblx0XHRpZigodj10aGlzLl92YWwoJ291dGxpbmVMdmwnKSkhPW51bGwpXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodilcblx0XHRpZigodj10aGlzLmdldFBhcmVudFN0eWxlKCkpIT1udWxsICYmIHYuZ2V0T3V0bGluZUxldmVsKVxuXHRcdFx0cmV0dXJuIHYuZ2V0T3V0bGluZUxldmVsKClcblx0XHRyZXR1cm4gLTFcblx0fVxuXHRnZXROdW1JZCh2KXtcblx0XHRpZigodj10aGlzLl92YWwoJ251bUlkJykpIT1udWxsKVxuXHRcdFx0cmV0dXJuIHZcblx0XHRpZigodj10aGlzLmdldFBhcmVudFN0eWxlKCkpIT1udWxsICYmIHYuZ2V0TnVtSWQpXG5cdFx0XHRyZXR1cm4gdi5nZXROdW1JZCgpXG5cdFx0cmV0dXJuIC0xXG5cdH1cblx0YXNOdW1iZXJpbmdTdHlsZSgpe1xuXHRcdHJldHVybiBOdW1iZXJpbmcucHJvdG90eXBlLmFzTnVtYmVyaW5nU3R5bGUuY2FsbCh0aGlzLC4uLmFyZ3VtZW50cylcblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHR2YXIgcHI9dGhpcy53WG1sLiQxKCdwUHInKVxuXHRcdHByICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblxuXHRcdChwcj10aGlzLndYbWwuJDEoJ3JQcicpKSAmJiBuZXcgSW5saW5lLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblxuXHRcdChwcj10aGlzLndYbWwuJDEoJ251bVByJykpICYmIG5ldyBOdW1iZXJpbmcuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXG5cdFx0KHByPXRoaXMud1htbC4kMSgnZnJhbWVQcicpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5GcmFtZVByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUucGFyYWdyYXBoJ31cblxuXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cblxuXHRzdGF0aWMgZ2V0IEZyYW1lUHJvcGVydGllcygpe3JldHVybiBGcmFtZVByb3BlcnRpZXN9XG59XG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0amMoeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGluZCh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LCBhPT50aGlzLnB0MlB4KHRoaXMuYXNQdChhKSkpXG5cdH1cblx0c3BhY2luZyh4KXtcblx0XHR2YXIgcj10aGlzLmFzT2JqZWN0KHgpLCBvPXt9XG5cblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxuXHRcdFx0by50b3A9dGhpcy5wdDJQeCh0aGlzLmFzUHQoci5iZWZvcmVMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmJlZm9yZSlcblx0XHRcdG8udG9wPXRoaXMucHQyUHgodGhpcy5hc1B0KHIuYmVmb3JlKSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5wdDJQeCh0aGlzLmFzUHQoci5hZnRlckxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLnB0MlB4KHRoaXMuYXNQdChyLmFmdGVyKSlcblxuXHRcdGlmKCFyLmxpbmUpXG5cdFx0XHRyZXR1cm4gb1xuXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xuXHRcdGNhc2UgJ2F0TGVhc3QnOlxuXHRcdGNhc2UgJ2V4YWN0Jzpcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHBCZHIoeCl7XG5cdFx0bGV0IHI9e31cblx0XHRsZXQgYmRyPUlubGluZS5Qcm9wZXJ0aWVzLnByb3RvdHlwZS5iZHIuYmluZCh0aGlzKVxuXHRcdEFycmF5LmZyb20oeC5jaGlsZE5vZGVzKS5mb3JFYWNoKGE9PmEubG9jYWxOYW1lICYmIChyW2EubG9jYWxOYW1lXT1iZHIoYSkpKVxuXHRcdHJldHVybiByXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdwYXJhZ3JhcGgnfVxufVxuXG5jbGFzcyBGcmFtZVByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZyYW1lJ31cbn1cbiJdfQ==