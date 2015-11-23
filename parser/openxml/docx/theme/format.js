'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _modelShape = require('../model/shape');

var _modelShape2 = _interopRequireDefault(_modelShape);

var format = (function () {
	function format(wXml, wDoc) {
		_classCallCheck(this, format);

		this.wXml = wXml;
		this.wDoc = wDoc;
		this._converter = new _modelShape2['default'].Properties(null, wDoc, null);
		this._line = {};
		this._fill = { 0: {}, 1000: {} };
		this._bgFill = {};
		this._effect = {};
		this._font = {};
	}

	_createClass(format, [{
		key: 'line',
		value: function line(idx, t) {
			if (t = this._line[idx]) return t;
			return (t = this.wXml.$1('ln:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._line[idx] = this._converter.ln(t));
		}
	}, {
		key: 'fill',
		value: function fill(idx, t) {
			idx = parseInt(idx);
			if (idx > 1000) return this.bgFill(idx - 1000);

			if (t = this._fill[idx]) return t;
			return (t = this.wXml.$1('bgFillStyleLst>:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._fill[idx] = this._converter[t.localName](t));
		}
	}, {
		key: 'bgFill',
		value: function bgFill(idx, t) {
			if (t = this._bgFill[idx]) return t;
			return (t = this.wXml.$1('bgFillStyleLst>:nth-child(' + (parseInt(idx) + 1) + ')')) && (this._bgFill[idx] = this._converter[t.localName](t));
		}
	}, {
		key: 'effect',
		value: function effect(idx, t) {
			if (t = this._effect[idx]) return t;
			return (t = this.wXml.$1('effectStyle:nth-child(' + (parseInt(idx) + 1) + ')>effectLst')) && (this._effect[idx] = this._converter.effectLst(t));
		}
	}, {
		key: 'font',
		value: function font(idx, t) {
			if (t = this._font[idx]) return t;
			return (t = this.wXml.$1('fontScheme>' + idx + 'Font>latin')) && (this._effect[idx] = t.attr('typeface'));
		}
	}]);

	return format;
})();

exports['default'] = format;
module.exports = exports['default'];
//# sourceMappingURL=format.js.map