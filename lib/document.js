"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require("jszip");

var _jszip2 = _interopRequireDefault(_jszip);

var _xml2js = require("xml2js");

var _xmlObject = require("./xmlObject");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
		_classCallCheck(this, _class);

		this.parts = parts;
		this.raw = raw;
		this.props = props;
	}

	_createClass(_class, [{
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

			return new Promise(function (resolve, reject) {
				if (_this.parts[name]) (0, _xml2js.parseString)(_this.parts[name].asText(), Object.assign({ tagNameProcessors: [stripPrefix], attrNameProcessors: [stripPrefix] }, option || {}), function (error, result) {
					error && console.log("parsing " + name + " with error: " + error.message);

					resolve((0, _xmlObject.getable)(result));
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
			return new Promise(function (resolve, reject) {
				function parse(data) {
					var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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
//# sourceMappingURL=data:application/json;base64,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bEMsWUFBTyxNQUFQLEdBQWMsVUFBUyxDQUFULEVBQVc7QUFDeEIsWUFBTSxFQUFFLE1BQUYsQ0FBUyxNQUFULEVBQWlCO0FBQ3JCLGFBQUssVUFBVSxJQUFWLENBQWUsT0FBZixDQUF1QixVQUF2QixFQUFrQyxFQUFsQyxDQUFMO0FBQ0EscUJBQWEsVUFBVSxZQUFWO0FBQ2IsYUFBSyxVQUFVLElBQVY7T0FIUCxFQUR3QjtNQUFYLENBRm9CO0FBU2xDLFlBQU8saUJBQVAsQ0FBeUIsU0FBekIsRUFUa0M7S0FBN0IsTUFVQTtBQUNMLFdBQU0sU0FBTixFQURLO0tBVkE7SUFmWSxDQUFuQixDQUZxQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcbmltcG9ydCB7cGFyc2VTdHJpbmcgYXMgeG1sMmpzfSBmcm9tIFwieG1sMmpzXCJcblxuaW1wb3J0IHtnZXRhYmxlfSBmcm9tIFwiLi94bWxPYmplY3RcIlxuXG5mdW5jdGlvbiBzdHJpcFByZWZpeChuYW1lKXtcblx0cmV0dXJuIG5hbWUuc3BsaXQoJzonKS5wb3AoKVxufVxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoW3Zpc2l0b3JzXSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXRCdWZmZXJQYXJ0KG5hbWUpe1xuXHRcdHZhciBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHZhciBidWZmZXI9cGFydC5hc05vZGVCdWZmZXIoKVxuXHRcdGJ1ZmZlci5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyXG5cdFx0cmV0dXJuIGJ1ZmZlclxuXHR9XG5cblx0Z2V0T2JqZWN0UGFydChuYW1lLCBvcHRpb24pe1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpPT57XG5cdFx0XHRpZih0aGlzLnBhcnRzW25hbWVdKVxuXHRcdFx0XHR4bWwyanModGhpcy5wYXJ0c1tuYW1lXS5hc1RleHQoKSxcblx0XHRcdFx0XHRPYmplY3QuYXNzaWduKHt0YWdOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdLGF0dHJOYW1lUHJvY2Vzc29yczpbc3RyaXBQcmVmaXhdfSxvcHRpb258fHt9KSxcblx0XHRcdFx0XHQoZXJyb3IsIHJlc3VsdCk9Pntcblx0XHRcdFx0XHRcdGVycm9yICYmIGNvbnNvbGUubG9nKGBwYXJzaW5nICR7bmFtZX0gd2l0aCBlcnJvcjogJHtlcnJvci5tZXNzYWdlfWApXG5cblx0XHRcdFx0XHRcdHJlc29sdmUoZ2V0YWJsZShyZXN1bHQpKVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJlc29sdmUoKVxuXHRcdH0pXG5cdH1cblxuXHRwYXJzZSgpe1xuXG5cdH1cblxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbn1cbiJdfQ==