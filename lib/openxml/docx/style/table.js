"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _xmlObject = require("../../../xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * conditional formatting: http://officeopenxml.com/WPstyleTableStylesCond.php
 * The conditional formats are applied in the following order:
	>Whole table/table
	>Banded columns/band1Vert , even column banding/band2Vert
	>Banded rows/band1Horz , even row banding/band2Horz
	>First row/firstRow , last row/lastRow
	>First column/firstCol, last column/lastCol
	>Top left/nwCell, top right/neCell, bottom left/swCell, bottom right/seCell
 */
var PRIORIZED = 'seCell,swCell,neCell,nwCell,lastCol,firstCol,lastRow,firstRow,band2Horz,band1Horz,band2Vert,band1Vert'.split(',');

var WithBorder = function (_Style) {
	_inherits(WithBorder, _Style);

	function WithBorder() {
		_classCallCheck(this, WithBorder);

		return _possibleConstructorReturn(this, (WithBorder.__proto__ || Object.getPrototypeOf(WithBorder)).apply(this, arguments));
	}

	_createClass(WithBorder, [{
		key: "_1border",
		value: function _1border(type) {
			var value = this.raw.get(type, false);
			if (value != undefined) {
				if (value.val == 'nil') return { sz: 0 };
				return value;
			}

			return undefined;
		}
	}, {
		key: "_right",
		value: function _right(conditions) {
			return this._1border('tcPr.tcBorders.right');
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			return this._1border('tcPr.tcBorders.left');
		}
	}, {
		key: "_top",
		value: function _top() {
			return this._1border('tcPr.tcBorders.top');
		}
	}, {
		key: "_bottom",
		value: function _bottom() {
			return this._1border('tcPr.tcBorders.bottom');
		}
	}]);

	return WithBorder;
}(_base2.default);

