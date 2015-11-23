'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RGB = /([a-fA-F0-9]{2}?){3}?/;

var color = (function () {
	function color(wXml, xMapping) {
		_classCallCheck(this, color);

		this.wXml = wXml;
		this.map = {};
		for (var i = 0, map = xMapping.attributes, len = map.length, attr; i < len; i++) this.map[(attr = xMapping.attributes[i]).localName] = attr.value;
	}

	_createClass(color, [{
		key: 'get',
		value: function get(name, t) {
			if (name == 'phClr') //placeholder color, witch will be replaced with direct style
				return name;
			name = this.map[name] || name;
			if (t = this.wXml.$1(name)) {
				switch (t.firstChild.localName) {
					case 'sysClr':
						return '#' + t.firstChild.attr('lastClr');
					default:
						return '#' + t.firstChild.attr('val');
				}
			} else return 'black';
		}
	}]);

	return color;
})();

exports['default'] = color;
module.exports = exports['default'];
//# sourceMappingURL=color.js.map