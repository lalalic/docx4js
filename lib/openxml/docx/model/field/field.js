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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOlsiRmllbGQiLCJpbnN0cnVjdCIsImRvYyIsInBhcmVudCIsInR5cGUiLCJhcmd1bWVudHMiLCJjb21tYW5kIiwiY29uc3RydWN0b3IiLCJGaWVsZENvZGUiLCJwYXJzZSIsIkNvbW1hbmQiLCJTd2l0Y2giLCJyZXF1aXJlIiwiZGF0YSIsInNlcGVyYXRvcnMiLCJsZW5ndGgiLCJpIiwibGVuIiwiaW5kZXhPZiIsImNoYXJBdCIsIm5vZGUiLCJzdWJzdHJpbmciLCJ0cmltIiwibmV4dFVudGlsIiwicyIsImRlZmF1bHRWYWx1ZSIsInBhcnNlSW50IiwiZXJyb3IiLCJjbWQiLCJ3aXRoUXVvdGUiLCJ0b0xvd2VyQ2FzZSIsIm1hdGNoIiwiZSIsIl9fcmVtb3ZlUXVvdGUiLCJhIiwic3BsaXQiLCJiIiwibWVyZ2VGb3JtYXQiLCJwYXJzZUtleVdvcmQiLCJuZXh0Tm9kZSIsImtleSIsInJlcGxhY2UiLCJSZWdFeHAiLCJvcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxLOzs7QUFDcEIsZ0JBQVlDLFFBQVosRUFBcUJDLEdBQXJCLEVBQTBCQyxNQUExQixFQUFpQ0MsSUFBakMsRUFBc0M7QUFBQTs7QUFBQSw2R0FDNUJDLFNBRDRCOztBQUVyQyxRQUFLQyxPQUFMLEdBQWEsSUFBSSxNQUFLQyxXQUFMLENBQWlCQyxTQUFyQixDQUErQlAsUUFBL0IsQ0FBYjtBQUNBLFFBQUtLLE9BQUwsQ0FBYUcsS0FBYjtBQUNBLE1BQUdMLElBQUgsRUFDQyxNQUFLQSxJQUFMLGNBQW1CQSxJQUFuQjtBQUxvQztBQU1yQzs7OzsrQkFFVztBQUNYLFVBQU8sS0FBS0UsT0FBWjtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxPQUFQO0FBQWU7OztzQkFFYjtBQUFDLFVBQU9JLE9BQVA7QUFBZTs7O3NCQUVqQjtBQUFDLFVBQU9DLE1BQVA7QUFB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QyxXQUFMLEdBQWlCLE9BQUtDLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBakI7QUFDQSxTQUFLbEMsSUFBTCxHQUFVLE9BQUttQyxRQUFMLEVBQVY7QUFIb0I7QUFJcEI7Ozs7K0JBQ1lDLEcsRUFBSTtBQUNoQixPQUFHLEtBQUszQixJQUFMLENBQVVFLE1BQVYsSUFBa0IsQ0FBckIsRUFDQyxPQUFPLEtBQVA7QUFDRCxPQUFJRSxNQUFJLEtBQUtKLElBQUwsQ0FBVUUsTUFBbEI7QUFDQSxRQUFLRixJQUFMLEdBQVUsS0FBS0EsSUFBTCxDQUFVNEIsT0FBVixDQUFrQixJQUFJQyxNQUFKLENBQVcsWUFBVUYsR0FBVixHQUFjLE1BQXpCLEVBQWlDLElBQWpDLENBQWxCLEVBQXlELEVBQXpELENBQVY7QUFDQSxVQUFPLEtBQUszQixJQUFMLENBQVVFLE1BQVYsSUFBa0JFLEdBQXpCO0FBQ0E7OzsrQkFDVztBQUNYLE9BQUkwQixTQUFPLEtBQUtwQixTQUFMLENBQWUsSUFBZixDQUFYO0FBQ0EsT0FBR29CLFVBQVEsSUFBUixJQUFnQkEsT0FBTzVCLE1BQVAsSUFBZSxDQUFsQyxFQUNDLE9BQU8sSUFBUDs7QUFFRCxVQUFPLElBQUlKLE1BQUosQ0FBV2dDLE1BQVgsQ0FBUDtBQUNBOzs7MEJBQ00sQ0FBRTs7OztFQXBCY2pDLE8iLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBGaWVsZCBleHRlbmRzIHJlcXVpcmUoJy4uLy4uL21vZGVsJyl7XHJcblx0Y29uc3RydWN0b3IoaW5zdHJ1Y3QsZG9jLCBwYXJlbnQsdHlwZSl7XHJcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLmNvbW1hbmQ9bmV3IHRoaXMuY29uc3RydWN0b3IuRmllbGRDb2RlKGluc3RydWN0KVxyXG5cdFx0dGhpcy5jb21tYW5kLnBhcnNlKClcclxuXHRcdGlmKHR5cGUpXHJcblx0XHRcdHRoaXMudHlwZT1gZmllbGQuJHt0eXBlfWBcclxuXHR9XHJcblxyXG5cdGdldENvbW1hbmQoKXtcclxuXHRcdHJldHVybiB0aGlzLmNvbW1hbmRcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGQnfVxyXG5cclxuXHRzdGF0aWMgZ2V0IENvbW1hbmQoKXtyZXR1cm4gQ29tbWFuZH1cclxuXHJcblx0c3RhdGljIGdldCBTd2l0Y2goKXtyZXR1cm4gU3dpdGNofVxyXG5cclxuXHRzdGF0aWMgZ2V0IEZpZWxkQ29kZSgpe3JldHVybiBGaWVsZENvZGV9XHJcbn1cclxuXHJcbmNsYXNzIENvbW1hbmR7XHJcblx0Y29uc3RydWN0b3IoaW5zdHJ1Y3Qpe1xyXG5cdFx0dGhpcy5kYXRhPWluc3RydWN0XHJcblx0fVxyXG5cclxuXHRuZXh0VW50aWwoc2VwZXJhdG9ycyl7XHJcblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gXCJcIjtcclxuXHRcdHZhciBpPS0xLCBsZW49dGhpcy5kYXRhLmxlbmd0aDtcclxuXHRcdC8vZmluZCBhbnkgb25lIG9mIHNlcGVyYXRvciBjaGFyc1xyXG5cdFx0d2hpbGUoKCsraSk8bGVuICYmIHNlcGVyYXRvcnMuaW5kZXhPZih0aGlzLmRhdGEuY2hhckF0KGkpKT09LTEpO1xyXG5cclxuXHRcdHZhciBub2RlPXRoaXMuZGF0YS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpO1xyXG5cclxuXHRcdC8vaWdub3JlIGFsbCBzZXBlcmF0b3IgY2hhcnNcclxuXHRcdGlmKGk8bGVuKVxyXG5cdFx0XHR3aGlsZSgrK2k8bGVuICYmIHNlcGVyYXRvcnMuaW5kZXhPZih0aGlzLmRhdGEuY2hhckF0KGkpKSE9LTEpO1xyXG5cclxuXHRcdC8vbGVmdCB0aGlzLmRhdGFcclxuXHRcdHRoaXMuZGF0YT10aGlzLmRhdGEuc3Vic3RyaW5nKGkpLnRyaW0oKTtcclxuXHRcdHJldHVybiBub2RlO1xyXG5cdH1cclxuXHRuZXh0Tm9kZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubmV4dFVudGlsKFwiIFxcXFxcIilcclxuXHR9XHJcblx0YXNJbnQocywgZGVmYXVsdFZhbHVlKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHMpXHJcblx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRyZXR1cm4gZGVmYXVsdFZhbHVlfHwwXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbmNsYXNzIFN3aXRjaCBleHRlbmRzIENvbW1hbmR7XHJcblx0Y29uc3RydWN0b3IoY21kKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud2l0aFF1b3RlPWZhbHNlXHJcblx0XHR0aGlzLnR5cGU9Y21kLmNoYXJBdCgwKS50b0xvd2VyQ2FzZVxyXG5cdFx0aWYoY21kLmxlbmd0aD4xICYmIHRoaXMudHlwZSE9JyonICYmIGNtZC5jaGFyQXQoMSkhPScgJyl7XHJcblx0XHRcdGlmKHR5cGUubWF0Y2goL1xcdy8pKXsvL3dvcmQgY2FzZTogXFxzMT1cXHMgMVxyXG5cdFx0XHRcdCB0cnkge1xyXG5cdFx0XHRcdFx0cGFyc2VJbnQoY21kLnN1YnN0cmluZygxKS50cmltKCkpO1xyXG5cdFx0XHRcdFx0dGhpcy5kYXRhPWNtZC5zdWJzdHJpbmcoMSkudHJpbSgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMudHlwZT0nISc7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5kYXRhLmxlbmd0aD4xKVxyXG5cdFx0XHRcdHRoaXMuZGF0YT10aGlzLmRhdGEuc3Vic3RyaW5nKDEpLnRyaW0oKTtcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHRoaXMuZGF0YT1cIlwiO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5fX3JlbW92ZVF1b3RlKCk7XHJcblx0fVxyXG5cdF9fcmVtb3ZlUXVvdGUoKXtcclxuXHRcdGlmKHRoaXMuZGF0YS5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybjtcclxuXHRcdHZhciBhPXRoaXMuZGF0YS5jaGFyQXQoMCk7XHJcblx0XHRpZihhPT0nXCInIHx8IGE9PSdcXCcnKXtcclxuXHRcdFx0dGhpcy5kYXRhPXRoaXMuZGF0YS5zdWJzdHJpbmcoMSk7XHJcblx0XHRcdHRoaXMud2l0aFF1b3RlPXRydWU7XHJcblx0XHR9XHJcblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm47XHJcblx0XHRhPXRoaXMuZGF0YS5jaGFyQXQodGhpcy5kYXRhLmxlbmd0aC0xKTtcclxuXHRcdGlmKGE9PSdcIicgfHwgYT09J1xcJycpe1xyXG5cdFx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZygwLHRoaXMuZGF0YS5sZW5ndGgtMSk7XHJcblx0XHRcdHRoaXMud2l0aFF1b3RlPXRydWU7XHJcblx0XHR9XHJcblx0fVxyXG5cdF9zcGxpdDJJbnQoKXtcclxuXHRcdGlmKHRoaXMuZGF0YT09bnVsbCB8fCB0aGlzLmRhdGEubGVuZ3RoPT0wKVxyXG5cdFx0XHRyZXR1cm4gbnVsbDtcclxuXHRcdHZhciBhPWRhdGEuc3BsaXQoXCItXCIpO1xyXG5cdFx0aWYoYS5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cdFx0dmFyIGI9W11cclxuXHRcdGZvcih2YXIgaT0wLCBsZW49YS5sZW5ndGg7IGk8bGVuOyBpKyspe1xyXG5cdFx0XHR0cnkge1xyXG5cdFx0XHRcdGJbaV09cGFyc2VJbnQoYVtpXSk7XHJcblx0XHRcdH0gY2F0Y2ggKGUpIHtcclxuXHRcdFx0XHRiW2ldPTA7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBiO1xyXG5cdH1cclxufVxyXG5jbGFzcyBGaWVsZENvZGUgZXh0ZW5kcyBDb21tYW5ke1xyXG5cdGNvbnN0cnVjdG9yKGluc3RydWN0KXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMubWVyZ2VGb3JtYXQ9dGhpcy5wYXJzZUtleVdvcmQoXCJNRVJHRUZPUk1BVFwiKVxyXG5cdFx0dGhpcy50eXBlPXRoaXMubmV4dE5vZGUoKVxyXG5cdH1cclxuXHRwYXJzZUtleVdvcmQoa2V5KXtcclxuXHRcdGlmKHRoaXMuZGF0YS5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybiBmYWxzZTtcclxuXHRcdHZhciBsZW49dGhpcy5kYXRhLmxlbmd0aDtcclxuXHRcdHRoaXMuZGF0YT10aGlzLmRhdGEucmVwbGFjZShuZXcgUmVnRXhwKFwiXFxcXCpcXFxccypcIitrZXkrXCJcXFxccypcIiwgXCJpZ1wiKSxcIlwiKTtcclxuXHRcdHJldHVybiB0aGlzLmRhdGEubGVuZ3RoIT1sZW47XHJcblx0fVxyXG5cdG5leHRTd2l0Y2goKXtcclxuXHRcdHZhciBvcHRpb249dGhpcy5uZXh0VW50aWwoXCJcXFxcXCIpO1xyXG5cdFx0aWYob3B0aW9uPT1udWxsIHx8IG9wdGlvbi5sZW5ndGg9PTApXHJcblx0XHRcdHJldHVybiBudWxsO1xyXG5cclxuXHRcdHJldHVybiBuZXcgU3dpdGNoKG9wdGlvbik7XHJcblx0fVxyXG5cdHBhcnNlKCl7fVxyXG59XHJcbiJdfQ==