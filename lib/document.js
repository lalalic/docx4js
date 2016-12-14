'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: 'getPart',
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: 'getBufferPart',
		value: function getBufferPart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var buffer = part.asNodeBuffer();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}
	}, {
		key: 'getObjectPart',
		value: function getObjectPart(name) {
			var part = this.parts[name];
			if (!part) return null;else if (part.cheerio) return part;else {
				try {
					return this.parts[name] = (0, _cheerio2.default)(part.asNodeBuffer(), { xmlMode: true });
				} catch (error) {
					console.error(error);
					return null;
				}
			}
		}
	}, {
		key: 'parse',
		value: function parse() {}
	}, {
		key: 'render',
		value: function render() {}

		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}], [{
		key: 'load',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJwYXJ0cyIsInJhdyIsInByb3BzIiwibmFtZSIsInBhcnQiLCJjcmMzMiIsIl9kYXRhIiwiYnVmZmVyIiwiYXNOb2RlQnVmZmVyIiwiY2hlZXJpbyIsInhtbE1vZGUiLCJlcnJvciIsImNvbnNvbGUiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJyZXNvbHZlIiwicmVqZWN0IiwicGFyc2UiLCJkYXRhIiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJzcGxpdCIsInBvcCIsInJlcGxhY2UiLCJCbG9iIiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJ0YXJnZXQiLCJyZXN1bHQiLCJsYXN0TW9kaWZpZWQiLCJzaXplIiwicmVhZEFzQXJyYXlCdWZmZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7OztBQUNBOzs7Ozs7OztBQVFDLGlCQUFZQSxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0E7Ozs7MEJBRU9DLEksRUFBSztBQUNaLFVBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFYLENBQVA7QUFDQTs7O2dDQUVhQSxJLEVBQUs7QUFDbEIsT0FBSUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxTQUFPSCxLQUFLSSxZQUFMLEVBQVg7QUFDQUQsVUFBT0YsS0FBUCxHQUFhRCxLQUFLRSxLQUFMLENBQVdELEtBQVgsR0FBaUJBLEtBQTlCO0FBQ0EsVUFBT0UsTUFBUDtBQUNBOzs7Z0NBRWFKLEksRUFBSztBQUNsQixPQUFNQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFYO0FBQ0EsT0FBRyxDQUFDQyxJQUFKLEVBQ0MsT0FBTyxJQUFQLENBREQsS0FFSyxJQUFHQSxLQUFLSyxPQUFSLEVBQ0osT0FBT0wsSUFBUCxDQURJLEtBRUQ7QUFDSCxRQUFHO0FBQ0YsWUFBTyxLQUFLSixLQUFMLENBQVdHLElBQVgsSUFBaUIsdUJBQU1DLEtBQUtJLFlBQUwsRUFBTixFQUEwQixFQUFDRSxTQUFRLElBQVQsRUFBMUIsQ0FBeEI7QUFDQSxLQUZELENBRUMsT0FBTUMsS0FBTixFQUFZO0FBQ1pDLGFBQVFELEtBQVIsQ0FBY0EsS0FBZDtBQUNBLFlBQU8sSUFBUDtBQUNBO0FBQ0Q7QUFDRDs7OzBCQUVNLENBRU47OzsyQkFFTyxDQUVQOztBQUVEOzs7Ozs7Ozt1QkFPWUUsUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUNyQyxhQUFTQyxLQUFULENBQWVDLElBQWYsRUFBOEI7QUFBQSxTQUFUaEIsS0FBUyx1RUFBSCxFQUFHOztBQUM3QixTQUFJRCxNQUFJLG9CQUFVaUIsSUFBVixDQUFSO0FBQUEsU0FBd0JsQixRQUFNLEVBQTlCO0FBQ0FDLFNBQUlrQixNQUFKLENBQVcsVUFBQ0MsSUFBRCxFQUFNQyxJQUFOO0FBQUEsYUFBYXJCLE1BQU1vQixJQUFOLElBQVlDLElBQXpCO0FBQUEsTUFBWDtBQUNBTixhQUFRLElBQUlELFlBQUosQ0FBaUJkLEtBQWpCLEVBQXVCQyxHQUF2QixFQUEyQkMsS0FBM0IsQ0FBUjtBQUNBOztBQUVELFFBQUcsT0FBT1csU0FBUCxJQUFrQixRQUFyQixFQUE4QjtBQUFDO0FBQzlCUyxhQUFRLElBQVIsRUFBY0MsUUFBZCxDQUF1QlYsU0FBdkIsRUFBaUMsVUFBU0YsS0FBVCxFQUFnQk8sSUFBaEIsRUFBcUI7QUFDckQsVUFBR1AsS0FBSCxFQUNDSyxPQUFPTCxLQUFQLEVBREQsS0FFSyxJQUFHTyxJQUFILEVBQVE7QUFDWkQsYUFBTUMsSUFBTixFQUFZLEVBQUNmLE1BQUtVLFVBQVVXLEtBQVYsQ0FBZ0IsUUFBaEIsRUFBMEJDLEdBQTFCLEdBQWdDQyxPQUFoQyxDQUF3QyxVQUF4QyxFQUFtRCxFQUFuRCxDQUFOLEVBQVo7QUFDQTtBQUNELE1BTkQ7QUFPQSxLQVJELE1BUU0sSUFBR2IscUJBQXFCYyxJQUF4QixFQUE2QjtBQUNsQyxTQUFJQyxTQUFPLElBQUlDLFVBQUosRUFBWDtBQUNBRCxZQUFPRSxNQUFQLEdBQWMsVUFBU0MsQ0FBVCxFQUFXO0FBQ3hCZCxZQUFNYyxFQUFFQyxNQUFGLENBQVNDLE1BQWYsRUFBdUI7QUFDckI5QixhQUFLVSxVQUFVVixJQUFWLENBQWV1QixPQUFmLENBQXVCLFVBQXZCLEVBQWtDLEVBQWxDLENBRGdCO0FBRXJCUSxxQkFBYXJCLFVBQVVxQixZQUZGO0FBR3JCQyxhQUFLdEIsVUFBVXNCO0FBSE0sT0FBdkI7QUFLQSxNQU5EO0FBT0FQLFlBQU9RLGlCQUFQLENBQXlCdkIsU0FBekI7QUFDQSxLQVZLLE1BVUE7QUFDTEksV0FBTUosU0FBTjtBQUNBO0FBQ0QsSUE1Qk0sQ0FBUDtBQTZCQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcbmltcG9ydCBwYXJzZSBmcm9tIFwiY2hlZXJpb1wiXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cblx0Z2V0QnVmZmVyUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHR2YXIgYnVmZmVyPXBhcnQuYXNOb2RlQnVmZmVyKClcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxuXHRcdHJldHVybiBidWZmZXJcblx0fVxuXG5cdGdldE9iamVjdFBhcnQobmFtZSl7XG5cdFx0Y29uc3QgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0aWYoIXBhcnQpXG5cdFx0XHRyZXR1cm4gbnVsbFxuXHRcdGVsc2UgaWYocGFydC5jaGVlcmlvKVxuXHRcdFx0cmV0dXJuIHBhcnRcblx0XHRlbHNle1xuXHRcdFx0dHJ5e1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXT1wYXJzZShwYXJ0LmFzTm9kZUJ1ZmZlcigpLHt4bWxNb2RlOnRydWV9KVxuXHRcdFx0fWNhdGNoKGVycm9yKXtcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcilcblx0XHRcdFx0cmV0dXJuIG51bGxcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRwYXJzZSgpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=