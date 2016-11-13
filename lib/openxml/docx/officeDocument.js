"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

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

var builtIn = 'webSettings,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');

var _class = function (_Part) {
	(0, _inherits3.default)(_class, _Part);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "_parse1",
		value: function _parse1(type) {
			var _this2 = this;

			return _promise2.default.all((0, _keys2.default)(this.rels).map(function (id) {
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
				return _promise2.default.all((0, _keys2.default)(_this3.rels).map(function (id) {
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
				return new _promise2.default(function (resolve) {
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

			return _promise2.default.all(sections.map(function (section, i) {
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

				return _promise2.default.all([].concat((0, _toConsumableArray3.default)(headers), (0, _toConsumableArray3.default)(footers))).then(function (a) {
					return sections.splice(i, 1, _this5.doc.createElement(section));
				});
			}));
		}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiYnVpbHRJbiIsInNwbGl0IiwidHlwZSIsImFsbCIsInJlbHMiLCJtYXAiLCJyZWwiLCJpZCIsImRvYyIsImdldE9iamVjdFBhcnQiLCJ0YXJnZXQiLCJ0aGVuIiwicGFyc2VkIiwidHJhbnNQciIsInZhbGlkYXRvciIsInhwYXRoIiwiY3VycmVudFZhbHVlIiwibmV3VmFsdWUiLCJvblRvUHJvcGVydHkiLCJwb3AiLCJfcGFyc2UxIiwiZm9udFRoZW1lIiwidGhlbWUiLCJnZXQiLCJzZXR0aW5ncyIsIiQiLCJjb2xvclRoZW1lIiwiZm9ybWF0VGhlbWUiLCJpbmRleE9mIiwiZmlsdGVyIiwiYSIsInN0eWxlcyIsIm51bWJlcmluZyIsIl9wYXJzZU5vbkNvbnRlbnQiLCJyb290IiwiY2hpbGRyZW4iLCJib2R5Iiwic2VjdCIsInByIiwiY3VycmVudCIsInNlY3Rpb25zIiwiZ2V0Q29udGVudFN0cmVhbSIsIm9uIiwibm9kZSIsInBhcmVudCIsImlzUHJvcGVydHkiLCJwdXNoIiwibmFtZSIsInRhZyIsImF0dHJpYnV0ZXMiLCJsb2NhbCIsImluZGV4Iiwia2V5IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcGxpY2UiLCJwcm9wZXJ0eSIsInRvUHJvcGVydHkiLCJhc1htbE9iamVjdCIsInN1YnN0ciIsImRpcmVjdFN0eWxlIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJwYXJzZUhlYWRlckZvb3RlciIsImZvckVhY2giLCJnZXREZWZhdWx0IiwicmVzb2x2ZSIsInRleHQiLCJzZWN0aW9uIiwiaSIsInByb3BzIiwiaGVhZGVyUmVmZXJlbmNlIiwiZm9vdGVyUmVmZXJlbmNlIiwiaGVhZGVycyIsImZvb3RlcnMiLCJwYXJ0IiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUdBLElBQU1BLFVBQVEsOEVBQThFQyxLQUE5RSxDQUFvRixHQUFwRixDQUFkOzs7Ozs7Ozs7Ozs7MEJBRVNDLEksRUFBSztBQUFBOztBQUNaLFVBQU8sa0JBQVFDLEdBQVIsQ0FBWSxvQkFBWSxLQUFLQyxJQUFqQixFQUF1QkMsR0FBdkIsQ0FBMkIsY0FBSTtBQUNqRCxRQUFJQyxNQUFJLE9BQUtGLElBQUwsQ0FBVUcsRUFBVixDQUFSO0FBQ0EsUUFBR0QsSUFBSUosSUFBSixJQUFVQSxJQUFiLEVBQWtCO0FBQ2pCLFlBQU8sT0FBS00sR0FBTCxDQUFTQyxhQUFULENBQXVCSCxJQUFJSSxNQUEzQixFQUNMQyxJQURLLENBQ0E7QUFBQSxhQUFRLE9BQUtULElBQUwsSUFBV1UsTUFBbkI7QUFBQSxNQURBLENBQVA7QUFFQTtBQUNELElBTmtCLENBQVosQ0FBUDtBQU9BOzs7cUNBQ2lCO0FBQUE7O0FBQ2pCLE9BQUlKLE1BQUksS0FBS0EsR0FBYjtBQUNBLE9BQUlLLFVBQVE7QUFDWEMsYUFEVyxxQkFDREMsS0FEQyxFQUNLQyxZQURMLEVBQ21CQyxRQURuQixFQUM0QjtBQUN0QyxZQUFPVCxJQUFJVSxZQUFKLENBQWlCRCxRQUFqQixFQUEyQkYsTUFBTWQsS0FBTixDQUFZLEdBQVosRUFBaUJrQixHQUFqQixFQUEzQixDQUFQO0FBQ0E7QUFIVSxJQUFaOztBQU1BLFVBQU8sS0FBS0MsT0FBTCxDQUFhLFVBQWIsRUFBeUJULElBQXpCLENBQThCO0FBQUEsV0FBRyxPQUFLUyxPQUFMLENBQWEsT0FBYixFQUFxQlAsT0FBckIsQ0FBSDtBQUFBLElBQTlCLEVBQWdFRixJQUFoRSxDQUFxRSxhQUFHO0FBQzlFLFdBQUtVLFNBQUwsR0FBZSxtQkFBYyxPQUFLQyxLQUFMLENBQVdDLEdBQVgsQ0FBZSxnQ0FBZixDQUFkLEVBQStELE9BQUtDLFFBQUwsQ0FBY0QsR0FBZCxDQUFrQix3QkFBbEIsRUFBMkMsS0FBM0MsRUFBa0QsQ0FBbEQsRUFBcURFLENBQXBILENBQWY7QUFDQSxXQUFLQyxVQUFMLEdBQWdCLG9CQUFlLE9BQUtKLEtBQUwsQ0FBV0MsR0FBWCxDQUFlLCtCQUFmLENBQWYsRUFBK0QsT0FBS0MsUUFBTCxDQUFjRCxHQUFkLENBQWtCLDJCQUFsQixFQUErQ0UsQ0FBOUcsQ0FBaEI7QUFDQSxXQUFLRSxXQUFMLEdBQWlCLHFCQUFnQixPQUFLTCxLQUFMLENBQVdDLEdBQVgsQ0FBZSwrQkFBZixDQUFoQixDQUFqQjtBQUNBLElBSk0sRUFJSlosSUFKSSxDQUlDLGFBQUc7QUFDVixXQUFPLGtCQUFRUixHQUFSLENBQVksb0JBQVksT0FBS0MsSUFBakIsRUFBdUJDLEdBQXZCLENBQTJCLGNBQUk7QUFDakQsU0FBSUMsTUFBSSxPQUFLRixJQUFMLENBQVVHLEVBQVYsQ0FBUjtBQUNBLFNBQUdQLFFBQVE0QixPQUFSLENBQWdCdEIsSUFBSUosSUFBcEIsS0FBMkIsQ0FBQyxDQUEvQixFQUFpQztBQUNoQyxhQUFPLE9BQUtNLEdBQUwsQ0FBU0MsYUFBVCxDQUF1QkgsSUFBSUksTUFBM0IsRUFBb0NKLElBQUlKLElBQUosSUFBVSxRQUFWLElBQXNCSSxJQUFJSixJQUFKLElBQVUsV0FBakMsR0FBZ0RXLE9BQWhELEdBQTBELElBQTdGLEVBQ0xGLElBREssQ0FDQTtBQUFBLGNBQVEsT0FBS0wsSUFBSUosSUFBVCxJQUFlVSxNQUF2QjtBQUFBLE9BREEsQ0FBUDtBQUVBO0FBQ0QsS0FOa0IsRUFNaEJpQixNQU5nQixDQU1UO0FBQUEsWUFBR0MsQ0FBSDtBQUFBLEtBTlMsQ0FBWixFQU1VbkIsSUFOVixDQU1lLGFBQUc7QUFDeEIsWUFBS29CLE1BQUwsR0FBWSxxQkFBVyxPQUFLQSxNQUFoQixFQUF3QixPQUFLQyxTQUE3QixDQUFaO0FBQ0EsS0FSTSxDQUFQO0FBU0EsSUFkTSxDQUFQO0FBZUE7OzswQkFDTTtBQUFBOztBQUNOLFVBQU8sS0FBS0MsZ0JBQUwsR0FBd0J0QixJQUF4QixDQUE2QixhQUFHO0FBQ3RDLFdBQU8sc0JBQVksbUJBQVM7QUFDM0IsU0FBSXVCLE9BQUs7QUFDUkMsZ0JBQVM7QUFERCxNQUFUO0FBR0EsU0FBSUMsT0FBSyxJQUFUO0FBQUEsU0FBZUMsT0FBSyxJQUFwQjtBQUFBLFNBQTBCQyxLQUFHLElBQTdCO0FBQUEsU0FBbUNDLFVBQVFMLElBQTNDO0FBQ0EsU0FBSU0sV0FBUyxFQUFiOztBQUVBLFlBQUtDLGdCQUFMLEdBQ0NDLEVBREQsQ0FDSSxTQURKLEVBQ2UsZ0JBQU07QUFDcEJDLFdBQUtDLE1BQUwsR0FBWUwsT0FBWjtBQUNBQSxnQkFBUUksSUFBUjs7QUFFQSxVQUFHLE9BQUtuQyxHQUFMLENBQVNxQyxVQUFULENBQW9CRixJQUFwQixLQUE2QkwsTUFBSSxJQUFwQyxFQUF5QztBQUN4Q0EsWUFBR0ssSUFBSDtBQUNBOztBQUVELFVBQUdMLE1BQUksSUFBUCxFQUFZO0FBQ1hLLFlBQUtSLFFBQUwsR0FBYyxFQUFkO0FBQ0FRLFlBQUtDLE1BQUwsQ0FBWVQsUUFBWixDQUFxQlcsSUFBckIsQ0FBMEJILElBQTFCO0FBQ0E7QUFDRCxjQUFPQSxLQUFLSSxJQUFaO0FBQ0EsWUFBSyxRQUFMO0FBQ0NYLGVBQUtHLE9BQUw7QUFDRDtBQUNBLFlBQUssVUFBTDtBQUNDRixlQUFLRSxPQUFMO0FBQ0Q7QUFOQTtBQVFBLE1BckJELEVBc0JDRyxFQXRCRCxDQXNCSSxVQXRCSixFQXNCZSxlQUFLO0FBQ25CLFVBQUdNLE9BQUssWUFBUixFQUNDOztBQUZrQixxQkFJOEJULE9BSjlCO0FBQUEsVUFJWlUsVUFKWSxZQUlaQSxVQUpZO0FBQUEsVUFJQUwsTUFKQSxZQUlBQSxNQUpBO0FBQUEsVUFJUVQsUUFKUixZQUlRQSxRQUpSO0FBQUEsVUFJa0JlLEtBSmxCLFlBSWtCQSxLQUpsQjtBQUFBLFVBSXdCSCxJQUp4QixZQUl3QkEsSUFKeEI7O0FBS25CLFVBQUdULE1BQUksSUFBUCxFQUFZO0FBQ1gsV0FBSWEsUUFBTVAsT0FBT1QsUUFBUCxDQUFnQlAsT0FBaEIsQ0FBd0JXLE9BQXhCLENBQVY7QUFDQVUsa0JBQVdHLEdBQVgsR0FBZUQsS0FBZjs7QUFFQSxXQUFJRSxVQUFRLE9BQUs3QyxHQUFMLENBQVM4QyxhQUFULENBQXVCZixPQUF2QixDQUFaOztBQUVBSyxjQUFPVCxRQUFQLENBQWdCb0IsTUFBaEIsQ0FBdUJKLEtBQXZCLEVBQTZCLENBQTdCLEVBQStCRSxPQUEvQjtBQUNBZCxpQkFBUUssTUFBUjtBQUNBLE9BUkQsTUFRTSxJQUFHTCxXQUFTRCxFQUFaLEVBQWU7QUFDcEIsV0FBSXBDLE9BQUs4QyxJQUFJL0MsS0FBSixDQUFVLEdBQVYsRUFBZWtCLEdBQWYsRUFBVDtBQUNBLFdBQUlxQyxXQUFTLE9BQUtoRCxHQUFMLENBQVNpRCxVQUFULENBQW9CLE9BQUtDLFdBQUwsQ0FBaUJuQixPQUFqQixDQUFwQixFQUE4Q3JDLElBQTlDLENBQWI7QUFDQXFDLGlCQUFRSyxNQUFSO0FBQ0EsV0FBR04sTUFBSUQsSUFBUCxFQUFZO0FBQ1gsWUFBR1csSUFBSVcsTUFBSixDQUFXLENBQUMsQ0FBWixLQUFnQixJQUFuQixFQUNDcEIsUUFBUVUsVUFBUixDQUFtQlcsV0FBbkIsR0FBK0JKLFFBQS9CLENBREQsS0FHQ2pCLFFBQVFVLFVBQVIsQ0FBbUIvQyxJQUFuQixJQUF5QnNELFFBQXpCO0FBQ0QsUUFMRCxNQU1DbkIsT0FBS21CLFFBQUw7O0FBRURsQixZQUFHLElBQUg7QUFDQSxPQWJLLE1BYUQ7QUFDSixXQUFJcEMsUUFBSzhDLElBQUkvQyxLQUFKLENBQVUsR0FBVixFQUFla0IsR0FBZixFQUFUO0FBQ0EsV0FBSTBDLFFBQU0sT0FBS3JELEdBQUwsQ0FBU1UsWUFBVCxDQUFzQixPQUFLd0MsV0FBTCxDQUFpQm5CLE9BQWpCLENBQXRCLEVBQWdEckMsS0FBaEQsQ0FBVjtBQUNBLFdBQUcwQyxPQUFPMUMsS0FBUCxLQUFjNEQsU0FBakIsRUFDQ2xCLE9BQU8xQyxLQUFQLElBQWEyRCxLQUFiLENBREQsS0FFSyxJQUFHRSxNQUFNQyxPQUFOLENBQWNwQixPQUFPMUMsS0FBUCxDQUFkLENBQUgsRUFDSjBDLE9BQU8xQyxLQUFQLEVBQWE0QyxJQUFiLENBQWtCZSxLQUFsQixFQURJLEtBR0pqQixPQUFPMUMsS0FBUCxJQUFhLENBQUMwQyxPQUFPMUMsS0FBUCxDQUFELEVBQWMyRCxLQUFkLENBQWI7O0FBRUR0QixpQkFBUUssTUFBUjtBQUNBOztBQUVELFVBQUdMLFdBQVNILElBQVQsSUFBaUJDLFFBQU0sSUFBMUIsRUFBK0I7QUFDOUJHLGdCQUFTTSxJQUFULENBQWMsRUFBQ0MsTUFBSyxTQUFOLEVBQWlCRSxZQUFZWixJQUE3QixFQUFtQ0YsVUFBVUMsS0FBS0QsUUFBTCxDQUFjb0IsTUFBZCxDQUFxQixDQUFyQixDQUE3QyxFQUFkO0FBQ0FsQixjQUFLLElBQUw7QUFDQTtBQUVELE1BbEVELEVBbUVDSyxFQW5FRCxDQW1FSSxLQW5FSixFQW1FVyxhQUFHO0FBQ2IsYUFBS3VCLGlCQUFMLENBQXVCekIsUUFBdkIsRUFDRTdCLElBREYsQ0FDTyxhQUFHO0FBQUEsdUJBQ1c0QixPQURYO0FBQUEsV0FDRFUsVUFEQyxhQUNEQSxVQURDOztBQUVSVixlQUFRSixRQUFSLEdBQWlCSyxRQUFqQjtBQUNBeEMsZUFBUWtFLE9BQVIsQ0FBZ0I7QUFBQSxlQUFHakIsV0FBV25CLENBQVgsSUFBYyxPQUFLQSxDQUFMLENBQWpCO0FBQUEsUUFBaEI7QUFDQW1CLGtCQUFXekIsUUFBWCxHQUFvQixPQUFLQSxRQUF6QjtBQUNBeUIsa0JBQVdXLFdBQVgsR0FBdUIsT0FBSzdCLE1BQUwsQ0FBWW9DLFVBQVosQ0FBdUIsVUFBdkIsQ0FBdkI7QUFDQUMsZUFBUSxPQUFLNUQsR0FBTCxDQUFTOEMsYUFBVCxDQUF1QmYsT0FBdkIsQ0FBUjtBQUNBLE9BUkY7QUFTQSxNQTdFRCxFQThFQ0csRUE5RUQsQ0E4RUksTUE5RUosRUE4RVksZ0JBQU07QUFDakIsVUFBR0gsUUFBUVEsSUFBUixJQUFjLEtBQWpCLEVBQ0NSLFFBQVFKLFFBQVIsR0FBaUJrQyxJQUFqQjtBQUNELE1BakZEO0FBa0ZBLEtBekZNLENBQVA7QUEwRkEsSUEzRk0sQ0FBUDtBQTRGQTs7O29DQUVpQjdCLFEsRUFBUztBQUFBOztBQUMxQixVQUFPLGtCQUFRckMsR0FBUixDQUFZcUMsU0FBU25DLEdBQVQsQ0FBYSxVQUFDaUUsT0FBRCxFQUFTQyxDQUFULEVBQWE7QUFBQSxRQUMxQkMsS0FEMEIsR0FDVEYsT0FEUyxDQUNyQ3JCLFVBRHFDO0FBQUEsUUFDbkJkLFFBRG1CLEdBQ1RtQyxPQURTLENBQ25CbkMsUUFEbUI7QUFBQSxRQUV2Q3NDLGVBRnVDLEdBRUxELEtBRkssQ0FFdkNDLGVBRnVDO0FBQUEsUUFFdEJDLGVBRnNCLEdBRUxGLEtBRkssQ0FFdEJFLGVBRnNCOztBQUc1QyxRQUFJQyxVQUFRLEVBQVo7QUFBQSxRQUFnQkMsVUFBUSxFQUF4QjtBQUNBLFFBQUdILGVBQUgsRUFBbUI7QUFDbEIsU0FBRyxDQUFDVixNQUFNQyxPQUFOLENBQWNTLGVBQWQsQ0FBSixFQUNDQSxrQkFBZ0IsQ0FBQ0EsZUFBRCxDQUFoQjtBQUNERSxlQUFRRixnQkFBZ0JwRSxHQUFoQixDQUFvQixhQUFHO0FBQUEsaUJBQ1R5QixDQURTLENBQ3ZCTCxDQUR1QjtBQUFBLFVBQ3BCbEIsRUFEb0IsUUFDcEJBLEVBRG9CO0FBQUEsVUFDaEJMLElBRGdCLFFBQ2hCQSxJQURnQjs7QUFFOUIsVUFBSTJFLE9BQUssMkJBQWlCLE9BQUt6RSxJQUFMLENBQVVHLEVBQVYsRUFBY0csTUFBL0IsRUFBdUMsT0FBS0YsR0FBNUMsRUFBaUROLElBQWpELENBQVQ7QUFDQSxhQUFPMkUsS0FBS0MsS0FBTCxHQUFhbkUsSUFBYixDQUFrQjtBQUFBLGNBQU13QixTQUFTb0IsTUFBVCxDQUFnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQnJCLElBQXBCLENBQU47QUFBQSxPQUFsQixDQUFQO0FBQ0EsTUFKTyxDQUFSO0FBS0EsWUFBT3NDLE1BQU1DLGVBQWI7QUFDQTs7QUFFRCxRQUFHQyxlQUFILEVBQW1CO0FBQ2xCLFNBQUcsQ0FBQ1gsTUFBTUMsT0FBTixDQUFjVSxlQUFkLENBQUosRUFDQ0Esa0JBQWdCLENBQUNBLGVBQUQsQ0FBaEI7QUFDREUsZUFBUUYsZ0JBQWdCckUsR0FBaEIsQ0FBb0IsYUFBRztBQUFBLGtCQUNUeUIsQ0FEUyxDQUN2QkwsQ0FEdUI7QUFBQSxVQUNwQmxCLEVBRG9CLFNBQ3BCQSxFQURvQjtBQUFBLFVBQ2hCTCxJQURnQixTQUNoQkEsSUFEZ0I7O0FBRTlCLFVBQUkyRSxPQUFLLDJCQUFpQixPQUFLekUsSUFBTCxDQUFVRyxFQUFWLEVBQWNHLE1BQS9CLEVBQXVDLE9BQUtGLEdBQTVDLEVBQWlETixJQUFqRCxDQUFUO0FBQ0EsYUFBTzJFLEtBQUtDLEtBQUwsR0FBYW5FLElBQWIsQ0FBa0I7QUFBQSxjQUFNd0IsU0FBU29CLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0JyQixJQUFwQixDQUFOO0FBQUEsT0FBbEIsQ0FBUDtBQUNBLE1BSk8sQ0FBUjtBQUtBLFlBQU9zQyxNQUFNRSxlQUFiO0FBQ0E7O0FBRUQsV0FBTyxrQkFBUXZFLEdBQVIsNENBQWdCd0UsT0FBaEIsb0NBQTRCQyxPQUE1QixJQUNMakUsSUFESyxDQUNBO0FBQUEsWUFBRzZCLFNBQVNlLE1BQVQsQ0FBZ0JnQixDQUFoQixFQUFrQixDQUFsQixFQUFvQixPQUFLL0QsR0FBTCxDQUFTOEMsYUFBVCxDQUF1QmdCLE9BQXZCLENBQXBCLENBQUg7QUFBQSxLQURBLENBQVA7QUFFQSxJQTVCa0IsQ0FBWixDQUFQO0FBNkJBIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXHJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXHJcbmltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxyXG5pbXBvcnQgSGVhZGVyRm9vdGVyIGZyb20gXCIuL2hlYWRlckZvb3RlclwiXHJcblxyXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gXCIuL3RoZW1lL2ZvbnRcIlxyXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tIFwiLi90aGVtZS9jb2xvclwiXHJcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb3JtYXRcIlxyXG5cclxuXHJcbmNvbnN0IGJ1aWx0SW49J3dlYlNldHRpbmdzLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X3BhcnNlMSh0eXBlKXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYocmVsLnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbdHlwZV09cGFyc2VkKVxyXG5cdFx0XHR9XHJcblx0XHR9KSlcclxuXHR9XHJcblx0X3BhcnNlTm9uQ29udGVudCgpe1xyXG5cdFx0bGV0IGRvYz10aGlzLmRvY1xyXG5cdFx0bGV0IHRyYW5zUHI9e1xyXG5cdFx0XHR2YWxpZGF0b3IoeHBhdGgsY3VycmVudFZhbHVlLCBuZXdWYWx1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGRvYy5vblRvUHJvcGVydHkobmV3VmFsdWUsIHhwYXRoLnNwbGl0KCcvJykucG9wKCkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2UxKFwic2V0dGluZ3NcIikudGhlbihhPT50aGlzLl9wYXJzZTEoXCJ0aGVtZVwiLHRyYW5zUHIpKS50aGVuKGE9PntcclxuXHRcdFx0dGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mb250U2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLnRoZW1lRm9udExhbmcnLGZhbHNlKVswXS4kKVxyXG5cdFx0XHR0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuY2xyU2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmNsclNjaGVtZU1hcHBpbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mbXRTY2hlbWUnKSlcclxuXHRcdH0pLnRoZW4oYT0+e1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0LCAocmVsLnR5cGU9PSdzdHlsZXMnIHx8IHJlbC50eXBlPT0nbnVtYmVyaW5nJykgPyB0cmFuc1ByIDogbnVsbClcclxuXHRcdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5maWx0ZXIoYT0+YSkpLnRoZW4oYT0+e1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVzPW5ldyBTdHlsZXModGhpcy5zdHlsZXMsIHRoaXMubnVtYmVyaW5nKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0cGFyc2UoKXtcclxuXHRcdHJldHVybiB0aGlzLl9wYXJzZU5vbkNvbnRlbnQoKS50aGVuKGE9PntcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHR0aGlzLmdldENvbnRlbnRTdHJlYW0oKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZSkgJiYgcHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRwcj1ub2RlXHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblx0XHRcdFx0XHRcdG5vZGUucGFyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN3aXRjaChub2RlLm5hbWUpe1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpib2R5JzpcclxuXHRcdFx0XHRcdFx0Ym9keT1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0Y2FzZSAndzpzZWN0UHInOlxyXG5cdFx0XHRcdFx0XHRzZWN0PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpXHJcblx0XHRcdFx0XHRcdHJldHVybjtcclxuXHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRcdFxyXG5cdFx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQpXHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMuZG9jLnRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdCl7XHJcblx0XHRcdFx0XHRcdFx0aWYodGFnLnN1YnN0cigtMik9PSdQcicpXHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXNbdHlwZV09cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0XHRzZWN0PXByb3BlcnR5XHJcblxyXG5cdFx0XHRcdFx0XHRwcj1udWxsXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdFx0bGV0IHZhbHVlPXRoaXMuZG9jLm9uVG9Qcm9wZXJ0eSh0aGlzLmFzWG1sT2JqZWN0KGN1cnJlbnQpLHR5cGUpXHJcblx0XHRcdFx0XHRcdGlmKHBhcmVudFt0eXBlXT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT12YWx1ZVxyXG5cdFx0XHRcdFx0XHRlbHNlIGlmKEFycmF5LmlzQXJyYXkocGFyZW50W3R5cGVdKSlcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV0ucHVzaCh2YWx1ZSlcclxuXHRcdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV09W3BhcmVudFt0eXBlXSx2YWx1ZV1cclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0aWYoY3VycmVudD09Ym9keSAmJiBzZWN0IT1udWxsKXtcclxuXHRcdFx0XHRcdFx0c2VjdGlvbnMucHVzaCh7bmFtZTonc2VjdGlvbicsIGF0dHJpYnV0ZXM6IHNlY3QsIGNoaWxkcmVuOiBib2R5LmNoaWxkcmVuLnNwbGljZSgwKX0pXHJcblx0XHRcdFx0XHRcdHNlY3Q9bnVsbFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImVuZFwiLCBhPT57XHJcblx0XHRcdFx0XHR0aGlzLnBhcnNlSGVhZGVyRm9vdGVyKHNlY3Rpb25zKVxyXG5cdFx0XHRcdFx0XHQudGhlbihhPT57XHJcblx0XHRcdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXN9PWN1cnJlbnRcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXNlY3Rpb25zXHJcblx0XHRcdFx0XHRcdFx0YnVpbHRJbi5mb3JFYWNoKGE9PmF0dHJpYnV0ZXNbYV09dGhpc1thXSlcclxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLnNldHRpbmdzPXRoaXMuc2V0dGluZ3NcclxuXHRcdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXRoaXMuc3R5bGVzLmdldERlZmF1bHQoXCJkb2N1bWVudFwiKVxyXG5cdFx0XHRcdFx0XHRcdHJlc29sdmUodGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50KSlcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuPXRleHRcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0XHJcblx0cGFyc2VIZWFkZXJGb290ZXIoc2VjdGlvbnMpe1xyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKHNlY3Rpb25zLm1hcCgoc2VjdGlvbixpKT0+e1xyXG5cdFx0XHRjb25zdCB7YXR0cmlidXRlczpwcm9wcywgY2hpbGRyZW59PXNlY3Rpb25cclxuXHRcdFx0bGV0IHtoZWFkZXJSZWZlcmVuY2UsIGZvb3RlclJlZmVyZW5jZX09cHJvcHNcclxuXHRcdFx0bGV0IGhlYWRlcnM9W10sIGZvb3RlcnM9W11cclxuXHRcdFx0aWYoaGVhZGVyUmVmZXJlbmNlKXtcclxuXHRcdFx0XHRpZighQXJyYXkuaXNBcnJheShoZWFkZXJSZWZlcmVuY2UpKVxyXG5cdFx0XHRcdFx0aGVhZGVyUmVmZXJlbmNlPVtoZWFkZXJSZWZlcmVuY2VdXHJcblx0XHRcdFx0aGVhZGVycz1oZWFkZXJSZWZlcmVuY2UubWFwKGE9PntcclxuXHRcdFx0XHRcdGNvbnN0IHskOntpZCwgdHlwZX19PWFcclxuXHRcdFx0XHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5yZWxzW2lkXS50YXJnZXQsIHRoaXMuZG9jLCB0eXBlKVxyXG5cdFx0XHRcdFx0cmV0dXJuIHBhcnQucGFyc2UoKS50aGVuKHJvb3Q9PmNoaWxkcmVuLnNwbGljZSgwLDAscm9vdCkpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHRkZWxldGUgcHJvcHMuaGVhZGVyUmVmZXJlbmNlXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKGZvb3RlclJlZmVyZW5jZSl7XHJcblx0XHRcdFx0aWYoIUFycmF5LmlzQXJyYXkoZm9vdGVyUmVmZXJlbmNlKSlcclxuXHRcdFx0XHRcdGZvb3RlclJlZmVyZW5jZT1bZm9vdGVyUmVmZXJlbmNlXVxyXG5cdFx0XHRcdGZvb3RlcnM9Zm9vdGVyUmVmZXJlbmNlLm1hcChhPT57XHJcblx0XHRcdFx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1hXHJcblx0XHRcdFx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMucmVsc1tpZF0udGFyZ2V0LCB0aGlzLmRvYywgdHlwZSlcclxuXHRcdFx0XHRcdHJldHVybiBwYXJ0LnBhcnNlKCkudGhlbihyb290PT5jaGlsZHJlbi5zcGxpY2UoMCwwLHJvb3QpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0ZGVsZXRlIHByb3BzLmZvb3RlclJlZmVyZW5jZVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoWy4uLmhlYWRlcnMsIC4uLmZvb3RlcnNdKVxyXG5cdFx0XHRcdC50aGVuKGE9PnNlY3Rpb25zLnNwbGljZShpLDEsdGhpcy5kb2MuY3JlYXRlRWxlbWVudChzZWN0aW9uKSkpXHJcblx0XHR9KSlcclxuXHR9XHJcbn1cclxuIl19