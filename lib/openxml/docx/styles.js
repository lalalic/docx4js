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
	}]);

	return Styles;
}();

Styles.paragraph = _base2.default;
Styles.character = _base2.default;
Styles.numbering = _base2.default;
Styles.table = _table2.default;
exports.default = Styles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7SUFFcUI7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxNQUFaLEVBQW1COzs7d0JBREMsUUFDRDs7QUFDbEIsT0FBSyxNQUFMLEdBQVksTUFBWixDQURrQjtBQUVsQixTQUFPLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLE9BQTNCLENBQW1DLGFBQUc7QUFDckMsT0FBRSx3QkFBUSxDQUFSLENBQUYsQ0FEcUM7QUFFckMsT0FBSSxPQUFLLEVBQUUsR0FBRixDQUFNLFFBQU4sQ0FBTCxDQUZpQztBQUdyQyxPQUFJLEtBQUcsRUFBRSxHQUFGLENBQU0sV0FBTixDQUFILENBSGlDO0FBSXJDLE9BQUksWUFBVSxFQUFFLEdBQUYsQ0FBTSxXQUFOLENBQVYsQ0FKaUM7O0FBTXJDLE9BQUksUUFBTSxNQUFLLEVBQUwsSUFBUyxJQUFJLE9BQU8sSUFBUCxDQUFKLENBQWlCLENBQWpCLFFBQVQsQ0FOMkI7QUFPckMsT0FBRyxTQUFILEVBQ0MsTUFBUSxpQkFBUixJQUF3QixLQUF4QixDQUREO0dBUGtDLENBQW5DLENBRmtCOztBQWFsQixNQUFJLGFBQVcsT0FBTyxHQUFQLENBQVcsb0JBQVgsQ0FBWCxDQWJjO0FBY2xCLE9BQUssa0JBQUwsSUFBeUIsbUJBQVU7QUFDbEMsVUFBTSxXQUFXLEdBQVgsQ0FBZSxnQkFBZixDQUFOO0FBQ0EsVUFBTSxXQUFXLEdBQVgsQ0FBZSxnQkFBZixDQUFOO0dBRndCLEVBR3RCLElBSHNCLENBQXpCLENBZGtCO0VBQW5COztjQURvQjs7NkJBcUJULE1BQUs7QUFDZixVQUFPLEtBQVEsaUJBQVIsQ0FBUCxDQURlOzs7O1FBckJJOzs7T0F5QmI7QUF6QmEsT0EyQmI7QUEzQmEsT0E2QmI7QUE3QmEsT0ErQmI7a0JBL0JhIiwiZmlsZSI6InN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4uLy4uL3htbE9iamVjdFwiXHJcbmltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZS9iYXNlXCJcclxuaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSBcIi4vc3R5bGUvdGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGVze1xyXG5cdGNvbnN0cnVjdG9yKHN0eWxlcyl7XHJcblx0XHR0aGlzLnN0eWxlcz1zdHlsZXNcclxuXHRcdHN0eWxlcy5nZXQoJ3N0eWxlcy5zdHlsZScpLmZvckVhY2goYT0+e1xyXG5cdFx0XHRhPWdldGFibGUoYSlcclxuXHRcdFx0bGV0IHR5cGU9YS5nZXQoJyQudHlwZScpXHJcblx0XHRcdGxldCBpZD1hLmdldCgnJC5zdHlsZUlkJylcclxuXHRcdFx0bGV0IGlzRGVmYXVsdD1hLmdldCgnJC5kZWZhdWx0JylcclxuXHJcblx0XHRcdGxldCBzdHlsZT10aGlzW2lkXT1uZXcgU3R5bGVzW3R5cGVdKGEsdGhpcylcclxuXHRcdFx0aWYoaXNEZWZhdWx0KVxyXG5cdFx0XHRcdHRoaXNbYCR7dHlwZX1fZGVmYXVsdGBdPXN0eWxlXHJcblx0XHR9KVxyXG5cclxuXHRcdGxldCBkb2NEZWZhdWx0PXN0eWxlcy5nZXQoJ3N0eWxlcy5kb2NEZWZhdWx0cycpXHJcblx0XHR0aGlzWydkb2N1bWVudF9kZWZhdWx0J109bmV3IFN0eWxlKHtcclxuXHRcdFx0J3BQcic6ZG9jRGVmYXVsdC5nZXQoJ3BQckRlZmF1bHQucFByJyksXHJcblx0XHRcdCdyUHInOmRvY0RlZmF1bHQuZ2V0KCdyUHJEZWZhdWx0LnJQcicpIFxyXG5cdFx0fSwgdGhpcylcclxuXHR9XHJcblxyXG5cdGdldERlZmF1bHQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpc1tgJHt0eXBlfV9kZWZhdWx0YF1cclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwYXJhZ3JhcGg9U3R5bGVcclxuXHJcblx0c3RhdGljIGNoYXJhY3Rlcj1TdHlsZVxyXG5cclxuXHRzdGF0aWMgbnVtYmVyaW5nPVN0eWxlXHJcblxyXG5cdHN0YXRpYyB0YWJsZT1UYWJsZVN0eWxlXHJcbn1cclxuIl19