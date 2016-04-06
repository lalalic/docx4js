'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Body = function (_require) {
	_inherits(Body, _require);

	function Body() {
		_classCallCheck(this, Body);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Body).apply(this, arguments));
	}

	_createClass(Body, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('sectPr');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'body';
		}
	}]);

	return Body;
}(require('../model'));

exports.default = Body;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvYm9keS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7c0NBQ0Q7QUFDbEIsVUFBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksUUFBWixDQUFQLENBRGtCOzs7O3NCQUlGO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFMRztFQUFhLFFBQVEsVUFBUjs7a0JBQWIiLCJmaWxlIjoiYm9keS5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvZHkgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJCgnc2VjdFByJylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnYm9keSd9XG59XG4iXX0=