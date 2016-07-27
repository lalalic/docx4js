"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlObject = require("../../xmlObject");

var _base = require("./style/base");

var _base2 = _interopRequireDefault(_base);

var _table = require("./style/table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styles = function () {
	function Styles(styles, numbering) {
		var _this = this;

		_classCallCheck(this, Styles);

		styles.get('styles.style').forEach(function (a) {
			a = (0, _xmlObject.getable)(a);
			var type = a.get('$.type');
			var id = a.get('$.styleId');
			var isDefault = a.get('$.default');

			var style = _this[id] = new Styles[type](a, _this);
			if (isDefault) _this[type + "_default"] = style;
		});

		var docDefault = styles.get('styles.docDefaults');
		this['document_default'] = new _base2.default({
			'pPr': docDefault.get('pPrDefault.pPr'),
			'rPr': docDefault.get('rPrDefault.rPr')
		}, this);

		this.numbering = new Numberings(numbering, this);
	}

	_createClass(Styles, [{
		key: "getDefault",
		value: function getDefault(type) {
			return this[type + "_default"];
		}
	}, {
		key: "createDirectStyle",
		value: function createDirectStyle(pr, type) {
			switch (type) {
				case 'pPr':
					if (pr.get('numPr') == undefined) return new Styles.paragraph({ pPr: pr }, this, 'pPr.pStyle');else return new Styles.numbering({ pPr: pr }, this, 'pPr.pStyle');
					break;
				case 'rPr':
					return new Styles.character({ rPr: pr }, this, 'rPr.rStyle');
					break;
				case 'tblPr':
					return new Styles.table({ tblPr: pr }, this, 'tblPr.tblStyle');
					break;
				case 'tcPr':
					return new Styles.table({ tcPr: pr });
				case 'trPr':
					return new Styles.table({ trPr: pr });
				case 'tblPrEx':
					return new Styles.table({ tblPrEx: pr });
				default:
					return pr;
			}
		}
	}]);

	return Styles;
}();

Styles.paragraph = _base2.default;
Styles.character = _base2.default;
Styles.table = _table2.default;

Styles.numbering = function (_Styles$paragraph) {
	_inherits(numbering, _Styles$paragraph);

	function numbering() {
		_classCallCheck(this, numbering);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(numbering).apply(this, arguments));

		_this2.numId = _this2.raw.get('pPr.numPr.numId');
		_this2.level = _this2.raw.get('pPr.numPr.ilvl');
		return _this2;
	}

	_createClass(numbering, [{
		key: "get",
		value: function get(path, id, level) {
			if (path.substr(0, 3) == 'rPr') return _get(Object.getPrototypeOf(numbering.prototype), "get", this).call(this, path);

			var value = this.styles.numbering.get(path, id || this.numId, level || this.level);
			if (value == undefined) return _get(Object.getPrototypeOf(numbering.prototype), "get", this).apply(this, arguments);
			return value;
		}
	}]);

	return numbering;
}(Styles.paragraph);

exports.default = Styles;

var Numberings = function () {
	function Numberings(numbering, styles) {
		var _this3 = this;

		_classCallCheck(this, Numberings);

		this.num = {};
		numbering.get('numbering.num').forEach(function (num) {
			var id = num.$.numId;
			_this3.num[id] = new NumStyle(num, styles, _this3);
		});

		this.abstractNum = {};
		numbering.get("numbering.abstractNum").forEach(function (def) {
			var id = def.$.abstractNumId;
			def.lvl.forEach(function (level) {
				_this3.abstractNum[id + "." + level.$.ilvl] = new _base2.default(level, styles, null);
			});
		});
	}

	_createClass(Numberings, [{
		key: "get",
		value: function get(path, numId, level) {
			return this.num[numId].get(path, level);
		}
	}]);

	return Numberings;
}();

