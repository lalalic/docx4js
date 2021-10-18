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

var cell = function (_require) {
	_inherits(cell, _require);

	function cell() {
		_classCallCheck(this, cell);

		return _possibleConstructorReturn(this, (cell.__proto__ || Object.getPrototypeOf(cell)).apply(this, arguments));
	}

	_createClass(cell, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.pushCell(this);
			_get(cell.prototype.__proto__ || Object.getPrototypeOf(cell.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.table.popCell(this);
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			return (pr = this.wXml.$1('>tcPr')) && new _table2.default.CellProperties(pr, this.wDoc, this);
		}
	}, {
		key: 'isFirstRow',
		value: function isFirstRow() {
			return this.wDoc.parseContext.table.isFirstRow();
		}
	}, {
		key: 'isLastRow',
		value: function isLastRow() {
			return this.wDoc.parseContext.table.isLastRow();
		}
	}, {
		key: 'isFirstCol',
		value: function isFirstCol() {
			return this.wDoc.parseContext.table.isFirstCol();
		}
	}, {
		key: 'isLastCol',
		value: function isLastCol() {
			return this.wDoc.parseContext.table.isLastCol();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvY2VsbC5qcyJdLCJuYW1lcyI6WyJjZWxsIiwid0RvYyIsInBhcnNlQ29udGV4dCIsInRhYmxlIiwicHVzaENlbGwiLCJhcmd1bWVudHMiLCJwb3BDZWxsIiwicHIiLCJ3WG1sIiwiJDEiLCJUYWJsZVN0eWxlIiwiQ2VsbFByb3BlcnRpZXMiLCJpc0ZpcnN0Um93IiwiaXNMYXN0Um93IiwiaXNGaXJzdENvbCIsImlzTGFzdENvbCIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxJOzs7Ozs7Ozs7OzswQkFHYjtBQUNOLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJDLFFBQTdCLENBQXNDLElBQXRDO0FBQ0Esc0dBQWVDLFNBQWY7QUFDQSxRQUFLSixJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCRyxPQUE3QixDQUFxQyxJQUFyQztBQUNBOzs7aUNBRWNDLEUsRUFBRztBQUNqQixVQUFPLENBQUNBLEtBQUcsS0FBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWEsT0FBYixDQUFKLEtBQ0gsSUFBSUMsZ0JBQVdDLGNBQWYsQ0FBOEJKLEVBQTlCLEVBQWlDLEtBQUtOLElBQXRDLEVBQTJDLElBQTNDLENBREo7QUFFQTs7OytCQUVXO0FBQ1gsVUFBTyxLQUFLQSxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCUyxVQUE3QixFQUFQO0FBQ0E7Ozs4QkFFVTtBQUNWLFVBQU8sS0FBS1gsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QlUsU0FBN0IsRUFBUDtBQUNBOzs7K0JBRVc7QUFDWCxVQUFPLEtBQUtaLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJXLFVBQTdCLEVBQVA7QUFDQTs7OzhCQUVVO0FBQ1YsVUFBTyxLQUFLYixJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCWSxTQUE3QixFQUFQO0FBQ0E7OztzQkEzQmdCO0FBQUMsVUFBTyxNQUFQO0FBQWM7Ozs7RUFEQ0MsUUFBUSxVQUFSLEM7O2tCQUFiaEIsSSIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSBcIi4vc3R5bGUvdGFibGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBjZWxsIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdjZWxsJ31cblx0XG5cdHBhcnNlKCl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoQ2VsbCh0aGlzKVxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLnBvcENlbGwodGhpcylcblx0fVxuXHRcblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGNQcicpKVxuXHRcdFx0JiYgbmV3IFRhYmxlU3R5bGUuQ2VsbFByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0XG5cdGlzRmlyc3RSb3coKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5pc0ZpcnN0Um93KClcblx0fVxuXHRcblx0aXNMYXN0Um93KCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNMYXN0Um93KClcblx0fVxuXHRcblx0aXNGaXJzdENvbCgpe1xuXHRcdHJldHVybiB0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLmlzRmlyc3RDb2woKVxuXHR9XG5cdFxuXHRpc0xhc3RDb2woKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5pc0xhc3RDb2woKVxuXHR9XG59XG4iXX0=