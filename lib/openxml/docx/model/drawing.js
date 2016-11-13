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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6WyJEcmF3aW5nIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiY29uc3RydWN0b3IiLCJQcm9wZXJ0aWVzIiwid0RvYyIsInJlcXVpcmUiLCJ0IiwiJDEiLCJ4Iiwid2lkdGgiLCJwdDJQeCIsImFzUHQiLCJhdHRyIiwiaGVpZ2h0IiwiYXNPYmplY3QiLCJwYXJzZUludCIsInZhbHVlIiwiRU1QVFkiLCJkaXN0VCIsIk9iamVjdCIsImFzc2lnbiIsIm5hbWluZyIsImN1c3RHZW9tIiwicHJzdEdlb20iLCJwcm90b3R5cGUiLCJTcFByb3BlcnRpZXMiLCJ4ZnJtIiwiZXh0Iiwib2Zmc2V0Iiwid29ybGQiLCJ5Iiwicm90YXRpb24iLCJzb2xpZEZpbGwiLCJlbENvbG9yIiwiZmlyc3RDaGlsZCIsImNvbG9yIiwiYXNDb2xvciIsImxvY2FsTmFtZSIsImdldENvbG9yVGhlbWUiLCJnZXQiLCJzaGFkZUNvbG9yIiwibm9GaWxsIiwiZ3JhZEZpbGwiLCJ0eXBlIiwibyIsInN0b3BzIiwiZ3MiLCIkIiwiYSIsImkiLCJsZW4iLCJsZW5ndGgiLCJwdXNoIiwicG9zaXRpb24iLCJhbmciLCJhbmdlbCIsInBhdGgiLCJyZWN0IiwibG4iLCJ3IiwiZGFzaCIsImVmZmVjdExzdCIsImJsaXBGaWxsIiwiZ2V0UmVsIiwicHgiLCJoIiwic2hhcGUiLCJiaW5kIiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7QUFDcEIsa0JBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFBQSxpSEFDUEMsU0FETzs7QUFFaEIsUUFBS0MsUUFBTCxHQUFjLElBQWQ7QUFGZ0I7QUFHaEI7Ozs7bUNBQ2U7QUFDZixVQUFPLElBQUksS0FBS0MsV0FBTCxDQUFpQkMsVUFBckIsQ0FBZ0MsS0FBS0Ys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VUFBS0osSUFBTCxDQUFVLE9BQUtZLEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0J6RCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBQUwsR0FBbUMsR0FBbkMsR0FBdUNvRCxHQUFHaEIsRUFBRXFCLFVBQUYsQ0FBYSxDQUFiLEVBQWdCekQsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBSCxDQUFqRDtBQUNBNEMsVUFBS0osSUFBTCxDQUFVLE9BQUtZLEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0J6RCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBQUwsR0FBbUMsR0FBbkMsR0FBdUNvRCxHQUFHaEIsRUFBRXFCLFVBQUYsQ0FBYSxDQUFiLEVBQWdCekQsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBSCxDQUF2QyxHQUNSLEdBRFEsR0FDSm9ELEdBQUdoQixFQUFFcUIsVUFBRixDQUFhLENBQWIsRUFBZ0J6RCxJQUFoQixDQUFxQixHQUFyQixDQUFILENBREksR0FDMEIsR0FEMUIsR0FDOEJvRCxHQUFHaEIsRUFBRXFCLFVBQUYsQ0FBYSxDQUFiLEVBQWdCekQsSUFBaEIsQ0FBcUIsR0FBckIsQ0FBSCxDQUR4QztBQUVEO0FBWkE7QUFjQTtBQUNELFNBQU8sRUFBQ3NELE9BQU0sTUFBUCxFQUFlVixNQUFLQSxLQUFLYyxJQUFMLENBQVUsR0FBVixDQUFwQixFQUFQO0FBQ0E7QUE1Rm1CLENBQXJCIiwiZmlsZSI6ImRyYXdpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZSdcclxyZXhwb3J0IGRlZmF1bHQgY2xhc3MgRHJhd2luZyBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XHJcdGNvbnN0cnVjdG9yKHdYbWwpe1xyXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclx0XHR0aGlzLndEcmF3aW5nPW51bGxcclx0fVxyXHRnZXREaXJlY3RTdHlsZSgpe1xyXHRcdHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Qcm9wZXJ0aWVzKHRoaXMud0RyYXdpbmcsdGhpcy53RG9jLCB0aGlzKVxyXHR9XHJcdF9nZXRWYWxpZENoaWxkcmVuKCl7XHJcdFx0cmV0dXJuIFtdXHJcdH1ccn1cclxyRHJhd2luZy5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xyXHRfZ2V0VmFsaWRDaGlsZHJlbih0KXtcclx0XHRyZXR1cm4gW3RoaXMud1htbC4kMSgnZXh0ZW50JyksIHRoaXMud1htbC4kMSgnZWZmZWN0RXh0ZW50JyldXHJcdH1cclx0ZXh0ZW50KHgpey8vaW5saW5lIGFuZCBhbmNob3Jcclx0XHRyZXR1cm4ge3dpZHRoOnRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cignY3gnKSwnY20nKSksaGVpZ2h0OnRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cignY3knKSwnY20nKSl9XHJcdH1cclx0ZWZmZWN0RXh0ZW50KHgpe1xyXHRcdHJldHVybiB0aGlzLmFzT2JqZWN0KHgseD0+dGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSkpXHJcdH1cclx0ZGlzdFQoeCl7XHJcdFx0aWYoeD1wYXJzZUludCh4LnZhbHVlKSlcclx0XHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LCdjbScpKVxyXHRcdHJldHVybiB0aGlzLkVNUFRZXHJcdH1cclx0ZGlzdEIoeCl7XHJcdFx0cmV0dXJuIHRoaXMuZGlzdFQoeClcclx0fVxyXHRkaXN0Uih4KXtcclx0XHRyZXR1cm4gdGhpcy5kaXN0VCh4KVxyXHR9XHJcdGRpc3RMKHgpe1xyXHRcdHJldHVybiB0aGlzLmRpc3RUKHgpXHJcdH1cclxuXHRcclxuXHRzdGF0aWMgbWl4aW5TcFByb3BlcnRpZXMoKXtcclxuXHRcdE9iamVjdC5hc3NpZ24odGhpcy5uYW1pbmcse1xyXG5cdFx0XHRjdXN0R2VvbToncGF0aCcsXHJcblx0XHRcdHByc3RHZW9tOidwYXRoJ1xyXG5cdFx0fSlcclxuXHRcdFxyXG5cdFx0T2JqZWN0LmFzc2lnbih0aGlzLnByb3RvdHlwZSxEcmF3aW5nLlNwUHJvcGVydGllcylcclxuXHR9XHJ9XHJcckRyYXdpbmcuU3BQcm9wZXJ0aWVzPXtcclx0eGZybSh4KXtcclx0XHR2YXIgZXh0PXguJDEoJ2V4dCcpLCBvZmZzZXQ9eC4kMSgnb2ZmJylcclx0XHRyZXR1cm4gdGhpcy53b3JsZD17XHJcdFx0XHR3aWR0aDp0aGlzLnB0MlB4KHRoaXMuYXNQdChleHQuYXR0cignY3gnKSwnY20nKSksXHJcdFx0XHRoZWlnaHQ6dGhpcy5wdDJQeCh0aGlzLmFzUHQoZXh0LmF0dHIoJ2N5JyksJ2NtJykpLFxyXHRcdFx0eDp0aGlzLnB0MlB4KHRoaXMuYXNQdChvZmZzZXQuYXR0cigneCcpLCdjbScpKSxcclx0XHRcdHk6dGhpcy5wdDJQeCh0aGlzLmFzUHQob2Zmc2V0LmF0dHIoJ3knKSwnY20nKSksXHJcdFx0XHRyb3RhdGlvbjogcGFyc2VJbnQoeC5hdHRyKCdyb3QnKXx8MCkvNjAwMDBcclx0XHR9XHJcdH0sXHJcdHNvbGlkRmlsbCh4KXtcclx0XHR2YXIgZWxDb2xvcj14LmZpcnN0Q2hpbGQsXHJcdFx0XHRjb2xvcj10aGlzLmFzQ29sb3IoZWxDb2xvci5hdHRyKCd2YWwnKSksIHQ7XHJcclx0XHRpZihjb2xvcj09J3BoQ2xyJylcclx0XHRcdHJldHVybiAncGhDbHInXHJcclx0XHRzd2l0Y2goZWxDb2xvci5sb2NhbE5hbWUpe1xyXHRcdGNhc2UgJ3NjaGVtZUNscic6XHJcdFx0XHRjb2xvcj10aGlzLndEb2MuZ2V0Q29sb3JUaGVtZSgpLmdldChjb2xvcilcclx0XHRcdGJyZWFrXHJcdFx0fVxyXHJcdFx0aWYodD1lbENvbG9yLiQxKCdzaGFkZScpKVxyXHRcdFx0Y29sb3I9dGhpcy5zaGFkZUNvbG9yKGNvbG9yLC0xKnBhcnNlSW50KHQuYXR0cigndmFsJykpLzEwMDApXHJcclx0XHRpZih0PWVsQ29sb3IuJDEoJ2x1bU9mZicpKVxyXHRcdFx0Y29sb3I9dGhpcy5zaGFkZUNvbG9yKGNvbG9yLC0xKnBhcnNlSW50KHQuYXR0cigndmFsJykpLzEwMDApXHJcclx0XHRyZXR1cm4gY29sb3Jcclx0fSxcclx0bm9GaWxsKHgpe1xyXHRcdHJldHVybiAxXHJcdH0sXHJcdGdyYWRGaWxsKHgpe1xyXHRcdHZhciB0eXBlPXguJDEoJ2xpbixwYXRoJyksIG89dGhpcy5hc09iamVjdCh0eXBlKSwgc3RvcHM9W11cclx0XHRmb3IodmFyIGdzPXguJCgnZ3MnKSxhLGk9MCxsZW49Z3MubGVuZ3RoO2k8bGVuO2krKylcclx0XHRcdHN0b3BzLnB1c2goe3Bvc2l0aW9uOnBhcnNlSW50KGdzW2ldLmF0dHIoJ3BvcycpKS8xMDAwLCBjb2xvcjp0aGlzLnNvbGlkRmlsbChnc1tpXSl9KVxyXHRcdG8uYW5nICYmIChvLmFuZ2VsPXBhcnNlSW50KG8uYW5nKS82MDAwMCwgZGVsZXRlIG8uYW5nKTtcclx0XHRvLnBhdGggJiYgKG8ucmVjdD10aGlzLmFzT2JqZWN0KHR5cGUuZmlyc3RDaGlsZCwgKHgpPT5wYXJzZUludCh4KS8xMDAwKSk7XHJcdFx0by5wYXRoPXR5cGUubG9jYWxOYW1lPT0nbGluJyA/ICdsaW5lYXInIDogby5wYXRoO1xyXHRcdG8uc3RvcHM9c3RvcHNcclx0XHRyZXR1cm4gb1xyXHR9LFxyXHRsbih4KXtcclx0XHRpZih4LiQxKCdub0ZpbGwnKSlcclx0XHRcdHJldHVybiB7d2lkdGg6MH1cclxyXHRcdHZhciBvPXRoaXMuYXNPYmplY3QoeCksIHQ7XHJcclx0XHQodD14LiQxKCdzb2xpZEZpbGwnKSkgJiYgKG8uY29sb3I9dGhpcy5zb2xpZEZpbGwodCkpO1xyXHJcdFx0KHQ9by53KSAmJiAoby53aWR0aD10aGlzLmFzUHQodCwnY20nKSkgJiYgKGRlbGV0ZSBvLncpO1xyXHRcdCh0PXguJDEoJ3Byc3REYXNoJykpICYmIChvLmRhc2g9dC5hdHRyKCd2YWwnKSk7XHJcdFx0cmV0dXJuIG9cclx0fSxcclx0ZWZmZWN0THN0KHgpe1xyXHJcdH0sXHJcdGJsaXBGaWxsKHgpe1xyXHRcdHJldHVybiB0aGlzLndEb2MuZ2V0UmVsKHguJDEoJ2JsaXAnKS5hdHRyKCdyOmVtYmVkJykpXHJcdH0sXHJcdHByc3RHZW9tKHgpe1xyXHRcdHZhciBweD10aGlzLnB0MlB4LCB3PXB4KHRoaXMud29ybGQud2lkdGgpLCBoPXB4KHRoaXMud29ybGQuaGVpZ2h0KTtcclx0XHRzd2l0Y2goeC5hdHRyKCdwcnN0Jykpe1xyXHRcdGNhc2UgJ2xlZnRCcmFjZSc6XHJcdFx0XHRyZXR1cm4ge3NoYXBlOidwYXRoJywgcGF0aDonTSAnK3crJyAwIEwgMCAnK2gvMisnIEwgJyt3KycgJytoKycgWid9XHJcdFx0ZGVmYXVsdDpcclx0XHRcdHJldHVybiB7c2hhcGU6eC5hdHRyKCdwcnN0Jyl9XHJcdFx0fVxyXHR9LFxyXHRjdXN0R2VvbSh4KXtcclx0XHR2YXIgcGF0aD1bXSwgcHg9ZnVuY3Rpb24oeCl7cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHgsJ2NtJykpfS5iaW5kKHRoaXMpO1xyXHRcdGZvcih2YXIgYSwgY2hpbGRyZW49eC4kMSgncGF0aCcpLmNoaWxkTm9kZXMsIGxlbj1jaGlsZHJlbi5sZW5ndGgsaT0wO2k8bGVuO2krKyl7XHJcdFx0XHRhPWNoaWxkcmVuW2ldXHJcdFx0XHRzd2l0Y2goYS5sb2NhbE5hbWUpe1xyXHRcdFx0Y2FzZSAnbW92ZVRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdNICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3gnKSkrJyAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd5JykpKVxyXHRcdFx0XHRicmVha1xyXHRcdFx0Y2FzZSAnbG5Ubyc6XHJcdFx0XHRcdHBhdGgucHVzaCgnTCAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd4JykpKycgJytweChhLmZpcnN0Q2hpbGQuYXR0cigneScpKSlcclx0XHRcdFx0YnJlYWtcclx0XHRcdGJyZWFrXHJcdFx0XHRjYXNlICdjdWJpY0JlelRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdMICcrcHgoYS5jaGlsZE5vZGVzWzBdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGROb2Rlc1swXS5hdHRyKCd5JykpKVxyXHRcdFx0XHRwYXRoLnB1c2goJ1EgJytweChhLmNoaWxkTm9kZXNbMV0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZE5vZGVzWzFdLmF0dHIoJ3knKSlcclx0XHRcdFx0XHQrJyAnK3B4KGEuY2hpbGROb2Rlc1syXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkTm9kZXNbMl0uYXR0cigneScpKSlcclx0XHRcdGJyZWFrXHJcdFx0XHR9XHJcdFx0fVxyXHRcdHJldHVybiB7c2hhcGU6J3BhdGgnLCBwYXRoOnBhdGguam9pbignICcpfVxyXHR9XHJ9XHIiXX0=