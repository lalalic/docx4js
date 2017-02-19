"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
	}, {
		key: "renderNode",
		value: function renderNode(node) {
			var _this = this;

			var createElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (type, props, children) {
				type, props, children;
			};
			var identify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (node) {
				return node.name.split(":").pop();
			};
			var tagName = node.name,
			    children = node.children,
			    id = node.id,
			    parent = node.parent;

			if (node.type == "text") {
				if (parent.name == "w:t") {
					return node.data;
				}
				return null;
			}

			var type = tagName;
			var props = {};

			if (identify) {
				var model = identify(node, this);
				if (!model) return null;

				if (typeof model == "string") {
					type = model;
				} else {
					var content = void 0;
					var _model = model;
					type = _model.type;
					content = _model.children;
					props = _objectWithoutProperties(_model, ["type", "children"]);

					if (content !== undefined) children = content;
				}
			}
			props.key = id;
			props.node = node;
			props.type = type;

			var childElements = [];
			if (children && children.length) {
				childElements = children.map(function (a) {
					return a ? _this.renderNode(a, createElement, identify) : null;
				}).filter(function (a) {
					return !!a;
				});
			}

			return createElement(type, props, childElements);
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsImZvbGRlciIsInJlbE5hbWUiLCJpIiwibGFzdEluZGV4T2YiLCJzdWJzdHJpbmciLCJwYXJ0cyIsInJlbHMiLCJnZXRPYmplY3RQYXJ0IiwiX2luaXQiLCJjb250ZW50IiwidHlwZSIsImF0dHIiLCJ0YXJnZXQiLCJpZCIsInJlbCIsInVybCIsInNwbGl0IiwicG9wIiwiZGF0YSIsImdldERhdGFQYXJ0IiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwiQmxvYiIsImNyYzMyIiwiZ2V0UmVsT2JqZWN0Iiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWRlbnRpZnkiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJ1bmRlZmluZWQiLCJrZXkiLCJjaGlsZEVsZW1lbnRzIiwibGVuZ3RoIiwibWFwIiwiYSIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQyxpQkFBWUEsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUOztBQUVBLE1BQUlDLFNBQU8sRUFBWDtBQUFBLE1BQ0NDLFVBQVEsV0FBU0gsSUFBVCxHQUFjLE9BRHZCO0FBQUEsTUFFQ0ksSUFBRUosS0FBS0ssV0FBTCxDQUFpQixHQUFqQixDQUZIO0FBR0EsTUFBR0QsTUFBSSxDQUFDLENBQVIsRUFBVTtBQUNURixZQUFPRixLQUFLTSxTQUFMLENBQWUsQ0FBZixFQUFpQkYsSUFBRSxDQUFuQixDQUFQO0FBQ0FELGFBQVFELFNBQU8sUUFBUCxHQUFnQkYsS0FBS00sU0FBTCxDQUFlRixJQUFFLENBQWpCLENBQWhCLEdBQW9DLE9BQTVDO0FBQ0E7O0FBRUQsTUFBR0gsSUFBSU0sS0FBSixDQUFVSixPQUFWLENBQUgsRUFBc0I7QUFD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QUdKLFNBQUdsQixZQUFVd0IsU0FBYixFQUNDTCxXQUFTbkIsT0FBVDtBQUNEO0FBQ0Q7QUFDRGtCLFNBQU1PLEdBQU4sR0FBVXJCLEVBQVY7QUFDQWMsU0FBTUYsSUFBTixHQUFXQSxJQUFYO0FBQ0FFLFNBQU1qQixJQUFOLEdBQVdBLElBQVg7O0FBRUEsT0FBSXlCLGdCQUFjLEVBQWxCO0FBQ0EsT0FBR1AsWUFBWUEsU0FBU1EsTUFBeEIsRUFBK0I7QUFDOUJELG9CQUFjUCxTQUFTUyxHQUFULENBQWE7QUFBQSxZQUFHQyxJQUFJLE1BQUtDLFVBQUwsQ0FBZ0JELENBQWhCLEVBQWtCWixhQUFsQixFQUFnQ0csUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWlcsTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUNGLENBQUw7QUFBQSxLQURLLENBQWQ7QUFFQTs7QUFFRCxVQUFPWixjQUNMaEIsSUFESyxFQUVMaUIsS0FGSyxFQUdMUSxhQUhLLENBQVA7QUFLQSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXG5cdFx0dmFyIGZvbGRlcj1cIlwiLFxuXHRcdFx0cmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiLFxuXHRcdFx0aT1uYW1lLmxhc3RJbmRleE9mKCcvJyk7XG5cdFx0aWYoaSE9PS0xKXtcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcblx0XHRcdHRoaXMucmVscz1kb2MuZ2V0T2JqZWN0UGFydChyZWxOYW1lKVxuXHRcdH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCl7XG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxuXHR9XG5cblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpXG5cdH1cblxuXHRnZXRSZWxPYmplY3QodGFyZ2V0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXG5cdH1cblxuXHRnZXRSZWwoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0dmFyIHRhcmdldD1yZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XG5cblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0bGV0IGRhdGE9dGhpcy5kb2MuZ2V0RGF0YVBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHRcdFx0bGV0IHVybD1VUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFtkYXRhXSx7dHlwZTpcImltYWdlLypcIn0pKVxuXHRcdFx0cmV0dXJuIHt1cmwsIGNyYzMyOiBkYXRhLmNyYzMyfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xuXHRcdFx0aWYocGFyZW50Lm5hbWU9PVwidzp0XCIpe1xuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblxuXHRcdGxldCB0eXBlPXRhZ05hbWVcblx0XHRsZXQgcHJvcHM9e31cblxuXHRcdGlmKGlkZW50aWZ5KXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXG5cdFx0XHRpZighbW9kZWwpXG5cdFx0XHRcdHJldHVybiBudWxsXG5cblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xuXHRcdFx0XHR0eXBlPW1vZGVsXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHByb3BzLmtleT1pZFxuXHRcdHByb3BzLm5vZGU9bm9kZVxuXHRcdHByb3BzLnR5cGU9dHlwZVxuXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0Y2hpbGRFbGVtZW50cz1jaGlsZHJlbi5tYXAoYT0+YSA/IHRoaXMucmVuZGVyTm9kZShhLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpIDogbnVsbClcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHByb3BzLFxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXG5cdFx0XHQpXG5cdH1cbn1cbiJdfQ==