"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require("babel-runtime/helpers/get");

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _factory = require("./factory");

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

			(0, _get3.default)(_class.prototype.__proto__ || (0, _getPrototypeOf2.default)(_class.prototype), "_init", this).call(this);
			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});
		}
	}, {
		key: "render",
		value: function render() {
			return this.renderNode.apply(this, [this.content("w\\:document").get(0)].concat(Array.prototype.slice.call(arguments)));
		}
	}, {
		key: "renderNode",
		value: function renderNode(node) {
			var _this3 = this;

			var createComponent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _factory.getComponent;
			var identify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _factory.identify;
			var tagName = node.name,
			    children = node.children,
			    key = node.id,
			    parent = node.parent;

			if (node.type == "text") {
				if (parent.name == "w:t") {
					return node.data;
				}
				return null;
			}

			var type = tagName;
			var props = { key: key };

			if (identify) {
				var model = identify(node, this);
				if (!model) return null;

				if (typeof model == "string") {
					type = model;
				} else {
					var content = void 0;
					var _model = model;
					type = _model.type;
					content = _model.children;
					props = (0, _objectWithoutProperties3.default)(_model, ["type", "children"]);

					if (content !== undefined) children = content;
				}
			}

			return _react2.default.createElement.apply(_react2.default, [createComponent(type), props].concat((0, _toConsumableArray3.default)(children ? children.map(function (a) {
				return _this3.renderNode(a, createComponent, identify);
			}).filter(function (a) {
				return !!a;
			}) : [])));
		}
	}, {
		key: "parser",
		value: function parser() {
			var _this4 = this;

			var identify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _factory.identify;

			var opt = { xmlMode: true };
			var emitter = new _events2.default();
			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			var handler = new DocDomHandler(opt, function (el) {
				if (el.name) {
					if (identify) {
						var type = identify(el, _this4);

						emitter.emit(identify(el, _this4), el, _this4);
					} else emitter.emit(el.name, el, _this4);
				}
			});
			var parser = new Parser(handler, opt);
			return {
				start: function start() {
					parser.end(buffer);
					return this;
				},
				on: function on() {
					emitter.on.apply(emitter, arguments);
					return this;
				},
				get dom() {
					return handler.dom;
				}
			};
		}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJyZW5kZXJOb2RlIiwiY29udGVudCIsImdldCIsImFyZ3VtZW50cyIsIm5vZGUiLCJjcmVhdGVDb21wb25lbnQiLCJpZGVudGlmeSIsInRhZ05hbWUiLCJuYW1lIiwiY2hpbGRyZW4iLCJrZXkiLCJpZCIsInBhcmVudCIsImRhdGEiLCJwcm9wcyIsIm1vZGVsIiwidW5kZWZpbmVkIiwiY3JlYXRlRWxlbWVudCIsIm1hcCIsImEiLCJmaWx0ZXIiLCJvcHQiLCJ4bWxNb2RlIiwiZW1pdHRlciIsImJ1ZmZlciIsImRvYyIsImdldFBhcnQiLCJhc05vZGVCdWZmZXIiLCJoYW5kbGVyIiwiRG9jRG9tSGFuZGxlciIsImVsIiwiZW1pdCIsInBhcnNlciIsIlBhcnNlciIsInN0YXJ0IiwiZW5kIiwib24iLCJkb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7OzBCQUdRO0FBQUE7O0FBQ047QUFDQSxRQUFLQSxJQUFMLG1DQUEwQ0MsSUFBMUMsQ0FBK0MsVUFBQ0MsQ0FBRCxFQUFHQyxHQUFILEVBQVM7QUFDdkQsUUFBSUMsSUFBRSxPQUFLSixJQUFMLENBQVVHLEdBQVYsQ0FBTjtBQUNBLFFBQUlFLE9BQUtELEVBQUVFLElBQUYsQ0FBTyxNQUFQLEVBQWVDLEtBQWYsQ0FBcUIsR0FBckIsRUFBMEJDLEdBQTFCLEVBQVQ7QUFDQSxXQUFLSCxJQUFMLElBQVcsT0FBS0ksWUFBTCxDQUFrQkwsRUFBRUUsSUFBRixDQUFPLFFBQVAsQ0FBbEIsQ0FBWDtBQUNBLElBSkQ7QUFLQTs7OzJCQUVPO0FBQ1AsVUFBTyxLQUFLSSxV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aWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIlxyXG5pbXBvcnQge2lkZW50aWZ5IGFzIGRlZmF1bHRJZGVudGlmeSwgZ2V0Q29tcG9uZW50fSBmcm9tIFwiLi9mYWN0b3J5XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRfaW5pdCgpe1xyXG5cdFx0c3VwZXIuX2luaXQoKVxyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0dGhpc1t0eXBlXT10aGlzLmdldFJlbE9iamVjdCgkLmF0dHIoXCJUYXJnZXRcIikpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCl7XHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSwuLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cdFxyXG5cdHJlbmRlck5vZGUobm9kZSwgY3JlYXRlQ29tcG9uZW50PWdldENvbXBvbmVudCwgaWRlbnRpZnk9ZGVmYXVsdElkZW50aWZ5KXtcclxuXHRcdGxldCB7bmFtZTp0YWdOYW1lLCBjaGlsZHJlbixpZDprZXksIHBhcmVudH09bm9kZVxyXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XHJcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0bGV0IHR5cGU9dGFnTmFtZVxyXG5cdFx0bGV0IHByb3BzPXtrZXl9XHJcblx0XHRcclxuXHRcdGlmKGlkZW50aWZ5KXtcclxuXHRcdFx0bGV0IG1vZGVsPWlkZW50aWZ5KG5vZGUsdGhpcylcclxuXHRcdFx0aWYoIW1vZGVsKVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdFxyXG5cdFx0XHRpZih0eXBlb2YobW9kZWwpPT1cInN0cmluZ1wiKXtcclxuXHRcdFx0XHR0eXBlPW1vZGVsXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdGxldCBjb250ZW50O1xyXG5cdFx0XHRcdCh7dHlwZSwgY2hpbGRyZW46Y29udGVudCwgLi4ucHJvcHN9PW1vZGVsKTtcclxuXHRcdFx0XHRpZihjb250ZW50IT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0Y2hpbGRyZW49Y29udGVudFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0Y3JlYXRlQ29tcG9uZW50KHR5cGUpLFxyXG5cdFx0XHRcdHByb3BzLFxyXG5cdFx0XHRcdC4uLihjaGlsZHJlbiA/IGNoaWxkcmVuLm1hcChhPT50aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVDb21wb25lbnQsaWRlbnRpZnkpKS5maWx0ZXIoYT0+ISFhKSA6IFtdKVxyXG5cdFx0XHQpXHJcblx0fVxyXG4gXHJcblx0cGFyc2VyKGlkZW50aWZ5PWRlZmF1bHRJZGVudGlmeSl7XHJcblx0XHRsZXQgb3B0PXt4bWxNb2RlOnRydWV9XHJcblx0XHRsZXQgZW1pdHRlcj1uZXcgRXZlbnRFbWl0dGVyKClcclxuXHRcdGxldCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHRsZXQgaGFuZGxlcj1uZXcgRG9jRG9tSGFuZGxlcihvcHQsZWw9PntcclxuXHRcdFx0aWYoZWwubmFtZSl7XHJcblx0XHRcdFx0aWYoaWRlbnRpZnkpe1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9aWRlbnRpZnkoZWwsdGhpcylcclxuXHJcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoaWRlbnRpZnkoZWwsdGhpcyksZWwsdGhpcylcclxuXHJcblx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdGVtaXR0ZXIuZW1pdChlbC5uYW1lLGVsLHRoaXMpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRsZXQgcGFyc2VyPW5ldyBQYXJzZXIoaGFuZGxlcixvcHQpXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHRzdGFydCgpe1xyXG5cdFx0XHRcdHBhcnNlci5lbmQoYnVmZmVyKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdH0sXHJcblx0XHRcdG9uKCl7XHJcblx0XHRcdFx0ZW1pdHRlci5vbiguLi5hcmd1bWVudHMpXHJcblx0XHRcdFx0cmV0dXJuIHRoaXNcclxuXHRcdFx0fVxyXG5cdFx0XHQsZ2V0IGRvbSgpe1xyXG5cdFx0XHRcdHJldHVybiBoYW5kbGVyLmRvbVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcbiJdfQ==