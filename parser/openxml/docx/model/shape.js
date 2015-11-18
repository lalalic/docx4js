'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

var Shape = (function (_require) {
	_inherits(Shape, _require);

	function Shape() {
		_classCallCheck(this, Shape);

		_get(Object.getPrototypeOf(Shape.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(Shape, [{
		key: 'getDirectStyle',
		value: function getDirectStyle() {
			return new this.constructor.Properties(this.wXml, this.wDoc, this);
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('txbxContent');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'shape';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return Shape;
})(require('../model'));

exports['default'] = Shape;

function phClr(o, clr, a) {
	for (var i in o) {
		switch (typeof (a = o[i])) {
			case 'string':
				if (a == 'phClr') o[i] = clr;
				break;
			case 'object':
				phClr(a, clr);
		}
	}
	return o;
}

var naming = Object.assign({}, _style2['default'].Properties.naming, _drawing2['default'].SpProperties.naming);

var Properties = (function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

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
})(_style2['default'].Properties);

Object.assign(Properties.prototype, _drawing2['default'].SpProperties.prototype, {
	_getValidChildren: function _getValidChildren(t) {
		var children = ((t = this.wXml.$('>style>*')) && t.asArray() || []).concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
		var bodyPr = this.wXml.$1('bodyPr');
		if (bodyPr) {
			for (var i = 0, attrs = bodyPr.attributes, len = attrs.length; i < len; i++) children.push(attrs[i]);
		}
		return children;
	},
	lnRef: function lnRef(x) {
		return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')), this.solidFill(x));
	},
	fillRef: function fillRef(x) {
		return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')), this.solidFill(x));
	},
	fontRef: function fontRef(x) {
		return { color: this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx')) };
	},
	effectRef: function effectRef() {},
	spAutoFit: function spAutoFit() {
		return true;
	},
	lIns: function lIns(x) {
		if (x = parseInt(x.value)) return this.asPt(x, 'cm');
		return this.EMPTY;
	},
	tIns: function tIns(x) {
		return this.lIns(x);
	},
	rIns: function rIns(x) {
		return this.lIns(x);
	},
	bIns: function bIns(x) {
		return this.lIns(x);
	},
	anchor: function anchor(x) {
		switch (x.value) {
			case 'b':
				return 'bottom';
			case 't':
				return 'top';
			default:
				return 'middle';
		}
	},
	vert: function vert(x) {
		switch (x.value) {
			case 'horz':
				return this.EMPTY;
			case 'eaVert':
				return 90;
			case 'vert270':
				return 270;
			default:
				console.warn('not support');
				return this.EMPTY;
		}
	}
});
module.exports = exports['default'];
//# sourceMappingURL=shape.js.map