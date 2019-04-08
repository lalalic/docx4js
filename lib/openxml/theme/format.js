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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3RoZW1lL2Zvcm1hdC5qcyJdLCJuYW1lcyI6WyJmb3JtYXQiLCJ3WG1sIiwid0RvYyIsIl9jb252ZXJ0ZXIiLCJTaGFwZSIsIlByb3BlcnRpZXMiLCJfbGluZSIsIl9maWxsIiwiX2JnRmlsbCIsIl9lZmZlY3QiLCJfZm9udCIsImlkeCIsInQiLCIkMSIsInBhcnNlSW50IiwibG4iLCJiZ0ZpbGwiLCJsb2NhbE5hbWUiLCJlZmZlY3RMc3QiLCJhdHRyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxNO0FBQ3BCLGlCQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF1QjtBQUFBOztBQUN0QjtBQUNBLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLFVBQUwsR0FBZ0IsSUFBSUMsTUFBTUMsVUFBVixDQUFxQixJQUFyQixFQUEwQkgsSUFBMUIsRUFBK0IsSUFBL0IsQ0FBaEI7QUFDQSxPQUFLSSxLQUFMLEdBQVcsRUFBWDtBQUNBLE9BQUtDLEtBQUwsR0FBVyxFQUFDLEdBQUUsRUFBSCxFQUFNLE1BQUssRUFBWCxFQUFYO0FBQ0EsT0FBS0MsT0FBTCxHQUFhLEVBQWI7QUFDQSxPQUFLQyxPQUFMLEdBQWEsRUFBYjtBQUNBLE9BQUtDLEtBQUwsR0FBVyxFQUFYO0FBRUE7Ozs7dUJBQ0lDLEcsRUFBSUMsQyxFQUFFO0FBQ1YsT0FBR0EsSUFBRSxLQUFLTixLQUFMLENBQVdLLEdBQVgsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsbUJBQWlCQyxTQUFTSCxHQUFULElBQWMsQ0FBL0IsSUFBa0MsR0FBL0MsQ0FBSCxNQUE0RCxLQUFLTCxLQUFMLENBQVdLLEdBQVgsSUFBZ0IsS0FBS1IsVUFBTCxDQUFnQlksRUFBaEIsQ0FBbUJILENBQW5CLENBQTVFLENBQVA7QUFDQTs7O3VCQUNJRCxHLEVBQUtDLEMsRUFBRTtBQUNYRCxTQUFJRyxTQUFTSCxHQUFULENBQUo7QUFDQSxPQUFHQSxNQUFJLElBQVAsRUFDQyxPQUFPLEtBQUtLLE1BQUwsQ0FBWUwsTUFBSSxJQUFoQixDQUFQOztBQUVELE9BQUdDLElBQUUsS0FBS0wsS0FBTCxDQUFXSSxHQUFYLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtYLElBQUwsQ0FBVVksRUFBVixDQUFhLGdDQUE4QkMsU0FBU0gsR0FBVCxJQUFjLENBQTVDLElBQStDLEdBQTVELENBQUgsTUFBeUUsS0FBS0osS0FBTCxDQUFXSSxHQUFYLElBQWdCLEtBQUtSLFVBQUwsQ0FBZ0JTLEVBQUVLLFNBQWxCLEVBQTZCTCxDQUE3QixDQUF6RixDQUFQO0FBQ0E7Ozt5QkFDTUQsRyxFQUFLQyxDLEVBQUU7QUFDYixPQUFHQSxJQUFFLEtBQUtKLE9BQUwsQ0FBYUcsR0FBYixDQUFMLEVBQ0MsT0FBT0MsQ0FBUDtBQUNELFVBQU8sQ0FBQ0EsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYSxnQ0FBOEJDLFNBQVNILEdBQVQsSUFBYyxDQUE1QyxJQUErQyxHQUE1RCxDQUFILE1BQXlFLEtBQUtILE9BQUwsQ0FBYUcsR0FBYixJQUFrQixLQUFLUixVQUFMLENBQWdCUyxFQUFFSyxTQUFsQixFQUE2QkwsQ0FBN0IsQ0FBM0YsQ0FBUDtBQUNBOzs7eUJBQ01ELEcsRUFBS0MsQyxFQUFFO0FBQ2IsT0FBR0EsSUFBRSxLQUFLSCxPQUFMLENBQWFFLEdBQWIsQ0FBTCxFQUNDLE9BQU9DLENBQVA7QUFDRCxVQUFPLENBQUNBLElBQUUsS0FBS1gsSUFBTCxDQUFVWSxFQUFWLENBQWEsNEJBQTBCQyxTQUFTSCxHQUFULElBQWMsQ0FBeEMsSUFBMkMsYUFBeEQsQ0FBSCxNQUErRSxLQUFLRixPQUFMLENBQWFFLEdBQWIsSUFBa0IsS0FBS1IsVUFBTCxDQUFnQmUsU0FBaEIsQ0FBMEJOLENBQTFCLENBQWpHLENBQVA7QUFDQTs7O3VCQUNJRCxHLEVBQUtDLEMsRUFBRTtBQUNYLE9BQUdBLElBQUUsS0FBS0YsS0FBTCxDQUFXQyxHQUFYLENBQUwsRUFDQyxPQUFPQyxDQUFQO0FBQ0QsVUFBTyxDQUFDQSxJQUFFLEtBQUtYLElBQUwsQ0FBVVksRUFBVixDQUFhLGdCQUFjRixHQUFkLEdBQWtCLFlBQS9CLENBQUgsTUFBcUQsS0FBS0YsT0FBTCxDQUFhRSxHQUFiLElBQWtCQyxFQUFFTyxJQUFGLENBQU8sVUFBUCxDQUF2RSxDQUFQO0FBQ0E7Ozs7OztrQkF6Q21CbkIsTSIsImZpbGUiOiJmb3JtYXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBmb3JtYXR7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2Mpe1xuXHRcdHJldHVyblxuXHRcdHRoaXMud1htbD13WG1sXG5cdFx0dGhpcy53RG9jPXdEb2Ncblx0XHR0aGlzLl9jb252ZXJ0ZXI9bmV3IFNoYXBlLlByb3BlcnRpZXMobnVsbCx3RG9jLG51bGwpXG5cdFx0dGhpcy5fbGluZT17fVxuXHRcdHRoaXMuX2ZpbGw9ezA6e30sMTAwMDp7fX1cblx0XHR0aGlzLl9iZ0ZpbGw9e31cblx0XHR0aGlzLl9lZmZlY3Q9e31cblx0XHR0aGlzLl9mb250PXt9XG5cblx0fVxuXHRsaW5lKGlkeCx0KXtcblx0XHRpZih0PXRoaXMuX2xpbmVbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnbG46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2xpbmVbaWR4XT10aGlzLl9jb252ZXJ0ZXIubG4odCkpXG5cdH1cblx0ZmlsbChpZHgsIHQpe1xuXHRcdGlkeD1wYXJzZUludChpZHgpXG5cdFx0aWYoaWR4PjEwMDApXG5cdFx0XHRyZXR1cm4gdGhpcy5iZ0ZpbGwoaWR4LTEwMDApXG5cblx0XHRpZih0PXRoaXMuX2ZpbGxbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnYmdGaWxsU3R5bGVMc3Q+Om50aC1jaGlsZCgnKyhwYXJzZUludChpZHgpKzEpKycpJykpICYmICh0aGlzLl9maWxsW2lkeF09dGhpcy5fY29udmVydGVyW3QubG9jYWxOYW1lXSh0KSlcblx0fVxuXHRiZ0ZpbGwoaWR4LCB0KXtcblx0XHRpZih0PXRoaXMuX2JnRmlsbFtpZHhdKVxuXHRcdFx0cmV0dXJuIHRcblx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCdiZ0ZpbGxTdHlsZUxzdD46bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyknKSkgJiYgKHRoaXMuX2JnRmlsbFtpZHhdPXRoaXMuX2NvbnZlcnRlclt0LmxvY2FsTmFtZV0odCkpXG5cdH1cblx0ZWZmZWN0KGlkeCwgdCl7XG5cdFx0aWYodD10aGlzLl9lZmZlY3RbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnZWZmZWN0U3R5bGU6bnRoLWNoaWxkKCcrKHBhcnNlSW50KGlkeCkrMSkrJyk+ZWZmZWN0THN0JykpICYmICh0aGlzLl9lZmZlY3RbaWR4XT10aGlzLl9jb252ZXJ0ZXIuZWZmZWN0THN0KHQpKVxuXHR9XG5cdGZvbnQoaWR4LCB0KXtcblx0XHRpZih0PXRoaXMuX2ZvbnRbaWR4XSlcblx0XHRcdHJldHVybiB0XG5cdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnZm9udFNjaGVtZT4nK2lkeCsnRm9udD5sYXRpbicpKSAmJiAodGhpcy5fZWZmZWN0W2lkeF09dC5hdHRyKCd0eXBlZmFjZScpKVxuXHR9XG59XG4iXX0=