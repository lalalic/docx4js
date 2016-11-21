"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _xmlObject = require("../../xmlObject");

var _base = require("./style/base");

var _base2 = _interopRequireDefault(_base);

var _table = require("./style/table");

var _table2 = _interopRequireDefault(_table);

var _numbering = require("./style/numbering");

var _numbering2 = _interopRequireDefault(_numbering);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = function () {
	function Styles(styles, numbering) {
		var _this = this;

		(0, _classCallCheck3.default)(this, Styles);

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

		this.numberings = new _numbering2.default(numbering, this);
	}

	(0, _createClass3.default)(Styles, [{
		key: "getDefault",
		value: function getDefault(type) {
			return this[type + "_default"];
		}
	}, {
		key: "createDirectStyle",
		value: function createDirectStyle(pr, type) {
			if (!pr) pr = {};
			if (!pr.get) pr = (0, _xmlObject.getable)(pr);

			switch (type) {
				case 'pPr':
					if (pr.get('numPr') == undefined) return new Styles.paragraph({ pPr: pr }, this, 'pPr.pStyle');else return new Styles.numbering({ pPr: pr }, this, 'pPr.pStyle');
				case 'rPr':
					return new Styles.character({ rPr: pr }, this, 'rPr.rStyle');
				case 'tblPr':
					return new Styles.table({ tblPr: pr }, this, 'tblPr.tblStyle');
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
	(0, _inherits3.default)(numbering, _Styles$paragraph);

	function numbering() {
		(0, _classCallCheck3.default)(this, numbering);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (numbering.__proto__ || (0, _getPrototypeOf2.default)(numbering)).apply(this, arguments));

		_this2.numId = _this2.raw.get('pPr.numPr.numId');
		_this2.level = _this2.raw.get('pPr.numPr.ilvl');
		return _this2;
	}

	(0, _createClass3.default)(numbering, [{
		key: "get",
		value: function get(path, id, level) {
			var value = undefined;

			if (path == "label") {
				return this.styles.numberings.get(path, id || this.numId, level || this.level);
			} else if (path.substr(0, 6) == 'label.') {
				value = this.styles.numberings.get(path.substr(6), id || this.numId, level || this.level);
				if (value == undefined) return (0, _get3.default)(numbering.prototype.__proto__ || (0, _getPrototypeOf2.default)(numbering.prototype), "get", this).call(this, path.substr(6), id || this.numId, level || this.level);
			} else {
				if (path.substr(0, 3) == 'rPr') return (0, _get3.default)(numbering.prototype.__proto__ || (0, _getPrototypeOf2.default)(numbering.prototype), "get", this).call(this, path);

				value = this.styles.numberings.get(path, id || this.numId, level || this.level);

				if (value == undefined) value = (0, _get3.default)(numbering.prototype.__proto__ || (0, _getPrototypeOf2.default)(numbering.prototype), "get", this).apply(this, arguments);
			}
			return value;
		}
	}]);
	return numbering;
}(Styles.paragraph);

exports.default = Styles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbIlN0eWxlcyIsInN0eWxlcyIsIm51bWJlcmluZyIsImdldCIsImZvckVhY2giLCJhIiwidHlwZSIsImlkIiwiaXNEZWZhdWx0Iiwic3R5bGUiLCJkb2NEZWZhdWx0IiwibnVtYmVyaW5ncyIsInByIiwidW5kZWZpbmVkIiwicGFyYWdyYXBoIiwicFByIiwiY2hhcmFjdGVyIiwiclByIiwidGFibGUiLCJ0YmxQciIsInRjUHIiLCJ0clByIiwidGJsUHJFeCIsImFyZ3VtZW50cyIsIm51bUlkIiwicmF3IiwibGV2ZWwiLCJwYXRoIiwidmFsdWUiLCJzdWJzdHIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRXFCQSxNO0FBQ3BCLGlCQUFZQyxNQUFaLEVBQW9CQyxTQUFwQixFQUE4QjtBQUFBOztBQUFBOztBQUM3QkQsU0FBT0UsR0FBUCxDQUFXLGNBQVgsRUFBMkJDLE9BQTNCLENBQW1DLGFBQUc7QUFDckNDLE9BQUUsd0JBQVFBLENBQVIsQ0FBRjtBQUNBLE9BQUlDLE9BQUtELEVBQUVGLEdBQUYsQ0FBTSxRQUFOLENBQVQ7QUFDQSxPQUFJSSxLQUFHRixFQUFFRixHQUFGLENBQU0sV0FBTixDQUFQO0FBQ0EsT0FBSUssWUFBVUgsRUFBRUYsR0FBRixDQUFNLFdBQU4sQ0FBZDs7QUFFQSxPQUFJTSxRQUFNLE1BQUtGLEVBQUwsSUFBUyxJQUFJUCxPQUFPTSxJQUFQLENBQUosQ0FBaUJELENBQWpCLFFBQW5CO0FBQ0EsT0FBR0csU0FBSCxFQUNDLE1BQVFGLElBQVIsaUJBQXdCRyxLQUF4QjtBQUNELEdBVEQ7O0FBV0EsTUFBSUMsYUFBV1QsT0FBT0UsR0FBUCxDQUFXLG9CQUFYLENBQWY7QUFDQSxPQUFLLGtCQUFMLElBQXlCLG1CQUFVO0FBQ2xDLFVBQU1PLFdBQVdQLEdBQVgs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RCxJQUpLLE1BSUQ7QUFDSixRQUFHQyxLQUFLRSxNQUFMLENBQVksQ0FBWixFQUFjLENBQWQsS0FBa0IsS0FBckIsRUFDQyx1SUFBaUJGLElBQWpCOztBQUVEQyxZQUFNLEtBQUszQixNQUFMLENBQVlVLFVBQVosQ0FBdUJSLEdBQXZCLENBQTJCd0IsSUFBM0IsRUFBaUNwQixNQUFJLEtBQUtpQixLQUExQyxFQUFnREUsU0FBTyxLQUFLQSxLQUE1RCxDQUFOOztBQUVBLFFBQUdFLFNBQU9mLFNBQVYsRUFDQ2UseUlBQW1CTCxTQUFuQjtBQUNEO0FBQ0QsVUFBT0ssS0FBUDtBQUNBOzs7RUExQnVDNUIsT0FBT2MsUzs7a0JBM0Q1QmQsTSIsImZpbGUiOiJzdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi94bWxPYmplY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvYmFzZVwiXHJcbmltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcclxuaW1wb3J0IE51bWJlcmluZ3MgZnJvbSBcIi4vc3R5bGUvbnVtYmVyaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMsIG51bWJlcmluZyl7XHJcblx0XHRzdHlsZXMuZ2V0KCdzdHlsZXMuc3R5bGUnKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHRsZXQgaWQ9YS5nZXQoJyQuc3R5bGVJZCcpXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9YS5nZXQoJyQuZGVmYXVsdCcpXHJcblxyXG5cdFx0XHRsZXQgc3R5bGU9dGhpc1tpZF09bmV3IFN0eWxlc1t0eXBlXShhLHRoaXMpXHJcblx0XHRcdGlmKGlzRGVmYXVsdClcclxuXHRcdFx0XHR0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXT1zdHlsZVxyXG5cdFx0fSlcclxuXHJcblx0XHRsZXQgZG9jRGVmYXVsdD1zdHlsZXMuZ2V0KCdzdHlsZXMuZG9jRGVmYXVsdHMnKVxyXG5cdFx0dGhpc1snZG9jdW1lbnRfZGVmYXVsdCddPW5ldyBTdHlsZSh7XHJcblx0XHRcdCdwUHInOmRvY0RlZmF1bHQuZ2V0KCdwUHJEZWZhdWx0LnBQcicpLFxyXG5cdFx0XHQnclByJzpkb2NEZWZhdWx0LmdldCgnclByRGVmYXVsdC5yUHInKVxyXG5cdFx0fSwgdGhpcylcclxuXHRcdFxyXG5cdFx0dGhpcy5udW1iZXJpbmdzPW5ldyBOdW1iZXJpbmdzKG51bWJlcmluZyx0aGlzKVxyXG5cdH1cclxuXHJcblx0Z2V0RGVmYXVsdCh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlRGlyZWN0U3R5bGUocHIsIHR5cGUpe1xyXG5cdFx0aWYoIXByKVxyXG5cdFx0XHRwcj17fVxyXG5cdFx0aWYoIXByLmdldClcclxuXHRcdFx0cHI9Z2V0YWJsZShwcilcclxuXHJcblx0XHRzd2l0Y2godHlwZSl7XHJcblx0XHRjYXNlICdwUHInOlxyXG5cdFx0XHRpZihwci5nZXQoJ251bVByJyk9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5wYXJhZ3JhcGgoe3BQcjpwcn0sIHRoaXMsICdwUHIucFN0eWxlJylcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJldHVybiBuZXcgU3R5bGVzLm51bWJlcmluZyh7cFByOnByfSwgdGhpcywgJ3BQci5wU3R5bGUnKVxyXG5cdFx0Y2FzZSAnclByJzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMuY2hhcmFjdGVyKHtyUHI6cHJ9LCB0aGlzLCAnclByLnJTdHlsZScpXHJcblx0XHRjYXNlICd0YmxQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0YmxQcjpwcn0sIHRoaXMsICd0YmxQci50YmxTdHlsZScpXHJcblx0XHRjYXNlICd0Y1ByJzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RjUHI6cHJ9KVxyXG5cdFx0Y2FzZSAndHJQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0clByOnByfSlcclxuXHRcdGNhc2UgJ3RibFByRXgnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy50YWJsZSh7dGJsUHJFeDpwcn0pXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gcHJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwYXJhZ3JhcGg9U3R5bGVcclxuXHJcblx0c3RhdGljIGNoYXJhY3Rlcj1TdHlsZVxyXG5cdFxyXG5cdHN0YXRpYyB0YWJsZT1UYWJsZVN0eWxlXHJcblxyXG5cdHN0YXRpYyBudW1iZXJpbmc9Y2xhc3MgbnVtYmVyaW5nIGV4dGVuZHMgU3R5bGVzLnBhcmFncmFwaHtcclxuXHRcdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0dGhpcy5udW1JZD10aGlzLnJhdy5nZXQoJ3BQci5udW1Qci5udW1JZCcpXHJcblx0XHRcdHRoaXMubGV2ZWw9dGhpcy5yYXcuZ2V0KCdwUHIubnVtUHIuaWx2bCcpXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdGdldChwYXRoLGlkLGxldmVsKXtcclxuXHRcdFx0bGV0IHZhbHVlPXVuZGVmaW5lZFxyXG5cdFx0XHRcclxuXHRcdFx0aWYocGF0aD09XCJsYWJlbFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5zdHlsZXMubnVtYmVyaW5ncy5nZXQocGF0aCwgaWR8fHRoaXMubnVtSWQsbGV2ZWx8fHRoaXMubGV2ZWwpXHJcblx0XHRcdH1lbHNlIGlmKHBhdGguc3Vic3RyKDAsNik9PSdsYWJlbC4nKXtcclxuXHRcdFx0XHR2YWx1ZT10aGlzLnN0eWxlcy5udW1iZXJpbmdzLmdldChwYXRoLnN1YnN0cig2KSwgaWR8fHRoaXMubnVtSWQsbGV2ZWx8fHRoaXMubGV2ZWwpXHJcblx0XHRcdFx0aWYodmFsdWU9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdHJldHVybiBzdXBlci5nZXQocGF0aC5zdWJzdHIoNiksIGlkfHx0aGlzLm51bUlkLGxldmVsfHx0aGlzLmxldmVsKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRpZihwYXRoLnN1YnN0cigwLDMpPT0nclByJylcclxuXHRcdFx0XHRcdHJldHVybiBzdXBlci5nZXQocGF0aClcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdHZhbHVlPXRoaXMuc3R5bGVzLm51bWJlcmluZ3MuZ2V0KHBhdGgsIGlkfHx0aGlzLm51bUlkLGxldmVsfHx0aGlzLmxldmVsKVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHR2YWx1ZT1zdXBlci5nZXQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuIl19