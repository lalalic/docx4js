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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6WyJmaWVsZHMiLCJoeXBlcmxpbmsiLCJkYXRlIiwicmVmIiwicGFnZXJlZiIsInRvYyIsInBhZ2UiLCJmaWVsZEJlZ2luIiwiYXJndW1lbnRzIiwiY29tbWFuZHMiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwiZmllbGQiLCJwdXNoIiwidCIsInNlcGVyYXRvciIsImVuZE1vZGVsIiwiZW5kVmlzaXRvcnMiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJlbmQiLCJpbnN0cnVjdCIsImpvaW4iLCJ0cmltIiwiaW5kZXgiLCJpbmRleE9mIiwidHlwZSIsInN1YnN0cmluZyIsInRvTG93ZXJDYXNlIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwicGFyc2UiLCJtUGFyZW50IiwiZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBTyxFQUFDQyw4QkFBRCxFQUFZQyxvQkFBWixFQUFrQkMsa0JBQWxCLEVBQXVCQywwQkFBdkIsRUFBZ0NDLGtCQUFoQyxFQUFxQ0Msb0JBQXJDLEVBQVg7O0lBQ3FCQyxVOzs7QUFDcEIsdUJBQWE7QUFBQTs7QUFBQSx1SEFDSEMsU0FERzs7QUFFWixRQUFLQyxRQUFMLEdBQWMsRUFBZDtBQUZZO0FBR1o7Ozs7MEJBRU07QUFDTixRQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCQyxJQUE3QixDQUFrQyxJQUFsQztBQUNBLGtIQUFlTCxTQUFmO0FBQ0E7OzsyQkFDUU0sQyxFQUFFO0FBQ1YsUUFBS0wsUUFBTCxDQUFjSSxJQUFkLENBQW1CQyxDQUFuQjtBQUNBOzs7MkJBQ1FDLFMsRUFBVSxDQUVsQjs7O3NCQUNHQyxRLEVBQVNDLFcsRUFBWSxDQUV4Qjs7OzJCQUNRQyxDLEVBQUdDLFMsRUFBV0MsUSxFQUFTO0FBQUM7QUFDaEMsUUFBS0MsR0FBTCxHQUFTLFVBQVNMLFFBQVQsRUFBbUJDLFdBQW5CLEVBQStCO0FBQ3ZDLFNBQUtELFFBQUwsR0FBY0EsUUFBZDtBQUNBLFFBQUlNLFdBQVMsS0FBS2IsUUFBTCxDQUFjYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCQyxJQUF2QixFQUFiO0FBQUEsUUFDQ0MsUUFBTUgsU0FBU0ksT0FBVCxDQUFpQixHQUFqQixDQURQO0FBQUEsUUFFQ0MsT0FBSyxDQUFDRixTQUFPLENBQUMsQ0FBUixHQUFhSCxTQUFTTSxTQUFULENBQW1CLENBQW5CLEVBQXFCSCxLQUFyQixDQUFiLEdBQTJDSCxRQUE1QyxFQUFzRE8sV0FBdEQsRUFGTjs7QUFJQSxTQUFLakIsS0FBTCxHQUFXLEtBQUtrQixXQUFMLENBQWlCQyxPQUFqQixDQUF5QlQsUUFBekIsRUFBa0MsS0FBS1osSUFBdkMsRUFBNkMsSUFBN0MsRUFBbURpQixJQUFuRCxDQUFYO0FBQ0EsUUFBRyxLQUFLZixLQUFSLEVBQ0MsS0FBS0EsS0FBTCxHQUFXLG9CQUFVVSxRQUFWLEVBQW1CLEtBQUtaLElBQXhCLEVBQTZCLElBQTdCLEVBQWtDaUIsSUFBbEMsQ0FBWDs7QUFFRCxTQUFLZixLQUFMLENBQVdvQixLQUFYLENBQWlCYixTQUFqQjtBQUNBLElBWEQ7QUFZQTs7O3NDQUVrQjtBQUNsQixVQUFPLEVBQVA7QUFDQTs7OzBCQUljRyxRLEVBQVVaLEksRUFBTXVCLE8sRUFBU04sSSxFQUFLO0FBQzVDLE9BQUc7QUFDRixXQUFPLElBQUszQixPQUFPMkIsSUFBUCxDQUFMLENBQW1CTCxRQUFuQixFQUE2QlosSUFBN0IsRUFBbUN1QixPQUFuQyxDQUFQO0FBQ0EsSUFGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNSLFdBQU8sSUFBUDtBQUNBO0FBQ0Q7OztzQkFSZ0I7QUFBQyxVQUFPLFlBQVA7QUFBb0I7Ozs7RUF0Q0NDLFFBQVEsVUFBUixDOztrQkFBbkI1QixVIiwiZmlsZSI6ImZpZWxkQmVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHlwZXJsaW5rIGZyb20gJy4vZmllbGQvaHlwZXJsaW5rJ1xyXG5pbXBvcnQgZGF0ZSBmcm9tICcuL2ZpZWxkL2RhdGUnXHJcbmltcG9ydCByZWYgZnJvbSAnLi9maWVsZC9yZWYnXHJcbmltcG9ydCBwYWdlcmVmIGZyb20gJy4vZmllbGQvcGFnZXJlZidcclxuaW1wb3J0IHRvYyBmcm9tICcuL2ZpZWxkL3RvYydcclxuaW1wb3J0IHBhZ2UgZnJvbSAnLi9maWVsZC9wYWdlJ1xyXG5pbXBvcnQgYmFzaWMgZnJvbSAnLi9maWVsZC9maWVsZCdcclxuXHJcbnZhciBmaWVsZHM9e2h5cGVybGluaywgZGF0ZSwgcmVmLCBwYWdlcmVmLCB0b2MsIHBhZ2V9XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZWxkQmVnaW4gZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xyXG5cdGNvbnN0cnVjdG9yKCl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvbW1hbmRzPVtdXHJcblx0fVxyXG5cclxuXHRwYXJzZSgpe1xyXG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC5maWVsZC5wdXNoKHRoaXMpXHJcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdGluc3RydWN0KHQpe1xyXG5cdFx0dGhpcy5jb21tYW5kcy5wdXNoKHQpXHJcblx0fVxyXG5cdHNlcGVyYXRlKHNlcGVyYXRvcil7XHJcblxyXG5cdH1cclxuXHRlbmQoZW5kTW9kZWwsZW5kVmlzaXRvcnMpe1xyXG5cclxuXHR9XHJcblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7Ly9kZWxheSB0byBmaW5kIHJlYWwgbW9kZWxcclxuXHRcdHRoaXMuZW5kPWZ1bmN0aW9uKGVuZE1vZGVsLCBlbmRWaXNpdG9ycyl7XHJcblx0XHRcdHRoaXMuZW5kTW9kZWw9ZW5kTW9kZWxcclxuXHRcdFx0bGV0IGluc3RydWN0PXRoaXMuY29tbWFuZHMuam9pbignJykudHJpbSgpLFxyXG5cdFx0XHRcdGluZGV4PWluc3RydWN0LmluZGV4T2YoJyAnKSxcclxuXHRcdFx0XHR0eXBlPShpbmRleCE9LTEgPyAgaW5zdHJ1Y3Quc3Vic3RyaW5nKDAsaW5kZXgpIDogaW5zdHJ1Y3QpLnRvTG93ZXJDYXNlKClcclxuXHRcdFxyXG5cdFx0XHR0aGlzLmZpZWxkPXRoaXMuY29uc3RydWN0b3IuZmFjdG9yeShpbnN0cnVjdCx0aGlzLndEb2MsIHRoaXMsIHR5cGUpXHJcblx0XHRcdGlmKHRoaXMuZmllbGQpXHJcblx0XHRcdFx0dGhpcy5maWVsZD1uZXcgYmFzaWMoaW5zdHJ1Y3QsdGhpcy53RG9jLHRoaXMsdHlwZSlcclxuXHRcdFx0XHJcblx0XHRcdHRoaXMuZmllbGQucGFyc2UoZmFjdG9yaWVzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRcclxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xyXG5cdFx0cmV0dXJuIFtdXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkQmVnaW4nfVxyXG5cclxuXHRzdGF0aWMgZmFjdG9yeShpbnN0cnVjdCwgd0RvYywgbVBhcmVudCwgdHlwZSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdHJldHVybiBuZXcgKGZpZWxkc1t0eXBlXSkoaW5zdHJ1Y3QsIHdEb2MsIG1QYXJlbnQpXHJcblx0XHR9Y2F0Y2goZSl7XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==