"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getComponent = function getComponent(name) {
	var existing = getComponent[name];
	if (existing) return existing;
	var Type = function Type(props) {
		return null;
	};
	Type.displayName = name;
	return getComponent[name] = Type;
};

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
			var createComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getComponent;

			var render = function render(node) {
				var tagName = node.tagName,
				    children = node.children,
				    type = node.type,
				    key = node.id,
				    parent = node.parent;

				if (type == "text") {
					if (parent.name == "w:t") {
						return node.data;
					}
					return null;
				}

				return _react2.default.createElement.apply(_react2.default, [createComponent(tagName), { key: key }].concat((0, _toConsumableArray3.default)(children ? children.map(function (a, i) {
					return render(a, i);
				}).filter(function (a) {
					return !!a;
				}) : [])));
			};

			return render(this.content("w\\:document").get(0));
		}
	}, {
		key: "parser",
		value: function parser() {
			var _this3 = this;

			var identify = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _factory2.default;

			var opt = { xmlMode: true };
			var emitter = new _events2.default();
			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			var handler = new DocDomHandler(opt, function (el) {
				if (el.name) {
					if (identify) {
						var type = identify(el, _this3);

						emitter.emit(identify(el, _this3), el, _this3);
					} else emitter.emit(el.name, el, _this3);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiZ2V0Q29tcG9uZW50IiwiZXhpc3RpbmciLCJuYW1lIiwiVHlwZSIsImRpc3BsYXlOYW1lIiwicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJjcmVhdGVDb21wb25lbnQiLCJyZW5kZXIiLCJ0YWdOYW1lIiwibm9kZSIsImNoaWxkcmVuIiwia2V5IiwiaWQiLCJwYXJlbnQiLCJkYXRhIiwiY3JlYXRlRWxlbWVudCIsIm1hcCIsImEiLCJmaWx0ZXIiLCJjb250ZW50IiwiZ2V0IiwiaWRlbnRpZnkiLCJvcHQiLCJ4bWxNb2RlIiwiZW1pdHRlciIsImJ1ZmZlciIsImRvYyIsImdldFBhcnQiLCJhc05vZGVCdWZmZXIiLCJoYW5kbGVyIiwiRG9jRG9tSGFuZGxlciIsImVsIiwiZW1pdCIsInBhcnNlciIsIlBhcnNlciIsInN0YXJ0IiwiZW5kIiwib24iLCJhcmd1bWVudHMiLCJkb20iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBTUEsZUFBYSxTQUFiQSxZQUFhLE9BQU07QUFDeEIsS0FBSUMsV0FBU0QsYUFBYUUsSUFBYixDQUFiO0FBQ0EsS0FBR0QsUUFBSCxFQUNDLE9BQU9BLFFBQVA7QUFDRCxLQUFJRSxPQUFLLFNBQUxBLElBQUs7QUFBQSxTQUFPLElBQVA7QUFBQSxFQUFUO0FBQ0FBLE1BQUtDLFdBQUwsR0FBaUJGLElBQWpCO0FBQ0EsUUFBT0YsYUFBYUUsSUFBYixJQUFtQkMsSUFBMUI7QUFDQSxDQVBEOzs7Ozs7Ozs7Ozs7MEJBVVE7QUFBQTs7QUFDTjtBQUNBLFFBQUtFLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZUMsS0FBZixDQUFxQixHQUFyQixFQUEwQkMsR0FBMUIsRUFBVDtBQUNBLFdBQUtILElBQUwsSUFBVyxPQUFLSSxZQUFMLENBQWtCTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFsQixDQUFYO0FBQ0EsSUFKRDtBQUtBOzs7MkJBRW1DO0FBQUEsT0FBN0JJLGVBQTZCLHVFQUFiZixZQUFhOztBQUNuQyxPQUFNZ0IsU0FBTyxTQUFQQSxNQUFPLE9BQU07QUFBQSxRQUNYQyxPQURXLEdBQzRCQyxJQUQ1QixDQUNYRCxPQURXO0FBQUEsUUFDRkUsUUFERSxHQUM0QkQsSUFENUIsQ0FDRkMsUUFERTtBQUFBLFFBQ09ULElBRFAsR0FDNEJRLElBRDVCLENBQ09SLElBRFA7QUFBQSxRQUNlVSxHQURmLEdBQzRCRixJQUQ1QixDQUNZRyxFQURaO0FBQUEsUUFDb0JDLE1BRHBCLEdBQzRCSixJQUQ1QixDQUNvQkksTUFEcEI7O0FBRWxCLFFBQUdaLFFBQU0sTUFBVCxFQUFnQjtBQUNmLFNBQUdZLE9BQU9wQixJQUFQLElBQWEsS0FBaEIsRUFBc0I7QUFDckIsYUFBT2dCLEtBQUtLLElBQVo7QUFDQTtBQUNELFlBQU8sSUFBUDtBQUNBOztBQUVELFdBQU8sZ0JBQU1DLGFBQU4seUJBQ0xULGdCQUFnQkUsT0FBaEIsQ0FESyxFQUVMLEVBQUNHLFFBQUQsRUFGSywwQ0FHREQsV0FBV0EsU0FBU00sR0FBVCxDQUFhLFVBQUNDLENBQUQsRUFBR25CLENBQUg7QUFBQSxZQUFPUyxPQUFPVSxDQUFQLEVBQVNuQixDQUFULENBQVA7QUFBQSxLQUFiLEVBQWlDb0IsTUFBakMsQ0FBd0M7QUFBQSxZQUFHLENBQUMsQ0FBQ0QsQ0FBTDtBQUFBLEtBQXhDLENBQVgsR0FBNkQsRUFINUQsR0FBUDtBQUtBLElBZEQ7O0FBZ0JBLFVBQU9WLE9BQU8sS0FBS1ksT0FBTCxDQUFhLGNBQWIsRUFBNkJDLEdBQTdCLENBQWlDLENBQWpDLENBQVAsQ0FBUDtBQUNBOzs7MkJBRStCO0FBQUE7O0FBQUEsT0FBekJDLFFBQXlCOztBQUMvQixPQUFJQyxNQUFJLEVBQUNDLFNBQVEsSUFBVCxFQUFSO0FBQ0EsT0FBSUMsVUFBUSxzQkFBWjtBQUNBLE9BQUlDLFNBQU8sS0FBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCLEtBQUtsQyxJQUF0QixFQUE0Qm1DLFlBQTVCLEVBQVg7QUFDQSxPQUFJQyxVQUFRLElBQUlDLGFBQUosQ0FBa0JSLEdBQWxCLEVBQXNCLGNBQUk7QUFDckMsUUFBR1MsR0FBR3RDLElBQU4sRUFBVztBQUNWLFNBQUc0QixRQUFILEVBQVk7QUFDWCxVQUFJcEIsT0FBS29CLFNBQVNVLEVBQVQsU0FBVDs7QUFFQVAsY0FBUVEsSUFBUixDQUFhWCxTQUFTVSxFQUFULFNBQWIsRUFBK0JBLEVBQS9CO0FBRUEsTUFMRCxNQU1DUCxRQUFRUSxJQUFSLENBQWFELEdBQUd0QyxJQUFoQixFQUFxQnNDLEVBQXJCO0FBQ0Q7QUFDRCxJQVZXLENBQVo7QUFXQSxPQUFJRSxTQUFPLElBQUlDLE1BQUosQ0FBV0wsT0FBWCxFQUFtQlAsR0FBbkIsQ0FBWDtBQUNBLFVBQU87QUFDTmEsU0FETSxtQkFDQztBQUNORixZQUFPRyxHQUFQLENBQVdYLE1BQVg7QUFDQSxZQUFPLElBQVA7QUFDQSxLQUpLO0FBS05ZLE1BTE0sZ0JBS0Y7QUFDSGIsYUFBUWEsRUFBUixnQkFBY0MsU0FBZDtBQUNBLFlBQU8sSUFBUDtBQUNBLEtBUks7QUFTTCxRQUFJQyxHQUFKLEdBQVM7QUFDVCxZQUFPVixRQUFRVSxHQUFmO0FBQ0E7QUFYSyxJQUFQO0FBYUEiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIlxyXG5pbXBvcnQgZGVmYXVsdElkZW50aWZ5IGZyb20gXCIuL2ZhY3RvcnlcIlxyXG5cclxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9PntcclxuXHRsZXQgZXhpc3Rpbmc9Z2V0Q29tcG9uZW50W25hbWVdXHJcblx0aWYoZXhpc3RpbmcpXHJcblx0XHRyZXR1cm4gZXhpc3RpbmdcclxuXHRsZXQgVHlwZT1wcm9wcz0+bnVsbFxyXG5cdFR5cGUuZGlzcGxheU5hbWU9bmFtZVxyXG5cdHJldHVybiBnZXRDb21wb25lbnRbbmFtZV09VHlwZVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcihjcmVhdGVDb21wb25lbnQ9Z2V0Q29tcG9uZW50KXtcclxuXHRcdGNvbnN0IHJlbmRlcj1ub2RlPT57XHJcblx0XHRcdGNvbnN0IHt0YWdOYW1lLCBjaGlsZHJlbix0eXBlLGlkOmtleSwgcGFyZW50fT1ub2RlXHJcblx0XHRcdGlmKHR5cGU9PVwidGV4dFwiKXtcclxuXHRcdFx0XHRpZihwYXJlbnQubmFtZT09XCJ3OnRcIil7XHJcblx0XHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJldHVybiBudWxsXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxyXG5cdFx0XHRcdFx0Y3JlYXRlQ29tcG9uZW50KHRhZ05hbWUpLFxyXG5cdFx0XHRcdFx0e2tleX0sXHJcblx0XHRcdFx0XHQuLi4oY2hpbGRyZW4gPyBjaGlsZHJlbi5tYXAoKGEsaSk9PnJlbmRlcihhLGkpKS5maWx0ZXIoYT0+ISFhKSA6IFtdKVxyXG5cdFx0XHRcdClcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gcmVuZGVyKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSlcclxuXHR9XHJcblxyXG5cdHBhcnNlcihpZGVudGlmeT1kZWZhdWx0SWRlbnRpZnkpe1xyXG5cdFx0bGV0IG9wdD17eG1sTW9kZTp0cnVlfVxyXG5cdFx0bGV0IGVtaXR0ZXI9bmV3IEV2ZW50RW1pdHRlcigpXHJcblx0XHRsZXQgYnVmZmVyPXRoaXMuZG9jLmdldFBhcnQodGhpcy5uYW1lKS5hc05vZGVCdWZmZXIoKVxyXG5cdFx0bGV0IGhhbmRsZXI9bmV3IERvY0RvbUhhbmRsZXIob3B0LGVsPT57XHJcblx0XHRcdGlmKGVsLm5hbWUpe1xyXG5cdFx0XHRcdGlmKGlkZW50aWZ5KXtcclxuXHRcdFx0XHRcdGxldCB0eXBlPWlkZW50aWZ5KGVsLHRoaXMpXHJcblxyXG5cdFx0XHRcdFx0ZW1pdHRlci5lbWl0KGlkZW50aWZ5KGVsLHRoaXMpLGVsLHRoaXMpXHJcblxyXG5cdFx0XHRcdH1lbHNlXHJcblx0XHRcdFx0XHRlbWl0dGVyLmVtaXQoZWwubmFtZSxlbCx0aGlzKVxyXG5cdFx0XHR9XHJcblx0XHR9KVxyXG5cdFx0bGV0IHBhcnNlcj1uZXcgUGFyc2VyKGhhbmRsZXIsb3B0KVxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0c3RhcnQoKXtcclxuXHRcdFx0XHRwYXJzZXIuZW5kKGJ1ZmZlcilcclxuXHRcdFx0XHRyZXR1cm4gdGhpc1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRvbigpe1xyXG5cdFx0XHRcdGVtaXR0ZXIub24oLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdHJldHVybiB0aGlzXHJcblx0XHRcdH1cclxuXHRcdFx0LGdldCBkb20oKXtcclxuXHRcdFx0XHRyZXR1cm4gaGFuZGxlci5kb21cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4iXX0=