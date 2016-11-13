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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6WyJmaWVsZHMiLCJoeXBlcmxpbmsiLCJkYXRlIiwicmVmIiwicGFnZXJlZiIsInRvYyIsInBhZ2UiLCJmaWVsZEJlZ2luIiwiYXJndW1lbnRzIiwiY29tbWFuZHMiLCJ3RG9jIiwicGFyc2VDb250ZXh0IiwiZmllbGQiLCJwdXNoIiwidCIsInNlcGVyYXRvciIsImVuZE1vZGVsIiwiZW5kVmlzaXRvcnMiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJlbmQiLCJpbnN0cnVjdCIsImpvaW4iLCJ0cmltIiwiaW5kZXgiLCJpbmRleE9mIiwidHlwZSIsInN1YnN0cmluZyIsInRvTG93ZXJDYXNlIiwiY29uc3RydWN0b3IiLCJmYWN0b3J5IiwicGFyc2UiLCJtUGFyZW50IiwiZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBTyxFQUFDQyw4QkFBRCxFQUFZQyxvQkFBWixFQUFrQkMsa0JBQWxCLEVBQXVCQywwQkFBdkIsRUFBZ0NDLGtCQUFoQyxFQUFxQ0Msb0JBQXJDLEVBQVg7O0lBQ3FCQyxVOzs7QUFDcEIsdUJBQWE7QUFBQTs7QUFBQSx1SEFDSEMsU0FERzs7QUFFWixRQUFLQyxRQUFMLEdBQWMsRUFBZDtBQUZZO0FBR1o7Ozs7MEJBRU07QUFDTixRQUFLQyxJQUFMLENBQVVDLFlBQVYsQ0FBdUJDLEtBQXZCLENBQTZCQyxJQUE3QixDQUFrQyxJQUFsQztBQUNBLGtIQUFlTCxTQUFmO0FBQ0E7OzsyQkFDUU0sQyxFQUFFO0FBQ1YsUUFBS0wsUUFBTCxDQUFjSSxJQUFkLENBQW1CQyxDQUFuQjtBQUNBOzs7MkJBQ1FDLFMsRUFBVSxDQUVsQjs7O3NCQUNHQyxRLEVBQVNDLFcsRUFBWSxDQUV4Qjs7OzJCQUNRQyxDLEVBQUdDLFMsRUFBV0MsUSxFQUFTO0FBQUM7QUFDaEMsUUFBS0MsR0FBTCxHQUFTLFVBQVNMLFFBQVQsRUFBbUJDLFdBQW5CLEVBQStCO0FBQ3ZDLFNBQUtELFFBQUwsR0FBY0EsUUFBZDtBQUNBLFFBQUlNLFdBQVMsS0FBS2IsUUFBTCxDQUFjYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCQyxJQUF2QixFQUFiO0FBQUEsUUFDQ0MsUUFBTUgsU0FBU0ksT0FBVCxDQUFpQixHQUFqQixDQURQO0FBQUEsUUFFQ0MsT0FBSyxDQUFDRixTQUFPLENBQUMsQ0FBUixHQUFhSCxTQUFTTSxTQUFULENBQW1CLENBQW5CLEVBQXFCSCxLQUFyQixDQUFiLEdBQTJDSCxRQUE1QyxFQUFzRE8sV0FBdEQsRUFGTjs7QUFJQSxTQUFLakIsS0FBTCxHQUFXLEtBQUtrQixXQUFMLENBQWlCQyxPQUFqQixDQUF5QlQsUUFBekIsRUFBa0MsS0FBS1osSUFBdkMsRUFBNkMsSUFBN0MsRUFBbURpQixJQUFuRCxDQUFYO0FBQ0EsUUFBRyxLQUFLZixLQUFSLEVBQ0MsS0FBS0EsS0FBTCxHQUFXLG9CQUFVVSxRQUFWLEVBQW1CLEtBQUtaLElBQXhCLEVBQTZCLElBQTdCLEVBQWtDaUIsSUFBbEMsQ0FBWDs7QUFFRCxTQUFLZixLQUFMLENBQVdvQixLQUFYLENBQWlCYixTQUFqQjtBQUNBLElBWEQ7QUFZQTs7O3NDQUVrQjtBQUNsQixVQUFPLEVBQVA7QUFDQTs7OzBCQUljRyxRLEVBQVVaLEksRUFBTXVCLE8sRUFBU04sSSxFQUFLO0FBQzVDLE9BQUc7QUFDRixXQUFPLElBQUszQixPQUFPMkIsSUFBUCxDQUFMLENBQW1CTCxRQUFuQixFQUE2QlosSUFBN0IsRUFBbUN1QixPQUFuQyxDQUFQO0FBQ0EsSUFGRCxDQUVDLE9BQU1DLENBQU4sRUFBUTtBQUNSLFdBQU8sSUFBUDtBQUNBO0FBQ0Q7OztzQkFSZ0I7QUFBQyxVQUFPLFlBQVA7QUFBb0I7Ozs7RUF0Q0NDLFFBQVEsVUFBUixDOztrQkFBbkI1QixVIiwiZmlsZSI6ImZpZWxkQmVnaW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgaHlwZXJsaW5rIGZyb20gJy4vZmllbGQvaHlwZXJsaW5rJ1xuaW1wb3J0IGRhdGUgZnJvbSAnLi9maWVsZC9kYXRlJ1xuaW1wb3J0IHJlZiBmcm9tICcuL2ZpZWxkL3JlZidcbmltcG9ydCBwYWdlcmVmIGZyb20gJy4vZmllbGQvcGFnZXJlZidcbmltcG9ydCB0b2MgZnJvbSAnLi9maWVsZC90b2MnXG5pbXBvcnQgcGFnZSBmcm9tICcuL2ZpZWxkL3BhZ2UnXG5pbXBvcnQgYmFzaWMgZnJvbSAnLi9maWVsZC9maWVsZCdcblxudmFyIGZpZWxkcz17aHlwZXJsaW5rLCBkYXRlLCByZWYsIHBhZ2VyZWYsIHRvYywgcGFnZX1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGZpZWxkQmVnaW4gZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmNvbW1hbmRzPVtdXG5cdH1cblxuXHRwYXJzZSgpe1xuXHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQuZmllbGQucHVzaCh0aGlzKVxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0fVxuXHRpbnN0cnVjdCh0KXtcblx0XHR0aGlzLmNvbW1hbmRzLnB1c2godClcblx0fVxuXHRzZXBlcmF0ZShzZXBlcmF0b3Ipe1xuXG5cdH1cblx0ZW5kKGVuZE1vZGVsLGVuZFZpc2l0b3JzKXtcblxuXHR9XG5cdF9pdGVyYXRlKGYsIGZhY3RvcmllcywgdmlzaXRvcnMpey8vZGVsYXkgdG8gZmluZCByZWFsIG1vZGVsXG5cdFx0dGhpcy5lbmQ9ZnVuY3Rpb24oZW5kTW9kZWwsIGVuZFZpc2l0b3JzKXtcblx0XHRcdHRoaXMuZW5kTW9kZWw9ZW5kTW9kZWxcblx0XHRcdGxldCBpbnN0cnVjdD10aGlzLmNvbW1hbmRzLmpvaW4oJycpLnRyaW0oKSxcblx0XHRcdFx0aW5kZXg9aW5zdHJ1Y3QuaW5kZXhPZignICcpLFxuXHRcdFx0XHR0eXBlPShpbmRleCE9LTEgPyAgaW5zdHJ1Y3Quc3Vic3RyaW5nKDAsaW5kZXgpIDogaW5zdHJ1Y3QpLnRvTG93ZXJDYXNlKClcblx0XHRcblx0XHRcdHRoaXMuZmllbGQ9dGhpcy5jb25zdHJ1Y3Rvci5mYWN0b3J5KGluc3RydWN0LHRoaXMud0RvYywgdGhpcywgdHlwZSlcblx0XHRcdGlmKHRoaXMuZmllbGQpXG5cdFx0XHRcdHRoaXMuZmllbGQ9bmV3IGJhc2ljKGluc3RydWN0LHRoaXMud0RvYyx0aGlzLHR5cGUpXG5cdFx0XHRcblx0XHRcdHRoaXMuZmllbGQucGFyc2UoZmFjdG9yaWVzKVxuXHRcdH1cblx0fVxuXHRcblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gW11cblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGRCZWdpbid9XG5cblx0c3RhdGljIGZhY3RvcnkoaW5zdHJ1Y3QsIHdEb2MsIG1QYXJlbnQsIHR5cGUpe1xuXHRcdHRyeXtcblx0XHRcdHJldHVybiBuZXcgKGZpZWxkc1t0eXBlXSkoaW5zdHJ1Y3QsIHdEb2MsIG1QYXJlbnQpXG5cdFx0fWNhdGNoKGUpe1xuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cbn1cbiJdfQ==