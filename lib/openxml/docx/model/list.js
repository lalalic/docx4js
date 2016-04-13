'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _list = require('./style/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var list = function (_require) {
	_inherits(list, _require);

	function list() {
		_classCallCheck(this, list);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(list).apply(this, arguments));
	}

	_createClass(list, [{
		key: 'getLevel',
		value: function getLevel(numPr, t) {
			return (t = this.wXml.$1('>pPr>numPr>ilvl')) ? t.attr('w:val') : '0';
		}
	}, {
		key: 'getNumberingStyle',
		value: function getNumberingStyle(t) {
			var numId = (t = this.wXml.$1('>pPr>numPr')) && (t = t.$1('numId')) && (t = t.attr('w:val'));
			!numId && (t = this.getNamedStyle()) && (numId = t.getNumId());
			return this.wDoc.style.get(_list2.default.asStyleId(numId));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'list';
		}
	}]);

	return list;
}(require('./paragraph'));

exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7Ozs7Ozs7Ozs7OzJCQUNYLE9BQU0sR0FBRTtBQUNoQixVQUFPLENBQUMsSUFBRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsaUJBQWIsQ0FBRixDQUFELEdBQXNDLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBdEMsR0FBd0QsR0FBeEQsQ0FEUzs7OztvQ0FHQyxHQUFFO0FBQ25CLE9BQUksUUFBTSxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLFlBQWIsQ0FBRixDQUFELEtBQW1DLElBQUUsRUFBRSxFQUFGLENBQUssT0FBTCxDQUFGLENBQW5DLEtBQXdELElBQUUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFGLENBQXhELENBRFM7QUFFbkIsSUFBQyxLQUFELEtBQVcsSUFBRSxLQUFLLGFBQUwsRUFBRixDQUFYLEtBQXVDLFFBQU0sRUFBRSxRQUFGLEVBQU4sQ0FBdkMsQ0FGbUI7QUFHbkIsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLGVBQU0sU0FBTixDQUFnQixLQUFoQixDQUFwQixDQUFQLENBSG1COzs7O3NCQUtIO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFURztFQUFhLFFBQVEsYUFBUjs7a0JBQWIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZS9saXN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGlzdCBleHRlbmRzIHJlcXVpcmUoJy4vcGFyYWdyYXBoJyl7XG5cdGdldExldmVsKG51bVByLHQpe1xuXHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHI+aWx2bCcpKSA/IHQuYXR0cigndzp2YWwnKSA6ICcwJ1xuXHR9XG5cdGdldE51bWJlcmluZ1N0eWxlKHQpe1xuXHRcdHZhciBudW1JZD0odD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHInKSkgJiYgKHQ9dC4kMSgnbnVtSWQnKSkgJiYgKHQ9dC5hdHRyKCd3OnZhbCcpKVxuXHRcdCFudW1JZCAmJiAodD10aGlzLmdldE5hbWVkU3R5bGUoKSkgJiYgKG51bUlkPXQuZ2V0TnVtSWQoKSlcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldChTdHlsZS5hc1N0eWxlSWQobnVtSWQpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnbGlzdCd9XG59XG4iXX0=