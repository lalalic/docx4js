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

		var _this = _possibleConstructorReturn(this, (Drawing.__proto__ || Object.getPrototypeOf(Drawing)).apply(this, arguments));

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

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwid0RvYyIsInJlcXVpcmUiLCJ0IiwiJDEiLCJ4Iiwid2lkdGgiLCJwdDJQeCIsImFzUHQiLCJhdHRyIiwiaGVpZ2h0IiwiYXNPYmplY3QiLCJwYXJzZUludCIsInZhbHVlIiwiRU1QVFkiLCJkaXN0VCIsIk9iamVjdCIsImFzc2lnbiIsIm5hbWluZyIsImN1c3RHZW9tIiwicHJzdEdlb20iLCJwcm90b3R5cGUiLCJTcFByb3BlcnRpZXMiLCJTdHlsZSIsInhmcm0iLCJleHQiLCJvZmZzZXQiLCJ3b3JsZCIsInkiLCJyb3RhdGlvbiIsInNvbGlkRmlsbCIsImVsQ29sb3IiLCJmaXJzdENoaWxkIiwiY29sb3IiLCJhc0NvbG9yIiwibG9jYWxOYW1lIiwiZ2V0Q29sb3JUaGVtZSIsImdldCIsInNoYWRlQ29sb3IiLCJub0ZpbGwiLCJncmFkRmlsbCIsInR5cGUiLCJvIiwic3RvcHMiLCJncyIsIiQiLCJhIiwiaSIsImxlbiIsImxlbmd0aCIsInB1c2giLCJwb3NpdGlvbiIsImFuZyIsImFuZ2VsIiwicGF0aCIsInJlY3QiLCJsbiIsInciLCJkYXNoIiwiZWZmZWN0THN0IiwiYmxpcEZpbGwiLCJnZXRSZWwiLCJweCIsImgiLCJzaGFwZSIsImJpbmQiLCJjaGlsZHJlbiIsImNoaWxkTm9kZXMiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87OztBQUNwQixrQkFBWUMsSUFBWixFQUFpQjtBQUFBOztBQUFBLGlIQUNQQyxTQURPOztBQUVoQixRQUFLQyxRQUFMLEdBQWMsSUFBZDtBQUZnQjtBQUdoQjs7OzttQ0FDZTtBQUNmLFVBQU8sSUFBSSxLQUFLQyxXQUFMLENBQWlCQyxVQUFyQixDQUFn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QUFMO0FBQ0M2QyxVQUFLSixJQUFMLENBQVUsT0FBS1ksR0FBR2hCLEVBQUVxQixVQUFGLENBQWEsQ0FBYixFQUFnQjFELElBQWhCLENBQXFCLEdBQXJCLENBQUgsQ0FBTCxHQUFtQyxHQUFuQyxHQUF1Q3FELEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0IxRCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBQWpEO0FBQ0E2QyxVQUFLSixJQUFMLENBQVUsT0FBS1ksR0FBR2hCLEVBQUVxQixVQUFGLENBQWEsQ0FBYixFQUFnQjFELElBQWhCLENBQXFCLEdBQXJCLENBQUgsQ0FBTCxHQUFtQyxHQUFuQyxHQUF1Q3FELEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0IxRCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBQXZDLEdBQ1IsR0FEUSxHQUNKcUQsR0FBR2hCLEVBQUVxQixVQUFGLENBQWEsQ0FBYixFQUFnQjFELElBQWhCLENBQXFCLEdBQXJCLENBQUgsQ0FESSxHQUMwQixHQUQxQixHQUM4QnFELEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0IxRCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBRHhDO0FBRUQ7QUFaQTtBQWNBO0FBQ0QsU0FBTyxFQUFDdUQsT0FBTSxNQUFQLEVBQWVWLE1BQUtBLEtBQUtjLElBQUwsQ0FBVSxHQUFWLENBQXBCLEVBQVA7QUFDQTtBQTVGbUIsQ0FBckIiLCJmaWxlIjoiZHJhd2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlJ1xyXHJleHBvcnQgZGVmYXVsdCBjbGFzcyBEcmF3aW5nIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcclx0Y29uc3RydWN0b3Iod1htbCl7XHJcdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXHRcdHRoaXMud0RyYXdpbmc9bnVsbFxyXHR9XHJcdGdldERpcmVjdFN0eWxlKCl7XHJcdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy53RHJhd2luZyx0aGlzLndEb2MsIHRoaXMpXHJcdH1cclx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclx0XHRyZXR1cm4gW11cclx0fVxyfVxyXHJEcmF3aW5nLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XHJcdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xyXHRcdHJldHVybiBbdGhpcy53WG1sLiQxKCdleHRlbnQnKSwgdGhpcy53WG1sLiQxKCdlZmZlY3RFeHRlbnQnKV1cclx0fVxyXHRleHRlbnQoeCl7Ly9pbmxpbmUgYW5kIGFuY2hvclxyXHRcdHJldHVybiB7d2lkdGg6dGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCdjeCcpLCdjbScpKSxoZWlnaHQ6dGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCdjeScpLCdjbScpKX1cclx0fVxyXHRlZmZlY3RFeHRlbnQoeCl7XHJcdFx0cmV0dXJuIHRoaXMuYXNPYmplY3QoeCx4PT50aGlzLnB0MlB4KHRoaXMuYXNQdCh4LCdjbScpKSlcclx0fVxyXHRkaXN0VCh4KXtcclx0XHRpZih4PXBhcnNlSW50KHgudmFsdWUpKVxyXHRcdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHgsJ2NtJykpXHJcdFx0cmV0dXJuIHRoaXMuRU1QVFlcclx0fVxyXHRkaXN0Qih4KXtcclx0XHRyZXR1cm4gdGhpcy5kaXN0VCh4KVxyXHR9XHJcdGRpc3RSKHgpe1xyXHRcdHJldHVybiB0aGlzLmRpc3RUKHgpXHJcdH1cclx0ZGlzdEwoeCl7XHJcdFx0cmV0dXJuIHRoaXMuZGlzdFQoeClcclx0fVxyXG5cdFxyXG5cdHN0YXRpYyBtaXhpblNwUHJvcGVydGllcygpe1xyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLm5hbWluZyx7XHJcblx0XHRcdGN1c3RHZW9tOidwYXRoJyxcclxuXHRcdFx0cHJzdEdlb206J3BhdGgnXHJcblx0XHR9KVxyXG5cdFx0XHJcblx0XHRPYmplY3QuYXNzaWduKHRoaXMucHJvdG90eXBlLERyYXdpbmcuU3BQcm9wZXJ0aWVzKVxyXG5cdH1ccn1cclxyRHJhd2luZy5TcFByb3BlcnRpZXM9e1xyXHR4ZnJtKHgpe1xyXHRcdHZhciBleHQ9eC4kMSgnZXh0JyksIG9mZnNldD14LiQxKCdvZmYnKVxyXHRcdHJldHVybiB0aGlzLndvcmxkPXtcclx0XHRcdHdpZHRoOnRoaXMucHQyUHgodGhpcy5hc1B0KGV4dC5hdHRyKCdjeCcpLCdjbScpKSxcclx0XHRcdGhlaWdodDp0aGlzLnB0MlB4KHRoaXMuYXNQdChleHQuYXR0cignY3knKSwnY20nKSksXHJcdFx0XHR4OnRoaXMucHQyUHgodGhpcy5hc1B0KG9mZnNldC5hdHRyKCd4JyksJ2NtJykpLFxyXHRcdFx0eTp0aGlzLnB0MlB4KHRoaXMuYXNQdChvZmZzZXQuYXR0cigneScpLCdjbScpKSxcclx0XHRcdHJvdGF0aW9uOiBwYXJzZUludCh4LmF0dHIoJ3JvdCcpfHwwKS82MDAwMFxyXHRcdH1cclx0fSxcclx0c29saWRGaWxsKHgpe1xyXHRcdHZhciBlbENvbG9yPXguZmlyc3RDaGlsZCxcclx0XHRcdGNvbG9yPXRoaXMuYXNDb2xvcihlbENvbG9yLmF0dHIoJ3ZhbCcpKSwgdDtcclxyXHRcdGlmKGNvbG9yPT0ncGhDbHInKVxyXHRcdFx0cmV0dXJuICdwaENscidcclxyXHRcdHN3aXRjaChlbENvbG9yLmxvY2FsTmFtZSl7XHJcdFx0Y2FzZSAnc2NoZW1lQ2xyJzpcclx0XHRcdGNvbG9yPXRoaXMud0RvYy5nZXRDb2xvclRoZW1lKCkuZ2V0KGNvbG9yKVxyXHRcdFx0YnJlYWtcclx0XHR9XHJcclx0XHRpZih0PWVsQ29sb3IuJDEoJ3NoYWRlJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdGlmKHQ9ZWxDb2xvci4kMSgnbHVtT2ZmJykpXHJcdFx0XHRjb2xvcj10aGlzLnNoYWRlQ29sb3IoY29sb3IsLTEqcGFyc2VJbnQodC5hdHRyKCd2YWwnKSkvMTAwMClcclxyXHRcdHJldHVybiBjb2xvclxyXHR9LFxyXHRub0ZpbGwoeCl7XHJcdFx0cmV0dXJuIDFcclx0fSxcclx0Z3JhZEZpbGwoeCl7XHJcdFx0dmFyIHR5cGU9eC4kMSgnbGluLHBhdGgnKSwgbz10aGlzLmFzT2JqZWN0KHR5cGUpLCBzdG9wcz1bXVxyXHRcdGZvcih2YXIgZ3M9eC4kKCdncycpLGEsaT0wLGxlbj1ncy5sZW5ndGg7aTxsZW47aSsrKVxyXHRcdFx0c3RvcHMucHVzaCh7cG9zaXRpb246cGFyc2VJbnQoZ3NbaV0uYXR0cigncG9zJykpLzEwMDAsIGNvbG9yOnRoaXMuc29saWRGaWxsKGdzW2ldKX0pXHJcdFx0by5hbmcgJiYgKG8uYW5nZWw9cGFyc2VJbnQoby5hbmcpLzYwMDAwLCBkZWxldGUgby5hbmcpO1xyXHRcdG8ucGF0aCAmJiAoby5yZWN0PXRoaXMuYXNPYmplY3QodHlwZS5maXJzdENoaWxkLCAoeCk9PnBhcnNlSW50KHgpLzEwMDApKTtcclx0XHRvLnBhdGg9dHlwZS5sb2NhbE5hbWU9PSdsaW4nID8gJ2xpbmVhcicgOiBvLnBhdGg7XHJcdFx0by5zdG9wcz1zdG9wc1xyXHRcdHJldHVybiBvXHJcdH0sXHJcdGxuKHgpe1xyXHRcdGlmKHguJDEoJ25vRmlsbCcpKVxyXHRcdFx0cmV0dXJuIHt3aWR0aDowfVxyXHJcdFx0dmFyIG89dGhpcy5hc09iamVjdCh4KSwgdDtcclxyXHRcdCh0PXguJDEoJ3NvbGlkRmlsbCcpKSAmJiAoby5jb2xvcj10aGlzLnNvbGlkRmlsbCh0KSk7XHJcclx0XHQodD1vLncpICYmIChvLndpZHRoPXRoaXMuYXNQdCh0LCdjbScpKSAmJiAoZGVsZXRlIG8udyk7XHJcdFx0KHQ9eC4kMSgncHJzdERhc2gnKSkgJiYgKG8uZGFzaD10LmF0dHIoJ3ZhbCcpKTtcclx0XHRyZXR1cm4gb1xyXHR9LFxyXHRlZmZlY3RMc3QoeCl7XHJcclx0fSxcclx0YmxpcEZpbGwoeCl7XHJcdFx0cmV0dXJuIHRoaXMud0RvYy5nZXRSZWwoeC4kMSgnYmxpcCcpLmF0dHIoJ3I6ZW1iZWQnKSlcclx0fSxcclx0cHJzdEdlb20oeCl7XHJcdFx0dmFyIHB4PXRoaXMucHQyUHgsIHc9cHgodGhpcy53b3JsZC53aWR0aCksIGg9cHgodGhpcy53b3JsZC5oZWlnaHQpO1xyXHRcdHN3aXRjaCh4LmF0dHIoJ3Byc3QnKSl7XHJcdFx0Y2FzZSAnbGVmdEJyYWNlJzpcclx0XHRcdHJldHVybiB7c2hhcGU6J3BhdGgnLCBwYXRoOidNICcrdysnIDAgTCAwICcraC8yKycgTCAnK3crJyAnK2grJyBaJ31cclx0XHRkZWZhdWx0OlxyXHRcdFx0cmV0dXJuIHtzaGFwZTp4LmF0dHIoJ3Byc3QnKX1cclx0XHR9XHJcdH0sXHJcdGN1c3RHZW9tKHgpe1xyXHRcdHZhciBwYXRoPVtdLCBweD1mdW5jdGlvbih4KXtyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSl9LmJpbmQodGhpcyk7XHJcdFx0Zm9yKHZhciBhLCBjaGlsZHJlbj14LiQxKCdwYXRoJykuY2hpbGROb2RlcywgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcclx0XHRcdGE9Y2hpbGRyZW5baV1cclx0XHRcdHN3aXRjaChhLmxvY2FsTmFtZSl7XHJcdFx0XHRjYXNlICdtb3ZlVG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ00gJytweChhLmZpcnN0Q2hpbGQuYXR0cigneCcpKSsnICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3knKSkpXHJcdFx0XHRcdGJyZWFrXHJcdFx0XHRjYXNlICdsblRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdMICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3gnKSkrJyAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd5JykpKVxyXHRcdFx0XHRicmVha1xyXHRcdFx0YnJlYWtcclx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ0wgJytweChhLmNoaWxkTm9kZXNbMF0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZE5vZGVzWzBdLmF0dHIoJ3knKSkpXHJcdFx0XHRcdHBhdGgucHVzaCgnUSAnK3B4KGEuY2hpbGROb2Rlc1sxXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkTm9kZXNbMV0uYXR0cigneScpKVxyXHRcdFx0XHRcdCsnICcrcHgoYS5jaGlsZE5vZGVzWzJdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGROb2Rlc1syXS5hdHRyKCd5JykpKVxyXHRcdFx0YnJlYWtcclx0XHRcdH1cclx0XHR9XHJcdFx0cmV0dXJuIHtzaGFwZToncGF0aCcsIHBhdGg6cGF0aC5qb2luKCcgJyl9XHJcdH1ccn1cciJdfQ==