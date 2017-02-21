'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var format = function () {
	function format(wXml, wDoc) {
		_classCallCheck(this, format);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbImZvcm1hdCIsIndYbWwiLCJ3RG9jIiwiX2NvbnZlcnRlciIsIlNoYXBlIiwiUHJvcGVydGllcyIsIl9saW5lIiwiX2ZpbGwiLCJfYmdGaWxsIiwiX2VmZmVjdCIsIl9mb250IiwiaWR4IiwidCIsIiQxIiwicGFyc2VJbnQiLCJsbiIsImJnRmlsbCIsImxvY2FsTmFtZSIsImVmZmVjdExzdCIsImF0dHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLE07QUFDcEIsaUJBQVlDLElBQVosRUFBa0JDLElBQWxCLEVBQXVCO0FBQUE7O0FBQ3RCO0FBQ0EsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsVUFBTCxHQUFnQixJQUFJQyxNQUFNQyxVQUFWLENBQXFCLElBQXJCLEVBQTBCSCxJQUExQixFQUErQixJQUEvQixDQUFoQjtBQUNBLE9BQUtJLEtBQUwsR0FBVyxFQUFYO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQUMsR0FBRSxFQUFILEVBQU0sTUFBSyxFQUFYLEVBQVg7QUFDQSxPQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLE9BQUwsR0FBYSxFQUFiO0FBQ0EsT0FBS0MsS0FBTCxHQUFXLEVBQVg7QUFFQTs7Ozt1QkFDSUMsRyxFQUFJQyxDLEVBQUU7QUFDVixPQUFHQSxJQUFFLEtBQUtOLEtBQUwsQ0FBV0ssR0FBWCxDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSxtQkFBaUJDLFNBQVNILEdBQVQsSUFBYyxDQUEvQixJQUFrQyxHQUEvQyxDQUFILE1BQTRELEtBQUtMLEtBQUwsQ0FBV0ssR0FBWCxJQUFnQixLQUFLUixVQUFMLENBQWdCWSxFQUFoQixDQUFtQkgsQ0FBbkIsQ0FBNUUsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1hELFNBQUlHLFNBQVNILEdBQVQsQ0FBSjtBQUNBLE9BQUdBLE1BQUksSUFBUCxFQUNDLE9BQU8sS0FBS0ssTUFBTCxDQUFZTCxNQUFJLElBQWhCLENBQVA7O0FBRUQsT0FBR0MsSUFBRSxLQUFLTCxLQUFMLENBQVdJLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsZ0NBQThCQyxTQUFTSCxHQUFULElBQWMsQ0FBNUMsSUFBK0MsR0FBNUQsQ0FBSCxNQUF5RSxLQUFLSixLQUFMLENBQVdJLEdBQVgsSUFBZ0IsS0FBS1IsVUFBTCxDQUFnQlMsRUFBRUssU0FBbEIsRUFBNkJMLENBQTdCLENBQXpGLENBQVA7QUFDQTs7O3lCQUNNRCxHLEVBQUtDLEMsRUFBRTtBQUNiLE9BQUdBLElBQUUsS0FBS0osT0FBTCxDQUFhRyxHQUFiLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtYLElBQUwsQ0FBVVksRUFBVixDQUFhLGdDQUE4QkMsU0FBU0gsR0FBVCxJQUFjLENBQTVDLElBQStDLEdBQTVELENBQUgsTUFBeUUsS0FBS0gsT0FBTCxDQUFhRyxHQUFiLElBQWtCLEtBQUtSLFVBQUwsQ0FBZ0JTLEVBQUVLLFNBQWxCLEVBQTZCTCxDQUE3QixDQUEzRixDQUFQO0FBQ0E7Ozt5QkFDTUQsRyxFQUFLQyxDLEVBQUU7QUFDYixPQUFHQSxJQUFFLEtBQUtILE9BQUwsQ0FBYUUsR0FBYixDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSw0QkFBMEJDLFNBQVNILEdBQVQsSUFBYyxDQUF4QyxJQUEyQyxhQUF4RCxDQUFILE1BQStFLEtBQUtGLE9BQUwsQ0FBYUUsR0FBYixJQUFrQixLQUFLUixVQUFMLENBQWdCZSxTQUFoQixDQUEwQk4sQ0FBMUIsQ0FBakcsQ0FBUDtBQUNBOzs7dUJBQ0lELEcsRUFBS0MsQyxFQUFFO0FBQ1gsT0FBR0EsSUFBRSxLQUFLRixLQUFMLENBQVdDLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsZ0JBQWNGLEdBQWQsR0FBa0IsWUFBL0IsQ0FBSCxNQUFxRCxLQUFLRixPQUFMLENBQWFFLEdBQWIsSUFBa0JDLEVBQUVPLElBQUYsQ0FBTyxVQUFQLENBQXZFLENBQVA7QUFDQTs7Ozs7O2tCQXpDbUJuQixNIiwiZmlsZSI6ImZvcm1hdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvcm1hdHtcclxuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jKXtcclxuXHRcdHJldHVyblxyXG5cdFx0dGhpcy53WG1sPXdYbWxcclxuXHRcdHRoaXMud0RvYz13RG9jXHJcblx0XHR0aGlzLl9jb252ZXJ0ZXI9bmV3IFNoYXBlLlByb3BlcnRpZXMobnVsbCx3RG9jLG51bGwpXHJcblx0XHR0aGlzLl9saW5lPXt9XHJcblx0XHR0aGlzLl9maWxsPXswOnt9LDEwMDA6e319XHJcblx0XHR0aGlzLl9iZ0ZpbGw9e31cclxuXHRcdHRoaXMuX2VmZmVjdD17fVxyXG5cdFx0dGhpcy5fZm9udD17fVxyXG5cclxuXHR9XHJcblx0bGluZShpZHgsdCl7XHJcblx0XHRpZih0PXRoaXMuX2xpbmVbaWR4XSlcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2xuOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9saW5lW2lkeF09dGhpcy5fY29udmVydGVyLmxuKHQpKVxyXG5cdH1cclxuXHRmaWxsKGlkeCwgdCl7XHJcblx0XHRpZHg9cGFyc2VJbnQoaWR4KVxyXG5cdFx0aWYoaWR4PjEwMDApXHJcblx0XHRcdHJldHVybiB0aGlzLmJnRmlsbChpZHgtMTAwMClcclxuXHJcblx0XHRpZih0PXRoaXMuX2ZpbGxbaWR4XSlcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2JnRmlsbFN0eWxlTHN0PjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fZmlsbFtpZHhdPXRoaXMuX2NvbnZlcnRlclt0LmxvY2FsTmFtZV0odCkpXHJcblx0fVxyXG5cdGJnRmlsbChpZHgsIHQpe1xyXG5cdFx0aWYodD10aGlzLl9iZ0ZpbGxbaWR4XSlcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2JnRmlsbFN0eWxlTHN0PjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fYmdGaWxsW2lkeF09dGhpcy5fY29udmVydGVyW3QubG9jYWxOYW1lXSh0KSlcclxuXHR9XHJcblx0ZWZmZWN0KGlkeCwgdCl7XHJcblx0XHRpZih0PXRoaXMuX2VmZmVjdFtpZHhdKVxyXG5cdFx0XHRyZXR1cm4gdFxyXG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnZWZmZWN0U3R5bGU6bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyk+ZWZmZWN0THN0JykpICYmICh0aGlzLl9lZmZlY3RbaWR4XT10aGlzLl9jb252ZXJ0ZXIuZWZmZWN0THN0KHQpKVxyXG5cdH1cclxuXHRmb250KGlkeCwgdCl7XHJcblx0XHRpZih0PXRoaXMuX2ZvbnRbaWR4XSlcclxuXHRcdFx0cmV0dXJuIHRcclxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2ZvbnRTY2hlbWU+JytpZHgrJ0ZvbnQ+bGF0aW4nKSkgJiYgKHRoaXMuX2VmZmVjdFtpZHhdPXQuYXR0cigndHlwZWZhY2UnKSlcclxuXHR9XHJcbn1cclxuIl19