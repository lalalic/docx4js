"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
            if (this.theme) {
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
        }
    }, {
        key: "render",
        value: function render(createElement) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);
        }
    }, {
        key: "parse",
        value: function parse(domHandler) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            var createElement = domHandler.createElement.bind(domHandler);
            function _identify() {
                var model = identify.apply(undefined, arguments);
                if (model && (typeof model === "undefined" ? "undefined" : _typeof(model)) == "object") {
                    domHandler.emit.apply(domHandler, ["*", model].concat(Array.prototype.slice.call(arguments)));
                    domHandler.emit.apply(domHandler, [model.type, model].concat(Array.prototype.slice.call(arguments)));
                    if (domHandler["on" + model.type]) domHandler["on" + model.type].apply(domHandler, [model].concat(Array.prototype.slice.call(arguments)));
                }
                return model;
            }

            return this.render(createElement, _identify);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIl9hc3NpZ25SZWwiLCJkb2MiLCJ0cmFuc2Zvcm0iLCJ0aWR5X3NjaGVtZUNsciIsInZhbCIsImVmZmVjdCIsImFzQ29sb3IiLCJwaCIsImNvbG9yIiwidGhlbWUiLCJPYmplY3QiLCJhc3NpZ24iLCJmb250IiwidHlwZWZhY2UiLCJ0eXBlIiwibW4iLCJtaiIsInNwbGl0IiwiZmlsdGVyIiwiYSIsImIiLCJhdHRyIiwiayIsIiQiLCJjaGlsZHJlbiIsImVxIiwiZmlsbFJlZiIsImlkeCIsInBhcnNlSW50IiwicHJvcHMiLCJsblJlZiIsImVmZmVjdFJlZiIsImZvbnRSZWYiLCJsYXRpbiIsImVhIiwiY3MiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJkb21IYW5kbGVyIiwiX2lkZW50aWZ5IiwibW9kZWwiLCJlbWl0IiwicmVuZGVyIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiaWRlbnRpdGllcyIsInRhZyIsIm5hbWUiLCJwb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUVXO0FBQUE7O0FBQ0gsbUhBQWVBLFNBQWY7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQixDQUFDLE9BQUQsQ0FBaEI7O0FBRUEsZ0JBQU1DLE1BQUksS0FBS0EsR0FBZjtBQUNBLGdCQUFNQyxZQUFVLFNBQVZBLFNBQVU7QUFBQSxvQ0FDVCw2QkFEUztBQUVaQyxvQ0FBZSw4QkFBbUI7QUFBQSw0QkFBakJDLEdBQWlCLFFBQWpCQSxHQUFpQjtBQUFBLDRCQUFWQyxNQUFVOztBQUM5QiwrQkFBTyxPQUFLSixHQUFMLENBQVNLLE9BQVQsQ0FBaUJGLE9BQUssT0FBTCxHQUFlRyxHQUFHQyxLQUFsQixHQUF5QixPQUFLQyxLQUFMLENBQVdELEtBQVgsQ0FBaUJKLEdBQWpCLENBQTFDLEVBQWdFQyxNQUFoRSxDQUFQO0FBQ0g7QUFKVztBQUFBLGFBQWhCO0FBTUEsZ0JBQUcsS0FBS0ksS0FBUixFQUFjO0FBQ1ZDLHVCQUFPQyxNQUFQLENBQWMsS0FBS0YsS0FBbkIsRUFBeUI7QUFDckJHLHdCQURxQixnQkFDaEJDLFFBRGdCLEVBQ1A7QUFDViw0QkFBTUMsT0FBSyxFQUFDQyxJQUFHLE9BQUosRUFBWUMsSUFBRyxPQUFmLEVBQVg7O0FBRFUsb0RBRUVILFNBQVNJLEtBQVQsQ0FBZSxPQUFmLEVBQXdCQyxNQUF4QixDQUErQjtBQUFBLG1DQUFHQyxDQUFIO0FBQUEseUJBQS9CLENBRkY7QUFBQTtBQUFBLDRCQUVIQSxDQUZHO0FBQUEsNEJBRURDLENBRkM7O0FBR1YsNEJBQUdELEtBQUtDLENBQVIsRUFDSSxPQUFPLDZCQUEyQk4sS0FBS0ssQ0FBTCxDQUEzQixrQkFBOENDLEtBQUcsSUFBSCxHQUFRLE9BQVIsR0FBZ0JBLENBQTlELEdBQW1FQyxJQUFuRSxDQUF3RSxVQUF4RSxDQUFQO0FBQ0osK0JBQU9SLFFBQVA7QUFDSCxxQkFQb0I7QUFRckJMLHlCQVJxQixpQkFRZmMsQ0FSZSxFQVFiO0FBQ0osNEJBQU1DLElBQUUsNEJBQTBCRCxDQUExQixFQUErQkUsUUFBL0IsR0FBMENDLEVBQTFDLENBQTZDLENBQTdDLENBQVI7QUFDQSwrQkFBT3hCLElBQUlLLE9BQUosQ0FBWWlCLEVBQUVGLElBQUYsQ0FBTyxTQUFQLEtBQW1CRSxFQUFFRixJQUFGLENBQU8sS0FBUCxDQUEvQixDQUFQO0FBQ0gscUJBWG9CO0FBYXJCSywyQkFicUIsbUJBYWJDLEdBYmEsRUFhVHBCLEVBYlMsRUFhTjtBQUNYb0IsOEJBQUlDLFNBQVNELEdBQVQsQ0FBSjtBQUNBLDRCQUFHQSxPQUFLLENBQUwsSUFBVUEsT0FBSyxJQUFsQixFQUNJLE9BQU8sRUFBUDtBQUNKLDRCQUFHQSxNQUFJLElBQVAsRUFDSSxPQUFPLEtBQUssa0NBQUwsRUFDRkgsUUFERSxHQUVGQyxFQUZFLENBRUNFLE1BQUksSUFGTCxFQUdGRSxLQUhFLENBR0kzQixVQUFVSyxFQUFWLENBSEosQ0FBUDs7QUFLSiwrQkFBTyxLQUFLLGdDQUFMLEVBQ0ZpQixRQURFLEdBRUZDLEVBRkUsQ0FFQ0UsTUFBSSxDQUZMLEVBR0ZFLEtBSEUsQ0FHSTNCLFVBQVVLLEVBQVYsQ0FISixDQUFQO0FBSUgscUJBM0JvQjtBQTZCckJ1Qix5QkE3QnFCLGlCQTZCZkgsR0E3QmUsRUE2QlhwQixFQTdCVyxFQTZCUjtBQUNULCtCQUFPLEtBQUssOEJBQUwsRUFDRmlCLFFBREUsR0FFRkMsRUFGRSxDQUVDRyxTQUFTRCxHQUFULElBQWMsQ0FGZixFQUdGRSxLQUhFLENBR0kzQixVQUFVSyxFQUFWLENBSEosQ0FBUDtBQUlILHFCQWxDb0I7QUFvQ3JCd0IsNkJBcENxQixxQkFvQ1hKLEdBcENXLEVBb0NOcEIsRUFwQ00sRUFvQ0g7QUFDZCwrQkFBTyxLQUFLLGtDQUFMLEVBQ0ZpQixRQURFLEdBRUZDLEVBRkUsQ0FFQ0csU0FBU0QsR0FBVCxJQUFjLENBRmYsRUFHRkgsUUFIRSxDQUdPLGVBSFAsRUFJRkssS0FKRSxDQUlJM0IsVUFBVUssRUFBVixDQUpKLENBQVA7QUFLSCxxQkExQ29CO0FBNENyQnlCLDJCQTVDcUIsbUJBNENiTCxHQTVDYSxFQTRDVHBCLEVBNUNTLEVBNENOO0FBQ1gsNEJBQU1nQixJQUFFLEtBQUssc0NBQW9DSSxHQUFwQyxHQUF3QyxNQUE3QyxDQUFSO0FBQ0EsNEJBQU1NLFFBQU1WLEVBQUVDLFFBQUYsQ0FBVyxXQUFYLENBQVo7QUFDQSw0QkFBTVUsS0FBR1gsRUFBRUMsUUFBRixDQUFXLFFBQVgsQ0FBVDtBQUNBLDRCQUFNVyxLQUFHWixFQUFFQyxRQUFGLENBQVcsUUFBWCxDQUFUO0FBQ0EsMENBQVFTLE9BQU1BLE1BQU1aLElBQU4sQ0FBVyxVQUFYLENBQWQsRUFBcUNhLElBQUdBLEdBQUdiLElBQUgsQ0FBUSxVQUFSLENBQXhDLEVBQTREYyxJQUFHQSxHQUFHZCxJQUFILENBQVEsVUFBUixDQUEvRCxJQUFzRmQsRUFBdEY7QUFDSDtBQWxEb0IsaUJBQXpCO0FBb0RIO0FBQ0o7OzsrQkFFTTZCLGEsRUFBeUU7QUFBQSxnQkFBMURDLFFBQTBELHVFQUFqRCxLQUFLQyxXQUFMLENBQWlCRCxRQUFqQixDQUEwQkUsSUFBMUIsQ0FBK0IsS0FBS0QsV0FBcEMsQ0FBaUQ7QUFFL0U7Ozs4QkFFS0UsVSxFQUFxRTtBQUFBLGdCQUExREgsUUFBMEQsdUVBQWpELEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxDQUFpRDs7QUFDN0UsZ0JBQU1GLGdCQUFjSSxXQUFXSixhQUFYLENBQXlCRyxJQUF6QixDQUE4QkMsVUFBOUIsQ0FBcEI7QUFDQSxxQkFBU0MsU0FBVCxHQUFvQjtBQUNuQixvQkFBSUMsUUFBTUwsMEJBQVl0QyxTQUFaLENBQVY7QUFDQSxvQkFBRzJDLFNBQVMsUUFBT0EsS0FBUCx5Q0FBT0EsS0FBUCxNQUFlLFFBQTNCLEVBQW9DO0FBQ25DRiwrQkFBV0csSUFBWCxvQkFBZ0IsR0FBaEIsRUFBb0JELEtBQXBCLG9DQUE2QjNDLFNBQTdCO0FBQ0F5QywrQkFBV0csSUFBWCxvQkFBZ0JELE1BQU01QixJQUF0QixFQUE0QjRCLEtBQTVCLG9DQUFxQzNDLFNBQXJDO0FBQ0Esd0JBQUd5QyxrQkFBZ0JFLE1BQU01QixJQUF0QixDQUFILEVBQ0MwQixrQkFBZ0JFLE1BQU01QixJQUF0QixxQkFBOEI0QixLQUE5QixvQ0FBdUMzQyxTQUF2QztBQUNEO0FBQ0QsdUJBQU8yQyxLQUFQO0FBQ0E7O0FBRUssbUJBQU8sS0FBS0UsTUFBTCxDQUFZUixhQUFaLEVBQTJCSyxTQUEzQixDQUFQO0FBQ047OztpQ0FFa0JJLEksRUFBTUMsYyxFQUFlO0FBQ2pDLGdCQUFNQyxhQUFXLEtBQUtBLFVBQXRCO0FBQ0EsZ0JBQU1DLE1BQUlILEtBQUtJLElBQUwsQ0FBVWhDLEtBQVYsQ0FBZ0IsR0FBaEIsRUFBcUJpQyxHQUFyQixFQUFWO0FBQ0EsZ0JBQUdILFdBQVdDLEdBQVgsQ0FBSCxFQUNJLE9BQU9ELFdBQVdDLEdBQVgsb0JBQW1CakQsU0FBbkIsQ0FBUDs7QUFFSixtQkFBT2lELEdBQVA7QUFDSDs7Ozs7O09BRU1ELFUsR0FBVyxFIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4vcGFydFwiXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuL2RyYXdtbFwiXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XG4gICAgX2luaXQoKXtcbiAgICAgICAgc3VwZXIuX2luaXQoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLl9hc3NpZ25SZWwoW1widGhlbWVcIl0pXG5cbiAgICAgICAgY29uc3QgZG9jPXRoaXMuZG9jXG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybT1waD0+KHtcbiAgICAgICAgICAgIC4uLmRyYXdtbCh0aGlzKSxcbiAgICAgICAgICAgIHRpZHlfc2NoZW1lQ2xyOih7dmFsLC4uLmVmZmVjdH0pPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZG9jLmFzQ29sb3IodmFsPT1cInBoQ2xyXCIgPyBwaC5jb2xvciA6dGhpcy50aGVtZS5jb2xvcih2YWwpLGVmZmVjdClcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pXG4gICAgICAgIGlmKHRoaXMudGhlbWUpe1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnRoZW1lLHtcbiAgICAgICAgICAgICAgICBmb250KHR5cGVmYWNlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHlwZT17bW46XCJtaW5vclwiLG1qOlwibWFqb3JcIn1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgW2EsYl09dHlwZWZhY2Uuc3BsaXQoL1srLV0vZykuZmlsdGVyKGE9PmEpXG4gICAgICAgICAgICAgICAgICAgIGlmKGEgJiYgYilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKGBhXFxcXDpmb250U2NoZW1lPmFcXFxcOiR7dHlwZVthXX1Gb250PmFcXFxcOiR7Yj09XCJsdFwiP1wibGF0aW5cIjpifWApLmF0dHIoXCJ0eXBlZmFjZVwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZWZhY2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGNvbG9yKGspe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkPXRoaXMoYGFcXFxcOmNsclNjaGVtZT5hXFxcXDoke2t9YCkuY2hpbGRyZW4oKS5lcSgwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9jLmFzQ29sb3IoJC5hdHRyKFwibGFzdENsclwiKXx8JC5hdHRyKFwidmFsXCIpKVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBmaWxsUmVmKGlkeCxwaCl7XG4gICAgICAgICAgICAgICAgICAgIGlkeD1wYXJzZUludChpZHgpXG4gICAgICAgICAgICAgICAgICAgIGlmKGlkeD09MCB8fCBpZHg9PTEwMDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgICAgICAgICAgaWYoaWR4PjEwMDApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcygnYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmJnRmlsbFN0eWxlTHN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5lcShpZHgtMTAwMSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSlcblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcygnYVxcXFw6Zm10U2NoZW1lPmFcXFxcOmZpbGxTdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKGlkeC0xKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnByb3BzKHRyYW5zZm9ybShwaCkpXG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGxuUmVmKGlkeCxwaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6bG5TdHlsZUxzdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmVxKHBhcnNlSW50KGlkeCktMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wcm9wcyh0cmFuc2Zvcm0ocGgpKVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBlZmZlY3RSZWYoaWR4LCBwaCl7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKCdhXFxcXDpmbXRTY2hlbWU+YVxcXFw6ZWZmZWN0U3R5bGVMc3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShwYXJzZUludChpZHgpLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2hpbGRyZW4oJ2FcXFxcOmVmZmVjdExzdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJvcHModHJhbnNmb3JtKHBoKSlcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgZm9udFJlZihpZHgscGgpe1xuICAgICAgICAgICAgICAgICAgICBjb25zdCAkPXRoaXMoJ2FcXFxcOmZtdFNjaGVtZT5hXFxcXDpmb250U2NoZW1lPmFcXFxcOicraWR4KydGb250JylcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGF0aW49JC5jaGlsZHJlbignYVxcXFw6bGF0aW4nKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlYT0kLmNoaWxkcmVuKCdhXFxcXDplYScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNzPSQuY2hpbGRyZW4oJ2FcXFxcOmNzJylcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtsYXRpbjpsYXRpbi5hdHRyKFwidHlwZWZhY2VcIiksZWE6ZWEuYXR0cigndHlwZWZhY2UnKSxjczpjcy5hdHRyKFwidHlwZWZhY2VcIiksLi4ucGh9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuXG4gICAgfVxuXG4gICAgcGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1vZGVsXG5cdFx0fVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihjcmVhdGVFbGVtZW50LCBfaWRlbnRpZnkpXG5cdH1cblxuICAgIHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgIGNvbnN0IGlkZW50aXRpZXM9dGhpcy5pZGVudGl0aWVzXG4gICAgICAgIGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG4gICAgICAgIGlmKGlkZW50aXRpZXNbdGFnXSlcbiAgICAgICAgICAgIHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxuXG4gICAgICAgIHJldHVybiB0YWdcbiAgICB9XG5cbiAgICBzdGF0aWMgaWRlbnRpdGllcz17XG4gICAgICAgIFxuICAgIH1cbn1cbiJdfQ==