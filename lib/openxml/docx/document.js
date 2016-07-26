"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _officeDocument = require("./officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _headerFooter = require("./headerFooter");

var _headerFooter2 = _interopRequireDefault(_headerFooter);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
	}

	_createClass(_class, [{
		key: "isProperty",
		value: function isProperty(node) {
			var name = node.name;
			var parent = node.parent;

			var tag = name.split(':').pop();
			if (_get(Object.getPrototypeOf(_class.prototype), "isProperty", this).apply(this, arguments) || tag == 'tblGrid') return true;

			if (parent && parent.name && parent.name.split(':').pop() == 'inline') return true;

			return false;
		}
	}, {
		key: "createElement",
		value: function createElement(node) {
			var styles = this.officeDocument.styles;
			var name = node.name;
			var directStyle = node.attributes.directStyle;
			var children = node.children;

			var tag = name.split(':').pop();
			switch (tag) {
				case "p":
					if (directStyle && directStyle['numPr']) tag = "list";
					break;
				case "inline":
					var graphic = node.attributes.graphic;
					switch (graphic.get("graphicData.$.uri").split('/').pop()) {
						case 'picture':
							tag = "image";
							var id = graphic.get("graphicData.pic.blipFill.blip.$.embed");
							node.attributes = {
								extent: node.attributes.extent,
								src: "data:image/jpg;base64," + new Buffer(this.officeDocument.getRel(id)).toString('base64')
							};
							break;
					}
					break;
				case "drawing":
					return node.children[0];
					break;
				case "section":
					var props = node.attributes;
					var headerReference = props.headerReference;
					var footerReference = props.footerReference;

					if (headerReference) {
						props.header = {};
						if (!Array.isArray(headerReference)) headerReference = [headerReference];
						headerReference.forEach(function (a) {
							return a.then(function (_ref) {
								var type = _ref.type;
								var root = _ref.root;
								return props.header[type] = root;
							});
						});
						delete props.headerReference;
					}

					if (footerReference) {
						props.footer = {};
						if (!Array.isArray(footerReference)) footerReference = [footerReference];
						footerReference.forEach(function (a) {
							return a.then(function (_ref2) {
								var type = _ref2.type;
								var root = _ref2.root;
								return props.footer[type] = root;
							});
						});
						delete props.footerReference;
					}
					break;
			}

			return this.onCreateElement(node, tag);
		}
	}, {
		key: "onCreateElement",
		value: function onCreateElement(node) {
			return node;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return this.officeDocument.styles.createDirectStyle(_get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node, type), type);
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			var _this2 = this;

			var x = node.$;

			var value = void 0;
			switch (type) {
				//section, sectPr
				case 'pgSz':
					return { width: this.dxa2Px(x['w']), height: this.dxa2Px(x['h']) };
					break;
				case 'pgMar':
					value = {};
					Object.keys(x).forEach(function (a) {
						return value[a.split(':').pop()] = _this2.dxa2Px(x[a]);
					});
					return value;
					break;
				case 'cols':
					x.num && (x.num = parseInt(x.num));
					x.space && (x.space = this.dxa2Px(x.space));

					if (x.col) {
						x.data = x.col.map(function (col) {
							return {
								width: _this2.dxa2Px(col.w),
								space: _this2.dxa2Px(col.space)
							};
						});
						delete x.col;
					}
					return x;
					break;
				case 'headerReference':
				case 'footerReference':
					return this.toHeaderFooter.apply(this, arguments);
				//paragraph, pPr
				case 'jc':
					return x.val;
				case 'ind':
					Object.keys(x).forEach(function (a) {
						return x[a] = _this2.dxa2Px(x[a]);
					});
					return x;
				case 'spacing':
					return this.toSpacing(x);
				case 'pBdr':
					value = {};
					Object.keys(x).filter(function (a) {
						return a != '$';
					}).forEach(function (a) {
						return value[a] = _this2.toBorder(x[a][0]);
					});
					return value;
				//inline, rPr
				case 'rFonts':
					var ascii = x['ascii'] || this.officeDocument.fontTheme.get(x['asciiTheme']);
					var asia = x['eastAsia'] || this.officeDocument.fontTheme.get(x['eastAsiaTheme']);

					if (ascii || asia) return { ascii: ascii, asia: asia };
					break;
				case 'lang':
				case 'vertAlign':
					return x.val;
				case 'sz':
					return this.pt2Px(parseInt(x['val']) / 2);
				case 'w':
					return parseInt(x.val) / 100.0;
				case 'kern':
					return parseInt(x.val) / 2;
				case 'spacing':
				case 'position':
					return this.dxa2Px(x.val);
				case 'i':
				case 'vanish':
				case 'u':
				case 'smallCaps':
				case 'b':
					return this.asToggle(x);
				case 'hightlight':
				case 'color':
					return this.asColor(x.val || this.officeDocument.themeColor.get(x.themeColor));
				case 'u':
					return x;
				case 'bdx':
					return this.toBorder(x);
				//table
				case 'tblLook':
					return x;
				case 'tblGrid':
					return node.gridCol.map(function (a) {
						return _this2.dxa2Px(a.$.w);
					});
				case 'tcBorders':
				case 'tblBorders':
					var value = {};
					Object.keys(node).forEach(function (a) {
						value[a] = _this2.toBorder(node[a][0].$);
					});
					return value;
				case 'shd':
					return this.asColor(x.fill);
				//drawing
				case 'extent':
					return { width: this.cm2Px(x.cx), height: this.cm2Px(x.cy) };
				default:
					return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).apply(this, arguments);
			}
		}
	}, {
		key: "asToggle",
		value: function asToggle(x) {
			if (x == undefined || x.val == undefined) {
				return -1;
			} else {
				return parseInt(x.val);
			}
		}
	}, {
		key: "toSpacing",
		value: function toSpacing(x) {
			var r = x,
			    o = {};

			if (!r.beforeAutospacing && r.beforeLines) o.top = this.dxa2Px(r.beforeLines);else if (r.before) o.top = this.dxa2Px(r.before);

			if (!r.afterAutospacing && r.afterLines) o.bottom = this.dxa2Px(r.afterLines);else if (r.after) o.bottom = this.dxa2Px(r.after);

			if (!r.line) return o;

			switch (x.lineRule) {
				case 'atLeast':
				case 'exact':
					o.lineHeight = this.dxa2Px(x.line);
					break;
				case 'auto':
				default:
					o.lineHeight = parseInt(r.line) * 100 / 240 + '%';
			}
			o.lineRule = x.lineRule;
			return o;
		}
	}, {
		key: "toBorder",
		value: function toBorder(x) {
			var border = x;
			border.sz && (border.sz = border.sz / 8);
			border.color && (border.color = this.asColor(border.color));
			return border;
		}
	}, {
		key: "toHeaderFooter",
		value: function toHeaderFooter(node, tag) {
			var _node$$ = node.$;
			var id = _node$$.id;
			var type = _node$$.type;

			var part = new _headerFooter2.default(this.officeDocument.rels[id].target, this);
			return part.parse().then(function (root) {
				return { root: root, type: type };
			});
		}
	}], [{
		key: "ext",
		get: function get() {
			return 'docx';
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _officeDocument2.default;
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFPWSxNQUFLO09BQ1YsT0FBYSxLQUFiLEtBRFU7T0FDTCxTQUFRLEtBQVIsT0FESzs7QUFFZixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBRlc7QUFHZixPQUFHLDhFQUFvQixVQUFwQixJQUFrQyxPQUFLLFNBQUwsRUFDcEMsT0FBTyxJQUFQLENBREQ7O0FBR0EsT0FBRyxVQUFVLE9BQU8sSUFBUCxJQUFlLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsTUFBOEIsUUFBOUIsRUFDM0IsT0FBTyxJQUFQLENBREQ7O0FBR0EsVUFBTyxLQUFQLENBVGU7Ozs7Z0NBWUYsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksT0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsU0FLSyxRQUFMO0FBQ0MsU0FBSSxVQUFRLEtBQUssVUFBTCxDQUFnQixPQUFoQixDQURiO0FBRUMsYUFBTyxRQUFRLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxLQUFqQyxDQUF1QyxHQUF2QyxFQUE0QyxHQUE1QyxFQUFQO0FBQ0EsV0FBSyxTQUFMO0FBQ0MsYUFBSSxPQUFKLENBREQ7QUFFQyxXQUFJLEtBQUcsUUFBUSxHQUFS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QUZtQjtBQUd2QixVQUFPLEtBQUssS0FBTCxHQUFhLElBQWIsQ0FBa0I7V0FBTyxFQUFDLFVBQUQsRUFBTSxVQUFOO0lBQVAsQ0FBekIsQ0FIdUI7Ozs7c0JBck5SO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IEhlYWRlckZvb3RlciBmcm9tIFwiLi9oZWFkZXJGb290ZXJcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRpc1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7bmFtZSxwYXJlbnR9PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdGlmKHN1cGVyLmlzUHJvcGVydHkoLi4uYXJndW1lbnRzKSB8fCB0YWc9PSd0YmxHcmlkJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX0sIGNoaWxkcmVufT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godGFnKXtcblx0XHRjYXNlIFwicFwiOlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGVbJ251bVByJ10pXG5cdFx0XHRcdHRhZz1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImlubGluZVwiOlxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcblx0XHRcdHN3aXRjaChncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKCkpe1xuXHRcdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0XHRcdHRhZz1cImltYWdlXCJcblx0XHRcdFx0bGV0IGlkPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEucGljLmJsaXBGaWxsLmJsaXAuJC5lbWJlZFwiKVxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxuXHRcdFx0XHRcdHNyYzpgZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7bmV3IEJ1ZmZlcih0aGlzLm9mZmljZURvY3VtZW50LmdldFJlbChpZCkpLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cblx0XHRicmVha1xuXHRcdGNhc2UgXCJzZWN0aW9uXCI6XG5cdFx0XHRsZXQgcHJvcHM9bm9kZS5hdHRyaWJ1dGVzXG5cdFx0XHRsZXQge2hlYWRlclJlZmVyZW5jZSwgZm9vdGVyUmVmZXJlbmNlfT1wcm9wc1xuXHRcdFx0aWYoaGVhZGVyUmVmZXJlbmNlKXtcblx0XHRcdFx0cHJvcHMuaGVhZGVyPXt9XG5cdFx0XHRcdGlmKCFBcnJheS5pc0FycmF5KGhlYWRlclJlZmVyZW5jZSkpXG5cdFx0XHRcdFx0aGVhZGVyUmVmZXJlbmNlPVtoZWFkZXJSZWZlcmVuY2VdXG5cdFx0XHRcdGhlYWRlclJlZmVyZW5jZS5mb3JFYWNoKGE9PmEudGhlbigoe3R5cGUscm9vdH0pPT5wcm9wcy5oZWFkZXJbdHlwZV09cm9vdCkpXG5cdFx0XHRcdGRlbGV0ZSBwcm9wcy5oZWFkZXJSZWZlcmVuY2Vcblx0XHRcdH1cblx0XHRcdFxuXHRcdFx0aWYoZm9vdGVyUmVmZXJlbmNlKXtcblx0XHRcdFx0cHJvcHMuZm9vdGVyPXt9XG5cdFx0XHRcdGlmKCFBcnJheS5pc0FycmF5KGZvb3RlclJlZmVyZW5jZSkpXG5cdFx0XHRcdFx0Zm9vdGVyUmVmZXJlbmNlPVtmb290ZXJSZWZlcmVuY2VdXG5cdFx0XHRcdGZvb3RlclJlZmVyZW5jZS5mb3JFYWNoKGE9PmEudGhlbigoe3R5cGUscm9vdH0pPT5wcm9wcy5mb290ZXJbdHlwZV09cm9vdCkpXG5cdFx0XHRcdGRlbGV0ZSBwcm9wcy5mb290ZXJSZWZlcmVuY2Vcblx0XHRcdH1cblx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0YWcpXG5cdH1cblx0XG5cdG9uQ3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRyZXR1cm4gbm9kZVxuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMuY3JlYXRlRGlyZWN0U3R5bGUoc3VwZXIudG9Qcm9wZXJ0eShub2RlLHR5cGUpLHR5cGUpXG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0Y29uc3QgeyQ6eH09bm9kZVxuXHRcdGxldCB2YWx1ZVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHQvL3NlY3Rpb24sIHNlY3RQclxuXHRcdGNhc2UgJ3BnU3onOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXHRcdGNhc2UgJ2NvbHMnOlxuXHRcdFx0eC5udW0gJiYgKHgubnVtPXBhcnNlSW50KHgubnVtKSk7XG5cdFx0XHR4LnNwYWNlICYmICh4LnNwYWNlPXRoaXMuZHhhMlB4KHguc3BhY2UpKTtcblxuXHRcdFx0aWYoeC5jb2wpe1xuXHRcdFx0XHR4LmRhdGE9eC5jb2wubWFwKGNvbD0+KHtcblx0XHRcdFx0XHR3aWR0aDp0aGlzLmR4YTJQeChjb2wudyksXG5cdFx0XHRcdFx0c3BhY2U6dGhpcy5keGEyUHgoY29sLnNwYWNlKVxuXHRcdFx0XHR9KSlcblx0XHRcdFx0ZGVsZXRlIHguY29sXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geFxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnaGVhZGVyUmVmZXJlbmNlJzpcblx0XHRjYXNlICdmb290ZXJSZWZlcmVuY2UnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9IZWFkZXJGb290ZXIoLi4uYXJndW1lbnRzKVxuXHRcdC8vcGFyYWdyYXBoLCBwUHJcblx0XHRjYXNlICdqYyc6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdpbmQnOlxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT54W2FdPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLnRvU3BhY2luZyh4KVxuXHRcdGNhc2UgJ3BCZHInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZpbHRlcihhPT5hIT0nJCcpLmZvckVhY2goYT0+dmFsdWVbYV09dGhpcy50b0JvcmRlcih4W2FdWzBdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdC8vaW5saW5lLCByUHJcblx0XHRjYXNlICdyRm9udHMnOlxuXHRcdFx0bGV0IGFzY2lpPXhbJ2FzY2lpJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4Wydhc2NpaVRoZW1lJ10pXG5cdFx0XHRsZXQgYXNpYT14WydlYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnZWFzdEFzaWFUaGVtZSddKVxuXG5cdFx0XHRpZihhc2NpaSB8fCBhc2lhKVxuXHRcdFx0XHRyZXR1cm4ge2FzY2lpLCBhc2lhfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnbGFuZyc6XG5cdFx0Y2FzZSAndmVydEFsaWduJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ3N6Jzpcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KHhbJ3ZhbCddKS8yKVxuXHRcdGNhc2UgJ3cnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8xMDAuMFxuXHRcdGNhc2UgJ2tlcm4nOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8yXG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0Y2FzZSAncG9zaXRpb24nOlxuXHRcdFx0cmV0dXJuIHRoaXMuZHhhMlB4KHgudmFsKVxuXHRcdGNhc2UgJ2knOlxuXHRcdGNhc2UgJ3ZhbmlzaCc6XG5cdFx0Y2FzZSAndSc6XG5cdFx0Y2FzZSAnc21hbGxDYXBzJzpcblx0XHRjYXNlICdiJzpcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0Y2FzZSAnaGlnaHRsaWdodCc6XG5cdFx0Y2FzZSAnY29sb3InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LnZhbCB8fCB0aGlzLm9mZmljZURvY3VtZW50LnRoZW1lQ29sb3IuZ2V0KHgudGhlbWVDb2xvcikpXG5cdFx0Y2FzZSAndSc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ2JkeCc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b0JvcmRlcih4KVxuXHRcdC8vdGFibGVcblx0XHRjYXNlICd0YmxMb29rJzpcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAndGJsR3JpZCc6XG5cdFx0XHRyZXR1cm4gbm9kZS5ncmlkQ29sLm1hcChhPT50aGlzLmR4YTJQeChhLiQudykpXG5cdFx0Y2FzZSAndGNCb3JkZXJzJzpcblx0XHRjYXNlICd0YmxCb3JkZXJzJzpcblx0XHRcdGxldCB2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMobm9kZSkuZm9yRWFjaChhPT57XG5cdFx0XHRcdHZhbHVlW2FdPXRoaXMudG9Cb3JkZXIobm9kZVthXVswXS4kKVxuXHRcdFx0fSlcblx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRjYXNlICdzaGQnOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmZpbGwpXG5cdFx0Ly9kcmF3aW5nXG5cdFx0Y2FzZSAnZXh0ZW50Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5jbTJQeCh4LmN4KSxoZWlnaHQ6dGhpcy5jbTJQeCh4LmN5KX1cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eSguLi5hcmd1bWVudHMpXG5cdFx0fVxuXHR9XG5cblx0YXNUb2dnbGUoeCl7XG5cdFx0aWYoeD09dW5kZWZpbmVkIHx8IHgudmFsPT11bmRlZmluZWQpe1xuXHRcdFx0cmV0dXJuIC0xXG5cdFx0fWVsc2V7XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpXG5cdFx0fVxuXHR9XG5cblx0dG9TcGFjaW5nKHgpe1xuXHRcdHZhciByPXgsIG89e31cblxuXHRcdGlmKCFyLmJlZm9yZUF1dG9zcGFjaW5nICYmIHIuYmVmb3JlTGluZXMpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmVMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmJlZm9yZSlcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZSkpXG5cblx0XHRpZighci5hZnRlckF1dG9zcGFjaW5nICYmIHIuYWZ0ZXJMaW5lcylcblx0XHRcdG8uYm90dG9tPXRoaXMuZHhhMlB4KChyLmFmdGVyTGluZXMpKVxuXHRcdGVsc2UgaWYoci5hZnRlcilcblx0XHRcdG8uYm90dG9tPXRoaXMuZHhhMlB4KChyLmFmdGVyKSlcblxuXHRcdGlmKCFyLmxpbmUpXG5cdFx0XHRyZXR1cm4gb1xuXG5cdFx0c3dpdGNoKHgubGluZVJ1bGUpe1xuXHRcdGNhc2UgJ2F0TGVhc3QnOlxuXHRcdGNhc2UgJ2V4YWN0Jzpcblx0XHRcdG8ubGluZUhlaWdodD10aGlzLmR4YTJQeCgoeC5saW5lKSlcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnYXV0byc6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdG8ubGluZUhlaWdodD0ocGFyc2VJbnQoci5saW5lKSoxMDAvMjQwKSsnJSdcblx0XHR9XG5cdFx0by5saW5lUnVsZT14LmxpbmVSdWxlXG5cdFx0cmV0dXJuIG9cblx0fVxuXG5cdHRvQm9yZGVyKHgpe1xuXHRcdHZhciBib3JkZXI9eFxuXHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHRyZXR1cm4gYm9yZGVyXG5cdH1cblx0XG5cdHRvSGVhZGVyRm9vdGVyKG5vZGUsdGFnKXtcblx0XHRjb25zdCB7JDp7aWQsIHR5cGV9fT1ub2RlXG5cdFx0bGV0IHBhcnQ9bmV3IEhlYWRlckZvb3Rlcih0aGlzLm9mZmljZURvY3VtZW50LnJlbHNbaWRdLnRhcmdldCwgdGhpcylcblx0XHRyZXR1cm4gcGFydC5wYXJzZSgpLnRoZW4ocm9vdD0+KHtyb290LHR5cGV9KSlcblx0fVxufVxuIl19