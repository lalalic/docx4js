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
						var _current = current;
						var attributes = _current.attributes;
						var parent = _current.parent;
						var children = _current.children;
						var local = _current.local;
						var name = _current.name;

						if (pr == null) {
							var index = parent.children.indexOf(current);
							attributes.key = index;
							if (tag == 'w:document') {
								current.children = sections;
								builtIn.forEach(function (a) {
									return attributes[a] = _this4[a];
								});
								attributes.directStyle = _this4.styles.getDefault("document");
							}
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
							sections.push(_this4.doc.createElement({ name: 'section', attributes: sect, children: body.children.splice(0) }));
							sect = null;
						}
					}).on("end", function (a) {
						resolve(root.children[0]);
					}).on("text", function (text) {
						if (current.name == "w:t") current.children = text;
					});
				});
			});
		}
	}]);

	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBLElBQU0sVUFBUSw4RUFBOEUsS0FBOUUsQ0FBb0YsR0FBcEYsQ0FBUjs7Ozs7Ozs7Ozs7OzswQkFFRyxNQUFLOzs7QUFDWixVQUFPLFFBQVEsR0FBUixDQUFZLE9BQU8sSUFBUCxDQUFZLEtBQUssSUFBTCxDQUFaLENBQXVCLEdBQXZCLENBQTJCLGNBQUk7QUFDakQsUUFBSSxNQUFJLE9BQUssSUFBTCxDQUFVLEVBQVYsQ0FBSixDQUQ2QztBQUVqRCxRQUFHLElBQUksSUFBSixJQUFVLElBQVYsRUFBZTtBQUNqQixZQUFPLE9BQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxNQUFKLENBQXZCLENBQ0wsSUFESyxDQUNBO2FBQVEsT0FBSyxJQUFMLElBQVcsTUFBWDtNQUFSLENBRFAsQ0FEaUI7S0FBbEI7SUFGNkMsQ0FBdkMsQ0FBUCxDQURZOzs7O3FDQVNLOzs7QUFDakIsT0FBSSxNQUFJLEtBQUssR0FBTCxDQURTO0FBRWpCLE9BQUksVUFBUTtBQUNYLGtDQUFVLE9BQU0sY0FBYyxVQUFTO0FBQ3RDLFlBQU8sSUFBSSxZQUFKLENBQWlCLFFBQWpCLEVBQTJCLE1BQU0sS0FBTixDQUFZLEdBQVosRUFBaUIsR0FBakIsRUFBM0IsQ0FBUCxDQURzQztLQUQ1QjtJQUFSLENBRmE7O0FBUWpCLFVBQU8sS0FBSyxPQUFMLENBQWEsVUFBYixFQUF5QixJQUF6QixDQUE4QjtXQUFHLE9BQUssT0FBTCxDQUFhLE9BQWIsRUFBcUIsT0FBckI7SUFBSCxDQUE5QixDQUFnRSxJQUFoRSxDQUFxRSxhQUFHO0FBQzlFLFdBQUssU0FBTCxHQUFlLG1CQUFjLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxnQ0FBZixD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LENBRkE7QUFHSixXQUFHLE9BQU8sS0FBUCxLQUFjLFNBQWQsRUFDRixPQUFPLEtBQVAsSUFBYSxLQUFiLENBREQsS0FFSyxJQUFHLE1BQU0sT0FBTixDQUFjLE9BQU8sS0FBUCxDQUFkLENBQUgsRUFDSixPQUFPLEtBQVAsRUFBYSxJQUFiLENBQWtCLEtBQWxCLEVBREksS0FHSixPQUFPLEtBQVAsSUFBYSxDQUFDLE9BQU8sS0FBUCxDQUFELEVBQWMsS0FBZCxDQUFiLENBSEk7O0FBS0wsaUJBQVEsTUFBUixDQVZJO09BYkM7O0FBMEJOLFVBQUcsV0FBUyxJQUFULElBQWlCLFFBQU0sSUFBTixFQUFXO0FBQzlCLGdCQUFTLElBQVQsQ0FBYyxPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLEVBQUMsTUFBSyxTQUFMLEVBQWdCLFlBQVksSUFBWixFQUFrQixVQUFVLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBVixFQUExRCxDQUFkLEVBRDhCO0FBRTlCLGNBQUssSUFBTCxDQUY4QjtPQUEvQjtNQXhDYyxDQXRCZixDQW9FQyxFQXBFRCxDQW9FSSxLQXBFSixFQW9FVyxhQUFHO0FBQ2IsY0FBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVIsRUFEYTtNQUFILENBcEVYLENBdUVDLEVBdkVELENBdUVJLE1BdkVKLEVBdUVZLGdCQUFNO0FBQ2pCLFVBQUcsUUFBUSxJQUFSLElBQWMsS0FBZCxFQUNGLFFBQVEsUUFBUixHQUFpQixJQUFqQixDQUREO01BRFcsQ0F2RVosQ0FQMkI7S0FBVCxDQUFuQixDQURzQztJQUFILENBQXBDLENBRE0iLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcclxuaW1wb3J0IHNheCBmcm9tIFwic2F4XCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXHJcblxyXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gXCIuL3RoZW1lL2ZvbnRcIlxyXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tIFwiLi90aGVtZS9jb2xvclwiXHJcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb3JtYXRcIlxyXG5cclxuXHJcbmNvbnN0IGJ1aWx0SW49J3dlYlNldHRpbmdzLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X3BhcnNlMSh0eXBlKXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYocmVsLnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbdHlwZV09cGFyc2VkKVxyXG5cdFx0XHR9XHJcblx0XHR9KSlcclxuXHR9XHJcblx0X3BhcnNlTm9uQ29udGVudCgpe1xyXG5cdFx0bGV0IGRvYz10aGlzLmRvY1xyXG5cdFx0bGV0IHRyYW5zUHI9e1xyXG5cdFx0XHR2YWxpZGF0b3IoeHBhdGgsY3VycmVudFZhbHVlLCBuZXdWYWx1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGRvYy5vblRvUHJvcGVydHkobmV3VmFsdWUsIHhwYXRoLnNwbGl0KCcvJykucG9wKCkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2UxKFwic2V0dGluZ3NcIikudGhlbihhPT50aGlzLl9wYXJzZTEoXCJ0aGVtZVwiLHRyYW5zUHIpKS50aGVuKGE9PntcclxuXHRcdFx0dGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mb250U2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLnRoZW1lRm9udExhbmcnLGZhbHNlKVswXS4kKVxyXG5cdFx0XHR0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuY2xyU2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmNsclNjaGVtZU1hcHBpbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mbXRTY2hlbWUnKSlcclxuXHRcdH0pLnRoZW4oYT0+e1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0LCAocmVsLnR5cGU9PSdzdHlsZXMnIHx8IHJlbC50eXBlPT0nbnVtYmVyaW5nJykgPyB0cmFuc1ByIDogbnVsbClcclxuXHRcdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5maWx0ZXIoYT0+YSkpLnRoZW4oYT0+e1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVzPW5ldyBTdHlsZXModGhpcy5zdHlsZXMsIHRoaXMuZG9jKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0cGFyc2UoKXtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJzZU5vbkNvbnRlbnQoKS50aGVuKGE9PntcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHR0aGlzLmdldENvbnRlbnRTdHJlYW0oKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZSkgJiYgcHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRwcj1ub2RlXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpib2R5JzpcclxuXHRcdFx0XHRcdFx0Ym9keT1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpzZWN0UHInOlxyXG5cdFx0XHRcdFx0XHRzZWN0PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRcdGlmKHRhZz09J3c6ZG9jdW1lbnQnKXtcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXNlY3Rpb25zXHJcblx0XHRcdFx0XHRcdFx0YnVpbHRJbi5mb3JFYWNoKGE9PmF0dHJpYnV0ZXNbYV09dGhpc1thXSlcclxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXRoaXMuc3R5bGVzLmdldERlZmF1bHQoXCJkb2N1bWVudFwiKVxyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudClcclxuXHJcblx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0XHRsZXQgdHlwZT10YWcuc3BsaXQoJzonKS5wb3AoKVxyXG5cdFx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy5kb2MudG9Qcm9wZXJ0eSh0aGlzLmFzWG1sT2JqZWN0KGN1cnJlbnQpLHR5cGUpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRcdGlmKHByIT1zZWN0KXtcclxuXHRcdFx0XHRcdFx0XHRpZih0YWcuc3Vic3RyKC0yKT09J1ByJylcclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcy5kaXJlY3RTdHlsZT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlc1t0eXBlXT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHNlY3Q9cHJvcGVydHlcclxuXHJcblx0XHRcdFx0XHRcdHByPW51bGxcclxuXHRcdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0XHRsZXQgdHlwZT10YWcuc3BsaXQoJzonKS5wb3AoKVxyXG5cdFx0XHRcdFx0XHRsZXQgdmFsdWU9dGhpcy5kb2Mub25Ub1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdFx0aWYocGFyZW50W3R5cGVdPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdPXZhbHVlXHJcblx0XHRcdFx0XHRcdGVsc2UgaWYoQXJyYXkuaXNBcnJheShwYXJlbnRbdHlwZV0pKVxyXG5cdFx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXS5wdXNoKHZhbHVlKVxyXG5cdFx0XHRcdFx0XHRlbHNlIFxyXG5cdFx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT1bcGFyZW50W3R5cGVdLHZhbHVlXVxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9KSlcclxuXHRcdFx0XHRcdFx0c2VjdD1udWxsXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiZW5kXCIsIGE9PntcclxuXHRcdFx0XHRcdHJlc29sdmUocm9vdC5jaGlsZHJlblswXSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXRleHRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19