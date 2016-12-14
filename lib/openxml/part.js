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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInRhcmdldE1vZGUiLCJnZXRCdWZmZXJQYXJ0IiwiZ2V0UGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWUEsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsSUFBTCxHQUFVLEVBQVY7O0FBRUEsTUFBSUMsU0FBTyxFQUFYO0FBQUEsTUFDQ0MsVUFBUSxXQUFTSixJQUFULEdBQWMsT0FEdkI7QUFBQSxNQUVDSyxJQUFFTCxLQUFLTSxXQUFMLENBQWlCLEdBQWpCLENBRkg7QUFHQSxNQUFHRCxNQUFJLENBQUMsQ0FBUixFQUFVO0FBQ1RGLFlBQU9ILEtBQUtPLFNBQUwsQ0FBZSxDQUFmLEVBQWlCRixJQUFFLENBQW5CLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxRQUFQLEdBQWdCSCxLQUFLTyxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBaEIsR0FBb0MsT0FBNUM7QUFDQTs7QUFFRCxNQUFHSixJQUFJTyxLQUFKLENBQVVKLE9BQVYsQ0FBSCxFQUFzQjtBQUNyQixRQUFLRCxNQUFMLEdBQVlBLE1BQVo7QUFDQSxRQUFLQyxPQUFMLEdBQWFBLE9BQWI7QUFDQSxRQUFLRixJQUFMLEdBQVVELElBQUlRLGFBQUosQ0FBa0JMLE9BQWxCLENBQVY7QUFDQTtBQUNELE9BQUtNLEtBQUw7QUFDQTs7OzswQkFFTTtBQUNOLFFBQUtDLE9BQUwsR0FBYSxLQUFLVixHQUFMLENBQVNRLGFBQVQsQ0FBdUIsS0FBS1QsSUFBNUIsQ0FBYjtBQUNBOzs7K0JBRVlZLEksRUFBSztBQUNqQixVQUFPLEtBQUtWLElBQUwsZUFBcUJVLElBQXJCLFVBQStCQyxJQUEvQixDQUFvQyxRQUFwQyxDQUFQO0FBQ0E7OzsrQkFFWUMsTSxFQUFPO0FBQ25CLFVBQU8sS0FBS2IsR0FBTCxDQUFTUSxhQUFULENBQXVCLEtBQUtOLE1BQUwsR0FBWVcsTUFBbkMsQ0FBUDtBQUNBOzs7eUJBRU1DLEUsRUFBRztBQUNULE9BQUlDLE1BQUksS0FBS2QsSUFBTCxDQUFVYSxFQUFWLENBQVI7QUFDQSxPQUFHQyxJQUFJQyxVQUFKLElBQWdCLFVBQW5CLEVBQ0MsT0FBT0QsSUFBSUYsTUFBWDtBQUNELFdBQU9FLElBQUlKLElBQVg7QUFDQSxTQUFLLE9BQUw7QUFDQyxZQUFPLEtBQUtYLEdBQUwsQ0FBU2lCLGFBQVQsQ0FBdUJGLElBQUlGLE1BQTNCLENBQVA7QUFDRDtBQUNDLFlBQU8sS0FBS2IsR0FBTCxDQUFTa0IsT0FBVCxDQUFpQkgsSUFBSUYsTUFBckIsQ0FBUDtBQUpEO0FBTUEiLCJmaWxlIjoicGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XG5cdFx0dGhpcy5uYW1lPW5hbWVcblx0XHR0aGlzLmRvYz1kb2Ncblx0XHR0aGlzLnJlbHM9e31cblxuXHRcdHZhciBmb2xkZXI9XCJcIixcblx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIixcblx0XHRcdGk9bmFtZS5sYXN0SW5kZXhPZignLycpO1xuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKzEpXG5cdFx0XHRyZWxOYW1lPWZvbGRlcitcIl9yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xuXHRcdH1cblxuXHRcdGlmKGRvYy5wYXJ0c1tyZWxOYW1lXSl7XG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcblx0XHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0XHR0aGlzLnJlbHM9ZG9jLmdldE9iamVjdFBhcnQocmVsTmFtZSlcblx0XHR9XG5cdFx0dGhpcy5faW5pdCgpXG5cdH1cblxuXHRfaW5pdCgpe1xuXHRcdHRoaXMuY29udGVudD10aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMubmFtZSlcblx0fVxuXG5cdGdldFJlbFRhcmdldCh0eXBlKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxuXHR9XG5cblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHR9XG5cblx0Z2V0UmVsKGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVsc1tpZF1cblx0XHRpZihyZWwudGFyZ2V0TW9kZT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiByZWwudGFyZ2V0XG5cdFx0c3dpdGNoKHJlbC50eXBlKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0QnVmZmVyUGFydChyZWwudGFyZ2V0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydChyZWwudGFyZ2V0KVxuXHRcdH1cblx0fVxufVxuIl19