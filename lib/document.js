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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJub3JtYWxpemUiLCJwYXRoIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwicmVkdWNlUmlnaHQiLCJuIiwiciIsInRyaW1lZCIsInVuc2hpZnQiLCJqb2luIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwiX3Nob3VsZFJlbGVhc2VkIiwiTWFwIiwiYXJndW1lbnRzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsInR5cGUiLCJoYXMiLCJzZXQiLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJCbG9iIiwiZ2V0RGF0YVBhcnQiLCJnZXQiLCJ1cmwiLCJyZXZva2VPYmplY3RVUkwiLCJjaGVlcmlvIiwiJCIsIk9iamVjdCIsImFzc2lnbiIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJyb290IiwiYXR0cmlicyIsInByb3RvdHlwZSIsIm5vZGUiLCJwYXJlbnQiLCJnZXRPYmplY3RQYXJ0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsImtleXMiLCJmb3JFYWNoIiwiZmlsZSIsInhtbCIsIm9wdGlvbnMiLCJEYXRlIiwibm93Iiwic2VyaWFsaXplIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJnZW5lcmF0ZSIsIm1pbWVUeXBlIiwibWltZSIsImxpbmsiLCJjcmVhdGVFbGVtZW50IiwiYm9keSIsImFwcGVuZENoaWxkIiwiZG93bmxvYWQiLCJocmVmIiwiY2xpY2siLCJyZW1vdmVDaGlsZCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVxdWlyZSIsIndyaXRlRmlsZSIsImVycm9yIiwiemlwIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwicmVkdWNlIiwic3RhdGUiLCJrIiwidiIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsInJlYWRGaWxlIiwicG9wIiwicmVwbGFjZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJkZWNvZGVFbnRpdGllcyIsImhhbmRsZXIiLCJDb250ZW50RG9tSGFuZGxlciIsImVuZCIsInBhcnNlZCIsImRvbSIsImNvbnNvbGUiLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztBQUVBLElBQU1BLFlBQVUsU0FBVkEsU0FBVTtBQUFBLFFBQU1DLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxNQUFoQixDQUF1QjtBQUFBLFNBQUdDLEtBQUcsR0FBTjtBQUFBLEVBQXZCLEVBQ3BCQyxXQURvQixDQUNSLFVBQUNDLENBQUQsRUFBR0YsQ0FBSCxFQUFPO0FBQ25CLE1BQUdBLEtBQUcsSUFBTixFQUFXO0FBQ1ZFLEtBQUVDLENBQUY7QUFDQSxHQUZELE1BRU0sSUFBR0QsRUFBRUMsQ0FBTCxFQUFPO0FBQ1pELEtBQUVDLENBQUY7QUFDQSxHQUZLLE1BRUQ7QUFDSkQsS0FBRUUsTUFBRixDQUFTQyxPQUFULENBQWlCTCxDQUFqQjtBQUNBO0FBQ0QsU0FBT0UsQ0FBUDtBQUNBLEVBVm9CLEVBVW5CLEVBQUNFLFFBQU8sRUFBUixFQUFXRCxHQUFFLENBQWIsRUFWbUIsRUFVRkMsTUFWRSxDQVVLRSxJQVZMLENBVVUsR0FWVixDQUFOO0FBQUEsQ0FBaEI7QUFXQTs7Ozs7Ozs7SUFPcUJDLFc7QUFJcEIsc0JBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxlQUFMLEdBQXFCLElBQUlDLEdBQUosRUFBckI7QUFDQTs7OztrQ0FFYztBQUNkLFVBQU9oQiwyQkFBYWlCLFNBQWIsQ0FBUDtBQUNBOzs7MEJBRU9DLEksRUFBSztBQUNaQSxVQUFLbEIsVUFBVWtCLElBQVYsQ0FBTDtBQUNBLFVBQU8sS0FBS04sS0FBTCxDQUFXTSxJQUFYLENBQVA7QUFDQTs7OzhCQUVXQSxJLEVBQUs7QUFDaEJBLFVBQUtsQixVQUFVa0IsSUFBVixDQUFMO0FBQ0EsT0FBSUMsT0FBSyxLQUFLUCxLQUFMLENBQVdNLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxPQUFLSCxLQUFLSSxZQUFMLEVBQVQsQ0FKZ0IsQ0FJWTtBQUM1QkQsUUFBS0YsS0FBTCxHQUFXRCxLQUFLRSxLQUFMLENBQVdELEtBQVgsR0FBaUJBLEtBQTVCLENBTGdCLENBS2lCO0FBQ2pDLFVBQU9FLElBQVA7QUFDQTs7O21DQUVnQkosSSxFQUFnQjtBQUFBLE9BQVhNLElBQVcsdUVBQU4sS0FBTTs7QUFDaENOLFVBQUtsQixVQUFVa0IsSUFBVixDQUFMO0FBQ0EsT0FBSUMsT0FBSyxLQUFLUCxLQUFMLENBQVdNLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFHLENBQUMsS0FBS0wsZUFBTCxDQUFxQlUsR0FBckIsQ0FBeUJMLEtBQXpCLENBQUosRUFBb0M7QUFDbkMsU0FBS0wsZUFBTCxDQUFxQlcsR0FBckIsQ0FBeUJOLEtBQXpCLEVBQStCTyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDLEtBQUtDLFdBQUwsQ0FBaUJaLElBQWpCLENBQUQsQ0FBVCxFQUFrQyxFQUFDTSxVQUFELEVBQWxDLENBQXBCLENBQS9CO0FBQ0E7QUFDRCxVQUFPLEtBQUtULGVBQUwsQ0FBcUJnQixHQUFyQixDQUF5QlgsS0FBekIsQ0FBUDtBQUNBOzs7K0JBRVlGLEksRUFBSztBQUNqQkEsVUFBS2xCLFVBQVVrQixJQUFWLENBQUw7QUFDQSxPQUFJQyxPQUFLLEtBQUtQLEtBQUwsQ0FBV00sSUFBWCxDQUFUO0FBQ0EsT0FBSUUsUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLFVBQU9BLEtBQVA7QUFDQTs7OzRCQUVRO0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQ1IseUJBQW1CLEtBQUtMLGVBQXhCLDhIQUF3QztBQUFBO0FBQUEsU0FBN0JpQixHQUE2Qjs7QUFDdkNMLFNBQUlNLGVBQUosQ0FBb0JELEdBQXBCO0FBQ0E7QUFITztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSVI7OztnQ0FFYWQsSSxFQUFLO0FBQ2xCQSxVQUFLbEIsVUFBVWtCLElBQVYsQ0FBTDtBQUNBLE9BQU1DLE9BQUssS0FBS1AsS0FBTCxDQUFXTSxJQUFYLENBQVg7QUFDQSxPQUFHLENBQUNDLElBQUosRUFDQyxPQUFPLElBQVAsQ0FERCxLQUVLLElBQUdBLEtBQUtlLE9BQVIsRUFDSixPQUFPZixJQUFQLENBREksS0FFRDtBQUNILFFBQU1nQixJQUFFQyxPQUFPQyxNQUFQLENBQWMsS0FBS3pCLEtBQUwsQ0FBV00sSUFBWCxJQUFpQixLQUFLb0IsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJwQixLQUFLcUIsTUFBTCxFQUExQixDQUEvQixFQUF3RSxFQUFDckIsTUFBS0QsSUFBTixFQUF4RSxDQUFSO0FBQ0FrQixXQUFPQyxNQUFQLENBQWNGLEVBQUVNLElBQUYsR0FBUyxDQUFULEVBQVlDLE9BQTFCLEVBQWtDLEVBQUN2QixNQUFLRCxJQUFOLEVBQWxDO0FBQ0FpQixNQUFFUSxTQUFGLENBQVl4QixJQUFaLEdBQWlCO0FBQUEsWUFBSUQsSUFBSjtBQUFBLEtBQWpCO0FBQ0EsV0FBT2lCLENBQVA7QUFDQTtBQUNEOzs7b0JBRUNTLEksRUFBSztBQUNBLE9BQU1ILE9BQUssU0FBTEEsSUFBSztBQUFBLFdBQUdyQyxFQUFFcUMsSUFBRixJQUFXckMsRUFBRXlDLE1BQUYsSUFBWUosS0FBS3JDLEVBQUV5QyxNQUFQLENBQTFCO0FBQUEsSUFBWDtBQUNOLFVBQU8sS0FBS0MsYUFBTCxDQUFtQkwsS0FBS0csSUFBTCxFQUFXRixPQUFYLENBQW1CdkIsSUFBdEMsRUFBNEN5QixJQUE1QyxDQUFQO0FBQ0c7Ozt3QkFFRUcsVSxFQUFXLENBRWhCOzs7MkJBRU8sQ0FFUDs7OzhCQUVVO0FBQUE7O0FBQ1YsT0FBSUMsU0FBTyxxQkFBWDtBQUNBWixVQUFPYSxJQUFQLENBQVksS0FBS3JDLEtBQWpCLEVBQXdCc0MsT0FBeEIsQ0FBZ0MsZ0JBQU07QUFDckMsUUFBSS9CLE9BQUssTUFBS1AsS0FBTCxDQUFXWCxJQUFYLENBQVQ7QUFDQSxRQUFHa0IsS0FBS2UsT0FBUixFQUFnQjtBQUNmYyxZQUFPRyxJQUFQLENBQVlsRCxJQUFaLEVBQWlCa0IsS0FBS2lDLEdBQUwsRUFBakI7QUFDQSxLQUZELE1BRUs7QUFDSkosWUFBT0csSUFBUCxDQUFZbEQsSUFBWixFQUFpQmtCLEtBQUtFLEtBQXRCLEVBQTZCRixLQUFLa0MsT0FBbEM7QUFDQTtBQUNELElBUEQ7QUFRQSxVQUFPTCxNQUFQO0FBQ0E7Ozt1QkFFSUcsSSxFQUFLRSxPLEVBQVE7QUFDakJGLFVBQUtBLFFBQU0sS0FBS3JDLEtBQUwsQ0FBV0ksSUFBakIsSUFBMEJvQyxLQUFLQyxHQUFMLEVBQTFCLFVBQUw7O0FBRUEsT0FBSVAsU0FBTyxLQUFLUSxTQUFMLEVBQVg7O0FBRUEsT0FBRyxPQUFPQyxRQUFQLElBQWtCLFdBQWxCLElBQWlDQyxPQUFPL0IsR0FBeEMsSUFBK0MrQixPQUFPL0IsR0FBUCxDQUFXQyxlQUE3RCxFQUE2RTtBQUM1RSxRQUFJTixPQUFLMEIsT0FBT1csUUFBUCxjQUFvQk4sT0FBcEIsSUFBNEI3QixNQUFLLE1BQWpDLEVBQXdDb0MsVUFBUyxLQUFLdEIsV0FBTCxDQUFpQnVCLElBQWxFLElBQVQ7QUFDQSxRQUFJN0IsTUFBTTBCLE9BQU8vQixHQUFQLENBQVdDLGVBQVgsQ0FBMkJOLElBQTNCLENBQVY7QUFDQSxRQUFJd0MsT0FBT0wsU0FBU00sYUFBVCxDQUF1QixHQUF2QixDQUFYO0FBQ0FOLGFBQVNPLElBQVQsQ0FBY0MsV0FBZCxDQUEwQkgsSUFBMUI7QUFDQUEsU0FBS0ksUUFBTCxHQUFnQmYsSUFBaEI7QUFDQVcsU0FBS0ssSUFBTCxHQUFZbkMsR0FBWjtBQUNBOEIsU0FBS00sS0FBTDtBQUNBWCxhQUFTTyxJQUFULENBQWNLLFdBQWQsQ0FBMEJQLElBQTFCO0FBQ0FKLFdBQU8vQixHQUFQLENBQVdNLGVBQVgsQ0FBMkJELEdBQTNCO0FBQ0EsSUFWRCxNQVVLO0FBQUE7QUFDSixTQUFJVixPQUFLMEIsT0FBT1csUUFBUCxjQUFvQk4sT0FBcEIsSUFBNEI3QixNQUFLLFlBQWpDLElBQVQ7QUFDQTtBQUFBLFNBQU8sSUFBSThDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQ7QUFBQSxjQUNsQkMsUUFBUSxNQUFJLEdBQVosRUFBaUJDLFNBQWpCLENBQTJCdkIsSUFBM0IsRUFBZ0M3QixJQUFoQyxFQUFxQyxpQkFBTztBQUMzQ3FELGdCQUFRSCxPQUFPRyxLQUFQLENBQVIsR0FBd0JKLFFBQVFqRCxJQUFSLENBQXhCO0FBQ0EsUUFGRCxDQURrQjtBQUFBLE9BQVo7QUFBUDtBQUZJOztBQUFBO0FBT0o7QUFDRDs7OzBCQUVNO0FBQUE7O0FBQ04sT0FBSXNELE1BQUkscUJBQVI7QUFDQSxPQUFJOUQsUUFBT0EsUUFBUStELEtBQUtDLEtBQUwsQ0FBV0QsS0FBS0UsU0FBTCxDQUFlLEtBQUtqRSxLQUFwQixDQUFYLENBQVIsR0FBaURBLEtBQTVEO0FBQ0EsT0FBSUYsUUFBTXdCLE9BQU9hLElBQVAsQ0FBWSxLQUFLckMsS0FBakIsRUFBd0JvRSxNQUF4QixDQUErQixVQUFDQyxLQUFELEVBQVFDLENBQVIsRUFBWTtBQUNwRCxRQUFJQyxJQUFFLE9BQUt2RSxLQUFMLENBQVdzRSxDQUFYLENBQU47QUFDQSxRQUFHQyxFQUFFakQsT0FBTCxFQUFhO0FBQ1owQyxTQUFJekIsSUFBSixDQUFTZ0MsRUFBRWpFLElBQVgsRUFBZ0JpRSxFQUFFL0IsR0FBRixFQUFoQixFQUF3QitCLEVBQUU5QixPQUExQjtBQUNBNEIsV0FBTUMsQ0FBTixJQUFTTixJQUFJekIsSUFBSixDQUFTZ0MsRUFBRWpFLElBQVgsQ0FBVDtBQUNBLEtBSEQsTUFHSztBQUNKMEQsU0FBSXpCLElBQUosQ0FBU2dDLEVBQUVqRSxJQUFYLEVBQWdCaUUsRUFBRTlELEtBQWxCLEVBQXdCOEQsRUFBRTlCLE9BQTFCO0FBQ0E0QixXQUFNQyxDQUFOLElBQVNOLElBQUl6QixJQUFKLENBQVNnQyxFQUFFakUsSUFBWCxDQUFUO0FBQ0E7QUFDRCxXQUFPK0QsS0FBUDtBQUNBLElBVlMsRUFVUixFQVZRLENBQVY7QUFXQSxVQUFPLElBQUksS0FBSzNDLFdBQVQsQ0FBcUIxQixLQUFyQixFQUEyQmdFLEdBQTNCLEVBQWdDOUQsS0FBaEMsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7Ozt1QkFPWXNFLFMsRUFBVTtBQUNyQixPQUFNQyxlQUFhLElBQW5COztBQUVBLE9BQUdELHFCQUFxQnpFLFdBQXhCLEVBQ0MsT0FBTzJELFFBQVFDLE9BQVIsQ0FBZ0JhLFNBQWhCLENBQVA7O0FBRUQsVUFBTyxJQUFJZCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ3JDLGFBQVNNLEtBQVQsQ0FBZXhELElBQWYsRUFBOEI7QUFBQSxTQUFUUixLQUFTLHVFQUFILEVBQUc7O0FBQzdCLFNBQUc7QUFBQTtBQUNGLFdBQUlELE1BQUksb0JBQVVTLElBQVYsQ0FBUjtBQUFBLFdBQXdCVixRQUFNLEVBQTlCO0FBQ0FDLFdBQUlWLE1BQUosQ0FBVyxVQUFDRixJQUFELEVBQU1rRCxJQUFOO0FBQUEsZUFBYXZDLE1BQU1YLElBQU4sSUFBWWtELElBQXpCO0FBQUEsUUFBWDtBQUNBb0IsZUFBUSxJQUFJYyxZQUFKLENBQWlCekUsS0FBakIsRUFBdUJDLEdBQXZCLEVBQTJCQyxLQUEzQixDQUFSO0FBSEU7QUFJRixNQUpELENBSUMsT0FBTTZELEtBQU4sRUFBWTtBQUNaSCxhQUFPRyxLQUFQO0FBQ0E7QUFDRDs7QUFFRCxRQUFHLE9BQU9TLFNBQVAsSUFBa0IsUUFBckIsRUFBOEI7QUFBQztBQUM5QlgsYUFBUSxJQUFSLEVBQWNhLFFBQWQsQ0FBdUJGLFNBQXZCLEVBQWlDLFVBQVNULEtBQVQsRUFBZ0JyRCxJQUFoQixFQUFxQjtBQUNyRCxVQUFHcUQsS0FBSCxFQUNDSCxPQUFPRyxLQUFQLEVBREQsS0FFSyxJQUFHckQsSUFBSCxFQUFRO0FBQ1p3RCxhQUFNeEQsSUFBTixFQUFZLEVBQUNKLE1BQUtrRSxVQUFVbEYsS0FBVixDQUFnQixRQUFoQixFQUEwQnFGLEdBQTFCLEdBQWdDQyxPQUFoQyxDQUF3QyxVQUF4QyxFQUFtRCxFQUFuRCxDQUFOLEVBQVo7QUFDQTtBQUNELE1BTkQ7QUFPQSxLQVJELE1BUU0sSUFBR0oscUJBQXFCdkQsSUFBeEIsRUFBNkI7QUFDbEMsU0FBSTRELFNBQU8sSUFBSUMsVUFBSixFQUFYO0FBQ0FELFlBQU9FLE1BQVAsR0FBYyxVQUFTQyxDQUFULEVBQVc7QUFDeEJkLFlBQU1jLEVBQUVDLE1BQUYsQ0FBU0MsTUFBZixFQUF3QlYsVUFBVWxFLElBQVYsR0FBaUI7QUFDdkNBLGFBQUtrRSxVQUFVbEUsSUFBVixDQUFlc0UsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQURrQztBQUV2Q08scUJBQWFYLFVBQVVXLFlBRmdCO0FBR3ZDQyxhQUFLWixVQUFVWTtBQUh3QixPQUFqQixHQUluQixFQUFDQSxNQUFLWixVQUFVWSxJQUFoQixFQUpMO0FBS0EsTUFORDtBQU9BUCxZQUFPUSxpQkFBUCxDQUF5QmIsU0FBekI7QUFDQSxLQVZLLE1BVUE7QUFDTE4sV0FBTU0sU0FBTjtBQUNBO0FBQ0QsSUFoQ00sQ0FBUDtBQWlDQTs7OzJCQUVjO0FBQ2QsVUFBTyxLQUFLYyxJQUFMLENBQWFDLFNBQWIsNEJBQTZDLEtBQUtDLEdBQWxELENBQVA7QUFDQTs7OzJCQUVlOUUsSSxFQUFLO0FBQ3BCLE9BQUc7QUFDRixRQUFJK0UsTUFBSSxFQUFDQyxTQUFRLElBQVQsRUFBY0MsZ0JBQWdCLEtBQTlCLEVBQVI7QUFDQSxRQUFJQyxVQUFRLElBQUlDLGlCQUFKLENBQXNCSixHQUF0QixDQUFaO0FBQ0EsMkJBQVdHLE9BQVgsRUFBbUJILEdBQW5CLEVBQXdCSyxHQUF4QixDQUE0QnBGLElBQTVCO0FBQ0EsUUFBSXFGLFNBQU8sa0JBQU1ULElBQU4sQ0FBV00sUUFBUUksR0FBbkIsRUFBdUJQLEdBQXZCLENBQVg7QUFDQSxRQUFHLE9BQU9NLE9BQU96RSxPQUFkLElBQXdCLFdBQTNCLEVBQ0N5RSxPQUFPekUsT0FBUCxHQUFlLFlBQWY7QUFDRCxXQUFPeUUsTUFBUDtBQUNBLElBUkQsQ0FRQyxPQUFNaEMsS0FBTixFQUFZO0FBQ1prQyxZQUFRbEMsS0FBUixDQUFjQSxLQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0E7QUFDRDs7Ozs7O0FBeE1tQmhFLFcsQ0FDYnlGLEcsR0FBSSxTO0FBRFN6RixXLENBRWJrRCxJLEdBQUssaUI7a0JBRlFsRCxXOztJQTJNZjhGLGlCOzs7Ozs7Ozs7OztpQ0FDVUssRSxFQUFHO0FBQ2pCLE9BQUdBLEdBQUd0RixJQUFILElBQVMsTUFBVCxLQUFvQnNGLEdBQUd4RixJQUFILENBQVEsQ0FBUixLQUFZLElBQVosSUFBb0J3RixHQUFHeEYsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFwRCxDQUFILEVBQ0MsQ0FERCxDQUNFO0FBREYsUUFHQyw0SUFBNEJ3RixFQUE1QjtBQUNEIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcbmltcG9ydCBcIi4vY2hlZXJpby1mblwiXG5pbXBvcnQge1BhcnNlciwgRG9tSGFuZGxlcn0gZnJvbSBcImh0bWxwYXJzZXIyXCJcblxuY29uc3Qgbm9ybWFsaXplPXBhdGg9PnBhdGguc3BsaXQoXCIvXCIpLmZpbHRlcihhPT5hIT1cIi5cIilcblx0LnJlZHVjZVJpZ2h0KChuLGEpPT57XG5cdFx0aWYoYT09XCIuLlwiKXtcblx0XHRcdG4ucisrXG5cdFx0fWVsc2UgaWYobi5yKXtcblx0XHRcdG4uci0tXG5cdFx0fWVsc2V7XG5cdFx0XHRuLnRyaW1lZC51bnNoaWZ0KGEpXG5cdFx0fVxuXHRcdHJldHVybiBuXG5cdH0se3RyaW1lZDpbXSxyOjB9KS50cmltZWQuam9pbihcIi9cIilcbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xuXHRzdGF0aWMgZXh0PVwidW5rbm93blwiXG5cdHN0YXRpYyBtaW1lPVwiYXBwbGljYXRpb24vemlwXCJcblxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdFx0dGhpcy5fc2hvdWxkUmVsZWFzZWQ9bmV3IE1hcCgpXG5cdH1cblxuXHRub3JtYWxpemVQYXRoKCl7XG5cdFx0cmV0dXJuIG5vcm1hbGl6ZSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXG5cdGdldERhdGFQYXJ0KG5hbWUpe1xuXHRcdG5hbWU9bm9ybWFsaXplKG5hbWUpXG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0bGV0IGRhdGE9cGFydC5hc1VpbnQ4QXJyYXkoKS8vdW5zYWZlIGNhbGwsIHBhcnQuX2RhdGEgaXMgY2hhbmdlZFxuXHRcdGRhdGEuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMi8vc28ga2VlcCBjcmMzMiBvbiBwYXJ0Ll9kYXRhIGZvciBmdXR1cmVcblx0XHRyZXR1cm4gZGF0YVxuXHR9XG5cblx0Z2V0RGF0YVBhcnRBc1VybChuYW1lLHR5cGU9XCIqLypcIil7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRpZighdGhpcy5fc2hvdWxkUmVsZWFzZWQuaGFzKGNyYzMyKSl7XG5cdFx0XHR0aGlzLl9zaG91bGRSZWxlYXNlZC5zZXQoY3JjMzIsVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbdGhpcy5nZXREYXRhUGFydChuYW1lKV0se3R5cGV9KSkpXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9zaG91bGRSZWxlYXNlZC5nZXQoY3JjMzIpXG5cdH1cblxuXHRnZXRQYXJ0Q3JjMzIobmFtZSl7XG5cdFx0bmFtZT1ub3JtYWxpemUobmFtZSlcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRyZXR1cm4gY3JjMzJcblx0fVxuXG5cdHJlbGVhc2UoKXtcblx0XHRmb3IobGV0IFssIHVybF0gb2YgdGhpcy5fc2hvdWxkUmVsZWFzZWQpe1xuXHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXG5cdFx0fVxuXHR9XG5cblx0Z2V0T2JqZWN0UGFydChuYW1lKXtcblx0XHRuYW1lPW5vcm1hbGl6ZShuYW1lKVxuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZXtcblx0XHRcdGNvbnN0ICQ9T2JqZWN0LmFzc2lnbih0aGlzLnBhcnRzW25hbWVdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwocGFydC5hc1RleHQoKSkse3BhcnQ6bmFtZX0pXG5cdFx0XHRPYmplY3QuYXNzaWduKCQucm9vdCgpWzBdLmF0dHJpYnMse3BhcnQ6bmFtZX0pXG5cdFx0XHQkLnByb3RvdHlwZS5wYXJ0PSgpPT5uYW1lXG5cdFx0XHRyZXR1cm4gJFxuXHRcdH1cblx0fVxuXG5cdCQobm9kZSl7XG4gICAgICAgIGNvbnN0IHJvb3Q9YT0+YS5yb290IHx8IChhLnBhcmVudCAmJiByb290KGEucGFyZW50KSlcblx0XHRyZXR1cm4gdGhpcy5nZXRPYmplY3RQYXJ0KHJvb3Qobm9kZSkuYXR0cmlicy5wYXJ0KShub2RlKVxuICAgIH1cblxuXHRwYXJzZShkb21IYW5kbGVyKXtcblxuXHR9XG5cblx0cmVuZGVyKCl7XG5cblx0fVxuXG5cdHNlcmlhbGl6ZSgpe1xuXHRcdGxldCBuZXdEb2M9bmV3IEpTWmlwKClcblx0XHRPYmplY3Qua2V5cyh0aGlzLnBhcnRzKS5mb3JFYWNoKHBhdGg9Pntcblx0XHRcdGxldCBwYXJ0PXRoaXMucGFydHNbcGF0aF1cblx0XHRcdGlmKHBhcnQuY2hlZXJpbyl7XG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC54bWwoKSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQuX2RhdGEsIHBhcnQub3B0aW9ucylcblx0XHRcdH1cblx0XHR9KVxuXHRcdHJldHVybiBuZXdEb2Ncblx0fVxuXG5cdHNhdmUoZmlsZSxvcHRpb25zKXtcblx0XHRmaWxlPWZpbGV8fHRoaXMucHJvcHMubmFtZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGBcblxuXHRcdGxldCBuZXdEb2M9dGhpcy5zZXJpYWxpemUoKVxuXG5cdFx0aWYodHlwZW9mKGRvY3VtZW50KSE9XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuVVJMICYmIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwiYmxvYlwiLG1pbWVUeXBlOnRoaXMuY29uc3RydWN0b3IubWltZX0pXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcblx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxuXHRcdFx0bGluay5ocmVmID0gdXJsO1xuXHRcdFx0bGluay5jbGljaygpXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXG5cdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcIm5vZGVidWZmZXJcIn0pXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9Pntcblx0XHRcdFx0XHRlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y2xvbmUoKXtcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9Pntcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cblx0XHRcdGlmKHYuY2hlZXJpbyl7XG5cdFx0XHRcdHppcC5maWxlKHYubmFtZSx2LnhtbCgpLHYub3B0aW9ucylcblx0XHRcdFx0c3RhdGVba109emlwLmZpbGUodi5uYW1lKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHppcC5maWxlKHYubmFtZSx2Ll9kYXRhLHYub3B0aW9ucylcblx0XHRcdFx0c3RhdGVba109emlwLmZpbGUodi5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHN0YXRlXG5cdFx0fSx7fSlcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IocGFydHMsemlwLCBwcm9wcylcblx0fVxuXG5cdC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdGNvbnN0IERvY3VtZW50U2VsZj10aGlzXG5cblx0XHRpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBaaXBEb2N1bWVudClcblx0XHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoaW5wdXRGaWxlKVxuXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRsZXQgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwgKGlucHV0RmlsZS5uYW1lID8ge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNyZWF0ZSgpe1xuXHRcdHJldHVybiB0aGlzLmxvYWQoYCR7X19kaXJuYW1lfS8uLi90ZW1wbGF0ZXMvYmxhbmsuJHt0aGlzLmV4dH1gKVxuXHR9XG5cblx0c3RhdGljIHBhcnNlWG1sKGRhdGEpe1xuXHRcdHRyeXtcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgQ29udGVudERvbUhhbmRsZXIob3B0KVxuXHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKGRhdGEpXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxuXHRcdFx0aWYodHlwZW9mKHBhcnNlZC5jaGVlcmlvKT09XCJ1bmRlZmluZWRcIilcblx0XHRcdFx0cGFyc2VkLmNoZWVyaW89XCJjdXN0b21pemVkXCJcblx0XHRcdHJldHVybiBwYXJzZWRcblx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIENvbnRlbnREb21IYW5kbGVyIGV4dGVuZHMgRG9tSGFuZGxlcntcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xuXHRcdGlmKGVsLnR5cGU9PVwidGV4dFwiICYmIChlbC5kYXRhWzBdPT0nXFxyJyB8fCBlbC5kYXRhWzBdPT0nXFxuJykpXG5cdFx0XHQ7Ly9yZW1vdmUgZm9ybWF0IHdoaXRlc3BhY2VzXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHN1cGVyLl9hZGREb21FbGVtZW50KGVsKVxuXHR9XG59XG4iXX0=