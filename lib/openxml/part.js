"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ole = require("./ole");

var OLE = _interopRequireWildcard(_ole);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
		key: "_assignRel",
		value: function _assignRel() {
			var _this = this;

			var supported = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this.rels(rel);
				var type = $.attr("Type").split("/").pop();
				if (supported === true || supported.indexOf(type) != -1) {
					(function () {
						var target = $.attr("Target");
						Object.defineProperty(_this, type, {
							configurable: true,
							get: function get() {
								return this.getRelObject(target);
							}
						});
					})();
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
			var rel = this.rels("Relationship[Id=\"" + id + "\"],Relationship[Type$=\"" + id + "\"],Relationship[Target$=\"" + id + "\"]");
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
			if (!target) {
				return;
			}
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

			var _this2 = this;

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
						return a ? _this2.renderNode(a, createElement, identify) : null;
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

var RelsPart = function (_Part) {
	_inherits(RelsPart, _Part);

	function RelsPart() {
		_classCallCheck(this, RelsPart);

		return _possibleConstructorReturn(this, (RelsPart.__proto__ || Object.getPrototypeOf(RelsPart)).apply(this, arguments));
	}

	_createClass(RelsPart, [{
		key: "_init",
		value: function _init() {
			_get(RelsPart.prototype.__proto__ || Object.getPrototypeOf(RelsPart.prototype), "_init", this).call(this);
		}
	}]);

	return RelsPart;
}(Part);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsImNvbmZpZ3VyYWJsZSIsInN1cHBvcnRlZCIsInJlbHMiLCJlYWNoIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiZ2V0UmVsT2JqZWN0IiwicGF0aCIsInN0YXJ0c1dpdGgiLCJzdWJzdHIiLCJpZCIsIm5vcm1hbGl6ZVBhdGgiLCJ1cmwiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJySWQiLCJfbmV4dHJJZCIsImFwcGVuZCIsInBhcnROYW1lIiwicmF3IiwiZmlsZSIsImV4dCIsIm1pbWUiLCJ0YXJnZXROYW1lIiwidCIsIlRhcmdldCIsIm1hdGNoIiwiRGVmYXVsdFR5cGVzIiwiZXh0VHlwZSIsImZpbmQiLCJsZW5ndGgiLCJwcmVwZW5kIiwicmVsYXRpb25zaGlwVHlwZSIsImNvbnRlbnRUeXBlIiwiY29uc3RydWN0b3IiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwicmVtb3ZlIiwibm9kZSIsImNyZWF0ZUVsZW1lbnQiLCJwcm9wcyIsImNoaWxkcmVuIiwiaWRlbnRpZnkiLCJleHRyYSIsInRhZ05hbWUiLCJwYXJlbnQiLCJtb2RlbCIsImNvbnRlbnQiLCJ1bmRlZmluZWQiLCJrZXkiLCJhc3NpZ24iLCJjaGlsZEVsZW1lbnRzIiwiQXJyYXkiLCJpc0Fy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Ozs7b0JBRUNiLEksRUFBSztBQUNOLFVBQU8sS0FBS3RFLEdBQUwsQ0FBU2lCLENBQVQsQ0FBV3FELElBQVgsQ0FBUDtBQUNBOzs7Ozs7a0JBMU9tQnhFLEk7O0lBNk9mMEYsUTs7Ozs7Ozs7Ozs7MEJBQ0U7QUFDTjtBQUVBOzs7O0VBSnFCMUYsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgT0xFIGZyb20gXCIuL29sZVwiXG5cbi8qKlxuICogbmFtZTogQUJTT0xVVEUgcGF0aCBvZiBhIHBhcnQsIHdvcmQueG1sLCBwcHQvc2xpZGVzL3NsaWRlMS54bWxcbiAqIGZvbGRlcjphYnNvbHV0ZSBmb2xkZXIsIGVuZHMgd2l0aCBcIi9cIiBvciB0b3RhbGx5IGVtcHR5IFwiXCJcbiAqIHJlbE5hbWU6YWJzb2x1dGUgcGF0aCBvZiBhIHJlbGF0aW9uc2hpcCBwYXJ0XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnR7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXG5cdFx0bGV0IGZvbGRlcj1cIlwiXG5cdFx0bGV0IHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxuXHRcdGxldCBpPW5hbWUubGFzdEluZGV4T2YoJy8nKVxuXG5cdFx0aWYoaSE9PS0xKXtcblx0XHRcdGZvbGRlcj1uYW1lLnN1YnN0cmluZygwLGkrMSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoZG9jLnBhcnRzW3JlbE5hbWVdKXtcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxuXHRcdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLFwicmVsc1wiLHtcblx0XHRcdFx0Z2V0KCl7XG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5yZWxOYW1lKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH1cblx0XHR0aGlzLl9pbml0KClcblx0fVxuXG5cdF9pbml0KCl7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJjb250ZW50XCIse1xuXHRcdFx0Y29uZmlndXJhYmxlOnRydWUsXG5cdFx0XHRnZXQoKXtcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5uYW1lKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRfYXNzaWduUmVsKHN1cHBvcnRlZD10cnVlKXtcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXG5cdFx0XHRpZihzdXBwb3J0ZWQ9PT10cnVlIHx8IHN1cHBvcnRlZC5pbmRleE9mKHR5cGUpIT0tMSl7XG5cdFx0XHRcdGxldCB0YXJnZXQ9JC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLHR5cGUse1xuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6dHJ1ZSxcblx0XHRcdFx0XHRnZXQoKXtcblx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH0pXG4gICAgfVxuXG5cdG5vcm1hbGl6ZVBhdGgocGF0aD1cIlwiKXtcblx0XHRpZihwYXRoLnN0YXJ0c1dpdGgoXCIvXCIpKVxuXHRcdFx0cmV0dXJuIHBhdGguc3Vic3RyKDEpXG5cdFx0cmV0dXJuIHRoaXMuZm9sZGVyK3BhdGhcblx0fVxuXG5cdGdldFJlbFBhcnQoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXSxSZWxhdGlvbnNoaXBbVHlwZSQ9XCIke2lkfVwiXSxSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0cmV0dXJuIG5ldyBQYXJ0KHRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpLHRoaXMuZG9jKVxuXHR9XG5cblx0Z2V0UmVsVGFyZ2V0KHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpXG5cdH1cblxuXHRnZXRSZWxPYmplY3QodGFyZ2V0KXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0KSlcblx0fVxuXG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHR2YXIgdGFyZ2V0PXJlbC5hdHRyKFwiVGFyZ2V0XCIpXG5cdFx0aWYoIXRhcmdldCl7XG5cdFx0XHRyZXR1cm4gXG5cdFx0fVxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXG5cdFx0XHRyZXR1cm4ge3VybDp0YXJnZXR9XG5cblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0bGV0IHVybD10aGlzLmRvYy5nZXREYXRhUGFydEFzVXJsKHRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpLCBcImltYWdlLypcIilcblx0XHRcdGxldCBjcmMzMj10aGlzLmRvYy5nZXRQYXJ0Q3JjMzIodGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldCkpXG5cdFx0XHRyZXR1cm4ge3VybCxjcmMzMn1cblx0XHRkZWZhdWx0OlxuXHRcdFx0aWYodGFyZ2V0LmVuZHNXaXRoKFwiLnhtbFwiKSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQodGhpcy5ub3JtYWxpemVQYXRoKHRhcmdldCkpXG5cdFx0fVxuXHR9XG5cblx0X25leHRySWQoKXtcblx0XHRyZXR1cm4gTWF0aC5tYXgoLi4udGhpcy5yZWxzKCdSZWxhdGlvbnNoaXAnKS50b0FycmF5KCkubWFwKGE9PnBhcnNlSW50KGEuYXR0cmlicy5JZC5zdWJzdHJpbmcoMykpKSkrMVxuXHR9XG5cblx0YWRkKHR5cGUsdGFyZ2V0LGRhdGEpe1xuXHRcdGNvbnN0IHJJZD1gcklkJHt0aGlzLl9uZXh0cklkKCl9YFxuXHRcdHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIilcblx0XHRcdC5hcHBlbmQoYDxSZWxhdGlvbnNoaXAgSWQ9XCIke3JJZH1cIiB0eXBlPVwiJHt0eXBlfVwiIHRhcmdldD1cIiR7dGFyZ2V0fVwiLz5gKVxuXHRcdGNvbnN0IHBhcnROYW1lPXRoaXMubm9ybWFsaXplUGF0aCh0YXJnZXQpXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXG5cdFx0dGhpcy5kb2MucGFydHNbcGFydE5hbWVdPXRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKVxuXHRcdHJldHVybiBySWRcblx0fVxuXG5cdGFkZEltYWdlKGRhdGEsIHtleHQsbWltZX09e2V4dDpcImpwZ1wiLG1pbWU6XCJpbWFnZS9qcGdcIn0pe1xuXHRcdGNvbnN0IHR5cGU9XCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCJcblx0XHRsZXQgaWQ9YHJJZCR7dGhpcy5fbmV4dHJJZCgpfWBcblxuXHRcdGxldCB0YXJnZXROYW1lPVwibWVkaWEvaW1hZ2VcIisoTWF0aC5tYXgoMCwuLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQodC5hdHRyaWJzLlRhcmdldC5tYXRjaCgvXFxkK1xcLi8pfHxbMF0pXG5cdFx0fSkpKzEpK1wiLlwiK2V4dDtcblxuXHRcdGxldCBwYXJ0TmFtZT10aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0TmFtZSlcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldD1cIiR7dGFyZ2V0TmFtZX1cIi8+YClcblxuXHRcdGNvbnN0IERlZmF1bHRUeXBlcz10aGlzLmRvYy5nZXRPYmplY3RQYXJ0KFwiW0NvbnRlbnRfVHlwZXNdLnhtbFwiKShgVHlwZXNgKVxuXHRcdGNvbnN0IGV4dFR5cGU9RGVmYXVsdFR5cGVzLmZpbmQoYD5EZWZhdWx0W0V4dGVuc2lvbj0nJHtleHR9J11gKVxuXHRcdGlmKGV4dFR5cGUubGVuZ3RoPT0wKXtcblx0XHRcdERlZmF1bHRUeXBlcy5wcmVwZW5kKGA8RGVmYXVsdCBFeHRlbnNpb249XCIke2V4dH1cIiBDb250ZW50VHlwZT1cIiR7bWltZX1cIi8+YClcblx0XHR9XG5cdFx0cmV0dXJuIGlkXG5cdH1cblxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxuXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxuXG5cdFx0cmV0dXJuIGlkXG5cdH1cblxuXHRhZGRDaHVuayhkYXRhLCByZWxhdGlvbnNoaXBUeXBlLCBjb250ZW50VHlwZSwgZXh0KXtcblx0XHRyZWxhdGlvbnNoaXBUeXBlPXJlbGF0aW9uc2hpcFR5cGV8fFwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9hRkNodW5rXCJcblx0XHRjb250ZW50VHlwZT1jb250ZW50VHlwZXx8dGhpcy5kb2MuY29uc3RydWN0b3IubWltZVxuXHRcdGV4dD1leHR8fHRoaXMuZG9jLmNvbnN0cnVjdG9yLmV4dFxuXG5cdFx0bGV0IGlkPXRoaXMuX25leHRySWQoKVxuXHRcdGxldCBySWQ9YHJJZCR7aWR9YFxuXHRcdGxldCB0YXJnZXROYW1lPWBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWBcblxuXHRcdGxldCBwYXJ0TmFtZT10aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0TmFtZSlcblx0XHR0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSlcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXG5cblx0XHR0aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBzXCIpXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgVHlwZT1cIiR7cmVsYXRpb25zaGlwVHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXG5cblx0XHR0aGlzLmRvYy5jb250ZW50VHlwZXNcblx0XHRcdC5hcHBlbmQoYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YClcblxuXHRcdHJldHVybiBySWRcblx0fVxuXG5cdGdldFJlbE9sZU9iamVjdChyaWQpe1xuXHRcdGxldCByZWw9dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9JHtyaWR9XWApXG5cdFx0bGV0IHR5cGU9cmVsLmF0dHIoXCJUeXBlXCIpXG5cdFx0bGV0IHRhcmdldE5hbWU9cmVsLmF0dHIoXCJUYXJnZXRcIilcblx0XHRsZXQgZGF0YT10aGlzLmRvYy5nZXREYXRhUGFydCh0aGlzLm5vcm1hbGl6ZVBhdGgodGFyZ2V0TmFtZSkpXG5cdFx0c3dpdGNoKHR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpKXtcblx0XHRcdGNhc2UgXCJvbGVPYmplY3RcIjpcblx0XHRcdFx0cmV0dXJuIE9MRS5wYXJzZShkYXRhKVxuXHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0cmV0dXJuIGRhdGFcblx0XHR9XG5cblx0fVxuXG5cdHJlbW92ZVJlbChpZCl7XG5cdFx0bGV0IHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcblx0XHRpZihyZWwuYXR0cihcIlRhcmdldE1vZGVcIikhPT1cIkV4dGVybmFsXCIpe1xuXHRcdFx0bGV0IHBhcnROYW1lPXRoaXMubm9ybWFsaXplUGF0aChyZWwuYXR0cihcIlRhcmdldFwiKSlcblx0XHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKClcblx0XHRcdHRoaXMuZG9jLnJhdy5yZW1vdmUocGFydE5hbWUpXG5cdFx0XHRkZWxldGUgdGhpcy5kb2MucGFydHNbcGFydE5hbWVdXG5cdFx0fVxuXHRcdHJlbC5yZW1vdmUoKVxuXHR9XG5cblx0cmVuZGVyTm9kZShub2RlLCBjcmVhdGVFbGVtZW50PSh0eXBlLHByb3BzLGNoaWxkcmVuKT0+e3R5cGUscHJvcHMsY2hpbGRyZW59LGlkZW50aWZ5PW5vZGU9Pm5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKCksIGV4dHJhKXtcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xuXHRcdFx0cmV0dXJuIG5vZGUuZGF0YVxuXHRcdH1cblxuXHRcdGxldCB0eXBlPXRhZ05hbWVcblx0XHRsZXQgcHJvcHM9e31cblxuXHRcdGlmKGlkZW50aWZ5KXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXG5cdFx0XHRpZighbW9kZWwpXG5cdFx0XHRcdHJldHVybiBudWxsXG5cblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xuXHRcdFx0XHR0eXBlPW1vZGVsXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHByb3BzLmtleT1pZFxuXHRcdHByb3BzLm5vZGU9bm9kZVxuXHRcdHByb3BzLnR5cGU9dHlwZVxuXG5cdFx0aWYoZXh0cmEpXG5cdFx0XHRPYmplY3QuYXNzaWduKHByb3BzLGV4dHJhKVxuXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9Y2hpbGRyZW5cblx0XHRpZihBcnJheS5pc0FycmF5KGNoaWxkcmVuKSl7XG5cdFx0XHRpZihjaGlsZHJlbi5sZW5ndGgpe1xuXHRcdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKS5maWx0ZXIoYT0+ISFhKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHRwcm9wcyxcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xuXHRcdFx0KVxuXHR9XG5cblx0JChub2RlKXtcblx0XHRyZXR1cm4gdGhpcy5kb2MuJChub2RlKVxuXHR9XG59XG5cbmNsYXNzIFJlbHNQYXJ0IGV4dGVuZHMgUGFydHtcblx0X2luaXQoKXtcblx0XHRzdXBlci5faW5pdCgpXG5cblx0fVxufVxuIl19