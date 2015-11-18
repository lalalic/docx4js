'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var _slice = Array.prototype.slice;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

var graphic = (function (_Drawing) {
	_inherits(graphic, _Drawing);

	function graphic(wXml) {
		_classCallCheck(this, graphic);

		_get(Object.getPrototypeOf(graphic.prototype), 'constructor', this).apply(this, arguments);
		this.wDrawing = wXml;
	}

	_createClass(graphic, null, [{
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return graphic;
})(_drawing2['default']);

exports['default'] = graphic;

var naming = Object.assign({}, _drawing2['default'].Properties.naming, _drawing2['default'].SpProperties.naming);

var Properties = (function (_Drawing$Properties) {
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		_get(Object.getPrototypeOf(Properties.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Properties, null, [{
		key: 'naming',
		get: function get() {
			return naming;
		}
	}]);

	return Properties;
})(_drawing2['default'].Properties);

Object.assign(Properties.prototype, _drawing2['default'].SpProperties.prototype, {
	_getValidChildren: function _getValidChildren(t) {
		var _Drawing$Properties$prototype$_getValidChildren;

		return (_Drawing$Properties$prototype$_getValidChildren = _drawing2['default'].Properties.prototype._getValidChildren).call.apply(_Drawing$Properties$prototype$_getValidChildren, [this].concat(_slice.call(arguments))).concat(this.wXml.$1('spPr').childNodes.asArray());
	}
});
module.exports = exports['default'];
//# sourceMappingURL=graphic.js.map