'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var font = function () {
	function font(scheme, xLang) {
		_classCallCheck(this, font);

		this.majorFont = scheme.get('a:majorFont.a:font').reduce(function (p, _ref) {
			var _ref$$ = _ref.$;
			var script = _ref$$.script;
			var typeface = _ref$$.typeface;
			return p[script] = typeface, p;
		}, {});

		this.minorFont = scheme.get('a:minorFont.a:font').reduce(function (p, _ref2) {
			var _ref2$$ = _ref2.$;
			var script = _ref2$$.script;
			var typeface = _ref2$$.typeface;
			return p[script] = typeface, p;
		}, {});

		var typeface = void 0;
		if (typeface = scheme.get('a:minorFont.a:latin.$.typeface')) this.minorFont.ascii = typeface;

		if (typeface = scheme.get('a:majorFont.a:latin.$.typeface')) this.majorFont.ascii = typeface;

		var ea = xLang['w:eastAsia'];
		if (typeface = scheme.get('a:minorFont.a:ea.$.typeface')) this.minorFont.ea = typeface;else if (ea && (typeface = this.minorFont[ea])) this.minorFont.ea = typeface;

		if (typeface = scheme.get('a:majorFont.a:ea.$.typeface')) this.majorFont.ea = typeface;else if (ea && (typeface = this.majorFont[ea])) this.majorFont.ea = typeface;

		var bidi = xLang['w:bidi'];
		if (typeface = scheme.get('a:minorFont.a:cs.$.typeface')) this.minorFont.bidi = typeface;else if (bidi && (typeface = this.minorFont[bidi])) this.minorFont.bidi = typeface;

		if (typeface = scheme.get('a:majorFont.a:cs.$.typeface')) this.majorFont.bidi = typeface;else if (bidi && (typeface = this.majorFont[bidi])) this.majorFont.bidi = typeface;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLElBQ3BCLENBQVksTUFBWixFQUFtQixLQUFuQixFQUF5Qjt3QkFETCxNQUNLOztBQUN4QixPQUFLLFNBQUwsR0FBZSxPQUFPLEdBQVAsQ0FBVyxvQkFBWCxFQUNiLE1BRGEsQ0FDTixVQUFDLENBQUQ7cUJBQUk7T0FBRztPQUFPO1VBQWMsRUFBRSxNQUFGLElBQVUsUUFBVixFQUFtQixDQUFuQjtHQUE1QixFQUFrRCxFQUQ1QyxDQUFmLENBRHdCOztBQUl4QixPQUFLLFNBQUwsR0FBZSxPQUFPLEdBQVAsQ0FBVyxvQkFBWCxFQUNiLE1BRGEsQ0FDTixVQUFDLENBQUQ7dUJBQUk7T0FBRztPQUFPO1VBQWMsRUFBRSxNQUFGLElBQVUsUUFBVixFQUFtQixDQUFuQjtHQUE1QixFQUFrRCxFQUQ1QyxDQUFmLENBSndCOztBQU94QixNQUFJLGlCQUFKLENBUHdCO0FBUXhCLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyxnQ0FBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsS0FBZixHQUFxQixRQUFyQixDQUREOztBQUdBLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyxnQ0FBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsS0FBZixHQUFxQixRQUFyQixDQUREOztBQUdBLE1BQUksS0FBRyxNQUFNLFlBQU4sQ0FBSCxDQWRvQjtBQWV4QixNQUFHLFdBQVMsT0FBTyxHQUFQLENBQVcsNkJBQVgsQ0FBVCxFQUNGLEtBQUssU0FBTCxDQUFlLEVBQWYsR0FBa0IsUUFBbEIsQ0FERCxLQUVLLElBQUcsT0FBTyxXQUFTLEtBQUssU0FBTCxDQUFlLEVBQWYsQ0FBVCxDQUFQLEVBQ1AsS0FBSyxTQUFMLENBQWUsRUFBZixHQUFrQixRQUFsQixDQURJOztBQUdMLE1BQUcsV0FBUyxPQUFPLEdBQVAsQ0FBVyw2QkFBWCxDQUFULEVBQ0YsS0FBSyxTQUFMLENBQWUsRUFBZixHQUFrQixRQUFsQixDQURELEtBRUssSUFBRyxPQUFPLFdBQVMsS0FBSyxTQUFMLENBQWUsRUFBZixDQUFULENBQVAsRUFDUCxLQUFLLFNBQUwsQ0FBZSxFQUFmLEdBQWtCLFFBQWxCLENBREk7O0FBR0wsTUFBSSxPQUFLLE1BQU0sUUFBTixDQUFMLENBekJvQjtBQTBCeEIsTUFBRyxXQUFTLE9BQU8sR0FBUCxDQUFXLDZCQUFYLENBQVQsRUFDRixLQUFLLFNBQUwsQ0FBZSxJQUFmLEdBQW9CLFFBQXBCLENBREQsS0FFSyxJQUFHLFNBQVMsV0FBUyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVQsQ0FBVCxFQUNQLEtBQUssU0FBTCxDQUFlLElBQWYsR0FBb0IsUUFBcEIsQ0FESTs7QUFHTCxNQUFHLFdBQVMsT0FBTyxHQUFQLENBQVcsNkJBQVgsQ0FBVCxFQUNGLEtBQUssU0FBTCxDQUFlLElBQWYsR0FBb0IsUUFBcEIsQ0FERCxLQUVLLElBQUcsU0FBUyxXQUFTLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBVCxDQUFULEVBQ1AsS0FBSyxTQUFMLENBQWUsSUFBZixHQUFvQixRQUFwQixDQURJO0VBakNOOztjQURvQjs7c0JBcUNoQixNQUFLO0FBQ1IsV0FBTyxJQUFQO0FBQ0EsU0FBSyxZQUFMLENBREE7QUFFQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FEUjtBQUZBLFNBSUssZUFBTDtBQUNDLFlBQU8sS0FBSyxTQUFMLENBQWUsRUFBZixDQURSO0FBSkEsU0FNSyxXQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBRFI7O0FBTkEsU0FTSyxZQUFMLENBVEE7QUFVQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FEUjtBQVZBLFNBWUssZUFBTDtBQUNDLFlBQU8sS0FBSyxTQUFMLENBQWUsRUFBZixDQURSO0FBWkEsU0FjSyxXQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBRFI7QUFkQSxJQURROzs7O1FBckNXIiwiZmlsZSI6ImZvbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBmb250e1xuXHRjb25zdHJ1Y3RvcihzY2hlbWUseExhbmcpe1xuXHRcdHRoaXMubWFqb3JGb250PXNjaGVtZS5nZXQoJ2E6bWFqb3JGb250LmE6Zm9udCcpXG5cdFx0XHQucmVkdWNlKChwLHskOntzY3JpcHQsdHlwZWZhY2V9fSk9PihwW3NjcmlwdF09dHlwZWZhY2UscCkse30pXG5cdFx0XHRcblx0XHR0aGlzLm1pbm9yRm9udD1zY2hlbWUuZ2V0KCdhOm1pbm9yRm9udC5hOmZvbnQnKVxuXHRcdFx0LnJlZHVjZSgocCx7JDp7c2NyaXB0LHR5cGVmYWNlfX0pPT4ocFtzY3JpcHRdPXR5cGVmYWNlLHApLHt9KVxuXHRcdFxuXHRcdGxldCB0eXBlZmFjZVxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ2E6bWlub3JGb250LmE6bGF0aW4uJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYXNjaWk9dHlwZWZhY2Vcblx0XHRcblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdhOm1ham9yRm9udC5hOmxhdGluLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmFzY2lpPXR5cGVmYWNlXG5cdFx0XG5cdFx0bGV0IGVhPXhMYW5nWyd3OmVhc3RBc2lhJ11cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdhOm1pbm9yRm9udC5hOmVhLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXG5cdFx0ZWxzZSBpZihlYSAmJiAodHlwZWZhY2U9dGhpcy5taW5vckZvbnRbZWFdKSlcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXG5cdFx0XG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnYTptYWpvckZvbnQuYTplYS4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5lYT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoZWEgJiYgKHR5cGVmYWNlPXRoaXMubWFqb3JGb250W2VhXSkpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5lYT10eXBlZmFjZVxuXHRcdFxuXHRcdGxldCBiaWRpPXhMYW5nWyd3OmJpZGknXVxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ2E6bWlub3JGb250LmE6Y3MuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYmlkaT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoYmlkaSAmJiAodHlwZWZhY2U9dGhpcy5taW5vckZvbnRbYmlkaV0pKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYmlkaT10eXBlZmFjZVxuXHRcdFxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ2E6bWFqb3JGb250LmE6Y3MuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoYmlkaSAmJiAodHlwZWZhY2U9dGhpcy5tYWpvckZvbnRbYmlkaV0pKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxuXHR9XG5cdGdldChuYW1lKXtcblx0XHRzd2l0Y2gobmFtZSl7XG5cdFx0Y2FzZSAnbWlub3JIQW5zaSc6XG5cdFx0Y2FzZSAnbWlub3JBc2NpaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYXNjaWlcblx0XHRjYXNlICdtaW5vckVhc3RBc2lhJzpcblx0XHRcdHJldHVybiB0aGlzLm1pbm9yRm9udC5lYVxuXHRcdGNhc2UgJ21pbm9yQmlkaSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYmlkaVxuXHRcdFxuXHRcdGNhc2UgJ21ham9ySEFuc2knOlxuXHRcdGNhc2UgJ21ham9yQXNjaWknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmFzY2lpXG5cdFx0Y2FzZSAnbWFqb3JFYXN0QXNpYSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckZvbnQuZWFcblx0XHRjYXNlICdtYWpvckJpZGknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmJpZGlcblx0XHR9XG5cdH1cbn1cbiJdfQ==