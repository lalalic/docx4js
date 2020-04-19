"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

var _color = require("color");

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
  _inherits(_class, _Base);

  function _class() {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));

    _this.main = new _part2.default("", _this);
    _this.officeDocument = new _this.constructor.OfficeDocument(_this.main.getRelTarget("officeDocument").replace(/^\//, ""), _this);
    return _this;
  }

  _createClass(_class, [{
    key: "render",
    value: function render() {
      var _officeDocument;

      return (_officeDocument = this.officeDocument).render.apply(_officeDocument, arguments);
    }
  }, {
    key: "parse",
    value: function parse() {
      var _officeDocument2;

      return (_officeDocument2 = this.officeDocument).parse.apply(_officeDocument2, arguments);
    }
  }, {
    key: "dxa2Px",
    value: function dxa2Px(a) {
      return this.pt2Px(parseInt(a) / 20.0);
    }
  }, {
    key: "emu2Px",
    value: function emu2Px(a) {
      return this.pt2Px(parseInt(a) / 12700);
    }
  }, {
    key: "pt2Px",
    value: function pt2Px(pt) {
      return Math.ceil(pt * 96 / 72);
    }
  }, {
    key: "cm2Px",
    value: function cm2Px(cm) {
      return this.pt2Px(parseInt(cm) * 28.3464567 / 360000);
    }
  }, {
    key: "asColor",
    value: function asColor(v, transform) {
      if (!v || v.length == 0 || v == "auto") return "#000000";
      v = v.split(" ")[0];
      var rgb = v.charAt(0) == "#" ? v : RGB.test(v) ? "#" + v : v;
      if (transform) {
        var lumMod = transform.lumMod,
            lumOff = transform.lumOff,
            tint = transform.tint,
            shade = transform.shade;

        if (lumMod || lumOff || tint) {
          var color = (0, _color2.default)(rgb);

          if (tint != undefined) {
            color = color.lighten(1 - tint);
          }

          if (lumMod != undefined) {
            color = color.lighten(lumMod);
          }

          if (lumOff != undefined) {
            color = color.darken(lumOff);
          }

          if (shade != undefined) {
            color = color.red(color.red() * (1 + shade)).green(color.green() * (1 + shade)).blue(color.blue() * (1 + shade));
          }

          return ("" + color.hex()).replace(/^0x/, "#");
        }
      }
      return rgb;
    }
  }, {
    key: "toPx",
    value: function toPx(length) {
      var value = parseFloat(length),
          units = String(length).match(RE_LENGTH_UNIT)[2];

      switch (units) {
        case "em":
          return value * 16;
        case "rem":
          return value * 16;
        case "cm":
          return value * 96 / 2.54;
        case "mm":
          return value * 96 / 2.54 / 10;
        case "in":
          return value * 96;
        case "pt":
          return value * 72;
        case "pc":
          return value * 72 / 12;
        default:
          return value;
      }
    }
  }, {
    key: "vender",
    get: function get() {
      "Microsoft";
    }
  }, {
    key: "product",
    get: function get() {
      return "Office 2010";
    }
  }, {
    key: "contentTypes",
    get: function get() {
      return this.getObjectPart("[Content_Types].xml")("Types");
    }
  }]);

  return _class;
}(_document2.default);

_class.OfficeDocument = _part2.default;
exports.default = _class;

