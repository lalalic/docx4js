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

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

var _font = require("./theme/font");

var _font2 = _interopRequireDefault(_font);

var _color = require("./theme/color");

var _color2 = _interopRequireDefault(_color);

var _format = require("./theme/format");

var _format2 = _interopRequireDefault(_format);

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

				_this2.styles = new _styles2.default(_this2.styles, _this2.doc);
				_this2.fontTheme = new _font2.default(_this2.theme.get('theme.themeElements.fontScheme'), _this2.settings.get('settings.themeFontLang').$);
				_this2.colorTheme = new _color2.default(_this2.theme.get('theme.themeElements.clrScheme'), _this2.settings.get('settings.clrSchemeMapping').$);
				_this2.formatTheme = new _format2.default(_this2.theme.get('theme.themeElements.fmtScheme'));

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

						var index = parent.children.indexOf(current);
						if (pr == null) {
							var _doc;

							attributes.key = index;
							if (tag == 'w:document') {
								current.children = sections;
								builtIn.forEach(function (a) {
									return attributes[a] = _this2[a];
								});
								attributes.directStyle = _this2.styles.getDefault("document");
							}
							var element = (_doc = _this2.doc).createElement.apply(_doc, [current].concat(_toConsumableArray(args)));

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var property = _this2.doc.toProperty(current);
							parent.children.splice(index, 1);
							current = parent;
							if (pr != sect) current.attributes.directStyle = property;else sect = property;

							pr = null;
						} else current = parent;

						if (current == body && sect != null) {
							var _doc2;

							sections.push((_doc2 = _this2.doc).createElement.apply(_doc2, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
							sect = null;
						}
					}).on("end", function (a) {
						resolve(root.children[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVFOzs7QUFDTixPQUFJLE9BQUssU0FBTCxDQURFO0FBRU4sVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxRQUFRLE9BQVIsQ0FBZ0IsSUFBSSxJQUFKLENBQWhCLElBQTJCLENBQUMsQ0FBRCxFQUFHO0FBQ2hDLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZjtNQUFSLENBRFAsQ0FEZ0M7S0FBakM7SUFGNkMsQ0FBM0IsQ0FNaEIsTUFOZ0IsQ0FNVDtXQUFHO0lBQUgsQ0FOSCxFQU1VLElBTlYsQ0FNZSxhQUFHOztBQUV4QixXQUFLLE1BQUwsR0FBWSxxQkFBVyxPQUFLLE1BQUwsRUFBYSxPQUFLLEdBQUwsQ0FBcEMsQ0FGd0I7QUFHeEIsV0FBSyxTQUFMLEdBQWUsbUJBQWMsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLGdDQUFmLENBQWQsRUFBK0QsT0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQix3QkFBbEIsRUFBNEMsQ0FBNUMsQ0FBOUUsQ0FId0I7QUFJeEIsV0FBSyxVQUFMLEdBQWdCLG9CQUFlLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSwrQkFBZixDQUFmLEVBQStELE9BQUssUUFBTCxDQUFjLEdBQWQsQ0FBa0IsMkJBQWxCLEVBQStDLENBQS9DLENBQS9FLENBSndCO0FBS3hCLFdBQUssV0FBTCxHQUFpQixxQkFBZ0IsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLCtCQUFmLENBQWhCLENBQWpCLENBTHdCOztBQU94QixXQUFPLElBQUksT0FBSixDQUFZLG1CQUFTO0FBQzNCLFNBQUksT0FBSztBQUNSLFlBQUssT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQjtBQUNMLGdCQUFTLEVBQVQ7TUFGRyxDQUR1QjtBQUszQixTQUFJLE9BQUssSUFBTDtTQUFXLE9BQUssSUFBTDtTQUFXLEtBQUcsSUFBSDtTQUFTLFVBQVEsSUFBUixDQUxSO0FBTTNCLFNBQUksV0FBUyxFQUFULENBTnVCOztBQVEzQixTQUFJLFNBQU8seUJBQVAsQ0FSdUI7QUFTM0IsWUFBTyxHQUFQLENBQVcsSUFBSSxNQUFKLENBQVcsT0FBSyxJQUFMLENBQVUsWUFBVixFQUFYLENBQVgsRUFUMkI7QUFVM0IsWUFBTyxJQUFQLENBQVksY0FBSSxZQUFKLENBQWlCLElBQWpCLEVBQXNCLEVBQUMsT0FBTSxLQUFOLEVBQXZCLENBQVosRUFDQyxFQURELENBQ0ksU0FESixFQUNlLGdCQUFNO0FBQ3BCLFdBQUssUUFBTCxHQUFjLEVBQWQsQ0FEb0I7O0FBR3BCLGNBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixJQUF0QixFQUhvQjtBQUlwQixXQUFLLE1BQUwsR0FBWSxPQUFaLENBSm9COztBQU1wQixnQkFBUSxJQUFSLENBTm9COztBQVFwQixjQUFPLEtBQUssSUFBTDtBQUNQLFlBQUssUUFBTDtBQUNDLGVBQUssT0FBTCxDQUREO0FBRUEsY0FGQTtBQURBLFlBSUssVUFBTDtBQUNDLGFBQUcsT0FBSyxPQUFMLENBREo7QUFFQSxjQUZBO0FBSkE7QUFRQyxZQUFHLE9BQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsS0FBSyxJQUFMLENBQXBCLElBQWtDLE1BQUksSUFBSixFQUNwQyxLQUFHLE9BQUgsQ0FERDtBQVJELE9BUm9CO01BQU4sQ0FEZixDQXFCQyxFQXJCRCxDQXFCSSxVQXJCSixFQXFCZSxlQUFLO3FCQUM4QixRQUQ5QjtVQUNaLGlDQURZO1VBQ0EseUJBREE7VUFDUSw2QkFEUjtVQUNrQix1QkFEbEI7VUFDd0IscUJBRHhCOztBQUVuQixVQUFJLFFBQU0sT0FBTyxRQUFQLENBQWdCLE9BQWhCLENBQXdCLE9BQXhCLENBQU4sQ0FGZTtBQUduQixVQUFHLE1BQUksSUFBSixFQUFTOzs7QUFDWCxrQkFBVyxHQUFYLEdBQWUsS0FBZixDQURXO0FBRVgsV0FBRyxPQUFLLFlBQUwsRUFBa0I7QUFDcEIsZ0JBQVEsUUFBUixHQUFpQixRQUFqQixDQURvQjtBQUVwQixnQkFBUSxPQUFSLENBQWdCO2dCQUFHLFdBQVcsQ0FBWCxJQUFjLE9BQUssQ0FBTCxDQUFkO1NBQUgsQ0FBaEIsQ0FGb0I7QUFHcEIsbUJBQVcsV0FBWCxHQUF1QixPQUFLLE1BQUwsQ0FBWSxVQUFaLENBQXVCLFVBQXZCLENBQXZCLENBSG9CO1FBQXJCO0FBS0EsV0FBSSxVQUFRLGVBQUssR0FBTCxFQUFTLGFBQVQsY0FBdUIsbUNBQVcsTUFBbEMsQ0FBUixDQVBPOztBQVNYLGNBQU8sUUFBUCxDQUFnQixNQUFoQixDQUF1QixLQUF2QixFQUE2QixDQUE3QixFQUErQixPQUEvQixFQVRXO0FBVVgsaUJBQVEsTUFBUixDQVZXO09BQVosTUFXTSxJQUFHLFdBQVMsRUFBVCxFQUFZO0FBQ3BCLFdBQUksV0FBUyxPQUFLLEdBQUwsQ0FBUyxVQUFULENBQW9CLE9BQXBCLENBQVQsQ0FEZ0I7QUFFcEIsY0FBTyxRQUFQLENBQWdCLE1BQWhCLENBQXVCLEtBQXZCLEVBQTZCLENBQTdCLEVBRm9CO0FBR3BCLGlCQUFRLE1BQVIsQ0FIb0I7QUFJcEIsV0FBRyxNQUFJLElBQUosRUFDRixRQUFRLFVBQVIsQ0FBbUIsV0FBbkIsR0FBK0IsUUFBL0IsQ0FERCxLQUdDLE9BQUssUUFBTCxDQUhEOztBQUtBLFlBQUcsSUFBSCxDQVRvQjtPQUFmLE1BV0wsVUFBUSxNQUFSLENBWEs7O0FBYU4sVUFBRyxXQUFTLElBQVQsSUFBaUIsUUFBTSxJQUFOLEVBQVc7OztBQUM5QixnQkFBUyxJQUFULENBQWMsZ0JBQUssR0FBTCxFQUFTLGFBQVQsZUFBdUIsRUFBQyxNQUFLLFNBQUwsRUFBZ0IsWUFBWSxJQUFaLEVBQWtCLFVBQVUsS0FBSyxRQUFMLENBQWMsTUFBZCxDQUFxQixDQUFyQixDQUFWLDhCQUFzQyxNQUFoRyxDQUFkLEVBRDhCO0FBRTlCLGNBQUssSUFBTCxDQUY4QjtPQUEvQjtNQTNCYyxDQXJCZixDQXNEQyxFQXRERCxDQXNESSxLQXRESixFQXNEVyxhQUFHO0FBQ2IsY0FBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVIsRUFEYTtNQUFILENBdERYLENBeURDLEVBekRELENBeURJLE1BekRKLEVBeURZLGdCQUFNO0FBQ2pCLFVBQUcsUUFBUSxNQUFSLElBQWtCLFFBQVEsTUFBUixDQUFlLElBQWYsSUFBcUIsS0FBckIsRUFDcEIsUUFBUSxRQUFSLENBQWlCLElBQWpCLENBQXNCLElBQXRCLEVBREQ7TUFEVyxDQXpEWixDQVYyQjtLQUFULENBQW5CLENBUHdCO0lBQUgsQ0FOdEIsQ0FGTSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFzc1Rocm91Z2h9IGZyb20gXCJzdHJlYW1cIlxyXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcclxuXHJcbmltcG9ydCBGb250VGhlbWUgZnJvbSBcIi4vdGhlbWUvZm9udFwiXHJcbmltcG9ydCBDb2xvclRoZW1lIGZyb20gXCIuL3RoZW1lL2NvbG9yXCJcclxuaW1wb3J0IEZvcm1hdFRoZW1lIGZyb20gXCIuL3RoZW1lL2Zvcm1hdFwiXHJcblxyXG5cclxuY29uc3QgYnVpbHRJbj0nc2V0dGluZ3Msd2ViU2V0dGluZ3MsdGhlbWUsc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRwYXJzZSgpe1xyXG5cdFx0bGV0IGFyZ3M9YXJndW1lbnRzXHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0bGV0IHJlbD10aGlzLnJlbHNbaWRdXHJcblx0XHRcdGlmKGJ1aWx0SW4uaW5kZXhPZihyZWwudHlwZSkhPS0xKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0KVxyXG5cdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdH1cclxuXHRcdH0pLmZpbHRlcihhPT5hKSkudGhlbihhPT57XHJcblx0XHRcdFxyXG5cdFx0XHR0aGlzLnN0eWxlcz1uZXcgU3R5bGVzKHRoaXMuc3R5bGVzLCB0aGlzLmRvYylcclxuXHRcdFx0dGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mb250U2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLnRoZW1lRm9udExhbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuY2xyU2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmNsclNjaGVtZU1hcHBpbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mbXRTY2hlbWUnKSlcclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XHJcblx0XHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdFx0bmFtZTp0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHQsXHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKHRoaXMuZGF0YS5hc1VpbnQ4QXJyYXkoKSkpXHJcblx0XHRcdFx0c3RyZWFtLnBpcGUoc2F4LmNyZWF0ZVN0cmVhbSh0cnVlLHt4bWxuczpmYWxzZX0pKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cclxuXHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cclxuXHRcdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cclxuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpib2R5JzpcclxuXHRcdFx0XHRcdFx0Ym9keT1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpzZWN0UHInOlxyXG5cdFx0XHRcdFx0XHRwcj1zZWN0PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRkZWZhdWx0OlxyXG5cdFx0XHRcdFx0XHRpZih0aGlzLmRvYy5pc1Byb3BlcnR5KG5vZGUubmFtZSkgJiYgcHI9PW51bGwpXHJcblx0XHRcdFx0XHRcdFx0cHI9Y3VycmVudFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpe1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49c2VjdGlvbnNcclxuXHRcdFx0XHRcdFx0XHRidWlsdEluLmZvckVhY2goYT0+YXR0cmlidXRlc1thXT10aGlzW2FdKVxyXG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9dGhpcy5zdHlsZXMuZ2V0RGVmYXVsdChcImRvY3VtZW50XCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0bGV0IGVsZW1lbnQ9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50LC4uLmFyZ3MpXHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMuZG9jLnRvUHJvcGVydHkoY3VycmVudClcclxuXHRcdFx0XHRcdFx0cGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwxKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdClcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHNlY3Q9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHByPW51bGxcclxuXHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblxyXG5cdFx0XHRcdFx0aWYoY3VycmVudD09Ym9keSAmJiBzZWN0IT1udWxsKXtcclxuXHRcdFx0XHRcdFx0c2VjdGlvbnMucHVzaCh0aGlzLmRvYy5jcmVhdGVFbGVtZW50KHtuYW1lOidzZWN0aW9uJywgYXR0cmlidXRlczogc2VjdCwgY2hpbGRyZW46IGJvZHkuY2hpbGRyZW4uc3BsaWNlKDApfSwuLi5hcmdzKSlcclxuXHRcdFx0XHRcdFx0c2VjdD1udWxsXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiZW5kXCIsIGE9PntcclxuXHRcdFx0XHRcdHJlc29sdmUocm9vdC5jaGlsZHJlblswXSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5wYXJlbnQgJiYgY3VycmVudC5wYXJlbnQubmFtZT09XCJ3OnRcIilcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKHRleHQpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcbiJdfQ==