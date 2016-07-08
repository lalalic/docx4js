'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawing = function (_require) {
	_inherits(Drawing, _require);

	function Drawing(wXml) {
		_classCallCheck(this, Drawing);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Drawing).apply(this, arguments));

		_this.wDrawing = null;
		return _this;
	}

	_createClass(Drawing, [{
		key: 'getDirectStyle',
		value: function getDirectStyle() {
			return new this.constructor.Properties(this.wDrawing, this.wDoc, this);
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return [];
		}
	}]);

	return Drawing;
}(require('../model'));

exports.default = Drawing;


Drawing.Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren(t) {
			return [this.wXml.$1('extent'), this.wXml.$1('effectExtent')];
		}
	}, {
		key: 'extent',
		value: function extent(x) {
			//inline and anchor
			return { width: this.pt2Px(this.asPt(x.attr('cx'), 'cm')), height: this.pt2Px(this.asPt(x.attr('cy'), 'cm')) };
		}
	}, {
		key: 'effectExtent',
		value: function effectExtent(x) {
			var _this3 = this;

			return this.asObject(x, function (x) {
				return _this3.pt2Px(_this3.asPt(x, 'cm'));
			});
		}
	}, {
		key: 'distT',
		value: function distT(x) {
			if (x = parseInt(x.value)) return this.pt2Px(this.asPt(x, 'cm'));
			return this.EMPTY;
		}
	}, {
		key: 'distB',
		value: function distB(x) {
			return this.distT(x);
		}
	}, {
		key: 'distR',
		value: function distR(x) {
			return this.distT(x);
		}
	}, {
		key: 'distL',
		value: function distL(x) {
			return this.distT(x);
		}
	}], [{
		key: 'mixinSpProperties',
		value: function mixinSpProperties() {
			Object.assign(this.naming, {
				custGeom: 'path',
				prstGeom: 'path'
			});

			Object.assign(this.prototype, Drawing.SpProperties);
		}
	}]);

	return Properties;
}(_style2.default.Properties);

