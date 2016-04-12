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
		value: function end(endModel, endVisitors) {}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			//delay to find real model
			this.end = function (endModel, endVisitors) {
				this.endModel = endModel;
				this.field = this.constructor.factory(this.commands.join('').trim(), this.wDoc, this);
				if (this.field) this.field.parse(factories);
			};
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return [];
		}
	}], [{
		key: 'factory',
		value: function factory(instruct, wDoc, mParent) {
			var index = instruct.indexOf(' '),
			    type = index != -1 ? instruct.substring(0, index) : instruct;
			type = type.toLowerCase();
			try {
				return new fields[type](instruct, wDoc, mParent);
			} catch (e) {
				return new _field2.default(instruct, wDoc, mParent, type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRCZWdpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBLElBQUksU0FBTyxFQUFDLDhCQUFELEVBQVksb0JBQVosRUFBa0Isa0JBQWxCLEVBQXVCLDBCQUF2QixFQUFnQyxrQkFBaEMsRUFBcUMsb0JBQXJDLEVBQVA7O0lBQ2lCOzs7QUFDcEIsVUFEb0IsVUFDcEIsR0FBYTt3QkFETyxZQUNQOztxRUFETyx3QkFFVixZQURHOztBQUVaLFFBQUssUUFBTCxHQUFjLEVBQWQsQ0FGWTs7RUFBYjs7Y0FEb0I7OzBCQU1iO0FBQ04sUUFBSyxJQUFMLENBQVUsWUFBVixDQUF1QixLQUF2QixDQUE2QixJQUE3QixDQUFrQyxJQUFsQyxFQURNO0FBRU4sOEJBUm1CLGtEQVFKLFVBQWYsQ0FGTTs7OzsyQkFJRSxHQUFFO0FBQ1YsUUFBSyxRQUFMLENBQWMsSUFBZCxDQUFtQixDQUFuQixFQURVOzs7OzJCQUdGLFdBQVU7OztzQkFHZixVQUFTLGFBQVk7OzsyQkFHaEIsR0FBRyxXQUFXLFVBQVM7O0FBQy9CLFFBQUssR0FBTCxHQUFTLFVBQVMsUUFBVCxFQUFtQixXQUFuQixFQUErQjtBQUN2QyxTQUFLLFFBQUwsR0FBYyxRQUFkLENBRHVDO0FBRXZDLFNBQUssS0FBTCxHQUFXLEtBQUssV0FBTCxDQUFpQixPQUFqQixDQUF5QixLQUFLLFFBQUwsQ0FBYyxJQUFkLENBQW1CLEVBQW5CLEVBQXVCLElBQXZCLEVBQXpCLEVBQXVELEtBQUssSUFBTCxFQUFXLElBQWxFLENBQVgsQ0FGdUM7QUFHdkMsUUFBRyxLQUFLLEtBQUwsRUFDRixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLFNBQWpCLEVBREQ7SUFIUSxDQURzQjs7OztzQ0FTYjtBQUNsQixVQUFPLEVBQVAsQ0FEa0I7Ozs7MEJBTUosVUFBVSxNQUFNLFNBQVE7QUFDdEMsT0FBSSxRQUFNLFNBQVMsT0FBVCxDQUFpQixHQUFqQixDQUFOO09BQ0gsT0FBSyxTQUFPLENBQUMsQ0FBRCxHQUFNLFNBQVMsU0FBVCxDQUFtQixDQUFuQixFQUFxQixLQUFyQixDQUFiLEdBQTJDLFFBQTNDLENBRmdDO0FBR3RDLFVBQUssS0FBSyxXQUFMLEVBQUwsQ0FIc0M7QUFJdEMsT0FBRztBQUNGLFdBQU8sSUFBSyxPQUFPLElBQVAsQ0FBTCxDQUFtQixRQUFuQixFQUE2QixJQUE3QixFQUFtQyxPQUFuQyxDQUFQLENBREU7SUFBSCxDQUVDLE9BQU0sQ0FBTixFQUFRO0FBQ1IsV0FBTyxvQkFBVSxRQUFWLEVBQW1CLElBQW5CLEVBQXdCLE9BQXhCLEVBQWdDLElBQWhDLENBQVAsQ0FEUTtJQUFSOzs7O3NCQVJlO0FBQUMsVUFBTyxZQUFQLENBQUQ7Ozs7UUFoQ0c7RUFBbUIsUUFBUSxVQUFSOztrQkFBbkIiLCJmaWxlIjoiZmllbGRCZWdpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBoeXBlcmxpbmsgZnJvbSAnLi9maWVsZC9oeXBlcmxpbmsnXG5pbXBvcnQgZGF0ZSBmcm9tICcuL2ZpZWxkL2RhdGUnXG5pbXBvcnQgcmVmIGZyb20gJy4vZmllbGQvcmVmJ1xuaW1wb3J0IHBhZ2VyZWYgZnJvbSAnLi9maWVsZC9wYWdlcmVmJ1xuaW1wb3J0IHRvYyBmcm9tICcuL2ZpZWxkL3RvYydcbmltcG9ydCBwYWdlIGZyb20gJy4vZmllbGQvcGFnZSdcbmltcG9ydCBiYXNpYyBmcm9tICcuL2ZpZWxkL2ZpZWxkJ1xuXG52YXIgZmllbGRzPXtoeXBlcmxpbmssIGRhdGUsIHJlZiwgcGFnZXJlZiwgdG9jLCBwYWdlfVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmllbGRCZWdpbiBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuY29tbWFuZHM9W11cblx0fVxuXG5cdHBhcnNlKCl7XG5cdFx0dGhpcy53RG9jLnBhcnNlQ29udGV4dC5maWVsZC5wdXNoKHRoaXMpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHR9XG5cdGluc3RydWN0KHQpe1xuXHRcdHRoaXMuY29tbWFuZHMucHVzaCh0KVxuXHR9XG5cdHNlcGVyYXRlKHNlcGVyYXRvcil7XG5cblx0fVxuXHRlbmQoZW5kTW9kZWwsZW5kVmlzaXRvcnMpe1xuXG5cdH1cblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7Ly9kZWxheSB0byBmaW5kIHJlYWwgbW9kZWxcblx0XHR0aGlzLmVuZD1mdW5jdGlvbihlbmRNb2RlbCwgZW5kVmlzaXRvcnMpe1xuXHRcdFx0dGhpcy5lbmRNb2RlbD1lbmRNb2RlbFxuXHRcdFx0dGhpcy5maWVsZD10aGlzLmNvbnN0cnVjdG9yLmZhY3RvcnkodGhpcy5jb21tYW5kcy5qb2luKCcnKS50cmltKCksdGhpcy53RG9jLCB0aGlzKVxuXHRcdFx0aWYodGhpcy5maWVsZClcblx0XHRcdFx0dGhpcy5maWVsZC5wYXJzZShmYWN0b3JpZXMpXG5cdFx0fVxuXHR9XG5cdFxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiBbXVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdmaWVsZEJlZ2luJ31cblxuXHRzdGF0aWMgZmFjdG9yeShpbnN0cnVjdCwgd0RvYywgbVBhcmVudCl7XG5cdFx0dmFyIGluZGV4PWluc3RydWN0LmluZGV4T2YoJyAnKSxcblx0XHRcdHR5cGU9aW5kZXghPS0xID8gIGluc3RydWN0LnN1YnN0cmluZygwLGluZGV4KSA6IGluc3RydWN0XG5cdFx0dHlwZT10eXBlLnRvTG93ZXJDYXNlKClcblx0XHR0cnl7XG5cdFx0XHRyZXR1cm4gbmV3IChmaWVsZHNbdHlwZV0pKGluc3RydWN0LCB3RG9jLCBtUGFyZW50KVxuXHRcdH1jYXRjaChlKXtcblx0XHRcdHJldHVybiBuZXcgYmFzaWMoaW5zdHJ1Y3Qsd0RvYyxtUGFyZW50LHR5cGUpXG5cdFx0fVxuXHR9XG59XG4iXX0=