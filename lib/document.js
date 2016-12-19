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
			var crc32 = part._data.crc32;
			var buffer = part.asNodeBuffer();
			buffer.crc32 = part._data.crc32 = crc32;
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
						return el.id = uuid++;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJ1dWlkIiwicGFydHMiLCJyYXciLCJwcm9wcyIsIm5hbWUiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImJ1ZmZlciIsImFzTm9kZUJ1ZmZlciIsImNoZWVyaW8iLCJvcHQiLCJ4bWxNb2RlIiwiaGFuZGxlciIsImVsIiwiaWQiLCJlbmQiLCJhc1RleHQiLCJsb2FkIiwiZG9tIiwiZXJyb3IiLCJjb25zb2xlIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcnNlIiwiZGF0YSIsImZpbHRlciIsInBhdGgiLCJmaWxlIiwicmVxdWlyZSIsInJlYWRGaWxlIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQSxJQUFJQSxPQUFLLENBQVQ7QUFDQTs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0MsSSxFQUFLO0FBQ1osVUFBTyxLQUFLSCxLQUFMLENBQVdHLElBQVgsQ0FBUDtBQUNBOzs7Z0NBRWFBLEksRUFBSztBQUNsQixPQUFJQyxPQUFLLEtBQUtKLEtBQUwsQ0FBV0csSUFBWCxDQUFUO0FBQ0EsT0FBSUUsUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLFNBQU9ILEtBQUtJLFlBQUwsRUFBWDtBQUNBRCxVQUFPRixLQUFQLEdBQWFELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBOUI7QUFDQSxVQUFPRSxNQUFQO0FBQ0E7OztnQ0FFYUosSSxFQUFLO0FBQ2xCLE9BQU1DLE9BQUssS0FBS0osS0FBTCxDQUFXRyxJQUFYLENBQVg7QUFDQSxPQUFHLENBQUNDLElBQUosRUFDQyxPQUFPLElBQVAsQ0FERCxLQUVLLElBQUdBLEtBQUtLLE9BQVIsRUFDSixPQUFPTCxJQUFQLENBREksS0FFRDtBQUNILFFBQUc7QUFDRixTQUFJTSxNQUFJLEVBQUNDLFNBQVEsSUFBVCxFQUFSO0FBQ0EsU0FBSUMsVUFBUSwyQkFBZUYsR0FBZixFQUFtQjtBQUFBLGFBQUlHLEdBQUdDLEVBQUgsR0FBTWYsTUFBVjtBQUFBLE1BQW5CLENBQVo7QUFDQSw0QkFBV2EsT0FBWCxFQUFtQkYsR0FBbkIsRUFBd0JLLEdBQXhCLENBQTRCWCxLQUFLWSxNQUFMLEVBQTVCO0FBQ0EsWUFBTyxLQUFLaEIsS0FBTCxDQUFXRyxJQUFYLElBQWlCLGtCQUFNYyxJQUFOLENBQVdMLFFBQVFNLEdBQW5CLEVBQXVCLEVBQUNQLFNBQVEsSUFBVCxFQUF2QixDQUF4QjtBQUNBLEtBTEQsQ0FLQyxPQUFNUSxLQUFOLEVBQVk7QUFDWkMsYUFBUUQsS0FBUixDQUFjQSxLQUFkO0FBQ0EsWUFBTyxJQUFQO0FBQ0E7QUFDRDtBQUNEOzs7MkJBRU8sQ0FFUDs7OzJCQUVPLENBRVA7O0FBRUQ7Ozs7Ozs7Ozt1QkFPWUUsUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLHNCQUFZLFVBQUNDLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUNyQyxhQUFTQyxLQUFULENBQWVDLElBQWYsRUFBOEI7QUFBQSxTQUFUeEIsS0FBUyx1RUFBSCxFQUFHOztBQUM3QixTQUFJRCxNQUFJLG9CQUFVeUIsSUFBVixDQUFSO0FBQUEsU0FBd0IxQixRQUFNLEVBQTlCO0FBQ0FDLFNBQUkwQixNQUFKLENBQVcsVUFBQ0MsSUFBRCxFQUFNQyxJQUFOO0FBQUEsYUFBYTdCLE1BQU00QixJQUFOLElBQVlDLElBQXpCO0FBQUEsTUFBWDtBQUNBTixhQUFRLElBQUlELFlBQUosQ0FBaUJ0QixLQUFqQixFQUF1QkMsR0FBdkIsRUFBMkJDLEtBQTNCLENBQVI7QUFDQTs7QUFFRCxRQUFHLE9BQU9tQixTQUFQLElBQWtCLFFBQXJCLEVBQThCO0FBQUM7QUFDOUJTLGFBQVEsSUFBUixFQUFjQyxRQUFkLENBQXVCVixTQUF2QixFQUFpQyxVQUFTRixLQUFULEVBQWdCTyxJQUFoQixFQUFxQjtBQUNyRCxVQUFHUCxLQUFILEVBQ0NLLE9BQU9MLEtBQVAsRUFERCxLQUVLLElBQUdPLElBQUgsRUFBUTtBQUNaRCxhQUFNQyxJQUFOLEVBQVksRUFBQ3ZCLE1BQUtrQixVQUFVVyxLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQ0MsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBTixFQUFaO0FBQ0E7QUFDRCxNQU5EO0FBT0EsS0FSRCxNQVFNLElBQUdiLHFCQUFxQmMsSUFBeEIsRUFBNkI7QUFDbEMsU0FBSUMsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsWUFBT0UsTUFBUCxHQUFjLFVBQVNDLENBQVQsRUFBVztBQUN4QmQsWUFBTWMsRUFBRUMsTUFBRixDQUFTQyxNQUFmLEVBQXVCO0FBQ3JCdEMsYUFBS2tCLFVBQVVsQixJQUFWLENBQWUrQixPQUFmLENBQXVCLFVBQXZCLEVBQWtDLEVBQWxDLENBRGdCO0FBRXJCUSxxQkFBYXJCLFVBQVVxQixZQUZGO0FBR3JCQyxhQUFLdEIsVUFBVXNCO0FBSE0sT0FBdkI7QUFLQSxNQU5EO0FBT0FQLFlBQU9RLGlCQUFQLENBQXlCdkIsU0FBekI7QUFDQSxLQVZLLE1BVUE7QUFDTEksV0FBTUosU0FBTjtBQUNBO0FBQ0QsSUE1Qk0sQ0FBUDtBQTZCQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXHJcbmxldCB1dWlkPTBcclxuLyoqXHJcbiAqICBkb2N1bWVudCBwYXJzZXJcclxuICpcclxuICogIEBleGFtcGxlXHJcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXHJcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xyXG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xyXG5cdFx0dGhpcy5yYXc9cmF3XHJcblx0XHR0aGlzLnByb3BzPXByb3BzXHJcblx0fVxyXG5cclxuXHRnZXRQYXJ0KG5hbWUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cclxuXHR9XHJcblxyXG5cdGdldEJ1ZmZlclBhcnQobmFtZSl7XHJcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXHJcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxyXG5cdFx0cmV0dXJuIGJ1ZmZlclxyXG5cdH1cclxuXHJcblx0Z2V0T2JqZWN0UGFydChuYW1lKXtcclxuXHRcdGNvbnN0IHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0aWYoIXBhcnQpXHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHRlbHNlIGlmKHBhcnQuY2hlZXJpbylcclxuXHRcdFx0cmV0dXJuIHBhcnRcclxuXHRcdGVsc2V7XHJcblx0XHRcdHRyeXtcclxuXHRcdFx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWV9XHJcblx0XHRcdFx0bGV0IGhhbmRsZXI9bmV3IERvbUhhbmRsZXIob3B0LGVsPT5lbC5pZD11dWlkKyspXHJcblx0XHRcdFx0bmV3IFBhcnNlcihoYW5kbGVyLG9wdCkuZW5kKHBhcnQuYXNUZXh0KCkpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09Y2hlZXIubG9hZChoYW5kbGVyLmRvbSx7eG1sTW9kZTp0cnVlfSlcclxuXHRcdFx0fWNhdGNoKGVycm9yKXtcclxuXHRcdFx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHBhcnNlcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcclxuXHJcblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXHJcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XHJcblx0ICovXHJcblxyXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XHJcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XHJcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cclxuXHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcclxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XHJcblx0XHRcdFx0XHRpZihlcnJvcilcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XHJcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xyXG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcclxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcclxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=