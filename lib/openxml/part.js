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
		key: "addImage",
		value: function addImage(data) {
			var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
			var id = "rId" + this._nextrId();

			var targetName = "media/image" + (Math.max.apply(Math, _toConsumableArray(this.rels("Relationship[Type$='image']").toArray().map(function (t) {
				return parseInt(t.attribs.target.match(/\d+/)[0] || "0");
			}))) + 1) + ".jpg";

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
	}]);

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJfbmV4dHJJZCIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsInJhdyIsImZpbGUiLCJhcHBlbmQiLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJySWQiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwiZmluZCIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwiZXh0cmEiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiYXNzaWduIiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0lBQVlBLEc7Ozs7Ozs7Ozs7SUFFU0MsSTtBQUNwQixlQUFZQyxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElBQVY7QUFDQSxP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L29sZVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJ0e1xyXG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcclxuXHRcdHRoaXMubmFtZT1uYW1lXHJcblx0XHR0aGlzLmRvYz1kb2NcclxuXHJcblx0XHRsZXQgZm9sZGVyPVwiXCJcclxuXHRcdGxldCByZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCJcclxuXHRcdGxldCBpPW5hbWUubGFzdEluZGV4T2YoJy8nKVxyXG5cclxuXHRcdGlmKGkhPT0tMSl7XHJcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcclxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcclxuXHRcdH1cclxuXHJcblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xyXG5cdFx0XHR0aGlzLmZvbGRlcj1mb2xkZXJcclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcclxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyZWxzXCIse1xyXG5cdFx0XHRcdGdldCgpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5yZWxOYW1lKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdH1cclxuXHRcdHRoaXMuX2luaXQoKVxyXG5cdH1cclxuXHJcblx0X2luaXQoKXtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwiY29udGVudFwiLHtcclxuXHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcclxuXHR9XHJcblxyXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xyXG5cdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsKGlkKXtcclxuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXHJcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIik9PT0nRXh0ZXJuYWwnKVxyXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XHJcblxyXG5cdFx0c3dpdGNoKHJlbC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKCkpe1xyXG5cdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRsZXQgdXJsPXRoaXMuZG9jLmdldERhdGFQYXJ0QXNVcmwodGhpcy5mb2xkZXIrdGFyZ2V0LCBcImltYWdlLypcIilcclxuXHRcdFx0bGV0IGNyYzMyPXRoaXMuZG9jLmdldFBhcnRDcmMzMih0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHRcdHJldHVybiB7dXJsLGNyYzMyfVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0aWYodGFyZ2V0LmVuZHNXaXRoKFwiLnhtbFwiKSlcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQodGhpcy5mb2xkZXIrdGFyZ2V0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0X25leHRySWQoKXtcclxuXHRcdHJldHVybiBNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxXHJcblx0fVxyXG5cclxuXHRhZGRJbWFnZShkYXRhKXtcclxuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcclxuXHRcdGxldCBpZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxyXG5cclxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLnRhcmdldC5tYXRjaCgvXFxkKy8pWzBdfHxcIjBcIilcclxuXHRcdH0pKSsxKStcIi5qcGdcIjtcclxuXHJcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWBcclxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxyXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxyXG5cclxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcclxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7aWR9XCIgVHlwZT1cIiR7dHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblxyXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCl7XHJcblx0XHRyZWxhdGlvbnNoaXBUeXBlPXJlbGF0aW9uc2hpcFR5cGV8fFwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9hRkNodW5rXCJcclxuXHRcdGNvbnRlbnRUeXBlPWNvbnRlbnRUeXBlfHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5taW1lXHJcblx0XHRleHQ9ZXh0fHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHRcclxuXHJcblx0XHRsZXQgaWQ9dGhpcy5fbmV4dHJJZCgpXHJcblx0XHRsZXQgcklkPWBySWQke2lkfWBcclxuXHRcdGxldCB0YXJnZXROYW1lPWBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWBcclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgVHlwZT1cIiR7cmVsYXRpb25zaGlwVHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXHJcblxyXG5cdFx0dGhpcy5kb2MuY29udGVudFR5cGVzXHJcblx0XHRcdC5hcHBlbmQoYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gcklkXHJcblx0fVxyXG5cdFxyXG5cdGdldFJlbE9sZU9iamVjdChyaWQpe1xyXG5cdFx0bGV0IHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD0ke3JpZH1dYClcclxuXHRcdGxldCB0eXBlPXJlbC5hdHRyKFwiVHlwZVwiKVxyXG5cdFx0bGV0IHRhcmdldE5hbWU9cmVsLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGxldCBkYXRhPXRoaXMuZG9jLmdldERhdGFQYXJ0KGAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gKVxyXG5cdFx0c3dpdGNoKHR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpKXtcclxuXHRcdFx0Y2FzZSBcIm9sZU9iamVjdFwiOlxyXG5cdFx0XHRcdHJldHVybiBPTEUucGFyc2UoZGF0YSlcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gZGF0YVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZVJlbChpZCl7XHJcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxyXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpIT09XCJFeHRlcm5hbFwiKXtcclxuXHRcdFx0bGV0IHBhcnROYW1lPXRoaXMuZm9sZGVyK3JlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKClcclxuXHRcdFx0dGhpcy5kb2MucmF3LnJlbW92ZShwYXJ0TmFtZSlcclxuXHRcdFx0ZGVsZXRlIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXVxyXG5cdFx0fVxyXG5cdFx0cmVsLnJlbW92ZSgpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57dHlwZSxwcm9wcyxjaGlsZHJlbn0saWRlbnRpZnk9bm9kZT0+bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSwgZXh0cmEpe1xyXG5cdFx0bGV0IHtuYW1lOnRhZ05hbWUsIGNoaWxkcmVuLGlkLCBwYXJlbnR9PW5vZGVcclxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xyXG5cdFx0XHRpZihwYXJlbnQubmFtZT09XCJ3OnRcIil7XHJcblx0XHRcdFx0cmV0dXJuIG5vZGUuZGF0YVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHR5cGU9dGFnTmFtZVxyXG5cdFx0bGV0IHByb3BzPXt9XHJcblxyXG5cdFx0aWYoaWRlbnRpZnkpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkobm9kZSx0aGlzKVxyXG5cdFx0XHRpZighbW9kZWwpXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xyXG5cdFx0XHRcdHR5cGU9bW9kZWxcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XHJcblx0XHRcdFx0KHt0eXBlLCBjaGlsZHJlbjpjb250ZW50LCAuLi5wcm9wc309bW9kZWwpO1xyXG5cdFx0XHRcdGlmKGNvbnRlbnQhPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHByb3BzLmtleT1pZFxyXG5cdFx0cHJvcHMubm9kZT1ub2RlXHJcblx0XHRwcm9wcy50eXBlPXR5cGVcclxuXHRcdFxyXG5cdFx0aWYoZXh0cmEpXHJcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsZXh0cmEpXHJcblxyXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cclxuXHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdGNoaWxkRWxlbWVudHM9Y2hpbGRyZW4ubWFwKGE9PmEgPyB0aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KSA6IG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0dHlwZSxcclxuXHRcdFx0XHRwcm9wcyxcclxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXHJcblx0XHRcdClcclxuXHR9XHJcbn1cclxuIl19