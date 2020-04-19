"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

var _drawml = require("./drawml");

var _drawml2 = _interopRequireDefault(_drawml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Part) {
  _inherits(_class, _Part);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: "_init",
    value: function _init() {
      var _this2 = this;

      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).apply(this, arguments);
      this._assignRel(["theme"]);

      var doc = this.doc;
      var transform = function transform(ph) {
        return _extends({}, (0, _drawml2.default)(_this2), {
          tidy_schemeClr: function tidy_schemeClr(_ref) {
            var val = _ref.val,
                effect = _objectWithoutProperties(_ref, ["val"]);

            return _this2.doc.asColor(val == "phClr" ? ph.color : _this2.theme.color(val), effect);
          }
        });
      };

      if (!this.theme) {
        return;
      }

      Object.assign(this.theme, {
        font: function font(typeface) {
          var type = { mn: "minor", mj: "major" };

          var _typeface$split$filte = typeface.split(/[+-]/g).filter(function (a) {
            return a;
          }),
              _typeface$split$filte2 = _slicedToArray(_typeface$split$filte, 2),
              a = _typeface$split$filte2[0],
              b = _typeface$split$filte2[1];

          return this("a\\:fontScheme>a\\:" + type[a] + "Font>a\\:" + (b == "lt" ? "latin" : b)).attr("typeface");
        },
        color: function color(k) {
          var $ = this("a\\:clrScheme>a\\:" + k).children().eq(0);
          return doc.asColor($.attr("lastClr") || $.attr("val"));
        },
        fillRef: function fillRef(idx, ph) {
          idx = parseInt(idx);
          if (idx == 0 || idx == 1000) return {};
          if (idx > 1000) return this("a\\:fmtScheme>a\\:bgFillStyleLst").children().eq(idx - 1001).props(transform(ph));

          return this("a\\:fmtScheme>a\\:fillStyleLst").children().eq(idx - 1).props(transform(ph));
        },
        lnRef: function lnRef(idx, ph) {
          return this("a\\:fmtScheme>a\\:lnStyleLst").children().eq(parseInt(idx) - 1).props(transform(ph));
        },
        effectRef: function effectRef(idx, ph) {
          return this("a\\:fmtScheme>a\\:effectStyleLst").children().eq(parseInt(idx) - 1).children("a\\:effectLst").props(transform(ph));
        },
        fontRef: function fontRef(idx, ph) {
          var $ = this("a\\:fmtScheme>a\\:fontScheme>a\\:" + idx + "Font");
          var latin = $.children("a\\:latin");
          var ea = $.children("a\\:ea");
          var cs = $.children("a\\:cs");
          return _extends({
            latin: latin.attr("typeface"),
            ea: ea.attr("typeface"),
            cs: cs.attr("typeface")
          }, ph);
        }
      });
    }
  }, {
    key: "_assignRel",
    value: function _assignRel(supported) {
      var _this3 = this;

      this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
        var $ = _this3.rels(rel);
        var type = $.attr("Type").split("/").pop();

        if (supported.indexOf(type) != -1) {
          (function () {
            var target = $.attr("Target");
            Object.defineProperty(_this3, type, {
              configurable: true,
              get: function get() {
                return this.getRelObject(target.replace(/^\//, ""));
              }
            });
          })();
        }
      });
    }
  }, {
    key: "render",
    value: function render(createElement) {
      var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);
    }
  }], [{
    key: "identify",
    value: function identify(wXml, officeDocument) {
      var identities = this.identities;
      var tag = wXml.name.split(":").pop();
      if (identities[tag]) return identities[tag].apply(identities, arguments);

      return tag;
    }
  }]);

  return _class;
}(_part2.default);