var RGB = /([a-fA-F0-9]{2}?){3}?/;
var RE_LENGTH_UNIT = /^(\d+)(\w)+$/;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIm1haW4iLCJvZmZpY2VEb2N1bWVudCIsImNvbnN0cnVjdG9yIiwiT2ZmaWNlRG9jdW1lbnQiLCJnZXRSZWxUYXJnZXQiLCJyZXBsYWNlIiwicmVuZGVyIiwicGFyc2UiLCJhIiwicHQyUHgiLCJwYXJzZUludCIsInB0IiwiTWF0aCIsImNlaWwiLCJjbSIsInYiLCJ0cmFuc2Zvcm0iLCJsZW5ndGgiLCJzcGxpdCIsInJnYiIsImNoYXJBdCIsIlJHQiIsInRlc3QiLCJsdW1Nb2QiLCJsdW1PZmYiLCJ0aW50Iiwic2hhZGUiLCJjb2xvciIsInVuZGVmaW5lZCIsImxpZ2h0ZW4iLCJkYXJrZW4iLCJyZWQiLCJncmVlbiIsImJsdWUiLCJoZXgiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJ1bml0cyIsIlN0cmluZyIsIm1hdGNoIiwiUkVfTEVOR1RIX1VOSVQiLCJnZXRPYmplY3RQYXJ0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0Usb0JBQWM7QUFBQTs7QUFBQSxpSEFDSEEsU0FERzs7QUFFWixVQUFLQyxJQUFMLEdBQVksbUJBQVMsRUFBVCxRQUFaO0FBQ0EsVUFBS0MsY0FBTCxHQUFzQixJQUFJLE1BQUtDLFdBQUwsQ0FBaUJDLGNBQXJCLENBQ3BCLE1BQUtILElBQUwsQ0FBVUksWUFBVixDQUF1QixnQkFBdkIsRUFBeUNDLE9BQXpDLENBQWlELEtBQWpELEVBQXdELEVBQXhELENBRG9CLFFBQXRCO0FBSFk7QUFPYjs7Ozs2QkFhUTtBQUFBOztBQUNQLGFBQU8sd0JBQUtKLGNBQUwsRUFBb0JLLE1BQXBCLHdCQUE4QlAsU0FBOUIsQ0FBUDtBQUNEOzs7NEJBRU87QUFBQTs7QUFDTixhQUFPLHlCQUFLRSxjQUFMLEVBQW9CTSxLQUFwQix5QkFBNkJSLFNBQTdCLENBQVA7QUFDRDs7OzJCQUVNUyxDLEVB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UUEsUUFBUSxFQUFULEdBQWUsRUFBdEI7QUFDRjtBQUNFLGlCQUFPQSxLQUFQO0FBaEJKO0FBa0JEOzs7d0JBNUZZO0FBQ1g7QUFDRDs7O3dCQUVhO0FBQ1osYUFBTyxhQUFQO0FBQ0Q7Ozt3QkFFa0I7QUFDakIsYUFBTyxLQUFLTSxhQUFMLENBQW1CLHFCQUFuQixFQUEwQyxPQUExQyxDQUFQO0FBQ0Q7Ozs7OztPQW9GTXRDLGM7OztBQUVULElBQU1rQixNQUFNLHVCQUFaO0FBQ0EsSUFBTW1CLGlCQUFpQixjQUF2QiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiO1xuaW1wb3J0IFBhcnQgZnJvbSBcIi4vcGFydFwiO1xuaW1wb3J0IENvbG9yIGZyb20gXCJjb2xvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMubWFpbiA9IG5ldyBQYXJ0KFwiXCIsIHRoaXMpO1xuICAgIHRoaXMub2ZmaWNlRG9jdW1lbnQgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudChcbiAgICAgIHRoaXMubWFpbi5nZXRSZWxUYXJnZXQoXCJvZmZpY2VEb2N1bWVudFwiKS5yZXBsYWNlKC9eXFwvLywgXCJcIiksXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfVxuICBnZXQgdmVuZGVyKCkge1xuICAgIFwiTWljcm9zb2Z0XCI7XG4gIH1cblxuICBnZXQgcHJvZHVjdCgpIHtcbiAgICByZXR1cm4gXCJPZmZpY2UgMjAxMFwiO1xuICB9XG5cbiAgZ2V0IGNvbnRlbnRUeXBlcygpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRPYmplY3RQYXJ0KFwiW0NvbnRlbnRfVHlwZXNdLnhtbFwiKShcIlR5cGVzXCIpO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLm9mZmljZURvY3VtZW50LnJlbmRlciguLi5hcmd1bWVudHMpO1xuICB9XG5cbiAgcGFyc2UoKSB7XG4gICAgcmV0dXJuIHRoaXMub2ZmaWNlRG9jdW1lbnQucGFyc2UoLi4uYXJndW1lbnRzKTtcbiAgfVxuXG4gIGR4YTJQeChhKSB7XG4gICAgcmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoYSkgLyAyMC4wKTtcbiAgfVxuXG4gIGVtdTJQeChhKSB7XG4gICAgcmV0dXJuIHRoaXMucHQyUHgocGFyc2VJbnQoYSkgLyAxMjcwMCk7XG4gIH1cblxuICBwdDJQeChwdCkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKHB0ICogOTYpIC8gNzIpO1xuICB9XG5cbiAgY20yUHgoY20pIHtcbiAgICByZXR1cm4gdGhpcy5wdDJQeCgocGFyc2VJbnQoY20pICogMjguMzQ2NDU2NykgLyAzNjAwMDApO1xuICB9XG5cbiAgYXNDb2xvcih2LCB0cmFuc2Zvcm0pIHtcbiAgICBpZiAoIXYgfHwgdi5sZW5ndGggPT0gMCB8fCB2ID09IFwiYXV0b1wiKSByZXR1cm4gXCIjMDAwMDAwXCI7XG4gICAgdiA9IHYuc3BsaXQoXCIgXCIpWzBdO1xuICAgIGNvbnN0IHJnYiA9IHYuY2hhckF0KDApID09IFwiI1wiID8gdiA6IFJHQi50ZXN0KHYpID8gXCIjXCIgKyB2IDogdjtcbiAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICBjb25zdCB7IGx1bU1vZCwgbHVtT2ZmLCB0aW50LCBzaGFkZSB9ID0gdHJhbnNmb3JtO1xuICAgICAgaWYgKGx1bU1vZCB8fCBsdW1PZmYgfHwgdGludCkge1xuICAgICAgICBsZXQgY29sb3IgPSBDb2xvcihyZ2IpO1xuXG4gICAgICAgIGlmICh0aW50ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbG9yID0gY29sb3IubGlnaHRlbigxIC0gdGludCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobHVtTW9kICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbG9yID0gY29sb3IubGlnaHRlbihsdW1Nb2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGx1bU9mZiAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb2xvciA9IGNvbG9yLmRhcmtlbihsdW1PZmYpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNoYWRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGNvbG9yID0gY29sb3JcbiAgICAgICAgICAgIC5yZWQoY29sb3IucmVkKCkgKiAoMSArIHNoYWRlKSlcbiAgICAgICAgICAgIC5ncmVlbihjb2xvci5ncmVlbigpICogKDEgKyBzaGFkZSkpXG4gICAgICAgICAgICAuYmx1ZShjb2xvci5ibHVlKCkgKiAoMSArIHNoYWRlKSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYCR7Y29sb3IuaGV4KCl9YC5yZXBsYWNlKC9eMHgvLCBcIiNcIik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZ2I7XG4gIH1cblxuICB0b1B4KGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IHBhcnNlRmxvYXQobGVuZ3RoKSxcbiAgICAgIHVuaXRzID0gU3RyaW5nKGxlbmd0aCkubWF0Y2goUkVfTEVOR1RIX1VOSVQpWzJdO1xuXG4gICAgc3dpdGNoICh1bml0cykge1xuICAgICAgY2FzZSBcImVtXCI6XG4gICAgICAgIHJldHVybiB2YWx1ZSAqIDE2O1xuICAgICAgY2FzZSBcInJlbVwiOlxuICAgICAgICByZXR1cm4gdmFsdWUgKiAxNjtcbiAgICAgIGNhc2UgXCJjbVwiOlxuICAgICAgICByZXR1cm4gKHZhbHVlICogOTYpIC8gMi41NDtcbiAgICAgIGNhc2UgXCJtbVwiOlxuICAgICAgICByZXR1cm4gKHZhbHVlICogOTYpIC8gMi41NCAvIDEwO1xuICAgICAgY2FzZSBcImluXCI6XG4gICAgICAgIHJldHVybiB2YWx1ZSAqIDk2O1xuICAgICAgY2FzZSBcInB0XCI6XG4gICAgICAgIHJldHVybiB2YWx1ZSAqIDcyO1xuICAgICAgY2FzZSBcInBjXCI6XG4gICAgICAgIHJldHVybiAodmFsdWUgKiA3MikgLyAxMjtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgT2ZmaWNlRG9jdW1lbnQgPSBQYXJ0O1xufVxuY29uc3QgUkdCID0gLyhbYS1mQS1GMC05XXsyfT8pezN9Py87XG5jb25zdCBSRV9MRU5HVEhfVU5JVCA9IC9eKFxcZCspKFxcdykrJC87XG4iXX0=