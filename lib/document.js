'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var _xml2js = require('xml2js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
		key: 'getPart',
		value: function getPart(name) {
			return this.parts[name];
		}
	}, {
		key: 'getImagePart',
		value: function getImagePart(name) {
			var part = this.parts[name];
			var crc32 = part._data.crc32;
			var buffer = part.asNodeBuffer();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}
	}, {
		key: 'getObjectPart',
		value: function getObjectPart(name) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (_this.parts[name]) (0, _xml2js.parseString)(_this.parts[name].asText(), { mergeAttrs: true, explicitArray: false }, function (error, result) {
					return resolve(result);
				});else resolve({});
			});
		}
	}, {
		key: 'parse',
		value: function parse() {}

		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}], [{
		key: 'load',
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
//# sourceMappingURL=data:application/json;base64,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O0FBQ0wsV0FBTSxTQUFOLEVBREs7S0FWQTtJQWZZLENBQW5CLENBRnFCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuaW1wb3J0IHtwYXJzZVN0cmluZyBhcyB4bWwyanN9IGZyb20gXCJ4bWwyanNcIlxuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZShbdmlzaXRvcnNdKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXHRcblx0Z2V0UGFydChuYW1lKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJ0c1tuYW1lXVxuXHR9XG5cdFxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblx0XG5cdGdldE9iamVjdFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9Pntcblx0XHRcdGlmKHRoaXMucGFydHNbbmFtZV0pXG5cdFx0XHRcdHhtbDJqcyh0aGlzLnBhcnRzW25hbWVdLmFzVGV4dCgpLFxuXHRcdFx0XHRcdHttZXJnZUF0dHJzOnRydWUsIGV4cGxpY2l0QXJyYXk6ZmFsc2V9LCBcblx0XHRcdFx0XHQoZXJyb3IsIHJlc3VsdCk9PnJlc29sdmUocmVzdWx0KSlcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmVzb2x2ZSh7fSlcblx0XHR9KVxuXHR9XG5cdFxuXHRwYXJzZSgpe1xuXHRcdFxuXHR9XG5cdFxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcigocGF0aCxmaWxlKT0+cGFydHNbcGF0aF09ZmlsZSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHR9XG5cblx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9ZWxzZSBpZihpbnB1dEZpbGUgaW5zdGFuY2VvZiBCbG9iKXtcblx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdHBhcnNlKGUudGFyZ2V0LnJlc3VsdCwge1xuXHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0c2l6ZTppbnB1dEZpbGUuc2l6ZVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0fVxuXHRcdFx0XHRyZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoaW5wdXRGaWxlKTtcblx0XHRcdH1lbHNlIHtcblx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cbn1cbiJdfQ==