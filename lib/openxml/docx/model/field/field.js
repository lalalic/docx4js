'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Field = function (_require) {
	_inherits(Field, _require);

	function Field(instruct, doc, parent, type) {
		_classCallCheck(this, Field);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));

		_this.command = new _this.constructor.FieldCode(instruct);
		_this.command.parse();
		if (type) _this.type = 'field.' + type;
		return _this;
	}

	_createClass(Field, [{
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
}(require('../../model'));

exports.default = Field;

var Command = function () {
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
			while (++i < len && seperators.indexOf(this.data.charAt(i)) == -1) {}

			var node = this.data.substring(0, i).trim();

			//ignore all seperator chars
			if (i < len) while (++i < len && seperators.indexOf(this.data.charAt(i)) != -1) {}

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
}();

var Switch = function (_Command) {
	_inherits(Switch, _Command);

	function Switch(cmd) {
		_classCallCheck(this, Switch);

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Switch).apply(this, arguments));

		_this2.withQuote = false;
		_this2.type = cmd.charAt(0).toLowerCase;
		if (cmd.length > 1 && _this2.type != '*' && cmd.charAt(1) != ' ') {
			if (type.match(/\w/)) {
				//word case: \s1=\s 1
				try {
					parseInt(cmd.substring(1).trim());
					_this2.data = cmd.substring(1).trim();
					return _possibleConstructorReturn(_this2);
				} catch (e) {}
			}
			_this2.type = '!';
		} else {
			if (_this2.data.length > 1) _this2.data = _this2.data.substring(1).trim();else _this2.data = "";
		}
		_this2.__removeQuote();
		return _this2;
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
}(Command);

var FieldCode = function (_Command2) {
	_inherits(FieldCode, _Command2);

	function FieldCode(instruct) {
		_classCallCheck(this, FieldCode);

		var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(FieldCode).apply(this, arguments));

		_this3.mergeFormat = _this3.parseKeyWord("MERGEFORMAT");
		_this3.type = _this3.nextNode();
		return _this3;
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
}(Command);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUI7OztBQUNwQixVQURvQixLQUNwQixDQUFZLFFBQVosRUFBcUIsR0FBckIsRUFBMEIsTUFBMUIsRUFBaUMsSUFBakMsRUFBc0M7d0JBRGxCLE9BQ2tCOztxRUFEbEIsbUJBRVYsWUFENEI7O0FBRXJDLFFBQUssT0FBTCxHQUFhLElBQUksTUFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLFFBQS9CLENBQWIsQ0FGcUM7QUFHckMsUUFBSyxPQUFMLENBQWEsS0FBYixHQUhxQztBQUlyQyxNQUFHLElBQUgsRUFDQyxNQUFLLElBQUwsY0FBbUIsSUFBbkIsQ0FERDtlQUpxQztFQUF0Qzs7Y0FEb0I7OytCQVNSO0FBQ1gsVUFBTyxLQUFLLE9BQUwsQ0FESTs7OztzQkFJSztBQUFDLFVBQU8sT0FBUCxDQUFEOzs7O3NCQUVHO0FBQUMsVUFBTyxPQUFQLENBQUQ7Ozs7c0JBRUQ7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7OztzQkFFRztBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBbkJGO0VBQWMsUUFBUSxhQUFSOztrQkFBZDs7SUFzQmY7QUFDTCxVQURLLE9BQ0wsQ0FBWSxRQUFaLEVBQXFCO3dCQURoQixTQUNnQjs7QUFDcEIsT0FBSyxJQUFMLEdBQVUsUUFBVixDQURvQjtFQUFyQjs7Y0FESzs7NEJBS0ssWUFBVztBQUNwQixPQUFHLEtBQUssSUFBTCxDQUFVLE1BQVYsSUFBa0IsQ0FBbEIsRUFDRixPQUFPLEVBQVAsQ0FERDtBQUVBLE9BQUksSUFBRSxDQUFDLENBQUQ7T0FBSSxNQUFJLEtBQUssSUFBTCxDQUFVLE1BQVY7O0FBSE0sVUFLZCxFQUFHLENBQUYsR0FBSyxHQUFOLElBQWEsV0FBVyxPQUFYLENBQW1CLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsQ0FBakIsQ0FBbkIsS0FBeUMs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Ozs7OytCQU9MO0FBQ1gsT0FBSSxTQUFPLEtBQUssU0FBTCxDQUFlLElBQWYsQ0FBUCxDQURPO0FBRVgsT0FBRyxVQUFRLElBQVIsSUFBZ0IsT0FBTyxNQUFQLElBQWUsQ0FBZixFQUNsQixPQUFPLElBQVAsQ0FERDs7QUFHQSxVQUFPLElBQUksTUFBSixDQUFXLE1BQVgsQ0FBUCxDQUxXOzs7OzBCQU9MOzs7UUFwQkY7RUFBa0IiLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZCBleHRlbmRzIHJlcXVpcmUoJy4uLy4uL21vZGVsJyl7XG5cdGNvbnN0cnVjdG9yKGluc3RydWN0LGRvYywgcGFyZW50LHR5cGUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmNvbW1hbmQ9bmV3IHRoaXMuY29uc3RydWN0b3IuRmllbGRDb2RlKGluc3RydWN0KVxuXHRcdHRoaXMuY29tbWFuZC5wYXJzZSgpXG5cdFx0aWYodHlwZSlcblx0XHRcdHRoaXMudHlwZT1gZmllbGQuJHt0eXBlfWBcblx0fVxuXG5cdGdldENvbW1hbmQoKXtcblx0XHRyZXR1cm4gdGhpcy5jb21tYW5kXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkJ31cblxuXHRzdGF0aWMgZ2V0IENvbW1hbmQoKXtyZXR1cm4gQ29tbWFuZH1cblxuXHRzdGF0aWMgZ2V0IFN3aXRjaCgpe3JldHVybiBTd2l0Y2h9XG5cblx0c3RhdGljIGdldCBGaWVsZENvZGUoKXtyZXR1cm4gRmllbGRDb2RlfVxufVxuXG5jbGFzcyBDb21tYW5ke1xuXHRjb25zdHJ1Y3RvcihpbnN0cnVjdCl7XG5cdFx0dGhpcy5kYXRhPWluc3RydWN0XG5cdH1cblxuXHRuZXh0VW50aWwoc2VwZXJhdG9ycyl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdHZhciBpPS0xLCBsZW49dGhpcy5kYXRhLmxlbmd0aDtcblx0XHQvL2ZpbmQgYW55IG9uZSBvZiBzZXBlcmF0b3IgY2hhcnNcblx0XHR3aGlsZSgoKytpKTxsZW4gJiYgc2VwZXJhdG9ycy5pbmRleE9mKHRoaXMuZGF0YS5jaGFyQXQoaSkpPT0tMSk7XG5cblx0XHR2YXIgbm9kZT10aGlzLmRhdGEuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKTtcblxuXHRcdC8vaWdub3JlIGFsbCBzZXBlcmF0b3IgY2hhcnNcblx0XHRpZihpPGxlbilcblx0XHRcdHdoaWxlKCsraTxsZW4gJiYgc2VwZXJhdG9ycy5pbmRleE9mKHRoaXMuZGF0YS5jaGFyQXQoaSkpIT0tMSk7XG5cblx0XHQvL2xlZnQgdGhpcy5kYXRhXG5cdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoaSkudHJpbSgpO1xuXHRcdHJldHVybiBub2RlO1xuXHR9XG5cdG5leHROb2RlKCl7XG5cdFx0cmV0dXJuIHRoaXMubmV4dFVudGlsKFwiIFxcXFxcIilcblx0fVxuXHRhc0ludChzLCBkZWZhdWx0VmFsdWUpe1xuXHRcdHRyeXtcblx0XHRcdHJldHVybiBwYXJzZUludChzKVxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlfHwwXG5cdFx0fVxuXHR9XG59XG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDb21tYW5ke1xuXHRjb25zdHJ1Y3RvcihjbWQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndpdGhRdW90ZT1mYWxzZVxuXHRcdHRoaXMudHlwZT1jbWQuY2hhckF0KDApLnRvTG93ZXJDYXNlXG5cdFx0aWYoY21kLmxlbmd0aD4xICYmIHRoaXMudHlwZSE9JyonICYmIGNtZC5jaGFyQXQoMSkhPScgJyl7XG5cdFx0XHRpZih0eXBlLm1hdGNoKC9cXHcvKSl7Ly93b3JkIGNhc2U6IFxcczE9XFxzIDFcblx0XHRcdFx0IHRyeSB7XG5cdFx0XHRcdFx0cGFyc2VJbnQoY21kLnN1YnN0cmluZygxKS50cmltKCkpO1xuXHRcdFx0XHRcdHRoaXMuZGF0YT1jbWQuc3Vic3RyaW5nKDEpLnRyaW0oKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnR5cGU9JyEnO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYodGhpcy5kYXRhLmxlbmd0aD4xKVxuXHRcdFx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZygxKS50cmltKCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuZGF0YT1cIlwiO1xuXHRcdH1cblx0XHR0aGlzLl9fcmVtb3ZlUXVvdGUoKTtcblx0fVxuXHRfX3JlbW92ZVF1b3RlKCl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybjtcblx0XHR2YXIgYT10aGlzLmRhdGEuY2hhckF0KDApO1xuXHRcdGlmKGE9PSdcIicgfHwgYT09J1xcJycpe1xuXHRcdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoMSk7XG5cdFx0XHR0aGlzLndpdGhRdW90ZT10cnVlO1xuXHRcdH1cblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuO1xuXHRcdGE9dGhpcy5kYXRhLmNoYXJBdCh0aGlzLmRhdGEubGVuZ3RoLTEpO1xuXHRcdGlmKGE9PSdcIicgfHwgYT09J1xcJycpe1xuXHRcdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoMCx0aGlzLmRhdGEubGVuZ3RoLTEpO1xuXHRcdFx0dGhpcy53aXRoUXVvdGU9dHJ1ZTtcblx0XHR9XG5cdH1cblx0X3NwbGl0MkludCgpe1xuXHRcdGlmKHRoaXMuZGF0YT09bnVsbCB8fCB0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0dmFyIGE9ZGF0YS5zcGxpdChcIi1cIik7XG5cdFx0aWYoYS5sZW5ndGg9PTApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR2YXIgYj1bXVxuXHRcdGZvcih2YXIgaT0wLCBsZW49YS5sZW5ndGg7IGk8bGVuOyBpKyspe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YltpXT1wYXJzZUludChhW2ldKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0YltpXT0wO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYjtcblx0fVxufVxuY2xhc3MgRmllbGRDb2RlIGV4dGVuZHMgQ29tbWFuZHtcblx0Y29uc3RydWN0b3IoaW5zdHJ1Y3Qpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLm1lcmdlRm9ybWF0PXRoaXMucGFyc2VLZXlXb3JkKFwiTUVSR0VGT1JNQVRcIilcblx0XHR0aGlzLnR5cGU9dGhpcy5uZXh0Tm9kZSgpXG5cdH1cblx0cGFyc2VLZXlXb3JkKGtleSl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR2YXIgbGVuPXRoaXMuZGF0YS5sZW5ndGg7XG5cdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxcKlxcXFxzKlwiK2tleStcIlxcXFxzKlwiLCBcImlnXCIpLFwiXCIpO1xuXHRcdHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIT1sZW47XG5cdH1cblx0bmV4dFN3aXRjaCgpe1xuXHRcdHZhciBvcHRpb249dGhpcy5uZXh0VW50aWwoXCJcXFxcXCIpO1xuXHRcdGlmKG9wdGlvbj09bnVsbCB8fCBvcHRpb24ubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gbmV3IFN3aXRjaChvcHRpb24pO1xuXHR9XG5cdHBhcnNlKCl7fVxufVxuIl19