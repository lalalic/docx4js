"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _htmlparser = require("htmlparser2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = 0;
/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse())
 */

var _class = function () {
	function _class(parts, raw, props) {
		_classCallCheck(this, _class);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	_createClass(_class, [{
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
			if (!part) return null;else if (part.cheerio) return part;else {
				try {
					var opt = { xmlMode: true };
					var handler = new _htmlparser.DomHandler(opt, function (el) {
						return el.id = "a" + uuid++;
					});
					new _htmlparser.Parser(handler, opt).end(part.asText());
					return this.parts[name] = _cheerio2.default.load(handler.dom, { xmlMode: true });
				} catch (error) {
					console.error(error);
					return null;
				}
			}
		}
	}, {
		key: "parser",
		value: function parser() {}
	}, {
		key: "render",
		value: function render() {}

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
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicGFydHMiLCJyYXciLCJwcm9wcyIsIm5hbWUiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImRhdGEiLCJhc1VpbnQ4QXJyYXkiLCJjaGVlcmlvIiwib3B0IiwieG1sTW9kZSIsImhhbmRsZXIiLCJlbCIsImlkIiwiZW5kIiwiYXNUZXh0IiwibG9hZCIsImRvbSIsImVycm9yIiwiY29uc29sZSIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicGFyc2UiLCJmaWx0ZXIiLCJwYXRoIiwiZmlsZSIsInJlcXVpcmUiLCJyZWFkRmlsZSIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUNBLElBQUlBLE9BQUssQ0FBVDtBQUNBOzs7Ozs7Ozs7QUFRQyxpQkFBWUMsS0FBWixFQUFrQkMsR0FBbEIsRUFBc0JDLEtBQXRCLEVBQTRCO0FBQUE7O0FBQzNCLE9BQUtGLEtBQUwsR0FBV0EsS0FBWDtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLEtBQUwsR0FBV0EsS0FBWDtBQUNBOzs7OzBCQUVPQyxJLEVBQUs7QUFDWixVQUFPLEtBQUtILEtBQUwsQ0FBV0csSUFBWCxDQUFQO0FBQ0E7Ozs4QkFFV0EsSSxFQUFLO0FBQ2hCLE9BQUlDLE9BQUssS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQVQ7QUFDQSxPQUFJRSxRQUFNRCxLQUFLRSxLQUFMLENBQVdELEtBQXJCO0FBQ0EsT0FBSUUsT0FBS0gsS0FBS0ksWUFBTCxFQUFULENBSGdCLENBR1k7QUFDNUJELFFBQUtG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aW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxubGV0IHV1aWQ9MFxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXG5cdGdldERhdGFQYXJ0KG5hbWUpe1xuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdGxldCBkYXRhPXBhcnQuYXNVaW50OEFycmF5KCkvL3Vuc2FmZSBjYWxsLCBwYXJ0Ll9kYXRhIGlzIGNoYW5nZWQgXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZXtcblx0XHRcdHRyeXtcblx0XHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxuXHRcdFx0XHRsZXQgaGFuZGxlcj1uZXcgRG9tSGFuZGxlcihvcHQsZWw9PmVsLmlkPWBhJHt1dWlkKyt9YClcblx0XHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKHBhcnQuYXNUZXh0KCkpXG5cdFx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPWNoZWVyLmxvYWQoaGFuZGxlci5kb20se3htbE1vZGU6dHJ1ZX0pXG5cdFx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHBhcnNlcigpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=