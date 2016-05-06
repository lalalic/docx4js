'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var table = function (_require) {
	_inherits(table, _require);

	function table() {
		_classCallCheck(this, table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(table).apply(this, arguments));
	}

	_createClass(table, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>tblPr>tblStyle') || (a = this.wDoc.style.getDefault(_table2.default.type)) && a.id;
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId());
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>tblPr')) && new _table2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: 'getColWidth',
		value: function getColWidth() {
			var widths = [],
			    sum = 0;
			for (var cols = this.wXml.$('>tblGrid>gridCol'), len = cols.length, i = 0, a; i < len; i++) {
				widths.push(a = parseInt(cols[i].attr('w:w')));
				sum += a;
			}
			return { sum: sum, cols: widths };
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'tblPr' || wXml.localName == 'tblGrid';
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'table';
		}
	}]);

	return table;
}(require('../model'));

exports.default = table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFDVCxHQUFFO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxpQkFBVixLQUFpQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixVQUFoQixDQUEyQixnQkFBVyxJQUFYLENBQTdCLENBQUQsSUFBbUQsRUFBRSxFQUFGLENBRC9FOzs7O2tDQUdFO0FBQ2QsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLEtBQUssVUFBTCxFQUFwQixDQUFQLENBRGM7Ozs7aUNBR0EsSUFBRztBQUNqQixVQUFPLENBQUMsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsUUFBYixDQUFILENBQUQsSUFBK0IsSUFBSSxnQkFBVyxVQUFYLENBQXNCLEVBQTFCLEVBQTZCLEtBQUssSUFBTCxFQUFVLElBQXZDLENBQS9CLENBRFU7Ozs7Z0NBR0w7QUFDWixPQUFJLFNBQU8sRUFBUDtPQUFXLE1BQUksQ0FBSixDQURIO0FBRVosUUFBSSxJQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLGtCQUFaLENBQUwsRUFBcUMsTUFBSSxLQUFLLE1BQUwsRUFBWSxJQUFFLENBQUYsRUFBSSxDQUE3RCxFQUErRCxJQUFFLEdBQUYsRUFBTSxHQUF6RSxFQUE2RTtBQUM1RSxXQUFPLElBQVAsQ0FBWSxJQUFFLFNBQVMsS0FBSyxDQUFMLEVBQVEsSUFBUixDQUFhLEtBQWIsQ0FBVCxDQUFGLENBQVosQ0FENEU7QUFFNUUsV0FBSyxDQUFMLENBRjRFO0lBQTdFO0FBSUEsVUFBTyxFQUFDLEtBQUksR0FBSixFQUFTLE1BQUssTUFBTCxFQUFqQixDQU5ZOzs7O2dDQVFDLE1BQUs7QUFDbEIsVUFBTyxLQUFLLFNBQUwsSUFBZ0IsT0FBaEIsSUFBeUIsS0FBSyxTQUFMLElBQWdCLFNBQWhCLENBRGQ7Ozs7c0JBR0Y7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQXJCRztFQUFjLFFBQVEsVUFBUjs7a0JBQWQiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYmxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Z2V0U3R5bGVJZChhKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+dGJsUHI+dGJsU3R5bGUnKSB8fCAoKGE9dGhpcy53RG9jLnN0eWxlLmdldERlZmF1bHQoVGFibGVTdHlsZS50eXBlKSkgJiYgYS5pZClcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGJsUHInKSkgJiYgbmV3IFRhYmxlU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRnZXRDb2xXaWR0aCgpe1xuXHRcdHZhciB3aWR0aHM9W10sIHN1bT0wXG5cdFx0Zm9yKHZhciBjb2xzPXRoaXMud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJyksbGVuPWNvbHMubGVuZ3RoLGk9MCxhO2k8bGVuO2krKyl7XG5cdFx0XHR3aWR0aHMucHVzaChhPXBhcnNlSW50KGNvbHNbaV0uYXR0cigndzp3JykpKVxuXHRcdFx0c3VtKz1hXG5cdFx0fVxuXHRcdHJldHVybiB7c3VtOnN1bSwgY29sczp3aWR0aHN9O1xuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwubG9jYWxOYW1lPT0ndGJsUHInfHx3WG1sLmxvY2FsTmFtZT09J3RibEdyaWQnXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0YWJsZSd9XG59XG4iXX0=