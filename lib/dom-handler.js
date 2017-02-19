"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DomHandler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require("events");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DomHandler = exports.DomHandler = function (_EventEmitter) {
    _inherits(DomHandler, _EventEmitter);

    function DomHandler() {
        _classCallCheck(this, DomHandler);

        return _possibleConstructorReturn(this, (DomHandler.__proto__ || Object.getPrototypeOf(DomHandler)).apply(this, arguments));
    }

    _createClass(DomHandler, [{
        key: "createElement",
        value: function createElement(type, props, children) {
            return { type: type, props: props, children: children };
        }
    }]);

    return DomHandler;
}(_events.EventEmitter);

exports.default = DomHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9kb20taGFuZGxlci5qcyJdLCJuYW1lcyI6WyJEb21IYW5kbGVyIiwidHlwZSIsInByb3BzIiwiY2hpbGRyZW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUVhQSxVLFdBQUFBLFU7Ozs7Ozs7Ozs7O3NDQUNLQyxJLEVBQUtDLEssRUFBTUMsUSxFQUFTO0FBQzlCLG1CQUFPLEVBQUNGLFVBQUQsRUFBTUMsWUFBTixFQUFZQyxrQkFBWixFQUFQO0FBQ0g7Ozs7OztrQkFHVUgsVSIsImZpbGUiOiJkb20taGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tIFwiZXZlbnRzXCJcblxuZXhwb3J0IGNsYXNzIERvbUhhbmRsZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXJ7XG4gICAgY3JlYXRlRWxlbWVudCh0eXBlLHByb3BzLGNoaWxkcmVuKXtcbiAgICAgICAgcmV0dXJuIHt0eXBlLHByb3BzLGNoaWxkcmVufVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9tSGFuZGxlclxuIl19