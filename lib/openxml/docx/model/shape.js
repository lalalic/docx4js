'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

		return _possibleConstructorReturn(this, (Shape.__proto__ || Object.getPrototypeOf(Shape)).apply(this, arguments));
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

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2hhcGUuanMiXSwibmFtZXMiOlsiU2hhcGUiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJ3WG1sIiwid0RvYyIsIiQiLCJyZXF1aXJlIiwicGhDbHIiLCJvIiwiY2xyIiwiYSIsImkiLCJuYW1pbmciLCJ0IiwiY2hpbGRyZW4iLCJhc0FycmF5IiwiY29uY2F0IiwiYm9keVByIiwiJDEiLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwieCIsImdldEZvcm1hdFRoZW1lIiwibGluZSIsImF0dHIiLCJzb2xpZEZpbGwiLCJmaWxsIiwiY29sb3IiLCJmYW1pbHkiLCJmb250IiwicGFyc2VJbnQiLCJ2YWx1ZSIsInB0MlB4IiwiYXNQdCIsIkVNUFRZIiwibElucyIsImNvbnNvbGUiLCJ3YXJuIiwiT2JqZWN0IiwiYXNzaWduIiwiY3VzdEdlb20iLCJwcnN0R2VvbSIsInByb3RvdHlwZSIsIlNwUHJvcGVydGllcyIsIm1peGluU3BQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7OzttQ0FDSjtBQUNmLFVBQU8sSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQyxLQUFLQyxJQUFyQyxFQUEwQyxLQUFLQyxJQUEvQyxFQUFvRCxJQUFwRCxDQUFQO0FBQ0E7OztzQ0FDa0I7QUFDbEIsVUFBTyxLQUFLRCxJQUFMLENBQVVFLENBQVYsQ0FBWSxhQUFaLENBQVA7QUFDQTs7O3NCQUVnQjtBQUFDLFVBQU8sT0FBUDtBQUFlOzs7O0VBUkNDLFFBQVEsVUFBUixDOztrQkFBZE4sSzs7O0FBV3JCLFNBQVNPLEtBQVQsQ0FBZUMsQ0FBZixFQUFrQkMsR0FBbEIsRUFBdUJDLENBQXZCLEVBQXlCO0FBQ3hCLE1BQUksSUFBSUMsQ0FBUixJQUFhSCxDQUFiLEVBQWU7QUFDZCxrQkFB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QUFMO0FBQ0MsWUFBTyxLQUFQO0FBQ0Q7QUFDQyxZQUFPLFFBQVA7QUFORDtBQVFBO0FBdkRGO0FBQUE7QUFBQSx1QkF3RE1WLENBeEROLEVBd0RRO0FBQ04sV0FBT0EsRUFBRVUsS0FBVDtBQUNBLFNBQUssTUFBTDtBQUNDLFlBQU8sS0FBS0csS0FBWjtBQUNELFNBQUssUUFBTDtBQUNDLFlBQU8sRUFBUDtBQUNELFNBQUssU0FBTDtBQUNDLFlBQU8sR0FBUDtBQUNEO0FBQ0NFLGFBQVFDLElBQVIsQ0FBYSxhQUFiO0FBQ0EsWUFBTyxLQUFLSCxLQUFaO0FBVEQ7QUFXQTtBQXBFRjtBQUFBO0FBQUEsc0NBc0UyQjtBQUN6QkksVUFBT0MsTUFBUCxDQUFjLEtBQUs5QixNQUFuQixFQUEwQjtBQUN6QitCLGNBQVMsTUFEZ0I7QUFFekJDLGNBQVM7QUFGZ0IsSUFBMUI7O0FBS0FILFVBQU9DLE1BQVAsQ0FBYyxLQUFLRyxTQUFuQixFQUE2QixrQkFBUUMsWUFBckM7O0FBRUEsVUFBTyxLQUFLQyxpQkFBWjtBQUNBO0FBL0VGO0FBQUE7QUFBQSxzQkFDb0I7QUFDbEIsT0FBRyxDQUFDbkMsTUFBSixFQUNDQSxTQUFPNkIsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsa0JBQVF4QyxVQUFSLENBQW1CVSxNQUFwQyxFQUEyQyxrQkFBUWtDLFlBQVIsQ0FBcUJsQyxNQUFoRSxDQUFQO0FBQ0QsVUFBT0EsTUFBUDtBQUNBO0FBTEY7O0FBQUE7QUFBQSxFQUEwQyxnQkFBTVYsVUFBaEQ7O0FBa0ZBRixNQUFNRSxVQUFOLENBQWlCNkMsaUJBQWpCIiwiZmlsZSI6InNoYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUnXHJcbmltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcclxuXHRnZXREaXJlY3RTdHlsZSgpe1xyXG5cdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy53WG1sLHRoaXMud0RvYyx0aGlzKVxyXG5cdH1cclxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMud1htbC4kKCd0eGJ4Q29udGVudCcpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3NoYXBlJ31cclxufVxyXG5cclxuZnVuY3Rpb24gcGhDbHIobywgY2xyLCBhKXtcclxuXHRmb3IodmFyIGkgaW4gbyl7XHJcblx0XHRzd2l0Y2godHlwZW9mKGE9b1tpXSkpe1xyXG5cdFx0Y2FzZSAnc3RyaW5nJzpcclxuXHRcdFx0aWYoYT09J3BoQ2xyJylcclxuXHRcdFx0XHRvW2ldPWNsclxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0cGhDbHIoYSwgY2xyKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gb1xyXG59XHJcblxyXG52YXIgbmFtaW5nPW51bGxcclxuU2hhcGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclxuXHRzdGF0aWMgZ2V0IG5hbWluZygpe1xyXG5cdFx0aWYoIW5hbWluZylcclxuXHRcdFx0bmFtaW5nPU9iamVjdC5hc3NpZ24oe30sRHJhd2luZy5Qcm9wZXJ0aWVzLm5hbWluZyxEcmF3aW5nLlNwUHJvcGVydGllcy5uYW1pbmcpXHJcblx0XHRyZXR1cm4gbmFtaW5nXHJcblx0fVxyXG5cdFxyXG5cdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xyXG5cdFx0dmFyIGNoaWxkcmVuPSgodD10aGlzLndYbWwuJCgnPnN0eWxlPionKSkgJiYgdC5hc0FycmF5KCkgfHxbXSlcclxuXHRcdFx0LmNvbmNhdCh0aGlzLndYbWwuJCgnPnNwUHI+KiwgPmJvZHlQcj4qJykuYXNBcnJheSgpKTtcclxuXHRcdHZhciBib2R5UHI9dGhpcy53WG1sLiQxKCdib2R5UHInKVxyXG5cdFx0aWYoYm9keVByKXtcclxuXHRcdFx0Zm9yKHZhciBpPTAsIGF0dHJzPWJvZHlQci5hdHRyaWJ1dGVzLCBsZW49YXR0cnMubGVuZ3RoO2k8bGVuO2krKylcclxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGF0dHJzW2ldKVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGNoaWxkcmVuXHJcblx0fVxyXG5cdGxuUmVmKHgpe1xyXG5cdFx0cmV0dXJuIHBoQ2xyKHRoaXMud0RvYy5nZXRGb3JtYXRUaGVtZSgpLmxpbmUoeC5hdHRyKCdpZHgnKSksdGhpcy5zb2xpZEZpbGwoeCkpXHJcblx0fVxyXG5cdGZpbGxSZWYoeCl7XHJcblx0XHRyZXR1cm4gcGhDbHIodGhpcy53RG9jLmdldEZvcm1hdFRoZW1lKCkuZmlsbCh4LmF0dHIoJ2lkeCcpKSx0aGlzLnNvbGlkRmlsbCh4KSlcclxuXHR9XHJcblx0Zm9udFJlZih4KXtcclxuXHRcdHJldHVybiB7Y29sb3I6dGhpcy5zb2xpZEZpbGwoeCksIGZhbWlseTogdGhpcy53RG9jLmdldEZvcm1hdFRoZW1lKCkuZm9udCh4LmF0dHIoJ2lkeCcpKX1cclxuXHR9XHJcblx0ZWZmZWN0UmVmKCl7XHJcblxyXG5cdH1cclxuXHRzcEF1dG9GaXQoKXtcclxuXHRcdHJldHVybiB0cnVlXHJcblx0fVxyXG5cdGxJbnMoeCl7XHJcblx0XHRpZih4PXBhcnNlSW50KHgudmFsdWUpKVxyXG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSlcclxuXHRcdHJldHVybiB0aGlzLkVNUFRZXHJcblx0fVxyXG5cdHRJbnMoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXHJcblx0fVxyXG5cdHJJbnMoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXHJcblx0fVxyXG5cdGJJbnMoeCl7XHJcblx0XHRyZXR1cm4gdGhpcy5sSW5zKHgpXHJcblx0fVxyXG5cdGFuY2hvcih4KXtcclxuXHRcdHN3aXRjaCh4LnZhbHVlKXtcclxuXHRcdGNhc2UgJ2InOlxyXG5cdFx0XHRyZXR1cm4gJ2JvdHRvbSdcclxuXHRcdGNhc2UgJ3QnOlxyXG5cdFx0XHRyZXR1cm4gJ3RvcCdcclxuXHRcdGRlZmF1bHQ6XHJcblx0XHRcdHJldHVybiAnbWlkZGxlJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHR2ZXJ0KHgpe1xyXG5cdFx0c3dpdGNoKHgudmFsdWUpe1xyXG5cdFx0Y2FzZSAnaG9yeic6XHJcblx0XHRcdHJldHVybiB0aGlzLkVNUFRZXHJcblx0XHRjYXNlICdlYVZlcnQnOlxyXG5cdFx0XHRyZXR1cm4gOTBcclxuXHRcdGNhc2UgJ3ZlcnQyNzAnOlxyXG5cdFx0XHRyZXR1cm4gMjcwXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHRjb25zb2xlLndhcm4oJ25vdCBzdXBwb3J0JylcclxuXHRcdFx0cmV0dXJuIHRoaXMuRU1QVFlcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0c3RhdGljIG1peGluU3BQcm9wZXJ0aWVzKCl7XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMubmFtaW5nLHtcclxuXHRcdFx0Y3VzdEdlb206J3BhdGgnLFxyXG5cdFx0XHRwcnN0R2VvbToncGF0aCdcclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5wcm90b3R5cGUsRHJhd2luZy5TcFByb3BlcnRpZXMpXHJcblx0XHRcclxuXHRcdGRlbGV0ZSB0aGlzLm1peGluU3BQcm9wZXJ0aWVzXHJcblx0fVxyXG59XHJcblxyXG5TaGFwZS5Qcm9wZXJ0aWVzLm1peGluU3BQcm9wZXJ0aWVzKClcclxuXHJcblxyXG5cclxuXHJcblxyXG5cdFxyXG4iXX0=