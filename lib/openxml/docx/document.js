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
			}

			return this.onCreateElement(node, tag);
		}
	}, {
		key: "toProperty",
		value: function toProperty(node, type) {
			var pr = _get(Object.getPrototypeOf(_class.prototype), "toProperty", this).call(this, node);

			switch (type) {
				case 'pPr':
					return new _styles2.default.paragraph({ pPr: pr }, this.officeDocument.styles, 'pPr.pStyle');
					break;
				case 'rPr':
					return new _styles2.default.character({ rPr: pr }, this.officeDocument.styles, 'rPr.rStyle');
					break;
				case 'tblPr':
					return new _styles2.default.table({ tblPr: pr }, this.officeDocument.styles, 'tblPr.tblStyle');
					break;
				default:
					return pr;
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2UsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksT0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsSUFKa0I7O0FBV2xCLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLENBQVAsQ0FYa0I7Ozs7NkJBY1IsTUFBTSxNQUFLO0FBQ3JCLE9BQUksa0ZBQW9CLEtBQXBCLENBRGlCOztBQUdyQixXQUFPLElBQVA7QUFDQSxTQUFLLEtBQUw7QUFDQyxZQUFPLElBQUksaUJBQU8sU0FBUCxDQUFpQixFQUFDLEtBQUksRUFBSixFQUF0QixFQUErQixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsWUFBM0QsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssS0FBTDtBQUNDLFlBQU8sSUFBSSxpQkFBTyxTQUFQLENBQWlCLEVBQUMsS0FBSSxFQUFKLEVBQXRCLEVBQStCLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0QixZQUEzRCxDQUFQLENBREQ7QUFFQSxXQUZBO0FBSkEsU0FPSyxPQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPLEtBQVAsQ0FBYSxFQUFDLE9BQU0sRUFBTixFQUFsQixFQUE2QixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsZ0JBQXpELENBQVAsQ0FERDtBQUVBLFdBRkE7QUFQQTtBQVdDLFlBQU8sRUFBUCxDQUREO0FBVkEsSUFIcUI7Ozs7K0JBa0JULE1BQU0sTUFBSzs7O09BQ2QsSUFBRyxLQUFMLEVBRGdCOztBQUV2QixPQUFJLGNBQUosQ0FGdUI7QUFHdkIsV0FBTyxJQUFQOztBQUVBLFNBQUssTUFBTDtBQUNDLFlBQU8sRUFBQyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFaLENBQU4sRUFBMkIsUUFBTyxLQUFLLE1BQUwsQ0FBWSxFQUFFLEdBQUYsQ0FBWixDQUFQLEVBQW5DLENBREQ7QUFFQSxXQUZBO0FBRkEsU0FLSyxPQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsT0FBZixDQUF1QjthQUFHLE1BQU0sRUFBRSxLQUFGLENBQVEsR0FBUixFQUFhLEdBQWIsRUFBTixJQUEwQixPQUFLLE1BQUwsQ0FBWSxFQUFFLENBQUYsQ0FBWixDQUExQjtNQUFILENBQXZCLENBRkQ7QUFHQyxZQUFPLEtBQVAsQ0FIRDtBQUlBLFdBSkE7QUFMQSxTQVVLLE1BQUw7QUFDQyxPQUFFLEdBQUYsS0FBVSxFQUFFLEdBQUYsR0FBTSxTQUFTLEVBQUUsR0FBRixDQUFmLENBQVYsQ0FERDtBQUVDLE9BQUUsS0FBRixLQUFZLEVBQUUsS0FBRixHQUFRLEtBQUssTUFBTCxDQUFZLEVBQUUsS0FBRixDQUFwQixDQUFaLENBRkQ7O0FBSUMsU0FBRyxFQUFFLEdBQUYsRUFBTTtBQUNSLFFBQUUsSUFBRixHQUFPLEVBQUUsR0FBRixDQUFNLEdBQU4sQ0FBVTtjQUFNO0FBQ3RCLGVBQU0sT0FBSyxNQUFMLENBQVksSUFBSSxDQUFKLENBQWxCO0FBQ0EsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLEtBQUosQ0FBbEI7O09BRmdCLENBQWpCLENBRFE7QUFLUixhQUFPLEVBQUUsR0FBRixDQUxDO01BQVQ7QUFPQSxZQUFPLENBQVAsQ0FYRDtBQVlBLFdBWkE7O0FBVkEsU0F3QkssSUFBTDtBQUNDLFlBQU8sRUFBRSxHQUFGLENBRFI7QUF4QkEsU0EwQkssS0FBTDtBQUNDLFlBQU8sSUFBUCxDQUFZLENBQVosRUFBZSxPQUFmLENBQXVCO2FBQUcsRUFBRSxDQUFGLElBQUssT0FBSyxNQUFMLENBQVksRUFBRSxDQUFGLENBQVosQ0FBTDtNQUFILENBQXZCLENBREQ7QUFFQyxZQUFPLENBQVAsQ0FGRDtBQTFCQSxTQTZCSyxTQUFMO0FBQ0MsWUFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQVAsQ0FERDtBQTdCQSxTQStCSyxNQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsTUFBZixDQUFzQjthQUFHLEtBQUcsR0FBSDtNQUFILENBQXRCLENBQWlDLE9BQWpDLENBQXlDO2FBQUcsTUFBTSxDQUFOLElBQVMsT0FBSyxRQUFMLENBQWMsRUFBRSxDQUFGLEVBQUssQ0FBTCxDQUFkLENBQVQ7TUFBSCxDQUF6QyxDQUZEO0FBR0MsWUFBTyxLQUFQLENBSEQ7O0FBL0JBLFNBb0NLLFFBQUw7QUFDQyxTQUFJLFFBQU0sRUFBRSxPQUFGLEtBQVksS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsWUFBRixDQUFsQyxDQUFaLENBRFg7QUFFQyxTQUFJLE9BQUssRUFBRSxVQUFGLEtBQWUsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsZUFBRixDQUFsQyxDQUFmLENBRlY7O0FBSUMsU0FBRyxTQUFTLElBQVQsRUFDRixPQUFPLEVBQUMsWUFBRCxFQUFRLFVBQVIsRUFBUCxDQUREO0FBRUQsV0FOQTtBQXBDQSxTQTJDSyxNQUFMLENBM0NBO0FBNENBLFNBQUssV0FBTDtBQUNDLFlBQU8sRUFBRSxHQUFGLENBRFI7QUE1Q0EsU0E4Q0ssSUFBTDtBQUNDLFlBQU8sS0FBSyxLQUFMLENBQVcsU0FBUyxFQUFFLEtBQUYsQ0FBVCxJQUFtQixDQUFuQixDQUFsQixDQUREO0FBOUNBLFNBZ0RLLEdBQUw7QUFDQyxZQUFPLFNBQVMsRUFBRSxHQUFGLENBQVQsR0FBZ0IsS0FBaEIsQ0FEUjtBQWhEQSxTQWtESyxNQUFMO0FBQ0MsWUFBTyxTQUFTLEVBQUUsR0FBRixDQUFULEdBQWdCLENBQWhCLENBRFI7QUFsREEsU0FvREssU0FBTCxDQXBEQTtBQXFEQSxTQUFLLFVBQUw7QUFDQyxZQUFPLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFuQixDQUREO0FBckRBLFNBdURLLEdBQUwsQ0F2REE7QUF3REEsU0FBSyxRQUFMLENBeERBO0FBeURBLFNBQUssR0FBTCxDQXpEQTtBQTBEQSxTQUFLLFdBQUwsQ0ExREE7QUEyREEsU0FBSyxHQUFMO0FBQ0MsWUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERDtBQTNEQSxTQTZESyxZQUFMLENBN0RBO0FBOERBLFNBQUssT0FBTDtBQUNDLFlBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxHQUFGLElBQVMsS0FBSyxjQUFMLENBQW9CLFVBQXBCLENBQStCLEdBQS9CLENBQW1DLEVBQUUsVUFBRixDQUE1QyxDQUFwQixDQUREO0FBOURBLFNBZ0VLLEdBQUw7QUFDQyxZQUFPLENBQVAsQ0FERDtBQWhFQSxTQWtFSyxLQUFMO0FBQ0MsWUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVAsQ0FERDtBQWxFQTtBQXFFQyw0RkFBNkIsVUFBN0IsQ0FERDtBQXBFQSxJQUh1Qjs7OzsyQkE0RWYsR0FBRTtBQUNWLE9BQUcsS0FBRyxTQUFILElBQWdCLEVBQUUsR0FBRixJQUFPLFNBQVAsRUFBaUI7QUFDbkMsV0FBTyxDQUFDLENBQUQsQ0FENEI7SUFBcEMsTUFFSztBQUNKLFdBQU8sU0FBUyxFQUFFLEdBQUYsQ0FBaEIsQ0FESTtJQUZMOzs7OzRCQU9TLEdBQUU7QUFDWCxPQUFJLElBQUUsQ0FBRjtPQUFLLElBQUUsRUFBRixDQURFOztBQUdYLE9BQUcsQ0FBQyxFQUFFLGlCQUFGLElBQXVCLEVBQUUsV0FBRixFQUMxQixFQUFFLEdBQUYsR0FBTSxLQUFLLE1BQUwsQ0FBYSxFQUFFLFdBQUYsQ0FBbkIsQ0FERCxLQUVLLElBQUcsRUFBRSxNQUFGLEVBQ1AsRUFBRSxHQUFGLEdBQU0sS0FBSyxNQUFMLENBQWEsRUFBRSxNQUFGLENBQW5CLENBREk7O0FBR0wsT0FBRyxDQUFDLEVBQUUsZ0JBQUYsSUFBc0IsRUFBRSxVQUFGLEVBQ3pCLEVBQUUsTUFBRixHQUFTLEtBQUssTUFBTCxDQUFhLEVBQUUsVUFBRixDQUF0QixDQURELEtBRUssSUFBRyxFQUFFLEtBQUYsRUFDUCxFQUFFLE1BQUYsR0FBUyxLQUFLLE1BQUwsQ0FBYSxFQUFFLEtBQUYsQ0FBdEIsQ0FESTs7QUFHTCxPQUFHLENBQUMsRUFBRSxJQUFGLEVBQ0gsT0FBTyxDQUFQLENBREQ7O0FBR0EsV0FBTyxFQUFFLFFBQUY7QUFDUCxTQUFLLFNBQUwsQ0FEQTtBQUVBLFNBQUssT0FBTDtBQUNDLE9BQUUsVUFBRixHQUFhLEtBQUssTUFBTCxDQUFhLEVBQUUsSUFBRixDQUExQixDQUREO0FBRUMsV0FGRDtBQUZBLFNBS0ssTUFBTCxDQUxBO0FBTUE7QUFDQyxPQUFFLFVBQUYsR0FBYSxRQUFDLENBQVMsRUFBRSxJQUFGLENBQVQsR0FBaUIsR0FBakIsR0FBcUIsR0FBckIsR0FBMEIsR0FBM0IsQ0FEZDtBQU5BLElBaEJXO0FBeUJYLEtBQUUsUUFBRixHQUFXLEVBQUUsUUFBRixDQXpCQTtBQTBCWCxVQUFPLENBQVAsQ0ExQlc7Ozs7MkJBNkJILEdBQUU7QUFDVixPQUFJLFNBQU8sQ0FBUCxDQURNO0FBRVYsVUFBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUZVO0FBR1YsVUFBTyxLQUFQLEtBQWlCLE9BQU8sS0FBUCxHQUFhLEtBQUssT0FBTCxDQUFhLE9BQU8sS0FBUCxDQUExQixDQUFqQixDQUhVO0FBSVYsVUFBTyxNQUFQLENBSlU7Ozs7c0JBckpLO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7Ozs7T0FFVCIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQgT2ZmaWNlRG9jdW1lbnQgZnJvbSBcIi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRzdGF0aWMgT2ZmaWNlRG9jdW1lbnQ9T2ZmaWNlRG9jdW1lbnRcblxuXHRjcmVhdGVFbGVtZW50KG5vZGUpe1xuXHRcdGNvbnN0IHtzdHlsZXN9PXRoaXMub2ZmaWNlRG9jdW1lbnRcblx0XHRsZXQge25hbWUsIGF0dHJpYnV0ZXM6e2RpcmVjdFN0eWxlfSwgY2hpbGRyZW59PW5vZGVcblx0XHRsZXQgdGFnPW5hbWUuc3BsaXQoJzonKS5wb3AoKVxuXHRcdHN3aXRjaCh0YWcpe1xuXHRcdGNhc2UgXCJwXCI6XG5cdFx0XHRpZihkaXJlY3RTdHlsZSAmJiBkaXJlY3RTdHlsZVsnbnVtUHInXSlcblx0XHRcdFx0dGFnPVwibGlzdFwiXG5cdFx0YnJlYWtcblx0XHR9XG5cblx0XHRyZXR1cm4gdGhpcy5vbkNyZWF0ZUVsZW1lbnQobm9kZSwgdGFnKVxuXHR9XG5cblx0dG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRsZXQgcHI9c3VwZXIudG9Qcm9wZXJ0eShub2RlKVxuXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ3BQcic6XG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlcy5wYXJhZ3JhcGgoe3BQcjpwcn0sIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAncFByLnBTdHlsZScpXG5cdFx0YnJlYWtcblx0XHRjYXNlICdyUHInOlxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMuY2hhcmFjdGVyKHtyUHI6cHJ9LCB0aGlzLm9mZmljZURvY3VtZW50LnN0eWxlcywgJ3JQci5yU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAndGJsUHInOlxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUoe3RibFByOnByfSwgdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMsICd0YmxQci50YmxTdHlsZScpXG5cdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByXG5cdFx0fVxuXHR9XG5cblx0b25Ub1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdGNvbnN0IHskOnh9PW5vZGVcblx0XHRsZXQgdmFsdWVcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Ly9zZWN0aW9uLCBzZWN0UHJcblx0XHRjYXNlICdwZ1N6Jzpcblx0XHRcdHJldHVybiB7d2lkdGg6dGhpcy5keGEyUHgoeFsndyddKSwgaGVpZ2h0OnRoaXMuZHhhMlB4KHhbJ2gnXSl9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdwZ01hcic6XG5cdFx0XHR2YWx1ZT17fVxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT52YWx1ZVthLnNwbGl0KCc6JykucG9wKCldPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHZhbHVlXG5cdFx0YnJlYWtcblx0XHRjYXNlICdjb2xzJzpcblx0XHRcdHgubnVtICYmICh4Lm51bT1wYXJzZUludCh4Lm51bSkpO1xuXHRcdFx0eC5zcGFjZSAmJiAoeC5zcGFjZT10aGlzLmR4YTJQeCh4LnNwYWNlKSk7XG5cblx0XHRcdGlmKHguY29sKXtcblx0XHRcdFx0eC5kYXRhPXguY29sLm1hcChjb2w9Pih7XG5cdFx0XHRcdFx0d2lkdGg6dGhpcy5keGEyUHgoY29sLncpLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbC5zcGFjZSlcblx0XHRcdFx0fSkpXG5cdFx0XHRcdGRlbGV0ZSB4LmNvbFxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHhcblx0XHRicmVha1xuXHRcdC8vcGFyYWdyYXBoLCBwUHJcblx0XHRjYXNlICdqYyc6XG5cdFx0XHRyZXR1cm4geC52YWxcblx0XHRjYXNlICdpbmQnOlxuXHRcdFx0T2JqZWN0LmtleXMoeCkuZm9yRWFjaChhPT54W2FdPXRoaXMuZHhhMlB4KHhbYV0pKVxuXHRcdFx0cmV0dXJuIHhcblx0XHRjYXNlICdzcGFjaW5nJzpcblx0XHRcdHJldHVybiB0aGlzLnRvU3BhY2luZyh4KVxuXHRcdGNhc2UgJ3BCZHInOlxuXHRcdFx0dmFsdWU9e31cblx0XHRcdE9iamVjdC5rZXlzKHgpLmZpbHRlcihhPT5hIT0nJCcpLmZvckVhY2goYT0+dmFsdWVbYV09dGhpcy50b0JvcmRlcih4W2FdWzBdKSlcblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdC8vaW5saW5lLCByUHJcblx0XHRjYXNlICdyRm9udHMnOlxuXHRcdFx0bGV0IGFzY2lpPXhbJ2FzY2lpJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4Wydhc2NpaVRoZW1lJ10pXG5cdFx0XHRsZXQgYXNpYT14WydlYXN0QXNpYSddfHx0aGlzLm9mZmljZURvY3VtZW50LmZvbnRUaGVtZS5nZXQoeFsnZWFzdEFzaWFUaGVtZSddKVxuXG5cdFx0XHRpZihhc2NpaSB8fCBhc2lhKVxuXHRcdFx0XHRyZXR1cm4ge2FzY2lpLCBhc2lhfVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnbGFuZyc6XG5cdFx0Y2FzZSAndmVydEFsaWduJzpcblx0XHRcdHJldHVybiB4LnZhbFxuXHRcdGNhc2UgJ3N6Jzpcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHBhcnNlSW50KHhbJ3ZhbCddKS8yKVxuXHRcdGNhc2UgJ3cnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8xMDAuMFxuXHRcdGNhc2UgJ2tlcm4nOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgudmFsKS8yXG5cdFx0Y2FzZSAnc3BhY2luZyc6XG5cdFx0Y2FzZSAncG9zaXRpb24nOlxuXHRcdFx0cmV0dXJuIHRoaXMuZHhhMlB4KHgudmFsKVxuXHRcdGNhc2UgJ2knOlxuXHRcdGNhc2UgJ3ZhbmlzaCc6XG5cdFx0Y2FzZSAndSc6XG5cdFx0Y2FzZSAnc21hbGxDYXBzJzpcblx0XHRjYXNlICdiJzpcblx0XHRcdHJldHVybiB0aGlzLmFzVG9nZ2xlKHgpXG5cdFx0Y2FzZSAnaGlnaHRsaWdodCc6XG5cdFx0Y2FzZSAnY29sb3InOlxuXHRcdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LnZhbCB8fCB0aGlzLm9mZmljZURvY3VtZW50LnRoZW1lQ29sb3IuZ2V0KHgudGhlbWVDb2xvcikpXG5cdFx0Y2FzZSAndSc6XG5cdFx0XHRyZXR1cm4geFxuXHRcdGNhc2UgJ2JkeCc6XG5cdFx0XHRyZXR1cm4gdGhpcy50b0JvcmRlcih4KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gc3VwZXIub25Ub1Byb3BlcnR5KC4uLmFyZ3VtZW50cylcblx0XHR9XG5cdH1cblxuXHRhc1RvZ2dsZSh4KXtcblx0XHRpZih4PT11bmRlZmluZWQgfHwgeC52YWw9PXVuZGVmaW5lZCl7XG5cdFx0XHRyZXR1cm4gLTFcblx0XHR9ZWxzZXtcblx0XHRcdHJldHVybiBwYXJzZUludCh4LnZhbClcblx0XHR9XG5cdH1cblxuXHR0b1NwYWNpbmcoeCl7XG5cdFx0dmFyIHI9eCwgbz17fVxuXG5cdFx0aWYoIXIuYmVmb3JlQXV0b3NwYWNpbmcgJiYgci5iZWZvcmVMaW5lcylcblx0XHRcdG8udG9wPXRoaXMuZHhhMlB4KChyLmJlZm9yZUxpbmVzKSlcblx0XHRlbHNlIGlmKHIuYmVmb3JlKVxuXHRcdFx0by50b3A9dGhpcy5keGEyUHgoKHIuYmVmb3JlKSlcblxuXHRcdGlmKCFyLmFmdGVyQXV0b3NwYWNpbmcgJiYgci5hZnRlckxpbmVzKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXJMaW5lcykpXG5cdFx0ZWxzZSBpZihyLmFmdGVyKVxuXHRcdFx0by5ib3R0b209dGhpcy5keGEyUHgoKHIuYWZ0ZXIpKVxuXG5cdFx0aWYoIXIubGluZSlcblx0XHRcdHJldHVybiBvXG5cblx0XHRzd2l0Y2goeC5saW5lUnVsZSl7XG5cdFx0Y2FzZSAnYXRMZWFzdCc6XG5cdFx0Y2FzZSAnZXhhY3QnOlxuXHRcdFx0by5saW5lSGVpZ2h0PXRoaXMuZHhhMlB4KCh4LmxpbmUpKVxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdhdXRvJzpcblx0XHRkZWZhdWx0OlxuXHRcdFx0by5saW5lSGVpZ2h0PShwYXJzZUludChyLmxpbmUpKjEwMC8yNDApKyclJ1xuXHRcdH1cblx0XHRvLmxpbmVSdWxlPXgubGluZVJ1bGVcblx0XHRyZXR1cm4gb1xuXHR9XG5cblx0dG9Cb3JkZXIoeCl7XG5cdFx0dmFyIGJvcmRlcj14XG5cdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdHJldHVybiBib3JkZXJcblx0fVxufVxuIl19