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
			var rel = this.rels[id];
			if (rel.targetMode == 'External') return rel.target;
			switch (rel.type) {
				case 'image':
					return this.doc.getBufferPart(rel.target);
				default:
					return this.doc.getPart(rel.target);
			}
		}
	}]);
	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInRhcmdldE1vZGUiLCJnZXRCdWZmZXJQYXJ0IiwiZ2V0UGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWUEsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsSUFBTCxHQUFVLEVBQVY7O0FBRUEsTUFBSUMsU0FBTyxFQUFYO0FBQUEsTUFDQ0MsVUFBUSxXQUFTSixJQUFULEdBQWMsT0FEdkI7QUFBQSxNQUVDSyxJQUFFTCxLQUFLTSxXQUFMLENBQWlCLEdBQWpCLENBRkg7QUFHQSxNQUFHRCxNQUFJLENBQUMsQ0FBUixFQUFVO0FBQ1RGLFlBQU9ILEtBQUtPLFNBQUwsQ0FBZSxDQUFmLEVBQWlCRixJQUFFLENBQW5CLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxRQUFQLEdBQWdCSCxLQUFLTyxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBaEIsR0FBb0MsT0FBNUM7QUFDQTs7QUFFRCxNQUFHSixJQUFJTyxLQUFKLENBQVVKLE9BQVYsQ0FBSCxFQUFzQjtBQUNyQixRQUFLRCxNQUFMLEdBQVlBLE1BQVo7QUFDQSxRQUFLQyxPQUFMLEdBQWFBLE9BQWI7QUFDQSxRQUFLRixJQUFMLEdBQVVELElBQUlRLGFBQUosQ0FBa0JMLE9BQWxCLENBQVY7QUFDQTtBQUNELE9BQUtNLEtBQUw7QUFDQTs7OzswQkFFTTtBQUNOLFFBQUtDLE9BQUwsR0FBYSxLQUFLVixHQUFMLENBQVNRLGFBQVQsQ0FBdUIsS0FBS1QsSUFBNUIsQ0FBYjtBQUNBOzs7K0JBRVlZLEksRUFBSztBQUNqQixVQUFPLEtBQUtWLElBQUwsZUFBcUJVLElBQXJCLFVBQStCQyxJQUEvQixDQUFvQyxRQUFwQyxDQUFQO0FBQ0E7OzsrQkFFWUMsTSxFQUFPO0FBQ25CLFVBQU8sS0FBS2IsR0FBTCxDQUFTUSxhQUFULENBQXVCLEtBQUtOLE1BQUwsR0FBWVcsTUFBbkMsQ0FBUDtBQUNBOzs7eUJBRU1DLEUsRUFBRztBQUNULE9BQUlDLE1BQUksS0FBS2QsSUFBTCxDQUFVYSxFQUFWLENBQVI7QUFDQSxPQUFHQyxJQUFJQyxVQUFKLElBQWdCLFVBQW5CLEVBQ0MsT0FBT0QsSUFBSUYsTUFBWDtBQUNELFdBQU9FLElBQUlKLElBQVg7QUFDQSxTQUFLLE9BQUw7QUFDQyxZQUFPLEtBQUtYLEdBQUwsQ0FBU2lCLGFBQVQsQ0FBdUJGLElBQUlGLE1BQTNCLENBQVA7QUFDRDtBQUNDLFlBQU8sS0FBS2IsR0FBTCxDQUFTa0IsT0FBVCxDQUFpQkgsSUFBSUYsTUFBckIsQ0FBUDtBQUpEO0FBTUEiLCJmaWxlIjoicGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNze1xyXG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcclxuXHRcdHRoaXMubmFtZT1uYW1lXHJcblx0XHR0aGlzLmRvYz1kb2NcclxuXHRcdHRoaXMucmVscz17fVxyXG5cclxuXHRcdHZhciBmb2xkZXI9XCJcIixcclxuXHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiLFxyXG5cdFx0XHRpPW5hbWUubGFzdEluZGV4T2YoJy8nKTtcclxuXHRcdGlmKGkhPT0tMSl7XHJcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcclxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xyXG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcclxuXHRcdFx0dGhpcy5yZWxzPWRvYy5nZXRPYmplY3RQYXJ0KHJlbE5hbWUpXHJcblx0XHR9XHJcblx0XHR0aGlzLl9pbml0KClcclxuXHR9XHJcblxyXG5cdF9pbml0KCl7XHJcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXHJcblx0fVxyXG5cclxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0fVxyXG5cclxuXHRnZXRSZWwoaWQpe1xyXG5cdFx0dmFyIHJlbD10aGlzLnJlbHNbaWRdXHJcblx0XHRpZihyZWwudGFyZ2V0TW9kZT09J0V4dGVybmFsJylcclxuXHRcdFx0cmV0dXJuIHJlbC50YXJnZXRcclxuXHRcdHN3aXRjaChyZWwudHlwZSl7XHJcblx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRCdWZmZXJQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydChyZWwudGFyZ2V0KVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=