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
		value: function getObjectPart(name, option) {
			var _this = this;

			return new Promise(function (resolve, reject) {
				if (_this.parts[name]) (0, _xml2js.parseString)(_this.parts[name].asText(), Object.assign({ mergeAttrs: true, explicitArray: false }, option || {}), function (error, result) {
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
//# sourceMappingURL=data:application/json;base64,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U2xDLFlBQU8saUJBQVAsQ0FBeUIsU0FBekIsRUFUa0M7S0FBN0IsTUFVQTtBQUNMLFdBQU0sU0FBTixFQURLO0tBVkE7SUFmWSxDQUFuQixDQUZxQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBKU1ppcCBmcm9tICdqc3ppcCdcbmltcG9ydCB7cGFyc2VTdHJpbmcgYXMgeG1sMmpzfSBmcm9tIFwieG1sMmpzXCJcblxuLyoqXG4gKiAgZG9jdW1lbnQgcGFyc2VyXG4gKlxuICogIEBleGFtcGxlXG4gKiAgRG9jdW1lbnQubG9hZChmaWxlKVxuICogIFx0LnRoZW4oZG9jPT5kb2MucGFyc2UoW3Zpc2l0b3JzXSkpXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihwYXJ0cyxyYXcscHJvcHMpe1xuXHRcdHRoaXMucGFydHM9cGFydHNcblx0XHR0aGlzLnJhdz1yYXdcblx0XHR0aGlzLnByb3BzPXByb3BzXG5cdH1cblxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0LmFzTm9kZUJ1ZmZlcigpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblxuXHRnZXRPYmplY3RQYXJ0KG5hbWUsIG9wdGlvbil7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9Pntcblx0XHRcdGlmKHRoaXMucGFydHNbbmFtZV0pXG5cdFx0XHRcdHhtbDJqcyh0aGlzLnBhcnRzW25hbWVdLmFzVGV4dCgpLFxuXHRcdFx0XHRcdE9iamVjdC5hc3NpZ24oe21lcmdlQXR0cnM6dHJ1ZSwgZXhwbGljaXRBcnJheTpmYWxzZX0sb3B0aW9ufHx7fSksXG5cdFx0XHRcdFx0KGVycm9yLCByZXN1bHQpPT5yZXNvbHZlKHJlc3VsdCkpXG5cdFx0XHRlbHNlXG5cdFx0XHRcdHJlc29sdmUoe30pXG5cdFx0fSlcblx0fVxuXG5cdHBhcnNlKCl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRyYXcuZmlsdGVyKChwYXRoLGZpbGUpPT5wYXJ0c1twYXRoXT1maWxlKVxuXHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHByb3BzKSlcblx0XHRcdH1cblxuXHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcblx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcblx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIHtuYW1lOmlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyl9KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1lbHNlIGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xuXHRcdFx0XHR2YXIgcmVhZGVyPW5ldyBGaWxlUmVhZGVyKCk7XG5cdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XG5cdFx0XHRcdFx0XHRcdG5hbWU6aW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJyksXG5cdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxufVxuIl19