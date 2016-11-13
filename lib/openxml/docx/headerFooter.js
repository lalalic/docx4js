"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Part) {
	(0, _inherits3.default)(_class, _Part);

	function _class(name, doc, type) {
		(0, _classCallCheck3.default)(this, _class);

		var _this = (0, _possibleConstructorReturn3.default)(this, (_class.__proto__ || (0, _getPrototypeOf2.default)(_class)).call(this, name, doc));

		_this.type = type;
		return _this;
	}

	(0, _createClass3.default)(_class, [{
		key: "parse",
		value: function parse() {
			var _this2 = this;

			return new _promise2.default(function (resolve) {
				var root = {
					children: []
				};
				var pr = null,
				    current = root;
				_this2.getContentStream().on("opentag", function (node) {
					node.parent = current;
					current = node;

					if (_this2.doc.isProperty(node) && pr == null) {
						pr = node;
					}

					if (pr == null) {
						node.children = [];
						node.parent.children.push(node);
					}
				}).on("closetag", function (tag) {
					var _current = current;
					var attributes = _current.attributes;
					var parent = _current.parent;
					var children = _current.children;
					var local = _current.local;
					var name = _current.name;

					if (tag == 'w:hdr' || tag == 'w:ftr') {
						attributes.type = _this2.type;
					}

					if (pr == null) {
						var index = parent.children.indexOf(current);
						attributes.key = index;
						var element = _this2.doc.createElement(current);

						parent.children.splice(index, 1, element);
						current = parent;
					} else if (current == pr) {
						var type = tag.split(':').pop();
						var property = _this2.doc.toProperty(_this2.asXmlObject(current), type);
						current = parent;
						if (tag.substr(-2) == 'Pr') current.attributes.directStyle = property;else current.attributes[type] = property;
						pr = null;
					} else {
						var _type = tag.split(':').pop();
						var value = _this2.doc.onToProperty(_this2.asXmlObject(current), _type);
						if (parent[_type] == undefined) parent[_type] = value;else if (Array.isArray(parent[_type])) parent[_type].push(value);else parent[_type] = [parent[_type], value];

						current = parent;
					}
				}).on("end", function (a) {
					resolve(root.children[0]);
				}).on("text", function (text) {
					if (current.name == "w:t") current.children = text;
				});
			});
		}
	}]);
	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvaGVhZGVyRm9vdGVyLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJkb2MiLCJ0eXBlIiwicm9vdCIsImNoaWxkcmVuIiwicHIiLCJjdXJyZW50IiwiZ2V0Q29udGVudFN0cmVhbSIsIm9uIiwibm9kZSIsInBhcmVudCIsImlzUHJvcGVydHkiLCJwdXNoIiwiYXR0cmlidXRlcyIsImxvY2FsIiwidGFnIiwiaW5kZXgiLCJpbmRleE9mIiwia2V5IiwiZWxlbWVudCIsImNyZWF0ZUVsZW1lbnQiLCJzcGxpY2UiLCJzcGxpdCIsInBvcCIsInByb3BlcnR5IiwidG9Qcm9wZXJ0eSIsImFzWG1sT2JqZWN0Iiwic3Vic3RyIiwiZGlyZWN0U3R5bGUiLCJ2YWx1ZSIsIm9uVG9Qcm9wZXJ0eSIsInVuZGVmaW5lZCIsIkFycmF5IiwiaXNBcnJheSIsInJlc29sdmUiLCJ0ZXh0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0FBR0MsaUJBQVlBLElBQVosRUFBaUJDLEdBQWpCLEVBQXNCQyxJQUF0QixFQUEyQjtBQUFBOztBQUFBLG9JQUNwQkYsSUFEb0IsRUFDZkMsR0FEZTs7QUFFMUIsUUFBS0MsSUFBTCxHQUFVQSxJQUFWO0FBRjBCO0FBRzFCOzs7OzBCQUNNO0FBQUE7O0FBQ04sVUFBTyxzQkFBWSxtQkFBUztBQUMzQixRQUFJQyxPQUFLO0FBQ1JDLGVBQVM7QUFERCxLQUFUO0FBR0EsUUFBS0MsS0FBRyxJQUFSO0FBQUEsUUFBY0MsVUFBUUgsSUFBdEI7QUFDQSxXQUFLSSxnQkFBTCxHQUNDQyxFQURELENBQ0ksU0FESixFQUNlLGdCQUFNO0FBQ3BCQyxVQUFLQyxNQUFMLEdBQVlKLE9BQVo7QUFDQUEsZUFBUUcsSUFBUjs7QUFFQSxTQUFHLE9BQUtSLEdBQUwsQ0FBU1UsVUFBVCxDQUFvQkYsSUFBcEIsS0FBNkJKLE1BQUksSUFBcEMsRUFBeUM7QUFDeENBLFdBQUdJLElBQUg7QUFDQTs7QUFFRCxTQUFHSixNQUFJLElBQVAsRUFBWTtBQUNYSSxXQUFLTCxRQUFMLEdBQWMsRUFBZDtBQUNBSyxXQUFLQyxNQUFMLENBQVlOLFFBQVosQ0FBcUJRLElBQXJCLENBQTBCSCxJQUExQjtBQUNBO0FBQ0QsS0FiRCxFQWNDRCxFQWRELENBY0ksVUFkSixFQWNlLGVBQUs7QUFBQSxvQkFDOEJGLE9BRDlCO0FBQUEsU0FDWk8sVUFEWSxZQUNaQSxVQURZO0FBQUEsU0FDQUgsTUFEQSxZQUNBQSxNQURBO0FBQUEsU0FDUU4sUUFEUixZQUNRQSxRQURSO0FBQUEsU0FDa0JVLEtBRGxCLFlBQ2tCQSxLQURsQjtBQUFBLFNBQ3dCZCxJQUR4QixZQUN3QkEsSUFEeEI7O0FBRW5CLFNBQUdlLE9BQUssT0FBTCxJQUFnQkEsT0FBSyxPQUF4QixFQUFnQztBQUMvQkYsaUJBQVdYLElBQVgsR0FBZ0IsT0FBS0EsSUFBckI7QUFDQTs7QUFFRCxTQUFHRyxNQUFJLElBQVAsRUFBWTtBQUNYLFVBQUlXLFFBQU1OLE9BQU9OLFFBQVAsQ0FBZ0JhLE9BQWhCLENBQXdCWCxPQUF4QixDQUFWO0FBQ0FPLGlCQUFXSyxHQUFYLEdBQWVGLEtBQWY7QUFDQSxVQUFJRyxVQUFRLE9BQUtsQixHQUFMLENBQVNtQixhQUFULENBQXVCZCxPQUF2QixDQUFaOztBQUVBSSxhQUFPTixRQUFQLENBQWdCaUIsTUFBaEIsQ0FBdUJMLEtBQXZCLEVBQTZCLENBQTdCLEVBQStCRyxPQUEvQjtBQUNBYixnQkFBUUksTUFBUjtBQUNBLE1BUEQsTUFPTSxJQUFHSixXQUFTRCxFQUFaLEVBQWU7QUFDcEIsVUFBSUgsT0FBS2EsSUFBSU8sS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFUO0FBQ0EsVUFBSUMsV0FBUyxPQUFLdkIsR0FBTCxDQUFTd0IsVUFBVCxDQUFvQixPQUFLQyxXQUFMLENBQWlCcEIsT0FBakIsQ0FBcEIsRUFBOENKLElBQTlDLENBQWI7QUFDQUksZ0JBQVFJLE1BQVI7QUFDQSxVQUFHSyxJQUFJWSxNQUFKLENBQVcsQ0FBQyxDQUFaLEtBQWdCLElBQW5CLEVBQ0NyQixRQUFRTyxVQUFSLENBQW1CZSxXQUFuQixHQUErQkosUUFBL0IsQ0FERCxLQUdDbEIsUUFBUU8sVUFBUixDQUFtQlgsSUFBbkIsSUFBeUJzQixRQUF6QjtBQUNEbkIsV0FBRyxJQUFIO0FBQ0EsTUFUSyxNQVNEO0FBQ0osVUFBSUgsUUFBS2EsSUFBSU8sS0FBSixDQUFVLEdBQVYsRUFBZUMsR0FBZixFQUFUO0FBQ0EsVUFBSU0sUUFBTSxPQUFLNUIsR0FBTCxDQUFTNkIsWUFBVCxDQUFzQixPQUFLSixXQUFMLENBQWlCcEIsT0FBakIsQ0FBdEIsRUFBZ0RKLEtBQWhELENBQVY7QUFDQSxVQUFHUSxPQUFPUixLQUFQLEtBQWM2QixTQUFqQixFQUNDckIsT0FBT1IsS0FBUCxJQUFhMkIsS0FBYixDQURELEtBRUssSUFBR0csTUFBTUMsT0FBTixDQUFjdkIsT0FBT1IsS0FBUCxDQUFkLENBQUgsRUFDSlEsT0FBT1IsS0FBUCxFQUFhVSxJQUFiLENBQWtCaUIsS0FBbEIsRUFESSxLQUdKbkIsT0FBT1IsS0FBUCxJQUFhLENBQUNRLE9BQU9SLEtBQVAsQ0FBRCxFQUFjMkIsS0FBZCxDQUFiOztBQUVEdkIsZ0JBQVFJLE1BQVI7QUFDQTtBQUNELEtBaERELEVBaURDRixFQWpERCxDQWlESSxLQWpESixFQWlEVyxhQUFHO0FBQ2IwQixhQUFRL0IsS0FBS0MsUUFBTCxDQUFjLENBQWQsQ0FBUjtBQUNBLEtBbkRELEVBb0RDSSxFQXBERCxDQW9ESSxNQXBESixFQW9EWSxnQkFBTTtBQUNqQixTQUFHRixRQUFRTixJQUFSLElBQWMsS0FBakIsRUFDQ00sUUFBUUYsUUFBUixHQUFpQitCLElBQWpCO0FBQ0QsS0F2REQ7QUF3REEsSUE3RE0sQ0FBUDtBQThEQSIsImZpbGUiOiJoZWFkZXJGb290ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0Y29uc3RydWN0b3IobmFtZSxkb2MsIHR5cGUpe1xyXG5cdFx0c3VwZXIobmFtZSxkb2MpXHJcblx0XHR0aGlzLnR5cGU9dHlwZVxyXG5cdH1cclxuXHRwYXJzZSgpe1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdGNoaWxkcmVuOltdXHJcblx0XHRcdH1cclxuXHRcdFx0bGV0ICBwcj1udWxsLCBjdXJyZW50PXJvb3RcclxuXHRcdFx0dGhpcy5nZXRDb250ZW50U3RyZWFtKClcclxuXHRcdFx0Lm9uKFwib3BlbnRhZ1wiLCBub2RlPT57XHJcblx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZSkgJiYgcHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0cHI9bm9kZVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdGlmKHRhZz09J3c6aGRyJyB8fCB0YWc9PSd3OmZ0cicpe1xyXG5cdFx0XHRcdFx0YXR0cmlidXRlcy50eXBlPXRoaXMudHlwZVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRcclxuXHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcclxuXHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQpXHJcblxyXG5cdFx0XHRcdFx0cGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwxLGVsZW1lbnQpXHJcblx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy5kb2MudG9Qcm9wZXJ0eSh0aGlzLmFzWG1sT2JqZWN0KGN1cnJlbnQpLHR5cGUpXHJcblx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0aWYodGFnLnN1YnN0cigtMik9PSdQcicpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcy5kaXJlY3RTdHlsZT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXNbdHlwZV09cHJvcGVydHlcclxuXHRcdFx0XHRcdHByPW51bGxcclxuXHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdGxldCB0eXBlPXRhZy5zcGxpdCgnOicpLnBvcCgpXHJcblx0XHRcdFx0XHRsZXQgdmFsdWU9dGhpcy5kb2Mub25Ub1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdGlmKHBhcmVudFt0eXBlXT09dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV09dmFsdWVcclxuXHRcdFx0XHRcdGVsc2UgaWYoQXJyYXkuaXNBcnJheShwYXJlbnRbdHlwZV0pKVxyXG5cdFx0XHRcdFx0XHRwYXJlbnRbdHlwZV0ucHVzaCh2YWx1ZSlcclxuXHRcdFx0XHRcdGVsc2UgXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT1bcGFyZW50W3R5cGVdLHZhbHVlXVxyXG5cdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwiZW5kXCIsIGE9PntcclxuXHRcdFx0XHRyZXNvbHZlKHJvb3QuY2hpbGRyZW5bMF0pXHJcblx0XHRcdH0pXHJcblx0XHRcdC5vbihcInRleHRcIiwgdGV4dD0+e1xyXG5cdFx0XHRcdGlmKGN1cnJlbnQubmFtZT09XCJ3OnRcIilcclxuXHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49dGV4dFxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn0iXX0=