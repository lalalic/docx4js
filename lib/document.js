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
 *  	.then(doc=>doc.parse([visitors]))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJzdHJpcFByZWZpeCIsIm5hbWUiLCJzcGxpdCIsInBvcCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJwYXJ0IiwiY3JjMzIiLCJfZGF0YSIsImJ1ZmZlciIsImFzTm9kZUJ1ZmZlciIsIm9wdGlvbiIsInJlc29sdmUiLCJyZWplY3QiLCJhc1RleHQiLCJ0YWdOYW1lUHJvY2Vzc29ycyIsImF0dHJOYW1lUHJvY2Vzc29ycyIsImVycm9yIiwicmVzdWx0IiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwicGFyc2UiLCJkYXRhIiwiZmlsdGVyIiwicGF0aCIsImZpbGUiLCJyZXF1aXJlIiwicmVhZEZpbGUiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFFQTs7OztBQUVBLFNBQVNBLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTBCO0FBQ3pCLFFBQU9BLEtBQUtDLEtBQUwsQ0FBVyxHQUFYLEVBQWdCQyxHQUFoQixFQUFQO0FBQ0E7QUFDRDs7Ozs7Ozs7O0FBUUMsaUJBQVlDLEtBQVosRUFBa0JDLEdBQWxCLEVBQXNCQyxLQUF0QixFQUE0QjtBQUFBOztBQUMzQixPQUFLRixLQUFMLEdBQVdBLEtBQVg7QUFDQSxPQUFLQyxHQUFMLEdBQVNBLEdBQVQ7QUFDQSxPQUFLQyxLQUFMLEdBQVdBLEtBQVg7QUFDQTs7OzswQkFFT0wsSSxFQUFLO0FBQ1osVUFBTyxLQUFLRyxLQUFMLENBQVdILElBQVgsQ0FBUDtBQUNBOzs7Z0NBRWFBLEksRUFBSztBQUNsQixPQUFJTSxPQUFLLEtBQUtILEtBQUwsQ0FBV0gsSUFBWCxDQUFUO0FBQ0EsT0FBSU8sUUFBTUQsS0FBS0UsS0FBTCxDQUFXRCxLQUFyQjtBQUNBLE9BQUlFLFNBQU9ILEtBQUtJLFlBQUwsRUFBWDtBQUNBRCxVQUFPRixLQUFQLEdBQWFELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBOUI7QUFDQSxVQUFPRSxNQUFQO0FBQ0E7OztnQ0FFYVQsSSxFQUFNVyxNLEVBQU87QUFBQTs7QUFDMUIsVUFBTyxzQkFBWSxVQUFDQyxPQUFELEVBQVNDLE1BQVQsRUFBa0I7QUFDcEMsUUFBRyxNQUFLVixLQUFMLENBQVdILElBQVgsQ0FBSCxFQUNDLHlCQUFPLE1BQUtHLEtBQUwsQ0FBV0gsSUFBWCxFQUFpQmMsTUFBakIsRUFBUCxFQUNDLHNCQUFjLEVBQUNDLG1CQUFrQixDQUFDaEIsV0FBRCxDQUFuQixFQUFpQ2lCLG9CQUFtQixDQUFDakIsV0FBRCxDQUFwRCxFQUFkLEVBQWlGWSxVQUFRLEVBQXpGLENBREQsRUFFQyxVQUFDTSxLQUFELEVBQVFDLE1BQVIsRUFBaUI7QUFDaEIsU0FBR0QsS0FBSCxFQUFVO0FBQ1RKLGFBQU9JLEtBQVA7QUFDQSxNQUZELE1BRUs7QUFDSkwsY0FBUSx3QkFBUU0sTUFBUixDQUFSO0FBQ0E7QUFDRCxLQVJGLEVBREQsS0FXQ047QUFDRCxJQWJNLENBQVA7QUFjQTs7OzBCQUVNLENBRU47O0FBRUQ7Ozs7Ozs7Ozt1QkFPWU8sUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLHNCQUFZLFVBQUNSLE9BQUQsRUFBVUMsTUFBVixFQUFtQjtBQUNyQyxhQUFTUSxLQUFULENBQWVDLElBQWYsRUFBOEI7QUFBQSxTQUFUakIsS0FBUyx1RUFBSCxFQUFHOztBQUM3QixTQUFJRCxNQUFJLG9CQUFVa0IsSUFBVixDQUFSO0FBQUEsU0FBd0JuQixRQUFNLEVBQTlCO0FBQ0FDLFNBQUltQixNQUFKLENBQVcsVUFBQ0MsSUFBRCxFQUFNQyxJQUFOO0FBQUEsYUFBYXRCLE1BQU1xQixJQUFOLElBQVlDLElBQXpCO0FBQUEsTUFBWDtBQUNBYixhQUFRLElBQUlRLFlBQUosQ0FBaUJqQixLQUFqQixFQUF1QkMsR0FBdkIsRUFBMkJDLEtBQTNCLENBQVI7QUFDQTs7QUFFRCxRQUFHLE9BQU9jLFNBQVAsSUFBa0IsUUFBckIsRUFBOEI7QUFBQztBQUM5Qk8sYUFBUSxJQUFSLEVBQWNDLFFBQWQsQ0FBdUJSLFNBQXZCLEVBQWlDLFVBQVNGLEtBQVQsRUFBZ0JLLElBQWhCLEVBQXFCO0FBQ3JELFVBQUdMLEtBQUgsRUFDQ0osT0FBT0ksS0FBUCxFQURELEtBRUssSUFBR0ssSUFBSCxFQUFRO0FBQ1pELGFBQU1DLElBQU4sRUFBWSxFQUFDdEIsTUFBS21CLFVBQVVsQixLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQzBCLE9BQWhDLENBQXdDLFVBQXhDLEVBQW1ELEVBQW5ELENBQU4sRUFBWjtBQUNBO0FBQ0QsTUFORDtBQU9BLEtBUkQsTUFRTSxJQUFHVCxxQkFBcUJVLElBQXhCLEVBQTZCO0FBQ2xDLFNBQUlDLFNBQU8sSUFBSUMsVUFBSixFQUFYO0FBQ0FELFlBQU9FLE1BQVAsR0FBYyxVQUFTQyxDQUFULEVBQVc7QUFDeEJaLFlBQU1ZLEVBQUVDLE1BQUYsQ0FBU2hCLE1BQWYsRUFBdUI7QUFDckJsQixhQUFLbUIsVUFBVW5CLElBQVYsQ0FBZTRCLE9BQWYsQ0FBdUIsVUFBdkIsRUFBa0MsRUFBbEMsQ0FEZ0I7QUFFckJPLHFCQUFhaEIsVUFBVWdCLFlBRkY7QUFHckJDLGFBQUtqQixVQUFVaUI7QUFITSxPQUF2QjtBQUtBLE1BTkQ7QUFPQU4sWUFBT08saUJBQVAsQ0FBeUJsQixTQUF6QjtBQUNBLEtBVkssTUFVQTtBQUNMRSxXQUFNRixTQUFOO0FBQ0E7QUFDRCxJQTVCTSxDQUFQO0FBNkJBIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xyXG5pbXBvcnQge3BhcnNlU3RyaW5nIGFzIHhtbDJqc30gZnJvbSBcInhtbDJqc1wiXHJcblxyXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuL3htbE9iamVjdFwiXHJcblxyXG5mdW5jdGlvbiBzdHJpcFByZWZpeChuYW1lKXtcclxuXHRyZXR1cm4gbmFtZS5zcGxpdCgnOicpLnBvcCgpXHJcbn1cclxuLyoqXHJcbiAqICBkb2N1bWVudCBwYXJzZXJcclxuICpcclxuICogIEBleGFtcGxlXHJcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXHJcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKFt2aXNpdG9yc10pKVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcclxuXHRcdHRoaXMucGFydHM9cGFydHNcclxuXHRcdHRoaXMucmF3PXJhd1xyXG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xyXG5cdH1cclxuXHJcblx0Z2V0UGFydChuYW1lKXtcclxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXHJcblx0fVxyXG5cclxuXHRnZXRCdWZmZXJQYXJ0KG5hbWUpe1xyXG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxyXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcclxuXHRcdHZhciBidWZmZXI9cGFydC5hc05vZGVCdWZmZXIoKVxyXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcclxuXHRcdHJldHVybiBidWZmZXJcclxuXHR9XHJcblxyXG5cdGdldE9iamVjdFBhcnQobmFtZSwgb3B0aW9uKXtcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XHJcblx0XHRcdGlmKHRoaXMucGFydHNbbmFtZV0pXHJcblx0XHRcdFx0eG1sMmpzKHRoaXMucGFydHNbbmFtZV0uYXNUZXh0KCksXHJcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKHt0YWdOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdLGF0dHJOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdfSxvcHRpb258fHt9KSxcclxuXHRcdFx0XHRcdChlcnJvciwgcmVzdWx0KT0+e1xyXG5cdFx0XHRcdFx0XHRpZihlcnJvcikge1xyXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcilcclxuXHRcdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdFx0cmVzb2x2ZShnZXRhYmxlKHJlc3VsdCkpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pXHJcblx0XHRcdGVsc2VcclxuXHRcdFx0XHRyZXNvbHZlKClcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRwYXJzZSgpe1xyXG5cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcclxuXHJcblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXHJcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XHJcblx0ICovXHJcblxyXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XHJcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcclxuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xyXG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBwcm9wcz17fSl7XHJcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cclxuXHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxyXG5cdFx0XHRcdHJlc29sdmUobmV3IERvY3VtZW50U2VsZihwYXJ0cyxyYXcscHJvcHMpKVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcclxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XHJcblx0XHRcdFx0XHRpZihlcnJvcilcclxuXHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcclxuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XHJcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xyXG5cdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcclxuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xyXG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XHJcblx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcclxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcclxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xyXG5cdFx0XHR9ZWxzZSB7XHJcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=