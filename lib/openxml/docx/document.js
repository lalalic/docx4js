"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require("stream");

var _sax = require("sax");

var _sax2 = _interopRequireDefault(_sax);

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

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

var _class = function (_Base) {
	_inherits(_class, _Base);

	_createClass(_class, null, [{
		key: "ext",
		get: function get() {
			return 'docx';
		}
	}]);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		var rels = _this.rels,
		    builtIn = 'settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');
		Object.keys(_this.partMain.rels).forEach(function (id) {
			var rel = _this.partMain.rels[id];
			if (builtIn.indexOf(rel.type) != -1) _this.getObjectPart(rel.target).then(function (parsed) {
				_this[rel.type] = parsed;
			});
		});
		return _this;
	}

	_createClass(_class, [{
		key: "createElement",
		value: function createElement(node) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(name) {
			return name.substr(-2) == 'Pr';
		}
	}, {
		key: "toProperty",
		value: function toProperty(node) {
			var _this2 = this;

			var attributes = node.attributes;
			var children = node.children;

			(children || []).forEach(function (a) {
				return attributes[a.name] = _this2.toProperty(a);
			});
			return attributes;
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this3 = this;

			var args = arguments;
			return new Promise(function (resolve, reject) {
				var docx = {
					name: "docx",
					attributes: {
						styles: _this3.styles.get('w:styles'),
						numbering: _this3.numbering && _this3.numbering.get('w:numbering')
					},
					children: []
				};
				var body = null,
				    sect = null,
				    pr = null,
				    current = docx;
				var sections = [];

				var stream = new _stream.PassThrough();
				stream.end(new Buffer(_this3.partMain.data.asUint8Array()));
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
							if (_this3.isProperty(node.name) && pr == null) pr = current;
					}
				}).on("closetag", function (tag) {
					var _current = current;
					var attributes = _current.attributes;
					var parent = _current.parent;
					var children = _current.children;
					var local = _current.local;
					var name = _current.name;

					if (pr == null) {
						var index = parent.children.indexOf(current);
						attributes.key = index;
						var element = _this3.createElement.apply(_this3, [current].concat(_toConsumableArray(args)));

						parent.children.splice(index, 1, element);
						current = parent;
					} else if (current == pr) {
						var property = _this3.toProperty(current);
						current = parent;
						if (pr != sect) current.attributes.contentStyle = property;else sect = property;
						pr = null;
					} else current = parent;

					if (current == body && sect != null) {
						sections.push(_this3.createElement.apply(_this3, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
						sect = null;
					}
				}).on("end", function (a) {
					if (current != docx) throw new Error("it should be docx");

					docx.children[0].children = sections;
					resolve(_this3.createElement.apply(_this3, [docx].concat(_toConsumableArray(args))));
				}).on("text", function (text) {
					if (current.parent && current.parent.name == "w:t") current.children.push(text);
				});
			});
		}
	}, {
		key: "colorTheme",
		get: function get() {
			if (this._colorTheme) return this._colorTheme;
			return this._colorTheme = new _color2.default(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'));
		}
	}, {
		key: "fontTheme",
		get: function get() {
			if (this._fontTheme) return this._fontTheme;
			return this.fontTheme = new _font2.default(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'));
		}
	}, {
		key: "formatTheme",
		get: function get() {
			if (this.formatTheme) return this.formatTheme;
			return this.formatTheme = new _format2.default(this.getPart('theme').documentElement.$1('fmtScheme'), this);
		}
	}]);

	return _class;
}(_document2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUdpQjtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O0FBRWhCLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixNQUFJLE9BQUssTUFBSyxJQUFMO01BQ1IsVUFBUSw2RkFBNkYsS0FBN0YsQ0FBbUcsR0FBbkcsQ0FBUixDQUhXO0FBSVosU0FBTyxJQUFQLENBQVksTUFBSyxRQUFMLENBQWMsSUFBZCxDQUFaLENBQWdDLE9BQWhDLENBQXdDLGNBQUk7QUFDM0MsT0FBSSxNQUFJLE1BQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsQ0FBSixDQUR1QztBQUUzQyxPQUFHLFFBQVEsT0FBUixDQUFnQixJQUFJLElBQUosQ0FBaEIsSUFBMkIsQ0FBQyxDQUFELEVBQzdCLE1BQUssYUFBTCxDQUFtQixJQUFJLE1BQUosQ0FBbkIsQ0FDRSxJQURGLENBQ08sa0JBQVE7QUFDYixVQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZixDQURhO0lBQVIsQ0FEUCxDQUREO0dBRnVDLENBQXhDLENBSlk7O0VBQWI7Ozs7Z0NBK0JjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLE1BQUs7QUFDZixVQUFPLEtBQUssTUFBTCxDQUFZLENBQUMsQ0FBRCxDQUFaLElBQWlCLElBQWpCLENBRFE7Ozs7NkJBSUwsTUFBSzs7O09BQ1YsYUFBc0IsS0FBdEIsV0FEVTtPQUNFLFdBQVUsS0FBVixTQURGOztBQUVmLElBQUMsWUFBVSxFQUFWLENBQUQsQ0FBZSxPQUFmLENBQXVCO1dBQUcsV0FBVyxFQUFFLElBQUYsQ0FBWCxHQUFtQixPQUFLLFVBQUwsQ0FBZ0IsQ0FBaEIsQ0FBbkI7SUFBSCxDQUF2QixDQUZlO0FBR2YsVUFBTyxV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Z0IsS0FBSyxPQUFMLENBQWEsT0FBYixFQUFzQixlQUF0QixDQUFzQyxFQUF0QyxDQUF5QyxXQUF6QyxDQUFoQixFQUF1RSxJQUF2RSxDQUFqQixDQUhTIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxuXG5pbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gJy4vdGhlbWUvZm9udCdcbmltcG9ydCBDb2xvclRoZW1lIGZyb20gJy4vdGhlbWUvY29sb3InXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSAnLi90aGVtZS9mb3JtYXQnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHZhciByZWxzPXRoaXMucmVscyxcblx0XHRcdGJ1aWx0SW49J3NldHRpbmdzLHdlYlNldHRpbmdzLHRoZW1lLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxuXHRcdE9iamVjdC5rZXlzKHRoaXMucGFydE1haW4ucmVscykuZm9yRWFjaChpZD0+e1xuXHRcdFx0bGV0IHJlbD10aGlzLnBhcnRNYWluLnJlbHNbaWRdXG5cdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSlcblx0XHRcdFx0dGhpcy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXG5cdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT57XG5cdFx0XHRcdFx0XHR0aGlzW3JlbC50eXBlXT1wYXJzZWRcblx0XHRcdFx0XHR9KVxuXHRcdH0pXG5cdH1cblxuXHRnZXQgY29sb3JUaGVtZSgpe1xuXHRcdGlmKHRoaXMuX2NvbG9yVGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5fY29sb3JUaGVtZVxuXHRcdHJldHVybiB0aGlzLl9jb2xvclRoZW1lPW5ldyBDb2xvclRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWVNYXBwaW5nJykpXG5cdH1cblxuXHRnZXQgZm9udFRoZW1lKCl7XG5cdFx0aWYodGhpcy5fZm9udFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuX2ZvbnRUaGVtZVxuXHRcdHJldHVybiB0aGlzLmZvbnRUaGVtZT1uZXcgRm9udFRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2ZvbnRTY2hlbWUnKSwgdGhpcy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgndGhlbWVGb250TGFuZycpKVxuXHR9XG5cdGdldCBmb3JtYXRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9ybWF0VGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZVxuXHRcdHJldHVybiB0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmbXRTY2hlbWUnKSwgdGhpcylcblx0fVxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdGlzUHJvcGVydHkobmFtZSl7XG5cdFx0cmV0dXJuIG5hbWUuc3Vic3RyKC0yKT09J1ByJ1xuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlKXtcblx0XHRsZXQge2F0dHJpYnV0ZXMsIGNoaWxkcmVufT1ub2RlO1xuXHRcdChjaGlsZHJlbnx8W10pLmZvckVhY2goYT0+YXR0cmlidXRlc1thLm5hbWVdPXRoaXMudG9Qcm9wZXJ0eShhKSlcblx0XHRyZXR1cm4gYXR0cmlidXRlc1xuXHR9XG5cblx0cGFyc2UoKXtcblx0XHR2YXIgYXJncz1hcmd1bWVudHNcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGxldCBkb2N4PXtcblx0XHRcdFx0bmFtZTpcImRvY3hcIixcblx0XHRcdFx0YXR0cmlidXRlczp7XG5cdFx0XHRcdFx0c3R5bGVzOiB0aGlzLnN0eWxlcy5nZXQoJ3c6c3R5bGVzJyksXG5cdFx0XHRcdFx0bnVtYmVyaW5nOiB0aGlzLm51bWJlcmluZyAmJiB0aGlzLm51bWJlcmluZy5nZXQoJ3c6bnVtYmVyaW5nJylcblx0XHRcdFx0fSxcblx0XHRcdFx0Y2hpbGRyZW46W11cblx0XHRcdH1cblx0XHRcdGxldCBib2R5PW51bGwsIHNlY3Q9bnVsbCwgcHI9bnVsbCwgY3VycmVudD1kb2N4XG5cdFx0XHRsZXQgc2VjdGlvbnM9W11cblxuXHRcdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxuXHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKHRoaXMucGFydE1haW4uZGF0YS5hc1VpbnQ4QXJyYXkoKSkpXG5cdFx0XHRzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXG5cdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9Pntcblx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxuXG5cdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxuXHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XG5cblx0XHRcdFx0Y3VycmVudD1ub2RlXG5cblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XG5cdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XG5cdFx0XHRcdFx0Ym9keT1jdXJyZW50XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ3c6c2VjdFByJzpcblx0XHRcdFx0XHRwcj1zZWN0PWN1cnJlbnRcblx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpZih0aGlzLmlzUHJvcGVydHkobm9kZS5uYW1lKSAmJiBwcj09bnVsbClcblx0XHRcdFx0XHRcdHByPWN1cnJlbnRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5vbihcImNsb3NldGFnXCIsdGFnPT57XG5cdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XG5cdFx0XHRcdGlmKHByPT1udWxsKXtcblx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxuXHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuY3JlYXRlRWxlbWVudChjdXJyZW50LC4uLmFyZ3MpXG5cblx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcblx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxuXHRcdFx0XHR9ZWxzZSBpZihjdXJyZW50PT1wcil7XG5cdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMudG9Qcm9wZXJ0eShjdXJyZW50KVxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XG5cdFx0XHRcdFx0aWYocHIhPXNlY3QpXG5cdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuY29udGVudFN0eWxlPXByb3BlcnR5XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0c2VjdD1wcm9wZXJ0eVxuXHRcdFx0XHRcdHByPW51bGxcblx0XHRcdFx0fWVsc2Vcblx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxuXG5cdFx0XHRcdGlmKGN1cnJlbnQ9PWJvZHkgJiYgc2VjdCE9bnVsbCl7XG5cdFx0XHRcdFx0c2VjdGlvbnMucHVzaCh0aGlzLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9LC4uLmFyZ3MpKVxuXHRcdFx0XHRcdHNlY3Q9bnVsbFxuXHRcdFx0XHR9XG5cblx0XHRcdH0pXG5cdFx0XHQub24oXCJlbmRcIiwgYT0+e1xuXHRcdFx0XHRpZihjdXJyZW50IT1kb2N4KVxuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIml0IHNob3VsZCBiZSBkb2N4XCIpXG5cblx0XHRcdFx0ZG9jeC5jaGlsZHJlblswXS5jaGlsZHJlbj1zZWN0aW9uc1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuY3JlYXRlRWxlbWVudChkb2N4LC4uLmFyZ3MpKVxuXHRcdFx0fSlcblx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xuXHRcdFx0XHRpZihjdXJyZW50LnBhcmVudCAmJiBjdXJyZW50LnBhcmVudC5uYW1lPT1cInc6dFwiKVxuXHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW4ucHVzaCh0ZXh0KVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG59XG4iXX0=