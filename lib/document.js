"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

require("./$props");

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _htmlparser = require("htmlparser2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var normalize = function normalize(path) {
  return path.split("/").filter(function (a) {
    return a != "." && a;
  }).reduceRight(function (n, a) {
    if (a == "..") {
      n.r++;
    } else if (n.r) {
      n.r--;
    } else {
      n.trimed.unshift(a);
    }
    return n;
  }, { trimed: [], r: 0 }).trimed.join("/");
};
/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse())
 */

var ZipDocument = function () {
  function ZipDocument(parts, raw, props) {
    _classCallCheck(this, ZipDocument);

    this.parts = parts;
    this.raw = raw;
    this.props = props;
    this._shouldReleased = new Map();
  }

  _createClass(ZipDocument, [{
    key: "normalizePath",
    value: function normalizePath() {
      return normalize.apply(undefined, arguments);
    }
  }, {
    key: "getPart",
    value: function getPart(name) {
      name = normalize(name);
      return this.parts[name];
    }
  }, {
    key: "getDataPart",
    value: function getDataPart(name) {
      name = normalize(name);
      var part = this.parts[name];
      var crc32 = part._data.crc32;
      var data = part.asUint8Array(); //unsafe call, part._data is changed
      data.crc32 = part._data.crc32 = crc32; //so keep crc32 on part._data for future
      return data;
    }
  }, {
    key: "getDataPartAsUrl",
    value: function getDataPartAsUrl(name) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*/*";

      name = normalize(name);
      var part = this.parts[name];
      var crc32 = part._data.crc32;
      if (!this._shouldReleased.has(crc32)) {
        this._shouldReleased.set(crc32, URL.createObjectURL(new Blob([this.getDataPart(name)], { type: type })));
      }
      return this._shouldReleased.get(crc32);
    }
  }, {
    key: "getPartCrc32",
    value: function getPartCrc32(name) {
      name = normalize(name);
      var part = this.parts[name];
      var crc32 = part._data.crc32;
      return crc32;
    }
  }, {
    key: "release",
    value: function release() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._shouldReleased[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              url = _step$value[1];

          URL.revokeObjectURL(url);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "getObjectPart",
    value: function getObjectPart(name) {
      name = normalize(name);
      var part = this.parts[name];
      if (!part) return null;else if (part.cheerio) return part;else {
        var $ = Object.assign(this.parts[name] = this.constructor.parseXml(part.asText()), { part: name });
        Object.assign($.root()[0].attribs, { part: name });
        $.prototype.part = function () {
          return name;
        };
        return $;
      }
    }
  }, {
    key: "$",
    value: function $(node) {
      var root = function root(a) {
        return a.root || root(a.parent);
      };
      return this.getObjectPart(root(node).attribs.part)(node);
    }
  }, {
    key: "parse",
    value: function parse(domHandler) {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "serialize",
    value: function serialize() {
      var _this = this;

      var newDoc = new _jszip2.default();
      Object.keys(this.parts).forEach(function (path) {
        var part = _this.parts[path];
        if (part.cheerio) {
          newDoc.file(path, part.xml());
        } else {
          newDoc.file(path, part._data, part.options);
        }
      });
      return newDoc;
    }
  }, {
    key: "save",
    value: function save(file, options) {
      file = file || this.props.name || Date.now() + ".docx";

      var newDoc = this.serialize();

      if (typeof document != "undefined" && window.URL && window.URL.createObjectURL) {
        var data = newDoc.generate(_extends({}, options, {
          type: "blob",
          mimeType: this.constructor.mime
        }));
        var url = window.URL.createObjectURL(data);
        var link = document.createElement("a");
        document.body.appendChild(link);
        link.download = file;
        link.href = url;
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        var _ret = function () {
          var data = newDoc.generate(_extends({}, options, { type: "nodebuffer" }));
          return {
            v: new Promise(function (resolve, reject) {
              return require("f" + "s").writeFile(file, data, function (error) {
                error ? reject(error) : resolve(data);
              });
            })
          };
        }();

        if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
      }
    }
  }, {
    key: "clone",
    value: function clone() {
      var _this2 = this;

      var zip = new _jszip2.default();
      var props = props ? JSON.parse(JSON.stringify(this.props)) : props;
      var parts = Object.keys(this.parts).reduce(function (state, k) {
        var v = _this2.parts[k];
        if (v.cheerio) {
          zip.file(v.name, v.xml(), v.options);
          state[k] = zip.file(v.name);
        } else {
          zip.file(v.name, v._data, v.options);
          state[k] = zip.file(v.name);
        }
        return state;
      }, {});
      return new this.constructor(parts, zip, props);
    }

    /**
    *  a helper to load document file
     *  @param inputFile {File} - a html input file, or nodejs file
    *  @return {Promise}
    */

  }], [{
    key: "load",
    value: function load(inputFile) {
      var DocumentSelf = this;

      if (inputFile instanceof ZipDocument) return Promise.resolve(inputFile);

      return new Promise(function (resolve, reject) {
        function parse(data) {
          var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          try {
            (function () {
              var raw = new _jszip2.default(data),
                  parts = {};
              raw.filter(function (path, file) {
                return parts[path] = file;
              });
              resolve(new DocumentSelf(parts, raw, props));
            })();
          } catch (error) {
            reject(error);
          }
        }

        if (typeof inputFile == "string") {
          //file name
          require("fs").readFile(inputFile, function (error, data) {
            if (error) reject(error);else if (data) {
              parse(data, {
                name: inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, "")
              });
            }
          });
        } else if (inputFile instanceof Blob) {
          var reader = new FileReader();
          reader.onload = function (e) {
            parse(e.target.result, inputFile.name ? {
              name: inputFile.name.replace(/\.docx$/i, ""),
              lastModified: inputFile.lastModified,
              size: inputFile.size
            } : { size: inputFile.size });
          };
          reader.readAsArrayBuffer(inputFile);
        } else {
          parse(inputFile);
        }
      });
    }
  }, {
    key: "create",
    value: function create() {
      return this.load(__dirname + "/../templates/blank." + this.ext);
    }
  }, {
    key: "parseXml",
    value: function parseXml(data) {
      try {
        var opt = { xmlMode: true, decodeEntities: false };
        var handler = new ContentDomHandler(opt);
        new _htmlparser.Parser(handler, opt).end(data);
        var parsed = _cheerio2.default.load(handler.dom, opt);
        if (typeof parsed.cheerio == "undefined") parsed.cheerio = "customized";
        return parsed;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }]);

  return ZipDocument;
}();

ZipDocument.ext = "unknown";
ZipDocument.mime = "application/zip";
exports.default = ZipDocument;

var ContentDomHandler = function (_DomHandler) {
  _inherits(ContentDomHandler, _DomHandler);

  function ContentDomHandler() {
    _classCallCheck(this, ContentDomHandler);

    return _possibleConstructorReturn(this, (ContentDomHandler.__proto__ || Object.getPrototypeOf(ContentDomHandler)).apply(this, arguments));
  }

  _createClass(ContentDomHandler, [{
    key: "_addDomElement",
    value: function _addDomElement(el) {
      if (el.type == "text" && (el.data[0] == "\r" || el.data[0] == "\n") //remove format whitespaces
      ) ;else return _get(ContentDomHandler.prototype.__proto__ || Object.getPrototypeOf(ContentDomHandler.prototype), "_addDomElement", this).call(this, el);
    }
  }]);

  return ContentDomHandler;
}(_htmlparser.DomHandler);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJwYXRoIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwicmVkdWNlUmlnaHQiLCJuIiwiciIsInRyaW1lZCIsInVuc2hpZnQiLCJqb2luIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwiX3Nob3VsZFJlbGVhc2VkIiwiTWFwIiwiYXJndW1lbnRzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsInR5cGUiLCJoYXMiLCJzZXQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZ2V0RGF0YVBhcnQiLCJnZXQiLCJ1cmwiLCJyZXZva2VPYmplY3RVUkwiLCJjaGVlcmlvIiwiJCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJyb290IiwiYXR0cmlicyIsInByb3RvdHlwZSIsIm5vZGUiLCJwYXJlbnQiLCJnZXRPYmplY3RQYXJ0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsImtleXMiLCJmb3JFYWNoIiwiZmlsZSIsInhtbCIsIm9wdGlvbnMiLCJEYXRlIiwibm93Iiwic2VyaWFsaXplIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJnZW5lcmF0ZSIsIm1pbWVUeXBlIiwibWltZSIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiZG93bmxvYWQiLCJocmVmIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWlyZSIsIndyaXRlRmlsZSIsImVycm9yIiwiemlwIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicmVkdWNlIiwic3RhdGUiLCJrIiwidiIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsInJlYWRGaWxlIiwicG9wIiwicmVwbGFjZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJkZWNvZGVFbnRpdGllcyIsImhhbmRsZXIiLCJDb250ZW50RG9tSGFuZGxlciIsImVuZCIsInBhcnNlZCIsImRvbSIsImNvbnNvbGUiLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxJQUFEO0FBQUEsU0FDaEJBLEtBQ0dDLEtBREgsQ0FDUyxHQURULEVBRUdDLE1BRkgsQ0FFVSxVQUFDQyxDQUFEO0FBQUEsV0FBT0EsS0FBSyxHQUFMLElBQVlBLENBQW5CO0FBQUEsR0FGVixFQUdHQyxXQUhILENBSUksVUFBQ0MsQ0FBRCxFQUFJRixDQUFKLEVBQVU7QUFDUixRQUFJQSxLQUFLLElBQVQsRUFBZTtBQUNiRSxRQUFFQyxDQUFGO0FBQ0QsS0FGRCxNQUVPLElBQUlELEVBQUVDLENBQU4sRUFBUztBQUNkRCxRQUFFQyxDQUFGO0FBQ0QsS0FGTSxNQUVBO0FBQ0xELFFBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkwsQ0FBakI7QUFDRDtBQUNELFdBQU9FLENBQVA7QUFDRCxHQWJMLEVBY0ksRUFBRUUsUUFBUSxFQUFWLEVBQWNELEdBQUcsQ0FBakIsRUFkSixFQWdCR0MsTUFoQkgsQ0FnQlVFLElBaEJWLENBZ0JlLEdBaEJmLENBRGdCO0FBQUEsQ0FBbEI7QUFrQkE7Ozs7Ozs7O0lBT3FCQyxXO0FBSW5CLHVCQUFZQyxLQUFaLEVBQW1CQyxHQUFuQixFQUF3QkMsS0FBeEIsRUFBK0I7QUFBQTs7QUFDN0IsU0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0EsU0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS0Ms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QU07QUFDcEIsVUFBSTtBQUNGLFlBQUkrRSxNQUFNLEVBQUVDLFNBQVMsSUFBWCxFQUFpQkMsZ0JBQWdCLEtBQWpDLEVBQVY7QUFDQSxZQUFJQyxVQUFVLElBQUlDLGlCQUFKLENBQXNCSixHQUF0QixDQUFkO0FBQ0EsK0JBQVdHLE9BQVgsRUFBb0JILEdBQXBCLEVBQXlCSyxHQUF6QixDQUE2QnBGLElBQTdCO0FBQ0EsWUFBSXFGLFNBQVMsa0JBQU1ULElBQU4sQ0FBV00sUUFBUUksR0FBbkIsRUFBd0JQLEdBQXhCLENBQWI7QUFDQSxZQUFJLE9BQU9NLE9BQU96RSxPQUFkLElBQXlCLFdBQTdCLEVBQTBDeUUsT0FBT3pFLE9BQVAsR0FBaUIsWUFBakI7QUFDMUMsZUFBT3lFLE1BQVA7QUFDRCxPQVBELENBT0UsT0FBT2hDLEtBQVAsRUFBYztBQUNka0MsZ0JBQVFsQyxLQUFSLENBQWNBLEtBQWQ7QUFDQSxlQUFPLElBQVA7QUFDRDtBQUNGOzs7Ozs7QUF6TmtCaEUsVyxDQUNaeUYsRyxHQUFNLFM7QUFETXpGLFcsQ0FFWmtELEksR0FBTyxpQjtrQkFGS2xELFc7O0lBNE5mOEYsaUI7Ozs7Ozs7Ozs7O21DQUNXSyxFLEVBQUk7QUFDakIsVUFDRUEsR0FBR3RGLElBQUgsSUFBVyxNQUFYLEtBQ0NzRixHQUFHeEYsSUFBSCxDQUFRLENBQVIsS0FBYyxJQUFkLElBQXNCd0YsR0FBR3hGLElBQUgsQ0FBUSxDQUFSLEtBQWMsSUFEckMsQ0FERixDQUU2QztBQUY3QyxRQUdDLENBSEQsS0FJSyw0SUFBNEJ3RixFQUE1QjtBQUNOIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwLCB7IFppcE9iamVjdCB9IGZyb20gXCJqc3ppcFwiO1xuaW1wb3J0IFwiLi8kcHJvcHNcIjtcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiO1xuaW1wb3J0IHsgUGFyc2VyLCBEb21IYW5kbGVyIH0gZnJvbSBcImh0bWxwYXJzZXIyXCI7XG5cbmNvbnN0IG5vcm1hbGl6ZSA9IChwYXRoKSA9PlxuICBwYXRoXG4gICAgLnNwbGl0KFwiL1wiKVxuICAgIC5maWx0ZXIoKGEpID0+IGEgIT0gXCIuXCIgJiYgYSlcbiAgICAucmVkdWNlUmlnaHQoXG4gICAgICAobiwgYSkgPT4ge1xuICAgICAgICBpZiAoYSA9PSBcIi4uXCIpIHtcbiAgICAgICAgICBuLnIrKztcbiAgICAgICAgfSBlbHNlIGlmIChuLnIpIHtcbiAgICAgICAgICBuLnItLTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuLnRyaW1lZC51bnNoaWZ0KGEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuO1xuICAgICAgfSxcbiAgICAgIHsgdHJpbWVkOiBbXSwgcjogMCB9XG4gICAgKVxuICAgIC50cmltZWQuam9pbihcIi9cIik7XG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaXBEb2N1bWVudCB7XG4gIHN0YXRpYyBleHQgPSBcInVua25vd25cIjtcbiAgc3RhdGljIG1pbWUgPSBcImFwcGxpY2F0aW9uL3ppcFwiO1xuXG4gIGNvbnN0cnVjdG9yKHBhcnRzLCByYXcsIHByb3BzKSB7XG4gICAgdGhpcy5wYXJ0cyA9IHBhcnRzO1xuICAgIHRoaXMucmF3ID0gcmF3O1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLl9zaG91bGRSZWxlYXNlZCA9IG5ldyBNYXAoKTtcbiAgfVxuXG4gIG5vcm1hbGl6ZVBhdGgoKSB7XG4gICAgcmV0dXJuIG5vcm1hbGl6ZSguLi5hcmd1bWVudHMpO1xuICB9XG5cbiAgZ2V0UGFydChuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lKTtcbiAgICByZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXTtcbiAgfVxuXG4gIGdldERhdGFQYXJ0KG5hbWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplKG5hbWUpO1xuICAgIGxldCBwYXJ0ID0gdGhpcy5wYXJ0c1tuYW1lXTtcbiAgICBsZXQgY3JjMzIgPSBwYXJ0Ll9kYXRhLmNyYzMyO1xuICAgIGxldCBkYXRhID0gcGFydC5hc1VpbnQ4QXJyYXkoKTsgLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG4gICAgZGF0YS5jcmMzMiA9IHBhcnQuX2RhdGEuY3JjMzIgPSBjcmMzMjsgLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgZ2V0RGF0YVBhcnRBc1VybChuYW1lLCB0eXBlID0gXCIqLypcIikge1xuICAgIG5hbWUgPSBub3JtYWxpemUobmFtZSk7XG4gICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW25hbWVdO1xuICAgIGxldCBjcmMzMiA9IHBhcnQuX2RhdGEuY3JjMzI7XG4gICAgaWYgKCF0aGlzLl9zaG91bGRSZWxlYXNlZC5oYXMoY3JjMzIpKSB7XG4gICAgICB0aGlzLl9zaG91bGRSZWxlYXNlZC5zZXQoXG4gICAgICAgIGNyYzMyLFxuICAgICAgICBVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmdldERhdGFQYXJ0KG5hbWUpXSwgeyB0eXBlIH0pKVxuICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3Nob3VsZFJlbGVhc2VkLmdldChjcmMzMik7XG4gIH1cblxuICBnZXRQYXJ0Q3JjMzIobmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemUobmFtZSk7XG4gICAgbGV0IHBhcnQgPSB0aGlzLnBhcnRzW25hbWVdO1xuICAgIGxldCBjcmMzMiA9IHBhcnQuX2RhdGEuY3JjMzI7XG4gICAgcmV0dXJuIGNyYzMyO1xuICB9XG5cbiAgcmVsZWFzZSgpIHtcbiAgICBmb3IgKGxldCBbLCB1cmxdIG9mIHRoaXMuX3Nob3VsZFJlbGVhc2VkKSB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0T2JqZWN0UGFydChuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZShuYW1lKTtcbiAgICBjb25zdCBwYXJ0ID0gdGhpcy5wYXJ0c1tuYW1lXTtcbiAgICBpZiAoIXBhcnQpIHJldHVybiBudWxsO1xuICAgIGVsc2UgaWYgKHBhcnQuY2hlZXJpbykgcmV0dXJuIHBhcnQ7XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCAkID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgKHRoaXMucGFydHNbbmFtZV0gPSB0aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHBhcnQuYXNUZXh0KCkpKSxcbiAgICAgICAgeyBwYXJ0OiBuYW1lIH1cbiAgICAgICk7XG4gICAgICBPYmplY3QuYXNzaWduKCQucm9vdCgpWzBdLmF0dHJpYnMsIHsgcGFydDogbmFtZSB9KTtcbiAgICAgICQucHJvdG90eXBlLnBhcnQgPSAoKSA9PiBuYW1lO1xuICAgICAgcmV0dXJuICQ7XG4gICAgfVxuICB9XG5cbiAgJChub2RlKSB7XG4gICAgY29uc3Qgcm9vdCA9IChhKSA9PiBhLnJvb3QgfHwgcm9vdChhLnBhcmVudCk7XG4gICAgcmV0dXJuIHRoaXMuZ2V0T2JqZWN0UGFydChyb290KG5vZGUpLmF0dHJpYnMucGFydCkobm9kZSk7XG4gIH1cblxuICBwYXJzZShkb21IYW5kbGVyKSB7fVxuXG4gIHJlbmRlcigpIHt9XG5cbiAgc2VyaWFsaXplKCkge1xuICAgIGxldCBuZXdEb2MgPSBuZXcgSlNaaXAoKTtcbiAgICBPYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICBsZXQgcGFydCA9IHRoaXMucGFydHNbcGF0aF07XG4gICAgICBpZiAocGFydC5jaGVlcmlvKSB7XG4gICAgICAgIG5ld0RvYy5maWxlKHBhdGgsIHBhcnQueG1sKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3RG9jLmZpbGUocGF0aCwgcGFydC5fZGF0YSwgcGFydC5vcHRpb25zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbmV3RG9jO1xuICB9XG5cbiAgc2F2ZShmaWxlLCBvcHRpb25zKSB7XG4gICAgZmlsZSA9IGZpbGUgfHwgdGhpcy5wcm9wcy5uYW1lIHx8IGAke0RhdGUubm93KCl9LmRvY3hgO1xuXG4gICAgbGV0IG5ld0RvYyA9IHRoaXMuc2VyaWFsaXplKCk7XG5cbiAgICBpZiAoXG4gICAgICB0eXBlb2YgZG9jdW1lbnQgIT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgd2luZG93LlVSTCAmJlxuICAgICAgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkxcbiAgICApIHtcbiAgICAgIGxldCBkYXRhID0gbmV3RG9jLmdlbmVyYXRlKHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgdHlwZTogXCJibG9iXCIsXG4gICAgICAgIG1pbWVUeXBlOiB0aGlzLmNvbnN0cnVjdG9yLm1pbWUsXG4gICAgICB9KTtcbiAgICAgIGxldCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKTtcbiAgICAgIGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspO1xuICAgICAgbGluay5kb3dubG9hZCA9IGZpbGU7XG4gICAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgICBsaW5rLmNsaWNrKCk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspO1xuICAgICAgd2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGRhdGEgPSBuZXdEb2MuZ2VuZXJhdGUoeyAuLi5vcHRpb25zLCB0eXBlOiBcIm5vZGVidWZmZXJcIiB9KTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PlxuICAgICAgICByZXF1aXJlKFwiZlwiICsgXCJzXCIpLndyaXRlRmlsZShmaWxlLCBkYXRhLCAoZXJyb3IpID0+IHtcbiAgICAgICAgICBlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjbG9uZSgpIHtcbiAgICBsZXQgemlwID0gbmV3IEpTWmlwKCk7XG4gICAgbGV0IHByb3BzID0gcHJvcHMgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKSA6IHByb3BzO1xuICAgIGxldCBwYXJ0cyA9IE9iamVjdC5rZXlzKHRoaXMucGFydHMpLnJlZHVjZSgoc3RhdGUsIGspID0+IHtcbiAgICAgIGxldCB2ID0gdGhpcy5wYXJ0c1trXTtcbiAgICAgIGlmICh2LmNoZWVyaW8pIHtcbiAgICAgICAgemlwLmZpbGUodi5uYW1lLCB2LnhtbCgpLCB2Lm9wdGlvbnMpO1xuICAgICAgICBzdGF0ZVtrXSA9IHppcC5maWxlKHYubmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB6aXAuZmlsZSh2Lm5hbWUsIHYuX2RhdGEsIHYub3B0aW9ucyk7XG4gICAgICAgIHN0YXRlW2tdID0gemlwLmZpbGUodi5uYW1lKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9LCB7fSk7XG4gICAgcmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLCB6aXAsIHByb3BzKTtcbiAgfVxuXG4gIC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblxuICBzdGF0aWMgbG9hZChpbnB1dEZpbGUpIHtcbiAgICBjb25zdCBEb2N1bWVudFNlbGYgPSB0aGlzO1xuXG4gICAgaWYgKGlucHV0RmlsZSBpbnN0YW5jZW9mIFppcERvY3VtZW50KSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlucHV0RmlsZSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHMgPSB7fSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGxldCByYXcgPSBuZXcgSlNaaXAoZGF0YSksXG4gICAgICAgICAgICBwYXJ0cyA9IHt9O1xuICAgICAgICAgIHJhdy5maWx0ZXIoKHBhdGgsIGZpbGUpID0+IChwYXJ0c1twYXRoXSA9IGZpbGUpKTtcbiAgICAgICAgICByZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMsIHJhdywgcHJvcHMpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaW5wdXRGaWxlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy9maWxlIG5hbWVcbiAgICAgICAgcmVxdWlyZShcImZzXCIpLnJlYWRGaWxlKGlucHV0RmlsZSwgZnVuY3Rpb24gKGVycm9yLCBkYXRhKSB7XG4gICAgICAgICAgaWYgKGVycm9yKSByZWplY3QoZXJyb3IpO1xuICAgICAgICAgIGVsc2UgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgIHBhcnNlKGRhdGEsIHtcbiAgICAgICAgICAgICAgbmFtZTogaW5wdXRGaWxlXG4gICAgICAgICAgICAgICAgLnNwbGl0KC9bXFwvXFxcXF0vKVxuICAgICAgICAgICAgICAgIC5wb3AoKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC5kb2N4JC9pLCBcIlwiKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIHBhcnNlKFxuICAgICAgICAgICAgZS50YXJnZXQucmVzdWx0LFxuICAgICAgICAgICAgaW5wdXRGaWxlLm5hbWVcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiBpbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCBcIlwiKSxcbiAgICAgICAgICAgICAgICAgIGxhc3RNb2RpZmllZDogaW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcbiAgICAgICAgICAgICAgICAgIHNpemU6IGlucHV0RmlsZS5zaXplLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiB7IHNpemU6IGlucHV0RmlsZS5zaXplIH1cbiAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgICAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlKGlucHV0RmlsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlKCkge1xuICAgIHJldHVybiB0aGlzLmxvYWQoYCR7X19kaXJuYW1lfS8uLi90ZW1wbGF0ZXMvYmxhbmsuJHt0aGlzLmV4dH1gKTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZVhtbChkYXRhKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBvcHQgPSB7IHhtbE1vZGU6IHRydWUsIGRlY29kZUVudGl0aWVzOiBmYWxzZSB9O1xuICAgICAgbGV0IGhhbmRsZXIgPSBuZXcgQ29udGVudERvbUhhbmRsZXIob3B0KTtcbiAgICAgIG5ldyBQYXJzZXIoaGFuZGxlciwgb3B0KS5lbmQoZGF0YSk7XG4gICAgICBsZXQgcGFyc2VkID0gY2hlZXIubG9hZChoYW5kbGVyLmRvbSwgb3B0KTtcbiAgICAgIGlmICh0eXBlb2YgcGFyc2VkLmNoZWVyaW8gPT0gXCJ1bmRlZmluZWRcIikgcGFyc2VkLmNoZWVyaW8gPSBcImN1c3RvbWl6ZWRcIjtcbiAgICAgIHJldHVybiBwYXJzZWQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIENvbnRlbnREb21IYW5kbGVyIGV4dGVuZHMgRG9tSGFuZGxlciB7XG4gIF9hZGREb21FbGVtZW50KGVsKSB7XG4gICAgaWYgKFxuICAgICAgZWwudHlwZSA9PSBcInRleHRcIiAmJlxuICAgICAgKGVsLmRhdGFbMF0gPT0gXCJcXHJcIiB8fCBlbC5kYXRhWzBdID09IFwiXFxuXCIpIC8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xuICAgICk7XG4gICAgZWxzZSByZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpO1xuICB9XG59XG4iXX0=