var NumStyle = function (_Style) {
	_inherits(NumStyle, _Style);

	function NumStyle(style, styles, numberings) {
		_classCallCheck(this, NumStyle);

		var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(NumStyle).call(this, style, styles, null));

		_this4.numberings = numberings;
		_this4.abstractNumId = style.get("abstractNumId");(style.get('lvlOverride') || []).forEach(function (a) {
			var level = a.$.ilvl;
			var lvl = a.get('lvl') || { lvl: { $: { ilvl: level } } },
			    startOverride = a.get('startOverride');
			if (startOverride) lvl.lvl.start = { $: { val: startOverride } };

			_this4[level] = new _base2.default(lvl, styles, null);
		});
		return _this4;
	}

	_createClass(NumStyle, [{
		key: "get",
		value: function get(path, level) {
			var value = undefined,
			    style = this[level];
			if (style) value = style.get(path);

			if (value == undefined && (style = this.numberings.abstractNum[this.abstractNumId + "." + level])) value = style.get(path);
			return value;
		}
	}]);

	return NumStyle;
}(_base2.default);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxNQUFaLEVBQW9CLFNBQXBCLEVBQThCOzs7d0JBRFYsUUFDVTs7QUFDN0IsU0FBTyxHQUFQLENBQVcsY0FBWCxFQUEyQixPQUEzQixDQUFtQyxhQUFHO0FBQ3JDLE9BQUUsd0JBQVEsQ0FBUixDQUFGLENBRHFDO0FBRXJDLE9BQUksT0FBSyxFQUFFLEdBQUYsQ0FBTSxRQUFOLENBQUwsQ0FGaUM7QUFHckMsT0FBSSxLQUFHLEVBQUUsR0FBRixDQUFNLFdBQU4sQ0FBSCxDQUhpQztBQUlyQyxPQUFJLFlBQVUsRUFBRSxHQUFGLENBQU0sV0FBTixDQUFWLENBSmlDOztBQU1yQyxPQUFJLFFBQU0sTUFBSyxFQUFMLElBQVMsSUFBSSxPQUFPLElBQVAsQ0FBSixDQUFpQixDQUFqQixRQUFULENBTjJCO0FBT3JDLE9BQUcsU0FBSCxFQUNDLE1BQVEsaUJBQVIsSUFBd0IsS0FBeEIsQ0FERDtHQVBrQyxDQUFuQyxDQUQ2Qjs7QUFZN0IsTUFBSSxhQUFXLE9BQU8sR0FBUCxDQUFXLG9CQUFYLENBQVgsQ0FaeUI7QUFhN0IsT0FBSyxrQkFBTCxJQUF5QixtQkFBVTtBQUNsQyxVQUFNLFdBQVcsR0FBWCxDQUFlLGdCQUFmLENBQU47QUFDQSxVQUFNLFdBQVcsR0FBWCxDQUFlLGdCQUFmLENBQU47R0FGd0IsRUFHdEIsSUFIc0IsQ0FBekIsQ0FiNkI7O0FBa0I3QixPQUFLLFNBQUwsR0FBZSxJQUFJLFVBQUosQ0FBZSxTQUFmLEVBQXlCLElBQXpCLENBQWYsQ0FsQjZCO0VBQTlCOztjQURvQjs7NkJBc0JULE1BQUs7QUFDZixVQUFPLEtBQVEsaUJBQVIsQ0FBUCxDQURlOzs7O29DQUlFLElBQUksTUFBSztBQUMxQixXQUFPLElBQVA7QUFD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LEtBQUgsRUFDQyxRQUFNLE1BQU0sR0FBTixDQUFVLElBQVYsQ0FBTixDQUREOztBQUdBLE9BQUcsU0FBTyxTQUFQLEtBQXFCLFFBQU0sS0FBSyxVQUFMLENBQWdCLFdBQWhCLENBQStCLEtBQUssYUFBTCxTQUFzQixLQUFyRCxDQUFOLENBQXJCLEVBQ0YsUUFBTSxNQUFNLEdBQU4sQ0FBVSxJQUFWLENBQU4sQ0FERDtBQUVBLFVBQU8sS0FBUCxDQVBjOzs7O1FBZlYiLCJmaWxlIjoic3R5bGVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi4vLi4veG1sT2JqZWN0XCJcclxuaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlL2Jhc2VcIlxyXG5pbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZXN7XHJcblx0Y29uc3RydWN0b3Ioc3R5bGVzLCBudW1iZXJpbmcpe1xyXG5cdFx0c3R5bGVzLmdldCgnc3R5bGVzLnN0eWxlJykuZm9yRWFjaChhPT57XHJcblx0XHRcdGE9Z2V0YWJsZShhKVxyXG5cdFx0XHRsZXQgdHlwZT1hLmdldCgnJC50eXBlJylcclxuXHRcdFx0bGV0IGlkPWEuZ2V0KCckLnN0eWxlSWQnKVxyXG5cdFx0XHRsZXQgaXNEZWZhdWx0PWEuZ2V0KCckLmRlZmF1bHQnKVxyXG5cclxuXHRcdFx0bGV0IHN0eWxlPXRoaXNbaWRdPW5ldyBTdHlsZXNbdHlwZV0oYSx0aGlzKVxyXG5cdFx0XHRpZihpc0RlZmF1bHQpXHJcblx0XHRcdFx0dGhpc1tgJHt0eXBlfV9kZWZhdWx0YF09c3R5bGVcclxuXHRcdH0pXHJcblxyXG5cdFx0bGV0IGRvY0RlZmF1bHQ9c3R5bGVzLmdldCgnc3R5bGVzLmRvY0RlZmF1bHRzJylcclxuXHRcdHRoaXNbJ2RvY3VtZW50X2RlZmF1bHQnXT1uZXcgU3R5bGUoe1xyXG5cdFx0XHQncFByJzpkb2NEZWZhdWx0LmdldCgncFByRGVmYXVsdC5wUHInKSxcclxuXHRcdFx0J3JQcic6ZG9jRGVmYXVsdC5nZXQoJ3JQckRlZmF1bHQuclByJylcclxuXHRcdH0sIHRoaXMpXHJcblx0XHRcclxuXHRcdHRoaXMubnVtYmVyaW5nPW5ldyBOdW1iZXJpbmdzKG51bWJlcmluZyx0aGlzKVxyXG5cdH1cclxuXHJcblx0Z2V0RGVmYXVsdCh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlRGlyZWN0U3R5bGUocHIsIHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAncFByJzpcclxuXHRcdFx0aWYocHIuZ2V0KCdudW1QcicpPT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMucGFyYWdyYXBoKHtwUHI6cHJ9LCB0aGlzLCAncFByLnBTdHlsZScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5udW1iZXJpbmcoe3BQcjpwcn0sIHRoaXMsICdwUHIucFN0eWxlJylcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdyUHInOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5jaGFyYWN0ZXIoe3JQcjpwcn0sIHRoaXMsICdyUHIuclN0eWxlJylcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICd0YmxQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0YmxQcjpwcn0sIHRoaXMsICd0YmxQci50YmxTdHlsZScpXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSAndGNQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0Y1ByOnByfSlcclxuXHRcdGNhc2UgJ3RyUHInOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy50YWJsZSh7dHJQcjpwcn0pXHJcblx0XHRjYXNlICd0YmxQckV4JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RibFByRXg6cHJ9KVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHByXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyYWdyYXBoPVN0eWxlXHJcblxyXG5cdHN0YXRpYyBjaGFyYWN0ZXI9U3R5bGVcclxuXHRcclxuXHRzdGF0aWMgdGFibGU9VGFibGVTdHlsZVxyXG5cclxuXHRzdGF0aWMgbnVtYmVyaW5nPWNsYXNzIG51bWJlcmluZyBleHRlbmRzIFN0eWxlcy5wYXJhZ3JhcGh7XHJcblx0XHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRcdHRoaXMubnVtSWQ9dGhpcy5yYXcuZ2V0KCdwUHIubnVtUHIubnVtSWQnKVxyXG5cdFx0XHR0aGlzLmxldmVsPXRoaXMucmF3LmdldCgncFByLm51bVByLmlsdmwnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRnZXQocGF0aCxpZCxsZXZlbCl7XHJcblx0XHRcdGlmKHBhdGguc3Vic3RyKDAsMyk9PSdyUHInKVxyXG5cdFx0XHRcdHJldHVybiBzdXBlci5nZXQocGF0aClcclxuXHRcdFx0XHRcclxuXHRcdFx0bGV0IHZhbHVlPXRoaXMuc3R5bGVzLm51bWJlcmluZy5nZXQocGF0aCwgaWR8fHRoaXMubnVtSWQsbGV2ZWx8fHRoaXMubGV2ZWwpXHJcblx0XHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIHN1cGVyLmdldCguLi5hcmd1bWVudHMpXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuXHJcbmNsYXNzIE51bWJlcmluZ3N7XHJcblx0Y29uc3RydWN0b3IobnVtYmVyaW5nLCBzdHlsZXMpe1xyXG5cdFx0dGhpcy5udW09e31cclxuXHRcdG51bWJlcmluZy5nZXQoJ251bWJlcmluZy5udW0nKS5mb3JFYWNoKG51bT0+e1xyXG5cdFx0XHRsZXQgaWQ9bnVtLiQubnVtSWRcclxuXHRcdFx0dGhpcy5udW1baWRdPW5ldyBOdW1TdHlsZShudW0sc3R5bGVzLHRoaXMpXHJcblx0XHR9KVxyXG5cdFx0XHRcclxuXHRcdHRoaXMuYWJzdHJhY3ROdW09e31cclxuXHRcdG51bWJlcmluZy5nZXQoXCJudW1iZXJpbmcuYWJzdHJhY3ROdW1cIikuZm9yRWFjaChkZWY9PntcclxuXHRcdFx0bGV0IGlkPWRlZi4kLmFic3RyYWN0TnVtSWRcclxuXHRcdFx0ZGVmLmx2bC5mb3JFYWNoKGxldmVsPT57XHJcblx0XHRcdFx0dGhpcy5hYnN0cmFjdE51bVtgJHtpZH0uJHtsZXZlbC4kLmlsdmx9YF09bmV3IFN0eWxlKGxldmVsLHN0eWxlcyxudWxsKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0Z2V0KHBhdGgsbnVtSWQsIGxldmVsKXtcclxuXHRcdHJldHVybiB0aGlzLm51bVtudW1JZF0uZ2V0KHBhdGgsbGV2ZWwpXHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBOdW1TdHlsZSBleHRlbmRzIFN0eWxle1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlLCBzdHlsZXMsIG51bWJlcmluZ3Mpe1xyXG5cdFx0c3VwZXIoc3R5bGUsc3R5bGVzLCBudWxsKVxyXG5cdFx0dGhpcy5udW1iZXJpbmdzPW51bWJlcmluZ3NcclxuXHRcdHRoaXMuYWJzdHJhY3ROdW1JZD1zdHlsZS5nZXQoXCJhYnN0cmFjdE51bUlkXCIpXHJcblx0XHQ7KHN0eWxlLmdldCgnbHZsT3ZlcnJpZGUnKXx8W10pLmZvckVhY2goYT0+e1xyXG5cdFx0XHRsZXQgbGV2ZWw9YS4kLmlsdmxcclxuXHRcdFx0bGV0IGx2bD1hLmdldCgnbHZsJyl8fHtsdmw6eyQ6e2lsdmw6bGV2ZWx9fX0sIHN0YXJ0T3ZlcnJpZGU9YS5nZXQoJ3N0YXJ0T3ZlcnJpZGUnKVxyXG5cdFx0XHRpZihzdGFydE92ZXJyaWRlKVxyXG5cdFx0XHRcdGx2bC5sdmwuc3RhcnQ9eyQ6e3ZhbDpzdGFydE92ZXJyaWRlfX1cclxuXHRcdFx0XHJcblx0XHRcdHRoaXNbbGV2ZWxdPW5ldyBTdHlsZShsdmwsc3R5bGVzLG51bGwpXHJcblx0XHR9KVxyXG5cdH1cclxuXHRcclxuXHRnZXQocGF0aCxsZXZlbCl7XHJcblx0XHRsZXQgdmFsdWU9dW5kZWZpbmVkLCBzdHlsZT10aGlzW2xldmVsXVxyXG5cdFx0aWYoc3R5bGUpXHJcblx0XHRcdHZhbHVlPXN0eWxlLmdldChwYXRoKVxyXG5cdFx0XHJcblx0XHRpZih2YWx1ZT09dW5kZWZpbmVkICYmIChzdHlsZT10aGlzLm51bWJlcmluZ3MuYWJzdHJhY3ROdW1bYCR7dGhpcy5hYnN0cmFjdE51bUlkfS4ke2xldmVsfWBdKSlcclxuXHRcdFx0dmFsdWU9c3R5bGUuZ2V0KHBhdGgpXHJcblx0XHRyZXR1cm4gdmFsdWVcdFxyXG5cdH1cclxufVxyXG4iXX0=