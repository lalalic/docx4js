'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var font = function () {
	function font(scheme, xLang) {
		_classCallCheck(this, font);

		this.majorFont = scheme.get('majorFont.font').reduce(function (p, _ref) {
			var _ref$$ = _ref.$;
			var script = _ref$$.script;
			var typeface = _ref$$.typeface;
			return p[script] = typeface, p;
		}, {});

		this.minorFont = scheme.get('minorFont.font').reduce(function (p, _ref2) {
			var _ref2$$ = _ref2.$;
			var script = _ref2$$.script;
			var typeface = _ref2$$.typeface;
			return p[script] = typeface, p;
		}, {});

		var typeface = void 0;
		if (typeface = scheme.get('minorFont.latin.$.typeface')) this.minorFont.ascii = typeface;

		if (typeface = scheme.get('majorFont.latin.$.typeface')) this.majorFont.ascii = typeface;

		var ea = xLang['eastAsia'];
		if (typeface = scheme.get('minorFont.ea.$.typeface')) this.minorFont.ea = typeface;else if (ea && (typeface = this.minorFont[ea])) this.minorFont.ea = typeface;

		if (typeface = scheme.get('majorFont.ea.$.typeface')) this.majorFont.ea = typeface;else if (ea && (typeface = this.majorFont[ea])) this.majorFont.ea = typeface;

		var bidi = xLang['bidi'];
		if (typeface = scheme.get('minorFont.cs.$.typeface')) this.minorFont.bidi = typeface;else if (bidi && (typeface = this.minorFont[bidi])) this.minorFont.bidi = typeface;

		if (typeface = scheme.get('majorFont.cs.$.typeface')) this.majorFont.bidi = typeface;else if (bidi && (typeface = this.majorFont[bidi])) this.majorFont.bidi = typeface;
	}

	_createClass(font, [{
		key: 'get',
		value: function get(name) {
			switch (name) {
				case 'minorHAnsi':
				case 'minorAscii':
					return this.minorFont.ascii;
				case 'minorEastAsia':
					return this.minorFont.ea;
				case 'minorBidi':
					return this.minorFont.bidi;

				case 'majorHAnsi':
				case 'majorAscii':
					return this.majorFont.ascii;
				case 'majorEastAsia':
					return this.majorFont.ea;
				case 'majorBidi':
					return this.majorFont.bidi;
			}
		}
	}]);

	return font;
}();

