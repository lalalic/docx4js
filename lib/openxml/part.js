"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(name, doc) {
		_classCallCheck(this, _class);

		this.name = name;
		this.doc = doc;

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

	_createClass(_class, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsImZvbGRlciIsInJlbE5hbWUiLCJpIiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJwYXJ0cyIsInJlbHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInVybCIsInNwbGl0IiwicG9wIiwiZGF0YSIsImdldERhdGFQYXJ0IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImNyYzMyIiwiZ2V0UmVsT2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNDLGlCQUFZQSxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7O0FBRUEsTUFBSUMsU0FBTyxFQUFYO0FBQUEsTUFDQ0MsVUFBUSxXQUFTSCxJQUFULEdBQWMsT0FEdkI7QUFBQSxNQUVDSSxJQUFFSixLQUFLSyxXQUFMLENBQWlCLEdBQWpCLENBRkg7QUFHQSxNQUFHRCxNQUFJLENBQUMsQ0FBUixFQUFVO0FBQ1RGLFlBQU9GLEtBQUtNLFNBQUwsQ0FBZSxDQUFmLEVBQWlCRixJQUFFLENBQW5CLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxRQUFQLEdBQWdCRixLQUFLTSxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBaEIsR0FBb0MsT0FBNUM7QUFDQTs7QUFFRCxNQUFHSCxJQUFJTSxLQUFKLENBQVVKLE9BQVYsQ0FBSCxFQUFzQjtBQUNyQixRQUFLRCxNQUFMLEdBQVlBLE1BQVo7QUFDQSxRQUFLQyxPQUFMLEdBQWFBLE9BQWI7QUFDQSxRQUFLSyxJQUFMLEdBQVVQLElBQUlRLGFBQUosQ0FBa0JOLE9BQWxCLENBQVY7QUFDQTtBQUNELE9BQUtPLEtBQUw7QUFDQTs7OzswQkFFTTtBQUNOLFFBQUtDLE9BQUwsR0FBYSxLQUFLVixHQUFMLENBQVNRLGFBQVQsQ0FBdUIsS0FBS1QsSUFBNUIsQ0FBYjtBQUNBOzs7K0JBRVlZLEksRUFBSztBQUNqQixVQUFPLEtBQUtKLElBQUwsZUFBcUJJLElBQXJCLFVBQStCQyxJQUEvQixDQUFvQyxRQUFwQyxDQUFQO0FBQ0E7OzsrQkFFWUMsTSxFQUFPO0FBQ25CLFVBQU8sS0FBS2IsR0FBTCxDQUFTUSxhQUFULENBQXVCLEtBQUtQLE1BQUwsR0FBWVksTUFBbkMsQ0FBUDtBQUNBOzs7eUJBRU1DLEUsRUFBRztBQUNULE9BQUlDLE1BQUksS0FBS1IsSUFBTCx3QkFBOEJPLEVBQTlCLFNBQVI7QUFDQSxPQUFJRCxTQUFPRSxJQUFJSCxJQUFKLENBQVMsUUFBVCxDQUFYO0FBQ0EsT0FBR0csSUFBSUgsSUFBSixDQUFTLFlBQVQsTUFBeUIsVUFBNUIsRUFDQyxPQUFPLEVBQUNJLEtBQUlILE1BQUwsRUFBUDs7QUFFRCxXQUFPRSxJQUFJSCxJQUFKLENBQVMsTUFBVCxFQUFpQkssS0FBakIsQ0FBdUIsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQVA7QUFDQSxTQUFLLE9BQUw7QUFDQyxTQUFJQyxPQUFLLEtBQUtuQixHQUFMLENBQVNvQixXQUFULENBQXFCLEtBQUtuQixNQUFMLEdBQVlZLE1BQWpDLENBQVQ7QUFDQSxTQUFJRyxNQUFJSyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDSixJQUFELENBQVQsRUFBZ0IsRUFBQ1IsTUFBSyxTQUFOLEVBQWhCLENBQXBCLENBQVI7QUFDQSxZQUFPLEVBQUNLLFFBQUQsRUFBTVEsT0FBT0wsS0FBS0ssS0FBbEIsRUFBUDtBQUNEO0FBQ0MsWUFBTyxLQUFLQyxZQUFMLENBQWtCWixNQUFsQixDQUFQO0FBTkQ7QUFRQSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xyXG5cdFx0dGhpcy5uYW1lPW5hbWVcclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cclxuXHRcdHZhciBmb2xkZXI9XCJcIixcclxuXHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiLFxyXG5cdFx0XHRpPW5hbWUubGFzdEluZGV4T2YoJy8nKTtcclxuXHRcdGlmKGkhPT0tMSl7XHJcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcclxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xyXG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcclxuXHRcdFx0dGhpcy5yZWxzPWRvYy5nZXRPYmplY3RQYXJ0KHJlbE5hbWUpXHJcblx0XHR9XHJcblx0XHR0aGlzLl9pbml0KClcclxuXHR9XHJcblxyXG5cdF9pbml0KCl7XHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXHJcblx0fVxyXG5cclxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0fVxyXG5cclxuXHRnZXRSZWwoaWQpe1xyXG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcclxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXHJcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cclxuXHJcblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XHJcblx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdGxldCBkYXRhPXRoaXMuZG9jLmdldERhdGFQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcclxuXHRcdFx0bGV0IHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlLypcIn0pKVxyXG5cdFx0XHRyZXR1cm4ge3VybCwgY3JjMzI6IGRhdGEuY3JjMzJ9XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=