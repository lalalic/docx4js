"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _events = require("events");

var _events2 = _interopRequireDefault(_events);

var _factory = require("./factory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
			var _this2 = this;

			_get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).call(this);
			this.rels("Relationship[Target$=\".xml\"]").each(function (i, rel) {
				var $ = _this2.rels(rel);
				var type = $.attr("Type").split("/").pop();
				_this2[type] = _this2.getRelObject($.attr("Target"));
			});
		}
	}, {
		key: "render",
		value: function render() {
			Object.freeze(this.content);
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
					props = _objectWithoutProperties(_model, ["type", "children"]);

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
	}]);

	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsicmVscyIsImVhY2giLCJpIiwicmVsIiwiJCIsInR5cGUiLCJhdHRyIiwic3BsaXQiLCJwb3AiLCJnZXRSZWxPYmplY3QiLCJPYmplY3QiLCJmcmVlemUiLCJjb250ZW50IiwicmVuZGVyTm9kZSIsImdldCIsImFyZ3VtZW50cyIsIm5vZGUiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJ0YWdOYW1lIiwibmFtZSIsImNoaWxkcmVuIiwiaWQiLCJwYXJlbnQiLCJkYXRhIiwicHJvcHMiLCJtb2RlbCIsInVuZGVmaW5lZCIsImtleSIsImNoaWxkRWxlbWVudHMiLCJsZW5ndGgiLCJtYXAiLCJhIiwiZmlsdGVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkFHUTtBQUFBOztBQUNOO0FBQ0EsUUFBS0EsSUFBTCxtQ0FBMENDLElBQTFDLENBQStDLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3ZELFFBQUlDLElBQUUsT0FBS0osSUFBTCxDQUFVRyxHQUFWLENBQU47QUFDQSxRQUFJRSxPQUFLRCxFQUFFRSxJQUFGLENBQU8sTUFBUCxFQUFlQyxLQUFmLENBQXFCLEdBQXJCLEVBQTBCQyxHQUExQixFQUFUO0FBQ0EsV0FBS0gsSUFBTCxJQUFXLE9BQUtJLFlBQUwsQ0FBa0JMLEVBQUVFLElBQUYsQ0FBTyxRQUFQLENBQWxCLENBQVg7QUFDQSxJQUpEO0FBS0E7OzsyQkFFTztBQUNQSSxVQUFPQyxNQUFQLENBQWMsS0FBS0MsT0FBbkI7QUFDQSxVQUFPLEtBQUtDLFVBQUwsY0FBZ0IsS0FBS0QsT0FBTCxDQUFhLGNBQWIsRUFBNkJFLEdBQTdCLENBQWlDLENBQWpDLENBQWhCLG9DQUF1REMsU0FBdkQsR0FBUDtBQUNBOzs7NkJBRVVDLEksRUFBbUU7QUFBQTs7QUFBQSxPQUE3REMsYUFBNkQ7QUFBQSxPQUF6QkMsUUFBeUI7QUFBQSxPQUNuRUMsT0FEbUUsR0FDckNILElBRHFDLENBQ3hFSSxJQUR3RTtBQUFBLE9BQzFEQyxRQUQwRCxHQUNyQ0wsSUFEcUMsQ0FDMURLLFFBRDBEO0FBQUEsT0FDakRDLEVBRGlELEdBQ3JDTixJQURxQyxDQUNqRE0sRUFEaUQ7QUFBQSxPQUM3Q0MsTUFENkMsR0FDckNQLElBRHFDLENBQzdDTyxNQUQ2Qzs7QUFFN0UsT0FBR1AsS0FBS1gsSUFBTCxJQUFXLE1BQWQsRUFBcUI7QUFDcEIsUUFBR2tCLE9BQU9ILElBQVAsSUFBYSxLQUFoQixFQUFzQjtBQUNyQixZQUFPSixLQUFLUSxJQUFaO0FBQ0E7QUFDRCxXQUFPLElBQVA7QUFDQTs7QUFFRCxPQUFJbkIsT0FBS2MsT0FBVDtBQUNBLE9BQUlNLFFBQU0sRUFBVjs7QUFFQSxPQUFHUCxRQUFILEVBQVk7QUFDWCxRQUFJUSxRQUFNUixTQUFTRixJQUFULEVBQWMsSUFBZCxDQUFWO0FBQ0EsUUFBRyxDQUFDVSxLQUFKLEVBQ0MsT0FBTyxJQUFQOztBQUVELFFBQUcsT0FBT0EsS0FBUCxJQUFlLFFBQWxCLEVBQTJCO0FBQzFCckIsWUFBS3FCLEtBQUw7QUFDQSxLQUZELE1BRUs7QUFDSixTQUFJZCxnQkFBSjtBQURJLGtCQUVnQ2MsS0FGaEM7QUFFRnJCLFNBRkUsVUFFRkEsSUFGRTtBQUVhTyxZQUZiLFVBRUlTLFFBRko7QUFFeUJJLFVBRnpCOztBQUdKLFNBQUdiLFlBQVVlLFNBQWIsRUFDQ04sV0FBU1QsT0FBVDtBQUNEO0FBQ0Q7QUFDRGEsU0FBTUcsR0FBTixHQUFVTixFQUFWO0FBQ0FHLFNBQU1ULElBQU4sR0FBV0EsSUFBWDtBQUNBUyxTQUFNcEIsSUFBTixHQUFXQSxJQUFYOztBQUVBLE9BQUl3QixnQkFBYyxFQUFsQjtBQUNBLE9BQUdSLFlBQVlBLFNBQVNTLE1BQXhCLEVBQStCO0FBQzlCRCxvQkFBY1IsU0FBU1UsR0FBVCxDQUFhO0FBQUEsWUFBR0MsSUFBSSxPQUFLbkIsVUFBTCxDQUFnQm1CLENBQWhCLEVBQWtCZixhQUFsQixFQUFnQ0MsUUFBaEMsQ0FBSixHQUFnRCxJQUFuRDtBQUFBLEtBQWIsRUFDWmUsTUFEWSxDQUNMO0FBQUEsWUFBRyxDQUFDLENBQUNELENBQUw7QUFBQSxLQURLLENBQWQ7QUFFQTs7QUFFRCxVQUFPZixjQUNMWixJQURLLEVBRUxvQixLQUZLLEVBR0xJLGFBSEssQ0FBUDtBQUtBIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gXCJldmVudHNcIlxyXG5pbXBvcnQge2lkZW50aWZ5IGFzIGRlZmF1bHRJZGVudGlmeSwgY3JlYXRlRWxlbWVudCBhcyBkZWZhdWx0Q3JlYXRlRWxlbWVudH0gZnJvbSBcIi4vZmFjdG9yeVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0X2luaXQoKXtcclxuXHRcdHN1cGVyLl9pbml0KClcclxuXHRcdHRoaXMucmVscyhgUmVsYXRpb25zaGlwW1RhcmdldCQ9XCIueG1sXCJdYCkuZWFjaCgoaSxyZWwpPT57XHJcblx0XHRcdGxldCAkPXRoaXMucmVscyhyZWwpXHJcblx0XHRcdGxldCB0eXBlPSQuYXR0cihcIlR5cGVcIikuc3BsaXQoXCIvXCIpLnBvcCgpXHJcblx0XHRcdHRoaXNbdHlwZV09dGhpcy5nZXRSZWxPYmplY3QoJC5hdHRyKFwiVGFyZ2V0XCIpKVxyXG5cdFx0fSlcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpe1xyXG5cdFx0T2JqZWN0LmZyZWV6ZSh0aGlzLmNvbnRlbnQpXHJcblx0XHRyZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSwuLi5hcmd1bWVudHMpXHJcblx0fVxyXG5cclxuXHRyZW5kZXJOb2RlKG5vZGUsIGNyZWF0ZUVsZW1lbnQ9ZGVmYXVsdENyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PWRlZmF1bHRJZGVudGlmeSl7XHJcblx0XHRsZXQge25hbWU6dGFnTmFtZSwgY2hpbGRyZW4saWQsIHBhcmVudH09bm9kZVxyXG5cdFx0aWYobm9kZS50eXBlPT1cInRleHRcIil7XHJcblx0XHRcdGlmKHBhcmVudC5uYW1lPT1cInc6dFwiKXtcclxuXHRcdFx0XHRyZXR1cm4gbm9kZS5kYXRhXHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHRcdH1cclxuXHJcblx0XHRsZXQgdHlwZT10YWdOYW1lXHJcblx0XHRsZXQgcHJvcHM9e31cclxuXHJcblx0XHRpZihpZGVudGlmeSl7XHJcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeShub2RlLHRoaXMpXHJcblx0XHRcdGlmKCFtb2RlbClcclxuXHRcdFx0XHRyZXR1cm4gbnVsbFxyXG5cclxuXHRcdFx0aWYodHlwZW9mKG1vZGVsKT09XCJzdHJpbmdcIil7XHJcblx0XHRcdFx0dHlwZT1tb2RlbFxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRsZXQgY29udGVudDtcclxuXHRcdFx0XHQoe3R5cGUsIGNoaWxkcmVuOmNvbnRlbnQsIC4uLnByb3BzfT1tb2RlbCk7XHJcblx0XHRcdFx0aWYoY29udGVudCE9PXVuZGVmaW5lZClcclxuXHRcdFx0XHRcdGNoaWxkcmVuPWNvbnRlbnRcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cHJvcHMua2V5PWlkXHJcblx0XHRwcm9wcy5ub2RlPW5vZGVcclxuXHRcdHByb3BzLnR5cGU9dHlwZVxyXG5cclxuXHRcdGxldCBjaGlsZEVsZW1lbnRzPVtdXHJcblx0XHRpZihjaGlsZHJlbiAmJiBjaGlsZHJlbi5sZW5ndGgpe1xyXG5cdFx0XHRjaGlsZEVsZW1lbnRzPWNoaWxkcmVuLm1hcChhPT5hID8gdGhpcy5yZW5kZXJOb2RlKGEsY3JlYXRlRWxlbWVudCxpZGVudGlmeSkgOiBudWxsKVxyXG5cdFx0XHRcdC5maWx0ZXIoYT0+ISFhKVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBjcmVhdGVFbGVtZW50KFxyXG5cdFx0XHRcdHR5cGUsXHJcblx0XHRcdFx0cHJvcHMsXHJcblx0XHRcdFx0Y2hpbGRFbGVtZW50c1xyXG5cdFx0XHQpXHJcblx0fVxyXG59XHJcbiJdfQ==