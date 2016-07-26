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

	function _class() {
		_classCallCheck(this, _class);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvaGVhZGVyRm9vdGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUdROzs7QUFDTixVQUFPLElBQUksT0FBSixDQUFZLG1CQUFTO0FBQzNCLFFBQUksT0FBSztBQUNSLGVBQVMsRUFBVDtLQURHLENBRHVCO0FBSTNCLFFBQUssS0FBRyxJQUFIO1FBQVMsVUFBUSxJQUFSLENBSmE7QUFLM0IsV0FBSyxnQkFBTCxHQUNDLEVBREQsQ0FDSSxTQURKLEVBQ2UsZ0JBQU07QUFDcEIsVUFBSyxNQUFMLEdBQVksT0FBWixDQURvQjtBQUVwQixlQUFRLElBQVIsQ0FGb0I7O0FBSXBCLFNBQUcsT0FBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixJQUFwQixLQUE2QixNQUFJLElBQUosRUFBUztBQUN4QyxXQUFHLElBQUgsQ0FEd0M7TUFBekM7O0FBSUEsU0FBRyxNQUFJLElBQUosRUFBUztBQUNYLFdBQUssUUFBTCxHQUFjLEVBQWQsQ0FEVztBQUVYLFdBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsSUFBckIsQ0FBMEIsSUFBMUIsRUFGVztNQUFaO0tBUmMsQ0FEZixDQWNDLEVBZEQsQ0FjSSxVQWRKLEVBY2UsZUFBSztvQkFDOEIsUUFEOUI7U0FDWixpQ0FEWTtTQUNBLHlCQURBO1NBQ1EsNkJBRFI7U0FDa0IsdUJBRGxCO1NBQ3dCLHFCQUR4Qjs7QUFFbkIsU0FBRyxNQUFJLElBQUosRUFBUztBQUNYLFVBQUksUUFBTSxPQUFPLFFBQVAsQ0FBZ0IsT0FBaEIsQ0FBd0IsT0FBeEIsQ0FBTixDQURPO0FBRVgsaUJBQVcsR0FBWCxHQUFlLEtBQWYsQ0FGVztBQUdYLFVBQUksVUFBUSxPQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLE9BQXZCLENBQVIsQ0FITzs7QUFLWCxhQUFPLFFBQVAsQ0FBZ0IsTUFBaEIsQ0FBdUIsS0FBdkIsRUFBNkIsQ0FBN0IsRUFBK0IsT0FBL0IsRUFMVztBQU1YLGdCQUFRLE1BQVIsQ0FOVztNQUFaLE1BT00sSUFBRyxXQUFTLEVBQVQsRUFBWTtBQUNwQixVQUFJLE9BQUssSUFBSSxLQUFKLENBQVUsR0FBVixFQUFlLEdBQWYsRUFBTCxDQURnQjtBQUVwQixVQUFJLFdBQVMsT0FBSyxHQUFMLENBQVMsVUFBVCxDQUFvQixPQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBcEIsRUFBOEMsSUFBOUMsQ0FBVCxDQUZnQjtBQUdwQixnQkFBUSxNQUFSLENBSG9CO0FBSXBCLFVBQUcsSUFBSSxNQUFKLENBQVcsQ0FBQyxDQUFELENBQVgsSUFBZ0IsSUFBaEIsRUFDRixRQUFRLFVBQVIsQ0FBbUIsV0FBbkIsR0FBK0IsUUFBL0IsQ0FERCxLQUdDLFFBQVEsVUFBUixDQUFtQixJQUFuQixJQUF5QixRQUF6QixDQUhEO0FBSUEsV0FBRyxJQUFILENBUm9CO01BQWYsTUFTRDtBQUNKLFVBQUksUUFBSyxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFMLENBREE7QUFFSixVQUFJLFFBQU0sT0FBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixPQUFLLFdBQUwsQ0FBaUIsT0FBakIsQ0FBdEIsRUFBZ0QsS0FBaEQsQ0FBTixDQUZBO0FBR0osVUFBRyxPQUFPLEtBQVAsS0FBYyxTQUFkLEVBQ0YsT0FBTyxLQUFQLElBQWEsS0FBYixDQURELEtBRUssSUFBRyxNQUFNLE9BQU4sQ0FBYyxPQUFPLEtBQVAsQ0FBZCxDQUFILEVBQ0osT0FBTyxLQUFQLEVBQWEsSUFBYixDQUFrQixLQUFsQixFQURJLEtBR0osT0FBTyxLQUFQLElBQWEsQ0FBQyxPQUFPLEtBQVAsQ0FBRCxFQUFjLEtBQWQsQ0FBYixDQUhJOztBQUtMLGdCQUFRLE1BQVIsQ0FWSTtNQVRDO0tBVFEsQ0FkZixDQTZDQyxFQTdDRCxDQTZDSSxLQTdDSixFQTZDVyxhQUFHO0FBQ2IsYUFBUSxLQUFLLFFBQUwsQ0FBYyxDQUFkLENBQVIsRUFEYTtLQUFILENBN0NYLENBZ0RDLEVBaERELENBZ0RJLE1BaERKLEVBZ0RZLGdCQUFNO0FBQ2pCLFNBQUcsUUFBUSxJQUFSLElBQWMsS0FBZCxFQUNGLFFBQVEsUUFBUixHQUFpQixJQUFqQixDQUREO0tBRFcsQ0FoRFosQ0FMMkI7SUFBVCxDQUFuQixDQURNIiwiZmlsZSI6ImhlYWRlckZvb3Rlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUGFydHtcclxuXHRwYXJzZSgpe1xyXG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0bGV0IHJvb3Q9e1xyXG5cdFx0XHRcdGNoaWxkcmVuOltdXHJcblx0XHRcdH1cclxuXHRcdFx0bGV0ICBwcj1udWxsLCBjdXJyZW50PXJvb3RcclxuXHRcdFx0dGhpcy5nZXRDb250ZW50U3RyZWFtKClcclxuXHRcdFx0Lm9uKFwib3BlbnRhZ1wiLCBub2RlPT57XHJcblx0XHRcdFx0bm9kZS5wYXJlbnQ9Y3VycmVudFxyXG5cdFx0XHRcdGN1cnJlbnQ9bm9kZVxyXG5cdFx0XHRcdFxyXG5cdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZSkgJiYgcHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0cHI9bm9kZVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0bm9kZS5jaGlsZHJlbj1bXVxyXG5cdFx0XHRcdFx0bm9kZS5wYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwiY2xvc2V0YWdcIix0YWc9PntcclxuXHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdGxldCBpbmRleD1wYXJlbnQuY2hpbGRyZW4uaW5kZXhPZihjdXJyZW50KVxyXG5cdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudClcclxuXHJcblx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCBwcm9wZXJ0eT10aGlzLmRvYy50b1Byb3BlcnR5KHRoaXMuYXNYbWxPYmplY3QoY3VycmVudCksdHlwZSlcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRpZih0YWcuc3Vic3RyKC0yKT09J1ByJylcclxuXHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlc1t0eXBlXT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0bGV0IHR5cGU9dGFnLnNwbGl0KCc6JykucG9wKClcclxuXHRcdFx0XHRcdGxldCB2YWx1ZT10aGlzLmRvYy5vblRvUHJvcGVydHkodGhpcy5hc1htbE9iamVjdChjdXJyZW50KSx0eXBlKVxyXG5cdFx0XHRcdFx0aWYocGFyZW50W3R5cGVdPT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXT12YWx1ZVxyXG5cdFx0XHRcdFx0ZWxzZSBpZihBcnJheS5pc0FycmF5KHBhcmVudFt0eXBlXSkpXHJcblx0XHRcdFx0XHRcdHBhcmVudFt0eXBlXS5wdXNoKHZhbHVlKVxyXG5cdFx0XHRcdFx0ZWxzZSBcclxuXHRcdFx0XHRcdFx0cGFyZW50W3R5cGVdPVtwYXJlbnRbdHlwZV0sdmFsdWVdXHJcblx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KVxyXG5cdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdHJlc29sdmUocm9vdC5jaGlsZHJlblswXSlcclxuXHRcdFx0fSlcclxuXHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0aWYoY3VycmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj10ZXh0XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufSJdfQ==