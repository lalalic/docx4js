'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _table = require('./style/table');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var row = function (_require) {
	_inherits(row, _require);

	function row() {
		_classCallCheck(this, row);

		return _possibleConstructorReturn(this, (row.__proto__ || Object.getPrototypeOf(row)).apply(this, arguments));
	}

	_createClass(row, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.pushRow(this);
			_get(row.prototype.__proto__ || Object.getPrototypeOf(row.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.table.popRow(this);
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>trPr')) && new _table2.default.RowProperties(pr, this.wDoc, this);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'row';
		}
	}]);

	return row;
}(require('../model'));

exports.default = row;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcm93LmpzIl0sIm5hbWVzIjpbInJvdyIsIndEb2MiLCJwYXJzZUNvbnRleHQiLCJ0YWJsZSIsInB1c2hSb3ciLCJhcmd1bWVudHMiLCJwb3BSb3ciLCJwciIsIndYbWwiLCIkMSIsIlRhYmxlU3R5bGUiLCJSb3dQcm9wZXJ0aWVzIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEc7Ozs7Ozs7Ozs7OzBCQUNiO0FBQ04sUUFBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QkMsT0FBN0IsQ0FBcUMsSUFBckM7QUFDQSxvR0FBZUMsU0FBZjtBQUNBLFFBQUtKLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJHLE1BQTdCLENBQW9DLElBQXBDO0FBQ0E7OztpQ0FDY0MsRSxFQUFHO0FBQ2pCLFVBQU8sQ0FBQ0EsS0FBRyxLQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxPQUFiLENBQUosS0FBOEIsSUFBSUMsZ0JBQVdDLGFBQWYsQ0FBNkJKLEVBQTdCLEVBQWdDLEtBQUtOLElBQXJDLEVBQTBDLElBQTFDLENBQXJDO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLEtBQVA7QUFBYTs7OztFQVRDVyxRQUFRLFVBQVIsQzs7a0JBQVpaLEciLCJmaWxlIjoicm93LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSAnLi9zdHlsZS90YWJsZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgcm93IGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0cGFyc2UoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnB1c2hSb3codGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wb3BSb3codGhpcylcblx0fVxuXHRnZXREaXJlY3RTdHlsZShwcil7XG5cdFx0cmV0dXJuIChwcj10aGlzLndYbWwuJDEoJz50clByJykpICYmIG5ldyBUYWJsZVN0eWxlLlJvd1Byb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdyb3cnfVxufVxuIl19