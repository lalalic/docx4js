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

			var type = name.split(':').pop();
			switch (type) {
				case "p":
					type = "paragraph";
					if (directStyle && directStyle.get('pPr.numPr') != undefined) type = "list";
					break;
				case "r":
					type = "inline";
					break;
				case "t":
					type = "text";
					break;
				case "tbl":
					type = "table";
					break;
				case "tr":
					type = "row";
					break;
				case "tc":
					type = "cell";
					break;
				case "hdr":
					type = "header";
					break;
				case "ftr":
					type = "footer";
					break;
				case "inline":
					var graphic = node.attributes.graphic;
					var graphicType = graphic.get("graphicData.$.uri").split('/').pop();
					switch (graphicType) {
						case 'picture':
							type = "image";
							var id = graphic.get("graphicData.pic.blipFill.blip.$.embed");
							node.attributes = {
								extent: node.attributes.extent,
								src: "data:image/jpg;base64," + new Buffer(this.officeDocument.getRel(id)).toString('base64')
							};
							break;
						default:
							type = graphicType;
							break;
					}
					break;
				case "drawing":
					return node.children[0];
				case "sdt":
					var control = directStyle.get("control");
					if (control == undefined) control = directStyle.control = { type: "control.richtext" };
					type = control.type;
					break;
			}

			return this.onCreateElement(node, type);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			return this.officeDocument.styles.createDirectStyle(_get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node, type), type);
		}
	}, {
		key: "onToControlProperty",
		value: function onToControlProperty(node, type) {
			switch (type) {
				case 'dataBinding':
					var key = node.$.xpath.split(/[\/\:\[]/).splice(-2, 1);
					node.parent.$.control = { type: 'documentProperty', key: key };
					break;
				case 'text':
					if (!node.parent.$.control) node.parent.$.control = { type: "control." + type };
					break;
				case 'picture':
				case 'docPartList':
				case 'comboBox':
				case 'dropDownList':
				case 'date':
				case 'checkbox':
					node.parent.$.control = { type: "control." + type };
					break;
				case 'richtext':
					node.parent.$.control = { type: "control.richtext" };
					break;
			}
			return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).apply(this, arguments);
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node, type) {
			var _this2 = this;

			var x = node.$;
			var name = node.parent.name;

			if (name == 'w:sdtPr') return onToControlProperty.apply(undefined, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1ksTUFBSztPQUNWLE9BQWEsS0FBYixLQURVO09BQ0wsU0FBUSxLQUFSLE9BREs7O0FBRWYsT0FBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZXO0FBR2YsT0FBRyw4RUFBb0IsVUFBcEIsSUFBa0MsT0FBSyxTQUFMLEVBQ3BDLE9BQU8sSUFBUCxDQUREOztBQUdBLE9BQUcsVUFBVSxPQUFPLElBQVAsSUFBZSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLE1BQThCLFFBQTlCLEVBQzNCLE9BQU8sSUFBUCxDQUREOztBQUdBLFVBQU8sS0FBUCxDQVRlOzs7O2dDQVlGLE1BQUs7T0FDWCxTQUFRLEtBQUssY0FBTCxDQUFSLE9BRFc7T0FFYixPQUFnQyxLQUFoQyxLQUZhO09BRUssY0FBYyxLQUExQixXQUFZLFlBRkw7O0FBR2xCLE9BQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FIYztBQUlsQixXQUFPLElBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxZQUFLLFdBQUwsQ0FERDtBQUVDLFNBQUcsZUFBZSxZQUFZLEdBQVosQ0FBZ0IsV0FBaEIsS0FBOEIsU0FBOUIsRUFDakIsT0FBSyxNQUFMLENBREQ7QUFFRCxXQUpBO0FBREEsU0FNSyxHQUFMO0FBQ0MsWUFBSyxRQUFMLENBREQ7QUFFQSxXQUZBO0FBTkEsU0FTSyxHQUFMO0FBQ0MsWUFBSyxNQUFMLENBREQ7QUFFQSxXQUZBO0FBVEEsU0FZSyxLQUFMO0FBQ0MsWUFBSyxPQUFMLENBREQ7QUFFQSxXQUZBO0FBWkEsU0FlSyxJQUFMO0FBQ0MsWUFBSyxLQUFMLENBREQ7QUFFQSxXQUZB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YSxLQUFLLE1BQUwsQ0FBYSxFQUFFLElBQUYsQ0FBMUIsQ0FERDtBQUVDLFdBRkQ7QUFGQSxTQUtLLE1BQUwsQ0FMQTtBQU1BO0FBQ0MsT0FBRSxVQUFGLEdBQWEsUUFBQyxDQUFTLEVBQUUsSUFBRixDQUFULEdBQWlCLEdBQWpCLEdBQXFCLEdBQXJCLEdBQTBCLEdBQTNCLENBRGQ7QUFOQSxJQWhCVztBQXlCWCxLQUFFLFFBQUYsR0FBVyxFQUFFLFFBQUYsQ0F6QkE7QUEwQlgsVUFBTyxDQUFQLENBMUJXOzs7OzJCQTZCSCxHQUFFO0FBQ1YsT0FBSSxTQUFPLENBQVAsQ0FETTtBQUVWLFVBQU8sRUFBUCxLQUFjLE9BQU8sRUFBUCxHQUFVLE9BQU8sRUFBUCxHQUFVLENBQVYsQ0FBeEIsQ0FGVTtBQUdWLFVBQU8sS0FBUCxLQUFpQixPQUFPLEtBQVAsR0FBYSxLQUFLLE9BQUwsQ0FBYSxPQUFPLEtBQVAsQ0FBMUIsQ0FBakIsQ0FIVTtBQUlWLFVBQU8sTUFBUCxDQUpVOzs7O2lDQU9JLE1BQUssS0FBSTtpQkFDRixLQUFkLEVBRGdCO09BQ2IsZ0JBRGE7T0FDVCxvQkFEUzs7QUFFdkIsT0FBSSxPQUFLLElBQUksWUFBSixDQUFpQixLQUFLLGNBQUwsQ0FBb0IsSUFBcEIsQ0FBeUIsRUFBekIsRUFBNkIsTUFBN0IsRUFBcUMsSUFBdEQsRUFBNEQsSUFBNUQsQ0FBTCxDQUZtQjtBQUd2QixVQUFPLEtBQUssS0FBTCxFQUFQLENBSHVCOzs7O3NCQXJQUjtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7Ozs7O09BRVQiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vZG9jdW1lbnRcIlxuaW1wb3J0IE9mZmljZURvY3VtZW50IGZyb20gXCIuL29mZmljZURvY3VtZW50XCJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNle1xuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PU9mZmljZURvY3VtZW50XG5cblx0aXNQcm9wZXJ0eShub2RlKXtcblx0XHRsZXQge25hbWUscGFyZW50fT1ub2RlXG5cdFx0bGV0IHRhZz1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRpZihzdXBlci5pc1Byb3BlcnR5KC4uLmFyZ3VtZW50cykgfHwgdGFnPT0ndGJsR3JpZCcpXG5cdFx0XHRyZXR1cm4gdHJ1ZVxuXHRcdFxuXHRcdGlmKHBhcmVudCAmJiBwYXJlbnQubmFtZSAmJiBwYXJlbnQubmFtZS5zcGxpdCgnOicpLnBvcCgpPT0naW5saW5lJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0XG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0Y29uc3Qge3N0eWxlc309dGhpcy5vZmZpY2VEb2N1bWVudFxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9fT1ub2RlXG5cdFx0bGV0IHR5cGU9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgXCJwXCI6XG5cdFx0XHR0eXBlPVwicGFyYWdyYXBoXCJcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlLmdldCgncFByLm51bVByJykhPXVuZGVmaW5lZClcblx0XHRcdFx0dHlwZT1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInJcIjpcblx0XHRcdHR5cGU9XCJpbmxpbmVcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInRcIjpcblx0XHRcdHR5cGU9XCJ0ZXh0XCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJ0YmxcIjpcblx0XHRcdHR5cGU9XCJ0YWJsZVwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwidHJcIjpcblx0XHRcdHR5cGU9XCJyb3dcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcInRjXCI6XG5cdFx0XHR0eXBlPVwiY2VsbFwiXG5cdFx0YnJlYWtcblx0XHRjYXNlIFwiaGRyXCI6XG5cdFx0XHR0eXBlPVwiaGVhZGVyXCJcblx0XHRicmVha1xuXHRcdGNhc2UgXCJmdHJcIjpcblx0XHRcdHR5cGU9XCJmb290ZXJcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImlubGluZVwiOlxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcblx0XHRcdGxldCBncmFwaGljVHlwZT1ncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKClcblx0XHRcdHN3aXRjaChncmFwaGljVHlwZSl7XG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcblx0XHRcdFx0bGV0IGlkPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEucGljLmJsaXBGaWxsLmJsaXAuJC5lbWJlZFwiKVxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxuXHRcdFx0XHRcdHNyYzpgZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7bmV3IEJ1ZmZlcih0aGlzLm9mZmljZURvY3VtZW50LmdldFJlbChpZCkpLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0eXBlPWdyYXBoaWNUeXBlXG5cdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImRyYXdpbmdcIjpcblx0XHRcdHJldHVybiBub2RlLmNoaWxkcmVuWzBdXG5cdFx0Y2FzZSBcInNkdFwiOlxuXHRcdFx0bGV0IGNvbnRyb2w9ZGlyZWN0U3R5bGUuZ2V0KFwiY29udHJvbFwiKVxuXHRcdFx0aWYoY29udHJvbD09dW5kZWZpbmVkKVxuXHRcdFx0XHRjb250cm9sPWRpcmVjdFN0eWxlLmNvbnRyb2w9e3R5cGU6XCJjb250cm9sLnJpY2h0ZXh0XCJ9XG5cdFx0XHR0eXBlPWNvbnRyb2wudHlwZVxuXHRcdGJyZWFrXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMub25DcmVhdGVFbGVtZW50KG5vZGUsIHR5cGUpXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcy5jcmVhdGVEaXJlY3RTdHlsZShzdXBlci50b1Byb3BlcnR5KG5vZGUsdHlwZSksdHlwZSlcblx0fVxuXHRcblx0b25Ub0NvbnRyb2xQcm9wZXJ0eShub2RlLHR5cGUpe1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdkYXRhQmluZGluZyc6XG5cdFx0XHRsZXQga2V5PW5vZGUuJC54cGF0aC5zcGxpdCgvW1xcL1xcOlxcW10vKS5zcGxpY2UoLTIsMSlcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTonZG9jdW1lbnRQcm9wZXJ0eScsIGtleX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3RleHQnOlxuXHRcdFx0aWYoIW5vZGUucGFyZW50LiQuY29udHJvbClcblx0XHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOmBjb250cm9sLiR7dHlwZX1gfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGljdHVyZSc6XG5cdFx0Y2FzZSAnZG9jUGFydExpc3QnOiBcblx0XHRjYXNlICdjb21ib0JveCc6IFxuXHRcdGNhc2UgJ2Ryb3BEb3duTGlzdCc6IFxuXHRcdGNhc2UgJ2RhdGUnOlxuXHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpgY29udHJvbC4ke3R5cGV9YH1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3JpY2h0ZXh0Jzpcblx0XHRcdG5vZGUucGFyZW50LiQuY29udHJvbD17dHlwZTpcImNvbnRyb2wucmljaHRleHRcIn1cblx0XHRicmVha1xuXHRcdH1cblx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRjb25zdCB7JDp4LCBwYXJlbnQ6e25hbWV9fT1ub2RlXG5cdFx0aWYobmFtZT09J3c6c2R0UHInKVxuXHRcdFx0cmV0dXJuIG9uVG9Db250cm9sUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdGxldCB2YWx1ZVxuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRcdC8vc2VjdGlvbiwgc2VjdFByXG5cdFx0Y2FzZSAncGdTeic6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuZHhhMlB4KHhbJ3cnXSksIGhlaWdodDp0aGlzLmR4YTJQeCh4WydoJ10pfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncGdNYXInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+dmFsdWVbYS5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnY29scyc6XG5cdFx0XHR4Lm51bSAmJiAoeC5udW09cGFyc2VJbnQoeC5udW0pKTtcblx0XHRcdHguc3BhY2UgJiYgKHguc3BhY2U9dGhpcy5keGEyUHgoeC5zcGFjZSkpO1xuXG5cdFx0XHRpZih4LmNvbCl7XG5cdFx0XHRcdHguZGF0YT14LmNvbC5tYXAoY29sPT4oe1xuXHRcdFx0XHRcdHdpZHRoOnRoaXMuZHhhMlB4KGNvbC53KSxcblx0XHRcdFx0XHRzcGFjZTp0aGlzLmR4YTJQeChjb2wuc3BhY2UpXG5cdFx0XHRcdH0pKVxuXHRcdFx0XHRkZWxldGUgeC5jb2xcblx0XHRcdH1cblx0XHRcdHJldHVybiB4XG5cdFx0YnJlYWtcblx0XHQvL3BhcmFncmFwaCwgcFByXG5cdFx0Y2FzZSAnamMnOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnaW5kJzpcblx0XHRcdE9iamVjdC5rZXlzKHgpLmZvckVhY2goYT0+eFthXT10aGlzLmR4YTJQeCh4W2FdKSlcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b1NwYWNpbmcoeClcblx0XHRjYXNlICdwQmRyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5maWx0ZXIoYT0+YSE9JyQnKS5mb3JFYWNoKGE9PnZhbHVlW2FdPXRoaXMudG9Cb3JkZXIoeFthXVswXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHQvL2lubGluZSwgclByXG5cdFx0Y2FzZSAnckZvbnRzJzpcblx0XHRcdGxldCBhc2NpaT14Wydhc2NpaSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnYXNjaWlUaGVtZSddKVxuXHRcdFx0bGV0IGFzaWE9eFsnZWFzdEFzaWEnXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2Vhc3RBc2lhVGhlbWUnXSlcblxuXHRcdFx0aWYoYXNjaWkgfHwgYXNpYSlcblx0XHRcdFx0cmV0dXJuIHthc2NpaSwgYXNpYX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ2xhbmcnOlxuXHRcdGNhc2UgJ3ZlcnRBbGlnbic6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd2YWwnXSkvMilcblx0XHRjYXNlICd3Jzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMTAwLjBcblx0XHRjYXNlICdrZXJuJzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbCkvMlxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdGNhc2UgJ3Bvc2l0aW9uJzpcblx0XHRcdHJldHVybiB0aGlzLmR4YTJQeCh4LnZhbClcblx0XHRjYXNlICdpJzpcblx0XHRjYXNlICd2YW5pc2gnOlxuXHRcdGNhc2UgJ3UnOlxuXHRcdGNhc2UgJ3NtYWxsQ2Fwcyc6XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc1RvZ2dsZSh4KVxuXHRcdGNhc2UgJ2hpZ2h0bGlnaHQnOlxuXHRcdGNhc2UgJ2NvbG9yJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC52YWwgfHwgdGhpcy5vZmZpY2VEb2N1bWVudC50aGVtZUNvbG9yLmdldCh4LnRoZW1lQ29sb3IpKVxuXHRcdGNhc2UgJ3UnOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdiZHgnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9Cb3JkZXIoeClcblx0XHQvL3RhYmxlXG5cdFx0Y2FzZSAndGJsTG9vayc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3RibEdyaWQnOlxuXHRcdFx0cmV0dXJuIG5vZGUuZ3JpZENvbC5tYXAoYT0+dGhpcy5keGEyUHgoYS4kLncpKVxuXHRcdGNhc2UgJ3RjQm9yZGVycyc6XG5cdFx0Y2FzZSAndGJsQm9yZGVycyc6XG5cdFx0XHRsZXQgdmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goYT0+e1xuXHRcdFx0XHR2YWx1ZVthXT10aGlzLnRvQm9yZGVyKG5vZGVbYV1bMF0uJClcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0Y2FzZSAnc2hkJzpcblx0XHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5maWxsKVxuXHRcdC8vZHJhd2luZ1xuXHRcdGNhc2UgJ2V4dGVudCc6XG5cdFx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuY20yUHgoeC5jeCksaGVpZ2h0OnRoaXMuY20yUHgoeC5jeSl9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBzdXBlci5vblRvUHJvcGVydHkoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXG5cdGFzVG9nZ2xlKHgpe1xuXHRcdGlmKHg9PXVuZGVmaW5lZCB8fCB4LnZhbD09dW5kZWZpbmVkKXtcblx0XHRcdHJldHVybiAtMVxuXHRcdH1lbHNle1xuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKVxuXHRcdH1cblx0fVxuXG5cdHRvU3BhY2luZyh4KXtcblx0XHR2YXIgcj14LCBvPXt9XG5cblx0XHRpZighci5iZWZvcmVBdXRvc3BhY2luZyAmJiByLmJlZm9yZUxpbmVzKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlTGluZXMpKVxuXHRcdGVsc2UgaWYoci5iZWZvcmUpXG5cdFx0XHRvLnRvcD10aGlzLmR4YTJQeCgoci5iZWZvcmUpKVxuXG5cdFx0aWYoIXIuYWZ0ZXJBdXRvc3BhY2luZyAmJiByLmFmdGVyTGluZXMpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlckxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYWZ0ZXIpXG5cdFx0XHRvLmJvdHRvbT10aGlzLmR4YTJQeCgoci5hZnRlcikpXG5cblx0XHRpZighci5saW5lKVxuXHRcdFx0cmV0dXJuIG9cblxuXHRcdHN3aXRjaCh4LmxpbmVSdWxlKXtcblx0XHRjYXNlICdhdExlYXN0Jzpcblx0XHRjYXNlICdleGFjdCc6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9dGhpcy5keGEyUHgoKHgubGluZSkpXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRvLmxpbmVIZWlnaHQ9KHBhcnNlSW50KHIubGluZSkqMTAwLzI0MCkrJyUnXG5cdFx0fVxuXHRcdG8ubGluZVJ1bGU9eC5saW5lUnVsZVxuXHRcdHJldHVybiBvXG5cdH1cblxuXHR0b0JvcmRlcih4KXtcblx0XHR2YXIgYm9yZGVyPXhcblx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0cmV0dXJuIGJvcmRlclxuXHR9XG5cdFxuXHR0b0hlYWRlckZvb3Rlcihub2RlLHRhZyl7XG5cdFx0Y29uc3QgeyQ6e2lkLCB0eXBlfX09bm9kZVxuXHRcdGxldCBwYXJ0PW5ldyBIZWFkZXJGb290ZXIodGhpcy5vZmZpY2VEb2N1bWVudC5yZWxzW2lkXS50YXJnZXQsIHRoaXMsIHR5cGUpXG5cdFx0cmV0dXJuIHBhcnQucGFyc2UoKVxuXHR9XG59XG4iXX0=