'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var bookmarkStart = function (_require) {
	_inherits(bookmarkStart, _require);

	function bookmarkStart() {
		_classCallCheck(this, bookmarkStart);

		return _possibleConstructorReturn(this, (bookmarkStart.__proto__ || Object.getPrototypeOf(bookmarkStart)).apply(this, arguments));
	}

	_createClass(bookmarkStart, [{
		key: 'parse',
		value: function parse() {
			_get(bookmarkStart.prototype.__proto__ || Object.getPrototypeOf(bookmarkStart.prototype), 'parse', this).apply(this, arguments);
			this.wDoc.parseContext.bookmark[this.wXml.attr('w:id')] = this.wXml.attr('w:name');
		}
	}, {
		key: 'getName',
		value: function getName() {
			return this.wXml.attr('w:name');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'bookmarkStart';
		}
	}]);

	return bookmarkStart;
}(require('../model'));

exports.default = bookmarkStart;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvYm9va21hcmtTdGFydC5qcyJdLCJuYW1lcyI6WyJib29rbWFya1N0YXJ0IiwiYXJndW1lbnRzIiwid0RvYyIsInBhcnNlQ29udGV4dCIsImJvb2ttYXJrIiwid1htbCIsImF0dHIiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxhOzs7Ozs7Ozs7OzswQkFDYjtBQUNOLHdIQUFlQyxTQUFmO0FBQ0EsUUFBS0MsSUFBTCxDQUFVQyxZQUFWLENBQXVCQyxRQUF2QixDQUFnQyxLQUFLQyxJQUFMLENBQVVDLElBQVYsQ0FBZSxNQUFmLENBQWhDLElBQXdELEtBQUtELElBQUwsQ0FBVUMsSUFBVixDQUFlLFFBQWYsQ0FBeEQ7QUFDQTs7OzRCQUNRO0FBQ1IsVUFBTyxLQUFLRCxJQUFMLENBQVVDLElBQVYsQ0FBZSxRQUFmLENBQVA7QUFDQTs7O3NCQUNnQjtBQUFDLFVBQU8sZUFBUDtBQUF1Qjs7OztFQVJDQyxRQUFRLFVBQVIsQzs7a0JBQXRCUCxhIiwiZmlsZSI6ImJvb2ttYXJrU3RhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBib29rbWFya1N0YXJ0IGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0cGFyc2UoKXtcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC5ib29rbWFya1t0aGlzLndYbWwuYXR0cigndzppZCcpXT10aGlzLndYbWwuYXR0cigndzpuYW1lJylcblx0fVxuXHRnZXROYW1lKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5hdHRyKCd3Om5hbWUnKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnYm9va21hcmtTdGFydCd9XG59XG4iXX0=