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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsInR5cGUiLCJyZWxzIiwiYXR0ciIsInRhcmdldCIsImlkIiwicmVsIiwidXJsIiwic3BsaXQiLCJwb3AiLCJnZXREYXRhUGFydEFzVXJsIiwiY3JjMzIiLCJnZXRQYXJ0Q3JjMzIiLCJlbmRzV2l0aCIsImdldFJlbE9iamVjdCIsImdldFBhcnQiLCJNYXRoIiwibWF4IiwidG9BcnJheSIsIm1hcCIsInBhcnNlSW50IiwiYSIsImF0dHJpYnMiLCJJZCIsImRhdGEiLCJfbmV4dHJJZCIsInRhcmdldE5hbWUiLCJ0IiwibWF0Y2giLCJwYXJ0TmFtZSIsInJhdyIsImZpbGUiLCJhcHBlbmQiLCJyZWxhdGlvbnNoaXBUeXBlIiwiY29udGVudFR5cGUiLCJleHQiLCJjb25zdHJ1Y3RvciIsIm1pbWUiLCJySWQiLCJjb250ZW50VHlwZXMiLCJyaWQiLCJnZXREYXRhUGFydCIsInBhcnNlIiwiZmluZCIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwidGFnTmFtZSIsInBhcmVudCIsIm1vZGVsIiwiY29udGVudCIsInVuZGVmaW5lZCIsImtleSIsImNoaWxkRWxlbWVudHMiLCJsZW5ndGgiLCJyZW5kZXJOb2RlIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztJQUFZQSxHOzs7Ozs7Ozs7O0lBRVNDLEk7QUFDcEIsZUFBWUMsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUOztBQUVBLE1BQUlDLFNBQU8sRUFBWDtBQUNBLE1BQUlDLFVBQVEsV0FBU0gsSUFBVCxHQUFjLE9BQTFCO0FBQ0EsTUFBSUksSUFBRUosS0FBS0ssV0FBTCxDQUFpQixHQUFqQixDQUFOOztBQUVBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0YsS0FBS00sU0FBTCxDQUFlLENBQWYsRUFBaUJGLElBQUUsQ0FBbkIsQ0FBUDtBQUNBRCxhQUFRRCxTQUFPLFFBQVAsR0FBZ0JGLEtBQUtNLFNBQUwsQ0FBZUYsSUFBRSxDQUFqQixDQUFoQixHQUFvQyxPQUE1QztBQUNBOztBQUVELE1BQUdILElBQUlNLEtBQUosQ0FBVUosT0FBVixDQUFILEVBQXNCO0FBQ3JCLFFBQUtELE1BQUwsR0FBWUEsTUFBWjtBQUNBLFFBQUtDLE9BQUwsR0FBYUEsT0FBYjtBQUNBSyxVQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTJCLE1BQTNCLEVBQWtDO0FBQ2pDQyxPQURpQyxpQkFDNUI7QUFDSixZQUFPLEtBQUtULEdBQUwsQ0FBU1UsYUFBVCxDQUF1QixLQUFLUixPQUE1QixDQUFQO0FBQ0E7QUFIZ0MsSUFBbEM7QUFLQTtBQUNELE9BQUtTLEtBQUw7QUFDQTs7OzswQkFFTTtBQUNOSixVQUFPQyxjQUFQLENBQXNCLElBQXRCLEVBQTJCLFNBQTNCLEVBQXFDO0FBQ3BDQyxPQURvQyxpQkFDL0I7QUFDSixZQUFPLEtBQUtULEdBQUwsQ0FBU1UsYUFBVCxDQUF1QixLQUFLWCxJQUE1QixDQUFQO0FBQ0E7QUFIbUMsSUFBckM7QUFLQTs7OytCQUVZYSxJLEVBQUs7QUFDakIsVUFBTyxLQUFLQyxJQUFMLGVBQXFCRCxJQUFyQixVQUErQkUsSUFBL0IsQ0FBb0MsUUFBcEMsQ0FBUDtBQUNBOzs7K0JBRVlDLE0sRUFBTztBQUNuQixVQUFPLEtBQUtmLEdBQUwsQ0FBU1UsYUFBVCxDQUF1QixLQUFLVCxNQUFMLEdBQVljLE1BQW5DLENBQVA7QUFDQTs7O3lCQUVNQyxFLEVBQUc7QUFDVCxPQUFJQyxNQUFJLEtBQUtKLElBQUwsd0JBQThCRyxFQUE5QixTQUFSO0FBQ0EsT0FBSUQsU0FBT0UsSUFBSUgsSUFBSixDQUFTLFFBQVQsQ0FBWDtBQUNBLE9BQUdHLElBQUlILElBQUosQ0FBUyxZQUFULE1BQXlCLFVBQTVCLEVBQ0MsT0FBTyxFQUFDSSxLQUFJSCxNQUFMLEVBQVA7O0FBRUQsV0FBT0UsSUFBSUgsSUFBSixDQUFTLE1BQVQsRUFBaUJLLEtBQWpCLENBQXVCLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFQO0FBQ0EsU0FBSyxPQUFMO0FBQ0MsU0FBSUYsTUFBSSxLQUFLbEIsR0FBTCxDQUFTcUIsZ0JBQVQsQ0FBMEIsS0FBS3BCLE1BQUwsR0FBWWMsTUFBdEMsRUFBOEMsU0FBOUMsQ0FBUjtBQUNBLFNBQUlPLFFBQU0sS0FBS3RCLEdBQUwsQ0FBU3VCLFlBQVQsQ0FBc0IsS0FBS3RCLE1BQUwsR0FBWWMsTUFBbEMsQ0FBVjtBQUNBLFlBQU8sRUFBQ0csUUFBRCxFQUFLSSxZQUFMLEVBQVA7QUFDRDtBQUNDLFNBQUdQLE9BQU9TLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBSCxFQUNDLE9BQU8sS0FBS0MsWUFBTCxDQUFrQlYsTUFBbEIsQ0FBUCxDQURELEtBR0MsT0FBTyxLQUFLZixHQUFMLENBQVMwQixPQUFULENBQWlCLEtBQUt6QixNQUFMLEdBQVljLE1BQTdCLENBQVA7QUFURjtBQVdBOzs7NkJBRVM7QUFDVCxVQUFPWSxLQUFLQyxHQUFMLGdDQUFZLEtBQUtmLElBQUwsQ0FBVSxjQUFWLEVBQTBCZ0IsT0FBMUIsR0FBb0NDLEdBQXBDLENBQXdDO0FBQUEsV0FBR0MsU0FBU0MsRUFBRUMsT0FBRixDQUFVQyxFQUFWLENBQWE3QixTQUFiLENBQXVCLENBQXZCLENBQVQsQ0FBSDtBQUFBLElBQXhDLENBQVosS0FBNkYsQ0FBcEc7QUFDQTs7OzJCQUVROEIsSSxFQUFLO0FBQ2IsT0FBTXZCLE9BQUssMkVBQVg7QUFDQSxPQUFJSSxhQUFTLEtBQUtvQixRQUFMLEVBQWI7O0FBRUEsT0FBSUMsYUFBVyxpQkFBZVYsS0FBS0MsR0FBTCxnQ0FBWSxLQUFLZixJQUFMLENBQVUsNkJBQVYsRUFBeUNnQixPQUF6QyxHQUFtREMsR0FBbkQsQ0FBdUQsYUFBRztBQUNuRyxXQUFPQyxTQUFTTyxFQUFFTCxPQUFGLENBQVVsQixNQUFWLENBQWlCd0IsS0FBakIsQ0FBdUIsS0FBdkIsRUFBOEIsQ0FBOUIsS0FBa0MsR0FBM0MsQ0FBUDtBQUNBLElBRnlDLENBQVosS0FFMUIsQ0FGVyxJQUVSLE1BRlA7O0FBSUEsT0FBSUMsZ0JBQVksS0FBS3ZDLE1BQWpCLEdBQTBCb0MsVUFBOUI7QUFDQSxRQUFLckMsR0FBTCxDQUFTeUMsR0FBVCxDQUFhQyxJQUFiLENBQWtCRixRQUFsQixFQUE0QkwsSUFBNUI7QUFDQSxRQUFLbkMsR0FBTCxDQUFTTSxLQUFULENBQWVrQyxRQUFmLElBQXlCLEtBQUt4QyxHQUFMLENBQVN5QyxHQUFULENBQWFDLElBQWIsQ0FBa0JGLFFBQWxCLENBQXpCOztBQUVBLFFBQUszQixJQUFMLENBQVUsZUFBVixFQUNFOEIsTUFERix5QkFDOEIzQixFQUQ5QixrQkFDMkNKLElBRDNDLG9CQUM0RDRCLFFBRDVEOztBQUdBLFVBQU94QixFQUFQO0FBQ0E7OzttQ0FFZ0JFLEcsRUFBSTtBQUNwQixPQUFNTixPQUFLLDJFQUFYOztBQUVBLE9BQUlJLGFBQVMsS0FBS29CLFFBQUwsRUFBYjs7QUFFQSxRQUFLdkIsSUFBTCxDQUFVLGVBQVYsRUFDRThCLE1BREYseUJBQzhCM0IsRUFEOUIsa0JBQzJDSixJQUQzQyw0Q0FDa0ZNLEdBRGxGOztBQUdBLFVBQU9GLEVBQVA7QUFDQTs7OzJCQUVRbUIsSSxFQUFNUyxnQixFQUFrQkMsVyxFQUFhQyxHLEVBQUk7QUFDakRGLHNCQUFpQkEsb0JBQWtCLDZFQUFuQztBQUNBQyxpQkFBWUEsZUFBYSxLQUFLN0MsR0FBTCxDQUFTK0MsV0FBVCxDQUFxQkMsSUFBOUM7QUFDQUYsU0FBSUEsT0FBSyxLQUFLOUMsR0FBTCxDQUFTK0MsV0FBVCxDQUFxQkQsR0FBOUI7O0FBRUEsT0FBSTlCLEtBQUcsS0FBS29CLFFBQUwsRUFBUDtBQUNBLE9BQUlhLGNBQVVqQyxFQUFkO0FBQ0EsT0FBSXFCLDZCQUF5QnJCLEVBQXpCLFNBQStCOEIsR0FBbkM7QUFDQSxPQUFJTixnQkFBWSxLQUFLdkMsTUFBakIsR0FBMEJvQyxVQUE5QjtBQUNBLFFBQUtyQyxHQUFMLENBQVN5QyxHQUFULENBQWFDLElBQWIsQ0FBa0JGLFFBQWxCLEVBQTRCTCxJQUE1QjtBQUNBLFFBQUtuQyxHQUFMLENBQVNNLEtBQVQsQ0FBZWtDLFFBQWYsSUFBeUIsS0FBS3hDLEdBQUwsQ0FBU3lDLEdBQVQsQ0FBYUMsSUFBYixDQUFrQkYsUUFBbEIsQ0FBekI7O0FBRUEsUUFBSzNCLElBQUwsQ0FBVSxlQUFWLEVBQ0U4QixNQURGLHlCQUM4Qk0sR0FEOUIsa0JBQzRDTCxnQkFENUMsb0JBQ3lFUCxVQUR6RTs7QUFHQSxRQUFLckMsR0FBTCxDQUFTa0QsWUFBVCxDQUNFUCxNQURGLDRCQUNpQ0gsUUFEakMseUJBQzJESyxXQUQzRDs7QUFHQSxVQUFPSSxHQUFQO0FBQ0E7OztrQ0FFZUUsRyxFQUFJO0FBQ25CLE9BQUlsQyxNQUFJLEtBQUtKLElBQUwsc0JBQTZCc0MsR0FBN0IsT0FBUjtBQUNBLE9BQUl2QyxPQUFLSyxJQUFJSCxJQUFKLENBQVMsTUFBVCxDQUFUO0FBQ0EsT0FBSXVCLGFBQVdwQixJQUFJSCxJQUFKLENBQVMsUUFBVCxDQUFmO0FBQ0EsT0FBSXFCLE9BQUssS0FBS25DLEdBQUwsQ0FBU29ELFdBQVQsTUFBd0IsS0FBS25ELE1BQTdCLEdBQXNDb0MsVUFBdEMsQ0FBVDtBQUNBLFdBQU96QixLQUFLTyxLQUFMLENBQVcsR0FBWCxFQUFnQkMsR0FBaEIsRUFBUDtBQUNDLFNBQUssV0FBTDtBQUNDLFlBQU92QixJQUFJd0QsS0FBSixDQUFVbEIsSUFBVixDQUFQO0FBQ0Q7QUFDQyxZQUFPQSxJQUFQO0FBSkY7QUFPQTs7OzRCQUVTbkIsRSxFQUFHO0FBQ1osT0FBSUMsTUFBSSxLQUFLSixJQUFMLHdCQUE4QkcsRUFBOUIsU0FBUjtBQUNBLE9BQUdDLElBQUlILElBQUosQ0FBUyxZQUFULE1BQXlCLFVBQTVCLEVBQXVDO0FBQ3RDLFFBQUkwQixXQUFTLEtBQUt2QyxNQUFMLEdBQVlnQixJQUFJSCxJQUFKLENBQVMsUUFBVCxDQUF6QjtBQUNBLFNBQUtkLEdBQUwsQ0FBU2tELFlBQVQsQ0FBc0JJLElBQXRCLGtCQUEwQ2QsUUFBMUMsU0FBd0RlLE1BQXhEO0FBQ0EsU0FBS3ZELEdBQUwsQ0FBU3lDLEdBQVQsQ0FBYWMsTUFBYixDQUFvQmYsUUFBcEI7QUFDQSxXQUFPLEtBQUt4QyxHQUFMLENBQVNNLEtBQVQsQ0FBZWtDLFFBQWYsQ0FBUDtBQUNBO0FBQ0R2QixPQUFJc0MsTUFBSjtBQUNBOzs7NkJBRVVDLEksRUFBMkc7QUFBQTs7QUFBQSxPQUFyR0MsYUFBcUcsdUVBQXZGLFVBQUM3QyxJQUFELEVBQU04QyxLQUFOLEVBQVlDLFFBQVosRUFBdUI7QUFBQy9DLFVBQUs4QyxLQUFMLEVBQVdDLFFBQVg7QUFBb0IsSUFBMkM7QUFBQSxPQUExQ0MsUUFBMEMsdUVBQWpDO0FBQUEsV0FBTUosS0FBS3pELElBQUwsQ0FBVW9CLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJDLEdBQXJCLEVBQU47QUFBQSxJQUFpQztBQUFBLE9BQzNHeUMsT0FEMkcsR0FDN0VMLElBRDZFLENBQ2hIekQsSUFEZ0g7QUFBQSxPQUNsRzRELFFBRGtHLEdBQzdFSCxJQUQ2RSxDQUNsR0csUUFEa0c7QUFBQSxPQUN6RjNDLEVBRHlGLEdBQzdFd0MsSUFENkUsQ0FDekZ4QyxFQUR5RjtBQUFBLE9BQ3JGOEMsTUFEcUYsR0FDN0VOLElBRDZFLENBQ3JGTSxNQURxRjs7QUFFckgsT0FBR04sS0FBSzVDLElBQUwsSUFBVyxNQUFkLEVBQXFCO0FBQ3BCLFFBQUdrRCxPQUFPL0QsSUFBUCxJQUFhLEtBQWhCLEVBQXNCO0FBQ3JCLFlBQU95RCxLQUFLckIsSUFBWjtBQUNBO0FBQ0QsV0FBTyxJQUFQO0FBQ0E7O0FBRUQsT0FBSXZCLE9BQUtpRCxPQUFUO0FBQ0EsT0FBSUgsUUFBTSxFQUFWOztBQUVBLE9BQUdFLFFBQUgsRUFBWTtBQUNYLFFBQUlHLFFBQU1ILFNBQVNKLElBQVQsRUFBYyxJQUFkLENBQVY7QUFDQSxRQUFHLENBQUNPLEtBQUosRUFDQyxPQUFPLElBQVA7O0FBRUQsUUFBRyxPQUFPQSxLQUFQLElBQWUsUUFBbEIsRUFBMkI7QUFDMUJuRCxZQUFLbUQsS0FBTDtBQUNBLEtBRkQsTUFFSztBQUNKLFNBQUlDLGdCQUFKO0FBREksa0JBRWdDRCxLQUZoQztBQUVGbkQsU0FGRSxVQUVGQSxJQUZFO0FBRWFvRCxZQUZiLFVBRUlMLFFBRko7QUFFeUJELFVBRnpCOztBQUdKLFNBQUdNLFlBQVVDLFNBQWIsRUFDQ04sV0FBU0ssT0FBVDtBQUNEO0FBQ0Q7QUFDRE4sU0FBTVEsR0FBTixHQUFVbEQsRUFBVjtBQUNBMEMsU0FBTUYsSUFBTixHQUFXQSxJQUFYO0FBQ0FFLFNBQU05QyxJQUFOLEdBQVdBLElBQVg7O0FBRUEsT0FBSXVELGdCQUFjLEVBQWxCO0FBQ0EsT0FBR1IsWUFBWUEsU0FBU1MsTUFBeEIsRUFBK0I7QUFDOUJELG9CQUFjUixTQUFTN0IsR0FBVCxDQUFhO0FBQUEsWUFBR0UsSUFBSSxNQUFLcUMsVUFBTCxDQUFnQnJDLENBQWhCLEVBQWtCeUIsYUFBbEIsRUFBZ0NHLFFBQWhDLENBQUosR0FBZ0QsSUFBbkQ7QUFBQSxLQUFiLEVBQ1pVLE1BRFksQ0FDTDtBQUFBLFlBQUcsQ0FBQyxDQUFDdEMsQ0FBTDtBQUFBLEtBREssQ0FBZDtBQUVBOztBQUVELFVBQU95QixjQUNMN0MsSUFESyxFQUVMOEMsS0FGSyxFQUdMUyxhQUhLLENBQVA7QUFLQTs7Ozs7O2tCQXJMbUJyRSxJIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBPTEUgZnJvbSBcIi4vb2xlXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnR7XHJcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xyXG5cdFx0dGhpcy5uYW1lPW5hbWVcclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cclxuXHRcdGxldCBmb2xkZXI9XCJcIlxyXG5cdFx0bGV0IHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIlxyXG5cdFx0bGV0IGk9bmFtZS5sYXN0SW5kZXhPZignLycpXHJcblxyXG5cdFx0aWYoaSE9PS0xKXtcclxuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSsxKVxyXG5cdFx0XHRyZWxOYW1lPWZvbGRlcitcIl9yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKGRvYy5wYXJ0c1tyZWxOYW1lXSl7XHJcblx0XHRcdHRoaXMuZm9sZGVyPWZvbGRlclxyXG5cdFx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxyXG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyxcInJlbHNcIix7XHJcblx0XHRcdFx0Z2V0KCl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLnJlbE5hbWUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5faW5pdCgpXHJcblx0fVxyXG5cclxuXHRfaW5pdCgpe1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsXCJjb250ZW50XCIse1xyXG5cdFx0XHRnZXQoKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLm5hbWUpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRnZXRSZWxUYXJnZXQodHlwZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZWxzKGBbVHlwZSQ9XCIke3R5cGV9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxyXG5cdH1cclxuXHJcblx0Z2V0UmVsT2JqZWN0KHRhcmdldCl7XHJcblx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0fVxyXG5cclxuXHRnZXRSZWwoaWQpe1xyXG5cdFx0dmFyIHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYClcclxuXHRcdHZhciB0YXJnZXQ9cmVsLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGlmKHJlbC5hdHRyKFwiVGFyZ2V0TW9kZVwiKT09PSdFeHRlcm5hbCcpXHJcblx0XHRcdHJldHVybiB7dXJsOnRhcmdldH1cclxuXHJcblx0XHRzd2l0Y2gocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSl7XHJcblx0XHRjYXNlICdpbWFnZSc6XHJcblx0XHRcdGxldCB1cmw9dGhpcy5kb2MuZ2V0RGF0YVBhcnRBc1VybCh0aGlzLmZvbGRlcit0YXJnZXQsIFwiaW1hZ2UvKlwiKVxyXG5cdFx0XHRsZXQgY3JjMzI9dGhpcy5kb2MuZ2V0UGFydENyYzMyKHRoaXMuZm9sZGVyK3RhcmdldClcclxuXHRcdFx0cmV0dXJuIHt1cmwsY3JjMzJ9XHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRpZih0YXJnZXQuZW5kc1dpdGgoXCIueG1sXCIpKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdCh0YXJnZXQpXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydCh0aGlzLmZvbGRlcit0YXJnZXQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRfbmV4dHJJZCgpe1xyXG5cdFx0cmV0dXJuIE1hdGgubWF4KC4uLnRoaXMucmVscygnUmVsYXRpb25zaGlwJykudG9BcnJheSgpLm1hcChhPT5wYXJzZUludChhLmF0dHJpYnMuSWQuc3Vic3RyaW5nKDMpKSkpKzFcclxuXHR9XHJcblxyXG5cdGFkZEltYWdlKGRhdGEpe1xyXG5cdFx0Y29uc3QgdHlwZT1cImh0dHA6Ly9zY2hlbWFzLm9wZW54bWxmb3JtYXRzLm9yZy9vZmZpY2VEb2N1bWVudC8yMDA2L3JlbGF0aW9uc2hpcHMvaW1hZ2VcIlxyXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXHJcblxyXG5cdFx0bGV0IHRhcmdldE5hbWU9XCJtZWRpYS9pbWFnZVwiKyhNYXRoLm1heCguLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIikudG9BcnJheSgpLm1hcCh0PT57XHJcblx0XHRcdHJldHVybiBwYXJzZUludCh0LmF0dHJpYnMudGFyZ2V0Lm1hdGNoKC9cXGQrLylbMF18fFwiMFwiKVxyXG5cdFx0fSkpKzEpK1wiLmpwZ1wiO1xyXG5cclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldD1cIiR7cGFydE5hbWV9XCIvPmApXHJcblxyXG5cdFx0cmV0dXJuIGlkXHJcblx0fVxyXG5cclxuXHRhZGRFeHRlcm5hbEltYWdlKHVybCl7XHJcblx0XHRjb25zdCB0eXBlPVwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9pbWFnZVwiXHJcblxyXG5cdFx0bGV0IGlkPWBySWQke3RoaXMuX25leHRySWQoKX1gXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtpZH1cIiBUeXBlPVwiJHt0eXBlfVwiIFRhcmdldE1vZGU9XCJFeHRlcm5hbFwiIFRhcmdldD1cIiR7dXJsfVwiLz5gKVxyXG5cclxuXHRcdHJldHVybiBpZFxyXG5cdH1cclxuXHJcblx0YWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCl7XHJcblx0XHRyZWxhdGlvbnNoaXBUeXBlPXJlbGF0aW9uc2hpcFR5cGV8fFwiaHR0cDovL3NjaGVtYXMub3BlbnhtbGZvcm1hdHMub3JnL29mZmljZURvY3VtZW50LzIwMDYvcmVsYXRpb25zaGlwcy9hRkNodW5rXCJcclxuXHRcdGNvbnRlbnRUeXBlPWNvbnRlbnRUeXBlfHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5taW1lXHJcblx0XHRleHQ9ZXh0fHx0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHRcclxuXHJcblx0XHRsZXQgaWQ9dGhpcy5fbmV4dHJJZCgpXHJcblx0XHRsZXQgcklkPWBySWQke2lkfWBcclxuXHRcdGxldCB0YXJnZXROYW1lPWBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWBcclxuXHRcdGxldCBwYXJ0TmFtZT1gJHt0aGlzLmZvbGRlcn0ke3RhcmdldE5hbWV9YFxyXG5cdFx0dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpXHJcblx0XHR0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV09dGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpXHJcblxyXG5cdFx0dGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKVxyXG5cdFx0XHQuYXBwZW5kKGA8UmVsYXRpb25zaGlwIElkPVwiJHtySWR9XCIgVHlwZT1cIiR7cmVsYXRpb25zaGlwVHlwZX1cIiBUYXJnZXQ9XCIke3RhcmdldE5hbWV9XCIvPmApXHJcblxyXG5cdFx0dGhpcy5kb2MuY29udGVudFR5cGVzXHJcblx0XHRcdC5hcHBlbmQoYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YClcclxuXHJcblx0XHRyZXR1cm4gcklkXHJcblx0fVxyXG5cdFxyXG5cdGdldFJlbE9sZU9iamVjdChyaWQpe1xyXG5cdFx0bGV0IHJlbD10aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD0ke3JpZH1dYClcclxuXHRcdGxldCB0eXBlPXJlbC5hdHRyKFwiVHlwZVwiKVxyXG5cdFx0bGV0IHRhcmdldE5hbWU9cmVsLmF0dHIoXCJUYXJnZXRcIilcclxuXHRcdGxldCBkYXRhPXRoaXMuZG9jLmdldERhdGFQYXJ0KGAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gKVxyXG5cdFx0c3dpdGNoKHR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpKXtcclxuXHRcdFx0Y2FzZSBcIm9sZU9iamVjdFwiOlxyXG5cdFx0XHRcdHJldHVybiBPTEUucGFyc2UoZGF0YSlcclxuXHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRyZXR1cm4gZGF0YVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdHJlbW92ZVJlbChpZCl7XHJcblx0XHRsZXQgcmVsPXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtpZH1cIl1gKVxyXG5cdFx0aWYocmVsLmF0dHIoXCJUYXJnZXRNb2RlXCIpIT09XCJFeHRlcm5hbFwiKXtcclxuXHRcdFx0bGV0IHBhcnROYW1lPXRoaXMuZm9sZGVyK3JlbC5hdHRyKFwiVGFyZ2V0XCIpXHJcblx0XHRcdHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKClcclxuXHRcdFx0dGhpcy5kb2MucmF3LnJlbW92ZShwYXJ0TmFtZSlcclxuXHRcdFx0ZGVsZXRlIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXVxyXG5cdFx0fVxyXG5cdFx0cmVsLnJlbW92ZSgpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9KHR5cGUscHJvcHMsY2hpbGRyZW4pPT57dHlwZSxwcm9wcyxjaGlsZHJlbn0saWRlbnRpZnk9bm9kZT0+bm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSl7XHJcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxyXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XHJcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdHlwZT10YWdOYW1lXHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHJcblx0XHRpZihpZGVudGlmeSl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXHJcblx0XHRcdGlmKCFtb2RlbClcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cclxuXHRcdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIil7XHJcblx0XHRcdFx0dHlwZT1tb2RlbFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgY29udGVudDtcclxuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XHJcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNvbnRlbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHJvcHMua2V5PWlkXHJcblx0XHRwcm9wcy5ub2RlPW5vZGVcclxuXHRcdHByb3BzLnR5cGU9dHlwZVxyXG5cclxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPVtdXHJcblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKVxyXG5cdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG5cdFx0XHRcdHR5cGUsXHJcblx0XHRcdFx0cHJvcHMsXHJcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==