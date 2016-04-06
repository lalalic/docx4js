'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _shape = require('../model/shape');

var _shape2 = _interopRequireDefault(_shape);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var format = function () {
	function format(wXml, wDoc) {
		_classCallCheck(this, format);

		this.wXml = wXml;
		this.wDoc = wDoc;
		this._converter = new _shape2.default.Properties(null, wDoc, null);
		this._line = {};
		this._fill = { 0: {}, 1000: {} };
		this._bgFill = {};
		this._effect = {};
		this._font = {};
	}

	_createClass(format, [{
		key: 'line',
		value: function line(idx, t) {
			if (t = this._line[idx]) return t;
			return (t = this.wXml.$1('ln:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._line[idx] = this._converter.ln(t));
		}
	}, {
		key: 'fill',
		value: function fill(idx, t) {
			idx = parseInt(idx);
			if (idx > 1000) return this.bgFill(idx - 1000);

			if (t = this._fill[idx]) return t;
			return (t = this.wXml.$1('bgFillStyleLst>:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._fill[idx] = this._converter[t.localName](t));
		}
	}, {
		key: 'bgFill',
		value: function bgFill(idx, t) {
			if (t = this._bgFill[idx]) return t;
			return (t = this.wXml.$1('bgFillStyleLst>:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._bgFill[idx] = this._converter[t.localName](t));
		}
	}, {
		key: 'effect',
		value: function effect(idx, t) {
			if (t = this._effect[idx]) return t;
			return (t = this.wXml.$1('effectStyle:nth-child(' + (parseInt(idx) + 1) + ')>effectLst')) && (this._effect[idx] = this._converter.effectLst(t));
		}
	}, {
		key: 'font',
		value: function font(idx, t) {
			if (t = this._font[idx]) return t;
			return (t = this.wXml.$1('fontScheme>' + idx + 'Font>latin')) && (this._effect[idx] = t.attr('typeface'));
		}
	}]);

	return format;
}();

exports.default = format;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O0lBRXFCO0FBQ3BCLFVBRG9CLE1BQ3BCLENBQVksSUFBWixFQUFrQixJQUFsQixFQUF1Qjt3QkFESCxRQUNHOztBQUN0QixPQUFLLElBQUwsR0FBVSxJQUFWLENBRHNCO0FBRXRCLE9BQUssSUFBTCxHQUFVLElBQVYsQ0FGc0I7QUFHdEIsT0FBSyxVQUFMLEdBQWdCLElBQUksZ0JBQU0sVUFBTixDQUFpQixJQUFyQixFQUEwQixJQUExQixFQUErQixJQUEvQixDQUFoQixDQUhzQjtBQUl0QixPQUFLLEtBQUwsR0FBVyxFQUFYLENBSnNCO0FBS3RCLE9BQUssS0FBTCxHQUFXLEVBQUMsR0FBRSxFQUFGLEVBQUssTUFBSyxFQUFMLEVBQWpCLENBTHNCO0FBTXRCLE9BQUssT0FBTCxHQUFhLEVBQWIsQ0FOc0I7QUFPdEIsT0FBSyxPQUFMLEdBQWEsRUFBYixDQVBzQjtBQVF0QixPQUFLLEtBQUwsR0FBVyxFQUFYLENBUnNCO0VBQXZCOztjQURvQjs7dUJBWWYsS0FBSSxHQUFFO0FBQ1YsT0FBRyxJQUFFLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUNGLE9BQU8sQ0FBUCxDQUREO0FBRUEsVUFBTyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLG1CQUFpQixTQUFTLEdBQVQsSUFBYyxDQUFkLENBQWpCLEdBQWtDLEdBQWxDLENBQWYsQ0FBRCxLQUE0RCxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWdCLEtBQUssVUFBTCxDQUFnQixFQUFoQixDQUFtQixDQUFuQixDQUFoQixDQUE1RCxDQUhHOzs7O3VCQUtOLEtBQUssR0FBRTtBQUNYLFNBQUksU0FBUyxHQUFULENBQUosQ0FEVztBQUVYLE9BQUcsTUFBSSxJQUFKLEVBQ0YsT0FBTyxLQUFLLE1BQUwsQ0FBWSxNQUFJLElBQUosQ0FBbkIsQ0FERDs7QUFHQSxPQUFHLElBQUUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFGLEVBQ0YsT0FBTyxDQUFQLENBREQ7QUFFQSxVQUFPLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsZ0NBQThCLFNBQVMsR0FBVCxJQUFjLENBQWQsQ0FBOUIsR0FBK0MsR0FBL0MsQ0FBZixDQUFELEtBQXlFLEtBQUssS0FBTCxDQUFXLEdBQVgsSUFBZ0IsS0FBSyxVQUFMLENBQWdCLEVBQUUsU0FBRixDQUFoQixDQUE2QixDQUE3QixDQUFoQixDQUF6RSxDQVBJOzs7O3lCQVNMLEtBQUssR0FBRTtBQUNiLE9BQUcsSUFBRSxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQUYsRUFDRixPQUFPLENBQVAsQ0FERDtBQUVBLFVBQU8sQ0FBQyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxnQ0FBOEIsU0FBUyxHQUFULElBQWMsQ0FBZCxDQUE5QixHQUErQyxHQUEvQyxDQUFmLENBQUQsS0FBeUUsS0FBSyxPQUFMLENBQWEsR0FBYixJQUFrQixLQUFLLFVBQUwsQ0FBZ0IsRUFBRSxTQUFGLENBQWhCLENBQTZCLENBQTdCLENBQWxCLENBQXpFLENBSE07Ozs7eUJBS1AsS0FBSyxHQUFFO0FBQ2IsT0FBRyxJQUFFLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBRixFQUNGLE9BQU8sQ0FBUCxDQUREO0FBRUEsVUFBTyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLDRCQUEwQixTQUFTLEdBQVQsSUFBYyxDQUFkLENBQTFCLEdBQTJDLGFBQTNDLENBQWYsQ0FBRCxLQUErRSxLQUFLLE9BQUwsQ0FBYSxHQUFiLElBQWtCLEtBQUssVUFBTCxDQUFnQixTQUFoQixDQUEwQixDQUExQixDQUFsQixDQUEvRSxDQUhNOzs7O3VCQUtULEtBQUssR0FBRTtBQUNYLE9BQUcsSUFBRSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQUYsRUFDRixPQUFPLENBQVAsQ0FERDtBQUVBLFVBQU8sQ0FBQyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxnQkFBYyxHQUFkLEdBQWtCLFlBQWxCLENBQWYsQ0FBRCxLQUFxRCxLQUFLLE9BQUwsQ0FBYSxHQUFiLElBQWtCLEVBQUUsSUFBRixDQUFPLFVBQVAsQ0FBbEIsQ0FBckQsQ0FISTs7OztRQXBDUSIsImZpbGUiOiJmb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU2hhcGUgZnJvbSAnLi4vbW9kZWwvc2hhcGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvcm1hdHtcblx0Y29uc3RydWN0b3Iod1htbCwgd0RvYyl7XG5cdFx0dGhpcy53WG1sPXdYbWxcblx0XHR0aGlzLndEb2M9d0RvY1xuXHRcdHRoaXMuX2NvbnZlcnRlcj1uZXcgU2hhcGUuUHJvcGVydGllcyhudWxsLHdEb2MsbnVsbClcblx0XHR0aGlzLl9saW5lPXt9XG5cdFx0dGhpcy5fZmlsbD17MDp7fSwxMDAwOnt9fVxuXHRcdHRoaXMuX2JnRmlsbD17fVxuXHRcdHRoaXMuX2VmZmVjdD17fVxuXHRcdHRoaXMuX2ZvbnQ9e31cblxuXHR9XG5cdGxpbmUoaWR4LHQpe1xuXHRcdGlmKHQ9dGhpcy5fbGluZVtpZHhdKVxuXHRcdFx0cmV0dXJuIHRcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdsbjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fbGluZVtpZHhdPXRoaXMuX2NvbnZlcnRlci5sbih0KSlcblx0fVxuXHRmaWxsKGlkeCwgdCl7XG5cdFx0aWR4PXBhcnNlSW50KGlkeClcblx0XHRpZihpZHg+MTAwMClcblx0XHRcdHJldHVybiB0aGlzLmJnRmlsbChpZHgtMTAwMClcblxuXHRcdGlmKHQ9dGhpcy5fZmlsbFtpZHhdKVxuXHRcdFx0cmV0dXJuIHRcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdiZ0ZpbGxTdHlsZUxzdD46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2ZpbGxbaWR4XT10aGlzLl9jb252ZXJ0ZXJbdC5sb2NhbE5hbWVdKHQpKVxuXHR9XG5cdGJnRmlsbChpZHgsIHQpe1xuXHRcdGlmKHQ9dGhpcy5fYmdGaWxsW2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2JnRmlsbFN0eWxlTHN0PjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fYmdGaWxsW2lkeF09dGhpcy5fY29udmVydGVyW3QubG9jYWxOYW1lXSh0KSlcblx0fVxuXHRlZmZlY3QoaWR4LCB0KXtcblx0XHRpZih0PXRoaXMuX2VmZmVjdFtpZHhdKVxuXHRcdFx0cmV0dXJuIHRcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdlZmZlY3RTdHlsZTpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKT5lZmZlY3RMc3QnKSkgJiYgKHRoaXMuX2VmZmVjdFtpZHhdPXRoaXMuX2NvbnZlcnRlci5lZmZlY3RMc3QodCkpXG5cdH1cblx0Zm9udChpZHgsIHQpe1xuXHRcdGlmKHQ9dGhpcy5fZm9udFtpZHhdKVxuXHRcdFx0cmV0dXJuIHRcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdmb250U2NoZW1lPicraWR4KydGb250PmxhdGluJykpICYmICh0aGlzLl9lZmZlY3RbaWR4XT10LmF0dHIoJ3R5cGVmYWNlJykpXG5cdH1cbn1cbiJdfQ==