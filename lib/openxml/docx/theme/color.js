'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var color = function () {
	function color(scheme, xMapping) {
		(0, _classCallCheck3.default)(this, color);

		this.map = xMapping;
		this.scheme = scheme;
	}

	(0, _createClass3.default)(color, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOlsiY29sb3IiLCJzY2hlbWUiLCJ4TWFwcGluZyIsIm1hcCIsIm5hbWUiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBcUJBLEs7QUFDcEIsZ0JBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQTZCO0FBQUE7O0FBQzVCLE9BQUtDLEdBQUwsR0FBU0QsUUFBVDtBQUNBLE9BQUtELE1BQUwsR0FBWUEsTUFBWjtBQUNBOzs7O3NCQUNHRyxJLEVBQUs7QUFDUixPQUFHQSxRQUFNLE9BQVQsRUFBaUI7QUFDaEIsV0FBT0EsSUFBUDtBQUNEQSxVQUFLLEtBQUtELEdBQUwsQ0FBU0MsSUFBVCxLQUFnQkEsSUFBckI7QUFDQSxVQUFPLE9BQUssS0FBS0gsTUFBTCxDQUFZSSxHQUFaLENBQW1CRCxJQUFuQixrQkFBb0MsS0FBS0gsTUFBTCxDQUFZSSxHQUFaLENBQW1CRCxJQUFuQix1QkFBcEMsSUFBaUYsUUFBdEYsQ0FBUDtBQUNBOzs7OztrQkFWbUJKLEsiLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBjb2xvciB7XG5cdGNvbnN0cnVjdG9yKHNjaGVtZSwgeE1hcHBpbmcpe1xuXHRcdHRoaXMubWFwPXhNYXBwaW5nXG5cdFx0dGhpcy5zY2hlbWU9c2NoZW1lXG5cdH1cblx0Z2V0KG5hbWUpe1xuXHRcdGlmKG5hbWU9PSdwaENscicpLy9wbGFjZWhvbGRlciBjb2xvciwgd2l0Y2ggd2lsbCBiZSByZXBsYWNlZCB3aXRoIGRpcmVjdCBzdHlsZVxuXHRcdFx0cmV0dXJuIG5hbWVcblx0XHRuYW1lPXRoaXMubWFwW25hbWVdfHxuYW1lXG5cdFx0cmV0dXJuICcjJysodGhpcy5zY2hlbWUuZ2V0KGAke25hbWV9LnNyZ2JDbHJgKXx8dGhpcy5zY2hlbWUuZ2V0KGAke25hbWV9LnN5c0Nsci4kLmxhc3RDbHJgKXx8JzAwMDAwMCcpXG5cdH1cbn1cbiJdfQ==