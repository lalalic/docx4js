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
			var _ref$$ = _ref.$,
			    script = _ref$$.script,
			    typeface = _ref$$.typeface;
			return p[script] = typeface, p;
		}, {});

		this.minorFont = scheme.get('minorFont.font').reduce(function (p, _ref2) {
			var _ref2$$ = _ref2.$,
			    script = _ref2$$.script,
			    typeface = _ref2$$.typeface;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6WyJmb250Iiwic2NoZW1lIiwieExhbmciLCJtYWpvckZvbnQiLCJnZXQiLCJyZWR1Y2UiLCJwIiwiJCIsInNjcmlwdCIsInR5cGVmYWNlIiwibWlub3JGb250IiwiYXNjaWkiLCJlYSIsImJpZGkiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxJO0FBQ3BCLGVBQVlDLE1BQVosRUFBbUJDLEtBQW5CLEVBQXlCO0FBQUE7O0FBQ3hCLE9BQUtDLFNBQUwsR0FBZUYsT0FBT0csR0FBUCxDQUFXLGdCQUFYLEVBQ2JDLE1BRGEsQ0FDTixVQUFDQyxDQUFEO0FBQUEscUJBQUlDLENBQUo7QUFBQSxPQUFPQyxNQUFQLFVBQU9BLE1BQVA7QUFBQSxPQUFjQyxRQUFkLFVBQWNBLFFBQWQ7QUFBQSxVQUE0QkgsRUFBRUUsTUFBRixJQUFVQyxRQUFWLEVBQW1CSCxDQUEvQztBQUFBLEdBRE0sRUFDNEMsRUFENUMsQ0FBZjs7QUFHQSxPQUFLSSxTQUFMLEdBQWVULE9BQU9HLEdBQVAsQ0FBVyxnQkFBWCxFQUNiQyxNQURhLENBQ04sVUFBQ0MsQ0FBRDtBQUFBLHVCQUFJQyxDQUFKO0FBQUEsT0FBT0MsTUFBUCxXQUFPQSxNQUFQO0FBQUEsT0FBY0MsUUFBZCxXQUFjQSxRQUFkO0FBQUEsVUFBNEJILEVBQUVFLE1BQUYsSUFBVUMsUUFBVixFQUFtQkgsQ0FBL0M7QUFBQSxHQURNLEVBQzRDLEVBRDVDLENBQWY7O0FBR0EsTUFBSUcsaUJBQUo7QUFDQSxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcsNEJBQVgsQ0FBWixFQUNDLEtBQUtNLFNBQUwsQ0FBZUMsS0FBZixHQUFxQkYsUUFBckI7O0FBRUQsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLDRCQUFYLENBQVosRUFDQyxLQUFLRCxTQUFMLENBQWVRLEtBQWYsR0FBcUJGLFFBQXJCOztBQUVELE1BQUlHLEtBQUdWLE1BQU0sVUFBTixDQUFQO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVFLEVBQWYsR0FBa0JILFFBQWxCLENBREQsS0FFSyxJQUFHRyxPQUFPSCxXQUFTLEtBQUtDLFNBQUwsQ0FBZUUsRUFBZixDQUFoQixDQUFILEVBQ0osS0FBS0YsU0FBTCxDQUFlRSxFQUFmLEdBQWtCSCxRQUFsQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVMsRUFBZixHQUFrQkgsUUFBbEIsQ0FERCxLQUVLLElBQUdHLE9BQU9ILFdBQVMsS0FBS04sU0FBTCxDQUFlUyxFQUFmLENBQWhCLENBQUgsRUFDSixLQUFLVCxTQUFMLENBQWVTLEVBQWYsR0FBa0JILFFBQWxCOztBQUVELE1BQUlJLE9BQUtYLE1BQU0sTUFBTixDQUFUO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVHLElBQWYsR0FBb0JKLFFBQXBCLENBREQsS0FFSyxJQUFHSSxTQUFTSixXQUFTLEtBQUtDLFNBQUwsQ0FBZUcsSUFBZixDQUFsQixDQUFILEVBQ0osS0FBS0gsU0FBTCxDQUFlRyxJQUFmLEdBQW9CSixRQUFwQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVUsSUFBZixHQUFvQkosUUFBcEIsQ0FERCxLQUVLLElBQUdJLFNBQVNKLFdBQVMsS0FBS04sU0FBTCxDQUFlVSxJQUFmLENBQWxCLENBQUgsRUFDSixLQUFLVixTQUFMLENBQWVVLElBQWYsR0FBb0JKLFFBQXBCO0FBQ0Q7Ozs7c0JBQ0dLLEksRUFBSztBQUNSLFdBQU9BLElBQVA7QUFDQSxTQUFLLFlBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUtKLFNBQUwsQ0FBZUMsS0FBdEI7QUFDRCxTQUFLLGVBQUw7QUFDQyxZQUFPLEtBQUtELFNBQUwsQ0FBZUUsRUFBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxZQUFPLEtBQUtGLFNBQUwsQ0FBZUcsSUFBdEI7O0FBRUQsU0FBSyxZQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLVixTQUFMLENBQWVRLEtBQXRCO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsWUFBTyxLQUFLUixTQUFMLENBQWVTLEVBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsWUFBTyxLQUFLVCxTQUFMLENBQWVVLElBQXRCO0FBZkQ7QUFpQkE7Ozs7OztrQkF2RG1CYixJIiwiZmlsZSI6ImZvbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBmb250e1xyXG5cdGNvbnN0cnVjdG9yKHNjaGVtZSx4TGFuZyl7XHJcblx0XHR0aGlzLm1ham9yRm9udD1zY2hlbWUuZ2V0KCdtYWpvckZvbnQuZm9udCcpXHJcblx0XHRcdC5yZWR1Y2UoKHAseyQ6e3NjcmlwdCx0eXBlZmFjZX19KT0+KHBbc2NyaXB0XT10eXBlZmFjZSxwKSx7fSlcclxuXHJcblx0XHR0aGlzLm1pbm9yRm9udD1zY2hlbWUuZ2V0KCdtaW5vckZvbnQuZm9udCcpXHJcblx0XHRcdC5yZWR1Y2UoKHAseyQ6e3NjcmlwdCx0eXBlZmFjZX19KT0+KHBbc2NyaXB0XT10eXBlZmFjZSxwKSx7fSlcclxuXHJcblx0XHRsZXQgdHlwZWZhY2VcclxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5sYXRpbi4kLnR5cGVmYWNlJykpXHJcblx0XHRcdHRoaXMubWlub3JGb250LmFzY2lpPXR5cGVmYWNlXHJcblxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmxhdGluLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYXNjaWk9dHlwZWZhY2VcclxuXHJcblx0XHRsZXQgZWE9eExhbmdbJ2Vhc3RBc2lhJ11cclxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5lYS4kLnR5cGVmYWNlJykpXHJcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXHJcblx0XHRlbHNlIGlmKGVhICYmICh0eXBlZmFjZT10aGlzLm1pbm9yRm9udFtlYV0pKVxyXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5lYT10eXBlZmFjZVxyXG5cclxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21ham9yRm9udC5lYS4kLnR5cGVmYWNlJykpXHJcblx0XHRcdHRoaXMubWFqb3JGb250LmVhPXR5cGVmYWNlXHJcblx0XHRlbHNlIGlmKGVhICYmICh0eXBlZmFjZT10aGlzLm1ham9yRm9udFtlYV0pKVxyXG5cdFx0XHR0aGlzLm1ham9yRm9udC5lYT10eXBlZmFjZVxyXG5cclxuXHRcdGxldCBiaWRpPXhMYW5nWydiaWRpJ11cclxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5jcy4kLnR5cGVmYWNlJykpXHJcblx0XHRcdHRoaXMubWlub3JGb250LmJpZGk9dHlwZWZhY2VcclxuXHRcdGVsc2UgaWYoYmlkaSAmJiAodHlwZWZhY2U9dGhpcy5taW5vckZvbnRbYmlkaV0pKVxyXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5iaWRpPXR5cGVmYWNlXHJcblxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmNzLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxyXG5cdFx0ZWxzZSBpZihiaWRpICYmICh0eXBlZmFjZT10aGlzLm1ham9yRm9udFtiaWRpXSkpXHJcblx0XHRcdHRoaXMubWFqb3JGb250LmJpZGk9dHlwZWZhY2VcclxuXHR9XHJcblx0Z2V0KG5hbWUpe1xyXG5cdFx0c3dpdGNoKG5hbWUpe1xyXG5cdFx0Y2FzZSAnbWlub3JIQW5zaSc6XHJcblx0XHRjYXNlICdtaW5vckFzY2lpJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JGb250LmFzY2lpXHJcblx0XHRjYXNlICdtaW5vckVhc3RBc2lhJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JGb250LmVhXHJcblx0XHRjYXNlICdtaW5vckJpZGknOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYmlkaVxyXG5cclxuXHRcdGNhc2UgJ21ham9ySEFuc2knOlxyXG5cdFx0Y2FzZSAnbWFqb3JBc2NpaSc6XHJcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRm9udC5hc2NpaVxyXG5cdFx0Y2FzZSAnbWFqb3JFYXN0QXNpYSc6XHJcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRm9udC5lYVxyXG5cdFx0Y2FzZSAnbWFqb3JCaWRpJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmJpZGlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuIl19