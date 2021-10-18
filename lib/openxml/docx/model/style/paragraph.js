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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbIlBhcmFncmFwaCIsInYiLCJfdmFsIiwicGFyc2VJbnQiLCJnZXRQYXJlbnRTdHlsZSIsImdldE91dGxpbmVMZXZlbCIsImdldE51bUlkIiwicHJvdG90eXBlIiwiYXNOdW1iZXJpbmdTdHlsZSIsImNhbGwiLCJhcmd1bWVudHMiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJwciIsIndYbWwiLCIkMSIsImNvbnN0cnVjdG9yIiwiUHJvcGVydGllcyIsIndEb2MiLCJwYXJzZSIsIklubGluZSIsIk51bWJlcmluZyIsIkZyYW1lUHJvcGVydGllcyIsIlN0eWxlIiwieCIsImF0dHIiLCJhc09iamVjdCIsInB0MlB4IiwiYXNQdCIsImEiLCJyIiwibyIsImJlZm9yZUF1dG9zcGFjaW5nIiwiYmVmb3JlTGluZXMiLCJ0b3AiLCJiZWZvcmUiLCJhZnRlckF1dG9zcGFjaW5nIiwiYWZ0ZXJMaW5lcyIsImJvdHRvbSIsImFmdGVyIiwibGluZSIsImxpbmVSdWxlIiwibGluZUhlaWdodCIsImJkciIsImJpbmQiLCJBcnJheSIsImZyb20iLCJjaGlsZE5vZGVzIiwiZm9yRWFjaCIsImxvY2FsTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7a0NBQ0pDLEMsRUFBRTtBQUNqQixPQUFHLENBQUNBLElBQUUsS0FBS0MsSUFBTCxDQUFVLFlBQVYsQ0FBSCxLQUE2QixJQUFoQyxFQUNDLE9BQU9DLFNBQVNGLENBQVQsQ0FBUDtBQUNELE9BQUcsQ0FBQ0EsSUFBRSxLQUFLRyxjQUFMLEVBQUgsS0FBMkIsSUFBM0IsSUFBbUNILEVBQUVJLGVBQXhDLEVBQ0MsT0FBT0osRUFBRUksZUFBRixFQUFQO0FBQ0QsVUFBTyxDQUFDLENBQVI7QUFDQTs7OzJCQUNRSixDLEVBQUU7QUFDVixPQUFHLENBQUNBLElBQUUsS0FBS0MsSUFBTCxDQUFVLE9BQVYsQ0FBSCxLQUF3QixJQUEzQixFQUNDLE9BQU9ELENBQVA7QUFDRCxPQUFHLENBQUNBLElBQUUsS0FBS0csY0FBTCxFQUFILEtBQTJCLElBQTNCLElBQW1DSCxFQUFFSyxRQUF4QyxFQUNDLE9BQU9MLEVBQUVLLFFBQUYsRUFBUDtBQUNELFVBQU8sQ0FBQyxDQUFSO0FBQ0E7OztxQ0FDaUI7QUFBQTs7QUFDakIsVUFBTyw2Q0FBVUMsU0FBVixDQUFvQkMsZ0JBQXBCLEVBQXFDQyxJQUFyQywrQkFBMEMsSUFBMUMsb0NBQWtEQyxTQUFsRCxHQUFQO0FBQ0E7OzsyQkFDUUMsQyxFQUFHQyxTLEVBQVdDLFEsRUFBUztBQUMvQixPQUFJQyxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLEtBQWIsQ0FBUDtBQUNBRixTQUFNLElBQUksS0FBS0csV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0NKLEVBQWhDLEVBQW1DLEtBQUtLLElBQXhDLEVBQTZDLElBQTdDLEVBQW1EQyxLQUFuRCxDQUF5RFAsUUFBekQsQ0FBTjs7QUFFQSxJQUFDQyxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLEtBQWIsQ0FBSixLQUE0QixJQUFJSyxpQkFBT0gsVUFBWCxDQUFzQkosRUFBdEIsRUFBeUIsS0FBS0ssSUFBOUIsRUFBbUMsSUFBbkMsRUFBeUNDLEtBQXpDLENBQStDUCxRQUEvQyxDQUE1Qjs7QUFFQSxJQUFDQyxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE9BQWIsQ0FBSixLQUE4QixJQUFJTSxvQkFBVUosVUFBZCxDQUF5QkosRUFBekIsRUFBNEIsS0FBS0ssSUFBakMsRUFBc0MsSUFBdEMsRUFBNENDLEtBQTVDLENBQWtEUCxRQUFsRCxDQUE5Qjs7QUFFQSxJQUFDQyxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLFNBQWIsQ0FBSixLQUFnQyxJQUFJLEtBQUtDLFdBQUwsQ0FBaUJNLGVBQXJCLENBQXFDVCxFQUFyQyxFQUF3QyxLQUFLSyxJQUE3QyxFQUFrRCxJQUFsRCxFQUF3REMsS0FBeEQsQ0FBOERQLFFBQTlELENBQWhDO0FBQ0E7OztzQkFFZ0I7QUFBQyxVQUFPLGlCQUFQO0FBQXlCOzs7c0JBRXBCO0FBQUMsVUFBT0ssVUFBUDtBQUFrQjs7O3NCQUVkO0FBQUMsVUFBT0ssZUFBUDtBQUF1Qjs7OztFQWpDZEMsZTs7a0JBQWxCeEIsUzs7SUFtQ2ZrQixVOzs7Ozs7Ozs7OztxQkFDRk8sQyxFQUFFO0FBQ0osVUFBT0EsRUFBRUMsSUFBRixDQUFPLE9BQVAsQ0FBUDtBQUNBOzs7c0JBQ0dELEMsRUFBRTtBQUFBOztBQUNMLFVBQU8sS0FBS0UsUUFBTCxDQUFjRixDQUFkLEVBQWlCO0FBQUEsV0FBRyxPQUFLRyxLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVQyxDQUFWLENBQVgsQ0FBSDtBQUFBLElBQWpCLENBQVA7QUFDQTs7OzBCQUNPTCxDLEVBQUU7QUFDVCxPQUFJTSxJQUFFLEtBQUtKLFFBQUwsQ0FBY0YsQ0FBZCxDQUFOO0FBQUEsT0FBd0JPLElBQUUsRUFBMUI7O0FBRUEsT0FBRyxDQUFDRCxFQUFFRSxpQkFBSCxJQUF3QkYsRUFBRUcsV0FBN0IsRUFDQ0YsRUFBRUcsR0FBRixHQUFNLEtBQUtQLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVFLEVBQUVHLFdBQVosQ0FBWCxDQUFOLENBREQsS0FFSyxJQUFHSCxFQUFFSyxNQUFMLEVBQ0pKLEVBQUVHLEdBQUYsR0FBTSxLQUFLUCxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVRSxFQUFFSyxNQUFaLENBQVgsQ0FBTjs7QUFFRCxPQUFHLENBQUNMLEVBQUVNLGdCQUFILElBQXVCTixFQUFFTyxVQUE1QixFQUNDTixFQUFFTyxNQUFGLEdBQVMsS0FBS1gsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVUUsRUFBRU8sVUFBWixDQUFYLENBQVQsQ0FERCxLQUVLLElBQUdQLEVBQUVTLEtBQUwsRUFDSlIsRUFBRU8sTUFBRixHQUFTLEtBQUtYLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVFLEVBQUVTLEtBQVosQ0FBWCxDQUFUOztBQUVELE9BQUcsQ0FBQ1QsRUFBRVUsSUFBTixFQUNDLE9BQU9ULENBQVA7O0FBRUQsV0FBT1AsRUFBRWlCLFFBQVQ7QUFDQSxTQUFLLFNBQUw7QUFDQSxTQUFLLE9BQUw7QUFDQ1YsT0FBRVcsVUFBRixHQUFhLEtBQUtmLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVKLEVBQUVnQixJQUFaLENBQVgsQ0FBYjtBQUNBO0FBQ0QsU0FBSyxNQUFMO0FBQ0E7QUFDQ1QsT0FBRVcsVUFBRixHQUFjeEMsU0FBUzRCLEVBQUVVLElBQVgsSUFBaUIsR0FBakIsR0FBcUIsR0FBdEIsR0FBMkIsR0FBeEM7QUFQRDtBQVNBVCxLQUFFVSxRQUFGLEdBQVdqQixFQUFFaUIsUUFBYjtBQUNBLFVBQU9WLENBQVA7QUFDQTs7O3VCQUNJUCxDLEVBQUU7QUFDTixPQUFJTSxJQUFFLEVBQU47QUFDQSxPQUFJYSxNQUFJdkIsaUJBQU9ILFVBQVAsQ0FBa0JYLFNBQWxCLENBQTRCcUMsR0FBNUIsQ0FBZ0NDLElBQWhDLENBQXFDLElBQXJDLENBQVI7QUFDQUMsU0FBTUMsSUFBTixDQUFXdEIsRUFBRXVCLFVBQWIsRUFBeUJDLE9BQXpCLENBQWlDO0FBQUEsV0FBR25CLEVBQUVvQixTQUFGLEtBQWdCbkIsRUFBRUQsRUFBRW9CLFNBQUosSUFBZU4sSUFBSWQsQ0FBSixDQUEvQixDQUFIO0FBQUEsSUFBakM7QUFDQSxVQUFPQyxDQUFQO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFdBQVA7QUFBbUI7Ozs7RUF6Q2JQLGdCQUFNTixVOztJQTRDekJLLGU7Ozs7Ozs7Ozs7O3NCQUNZO0FBQUMsVUFBTyxPQUFQO0FBQWU7Ozs7RUFESkMsZ0JBQU1OLFUiLCJmaWxlIjoicGFyYWdyYXBoLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcbmltcG9ydCBOdW1iZXJpbmcgZnJvbSAnLi9udW1iZXJpbmcnXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhZ3JhcGggZXh0ZW5kcyBTdHlsZXtcblx0Z2V0T3V0bGluZUxldmVsKHYpe1xuXHRcdGlmKCh2PXRoaXMuX3ZhbCgnb3V0bGluZUx2bCcpKSE9bnVsbClcblx0XHRcdHJldHVybiBwYXJzZUludCh2KVxuXHRcdGlmKCh2PXRoaXMuZ2V0UGFyZW50U3R5bGUoKSkhPW51bGwgJiYgdi5nZXRPdXRsaW5lTGV2ZWwpXG5cdFx0XHRyZXR1cm4gdi5nZXRPdXRsaW5lTGV2ZWwoKVxuXHRcdHJldHVybiAtMVxuXHR9XG5cdGdldE51bUlkKHYpe1xuXHRcdGlmKCh2PXRoaXMuX3ZhbCgnbnVtSWQnKSkhPW51bGwpXG5cdFx0XHRyZXR1cm4gdlxuXHRcdGlmKCh2PXRoaXMuZ2V0UGFyZW50U3R5bGUoKSkhPW51bGwgJiYgdi5nZXROdW1JZClcblx0XHRcdHJldHVybiB2LmdldE51bUlkKClcblx0XHRyZXR1cm4gLTFcblx0fVxuXHRhc051bWJlcmluZ1N0eWxlKCl7XG5cdFx0cmV0dXJuIE51bWJlcmluZy5wcm90b3R5cGUuYXNOdW1iZXJpbmdTdHlsZS5jYWxsKHRoaXMsLi4uYXJndW1lbnRzKVxuXHR9XG5cdF9pdGVyYXRlKGYsIGZhY3RvcmllcywgdmlzaXRvcnMpe1xuXHRcdHZhciBwcj10aGlzLndYbWwuJDEoJ3BQcicpXG5cdFx0cHIgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXG5cdFx0KHByPXRoaXMud1htbC4kMSgnclByJykpICYmIG5ldyBJbmxpbmUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXG5cdFx0KHByPXRoaXMud1htbC4kMSgnbnVtUHInKSkgJiYgbmV3IE51bWJlcmluZy5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cblx0XHQocHI9dGhpcy53WG1sLiQxKCdmcmFtZVByJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLkZyYW1lUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5wYXJhZ3JhcGgnfVxuXG5cdHN0YXRpYyBnZXQgUHJvcGVydGllcygpe3JldHVybiBQcm9wZXJ0aWVzfVxuXG5cdHN0YXRpYyBnZXQgRnJhbWVQcm9wZXJ0aWVzKCl7cmV0dXJuIEZyYW1lUHJvcGVydGllc31cbn1cbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRqYyh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0aW5kKHgpe1xuXHRcdHJldHVybiB0aGlzLmFzT2JqZWN0KHgsIGE9PnRoaXMucHQyUHgodGhpcy5hc1B0KGEpKSlcblx0fVxuXHRzcGFjaW5nKHgpe1xuXHRcdHZhciByPXRoaXMuYXNPYmplY3QoeCksIG89e31cblxuXHRcdGlmKCFyLmJlZm9yZUF1dG9zcGFjaW5nICYmIHIuYmVmb3JlTGluZXMpXG5cdFx0XHRvLnRvcD10aGlzLnB0MlB4KHRoaXMuYXNQdChyLmJlZm9yZUxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5wdDJQeCh0aGlzLmFzUHQoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLnB0MlB4KHRoaXMuYXNQdChyLmFmdGVyTGluZXMpKVxuXHRcdGVsc2UgaWYoci5hZnRlcilcblx0XHRcdG8uYm90dG9tPXRoaXMucHQyUHgodGhpcy5hc1B0KHIuYWZ0ZXIpKVxuXG5cdFx0aWYoIXIubGluZSlcblx0XHRcdHJldHVybiBvXG5cblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XG5cdFx0Y2FzZSAnYXRMZWFzdCc6XG5cdFx0Y2FzZSAnZXhhY3QnOlxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMucHQyUHgodGhpcy5hc1B0KHgubGluZSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXG5cdFx0fVxuXHRcdG8ubGluZVJ1bGU9eC5saW5lUnVsZVxuXHRcdHJldHVybiBvXG5cdH1cblx0cEJkcih4KXtcblx0XHRsZXQgcj17fVxuXHRcdGxldCBiZHI9SW5saW5lLlByb3BlcnRpZXMucHJvdG90eXBlLmJkci5iaW5kKHRoaXMpXG5cdFx0QXJyYXkuZnJvbSh4LmNoaWxkTm9kZXMpLmZvckVhY2goYT0+YS5sb2NhbE5hbWUgJiYgKHJbYS5sb2NhbE5hbWVdPWJkcihhKSkpXG5cdFx0cmV0dXJuIHJcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3BhcmFncmFwaCd9XG59XG5cbmNsYXNzIEZyYW1lUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZnJhbWUnfVxufVxuIl19