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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJfc2hvdWxkUmVsZWFzZWQiLCJNYXAiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwidHlwZSIsImhhcyIsInNldCIsIlVSTCIsImNyZWF0ZU9iamVjdFVSTCIsIkJsb2IiLCJnZXREYXRhUGFydCIsImdldCIsInVybCIsInJldm9rZU9iamVjdFVSTCIsImNoZWVyaW8iLCJjb25zdHJ1Y3RvciIsInBhcnNlWG1sIiwiYXNUZXh0IiwiZG9tSGFuZGxlciIsIm5ld0RvYyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicGF0aCIsImZpbGUiLCJ4bWwiLCJvcHRpb25zIiwiRGF0ZSIsIm5vdyIsInNlcmlhbGl6ZSIsImRvY3VtZW50Iiwid2luZG93IiwiZ2VuZXJhdGUiLCJtaW1lVHlwZSIsIm1pbWUiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJkZWNvZGVFbnRpdGllcyIsImhhbmRsZXIiLCJDb250ZW50RG9tSGFuZGxlciIsImVuZCIsInBhcnNlZCIsImRvbSIsImNvbnNvbGUiLCJlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxXO0FBSXBCLHNCQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsZUFBTCxHQUFxQixJQUFJQyxHQUFKLEVBQXJCO0FBQ0E7Ozs7MEJBRU9DLEksRUFBSztBQUNaLFVBQU8sS0FBS0wsS0FBTCxDQUFXSyxJQUFYLENBQVA7QUFDQTs7OzhCQUVXQSxJLEVBQUs7QUFDaEIsT0FBSUMsT0FBSyxLQUFLTixLQUFMLENBQVdLLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxPQUFLSCxLQUFLSSxZQUFMLEVBQVQsQ0FIZ0IsQ0FHWTtBQUM1QkQsUUFBS0YsS0FBTCxHQUFXRCxLQUFLRSxLQUFMLENBQVdELEtBQVgsR0FBaUJBLEtBQTVCLENBSmdCLENBSWlCO0FBQ2pDLFVBQU9FLElBQVA7QUFDQTs7O21DQUVnQkosSSxFQUFnQjtBQUFBLE9BQVhNLElBQVcsdUVBQU4sS0FBTTs7QUFDaEMsT0FBSUwsT0FBSyxLQUFLTixLQUFMLENBQVdLLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFHLENBQUMsS0FBS0osZUFBTCxDQUFxQlMsR0FBckIsQ0FBeUJMLEtBQXpCLENBQUosRUFBb0M7QUFDbkMsU0FBS0osZUFBTCxDQUFxQlUsR0FBckIsQ0FBeUJOLEtBQXpCLEVBQStCTyxJQUFJQyxlQUFKLENBQW9CLElBQUlDLElBQUosQ0FBUyxDQUFDLEtBQUtDLFdBQUwsQ0FBaUJaLElBQWpCLENBQUQsQ0FBVCxFQUFrQyxFQUFDTSxVQUFELEVBQWxDLENBQXBCLENBQS9CO0FBQ0E7QUFDRCxVQUFPLEtBQUtSLGVBQUwsQ0FBcUJlLEdBQXJCLENBQXlCWCxLQUF6QixDQUFQO0FBQ0E7OzsrQkFFWUYsSSxFQUFLO0FBQ2pCLE9BQUlDLE9BQUssS0FBS04sS0FBTCxDQUFXSyxJQUFYLENBQVQ7QUFDQSxPQUFJRSxRQUFNRCxLQUFLRSxLQUFMLENBQVdELEtBQXJCO0FBQ0EsVUFBT0EsS0FBUDtBQUNBOzs7NEJBRVE7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDUix5QkFBbUIsS0FBS0osZUFBeEIsOEhBQXdDO0FBQUE7QUFBQSxTQUE3QmdCLEdBQTZCOztBQUN2Q0wsU0FBSU0sZUFBSixDQUFvQkQsR0FBcEI7QUFDQTtBQUhPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJUjs7O2dDQUVhZCxJLEVBQUs7QUFDbEIsT0FBTUMsT0FBSyxLQUFLTixLQUFMLENBQVdLLElBQVgsQ0FBWDtBQUNBLE9BQUcsQ0FBQ0MsSUFBSixFQUNDLE9BQU8sSUFBUCxDQURELEtBRUssSUFBR0EsS0FBS2UsT0FBUixFQUNKLE9BQU9mLElBQVAsQ0FESSxLQUdKLE9BQU8sS0FBS04sS0FBTCxDQUFXSyxJQUFYLElBQWlCLEtBQUtpQixXQUFMLENBQWlCQyxRQUFqQixDQUEwQmpCLEtBQUtrQixNQUFMLEVBQTFCLENBQXhCO0FBQ0Q7Ozt3QkFFS0MsVSxFQUFXLENBRWhCOzs7MkJBRU8sQ0FFUDs7OzhCQUVVO0FBQUE7O0FBQ1YsT0FBSUMsU0FBTyxxQkFBWDtBQUNBQyxVQUFPQyxJQUFQLENBQVksS0FBSzVCLEtBQWpCLEVBQXdCNkIsT0FBeEIsQ0FBZ0MsZ0JBQU07QUFDckMsUUFBSXZCLE9BQUssTUFBS04sS0FBTCxDQUFXOEIsSUFBWCxDQUFUO0FBQ0EsUUFBR3hCLEtBQUtlLE9BQVIsRUFBZ0I7QUFDZkssWUFBT0ssSUFBUCxDQUFZRCxJQUFaLEVBQWlCeEIsS0FBSzBCLEdBQUwsRUFBakI7QUFDQSxLQUZELE1BRUs7QUFDSk4sWUFBT0ssSUFBUCxDQUFZRCxJQUFaLEVBQWlCeEIsS0FBS0UsS0FBdEIsRUFBNkJGLEtBQUsyQixPQUFsQztBQUNBO0FBQ0QsSUFQRDtBQVFBLFVBQU9QLE1BQVA7QUFDQTs7O3VCQUVJSyxJLEVBQUtFLE8sRUFBUTtBQUNqQkYsVUFBS0EsUUFBTSxLQUFLN0IsS0FBTCxDQUFXRyxJQUFqQixJQUEwQjZCLEtBQUtDLEdBQUwsRUFBMUIsVUFBTDs7QUFFQSxPQUFJVCxTQUFPLEtBQUtVLFNBQUwsRUFBWDs7QUFFQSxPQUFHLE9BQU9DLFFBQVAsSUFBa0IsV0FBbEIsSUFBaUNDLE9BQU94QixHQUF4QyxJQUErQ3dCLE9BQU94QixHQUFQLENBQVdDLGVBQTdELEVBQTZFO0FBQzVFLFFBQUlOLE9BQUtpQixPQUFPYSxRQUFQLGNBQW9CTixPQUFwQixJQUE0QnRCLE1BQUssTUFBakMsRUFBd0M2QixVQUFTLEtBQUtsQixXQUFMLENBQWlCbUIsSUFBbEUsSUFBVDtBQUNBLFFBQUl0QixNQUFNbUIsT0FBT3hCLEdBQVAsQ0FBV0MsZUFBWCxDQUEyQk4sSUFBM0IsQ0FBVjtBQUNBLFFBQUlpQyxPQUFPTCxTQUFTTSxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQU4sYUFBU08sSUFBVCxDQUFjQyxXQUFkLENBQTBCSCxJQUExQjtBQUNBQSxTQUFLSSxRQUFMLEdBQWdCZixJQUFoQjtBQUNBVyxTQUFLSyxJQUFMLEdBQVk1QixHQUFaO0FBQ0F1QixTQUFLTSxLQUFMO0FBQ0FYLGFBQVNPLElBQVQsQ0FBY0ssV0FBZCxDQUEwQlAsSUFBMUI7QUFDQUosV0FBT3hCLEdBQVAsQ0FBV00sZUFBWCxDQUEyQkQsR0FBM0I7QUFDQSxJQVZELE1BVUs7QUFBQTtBQUNKLFNBQUlWLE9BQUtpQixPQUFPYSxRQUFQLGNBQW9CTixPQUFwQixJQUE0QnRCLE1BQUssWUFBakMsSUFBVDtBQUNBO0FBQUEsU0FBTyxJQUFJdUMsT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVDtBQUFBLGNBQ2xCQyxRQUFRLE1BQUksR0FBWixFQUFpQkMsU0FBakIsQ0FBMkJ2QixJQUEzQixFQUFnQ3RCLElBQWhDLEVBQXFDLGlCQUFPO0FBQzNDOEMsZ0JBQVFILE9BQU9HLEtBQVAsQ0FBUixHQUF3QkosUUFBUTFDLElBQVIsQ0FBeEI7QUFDQSxRQUZELENBRGtCO0FBQUEsT0FBWjtBQUFQO0FBRkk7O0FBQUE7QUFPSjtBQUNEOzs7MEJBRU07QUFBQTs7QUFDTixPQUFJK0MsTUFBSSxxQkFBUjtBQUNBLE9BQUl0RCxRQUFPQSxRQUFRdUQsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxTQUFMLENBQWUsS0FBS3pELEtBQXBCLENBQVgsQ0FBUixHQUFpREEsS0FBNUQ7QUFDQSxPQUFJRixRQUFNMkIsT0FBT0MsSUFBUCxDQUFZLEtBQUs1QixLQUFqQixFQUF3QjRELE1BQXhCLENBQStCLFVBQUNDLEtBQUQsRUFBUUMsQ0FBUixFQUFZO0FBQ3BELFFBQUlDLElBQUUsT0FBSy9ELEtBQUwsQ0FBVzhELENBQVgsQ0FBTjtBQUNBLFFBQUdDLEVBQUUxQyxPQUFMLEVBQWE7QUFDWndDLFdBQU1DLENBQU4sSUFBUyxPQUFLeEMsV0FBTCxDQUFpQkMsUUFBakIsQ0FBMEJ3QyxFQUFFL0IsR0FBRixFQUExQixDQUFUO0FBQ0EsS0FGRCxNQUVLO0FBQ0p3QixTQUFJekIsSUFBSixDQUFTZ0MsRUFBRTFELElBQVgsRUFBZ0IwRCxFQUFFdkQsS0FBbEIsRUFBd0J1RCxFQUFFOUIsT0FBMUI7QUFDQTRCLFdBQU1DLENBQU4sSUFBU04sSUFBSXpCLElBQUosQ0FBU2dDLEVBQUUxRCxJQUFYLENBQVQ7QUFDQTtBQUNELFdBQU93RCxLQUFQO0FBQ0EsSUFUUyxFQVNSLEVBVFEsQ0FBVjtBQVVBLFVBQU8sSUFBSSxLQUFLdkMsV0FBVCxDQUFxQnRCLEtBQXJCLEVBQTJCd0QsR0FBM0IsRUFBZ0N0RCxLQUFoQyxDQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozs7O3VCQU9ZOEQsUyxFQUFVO0FBQ3JCLE9BQU1DLGVBQWEsSUFBbkI7O0FBRUEsT0FBR0QscUJBQXFCakUsV0FBeEIsRUFDQyxPQUFPbUQsUUFBUUMsT0FBUixDQUFnQmEsU0FBaEIsQ0FBUDs7QUFFRCxVQUFPLElBQUlkLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBbUI7QUFDckMsYUFBU00sS0FBVCxDQUFlakQsSUFBZixFQUE4QjtBQUFBLFNBQVRQLEtBQVMsdUVBQUgsRUFBRzs7QUFDN0IsU0FBRztBQUFBO0FBQ0YsV0FBSUQsTUFBSSxvQkFBVVEsSUFBVixDQUFSO0FBQUEsV0FBd0JULFFBQU0sRUFBOUI7QUFDQUMsV0FBSWlFLE1BQUosQ0FBVyxVQUFDcEMsSUFBRCxFQUFNQyxJQUFOO0FBQUEsZUFBYS9CLE1BQU04QixJQUFOLElBQVlDLElBQXpCO0FBQUEsUUFBWDtBQUNBb0IsZUFBUSxJQUFJYyxZQUFKLENBQWlCakUsS0FBakIsRUFBdUJDLEdBQXZCLEVBQTJCQyxLQUEzQixDQUFSO0FBSEU7QUFJRixNQUpELENBSUMsT0FBTXFELEtBQU4sRUFBWTtBQUNaSCxhQUFPRyxLQUFQO0FBQ0E7QUFDRDs7QUFFRCxRQUFHLE9BQU9TLFNBQVAsSUFBa0IsUUFBckIsRUFBOEI7QUFBQztBQUM5QlgsYUFBUSxJQUFSLEVBQWNjLFFBQWQsQ0FBdUJILFNBQXZCLEVBQWlDLFVBQVNULEtBQVQsRUFBZ0I5QyxJQUFoQixFQUFxQjtBQUNyRCxVQUFHOEMsS0FBSCxFQUNDSCxPQUFPRyxLQUFQLEVBREQsS0FFSyxJQUFHOUMsSUFBSCxFQUFRO0FBQ1ppRCxhQUFNakQsSUFBTixFQUFZLEVBQUNKLE1BQUsyRCxVQUFVSSxLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQ0MsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBTixFQUFaO0FBQ0E7QUFDRCxNQU5EO0FBT0EsS0FSRCxNQVFNLElBQUdOLHFCQUFxQmhELElBQXhCLEVBQTZCO0FBQ2xDLFNBQUl1RCxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxZQUFPRSxNQUFQLEdBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3hCaEIsWUFBTWdCLEVBQUVDLE1BQUYsQ0FBU0MsTUFBZixFQUF3QlosVUFBVTNELElBQVYsR0FBaUI7QUFDdkNBLGFBQUsyRCxVQUFVM0QsSUFBVixDQUFlaUUsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQURrQztBQUV2Q08scUJBQWFiLFVBQVVhLFlBRmdCO0FBR3ZDQyxhQUFLZCxVQUFVYztBQUh3QixPQUFqQixHQUluQixFQUFDQSxNQUFLZCxVQUFVYyxJQUFoQixFQUpMO0FBS0EsTUFORDtBQU9BUCxZQUFPUSxpQkFBUCxDQUF5QmYsU0FBekI7QUFDQSxLQVZLLE1BVUE7QUFDTE4sV0FBTU0sU0FBTjtBQUNBO0FBQ0QsSUFoQ00sQ0FBUDtBQWlDQTs7OzJCQUVjO0FBQ2QsVUFBTyxLQUFLZ0IsSUFBTCxDQUFhQyxTQUFiLDRCQUE2QyxLQUFLQyxHQUFsRCxDQUFQO0FBQ0E7OzsyQkFFZXpFLEksRUFBSztBQUNwQixPQUFHO0FBQ0YsUUFBSTBFLE1BQUksRUFBQ0MsU0FBUSxJQUFULEVBQWNDLGdCQUFnQixLQUE5QixFQUFSO0FBQ0EsUUFBSUMsVUFBUSxJQUFJQyxpQkFBSixDQUFzQkosR0FBdEIsQ0FBWjtBQUNBLDJCQUFXRyxPQUFYLEVBQW1CSCxHQUFuQixFQUF3QkssR0FBeEIsQ0FBNEIvRSxJQUE1QjtBQUNBLFFBQUlnRixTQUFPLGtCQUFNVCxJQUFOLENBQVdNLFFBQVFJLEdBQW5CLEVBQXVCUCxHQUF2QixDQUFYO0FBQ0EsUUFBRyxPQUFPTSxPQUFPcEUsT0FBZCxJQUF3QixXQUEzQixFQUNDb0UsT0FBT3BFLE9BQVAsR0FBZSxZQUFmO0FBQ0QsV0FBT29FLE1BQVA7QUFDQSxJQVJELENBUUMsT0FBTWxDLEtBQU4sRUFBWTtBQUNab0MsWUFBUXBDLEtBQVIsQ0FBY0EsS0FBZDtBQUNBLFdBQU8sSUFBUDtBQUNBO0FBQ0Q7Ozs7OztBQXJMbUJ4RCxXLENBQ2JtRixHLEdBQUksUztBQURTbkYsVyxDQUViMEMsSSxHQUFLLGlCO2tCQUZRMUMsVzs7SUF3TGZ3RixpQjs7Ozs7Ozs7Ozs7aUNBQ1VLLEUsRUFBRztBQUNqQixPQUFHQSxHQUFHakYsSUFBSCxJQUFTLE1BQVQsS0FBb0JpRixHQUFHbkYsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFaLElBQW9CbUYsR0FBR25GLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBcEQsQ0FBSCxFQUNDLENBREQsQ0FDRTtBQURGLFFBR0MsNElBQTRCbUYsRUFBNUI7QUFDRCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCwge1ppcE9iamVjdH0gZnJvbSAnanN6aXAnXG5pbXBvcnQgY2hlZXIgZnJvbSBcImNoZWVyaW9cIlxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXG5cbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xuXHRzdGF0aWMgZXh0PVwidW5rbm93blwiXG5cdHN0YXRpYyBtaW1lPVwiYXBwbGljYXRpb24vemlwXCJcblxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdFx0dGhpcy5fc2hvdWxkUmVsZWFzZWQ9bmV3IE1hcCgpXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXREYXRhUGFydChuYW1lKXtcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXREYXRhUGFydEFzVXJsKG5hbWUsdHlwZT1cIiovKlwiKXtcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRpZighdGhpcy5fc2hvdWxkUmVsZWFzZWQuaGFzKGNyYzMyKSl7XG5cdFx0XHR0aGlzLl9zaG91bGRSZWxlYXNlZC5zZXQoY3JjMzIsVVJMLmNyZWF0ZU9iamVjdFVSTChuZXcgQmxvYihbdGhpcy5nZXREYXRhUGFydChuYW1lKV0se3R5cGV9KSkpXG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9zaG91bGRSZWxlYXNlZC5nZXQoY3JjMzIpXG5cdH1cblxuXHRnZXRQYXJ0Q3JjMzIobmFtZSl7XG5cdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0cmV0dXJuIGNyYzMyXG5cdH1cblxuXHRyZWxlYXNlKCl7XG5cdFx0Zm9yKGxldCBbLCB1cmxdIG9mIHRoaXMuX3Nob3VsZFJlbGVhc2VkKXtcblx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwodXJsKVxuXHRcdH1cblx0fVxuXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XG5cdFx0Y29uc3QgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0aWYoIXBhcnQpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2UgaWYocGFydC5jaGVlcmlvKVxuXHRcdFx0cmV0dXJuIHBhcnRcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHBhcnQuYXNUZXh0KCkpXG5cdH1cblx0XG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cdFxuXHRzZXJpYWxpemUoKXtcblx0XHRsZXQgbmV3RG9jPW5ldyBKU1ppcCgpXG5cdFx0T2JqZWN0LmtleXModGhpcy5wYXJ0cykuZm9yRWFjaChwYXRoPT57XG5cdFx0XHRsZXQgcGFydD10aGlzLnBhcnRzW3BhdGhdXG5cdFx0XHRpZihwYXJ0LmNoZWVyaW8pe1xuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQueG1sKCkpXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0Ll9kYXRhLCBwYXJ0Lm9wdGlvbnMpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRyZXR1cm4gbmV3RG9jXG5cdH1cblxuXHRzYXZlKGZpbGUsb3B0aW9ucyl7XG5cdFx0ZmlsZT1maWxlfHx0aGlzLnByb3BzLm5hbWV8fGAke0RhdGUubm93KCl9LmRvY3hgXG5cdFx0XG5cdFx0bGV0IG5ld0RvYz10aGlzLnNlcmlhbGl6ZSgpXG5cdFx0XG5cdFx0aWYodHlwZW9mKGRvY3VtZW50KSE9XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuVVJMICYmIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwiYmxvYlwiLG1pbWVUeXBlOnRoaXMuY29uc3RydWN0b3IubWltZX0pXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcblx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxuXHRcdFx0bGluay5ocmVmID0gdXJsO1xuXHRcdFx0bGluay5jbGljaygpXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXG5cdFx0XHR3aW5kb3cuVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcIm5vZGVidWZmZXJcIn0pXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9Pntcblx0XHRcdFx0XHRlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y2xvbmUoKXtcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9Pntcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cblx0XHRcdGlmKHYuY2hlZXJpbyl7XG5cdFx0XHRcdHN0YXRlW2tdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwodi54bWwoKSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR6aXAuZmlsZSh2Lm5hbWUsdi5fZGF0YSx2Lm9wdGlvbnMpXG5cdFx0XHRcdHN0YXRlW2tdPXppcC5maWxlKHYubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0se30pXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXG5cdH1cblxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHRjb25zdCBEb2N1bWVudFNlbGY9dGhpc1xuXG5cdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgWmlwRG9jdW1lbnQpXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGlucHV0RmlsZSlcblxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xuXHRcdFx0XHR0cnl7XG5cdFx0XHRcdFx0bGV0IHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxuXHRcdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIChpbnB1dEZpbGUubmFtZSA/IHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0gOiB7c2l6ZTppbnB1dEZpbGUuc2l6ZX0pKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBjcmVhdGUoKXtcblx0XHRyZXR1cm4gdGhpcy5sb2FkKGAke19fZGlybmFtZX0vLi4vdGVtcGxhdGVzL2JsYW5rLiR7dGhpcy5leHR9YClcblx0fVxuXG5cdHN0YXRpYyBwYXJzZVhtbChkYXRhKXtcblx0XHR0cnl7XG5cdFx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWUsZGVjb2RlRW50aXRpZXM6IGZhbHNlfVxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IENvbnRlbnREb21IYW5kbGVyKG9wdClcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxuXHRcdFx0bGV0IHBhcnNlZD1jaGVlci5sb2FkKGhhbmRsZXIuZG9tLG9wdClcblx0XHRcdGlmKHR5cGVvZihwYXJzZWQuY2hlZXJpbyk9PVwidW5kZWZpbmVkXCIpXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXG5cdFx0XHRyZXR1cm4gcGFyc2VkXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XG5cdF9hZGREb21FbGVtZW50KGVsKXtcblx0XHRpZihlbC50eXBlPT1cInRleHRcIiAmJiAoZWwuZGF0YVswXT09J1xccicgfHwgZWwuZGF0YVswXT09J1xcbicpKVxuXHRcdFx0Oy8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xuXHRcdGVsc2Vcblx0XHRcdHJldHVybiBzdXBlci5fYWRkRG9tRWxlbWVudChlbClcblx0fVxufVxuIl19