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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJzdHJpcFByZWZpeCIsIm5hbWUiLCJzcGxpdCIsInBvcCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImJ1ZmZlciIsImFzTm9kZUJ1ZmZlciIsIm9wdGlvbiIsInJlc29sdmUiLCJyZWplY3QiLCJhc1RleHQiLCJ0YWdOYW1lUHJvY2Vzc29ycyIsImF0dHJOYW1lUHJvY2Vzc29ycyIsImVycm9yIiwicmVzdWx0IiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicGFyc2UiLCJkYXRhIiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTBCO0FBQ3pCLFFBQU9BLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxHQUFoQixFQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0wsSSxFQUFLO0FBQ1osVUFBTyxLQUFLRyxLQUFMLENBQVdILElBQVgsQ0FBUDtBQUNBOzs7Z0NBRWFBLEksRUFBSztBQUNsQixPQUFJTSxPQUFLLEtBQUtILEtBQUwsQ0FBV0gsSUFBWCxDQUFUO0FBQ0EsT0FBSU8sUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLFNBQU9ILEtBQUtJLFlBQUwsRUFBWDtBQUNBRCxVQUFPRixLQUFQLEdBQWFELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBOUI7QUFDQSxVQUFPRSxNQUFQO0FBQ0E7OztnQ0FFYVQsSSxFQUFNVyxNLEVBQU87QUFBQTs7QUFDMUIsVUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBRyxNQUFLVixLQUFMLENBQVdILElBQVgsQ0FBSCxFQUNDLHlCQUFPLE1BQUtHLEtBQUwsQ0FBV0gsSUFBWCxFQUFpQmMsTUFBakIsRUFBUCxFQUNDLHNCQUFjLEVBQUNDLG1CQUFrQixDQUFDaEIsV0FBRCxDQUFuQixFQUFpQ2lCLG9CQUFtQixDQUFDakIsV0FBRCxDQUFwRCxFQUFkLEVBQWlGWSxVQUFRLEVBQXpGLENBREQsRUFFQyxVQUFDTSxLQUFELEVBQVFDLE1BQVIsRUFBaUI7QUFDaEIsU0FBR0QsS0FBSCxFQUFVO0FBQ1RKLGFBQU9JLEtBQVA7QUFDQSxNQUZELE1BRUs7QUFDSkwsY0FBUSx3QkFBUU0sTUFBUixDQUFSO0FBQ0E7QUFDRCxLQVJGLEVBREQsS0FXQ047QUFDRCxJQWJNLENBQVA7QUFjQTs7OzBCQUVNLENBRU47O0FBRUQ7Ozs7Ozs7Ozt1QkFPWU8sUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLHNCQUFZLFVBQUNSLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUNyQyxhQUFTUSxLQUFULENBQWVDLElBQWYsRUFBOEI7QUFBQSxTQUFUakIsS0FBUyx1RUFBSCxFQUFHOztBQUM3QixTQUFJRCxNQUFJLG9CQUFVa0IsSUFBVixDQUFSO0FBQUEsU0FBd0JuQixRQUFNLEVBQTlCO0FBQ0FDLFNBQUltQixNQUFKLENBQVcsVUFBQ0MsSUFBRCxFQUFNQyxJQUFOO0FBQUEsYUFBYXRCLE1BQU1xQixJQUFOLElBQVlDLElBQXpCO0FBQUEsTUFBWDtBQUNBYixhQUFRLElBQUlRLFlBQUosQ0FBaUJqQixLQUFqQixFQUF1QkMsR0FBdkIsRUFBMkJDLEtBQTNCLENBQVI7QUFDQTs7QUFFRCxRQUFHLE9BQU9jLFNBQVAsSUFBa0IsUUFBckIsRUFBOEI7QUFBQztBQUM5Qk8sYUFBUSxJQUFSLEVBQWNDLFFBQWQsQ0FBdUJSLFNBQXZCLEVBQWlDLFVBQVNGLEtBQVQsRUFBZ0JLLElBQWhCLEVBQXFCO0FBQ3JELFVBQUdMLEtBQUgsRUFDQ0osT0FBT0ksS0FBUCxFQURELEtBRUssSUFBR0ssSUFBSCxFQUFRO0FBQ1pELGFBQU1DLElBQU4sRUFBWSxFQUFDdEIsTUFBS21CLFVBQVVsQixLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQzBCLE9BQWhDLENBQXdDLFVBQXhDLEVBQW1ELEVBQW5ELENBQU4sRUFBWjtBQUNBO0FBQ0QsTUFORDtBQU9BLEtBUkQsTUFRTSxJQUFHVCxxQkFBcUJVLElBQXhCLEVBQTZCO0FBQ2xDLFNBQUlDLFNBQU8sSUFBSUMsVUFBSixFQUFYO0FBQ0FELFlBQU9FLE1BQVAsR0FBYyxVQUFTQyxDQUFULEVBQVc7QUFDeEJaLFlBQU1ZLEVBQUVDLE1BQUYsQ0FBU2hCLE1BQWYsRUFBdUI7QUFDckJsQixhQUFLbUIsVUFBVW5CLElBQVYsQ0FBZTRCLE9BQWYsQ0FBdUIsVUFBdkIsRUFBa0MsRUFBbEMsQ0FEZ0I7QUFFckJPLHFCQUFhaEIsVUFBVWdCLFlBRkY7QUFHckJDLGFBQUtqQixVQUFVaUI7QUFITSxPQUF2QjtBQUtBLE1BTkQ7QUFPQU4sWUFBT08saUJBQVAsQ0FBeUJsQixTQUF6QjtBQUNBLEtBVkssTUFVQTtBQUNMRSxXQUFNRixTQUFOO0FBQ0E7QUFDRCxJQTVCTSxDQUFQO0FBNkJBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xyXG5pbXBvcnQge3BhcnNlU3RyaW5nIGFzIHhtbDJqc30gZnJvbSBcInhtbDJqc1wiXHJcblxyXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuL3htbE9iamVjdFwiXHJcblxyXG5mdW5jdGlvbiBzdHJpcFByZWZpeChuYW1lKXtcclxuXHRyZXR1cm4gbmFtZS5zcGxpdCgnOicpLnBvcCgpXHJcbn1cclxuLyoqXHJcbiAqICBkb2N1bWVudCBwYXJzZXJcclxuICpcclxuICogIEBleGFtcGxlXHJcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXHJcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKCkpXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzc3tcclxuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xyXG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xyXG5cdFx0dGhpcy5yYXc9cmF3XHJcblx0XHR0aGlzLnByb3BzPXByb3BzXHJcblx0fVxyXG5cclxuXHRnZXRQYXJ0KG5hbWUpe1xyXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cclxuXHR9XHJcblxyXG5cdGdldEJ1ZmZlclBhcnQobmFtZSl7XHJcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXHJcblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXHJcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxyXG5cdFx0cmV0dXJuIGJ1ZmZlclxyXG5cdH1cclxuXHJcblx0Z2V0T2JqZWN0UGFydChuYW1lLCBvcHRpb24pe1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcclxuXHRcdFx0aWYodGhpcy5wYXJ0c1tuYW1lXSlcclxuXHRcdFx0XHR4bWwyanModGhpcy5wYXJ0c1tuYW1lXS5hc1RleHQoKSxcclxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oe3RhZ05hbWVQcm9jZXNzb3JzOltzdHJpcFByZWZpeF0sYXR0ck5hbWVQcm9jZXNzb3JzOltzdHJpcFByZWZpeF19LG9wdGlvbnx8e30pLFxyXG5cdFx0XHRcdFx0KGVycm9yLCByZXN1bHQpPT57XHJcblx0XHRcdFx0XHRcdGlmKGVycm9yKSB7XHJcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKVxyXG5cdFx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKGdldGFibGUocmVzdWx0KSlcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0ZWxzZVxyXG5cdFx0XHRcdHJlc29sdmUoKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHBhcnNlKCl7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxyXG5cclxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcclxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cclxuXHQgKi9cclxuXHJcblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcclxuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XHJcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcclxuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxyXG5cdFx0XHRcdHJhdy5maWx0ZXIoKHBhdGgsZmlsZSk9PnBhcnRzW3BhdGhdPWZpbGUpXHJcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxyXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcclxuXHRcdFx0XHRcdGlmKGVycm9yKVxyXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xyXG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcclxuXHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fWVsc2UgaWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XHJcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xyXG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcclxuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxyXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxyXG5cdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XHJcblx0XHRcdH1lbHNlIHtcclxuXHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==