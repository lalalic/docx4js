"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xmlObject = require("../../xmlObject");

var _base = require("./style/base");

var _base2 = _interopRequireDefault(_base);

var _table = require("./style/table");

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Styles = function () {
	function Styles(styles) {
		var _this = this;

		_classCallCheck(this, Styles);

		this.styles = styles;
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
					return new Styles.paragraph({ pPr: pr }, this, 'pPr.pStyle');
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
Styles.numbering = _base2.default;
Styles.table = _table2.default;
exports.default = Styles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxNQUFaLEVBQW1COzs7d0JBREMsUUFDRDs7QUFDbEIsT0FBSyxNQUFMLEdBQVksTUFBWixDQURrQjtBQUVsQixTQUFPLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLE9BQTNCLENBQW1DLGFBQUc7QUFDckMsT0FBRSx3QkFBUSxDQUFSLENBQUYsQ0FEcUM7QUFFckMsT0FBSSxPQUFLLEVBQUUsR0FBRixDQUFNLFFBQU4sQ0FBTCxDQUZpQztBQUdyQyxPQUFJLEtBQUcsRUFBRSxHQUFGLENBQU0sV0FBTixDQUFILENBSGlDO0FBSXJDLE9BQUksWUFBVSxFQUFFLEdBQUYsQ0FBTSxXQUFOLENBQVYsQ0FKaUM7O0FBTXJDLE9BQUksUUFBTSxNQUFLLEVBQUwsSUFBUyxJQUFJLE9BQU8sSUFBUCxDQUFKLENBQWlCLENBQWpCLFFBQVQsQ0FOMkI7QUFPckMsT0FBRyxTQUFILEVBQ0MsTUFBUSxpQkFBUixJQUF3QixLQUF4QixDQUREO0dBUGtDLENBQW5DLENBRmtCOztBQWFsQixNQUFJLGFBQVcsT0FBTyxHQUFQLENBQVcsb0JBQVgsQ0FBWCxDQWJjO0FBY2xCLE9BQUssa0JBQUwsSUFBeUIsbUJBQVU7QUFDbEMsVUFBTSxXQUFXLEdBQVgsQ0FBZSxnQkFBZixDQUFOO0FBQ0EsVUFBTSxXQUFXLEdBQVgsQ0FBZSxnQkFBZixDQUFOO0dBRndCLEVBR3RCLElBSHNCLENBQXpCLENBZGtCO0VBQW5COztjQURvQjs7NkJBcUJULE1BQUs7QUFDZixVQUFPLEtBQVEsaUJBQVIsQ0FBUCxDQURlOzs7O29DQUlFLElBQUksTUFBSztBQUMxQixXQUFPLElBQVA7QUFDQSxTQUFLLEtBQUw7QUFDQyxZQUFPLElBQUksT0FBTyxTQUFQLENBQWlCLEVBQUMsS0FBSSxFQUFKLEVBQXRCLEVBQStCLElBQS9CLEVBQXFDLFlBQXJDLENBQVAsQ0FERDtBQUVBLFdBRkE7QUFEQSxTQUlLLEtBQUw7QUFDQyxZQUFPLElBQUksT0FBTyxTQUFQLENBQWlCLEVBQUMsS0FBSSxFQUFKLEVBQXRCLEVBQStCLElBQS9CLEVBQXFDLFlBQXJDLENBQVAsQ0FERDtBQUVBLFdBRkE7QUFKQSxTQU9LLE9BQUw7QUFDQyxZQUFPLElBQUksT0FBTyxLQUFQLENBQWEsRUFBQyxPQUFNLEVBQU4sRUFBbEIsRUFBNkIsSUFBN0IsRUFBbUMsZ0JBQW5DLENBQVAsQ0FERDtBQUVBLFdBRkE7QUFQQSxTQVVLLE1BQUw7QUFDQyxZQUFPLElBQUksT0FBTyxLQUFQLENBQWEsRUFBQyxNQUFLLEVBQUwsRUFBbEIsQ0FBUCxDQUREO0FBVkEsU0FZSyxNQUFMO0FBQ0MsWUFBTyxJQUFJLE9BQU8sS0FBUCxDQUFhLEVBQUMsTUFBSyxFQUFMLEVBQWxCLENBQVAsQ0FERDtBQVpBLFNBY0ssU0FBTDtBQUNDLFlBQU8sSUFBSSxPQUFPLEtBQVAsQ0FBYSxFQUFDLFNBQVEsRUFBUixFQUFsQixDQUFQLENBREQ7QUFkQTtBQWlCQyxZQUFPLEVBQVAsQ0FERDtBQWhCQSxJQUQwQjs7OztRQXpCUDs7O09BK0NiO0FBL0NhLE9BaURiO0FBakRhLE9BbURiO0FBbkRhLE9BcURiO2tCQXJEYSIsImZpbGUiOiJzdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi94bWxPYmplY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvYmFzZVwiXHJcbmltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMpe1xyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0XHRzdHlsZXMuZ2V0KCdzdHlsZXMuc3R5bGUnKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHRsZXQgaWQ9YS5nZXQoJyQuc3R5bGVJZCcpXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9YS5nZXQoJyQuZGVmYXVsdCcpXHJcblxyXG5cdFx0XHRsZXQgc3R5bGU9dGhpc1tpZF09bmV3IFN0eWxlc1t0eXBlXShhLHRoaXMpXHJcblx0XHRcdGlmKGlzRGVmYXVsdClcclxuXHRcdFx0XHR0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXT1zdHlsZVxyXG5cdFx0fSlcclxuXHJcblx0XHRsZXQgZG9jRGVmYXVsdD1zdHlsZXMuZ2V0KCdzdHlsZXMuZG9jRGVmYXVsdHMnKVxyXG5cdFx0dGhpc1snZG9jdW1lbnRfZGVmYXVsdCddPW5ldyBTdHlsZSh7XHJcblx0XHRcdCdwUHInOmRvY0RlZmF1bHQuZ2V0KCdwUHJEZWZhdWx0LnBQcicpLFxyXG5cdFx0XHQnclByJzpkb2NEZWZhdWx0LmdldCgnclByRGVmYXVsdC5yUHInKVxyXG5cdFx0fSwgdGhpcylcclxuXHR9XHJcblxyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpc1tgJHt0eXBlfV9kZWZhdWx0YF1cclxuXHR9XHJcblxyXG5cdGNyZWF0ZURpcmVjdFN0eWxlKHByLCB0eXBlKXtcclxuXHRcdHN3aXRjaCh0eXBlKXtcclxuXHRcdGNhc2UgJ3BQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnBhcmFncmFwaCh7cFByOnByfSwgdGhpcywgJ3BQci5wU3R5bGUnKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3JQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLmNoYXJhY3Rlcih7clByOnByfSwgdGhpcywgJ3JQci5yU3R5bGUnKVxyXG5cdFx0YnJlYWtcclxuXHRcdGNhc2UgJ3RibFByJzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RibFByOnByfSwgdGhpcywgJ3RibFByLnRibFN0eWxlJylcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICd0Y1ByJzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RjUHI6cHJ9KVxyXG5cdFx0Y2FzZSAndHJQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0clByOnByfSlcclxuXHRcdGNhc2UgJ3RibFByRXgnOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy50YWJsZSh7dGJsUHJFeDpwcn0pXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gcHJcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwYXJhZ3JhcGg9U3R5bGVcclxuXHJcblx0c3RhdGljIGNoYXJhY3Rlcj1TdHlsZVxyXG5cclxuXHRzdGF0aWMgbnVtYmVyaW5nPVN0eWxlXHJcblxyXG5cdHN0YXRpYyB0YWJsZT1UYWJsZVN0eWxlXHJcbn1cclxuIl19