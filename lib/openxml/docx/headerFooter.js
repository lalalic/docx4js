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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, name, doc));

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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvaGVhZGVyRm9vdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQUdDLGlCQUFZLElBQVosRUFBaUIsR0FBakIsRUFBc0IsSUFBdEIsRUFBMkI7Ozt3RkFDcEIsTUFBSyxNQURlOztBQUUxQixRQUFLLElBQUwsR0FBVSxJQUFWLENBRjBCOztFQUEzQjs7OzswQkFJTzs7O0FBQ04sVUFBTyxJQUFJLE9BQUosQ0FBWSxtQkFBUztBQUMzQixRQUFJLE9BQUs7QUFDUixlQUFTLEVBQVQ7S0FERyxDQUR1QjtBQUkzQixRQUFLLEtBQUcsSUFBSDtRQUFTLFVBQVEsSUFBUixDQUphO0FBSzNCLFdBQUssZ0JBQUwsR0FDQyxFQURELENBQ0ksU0FESixFQUNlLGdCQUFNO0FBQ3BCLFVBQUssTUFBTCxHQUFZLE9BQVosQ0FEb0I7QUFFcEIsZUFBUSxJQUFSLENBRm9COztBQUlwQixTQUFHLE9BQUssR0FBTCxDQUFTLFVBQVQsQ0FBb0IsSUFBcEIsS0FBNkIsTUFBSSxJQUFKLEVBQVM7QUFDeEMsV0FBRyxJQUFILENBRHdDO01BQXpDOztBQUlBLFNBQUcsTUFBSSxJQUFKLEVBQVM7QUFDWCxXQUFLLFFBQUwsR0FBYyxFQUFkLENBRFc7QUFFWCxXQUFLLE1BQUwsQ0FBWSxRQUFaLENBQXFCLElBQXJCLENBQTBCLElBQTFCLEVBRlc7TUFBWjtLQVJjLENBRGYsQ0FjQyxFQWRELENBY0ksVUFkSixFQWNlLGVBQUs7b0JBQzhCLFFBRDlCO1NBQ1osaUNBRFk7U0FDQSx5QkFEQTtTQUNRLDZCQURSO1NBQ2tCLHVCQURsQjtTQUN3QixxQkFEeEI7O0FBRW5CLFNBQUcsT0FBSyxPQUFMLElBQWdCLE9BQUssT0FBTCxFQUFhO0FBQy9CLGlCQUFXLElBQVgsR0FBZ0IsT0FBSyxJQUFMLENBRGU7TUFBaEM7O0FBSUEsU0FBRyxNQUFJLElBQUosRUFBUztBQUNYLFVBQUksUUFBTSxPQUFPLFFBQVAsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsQ0FBTixDQURPO0FBRVgsaUJBQVcsR0FBWCxHQUFlLEtBQWYsQ0FGVztBQUdYLFVBQUksVUFBUSxPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVIsQ0FITzs7QUFLWCxhQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBdkIsRUFBNkIsQ0FBN0IsRUFBK0IsT0FBL0IsRUFMVztBQU1YLGdCQUFRLE1BQVIsQ0FOVztNQUFaLE1BT00sSUFBRyxXQUFTLEVBQVQsRUFBWTtBQUNwQixVQUFJLE9BQUssSUFBSSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBTCxDQURnQjtBQUVwQixVQUFJLFdBQVMsT0FBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixPQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBcEIsRUFBOEMsSUFBOUMsQ0FBVCxDQUZnQjtBQUdwQixnQkFBUSxNQUFSLENBSG9CO0FBSXBCLFVBQUcsSUFBSSxNQUFKLENBQVcsQ0FBQyxDQUFELENBQVgsSUFBZ0IsSUFBaEIsRUFDRixRQUFRLFVBQVIsQ0FBbUIsV0FBbkIsR0FBK0IsUUFBL0IsQ0FERCxLQUdDLFFBQVEsVUFBUixDQUFtQixJQUFuQixJQUF5QixRQUF6QixDQUhEO0FBSUEsV0FBRyxJQUFILENBUm9CO01BQWYsTUFTRDtBQUNKLFVBQUksUUFBSyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFMLENBREE7QUFFSixVQUFJLFFBQU0sT0FBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixPQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBdEIsRUFBZ0QsS0FBaEQsQ0FBTixDQUZBO0FBR0osVUFBRyxPQUFPLEtBQVAsS0FBYyxTQUFkLEVBQ0YsT0FBTyxLQUFQLElBQWEsS0FBYixDQURELEtBRUssSUFBRyxNQUFNLE9BQU4sQ0FBYyxPQUFPLEtBQVAsQ0FBZCxDQUFILEVBQ0osT0FBTyxLQUFQLEVBQWEsSUFBYixDQUFrQixLQUFsQixFQURJLEtBR0osT0FBTyxLQUFQLElBQWEsQ0FBQyxPQUFPLEtBQVAsQ0FBRCxFQUFjLEtBQWQsQ0FBYixDQUhJOztBQUtMLGdCQUFRLE1BQVIsQ0FWSTtNQVRDO0tBYlEsQ0FkZixDQWlEQyxFQWpERCxDQWlESSxLQWpESixFQWlEVyxhQUFHO0FBQ2IsYUFBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVIsRUFEYTtLQUFILENBakRYLENBb0RDLEVBcERELENBb0RJLE1BcERKLEVBb0RZLGdCQUFNO0FBQ2pCLFNBQUcsUUFBUSxJQUFSLElBQWMsS0FBZCxFQUNGLFFBQVEsUUFBUixHQUFpQixJQUFqQixDQUREO0tBRFcsQ0FwRFosQ0FMMkI7SUFBVCxDQUFuQixDQURNIiwiZmlsZSI6ImhlYWRlckZvb3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYywgdHlwZSl7XHJcblx0XHRzdXBlcihuYW1lLGRvYylcclxuXHRcdHRoaXMudHlwZT10eXBlXHJcblx0fVxyXG5cdHBhcnNlKCl7XHJcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZT0+e1xyXG5cdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0Y2hpbGRyZW46W11cclxuXHRcdFx0fVxyXG5cdFx0XHRsZXQgIHByPW51bGwsIGN1cnJlbnQ9cm9vdFxyXG5cdFx0XHR0aGlzLmdldENvbnRlbnRTdHJlYW0oKVxyXG5cdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblx0XHRcdFx0XHJcblx0XHRcdFx0aWYodGhpcy5kb2MuaXNQcm9wZXJ0eShub2RlKSAmJiBwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRwcj1ub2RlXHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblx0XHRcdFx0XHRub2RlLnBhcmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdGNvbnN0IHthdHRyaWJ1dGVzLCBwYXJlbnQsIGNoaWxkcmVuLCBsb2NhbCxuYW1lfT1jdXJyZW50XHJcblx0XHRcdFx0aWYodGFnPT0ndzpoZHInIHx8IHRhZz09J3c6ZnRyJyl7XHJcblx0XHRcdFx0XHRhdHRyaWJ1dGVzLnR5cGU9dGhpcy50eXBlXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudClcclxuXHJcblx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCBwcm9wZXJ0eT10aGlzLmRvYy50b1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRpZih0YWcuc3Vic3RyKC0yKT09J1ByJylcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlc1t0eXBlXT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLmRvYy5vblRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0aWYocGFyZW50W3R5cGVdPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT12YWx1ZVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KHBhcmVudFt0eXBlXSkpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXS5wdXNoKHZhbHVlKVxyXG5cdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdPVtwYXJlbnRbdHlwZV0sdmFsdWVdXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdHJlc29sdmUocm9vdC5jaGlsZHJlblswXSlcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj10ZXh0XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==