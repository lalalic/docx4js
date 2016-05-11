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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(cell).apply(this, arguments));
	}

	_createClass(cell, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.table.pushCell(this);
			_get(Object.getPrototypeOf(cell.prototype), 'parse', this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvY2VsbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MEJBR2I7QUFDTixRQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLEtBQXZCLENBQTZCLFFBQTdCLENBQXNDLElBQXRDLEVBRE07QUFFTiw4QkFMbUIsNENBS0osVUFBZixDQUZNO0FBR04sUUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixPQUE3QixDQUFxQyxJQUFyQyxFQUhNOzs7O2lDQU1RLElBQUc7QUFDakIsVUFBTyxDQUFDLEtBQUcsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE9BQWIsQ0FBSCxDQUFELElBQ0gsSUFBSSxnQkFBVyxjQUFYLENBQTBCLEVBQTlCLEVBQWlDLEtBQUssSUFBTCxFQUFVLElBQTNDLENBREcsQ0FEVTs7OzsrQkFLTjtBQUNYLFVBQU8sS0FBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixVQUE3QixFQUFQLENBRFc7Ozs7OEJBSUQ7QUFDVixVQUFPLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsS0FBdkIsQ0FBNkIsU0FBN0IsRUFBUCxDQURVOzs7OytCQUlDO0FBQ1gsVUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLEtBQXZCLENBQTZCLFVBQTdCLEVBQVAsQ0FEVzs7Ozs4QkFJRDtBQUNWLFVBQU8sS0FBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixTQUE3QixFQUFQLENBRFU7Ozs7c0JBekJNO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFERztFQUFhLFFBQVEsVUFBUjs7a0JBQWIiLCJmaWxlIjoiY2VsbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYWJsZVN0eWxlIGZyb20gXCIuL3N0eWxlL3RhYmxlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgY2VsbCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnY2VsbCd9XG5cdFxuXHRwYXJzZSgpe1xuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUucHVzaENlbGwodGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wb3BDZWxsKHRoaXMpXG5cdH1cblx0XG5cdGdldERpcmVjdFN0eWxlKHByKXtcblx0XHRyZXR1cm4gKHByPXRoaXMud1htbC4kMSgnPnRjUHInKSlcblx0XHRcdCYmIG5ldyBUYWJsZVN0eWxlLkNlbGxQcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKVxuXHR9XG5cdFxuXHRpc0ZpcnN0Um93KCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNGaXJzdFJvdygpXG5cdH1cblx0XG5cdGlzTGFzdFJvdygpe1xuXHRcdHJldHVybiB0aGlzLndEb2MucGFyc2VDb250ZXh0LnRhYmxlLmlzTGFzdFJvdygpXG5cdH1cblx0XG5cdGlzRmlyc3RDb2woKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5pc0ZpcnN0Q29sKClcblx0fVxuXHRcblx0aXNMYXN0Q29sKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUuaXNMYXN0Q29sKClcblx0fVxufVxuIl19