exports.default = font;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLElBQ3BCLENBQVksTUFBWixFQUFtQixLQUFuQixFQUF5Qjt3QkFETCxNQUNLOztBQUN4QixPQUFLLFNBQUwsR0FBZSxPQUFPLEdBQVAsQ0FBVyxnQkFBWCxFQUNiLE1BRGEsQ0FDTixVQUFDLENBQUQ7cUJBQUk7T0FBRztPQUFPO1VBQWMsRUFBRSxNQUFGLElBQVUsUUFBVixFQUFtQixDQUFuQjtHQUE1QixFQUFrRCxFQUQ1QyxDQUFmLENBRHdCOztBQUl4QixPQUFLLFNBQUwsR0FBZSxPQUFPLEdBQVAsQ0FBVyxnQkFBWCxFQUNiLE1BRGEsQ0FDTixVQUFDLENBQUQ7dUJBQUk7T0FBRztPQUFPO1VBQWMsRUFBRSxNQUFGLElBQVUsUUFBVixFQUFtQixDQUFuQjtHQUE1QixFQUFrRCxFQUQ1QyxDQUFmLENBSndCOztBQU94QixNQUFJLGlCQUFKLENBUHdCO0FBUXhCLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyw0QkFBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsS0FBZixHQUFxQixRQUFyQixDQUREOztBQUdBLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyw0QkFBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsS0FBZixHQUFxQixRQUFyQixDQUREOztBQUdBLE1BQUksS0FBRyxNQUFNLFVBQU4sQ0FBSCxDQWRvQjtBQWV4QixNQUFHLFdBQVMsT0FBTyxHQUFQLENBQVcseUJBQVgsQ0FBVCxFQUNGLEtBQUssU0FBTCxDQUFlLEVBQWYsR0FBa0IsUUFBbEIsQ0FERCxLQUVLLElBQUcsT0FBTyxXQUFTLEtBQUssU0FBTCxDQUFlLEVBQWYsQ0FBVCxDQUFQLEVBQ1AsS0FBSyxTQUFMLENBQWUsRUFBZixHQUFrQixRQUFsQixDQURJOztBQUdMLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyx5QkFBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsRUFBZixHQUFrQixRQUFsQixDQURELEtBRUssSUFBRyxPQUFPLFdBQVMsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFULENBQVAsRUFDUCxLQUFLLFNBQUwsQ0FBZSxFQUFmLEdBQWtCLFFBQWxCLENBREk7O0FBR0wsTUFBSSxPQUFLLE1BQU0sTUFBTixDQUFMLENBekJvQjtBQTBCeEIsTUFBRyxXQUFTLE9BQU8sR0FBUCxDQUFXLHlCQUFYLENBQVQsRUFDRixLQUFLLFNBQUwsQ0FBZSxJQUFmLEdBQW9CLFFBQXBCLENBREQsS0FFSyxJQUFHLFNBQVMsV0FBUyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVQsQ0FBVCxFQUNQLEtBQUssU0FBTCxDQUFlLElBQWYsR0FBb0IsUUFBcEIsQ0FESTs7QUFHTCxNQUFHLFdBQVMsT0FBTyxHQUFQLENBQVcseUJBQVgsQ0FBVCxFQUNGLEtBQUssU0FBTCxDQUFlLElBQWYsR0FBb0IsUUFBcEIsQ0FERCxLQUVLLElBQUcsU0FBUyxXQUFTLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBVCxDQUFULEVBQ1AsS0FBSyxTQUFMLENBQWUsSUFBZixHQUFvQixRQUFwQixDQURJO0VBakNOOztjQURvQjs7c0JBcUNoQixNQUFLO0FBQ1IsV0FBTyxJQUFQO0FBQ0EsU0FBSyxZQUFMLENBREE7QUFFQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FEUjtBQUZBLFNBSUssZUFBTDtBQUNDLFlBQU8sS0FBSyxTQUFMLENBQWUsRUFBZixDQURSO0FBSkEsU0FNSyxXQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBRFI7O0FBTkEsU0FTSyxZQUFMLENBVEE7QUFVQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FEUjtBQVZBLFNBWUssZUFBTDtBQUNDLFlBQU8sS0FBSyxTQUFMLENBQWUsRUFBZixDQURSO0FBWkEsU0FjSyxXQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBRFI7QUFkQSxJQURROzs7O1FBckNXIiwiZmlsZSI6ImZvbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBmb250e1xuXHRjb25zdHJ1Y3RvcihzY2hlbWUseExhbmcpe1xuXHRcdHRoaXMubWFqb3JGb250PXNjaGVtZS5nZXQoJ21ham9yRm9udC5mb250Jylcblx0XHRcdC5yZWR1Y2UoKHAseyQ6e3NjcmlwdCx0eXBlZmFjZX19KT0+KHBbc2NyaXB0XT10eXBlZmFjZSxwKSx7fSlcblxuXHRcdHRoaXMubWlub3JGb250PXNjaGVtZS5nZXQoJ21pbm9yRm9udC5mb250Jylcblx0XHRcdC5yZWR1Y2UoKHAseyQ6e3NjcmlwdCx0eXBlZmFjZX19KT0+KHBbc2NyaXB0XT10eXBlZmFjZSxwKSx7fSlcblxuXHRcdGxldCB0eXBlZmFjZVxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5sYXRpbi4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5hc2NpaT10eXBlZmFjZVxuXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmxhdGluLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmFzY2lpPXR5cGVmYWNlXG5cblx0XHRsZXQgZWE9eExhbmdbJ2Vhc3RBc2lhJ11cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtaW5vckZvbnQuZWEuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuZWE9dHlwZWZhY2Vcblx0XHRlbHNlIGlmKGVhICYmICh0eXBlZmFjZT10aGlzLm1pbm9yRm9udFtlYV0pKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuZWE9dHlwZWZhY2VcblxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21ham9yRm9udC5lYS4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5lYT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoZWEgJiYgKHR5cGVmYWNlPXRoaXMubWFqb3JGb250W2VhXSkpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5lYT10eXBlZmFjZVxuXG5cdFx0bGV0IGJpZGk9eExhbmdbJ2JpZGknXVxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5jcy4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5iaWRpPXR5cGVmYWNlXG5cdFx0ZWxzZSBpZihiaWRpICYmICh0eXBlZmFjZT10aGlzLm1pbm9yRm9udFtiaWRpXSkpXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5iaWRpPXR5cGVmYWNlXG5cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtYWpvckZvbnQuY3MuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoYmlkaSAmJiAodHlwZWZhY2U9dGhpcy5tYWpvckZvbnRbYmlkaV0pKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxuXHR9XG5cdGdldChuYW1lKXtcblx0XHRzd2l0Y2gobmFtZSl7XG5cdFx0Y2FzZSAnbWlub3JIQW5zaSc6XG5cdFx0Y2FzZSAnbWlub3JBc2NpaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYXNjaWlcblx0XHRjYXNlICdtaW5vckVhc3RBc2lhJzpcblx0XHRcdHJldHVybiB0aGlzLm1pbm9yRm9udC5lYVxuXHRcdGNhc2UgJ21pbm9yQmlkaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYmlkaVxuXG5cdFx0Y2FzZSAnbWFqb3JIQW5zaSc6XG5cdFx0Y2FzZSAnbWFqb3JBc2NpaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckZvbnQuYXNjaWlcblx0XHRjYXNlICdtYWpvckVhc3RBc2lhJzpcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRm9udC5lYVxuXHRcdGNhc2UgJ21ham9yQmlkaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckZvbnQuYmlkaVxuXHRcdH1cblx0fVxufVxuIl19