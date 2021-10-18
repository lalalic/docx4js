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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3RoZW1lL2ZvbnQuanMiXSwibmFtZXMiOlsiZm9udCIsInNjaGVtZSIsInhMYW5nIiwibWFqb3JGb250IiwiZ2V0IiwicmVkdWNlIiwicCIsIiQiLCJzY3JpcHQiLCJ0eXBlZmFjZSIsIm1pbm9yRm9udCIsImFzY2lpIiwiZWEiLCJiaWRpIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQkEsSTtBQUNwQixlQUFZQyxNQUFaLEVBQW1CQyxLQUFuQixFQUF5QjtBQUFBOztBQUN4QixPQUFLQyxTQUFMLEdBQWVGLE9BQU9HLEdBQVAsQ0FBVyxnQkFBWCxFQUNiQyxNQURhLENBQ04sVUFBQ0MsQ0FBRDtBQUFBLHFCQUFJQyxDQUFKO0FBQUEsT0FBT0MsTUFBUCxVQUFPQSxNQUFQO0FBQUEsT0FBY0MsUUFBZCxVQUFjQSxRQUFkO0FBQUEsVUFBNEJILEVBQUVFLE1BQUYsSUFBVUMsUUFBVixFQUFtQkgsQ0FBL0M7QUFBQSxHQURNLEVBQzRDLEVBRDVDLENBQWY7O0FBR0EsT0FBS0ksU0FBTCxHQUFlVCxPQUFPRyxHQUFQLENBQVcsZ0JBQVgsRUFDYkMsTUFEYSxDQUNOLFVBQUNDLENBQUQ7QUFBQSx1QkFBSUMsQ0FBSjtBQUFBLE9BQU9DLE1BQVAsV0FBT0EsTUFBUDtBQUFBLE9BQWNDLFFBQWQsV0FBY0EsUUFBZDtBQUFBLFVBQTRCSCxFQUFFRSxNQUFGLElBQVVDLFFBQVYsRUFBbUJILENBQS9DO0FBQUEsR0FETSxFQUM0QyxFQUQ1QyxDQUFmOztBQUdBLE1BQUlHLGlCQUFKO0FBQ0EsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLDRCQUFYLENBQVosRUFDQyxLQUFLTSxTQUFMLENBQWVDLEtBQWYsR0FBcUJGLFFBQXJCOztBQUVELE1BQUdBLFdBQVNSLE9BQU9HLEdBQVAsQ0FBVyw0QkFBWCxDQUFaLEVBQ0MsS0FBS0QsU0FBTCxDQUFlUSxLQUFmLEdBQXFCRixRQUFyQjs7QUFFRCxNQUFJRyxLQUFHVixNQUFNLFVBQU4sQ0FBUDtBQUNBLE1BQUdPLFdBQVNSLE9BQU9HLEdBQVAsQ0FBVyx5QkFBWCxDQUFaLEVBQ0MsS0FBS00sU0FBTCxDQUFlRSxFQUFmLEdBQWtCSCxRQUFsQixDQURELEtBRUssSUFBR0csT0FBT0gsV0FBUyxLQUFLQyxTQUFMLENBQWVFLEVBQWYsQ0FBaEIsQ0FBSCxFQUNKLEtBQUtGLFNBQUwsQ0FBZUUsRUFBZixHQUFrQkgsUUFBbEI7O0FBRUQsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLRCxTQUFMLENBQWVTLEVBQWYsR0FBa0JILFFBQWxCLENBREQsS0FFSyxJQUFHRyxPQUFPSCxXQUFTLEtBQUtOLFNBQUwsQ0FBZVMsRUFBZixDQUFoQixDQUFILEVBQ0osS0FBS1QsU0FBTCxDQUFlUyxFQUFmLEdBQWtCSCxRQUFsQjs7QUFFRCxNQUFJSSxPQUFLWCxNQUFNLE1BQU4sQ0FBVDtBQUNBLE1BQUdPLFdBQVNSLE9BQU9HLEdBQVAsQ0FBVyx5QkFBWCxDQUFaLEVBQ0MsS0FBS00sU0FBTCxDQUFlRyxJQUFmLEdBQW9CSixRQUFwQixDQURELEtBRUssSUFBR0ksU0FBU0osV0FBUyxLQUFLQyxTQUFMLENBQWVHLElBQWYsQ0FBbEIsQ0FBSCxFQUNKLEtBQUtILFNBQUwsQ0FBZUcsSUFBZixHQUFvQkosUUFBcEI7O0FBRUQsTUFBR0EsV0FBU1IsT0FBT0csR0FBUCxDQUFXLHlCQUFYLENBQVosRUFDQyxLQUFLRCxTQUFMLENBQWVVLElBQWYsR0FBb0JKLFFBQXBCLENBREQsS0FFSyxJQUFHSSxTQUFTSixXQUFTLEtBQUtOLFNBQUwsQ0FBZVUsSUFBZixDQUFsQixDQUFILEVBQ0osS0FBS1YsU0FBTCxDQUFlVSxJQUFmLEdBQW9CSixRQUFwQjtBQUNEOzs7O3NCQUNHSyxJLEVBQUs7QUFDUixXQUFPQSxJQUFQO0FBQ0EsU0FBSyxZQUFMO0FBQ0EsU0FBSyxZQUFMO0FBQ0MsWUFBTyxLQUFLSixTQUFMLENBQWVDLEtBQXRCO0FBQ0QsU0FBSyxlQUFMO0FBQ0MsWUFBTyxLQUFLRCxTQUFMLENBQWVFLEVBQXRCO0FBQ0QsU0FBSyxXQUFMO0FBQ0MsWUFBTyxLQUFLRixTQUFMLENBQWVHLElBQXRCOztBQUVELFNBQUssWUFBTDtBQUNBLFNBQUssWUFBTDtBQUNDLFlBQU8sS0FBS1YsU0FBTCxDQUFlUSxLQUF0QjtBQUNELFNBQUssZUFBTDtBQUNDLFlBQU8sS0FBS1IsU0FBTCxDQUFlUyxFQUF0QjtBQUNELFNBQUssV0FBTDtBQUNDLFlBQU8sS0FBS1QsU0FBTCxDQUFlVSxJQUF0QjtBQWZEO0FBaUJBOzs7Ozs7a0JBdkRtQmIsSSIsImZpbGUiOiJmb250LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZm9udHtcblx0Y29uc3RydWN0b3Ioc2NoZW1lLHhMYW5nKXtcblx0XHR0aGlzLm1ham9yRm9udD1zY2hlbWUuZ2V0KCdtYWpvckZvbnQuZm9udCcpXG5cdFx0XHQucmVkdWNlKChwLHskOntzY3JpcHQsdHlwZWZhY2V9fSk9PihwW3NjcmlwdF09dHlwZWZhY2UscCkse30pXG5cblx0XHR0aGlzLm1pbm9yRm9udD1zY2hlbWUuZ2V0KCdtaW5vckZvbnQuZm9udCcpXG5cdFx0XHQucmVkdWNlKChwLHskOntzY3JpcHQsdHlwZWZhY2V9fSk9PihwW3NjcmlwdF09dHlwZWZhY2UscCkse30pXG5cblx0XHRsZXQgdHlwZWZhY2Vcblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtaW5vckZvbnQubGF0aW4uJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYXNjaWk9dHlwZWZhY2VcblxuXHRcdGlmKHR5cGVmYWNlPXNjaGVtZS5nZXQoJ21ham9yRm9udC5sYXRpbi4kLnR5cGVmYWNlJykpXG5cdFx0XHR0aGlzLm1ham9yRm9udC5hc2NpaT10eXBlZmFjZVxuXG5cdFx0bGV0IGVhPXhMYW5nWydlYXN0QXNpYSddXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWlub3JGb250LmVhLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXG5cdFx0ZWxzZSBpZihlYSAmJiAodHlwZWZhY2U9dGhpcy5taW5vckZvbnRbZWFdKSlcblx0XHRcdHRoaXMubWlub3JGb250LmVhPXR5cGVmYWNlXG5cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtYWpvckZvbnQuZWEuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuZWE9dHlwZWZhY2Vcblx0XHRlbHNlIGlmKGVhICYmICh0eXBlZmFjZT10aGlzLm1ham9yRm9udFtlYV0pKVxuXHRcdFx0dGhpcy5tYWpvckZvbnQuZWE9dHlwZWZhY2VcblxuXHRcdGxldCBiaWRpPXhMYW5nWydiaWRpJ11cblx0XHRpZih0eXBlZmFjZT1zY2hlbWUuZ2V0KCdtaW5vckZvbnQuY3MuJC50eXBlZmFjZScpKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYmlkaT10eXBlZmFjZVxuXHRcdGVsc2UgaWYoYmlkaSAmJiAodHlwZWZhY2U9dGhpcy5taW5vckZvbnRbYmlkaV0pKVxuXHRcdFx0dGhpcy5taW5vckZvbnQuYmlkaT10eXBlZmFjZVxuXG5cdFx0aWYodHlwZWZhY2U9c2NoZW1lLmdldCgnbWFqb3JGb250LmNzLiQudHlwZWZhY2UnKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmJpZGk9dHlwZWZhY2Vcblx0XHRlbHNlIGlmKGJpZGkgJiYgKHR5cGVmYWNlPXRoaXMubWFqb3JGb250W2JpZGldKSlcblx0XHRcdHRoaXMubWFqb3JGb250LmJpZGk9dHlwZWZhY2Vcblx0fVxuXHRnZXQobmFtZSl7XG5cdFx0c3dpdGNoKG5hbWUpe1xuXHRcdGNhc2UgJ21pbm9ySEFuc2knOlxuXHRcdGNhc2UgJ21pbm9yQXNjaWknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JGb250LmFzY2lpXG5cdFx0Y2FzZSAnbWlub3JFYXN0QXNpYSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5taW5vckZvbnQuZWFcblx0XHRjYXNlICdtaW5vckJpZGknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWlub3JGb250LmJpZGlcblxuXHRcdGNhc2UgJ21ham9ySEFuc2knOlxuXHRcdGNhc2UgJ21ham9yQXNjaWknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmFzY2lpXG5cdFx0Y2FzZSAnbWFqb3JFYXN0QXNpYSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5tYWpvckZvbnQuZWFcblx0XHRjYXNlICdtYWpvckJpZGknOlxuXHRcdFx0cmV0dXJuIHRoaXMubWFqb3JGb250LmJpZGlcblx0XHR9XG5cdH1cbn1cbiJdfQ==