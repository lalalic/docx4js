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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvdGhlbWUvY29sb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLElBQUksTUFBSSx1QkFBSjs7SUFDaUI7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxJQUFaLEVBQWtCLFFBQWxCLEVBQTJCO3dCQURQLE9BQ087O0FBQzFCLE9BQUssSUFBTCxHQUFVLElBQVYsQ0FEMEI7QUFFMUIsT0FBSyxHQUFMLEdBQVMsRUFBVCxDQUYwQjtBQUcxQixPQUFJLElBQUksSUFBRSxDQUFGLEVBQUksTUFBSSxTQUFTLFVBQVQsRUFBb0IsTUFBSSxJQUFJLE1BQUosRUFBWSxJQUFoRCxFQUFxRCxJQUFFLEdBQUYsRUFBTSxHQUEvRDtBQUNDLFFBQUssR0FBTCxDQUFTLENBQUMsT0FBSyxTQUFTLFVBQVQsQ0FBb0IsQ0FBcEIsQ0FBTCxDQUFELENBQThCLFNBQTlCLENBQVQsR0FBa0QsS0FBSyxLQUFMO0dBRG5EO0VBSEQ7O2NBRG9COztzQkFPaEIsTUFBTSxHQUFFO0FBQ1gsT0FBRyxRQUFNLE9BQU47QUFDRixXQUFPLElBQVAsQ0FERDtBQUVBLFVBQUssS0FBSyxHQUFMLENBQVMsSUFBVCxLQUFnQixJQUFoQixDQUhNO0FBSVgsT0FBRyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxJQUFiLENBQUYsRUFBcUI7QUFDdkIsWUFBTyxFQUFFLFVBQUYsQ0FBYSxTQUFiO0FBQ1AsVUFBSyxRQUFMO0FBQ0MsYUFBTyxNQUFJLEVBQUUsVUFBRixDQUFhLElBQWIsQ0FBa0IsU0FBbEIsQ0FBSixDQURSO0FBREE7QUFJQyxhQUFPLE1BQUksRUFBRSxVQUFGLENBQWEsSUFBYixDQUFrQixLQUFsQixDQUFKLENBRFI7QUFIQSxLQUR1QjtJQUF4QixNQVFDLE9BQU8sT0FBUCxDQVJEOzs7O1FBWG1CIiwiZmlsZSI6ImNvbG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNvbG9yIHtcblx0Y29uc3RydWN0b3Iod1htbCwgeE1hcHBpbmcpe1xuXHRcdHRoaXMud1htbD13WG1sXG5cdFx0dGhpcy5tYXA9e31cblx0XHRmb3IodmFyIGk9MCxtYXA9eE1hcHBpbmcuYXR0cmlidXRlcyxsZW49bWFwLmxlbmd0aCwgYXR0cjtpPGxlbjtpKyspXG5cdFx0XHR0aGlzLm1hcFsoYXR0cj14TWFwcGluZy5hdHRyaWJ1dGVzW2ldKS5sb2NhbE5hbWVdPWF0dHIudmFsdWVcblx0fVxuXHRnZXQobmFtZSwgdCl7XG5cdFx0aWYobmFtZT09J3BoQ2xyJykvL3BsYWNlaG9sZGVyIGNvbG9yLCB3aXRjaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggZGlyZWN0IHN0eWxlXG5cdFx0XHRyZXR1cm4gbmFtZVxuXHRcdG5hbWU9dGhpcy5tYXBbbmFtZV18fG5hbWVcblx0XHRpZih0PXRoaXMud1htbC4kMShuYW1lKSl7XG5cdFx0XHRzd2l0Y2godC5maXJzdENoaWxkLmxvY2FsTmFtZSl7XG5cdFx0XHRjYXNlICdzeXNDbHInOlxuXHRcdFx0XHRyZXR1cm4gJyMnK3QuZmlyc3RDaGlsZC5hdHRyKCdsYXN0Q2xyJylcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiAnIycrdC5maXJzdENoaWxkLmF0dHIoJ3ZhbCcpXG5cdFx0XHR9XG5cdFx0fSBlbHNlXG5cdFx0XHRyZXR1cm4gJ2JsYWNrJ1xuXHR9XG59XG4iXX0=