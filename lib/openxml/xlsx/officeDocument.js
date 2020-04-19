"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _officeDocument = require("../officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _drawml = require("../drawml");

var _drawml2 = _interopRequireDefault(_drawml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OfficeDocument = function (_Base) {
    _inherits(OfficeDocument, _Base);

    function OfficeDocument() {
        _classCallCheck(this, OfficeDocument);

        return _possibleConstructorReturn(this, (OfficeDocument.__proto__ || Object.getPrototypeOf(OfficeDocument)).apply(this, arguments));
    }

    _createClass(OfficeDocument, [{
        key: "_init",
        value: function _init() {
            _get(OfficeDocument.prototype.__proto__ || Object.getPrototypeOf(OfficeDocument.prototype), "_init", this).call(this);
            this._assignRel("tableStyles,viewProps,presProps".split(","));
        }
    }, {
        key: "render",
        value: function render(createElement) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify);
        }
    }]);

    return OfficeDocument;
}(_officeDocument2.default);

OfficeDocument.identities = {};
exports.default = OfficeDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3hsc3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJyZW5kZXJOb2RlIiwiY29udGVudCIsImdldCIsImlkZW50aXRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Z0NBQ1Y7QUFDSDtBQUNBLGlCQUFLQyxVQUFMLENBQWdCLGtDQUFrQ0MsS0FBbEMsQ0FBd0MsR0FBeEMsQ0FBaEI7QUFDSDs7OytCQUVNQyxhLEVBQXlFO0FBQUEsZ0JBQTFEQyxRQUEwRCx1RUFBakQsS0FBS0MsV0FBTCxDQUFpQkQsUUFBakIsQ0FBMEJFLElBQTFCLENBQStCLEtBQUtELFdBQXBDLENBQWlEOztBQUM1RSxtQkFBTyxLQUFLRSxVQUFMLENBQWdCLEtBQUtDLE9BQUwsQ0FBYSxrQkFBYixFQUFpQ0MsR0FBakMsQ0FBcUMsQ0FBckMsQ0FBaEIsRUFBeUROLGFBQXpELEVBQXdFQyxRQUF4RSxDQUFQO0FBQ0g7Ozs7OztBQVJnQkosYyxDQVVWVSxVLEdBQVcsRTtrQkFWRFYsYyIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9vZmZpY2VEb2N1bWVudFwiXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuLi9kcmF3bWxcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIEJhc2V7XG4gICAgX2luaXQoKXtcbiAgICAgICAgc3VwZXIuX2luaXQoKVxuICAgICAgICB0aGlzLl9hc3NpZ25SZWwoXCJ0YWJsZVN0eWxlcyx2aWV3UHJvcHMscHJlc1Byb3BzXCIuc3BsaXQoXCIsXCIpKVxuICAgIH1cblxuICAgIHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcInBcXFxcOnByZXNlbnRhdGlvblwiKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICB9XG59XG4iXX0=