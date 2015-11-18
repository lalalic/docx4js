'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = (function (_require) {
	_inherits(List, _require);

	function List(wXml, wDoc, mParent) {
		_classCallCheck(this, List);

		_get(Object.getPrototypeOf(List.prototype), 'constructor', this).call(this, wXml, wDoc, mParent);
		this.id = this.name = this.constructor.asStyleId(wXml.attr('w:numId'));
		this.wDoc.style.set(this);
	}

	_createClass(List, [{
		key: 'getParentStyle',
		value: function getParentStyle() {
			var definition = this.wDoc.style.get(require('./numberingDefinition').asStyleId(this.wXml.$1('abstractNumId').attr('w:val')));
			if (definition.link) {
				return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle();
			} else return definition;
		}
	}, {
		key: 'getNumId',
		value: function getNumId() {
			return this.wXml.attr('w:numId');
		}
	}, {
		key: 'hasOverride',
		value: function hasOverride() {
			return this.wXml.childNodes.length != 1;
		}
	}], [{
		key: 'asStyleId',
		value: function asStyleId(numId) {
			return '_list' + numId;
		}
	}, {
		key: 'type',
		get: function get() {
			return 'style.list';
		}
	}]);

	return List;
})(require('../style'));

exports['default'] = List;
module.exports = exports['default'];
//# sourceMappingURL=list.js.map