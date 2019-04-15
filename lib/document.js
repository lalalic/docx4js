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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJwYXRoIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwicmVkdWNlUmlnaHQiLCJuIiwiciIsInRyaW1lZCIsInVuc2hpZnQiLCJqb2luIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwiX3Nob3VsZFJlbGVhc2VkIiwiTWFwIiwiYXJndW1lbnRzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsInR5cGUiLCJoYXMiLCJzZXQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZ2V0RGF0YVBhcnQiLCJnZXQiLCJ1cmwiLCJyZXZva2VPYmplY3RVUkwiLCJjaGVlcmlvIiwiJCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJyb290IiwiYXR0cmlicyIsInByb3RvdHlwZSIsIm5vZGUiLCJwYXJlbnQiLCJnZXRPYmplY3RQYXJ0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsImtleXMiLCJmb3JFYWNoIiwiZmlsZSIsInhtbCIsIm9wdGlvbnMiLCJEYXRlIiwibm93Iiwic2VyaWFsaXplIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJnZW5lcmF0ZSIsIm1pbWVUeXBlIiwibWltZSIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiZG93bmxvYWQiLCJocmVmIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWlyZSIsIndyaXRlRmlsZSIsImVycm9yIiwiemlwIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicmVkdWNlIiwic3RhdGUiLCJrIiwidiIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsInJlYWRGaWxlIiwicG9wIiwicmVwbGFjZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJkZWNvZGVFbnRpdGllcyIsImhhbmRsZXIiLCJDb250ZW50RG9tSGFuZGxlciIsImVuZCIsInBhcnNlZCIsImRvbSIsImNvbnNvbGUiLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVUsU0FBVkEsU0FBVTtBQUFBLFFBQU1DLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxNQUFoQixDQUF1QjtBQUFBLFNBQUdDLEtBQUcsR0FBTjtBQUFBLEVBQXZCLEVBQ3BCQyxXQURvQixDQUNSLFVBQUNDLENBQUQsRUFBR0YsQ0FBSCxFQUFPO0FBQ25CLE1BQUdBLEtBQUcsSUFBTixFQUFXO0FBQ1ZFLEtBQUVDLENBQUY7QUFDQSxHQUZELE1BRU0sSUFBR0QsRUFBRUMsQ0FBTCxFQUFPO0FBQ1pELEtBQUVDLENBQUY7QUFDQSxHQUZLLE1BRUQ7QUFDSkQsS0FBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCTCxDQUFqQjtBQUNBO0FBQ0QsU0FBT0UsQ0FBUDtBQUNBLEVBVm9CLEVBVW5CLEVBQUNFLFFBQU8sRUFBUixFQUFXRCxHQUFFLENBQWIsRUFWbUIsRUFVRkMsTUFWRSxDQVVLRSxJQVZMLENBVVUsR0FWVixDQUFOO0FBQUEsQ0FBaEI7QUFXQTs7Ozs7Ozs7SUFPcUJDLFc7QUFJcEIsc0JBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxlQUFMLEdBQXFCLElBQUlDLEdBQUosRUFBckI7QUFDQTs7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LEVBQW1CSCxHQUFuQixFQUF3QkssR0FBeEIsQ0FBNEJwRixJQUE1QjtBQUNBLFFBQUlxRixTQUFPLGtCQUFNVCxJQUFOLENBQVdNLFFBQVFJLEdBQW5CLEVBQXVCUCxHQUF2QixDQUFYO0FBQ0EsUUFBRyxPQUFPTSxPQUFPekUsT0FBZCxJQUF3QixXQUEzQixFQUNDeUUsT0FBT3pFLE9BQVAsR0FBZSxZQUFmO0FBQ0QsV0FBT3lFLE1BQVA7QUFDQSxJQVJELENBUUMsT0FBTWhDLEtBQU4sRUFBWTtBQUNaa0MsWUFBUWxDLEtBQVIsQ0FBY0EsS0FBZDtBQUNBLFdBQU8sSUFBUDtBQUNBO0FBQ0Q7Ozs7OztBQXZNbUJoRSxXLENBQ2J5RixHLEdBQUksUztBQURTekYsVyxDQUVia0QsSSxHQUFLLGlCO2tCQUZRbEQsVzs7SUEwTWY4RixpQjs7Ozs7Ozs7Ozs7aUNBQ1VLLEUsRUFBRztBQUNqQixPQUFHQSxHQUFHdEYsSUFBSCxJQUFTLE1BQVQsS0FBb0JzRixHQUFHeEYsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFaLElBQW9Cd0YsR0FBR3hGLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBcEQsQ0FBSCxFQUNDLENBREQsQ0FDRTtBQURGLFFBR0MsNElBQTRCd0YsRUFBNUI7QUFDRCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCwge1ppcE9iamVjdH0gZnJvbSAnanN6aXAnXG5pbXBvcnQgXCIuLyRwcm9wc1wiXG5pbXBvcnQgY2hlZXIgZnJvbSBcImNoZWVyaW9cIlxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXG5cbmNvbnN0IG5vcm1hbGl6ZT1wYXRoPT5wYXRoLnNwbGl0KFwiL1wiKS5maWx0ZXIoYT0+YSE9XCIuXCIpXG5cdC5yZWR1Y2VSaWdodCgobixhKT0+e1xuXHRcdGlmKGE9PVwiLi5cIil7XG5cdFx0XHRuLnIrK1xuXHRcdH1lbHNlIGlmKG4ucil7XG5cdFx0XHRuLnItLVxuXHRcdH1lbHNle1xuXHRcdFx0bi50cmltZWQudW5zaGlmdChhKVxuXHRcdH1cblx0XHRyZXR1cm4gblxuXHR9LHt0cmltZWQ6W10scjowfSkudHJpbWVkLmpvaW4oXCIvXCIpXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaXBEb2N1bWVudHtcblx0c3RhdGljIGV4dD1cInVua25vd25cIlxuXHRzdGF0aWMgbWltZT1cImFwcGxpY2F0aW9uL3ppcFwiXG5cblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHRcdHRoaXMuX3Nob3VsZFJlbGVhc2VkPW5ldyBNYXAoKVxuXHR9XG5cblx0bm9ybWFsaXplUGF0aCgpe1xuXHRcdHJldHVybiBub3JtYWxpemUoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0Z2V0UGFydChuYW1lKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXREYXRhUGFydChuYW1lKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdGxldCBkYXRhPXBhcnQuYXNVaW50OEFycmF5KCkvL3Vuc2FmZSBjYWxsLCBwYXJ0Ll9kYXRhIGlzIGNoYW5nZWRcblx0XHRkYXRhLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzIvL3NvIGtlZXAgY3JjMzIgb24gcGFydC5fZGF0YSBmb3IgZnV0dXJlXG5cdFx0cmV0dXJuIGRhdGFcblx0fVxuXG5cdGdldERhdGFQYXJ0QXNVcmwobmFtZSx0eXBlPVwiKi8qXCIpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0aWYoIXRoaXMuX3Nob3VsZFJlbGVhc2VkLmhhcyhjcmMzMikpe1xuXHRcdFx0dGhpcy5fc2hvdWxkUmVsZWFzZWQuc2V0KGNyYzMyLFVSTC5jcmVhdGVPYmplY3RVUkwobmV3IEJsb2IoW3RoaXMuZ2V0RGF0YVBhcnQobmFtZSldLHt0eXBlfSkpKVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2hvdWxkUmVsZWFzZWQuZ2V0KGNyYzMyKVxuXHR9XG5cblx0Z2V0UGFydENyYzMyKG5hbWUpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0cmV0dXJuIGNyYzMyXG5cdH1cblxuXHRyZWxlYXNlKCl7XG5cdFx0Zm9yKGxldCBbLCB1cmxdIG9mIHRoaXMuX3Nob3VsZFJlbGVhc2VkKXtcblx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuXHRcdH1cblx0fVxuXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRjb25zdCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRpZighcGFydClcblx0XHRcdHJldHVybiBudWxsXG5cdFx0ZWxzZSBpZihwYXJ0LmNoZWVyaW8pXG5cdFx0XHRyZXR1cm4gcGFydFxuXHRcdGVsc2V7XG5cdFx0XHRjb25zdCAkPU9iamVjdC5hc3NpZ24odGhpcy5wYXJ0c1tuYW1lXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHBhcnQuYXNUZXh0KCkpLHtwYXJ0Om5hbWV9KVxuXHRcdFx0T2JqZWN0LmFzc2lnbigkLnJvb3QoKVswXS5hdHRyaWJzLHtwYXJ0Om5hbWV9KVxuXHRcdFx0JC5wcm90b3R5cGUucGFydD0oKT0+bmFtZVxuXHRcdFx0cmV0dXJuICRcblx0XHR9XG5cdH1cblxuXHQkKG5vZGUpe1xuICAgICAgICBjb25zdCByb290PWE9PmEucm9vdCB8fCByb290KGEucGFyZW50KVxuXHRcdHJldHVybiB0aGlzLmdldE9iamVjdFBhcnQocm9vdChub2RlKS5hdHRyaWJzLnBhcnQpKG5vZGUpXG4gICAgfVxuXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0c2VyaWFsaXplKCl7XG5cdFx0bGV0IG5ld0RvYz1uZXcgSlNaaXAoKVxuXHRcdE9iamVjdC5rZXlzKHRoaXMucGFydHMpLmZvckVhY2gocGF0aD0+e1xuXHRcdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1twYXRoXVxuXHRcdFx0aWYocGFydC5jaGVlcmlvKXtcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0LnhtbCgpKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC5fZGF0YSwgcGFydC5vcHRpb25zKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0cmV0dXJuIG5ld0RvY1xuXHR9XG5cblx0c2F2ZShmaWxlLG9wdGlvbnMpe1xuXHRcdGZpbGU9ZmlsZXx8dGhpcy5wcm9wcy5uYW1lfHxgJHtEYXRlLm5vdygpfS5kb2N4YFxuXG5cdFx0bGV0IG5ld0RvYz10aGlzLnNlcmlhbGl6ZSgpXG5cblx0XHRpZih0eXBlb2YoZG9jdW1lbnQpIT1cInVuZGVmaW5lZFwiICYmIHdpbmRvdy5VUkwgJiYgd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwpe1xuXHRcdFx0bGV0IGRhdGE9bmV3RG9jLmdlbmVyYXRlKHsuLi5vcHRpb25zLHR5cGU6XCJibG9iXCIsbWltZVR5cGU6dGhpcy5jb25zdHJ1Y3Rvci5taW1lfSlcblx0XHRcdGxldCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKVxuXHRcdFx0bGV0IGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluaylcblx0XHRcdGxpbmsuZG93bmxvYWQgPSBmaWxlXG5cdFx0XHRsaW5rLmhyZWYgPSB1cmw7XG5cdFx0XHRsaW5rLmNsaWNrKClcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcblx0XHRcdHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKHVybClcblx0XHR9ZWxzZXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwibm9kZWJ1ZmZlclwifSlcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT5cblx0XHRcdFx0cmVxdWlyZShcImZcIitcInNcIikud3JpdGVGaWxlKGZpbGUsZGF0YSxlcnJvcj0+e1xuXHRcdFx0XHRcdGVycm9yID8gcmVqZWN0KGVycm9yKSA6IHJlc29sdmUoZGF0YSlcblx0XHRcdFx0fSlcblx0XHRcdClcblx0XHR9XG5cdH1cblxuXHRjbG9uZSgpe1xuXHRcdGxldCB6aXA9bmV3IEpTWmlwKClcblx0XHRsZXQgcHJvcHM9IHByb3BzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKSkgOiBwcm9wc1xuXHRcdGxldCBwYXJ0cz1PYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5yZWR1Y2UoKHN0YXRlLCBrKT0+e1xuXHRcdFx0bGV0IHY9dGhpcy5wYXJ0c1trXVxuXHRcdFx0aWYodi5jaGVlcmlvKXtcblx0XHRcdFx0c3RhdGVba109dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbCh2LnhtbCgpKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHppcC5maWxlKHYubmFtZSx2Ll9kYXRhLHYub3B0aW9ucylcblx0XHRcdFx0c3RhdGVba109emlwLmZpbGUodi5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSx7fSlcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IocGFydHMsemlwLCBwcm9wcylcblx0fVxuXG5cdC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdGNvbnN0IERvY3VtZW50U2VsZj10aGlzXG5cblx0XHRpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBaaXBEb2N1bWVudClcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5wdXRGaWxlKVxuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRsZXQgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwgKGlucHV0RmlsZS5uYW1lID8ge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNyZWF0ZSgpe1xuXHRcdHJldHVybiB0aGlzLmxvYWQoYCR7X19kaXJuYW1lfS8uLi90ZW1wbGF0ZXMvYmxhbmsuJHt0aGlzLmV4dH1gKVxuXHR9XG5cblx0c3RhdGljIHBhcnNlWG1sKGRhdGEpe1xuXHRcdHRyeXtcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgQ29udGVudERvbUhhbmRsZXIob3B0KVxuXHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKGRhdGEpXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxuXHRcdFx0aWYodHlwZW9mKHBhcnNlZC5jaGVlcmlvKT09XCJ1bmRlZmluZWRcIilcblx0XHRcdFx0cGFyc2VkLmNoZWVyaW89XCJjdXN0b21pemVkXCJcblx0XHRcdHJldHVybiBwYXJzZWRcblx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIENvbnRlbnREb21IYW5kbGVyIGV4dGVuZHMgRG9tSGFuZGxlcntcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xuXHRcdGlmKGVsLnR5cGU9PVwidGV4dFwiICYmIChlbC5kYXRhWzBdPT0nXFxyJyB8fCBlbC5kYXRhWzBdPT0nXFxuJykpXG5cdFx0XHQ7Ly9yZW1vdmUgZm9ybWF0IHdoaXRlc3BhY2VzXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHN1cGVyLl9hZGREb21FbGVtZW50KGVsKVxuXHR9XG59XG4iXX0=