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
			debugger;
			return this.currentCell == this.cols;
		}
	}]);

	return TableContext;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzBCQUNiO0FBQ04sUUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQURNO0FBRU4sOEJBSG1CLDZDQUdKLFVBQWYsQ0FGTTtBQUdOLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsS0FBdkIsQ0FBNkIsR0FBN0IsQ0FBaUMsSUFBakMsRUFITTs7Ozs2QkFNSSxHQUFFO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxpQkFBVixLQUFpQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixVQUFoQixDQUEyQixnQkFBVyxJQUFYLENBQTdCLENBQUQsSUFBbUQsRUFBRSxFQUFGLENBRC9FOzs7O2tDQUdFO0FBQ2QsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLEtBQUssVUFBTCxFQUFwQixDQUFQLENBRGM7Ozs7aUNBR0EsSUFBRztBQUNqQixVQUFPLENBQUMsS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsUUFBYixDQUFILENBQUQsSUFBK0IsSUFBSSxnQkFBVyxVQUFYLENBQXNCLEVBQTFCLEVBQTZCLEtBQUssSUFBTCxFQUFVLElBQXZDLENBQS9CLENBRFU7Ozs7Z0NBR0w7QUFDWixPQUFJLFNBQU8sRUFBUDtPQUFXLE1BQUksQ0FBSixDQURIO0FBRVosUUFBSSxJQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLGtCQUFaLENBQUwsRUFBcUMsTUFBSSxLQUFLLE1BQUwsRUFBWSxJQUFFLENBQUYsRUFBSSxDQUE3RCxFQUErRCxJQUFFLEdBQUYsRUFBTSxHQUF6RSxFQUE2RTtBQUM1RSxXQUFPLElBQVAsQ0FBWSxJQUFFLFNBQVMsS0FBSyxDQUFMLEVBQVEsSUFBUixDQUFhLEtBQWIsQ0FBVCxDQUFGLENBQVosQ0FENEU7QUFFNUUsV0FBSyxDQUFMLENBRjRFO0lBQTdFO0FBSUEsVUFBTyxFQUFDLEtBQUksR0FBSixFQUFTLE1BQUssTUFBTCxFQUFqQixDQU5ZOzs7O2dDQVFDLE1BQUs7QUFDbEIsVUFBTyxLQUFLLFNBQUwsSUFBZ0IsT0FBaEIsSUFBeUIsS0FBSyxTQUFMLElBQWdCLFNBQWhCLENBRGQ7Ozs7c0JBR0Y7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQTNCRztFQUFjLFFBQVEsVUFBUjs7QUFBZCxNQTZCYjtBQUNOLGlCQUFZLEdBQVosRUFBZ0I7OztBQUNmLE9BQUssSUFBTCxHQUFVLEdBQVYsQ0FEZTtBQUVmLE9BQUssTUFBTCxHQUFZLEVBQVosQ0FGZTtBQUdmLE9BQUssUUFBTCxHQUFjLElBQWQsQ0FIZTtFQUFoQjs7Ozt1QkFNSyxPQUFNO0FBQ1YsUUFBSyxNQUFMLENBQVksSUFBWixDQUFpQixLQUFLLFFBQUwsR0FBYyxJQUFJLFlBQUosQ0FBaUIsS0FBakIsQ0FBZCxDQUFqQixDQURVOzs7OzBCQUlILEtBQUk7QUFDWCxRQUFLLFFBQUwsQ0FBYyxPQUFkLENBQXNCLEdBQXRCLEVBRFc7Ozs7MkJBSUgsTUFBSztBQUNiLFFBQUssUUFBTCxDQUFjLFFBQWQsQ0FBdUIsSUFBdkIsRUFEYTs7Ozt3QkFJVDtBQUNKLFFBQUssTUFBTCxDQUFZLEdBQVosR0FESTs7OzsyQkFJRztBQUNQLFFBQUssUUFBTCxDQUFjLE1BQWQsR0FETzs7Ozs0QkFJQztBQUNSLFFBQUssUUFBTCxDQUFjLE9BQWQsR0FEUTs7OzsrQkFJRztBQUNYLFVBQU8sS0FBSyxRQUFMLENBQWMsVUFBZCxFQUFQLENBRFc7Ozs7OEJBSUQ7QUFDVixVQUFPLEtBQUssUUFBTCxDQUFjLFNBQWQsRUFBUCxDQURVOzs7OytCQUlDO0FBQ1gsVUFBTyxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBQVAsQ0FEVzs7Ozs4QkFJRDtBQUNWLFVBQU8sS0FBSyxRQUFMLENBQWMsU0FBZCxFQUFQLENBRFU7Ozs7Ozs7a0JBeEVROztJQThFZjtBQUNMLFVBREssWUFDTCxDQUFZLFNBQVosRUFBc0I7d0JBRGpCLGNBQ2lCOztBQUNyQixPQUFLLElBQUwsR0FBVSxVQUFVLElBQVYsQ0FBZSxDQUFmLENBQWlCLElBQWpCLEVBQXVCLE1BQXZCO0FBRFcsTUFFckIsQ0FBSyxJQUFMLEdBQVUsVUFBVSxJQUFWLENBQWUsQ0FBZixDQUFpQixrQkFBakIsRUFBcUMsTUFBckMsQ0FGVztBQUdyQixPQUFLLFVBQUwsR0FBZ0IsQ0FBaEIsQ0FIcUI7QUFJckIsT0FBSyxXQUFMLEdBQWlCLENBQWpCLENBSnFCO0VBQXRCOztjQURLOzswQkFPRyxLQUFJO0FBQ1gsUUFBSyxVQUFMLEdBRFc7Ozs7MkJBSUgsTUFBSztBQUNiLFFBQUssV0FBTCxHQURhOzs7O3lCQUlQLEtBQUk7QUFDVixRQUFLLFdBQUwsR0FBaUIsQ0FBakIsQ0FEVTs7OzswQkFJSCxNQUFLOzs7K0JBSUQ7QUFDWCxVQUFPLEtBQUssVUFBTCxJQUFpQixDQUFqQixDQURJOzs7OzhCQUlEO0FBQ1YsVUFBTyxLQUFLLFVBQUwsSUFBaUIsS0FBSyxJQUFMLENBRGQ7Ozs7K0JBSUM7QUFDWCxVQUFPLEtBQUssV0FBTCxJQUFrQixDQUFsQixDQURJOzs7OzhCQUlEO0FBQ1YsWUFEVTtBQUVWLFVBQU8sS0FBSyxXQUFMLElBQWtCLEtBQUssSUFBTCxDQUZmOzs7O1FBbkNOIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSBcIi4vc3R5bGUvdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0YWJsZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHBhcnNlKCl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoKHRoaXMpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUucG9wKHRoaXMpXG5cdH1cblx0XG5cdGdldFN0eWxlSWQoYSl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnRibFByPnRibFN0eWxlJykgfHwgKChhPXRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFRhYmxlU3R5bGUudHlwZSkpICYmIGEuaWQpXG5cdH1cblx0Z2V0TmFtZWRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuZ2V0U3R5bGVJZCgpKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRibFByJykpICYmIG5ldyBUYWJsZVN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0Z2V0Q29sV2lkdGgoKXtcblx0XHR2YXIgd2lkdGhzPVtdLCBzdW09MFxuXHRcdGZvcih2YXIgY29scz10aGlzLndYbWwuJCgnPnRibEdyaWQ+Z3JpZENvbCcpLGxlbj1jb2xzLmxlbmd0aCxpPTAsYTtpPGxlbjtpKyspe1xuXHRcdFx0d2lkdGhzLnB1c2goYT1wYXJzZUludChjb2xzW2ldLmF0dHIoJ3c6dycpKSlcblx0XHRcdHN1bSs9YVxuXHRcdH1cblx0XHRyZXR1cm4ge3N1bTpzdW0sIGNvbHM6d2lkdGhzfTtcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmxvY2FsTmFtZT09J3RibFByJ3x8d1htbC5sb2NhbE5hbWU9PSd0YmxHcmlkJ1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxuXHRcblx0c3RhdGljIENvbnRleHQ9Y2xhc3N7XG5cdFx0Y29uc3RydWN0b3IoZG9jKXtcblx0XHRcdHRoaXMud0RvYz1kb2Ncblx0XHRcdHRoaXMuX3N0YWNrPVtdXG5cdFx0XHR0aGlzLl9jdXJyZW50PW51bGxcblx0XHR9XG5cdFx0XG5cdFx0cHVzaCh0YWJsZSl7XG5cdFx0XHR0aGlzLl9zdGFjay5wdXNoKHRoaXMuX2N1cnJlbnQ9bmV3IFRhYmxlQ29udGV4dCh0YWJsZSkpXG5cdFx0fVxuXHRcdFxuXHRcdHB1c2hSb3cocm93KXtcblx0XHRcdHRoaXMuX2N1cnJlbnQucHVzaFJvdyhyb3cpXG5cdFx0fVxuXHRcdFxuXHRcdHB1c2hDZWxsKGNlbGwpe1xuXHRcdFx0dGhpcy5fY3VycmVudC5wdXNoQ2VsbChjZWxsKVxuXHRcdH1cblx0XHRcblx0XHRwb3AoKXtcblx0XHRcdHRoaXMuX3N0YWNrLnBvcCgpXG5cdFx0fVxuXHRcdFxuXHRcdHBvcFJvdygpe1xuXHRcdFx0dGhpcy5fY3VycmVudC5wb3BSb3coKVxuXHRcdH1cblx0XHRcblx0XHRwb3BDZWxsKCl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnBvcENlbGwoKVxuXHRcdH1cblx0XHRcblx0XHRpc0ZpcnN0Um93KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudC5pc0ZpcnN0Um93KClcblx0XHR9XG5cdFx0XG5cdFx0aXNMYXN0Um93KCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudC5pc0xhc3RSb3coKVxuXHRcdH1cblx0XHRcblx0XHRpc0ZpcnN0Q29sKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudC5pc0ZpcnN0Q29sKClcblx0XHR9XG5cdFx0XG5cdFx0aXNMYXN0Q29sKCl7XG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudC5pc0xhc3RDb2woKVxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBUYWJsZUNvbnRleHR7XG5cdGNvbnN0cnVjdG9yKGNvbnZlcnRlcil7XG5cdFx0dGhpcy5yb3dzPWNvbnZlcnRlci53WG1sLiQoJ3RyJykubGVuZ3RoLy9AdG9kbzpuZXN0ZWQgdGFibGUgbm90IHdvcmtcblx0XHR0aGlzLmNvbHM9Y29udmVydGVyLndYbWwuJCgnPnRibEdyaWQ+Z3JpZENvbCcpLmxlbmd0aFxuXHRcdHRoaXMuY3VycmVudFJvdz0wXG5cdFx0dGhpcy5jdXJyZW50Q2VsbD0wXG5cdH1cblx0cHVzaFJvdyhyb3cpe1xuXHRcdHRoaXMuY3VycmVudFJvdysrXG5cdH1cblx0XG5cdHB1c2hDZWxsKGNlbGwpe1xuXHRcdHRoaXMuY3VycmVudENlbGwrK1xuXHR9XG5cdFxuXHRwb3BSb3cocm93KXtcblx0XHR0aGlzLmN1cnJlbnRDZWxsPTBcblx0fVxuXHRcblx0cG9wQ2VsbChjZWxsKXtcblx0XHRcblx0fVxuXHRcblx0aXNGaXJzdFJvdygpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRSb3c9PTFcblx0fVxuXHRcblx0aXNMYXN0Um93KCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFJvdz09dGhpcy5yb3dzXG5cdH1cblx0XG5cdGlzRmlyc3RDb2woKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Q2VsbD09MVxuXHR9XG5cdFxuXHRpc0xhc3RDb2woKXtcblx0XHRkZWJ1Z2dlclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT10aGlzLmNvbHNcblx0fVxufVxuIl19