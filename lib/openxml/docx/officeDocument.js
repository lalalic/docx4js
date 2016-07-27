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
					_this3.styles = new _styles2.default(_this3.styles, _this3.numbering);
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
							attributes.settings = _this4.settings;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFHQSxJQUFNLFVBQVEsOEVBQThFLEtBQTlFLENBQW9GLEdBQXBGLENBQVI7Ozs7Ozs7Ozs7Ozs7MEJBRUcsTUFBSzs7O0FBQ1osVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxJQUFJLElBQUosSUFBVSxJQUFWLEVBQWU7QUFDakIsWUFBTyxPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLElBQUksTUFBSixDQUF2QixDQUNMLElBREssQ0FDQTthQUFRLE9BQUssSUFBTCxJQUFXLE1BQVg7TUFBUixDQURQLENBRGlCO0tBQWxCO0lBRjZDLENBQXZDLENBQVAsQ0FEWTs7OztxQ0FTSzs7O0FBQ2pCLE9BQUksTUFBSSxLQUFLLEdBQUwsQ0FEUztBQUVqQixPQUFJLFVBQVE7QUFDWCxrQ0FBVSxPQUFNLGNBQWMsVUFBUztBQUN0QyxZQUFPLElBQUksWUFBSixDQUFpQixRQUFqQixFQUEyQixNQUFNLEtBQU4sQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQTNCLENBQVAsQ0FEc0M7S0FENUI7SUFBUixDQUZhOztBQVFqQixVQUFPLEtBQUssT0FBTCxDQUFhLFVBQWIsRUFBeUIsSUFBekIsQ0FBOEI7V0FBRyxPQUFLLE9BQUwsQ0FBYSxPQUFiLEVBQXFCLE9BQXJCO0lBQUgsQ0FBOUIsQ0FBZ0UsSUFBaEUsQ0FBcUUsYUFBRztBQUM5RSxXQUFLLFNBQUwsR0FBZSxtQkFBYyxPQUFLLEtBQUwsQ0FBVyxHQUFYLENB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QjtPQUFOLENBQXpCLENBSDhCO01BQUgsQ0FBNUIsQ0FIa0I7QUFRbEIsWUFBTyxNQUFNLGVBQU4sQ0FSVztLQUFuQjs7QUFXQSxXQUFPLFFBQVEsR0FBUiw4QkFBZ0IsNkJBQVksU0FBNUIsRUFDTCxJQURLLENBQ0E7WUFBRyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixPQUF2QixDQUFwQjtLQUFILENBRFAsQ0ExQjRDO0lBQWIsQ0FBekIsQ0FBUCxDQUQwQiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFzc1Rocm91Z2h9IGZyb20gXCJzdHJlYW1cIlxyXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcclxuaW1wb3J0IEhlYWRlckZvb3RlciBmcm9tIFwiLi9oZWFkZXJGb290ZXJcIlxyXG5cclxuaW1wb3J0IEZvbnRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb250XCJcclxuaW1wb3J0IENvbG9yVGhlbWUgZnJvbSBcIi4vdGhlbWUvY29sb3JcIlxyXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSBcIi4vdGhlbWUvZm9ybWF0XCJcclxuXHJcblxyXG5jb25zdCBidWlsdEluPSd3ZWJTZXR0aW5ncyxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9wYXJzZTEodHlwZSl7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0bGV0IHJlbD10aGlzLnJlbHNbaWRdXHJcblx0XHRcdGlmKHJlbC50eXBlPT10eXBlKXtcclxuXHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0KVxyXG5cdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3R5cGVdPXBhcnNlZClcclxuXHRcdFx0fVxyXG5cdFx0fSkpXHJcblx0fVxyXG5cdF9wYXJzZU5vbkNvbnRlbnQoKXtcclxuXHRcdGxldCBkb2M9dGhpcy5kb2NcclxuXHRcdGxldCB0cmFuc1ByPXtcclxuXHRcdFx0dmFsaWRhdG9yKHhwYXRoLGN1cnJlbnRWYWx1ZSwgbmV3VmFsdWUpe1xyXG5cdFx0XHRcdHJldHVybiBkb2Mub25Ub1Byb3BlcnR5KG5ld1ZhbHVlLCB4cGF0aC5zcGxpdCgnLycpLnBvcCgpKVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcnNlMShcInNldHRpbmdzXCIpLnRoZW4oYT0+dGhpcy5fcGFyc2UxKFwidGhlbWVcIix0cmFuc1ByKSkudGhlbihhPT57XHJcblx0XHRcdHRoaXMuZm9udFRoZW1lPW5ldyBGb250VGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuZm9udFNjaGVtZScpLHRoaXMuc2V0dGluZ3MuZ2V0KCdzZXR0aW5ncy50aGVtZUZvbnRMYW5nJyxmYWxzZSlbMF0uJClcclxuXHRcdFx0dGhpcy5jb2xvclRoZW1lPW5ldyBDb2xvclRoZW1lKHRoaXMudGhlbWUuZ2V0KCd0aGVtZS50aGVtZUVsZW1lbnRzLmNsclNjaGVtZScpLHRoaXMuc2V0dGluZ3MuZ2V0KCdzZXR0aW5ncy5jbHJTY2hlbWVNYXBwaW5nJykuJClcclxuXHRcdFx0dGhpcy5mb3JtYXRUaGVtZT1uZXcgRm9ybWF0VGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuZm10U2NoZW1lJykpXHJcblx0XHR9KS50aGVuKGE9PntcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGlkPT57XHJcblx0XHRcdFx0bGV0IHJlbD10aGlzLnJlbHNbaWRdXHJcblx0XHRcdFx0aWYoYnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEpe1xyXG5cdFx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQocmVsLnRhcmdldCwgKHJlbC50eXBlPT0nc3R5bGVzJyB8fCByZWwudHlwZT09J251bWJlcmluZycpID8gdHJhbnNQciA6IG51bGwpXHJcblx0XHRcdFx0XHRcdC50aGVuKHBhcnNlZD0+dGhpc1tyZWwudHlwZV09cGFyc2VkKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSkuZmlsdGVyKGE9PmEpKS50aGVuKGE9PntcclxuXHRcdFx0XHR0aGlzLnN0eWxlcz1uZXcgU3R5bGVzKHRoaXMuc3R5bGVzLCB0aGlzLm51bWJlcmluZylcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdHBhcnNlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2VOb25Db250ZW50KCkudGhlbihhPT57XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XHJcblx0XHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdFx0Y2hpbGRyZW46W11cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IGJvZHk9bnVsbCwgc2VjdD1udWxsLCBwcj1udWxsLCBjdXJyZW50PXJvb3RcclxuXHRcdFx0XHRsZXQgc2VjdGlvbnM9W11cclxuXHJcblx0XHRcdFx0dGhpcy5nZXRDb250ZW50U3RyZWFtKClcclxuXHRcdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRcdG5vZGUucGFyZW50PWN1cnJlbnRcclxuXHRcdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRpZih0aGlzLmRvYy5pc1Byb3BlcnR5KG5vZGUpICYmIHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0cHI9bm9kZVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0XHRub2RlLnBhcmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XHJcblx0XHRcdFx0XHRcdGJvZHk9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6c2VjdFByJzpcclxuXHRcdFx0XHRcdFx0c2VjdD1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdGlmKHRhZz09J3c6ZG9jdW1lbnQnKVxyXG5cdFx0XHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0bGV0IGVsZW1lbnQ9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50KVxyXG5cclxuXHRcdFx0XHRcdFx0cGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwxLGVsZW1lbnQpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHR9ZWxzZSBpZihjdXJyZW50PT1wcil7XHJcblx0XHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRcdGxldCBwcm9wZXJ0eT10aGlzLmRvYy50b1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdFx0aWYocHIhPXNlY3Qpe1xyXG5cdFx0XHRcdFx0XHRcdGlmKHRhZy5zdWJzdHIoLTIpPT0nUHInKVxyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzW3R5cGVdPXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdFx0c2VjdD1wcm9wZXJ0eVxyXG5cclxuXHRcdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLmRvYy5vblRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0XHRpZihwYXJlbnRbdHlwZV09PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV09dmFsdWVcclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KHBhcmVudFt0eXBlXSkpXHJcblx0XHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdLnB1c2godmFsdWUpXHJcblx0XHRcdFx0XHRcdGVsc2UgXHJcblx0XHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdPVtwYXJlbnRbdHlwZV0sdmFsdWVdXHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdGlmKGN1cnJlbnQ9PWJvZHkgJiYgc2VjdCE9bnVsbCl7XHJcblx0XHRcdFx0XHRcdHNlY3Rpb25zLnB1c2goe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9KVxyXG5cdFx0XHRcdFx0XHRzZWN0PW51bGxcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0dGhpcy5wYXJzZUhlYWRlckZvb3RlcihzZWN0aW9ucylcclxuXHRcdFx0XHRcdFx0LnRoZW4oYT0+e1xyXG5cdFx0XHRcdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzfT1jdXJyZW50XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj1zZWN0aW9uc1xyXG5cdFx0XHRcdFx0XHRcdGJ1aWx0SW4uZm9yRWFjaChhPT5hdHRyaWJ1dGVzW2FdPXRoaXNbYV0pXHJcblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5zZXR0aW5ncz10aGlzLnNldHRpbmdzXHJcblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5kaXJlY3RTdHlsZT10aGlzLnN0eWxlcy5nZXREZWZhdWx0KFwiZG9jdW1lbnRcIilcclxuXHRcdFx0XHRcdFx0XHRyZXNvbHZlKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudCkpXHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJ0ZXh0XCIsIHRleHQ9PntcclxuXHRcdFx0XHRcdGlmKGN1cnJlbnQubmFtZT09XCJ3OnRcIilcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj10ZXh0XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fSlcclxuXHRcdH0pXHJcblx0fVxyXG5cdFxyXG5cdHBhcnNlSGVhZGVyRm9vdGVyKHNlY3Rpb25zKXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChzZWN0aW9ucy5tYXAoKHNlY3Rpb24saSk9PntcclxuXHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXM6cHJvcHMsIGNoaWxkcmVufT1zZWN0aW9uXHJcblx0XHRcdGxldCB7aGVhZGVyUmVmZXJlbmNlLCBmb290ZXJSZWZlcmVuY2V9PXByb3BzXHJcblx0XHRcdGxldCBoZWFkZXJzPVtdLCBmb290ZXJzPVtdXHJcblx0XHRcdGlmKGhlYWRlclJlZmVyZW5jZSl7XHJcblx0XHRcdFx0aWYoIUFycmF5LmlzQXJyYXkoaGVhZGVyUmVmZXJlbmNlKSlcclxuXHRcdFx0XHRcdGhlYWRlclJlZmVyZW5jZT1baGVhZGVyUmVmZXJlbmNlXVxyXG5cdFx0XHRcdGhlYWRlcnM9aGVhZGVyUmVmZXJlbmNlLm1hcChhPT57XHJcblx0XHRcdFx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1hXHJcblx0XHRcdFx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMucmVsc1tpZF0udGFyZ2V0LCB0aGlzLmRvYywgdHlwZSlcclxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnBhcnNlKCkudGhlbihyb290PT5jaGlsZHJlbi5zcGxpY2UoMCwwLHJvb3QpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0ZGVsZXRlIHByb3BzLmhlYWRlclJlZmVyZW5jZVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRpZihmb290ZXJSZWZlcmVuY2Upe1xyXG5cdFx0XHRcdGlmKCFBcnJheS5pc0FycmF5KGZvb3RlclJlZmVyZW5jZSkpXHJcblx0XHRcdFx0XHRmb290ZXJSZWZlcmVuY2U9W2Zvb3RlclJlZmVyZW5jZV1cclxuXHRcdFx0XHRmb290ZXJzPWZvb3RlclJlZmVyZW5jZS5tYXAoYT0+e1xyXG5cdFx0XHRcdFx0Y29uc3QgeyQ6e2lkLCB0eXBlfX09YVxyXG5cdFx0XHRcdFx0bGV0IHBhcnQ9bmV3IEhlYWRlckZvb3Rlcih0aGlzLnJlbHNbaWRdLnRhcmdldCwgdGhpcy5kb2MsIHR5cGUpXHJcblx0XHRcdFx0XHRyZXR1cm4gcGFydC5wYXJzZSgpLnRoZW4ocm9vdD0+Y2hpbGRyZW4uc3BsaWNlKDAsMCxyb290KSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdGRlbGV0ZSBwcm9wcy5mb290ZXJSZWZlcmVuY2VcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFsuLi5oZWFkZXJzLCAuLi5mb290ZXJzXSlcclxuXHRcdFx0XHQudGhlbihhPT5zZWN0aW9ucy5zcGxpY2UoaSwxLHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoc2VjdGlvbikpKVxyXG5cdFx0fSkpXHJcblx0fVxyXG59XHJcbiJdfQ==