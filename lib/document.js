'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./tool');

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  document parser
 *  
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
 */

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
		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

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
//# sourceMappingURL=data:application/json;base64,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QUMsVUFBTyxJQUFQLENBQUQ7Ozs7UUF4RUEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3Rvb2xcIlxuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqICBcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKFt2aXNpdG9yc10pKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0W0pTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlciA/ICdhc05vZGVCdWZmZXInIDogJ2FzQXJyYXlCdWZmZXInXSgpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblx0cGFyc2UoKXtcblxuXHR9XG5cdHJlbGVhc2UoKXtcblxuXHR9XG5cdGZhY3RvcnkoKXtcblx0XHRyZXR1cm4gdGhpcy5jb25zdHJ1Y3Rvci5mYWN0b3J5LmFwcGx5KHRoaXMsYXJndW1lbnRzKVxuXHR9XG5cdC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIG5hbWUpe1xuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRyYXcuZmlsdGVyKGZ1bmN0aW9uKHBhdGgsZmlsZSl7XG5cdFx0XHRcdFx0cGFydHNbcGF0aF09ZmlsZVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHtcblx0XHRcdFx0XHRuYW1lOm5hbWUsXG5cdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHR9KSlcblx0XHRcdH1cblxuXG5cdFx0XHRpZigkLmlzTm9kZSl7Ly9ub2RlXG5cdFx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcblx0XHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwgaW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXsvL2Jyb3dzZXJcblx0XHRcdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7cGFyc2UoZS50YXJnZXQucmVzdWx0LCBpbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSl9XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGZhY3RvcnkoKXtyZXR1cm4gbnVsbH1cbn1cbiJdfQ==