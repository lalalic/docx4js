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
	}]);

	return Part;
}();

exports.default = Part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsImlkIiwicmVsIiwicmVscyIsInRhcmdldCIsImF0dHIiLCJ0eXBlIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJySWQiLCJfbmV4dHJJZCIsImFwcGVuZCIsInBhcnROYW1lIiwicmF3IiwiZmlsZSIsInRhcmdldE5hbWUiLCJ0IiwiVGFyZ2V0IiwibWF0Y2giLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwiZmluZCIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwiZXh0cmEiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiYXNzaWduIiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7O0lBQVlBLEc7Ozs7Ozs7Ozs7SUFFU0MsSTtBQUNwQixlQUFZQyxJQUFaLEVBQWlCQyxHQUFqQixFQUFxQjtBQUFBOztBQUNwQixPQUFLRCxJQUFMLEdBQVVBLElB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QUFHSixTQUFHTyxZQUFVQyxTQUFiLEVBQ0NQLFdBQVNNLE9BQVQ7QUFDRDtBQUNEO0FBQ0RQLFNBQU1TLEdBQU4sR0FBVXhELEVBQVY7QUFDQStDLFNBQU1GLElBQU4sR0FBV0EsSUFBWDtBQUNBRSxTQUFNMUMsSUFBTixHQUFXQSxJQUFYOztBQUVBLE9BQUc2QyxLQUFILEVBQ0N2RCxPQUFPOEQsTUFBUCxDQUFjVixLQUFkLEVBQW9CRyxLQUFwQjs7QUFFRCxPQUFJUSxnQkFBYyxFQUFsQjtBQUNBLE9BQUdWLFlBQVlBLFNBQVNXLE1BQXhCLEVBQStCO0FBQzlCRCxvQkFBY1YsU0FBUzlCLEdBQVQsQ0FBYTtBQUFBLFlBQUdFLElBQUksTUFBS3dDLFVBQUwsQ0FBZ0J4QyxDQUFoQixFQUFrQjBCLGFBQWxCLEVBQWdDRyxRQUFoQyxDQUFKLEdBQWdELElBQW5EO0FBQUEsS0FBYixFQUNaWSxNQURZLENBQ0w7QUFBQSxZQUFHLENBQUMsQ0FBQ3pDLENBQUw7QUFBQSxLQURLLENBQWQ7QUFFQTs7QUFFRCxVQUFPMEIsY0FDTHpDLElBREssRUFFTDBDLEtBRkssRUFHTFcsYUFISyxDQUFQO0FBS0E7Ozs7OztrQkF4TW1CeEUsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT0xFIGZyb20gXCIuL29sZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnR7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXG5cdFx0bGV0IGZvbGRlcj1cIlwiXG5cdFx0bGV0IHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxuXHRcdGxldCBpPW5hbWUubGFzdEluZGV4T2YoJy8nKVxuXG5cdFx0aWYoaSE9PS0xKXtcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmVsc1wiLHtcblx0XHRcdFx0Z2V0KCl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5yZWxOYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCl7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJjb250ZW50XCIse1xuXHRcdFx0Z2V0KCl7XG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMubmFtZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0Z2V0UmVsUGFydChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0cmV0dXJuIG5ldyBQYXJ0KGAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0fWAsdGhpcy5kb2MpXG5cdH1cblxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcblx0fVxuXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0fVxuXG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpPT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cblxuXHRcdHN3aXRjaChyZWwuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRsZXQgdXJsPXRoaXMuZG9jLmdldERhdGFQYXJ0QXNVcmwodGhpcy5mb2xkZXIrdGFyZ2V0LCBcImltYWdlLypcIilcblx0XHRcdGxldCBjcmMzMj10aGlzLmRvYy5nZXRQYXJ0Q3JjMzIodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHRcdFx0cmV0dXJuIHt1cmwsY3JjMzJ9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmKHRhcmdldC5lbmRzV2l0aChcIi54bWxcIikpXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0XHR9XG5cdH1cblxuXHRfbmV4dHJJZCgpe1xuXHRcdHJldHVybiBNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxXG5cdH1cblxuXHRhZGQodHlwZSx0YXJnZXQsZGF0YSl7XG5cdFx0Y29uc3QgcklkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7cklkfVwiIHR5cGU9XCIke3R5cGV9XCIgdGFyZ2V0PVwiJHt0YXJnZXR9XCIvPmApXG5cdFx0Y29uc3QgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXR9YFxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcblx0XHRyZXR1cm4gcklkXG5cdH1cblxuXHRhZGRJbWFnZShkYXRhKXtcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cblx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KDAsLi4udGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwW1R5cGUkPSdpbWFnZSddXCIpLnRvQXJyYXkoKS5tYXAodD0+e1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHQuYXR0cmlicy5UYXJnZXQubWF0Y2goL1xcZCtcXC4vKXx8WzBdKVxuXHRcdH0pKSsxKStcIi5qcGdcIjtcblxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcblxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgSWQ9XCIke2lkfVwiIFR5cGU9XCIke3R5cGV9XCIgVGFyZ2V0PVwiJHt0YXJnZXROYW1lfVwiLz5gKVxuXG5cdFx0cmV0dXJuIGlkXG5cdH1cblxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxuXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxuXG5cdFx0cmV0dXJuIGlkXG5cdH1cblxuXHRhZGRDaHVuayhkYXRhLCByZWxhdGlvbnNoaXBUeXBlLCBjb250ZW50VHlwZSwgZXh0KXtcblx0XHRyZWxhdGlvbnNoaXBUeXBlPXJlbGF0aW9uc2hpcFR5cGV8fFwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9hRkNodW5rXCJcblx0XHRjb250ZW50VHlwZT1jb250ZW50VHlwZXx8dGhpcy5kb2MuY29uc3RydWN0b3IubWltZVxuXHRcdGV4dD1leHR8fHRoaXMuZG9jLmNvbnN0cnVjdG9yLmV4dFxuXG5cdFx0bGV0IGlkPXRoaXMuX25leHRySWQoKVxuXHRcdGxldCBySWQ9YHJJZCR7aWR9YFxuXHRcdGxldCB0YXJnZXROYW1lPWBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWBcblx0XHRsZXQgcGFydE5hbWU9YCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWBcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgVHlwZT1cIiR7cmVsYXRpb25zaGlwVHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXG5cblx0XHR0aGlzLmRvYy5jb250ZW50VHlwZXNcblx0XHRcdC5hcHBlbmQoYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YClcblxuXHRcdHJldHVybiBySWRcblx0fVxuXG5cdGdldFJlbE9sZU9iamVjdChyaWQpe1xuXHRcdGxldCByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9JHtyaWR9XWApXG5cdFx0bGV0IHR5cGU9cmVsLmF0dHIoXCJUeXBlXCIpXG5cdFx0bGV0IHRhcmdldE5hbWU9cmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRsZXQgZGF0YT10aGlzLmRvYy5nZXREYXRhUGFydChgJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YClcblx0XHRzd2l0Y2godHlwZS5zcGxpdChcIi9cIikucG9wKCkpe1xuXHRcdFx0Y2FzZSBcIm9sZU9iamVjdFwiOlxuXHRcdFx0XHRyZXR1cm4gT0xFLnBhcnNlKGRhdGEpXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gZGF0YVxuXHRcdH1cblxuXHR9XG5cblx0cmVtb3ZlUmVsKGlkKXtcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKSE9PVwiRXh0ZXJuYWxcIil7XG5cdFx0XHRsZXQgcGFydE5hbWU9dGhpcy5mb2xkZXIrcmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKClcblx0XHRcdHRoaXMuZG9jLnJhdy5yZW1vdmUocGFydE5hbWUpXG5cdFx0XHRkZWxldGUgdGhpcy5kb2MucGFydHNbcGFydE5hbWVdXG5cdFx0fVxuXHRcdHJlbC5yZW1vdmUoKVxuXHR9XG5cblx0cmVuZGVyTm9kZShub2RlLCBjcmVhdGVFbGVtZW50PSh0eXBlLHByb3BzLGNoaWxkcmVuKT0+e3R5cGUscHJvcHMsY2hpbGRyZW59LGlkZW50aWZ5PW5vZGU9Pm5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKCksIGV4dHJhKXtcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xuXHRcdFx0aWYocGFyZW50Lm5hbWU9PVwidzp0XCIpe1xuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblxuXHRcdGxldCB0eXBlPXRhZ05hbWVcblx0XHRsZXQgcHJvcHM9e31cblxuXHRcdGlmKGlkZW50aWZ5KXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXG5cdFx0XHRpZighbW9kZWwpXG5cdFx0XHRcdHJldHVybiBudWxsXG5cblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xuXHRcdFx0XHR0eXBlPW1vZGVsXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHByb3BzLmtleT1pZFxuXHRcdHByb3BzLm5vZGU9bm9kZVxuXHRcdHByb3BzLnR5cGU9dHlwZVxuXG5cdFx0aWYoZXh0cmEpXG5cdFx0XHRPYmplY3QuYXNzaWduKHByb3BzLGV4dHJhKVxuXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0Y2hpbGRFbGVtZW50cz1jaGlsZHJlbi5tYXAoYT0+YSA/IHRoaXMucmVuZGVyTm9kZShhLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpIDogbnVsbClcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdHR5cGUsXG5cdFx0XHRcdHByb3BzLFxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXG5cdFx0XHQpXG5cdH1cbn1cbiJdfQ==