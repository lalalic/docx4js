"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    _createClass(_class, null, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL29mZmljZURvY3VtZW50LmpzIl0sIm5hbWVzIjpbIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsImlkZW50aXRpZXMiLCJ0YWciLCJuYW1lIiwic3BsaXQiLCJwb3AiLCJhcmd1bWVudHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lDQUdvQkEsSSxFQUFNQyxjLEVBQWU7QUFDakMsZ0JBQU1DLGFBQVcsS0FBS0EsVUFBdEI7QUFDQSxnQkFBTUMsTUFBSUgsS0FBS0ksSUFBTCxDQUFVQyxLQUFWLENBQWdCLEdBQWhCLEVBQXFCQyxHQUFyQixFQUFWO0FBQ0EsZ0JBQUdKLFdBQVdDLEdBQVgsQ0FBSCxFQUNJLE9BQU9ELFdBQVdDLEdBQVgsb0JBQW1CSSxTQUFuQixDQUFQOztBQUVKLG1CQUFPSixHQUFQO0FBQ0g7Ozs7OztPQUVNRCxVLEdBQVcsRSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuL3BhcnRcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XG4gICAgc3RhdGljIGlkZW50aWZ5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgY29uc3QgaWRlbnRpdGllcz10aGlzLmlkZW50aXRpZXNcbiAgICAgICAgY29uc3QgdGFnPXdYbWwubmFtZS5zcGxpdChcIjpcIikucG9wKClcbiAgICAgICAgaWYoaWRlbnRpdGllc1t0YWddKVxuICAgICAgICAgICAgcmV0dXJuIGlkZW50aXRpZXNbdGFnXSguLi5hcmd1bWVudHMpXG5cbiAgICAgICAgcmV0dXJuIHRhZ1xuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgXG4gICAgfVxufVxuIl19