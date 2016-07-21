"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require("stream");

var _sax = require("sax");

var _sax2 = _interopRequireDefault(_sax);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var builtIn = 'settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');

var _class = function (_Part) {
	_inherits(_class, _Part);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "parse",
		value: function parse() {
			var _this2 = this;

			var args = arguments;
			return Promise.all(Object.keys(this.rels).map(function (id) {
				var rel = _this2.rels[id];
				if (builtIn.indexOf(rel.type) != -1) {
					return _this2.doc.getObjectPart(rel.target).then(function (parsed) {
						return _this2[rel.type] = parsed;
					});
				}
			}).filter(function (a) {
				return a;
			})).then(function (a) {
				return new Promise(function (resolve) {
					var root = {
						name: _this2.doc.constructor.ext,
						children: []
					};
					var body = null,
					    sect = null,
					    pr = null,
					    current = root;
					var sections = [];

					var stream = new _stream.PassThrough();
					stream.end(new Buffer(_this2.data.asUint8Array()));
					stream.pipe(_sax2.default.createStream(true, { xmlns: false })).on("opentag", function (node) {
						node.children = [];

						current.children.push(node);
						node.parent = current;

						current = node;

						switch (node.name) {
							case 'w:body':
								body = current;
								break;
							case 'w:sectPr':
								pr = sect = current;
								break;
							default:
								if (_this2.doc.isProperty(node.name) && pr == null) pr = current;
						}
					}).on("closetag", function (tag) {
						var _current = current;
						var attributes = _current.attributes;
						var parent = _current.parent;
						var children = _current.children;
						var local = _current.local;
						var name = _current.name;

						if (pr == null) {
							var _doc;

							var index = parent.children.indexOf(current);
							attributes.key = index;
							var element = (_doc = _this2.doc).createElement.apply(_doc, [current].concat(_toConsumableArray(args)));

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var property = _this2.doc.toProperty(current);
							current = parent;
							if (pr != sect) current.attributes.contentStyle = property;else sect = property;
							pr = null;
						} else current = parent;

						if (current == body && sect != null) {
							var _doc2;

							sections.push((_doc2 = _this2.doc).createElement.apply(_doc2, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
							sect = null;
						}
					}).on("end", function (a) {
						var _doc3;

						current.children[0].children = sections;
						current.attributes = _this2;
						resolve((_doc3 = _this2.doc).createElement.apply(_doc3, [current].concat(_toConsumableArray(args))));
					}).on("text", function (text) {
						if (current.parent && current.parent.name == "w:t") current.children.push(text);
					});
				});
			});
		}
	}]);

	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztBQUVBLElBQU0sVUFBUSw2RkFBNkYsS0FBN0YsQ0FBbUcsR0FBbkcsQ0FBUjs7Ozs7Ozs7Ozs7OzswQkFFRTs7O0FBQ04sT0FBSSxPQUFLLFNBQUwsQ0FERTtBQUVOLFVBQU8sUUFBUSxHQUFSLENBQVksT0FBTyxJQUFQLENBQVksS0FBSyxJQUFMLENBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsY0FBSTtBQUNqRCxRQUFJLE1BQUksT0FBSyxJQUFMLENBQVUsRUFBVixDQUFKLENBRDZDO0FBRWpELFFBQUcsUUFBUSxPQUFSLENBQWdCLElBQUksSUFBSixDQUFoQixJQUEyQixDQUFDLENBQUQsRUFBRztBQUNoQyxZQUFPLE9BQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxNQUFKLENBQXZCLENBQ0wsSUFESyxDQUNBO2FBQVEsT0FBSyxJQUFJLElBQUosQ0FBTCxHQUFlLE1BQWY7TUFBUixDQURQLENBRGdDO0tBQWpDO0lBRjZDLENBQTNCLENBTWhCLE1BTmdCLENBTVQ7V0FBRztJQUFILENBTkgsRUFNVSxJQU5WLENBTWUsYUFBRztBQUN4QixXQUFPLElBQUksT0FBSixDQUFZLG1CQUFTO0FBQzNCLFNBQUksT0FBSztBQUNSLFlBQUssT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQjtBQUNMLGdCQUFTLEVBQVQ7TUFGRyxDQUR1QjtBQUszQixTQUFJLE9BQUssSUFBTDtTQUFXLE9BQUssSUFBTDtTQUFXLEtBQUcsSUFBSDtTQUFTLFVBQVEsSUFBUixDQUxSO0FBTTNCLFNBQUksV0FBUyxFQUFULENBTnVCOztBQVEzQixTQUFJLFNBQU8seUJBQVAsQ0FSdUI7QUFTM0IsWUFBTyxHQUFQLENBQVcsSUFBSSxNQUFKLENBQVcsT0FBSyxJQUFMLENBQVUsWUFBVixFQUFYLENBQVgsRUFUMkI7QUFVM0IsWUFBTyxJQUFQLENBQVksY0FBSSxZQUFKLENBQWlCLElBQWpCLEVBQXNCLEVBQUMsT0FBTSxLQUFOLEVBQXZCLENBQVosRUFDQyxFQURELENBQ0ksU0FESixFQUNlLGdCQUFNO0FBQ3BCLFdBQUssUUFBTCxHQUFjLEVBQWQsQ0FEb0I7O0FBR3BCLGNBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixJQUF0QixFQUhvQjtBQUlwQixXQUFLLE1BQUwsR0FBWSxPQUFaLENBSm9COztBQU1wQixnQkFBUSxJQUFSLENBTm9COztBQVFwQixjQUFPLEtBQUssSUFBTDtBQUNQLFlBQUssUUFBTDtBQUNDLGVBQUssT0FBTCxDQUREO0FBRUEsY0FGQTtBQURBLFlBSUssVUFBTDtBQUNDLGFBQUcsT0FBSyxPQUFMLENBREo7QUFFQSxjQUZBO0FBSkE7QUFRQyxZQUFHLE9BQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsS0FBSyxJQUFMLENBQXBCLElBQWtDLE1BQUksSUFBSixFQUNwQyxLQUFHLE9BQUgsQ0FERDtBQVJELE9BUm9CO01BQU4sQ0FEZixDQXFCQyxFQXJCRCxDQXFCSSxVQXJCSixFQXFCZSxlQUFLO3FCQUM4QixRQUQ5QjtVQUNaLGlDQURZO1VBQ0EseUJBREE7VUFDUSw2QkFEUjtVQUNrQix1QkFEbEI7VUFDd0IscUJBRHhCOztBQUVuQixVQUFHLE1BQUksSUFBSixFQUFTOzs7QUFDWCxXQUFJLFFBQU0sT0FBTyxRQUFQLENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLENBQU4sQ0FETztBQUVYLGtCQUFXLEdBQVgsR0FBZSxLQUFmLENBRlc7QUFHWCxXQUFJLFVBQVEsZUFBSyxHQUFMLEVBQVMsYUFBVCxjQUF1QixtQ0FBVyxNQUFsQyxDQUFSLENBSE87O0FBS1gsY0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLEVBQTZCLENBQTdCLEVBQStCLE9BQS9CLEVBTFc7QUFNWCxpQkFBUSxNQUFSLENBTlc7T0FBWixNQU9NLElBQUcsV0FBUyxFQUFULEVBQVk7QUFDcEIsV0FBSSxXQUFTLE9BQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsT0FBcEIsQ0FBVCxDQURnQjtBQUVwQixpQkFBUSxNQUFSLENBRm9CO0FBR3BCLFdBQUcsTUFBSSxJQUFKLEVBQ0YsUUFBUSxVQUFSLENBQW1CLFlBQW5CLEdBQWdDLFFBQWhDLENBREQsS0FHQyxPQUFLLFFBQUwsQ0FIRDtBQUlBLFlBQUcsSUFBSCxDQVBvQjtPQUFmLE1BU0wsVUFBUSxNQUFSLENBVEs7O0FBV04sVUFBRyxXQUFTLElBQVQsSUFBaUIsUUFBTSxJQUFOLEVBQVc7OztBQUM5QixnQkFBUyxJQUFULENBQWMsZ0JBQUssR0FBTCxFQUFTLGFBQVQsZUFBdUIsRUFBQyxNQUFLLFNBQUwsRUFBZ0IsWUFBWSxJQUFaLEVBQWtCLFVBQVUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixDQUFWLDhCQUFzQyxNQUFoRyxDQUFkLEVBRDhCO0FBRTlCLGNBQUssSUFBTCxDQUY4QjtPQUEvQjtNQXBCYyxDQXJCZixDQStDQyxFQS9DRCxDQStDSSxLQS9DSixFQStDVyxhQUFHOzs7QUFDYixjQUFRLFFBQVIsQ0FBaUIsQ0FBakIsRUFBb0IsUUFBcEIsR0FBNkIsUUFBN0IsQ0FEYTtBQUViLGNBQVEsVUFBUixVQUZhO0FBR2IsY0FBUSxnQkFBSyxHQUFMLEVBQVMsYUFBVCxlQUF1QixtQ0FBVyxNQUFsQyxDQUFSLEVBSGE7TUFBSCxDQS9DWCxDQW9EQyxFQXBERCxDQW9ESSxNQXBESixFQW9EWSxnQkFBTTtBQUNqQixVQUFHLFFBQVEsTUFBUixJQUFrQixRQUFRLE1BQVIsQ0FBZSxJQUFmLElBQXFCLEtBQXJCLEVBQ3BCLFFBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixJQUF0QixFQUREO01BRFcsQ0FwRFosQ0FWMkI7S0FBVCxDQUFuQixDQUR3QjtJQUFILENBTnRCLENBRk0iLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcclxuaW1wb3J0IHNheCBmcm9tIFwic2F4XCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5cclxuY29uc3QgYnVpbHRJbj0nc2V0dGluZ3Msd2ViU2V0dGluZ3MsdGhlbWUsc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRwYXJzZSgpe1xyXG5cdFx0bGV0IGFyZ3M9YXJndW1lbnRzXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0bGV0IHJlbD10aGlzLnJlbHNbaWRdXHJcblx0XHRcdGlmKGJ1aWx0SW4uaW5kZXhPZihyZWwudHlwZSkhPS0xKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0KVxyXG5cdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdH1cclxuXHRcdH0pLmZpbHRlcihhPT5hKSkudGhlbihhPT57XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XHJcblx0XHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdFx0bmFtZTp0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHQsXHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKHRoaXMuZGF0YS5hc1VpbnQ4QXJyYXkoKSkpXHJcblx0XHRcdFx0c3RyZWFtLnBpcGUoc2F4LmNyZWF0ZVN0cmVhbSh0cnVlLHt4bWxuczpmYWxzZX0pKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cclxuXHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cclxuXHRcdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cclxuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpib2R5JzpcclxuXHRcdFx0XHRcdFx0Ym9keT1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpzZWN0UHInOlxyXG5cdFx0XHRcdFx0XHRwcj1zZWN0PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRpZih0aGlzLmRvYy5pc1Byb3BlcnR5KG5vZGUubmFtZSkgJiYgcHI9PW51bGwpXHJcblx0XHRcdFx0XHRcdFx0cHI9Y3VycmVudFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxyXG5cdFx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQsLi4uYXJncylcclxuXHJcblx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy5kb2MudG9Qcm9wZXJ0eShjdXJyZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdClcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuY29udGVudFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRzZWN0PXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdHByPW51bGxcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblxyXG5cdFx0XHRcdFx0aWYoY3VycmVudD09Ym9keSAmJiBzZWN0IT1udWxsKXtcclxuXHRcdFx0XHRcdFx0c2VjdGlvbnMucHVzaCh0aGlzLmRvYy5jcmVhdGVFbGVtZW50KHtuYW1lOidzZWN0aW9uJywgYXR0cmlidXRlczogc2VjdCwgY2hpbGRyZW46IGJvZHkuY2hpbGRyZW4uc3BsaWNlKDApfSwuLi5hcmdzKSlcclxuXHRcdFx0XHRcdFx0c2VjdD1udWxsXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiZW5kXCIsIGE9PntcclxuXHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW49c2VjdGlvbnNcclxuXHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcz10aGlzXHJcblx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudCwuLi5hcmdzKSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5wYXJlbnQgJiYgY3VycmVudC5wYXJlbnQubmFtZT09XCJ3OnRcIilcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKHRleHQpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59Il19