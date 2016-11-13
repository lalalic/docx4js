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

		var _this = _possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));

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

		var _this2 = _possibleConstructorReturn(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).apply(this, arguments));

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

		var _this3 = _possibleConstructorReturn(this, (FieldCode.__proto__ || Object.getPrototypeOf(FieldCode)).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOlsiRmllbGQiLCJpbnN0cnVjdCIsImRvYyIsInBhcmVudCIsInR5cGUiLCJhcmd1bWVudHMiLCJjb21tYW5kIiwiY29uc3RydWN0b3IiLCJGaWVsZENvZGUiLCJwYXJzZSIsIkNvbW1hbmQiLCJTd2l0Y2giLCJyZXF1aXJlIiwiZGF0YSIsInNlcGVyYXRvcnMiLCJsZW5ndGgiLCJpIiwibGVuIiwiaW5kZXhPZiIsImNoYXJBdCIsIm5vZGUiLCJzdWJzdHJpbmciLCJ0cmltIiwibmV4dFVudGlsIiwicyIsImRlZmF1bHRWYWx1ZSIsInBhcnNlSW50IiwiZXJyb3IiLCJjbWQiLCJ3aXRoUXVvdGUiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiZSIsIl9fcmVtb3ZlUXVvdGUiLCJhIiwic3BsaXQiLCJiIiwibWVyZ2VGb3JtYXQiLCJwYXJzZUtleVdvcmQiLCJuZXh0Tm9kZSIsImtleSIsInJlcGxhY2UiLCJSZWdFeHAiLCJvcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxLOzs7QUFDcEIsZ0JBQVlDLFFBQVosRUFBcUJDLEdBQXJCLEVBQTBCQyxNQUExQixFQUFpQ0MsSUFBakMsRUFBc0M7QUFBQTs7QUFBQSw2R0FDNUJDLFNBRDRCOztBQUVyQyxRQUFLQyxPQUFMLEdBQWEsSUFBSSxNQUFLQyxXQUFMLENBQWlCQyxTQUFyQixDQUErQlAsUUFBL0IsQ0FBYjtBQUNBLFFBQUtLLE9BQUwsQ0FBYUcsS0FBYjtBQUNBLE1BQUdMLElBQUgsRUFDQyxNQUFLQSxJQUFMLGNBQW1CQSxJQUFuQjtBQUxvQztBQU1yQzs7OzsrQkFFVztBQUNYLFVBQU8sS0FBS0UsT0FBWjtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxPQUFQO0FBQWU7OztzQkFFYjtBQUFDLFVBQU9JLE9BQVA7QUFBZTs7O3NCQUVqQjtBQUFDLFVBQU9DLE1BQVA7QUFB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QyxXQUFMLEdBQWlCLE9BQUtDLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBakI7QUFDQSxTQUFLbEMsSUFBTCxHQUFVLE9BQUttQyxRQUFMLEVBQVY7QUFIb0I7QUFJcEI7Ozs7K0JBQ1lDLEcsRUFBSTtBQUNoQixPQUFHLEtBQUszQixJQUFMLENBQVVFLE1BQVYsSUFBa0IsQ0FBckIsRUFDQyxPQUFPLEtBQVA7QUFDRCxPQUFJRSxNQUFJLEtBQUtKLElBQUwsQ0FBVUUsTUFBbEI7QUFDQSxRQUFLRixJQUFMLEdBQVUsS0FBS0EsSUFBTCxDQUFVNEIsT0FBVixDQUFrQixJQUFJQyxNQUFKLENBQVcsWUFBVUYsR0FBVixHQUFjLE1BQXpCLEVBQWlDLElBQWpDLENBQWxCLEVBQXlELEVBQXpELENBQVY7QUFDQSxVQUFPLEtBQUszQixJQUFMLENBQVVFLE1BQVYsSUFBa0JFLEdBQXpCO0FBQ0E7OzsrQkFDVztBQUNYLE9BQUkwQixTQUFPLEtBQUtwQixTQUFMLENBQWUsSUFBZixDQUFYO0FBQ0EsT0FBR29CLFVBQVEsSUFBUixJQUFnQkEsT0FBTzVCLE1BQVAsSUFBZSxDQUFsQyxFQUNDLE9BQU8sSUFBUDs7QUFFRCxVQUFPLElBQUlKLE1BQUosQ0FBV2dDLE1BQVgsQ0FBUDtBQUNBOzs7MEJBQ00sQ0FBRTs7OztFQXBCY2pDLE8iLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZCBleHRlbmRzIHJlcXVpcmUoJy4uLy4uL21vZGVsJyl7XG5cdGNvbnN0cnVjdG9yKGluc3RydWN0LGRvYywgcGFyZW50LHR5cGUpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmNvbW1hbmQ9bmV3IHRoaXMuY29uc3RydWN0b3IuRmllbGRDb2RlKGluc3RydWN0KVxuXHRcdHRoaXMuY29tbWFuZC5wYXJzZSgpXG5cdFx0aWYodHlwZSlcblx0XHRcdHRoaXMudHlwZT1gZmllbGQuJHt0eXBlfWBcblx0fVxuXG5cdGdldENvbW1hbmQoKXtcblx0XHRyZXR1cm4gdGhpcy5jb21tYW5kXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2ZpZWxkJ31cblxuXHRzdGF0aWMgZ2V0IENvbW1hbmQoKXtyZXR1cm4gQ29tbWFuZH1cblxuXHRzdGF0aWMgZ2V0IFN3aXRjaCgpe3JldHVybiBTd2l0Y2h9XG5cblx0c3RhdGljIGdldCBGaWVsZENvZGUoKXtyZXR1cm4gRmllbGRDb2RlfVxufVxuXG5jbGFzcyBDb21tYW5ke1xuXHRjb25zdHJ1Y3RvcihpbnN0cnVjdCl7XG5cdFx0dGhpcy5kYXRhPWluc3RydWN0XG5cdH1cblxuXHRuZXh0VW50aWwoc2VwZXJhdG9ycyl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdHZhciBpPS0xLCBsZW49dGhpcy5kYXRhLmxlbmd0aDtcblx0XHQvL2ZpbmQgYW55IG9uZSBvZiBzZXBlcmF0b3IgY2hhcnNcblx0XHR3aGlsZSgoKytpKTxsZW4gJiYgc2VwZXJhdG9ycy5pbmRleE9mKHRoaXMuZGF0YS5jaGFyQXQoaSkpPT0tMSk7XG5cblx0XHR2YXIgbm9kZT10aGlzLmRhdGEuc3Vic3RyaW5nKDAsIGkpLnRyaW0oKTtcblxuXHRcdC8vaWdub3JlIGFsbCBzZXBlcmF0b3IgY2hhcnNcblx0XHRpZihpPGxlbilcblx0XHRcdHdoaWxlKCsraTxsZW4gJiYgc2VwZXJhdG9ycy5pbmRleE9mKHRoaXMuZGF0YS5jaGFyQXQoaSkpIT0tMSk7XG5cblx0XHQvL2xlZnQgdGhpcy5kYXRhXG5cdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoaSkudHJpbSgpO1xuXHRcdHJldHVybiBub2RlO1xuXHR9XG5cdG5leHROb2RlKCl7XG5cdFx0cmV0dXJuIHRoaXMubmV4dFVudGlsKFwiIFxcXFxcIilcblx0fVxuXHRhc0ludChzLCBkZWZhdWx0VmFsdWUpe1xuXHRcdHRyeXtcblx0XHRcdHJldHVybiBwYXJzZUludChzKVxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlfHwwXG5cdFx0fVxuXHR9XG59XG5jbGFzcyBTd2l0Y2ggZXh0ZW5kcyBDb21tYW5ke1xuXHRjb25zdHJ1Y3RvcihjbWQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndpdGhRdW90ZT1mYWxzZVxuXHRcdHRoaXMudHlwZT1jbWQuY2hhckF0KDApLnRvTG93ZXJDYXNlXG5cdFx0aWYoY21kLmxlbmd0aD4xICYmIHRoaXMudHlwZSE9JyonICYmIGNtZC5jaGFyQXQoMSkhPScgJyl7XG5cdFx0XHRpZih0eXBlLm1hdGNoKC9cXHcvKSl7Ly93b3JkIGNhc2U6IFxcczE9XFxzIDFcblx0XHRcdFx0IHRyeSB7XG5cdFx0XHRcdFx0cGFyc2VJbnQoY21kLnN1YnN0cmluZygxKS50cmltKCkpO1xuXHRcdFx0XHRcdHRoaXMuZGF0YT1jbWQuc3Vic3RyaW5nKDEpLnRyaW0oKTtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHR0aGlzLnR5cGU9JyEnO1xuXHRcdH1lbHNle1xuXHRcdFx0aWYodGhpcy5kYXRhLmxlbmd0aD4xKVxuXHRcdFx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZygxKS50cmltKCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuZGF0YT1cIlwiO1xuXHRcdH1cblx0XHR0aGlzLl9fcmVtb3ZlUXVvdGUoKTtcblx0fVxuXHRfX3JlbW92ZVF1b3RlKCl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybjtcblx0XHR2YXIgYT10aGlzLmRhdGEuY2hhckF0KDApO1xuXHRcdGlmKGE9PSdcIicgfHwgYT09J1xcJycpe1xuXHRcdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoMSk7XG5cdFx0XHR0aGlzLndpdGhRdW90ZT10cnVlO1xuXHRcdH1cblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuO1xuXHRcdGE9dGhpcy5kYXRhLmNoYXJBdCh0aGlzLmRhdGEubGVuZ3RoLTEpO1xuXHRcdGlmKGE9PSdcIicgfHwgYT09J1xcJycpe1xuXHRcdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoMCx0aGlzLmRhdGEubGVuZ3RoLTEpO1xuXHRcdFx0dGhpcy53aXRoUXVvdGU9dHJ1ZTtcblx0XHR9XG5cdH1cblx0X3NwbGl0MkludCgpe1xuXHRcdGlmKHRoaXMuZGF0YT09bnVsbCB8fCB0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0dmFyIGE9ZGF0YS5zcGxpdChcIi1cIik7XG5cdFx0aWYoYS5sZW5ndGg9PTApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR2YXIgYj1bXVxuXHRcdGZvcih2YXIgaT0wLCBsZW49YS5sZW5ndGg7IGk8bGVuOyBpKyspe1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0YltpXT1wYXJzZUludChhW2ldKTtcblx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0YltpXT0wO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYjtcblx0fVxufVxuY2xhc3MgRmllbGRDb2RlIGV4dGVuZHMgQ29tbWFuZHtcblx0Y29uc3RydWN0b3IoaW5zdHJ1Y3Qpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLm1lcmdlRm9ybWF0PXRoaXMucGFyc2VLZXlXb3JkKFwiTUVSR0VGT1JNQVRcIilcblx0XHR0aGlzLnR5cGU9dGhpcy5uZXh0Tm9kZSgpXG5cdH1cblx0cGFyc2VLZXlXb3JkKGtleSl7XG5cdFx0aWYodGhpcy5kYXRhLmxlbmd0aD09MClcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR2YXIgbGVuPXRoaXMuZGF0YS5sZW5ndGg7XG5cdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5yZXBsYWNlKG5ldyBSZWdFeHAoXCJcXFxcKlxcXFxzKlwiK2tleStcIlxcXFxzKlwiLCBcImlnXCIpLFwiXCIpO1xuXHRcdHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIT1sZW47XG5cdH1cblx0bmV4dFN3aXRjaCgpe1xuXHRcdHZhciBvcHRpb249dGhpcy5uZXh0VW50aWwoXCJcXFxcXCIpO1xuXHRcdGlmKG9wdGlvbj09bnVsbCB8fCBvcHRpb24ubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cblx0XHRyZXR1cm4gbmV3IFN3aXRjaChvcHRpb24pO1xuXHR9XG5cdHBhcnNlKCl7fVxufVxuIl19