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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOlsiY29sb3IiLCJzY2hlbWUiLCJ4TWFwcGluZyIsIm1hcCIsIm5hbWUiLCJnZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLEs7QUFDcEIsZ0JBQVlDLE1BQVosRUFBb0JDLFFBQXBCLEVBQTZCO0FBQUE7O0FBQzVCLE9BQUtDLEdBQUwsR0FBU0QsUUFBVDtBQUNBLE9BQUtELE1BQUwsR0FBWUEsTUFBWjtBQUNBOzs7O3NCQUNHRyxJLEVBQUs7QUFDUixPQUFHQSxRQUFNLE9BQVQsRUFBaUI7QUFDaEIsV0FBT0EsSUFBUDtBQUNEQSxVQUFLLEtBQUtELEdBQUwsQ0FBU0MsSUFBVCxLQUFnQkEsSUFBckI7QUFDQSxVQUFPLE9BQUssS0FBS0gsTUFBTCxDQUFZSSxHQUFaLENBQW1CRCxJQUFuQixrQkFBb0MsS0FBS0gsTUFBTCxDQUFZSSxHQUFaLENBQW1CRCxJQUFuQix1QkFBcEMsSUFBaUYsUUFBdEYsQ0FBUDtBQUNBOzs7Ozs7a0JBVm1CSixLIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgY29sb3Ige1xuXHRjb25zdHJ1Y3RvcihzY2hlbWUsIHhNYXBwaW5nKXtcblx0XHR0aGlzLm1hcD14TWFwcGluZ1xuXHRcdHRoaXMuc2NoZW1lPXNjaGVtZVxuXHR9XG5cdGdldChuYW1lKXtcblx0XHRpZihuYW1lPT0ncGhDbHInKS8vcGxhY2Vob2xkZXIgY29sb3IsIHdpdGNoIHdpbGwgYmUgcmVwbGFjZWQgd2l0aCBkaXJlY3Qgc3R5bGVcblx0XHRcdHJldHVybiBuYW1lXG5cdFx0bmFtZT10aGlzLm1hcFtuYW1lXXx8bmFtZVxuXHRcdHJldHVybiAnIycrKHRoaXMuc2NoZW1lLmdldChgJHtuYW1lfS5zcmdiQ2xyYCl8fHRoaXMuc2NoZW1lLmdldChgJHtuYW1lfS5zeXNDbHIuJC5sYXN0Q2xyYCl8fCcwMDAwMDAnKVxuXHR9XG59XG4iXX0=