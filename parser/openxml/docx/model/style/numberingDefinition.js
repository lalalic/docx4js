'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var NumberingDefinition = (function (_Style) {
	_inherits(NumberingDefinition, _Style);

	function NumberingDefinition(wXml) {
		_classCallCheck(this, NumberingDefinition);

		_get(Object.getPrototypeOf(NumberingDefinition.prototype), 'constructor', this).apply(this, arguments);
		this.levels = [];

		this.name = this.id = this.constructor.asStyleId(wXml.attr('w:abstractNumId'));
		this.wDoc.style.set(this);
		var link = wXml.$1('numStyleLink');
		if (link) this.link = link.attr('w:val');
	}

	_createClass(NumberingDefinition, [{
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			for (var i = 0, children = this.wXml.$('lvl'), l = children.length, t; i < l; i++) {
				this.levels.push(t = new this.constructor.Level(children[i], this.wDoc, this));
				t.parse(visitors);
			}
		}
	}, {
		key: 'getDefinitionId',
		value: function getDefinitionId() {
			return this.wXml.attr('w:abstractNumId');
		}
	}], [{
		key: 'asStyleId',
		value: function asStyleId(absNumId) {
			return '_numberingDefinition' + absNumId;
		}
	}, {
		key: 'type',
		get: function get() {
			return 'style.numbering.definition';
		}
	}, {
		key: 'Level',
		get: function get() {
			return Level;
		}
	}]);

	return NumberingDefinition;
})(_style2['default']);

exports['default'] = NumberingDefinition;

var Level = (function (_Style$Properties) {
	_inherits(Level, _Style$Properties);

	function Level(wXml) {
		_classCallCheck(this, Level);

		_get(Object.getPrototypeOf(Level.prototype), 'constructor', this).apply(this, arguments);
		this.type = wXml.attr('w:ilvl');
	}

	_createClass(Level, [{
		key: 'parse',
		value: function parse(visitors) {
			_get(Object.getPrototypeOf(Level.prototype), 'parse', this).apply(this, arguments);
			var t, pr;
			if (t = this.wXml.$1('>pPr')) {
				var _pr;

				pr = new (require('./paragraph').Properties)(t, this.wDoc, this);
				pr.type = this.type + ' ' + pr.type;
				(_pr = pr).parse.apply(_pr, arguments);
			}

			if (t = this.wXml.$1('>rPr')) {
				var _pr2;

				pr = new _inline2['default'].Properties(t, this.wDoc, this);
				pr.type = this.type + ' ' + pr.type;
				(_pr2 = pr).parse.apply(_pr2, arguments);
			}
		}
	}, {
		key: 'start',
		value: function start(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'numFm',
		value: function numFm(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlText',
		value: function lvlText(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlJc',
		value: function lvlJc(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlPicBulletId',
		value: function lvlPicBulletId(x) {
			return x.attr('w:val');
		}
	}]);

	return Level;
})(_style2['default'].Properties);

module.exports = exports['default'];
//# sourceMappingURL=numberingDefinition.js.map