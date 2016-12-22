"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
	function _class(name, doc) {
		(0, _classCallCheck3.default)(this, _class);

		this.name = name;
		this.doc = doc;
		this.rels = {};

		var folder = "",
		    relName = "_rels/" + name + ".rels",
		    i = name.lastIndexOf('/');
		if (i !== -1) {
			folder = name.substring(0, i + 1);
			relName = folder + "_rels/" + name.substring(i + 1) + ".rels";
		}

		if (doc.parts[relName]) {
			this.folder = folder;
			this.relName = relName;
			this.rels = doc.getObjectPart(relName);
		}
		this._init();
	}

	(0, _createClass3.default)(_class, [{
		key: "_init",
		value: function _init() {
			this.content = this.doc.getObjectPart(this.name);
		}
	}, {
		key: "getRelTarget",
		value: function getRelTarget(type) {
			return this.rels("[Type$=\"" + type + "\"]").attr("Target");
		}
	}, {
		key: "getRelObject",
		value: function getRelObject(target) {
			return this.doc.getObjectPart(this.folder + target);
		}
	}, {
		key: "getRel",
		value: function getRel(id) {
			var rel = this.rels("Relationship[Id=\"" + id + "\"]");
			var target = rel.attr("Target");
			if (rel.attr("TargetMode") === 'External') return { url: target };

			switch (rel.attr("Type").split("/").pop()) {
				case 'image':
					var data = this.doc.getDataPart(this.folder + target);
					var url = URL.createObjectURL(new Blob([data], { type: "image/*" }));
					return { url: url, crc32: data.crc32 };
				default:
					return this.getRelObject(target);
			}
		}
	}]);
	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInVybCIsInNwbGl0IiwicG9wIiwiZGF0YSIsImdldERhdGFQYXJ0IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImNyYzMyIiwiZ2V0UmVsT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUNDLGlCQUFZQSxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxJQUFMLEdBQVUsRUFBVjs7QUFFQSxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUNDQyxVQUFRLFdBQVNKLElBQVQsR0FBYyxPQUR2QjtBQUFBLE1BRUNLLElBQUVMLEtBQUtNLFdBQUwsQ0FBaUIsR0FBakIsQ0FGSDtBQUdBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0gsS0FBS08sU0FBTCxDQUFlLENBQWYsRUFBaUJGLElBQUUsQ0FBbkIsQ0FBUDtBQUNBRCxhQUFRRCxTQUFPLFFBQVAsR0FBZ0JILEtBQUtPLFNBQUwsQ0FBZUYsSUFBRSxDQUFqQixDQUFoQixHQUFvQyxPQUE1QztBQUNBOztBQUVELE1BQUdKLElBQUlPLEtBQUosQ0FBVUosT0FBVixDQUFILEVBQXNCO0FBQ3JCLFFBQUtELE1BQUwsR0FBWUEsTUFBWjtBQUNBLFFBQUtDLE9BQUwsR0FBYUEsT0FBYjtBQUNBLFFBQUtGLElBQUwsR0FBVUQsSUFBSVEsYUFBSixDQUFrQkwsT0FBbEIsQ0FBVjtBQUNBO0FBQ0QsT0FBS00sS0FBTDtBQUNBOzs7OzBCQUVNO0FBQ04sUUFBS0MsT0FBTCxHQUFhLEtBQUtWLEdBQUwsQ0FBU1EsYUFBVCxDQUF1QixLQUFLVCxJQUE1QixDQUFiO0FBQ0E7OzsrQkFFWVksSSxFQUFLO0FBQ2pCLFVBQU8sS0FBS1YsSUFBTCxlQUFxQlUsSUFBckIsVUFBK0JDLElBQS9CLENBQW9DLFFBQXBDLENBQVA7QUFDQTs7OytCQUVZQyxNLEVBQU87QUFDbkIsVUFBTyxLQUFLYixHQUFMLENBQVNRLGFBQVQsQ0FBdUIsS0FBS04sTUFBTCxHQUFZVyxNQUFuQyxDQUFQO0FBQ0E7Ozt5QkFFTUMsRSxFQUFHO0FBQ1QsT0FBSUMsTUFBSSxLQUFLZCxJQUFMLHdCQUE4QmEsRUFBOUIsU0FBUjtBQUNBLE9BQUlELFNBQU9FLElBQUlILElBQUosQ0FBUyxRQUFULENBQVg7QUFDQSxPQUFHRyxJQUFJSCxJQUFKLENBQVMsWUFBVCxNQUF5QixVQUE1QixFQUNDLE9BQU8sRUFBQ0ksS0FBSUgsTUFBTCxFQUFQOztBQUVELFdBQU9FLElBQUlILElBQUosQ0FBUyxNQUFULEVBQWlCSyxLQUFqQixDQUF1QixHQUF2QixFQUE0QkMsR0FBNUIsRUFBUDtBQUNBLFNBQUssT0FBTDtBQUNDLFNBQUlDLE9BQUssS0FBS25CLEdBQUwsQ0FBU29CLFdBQVQsQ0FBcUIsS0FBS2xCLE1BQUwsR0FBWVcsTUFBakMsQ0FBVDtBQUNBLFNBQUlHLE1BQUlLLElBQUlDLGVBQUosQ0FBb0IsSUFBSUMsSUFBSixDQUFTLENBQUNKLElBQUQsQ0FBVCxFQUFnQixFQUFDUixNQUFLLFNBQU4sRUFBaEIsQ0FBcEIsQ0FBUjtBQUNBLFlBQU8sRUFBQ0ssUUFBRCxFQUFNUSxPQUFPTCxLQUFLSyxLQUFsQixFQUFQO0FBQ0Q7QUFDQyxZQUFPLEtBQUtDLFlBQUwsQ0FBa0JaLE1BQWxCLENBQVA7QUFORDtBQVFBIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzc3tcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xuXHRcdHRoaXMubmFtZT1uYW1lXG5cdFx0dGhpcy5kb2M9ZG9jXG5cdFx0dGhpcy5yZWxzPXt9XG5cblx0XHR2YXIgZm9sZGVyPVwiXCIsXG5cdFx0XHRyZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCIsXG5cdFx0XHRpPW5hbWUubGFzdEluZGV4T2YoJy8nKTtcblx0XHRpZihpIT09LTEpe1xuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSsxKVxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcblx0XHR9XG5cblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xuXHRcdFx0dGhpcy5mb2xkZXI9Zm9sZGVyXG5cdFx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxuXHRcdFx0dGhpcy5yZWxzPWRvYy5nZXRPYmplY3RQYXJ0KHJlbE5hbWUpXG5cdFx0fVxuXHRcdHRoaXMuX2luaXQoKVxuXHR9XG5cblx0X2luaXQoKXtcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXG5cdH1cblxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcblx0fVxuXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0fVxuXG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpPT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cblx0XHRcblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0bGV0IGRhdGE9dGhpcy5kb2MuZ2V0RGF0YVBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHRcdFx0bGV0IHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlLypcIn0pKVxuXHRcdFx0cmV0dXJuIHt1cmwsIGNyYzMyOiBkYXRhLmNyYzMyfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxuXHRcdH1cblx0fVxufVxuIl19