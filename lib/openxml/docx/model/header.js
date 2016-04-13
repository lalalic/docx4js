'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var header = function (_require) {
	_inherits(header, _require);

	function header(wXml, wDoc, mParent, location) {
		_classCallCheck(this, header);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(header).apply(this, arguments));

		_this.location = location;
		return _this;
	}

	_createClass(header, null, [{
		key: 'type',
		get: function get() {
			return 'header';
		}
	}]);

	return header;
}(require('../model'));

exports.default = header;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaGVhZGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCOzs7QUFDcEIsVUFEb0IsTUFDcEIsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLE9BQXhCLEVBQWlDLFFBQWpDLEVBQTBDO3dCQUR0QixRQUNzQjs7cUVBRHRCLG9CQUVWLFlBRGdDOztBQUV6QyxRQUFLLFFBQUwsR0FBYyxRQUFkLENBRnlDOztFQUExQzs7Y0FEb0I7O3NCQUtIO0FBQUMsVUFBTyxRQUFQLENBQUQ7Ozs7UUFMRztFQUFlLFFBQVEsVUFBUjs7a0JBQWYiLCJmaWxlIjoiaGVhZGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgaGVhZGVyIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Y29uc3RydWN0b3Iod1htbCwgd0RvYywgbVBhcmVudCwgbG9jYXRpb24pe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmxvY2F0aW9uPWxvY2F0aW9uXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdoZWFkZXInfVxufVxuIl19