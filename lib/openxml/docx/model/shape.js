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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2hhcGUuanMiXSwibmFtZXMiOlsiU2hhcGUiLCJjb25zdHJ1Y3RvciIsIlByb3BlcnRpZXMiLCJ3WG1sIiwid0RvYyIsIiQiLCJyZXF1aXJlIiwicGhDbHIiLCJvIiwiY2xyIiwiYSIsImkiLCJuYW1pbmciLCJ0IiwiY2hpbGRyZW4iLCJhc0FycmF5IiwiY29uY2F0IiwiYm9keVByIiwiJDEiLCJhdHRycyIsImF0dHJpYnV0ZXMiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwieCIsImdldEZvcm1hdFRoZW1lIiwibGluZSIsImF0dHIiLCJzb2xpZEZpbGwiLCJmaWxsIiwiY29sb3IiLCJmYW1pbHkiLCJmb250IiwicGFyc2VJbnQiLCJ2YWx1ZSIsInB0MlB4IiwiYXNQdCIsIkVNUFRZIiwibElucyIsImNvbnNvbGUiLCJ3YXJuIiwiT2JqZWN0IiwiYXNzaWduIiwiY3VzdEdlb20iLCJwcnN0R2VvbSIsInByb3RvdHlwZSIsIlNwUHJvcGVydGllcyIsIm1peGluU3BQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7OzttQ0FDSjtBQUNmLFVBQU8sSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFnQyxLQUFLQyxJQUFyQyxFQUEwQyxLQUFLQyxJQUEvQyxFQUFvRCxJQUFwRCxDQUFQO0FBQ0E7OztzQ0FDa0I7QUFDbEIsVUFBTyxLQUFLRCxJQUFMLENBQVVFLENBQVYsQ0FBWSxhQUFaLENBQVA7QUFDQTs7O3NCQUVnQjtBQUFDLFVBQU8sT0FBUDtBQUFlOzs7O0VBUkNDLFFBQVEsVUFBUixDOztrQkFBZE4sSzs7O0FBV3JCLFNBQVNPLEtBQVQsQ0FBZUMsQ0FBZixFQUFrQkMsR0FBbEIsRUFBdUJDLENBQXZCLEVBQXlCO0FBQ3hCLE1BQUksSUFBSUMsQ0FBUixJQUFhSCxDQUFiLEVBQWU7QUFDZCxrQkFB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QUFMO0FBQ0MsWUFBTyxLQUFQO0FBQ0Q7QUFDQyxZQUFPLFFBQVA7QUFORDtBQVFBO0FBdkRGO0FBQUE7QUFBQSx1QkF3RE1WLENBeEROLEVBd0RRO0FBQ04sV0FBT0EsRUFBRVUsS0FBVDtBQUNBLFNBQUssTUFBTDtBQUNDLFlBQU8sS0FBS0csS0FBWjtBQUNELFNBQUssUUFBTDtBQUNDLFlBQU8sRUFBUDtBQUNELFNBQUssU0FBTDtBQUNDLFlBQU8sR0FBUDtBQUNEO0FBQ0NFLGFBQVFDLElBQVIsQ0FBYSxhQUFiO0FBQ0EsWUFBTyxLQUFLSCxLQUFaO0FBVEQ7QUFXQTtBQXBFRjtBQUFBO0FBQUEsc0NBc0UyQjtBQUN6QkksVUFBT0MsTUFBUCxDQUFjLEtBQUs5QixNQUFuQixFQUEwQjtBQUN6QitCLGNBQVMsTUFEZ0I7QUFFekJDLGNBQVM7QUFGZ0IsSUFBMUI7O0FBS0FILFVBQU9DLE1BQVAsQ0FBYyxLQUFLRyxTQUFuQixFQUE2QixrQkFBUUMsWUFBckM7O0FBRUEsVUFBTyxLQUFLQyxpQkFBWjtBQUNBO0FBL0VGO0FBQUE7QUFBQSxzQkFDb0I7QUFDbEIsT0FBRyxDQUFDbkMsTUFBSixFQUNDQSxTQUFPNkIsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUIsa0JBQVF4QyxVQUFSLENBQW1CVSxNQUFwQyxFQUEyQyxrQkFBUWtDLFlBQVIsQ0FBcUJsQyxNQUFoRSxDQUFQO0FBQ0QsVUFBT0EsTUFBUDtBQUNBO0FBTEY7O0FBQUE7QUFBQSxFQUEwQyxnQkFBTVYsVUFBaEQ7O0FBa0ZBRixNQUFNRSxVQUFOLENBQWlCNkMsaUJBQWpCIiwiZmlsZSI6InNoYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUnXG5pbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Z2V0RGlyZWN0U3R5bGUoKXtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLndYbWwsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLiQoJ3R4YnhDb250ZW50Jylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2hhcGUnfVxufVxuXG5mdW5jdGlvbiBwaENscihvLCBjbHIsIGEpe1xuXHRmb3IodmFyIGkgaW4gbyl7XG5cdFx0c3dpdGNoKHR5cGVvZihhPW9baV0pKXtcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0aWYoYT09J3BoQ2xyJylcblx0XHRcdFx0b1tpXT1jbHJcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHBoQ2xyKGEsIGNscilcblx0XHR9XG5cdH1cblx0cmV0dXJuIG9cbn1cblxudmFyIG5hbWluZz1udWxsXG5TaGFwZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IG5hbWluZygpe1xuXHRcdGlmKCFuYW1pbmcpXG5cdFx0XHRuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLERyYXdpbmcuU3BQcm9wZXJ0aWVzLm5hbWluZylcblx0XHRyZXR1cm4gbmFtaW5nXG5cdH1cblx0XG5cdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xuXHRcdHZhciBjaGlsZHJlbj0oKHQ9dGhpcy53WG1sLiQoJz5zdHlsZT4qJykpICYmIHQuYXNBcnJheSgpIHx8W10pXG5cdFx0XHQuY29uY2F0KHRoaXMud1htbC4kKCc+c3BQcj4qLCA+Ym9keVByPionKS5hc0FycmF5KCkpO1xuXHRcdHZhciBib2R5UHI9dGhpcy53WG1sLiQxKCdib2R5UHInKVxuXHRcdGlmKGJvZHlQcil7XG5cdFx0XHRmb3IodmFyIGk9MCwgYXR0cnM9Ym9keVByLmF0dHJpYnV0ZXMsIGxlbj1hdHRycy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGF0dHJzW2ldKVxuXHRcdH1cblx0XHRyZXR1cm4gY2hpbGRyZW5cblx0fVxuXHRsblJlZih4KXtcblx0XHRyZXR1cm4gcGhDbHIodGhpcy53RG9jLmdldEZvcm1hdFRoZW1lKCkubGluZSh4LmF0dHIoJ2lkeCcpKSx0aGlzLnNvbGlkRmlsbCh4KSlcblx0fVxuXHRmaWxsUmVmKHgpe1xuXHRcdHJldHVybiBwaENscih0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5maWxsKHguYXR0cignaWR4JykpLHRoaXMuc29saWRGaWxsKHgpKVxuXHR9XG5cdGZvbnRSZWYoeCl7XG5cdFx0cmV0dXJuIHtjb2xvcjp0aGlzLnNvbGlkRmlsbCh4KSwgZmFtaWx5OiB0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5mb250KHguYXR0cignaWR4JykpfVxuXHR9XG5cdGVmZmVjdFJlZigpe1xuXG5cdH1cblx0c3BBdXRvRml0KCl7XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHRsSW5zKHgpe1xuXHRcdGlmKHg9cGFyc2VJbnQoeC52YWx1ZSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSlcblx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHR9XG5cdHRJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdHJJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdGJJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdGFuY2hvcih4KXtcblx0XHRzd2l0Y2goeC52YWx1ZSl7XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gJ2JvdHRvbSdcblx0XHRjYXNlICd0Jzpcblx0XHRcdHJldHVybiAndG9wJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gJ21pZGRsZSdcblx0XHR9XG5cdH1cblx0dmVydCh4KXtcblx0XHRzd2l0Y2goeC52YWx1ZSl7XG5cdFx0Y2FzZSAnaG9yeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdGNhc2UgJ2VhVmVydCc6XG5cdFx0XHRyZXR1cm4gOTBcblx0XHRjYXNlICd2ZXJ0MjcwJzpcblx0XHRcdHJldHVybiAyNzBcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdH1cblx0fVxuXHRcblx0c3RhdGljIG1peGluU3BQcm9wZXJ0aWVzKCl7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm5hbWluZyx7XG5cdFx0XHRjdXN0R2VvbToncGF0aCcsXG5cdFx0XHRwcnN0R2VvbToncGF0aCdcblx0XHR9KVxuXHRcdFxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5wcm90b3R5cGUsRHJhd2luZy5TcFByb3BlcnRpZXMpXG5cdFx0XG5cdFx0ZGVsZXRlIHRoaXMubWl4aW5TcFByb3BlcnRpZXNcblx0fVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzLm1peGluU3BQcm9wZXJ0aWVzKClcblxuXG5cblxuXG5cdFxuIl19