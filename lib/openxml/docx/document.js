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

			var part = new HeaderFooter(this.officeDocument.rels[id].target, this, type);
			return part.parse();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1ksTUFBSztPQUNWLE9BQWEsS0FBYixLQURVO09BQ0wsU0FBUSxLQUFSLE9BREs7O0FBRWYsT0FBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZXO0FBR2YsT0FBRyw4RUFBb0IsVUFBcEIsSUFBa0MsT0FBSyxTQUFMLEVBQ3BDLE9BQU8sSUFBUCxDQUREOztBQUdBLE9BQUcsVUFBVSxPQUFPLElBQVAsSUFBZSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLE1BQThCLFFBQTlCLEVBQzNCLE9BQU8sSUFBUCxDQUREOztBQUdBLFVBQU8sS0FBUCxDQVRlOzs7O2dDQVlGLE1BQUs7T0FDWCxTQUFRLEtBQUssY0FBTCxDQUFSLE9BRFc7T0FFYixPQUFnQyxLQUFoQyxLQUZhO09BRUssY0FBYyxLQUExQixXQUFZLFlBRkw7O0FBR2xCLE9BQUksTUFBSSxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUosQ0FIYztBQUlsQixXQUFPLEdBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxPQUFaLENBQWYsRUFDRixNQUFJLE1BQUosQ0FERDtBQUVELFdBSEE7QUFEQSxTQUtLLFFBQUw7QUFDQyxTQUFJLFVBQVEsS0FBSyxVQUFMLENBQWdCLE9BQWhCLENBRGI7QUFFQyxhQUFPLFFBQVEsR0FBUixDQUFZLG1CQUFaLEVBQWlDLEtBQWpDLENBQXVDLEdBQXZDLEVBQTRDLEdBQTVDLEVBQVA7QUFDQSxXQUFLLFNBQUw7QUFDQyxhQUFJLE9BQUosQ0FERDtBQUVDLFdBQUksS0FBRyxRQUFRLEdBQVIsQ0FBWSx1Q0FBWixDQUFILENBRkw7QUFHQyxZQUFL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S0FBSTtpQkFDRixLQUFkLEVBRGdCO09BQ2IsZ0JBRGE7T0FDVCxvQkFEUzs7QUFFdkIsT0FBSSxPQUFLLElBQUksWUFBSixDQUFpQixLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsRUFBekIsRUFBNkIsTUFBN0IsRUFBcUMsSUFBdEQsRUFBNEQsSUFBNUQsQ0FBTCxDQUZtQjtBQUd2QixVQUFPLEtBQUssS0FBTCxFQUFQLENBSHVCOzs7O3NCQS9MUjtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7Ozs7O09BRVQiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29mZmljZURvY3VtZW50XCJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PU9mZmljZURvY3VtZW50XG5cblx0aXNQcm9wZXJ0eShub2RlKXtcblx0XHRsZXQge25hbWUscGFyZW50fT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRpZihzdXBlci5pc1Byb3BlcnR5KC4uLmFyZ3VtZW50cykgfHwgdGFnPT0ndGJsR3JpZCcpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFxuXHRcdGlmKHBhcmVudCAmJiBwYXJlbnQubmFtZSAmJiBwYXJlbnQubmFtZS5zcGxpdCgnOicpLnBvcCgpPT0naW5saW5lJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0Y29uc3Qge3N0eWxlc309dGhpcy5vZmZpY2VEb2N1bWVudFxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9fT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godGFnKXtcblx0XHRjYXNlIFwicFwiOlxuXHRcdFx0aWYoZGlyZWN0U3R5bGUgJiYgZGlyZWN0U3R5bGVbJ251bVByJ10pXG5cdFx0XHRcdHRhZz1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImlubGluZVwiOlxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcblx0XHRcdHN3aXRjaChncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKCkpe1xuXHRcdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0XHRcdHRhZz1cImltYWdlXCJcblx0XHRcdFx0bGV0IGlkPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEucGljLmJsaXBGaWxsLmJsaXAuJC5lbWJlZFwiKVxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxuXHRcdFx0XHRcdHNyYzpgZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7bmV3IEJ1ZmZlcih0aGlzLm9mZmljZURvY3VtZW50LmdldFJlbChpZCkpLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHR9XG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiZHJhd2luZ1wiOlxuXHRcdFx0cmV0dXJuIG5vZGUuY2hpbGRyZW5bMF1cblx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0YWcpXG5cdH1cblx0XG5cdG9uQ3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRyZXR1cm4gbm9kZVxuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRyZXR1cm4gdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMuY3JlYXRlRGlyZWN0U3R5bGUoc3VwZXIudG9Qcm9wZXJ0eShub2RlLHR5cGUpLHR5cGUpXG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0Y29uc3QgeyQ6eH09bm9kZVxuXHRcdGxldCB2YWx1ZVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHQvL3NlY3Rpb24sIHNlY3RQclxuXHRcdGNhc2UgJ3BnU3onOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXHRcdGNhc2UgJ2NvbHMnOlxuXHRcdFx0eC5udW0gJiYgKHgubnVtPXBhcnNlSW50KHgubnVtKSk7XG5cdFx0XHR4LnNwYWNlICYmICh4LnNwYWNlPXRoaXMuZHhhMlB4KHguc3BhY2UpKTtcblxuXHRcdFx0aWYoeC5jb2wpe1xuXHRcdFx0XHR4LmRhdGE9eC5jb2wubWFwKGNvbD0+KHtcblx0XHRcdFx0XHR3aWR0aDp0aGlzLmR4YTJQeChjb2wudyksXG5cdFx0XHRcdFx0c3BhY2U6dGhpcy5keGEyUHgoY29sLnNwYWNlKVxuXHRcdFx0XHR9KSlcblx0XHRcdFx0ZGVsZXRlIHguY29sXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geFxuXHRcdGJyZWFrXG5cdFx0Ly9wYXJhZ3JhcGgsIHBQclxuXHRcdGNhc2UgJ2pjJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ2luZCc6XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnhbYV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9TcGFjaW5nKHgpXG5cdFx0Y2FzZSAncEJkcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZmlsdGVyKGE9PmEhPSckJykuZm9yRWFjaChhPT52YWx1ZVthXT10aGlzLnRvQm9yZGVyKHhbYV1bMF0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0Ly9pbmxpbmUsIHJQclxuXHRcdGNhc2UgJ3JGb250cyc6XG5cdFx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcblx0XHRcdGxldCBhc2lhPXhbJ2Vhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4WydlYXN0QXNpYVRoZW1lJ10pXG5cblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdsYW5nJzpcblx0XHRjYXNlICd2ZXJ0QWxpZ24nOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnc3onOlxuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoeFsndmFsJ10pLzIpXG5cdFx0Y2FzZSAndyc6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzEwMC4wXG5cdFx0Y2FzZSAna2Vybic6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzJcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRjYXNlICdwb3NpdGlvbic6XG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC52YWwpXG5cdFx0Y2FzZSAnaSc6XG5cdFx0Y2FzZSAndmFuaXNoJzpcblx0XHRjYXNlICd1Jzpcblx0XHRjYXNlICdzbWFsbENhcHMnOlxuXHRcdGNhc2UgJ2InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNUb2dnbGUoeClcblx0XHRjYXNlICdoaWdodGxpZ2h0Jzpcblx0XHRjYXNlICdjb2xvcic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHgudmFsIHx8IHRoaXMub2ZmaWNlRG9jdW1lbnQudGhlbWVDb2xvci5nZXQoeC50aGVtZUNvbG9yKSlcblx0XHRjYXNlICd1Jzpcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnYmR4Jzpcblx0XHRcdHJldHVybiB0aGlzLnRvQm9yZGVyKHgpXG5cdFx0Ly90YWJsZVxuXHRcdGNhc2UgJ3RibExvb2snOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICd0YmxHcmlkJzpcblx0XHRcdHJldHVybiBub2RlLmdyaWRDb2wubWFwKGE9PnRoaXMuZHhhMlB4KGEuJC53KSlcblx0XHRjYXNlICd0Y0JvcmRlcnMnOlxuXHRcdGNhc2UgJ3RibEJvcmRlcnMnOlxuXHRcdFx0bGV0IHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGE9Pntcblx0XHRcdFx0dmFsdWVbYV09dGhpcy50b0JvcmRlcihub2RlW2FdWzBdLiQpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdGNhc2UgJ3NoZCc6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguZmlsbClcblx0XHQvL2RyYXdpbmdcblx0XHRjYXNlICdleHRlbnQnOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmNtMlB4KHguY3gpLGhlaWdodDp0aGlzLmNtMlB4KHguY3kpfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cdH1cblxuXHRhc1RvZ2dsZSh4KXtcblx0XHRpZih4PT11bmRlZmluZWQgfHwgeC52YWw9PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gLTFcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbClcblx0XHR9XG5cdH1cblxuXHR0b1NwYWNpbmcoeCl7XG5cdFx0dmFyIHI9eCwgbz17fVxuXG5cdFx0aWYoIXIuYmVmb3JlQXV0b3NwYWNpbmcgJiYgci5iZWZvcmVMaW5lcylcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZUxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlKSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXJMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmFmdGVyKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxuXG5cdFx0aWYoIXIubGluZSlcblx0XHRcdHJldHVybiBvXG5cblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XG5cdFx0Y2FzZSAnYXRMZWFzdCc6XG5cdFx0Y2FzZSAnZXhhY3QnOlxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMuZHhhMlB4KCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cblx0dG9Cb3JkZXIoeCl7XG5cdFx0dmFyIGJvcmRlcj14XG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdHJldHVybiBib3JkZXJcblx0fVxuXHRcblx0dG9IZWFkZXJGb290ZXIobm9kZSx0YWcpe1xuXHRcdGNvbnN0IHskOntpZCwgdHlwZX19PW5vZGVcblx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMub2ZmaWNlRG9jdW1lbnQucmVsc1tpZF0udGFyZ2V0LCB0aGlzLCB0eXBlKVxuXHRcdHJldHVybiBwYXJ0LnBhcnNlKClcblx0fVxufVxuIl19