'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tool = require('./tool');

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
			var _this = this;

			if (!this._factory) {
				(function () {
					var a = new _this.constructor.Factory();
					_this._factory = function () {
						return a.create.apply(a, arguments);
					};
				})();
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

				if (_tool.isNode) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6WyJEb2N1bWVudCIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJuYW1lIiwicGFydCIsImNyYzMyIiwiX2RhdGEiLCJidWZmZXIiLCJzdXBwb3J0Iiwibm9kZWJ1ZmZlciIsInZpc2l0b3JGYWN0b3JpZXMiLCJ3b3JkWG1sIiwiZG9jUGFyc2VyIiwicGFyZW50UGFyc2VyIiwiX2ZhY3RvcnkiLCJhIiwiY29uc3RydWN0b3IiLCJGYWN0b3J5IiwiY3JlYXRlIiwiYXJndW1lbnRzIiwiZG9jIiwiaW5wdXRGaWxlIiwiRG9jdW1lbnRTZWxmIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJwYXJzZSIsImRhdGEiLCJmaWx0ZXIiLCJwYXRoIiwiZmlsZSIsInJlcXVpcmUiLCJyZWFkRmlsZSIsImVycm9yIiwic3BsaXQiLCJwb3AiLCJyZXBsYWNlIiwiQmxvYiIsInJlYWRlciIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJlIiwidGFyZ2V0IiwicmVzdWx0IiwibGFzdE1vZGlmaWVkIiwic2l6ZSIsInJlYWRBc0FycmF5QnVmZmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7OztBQUVBOzs7Ozs7O0lBT3FCQSxRO0FBQ3BCLG1CQUFZQyxLQUFaLEVBQWtCQyxHQUFsQixFQUFzQkMsS0FBdEIsRUFBNEI7QUFBQTs7QUFDM0IsT0FBS0YsS0FBTCxHQUFXQSxLQUFYO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsS0FBTCxHQUFXQSxLQUFYO0FBQ0E7Ozs7MEJBQ09DLEksRUFBSztBQUNaLFVBQU8sS0FBS0gsS0FBTCxDQUFXRyxJQUFYLENBQVA7QUFDQTs7OytCQUVZQSxJLEVBQUs7QUFDakIsT0FBSUMsT0FBSyxLQUFLSixLQUFMLENBQVdHLElBQVgsQ0FBVDtBQUNBLE9BQUlFLFFBQU1ELEtBQUtFLEtBQUwsQ0FBV0QsS0FBckI7QUFDQSxPQUFJRSxTQUFPSCxLQUFLLGdCQUFNSSxPQUFOLENBQWNDLFVBQWQsR0FBMkIsY0FBM0IsR0FBNEMsZUFBakQsR0FBWDtBQUNBRixVQUFPRixLQUFQLEdBQWFELEtBQUtFLEtBQUwsQ0FBV0QsS0FBWCxHQUFpQkEsS0FBOUI7QUFDQSxVQUFPRSxNQUFQO0FBQ0E7O0FBRUQ7Ozs7Ozt3QkFHTUcsZ0IsRUFBaUIsQ0FFdEI7O0FBRUQ7Ozs7Ozs0QkFHUyxDQUVSOztBQUVEOzs7Ozs7MEJBR1FDLE8sRUFBU0MsUyxFQUFXQyxZLEVBQWE7QUFBQTs7QUFDeEMsT0FBRyxDQUFDLEtBQUtDLFFBQVQsRUFBa0I7QUFBQTtBQUNqQixTQUFJQyxJQUFFLElBQUksTUFBS0MsV0FBTCxDQUFpQkMsT0FBckIsRUFBTjtBQUNBLFdBQUtILFFBQUwsR0FBYyxZQUFVO0FBQ3ZCLGFBQU9DLEVBQUVHLE1BQUYsVUFBWUMsU0FBWixDQUFQO0FBQ0EsTUFGRDtBQUZpQjtBQUtqQjtBQUNELFVBQU8sS0FBS0wsUUFBTCxhQUFpQkssU0FBakIsQ0FBUDtBQUNBOzs7d0JBRVlDLEcsRUFBSTtBQUFBLE9BQ1hwQixLQURXLEdBQ01vQixHQUROLENBQ1hwQixLQURXO0FBQUEsT0FDTEMsR0FESyxHQUNNbUIsR0FETixDQUNMbkIsR0FESztBQUFBLE9BQ0RDLEtBREMsR0FDTWtCLEdBRE4sQ0FDRGxCLEtBREM7O0FBRWhCLFVBQU8sSUFBSUgsUUFBSixDQUFhQyxLQUFiLEVBQW1CQyxHQUFuQixFQUF1QkMsS0FBdkIsQ0FBUDtBQUNBO0FBQ0Q7Ozs7Ozs7O3VCQU9ZbUIsUyxFQUFVO0FBQ3JCLE9BQUlDLGVBQWEsSUFBakI7QUFDQSxVQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBbUI7QUFDckMsYUFBU0MsS0FBVCxDQUFlQyxJQUFmLEVBQThCO0FBQUEsU0FBVHpCLEtBQVMsdUVBQUgsRUFBRzs7QUFDN0IsU0FBSUQsTUFBSSxvQkFBVTBCLElBQVYsQ0FBUjtBQUFBLFNBQXdCM0IsUUFBTSxFQUE5QjtBQUNBQyxTQUFJMkIsTUFBSixDQUFXLFVBQVNDLElBQVQsRUFBY0MsSUFBZCxFQUFtQjtBQUM3QjlCLFlBQU02QixJQUFOLElBQVlDLElBQVo7QUFDQSxNQUZEO0FBR0FOLGFBQVEsSUFBSUYsWUFBSixDQUFpQnRCLEtBQWpCLEVBQXVCQyxHQUF2QixFQUEyQkMsS0FBM0IsQ0FBUjtBQUNBOztBQUdELHNCQUFVO0FBQUM7QUFDVixTQUFHLE9BQU9tQixTQUFQLElBQWtCLFFBQXJCLEVBQThCO0FBQUM7QUFDOUJVLGNBQVEsSUFBUixFQUFjQyxRQUFkLENBQXVCWCxTQUF2QixFQUFpQyxVQUFTWSxLQUFULEVBQWdCTixJQUFoQixFQUFxQjtBQUNyRCxXQUFHTSxLQUFILEVBQ0NSLE9BQU9RLEtBQVAsRUFERCxLQUVLLElBQUdOLElBQUgsRUFBUTtBQUNaRCxjQUFNQyxJQUFOLEVBQVksRUFBQ3hCLE1BQUtrQixVQUFVYSxLQUFWLENBQWdCLFFBQWhCLEVBQTBCQyxHQUExQixHQUFnQ0MsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBTixFQUFaO0FBQ0E7QUFDRCxPQU5EO0FBT0EsTUFSRCxNQVFNO0FBQ0xWLFlBQU1MLFNBQU47QUFDQTtBQUNELEtBWkQsTUFZSztBQUFDO0FBQ0wsU0FBR0EscUJBQXFCZ0IsSUFBeEIsRUFBNkI7QUFDNUIsVUFBSUMsU0FBTyxJQUFJQyxVQUFKLEVBQVg7QUFDQUQsYUFBT0UsTUFBUCxHQUFjLFVBQVNDLENBQVQsRUFBVztBQUN4QmYsYUFBTWUsRUFBRUMsTUFBRixDQUFTQyxNQUFmLEVBQXVCO0FBQ3JCeEMsY0FBS2tCLFVBQVVsQixJQUFWLENBQWVpQyxPQUFmLENBQXVCLFVBQXZCLEVBQWtDLEVBQWxDLENBRGdCO0FBRXJCUSxzQkFBYXZCLFVBQVV1QixZQUZGO0FBR3JCQyxjQUFLeEIsVUFBVXdCO0FBSE0sUUFBdkI7QUFLQSxPQU5EO0FBT0FQLGFBQU9RLGlCQUFQLENBQXlCekIsU0FBekI7QUFDQSxNQVZELE1BVU07QUFDTEssWUFBTUwsU0FBTjtBQUNBO0FBQ0Q7QUFFRCxJQXRDTSxDQUFQO0FBdUNBOzs7Ozs7QUFqR21CdEIsUSxDQW1HYmtCLE87Ozs7Ozs7eUJBQ0NOLE8sRUFBU0MsUyxFQUFXQyxZLEVBQWEsQ0FFdkM7Ozs7OztrQkF0R2tCZCxRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtpc05vZGV9IGZyb20gXCIuL3Rvb2xcIlxuaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJ1xuXG4vKipcbiAqICBkb2N1bWVudCBwYXJzZXJcbiAqXG4gKiAgQGV4YW1wbGVcbiAqICBEb2N1bWVudC5sb2FkKGZpbGUpXG4gKiAgXHQudGhlbihkb2M9PmRvYy5wYXJzZShbdmlzaXRvcnNdKSlcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnR7XG5cdGNvbnN0cnVjdG9yKHBhcnRzLHJhdyxwcm9wcyl7XG5cdFx0dGhpcy5wYXJ0cz1wYXJ0c1xuXHRcdHRoaXMucmF3PXJhd1xuXHRcdHRoaXMucHJvcHM9cHJvcHNcblx0fVxuXHRnZXRQYXJ0KG5hbWUpe1xuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdXG5cdH1cblx0XG5cdGdldEltYWdlUGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdXG5cdFx0dmFyIGNyYzMyPXBhcnQuX2RhdGEuY3JjMzJcblx0XHR2YXIgYnVmZmVyPXBhcnRbSlNaaXAuc3VwcG9ydC5ub2RlYnVmZmVyID8gJ2FzTm9kZUJ1ZmZlcicgOiAnYXNBcnJheUJ1ZmZlciddKClcblx0XHRidWZmZXIuY3JjMzI9cGFydC5fZGF0YS5jcmMzMj1jcmMzMlxuXHRcdHJldHVybiBidWZmZXJcblx0fVxuXG5cdC8qKlxuXHQgKiAgcGFyc2UgZG9jeCB3aXRoIHZpc2l0b3JzIGNyZWF0ZWQgZnJvbSB2aXNpdG9yIGZhY3RvcmllcyBvbmUgYnkgb25lXG5cdCAqL1xuXHRwYXJzZSh2aXNpdG9yRmFjdG9yaWVzKXtcblxuXHR9XG5cblx0LyoqXG5cdCAqIHJlbGVhc2UgcmVzb3VyY2VzIGFmdGVyIHBhcnNlXG5cdCAqL1xuXHRyZWxlYXNlKCl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiAgY3JlYXRlIHBhcnNlciBmb3IgYSB3b3JkIG1vZGVsXG5cdCAqL1xuXHRmYWN0b3J5KHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblx0XHRpZighdGhpcy5fZmFjdG9yeSl7XG5cdFx0XHRsZXQgYT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5GYWN0b3J5XG5cdFx0XHR0aGlzLl9mYWN0b3J5PWZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiBhLmNyZWF0ZSguLi5hcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9mYWN0b3J5KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBjbG9uZShkb2Mpe1xuXHRcdGxldCB7cGFydHMscmF3LHByb3BzfT1kb2Ncblx0XHRyZXR1cm4gbmV3IERvY3VtZW50KHBhcnRzLHJhdyxwcm9wcylcblx0fVxuXHQvKipcblx0ICogIGEgaGVscGVyIHRvIGxvYWQgZG9jdW1lbnQgZmlsZVxuXG5cdCAqICBAcGFyYW0gaW5wdXRGaWxlIHtGaWxlfSAtIGEgaHRtbCBpbnB1dCBmaWxlLCBvciBub2RlanMgZmlsZVxuXHQgKiAgQHJldHVybiB7UHJvbWlzZX1cblx0ICovXG5cblx0c3RhdGljIGxvYWQoaW5wdXRGaWxlKXtcblx0XHR2YXIgRG9jdW1lbnRTZWxmPXRoaXNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGZ1bmN0aW9uIHBhcnNlKGRhdGEsIHByb3BzPXt9KXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcihmdW5jdGlvbihwYXRoLGZpbGUpe1xuXHRcdFx0XHRcdHBhcnRzW3BhdGhdPWZpbGVcblx0XHRcdFx0fSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyxwcm9wcykpXG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoaXNOb2RlKXsvL25vZGVcblx0XHRcdFx0aWYodHlwZW9mIGlucHV0RmlsZT09J3N0cmluZycpey8vZmlsZSBuYW1lXG5cdFx0XHRcdFx0cmVxdWlyZSgnZnMnKS5yZWFkRmlsZShpbnB1dEZpbGUsZnVuY3Rpb24oZXJyb3IsIGRhdGEpe1xuXHRcdFx0XHRcdFx0aWYoZXJyb3IpXG5cdFx0XHRcdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHRcdFx0XHRlbHNlIGlmKGRhdGEpe1xuXHRcdFx0XHRcdFx0XHRwYXJzZShkYXRhLCB7bmFtZTppbnB1dEZpbGUuc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpfSlcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KVxuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9ZWxzZXsvL2Jyb3dzZXJcblx0XHRcdFx0aWYoaW5wdXRGaWxlIGluc3RhbmNlb2YgQmxvYil7XG5cdFx0XHRcdFx0dmFyIHJlYWRlcj1uZXcgRmlsZVJlYWRlcigpO1xuXHRcdFx0XHRcdHJlYWRlci5vbmxvYWQ9ZnVuY3Rpb24oZSl7XG5cdFx0XHRcdFx0XHRwYXJzZShlLnRhcmdldC5yZXN1bHQsIHtcblx0XHRcdFx0XHRcdFx0XHRuYW1lOmlucHV0RmlsZS5uYW1lLnJlcGxhY2UoL1xcLmRvY3gkL2ksJycpLFxuXHRcdFx0XHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGlucHV0RmlsZSk7XG5cdFx0XHRcdH1lbHNlIHtcblx0XHRcdFx0XHRwYXJzZShpbnB1dEZpbGUpXG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdH0pXG5cdH1cblxuXHRzdGF0aWMgRmFjdG9yeT1jbGFzcyB7XG5cdFx0Y3JlYXRlKHdvcmRYbWwsIGRvY1BhcnNlciwgcGFyZW50UGFyc2VyKXtcblxuXHRcdH1cblx0fVxufVxuIl19