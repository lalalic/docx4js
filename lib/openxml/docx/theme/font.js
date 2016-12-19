'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var font = function () {
	function font(scheme, xLang) {
		(0, _classCallCheck3.default)(this, font);

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

	(0, _createClass3.default)(font, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6WyJmb250Iiwic2NoZW1lIiwieExhbmciLCJtYWpvckZvbnQiLCJnZXQiLCJyZWR1Y2UiLCJwIiwiJCIsInNjcmlwdCIsInR5cGVmYWNlIiwibWlub3JGb250IiwiYXNjaWkiLCJlYSIsImJpZGkiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxJO0FBQ3BCLGVBQVlDLE1BQVosRUFBbUJDLEtBQW5CLEVBQXlCO0FBQUE7O0FBQ3hCLE9BQUtDLFNBQUwsR0FBZUYsT0FBT0csR0FBUCxDQUFXLGdCQUFYLEVBQ2JDLE1BRGEsQ0FDTixVQUFDQyxDQUFEO0FBQUEscUJBQUlDLENBQUo7QUFBQSxPQUFPQyxNQUFQLFVBQU9BLE1BQVA7QUFBQSxPQUFjQyxRQUFkLFVBQWNBLFFBQWQ7QUFBQSxVQUE0QkgsRUFBRUUsTUFBRixJQUFVQyxRQUFWLEVBQW1CSCxDQUEvQztBQUFBLEdBRE0sRUFDNEMsRUFENUMsQ0FBZjs7QUFHQSxPQUFLSSxTQUFMLEdBQWVULE9BQU9HLEdBQVAsQ0FBVyxnQkFBWCxFQUNiQyxNQURhLENBQ04sVUFBQ0MsQ0FBRDtBQUFBLHVCQUFJQyxDQUFKO0FBQUEsT0FBT0MsTUFBUCxXQUFPQSxNQUFQO0FBQUEsT0FBY0MsUUFBZCxXQUFjQSxRQUFkO0FBQUEsVUFBNEJILEVBQUVFLE1BQUYsSUFBVUMsUUFBVixFQUFtQkgsQ0FBL0M7QUFBQSxHQURNLEVBQzRDLEVBRDVDLENBQWY7O0FBR0EsTUFBSUcsaUJBQUo7QUFDQSxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcsNEJBQVgsQ0FBWixFQUNDLEtBQUtNLFNBQUwsQ0FBZUMsS0FBZixHQUFxQkYsUUFBckI7O0FBRUQsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLDRCQUFYLENBQVosRUFDQyxLQUFLRCxTQUFMLENBQWVRLEtBQWYsR0FBcUJGLFFBQXJCOztBQUVELE1BQUlHLEtBQUdWLE1BQU0sVUFBTixDQUFQO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVFLEVBQWYsR0FBa0JILFFBQWxCLENBREQsS0FFSyxJQUFHRyxPQUFPSCxXQUFTLEtBQUtDLFNBQUwsQ0FBZUUsRUFBZixDQUFoQixDQUFILEVBQ0osS0FBS0YsU0FBTCxDQUFlRSxFQUFmLEdBQWtCSCxRQUFsQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVMsRUFBZixHQUFrQkgsUUFBbEIsQ0FERCxLQUVLLElBQUdHLE9BQU9ILFdBQVMsS0FBS04sU0FBTCxDQUFlUyxFQUFmLENBQWhCLENBQUgsRUFDSixLQUFLVCxTQUFMLENBQWVTLEVBQWYsR0FBa0JILFFBQWxCOztBQUVELE1BQUlJLE9BQUtYLE1BQU0sTUFBTixDQUFUO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVHLElBQWYsR0FBb0JKLFFBQXBCLENBREQsS0FFSyxJQUFHSSxTQUFTSixXQUFTLEtBQUtDLFNBQUwsQ0FBZUcsSUFBZixDQUFsQixDQUFILEVBQ0osS0FBS0gsU0FBTCxDQUFlRyxJQUFmLEdBQW9CSixRQUFwQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVUsSUFBZixHQUFvQkosUUFBcEIsQ0FERCxLQUVLLElBQUdJLFNBQVNKLFdBQVMsS0FBS04sU0FBTCxDQUFlVSxJQUFmLENBQWxCLENBQUgsRUFDSixLQUFLVixTQUFMLENBQWVVLElBQWYsR0FBb0JKLFFBQXBCO0FBQ0Q7Ozs7c0JBQ0dLLEksRUFBSztBQUNSLFdBQU9BLElBQVA7QUFDQSxTQUFLLFlBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUtKLFNBQUwsQ0FBZUMsS0FBdEI7QUFDRCxTQUFLLGVBQUw7QUFDQyxZQUFPLEtBQUtELFNBQUwsQ0FBZUUsRUFBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxZQUFPLEtBQUtGLFNBQUwsQ0FBZUcsSUFBdEI7O0FBRUQsU0FBSyxZQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLVixTQUFMLENBQWVRLEtBQXRCO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsWUFBTyxLQUFLUixTQUFMLENBQWVTLEVBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsWUFBTyxLQUFLVCxTQUFMLENBQWVVLElBQXRCO0FBZkQ7QUFpQkE7Ozs7O2tCQXZEbUJiLEkiLCJmaWxlIjoiZm9udC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvbnR7XHJcblx0Y29uc3RydWN0b3Ioc2NoZW1lLHhMYW5nKXtcclxuXHRcdHRoaXMubWFqb3JGb250PXNjaGVtZS5nZXQoJ21ham9yRm9udC5mb250JylcclxuXHRcdFx0LnJlZHVjZSgocCx7JDp7c2NyaXB0LHR5cGVmYWNlfX0pPT4ocFtzY3JpcHRdPXR5cGVmYWNlLHApLHt9KVxyXG5cclxuXHRcdHRoaXMubWlub3JGb250PXNjaGVtZS5nZXQoJ21pbm9yRm9udC5mb250JylcclxuXHRcdFx0LnJlZHVjZSgocCx7JDp7c2NyaXB0LHR5cGVmYWNlfX0pPT4ocFtzY3JpcHRdPXR5cGVmYWNlLHApLHt9KVxyXG5cclxuXHRcdGxldCB0eXBlZmFjZVxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmxhdGluLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5taW5vckZvbnQuYXNjaWk9dHlwZWZhY2VcclxuXHJcblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtYWpvckZvbnQubGF0aW4uJC50eXBlZmFjZScpKVxyXG5cdFx0XHR0aGlzLm1ham9yRm9udC5hc2NpaT10eXBlZmFjZVxyXG5cclxuXHRcdGxldCBlYT14TGFuZ1snZWFzdEFzaWEnXVxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmVhLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5taW5vckZvbnQuZWE9dHlwZWZhY2VcclxuXHRcdGVsc2UgaWYoZWEgJiYgKHR5cGVmYWNlPXRoaXMubWlub3JGb250W2VhXSkpXHJcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXHJcblxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmVhLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5tYWpvckZvbnQuZWE9dHlwZWZhY2VcclxuXHRcdGVsc2UgaWYoZWEgJiYgKHR5cGVmYWNlPXRoaXMubWFqb3JGb250W2VhXSkpXHJcblx0XHRcdHRoaXMubWFqb3JGb250LmVhPXR5cGVmYWNlXHJcblxyXG5cdFx0bGV0IGJpZGk9eExhbmdbJ2JpZGknXVxyXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmNzLiQudHlwZWZhY2UnKSlcclxuXHRcdFx0dGhpcy5taW5vckZvbnQuYmlkaT10eXBlZmFjZVxyXG5cdFx0ZWxzZSBpZihiaWRpICYmICh0eXBlZmFjZT10aGlzLm1pbm9yRm9udFtiaWRpXSkpXHJcblx0XHRcdHRoaXMubWlub3JGb250LmJpZGk9dHlwZWZhY2VcclxuXHJcblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtYWpvckZvbnQuY3MuJC50eXBlZmFjZScpKVxyXG5cdFx0XHR0aGlzLm1ham9yRm9udC5iaWRpPXR5cGVmYWNlXHJcblx0XHRlbHNlIGlmKGJpZGkgJiYgKHR5cGVmYWNlPXRoaXMubWFqb3JGb250W2JpZGldKSlcclxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYmlkaT10eXBlZmFjZVxyXG5cdH1cclxuXHRnZXQobmFtZSl7XHJcblx0XHRzd2l0Y2gobmFtZSl7XHJcblx0XHRjYXNlICdtaW5vckhBbnNpJzpcclxuXHRcdGNhc2UgJ21pbm9yQXNjaWknOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuYXNjaWlcclxuXHRcdGNhc2UgJ21pbm9yRWFzdEFzaWEnOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuZWFcclxuXHRcdGNhc2UgJ21pbm9yQmlkaSc6XHJcblx0XHRcdHJldHVybiB0aGlzLm1pbm9yRm9udC5iaWRpXHJcblxyXG5cdFx0Y2FzZSAnbWFqb3JIQW5zaSc6XHJcblx0XHRjYXNlICdtYWpvckFzY2lpJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmFzY2lpXHJcblx0XHRjYXNlICdtYWpvckVhc3RBc2lhJzpcclxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmVhXHJcblx0XHRjYXNlICdtYWpvckJpZGknOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckZvbnQuYmlkaVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=