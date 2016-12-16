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
		value: function parse() {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJidWZmZXIiLCJkb2MiLCJnZXRQYXJ0IiwibmFtZSIsImFzTm9kZUJ1ZmZlciIsImNvbnRlbnQiLCJ4bWxNb2RlIiwiY29udGFpbmVyIiwiY3VzdG9temllZENvbXBvbmVudHMiLCJyZW5kZXIiLCJub2RlIiwia2V5IiwidGFnTmFtZSIsImNoaWxkTm9kZXMiLCJkYXRhIiwiY3JlYXRlRWxlbWVudCIsImN1c3RvbWl6ZWRDb21wb25lbnRzIiwiZ2V0Q29tcG9uZW50IiwiY2hpbGRyZW4iLCJtYXAiLCJhIiwiZ2V0IiwiYXJndW1lbnRzIiwiZXhpc3RpbmciLCJUeXBlIiwibGVuZ3RoIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OzBCQUdRO0FBQUE7O0FBQ04sUUFBS0EsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixFQUFUO0FBQ0EsV0FBS0gsSUFBTCxJQUFXLE9BQUtJLFlBQUwsQ0FBa0JMLEVBQUVFLElBQUYsQ0FBTyxRQUFQLENBQWxCLENBQVg7QUFDQSxJQUpEOztBQU1BLE9BQU1JLFNBQU8sS0FBS0MsR0FBTCxDQUFTQyxPQUFULENBQWlCLEtBQUtDLElBQXRCLEVBQTRCQyxZQUE1QixFQUFiO0FBQ0EsUUFBS0MsT0FBTCxHQUFhLG1CQUFNTCxNQUFOLEVBQWEsRUFBQ00sU0FBUSxJQUFULEVBQWIsQ0FBYjtBQUNBOzs7eUJBRU1DLFMsRUFBa0M7QUFBQSxPQUF4QkMsb0JBQXdCLHVFQUFILEVBQUc7O0FBQ3hDLE9BQU1DLFNBQU8sU0FBUEEsTUFBTyxDQUFDQyxJQUFELEVBQWM7QUFBQSxRQUFSQyxHQUFRLHVFQUFKLENBQUk7QUFBQSxRQUNuQkMsT0FEbUIsR0FDT0YsSUFEUCxDQUNuQkUsT0FEbUI7QUFBQSxRQUNWQyxVQURVLEdBQ09ILElBRFAsQ0FDVkcsVUFEVTtBQUFBLFFBQ0NsQixJQURELEdBQ09lLElBRFAsQ0FDQ2YsSUFERDs7QUFFMUIsUUFBR0EsUUFBTSxNQUFULEVBQ0MsT0FBTztBQUFBO0FBQUE7QUFBT2UsVUFBS0k7QUFBWixLQUFQO0FBQ0QsV0FBTyxnQkFBTUMsYUFBTixDQUFvQkMscUJBQXFCSixPQUFyQixLQUErQkssY0FBYUwsT0FBYixDQUFuRCxFQUF5RSxFQUFDRCxRQUFELEVBQUtPLFVBQVVMLGFBQWFBLFdBQVdNLEdBQVgsQ0FBZSxVQUFDQyxDQUFELEVBQUc1QixDQUFIO0FBQUEsYUFBT2lCLE9BQU9XLENBQVAsRUFBUzVCLENBQVQsQ0FBUDtBQUFBLE1BQWYsQ0FBYixHQUFrRCxFQUFqRSxFQUF6RSxDQUFQO0FBQ0EsSUFMRDs7QUFPQSxVQUFPLG1CQUFTaUIsTUFBVCxDQUFnQkEsT0FBTyxLQUFLSixPQUFMLENBQWEsY0FBYixFQUE2QmdCLEdBQTdCLENBQWlDLENBQWpDLENBQVAsQ0FBaEIsRUFBNkRkLFNBQTdELENBQVA7QUFDQTs7OzBCQUVNLENBRU47OzsrQkFFWUssTyxFQUFRO0FBQ3BCLFVBQU9LLCtCQUFnQkssU0FBaEIsQ0FBUDtBQUNBOzs7Ozs7OztBQUdGLElBQU1MLGdCQUFhLFNBQWJBLGFBQWEsT0FBTTtBQUN4QixLQUFJTSxXQUFTTixjQUFhZCxJQUFiLENBQWI7QUFDQSxLQUFHb0IsUUFBSCxFQUNDLE9BQU9BLFFBQVA7QUFDRCxLQUFJQyxPQUFLLFNBQUxBLElBQUssT0FBYztBQUFBLE1BQVpOLFFBQVksUUFBWkEsUUFBWTs7QUFDdEIsTUFBR0EsUUFBSCxFQUFZO0FBQ1gsT0FBR0EsU0FBU08sTUFBVCxJQUFpQixDQUFwQixFQUFzQjtBQUNyQixXQUFPUCxTQUFTLENBQVQsQ0FBUDtBQUNBLElBRkQsTUFFSztBQUNKLFdBQVE7QUFBQTtBQUFBO0FBQU1BO0FBQU4sS0FBUjtBQUNBO0FBQ0QsR0FORCxNQU1LO0FBQ0osVUFBTyxJQUFQO0FBQ0E7QUFDRCxFQVZEO0FBV0FNLE1BQUtFLFdBQUwsR0FBaUJ2QixJQUFqQjtBQUNBLFFBQU9jLGNBQWFkLElBQWIsSUFBbUJxQixJQUExQjtBQUNBLENBakJEIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQge2xvYWQgYXMgcGFyc2V9IGZyb20gXCJjaGVlcmlvXCJcclxuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiXHJcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRfaW5pdCgpe1xyXG5cdFx0dGhpcy5yZWxzKGBSZWxhdGlvbnNoaXBbVGFyZ2V0JD1cIi54bWxcIl1gKS5lYWNoKChpLHJlbCk9PntcclxuXHRcdFx0bGV0ICQ9dGhpcy5yZWxzKHJlbClcclxuXHRcdFx0bGV0IHR5cGU9JC5hdHRyKFwiVHlwZVwiKS5zcGxpdChcIi9cIikucG9wKClcclxuXHRcdFx0dGhpc1t0eXBlXT10aGlzLmdldFJlbE9iamVjdCgkLmF0dHIoXCJUYXJnZXRcIikpXHJcblx0XHR9KVxyXG5cclxuXHRcdGNvbnN0IGJ1ZmZlcj10aGlzLmRvYy5nZXRQYXJ0KHRoaXMubmFtZSkuYXNOb2RlQnVmZmVyKClcclxuXHRcdHRoaXMuY29udGVudD1wYXJzZShidWZmZXIse3htbE1vZGU6dHJ1ZX0pXHJcblx0fVxyXG5cclxuXHRyZW5kZXIoY29udGFpbmVyLGN1c3RvbXppZWRDb21wb25lbnRzPXt9KXtcclxuXHRcdGNvbnN0IHJlbmRlcj0obm9kZSxrZXk9MCk9PntcclxuXHRcdFx0Y29uc3Qge3RhZ05hbWUsIGNoaWxkTm9kZXMsdHlwZX09bm9kZVxyXG5cdFx0XHRpZih0eXBlPT1cInRleHRcIilcclxuXHRcdFx0XHRyZXR1cm4gPHNwYW4+e25vZGUuZGF0YX08L3NwYW4+XHJcblx0XHRcdHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KGN1c3RvbWl6ZWRDb21wb25lbnRzW3RhZ05hbWVdfHxnZXRDb21wb25lbnQodGFnTmFtZSkse2tleSxjaGlsZHJlbjogY2hpbGROb2RlcyA/IGNoaWxkTm9kZXMubWFwKChhLGkpPT5yZW5kZXIoYSxpKSkgOiBbXX0pXHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIFJlYWN0RE9NLnJlbmRlcihyZW5kZXIodGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApKSwgY29udGFpbmVyKVxyXG5cdH1cclxuXHRcclxuXHRwYXJzZSgpe1xyXG5cdFx0XHJcblx0fVxyXG5cdFxyXG5cdGdldENvbXBvbmVudCh0YWdOYW1lKXtcclxuXHRcdHJldHVybiBnZXRDb21wb25lbnQoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxufVxyXG5cclxuY29uc3QgZ2V0Q29tcG9uZW50PW5hbWU9PntcclxuXHRsZXQgZXhpc3Rpbmc9Z2V0Q29tcG9uZW50W25hbWVdXHJcblx0aWYoZXhpc3RpbmcpXHJcblx0XHRyZXR1cm4gZXhpc3RpbmdcclxuXHRsZXQgVHlwZT0oe2NoaWxkcmVufSk9PntcclxuXHRcdGlmKGNoaWxkcmVuKXtcclxuXHRcdFx0aWYoY2hpbGRyZW4ubGVuZ3RoPT0xKXtcclxuXHRcdFx0XHRyZXR1cm4gY2hpbGRyZW5bMF1cclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0cmV0dXJuICg8ZGl2PntjaGlsZHJlbn08L2Rpdj4pXHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRyZXR1cm4gbnVsbFxyXG5cdFx0fVxyXG5cdH1cclxuXHRUeXBlLmRpc3BsYXlOYW1lPW5hbWVcclxuXHRyZXR1cm4gZ2V0Q29tcG9uZW50W25hbWVdPVR5cGVcclxufVxyXG4iXX0=