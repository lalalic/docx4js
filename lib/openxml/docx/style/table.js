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
			if (conditions.includes('lastCol')) value = _get(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var value = void 0;
			if (conditions.includes('firstCol')) value = _get(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('tcPr.tcBorders.insideV');

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
			if (conds.includes('firstRow')) return _get(Object.getPrototypeOf(ColStyle.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conds) {
			if (conds.includes('lastRow')) return _get(Object.getPrototypeOf(ColStyle.prototype), "_bottom", this).apply(this, arguments);
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
			var conditions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			var value = this.priorize(conditions).reduce(function (found, condition) {
				if (found != undefined) return found;
				var conditionStyle = conditionStyles[condition];
				if (conditionStyle) return conditionStyle.get(path, conditions);
				return found;
			}, undefined);

			if (value == undefined) {
				var _tcPr;

				if (this.tcPr && undefined == (value = (_tcPr = this.tcPr).get.apply(_tcPr, arguments))) {
					var _trPr;

					if (this.trPr && undefined == (value = (_trPr = this.trPr).get.apply(_trPr, arguments))) {
						var _tblPr;

						if (this.tblPr && undefined == (value = (_tblPr = this.tblPr).get.apply(_tblPr, arguments))) {
							return _get(Object.getPrototypeOf(TableStyle.prototype), "get", this).apply(this, arguments);
						}
					}
				}
			}

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
			var _this8 = this,
			    _arguments = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this8.conditions[cond];
				if (condStyle && condStyle._right) return condStyle._right.apply(condStyle, _arguments);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_right", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('lastCol')) value = this._1border('tblPrEx.tblBorders.right');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('lastCol')) value = this._1border('tblPr.tblBorders.right');else value = this._1border('tblPr.tblBorders.insideV');
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
			var _this9 = this,
			    _arguments2 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				//1. conditional
				if (found != undefined) return found;
				var condStyle = _this9.conditions[cond];
				if (condStyle && condStyle._left) return condStyle._left.apply(condStyle, _arguments2);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_left", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('firstCol')) value = this._1border('tblPrEx.tblBorders.left');else value = this._1border('tblPrEx.tblBorders.insideV');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('firstCol')) value = this._1border('tblPr.tblBorders.left');else value = this._1border('tblPr.tblBorders.insideV');
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
			var _this10 = this,
			    _arguments3 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this10.conditions[cond];
				if (condStyle && condStyle._top) return condStyle._top.apply(condStyle, _arguments3);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('firstRow')) value = this._1border('tblPrEx.tblBorders.top');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('firstRow')) value = this._1border('tblPr.tblBorders.top');else value = this._1border('tblPr.tblBorders.insideH');
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
			var _this11 = this,
			    _arguments4 = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this11.conditions[cond];
				if (condStyle && condStyle._bottom) return condStyle._bottom.apply(condStyle, _arguments4);
			}, undefined);

			var pr = null;
			if (value == undefined && (pr = this.raw.get('tcPr'))) value = _get(Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments); //2. table.tcPr

			if (value == undefined && (pr = this.raw.get('tblPrEx'))) {
				//3.table.trPr
				if (conditions.includes('lastRow')) value = this._1border('tblPrEx.tblBorders.bottom');else value = this._1border('tblPrEx.tblBorders.insideH');
			}

			if (value == undefined && (pr = this.raw.get('tblPr'))) {
				//4.
				if (conditions.includes('lastRow')) value = this._1border('tblPr.tblBorders.bottom');else value = this._1border('tblPr.tblBorders.insideH');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsSUFBSSxZQUFVLHdHQUF3RyxLQUF4RyxDQUE4RyxHQUE5RyxDQUFWOztJQUVFOzs7Ozs7Ozs7OzsyQkFFSSxNQUFLO0FBQ2IsT0FBSSxRQUFNLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxJQUFiLEVBQWtCLEtBQWxCLENBQU4sQ0FEUztBQUViLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUcsTUFBTSxHQUFOLElBQVcsS0FBWCxFQUNGLE9BQU8sRUFBQyxJQUFHLENBQUgsRUFBUixDQUREO0FBRUEsV0FBTyxLQUFQLENBSG1CO0lBQXBCOztBQU1BLFVBQU8sU0FBUCxDQVJhOzs7O3lCQVdQLFlBQVc7QUFDakIsVUFBTyxLQUFLLFFBQUwsQ0FBYyxzQkFBZCxDQUFQLENBRGlCOzs7O3dCQUlaLFlBQVc7QUFDaEIsVUFBTyxLQUFLLFFBQUwsQ0FBYyxxQkFBZCxDQUFQLENBRGdCOzs7O3lCQUlYO0FBQ0wsVUFBTyxLQUFLLFFBQUwsQ0FBYyxvQkFBZCxDQUFQLENBREs7Ozs7NEJBSUc7QUFDUixVQUFPLEtBQUssUUFBTCxDQUFjLHVCQUFkLENBQVAsQ0FEUTs7OztRQXpCSjs7O0lBOEJBOzs7Ozs7Ozs7Ozt5QkFDRSxZQUFXO0FBQ2pCLE9BQUksY0FBSixDQURpQjtBQUVqQixPQUFHLFdBQVcsUUFBWCxDQUFvQixTQUFwQixDQUFILEVBQ0MsbUNBSkcsaURBSW1CLFVBQXRCLENBREQsS0FHQyxRQUFNLEtBQUssUUFBTCxDQUFjLHdCQUFkLENBQU4sQ0FIRDs7QUFLQSxVQUFPLEtBQVAsQ0FQaUI7Ozs7d0JBVVosWUFBVztBQUNoQixPQUFJLGNBQUosQ0FEZ0I7QUFFaEIsT0FBRyxXQUFXLFFBQVgsQ0FBb0IsVUFBcEIsQ0FBSCxFQUNDLG1DQWRHLGlEQWNtQixVQUF0QixDQURELEtBR0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyx3QkFBZCxDQUFOLENBSEQ7O0FBS0EsVUFBTyxLQUFQLENBUGdCOzs7O1FBWFo7RUFBaUI7O0lBc0JqQjs7Ozs7Ozs7OztFQUFrQjs7SUFJbEI7Ozs7Ozs7Ozs7O3VCQUNBLE9BQU07QUFDVixPQUFHLE1BQU0sUUFBTixDQUFlLFVBQWYsQ0FBSCxFQUNDLGtDQUhHLCtDQUdrQixVQUFyQixDQUREOzs7OzBCQUlPLE9BQU07QUFDYixPQUFHLE1BQU0sUUFBTixDQUFlLFNBQWYsQ0FBSCxFQUNDLGtDQVJHLGtEQVFxQixVQUF4QixDQUREOzs7O1FBUEk7RUFBaUI7O0lBYWpCOzs7Ozs7Ozs7O0VBQW1COztJQUduQjs7Ozs7Ozs7OztFQUFtQjs7QUFLekIsSUFBSSxRQUFNLEVBQU47QUFDSixNQUFNLE1BQU4sR0FBYSxTQUFiO0FBQ0EsTUFBTSxNQUFOLEdBQWEsU0FBYjtBQUNBLE1BQU0sTUFBTixHQUFhLFNBQWI7QUFDQSxNQUFNLE1BQU4sR0FBYSxTQUFiO0FBQ0EsTUFBTSxPQUFOLEdBQWMsUUFBZDtBQUNBLE1BQU0sUUFBTixHQUFlLFFBQWY7QUFDQSxNQUFNLE9BQU4sR0FBYyxRQUFkO0FBQ0EsTUFBTSxRQUFOLEdBQWUsUUFBZjtBQUNBLE1BQU0sU0FBTixHQUFnQixVQUFoQjtBQUNBLE1BQU0sU0FBTixHQUFnQixVQUFoQjtBQUNBLE1BQU0sU0FBTixHQUFnQixVQUFoQjtBQUNBLE1BQU0sU0FBTixHQUFnQixVQUFoQjtBQUNBLE1BQU0sR0FBTixHQUFVLFFBQVY7QUFDQSxNQUFNLElBQU4sR0FBVyxTQUFYOztJQUVxQjs7O0FBQ3BCLFVBRG9CLFVBQ3BCLENBQVksS0FBWixFQUFrQixNQUFsQixFQUF5QixPQUF6QixFQUFpQzt3QkFEYixZQUNhOztzRUFEYix3QkFFVixZQUR1Qjs7QUFHL0IsR0FBQyxPQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsWUFBYixLQUE0QixFQUE1QixDQUFELENBQWlDLE9BQWpDLENBQXlDLGFBQUc7QUFDNUMsT0FBRSx3QkFBUSxDQUFSLENBQUYsQ0FENEM7QUFFNUMsT0FBSSxPQUFLLEVBQUUsR0FBRixDQUFNLFFBQU4sQ0FBTCxDQUZ3QztBQUc1QyxVQUFLLElBQUwsSUFBVyxJQUFJLE1BQU0sSUFBTixDQUFKLENBQWdCLENBQWhCLENBQVgsQ0FINEM7R0FBSCxDQUF6QyxDQUgrQjs7RUFBakM7O2NBRG9COzs0QkFXVixZQUFXO0FBQ3BCLFVBQU87QUFDTixXQUFNLEtBQUssTUFBTCxhQUFlLFNBQWYsS0FBMkIsRUFBQyxJQUFHLENBQUgsRUFBNUI7QUFDTixVQUFNLEtBQUssS0FBTCxhQUFjLFNBQWQsS0FBMEIsRUFBQyxJQUFHLENBQUgsRUFBM0I7QUFDTixTQUFLLEtBQUssSUFBTCxhQUFhLFNBQWIsS0FBeUIsRUFBQyxJQUFHLENBQUgsRUFBMUI7QUFDTCxZQUFRLEtBQUssT0FBTCxhQUFnQixTQUFoQixLQUE0QixFQUFDLElBQUcsQ0FBSCxFQUE3QjtJQUpULENBRG9COzs7O3NCQVNqQixNQUFvQjtPQUFkLG1FQUFXLGtCQUFHOztBQUN2QixPQUFJLFFBQU0sS0FBSyxRQUFMLENBQWMsVUFBZCxFQUEwQixNQUExQixDQUFpQyxVQUFDLEtBQUQsRUFBUSxTQUFSLEVBQW9CO0FBQzlELFFBQUcsU0FBTyxTQUFQLEVBQ0YsT0FBTyxLQUFQLENBREQ7QUFFQSxRQUFJLGlCQUFlLGdCQUFnQixTQUFoQixDQUFmLENBSDBEO0FBSTlELFFBQUcsY0FBSCxFQUNDLE9BQU8sZUFBZSxHQUFmLENBQW1CLElBQW5CLEVBQXdCLFVBQXhCLENBQVAsQ0FERDtBQUVBLFdBQU8sS0FBUCxDQU44RDtJQUFwQixFQU96QyxTQVBRLENBQU4sQ0FEbUI7O0FBVXZCLE9BQUcsU0FBTyxTQUFQLEVBQWlCOzs7QUFDbkIsUUFBRyxLQUFLLElBQUwsSUFBYSxjQUFZLFFBQU0sY0FBSyxJQUFMLEVBQVUsR0FBVixjQUFpQixTQUFqQixDQUFOLENBQVosRUFBK0M7OztBQUM5RCxTQUFHLEtBQUssSUFBTCxJQUFhLGNBQVksUUFBTSxjQUFLLElBQUwsRUFBVSxHQUFWLGNBQWlCLFNBQWpCLENBQU4sQ0FBWixFQUErQzs7O0FBQzlELFVBQUcsS0FBSyxLQUFMLElBQWMsY0FBWSxRQUFNLGVBQUssS0FBTCxFQUFXLEdBQVgsZUFBa0IsU0FBbEIsQ0FBTixDQUFaLEVBQWdEO0FBQ2hFLHlDQWxDZSxnREFrQ0ssVUFBcEIsQ0FEZ0U7T0FBakU7TUFERDtLQUREO0lBREQ7O0FBVUEsVUFBTyxLQUFQLENBcEJ1Qjs7OzsyQkF1QmYsWUFBVztBQUNuQixjQUFXLElBQVgsQ0FBZ0IsVUFBQyxDQUFELEVBQUcsQ0FBSDtXQUFPLFVBQVUsT0FBVixDQUFrQixDQUFsQixJQUFxQixVQUFVLE9BQVYsQ0FBa0IsQ0FBbEIsQ0FBckI7SUFBUCxDQUFoQixDQURtQjtBQUVuQixVQUFPLFVBQVAsQ0FGbUI7Ozs7Ozs7Ozs7Ozt5QkFXYixZQUFXOzs7O0FBQ2pCLE9BQUksUUFBTSxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLENBQWlDLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBZTs7QUFDekQsUUFBRyxTQUFPLFNBQVAsRUFDRixPQUFPLEtBQVAsQ0FERDtBQUVBLFFBQUksWUFBVSxPQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBVixDQUhxRDtBQUl6RCxRQUFHLGFBQWEsVUFBVSxNQUFWLEVBQ2YsT0FBTyxVQUFVLE1BQVYsNkJBQVAsQ0FERDtJQUowQyxFQU16QyxTQU5RLENBQU4sQ0FEYTs7QUFTakIsT0FBSSxLQUFHLElBQUgsQ0FUYTtBQVVqQixPQUFHLFNBQU8sU0FBUCxLQUFxQixLQUFHLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxNQUFiLENBQUgsQ0FBckIsRUFDRixtQ0FqRWtCLG1EQWlFSSxVQUF0QixDQUREOztBQVZpQixPQWFkLFNBQU8sU0FBUCxLQUFxQixLQUFHLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxTQUFiLENBQUgsQ0FBckIsRUFBaUQ7O0FBQ25ELFFBQUcsV0FBVyxRQUFYLENBQW9CLFNBQXBCLENBQUgsRUFDQyxRQUFNLEtBQUssUUFBTCxDQUFjLDBCQUFkLENBQU4sQ0FERCxLQUdDLFFBQU0sS0FBSyxRQUFMLENBQWMsNEJBQWQsQ0FBTixDQUhEO0lBREQ7O0FBT0EsT0FBRyxTQUFPLFNBQVAsS0FBcUIsS0FBRyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsT0FBYixDQUFILENBQXJCLEVBQStDOztBQUNqRCxRQUFHLFdBQVcsUUFBWCxDQUFvQixTQUFwQixDQUFILEVBQ0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyx3QkFBZCxDQUFOLENBREQsS0FHQyxRQUFNLEtBQUssUUFBTCxDQUFjLDBCQUFkLENBQU4sQ0FIRDtJQUREOztBQVFBLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUksVUFBUSxLQUFLLFVBQUwsRUFBUixDQURlO0FBRW5CLFFBQUcsV0FBVyxRQUFRLE1BQVIsRUFDYixRQUFNLFFBQVEsTUFBUixnQkFBa0IsU0FBbEIsQ0FBTixDQUREO0lBRkQ7O0FBTUEsVUFBTyxLQUFQLENBbENpQjs7Ozt3QkFxQ1osWUFBVzs7OztBQUNoQixPQUFJLFFBQU0sS0FBSyxRQUFMLENBQWMsVUFBZCxFQUEwQixNQUExQixDQUFpQyxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWU7O0FBQ3pELFFBQUcsU0FBTyxTQUFQLEVBQ0YsT0FBTyxLQUFQLENBREQ7QUFFQSxRQUFJLFlBQVUsT0FBSyxVQUFMLENBQWdCLElBQWhCLENBQVYsQ0FIcUQ7QUFJekQsUUFBRyxhQUFhLFVBQVUsS0FBVixFQUNmLE9BQU8sVUFBVSxLQUFWLDhCQUFQLENBREQ7SUFKMEMsRUFNekMsU0FOUSxDQUFOLENBRFk7O0FBU2hCLE9BQUksS0FBRyxJQUFILENBVFk7QUFVaEIsT0FBRyxTQUFPLFNBQVAsS0FBcUIsS0FBRyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsTUFBYixDQUFILENBQXJCLEVBQ0YsbUNBdEdrQixrREFzR0csVUFBckIsQ0FERDs7QUFWZ0IsT0FhYixTQUFPLFNBQVAsS0FBcUIsS0FBRyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsU0FBYixDQUFILENBQXJCLEVBQWlEOztBQUNuRCxRQUFHLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFILEVBQ0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyx5QkFBZCxDQUFOLENBREQsS0FHQyxRQUFNLEtBQUssUUFBTCxDQUFjLDRCQUFkLENBQU4sQ0FIRDtJQUREOztBQU9BLE9BQUcsU0FBTyxTQUFQLEtBQXFCLEtBQUcsS0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLE9BQWIsQ0FBSCxDQUFyQixFQUErQzs7QUFDakQsUUFBRyxXQUFXLFFBQVgsQ0FBb0IsVUFBcEIsQ0FBSCxFQUNDLFFBQU0sS0FBSyxRQUFMLENBQWMsdUJBQWQsQ0FBTixDQURELEtBR0MsUUFBTSxLQUFLLFFBQUwsQ0FBYywwQkFBZCxDQUFOLENBSEQ7SUFERDs7QUFRQSxPQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNuQixRQUFJLFVBQVEsS0FBSyxVQUFMLEVBQVIsQ0FEZTtBQUVuQixRQUFHLFdBQVcsUUFBUSxLQUFSLEVBQ2IsUUFBTSxRQUFRLEtBQVIsZ0JBQWlCLFNBQWpCLENBQU4sQ0FERDtJQUZEOztBQU1BLFVBQU8sS0FBUCxDQWxDZ0I7Ozs7dUJBcUNaLFlBQVc7Ozs7QUFDZixPQUFJLFFBQU0sS0FBSyxRQUFMLENBQWMsVUFBZCxFQUEwQixNQUExQixDQUFpQyxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWU7QUFDekQsUUFBRyxTQUFPLFNBQVAsRUFDRixPQUFPLEtBQVAsQ0FERDtBQUVBLFFBQUksWUFBVSxRQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsQ0FBVixDQUhxRDtBQUl6RCxRQUFHLGFBQWEsVUFBVSxJQUFWLEVBQ2YsT0FBTyxVQUFVLElBQVYsOEJBQVAsQ0FERDtJQUowQyxFQU16QyxTQU5RLENBQU4sQ0FEVzs7QUFTZixPQUFJLEtBQUcsSUFBSCxDQVRXO0FBVWYsT0FBRyxTQUFPLFNBQVAsS0FBcUIsS0FBRyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsTUFBYixDQUFILENBQXJCLEVBQ0YsbUNBM0lrQixpREEySUUsVUFBcEIsQ0FERDs7QUFWZSxPQWFaLFNBQU8sU0FBUCxLQUFxQixLQUFHLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxTQUFiLENBQUgsQ0FBckIsRUFBaUQ7O0FBQ25ELFFBQUcsV0FBVyxRQUFYLENBQW9CLFVBQXBCLENBQUgsRUFDQyxRQUFNLEtBQUssUUFBTCxDQUFjLHdCQUFkLENBQU4sQ0FERCxLQUdDLFFBQU0sS0FBSyxRQUFMLENBQWMsNEJBQWQsQ0FBTixDQUhEO0lBREQ7O0FBT0EsT0FBRyxTQUFPLFNBQVAsS0FBcUIsS0FBRyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsT0FBYixDQUFILENBQXJCLEVBQStDOztBQUNqRCxRQUFHLFdBQVcsUUFBWCxDQUFvQixVQUFwQixDQUFILEVBQ0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyxzQkFBZCxDQUFOLENBREQsS0FHQyxRQUFNLEtBQUssUUFBTCxDQUFjLDBCQUFkLENBQU4sQ0FIRDtJQUREOztBQU9BLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUksVUFBUSxLQUFLLFVBQUwsRUFBUixDQURlO0FBRW5CLFFBQUcsV0FBVyxRQUFRLElBQVIsRUFDYixRQUFNLFFBQVEsSUFBUixnQkFBZ0IsU0FBaEIsQ0FBTixDQUREO0lBRkQ7O0FBTUEsVUFBTyxLQUFQLENBakNlOzs7OzBCQW9DUixZQUFXOzs7O0FBQ2xCLE9BQUksUUFBTSxLQUFLLFFBQUwsQ0FBYyxVQUFkLEVBQTBCLE1BQTFCLENBQWlDLFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBZTtBQUN6RCxRQUFHLFNBQU8sU0FBUCxFQUNGLE9BQU8sS0FBUCxDQUREO0FBRUEsUUFBSSxZQUFVLFFBQUssVUFBTCxDQUFnQixJQUFoQixDQUFWLENBSHFEO0FBSXpELFFBQUcsYUFBYSxVQUFVLE9BQVYsRUFDZixPQUFPLFVBQVUsT0FBViw4QkFBUCxDQUREO0lBSjBDLEVBTXpDLFNBTlEsQ0FBTixDQURjOztBQVVsQixPQUFJLEtBQUcsSUFBSCxDQVZjO0FBV2xCLE9BQUcsU0FBTyxTQUFQLEtBQXFCLEtBQUcsS0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLE1BQWIsQ0FBSCxDQUFyQixFQUNGLG1DQWhMa0IsaURBZ0xFLFVBQXBCLENBREQ7O0FBWGtCLE9BY2YsU0FBTyxTQUFQLEtBQXFCLEtBQUcsS0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLFNBQWIsQ0FBSCxDQUFyQixFQUFpRDs7QUFDbkQsUUFBRyxXQUFXLFFBQVgsQ0FBb0IsU0FBcEIsQ0FBSCxFQUNDLFFBQU0sS0FBSyxRQUFMLENBQWMsMkJBQWQsQ0FBTixDQURELEtBR0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyw0QkFBZCxDQUFOLENBSEQ7SUFERDs7QUFPQSxPQUFHLFNBQU8sU0FBUCxLQUFxQixLQUFHLEtBQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxPQUFiLENBQUgsQ0FBckIsRUFBK0M7O0FBQ2pELFFBQUcsV0FBVyxRQUFYLENBQW9CLFNBQXBCLENBQUgsRUFDQyxRQUFNLEtBQUssUUFBTCxDQUFjLHlCQUFkLENBQU4sQ0FERCxLQUdDLFFBQU0sS0FBSyxRQUFMLENBQWMsMEJBQWQsQ0FBTixDQUhEO0lBREQ7O0FBT0EsT0FBRyxTQUFPLFNBQVAsRUFBaUI7QUFDbkIsUUFBSSxVQUFRLEtBQUssVUFBTCxFQUFSLENBRGU7QUFFbkIsUUFBRyxXQUFXLFFBQVEsT0FBUixFQUNiLFFBQU0sUUFBUSxPQUFSLGdCQUFtQixTQUFuQixDQUFOLENBREQ7SUFGRDs7QUFNQSxVQUFPLEtBQVAsQ0FsQ2tCOzs7O1FBcEtDO0VBQW1COztrQkFBbkIiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vYmFzZVwiXHJcblxyXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi8uLi94bWxPYmplY3RcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBjb25kaXRpb25hbCBmb3JtYXR0aW5nOiBodHRwOi8vb2ZmaWNlb3BlbnhtbC5jb20vV1BzdHlsZVRhYmxlU3R5bGVzQ29uZC5waHBcclxuICogVGhlIGNvbmRpdGlvbmFsIGZvcm1hdHMgYXJlIGFwcGxpZWQgaW4gdGhlIGZvbGxvd2luZyBvcmRlcjpcclxuXHQ+V2hvbGUgdGFibGUvdGFibGVcclxuXHQ+QmFuZGVkIGNvbHVtbnMvYmFuZDFWZXJ0ICwgZXZlbiBjb2x1bW4gYmFuZGluZy9iYW5kMlZlcnRcclxuXHQ+QmFuZGVkIHJvd3MvYmFuZDFIb3J6ICwgZXZlbiByb3cgYmFuZGluZy9iYW5kMkhvcnpcclxuXHQ+Rmlyc3Qgcm93L2ZpcnN0Um93ICwgbGFzdCByb3cvbGFzdFJvd1xyXG5cdD5GaXJzdCBjb2x1bW4vZmlyc3RDb2wsIGxhc3QgY29sdW1uL2xhc3RDb2xcclxuXHQ+VG9wIGxlZnQvbndDZWxsLCB0b3AgcmlnaHQvbmVDZWxsLCBib3R0b20gbGVmdC9zd0NlbGwsIGJvdHRvbSByaWdodC9zZUNlbGxcclxuICovXHJcbmxldCBQUklPUklaRUQ9J3NlQ2VsbCxzd0NlbGwsbmVDZWxsLG53Q2VsbCxsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3csYmFuZDJIb3J6LGJhbmQxSG9yeixiYW5kMlZlcnQsYmFuZDFWZXJ0Jy5zcGxpdCgnLCcpXHJcblxyXG5jbGFzcyBXaXRoQm9yZGVyIGV4dGVuZHMgU3R5bGV7XHJcblxyXG5cdF8xYm9yZGVyKHR5cGUpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucmF3LmdldCh0eXBlLGZhbHNlKVxyXG5cdFx0aWYodmFsdWUhPXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKHZhbHVlLnZhbD09J25pbCcpXHJcblx0XHRcdFx0cmV0dXJuIHtzejowfVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdW5kZWZpbmVkXHJcblx0fVxyXG5cclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMucmlnaHQnKVxyXG5cdH1cclxuXHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMubGVmdCcpXHJcblx0fVxyXG5cclxuXHRfdG9wKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fMWJvcmRlcigndGNQci50Y0JvcmRlcnMudG9wJylcclxuXHR9XHJcblxyXG5cdF9ib3R0b20oKXtcclxuXHRcdHJldHVybiB0aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5ib3R0b20nKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgUm93U3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cdF9yaWdodChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZVxyXG5cdFx0aWYoY29uZGl0aW9ucy5pbmNsdWRlcygnbGFzdENvbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5pbnNpZGVWJylcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlXHJcblx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0Y1ByLnRjQm9yZGVycy5pbnNpZGVWJylcclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENlbGxTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblxyXG59XHJcblxyXG5jbGFzcyBDb2xTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0X3RvcChjb25kcyl7XHJcblx0XHRpZihjb25kcy5pbmNsdWRlcygnZmlyc3RSb3cnKSlcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0X2JvdHRvbShjb25kcyl7XHJcblx0XHRpZihjb25kcy5pbmNsdWRlcygnbGFzdFJvdycpKVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG59XHJcblxyXG5cclxuY2xhc3MgQmFuZEhTdHlsZSBleHRlbmRzIFJvd1N0eWxle1xyXG5cclxufVxyXG5jbGFzcyBCYW5kVlN0eWxlIGV4dGVuZHMgQ29sU3R5bGV7XHJcblxyXG59XHJcblxyXG5cclxubGV0IHR5cGVzPXt9XHJcbnR5cGVzLnNlQ2VsbD1DZWxsU3R5bGVcclxudHlwZXMuc3dDZWxsPUNlbGxTdHlsZVxyXG50eXBlcy5uZUNlbGw9Q2VsbFN0eWxlXHJcbnR5cGVzLm53Q2VsbD1DZWxsU3R5bGVcclxudHlwZXMubGFzdENvbD1Db2xTdHlsZVxyXG50eXBlcy5maXJzdENvbD1Db2xTdHlsZVxyXG50eXBlcy5sYXN0Um93PVJvd1N0eWxlXHJcbnR5cGVzLmZpcnN0Um93PVJvd1N0eWxlXHJcbnR5cGVzLmJhbmQySG9yej1CYW5kSFN0eWxlXHJcbnR5cGVzLmJhbmQxSG9yej1CYW5kSFN0eWxlXHJcbnR5cGVzLmJhbmQyVmVydD1CYW5kVlN0eWxlXHJcbnR5cGVzLmJhbmQxVmVydD1CYW5kVlN0eWxlXHJcbnR5cGVzLnJvdz1Sb3dTdHlsZVxyXG50eXBlcy5jZWxsPUNlbGxTdHlsZVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsc3R5bGVzLGJhc2VkT24pe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cclxuXHRcdDsodGhpcy5yYXcuZ2V0KCd0YmxTdHlsZVByJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHR0aGlzW3R5cGVdPW5ldyB0eXBlc1t0eXBlXShhKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGdldEJvcmRlcihjb25kaXRpb25zKXtcclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHJpZ2h0OnRoaXMuX3JpZ2h0KC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0bGVmdDogdGhpcy5fbGVmdCguLi5hcmd1bWVudHMpfHx7c3o6MH0sXHJcblx0XHRcdHRvcDogdGhpcy5fdG9wKC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0Ym90dG9tOiB0aGlzLl9ib3R0b20oLi4uYXJndW1lbnRzKXx8e3N6OjB9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCwgY29uZGl0aW9ucz1bXSl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kaXRpb24pPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kaXRpb25TdHlsZT1jb25kaXRpb25TdHlsZXNbY29uZGl0aW9uXVxyXG5cdFx0XHRpZihjb25kaXRpb25TdHlsZSlcclxuXHRcdFx0XHRyZXR1cm4gY29uZGl0aW9uU3R5bGUuZ2V0KHBhdGgsY29uZGl0aW9ucylcclxuXHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYodGhpcy50Y1ByICYmIHVuZGVmaW5lZD09KHZhbHVlPXRoaXMudGNQci5nZXQoLi4uYXJndW1lbnRzKSkpe1xyXG5cdFx0XHRcdGlmKHRoaXMudHJQciAmJiB1bmRlZmluZWQ9PSh2YWx1ZT10aGlzLnRyUHIuZ2V0KC4uLmFyZ3VtZW50cykpKXtcclxuXHRcdFx0XHRcdGlmKHRoaXMudGJsUHIgJiYgdW5kZWZpbmVkPT0odmFsdWU9dGhpcy50YmxQci5nZXQoLi4uYXJndW1lbnRzKSkpe1xyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdHByaW9yaXplKGNvbmRpdGlvbnMpe1xyXG5cdFx0Y29uZGl0aW9ucy5zb3J0KChhLGIpPT5QUklPUklaRUQuaW5kZXhPZihhKS1QUklPUklaRUQuaW5kZXhPZihiKSlcclxuXHRcdHJldHVybiBjb25kaXRpb25zXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAxLiBjb25kaXRpb25hbCBmb3JtYXR0aW5nXHJcblx0ICogMi4gdGFibGUudGNQclxyXG5cdCAqIDMuIHRhYmxlLnRyUHI9dGJsUHJFeFxyXG5cdCAqIDQuIHRhYmxlLnRibFByXHJcblx0ICovXHJcblx0X3JpZ2h0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PnsvLzEuIGNvbmRpdGlvbmFsXHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX3JpZ2h0KVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cclxuXHRcdGxldCBwcj1udWxsXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RjUHInKSkpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpLy8yLiB0YWJsZS50Y1ByXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQckV4JykpKXsvLzMudGFibGUudHJQclxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLnJpZ2h0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5pbnNpZGVWJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByJykpKXsvLzQuXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQci50YmxCb3JkZXJzLnJpZ2h0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX3JpZ2h0KVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PnsvLzEuIGNvbmRpdGlvbmFsXHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX2xlZnQpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRsZXQgcHI9bnVsbFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0Y1ByJykpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fbGVmdCguLi5hcmd1bWVudHMpLy8yLiB0YWJsZS50Y1ByXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQckV4JykpKXsvLzMudGFibGUudHJQclxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdENvbCcpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5sZWZ0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByRXgudGJsQm9yZGVycy5pbnNpZGVWJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByJykpKXsvLzQuXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5sZWZ0JylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlVicpXHJcblx0XHR9XHJcblxyXG5cclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX2xlZnQpXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfdG9wKGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzLmNvbmRpdGlvbnNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fdG9wKVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX3RvcCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblx0XHRsZXQgcHI9bnVsbFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0Y1ByJykpKVxyXG5cdFx0XHR2YWx1ZT1zdXBlci5fdG9wKC4uLmFyZ3VtZW50cykvLzIuIHRhYmxlLnRjUHJcclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChwcj10aGlzLnJhdy5nZXQoJ3RibFByRXgnKSkpey8vMy50YWJsZS50clByXHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLnRvcCcpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMudG9wJylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ3RibFByLnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fdG9wKVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX3RvcCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRfYm90dG9tKGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHZhbHVlPXRoaXMucHJpb3JpemUoY29uZGl0aW9ucykucmVkdWNlKChmb3VuZCwgY29uZCk9PntcclxuXHRcdFx0aWYoZm91bmQhPXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gZm91bmRcclxuXHRcdFx0bGV0IGNvbmRTdHlsZT10aGlzLmNvbmRpdGlvbnNbY29uZF1cclxuXHRcdFx0aWYoY29uZFN0eWxlICYmIGNvbmRTdHlsZS5fYm90dG9tKVxyXG5cdFx0XHRcdHJldHVybiBjb25kU3R5bGUuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHJcblxyXG5cdFx0bGV0IHByPW51bGxcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQgJiYgKHByPXRoaXMucmF3LmdldCgndGNQcicpKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX3RvcCguLi5hcmd1bWVudHMpLy8yLiB0YWJsZS50Y1ByXHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQckV4JykpKXsvLzMudGFibGUudHJQclxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHJFeC50YmxCb3JkZXJzLmJvdHRvbScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCd0YmxQckV4LnRibEJvcmRlcnMuaW5zaWRlSCcpXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCAmJiAocHI9dGhpcy5yYXcuZ2V0KCd0YmxQcicpKSl7Ly80LlxyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5ib3R0b20nKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcigndGJsUHIudGJsQm9yZGVycy5pbnNpZGVIJylcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9ib3R0b20pXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuIl19