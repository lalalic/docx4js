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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

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

			var buffer = this.doc.getPart(this.name).asNodeBuffer();
			this.content = (0, _cheerio.load)(buffer, { xmlMode: true });
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

			return _reactDom2.default.render(render(this.content("w\\:document").get(0)), container);
		}
	}, {
		key: "parse",
		value: function parse() {
			var parse = function parse(node) {
				var tagName = node.tagName,
				    childeNodes = node.childeNodes,
				    type = node.type;
			};

			return parse(this.content("w\\:document").get(0));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwibmFtZSIsImFzTm9kZUJ1ZmZlciIsImNvbnRlbnQiLCJ4bWxNb2RlIiwiY29udGFpbmVyIiwiY3VzdG9temllZENvbXBvbmVudHMiLCJyZW5kZXIiLCJub2RlIiwia2V5IiwidGFnTmFtZSIsImNoaWxkTm9kZXMiLCJkYXRhIiwiY3JlYXRlRWxlbWVudCIsImN1c3RvbWl6ZWRDb21wb25lbnRzIiwiZ2V0Q29tcG9uZW50IiwiY2hpbGRyZW4iLCJtYXAiLCJhIiwiZ2V0IiwicGFyc2UiLCJjaGlsZGVOb2RlcyIsImFyZ3VtZW50cyIsImV4aXN0aW5nIiwiVHlwZSIsImxlbmd0aCIsImRpc3BsYXlOYW1lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUFBOztBQUNOLFFBQUtBLElBQUwsbUNBQTBDQyxJQUExQyxDQUErQyxVQUFDQyxDQUFELEVBQUdDLEdBQUgsRUFBUztBQUN2RCxRQUFJQyxJQUFFLE9BQUtKLElBQUwsQ0FBVUcsR0FBVixDQUFOO0FBQ0EsUUFBSUUsT0FBS0QsRUFBRUUsSUFBRixDQUFPLE1BQVAsRUFBZUMsS0FBZixDQUFxQixHQUFyQixFQUEwQkMsR0FBMUIsRUFBVDtBQUNBLFdBQUtILElBQUwsSUFBVyxPQUFLSSxZQUFMLENBQWtCTCxFQUFFRSxJQUFGLENBQU8sUUFBUCxDQUFsQixDQUFYO0FBQ0EsSUFKRDs7QUFNQSxPQUFNSSxTQUFPLEtBQUtDLEdBQUwsQ0FBU0MsT0FBVCxDQUFpQixLQUFLQyxJQUF0QixFQUE0QkMsWUFBNUIsRUFBYjtBQUNBLFFBQUtDLE9BQUwsR0FBYSxtQkFBTUwsTUFBTixFQUFhLEVBQUNNLFNBQVEsSUFBVCxFQUFiLENBQWI7QUFDQTs7O3lCQUVNQyxTLEVBQWtDO0FBQUEsT0FBeEJDLG9CQUF3Qix1RUFBSCxFQUFHOztBQUN4QyxPQUFNQyxTQUFPLFNBQVBBLE1BQU8sQ0FBQ0MsSUFBRCxFQUFjO0FBQUEsUUFBUkMsR0FBUSx1RUFBSixDQUFJO0FBQUEsUUFDbkJDLE9BRG1CLEdBQ09GLElBRFAsQ0FDbkJFLE9BRG1CO0FBQUEsUUFDVkMsVUFEVSxHQUNPSCxJQURQLENBQ1ZHLFVBRFU7QUFBQSxRQUNDbEIsSUFERCxHQUNPZSxJQURQLENBQ0NmLElBREQ7O0FBRTFCLFFBQUdBLFFBQU0sTUFBVCxFQUNDLE9BQU87QUFBQTtBQUFBO0FBQU9lLFVBQUtJO0FBQVosS0FBUDtBQUNELFdBQU8sZ0JBQU1DLGFBQU4sQ0FBb0JDLHFCQUFxQkosT0FBckIsS0FBK0JLLGNBQWFMLE9BQWIsQ0FBbkQsRUFBeUUsRUFBQ0QsUUFBRCxFQUFLTyxVQUFVTCxhQUFhQSxXQUFXTSxHQUFYLENBQWUsVUFBQ0MsQ0FBRCxFQUFHNUIsQ0FBSDtBQUFBLGFBQU9pQixPQUFPVyxDQUFQLEVBQVM1QixDQUFULENBQVA7QUFBQSxNQUFmLENBQWIsR0FBa0QsRUFBakUsRUFBekUsQ0FBUDtBQUNBLElBTEQ7O0FBT0EsVUFBTyxtQkFBU2lCLE1BQVQsQ0FBZ0JBLE9BQU8sS0FBS0osT0FBTCxDQUFhLGNBQWIsRUFBNkJnQixHQUE3QixDQUFpQyxDQUFqQyxDQUFQLENBQWhCLEVBQTZEZCxTQUE3RCxDQUFQO0FBQ0E7OzswQkFFTTtBQUNOLE9BQU1lLFFBQU0sU0FBTkEsS0FBTSxPQUFNO0FBQUEsUUFDVlYsT0FEVSxHQUNrQkYsSUFEbEIsQ0FDVkUsT0FEVTtBQUFBLFFBQ0RXLFdBREMsR0FDa0JiLElBRGxCLENBQ0RhLFdBREM7QUFBQSxRQUNZNUIsSUFEWixHQUNrQmUsSUFEbEIsQ0FDWWYsSUFEWjtBQUdqQixJQUhEOztBQUtBLFVBQU8yQixNQUFNLEtBQUtqQixPQUFMLENBQWEsY0FBYixFQUE2QmdCLEdBQTdCLENBQWlDLENBQWpDLENBQU4sQ0FBUDtBQUNBOzs7K0JBRVlULE8sRUFBUTtBQUNwQixVQUFPSywrQkFBZ0JPLFNBQWhCLENBQVA7QUFDQTs7Ozs7Ozs7QUFHRixJQUFNUCxnQkFBYSxTQUFiQSxhQUFhLE9BQU07QUFDeEIsS0FBSVEsV0FBU1IsY0FBYWQsSUFBYixDQUFiO0FBQ0EsS0FBR3NCLFFBQUgsRUFDQyxPQUFPQSxRQUFQO0FBQ0QsS0FBSUMsT0FBSyxTQUFMQSxJQUFLLE9BQWM7QUFBQSxNQUFaUixRQUFZLFFBQVpBLFFBQVk7O0FBQ3RCLE1BQUdBLFFBQUgsRUFBWTtBQUNYLE9BQUdBLFNBQVNTLE1BQVQsSUFBaUIsQ0FBcEIsRUFBc0I7QUFDckIsV0FBT1QsU0FBUyxDQUFULENBQVA7QUFDQSxJQUZELE1BRUs7QUFDSixXQUFRO0FBQUE7QUFBQTtBQUFNQTtBQUFOLEtBQVI7QUFDQTtBQUNELEdBTkQsTUFNSztBQUNKLFVBQU8sSUFBUDtBQUNBO0FBQ0QsRUFWRDtBQVdBUSxNQUFLRSxXQUFMLEdBQWlCekIsSUFBakI7QUFDQSxRQUFPYyxjQUFhZCxJQUFiLElBQW1CdUIsSUFBMUI7QUFDQSxDQWpCRCIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IHtsb2FkIGFzIHBhcnNlfSBmcm9tIFwiY2hlZXJpb1wiXHJcbmltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIlxyXG5pbXBvcnQgUmVhY3RET00gZnJvbSBcInJlYWN0LWRvbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHJcblx0XHRjb25zdCBidWZmZXI9dGhpcy5kb2MuZ2V0UGFydCh0aGlzLm5hbWUpLmFzTm9kZUJ1ZmZlcigpXHJcblx0XHR0aGlzLmNvbnRlbnQ9cGFyc2UoYnVmZmVyLHt4bWxNb2RlOnRydWV9KVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNvbnRhaW5lcixjdXN0b216aWVkQ29tcG9uZW50cz17fSl7XHJcblx0XHRjb25zdCByZW5kZXI9KG5vZGUsa2V5PTApPT57XHJcblx0XHRcdGNvbnN0IHt0YWdOYW1lLCBjaGlsZE5vZGVzLHR5cGV9PW5vZGVcclxuXHRcdFx0aWYodHlwZT09XCJ0ZXh0XCIpXHJcblx0XHRcdFx0cmV0dXJuIDxzcGFuPntub2RlLmRhdGF9PC9zcGFuPlxyXG5cdFx0XHRyZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChjdXN0b21pemVkQ29tcG9uZW50c1t0YWdOYW1lXXx8Z2V0Q29tcG9uZW50KHRhZ05hbWUpLHtrZXksY2hpbGRyZW46IGNoaWxkTm9kZXMgPyBjaGlsZE5vZGVzLm1hcCgoYSxpKT0+cmVuZGVyKGEsaSkpIDogW119KVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBSZWFjdERPTS5yZW5kZXIocmVuZGVyKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSksIGNvbnRhaW5lcilcclxuXHR9XHJcblx0XHJcblx0cGFyc2UoKXtcclxuXHRcdGNvbnN0IHBhcnNlPW5vZGU9PntcclxuXHRcdFx0Y29uc3Qge3RhZ05hbWUsIGNoaWxkZU5vZGVzLCB0eXBlfT1ub2RlXHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4gcGFyc2UodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApKVxyXG5cdH1cclxuXHRcclxuXHRnZXRDb21wb25lbnQodGFnTmFtZSl7XHJcblx0XHRyZXR1cm4gZ2V0Q29tcG9uZW50KC4uLmFyZ3VtZW50cylcclxuXHR9XHJcbn1cclxuXHJcbmNvbnN0IGdldENvbXBvbmVudD1uYW1lPT57XHJcblx0bGV0IGV4aXN0aW5nPWdldENvbXBvbmVudFtuYW1lXVxyXG5cdGlmKGV4aXN0aW5nKVxyXG5cdFx0cmV0dXJuIGV4aXN0aW5nXHJcblx0bGV0IFR5cGU9KHtjaGlsZHJlbn0pPT57XHJcblx0XHRpZihjaGlsZHJlbil7XHJcblx0XHRcdGlmKGNoaWxkcmVuLmxlbmd0aD09MSl7XHJcblx0XHRcdFx0cmV0dXJuIGNoaWxkcmVuWzBdXHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdHJldHVybiAoPGRpdj57Y2hpbGRyZW59PC9kaXY+KVxyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHR9XHJcblx0VHlwZS5kaXNwbGF5TmFtZT1uYW1lXHJcblx0cmV0dXJuIGdldENvbXBvbmVudFtuYW1lXT1UeXBlXHJcbn1cclxuIl19