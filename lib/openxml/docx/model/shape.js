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

var naming = null;
Shape.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren(t) {
			var children = ((t = this.wXml.$('>style>*')) && t.asArray() || []).concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
			var bodyPr = this.wXml.$1('bodyPr');
			if (bodyPr) {
				for (var i = 0, attrs = bodyPr.attributes, len = attrs.length; i < len; i++) {
					children.push(attrs[i]);
				}
			}
			return children;
		}
	}, {
		key: 'lnRef',
		value: function lnRef(x) {
			return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')), this.solidFill(x));
		}
	}, {
		key: 'fillRef',
		value: function fillRef(x) {
			return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')), this.solidFill(x));
		}
	}, {
		key: 'fontRef',
		value: function fontRef(x) {
			return { color: this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx')) };
		}
	}, {
		key: 'effectRef',
		value: function effectRef() {}
	}, {
		key: 'spAutoFit',
		value: function spAutoFit() {
			return true;
		}
	}, {
		key: 'lIns',
		value: function lIns(x) {
			if (x = parseInt(x.value)) return this.pt2Px(this.asPt(x, 'cm'));
			return this.EMPTY;
		}
	}, {
		key: 'tIns',
		value: function tIns(x) {
			return this.lIns(x);
		}
	}, {
		key: 'rIns',
		value: function rIns(x) {
			return this.lIns(x);
		}
	}, {
		key: 'bIns',
		value: function bIns(x) {
			return this.lIns(x);
		}
	}, {
		key: 'anchor',
		value: function anchor(x) {
			switch (x.value) {
				case 'b':
					return 'bottom';
				case 't':
					return 'top';
				default:
					return 'middle';
			}
		}
	}, {
		key: 'vert',
		value: function vert(x) {
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
	}], [{
		key: 'mixinSpProperties',
		value: function mixinSpProperties() {
			Object.assign(this.naming, {
				custGeom: 'path',
				prstGeom: 'path'
			});

			Object.assign(this.prototype, _drawing2.default.SpProperties);

			delete this.mixinSpProperties;
		}
	}, {
		key: 'naming',
		get: function get() {
			if (!naming) naming = Object.assign({}, _drawing2.default.Properties.naming, _drawing2.default.SpProperties.naming);
			return naming;
		}
	}]);

	return Properties;
}(_style2.default.Properties);

