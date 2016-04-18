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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(heading).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaGVhZGluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLE9BQ3BCLEdBQWE7d0JBRE8sU0FDUDs7cUVBRE8scUJBRVYsWUFERzs7QUFFWixRQUFLLFVBQUwsR0FBZ0IsVUFBVSxVQUFVLE1BQVYsR0FBaUIsQ0FBakIsQ0FBMUIsQ0FGWTs7RUFBYjs7Y0FEb0I7O29DQUtIO0FBQ2hCLFVBQU8sS0FBSyxVQUFMLENBRFM7Ozs7c0JBR0E7QUFBQyxVQUFPLFNBQVAsQ0FBRDs7OztRQVJHO0VBQWdCLFFBQVEsYUFBUjs7a0JBQWhCIiwiZmlsZSI6ImhlYWRpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBoZWFkaW5nIGV4dGVuZHMgcmVxdWlyZSgnLi9wYXJhZ3JhcGgnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5vdXRsaW5lTHZsPWFyZ3VtZW50c1thcmd1bWVudHMubGVuZ3RoLTFdXG5cdH1cblx0Z2V0T3V0bGluZUxldmVsKCl7XG5cdFx0cmV0dXJuIHRoaXMub3V0bGluZUx2bFxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnaGVhZGluZyd9XG59XG4iXX0=