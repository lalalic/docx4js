'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('./tool');

var _jszip = require('jszip');

var _jszip2 = _interopRequireDefault(_jszip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  document parser
 *
 *  @example
 *  Document.load(file)
 *  	.then(doc=>doc.parse([visitors]))
 */
var Document = function () {
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
			var buffer = part[_jszip2.default.support.nodebuffer ? 'asNodeBuffer' : 'asArrayBuffer']();
			buffer.crc32 = part._data.crc32 = crc32;
			return buffer;
		}

		/**
   *  parse docx with visitors created from visitor factories one by one
   */

	}, {
		key: 'parse',
		value: function parse(visitorFactories) {}

		/**
   * release resources after parse
   */

	}, {
		key: 'release',
		value: function release() {}

		/**
   *  create parser for a word model
   */

	}, {
		key: 'factory',
		value: function factory(wordXml, docParser, parentParser) {
			if (!this._factory) {
				var a = new this.constructor.Factory();
				this._factory = function () {
					return a.create.apply(a, arguments);
				};
			}
			return this._factory.apply(this, arguments);
		}
	}], [{
		key: 'clone',
		value: function clone(doc) {
			var parts = doc.parts,
			    raw = doc.raw,
			    props = doc.props;

			return new Document(parts, raw, props);
		}
		/**
   *  a helper to load document file
  	 *  @param inputFile {File} - a html input file, or nodejs file
   *  @return {Promise}
   */

	}, {
		key: 'load',
		value: function load(inputFile) {
			var DocumentSelf = this;
			return new Promise(function (resolve, reject) {
				function parse(data) {
					var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

					var raw = new _jszip2.default(data),
					    parts = {};
					raw.filter(function (path, file) {
						parts[path] = file;
					});
					resolve(new DocumentSelf(parts, raw, props));
				}

				if ($.isNode) {
					//node
					if (typeof inputFile == 'string') {
						//file name
						require('fs').readFile(inputFile, function (error, data) {
							if (error) reject(error);else if (data) {
								parse(data, { name: inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, '') });
							}
						});
					} else {
						parse(inputFile);
					}
				} else {
					//browser
					if (inputFile instanceof Blob) {
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
				}
			});
		}
	}]);

	return Document;
}();

