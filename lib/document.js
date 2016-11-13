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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJidWZmZXIiLCJzdXBwb3J0Iiwibm9kZWJ1ZmZlciIsInZpc2l0b3JGYWN0b3JpZXMiLCJ3b3JkWG1sIiwiZG9jUGFyc2VyIiwicGFyZW50UGFyc2VyIiwiX2ZhY3RvcnkiLCJhIiwiY29uc3RydWN0b3IiLCJGYWN0b3J5IiwiY3JlYXRlIiwiYXJndW1lbnRzIiwiZG9jIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYXJzZSIsImRhdGEiLCJmaWx0ZXIiLCJwYXRoIiwiZmlsZSIsIiQiLCJpc05vZGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJlcnJvciIsInNwbGl0IiwicG9wIiwicmVwbGFjZSIsIkJsb2IiLCJyZWFkZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkIiwiZSIsInRhcmdldCIsInJlc3VsdCIsImxhc3RNb2RpZmllZCIsInNpemUiLCJyZWFkQXNBcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7QUFFQTs7Ozs7OztJQU9xQkEsUTtBQUNwQixtQkFBWUMsS0FBWixFQUFrQkMsR0FBbEIsRUFBc0JDLEtBQXRCLEVBQTRCO0FBQUE7O0FBQzNCLE9BQUtGLEtBQUwsR0FBV0EsS0FBWDtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLEtBQUwsR0FBV0EsS0FBWDtBQUNBOzs7OzBCQUNPQyxJLEVBQUs7QUFDWixVQUFPLEtBQUtILEtBQUwsQ0FBV0csSUFBWCxDQUFQO0FBQ0E7OzsrQkFDWUEsSSxFQUFLO0FBQ2pCLE9BQUlDLE9BQUssS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQVQ7QUFDQSxPQUFJRSxRQUFNRCxLQUFLRSxLQUFMLENBQVdELEtBQXJCO0FBQ0Es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QVVNO0FBQ0xLLFlBQU1MLFNBQU47QUFDQTtBQUNEO0FBRUQsSUF0Q00sQ0FBUDtBQXVDQTs7Ozs7O0FBaEdtQnRCLFEsQ0FrR2JrQixPOzs7Ozs7O3lCQUNDTixPLEVBQVNDLFMsRUFBV0MsWSxFQUFhLENBRXZDOzs7Ozs7a0JBckdrQmQsUSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vdG9vbFwiXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5cbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKFt2aXNpdG9yc10pKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0W0pTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlciA/ICdhc05vZGVCdWZmZXInIDogJ2FzQXJyYXlCdWZmZXInXSgpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblxuXHQvKipcblx0ICogIHBhcnNlIGRvY3ggd2l0aCB2aXNpdG9ycyBjcmVhdGVkIGZyb20gdmlzaXRvciBmYWN0b3JpZXMgb25lIGJ5IG9uZVxuXHQgKi9cblx0cGFyc2UodmlzaXRvckZhY3Rvcmllcyl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiByZWxlYXNlIHJlc291cmNlcyBhZnRlciBwYXJzZVxuXHQgKi9cblx0cmVsZWFzZSgpe1xuXG5cdH1cblxuXHQvKipcblx0ICogIGNyZWF0ZSBwYXJzZXIgZm9yIGEgd29yZCBtb2RlbFxuXHQgKi9cblx0ZmFjdG9yeSh3b3JkWG1sLCBkb2NQYXJzZXIsIHBhcmVudFBhcnNlcil7XG5cdFx0aWYoIXRoaXMuX2ZhY3Rvcnkpe1xuXHRcdFx0bGV0IGE9bmV3IHRoaXMuY29uc3RydWN0b3IuRmFjdG9yeVxuXHRcdFx0dGhpcy5fZmFjdG9yeT1mdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4gYS5jcmVhdGUoLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZmFjdG9yeSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRzdGF0aWMgY2xvbmUoZG9jKXtcblx0XHRsZXQge3BhcnRzLHJhdyxwcm9wc309ZG9jXG5cdFx0cmV0dXJuIG5ldyBEb2N1bWVudChwYXJ0cyxyYXcscHJvcHMpXG5cdH1cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoZnVuY3Rpb24ocGF0aCxmaWxlKXtcblx0XHRcdFx0XHRwYXJ0c1twYXRoXT1maWxlXG5cdFx0XHRcdH0pXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cblx0XHRcdGlmKCQuaXNOb2RlKXsvL25vZGVcblx0XHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXsvL2Jyb3dzZXJcblx0XHRcdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyB7XG5cdFx0Y3JlYXRlKHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblxuXHRcdH1cblx0fVxufVxuIl19