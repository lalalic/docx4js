"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

var _xmlObject = require("../../../xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
	(0, _inherits3.default)(WithBorder, _Style);

	function WithBorder() {
		(0, _classCallCheck3.default)(this, WithBorder);
		return (0, _possibleConstructorReturn3.default)(this, (WithBorder.__proto__ || (0, _getPrototypeOf2.default)(WithBorder)).apply(this, arguments));
	}

	(0, _createClass3.default)(WithBorder, [{
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
	(0, _inherits3.default)(RowStyle, _WithBorder);

	function RowStyle() {
		(0, _classCallCheck3.default)(this, RowStyle);
		return (0, _possibleConstructorReturn3.default)(this, (RowStyle.__proto__ || (0, _getPrototypeOf2.default)(RowStyle)).apply(this, arguments));
	}

	(0, _createClass3.default)(RowStyle, [{
		key: "_right",
		value: function _right(conditions, edges) {
			var value = void 0;
			if (conditions.includes('lastCol') || edges.includes('lastCol')) value = (0, _get3.default)(RowStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions, edges) {
			var value = void 0;
			if (conditions.includes('firstCol') || edges.includes('firstCol')) value = (0, _get3.default)(RowStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}]);
	return RowStyle;
}(WithBorder);

var CellStyle = function (_WithBorder2) {
	(0, _inherits3.default)(CellStyle, _WithBorder2);

	function CellStyle() {
		(0, _classCallCheck3.default)(this, CellStyle);
		return (0, _possibleConstructorReturn3.default)(this, (CellStyle.__proto__ || (0, _getPrototypeOf2.default)(CellStyle)).apply(this, arguments));
	}

	return CellStyle;
}(WithBorder);

var ColStyle = function (_WithBorder3) {
	(0, _inherits3.default)(ColStyle, _WithBorder3);

	function ColStyle() {
		(0, _classCallCheck3.default)(this, ColStyle);
		return (0, _possibleConstructorReturn3.default)(this, (ColStyle.__proto__ || (0, _getPrototypeOf2.default)(ColStyle)).apply(this, arguments));
	}

	(0, _createClass3.default)(ColStyle, [{
		key: "_top",
		value: function _top(conditions, edges) {
			if (conditions.includes('firstRow') || edges.includes('firstRow')) return (0, _get3.default)(ColStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(ColStyle.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conditions, edges) {
			if (conditions.includes('lastRow') || edges.includes('lastRow')) return (0, _get3.default)(ColStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(ColStyle.prototype), "_bottom", this).apply(this, arguments);
		}
	}]);
	return ColStyle;
}(WithBorder);

var BandHStyle = function (_RowStyle) {
	(0, _inherits3.default)(BandHStyle, _RowStyle);

	function BandHStyle() {
		(0, _classCallCheck3.default)(this, BandHStyle);
		return (0, _possibleConstructorReturn3.default)(this, (BandHStyle.__proto__ || (0, _getPrototypeOf2.default)(BandHStyle)).apply(this, arguments));
	}

	return BandHStyle;
}(RowStyle);

var BandVStyle = function (_ColStyle) {
	(0, _inherits3.default)(BandVStyle, _ColStyle);

	function BandVStyle() {
		(0, _classCallCheck3.default)(this, BandVStyle);
		return (0, _possibleConstructorReturn3.default)(this, (BandVStyle.__proto__ || (0, _getPrototypeOf2.default)(BandVStyle)).apply(this, arguments));
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
	(0, _inherits3.default)(TableStyle, _WithBorder4);

	function TableStyle(style, styles, basedOn) {
		(0, _classCallCheck3.default)(this, TableStyle);

		var _this7 = (0, _possibleConstructorReturn3.default)(this, (TableStyle.__proto__ || (0, _getPrototypeOf2.default)(TableStyle)).apply(this, arguments));

		(_this7.raw.get('tblStylePr') || []).forEach(function (a) {
			a = (0, _xmlObject.getable)(a);
			var type = a.get('$.type');
			_this7[type] = new types[type](a);
		});
		return _this7;
	}

	(0, _createClass3.default)(TableStyle, [{
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

			if (value == undefined) value = (0, _get3.default)(TableStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableStyle.prototype), "get", this).apply(this, arguments);

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
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = (0, _get3.default)(TableStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableStyle.prototype), "_right", this).apply(this, arguments); //2. table.tcPr

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
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = (0, _get3.default)(TableStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableStyle.prototype), "_left", this).apply(this, arguments); //2. table.tcPr

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
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = (0, _get3.default)(TableStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

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
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = (0, _get3.default)(TableStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiUFJJT1JJWkVEIiwic3BsaXQiLCJXaXRoQm9yZGVyIiwidHlwZSIsInZhbHVlIiwicmF3IiwiZ2V0IiwidW5kZWZpbmVkIiwidmFsIiwic3oiLCJjb25kaXRpb25zIiwiXzFib3JkZXIiLCJSb3dTdHlsZSIsImVkZ2VzIiwiaW5jbHVkZXMiLCJhcmd1bWVudHMiLCJDZWxsU3R5bGUiLCJDb2xTdHlsZSIsIkJhbmRIU3R5bGUiLCJCYW5kVlN0eWxlIiwidHlwZXMiLCJzZUNlbGwiLCJzd0NlbGwiLCJuZUNlbGwiLCJud0NlbGwiLCJsYXN0Q29sIiwiZmlyc3RDb2wiLCJsYXN0Um93IiwiZmlyc3RSb3ciLCJiYW5kMkhvcnoiLCJiYW5kMUhvcnoiLCJiYW5kMlZlcnQiLCJiYW5kMVZlcnQiLCJyb3ciLCJjZWxsIiwiVGFibGVTdHlsZSIsInN0eWxlIiwic3R5bGVzIiwiYmFzZWRPbiIsImZvckVhY2giLCJhIiwicmlnaHQiLCJfcmlnaHQiLCJsZWZ0IiwiX2xlZnQiLCJ0b3AiLCJfdG9wIiwiYm90dG9tIiwiX2JvdHRvbSIsInBhdGgiLCJwcmlvcml6ZSIsInJlZHVjZSIsImZvdW5kIiwiY29uZGl0aW9uIiwiY29uZGl0aW9uU3R5bGUiLCJzb3J0IiwiYiIsImluZGV4T2YiLCJjb25kIiwiY29uZFN0eWxlIiwicHIiLCJnZXRCYXNlZE9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBR0E7Ozs7Ozs7Ozs7QUFVQSxJQUFJQSxZQUFVLHdHQUF3R0MsS0FBeEcsQ0FBOEcsR0FBOUcsQ0FBZDs7SUFFTUMsVTs7Ozs7Ozs7OzsyQkFFSUMsSSxFQUFLO0FBQ2IsT0FBSUMsUUFBTSxLQUFLQyxHQUFMLENBQVNDLEdBQVQsQ0FBYUgsSUFBYixFQUFrQixLQUFsQixDQUFWO0FBQ0EsT0FBR0MsU0FBT0cs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S0FBcUJxRCxLQUFHLEtBQUt2RCxHQUFMLENBQVNDLEdBQVQsQ0FBYSxNQUFiLENBQXhCLENBQUgsRUFDQ0YsNElBQW9CVyxTQUFwQixFQVp3QixDQVlNOztBQUUvQixPQUFHWCxTQUFPRyxTQUFQLEtBQXFCcUQsS0FBRyxLQUFLdkQsR0FBTCxDQUFTQyxHQUFULENBQWEsU0FBYixDQUF4QixDQUFILEVBQW9EO0FBQUM7QUFDcEQsUUFBR0ksV0FBV0ksUUFBWCxDQUFvQixTQUFwQixLQUFrQ0QsTUFBTUMsUUFBTixDQUFlLFNBQWYsQ0FBckMsRUFDQ1YsUUFBTSxLQUFLTyxRQUFMLENBQWMsMkJBQWQsQ0FBTixDQURELEtBR0NQLFFBQU0sS0FBS08sUUFBTCxDQUFjLDRCQUFkLENBQU47QUFDRDs7QUFFRCxPQUFHUCxTQUFPRyxTQUFQLEtBQXFCcUQsS0FBRyxLQUFLdkQsR0FBTCxDQUFTQyxHQUFULENBQWEsT0FBYixDQUF4QixDQUFILEVBQWtEO0FBQUM7QUFDbEQsUUFBR0ksV0FBV0ksUUFBWCxDQUFvQixTQUFwQixLQUFrQ0QsTUFBTUMsUUFBTixDQUFlLFNBQWYsQ0FBckMsRUFDQ1YsUUFBTSxLQUFLTyxRQUFMLENBQWMseUJBQWQsQ0FBTixDQURELEtBR0NQLFFBQU0sS0FBS08sUUFBTCxDQUFjLDBCQUFkLENBQU47QUFDRDs7QUFFRCxPQUFHUCxTQUFPRyxTQUFWLEVBQW9CO0FBQ25CLFFBQUkrQixVQUFRLEtBQUt1QixVQUFMLEVBQVo7QUFDQSxRQUFHdkIsV0FBV0EsUUFBUVUsT0FBdEIsRUFDQzVDLFFBQU1rQyxRQUFRVSxPQUFSLGdCQUFtQmpDLFNBQW5CLENBQU47QUFDRDs7QUFFRCxVQUFPWCxLQUFQO0FBQ0E7OztFQWhNc0NGLFU7O2tCQUFuQmlDLFUiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vYmFzZVwiXHJcblxyXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi8uLi94bWxPYmplY3RcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcclxuICogVGhlIGNvbmRpdGlvbmFsIGZvcm1hdHMgYXJlIGFwcGxpZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcclxuXHQ+V2hvbGUgdGFibGUvdGFibGVcclxuXHQ+QmFuZGVkIGNvbHVtbnMvYmFuZDFWZXJ0ICwgZXZlbiBjb2x1bW4gYmFuZGluZy9iYW5kMlZlcnRcclxuXHQ+QmFuZGVkIHJvd3MvYmFuZDFIb3J6ICwgZXZlbiByb3cgYmFuZGluZy9iYW5kMkhvcnpcclxuXHQ+Rmlyc3Qgcm93L2ZpcnN0Um93ICwgbGFzdCByb3cvbGFzdFJvd1xyXG5cdD5GaXJzdCBjb2x1bW4vZmlyc3RDb2wsIGxhc3QgY29sdW1uL2xhc3RDb2xcclxuXHQ+VG9wIGxlZnQvbndDZWxsLCB0b3AgcmlnaHQvbmVDZWxsLCBib3R0b20gbGVmdC9zd0NlbGwsIGJvdHRvbSByaWdodC9zZUNlbGxcclxuICovXHJcbmxldCBQUklPUklaRUQ9J3NlQ2VsbCxzd0NlbGwsbmVDZWxsLG53Q2VsbCxsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3csYmFuZDJIb3J6LGJhbmQxSG9yeixiYW5kMlZlcnQsYmFuZDFWZXJ0Jy5zcGxpdCgnLCcpXHJcblxyXG5jbGFzcyBXaXRoQm9yZGVyIGV4dGVuZHMgU3R5bGV7XHJcblxyXG5cdF8xYm9yZGVyKHR5cGUpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucmF3LmdldCh0eXBlLGZhbHNlKVxyXG5cdFx0aWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHZhbHVlLnZhbD09J25pbCcpXHJcblx0XHRcdFx0cmV0dXJuIHtzejowfVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMucmlnaHQnKVxyXG5cdH1cclxuXHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMubGVmdCcpXHJcblx0fVxyXG5cclxuXHRfdG9wKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMudG9wJylcclxuXHR9XHJcblxyXG5cdF9ib3R0b20oKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5ib3R0b20nKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUm93U3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cdF9yaWdodChjb25kaXRpb25zLGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdENvbCcpIHx8IGVkZ2VzLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RjUHIudGNCb3JkZXJzLmluc2lkZVYnKVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHJcblx0X2xlZnQoY29uZGl0aW9ucyxlZGdlcyl7XHJcblx0XHRsZXQgdmFsdWVcclxuXHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykgfHwgZWRnZXMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RjUHIudGNCb3JkZXJzLmluc2lkZVYnKVxyXG5cclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ2VsbFN0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHJcbn1cclxuXHJcbmNsYXNzIENvbFN0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHRfdG9wKGNvbmRpdGlvbnMsZWRnZXMpe1xyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RSb3cnKSB8fCBlZGdlcy5pbmNsdWRlcygnZmlyc3RSb3cnKSlcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbShjb25kaXRpb25zLGVkZ2VzKXtcclxuXHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RSb3cnKSB8fCBlZGdlcy5pbmNsdWRlcygnbGFzdFJvdycpKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgQmFuZEhTdHlsZSBleHRlbmRzIFJvd1N0eWxle1xyXG5cclxufVxyXG5jbGFzcyBCYW5kVlN0eWxlIGV4dGVuZHMgQ29sU3R5bGV7XHJcblxyXG59XHJcblxyXG5cclxubGV0IHR5cGVzPXt9XHJcbnR5cGVzLnNlQ2VsbD1DZWxsU3R5bGVcclxudHlwZXMuc3dDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5uZUNlbGw9Q2VsbFN0eWxlXHJcbnR5cGVzLm53Q2VsbD1DZWxsU3R5bGVcclxudHlwZXMubGFzdENvbD1Db2xTdHlsZVxyXG50eXBlcy5maXJzdENvbD1Db2xTdHlsZVxyXG50eXBlcy5sYXN0Um93PVJvd1N0eWxlXHJcbnR5cGVzLmZpcnN0Um93PVJvd1N0eWxlXHJcbnR5cGVzLmJhbmQySG9yej1CYW5kSFN0eWxlXHJcbnR5cGVzLmJhbmQxSG9yej1CYW5kSFN0eWxlXHJcbnR5cGVzLmJhbmQyVmVydD1CYW5kVlN0eWxlXHJcbnR5cGVzLmJhbmQxVmVydD1CYW5kVlN0eWxlXHJcbnR5cGVzLnJvdz1Sb3dTdHlsZVxyXG50eXBlcy5jZWxsPUNlbGxTdHlsZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsc3R5bGVzLGJhc2VkT24pe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdDsodGhpcy5yYXcuZ2V0KCd0YmxTdHlsZVByJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHR0aGlzW3R5cGVdPW5ldyB0eXBlc1t0eXBlXShhKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGdldEJvcmRlcihjb25kaXRpb25zLCBlZGdlcyl7XHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRyaWdodDp0aGlzLl9yaWdodCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdGxlZnQ6IHRoaXMuX2xlZnQoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHR0b3A6IHRoaXMuX3RvcCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdGJvdHRvbTogdGhpcy5fYm90dG9tKC4uLmFyZ3VtZW50cyl8fHtzejowfVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgsIGNvbmRpdGlvbnM9W10pe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZGl0aW9uKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZGl0aW9uU3R5bGU9dGhpc1tjb25kaXRpb25dXHJcblx0XHRcdGlmKGNvbmRpdGlvblN0eWxlKVxyXG5cdFx0XHRcdHJldHVybiBjb25kaXRpb25TdHlsZS5nZXQocGF0aCxjb25kaXRpb25zKVxyXG5cdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdHZhbHVlPXN1cGVyLmdldCguLi5hcmd1bWVudHMpXHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRwcmlvcml6ZShjb25kaXRpb25zKXtcclxuXHRcdGNvbmRpdGlvbnMuc29ydCgoYSxiKT0+UFJJT1JJWkVELmluZGV4T2YoYSktUFJJT1JJWkVELmluZGV4T2YoYikpXHJcblx0XHRyZXR1cm4gY29uZGl0aW9uc1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogMS4gY29uZGl0aW9uYWwgZm9ybWF0dGluZ1xyXG5cdCAqIDIuIHRhYmxlLnRjUHJcclxuXHQgKiAzLiB0YWJsZS50clByPXRibFByRXhcclxuXHQgKiA0LiB0YWJsZS50YmxQclxyXG5cdCAqL1xyXG5cdF9yaWdodChjb25kaXRpb25zLCBlZGdlcyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+ey8vMS4gY29uZGl0aW9uYWxcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX3JpZ2h0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpLy8yLiB0YWJsZS50Y1ByXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQckV4JykpKXsvLzMudGFibGUudHJQclxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykgfHwgZWRnZXMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMucmlnaHQnKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHInKSkpey8vNC5cclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdENvbCcpIHx8IGVkZ2VzLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5yaWdodCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfbGVmdChjb25kaXRpb25zLGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57Ly8xLiBjb25kaXRpb25hbFxyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fbGVmdClcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9sZWZ0KC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykgfHwgZWRnZXMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmxlZnQnKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHInKSkpey8vNC5cclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnZmlyc3RDb2wnKSB8fCBlZGdlcy5pbmNsdWRlcygnZmlyc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLmxlZnQnKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5pbnNpZGVWJylcclxuXHRcdH1cclxuXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF90b3AoY29uZGl0aW9ucyxlZGdlcyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fdG9wKVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3RvcCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRsZXQgcHI9bnVsbFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0Y1ByJykpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fdG9wKC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Um93JykgfHwgZWRnZXMuaW5jbHVkZXMoJ2ZpcnN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLnRvcCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdFJvdycpIHx8IGVkZ2VzLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMudG9wJylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fdG9wKVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX3RvcCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfYm90dG9tKGNvbmRpdGlvbnMsIGVkZ2VzKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9ib3R0b20pXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHJcblx0XHRsZXQgcHI9bnVsbFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0Y1ByJykpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fdG9wKC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RSb3cnKSB8fCBlZGdlcy5pbmNsdWRlcygnbGFzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5ib3R0b20nKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGJsUHInKSkpey8vNC5cclxuXHRcdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdFJvdycpIHx8IGVkZ2VzLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5ib3R0b20nKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5pbnNpZGVIJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9ib3R0b20pXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuIl19