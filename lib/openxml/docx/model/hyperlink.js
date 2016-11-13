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

	function hyperlink() {
		_classCallCheck(this, hyperlink);

		return _possibleConstructorReturn(this, (hyperlink.__proto__ || Object.getPrototypeOf(hyperlink)).apply(this, arguments));
	}

	_createClass(hyperlink, [{
		key: 'getLink',
		value: function getLink(a) {
			return (a = this._attr('r:id')) ? this._getLocalLink(a) : '#' + this._attr('w:anchor');
		}
	}, {
		key: '_getLocalLink',
		value: function _getLocalLink(id) {
			return this.wDoc.partMain.getRel(id);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'hyperlink';
		}
	}]);

	return hyperlink;
}(require('../model'));

exports.default = hyperlink;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaHlwZXJsaW5rLmpzIl0sIm5hbWVzIjpbImh5cGVybGluayIsImEiLCJfYXR0ciIsIl9nZXRMb2NhbExpbmsiLCJpZCIsIndEb2MiLCJwYXJ0TWFpbiIsImdldFJlbCIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxTOzs7Ozs7Ozs7OzswQkFHWkMsQyxFQUFFO0FBQ1QsVUFBTyxDQUFDQSxJQUFFLEtBQUtDLEtBQUwsQ0FBVyxNQUFYLENBQUgsSUFBeUIsS0FBS0MsYUFBTCxDQUFtQkYsQ0FBbkIsQ0FBekIsR0FBaUQsTUFBSSxLQUFLQyxLQUFMLENBQVcsVUFBWCxDQUE1RDtBQUNBOzs7Z0NBQ2FFLEUsRUFBRztBQUNoQixVQUFPLEtBQUtDLElBQUwsQ0FBVUMsUUFBVixDQUFtQkMsTUFBbkIsQ0FBMEJILEVBQTFCLENBQVA7QUFDQTs7O3NCQVBnQjtBQUFDLFVBQU8sV0FBUDtBQUFtQjs7OztFQURDSSxRQUFRLFVBQVIsQzs7a0JBQWxCUixTIiwiZmlsZSI6Imh5cGVybGluay5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGh5cGVybGluayBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnaHlwZXJsaW5rJ31cblxuXHRnZXRMaW5rKGEpe1xuXHRcdHJldHVybiAoYT10aGlzLl9hdHRyKCdyOmlkJykpID8gdGhpcy5fZ2V0TG9jYWxMaW5rKGEpOiAoJyMnK3RoaXMuX2F0dHIoJ3c6YW5jaG9yJykgKVxuXHR9XG5cdF9nZXRMb2NhbExpbmsoaWQpe1xuXHRcdHJldHVybiB0aGlzLndEb2MucGFydE1haW4uZ2V0UmVsKGlkKVxuXHR9XG59XG4iXX0=