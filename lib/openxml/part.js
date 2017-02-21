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

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJkYXRhIiwiZ2V0RGF0YVBhcnQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiY3JjMzIiLCJnZXRSZWxPYmplY3QiLCJub2RlIiwiY3JlYXRlRWxlbWVudCIsInByb3BzIiwiY2hpbGRyZW4iLCJpZGVudGlmeSIsInRhZ05hbWUiLCJwYXJlbnQiLCJtb2RlbCIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJrZXkiLCJjaGlsZEVsZW1lbnRzIiwibGVuZ3RoIiwibWFwIiwiYSIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFxQkEsSTtBQUNwQixlQUFZQyxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7O0FBRUEsTUFBSUMsU0FBTyxFQUFYO0FBQ0EsTUFBSUMsVUFBUSxXQUFTSCxJQUFULEdBQWMsT0FBMUI7QUFDQSxNQUFJSSxJQUFFSixLQUFLSyxXQUFMLENBQWlCLEdBQWpCLENBQU47O0FBRUEsTUFBR0QsTUFBSSxDQUFDLENBQVIsRUFBVTtBQUNURixZQUFPRixLQUFLTSxTQUFMLENBQWUsQ0FBZixFQUFpQkYsSUFBRSxDQUFuQixDQUFQO0FBQ0FELGFBQVFELFNBQU8sUUFBUCxHQUFnQkYsS0FBS00sU0FBTCxDQUFlRixJQUFFLENBQWpCLENBQWhCLEdBQW9DLE9BQTVDO0FBQ0E7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O0FBQ0EsUUFBRyxDQUFDTyxLQUFKLEVBQ0MsT0FBTyxJQUFQOztBQUVELFFBQUcsT0FBT0EsS0FBUCxJQUFlLFFBQWxCLEVBQTJCO0FBQzFCdkIsWUFBS3VCLEtBQUw7QUFDQSxLQUZELE1BRUs7QUFDSixTQUFJQyxnQkFBSjtBQURJLGtCQUVnQ0QsS0FGaEM7QUFFRnZCLFNBRkUsVUFFRkEsSUFGRTtBQUVhd0IsWUFGYixVQUVJTCxRQUZKO0FBRXlCRCxVQUZ6Qjs7QUFHSixTQUFHTSxZQUFVQyxTQUFiLEVBQ0NOLFdBQVNLLE9BQVQ7QUFDRDtBQUNEO0FBQ0ROLFNBQU1RLEdBQU4sR0FBVXRCLEVBQVY7QUFDQWMsU0FBTUYsSUFBTixHQUFXQSxJQUFYO0FBQ0FFLFNBQU1sQixJQUFOLEdBQVdBLElBQVg7O0FBRUEsT0FBSTJCLGdCQUFjLEVBQWxCO0FBQ0EsT0FBR1IsWUFBWUEsU0FBU1MsTUFBeEIsRUFBK0I7QUFDOUJELG9CQUFjUixTQUFTVSxHQUFULENBQWE7QUFBQSxZQUFHQyxJQUFJLE1BQUtDLFVBQUwsQ0FBZ0JELENBQWhCLEVBQWtCYixhQUFsQixFQUFnQ0csUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWlksTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUNGLENBQUw7QUFBQSxLQURLLENBQWQ7QUFFQTs7QUFFRCxVQUFPYixjQUNMakIsSUFESyxFQUVMa0IsS0FGSyxFQUdMUyxhQUhLLENBQVA7QUFLQTs7Ozs7O2tCQW5HbUJ6QyxJIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0e1xyXG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcclxuXHRcdHRoaXMubmFtZT1uYW1lXHJcblx0XHR0aGlzLmRvYz1kb2NcclxuXHJcblx0XHRsZXQgZm9sZGVyPVwiXCJcclxuXHRcdGxldCByZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCJcclxuXHRcdGxldCBpPW5hbWUubGFzdEluZGV4T2YoJy8nKVxyXG5cdFx0XHRcclxuXHRcdGlmKGkhPT0tMSl7XHJcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcclxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xyXG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyZWxzXCIse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5yZWxOYW1lKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHRoaXMuX2luaXQoKVxyXG5cdH1cclxuXHJcblx0X2luaXQoKXtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiY29udGVudFwiLHtcclxuXHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHR9XHJcblxyXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsKGlkKXtcclxuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXHJcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIik9PT0nRXh0ZXJuYWwnKVxyXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XHJcblxyXG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xyXG5cdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRsZXQgZGF0YT10aGlzLmRvYy5nZXREYXRhUGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHRcdGxldCB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS8qXCJ9KSlcclxuXHRcdFx0cmV0dXJuIHt1cmwsIGNyYzMyOiBkYXRhLmNyYzMyfVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcclxuXHRcdGxldCB7bmFtZTp0YWdOYW1lLCBjaGlsZHJlbixpZCwgcGFyZW50fT1ub2RlXHJcblx0XHRpZihub2RlLnR5cGU9PVwidGV4dFwiKXtcclxuXHRcdFx0aWYocGFyZW50Lm5hbWU9PVwidzp0XCIpe1xyXG5cdFx0XHRcdHJldHVybiBub2RlLmRhdGFcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0eXBlPXRhZ05hbWVcclxuXHRcdGxldCBwcm9wcz17fVxyXG5cclxuXHRcdGlmKGlkZW50aWZ5KXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KG5vZGUsdGhpcylcclxuXHRcdFx0aWYoIW1vZGVsKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblxyXG5cdFx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHR0eXBlPW1vZGVsXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBjb250ZW50O1xyXG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcclxuXHRcdFx0XHRpZihjb250ZW50IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y29udGVudFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRwcm9wcy5rZXk9aWRcclxuXHRcdHByb3BzLm5vZGU9bm9kZVxyXG5cdFx0cHJvcHMudHlwZT10eXBlXHJcblxyXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cclxuXHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdGNoaWxkRWxlbWVudHM9Y2hpbGRyZW4ubWFwKGE9PmEgPyB0aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KSA6IG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0dHlwZSxcclxuXHRcdFx0XHRwcm9wcyxcclxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuIl19