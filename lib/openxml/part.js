"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ole = require("./ole");

var OLE = _interopRequireWildcard(_ole);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * name: ABSOLUTE path of a part, word.xml, ppt/slides/slide1.xml
 * folder:absolute folder, ends with "/" or totally empty ""
 * relName:absolute path of a relationship part
 */
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
				configurable: true,
				get: function get() {
					return this.doc.getObjectPart(this.name);
				}
			});
		}
	}, {
		key: "normalizePath",
		value: function normalizePath() {
			var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

			if (path.startsWith("/")) return path.substr(1);
			return this.folder + path;
		}
	}, {
		key: "getRelPart",
		value: function getRelPart(id) {
			var rel = this.rels("Relationship[Id=\"" + id + "\"]");
			var target = rel.attr("Target");
			return new Part(this.normalizePath(target), this.doc);
		}
	}, {
		key: "getRelTarget",
		value: function getRelTarget(type) {
			return this.rels("[Type$=\"" + type + "\"]").attr("Target");
		}
	}, {
		key: "getRelObject",
		value: function getRelObject(target) {
			return this.doc.getObjectPart(this.normalizePath(target));
		}
	}, {
		key: "getRel",
		value: function getRel(id) {
			var rel = this.rels("Relationship[Id=\"" + id + "\"]");
			var target = rel.attr("Target");
			if (rel.attr("TargetMode") === 'External') return { url: target };

			switch (rel.attr("Type").split("/").pop()) {
				case 'image':
					var url = this.doc.getDataPartAsUrl(this.normalizePath(target), "image/*");
					var crc32 = this.doc.getPartCrc32(this.normalizePath(target));
					return { url: url, crc32: crc32 };
				default:
					if (target.endsWith(".xml")) return this.getRelObject(target);else return this.doc.getPart(this.normalizePath(target));
			}
		}
	}, {
		key: "_nextrId",
		value: function _nextrId() {
			return Math.max.apply(Math, _toConsumableArray(this.rels('Relationship').toArray().map(function (a) {
				return parseInt(a.attribs.Id.substring(3));
			}))) + 1;
		}
	}, {
		key: "add",
		value: function add(type, target, data) {
			var rId = "rId" + this._nextrId();
			this.rels("Relationships").append("<Relationship Id=\"" + rId + "\" type=\"" + type + "\" target=\"" + target + "\"/>");
			var partName = this.normalizePath(target);
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);
			return rId;
		}
	}, {
		key: "addImage",
		value: function addImage(data) {
			var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ext: "jpg", mime: "image/jpg" },
			    ext = _ref.ext,
			    mime = _ref.mime;

			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
			var id = "rId" + this._nextrId();

			var targetName = "media/image" + (Math.max.apply(Math, [0].concat(_toConsumableArray(this.rels("Relationship[Type$='image']").toArray().map(function (t) {
				return parseInt(t.attribs.Target.match(/\d+\./) || [0]);
			})))) + 1) + "." + ext;

			var partName = this.normalizePath(targetName);
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);

			this.rels("Relationships").append("<Relationship Id=\"" + id + "\" Type=\"" + type + "\" Target=\"" + targetName + "\"/>");

			var DefaultTypes = this.doc.getObjectPart("[Content_Types].xml")("Types");
			var extType = DefaultTypes.find(">Default[Extension='" + ext + "']");
			if (extType.length == 0) {
				DefaultTypes.prepend("<Default Extension=\"" + ext + "\" ContentType=\"" + mime + "\"/>");
			}
			return id;
		}
	}, {
		key: "addExternalImage",
		value: function addExternalImage(url) {
			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";

			var id = "rId" + this._nextrId();

			this.rels("Relationships").append("<Relationship Id=\"" + id + "\" Type=\"" + type + "\" TargetMode=\"External\" Target=\"" + url + "\"/>");

			return id;
		}
	}, {
		key: "addChunk",
		value: function addChunk(data, relationshipType, contentType, ext) {
			relationshipType = relationshipType || "http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk";
			contentType = contentType || this.doc.constructor.mime;
			ext = ext || this.doc.constructor.ext;

			var id = this._nextrId();
			var rId = "rId" + id;
			var targetName = "chunk/chunk" + id + "." + ext;

			var partName = this.normalizePath(targetName);
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);

			this.rels("Relationships").append("<Relationship Id=\"" + rId + "\" Type=\"" + relationshipType + "\" Target=\"" + targetName + "\"/>");

			this.doc.contentTypes.append("<Override PartName=\"/" + partName + "\" ContentType=\"" + contentType + "\"/>");

			return rId;
		}
	}, {
		key: "getRelOleObject",
		value: function getRelOleObject(rid) {
			var rel = this.rels("Relationship[Id=" + rid + "]");
			var type = rel.attr("Type");
			var targetName = rel.attr("Target");
			var data = this.doc.getDataPart(this.normalizePath(targetName));
			switch (type.split("/").pop()) {
				case "oleObject":
					return OLE.parse(data);
				default:
					return data;
			}
		}
	}, {
		key: "removeRel",
		value: function removeRel(id) {
			var rel = this.rels("Relationship[Id=\"" + id + "\"]");
			if (rel.attr("TargetMode") !== "External") {
				var partName = this.normalizePath(rel.attr("Target"));
				this.doc.contentTypes.find("[PartName='/" + partName + "']").remove();
				this.doc.raw.remove(partName);
				delete this.doc.parts[partName];
			}
			rel.remove();
		}
	}, {
		key: "renderNode",
		value: function renderNode(node) {
			var createElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (type, props, children) {
				type, props, children;
			};

			var _this = this;

			var identify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (node) {
				return node.name.split(":").pop();
			};
			var extra = arguments[3];
			var tagName = node.name,
			    children = node.children,
			    id = node.id,
			    parent = node.parent;

			if (node.type == "text") {
				return node.data;
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

			if (extra) Object.assign(props, extra);

			var childElements = children;
			if (Array.isArray(children)) {
				if (children.length) {
					childElements = children.map(function (a) {
						return a ? _this.renderNode(a, createElement, identify) : null;
					}).filter(function (a) {
						return !!a;
					});
				}
			}

			return createElement(type, props, childElements);
		}
	}, {
		key: "$",
		value: function $(node) {
			return this.doc.$(node);
		}
	}]);

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsImNvbmZpZ3VyYWJsZSIsInBhdGgiLCJzdGFydHNXaXRoIiwic3Vic3RyIiwiaWQiLCJyZWwiLCJyZWxzIiwidGFyZ2V0IiwiYXR0ciIsIm5vcm1hbGl6ZVBhdGgiLCJ0eXBlIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJySWQiLCJfbmV4dHJJZCIsImFwcGVuZCIsInBhcnROYW1lIiwicmF3IiwiZmlsZSIsImV4dCIsIm1pbWUiLCJ0YXJnZXROYW1lIiwidCIsIlRhcmdldCIsIm1hdGNoIiwiRGVmYXVsdFR5cGVzIiwiZXh0VHlwZSIsImZpbmQiLCJsZW5ndGgiLCJwcmVwZW5kIiwicmVsYXRpb25zaGlwVHlwZSIsImNvbnRlbnRUeXBlIiwiY29uc3RydWN0b3IiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwicmVtb3ZlIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWRlbnRpZnkiLCJleHRyYSIsInRhZ05hbWUiLCJwYXJlbnQiLCJtb2RlbCIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJrZXkiLCJhc3NpZ24iLCJjaGlsZEVsZW1lbnRzIiwiQXJyYXkiLCJpc0FycmF5IiwicmVuZGVyTm9kZSIsImZpbHRlciIsIiQiXSwi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LFNBQVNiLE1BQVosRUFBbUI7QUFDbEJ1QixxQkFBY1YsU0FBU2xDLEdBQVQsQ0FBYTtBQUFBLGFBQUdFLElBQUksTUFBSzZDLFVBQUwsQ0FBZ0I3QyxDQUFoQixFQUFrQjhCLGFBQWxCLEVBQWdDRyxRQUFoQyxDQUFKLEdBQWdELElBQW5EO0FBQUEsTUFBYixFQUFzRWEsTUFBdEUsQ0FBNkU7QUFBQSxhQUFHLENBQUMsQ0FBQzlDLENBQUw7QUFBQSxNQUE3RSxDQUFkO0FBQ0E7QUFDRDs7QUFFRCxVQUFPOEIsY0FDTDdDLElBREssRUFFTDhDLEtBRkssRUFHTFcsYUFISyxDQUFQO0FBS0E7OztvQkFFQ2IsSSxFQUFLO0FBQ04sVUFBTyxLQUFLbEUsR0FBTCxDQUFTb0YsQ0FBVCxDQUFXbEIsSUFBWCxDQUFQO0FBQ0E7Ozs7OztrQkF2Tm1CcEUsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT0xFIGZyb20gXCIuL29sZVwiXG5cbi8qKlxuICogbmFtZTogQUJTT0xVVEUgcGF0aCBvZiBhIHBhcnQsIHdvcmQueG1sLCBwcHQvc2xpZGVzL3NsaWRlMS54bWxcbiAqIGZvbGRlcjphYnNvbHV0ZSBmb2xkZXIsIGVuZHMgd2l0aCBcIi9cIiBvciB0b3RhbGx5IGVtcHR5IFwiXCJcbiAqIHJlbE5hbWU6YWJzb2x1dGUgcGF0aCBvZiBhIHJlbGF0aW9uc2hpcCBwYXJ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnR7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXG5cdFx0bGV0IGZvbGRlcj1cIlwiXG5cdFx0bGV0IHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxuXHRcdGxldCBpPW5hbWUubGFzdEluZGV4T2YoJy8nKVxuXG5cdFx0aWYoaSE9PS0xKXtcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmVsc1wiLHtcblx0XHRcdFx0Z2V0KCl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5yZWxOYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCl7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJjb250ZW50XCIse1xuXHRcdFx0Y29uZmlndXJhYmxlOnRydWUsXG5cdFx0XHRnZXQoKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRub3JtYWxpemVQYXRoKHBhdGg9XCJcIil7XG5cdFx0aWYocGF0aC5zdGFydHNXaXRoKFwiL1wiKSlcblx0XHRcdHJldHVybiBwYXRoLnN1YnN0cigxKVxuXHRcdHJldHVybiB0aGlzLmZvbGRlcitwYXRoXG5cdH1cblxuXHRnZXRSZWxQYXJ0KGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRyZXR1cm4gbmV3IFBhcnQodGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldCksdGhpcy5kb2MpXG5cdH1cblxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcblx0fVxuXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpKVxuXHR9XG5cblx0Z2V0UmVsKGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIik9PT0nRXh0ZXJuYWwnKVxuXHRcdFx0cmV0dXJuIHt1cmw6dGFyZ2V0fVxuXG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xuXHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGxldCB1cmw9dGhpcy5kb2MuZ2V0RGF0YVBhcnRBc1VybCh0aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0KSwgXCJpbWFnZS8qXCIpXG5cdFx0XHRsZXQgY3JjMzI9dGhpcy5kb2MuZ2V0UGFydENyYzMyKHRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpKVxuXHRcdFx0cmV0dXJuIHt1cmwsY3JjMzJ9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmKHRhcmdldC5lbmRzV2l0aChcIi54bWxcIikpXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRQYXJ0KHRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpKVxuXHRcdH1cblx0fVxuXG5cdF9uZXh0cklkKCl7XG5cdFx0cmV0dXJuIE1hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzFcblx0fVxuXG5cdGFkZCh0eXBlLHRhcmdldCxkYXRhKXtcblx0XHRjb25zdCBySWQ9YHJJZCR7dGhpcy5fbmV4dHJJZCgpfWBcblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgdHlwZT1cIiR7dHlwZX1cIiB0YXJnZXQ9XCIke3RhcmdldH1cIi8+YClcblx0XHRjb25zdCBwYXJ0TmFtZT10aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0KVxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcblx0XHRyZXR1cm4gcklkXG5cdH1cblxuXHRhZGRJbWFnZShkYXRhLCB7ZXh0LG1pbWV9PXtleHQ6XCJqcGdcIixtaW1lOlwiaW1hZ2UvanBnXCJ9KXtcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cblx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KDAsLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHQuYXR0cmlicy5UYXJnZXQubWF0Y2goL1xcZCtcXC4vKXx8WzBdKVxuXHRcdH0pKSsxKStcIi5cIitleHQ7XG5cblx0XHRsZXQgcGFydE5hbWU9dGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldE5hbWUpXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7aWR9XCIgVHlwZT1cIiR7dHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXG5cblx0XHRjb25zdCBEZWZhdWx0VHlwZXM9dGhpcy5kb2MuZ2V0T2JqZWN0UGFydChcIltDb250ZW50X1R5cGVzXS54bWxcIikoYFR5cGVzYClcblx0XHRjb25zdCBleHRUeXBlPURlZmF1bHRUeXBlcy5maW5kKGA+RGVmYXVsdFtFeHRlbnNpb249JyR7ZXh0fSddYClcblx0XHRpZihleHRUeXBlLmxlbmd0aD09MCl7XG5cdFx0XHREZWZhdWx0VHlwZXMucHJlcGVuZChgPERlZmF1bHQgRXh0ZW5zaW9uPVwiJHtleHR9XCIgQ29udGVudFR5cGU9XCIke21pbWV9XCIvPmApXG5cdFx0fVxuXHRcdHJldHVybiBpZFxuXHR9XG5cblx0YWRkRXh0ZXJuYWxJbWFnZSh1cmwpe1xuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcblxuXHRcdGxldCBpZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7aWR9XCIgVHlwZT1cIiR7dHlwZX1cIiBUYXJnZXRNb2RlPVwiRXh0ZXJuYWxcIiBUYXJnZXQ9XCIke3VybH1cIi8+YClcblxuXHRcdHJldHVybiBpZFxuXHR9XG5cblx0YWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCl7XG5cdFx0cmVsYXRpb25zaGlwVHlwZT1yZWxhdGlvbnNoaXBUeXBlfHxcImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvYUZDaHVua1wiXG5cdFx0Y29udGVudFR5cGU9Y29udGVudFR5cGV8fHRoaXMuZG9jLmNvbnN0cnVjdG9yLm1pbWVcblx0XHRleHQ9ZXh0fHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHRcblxuXHRcdGxldCBpZD10aGlzLl9uZXh0cklkKClcblx0XHRsZXQgcklkPWBySWQke2lkfWBcblx0XHRsZXQgdGFyZ2V0TmFtZT1gY2h1bmsvY2h1bmske2lkfS4ke2V4dH1gXG5cblx0XHRsZXQgcGFydE5hbWU9dGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldE5hbWUpXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7cklkfVwiIFR5cGU9XCIke3JlbGF0aW9uc2hpcFR5cGV9XCIgVGFyZ2V0PVwiJHt0YXJnZXROYW1lfVwiLz5gKVxuXG5cdFx0dGhpcy5kb2MuY29udGVudFR5cGVzXG5cdFx0XHQuYXBwZW5kKGA8T3ZlcnJpZGUgUGFydE5hbWU9XCIvJHtwYXJ0TmFtZX1cIiBDb250ZW50VHlwZT1cIiR7Y29udGVudFR5cGV9XCIvPmApXG5cblx0XHRyZXR1cm4gcklkXG5cdH1cblxuXHRnZXRSZWxPbGVPYmplY3QocmlkKXtcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPSR7cmlkfV1gKVxuXHRcdGxldCB0eXBlPXJlbC5hdHRyKFwiVHlwZVwiKVxuXHRcdGxldCB0YXJnZXROYW1lPXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0bGV0IGRhdGE9dGhpcy5kb2MuZ2V0RGF0YVBhcnQodGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldE5hbWUpKVxuXHRcdHN3aXRjaCh0eXBlLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0XHRjYXNlIFwib2xlT2JqZWN0XCI6XG5cdFx0XHRcdHJldHVybiBPTEUucGFyc2UoZGF0YSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBkYXRhXG5cdFx0fVxuXG5cdH1cblxuXHRyZW1vdmVSZWwoaWQpe1xuXHRcdGxldCByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpIT09XCJFeHRlcm5hbFwiKXtcblx0XHRcdGxldCBwYXJ0TmFtZT10aGlzLm5vcm1hbGl6ZVBhdGgocmVsLmF0dHIoXCJUYXJnZXRcIikpXG5cdFx0XHR0aGlzLmRvYy5jb250ZW50VHlwZXMuZmluZChgW1BhcnROYW1lPScvJHtwYXJ0TmFtZX0nXWApLnJlbW92ZSgpXG5cdFx0XHR0aGlzLmRvYy5yYXcucmVtb3ZlKHBhcnROYW1lKVxuXHRcdFx0ZGVsZXRlIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXVxuXHRcdH1cblx0XHRyZWwucmVtb3ZlKClcblx0fVxuXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpLCBleHRyYSl7XG5cdFx0bGV0IHtuYW1lOnRhZ05hbWUsIGNoaWxkcmVuLGlkLCBwYXJlbnR9PW5vZGVcblx0XHRpZihub2RlLnR5cGU9PVwidGV4dFwiKXtcblx0XHRcdHJldHVybiBub2RlLmRhdGFcblx0XHR9XG5cblx0XHRsZXQgdHlwZT10YWdOYW1lXG5cdFx0bGV0IHByb3BzPXt9XG5cblx0XHRpZihpZGVudGlmeSl7XG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkobm9kZSx0aGlzKVxuXHRcdFx0aWYoIW1vZGVsKVxuXHRcdFx0XHRyZXR1cm4gbnVsbFxuXG5cdFx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiKXtcblx0XHRcdFx0dHlwZT1tb2RlbFxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBjb250ZW50O1xuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XG5cdFx0XHRcdGlmKGNvbnRlbnQhPT11bmRlZmluZWQpXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y29udGVudFxuXHRcdFx0fVxuXHRcdH1cblx0XHRwcm9wcy5rZXk9aWRcblx0XHRwcm9wcy5ub2RlPW5vZGVcblx0XHRwcm9wcy50eXBlPXR5cGVcblxuXHRcdGlmKGV4dHJhKVxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxleHRyYSlcblxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPWNoaWxkcmVuXG5cdFx0aWYoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpe1xuXHRcdFx0aWYoY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdFx0Y2hpbGRFbGVtZW50cz1jaGlsZHJlbi5tYXAoYT0+YSA/IHRoaXMucmVuZGVyTm9kZShhLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpIDogbnVsbCkuZmlsdGVyKGE9PiEhYSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudChcblx0XHRcdFx0dHlwZSxcblx0XHRcdFx0cHJvcHMsXG5cdFx0XHRcdGNoaWxkRWxlbWVudHNcblx0XHRcdClcblx0fVxuXG5cdCQobm9kZSl7XG5cdFx0cmV0dXJuIHRoaXMuZG9jLiQobm9kZSlcblx0fVxufVxuIl19