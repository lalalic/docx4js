'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var heading = function (_require) {
	_inherits(heading, _require);

	function heading() {
		_classCallCheck(this, heading);

		var _this = _possibleConstructorReturn(this, (heading.__proto__ || Object.getPrototypeOf(heading)).apply(this, arguments));

		_this.outlineLvl = arguments[arguments.length - 1];
		return _this;
	}

	_createClass(heading, [{
		key: 'getOutlineLevel',
		value: function getOutlineLevel() {
			return this.outlineLvl;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'heading';
		}
	}]);

	return heading;
}(require('./paragraph'));

exports.default = heading;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaGVhZGluZy5qcyJdLCJuYW1lcyI6WyJoZWFkaW5nIiwiYXJndW1lbnRzIiwib3V0bGluZUx2bCIsImxlbmd0aCIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxPOzs7QUFDcEIsb0JBQWE7QUFBQTs7QUFBQSxpSEFDSEMsU0FERzs7QUFFWixRQUFLQyxVQUFMLEdBQWdCRCxVQUFVQSxVQUFVRSxNQUFWLEdBQWlCLENBQTNCLENBQWhCO0FBRlk7QUFHWjs7OztvQ0FDZ0I7QUFDaEIsVUFBTyxLQUFLRCxVQUFaO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFNBQVA7QUFBaUI7Ozs7RUFSQ0UsUUFBUSxhQUFSLEM7O2tCQUFoQkosTyIsImZpbGUiOiJoZWFkaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgaGVhZGluZyBleHRlbmRzIHJlcXVpcmUoJy4vcGFyYWdyYXBoJyl7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMub3V0bGluZUx2bD1hcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aC0xXVxuXHR9XG5cdGdldE91dGxpbmVMZXZlbCgpe1xuXHRcdHJldHVybiB0aGlzLm91dGxpbmVMdmxcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2hlYWRpbmcnfVxufVxuIl19