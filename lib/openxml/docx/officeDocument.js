"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _htmlparser = require("htmlparser2");

var _factory = require("./factory");

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Part) {
	(0, _inherits3.default)(_class, _Part);

	function _class() {
		(0, _classCallCheck3.default)(this, _class);
		return (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).apply(this, arguments));
	}

	(0, _createClass3.default)(_class, [{
		key: "_init",
		value: function _init() {
			var _this2 = this;

			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});
		}
	}, {
		key: "render",
		value: function render(container) {
			var customziedComponents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			var render = function render(node) {
				var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
				var tagName = node.tagName,
				    childNodes = node.childNodes,
				    type = node.type;

				if (type == "text") return _react2.default.createElement(
					"span",
					null,
					node.data
				);
				return _react2.default.createElement(customizedComponents[tagName] || _getComponent(tagName), { key: key, children: childNodes ? childNodes.map(function (a, i) {
						return render(a, i);
					}) : [] });
			};

			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			var content = _cheerio2.default.load(buffer, { xmlMode: true });

			return _reactDom2.default.render(render(content("w\\:document").get(0)), container);
		}
	}, {
		key: "parser",
		value: function parser() {
			var _this3 = this;

			var identify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _factory2.default;

			var opt = { xmlMode: true };
			var emitter = new _events2.default();
			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			var handler = new _htmlparser.DomHandler(opt, function (el) {
				if (el.name) {
					if (identify) emitter.emit(identify(el, _this3), el, _this3);else emitter.emit(el.name, el, _this3);
				}
			});
			var parser = new _htmlparser.Parser(handler, opt);
			return {
				start: function start() {
					parser.end(buffer);
					return this;
				},
				on: function on() {
					emitter.on.apply(emitter, arguments);
					return this;
				}
			};
		}
	}, {
		key: "getComponent",
		value: function getComponent(tagName) {
			return _getComponent.apply(undefined, arguments);
		}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;


var _getComponent = function _getComponent(name) {
	var existing = _getComponent[name];
	if (existing) return existing;
	var Type = function Type(_ref) {
		var children = _ref.children;

		if (children) {
			if (children.length == 1) {
				return children[0];
			} else {
				return _react2.default.createElement(
					"div",
					null,
					children
				);
			}
		} else {
			return null;
		}
	};
	Type.displayName = name;
	return _getComponent[name] = Type;
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJjb250YWluZXIiLCJjdXN0b216aWVkQ29tcG9uZW50cyIsInJlbmRlciIsIm5vZGUiLCJrZXkiLCJ0YWdOYW1lIiwiY2hpbGROb2RlcyIsImRhdGEiLCJjcmVhdGVFbGVtZW50IiwiY3VzdG9taXplZENvbXBvbmVudHMiLCJnZXRDb21wb25lbnQiLCJjaGlsZHJlbiIsIm1hcCIsImEiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwibmFtZSIsImFzTm9kZUJ1ZmZlciIsImNvbnRlbnQiLCJsb2FkIiwieG1sTW9kZSIsImdldCIsImlkZW50aWZ5Iiwib3B0IiwiZW1pdHRlciIsImhhbmRsZXIiLCJlbCIsImVtaXQiLCJwYXJzZXIiLCJzdGFydCIsImVuZCIsIm9uIiwiYXJndW1lbnRzIiwiZXhpc3RpbmciLCJUeXBlIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUdRO0FBQUE7O0FBQ04sUUFBS0EsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixFQUFUO0FBQ0EsV0FBS0gsSUFBTCxJQUFXLE9BQUtJLFlBQUwsQ0FBa0JMLEVBQUVFLElBQUYsQ0FBTyxRQUFQLENBQWxCLENBQVg7QUFD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O0FBV0F3QixNQUFLRSxXQUFMLEdBQWlCcEIsSUFBakI7QUFDQSxRQUFPUCxjQUFhTyxJQUFiLElBQW1Ca0IsSUFBMUI7QUFDQSxDQWpCRCIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IGNoZWVyIGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCJcclxuaW1wb3J0IHtQYXJzZXIsIERvbUhhbmRsZXJ9IGZyb20gXCJodG1scGFyc2VyMlwiXHJcbmltcG9ydCBkZWZhdWx0SWRlbnRpZnkgZnJvbSBcIi4vZmFjdG9yeVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjb250YWluZXIsY3VzdG9temllZENvbXBvbmVudHM9e30pe1xyXG5cdFx0Y29uc3QgcmVuZGVyPShub2RlLGtleT0wKT0+e1xyXG5cdFx0XHRjb25zdCB7dGFnTmFtZSwgY2hpbGROb2Rlcyx0eXBlfT1ub2RlXHJcblx0XHRcdGlmKHR5cGU9PVwidGV4dFwiKVxyXG5cdFx0XHRcdHJldHVybiA8c3Bhbj57bm9kZS5kYXRhfTwvc3Bhbj5cclxuXHRcdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoY3VzdG9taXplZENvbXBvbmVudHNbdGFnTmFtZV18fGdldENvbXBvbmVudCh0YWdOYW1lKSx7a2V5LGNoaWxkcmVuOiBjaGlsZE5vZGVzID8gY2hpbGROb2Rlcy5tYXAoKGEsaSk9PnJlbmRlcihhLGkpKSA6IFtdfSlcclxuXHRcdH1cclxuXHJcblx0XHRjb25zdCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHRsZXQgY29udGVudD1jaGVlci5sb2FkKGJ1ZmZlcix7eG1sTW9kZTp0cnVlfSlcclxuXHJcblx0XHRyZXR1cm4gUmVhY3RET00ucmVuZGVyKHJlbmRlcihjb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApKSwgY29udGFpbmVyKVxyXG5cdH1cclxuXHJcblx0cGFyc2VyKGlkZW50aWZ5PWRlZmF1bHRJZGVudGlmeSl7XHJcblx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWV9XHJcblx0XHRsZXQgZW1pdHRlcj1uZXcgRXZlbnRFbWl0dGVyKClcclxuXHRcdGxldCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHRsZXQgaGFuZGxlcj1uZXcgRG9tSGFuZGxlcihvcHQsZWw9PntcclxuXHRcdFx0aWYoZWwubmFtZSl7XHJcblx0XHRcdFx0aWYoaWRlbnRpZnkpXHJcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoaWRlbnRpZnkoZWwsdGhpcyksZWwsdGhpcylcclxuXHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoZWwubmFtZSxlbCx0aGlzKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bGV0IHBhcnNlcj1uZXcgUGFyc2VyKGhhbmRsZXIsb3B0KVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQoKXtcclxuXHRcdFx0XHRwYXJzZXIuZW5kKGJ1ZmZlcilcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbigpe1xyXG5cdFx0XHRcdGVtaXR0ZXIub24oLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldENvbXBvbmVudCh0YWdOYW1lKXtcclxuXHRcdHJldHVybiBnZXRDb21wb25lbnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9PntcclxuXHRsZXQgZXhpc3Rpbmc9Z2V0Q29tcG9uZW50W25hbWVdXHJcblx0aWYoZXhpc3RpbmcpXHJcblx0XHRyZXR1cm4gZXhpc3RpbmdcclxuXHRsZXQgVHlwZT0oe2NoaWxkcmVufSk9PntcclxuXHRcdGlmKGNoaWxkcmVuKXtcclxuXHRcdFx0aWYoY2hpbGRyZW4ubGVuZ3RoPT0xKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW5bMF1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuICg8ZGl2PntjaGlsZHJlbn08L2Rpdj4pXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxuXHRUeXBlLmRpc3BsYXlOYW1lPW5hbWVcclxuXHRyZXR1cm4gZ2V0Q29tcG9uZW50W25hbWVdPVR5cGVcclxufVxyXG4iXX0=