_class.identities = {};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIl9hc3NpZ25SZWwiLCJkb2MiLCJ0cmFuc2Zvcm0iLCJwaCIsInRpZHlfc2NoZW1lQ2xyIiwidmFsIiwiZWZmZWN0IiwiYXNDb2xvciIsImNvbG9yIiwidGhlbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJmb250IiwidHlwZWZhY2UiLCJ0eXBlIiwibW4iLCJtaiIsInNwbGl0IiwiZmlsdGVyIiwiYSIsImIiLCJhdHRyIiwiayIsIiQiLCJjaGlsZHJlbiIsImVxIiwiZmlsbFJlZiIsImlkeCIsInBhcnNlSW50IiwicHJvcHMiLCJsblJlZiIsImVmZmVjdFJlZiIsImZvbnRSZWYiLCJsYXRpbiIsImVhIiwiY3MiLCJzdXBwb3J0ZWQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJnZXQiLCJnZXRSZWxPYmplY3QiLCJyZXBsYWNlIiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwiY29uc3RydWN0b3IiLCJiaW5kIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiaWRlbnRpdGllcyIsInRhZyIsIm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFFVTtBQUFBOztBQUNOLDZHQUFlQSxTQUFmO0FBQ0EsV0FBS0MsVUFBTCxDQUFnQixDQUFDLE9BQUQsQ0FBaEI7O0FBRUEsVUFBTUMsTUFBTSxLQUFLQSxHQUFqQjtBQUNBLFVBQU1DLFlBQVksU0FBWkEsU0FBWSxDQUFDQyxFQUFEO0FBQUEsNEJBQ2IsNkJBRGE7QUFFaEJDLDBCQUFnQiw4QkFBd0I7QUFBQSxnQkFBckJDLEdBQXFCLFFBQXJCQSxHQUFxQjtBQUFBLGdCQUFiQyxNQUFhOztBQUN0QyxtQkFBTyxPQUFLTCxHQUFMLENBQVNNLE9BQVQsQ0FDTEYsT0FBTyxPQUFQLEdBQWlCRixHQUFHSyxLQUFwQixHQUE0QixPQUFLQyxLQUFMLENBQVdELEtBQVgsQ0FBaUJILEdBQWpCLENBRHZCLEVBRUxDLE1BRkssQ0FBUDtBQUlEO0FBUGU7QUFBQSxPQUFsQjs7QUFVQSxVQUFJLENBQUMsS0FBS0csS0FBVixFQUFpQjtBQUNmO0FBQ0Q7O0FBRURDLGFBQU9DLE1BQVAsQ0FBYyxLQUFLRixLQUFuQixFQUEwQjtBQUN4QkcsWUFEd0IsZ0JBQ25CQyxRQURtQixFQUNUO0FBQ2IsY0FBTUMsT0FBTyxFQUFFQyxJQUFJLE9BQU4sRUFBZUMsSUFBSSxPQUFuQixFQUFiOztBQURhLHNDQUVFSCxTQUFTSSxLQUFULENBQWUsT0FBZixFQUF3QkMsTUFBeEIsQ0FBK0IsVUFBQ0MsQ0FBRDtBQUFBLG1CQUFPQSxDQUFQO0FBQUEsV0FBL0IsQ0FGRjtBQUFBO0FBQUEsY0FFTkEsQ0FGTTtBQUFBLGNBRUhDLENBRkc7O0FBR2IsaUJBQU8sNkJBQ2lCTixLQUFLSyxDQUFMLENBRGpCLGtCQUNvQ0MsS0FBSyxJQUFMLEdBQVksT0FBWixHQUFzQkEsQ0FEMUQsR0FFTEMsSUFGSyxDQUVBLFVBRkEsQ0FBUDtBQUdELFNBUHVCO0FBUXhCYixhQVJ3QixpQkFRbEJjLENBUmtCLEVBUWY7QUFDUCxjQUFNQyxJQUFJLDRCQUEwQkQsQ0FBMUIsRUFBK0JFLFFBQS9CLEdBQTBDQyxFQUExQyxDQUE2QyxDQUE3QyxDQUFWO0FBQ0EsaUJBQU94QixJQUFJTSxPQUFKLENBQVlnQixFQUFFRixJQUFGLENBQU8sU0FBUCxLQUFxQkUsRUFBRUYsSUFBRixDQUFPLEtBQVAsQ0FBakMsQ0FBUDtBQUNELFNBWHVCO0FBYXhCSyxlQWJ3QixtQkFhaEJDLEdBYmdCLEVBYVh4QixFQWJXLEVBYVA7QUFDZndCLGdCQUFNQyxTQUFTRCxHQUFULENBQU47QUFDQSxjQUFJQSxPQUFPLENBQVAsSUFBWUEsT0FBTyxJQUF2QixFQUE2QixPQUFPLEVBQVA7QUFDN0IsY0FBSUEsTUFBTSxJQUFWLEVBQ0UsT0FBTyxLQUFLLGtDQUFMLEVBQ0pILFFBREksR0FFSkMsRUFGSSxDQUVERSxNQUFNLElBRkwsRUFHSkUsS0FISSxDQUdFM0IsVUFBVUMsRUFBVixDQUhGLENBQVA7O0FBS0YsaUJBQU8sS0FBSyxnQ0FBTCxFQUNKcUIsUUFESSxHQUVKQyxFQUZJLENBRURFLE1BQU0sQ0FGTCxFQUdKRSxLQUhJLENBR0UzQixVQUFVQyxFQUFWLENBSEYsQ0FBUDtBQUlELFNBMUJ1QjtBQTRCeEIyQixhQTVCd0IsaUJBNEJsQkgsR0E1QmtCLEVBNEJieEIsRUE1QmEsRUE0QlQ7QUFDYixpQkFBTyxLQUFLLDhCQUFMLEVBQ0pxQixRQURJLEdBRUpDLEVBRkksQ0FFREcsU0FBU0QsR0FBVCxJQUFnQixDQUZmLEVBR0pFLEtBSEksQ0FHRTNCLFVBQVVDLEVBQVYsQ0FIRixDQUFQO0FBSUQsU0FqQ3VCO0FBbUN4QjRCLGlCQW5Dd0IscUJBbUNkSixHQW5DYyxFQW1DVHhCLEVBbkNTLEVBbUNMO0FBQ2pCLGlCQUFPLEtBQUssa0NBQUwsRUFDSnFCLFFBREksR0FFSkMsRUFGSSxDQUVERyxTQUFTRCxHQUFULElBQWdCLENBRmYsRUFHSkgsUUFISSxDQUdLLGVBSEwsRUFJSkssS0FKSSxDQUlFM0IsVUFBVUMsRUFBVixDQUpGLENBQVA7QUFLRCxTQXpDdUI7QUEyQ3hCNkIsZUEzQ3dCLG1CQTJDaEJMLEdBM0NnQixFQTJDWHhCLEVBM0NXLEVBMkNQO0FBQ2YsY0FBTW9CLElBQUksS0FBSyxzQ0FBc0NJLEdBQXRDLEdBQTRDLE1BQWpELENBQVY7QUFDQSxjQUFNTSxRQUFRVixFQUFFQyxRQUFGLENBQVcsV0FBWCxDQUFkO0FBQ0EsY0FBTVUsS0FBS1gsRUFBRUMsUUFBRixDQUFXLFFBQVgsQ0FBWDtBQUNBLGNBQU1XLEtBQUtaLEVBQUVDLFFBQUYsQ0FBVyxRQUFYLENBQVg7QUFDQTtBQUNFUyxtQkFBT0EsTUFBTVosSUFBTixDQUFXLFVBQVgsQ0FEVDtBQUVFYSxnQkFBSUEsR0FBR2IsSUFBSCxDQUFRLFVBQVIsQ0FGTjtBQUdFYyxnQkFBSUEsR0FBR2QsSUFBSCxDQUFRLFVBQVI7QUFITixhQUlLbEIsRUFKTDtBQU1EO0FBdER1QixPQUExQjtBQXdERDs7OytCQUVVaUMsUyxFQUFXO0FBQUE7O0FBQ3BCLFdBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUlDLEdBQUosRUFBWTtBQUN6RCxZQUFJakIsSUFBSSxPQUFLYyxJQUFMLENBQVVHLEdBQVYsQ0FBUjtBQUNBLFlBQUkxQixPQUFPUyxFQUFFRixJQUFGLENBQU8sTUFBUCxFQUFlSixLQUFmLENBQXFCLEdBQXJCLEVBQTBCd0IsR0FBMUIsRUFBWDs7QUFFQSxZQUFJTCxVQUFVTSxPQUFWLENBQWtCNUIsSUFBbEIsS0FBMkIsQ0FBQyxDQUFoQyxFQUFtQztBQUFBO0FBQ2pDLGdCQUFJNkIsU0FBU3BCLEVBQUVGLElBQUYsQ0FBTyxRQUFQLENBQWI7QUFDQVgsbUJBQU9rQyxjQUFQLFNBQTRCOUIsSUFBNUIsRUFBa0M7QUFDaEMrQiw0QkFBYyxJQURrQjtBQUVoQ0MsaUJBRmdDLGlCQUUxQjtBQUNKLHVCQUFPLEtBQUtDLFlBQUwsQ0FBa0JKLE9BQU9LLE9BQVAsQ0FBZSxLQUFmLEVBQXNCLEVBQXRCLENBQWxCLENBQVA7QUFDRDtBQUorQixhQUFsQztBQUZpQztBQVFsQztBQUNGLE9BYkQ7QUFjRDs7OzJCQUdDQyxhLEVBRUE7QUFBQSxVQURBQyxRQUNBLHVFQURXLEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxDQUNYO0FBQUU7Ozs2QkFFWUUsSSxFQUFNQyxjLEVBQWdCO0FBQ3BDLFVBQU1DLGFBQWEsS0FBS0EsVUFBeEI7QUFDQSxVQUFNQyxNQUFNSCxLQUFLSSxJQUFMLENBQVV4QyxLQUFWLENBQWdCLEdBQWhCLEVBQXFCd0IsR0FBckIsRUFBWjtBQUNBLFVBQUljLFdBQVdDLEdBQVgsQ0FBSixFQUFxQixPQUFPRCxXQUFXQyxHQUFYLG9CQUFtQnpELFNBQW5CLENBQVA7O0FBRXJCLGFBQU95RCxHQUFQO0FBQ0Q7Ozs7OztPQUVNRCxVLEdBQWEsRSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuL3BhcnRcIjtcbmltcG9ydCBkcmF3bWwgZnJvbSBcIi4vZHJhd21sXCI7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnQge1xuICBfaW5pdCgpIHtcbiAgICBzdXBlci5faW5pdCguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMuX2Fzc2lnblJlbChbXCJ0aGVtZVwiXSk7XG5cbiAgICBjb25zdCBkb2MgPSB0aGlzLmRvYztcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSAocGgpID0+ICh7XG4gICAgICAuLi5kcmF3bWwodGhpcyksXG4gICAgICB0aWR5X3NjaGVtZUNscjogKHsgdmFsLCAuLi5lZmZlY3QgfSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuYXNDb2xvcihcbiAgICAgICAgICB2YWwgPT0gXCJwaENsclwiID8gcGguY29sb3IgOiB0aGlzLnRoZW1lLmNvbG9yKHZhbCksXG4gICAgICAgICAgZWZmZWN0XG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKCF0aGlzLnRoZW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnRoZW1lLCB7XG4gICAgICBmb250KHR5cGVmYWNlKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB7IG1uOiBcIm1pbm9yXCIsIG1qOiBcIm1ham9yXCIgfTtcbiAgICAgICAgY29uc3QgW2EsIGJdID0gdHlwZWZhY2Uuc3BsaXQoL1srLV0vZykuZmlsdGVyKChhKSA9PiBhKTtcbiAgICAgICAgcmV0dXJuIHRoaXMoXG4gICAgICAgICAgYGFcXFxcOmZvbnRTY2hlbWU+YVxcXFw6JHt0eXBlW2FdfUZvbnQ+YVxcXFw6JHtiID09IFwibHRcIiA/IFwibGF0aW5cIiA6IGJ9YFxuICAgICAgICApLmF0dHIoXCJ0eXBlZmFjZVwiKTtcbiAgICAgIH0sXG4gICAgICBjb2xvcihrKSB7XG4gICAgICAgIGNvbnN0ICQgPSB0aGlzKGBhXFxcXDpjbHJTY2hlbWU+YVxcXFw6JHtrfWApLmNoaWxkcmVuKCkuZXEoMCk7XG4gICAgICAgIHJldHVybiBkb2MuYXNDb2xvcigkLmF0dHIoXCJsYXN0Q2xyXCIpIHx8ICQuYXR0cihcInZhbFwiKSk7XG4gICAgICB9LFxuXG4gICAgICBmaWxsUmVmKGlkeCwgcGgpIHtcbiAgICAgICAgaWR4ID0gcGFyc2VJbnQoaWR4KTtcbiAgICAgICAgaWYgKGlkeCA9PSAwIHx8IGlkeCA9PSAxMDAwKSByZXR1cm4ge307XG4gICAgICAgIGlmIChpZHggPiAxMDAwKVxuICAgICAgICAgIHJldHVybiB0aGlzKFwiYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmJnRmlsbFN0eWxlTHN0XCIpXG4gICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgLmVxKGlkeCAtIDEwMDEpXG4gICAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMoXCJhXFxcXDpmbXRTY2hlbWU+YVxcXFw6ZmlsbFN0eWxlTHN0XCIpXG4gICAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgICAuZXEoaWR4IC0gMSlcbiAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSk7XG4gICAgICB9LFxuXG4gICAgICBsblJlZihpZHgsIHBoKSB7XG4gICAgICAgIHJldHVybiB0aGlzKFwiYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmxuU3R5bGVMc3RcIilcbiAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgIC5lcShwYXJzZUludChpZHgpIC0gMSlcbiAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSk7XG4gICAgICB9LFxuXG4gICAgICBlZmZlY3RSZWYoaWR4LCBwaCkge1xuICAgICAgICByZXR1cm4gdGhpcyhcImFcXFxcOmZtdFNjaGVtZT5hXFxcXDplZmZlY3RTdHlsZUxzdFwiKVxuICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgLmVxKHBhcnNlSW50KGlkeCkgLSAxKVxuICAgICAgICAgIC5jaGlsZHJlbihcImFcXFxcOmVmZmVjdExzdFwiKVxuICAgICAgICAgIC5wcm9wcyh0cmFuc2Zvcm0ocGgpKTtcbiAgICAgIH0sXG5cbiAgICAgIGZvbnRSZWYoaWR4LCBwaCkge1xuICAgICAgICBjb25zdCAkID0gdGhpcyhcImFcXFxcOmZtdFNjaGVtZT5hXFxcXDpmb250U2NoZW1lPmFcXFxcOlwiICsgaWR4ICsgXCJGb250XCIpO1xuICAgICAgICBjb25zdCBsYXRpbiA9ICQuY2hpbGRyZW4oXCJhXFxcXDpsYXRpblwiKTtcbiAgICAgICAgY29uc3QgZWEgPSAkLmNoaWxkcmVuKFwiYVxcXFw6ZWFcIik7XG4gICAgICAgIGNvbnN0IGNzID0gJC5jaGlsZHJlbihcImFcXFxcOmNzXCIpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGxhdGluOiBsYXRpbi5hdHRyKFwidHlwZWZhY2VcIiksXG4gICAgICAgICAgZWE6IGVhLmF0dHIoXCJ0eXBlZmFjZVwiKSxcbiAgICAgICAgICBjczogY3MuYXR0cihcInR5cGVmYWNlXCIpLFxuICAgICAgICAgIC4uLnBoLFxuICAgICAgICB9O1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIF9hc3NpZ25SZWwoc3VwcG9ydGVkKSB7XG4gICAgdGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLCByZWwpID0+IHtcbiAgICAgIGxldCAkID0gdGhpcy5yZWxzKHJlbCk7XG4gICAgICBsZXQgdHlwZSA9ICQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpO1xuXG4gICAgICBpZiAoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkgIT0gLTEpIHtcbiAgICAgICAgbGV0IHRhcmdldCA9ICQuYXR0cihcIlRhcmdldFwiKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIHR5cGUsIHtcbiAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldC5yZXBsYWNlKC9eXFwvLywgXCJcIikpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVuZGVyKFxuICAgIGNyZWF0ZUVsZW1lbnQsXG4gICAgaWRlbnRpZnkgPSB0aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3RvcilcbiAgKSB7fVxuXG4gIHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCkge1xuICAgIGNvbnN0IGlkZW50aXRpZXMgPSB0aGlzLmlkZW50aXRpZXM7XG4gICAgY29uc3QgdGFnID0gd1htbC5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKTtcbiAgICBpZiAoaWRlbnRpdGllc1t0YWddKSByZXR1cm4gaWRlbnRpdGllc1t0YWddKC4uLmFyZ3VtZW50cyk7XG5cbiAgICByZXR1cm4gdGFnO1xuICB9XG5cbiAgc3RhdGljIGlkZW50aXRpZXMgPSB7fTtcbn1cbiJdfQ==