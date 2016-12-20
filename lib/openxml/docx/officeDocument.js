"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _freeze = require("babel-runtime/core-js/object/freeze");

var _freeze2 = _interopRequireDefault(_freeze);

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
			(0, _freeze2.default)(this.content);
			return this.renderNode.apply(this, [this.content("w\\:document").get(0)].concat(Array.prototype.slice.call(arguments)));
		}
	}, {
		key: "renderNode",
		value: function renderNode(node) {
			var _this3 = this;

			var createElement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _factory.createElement;
			var identify = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _factory.identify;
			var tagName = node.name,
			    children = node.children,
			    id = node.id,
			    parent = node.parent;

			if (node.type == "text") {
				if (parent.name == "w:t") {
					return node.data;
				}
				return null;
			}

			var type = tagName;
			var props = {};

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
			props.key = id;
			props.node = node;
			props.type = type;

			var childElements = [];
			if (children && children.length) {
				childElements = children.map(function (a) {
					return a ? _this3.renderNode(a, createElement, identify) : null;
				}).filter(function (a) {
					return !!a;
				});
			}

			return createElement(type, props, childElements);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJjb250ZW50IiwicmVuZGVyTm9kZSIsImdldCIsImFyZ3VtZW50cyIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJ0YWdOYW1lIiwibmFtZSIsImNoaWxkcmVuIiwiaWQiLCJwYXJlbnQiLCJkYXRhIiwicHJvcHMiLCJtb2RlbCIsInVuZGVmaW5lZCIsImtleSIsImNoaWxkRWxlbWVudHMiLCJsZW5ndGgiLCJtYXAiLCJhIiwiZmlsdGVyIiwib3B0IiwieG1sTW9kZSIsImVtaXR0ZXIiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwiYXNOb2RlQnVmZmVyIiwiaGFuZGxlciIsIkRvY0RvbUhhbmRsZXIiLCJlbCIsImVtaXQiLCJwYXJzZXIiLCJQYXJzZXIiLCJzdGFydCIsImVuZCIsIm9uIiwiZG9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7MEJBR1E7QUFBQTs7QUFDTjtBQUNBLFFBQUtBLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZUMsS0FBZixDQUFxQixHQUFyQixFQUEwQkMsR0FBMUIsRUFBVDtBQUNBLFdBQUtILElBQUwsSUFBVyxPQUFLSSxZQUFMLENBQWtCTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFsQixDQUFYO0FBQ0EsSUFKRDtBQUtBOzs7MkJBRU87QUFDUCx5QkFBYyxLQUFLSSxP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O0FBS05ZLE1BTE0sZ0JBS0Y7QUFDSGIsYUFBUWEsRUFBUixnQkFBY2xDLFNBQWQ7QUFDQSxZQUFPLElBQVA7QUFDQSxLQVJLO0FBU0wsUUFBSW1DLEdBQUosR0FBUztBQUNULFlBQU9ULFFBQVFTLEdBQWY7QUFDQTtBQVhLLElBQVA7QUFhQSIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tIFwiZXZlbnRzXCJcclxuaW1wb3J0IHtpZGVudGlmeSBhcyBkZWZhdWx0SWRlbnRpZnksIGNyZWF0ZUVsZW1lbnQgYXMgZGVmYXVsdENyZWF0ZUVsZW1lbnR9IGZyb20gXCIuL2ZhY3RvcnlcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBQYXJ0e1xyXG5cdF9pbml0KCl7XHJcblx0XHRzdXBlci5faW5pdCgpXHJcblx0XHR0aGlzLnJlbHMoYFJlbGF0aW9uc2hpcFtUYXJnZXQkPVwiLnhtbFwiXWApLmVhY2goKGkscmVsKT0+e1xyXG5cdFx0XHRsZXQgJD10aGlzLnJlbHMocmVsKVxyXG5cdFx0XHRsZXQgdHlwZT0kLmF0dHIoXCJUeXBlXCIpLnNwbGl0KFwiL1wiKS5wb3AoKVxyXG5cdFx0XHR0aGlzW3R5cGVdPXRoaXMuZ2V0UmVsT2JqZWN0KCQuYXR0cihcIlRhcmdldFwiKSlcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoKXtcclxuXHRcdE9iamVjdC5mcmVlemUodGhpcy5jb250ZW50KVxyXG5cdFx0cmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3XFxcXDpkb2N1bWVudFwiKS5nZXQoMCksLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0cmVuZGVyTm9kZShub2RlLCBjcmVhdGVFbGVtZW50PWRlZmF1bHRDcmVhdGVFbGVtZW50LCBpZGVudGlmeT1kZWZhdWx0SWRlbnRpZnkpe1xyXG5cdFx0bGV0IHtuYW1lOnRhZ05hbWUsIGNoaWxkcmVuLGlkLCBwYXJlbnR9PW5vZGVcclxuXHRcdGlmKG5vZGUudHlwZT09XCJ0ZXh0XCIpe1xyXG5cdFx0XHRpZihwYXJlbnQubmFtZT09XCJ3OnRcIil7XHJcblx0XHRcdFx0cmV0dXJuIG5vZGUuZGF0YVxyXG5cdFx0XHR9XHJcblx0XHRcdHJldHVybiBudWxsXHJcblx0XHR9XHJcblxyXG5cdFx0bGV0IHR5cGU9dGFnTmFtZVxyXG5cdFx0bGV0IHByb3BzPXt9XHJcblxyXG5cdFx0aWYoaWRlbnRpZnkpe1xyXG5cdFx0XHRsZXQgbW9kZWw9aWRlbnRpZnkobm9kZSx0aGlzKVxyXG5cdFx0XHRpZighbW9kZWwpXHJcblx0XHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHRcdGlmKHR5cGVvZihtb2RlbCk9PVwic3RyaW5nXCIpe1xyXG5cdFx0XHRcdHR5cGU9bW9kZWxcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0bGV0IGNvbnRlbnQ7XHJcblx0XHRcdFx0KHt0eXBlLCBjaGlsZHJlbjpjb250ZW50LCAuLi5wcm9wc309bW9kZWwpO1xyXG5cdFx0XHRcdGlmKGNvbnRlbnQhPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRjaGlsZHJlbj1jb250ZW50XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHByb3BzLmtleT1pZFxyXG5cdFx0cHJvcHMubm9kZT1ub2RlXHJcblx0XHRwcm9wcy50eXBlPXR5cGVcclxuXHRcdFxyXG5cdFx0bGV0IGNoaWxkRWxlbWVudHM9W11cclxuXHRcdGlmKGNoaWxkcmVuICYmIGNoaWxkcmVuLmxlbmd0aCl7XHJcblx0XHRcdGNoaWxkRWxlbWVudHM9Y2hpbGRyZW4ubWFwKGE9PmEgPyB0aGlzLnJlbmRlck5vZGUoYSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KSA6IG51bGwpXHJcblx0XHRcdFx0LmZpbHRlcihhPT4hIWEpXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGNyZWF0ZUVsZW1lbnQoXHJcblx0XHRcdFx0dHlwZSxcclxuXHRcdFx0XHRwcm9wcyxcclxuXHRcdFx0XHRjaGlsZEVsZW1lbnRzXHJcblx0XHRcdClcclxuXHR9XHJcblxyXG5cdHBhcnNlcihpZGVudGlmeT1kZWZhdWx0SWRlbnRpZnkpe1xyXG5cdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxyXG5cdFx0bGV0IGVtaXR0ZXI9bmV3IEV2ZW50RW1pdHRlcigpXHJcblx0XHRsZXQgYnVmZmVyPXRoaXMuZG9jLmdldFBhcnQodGhpcy5uYW1lKS5hc05vZGVCdWZmZXIoKVxyXG5cdFx0bGV0IGhhbmRsZXI9bmV3IERvY0RvbUhhbmRsZXIob3B0LGVsPT57XHJcblx0XHRcdGlmKGVsLm5hbWUpe1xyXG5cdFx0XHRcdGlmKGlkZW50aWZ5KXtcclxuXHRcdFx0XHRcdGxldCB0eXBlPWlkZW50aWZ5KGVsLHRoaXMpXHJcblxyXG5cdFx0XHRcdFx0ZW1pdHRlci5lbWl0KGlkZW50aWZ5KGVsLHRoaXMpLGVsLHRoaXMpXHJcblxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoZWwubmFtZSxlbCx0aGlzKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bGV0IHBhcnNlcj1uZXcgUGFyc2VyKGhhbmRsZXIsb3B0KVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQoKXtcclxuXHRcdFx0XHRwYXJzZXIuZW5kKGJ1ZmZlcilcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbigpe1xyXG5cdFx0XHRcdGVtaXR0ZXIub24oLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdH1cclxuXHRcdFx0LGdldCBkb20oKXtcclxuXHRcdFx0XHRyZXR1cm4gaGFuZGxlci5kb21cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=