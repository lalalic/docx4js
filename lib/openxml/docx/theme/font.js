'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var font = function () {
	function font(wXml, xLang) {
		_classCallCheck(this, font);

		this.wXml = wXml;
		this.xLang = xLang;
	}

	_createClass(font, [{
		key: 'get',
		value: function get(name) {
			switch (name) {
				case 'minorHAnsi':
				case 'minorAscii':
					return this.minorHAnsi || (this.minorHAnsi = this.minorAscii = this.wXml.$1('minorFont>latin').attr('typeface'));
				case 'majorHAnsi':
				case 'majorAscii':
					return this.majorHAnsi || (this.majorHAnsi = this.majorAscii = this.wXml.$1('majorFont>latin').attr('typeface'));
				case 'majorEastAsia':
					if (this.majorEastAsia) return this.majorEastAsia;
					var t = this.wXml.$1('majorFont>ea').attr('typeface');
					if (t.length == 0) t = this.wXml.$1('majorFont>font[script="' + this.xLang.attr('w:eastAsia') + '"]');
					return this.majorEastAsia = t;
				case 'majorEastAsia':
					if (this.majorEastAsia) return this.majorEastAsia;
					var t = this.wXml.$1('minorFont>ea').attr('typeface');
					if (t.length == 0) t = this.wXml.$1('minorFont>font[script="' + this.xLang.attr('w:eastAsia') + '"]');
					return this.majorEastAsia = t;
				case 'majorBidi':
					if (this.majorBidi) return this.majorBidi;
					var t = this.wXml.$1('majorFont>cs').attr('typeface');
					if (t.length == 0) t = this.wXml.$1('majorFont>font[script="' + this.xLang.attr('w:bidi') + '"]');
					return this.majorBidi = t;
				case 'majorBidi':
					if (this.majorBidi) return this.majorBidi;
					var t = this.wXml.$1('minorFont>cs').attr('typeface');
					if (t.length == 0) t = this.wXml.$1('minorFont>font[script="' + this.xLang.attr('w:bidi') + '"]');
					return this.majorBidi = t;
			}
		}
	}]);

	return font;
}();

