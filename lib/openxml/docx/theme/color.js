'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RGB = /([a-fA-F0-9]{2}?){3}?/;

var color = function () {
	function color(wXml, xMapping) {
		_classCallCheck(this, color);

		this.wXml = wXml;
		this.map = {};
		for (var i = 0, map = xMapping.attributes, len = map.length, attr; i < len; i++) {
			this.map[(attr = xMapping.attributes[i]).localName] = attr.value;
		}
	}

	_createClass(color, [{
		key: 'get',
		value: function get(name, t) {
			if (name == 'phClr') //placeholder color, witch will be replaced with direct style
				return name;
			name = this.map[name] || name;
			if (t = this.wXml.$1(name)) {
				switch (t.firstChild.localName) {
					case 'sysClr':
						return '#' + t.firstChild.attr('lastClr');
					default:
						return '#' + t.firstChild.attr('val');
				}
			} else return 'black';
		}
	}]);

	return color;
}();

exports.default = color;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOlsiUkdCIiwiY29sb3IiLCJ3WG1sIiwieE1hcHBpbmciLCJtYXAiLCJpIiwiYXR0cmlidXRlcyIsImxlbiIsImxlbmd0aCIsImF0dHIiLCJsb2NhbE5hbWUiLCJ2YWx1ZSIsIm5hbWUiLCJ0IiwiJDEiLCJmaXJzdENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBSSx1QkFBUjs7SUFDcUJDLEs7QUFDcEIsZ0JBQVlDLElBQVosRUFBa0JDLFFBQWxCLEVBQTJCO0FBQUE7O0FBQzFCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtFLEdBQUwsR0FBUyxFQUFUO0FBQ0EsT0FBSSxJQUFJQyxJQUFFLENBQU4sRUFBUUQsTUFBSUQsU0FBU0csVUFBckIsRUFBZ0NDLE1BQUlILElBQUlJLE1BQXhDLEVBQWdEQyxJQUFwRCxFQUF5REosSUFBRUUsR0FBM0QsRUFBK0RGLEdBQS9EO0FBQ0MsUUFBS0QsR0FBTCxDQUFTLENBQUNLLE9BQUtOLFNBQVNHLFVBQVQsQ0FBb0JELENBQXBCLENBQU4sRUFBOEJLLFNBQXZDLElBQWtERCxLQUFLRSxLQUF2RDtBQUREO0FBRUE7Ozs7c0JBQ0dDLEksRUFBTUMsQyxFQUFFO0FBQ1gsT0FBR0QsUUFBTSxPQUFULEVBQWlCO0FBQ2hCLFdBQU9BLElBQVA7QUFDREEsVUFBSyxLQUFLUixHQUFMLENBQVNRLElBQVQsS0FBZ0JBLElBQXJCO0FBQ0EsT0FBR0MsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYUYsSUFBYixDQUFMLEVBQXdCO0FBQ3ZCLFlBQU9DLEVBQUVFLFVBQUYsQ0FBYUwsU0FBcEI7QUFDQSxVQUFLLFFBQUw7QUFDQyxhQUFPLE1BQUlHLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixTQUFsQixDQUFYO0FBQ0Q7QUFDQyxhQUFPLE1BQUlJLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixLQUFsQixDQUFYO0FBSkQ7QUFNQSxJQVBELE1BUUMsT0FBTyxPQUFQO0FBQ0Q7Ozs7OztrQkFwQm1CUixLIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY29sb3Ige1xyXG5cdGNvbnN0cnVjdG9yKHdYbWwsIHhNYXBwaW5nKXtcclxuXHRcdHRoaXMud1htbD13WG1sXHJcblx0XHR0aGlzLm1hcD17fVxyXG5cdFx0Zm9yKHZhciBpPTAsbWFwPXhNYXBwaW5nLmF0dHJpYnV0ZXMsbGVuPW1hcC5sZW5ndGgsIGF0dHI7aTxsZW47aSsrKVxyXG5cdFx0XHR0aGlzLm1hcFsoYXR0cj14TWFwcGluZy5hdHRyaWJ1dGVzW2ldKS5sb2NhbE5hbWVdPWF0dHIudmFsdWVcclxuXHR9XHJcblx0Z2V0KG5hbWUsIHQpe1xyXG5cdFx0aWYobmFtZT09J3BoQ2xyJykvL3BsYWNlaG9sZGVyIGNvbG9yLCB3aXRjaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggZGlyZWN0IHN0eWxlXHJcblx0XHRcdHJldHVybiBuYW1lXHJcblx0XHRuYW1lPXRoaXMubWFwW25hbWVdfHxuYW1lXHJcblx0XHRpZih0PXRoaXMud1htbC4kMShuYW1lKSl7XHJcblx0XHRcdHN3aXRjaCh0LmZpcnN0Q2hpbGQubG9jYWxOYW1lKXtcclxuXHRcdFx0Y2FzZSAnc3lzQ2xyJzpcclxuXHRcdFx0XHRyZXR1cm4gJyMnK3QuZmlyc3RDaGlsZC5hdHRyKCdsYXN0Q2xyJylcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gJyMnK3QuZmlyc3RDaGlsZC5hdHRyKCd2YWwnKVxyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2VcclxuXHRcdFx0cmV0dXJuICdibGFjaydcclxuXHR9XHJcbn1cclxuIl19