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
				_this3.fontTheme = new _font2.default(_this3.theme.get('theme.themeElements.fontScheme'), _this3.settings.get('settings.themeFontLang').$);
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
				node.$ = node.attributes;
				delete node.attributes;
				delete node.parent;
				delete node.name;
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
							var property = _this4.doc.toProperty(asXmlObject(current), tag.split(':').pop());
							current = parent;
							if (pr != sect) current.attributes.directStyle = property;else sect = property;

							pr = null;
						} else {
							var type = tag.split(':').pop();
							parent[type] = _this4.doc.onToProperty(asXmlObject(current), type);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxVQUFRLDhFQUE4RSxLQUE5RSxDQUFvRixHQUFwRixDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVHLE1BQUs7OztBQUNaLFVBQU8sUUFBUSxHQUFSLENBQVksT0FBTyxJQUFQLENBQVksS0FBSyxJQUFMLENBQVosQ0FBdUIsR0FBdkIsQ0FBMkIsY0FBSTtBQUNqRCxRQUFJLE1BQUksT0FBSyxJQUFMLENBQVUsRUFBVixDQUFKLENBRDZDO0FBRWpELFFBQUcsSUFBSSxJQUFKLElBQVUsSUFBVixFQUFlO0FBQ2pCLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUwsSUFBVyxNQUFYO01BQVIsQ0FEUCxDQURpQjtLQUFsQjtJQUY2QyxDQUF2QyxDQUFQLENBRFk7Ozs7cUNBU0s7OztBQUNqQixPQUFJLE1BQUksS0FBSyxHQUFMLENBRFM7QUFFakIsT0FBSSxVQUFRO0FBQ1gsa0NBQVUsT0FBTSxjQUFjLFVBQVM7QUFDdEMsWUFBTyxJQUFJLFlBQUosQ0FBaUIsUUFBakIsRUFBMkIsTUFBTSxLQUFOLENBQVksR0FBWixFQUFpQixHQUFqQixFQUEzQixDQUFQLENBRHNDO0tBRDVCO0lBQVIsQ0FGYTs7QUFRakIsVUFBTyxLQUFLLE9BQUwsQ0FBYSxVQUFiLEVBQXlCLElBQXpCLENBQThCO1dBQUcsT0FBSyxPQUFMLENBQWEsT0FBYixFQUFxQixPQUFyQjtJQUFILENBQTlCLENBQWdFLElBQWhFLENBQXFFLGFBQUc7QUFDOUUsV0FBSyxTQUFMLEdBQWUsbUJBQWMsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLGdDQUFm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R3BCLFdBQUcsTUFBSSxJQUFKLEVBQ0YsUUFBUSxVQUFSLENBQW1CLFdBQW5CLEdBQStCLFFBQS9CLENBREQsS0FHQyxPQUFLLFFBQUwsQ0FIRDs7QUFLQSxZQUFHLElBQUgsQ0FSb0I7T0FBZixNQVNEO0FBQ0osV0FBSSxPQUFLLElBQUksS0FBSixDQUFVLEdBQVYsRUFBZSxHQUFmLEVBQUwsQ0FEQTtBQUVKLGNBQU8sSUFBUCxJQUFhLE9BQUssR0FBTCxDQUFTLFlBQVQsQ0FBc0IsWUFBWSxPQUFaLENBQXRCLEVBQTJDLElBQTNDLENBQWIsQ0FGSTtBQUdKLGlCQUFRLE1BQVIsQ0FISTtPQVRDOztBQWVOLFVBQUcsV0FBUyxJQUFULElBQWlCLFFBQU0sSUFBTixFQUFXOzs7QUFDOUIsZ0JBQVMsSUFBVCxDQUFjLGdCQUFLLEdBQUwsRUFBUyxhQUFULGVBQXVCLEVBQUMsTUFBSyxTQUFMLEVBQWdCLFlBQVksSUFBWixFQUFrQixVQUFVLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBcUIsQ0FBckIsQ0FBViw4QkFBc0MsTUFBaEcsQ0FBZCxFQUQ4QjtBQUU5QixjQUFLLElBQUwsQ0FGOEI7T0FBL0I7TUE3QmMsQ0F0QmYsQ0F5REMsRUF6REQsQ0F5REksS0F6REosRUF5RFcsYUFBRztBQUNiLGNBQVEsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFSLEVBRGE7TUFBSCxDQXpEWCxDQTREQyxFQTVERCxDQTRESSxNQTVESixFQTREWSxnQkFBTTtBQUNqQixVQUFHLFFBQVEsTUFBUixJQUFrQixRQUFRLE1BQVIsQ0FBZSxJQUFmLElBQXFCLEtBQXJCLEVBQ3BCLFFBQVEsUUFBUixDQUFpQixJQUFqQixDQUFzQixJQUF0QixFQUREO01BRFcsQ0E1RFosQ0FWMkI7S0FBVCxDQUFuQixDQURzQztJQUFILENBQXBDLENBVE0iLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcclxuaW1wb3J0IHNheCBmcm9tIFwic2F4XCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXHJcblxyXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gXCIuL3RoZW1lL2ZvbnRcIlxyXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tIFwiLi90aGVtZS9jb2xvclwiXHJcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb3JtYXRcIlxyXG5cclxuXHJcbmNvbnN0IGJ1aWx0SW49J3dlYlNldHRpbmdzLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X3BhcnNlMSh0eXBlKXtcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYocmVsLnR5cGU9PXR5cGUpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbdHlwZV09cGFyc2VkKVxyXG5cdFx0XHR9XHJcblx0XHR9KSlcclxuXHR9XHJcblx0X3BhcnNlTm9uQ29udGVudCgpe1xyXG5cdFx0bGV0IGRvYz10aGlzLmRvY1xyXG5cdFx0bGV0IHRyYW5zUHI9e1xyXG5cdFx0XHR2YWxpZGF0b3IoeHBhdGgsY3VycmVudFZhbHVlLCBuZXdWYWx1ZSl7XHJcblx0XHRcdFx0cmV0dXJuIGRvYy5vblRvUHJvcGVydHkobmV3VmFsdWUsIHhwYXRoLnNwbGl0KCcvJykucG9wKCkpXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gdGhpcy5fcGFyc2UxKFwic2V0dGluZ3NcIikudGhlbihhPT50aGlzLl9wYXJzZTEoXCJ0aGVtZVwiLHRyYW5zUHIpKS50aGVuKGE9PntcclxuXHRcdFx0dGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mb250U2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLnRoZW1lRm9udExhbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy50aGVtZS5nZXQoJ3RoZW1lLnRoZW1lRWxlbWVudHMuY2xyU2NoZW1lJyksdGhpcy5zZXR0aW5ncy5nZXQoJ3NldHRpbmdzLmNsclNjaGVtZU1hcHBpbmcnKS4kKVxyXG5cdFx0XHR0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5mbXRTY2hlbWUnKSlcclxuXHRcdH0pLnRoZW4oYT0+e1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXModGhpcy5yZWxzKS5tYXAoaWQ9PntcclxuXHRcdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0T2JqZWN0UGFydChyZWwudGFyZ2V0LCAocmVsLnR5cGU9PSdzdHlsZXMnIHx8IHJlbC50eXBlPT0nbnVtYmVyaW5nJykgPyB0cmFuc1ByIDogbnVsbClcclxuXHRcdFx0XHRcdFx0LnRoZW4ocGFyc2VkPT50aGlzW3JlbC50eXBlXT1wYXJzZWQpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5maWx0ZXIoYT0+YSkpLnRoZW4oYT0+e1xyXG5cdFx0XHRcdHRoaXMuc3R5bGVzPW5ldyBTdHlsZXModGhpcy5zdHlsZXMsIHRoaXMuZG9jKVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcblx0cGFyc2UoKXtcclxuXHRcdGxldCBhcmdzPWFyZ3VtZW50c1xyXG5cdFx0ZnVuY3Rpb24gYXNYbWxPYmplY3Qobm9kZSl7XHJcblx0XHRcdG5vZGUuJD1ub2RlLmF0dHJpYnV0ZXNcclxuXHRcdFx0ZGVsZXRlIG5vZGUuYXR0cmlidXRlc1xyXG5cdFx0XHRkZWxldGUgbm9kZS5wYXJlbnRcclxuXHRcdFx0ZGVsZXRlIG5vZGUubmFtZVxyXG5cdFx0XHRyZXR1cm4gbm9kZVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHRoaXMuX3BhcnNlTm9uQ29udGVudCgpLnRoZW4oYT0+e1xyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZT0+e1xyXG5cdFx0XHRcdGxldCByb290PXtcclxuXHRcdFx0XHRcdG5hbWU6dGhpcy5kb2MuY29uc3RydWN0b3IuZXh0LFxyXG5cdFx0XHRcdFx0Y2hpbGRyZW46W11cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IGJvZHk9bnVsbCwgc2VjdD1udWxsLCBwcj1udWxsLCBjdXJyZW50PXJvb3RcclxuXHRcdFx0XHRsZXQgc2VjdGlvbnM9W11cclxuXHJcblx0XHRcdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxyXG5cdFx0XHRcdHN0cmVhbS5lbmQobmV3IEJ1ZmZlcih0aGlzLmRhdGEuYXNVaW50OEFycmF5KCkpKVxyXG5cdFx0XHRcdHN0cmVhbS5waXBlKHNheC5jcmVhdGVTdHJlYW0odHJ1ZSx7eG1sbnM6ZmFsc2V9KSlcclxuXHRcdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZS5uYW1lKSAmJiBwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdHByPW5vZGVcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblx0XHRcdFx0XHRjdXJyZW50PW5vZGVcclxuXHJcblx0XHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdG5vZGUuY2hpbGRyZW49W11cclxuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0XHRjYXNlICd3OmJvZHknOlxyXG5cdFx0XHRcdFx0XHRib2R5PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlICd3OnNlY3RQcic6XHJcblx0XHRcdFx0XHRcdHNlY3Q9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImNsb3NldGFnXCIsdGFnPT57XHJcblx0XHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpe1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49c2VjdGlvbnNcclxuXHRcdFx0XHRcdFx0XHRidWlsdEluLmZvckVhY2goYT0+YXR0cmlidXRlc1thXT10aGlzW2FdKVxyXG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9dGhpcy5zdHlsZXMuZ2V0RGVmYXVsdChcImRvY3VtZW50XCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0bGV0IGVsZW1lbnQ9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50LC4uLmFyZ3MpXHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMuZG9jLnRvUHJvcGVydHkoYXNYbWxPYmplY3QoY3VycmVudCksdGFnLnNwbGl0KCc6JykucG9wKCkpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRcdGlmKHByIT1zZWN0KVxyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcy5kaXJlY3RTdHlsZT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0c2VjdD1wcm9wZXJ0eVxyXG5cclxuXHRcdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT10aGlzLmRvYy5vblRvUHJvcGVydHkoYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9LC4uLmFyZ3MpKVxyXG5cdFx0XHRcdFx0XHRzZWN0PW51bGxcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyb290LmNoaWxkcmVuWzBdKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0XHRpZihjdXJyZW50LnBhcmVudCAmJiBjdXJyZW50LnBhcmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19