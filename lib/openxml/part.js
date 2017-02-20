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
			this.rels = doc.getObjectPart(relName);
		}
		this._init();
	}

	_createClass(Part, [{
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

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJyZWxzIiwiZ2V0T2JqZWN0UGFydCIsIl9pbml0IiwiY29udGVudCIsInR5cGUiLCJhdHRyIiwidGFyZ2V0IiwiaWQiLCJyZWwiLCJ1cmwiLCJzcGxpdCIsInBvcCIsImRhdGEiLCJnZXREYXRhUGFydCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJjcmMzMiIsImdldFJlbE9iamVjdCIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwidGFnTmFtZSIsInBhcmVudCIsIm1vZGVsIiwidW5kZWZpbmVkIiwia2V5IiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsIm1hcCIsImEiLCJyZW5kZXJOb2RlIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBcUJBLEk7QUFDcEIsZUFBWUMsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUOztBQUVBLE1BQUlDLFNBQU8sRUFBWDtBQUNBLE1BQUlDLFVBQVEsV0FBU0gsSUFBVCxHQUFjLE9BQTFCO0FBQ0EsTUFBSUksSUFBRUosS0FBS0ssV0FBTCxDQUFpQixHQUFqQixDQUFOOztBQUVBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0YsS0FBS00sU0FBTCxDQUFlLENBQWYsRUFBaUJGLElBQUUsQ0FBbkIsQ0FBUDtBQUNBRCxhQUFRRCxTQUFPLFFBQVAsR0FBZ0JGLEtBQUtNLFNBQUwsQ0FBZUYsSUFBRSxDQUFqQixDQUFoQixHQUFvQyxPQUE1QztBQUNBOztBQUVELE1BQUdILElBQUlNLEtBQUosQ0FBVUosT0FB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O0FBRXlCRCxVQUZ6Qjs7QUFHSixTQUFHbEIsWUFBVXdCLFNBQWIsRUFDQ0wsV0FBU25CLE9BQVQ7QUFDRDtBQUNEO0FBQ0RrQixTQUFNTyxHQUFOLEdBQVVyQixFQUFWO0FBQ0FjLFNBQU1GLElBQU4sR0FBV0EsSUFBWDtBQUNBRSxTQUFNakIsSUFBTixHQUFXQSxJQUFYOztBQUVBLE9BQUl5QixnQkFBYyxFQUFsQjtBQUNBLE9BQUdQLFlBQVlBLFNBQVNRLE1BQXhCLEVBQStCO0FBQzlCRCxvQkFBY1AsU0FBU1MsR0FBVCxDQUFhO0FBQUEsWUFBR0MsSUFBSSxNQUFLQyxVQUFMLENBQWdCRCxDQUFoQixFQUFrQlosYUFBbEIsRUFBZ0NHLFFBQWhDLENBQUosR0FBZ0QsSUFBbkQ7QUFBQSxLQUFiLEVBQ1pXLE1BRFksQ0FDTDtBQUFBLFlBQUcsQ0FBQyxDQUFDRixDQUFMO0FBQUEsS0FESyxDQUFkO0FBRUE7O0FBRUQsVUFBT1osY0FDTGhCLElBREssRUFFTGlCLEtBRkssRUFHTFEsYUFISyxDQUFQO0FBS0E7Ozs7OztrQkEzRm1CdEMsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XHJcblx0XHR0aGlzLm5hbWU9bmFtZVxyXG5cdFx0dGhpcy5kb2M9ZG9jXHJcblxyXG5cdFx0bGV0IGZvbGRlcj1cIlwiXHJcblx0XHRsZXQgcmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiXHJcblx0XHRsZXQgaT1uYW1lLmxhc3RJbmRleE9mKCcvJylcclxuXHRcdFx0XHJcblx0XHRpZihpIT09LTEpe1xyXG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKzEpXHJcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcclxuXHRcdFx0dGhpcy5mb2xkZXI9Zm9sZGVyXHJcblx0XHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXHJcblx0XHRcdHRoaXMucmVscz1kb2MuZ2V0T2JqZWN0UGFydChyZWxOYW1lKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faW5pdCgpXHJcblx0fVxyXG5cclxuXHRfaW5pdCgpe1xyXG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHR9XHJcblxyXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsKGlkKXtcclxuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXHJcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIik9PT0nRXh0ZXJuYWwnKVxyXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XHJcblxyXG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xyXG5cdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRsZXQgZGF0YT10aGlzLmRvYy5nZXREYXRhUGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHRcdGxldCB1cmw9VVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbZGF0YV0se3R5cGU6XCJpbWFnZS8qXCJ9KSlcclxuXHRcdFx0cmV0dXJuIHt1cmwsIGNyYzMyOiBkYXRhLmNyYzMyfVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcclxuXHRcdGxldCB7bmFtZTp0YWdOYW1lLCBjaGlsZHJlbixpZCwgcGFyZW50fT1ub2RlXHJcblx0XHRpZihub2RlLnR5cGU9PVwidGV4dFwiKXtcclxuXHRcdFx0aWYocGFyZW50Lm5hbWU9PVwidzp0XCIpe1xyXG5cdFx0XHRcdHJldHVybiBub2RlLmRhdGFcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cclxuXHRcdGxldCB0eXBlPXRhZ05hbWVcclxuXHRcdGxldCBwcm9wcz17fVxyXG5cclxuXHRcdGlmKGlkZW50aWZ5KXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KG5vZGUsdGhpcylcclxuXHRcdFx0aWYoIW1vZGVsKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblxyXG5cdFx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHR0eXBlPW1vZGVsXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBjb250ZW50O1xyXG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcclxuXHRcdFx0XHRpZihjb250ZW50IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y29udGVudFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRwcm9wcy5rZXk9aWRcclxuXHRcdHByb3BzLm5vZGU9bm9kZVxyXG5cdFx0cHJvcHMudHlwZT10eXBlXHJcblxyXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cclxuXHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdGNoaWxkRWxlbWVudHM9Y2hpbGRyZW4ubWFwKGE9PmEgPyB0aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KSA6IG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0dHlwZSxcclxuXHRcdFx0XHRwcm9wcyxcclxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuIl19