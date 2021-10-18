'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var color = function () {
	function color(scheme, xMapping) {
		_classCallCheck(this, color);

		this.map = xMapping;
		this.scheme = scheme;
	}

	_createClass(color, [{
		key: 'get',
		value: function get(name) {
			if (name == 'phClr') //placeholder color, witch will be replaced with direct style
				return name;
			name = this.map[name] || name;
			return '#' + (this.scheme.get(name + '.srgbClr') || this.scheme.get(name + '.sysClr.$.lastClr') || '000000');
		}
	}]);

	return color;
}();

exports.default = color;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3RoZW1lL2NvbG9yLmpzIl0sIm5hbWVzIjpbImNvbG9yIiwic2NoZW1lIiwieE1hcHBpbmciLCJtYXAiLCJuYW1lIiwiZ2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0lBQXFCQSxLO0FBQ3BCLGdCQUFZQyxNQUFaLEVBQW9CQyxRQUFwQixFQUE2QjtBQUFBOztBQUM1QixPQUFLQyxHQUFMLEdBQVNELFFBQVQ7QUFDQSxPQUFLRCxNQUFMLEdBQVlBLE1BQVo7QUFDQTs7OztzQkFDR0csSSxFQUFLO0FBQ1IsT0FBR0EsUUFBTSxPQUFULEVBQWlCO0FBQ2hCLFdBQU9BLElBQVA7QUFDREEsVUFBSyxLQUFLRCxHQUFMLENBQVNDLElBQVQsS0FBZ0JBLElBQXJCO0FBQ0EsVUFBTyxPQUFLLEtBQUtILE1BQUwsQ0FBWUksR0FBWixDQUFtQkQsSUFBbkIsa0JBQW9DLEtBQUtILE1BQUwsQ0FBWUksR0FBWixDQUFtQkQsSUFBbkIsdUJBQXBDLElBQWlGLFFBQXRGLENBQVA7QUFDQTs7Ozs7O2tCQVZtQkosSyIsImZpbGUiOiJjb2xvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbG9yIHtcblx0Y29uc3RydWN0b3Ioc2NoZW1lLCB4TWFwcGluZyl7XG5cdFx0dGhpcy5tYXA9eE1hcHBpbmdcblx0XHR0aGlzLnNjaGVtZT1zY2hlbWVcblx0fVxuXHRnZXQobmFtZSl7XG5cdFx0aWYobmFtZT09J3BoQ2xyJykvL3BsYWNlaG9sZGVyIGNvbG9yLCB3aXRjaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggZGlyZWN0IHN0eWxlXG5cdFx0XHRyZXR1cm4gbmFtZVxuXHRcdG5hbWU9dGhpcy5tYXBbbmFtZV18fG5hbWVcblx0XHRyZXR1cm4gJyMnKyh0aGlzLnNjaGVtZS5nZXQoYCR7bmFtZX0uc3JnYkNscmApfHx0aGlzLnNjaGVtZS5nZXQoYCR7bmFtZX0uc3lzQ2xyLiQubGFzdENscmApfHwnMDAwMDAwJylcblx0fVxufVxuIl19