Drawing.SpProperties = {
	xfrm: function xfrm(x) {
		var ext = x.$1('ext'),
		    offset = x.$1('off');
		return this.world = {
			width: this.pt2Px(this.asPt(ext.attr('cx'), 'cm')),
			height: this.pt2Px(this.asPt(ext.attr('cy'), 'cm')),
			x: this.pt2Px(this.asPt(offset.attr('x'), 'cm')),
			y: this.pt2Px(this.asPt(offset.attr('y'), 'cm')),
			rotation: parseInt(x.attr('rot') || 0) / 60000
		};
	},
	solidFill: function solidFill(x) {
		var elColor = x.firstChild,
		    color = this.asColor(elColor.attr('val')),
		    t;

		if (color == 'phClr') return 'phClr';

		switch (elColor.localName) {
			case 'schemeClr':
				color = this.wDoc.getColorTheme().get(color);
				break;
		}

		if (t = elColor.$1('shade')) color = this.shadeColor(color, -1 * parseInt(t.attr('val')) / 1000);

		if (t = elColor.$1('lumOff')) color = this.shadeColor(color, -1 * parseInt(t.attr('val')) / 1000);

		return color;
	},
	noFill: function noFill(x) {
		return 1;
	},
	gradFill: function gradFill(x) {
		var type = x.$1('lin,path'),
		    o = this.asObject(type),
		    stops = [];
		for (var gs = x.$('gs'), a, i = 0, len = gs.length; i < len; i++) {
			stops.push({ position: parseInt(gs[i].attr('pos')) / 1000, color: this.solidFill(gs[i]) });
		}o.ang && (o.angel = parseInt(o.ang) / 60000, delete o.ang);
		o.path && (o.rect = this.asObject(type.firstChild, function (x) {
			return parseInt(x) / 1000;
		}));
		o.path = type.localName == 'lin' ? 'linear' : o.path;
		o.stops = stops;
		return o;
	},
	ln: function ln(x) {
		if (x.$1('noFill')) return { width: 0 };

		var o = this.asObject(x),
		    t;

		(t = x.$1('solidFill')) && (o.color = this.solidFill(t));

		(t = o.w) && (o.width = this.asPt(t, 'cm')) && delete o.w;
		(t = x.$1('prstDash')) && (o.dash = t.attr('val'));
		return o;
	},
	effectLst: function effectLst(x) {},
	blipFill: function blipFill(x) {
		return this.wDoc.getRel(x.$1('blip').attr('r:embed'));
	},
	prstGeom: function prstGeom(x) {
		var px = this.pt2Px,
		    w = px(this.world.width),
		    h = px(this.world.height);
		switch (x.attr('prst')) {
			case 'leftBrace':
				return { shape: 'path', path: 'M ' + w + ' 0 L 0 ' + h / 2 + ' L ' + w + ' ' + h + ' Z' };
			default:
				return { shape: x.attr('prst') };
		}
	},
	custGeom: function custGeom(x) {
		var path = [],
		    px = function (x) {
			return this.pt2Px(this.asPt(x, 'cm'));
		}.bind(this);
		for (var a, children = x.$1('path').childNodes, len = children.length, i = 0; i < len; i++) {
			a = children[i];
			switch (a.localName) {
				case 'moveTo':
					path.push('M ' + px(a.firstChild.attr('x')) + ' ' + px(a.firstChild.attr('y')));
					break;
				case 'lnTo':
					path.push('L ' + px(a.firstChild.attr('x')) + ' ' + px(a.firstChild.attr('y')));
					break;
					break;
				case 'cubicBezTo':
					path.push('L ' + px(a.childNodes[0].attr('x')) + ' ' + px(a.childNodes[0].attr('y')));
					path.push('Q ' + px(a.childNodes[1].attr('x')) + ' ' + px(a.childNodes[1].attr('y')) + ' ' + px(a.childNodes[2].attr('x')) + ' ' + px(a.childNodes[2].attr('y')));
					break;
			}
		}
		return { shape: 'path', path: path.join(' ') };
	}
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixDQUFZLElBQVosRUFBaUI7d0JBREcsU0FDSDs7cUVBREcscUJBRVYsWUFETzs7QUFFaEIsUUFBSyxRQUFMLEdBQWMsSUFBZCxDQUZnQjs7RUFBakI7O2NBRG9COzttQ0FLSjtBQUNmLFVBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsS0FBSyxRQUFMLEVBQWMsS0FBSyxJQUFMLEVBQVcsSUFBekQsQ0FBUCxDQURlOzs7O3NDQUdHO0FBQ2xCLFVBQU8sRUFBUCxDQURrQjs7OztRQVJDO0VBQWdCLFFBQVEsVUFBUjs7a0JBQWhCOzs7QUFhckIsUUFBUSxVQUFSO1dBQXlCOzs7Ozs7Ozs7O29DQUNOLEdBQUU7QUFDbkIsVUFBTyxDQUFDLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxRQUFiLENBQUQsRUFBeUIsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGNBQWIsQ0FBekIsQ0FBUCxDQURtQjs7Ozt5QkFHYixHQUFFOztBQUNSLFVBQU8sRUFBQyxPQUFNLEtBQUssS0FBTCxDQUFXLEtBQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FBVixFQUF1QixJQUF2QixDQUFYLENBQU4sRUFBK0MsUUFBTyxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQUwsQ0FBVSxFQUFFLElBQUYsQ0FBTyxJQUFQLENBQVYsRUFBdUIsSUFBdkIsQ0FBWCxDQUFQLEVBQXZELENBRFE7Ozs7K0JBR0ksR0FBRTs7O0FBQ2QsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCO1dBQUcsT0FBSyxLQUFMLENBQVcsT0FBSyxJQUFMLENBQVUsQ0FBVixFQUFZLElBQVosQ0FBWDtJQUFILENBQXZCLENBRGM7Ozs7d0JBR1QsR0FBRTtBQUNQLE9B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QUF2QyxHQUNSLEdBRFEsR0FDSixHQUFHLEVBQUUsVUFBRixDQUFhLENBQWIsRUFBZ0IsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBSCxDQURJLEdBQzBCLEdBRDFCLEdBQzhCLEdBQUcsRUFBRSxVQUFGLENBQWEsQ0FBYixFQUFnQixJQUFoQixDQUFxQixHQUFyQixDQUFILENBRDlCLENBQVYsQ0FGRDtBQUlBLFdBSkE7QUFSQSxJQUY4RTtHQUEvRTtBQWlCQSxTQUFPLEVBQUMsT0FBTSxNQUFOLEVBQWMsTUFBSyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQUwsRUFBdEIsQ0FuQlU7RUF4RVM7Q0FBckIiLCJmaWxlIjoiZHJhd2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlJ1xyXHJleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3aW5nIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcclx0Y29uc3RydWN0b3Iod1htbCl7XHJcdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXHRcdHRoaXMud0RyYXdpbmc9bnVsbFxyXHR9XHJcdGdldERpcmVjdFN0eWxlKCl7XHJcdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy53RHJhd2luZyx0aGlzLndEb2MsIHRoaXMpXHJcdH1cclx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclx0XHRyZXR1cm4gW11cclx0fVxyfVxyXHJEcmF3aW5nLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xyXHRcdHJldHVybiBbdGhpcy53WG1sLiQxKCdleHRlbnQnKSwgdGhpcy53WG1sLiQxKCdlZmZlY3RFeHRlbnQnKV1cclx0fVxyXHRleHRlbnQoeCl7Ly9pbmxpbmUgYW5kIGFuY2hvclxyXHRcdHJldHVybiB7d2lkdGg6dGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCdjeCcpLCdjbScpKSxoZWlnaHQ6dGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCdjeScpLCdjbScpKX1cclx0fVxyXHRlZmZlY3RFeHRlbnQoeCl7XHJcdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeCx4PT50aGlzLnB0MlB4KHRoaXMuYXNQdCh4LCdjbScpKSlcclx0fVxyXHRkaXN0VCh4KXtcclx0XHRpZih4PXBhcnNlSW50KHgudmFsdWUpKVxyXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHgsJ2NtJykpXHJcdFx0cmV0dXJuIHRoaXMuRU1QVFlcclx0fVxyXHRkaXN0Qih4KXtcclx0XHRyZXR1cm4gdGhpcy5kaXN0VCh4KVxyXHR9XHJcdGRpc3RSKHgpe1xyXHRcdHJldHVybiB0aGlzLmRpc3RUKHgpXHJcdH1cclx0ZGlzdEwoeCl7XHJcdFx0cmV0dXJuIHRoaXMuZGlzdFQoeClcclx0fVxyXG5cdFxyXG5cdHN0YXRpYyBtaXhpblNwUHJvcGVydGllcygpe1xyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm5hbWluZyx7XHJcblx0XHRcdGN1c3RHZW9tOidwYXRoJyxcclxuXHRcdFx0cHJzdEdlb206J3BhdGgnXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMucHJvdG90eXBlLERyYXdpbmcuU3BQcm9wZXJ0aWVzKVxyXG5cdH1ccn1cclxyRHJhd2luZy5TcFByb3BlcnRpZXM9e1xyXHR4ZnJtKHgpe1xyXHRcdHZhciBleHQ9eC4kMSgnZXh0JyksIG9mZnNldD14LiQxKCdvZmYnKVxyXHRcdHJldHVybiB0aGlzLndvcmxkPXtcclx0XHRcdHdpZHRoOnRoaXMucHQyUHgodGhpcy5hc1B0KGV4dC5hdHRyKCdjeCcpLCdjbScpKSxcclx0XHRcdGhlaWdodDp0aGlzLnB0MlB4KHRoaXMuYXNQdChleHQuYXR0cignY3knKSwnY20nKSksXHJcdFx0XHR4OnRoaXMucHQyUHgodGhpcy5hc1B0KG9mZnNldC5hdHRyKCd4JyksJ2NtJykpLFxyXHRcdFx0eTp0aGlzLnB0MlB4KHRoaXMuYXNQdChvZmZzZXQuYXR0cigneScpLCdjbScpKSxcclx0XHRcdHJvdGF0aW9uOiBwYXJzZUludCh4LmF0dHIoJ3JvdCcpfHwwKS82MDAwMFxyXHRcdH1cclx0fSxcclx0c29saWRGaWxsKHgpe1xyXHRcdHZhciBlbENvbG9yPXguZmlyc3RDaGlsZCxcclx0XHRcdGNvbG9yPXRoaXMuYXNDb2xvcihlbENvbG9yLmF0dHIoJ3ZhbCcpKSwgdDtcclxyXHRcdGlmKGNvbG9yPT0ncGhDbHInKVxyXHRcdFx0cmV0dXJuICdwaENscidcclxyXHRcdHN3aXRjaChlbENvbG9yLmxvY2FsTmFtZSl7XHJcdFx0Y2FzZSAnc2NoZW1lQ2xyJzpcclx0XHRcdGNvbG9yPXRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KGNvbG9yKVxyXHRcdFx0YnJlYWtcclx0XHR9XHJcclx0XHRpZih0PWVsQ29sb3IuJDEoJ3NoYWRlJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdGlmKHQ9ZWxDb2xvci4kMSgnbHVtT2ZmJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdHJldHVybiBjb2xvclxyXHR9LFxyXHRub0ZpbGwoeCl7XHJcdFx0cmV0dXJuIDFcclx0fSxcclx0Z3JhZEZpbGwoeCl7XHJcdFx0dmFyIHR5cGU9eC4kMSgnbGluLHBhdGgnKSwgbz10aGlzLmFzT2JqZWN0KHR5cGUpLCBzdG9wcz1bXVxyXHRcdGZvcih2YXIgZ3M9eC4kKCdncycpLGEsaT0wLGxlbj1ncy5sZW5ndGg7aTxsZW47aSsrKVxyXHRcdFx0c3RvcHMucHVzaCh7cG9zaXRpb246cGFyc2VJbnQoZ3NbaV0uYXR0cigncG9zJykpLzEwMDAsIGNvbG9yOnRoaXMuc29saWRGaWxsKGdzW2ldKX0pXHJcdFx0by5hbmcgJiYgKG8uYW5nZWw9cGFyc2VJbnQoby5hbmcpLzYwMDAwLCBkZWxldGUgby5hbmcpO1xyXHRcdG8ucGF0aCAmJiAoby5yZWN0PXRoaXMuYXNPYmplY3QodHlwZS5maXJzdENoaWxkLCAoeCk9PnBhcnNlSW50KHgpLzEwMDApKTtcclx0XHRvLnBhdGg9dHlwZS5sb2NhbE5hbWU9PSdsaW4nID8gJ2xpbmVhcicgOiBvLnBhdGg7XHJcdFx0by5zdG9wcz1zdG9wc1xyXHRcdHJldHVybiBvXHJcdH0sXHJcdGxuKHgpe1xyXHRcdGlmKHguJDEoJ25vRmlsbCcpKVxyXHRcdFx0cmV0dXJuIHt3aWR0aDowfVxyXHJcdFx0dmFyIG89dGhpcy5hc09iamVjdCh4KSwgdDtcclxyXHRcdCh0PXguJDEoJ3NvbGlkRmlsbCcpKSAmJiAoby5jb2xvcj10aGlzLnNvbGlkRmlsbCh0KSk7XHJcclx0XHQodD1vLncpICYmIChvLndpZHRoPXRoaXMuYXNQdCh0LCdjbScpKSAmJiAoZGVsZXRlIG8udyk7XHJcdFx0KHQ9eC4kMSgncHJzdERhc2gnKSkgJiYgKG8uZGFzaD10LmF0dHIoJ3ZhbCcpKTtcclx0XHRyZXR1cm4gb1xyXHR9LFxyXHRlZmZlY3RMc3QoeCl7XHJcclx0fSxcclx0YmxpcEZpbGwoeCl7XHJcdFx0cmV0dXJuIHRoaXMud0RvYy5nZXRSZWwoeC4kMSgnYmxpcCcpLmF0dHIoJ3I6ZW1iZWQnKSlcclx0fSxcclx0cHJzdEdlb20oeCl7XHJcdFx0dmFyIHB4PXRoaXMucHQyUHgsIHc9cHgodGhpcy53b3JsZC53aWR0aCksIGg9cHgodGhpcy53b3JsZC5oZWlnaHQpO1xyXHRcdHN3aXRjaCh4LmF0dHIoJ3Byc3QnKSl7XHJcdFx0Y2FzZSAnbGVmdEJyYWNlJzpcclx0XHRcdHJldHVybiB7c2hhcGU6J3BhdGgnLCBwYXRoOidNICcrdysnIDAgTCAwICcraC8yKycgTCAnK3crJyAnK2grJyBaJ31cclx0XHRkZWZhdWx0OlxyXHRcdFx0cmV0dXJuIHtzaGFwZTp4LmF0dHIoJ3Byc3QnKX1cclx0XHR9XHJcdH0sXHJcdGN1c3RHZW9tKHgpe1xyXHRcdHZhciBwYXRoPVtdLCBweD1mdW5jdGlvbih4KXtyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSl9LmJpbmQodGhpcyk7XHJcdFx0Zm9yKHZhciBhLCBjaGlsZHJlbj14LiQxKCdwYXRoJykuY2hpbGROb2RlcywgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcclx0XHRcdGE9Y2hpbGRyZW5baV1cclx0XHRcdHN3aXRjaChhLmxvY2FsTmFtZSl7XHJcdFx0XHRjYXNlICdtb3ZlVG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ00gJytweChhLmZpcnN0Q2hpbGQuYXR0cigneCcpKSsnICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3knKSkpXHJcdFx0XHRcdGJyZWFrXHJcdFx0XHRjYXNlICdsblRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdMICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3gnKSkrJyAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd5JykpKVxyXHRcdFx0XHRicmVha1xyXHRcdFx0YnJlYWtcclx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ0wgJytweChhLmNoaWxkTm9kZXNbMF0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZE5vZGVzWzBdLmF0dHIoJ3knKSkpXHJcdFx0XHRcdHBhdGgucHVzaCgnUSAnK3B4KGEuY2hpbGROb2Rlc1sxXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkTm9kZXNbMV0uYXR0cigneScpKVxyXHRcdFx0XHRcdCsnICcrcHgoYS5jaGlsZE5vZGVzWzJdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGROb2Rlc1syXS5hdHRyKCd5JykpKVxyXHRcdFx0YnJlYWtcclx0XHRcdH1cclx0XHR9XHJcdFx0cmV0dXJuIHtzaGFwZToncGF0aCcsIHBhdGg6cGF0aC5qb2luKCcgJyl9XHJcdH1ccn1cciJdfQ==