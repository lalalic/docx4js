'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//<styls><style type="numbering">

var Numbering = function (_require) {
	_inherits(Numbering, _require);

	function Numbering() {
		_classCallCheck(this, Numbering);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Numbering).apply(this, arguments));
	}

	_createClass(Numbering, [{
		key: 'getNumId',
		value: function getNumId() {
			return this.wXml.$1('numId').attr('w:val');
		}
	}, {
		key: 'asNumberingStyle',
		value: function asNumberingStyle() {
			return this.wDoc.style.get(require('./list').asStyleId(this.getNumId()));
		}
	}, {
		key: '_iterate',
		value: function _iterate() {}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.numbering';
		}
	}]);

	return Numbering;
}(require('../style'));

exports.default = Numbering;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFDcUI7Ozs7Ozs7Ozs7OzZCQUdWO0FBQ1QsVUFBTyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsT0FBYixFQUFzQixJQUF0QixDQUEyQixPQUEzQixDQUFQLENBRFM7Ozs7cUNBSVE7QUFDakIsVUFBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLFFBQVEsUUFBUixFQUFrQixTQUFsQixDQUE0QixLQUFLLFFBQUwsRUFBNUIsQ0FBcEIsQ0FBUCxDQURpQjs7Ozs2QkFJUjs7O3NCQVZPO0FBQUMsVUFBTyxpQkFBUCxDQUFEOzs7O1FBREc7RUFBa0IsUUFBUSxVQUFSOztrQkFBbEIiLCJmaWxlIjoibnVtYmVyaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy88c3R5bHM+PHN0eWxlIHR5cGU9XCJudW1iZXJpbmdcIj5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlcmluZyBleHRlbmRzIHJlcXVpcmUoJy4uL3N0eWxlJyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUubnVtYmVyaW5nJ31cblxuXHRnZXROdW1JZCgpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJDEoJ251bUlkJykuYXR0cigndzp2YWwnKVxuXHR9XG5cblx0YXNOdW1iZXJpbmdTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHJlcXVpcmUoJy4vbGlzdCcpLmFzU3R5bGVJZCh0aGlzLmdldE51bUlkKCkpKVxuXHR9XG5cblx0X2l0ZXJhdGUoKXtcblx0XHRcblx0fVxufVxuIl19