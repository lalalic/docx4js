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
					if (directStyle && directStyle.get('pPr.numPr') != undefined) type = "list";
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
					if (control == undefined) control = directStyle.control = { type: "container" };
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
					if (!node.parent.$.control) node.parent.$.control = { type: type };
					break;
				case 'picture':
				case 'docPartList':
				case 'comboBox':
				case 'dropDownList':
				case 'date':
				case 'checkbox':
					node.parent.$.control = { type: type };
					break;
				case 'richtext':
					node.parent.$.control = { type: "container" };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBT1ksTUFBSztPQUNWLE9BQWEsS0FBYixLQURVO09BQ0wsU0FBUSxLQUFSLE9BREs7O0FBRWYsT0FBSSxNQUFJLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsR0FBaEIsRUFBSixDQUZXO0FBR2YsT0FBRyw4RUFBb0IsVUFBcEIsSUFBa0MsT0FBSyxTQUFMLEVBQ3BDLE9BQU8sSUFBUCxDQUREOztBQUdBLE9BQUcsVUFBVSxPQUFPLElBQVAsSUFBZSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQWxCLEVBQXVCLEdBQXZCLE1BQThCLFFBQTlCLEVBQzNCLE9BQU8sSUFBUCxDQUREOztBQUdBLFVBQU8sS0FBUCxDQVRlOzs7O2dDQVlGLE1BQUs7T0FDWCxTQUFRLEtBQUssY0FBTCxDQUFSLE9BRFc7T0FFYixPQUFnQyxLQUFoQyxLQUZhO09BRUssY0FBYyxLQUExQixXQUFZLFlBRkw7O0FBR2xCLE9BQUksT0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQUwsQ0FIYztBQUlsQixXQUFPLElBQVA7QUFDQSxTQUFLLEdBQUw7QUFDQyxTQUFHLGVBQWUsWUFBWSxHQUFaLENBQWdCLFdBQWhCLEtBQThCLFNBQTlCLEVBQ2pCLE9BQUssTUFBTCxDQUREO0FBRUQsV0FIQTtBQURBLFNBS0ssUUFBTDtBQUNDLFNBQUksVUFBUSxLQUFLLFVBQUwsQ0FBZ0IsT0FBaEIsQ0FEYjtBQUVDLFNBQUksY0FBWSxRQUFRLEdBQVIsQ0FBWSxtQkFBWixFQUFpQyxLQUFqQyxDQUF1QyxHQUF2QyxFQUE0QyxHQUE1QyxFQUFaLENBRkw7QUFHQyxhQUFPLFdBQVA7QUFDQSxXQUFLLFNBQUw7QUFDQyxjQUFLLE9BQUwsQ0FERDtBQUVDLFdBQUksS0FBRyxRQUFRLEdBQVIsQ0FBWSx1Q0FBWixDQUFILENBRkw7QUFHQyxZQUFLLFVBQUwsR0FBZ0I7QUFDZixnQkFBTyxLQUFLLFVBQUwsQ0FBZ0IsTUFBaEI7QUFDUCx3Q0FBNkIsSUFBSSxNQUFKLENBQVcsS0FBSyxjQUFMLENBQW9CLE1BQXBCLENBQTJCLEVBQTNCLENBQVgsRUFBMkMsUUFBM0MsQ0FBb0QsUUFBcEQsQ0FBN0I7UUFGRCxDQUhEO0FBT0EsYUFQQTtBQURBO0FBVUMsY0FBSyxXQUFMLENBREQ7QUFFQSxhQUZBO0FBVEEsTUFIRDtBQWdCQSxXQWhCQTtBQUxBLFNBc0JLLFNBQUw7QUFDQyxZQUFPLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUCxDQUREO0FBdEJBLFNBd0JLLEtBQUw7QUFDQyxTQUFJLFVBQVEsWUFBWSxHQUFaLENBQWdCLFNBQWhCLENBQVIsQ0FETDtBQUVDLFNBQUcsV0FBUyxTQUFULEVBQ0YsVUFBUSxZQUFZLE9BQVosR0FBb0IsRUFBQyxNQUFLLFdBQUwsRUFBckIsQ0FEVDtBQUVBLFlBQUssUUFBUSxJQUFSLENBSk47QUFLQSxXQUxBO0FBeEJBLElBSmtCOztBQW9DbEIsVUFBTyxLQUFLLGVBQUwsQ0FBcUIsSUFBckIsRUFBMkIsSUFBM0IsQ0FBUCxDQXBDa0I7Ozs7NkJBdUNSLE1BQU0sTUFBSztBQUNyQixVQUFPLEtBQUssY0FBTCxDQUFvQixNQUFwQixDQUEyQixpQkFBM0IsOEVBQThELE1BQUssS0FBbkUsRUFBeUUsSUFBekUsQ0FBUCxDQURxQjs7OztzQ0FJRixNQUFLLE1BQUs7QUFDN0IsV0FBTyxJQUFQO0FBQ0EsU0FBSyxhQUFMO0FBQ0MsU0FBSSxNQUFJLEtBQUssQ0FBTCxDQUFPLEtBQVAsQ0FBYSxLQUFiLENBQW1CLFVBQW5CLEVBQStCLE1BQS9CLENBQXNDLENBQUMsQ0FBRCxFQUFHLENBQXpDLENBQUosQ0FETDtBQUVDLFVBQUssTUFBTCxDQUFZLENBQVosQ0FBYyxPQUFkLEdBQXNCLEVBQUMsTUFBSyxrQkFBTCxFQUF5QixRQUExQixFQUF0QixDQUZEO0FBR0EsV0FIQTtBQURBLFNBS0ssTUFBTDtBQUNDLFNBQUcsQ0FBQyxLQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWMsT0FBZCxFQUNILEtBQUssTUFBTCxDQUFZLENBQVosQ0FBYyxPQUFkLEdBQXNCLEVBQUMsVUFBRCxFQUF0QixDQUREO0FBRUQsV0FIQTtBQUxBLFNBU0ssU0FBTCxDQVRBO0FBVUEsU0FBSyxhQUFMLENBVkE7QUFXQSxTQUFLLFVBQUwsQ0FYQTtBQVlBLFNBQUssY0FBTCxDQVpBO0FBYUEsU0FBSyxNQUFMLENBYkE7QUFjQSxTQUFLLFVBQUw7QUFDQyxVQUFLLE1BQUwsQ0FBWSxDQUFaLENBQWMsT0FBZCxHQUFzQixFQUFDLFVBQUQsRUFBdEIsQ0FERDtBQUVBLFdBRkE7QUFkQSxTQWlCSyxVQUFMO0FBQ0MsVUFBSyxNQUFMLENBQVksQ0FBWixDQUFjLE9BQWQsR0FBc0IsRUFBQyxNQUFLLFdBQUwsRUFBdkIsQ0FERDtBQUVBLFdBRkE7QUFqQkEsSUFENkI7QUFzQjdCLDBGQUE2QixVQUE3QixDQXRCNkI7Ozs7K0JBeUJqQixNQUFNLE1BQUs7OztPQUNkLElBQWtCLEtBQXBCLEVBRGdCO09BQ0gsT0FBTyxLQUFmLE9BQVEsS0FERzs7QUFFdkIsT0FBRyxRQUFNLFNBQU4sRUFDRixPQUFPLHFDQUF1QixTQUF2QixDQUFQLENBREQ7QUFFQSxPQUFJLGNBQUosQ0FKdUI7QUFLdkIsV0FBTyxJQUFQOztBQUVBLFNBQUssTUFBTDtBQUNDLFlBQU8sRUFBQyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFaLENBQU4sRUFBMkIsUUFBTyxLQUFLLE1BQUwsQ0FBWSxFQUFFLEdBQUYsQ0FBWixDQUFQLEVBQW5DLENBREQ7QUFFQSxXQUZBO0FBRkEsU0FLSyxPQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsT0FBZixDQUF1QjthQUFHLE1BQU0sRUFBRSxLQUFGLENBQVEsR0FBUixFQUFhLEdBQWIsRUFBTixJQUEwQixPQUFLLE1BQUwsQ0FBWSxFQUFFLENBQUYsQ0FBWixDQUExQjtNQUFILENBQXZCLENBRkQ7QUFHQyxZQUFPLEtBQVAsQ0FIRDtBQUlBLFdBSkE7QUFMQSxTQVVLLE1BQUw7QUFDQyxPQUFFLEdBQUYsS0FBVSxFQUFFLEdBQUYsR0FBTSxTQUFTLEVBQUUsR0FBRixDQUFmLENBQVYsQ0FERDtBQUVDLE9BQUUsS0FBRixLQUFZLEVBQUUsS0FBRixHQUFRLEtBQUssTUFBTCxDQUFZLEVBQUUsS0FBRixDQUFwQixDQUFaLENBRkQ7O0FBSUMsU0FBRyxFQUFFLEdBQUYsRUFBTTtBQUNSLFFBQUUsSUFBRixHQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sQ0FBVTtjQUFNO0FBQ3RCLGVBQU0sT0FBSyxNQUFMLENBQVksSUFBSSxDQUFKLENBQWxCO0FBQ0EsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLEtBQUosQ0FBbEI7O09BRmdCLENBQWpCLENBRFE7QUFLUixhQUFPLEVBQUUsR0FBRixDQUxDO01BQVQ7QUFPQSxZQUFPLENBQVAsQ0FYRDtBQVlBLFdBWkE7O0FBVkEsU0F3QkssSUFBTDtBQUNDLFlBQU8sRUFBRSxHQUFGLENBRFI7QUF4QkEsU0EwQkssS0FBTDtBQUNDLFlBQU8sSUFBUCxDQUFZLENBQVosRUFBZSxPQUFmLENBQXVCO2FBQUcsRUFBRSxDQUFGLElBQUssT0FBSyxNQUFMLENBQVksRUFBRSxDQUFGLENBQVosQ0FBTDtNQUFILENBQXZCLENBREQ7QUFFQyxZQUFPLENBQVAsQ0FGRDtBQTFCQSxTQTZCSyxTQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQVAsQ0FERDtBQTdCQSxTQStCSyxNQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsTUFBZixDQUFzQjthQUFHLEtBQUcsR0FBSDtNQUFILENBQXRCLENBQWlDLE9BQWpDLENBQXlDO2FBQUcsTUFBTSxDQUFOLElBQVMsT0FBSyxRQUFMLENBQWMsRUFBRSxDQUFGLEVBQUssQ0FBTCxDQUFkLENBQVQ7TUFBSCxDQUF6QyxDQUZEO0FBR0MsWUFBTyxLQUFQLENBSEQ7O0FBL0JBLFNBb0NLLFFBQUw7QUFDQyxTQUFJLFFBQU0sRUFBRSxPQUFGLEtBQVksS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsWUFBRixDQUFsQyxDQUFaLENBRFg7QUFFQyxTQUFJLE9BQUssRUFBRSxVQUFGLEtBQWUsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsZUFBRixDQUFsQyxDQUFmLENBRlY7O0FBSUMsU0FBRyxTQUFTLElBQVQsRUFDRixPQUFPLEVBQUMsWUFBRCxFQUFRLFVBQVIsRUFBUCxDQUREO0FBRUQsV0FOQTtBQXBDQSxTQTJDSyxNQUFMLENBM0NBO0FBNENBLFNBQUssV0FBTDtBQUNDLFlBQU8sRUFBRSxHQUFGLENBRFI7QUE1Q0EsU0E4Q0ssSUFBTDtBQUNDLFlBQU8sS0FBSyxLQUFMLENBQVcsU0FBUyxFQUFFLEtBQUYsQ0FBVCxJQUFtQixDQUFuQixDQUFsQixDQUREO0FBOUNBLFNBZ0RLLEdBQUw7QUFDQyxZQUFPLFNBQVMsRUFBRSxHQUFGLENBQVQsR0FBZ0IsS0FBaEIsQ0FEUjtBQWhEQSxTQWtESyxNQUFMO0FBQ0MsWUFBTyxTQUFTLEVBQUUsR0FBRixDQUFULEdBQWdCLENBQWhCLENBRFI7QUFsREEsU0FvREssU0FBTCxDQXBEQTtBQXFEQSxTQUFLLFVBQUw7QUFDQyxZQUFPLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFuQixDQUREO0FBckRBLFNBdURLLEdBQUwsQ0F2REE7QUF3REEsU0FBSyxRQUFMLENBeERBO0FBeURBLFNBQUssR0FBTCxDQXpEQTtBQTBEQSxTQUFLLFdBQUwsQ0ExREE7QUEyREEsU0FBSyxHQUFMO0FBQ0MsWUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERDtBQTNEQSxTQTZESyxZQUFMLENBN0RBO0FBOERBLFNBQUssT0FBTDtBQUNDLFlBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxHQUFGLElBQVMsS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQStCLEdBQS9CLENBQW1DLEVBQUUsVUFBRixDQUE1QyxDQUFwQixDQUREO0FBOURBLFNBZ0VLLEdBQUw7QUFDQyxZQUFPLENBQVAsQ0FERDtBQWhFQSxTQWtFSyxLQUFMO0FBQ0MsWUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERDs7QUFsRUEsU0FxRUssU0FBTDtBQUNDLFlBQU8sQ0FBUCxDQUREO0FBckVBLFNBdUVLLFNBQUw7QUFDQyxZQUFPLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUI7YUFBRyxPQUFLLE1BQUwsQ0FBWSxFQUFFLENBQUYsQ0FBSSxDQUFKO01BQWYsQ0FBeEIsQ0FERDtBQXZFQSxTQXlFSyxXQUFMLENBekVBO0FBMEVBLFNBQUssWUFBTDtBQUNDLFNBQUksUUFBTSxFQUFOLENBREw7QUFFQyxZQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGFBQUc7QUFDNUIsWUFBTSxDQUFOLElBQVMsT0FBSyxRQUFMLENBQWMsS0FBSyxDQUFMLEVBQVEsQ0FBUixFQUFXLENBQVgsQ0FBdkIsQ0FENEI7TUFBSCxDQUExQixDQUZEO0FBS0MsWUFBTyxLQUFQLENBTEQ7QUExRUEsU0FnRkssS0FBTDtBQUNDLFlBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxJQUFGLENBQXBCLENBREQ7O0FBaEZBLFNBbUZLLFFBQUw7QUFDQyxZQUFPLEVBQUMsT0FBTSxLQUFLLEtBQUwsQ0FBVyxFQUFFLEVBQUYsQ0FBakIsRUFBdUIsUUFBTyxLQUFLLEtBQUwsQ0FBVyxFQUFFLEVBQUYsQ0FBbEIsRUFBL0IsQ0FERDtBQW5GQTtBQXNGQyw0RkFBNkIsVUFBN0IsQ0FERDtBQXJGQSxJQUx1Qjs7OzsyQkErRmYsR0FBRTtBQUNWLE9BQUcsS0FBRyxTQUFILElBQWdCLEVBQUUsR0FBRixJQUFPLFNBQVAsRUFBaUI7QUFDbkMsV0FBTyxDQUFDLENBQUQsQ0FENEI7SUFBcEMsTUFFSztBQUNKLFdBQU8sU0FBUyxFQUFFLEdBQUYsQ0FBaEIsQ0FESTtJQUZMOzs7OzRCQU9TLEdBQUU7QUFDWCxPQUFJLElBQUUsQ0FBRjtPQUFLLElBQUUsRUFBRixDQURFOztBQUdYLE9BQUcsQ0FBQyxFQUFFLGlCQUFGLElBQXVCLEVBQUUsV0FBRixFQUMxQixFQUFFLEdBQUYsR0FBTSxLQUFLLE1BQUwsQ0FBYSxFQUFFLFdBQUYsQ0FBbkIsQ0FERCxLQUVLLElBQUcsRUFBRSxNQUFGLEVBQ1AsRUFBRSxHQUFGLEdBQU0sS0FBSyxNQUFMLENBQWEsRUFBRSxNQUFGLENBQW5CLENBREk7O0FBR0wsT0FBRyxDQUFDLEVBQUUsZ0JBQUYsSUFBc0IsRUFBRSxVQUFGLEVBQ3pCLEVBQUUsTUFBRixHQUFTLEtBQUssTUFBTCxDQUFhLEVBQUUsVUFBRixDQUF0QixDQURELEtBRUssSUFBRyxFQUFFLEtBQUYsRUFDUCxFQUFFLE1BQUYsR0FBUyxLQUFLLE1BQUwsQ0FBYSxFQUFFLEtBQUYsQ0FBdEIsQ0FESTs7QUFHTCxPQUFHLENBQUMsRUFBRSxJQUFGLEVBQ0gsT0FBTyxDQUFQLENBREQ7O0FBR0EsV0FBTyxFQUFFLFFBQUY7QUFDUCxTQUFLLFNBQUwsQ0FEQTtBQUVBLFNBQUssT0FBTDtBQUNDLE9BQUUsVUFBRixHQUFhLEtBQUssTUFBTCxDQUFhLEVBQUUsSUFBRixDQUExQixDQUREO0FBRUMsV0FGRDtBQUZBLFNBS0ssTUFBTCxDQUxBO0FBTUE7QUFDQyxPQUFFLFVBQUYsR0FBYSxRQUFDLENBQVMsRUFBRSxJQUFGLENBQVQsR0FBaUIsR0FBakIsR0FBcUIsR0FBckIsR0FBMEIsR0FBM0IsQ0FEZDtBQU5BLElBaEJXO0FBeUJYLEtBQUUsUUFBRixHQUFXLEVBQUUsUUFBRixDQXpCQTtBQTBCWCxVQUFPLENBQVAsQ0ExQlc7Ozs7MkJBNkJILEdBQUU7QUFDVixPQUFJLFNBQU8sQ0FBUCxDQURNO0FBRVYsVUFBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUZVO0FBR1YsVUFBTyxLQUFQLEtBQWlCLE9BQU8sS0FBUCxHQUFhLEtBQUssT0FBTCxDQUFhLE9BQU8sS0FBUCxDQUExQixDQUFqQixDQUhVO0FBSVYsVUFBTyxNQUFQLENBSlU7Ozs7aUNBT0ksTUFBSyxLQUFJO2lCQUNGLEtBQWQsRUFEZ0I7T0FDYixnQkFEYTtPQUNULG9CQURTOztBQUV2QixPQUFJLE9BQUssSUFBSSxZQUFKLENBQWlCLEtBQUssY0FBTCxDQUFvQixJQUFwQixDQUF5QixFQUF6QixFQUE2QixNQUE3QixFQUFxQyxJQUF0RCxFQUE0RCxJQUE1RCxDQUFMLENBRm1CO0FBR3ZCLFVBQU8sS0FBSyxLQUFMLEVBQVAsQ0FIdUI7Ozs7c0JBL05SO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRpc1Byb3BlcnR5KG5vZGUpe1xuXHRcdGxldCB7bmFtZSxwYXJlbnR9PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdGlmKHN1cGVyLmlzUHJvcGVydHkoLi4uYXJndW1lbnRzKSB8fCB0YWc9PSd0YmxHcmlkJylcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0XG5cdFx0aWYocGFyZW50ICYmIHBhcmVudC5uYW1lICYmIHBhcmVudC5uYW1lLnNwbGl0KCc6JykucG9wKCk9PSdpbmxpbmUnKVxuXHRcdFx0cmV0dXJuIHRydWVcblx0XHRcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRcblx0Y3JlYXRlRWxlbWVudChub2RlKXtcblx0XHRjb25zdCB7c3R5bGVzfT10aGlzLm9mZmljZURvY3VtZW50XG5cdFx0bGV0IHtuYW1lLCBhdHRyaWJ1dGVzOntkaXJlY3RTdHlsZX19PW5vZGVcblx0XHRsZXQgdHlwZT1uYW1lLnNwbGl0KCc6JykucG9wKClcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlLmdldCgncFByLm51bVByJykhPXVuZGVmaW5lZClcblx0XHRcdFx0dHlwZT1cImxpc3RcIlxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImlubGluZVwiOlxuXHRcdFx0bGV0IGdyYXBoaWM9bm9kZS5hdHRyaWJ1dGVzLmdyYXBoaWNcblx0XHRcdGxldCBncmFwaGljVHlwZT1ncmFwaGljLmdldChcImdyYXBoaWNEYXRhLiQudXJpXCIpLnNwbGl0KCcvJykucG9wKClcblx0XHRcdHN3aXRjaChncmFwaGljVHlwZSl7XG5cdFx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRcdFx0dHlwZT1cImltYWdlXCJcblx0XHRcdFx0bGV0IGlkPWdyYXBoaWMuZ2V0KFwiZ3JhcGhpY0RhdGEucGljLmJsaXBGaWxsLmJsaXAuJC5lbWJlZFwiKVxuXHRcdFx0XHRub2RlLmF0dHJpYnV0ZXM9e1xuXHRcdFx0XHRcdGV4dGVudDpub2RlLmF0dHJpYnV0ZXMuZXh0ZW50LFxuXHRcdFx0XHRcdHNyYzpgZGF0YTppbWFnZS9qcGc7YmFzZTY0LCR7bmV3IEJ1ZmZlcih0aGlzLm9mZmljZURvY3VtZW50LmdldFJlbChpZCkpLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG5cdFx0XHRcdH1cblx0XHRcdGJyZWFrXG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHR0eXBlPWdyYXBoaWNUeXBlXG5cdFx0XHRicmVha1xuXHRcdFx0fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSBcImRyYXdpbmdcIjpcblx0XHRcdHJldHVybiBub2RlLmNoaWxkcmVuWzBdXG5cdFx0Y2FzZSBcInNkdFwiOlxuXHRcdFx0bGV0IGNvbnRyb2w9ZGlyZWN0U3R5bGUuZ2V0KFwiY29udHJvbFwiKVxuXHRcdFx0aWYoY29udHJvbD09dW5kZWZpbmVkKVxuXHRcdFx0XHRjb250cm9sPWRpcmVjdFN0eWxlLmNvbnRyb2w9e3R5cGU6XCJjb250YWluZXJcIn1cblx0XHRcdHR5cGU9Y29udHJvbC50eXBlXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdHlwZSlcblx0fVxuXG5cdHRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0cmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLmNyZWF0ZURpcmVjdFN0eWxlKHN1cGVyLnRvUHJvcGVydHkobm9kZSx0eXBlKSx0eXBlKVxuXHR9XG5cdFxuXHRvblRvQ29udHJvbFByb3BlcnR5KG5vZGUsdHlwZSl7XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2RhdGFCaW5kaW5nJzpcblx0XHRcdGxldCBrZXk9bm9kZS4kLnhwYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLnNwbGljZSgtMiwxKVxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOidkb2N1bWVudFByb3BlcnR5Jywga2V5fVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAndGV4dCc6XG5cdFx0XHRpZighbm9kZS5wYXJlbnQuJC5jb250cm9sKVxuXHRcdFx0XHRub2RlLnBhcmVudC4kLmNvbnRyb2w9e3R5cGV9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdwaWN0dXJlJzpcblx0XHRjYXNlICdkb2NQYXJ0TGlzdCc6IFxuXHRcdGNhc2UgJ2NvbWJvQm94JzogXG5cdFx0Y2FzZSAnZHJvcERvd25MaXN0JzogXG5cdFx0Y2FzZSAnZGF0ZSc6XG5cdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAncmljaHRleHQnOlxuXHRcdFx0bm9kZS5wYXJlbnQuJC5jb250cm9sPXt0eXBlOlwiY29udGFpbmVyXCJ9XG5cdFx0YnJlYWtcblx0XHR9XG5cdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRvblRvUHJvcGVydHkobm9kZSwgdHlwZSl7XG5cdFx0Y29uc3QgeyQ6eCwgcGFyZW50OntuYW1lfX09bm9kZVxuXHRcdGlmKG5hbWU9PSd3OnNkdFByJylcblx0XHRcdHJldHVybiBvblRvQ29udHJvbFByb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHRsZXQgdmFsdWVcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0XHQvL3NlY3Rpb24sIHNlY3RQclxuXHRcdGNhc2UgJ3BnU3onOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXHRcdGNhc2UgJ2NvbHMnOlxuXHRcdFx0eC5udW0gJiYgKHgubnVtPXBhcnNlSW50KHgubnVtKSk7XG5cdFx0XHR4LnNwYWNlICYmICh4LnNwYWNlPXRoaXMuZHhhMlB4KHguc3BhY2UpKTtcblxuXHRcdFx0aWYoeC5jb2wpe1xuXHRcdFx0XHR4LmRhdGE9eC5jb2wubWFwKGNvbD0+KHtcblx0XHRcdFx0XHR3aWR0aDp0aGlzLmR4YTJQeChjb2wudyksXG5cdFx0XHRcdFx0c3BhY2U6dGhpcy5keGEyUHgoY29sLnNwYWNlKVxuXHRcdFx0XHR9KSlcblx0XHRcdFx0ZGVsZXRlIHguY29sXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4geFxuXHRcdGJyZWFrXG5cdFx0Ly9wYXJhZ3JhcGgsIHBQclxuXHRcdGNhc2UgJ2pjJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ2luZCc6XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnhbYV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ3NwYWNpbmcnOlxuXHRcdFx0cmV0dXJuIHRoaXMudG9TcGFjaW5nKHgpXG5cdFx0Y2FzZSAncEJkcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZmlsdGVyKGE9PmEhPSckJykuZm9yRWFjaChhPT52YWx1ZVthXT10aGlzLnRvQm9yZGVyKHhbYV1bMF0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0Ly9pbmxpbmUsIHJQclxuXHRcdGNhc2UgJ3JGb250cyc6XG5cdFx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcblx0XHRcdGxldCBhc2lhPXhbJ2Vhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4WydlYXN0QXNpYVRoZW1lJ10pXG5cblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdsYW5nJzpcblx0XHRjYXNlICd2ZXJ0QWxpZ24nOlxuXHRcdFx0cmV0dXJuIHgudmFsXG5cdFx0Y2FzZSAnc3onOlxuXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoeFsndmFsJ10pLzIpXG5cdFx0Y2FzZSAndyc6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzEwMC4wXG5cdFx0Y2FzZSAna2Vybic6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeC52YWwpLzJcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRjYXNlICdwb3NpdGlvbic6XG5cdFx0XHRyZXR1cm4gdGhpcy5keGEyUHgoeC52YWwpXG5cdFx0Y2FzZSAnaSc6XG5cdFx0Y2FzZSAndmFuaXNoJzpcblx0XHRjYXNlICd1Jzpcblx0XHRjYXNlICdzbWFsbENhcHMnOlxuXHRcdGNhc2UgJ2InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNUb2dnbGUoeClcblx0XHRjYXNlICdoaWdodGxpZ2h0Jzpcblx0XHRjYXNlICdjb2xvcic6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHgudmFsIHx8IHRoaXMub2ZmaWNlRG9jdW1lbnQudGhlbWVDb2xvci5nZXQoeC50aGVtZUNvbG9yKSlcblx0XHRjYXNlICd1Jzpcblx0XHRcdHJldHVybiB4XG5cdFx0Y2FzZSAnYmR4Jzpcblx0XHRcdHJldHVybiB0aGlzLnRvQm9yZGVyKHgpXG5cdFx0Ly90YWJsZVxuXHRcdGNhc2UgJ3RibExvb2snOlxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICd0YmxHcmlkJzpcblx0XHRcdHJldHVybiBub2RlLmdyaWRDb2wubWFwKGE9PnRoaXMuZHhhMlB4KGEuJC53KSlcblx0XHRjYXNlICd0Y0JvcmRlcnMnOlxuXHRcdGNhc2UgJ3RibEJvcmRlcnMnOlxuXHRcdFx0bGV0IHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyhub2RlKS5mb3JFYWNoKGE9Pntcblx0XHRcdFx0dmFsdWVbYV09dGhpcy50b0JvcmRlcihub2RlW2FdWzBdLiQpXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdGNhc2UgJ3NoZCc6XG5cdFx0XHRyZXR1cm4gdGhpcy5hc0NvbG9yKHguZmlsbClcblx0XHQvL2RyYXdpbmdcblx0XHRjYXNlICdleHRlbnQnOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmNtMlB4KHguY3gpLGhlaWdodDp0aGlzLmNtMlB4KHguY3kpfVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cdH1cblxuXHRhc1RvZ2dsZSh4KXtcblx0XHRpZih4PT11bmRlZmluZWQgfHwgeC52YWw9PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gLTFcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbClcblx0XHR9XG5cdH1cblxuXHR0b1NwYWNpbmcoeCl7XG5cdFx0dmFyIHI9eCwgbz17fVxuXG5cdFx0aWYoIXIuYmVmb3JlQXV0b3NwYWNpbmcgJiYgci5iZWZvcmVMaW5lcylcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZUxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlKSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXJMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmFmdGVyKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxuXG5cdFx0aWYoIXIubGluZSlcblx0XHRcdHJldHVybiBvXG5cblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XG5cdFx0Y2FzZSAnYXRMZWFzdCc6XG5cdFx0Y2FzZSAnZXhhY3QnOlxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMuZHhhMlB4KCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cblx0dG9Cb3JkZXIoeCl7XG5cdFx0dmFyIGJvcmRlcj14XG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdHJldHVybiBib3JkZXJcblx0fVxuXHRcblx0dG9IZWFkZXJGb290ZXIobm9kZSx0YWcpe1xuXHRcdGNvbnN0IHskOntpZCwgdHlwZX19PW5vZGVcblx0XHRsZXQgcGFydD1uZXcgSGVhZGVyRm9vdGVyKHRoaXMub2ZmaWNlRG9jdW1lbnQucmVsc1tpZF0udGFyZ2V0LCB0aGlzLCB0eXBlKVxuXHRcdHJldHVybiBwYXJ0LnBhcnNlKClcblx0fVxufVxuIl19