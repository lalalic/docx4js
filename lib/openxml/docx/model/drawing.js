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
			return { width: this.asPt(x.attr('cx'), 'cm'), height: this.asPt(x.attr('cy'), 'cm') };
		}
	}, {
		key: 'effectExtent',
		value: function effectExtent(x) {
			return this.asObject(x, function (x) {
				return this.asPt(x, 'cm');
			}.bind(this));
		}
	}, {
		key: 'distT',
		value: function distT(x) {
			if (x = parseInt(x.value)) return this.asPt(x, 'cm');
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
			width: this.asPt(ext.attr('cx'), 'cm'),
			height: this.asPt(ext.attr('cy'), 'cm'),
			x: this.asPt(offset.attr('x'), 'cm'),
			y: this.asPt(offset.attr('y'), 'cm'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixDQUFZLElBQVosRUFBaUI7d0JBREcsU0FDSDs7cUVBREcscUJBRVYsWUFETzs7QUFFaEIsUUFBSyxRQUFMLEdBQWMsSUFBZCxDQUZnQjs7RUFBakI7O2NBRG9COzttQ0FLSjtBQUNmLFVBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsS0FBSyxRQUFMLEVBQWMsS0FBSyxJQUFMLEVBQVcsSUFBekQsQ0FBUCxDQURlOzs7O3NDQUdHO0FBQ2xCLFVBQU8sRUFBUCxDQURrQjs7OztRQVJDO0VBQWdCLFFBQVEsVUFBUjs7a0JBQWhCOzs7QUFhckIsUUFBUSxVQUFSO1dBQXlCOzs7Ozs7Ozs7O29DQUNOLEdBQUU7QUFDbkIsVUFBTyxDQUFDLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxRQUFiLENBQUQsRUFBeUIsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGNBQWIsQ0FBekIsQ0FBUCxDQURtQjs7Ozt5QkFHYixHQUFFOztBQUNSLFVBQU8sRUFBQyxPQUFNLEtBQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FBVixFQUF1QixJQUF2QixDQUFOLEVBQW1DLFFBQU8sS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUFWLEVBQXVCLElBQXZCLENBQVAsRUFBM0MsQ0FEUTs7OzsrQkFHSSxHQUFFO0FBQ2QsVUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLEVBQVksSUFBWixDQUFQLENBQUQ7SUFBWCxDQUFzQyxJQUF0QyxDQUEyQyxJQUEzQyxDQUFoQixDQUFQLENBRGM7Ozs7d0JBR1QsR0FBRTtBQUNQLE9BQUcs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QUFFLFVBQUYsQ0FBYSxDQUFiLEVBQWdCLElBQWhCLENBQXFCLEdBQXJCLENBQUgsQ0FEOUIsQ0FBVixDQUZEO0FBSUEsV0FKQTtBQVJBLElBRjhFO0dBQS9FO0FBaUJBLFNBQU8sRUFBQyxPQUFNLE1BQU4sRUFBYyxNQUFLLEtBQUssSUFBTCxDQUFVLEdBQVYsQ0FBTCxFQUF0QixDQW5CVTtFQXhFUztDQUFyQiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUnXHJccmV4cG9ydCBkZWZhdWx0IGNsYXNzIERyYXdpbmcgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xyXHRjb25zdHJ1Y3Rvcih3WG1sKXtcclx0XHRzdXBlciguLi5hcmd1bWVudHMpXHJcdFx0dGhpcy53RHJhd2luZz1udWxsXHJcdH1cclx0Z2V0RGlyZWN0U3R5bGUoKXtcclx0XHRyZXR1cm4gbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyh0aGlzLndEcmF3aW5nLHRoaXMud0RvYywgdGhpcylcclx0fVxyXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xyXHRcdHJldHVybiBbXVxyXHR9XHJ9XHJcckRyYXdpbmcuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclx0X2dldFZhbGlkQ2hpbGRyZW4odCl7XHJcdFx0cmV0dXJuIFt0aGlzLndYbWwuJDEoJ2V4dGVudCcpLCB0aGlzLndYbWwuJDEoJ2VmZmVjdEV4dGVudCcpXVxyXHR9XHJcdGV4dGVudCh4KXsvL2lubGluZSBhbmQgYW5jaG9yXHJcdFx0cmV0dXJuIHt3aWR0aDp0aGlzLmFzUHQoeC5hdHRyKCdjeCcpLCdjbScpLGhlaWdodDp0aGlzLmFzUHQoeC5hdHRyKCdjeScpLCdjbScpfVxyXHR9XHJcdGVmZmVjdEV4dGVudCh4KXtcclx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LGZ1bmN0aW9uKHgpe3JldHVybiB0aGlzLmFzUHQoeCwnY20nKX0uYmluZCh0aGlzKSlcclx0fVxyXHRkaXN0VCh4KXtcclx0XHRpZih4PXBhcnNlSW50KHgudmFsdWUpKVxyXHRcdFx0cmV0dXJuIHRoaXMuYXNQdCh4LCdjbScpXHJcdFx0cmV0dXJuIHRoaXMuRU1QVFlcclx0fVxyXHRkaXN0Qih4KXtcclx0XHRyZXR1cm4gdGhpcy5kaXN0VCh4KVxyXHR9XHJcdGRpc3RSKHgpe1xyXHRcdHJldHVybiB0aGlzLmRpc3RUKHgpXHJcdH1cclx0ZGlzdEwoeCl7XHJcdFx0cmV0dXJuIHRoaXMuZGlzdFQoeClcclx0fVxyXG5cdFxyXG5cdHN0YXRpYyBtaXhpblNwUHJvcGVydGllcygpe1xyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm5hbWluZyx7XHJcblx0XHRcdGN1c3RHZW9tOidwYXRoJyxcclxuXHRcdFx0cHJzdEdlb206J3BhdGgnXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMucHJvdG90eXBlLERyYXdpbmcuU3BQcm9wZXJ0aWVzKVxyXG5cdH1ccn1cclxyRHJhd2luZy5TcFByb3BlcnRpZXM9e1xyXHR4ZnJtKHgpe1xyXHRcdHZhciBleHQ9eC4kMSgnZXh0JyksIG9mZnNldD14LiQxKCdvZmYnKVxyXHRcdHJldHVybiB0aGlzLndvcmxkPXtcclx0XHRcdHdpZHRoOnRoaXMuYXNQdChleHQuYXR0cignY3gnKSwnY20nKSxcclx0XHRcdGhlaWdodDp0aGlzLmFzUHQoZXh0LmF0dHIoJ2N5JyksJ2NtJyksXHJcdFx0XHR4OnRoaXMuYXNQdChvZmZzZXQuYXR0cigneCcpLCdjbScpLFxyXHRcdFx0eTp0aGlzLmFzUHQob2Zmc2V0LmF0dHIoJ3knKSwnY20nKSxcclx0XHRcdHJvdGF0aW9uOiBwYXJzZUludCh4LmF0dHIoJ3JvdCcpfHwwKS82MDAwMFxyXHRcdH1cclx0fSxcclx0c29saWRGaWxsKHgpe1xyXHRcdHZhciBlbENvbG9yPXguZmlyc3RDaGlsZCxcclx0XHRcdGNvbG9yPXRoaXMuYXNDb2xvcihlbENvbG9yLmF0dHIoJ3ZhbCcpKSwgdDtcclxyXHRcdGlmKGNvbG9yPT0ncGhDbHInKVxyXHRcdFx0cmV0dXJuICdwaENscidcclxyXHRcdHN3aXRjaChlbENvbG9yLmxvY2FsTmFtZSl7XHJcdFx0Y2FzZSAnc2NoZW1lQ2xyJzpcclx0XHRcdGNvbG9yPXRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KGNvbG9yKVxyXHRcdFx0YnJlYWtcclx0XHR9XHJcclx0XHRpZih0PWVsQ29sb3IuJDEoJ3NoYWRlJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdGlmKHQ9ZWxDb2xvci4kMSgnbHVtT2ZmJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdHJldHVybiBjb2xvclxyXHR9LFxyXHRub0ZpbGwoeCl7XHJcdFx0cmV0dXJuIDFcclx0fSxcclx0Z3JhZEZpbGwoeCl7XHJcdFx0dmFyIHR5cGU9eC4kMSgnbGluLHBhdGgnKSwgbz10aGlzLmFzT2JqZWN0KHR5cGUpLCBzdG9wcz1bXVxyXHRcdGZvcih2YXIgZ3M9eC4kKCdncycpLGEsaT0wLGxlbj1ncy5sZW5ndGg7aTxsZW47aSsrKVxyXHRcdFx0c3RvcHMucHVzaCh7cG9zaXRpb246cGFyc2VJbnQoZ3NbaV0uYXR0cigncG9zJykpLzEwMDAsIGNvbG9yOnRoaXMuc29saWRGaWxsKGdzW2ldKX0pXHJcdFx0by5hbmcgJiYgKG8uYW5nZWw9cGFyc2VJbnQoby5hbmcpLzYwMDAwLCBkZWxldGUgby5hbmcpO1xyXHRcdG8ucGF0aCAmJiAoby5yZWN0PXRoaXMuYXNPYmplY3QodHlwZS5maXJzdENoaWxkLCAoeCk9PnBhcnNlSW50KHgpLzEwMDApKTtcclx0XHRvLnBhdGg9dHlwZS5sb2NhbE5hbWU9PSdsaW4nID8gJ2xpbmVhcicgOiBvLnBhdGg7XHJcdFx0by5zdG9wcz1zdG9wc1xyXHRcdHJldHVybiBvXHJcdH0sXHJcdGxuKHgpe1xyXHRcdGlmKHguJDEoJ25vRmlsbCcpKVxyXHRcdFx0cmV0dXJuIHt3aWR0aDowfVxyXHJcdFx0dmFyIG89dGhpcy5hc09iamVjdCh4KSwgdDtcclxyXHRcdCh0PXguJDEoJ3NvbGlkRmlsbCcpKSAmJiAoby5jb2xvcj10aGlzLnNvbGlkRmlsbCh0KSk7XHJcclx0XHQodD1vLncpICYmIChvLndpZHRoPXRoaXMuYXNQdCh0LCdjbScpKSAmJiAoZGVsZXRlIG8udyk7XHJcdFx0KHQ9eC4kMSgncHJzdERhc2gnKSkgJiYgKG8uZGFzaD10LmF0dHIoJ3ZhbCcpKTtcclx0XHRyZXR1cm4gb1xyXHR9LFxyXHRlZmZlY3RMc3QoeCl7XHJcclx0fSxcclx0YmxpcEZpbGwoeCl7XHJcdFx0cmV0dXJuIHRoaXMud0RvYy5nZXRSZWwoeC4kMSgnYmxpcCcpLmF0dHIoJ3I6ZW1iZWQnKSlcclx0fSxcclx0cHJzdEdlb20oeCl7XHJcdFx0dmFyIHB4PXRoaXMucHQyUHgsIHc9cHgodGhpcy53b3JsZC53aWR0aCksIGg9cHgodGhpcy53b3JsZC5oZWlnaHQpO1xyXHRcdHN3aXRjaCh4LmF0dHIoJ3Byc3QnKSl7XHJcdFx0Y2FzZSAnbGVmdEJyYWNlJzpcclx0XHRcdHJldHVybiB7c2hhcGU6J3BhdGgnLCBwYXRoOidNICcrdysnIDAgTCAwICcraC8yKycgTCAnK3crJyAnK2grJyBaJ31cclx0XHRkZWZhdWx0OlxyXHRcdFx0cmV0dXJuIHtzaGFwZTp4LmF0dHIoJ3Byc3QnKX1cclx0XHR9XHJcdH0sXHJcdGN1c3RHZW9tKHgpe1xyXHRcdHZhciBwYXRoPVtdLCBweD1mdW5jdGlvbih4KXtyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSl9LmJpbmQodGhpcyk7XHJcdFx0Zm9yKHZhciBhLCBjaGlsZHJlbj14LiQxKCdwYXRoJykuY2hpbGROb2RlcywgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcclx0XHRcdGE9Y2hpbGRyZW5baV1cclx0XHRcdHN3aXRjaChhLmxvY2FsTmFtZSl7XHJcdFx0XHRjYXNlICdtb3ZlVG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ00gJytweChhLmZpcnN0Q2hpbGQuYXR0cigneCcpKSsnICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3knKSkpXHJcdFx0XHRcdGJyZWFrXHJcdFx0XHRjYXNlICdsblRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdMICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3gnKSkrJyAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd5JykpKVxyXHRcdFx0XHRicmVha1xyXHRcdFx0YnJlYWtcclx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ0wgJytweChhLmNoaWxkTm9kZXNbMF0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZE5vZGVzWzBdLmF0dHIoJ3knKSkpXHJcdFx0XHRcdHBhdGgucHVzaCgnUSAnK3B4KGEuY2hpbGROb2Rlc1sxXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkTm9kZXNbMV0uYXR0cigneScpKVxyXHRcdFx0XHRcdCsnICcrcHgoYS5jaGlsZE5vZGVzWzJdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGROb2Rlc1syXS5hdHRyKCd5JykpKVxyXHRcdFx0YnJlYWtcclx0XHRcdH1cclx0XHR9XHJcdFx0cmV0dXJuIHtzaGFwZToncGF0aCcsIHBhdGg6cGF0aC5qb2luKCcgJyl9XHJcdH1ccn1cciJdfQ==