"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Part) {
	_inherits(_class, _Part);

	function _class(name, doc, type) {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, name, doc));

		_this.type = type;
		return _this;
	}

	_createClass(_class, [{
		key: "parse",
		value: function parse() {
			var _this2 = this;

			return new Promise(function (resolve) {
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
					var _current = current,
					    attributes = _current.attributes,
					    parent = _current.parent,
					    children = _current.children,
					    local = _current.local,
					    name = _current.name;

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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvaGVhZGVyRm9vdGVyLmpzIl0sIm5hbWVzIjpbIm5hbWUiLCJkb2MiLCJ0eXBlIiwiUHJvbWlzZSIsInJvb3QiLCJjaGlsZHJlbiIsInByIiwiY3VycmVudCIsImdldENvbnRlbnRTdHJlYW0iLCJvbiIsIm5vZGUiLCJwYXJlbnQiLCJpc1Byb3BlcnR5IiwicHVzaCIsImF0dHJpYnV0ZXMiLCJsb2NhbCIsInRhZyIsImluZGV4IiwiaW5kZXhPZiIsImtleSIsImVsZW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwic3BsaWNlIiwic3BsaXQiLCJwb3AiLCJwcm9wZXJ0eSIsInRvUHJvcGVydHkiLCJhc1htbE9iamVjdCIsInN1YnN0ciIsImRpcmVjdFN0eWxlIiwidmFsdWUiLCJvblRvUHJvcGVydHkiLCJ1bmRlZmluZWQiLCJBcnJheSIsImlzQXJyYXkiLCJyZXNvbHZlIiwidGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsaUJBQVlBLElBQVosRUFBaUJDLEdBQWpCLEVBQXNCQyxJQUF0QixFQUEyQjtBQUFBOztBQUFBLDhHQUNwQkYsSUFEb0IsRUFDZkMsR0FEZTs7QUFFMUIsUUFBS0MsSUFBTCxHQUFVQSxJQUFWO0FBRjBCO0FBRzFCOzs7OzBCQUNNO0FBQUE7O0FBQ04sVUFBTyxJQUFJQyxPQUFKLENBQVksbUJBQVM7QUFDM0IsUUFBSUMsT0FBSztBQUNSQyxlQUFTO0FBREQsS0FBVDtBQUdBLFFBQUtDLEtBQUcsSUFBUjtBQUFBLFFBQWNDLFVBQVFILElBQXRCO0FBQ0EsV0FBS0ksZ0JBQUwsR0FDQ0MsRUFERCxDQUNJLFNBREosRUFDZSxnQkFBTTtBQUNwQkMsVUFBS0MsTUFBTCxHQUFZSixPQUFaO0FBQ0FBLGVBQVFHLElBQVI7O0FBRUEsU0FBRyxPQUFLVCxHQUFMLENBQVNXLFVBQVQsQ0FBb0JGLElBQXBCLEtBQTZCSixNQUFJLElBQXBDLEVBQXlDO0FBQ3hDQSxXQUFHSSxJQUFIO0FBQ0E7O0FBRUQsU0FBR0osTUFBSSxJQUFQLEVBQVk7QUFDWEksV0FBS0wsUUFBTCxHQUFjLEVBQWQ7QUFDQUssV0FBS0MsTUFBTCxDQUFZTixRQUFaLENBQXFCUSxJQUFyQixDQUEwQkgsSUFBMUI7QUFDQTtBQUNELEtBYkQsRUFjQ0QsRUFkRCxDQWNJLFVBZEosRUFjZSxlQUFLO0FBQUEsb0JBQzhCRixPQUQ5QjtBQUFBLFNBQ1pPLFVBRFksWUFDWkEsVUFEWTtBQUFBLFNBQ0FILE1BREEsWUFDQUEsTUFEQTtBQUFBLFNBQ1FOLFFBRFIsWUFDUUEsUUFEUjtBQUFBLFNBQ2tCVSxLQURsQixZQUNrQkEsS0FEbEI7QUFBQSxTQUN3QmYsSUFEeEIsWUFDd0JBLElBRHhCOztBQUVuQixTQUFHZ0IsT0FBSyxPQUFMLElBQWdCQSxPQUFLLE9BQXhCLEVBQWdDO0FBQy9CRixpQkFBV1osSUFBWCxHQUFnQixPQUFLQSxJQUFyQjtBQUNBOztBQUVELFNBQUdJLE1BQUksSUFBUCxFQUFZO0FBQ1gsVUFBSVcsUUFBTU4sT0FBT04sUUFBUCxDQUFnQmEsT0FBaEIsQ0FBd0JYLE9BQXhCLENBQVY7QUFDQU8saUJBQVdLLEdBQVgsR0FBZUYsS0FBZjtBQUNBLFVBQUlHLFVBQVEsT0FBS25CLEdBQUwsQ0FBU29CLGFBQVQsQ0FBdUJkLE9BQXZCLENBQVo7O0FBRUFJLGFBQU9OLFFBQVAsQ0FBZ0JpQixNQUFoQixDQUF1QkwsS0FBdkIsRUFBNkIsQ0FBN0IsRUFBK0JHLE9BQS9CO0FBQ0FiLGdCQUFRSSxNQUFSO0FBQ0EsTUFQRCxNQU9NLElBQUdKLFdBQVNELEVBQVosRUFBZTtBQUNwQixVQUFJSixPQUFLYyxJQUFJTyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQVQ7QUFDQSxVQUFJQyxXQUFTLE9BQUt4QixHQUFMLENBQVN5QixVQUFULENBQW9CLE9BQUtDLFdBQUwsQ0FBaUJwQixPQUFqQixDQUFwQixFQUE4Q0wsSUFBOUMsQ0FBYjtBQUNBSyxnQkFBUUksTUFBUjtBQUNBLFVBQUdLLElBQUlZLE1BQUosQ0FBVyxDQUFDLENBQVosS0FBZ0IsSUFBbkIsRUFDQ3JCLFFBQVFPLFVBQVIsQ0FBbUJlLFdBQW5CLEdBQStCSixRQUEvQixDQURELEtBR0NsQixRQUFRTyxVQUFSLENBQW1CWixJQUFuQixJQUF5QnVCLFFBQXpCO0FBQ0RuQixXQUFHLElBQUg7QUFDQSxNQVRLLE1BU0Q7QUFDSixVQUFJSixRQUFLYyxJQUFJTyxLQUFKLENBQVUsR0FBVixFQUFlQyxHQUFmLEVBQVQ7QUFDQSxVQUFJTSxRQUFNLE9BQUs3QixHQUFMLENBQVM4QixZQUFULENBQXNCLE9BQUtKLFdBQUwsQ0FBaUJwQixPQUFqQixDQUF0QixFQUFnREwsS0FBaEQsQ0FBVjtBQUNBLFVBQUdTLE9BQU9ULEtBQVAsS0FBYzhCLFNBQWpCLEVBQ0NyQixPQUFPVCxLQUFQLElBQWE0QixLQUFiLENBREQsS0FFSyxJQUFHRyxNQUFNQyxPQUFOLENBQWN2QixPQUFPVCxLQUFQLENBQWQsQ0FBSCxFQUNKUyxPQUFPVCxLQUFQLEVBQWFXLElBQWIsQ0FBa0JpQixLQUFsQixFQURJLEtBR0puQixPQUFPVCxLQUFQLElBQWEsQ0FBQ1MsT0FBT1QsS0FBUCxDQUFELEVBQWM0QixLQUFkLENBQWI7O0FBRUR2QixnQkFBUUksTUFBUjtBQUNBO0FBQ0QsS0FoREQsRUFpRENGLEVBakRELENBaURJLEtBakRKLEVBaURXLGFBQUc7QUFDYjBCLGFBQVEvQixLQUFLQyxRQUFMLENBQWMsQ0FBZCxDQUFSO0FBQ0EsS0FuREQsRUFvRENJLEVBcERELENBb0RJLE1BcERKLEVBb0RZLGdCQUFNO0FBQ2pCLFNBQUdGLFFBQVFQLElBQVIsSUFBYyxLQUFqQixFQUNDTyxRQUFRRixRQUFSLEdBQWlCK0IsSUFBakI7QUFDRCxLQXZERDtBQXdEQSxJQTdETSxDQUFQO0FBOERBIiwiZmlsZSI6ImhlYWRlckZvb3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYywgdHlwZSl7XHJcblx0XHRzdXBlcihuYW1lLGRvYylcclxuXHRcdHRoaXMudHlwZT10eXBlXHJcblx0fVxyXG5cdHBhcnNlKCl7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZT0+e1xyXG5cdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0Y2hpbGRyZW46W11cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHR0aGlzLmdldENvbnRlbnRTdHJlYW0oKVxyXG5cdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYodGhpcy5kb2MuaXNQcm9wZXJ0eShub2RlKSAmJiBwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRwcj1ub2RlXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblx0XHRcdFx0XHRub2RlLnBhcmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0aWYodGFnPT0ndzpoZHInIHx8IHRhZz09J3c6ZnRyJyl7XHJcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnR5cGU9dGhpcy50eXBlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudClcclxuXHJcblx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCBwcm9wZXJ0eT10aGlzLmRvYy50b1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRpZih0YWcuc3Vic3RyKC0yKT09J1ByJylcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlc1t0eXBlXT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLmRvYy5vblRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0aWYocGFyZW50W3R5cGVdPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT12YWx1ZVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KHBhcmVudFt0eXBlXSkpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXS5wdXNoKHZhbHVlKVxyXG5cdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdPVtwYXJlbnRbdHlwZV0sdmFsdWVdXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdHJlc29sdmUocm9vdC5jaGlsZHJlblswXSlcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj10ZXh0XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==