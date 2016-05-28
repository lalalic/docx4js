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
			var parts = doc.parts;
			var raw = doc.raw;
			var props = doc.props;

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
				function parse(data, name) {
					var raw = new _jszip2.default(data),
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

				if ($.isNode) {
					//node
					if (typeof inputFile == 'string') {
						//file name
						require('fs').readFile(inputFile, function (error, data) {
							if (error) reject(error);else if (data) {
								parse(data, inputFile.split(/[\/\\]/).pop().replace(/\.docx$/i, ''));
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
							parse(e.target.result, inputFile.name.replace(/\.docx$/i, ''));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb2N1bWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0lBU3FCO0FBQ3BCLFVBRG9CLFFBQ3BCLENBQVksS0FBWixFQUFrQixHQUFsQixFQUFzQixLQUF0QixFQUE0Qjt3QkFEUixVQUNROztBQUMzQixPQUFLLEtBQUwsR0FBVyxLQUFYLENBRDJCO0FBRTNCLE9BQUssR0FBTCxHQUFTLEdBQVQsQ0FGMkI7QUFHM0IsT0FBSyxLQUFMLEdBQVcsS0FBWCxDQUgyQjtFQUE1Qjs7Y0FEb0I7OzBCQU1aLE1BQUs7QUFDWixVQUFPLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBUCxDQURZOzs7OytCQUdBLE1BQUs7QUFDakIsT0FBSSxPQUFLLEtBQUssS0FBTCxDQUFXLElBQVgsQ0FBTCxDQURhO0FBRWpCLE9BQUksUUFBTSxLQUFLLEtBQUwsQ0FBVyxLQUFYLENBRk87QUFHakIsT0FBSSxTQUFPLEtBQUssZ0JBQU0sT0FBTixDQUFjLFVBQWQsR0FBMkIsY0FBM0IsR0FBNEMsZUFBNUMsQ0FBTCxFQUFQLENBSGE7QUFJakIsVUFBTyxLQUFQLEdBQWEsS0FBSyxLQUFMLENBQVcsS0FBWCxHQUFpQixLQUFqQixDQUpJO0FBS2pCLFVBQU8sTUFBUCxDQUxpQjs7Ozs7Ozs7O3dCQVdaLGtCQUFpQjs7Ozs7Ozs7NEJBT2Q7Ozs7Ozs7OzBCQU9ELFNBQVMsV0FBVyxjQUFhOzs7QUFDeEMsT0FBRyxDQUFDLEtBQUssUUFBTCxFQUFjOztBQUNqQixTQUFJLElBQUUsSUFBSSxNQUFLLFdBQUwsQ0FBaUIsT0FBakIsRUFBTjtBQUNKLFdBQUssUUFBTCxHQUFjLFlBQVU7QUFDdkIsYUFBTyxFQUFFLE1BQUYsVUFBWSxTQUFaLENBQVAsQ0FEdUI7TUFBVjtTQUZHO0lBQWxCO0FBTUEsVUFBTyxLQUFLLFFBQUwsYUFBaUIsU0FBakIsQ0FBUCxDQVB3Qzs7Ozt3QkFVNUIsS0FBSTtPQUNYLFFBQWlCLElBQWpCLE1BRFc7T0FDTCxNQUFXLElBQVgsSUFESztPQUNELFFBQU8sSUFBUCxNQURDOztBQUVoQixVQUFPLElBQUksUUFBSixDQUFhLEtBQWIsRUFBbUIsR0FBbkIsRUFBdUIsS0FBdkIsQ0FBUCxDQUZnQjs7Ozs7Ozs7Ozt1QkFXTCxXQUFVO0FBQ3JCLE9BQUksZUFBYSxJQUFiLENBRGlCO0FBRXJCLFVBQU8sSUFBSSxPQUFKLENBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFtQjtBQUNyQyxhQUFTLEtBQVQsQ0FBZSxJQUFmLEVBQXFCLElBQXJCLEVBQTBCO0FBQ3pCLFNBQUksTUFBSSxvQkFBVSxJQUFWLENBQUo7U0FBb0IsUUFBTSxFQUFOLENBREM7QUFFekIsU0FBSSxNQUFKLENBQVcsVUFBUyxJQUFULEVBQWMsSUFBZCxFQUFtQjtBQUM3QixZQUFNLElBQU4sSUFBWSxJQUFaLENBRDZCO01BQW5CLENBQVgsQ0FGeUI7QUFLekIsYUFBUSxJQUFJLFlBQUosQ0FBaUIsS0FBakIsRUFBdUIsR0FBdkIsRUFBMkI7QUFDbEMsWUFBSyxJQUFMO0FBQ0Esb0JBQWEsVUFBVSxZQUFWO0FBQ2IsWUFBSyxVQUFVLElBQVY7TUFIRSxDQUFSLEVBTHlCO0tBQTFCOztBQWFBLFFBQUcsRUFBRSxNQUFGLEVBQVM7O0FBQ1gsU0FBRyxPQUFPLFNBQVAsSUFBa0IsUUFBbEIsRUFBMkI7O0FBQzdCLGNBQVEsSUFBUixFQUFjLFFBQWQsQ0FBdUIsU0FBdkIsRUFBaUMsVUFBUyxLQUFULEVBQWdCLElBQWhCLEVBQXFCO0FBQ3JELFdBQUcsS0FBSCxFQUNDLE9BQU8sS0FBUCxFQURELEtBRUssSUFBRyxJQUFILEVBQVE7QUFDWixjQUFNLElBQU4sRUFBWSxVQUFVLEtBQVYsQ0FBZ0IsUUFBaEIsRUFBMEIsR0FBMUIsR0FBZ0MsT0FBaEMsQ0FBd0MsVUFBeEMsRUFBbUQsRUFBbkQsQ0FBWixFQURZO1FBQVI7T0FIMkIsQ0FBakMsQ0FENkI7TUFBOUIsTUFRTTtBQUNMLFlBQU0sU0FBTixFQURLO01BUk47S0FERCxNQVlLOztBQUNKLFNBQUcscUJBQXFCLElBQXJCLEVBQTBCO0FBQzVCLFVBQUksU0FBTyxJQUFJLFVBQUosRUFBUCxDQUR3QjtBQUU1QixhQUFPLE1BQVAsR0FBYyxVQUFTLENBQVQsRUFBVztBQUFDLGFBQU0sRUFBRSxNQUFGLENBQVMsTUFBVCxFQUFpQixVQUFVLElBQVYsQ0FBZSxPQUFmLENBQXVCLFVBQXZCLEVBQWtDLEVBQWxDLENBQXZCLEVBQUQ7T0FBWCxDQUZjO0FBRzVCLGFBQU8saUJBQVAsQ0FBeUIsU0FBekIsRUFINEI7TUFBN0IsTUFJTTtBQUNMLFlBQU0sU0FBTixFQURLO01BSk47S0FiRDtJQWRrQixDQUFuQixDQUZxQjs7OztRQXZERjs7O1NBZ0diOzs7Ozs7O3lCQUNDLFNBQVMsV0FBVyxjQUFhOzs7Ozs7a0JBakdyQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4vdG9vbFwiXG5pbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnXG5cbi8qKlxuICogIGRvY3VtZW50IHBhcnNlclxuICpcbiAqICBAZXhhbXBsZVxuICogIERvY3VtZW50LmxvYWQoZmlsZSlcbiAqICBcdC50aGVuKGRvYz0+ZG9jLnBhcnNlKFt2aXNpdG9yc10pKVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudHtcblx0Y29uc3RydWN0b3IocGFydHMscmF3LHByb3BzKXtcblx0XHR0aGlzLnBhcnRzPXBhcnRzXG5cdFx0dGhpcy5yYXc9cmF3XG5cdFx0dGhpcy5wcm9wcz1wcm9wc1xuXHR9XG5cdGdldFBhcnQobmFtZSl7XG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV1cblx0fVxuXHRnZXRJbWFnZVBhcnQobmFtZSl7XG5cdFx0dmFyIHBhcnQ9dGhpcy5wYXJ0c1tuYW1lXVxuXHRcdHZhciBjcmMzMj1wYXJ0Ll9kYXRhLmNyYzMyXG5cdFx0dmFyIGJ1ZmZlcj1wYXJ0W0pTWmlwLnN1cHBvcnQubm9kZWJ1ZmZlciA/ICdhc05vZGVCdWZmZXInIDogJ2FzQXJyYXlCdWZmZXInXSgpXG5cdFx0YnVmZmVyLmNyYzMyPXBhcnQuX2RhdGEuY3JjMzI9Y3JjMzJcblx0XHRyZXR1cm4gYnVmZmVyXG5cdH1cblxuXHQvKipcblx0ICogIHBhcnNlIGRvY3ggd2l0aCB2aXNpdG9ycyBjcmVhdGVkIGZyb20gdmlzaXRvciBmYWN0b3JpZXMgb25lIGJ5IG9uZVxuXHQgKi9cblx0cGFyc2UodmlzaXRvckZhY3Rvcmllcyl7XG5cblx0fVxuXG5cdC8qKlxuXHQgKiByZWxlYXNlIHJlc291cmNlcyBhZnRlciBwYXJzZVxuXHQgKi9cblx0cmVsZWFzZSgpe1xuXG5cdH1cblxuXHQvKipcblx0ICogIGNyZWF0ZSBwYXJzZXIgZm9yIGEgd29yZCBtb2RlbFxuXHQgKi9cblx0ZmFjdG9yeSh3b3JkWG1sLCBkb2NQYXJzZXIsIHBhcmVudFBhcnNlcil7XG5cdFx0aWYoIXRoaXMuX2ZhY3Rvcnkpe1xuXHRcdFx0bGV0IGE9bmV3IHRoaXMuY29uc3RydWN0b3IuRmFjdG9yeVxuXHRcdFx0dGhpcy5fZmFjdG9yeT1mdW5jdGlvbigpe1xuXHRcdFx0XHRyZXR1cm4gYS5jcmVhdGUoLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fZmFjdG9yeSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRzdGF0aWMgY2xvbmUoZG9jKXtcblx0XHRsZXQge3BhcnRzLHJhdyxwcm9wc309ZG9jXG5cdFx0cmV0dXJuIG5ldyBEb2N1bWVudChwYXJ0cyxyYXcscHJvcHMpXG5cdH1cblx0LyoqXG5cdCAqICBhIGhlbHBlciB0byBsb2FkIGRvY3VtZW50IGZpbGVcblxuXHQgKiAgQHBhcmFtIGlucHV0RmlsZSB7RmlsZX0gLSBhIGh0bWwgaW5wdXQgZmlsZSwgb3Igbm9kZWpzIGZpbGVcblx0ICogIEByZXR1cm4ge1Byb21pc2V9XG5cdCAqL1xuXG5cdHN0YXRpYyBsb2FkKGlucHV0RmlsZSl7XG5cdFx0dmFyIERvY3VtZW50U2VsZj10aGlzXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG5cdFx0XHRmdW5jdGlvbiBwYXJzZShkYXRhLCBuYW1lKXtcblx0XHRcdFx0dmFyIHJhdz1uZXcgSlNaaXAoZGF0YSkscGFydHM9e31cblx0XHRcdFx0cmF3LmZpbHRlcihmdW5jdGlvbihwYXRoLGZpbGUpe1xuXHRcdFx0XHRcdHBhcnRzW3BhdGhdPWZpbGVcblx0XHRcdFx0fSlcblx0XHRcdFx0cmVzb2x2ZShuZXcgRG9jdW1lbnRTZWxmKHBhcnRzLHJhdyx7XG5cdFx0XHRcdFx0bmFtZTpuYW1lLFxuXHRcdFx0XHRcdGxhc3RNb2RpZmllZDppbnB1dEZpbGUubGFzdE1vZGlmaWVkLFxuXHRcdFx0XHRcdHNpemU6aW5wdXRGaWxlLnNpemVcblx0XHRcdFx0fSkpXG5cdFx0XHR9XG5cblxuXHRcdFx0aWYoJC5pc05vZGUpey8vbm9kZVxuXHRcdFx0XHRpZih0eXBlb2YgaW5wdXRGaWxlPT0nc3RyaW5nJyl7Ly9maWxlIG5hbWVcblx0XHRcdFx0XHRyZXF1aXJlKCdmcycpLnJlYWRGaWxlKGlucHV0RmlsZSxmdW5jdGlvbihlcnJvciwgZGF0YSl7XG5cdFx0XHRcdFx0XHRpZihlcnJvcilcblx0XHRcdFx0XHRcdFx0cmVqZWN0KGVycm9yKTtcblx0XHRcdFx0XHRcdGVsc2UgaWYoZGF0YSl7XG5cdFx0XHRcdFx0XHRcdHBhcnNlKGRhdGEsIGlucHV0RmlsZS5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCkucmVwbGFjZSgvXFwuZG9jeCQvaSwnJykpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fWVsc2Uge1xuXHRcdFx0XHRcdHBhcnNlKGlucHV0RmlsZSlcblx0XHRcdFx0fVxuXHRcdFx0fWVsc2V7Ly9icm93c2VyXG5cdFx0XHRcdGlmKGlucHV0RmlsZSBpbnN0YW5jZW9mIEJsb2Ipe1xuXHRcdFx0XHRcdHZhciByZWFkZXI9bmV3IEZpbGVSZWFkZXIoKTtcblx0XHRcdFx0XHRyZWFkZXIub25sb2FkPWZ1bmN0aW9uKGUpe3BhcnNlKGUudGFyZ2V0LnJlc3VsdCwgaW5wdXRGaWxlLm5hbWUucmVwbGFjZSgvXFwuZG9jeCQvaSwnJykpfVxuXHRcdFx0XHRcdHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihpbnB1dEZpbGUpO1xuXHRcdFx0XHR9ZWxzZSB7XG5cdFx0XHRcdFx0cGFyc2UoaW5wdXRGaWxlKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIEZhY3Rvcnk9Y2xhc3Mge1xuXHRcdGNyZWF0ZSh3b3JkWG1sLCBkb2NQYXJzZXIsIHBhcmVudFBhcnNlcil7XG5cblx0XHR9XG5cdH1cbn1cbiJdfQ==