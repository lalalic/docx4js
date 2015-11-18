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

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _numbering = require('./numbering');

var _numbering2 = _interopRequireDefault(_numbering);

var Paragraph = (function (_Style) {
	_inherits(Paragraph, _Style);

	function Paragraph() {
		_classCallCheck(this, Paragraph);

		_get(Object.getPrototypeOf(Paragraph.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Paragraph, [{
		key: 'getOutlineLevel',
		value: function getOutlineLevel(v) {
			if ((v = this._val('outlineLvl')) != null) return parseInt(v);
			if ((v = this.getParentStyle()) != null && v.getOutlineLevel) return v.getOutlineLevel();
			return -1;
		}
	}, {
		key: 'getNumId',
		value: function getNumId(v) {
			if ((v = this._val('numId')) != null) return v;
			if ((v = this.getParentStyle()) != null && v.getNumId) return v.getNumId();
			return -1;
		}
	}, {
		key: 'asNumberingStyle',
		value: function asNumberingStyle() {
			var _Numbering$prototype$asNumberingStyle;

			return (_Numbering$prototype$asNumberingStyle = _numbering2['default'].prototype.asNumberingStyle).call.apply(_Numbering$prototype$asNumberingStyle, [this].concat(_slice.call(arguments)));
		}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			var pr = this.wXml.$1('pPr');
			pr && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('rPr')) && new _inline2['default'].Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('numPr')) && new _numbering2['default'].Properties(pr, this.wDoc, this).parse(visitors);

			(pr = this.wXml.$1('framePr')) && new this.constructor.FrameProperties(pr, this.wDoc, this).parse(visitors);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.paragraph';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}, {
		key: 'FrameProperties',
		get: function get() {
			return FrameProperties;
		}
	}]);

	return Paragraph;
})(_style2['default']);

exports['default'] = Paragraph;

var Properties = (function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		_get(Object.getPrototypeOf(Properties.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Properties, [{
		key: 'jc',
		value: function jc(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'ind',
		value: function ind(x) {
			return this.asObject(x, this.asPt);
		}
	}, {
		key: 'spacing',
		value: function spacing(x) {
			var r = this.asObject(x),
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.asPt(r.beforeLines);else r.before;
			o.top = this.asPt(r.before);

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.asPt(r.afterLines);else r.after;
			o.bottom = this.asPt(r.after);

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.asPt(x.line) + 'pt';
					break;
				case 'auto':
				default:
					o.lineHeight = parseInt(r.line) * 100 / 240 + '%';
			}
			o.lineRule = x.lineRule;
			return o;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'paragraph';
		}
	}]);

	return Properties;
})(_style2['default'].Properties);

var FrameProperties = (function (_Style$Properties2) {
	_inherits(FrameProperties, _Style$Properties2);

	function FrameProperties() {
		_classCallCheck(this, FrameProperties);

		_get(Object.getPrototypeOf(FrameProperties.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(FrameProperties, null, [{
		key: 'type',
		get: function get() {
			return 'frame';
		}
	}]);

	return FrameProperties;
})(_style2['default'].Properties);

module.exports = exports['default'];
//# sourceMappingURL=paragraph.js.map