exports.default = font;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLElBQ3BCLENBQVksSUFBWixFQUFpQixLQUFqQixFQUF1Qjt3QkFESCxNQUNHOztBQUN0QixPQUFLLElBQUwsR0FBVSxJQUFWLENBRHNCO0FBRXRCLE9BQUssS0FBTCxHQUFXLEtBQVgsQ0FGc0I7RUFBdkI7O2NBRG9COztzQkFLaEIsTUFBSztBQUNSLFdBQU8sSUFBUDtBQUNBLFNBQUssWUFBTCxDQURBO0FBRUEsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLLFVBQUwsS0FBb0IsS0FBSyxVQUFMLEdBQWdCLEtBQUssVUFBTCxHQUFnQixLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsaUJBQWIsRUFBZ0MsSUFBaEMsQ0FBcUMsVUFBckMsQ0FBaEIsQ0FBcEMsQ0FEUjtBQUZBLFNBSUssWUFBTCxDQUpBO0FBS0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLLFVBQUwsS0FBb0IsS0FBSyxVQUFMLEdBQWdCLEtBQUssVUFBTCxHQUFnQixLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsaUJBQWIsRUFBZ0MsSUFBaEMsQ0FBcUMsVUFBckMsQ0FBaEIsQ0FBcEMsQ0FEUjtBQUxBLFNBT0ssZUFBTDtBQUNDLFNBQUcsS0FBSyxhQUFMLEVBQ0YsT0FBTyxLQUFLLGFBQUwsQ0FEUjtBQUVBLFNBQUksSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsY0FBYixFQUE2QixJQUE3QixDQUFrQyxVQUFsQyxDQUFGLENBSEw7QUFJQyxTQUFHLEVBQUUsTUFBRixJQUFVLENBQVYsRUFDRixJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSw0QkFBMEIsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixZQUFoQixDQUExQixHQUF3RCxJQUF4RCxDQUFmLENBREQ7QUFFQSxZQUFPLEtBQUssYUFBTCxHQUFtQixDQUFuQixDQU5SO0FBUEEsU0FjSyxlQUFMO0FBQ0MsU0FBRyxLQUFLLGFBQUwsRUFDRixPQUFPLEtBQUssYUFBTCxDQURSO0FBRUEsU0FBSSxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxjQUFiLEVBQTZCLElBQTdCLENBQWtDLFVBQWxDLENBQUYsQ0FITDtBQUlDLFNBQUcsRUFBRSxNQUFGLElBQVUsQ0FBVixFQUNGLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLDRCQUEwQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFlBQWhCLENBQTFCLEdBQXdELElBQXhELENBQWYsQ0FERDtBQUVBLFlBQU8sS0FBSyxhQUFMLEdBQW1CLENBQW5CLENBTlI7QUFkQSxTQXFCSyxXQUFMO0FBQ0MsU0FBRyxLQUFLLFNBQUwsRUFDRixPQUFPLEtBQUssU0FBTCxDQURSO0FBRUEsU0FBSSxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxjQUFiLEVBQTZCLElBQTdCLENBQWtDLFVBQWxDLENBQUYsQ0FITDtBQUlDLFNBQUcsRUFBRSxNQUFGLElBQVUsQ0FBVixFQUNGLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLDRCQUEwQixLQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLFFBQWhCLENBQTFCLEdBQW9ELElBQXBELENBQWYsQ0FERDtBQUVBLFlBQU8sS0FBSyxTQUFMLEdBQWUsQ0FBZixDQU5SO0FBckJBLFNBNEJLLFdBQUw7QUFDQyxTQUFHLEtBQUssU0FBTCxFQUNGLE9BQU8sS0FBSyxTQUFMLENBRFI7QUFFQSxTQUFJLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGNBQWIsRUFBNkIsSUFBN0IsQ0FBa0MsVUFBbEMsQ0FBRixDQUhMO0FBSUMsU0FBRyxFQUFFLE1BQUYsSUFBVSxDQUFWLEVBQ0YsSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsNEJBQTBCLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBMUIsR0FBb0QsSUFBcEQsQ0FBZixDQUREO0FBRUEsWUFBTyxLQUFLLFNBQUwsR0FBZSxDQUFmLENBTlI7QUE1QkEsSUFEUTs7OztRQUxXIiwiZmlsZSI6ImZvbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBmb250e1xuXHRjb25zdHJ1Y3Rvcih3WG1sLHhMYW5nKXtcblx0XHR0aGlzLndYbWw9d1htbFxuXHRcdHRoaXMueExhbmc9eExhbmdcblx0fVxuXHRnZXQobmFtZSl7XG5cdFx0c3dpdGNoKG5hbWUpe1xuXHRcdGNhc2UgJ21pbm9ySEFuc2knOlxuXHRcdGNhc2UgJ21pbm9yQXNjaWknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JIQW5zaSB8fCAodGhpcy5taW5vckhBbnNpPXRoaXMubWlub3JBc2NpaT10aGlzLndYbWwuJDEoJ21pbm9yRm9udD5sYXRpbicpLmF0dHIoJ3R5cGVmYWNlJykpXG5cdFx0Y2FzZSAnbWFqb3JIQW5zaSc6XG5cdFx0Y2FzZSAnbWFqb3JBc2NpaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckhBbnNpIHx8ICh0aGlzLm1ham9ySEFuc2k9dGhpcy5tYWpvckFzY2lpPXRoaXMud1htbC4kMSgnbWFqb3JGb250PmxhdGluJykuYXR0cigndHlwZWZhY2UnKSlcblx0XHRjYXNlICdtYWpvckVhc3RBc2lhJzpcblx0XHRcdGlmKHRoaXMubWFqb3JFYXN0QXNpYSlcblx0XHRcdFx0cmV0dXJuIHRoaXMubWFqb3JFYXN0QXNpYVxuXHRcdFx0dmFyIHQ9dGhpcy53WG1sLiQxKCdtYWpvckZvbnQ+ZWEnKS5hdHRyKCd0eXBlZmFjZScpXG5cdFx0XHRpZih0Lmxlbmd0aD09MClcblx0XHRcdFx0dD10aGlzLndYbWwuJDEoJ21ham9yRm9udD5mb250W3NjcmlwdD1cIicrdGhpcy54TGFuZy5hdHRyKCd3OmVhc3RBc2lhJykrJ1wiXScpXG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckVhc3RBc2lhPXRcblx0XHRjYXNlICdtYWpvckVhc3RBc2lhJzpcblx0XHRcdGlmKHRoaXMubWFqb3JFYXN0QXNpYSlcblx0XHRcdFx0cmV0dXJuIHRoaXMubWFqb3JFYXN0QXNpYVxuXHRcdFx0dmFyIHQ9dGhpcy53WG1sLiQxKCdtaW5vckZvbnQ+ZWEnKS5hdHRyKCd0eXBlZmFjZScpXG5cdFx0XHRpZih0Lmxlbmd0aD09MClcblx0XHRcdFx0dD10aGlzLndYbWwuJDEoJ21pbm9yRm9udD5mb250W3NjcmlwdD1cIicrdGhpcy54TGFuZy5hdHRyKCd3OmVhc3RBc2lhJykrJ1wiXScpXG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckVhc3RBc2lhPXRcblx0XHRjYXNlICdtYWpvckJpZGknOlxuXHRcdFx0aWYodGhpcy5tYWpvckJpZGkpXG5cdFx0XHRcdHJldHVybiB0aGlzLm1ham9yQmlkaVxuXHRcdFx0dmFyIHQ9dGhpcy53WG1sLiQxKCdtYWpvckZvbnQ+Y3MnKS5hdHRyKCd0eXBlZmFjZScpXG5cdFx0XHRpZih0Lmxlbmd0aD09MClcblx0XHRcdFx0dD10aGlzLndYbWwuJDEoJ21ham9yRm9udD5mb250W3NjcmlwdD1cIicrdGhpcy54TGFuZy5hdHRyKCd3OmJpZGknKSsnXCJdJylcblx0XHRcdHJldHVybiB0aGlzLm1ham9yQmlkaT10XG5cdFx0Y2FzZSAnbWFqb3JCaWRpJzpcblx0XHRcdGlmKHRoaXMubWFqb3JCaWRpKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYWpvckJpZGlcblx0XHRcdHZhciB0PXRoaXMud1htbC4kMSgnbWlub3JGb250PmNzJykuYXR0cigndHlwZWZhY2UnKVxuXHRcdFx0aWYodC5sZW5ndGg9PTApXG5cdFx0XHRcdHQ9dGhpcy53WG1sLiQxKCdtaW5vckZvbnQ+Zm9udFtzY3JpcHQ9XCInK3RoaXMueExhbmcuYXR0cigndzpiaWRpJykrJ1wiXScpXG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckJpZGk9dFxuXHRcdH1cblx0fVxufVxuIl19