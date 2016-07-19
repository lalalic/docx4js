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

var _eventFactory = require("./event-factory");

var _eventFactory2 = _interopRequireDefault(_eventFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		key: "getColorTheme",
		value: function getColorTheme() {
			if (this.colorTheme) return this.colorTheme;
			return this.colorTheme = new _color2.default(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'));
		}
	}, {
		key: "getFontTheme",
		value: function getFontTheme() {
			if (this.fontTheme) return this.fontTheme;
			return this.fontTheme = new _font2.default(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'));
		}
	}, {
		key: "getFormatTheme",
		value: function getFormatTheme() {
			if (this.formatTheme) return this.formatTheme;
			return this.formatTheme = new _format2.default(this.getPart('theme').documentElement.$1('fmtScheme'), this);
		}
	}, {
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

			return new Promise(function (resolve, reject) {
				var docx = {
					name: "docx",
					attributes: {
						styles: _this3.styles['w:styles'],
						numbering: _this3.numbering['w:numbering']
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
						var element = _this3.createElement(current);

						parent.children.splice(index, 1, element);
						current = parent;
					} else if (current == pr) {
						var property = _this3.toProperty(current);
						current = parent;
						if (pr != sect) current.attributes.contentStyle = property;else sect = property;
						pr = null;
					} else current = parent;

					if (current == body && sect != null) {
						sections.push(_this3.createElement({ name: 'section', attributes: sect, children: body.children.splice(0) }));
						sect = null;
					}
				}).on("end", function (a) {
					if (current != docx) throw new Error("it should be docx");

					docx.children[0].children = sections;
					resolve(_this3.createElement(docx));
				}).on("text", function (text) {
					if (current.parent && current.parent.name == "w:t") current.children.push(text);
				});
			});
		}
	}]);

	return _class;
}(_document2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQUdpQjtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O0FBRWhCLG1CQUFhOzs7eUZBQ0gsWUFERzs7QUFFWixNQUFJLE9BQUssTUFBSyxJQUFMO01BQ1IsVUFBUSw2RkFBNkYsS0FBN0YsQ0FBbUcsR0FBbkcsQ0FBUixDQUhXO0FBSVosU0FBTyxJQUFQLENBQVksTUFBSyxRQUFMLENBQWMsSUFBZCxDQUFaLENBQWdDLE9BQWhDLENBQXdDLGNBQUk7QUFDM0MsT0FBSSxNQUFJLE1BQUssUUFBTCxDQUFjLElBQWQsQ0FBbUIsRUFBbkIsQ0FBSixDQUR1QztBQUUzQyxPQUFHLFFBQVEsT0FBUixDQUFnQixJQUFJLElBQUosQ0FBaEIsSUFBMkIsQ0FBQyxDQUFELEVBQzdCLE1BQUssYUFBTCxDQUFtQixJQUFJLE1BQUosQ0FBbkIsQ0FDRSxJQURGLENBQ08sa0JBQVE7QUFDYixVQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZixDQURhO0lBQVIsQ0FEUCxDQUREO0dBRnVDLENBQXhDLENBSlk7O0VBQWI7Ozs7a0NBY2U7QUFDZCxPQUFHLEtBQUssVUFBTCxFQUNGLE9BQU8sS0FBSyxVQUFMLENBRFI7QUFFQSxVQUFPLEtBQUssVUFBTCxHQUFnQixvQkFBZSxLQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXNCLGVBQXRCLENBQXNDLEVBQXRDLENBQXlDLFdBQXpDLENBQWYsRUFBc0UsS0FBSyxPQUFMLENBQWEsVUFBYixFQUF5QixlQUF6QixDQUF5QyxFQUF6QyxDQUE0QyxrQkFBNUMsQ0FBdEUsQ0FBaEIsQ0FITzs7OztpQ0FNRDtBQUNiLE9BQUcsS0FBSyxTQUFMLEVBQ0YsT0FBTyxLQUFLLFNBQUwsQ0FEUjtBQUVBLFVB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RE0iLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXG5cbmltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5cbmltcG9ydCBGb250VGhlbWUgZnJvbSAnLi90aGVtZS9mb250J1xuaW1wb3J0IENvbG9yVGhlbWUgZnJvbSAnLi90aGVtZS9jb2xvcidcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tICcuL3RoZW1lL2Zvcm1hdCdcblxuaW1wb3J0IEZhY3RvcnkgZnJvbSBcIi4vZXZlbnQtZmFjdG9yeVwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXHRcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9dGhpcy5yZWxzLFxuXHRcdFx0YnVpbHRJbj0nc2V0dGluZ3Msd2ViU2V0dGluZ3MsdGhlbWUsc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXG5cdFx0T2JqZWN0LmtleXModGhpcy5wYXJ0TWFpbi5yZWxzKS5mb3JFYWNoKGlkPT57XG5cdFx0XHRsZXQgcmVsPXRoaXMucGFydE1haW4ucmVsc1tpZF1cblx0XHRcdGlmKGJ1aWx0SW4uaW5kZXhPZihyZWwudHlwZSkhPS0xKVxuXHRcdFx0XHR0aGlzLmdldE9iamVjdFBhcnQocmVsLnRhcmdldClcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9Pntcblx0XHRcdFx0XHRcdHRoaXNbcmVsLnR5cGVdPXBhcnNlZFx0XG5cdFx0XHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cblx0Z2V0Q29sb3JUaGVtZSgpe1xuXHRcdGlmKHRoaXMuY29sb3JUaGVtZSlcblx0XHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWVcblx0XHRyZXR1cm4gdGhpcy5jb2xvclRoZW1lPW5ldyBDb2xvclRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWVNYXBwaW5nJykpXG5cdH1cblx0XG5cdGdldEZvbnRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9udFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lPW5ldyBGb250VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm9udFNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCd0aGVtZUZvbnRMYW5nJykpXG5cdH1cblx0Z2V0Rm9ybWF0VGhlbWUoKXtcblx0XHRpZih0aGlzLmZvcm1hdFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9ybWF0VGhlbWVcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZT1uZXcgRm9ybWF0VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm10U2NoZW1lJyksIHRoaXMpXG5cdH1cblx0XG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXHRcblx0aXNQcm9wZXJ0eShuYW1lKXtcblx0XHRyZXR1cm4gbmFtZS5zdWJzdHIoLTIpPT0nUHInXG5cdH1cblx0XG5cdHRvUHJvcGVydHkobm9kZSl7XG5cdFx0bGV0IHthdHRyaWJ1dGVzLCBjaGlsZHJlbn09bm9kZTtcblx0XHQoY2hpbGRyZW58fFtdKS5mb3JFYWNoKGE9PmF0dHJpYnV0ZXNbYS5uYW1lXT10aGlzLnRvUHJvcGVydHkoYSkpXG5cdFx0cmV0dXJuIGF0dHJpYnV0ZXNcblx0fVxuXHRcblx0cGFyc2UoKXtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9Pntcblx0XHRcdGxldCBkb2N4PXtcblx0XHRcdFx0bmFtZTpcImRvY3hcIiwgXG5cdFx0XHRcdGF0dHJpYnV0ZXM6e1xuXHRcdFx0XHRcdHN0eWxlczogdGhpcy5zdHlsZXNbJ3c6c3R5bGVzJ10sXG5cdFx0XHRcdFx0bnVtYmVyaW5nOiB0aGlzLm51bWJlcmluZ1sndzpudW1iZXJpbmcnXVxuXHRcdFx0XHR9LCBcblx0XHRcdFx0Y2hpbGRyZW46W11cblx0XHRcdH1cblx0XHRcdGxldCBib2R5PW51bGwsIHNlY3Q9bnVsbCwgcHI9bnVsbCwgY3VycmVudD1kb2N4XG5cdFx0XHRsZXQgc2VjdGlvbnM9W11cblxuXHRcdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxuXHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKHRoaXMucGFydE1haW4uZGF0YS5hc1VpbnQ4QXJyYXkoKSkpXG5cdFx0XHRzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXG5cdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9Pntcblx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxuXHRcdFx0XHRcblx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXG5cdFx0XHRcdG5vZGUucGFyZW50PWN1cnJlbnRcblx0XHRcdFx0XG5cdFx0XHRcdGN1cnJlbnQ9bm9kZVxuXHRcdFx0XHRcblx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XG5cdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XG5cdFx0XHRcdFx0Ym9keT1jdXJyZW50XG5cdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgJ3c6c2VjdFByJzpcblx0XHRcdFx0XHRwcj1zZWN0PWN1cnJlbnRcblx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRpZih0aGlzLmlzUHJvcGVydHkobm9kZS5uYW1lKSAmJiBwcj09bnVsbClcblx0XHRcdFx0XHRcdHByPWN1cnJlbnRcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5vbihcImNsb3NldGFnXCIsdGFnPT57XG5cdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XG5cdFx0XHRcdGlmKHByPT1udWxsKXtcblx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxuXHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuY3JlYXRlRWxlbWVudChjdXJyZW50KVxuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XG5cdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcblx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy50b1Byb3BlcnR5KGN1cnJlbnQpXG5cdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcblx0XHRcdFx0XHRpZihwciE9c2VjdClcblx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcy5jb250ZW50U3R5bGU9cHJvcGVydHlcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRzZWN0PXByb3BlcnR5XG5cdFx0XHRcdFx0cHI9bnVsbFxuXHRcdFx0XHR9ZWxzZVxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XG5cdFx0XHRcdFxuXHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xuXHRcdFx0XHRcdHNlY3Rpb25zLnB1c2godGhpcy5jcmVhdGVFbGVtZW50KHtuYW1lOidzZWN0aW9uJywgYXR0cmlidXRlczogc2VjdCwgY2hpbGRyZW46IGJvZHkuY2hpbGRyZW4uc3BsaWNlKDApfSkpXG5cdFx0XHRcdFx0c2VjdD1udWxsXG5cdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKFwiZW5kXCIsIGE9Pntcblx0XHRcdFx0aWYoY3VycmVudCE9ZG9jeClcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJpdCBzaG91bGQgYmUgZG9jeFwiKVxuXHRcdFx0XHRcblx0XHRcdFx0ZG9jeC5jaGlsZHJlblswXS5jaGlsZHJlbj1zZWN0aW9uc1xuXHRcdFx0XHRyZXNvbHZlKHRoaXMuY3JlYXRlRWxlbWVudChkb2N4KSlcblx0XHRcdH0pXG5cdFx0XHQub24oXCJ0ZXh0XCIsIHRleHQ9Pntcblx0XHRcdFx0aWYoY3VycmVudC5wYXJlbnQgJiYgY3VycmVudC5wYXJlbnQubmFtZT09XCJ3OnRcIilcblx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcblx0XHRcdH0pXG5cdFx0fSlcblx0fVxufVxuXG4iXX0=