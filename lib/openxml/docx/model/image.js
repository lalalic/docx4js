'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var image = function (_require) {
	_inherits(image, _require);

	function image() {
		_classCallCheck(this, image);

		return _possibleConstructorReturn(this, (image.__proto__ || Object.getPrototypeOf(image)).apply(this, arguments));
	}

	_createClass(image, [{
		key: 'getImage',
		value: function getImage() {
			var blip = this.wXml.$1('blip'),
			    rid = blip.attr('r:embed');
			return this.wDoc.getRel(rid);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'image';
		}
	}]);

	return image;
}(require('./graphic'));

exports.default = image;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvaW1hZ2UuanMiXSwibmFtZXMiOlsiaW1hZ2UiLCJibGlwIiwid1htbCIsIiQxIiwicmlkIiwiYXR0ciIsIndEb2MiLCJnZXRSZWwiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsSzs7Ozs7Ozs7Ozs7NkJBQ1Y7QUFDVCxPQUFJQyxPQUFLLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBVDtBQUFBLE9BQStCQyxNQUFJSCxLQUFLSSxJQUFMLENBQVUsU0FBVixDQUFuQztBQUNBLFVBQU8sS0FBS0MsSUFBTCxDQUFVQyxNQUFWLENBQWlCSCxHQUFqQixDQUFQO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLE9BQVA7QUFBZTs7OztFQUxDSSxRQUFRLFdBQVIsQzs7a0JBQWRSLEsiLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBpbWFnZSBleHRlbmRzIHJlcXVpcmUoJy4vZ3JhcGhpYycpe1xuXHRnZXRJbWFnZSgpe1xuXHRcdHZhciBibGlwPXRoaXMud1htbC4kMSgnYmxpcCcpLCByaWQ9YmxpcC5hdHRyKCdyOmVtYmVkJylcblx0XHRyZXR1cm4gdGhpcy53RG9jLmdldFJlbChyaWQpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdpbWFnZSd9XG59XG4iXX0=