"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Numberings = function () {
	function Numberings(numbering, styles) {
		var _this = this;

		_classCallCheck(this, Numberings);

		this.num = {};(numbering.get('numbering.num') || []).forEach(function (num) {
			var id = num.$.numId;
			_this.num[id] = new NumStyle(num, styles, _this);
		});

		this.abstractNum = {};(numbering.get("numbering.abstractNum") || []).forEach(function (def) {
			var id = def.$.abstractNumId;
			def.lvl.forEach(function (level) {
				_this.abstractNum[id + "." + level.$.ilvl] = new LevelStyle(level, styles, null, _this.numberings);
			});
		});

		this.numPicBullet = {};
	}

	_createClass(Numberings, [{
		key: "get",
		value: function get(path, numId, level) {
			return this.num[numId].get(path, level);
		}
	}]);

	return Numberings;
}();

exports.default = Numberings;

var NumStyle = function (_Style) {
	_inherits(NumStyle, _Style);

	function NumStyle(style, styles, numberings) {
		_classCallCheck(this, NumStyle);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(NumStyle).call(this, style, styles, null));

		_this2.numberings = numberings;
		_this2.abstractNumId = style.get("abstractNumId");(style.get('lvlOverride') || []).forEach(function (a) {
			var level = a.$.ilvl;
			var lvl = a.get('lvl') || { $: { ilvl: level } },
			    startOverride = a.get('startOverride');
			if (startOverride) lvl.start = { $: { val: startOverride } };

			_this2[level] = new NumLevelStyle(lvl, _this2.styles, null, _this2.numberings);
		});
		return _this2;
	}

	_createClass(NumStyle, [{
		key: "get",
		value: function get(path, level) {
			return this.level(level).get(path);
		}
	}, {
		key: "level",
		value: function level(_level) {
			return this[_level] || (this[_level] = new NumLevelStyle({ $: { ilvl: _level } }, this.styles, this.abstractNumId + "." + _level, this.numberings));
		}
	}]);

	return NumStyle;
}(_base2.default);

var LevelStyle = function (_Style2) {
	_inherits(LevelStyle, _Style2);

	function LevelStyle(style, styles, basedOn, numberings) {
		_classCallCheck(this, LevelStyle);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(LevelStyle).apply(this, arguments));

		_this3.numberings = numberings;
		return _this3;
	}

	return LevelStyle;
}(_base2.default);

var NumLevelStyle = function (_LevelStyle) {
	_inherits(NumLevelStyle, _LevelStyle);

	function NumLevelStyle() {
		var _Object$getPrototypeO;

		var _temp, _this4, _ret;

		_classCallCheck(this, NumLevelStyle);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(NumLevelStyle)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this4), _this4.current = 0, _temp), _possibleConstructorReturn(_this4, _ret);
	}

	_createClass(NumLevelStyle, [{
		key: "getBasedOn",
		value: function getBasedOn() {
			return this.numberings.abstractNum[this.basedOn];
		}
	}, {
		key: "get",
		value: function get(path) {
			if (path == "label") return this.getLabel();else return _get(Object.getPrototypeOf(NumLevelStyle.prototype), "get", this).call(this, path);
		}
	}, {
		key: "getLabel",
		value: function getLabel() {
			var _this5 = this;

			var value = undefined;
			var lvlPicBulletId = this.get("lvlPicBulletId");
			if (lvlPicBulletId != undefined) {
				throw new Error("pic bullet not supported yet!");
			} else {
				var lvlText = this.get("lvlText");

				value = lvlText.replace(/%(\d+)/g, function (a, level) {
					level = parseInt(level) - 1;
					if (level == parseInt(_this5.raw.$.ilvl)) {
						var start = parseInt(_this5.get("start"));
						var numFmt = _this5.get("numFmt");
						return (NUMFMT[numFmt] || NUMFMT['decimal'])(start + _this5.current);
					} else return _this5.basedOn.level(level).getLabel(_this5.current);
				});
			}

			this.current++;
			return value;
		}
	}]);

	return NumLevelStyle;
}(LevelStyle);

