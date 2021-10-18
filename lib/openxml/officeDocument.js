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
                    var _target = $.attr("Target");
                    Object.defineProperty(_this3, type, {
                        configurable: true,
                        get: function get() {
                            return this.getRelObject(_target);
                        }
                    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIl9hc3NpZ25SZWwiLCJkb2MiLCJ0cmFuc2Zvcm0iLCJ0aWR5X3NjaGVtZUNsciIsInZhbCIsImVmZmVjdCIsImFzQ29sb3IiLCJwaCIsImNvbG9yIiwidGhlbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJmb250IiwidHlwZWZhY2UiLCJ0eXBlIiwibW4iLCJtaiIsInNwbGl0IiwiZmlsdGVyIiwiYSIsImIiLCJhdHRyIiwiayIsIiQiLCJjaGlsZHJlbiIsImVxIiwiZmlsbFJlZiIsImlkeCIsInBhcnNlSW50IiwicHJvcHMiLCJsblJlZiIsImVmZmVjdFJlZiIsImZvbnRSZWYiLCJsYXRpbiIsImVhIiwiY3MiLCJzdXBwb3J0ZWQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJjb25maWd1cmFibGUiLCJnZXQiLCJnZXRSZWxPYmplY3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJpZGVudGl0aWVzIiwidGFnIiwibmFtZSIsIlBhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQ0FFVztBQUFBOztBQUNILG1IQUFlQSxTQUFmO0FBQ0EsaUJBQUtDLFVBQUwsQ0FBZ0IsQ0FBQyxPQUFELENBQWhCOztBQUVBLGdCQUFNQyxNQUFJLEtBQUtBLEdBQWY7QUFDQSxnQkFBTUMsWUFBVSxTQUFWQSxTQUFVO0FBQUEsb0NBQ1Qsc0JBQU8sTUFBUCxDQURTO0FBRVpDLG9DQUFlLDhCQUFtQjtBQUFBLDRCQUFqQkMsR0FBaUIsUUFBakJBLEdBQWlCO0FBQUEsNEJBQVZDLE1BQVU7O0FBQzlCLCtCQUFPLE9BQUtKLEdBQUwsQ0FB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Q0g7Ozs7RUE5RndCRSxjOztPQWdHbEJILFUsR0FBVyxFIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4vcGFydFwiXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuL2RyYXdtbFwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XG4gICAgX2luaXQoKXtcbiAgICAgICAgc3VwZXIuX2luaXQoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLl9hc3NpZ25SZWwoW1widGhlbWVcIl0pXG5cbiAgICAgICAgY29uc3QgZG9jPXRoaXMuZG9jXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybT1waD0+KHtcbiAgICAgICAgICAgIC4uLmRyYXdtbCh0aGlzKSxcbiAgICAgICAgICAgIHRpZHlfc2NoZW1lQ2xyOih7dmFsLC4uLmVmZmVjdH0pPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9jLmFzQ29sb3IodmFsPT1cInBoQ2xyXCIgPyBwaC5jb2xvciA6dGhpcy50aGVtZS5jb2xvcih2YWwpLGVmZmVjdClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG5cbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnRoZW1lLHtcbiAgICAgICAgICAgIGZvbnQodHlwZWZhY2Upe1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGU9e21uOlwibWlub3JcIixtajpcIm1ham9yXCJ9XG4gICAgICAgICAgICAgICAgY29uc3QgW2EsYl09dHlwZWZhY2Uuc3BsaXQoL1srLV0vZykuZmlsdGVyKGE9PmEpXG4gICAgICAgICAgICAgICAgaWYoYSAmJiBiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcyhgYVxcXFw6Zm9udFNjaGVtZT5hXFxcXDoke3R5cGVbYV19Rm9udD5hXFxcXDoke2I9PVwibHRcIj9cImxhdGluXCI6Yn1gKS5hdHRyKFwidHlwZWZhY2VcIilcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZWZhY2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb2xvcihrKXtcbiAgICAgICAgICAgICAgICBjb25zdCAkPXRoaXMoYGFcXFxcOmNsclNjaGVtZT5hXFxcXDoke2t9YCkuY2hpbGRyZW4oKS5lcSgwKVxuICAgICAgICAgICAgICAgIHJldHVybiBkb2MuYXNDb2xvcigkLmF0dHIoXCJsYXN0Q2xyXCIpfHwkLmF0dHIoXCJ2YWxcIikpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBmaWxsUmVmKGlkeCxwaCl7XG4gICAgICAgICAgICAgICAgaWR4PXBhcnNlSW50KGlkeClcbiAgICAgICAgICAgICAgICBpZihpZHg9PTAgfHwgaWR4PT0xMDAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgICAgICBpZihpZHg+MTAwMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMoJ2FcXFxcOmZtdFNjaGVtZT5hXFxcXDpiZ0ZpbGxTdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGlkeC0xMDAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3BzKHRyYW5zZm9ybShwaCkpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcygnYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmZpbGxTdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgICAgIC5lcShpZHgtMSlcbiAgICAgICAgICAgICAgICAgICAgLnByb3BzKHRyYW5zZm9ybShwaCkpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBsblJlZihpZHgscGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6bG5TdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgIC5jaGlsZHJlbigpXG4gICAgICAgICAgICAgICAgICAgIC5lcShwYXJzZUludChpZHgpLTEpXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wcyh0cmFuc2Zvcm0ocGgpKVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZWZmZWN0UmVmKGlkeCwgcGgpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6ZWZmZWN0U3R5bGVMc3QnKVxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAuZXEocGFyc2VJbnQoaWR4KS0xKVxuICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJ2FcXFxcOmVmZmVjdExzdCcpXG4gICAgICAgICAgICAgICAgICAgIC5wcm9wcyh0cmFuc2Zvcm0ocGgpKVxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZm9udFJlZihpZHgscGgpe1xuICAgICAgICAgICAgICAgIGNvbnN0ICQ9dGhpcygnYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmZvbnRTY2hlbWU+YVxcXFw6JytpZHgrJ0ZvbnQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGxhdGluPSQuY2hpbGRyZW4oJ2FcXFxcOmxhdGluJylcbiAgICAgICAgICAgICAgICBjb25zdCBlYT0kLmNoaWxkcmVuKCdhXFxcXDplYScpXG4gICAgICAgICAgICAgICAgY29uc3QgY3M9JC5jaGlsZHJlbignYVxcXFw6Y3MnKVxuICAgICAgICAgICAgICAgIHJldHVybiB7bGF0aW46bGF0aW4uYXR0cihcInR5cGVmYWNlXCIpLGVhOmVhLmF0dHIoJ3R5cGVmYWNlJyksY3M6Y3MuYXR0cihcInR5cGVmYWNlXCIpLC4uLnBofVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIF9hc3NpZ25SZWwoc3VwcG9ydGVkKXtcbiAgICAgICAgdGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9Pntcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxuXHRcdFx0aWYoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkhPS0xKXtcblx0XHRcdFx0bGV0IHRhcmdldD0kLmF0dHIoXCJUYXJnZXRcIilcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTp0cnVlLFxuXHRcdFx0XHRcdGdldCgpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcblxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgIGNvbnN0IGlkZW50aXRpZXM9dGhpcy5pZGVudGl0aWVzXG4gICAgICAgIGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG4gICAgICAgIGlmKGlkZW50aXRpZXNbdGFnXSlcbiAgICAgICAgICAgIHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxuXG4gICAgICAgIHJldHVybiB0YWdcbiAgICB9XG5cbiAgICBzdGF0aWMgaWRlbnRpdGllcz17XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==