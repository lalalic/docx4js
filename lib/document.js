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

		/**
   *  parse docx with visitors created from visitor factories one by one
   */

	}, {
		key: 'parse',
		value: function parse(visitorFactories) {}

		/**
   * release resources after parse
   */

	}, {
		key: 'release',
		value: function release() {}

		/**
   *  create parser for a word model
   */

	}, {
		key: 'factory',
		value: function factory(wordXml, docParser, parentParser) {
			var _this = this;

			if (!this._factory) {
				(function () {
					var a = new _this.constructor.Factory();
					_this._factory = function () {
						return a.create.apply(a, arguments);
					};
				})();
			}
			return this._factory.apply(this, arguments);
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
	}]);

	return Document;
}();

Document.Factory = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, [{
		key: 'create',
		value: function create(wordXml, docParser, parentParser) {}
	}]);

	return _class;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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VSxJQUFWLENBQWUsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQUF2QixFQUFEO09BQVgsQ0FGYztBQUc1QixhQUFPLGlCQUFQLENBQXlCLFNBQXpCLEVBSDRCO01BQTdCLE1BSU07QUFDTCxZQUFNLFNBQU4sRUFESztNQUpOO0tBYkQ7SUFka0IsQ0FBbkIsQ0FGcUI7Ozs7UUFqREY7OztTQTBGYjs7Ozs7Ozt5QkFDQyxTQUFTLFdBQVcsY0FBYTs7Ozs7O2tCQTNGckIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3Rvb2xcIlxuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqICBcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKFt2aXNpdG9yc10pKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0W0pTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlciA/ICdhc05vZGVCdWZmZXInIDogJ2FzQXJyYXlCdWZmZXInXSgpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblx0XG5cdC8qKlxuXHQgKiAgcGFyc2UgZG9jeCB3aXRoIHZpc2l0b3JzIGNyZWF0ZWQgZnJvbSB2aXNpdG9yIGZhY3RvcmllcyBvbmUgYnkgb25lXG5cdCAqL1xuXHRwYXJzZSh2aXNpdG9yRmFjdG9yaWVzKXtcblxuXHR9XG5cdFxuXHQvKipcblx0ICogcmVsZWFzZSByZXNvdXJjZXMgYWZ0ZXIgcGFyc2Vcblx0ICovXG5cdHJlbGVhc2UoKXtcblxuXHR9XG5cdFxuXHQvKipcblx0ICogIGNyZWF0ZSBwYXJzZXIgZm9yIGEgd29yZCBtb2RlbFxuXHQgKi9cblx0ZmFjdG9yeSh3b3JkWG1sLCBkb2NQYXJzZXIsIHBhcmVudFBhcnNlcil7XG5cdFx0aWYoIXRoaXMuX2ZhY3Rvcnkpe1xuXHRcdFx0bGV0IGE9bmV3IHRoaXMuY29uc3RydWN0b3IuRmFjdG9yeVxuXHRcdFx0dGhpcy5fZmFjdG9yeT1mdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4gYS5jcmVhdGUoLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZmFjdG9yeSguLi5hcmd1bWVudHMpXG5cdH1cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgbmFtZSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoZnVuY3Rpb24ocGF0aCxmaWxlKXtcblx0XHRcdFx0XHRwYXJ0c1twYXRoXT1maWxlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcse1xuXHRcdFx0XHRcdG5hbWU6bmFtZSxcblx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXG5cdFx0XHRcdH0pKVxuXHRcdFx0fVxuXG5cblx0XHRcdGlmKCQuaXNOb2RlKXsvL25vZGVcblx0XHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0XHRwYXJzZShkYXRhLCBpbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNley8vYnJvd3NlclxuXHRcdFx0XHRpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0XHR2YXIgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtwYXJzZShlLnRhcmdldC5yZXN1bHQsIGlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpKX1cblx0XHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBGYWN0b3J5PWNsYXNzIHtcblx0XHRjcmVhdGUod29yZFhtbCwgZG9jUGFyc2VyLCBwYXJlbnRQYXJzZXIpe1xuXHRcdFx0XG5cdFx0fVxuXHR9XG59XG4iXX0=