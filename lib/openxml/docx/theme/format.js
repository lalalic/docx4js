'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var format = function () {
	function format(wXml, wDoc) {
		(0, _classCallCheck3.default)(this, format);

		return;
		this.wXml = wXml;
		this.wDoc = wDoc;
		this._converter = new Shape.Properties(null, wDoc, null);
		this._line = {};
		this._fill = { 0: {}, 1000: {} };
		this._bgFill = {};
		this._effect = {};
		this._font = {};
	}

	(0, _createClass3.default)(format, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsIndYbWwiLCJ3RG9jIiwiX2NvbnZlcnRlciIsIlNoYXBlIiwiUHJvcGVydGllcyIsIl9saW5lIiwiX2ZpbGwiLCJfYmdGaWxsIiwiX2VmZmVjdCIsIl9mb250IiwiaWR4IiwidCIsIiQxIiwicGFyc2VJbnQiLCJsbiIsImJnRmlsbCIsImxvY2FsTmFtZSIsImVmZmVjdExzdCIsImF0dHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLE07QUFDcEIsaUJBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXVCO0FBQUE7O0FBQ3RCO0FBQ0EsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsVUFBTCxHQUFnQixJQUFJQyxNQUFNQyxVQUFWLENBQXFCLElBQXJCLEVBQTBCSCxJQUExQixFQUErQixJQUEvQixDQUFoQjtBQUNBLE9BQUtJLEtBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQUMsR0FBRSxFQUFILEVBQU0sTUFBSyxFQUFYLEVBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLE9BQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQVg7QUFFQTs7Ozt1QkFDSUMsRyxFQUFJQyxDLEVBQUU7QUFDVixPQUFHQSxJQUFFLEtBQUtOLEtBQUwsQ0FBV0ssR0FBWCxDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSxtQkFBaUJDLFNBQVNILEdBQVQsSUFBYyxDQUEvQixJQUFrQyxHQUEvQyxDQUFILE1BQTRELEtBQUtMLEtBQUwsQ0FBV0ssR0FBWCxJQUFnQixLQUFLUixVQUFMLENBQWdCWSxFQUFoQixDQUFtQkgsQ0FBbkIsQ0FBNUUsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1hELFNBQUlHLFNBQVNILEdBQVQsQ0FBSjtBQUNBLE9BQUdBLE1BQUksSUFBUCxFQUNDLE9BQU8sS0FBS0ssTUFBTCxDQUFZTCxNQUFJLElBQWhCLENBQVA7O0FBRUQsT0FBR0MsSUFBRSxLQUFLTCxLQUFMLENBQVdJLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsZ0NBQThCQyxTQUFTSCxHQUFULElBQWMsQ0FBNUMsSUFBK0MsR0FBNUQsQ0FBSCxNQUF5RSxLQUFLSixLQUFMLENBQVdJLEdBQVgsSUFBZ0IsS0FBS1IsVUFBTCxDQUFnQlMsRUFBRUssU0FBbEIsRUFBNkJMLENBQTdCLENBQXpGLENBQVA7QUFDQTs7O3lCQUNNRCxHLEVBQUtDLEMsRUFBRTtBQUNiLE9BQUdBLElBQUUsS0FBS0osT0FBTCxDQUFhRyxHQUFiLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtYLElBQUwsQ0FBVVksRUFBVixDQUFhLGdDQUE4QkMsU0FBU0gsR0FBVCxJQUFjLENBQTVDLElBQStDLEdBQTVELENBQUgsTUFBeUUsS0FBS0gsT0FBTCxDQUFhRyxHQUFiLElBQWtCLEtBQUtSLFVBQUwsQ0FBZ0JTLEVBQUVLLFNBQWxCLEVBQTZCTCxDQUE3QixDQUEzRixDQUFQO0FBQ0E7Ozt5QkFDTUQsRyxFQUFLQyxDLEVBQUU7QUFDYixPQUFHQSxJQUFFLEtBQUtILE9BQUwsQ0FBYUUsR0FBYixDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSw0QkFBMEJDLFNBQVNILEdBQVQsSUFBYyxDQUF4QyxJQUEyQyxhQUF4RCxDQUFILE1BQStFLEtBQUtGLE9BQUwsQ0FBYUUsR0FBYixJQUFrQixLQUFLUixVQUFMLENBQWdCZSxTQUFoQixDQUEwQk4sQ0FBMUIsQ0FBakcsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1gsT0FBR0EsSUFBRSxLQUFLRixLQUFMLENBQVdDLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsZ0JBQWNGLEdBQWQsR0FBa0IsWUFBL0IsQ0FBSCxNQUFxRCxLQUFLRixPQUFMLENBQWFFLEdBQWIsSUFBa0JDLEVBQUVPLElBQUYsQ0FBTyxVQUFQLENBQXZFLENBQVA7QUFDQTs7Ozs7a0JBekNtQm5CLE0iLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZm9ybWF0e1xyXG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2Mpe1xyXG5cdFx0cmV0dXJuXHJcblx0XHR0aGlzLndYbWw9d1htbFxyXG5cdFx0dGhpcy53RG9jPXdEb2NcclxuXHRcdHRoaXMuX2NvbnZlcnRlcj1uZXcgU2hhcGUuUHJvcGVydGllcyhudWxsLHdEb2MsbnVsbClcclxuXHRcdHRoaXMuX2xpbmU9e31cclxuXHRcdHRoaXMuX2ZpbGw9ezA6e30sMTAwMDp7fX1cclxuXHRcdHRoaXMuX2JnRmlsbD17fVxyXG5cdFx0dGhpcy5fZWZmZWN0PXt9XHJcblx0XHR0aGlzLl9mb250PXt9XHJcblxyXG5cdH1cclxuXHRsaW5lKGlkeCx0KXtcclxuXHRcdGlmKHQ9dGhpcy5fbGluZVtpZHhdKVxyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnbG46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2xpbmVbaWR4XT10aGlzLl9jb252ZXJ0ZXIubG4odCkpXHJcblx0fVxyXG5cdGZpbGwoaWR4LCB0KXtcclxuXHRcdGlkeD1wYXJzZUludChpZHgpXHJcblx0XHRpZihpZHg+MTAwMClcclxuXHRcdFx0cmV0dXJuIHRoaXMuYmdGaWxsKGlkeC0xMDAwKVxyXG5cclxuXHRcdGlmKHQ9dGhpcy5fZmlsbFtpZHhdKVxyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnYmdGaWxsU3R5bGVMc3Q+Om50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9maWxsW2lkeF09dGhpcy5fY29udmVydGVyW3QubG9jYWxOYW1lXSh0KSlcclxuXHR9XHJcblx0YmdGaWxsKGlkeCwgdCl7XHJcblx0XHRpZih0PXRoaXMuX2JnRmlsbFtpZHhdKVxyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnYmdGaWxsU3R5bGVMc3Q+Om50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9iZ0ZpbGxbaWR4XT10aGlzLl9jb252ZXJ0ZXJbdC5sb2NhbE5hbWVdKHQpKVxyXG5cdH1cclxuXHRlZmZlY3QoaWR4LCB0KXtcclxuXHRcdGlmKHQ9dGhpcy5fZWZmZWN0W2lkeF0pXHJcblx0XHRcdHJldHVybiB0XHJcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdlZmZlY3RTdHlsZTpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKT5lZmZlY3RMc3QnKSkgJiYgKHRoaXMuX2VmZmVjdFtpZHhdPXRoaXMuX2NvbnZlcnRlci5lZmZlY3RMc3QodCkpXHJcblx0fVxyXG5cdGZvbnQoaWR4LCB0KXtcclxuXHRcdGlmKHQ9dGhpcy5fZm9udFtpZHhdKVxyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnZm9udFNjaGVtZT4nK2lkeCsnRm9udD5sYXRpbicpKSAmJiAodGhpcy5fZWZmZWN0W2lkeF09dC5hdHRyKCd0eXBlZmFjZScpKVxyXG5cdH1cclxufVxyXG4iXX0=