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
					if (target.endsWidth(".xml")) return this.getRelObject(target);else return this.doc.getPart(this.folder + target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJkYXRhIiwiZ2V0RGF0YVBhcnQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiY3JjMzIiLCJlbmRzV2lkdGgiLCJnZXRSZWxPYmplY3QiLCJnZXRQYXJ0Iiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWRlbnRpZnkiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsIm1hcCIsImEiLCJyZW5kZXJOb2RlIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBcUJBLEk7QUFDcEIsZUFBWUMsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUOztBQUVBLE1BQUlDLFNBQU8sRUFBWDtBQUNBLE1BQUlDLFVBQVEsV0FBU0gsSUFBVCxHQUFjLE9BQTFCO0FBQ0EsTUFBSUksSUFBRUosS0FBS0ssV0FBTCxDQUFpQixHQUFqQixDQUFOOztBQUVBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0YsS0FBS00sU0FBTCxDQUFlLENBQWYsRUFBaUJGLElBQUUsQ0FBbkIsQ0FBUDtBQUNBRCxhQUFRRCxTQUFPLFFBQVAsR0FBZ0JGLEtBQUtNLFNBQUwsQ0FBZUYsSUFBRSxDQUFqQixD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O0FBQ0E7QUFDRCxXQUFPLElBQVA7QUFDQTs7QUFFRCxPQUFJVCxPQUFLdUIsT0FBVDtBQUNBLE9BQUlILFFBQU0sRUFBVjs7QUFFQSxPQUFHRSxRQUFILEVBQVk7QUFDWCxRQUFJRyxRQUFNSCxTQUFTSixJQUFULEVBQWMsSUFBZCxDQUFWO0FBQ0EsUUFBRyxDQUFDTyxLQUFKLEVBQ0MsT0FBTyxJQUFQOztBQUVELFFBQUcsT0FBT0EsS0FBUCxJQUFlLFFBQWxCLEVBQTJCO0FBQzFCekIsWUFBS3lCLEtBQUw7QUFDQSxLQUZELE1BRUs7QUFDSixTQUFJQyxnQkFBSjtBQURJLGtCQUVnQ0QsS0FGaEM7QUFFRnpCLFNBRkUsVUFFRkEsSUFGRTtBQUVhMEIsWUFGYixVQUVJTCxRQUZKO0FBRXlCRCxVQUZ6Qjs7QUFHSixTQUFHTSxZQUFVQyxTQUFiLEVBQ0NOLFdBQVNLLE9BQVQ7QUFDRDtBQUNEO0FBQ0ROLFNBQU1RLEdBQU4sR0FBVXhCLEVBQVY7QUFDQWdCLFNBQU1GLElBQU4sR0FBV0EsSUFBWDtBQUNBRSxTQUFNcEIsSUFBTixHQUFXQSxJQUFYOztBQUVBLE9BQUk2QixnQkFBYyxFQUFsQjtBQUNBLE9BQUdSLFlBQVlBLFNBQVNTLE1BQXhCLEVBQStCO0FBQzlCRCxvQkFBY1IsU0FBU1UsR0FBVCxDQUFhO0FBQUEsWUFBR0MsSUFBSSxNQUFLQyxVQUFMLENBQWdCRCxDQUFoQixFQUFrQmIsYUFBbEIsRUFBZ0NHLFFBQWhDLENBQUosR0FBZ0QsSUFBbkQ7QUFBQSxLQUFiLEVBQ1pZLE1BRFksQ0FDTDtBQUFBLFlBQUcsQ0FBQyxDQUFDRixDQUFMO0FBQUEsS0FESyxDQUFkO0FBRUE7O0FBRUQsVUFBT2IsY0FDTG5CLElBREssRUFFTG9CLEtBRkssRUFHTFMsYUFISyxDQUFQO0FBS0E7Ozs7OztrQkF0R21CM0MsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XHJcblx0XHR0aGlzLm5hbWU9bmFtZVxyXG5cdFx0dGhpcy5kb2M9ZG9jXHJcblxyXG5cdFx0bGV0IGZvbGRlcj1cIlwiXHJcblx0XHRsZXQgcmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiXHJcblx0XHRsZXQgaT1uYW1lLmxhc3RJbmRleE9mKCcvJylcclxuXHRcdFx0XHJcblx0XHRpZihpIT09LTEpe1xyXG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKzEpXHJcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcclxuXHRcdFx0dGhpcy5mb2xkZXI9Zm9sZGVyXHJcblx0XHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXHJcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmVsc1wiLHtcclxuXHRcdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMucmVsTmFtZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9XHJcblx0XHR0aGlzLl9pbml0KClcclxuXHR9XHJcblxyXG5cdF9pbml0KCl7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImNvbnRlbnRcIix7XHJcblx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMubmFtZSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdGdldFJlbFRhcmdldCh0eXBlKXtcclxuXHRcdHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0fVxyXG5cclxuXHRnZXRSZWxPYmplY3QodGFyZ2V0KXtcclxuXHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcclxuXHR9XHJcblxyXG5cdGdldFJlbChpZCl7XHJcblx0XHR2YXIgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxyXG5cdFx0dmFyIHRhcmdldD1yZWwuYXR0cihcIlRhcmdldFwiKVxyXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpPT09J0V4dGVybmFsJylcclxuXHRcdFx0cmV0dXJuIHt1cmw6dGFyZ2V0fVxyXG5cclxuXHRcdHN3aXRjaChyZWwuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpKXtcclxuXHRcdGNhc2UgJ2ltYWdlJzpcclxuXHRcdFx0bGV0IGRhdGE9dGhpcy5kb2MuZ2V0RGF0YVBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxyXG5cdFx0XHRsZXQgdXJsPVVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW2RhdGFdLHt0eXBlOlwiaW1hZ2UvKlwifSkpXHJcblx0XHRcdHJldHVybiB7dXJsLCBjcmMzMjogZGF0YS5jcmMzMn1cclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdGlmKHRhcmdldC5lbmRzV2lkdGgoXCIueG1sXCIpKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57dHlwZSxwcm9wcyxjaGlsZHJlbn0saWRlbnRpZnk9bm9kZT0+bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSl7XHJcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxyXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XHJcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdHlwZT10YWdOYW1lXHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHJcblx0XHRpZihpZGVudGlmeSl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXHJcblx0XHRcdGlmKCFtb2RlbClcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cclxuXHRcdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIil7XHJcblx0XHRcdFx0dHlwZT1tb2RlbFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgY29udGVudDtcclxuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XHJcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNvbnRlbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHJvcHMua2V5PWlkXHJcblx0XHRwcm9wcy5ub2RlPW5vZGVcclxuXHRcdHByb3BzLnR5cGU9dHlwZVxyXG5cclxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPVtdXHJcblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKVxyXG5cdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG5cdFx0XHRcdHR5cGUsXHJcblx0XHRcdFx0cHJvcHMsXHJcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==