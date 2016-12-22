"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _htmlparser = require("htmlparser2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		(0, _classCallCheck3.default)(this, _class);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	(0, _createClass3.default)(_class, [{
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
			return new _promise2.default(function (resolve, reject) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicGFydHMiLCJyYXciLCJwcm9wcyIsIm5hbWUiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImRhdGEiLCJhc1VpbnQ4QXJyYXkiLCJjaGVlcmlvIiwib3B0IiwieG1sTW9kZSIsImhhbmRsZXIiLCJlbCIsImlkIiwiZW5kIiwiYXNUZXh0IiwibG9hZCIsImRvbSIsImVycm9yIiwiY29uc29sZSIsImlucHV0RmlsZSIsIkRvY3VtZW50U2VsZiIsInJlc29sdmUiLCJyZWplY3QiLCJwYXJzZSIsImZpbHRlciIsInBhdGgiLCJmaWxlIiwicmVxdWlyZSIsInJlYWRGaWxlIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQSxJQUFJQSxPQUFLLENBQVQ7QUFDQTs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osVUFBTyxLQUFLSCxLQUFMLENBQVdHLElBQVgsQ0FBUDtBQUNBOzs7OEJBRVdBLEksRUFBSztBQUNoQixPQUFJQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFUO0FBQ0EsT0FBSUUsUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLE9BQUtILEtBQUtJLFlBQUwsRUFBVCxDQUhnQixDQUdZO0FBQzVCRCxRQUFLRixLQUFMLEdBQVdELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBNUIsQ0FKZ0IsQ0FJaUI7QUFDakMsVUFBT0UsSUFBUDtBQUNBOzs7Z0NBRWFKLEksRUFBSztBQUNsQixPQUFNQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFYO0FBQ0EsT0FBRyxDQUFDQyxJQUFKLEVBQ0MsT0FBTyxJQUFQLENBREQsS0FFSyxJQUFHQSxLQUFLSyxPQUFSLEVBQ0osT0FBT0wsSUFBUCxDQURJLEtBRUQ7QUFDSCxRQUFHO0FBQ0YsU0FBSU0sTUFBSSxFQUFDQyxTQUFRLElBQVQsRUFBUjtBQUNBLFNBQUlDLFVBQVEsMkJBQWVGLEdBQWYsRUFBbUI7QUFBQSxhQUFJRyxHQUFHQyxFQUFILFNBQVVmLE1BQWQ7QUFBQSxNQUFuQixDQUFaO0FBQ0EsNEJBQVdhLE9BQVgsRUFBbUJGLEdBQW5CLEVBQXdCSyxHQUF4QixDQUE0QlgsS0FBS1ksTUFBTCxFQUE1QjtBQUNBLFlBQU8sS0FBS2hCLEtBQUwsQ0FBV0csSUFBWCxJQUFpQixrQkFBTWMsSUFBTixDQUFXTCxRQUFRTSxHQUFuQixFQUF1QixFQUFDUCxTQUFRLElBQVQsRUFBdkIsQ0FBeEI7QUFDQSxLQUxELENBS0MsT0FBTVEsS0FBTixFQUFZO0FBQ1pDLGFBQVFELEtBQVIsQ0FBY0EsS0FBZDtBQUNBLFlBQU8sSUFBUDtBQUNBO0FBQ0Q7QUFDRDs7OzJCQUVPLENBRVA7OzsyQkFFTyxDQUVQOztBQUVEOzs7Ozs7Ozt1QkFPWUUsUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUNyQyxhQUFTQyxLQUFULENBQWVsQixJQUFmLEVBQThCO0FBQUEsU0FBVEwsS0FBUyx1RUFBSCxFQUFHOztBQUM3QixTQUFJRCxNQUFJLG9CQUFVTSxJQUFWLENBQVI7QUFBQSxTQUF3QlAsUUFBTSxFQUE5QjtBQUNBQyxTQUFJeUIsTUFBSixDQUFXLFVBQUNDLElBQUQsRUFBTUMsSUFBTjtBQUFBLGFBQWE1QixNQUFNMkIsSUFBTixJQUFZQyxJQUF6QjtBQUFBLE1BQVg7QUFDQUwsYUFBUSxJQUFJRCxZQUFKLENBQWlCdEIsS0FBakIsRUFBdUJDLEdBQXZCLEVBQTJCQyxLQUEzQixDQUFSO0FBQ0E7O0FBRUQsUUFBRyxPQUFPbUIsU0FBUCxJQUFrQixRQUFyQixFQUE4QjtBQUFDO0FBQzlCUSxhQUFRLElBQVIsRUFBY0MsUUFBZCxDQUF1QlQsU0FBdkIsRUFBaUMsVUFBU0YsS0FBVCxFQUFnQlosSUFBaEIsRUFBcUI7QUFDckQsVUFBR1ksS0FBSCxFQUNDSyxPQUFPTCxLQUFQLEVBREQsS0FFSyxJQUFHWixJQUFILEVBQVE7QUFDWmtCLGFBQU1sQixJQUFOLEVBQVksRUFBQ0osTUFBS2tCLFVBQVVVLEtBQVYsQ0FBZ0IsUUFBaEIsRUFBMEJDLEdBQTFCLEdBQWdDQyxPQUFoQyxDQUF3QyxVQUF4QyxFQUFtRCxFQUFuRCxDQUFOLEVBQVo7QUFDQTtBQUNELE1BTkQ7QUFPQSxLQVJELE1BUU0sSUFBR1oscUJBQXFCYSxJQUF4QixFQUE2QjtBQUNsQyxTQUFJQyxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxZQUFPRSxNQUFQLEdBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3hCYixZQUFNYSxFQUFFQyxNQUFGLENBQVNDLE1BQWYsRUFBdUI7QUFDckJyQyxhQUFLa0IsVUFBVWxCLElBQVYsQ0FBZThCLE9BQWYsQ0FBdUIsVUFBdkIsRUFBa0MsRUFBbEMsQ0FEZ0I7QUFFckJRLHFCQUFhcEIsVUFBVW9CLFlBRkY7QUFHckJDLGFBQUtyQixVQUFVcUI7QUFITSxPQUF2QjtBQUtBLE1BTkQ7QUFPQVAsWUFBT1EsaUJBQVAsQ0FBeUJ0QixTQUF6QjtBQUNBLEtBVkssTUFVQTtBQUNMSSxXQUFNSixTQUFOO0FBQ0E7QUFDRCxJQTVCTSxDQUFQO0FBNkJBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxubGV0IHV1aWQ9MFxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXG5cdGdldERhdGFQYXJ0KG5hbWUpe1xuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHRsZXQgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdGxldCBkYXRhPXBhcnQuYXNVaW50OEFycmF5KCkvL3Vuc2FmZSBjYWxsLCBwYXJ0Ll9kYXRhIGlzIGNoYW5nZWQgXG5cdFx0ZGF0YS5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyLy9zbyBrZWVwIGNyYzMyIG9uIHBhcnQuX2RhdGEgZm9yIGZ1dHVyZVxuXHRcdHJldHVybiBkYXRhXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZXtcblx0XHRcdHRyeXtcblx0XHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxuXHRcdFx0XHRsZXQgaGFuZGxlcj1uZXcgRG9tSGFuZGxlcihvcHQsZWw9PmVsLmlkPWBhJHt1dWlkKyt9YClcblx0XHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKHBhcnQuYXNUZXh0KCkpXG5cdFx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPWNoZWVyLmxvYWQoaGFuZGxlci5kb20se3htbE1vZGU6dHJ1ZX0pXG5cdFx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHBhcnNlcigpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=