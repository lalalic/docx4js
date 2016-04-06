'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shape = function (_require) {
	_inherits(Shape, _require);

	function Shape() {
		_classCallCheck(this, Shape);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Shape).apply(this, arguments));
	}

	_createClass(Shape, [{
		key: 'getDirectStyle',
		value: function getDirectStyle() {
			return new this.constructor.Properties(this.wXml, this.wDoc, this);
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('txbxContent');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'shape';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return Shape;
}(require('../model'));

exports.default = Shape;


function phClr(o, clr, a) {
	for (var i in o) {
		switch (_typeof(a = o[i])) {
			case 'string':
				if (a == 'phClr') o[i] = clr;
				break;
			case 'object':
				phClr(a, clr);
		}
	}
	return o;
}

var naming = Object.assign({}, _style2.default.Properties.naming, _drawing2.default.SpProperties.naming);

var Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, null, [{
		key: 'naming',
		get: function get() {
			return naming;
		}
	}]);

	return Properties;
}(_style2.default.Properties);

Object.assign(Properties.prototype, _drawing2.default.SpProperties.prototype, {
	_getValidChildren: function _getValidChildren(t) {
		var children = ((t = this.wXml.$('>style>*')) && t.asArray() || []).concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
		var bodyPr = this.wXml.$1('bodyPr');
		if (bodyPr) {
			for (var i = 0, attrs = bodyPr.attributes, len = attrs.length; i < len; i++) {
				children.push(attrs[i]);
			}
		}
		return children;
	},
	lnRef: function lnRef(x) {
		return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')), this.solidFill(x));
	},
	fillRef: function fillRef(x) {
		return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')), this.solidFill(x));
	},
	fontRef: function fontRef(x) {
		return { color: this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx')) };
	},
	effectRef: function effectRef() {},
	spAutoFit: function spAutoFit() {
		return true;
	},
	lIns: function lIns(x) {
		if (x = parseInt(x.value)) return this.asPt(x, 'cm');
		return this.EMPTY;
	},
	tIns: function tIns(x) {
		return this.lIns(x);
	},
	rIns: function rIns(x) {
		return this.lIns(x);
	},
	bIns: function bIns(x) {
		return this.lIns(x);
	},
	anchor: function anchor(x) {
		switch (x.value) {
			case 'b':
				return 'bottom';
			case 't':
				return 'top';
			default:
				return 'middle';
		}
	},
	vert: function vert(x) {
		switch (x.value) {
			case 'horz':
				return this.EMPTY;
			case 'eaVert':
				return 90;
			case 'vert270':
				return 270;
			default:
				console.warn('not support');
				return this.EMPTY;
		}
	}
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvc2hhcGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7bUNBQ0o7QUFDZixVQUFPLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEtBQUssSUFBTCxFQUFVLEtBQUssSUFBTCxFQUFVLElBQXBELENBQVAsQ0FEZTs7OztzQ0FHRztBQUNsQixVQUFPLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxhQUFaLENBQVAsQ0FEa0I7Ozs7c0JBSUY7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztzQkFFTTtBQUFDLFVBQU8sVUFBUCxDQUFEOzs7O1FBVkg7RUFBYyxRQUFRLFVBQVI7O2tCQUFkOzs7QUFhckIsU0FBUyxLQUFULENBQWUsQ0FBZixFQUFrQixHQUFsQixFQUF1QixDQUF2QixFQUF5QjtBQUN4QixNQUFJLElBQUksQ0FBSixJQUFTLENBQWIsRUFBZTtBQUNkLGtCQUFjLElBQUUsRUFBRSxDQUFGLENBQUYsQ0FBZDtBQUNBLFFBQUssUUFBTDtBQUNDLFFBQUcsS0FBRyxPQUFILEVBQ0YsRUFBRSxDQUFGLElBQUssR0FBTCxDQUREO0FBRUEsVUFIRDtBQURBLFFBS0ssUUFBTDtBQUNDLFVBQU0sQ0FBTixFQUFTLEdBQVQsRUFERDtBQUxBLEdBRGM7RUFBZjtBQVVBLFFBQU8sQ0FBUCxDQVh3QjtDQUF6Qjs7QUFjQSxJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixnQkFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXlCLGtCQUFRLFlBQVIsQ0FBcUIsTUFBckIsQ0FBakQ7O0lBQ0U7Ozs7Ozs7Ozs7O3NCQUNjO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFEZDtFQUFtQixnQkFBTSxVQUFOOztBQUt6QixPQUFPLE1BQVAsQ0FBYyxXQUFXLFNBQVgsRUFBcUIsa0JBQVEsWUFBUixDQUFxQixTQUFyQixFQUErQjtBQUNqRSwrQ0FBa0IsR0FBRTtBQUNuQixNQUFJLFdBQVMsQ0FBQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLFVBQVosQ0FBRixDQUFELElBQStCLEVBQUUsT0FBRixFQUEvQixJQUE2QyxFQUE3QyxDQUFELENBQ1gsTUFEVyxDQUNKLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxvQkFBWixFQUFrQyxPQUFsQyxFQURJLENBQVQsQ0FEZTtBQUduQixNQUFJLFNBQU8sS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLFFBQWIsQ0FBUCxDQUhlO0FBSW5CLE1BQUcsTUFBSCxFQUFVO0FBQ1QsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFLLFFBQU0sT0FBTyxVQUFQLEVBQW1CLE1BQUksTUFBTSxNQUFOLEVBQWEsSUFBRSxHQUFGLEVBQU0sR0FBN0Q7QUFDQyxhQUFTLElBQVQsQ0FBYyxNQUFNLENBQU4sQ0FBZDtJQUREO0dBREQ7QUFJQSxTQUFPLFFBQVAsQ0FSbUI7RUFENkM7QUFXakUsdUJBQU0sR0FBRTtBQUNQLFNBQU8sTUFBTSxLQUFLLElBQUwsQ0FBVSxjQUFWLEdBQTJCLElBQTNCLENBQWdDLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBaEMsQ0FBTixFQUFxRCxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQXJELENBQVAsQ0FETztFQVh5RDtBQWNqRSwyQkFBUSxHQUFFO0FBQ1QsU0FBTyxNQUFNLEtBQUssSUFBTCxDQUFVLGNBQVYsR0FBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFoQyxDQUFOLEVBQXFELEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBckQsQ0FBUCxDQURTO0VBZHVEO0FBaUJqRSwyQkFBUSxHQUFFO0FBQ1QsU0FBTyxFQUFDLE9BQU0sS0FBSyxTQUFMLENBQWUsQ0FBZixDQUFOLEVBQXlCLFFBQVEsS0FBSyxJQUFMLENBQVUsY0FBVixHQUEyQixJQUEzQixDQUFnQyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQWhDLENBQVIsRUFBakMsQ0FEUztFQWpCdUQ7QUFvQmpFLGlDQUFXLEVBcEJzRDtBQXVCakUsaUNBQVc7QUFDVixTQUFPLElBQVAsQ0FEVTtFQXZCc0Q7QUEwQmpFLHFCQUFLLEdBQUU7QUFDTixNQUFHLElBQUUsU0FBUyxFQUFFLEtBQUYsQ0FBWCxFQUNGLE9BQU8sS0FBSyxJQUFMLENBQVUsQ0FBVixFQUFZLElBQVosQ0FBUCxDQUREO0FBRUEsU0FBTyxLQUFLLEtBQUwsQ0FIRDtFQTFCMEQ7QUErQmpFLHFCQUFLLEdBQUU7QUFDTixTQUFPLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBUCxDQURNO0VBL0IwRDtBQWtDakUscUJBQUssR0FBRTtBQUNOLFNBQU8sS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFQLENBRE07RUFsQzBEO0FBcUNqRSxxQkFBSyxHQUFFO0FBQ04sU0FBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVAsQ0FETTtFQXJDMEQ7QUF3Q2pFLHlCQUFPLEdBQUU7QUFDUixVQUFPLEVBQUUsS0FBRjtBQUNQLFFBQUssR0FBTDtBQUNDLFdBQU8sUUFBUCxDQUREO0FBREEsUUFHSyxHQUFMO0FBQ0MsV0FBTyxLQUFQLENBREQ7QUFIQTtBQU1DLFdBQU8sUUFBUCxDQUREO0FBTEEsR0FEUTtFQXhDd0Q7QUFrRGpFLHFCQUFLLEdBQUU7QUFDTixVQUFPLEVBQUUsS0FBRjtBQUNQLFFBQUssTUFBTDtBQUNDLFdBQU8sS0FBSyxLQUFMLENBRFI7QUFEQSxRQUdLLFFBQUw7QUFDQyxXQUFPLEVBQVAsQ0FERDtBQUhBLFFBS0ssU0FBTDtBQUNDLFdBQU8sR0FBUCxDQUREO0FBTEE7QUFRQyxZQUFRLElBQVIsQ0FBYSxhQUFiLEVBREQ7QUFFQyxXQUFPLEtBQUssS0FBTCxDQUZSO0FBUEEsR0FETTtFQWxEMEQ7Q0FBbEUiLCJmaWxlIjoic2hhcGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZSdcbmltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRnZXREaXJlY3RTdHlsZSgpe1xuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMud1htbCx0aGlzLndEb2MsdGhpcylcblx0fVxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJCgndHhieENvbnRlbnQnKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzaGFwZSd9XG5cblx0c3RhdGljIGdldCBQcm9wZXJ0aWVzKCl7cmV0dXJuIFByb3BlcnRpZXN9XG59XG5cbmZ1bmN0aW9uIHBoQ2xyKG8sIGNsciwgYSl7XG5cdGZvcih2YXIgaSBpbiBvKXtcblx0XHRzd2l0Y2godHlwZW9mKGE9b1tpXSkpe1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRpZihhPT0ncGhDbHInKVxuXHRcdFx0XHRvW2ldPWNsclxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cGhDbHIoYSwgY2xyKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb1xufVxuXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sU3R5bGUuUHJvcGVydGllcy5uYW1pbmcsIERyYXdpbmcuU3BQcm9wZXJ0aWVzLm5hbWluZylcbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IG5hbWluZygpe3JldHVybiBuYW1pbmd9XG59XG5cblxuT2JqZWN0LmFzc2lnbihQcm9wZXJ0aWVzLnByb3RvdHlwZSxEcmF3aW5nLlNwUHJvcGVydGllcy5wcm90b3R5cGUse1xuXHRfZ2V0VmFsaWRDaGlsZHJlbih0KXtcblx0XHR2YXIgY2hpbGRyZW49KCh0PXRoaXMud1htbC4kKCc+c3R5bGU+KicpKSAmJiB0LmFzQXJyYXkoKSB8fFtdKVxuXHRcdFx0LmNvbmNhdCh0aGlzLndYbWwuJCgnPnNwUHI+KiwgPmJvZHlQcj4qJykuYXNBcnJheSgpKTtcblx0XHR2YXIgYm9keVByPXRoaXMud1htbC4kMSgnYm9keVByJylcblx0XHRpZihib2R5UHIpe1xuXHRcdFx0Zm9yKHZhciBpPTAsIGF0dHJzPWJvZHlQci5hdHRyaWJ1dGVzLCBsZW49YXR0cnMubGVuZ3RoO2k8bGVuO2krKylcblx0XHRcdFx0Y2hpbGRyZW4ucHVzaChhdHRyc1tpXSlcblx0XHR9XG5cdFx0cmV0dXJuIGNoaWxkcmVuXG5cdH0sXG5cdGxuUmVmKHgpe1xuXHRcdHJldHVybiBwaENscih0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5saW5lKHguYXR0cignaWR4JykpLHRoaXMuc29saWRGaWxsKHgpKVxuXHR9LFxuXHRmaWxsUmVmKHgpe1xuXHRcdHJldHVybiBwaENscih0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5maWxsKHguYXR0cignaWR4JykpLHRoaXMuc29saWRGaWxsKHgpKVxuXHR9LFxuXHRmb250UmVmKHgpe1xuXHRcdHJldHVybiB7Y29sb3I6dGhpcy5zb2xpZEZpbGwoeCksIGZhbWlseTogdGhpcy53RG9jLmdldEZvcm1hdFRoZW1lKCkuZm9udCh4LmF0dHIoJ2lkeCcpKX1cblx0fSxcblx0ZWZmZWN0UmVmKCl7XG5cblx0fSxcblx0c3BBdXRvRml0KCl7XG5cdFx0cmV0dXJuIHRydWVcblx0fSxcblx0bElucyh4KXtcblx0XHRpZih4PXBhcnNlSW50KHgudmFsdWUpKVxuXHRcdFx0cmV0dXJuIHRoaXMuYXNQdCh4LCdjbScpXG5cdFx0cmV0dXJuIHRoaXMuRU1QVFlcblx0fSxcblx0dElucyh4KXtcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXG5cdH0sXG5cdHJJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9LFxuXHRiSW5zKHgpe1xuXHRcdHJldHVybiB0aGlzLmxJbnMoeClcblx0fSxcblx0YW5jaG9yKHgpe1xuXHRcdHN3aXRjaCh4LnZhbHVlKXtcblx0XHRjYXNlICdiJzpcblx0XHRcdHJldHVybiAnYm90dG9tJ1xuXHRcdGNhc2UgJ3QnOlxuXHRcdFx0cmV0dXJuICd0b3AnXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAnbWlkZGxlJ1xuXHRcdH1cblx0fSxcblx0dmVydCh4KXtcblx0XHRzd2l0Y2goeC52YWx1ZSl7XG5cdFx0Y2FzZSAnaG9yeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdGNhc2UgJ2VhVmVydCc6XG5cdFx0XHRyZXR1cm4gOTBcblx0XHRjYXNlICd2ZXJ0MjcwJzpcblx0XHRcdHJldHVybiAyNzBcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdH1cblx0fVxufSlcbiJdfQ==