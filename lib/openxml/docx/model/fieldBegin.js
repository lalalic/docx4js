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

var _field = require('./field/field');

var _field2 = _interopRequireDefault(_field);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fields = { hyperlink: _hyperlink2.default, date: _date2.default, ref: _ref2.default, pageref: _pageref2.default, toc: _toc2.default, page: _page2.default };

var fieldBegin = function (_require) {
	_inherits(fieldBegin, _require);

	function fieldBegin() {
		_classCallCheck(this, fieldBegin);

		var _this = _possibleConstructorReturn(this, (fieldBegin.__proto__ || Object.getPrototypeOf(fieldBegin)).apply(this, arguments));

		_this.commands = [];
		return _this;
	}

	_createClass(fieldBegin, [{
		key: 'parse',
		value: function parse() {
			this.wDoc.parseContext.field.push(this);
			_get(fieldBegin.prototype.__proto__ || Object.getPrototypeOf(fieldBegin.prototype), 'parse', this).apply(this, arguments);
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
		value: function end(endModel, endVisitors) {}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			//delay to find real model
			this.end = function (endModel, endVisitors) {
				this.endModel = endModel;
				var instruct = this.commands.join('').trim(),
				    index = instruct.indexOf(' '),
				    type = (index != -1 ? instruct.substring(0, index) : instruct).toLowerCase();

				this.field = this.constructor.factory(instruct, this.wDoc, this, type);
				if (this.field) this.field = new _field2.default(instruct, this.wDoc, this, type);

				this.field.parse(factories);
			};
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return [];
		}
	}], [{
		key: 'factory',
		value: function factory(instruct, wDoc, mParent, type) {
			try {
				return new fields[type](instruct, wDoc, mParent);
			} catch (e) {
				return null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6WyJmaWVsZHMiLCJoeXBlcmxpbmsiLCJkYXRlIiwicmVmIiwicGFnZXJlZiIsInRvYyIsInBhZ2UiLCJmaWVsZEJlZ2luIiwiYXJndW1lbnRzIiwiY29tbWFuZHMiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwiZmllbGQiLCJwdXNoIiwidCIsInNlcGVyYXRvciIsImVuZE1vZGVsIiwiZW5kVmlzaXRvcnMiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJlbmQiLCJpbnN0cnVjdCIsImpvaW4iLCJ0cmltIiwiaW5kZXgiLCJpbmRleE9mIiwidHlwZSIsInN1YnN0cmluZyIsInRvTG93ZXJDYXNlIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwiYmFzaWMiLCJwYXJzZSIsIm1QYXJlbnQiLCJlIiwicmVxdWlyZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJQSxTQUFPLEVBQUNDLDhCQUFELEVBQVlDLG9CQUFaLEVBQWtCQyxrQkFBbEIsRUFBdUJDLDBCQUF2QixFQUFnQ0Msa0JBQWhDLEVBQXFDQyxvQkFBckMsRUFBWDs7SUFDcUJDLFU7OztBQUNwQix1QkFBYTtBQUFBOztBQUFBLHVIQUNIQyxTQURHOztBQUVaLFFBQUtDLFFBQUwsR0FBYyxFQUFkO0FBRlk7QUFHWjs7OzswQkFFTTtBQUNOLFFBQUtDLElBQUwsQ0FBVUMsWUFBVixDQUF1QkMsS0FBdkIsQ0FBNkJDLElBQTdCLENBQWtDLElBQWxDO0FBQ0Esa0hBQWVMLFNBQWY7QUFDQTs7OzJCQUNRTSxDLEVBQUU7QUFDVixRQUFLTCxRQUFMLENBQWNJLElBQWQsQ0FBbUJDLENBQW5CO0FBQ0E7OzsyQkFDUUMsUyxFQUFVLENBRWxCOzs7c0JBQ0dDLFEsRUFBU0MsVyxFQUFZLENBRXhCOzs7MkJBQ1FDLEMsRUFBR0MsUyxFQUFXQyxRLEVBQVM7QUFBQztBQUNoQyxRQUFLQyxHQUFMLEdBQVMsVUFBU0wsUUFBVCxFQUFtQkMsV0FBbkIsRUFBK0I7QUFDdkMsU0FBS0QsUUFBTCxHQUFjQSxRQUFkO0FBQ0EsUUFBSU0sV0FBUyxLQUFLYixRQUFMLENBQWNjLElBQWQsQ0FBbUIsRUFBbkIsRUFBdUJDLElBQXZCLEVBQWI7QUFBQSxRQUNDQyxRQUFNSCxTQUFTSSxPQUFULENBQWlCLEdBQWpCLENBRFA7QUFBQSxRQUVDQyxPQUFLLENBQUNGLFNBQU8sQ0FBQyxDQUFSLEdBQWFILFNBQVNNLFNBQVQsQ0FBbUIsQ0FBbkIsRUFBcUJILEtBQXJCLENBQWIsR0FBMkNILFFBQTVDLEVBQXNETyxXQUF0RCxFQUZOOztBQUlBLFNBQUtqQixLQUFMLEdBQVcsS0FBS2tCLFdBQUwsQ0FBaUJDLE9BQWpCLENBQXlCVCxRQUF6QixFQUFrQyxLQUFLWixJQUF2QyxFQUE2QyxJQUE3QyxFQUFtRGlCLElBQW5ELENBQVg7QUFDQSxRQUFHLEtBQUtmLEtBQVIsRUFDQyxLQUFLQSxLQUFMLEdBQVcsSUFBSW9CLGVBQUosQ0FBVVYsUUFBVixFQUFtQixLQUFLWixJQUF4QixFQUE2QixJQUE3QixFQUFrQ2lCLElBQWxDLENBQVg7O0FBRUQsU0FBS2YsS0FBTCxDQUFXcUIsS0FBWCxDQUFpQmQsU0FBakI7QUFDQSxJQVhEO0FBWUE7OztzQ0FFa0I7QUFDbEIsVUFBTyxFQUFQO0FBQ0E7OzswQkFJY0csUSxFQUFVWixJLEVBQU13QixPLEVBQVNQLEksRUFBSztBQUM1QyxPQUFHO0FBQ0YsV0FBTyxJQUFLM0IsT0FBTzJCLElBQVAsQ0FBTCxDQUFtQkwsUUFBbkIsRUFBNkJaLElBQTdCLEVBQW1Dd0IsT0FBbkMsQ0FBUDtBQUNBLElBRkQsQ0FFQyxPQUFNQyxDQUFOLEVBQVE7QUFDUixXQUFPLElBQVA7QUFDQTtBQUNEOzs7c0JBUmdCO0FBQUMsVUFBTyxZQUFQO0FBQW9COzs7O0VBdENDQyxRQUFRLFVBQVIsQzs7a0JBQW5CN0IsVSIsImZpbGUiOiJmaWVsZEJlZ2luLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh5cGVybGluayBmcm9tICcuL2ZpZWxkL2h5cGVybGluaydcbmltcG9ydCBkYXRlIGZyb20gJy4vZmllbGQvZGF0ZSdcbmltcG9ydCByZWYgZnJvbSAnLi9maWVsZC9yZWYnXG5pbXBvcnQgcGFnZXJlZiBmcm9tICcuL2ZpZWxkL3BhZ2VyZWYnXG5pbXBvcnQgdG9jIGZyb20gJy4vZmllbGQvdG9jJ1xuaW1wb3J0IHBhZ2UgZnJvbSAnLi9maWVsZC9wYWdlJ1xuaW1wb3J0IGJhc2ljIGZyb20gJy4vZmllbGQvZmllbGQnXG5cbnZhciBmaWVsZHM9e2h5cGVybGluaywgZGF0ZSwgcmVmLCBwYWdlcmVmLCB0b2MsIHBhZ2V9XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBmaWVsZEJlZ2luIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5jb21tYW5kcz1bXVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LmZpZWxkLnB1c2godGhpcylcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdH1cblx0aW5zdHJ1Y3QodCl7XG5cdFx0dGhpcy5jb21tYW5kcy5wdXNoKHQpXG5cdH1cblx0c2VwZXJhdGUoc2VwZXJhdG9yKXtcblxuXHR9XG5cdGVuZChlbmRNb2RlbCxlbmRWaXNpdG9ycyl7XG5cblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXsvL2RlbGF5IHRvIGZpbmQgcmVhbCBtb2RlbFxuXHRcdHRoaXMuZW5kPWZ1bmN0aW9uKGVuZE1vZGVsLCBlbmRWaXNpdG9ycyl7XG5cdFx0XHR0aGlzLmVuZE1vZGVsPWVuZE1vZGVsXG5cdFx0XHRsZXQgaW5zdHJ1Y3Q9dGhpcy5jb21tYW5kcy5qb2luKCcnKS50cmltKCksXG5cdFx0XHRcdGluZGV4PWluc3RydWN0LmluZGV4T2YoJyAnKSxcblx0XHRcdFx0dHlwZT0oaW5kZXghPS0xID8gIGluc3RydWN0LnN1YnN0cmluZygwLGluZGV4KSA6IGluc3RydWN0KS50b0xvd2VyQ2FzZSgpXG5cdFx0XG5cdFx0XHR0aGlzLmZpZWxkPXRoaXMuY29uc3RydWN0b3IuZmFjdG9yeShpbnN0cnVjdCx0aGlzLndEb2MsIHRoaXMsIHR5cGUpXG5cdFx0XHRpZih0aGlzLmZpZWxkKVxuXHRcdFx0XHR0aGlzLmZpZWxkPW5ldyBiYXNpYyhpbnN0cnVjdCx0aGlzLndEb2MsdGhpcyx0eXBlKVxuXHRcdFx0XG5cdFx0XHR0aGlzLmZpZWxkLnBhcnNlKGZhY3Rvcmllcylcblx0XHR9XG5cdH1cblx0XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIFtdXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkQmVnaW4nfVxuXG5cdHN0YXRpYyBmYWN0b3J5KGluc3RydWN0LCB3RG9jLCBtUGFyZW50LCB0eXBlKXtcblx0XHR0cnl7XG5cdFx0XHRyZXR1cm4gbmV3IChmaWVsZHNbdHlwZV0pKGluc3RydWN0LCB3RG9jLCBtUGFyZW50KVxuXHRcdH1jYXRjaChlKXtcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG59XG4iXX0=