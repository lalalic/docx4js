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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQjtBQUNwQixVQURvQixLQUNwQixDQUFZLE1BQVosRUFBb0IsUUFBcEIsRUFBNkI7d0JBRFQsT0FDUzs7QUFDNUIsT0FBSyxHQUFMLEdBQVMsUUFBVCxDQUQ0QjtBQUU1QixPQUFLLE1BQUwsR0FBWSxNQUFaLENBRjRCO0VBQTdCOztjQURvQjs7c0JBS2hCLE1BQUs7QUFDUixPQUFHLFFBQU0sT0FBTjtBQUNGLFdBQU8sSUFBUCxDQUREO0FBRUEsVUFBSyxLQUFLLEdBQUwsQ0FBUyxJQUFULEtBQWdCLElBQWhCLENBSEc7QUFJUixVQUFPLE9BQUssS0FBSyxNQUFMLENBQVksR0FBWixDQUFtQixpQkFBbkIsS0FBb0MsS0FBSyxNQUFMLENBQVksR0FBWixDQUFtQiwwQkFBbkIsQ0FBcEMsSUFBaUYsUUFBakYsQ0FBTCxDQUpDOzs7O1FBTFciLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBjb2xvciB7XG5cdGNvbnN0cnVjdG9yKHNjaGVtZSwgeE1hcHBpbmcpe1xuXHRcdHRoaXMubWFwPXhNYXBwaW5nXG5cdFx0dGhpcy5zY2hlbWU9c2NoZW1lXG5cdH1cblx0Z2V0KG5hbWUpe1xuXHRcdGlmKG5hbWU9PSdwaENscicpLy9wbGFjZWhvbGRlciBjb2xvciwgd2l0Y2ggd2lsbCBiZSByZXBsYWNlZCB3aXRoIGRpcmVjdCBzdHlsZVxuXHRcdFx0cmV0dXJuIG5hbWVcblx0XHRuYW1lPXRoaXMubWFwW25hbWVdfHxuYW1lXG5cdFx0cmV0dXJuICcjJysodGhpcy5zY2hlbWUuZ2V0KGAke25hbWV9LnNyZ2JDbHJgKXx8dGhpcy5zY2hlbWUuZ2V0KGAke25hbWV9LnN5c0Nsci4kLmxhc3RDbHJgKXx8JzAwMDAwMCcpXG5cdH1cbn1cbiJdfQ==