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
		key: "parse",
		value: function parse(domHandler) {}
	}, {
		key: "render",
		value: function render() {}
	}, {
		key: "save",
		value: function save() {}

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
			return this.load("templates/blank." + this.ext);
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicGFydHMiLCJyYXciLCJwcm9wcyIsIm5hbWUiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImRhdGEiLCJhc1VpbnQ4QXJyYXkiLCJjaGVlcmlvIiwib3B0IiwieG1sTW9kZSIsImhhbmRsZXIiLCJlbCIsImlkIiwiZW5kIiwiYXNUZXh0IiwibG9hZCIsImRvbSIsImVycm9yIiwiY29uc29sZSIsImRvbUhhbmRsZXIiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcnNlIiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJzcGxpdCIsInBvcCIsInJlcGxhY2UiLCJCbG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJsYXN0TW9kaWZpZWQiLCJzaXplIiwicmVhZEFzQXJyYXlCdWZmZXIiLCJleHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFDQSxJQUFJQSxPQUFLLENBQVQ7QUFDQTs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osVUFBTyxLQUFLSCxLQUFMLENBQVdHLElBQVgsQ0FBUDtBQUNBOzs7OEJBRVdBLEksRUFBSztBQUNoQixPQUFJQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFUO0FBQ0EsT0FBSUUsUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLE9BQUtILEtBQUtJLFlBQUwsRUFBVCxDQUhn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QUwsc0JBQTZCLEtBQUs2QixHQUFsQyxDQUFQO0FBQ0EiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXHJcbmltcG9ydCBjaGVlciBmcm9tIFwiY2hlZXJpb1wiXHJcbmltcG9ydCB7UGFyc2VyLCBEb21IYW5kbGVyfSBmcm9tIFwiaHRtbHBhcnNlcjJcIlxyXG5sZXQgdXVpZD0wXHJcbi8qKlxyXG4gKiAgZG9jdW1lbnQgcGFyc2VyXHJcbiAqXHJcbiAqICBAZXhhbXBsZVxyXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxyXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcclxuXHRcdHRoaXMucGFydHM9cGFydHNcclxuXHRcdHRoaXMucmF3PXJhd1xyXG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xyXG5cdH1cclxuXHJcblx0Z2V0UGFydChuYW1lKXtcclxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXHJcblx0fVxyXG5cclxuXHRnZXREYXRhUGFydChuYW1lKXtcclxuXHRcdGxldCBwYXJ0PXRoaXMucGFydHNbbmFtZV1cclxuXHRcdGxldCBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXHJcblx0XHRsZXQgZGF0YT1wYXJ0LmFzVWludDhBcnJheSgpLy91bnNhZmUgY2FsbCwgcGFydC5fZGF0YSBpcyBjaGFuZ2VkXHJcblx0XHRkYXRhLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzIvL3NvIGtlZXAgY3JjMzIgb24gcGFydC5fZGF0YSBmb3IgZnV0dXJlXHJcblx0XHRyZXR1cm4gZGF0YVxyXG5cdH1cclxuXHJcblx0Z2V0T2JqZWN0UGFydChuYW1lKXtcclxuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0aWYoIXBhcnQpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcclxuXHRcdFx0cmV0dXJuIHBhcnRcclxuXHRcdGVsc2V7XHJcblx0XHRcdHRyeXtcclxuXHRcdFx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWV9XHJcblx0XHRcdFx0bGV0IGhhbmRsZXI9bmV3IERvbUhhbmRsZXIob3B0LGVsPT5lbC5pZD1gYSR7dXVpZCsrfWApXHJcblx0XHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKHBhcnQuYXNUZXh0KCkpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09Y2hlZXIubG9hZChoYW5kbGVyLmRvbSx7eG1sTW9kZTp0cnVlfSlcclxuXHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBhcnNlKGRvbUhhbmRsZXIpe1xyXG5cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHR9XHJcblx0XHJcblx0c2F2ZSgpe1xyXG5cdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXHJcblxyXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxyXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxyXG5cdCAqL1xyXG5cclxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xyXG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcclxuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xyXG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XHJcblx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcclxuXHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHByb3BzKSlcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXHJcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xyXG5cdFx0XHRcdFx0aWYoZXJyb3IpXHJcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XHJcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcclxuXHRcdFx0XHR2YXIgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XHJcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwge1xyXG5cdFx0XHRcdFx0XHRcdG5hbWU6aW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyksXHJcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXHJcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxyXG5cdFx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcclxuXHRcdFx0fWVsc2Uge1xyXG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcclxuXHRcdFx0fVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGNyZWF0ZSgpe1xyXG5cdFx0cmV0dXJuIHRoaXMubG9hZChgdGVtcGxhdGVzL2JsYW5rLiR7dGhpcy5leHR9YClcclxuXHR9XHJcbn1cclxuIl19