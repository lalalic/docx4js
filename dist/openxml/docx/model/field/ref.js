'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hyperlink = function (_require) {
	_inherits(hyperlink, _require);

	function hyperlink(instruct) {
		_classCallCheck(this, hyperlink);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(hyperlink).apply(this, arguments));

		_this.link = '#' + instruct.split(/\s+/)[1];
		return _this;
	}

	_createClass(hyperlink, null, [{
		key: 'type',
		get: function get() {
			return 'field.ref';
		}
	}]);

	return hyperlink;
}(require('./hyperlink'));

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvcmVmLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7QUFDcEIsVUFEb0IsU0FDcEIsQ0FBWSxRQUFaLEVBQXFCO3dCQURELFdBQ0M7O3FFQURELHVCQUVWLFlBRFc7O0FBRXBCLFFBQUssSUFBTCxHQUFVLE1BQUksU0FBUyxLQUFULENBQWUsS0FBZixFQUFzQixDQUF0QixDQUFKLENBRlU7O0VBQXJCOztjQURvQjs7c0JBTUg7QUFBQyxVQUFPLFdBQVAsQ0FBRDs7OztRQU5HO0VBQWtCLFFBQVEsYUFBUjs7a0JBQWxCIiwiZmlsZSI6InJlZi5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGh5cGVybGluayBleHRlbmRzIHJlcXVpcmUoJy4vaHlwZXJsaW5rJyl7XG5cdGNvbnN0cnVjdG9yKGluc3RydWN0KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5saW5rPScjJytpbnN0cnVjdC5zcGxpdCgvXFxzKy8pWzFdXG5cdH1cblx0XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGQucmVmJ31cbn1cbiJdfQ==