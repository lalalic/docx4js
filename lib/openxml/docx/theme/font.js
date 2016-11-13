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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvZm9udC5qcyJdLCJuYW1lcyI6WyJmb250Iiwic2NoZW1lIiwieExhbmciLCJtYWpvckZvbnQiLCJnZXQiLCJyZWR1Y2UiLCJwIiwiJCIsInNjcmlwdCIsInR5cGVmYWNlIiwibWlub3JGb250IiwiYXNjaWkiLCJlYSIsImJpZGkiLCJuYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxJO0FBQ3BCLGVBQVlDLE1BQVosRUFBbUJDLEtBQW5CLEVBQXlCO0FBQUE7O0FBQ3hCLE9BQUtDLFNBQUwsR0FBZUYsT0FBT0csR0FBUCxDQUFXLGdCQUFYLEVBQ2JDLE1BRGEsQ0FDTixVQUFDQyxDQUFEO0FBQUEscUJBQUlDLENBQUo7QUFBQSxPQUFPQyxNQUFQLFVBQU9BLE1BQVA7QUFBQSxPQUFjQyxRQUFkLFVBQWNBLFFBQWQ7QUFBQSxVQUE0QkgsRUFBRUUsTUFBRixJQUFVQyxRQUFWLEVBQW1CSCxDQUEvQztBQUFBLEdBRE0sRUFDNEMsRUFENUMsQ0FBZjs7QUFHQSxPQUFLSSxTQUFMLEdBQWVULE9BQU9HLEdBQVAsQ0FBVyxnQkFBWCxFQUNiQyxNQURhLENBQ04sVUFBQ0MsQ0FBRDtBQUFBLHVCQUFJQyxDQUFKO0FBQUEsT0FBT0MsTUFBUCxXQUFPQSxNQUFQO0FBQUEsT0FBY0MsUUFBZCxXQUFjQSxRQUFkO0FBQUEsVUFBNEJILEVBQUVFLE1BQUYsSUFBVUMsUUFBVixFQUFtQkgsQ0FBL0M7QUFBQSxHQURNLEVBQzRDLEVBRDVDLENBQWY7O0FBR0EsTUFBSUcsaUJBQUo7QUFDQSxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcsNEJBQVgsQ0FBWixFQUNDLEtBQUtNLFNBQUwsQ0FBZUMsS0FBZixHQUFxQkYsUUFBckI7O0FBRUQsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLDRCQUFYLENBQVosRUFDQyxLQUFLRCxTQUFMLENBQWVRLEtBQWYsR0FBcUJGLFFBQXJCOztBQUVELE1BQUlHLEtBQUdWLE1BQU0sVUFBTixDQUFQO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVFLEVBQWYsR0FBa0JILFFBQWxCLENBREQsS0FFSyxJQUFHRyxPQUFPSCxXQUFTLEtBQUtDLFNBQUwsQ0FBZUUsRUFBZixDQUFoQixDQUFILEVBQ0osS0FBS0YsU0FBTCxDQUFlRSxFQUFmLEdBQWtCSCxRQUFsQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVMsRUFBZixHQUFrQkgsUUFBbEIsQ0FERCxLQUVLLElBQUdHLE9BQU9ILFdBQVMsS0FBS04sU0FBTCxDQUFlUyxFQUFmLENBQWhCLENBQUgsRUFDSixLQUFLVCxTQUFMLENBQWVTLEVBQWYsR0FBa0JILFFBQWxCOztBQUVELE1BQUlJLE9BQUtYLE1BQU0sTUFBTixDQUFUO0FBQ0EsTUFBR08sV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVHLElBQWYsR0FBb0JKLFFBQXBCLENBREQsS0FFSyxJQUFHSSxTQUFTSixXQUFTLEtBQUtDLFNBQUwsQ0FBZUcsSUFBZixDQUFsQixDQUFILEVBQ0osS0FBS0gsU0FBTCxDQUFlRyxJQUFmLEdBQW9CSixRQUFwQjs7QUFFRCxNQUFHQSxXQUFTUixPQUFPRyxHQUFQLENBQVcseUJBQVgsQ0FBWixFQUNDLEtBQUtELFNBQUwsQ0FBZVUsSUFBZixHQUFvQkosUUFBcEIsQ0FERCxLQUVLLElBQUdJLFNBQVNKLFdBQVMsS0FBS04sU0FBTCxDQUFlVSxJQUFmLENBQWxCLENBQUgsRUFDSixLQUFLVixTQUFMLENBQWVVLElBQWYsR0FBb0JKLFFBQXBCO0FBQ0Q7Ozs7c0JBQ0dLLEksRUFBSztBQUNSLFdBQU9BLElBQVA7QUFDQSxTQUFLLFlBQUw7QUFDQSxTQUFLLFlBQUw7QUFDQyxZQUFPLEtBQUtKLFNBQUwsQ0FBZUMsS0FBdEI7QUFDRCxTQUFLLGVBQUw7QUFDQyxZQUFPLEtBQUtELFNBQUwsQ0FBZUUsRUFBdEI7QUFDRCxTQUFLLFdBQUw7QUFDQyxZQUFPLEtBQUtGLFNBQUwsQ0FBZUcsSUFBdEI7O0FBRUQsU0FBSyxZQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLVixTQUFMLENBQWVRLEtBQXRCO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsWUFBTyxLQUFLUixTQUFMLENBQWVTLEVBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsWUFBTyxLQUFLVCxTQUFMLENBQWVVLElBQXRCO0FBZkQ7QUFpQkE7Ozs7O2tCQXZEbUJiLEkiLCJmaWxlIjoiZm9udC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGZvbnR7XG5cdGNvbnN0cnVjdG9yKHNjaGVtZSx4TGFuZyl7XG5cdFx0dGhpcy5tYWpvckZvbnQ9c2NoZW1lLmdldCgnbWFqb3JGb250LmZvbnQnKVxuXHRcdFx0LnJlZHVjZSgocCx7JDp7c2NyaXB0LHR5cGVmYWNlfX0pPT4ocFtzY3JpcHRdPXR5cGVmYWNlLHApLHt9KVxuXG5cdFx0dGhpcy5taW5vckZvbnQ9c2NoZW1lLmdldCgnbWlub3JGb250LmZvbnQnKVxuXHRcdFx0LnJlZHVjZSgocCx7JDp7c2NyaXB0LHR5cGVmYWNlfX0pPT4ocFtzY3JpcHRdPXR5cGVmYWNlLHApLHt9KVxuXG5cdFx0bGV0IHR5cGVmYWNlXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmxhdGluLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWlub3JGb250LmFzY2lpPXR5cGVmYWNlXG5cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtYWpvckZvbnQubGF0aW4uJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuYXNjaWk9dHlwZWZhY2VcblxuXHRcdGxldCBlYT14TGFuZ1snZWFzdEFzaWEnXVxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21pbm9yRm9udC5lYS4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5lYT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoZWEgJiYgKHR5cGVmYWNlPXRoaXMubWlub3JGb250W2VhXSkpXG5cdFx0XHR0aGlzLm1pbm9yRm9udC5lYT10eXBlZmFjZVxuXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmVhLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmVhPXR5cGVmYWNlXG5cdFx0ZWxzZSBpZihlYSAmJiAodHlwZWZhY2U9dGhpcy5tYWpvckZvbnRbZWFdKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmVhPXR5cGVmYWNlXG5cblx0XHRsZXQgYmlkaT14TGFuZ1snYmlkaSddXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmNzLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWlub3JGb250LmJpZGk9dHlwZWZhY2Vcblx0XHRlbHNlIGlmKGJpZGkgJiYgKHR5cGVmYWNlPXRoaXMubWlub3JGb250W2JpZGldKSlcblx0XHRcdHRoaXMubWlub3JGb250LmJpZGk9dHlwZWZhY2VcblxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21ham9yRm9udC5jcy4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5iaWRpPXR5cGVmYWNlXG5cdFx0ZWxzZSBpZihiaWRpICYmICh0eXBlZmFjZT10aGlzLm1ham9yRm9udFtiaWRpXSkpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5iaWRpPXR5cGVmYWNlXG5cdH1cblx0Z2V0KG5hbWUpe1xuXHRcdHN3aXRjaChuYW1lKXtcblx0XHRjYXNlICdtaW5vckhBbnNpJzpcblx0XHRjYXNlICdtaW5vckFzY2lpJzpcblx0XHRcdHJldHVybiB0aGlzLm1pbm9yRm9udC5hc2NpaVxuXHRcdGNhc2UgJ21pbm9yRWFzdEFzaWEnOlxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JGb250LmVhXG5cdFx0Y2FzZSAnbWlub3JCaWRpJzpcblx0XHRcdHJldHVybiB0aGlzLm1pbm9yRm9udC5iaWRpXG5cblx0XHRjYXNlICdtYWpvckhBbnNpJzpcblx0XHRjYXNlICdtYWpvckFzY2lpJzpcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRm9udC5hc2NpaVxuXHRcdGNhc2UgJ21ham9yRWFzdEFzaWEnOlxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmVhXG5cdFx0Y2FzZSAnbWFqb3JCaWRpJzpcblx0XHRcdHJldHVybiB0aGlzLm1ham9yRm9udC5iaWRpXG5cdFx0fVxuXHR9XG59XG4iXX0=