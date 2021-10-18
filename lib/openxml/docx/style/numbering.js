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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbIk51bWJlcmluZ3MiLCJudW1iZXJpbmciLCJzdHlsZXMiLCJudW0iLCJhYnN0cmFjdE51bSIsImdldCIsImZvckVhY2giLCJpZCIsIiQiLCJudW1JZCIsIk51bVN0eWxlIiwiZGVmIiwiYWJzdHJhY3ROdW1JZCIsImx2bCIsImxldmVsIiwiaWx2bCIsIkxldmVsU3R5bGUiLCJudW1iZXJpbmdzIiwibnVtUGljQnVsbGV0IiwicGF0aCIsInN0eWxlIiwiYSIsInN0YXJ0T3ZlcnJpZGUiLCJzdGFydCIsInZhbCIsIk51bUxldmVsU3R5bGUiLCJTdHlsZSIsImJhc2VkT24iLCJhcmd1bWVudHMiLCJjdXJyZW50IiwiZ2V0TGFiZWwiLCJ2YWx1ZSIsInVuZGVmaW5lZCIsImx2bFBpY0J1bGxldElkIiwiRXJyb3IiLCJsdmxUZXh0IiwicmVwbGFjZSIsInBhcnNlSW50IiwicmF3IiwibnVtRm10IiwiTlVNRk1UIiwiZGVjaW1hbCIsIm4iLCJsb3dlckxldHRlciIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsImNoYXJDb2RlQXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVO0FBQ3BCLHFCQUFZQyxTQUFaLEVBQXVCQyxNQUF2QixFQUE4QjtBQUFBOztBQUFBOztBQUM3QixPQUFLQyxHQUFMLEdBQVMsRUFBVDtBQUNBLE9BQUtDLFdBQUwsR0FBaUIsRUFBakI7QUFDQSxNQUFHSCxTQUFILEVBQWE7QUFDWixJQUFDLENBQUNBLFVBQVVJLEdBQVYsQ0FBYyxlQUFkLEVBQThCLEtBQTlCLEtBQXNDLEVBQXZDLEVBQTJDQyxPQUEzQyxDQUFtRCxlQUFLO0FBQ3hELFFBQUlDLEtBQUdKLElBQUlLLENBQUosQ0FBTUMsS0FBYjtBQUNBLFVBQUtOLEdBQUwsQ0FBU0ksRUFBVCxJQUFhLElBQUlHLFFBQUosQ0FBYVAsR0FBYixF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QWYsSUFBa0JKLENBQWxCLEdBQW9CLENBQXhDLENBQVA7QUFDQTtBQVBXLENBQWIiLCJmaWxlIjoibnVtYmVyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gXCIuL2Jhc2VcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyaW5nc3tcclxuXHRjb25zdHJ1Y3RvcihudW1iZXJpbmcsIHN0eWxlcyl7XHJcblx0XHR0aGlzLm51bT17fVxyXG5cdFx0dGhpcy5hYnN0cmFjdE51bT17fVxyXG5cdFx0aWYobnVtYmVyaW5nKXtcclxuXHRcdFx0OyhudW1iZXJpbmcuZ2V0KCdudW1iZXJpbmcubnVtJyxmYWxzZSl8fFtdKS5mb3JFYWNoKG51bT0+e1xyXG5cdFx0XHRcdGxldCBpZD1udW0uJC5udW1JZFxyXG5cdFx0XHRcdHRoaXMubnVtW2lkXT1uZXcgTnVtU3R5bGUobnVtLHN0eWxlcyx0aGlzKVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQ7KG51bWJlcmluZy5nZXQoXCJudW1iZXJpbmcuYWJzdHJhY3ROdW1cIixmYWxzZSl8fFtdKS5mb3JFYWNoKGRlZj0+e1xuXHRcdFx0XHRsZXQgaWQ9ZGVmLiQuYWJzdHJhY3ROdW1JZFxyXG5cdFx0XHRcdGRlZi5sdmwuZm9yRWFjaChsZXZlbD0+e1xyXG5cdFx0XHRcdFx0dGhpcy5hYnN0cmFjdE51bVtgJHtpZH0uJHtsZXZlbC4kLmlsdmx9YF09bmV3IExldmVsU3R5bGUobGV2ZWwsc3R5bGVzLG51bGwsIHRoaXMubnVtYmVyaW5ncylcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cclxuXHRcdH1cclxuXHRcdHRoaXMubnVtUGljQnVsbGV0PXt9XHJcblxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgsbnVtSWQsIGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzLm51bVtudW1JZF0uZ2V0KHBhdGgsbGV2ZWwpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBOdW1TdHlsZSBleHRlbmRzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBzdHlsZXMsIG51bWJlcmluZ3Mpe1xyXG5cdFx0c3VwZXIoc3R5bGUsc3R5bGVzLCBudWxsKVxyXG5cdFx0dGhpcy5udW1iZXJpbmdzPW51bWJlcmluZ3NcclxuXHRcdHRoaXMuYWJzdHJhY3ROdW1JZD1zdHlsZS5nZXQoXCJhYnN0cmFjdE51bUlkXCIpXHJcblxyXG5cdFx0OyhzdHlsZS5nZXQoJ2x2bE92ZXJyaWRlJyl8fFtdKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0bGV0IGxldmVsPWEuJC5pbHZsXHJcblx0XHRcdGxldCBsdmw9YS5nZXQoJ2x2bCcpfHx7JDp7aWx2bDpsZXZlbH19LCBzdGFydE92ZXJyaWRlPWEuZ2V0KCdzdGFydE92ZXJyaWRlJylcclxuXHRcdFx0aWYoc3RhcnRPdmVycmlkZSlcclxuXHRcdFx0XHRsdmwuc3RhcnQ9eyQ6e3ZhbDpzdGFydE92ZXJyaWRlfX1cclxuXHJcblx0XHRcdHRoaXNbbGV2ZWxdPW5ldyBOdW1MZXZlbFN0eWxlKGx2bCx0aGlzLnN0eWxlcyxudWxsLCB0aGlzLm51bWJlcmluZ3MpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgsbGV2ZWwpe1xyXG5cdFx0cmV0dXJuIHRoaXMubGV2ZWwobGV2ZWwpLmdldChwYXRoKVxyXG5cdH1cclxuXHJcblx0bGV2ZWwobGV2ZWwpe1xyXG5cdFx0cmV0dXJuIHRoaXNbbGV2ZWxdIHx8ICh0aGlzW2xldmVsXT1uZXcgTnVtTGV2ZWxTdHlsZSh7JDp7aWx2bDpsZXZlbH19LHRoaXMuc3R5bGVzLGAke3RoaXMuYWJzdHJhY3ROdW1JZH0uJHtsZXZlbH1gLCB0aGlzLm51bWJlcmluZ3MpKVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgTGV2ZWxTdHlsZSBleHRlbmRzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLHN0eWxlcyxiYXNlZE9uLCBudW1iZXJpbmdzKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMubnVtYmVyaW5ncz1udW1iZXJpbmdzXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBOdW1MZXZlbFN0eWxlIGV4dGVuZHMgTGV2ZWxTdHlsZXtcclxuXHRjdXJyZW50PTBcclxuXHJcblx0Z2V0QmFzZWRPbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMubnVtYmVyaW5ncy5hYnN0cmFjdE51bVt0aGlzLmJhc2VkT25dXHJcblx0fVxyXG5cclxuXHRnZXQocGF0aCl7XHJcblx0XHRpZihwYXRoPT1cImxhYmVsXCIpXHJcblx0XHRcdHJldHVybiB0aGlzLmdldExhYmVsKClcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHN1cGVyLmdldChwYXRoKVxyXG5cdH1cclxuXHJcblx0Z2V0TGFiZWwoKXtcclxuXHRcdGxldCB2YWx1ZT11bmRlZmluZWRcclxuXHRcdGxldCBsdmxQaWNCdWxsZXRJZD10aGlzLmdldChcImx2bFBpY0J1bGxldElkXCIpXHJcblx0XHRpZihsdmxQaWNCdWxsZXRJZCE9dW5kZWZpbmVkKXtcclxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwicGljIGJ1bGxldCBub3Qgc3VwcG9ydGVkIHlldCFcIilcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgbHZsVGV4dD10aGlzLmdldChcImx2bFRleHRcIilcclxuXHJcblx0XHRcdHZhbHVlPWx2bFRleHQucmVwbGFjZSgvJShcXGQrKS9nLCAoYSxsZXZlbCk9PntcclxuXHRcdFx0XHRsZXZlbD1wYXJzZUludChsZXZlbCktMVxyXG5cdFx0XHRcdGlmKGxldmVsPT1wYXJzZUludCh0aGlzLnJhdy4kLmlsdmwpKXtcclxuXHRcdFx0XHRcdGxldCBzdGFydD1wYXJzZUludCh0aGlzLmdldChcInN0YXJ0XCIpKVxyXG5cdFx0XHRcdFx0bGV0IG51bUZtdD10aGlzLmdldChcIm51bUZtdFwiKVxyXG5cdFx0XHRcdFx0cmV0dXJuIChOVU1GTVRbbnVtRm10XXx8TlVNRk1UWydkZWNpbWFsJ10pKHN0YXJ0K3RoaXMuY3VycmVudClcclxuXHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuYmFzZWRPbi5sZXZlbChsZXZlbCkuZ2V0TGFiZWwodGhpcy5jdXJyZW50KVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuY3VycmVudCsrXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IE5VTUZNVD17XHJcblx0ZGVjaW1hbChuKXtcclxuXHRcdHJldHVybiBuXHJcblx0fSxcclxuXHJcblx0bG93ZXJMZXR0ZXIobil7XHJcblx0XHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcImFcIi5jaGFyQ29kZUF0KDApK24tMSlcclxuXHR9XHJcbn1cclxuIl19