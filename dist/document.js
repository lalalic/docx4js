'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/**
 *  a type of document parser
 *  @class Document
 *  @requires module:JSZip
 */


require('./tool');

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Document = function () {
	function Document(parts, raw, props) {
		_classCallCheck(this, Document);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	_createClass(Document, [{
		key: 'getPart',
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: 'getImagePart',
		value: function getImagePart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var buffer = part[_jszip2.default.support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}
	}, {
		key: 'parse',
		value: function parse() {}
	}, {
		key: 'release',
		value: function release() {}
	}, {
		key: 'factory',
		value: function factory() {
			return this.constructor.factory.apply(this, arguments);
		}
	}], [{
		key: 'load',
		value: function load(inputFile) {
			var DocumentSelf = this;
			return new Promise(function (resolve, reject) {
				function parse(data, name) {
					var raw = new _jszip2.default(data),
					    parts = {};
					raw.filter(function (path, file) {
						parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, {
						name: name,
						lastModified: inputFile.lastModified,
						size: inputFile.size
					}));
				}

				if ($.isNode) {
					//node
					if (typeof inputFile == 'string') {
						//file name
						require('fs').readFile(inputFile, function (error, data) {
							if (error) reject(error);else if (data) {
								parse(data, inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, ''));
							}
						});
					} else {
						parse(inputFile);
					}
				} else {
					//browser
					if (inputFile instanceof Blob) {
						var reader = new FileReader();
						reader.onload = function (e) {
							parse(e.target.result, inputFile.name.replace(/\.docx$/i, ''));
						};
						reader.readAsArrayBuffer(inputFile);
					} else {
						parse(inputFile);
					}
				}
			});
		}
	}, {
		key: 'factory',
		get: function get() {
			return null;
		}
	}]);

	return Document;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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SUFBUCxDQUFEOzs7O1FBbkVBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi90b29sXCJcbi8qKlxuICogIGEgdHlwZSBvZiBkb2N1bWVudCBwYXJzZXJcbiAqICBAY2xhc3MgRG9jdW1lbnRcbiAqICBAcmVxdWlyZXMgbW9kdWxlOkpTWmlwXG4gKi9cbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnR7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblx0Z2V0SW1hZ2VQYXJ0KG5hbWUpe1xuXHRcdHZhciBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHZhciBidWZmZXI9cGFydFtKU1ppcC5zdXBwb3J0Lm5vZGVidWZmZXIgPyAnYXNOb2RlQnVmZmVyJyA6ICdhc0FycmF5QnVmZmVyJ10oKVxuXHRcdGJ1ZmZlci5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyXG5cdFx0cmV0dXJuIGJ1ZmZlclxuXHR9XG5cdHBhcnNlKCl7XG5cblx0fVxuXHRyZWxlYXNlKCl7XG5cblx0fVxuXHRmYWN0b3J5KCl7XG5cdFx0cmV0dXJuIHRoaXMuY29uc3RydWN0b3IuZmFjdG9yeS5hcHBseSh0aGlzLGFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBuYW1lKXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcihmdW5jdGlvbihwYXRoLGZpbGUpe1xuXHRcdFx0XHRcdHBhcnRzW3BhdGhdPWZpbGVcblx0XHRcdFx0fSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyx7XG5cdFx0XHRcdFx0bmFtZTpuYW1lLFxuXHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0fSkpXG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoJC5pc05vZGUpey8vbm9kZVxuXHRcdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIGlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJykpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7Ly9icm93c2VyXG5cdFx0XHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xuXHRcdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe3BhcnNlKGUudGFyZ2V0LnJlc3VsdCwgaW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJykpfVxuXHRcdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGdldCBmYWN0b3J5KCl7cmV0dXJuIG51bGx9XG59XG4iXX0=