'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.push(this);
			_get(Object.getPrototypeOf(table.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.table.pop(this);
		}
	}, {
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

table.Context = function () {
	function _class(doc) {
		_classCallCheck(this, _class);

		this.wDoc = doc;
		this._stack = [];
		this._current = null;
	}

	_createClass(_class, [{
		key: 'push',
		value: function push(table) {
			this._stack.push(this._current = new TableContext(table));
		}
	}, {
		key: 'pushRow',
		value: function pushRow(row) {
			this._current.pushRow(row);
		}
	}, {
		key: 'pushCell',
		value: function pushCell(cell) {
			this._current.pushCell(cell);
		}
	}, {
		key: 'pop',
		value: function pop() {
			this._stack.pop();
		}
	}, {
		key: 'popRow',
		value: function popRow() {
			this._current.popRow();
		}
	}, {
		key: 'popCell',
		value: function popCell() {
			this._current.popCell();
		}
	}, {
		key: 'isFirstRow',
		value: function isFirstRow() {
			return this._current.isFirstRow();
		}
	}, {
		key: 'isLastRow',
		value: function isLastRow() {
			return this._current.isLastRow();
		}
	}, {
		key: 'isFirstCol',
		value: function isFirstCol() {
			return this._current.isFirstCol();
		}
	}, {
		key: 'isLastCol',
		value: function isLastCol() {
			return this._current.isLastCol();
		}
	}]);

	return _class;
}();

exports.default = table;

var TableContext = function () {
	function TableContext(converter) {
		_classCallCheck(this, TableContext);

		this.rows = converter.wXml.$('tr').length; //@todo:nested table not work
		this.cols = converter.wXml.$('>tblGrid>gridCol').length;
		this.currentRow = 0;
		this.currentCell = 0;
	}

	_createClass(TableContext, [{
		key: 'pushRow',
		value: function pushRow(row) {
			this.currentRow++;
		}
	}, {
		key: 'pushCell',
		value: function pushCell(cell) {
			this.currentCell++;
		}
	}, {
		key: 'popRow',
		value: function popRow(row) {
			this.currentCell = 0;
		}
	}, {
		key: 'popCell',
		value: function popCell(cell) {}
	}, {
		key: 'isFirstRow',
		value: function isFirstRow() {
			return this.currentRow == 1;
		}
	}, {
		key: 'isLastRow',
		value: function isLastRow() {
			return this.currentRow == this.rows;
		}
	}, {
		key: 'isFirstCol',
		value: function isFirstCol() {
			return this.currentCell == 1;
		}
	}, {
		key: 'isLastCol',
		value: function isLastCol() {
			return this.currentCell == this.cols;
		}
	}]);

	return TableContext;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzBCQUNiO0FBQ04sUUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQURNO0FBRU4sOEJBSG1CLDZDQUdKLFVBQWYsQ0FGTTtBQUdOLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsS0FBdkIsQ0FBNkIsR0FBN0IsQ0FBaUMsSUFBakMsRUFITTs7Ozs2QkFNSSxHQUFFO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxpQkFBVixLQUFpQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixVQUFoQixDQUEyQixnQkFBVyxJQUFYLENBQTdCLENBQUQsSUFBbUQsRUFBRSxFQUFGLENBRC9FOzs7O2tDQUdFO0FBQ2QsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLEtBQUssVUFBTCxFQUFwQixDQUFQLENBRGM7Ozs7aUNBR0EsSUFBRztBQUNqQixVQUFPLENBQUMsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsUUFBYixDQUFILENBQUQsSUFBK0IsSUFBSSxnQkFBVyxVQUFYLENBQXNCLEVBQTFCLEVBQTZCLEtBQUssSUFBTCxFQUFVLElBQXZDLENBQS9CLENBRFU7Ozs7Z0NBR0w7QUFDWixPQUFJLFNBQU8sRUFBUDtPQUFXLE1BQUksQ0FBSixDQURIO0FBRVosUUFBSSxJQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLGtCQUFaLENBQUwsRUFBcUMsTUFBSSxLQUFLLE1BQUwsRUFBWSxJQUFFLENBQUYsRUFBSSxDQUE3RCxFQUErRCxJQUFFLEdBQUYsRUFBTSxHQUF6RSxFQUE2RTtBQUM1RSxXQUFPLElBQVAsQ0FBWSxJQUFFLFNBQVMsS0FBSyxDQUFMLEVBQVEsSUFBUixDQUFhLEtBQWIsQ0FBVCxDQUFGLENBQVosQ0FENEU7QUFFNUUsV0FBSyxDQUFMLENBRjRFO0lBQTdFO0FBSUEsVUFBTyxFQUFDLEtBQUksR0FBSixFQUFTLE1BQUssTUFBTCxFQUFqQixDQU5ZOzs7O2dDQVFDLE1BQUs7QUFDbEIsVUFBTyxLQUFLLFNBQUwsSUFBZ0IsT0FBaEIsSUFBeUIsS0FBSyxTQUFMLElBQWdCLFNBQWhCLENBRGQ7Ozs7c0JBR0Y7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQTNCRztFQUFjLFFBQVEsVUFBUjs7QUFBZCxNQTZCYjtBQUNOLGlCQUFZLEdBQVosRUFBZ0I7OztBQUNmLE9BQUssSUFBTCxHQUFVLEdBQVYsQ0FEZTtBQUVmLE9BQUssTUFBTCxHQUFZLEVBQVosQ0FGZTtBQUdmLE9BQUssUUFBTCxHQUFjLElBQWQsQ0FIZTtFQUFoQjs7Ozt1QkFNSyxPQUFNO0FBQ1YsUUFBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFLLFFBQUwsR0FBYyxJQUFJLFlBQUosQ0FBaUIsS0FBakIsQ0FBZCxDQUFqQixDQURVOzs7OzBCQUlILEtBQUk7QUFDWCxRQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEdBQXRCLEVBRFc7Ozs7MkJBSUgsTUFBSztBQUNiLFFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsRUFEYTs7Ozt3QkFJVDtBQUNKLFFBQUssTUFBTCxDQUFZLEdBQVosR0FESTs7OzsyQkFJRztBQUNQLFFBQUssUUFBTCxDQUFjLE1BQWQsR0FETzs7Ozs0QkFJQztBQUNSLFFBQUssUUFBTCxDQUFjLE9BQWQsR0FEUTs7OzsrQkFJRztBQUNYLFVBQU8sS0FBSyxRQUFMLENBQWMsVUFBZCxFQUFQLENBRFc7Ozs7OEJBSUQ7QUFDVixVQUFPLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBUCxDQURVOzs7OytCQUlDO0FBQ1gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBQVAsQ0FEVzs7Ozs4QkFJRDtBQUNWLFVBQU8sS0FBSyxRQUFMLENBQWMsU0FBZCxFQUFQLENBRFU7Ozs7Ozs7a0JBeEVROztJQThFZjtBQUNMLFVBREssWUFDTCxDQUFZLFNBQVosRUFBc0I7d0JBRGpCLGNBQ2lCOztBQUNyQixPQUFLLElBQUwsR0FBVSxVQUFVLElBQVYsQ0FBZSxDQUFmLENBQWlCLElBQWpCLEVBQXVCLE1BQXZCO0FBRFcsTUFFckIsQ0FBSyxJQUFMLEdBQVUsVUFBVSxJQUFWLENBQWUsQ0FBZixDQUFpQixrQkFBakIsRUFBcUMsTUFBckMsQ0FGVztBQUdyQixPQUFLLFVBQUwsR0FBZ0IsQ0FBaEIsQ0FIcUI7QUFJckIsT0FBSyxXQUFMLEdBQWlCLENBQWpCLENBSnFCO0VBQXRCOztjQURLOzswQkFPRyxLQUFJO0FBQ1gsUUFBSyxVQUFMLEdBRFc7Ozs7MkJBSUgsTUFBSztBQUNiLFFBQUssV0FBTCxHQURhOzs7O3lCQUlQLEtBQUk7QUFDVixRQUFLLFdBQUwsR0FBaUIsQ0FBakIsQ0FEVTs7OzswQkFJSCxNQUFLOzs7K0JBSUQ7QUFDWCxVQUFPLEtBQUssVUFBTCxJQUFpQixDQUFqQixDQURJOzs7OzhCQUlEO0FBQ1YsVUFBTyxLQUFLLFVBQUwsSUFBaUIsS0FBSyxJQUFMLENBRGQ7Ozs7K0JBSUM7QUFDWCxVQUFPLEtBQUssV0FBTCxJQUFrQixDQUFsQixDQURJOzs7OzhCQUlEO0FBQ1YsVUFBTyxLQUFLLFdBQUwsSUFBa0IsS0FBSyxJQUFMLENBRGY7Ozs7UUFuQ04iLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYmxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0cGFyc2UoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnB1c2godGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wb3AodGhpcylcblx0fVxuXHRcblx0Z2V0U3R5bGVJZChhKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+dGJsUHI+dGJsU3R5bGUnKSB8fCAoKGE9dGhpcy53RG9jLnN0eWxlLmdldERlZmF1bHQoVGFibGVTdHlsZS50eXBlKSkgJiYgYS5pZClcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGJsUHInKSkgJiYgbmV3IFRhYmxlU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRnZXRDb2xXaWR0aCgpe1xuXHRcdHZhciB3aWR0aHM9W10sIHN1bT0wXG5cdFx0Zm9yKHZhciBjb2xzPXRoaXMud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJyksbGVuPWNvbHMubGVuZ3RoLGk9MCxhO2k8bGVuO2krKyl7XG5cdFx0XHR3aWR0aHMucHVzaChhPXBhcnNlSW50KGNvbHNbaV0uYXR0cigndzp3JykpKVxuXHRcdFx0c3VtKz1hXG5cdFx0fVxuXHRcdHJldHVybiB7c3VtOnN1bSwgY29sczp3aWR0aHN9O1xuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwubG9jYWxOYW1lPT0ndGJsUHInfHx3WG1sLmxvY2FsTmFtZT09J3RibEdyaWQnXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0YWJsZSd9XG5cdFxuXHRzdGF0aWMgQ29udGV4dD1jbGFzc3tcblx0XHRjb25zdHJ1Y3Rvcihkb2Mpe1xuXHRcdFx0dGhpcy53RG9jPWRvY1xuXHRcdFx0dGhpcy5fc3RhY2s9W11cblx0XHRcdHRoaXMuX2N1cnJlbnQ9bnVsbFxuXHRcdH1cblx0XHRcblx0XHRwdXNoKHRhYmxlKXtcblx0XHRcdHRoaXMuX3N0YWNrLnB1c2godGhpcy5fY3VycmVudD1uZXcgVGFibGVDb250ZXh0KHRhYmxlKSlcblx0XHR9XG5cdFx0XG5cdFx0cHVzaFJvdyhyb3cpe1xuXHRcdFx0dGhpcy5fY3VycmVudC5wdXNoUm93KHJvdylcblx0XHR9XG5cdFx0XG5cdFx0cHVzaENlbGwoY2VsbCl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnB1c2hDZWxsKGNlbGwpXG5cdFx0fVxuXHRcdFxuXHRcdHBvcCgpe1xuXHRcdFx0dGhpcy5fc3RhY2sucG9wKClcblx0XHR9XG5cdFx0XG5cdFx0cG9wUm93KCl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnBvcFJvdygpXG5cdFx0fVxuXHRcdFxuXHRcdHBvcENlbGwoKXtcblx0XHRcdHRoaXMuX2N1cnJlbnQucG9wQ2VsbCgpXG5cdFx0fVxuXHRcdFxuXHRcdGlzRmlyc3RSb3coKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzRmlyc3RSb3coKVxuXHRcdH1cblx0XHRcblx0XHRpc0xhc3RSb3coKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzTGFzdFJvdygpXG5cdFx0fVxuXHRcdFxuXHRcdGlzRmlyc3RDb2woKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzRmlyc3RDb2woKVxuXHRcdH1cblx0XHRcblx0XHRpc0xhc3RDb2woKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzTGFzdENvbCgpXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFRhYmxlQ29udGV4dHtcblx0Y29uc3RydWN0b3IoY29udmVydGVyKXtcblx0XHR0aGlzLnJvd3M9Y29udmVydGVyLndYbWwuJCgndHInKS5sZW5ndGgvL0B0b2RvOm5lc3RlZCB0YWJsZSBub3Qgd29ya1xuXHRcdHRoaXMuY29scz1jb252ZXJ0ZXIud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJykubGVuZ3RoXG5cdFx0dGhpcy5jdXJyZW50Um93PTBcblx0XHR0aGlzLmN1cnJlbnRDZWxsPTBcblx0fVxuXHRwdXNoUm93KHJvdyl7XG5cdFx0dGhpcy5jdXJyZW50Um93Kytcblx0fVxuXHRcblx0cHVzaENlbGwoY2VsbCl7XG5cdFx0dGhpcy5jdXJyZW50Q2VsbCsrXG5cdH1cblx0XG5cdHBvcFJvdyhyb3cpe1xuXHRcdHRoaXMuY3VycmVudENlbGw9MFxuXHR9XG5cdFxuXHRwb3BDZWxsKGNlbGwpe1xuXHRcdFxuXHR9XG5cdFxuXHRpc0ZpcnN0Um93KCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFJvdz09MVxuXHR9XG5cdFxuXHRpc0xhc3RSb3coKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Um93PT10aGlzLnJvd3Ncblx0fVxuXHRcblx0aXNGaXJzdENvbCgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT0xXG5cdH1cblx0XG5cdGlzTGFzdENvbCgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT10aGlzLmNvbHNcblx0fVxufVxuIl19