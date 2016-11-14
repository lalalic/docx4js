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

		return _possibleConstructorReturn(this, (table.__proto__ || Object.getPrototypeOf(table)).apply(this, arguments));
	}

	_createClass(table, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.push(this);
			_get(table.prototype.__proto__ || Object.getPrototypeOf(table.prototype), 'parse', this).apply(this, arguments);
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
			var asPt = _table2.default.Properties.prototype.asPt;
			var pt2Px = _table2.default.Properties.prototype.pt2Px;
			var widths = [],
			    sum = 0;
			for (var cols = this.wXml.$('>tblGrid>gridCol'), len = cols.length, i = 0, a; i < len; i++) {
				widths.push(a = pt2Px(asPt(cols[i].attr('w:w'))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOlsidGFibGUiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwicHVzaCIsImFyZ3VtZW50cyIsInBvcCIsImEiLCJfdmFsIiwic3R5bGUiLCJnZXREZWZhdWx0IiwidHlwZSIsImlkIiwiZ2V0IiwiZ2V0U3R5bGVJZCIsInByIiwid1htbCIsIiQxIiwiUHJvcGVydGllcyIsImFzUHQiLCJwcm90b3R5cGUiLCJwdDJQeCIsIndpZHRocyIsInN1bSIsImNvbHMiLCIkIiwibGVuIiwibGVuZ3RoIiwiaSIsImF0dHIiLCJsb2NhbE5hbWUiLCJyZXF1aXJlIiwiQ29udGV4dCIsImRvYyIsIl9zdGFjayIsIl9jdXJyZW50IiwiVGFibGVDb250ZXh0Iiwicm93IiwicHVzaFJvdyIsImNlbGwiLCJwdXNoQ2VsbCIsInBvcFJvdyIsInBvcENlbGwiLCJpc0ZpcnN0Um93IiwiaXNMYXN0Um93IiwiaXNGaXJzdENvbCIsImlzTGFzdENvbCIsImNvbnZlcnRlciIsInJvd3MiLCJjdXJyZW50Um93IiwiY3VycmVudENlbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxLOzs7Ozs7Ozs7OzswQkFDYjtBQUNOLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkYsS0FBdkIsQ0FBNkJHLElBQTdCLENBQWtDLElBQWxDO0FBQ0Esd0dBQWVDLFNBQWY7QUFDQSxRQUFLSCxJQUFMLENBQVVDLFlBQVYsQ0FBdUJGLEtBQXZCLENBQTZCSyxHQUE3QixDQUFpQyxJQUFqQztBQUNBOzs7NkJBRVVDLEMsRUFBRTtBQUNaLFVBQU8sS0FBS0MsSUFBTCxDQUFVLGlCQUFWLEtBQWlDLENBQUNELElBQUUsS0FBS0wsSUFBTCxDQUFVTyxLQUFWLENBQWdCQyxVQUFoQixDQUEyQixnQkFBV0MsSUFBdEMsQ0FBSCxLQUFtREosRUFBRUssRUFBN0Y7QUFDQTs7O2tDQUNj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LENBQWpCO0FBQ0E7Ozs7MEJBQ09iLEcsRUFBSTtBQUNYLFFBQUtZLFVBQUw7QUFDQTs7OzJCQUVRVixJLEVBQUs7QUFDYixRQUFLVyxXQUFMO0FBQ0E7Ozt5QkFFTWIsRyxFQUFJO0FBQ1YsUUFBS2EsV0FBTCxHQUFpQixDQUFqQjtBQUNBOzs7MEJBRU9YLEksRUFBSyxDQUVaOzs7K0JBRVc7QUFDWCxVQUFPLEtBQUtVLFVBQUwsSUFBaUIsQ0FBeEI7QUFDQTs7OzhCQUVVO0FBQ1YsVUFBTyxLQUFLQSxVQUFMLElBQWlCLEtBQUtELElBQTdCO0FBQ0E7OzsrQkFFVztBQUNYLFVBQU8sS0FBS0UsV0FBTCxJQUFrQixDQUF6QjtBQUNBOzs7OEJBRVU7QUFDVixVQUFPLEtBQUtBLFdBQUwsSUFBa0IsS0FBSzFCLElBQTlCO0FBQ0EiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXHJcblxyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYmxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcclxuXHRwYXJzZSgpe1xyXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoKHRoaXMpXHJcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnBvcCh0aGlzKVxyXG5cdH1cclxuXHRcclxuXHRnZXRTdHlsZUlkKGEpe1xyXG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnRibFByPnRibFN0eWxlJykgfHwgKChhPXRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFRhYmxlU3R5bGUudHlwZSkpICYmIGEuaWQpXHJcblx0fVxyXG5cdGdldE5hbWVkU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuZ2V0U3R5bGVJZCgpKVxyXG5cdH1cclxuXHRnZXREaXJlY3RTdHlsZShwcil7XHJcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRibFByJykpICYmIG5ldyBUYWJsZVN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXHJcblx0fVxyXG5cdGdldENvbFdpZHRoKCl7XHJcblx0XHRsZXQgYXNQdD1UYWJsZVN0eWxlLlByb3BlcnRpZXMucHJvdG90eXBlLmFzUHRcclxuXHRcdGxldCBwdDJQeD1UYWJsZVN0eWxlLlByb3BlcnRpZXMucHJvdG90eXBlLnB0MlB4XHJcblx0XHR2YXIgd2lkdGhzPVtdLCBzdW09MFxyXG5cdFx0Zm9yKHZhciBjb2xzPXRoaXMud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJyksbGVuPWNvbHMubGVuZ3RoLGk9MCxhO2k8bGVuO2krKyl7XHJcblx0XHRcdHdpZHRocy5wdXNoKGE9cHQyUHgoYXNQdChjb2xzW2ldLmF0dHIoJ3c6dycpKSkpXHJcblx0XHRcdHN1bSs9YVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHtzdW06c3VtLCBjb2xzOndpZHRoc307XHJcblx0fVxyXG5cdF9zaG91bGRJZ25vcmUod1htbCl7XHJcblx0XHRyZXR1cm4gd1htbC5sb2NhbE5hbWU9PSd0YmxQcid8fHdYbWwubG9jYWxOYW1lPT0ndGJsR3JpZCdcclxuXHR9XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0YWJsZSd9XHJcblx0XHJcblx0c3RhdGljIENvbnRleHQ9Y2xhc3N7XHJcblx0XHRjb25zdHJ1Y3Rvcihkb2Mpe1xyXG5cdFx0XHR0aGlzLndEb2M9ZG9jXHJcblx0XHRcdHRoaXMuX3N0YWNrPVtdXHJcblx0XHRcdHRoaXMuX2N1cnJlbnQ9bnVsbFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwdXNoKHRhYmxlKXtcclxuXHRcdFx0dGhpcy5fc3RhY2sucHVzaCh0aGlzLl9jdXJyZW50PW5ldyBUYWJsZUNvbnRleHQodGFibGUpKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwdXNoUm93KHJvdyl7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnQucHVzaFJvdyhyb3cpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHB1c2hDZWxsKGNlbGwpe1xyXG5cdFx0XHR0aGlzLl9jdXJyZW50LnB1c2hDZWxsKGNlbGwpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHBvcCgpe1xyXG5cdFx0XHR0aGlzLl9zdGFjay5wb3AoKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwb3BSb3coKXtcclxuXHRcdFx0dGhpcy5fY3VycmVudC5wb3BSb3coKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRwb3BDZWxsKCl7XHJcblx0XHRcdHRoaXMuX2N1cnJlbnQucG9wQ2VsbCgpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlzRmlyc3RSb3coKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNGaXJzdFJvdygpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlzTGFzdFJvdygpe1xyXG5cdFx0XHRyZXR1cm4gdGhpcy5fY3VycmVudC5pc0xhc3RSb3coKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpc0ZpcnN0Q29sKCl7XHJcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzRmlyc3RDb2woKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpc0xhc3RDb2woKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNMYXN0Q29sKClcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFRhYmxlQ29udGV4dHtcclxuXHRjb25zdHJ1Y3Rvcihjb252ZXJ0ZXIpe1xyXG5cdFx0dGhpcy5yb3dzPWNvbnZlcnRlci53WG1sLiQoJ3RyJykubGVuZ3RoLy9AdG9kbzpuZXN0ZWQgdGFibGUgbm90IHdvcmtcclxuXHRcdHRoaXMuY29scz1jb252ZXJ0ZXIud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJykubGVuZ3RoXHJcblx0XHR0aGlzLmN1cnJlbnRSb3c9MFxyXG5cdFx0dGhpcy5jdXJyZW50Q2VsbD0wXHJcblx0fVxyXG5cdHB1c2hSb3cocm93KXtcclxuXHRcdHRoaXMuY3VycmVudFJvdysrXHJcblx0fVxyXG5cdFxyXG5cdHB1c2hDZWxsKGNlbGwpe1xyXG5cdFx0dGhpcy5jdXJyZW50Q2VsbCsrXHJcblx0fVxyXG5cdFxyXG5cdHBvcFJvdyhyb3cpe1xyXG5cdFx0dGhpcy5jdXJyZW50Q2VsbD0wXHJcblx0fVxyXG5cdFxyXG5cdHBvcENlbGwoY2VsbCl7XHJcblx0XHRcclxuXHR9XHJcblx0XHJcblx0aXNGaXJzdFJvdygpe1xyXG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFJvdz09MVxyXG5cdH1cclxuXHRcclxuXHRpc0xhc3RSb3coKXtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRSb3c9PXRoaXMucm93c1xyXG5cdH1cclxuXHRcclxuXHRpc0ZpcnN0Q29sKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Q2VsbD09MVxyXG5cdH1cclxuXHRcclxuXHRpc0xhc3RDb2woKXtcclxuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT10aGlzLmNvbHNcclxuXHR9XHJcbn1cclxuIl19