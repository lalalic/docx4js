'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fieldSeperate = function (_require) {
	_inherits(fieldSeperate, _require);

	function fieldSeperate() {
		_classCallCheck(this, fieldSeperate);

		return _possibleConstructorReturn(this, (fieldSeperate.__proto__ || Object.getPrototypeOf(fieldSeperate)).apply(this, arguments));
	}

	_createClass(fieldSeperate, [{
		key: 'parse',
		value: function parse(factories) {
			this.wDoc.parseContext.field.seperate(this);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'fieldEnd';
		}
	}]);

	return fieldSeperate;
}(require('../model'));

exports.default = fieldSeperate;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRTZXBhcmF0ZS5qcyJdLCJuYW1lcyI6WyJmaWVsZFNlcGVyYXRlIiwiZmFjdG9yaWVzIiwid0RvYyIsInBhcnNlQ29udGV4dCIsImZpZWxkIiwic2VwZXJhdGUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsYTs7Ozs7Ozs7Ozs7d0JBQ2RDLFMsRUFBVTtBQUNmLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJDLFFBQTdCLENBQXNDLElBQXRDO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFVBQVA7QUFBa0I7Ozs7RUFKTUMsUUFBUSxVQUFSLEM7O2tCQUF0Qk4sYSIsImZpbGUiOiJmaWVsZFNlcGFyYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmllbGRTZXBlcmF0ZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHBhcnNlKGZhY3Rvcmllcyl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC5maWVsZC5zZXBlcmF0ZSh0aGlzKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGRFbmQnfVxufVxuIl19