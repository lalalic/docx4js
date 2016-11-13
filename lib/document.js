"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require("babel-runtime/core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _xml2js = require("xml2js");

var _xmlObject = require("./xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripPrefix(name) {
	return name.split(':').pop();
}
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
		value: function getObjectPart(name, option) {
			var _this = this;

			return new _promise2.default(function (resolve, reject) {
				if (_this.parts[name]) (0, _xml2js.parseString)(_this.parts[name].asText(), (0, _assign2.default)({ tagNameProcessors: [stripPrefix], attrNameProcessors: [stripPrefix] }, option || {}), function (error, result) {
					if (error) {
						reject(error);
					} else {
						resolve((0, _xmlObject.getable)(result));
					}
				});else resolve();
			});
		}
	}, {
		key: "parse",
		value: function parse() {}

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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJzdHJpcFByZWZpeCIsIm5hbWUiLCJzcGxpdCIsInBvcCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImJ1ZmZlciIsImFzTm9kZUJ1ZmZlciIsIm9wdGlvbiIsInJlc29sdmUiLCJyZWplY3QiLCJhc1RleHQiLCJ0YWdOYW1lUHJvY2Vzc29ycyIsImF0dHJOYW1lUHJvY2Vzc29ycyIsImVycm9yIiwicmVzdWx0IiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicGFyc2UiLCJkYXRhIiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTBCO0FBQ3pCLFFBQU9BLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxHQUFoQixFQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0wsSSxFQUFLO0FBQ1osVUFBTyxLQUFLRyxLQUFMLENBQVdILElBQVgsQ0FBUDtBQUNBOzs7Z0NBRWFBLEksRUFBSztBQUNsQixPQUFJTSxPQUFLLEtBQUtILEtBQUwsQ0FBV0gsSUFBWCxDQUFUO0FBQ0EsT0FBSU8sUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLFNBQU9ILEtBQUtJLFlBQUwsRUFBWDtBQUNBRCxVQUFPRixLQUFQLEdBQWFELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBOUI7QUFDQSxVQUFPRSxNQUFQO0FBQ0E7OztnQ0FFYVQsSSxFQUFNVyxNLEVBQU87QUFBQTs7QUFDMUIsVUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBRyxNQUFLVixLQUFMLENBQVdILElBQVgsQ0FBSCxFQUNDLHlCQUFPLE1BQUtHLEtBQUwsQ0FBV0gsSUFBWCxFQUFpQmMsTUFBakIsRUFBUCxFQUNDLHNCQUFjLEVBQUNDLG1CQUFrQixDQUFDaEIsV0FBRCxDQUFuQixFQUFpQ2lCLG9CQUFtQixDQUFDakIsV0FBRCxDQUFwRCxFQUFkLEVBQWlGWSxVQUFRLEVBQXpGLENBREQsRUFFQyxVQUFDTSxLQUFELEVBQVFDLE1BQVIsRUFBaUI7QUFDaEIsU0FBR0QsS0FBSCxFQUFVO0FBQ1RKLGFBQU9JLEtBQVA7QUFDQSxNQUZELE1BRUs7QUFDSkwsY0FBUSx3QkFBUU0sTUFBUixDQUFSO0FBQ0E7QUFDRCxLQVJGLEVBREQsS0FXQ047QUFDRCxJQWJNLENBQVA7QUFjQTs7OzBCQUVNLENBRU47O0FBRUQ7Ozs7Ozs7O3VCQU9ZTyxTLEVBQVU7QUFDckIsT0FBSUMsZUFBYSxJQUFqQjtBQUNBLFVBQU8sc0JBQVksVUFBQ1IsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ3JDLGFBQVNRLEtBQVQsQ0FBZUMsSUFBZixFQUE4QjtBQUFBLFNBQVRqQixLQUFTLHVFQUFILEVBQUc7O0FBQzdCLFNBQUlELE1BQUksb0JBQVVrQixJQUFWLENBQVI7QUFBQSxTQUF3Qm5CLFFBQU0sRUFBOUI7QUFDQUMsU0FBSW1CLE1BQUosQ0FBVyxVQUFDQyxJQUFELEVBQU1DLElBQU47QUFBQSxhQUFhdEIsTUFBTXFCLElBQU4sSUFBWUMsSUFBekI7QUFBQSxNQUFYO0FBQ0FiLGFBQVEsSUFBSVEsWUFBSixDQUFpQmpCLEtBQWpCLEVBQXVCQyxHQUF2QixFQUEyQkMsS0FBM0IsQ0FBUjtBQUNBOztBQUVELFFBQUcsT0FBT2MsU0FBUCxJQUFrQixRQUFyQixFQUE4QjtBQUFDO0FBQzlCTyxhQUFRLElBQVIsRUFBY0MsUUFBZCxDQUF1QlIsU0FBdkIsRUFBaUMsVUFBU0YsS0FBVCxFQUFnQkssSUFBaEIsRUFBcUI7QUFDckQsVUFBR0wsS0FBSCxFQUNDSixPQUFPSSxLQUFQLEVBREQsS0FFSyxJQUFHSyxJQUFILEVBQVE7QUFDWkQsYUFBTUMsSUFBTixFQUFZLEVBQUN0QixNQUFLbUIsVUFBVWxCLEtBQVYsQ0FBZ0IsUUFBaEIsRUFBMEJDLEdBQTFCLEdBQWdDMEIsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBTixFQUFaO0FBQ0E7QUFDRCxNQU5EO0FBT0EsS0FSRCxNQVFNLElBQUdULHFCQUFxQlUsSUFBeEIsRUFBNkI7QUFDbEMsU0FBSUMsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsWUFBT0UsTUFBUCxHQUFjLFVBQVNDLENBQVQsRUFBVztBQUN4QlosWUFBTVksRUFBRUMsTUFBRixDQUFTaEIsTUFBZixFQUF1QjtBQUNyQmxCLGFBQUttQixVQUFVbkIsSUFBVixDQUFlNEIsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQURnQjtBQUVyQk8scUJBQWFoQixVQUFVZ0IsWUFGRjtBQUdyQkMsYUFBS2pCLFVBQVVpQjtBQUhNLE9BQXZCO0FBS0EsTUFORDtBQU9BTixZQUFPTyxpQkFBUCxDQUF5QmxCLFNBQXpCO0FBQ0EsS0FWSyxNQVVBO0FBQ0xFLFdBQU1GLFNBQU47QUFDQTtBQUNELElBNUJNLENBQVA7QUE2QkEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5pbXBvcnQge3BhcnNlU3RyaW5nIGFzIHhtbDJqc30gZnJvbSBcInhtbDJqc1wiXG5cbmltcG9ydCB7Z2V0YWJsZX0gZnJvbSBcIi4veG1sT2JqZWN0XCJcblxuZnVuY3Rpb24gc3RyaXBQcmVmaXgobmFtZSl7XG5cdHJldHVybiBuYW1lLnNwbGl0KCc6JykucG9wKClcbn1cbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXRCdWZmZXJQYXJ0KG5hbWUpe1xuXHRcdHZhciBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHZhciBidWZmZXI9cGFydC5hc05vZGVCdWZmZXIoKVxuXHRcdGJ1ZmZlci5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyXG5cdFx0cmV0dXJuIGJ1ZmZlclxuXHR9XG5cblx0Z2V0T2JqZWN0UGFydChuYW1lLCBvcHRpb24pe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG5cdFx0XHRpZih0aGlzLnBhcnRzW25hbWVdKVxuXHRcdFx0XHR4bWwyanModGhpcy5wYXJ0c1tuYW1lXS5hc1RleHQoKSxcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKHt0YWdOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdLGF0dHJOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdfSxvcHRpb258fHt9KSxcblx0XHRcdFx0XHQoZXJyb3IsIHJlc3VsdCk9Pntcblx0XHRcdFx0XHRcdGlmKGVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcblx0XHRcdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKGdldGFibGUocmVzdWx0KSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXNvbHZlKClcblx0XHR9KVxuXHR9XG5cblx0cGFyc2UoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XG5cdFx0XHRcdHZhciByYXc9bmV3IEpTWmlwKGRhdGEpLHBhcnRzPXt9XG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxuXHRcdFx0fVxuXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0cmVhZGVyLm9ubG9hZD1mdW5jdGlvbihlKXtcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0bGFzdE1vZGlmaWVkOmlucHV0RmlsZS5sYXN0TW9kaWZpZWQsXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG59XG4iXX0=