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

				if (_jszip2.default.support.nodebuffer) {
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
//# sourceMappingURL=data:application/json;base64,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Q0Y7QUFBQyxVQUFPLElBQVAsQ0FBRDs7OztRQW5FQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vdG9vbFwiXG4vKipcbiAqICBhIHR5cGUgb2YgZG9jdW1lbnQgcGFyc2VyXG4gKiAgQGNsYXNzIERvY3VtZW50XG4gKiAgQHJlcXVpcmVzIG1vZHVsZTpKU1ppcFxuICovXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50e1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cdGdldEltYWdlUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHR2YXIgYnVmZmVyPXBhcnRbSlNaaXAuc3VwcG9ydC5ub2RlYnVmZmVyID8gJ2FzTm9kZUJ1ZmZlcicgOiAnYXNBcnJheUJ1ZmZlciddKClcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxuXHRcdHJldHVybiBidWZmZXJcblx0fVxuXHRwYXJzZSgpe1xuXG5cdH1cblx0cmVsZWFzZSgpe1xuXG5cdH1cblx0ZmFjdG9yeSgpe1xuXHRcdHJldHVybiB0aGlzLmNvbnN0cnVjdG9yLmZhY3RvcnkuYXBwbHkodGhpcyxhcmd1bWVudHMpXG5cdH1cblxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgbmFtZSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoZnVuY3Rpb24ocGF0aCxmaWxlKXtcblx0XHRcdFx0XHRwYXJ0c1twYXRoXT1maWxlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcse1xuXHRcdFx0XHRcdG5hbWU6bmFtZSxcblx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXG5cdFx0XHRcdH0pKVxuXHRcdFx0fVxuXG5cblx0XHRcdGlmKEpTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlcil7Ly9ub2RlXG5cdFx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcblx0XHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwgaW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXsvL2Jyb3dzZXJcblx0XHRcdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7cGFyc2UoZS50YXJnZXQucmVzdWx0LCBpbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSl9XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGZhY3RvcnkoKXtyZXR1cm4gbnVsbH1cbn1cbiJdfQ==