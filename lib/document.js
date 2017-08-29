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
		this._shouldReleased = new Map();
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
		key: "getDataPartAsUrl",
		value: function getDataPartAsUrl(name) {
			var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "*/*";

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

					window.URL.revokeObjectURL(url);
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
				var data = newDoc.generate(_extends({}, options, { type: "blob", mimeType: this.constructor.mime }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJfc2hvdWxkUmVsZWFzZWQiLCJNYXAiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwidHlwZSIsImhhcyIsInNldCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJnZXREYXRhUGFydCIsImdldCIsInVybCIsIndpbmRvdyIsInJldm9rZU9iamVjdFVSTCIsImNoZWVyaW8iLCJjb25zdHJ1Y3RvciIsInBhcnNlWG1sIiwiYXNUZXh0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicGF0aCIsImZpbGUiLCJ4bWwiLCJvcHRpb25zIiwiRGF0ZSIsIm5vdyIsInNlcmlhbGl6ZSIsImRvY3VtZW50IiwiZ2VuZXJhdGUiLCJtaW1lVHlwZSIsIm1pbWUiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJkZWNvZGVFbnRpdGllcyIsImhhbmRsZXIiLCJDb250ZW50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R0FBSSxTO0FBRFNuRixXLENBRWIwQyxJLEdBQUssaUI7a0JBRlExQyxXOztJQXdMZndGLGlCOzs7Ozs7Ozs7OztpQ0FDVUssRSxFQUFHO0FBQ2pCLE9BQUdBLEdBQUdqRixJQUFILElBQVMsTUFBVCxLQUFvQmlGLEdBQUduRixJQUFILENBQVEsQ0FBUixLQUFZLElBQVosSUFBb0JtRixHQUFHbkYsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFwRCxDQUFILEVBQ0MsQ0FERCxDQUNFO0FBREYsUUFHQyw0SUFBNEJtRixFQUE1QjtBQUNEIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwLCB7WmlwT2JqZWN0fSBmcm9tICdqc3ppcCdcclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXHJcblxyXG4vKipcclxuICogIGRvY3VtZW50IHBhcnNlclxyXG4gKlxyXG4gKiAgQGV4YW1wbGVcclxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcclxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xyXG5cdHN0YXRpYyBleHQ9XCJ1bmtub3duXCJcclxuXHRzdGF0aWMgbWltZT1cImFwcGxpY2F0aW9uL3ppcFwiXHJcblxyXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XHJcblx0XHR0aGlzLnBhcnRzPXBhcnRzXHJcblx0XHR0aGlzLnJhdz1yYXdcclxuXHRcdHRoaXMucHJvcHM9cHJvcHNcclxuXHRcdHRoaXMuX3Nob3VsZFJlbGVhc2VkPW5ldyBNYXAoKVxyXG5cdH1cclxuXHJcblx0Z2V0UGFydChuYW1lKXtcclxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXHJcblx0fVxyXG5cclxuXHRnZXREYXRhUGFydChuYW1lKXtcclxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXHJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXHJcblx0XHRkYXRhLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzIvL3NvIGtlZXAgY3JjMzIgb24gcGFydC5fZGF0YSBmb3IgZnV0dXJlXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0YVBhcnRBc1VybChuYW1lLHR5cGU9XCIqLypcIil7XHJcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0aWYoIXRoaXMuX3Nob3VsZFJlbGVhc2VkLmhhcyhjcmMzMikpe1xyXG5cdFx0XHR0aGlzLl9zaG91bGRSZWxlYXNlZC5zZXQoY3JjMzIsVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbdGhpcy5nZXREYXRhUGFydChuYW1lKV0se3R5cGV9KSkpXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fc2hvdWxkUmVsZWFzZWQuZ2V0KGNyYzMyKVxyXG5cdH1cclxuXHJcblx0Z2V0UGFydENyYzMyKG5hbWUpe1xyXG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcclxuXHRcdHJldHVybiBjcmMzMlxyXG5cdH1cclxuXHJcblx0cmVsZWFzZSgpe1xyXG5cdFx0Zm9yKGxldCBbLCB1cmxdIG9mIHRoaXMuX3Nob3VsZFJlbGVhc2VkKXtcclxuXHRcdFx0d2luZG93LlVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0T2JqZWN0UGFydChuYW1lKXtcclxuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0aWYoIXBhcnQpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcclxuXHRcdFx0cmV0dXJuIHBhcnRcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbChwYXJ0LmFzVGV4dCgpKVxyXG5cdH1cclxuXHRcclxuXHRwYXJzZShkb21IYW5kbGVyKXtcclxuXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHJcblx0fVxyXG5cdFxyXG5cdHNlcmlhbGl6ZSgpe1xyXG5cdFx0bGV0IG5ld0RvYz1uZXcgSlNaaXAoKVxyXG5cdFx0T2JqZWN0LmtleXModGhpcy5wYXJ0cykuZm9yRWFjaChwYXRoPT57XHJcblx0XHRcdGxldCBwYXJ0PXRoaXMucGFydHNbcGF0aF1cclxuXHRcdFx0aWYocGFydC5jaGVlcmlvKXtcclxuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQueG1sKCkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC5fZGF0YSwgcGFydC5vcHRpb25zKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0cmV0dXJuIG5ld0RvY1xyXG5cdH1cclxuXHJcblx0c2F2ZShmaWxlLG9wdGlvbnMpe1xyXG5cdFx0ZmlsZT1maWxlfHx0aGlzLnByb3BzLm5hbWV8fGAke0RhdGUubm93KCl9LmRvY3hgXHJcblx0XHRcclxuXHRcdGxldCBuZXdEb2M9dGhpcy5zZXJpYWxpemUoKVxyXG5cdFx0XHJcblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xyXG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcImJsb2JcIixtaW1lVHlwZTp0aGlzLmNvbnN0cnVjdG9yLm1pbWV9KVxyXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcclxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChsaW5rKVxyXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxyXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XHJcblx0XHRcdGxpbmsuY2xpY2soKVxyXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXHJcblx0XHRcdHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybClcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcIm5vZGVidWZmZXJcIn0pXHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5cclxuXHRcdFx0XHRyZXF1aXJlKFwiZlwiK1wic1wiKS53cml0ZUZpbGUoZmlsZSxkYXRhLGVycm9yPT57XHJcblx0XHRcdFx0XHRlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0KVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2xvbmUoKXtcclxuXHRcdGxldCB6aXA9bmV3IEpTWmlwKClcclxuXHRcdGxldCBwcm9wcz0gcHJvcHMgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKSA6IHByb3BzXHJcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9PntcclxuXHRcdFx0bGV0IHY9dGhpcy5wYXJ0c1trXVxyXG5cdFx0XHRpZih2LmNoZWVyaW8pe1xyXG5cdFx0XHRcdHN0YXRlW2tdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwodi54bWwoKSlcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0emlwLmZpbGUodi5uYW1lLHYuX2RhdGEsdi5vcHRpb25zKVxyXG5cdFx0XHRcdHN0YXRlW2tdPXppcC5maWxlKHYubmFtZSlcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se30pXHJcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IocGFydHMsemlwLCBwcm9wcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcclxuXHJcblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXHJcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XHJcblx0ICovXHJcblxyXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XHJcblx0XHRjb25zdCBEb2N1bWVudFNlbGY9dGhpc1xyXG5cclxuXHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIFppcERvY3VtZW50KVxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlucHV0RmlsZSlcclxuXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xyXG5cdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdGxldCByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XHJcblx0XHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXHJcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGVycm9yKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XHJcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIChpbnB1dEZpbGUubmFtZSA/IHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcclxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBDb250ZW50RG9tSGFuZGxlcihvcHQpXHJcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxyXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxyXG5cdFx0XHRpZih0eXBlb2YocGFyc2VkLmNoZWVyaW8pPT1cInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXHJcblx0XHRcdHJldHVybiBwYXJzZWRcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XHJcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xyXG5cdFx0aWYoZWwudHlwZT09XCJ0ZXh0XCIgJiYgKGVsLmRhdGFbMF09PSdcXHInIHx8IGVsLmRhdGFbMF09PSdcXG4nKSlcclxuXHRcdFx0Oy8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpXHJcblx0fVxyXG59XHJcbiJdfQ==