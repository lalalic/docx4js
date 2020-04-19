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
    var i = name.lastIndexOf("/");

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
      var normalizedtarget = target.replace(this.folder, "");
      return this.doc.getObjectPart(this.folder + normalizedtarget);
    }
  }, {
    key: "getRel",
    value: function getRel(id) {
      var rel = this.rels("Relationship[Id=\"" + id + "\"]");
      var target = rel.attr("Target");
      if (rel.attr("TargetMode") === "External") return { url: target };

      switch (rel.attr("Type").split("/").pop()) {
        case "image":
          var path = target.indexOf("/") === 0 ? target : this.folder + target;
          var url = this.doc.getDataPartAsUrl(path, "image/*");
          var crc32 = this.doc.getPartCrc32(path);
          return { url: url, crc32: crc32 };
        default:
          if (target.endsWith(".xml")) return this.getRelObject(target);else return this.doc.getPart(this.folder + target);
      }
    }
  }, {
    key: "_nextrId",
    value: function _nextrId() {
      return Math.max.apply(Math, _toConsumableArray(this.rels("Relationship").toArray().map(function (a) {
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
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { ext: "jpg", mime: "image/jpg" },
          ext = _ref.ext,
          mime = _ref.mime;

      var type = "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image";
      var id = "rId" + this._nextrId();

      var targetName = "media/image" + (Math.max.apply(Math, [0].concat(_toConsumableArray(this.rels("Relationship[Type$='image']").toArray().map(function (t) {
        return parseInt(t.attribs.Target.match(/\d+\./) || [0]);
      })))) + 1) + "." + ext;

      var partName = "" + this.folder + targetName;
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
        return node.data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsiT0xFIiwiUGFydCIsIm5hbWUiLCJkb2MiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwicGFydHMiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldCIsImdldE9iamVjdFBhcnQiLCJfaW5pdCIsImNvbmZpZ3VyYWJsZSIsImlkIiwicmVsIiwicmVscyIsInRhcmdldCIsImF0dHIiLCJ0eXBlIiwibm9ybWFsaXplZHRhcmdldCIsInJlcGxhY2UiLCJ1cmwiLCJzcGxpdCIsInBvcCIsInBhdGgiLCJpbmRleE9mIiwiZ2V0RGF0YVBhcnRBc1VybCIsImNyYzMyIiwiZ2V0UGFydENyYzMyIiwiZW5kc1dpdGgiLCJnZXRSZWxPYmplY3QiLCJnZXRQYXJ0IiwiTWF0aCIsIm1heCIsInRvQXJyYXkiLCJtYXAiLCJhIiwicGFyc2VJbnQiLCJhdHRyaWJzIiwiSWQiLCJkYXRhIiwicklkIiwiX25leHRySWQiLCJhcHBlbmQiLCJwYXJ0TmFtZSIsInJhdyIsImZpbGUiLCJleHQiLCJtaW1lIiwidGFyZ2V0TmFtZSIsInQiLCJUYXJnZXQiLCJtYXRjaCIsIkRlZmF1bHRUeXBlcyIsImV4dFR5cGUiLCJmaW5kIiwibGVuZ3RoIiwicHJlcGVuZCIsInJlbGF0aW9uc2hpcFR5cGUiLCJjb250ZW50VHlwZSIsImNvbnN0cnVjdG9yIiwiY29udGVudFR5cGVzIiwicmlkIiwiZ2V0RGF0YVBhcnQiLCJwYXJzZSIsInJlbW92ZSIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwicHJvcHMiLCJjaGlsZHJlbiIsImlkZW50aWZ5IiwiZXh0cmEiLCJ0YWdOYW1lIiwicGFyZW50IiwibW9kZWwiLCJjb250ZW50IiwidW5kZWZpbmVkIiwia2V5IiwiYXNzaWduIiwiY2hpbGRFbGVtZW50cyIsIkFycmF5IiwiaXNBcnJheSIsInJlbmRlck5vZGUiLCJmaWx0ZXIiLCIkIl0s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QU4sQ0FBY1osUUFBZCxDQUFKLEVBQTZCO0FBQzNCLFlBQUlBLFNBQVNiLE1BQWIsRUFBcUI7QUFDbkJ1QiwwQkFBZ0JWLFNBQ2JsQyxHQURhLENBQ1QsVUFBQ0MsQ0FBRDtBQUFBLG1CQUFRQSxJQUFJLE1BQUs4QyxVQUFMLENBQWdCOUMsQ0FBaEIsRUFBbUIrQixhQUFuQixFQUFrQ0csUUFBbEMsQ0FBSixHQUFrRCxJQUExRDtBQUFBLFdBRFMsRUFFYmEsTUFGYSxDQUVOLFVBQUMvQyxDQUFEO0FBQUEsbUJBQU8sQ0FBQyxDQUFDQSxDQUFUO0FBQUEsV0FGTSxDQUFoQjtBQUdEO0FBQ0Y7O0FBRUQsYUFBTytCLGNBQWNqRCxJQUFkLEVBQW9Ca0QsS0FBcEIsRUFBMkJXLGFBQTNCLENBQVA7QUFDRDs7O3NCQUVDYixJLEVBQU07QUFDTixhQUFPLEtBQUtsRSxHQUFMLENBQVNvRixDQUFULENBQVdsQixJQUFYLENBQVA7QUFDRDs7Ozs7O2tCQS9Pa0JwRSxJIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBPTEUgZnJvbSBcIi4vb2xlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnQge1xuICBjb25zdHJ1Y3RvcihuYW1lLCBkb2MpIHtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIHRoaXMuZG9jID0gZG9jO1xuXG4gICAgbGV0IGZvbGRlciA9IFwiXCI7XG4gICAgbGV0IHJlbE5hbWUgPSBcIl9yZWxzL1wiICsgbmFtZSArIFwiLnJlbHNcIjtcbiAgICBsZXQgaSA9IG5hbWUubGFzdEluZGV4T2YoXCIvXCIpO1xuXG4gICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICBmb2xkZXIgPSBuYW1lLnN1YnN0cmluZygwLCBpICsgMSk7XG4gICAgICByZWxOYW1lID0gZm9sZGVyICsgXCJfcmVscy9cIiArIG5hbWUuc3Vic3RyaW5nKGkgKyAxKSArIFwiLnJlbHNcIjtcbiAgICB9XG5cbiAgICBpZiAoZG9jLnBhcnRzW3JlbE5hbWVdKSB7XG4gICAgICB0aGlzLmZvbGRlciA9IGZvbGRlcjtcbiAgICAgIHRoaXMucmVsTmFtZSA9IHJlbE5hbWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgXCJyZWxzXCIsIHtcbiAgICAgICAgZ2V0KCkge1xuICAgICAgICAgIHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMucmVsTmFtZSk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgX2luaXQoKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIFwiY29udGVudFwiLCB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHRoaXMubmFtZSk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UmVsUGFydChpZCkge1xuICAgIHZhciByZWwgPSB0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYCk7XG4gICAgdmFyIHRhcmdldCA9IHJlbC5hdHRyKFwiVGFyZ2V0XCIpO1xuICAgIHJldHVybiBuZXcgUGFydChgJHt0aGlzLmZvbGRlcn0ke3RhcmdldH1gLCB0aGlzLmRvYyk7XG4gIH1cblxuICBnZXRSZWxUYXJnZXQodHlwZSkge1xuICAgIHJldHVybiB0aGlzLnJlbHMoYFtUeXBlJD1cIiR7dHlwZX1cIl1gKS5hdHRyKFwiVGFyZ2V0XCIpO1xuICB9XG5cbiAgZ2V0UmVsT2JqZWN0KHRhcmdldCkge1xuICAgIGNvbnN0IG5vcm1hbGl6ZWR0YXJnZXQgPSB0YXJnZXQucmVwbGFjZSh0aGlzLmZvbGRlciwgXCJcIik7XG4gICAgcmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQodGhpcy5mb2xkZXIgKyBub3JtYWxpemVkdGFyZ2V0KTtcbiAgfVxuXG4gIGdldFJlbChpZCkge1xuICAgIHZhciByZWwgPSB0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD1cIiR7aWR9XCJdYCk7XG4gICAgdmFyIHRhcmdldCA9IHJlbC5hdHRyKFwiVGFyZ2V0XCIpO1xuICAgIGlmIChyZWwuYXR0cihcIlRhcmdldE1vZGVcIikgPT09IFwiRXh0ZXJuYWxcIikgcmV0dXJuIHsgdXJsOiB0YXJnZXQgfTtcblxuICAgIHN3aXRjaCAocmVsLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKSkge1xuICAgICAgY2FzZSBcImltYWdlXCI6XG4gICAgICAgIGNvbnN0IHBhdGggPSB0YXJnZXQuaW5kZXhPZihcIi9cIikgPT09IDAgPyB0YXJnZXQgOiB0aGlzLmZvbGRlciArIHRhcmdldDtcbiAgICAgICAgbGV0IHVybCA9IHRoaXMuZG9jLmdldERhdGFQYXJ0QXNVcmwocGF0aCwgXCJpbWFnZS8qXCIpO1xuICAgICAgICBsZXQgY3JjMzIgPSB0aGlzLmRvYy5nZXRQYXJ0Q3JjMzIocGF0aCk7XG4gICAgICAgIHJldHVybiB7IHVybCwgY3JjMzIgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmICh0YXJnZXQuZW5kc1dpdGgoXCIueG1sXCIpKSByZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KTtcbiAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5kb2MuZ2V0UGFydCh0aGlzLmZvbGRlciArIHRhcmdldCk7XG4gICAgfVxuICB9XG5cbiAgX25leHRySWQoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIE1hdGgubWF4KFxuICAgICAgICAuLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBcIilcbiAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgLm1hcCgoYSkgPT4gcGFyc2VJbnQoYS5hdHRyaWJzLklkLnN1YnN0cmluZygzKSkpXG4gICAgICApICsgMVxuICAgICk7XG4gIH1cblxuICBhZGQodHlwZSwgdGFyZ2V0LCBkYXRhKSB7XG4gICAgY29uc3QgcklkID0gYHJJZCR7dGhpcy5fbmV4dHJJZCgpfWA7XG4gICAgdGhpcy5yZWxzKFwiUmVsYXRpb25zaGlwc1wiKS5hcHBlbmQoXG4gICAgICBgPFJlbGF0aW9uc2hpcCBJZD1cIiR7cklkfVwiIHR5cGU9XCIke3R5cGV9XCIgdGFyZ2V0PVwiJHt0YXJnZXR9XCIvPmBcbiAgICApO1xuICAgIGNvbnN0IHBhcnROYW1lID0gYCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXR9YDtcbiAgICB0aGlzLmRvYy5yYXcuZmlsZShwYXJ0TmFtZSwgZGF0YSk7XG4gICAgdGhpcy5kb2MucGFydHNbcGFydE5hbWVdID0gdGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUpO1xuICAgIHJldHVybiBySWQ7XG4gIH1cblxuICBhZGRJbWFnZShkYXRhLCB7IGV4dCwgbWltZSB9ID0geyBleHQ6IFwianBnXCIsIG1pbWU6IFwiaW1hZ2UvanBnXCIgfSkge1xuICAgIGNvbnN0IHR5cGUgPVxuICAgICAgXCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCI7XG4gICAgbGV0IGlkID0gYHJJZCR7dGhpcy5fbmV4dHJJZCgpfWA7XG5cbiAgICBsZXQgdGFyZ2V0TmFtZSA9XG4gICAgICBcIm1lZGlhL2ltYWdlXCIgK1xuICAgICAgKE1hdGgubWF4KFxuICAgICAgICAwLFxuICAgICAgICAuLi50aGlzLnJlbHMoXCJSZWxhdGlvbnNoaXBbVHlwZSQ9J2ltYWdlJ11cIilcbiAgICAgICAgICAudG9BcnJheSgpXG4gICAgICAgICAgLm1hcCgodCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHQuYXR0cmlicy5UYXJnZXQubWF0Y2goL1xcZCtcXC4vKSB8fCBbMF0pO1xuICAgICAgICAgIH0pXG4gICAgICApICtcbiAgICAgICAgMSkgK1xuICAgICAgXCIuXCIgK1xuICAgICAgZXh0O1xuXG4gICAgbGV0IHBhcnROYW1lID0gYCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWA7XG4gICAgdGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpO1xuICAgIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXSA9IHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKTtcblxuICAgIHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIikuYXBwZW5kKFxuICAgICAgYDxSZWxhdGlvbnNoaXAgSWQ9XCIke2lkfVwiIFR5cGU9XCIke3R5cGV9XCIgVGFyZ2V0PVwiJHt0YXJnZXROYW1lfVwiLz5gXG4gICAgKTtcblxuICAgIGNvbnN0IERlZmF1bHRUeXBlcyA9IHRoaXMuZG9jLmdldE9iamVjdFBhcnQoXCJbQ29udGVudF9UeXBlc10ueG1sXCIpKGBUeXBlc2ApO1xuICAgIGNvbnN0IGV4dFR5cGUgPSBEZWZhdWx0VHlwZXMuZmluZChgPkRlZmF1bHRbRXh0ZW5zaW9uPScke2V4dH0nXWApO1xuICAgIGlmIChleHRUeXBlLmxlbmd0aCA9PSAwKSB7XG4gICAgICBEZWZhdWx0VHlwZXMucHJlcGVuZChcbiAgICAgICAgYDxEZWZhdWx0IEV4dGVuc2lvbj1cIiR7ZXh0fVwiIENvbnRlbnRUeXBlPVwiJHttaW1lfVwiLz5gXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBhZGRFeHRlcm5hbEltYWdlKHVybCkge1xuICAgIGNvbnN0IHR5cGUgPVxuICAgICAgXCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2ltYWdlXCI7XG5cbiAgICBsZXQgaWQgPSBgcklkJHt0aGlzLl9uZXh0cklkKCl9YDtcblxuICAgIHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIikuYXBwZW5kKFxuICAgICAgYDxSZWxhdGlvbnNoaXAgSWQ9XCIke2lkfVwiIFR5cGU9XCIke3R5cGV9XCIgVGFyZ2V0TW9kZT1cIkV4dGVybmFsXCIgVGFyZ2V0PVwiJHt1cmx9XCIvPmBcbiAgICApO1xuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgYWRkQ2h1bmsoZGF0YSwgcmVsYXRpb25zaGlwVHlwZSwgY29udGVudFR5cGUsIGV4dCkge1xuICAgIHJlbGF0aW9uc2hpcFR5cGUgPVxuICAgICAgcmVsYXRpb25zaGlwVHlwZSB8fFxuICAgICAgXCJodHRwOi8vc2NoZW1hcy5vcGVueG1sZm9ybWF0cy5vcmcvb2ZmaWNlRG9jdW1lbnQvMjAwNi9yZWxhdGlvbnNoaXBzL2FGQ2h1bmtcIjtcbiAgICBjb250ZW50VHlwZSA9IGNvbnRlbnRUeXBlIHx8IHRoaXMuZG9jLmNvbnN0cnVjdG9yLm1pbWU7XG4gICAgZXh0ID0gZXh0IHx8IHRoaXMuZG9jLmNvbnN0cnVjdG9yLmV4dDtcblxuICAgIGxldCBpZCA9IHRoaXMuX25leHRySWQoKTtcbiAgICBsZXQgcklkID0gYHJJZCR7aWR9YDtcbiAgICBsZXQgdGFyZ2V0TmFtZSA9IGBjaHVuay9jaHVuayR7aWR9LiR7ZXh0fWA7XG4gICAgbGV0IHBhcnROYW1lID0gYCR7dGhpcy5mb2xkZXJ9JHt0YXJnZXROYW1lfWA7XG4gICAgdGhpcy5kb2MucmF3LmZpbGUocGFydE5hbWUsIGRhdGEpO1xuICAgIHRoaXMuZG9jLnBhcnRzW3BhcnROYW1lXSA9IHRoaXMuZG9jLnJhdy5maWxlKHBhcnROYW1lKTtcblxuICAgIHRoaXMucmVscyhcIlJlbGF0aW9uc2hpcHNcIikuYXBwZW5kKFxuICAgICAgYDxSZWxhdGlvbnNoaXAgSWQ9XCIke3JJZH1cIiBUeXBlPVwiJHtyZWxhdGlvbnNoaXBUeXBlfVwiIFRhcmdldD1cIiR7dGFyZ2V0TmFtZX1cIi8+YFxuICAgICk7XG5cbiAgICB0aGlzLmRvYy5jb250ZW50VHlwZXMuYXBwZW5kKFxuICAgICAgYDxPdmVycmlkZSBQYXJ0TmFtZT1cIi8ke3BhcnROYW1lfVwiIENvbnRlbnRUeXBlPVwiJHtjb250ZW50VHlwZX1cIi8+YFxuICAgICk7XG5cbiAgICByZXR1cm4gcklkO1xuICB9XG5cbiAgZ2V0UmVsT2xlT2JqZWN0KHJpZCkge1xuICAgIGxldCByZWwgPSB0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtJZD0ke3JpZH1dYCk7XG4gICAgbGV0IHR5cGUgPSByZWwuYXR0cihcIlR5cGVcIik7XG4gICAgbGV0IHRhcmdldE5hbWUgPSByZWwuYXR0cihcIlRhcmdldFwiKTtcbiAgICBsZXQgZGF0YSA9IHRoaXMuZG9jLmdldERhdGFQYXJ0KGAke3RoaXMuZm9sZGVyfSR7dGFyZ2V0TmFtZX1gKTtcbiAgICBzd2l0Y2ggKHR5cGUuc3BsaXQoXCIvXCIpLnBvcCgpKSB7XG4gICAgICBjYXNlIFwib2xlT2JqZWN0XCI6XG4gICAgICAgIHJldHVybiBPTEUucGFyc2UoZGF0YSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVSZWwoaWQpIHtcbiAgICBsZXQgcmVsID0gdGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbSWQ9XCIke2lkfVwiXWApO1xuICAgIGlmIChyZWwuYXR0cihcIlRhcmdldE1vZGVcIikgIT09IFwiRXh0ZXJuYWxcIikge1xuICAgICAgbGV0IHBhcnROYW1lID0gdGhpcy5mb2xkZXIgKyByZWwuYXR0cihcIlRhcmdldFwiKTtcbiAgICAgIHRoaXMuZG9jLmNvbnRlbnRUeXBlcy5maW5kKGBbUGFydE5hbWU9Jy8ke3BhcnROYW1lfSddYCkucmVtb3ZlKCk7XG4gICAgICB0aGlzLmRvYy5yYXcucmVtb3ZlKHBhcnROYW1lKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmRvYy5wYXJ0c1twYXJ0TmFtZV07XG4gICAgfVxuICAgIHJlbC5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbmRlck5vZGUoXG4gICAgbm9kZSxcbiAgICBjcmVhdGVFbGVtZW50ID0gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikgPT4ge1xuICAgICAgdHlwZSwgcHJvcHMsIGNoaWxkcmVuO1xuICAgIH0sXG4gICAgaWRlbnRpZnkgPSAobm9kZSkgPT4gbm9kZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSxcbiAgICBleHRyYVxuICApIHtcbiAgICBsZXQgeyBuYW1lOiB0YWdOYW1lLCBjaGlsZHJlbiwgaWQsIHBhcmVudCB9ID0gbm9kZTtcbiAgICBpZiAobm9kZS50eXBlID09IFwidGV4dFwiKSB7XG4gICAgICByZXR1cm4gbm9kZS5kYXRhO1xuICAgICAgaWYgKHBhcmVudC5uYW1lID09IFwidzp0XCIpIHtcbiAgICAgICAgcmV0dXJuIG5vZGUuZGF0YTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGxldCB0eXBlID0gdGFnTmFtZTtcbiAgICBsZXQgcHJvcHMgPSB7fTtcblxuICAgIGlmIChpZGVudGlmeSkge1xuICAgICAgbGV0IG1vZGVsID0gaWRlbnRpZnkobm9kZSwgdGhpcyk7XG4gICAgICBpZiAoIW1vZGVsKSByZXR1cm4gbnVsbDtcblxuICAgICAgaWYgKHR5cGVvZiBtb2RlbCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHR5cGUgPSBtb2RlbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjb250ZW50O1xuICAgICAgICAoeyB0eXBlLCBjaGlsZHJlbjogY29udGVudCwgLi4ucHJvcHMgfSA9IG1vZGVsKTtcbiAgICAgICAgaWYgKGNvbnRlbnQgIT09IHVuZGVmaW5lZCkgY2hpbGRyZW4gPSBjb250ZW50O1xuICAgICAgfVxuICAgIH1cbiAgICBwcm9wcy5rZXkgPSBpZDtcbiAgICBwcm9wcy5ub2RlID0gbm9kZTtcbiAgICBwcm9wcy50eXBlID0gdHlwZTtcblxuICAgIGlmIChleHRyYSkgT2JqZWN0LmFzc2lnbihwcm9wcywgZXh0cmEpO1xuXG4gICAgbGV0IGNoaWxkRWxlbWVudHMgPSBjaGlsZHJlbjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICAgIGlmIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgY2hpbGRFbGVtZW50cyA9IGNoaWxkcmVuXG4gICAgICAgICAgLm1hcCgoYSkgPT4gKGEgPyB0aGlzLnJlbmRlck5vZGUoYSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpIDogbnVsbCkpXG4gICAgICAgICAgLmZpbHRlcigoYSkgPT4gISFhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcywgY2hpbGRFbGVtZW50cyk7XG4gIH1cblxuICAkKG5vZGUpIHtcbiAgICByZXR1cm4gdGhpcy5kb2MuJChub2RlKTtcbiAgfVxufVxuIl19