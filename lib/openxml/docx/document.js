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
					return new _styles2.default.paragraph(pr, this.officeDocument.styles, 'pStyle');
					break;
				case 'rPr':
					return new _styles2.default.character(pr, this.officeDocument.styles, 'rStyle');
					break;
				case 'tblPr':
					return new _styles2.default.table(pr, this.officeDocument.styles, 'tblStyle');
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
				case 'rFonts':
					var ascii = x['ascii'] || this.officeDocument.fontTheme.get(x['asciiTheme']);
					var asia = x['eastAsia'] || this.officeDocument.fontTheme.get(x['eastAsiaTheme']);

					if (ascii || asia) return { ascii: ascii, asia: asia };
					break;
				case 'sz':
					return this.pt2Px(parseInt(x['val']) / 2);
					break;
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
					value = { space: this.dxa2Px(x['space']) };
					if (x.col) {
						value.data = x.col.map(function (col) {
							return {
								width: _this2.dxa2Px(col['w']),
								space: _this2.dxa2Px(col['space'])
							};
						});
					}

					return value;
					break;

				default:
					return _get(Object.getPrototypeOf(_class.prototype), "onToProperty", this).apply(this, arguments);
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NBT2UsTUFBSztPQUNYLFNBQVEsS0FBSyxjQUFMLENBQVIsT0FEVztPQUViLE9BQTBDLEtBQTFDLEtBRmE7T0FFSyxjQUF3QixLQUFwQyxXQUFZLFlBRkw7T0FFbUIsV0FBVSxLQUFWLFNBRm5COztBQUdsQixPQUFJLE1BQUksS0FBSyxLQUFMLENBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFKLENBSGM7QUFJbEIsV0FBTyxHQUFQO0FBQ0EsU0FBSyxHQUFMO0FBQ0MsU0FBRyxlQUFlLFlBQVksT0FBWixDQUFmLEVBQ0YsTUFBSSxNQUFKLENBREQ7QUFFRCxXQUhBO0FBREEsSUFKa0I7O0FBV2xCLFVBQU8sS0FBSyxlQUFMLENBQXFCLElBQXJCLEVBQTJCLEdBQTNCLENBQVAsQ0FYa0I7Ozs7NkJBY1IsTUFBTSxNQUFLO0FBQ3JCLE9BQUksa0ZBQW9CLEtBQXBCLENBRGlCOztBQUdyQixXQUFPLElBQVA7QUFDQSxTQUFLLEtBQUw7QUFDQyxZQUFPLElBQUksaUJBQU8sU0FBUCxDQUFpQixFQUFyQixFQUF5QixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsUUFBckQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQURBLFNBSUssS0FBTDtBQUNDLFlBQU8sSUFBSSxpQkFBTyxTQUFQLENBQWlCLEVBQXJCLEVBQXlCLEtBQUssY0FBTCxDQUFvQixNQUFwQixFQUE0QixRQUFyRCxDQUFQLENBREQ7QUFFQSxXQUZBO0FBSkEsU0FPSyxPQUFMO0FBQ0MsWUFBTyxJQUFJLGlCQUFPLEtBQVAsQ0FBYSxFQUFqQixFQUFxQixLQUFLLGNBQUwsQ0FBb0IsTUFBcEIsRUFBNEIsVUFBakQsQ0FBUCxDQUREO0FBRUEsV0FGQTtBQVBBO0FBV0MsWUFBTyxFQUFQLENBREQ7QUFWQSxJQUhxQjs7OzsrQkFrQlQsTUFBTSxNQUFLOzs7T0FDZCxJQUFHLEtBQUwsRUFEZ0I7O0FBRXZCLE9BQUksY0FBSixDQUZ1QjtBQUd2QixXQUFPLElBQVA7QUFDQSxTQUFLLFFBQUw7QUFDQyxTQUFJLFFBQU0sRUFBRSxPQUFGLEtBQVksS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsWUFBRixDQUFsQyxDQUFaLENBRFg7QUFFQyxTQUFJLE9BQUssRUFBRSxVQUFGLEtBQWUsS0FBSyxjQUFMLENBQW9CLFNBQXBCLENBQThCLEdBQTlCLENBQWtDLEVBQUUsZUFBRixDQUFsQyxDQUFmLENBRlY7O0FBSUMsU0FBRyxTQUFTLElBQVQsRUFDRixPQUFPLEVBQUMsWUFBRCxFQUFRLFVBQVIsRUFBUCxDQUREO0FBRUQsV0FOQTtBQURBLFNBUUssSUFBTDtBQUNDLFlBQU8sS0FBSyxLQUFMLENBQVcsU0FBUyxFQUFFLEtBQUYsQ0FBVCxJQUFtQixDQUFuQixDQUFsQixDQUREO0FBRUEsV0FGQTtBQVJBLFNBV0ssTUFBTDtBQUNDLFlBQU8sRUFBQyxPQUFNLEtBQUssTUFBTCxDQUFZLEVBQUUsR0FBRixDQUFaLENBQU4sRUFBMkIsUUFBTyxLQUFLLE1BQUwsQ0FBWSxFQUFFLEdBQUYsQ0FBWixDQUFQLEVBQW5DLENBREQ7QUFFQSxXQUZBO0FBWEEsU0FjSyxPQUFMO0FBQ0MsYUFBTSxFQUFOLENBREQ7QUFFQyxZQUFPLElBQVAsQ0FBWSxDQUFaLEVBQWUsT0FBZixDQUF1QjthQUFHLE1BQU0sRUFBRSxLQUFGLENBQVEsR0FBUixFQUFhLEdBQWIsRUFBTixJQUEwQixPQUFLLE1BQUwsQ0FBWSxFQUFFLENBQUYsQ0FBWixDQUExQjtNQUFILENBQXZCLENBRkQ7QUFHQyxZQUFPLEtBQVAsQ0FIRDtBQUlBLFdBSkE7QUFkQSxTQW1CSyxNQUFMO0FBQ0MsYUFBTSxFQUFDLE9BQU0sS0FBSyxNQUFMLENBQVksRUFBRSxPQUFGLENBQVosQ0FBTixFQUFQLENBREQ7QUFFQyxTQUFHLEVBQUUsR0FBRixFQUFNO0FBQ1IsWUFBTSxJQUFOLEdBQVcsRUFBRSxHQUFGLENBQU0sR0FBTixDQUFVO2NBQU07QUFDMUIsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLEdBQUosQ0FBWixDQUFOO0FBQ0EsZUFBTSxPQUFLLE1BQUwsQ0FBWSxJQUFJLE9BQUosQ0FBWixDQUFOOztPQUZvQixDQUFyQixDQURRO01BQVQ7O0FBT0EsWUFBTyxLQUFQLENBVEQ7QUFVQSxXQVZBOztBQW5CQTtBQWdDQyw0RkFBNkIsVUFBN0IsQ0FERDtBQS9CQSxJQUh1Qjs7OztzQkFwQ1I7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7Ozs7OztPQUVUIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL2RvY3VtZW50XCJcbmltcG9ydCBPZmZpY2VEb2N1bWVudCBmcm9tIFwiLi9vZmZpY2VEb2N1bWVudFwiXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZXtcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdHN0YXRpYyBPZmZpY2VEb2N1bWVudD1PZmZpY2VEb2N1bWVudFxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0Y29uc3Qge3N0eWxlc309dGhpcy5vZmZpY2VEb2N1bWVudFxuXHRcdGxldCB7bmFtZSwgYXR0cmlidXRlczp7ZGlyZWN0U3R5bGV9LCBjaGlsZHJlbn09bm9kZVxuXHRcdGxldCB0YWc9bmFtZS5zcGxpdCgnOicpLnBvcCgpXG5cdFx0c3dpdGNoKHRhZyl7XG5cdFx0Y2FzZSBcInBcIjpcblx0XHRcdGlmKGRpcmVjdFN0eWxlICYmIGRpcmVjdFN0eWxlWydudW1QciddKVxuXHRcdFx0XHR0YWc9XCJsaXN0XCJcblx0XHRicmVha1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzLm9uQ3JlYXRlRWxlbWVudChub2RlLCB0YWcpXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUsIHR5cGUpe1xuXHRcdGxldCBwcj1zdXBlci50b1Byb3BlcnR5KG5vZGUpXG5cblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAncFByJzpcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLnBhcmFncmFwaChwciwgdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMsICdwU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAnclByJzpcblx0XHRcdHJldHVybiBuZXcgU3R5bGVzLmNoYXJhY3RlcihwciwgdGhpcy5vZmZpY2VEb2N1bWVudC5zdHlsZXMsICdyU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0Y2FzZSAndGJsUHInOlxuXHRcdFx0cmV0dXJuIG5ldyBTdHlsZXMudGFibGUocHIsIHRoaXMub2ZmaWNlRG9jdW1lbnQuc3R5bGVzLCAndGJsU3R5bGUnKVxuXHRcdGJyZWFrXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwclxuXHRcdH1cblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlLCB0eXBlKXtcblx0XHRjb25zdCB7JDp4fT1ub2RlXG5cdFx0bGV0IHZhbHVlXG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ3JGb250cyc6XG5cdFx0XHRsZXQgYXNjaWk9eFsnYXNjaWknXXx8dGhpcy5vZmZpY2VEb2N1bWVudC5mb250VGhlbWUuZ2V0KHhbJ2FzY2lpVGhlbWUnXSlcblx0XHRcdGxldCBhc2lhPXhbJ2Vhc3RBc2lhJ118fHRoaXMub2ZmaWNlRG9jdW1lbnQuZm9udFRoZW1lLmdldCh4WydlYXN0QXNpYVRoZW1lJ10pXG5cblx0XHRcdGlmKGFzY2lpIHx8IGFzaWEpXG5cdFx0XHRcdHJldHVybiB7YXNjaWksIGFzaWF9XG5cdFx0YnJlYWtcblx0XHRjYXNlICdzeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeChwYXJzZUludCh4Wyd2YWwnXSkvMilcblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnU3onOlxuXHRcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmR4YTJQeCh4Wyd3J10pLCBoZWlnaHQ6dGhpcy5keGEyUHgoeFsnaCddKX1cblx0XHRicmVha1xuXHRcdGNhc2UgJ3BnTWFyJzpcblx0XHRcdHZhbHVlPXt9XG5cdFx0XHRPYmplY3Qua2V5cyh4KS5mb3JFYWNoKGE9PnZhbHVlW2Euc3BsaXQoJzonKS5wb3AoKV09dGhpcy5keGEyUHgoeFthXSkpXG5cdFx0XHRyZXR1cm4gdmFsdWVcblx0XHRicmVha1xuXHRcdGNhc2UgJ2NvbHMnOlxuXHRcdFx0dmFsdWU9e3NwYWNlOnRoaXMuZHhhMlB4KHhbJ3NwYWNlJ10pfVxuXHRcdFx0aWYoeC5jb2wpe1xuXHRcdFx0XHR2YWx1ZS5kYXRhPXguY29sLm1hcChjb2w9Pih7XG5cdFx0XHRcdFx0d2lkdGg6dGhpcy5keGEyUHgoY29sWyd3J10pLFxuXHRcdFx0XHRcdHNwYWNlOnRoaXMuZHhhMlB4KGNvbFsnc3BhY2UnXSlcblx0XHRcdFx0fSkpXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiB2YWx1ZVxuXHRcdGJyZWFrXG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHN1cGVyLm9uVG9Qcm9wZXJ0eSguLi5hcmd1bWVudHMpXG5cdFx0fVxuXHR9XG59XG4iXX0=