var RowStyle = function (_WithBorder) {
	_inherits(RowStyle, _WithBorder);

	function RowStyle() {
		_classCallCheck(this, RowStyle);

		return _possibleConstructorReturn(this, (RowStyle.__proto__ || Object.getPrototypeOf(RowStyle)).apply(this, arguments));
	}

	_createClass(RowStyle, [{
		key: "_right",
		value: function _right(conditions, edges) {
			var value = void 0;
			if (conditions.includes('lastCol') || edges.includes('lastCol')) value = _get(RowStyle.prototype.__proto__ || Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions, edges) {
			var value = void 0;
			if (conditions.includes('firstCol') || edges.includes('firstCol')) value = _get(RowStyle.prototype.__proto__ || Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}]);

	return RowStyle;
}(WithBorder);

var CellStyle = function (_WithBorder2) {
	_inherits(CellStyle, _WithBorder2);

	function CellStyle() {
		_classCallCheck(this, CellStyle);

		return _possibleConstructorReturn(this, (CellStyle.__proto__ || Object.getPrototypeOf(CellStyle)).apply(this, arguments));
	}

	return CellStyle;
}(WithBorder);

var ColStyle = function (_WithBorder3) {
	_inherits(ColStyle, _WithBorder3);

	function ColStyle() {
		_classCallCheck(this, ColStyle);

		return _possibleConstructorReturn(this, (ColStyle.__proto__ || Object.getPrototypeOf(ColStyle)).apply(this, arguments));
	}

	_createClass(ColStyle, [{
		key: "_top",
		value: function _top(conditions, edges) {
			if (conditions.includes('firstRow') || edges.includes('firstRow')) return _get(ColStyle.prototype.__proto__ || Object.getPrototypeOf(ColStyle.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conditions, edges) {
			if (conditions.includes('lastRow') || edges.includes('lastRow')) return _get(ColStyle.prototype.__proto__ || Object.getPrototypeOf(ColStyle.prototype), "_bottom", this).apply(this, arguments);
		}
	}]);

	return ColStyle;
}(WithBorder);

var BandHStyle = function (_RowStyle) {
	_inherits(BandHStyle, _RowStyle);

	function BandHStyle() {
		_classCallCheck(this, BandHStyle);

		return _possibleConstructorReturn(this, (BandHStyle.__proto__ || Object.getPrototypeOf(BandHStyle)).apply(this, arguments));
	}

	return BandHStyle;
}(RowStyle);

var BandVStyle = function (_ColStyle) {
	_inherits(BandVStyle, _ColStyle);

	function BandVStyle() {
		_classCallCheck(this, BandVStyle);

		return _possibleConstructorReturn(this, (BandVStyle.__proto__ || Object.getPrototypeOf(BandVStyle)).apply(this, arguments));
	}

	return BandVStyle;
}(ColStyle);

var types = {};
types.seCell = CellStyle;
types.swCell = CellStyle;
types.neCell = CellStyle;
types.nwCell = CellStyle;
types.lastCol = ColStyle;
types.firstCol = ColStyle;
types.lastRow = RowStyle;
types.firstRow = RowStyle;
types.band2Horz = BandHStyle;
types.band1Horz = BandHStyle;
types.band2Vert = BandVStyle;
types.band1Vert = BandVStyle;
types.row = RowStyle;
types.cell = CellStyle;

var TableStyle = function (_WithBorder4) {
	_inherits(TableStyle, _WithBorder4);

	function TableStyle(style, styles, basedOn) {
		_classCallCheck(this, TableStyle);

		var _this7 = _possibleConstructorReturn(this, (TableStyle.__proto__ || Object.getPrototypeOf(TableStyle)).apply(this, arguments));

		(_this7.raw.get('tblStylePr') || []).forEach(function (a) {
			a = (0, _xmlObject.getable)(a);
			var type = a.get('$.type');
			_this7[type] = new types[type](a);
		});
		return _this7;
	}

	_createClass(TableStyle, [{
		key: "getBorder",
		value: function getBorder(conditions, edges) {
			return {
				right: this._right.apply(this, arguments) || { sz: 0 },
				left: this._left.apply(this, arguments) || { sz: 0 },
				top: this._top.apply(this, arguments) || { sz: 0 },
				bottom: this._bottom.apply(this, arguments) || { sz: 0 }
			};
		}
	}, {
		key: "get",
		value: function get(path) {
			var _this8 = this;

			var conditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

			var value = this.priorize(conditions).reduce(function (found, condition) {
				if (found != undefined) return found;
				var conditionStyle = _this8[condition];
				if (conditionStyle) return conditionStyle.get(path, conditions);
				return found;
			}, undefined);

			if (value == undefined) value = _get(TableStyle.prototype.__proto__ || Object.getPrototypeOf(TableStyle.prototype), "get", this).apply(this, arguments);

			return value;
		}
	}, {
		key: "priorize",
		value: function priorize(conditions) {
			conditions.sort(function (a, b) {
				return PRIORIZED.indexOf(a) - PRIORIZED.indexOf(b);
			});
			return conditions;
		}

		/**
   * 1. conditional formatting
   * 2. table.tcPr
   * 3. table.trPr=tblPrEx
   * 4. table.tblPr
   */

	}, {
		key: "_right",
		value: function _right(conditions, edges) {
			var _this9 = this,
			    _arguments = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this9[cond];
				if (condStyle && condStyle._right) return condStyle._right.apply(condStyle, _arguments);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(TableStyle.prototype.__proto__ || Object.getPrototypeOf(TableStyle.prototype), "_right", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('lastCol') || edges.includes('lastCol')) value = this._1border('tblPrEx.tblBorders.right');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('lastCol') || edges.includes('lastCol')) value = this._1border('tblPr.tblBorders.right');else value = this._1border('tblPr.tblBorders.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._right) value = basedOn._right.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions, edges) {
			var _this10 = this,
			    _arguments2 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this10[cond];
				if (condStyle && condStyle._left) return condStyle._left.apply(condStyle, _arguments2);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(TableStyle.prototype.__proto__ || Object.getPrototypeOf(TableStyle.prototype), "_left", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('firstCol') || edges.includes('firstCol')) value = this._1border('tblPrEx.tblBorders.left');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('firstCol') || edges.includes('firstCol')) value = this._1border('tblPr.tblBorders.left');else value = this._1border('tblPr.tblBorders.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._left) value = basedOn._left.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_top",
		value: function _top(conditions, edges) {
			var _this11 = this,
			    _arguments3 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this11[cond];
				if (condStyle && condStyle._top) return condStyle._top.apply(condStyle, _arguments3);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(TableStyle.prototype.__proto__ || Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('firstRow') || edges.includes('firstRow')) value = this._1border('tblPrEx.tblBorders.top');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('firstRow') || edges.includes('firstRow')) value = this._1border('tblPr.tblBorders.top');else value = this._1border('tblPr.tblBorders.insideH');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._top) value = basedOn._top.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_bottom",
		value: function _bottom(conditions, edges) {
			var _this12 = this,
			    _arguments4 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this12[cond];
				if (condStyle && condStyle._bottom) return condStyle._bottom.apply(condStyle, _arguments4);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(TableStyle.prototype.__proto__ || Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('lastRow') || edges.includes('lastRow')) value = this._1border('tblPrEx.tblBorders.bottom');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('lastRow') || edges.includes('lastRow')) value = this._1border('tblPr.tblBorders.bottom');else value = this._1border('tblPr.tblBorders.insideH');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._bottom) value = basedOn._bottom.apply(basedOn, arguments);
			}

			return value;
		}
	}]);

	return TableStyle;
}(WithBorder);

exports.default = TableStyle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiUFJJT1JJWkVEIiwic3BsaXQiLCJXaXRoQm9yZGVyIiwidHlwZSIsInZhbHVlIiwicmF3IiwiZ2V0IiwidW5kZWZpbmVkIiwidmFsIiwic3oiLCJjb25kaXRpb25zIiwiXzFib3JkZXIiLCJTdHlsZSIsIlJvd1N0eWxlIiwiZWRnZXMiLCJpbmNsdWRlcyIsImFyZ3VtZW50cyIsIkNlbGxTdHlsZSIsIkNvbFN0eWxlIiwiQmFuZEhTdHlsZSIsIkJhbmRWU3R5bGUiLCJ0eXBlcyIsInNlQ2VsbCIsInN3Q2VsbCIsIm5lQ2VsbCIsIm53Q2VsbCIsImxhc3RDb2wiLCJmaXJzdENvbCIsImxhc3RSb3ciLCJmaXJzdFJvdyIsImJhbmQySG9yeiIsImJhbmQxSG9yeiIsImJhbmQyVmVydCIsImJhbmQxVmVydCIsInJvdyIsImNlbGwiLCJUYWJsZVN0eWxlIiwic3R5bGUiLCJzdHlsZXMiLCJiYXNlZE9uIiwiZm9yRWFjaCIsImEiLCJyaWdodCIsIl9yaWdodCIsImxlZnQiLCJfbGVmdCIsInRvcCIsIl90b3AiLCJib3R0b20iLCJfYm90dG9tIiwicGF0aCIsInByaW9yaXplIiwicmVkdWNlIiwiZm91bmQiLCJjb25kaXRpb24iLCJjb25kaXRpb25TdHlsZSIsInNvcnQiLCJiIiwiaW5kZXhPZiIsImNvbmQiLCJjb25kU3R5bGUiLCJwciIsImdldEJhc2VkT24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7O0FBR0E7Ozs7Ozs7Ozs7QUFVQSxJQUFJQSxZQUFVLHdHQUF3R0MsS0FBeEcsQ0FBOEcsR0FBOUcsQ0FBZDs7SUFFTUMsVTs7Ozs7Ozs7Ozs7MkJBRUlDLEksRUFBSztBQUNiLE9BQUlDLFFBQU0sS0FBS0MsR0FBTCxDQUFTQyxHQUFULENBQWFILElBQWIsRUFBa0IsS0FBbEIsQ0FBVjtBQUNBLE9BQUdDLFNBQU9HLFNBQVYs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YXNlXCJcclxuXHJcbmltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4uLy4uLy4uL3htbE9iamVjdFwiXHJcblxyXG5cclxuLyoqXHJcbiAqIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxyXG4gKiBUaGUgY29uZGl0aW9uYWwgZm9ybWF0cyBhcmUgYXBwbGllZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxyXG5cdD5XaG9sZSB0YWJsZS90YWJsZVxyXG5cdD5CYW5kZWQgY29sdW1ucy9iYW5kMVZlcnQgLCBldmVuIGNvbHVtbiBiYW5kaW5nL2JhbmQyVmVydFxyXG5cdD5CYW5kZWQgcm93cy9iYW5kMUhvcnogLCBldmVuIHJvdyBiYW5kaW5nL2JhbmQySG9yelxyXG5cdD5GaXJzdCByb3cvZmlyc3RSb3cgLCBsYXN0IHJvdy9sYXN0Um93XHJcblx0PkZpcnN0IGNvbHVtbi9maXJzdENvbCwgbGFzdCBjb2x1bW4vbGFzdENvbFxyXG5cdD5Ub3AgbGVmdC9ud0NlbGwsIHRvcCByaWdodC9uZUNlbGwsIGJvdHRvbSBsZWZ0L3N3Q2VsbCwgYm90dG9tIHJpZ2h0L3NlQ2VsbFxyXG4gKi9cclxubGV0IFBSSU9SSVpFRD0nc2VDZWxsLHN3Q2VsbCxuZUNlbGwsbndDZWxsLGxhc3RDb2wsZmlyc3RDb2wsbGFzdFJvdyxmaXJzdFJvdyxiYW5kMkhvcnosYmFuZDFIb3J6LGJhbmQyVmVydCxiYW5kMVZlcnQnLnNwbGl0KCcsJylcclxuXHJcbmNsYXNzIFdpdGhCb3JkZXIgZXh0ZW5kcyBTdHlsZXtcclxuXHJcblx0XzFib3JkZXIodHlwZSl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5yYXcuZ2V0KHR5cGUsZmFsc2UpXHJcblx0XHRpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYodmFsdWUudmFsPT0nbmlsJylcclxuXHRcdFx0XHRyZXR1cm4ge3N6OjB9XHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB1bmRlZmluZWRcclxuXHR9XHJcblxyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5yaWdodCcpXHJcblx0fVxyXG5cclxuXHRfbGVmdChjb25kaXRpb25zKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5sZWZ0JylcclxuXHR9XHJcblxyXG5cdF90b3AoKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy50b3AnKVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMuXzFib3JkZXIoJ3RjUHIudGNCb3JkZXJzLmJvdHRvbScpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBSb3dTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0X3JpZ2h0KGNvbmRpdGlvbnMsZWRnZXMpe1xyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykgfHwgZWRnZXMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdGVsc2VcclxuXHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMuaW5zaWRlVicpXHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfbGVmdChjb25kaXRpb25zLGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RDb2wnKSB8fCBlZGdlcy5pbmNsdWRlcygnZmlyc3RDb2wnKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdGVsc2VcclxuXHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMuaW5zaWRlVicpXHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDZWxsU3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cclxufVxyXG5cclxuY2xhc3MgQ29sU3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cdF90b3AoY29uZGl0aW9ucyxlZGdlcyl7XHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdFJvdycpIHx8IGVkZ2VzLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX3RvcCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRfYm90dG9tKGNvbmRpdGlvbnMsZWRnZXMpe1xyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdFJvdycpIHx8IGVkZ2VzLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdHJldHVybiBzdXBlci5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBCYW5kSFN0eWxlIGV4dGVuZHMgUm93U3R5bGV7XHJcblxyXG59XHJcbmNsYXNzIEJhbmRWU3R5bGUgZXh0ZW5kcyBDb2xTdHlsZXtcclxuXHJcbn1cclxuXHJcblxyXG5sZXQgdHlwZXM9e31cclxudHlwZXMuc2VDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5zd0NlbGw9Q2VsbFN0eWxlXHJcbnR5cGVzLm5lQ2VsbD1DZWxsU3R5bGVcclxudHlwZXMubndDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5sYXN0Q29sPUNvbFN0eWxlXHJcbnR5cGVzLmZpcnN0Q29sPUNvbFN0eWxlXHJcbnR5cGVzLmxhc3RSb3c9Um93U3R5bGVcclxudHlwZXMuZmlyc3RSb3c9Um93U3R5bGVcclxudHlwZXMuYmFuZDJIb3J6PUJhbmRIU3R5bGVcclxudHlwZXMuYmFuZDFIb3J6PUJhbmRIU3R5bGVcclxudHlwZXMuYmFuZDJWZXJ0PUJhbmRWU3R5bGVcclxudHlwZXMuYmFuZDFWZXJ0PUJhbmRWU3R5bGVcclxudHlwZXMucm93PVJvd1N0eWxlXHJcbnR5cGVzLmNlbGw9Q2VsbFN0eWxlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZVN0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxzdHlsZXMsYmFzZWRPbil7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0Oyh0aGlzLnJhdy5nZXQoJ3RibFN0eWxlUHInKXx8W10pLmZvckVhY2goYT0+e1xyXG5cdFx0XHRhPWdldGFibGUoYSlcclxuXHRcdFx0bGV0IHR5cGU9YS5nZXQoJyQudHlwZScpXHJcblx0XHRcdHRoaXNbdHlwZV09bmV3IHR5cGVzW3R5cGVdKGEpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0Qm9yZGVyKGNvbmRpdGlvbnMsIGVkZ2VzKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJpZ2h0OnRoaXMuX3JpZ2h0KC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0bGVmdDogdGhpcy5fbGVmdCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdHRvcDogdGhpcy5fdG9wKC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0Ym90dG9tOiB0aGlzLl9ib3R0b20oLi4uYXJndW1lbnRzKXx8e3N6OjB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCwgY29uZGl0aW9ucz1bXSl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kaXRpb24pPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kaXRpb25TdHlsZT10aGlzW2NvbmRpdGlvbl1cclxuXHRcdFx0aWYoY29uZGl0aW9uU3R5bGUpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRpdGlvblN0eWxlLmdldChwYXRoLGNvbmRpdGlvbnMpXHJcblx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0dmFsdWU9c3VwZXIuZ2V0KC4uLmFyZ3VtZW50cylcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdHByaW9yaXplKGNvbmRpdGlvbnMpe1xyXG5cdFx0Y29uZGl0aW9ucy5zb3J0KChhLGIpPT5QUklPUklaRUQuaW5kZXhPZihhKS1QUklPUklaRUQuaW5kZXhPZihiKSlcclxuXHRcdHJldHVybiBjb25kaXRpb25zXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAxLiBjb25kaXRpb25hbCBmb3JtYXR0aW5nXHJcblx0ICogMi4gdGFibGUudGNQclxyXG5cdCAqIDMuIHRhYmxlLnRyUHI9dGJsUHJFeFxyXG5cdCAqIDQuIHRhYmxlLnRibFByXHJcblx0ICovXHJcblx0X3JpZ2h0KGNvbmRpdGlvbnMsIGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57Ly8xLiBjb25kaXRpb25hbFxyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fcmlnaHQpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cdFx0bGV0IHByPW51bGxcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGNQcicpKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RDb2wnKSB8fCBlZGdlcy5pbmNsdWRlcygnbGFzdENvbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5yaWdodCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykgfHwgZWRnZXMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLnJpZ2h0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX3JpZ2h0KVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMsZWRnZXMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PnsvLzEuIGNvbmRpdGlvbmFsXHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9sZWZ0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cdFx0bGV0IHByPW51bGxcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGNQcicpKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX2xlZnQoLi4uYXJndW1lbnRzKS8vMi4gdGFibGUudGNQclxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHJFeCcpKSl7Ly8zLnRhYmxlLnRyUHJcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RDb2wnKSB8fCBlZGdlcy5pbmNsdWRlcygnZmlyc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMubGVmdCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpIHx8IGVkZ2VzLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMubGVmdCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9sZWZ0KVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X3RvcChjb25kaXRpb25zLGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl90b3ApXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl90b3AoLi4uYXJndW1lbnRzKS8vMi4gdGFibGUudGNQclxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHJFeCcpKSl7Ly8zLnRhYmxlLnRyUHJcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RSb3cnKSB8fCBlZGdlcy5pbmNsdWRlcygnZmlyc3RSb3cnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMudG9wJylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5pbnNpZGVIJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByJykpKXsvLzQuXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Um93JykgfHwgZWRnZXMuaW5jbHVkZXMoJ2ZpcnN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy50b3AnKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5pbnNpZGVIJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl90b3ApXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF9ib3R0b20oY29uZGl0aW9ucywgZWRnZXMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX2JvdHRvbSlcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl90b3AoLi4uYXJndW1lbnRzKS8vMi4gdGFibGUudGNQclxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHJFeCcpKSl7Ly8zLnRhYmxlLnRyUHJcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdFJvdycpIHx8IGVkZ2VzLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmJvdHRvbScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Um93JykgfHwgZWRnZXMuaW5jbHVkZXMoJ2xhc3RSb3cnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmJvdHRvbScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX2JvdHRvbSlcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxufVxyXG4iXX0=