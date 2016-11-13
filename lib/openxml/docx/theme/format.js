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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsIndYbWwiLCJ3RG9jIiwiX2NvbnZlcnRlciIsIlByb3BlcnRpZXMiLCJfbGluZSIsIl9maWxsIiwiX2JnRmlsbCIsIl9lZmZlY3QiLCJfZm9udCIsImlkeCIsInQiLCIkMSIsInBhcnNlSW50IiwibG4iLCJiZ0ZpbGwiLCJsb2NhbE5hbWUiLCJlZmZlY3RMc3QiLCJhdHRyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztJQUVxQkEsTTtBQUNwQixpQkFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBdUI7QUFBQTs7QUFDdEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsVUFBTCxHQUFnQixJQUFJLGdCQUFNQyxVQUFWLENBQXFCLElBQXJCLEVBQTBCRixJQUExQixFQUErQixJQUEvQixDQUFoQjtBQUNBLE9BQUtHLEtBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQUMsR0FBRSxFQUFILEVBQU0sTUFBSyxFQUFYLEVBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLE9BQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQVg7QUFFQTs7Ozt1QkFDSUMsRyxFQUFJQyxDLEVBQUU7QUFDVixPQUFHQSxJQUFFLEtBQUtOLEtBQUwsQ0FBV0ssR0FBWCxDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLVixJQUFMLENBQVVXLEVBQVYsQ0FBYSxtQkFBaUJDLFNBQVNILEdBQVQsSUFBYyxDQUEvQixJQUFrQyxHQUEvQyxDQUFILE1BQTRELEtBQUtMLEtBQUwsQ0FBV0ssR0FBWCxJQUFnQixLQUFLUCxVQUFMLENBQWdCVyxFQUFoQixDQUFtQkgsQ0FBbkIsQ0FBNUUsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1hELFNBQUlHLFNBQVNILEdBQVQsQ0FBSjtBQUNBLE9BQUdBLE1BQUksSUFBUCxFQUNDLE9BQU8sS0FBS0ssTUFBTCxDQUFZTCxNQUFJLElBQWhCLENBQVA7O0FBRUQsT0FBR0MsSUFBRSxLQUFLTCxLQUFMLENBQVdJLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1YsSUFBTCxDQUFVVyxFQUFWLENBQWEsZ0NBQThCQyxTQUFTSCxHQUFULElBQWMsQ0FBNUMsSUFBK0MsR0FBNUQsQ0FBSCxNQUF5RSxLQUFLSixLQUFMLENBQVdJLEdBQVgsSUFBZ0IsS0FBS1AsVUFBTCxDQUFnQlEsRUFBRUssU0FBbEIsRUFBNkJMLENBQTdCLENBQXpGLENBQVA7QUFDQTs7O3lCQUNNRCxHLEVBQUtDLEMsRUFBRTtBQUNiLE9BQUdBLElBQUUsS0FBS0osT0FBTCxDQUFhRyxHQUFiLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtWLElBQUwsQ0FBVVcsRUFBVixDQUFhLGdDQUE4QkMsU0FBU0gsR0FBVCxJQUFjLENBQTVDLElBQStDLEdBQTVELENBQUgsTUFBeUUsS0FBS0gsT0FBTCxDQUFhRyxHQUFiLElBQWtCLEtBQUtQLFVBQUwsQ0FBZ0JRLEVBQUVLLFNBQWxCLEVBQTZCTCxDQUE3QixDQUEzRixDQUFQO0FBQ0E7Ozt5QkFDTUQsRyxFQUFLQyxDLEVBQUU7QUFDYixPQUFHQSxJQUFFLEtBQUtILE9BQUwsQ0FBYUUsR0FBYixDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLVixJQUFMLENBQVVXLEVBQVYsQ0FBYSw0QkFBMEJDLFNBQVNILEdBQVQsSUFBYyxDQUF4QyxJQUEyQyxhQUF4RCxDQUFILE1BQStFLEtBQUtGLE9BQUwsQ0FBYUUsR0FBYixJQUFrQixLQUFLUCxVQUFMLENBQWdCYyxTQUFoQixDQUEwQk4sQ0FBMUIsQ0FBakcsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1gsT0FBR0EsSUFBRSxLQUFLRixLQUFMLENBQVdDLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1YsSUFBTCxDQUFVVyxFQUFWLENBQWEsZ0JBQWNGLEdBQWQsR0FBa0IsWUFBL0IsQ0FBSCxNQUFxRCxLQUFLRixPQUFMLENBQWFFLEdBQWIsSUFBa0JDLEVBQUVPLElBQUYsQ0FBTyxVQUFQLENBQXZFLENBQVA7QUFDQTs7Ozs7O2tCQXhDbUJsQixNIiwiZmlsZSI6ImZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTaGFwZSBmcm9tICcuLi9tb2RlbC9zaGFwZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZm9ybWF0e1xuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jKXtcblx0XHR0aGlzLndYbWw9d1htbFxuXHRcdHRoaXMud0RvYz13RG9jXG5cdFx0dGhpcy5fY29udmVydGVyPW5ldyBTaGFwZS5Qcm9wZXJ0aWVzKG51bGwsd0RvYyxudWxsKVxuXHRcdHRoaXMuX2xpbmU9e31cblx0XHR0aGlzLl9maWxsPXswOnt9LDEwMDA6e319XG5cdFx0dGhpcy5fYmdGaWxsPXt9XG5cdFx0dGhpcy5fZWZmZWN0PXt9XG5cdFx0dGhpcy5fZm9udD17fVxuXG5cdH1cblx0bGluZShpZHgsdCl7XG5cdFx0aWYodD10aGlzLl9saW5lW2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2xuOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9saW5lW2lkeF09dGhpcy5fY29udmVydGVyLmxuKHQpKVxuXHR9XG5cdGZpbGwoaWR4LCB0KXtcblx0XHRpZHg9cGFyc2VJbnQoaWR4KVxuXHRcdGlmKGlkeD4xMDAwKVxuXHRcdFx0cmV0dXJuIHRoaXMuYmdGaWxsKGlkeC0xMDAwKVxuXG5cdFx0aWYodD10aGlzLl9maWxsW2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2JnRmlsbFN0eWxlTHN0PjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fZmlsbFtpZHhdPXRoaXMuX2NvbnZlcnRlclt0LmxvY2FsTmFtZV0odCkpXG5cdH1cblx0YmdGaWxsKGlkeCwgdCl7XG5cdFx0aWYodD10aGlzLl9iZ0ZpbGxbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnYmdGaWxsU3R5bGVMc3Q+Om50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9iZ0ZpbGxbaWR4XT10aGlzLl9jb252ZXJ0ZXJbdC5sb2NhbE5hbWVdKHQpKVxuXHR9XG5cdGVmZmVjdChpZHgsIHQpe1xuXHRcdGlmKHQ9dGhpcy5fZWZmZWN0W2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2VmZmVjdFN0eWxlOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpPmVmZmVjdExzdCcpKSAmJiAodGhpcy5fZWZmZWN0W2lkeF09dGhpcy5fY29udmVydGVyLmVmZmVjdExzdCh0KSlcblx0fVxuXHRmb250KGlkeCwgdCl7XG5cdFx0aWYodD10aGlzLl9mb250W2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2ZvbnRTY2hlbWU+JytpZHgrJ0ZvbnQ+bGF0aW4nKSkgJiYgKHRoaXMuX2VmZmVjdFtpZHhdPXQuYXR0cigndHlwZWZhY2UnKSlcblx0fVxufVxuIl19