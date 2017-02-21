"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _htmlparser = require("htmlparser2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
	}

	_createClass(ZipDocument, [{
		key: "getPart",
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: "getDataPart",
		value: function getDataPart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var data = part.asUint8Array(); //unsafe call, part._data is changed
			data.crc32 = part._data.crc32 = crc32; //so keep crc32 on part._data for future
			return data;
		}
	}, {
		key: "getObjectPart",
		value: function getObjectPart(name) {
			var part = this.parts[name];
			if (!part) return null;else if (part.cheerio) return part;else return this.parts[name] = this.constructor.parseXml(part.asText());
		}
	}, {
		key: "parse",
		value: function parse(domHandler) {}
	}, {
		key: "render",
		value: function render() {}
	}, {
		key: "save",
		value: function save(file) {
			var _this = this;

			file = file || Date.now() + ".docx";

			var newDoc = new _jszip2.default();
			Object.keys(this.parts).forEach(function (path) {
				var part = _this.parts[path];
				if (part.cheerio) {
					newDoc.file(path, part.xml());
				} else {
					newDoc.file(path, part._data, part.options);
				}
			});
			var data = newDoc.generate({ type: "nodebuffer" });
			if (typeof document != "undefined" && window.URL && window.URL.createObjectURL) {
				var url = window.URL.createObjectURL(data);
				var link = document.createElement("a");
				document.body.appendChild(link);
				link.download = file;
				link.href = url;
				link.click();
				document.body.removeChild(link);
			} else {
				return new Promise(function (resolve, reject) {
					return require("f" + "s").writeFile(file, data, function (error) {
						error ? reject(error) : resolve(data);
					});
				});
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
					state[k] = _this2.constructor.parseXml(v.xml());
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
			return new Promise(function (resolve, reject) {
				function parse(data) {
					var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

					var raw = new _jszip2.default(data),
					    parts = {};
					raw.filter(function (path, file) {
						return parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, props));
				}

				if (typeof inputFile == 'string') {
					//file name
					require('fs').readFile(inputFile, function (error, data) {
						if (error) reject(error);else if (data) {
							parse(data, { name: inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, '') });
						}
					});
				} else if (inputFile instanceof Blob) {
					var reader = new FileReader();
					reader.onload = function (e) {
						parse(e.target.result, {
							name: inputFile.name.replace(/\.docx$/i, ''),
							lastModified: inputFile.lastModified,
							size: inputFile.size
						});
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
				var opt = { xmlMode: true };
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
			if (el.type == "text" && (el.data[0] == '\r' || el.data[0] == '\n')) ; //remove format whitespaces
			else return _get(ContentDomHandler.prototype.__proto__ || Object.getPrototypeOf(ContentDomHandler.prototype), "_addDomElement", this).call(this, el);
		}
	}]);

	return ContentDomHandler;
}(_htmlparser.DomHandler);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiZmlsZSIsIkRhdGUiLCJub3ciLCJuZXdEb2MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInBhdGgiLCJ4bWwiLCJvcHRpb25zIiwiZ2VuZXJhdGUiLCJ0eXBlIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ1cmwiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiaGFuZGxlciIsIkNvbnRlbnREb21IYW5kbGVyIiwiZW5kIiwicGFyc2VkIiwiZG9tIiwiY29uc29sZSIsImVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPcUJBLFc7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QUksRUFBQ0MsU0FBUSxJQUFULEVBQVI7QUFDQSxRQUFJQyxVQUFRLElBQUlDLGlCQUFKLENBQXNCSCxHQUF0QixDQUFaO0FBQ0EsMkJBQVdFLE9BQVgsRUFBbUJGLEdBQW5CLEVBQXdCSSxHQUF4QixDQUE0QnRFLElBQTVCO0FBQ0EsUUFBSXVFLFNBQU8sa0JBQU1SLElBQU4sQ0FBV0ssUUFBUUksR0FBbkIsRUFBdUJOLEdBQXZCLENBQVg7QUFDQSxRQUFHLE9BQU9LLE9BQU9yRSxPQUFkLElBQXdCLFdBQTNCLEVBQ0NxRSxPQUFPckUsT0FBUCxHQUFlLFlBQWY7QUFDRCxXQUFPcUUsTUFBUDtBQUNBLElBUkQsQ0FRQyxPQUFNbEMsS0FBTixFQUFZO0FBQ1pvQyxZQUFRcEMsS0FBUixDQUFjQSxLQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0E7QUFDRDs7Ozs7O2tCQTVJbUI3QyxXOztJQStJZjZFLGlCOzs7Ozs7Ozs7OztpQ0FDVUssRSxFQUFHO0FBQ2pCLE9BQUdBLEdBQUd4RCxJQUFILElBQVMsTUFBVCxLQUFvQndELEdBQUcxRSxJQUFILENBQVEsQ0FBUixLQUFZLElBQVosSUFBb0IwRSxHQUFHMUUsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFwRCxDQUFILEVBQ0MsQ0FERCxDQUNFO0FBREYsUUFHQyw0SUFBNEIwRSxFQUE1QjtBQUNEIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwLCB7WmlwT2JqZWN0fSBmcm9tICdqc3ppcCdcclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXHJcblxyXG4vKipcclxuICogIGRvY3VtZW50IHBhcnNlclxyXG4gKlxyXG4gKiAgQGV4YW1wbGVcclxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcclxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XHJcblx0XHR0aGlzLnBhcnRzPXBhcnRzXHJcblx0XHR0aGlzLnJhdz1yYXdcclxuXHRcdHRoaXMucHJvcHM9cHJvcHNcclxuXHR9XHJcblxyXG5cdGdldFBhcnQobmFtZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0YVBhcnQobmFtZSl7XHJcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0bGV0IGRhdGE9cGFydC5hc1VpbnQ4QXJyYXkoKS8vdW5zYWZlIGNhbGwsIHBhcnQuX2RhdGEgaXMgY2hhbmdlZFxyXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XHJcblx0XHRjb25zdCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGlmKCFwYXJ0KVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0ZWxzZSBpZihwYXJ0LmNoZWVyaW8pXHJcblx0XHRcdHJldHVybiBwYXJ0XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwocGFydC5hc1RleHQoKSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xyXG5cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdHNhdmUoZmlsZSl7XHJcblx0XHRmaWxlPWZpbGV8fGAke0RhdGUubm93KCl9LmRvY3hgXHJcblx0XHRcclxuXHRcdGxldCBuZXdEb2M9bmV3IEpTWmlwKClcclxuXHRcdE9iamVjdC5rZXlzKHRoaXMucGFydHMpLmZvckVhY2gocGF0aD0+e1xyXG5cdFx0XHRsZXQgcGFydD10aGlzLnBhcnRzW3BhdGhdXHJcblx0XHRcdGlmKHBhcnQuY2hlZXJpbyl7XHJcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0LnhtbCgpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQuX2RhdGEsIHBhcnQub3B0aW9ucylcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7dHlwZTpcIm5vZGVidWZmZXJcIn0pXHJcblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xyXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcclxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxyXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PlxyXG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9PntcclxuXHRcdFx0XHRcdGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbG9uZSgpe1xyXG5cdFx0bGV0IHppcD1uZXcgSlNaaXAoKVxyXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcclxuXHRcdGxldCBwYXJ0cz1PYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5yZWR1Y2UoKHN0YXRlLCBrKT0+e1xyXG5cdFx0XHRsZXQgdj10aGlzLnBhcnRzW2tdXHJcblx0XHRcdGlmKHYuY2hlZXJpbyl7XHJcblx0XHRcdFx0c3RhdGVba109dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbCh2LnhtbCgpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR6aXAuZmlsZSh2Lm5hbWUsdi5fZGF0YSx2Lm9wdGlvbnMpXHJcblx0XHRcdFx0c3RhdGVba109emlwLmZpbGUodi5uYW1lKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7fSlcclxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihwYXJ0cyx6aXAsIHByb3BzKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxyXG5cclxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcclxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHJcblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcclxuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcclxuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxyXG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXHJcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGVycm9yKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XHJcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgY3JlYXRlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sb2FkKGAke19fZGlybmFtZX0vLi4vdGVtcGxhdGVzL2JsYW5rLiR7dGhpcy5leHR9YClcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBwYXJzZVhtbChkYXRhKXtcclxuXHRcdHRyeXtcclxuXHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxyXG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgQ29udGVudERvbUhhbmRsZXIob3B0KVxyXG5cdFx0XHRuZXcgUGFyc2VyKGhhbmRsZXIsb3B0KS5lbmQoZGF0YSlcclxuXHRcdFx0bGV0IHBhcnNlZD1jaGVlci5sb2FkKGhhbmRsZXIuZG9tLG9wdClcclxuXHRcdFx0aWYodHlwZW9mKHBhcnNlZC5jaGVlcmlvKT09XCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRwYXJzZWQuY2hlZXJpbz1cImN1c3RvbWl6ZWRcIlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VkXHJcblx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29udGVudERvbUhhbmRsZXIgZXh0ZW5kcyBEb21IYW5kbGVye1xyXG5cdF9hZGREb21FbGVtZW50KGVsKXtcclxuXHRcdGlmKGVsLnR5cGU9PVwidGV4dFwiICYmIChlbC5kYXRhWzBdPT0nXFxyJyB8fCBlbC5kYXRhWzBdPT0nXFxuJykpXHJcblx0XHRcdDsvL3JlbW92ZSBmb3JtYXQgd2hpdGVzcGFjZXNcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl9hZGREb21FbGVtZW50KGVsKVxyXG5cdH1cclxufVxyXG4iXX0=