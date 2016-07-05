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
	}], [{
		key: 'clone',
		value: function clone(doc) {
			var parts = doc.parts;
			var raw = doc.raw;
			var props = doc.props;

			return new Document(parts, raw, props);
		}
		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}, {
		key: 'load',
		value: function load(inputFile) {
			var DocumentSelf = this;
			return new Promise(function (resolve, reject) {
				function parse(data) {
					var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

					var raw = new _jszip2.default(data),
					    parts = {};
					raw.filter(function (path, file) {
						parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, props));
				}

				if ($.isNode) {
					//node
					if (typeof inputFile == 'string') {
						//file name
						require('fs').readFile(inputFile, function (error, data) {
							if (error) reject(error);else if (data) {
								parse(data, { name: inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, '') });
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
//# sourceMappingURL=data:application/json;base64,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QixVQUFJLFNBQU8sSUFBSSxVQUFKLEVBQVAsQ0FEd0I7QUFFNUIsYUFBTyxNQUFQLEdBQWMsVUFBUyxDQUFULEVBQVc7QUFDeEIsYUFBTSxFQUFFLE1BQUYsQ0FBUyxNQUFULEVBQWlCO0FBQ3JCLGNBQUssVUFBVSxJQUFWLENBQWUsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQUFMO0FBQ0Esc0JBQWEsVUFBVSxZQUFWO0FBQ2IsY0FBSyxVQUFVLElBQVY7UUFIUCxFQUR3QjtPQUFYLENBRmM7QUFTNUIsYUFBTyxpQkFBUCxDQUF5QixTQUF6QixFQVQ0QjtNQUE3QixNQVVNO0FBQ0wsWUFBTSxTQUFOLEVBREs7TUFWTjtLQWJEO0lBVmtCLENBQW5CLENBRnFCOzs7O1FBdkRGOzs7U0FrR2I7Ozs7Ozs7eUJBQ0MsU0FBUyxXQUFXLGNBQWE7Ozs7OztrQkFuR3JCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi90b29sXCJcbmltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcblxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoW3Zpc2l0b3JzXSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50e1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cdGdldEltYWdlUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHR2YXIgYnVmZmVyPXBhcnRbSlNaaXAuc3VwcG9ydC5ub2RlYnVmZmVyID8gJ2FzTm9kZUJ1ZmZlcicgOiAnYXNBcnJheUJ1ZmZlciddKClcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxuXHRcdHJldHVybiBidWZmZXJcblx0fVxuXG5cdC8qKlxuXHQgKiAgcGFyc2UgZG9jeCB3aXRoIHZpc2l0b3JzIGNyZWF0ZWQgZnJvbSB2aXNpdG9yIGZhY3RvcmllcyBvbmUgYnkgb25lXG5cdCAqL1xuXHRwYXJzZSh2aXNpdG9yRmFjdG9yaWVzKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqIHJlbGVhc2UgcmVzb3VyY2VzIGFmdGVyIHBhcnNlXG5cdCAqL1xuXHRyZWxlYXNlKCl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiAgY3JlYXRlIHBhcnNlciBmb3IgYSB3b3JkIG1vZGVsXG5cdCAqL1xuXHRmYWN0b3J5KHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblx0XHRpZighdGhpcy5fZmFjdG9yeSl7XG5cdFx0XHRsZXQgYT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5GYWN0b3J5XG5cdFx0XHR0aGlzLl9mYWN0b3J5PWZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiBhLmNyZWF0ZSguLi5hcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9mYWN0b3J5KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBjbG9uZShkb2Mpe1xuXHRcdGxldCB7cGFydHMscmF3LHByb3BzfT1kb2Ncblx0XHRyZXR1cm4gbmV3IERvY3VtZW50KHBhcnRzLHJhdyxwcm9wcylcblx0fVxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcihmdW5jdGlvbihwYXRoLGZpbGUpe1xuXHRcdFx0XHRcdHBhcnRzW3BhdGhdPWZpbGVcblx0XHRcdFx0fSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoJC5pc05vZGUpey8vbm9kZVxuXHRcdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1lbHNley8vYnJvd3NlclxuXHRcdFx0XHRpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0XHR2YXIgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwge1xuXHRcdFx0XHRcdFx0XHRcdG5hbWU6aW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyksXG5cdFx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBGYWN0b3J5PWNsYXNzIHtcblx0XHRjcmVhdGUod29yZFhtbCwgZG9jUGFyc2VyLCBwYXJlbnRQYXJzZXIpe1xuXG5cdFx0fVxuXHR9XG59XG4iXX0=