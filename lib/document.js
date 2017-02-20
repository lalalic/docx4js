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
		value: function save() {}
	}, {
		key: "clone",
		value: function clone() {
			var _this = this;

			return this;
			var zip = new _jszip2.default();
			var props = props ? JSON.parse(JSON.stringify(this.props)) : props;
			var parts = Object.keys(this.parts).reduce(function (state, k) {
				var v = _this.parts[k];
				if (v.cheerio) state[k] = v.root().clone();else {

					state[k] = new v.constructor(v.name, v._data, v.options);
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

					var raw = new _jszip2.default(data),
					    parts = {};
					raw.filter(function (path, file) {
						return parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, props));
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
						parse(e.target.result, {
							name: inputFile.name.replace(/\.docx$/i, ''),
							lastModified: inputFile.lastModified,
							size: inputFile.size
						});
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
				var opt = { xmlMode: true };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJaaXBEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJkYXRhIiwiYXNVaW50OEFycmF5IiwiY2hlZXJpbyIsImNvbnN0cnVjdG9yIiwicGFyc2VYbWwiLCJhc1RleHQiLCJkb21IYW5kbGVyIiwiemlwIiwiSlNPTiIsInBhcnNlIiwic3RyaW5naWZ5IiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsInN0YXRlIiwiayIsInYiLCJyb290IiwiY2xvbmUiLCJvcHRpb25zIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJmaWx0ZXIiLCJwYXRoIiwiZmlsZSIsInJlcXVpcmUiLCJyZWFkRmlsZSIsImVycm9yIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIiwibG9hZCIsIl9fZGlybmFtZSIsImV4dCIsIm9wdCIsInhtbE1vZGUiLCJoYW5kbGVyIiwiQ29udGVudERvbUhhbmRsZXIiLCJlbmQiLCJwYXJzZWQiLCJkb20iLCJjb25zb2xlIiwiZWwiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7SUFPcUJBLFc7QUFDcEIsc0JBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osVUFBTyxLQUFLSCxLQUFM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QTtBQUNEOzs7Ozs7a0JBbkhtQnRDLFc7O0lBc0hmMEQsaUI7Ozs7Ozs7Ozs7O2lDQUNVSyxFLEVBQUc7QUFDakIsT0FBR0EsR0FBR0MsSUFBSCxJQUFTLE1BQVQsS0FBb0JELEdBQUd2RCxJQUFILENBQVEsQ0FBUixLQUFZLElBQVosSUFBb0J1RCxHQUFHdkQsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFwRCxDQUFILEVBQ0MsQ0FERCxDQUNFO0FBREYsUUFHQyw0SUFBNEJ1RCxFQUE1QjtBQUNEIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwLCB7WmlwT2JqZWN0fSBmcm9tICdqc3ppcCdcclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXHJcblxyXG4vKipcclxuICogIGRvY3VtZW50IHBhcnNlclxyXG4gKlxyXG4gKiAgQGV4YW1wbGVcclxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcclxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xyXG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XHJcblx0XHR0aGlzLnBhcnRzPXBhcnRzXHJcblx0XHR0aGlzLnJhdz1yYXdcclxuXHRcdHRoaXMucHJvcHM9cHJvcHNcclxuXHR9XHJcblxyXG5cdGdldFBhcnQobmFtZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxyXG5cdH1cclxuXHJcblx0Z2V0RGF0YVBhcnQobmFtZSl7XHJcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0bGV0IGRhdGE9cGFydC5hc1VpbnQ4QXJyYXkoKS8vdW5zYWZlIGNhbGwsIHBhcnQuX2RhdGEgaXMgY2hhbmdlZFxyXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxyXG5cdFx0cmV0dXJuIGRhdGFcclxuXHR9XHJcblxyXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XHJcblx0XHRjb25zdCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGlmKCFwYXJ0KVxyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0ZWxzZSBpZihwYXJ0LmNoZWVyaW8pXHJcblx0XHRcdHJldHVybiBwYXJ0XHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPXRoaXMuY29uc3RydWN0b3IucGFyc2VYbWwocGFydC5hc1RleHQoKSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xyXG5cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdHNhdmUoKXtcclxuXHJcblx0fVxyXG5cclxuXHRjbG9uZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXNcclxuXHRcdGxldCB6aXA9bmV3IEpTWmlwKClcclxuXHRcdGxldCBwcm9wcz0gcHJvcHMgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMucHJvcHMpKSA6IHByb3BzXHJcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9PntcclxuXHRcdFx0bGV0IHY9dGhpcy5wYXJ0c1trXVxyXG5cdFx0XHRpZih2LmNoZWVyaW8pXHJcblx0XHRcdFx0c3RhdGVba109di5yb290KCkuY2xvbmUoKVxyXG5cdFx0XHRlbHNle1xyXG5cclxuXHRcdFx0XHRzdGF0ZVtrXT1uZXcgdi5jb25zdHJ1Y3Rvcih2Lm5hbWUsIHYuX2RhdGEsIHYub3B0aW9ucylcclxuXHRcdFx0fVxyXG5cdFx0XHRyZXR1cm4gc3RhdGVcclxuXHRcdH0se30pXHJcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IocGFydHMsemlwLCBwcm9wcylcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcclxuXHJcblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXHJcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XHJcblx0ICovXHJcblxyXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XHJcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XHJcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cclxuXHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcclxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XHJcblx0XHRcdFx0XHRpZihlcnJvcilcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XHJcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xyXG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcclxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcclxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XHJcblx0XHR0cnl7XHJcblx0XHRcdGxldCBvcHQ9e3htbE1vZGU6dHJ1ZX1cclxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IENvbnRlbnREb21IYW5kbGVyKG9wdClcclxuXHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKGRhdGEpXHJcblx0XHRcdGxldCBwYXJzZWQ9Y2hlZXIubG9hZChoYW5kbGVyLmRvbSxvcHQpXHJcblx0XHRcdGlmKHR5cGVvZihwYXJzZWQuY2hlZXJpbyk9PVwidW5kZWZpbmVkXCIpXHJcblx0XHRcdFx0cGFyc2VkLmNoZWVyaW89XCJjdXN0b21pemVkXCJcclxuXHRcdFx0cmV0dXJuIHBhcnNlZFxyXG5cdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIENvbnRlbnREb21IYW5kbGVyIGV4dGVuZHMgRG9tSGFuZGxlcntcclxuXHRfYWRkRG9tRWxlbWVudChlbCl7XHJcblx0XHRpZihlbC50eXBlPT1cInRleHRcIiAmJiAoZWwuZGF0YVswXT09J1xccicgfHwgZWwuZGF0YVswXT09J1xcbicpKVxyXG5cdFx0XHQ7Ly9yZW1vdmUgZm9ybWF0IHdoaXRlc3BhY2VzXHJcblx0XHRlbHNlXHJcblx0XHRcdHJldHVybiBzdXBlci5fYWRkRG9tRWxlbWVudChlbClcclxuXHR9XHJcbn1cclxuIl19