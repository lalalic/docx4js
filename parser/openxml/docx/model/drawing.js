'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var drawing = (function (_require) {
  _inherits(drawing, _require);

  function drawing(wXml) {
    _classCallCheck(this, drawing);

    _get(Object.getPrototypeOf(drawing.prototype), 'constructor', this).apply(this, arguments);
    this.wDrawing = null;
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
})(require('../model'));

exports['default'] = drawing;

var Properties = (function (_Style$Properties) {
  _inherits(Properties, _Style$Properties);

  function Properties() {
    _classCallCheck(this, Properties);

    _get(Object.getPrototypeOf(Properties.prototype), 'constructor', this).apply(this, arguments);
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
      return this.asObject(x, (function (x) {
        return this.asPt(x, 'cm');
      }).bind(this));
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
})(_style2['default'].Properties);

var naming = {
  custGeom: 'path',
  prstGeom: 'path'
};

var SpProperties = (function (_Style$Properties2) {
  _inherits(SpProperties, _Style$Properties2);

  function SpProperties() {
    _classCallCheck(this, SpProperties);

    _get(Object.getPrototypeOf(SpProperties.prototype), 'constructor', this).apply(this, arguments);
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
      for (var gs = x.$('gs'), a, i = 0, len = gs.length; i < len; i++) stops.push({ position: parseInt(gs[i].attr('pos')) / 1000, color: this.solidFill(gs[i]) });
      o.ang && (o.angel = parseInt(o.ang) / 60000, delete o.ang);
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
          px = (function (x) {
        return this.pt2Px(this.asPt(x, 'cm'));
      }).bind(this);
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
})(_style2['default'].Properties);

module.exports = exports['default'];
//# sourceMappingURL=drawing.js.map