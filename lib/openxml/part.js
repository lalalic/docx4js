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
		key: "getRelPart",
		value: function getRelPart(id) {
			var rel = this.rels("Relationship[Id=\"" + id + "\"]");
			var target = rel.attr("Target");
			return new Part("" + this.folder + target, this.doc);
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
					var url = this.doc.getDataPartAsUrl(this.folder + target, "image/*");
					var crc32 = this.doc.getPartCrc32(this.folder + target);
					return { url: url, crc32: crc32 };
				default:
					if (target.endsWith(".xml")) return this.getRelObject(target);else return this.doc.getPart(this.folder + target);
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
			var partName = "" + this.folder + target;
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);
			return rId;
		}
	}, {
		key: "addImage",
		value: function addImage(data) {
			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
			var id = "rId" + this._nextrId();

			var targetName = "media/image" + (Math.max.apply(Math, [0].concat(_toConsumableArray(this.rels("Relationship[Type$='image']").toArray().map(function (t) {
				return parseInt(t.attribs.Target.match(/\d+\./) || [0]);
			})))) + 1) + ".jpg";

			var partName = "" + this.folder + targetName;
			this.doc.raw.file(partName, data);
			this.doc.parts[partName] = this.doc.raw.file(partName);

			this.rels("Relationships").append("<Relationship Id=\"" + id + "\" Type=\"" + type + "\" Target=\"" + targetName + "\"/>");

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
			var partName = "" + this.folder + targetName;
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
			var data = this.doc.getDataPart("" + this.folder + targetName);
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
				var partName = this.folder + rel.attr("Target");
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

			if (extra) Object.assign(props, extra);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsImlkIiwicmVsIiwicmVscyIsInRhcmdldCIsImF0dHIiLCJ0eXBlIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJySWQiLCJfbmV4dHJJZCIsImFwcGVuZCIsInBhcnROYW1lIiwicmF3IiwiZmlsZSIsInRhcmdldE5hbWUiLCJ0IiwiVGFyZ2V0IiwibWF0Y2giLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwiZmluZCIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwiZXh0cmEiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiYXNzaWduIiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsInJlbmRlck5vZGUiLCJmaWx0ZXIiLCIkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxHOzs7Ozs7Ozs7O0lBRVNDLEk7QUFDcEIsZUFBWUMsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFV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ekI7O0FBR0osU0FBR08sWUFBVUMsU0FBYixFQUNDUCxXQUFTTSxPQUFUO0FBQ0Q7QUFDRDtBQUNEUCxTQUFNUyxHQUFOLEdBQVV4RCxFQUFWO0FBQ0ErQyxTQUFNRixJQUFOLEdBQVdBLElBQVg7QUFDQUUsU0FBTTFDLElBQU4sR0FBV0EsSUFBWDs7QUFFQSxPQUFHNkMsS0FBSCxFQUNDdkQsT0FBTzhELE1BQVAsQ0FBY1YsS0FBZCxFQUFvQkcsS0FBcEI7O0FBRUQsT0FBSVEsZ0JBQWMsRUFBbEI7QUFDQSxPQUFHVixZQUFZQSxTQUFTVyxNQUF4QixFQUErQjtBQUM5QkQsb0JBQWNWLFNBQVM5QixHQUFULENBQWE7QUFBQSxZQUFHRSxJQUFJLE1BQUt3QyxVQUFMLENBQWdCeEMsQ0FBaEIsRUFBa0IwQixhQUFsQixFQUFnQ0csUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWlksTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUN6QyxDQUFMO0FBQUEsS0FESyxDQUFkO0FBRUE7O0FBRUQsVUFBTzBCLGNBQ0x6QyxJQURLLEVBRUwwQyxLQUZLLEVBR0xXLGFBSEssQ0FBUDtBQUtBOzs7b0JBRUNiLEksRUFBSztBQUNOLFVBQU8sS0FBS3pELEdBQUwsQ0FBUzBFLENBQVQsQ0FBV2pCLElBQVgsQ0FBUDtBQUNBOzs7Ozs7a0JBNU1tQjNELEkiLCJmaWxlIjoicGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE9MRSBmcm9tIFwiLi9vbGVcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0e1xuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XG5cdFx0dGhpcy5uYW1lPW5hbWVcblx0XHR0aGlzLmRvYz1kb2NcblxuXHRcdGxldCBmb2xkZXI9XCJcIlxuXHRcdGxldCByZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCJcblx0XHRsZXQgaT1uYW1lLmxhc3RJbmRleE9mKCcvJylcblxuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKzEpXG5cdFx0XHRyZWxOYW1lPWZvbGRlcitcIl9yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xuXHRcdH1cblxuXHRcdGlmKGRvYy5wYXJ0c1tyZWxOYW1lXSl7XG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcblx0XHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJlbHNcIix7XG5cdFx0XHRcdGdldCgpe1xuXHRcdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMucmVsTmFtZSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0dGhpcy5faW5pdCgpXG5cdH1cblxuXHRfaW5pdCgpe1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiY29udGVudFwiLHtcblx0XHRcdGdldCgpe1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdGdldFJlbFBhcnQoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0dmFyIHRhcmdldD1yZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdHJldHVybiBuZXcgUGFydChgJHt0aGlzLmZvbGRlcn0ke3RhcmdldH1gLHRoaXMuZG9jKVxuXHR9XG5cblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpXG5cdH1cblxuXHRnZXRSZWxPYmplY3QodGFyZ2V0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXG5cdH1cblxuXHRnZXRSZWwoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0dmFyIHRhcmdldD1yZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XG5cblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0bGV0IHVybD10aGlzLmRvYy5nZXREYXRhUGFydEFzVXJsKHRoaXMuZm9sZGVyK3RhcmdldCwgXCJpbWFnZS8qXCIpXG5cdFx0XHRsZXQgY3JjMzI9dGhpcy5kb2MuZ2V0UGFydENyYzMyKHRoaXMuZm9sZGVyK3RhcmdldClcblx0XHRcdHJldHVybiB7dXJsLGNyYzMyfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRpZih0YXJnZXQuZW5kc1dpdGgoXCIueG1sXCIpKVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXG5cdFx0fVxuXHR9XG5cblx0X25leHRySWQoKXtcblx0XHRyZXR1cm4gTWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMVxuXHR9XG5cblx0YWRkKHR5cGUsdGFyZ2V0LGRhdGEpe1xuXHRcdGNvbnN0IHJJZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgSWQ9XCIke3JJZH1cIiB0eXBlPVwiJHt0eXBlfVwiIHRhcmdldD1cIiR7dGFyZ2V0fVwiLz5gKVxuXHRcdGNvbnN0IHBhcnROYW1lPWAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0fWBcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXG5cdFx0cmV0dXJuIHJJZFxuXHR9XG5cblx0YWRkSW1hZ2UoZGF0YSl7XG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxuXHRcdGxldCBpZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxuXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCgwLC4uLnRoaXMucmVscyhcIlJlbGF0aW9uc2hpcFtUeXBlJD0naW1hZ2UnXVwiKS50b0FycmF5KCkubWFwKHQ9Pntcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMuVGFyZ2V0Lm1hdGNoKC9cXGQrXFwuLyl8fFswXSlcblx0XHR9KSkrMSkrXCIuanBnXCI7XG5cblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWBcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldD1cIiR7dGFyZ2V0TmFtZX1cIi8+YClcblxuXHRcdHJldHVybiBpZFxuXHR9XG5cblx0YWRkRXh0ZXJuYWxJbWFnZSh1cmwpe1xuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcblxuXHRcdGxldCBpZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7aWR9XCIgVHlwZT1cIiR7dHlwZX1cIiBUYXJnZXRNb2RlPVwiRXh0ZXJuYWxcIiBUYXJnZXQ9XCIke3VybH1cIi8+YClcblxuXHRcdHJldHVybiBpZFxuXHR9XG5cblx0YWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCl7XG5cdFx0cmVsYXRpb25zaGlwVHlwZT1yZWxhdGlvbnNoaXBUeXBlfHxcImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvYUZDaHVua1wiXG5cdFx0Y29udGVudFR5cGU9Y29udGVudFR5cGV8fHRoaXMuZG9jLmNvbnN0cnVjdG9yLm1pbWVcblx0XHRleHQ9ZXh0fHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHRcblxuXHRcdGxldCBpZD10aGlzLl9uZXh0cklkKClcblx0XHRsZXQgcklkPWBySWQke2lkfWBcblx0XHRsZXQgdGFyZ2V0TmFtZT1gY2h1bmsvY2h1bmske2lkfS4ke2V4dH1gXG5cdFx0bGV0IHBhcnROYW1lPWAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7cklkfVwiIFR5cGU9XCIke3JlbGF0aW9uc2hpcFR5cGV9XCIgVGFyZ2V0PVwiJHt0YXJnZXROYW1lfVwiLz5gKVxuXG5cdFx0dGhpcy5kb2MuY29udGVudFR5cGVzXG5cdFx0XHQuYXBwZW5kKGA8T3ZlcnJpZGUgUGFydE5hbWU9XCIvJHtwYXJ0TmFtZX1cIiBDb250ZW50VHlwZT1cIiR7Y29udGVudFR5cGV9XCIvPmApXG5cblx0XHRyZXR1cm4gcklkXG5cdH1cblxuXHRnZXRSZWxPbGVPYmplY3QocmlkKXtcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPSR7cmlkfV1gKVxuXHRcdGxldCB0eXBlPXJlbC5hdHRyKFwiVHlwZVwiKVxuXHRcdGxldCB0YXJnZXROYW1lPXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0bGV0IGRhdGE9dGhpcy5kb2MuZ2V0RGF0YVBhcnQoYCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWApXG5cdFx0c3dpdGNoKHR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpKXtcblx0XHRcdGNhc2UgXCJvbGVPYmplY3RcIjpcblx0XHRcdFx0cmV0dXJuIE9MRS5wYXJzZShkYXRhKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRhdGFcblx0XHR9XG5cblx0fVxuXG5cdHJlbW92ZVJlbChpZCl7XG5cdFx0bGV0IHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIikhPT1cIkV4dGVybmFsXCIpe1xuXHRcdFx0bGV0IHBhcnROYW1lPXRoaXMuZm9sZGVyK3JlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0XHR0aGlzLmRvYy5jb250ZW50VHlwZXMuZmluZChgW1BhcnROYW1lPScvJHtwYXJ0TmFtZX0nXWApLnJlbW92ZSgpXG5cdFx0XHR0aGlzLmRvYy5yYXcucmVtb3ZlKHBhcnROYW1lKVxuXHRcdFx0ZGVsZXRlIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXVxuXHRcdH1cblx0XHRyZWwucmVtb3ZlKClcblx0fVxuXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlRWxlbWVudD0odHlwZSxwcm9wcyxjaGlsZHJlbik9Pnt0eXBlLHByb3BzLGNoaWxkcmVufSxpZGVudGlmeT1ub2RlPT5ub2RlLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpLCBleHRyYSl7XG5cdFx0bGV0IHtuYW1lOnRhZ05hbWUsIGNoaWxkcmVuLGlkLCBwYXJlbnR9PW5vZGVcblx0XHRpZihub2RlLnR5cGU9PVwidGV4dFwiKXtcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcblx0XHRcdFx0cmV0dXJuIG5vZGUuZGF0YVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cblx0XHRsZXQgdHlwZT10YWdOYW1lXG5cdFx0bGV0IHByb3BzPXt9XG5cblx0XHRpZihpZGVudGlmeSl7XG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkobm9kZSx0aGlzKVxuXHRcdFx0aWYoIW1vZGVsKVxuXHRcdFx0XHRyZXR1cm4gbnVsbFxuXG5cdFx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiKXtcblx0XHRcdFx0dHlwZT1tb2RlbFxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdGxldCBjb250ZW50O1xuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XG5cdFx0XHRcdGlmKGNvbnRlbnQhPT11bmRlZmluZWQpXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y29udGVudFxuXHRcdFx0fVxuXHRcdH1cblx0XHRwcm9wcy5rZXk9aWRcblx0XHRwcm9wcy5ub2RlPW5vZGVcblx0XHRwcm9wcy50eXBlPXR5cGVcblxuXHRcdGlmKGV4dHJhKVxuXHRcdFx0T2JqZWN0LmFzc2lnbihwcm9wcyxleHRyYSlcblxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPVtdXG5cdFx0aWYoY2hpbGRyZW4gJiYgY2hpbGRyZW4ubGVuZ3RoKXtcblx0XHRcdGNoaWxkRWxlbWVudHM9Y2hpbGRyZW4ubWFwKGE9PmEgPyB0aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KSA6IG51bGwpXG5cdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRwcm9wcyxcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xuXHRcdFx0KVxuXHR9XG5cblx0JChub2RlKXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuJChub2RlKVxuXHR9XG59XG4iXX0=