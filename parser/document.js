/**
 *  a type of document parser
 *  @class Document
 *  @requires module:JSZip
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

var Document = (function () {
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
			var buffer = part[_jszip2['default'].support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}
	}, {
		key: 'parse',
		value: function parse() {}
	}, {
		key: 'release',
		value: function release() {}
	}, {
		key: 'factory',
		value: function factory() {
			return this.constructor.factory.apply(this, arguments);
		}
	}], [{
		key: 'load',
		value: function load(inputFile) {
			var DocumentSelf = this;
			return new Promise(function (resolve, reject) {
				function parse(data, name) {
					var raw = new _jszip2['default'](data),
					    parts = {};
					raw.filter(function (path, file) {
						parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, {
						name: name,
						lastModified: inputFile.lastModified,
						size: inputFile.size
					}));
				}
				if (typeof FileReader != 'undefined') {
					//browser
					var reader = new FileReader();
					reader.onload = function (e) {
						parse(e.target.result, inputFile.name.replace(/\.docx$/i, ''));
					};
					reader.readAsArrayBuffer(inputFile);
				} else {
					//server side
					var a = require;
					a('fs').readFile(inputFile, function (error, data) {
						if (error) reject(error);else if (data) {
							parse(data, inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, ''));
						}
					});
				}
			});
		}
	}, {
		key: 'factory',
		get: function get() {
			return null;
		}
	}]);

	return Document;
})();

exports['default'] = Document;
module.exports = exports['default'];
//# sourceMappingURL=document.js.map