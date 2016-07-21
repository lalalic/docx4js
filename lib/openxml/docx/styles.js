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
			'w:pPr': docDefault.get('pPrDefault'),
			'w:rPr': docDefault.get('rPrDefault')
		}, this);
	}

	_createClass(Styles, [{
		key: "getDefault",
		value: function getDefault(type) {
			return this[type + "_default"];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxNQUFaLEVBQW1COzs7d0JBREMsUUFDRDs7QUFDbEIsT0FBSyxNQUFMLEdBQVksTUFBWixDQURrQjtBQUVsQixTQUFPLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLE9BQTNCLENBQW1DLGFBQUc7QUFDckMsT0FBRSx3QkFBUSxDQUFSLENBQUYsQ0FEcUM7QUFFckMsT0FBSSxPQUFLLEVBQUUsR0FBRixDQUFNLFFBQU4sQ0FBTCxDQUZpQztBQUdyQyxPQUFJLEtBQUcsRUFBRSxHQUFGLENBQU0sV0FBTixDQUFILENBSGlDO0FBSXJDLE9BQUksWUFBVSxFQUFFLEdBQUYsQ0FBTSxXQUFOLENBQVYsQ0FKaUM7O0FBTXJDLE9BQUksUUFBTSxNQUFLLEVBQUwsSUFBUyxJQUFJLE9BQU8sSUFBUCxDQUFKLENBQWlCLENBQWpCLFFBQVQsQ0FOMkI7QUFPckMsT0FBRyxTQUFILEVBQ0MsTUFBUSxpQkFBUixJQUF3QixLQUF4QixDQUREO0dBUGtDLENBQW5DLENBRmtCOztBQWFsQixNQUFJLGFBQVcsT0FBTyxHQUFQLENBQVcsb0JBQVgsQ0FBWCxDQWJjO0FBY2xCLE9BQUssa0JBQUwsSUFBeUIsbUJBQVU7QUFDbEMsWUFBUSxXQUFXLEdBQVgsQ0FBZSxZQUFmLENBQVI7QUFDQSxZQUFRLFdBQVcsR0FBWCxDQUFlLFlBQWYsQ0FBUjtHQUZ3QixFQUd0QixJQUhzQixDQUF6QixDQWRrQjtFQUFuQjs7Y0FEb0I7OzZCQXFCVCxNQUFLO0FBQ2YsVUFBTyxLQUFRLGlCQUFSLENBQVAsQ0FEZTs7OztRQXJCSTs7O09BeUJiO0FBekJhLE9BMkJiO0FBM0JhLE9BNkJiO0FBN0JhLE9BK0JiO2tCQS9CYSIsImZpbGUiOiJzdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi94bWxPYmplY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvYmFzZVwiXHJcbmltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMpe1xyXG5cdFx0dGhpcy5zdHlsZXM9c3R5bGVzXHJcblx0XHRzdHlsZXMuZ2V0KCdzdHlsZXMuc3R5bGUnKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHRsZXQgaWQ9YS5nZXQoJyQuc3R5bGVJZCcpXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9YS5nZXQoJyQuZGVmYXVsdCcpXHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgc3R5bGU9dGhpc1tpZF09bmV3IFN0eWxlc1t0eXBlXShhLHRoaXMpXHJcblx0XHRcdGlmKGlzRGVmYXVsdClcclxuXHRcdFx0XHR0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXT1zdHlsZVxyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0bGV0IGRvY0RlZmF1bHQ9c3R5bGVzLmdldCgnc3R5bGVzLmRvY0RlZmF1bHRzJylcclxuXHRcdHRoaXNbJ2RvY3VtZW50X2RlZmF1bHQnXT1uZXcgU3R5bGUoe1xyXG5cdFx0XHQndzpwUHInOmRvY0RlZmF1bHQuZ2V0KCdwUHJEZWZhdWx0JyksXHJcblx0XHRcdCd3OnJQcic6ZG9jRGVmYXVsdC5nZXQoJ3JQckRlZmF1bHQnKVxyXG5cdFx0fSwgdGhpcylcclxuXHR9XHJcblx0XHJcblx0Z2V0RGVmYXVsdCh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXVxyXG5cdH1cclxuXHRcclxuXHRzdGF0aWMgcGFyYWdyYXBoPVN0eWxlXHJcblx0XHJcblx0c3RhdGljIGNoYXJhY3Rlcj1TdHlsZVxyXG5cdFxyXG5cdHN0YXRpYyBudW1iZXJpbmc9U3R5bGVcclxuXHRcclxuXHRzdGF0aWMgdGFibGU9VGFibGVTdHlsZVxyXG59XHJcblxyXG4iXX0=