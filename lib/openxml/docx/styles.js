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

var _numbering = require("./style/numbering");

var _numbering2 = _interopRequireDefault(_numbering);

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

		this.numberings = new _numbering2.default(numbering, this);
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
			var value = undefined;

			if (path == "label") {
				return this.styles.numberings.get(path, id || this.numId, level || this.level);
			} else if (path.substr(0, 6) == 'label.') {
				value = this.styles.numberings.get(path.substr(6), id || this.numId, level || this.level);
				if (value == undefined) return _get(Object.getPrototypeOf(numbering.prototype), "get", this).call(this, path.substr(6), id || this.numId, level || this.level);
			} else {
				if (path.substr(0, 3) == 'rPr') return _get(Object.getPrototypeOf(numbering.prototype), "get", this).call(this, path);

				value = this.styles.numberings.get(path, id || this.numId, level || this.level);

				if (value == undefined) value = _get(Object.getPrototypeOf(numbering.prototype), "get", this).apply(this, arguments);
			}
			return value;
		}
	}]);

	return numbering;
}(Styles.paragraph);

exports.default = Styles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvc3R5bGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjtBQUNwQixVQURvQixNQUNwQixDQUFZLE1BQVosRUFBb0IsU0FBcEIsRUFBOEI7Ozt3QkFEVixRQUNVOztBQUM3QixTQUFPLEdBQVAsQ0FBVyxjQUFYLEVBQTJCLE9BQTNCLENBQW1DLGFBQUc7QUFDckMsT0FBRSx3QkFBUSxDQUFSLENBQUYsQ0FEcUM7QUFFckMsT0FBSSxPQUFLLEVBQUUsR0FBRixDQUFNLFFBQU4sQ0FBTCxDQUZpQztBQUdyQyxPQUFJLEtBQUcsRUFBRSxHQUFGLENBQU0sV0FBTixDQUFILENBSGlDO0FBSXJDLE9BQUksWUFBVSxFQUFFLEdBQUYsQ0FBTSxXQUFOLENBQVYsQ0FKaUM7O0FBTXJDLE9BQUksUUFBTSxNQUFLLEVBQUwsSUFBUyxJQUFJLE9BQU8sSUFBUCxDQUFKLENBQWlCLENBQWpCLFFBQVQsQ0FOMkI7QUFPckMsT0FBRyxTQUFILEVBQ0MsTUFBUSxpQkFBUixJQUF3QixLQUF4QixDQUREO0dBUGtDLENBQW5DLENBRDZCOztBQVk3QixNQUFJLGFBQVcsT0FBTyxHQUFQLENBQVcsb0JBQVgsQ0FBWCxDQVp5QjtBQWE3QixPQUFLLGtCQUFMLElBQXlCLG1CQUFVO0FBQ2xDLFVBQU0sV0FBVyxHQUFYLENBQWUsZ0JBQWYsQ0FBTjtBQUNBLFVBQU0sV0FBVyxHQUFYLENBQWUsZ0JBQWYsQ0FBTjtHQUZ3QixFQUd0QixJQUhzQixDQUF6QixDQWI2Qjs7QUFrQjdCLE9BQUssVUFBTCxHQUFnQix3QkFBZSxTQUFmLEVBQXlCLElBQXpCLENBQWhCLENBbEI2QjtFQUE5Qjs7Y0FEb0I7OzZCQXNCVCxNQUFLO0FBQ2YsVUFBTyxLQUFRLGlCQUFSLENBQVAsQ0FEZTs7OztvQ0FJRSxJQUFJLE1BQUs7QUFDMUIsV0FBTyxJQUFQO0FBQ0EsU0FBSyxLQUFMO0FBQ0MsU0FBRyxHQUFHLEdBQUgsQ0FBTyxPQUFQLEtBQWlCLFNBQWpCLEVBQ0YsT0FBTyxJQUFJLE9BQU8sU0FBUCxDQUFpQixFQUFDLEtBQUksRUFBSixFQUF0QixFQUErQixJQUEvQixFQUFxQyxZQUFyQyxDQUFQLENBREQsS0FHQyxPQUFPLElBQUksT0FBTyxTQUFQLENBQWlCLEVBQUMsS0FBSSxFQUFKLEVBQXRCLEVBQStCLElBQS9CLEVBQXFDLFlBQXJDLENBQVAsQ0FIRDtBQUlELFdBTEE7QUFEQSxTQU9LLEtBQUw7QUFDQyxZQUFPLElBQUksT0FBTyxTQUFQLENBQWlCLEVBQUMsS0FBSSxFQUFKLEVBQXRCLEVBQStCLElBQS9CLEVBQXFDLFlBQXJDLENBQVAsQ0FERDtBQUVBLFdBRkE7QUFQQSxTQVVLLE9BQUw7QUFDQyxZQUFPLElBQUksT0FBTyxLQUFQLENBQWEsRUFBQyxPQUFNLEVBQU4sRUFBbEIsRUFBNkIsSUFBN0IsRUFBbUMsZ0JBQW5DLENBQVAsQ0FERDtBQUVBLFdBRkE7QUFWQSxTQWFLLE1BQUw7QUFDQyxZQUFPLElBQUksT0FBTyxLQUFQLENBQWEsRUFBQyxNQUFLLEVBQUwsRUFBbEIsQ0FBUCxDQUREO0FBYkEsU0FlSyxNQUFMO0FBQ0MsWUFBTyxJQUFJLE9BQU8sS0FBUCxDQUFhLEVBQUMsTUFBSyxFQUFMLEVBQWxCLENBQVAsQ0FERDtBQWZBLFNBaUJLLFNBQUw7QUFDQyxZQUFPLElBQUksT0FBTyxLQUFQLENBQWEsRUFBQyxTQUFRLEVBQVIsRUFBbEIsQ0FBUCxDQUREO0FBakJBO0FBb0JDLFlBQU8sRUFBUCxDQUREO0FBbkJBLElBRDBCOzs7O1FBMUJQOzs7T0FtRGI7QUFuRGEsT0FxRGI7QUFyRGEsT0F1RGI7O0FBdkRhLE9BeURiO1dBQWdCOztBQUN0QixVQURzQixTQUN0QixHQUFhO3dCQURTLFdBQ1Q7O3NFQURTLHVCQUVaLFlBREc7O0FBRVosU0FBSyxLQUFMLEdBQVcsT0FBSyxHQUFMLENBQVMsR0FBVCxDQUFhLGlCQUFiLENBQVgsQ0FGWTtBQUdaLFNBQUssS0FBTCxHQUFXLE9BQUssR0FBTCxDQUFTLEdBQVQsQ0FBYSxnQkFBYixDQUFYLENBSFk7O0VBQWI7O2NBRHNCOztzQkFPbEIsTUFBSyxJQUFHLE9BQU07QUFDakIsT0FBSSxRQUFNLFNBQU4sQ0FEYTs7QUFHakIsT0FBRyxRQUFNLE9BQU4sRUFBYztBQUNoQixXQUFPLEtBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFBaUMsTUFBSSxLQUFLLEtBQUwsRUFBVyxTQUFPLEtBQUssS0FBTCxDQUE5RCxDQURnQjtJQUFqQixNQUVNLElBQUcsS0FBSyxNQUFMLENBQVksQ0FBWixFQUFjLENBQWQsS0FBa0IsUUFBbEIsRUFBMkI7QUFDbkMsWUFBTSxLQUFLLE1BQUwsQ0FBWSxVQUFaLENBQXVCLEdBQXZCLENBQTJCLEtBQUssTUFBTCxDQUFZLENBQVosQ0FBM0IsRUFBMkMsTUFBSSxLQUFLLEtBQUwsRUFBVyxTQUFPLEtBQUssS0FBTCxDQUF2RSxDQURtQztBQUVuQyxRQUFHLFNBQU8sU0FBUCxFQUNGLGtDQWZtQiw4Q0FlRixLQUFLLE1BQUwsQ0FBWSxDQUFaLEdBQWdCLE1BQUksS0FBSyxLQUFMLEVBQVcsU0FBTyxLQUFLLEtBQUwsQ0FBdkQsQ0FERDtJQUZLLE1BSUQ7QUFDSixRQUFHLEtBQUssTUFBTCxDQUFZLENBQVosRUFBYyxDQUFkLEtBQWtCLEtBQWxCLEVBQ0Ysa0NBbEJtQiw4Q0FrQkYsS0FBakIsQ0FERDs7QUFHQSxZQUFNLEtBQUssTUFBTCxDQUFZLFVBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsSUFBM0IsRUFBaUMsTUFBSSxLQUFLLEtBQUwsRUFBVyxTQUFPLEtBQUssS0FBTCxDQUE3RCxDQUpJOztBQU1KLFFBQUcsU0FBTyxTQUFQLEVBQ0YsbUNBdkJtQiwrQ0F1QkEsVUFBbkIsQ0FERDtJQVZLO0FBYU4sVUFBTyxLQUFQLENBbEJpQjs7OztRQVBJO0VBQWtCLE9BQU8sU0FBUDs7a0JBekRyQiIsImZpbGUiOiJzdHlsZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi8uLi94bWxPYmplY3RcIlxyXG5pbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvYmFzZVwiXHJcbmltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcclxuaW1wb3J0IE51bWJlcmluZ3MgZnJvbSBcIi4vc3R5bGUvbnVtYmVyaW5nXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlc3tcclxuXHRjb25zdHJ1Y3RvcihzdHlsZXMsIG51bWJlcmluZyl7XHJcblx0XHRzdHlsZXMuZ2V0KCdzdHlsZXMuc3R5bGUnKS5mb3JFYWNoKGE9PntcclxuXHRcdFx0YT1nZXRhYmxlKGEpXHJcblx0XHRcdGxldCB0eXBlPWEuZ2V0KCckLnR5cGUnKVxyXG5cdFx0XHRsZXQgaWQ9YS5nZXQoJyQuc3R5bGVJZCcpXHJcblx0XHRcdGxldCBpc0RlZmF1bHQ9YS5nZXQoJyQuZGVmYXVsdCcpXHJcblxyXG5cdFx0XHRsZXQgc3R5bGU9dGhpc1tpZF09bmV3IFN0eWxlc1t0eXBlXShhLHRoaXMpXHJcblx0XHRcdGlmKGlzRGVmYXVsdClcclxuXHRcdFx0XHR0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXT1zdHlsZVxyXG5cdFx0fSlcclxuXHJcblx0XHRsZXQgZG9jRGVmYXVsdD1zdHlsZXMuZ2V0KCdzdHlsZXMuZG9jRGVmYXVsdHMnKVxyXG5cdFx0dGhpc1snZG9jdW1lbnRfZGVmYXVsdCddPW5ldyBTdHlsZSh7XHJcblx0XHRcdCdwUHInOmRvY0RlZmF1bHQuZ2V0KCdwUHJEZWZhdWx0LnBQcicpLFxyXG5cdFx0XHQnclByJzpkb2NEZWZhdWx0LmdldCgnclByRGVmYXVsdC5yUHInKVxyXG5cdFx0fSwgdGhpcylcclxuXHRcdFxyXG5cdFx0dGhpcy5udW1iZXJpbmdzPW5ldyBOdW1iZXJpbmdzKG51bWJlcmluZyx0aGlzKVxyXG5cdH1cclxuXHJcblx0Z2V0RGVmYXVsdCh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzW2Ake3R5cGV9X2RlZmF1bHRgXVxyXG5cdH1cclxuXHJcblx0Y3JlYXRlRGlyZWN0U3R5bGUocHIsIHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAncFByJzpcclxuXHRcdFx0aWYocHIuZ2V0KCdudW1QcicpPT11bmRlZmluZWQpXHJcblx0XHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMucGFyYWdyYXBoKHtwUHI6cHJ9LCB0aGlzLCAncFByLnBTdHlsZScpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5udW1iZXJpbmcoe3BQcjpwcn0sIHRoaXMsICdwUHIucFN0eWxlJylcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICdyUHInOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5jaGFyYWN0ZXIoe3JQcjpwcn0sIHRoaXMsICdyUHIuclN0eWxlJylcclxuXHRcdGJyZWFrXHJcblx0XHRjYXNlICd0YmxQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0YmxQcjpwcn0sIHRoaXMsICd0YmxQci50YmxTdHlsZScpXHJcblx0XHRicmVha1xyXG5cdFx0Y2FzZSAndGNQcic6XHJcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnRhYmxlKHt0Y1ByOnByfSlcclxuXHRcdGNhc2UgJ3RyUHInOlxyXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy50YWJsZSh7dHJQcjpwcn0pXHJcblx0XHRjYXNlICd0YmxQckV4JzpcclxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RibFByRXg6cHJ9KVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHByXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyYWdyYXBoPVN0eWxlXHJcblxyXG5cdHN0YXRpYyBjaGFyYWN0ZXI9U3R5bGVcclxuXHRcclxuXHRzdGF0aWMgdGFibGU9VGFibGVTdHlsZVxyXG5cclxuXHRzdGF0aWMgbnVtYmVyaW5nPWNsYXNzIG51bWJlcmluZyBleHRlbmRzIFN0eWxlcy5wYXJhZ3JhcGh7XHJcblx0XHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHRcdHRoaXMubnVtSWQ9dGhpcy5yYXcuZ2V0KCdwUHIubnVtUHIubnVtSWQnKVxyXG5cdFx0XHR0aGlzLmxldmVsPXRoaXMucmF3LmdldCgncFByLm51bVByLmlsdmwnKVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRnZXQocGF0aCxpZCxsZXZlbCl7XHJcblx0XHRcdGxldCB2YWx1ZT11bmRlZmluZWRcclxuXHRcdFx0XHJcblx0XHRcdGlmKHBhdGg9PVwibGFiZWxcIil7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuc3R5bGVzLm51bWJlcmluZ3MuZ2V0KHBhdGgsIGlkfHx0aGlzLm51bUlkLGxldmVsfHx0aGlzLmxldmVsKVxyXG5cdFx0XHR9ZWxzZSBpZihwYXRoLnN1YnN0cigwLDYpPT0nbGFiZWwuJyl7XHJcblx0XHRcdFx0dmFsdWU9dGhpcy5zdHlsZXMubnVtYmVyaW5ncy5nZXQocGF0aC5zdWJzdHIoNiksIGlkfHx0aGlzLm51bUlkLGxldmVsfHx0aGlzLmxldmVsKVxyXG5cdFx0XHRcdGlmKHZhbHVlPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KHBhdGguc3Vic3RyKDYpLCBpZHx8dGhpcy5udW1JZCxsZXZlbHx8dGhpcy5sZXZlbClcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0aWYocGF0aC5zdWJzdHIoMCwzKT09J3JQcicpXHJcblx0XHRcdFx0XHRyZXR1cm4gc3VwZXIuZ2V0KHBhdGgpXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHR2YWx1ZT10aGlzLnN0eWxlcy5udW1iZXJpbmdzLmdldChwYXRoLCBpZHx8dGhpcy5udW1JZCxsZXZlbHx8dGhpcy5sZXZlbClcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZih2YWx1ZT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0dmFsdWU9c3VwZXIuZ2V0KC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbiJdfQ==