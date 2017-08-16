"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

			this.rels("Relationships").append("<Relationship Id=\"" + id + "\" Type=\"" + type + "\" Target=\"" + partName + "\"/>");

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJfbmV4dHJJZCIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsInJhdyIsImZpbGUiLCJhcHBlbmQiLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJySWQiLCJjb250ZW50VHlwZXMiLCJmaW5kIiwicmVtb3ZlIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWRlbnRpZnkiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxJO0FBQ3BCLGVBQVlDLElBQVosRUFBaUJDLEdBQWpCLEVBQXFCO0FBQUE7O0FBQ3BCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDs7QUFFQSxNQUFJQyxTQUFPLEVBQVg7QUFDQSxNQUFJQyxVQUFRLFdBQVNILElB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QUFFQSxPQUFJb0QsZ0JBQWMsRUFBbEI7QUFDQSxPQUFHUixZQUFZQSxTQUFTUyxNQUF4QixFQUErQjtBQUM5QkQsb0JBQWNSLFNBQVMxQixHQUFULENBQWE7QUFBQSxZQUFHRSxJQUFJLE1BQUtrQyxVQUFMLENBQWdCbEMsQ0FBaEIsRUFBa0JzQixhQUFsQixFQUFnQ0csUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWlUsTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUNuQyxDQUFMO0FBQUEsS0FESyxDQUFkO0FBRUE7O0FBRUQsVUFBT3NCLGNBQ0wxQyxJQURLLEVBRUwyQyxLQUZLLEVBR0xTLGFBSEssQ0FBUDtBQUtBOzs7Ozs7a0JBdkttQmxFLEkiLCJmaWxlIjoicGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnR7XHJcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xyXG5cdFx0dGhpcy5uYW1lPW5hbWVcclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cclxuXHRcdGxldCBmb2xkZXI9XCJcIlxyXG5cdFx0bGV0IHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxyXG5cdFx0bGV0IGk9bmFtZS5sYXN0SW5kZXhPZignLycpXHJcblxyXG5cdFx0aWYoaSE9PS0xKXtcclxuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSsxKVxyXG5cdFx0XHRyZWxOYW1lPWZvbGRlcitcIl9yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGRvYy5wYXJ0c1tyZWxOYW1lXSl7XHJcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxyXG5cdFx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJlbHNcIix7XHJcblx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLnJlbE5hbWUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faW5pdCgpXHJcblx0fVxyXG5cclxuXHRfaW5pdCgpe1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJjb250ZW50XCIse1xyXG5cdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0fVxyXG5cclxuXHRnZXRSZWwoaWQpe1xyXG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcclxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXHJcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cclxuXHJcblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XHJcblx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdGxldCB1cmw9dGhpcy5kb2MuZ2V0RGF0YVBhcnRBc1VybCh0aGlzLmZvbGRlcit0YXJnZXQsIFwiaW1hZ2UvKlwiKVxyXG5cdFx0XHRsZXQgY3JjMzI9dGhpcy5kb2MuZ2V0UGFydENyYzMyKHRoaXMuZm9sZGVyK3RhcmdldClcclxuXHRcdFx0cmV0dXJuIHt1cmwsY3JjMzJ9XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRpZih0YXJnZXQuZW5kc1dpdGgoXCIueG1sXCIpKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfbmV4dHJJZCgpe1xyXG5cdFx0cmV0dXJuIE1hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzFcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXHJcblxyXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldD1cIiR7cGFydE5hbWV9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblxyXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCl7XHJcblx0XHRyZWxhdGlvbnNoaXBUeXBlPXJlbGF0aW9uc2hpcFR5cGV8fFwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9hRkNodW5rXCJcclxuXHRcdGNvbnRlbnRUeXBlPWNvbnRlbnRUeXBlfHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5taW1lXHJcblx0XHRleHQ9ZXh0fHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHRcclxuXHJcblx0XHRsZXQgaWQ9dGhpcy5fbmV4dHJJZCgpXHJcblx0XHRsZXQgcklkPWBySWQke2lkfWBcclxuXHRcdGxldCB0YXJnZXROYW1lPWBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWBcclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgVHlwZT1cIiR7cmVsYXRpb25zaGlwVHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXHJcblxyXG5cdFx0dGhpcy5kb2MuY29udGVudFR5cGVzXHJcblx0XHRcdC5hcHBlbmQoYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gcklkXHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZVJlbChpZCl7XHJcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxyXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpIT09XCJFeHRlcm5hbFwiKXtcclxuXHRcdFx0bGV0IHBhcnROYW1lPXRoaXMuZm9sZGVyK3JlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKClcclxuXHRcdFx0dGhpcy5kb2MucmF3LnJlbW92ZShwYXJ0TmFtZSlcclxuXHRcdFx0ZGVsZXRlIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXVxyXG5cdFx0fVxyXG5cdFx0cmVsLnJlbW92ZSgpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57dHlwZSxwcm9wcyxjaGlsZHJlbn0saWRlbnRpZnk9bm9kZT0+bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSl7XHJcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxyXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XHJcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdHlwZT10YWdOYW1lXHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHJcblx0XHRpZihpZGVudGlmeSl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXHJcblx0XHRcdGlmKCFtb2RlbClcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cclxuXHRcdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIil7XHJcblx0XHRcdFx0dHlwZT1tb2RlbFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgY29udGVudDtcclxuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XHJcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNvbnRlbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHJvcHMua2V5PWlkXHJcblx0XHRwcm9wcy5ub2RlPW5vZGVcclxuXHRcdHByb3BzLnR5cGU9dHlwZVxyXG5cclxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPVtdXHJcblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKVxyXG5cdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG5cdFx0XHRcdHR5cGUsXHJcblx0XHRcdFx0cHJvcHMsXHJcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==