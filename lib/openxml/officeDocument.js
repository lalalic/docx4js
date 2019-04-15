"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).apply(this, arguments);
            this._assignRel(["theme"]);

            var doc = this.doc;
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
                format: function format() {}
            });
        }
    }, {
        key: "_assignRel",
        value: function _assignRel(supported) {
            var _this2 = this;

            this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
                var $ = _this2.rels(rel);
                var type = $.attr("Type").split("/").pop();
                if (supported.indexOf(type) != -1) {
                    (function () {
                        var target = $.attr("Target");
                        Object.defineProperty(_this2, type, {
                            get: function get() {
                                return this.getRelObject(target);
                            }
                        });
                    })();
                }
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbImFyZ3VtZW50cyIsIl9hc3NpZ25SZWwiLCJkb2MiLCJPYmplY3QiLCJhc3NpZ24iLCJ0aGVtZSIsImZvbnQiLCJ0eXBlZmFjZSIsInR5cGUiLCJtbiIsIm1qIiwic3BsaXQiLCJmaWx0ZXIiLCJhIiwiYiIsImF0dHIiLCJjb2xvciIsImsiLCIkIiwiY2hpbGRyZW4iLCJlcSIsImFzQ29sb3IiLCJmb3JtYXQiLCJzdXBwb3J0ZWQiLCJyZWxzIiwiZWFjaCIsImkiLCJyZWwiLCJwb3AiLCJpbmRleE9mIiwidGFyZ2V0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJnZXRSZWxPYmplY3QiLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJpZGVudGl0aWVzIiwidGFnIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2dDQUdXO0FBQ0gsbUhBQWVBLFNBQWY7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQixDQUFDLE9BQUQsQ0FBaEI7O0FBRUEsZ0JBQU1DLE1BQUksS0FBS0EsR0FBZjtBQUNBQyxtQkFBT0MsTUFBUCxDQUFjLEtBQUtDLEtBQW5CLEVBQXlCO0FBQ3JCQyxvQkFEcUIsZ0JBQ2hCQyxRQURnQixFQUNQO0FBQ1Ysd0JBQU1DLE9BQUssRUFBQ0MsSUFBRyxPQUFKLEVBQVlDLElBQUcsT0FBZixFQUFYOztBQURVLGdEQUVFSCxTQUFTSSxLQUFULENBQWUsT0FBZixFQUF3QkMsTUFBeEIsQ0FBK0I7QUFBQSwrQkFBR0MsQ0FBSDtBQUFBLHFCQUEvQixDQUZGO0FBQUE7QUFBQSx3QkFFSEEsQ0FGRztBQUFBLHdCQUVEQyxDQUZDOztBQUdWLDJCQUFPLDZCQUEyQk4sS0FBS0ssQ0FBTCxDQUEzQixrQkFBOENDLEtBQUcsSUFBSCxHQUFRLE9BQVIsR0FBZ0JBLENBQTlELEdBQW1FQyxJQUFuRSxDQUF3RSxVQUF4RSxDQUFQO0FBQ0gsaUJBTG9CO0FBTXJCQyxxQkFOcUIsaUJBTWZDLENBTmUsRUFNYjtBQUNKLHdCQUFNQyxJQUFFLDRCQUEwQkQsQ0FBMUIsRUFBK0JFLFFBQS9CLEdBQTBDQyxFQUExQyxDQUE2QyxDQUE3QyxDQUFSO0FBQ0EsMkJBQU9sQixJQUFJbUIsT0FBSixDQUFZSCxFQUFFSCxJQUFGLENBQU8sU0FBUCxLQUFtQkcsRUFBRUgsSUFBRixDQUFPLEtBQVAsQ0FBL0IsQ0FBUDtBQUNILGlCQVRvQjtBQVVyQk8sc0JBVnFCLG9CQVViLENBRVA7QUFab0IsYUFBekI7QUFjSDs7O21DQUVVQyxTLEVBQVU7QUFBQTs7QUFDakIsaUJBQUtDLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUM3RCxvQkFBSVQsSUFBRSxPQUFLTSxJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLG9CQUFJbkIsT0FBS1UsRUFBRUgsSUFBRixDQUFPLE1BQVAsRUFBZUosS0FBZixDQUFxQixHQUFyQixFQUEwQmlCLEdBQTFCLEVBQVQ7QUFDQSxvQkFBR0wsVUFBVU0sT0FBVixDQUFrQnJCLElBQWxCLEtBQXlCLENBQUMsQ0FBN0IsRUFBK0I7QUFBQTtBQUM5Qiw0QkFBSXNCLFNBQU9aLEVBQUVILElBQUYsQ0FBTyxRQUFQLENBQVg7QUFDQVosK0JBQU80QixjQUFQLFNBQTJCdkIsSUFBM0IsRUFBZ0M7QUFDL0J3QiwrQkFEK0IsaUJBQzFCO0FBQ0osdUNBQU8sS0FBS0MsWUFBTCxDQUFrQkgsTUFBbEIsQ0FBUDtBQUNBO0FBSDhCLHlCQUFoQztBQUY4QjtBQU85QjtBQUNELGFBWEs7QUFZSDs7O2lDQUVlSSxJLEVBQU1DLGMsRUFBZTtBQUNqQyxnQkFBTUMsYUFBVyxLQUFLQSxVQUF0QjtBQUNBLGdCQUFNQyxNQUFJSCxLQUFLSSxJQUFMLENBQVUzQixLQUFWLENBQWdCLEdBQWhCLEVBQXFCaUIsR0FBckIsRUFBVjtBQUNBLGdCQUFHUSxXQUFXQyxHQUFYLENBQUgsRUFDSSxPQUFPRCxXQUFXQyxHQUFYLG9CQUFtQnJDLFNBQW5CLENBQVA7O0FBRUosbUJBQU9xQyxHQUFQO0FBQ0g7Ozs7OztPQUVNRCxVLEdBQVcsRSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuL3BhcnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XG4gICAgX2luaXQoKXtcbiAgICAgICAgc3VwZXIuX2luaXQoLi4uYXJndW1lbnRzKVxuICAgICAgICB0aGlzLl9hc3NpZ25SZWwoW1widGhlbWVcIl0pXG5cbiAgICAgICAgY29uc3QgZG9jPXRoaXMuZG9jXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy50aGVtZSx7XG4gICAgICAgICAgICBmb250KHR5cGVmYWNlKXtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlPXttbjpcIm1pbm9yXCIsbWo6XCJtYWpvclwifVxuICAgICAgICAgICAgICAgIGNvbnN0IFthLGJdPXR5cGVmYWNlLnNwbGl0KC9bKy1dL2cpLmZpbHRlcihhPT5hKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzKGBhXFxcXDpmb250U2NoZW1lPmFcXFxcOiR7dHlwZVthXX1Gb250PmFcXFxcOiR7Yj09XCJsdFwiP1wibGF0aW5cIjpifWApLmF0dHIoXCJ0eXBlZmFjZVwiKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yKGspe1xuICAgICAgICAgICAgICAgIGNvbnN0ICQ9dGhpcyhgYVxcXFw6Y2xyU2NoZW1lPmFcXFxcOiR7a31gKS5jaGlsZHJlbigpLmVxKDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvYy5hc0NvbG9yKCQuYXR0cihcImxhc3RDbHJcIil8fCQuYXR0cihcInZhbFwiKSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JtYXQoKXtcblxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIF9hc3NpZ25SZWwoc3VwcG9ydGVkKXtcbiAgICAgICAgdGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9Pntcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxuXHRcdFx0aWYoc3VwcG9ydGVkLmluZGV4T2YodHlwZSkhPS0xKXtcblx0XHRcdFx0bGV0IHRhcmdldD0kLmF0dHIoXCJUYXJnZXRcIilcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsdHlwZSx7XG5cdFx0XHRcdFx0Z2V0KCl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdGhpcy5nZXRSZWxPYmplY3QodGFyZ2V0KVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9KVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGlmeSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgIGNvbnN0IGlkZW50aXRpZXM9dGhpcy5pZGVudGl0aWVzXG4gICAgICAgIGNvbnN0IHRhZz13WG1sLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG4gICAgICAgIGlmKGlkZW50aXRpZXNbdGFnXSlcbiAgICAgICAgICAgIHJldHVybiBpZGVudGl0aWVzW3RhZ10oLi4uYXJndW1lbnRzKVxuXG4gICAgICAgIHJldHVybiB0YWdcbiAgICB9XG5cbiAgICBzdGF0aWMgaWRlbnRpdGllcz17XG5cbiAgICB9XG59XG4iXX0=