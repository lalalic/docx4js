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

var uuid = 0;
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
			if (typeof el.id == "undefined" && el.type == 'tag') {
				el.attribs.id = "a" + uuid++;
			}

			if (el.type == "text" && (el.data[0] == '\r' || el.data[0] == '\n')) ; //remove format whitespaces
			else return _get(ContentDomHandler.prototype.__proto__ || Object.getPrototypeOf(ContentDomHandler.prototype), "_addDomElement", this).call(this, el);
		}
	}]);

	return ContentDomHandler;
}(_htmlparser.DomHandler);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwiWmlwRG9jdW1lbnQiLCJwYXJ0cyIsInJhdyIsInByb3BzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiZGF0YSIsImFzVWludDhBcnJheSIsImNoZWVyaW8iLCJjb25zdHJ1Y3RvciIsInBhcnNlWG1sIiwiYXNUZXh0IiwiZG9tSGFuZGxlciIsInppcCIsIkpTT04iLCJwYXJzZSIsInN0cmluZ2lmeSIsIk9iamVjdCIsImtleXMiLCJyZWR1Y2UiLCJzdGF0ZSIsImsiLCJ2Iiwicm9vdCIsImNsb25lIiwib3B0aW9ucyIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJlcnJvciIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsImxvYWQiLCJfX2Rpcm5hbWUiLCJleHQiLCJvcHQiLCJ4bWxNb2RlIiwiaGFuZGxlciIsIkNvbnRlbnREb21IYW5kbGVyIiwiZW5kIiwicGFyc2VkIiwiZG9tIiwiY29uc29sZSIsImVsIiwiaWQiLCJ0eXBlIiwiYXR0cmlicyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7OztBQUNBLElBQUlBLE9BQUssQ0FBVDtBQUNBOzs7Ozs7OztJQU9xQkMsVztBQUNwQixzQkFBWUMsS0FBWixFQUFrQkMsR0FBbEIsRUFBc0JDLEtBQXRCLEVBQTRCO0FBQUE7O0FBQzNCLE9BQUtGLEtBQUwsR0FBV0EsS0FBWDtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLEtBQUwsR0FBV0EsS0FB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QixZQUFReEIsS0FBUixDQUFjQSxLQUFkO0FBQ0EsV0FBTyxJQUFQO0FBQ0E7QUFDRDs7Ozs7O2tCQW5IbUJ0QyxXOztJQXNIZjBELGlCOzs7Ozs7Ozs7OztpQ0FDVUssRSxFQUFHO0FBQ2pCLE9BQUcsT0FBT0EsR0FBR0MsRUFBVixJQUFlLFdBQWYsSUFBOEJELEdBQUdFLElBQUgsSUFBUyxLQUExQyxFQUFnRDtBQUMvQ0YsT0FBR0csT0FBSCxDQUFXRixFQUFYLFNBQWtCakUsTUFBbEI7QUFDQTs7QUFFRCxPQUFHZ0UsR0FBR0UsSUFBSCxJQUFTLE1BQVQsS0FBb0JGLEdBQUd2RCxJQUFILENBQVEsQ0FBUixLQUFZLElBQVosSUFBb0J1RCxHQUFHdkQsSUFBSCxDQUFRLENBQVIsS0FBWSxJQUFwRCxDQUFILEVBQ0MsQ0FERCxDQUNFO0FBREYsUUFHQyw0SUFBNEJ1RCxFQUE1QjtBQUNEIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwLCB7WmlwT2JqZWN0fSBmcm9tICdqc3ppcCdcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXG5pbXBvcnQge1BhcnNlciwgRG9tSGFuZGxlcn0gZnJvbSBcImh0bWxwYXJzZXIyXCJcbmxldCB1dWlkPTBcbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFppcERvY3VtZW50e1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXREYXRhUGFydChuYW1lKXtcblx0XHRsZXQgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0bGV0IGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09dGhpcy5jb25zdHJ1Y3Rvci5wYXJzZVhtbChwYXJ0LmFzVGV4dCgpKVxuXHR9XG5cblx0cGFyc2UoZG9tSGFuZGxlcil7XG5cblx0fVxuXG5cdHJlbmRlcigpe1xuXG5cdH1cblxuXHRzYXZlKCl7XG5cblx0fVxuXG5cdGNsb25lKCl7XG5cdFx0cmV0dXJuIHRoaXNcblx0XHRsZXQgemlwPW5ldyBKU1ppcCgpXG5cdFx0bGV0IHByb3BzPSBwcm9wcyA/IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5wcm9wcykpIDogcHJvcHNcblx0XHRsZXQgcGFydHM9T2JqZWN0LmtleXModGhpcy5wYXJ0cykucmVkdWNlKChzdGF0ZSwgayk9Pntcblx0XHRcdGxldCB2PXRoaXMucGFydHNba11cblx0XHRcdGlmKHYuY2hlZXJpbylcblx0XHRcdFx0c3RhdGVba109di5yb290KCkuY2xvbmUoKVxuXHRcdFx0ZWxzZXtcblxuXHRcdFx0XHRzdGF0ZVtrXT1uZXcgdi5jb25zdHJ1Y3Rvcih2Lm5hbWUsIHYuX2RhdGEsIHYub3B0aW9ucylcblx0XHRcdH1cblx0XHRcdHJldHVybiBzdGF0ZVxuXHRcdH0se30pXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yKHBhcnRzLHppcCwgcHJvcHMpXG5cdH1cblxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgY3JlYXRlKCl7XG5cdFx0cmV0dXJuIHRoaXMubG9hZChgJHtfX2Rpcm5hbWV9Ly4uL3RlbXBsYXRlcy9ibGFuay4ke3RoaXMuZXh0fWApXG5cdH1cblxuXHRzdGF0aWMgcGFyc2VYbWwoZGF0YSl7XG5cdFx0dHJ5e1xuXHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxuXHRcdFx0bGV0IGhhbmRsZXI9bmV3IENvbnRlbnREb21IYW5kbGVyKG9wdClcblx0XHRcdG5ldyBQYXJzZXIoaGFuZGxlcixvcHQpLmVuZChkYXRhKVxuXHRcdFx0bGV0IHBhcnNlZD1jaGVlci5sb2FkKGhhbmRsZXIuZG9tLG9wdClcblx0XHRcdGlmKHR5cGVvZihwYXJzZWQuY2hlZXJpbyk9PVwidW5kZWZpbmVkXCIpXG5cdFx0XHRcdHBhcnNlZC5jaGVlcmlvPVwiY3VzdG9taXplZFwiXG5cdFx0XHRyZXR1cm4gcGFyc2VkXG5cdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3IpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdH1cblx0fVxufVxuXG5jbGFzcyBDb250ZW50RG9tSGFuZGxlciBleHRlbmRzIERvbUhhbmRsZXJ7XG5cdF9hZGREb21FbGVtZW50KGVsKXtcblx0XHRpZih0eXBlb2YoZWwuaWQpPT1cInVuZGVmaW5lZFwiICYmIGVsLnR5cGU9PSd0YWcnKXtcblx0XHRcdGVsLmF0dHJpYnMuaWQ9YGEke3V1aWQrK31gXG5cdFx0fVxuXG5cdFx0aWYoZWwudHlwZT09XCJ0ZXh0XCIgJiYgKGVsLmRhdGFbMF09PSdcXHInIHx8IGVsLmRhdGFbMF09PSdcXG4nKSlcblx0XHRcdDsvL3JlbW92ZSBmb3JtYXQgd2hpdGVzcGFjZXNcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gc3VwZXIuX2FkZERvbUVsZW1lbnQoZWwpXG5cdH1cbn1cbiJdfQ==