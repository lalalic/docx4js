'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paragraph = require('./style/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paragraph = function (_require) {
	_inherits(paragraph, _require);

	function paragraph() {
		_classCallCheck(this, paragraph);

		return _possibleConstructorReturn(this, (paragraph.__proto__ || Object.getPrototypeOf(paragraph)).apply(this, arguments));
	}

	_createClass(paragraph, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>pPr>pStyle') || (a = this.wDoc.style.getDefault(_paragraph2.default.type)) && a.id;
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId());
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			if (pr = this.wXml.$1('>pPr')) return new _paragraph2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'pPr';
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'paragraph';
		}
	}]);

	return paragraph;
}(require('../model'));

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInBhcmFncmFwaCIsImEiLCJfdmFsIiwid0RvYyIsInN0eWxlIiwiZ2V0RGVmYXVsdCIsInR5cGUiLCJpZCIsImdldCIsImdldFN0eWxlSWQiLCJwciIsIndYbWwiLCIkMSIsIlByb3BlcnRpZXMiLCJsb2NhbE5hbWUiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFDcUJBLFM7Ozs7Ozs7Ozs7OzZCQUNUQyxDLEVBQUU7QUFDWixVQUFPLEtBQUtDLElBQUwsQ0FBVSxhQUFWLEtBQTRCLENBQUNELElBQUUsS0FBS0UsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxVQUFoQixDQUEyQixvQkFBTUMsSUFBakMsQ0FBSCxLQUE4Q0wsRUFBRU0sRUFBbkY7QUFDQTs7O2tDQUNjO0FBQ2QsVUFBTyxLQUFLSixJQUFMLENBQVVDLEtBQVYsQ0FBZ0JJLEdBQWhCLENBQW9CLEtBQUtDLFVBQUwsRUFBcEIsQ0FBUDtBQUNBOzs7aUNBQ2NDLEUsRUFBRztBQUNqQixPQUFHQSxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBTixFQUNDLE9BQU8sSUFBSSxvQkFBTUMsVUFBVixDQUFxQkgsRUFBckIsRUFBd0IsS0FBS1AsSUFBN0IsRUFBa0MsSUFBbEMsQ0FBUDtBQUNEOzs7Z0NBQ2FRLEksRUFBSztBQUNsQixVQUFPQSxLQUFLRyxTQUFMLElBQWdCLEtBQXZCO0FBQ0E7OztzQkFDZ0I7QUFBQyxVQUFPLFdBQVA7QUFBbUI7Ozs7RUFkQ0MsUUFBUSxVQUFSLEM7O2tCQUFsQmYsUyIsImZpbGUiOiJwYXJhZ3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvcGFyYWdyYXBoXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHBhcmFncmFwaCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGdldFN0eWxlSWQoYSl7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbCgnPnBQcj5wU3R5bGUnKXx8ICgoYT10aGlzLndEb2Muc3R5bGUuZ2V0RGVmYXVsdChTdHlsZS50eXBlKSkgJiYgYS5pZClcblx0fVxuXHRnZXROYW1lZFN0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQodGhpcy5nZXRTdHlsZUlkKCkpXG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUocHIpe1xuXHRcdGlmKHByPXRoaXMud1htbC4kMSgnPnBQcicpKVxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKVxuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIHdYbWwubG9jYWxOYW1lPT0ncFByJ1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAncGFyYWdyYXBoJ31cbn1cbiJdfQ==