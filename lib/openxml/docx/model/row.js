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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcm93LmpzIl0sIm5hbWVzIjpbInJvdyIsIndEb2MiLCJwYXJzZUNvbnRleHQiLCJ0YWJsZSIsInB1c2hSb3ciLCJhcmd1bWVudHMiLCJwb3BSb3ciLCJwciIsIndYbWwiLCIkMSIsIlJvd1Byb3BlcnRpZXMiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsRzs7Ozs7Ozs7Ozs7MEJBQ2I7QUFDTixRQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCQyxPQUE3QixDQUFxQyxJQUFyQztBQUNBLG9HQUFlQyxTQUFmO0FBQ0EsUUFBS0osSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxLQUF2QixDQUE2QkcsTUFBN0IsQ0FBb0MsSUFBcEM7QUFDQTs7O2lDQUNjQyxFLEVBQUc7QUFDakIsVUFBTyxDQUFDQSxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE9BQWIsQ0FBSixLQUE4QixJQUFJLGdCQUFXQyxhQUFmLENBQTZCSCxFQUE3QixFQUFnQyxLQUFLTixJQUFyQyxFQUEwQyxJQUExQyxDQUFyQztBQUNBOzs7c0JBQ2dCO0FBQUMsVUFBTyxLQUFQO0FBQWE7Ozs7RUFUQ1UsUUFBUSxVQUFSLEM7O2tCQUFaWCxHIiwiZmlsZSI6InJvdy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBUYWJsZVN0eWxlIGZyb20gJy4vc3R5bGUvdGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHJvdyBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHBhcnNlKCl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC50YWJsZS5wdXNoUm93KHRoaXMpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQudGFibGUucG9wUm93KHRoaXMpXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdHJldHVybiAocHI9dGhpcy53WG1sLiQxKCc+dHJQcicpKSAmJiBuZXcgVGFibGVTdHlsZS5Sb3dQcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAncm93J31cbn1cbiJdfQ==