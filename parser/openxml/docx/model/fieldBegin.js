'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _fieldHyperlink = require('./field/hyperlink');

var _fieldHyperlink2 = _interopRequireDefault(_fieldHyperlink);

var _fieldDate = require('./field/date');

var _fieldDate2 = _interopRequireDefault(_fieldDate);

var _fieldRef = require('./field/ref');

var _fieldRef2 = _interopRequireDefault(_fieldRef);

var _fieldPageref = require('./field/pageref');

var _fieldPageref2 = _interopRequireDefault(_fieldPageref);

var _fieldToc = require('./field/toc');

var _fieldToc2 = _interopRequireDefault(_fieldToc);

var _fieldPage = require('./field/page');

var _fieldPage2 = _interopRequireDefault(_fieldPage);

var fields = { hyperlink: _fieldHyperlink2['default'], date: _fieldDate2['default'], ref: _fieldRef2['default'], pageref: _fieldPageref2['default'], toc: _fieldToc2['default'], page: _fieldPage2['default'] };

var fieldBegin = (function (_require) {
	_inherits(fieldBegin, _require);

	function fieldBegin() {
		_classCallCheck(this, fieldBegin);

		_get(Object.getPrototypeOf(fieldBegin.prototype), 'constructor', this).apply(this, arguments);
		this.commands = [];
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
})(require('../model'));

exports['default'] = fieldBegin;
module.exports = exports['default'];
//# sourceMappingURL=fieldBegin.js.map