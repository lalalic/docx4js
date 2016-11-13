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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOlsidGFibGUiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwicHVzaCIsImFyZ3VtZW50cyIsInBvcCIsImEiLCJfdmFsIiwic3R5bGUiLCJnZXREZWZhdWx0IiwidHlwZSIsImlkIiwiZ2V0IiwiZ2V0U3R5bGVJZCIsInByIiwid1htbCIsIiQxIiwiUHJvcGVydGllcyIsImFzUHQiLCJwcm90b3R5cGUiLCJwdDJQeCIsIndpZHRocyIsInN1bSIsImNvbHMiLCIkIiwibGVuIiwibGVuZ3RoIiwiaSIsImF0dHIiLCJsb2NhbE5hbWUiLCJyZXF1aXJlIiwiQ29udGV4dCIsImRvYyIsIl9zdGFjayIsIl9jdXJyZW50IiwiVGFibGVDb250ZXh0Iiwicm93IiwicHVzaFJvdyIsImNlbGwiLCJwdXNoQ2VsbCIsInBvcFJvdyIsInBvcENlbGwiLCJpc0ZpcnN0Um93IiwiaXNMYXN0Um93IiwiaXNGaXJzdENvbCIsImlzTGFzdENvbCIsImNvbnZlcnRlciIsInJvd3MiLCJjdXJyZW50Um93IiwiY3VycmVudENlbGwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBSXFCQSxLOzs7Ozs7Ozs7OzswQkFDYjtBQUNOLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkYsS0FBdkIsQ0FBNkJHLElBQTdCLENBQWtDLElBQWxDO0FBQ0Esd0dBQWVDLFNBQWY7QUFDQSxRQUFLSCxJQUFMLENBQVVDLFlBQVYsQ0FBdUJGLEtBQXZCLENBQTZCSyxHQUE3QixDQUFpQyxJQUFqQztBQUNBOzs7NkJBRVVDLEMsRUFBRTtBQUNaLFVBQU8sS0FBS0MsSUFBTCxDQUFVLGlCQUFWLEtBQWlDLENBQUNELElBQUUsS0FBS0wsSUFBTCxDQUFVTyxLQUFWLENBQWdCQyxVQUFoQixDQUEyQixnQkFBV0MsSUFBdEMsQ0FBSCxLQUFtREosRUFBRUssRUFBN0Y7QUFDQTs7O2tDQUNj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LENBQWpCO0FBQ0E7Ozs7MEJBQ09iLEcsRUFBSTtBQUNYLFFBQUtZLFVBQUw7QUFDQTs7OzJCQUVRVixJLEVBQUs7QUFDYixRQUFLVyxXQUFMO0FBQ0E7Ozt5QkFFTWIsRyxFQUFJO0FBQ1YsUUFBS2EsV0FBTCxHQUFpQixDQUFqQjtBQUNBOzs7MEJBRU9YLEksRUFBSyxDQUVaOzs7K0JBRVc7QUFDWCxVQUFPLEtBQUtVLFVBQUwsSUFBaUIsQ0FBeEI7QUFDQTs7OzhCQUVVO0FBQ1YsVUFBTyxLQUFLQSxVQUFMLElBQWlCLEtBQUtELElBQTdCO0FBQ0E7OzsrQkFFVztBQUNYLFVBQU8sS0FBS0UsV0FBTCxJQUFrQixDQUF6QjtBQUNBOzs7OEJBRVU7QUFDVixVQUFPLEtBQUtBLFdBQUwsSUFBa0IsS0FBSzFCLElBQTlCO0FBQ0EiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0YWJsZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHBhcnNlKCl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoKHRoaXMpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUucG9wKHRoaXMpXG5cdH1cblx0XG5cdGdldFN0eWxlSWQoYSl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnRibFByPnRibFN0eWxlJykgfHwgKChhPXRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFRhYmxlU3R5bGUudHlwZSkpICYmIGEuaWQpXG5cdH1cblx0Z2V0TmFtZWRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuZ2V0U3R5bGVJZCgpKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRibFByJykpICYmIG5ldyBUYWJsZVN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0Z2V0Q29sV2lkdGgoKXtcblx0XHRsZXQgYXNQdD1UYWJsZVN0eWxlLlByb3BlcnRpZXMucHJvdG90eXBlLmFzUHRcblx0XHRsZXQgcHQyUHg9VGFibGVTdHlsZS5Qcm9wZXJ0aWVzLnByb3RvdHlwZS5wdDJQeFxuXHRcdHZhciB3aWR0aHM9W10sIHN1bT0wXG5cdFx0Zm9yKHZhciBjb2xzPXRoaXMud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJyksbGVuPWNvbHMubGVuZ3RoLGk9MCxhO2k8bGVuO2krKyl7XG5cdFx0XHR3aWR0aHMucHVzaChhPXB0MlB4KGFzUHQoY29sc1tpXS5hdHRyKCd3OncnKSkpKVxuXHRcdFx0c3VtKz1hXG5cdFx0fVxuXHRcdHJldHVybiB7c3VtOnN1bSwgY29sczp3aWR0aHN9O1xuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwubG9jYWxOYW1lPT0ndGJsUHInfHx3WG1sLmxvY2FsTmFtZT09J3RibEdyaWQnXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0YWJsZSd9XG5cdFxuXHRzdGF0aWMgQ29udGV4dD1jbGFzc3tcblx0XHRjb25zdHJ1Y3Rvcihkb2Mpe1xuXHRcdFx0dGhpcy53RG9jPWRvY1xuXHRcdFx0dGhpcy5fc3RhY2s9W11cblx0XHRcdHRoaXMuX2N1cnJlbnQ9bnVsbFxuXHRcdH1cblx0XHRcblx0XHRwdXNoKHRhYmxlKXtcblx0XHRcdHRoaXMuX3N0YWNrLnB1c2godGhpcy5fY3VycmVudD1uZXcgVGFibGVDb250ZXh0KHRhYmxlKSlcblx0XHR9XG5cdFx0XG5cdFx0cHVzaFJvdyhyb3cpe1xuXHRcdFx0dGhpcy5fY3VycmVudC5wdXNoUm93KHJvdylcblx0XHR9XG5cdFx0XG5cdFx0cHVzaENlbGwoY2VsbCl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnB1c2hDZWxsKGNlbGwpXG5cdFx0fVxuXHRcdFxuXHRcdHBvcCgpe1xuXHRcdFx0dGhpcy5fc3RhY2sucG9wKClcblx0XHR9XG5cdFx0XG5cdFx0cG9wUm93KCl7XG5cdFx0XHR0aGlzLl9jdXJyZW50LnBvcFJvdygpXG5cdFx0fVxuXHRcdFxuXHRcdHBvcENlbGwoKXtcblx0XHRcdHRoaXMuX2N1cnJlbnQucG9wQ2VsbCgpXG5cdFx0fVxuXHRcdFxuXHRcdGlzRmlyc3RSb3coKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzRmlyc3RSb3coKVxuXHRcdH1cblx0XHRcblx0XHRpc0xhc3RSb3coKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzTGFzdFJvdygpXG5cdFx0fVxuXHRcdFxuXHRcdGlzRmlyc3RDb2woKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzRmlyc3RDb2woKVxuXHRcdH1cblx0XHRcblx0XHRpc0xhc3RDb2woKXtcblx0XHRcdHJldHVybiB0aGlzLl9jdXJyZW50LmlzTGFzdENvbCgpXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIFRhYmxlQ29udGV4dHtcblx0Y29uc3RydWN0b3IoY29udmVydGVyKXtcblx0XHR0aGlzLnJvd3M9Y29udmVydGVyLndYbWwuJCgndHInKS5sZW5ndGgvL0B0b2RvOm5lc3RlZCB0YWJsZSBub3Qgd29ya1xuXHRcdHRoaXMuY29scz1jb252ZXJ0ZXIud1htbC4kKCc+dGJsR3JpZD5ncmlkQ29sJykubGVuZ3RoXG5cdFx0dGhpcy5jdXJyZW50Um93PTBcblx0XHR0aGlzLmN1cnJlbnRDZWxsPTBcblx0fVxuXHRwdXNoUm93KHJvdyl7XG5cdFx0dGhpcy5jdXJyZW50Um93Kytcblx0fVxuXHRcblx0cHVzaENlbGwoY2VsbCl7XG5cdFx0dGhpcy5jdXJyZW50Q2VsbCsrXG5cdH1cblx0XG5cdHBvcFJvdyhyb3cpe1xuXHRcdHRoaXMuY3VycmVudENlbGw9MFxuXHR9XG5cdFxuXHRwb3BDZWxsKGNlbGwpe1xuXHRcdFxuXHR9XG5cdFxuXHRpc0ZpcnN0Um93KCl7XG5cdFx0cmV0dXJuIHRoaXMuY3VycmVudFJvdz09MVxuXHR9XG5cdFxuXHRpc0xhc3RSb3coKXtcblx0XHRyZXR1cm4gdGhpcy5jdXJyZW50Um93PT10aGlzLnJvd3Ncblx0fVxuXHRcblx0aXNGaXJzdENvbCgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT0xXG5cdH1cblx0XG5cdGlzTGFzdENvbCgpe1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRDZWxsPT10aGlzLmNvbHNcblx0fVxufVxuIl19