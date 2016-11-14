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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsIndYbWwiLCJ3RG9jIiwiX2NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJfbGluZSIsIl9maWxsIiwiX2JnRmlsbCIsIl9lZmZlY3QiLCJfZm9udCIsImlkeCIsInQiLCIkMSIsInBhcnNlSW50IiwibG4iLCJiZ0ZpbGwiLCJsb2NhbE5hbWUiLCJlZmZlY3RMc3QiLCJhdHRyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsTTtBQUNwQixpQkFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBdUI7QUFBQTs7QUFDdEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsVUFBTCxHQUFnQixJQUFJLGdCQUFNQyxVQUFWLENBQXFCLElBQXJCLEVBQTBCRixJQUExQixFQUErQixJQUEvQixDQUFoQjtBQUNBLE9BQUtHLEtBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQUMsR0FBRSxFQUFILEVBQU0sTUFBSyxFQUFYLEVBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLE9BQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQVg7QUFFQTs7Ozt1QkFDSUMsRyxFQUFJQyxDLEVBQUU7QUFDVixPQUFHQSxJQUFFLEtBQUtOLEtBQUwsQ0FBV0ssR0FBWCxDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLVixJQUFMLENBQVVXLEVBQVYsQ0FBYSxtQkFBaUJDLFNBQVNILEdBQVQsSUFBYyxDQUEvQixJQUFrQyxHQUEvQyxDQUFILE1BQTRELEtBQUtMLEtBQUwsQ0FBV0ssR0FBWCxJQUFnQixLQUFLUCxVQUFMLENBQWdCVyxFQUFoQixDQUFtQkgsQ0FBbkIsQ0FBNUUsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1hELFNBQUlHLFNBQVNILEdBQVQsQ0FBSjtBQUNBLE9BQUdBLE1BQUksSUFBUCxFQUNDLE9BQU8sS0FBS0ssTUFBTCxDQUFZTCxNQUFJLElBQWhCLENBQVA7O0FBRUQsT0FBR0MsSUFBRSxLQUFLTCxLQUFMLENBQVdJLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1YsSUFBTCxDQUFVVyxFQUFWLENBQWEsZ0NBQThCQyxTQUFTSCxHQUFULElBQWMsQ0FBNUMsSUFBK0MsR0FBNUQsQ0FBSCxNQUF5RSxLQUFLSixLQUFMLENBQVdJLEdBQVgsSUFBZ0IsS0FBS1AsVUFBTCxDQUFnQlEsRUFBRUssU0FBbEIsRUFBNkJMLENBQTdCLENBQXpGLENBQVA7QUFDQTs7O3lCQUNNRCxHLEVBQUtDLEMsRUFBRTtBQUNiLE9BQUdBLElBQUUsS0FBS0osT0FBTCxDQUFhRyxHQUFiLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtWLElBQUwsQ0FBVVcsRUFBVixDQUFhLGdDQUE4QkMsU0FBU0gsR0FBVCxJQUFjLENBQTVDLElBQStDLEdBQTVELENBQUgsTUFBeUUsS0FBS0gsT0FBTCxDQUFhRyxHQUFiLElBQWtCLEtBQUtQLFVBQUwsQ0FBZ0JRLEVBQUVLLFNBQWxCLEVBQTZCTCxDQUE3QixDQUEzRixDQUFQO0FBQ0E7Ozt5QkFDTUQsRyxFQUFLQyxDLEVBQUU7QUFDYixPQUFHQSxJQUFFLEtBQUtILE9BQUwsQ0FBYUUsR0FBYixDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLVixJQUFMLENBQVVXLEVBQVYsQ0FBYSw0QkFBMEJDLFNBQVNILEdBQVQsSUFBYyxDQUF4QyxJQUEyQyxhQUF4RCxDQUFILE1BQStFLEtBQUtGLE9BQUwsQ0FBYUUsR0FBYixJQUFrQixLQUFLUCxVQUFMLENBQWdCYyxTQUFoQixDQUEwQk4sQ0FBMUIsQ0FBakcsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1gsT0FBR0EsSUFBRSxLQUFLRixLQUFMLENBQVdDLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1YsSUFBTCxDQUFVVyxFQUFWLENBQWEsZ0JBQWNGLEdBQWQsR0FBa0IsWUFBL0IsQ0FBSCxNQUFxRCxLQUFLRixPQUFMLENBQWFFLEdBQWIsSUFBa0JDLEVBQUVPLElBQUYsQ0FBTyxVQUFQLENBQXZFLENBQVA7QUFDQTs7Ozs7O2tCQXhDbUJsQixNIiwiZmlsZSI6ImZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFwZSBmcm9tICcuLi9tb2RlbC9zaGFwZSdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvcm1hdHtcclxuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jKXtcclxuXHRcdHRoaXMud1htbD13WG1sXHJcblx0XHR0aGlzLndEb2M9d0RvY1xyXG5cdFx0dGhpcy5fY29udmVydGVyPW5ldyBTaGFwZS5Qcm9wZXJ0aWVzKG51bGwsd0RvYyxudWxsKVxyXG5cdFx0dGhpcy5fbGluZT17fVxyXG5cdFx0dGhpcy5fZmlsbD17MDp7fSwxMDAwOnt9fVxyXG5cdFx0dGhpcy5fYmdGaWxsPXt9XHJcblx0XHR0aGlzLl9lZmZlY3Q9e31cclxuXHRcdHRoaXMuX2ZvbnQ9e31cclxuXHJcblx0fVxyXG5cdGxpbmUoaWR4LHQpe1xyXG5cdFx0aWYodD10aGlzLl9saW5lW2lkeF0pXHJcblx0XHRcdHJldHVybiB0XHJcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdsbjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fbGluZVtpZHhdPXRoaXMuX2NvbnZlcnRlci5sbih0KSlcclxuXHR9XHJcblx0ZmlsbChpZHgsIHQpe1xyXG5cdFx0aWR4PXBhcnNlSW50KGlkeClcclxuXHRcdGlmKGlkeD4xMDAwKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5iZ0ZpbGwoaWR4LTEwMDApXHJcblxyXG5cdFx0aWYodD10aGlzLl9maWxsW2lkeF0pXHJcblx0XHRcdHJldHVybiB0XHJcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdiZ0ZpbGxTdHlsZUxzdD46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2ZpbGxbaWR4XT10aGlzLl9jb252ZXJ0ZXJbdC5sb2NhbE5hbWVdKHQpKVxyXG5cdH1cclxuXHRiZ0ZpbGwoaWR4LCB0KXtcclxuXHRcdGlmKHQ9dGhpcy5fYmdGaWxsW2lkeF0pXHJcblx0XHRcdHJldHVybiB0XHJcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdiZ0ZpbGxTdHlsZUxzdD46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2JnRmlsbFtpZHhdPXRoaXMuX2NvbnZlcnRlclt0LmxvY2FsTmFtZV0odCkpXHJcblx0fVxyXG5cdGVmZmVjdChpZHgsIHQpe1xyXG5cdFx0aWYodD10aGlzLl9lZmZlY3RbaWR4XSlcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2VmZmVjdFN0eWxlOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpPmVmZmVjdExzdCcpKSAmJiAodGhpcy5fZWZmZWN0W2lkeF09dGhpcy5fY29udmVydGVyLmVmZmVjdExzdCh0KSlcclxuXHR9XHJcblx0Zm9udChpZHgsIHQpe1xyXG5cdFx0aWYodD10aGlzLl9mb250W2lkeF0pXHJcblx0XHRcdHJldHVybiB0XHJcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdmb250U2NoZW1lPicraWR4KydGb250PmxhdGluJykpICYmICh0aGlzLl9lZmZlY3RbaWR4XT10LmF0dHIoJ3R5cGVmYWNlJykpXHJcblx0fVxyXG59XHJcbiJdfQ==