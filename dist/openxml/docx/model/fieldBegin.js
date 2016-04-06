'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _hyperlink = require('./field/hyperlink');

var _hyperlink2 = _interopRequireDefault(_hyperlink);

var _date = require('./field/date');

var _date2 = _interopRequireDefault(_date);

var _ref = require('./field/ref');

var _ref2 = _interopRequireDefault(_ref);

var _pageref = require('./field/pageref');

var _pageref2 = _interopRequireDefault(_pageref);

var _toc = require('./field/toc');

var _toc2 = _interopRequireDefault(_toc);

var _page = require('./field/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = { hyperlink: _hyperlink2.default, date: _date2.default, ref: _ref2.default, pageref: _pageref2.default, toc: _toc2.default, page: _page2.default };

var fieldBegin = function (_require) {
	_inherits(fieldBegin, _require);

	function fieldBegin() {
		_classCallCheck(this, fieldBegin);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(fieldBegin).apply(this, arguments));

		_this.commands = [];
		return _this;
	}

	_createClass(fieldBegin, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.field.push(this);
			_get(Object.getPrototypeOf(fieldBegin.prototype), 'parse', this).apply(this, arguments);
		}
	}, {
		key: 'instruct',
		value: function instruct(t) {
			this.commands.push(t);
		}
	}, {
		key: 'seperate',
		value: function seperate(seperator) {}
	}, {
		key: 'end',
		value: function end(endVisitors) {}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			this.end = function (endVisitors) {
				var model = this.constructor.factory(this.commands.join('').trim(), this.wDoc, this);
				if (model) model.parse(visitors, endVisitors);
			};
		}
	}], [{
		key: 'factory',
		value: function factory(instruct, wDoc, mParent) {
			var index = instruct.indexOf(' '),
			    type = index != -1 ? instruct.substring(0, index) : instruct;
			type = type.toLowerCase();
			try {
				return new fields[type](instruct.trim(), wDoc, mParent);
			} catch (e) {
				console.warn('field of type ' + type + ' not supported');
			}
		}
	}, {
		key: 'type',
		get: function get() {
			return 'fieldBegin';
		}
	}]);

	return fieldBegin;
}(require('../model'));

