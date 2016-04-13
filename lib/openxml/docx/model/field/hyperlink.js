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

		_this.link = instruct.split('"')[1];
		return _this;
	}

	_createClass(hyperlink, [{
		key: 'getLink',
		value: function getLink() {
			return this.link;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'field.hyperlink';
		}
	}]);

	return hyperlink;
}(require('./field'));

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7QUFDcEIsVUFEb0IsU0FDcEIsQ0FBWSxRQUFaLEVBQXFCO3dCQURELFdBQ0M7O3FFQURELHVCQUVWLFlBRFc7O0FBRXBCLFFBQUssSUFBTCxHQUFVLFNBQVMsS0FBVCxDQUFlLEdBQWYsRUFBb0IsQ0FBcEIsQ0FBVixDQUZvQjs7RUFBckI7O2NBRG9COzs0QkFLWDtBQUNSLFVBQU8sS0FBSyxJQUFMLENBREM7Ozs7c0JBSVE7QUFBQyxVQUFPLGlCQUFQLENBQUQ7Ozs7UUFURztFQUFrQixRQUFRLFNBQVI7O2tCQUFsQiIsImZpbGUiOiJoeXBlcmxpbmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBoeXBlcmxpbmsgZXh0ZW5kcyByZXF1aXJlKCcuL2ZpZWxkJyl7XG5cdGNvbnN0cnVjdG9yKGluc3RydWN0KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5saW5rPWluc3RydWN0LnNwbGl0KCdcIicpWzFdXG5cdH1cblx0Z2V0TGluaygpe1xuXHRcdHJldHVybiB0aGlzLmxpbmtcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGQuaHlwZXJsaW5rJ31cbn1cbiJdfQ==