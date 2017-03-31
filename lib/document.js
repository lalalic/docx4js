"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
		value: function save(file, options) {
			var _this = this;

			file = file || this.props.name || Date.now() + ".docx";

			var newDoc = new _jszip2.default();
			Object.keys(this.parts).forEach(function (path) {
				var part = _this.parts[path];
				if (part.cheerio) {
					newDoc.file(path, part.xml());
				} else {
					newDoc.file(path, part._data, part.options);
				}
			});
			if (typeof document != "undefined" && window.URL && window.URL.createObjectURL) {
				var data = newDoc.generate(_extends({}, options, { type: "blob", mimeType: this.constructor.mime }));
				var url = window.URL.createObjectURL(data);
				var link = document.createElement("a");
				document.body.appendChild(link);
				link.download = file;
				link.href = url;
				link.click();
				document.body.removeChild(link);
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
						parse(e.target.result, inputFile.name ? {
							name: inputFile.name.replace(/\.docx$/i, ''),
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
			if (el.type == "text" && (el.data[0] == '\r' || el.data[0] == '\n')) ; //remove format whitespaces
			else return _get(ContentDomHandler.prototype.__proto__ || Object.getPrototypeOf(ContentDomHandler.prototype), "_addDomElement", this).call(this, el);
		}
	}]);

	return ContentDomHandler;
}(_htmlparser.DomHandler);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiZmlsZSIsIm9wdGlvbnMiLCJEYXRlIiwibm93IiwibmV3RG9jIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJwYXRoIiwieG1sIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJnZW5lcmF0ZSIsInR5cGUiLCJtaW1lVHlwZSIsIm1pbWUiLCJ1cmwiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiZGVjb2RlRW50aXRpZXMiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFD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QSxHQUFHdkQsSUFBSCxJQUFTLE1BQVQsS0FBb0J1RCxHQUFHN0UsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFaLElBQW9CNkUsR0FBRzdFLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBcEQsQ0FBSCxFQUNDLENBREQsQ0FDRTtBQURGLFFBR0MsNElBQTRCNkUsRUFBNUI7QUFDRCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCwge1ppcE9iamVjdH0gZnJvbSAnanN6aXAnXHJcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXHJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxyXG5cclxuLyoqXHJcbiAqICBkb2N1bWVudCBwYXJzZXJcclxuICpcclxuICogIEBleGFtcGxlXHJcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXHJcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaXBEb2N1bWVudHtcclxuXHRzdGF0aWMgZXh0PVwidW5rbm93blwiXHJcblx0c3RhdGljIG1pbWU9XCJhcHBsaWNhdGlvbi96aXBcIlxyXG5cdFxyXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XHJcblx0XHR0aGlzLnBhcnRzPXBhcnRzXHJcblx0XHR0aGlzLnJhdz1yYXdcclxuXHRcdHRoaXMucHJvcHM9cHJvcHNcclxuXHR9XHJcblxyXG5cdGdldFBhcnQobmFtZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0YVBhcnQobmFtZSl7XHJcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0bGV0IGRhdGE9cGFydC5hc1VpbnQ4QXJyYXkoKS8vdW5zYWZlIGNhbGwsIHBhcnQuX2RhdGEgaXMgY2hhbmdlZFxyXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XHJcblx0XHRjb25zdCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGlmKCFwYXJ0KVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0ZWxzZSBpZihwYXJ0LmNoZWVyaW8pXHJcblx0XHRcdHJldHVybiBwYXJ0XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwocGFydC5hc1RleHQoKSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xyXG5cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdHNhdmUoZmlsZSxvcHRpb25zKXtcclxuXHRcdGZpbGU9ZmlsZXx8dGhpcy5wcm9wcy5uYW1lfHxgJHtEYXRlLm5vdygpfS5kb2N4YFxyXG5cdFx0XHJcblx0XHRsZXQgbmV3RG9jPW5ldyBKU1ppcCgpXHJcblx0XHRPYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5mb3JFYWNoKHBhdGg9PntcclxuXHRcdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1twYXRoXVxyXG5cdFx0XHRpZihwYXJ0LmNoZWVyaW8pe1xyXG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC54bWwoKSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0Ll9kYXRhLCBwYXJ0Lm9wdGlvbnMpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xyXG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcImJsb2JcIixtaW1lVHlwZTp0aGlzLmNvbnN0cnVjdG9yLm1pbWV9KVxyXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcclxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxyXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGRhdGE9bmV3RG9jLmdlbmVyYXRlKHsuLi5vcHRpb25zLHR5cGU6XCJub2RlYnVmZmVyXCJ9KVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XHJcblx0XHRcdFx0cmVxdWlyZShcImZcIitcInNcIikud3JpdGVGaWxlKGZpbGUsZGF0YSxlcnJvcj0+e1xyXG5cdFx0XHRcdFx0ZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsb25lKCl7XHJcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXHJcblx0XHRsZXQgcHJvcHM9IHByb3BzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKSkgOiBwcm9wc1xyXG5cdFx0bGV0IHBhcnRzPU9iamVjdC5rZXlzKHRoaXMucGFydHMpLnJlZHVjZSgoc3RhdGUsIGspPT57XHJcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cclxuXHRcdFx0aWYodi5jaGVlcmlvKXtcclxuXHRcdFx0XHRzdGF0ZVtrXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHYueG1sKCkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHppcC5maWxlKHYubmFtZSx2Ll9kYXRhLHYub3B0aW9ucylcclxuXHRcdFx0XHRzdGF0ZVtrXT16aXAuZmlsZSh2Lm5hbWUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt9KVxyXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXHJcblxyXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxyXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cclxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xyXG5cdFx0Y29uc3QgRG9jdW1lbnRTZWxmPXRoaXNcclxuXHRcdFxyXG5cdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgWmlwRG9jdW1lbnQpXHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5wdXRGaWxlKVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xyXG5cdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdGxldCByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XHJcblx0XHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXHJcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGVycm9yKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XHJcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIChpbnB1dEZpbGUubmFtZSA/IHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcclxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBDb250ZW50RG9tSGFuZGxlcihvcHQpXHJcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxyXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxyXG5cdFx0XHRpZih0eXBlb2YocGFyc2VkLmNoZWVyaW8pPT1cInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXHJcblx0XHRcdHJldHVybiBwYXJzZWRcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XHJcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xyXG5cdFx0aWYoZWwudHlwZT09XCJ0ZXh0XCIgJiYgKGVsLmRhdGFbMF09PSdcXHInIHx8IGVsLmRhdGFbMF09PSdcXG4nKSlcclxuXHRcdFx0Oy8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpXHJcblx0fVxyXG59XHJcbiJdfQ==