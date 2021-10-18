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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOlsidGFibGUiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwicHVzaCIsImFyZ3VtZW50cyIsInBvcCIsImEiLCJfdmFsIiwic3R5bGUiLCJnZXREZWZhdWx0IiwiVGFibGVTdHlsZSIsInR5cGUiLCJpZCIsImdldCIsImdldFN0eWxlSWQiLCJwciIsIndYbWwiLCIkMSIsIlByb3BlcnRpZXMiLCJhc1B0IiwicHJvdG90eXBlIiwicHQyUHgiLCJ3aWR0aHMiLCJzdW0iLCJjb2xzIiwiJCIsImxlbiIsImxlbmd0aCIsImkiLCJhdHRyIiwibG9jYWxOYW1lIiwicmVxdWlyZSIsIkNvbnRleHQiLCJkb2MiLCJfc3RhY2siLCJfY3VycmVudCIsIlRhYmxlQ29udGV4dCIsInJvdyIsInB1c2hSb3ciLCJjZWxsIiwicHVzaENlbGwiLCJwb3BSb3ciLCJwb3BDZWxsIiwiaXNGaXJzdFJvdyIsImlzTGFzdFJvdyIsImlzRmlyc3RDb2wiLCJpc0xhc3RDb2wiLCJjb252ZXJ0ZXIiLCJyb3dzIiwiY3VycmVudFJvdyIsImN1cnJlbnRDZWxsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUlxQkEsSzs7Ozs7Ozs7Ozs7MEJBQ2I7QUFDTixRQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJGLEtBQXZCLENBQTZCRyxJQUE3QixDQUFrQyxJQUFsQztBQUNBLHdHQUFlQyxTQUFmO0FBQ0EsUUFBS0gsSUFBTCxDQUFVQyxZQUFWLENBQXVCRixLQUF2QixDQUE2QkssR0FBN0IsQ0FBaUMsSUFBakM7QUFDQTs7OzZCQUVVQyxDLEVBQUU7QUFDWixVQUFPLEtBQUtDLElBQUwsQ0FBVSxpQkFBVixLQUFpQyxDQUFDRCxJQUFFLEtBQUtMLElBQUwsQ0FBVU8sS0FBVixDQUFnQkMsVUFBaEIsQ0FBMkJDLGdCQUFXQyxJQUF0QyxDQUFILEtBQW1ETCxFQUFFTSxFQUE3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LE9BQUtDLFdBQUwsR0FBaUIsQ0FBakI7QUFDQTs7OzswQkFDT2IsRyxFQUFJO0FBQ1gsUUFBS1ksVUFBTDtBQUNBOzs7MkJBRVFWLEksRUFBSztBQUNiLFFBQUtXLFdBQUw7QUFDQTs7O3lCQUVNYixHLEVBQUk7QUFDVixRQUFLYSxXQUFMLEdBQWlCLENBQWpCO0FBQ0E7OzswQkFFT1gsSSxFQUFLLENBRVo7OzsrQkFFVztBQUNYLFVBQU8sS0FBS1UsVUFBTCxJQUFpQixDQUF4QjtBQUNBOzs7OEJBRVU7QUFDVixVQUFPLEtBQUtBLFVBQUwsSUFBaUIsS0FBS0QsSUFBN0I7QUFDQTs7OytCQUVXO0FBQ1gsVUFBTyxLQUFLRSxXQUFMLElBQWtCLENBQXpCO0FBQ0E7Ozs4QkFFVTtBQUNWLFVBQU8sS0FBS0EsV0FBTCxJQUFrQixLQUFLMUIsSUFBOUI7QUFDQSIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHRhYmxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0cGFyc2UoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnB1c2godGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wb3AodGhpcylcblx0fVxuXHRcblx0Z2V0U3R5bGVJZChhKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+dGJsUHI+dGJsU3R5bGUnKSB8fCAoKGE9dGhpcy53RG9jLnN0eWxlLmdldERlZmF1bHQoVGFibGVTdHlsZS50eXBlKSkgJiYgYS5pZClcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGJsUHInKSkgJiYgbmV3IFRhYmxlU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0fVxuXHRnZXRDb2xXaWR0aCgpe1xuXHRcdGxldCBhc1B0PVRhYmxlU3R5bGUuUHJvcGVydGllcy5wcm90b3R5cGUuYXNQdFxuXHRcdGxldCBwdDJQeD1UYWJsZVN0eWxlLlByb3BlcnRpZXMucHJvdG90eXBlLnB0MlB4XG5cdFx0dmFyIHdpZHRocz1bXSwgc3VtPTBcblx0XHRmb3IodmFyIGNvbHM9dGhpcy53WG1sLiQoJz50YmxHcmlkPmdyaWRDb2wnKSxsZW49Y29scy5sZW5ndGgsaT0wLGE7aTxsZW47aSsrKXtcblx0XHRcdHdpZHRocy5wdXNoKGE9cHQyUHgoYXNQdChjb2xzW2ldLmF0dHIoJ3c6dycpKSkpXG5cdFx0XHRzdW0rPWFcblx0XHR9XG5cdFx0cmV0dXJuIHtzdW06c3VtLCBjb2xzOndpZHRoc307XG5cdH1cblx0X3Nob3VsZElnbm9yZSh3WG1sKXtcblx0XHRyZXR1cm4gd1htbC5sb2NhbE5hbWU9PSd0YmxQcid8fHdYbWwubG9jYWxOYW1lPT0ndGJsR3JpZCdcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3RhYmxlJ31cblx0XG5cdHN0YXRpYyBDb250ZXh0PWNsYXNze1xuXHRcdGNvbnN0cnVjdG9yKGRvYyl7XG5cdFx0XHR0aGlzLndEb2M9ZG9jXG5cdFx0XHR0aGlzLl9zdGFjaz1bXVxuXHRcdFx0dGhpcy5fY3VycmVudD1udWxsXG5cdFx0fVxuXHRcdFxuXHRcdHB1c2godGFibGUpe1xuXHRcdFx0dGhpcy5fc3RhY2sucHVzaCh0aGlzLl9jdXJyZW50PW5ldyBUYWJsZUNvbnRleHQodGFibGUpKVxuXHRcdH1cblx0XHRcblx0XHRwdXNoUm93KHJvdyl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnB1c2hSb3cocm93KVxuXHRcdH1cblx0XHRcblx0XHRwdXNoQ2VsbChjZWxsKXtcblx0XHRcdHRoaXMuX2N1cnJlbnQucHVzaENlbGwoY2VsbClcblx0XHR9XG5cdFx0XG5cdFx0cG9wKCl7XG5cdFx0XHR0aGlzLl9zdGFjay5wb3AoKVxuXHRcdH1cblx0XHRcblx0XHRwb3BSb3coKXtcblx0XHRcdHRoaXMuX2N1cnJlbnQucG9wUm93KClcblx0XHR9XG5cdFx0XG5cdFx0cG9wQ2VsbCgpe1xuXHRcdFx0dGhpcy5fY3VycmVudC5wb3BDZWxsKClcblx0XHR9XG5cdFx0XG5cdFx0aXNGaXJzdFJvdygpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNGaXJzdFJvdygpXG5cdFx0fVxuXHRcdFxuXHRcdGlzTGFzdFJvdygpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNMYXN0Um93KClcblx0XHR9XG5cdFx0XG5cdFx0aXNGaXJzdENvbCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNGaXJzdENvbCgpXG5cdFx0fVxuXHRcdFxuXHRcdGlzTGFzdENvbCgpe1xuXHRcdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnQuaXNMYXN0Q29sKClcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgVGFibGVDb250ZXh0e1xuXHRjb25zdHJ1Y3Rvcihjb252ZXJ0ZXIpe1xuXHRcdHRoaXMucm93cz1jb252ZXJ0ZXIud1htbC4kKCd0cicpLmxlbmd0aC8vQHRvZG86bmVzdGVkIHRhYmxlIG5vdCB3b3JrXG5cdFx0dGhpcy5jb2xzPWNvbnZlcnRlci53WG1sLiQoJz50YmxHcmlkPmdyaWRDb2wnKS5sZW5ndGhcblx0XHR0aGlzLmN1cnJlbnRSb3c9MFxuXHRcdHRoaXMuY3VycmVudENlbGw9MFxuXHR9XG5cdHB1c2hSb3cocm93KXtcblx0XHR0aGlzLmN1cnJlbnRSb3crK1xuXHR9XG5cdFxuXHRwdXNoQ2VsbChjZWxsKXtcblx0XHR0aGlzLmN1cnJlbnRDZWxsKytcblx0fVxuXHRcblx0cG9wUm93KHJvdyl7XG5cdFx0dGhpcy5jdXJyZW50Q2VsbD0wXG5cdH1cblx0XG5cdHBvcENlbGwoY2VsbCl7XG5cdFx0XG5cdH1cblx0XG5cdGlzRmlyc3RSb3coKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Um93PT0xXG5cdH1cblx0XG5cdGlzTGFzdFJvdygpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRSb3c9PXRoaXMucm93c1xuXHR9XG5cdFxuXHRpc0ZpcnN0Q29sKCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudENlbGw9PTFcblx0fVxuXHRcblx0aXNMYXN0Q29sKCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudENlbGw9PXRoaXMuY29sc1xuXHR9XG59XG4iXX0=