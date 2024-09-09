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

		this.num = {};
		this.abstractNum = {};
		if (numbering) {
			;(numbering.get('numbering.num', false) || []).forEach(function (num) {
				var id = num.$.numId;
				_this.num[id] = new NumStyle(num, styles, _this);
			});(numbering.get("numbering.abstractNum", false) || []).forEach(function (def) {
				var id = def.$.abstractNumId;
				def.lvl.forEach(function (level) {
					_this.abstractNum[id + "." + level.$.ilvl] = new LevelStyle(level, styles, null, _this.numberings);
				});
			});
		}
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

		var _this2 = _possibleConstructorReturn(this, (NumStyle.__proto__ || Object.getPrototypeOf(NumStyle)).call(this, style, styles, null));

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

		var _this3 = _possibleConstructorReturn(this, (LevelStyle.__proto__ || Object.getPrototypeOf(LevelStyle)).apply(this, arguments));

		_this3.numberings = numberings;
		return _this3;
	}

	return LevelStyle;
}(_base2.default);

var NumLevelStyle = function (_LevelStyle) {
	_inherits(NumLevelStyle, _LevelStyle);

	function NumLevelStyle() {
		var _ref;

		var _temp, _this4, _ret;

		_classCallCheck(this, NumLevelStyle);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this4 = _possibleConstructorReturn(this, (_ref = NumLevelStyle.__proto__ || Object.getPrototypeOf(NumLevelStyle)).call.apply(_ref, [this].concat(args))), _this4), _this4.current = 0, _temp), _possibleConstructorReturn(_this4, _ret);
	}

	_createClass(NumLevelStyle, [{
		key: "getBasedOn",
		value: function getBasedOn() {
			return this.numberings.abstractNum[this.basedOn];
		}
	}, {
		key: "get",
		value: function get(path) {
			if (path == "label") return this.getLabel();else return _get(NumLevelStyle.prototype.__proto__ || Object.getPrototypeOf(NumLevelStyle.prototype), "get", this).call(this, path);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbIk51bWJlcmluZ3MiLCJudW1iZXJpbmciLCJzdHlsZXMiLCJudW0iLCJhYnN0cmFjdE51bSIsImdldCIsImZvckVhY2giLCJpZCIsIiQiLCJudW1JZCIsIk51bVN0eWxlIiwiZGVmIiwiYWJzdHJhY3ROdW1JZCIsImx2bCIsImxldmVsIiwiaWx2bCIsIkxldmVsU3R5bGUiLCJudW1iZXJpbmdzIiwibnVtUGljQnVsbGV0IiwicGF0aCIsInN0eWxlIiwiYSIsInN0YXJ0T3ZlcnJpZGUiLCJzdGFydCIsInZhbCIsIk51bUxldmVsU3R5bGUiLCJiYXNlZE9uIiwiYXJndW1lbnRzIiwiY3VycmVudCIsImdldExhYmVsIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJsdmxQaWNCdWxsZXRJZCIsIkVycm9yIiwibHZsVGV4dCIsInJlcGxhY2UiLCJwYXJzZUludCIsInJhdyIsIm51bUZtdCIsIk5VTUZNVCIsImRlY2ltYWwiLCJuIiwibG93ZXJMZXR0ZXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJjaGFyQ29kZUF0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsVTtBQUNwQixxQkFBWUMsU0FBWixFQUF1QkMsTUFBdkIsRUFBOEI7QUFBQTs7QUFBQTs7QUFDN0IsT0FBS0MsR0FBTCxHQUFTLEVBQVQ7QUFDQSxPQUFLQyxXQUFMLEdBQWlCLEVBQWpCO0FBQ0EsTUFBR0gsU0FBSCxFQUFhO0FBQ1osSUFBQyxDQUFDQSxVQUFVSSxHQUFWLENBQWMsZUFBZCxFQUE4QixLQUE5QixLQUFzQyxFQUF2QyxFQUEyQ0MsT0FBM0MsQ0FBbUQsZUFBSztBQUN4RCxRQUFJQyxLQUFHSixJQUFJSyxDQUFKLENBQU1DLEtBQWI7QUFDQSxVQUFLTixHQUFMLENBQVNJLEVBQVQsSUFBYSxJQUFJRyxRQUFKLENBQWFQLEdBQWIsRUFBaUJELE1B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VyxDQUFiIiwiZmlsZSI6Im51bWJlcmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9iYXNlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlcmluZ3N7XHJcblx0Y29uc3RydWN0b3IobnVtYmVyaW5nLCBzdHlsZXMpe1xyXG5cdFx0dGhpcy5udW09e31cclxuXHRcdHRoaXMuYWJzdHJhY3ROdW09e31cclxuXHRcdGlmKG51bWJlcmluZyl7XHJcblx0XHRcdDsobnVtYmVyaW5nLmdldCgnbnVtYmVyaW5nLm51bScsZmFsc2UpfHxbXSkuZm9yRWFjaChudW09PntcclxuXHRcdFx0XHRsZXQgaWQ9bnVtLiQubnVtSWRcclxuXHRcdFx0XHR0aGlzLm51bVtpZF09bmV3IE51bVN0eWxlKG51bSxzdHlsZXMsdGhpcylcclxuXHRcdFx0fSlcclxuXHRcdFx0OyhudW1iZXJpbmcuZ2V0KFwibnVtYmVyaW5nLmFic3RyYWN0TnVtXCIsZmFsc2UpfHxbXSkuZm9yRWFjaChkZWY9Pntcblx0XHRcdFx0bGV0IGlkPWRlZi4kLmFic3RyYWN0TnVtSWRcclxuXHRcdFx0XHRkZWYubHZsLmZvckVhY2gobGV2ZWw9PntcclxuXHRcdFx0XHRcdHRoaXMuYWJzdHJhY3ROdW1bYCR7aWR9LiR7bGV2ZWwuJC5pbHZsfWBdPW5ldyBMZXZlbFN0eWxlKGxldmVsLHN0eWxlcyxudWxsLCB0aGlzLm51bWJlcmluZ3MpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHJcblx0XHR9XHJcblx0XHR0aGlzLm51bVBpY0J1bGxldD17fVxyXG5cclxuXHR9XHJcblxyXG5cdGdldChwYXRoLG51bUlkLCBsZXZlbCl7XHJcblx0XHRyZXR1cm4gdGhpcy5udW1bbnVtSWRdLmdldChwYXRoLGxldmVsKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgTnVtU3R5bGUgZXh0ZW5kcyBTdHlsZXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSwgc3R5bGVzLCBudW1iZXJpbmdzKXtcclxuXHRcdHN1cGVyKHN0eWxlLHN0eWxlcywgbnVsbClcclxuXHRcdHRoaXMubnVtYmVyaW5ncz1udW1iZXJpbmdzXHJcblx0XHR0aGlzLmFic3RyYWN0TnVtSWQ9c3R5bGUuZ2V0KFwiYWJzdHJhY3ROdW1JZFwiKVxyXG5cclxuXHRcdDsoc3R5bGUuZ2V0KCdsdmxPdmVycmlkZScpfHxbXSkuZm9yRWFjaChhPT57XHJcblx0XHRcdGxldCBsZXZlbD1hLiQuaWx2bFxyXG5cdFx0XHRsZXQgbHZsPWEuZ2V0KCdsdmwnKXx8eyQ6e2lsdmw6bGV2ZWx9fSwgc3RhcnRPdmVycmlkZT1hLmdldCgnc3RhcnRPdmVycmlkZScpXHJcblx0XHRcdGlmKHN0YXJ0T3ZlcnJpZGUpXHJcblx0XHRcdFx0bHZsLnN0YXJ0PXskOnt2YWw6c3RhcnRPdmVycmlkZX19XHJcblxyXG5cdFx0XHR0aGlzW2xldmVsXT1uZXcgTnVtTGV2ZWxTdHlsZShsdmwsdGhpcy5zdHlsZXMsbnVsbCwgdGhpcy5udW1iZXJpbmdzKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGdldChwYXRoLGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzLmxldmVsKGxldmVsKS5nZXQocGF0aClcclxuXHR9XHJcblxyXG5cdGxldmVsKGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzW2xldmVsXSB8fCAodGhpc1tsZXZlbF09bmV3IE51bUxldmVsU3R5bGUoeyQ6e2lsdmw6bGV2ZWx9fSx0aGlzLnN0eWxlcyxgJHt0aGlzLmFic3RyYWN0TnVtSWR9LiR7bGV2ZWx9YCwgdGhpcy5udW1iZXJpbmdzKSlcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIExldmVsU3R5bGUgZXh0ZW5kcyBTdHlsZXtcclxuXHRjb25zdHJ1Y3RvcihzdHlsZSxzdHlsZXMsYmFzZWRPbiwgbnVtYmVyaW5ncyl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLm51bWJlcmluZ3M9bnVtYmVyaW5nc1xyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgTnVtTGV2ZWxTdHlsZSBleHRlbmRzIExldmVsU3R5bGV7XHJcblx0Y3VycmVudD0wXHJcblxyXG5cdGdldEJhc2VkT24oKXtcclxuXHRcdHJldHVybiB0aGlzLm51bWJlcmluZ3MuYWJzdHJhY3ROdW1bdGhpcy5iYXNlZE9uXVxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0aWYocGF0aD09XCJsYWJlbFwiKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRMYWJlbCgpXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBzdXBlci5nZXQocGF0aClcclxuXHR9XHJcblxyXG5cdGdldExhYmVsKCl7XHJcblx0XHRsZXQgdmFsdWU9dW5kZWZpbmVkXHJcblx0XHRsZXQgbHZsUGljQnVsbGV0SWQ9dGhpcy5nZXQoXCJsdmxQaWNCdWxsZXRJZFwiKVxyXG5cdFx0aWYobHZsUGljQnVsbGV0SWQhPXVuZGVmaW5lZCl7XHJcblx0XHRcdHRocm93IG5ldyBFcnJvcihcInBpYyBidWxsZXQgbm90IHN1cHBvcnRlZCB5ZXQhXCIpXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGx2bFRleHQ9dGhpcy5nZXQoXCJsdmxUZXh0XCIpXHJcblxyXG5cdFx0XHR2YWx1ZT1sdmxUZXh0LnJlcGxhY2UoLyUoXFxkKykvZywgKGEsbGV2ZWwpPT57XHJcblx0XHRcdFx0bGV2ZWw9cGFyc2VJbnQobGV2ZWwpLTFcclxuXHRcdFx0XHRpZihsZXZlbD09cGFyc2VJbnQodGhpcy5yYXcuJC5pbHZsKSl7XHJcblx0XHRcdFx0XHRsZXQgc3RhcnQ9cGFyc2VJbnQodGhpcy5nZXQoXCJzdGFydFwiKSlcclxuXHRcdFx0XHRcdGxldCBudW1GbXQ9dGhpcy5nZXQoXCJudW1GbXRcIilcclxuXHRcdFx0XHRcdHJldHVybiAoTlVNRk1UW251bUZtdF18fE5VTUZNVFsnZGVjaW1hbCddKShzdGFydCt0aGlzLmN1cnJlbnQpXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmJhc2VkT24ubGV2ZWwobGV2ZWwpLmdldExhYmVsKHRoaXMuY3VycmVudClcclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmN1cnJlbnQrK1xyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG59XHJcblxyXG5jb25zdCBOVU1GTVQ9e1xyXG5cdGRlY2ltYWwobil7XHJcblx0XHRyZXR1cm4gblxyXG5cdH0sXHJcblxyXG5cdGxvd2VyTGV0dGVyKG4pe1xyXG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoXCJhXCIuY2hhckNvZGVBdCgwKStuLTEpXHJcblx0fVxyXG59XHJcbiJdfQ==