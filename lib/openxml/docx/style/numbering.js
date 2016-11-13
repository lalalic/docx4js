"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _base = require("./base");

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Numberings = function () {
	function Numberings(numbering, styles) {
		var _this = this;

		(0, _classCallCheck3.default)(this, Numberings);

		this.num = {};
		this.abstractNum = {};
		if (numbering) {
			;(numbering.get('numbering.num') || []).forEach(function (num) {
				var id = num.$.numId;
				_this.num[id] = new NumStyle(num, styles, _this);
			});(numbering.get("numbering.abstractNum") || []).forEach(function (def) {
				var id = def.$.abstractNumId;
				def.lvl.forEach(function (level) {
					_this.abstractNum[id + "." + level.$.ilvl] = new LevelStyle(level, styles, null, _this.numberings);
				});
			});
		}
		this.numPicBullet = {};
	}

	(0, _createClass3.default)(Numberings, [{
		key: "get",
		value: function get(path, numId, level) {
			return this.num[numId].get(path, level);
		}
	}]);
	return Numberings;
}();

exports.default = Numberings;

var NumStyle = function (_Style) {
	(0, _inherits3.default)(NumStyle, _Style);

	function NumStyle(style, styles, numberings) {
		(0, _classCallCheck3.default)(this, NumStyle);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (NumStyle.__proto__ || (0, _getPrototypeOf2.default)(NumStyle)).call(this, style, styles, null));

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

	(0, _createClass3.default)(NumStyle, [{
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
	(0, _inherits3.default)(LevelStyle, _Style2);

	function LevelStyle(style, styles, basedOn, numberings) {
		(0, _classCallCheck3.default)(this, LevelStyle);

		var _this3 = (0, _possibleConstructorReturn3.default)(this, (LevelStyle.__proto__ || (0, _getPrototypeOf2.default)(LevelStyle)).apply(this, arguments));

		_this3.numberings = numberings;
		return _this3;
	}

	return LevelStyle;
}(_base2.default);

var NumLevelStyle = function (_LevelStyle) {
	(0, _inherits3.default)(NumLevelStyle, _LevelStyle);

	function NumLevelStyle() {
		var _ref;

		var _temp, _this4, _ret;

		(0, _classCallCheck3.default)(this, NumLevelStyle);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this4 = (0, _possibleConstructorReturn3.default)(this, (_ref = NumLevelStyle.__proto__ || (0, _getPrototypeOf2.default)(NumLevelStyle)).call.apply(_ref, [this].concat(args))), _this4), _this4.current = 0, _temp), (0, _possibleConstructorReturn3.default)(_this4, _ret);
	}

	(0, _createClass3.default)(NumLevelStyle, [{
		key: "getBasedOn",
		value: function getBasedOn() {
			return this.numberings.abstractNum[this.basedOn];
		}
	}, {
		key: "get",
		value: function get(path) {
			if (path == "label") return this.getLabel();else return (0, _get3.default)(NumLevelStyle.prototype.__proto__ || (0, _getPrototypeOf2.default)(NumLevelStyle.prototype), "get", this).call(this, path);
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbIk51bWJlcmluZ3MiLCJudW1iZXJpbmciLCJzdHlsZXMiLCJudW0iLCJhYnN0cmFjdE51bSIsImdldCIsImZvckVhY2giLCJpZCIsIiQiLCJudW1JZCIsIk51bVN0eWxlIiwiZGVmIiwiYWJzdHJhY3ROdW1JZCIsImx2bCIsImxldmVsIiwiaWx2bCIsIkxldmVsU3R5bGUiLCJudW1iZXJpbmdzIiwibnVtUGljQnVsbGV0IiwicGF0aCIsInN0eWxlIiwiYSIsInN0YXJ0T3ZlcnJpZGUiLCJzdGFydCIsInZhbCIsIk51bUxldmVsU3R5bGUiLCJiYXNlZE9uIiwiYXJndW1lbnRzIiwiY3VycmVudCIsImdldExhYmVsIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJsdmxQaWNCdWxsZXRJZCIsIkVycm9yIiwibHZsVGV4dCIsInJlcGxhY2UiLCJwYXJzZUludCIsInJhdyIsIm51bUZtdCIsIk5VTUZNVCIsImRlY2ltYWwiLCJuIiwibG93ZXJMZXR0ZXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRXFCQSxVO0FBQ3BCLHFCQUFZQyxTQUFaLEVBQXVCQyxNQUF2QixFQUE4QjtBQUFBOztBQUFBOztBQUM3QixPQUFLQyxHQUFMLEdBQVMsRUFBVDtBQUNBLE9BQUtDLFdBQUwsR0FBaUIsRUFBakI7QUFDQSxNQUFHSCxTQUFILEVBQWE7QUFDWixJQUFDLENBQUNBLFVBQVVJLEdBQVYsQ0FBYyxlQUFkLEtBQWdDLEVBQWpDLEVBQXFDQyxPQUFyQyxDQUE2QyxlQUFLO0FBQ2xELFFBQUlDLEtBQUdKLElBQUlLLENBQUosQ0FBTUMsS0FBYjtBQUNBLFVBQUtOLEdBQUwsQ0FBU0ksRUFBVCxJQUFhLElBQUlHLFFBQUosQ0FBYVAsR0FBYixFQUFpQkQsTUFBakIsUUFBYjtBQUNBLElBSEEsRUFLQSxDQUFDRCxVQUFVSSxHQUFWLENBQWMsdUJBQWQsS0FBd0MsRUFBekMsRUFBNkNDLE9BQTdDLENBQXFELGVBQUs7QUFDMUQsUUFBSUMsS0FBR0ksSUFBSUgsQ0FBSixDQUFNSSxhQUFiO0FBQ0FELFFBQUlFLEdBQUosQ0FBUVAsT0FBUixDQUFnQixpQkFBTztBQUN0QixXQUFLRixXQUFMLENBQW9CRyxFQUFwQixTQUEwQk8sTUFBTU4sQ0FBTixDQUFRTyxJQUFsQyxJQUEwQyxJQUFJQyxVQUFKLENBQWVGLEtBQWYsRUFBcUJaLE1BQXJCLEVBQTRCLElBQTVCLEVBQWtDLE1BQUtlLFVBQXZDLENBQTFDO0FBQ0EsS0FGRDtBQUdBLElBTEE7QUFPRDtBQUNELE9BQUtDLFlBQUwsR0FBa0IsRUFBbEI7QUFFQTs7OztzQkFFR0MsSSxFQUFLVixLLEVBQU9LLEssRUFBTTtBQUNyQixVQUFPLEtBQUtYLEdBQUwsQ0FBU00sS0FBVCxFQUFnQkosR0FBaEIsQ0FBb0JjLElBQXBCLEVBQXlCTCxLQUF6QixDQUFQO0FBQ0E7Ozs7O2tCQXhCbUJkLFU7O0lBMkJmVSxROzs7QUFDTCxtQkFBWVUsS0FBWixFQUFtQmxCLE1BQW5CLEVBQTJCZSxVQUEzQixFQUFzQztBQUFBOztBQUFBLHlJQUMvQkcsS0FEK0IsRUFDekJsQixNQUR5QixFQUNqQixJQURpQjs7QUFFckMsU0FBS2UsVUFBTCxHQUFnQkEsVUFBaEI7QUFDQSxTQUFLTCxhQUFMLEdBQW1CUSxNQUFNZixHQUFOLENBQVUsZUFBVixDQUFuQixDQUVDLENBQUNlLE1BQU1mLEdBQU4sQ0FBVSxhQUFWLEtBQTBCLEVBQTNCLEVBQStCQyxPQUEvQixDQUF1QyxhQUFHO0FBQzFDLE9BQUlRLFFBQU1PLEVBQUViLENBQUYsQ0FBSU8sSUFBZDtBQUNBLE9BQUlGLE1BQUlRLEVBQUVoQixHQUFGLENBQU0sS0FBTixLQUFjLEVBQUNHLEdBQUUsRUFBQ08sTUFBS0QsS0FBTixFQUFILEVBQXRCO0FBQUEsT0FBd0NRLGdCQUFjRCxFQUFFaEIsR0FBRixDQUFNLGVBQU4sQ0FBdEQ7QUFDQSxPQUFHaUIsYUFBSCxFQUNDVCxJQUFJVSxLQUFKLEdBQVUsRUFBQ2YsR0FBRSxFQUFDZ0IsS0FBSUYsYUFBTCxFQUFILEVBQVY7O0FBRUQsVUFBS1IsS0FBTCxJQUFZLElBQUlXLGFBQUosQ0FBa0JaLEdBQWxCLEVBQXNCLE9BQUtYLE1BQTNCLEVBQWtDLElBQWxDLEVBQXdDLE9BQUtlLFVBQTdDLENBQVo7QUFDQSxHQVBBO0FBTG9DO0FBYXJDOzs7O3NCQUVHRSxJLEVBQUtMLEssRUFBTTtBQUNkLFVBQU8sS0FBS0EsS0FBTCxDQUFXQSxLQUFYLEVBQWtCVCxHQUFsQixDQUFzQmMsSUFBdEIsQ0FBUDtBQUNBOzs7d0JBRUtMLE0sRUFBTTtBQUNYLFVBQU8sS0FBS0EsTUFBTCxNQUFnQixLQUFLQSxNQUFMLElBQVksSUFBSVcsYUFBSixDQUFrQixFQUFDakIsR0FBRSxFQUFDTyxNQUFLRCxNQUFOLEVBQUgsRUFBbEIsRUFBbUMsS0FBS1osTUFBeEMsRUFBa0QsS0FBS1UsYUFBdkQsU0FBd0VFLE1BQXhFLEVBQWlGLEtBQUtHLFVBQXRGLENBQTVCLENBQVA7QUFDQTs7Ozs7SUFHSUQsVTs7O0FBQ0wscUJBQVlJLEtBQVosRUFBa0JsQixNQUFsQixFQUF5QndCLE9BQXpCLEVBQWtDVCxVQUFsQyxFQUE2QztBQUFBOztBQUFBLDhJQUNuQ1UsU0FEbUM7O0FBRTVDLFNBQUtWLFVBQUwsR0FBZ0JBLFVBQWhCO0FBRjRDO0FBRzVDOzs7OztJQUdJUSxhOzs7Ozs7Ozs7Ozs7OzsyTkFDTEcsTyxHQUFRLEM7Ozs7OytCQUVJO0FBQ1gsVUFBTyxLQUFLWCxVQUFMLENBQWdCYixXQUFoQixDQUE0QixLQUFLc0IsT0FBakMsQ0FBUDtBQUNBOzs7c0JBRUdQLEksRUFBSztBQUNSLE9BQUdBLFFBQU0sT0FBVCxFQUNDLE9BQU8sS0FBS1UsUUFBTCxFQUFQLENBREQsS0FHQywrSUFBaUJWLElBQWpCO0FBQ0Q7Ozs2QkFFUztBQUFBOztBQUNULE9BQUlXLFFBQU1DLFNBQVY7QUFDQSxPQUFJQyxpQkFBZSxLQUFLM0IsR0FBTCxDQUFTLGdCQUFULENBQW5CO0FBQ0EsT0FBRzJCLGtCQUFnQkQsU0FBbkIsRUFBNkI7QUFDNUIsVUFBTSxJQUFJRSxLQUFKLENBQVUsK0JBQVYsQ0FBTjtBQUNBLElBRkQsTUFFSztBQUNKLFFBQUlDLFVBQVEsS0FBSzdCLEdBQUwsQ0FBUyxTQUFULENBQVo7O0FBRUF5QixZQUFNSSxRQUFRQyxPQUFSLENBQWdCLFNBQWhCLEVBQTJCLFVBQUNkLENBQUQsRUFBR1AsS0FBSCxFQUFXO0FBQzNDQSxhQUFNc0IsU0FBU3RCLEtBQVQsSUFBZ0IsQ0FBdEI7QUFDQSxTQUFHQSxTQUFPc0IsU0FBUyxPQUFLQyxHQUFMLENBQVM3QixDQUFULENBQVdPLElBQXBCLENBQVYsRUFBb0M7QUFDbkMsVUFBSVEsUUFBTWEsU0FBUyxPQUFLL0IsR0FBTCxDQUFTLE9BQVQsQ0FBVCxDQUFWO0FBQ0EsVUFBSWlDLFNBQU8sT0FBS2pDLEdBQUwsQ0FBUyxRQUFULENBQVg7QUFDQSxhQUFPLENBQUNrQyxPQUFPRCxNQUFQLEtBQWdCQyxPQUFPLFNBQVAsQ0FBakIsRUFBb0NoQixRQUFNLE9BQUtLLE9BQS9DLENBQVA7QUFDQSxNQUpELE1BS0MsT0FBTyxPQUFLRixPQUFMLENBQWFaLEtBQWIsQ0FBbUJBLEtBQW5CLEVBQTBCZSxRQUExQixDQUFtQyxPQUFLRCxPQUF4QyxDQUFQO0FBQ0QsS0FSSyxDQUFOO0FBU0E7O0FBRUQsUUFBS0EsT0FBTDtBQUNBLFVBQU9FLEtBQVA7QUFDQTs7O0VBbkMwQmQsVTs7QUFzQzVCLElBQU11QixTQUFPO0FBQ1pDLFFBRFksbUJBQ0pDLENBREksRUFDRjtBQUNULFNBQU9BLENBQVA7QUFDQSxFQUhXO0FBS1pDLFlBTFksdUJBS0FELENBTEEsRUFLRTtBQUNiLFNBQU9FLE9BQU9DLFlBQVAsQ0FBb0IsSUFBSUMsVUFBSixDQUFlLENBQWYsSUFBa0JKLENBQWxCLEdBQW9CLENBQXhDLENBQVA7QUFDQTtBQVBXLENBQWIiLCJmaWxlIjoibnVtYmVyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gXCIuL2Jhc2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyaW5nc3tcclxuXHRjb25zdHJ1Y3RvcihudW1iZXJpbmcsIHN0eWxlcyl7XHJcblx0XHR0aGlzLm51bT17fVxyXG5cdFx0dGhpcy5hYnN0cmFjdE51bT17fVxyXG5cdFx0aWYobnVtYmVyaW5nKXtcclxuXHRcdFx0OyhudW1iZXJpbmcuZ2V0KCdudW1iZXJpbmcubnVtJyl8fFtdKS5mb3JFYWNoKG51bT0+e1xyXG5cdFx0XHRcdGxldCBpZD1udW0uJC5udW1JZFxyXG5cdFx0XHRcdHRoaXMubnVtW2lkXT1uZXcgTnVtU3R5bGUobnVtLHN0eWxlcyx0aGlzKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHRcdFxyXG5cdFx0XHQ7KG51bWJlcmluZy5nZXQoXCJudW1iZXJpbmcuYWJzdHJhY3ROdW1cIil8fFtdKS5mb3JFYWNoKGRlZj0+e1xyXG5cdFx0XHRcdGxldCBpZD1kZWYuJC5hYnN0cmFjdE51bUlkXHJcblx0XHRcdFx0ZGVmLmx2bC5mb3JFYWNoKGxldmVsPT57XHJcblx0XHRcdFx0XHR0aGlzLmFic3RyYWN0TnVtW2Ake2lkfS4ke2xldmVsLiQuaWx2bH1gXT1uZXcgTGV2ZWxTdHlsZShsZXZlbCxzdHlsZXMsbnVsbCwgdGhpcy5udW1iZXJpbmdzKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0dGhpcy5udW1QaWNCdWxsZXQ9e31cclxuXHRcdFxyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCxudW1JZCwgbGV2ZWwpe1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtW251bUlkXS5nZXQocGF0aCxsZXZlbClcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIE51bVN0eWxlIGV4dGVuZHMgU3R5bGV7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGUsIHN0eWxlcywgbnVtYmVyaW5ncyl7XHJcblx0XHRzdXBlcihzdHlsZSxzdHlsZXMsIG51bGwpXHJcblx0XHR0aGlzLm51bWJlcmluZ3M9bnVtYmVyaW5nc1xyXG5cdFx0dGhpcy5hYnN0cmFjdE51bUlkPXN0eWxlLmdldChcImFic3RyYWN0TnVtSWRcIilcclxuXHRcdFxyXG5cdFx0OyhzdHlsZS5nZXQoJ2x2bE92ZXJyaWRlJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0bGV0IGxldmVsPWEuJC5pbHZsXHJcblx0XHRcdGxldCBsdmw9YS5nZXQoJ2x2bCcpfHx7JDp7aWx2bDpsZXZlbH19LCBzdGFydE92ZXJyaWRlPWEuZ2V0KCdzdGFydE92ZXJyaWRlJylcclxuXHRcdFx0aWYoc3RhcnRPdmVycmlkZSlcclxuXHRcdFx0XHRsdmwuc3RhcnQ9eyQ6e3ZhbDpzdGFydE92ZXJyaWRlfX1cclxuXHRcdFx0XHJcblx0XHRcdHRoaXNbbGV2ZWxdPW5ldyBOdW1MZXZlbFN0eWxlKGx2bCx0aGlzLnN0eWxlcyxudWxsLCB0aGlzLm51bWJlcmluZ3MpXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCxsZXZlbCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sZXZlbChsZXZlbCkuZ2V0KHBhdGgpXHJcblx0fVxyXG5cdFxyXG5cdGxldmVsKGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzW2xldmVsXSB8fCAodGhpc1tsZXZlbF09bmV3IE51bUxldmVsU3R5bGUoeyQ6e2lsdmw6bGV2ZWx9fSx0aGlzLnN0eWxlcyxgJHt0aGlzLmFic3RyYWN0TnVtSWR9LiR7bGV2ZWx9YCwgdGhpcy5udW1iZXJpbmdzKSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIExldmVsU3R5bGUgZXh0ZW5kcyBTdHlsZXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxzdHlsZXMsYmFzZWRPbiwgbnVtYmVyaW5ncyl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLm51bWJlcmluZ3M9bnVtYmVyaW5nc1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgTnVtTGV2ZWxTdHlsZSBleHRlbmRzIExldmVsU3R5bGV7XHJcblx0Y3VycmVudD0wXHJcblx0XHJcblx0Z2V0QmFzZWRPbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtYmVyaW5ncy5hYnN0cmFjdE51bVt0aGlzLmJhc2VkT25dXHJcblx0fVxyXG5cdFxyXG5cdGdldChwYXRoKXtcclxuXHRcdGlmKHBhdGg9PVwibGFiZWxcIilcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0TGFiZWwoKVxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KHBhdGgpXHJcblx0fVxyXG5cdFxyXG5cdGdldExhYmVsKCl7XHJcblx0XHRsZXQgdmFsdWU9dW5kZWZpbmVkXHJcblx0XHRsZXQgbHZsUGljQnVsbGV0SWQ9dGhpcy5nZXQoXCJsdmxQaWNCdWxsZXRJZFwiKVxyXG5cdFx0aWYobHZsUGljQnVsbGV0SWQhPXVuZGVmaW5lZCl7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInBpYyBidWxsZXQgbm90IHN1cHBvcnRlZCB5ZXQhXCIpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGx2bFRleHQ9dGhpcy5nZXQoXCJsdmxUZXh0XCIpXHJcblx0XHRcdFxyXG5cdFx0XHR2YWx1ZT1sdmxUZXh0LnJlcGxhY2UoLyUoXFxkKykvZywgKGEsbGV2ZWwpPT57XHJcblx0XHRcdFx0bGV2ZWw9cGFyc2VJbnQobGV2ZWwpLTFcclxuXHRcdFx0XHRpZihsZXZlbD09cGFyc2VJbnQodGhpcy5yYXcuJC5pbHZsKSl7XHJcblx0XHRcdFx0XHRsZXQgc3RhcnQ9cGFyc2VJbnQodGhpcy5nZXQoXCJzdGFydFwiKSlcclxuXHRcdFx0XHRcdGxldCBudW1GbXQ9dGhpcy5nZXQoXCJudW1GbXRcIilcclxuXHRcdFx0XHRcdHJldHVybiAoTlVNRk1UW251bUZtdF18fE5VTUZNVFsnZGVjaW1hbCddKShzdGFydCt0aGlzLmN1cnJlbnQpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmJhc2VkT24ubGV2ZWwobGV2ZWwpLmdldExhYmVsKHRoaXMuY3VycmVudClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnQrK1xyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBOVU1GTVQ9e1xyXG5cdGRlY2ltYWwobil7XHJcblx0XHRyZXR1cm4gblxyXG5cdH0sXHJcblx0XHJcblx0bG93ZXJMZXR0ZXIobil7XHJcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcImFcIi5jaGFyQ29kZUF0KDApK24tMSlcclxuXHR9XHJcbn0iXX0=