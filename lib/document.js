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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiZmlsZSIsIkRhdGUiLCJub3ciLCJuZXdEb2MiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsInBhdGgiLCJ4bWwiLCJvcHRpb25zIiwiZ2VuZXJhdGUiLCJ0eXBlIiwiZG9jdW1lbnQiLCJ3aW5kb3ciLCJVUkwiLCJjcmVhdGVPYmplY3RVUkwiLCJ1cmwiLCJsaW5rIiwiY3JlYXRlRWxlbWVudCIsImJvZHkiLCJhcHBlbmRDaGlsZCIsImRvd25sb2FkIiwiaHJlZiIsImNsaWNrIiwicmVtb3ZlQ2hpbGQiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlcXVpcmUiLCJ3cml0ZUZpbGUiLCJlcnJvciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJmaWx0ZXIiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiZGVjb2RlRW50aXRpZXMiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7QUFF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LFNBQU47QUFDQTtBQUNELElBaENNLENBQVA7QUFpQ0E7OzsyQkFFYztBQUNkLFVBQU8sS0FBS2lCLElBQUwsQ0FBYUMsU0FBYiw0QkFBNkMsS0FBS0MsR0FBbEQsQ0FBUDtBQUNBOzs7MkJBRWVqRSxJLEVBQUs7QUFDcEIsT0FBRztBQUNGLFFBQUlrRSxNQUFJLEVBQUNDLFNBQVEsSUFBVCxFQUFjQyxnQkFBZ0IsS0FBOUIsRUFBUjtBQUNBLFFBQUlDLFVBQVEsSUFBSUMsaUJBQUosQ0FBc0JKLEdBQXRCLENBQVo7QUFDQSwyQkFBV0csT0FBWCxFQUFtQkgsR0FBbkIsRUFBd0JLLEdBQXhCLENBQTRCdkUsSUFBNUI7QUFDQSxRQUFJd0UsU0FBTyxrQkFBTVQsSUFBTixDQUFXTSxRQUFRSSxHQUFuQixFQUF1QlAsR0FBdkIsQ0FBWDtBQUNBLFFBQUcsT0FBT00sT0FBT3RFLE9BQWQsSUFBd0IsV0FBM0IsRUFDQ3NFLE9BQU90RSxPQUFQLEdBQWUsWUFBZjtBQUNELFdBQU9zRSxNQUFQO0FBQ0EsSUFSRCxDQVFDLE9BQU1uQyxLQUFOLEVBQVk7QUFDWnFDLFlBQVFyQyxLQUFSLENBQWNBLEtBQWQ7QUFDQSxXQUFPLElBQVA7QUFDQTtBQUNEOzs7Ozs7a0JBaEptQjdDLFc7O0lBbUpmOEUsaUI7Ozs7Ozs7Ozs7O2lDQUNVSyxFLEVBQUc7QUFDakIsT0FBR0EsR0FBR3pELElBQUgsSUFBUyxNQUFULEtBQW9CeUQsR0FBRzNFLElBQUgsQ0FBUSxDQUFSLEtBQVksSUFBWixJQUFvQjJFLEdBQUczRSxJQUFILENBQVEsQ0FBUixLQUFZLElBQXBELENBQUgsRUFDQyxDQURELENBQ0U7QUFERixRQUdDLDRJQUE0QjJFLEVBQTVCO0FBQ0QiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAsIHtaaXBPYmplY3R9IGZyb20gJ2pzemlwJ1xyXG5pbXBvcnQgY2hlZXIgZnJvbSBcImNoZWVyaW9cIlxyXG5pbXBvcnQge1BhcnNlciwgRG9tSGFuZGxlcn0gZnJvbSBcImh0bWxwYXJzZXIyXCJcclxuXHJcbi8qKlxyXG4gKiAgZG9jdW1lbnQgcGFyc2VyXHJcbiAqXHJcbiAqICBAZXhhbXBsZVxyXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxyXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgWmlwRG9jdW1lbnR7XHJcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcclxuXHRcdHRoaXMucGFydHM9cGFydHNcclxuXHRcdHRoaXMucmF3PXJhd1xyXG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xyXG5cdH1cclxuXHJcblx0Z2V0UGFydChuYW1lKXtcclxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXHJcblx0fVxyXG5cclxuXHRnZXREYXRhUGFydChuYW1lKXtcclxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXHJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXHJcblx0XHRkYXRhLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzIvL3NvIGtlZXAgY3JjMzIgb24gcGFydC5fZGF0YSBmb3IgZnV0dXJlXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0Z2V0T2JqZWN0UGFydChuYW1lKXtcclxuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0aWYoIXBhcnQpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcclxuXHRcdFx0cmV0dXJuIHBhcnRcclxuXHRcdGVsc2VcclxuXHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbChwYXJ0LmFzVGV4dCgpKVxyXG5cdH1cclxuXHJcblx0cGFyc2UoZG9tSGFuZGxlcil7XHJcblxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblxyXG5cdH1cclxuXHJcblx0c2F2ZShmaWxlKXtcclxuXHRcdGZpbGU9ZmlsZXx8YCR7RGF0ZS5ub3coKX0uZG9jeGBcclxuXHRcdFxyXG5cdFx0bGV0IG5ld0RvYz1uZXcgSlNaaXAoKVxyXG5cdFx0T2JqZWN0LmtleXModGhpcy5wYXJ0cykuZm9yRWFjaChwYXRoPT57XHJcblx0XHRcdGxldCBwYXJ0PXRoaXMucGFydHNbcGF0aF1cclxuXHRcdFx0aWYocGFydC5jaGVlcmlvKXtcclxuXHRcdFx0XHRuZXdEb2MuZmlsZShwYXRoLHBhcnQueG1sKCkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdG5ld0RvYy5maWxlKHBhdGgscGFydC5fZGF0YSwgcGFydC5vcHRpb25zKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bGV0IGRhdGE9bmV3RG9jLmdlbmVyYXRlKHt0eXBlOlwibm9kZWJ1ZmZlclwifSlcclxuXHRcdGlmKHR5cGVvZihkb2N1bWVudCkhPVwidW5kZWZpbmVkXCIgJiYgd2luZG93LlVSTCAmJiB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTCl7XHJcblx0XHRcdGxldCB1cmwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChkYXRhKVxyXG5cdFx0XHRsZXQgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG5cdFx0XHRkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGxpbmspXHJcblx0XHRcdGxpbmsuZG93bmxvYWQgPSBmaWxlXHJcblx0XHRcdGxpbmsuaHJlZiA9IHVybDtcclxuXHRcdFx0bGluay5jbGljaygpXHJcblx0XHRcdGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQobGluaylcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+XHJcblx0XHRcdFx0cmVxdWlyZShcImZcIitcInNcIikud3JpdGVGaWxlKGZpbGUsZGF0YSxlcnJvcj0+e1xyXG5cdFx0XHRcdFx0ZXJyb3IgPyByZWplY3QoZXJyb3IpIDogcmVzb2x2ZShkYXRhKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdClcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNsb25lKCl7XHJcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXHJcblx0XHRsZXQgcHJvcHM9IHByb3BzID8gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLnByb3BzKSkgOiBwcm9wc1xyXG5cdFx0bGV0IHBhcnRzPU9iamVjdC5rZXlzKHRoaXMucGFydHMpLnJlZHVjZSgoc3RhdGUsIGspPT57XHJcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cclxuXHRcdFx0aWYodi5jaGVlcmlvKXtcclxuXHRcdFx0XHRzdGF0ZVtrXT10aGlzLmNvbnN0cnVjdG9yLnBhcnNlWG1sKHYueG1sKCkpXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHppcC5maWxlKHYubmFtZSx2Ll9kYXRhLHYub3B0aW9ucylcclxuXHRcdFx0XHRzdGF0ZVtrXT16aXAuZmlsZSh2Lm5hbWUpXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIHN0YXRlXHJcblx0XHR9LHt9KVxyXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXHJcblxyXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxyXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cclxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xyXG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xyXG5cdFx0XHRcdHRyeXtcclxuXHRcdFx0XHRcdGxldCByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XHJcblx0XHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXHJcblx0XHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGVycm9yKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XHJcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIChpbnB1dEZpbGUubmFtZSA/IHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcclxuXHRcdFx0XHRcdFx0fSA6IHtzaXplOmlucHV0RmlsZS5zaXplfSkpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZSxkZWNvZGVFbnRpdGllczogZmFsc2V9XHJcblx0XHRcdGxldCBoYW5kbGVyPW5ldyBDb250ZW50RG9tSGFuZGxlcihvcHQpXHJcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxyXG5cdFx0XHRsZXQgcGFyc2VkPWNoZWVyLmxvYWQoaGFuZGxlci5kb20sb3B0KVxyXG5cdFx0XHRpZih0eXBlb2YocGFyc2VkLmNoZWVyaW8pPT1cInVuZGVmaW5lZFwiKVxyXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXHJcblx0XHRcdHJldHVybiBwYXJzZWRcclxuXHRcdH1jYXRjaChlcnJvcil7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XHJcblx0X2FkZERvbUVsZW1lbnQoZWwpe1xyXG5cdFx0aWYoZWwudHlwZT09XCJ0ZXh0XCIgJiYgKGVsLmRhdGFbMF09PSdcXHInIHx8IGVsLmRhdGFbMF09PSdcXG4nKSlcclxuXHRcdFx0Oy8vcmVtb3ZlIGZvcm1hdCB3aGl0ZXNwYWNlc1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpXHJcblx0fVxyXG59XHJcbiJdfQ==