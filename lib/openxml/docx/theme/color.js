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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOlsiUkdCIiwiY29sb3IiLCJ3WG1sIiwieE1hcHBpbmciLCJtYXAiLCJpIiwiYXR0cmlidXRlcyIsImxlbiIsImxlbmd0aCIsImF0dHIiLCJsb2NhbE5hbWUiLCJ2YWx1ZSIsIm5hbWUiLCJ0IiwiJDEiLCJmaXJzdENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsSUFBSUEsTUFBSSx1QkFBUjs7SUFDcUJDLEs7QUFDcEIsZ0JBQVlDLElBQVosRUFBa0JDLFFBQWxCLEVBQTJCO0FBQUE7O0FBQzFCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtFLEdBQUwsR0FBUyxFQUFUO0FBQ0EsT0FBSSxJQUFJQyxJQUFFLENBQU4sRUFBUUQsTUFBSUQsU0FBU0csVUFBckIsRUFBZ0NDLE1BQUlILElBQUlJLE1BQXhDLEVBQWdEQyxJQUFwRCxFQUF5REosSUFBRUUsR0FBM0QsRUFBK0RGLEdBQS9EO0FBQ0MsUUFBS0QsR0FBTCxDQUFTLENBQUNLLE9BQUtOLFNBQVNHLFVBQVQsQ0FBb0JELENBQXBCLENBQU4sRUFBOEJLLFNBQXZDLElBQWtERCxLQUFLRSxLQUF2RDtBQUREO0FBRUE7Ozs7c0JBQ0dDLEksRUFBTUMsQyxFQUFFO0FBQ1gsT0FBR0QsUUFBTSxPQUFULEVBQWlCO0FBQ2hCLFdBQU9BLElBQVA7QUFDREEsVUFBSyxLQUFLUixHQUFMLENBQVNRLElBQVQsS0FBZ0JBLElBQXJCO0FBQ0EsT0FBR0MsSUFBRSxLQUFLWCxJQUFMLENBQVVZLEVBQVYsQ0FBYUYsSUFBYixDQUFMLEVBQXdCO0FBQ3ZCLFlBQU9DLEVBQUVFLFVBQUYsQ0FBYUwsU0FBcEI7QUFDQSxVQUFLLFFBQUw7QUFDQyxhQUFPLE1BQUlHLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixTQUFsQixDQUFYO0FBQ0Q7QUFDQyxhQUFPLE1BQUlJLEVBQUVFLFVBQUYsQ0FBYU4sSUFBYixDQUFrQixLQUFsQixDQUFYO0FBSkQ7QUFNQSxJQVBELE1BUUMsT0FBTyxPQUFQO0FBQ0Q7Ozs7OztrQkFwQm1CUixLIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbG9yIHtcblx0Y29uc3RydWN0b3Iod1htbCwgeE1hcHBpbmcpe1xuXHRcdHRoaXMud1htbD13WG1sXG5cdFx0dGhpcy5tYXA9e31cblx0XHRmb3IodmFyIGk9MCxtYXA9eE1hcHBpbmcuYXR0cmlidXRlcyxsZW49bWFwLmxlbmd0aCwgYXR0cjtpPGxlbjtpKyspXG5cdFx0XHR0aGlzLm1hcFsoYXR0cj14TWFwcGluZy5hdHRyaWJ1dGVzW2ldKS5sb2NhbE5hbWVdPWF0dHIudmFsdWVcblx0fVxuXHRnZXQobmFtZSwgdCl7XG5cdFx0aWYobmFtZT09J3BoQ2xyJykvL3BsYWNlaG9sZGVyIGNvbG9yLCB3aXRjaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggZGlyZWN0IHN0eWxlXG5cdFx0XHRyZXR1cm4gbmFtZVxuXHRcdG5hbWU9dGhpcy5tYXBbbmFtZV18fG5hbWVcblx0XHRpZih0PXRoaXMud1htbC4kMShuYW1lKSl7XG5cdFx0XHRzd2l0Y2godC5maXJzdENoaWxkLmxvY2FsTmFtZSl7XG5cdFx0XHRjYXNlICdzeXNDbHInOlxuXHRcdFx0XHRyZXR1cm4gJyMnK3QuZmlyc3RDaGlsZC5hdHRyKCdsYXN0Q2xyJylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnIycrdC5maXJzdENoaWxkLmF0dHIoJ3ZhbCcpXG5cdFx0XHR9XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gJ2JsYWNrJ1xuXHR9XG59XG4iXX0=