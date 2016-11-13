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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6WyJmb250Iiwid1htbCIsInhMYW5nIiwibmFtZSIsIm1pbm9ySEFuc2kiLCJtaW5vckFzY2lpIiwiJDEiLCJhdHRyIiwibWFqb3JIQW5zaSIsIm1ham9yQXNjaWkiLCJtYWpvckVhc3RBc2lhIiwidCIsImxlbmd0aCIsIm1ham9yQmlkaSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsSTtBQUNwQixlQUFZQyxJQUFaLEVBQWlCQyxLQUFqQixFQUF1QjtBQUFBOztBQUN0QixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OztzQkFDR0MsSSxFQUFLO0FBQ1IsV0FBT0EsSUFBUDtBQUNBLFNBQUssWUFBTDtBQUNBLFNBQUssWUFBTDtBQUNDLFlBQU8sS0FBS0MsVUFBTCxLQUFvQixLQUFLQSxVQUFMLEdBQWdCLEtBQUtDLFVBQUwsR0FBZ0IsS0FBS0osSUFBTCxDQUFVSyxFQUFWLENBQWEsaUJBQWIsRUFBZ0NDLElBQWhDLENBQXFDLFVBQXJDLENBQXBELENBQVA7QUFDRCxTQUFLLFlBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUtDLFVBQUwsS0FBb0IsS0FBS0EsVUFBTCxHQUFnQixLQUFLQyxVQUFMLEdBQWdCLEtBQUtSLElBQUwsQ0FBVUssRUFBVixDQUFhLGlCQUFiLEVBQWdDQyxJQUFoQyxDQUFxQyxVQUFyQyxDQUFwRCxDQUFQO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsU0FBRyxLQUFLRyxhQUFSLEVBQ0MsT0FBTyxLQUFLQSxhQUFaO0FBQ0QsU0FBSUMsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSxjQUFiLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFsQyxDQUFOO0FBQ0EsU0FBR0ksRUFBRUMsTUFBRixJQUFVLENBQWIsRUFDQ0QsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSw0QkFBMEIsS0FBS0osS0FBTCxDQUFXSyxJQUFYLENBQWdCLFlBQWhCLENBQTFCLEdBQXdELElBQXJFLENBQUY7QUFDRCxZQUFPLEtBQUtHLGFBQUwsR0FBbUJDLENBQTFCO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsU0FBRyxLQUFLRCxhQUFSLEVBQ0MsT0FBTyxLQUFLQSxhQUFaO0FBQ0QsU0FBSUMsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSxjQUFiLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFsQyxDQUFOO0FBQ0EsU0FBR0ksRUFBRUMsTUFBRixJQUFVLENBQWIsRUFDQ0QsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSw0QkFBMEIsS0FBS0osS0FBTCxDQUFXSyxJQUFYLENBQWdCLFlBQWhCLENBQTFCLEdBQXdELElBQXJFLENBQUY7QUFDRCxZQUFPLEtBQUtHLGFBQUwsR0FBbUJDLENBQTFCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsU0FBRyxLQUFLRSxTQUFSLEVBQ0MsT0FBTyxLQUFLQSxTQUFaO0FBQ0QsU0FBSUYsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSxjQUFiLEVBQTZCQyxJQUE3QixDQUFrQyxVQUFsQyxDQUFOO0FBQ0EsU0FBR0ksRUFBRUMsTUFBRixJQUFVLENBQWIsRUFDQ0QsSUFBRSxLQUFLVixJQUFMLENBQVVLLEVBQVYsQ0FBYSw0QkFBMEIsS0FBS0osS0FBTCxDQUFXSyxJQUFYLENBQWdCLFFBQWhCLENBQTFCLEdBQW9ELElBQWpFLENBQUY7QUFDRCxZQUFPLEtBQUtNLFNBQUwsR0FBZUYsQ0FBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxTQUFHLEtBQUtFLFNBQVIsRUFDQyxPQUFPLEtBQUtBLFNBQVo7QUFDRCxTQUFJRixJQUFFLEtBQUtWLElBQUwsQ0FBVUssRUFBVixDQUFhLGNBQWIsRUFBNkJDLElBQTdCLENBQWtDLFVBQWxDLENBQU47QUFDQSxTQUFHSSxFQUFFQyxNQUFGLElBQVUsQ0FBYixFQUNDRCxJQUFFLEtBQUtWLElBQUwsQ0FBVUssRUFBVixDQUFhLDRCQUEwQixLQUFLSixLQUFMLENBQVdLLElBQVgsQ0FBZ0IsUUFBaEIsQ0FBMUIsR0FBb0QsSUFBakUsQ0FBRjtBQUNELFlBQU8sS0FBS00sU0FBTCxHQUFlRixDQUF0QjtBQWxDRDtBQW9DQTs7Ozs7O2tCQTFDbUJYLEkiLCJmaWxlIjoiZm9udC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvbnR7XG5cdGNvbnN0cnVjdG9yKHdYbWwseExhbmcpe1xuXHRcdHRoaXMud1htbD13WG1sXG5cdFx0dGhpcy54TGFuZz14TGFuZ1xuXHR9XG5cdGdldChuYW1lKXtcblx0XHRzd2l0Y2gobmFtZSl7XG5cdFx0Y2FzZSAnbWlub3JIQW5zaSc6XG5cdFx0Y2FzZSAnbWlub3JBc2NpaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckhBbnNpIHx8ICh0aGlzLm1pbm9ySEFuc2k9dGhpcy5taW5vckFzY2lpPXRoaXMud1htbC4kMSgnbWlub3JGb250PmxhdGluJykuYXR0cigndHlwZWZhY2UnKSlcblx0XHRjYXNlICdtYWpvckhBbnNpJzpcblx0XHRjYXNlICdtYWpvckFzY2lpJzpcblx0XHRcdHJldHVybiB0aGlzLm1ham9ySEFuc2kgfHwgKHRoaXMubWFqb3JIQW5zaT10aGlzLm1ham9yQXNjaWk9dGhpcy53WG1sLiQxKCdtYWpvckZvbnQ+bGF0aW4nKS5hdHRyKCd0eXBlZmFjZScpKVxuXHRcdGNhc2UgJ21ham9yRWFzdEFzaWEnOlxuXHRcdFx0aWYodGhpcy5tYWpvckVhc3RBc2lhKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYWpvckVhc3RBc2lhXG5cdFx0XHR2YXIgdD10aGlzLndYbWwuJDEoJ21ham9yRm9udD5lYScpLmF0dHIoJ3R5cGVmYWNlJylcblx0XHRcdGlmKHQubGVuZ3RoPT0wKVxuXHRcdFx0XHR0PXRoaXMud1htbC4kMSgnbWFqb3JGb250PmZvbnRbc2NyaXB0PVwiJyt0aGlzLnhMYW5nLmF0dHIoJ3c6ZWFzdEFzaWEnKSsnXCJdJylcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRWFzdEFzaWE9dFxuXHRcdGNhc2UgJ21ham9yRWFzdEFzaWEnOlxuXHRcdFx0aWYodGhpcy5tYWpvckVhc3RBc2lhKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5tYWpvckVhc3RBc2lhXG5cdFx0XHR2YXIgdD10aGlzLndYbWwuJDEoJ21pbm9yRm9udD5lYScpLmF0dHIoJ3R5cGVmYWNlJylcblx0XHRcdGlmKHQubGVuZ3RoPT0wKVxuXHRcdFx0XHR0PXRoaXMud1htbC4kMSgnbWlub3JGb250PmZvbnRbc2NyaXB0PVwiJyt0aGlzLnhMYW5nLmF0dHIoJ3c6ZWFzdEFzaWEnKSsnXCJdJylcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRWFzdEFzaWE9dFxuXHRcdGNhc2UgJ21ham9yQmlkaSc6XG5cdFx0XHRpZih0aGlzLm1ham9yQmlkaSlcblx0XHRcdFx0cmV0dXJuIHRoaXMubWFqb3JCaWRpXG5cdFx0XHR2YXIgdD10aGlzLndYbWwuJDEoJ21ham9yRm9udD5jcycpLmF0dHIoJ3R5cGVmYWNlJylcblx0XHRcdGlmKHQubGVuZ3RoPT0wKVxuXHRcdFx0XHR0PXRoaXMud1htbC4kMSgnbWFqb3JGb250PmZvbnRbc2NyaXB0PVwiJyt0aGlzLnhMYW5nLmF0dHIoJ3c6YmlkaScpKydcIl0nKVxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JCaWRpPXRcblx0XHRjYXNlICdtYWpvckJpZGknOlxuXHRcdFx0aWYodGhpcy5tYWpvckJpZGkpXG5cdFx0XHRcdHJldHVybiB0aGlzLm1ham9yQmlkaVxuXHRcdFx0dmFyIHQ9dGhpcy53WG1sLiQxKCdtaW5vckZvbnQ+Y3MnKS5hdHRyKCd0eXBlZmFjZScpXG5cdFx0XHRpZih0Lmxlbmd0aD09MClcblx0XHRcdFx0dD10aGlzLndYbWwuJDEoJ21pbm9yRm9udD5mb250W3NjcmlwdD1cIicrdGhpcy54TGFuZy5hdHRyKCd3OmJpZGknKSsnXCJdJylcblx0XHRcdHJldHVybiB0aGlzLm1ham9yQmlkaT10XG5cdFx0fVxuXHR9XG59XG4iXX0=