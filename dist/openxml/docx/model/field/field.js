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

	function Field(instruct, doc, parent) {
		_classCallCheck(this, Field);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Field).apply(this, arguments));

		_this.command = new _this.constructor.FieldCode(instruct);
		_this.command.parse();
		return _this;
	}

	_createClass(Field, [{
		key: 'parse',
		value: function parse(visitors, endVisitors) {
			for (var i = 0, len = visitors.length; i < len; i++) {
				visitors[i].visit(this, endVisitors[i]);
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGQvZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUI7OztBQUNwQixVQURvQixLQUNwQixDQUFZLFFBQVosRUFBcUIsR0FBckIsRUFBMEIsTUFBMUIsRUFBaUM7d0JBRGIsT0FDYTs7cUVBRGIsbUJBRVYsWUFEdUI7O0FBRWhDLFFBQUssT0FBTCxHQUFhLElBQUksTUFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLFFBQS9CLENBQWIsQ0FGZ0M7QUFHaEMsUUFBSyxPQUFMLENBQWEsS0FBYixHQUhnQzs7RUFBakM7O2NBRG9COzt3QkFPZCxVQUFVLGFBQVk7QUFDM0IsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFLLE1BQUksU0FBUyxNQUFULEVBQWdCLElBQUUsR0FBRixFQUFNLEdBQXZDO0FBQ0MsYUFBUyxDQUFULEVBQVksS0FBWixDQUFrQixJQUFsQixFQUF3QixZQUFZLENBQVosQ0FBeEI7SUFERDs7OzsrQkFHVztBQUNYLFVBQU8sS0FBSyxPQUFMLENBREk7Ozs7c0JBSUs7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztzQkFFRztBQUFDLFVBQU8sT0FBUCxDQUFEOzs7O3NCQUVEO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7c0JBRUc7QUFBQyxVQUFPLFNBQVAsQ0FBRDs7OztRQXJCRjtFQUFjLFFBQVEsYUFBUjs7a0JBQWQ7O0lBd0JmO0FBQ0wsVUFESyxPQUNMLENBQVksUUFBWixFQUFxQjt3QkFEaEIsU0FDZ0I7O0FBQ3BCLE9BQUssSUFBTCxHQUFVLFFBQVYsQ0FEb0I7RUFBckI7O2NBREs7OzRCQUtLLFlBQVc7QUFDcEIsT0FBRyxLQUFLLElBQUwsQ0FBVSxNQUFWLElBQWtCLENBQWxCLEVBQ0YsT0FBTyxFQUFQLENBREQ7QUFFQSxPQUFJLElBQUUsQ0FBQyxDQUFEO09BQUksTUFBSSxLQUFLLElBQUwsQ0FBVSxNQUFWOztBQUhNLFVB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RUFBc0IsSUFBakMsQ0FBbEIsRUFBeUQsRUFBekQsQ0FBVixDQUpnQjtBQUtoQixVQUFPLEtBQUssSUFBTCxDQUFVLE1BQVYsSUFBa0IsR0FBbEIsQ0FMUzs7OzsrQkFPTDtBQUNYLE9BQUksU0FBTyxLQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVAsQ0FETztBQUVYLE9BQUcsVUFBUSxJQUFSLElBQWdCLE9BQU8sTUFBUCxJQUFlLENBQWYsRUFDbEIsT0FBTyxJQUFQLENBREQ7O0FBR0EsVUFBTyxJQUFJLE1BQUosQ0FBVyxNQUFYLENBQVAsQ0FMVzs7OzswQkFPTDs7O1FBcEJGO0VBQWtCIiwiZmlsZSI6ImZpZWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmllbGQgZXh0ZW5kcyByZXF1aXJlKCcuLi8uLi9tb2RlbCcpe1xuXHRjb25zdHJ1Y3RvcihpbnN0cnVjdCxkb2MsIHBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuY29tbWFuZD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5GaWVsZENvZGUoaW5zdHJ1Y3QpXG5cdFx0dGhpcy5jb21tYW5kLnBhcnNlKClcblx0fVxuXG5cdHBhcnNlKHZpc2l0b3JzLCBlbmRWaXNpdG9ycyl7XG5cdFx0Zm9yKHZhciBpPTAsIGxlbj12aXNpdG9ycy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0dmlzaXRvcnNbaV0udmlzaXQodGhpcywgZW5kVmlzaXRvcnNbaV0pXG5cdH1cblx0Z2V0Q29tbWFuZCgpe1xuXHRcdHJldHVybiB0aGlzLmNvbW1hbmRcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGQnfVxuXG5cdHN0YXRpYyBnZXQgQ29tbWFuZCgpe3JldHVybiBDb21tYW5kfVxuXG5cdHN0YXRpYyBnZXQgU3dpdGNoKCl7cmV0dXJuIFN3aXRjaH1cblxuXHRzdGF0aWMgZ2V0IEZpZWxkQ29kZSgpe3JldHVybiBGaWVsZENvZGV9XG59XG5cbmNsYXNzIENvbW1hbmR7XG5cdGNvbnN0cnVjdG9yKGluc3RydWN0KXtcblx0XHR0aGlzLmRhdGE9aW5zdHJ1Y3Rcblx0fVxuXG5cdG5leHRVbnRpbChzZXBlcmF0b3JzKXtcblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0dmFyIGk9LTEsIGxlbj10aGlzLmRhdGEubGVuZ3RoO1xuXHRcdC8vZmluZCBhbnkgb25lIG9mIHNlcGVyYXRvciBjaGFyc1xuXHRcdHdoaWxlKCgrK2kpPGxlbiAmJiBzZXBlcmF0b3JzLmluZGV4T2YodGhpcy5kYXRhLmNoYXJBdChpKSk9PS0xKTtcblxuXHRcdHZhciBub2RlPXRoaXMuZGF0YS5zdWJzdHJpbmcoMCwgaSkudHJpbSgpO1xuXG5cdFx0Ly9pZ25vcmUgYWxsIHNlcGVyYXRvciBjaGFyc1xuXHRcdGlmKGk8bGVuKVxuXHRcdFx0d2hpbGUoKytpPGxlbiAmJiBzZXBlcmF0b3JzLmluZGV4T2YodGhpcy5kYXRhLmNoYXJBdChpKSkhPS0xKTtcblxuXHRcdC8vbGVmdCB0aGlzLmRhdGFcblx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZyhpKS50cmltKCk7XG5cdFx0cmV0dXJuIG5vZGU7XG5cdH1cblx0bmV4dE5vZGUoKXtcblx0XHRyZXR1cm4gdGhpcy5uZXh0VW50aWwoXCIgXFxcXFwiKVxuXHR9XG5cdGFzSW50KHMsIGRlZmF1bHRWYWx1ZSl7XG5cdFx0dHJ5e1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHMpXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdHJldHVybiBkZWZhdWx0VmFsdWV8fDBcblx0XHR9XG5cdH1cbn1cbmNsYXNzIFN3aXRjaCBleHRlbmRzIENvbW1hbmR7XG5cdGNvbnN0cnVjdG9yKGNtZCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud2l0aFF1b3RlPWZhbHNlXG5cdFx0dGhpcy50eXBlPWNtZC5jaGFyQXQoMCkudG9Mb3dlckNhc2Vcblx0XHRpZihjbWQubGVuZ3RoPjEgJiYgdGhpcy50eXBlIT0nKicgJiYgY21kLmNoYXJBdCgxKSE9JyAnKXtcblx0XHRcdGlmKHR5cGUubWF0Y2goL1xcdy8pKXsvL3dvcmQgY2FzZTogXFxzMT1cXHMgMVxuXHRcdFx0XHQgdHJ5IHtcblx0XHRcdFx0XHRwYXJzZUludChjbWQuc3Vic3RyaW5nKDEpLnRyaW0oKSk7XG5cdFx0XHRcdFx0dGhpcy5kYXRhPWNtZC5zdWJzdHJpbmcoMSkudHJpbSgpO1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHRoaXMudHlwZT0nISc7XG5cdFx0fWVsc2V7XG5cdFx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPjEpXG5cdFx0XHRcdHRoaXMuZGF0YT10aGlzLmRhdGEuc3Vic3RyaW5nKDEpLnRyaW0oKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5kYXRhPVwiXCI7XG5cdFx0fVxuXHRcdHRoaXMuX19yZW1vdmVRdW90ZSgpO1xuXHR9XG5cdF9fcmVtb3ZlUXVvdGUoKXtcblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuO1xuXHRcdHZhciBhPXRoaXMuZGF0YS5jaGFyQXQoMCk7XG5cdFx0aWYoYT09J1wiJyB8fCBhPT0nXFwnJyl7XG5cdFx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZygxKTtcblx0XHRcdHRoaXMud2l0aFF1b3RlPXRydWU7XG5cdFx0fVxuXHRcdGlmKHRoaXMuZGF0YS5sZW5ndGg9PTApXG5cdFx0XHRyZXR1cm47XG5cdFx0YT10aGlzLmRhdGEuY2hhckF0KHRoaXMuZGF0YS5sZW5ndGgtMSk7XG5cdFx0aWYoYT09J1wiJyB8fCBhPT0nXFwnJyl7XG5cdFx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnN1YnN0cmluZygwLHRoaXMuZGF0YS5sZW5ndGgtMSk7XG5cdFx0XHR0aGlzLndpdGhRdW90ZT10cnVlO1xuXHRcdH1cblx0fVxuXHRfc3BsaXQySW50KCl7XG5cdFx0aWYodGhpcy5kYXRhPT1udWxsIHx8IHRoaXMuZGF0YS5sZW5ndGg9PTApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR2YXIgYT1kYXRhLnNwbGl0KFwiLVwiKTtcblx0XHRpZihhLmxlbmd0aD09MClcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdHZhciBiPVtdXG5cdFx0Zm9yKHZhciBpPTAsIGxlbj1hLmxlbmd0aDsgaTxsZW47IGkrKyl7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRiW2ldPXBhcnNlSW50KGFbaV0pO1xuXHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRiW2ldPTA7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBiO1xuXHR9XG59XG5jbGFzcyBGaWVsZENvZGUgZXh0ZW5kcyBDb21tYW5ke1xuXHRjb25zdHJ1Y3RvcihpbnN0cnVjdCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubWVyZ2VGb3JtYXQ9dGhpcy5wYXJzZUtleVdvcmQoXCJNRVJHRUZPUk1BVFwiKVxuXHRcdHRoaXMudHlwZT10aGlzLm5leHROb2RlKClcblx0fVxuXHRwYXJzZUtleVdvcmQoa2V5KXtcblx0XHRpZih0aGlzLmRhdGEubGVuZ3RoPT0wKVxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdHZhciBsZW49dGhpcy5kYXRhLmxlbmd0aDtcblx0XHR0aGlzLmRhdGE9dGhpcy5kYXRhLnJlcGxhY2UobmV3IFJlZ0V4cChcIlxcXFwqXFxcXHMqXCIra2V5K1wiXFxcXHMqXCIsIFwiaWdcIiksXCJcIik7XG5cdFx0cmV0dXJuIHRoaXMuZGF0YS5sZW5ndGghPWxlbjtcblx0fVxuXHRuZXh0U3dpdGNoKCl7XG5cdFx0dmFyIG9wdGlvbj10aGlzLm5leHRVbnRpbChcIlxcXFxcIik7XG5cdFx0aWYob3B0aW9uPT1udWxsIHx8IG9wdGlvbi5sZW5ndGg9PTApXG5cdFx0XHRyZXR1cm4gbnVsbDtcblxuXHRcdHJldHVybiBuZXcgU3dpdGNoKG9wdGlvbik7XG5cdH1cblx0cGFyc2UoKXt9XG59XG4iXX0=