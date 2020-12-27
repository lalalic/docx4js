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

            Object.assign(this.theme, {
                font: function font(typeface) {
                    var type = { mn: "minor", mj: "major" };

                    var _typeface$split$filte = typeface.split(/[+-]/g).filter(function (a) {
                        return a;
                    }),
                        _typeface$split$filte2 = _slicedToArray(_typeface$split$filte, 2),
                        a = _typeface$split$filte2[0],
                        b = _typeface$split$filte2[1];

                    if (a && b) return this("a\\:fontScheme>a\\:" + type[a] + "Font>a\\:" + (b == "lt" ? "latin" : b)).attr("typeface");
                    return typeface;
                },
                color: function color(k) {
                    var $ = this("a\\:clrScheme>a\\:" + k).children().eq(0);
                    return doc.asColor($.attr("lastClr") || $.attr("val"));
                },
                fillRef: function fillRef(idx, ph) {
                    idx = parseInt(idx);
                    if (idx == 0 || idx == 1000) return {};
                    if (idx > 1000) return this('a\\:fmtScheme>a\\:bgFillStyleLst').children().eq(idx - 1001).props(transform(ph));

                    return this('a\\:fmtScheme>a\\:fillStyleLst').children().eq(idx - 1).props(transform(ph));
                },
                lnRef: function lnRef(idx, ph) {
                    return this('a\\:fmtScheme>a\\:lnStyleLst').children().eq(parseInt(idx) - 1).props(transform(ph));
                },
                effectRef: function effectRef(idx, ph) {
                    return this('a\\:fmtScheme>a\\:effectStyleLst').children().eq(parseInt(idx) - 1).children('a\\:effectLst').props(transform(ph));
                },
                fontRef: function fontRef(idx, ph) {
                    var $ = this('a\\:fmtScheme>a\\:fontScheme>a\\:' + idx + 'Font');
                    var latin = $.children('a\\:latin');
                    var ea = $.children('a\\:ea');
                    var cs = $.children('a\\:cs');
                    return _extends({ latin: latin.attr("typeface"), ea: ea.attr('typeface'), cs: cs.attr("typeface") }, ph);
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
                                return this.getRelObject(target);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIl9hc3NpZ25SZWwiLCJkb2MiLCJ0cmFuc2Zvcm0iLCJ0aWR5X3NjaGVtZUNsciIsInZhbCIsImVmZmVjdCIsImFzQ29sb3IiLCJwaCIsImNvbG9yIiwidGhlbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJmb250IiwidHlwZWZhY2UiLCJ0eXBlIiwibW4iLCJtaiIsInNwbGl0IiwiZmlsdGVyIiwiYSIsImIiLCJhdHRyIiwiayIsIiQiLCJjaGlsZHJlbiIsImVxIiwiZmlsbFJlZiIsImlkeCIsInBhcnNlSW50IiwicHJvcHMiLCJsblJlZiIsImVmZmVjdFJlZiIsImZvbnRSZWYiLCJsYXRpbiIsImVhIiwiY3MiLCJzdXBwb3J0ZWQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJnZXQiLCJnZXRSZWxPYmplY3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJpZGVudGl0aWVzIiwidGFnIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUVXO0FBQUE7O0FBQ0gsbUhBQWVBLFNBQWY7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQixDQUFDLE9BQUQsQ0FBaEI7O0FBRUEsZ0JBQU1DLE1BQUksS0FBS0EsR0FBZjtBQUNBLGdCQUFNQyxZQUFVLFNBQVZBLFNBQVU7QUFBQSxvQ0FDVCw2QkFEUztBQUVaQyxvQ0FBZSw4QkFBbUI7QUFBQSw0QkFBakJDLEdBQWlCLFFBQWpCQSxHQUFpQjtBQUFBLDRCQUFWQyxNQUFVOztBQUM5QiwrQkFBTyxPQUFLSixHQUFMLENBQVNLLE9BQVQsQ0FBaUJGLE9B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QUFXLEUiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi9wYXJ0XCJcbmltcG9ydCBkcmF3bWwgZnJvbSBcIi4vZHJhd21sXCJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcbiAgICBfaW5pdCgpe1xuICAgICAgICBzdXBlci5faW5pdCguLi5hcmd1bWVudHMpXG4gICAgICAgIHRoaXMuX2Fzc2lnblJlbChbXCJ0aGVtZVwiXSlcblxuICAgICAgICBjb25zdCBkb2M9dGhpcy5kb2NcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtPXBoPT4oe1xuICAgICAgICAgICAgLi4uZHJhd21sKHRoaXMpLFxuICAgICAgICAgICAgdGlkeV9zY2hlbWVDbHI6KHt2YWwsLi4uZWZmZWN0fSk9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb2MuYXNDb2xvcih2YWw9PVwicGhDbHJcIiA/IHBoLmNvbG9yIDp0aGlzLnRoZW1lLmNvbG9yKHZhbCksZWZmZWN0KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSlcblxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMudGhlbWUse1xuICAgICAgICAgICAgZm9udCh0eXBlZmFjZSl7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZT17bW46XCJtaW5vclwiLG1qOlwibWFqb3JcIn1cbiAgICAgICAgICAgICAgICBjb25zdCBbYSxiXT10eXBlZmFjZS5zcGxpdCgvWystXS9nKS5maWx0ZXIoYT0+YSlcbiAgICAgICAgICAgICAgICBpZihhICYmIGIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKGBhXFxcXDpmb250U2NoZW1lPmFcXFxcOiR7dHlwZVthXX1Gb250PmFcXFxcOiR7Yj09XCJsdFwiP1wibGF0aW5cIjpifWApLmF0dHIoXCJ0eXBlZmFjZVwiKVxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlZmFjZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yKGspe1xuICAgICAgICAgICAgICAgIGNvbnN0ICQ9dGhpcyhgYVxcXFw6Y2xyU2NoZW1lPmFcXFxcOiR7a31gKS5jaGlsZHJlbigpLmVxKDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5hc0NvbG9yKCQuYXR0cihcImxhc3RDbHJcIil8fCQuYXR0cihcInZhbFwiKSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGZpbGxSZWYoaWR4LHBoKXtcbiAgICAgICAgICAgICAgICBpZHg9cGFyc2VJbnQoaWR4KVxuICAgICAgICAgICAgICAgIGlmKGlkeD09MCB8fCBpZHg9PTEwMDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICAgICAgICAgIGlmKGlkeD4xMDAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcygnYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmJnRmlsbFN0eWxlTHN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoaWR4LTEwMDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSlcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6ZmlsbFN0eWxlTHN0JylcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLmVxKGlkeC0xKVxuICAgICAgICAgICAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSlcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGxuUmVmKGlkeCxwaCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMoJ2FcXFxcOmZtdFNjaGVtZT5hXFxcXDpsblN0eWxlTHN0JylcbiAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgLmVxKHBhcnNlSW50KGlkeCktMSlcbiAgICAgICAgICAgICAgICAgICAgLnByb3BzKHRyYW5zZm9ybShwaCkpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlZmZlY3RSZWYoaWR4LCBwaCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMoJ2FcXFxcOmZtdFNjaGVtZT5hXFxcXDplZmZlY3RTdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgICAgIC5lcShwYXJzZUludChpZHgpLTEpXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbignYVxcXFw6ZWZmZWN0THN0JylcbiAgICAgICAgICAgICAgICAgICAgLnByb3BzKHRyYW5zZm9ybShwaCkpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmb250UmVmKGlkeCxwaCl7XG4gICAgICAgICAgICAgICAgY29uc3QgJD10aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6Zm9udFNjaGVtZT5hXFxcXDonK2lkeCsnRm9udCcpXG4gICAgICAgICAgICAgICAgY29uc3QgbGF0aW49JC5jaGlsZHJlbignYVxcXFw6bGF0aW4nKVxuICAgICAgICAgICAgICAgIGNvbnN0IGVhPSQuY2hpbGRyZW4oJ2FcXFxcOmVhJylcbiAgICAgICAgICAgICAgICBjb25zdCBjcz0kLmNoaWxkcmVuKCdhXFxcXDpjcycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtsYXRpbjpsYXRpbi5hdHRyKFwidHlwZWZhY2VcIiksZWE6ZWEuYXR0cigndHlwZWZhY2UnKSxjczpjcy5hdHRyKFwidHlwZWZhY2VcIiksLi4ucGh9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgX2Fzc2lnblJlbChzdXBwb3J0ZWQpe1xuICAgICAgICB0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXG5cdFx0XHRpZihzdXBwb3J0ZWQuaW5kZXhPZih0eXBlKSE9LTEpe1xuXHRcdFx0XHRsZXQgdGFyZ2V0PSQuYXR0cihcIlRhcmdldFwiKVxuXHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyx0eXBlLHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOnRydWUsXG5cdFx0XHRcdFx0Z2V0KCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KVxuICAgIH1cblxuICAgIHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuXG4gICAgfVxuXG4gICAgc3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgY29uc3QgaWRlbnRpdGllcz10aGlzLmlkZW50aXRpZXNcbiAgICAgICAgY29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcbiAgICAgICAgaWYoaWRlbnRpdGllc1t0YWddKVxuICAgICAgICAgICAgcmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpXG5cbiAgICAgICAgcmV0dXJuIHRhZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgXG4gICAgfVxufVxuIl19