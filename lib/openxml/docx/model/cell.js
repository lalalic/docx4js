'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var cell = function (_require) {
	_inherits(cell, _require);

	function cell() {
		_classCallCheck(this, cell);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(cell).apply(this, arguments));
	}

	_createClass(cell, [{
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>tcPr')) && new _table2.default.CellProperties(pr, this.wDoc, this);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'cell';
		}
	}]);

	return cell;
}(require('../model'));

exports.default = cell;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvY2VsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7O2lDQUdMLElBQUc7QUFDakIsVUFBTyxDQUFDLEtBQUcsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE9BQWIsQ0FBSCxDQUFELElBQ0gsSUFBSSxnQkFBVyxjQUFYLENBQTBCLEVBQTlCLEVBQWlDLEtBQUssSUFBTCxFQUFVLElBQTNDLENBREcsQ0FEVTs7OztzQkFGRDtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O1FBREc7RUFBYSxRQUFRLFVBQVI7O2tCQUFiIiwiZmlsZSI6ImNlbGwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGFibGVTdHlsZSBmcm9tIFwiLi9zdHlsZS90YWJsZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGNlbGwgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2NlbGwnfVxuXHRcblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGNQcicpKVxuXHRcdFx0JiYgbmV3IFRhYmxlU3R5bGUuQ2VsbFByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cbn1cbiJdfQ==