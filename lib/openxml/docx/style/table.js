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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(WithBorder).apply(this, arguments));
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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RowStyle).apply(this, arguments));
	}

	_createClass(RowStyle, [{
		key: "_right",
		value: function _right(conditions) {
			var value = void 0;
			if (conditions.some(function (a) {
				return a == 'lastCol' || a == 'neCell' || a == 'seCell';
			})) value = _get(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var value = void 0;
			if (conditions.some(function (a) {
				return a == 'firstCol' || a == 'nwCell' || a == 'swCell';
			})) value = _get(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}]);

	return RowStyle;
}(WithBorder);

var CellStyle = function (_WithBorder2) {
	_inherits(CellStyle, _WithBorder2);

	function CellStyle() {
		_classCallCheck(this, CellStyle);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CellStyle).apply(this, arguments));
	}

	return CellStyle;
}(WithBorder);

var ColStyle = function (_WithBorder3) {
	_inherits(ColStyle, _WithBorder3);

	function ColStyle() {
		_classCallCheck(this, ColStyle);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(ColStyle).apply(this, arguments));
	}

	_createClass(ColStyle, [{
		key: "_top",
		value: function _top(conds) {
			if (conds.some(function (a) {
				return a == 'firstRow' || a == 'nwCell' || a == 'neCell';
			})) return _get(Object.getPrototypeOf(ColStyle.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conds) {
			if (conds.some(function (a) {
				return a == 'lastRow' || a == 'swCell' || a == 'seCell';
			})) return _get(Object.getPrototypeOf(ColStyle.prototype), "_bottom", this).apply(this, arguments);
		}
	}]);

	return ColStyle;
}(WithBorder);

var BandHStyle = function (_RowStyle) {
	_inherits(BandHStyle, _RowStyle);

	function BandHStyle() {
		_classCallCheck(this, BandHStyle);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BandHStyle).apply(this, arguments));
	}

	return BandHStyle;
}(RowStyle);

var BandVStyle = function (_ColStyle) {
	_inherits(BandVStyle, _ColStyle);

	function BandVStyle() {
		_classCallCheck(this, BandVStyle);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(BandVStyle).apply(this, arguments));
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

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(TableStyle).apply(this, arguments));

		(_this7.raw.get('tblStylePr') || []).forEach(function (a) {
			a = (0, _xmlObject.getable)(a);
			var type = a.get('$.type');
			_this7[type] = new types[type](a);
		});
		return _this7;
	}

	_createClass(TableStyle, [{
		key: "getBorder",
		value: function getBorder(conditions) {
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

			var conditions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			var value = this.priorize(conditions).reduce(function (found, condition) {
				if (found != undefined) return found;
				var conditionStyle = _this8[condition];
				if (conditionStyle) return conditionStyle.get(path, conditions);
				return found;
			}, undefined);

			if (value == undefined) value = _get(Object.getPrototypeOf(TableStyle.prototype), "get", this).apply(this, arguments);

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
		value: function _right(conditions) {
			var _this9 = this,
			    _arguments = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this9[cond];
				if (condStyle && condStyle._right) return condStyle._right.apply(condStyle, _arguments);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_right", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.some(function (a) {
					return a == 'lastCol' || a == 'neCell' || a == 'seCell';
				})) value = this._1border('tblPrEx.tblBorders.right');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.some(function (a) {
					return a == 'lastCol' || a == 'neCell' || a == 'seCell';
				})) value = this._1border('tblPr.tblBorders.right');else value = this._1border('tblPr.tblBorders.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._right) value = basedOn._right.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var _this10 = this,
			    _arguments2 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this10[cond];
				if (condStyle && condStyle._left) return condStyle._left.apply(condStyle, _arguments2);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_left", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.some(function (a) {
					return a == 'firstCol' || a == 'nwCell' || a == 'swCell';
				})) value = this._1border('tblPrEx.tblBorders.left');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.some(function (a) {
					return a == 'firstCol' || a == 'nwCell' || a == 'swCell';
				})) value = this._1border('tblPr.tblBorders.left');else value = this._1border('tblPr.tblBorders.insideV');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._left) value = basedOn._left.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_top",
		value: function _top(conditions) {
			var _this11 = this,
			    _arguments3 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this11[cond];
				if (condStyle && condStyle._top) return condStyle._top.apply(condStyle, _arguments3);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.some(function (a) {
					return a == 'firstRow' || a == 'nwCell' || a == 'neCell';
				})) value = this._1border('tblPrEx.tblBorders.top');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.some(function (a) {
					return a == 'firstRow' || a == 'nwCell' || a == 'neCell';
				})) value = this._1border('tblPr.tblBorders.top');else value = this._1border('tblPr.tblBorders.insideH');
			}

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._top) value = basedOn._top.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_bottom",
		value: function _bottom(conditions) {
			var _this12 = this,
			    _arguments4 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this12[cond];
				if (condStyle && condStyle._bottom) return condStyle._bottom.apply(condStyle, _arguments4);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.some(function (a) {
					return a == 'lastRow' || a == 'swCell' || a == 'seCell';
				})) value = this._1border('tblPrEx.tblBorders.bottom');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.some(function (a) {
					return a == 'lastRow' || a == 'swCell' || a == 'seCell';
				})) value = this._1border('tblPr.tblBorders.bottom');else value = this._1border('tblPr.tblBorders.insideH');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsSUFBSSxZQUFVLHdHQUF3RyxLQUF4RyxDQUE4RyxHQUE5RyxDQUFWOztJQUVFOzs7Ozs7Ozs7OzsyQkFFSSxNQUFLO0FBQ2IsT0FBSSxRQUFNLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBQWtCLEtBQWxCLENBQU4sQ0FEUztBQUViLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUcsTUFBTSxHQUFOLElBQVcsS0FBWCxFQUNGLE9BQU8sRUFBQyxJQUFHLENBQUgsRUFBUixDQUREO0FBRUEsV0FBTyxLQUFQLENBSG1CO0lBQXBCOztBQU1BLFVBQU8sU0FBUCxDQVJhOzs7O3lCQVdQLFlBQVc7QUFDakIsVUFBTyxLQUFLLFFBQUwsQ0FBYyxzQkFBZCxDQUFQLENBRGlCOzs7O3dCQUlaLFlBQVc7QUFDaEIsVUFBTyxLQUFLLFFBQUwsQ0FBYyxxQkFBZCxDQUFQLENBRGdCOzs7O3lCQUlYO0FBQ0wsVUFBTyxLQUFLLFFBQUwsQ0FBYyxvQkFBZCxDQUFQLENBREs7Ozs7NEJBSUc7QUFDUixVQUFPLEtBQUssUUFBTCxDQUFjLHVCQUFkLENBQVAsQ0FEUTs7OztRQXpCSjs7O0lBOEJBOzs7Ozs7Ozs7Ozt5QkFDRSxZQUFXO0FBQ2pCLE9BQUksY0FBSixDQURpQjtBQUVqQixPQUFHLFdBQVcsSUFBWCxDQUFnQjtXQUFHLEtBQUcsU0FBSCxJQUFnQixLQUFHLFFBQUgsSUFBZSxLQUFHLFFBQUg7SUFBbEMsQ0FBbkIsRUFDQyxtQ0FKRyxpREFJbUIsVUFBdEIsQ0FERCxLQUdDLFFBQU0sS0FBSyxRQUFMLENBQWMsd0JBQWQsQ0FBTixDQUhEOztBQUtBLFVBQU8sS0FBUCxDQVBpQjs7Ozt3QkFVWixZQUFXO0FBQ2hCLE9BQUksY0FBSixDQURn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O0VBQW1COztrQkFBbkIiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vYmFzZVwiXHJcblxyXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi8uLi94bWxPYmplY3RcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcclxuICogVGhlIGNvbmRpdGlvbmFsIGZvcm1hdHMgYXJlIGFwcGxpZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcclxuXHQ+V2hvbGUgdGFibGUvdGFibGVcclxuXHQ+QmFuZGVkIGNvbHVtbnMvYmFuZDFWZXJ0ICwgZXZlbiBjb2x1bW4gYmFuZGluZy9iYW5kMlZlcnRcclxuXHQ+QmFuZGVkIHJvd3MvYmFuZDFIb3J6ICwgZXZlbiByb3cgYmFuZGluZy9iYW5kMkhvcnpcclxuXHQ+Rmlyc3Qgcm93L2ZpcnN0Um93ICwgbGFzdCByb3cvbGFzdFJvd1xyXG5cdD5GaXJzdCBjb2x1bW4vZmlyc3RDb2wsIGxhc3QgY29sdW1uL2xhc3RDb2xcclxuXHQ+VG9wIGxlZnQvbndDZWxsLCB0b3AgcmlnaHQvbmVDZWxsLCBib3R0b20gbGVmdC9zd0NlbGwsIGJvdHRvbSByaWdodC9zZUNlbGxcclxuICovXHJcbmxldCBQUklPUklaRUQ9J3NlQ2VsbCxzd0NlbGwsbmVDZWxsLG53Q2VsbCxsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3csYmFuZDJIb3J6LGJhbmQxSG9yeixiYW5kMlZlcnQsYmFuZDFWZXJ0Jy5zcGxpdCgnLCcpXHJcblxyXG5jbGFzcyBXaXRoQm9yZGVyIGV4dGVuZHMgU3R5bGV7XHJcblxyXG5cdF8xYm9yZGVyKHR5cGUpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucmF3LmdldCh0eXBlLGZhbHNlKVxyXG5cdFx0aWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHZhbHVlLnZhbD09J25pbCcpXHJcblx0XHRcdFx0cmV0dXJuIHtzejowfVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMucmlnaHQnKVxyXG5cdH1cclxuXHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMubGVmdCcpXHJcblx0fVxyXG5cclxuXHRfdG9wKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMudG9wJylcclxuXHR9XHJcblxyXG5cdF9ib3R0b20oKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5ib3R0b20nKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUm93U3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0aWYoY29uZGl0aW9ucy5zb21lKGE9PmE9PSdsYXN0Q29sJyB8fCBhPT0nbmVDZWxsJyB8fCBhPT0nc2VDZWxsJykpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RjUHIudGNCb3JkZXJzLmluc2lkZVYnKVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWVcclxuXHRcdGlmKGNvbmRpdGlvbnMuc29tZShhPT5hPT0nZmlyc3RDb2wnfHxhPT0nbndDZWxsJ3x8YT09J3N3Q2VsbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5pbnNpZGVWJylcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENlbGxTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblxyXG59XHJcblxyXG5jbGFzcyBDb2xTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0X3RvcChjb25kcyl7XHJcblx0XHRpZihjb25kcy5zb21lKGE9PmE9PSdmaXJzdFJvdyd8fGE9PSdud0NlbGwnfHxhPT0nbmVDZWxsJykpXHJcblx0XHRcdHJldHVybiBzdXBlci5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblxyXG5cdF9ib3R0b20oY29uZHMpe1xyXG5cdFx0aWYoY29uZHMuc29tZShhPT5hPT0nbGFzdFJvdyd8fGE9PSdzd0NlbGwnfHxhPT0nc2VDZWxsJykpXHJcblx0XHRcdHJldHVybiBzdXBlci5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBCYW5kSFN0eWxlIGV4dGVuZHMgUm93U3R5bGV7XHJcblxyXG59XHJcbmNsYXNzIEJhbmRWU3R5bGUgZXh0ZW5kcyBDb2xTdHlsZXtcclxuXHJcbn1cclxuXHJcblxyXG5sZXQgdHlwZXM9e31cclxudHlwZXMuc2VDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5zd0NlbGw9Q2VsbFN0eWxlXHJcbnR5cGVzLm5lQ2VsbD1DZWxsU3R5bGVcclxudHlwZXMubndDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5sYXN0Q29sPUNvbFN0eWxlXHJcbnR5cGVzLmZpcnN0Q29sPUNvbFN0eWxlXHJcbnR5cGVzLmxhc3RSb3c9Um93U3R5bGVcclxudHlwZXMuZmlyc3RSb3c9Um93U3R5bGVcclxudHlwZXMuYmFuZDJIb3J6PUJhbmRIU3R5bGVcclxudHlwZXMuYmFuZDFIb3J6PUJhbmRIU3R5bGVcclxudHlwZXMuYmFuZDJWZXJ0PUJhbmRWU3R5bGVcclxudHlwZXMuYmFuZDFWZXJ0PUJhbmRWU3R5bGVcclxudHlwZXMucm93PVJvd1N0eWxlXHJcbnR5cGVzLmNlbGw9Q2VsbFN0eWxlXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZVN0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxzdHlsZXMsYmFzZWRPbil7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0Oyh0aGlzLnJhdy5nZXQoJ3RibFN0eWxlUHInKXx8W10pLmZvckVhY2goYT0+e1xyXG5cdFx0XHRhPWdldGFibGUoYSlcclxuXHRcdFx0bGV0IHR5cGU9YS5nZXQoJyQudHlwZScpXHJcblx0XHRcdHRoaXNbdHlwZV09bmV3IHR5cGVzW3R5cGVdKGEpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0Qm9yZGVyKGNvbmRpdGlvbnMpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmlnaHQ6dGhpcy5fcmlnaHQoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRsZWZ0OiB0aGlzLl9sZWZ0KC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0dG9wOiB0aGlzLl90b3AoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRib3R0b206IHRoaXMuX2JvdHRvbSguLi5hcmd1bWVudHMpfHx7c3o6MH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldChwYXRoLCBjb25kaXRpb25zPVtdKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmRpdGlvbik9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRpdGlvblN0eWxlPXRoaXNbY29uZGl0aW9uXVxyXG5cdFx0XHRpZihjb25kaXRpb25TdHlsZSlcclxuXHRcdFx0XHRyZXR1cm4gY29uZGl0aW9uU3R5bGUuZ2V0KHBhdGgsY29uZGl0aW9ucylcclxuXHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5nZXQoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0cHJpb3JpemUoY29uZGl0aW9ucyl7XHJcblx0XHRjb25kaXRpb25zLnNvcnQoKGEsYik9PlBSSU9SSVpFRC5pbmRleE9mKGEpLVBSSU9SSVpFRC5pbmRleE9mKGIpKVxyXG5cdFx0cmV0dXJuIGNvbmRpdGlvbnNcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIDEuIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmdcclxuXHQgKiAyLiB0YWJsZS50Y1ByXHJcblx0ICogMy4gdGFibGUudHJQcj10YmxQckV4XHJcblx0ICogNC4gdGFibGUudGJsUHJcclxuXHQgKi9cclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+ey8vMS4gY29uZGl0aW9uYWxcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX3JpZ2h0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpLy8yLiB0YWJsZS50Y1ByXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQckV4JykpKXsvLzMudGFibGUudHJQclxyXG5cdFx0XHRpZihjb25kaXRpb25zLnNvbWUoYT0+YT09J2xhc3RDb2wnIHx8IGE9PSduZUNlbGwnIHx8IGE9PSdzZUNlbGwnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMucmlnaHQnKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHInKSkpey8vNC5cclxuXHRcdFx0aWYoY29uZGl0aW9ucy5zb21lKGE9PmE9PSdsYXN0Q29sJyB8fCBhPT0nbmVDZWxsJyB8fCBhPT0nc2VDZWxsJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5yaWdodCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfbGVmdChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57Ly8xLiBjb25kaXRpb25hbFxyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fbGVmdClcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9sZWZ0KC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuc29tZShhPT5hPT0nZmlyc3RDb2wnfHxhPT0nbndDZWxsJ3x8YT09J3N3Q2VsbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5sZWZ0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5pbnNpZGVWJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByJykpKXsvLzQuXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuc29tZShhPT5hPT0nZmlyc3RDb2wnfHxhPT0nbndDZWxsJ3x8YT09J3N3Q2VsbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMubGVmdCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9sZWZ0KVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X3RvcChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl90b3ApXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl90b3AoLi4uYXJndW1lbnRzKS8vMi4gdGFibGUudGNQclxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHJFeCcpKSl7Ly8zLnRhYmxlLnRyUHJcclxuXHRcdFx0aWYoY29uZGl0aW9ucy5zb21lKGE9PmE9PSdmaXJzdFJvdyd8fGE9PSdud0NlbGwnfHxhPT0nbmVDZWxsJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLnRvcCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLnNvbWUoYT0+YT09J2ZpcnN0Um93J3x8YT09J253Q2VsbCd8fGE9PSduZUNlbGwnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLnRvcCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX3RvcClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbShjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9ib3R0b20pXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHJcblx0XHRsZXQgcHI9bnVsbFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0Y1ByJykpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fdG9wKC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuc29tZShhPT5hPT0nbGFzdFJvdyd8fGE9PSdzd0NlbGwnfHxhPT0nc2VDZWxsJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmJvdHRvbScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLnNvbWUoYT0+YT09J2xhc3RSb3cnfHxhPT0nc3dDZWxsJ3x8YT09J3NlQ2VsbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuYm90dG9tJylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fYm90dG9tKVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcbiJdfQ==