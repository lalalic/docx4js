'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = (function (_require) {
	_inherits(Field, _require);

	function Field(instruct, doc, parent) {
		_classCallCheck(this, Field);

		_get(Object.getPrototypeOf(Field.prototype), 'constructor', this).apply(this, arguments);
		this.command = new this.constructor.FieldCode(instruct);
		this.command.parse();
	}

	_createClass(Field, [{
		key: 'parse',
		value: function parse(visitors, endVisitors) {
			for (var i = 0, len = visitors.length; i < len; i++) visitors[i].visit(this, endVisitors[i]);
		}
	}, {
		key: 'getCommand',
		value: function getCommand() {
			return this.command;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'field';
		}
	}, {
		key: 'Command',
		get: function get() {
			return Command;
		}
	}, {
		key: 'Switch',
		get: function get() {
			return Switch;
		}
	}, {
		key: 'FieldCode',
		get: function get() {
			return FieldCode;
		}
	}]);

	return Field;
})(require('../../model'));

exports['default'] = Field;

var Command = (function () {
	function Command(instruct) {
		_classCallCheck(this, Command);

		this.data = instruct;
	}

	_createClass(Command, [{
		key: 'nextUntil',
		value: function nextUntil(seperators) {
			if (this.data.length == 0) return "";
			var i = -1,
			    len = this.data.length;
			//find any one of seperator chars
			while (++i < len && seperators.indexOf(this.data.charAt(i)) == -1);

			var node = this.data.substring(0, i).trim();

			//ignore all seperator chars
			if (i < len) while (++i < len && seperators.indexOf(this.data.charAt(i)) != -1);

			//left this.data
			this.data = this.data.substring(i).trim();
			return node;
		}
	}, {
		key: 'nextNode',
		value: function nextNode() {
			return this.nextUntil(" \\");
		}
	}, {
		key: 'asInt',
		value: function asInt(s, defaultValue) {
			try {
				return parseInt(s);
			} catch (error) {
				return defaultValue || 0;
			}
		}
	}]);

	return Command;
})();

var Switch = (function (_Command) {
	_inherits(Switch, _Command);

	function Switch(cmd) {
		_classCallCheck(this, Switch);

		_get(Object.getPrototypeOf(Switch.prototype), 'constructor', this).apply(this, arguments);
		this.withQuote = false;
		this.type = cmd.charAt(0).toLowerCase;
		if (cmd.length > 1 && this.type != '*' && cmd.charAt(1) != ' ') {
			if (type.match(/\w/)) {
				//word case: \s1=\s 1
				try {
					parseInt(cmd.substring(1).trim());
					this.data = cmd.substring(1).trim();
					return;
				} catch (e) {}
			}
			this.type = '!';
		} else {
			if (this.data.length > 1) this.data = this.data.substring(1).trim();else this.data = "";
		}
		this.__removeQuote();
	}

	_createClass(Switch, [{
		key: '__removeQuote',
		value: function __removeQuote() {
			if (this.data.length == 0) return;
			var a = this.data.charAt(0);
			if (a == '"' || a == '\'') {
				this.data = this.data.substring(1);
				this.withQuote = true;
			}
			if (this.data.length == 0) return;
			a = this.data.charAt(this.data.length - 1);
			if (a == '"' || a == '\'') {
				this.data = this.data.substring(0, this.data.length - 1);
				this.withQuote = true;
			}
		}
	}, {
		key: '_split2Int',
		value: function _split2Int() {
			if (this.data == null || this.data.length == 0) return null;
			var a = data.split("-");
			if (a.length == 0) return null;
			var b = [];
			for (var i = 0, len = a.length; i < len; i++) {
				try {
					b[i] = parseInt(a[i]);
				} catch (e) {
					b[i] = 0;
				}
			}
			return b;
		}
	}]);

	return Switch;
})(Command);

var FieldCode = (function (_Command2) {
	_inherits(FieldCode, _Command2);

	function FieldCode(instruct) {
		_classCallCheck(this, FieldCode);

		_get(Object.getPrototypeOf(FieldCode.prototype), 'constructor', this).apply(this, arguments);
		this.mergeFormat = this.parseKeyWord("MERGEFORMAT");
		this.type = this.nextNode();
	}

	_createClass(FieldCode, [{
		key: 'parseKeyWord',
		value: function parseKeyWord(key) {
			if (this.data.length == 0) return false;
			var len = this.data.length;
			this.data = this.data.replace(new RegExp("\\*\\s*" + key + "\\s*", "ig"), "");
			return this.data.length != len;
		}
	}, {
		key: 'nextSwitch',
		value: function nextSwitch() {
			var option = this.nextUntil("\\");
			if (option == null || option.length == 0) return null;

			return new Switch(option);
		}
	}, {
		key: 'parse',
		value: function parse() {}
	}]);

	return FieldCode;
})(Command);

module.exports = exports['default'];
//# sourceMappingURL=field.js.map