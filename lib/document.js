"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

require("./cheerio-fn");

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
				return a.root || a.parent && root(a.parent);
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
				var _data = newDoc.generate(_extends({}, options, { type: "nodebuffer" }));
				return new Promise(function (resolve, reject) {
					return require("f" + "s").writeFile(file, _data, function (error) {
						error ? reject(error) : resolve(_data);
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
						var raw = new _jszip2.default(data),
						    parts = {};
						raw.filter(function (path, file) {
							return parts[path] = file;
						});
						resolve(new DocumentSelf(parts, raw, props));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJwYXRoIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwicmVkdWNlUmlnaHQiLCJuIiwiciIsInRyaW1lZCIsInVuc2hpZnQiLCJqb2luIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwiX3Nob3VsZFJlbGVhc2VkIiwiTWFwIiwiYXJndW1lbnRzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsInR5cGUiLCJoYXMiLCJzZXQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZ2V0RGF0YVBhcnQiLCJnZXQiLCJ1cmwiLCJyZXZva2VPYmplY3RVUkwiLCJjaGVlcmlvIiwiJCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJyb290IiwiYXR0cmlicyIsInByb3RvdHlwZSIsIm5vZGUiLCJwYXJlbnQiLCJnZXRPYmplY3RQYXJ0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsIkpTWmlwIiwia2V5cyIsImZvckVhY2giLCJmaWxlIiwieG1sIiwib3B0aW9ucyIsIkRhdGUiLCJub3ciLCJzZXJpYWxpemUiLCJkb2N1bWVudCIsIndpbmRvdyIsImdlbmVyYXRlIiwibWltZVR5cGUiLCJtaW1lIiwibGluayIsImNyZWF0ZUVsZW1lbnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiLCJkb3dubG9hZCIsImhyZWYiLCJjbGljayIsInJlbW92ZUNoaWxkIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJyZXF1aXJlIiwid3JpdGVGaWxlIiwiZXJyb3IiLCJ6aXAiLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJyZWR1Y2UiLCJzdGF0ZSIsImsiLCJ2IiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicmVhZEZpbGUiLCJwb3AiLCJyZXBsYWNlIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJsYXN0TW9kaWZpZWQiLCJzaXplIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJsb2FkIiwiX19kaXJuYW1lIiwiZXh0Iiwib3B0IiwieG1sTW9kZSIsImRlY29kZUVudGl0aWVzIiwiaGFuZGxlciIsIkNvbnRlbnREb21IYW5kbGVyIiwiUGFyc2VyIiwiZW5kIiwicGFyc2VkIiwiY2hlZXIiLCJkb20iLCJjb25zb2xlIiwiZWwiLCJEb21IYW5kbGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVUsU0FBVkEsU0FBVTtBQUFBLFFBQU1DLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxNQUFoQixDQUF1QjtBQUFBLFNBQUdDLEtBQUcsR0FBTjtBQUFBLEVBQXZCLEVBQ3BCQyxXQURvQixDQUNSLFVBQUNDLENBQUQsRUFBR0YsQ0FBSCxFQUFPO0FBQ25CLE1BQUdBLEtBQUcsSUFBTixFQUFXO0FBQ1ZFLEtBQUVDLENBQUY7QUFDQSxHQUZELE1BRU0sSUFBR0QsRUFBRUMsQ0FBTCxFQUFPO0FBQ1pELEtBQUVDLENBQUY7QUFDQSxHQUZLLE1BRUQ7QUFDSkQsS0FBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCTCxDQUFqQjtBQUNBO0FBQ0QsU0FBT0UsQ0FBUDtBQUNBLEVBVm9CLEVBVW5CLEVBQUNFLFFBQU8sRUFBUixFQUFXRCxHQUFFLENBQWIsRUFWbUIsRUFVRkMsTUFWRSxDQVVLRSxJQVZMLENBVVUsR0FWVixDQUFOO0FBQUEsQ0FBaEI7QUFXQTs7Ozs7Ozs7SUFPcUJDLFc7QUFJcEIsc0JBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFL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QUFHO0FBQ0YsUUFBSWdGLE1BQUksRUFBQ0MsU0FBUSxJQUFULEVBQWNDLGdCQUFnQixLQUE5QixFQUFSO0FBQ0EsUUFBSUMsVUFBUSxJQUFJQyxpQkFBSixDQUFzQkosR0FBdEIsQ0FBWjtBQUNBLFFBQUlLLGtCQUFKLENBQVdGLE9BQVgsRUFBbUJILEdBQW5CLEVBQXdCTSxHQUF4QixDQUE0QnRGLElBQTVCO0FBQ0EsUUFBSXVGLFNBQU9DLGtCQUFNWCxJQUFOLENBQVdNLFFBQVFNLEdBQW5CLEVBQXVCVCxHQUF2QixDQUFYO0FBQ0EsUUFBRyxPQUFPTyxPQUFPM0UsT0FBZCxJQUF3QixXQUEzQixFQUNDMkUsT0FBTzNFLE9BQVAsR0FBZSxZQUFmO0FBQ0QsV0FBTzJFLE1BQVA7QUFDQSxJQVJELENBUUMsT0FBTWpDLEtBQU4sRUFBWTtBQUNab0MsWUFBUXBDLEtBQVIsQ0FBY0EsS0FBZDtBQUNBLFdBQU8sSUFBUDtBQUNBO0FBQ0Q7Ozs7OztBQXhNbUJqRSxXLENBQ2IwRixHLEdBQUksUztBQURTMUYsVyxDQUVibUQsSSxHQUFLLGlCO2tCQUZRbkQsVzs7SUEyTWYrRixpQjs7Ozs7Ozs7Ozs7aUNBQ1VPLEUsRUFBRztBQUNqQixPQUFHQSxHQUFHekYsSUFBSCxJQUFTLE1BQVQsS0FBb0J5RixHQUFHM0YsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFaLElBQW9CMkYsR0FBRzNGLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBcEQsQ0FBSCxFQUNDLENBREQsQ0FDRTtBQURGLFFBR0MsNElBQTRCMkYsRUFBNUI7QUFDRDs7OztFQU44QkMsc0IiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5pbXBvcnQgY2hlZXIgZnJvbSBcImNoZWVyaW9cIlxuaW1wb3J0IFwiLi9jaGVlcmlvLWZuXCJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxuXG5jb25zdCBub3JtYWxpemU9cGF0aD0+cGF0aC5zcGxpdChcIi9cIikuZmlsdGVyKGE9PmEhPVwiLlwiKVxuXHQucmVkdWNlUmlnaHQoKG4sYSk9Pntcblx0XHRpZihhPT1cIi4uXCIpe1xuXHRcdFx0bi5yKytcblx0XHR9ZWxzZSBpZihuLnIpe1xuXHRcdFx0bi5yLS1cblx0XHR9ZWxzZXtcblx0XHRcdG4udHJpbWVkLnVuc2hpZnQoYSlcblx0XHR9XG5cdFx0cmV0dXJuIG5cblx0fSx7dHJpbWVkOltdLHI6MH0pLnRyaW1lZC5qb2luKFwiL1wiKVxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWmlwRG9jdW1lbnR7XG5cdHN0YXRpYyBleHQ9XCJ1bmtub3duXCJcblx0c3RhdGljIG1pbWU9XCJhcHBsaWNhdGlvbi96aXBcIlxuXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0XHR0aGlzLl9zaG91bGRSZWxlYXNlZD1uZXcgTWFwKClcblx0fVxuXG5cdG5vcm1hbGl6ZVBhdGgoKXtcblx0XHRyZXR1cm4gbm9ybWFsaXplKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdGdldFBhcnQobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cblx0Z2V0RGF0YVBhcnQobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXREYXRhUGFydEFzVXJsKG5hbWUsdHlwZT1cIiovKlwiKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdGlmKCF0aGlzLl9zaG91bGRSZWxlYXNlZC5oYXMoY3JjMzIpKXtcblx0XHRcdHRoaXMuX3Nob3VsZFJlbGVhc2VkLnNldChjcmMzMixVUkwuY3JlYXRlT2JqZWN0VVJMKG5ldyBCbG9iKFt0aGlzLmdldERhdGFQYXJ0KG5hbWUpXSx7dHlwZX0pKSlcblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX3Nob3VsZFJlbGVhc2VkLmdldChjcmMzMilcblx0fVxuXG5cdGdldFBhcnRDcmMzMihuYW1lKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHJldHVybiBjcmMzMlxuXHR9XG5cblx0cmVsZWFzZSgpe1xuXHRcdGZvcihsZXQgWywgdXJsXSBvZiB0aGlzLl9zaG91bGRSZWxlYXNlZCl7XG5cdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKHVybClcblx0XHR9XG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0Y29uc3QgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0aWYoIXBhcnQpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2UgaWYocGFydC5jaGVlcmlvKVxuXHRcdFx0cmV0dXJuIHBhcnRcblx0XHRlbHNle1xuXHRcdFx0Y29uc3QgJD1PYmplY3QuYXNzaWduKHRoaXMucGFydHNbbmFtZV09dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbChwYXJ0LmFzVGV4dCgpKSx7cGFydDpuYW1lfSlcblx0XHRcdE9iamVjdC5hc3NpZ24oJC5yb290KClbMF0uYXR0cmlicyx7cGFydDpuYW1lfSlcblx0XHRcdCQucHJvdG90eXBlLnBhcnQ9KCk9Pm5hbWVcblx0XHRcdHJldHVybiAkXG5cdFx0fVxuXHR9XG5cblx0JChub2RlKXtcbiAgICAgICAgY29uc3Qgcm9vdD1hPT5hLnJvb3QgfHwgKGEucGFyZW50ICYmIHJvb3QoYS5wYXJlbnQpKVxuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQocm9vdChub2RlKS5hdHRyaWJzLnBhcnQpKG5vZGUpXG4gICAgfVxuXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0c2VyaWFsaXplKCl7XG5cdFx0bGV0IG5ld0RvYz1uZXcgSlNaaXAoKVxuXHRcdE9iamVjdC5rZXlzKHRoaXMucGFydHMpLmZvckVhY2gocGF0aD0+e1xuXHRcdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1twYXRoXVxuXHRcdFx0aWYocGFydC5jaGVlcmlvKXtcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0LnhtbCgpKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC5fZGF0YSwgcGFydC5vcHRpb25zKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0cmV0dXJuIG5ld0RvY1xuXHR9XG5cblx0c2F2ZShmaWxlLG9wdGlvbnMpe1xuXHRcdGZpbGU9ZmlsZXx8dGhpcy5wcm9wcy5uYW1lfHxgJHtEYXRlLm5vdygpfS5kb2N4YFxuXG5cdFx0bGV0IG5ld0RvYz10aGlzLnNlcmlhbGl6ZSgpXG5cblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xuXHRcdFx0bGV0IGRhdGE9bmV3RG9jLmdlbmVyYXRlKHsuLi5vcHRpb25zLHR5cGU6XCJibG9iXCIsbWltZVR5cGU6dGhpcy5jb25zdHJ1Y3Rvci5taW1lfSlcblx0XHRcdGxldCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKVxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcblx0XHRcdGxpbmsuZG93bmxvYWQgPSBmaWxlXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XG5cdFx0XHRsaW5rLmNsaWNrKClcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcblx0XHRcdHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybClcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwibm9kZWJ1ZmZlclwifSlcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5cblx0XHRcdFx0cmVxdWlyZShcImZcIitcInNcIikud3JpdGVGaWxlKGZpbGUsZGF0YSxlcnJvcj0+e1xuXHRcdFx0XHRcdGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoZGF0YSlcblx0XHRcdFx0fSlcblx0XHRcdClcblx0XHR9XG5cdH1cblxuXHRjbG9uZSgpe1xuXHRcdGxldCB6aXA9bmV3IEpTWmlwKClcblx0XHRsZXQgcHJvcHM9IHByb3BzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKSkgOiBwcm9wc1xuXHRcdGxldCBwYXJ0cz1PYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5yZWR1Y2UoKHN0YXRlLCBrKT0+e1xuXHRcdFx0bGV0IHY9dGhpcy5wYXJ0c1trXVxuXHRcdFx0aWYodi5jaGVlcmlvKXtcblx0XHRcdFx0emlwLmZpbGUodi5uYW1lLHYueG1sKCksdi5vcHRpb25zKVxuXHRcdFx0XHRzdGF0ZVtrXT16aXAuZmlsZSh2Lm5hbWUpXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0emlwLmZpbGUodi5uYW1lLHYuX2RhdGEsdi5vcHRpb25zKVxuXHRcdFx0XHRzdGF0ZVtrXT16aXAuZmlsZSh2Lm5hbWUpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gc3RhdGVcblx0XHR9LHt9KVxuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3RvcihwYXJ0cyx6aXAsIHByb3BzKVxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0Y29uc3QgRG9jdW1lbnRTZWxmPXRoaXNcblxuXHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIFppcERvY3VtZW50KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnB1dEZpbGUpXG5cblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dHJ5e1xuXHRcdFx0XHRcdGxldCByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcblx0XHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHByb3BzKSlcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdFx0XHRyZWplY3QoZXJyb3IpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xuXHRcdFx0XHR2YXIgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCAoaW5wdXRGaWxlLm5hbWUgPyB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6aW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyksXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXG5cdFx0XHRcdFx0XHR9IDoge3NpemU6aW5wdXRGaWxlLnNpemV9KSlcblx0XHRcdFx0fVxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKCl7XG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXG5cdH1cblxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XG5cdFx0dHJ5e1xuXHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlLGRlY29kZUVudGl0aWVzOiBmYWxzZX1cblx0XHRcdGxldCBoYW5kbGVyPW5ldyBDb250ZW50RG9tSGFuZGxlcihvcHQpXG5cdFx0XHRuZXcgUGFyc2VyKGhhbmRsZXIsb3B0KS5lbmQoZGF0YSlcblx0XHRcdGxldCBwYXJzZWQ9Y2hlZXIubG9hZChoYW5kbGVyLmRvbSxvcHQpXG5cdFx0XHRpZih0eXBlb2YocGFyc2VkLmNoZWVyaW8pPT1cInVuZGVmaW5lZFwiKVxuXHRcdFx0XHRwYXJzZWQuY2hlZXJpbz1cImN1c3RvbWl6ZWRcIlxuXHRcdFx0cmV0dXJuIHBhcnNlZFxuXHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHR9XG5cdH1cbn1cblxuY2xhc3MgQ29udGVudERvbUhhbmRsZXIgZXh0ZW5kcyBEb21IYW5kbGVye1xuXHRfYWRkRG9tRWxlbWVudChlbCl7XG5cdFx0aWYoZWwudHlwZT09XCJ0ZXh0XCIgJiYgKGVsLmRhdGFbMF09PSdcXHInIHx8IGVsLmRhdGFbMF09PSdcXG4nKSlcblx0XHRcdDsvL3JlbW92ZSBmb3JtYXQgd2hpdGVzcGFjZXNcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpXG5cdH1cbn1cbiJdfQ==