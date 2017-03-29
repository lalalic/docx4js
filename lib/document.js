"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
			if (typeof document != "undefined" && window.URL && window.URL.createObjectURL) {
				var data = newDoc.generate({ type: "blob" });
				var url = window.URL.createObjectURL(data);
				var link = document.createElement("a");
				document.body.appendChild(link);
				link.download = file;
				link.href = url;
				link.click();
				document.body.removeChild(link);
			} else {
				var _ret = function () {
					var data = newDoc.generate({ type: "nodebuffer" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiZmlsZSIsIkRhdGUiLCJub3ciLCJuZXdEb2MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInBhdGgiLCJ4bWwiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJnZW5lcmF0ZSIsInR5cGUiLCJ1cmwiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiZGVjb2RlRW50aXRpZXMiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztB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RCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCwge1ppcE9iamVjdH0gZnJvbSAnanN6aXAnXHJcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXHJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxyXG5cclxuLyoqXHJcbiAqICBkb2N1bWVudCBwYXJzZXJcclxuICpcclxuICogIEBleGFtcGxlXHJcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXHJcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaXBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xyXG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xyXG5cdFx0dGhpcy5yYXc9cmF3XHJcblx0XHR0aGlzLnByb3BzPXByb3BzXHJcblx0fVxyXG5cclxuXHRnZXRQYXJ0KG5hbWUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cclxuXHR9XHJcblxyXG5cdGdldERhdGFQYXJ0KG5hbWUpe1xyXG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcclxuXHRcdGxldCBkYXRhPXBhcnQuYXNVaW50OEFycmF5KCkvL3Vuc2FmZSBjYWxsLCBwYXJ0Ll9kYXRhIGlzIGNoYW5nZWRcclxuXHRcdGRhdGEuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMi8vc28ga2VlcCBjcmMzMiBvbiBwYXJ0Ll9kYXRhIGZvciBmdXR1cmVcclxuXHRcdHJldHVybiBkYXRhXHJcblx0fVxyXG5cclxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xyXG5cdFx0Y29uc3QgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHRpZighcGFydClcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdGVsc2UgaWYocGFydC5jaGVlcmlvKVxyXG5cdFx0XHRyZXR1cm4gcGFydFxyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHBhcnQuYXNUZXh0KCkpXHJcblx0fVxyXG5cclxuXHRwYXJzZShkb21IYW5kbGVyKXtcclxuXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHJcblx0fVxyXG5cclxuXHRzYXZlKGZpbGUpe1xyXG5cdFx0ZmlsZT1maWxlfHxgJHtEYXRlLm5vdygpfS5kb2N4YFxyXG5cdFx0XHJcblx0XHRsZXQgbmV3RG9jPW5ldyBKU1ppcCgpXHJcblx0XHRPYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5mb3JFYWNoKHBhdGg9PntcclxuXHRcdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1twYXRoXVxyXG5cdFx0XHRpZihwYXJ0LmNoZWVyaW8pe1xyXG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC54bWwoKSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0Ll9kYXRhLCBwYXJ0Lm9wdGlvbnMpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xyXG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoe3R5cGU6XCJibG9iXCJ9KVxyXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcclxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxyXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0bGV0IGRhdGE9bmV3RG9jLmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PlxyXG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9PntcclxuXHRcdFx0XHRcdGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoZGF0YSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHQpXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjbG9uZSgpe1xyXG5cdFx0bGV0IHppcD1uZXcgSlNaaXAoKVxyXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcclxuXHRcdGxldCBwYXJ0cz1PYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5yZWR1Y2UoKHN0YXRlLCBrKT0+e1xyXG5cdFx0XHRsZXQgdj10aGlzLnBhcnRzW2tdXHJcblx0XHRcdGlmKHYuY2hlZXJpbyl7XHJcblx0XHRcdFx0c3RhdGVba109dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbCh2LnhtbCgpKVxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHR6aXAuZmlsZSh2Lm5hbWUsdi5fZGF0YSx2Lm9wdGlvbnMpXHJcblx0XHRcdFx0c3RhdGVba109emlwLmZpbGUodi5uYW1lKVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBzdGF0ZVxyXG5cdFx0fSx7fSlcclxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihwYXJ0cyx6aXAsIHByb3BzKVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxyXG5cclxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcclxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHJcblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcclxuXHRcdGNvbnN0IERvY3VtZW50U2VsZj10aGlzXHJcblx0XHRcclxuXHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIFppcERvY3VtZW50KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlucHV0RmlsZSlcclxuXHRcdFxyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcclxuXHRcdFx0XHR0cnl7XHJcblx0XHRcdFx0XHRsZXQgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxyXG5cdFx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcclxuXHRcdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxyXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcclxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XHJcblx0XHRcdFx0XHRpZihlcnJvcilcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XHJcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xyXG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCAoaW5wdXRGaWxlLm5hbWUgPyB7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcclxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcclxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXHJcblx0XHRcdFx0XHRcdH0gOiB7c2l6ZTppbnB1dEZpbGUuc2l6ZX0pKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBjcmVhdGUoKXtcclxuXHRcdHJldHVybiB0aGlzLmxvYWQoYCR7X19kaXJuYW1lfS8uLi90ZW1wbGF0ZXMvYmxhbmsuJHt0aGlzLmV4dH1gKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIHBhcnNlWG1sKGRhdGEpe1xyXG5cdFx0dHJ5e1xyXG5cdFx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWUsZGVjb2RlRW50aXRpZXM6IGZhbHNlfVxyXG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgQ29udGVudERvbUhhbmRsZXIob3B0KVxyXG5cdFx0XHRuZXcgUGFyc2VyKGhhbmRsZXIsb3B0KS5lbmQoZGF0YSlcclxuXHRcdFx0bGV0IHBhcnNlZD1jaGVlci5sb2FkKGhhbmRsZXIuZG9tLG9wdClcclxuXHRcdFx0aWYodHlwZW9mKHBhcnNlZC5jaGVlcmlvKT09XCJ1bmRlZmluZWRcIilcclxuXHRcdFx0XHRwYXJzZWQuY2hlZXJpbz1cImN1c3RvbWl6ZWRcIlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VkXHJcblx0XHR9Y2F0Y2goZXJyb3Ipe1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuY2xhc3MgQ29udGVudERvbUhhbmRsZXIgZXh0ZW5kcyBEb21IYW5kbGVye1xyXG5cdF9hZGREb21FbGVtZW50KGVsKXtcclxuXHRcdGlmKGVsLnR5cGU9PVwidGV4dFwiICYmIChlbC5kYXRhWzBdPT0nXFxyJyB8fCBlbC5kYXRhWzBdPT0nXFxuJykpXHJcblx0XHRcdDsvL3JlbW92ZSBmb3JtYXQgd2hpdGVzcGFjZXNcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHN1cGVyLl9hZGREb21FbGVtZW50KGVsKVxyXG5cdH1cclxufVxyXG4iXX0=