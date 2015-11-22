'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _styleList = require("./style/list");

var _styleList2 = _interopRequireDefault(_styleList);

var list = (function (_require) {
	_inherits(list, _require);

	function list() {
		_classCallCheck(this, list);

		_get(Object.getPrototypeOf(list.prototype), 'constructor', this).apply(this, arguments);
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
			return this.wDoc.style.get(_styleList2['default'].asStyleId(numId));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'list';
		}
	}]);

	return list;
})(require('./paragraph'));

exports['default'] = list;
module.exports = exports['default'];
//# sourceMappingURL=list.js.map