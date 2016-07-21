"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _xml2js = require("xml2js");

var _xmlObject = require("./xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
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
		key: "getBufferPart",
		value: function getBufferPart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var buffer = part.asNodeBuffer();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}
	}, {
		key: "getObjectPart",
		value: function getObjectPart(name, option) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (_this.parts[name]) (0, _xml2js.parseString)(_this.parts[name].asText(), function (error, result) {
					return resolve((0, _xmlObject.getable)(result));
				});else resolve();
			});
		}
	}, {
		key: "parse",
		value: function parse() {}

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
					var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,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WSxDQUFuQixDQUZxQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcbmltcG9ydCB7cGFyc2VTdHJpbmcgYXMgeG1sMmpzfSBmcm9tIFwieG1sMmpzXCJcblxuaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi94bWxPYmplY3RcIlxuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZShbdmlzaXRvcnNdKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXG5cdGdldEJ1ZmZlclBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUsIG9wdGlvbil7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9Pntcblx0XHRcdGlmKHRoaXMucGFydHNbbmFtZV0pXG5cdFx0XHRcdHhtbDJqcyh0aGlzLnBhcnRzW25hbWVdLmFzVGV4dCgpLFxuXHRcdFx0XHRcdChlcnJvciwgcmVzdWx0KT0+cmVzb2x2ZShnZXRhYmxlKHJlc3VsdCkpKVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXNvbHZlKClcblx0XHR9KVxuXHR9XG5cblx0cGFyc2UoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=