Document.Factory = function () {
	function _class() {
		_classCallCheck(this, _class);
	}

	_createClass(_class, [{
		key: 'create',
		value: function create(wordXml, docParser, parentParser) {}
	}]);

	return _class;
}();

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJidWZmZXIiLCJKU1ppcCIsInN1cHBvcnQiLCJub2RlYnVmZmVyIiwidmlzaXRvckZhY3RvcmllcyIsIndvcmRYbWwiLCJkb2NQYXJzZXIiLCJwYXJlbnRQYXJzZXIiLCJfZmFjdG9yeSIsImEiLCJjb25zdHJ1Y3RvciIsIkZhY3RvcnkiLCJjcmVhdGUiLCJhcmd1bWVudHMiLCJkb2MiLCJpbnB1dEZpbGUiLCJEb2N1bWVudFNlbGYiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInBhcnNlIiwiZGF0YSIsImZpbHRlciIsInBhdGgiLCJmaWxlIiwiJCIsImlzTm9kZSIsInJlcXVpcmUiLCJyZWFkRmlsZSIsImVycm9yIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxRO0FBQ3BCLG1CQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0E7Ozs7MEJBQ09DLEksRUFBSztBQUNaLFVBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFYLENBQVA7QUFDQTs7OytCQUNZQSxJLEVBQUs7QUFDakIsT0FBSUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxTQUFPSCxLQUFLSSxnQkFBTUMsT0FBTixDQUFjQyxVQUFkLEdBQTJCLGNBQTNCLEdBQTRDLGVBQWpELEdBQVg7QUFDQUgsVUFBT0YsS0FBUCxHQUFhRCxLQUFLRSxLQUFMLENBQVdELEtBQVgsR0FBaUJBLEtBQTlCO0FBQ0EsVUFBT0UsTUFBUDtBQUNBOztBQUVEOzs7Ozs7d0JBR01JLGdCLEVBQWlCLENBRXRCOztBQUVEOzs7Ozs7NEJBR1MsQ0FFUjs7QUFFRDs7Ozs7OzBCQUdRQyxPLEVBQVNDLFMsRUFBV0MsWSxFQUFhO0FBQ3hDLE9BQUcsQ0FBQyxLQUFLQyxRQUFULEVBQWtCO0FBQ2pCLFFBQUlDLElBQUUsSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxPQUFyQixFQUFOO0FBQ0EsU0FBS0gsUUFBTCxHQUFjLFlBQVU7QUFDdkIsWUFBT0MsRUFBRUcsTUFBRixVQUFZQyxTQUFaLENBQVA7QUFDQSxLQUZEO0FBR0E7QUFDRCxVQUFPLEtBQUtMLFFBQUwsYUFBaUJLLFNBQWpCLENBQVA7QUFDQTs7O3dCQUVZQyxHLEVBQUk7QUFBQSxPQUNYckIsS0FEVyxHQUNNcUIsR0FETixDQUNYckIsS0FEVztBQUFBLE9BQ0xDLEdBREssR0FDTW9CLEdBRE4sQ0FDTHBCLEdBREs7QUFBQSxPQUNEQyxLQURDLEdBQ01tQixHQUROLENBQ0RuQixLQURDOztBQUVoQixVQUFPLElBQUlILFFBQUosQ0FBYUMsS0FBYixFQUFtQkMsR0FBbkIsRUFBdUJDLEtBQXZCLENBQVA7QUFDQTtBQUNEOzs7Ozs7Ozt1QkFPWW9CLFMsRUFBVTtBQUNyQixPQUFJQyxlQUFhLElBQWpCO0FBQ0EsVUFBTyxJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQW1CO0FBQ3JDLGFBQVNDLEtBQVQsQ0FBZUMsSUFBZixFQUE4QjtBQUFBLFNBQVQxQixLQUFTLHVFQUFILEVBQUc7O0FBQzdCLFNBQUlELE1BQUksSUFBSU8sZUFBSixDQUFVb0IsSUFBVixDQUFSO0FBQUEsU0FBd0I1QixRQUFNLEVBQTlCO0FBQ0FDLFNBQUk0QixNQUFKLENBQVcsVUFBU0MsSUFBVCxFQUFjQyxJQUFkLEVBQW1CO0FBQzdCL0IsWUFBTThCLElBQU4sSUFBWUMsSUFBWjtBQUNBLE1BRkQ7QUFHQU4sYUFBUSxJQUFJRixZQUFKLENBQWlCdkIsS0FBakIsRUFBdUJDLEdBQXZCLEVBQTJCQyxLQUEzQixDQUFSO0FBQ0E7O0FBR0QsUUFBRzhCLEVBQUVDLE1BQUwsRUFBWTtBQUFDO0FBQ1osU0FBRyxPQUFPWCxTQUFQLElBQWtCLFFBQXJCLEVBQThCO0FBQUM7QUFDOUJZLGNBQVEsSUFBUixFQUFjQyxRQUFkLENBQXVCYixTQUF2QixFQUFpQyxVQUFTYyxLQUFULEVBQWdCUixJQUFoQixFQUFxQjtBQUNyRCxXQUFHUSxLQUFILEVBQ0NWLE9BQU9VLEtBQVAsRUFERCxLQUVLLElBQUdSLElBQUgsRUFBUTtBQUNaRCxjQUFNQyxJQUFOLEVBQVksRUFBQ3pCLE1BQUttQixVQUFVZSxLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQ0MsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBTixFQUFaO0FBQ0E7QUFDRCxPQU5EO0FBT0EsTUFSRCxNQVFNO0FBQ0xaLFlBQU1MLFNBQU47QUFDQTtBQUNELEtBWkQsTUFZSztBQUFDO0FBQ0wsU0FBR0EscUJBQXFCa0IsSUFBeEIsRUFBNkI7QUFDNUIsVUFBSUMsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsYUFBT0UsTUFBUCxHQUFjLFVBQVNDLENBQVQsRUFBVztBQUN4QmpCLGFBQU1pQixFQUFFQyxNQUFGLENBQVNDLE1BQWYsRUFBdUI7QUFDckIzQyxjQUFLbUIsVUFBVW5CLElBQVYsQ0FBZW9DLE9BQWYsQ0FBdUIsVUFBdkIsRUFBa0MsRUFBbEMsQ0FEZ0I7QUFFckJRLHNCQUFhekIsVUFBVXlCLFlBRkY7QUFHckJDLGNBQUsxQixVQUFVMEI7QUFITSxRQUF2QjtBQUtBLE9BTkQ7QUFPQVAsYUFBT1EsaUJBQVAsQ0FBeUIzQixTQUF6QjtBQUNBLE1BVkQsTUFVTTtBQUNMSyxZQUFNTCxTQUFOO0FBQ0E7QUFDRDtBQUVELElBdENNLENBQVA7QUF1Q0E7Ozs7OztBQWhHbUJ2QixRLENBa0dibUIsTzs7Ozs7Ozt5QkFDQ04sTyxFQUFTQyxTLEVBQVdDLFksRUFBYSxDQUV2Qzs7Ozs7O2tCQXJHa0JmLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgXCIuL3Rvb2xcIlxuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZShbdmlzaXRvcnNdKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnR7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblx0Z2V0SW1hZ2VQYXJ0KG5hbWUpe1xuXHRcdHZhciBwYXJ0PXRoaXMucGFydHNbbmFtZV1cblx0XHR2YXIgY3JjMzI9cGFydC5fZGF0YS5jcmMzMlxuXHRcdHZhciBidWZmZXI9cGFydFtKU1ppcC5zdXBwb3J0Lm5vZGVidWZmZXIgPyAnYXNOb2RlQnVmZmVyJyA6ICdhc0FycmF5QnVmZmVyJ10oKVxuXHRcdGJ1ZmZlci5jcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyPWNyYzMyXG5cdFx0cmV0dXJuIGJ1ZmZlclxuXHR9XG5cblx0LyoqXG5cdCAqICBwYXJzZSBkb2N4IHdpdGggdmlzaXRvcnMgY3JlYXRlZCBmcm9tIHZpc2l0b3IgZmFjdG9yaWVzIG9uZSBieSBvbmVcblx0ICovXG5cdHBhcnNlKHZpc2l0b3JGYWN0b3JpZXMpe1xuXG5cdH1cblxuXHQvKipcblx0ICogcmVsZWFzZSByZXNvdXJjZXMgYWZ0ZXIgcGFyc2Vcblx0ICovXG5cdHJlbGVhc2UoKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqICBjcmVhdGUgcGFyc2VyIGZvciBhIHdvcmQgbW9kZWxcblx0ICovXG5cdGZhY3Rvcnkod29yZFhtbCwgZG9jUGFyc2VyLCBwYXJlbnRQYXJzZXIpe1xuXHRcdGlmKCF0aGlzLl9mYWN0b3J5KXtcblx0XHRcdGxldCBhPW5ldyB0aGlzLmNvbnN0cnVjdG9yLkZhY3Rvcnlcblx0XHRcdHRoaXMuX2ZhY3Rvcnk9ZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuIGEuY3JlYXRlKC4uLmFyZ3VtZW50cylcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRoaXMuX2ZhY3RvcnkoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0c3RhdGljIGNsb25lKGRvYyl7XG5cdFx0bGV0IHtwYXJ0cyxyYXcscHJvcHN9PWRvY1xuXHRcdHJldHVybiBuZXcgRG9jdW1lbnQocGFydHMscmF3LHByb3BzKVxuXHR9XG5cdC8qKlxuXHQgKiAgYSBoZWxwZXIgdG8gbG9hZCBkb2N1bWVudCBmaWxlXG5cblx0ICogIEBwYXJhbSBpbnB1dEZpbGUge0ZpbGV9IC0gYSBodG1sIGlucHV0IGZpbGUsIG9yIG5vZGVqcyBmaWxlXG5cdCAqICBAcmV0dXJuIHtQcm9taXNlfVxuXHQgKi9cblxuXHRzdGF0aWMgbG9hZChpbnB1dEZpbGUpe1xuXHRcdHZhciBEb2N1bWVudFNlbGY9dGhpc1xuXHRcdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuXHRcdFx0ZnVuY3Rpb24gcGFyc2UoZGF0YSwgcHJvcHM9e30pe1xuXHRcdFx0XHR2YXIgcmF3PW5ldyBKU1ppcChkYXRhKSxwYXJ0cz17fVxuXHRcdFx0XHRyYXcuZmlsdGVyKGZ1bmN0aW9uKHBhdGgsZmlsZSl7XG5cdFx0XHRcdFx0cGFydHNbcGF0aF09ZmlsZVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRyZXNvbHZlKG5ldyBEb2N1bWVudFNlbGYocGFydHMscmF3LHByb3BzKSlcblx0XHRcdH1cblxuXG5cdFx0XHRpZigkLmlzTm9kZSl7Ly9ub2RlXG5cdFx0XHRcdGlmKHR5cGVvZiBpbnB1dEZpbGU9PSdzdHJpbmcnKXsvL2ZpbGUgbmFtZVxuXHRcdFx0XHRcdHJlcXVpcmUoJ2ZzJykucmVhZEZpbGUoaW5wdXRGaWxlLGZ1bmN0aW9uKGVycm9yLCBkYXRhKXtcblx0XHRcdFx0XHRcdGlmKGVycm9yKVxuXHRcdFx0XHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0XHRcdFx0ZWxzZSBpZihkYXRhKXtcblx0XHRcdFx0XHRcdFx0cGFyc2UoZGF0YSwge25hbWU6aW5wdXRGaWxlLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKX0pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7Ly9icm93c2VyXG5cdFx0XHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xuXHRcdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe1xuXHRcdFx0XHRcdFx0cGFyc2UoZS50YXJnZXQucmVzdWx0LCB7XG5cdFx0XHRcdFx0XHRcdFx0bmFtZTppbnB1dEZpbGUubmFtZS5yZXBsYWNlKC9cXC5kb2N4JC9pLCcnKSxcblx0XHRcdFx0XHRcdFx0XHRsYXN0TW9kaWZpZWQ6aW5wdXRGaWxlLmxhc3RNb2RpZmllZCxcblx0XHRcdFx0XHRcdFx0XHRzaXplOmlucHV0RmlsZS5zaXplXG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3Mge1xuXHRcdGNyZWF0ZSh3b3JkWG1sLCBkb2NQYXJzZXIsIHBhcmVudFBhcnNlcil7XG5cblx0XHR9XG5cdH1cbn1cbiJdfQ==