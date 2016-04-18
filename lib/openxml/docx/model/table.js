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

var table = function (_require) {
	_inherits(table, _require);

	function table() {
		_classCallCheck(this, table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(table).apply(this, arguments));
	}

	_createClass(table, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>tblPr>tblStyle');
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId()) || this.wDoc.style.getDefault(_table2.default.type);
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>tblPr')) && new _table2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: 'getColWidth',
		value: function getColWidth() {
			var widths = [],
			    sum = 0;
			for (var cols = this.wXml.$('>tblGrid>gridCol'), len = cols.length, i = 0, a; i < len; i++) {
				widths.push(a = parseInt(cols[i].attr('w:w')));
				sum += a;
			}
			return { sum: sum, cols: widths };
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'tblPr' || wXml.localName == 'tblGrid';
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'table';
		}
	}]);

	return table;
}(require('../model'));

exports.default = table;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozs2QkFDVCxHQUFFO0FBQ1osVUFBTyxLQUFLLElBQUwsQ0FBVSxpQkFBVixDQUFQLENBRFk7Ozs7a0NBR0U7QUFDZCxVQUFPLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsS0FBSyxVQUFMLEVBQXBCLEtBQXlDLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsVUFBaEIsQ0FBMkIsZ0JBQVcsSUFBWCxDQUFwRSxDQURPOzs7O2lDQUdBLElBQUc7QUFDakIsVUFBTyxDQUFDLEtBQUcsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLFFBQWIsQ0FBSCxDQUFELElBQStCLElBQUksZ0JBQVcsVUFBWCxDQUFzQixFQUExQixFQUE2QixLQUFLLElBQUwsRUFBVSxJQUF2QyxDQUEvQixDQURVOzs7O2dDQUdMO0FBQ1osT0FBSSxTQUFPLEVBQVA7T0FBVyxNQUFJLENBQUosQ0FESDtBQUVaLFFBQUksSUFBSSxPQUFLLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxrQkFBWixDQUFMLEVBQXFDLE1BQUksS0FBSyxNQUFMLEVBQVksSUFBRSxDQUFGLEVBQUksQ0FBN0QsRUFBK0QsSUFBRSxHQUFGLEVBQU0sR0FBekUsRUFBNkU7QUFDNUUsV0FBTyxJQUFQLENBQVksSUFBRSxTQUFTLEtBQUssQ0FBTCxFQUFRLElBQVIsQ0FBYSxLQUFiLENBQVQsQ0FBRixDQUFaLENBRDRFO0FBRTVFLFdBQUssQ0FBTCxDQUY0RTtJQUE3RTtBQUlBLFVBQU8sRUFBQyxLQUFJLEdBQUosRUFBUyxNQUFLLE1BQUwsRUFBakIsQ0FOWTs7OztnQ0FRQyxNQUFLO0FBQ2xCLFVBQU8sS0FBSyxTQUFMLElBQWdCLE9BQWhCLElBQXlCLEtBQUssU0FBTCxJQUFnQixTQUFoQixDQURkOzs7O3NCQUdGO0FBQUMsVUFBTyxPQUFQLENBQUQ7Ozs7UUFyQkc7RUFBYyxRQUFRLFVBQVI7O2tCQUFkIiwiZmlsZSI6InRhYmxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSBcIi4vc3R5bGUvdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB0YWJsZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGdldFN0eWxlSWQoYSl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnRibFByPnRibFN0eWxlJylcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpfHwgdGhpcy53RG9jLnN0eWxlLmdldERlZmF1bHQoVGFibGVTdHlsZS50eXBlKVxuXHR9XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRibFByJykpICYmIG5ldyBUYWJsZVN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0Z2V0Q29sV2lkdGgoKXtcblx0XHR2YXIgd2lkdGhzPVtdLCBzdW09MFxuXHRcdGZvcih2YXIgY29scz10aGlzLndYbWwuJCgnPnRibEdyaWQ+Z3JpZENvbCcpLGxlbj1jb2xzLmxlbmd0aCxpPTAsYTtpPGxlbjtpKyspe1xuXHRcdFx0d2lkdGhzLnB1c2goYT1wYXJzZUludChjb2xzW2ldLmF0dHIoJ3c6dycpKSlcblx0XHRcdHN1bSs9YVxuXHRcdH1cblx0XHRyZXR1cm4ge3N1bTpzdW0sIGNvbHM6d2lkdGhzfTtcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiB3WG1sLmxvY2FsTmFtZT09J3RibFByJ3x8d1htbC5sb2NhbE5hbWU9PSd0YmxHcmlkJ1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxufVxuIl19