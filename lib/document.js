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

var normalize = function normalize(path) {
	return path.split("/").filter(function (a) {
		return a != ".";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJwYXRoIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwicmVkdWNlUmlnaHQiLCJuIiwiciIsInRyaW1lZCIsInVuc2hpZnQiLCJqb2luIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwiX3Nob3VsZFJlbGVhc2VkIiwiTWFwIiwiYXJndW1lbnRzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsInR5cGUiLCJoYXMiLCJzZXQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZ2V0RGF0YVBhcnQiLCJnZXQiLCJ1cmwiLCJyZXZva2VPYmplY3RVUkwiLCJjaGVlcmlvIiwiY29uc3RydWN0b3IiLCJwYXJzZVhtbCIsImFzVGV4dCIsImRvbUhhbmRsZXIiLCJuZXdEb2MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImZpbGUiLCJ4bWwiLCJvcHRpb25zIiwiRGF0ZSIsIm5vdyIsInNlcmlhbGl6ZSIsImRvY3VtZW50Iiwid2luZG93IiwiZ2VuZXJhdGUiLCJtaW1lVHlwZSIsIm1pbWUiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJyZWFkRmlsZSIsInBvcCIsInJlcGxhY2UiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiZGVjb2RlRW50aXRpZXMiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxZQUFVLFNBQVZBLFNBQVU7QUFBQSxRQUFNQyxLQUFLQyxLQUFMLENBQVcsR0FBWCxFQUFnQkMsTUFBaEIsQ0FBdUI7QUFBQSxTQUFHQyxLQUFHLEdBQU47QUFBQSxFQUF2QixFQUNwQkMsV0FEb0IsQ0FDUixVQUFDQyxDQUFELEVBQUdGLENBQUgsRUFBTztBQUNuQixNQUFHQSxLQUFHLElBQU4sRUFBVztBQUNWRSxLQUFFQyxDQUFGO0FBQ0EsR0FGRCxNQUVNLElBQUdELEVBQUVDLENBQUwsRUFBTztBQUNaRCxLQUFFQyxDQUFGO0FBQ0EsR0FGSyxNQUVEO0FBQ0pELEtBQUVFLE1BQUYsQ0FBU0MsT0FBVCxDQUFpQkwsQ0FBakI7QUFDQTtBQUNELFNBQU9FLENBQVA7QUFDQSxFQVZvQixFQVVuQixFQUFDRSxRQUFPLEVBQVIsRUFBV0QsR0FBRSxDQUFiLEVBVm1CLEVBVUZDLE1BVkUsQ0FVS0UsSUFWTCxDQVVVLEdBVlYsQ0FBTjtBQUFBLENBQWhCO0FBV0E7Ozs7Ozs7O0lBT3FCQyxXO0FBSXBCLHNCQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsZUFBTCxHQUFxQixJQUFJQyxHQUFKLEVBQXJCO0FBQ0E7Ozs7a0NBRWM7QUFDZCxVQUFPaEIsMkJBQWFpQixTQUFiLENBQVA7QUFDQTs7OzBCQUVPQyxJLEVBQUs7QUFDWkEsVUFBS2xCLFVBQVVrQixJ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LENBQ0U7QUFERixRQUdDLDRJQUE0QmdGLEVBQTVCO0FBQ0QiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAsIHtaaXBPYmplY3R9IGZyb20gJ2pzemlwJ1xuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxuXG5jb25zdCBub3JtYWxpemU9cGF0aD0+cGF0aC5zcGxpdChcIi9cIikuZmlsdGVyKGE9PmEhPVwiLlwiKVxuXHQucmVkdWNlUmlnaHQoKG4sYSk9Pntcblx0XHRpZihhPT1cIi4uXCIpe1xuXHRcdFx0bi5yKytcblx0XHR9ZWxzZSBpZihuLnIpe1xuXHRcdFx0bi5yLS1cblx0XHR9ZWxzZXtcblx0XHRcdG4udHJpbWVkLnVuc2hpZnQoYSlcblx0XHR9XG5cdFx0cmV0dXJuIG5cblx0fSx7dHJpbWVkOltdLHI6MH0pLnRyaW1lZC5qb2luKFwiL1wiKVxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWmlwRG9jdW1lbnR7XG5cdHN0YXRpYyBleHQ9XCJ1bmtub3duXCJcblx0c3RhdGljIG1pbWU9XCJhcHBsaWNhdGlvbi96aXBcIlxuXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0XHR0aGlzLl9zaG91bGRSZWxlYXNlZD1uZXcgTWFwKClcblx0fVxuXG5cdG5vcm1hbGl6ZVBhdGgoKXtcblx0XHRyZXR1cm4gbm9ybWFsaXplKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdGdldFBhcnQobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cblx0Z2V0RGF0YVBhcnQobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXREYXRhUGFydEFzVXJsKG5hbWUsdHlwZT1cIiovKlwiKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdGlmKCF0aGlzLl9zaG91bGRSZWxlYXNlZC5oYXMoY3JjMzIpKXtcblx0XHRcdHRoaXMuX3Nob3VsZFJlbGVhc2VkLnNldChjcmMzMixVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmdldERhdGFQYXJ0KG5hbWUpXSx7dHlwZX0pKSlcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3Nob3VsZFJlbGVhc2VkLmdldChjcmMzMilcblx0fVxuXG5cdGdldFBhcnRDcmMzMihuYW1lKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHJldHVybiBjcmMzMlxuXHR9XG5cblx0cmVsZWFzZSgpe1xuXHRcdGZvcihsZXQgWywgdXJsXSBvZiB0aGlzLl9zaG91bGRSZWxlYXNlZCl7XG5cdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcblx0XHR9XG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0Y29uc3QgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0aWYoIXBhcnQpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2UgaWYocGFydC5jaGVlcmlvKVxuXHRcdFx0cmV0dXJuIHBhcnRcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHBhcnQuYXNUZXh0KCkpXG5cdH1cblxuXHRwYXJzZShkb21IYW5kbGVyKXtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cblx0fVxuXG5cdHNlcmlhbGl6ZSgpe1xuXHRcdGxldCBuZXdEb2M9bmV3IEpTWmlwKClcblx0XHRPYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5mb3JFYWNoKHBhdGg9Pntcblx0XHRcdGxldCBwYXJ0PXRoaXMucGFydHNbcGF0aF1cblx0XHRcdGlmKHBhcnQuY2hlZXJpbyl7XG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC54bWwoKSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQuX2RhdGEsIHBhcnQub3B0aW9ucylcblx0XHRcdH1cblx0XHR9KVxuXHRcdHJldHVybiBuZXdEb2Ncblx0fVxuXG5cdHNhdmUoZmlsZSxvcHRpb25zKXtcblx0XHRmaWxlPWZpbGV8fHRoaXMucHJvcHMubmFtZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGBcblxuXHRcdGxldCBuZXdEb2M9dGhpcy5zZXJpYWxpemUoKVxuXG5cdFx0aWYodHlwZW9mKGRvY3VtZW50KSE9XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuVVJMICYmIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwiYmxvYlwiLG1pbWVUeXBlOnRoaXMuY29uc3RydWN0b3IubWltZX0pXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcblx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxuXHRcdFx0bGluay5ocmVmID0gdXJsO1xuXHRcdFx0bGluay5jbGljaygpXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXG5cdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcIm5vZGVidWZmZXJcIn0pXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9Pntcblx0XHRcdFx0XHRlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y2xvbmUoKXtcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9Pntcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cblx0XHRcdGlmKHYuY2hlZXJpbyl7XG5cdFx0XHRcdHN0YXRlW2tdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwodi54bWwoKSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR6aXAuZmlsZSh2Lm5hbWUsdi5fZGF0YSx2Lm9wdGlvbnMpXG5cdFx0XHRcdHN0YXRlW2tdPXppcC5maWxlKHYubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0se30pXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXG5cdH1cblxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHRjb25zdCBEb2N1bWVudFNlbGY9dGhpc1xuXG5cdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgWmlwRG9jdW1lbnQpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlucHV0RmlsZSlcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xuXHRcdFx0XHR0cnl7XG5cdFx0XHRcdFx0bGV0IHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxuXHRcdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIChpbnB1dEZpbGUubmFtZSA/IHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0gOiB7c2l6ZTppbnB1dEZpbGUuc2l6ZX0pKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2FkKGAke19fZGlybmFtZX0vLi4vdGVtcGxhdGVzL2JsYW5rLiR7dGhpcy5leHR9YClcblx0fVxuXG5cdHN0YXRpYyBwYXJzZVhtbChkYXRhKXtcblx0XHR0cnl7XG5cdFx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWUsZGVjb2RlRW50aXRpZXM6IGZhbHNlfVxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IENvbnRlbnREb21IYW5kbGVyKG9wdClcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxuXHRcdFx0bGV0IHBhcnNlZD1jaGVlci5sb2FkKGhhbmRsZXIuZG9tLG9wdClcblx0XHRcdGlmKHR5cGVvZihwYXJzZWQuY2hlZXJpbyk9PVwidW5kZWZpbmVkXCIpXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXG5cdFx0XHRyZXR1cm4gcGFyc2VkXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XG5cdF9hZGREb21FbGVtZW50KGVsKXtcblx0XHRpZihlbC50eXBlPT1cInRleHRcIiAmJiAoZWwuZGF0YVswXT09J1xccicgfHwgZWwuZGF0YVswXT09J1xcbicpKVxuXHRcdFx0Oy8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBzdXBlci5fYWRkRG9tRWxlbWVudChlbClcblx0fVxufVxuIl19