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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvY2VsbC5qcyJdLCJuYW1lcyI6WyJjZWxsIiwid0RvYyIsInBhcnNlQ29udGV4dCIsInRhYmxlIiwicHVzaENlbGwiLCJhcmd1bWVudHMiLCJwb3BDZWxsIiwicHIiLCJ3WG1sIiwiJDEiLCJDZWxsUHJvcGVydGllcyIsImlzRmlyc3RSb3ciLCJpc0xhc3RSb3ciLCJpc0ZpcnN0Q29sIiwiaXNMYXN0Q29sIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEk7Ozs7Ozs7Ozs7OzBCQUdiO0FBQ04sUUFBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QkMsUUFBN0IsQ0FBc0MsSUFBdEM7QUFDQSxzR0FBZUMsU0FBZjtBQUNBLFFBQUtKLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJHLE9BQTdCLENBQXFDLElBQXJDO0FBQ0E7OztpQ0FFY0MsRSxFQUFHO0FBQ2pCLFVBQU8sQ0FBQ0EsS0FBRyxLQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxPQUFiLENBQUosS0FDSCxJQUFJLGdCQUFXQyxjQUFmLENBQThCSCxFQUE5QixFQUFpQyxLQUFLTixJQUF0QyxFQUEyQyxJQUEzQyxDQURKO0FBRUE7OzsrQkFFVztBQUNYLFVBQU8sS0FBS0EsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QlEsVUFBN0IsRUFBUDtBQUNBOzs7OEJBRVU7QUFDVixVQUFPLEtBQUtWLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJTLFNBQTdCLEVBQVA7QUFDQTs7OytCQUVXO0FBQ1gsVUFBTyxLQUFLWCxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCVSxVQUE3QixFQUFQO0FBQ0E7Ozs4QkFFVTtBQUNWLFVBQU8sS0FBS1osSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QlcsU0FBN0IsRUFBUDtBQUNBOzs7c0JBM0JnQjtBQUFDLFVBQU8sTUFBUDtBQUFjOzs7O0VBRENDLFFBQVEsVUFBUixDOztrQkFBYmYsSSIsImZpbGUiOiJjZWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRhYmxlU3R5bGUgZnJvbSBcIi4vc3R5bGUvdGFibGVcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2VsbCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdjZWxsJ31cclxuXHRcclxuXHRwYXJzZSgpe1xyXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoQ2VsbCh0aGlzKVxyXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wb3BDZWxsKHRoaXMpXHJcblx0fVxyXG5cdFxyXG5cdGdldERpcmVjdFN0eWxlKHByKXtcclxuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dGNQcicpKVxyXG5cdFx0XHQmJiBuZXcgVGFibGVTdHlsZS5DZWxsUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcclxuXHR9XHJcblx0XHJcblx0aXNGaXJzdFJvdygpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNGaXJzdFJvdygpXHJcblx0fVxyXG5cdFxyXG5cdGlzTGFzdFJvdygpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNMYXN0Um93KClcclxuXHR9XHJcblx0XHJcblx0aXNGaXJzdENvbCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNGaXJzdENvbCgpXHJcblx0fVxyXG5cdFxyXG5cdGlzTGFzdENvbCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNMYXN0Q29sKClcclxuXHR9XHJcbn1cclxuIl19