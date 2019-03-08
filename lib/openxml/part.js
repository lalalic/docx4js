"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
				var _ref = t.attribs.Target.match(/\d+$/) || [0],
				    _ref2 = _slicedToArray(_ref, 1),
				    id = _ref2[0];

				return parseInt(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJfbmV4dHJJZCIsInRhcmdldE5hbWUiLCJ0IiwiVGFyZ2V0IiwibWF0Y2giLCJwYXJ0TmFtZSIsInJhdyIsImZpbGUiLCJhcHBlbmQiLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJySWQiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwiZmluZCIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwiZXh0cmEiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiYXNzaWduIiwiY2hpbGRFbGVtZW50cyIsImxlbmd0aCIsInJlbmRlck5vZGUiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsRzs7Ozs7Ozs7OztJQUVTQyxJO0FBQ3BCLGVBQVlDLElBQVosRUFBaUJDLEdBQWpCLEVBQXFCO0FBQUE7O0FBQ3BCLE9BQUtELElBQUwsR0FBVUEs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cnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBPTEUgZnJvbSBcIi4vb2xlXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFydHtcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xuXHRcdHRoaXMubmFtZT1uYW1lXG5cdFx0dGhpcy5kb2M9ZG9jXG5cblx0XHRsZXQgZm9sZGVyPVwiXCJcblx0XHRsZXQgcmVsTmFtZT1cIl9yZWxzL1wiK25hbWUrXCIucmVsc1wiXG5cdFx0bGV0IGk9bmFtZS5sYXN0SW5kZXhPZignLycpXG5cblx0XHRpZihpIT09LTEpe1xuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSsxKVxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCJfcmVscy9cIituYW1lLnN1YnN0cmluZyhpKzEpK1wiLnJlbHNcIjtcblx0XHR9XG5cblx0XHRpZihkb2MucGFydHNbcmVsTmFtZV0pe1xuXHRcdFx0dGhpcy5mb2xkZXI9Zm9sZGVyXG5cdFx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJyZWxzXCIse1xuXHRcdFx0XHRnZXQoKXtcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLnJlbE5hbWUpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fVxuXHRcdHRoaXMuX2luaXQoKVxuXHR9XG5cblx0X2luaXQoKXtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcImNvbnRlbnRcIix7XG5cdFx0XHRnZXQoKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMucmVscyhgW1R5cGUkPVwiJHt0eXBlfVwiXWApLmF0dHIoXCJUYXJnZXRcIilcblx0fVxuXG5cdGdldFJlbE9iamVjdCh0YXJnZXQpe1xuXHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0fVxuXG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpPT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cblxuXHRcdHN3aXRjaChyZWwuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRsZXQgdXJsPXRoaXMuZG9jLmdldERhdGFQYXJ0QXNVcmwodGhpcy5mb2xkZXIrdGFyZ2V0LCBcImltYWdlLypcIilcblx0XHRcdGxldCBjcmMzMj10aGlzLmRvYy5nZXRQYXJ0Q3JjMzIodGhpcy5mb2xkZXIrdGFyZ2V0KVxuXHRcdFx0cmV0dXJuIHt1cmwsY3JjMzJ9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmKHRhcmdldC5lbmRzV2l0aChcIi54bWxcIikpXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRQYXJ0KHRoaXMuZm9sZGVyK3RhcmdldClcblx0XHR9XG5cdH1cblxuXHRfbmV4dHJJZCgpe1xuXHRcdHJldHVybiBNYXRoLm1heCguLi50aGlzLnJlbHMoJ1JlbGF0aW9uc2hpcCcpLnRvQXJyYXkoKS5tYXAoYT0+cGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpKSsxXG5cdH1cblxuXHRhZGRJbWFnZShkYXRhKXtcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cblx0XHRsZXQgdGFyZ2V0TmFtZT1cIm1lZGlhL2ltYWdlXCIrKE1hdGgubWF4KC4uLnRoaXMucmVscyhcIlJlbGF0aW9uc2hpcFtUeXBlJD0naW1hZ2UnXVwiKS50b0FycmF5KCkubWFwKHQ9Pntcblx0XHRcdGNvbnN0IFtpZF09dC5hdHRyaWJzLlRhcmdldC5tYXRjaCgvXFxkKyQvKXx8WzBdXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoaWQpXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xuXG5cdFx0bGV0IHBhcnROYW1lPWAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxuXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxuXHRcdFx0LmFwcGVuZChgPFJlbGF0aW9uc2hpcCBJZD1cIiR7aWR9XCIgVHlwZT1cIiR7dHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXG5cblx0XHRyZXR1cm4gaWRcblx0fVxuXG5cdGFkZEV4dGVybmFsSW1hZ2UodXJsKXtcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXG5cblx0XHRsZXQgaWQ9YHJJZCR7dGhpcy5fbmV4dHJJZCgpfWBcblxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgSWQ9XCIke2lkfVwiIFR5cGU9XCIke3R5cGV9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmApXG5cblx0XHRyZXR1cm4gaWRcblx0fVxuXG5cdGFkZENodW5rKGRhdGEsIHJlbGF0aW9uc2hpcFR5cGUsIGNvbnRlbnRUeXBlLCBleHQpe1xuXHRcdHJlbGF0aW9uc2hpcFR5cGU9cmVsYXRpb25zaGlwVHlwZXx8XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2FGQ2h1bmtcIlxuXHRcdGNvbnRlbnRUeXBlPWNvbnRlbnRUeXBlfHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5taW1lXG5cdFx0ZXh0PWV4dHx8dGhpcy5kb2MuY29uc3RydWN0b3IuZXh0XG5cblx0XHRsZXQgaWQ9dGhpcy5fbmV4dHJJZCgpXG5cdFx0bGV0IHJJZD1gcklkJHtpZH1gXG5cdFx0bGV0IHRhcmdldE5hbWU9YGNodW5rL2NodW5rJHtpZH0uJHtleHR9YFxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxuXHRcdHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lLCBkYXRhKVxuXHRcdHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXT10aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSlcblxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgSWQ9XCIke3JJZH1cIiBUeXBlPVwiJHtyZWxhdGlvbnNoaXBUeXBlfVwiIFRhcmdldD1cIiR7dGFyZ2V0TmFtZX1cIi8+YClcblxuXHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlc1xuXHRcdFx0LmFwcGVuZChgPE92ZXJyaWRlIFBhcnROYW1lPVwiLyR7cGFydE5hbWV9XCIgQ29udGVudFR5cGU9XCIke2NvbnRlbnRUeXBlfVwiLz5gKVxuXG5cdFx0cmV0dXJuIHJJZFxuXHR9XG5cblx0Z2V0UmVsT2xlT2JqZWN0KHJpZCl7XG5cdFx0bGV0IHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD0ke3JpZH1dYClcblx0XHRsZXQgdHlwZT1yZWwuYXR0cihcIlR5cGVcIilcblx0XHRsZXQgdGFyZ2V0TmFtZT1yZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdGxldCBkYXRhPXRoaXMuZG9jLmdldERhdGFQYXJ0KGAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gKVxuXHRcdHN3aXRjaCh0eXBlLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0XHRjYXNlIFwib2xlT2JqZWN0XCI6XG5cdFx0XHRcdHJldHVybiBPTEUucGFyc2UoZGF0YSlcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBkYXRhXG5cdFx0fVxuXG5cdH1cblxuXHRyZW1vdmVSZWwoaWQpe1xuXHRcdGxldCByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpIT09XCJFeHRlcm5hbFwiKXtcblx0XHRcdGxldCBwYXJ0TmFtZT10aGlzLmZvbGRlcityZWwuYXR0cihcIlRhcmdldFwiKVxuXHRcdFx0dGhpcy5kb2MuY29udGVudFR5cGVzLmZpbmQoYFtQYXJ0TmFtZT0nLyR7cGFydE5hbWV9J11gKS5yZW1vdmUoKVxuXHRcdFx0dGhpcy5kb2MucmF3LnJlbW92ZShwYXJ0TmFtZSlcblx0XHRcdGRlbGV0ZSB0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV1cblx0XHR9XG5cdFx0cmVsLnJlbW92ZSgpXG5cdH1cblxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57dHlwZSxwcm9wcyxjaGlsZHJlbn0saWRlbnRpZnk9bm9kZT0+bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSwgZXh0cmEpe1xuXHRcdGxldCB7bmFtZTp0YWdOYW1lLCBjaGlsZHJlbixpZCwgcGFyZW50fT1ub2RlXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XG5cdFx0XHRpZihwYXJlbnQubmFtZT09XCJ3OnRcIil7XG5cdFx0XHRcdHJldHVybiBub2RlLmRhdGFcblx0XHRcdH1cblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXG5cdFx0bGV0IHR5cGU9dGFnTmFtZVxuXHRcdGxldCBwcm9wcz17fVxuXG5cdFx0aWYoaWRlbnRpZnkpe1xuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KG5vZGUsdGhpcylcblx0XHRcdGlmKCFtb2RlbClcblx0XHRcdFx0cmV0dXJuIG51bGxcblxuXHRcdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIil7XG5cdFx0XHRcdHR5cGU9bW9kZWxcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRsZXQgY29udGVudDtcblx0XHRcdFx0KHt0eXBlLCBjaGlsZHJlbjpjb250ZW50LCAuLi5wcm9wc309bW9kZWwpO1xuXHRcdFx0XHRpZihjb250ZW50IT09dW5kZWZpbmVkKVxuXHRcdFx0XHRcdGNoaWxkcmVuPWNvbnRlbnRcblx0XHRcdH1cblx0XHR9XG5cdFx0cHJvcHMua2V5PWlkXG5cdFx0cHJvcHMubm9kZT1ub2RlXG5cdFx0cHJvcHMudHlwZT10eXBlXG5cblx0XHRpZihleHRyYSlcblx0XHRcdE9iamVjdC5hc3NpZ24ocHJvcHMsZXh0cmEpXG5cblx0XHRsZXQgY2hpbGRFbGVtZW50cz1bXVxuXHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XG5cdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKVxuXHRcdFx0XHQuZmlsdGVyKGE9PiEhYSlcblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRWxlbWVudChcblx0XHRcdFx0dHlwZSxcblx0XHRcdFx0cHJvcHMsXG5cdFx0XHRcdGNoaWxkRWxlbWVudHNcblx0XHRcdClcblx0fVxufVxuIl19