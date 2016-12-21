"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _htmlparser = require("htmlparser2");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		(0, _classCallCheck3.default)(this, _class);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	(0, _createClass3.default)(_class, [{
		key: "getPart",
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: "getBufferPart",
		value: function getBufferPart(name) {
			var part = this.parts[name];
			var buffer = part.asNodeBuffer();
			buffer.crc32 = part._data.crc32;
			return buffer;
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
		key: "parser",
		value: function parser() {}
	}, {
		key: "render",
		value: function render() {}

		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}], [{
		key: "load",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicGFydHMiLCJyYXciLCJwcm9wcyIsIm5hbWUiLCJwYXJ0IiwiYnVmZmVyIiwiYXNOb2RlQnVmZmVyIiwiY3JjMzIiLCJfZGF0YSIsImNoZWVyaW8iLCJvcHQiLCJ4bWxNb2RlIiwiaGFuZGxlciIsImVsIiwiaWQiLCJlbmQiLCJhc1RleHQiLCJsb2FkIiwiZG9tIiwiZXJyb3IiLCJjb25zb2xlIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcnNlIiwiZGF0YSIsImZpbHRlciIsInBhdGgiLCJmaWxlIiwicmVxdWlyZSIsInJlYWRGaWxlIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQSxJQUFJQSxPQUFLLENBQVQ7QUFDQTs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osVUFBTyxLQUFLSCxLQUFMLENBQVdHLElBQVgsQ0FBUDtBQUNBOzs7Z0NBRWFBLEksRUFBSztBQUNsQixPQUFJQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFUO0FBQ0EsT0FBSUUsU0FBT0QsS0FBS0UsWUFBTCxFQUFYO0FBQ0FELFVBQU9FLEtBQVAsR0FBYUgsS0FBS0ksS0FBTCxDQUFXRCxLQUF4QjtBQUNBLFVBQU9GLE1BQVA7QUFDQTs7O2dDQUVhRixJLEVBQUs7QUFDbEIsT0FBTUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBWDtBQUNBLE9BQUcsQ0FBQ0MsSUFBSixFQUNDLE9BQU8sSUFBUCxDQURELEtBRUssSUFBR0EsS0FBS0ssT0FBUixFQUNKLE9BQU9MLElBQVAsQ0FESSxLQUVEO0FBQ0gsUUFBRztBQUNGLFNBQUlNLE1BQUksRUFBQ0MsU0FBUSxJQUFULEVBQVI7QUFDQSxTQUFJQyxVQUFRLDJCQUFlRixHQUFmLEVBQW1CO0FBQUEsYUFBSUcsR0FBR0MsRUFBSCxTQUFVZixNQUFkO0FBQUEsTUFBbkIsQ0FBWjtBQUNBLDRCQUFXYSxPQUFYLEVBQW1CRixHQUFuQixFQUF3QkssR0FBeEIsQ0FBNEJYLEtBQUtZLE1BQUwsRUFBNUI7QUFDQSxZQUFPLEtBQUtoQixLQUFMLENBQVdHLElBQVgsSUFBaUIsa0JBQU1jLElBQU4sQ0FBV0wsUUFBUU0sR0FBbkIsRUFBdUIsRUFBQ1AsU0FBUSxJQUFULEVBQXZCLENBQXhCO0FBQ0EsS0FMRCxDQUtDLE9BQU1RLEtBQU4sRUFBWTtBQUNaQyxhQUFRRCxLQUFSLENBQWNBLEtBQWQ7QUFDQSxZQUFPLElBQVA7QUFDQTtBQUNEO0FBQ0Q7OzsyQkFFTyxDQUVQOzs7MkJBRU8sQ0FFUDs7QUFFRDs7Ozs7Ozs7dUJBT1lFLFMsRUFBVTtBQUNyQixPQUFJQyxlQUFhLElBQWpCO0FBQ0EsVUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBbUI7QUFDckMsYUFBU0MsS0FBVCxDQUFlQyxJQUFmLEVBQThCO0FBQUEsU0FBVHhCLEtBQVMsdUVBQUgsRUFBRzs7QUFDN0IsU0FBSUQsTUFBSSxvQkFBVXlCLElBQVYsQ0FBUjtBQUFBLFNBQXdCMUIsUUFBTSxFQUE5QjtBQUNBQyxTQUFJMEIsTUFBSixDQUFXLFVBQUNDLElBQUQsRUFBTUMsSUFBTjtBQUFBLGFBQWE3QixNQUFNNEIsSUFBTixJQUFZQyxJQUF6QjtBQUFBLE1BQVg7QUFDQU4sYUFBUSxJQUFJRCxZQUFKLENBQWlCdEIsS0FBakIsRUFBdUJDLEdBQXZCLEVBQTJCQyxLQUEzQixDQUFSO0FBQ0E7O0FBRUQsUUFBRyxPQUFPbUIsU0FBUCxJQUFrQixRQUFyQixFQUE4QjtBQUFDO0FBQzlCUyxhQUFRLElBQVIsRUFBY0MsUUFBZCxDQUF1QlYsU0FBdkIsRUFBaUMsVUFBU0YsS0FBVCxFQUFnQk8sSUFBaEIsRUFBcUI7QUFDckQsVUFBR1AsS0FBSCxFQUNDSyxPQUFPTCxLQUFQLEVBREQsS0FFSyxJQUFHTyxJQUFILEVBQVE7QUFDWkQsYUFBTUMsSUFBTixFQUFZLEVBQUN2QixNQUFLa0IsVUFBVVcsS0FBVixDQUFnQixRQUFoQixFQUEwQkMsR0FBMUIsR0FBZ0NDLE9BQWhDLENBQXdDLFVBQXhDLEVBQW1ELEVBQW5ELENBQU4sRUFBWjtBQUNBO0FBQ0QsTUFORDtBQU9BLEtBUkQsTUFRTSxJQUFHYixxQkFBcUJjLElBQXhCLEVBQTZCO0FBQ2xDLFNBQUlDLFNBQU8sSUFBSUMsVUFBSixFQUFYO0FBQ0FELFlBQU9FLE1BQVAsR0FBYyxVQUFTQyxDQUFULEVBQVc7QUFDeEJkLFlBQU1jLEVBQUVDLE1BQUYsQ0FBU0MsTUFBZixFQUF1QjtBQUNyQnRDLGFBQUtrQixVQUFVbEIsSUFBVixDQUFlK0IsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQURnQjtBQUVyQlEscUJBQWFyQixVQUFVcUIsWUFGRjtBQUdyQkMsYUFBS3RCLFVBQVVzQjtBQUhNLE9BQXZCO0FBS0EsTUFORDtBQU9BUCxZQUFPUSxpQkFBUCxDQUF5QnZCLFNBQXpCO0FBQ0EsS0FWSyxNQVVBO0FBQ0xJLFdBQU1KLFNBQU47QUFDQTtBQUNELElBNUJNLENBQVA7QUE2QkEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5pbXBvcnQgY2hlZXIgZnJvbSBcImNoZWVyaW9cIlxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXG5sZXQgdXVpZD0wXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZSgpKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cblx0Z2V0QnVmZmVyUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUpe1xuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcblx0XHRcdHJldHVybiBwYXJ0XG5cdFx0ZWxzZXtcblx0XHRcdHRyeXtcblx0XHRcdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxuXHRcdFx0XHRsZXQgaGFuZGxlcj1uZXcgRG9tSGFuZGxlcihvcHQsZWw9PmVsLmlkPWBhJHt1dWlkKyt9YClcblx0XHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKHBhcnQuYXNUZXh0KCkpXG5cdFx0XHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPWNoZWVyLmxvYWQoaGFuZGxlci5kb20se3htbE1vZGU6dHJ1ZX0pXG5cdFx0XHR9Y2F0Y2goZXJyb3Ipe1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHRcdFx0XHRyZXR1cm4gbnVsbFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHBhcnNlcigpe1xuXG5cdH1cblxuXHRyZW5kZXIoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=