exports.default = fieldBegin;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sRUFBQyw4QkFBRCxFQUFZLG9CQUFaLEVBQWtCLGtCQUFsQixFQUF1QiwwQkFBdkIsRUFBZ0Msa0JBQWhDLEVBQXFDLG9CQUFyQyxFQUFQOztJQUNpQjs7O0FBQ3BCLFVBRG9CLFVBQ3BCLEdBQWE7d0JBRE8sWUFDUDs7cUVBRE8sd0JBRVYsWUFERzs7QUFFWixRQUFLLFFBQUwsR0FBYyxFQUFkLENBRlk7O0VBQWI7O2NBRG9COzswQkFNYjtBQUNOLFFBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsS0FBdkIsQ0FBNkIsSUFBN0IsQ0FBa0MsSUFBbEMsRUFETTtBQUVOLDhCQVJtQixrREFRSixVQUFmLENBRk07Ozs7MkJBSUUsR0FBRTtBQUNWLFFBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsQ0FBbkIsRUFEVTs7OzsyQkFHRixXQUFVOzs7c0JBR2YsYUFBWTs7OzJCQUdQLEdBQUcsV0FBVyxVQUFTO0FBQy9CLFFBQUssR0FBTCxHQUFTLFVBQVMsV0FBVCxFQUFxQjtBQUM3QixRQUFJLFFBQU0sS0FBSyxXQUFMLENBQWlCLE9BQWpCLENBQXlCLEtBQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsRUFBdUIsSUFBdkIsRUFBekIsRUFBdUQsS0FBSyxJQUFMLEVBQVcsSUFBbEUsQ0FBTixDQUR5QjtBQUU3QixRQUFHLEtBQUgsRUFDQyxNQUFNLEtBQU4sQ0FBWSxRQUFaLEVBQXNCLFdBQXRCLEVBREQ7SUFGUSxDQURzQjs7OzswQkFVakIsVUFBVSxNQUFNLFNBQVE7QUFDdEMsT0FBSSxRQUFNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixDQUFOO09BQ0gsT0FBSyxTQUFPLENBQUMsQ0FBRCxHQUFNLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFxQixLQUFyQixDQUFiLEdBQTJDLFFBQTNDLENBRmdDO0FBR3RDLFVBQUssS0FBSyxXQUFMLEVBQUwsQ0FIc0M7QUFJdEMsT0FBRztBQUNGLFdBQU8sSUFBSyxPQUFPLElBQVAsQ0FBTCxDQUFtQixTQUFTLElBQVQsRUFBbkIsRUFBb0MsSUFBcEMsRUFBMEMsT0FBMUMsQ0FBUCxDQURFO0lBQUgsQ0FFQyxPQUFNLENBQU4sRUFBUTtBQUNSLFlBQVEsSUFBUixvQkFBOEIsdUJBQTlCLEVBRFE7SUFBUjs7OztzQkFSZTtBQUFDLFVBQU8sWUFBUCxDQUFEOzs7O1FBM0JHO0VBQW1CLFFBQVEsVUFBUjs7a0JBQW5CIiwiZmlsZSI6ImZpZWxkQmVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHlwZXJsaW5rIGZyb20gJy4vZmllbGQvaHlwZXJsaW5rJ1xuaW1wb3J0IGRhdGUgZnJvbSAnLi9maWVsZC9kYXRlJ1xuaW1wb3J0IHJlZiBmcm9tICcuL2ZpZWxkL3JlZidcbmltcG9ydCBwYWdlcmVmIGZyb20gJy4vZmllbGQvcGFnZXJlZidcbmltcG9ydCB0b2MgZnJvbSAnLi9maWVsZC90b2MnXG5pbXBvcnQgcGFnZSBmcm9tICcuL2ZpZWxkL3BhZ2UnXG5cbnZhciBmaWVsZHM9e2h5cGVybGluaywgZGF0ZSwgcmVmLCBwYWdlcmVmLCB0b2MsIHBhZ2V9XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmaWVsZEJlZ2luIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5jb21tYW5kcz1bXVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LmZpZWxkLnB1c2godGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdH1cblx0aW5zdHJ1Y3QodCl7XG5cdFx0dGhpcy5jb21tYW5kcy5wdXNoKHQpXG5cdH1cblx0c2VwZXJhdGUoc2VwZXJhdG9yKXtcblxuXHR9XG5cdGVuZChlbmRWaXNpdG9ycyl7XG5cblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHR0aGlzLmVuZD1mdW5jdGlvbihlbmRWaXNpdG9ycyl7XG5cdFx0XHR2YXIgbW9kZWw9dGhpcy5jb25zdHJ1Y3Rvci5mYWN0b3J5KHRoaXMuY29tbWFuZHMuam9pbignJykudHJpbSgpLHRoaXMud0RvYywgdGhpcylcblx0XHRcdGlmKG1vZGVsKVxuXHRcdFx0XHRtb2RlbC5wYXJzZSh2aXNpdG9ycywgZW5kVmlzaXRvcnMpXG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdmaWVsZEJlZ2luJ31cblxuXHRzdGF0aWMgZmFjdG9yeShpbnN0cnVjdCwgd0RvYywgbVBhcmVudCl7XG5cdFx0dmFyIGluZGV4PWluc3RydWN0LmluZGV4T2YoJyAnKSxcblx0XHRcdHR5cGU9aW5kZXghPS0xID8gIGluc3RydWN0LnN1YnN0cmluZygwLGluZGV4KSA6IGluc3RydWN0XG5cdFx0dHlwZT10eXBlLnRvTG93ZXJDYXNlKClcblx0XHR0cnl7XG5cdFx0XHRyZXR1cm4gbmV3IChmaWVsZHNbdHlwZV0pKGluc3RydWN0LnRyaW0oKSwgd0RvYywgbVBhcmVudClcblx0XHR9Y2F0Y2goZSl7XG5cdFx0XHRjb25zb2xlLndhcm4oYGZpZWxkIG9mIHR5cGUgJHt0eXBlfSBub3Qgc3VwcG9ydGVkYClcblx0XHR9XG5cdH1cbn1cbiJdfQ==