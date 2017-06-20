"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Part = function () {
	function Part(name, doc) {
		_classCallCheck(this, Part);

		this.name = name;
		this.doc = doc;

		var folder = "";
		var relName = "_rels/" + name + ".rels";
		var i = name.lastIndexOf('/');

		if (i !== -1) {
			folder = name.substring(0, i + 1);
			relName = folder + "_rels/" + name.substring(i + 1) + ".rels";
		}

		if (doc.parts[relName]) {
			this.folder = folder;
			this.relName = relName;
			Object.defineProperty(this, "rels", {
				get: function get() {
					return this.doc.getObjectPart(this.relName);
				}
			});
		}
		this._init();
	}

	_createClass(Part, [{
		key: "_init",
		value: function _init() {
			Object.defineProperty(this, "content", {
				get: function get() {
					return this.doc.getObjectPart(this.name);
				}
			});
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
					if (target.endsWith(".xml")) return this.getRelObject(target);else return this.doc.getPart(this.folder + target);
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

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJkYXRhIiwiZ2V0RGF0YVBhcnQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiY3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJpZGVudGlmeSIsInRhZ05hbWUiLCJwYXJlbnQiLCJtb2RlbCIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJrZXkiLCJjaGlsZEVsZW1lbnRzIiwibGVuZ3RoIiwibWFwIiwiYSIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFxQkEsSTtBQUNwQixlQUFZQyxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7O0FBRUEsTUFBSUMsU0FBTyxFQUFYO0FBQ0EsTUFBSUMsVUFBUSxXQUFTSCxJQUFULEdBQWMsT0FBMUI7QUFDQSxNQUFJSSxJQUFFSixLQUFLSyxXQUFMLENBQWlCLEdBQWpCLENBQU47O0FBRUEsTUFBR0QsTUFBSSxDQUFDLENBQVIsRUFBVTtBQUNURixZQUFPRixLQUFLTSxTQUFMLENBQWUsQ0FBZixFQUFpQkYsSUFBRSxDQUFuQixDQUFQO0FBQ0FELGFBQVFELFNBQU8sUUFBUCxHQUFnQkYsS0FBS00sU0FBTCxDQUFlRixJQUFFLENBQWpCLENB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QUFDQTtBQUNELFdBQU8sSUFBUDtBQUNBOztBQUVELE9BQUlULE9BQUt1QixPQUFUO0FBQ0EsT0FBSUgsUUFBTSxFQUFWOztBQUVBLE9BQUdFLFFBQUgsRUFBWTtBQUNYLFFBQUlHLFFBQU1ILFNBQVNKLElBQVQsRUFBYyxJQUFkLENBQVY7QUFDQSxRQUFHLENBQUNPLEtBQUosRUFDQyxPQUFPLElBQVA7O0FBRUQsUUFBRyxPQUFPQSxLQUFQLElBQWUsUUFBbEIsRUFBMkI7QUFDMUJ6QixZQUFLeUIsS0FBTDtBQUNBLEtBRkQsTUFFSztBQUNKLFNBQUlDLGdCQUFKO0FBREksa0JBRWdDRCxLQUZoQztBQUVGekIsU0FGRSxVQUVGQSxJQUZFO0FBRWEwQixZQUZiLFVBRUlMLFFBRko7QUFFeUJELFVBRnpCOztBQUdKLFNBQUdNLFlBQVVDLFNBQWIsRUFDQ04sV0FBU0ssT0FBVDtBQUNEO0FBQ0Q7QUFDRE4sU0FBTVEsR0FBTixHQUFVeEIsRUFBVjtBQUNBZ0IsU0FBTUYsSUFBTixHQUFXQSxJQUFYO0FBQ0FFLFNBQU1wQixJQUFOLEdBQVdBLElBQVg7O0FBRUEsT0FBSTZCLGdCQUFjLEVBQWxCO0FBQ0EsT0FBR1IsWUFBWUEsU0FBU1MsTUFBeEIsRUFBK0I7QUFDOUJELG9CQUFjUixTQUFTVSxHQUFULENBQWE7QUFBQSxZQUFHQyxJQUFJLE1BQUtDLFVBQUwsQ0FBZ0JELENBQWhCLEVBQWtCYixhQUFsQixFQUFnQ0csUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWlksTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUNGLENBQUw7QUFBQSxLQURLLENBQWQ7QUFFQTs7QUFFRCxVQUFPYixjQUNMbkIsSUFESyxFQUVMb0IsS0FGSyxFQUdMUyxhQUhLLENBQVA7QUFLQTs7Ozs7O2tCQXRHbUIzQyxJIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0e1xuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XG5cdFx0dGhpcy5uYW1lPW5hbWVcblx0XHR0aGlzLmRvYz1kb2NcblxuXHRcdGxldCBmb2xkZXI9XCJcIlxuXHRcdGxldCByZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCJcblx0XHRsZXQgaT1uYW1lLmxhc3RJbmRleE9mKCcvJylcblx0XHRcdFxuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKzEpXG5cdFx0XHRyZWxOYW1lPWZvbGRlcitcIl9yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xuXHRcdH1cblxuXHRcdGlmKGRvYy5wYXJ0c1tyZWxOYW1lXSl7XG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcblx0XHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJlbHNcIix7XG5cdFx0XHRcdGdldCgpe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMucmVsTmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5faW5pdCgpXG5cdH1cblxuXHRfaW5pdCgpe1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiY29udGVudFwiLHtcblx0XHRcdGdldCgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdGdldFJlbFRhcmdldCh0eXBlKXtcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxuXHR9XG5cblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHR9XG5cblx0Z2V0UmVsKGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIik9PT0nRXh0ZXJuYWwnKVxuXHRcdFx0cmV0dXJuIHt1cmw6dGFyZ2V0fVxuXG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xuXHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGxldCBkYXRhPXRoaXMuZG9jLmdldERhdGFQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0XHRcdGxldCB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS8qXCJ9KSlcblx0XHRcdHJldHVybiB7dXJsLCBjcmMzMjogZGF0YS5jcmMzMn1cblx0XHRkZWZhdWx0OlxuXHRcdFx0aWYodGFyZ2V0LmVuZHNXaXRoKFwiLnhtbFwiKSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHRcdH1cblx0fVxuXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xuXHRcdFx0aWYocGFyZW50Lm5hbWU9PVwidzp0XCIpe1xuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblxuXHRcdGxldCB0eXBlPXRhZ05hbWVcblx0XHRsZXQgcHJvcHM9e31cblxuXHRcdGlmKGlkZW50aWZ5KXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXG5cdFx0XHRpZighbW9kZWwpXG5cdFx0XHRcdHJldHVybiBudWxsXG5cblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xuXHRcdFx0XHR0eXBlPW1vZGVsXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHByb3BzLmtleT1pZFxuXHRcdHByb3BzLm5vZGU9bm9kZVxuXHRcdHByb3BzLnR5cGU9dHlwZVxuXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0Y2hpbGRFbGVtZW50cz1jaGlsZHJlbi5tYXAoYT0+YSA/IHRoaXMucmVuZGVyTm9kZShhLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpIDogbnVsbClcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHByb3BzLFxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXG5cdFx0XHQpXG5cdH1cbn1cbiJdfQ==