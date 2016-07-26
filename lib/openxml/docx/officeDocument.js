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

var _headerFooter = require("./headerFooter");

var _headerFooter2 = _interopRequireDefault(_headerFooter);

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

var builtIn = 'webSettings,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');

var _class = function (_Part) {
	_inherits(_class, _Part);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "_parse1",
		value: function _parse1(type) {
			var _this2 = this;

			return Promise.all(Object.keys(this.rels).map(function (id) {
				var rel = _this2.rels[id];
				if (rel.type == type) {
					return _this2.doc.getObjectPart(rel.target).then(function (parsed) {
						return _this2[type] = parsed;
					});
				}
			}));
		}
	}, {
		key: "_parseNonContent",
		value: function _parseNonContent() {
			var _this3 = this;

			var doc = this.doc;
			var transPr = {
				validator: function validator(xpath, currentValue, newValue) {
					return doc.onToProperty(newValue, xpath.split('/').pop());
				}
			};

			return this._parse1("settings").then(function (a) {
				return _this3._parse1("theme", transPr);
			}).then(function (a) {
				_this3.fontTheme = new _font2.default(_this3.theme.get('theme.themeElements.fontScheme'), _this3.settings.get('settings.themeFontLang', false)[0].$);
				_this3.colorTheme = new _color2.default(_this3.theme.get('theme.themeElements.clrScheme'), _this3.settings.get('settings.clrSchemeMapping').$);
				_this3.formatTheme = new _format2.default(_this3.theme.get('theme.themeElements.fmtScheme'));
			}).then(function (a) {
				return Promise.all(Object.keys(_this3.rels).map(function (id) {
					var rel = _this3.rels[id];
					if (builtIn.indexOf(rel.type) != -1) {
						return _this3.doc.getObjectPart(rel.target, rel.type == 'styles' || rel.type == 'numbering' ? transPr : null).then(function (parsed) {
							return _this3[rel.type] = parsed;
						});
					}
				}).filter(function (a) {
					return a;
				})).then(function (a) {
					_this3.styles = new _styles2.default(_this3.styles, _this3.doc);
				});
			});
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this4 = this;

			return this._parseNonContent().then(function (a) {
				return new Promise(function (resolve) {
					var root = {
						children: []
					};
					var body = null,
					    sect = null,
					    pr = null,
					    current = root;
					var sections = [];

					_this4.getContentStream().on("opentag", function (node) {
						node.parent = current;
						current = node;

						if (_this4.doc.isProperty(node) && pr == null) {
							pr = node;
						}

						if (pr == null) {
							node.children = [];
							node.parent.children.push(node);
						}
						switch (node.name) {
							case 'w:body':
								body = current;
								break;
							case 'w:sectPr':
								sect = current;
								break;
						}
					}).on("closetag", function (tag) {
						if (tag == 'w:document') return;

						var _current = current;
						var attributes = _current.attributes;
						var parent = _current.parent;
						var children = _current.children;
						var local = _current.local;
						var name = _current.name;

						if (pr == null) {
							var index = parent.children.indexOf(current);
							attributes.key = index;

							var element = _this4.doc.createElement(current);

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var type = tag.split(':').pop();
							var property = _this4.doc.toProperty(_this4.asXmlObject(current), type);
							current = parent;
							if (pr != sect) {
								if (tag.substr(-2) == 'Pr') current.attributes.directStyle = property;else current.attributes[type] = property;
							} else sect = property;

							pr = null;
						} else {
							var _type = tag.split(':').pop();
							var value = _this4.doc.onToProperty(_this4.asXmlObject(current), _type);
							if (parent[_type] == undefined) parent[_type] = value;else if (Array.isArray(parent[_type])) parent[_type].push(value);else parent[_type] = [parent[_type], value];

							current = parent;
						}

						if (current == body && sect != null) {
							sections.push({ name: 'section', attributes: sect, children: body.children.splice(0) });
							sect = null;
						}
					}).on("end", function (a) {
						_this4.parseHeaderFooter(sections).then(function (a) {
							var _current2 = current;
							var attributes = _current2.attributes;

							current.children = sections;
							builtIn.forEach(function (a) {
								return attributes[a] = _this4[a];
							});
							attributes.directStyle = _this4.styles.getDefault("document");
							resolve(_this4.doc.createElement(current));
						});
					}).on("text", function (text) {
						if (current.name == "w:t") current.children = text;
					});
				});
			});
		}
	}, {
		key: "parseHeaderFooter",
		value: function parseHeaderFooter(sections) {
			var _this5 = this;

			return Promise.all(sections.map(function (section, i) {
				var props = section.attributes;
				var children = section.children;
				var headerReference = props.headerReference;
				var footerReference = props.footerReference;

				var headers = [],
				    footers = [];
				if (headerReference) {
					if (!Array.isArray(headerReference)) headerReference = [headerReference];
					headers = headerReference.map(function (a) {
						var _a$$ = a.$;
						var id = _a$$.id;
						var type = _a$$.type;

						var part = new _headerFooter2.default(_this5.rels[id].target, _this5.doc, type);
						return part.parse().then(function (root) {
							return children.splice(0, 0, root);
						});
					});
					delete props.headerReference;
				}

				if (footerReference) {
					if (!Array.isArray(footerReference)) footerReference = [footerReference];
					footers = footerReference.map(function (a) {
						var _a$$2 = a.$;
						var id = _a$$2.id;
						var type = _a$$2.type;

						var part = new _headerFooter2.default(_this5.rels[id].target, _this5.doc, type);
						return part.parse().then(function (root) {
							return children.splice(0, 0, root);
						});
					});
					delete props.footerReference;
				}

				return Promise.all([].concat(_toConsumableArray(headers), _toConsumableArray(footers))).then(function (a) {
					return sections.splice(i, 1, _this5.doc.createElement(section));
				});
			}));
		}
	}]);

	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLFVBQVEsOEVBQThFLEtBQTlFLENBQW9GLEdBQXBGLENBQVI7Ozs7Ozs7Ozs7Ozs7MEJBRUcsTUFBSzs7O0FBQ1osVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxJQUFJLElBQUosSUFBVSxJQUFWLEVBQWU7QUFDakIsWUFBTyxPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLElBQUksTUFBSixDQUF2QixDQUNMLElBREssQ0FDQTthQUFRLE9BQUssSUFBTCxJQUFXLE1BQVg7TUFBUixDQURQLENBRGlCO0tBQWxCO0lBRjZDLENBQXZDLENBQVAsQ0FEWTs7OztxQ0FTSzs7O0FBQ2pCLE9BQUksTUFBSSxLQUFLLEdBQUwsQ0FEUztBQUVqQixPQUFJLFVBQVE7QUFDWCxrQ0FBVSxPQUFNLGNBQWMsVUFBUztBQUN0QyxZQUFPLElBQUksWUFBSixDQUFpQixRQUFqQixFQUEyQixNQUFNLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQTNCLENBQVAsQ0FEc0M7S0FENUI7SUFBUixDQUZhOztBQVFqQixVQUFPLEtBQUssT0FBTCxDQUFhLFVBQWIsRUFBeUIsSUFBekIsQ0FBOEI7V0FBRyxPQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXFCLE9BQXJCO0lBQUgsQ0FBOUIsQ0FBZ0UsSUFBaEUsQ0FBcUUsYUFBRztBQUM5RSxXQUFLLFNBQUwsR0FBZSxtQkFBYyxPQUFLLEtBQUwsQ0FBVyxHQUFYLENB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QVFsQixZQUFPLE1BQU0sZUFBTixDQVJXO0tBQW5COztBQVdBLFdBQU8sUUFBUSxHQUFSLDhCQUFnQiw2QkFBWSxTQUE1QixFQUNMLElBREssQ0FDQTtZQUFHLFNBQVMsTUFBVCxDQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLE9BQXZCLENBQXBCO0tBQUgsQ0FEUCxDQTFCNEM7SUFBYixDQUF6QixDQUFQLENBRDBCIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXHJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXHJcbmltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxyXG5pbXBvcnQgSGVhZGVyRm9vdGVyIGZyb20gXCIuL2hlYWRlckZvb3RlclwiXHJcblxyXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gXCIuL3RoZW1lL2ZvbnRcIlxyXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tIFwiLi90aGVtZS9jb2xvclwiXHJcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb3JtYXRcIlxyXG5cclxuXHJcbmNvbnN0IGJ1aWx0SW49J3dlYlNldHRpbmdzLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X3BhcnNlMSh0eXBlKXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYocmVsLnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbdHlwZV09cGFyc2VkKVxyXG5cdFx0XHR9XHJcblx0XHR9KSlcclxuXHR9XHJcblx0X3BhcnNlTm9uQ29udGVudCgpe1xyXG5cdFx0bGV0IGRvYz10aGlzLmRvY1xyXG5cdFx0bGV0IHRyYW5zUHI9e1xyXG5cdFx0XHR2YWxpZGF0b3IoeHBhdGgsY3VycmVudFZhbHVlLCBuZXdWYWx1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGRvYy5vblRvUHJvcGVydHkobmV3VmFsdWUsIHhwYXRoLnNwbGl0KCcvJykucG9wKCkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2UxKFwic2V0dGluZ3NcIikudGhlbihhPT50aGlzLl9wYXJzZTEoXCJ0aGVtZVwiLHRyYW5zUHIpKS50aGVuKGE9PntcclxuXHRcdFx0dGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mb250U2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLnRoZW1lRm9udExhbmcnLGZhbHNlKVswXS4kKVxyXG5cdFx0XHR0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuY2xyU2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmNsclNjaGVtZU1hcHBpbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mbXRTY2hlbWUnKSlcclxuXHRcdH0pLnRoZW4oYT0+e1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0LCAocmVsLnR5cGU9PSdzdHlsZXMnIHx8IHJlbC50eXBlPT0nbnVtYmVyaW5nJykgPyB0cmFuc1ByIDogbnVsbClcclxuXHRcdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5maWx0ZXIoYT0+YSkpLnRoZW4oYT0+e1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVzPW5ldyBTdHlsZXModGhpcy5zdHlsZXMsIHRoaXMuZG9jKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0cGFyc2UoKXtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJzZU5vbkNvbnRlbnQoKS50aGVuKGE9PntcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHR0aGlzLmdldENvbnRlbnRTdHJlYW0oKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZSkgJiYgcHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRwcj1ub2RlXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpib2R5JzpcclxuXHRcdFx0XHRcdFx0Ym9keT1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpzZWN0UHInOlxyXG5cdFx0XHRcdFx0XHRzZWN0PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQpXHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMuZG9jLnRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdCl7XHJcblx0XHRcdFx0XHRcdFx0aWYodGFnLnN1YnN0cigtMik9PSdQcicpXHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXNbdHlwZV09cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHRzZWN0PXByb3BlcnR5XHJcblxyXG5cdFx0XHRcdFx0XHRwcj1udWxsXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdFx0bGV0IHZhbHVlPXRoaXMuZG9jLm9uVG9Qcm9wZXJ0eSh0aGlzLmFzWG1sT2JqZWN0KGN1cnJlbnQpLHR5cGUpXHJcblx0XHRcdFx0XHRcdGlmKHBhcmVudFt0eXBlXT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT12YWx1ZVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKEFycmF5LmlzQXJyYXkocGFyZW50W3R5cGVdKSlcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV0ucHVzaCh2YWx1ZSlcclxuXHRcdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV09W3BhcmVudFt0eXBlXSx2YWx1ZV1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYoY3VycmVudD09Ym9keSAmJiBzZWN0IT1udWxsKXtcclxuXHRcdFx0XHRcdFx0c2VjdGlvbnMucHVzaCh7bmFtZTonc2VjdGlvbicsIGF0dHJpYnV0ZXM6IHNlY3QsIGNoaWxkcmVuOiBib2R5LmNoaWxkcmVuLnNwbGljZSgwKX0pXHJcblx0XHRcdFx0XHRcdHNlY3Q9bnVsbFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImVuZFwiLCBhPT57XHJcblx0XHRcdFx0XHR0aGlzLnBhcnNlSGVhZGVyRm9vdGVyKHNlY3Rpb25zKVxyXG5cdFx0XHRcdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXN9PWN1cnJlbnRcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXNlY3Rpb25zXHJcblx0XHRcdFx0XHRcdFx0YnVpbHRJbi5mb3JFYWNoKGE9PmF0dHJpYnV0ZXNbYV09dGhpc1thXSlcclxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXRoaXMuc3R5bGVzLmdldERlZmF1bHQoXCJkb2N1bWVudFwiKVxyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50KSlcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXRleHRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cGFyc2VIZWFkZXJGb290ZXIoc2VjdGlvbnMpe1xyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHNlY3Rpb25zLm1hcCgoc2VjdGlvbixpKT0+e1xyXG5cdFx0XHRjb25zdCB7YXR0cmlidXRlczpwcm9wcywgY2hpbGRyZW59PXNlY3Rpb25cclxuXHRcdFx0bGV0IHtoZWFkZXJSZWZlcmVuY2UsIGZvb3RlclJlZmVyZW5jZX09cHJvcHNcclxuXHRcdFx0bGV0IGhlYWRlcnM9W10sIGZvb3RlcnM9W11cclxuXHRcdFx0aWYoaGVhZGVyUmVmZXJlbmNlKXtcclxuXHRcdFx0XHRpZighQXJyYXkuaXNBcnJheShoZWFkZXJSZWZlcmVuY2UpKVxyXG5cdFx0XHRcdFx0aGVhZGVyUmVmZXJlbmNlPVtoZWFkZXJSZWZlcmVuY2VdXHJcblx0XHRcdFx0aGVhZGVycz1oZWFkZXJSZWZlcmVuY2UubWFwKGE9PntcclxuXHRcdFx0XHRcdGNvbnN0IHskOntpZCwgdHlwZX19PWFcclxuXHRcdFx0XHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5yZWxzW2lkXS50YXJnZXQsIHRoaXMuZG9jLCB0eXBlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnQucGFyc2UoKS50aGVuKHJvb3Q9PmNoaWxkcmVuLnNwbGljZSgwLDAscm9vdCkpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRkZWxldGUgcHJvcHMuaGVhZGVyUmVmZXJlbmNlXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGZvb3RlclJlZmVyZW5jZSl7XHJcblx0XHRcdFx0aWYoIUFycmF5LmlzQXJyYXkoZm9vdGVyUmVmZXJlbmNlKSlcclxuXHRcdFx0XHRcdGZvb3RlclJlZmVyZW5jZT1bZm9vdGVyUmVmZXJlbmNlXVxyXG5cdFx0XHRcdGZvb3RlcnM9Zm9vdGVyUmVmZXJlbmNlLm1hcChhPT57XHJcblx0XHRcdFx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1hXHJcblx0XHRcdFx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMucmVsc1tpZF0udGFyZ2V0LCB0aGlzLmRvYywgdHlwZSlcclxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnBhcnNlKCkudGhlbihyb290PT5jaGlsZHJlbi5zcGxpY2UoMCwwLHJvb3QpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0ZGVsZXRlIHByb3BzLmZvb3RlclJlZmVyZW5jZVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoWy4uLmhlYWRlcnMsIC4uLmZvb3RlcnNdKVxyXG5cdFx0XHRcdC50aGVuKGE9PnNlY3Rpb25zLnNwbGljZShpLDEsdGhpcy5kb2MuY3JlYXRlRWxlbWVudChzZWN0aW9uKSkpXHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuIl19