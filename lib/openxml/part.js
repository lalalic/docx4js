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
			if (rel.attr("TargetMode") === 'External') return target;

			switch (rel.attr("Type").split("/").pop()) {
				case 'image':
					return URL.createObjectURL(new Blob([this.doc.getBufferPart(this.folder + target)], { type: "image/*" }));
				default:
					return this.getRelObject(target);
			}
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInNwbGl0IiwicG9wIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImdldEJ1ZmZlclBhcnQiLCJnZXRSZWxPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0MsaUJBQVlBLElBQVosRUFBaUJDLEdBQWpCLEVBQXFCO0FBQUE7O0FBQ3BCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLElBQUwsR0FBVSxFQUFWOztBQUVBLE1BQUlDLFNBQU8sRUFBWDtBQUFBLE1BQ0NDLFVBQVEsV0FBU0osSUFBVCxHQUFjLE9BRHZCO0FBQUEsTUFFQ0ssSUFBRUwsS0FBS00sV0FBTCxDQUFpQixHQUFqQixDQUZIO0FBR0EsTUFBR0QsTUFBSSxDQUFDLENBQVIsRUFBVTtBQUNURixZQUFPSCxLQUFLTyxTQUFMLENBQWUsQ0FBZixFQUFpQkYsSUFBRSxDQUFuQixDQUFQO0FBQ0FELGFBQVFELFNBQU8sUUFBUCxHQUFnQkgsS0FBS08sU0FBTCxDQUFlRixJQUFFLENBQWpCLENBQWhCLEdBQW9DLE9BQTVDO0FBQ0E7O0FBRUQsTUFBR0osSUFBSU8sS0FBSixDQUFVSixPQUFWLENBQUgsRUFBc0I7QUFDckIsUUFBS0QsTUFBTCxHQUFZQSxNQUFaO0FBQ0EsUUFBS0MsT0FBTCxHQUFhQSxPQUFiO0FBQ0EsUUFBS0YsSUFBTCxHQUFVRCxJQUFJUSxhQUFKLENBQWtCTCxPQUFsQixDQUFWO0FBQ0E7QUFDRCxPQUFLTSxLQUFMO0FBQ0E7Ozs7MEJBRU07QUFDTixRQUFLQyxPQUFMLEdBQWEsS0FBS1YsR0FBTCxDQUFTUSxhQUFULENBQXVCLEtBQUtULElBQTVCLENBQWI7QUFDQTs7OytCQUVZWSxJLEVBQUs7QUFDakIsVUFBTyxLQUFLVixJQUFMLGVBQXFCVSxJQUFyQixVQUErQkMsSUFBL0IsQ0FBb0MsUUFBcEMsQ0FBUDtBQUNBOzs7K0JBRVlDLE0sRUFBTztBQUNuQixVQUFPLEtBQUtiLEdBQUwsQ0FBU1EsYUFBVCxDQUF1QixLQUFLTixNQUFMLEdBQVlXLE1BQW5DLENBQVA7QUFDQTs7O3lCQUVNQyxFLEVBQUc7QUFDVCxPQUFJQyxNQUFJLEtBQUtkLElBQUwsd0JBQThCYSxFQUE5QixTQUFSO0FBQ0EsT0FBSUQsU0FBT0UsSUFBSUgsSUFBSixDQUFTLFFBQVQsQ0FBWDtBQUNBLE9BQUdHLElBQUlILElBQUosQ0FBUyxZQUFULE1BQXlCLFVBQTVCLEVBQ0MsT0FBT0MsTUFBUDs7QUFFRCxXQUFPRSxJQUFJSCxJQUFKLENBQVMsTUFBVCxFQUFpQkksS0FBakIsQ0FBdUIsR0FBdkIsRUFBNEJDLEdBQTVCLEVBQVA7QUFDQSxTQUFLLE9BQUw7QUFDQyxZQUFPQyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDLEtBQUtwQixHQUFMLENBQVNxQixhQUFULENBQXVCLEtBQUtuQixNQUFMLEdBQVlXLE1BQW5DLENBQUQsQ0FBVCxFQUFzRCxFQUFDRixNQUFLLFNBQU4sRUFBdEQsQ0FBcEIsQ0FBUDtBQUNEO0FBQ0MsWUFBTyxLQUFLVyxZQUFMLENBQWtCVCxNQUFsQixDQUFQO0FBSkQ7QUFNQSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXHRcdHRoaXMucmVscz17fVxuXG5cdFx0dmFyIGZvbGRlcj1cIlwiLFxuXHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiLFxuXHRcdFx0aT1uYW1lLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0aWYoaSE9PS0xKXtcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcblx0XHRcdHRoaXMucmVscz1kb2MuZ2V0T2JqZWN0UGFydChyZWxOYW1lKVxuXHRcdH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCl7XG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxuXHR9XG5cblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpXG5cdH1cblxuXHRnZXRSZWxPYmplY3QodGFyZ2V0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXG5cdH1cblxuXHRnZXRSZWwoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0dmFyIHRhcmdldD1yZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXG5cdFx0XHRyZXR1cm4gdGFyZ2V0XG5cdFx0XG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xuXHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdHJldHVybiBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmRvYy5nZXRCdWZmZXJQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldCldLHt0eXBlOlwiaW1hZ2UvKlwifSkpXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXG5cdFx0fVxuXHR9XG59XG4iXX0=