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

			var args = arguments;
			function asXmlObject(node) {
				var $ = node.$ = node.attributes;
				delete node.attributes;
				delete node.parent;
				delete node.name;
				Object.keys($).forEach(function (a) {
					var as = a.split(':');
					if (as.length == 2) {
						$[as[1]] = $[a];
						delete $[a];
					}
				});
				return node;
			}
			return this._parseNonContent().then(function (a) {
				return new Promise(function (resolve) {
					var root = {
						name: _this4.doc.constructor.ext,
						children: []
					};
					var body = null,
					    sect = null,
					    pr = null,
					    current = root;
					var sections = [];

					var stream = new _stream.PassThrough();
					stream.end(new Buffer(_this4.data.asUint8Array()));
					stream.pipe(_sax2.default.createStream(true, { xmlns: false })).on("opentag", function (node) {
						if (_this4.doc.isProperty(node.name) && pr == null) {
							pr = node;
						}

						node.parent = current;
						current = node;

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
							var _doc;

							var index = parent.children.indexOf(current);
							attributes.key = index;
							if (tag == 'w:document') {
								current.children = sections;
								builtIn.forEach(function (a) {
									return attributes[a] = _this4[a];
								});
								attributes.directStyle = _this4.styles.getDefault("document");
							}
							var element = (_doc = _this4.doc).createElement.apply(_doc, [current].concat(_toConsumableArray(args)));

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var type = tag.split(':').pop();
							var property = _this4.doc.toProperty(asXmlObject(current), type);
							current = parent;
							if (pr != sect) {
								current.attributes.directStyle = property;
							} else sect = property;

							pr = null;
						} else {
							var _type = tag.split(':').pop();
							parent[_type] = _this4.doc.onToProperty(asXmlObject(current), _type);
							current = parent;
						}

						if (current == body && sect != null) {
							var _doc2;

							sections.push((_doc2 = _this4.doc).createElement.apply(_doc2, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxVQUFRLDhFQUE4RSxLQUE5RSxDQUFvRixHQUFwRixDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVHLE1BQUs7OztBQUNaLFVBQU8sUUFBUSxHQUFSLENBQVksT0FBTyxJQUFQLENBQVksS0FBSyxJQUFMLENBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsY0FBSTtBQUNqRCxRQUFJLE1BQUksT0FBSyxJQUFMLENBQVUsRUFBVixDQUFKLENBRDZDO0FBRWpELFFBQUcsSUFBSSxJQUFKLElBQVUsSUFBVixFQUFlO0FBQ2pCLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUwsSUFBVyxNQUFYO01BQVIsQ0FEUCxDQURpQjtLQUFsQjtJQUY2QyxDQUF2QyxDQUFQLENBRFk7Ozs7cUNBU0s7OztBQUNqQixPQUFJLE1BQUksS0FBSyxHQUFMLENBRFM7QUFFakIsT0FBSSxVQUFRO0FBQ1gsa0NBQVUsT0FBTSxjQUFjLFVBQVM7QUFDdEMsWUFBTyxJQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsTUFBTSxLQUFOLENBQVksR0FBWixFQUFpQixHQUFqQixFQUEzQixDQUFQLENBRHNDO0tBRDVCO0lBQVIsQ0FGYTs7QUFRakIsVUFBTyxLQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLElBQXpCLENBQThCO1dBQUcsT0FBSyxPQUFMLENBQWEsT0FBYixFQUFxQixPQUFyQjtJQUFILENBQTlCLENBQWdFLElBQWhFLENBQXFFLGFBQUc7QUFDOUUsV0FBSyxTQUFMLEdBQWUsbUJBQWMsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLGdDQUFm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SCxDQTFEWCxDQTZEQyxFQTdERCxDQTZESSxNQTdESixFQTZEWSxnQkFBTTtBQUNqQixVQUFHLFFBQVEsSUFBUixJQUFjLEtBQWQsRUFDRixRQUFRLFFBQVIsR0FBaUIsSUFBakIsQ0FERDtNQURXLENBN0RaLENBVjJCO0tBQVQsQ0FBbkIsQ0FEc0M7SUFBSCxDQUFwQyxDQWhCTSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFzc1Rocm91Z2h9IGZyb20gXCJzdHJlYW1cIlxyXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcclxuXHJcbmltcG9ydCBGb250VGhlbWUgZnJvbSBcIi4vdGhlbWUvZm9udFwiXHJcbmltcG9ydCBDb2xvclRoZW1lIGZyb20gXCIuL3RoZW1lL2NvbG9yXCJcclxuaW1wb3J0IEZvcm1hdFRoZW1lIGZyb20gXCIuL3RoZW1lL2Zvcm1hdFwiXHJcblxyXG5cclxuY29uc3QgYnVpbHRJbj0nd2ViU2V0dGluZ3Msc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRfcGFyc2UxKHR5cGUpe1xyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGlkPT57XHJcblx0XHRcdGxldCByZWw9dGhpcy5yZWxzW2lkXVxyXG5cdFx0XHRpZihyZWwudHlwZT09dHlwZSl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQocmVsLnRhcmdldClcclxuXHRcdFx0XHRcdC50aGVuKHBhcnNlZD0+dGhpc1t0eXBlXT1wYXJzZWQpXHJcblx0XHRcdH1cclxuXHRcdH0pKVxyXG5cdH1cclxuXHRfcGFyc2VOb25Db250ZW50KCl7XHJcblx0XHRsZXQgZG9jPXRoaXMuZG9jXHJcblx0XHRsZXQgdHJhbnNQcj17XHJcblx0XHRcdHZhbGlkYXRvcih4cGF0aCxjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKXtcclxuXHRcdFx0XHRyZXR1cm4gZG9jLm9uVG9Qcm9wZXJ0eShuZXdWYWx1ZSwgeHBhdGguc3BsaXQoJy8nKS5wb3AoKSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB0aGlzLl9wYXJzZTEoXCJzZXR0aW5nc1wiKS50aGVuKGE9PnRoaXMuX3BhcnNlMShcInRoZW1lXCIsdHJhbnNQcikpLnRoZW4oYT0+e1xyXG5cdFx0XHR0aGlzLmZvbnRUaGVtZT1uZXcgRm9udFRoZW1lKHRoaXMudGhlbWUuZ2V0KCd0aGVtZS50aGVtZUVsZW1lbnRzLmZvbnRTY2hlbWUnKSx0aGlzLnNldHRpbmdzLmdldCgnc2V0dGluZ3MudGhlbWVGb250TGFuZycsZmFsc2UpWzBdLiQpXHJcblx0XHRcdHRoaXMuY29sb3JUaGVtZT1uZXcgQ29sb3JUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5jbHJTY2hlbWUnKSx0aGlzLnNldHRpbmdzLmdldCgnc2V0dGluZ3MuY2xyU2NoZW1lTWFwcGluZycpLiQpXHJcblx0XHRcdHRoaXMuZm9ybWF0VGhlbWU9bmV3IEZvcm1hdFRoZW1lKHRoaXMudGhlbWUuZ2V0KCd0aGVtZS50aGVtZUVsZW1lbnRzLmZtdFNjaGVtZScpKVxyXG5cdFx0fSkudGhlbihhPT57XHJcblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRcdGxldCByZWw9dGhpcy5yZWxzW2lkXVxyXG5cdFx0XHRcdGlmKGJ1aWx0SW4uaW5kZXhPZihyZWwudHlwZSkhPS0xKXtcclxuXHRcdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQsIChyZWwudHlwZT09J3N0eWxlcycgfHwgcmVsLnR5cGU9PSdudW1iZXJpbmcnKSA/IHRyYW5zUHIgOiBudWxsKVxyXG5cdFx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbcmVsLnR5cGVdPXBhcnNlZClcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLmZpbHRlcihhPT5hKSkudGhlbihhPT57XHJcblx0XHRcdFx0dGhpcy5zdHlsZXM9bmV3IFN0eWxlcyh0aGlzLnN0eWxlcywgdGhpcy5kb2MpXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRwYXJzZSgpe1xyXG5cdFx0bGV0IGFyZ3M9YXJndW1lbnRzXHJcblx0XHRmdW5jdGlvbiBhc1htbE9iamVjdChub2RlKXtcclxuXHRcdFx0bGV0ICQ9bm9kZS4kPW5vZGUuYXR0cmlidXRlc1xyXG5cdFx0XHRkZWxldGUgbm9kZS5hdHRyaWJ1dGVzXHJcblx0XHRcdGRlbGV0ZSBub2RlLnBhcmVudFxyXG5cdFx0XHRkZWxldGUgbm9kZS5uYW1lXHJcblx0XHRcdE9iamVjdC5rZXlzKCQpLmZvckVhY2goYT0+e1xyXG5cdFx0XHRcdGxldCBhcz1hLnNwbGl0KCc6JylcclxuXHRcdFx0XHRpZihhcy5sZW5ndGg9PTIpe1xyXG5cdFx0XHRcdFx0JFthc1sxXV09JFthXVxyXG5cdFx0XHRcdFx0ZGVsZXRlICRbYV1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHRcdHJldHVybiBub2RlXHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2VOb25Db250ZW50KCkudGhlbihhPT57XHJcblx0XHRcdHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlPT57XHJcblx0XHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdFx0bmFtZTp0aGlzLmRvYy5jb25zdHJ1Y3Rvci5leHQsXHJcblx0XHRcdFx0XHRjaGlsZHJlbjpbXVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsZXQgYm9keT1udWxsLCBzZWN0PW51bGwsIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHRcdGxldCBzZWN0aW9ucz1bXVxyXG5cclxuXHRcdFx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRcdFx0c3RyZWFtLmVuZChuZXcgQnVmZmVyKHRoaXMuZGF0YS5hc1VpbnQ4QXJyYXkoKSkpXHJcblx0XHRcdFx0c3RyZWFtLnBpcGUoc2F4LmNyZWF0ZVN0cmVhbSh0cnVlLHt4bWxuczpmYWxzZX0pKVxyXG5cdFx0XHRcdC5vbihcIm9wZW50YWdcIiwgbm9kZT0+e1xyXG5cdFx0XHRcdFx0aWYodGhpcy5kb2MuaXNQcm9wZXJ0eShub2RlLm5hbWUpICYmIHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0cHI9bm9kZVxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdG5vZGUucGFyZW50PWN1cnJlbnRcclxuXHRcdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0XHRub2RlLnBhcmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XHJcblx0XHRcdFx0XHRcdGJvZHk9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6c2VjdFByJzpcclxuXHRcdFx0XHRcdFx0c2VjdD1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0XHRhdHRyaWJ1dGVzLmtleT1pbmRleFxyXG5cdFx0XHRcdFx0XHRpZih0YWc9PSd3OmRvY3VtZW50Jyl7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj1zZWN0aW9uc1xyXG5cdFx0XHRcdFx0XHRcdGJ1aWx0SW4uZm9yRWFjaChhPT5hdHRyaWJ1dGVzW2FdPXRoaXNbYV0pXHJcblx0XHRcdFx0XHRcdFx0YXR0cmlidXRlcy5kaXJlY3RTdHlsZT10aGlzLnN0eWxlcy5nZXREZWZhdWx0KFwiZG9jdW1lbnRcIilcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQsLi4uYXJncylcclxuXHJcblx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0XHRsZXQgdHlwZT10YWcuc3BsaXQoJzonKS5wb3AoKVxyXG5cdFx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy5kb2MudG9Qcm9wZXJ0eShhc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdCl7XHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRcdFx0c2VjdD1wcm9wZXJ0eVxyXG5cclxuXHRcdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT10aGlzLmRvYy5vblRvUHJvcGVydHkoYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9LC4uLmFyZ3MpKVxyXG5cdFx0XHRcdFx0XHRzZWN0PW51bGxcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyb290LmNoaWxkcmVuWzBdKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0XHRpZihjdXJyZW50Lm5hbWU9PVwidzp0XCIpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49dGV4dFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=