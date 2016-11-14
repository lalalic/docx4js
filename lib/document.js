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
			var parts = doc.parts,
			    raw = doc.raw,
			    props = doc.props;

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
					var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJidWZmZXIiLCJzdXBwb3J0Iiwibm9kZWJ1ZmZlciIsInZpc2l0b3JGYWN0b3JpZXMiLCJ3b3JkWG1sIiwiZG9jUGFyc2VyIiwicGFyZW50UGFyc2VyIiwiX2ZhY3RvcnkiLCJhIiwiY29uc3RydWN0b3IiLCJGYWN0b3J5IiwiY3JlYXRlIiwiYXJndW1lbnRzIiwiZG9jIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYXJzZSIsImRhdGEiLCJmaWx0ZXIiLCJwYXRoIiwiZmlsZSIsIiQiLCJpc05vZGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJlcnJvciIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU9xQkEsUTtBQUNwQixtQkFBWUMsS0FBWixFQUFrQkMsR0FBbEIsRUFBc0JDLEtBQXRCLEVBQTRCO0FBQUE7O0FBQzNCLE9BQUtGLEtBQUwsR0FBV0EsS0FBWDtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLEtBQUwsR0FBV0EsS0FBWDtBQUNBOzs7OzBCQUNPQyxJLEVBQUs7QUFDWixVQUFPLEtBQUtILEtBQUwsQ0FBV0csSUFBWCxDQUFQO0FBQ0E7OzsrQkFDWUEsSSxFQUFLO0FBQ2pCLE9BQUlDLE9BQUssS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQVQ7QUFDQSxPQUFJRSxRQUFNRCxLQUFLRSxLQUFMLENBQVdELEtBQXJCO0FBQ0Es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TUFVTTtBQUNMSyxZQUFNTCxTQUFOO0FBQ0E7QUFDRDtBQUVELElBdENNLENBQVA7QUF1Q0E7Ozs7OztBQWhHbUJ0QixRLENBa0dia0IsTzs7Ozs7Ozt5QkFDQ04sTyxFQUFTQyxTLEVBQVdDLFksRUFBYSxDQUV2Qzs7Ozs7O2tCQXJHa0JkLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3Rvb2xcIlxyXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXHJcblxyXG4vKipcclxuICogIGRvY3VtZW50IHBhcnNlclxyXG4gKlxyXG4gKiAgQGV4YW1wbGVcclxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcclxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoW3Zpc2l0b3JzXSkpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcclxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xyXG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xyXG5cdFx0dGhpcy5yYXc9cmF3XHJcblx0XHR0aGlzLnByb3BzPXByb3BzXHJcblx0fVxyXG5cdGdldFBhcnQobmFtZSl7XHJcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxyXG5cdH1cclxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XHJcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0W0pTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlciA/ICdhc05vZGVCdWZmZXInIDogJ2FzQXJyYXlCdWZmZXInXSgpXHJcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxyXG5cdFx0cmV0dXJuIGJ1ZmZlclxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIHBhcnNlIGRvY3ggd2l0aCB2aXNpdG9ycyBjcmVhdGVkIGZyb20gdmlzaXRvciBmYWN0b3JpZXMgb25lIGJ5IG9uZVxyXG5cdCAqL1xyXG5cdHBhcnNlKHZpc2l0b3JGYWN0b3JpZXMpe1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIHJlbGVhc2UgcmVzb3VyY2VzIGFmdGVyIHBhcnNlXHJcblx0ICovXHJcblx0cmVsZWFzZSgpe1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBjcmVhdGUgcGFyc2VyIGZvciBhIHdvcmQgbW9kZWxcclxuXHQgKi9cclxuXHRmYWN0b3J5KHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcclxuXHRcdGlmKCF0aGlzLl9mYWN0b3J5KXtcclxuXHRcdFx0bGV0IGE9bmV3IHRoaXMuY29uc3RydWN0b3IuRmFjdG9yeVxyXG5cdFx0XHR0aGlzLl9mYWN0b3J5PWZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0cmV0dXJuIGEuY3JlYXRlKC4uLmFyZ3VtZW50cylcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX2ZhY3RvcnkoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNsb25lKGRvYyl7XHJcblx0XHRsZXQge3BhcnRzLHJhdyxwcm9wc309ZG9jXHJcblx0XHRyZXR1cm4gbmV3IERvY3VtZW50KHBhcnRzLHJhdyxwcm9wcylcclxuXHR9XHJcblx0LyoqXHJcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxyXG5cclxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcclxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHJcblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcclxuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcclxuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxyXG5cdFx0XHRcdHJhdy5maWx0ZXIoZnVuY3Rpb24ocGF0aCxmaWxlKXtcclxuXHRcdFx0XHRcdHBhcnRzW3BhdGhdPWZpbGVcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxyXG5cdFx0XHR9XHJcblxyXG5cclxuXHRcdFx0aWYoJC5pc05vZGUpey8vbm9kZVxyXG5cdFx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRpZihlcnJvcilcclxuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xyXG5cdFx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1lbHNley8vYnJvd3NlclxyXG5cdFx0XHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xyXG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XHJcblx0XHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXHJcblx0XHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXHJcblx0XHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3Mge1xyXG5cdFx0Y3JlYXRlKHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcclxuXHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==