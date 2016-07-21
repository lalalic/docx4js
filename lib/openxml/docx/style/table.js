"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
		key: "_get",
		value: function _get(path) {
			return this.raw.get(path);
		}
	}, {
		key: "_1border",
		value: function _1border(type) {
			var value = this._get(type);
			if (value != undefined) {
				if (value.val == 'nil') return { sz: 0 };
				return value;
			}
		}
	}, {
		key: "_right",
		value: function _right(conditions) {
			var v = this._1border('border.right');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._right) return basedOn._right.apply(basedOn, arguments);
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var v = this._1border('border.left');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._left) return basedOn._left.apply(basedOn, arguments);
		}
	}, {
		key: "_top",
		value: function _top() {
			var v = this._1border('border.top');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._top) return basedOn._top.apply(basedOn, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom() {
			var v = this._1border('border.bottom');
			if (v != undefined) return v;
			var basedOn = this.getBasedOn();
			if (basedOn && basedOn._bottom) return basedOn._bottom.apply(basedOn, arguments);
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
			if (conditions.includes('lastCol')) value = _get2(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._right) value = basedOn._right.apply(basedOn, arguments);
			}

			return value;
		}
	}, {
		key: "_left",
		value: function _left(conditions) {
			var value = void 0;
			if (conditions.includes('firstCol')) value = _get2(Object.getPrototypeOf(RowStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');

			if (value == undefined) {
				var basedOn = this.getBasedOn();
				if (basedOn && basedOn._left) value = basedOn._left.apply(basedOn, arguments);
			}

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
			if (conds.includes('firstRow')) return _get2(Object.getPrototypeOf(ColStyle.prototype), "_top", this).apply(this, arguments);
		}
	}, {
		key: "_bottom",
		value: function _bottom(conds) {
			if (conds.includes('lastRow')) return _get2(Object.getPrototypeOf(ColStyle.prototype), "_bottom", this).apply(this, arguments);
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

var TableStyle = function (_WithBorder4) {
	_inherits(TableStyle, _WithBorder4);

	function TableStyle() {
		_classCallCheck(this, TableStyle);

		var _this7 = _possibleConstructorReturn(this, Object.getPrototypeOf(TableStyle).apply(this, arguments));

		_this7.conditions = {};(_this7.raw.get('tblStylePr') || []).forEach(function (a) {
			a = (0, _xmlObject.getable)(a);
			var type = a.get('$.type');
			_this7.conditions[type] = new TableStyle[type](a);
		});
		return _this7;
	}

	_createClass(TableStyle, [{
		key: "get",
		value: function get(path) {
			var conditions = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

			var conditionStyles = this.conditions;
			var value = this.priorize(conditions).reduce(function (found, condition) {
				if (found != undefined) return found;
				if (conditionStyles) {
					var conditionStyle = conditionStyles[condition];
					if (conditionStyle) return conditionStyle.get(path);
				}
				return found;
			}, undefined);

			if (value == undefined) return _get2(Object.getPrototypeOf(TableStyle.prototype), "get", this).apply(this, arguments);else return value;
		}
	}, {
		key: "priorize",
		value: function priorize(conditions) {
			conditions.sort(function (a, b) {
				return PRIORIZED.indexOf(a) - PRIORIZED.indexOf(b);
			});
			return conditions;
		}
	}, {
		key: "_right",
		value: function _right(conditions) {
			var _this8 = this,
			    _arguments = arguments;

			var value = this.priorize(conditions).reduce(function (found, cond) {
				if (found != undefined) return found;
				var condStyle = _this8.conditions[cond];
				if (condStyle && condStyle._right) return condStyle._right.apply(condStyle, _arguments);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('lastCol')) value = _get2(Object.getPrototypeOf(TableStyle.prototype), "_right", this).apply(this, arguments);else value = this._1border('border.insideV');
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
				if (found != undefined) return found;
				var condStyle = _this9.conditions[cond];
				if (condStyle && condStyle._left) return condStyle._left.apply(condStyle, _arguments2);
			}, undefined);

			if (value == undefined) {
				if (conditions.includes('firstCol')) value = _get2(Object.getPrototypeOf(TableStyle.prototype), "_left", this).apply(this, arguments);else value = this._1border('border.insideV');
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

			if (value == undefined) {
				if (conditions.includes('firstRow')) value = _get2(Object.getPrototypeOf(TableStyle.prototype), "_top", this).apply(this, arguments);else value = this._1border('border.insideH');
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

			if (value == undefined) {
				if (conditions.includes('lastRow')) value = _get2(Object.getPrototypeOf(TableStyle.prototype), "_bottom", this).apply(this, arguments);else value = this._1border('border.insideH');
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

TableStyle.seCell = CellStyle;
TableStyle.swCell = CellStyle;
TableStyle.neCell = CellStyle;
TableStyle.nwCell = CellStyle;
TableStyle.lastCol = ColStyle;
TableStyle.firstCol = ColStyle;
TableStyle.lastRow = RowStyle;
TableStyle.firstRow = RowStyle;
TableStyle.band2Horz = BandHStyle;
TableStyle.band1Horz = BandHStyle;
TableStyle.band2Vert = BandVStyle;
TableStyle.band1Vert = BandVStyle;
exports.default = TableStyle;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBYUEsSUFBSSxZQUFVLHdHQUF3RyxLQUF4RyxDQUE4RyxHQUE5RyxDQUFWOztJQUVFOzs7Ozs7Ozs7Ozs0QkFDSyxZQUFXO0FBQ3BCLFVBQU87QUFDTixXQUFNLEtBQUssTUFBTCxhQUFlLFNBQWYsS0FBMkIsRUFBQyxJQUFHLENBQUgsRUFBNUI7QUFDTixVQUFNLEtBQUssS0FBTCxhQUFjLFNBQWQsS0FBMEIsRUFBQyxJQUFHLENBQUgsRUFBM0I7QUFDTixTQUFLLEtBQUssSUFBTCxhQUFhLFNBQWIsS0FBeUIsRUFBQyxJQUFHLENBQUgsRUFBMUI7QUFDTCxZQUFRLEtBQUssT0FBTCxhQUFnQixTQUFoQixLQUE0QixFQUFDLElBQUcsQ0FBSCxFQUE3QjtJQUpULENBRG9COzs7O3VCQVFoQixNQUFLO0FBQ1QsVUFBTyxLQUFLLEdBQUwsQ0FBUyxHQUFULENBQWEsSUFBYixDQUFQLENBRFM7Ozs7MkJBSUQsTUFBSztBQUNiLE9BQUksUUFBTSxLQUFLLElBQUwsQ0FBVSxJQUFWLENBQU4sQ0FEUztBQUViLE9BQUcsU0FBTyxTQUFQLEVBQWlCO0FBQ25CLFFBQUcsTUFBTSxHQUFOLElBQVcsS0FBWCxFQUNGLE9BQU8sRUFBQyxJQUFHLENBQUgsRUFBUixDQUREO0FBRUEsV0FBTyxLQUFQLENBSG1CO0lBQXBCOzs7O3lCQU9NLFlBQVc7QUFDakIsT0FBSSxJQUFFLEtBQUssUUFBTCxDQUFjLGNBQWQsQ0FBRixDQURhO0FBRWpCLE9BQUcsS0FBRyxTQUFILEVBQ0YsT0FBTyxDQUFQLENBREQ7QUFFQSxPQUFJLFVBQVEsS0FBSyxVQUFMLEVBQVIsQ0FKYTtBQUtqQixPQUFHLFdBQVcsUUFBUSxNQUFSLEVBQ2IsT0FBTyxRQUFRLE1BQVIsZ0JBQWtCLFNBQWxCLENB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RUFDQyxvQ0EzSGlCLG9EQTJITSxVQUF2QixDQURELEtBR0MsUUFBTSxLQUFLLFFBQUwsQ0FBYyxnQkFBZCxDQUFOLENBSEQ7SUFERDs7QUFPQSxPQUFHLFNBQU8sU0FBUCxFQUFpQjtBQUNuQixRQUFJLFVBQVEsS0FBSyxVQUFMLEVBQVIsQ0FEZTtBQUVuQixRQUFHLFdBQVcsUUFBUSxPQUFSLEVBQ2IsUUFBTSxRQUFRLE9BQVIsZ0JBQW1CLFNBQW5CLENBQU4sQ0FERDtJQUZEOztBQU1BLFVBQU8sS0FBUCxDQXZCa0I7Ozs7UUEvR0M7RUFBbUI7O0FBQW5CLFdBeUliLFNBQU87QUF6SU0sV0EwSWIsU0FBTztBQTFJTSxXQTJJYixTQUFPO0FBM0lNLFdBNEliLFNBQU87QUE1SU0sV0E2SWIsVUFBUTtBQTdJSyxXQThJYixXQUFTO0FBOUlJLFdBK0liLFVBQVE7QUEvSUssV0FnSmIsV0FBUztBQWhKSSxXQWlKYixZQUFVO0FBakpHLFdBa0piLFlBQVU7QUFsSkcsV0FtSmIsWUFBVTtBQW5KRyxXQW9KYixZQUFVO2tCQXBKRyIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9iYXNlXCJcclxuXHJcbmltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4uLy4uLy4uL3htbE9iamVjdFwiXHJcblxyXG5cclxuLyoqXHJcbiAqIGNvbmRpdGlvbmFsIGZvcm1hdHRpbmc6IGh0dHA6Ly9vZmZpY2VvcGVueG1sLmNvbS9XUHN0eWxlVGFibGVTdHlsZXNDb25kLnBocFxyXG4gKiBUaGUgY29uZGl0aW9uYWwgZm9ybWF0cyBhcmUgYXBwbGllZCBpbiB0aGUgZm9sbG93aW5nIG9yZGVyOlxyXG5cdD5XaG9sZSB0YWJsZS90YWJsZVxyXG5cdD5CYW5kZWQgY29sdW1ucy9iYW5kMVZlcnQgLCBldmVuIGNvbHVtbiBiYW5kaW5nL2JhbmQyVmVydCBcclxuXHQ+QmFuZGVkIHJvd3MvYmFuZDFIb3J6ICwgZXZlbiByb3cgYmFuZGluZy9iYW5kMkhvcnpcclxuXHQ+Rmlyc3Qgcm93L2ZpcnN0Um93ICwgbGFzdCByb3cvbGFzdFJvd1xyXG5cdD5GaXJzdCBjb2x1bW4vZmlyc3RDb2wsIGxhc3QgY29sdW1uL2xhc3RDb2xcclxuXHQ+VG9wIGxlZnQvbndDZWxsLCB0b3AgcmlnaHQvbmVDZWxsLCBib3R0b20gbGVmdC9zd0NlbGwsIGJvdHRvbSByaWdodC9zZUNlbGxcclxuICovXHJcbmxldCBQUklPUklaRUQ9J3NlQ2VsbCxzd0NlbGwsbmVDZWxsLG53Q2VsbCxsYXN0Q29sLGZpcnN0Q29sLGxhc3RSb3csZmlyc3RSb3csYmFuZDJIb3J6LGJhbmQxSG9yeixiYW5kMlZlcnQsYmFuZDFWZXJ0Jy5zcGxpdCgnLCcpXHJcblxyXG5jbGFzcyBXaXRoQm9yZGVyIGV4dGVuZHMgU3R5bGV7XHJcblx0Z2V0Qm9yZGVyKGNvbmRpdGlvbnMpe1xyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0cmlnaHQ6dGhpcy5fcmlnaHQoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRsZWZ0OiB0aGlzLl9sZWZ0KC4uLmFyZ3VtZW50cyl8fHtzejowfSxcclxuXHRcdFx0dG9wOiB0aGlzLl90b3AoLi4uYXJndW1lbnRzKXx8e3N6OjB9LFxyXG5cdFx0XHRib3R0b206IHRoaXMuX2JvdHRvbSguLi5hcmd1bWVudHMpfHx7c3o6MH1cclxuXHRcdH1cclxuXHR9XHJcblx0X2dldChwYXRoKXtcclxuXHRcdHJldHVybiB0aGlzLnJhdy5nZXQocGF0aClcclxuXHR9XHJcblx0XHJcblx0XzFib3JkZXIodHlwZSl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5fZ2V0KHR5cGUpXHJcblx0XHRpZih2YWx1ZSE9dW5kZWZpbmVkKXtcclxuXHRcdFx0aWYodmFsdWUudmFsPT0nbmlsJylcclxuXHRcdFx0XHRyZXR1cm4ge3N6OjB9XHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdj10aGlzLl8xYm9yZGVyKCdib3JkZXIucmlnaHQnKVxyXG5cdFx0aWYodiE9dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gdlxyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fcmlnaHQpXHJcblx0XHRcdHJldHVybiBiYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdF9sZWZ0KGNvbmRpdGlvbnMpe1xyXG5cdFx0bGV0IHY9dGhpcy5fMWJvcmRlcignYm9yZGVyLmxlZnQnKVxyXG5cdFx0aWYodiE9dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gdlxyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRcclxuXHRfdG9wKCl7XHJcblx0XHRsZXQgdj10aGlzLl8xYm9yZGVyKCdib3JkZXIudG9wJylcclxuXHRcdGlmKHYhPXVuZGVmaW5lZClcclxuXHRcdFx0cmV0dXJuIHZcclxuXHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX3RvcClcclxuXHRcdFx0cmV0dXJuIGJhc2VkT24uX3RvcCguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdF9ib3R0b20oKXtcclxuXHRcdGxldCB2PXRoaXMuXzFib3JkZXIoJ2JvcmRlci5ib3R0b20nKVxyXG5cdFx0aWYodiE9dW5kZWZpbmVkKVxyXG5cdFx0XHRyZXR1cm4gdlxyXG5cdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fYm90dG9tKVxyXG5cdFx0XHRyZXR1cm4gYmFzZWRPbi5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFJvd1N0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWVcclxuXHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0dmFsdWU9c3VwZXIuX3JpZ2h0KC4uLmFyZ3VtZW50cylcclxuXHRcdGVsc2VcclxuXHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZVYnKVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0XHRcclxuXHR9XHJcblx0XHJcblx0X2xlZnQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWVcclxuXHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykpXHJcblx0XHRcdHZhbHVlPXN1cGVyLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHZhbHVlPXRoaXMuXzFib3JkZXIoJ2JvcmRlci5pbnNpZGVWJylcclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGxldCBiYXNlZE9uPXRoaXMuZ2V0QmFzZWRPbigpXHJcblx0XHRcdGlmKGJhc2VkT24gJiYgYmFzZWRPbi5fbGVmdClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9sZWZ0KC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDZWxsU3R5bGUgZXh0ZW5kcyBXaXRoQm9yZGVye1xyXG5cdFxyXG59XHJcblxyXG5jbGFzcyBDb2xTdHlsZSBleHRlbmRzIFdpdGhCb3JkZXJ7XHJcblx0X3RvcChjb25kcyl7XHJcblx0XHRpZihjb25kcy5pbmNsdWRlcygnZmlyc3RSb3cnKSlcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRcclxuXHRfYm90dG9tKGNvbmRzKXtcclxuXHRcdGlmKGNvbmRzLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdHJldHVybiBzdXBlci5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcblxyXG5jbGFzcyBCYW5kSFN0eWxlIGV4dGVuZHMgUm93U3R5bGV7XHJcblx0XHJcbn1cclxuY2xhc3MgQmFuZFZTdHlsZSBleHRlbmRzIENvbFN0eWxle1xyXG5cdFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZVN0eWxlIGV4dGVuZHMgV2l0aEJvcmRlcntcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy5jb25kaXRpb25zPXt9XHJcblx0XHRcclxuXHRcdDsodGhpcy5yYXcuZ2V0KCd0YmxTdHlsZVByJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHR0aGlzLmNvbmRpdGlvbnNbdHlwZV09bmV3IFRhYmxlU3R5bGVbdHlwZV0oYSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdGdldChwYXRoLCBjb25kaXRpb25zPVtdKXtcclxuXHRcdGxldCBjb25kaXRpb25TdHlsZXM9dGhpcy5jb25kaXRpb25zXHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kaXRpb24pPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGlmKGNvbmRpdGlvblN0eWxlcyl7XHJcblx0XHRcdFx0bGV0IGNvbmRpdGlvblN0eWxlPWNvbmRpdGlvblN0eWxlc1tjb25kaXRpb25dXHJcblx0XHRcdFx0aWYoY29uZGl0aW9uU3R5bGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gY29uZGl0aW9uU3R5bGUuZ2V0KHBhdGgpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0cmV0dXJuIHN1cGVyLmdldCguLi5hcmd1bWVudHMpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHRcclxuXHRwcmlvcml6ZShjb25kaXRpb25zKXtcclxuXHRcdGNvbmRpdGlvbnMuc29ydCgoYSxiKT0+UFJJT1JJWkVELmluZGV4T2YoYSktUFJJT1JJWkVELmluZGV4T2YoYikpXHJcblx0XHRyZXR1cm4gY29uZGl0aW9uc1xyXG5cdH1cclxuXHRcclxuXHRfcmlnaHQoY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXMuY29uZGl0aW9uc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9yaWdodClcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2xhc3RDb2wnKSlcclxuXHRcdFx0XHR2YWx1ZT1zdXBlci5fcmlnaHQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9yaWdodClcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9yaWdodCguLi5hcmd1bWVudHMpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB2YWx1ZVxyXG5cdH1cclxuXHRcclxuXHRfbGVmdChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX2xlZnQpXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fbGVmdCguLi5hcmd1bWVudHMpXHJcblx0XHR9LHVuZGVmaW5lZClcclxuXHRcdFxyXG5cdFx0aWYodmFsdWU9PXVuZGVmaW5lZCl7XHJcblx0XHRcdGlmKGNvbmRpdGlvbnMuaW5jbHVkZXMoJ2ZpcnN0Q29sJykpXHJcblx0XHRcdFx0dmFsdWU9c3VwZXIuX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZVYnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl9sZWZ0KVxyXG5cdFx0XHRcdHZhbHVlPWJhc2VkT24uX2xlZnQoLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblx0XHJcblx0X3RvcChjb25kaXRpb25zKXtcclxuXHRcdGxldCB2YWx1ZT10aGlzLnByaW9yaXplKGNvbmRpdGlvbnMpLnJlZHVjZSgoZm91bmQsIGNvbmQpPT57XHJcblx0XHRcdGlmKGZvdW5kIT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIGZvdW5kXHJcblx0XHRcdGxldCBjb25kU3R5bGU9dGhpcy5jb25kaXRpb25zW2NvbmRdXHJcblx0XHRcdGlmKGNvbmRTdHlsZSAmJiBjb25kU3R5bGUuX3RvcClcclxuXHRcdFx0XHRyZXR1cm4gY29uZFN0eWxlLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdFx0fSx1bmRlZmluZWQpXHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdmaXJzdFJvdycpKVxyXG5cdFx0XHRcdHZhbHVlPXN1cGVyLl90b3AoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0dmFsdWU9dGhpcy5fMWJvcmRlcignYm9yZGVyLmluc2lkZUgnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKXtcclxuXHRcdFx0bGV0IGJhc2VkT249dGhpcy5nZXRCYXNlZE9uKClcclxuXHRcdFx0aWYoYmFzZWRPbiAmJiBiYXNlZE9uLl90b3ApXHJcblx0XHRcdFx0dmFsdWU9YmFzZWRPbi5fdG9wKC4uLmFyZ3VtZW50cylcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cdFxyXG5cdF9ib3R0b20oY29uZGl0aW9ucyl7XHJcblx0XHRsZXQgdmFsdWU9dGhpcy5wcmlvcml6ZShjb25kaXRpb25zKS5yZWR1Y2UoKGZvdW5kLCBjb25kKT0+e1xyXG5cdFx0XHRpZihmb3VuZCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBmb3VuZFxyXG5cdFx0XHRsZXQgY29uZFN0eWxlPXRoaXMuY29uZGl0aW9uc1tjb25kXVxyXG5cdFx0XHRpZihjb25kU3R5bGUgJiYgY29uZFN0eWxlLl9ib3R0b20pXHJcblx0XHRcdFx0cmV0dXJuIGNvbmRTdHlsZS5fYm90dG9tKC4uLmFyZ3VtZW50cylcclxuXHRcdH0sdW5kZWZpbmVkKVxyXG5cdFx0XHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRpZihjb25kaXRpb25zLmluY2x1ZGVzKCdsYXN0Um93JykpXHJcblx0XHRcdFx0dmFsdWU9c3VwZXIuX2JvdHRvbSguLi5hcmd1bWVudHMpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHR2YWx1ZT10aGlzLl8xYm9yZGVyKCdib3JkZXIuaW5zaWRlSCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGlmKHZhbHVlPT11bmRlZmluZWQpe1xyXG5cdFx0XHRsZXQgYmFzZWRPbj10aGlzLmdldEJhc2VkT24oKVxyXG5cdFx0XHRpZihiYXNlZE9uICYmIGJhc2VkT24uX2JvdHRvbSlcclxuXHRcdFx0XHR2YWx1ZT1iYXNlZE9uLl9ib3R0b20oLi4uYXJndW1lbnRzKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIHNlQ2VsbD1DZWxsU3R5bGVcclxuXHRzdGF0aWMgc3dDZWxsPUNlbGxTdHlsZVxyXG5cdHN0YXRpYyBuZUNlbGw9Q2VsbFN0eWxlXHJcblx0c3RhdGljIG53Q2VsbD1DZWxsU3R5bGVcclxuXHRzdGF0aWMgbGFzdENvbD1Db2xTdHlsZVxyXG5cdHN0YXRpYyBmaXJzdENvbD1Db2xTdHlsZVxyXG5cdHN0YXRpYyBsYXN0Um93PVJvd1N0eWxlXHJcblx0c3RhdGljIGZpcnN0Um93PVJvd1N0eWxlXHJcblx0c3RhdGljIGJhbmQySG9yej1CYW5kSFN0eWxlXHJcblx0c3RhdGljIGJhbmQxSG9yej1CYW5kSFN0eWxlXHJcblx0c3RhdGljIGJhbmQyVmVydD1CYW5kVlN0eWxlXHJcblx0c3RhdGljIGJhbmQxVmVydD1CYW5kVlN0eWxlXHJcbn1cclxuXHJcbiJdfQ==