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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9ybWF0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUI7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXVCO3dCQURILFFBQ0c7O0FBQ3RCLFNBRHNCO0FBRXRCLE9BQUssSUFBTCxHQUFVLElBQVYsQ0FGc0I7QUFHdEIsT0FBSyxJQUFMLEdBQVUsSUFBVixDQUhzQjtBQUl0QixPQUFLLFVBQUwsR0FBZ0IsSUFBSSxNQUFNLFVBQU4sQ0FBaUIsSUFBckIsRUFBMEIsSUFBMUIsRUFBK0IsSUFBL0IsQ0FBaEIsQ0FKc0I7QUFLdEIsT0FBSyxLQUFMLEdBQVcsRUFBWCxDQUxzQjtBQU10QixPQUFLLEtBQUwsR0FBVyxFQUFDLEdBQUUsRUFBRixFQUFLLE1BQUssRUFBTCxFQUFqQixDQU5zQjtBQU90QixPQUFLLE9BQUwsR0FBYSxFQUFiLENBUHNCO0FBUXRCLE9BQUssT0FBTCxHQUFhLEVBQWIsQ0FSc0I7QUFTdEIsT0FBSyxLQUFMLEdBQVcsRUFBWCxDQVRzQjtFQUF2Qjs7Y0FEb0I7O3VCQWFmLEtBQUksR0FBRTtBQUNWLE9BQUcsSUFBRSxLQUFLLEtBQUwsQ0FBVyxHQUFYLENBQUYsRUFDRixPQUFPLENBQVAsQ0FERDtBQUVBLFVBQU8sQ0FBQyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxtQkFBaUIsU0FBUyxHQUFULElBQWMsQ0FBZCxDQUFqQixHQUFrQyxHQUFsQyxDQUFmLENBQUQsS0FBNEQsS0FBSyxLQUFMLENBQVcsR0FBWCxJQUFnQixLQUFLLFVBQUwsQ0FBZ0IsRUFBaEIsQ0FBbUIsQ0FBbkIsQ0FBaEIsQ0FBNUQsQ0FIRzs7Ozt1QkFLTixLQUFLLEdBQUU7QUFDWCxTQUFJLFNBQVMsR0FBVCxDQUFKLENBRFc7QUFFWCxPQUFHLE1BQUksSUFBSixFQUNGLE9BQU8sS0FBSyxNQUFMLENBQVksTUFBSSxJQUFKLENBQW5CLENBREQ7O0FBR0EsT0FBRyxJQUFFLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBRixFQUNGLE9BQU8sQ0FBUCxDQUREO0FBRUEsVUFBTyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGdDQUE4QixTQUFTLEdBQVQsSUFBYyxDQUFkLENBQTlCLEdBQStDLEdBQS9DLENBQWYsQ0FBRCxLQUF5RSxLQUFLLEtBQUwsQ0FBVyxHQUFYLElBQWdCLEtBQUssVUFBTCxDQUFnQixFQUFFLFNBQUYsQ0FBaEIsQ0FBNkIsQ0FBN0IsQ0FBaEIsQ0FBekUsQ0FQSTs7Ozt5QkFTTCxLQUFLLEdBQUU7QUFDYixPQUFHLElBQUUsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFGLEVBQ0YsT0FBTyxDQUFQLENBREQ7QUFFQSxVQUFPLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsZ0NBQThCLFNBQVMsR0FBVCxJQUFjLENBQWQsQ0FBOUIsR0FBK0MsR0FBL0MsQ0FBZixDQUFELEtBQXlFLEtBQUssT0FBTCxDQUFhLEdBQWIsSUFBa0IsS0FBSyxVQUFMLENBQWdCLEVBQUUsU0FBRixDQUFoQixDQUE2QixDQUE3QixDQUFsQixDQUF6RSxDQUhNOzs7O3lCQUtQLEtBQUssR0FBRTtBQUNiLE9BQUcsSUFBRSxLQUFLLE9BQUwsQ0FBYSxHQUFiLENBQUYsRUFDRixPQUFPLENBQVAsQ0FERDtBQUVBLFVBQU8sQ0FBQyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSw0QkFBMEIsU0FBUyxHQUFULElBQWMsQ0FBZCxDQUExQixHQUEyQyxhQUEzQyxDQUFmLENBQUQsS0FBK0UsS0FBSyxPQUFMLENBQWEsR0FBYixJQUFrQixLQUFLLFVBQUwsQ0FBZ0IsU0FBaEIsQ0FBMEIsQ0FBMUIsQ0FBbEIsQ0FBL0UsQ0FITTs7Ozt1QkFLVCxLQUFLLEdBQUU7QUFDWCxPQUFHLElBQUUsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFGLEVBQ0YsT0FBTyxDQUFQLENBREQ7QUFFQSxVQUFPLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsZ0JBQWMsR0FBZCxHQUFrQixZQUFsQixDQUFmLENBQUQsS0FBcUQsS0FBSyxPQUFMLENBQWEsR0FBYixJQUFrQixFQUFFLElBQUYsQ0FBTyxVQUFQLENBQWxCLENBQXJELENBSEk7Ozs7UUFyQ1EiLCJmaWxlIjoiZm9ybWF0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZm9ybWF0e1xuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jKXtcblx0XHRyZXR1cm5cblx0XHR0aGlzLndYbWw9d1htbFxuXHRcdHRoaXMud0RvYz13RG9jXG5cdFx0dGhpcy5fY29udmVydGVyPW5ldyBTaGFwZS5Qcm9wZXJ0aWVzKG51bGwsd0RvYyxudWxsKVxuXHRcdHRoaXMuX2xpbmU9e31cblx0XHR0aGlzLl9maWxsPXswOnt9LDEwMDA6e319XG5cdFx0dGhpcy5fYmdGaWxsPXt9XG5cdFx0dGhpcy5fZWZmZWN0PXt9XG5cdFx0dGhpcy5fZm9udD17fVxuXG5cdH1cblx0bGluZShpZHgsdCl7XG5cdFx0aWYodD10aGlzLl9saW5lW2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2xuOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9saW5lW2lkeF09dGhpcy5fY29udmVydGVyLmxuKHQpKVxuXHR9XG5cdGZpbGwoaWR4LCB0KXtcblx0XHRpZHg9cGFyc2VJbnQoaWR4KVxuXHRcdGlmKGlkeD4xMDAwKVxuXHRcdFx0cmV0dXJuIHRoaXMuYmdGaWxsKGlkeC0xMDAwKVxuXG5cdFx0aWYodD10aGlzLl9maWxsW2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2JnRmlsbFN0eWxlTHN0PjpudGgtY2hpbGQoJysocGFyc2VJbnQoaWR4KSsxKSsnKScpKSAmJiAodGhpcy5fZmlsbFtpZHhdPXRoaXMuX2NvbnZlcnRlclt0LmxvY2FsTmFtZV0odCkpXG5cdH1cblx0YmdGaWxsKGlkeCwgdCl7XG5cdFx0aWYodD10aGlzLl9iZ0ZpbGxbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnYmdGaWxsU3R5bGVMc3Q+Om50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9iZ0ZpbGxbaWR4XT10aGlzLl9jb252ZXJ0ZXJbdC5sb2NhbE5hbWVdKHQpKVxuXHR9XG5cdGVmZmVjdChpZHgsIHQpe1xuXHRcdGlmKHQ9dGhpcy5fZWZmZWN0W2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2VmZmVjdFN0eWxlOm50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpPmVmZmVjdExzdCcpKSAmJiAodGhpcy5fZWZmZWN0W2lkeF09dGhpcy5fY29udmVydGVyLmVmZmVjdExzdCh0KSlcblx0fVxuXHRmb250KGlkeCwgdCl7XG5cdFx0aWYodD10aGlzLl9mb250W2lkeF0pXG5cdFx0XHRyZXR1cm4gdFxuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJ2ZvbnRTY2hlbWU+JytpZHgrJ0ZvbnQ+bGF0aW4nKSkgJiYgKHRoaXMuX2VmZmVjdFtpZHhdPXQuYXR0cigndHlwZWZhY2UnKSlcblx0fVxufVxuIl19