Shape.Properties.mixinSpProperties();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2hhcGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7bUNBQ0o7QUFDZixVQUFPLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEtBQUssSUFBTCxFQUFVLEtBQUssSUFBTCxFQUFVLElBQXBELENBQVAsQ0FEZTs7OztzQ0FHRztBQUNsQixVQUFPLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxhQUFaLENBQVAsQ0FEa0I7Ozs7c0JBSUY7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQVJHO0VBQWMsUUFBUSxVQUFSOztrQkFBZDs7O0FBV3JCLFNBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0IsR0FBbEIsRUFBdUIsQ0FBdkIsRUFBeUI7QUFDeEIsTUFBSSxJQUFJLENBQUosSUFBUyxDQUFiLEVBQWU7QUFDZCxrQkFBYyxJQUFFLEVBQUUsQ0FBRixDQUFGLENBQWQ7QUFDQSxRQUFLLFFBQUw7QUFDQyxRQUFHLEtBQUcsT0FBSCxFQUNGLEVBQUUsQ0FBRixJQUFLLEdBQUwsQ0FERDtBQUVBLFVBSEQ7QUFEQSxRQUtLLFFBQUw7QUFDQyxVQUFNLENBQU4sRUFBUyxHQUFULEVBREQ7QUFMQSxHQURjO0VBQWY7QUFVQSxRQUFPLENBQVAsQ0FYd0I7Q0FBekI7O0FBY0EsSUFBSSxTQUFPLElBQVA7QUFDSixNQUFNLFVBQU47V0FBdUI7Ozs7Ozs7Ozs7b0NBT0osR0FBRTtBQUNuQixPQUFJLFdBQVMsQ0FBQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLFVBQVosQ0FBRixDQUFELElBQStCLEVBQUUsT0FBRixFQUEvQixJQUE2QyxFQUE3QyxDQUFELENBQ1gsTUFEVyxDQUNKLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxvQkFBWixFQUFrQyxPQUFsQyxFQURJLENBQVQsQ0FEZTtBQUdu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bSAnLi9zdHlsZSdcbmltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hhcGUgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRnZXREaXJlY3RTdHlsZSgpe1xuXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMud1htbCx0aGlzLndEb2MsdGhpcylcblx0fVxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuJCgndHhieENvbnRlbnQnKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzaGFwZSd9XG59XG5cbmZ1bmN0aW9uIHBoQ2xyKG8sIGNsciwgYSl7XG5cdGZvcih2YXIgaSBpbiBvKXtcblx0XHRzd2l0Y2godHlwZW9mKGE9b1tpXSkpe1xuXHRcdGNhc2UgJ3N0cmluZyc6XG5cdFx0XHRpZihhPT0ncGhDbHInKVxuXHRcdFx0XHRvW2ldPWNsclxuXHRcdFx0YnJlYWtcblx0XHRjYXNlICdvYmplY3QnOlxuXHRcdFx0cGhDbHIoYSwgY2xyKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb1xufVxuXG52YXIgbmFtaW5nPW51bGxcblNoYXBlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7XG5cdFx0aWYoIW5hbWluZylcblx0XHRcdG5hbWluZz1PYmplY3QuYXNzaWduKHt9LERyYXdpbmcuUHJvcGVydGllcy5uYW1pbmcsRHJhd2luZy5TcFByb3BlcnRpZXMubmFtaW5nKVxuXHRcdHJldHVybiBuYW1pbmdcblx0fVxuXHRcblx0X2dldFZhbGlkQ2hpbGRyZW4odCl7XG5cdFx0dmFyIGNoaWxkcmVuPSgodD10aGlzLndYbWwuJCgnPnN0eWxlPionKSkgJiYgdC5hc0FycmF5KCkgfHxbXSlcblx0XHRcdC5jb25jYXQodGhpcy53WG1sLiQoJz5zcFByPiosID5ib2R5UHI+KicpLmFzQXJyYXkoKSk7XG5cdFx0dmFyIGJvZHlQcj10aGlzLndYbWwuJDEoJ2JvZHlQcicpXG5cdFx0aWYoYm9keVByKXtcblx0XHRcdGZvcih2YXIgaT0wLCBhdHRycz1ib2R5UHIuYXR0cmlidXRlcywgbGVuPWF0dHJzLmxlbmd0aDtpPGxlbjtpKyspXG5cdFx0XHRcdGNoaWxkcmVuLnB1c2goYXR0cnNbaV0pXG5cdFx0fVxuXHRcdHJldHVybiBjaGlsZHJlblxuXHR9XG5cdGxuUmVmKHgpe1xuXHRcdHJldHVybiBwaENscih0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5saW5lKHguYXR0cignaWR4JykpLHRoaXMuc29saWRGaWxsKHgpKVxuXHR9XG5cdGZpbGxSZWYoeCl7XG5cdFx0cmV0dXJuIHBoQ2xyKHRoaXMud0RvYy5nZXRGb3JtYXRUaGVtZSgpLmZpbGwoeC5hdHRyKCdpZHgnKSksdGhpcy5zb2xpZEZpbGwoeCkpXG5cdH1cblx0Zm9udFJlZih4KXtcblx0XHRyZXR1cm4ge2NvbG9yOnRoaXMuc29saWRGaWxsKHgpLCBmYW1pbHk6IHRoaXMud0RvYy5nZXRGb3JtYXRUaGVtZSgpLmZvbnQoeC5hdHRyKCdpZHgnKSl9XG5cdH1cblx0ZWZmZWN0UmVmKCl7XG5cblx0fVxuXHRzcEF1dG9GaXQoKXtcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cdGxJbnMoeCl7XG5cdFx0aWYoeD1wYXJzZUludCh4LnZhbHVlKSlcblx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LCdjbScpKVxuXHRcdHJldHVybiB0aGlzLkVNUFRZXG5cdH1cblx0dElucyh4KXtcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXG5cdH1cblx0cklucyh4KXtcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXG5cdH1cblx0Yklucyh4KXtcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXG5cdH1cblx0YW5jaG9yKHgpe1xuXHRcdHN3aXRjaCh4LnZhbHVlKXtcblx0XHRjYXNlICdiJzpcblx0XHRcdHJldHVybiAnYm90dG9tJ1xuXHRcdGNhc2UgJ3QnOlxuXHRcdFx0cmV0dXJuICd0b3AnXG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAnbWlkZGxlJ1xuXHRcdH1cblx0fVxuXHR2ZXJ0KHgpe1xuXHRcdHN3aXRjaCh4LnZhbHVlKXtcblx0XHRjYXNlICdob3J6Jzpcblx0XHRcdHJldHVybiB0aGlzLkVNUFRZXG5cdFx0Y2FzZSAnZWFWZXJ0Jzpcblx0XHRcdHJldHVybiA5MFxuXHRcdGNhc2UgJ3ZlcnQyNzAnOlxuXHRcdFx0cmV0dXJuIDI3MFxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRjb25zb2xlLndhcm4oJ25vdCBzdXBwb3J0Jylcblx0XHRcdHJldHVybiB0aGlzLkVNUFRZXG5cdFx0fVxuXHR9XG5cdFxuXHRzdGF0aWMgbWl4aW5TcFByb3BlcnRpZXMoKXtcblx0XHRPYmplY3QuYXNzaWduKHRoaXMubmFtaW5nLHtcblx0XHRcdGN1c3RHZW9tOidwYXRoJyxcblx0XHRcdHByc3RHZW9tOidwYXRoJ1xuXHRcdH0pXG5cdFx0XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLnByb3RvdHlwZSxEcmF3aW5nLlNwUHJvcGVydGllcylcblx0XHRcblx0XHRkZWxldGUgdGhpcy5taXhpblNwUHJvcGVydGllc1xuXHR9XG59XG5cblNoYXBlLlByb3BlcnRpZXMubWl4aW5TcFByb3BlcnRpZXMoKVxuXG5cblxuXG5cblx0XG4iXX0=