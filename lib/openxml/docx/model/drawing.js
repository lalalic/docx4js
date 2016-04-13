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

var drawing = function (_require) {
  _inherits(drawing, _require);

  function drawing(wXml) {
    _classCallCheck(this, drawing);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(drawing).apply(this, arguments));

    _this.wDrawing = null;
    return _this;
  }

  _createClass(drawing, [{
    key: 'getDirectStyle',
    value: function getDirectStyle() {
      return new this.constructor.Properties(this.wDrawing, this.wDoc, this);
    }
  }, {
    key: '_getValidChildren',
    value: function _getValidChildren() {
      return [];
    }
  }], [{
    key: 'Properties',
    get: function get() {
      return Properties;
    }
  }, {
    key: 'SpProperties',
    get: function get() {
      return SpProperties;
    }
  }]);

  return drawing;
}(require('../model'));

exports.default = drawing;

var Properties = function (_Style$Properties) {
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
  }]);

  return Properties;
}(_style2.default.Properties);

var naming = {
  custGeom: 'path',
  prstGeom: 'path'
};

var SpProperties = function (_Style$Properties2) {
  _inherits(SpProperties, _Style$Properties2);

  function SpProperties() {
    _classCallCheck(this, SpProperties);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SpProperties).apply(this, arguments));
  }

  _createClass(SpProperties, [{
    key: 'xfrm',
    value: function xfrm(x) {
      var ext = x.$1('ext'),
          offset = x.$1('off');
      return this.world = {
        width: this.asPt(ext.attr('cx'), 'cm'),
        height: this.asPt(ext.attr('cy'), 'cm'),
        x: this.asPt(offset.attr('x'), 'cm'),
        y: this.asPt(offset.attr('y'), 'cm'),
        rotation: parseInt(x.attr('rot') || 0) / 60000
      };
    }
  }, {
    key: 'solidFill',
    value: function solidFill(x) {
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
    }
  }, {
    key: 'noFill',
    value: function noFill(x) {
      return 1;
    }
  }, {
    key: 'gradFill',
    value: function gradFill(x) {
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
    }
  }, {
    key: 'ln',
    value: function ln(x) {
      if (x.$1('noFill')) return { width: 0 };

      var o = this.asObject(x),
          t;

      (t = x.$1('solidFill')) && (o.color = this.solidFill(t));

      (t = o.w) && (o.width = this.asPt(t, 'cm')) && delete o.w;
      (t = x.$1('prstDash')) && (o.dash = t.attr('val'));
      return o;
    }
  }, {
    key: 'effectLst',
    value: function effectLst(x) {}
  }, {
    key: 'blipFill',
    value: function blipFill(x) {
      return this.wDoc.getRel(x.$1('blip').attr('r:embed'));
    }
  }, {
    key: 'prstGeom',
    value: function prstGeom(x) {
      var px = this.pt2Px,
          w = px(this.world.width),
          h = px(this.world.height);
      switch (x.attr('prst')) {
        case 'leftBrace':
          return { shape: 'path', path: 'M ' + w + ' 0 L 0 ' + h / 2 + ' L ' + w + ' ' + h + ' Z' };
        default:
          return { shape: x.attr('prst') };
      }
    }
  }, {
    key: 'custGeom',
    value: function custGeom(x) {
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
  }], [{
    key: 'naming',
    get: function get() {
      return naming;
    }
  }]);

  return SpProperties;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixXQURvQixPQUNwQixDQUFZLElBQVosRUFBaUI7MEJBREcsU0FDSDs7dUVBREcscUJBRVYsWUFETzs7QUFFaEIsVUFBSyxRQUFMLEdBQWMsSUFBZCxDQUZnQjs7R0FBakI7O2VBRG9COztxQ0FLSjtBQUNmLGFBQU8sSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsS0FBSyxRQUFMLEVBQWMsS0FBSyxJQUFMLEVBQVcsSUFBekQsQ0FBUCxDQURlOzs7O3dDQUdHO0FBQ2xCLGFBQU8sRUFBUCxDQURrQjs7Ozt3QkFHSTtBQUFDLGFBQU8sVUFBUCxDQUFEOzs7O3dCQUVFO0FBQUMsYUFBTyxZQUFQLENBQUQ7Ozs7U0FiTDtFQUFnQixRQUFRLFVBQVI7O2tCQUFoQjs7SUFnQmY7Ozs7Ozs7Ozs7O3NDQUNhLEdBQUU7QUFDbkIsYUFBTyxDQUFDLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxRQUFiLENBQUQsRUFBeUIsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGNBQWIsQ0FBekIsQ0FBUCxDQURtQjs7OzsyQkFHYixHQUFFOztBQUNSLGFBQU8sRUFBQyxPQUFNLEtBQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLElBQVAsQ0FBVixFQUF1QixJQUF2QixDQUFOLEVBQW1DLFFBQU8sS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sSUFBUCxDQUFWLEVBQXVCLElBQXZCLENBQVAsRUFBM0MsQ0FEUTs7OztpQ0FHSSxHQUFFO0FBQ2QsYUFBTyxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWdCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsZUFBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLEVBQVksSUFBWixDQUFQLENBQUQ7T0FBWCxDQUFzQyxJQUF0QyxDQUEyQyxJQUEz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QUFMLENBQVUsR0FBVixDQUFMLEVBQXRCLENBbkJVOzs7O3dCQXpFUTtBQUFDLGFBQU8sTUFBUCxDQUFEOzs7O1NBRGQ7RUFBcUIsZ0JBQU0sVUFBTiIsImZpbGUiOiJkcmF3aW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlJ1xyXHJleHBvcnQgZGVmYXVsdCBjbGFzcyBkcmF3aW5nIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcclx0Y29uc3RydWN0b3Iod1htbCl7XHJcdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXHRcdHRoaXMud0RyYXdpbmc9bnVsbFxyXHR9XHJcdGdldERpcmVjdFN0eWxlKCl7XHJcdFx0cmV0dXJuIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXModGhpcy53RHJhd2luZyx0aGlzLndEb2MsIHRoaXMpXHJcdH1cclx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclx0XHRyZXR1cm4gW11cclx0fVxyXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cclxyXHRzdGF0aWMgZ2V0IFNwUHJvcGVydGllcygpe3JldHVybiBTcFByb3BlcnRpZXN9XHJ9XHJccmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xyXHRfZ2V0VmFsaWRDaGlsZHJlbih0KXtcclx0XHRyZXR1cm4gW3RoaXMud1htbC4kMSgnZXh0ZW50JyksIHRoaXMud1htbC4kMSgnZWZmZWN0RXh0ZW50JyldXHJcdH1cclx0ZXh0ZW50KHgpey8vaW5saW5lIGFuZCBhbmNob3Jcclx0XHRyZXR1cm4ge3dpZHRoOnRoaXMuYXNQdCh4LmF0dHIoJ2N4JyksJ2NtJyksaGVpZ2h0OnRoaXMuYXNQdCh4LmF0dHIoJ2N5JyksJ2NtJyl9XHJcdH1cclx0ZWZmZWN0RXh0ZW50KHgpe1xyXHRcdHJldHVybiB0aGlzLmFzT2JqZWN0KHgsZnVuY3Rpb24oeCl7cmV0dXJuIHRoaXMuYXNQdCh4LCdjbScpfS5iaW5kKHRoaXMpKVxyXHR9XHJcdGRpc3RUKHgpe1xyXHRcdGlmKHg9cGFyc2VJbnQoeC52YWx1ZSkpXHJcdFx0XHRyZXR1cm4gdGhpcy5hc1B0KHgsJ2NtJylcclx0XHRyZXR1cm4gdGhpcy5FTVBUWVxyXHR9XHJcdGRpc3RCKHgpe1xyXHRcdHJldHVybiB0aGlzLmRpc3RUKHgpXHJcdH1cclx0ZGlzdFIoeCl7XHJcdFx0cmV0dXJuIHRoaXMuZGlzdFQoeClcclx0fVxyXHRkaXN0TCh4KXtcclx0XHRyZXR1cm4gdGhpcy5kaXN0VCh4KVxyXHR9XHJ9XHJccnZhciBuYW1pbmc9e1xyXHRcdGN1c3RHZW9tOidwYXRoJyxcclx0XHRwcnN0R2VvbToncGF0aCdcclx0fVxyY2xhc3MgU3BQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcclx0c3RhdGljIGdldCBuYW1pbmcoKXtyZXR1cm4gbmFtaW5nfVxyXHJcdHhmcm0oeCl7XHJcdFx0dmFyIGV4dD14LiQxKCdleHQnKSwgb2Zmc2V0PXguJDEoJ29mZicpXHJcdFx0cmV0dXJuIHRoaXMud29ybGQ9e1xyXHRcdFx0d2lkdGg6dGhpcy5hc1B0KGV4dC5hdHRyKCdjeCcpLCdjbScpLFxyXHRcdFx0aGVpZ2h0OnRoaXMuYXNQdChleHQuYXR0cignY3knKSwnY20nKSxcclx0XHRcdHg6dGhpcy5hc1B0KG9mZnNldC5hdHRyKCd4JyksJ2NtJyksXHJcdFx0XHR5OnRoaXMuYXNQdChvZmZzZXQuYXR0cigneScpLCdjbScpLFxyXHRcdFx0cm90YXRpb246IHBhcnNlSW50KHguYXR0cigncm90Jyl8fDApLzYwMDAwXHJcdFx0fVxyXHR9XHJcdHNvbGlkRmlsbCh4KXtcclx0XHR2YXIgZWxDb2xvcj14LmZpcnN0Q2hpbGQsXHJcdFx0XHRjb2xvcj10aGlzLmFzQ29sb3IoZWxDb2xvci5hdHRyKCd2YWwnKSksIHQ7XHJcclx0XHRpZihjb2xvcj09J3BoQ2xyJylcclx0XHRcdHJldHVybiAncGhDbHInXHJcclx0XHRzd2l0Y2goZWxDb2xvci5sb2NhbE5hbWUpe1xyXHRcdGNhc2UgJ3NjaGVtZUNscic6XHJcdFx0XHRjb2xvcj10aGlzLndEb2MuZ2V0Q29sb3JUaGVtZSgpLmdldChjb2xvcilcclx0XHRcdGJyZWFrXHJcdFx0fVxyXHJcdFx0aWYodD1lbENvbG9yLiQxKCdzaGFkZScpKVxyXHRcdFx0Y29sb3I9dGhpcy5zaGFkZUNvbG9yKGNvbG9yLC0xKnBhcnNlSW50KHQuYXR0cigndmFsJykpLzEwMDApXHJcclx0XHRpZih0PWVsQ29sb3IuJDEoJ2x1bU9mZicpKVxyXHRcdFx0Y29sb3I9dGhpcy5zaGFkZUNvbG9yKGNvbG9yLC0xKnBhcnNlSW50KHQuYXR0cigndmFsJykpLzEwMDApXHJcclx0XHRyZXR1cm4gY29sb3Jcclx0fVxyXHRub0ZpbGwoeCl7XHJcdFx0cmV0dXJuIDFcclx0fVxyXHRncmFkRmlsbCh4KXtcclx0XHR2YXIgdHlwZT14LiQxKCdsaW4scGF0aCcpLCBvPXRoaXMuYXNPYmplY3QodHlwZSksIHN0b3BzPVtdXHJcdFx0Zm9yKHZhciBncz14LiQoJ2dzJyksYSxpPTAsbGVuPWdzLmxlbmd0aDtpPGxlbjtpKyspXHJcdFx0XHRzdG9wcy5wdXNoKHtwb3NpdGlvbjpwYXJzZUludChnc1tpXS5hdHRyKCdwb3MnKSkvMTAwMCwgY29sb3I6dGhpcy5zb2xpZEZpbGwoZ3NbaV0pfSlcclx0XHRvLmFuZyAmJiAoby5hbmdlbD1wYXJzZUludChvLmFuZykvNjAwMDAsIGRlbGV0ZSBvLmFuZyk7XHJcdFx0by5wYXRoICYmIChvLnJlY3Q9dGhpcy5hc09iamVjdCh0eXBlLmZpcnN0Q2hpbGQsICh4KT0+cGFyc2VJbnQoeCkvMTAwMCkpO1xyXHRcdG8ucGF0aD10eXBlLmxvY2FsTmFtZT09J2xpbicgPyAnbGluZWFyJyA6IG8ucGF0aDtcclx0XHRvLnN0b3BzPXN0b3BzXHJcdFx0cmV0dXJuIG9cclx0fVxyXHRsbih4KXtcclx0XHRpZih4LiQxKCdub0ZpbGwnKSlcclx0XHRcdHJldHVybiB7d2lkdGg6MH1cclxyXHRcdHZhciBvPXRoaXMuYXNPYmplY3QoeCksIHQ7XHJcclx0XHQodD14LiQxKCdzb2xpZEZpbGwnKSkgJiYgKG8uY29sb3I9dGhpcy5zb2xpZEZpbGwodCkpO1xyXHJcdFx0KHQ9by53KSAmJiAoby53aWR0aD10aGlzLmFzUHQodCwnY20nKSkgJiYgKGRlbGV0ZSBvLncpO1xyXHRcdCh0PXguJDEoJ3Byc3REYXNoJykpICYmIChvLmRhc2g9dC5hdHRyKCd2YWwnKSk7XHJcdFx0cmV0dXJuIG9cclx0fVxyXHRlZmZlY3RMc3QoeCl7XHJcclx0fVxyXHRibGlwRmlsbCh4KXtcclx0XHRyZXR1cm4gdGhpcy53RG9jLmdldFJlbCh4LiQxKCdibGlwJykuYXR0cigncjplbWJlZCcpKVxyXHR9XHJcdHByc3RHZW9tKHgpe1xyXHRcdHZhciBweD10aGlzLnB0MlB4LCB3PXB4KHRoaXMud29ybGQud2lkdGgpLCBoPXB4KHRoaXMud29ybGQuaGVpZ2h0KTtcclx0XHRzd2l0Y2goeC5hdHRyKCdwcnN0Jykpe1xyXHRcdGNhc2UgJ2xlZnRCcmFjZSc6XHJcdFx0XHRyZXR1cm4ge3NoYXBlOidwYXRoJywgcGF0aDonTSAnK3crJyAwIEwgMCAnK2gvMisnIEwgJyt3KycgJytoKycgWid9XHJcdFx0ZGVmYXVsdDpcclx0XHRcdHJldHVybiB7c2hhcGU6eC5hdHRyKCdwcnN0Jyl9XHJcdFx0fVxyXHR9XHJcdGN1c3RHZW9tKHgpe1xyXHRcdHZhciBwYXRoPVtdLCBweD1mdW5jdGlvbih4KXtyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeCwnY20nKSl9LmJpbmQodGhpcyk7XHJcdFx0Zm9yKHZhciBhLCBjaGlsZHJlbj14LiQxKCdwYXRoJykuY2hpbGROb2RlcywgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcclx0XHRcdGE9Y2hpbGRyZW5baV1cclx0XHRcdHN3aXRjaChhLmxvY2FsTmFtZSl7XHJcdFx0XHRjYXNlICdtb3ZlVG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ00gJytweChhLmZpcnN0Q2hpbGQuYXR0cigneCcpKSsnICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3knKSkpXHJcdFx0XHRcdGJyZWFrXHJcdFx0XHRjYXNlICdsblRvJzpcclx0XHRcdFx0cGF0aC5wdXNoKCdMICcrcHgoYS5maXJzdENoaWxkLmF0dHIoJ3gnKSkrJyAnK3B4KGEuZmlyc3RDaGlsZC5hdHRyKCd5JykpKVxyXHRcdFx0XHRicmVha1xyXHRcdFx0YnJlYWtcclx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxyXHRcdFx0XHRwYXRoLnB1c2goJ0wgJytweChhLmNoaWxkTm9kZXNbMF0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZE5vZGVzWzBdLmF0dHIoJ3knKSkpXHJcdFx0XHRcdHBhdGgucHVzaCgnUSAnK3B4KGEuY2hpbGROb2Rlc1sxXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkTm9kZXNbMV0uYXR0cigneScpKVxyXHRcdFx0XHRcdCsnICcrcHgoYS5jaGlsZE5vZGVzWzJdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGROb2Rlc1syXS5hdHRyKCd5JykpKVxyXHRcdFx0YnJlYWtcclx0XHRcdH1cclx0XHR9XHJcdFx0cmV0dXJuIHtzaGFwZToncGF0aCcsIHBhdGg6cGF0aC5qb2luKCcgJyl9XHJcdH1ccn1cciJdfQ==