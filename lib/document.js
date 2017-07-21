"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiZmlsZSIsIm9wdGlvbnMiLCJEYXRlIiwibm93IiwibmV3RG9jIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJwYXRoIiwieG1sIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJnZW5lcmF0ZSIsInR5cGUiLCJtaW1lVHlwZSIsIm1pbWUiLCJ1cmwiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiZGVjb2RlRW50aXRpZXMiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxXO0FBSXBCLHNCQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0E7Ozs7MEJBRU9DLEksRUFBSztBQUNaLFVBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFYLENBQVA7QUFDQTs7OzhCQUVXQSxJLEVBQUs7QUFDaEIsT0FBSUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxPQUFLSCxLQUFLSSxZQUFMLEVBQVQsQ0FIZ0IsQ0FHWTtBQUM1QkQsUUFBS0YsS0FBTCxHQUFXRCxLQUFLRSxLQUFMLENBQVdELEtBQVgsR0FBaUJBLEtBQTVCLENBSmdCLENBSWlCO0FBQ2pDLFVBQU9FLElBQVA7QUFDQTs7O2dDQUVhSixJLEVBQUs7QUFDbEIsT0FBTUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBWDtBQUNBLE9BQUcsQ0FBQ0MsSUFBSixFQUNDLE9BQU8sSUFBUCxDQURELEtBRUssSUFBR0EsS0FBS0ssT0FBUixFQUNKLE9BQU9MLElBQVAsQ0FESSxLQUdKLE9BQU8sS0FBS0osS0FBTCxDQUFXRyxJQUFYLElBQWlCLEtBQUtPLFdBQUwsQ0FBaUJDLFFBQWpCLENBQTBCUCxLQUFLUSxNQUFMLEVBQTFCLENBQXhCO0FBQ0Q7Ozt3QkFFS0MsVSxFQUFXLENBRWhCOzs7MkJBRU8sQ0FFUDs7O3VCQUVJQyxJLEVBQUtDLE8sRUFBUTtBQUFBOztBQUNqQkQsVUFBS0EsUUFBTSxLQUFLWixLQUFMLENBQVdDLElBQWpCLElBQTBCYSxLQUFLQyxHQUFMLEVBQTFCLFVBQUw7O0FBRUEsT0FBSUMsU0FBTyxxQkFBWDtBQUNBQyxVQUFPQyxJQUFQLENBQVksS0FBS3BCLEtBQWpCLEVBQXdCcUIsT0FBeEIsQ0FBZ0MsZ0JBQU07QUFDckMsUUFBSWpCLE9BQUssTUFBS0osS0FBTCxDQUFXc0IsSUFBWCxDQUFUO0FBQ0EsUUFBR2xCLEtBQUtLLE9BQVIsRUFBZ0I7QUFDZlMsWUFBT0osSUFBUCxDQUFZUSxJQUFaLEVBQWlCbEIsS0FBS21CLEdBQUwsRUFBakI7QUFDQSxLQUZELE1BRUs7QUFDSkwsWUFBT0osSUFBUCxDQUFZUSxJQUFaLEVBQWlCbEIsS0FBS0UsS0FBdEIsRUFBNkJGLEtBQUtXLE9BQWxDO0FBQ0E7QUFDRCxJQVBEO0FBUUEsT0FBRyxPQUFPUyxRQUFQLElBQWtCLFdBQWxCLElBQWlDQyxPQUFPQyxHQUF4QyxJQUErQ0QsT0FBT0MsR0FBUCxDQUFXQyxlQUE3RCxFQUE2RTtBQUM1RSxRQUFJcEIsT0FBS1csT0FBT1UsUUFBUCxjQUFvQmIsT0FBcEIsSUFBNEJjLE1BQUssTUFBakMsRUFBd0NDLFVBQVMsS0FBS3BCLFdBQUwsQ0FBaUJxQixJQUFsRSxJQUFUO0FBQ0EsUUFBSUMsTUFBTVAsT0FBT0MsR0FBUCxDQUFXQyxlQUFYLENBQTJCcEIsSUFBM0IsQ0FBVjtBQUNBLFFBQUkwQixPQUFPVCxTQUFTVSxhQUFULENBQXVCLEdBQXZCLENBQVg7QUFDQVYsYUFBU1csSUFBVCxDQUFjQyxXQUFkLENBQTBCSCxJQUExQjtBQUNBQSxTQUFLSSxRQUFMLEdBQWdCdkIsSUFBaEI7QUFDQW1CLFNBQUtLLElBQUwsR0FBWU4sR0FBWjtBQUNBQyxTQUFLTSxLQUFMO0FBQ0FmLGFBQVNXLElBQVQsQ0FBY0ssV0FBZCxDQUEwQlAsSUFBMUI7QUFDQSxJQVRELE1BU0s7QUFDSixRQUFJMUIsUUFBS1csT0FBT1UsUUFBUCxjQUFvQmIsT0FBcEIsSUFBNEJjLE1BQUssWUFBakMsSUFBVDtBQUNBLFdBQU8sSUFBSVksT0FBSixDQUFZLFVBQUNDLE9BQUQsRUFBU0MsTUFBVDtBQUFBLFlBQ2xCQyxRQUFRLE1BQUksR0FBWixFQUFpQkMsU0FBakIsQ0FBMkIvQixJQUEzQixFQUFnQ1AsS0FBaEMsRUFBcUMsaUJBQU87QUFDM0N1QyxjQUFRSCxPQUFPRyxLQUFQLENBQVIsR0FBd0JKLFFBQVFuQyxLQUFSLENBQXhCO0FBQ0EsTUFGRCxDQURrQjtBQUFBLEtBQVosQ0FBUDtBQUtBO0FBQ0Q7OzswQkFFTTtBQUFBOztBQUNOLE9BQUl3QyxNQUFJLHFCQUFSO0FBQ0EsT0FBSTdDLFFBQU9BLFFBQVE4QyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLFNBQUwsQ0FBZSxLQUFLaEQsS0FBcEIsQ0FBWCxDQUFSLEdBQWlEQSxLQUE1RDtBQUNBLE9BQUlGLFFBQU1tQixPQUFPQyxJQUFQLENBQVksS0FBS3BCLEtBQWpCLEVBQXdCbUQsTUFBeEIsQ0FBK0IsVUFBQ0MsS0FBRCxFQUFRQyxDQUFSLEVBQVk7QUFDcEQsUUFBSUMsSUFBRSxPQUFLdEQsS0FBTCxDQUFXcUQsQ0FBWCxDQUFOO0FBQ0EsUUFBR0MsRUFBRTdDLE9BQUwsRUFBYTtBQUNaMkMsV0FBTUMsQ0FBTixJQUFTLE9BQUszQyxXQUFMLENBQWlCQyxRQUFqQixDQUEwQjJDLEVBQUUvQixHQUFGLEVBQTFCLENBQVQ7QUFDQSxLQUZELE1BRUs7QUFDSndCLFNBQUlqQyxJQUFKLENBQVN3QyxFQUFFbkQsSUFBWCxFQUFnQm1ELEVBQUVoRCxLQUFsQixFQUF3QmdELEVBQUV2QyxPQUExQjtBQUNBcUMsV0FBTUMsQ0FBTixJQUFTTixJQUFJakMsSUFBSixDQUFTd0MsRUFBRW5ELElBQVgsQ0FBVDtBQUNBO0FBQ0QsV0FBT2lELEtBQVA7QUFDQSxJQVRTLEVBU1IsRUFUUSxDQUFWO0FBVUEsVUFBTyxJQUFJLEtBQUsxQyxXQUFULENBQXFCVixLQUFyQixFQUEyQitDLEdBQTNCLEVBQWdDN0MsS0FBaEMsQ0FBUDtBQUNBOztBQUVEOzs7Ozs7Ozt1QkFPWXFELFMsRUFBVTtBQUNyQixPQUFNQyxlQUFhLElBQW5COztBQUVBLE9BQUdELHFCQUFxQnhELFdBQXhCLEVBQ0MsT0FBTzBDLFFBQVFDLE9BQVIsQ0FBZ0JhLFNBQWhCLENBQVA7O0FBRUQsVUFBTyxJQUFJZCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ3JDLGFBQVNNLEtBQVQsQ0FBZTFDLElBQWYsRUFBOEI7QUFBQSxTQUFUTCxLQUFTLHVFQUFILEVBQUc7O0FBQzdCLFNBQUc7QUFDRixVQUFJRCxNQUFJLG9CQUFVTSxJQUFWLENBQVI7QUFBQSxVQUF3QlAsUUFBTSxFQUE5QjtBQUNBQyxVQUFJd0QsTUFBSixDQUFXLFVBQUNuQyxJQUFELEVBQU1SLElBQU47QUFBQSxjQUFhZCxNQUFNc0IsSUFBTixJQUFZUixJQUF6QjtBQUFBLE9BQVg7QUFDQTRCLGNBQVEsSUFBSWMsWUFBSixDQUFpQnhELEtBQWpCLEVBQXVCQyxHQUF2QixFQUEyQkMsS0FBM0IsQ0FBUjtBQUNBLE1BSkQsQ0FJQyxPQUFNNEMsS0FBTixFQUFZO0FBQ1pILGFBQU9HLEtBQVA7QUFDQTtBQUNEOztBQUVELFFBQUcsT0FBT1MsU0FBUCxJQUFrQixRQUFyQixFQUE4QjtBQUFDO0FBQzlCWCxhQUFRLElBQVIsRUFBY2MsUUFBZCxDQUF1QkgsU0FBdkIsRUFBaUMsVUFBU1QsS0FBVCxFQUFnQnZDLElBQWhCLEVBQXFCO0FBQ3JELFVBQUd1QyxLQUFILEVBQ0NILE9BQU9HLEtBQVAsRUFERCxLQUVLLElBQUd2QyxJQUFILEVBQVE7QUFDWjBDLGFBQU0xQyxJQUFOLEVBQVksRUFBQ0osTUFBS29ELFVBQVVJLEtBQVYsQ0FBZ0IsUUFBaEIsRUFBMEJDLEdBQTFCLEdBQWdDQyxPQUFoQyxDQUF3QyxVQUF4QyxFQUFtRCxFQUFuRCxDQUFOLEVBQVo7QUFDQTtBQUNELE1BTkQ7QUFPQSxLQVJELE1BUU0sSUFBR04scUJBQXFCTyxJQUF4QixFQUE2QjtBQUNsQyxTQUFJQyxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxZQUFPRSxNQUFQLEdBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3hCakIsWUFBTWlCLEVBQUVDLE1BQUYsQ0FBU0MsTUFBZixFQUF3QmIsVUFBVXBELElBQVYsR0FBaUI7QUFDdkNBLGFBQUtvRCxVQUFVcEQsSUFBVixDQUFlMEQsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQURrQztBQUV2Q1EscUJBQWFkLFVBQVVjLFlBRmdCO0FBR3ZDQyxhQUFLZixVQUFVZTtBQUh3QixPQUFqQixHQUluQixFQUFDQSxNQUFLZixVQUFVZSxJQUFoQixFQUpMO0FBS0EsTUFORDtBQU9BUCxZQUFPUSxpQkFBUCxDQUF5QmhCLFNBQXpCO0FBQ0EsS0FWSyxNQVVBO0FBQ0xOLFdBQU1NLFNBQU47QUFDQTtBQUNELElBaENNLENBQVA7QUFpQ0E7OzsyQkFFYztBQUNkLFVBQU8sS0FBS2lCLElBQUwsQ0FBYUMsU0FBYiw0QkFBNkMsS0FBS0MsR0FBbEQsQ0FBUDtBQUNBOzs7MkJBRWVuRSxJLEVBQUs7QUFDcEIsT0FBRztBQUNGLFFBQUlvRSxNQUFJLEVBQUNDLFNBQVEsSUFBVCxFQUFjQyxnQkFBZ0IsS0FBOUIsRUFBUjtBQUNBLFFBQUlDLFVBQVEsSUFBSUMsaUJBQUosQ0FBc0JKLEdBQXRCLENBQVo7QUFDQSwyQkFBV0csT0FBWCxFQUFtQkgsR0FBbkIsRUFBd0JLLEdBQXhCLENBQTRCekUsSUFBNUI7QUFDQSxRQUFJMEUsU0FBTyxrQkFBTVQsSUFBTixDQUFXTSxRQUFRSSxHQUFuQixFQUF1QlAsR0FBdkIsQ0FBWDtBQUNBLFFBQUcsT0FBT00sT0FBT3hFLE9BQWQsSUFBd0IsV0FBM0IsRUFDQ3dFLE9BQU94RSxPQUFQLEdBQWUsWUFBZjtBQUNELFdBQU93RSxNQUFQO0FBQ0EsSUFSRCxDQVFDLE9BQU1uQyxLQUFOLEVBQVk7QUFDWnFDLFlBQVFyQyxLQUFSLENBQWNBLEtBQWQ7QUFDQSxXQUFPLElBQVA7QUFDQTtBQUNEOzs7Ozs7QUF4Sm1CL0MsVyxDQUNiMkUsRyxHQUFJLFM7QUFEUzNFLFcsQ0FFYmdDLEksR0FBSyxpQjtrQkFGUWhDLFc7O0lBMkpmZ0YsaUI7Ozs7Ozs7Ozs7O2lDQUNVSyxFLEVBQUc7QUFDakIsT0FBR0EsR0FBR3ZELElBQUgsSUFBUyxNQUFULEtBQW9CdUQsR0FBRzdFLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBWixJQUFvQjZFLEdBQUc3RSxJQUFILENBQVEsQ0FBUixLQUFZLElBQXBELENBQUgsRUFDQyxDQURELENBQ0U7QUFERixRQUdDLDRJQUE0QjZFLEVBQTVCO0FBQ0QiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAsIHtaaXBPYmplY3R9IGZyb20gJ2pzemlwJ1xuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBaaXBEb2N1bWVudHtcblx0c3RhdGljIGV4dD1cInVua25vd25cIlxuXHRzdGF0aWMgbWltZT1cImFwcGxpY2F0aW9uL3ppcFwiXG5cdFxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXREYXRhUGFydChuYW1lKXtcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbChwYXJ0LmFzVGV4dCgpKVxuXHR9XG5cblx0cGFyc2UoZG9tSGFuZGxlcil7XG5cblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdH1cblxuXHRzYXZlKGZpbGUsb3B0aW9ucyl7XG5cdFx0ZmlsZT1maWxlfHx0aGlzLnByb3BzLm5hbWV8fGAke0RhdGUubm93KCl9LmRvY3hgXG5cdFx0XG5cdFx0bGV0IG5ld0RvYz1uZXcgSlNaaXAoKVxuXHRcdE9iamVjdC5rZXlzKHRoaXMucGFydHMpLmZvckVhY2gocGF0aD0+e1xuXHRcdFx0bGV0IHBhcnQ9dGhpcy5wYXJ0c1twYXRoXVxuXHRcdFx0aWYocGFydC5jaGVlcmlvKXtcblx0XHRcdFx0bmV3RG9jLmZpbGUocGF0aCxwYXJ0LnhtbCgpKVxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC5fZGF0YSwgcGFydC5vcHRpb25zKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0aWYodHlwZW9mKGRvY3VtZW50KSE9XCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cuVVJMICYmIHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKXtcblx0XHRcdGxldCBkYXRhPW5ld0RvYy5nZW5lcmF0ZSh7Li4ub3B0aW9ucyx0eXBlOlwiYmxvYlwiLG1pbWVUeXBlOnRoaXMuY29uc3RydWN0b3IubWltZX0pXG5cdFx0XHRsZXQgdXJsID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZGF0YSlcblx0XHRcdGxldCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXG5cdFx0XHRsaW5rLmRvd25sb2FkID0gZmlsZVxuXHRcdFx0bGluay5ocmVmID0gdXJsO1xuXHRcdFx0bGluay5jbGljaygpXG5cdFx0XHRkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGxpbmspXG5cdFx0fWVsc2V7XG5cdFx0XHRsZXQgZGF0YT1uZXdEb2MuZ2VuZXJhdGUoey4uLm9wdGlvbnMsdHlwZTpcIm5vZGVidWZmZXJcIn0pXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XG5cdFx0XHRcdHJlcXVpcmUoXCJmXCIrXCJzXCIpLndyaXRlRmlsZShmaWxlLGRhdGEsZXJyb3I9Pntcblx0XHRcdFx0XHRlcnJvciA/IHJlamVjdChlcnJvcikgOiByZXNvbHZlKGRhdGEpXG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cdFx0fVxuXHR9XG5cblx0Y2xvbmUoKXtcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9Pntcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cblx0XHRcdGlmKHYuY2hlZXJpbyl7XG5cdFx0XHRcdHN0YXRlW2tdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwodi54bWwoKSlcblx0XHRcdH1lbHNle1xuXHRcdFx0XHR6aXAuZmlsZSh2Lm5hbWUsdi5fZGF0YSx2Lm9wdGlvbnMpXG5cdFx0XHRcdHN0YXRlW2tdPXppcC5maWxlKHYubmFtZSlcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0se30pXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXG5cdH1cblxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHRjb25zdCBEb2N1bWVudFNlbGY9dGhpc1xuXHRcdFxuXHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIFppcERvY3VtZW50KVxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShpbnB1dEZpbGUpXG5cdFx0XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHRyeXtcblx0XHRcdFx0XHRsZXQgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHRcdH1jYXRjaChlcnJvcil7XG5cdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwgKGlucHV0RmlsZS5uYW1lID8ge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNyZWF0ZSgpe1xuXHRcdHJldHVybiB0aGlzLmxvYWQoYCR7X19kaXJuYW1lfS8uLi90ZW1wbGF0ZXMvYmxhbmsuJHt0aGlzLmV4dH1gKVxuXHR9XG5cblx0c3RhdGljIHBhcnNlWG1sKGRhdGEpe1xuXHRcdHRyeXtcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XG5cdFx0XHRsZXQgaGFuZGxlcj1uZXcgQ29udGVudERvbUhhbmRsZXIob3B0KVxuXHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKGRhdGEpXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxuXHRcdFx0aWYodHlwZW9mKHBhcnNlZC5jaGVlcmlvKT09XCJ1bmRlZmluZWRcIilcblx0XHRcdFx0cGFyc2VkLmNoZWVyaW89XCJjdXN0b21pemVkXCJcblx0XHRcdHJldHVybiBwYXJzZWRcblx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcblx0XHRcdHJldHVybiBudWxsXG5cdFx0fVxuXHR9XG59XG5cbmNsYXNzIENvbnRlbnREb21IYW5kbGVyIGV4dGVuZHMgRG9tSGFuZGxlcntcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xuXHRcdGlmKGVsLnR5cGU9PVwidGV4dFwiICYmIChlbC5kYXRhWzBdPT0nXFxyJyB8fCBlbC5kYXRhWzBdPT0nXFxuJykpXG5cdFx0XHQ7Ly9yZW1vdmUgZm9ybWF0IHdoaXRlc3BhY2VzXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHN1cGVyLl9hZGREb21FbGVtZW50KGVsKVxuXHR9XG59XG4iXX0=