var NUMFMT = {
	decimal: function decimal(n) {
		return n;
	},
	lowerLetter: function lowerLetter(n) {
		return String.fromCharCode("a".charCodeAt(0) + n - 1);
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCO0FBQ3BCLFVBRG9CLFVBQ3BCLENBQVksU0FBWixFQUF1QixNQUF2QixFQUE4Qjs7O3dCQURWLFlBQ1U7O0FBQzdCLE9BQUssR0FBTCxHQUFTLEVBQVQsQ0FENkIsQ0FFM0IsVUFBVSxHQUFWLENBQWMsZUFBZCxLQUFnQyxFQUFoQyxDQUFELENBQXFDLE9BQXJDLENBQTZDLGVBQUs7QUFDbEQsT0FBSSxLQUFHLElBQUksQ0FBSixDQUFNLEtBQU4sQ0FEMkM7QUFFbEQsU0FBSyxHQUFMLENBQVMsRUFBVCxJQUFhLElBQUksUUFBSixDQUFhLEdBQWIsRUFBaUIsTUFBakIsUUFBYixDQUZrRDtHQUFMLENBQTdDLENBRjRCOztBQU83QixPQUFLLFdBQUwsR0FBaUIsRUFBakIsQ0FQNkIsQ0FRM0IsVUFBVSxHQUFWLENBQWMsdUJBQWQsS0FBd0MsRUFBeEMsQ0FBRCxDQUE2QyxPQUE3QyxDQUFxRCxlQUFLO0FBQzFELE9BQUksS0FBRyxJQUFJLENBQUosQ0FBTSxhQUFOLENBRG1EO0FBRTFELE9BQUksR0FBSixDQUFRLE9BQVIsQ0FBZ0IsaUJBQU87QUFDdEIsVUFBSyxXQUFMLENBQW9CLFdBQU0sTUFBTSxDQUFOLENBQVEsSUFBUixDQUExQixHQUEwQyxJQUFJLFVBQUosQ0FBZSxLQUFmLEVBQXFCLE1BQXJCLEVBQTRCLElBQTVCLEVBQWtDLE1BQUssVUFBTCxDQUE1RSxDQURzQjtJQUFQLENBQWhCLENBRjBEO0dBQUwsQ0FBckQsQ0FSNEI7O0FBZTdCLE9BQUssWUFBTCxHQUFrQixFQUFsQixDQWY2QjtFQUE5Qjs7Y0FEb0I7O3NCQW9CaEIsTUFBSyxPQUFPLE9BQU07QUFDckIsVUFBTyxLQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWdCLEdBQWhCLENBQW9CLElBQXBCLEVBQXlC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TyxTQUFQLENBQWhCLENBQUQsQ0FBb0MsUUFBTSxPQUFLLE9BQUwsQ0FBakQsQ0FIbUM7TUFBcEMsTUFLQyxPQUFPLE9BQUssT0FBTCxDQUFhLEtBQWIsQ0FBbUIsS0FBbkIsRUFBMEIsUUFBMUIsQ0FBbUMsT0FBSyxPQUFMLENBQTFDLENBTEQ7S0FGZ0MsQ0FBakMsQ0FISTtJQUZMOztBQWdCQSxRQUFLLE9BQUwsR0FuQlM7QUFvQlQsVUFBTyxLQUFQLENBcEJTOzs7O1FBZEw7RUFBc0I7O0FBc0M1QixJQUFNLFNBQU87QUFDWiwyQkFBUSxHQUFFO0FBQ1QsU0FBTyxDQUFQLENBRFM7RUFERTtBQUtaLG1DQUFZLEdBQUU7QUFDYixTQUFPLE9BQU8sWUFBUCxDQUFvQixJQUFJLFVBQUosQ0FBZSxDQUFmLElBQWtCLENBQWxCLEdBQW9CLENBQXBCLENBQTNCLENBRGE7RUFMRjtDQUFQIiwiZmlsZSI6Im51bWJlcmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9iYXNlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlcmluZ3N7XHJcblx0Y29uc3RydWN0b3IobnVtYmVyaW5nLCBzdHlsZXMpe1xyXG5cdFx0dGhpcy5udW09e31cclxuXHRcdDsobnVtYmVyaW5nLmdldCgnbnVtYmVyaW5nLm51bScpfHxbXSkuZm9yRWFjaChudW09PntcclxuXHRcdFx0bGV0IGlkPW51bS4kLm51bUlkXHJcblx0XHRcdHRoaXMubnVtW2lkXT1uZXcgTnVtU3R5bGUobnVtLHN0eWxlcyx0aGlzKVxyXG5cdFx0fSlcclxuXHRcdFx0XHJcblx0XHR0aGlzLmFic3RyYWN0TnVtPXt9XHJcblx0XHQ7KG51bWJlcmluZy5nZXQoXCJudW1iZXJpbmcuYWJzdHJhY3ROdW1cIil8fFtdKS5mb3JFYWNoKGRlZj0+e1xyXG5cdFx0XHRsZXQgaWQ9ZGVmLiQuYWJzdHJhY3ROdW1JZFxyXG5cdFx0XHRkZWYubHZsLmZvckVhY2gobGV2ZWw9PntcclxuXHRcdFx0XHR0aGlzLmFic3RyYWN0TnVtW2Ake2lkfS4ke2xldmVsLiQuaWx2bH1gXT1uZXcgTGV2ZWxTdHlsZShsZXZlbCxzdHlsZXMsbnVsbCwgdGhpcy5udW1iZXJpbmdzKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0dGhpcy5udW1QaWNCdWxsZXQ9e31cclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCxudW1JZCwgbGV2ZWwpe1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtW251bUlkXS5nZXQocGF0aCxsZXZlbClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIE51bVN0eWxlIGV4dGVuZHMgU3R5bGV7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHN0eWxlcywgbnVtYmVyaW5ncyl7XHJcblx0XHRzdXBlcihzdHlsZSxzdHlsZXMsIG51bGwpXHJcblx0XHR0aGlzLm51bWJlcmluZ3M9bnVtYmVyaW5nc1xyXG5cdFx0dGhpcy5hYnN0cmFjdE51bUlkPXN0eWxlLmdldChcImFic3RyYWN0TnVtSWRcIilcclxuXHRcdFxyXG5cdFx0OyhzdHlsZS5nZXQoJ2x2bE92ZXJyaWRlJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0bGV0IGxldmVsPWEuJC5pbHZsXHJcblx0XHRcdGxldCBsdmw9YS5nZXQoJ2x2bCcpfHx7JDp7aWx2bDpsZXZlbH19LCBzdGFydE92ZXJyaWRlPWEuZ2V0KCdzdGFydE92ZXJyaWRlJylcclxuXHRcdFx0aWYoc3RhcnRPdmVycmlkZSlcclxuXHRcdFx0XHRsdmwuc3RhcnQ9eyQ6e3ZhbDpzdGFydE92ZXJyaWRlfX1cclxuXHRcdFx0XHJcblx0XHRcdHRoaXNbbGV2ZWxdPW5ldyBOdW1MZXZlbFN0eWxlKGx2bCx0aGlzLnN0eWxlcyxudWxsLCB0aGlzLm51bWJlcmluZ3MpXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCxsZXZlbCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sZXZlbChsZXZlbCkuZ2V0KHBhdGgpXHJcblx0fVxyXG5cdFxyXG5cdGxldmVsKGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzW2xldmVsXSB8fCAodGhpc1tsZXZlbF09bmV3IE51bUxldmVsU3R5bGUoeyQ6e2lsdmw6bGV2ZWx9fSx0aGlzLnN0eWxlcyxgJHt0aGlzLmFic3RyYWN0TnVtSWR9LiR7bGV2ZWx9YCwgdGhpcy5udW1iZXJpbmdzKSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIExldmVsU3R5bGUgZXh0ZW5kcyBTdHlsZXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxzdHlsZXMsYmFzZWRPbiwgbnVtYmVyaW5ncyl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLm51bWJlcmluZ3M9bnVtYmVyaW5nc1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgTnVtTGV2ZWxTdHlsZSBleHRlbmRzIExldmVsU3R5bGV7XHJcblx0Y3VycmVudD0wXHJcblx0XHJcblx0Z2V0QmFzZWRPbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtYmVyaW5ncy5hYnN0cmFjdE51bVt0aGlzLmJhc2VkT25dXHJcblx0fVxyXG5cdFxyXG5cdGdldChwYXRoKXtcclxuXHRcdGlmKHBhdGg9PVwibGFiZWxcIilcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGFiZWwoKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KHBhdGgpXHJcblx0fVxyXG5cdFxyXG5cdGdldExhYmVsKCl7XHJcblx0XHRsZXQgdmFsdWU9dW5kZWZpbmVkXHJcblx0XHRsZXQgbHZsUGljQnVsbGV0SWQ9dGhpcy5nZXQoXCJsdmxQaWNCdWxsZXRJZFwiKVxyXG5cdFx0aWYobHZsUGljQnVsbGV0SWQhPXVuZGVmaW5lZCl7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInBpYyBidWxsZXQgbm90IHN1cHBvcnRlZCB5ZXQhXCIpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGx2bFRleHQ9dGhpcy5nZXQoXCJsdmxUZXh0XCIpXHJcblx0XHRcdFxyXG5cdFx0XHR2YWx1ZT1sdmxUZXh0LnJlcGxhY2UoLyUoXFxkKykvZywgKGEsbGV2ZWwpPT57XHJcblx0XHRcdFx0bGV2ZWw9cGFyc2VJbnQobGV2ZWwpLTFcclxuXHRcdFx0XHRpZihsZXZlbD09cGFyc2VJbnQodGhpcy5yYXcuJC5pbHZsKSl7XHJcblx0XHRcdFx0XHRsZXQgc3RhcnQ9cGFyc2VJbnQodGhpcy5nZXQoXCJzdGFydFwiKSlcclxuXHRcdFx0XHRcdGxldCBudW1GbXQ9dGhpcy5nZXQoXCJudW1GbXRcIilcclxuXHRcdFx0XHRcdHJldHVybiAoTlVNRk1UW251bUZtdF18fE5VTUZNVFsnZGVjaW1hbCddKShzdGFydCt0aGlzLmN1cnJlbnQpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmJhc2VkT24ubGV2ZWwobGV2ZWwpLmdldExhYmVsKHRoaXMuY3VycmVudClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnQrK1xyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBOVU1GTVQ9e1xyXG5cdGRlY2ltYWwobil7XHJcblx0XHRyZXR1cm4gblxyXG5cdH0sXHJcblx0XHJcblx0bG93ZXJMZXR0ZXIobil7XHJcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcImFcIi5jaGFyQ29kZUF0KDApK24tMSlcclxuXHR9XHJcbn0iXX0=