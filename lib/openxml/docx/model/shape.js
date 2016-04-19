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
			if (x = parseInt(x.value)) return this.asPt(x, 'cm');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2hhcGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7bUNBQ0o7QUFDZixVQUFPLElBQUksS0FBSyxXQUFMLENBQWlCLFVBQWpCLENBQTRCLEtBQUssSUFBTCxFQUFVLEtBQUssSUFBTCxFQUFVLElBQXBELENBQVAsQ0FEZTs7OztzQ0FHRztBQUNsQixVQUFPLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxhQUFaLENBQVAsQ0FEa0I7Ozs7c0JBSUY7QUFBQyxVQUFPLE9BQVAsQ0FBRDs7OztRQVJHO0VBQWMsUUFBUSxVQUFSOztrQkFBZDs7O0FBV3JCLFNBQVMsS0FBVCxDQUFlLENBQWYsRUFBa0IsR0FBbEIsRUFBdUIsQ0FBdkIsRUFBeUI7QUFDeEIsTUFBSSxJQUFJLENBQUosSUFBUyxDQUFiLEVBQWU7QUFDZCxrQkFBYyxJQUFFLEVBQUUsQ0FBRixDQUFGLENBQWQ7QUFDQSxRQUFLLFFBQUw7QUFDQyxRQUFHLEtBQUcsT0FBSCxFQUNGLEVBQUUsQ0FBRixJQUFLLEdBQUwsQ0FERDtBQUVBLFVBSEQ7QUFEQSxRQUtLLFFBQUw7QUFDQyxVQUFNLENBQU4sRUFBUyxHQUFULEVBREQ7QUFMQSxHQURjO0VBQWY7QUFVQSxRQUFPLENBQVAsQ0FYd0I7Q0FBekI7O0FBY0EsSUFBSSxTQUFPLElBQVA7QUFDSixNQUFNLFVBQU47V0FBdUI7Ozs7Ozs7Ozs7b0NBT0osR0FBRTtBQUNuQixPQUFJLFdBQVMsQ0FBQyxDQUFDLElBQUUsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLFVBQVosQ0FBRixDQUFELElBQStCLEVBQUUsT0FBRixFQUEvQixJQUE2QyxFQUE3QyxDQUFELENBQ1gsTUFEVyxDQUNKLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxvQkFBWixFQUFrQyxPQUFsQyxFQURJLENBQVQsQ0FEZTtBQUduQixPQUFJLFNBQU8sS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLFFBQWIsQ0FBUCxDQUhlO0FBSW5CLE9BQUcsTUFBSCxFQUFVO0FBQ1QsU0FBSSxJQUFJLElBQUUsQ0FBRixFQUFLLFFBQU0sT0FBTyxVQUFQLEVBQW1CLE1BQUksTUFBTSxNQUFOLEVBQWEsSUFBRSxHQUFGLEVBQU0sR0FBN0Q7QUFDQyxjQUFTLElBQVQsQ0FBYyxNQUFNLENBQU4sQ0FBZDtLQUREO0lBREQ7QUFJQSxVQUFPLFFBQVAsQ0FSbUI7Ozs7d0JBVWQsR0FBRTtBQUNQLFVBQU8sTUFBTSxLQUFLLElBQUwsQ0FBVSxjQUFWLEdBQTJCLElBQTNCLENBQWdDLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBaEMsQ0FBTixFQUFxRCxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQXJELENBQVAsQ0FETzs7OzswQkFHQSxHQUFFO0FBQ1QsVUFBTyxNQUFNLEtBQUssSUFBTCxDQUFVLGNBQVYsR0FBMkIsSUFBM0IsQ0FBZ0MsRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFoQyxDQUFOLEVBQXFELEtBQUssU0FBTCxDQUFlLENBQWYsQ0FBckQsQ0FBUCxDQURTOzs7OzBCQUdGLEdBQUU7QUFDVCxVQUFPLEVBQUMsT0FBTSxLQUFLLFNBQUwsQ0FBZSxDQUFmLENBQU4sRUFBeUIsUUFBUSxLQUFLLElBQUwsQ0FBVSxjQUFWLEdBQTJCLElBQTNCLENBQWdDLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBaEMsQ0FBUixFQUFqQyxDQURTOzs7OzhCQUdDOzs7OEJBR0E7QUFDVixVQUFPLElBQVAsQ0FEVTs7Ozt1QkFHTixHQUFFO0FBQ04sT0FBRyxJQUFFLFNBQVMsRUFBRSxLQUFGLENBQVgsRUFDRixPQUFPLEtBQUssSUFBTCxDQUFVLENBQVYsRUFBWSxJQUFaLENBQVAsQ0FERDtBQUVBLFVBQU8sS0FBSyxLQUFMLENBSEQ7Ozs7dUJBS0YsR0FBRTtBQUNOLFVBQU8sS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFQLENBRE07Ozs7dUJBR0YsR0FBRTtBQUNOLFVBQU8sS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFQLENBRE07Ozs7dUJBR0YsR0FBRTtBQUNOLFVBQU8sS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFQLENBRE07Ozs7eUJBR0EsR0FBRTtBQUNSLFdBQU8sRUFBRSxLQUFGO0FBQ1AsU0FBSyxHQUFMO0FBQ0MsWUFBTyxRQUFQLENBREQ7QUFEQSxTQUdLLEdBQUw7QUFDQyxZQUFPLEtBQVAsQ0FERDtBQUhBO0FBTUMsWUFBTyxRQUFQLENBREQ7QUFMQSxJQURROzs7O3VCQVVKLEdBQUU7QUFDTixXQUFPLEVBQUUsS0FBRjtBQUNQLFNBQUssTUFBTDtBQUNDLFlBQU8sS0FBSyxLQUFMLENBRFI7QUFEQSxTQUdLLFFBQUw7QUFDQyxZQUFPLEVBQVAsQ0FERDtBQUhBLFNBS0ssU0FBTDtBQUNDLFlBQU8sR0FBUCxDQUREO0FBTEE7QUFRQyxhQUFRLElBQVIsQ0FBYSxhQUFiLEVBREQ7QUFFQyxZQUFPLEtBQUssS0FBTCxDQUZSO0FBUEEsSUFETTs7OztzQ0FjbUI7QUFDekIsVUFBTyxNQUFQLENBQWMsS0FBSyxNQUFMLEVBQVk7QUFDekIsY0FBUyxNQUFUO0FBQ0EsY0FBUyxNQUFUO0lBRkQsRUFEeUI7O0FBTXpCLFVBQU8sTUFBUCxDQUFjLEtBQUssU0FBTCxFQUFlLGtCQUFRLFlBQVIsQ0FBN0IsQ0FOeUI7O0FBUXpCLFVBQU8sS0FBSyxpQkFBTCxDQVJrQjs7OztzQkFyRVA7QUFDbEIsT0FBRyxDQUFDLE1BQUQsRUFDRixTQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBaUIsa0JBQVEsVUFBUixDQUFtQixNQUFuQixFQUEwQixrQkFBUSxZQUFSLENBQXFCLE1BQXJCLENBQWxELENBREQ7QUFFQSxVQUFPLE1BQVAsQ0FIa0I7Ozs7UUFERztFQUFtQixnQkFBTSxVQUFOLENBQTFDOztBQWtGQSxNQUFNLFVBQU4sQ0FBaUIsaUJBQWpCIiwiZmlsZSI6InNoYXBlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUnXG5pbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNoYXBlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Z2V0RGlyZWN0U3R5bGUoKXtcblx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLndYbWwsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLiQoJ3R4YnhDb250ZW50Jylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2hhcGUnfVxufVxuXG5mdW5jdGlvbiBwaENscihvLCBjbHIsIGEpe1xuXHRmb3IodmFyIGkgaW4gbyl7XG5cdFx0c3dpdGNoKHR5cGVvZihhPW9baV0pKXtcblx0XHRjYXNlICdzdHJpbmcnOlxuXHRcdFx0aWYoYT09J3BoQ2xyJylcblx0XHRcdFx0b1tpXT1jbHJcblx0XHRcdGJyZWFrXG5cdFx0Y2FzZSAnb2JqZWN0Jzpcblx0XHRcdHBoQ2xyKGEsIGNscilcblx0XHR9XG5cdH1cblx0cmV0dXJuIG9cbn1cblxudmFyIG5hbWluZz1udWxsXG5TaGFwZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IG5hbWluZygpe1xuXHRcdGlmKCFuYW1pbmcpXG5cdFx0XHRuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLERyYXdpbmcuU3BQcm9wZXJ0aWVzLm5hbWluZylcblx0XHRyZXR1cm4gbmFtaW5nXG5cdH1cblx0XG5cdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xuXHRcdHZhciBjaGlsZHJlbj0oKHQ9dGhpcy53WG1sLiQoJz5zdHlsZT4qJykpICYmIHQuYXNBcnJheSgpIHx8W10pXG5cdFx0XHQuY29uY2F0KHRoaXMud1htbC4kKCc+c3BQcj4qLCA+Ym9keVByPionKS5hc0FycmF5KCkpO1xuXHRcdHZhciBib2R5UHI9dGhpcy53WG1sLiQxKCdib2R5UHInKVxuXHRcdGlmKGJvZHlQcil7XG5cdFx0XHRmb3IodmFyIGk9MCwgYXR0cnM9Ym9keVByLmF0dHJpYnV0ZXMsIGxlbj1hdHRycy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0XHRjaGlsZHJlbi5wdXNoKGF0dHJzW2ldKVxuXHRcdH1cblx0XHRyZXR1cm4gY2hpbGRyZW5cblx0fVxuXHRsblJlZih4KXtcblx0XHRyZXR1cm4gcGhDbHIodGhpcy53RG9jLmdldEZvcm1hdFRoZW1lKCkubGluZSh4LmF0dHIoJ2lkeCcpKSx0aGlzLnNvbGlkRmlsbCh4KSlcblx0fVxuXHRmaWxsUmVmKHgpe1xuXHRcdHJldHVybiBwaENscih0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5maWxsKHguYXR0cignaWR4JykpLHRoaXMuc29saWRGaWxsKHgpKVxuXHR9XG5cdGZvbnRSZWYoeCl7XG5cdFx0cmV0dXJuIHtjb2xvcjp0aGlzLnNvbGlkRmlsbCh4KSwgZmFtaWx5OiB0aGlzLndEb2MuZ2V0Rm9ybWF0VGhlbWUoKS5mb250KHguYXR0cignaWR4JykpfVxuXHR9XG5cdGVmZmVjdFJlZigpe1xuXG5cdH1cblx0c3BBdXRvRml0KCl7XG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHRsSW5zKHgpe1xuXHRcdGlmKHg9cGFyc2VJbnQoeC52YWx1ZSkpXG5cdFx0XHRyZXR1cm4gdGhpcy5hc1B0KHgsJ2NtJylcblx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHR9XG5cdHRJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdHJJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdGJJbnMoeCl7XG5cdFx0cmV0dXJuIHRoaXMubElucyh4KVxuXHR9XG5cdGFuY2hvcih4KXtcblx0XHRzd2l0Y2goeC52YWx1ZSl7XG5cdFx0Y2FzZSAnYic6XG5cdFx0XHRyZXR1cm4gJ2JvdHRvbSdcblx0XHRjYXNlICd0Jzpcblx0XHRcdHJldHVybiAndG9wJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gJ21pZGRsZSdcblx0XHR9XG5cdH1cblx0dmVydCh4KXtcblx0XHRzd2l0Y2goeC52YWx1ZSl7XG5cdFx0Y2FzZSAnaG9yeic6XG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdGNhc2UgJ2VhVmVydCc6XG5cdFx0XHRyZXR1cm4gOTBcblx0XHRjYXNlICd2ZXJ0MjcwJzpcblx0XHRcdHJldHVybiAyNzBcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y29uc29sZS53YXJuKCdub3Qgc3VwcG9ydCcpXG5cdFx0XHRyZXR1cm4gdGhpcy5FTVBUWVxuXHRcdH1cblx0fVxuXHRcblx0c3RhdGljIG1peGluU3BQcm9wZXJ0aWVzKCl7XG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm5hbWluZyx7XG5cdFx0XHRjdXN0R2VvbToncGF0aCcsXG5cdFx0XHRwcnN0R2VvbToncGF0aCdcblx0XHR9KVxuXHRcdFxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5wcm90b3R5cGUsRHJhd2luZy5TcFByb3BlcnRpZXMpXG5cdFx0XG5cdFx0ZGVsZXRlIHRoaXMubWl4aW5TcFByb3BlcnRpZXNcblx0fVxufVxuXG5TaGFwZS5Qcm9wZXJ0aWVzLm1peGluU3BQcm9wZXJ0aWVzKClcblxuXG5cblxuXG5cdFxuIl19