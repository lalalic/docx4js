"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xml2js = require("xml2js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
	function _class(name, doc) {
		var _this = this;

		_classCallCheck(this, _class);

		this.name = name;
		this.doc = doc;
		this.data = doc.parts[name];
		this.rels = {};

		var folder = "",
		    relName = "_rels/" + name + ".rels",
		    i = name.lastIndexOf('/');
		if (i !== -1) {
			folder = name.substring(0, i);
			relName = folder + "/_rels/" + name.substring(i + 1) + ".rels";
		}

		if (!doc.parts[relName]) return;
		this.relName = relName;

		(0, _xml2js.parseString)(doc.parts[relName].asText(), { mergeAttrs: true, explicitArray: false }, function (error, doc) {
			doc.Relationships.Relationship.forEach(function (a, i) {
				_this.rels[a.Id] = {
					type: a.Type.split('/').pop(),
					targetMode: a.TargetMode,
					target: (a.TargetMode != "External" ? folder ? folder + "/" : '' : '') + a.Target };
			});
		});
	}

	_createClass(_class, [{
		key: "getRel",
		value: function getRel(id) {
			var rel = this.rels[id];
			if (rel.targetMode == 'External') return rel.target;
			switch (rel.type) {
				case 'image':
					return this.doc.getImagePart(rel.target);
				default:
					return this.doc.getPart(rel.target);
			}
		}
	}, {
		key: "parse",
		value: function parse() {
			Promise.resolve(this.doc.createElement({ name: this.doc.constructor.ext, attributes: this }));
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7QUFHQyxpQkFBWSxJQUFaLEVBQWlCLEdBQWpCLEVBQXFCOzs7OztBQUNwQixPQUFLLElBQUwsR0FBVSxJQUFWLENBRG9CO0FBRXBCLE9BQUssR0FBTCxHQUFTLEdBQVQsQ0FGb0I7QUFHcEIsT0FBSyxJQUFMLEdBQVUsSUFBSSxLQUFKLENBQVUsSUFBVixDQUFWLENBSG9CO0FBSXBCLE9BQUssSUFBTCxHQUFVLEVBQVYsQ0FKb0I7O0FBTXBCLE1BQUksU0FBTyxFQUFQO01BQ0gsVUFBUSxXQUFTLElBQVQsR0FBYyxPQUFkO01BQ1IsSUFBRSxLQUFLLFdBQUwsQ0FBaUIsR0FBakIsQ0FBRixDQVJtQjtBQVNwQixNQUFHLE1BQUksQ0FBQyxDQUFELEVBQUc7QUFDVCxZQUFPLEtBQUssU0FBTCxDQUFlLENBQWYsRUFBaUIsQ0FBakIsQ0FBUCxDQURTO0FBRVQsYUFBUSxTQUFPLFNBQVAsR0FBaUIsS0FBSyxTQUFMLENBQWUsSUFBRSxDQUFGLENBQWhDLEdBQXFDLE9BQXJDLENBRkM7R0FBVjs7QUFLQSxNQUFHLENBQUMsSUFBSSxLQUFKLENBQVUsT0FBVixDQUFELEVBQXFCLE9BQXhCO0FBQ0EsT0FBSyxPQUFMLEdBQWEsT0FBYixDQWZvQjs7QUFpQnBCLDJCQUFNLElBQUksS0FBSixDQUFVLE9BQVYsRUFBbUIsTUFBbkIsRUFBTixFQUFrQyxFQUFDLFlBQVcsSUFBWCxFQUFnQixlQUFjLEtBQWQsRUFBbkQsRUFBeUUsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFjO0FBQ3RGLE9BQUksYUFBSixDQUFrQixZQUFsQixDQUErQixPQUEvQixDQUF1QyxVQUFDLENBQUQsRUFBSSxDQUFKLEVBQVE7QUFDOUMsVUFBSyxJQUFMLENBQVUsRUFBRSxFQUFGLENBQVYsR0FBZ0I7QUFDZixXQUFLLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBYSxHQUFiLEVBQWtCLEdBQWxCLEVBQUw7QUFDQSxpQkFBWSxFQUFFLFVBQUY7QUFDWixhQUFPLENBQUMsRUFBRSxVQUFGLElBQWMsVUFBZCxHQUE0QixTQUFVLFNBQU8sR0FBUCxHQUFjLEVBQXhCLEdBQThCLEVBQTFELENBQUQsR0FBK0QsRUFBRSxNQUFGLEVBSHZFLENBRDhDO0lBQVIsQ0FBdkMsQ0FEc0Y7R0FBZCxDQUF6RSxDQWpCb0I7RUFBckI7Ozs7eUJBNEJPLElBQUc7QUFDVCxPQUFJLE1BQUksS0FBSyxJQUFMLENBQVUsRUFBVixDQUFKLENBREs7QUFFVCxPQUFHLElBQUksVUFBSixJQUFnQixVQUFoQixFQUNGLE9BQU8sSUFBSSxNQUFKLENBRFI7QUFFQSxXQUFPLElBQUksSUFBSjtBQUNQLFNBQUssT0FBTDtBQUNDLFlBQU8sS0FBSyxHQUFMLENBQVMsWUFBVCxDQUFzQixJQUFJLE1BQUosQ0FBN0IsQ0FERDtBQURBO0FBSUMsWUFBTyxLQUFLLEdBQUwsQ0FBUyxPQUFULENBQWlCLElBQUksTUFBSixDQUF4QixDQUREO0FBSEEsSUFKUzs7OzswQkFZSDtBQUNOLFdBQVEsT0FBUixDQUFnQixLQUFLLEdBQUwsQ0FBUyxhQUFULENBQXVCLEVBQUMsTUFBSyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQXFCLEdBQXJCLEVBQXlCLFlBQVcsSUFBWCxFQUF0RCxDQUFoQixFQURNIiwiZmlsZSI6InBhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3BhcnNlU3RyaW5nIGFzIHBhcnNlfSBmcm9tIFwieG1sMmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XG5cdGNvbnN0cnVjdG9yKG5hbWUsZG9jKXtcblx0XHR0aGlzLm5hbWU9bmFtZVxuXHRcdHRoaXMuZG9jPWRvY1xuXHRcdHRoaXMuZGF0YT1kb2MucGFydHNbbmFtZV1cblx0XHR0aGlzLnJlbHM9e31cblxuXHRcdHZhciBmb2xkZXI9XCJcIixcblx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIixcblx0XHRcdGk9bmFtZS5sYXN0SW5kZXhPZignLycpO1xuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKVxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoIWRvYy5wYXJ0c1tyZWxOYW1lXSkgcmV0dXJuO1xuXHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0XG5cdFx0cGFyc2UoZG9jLnBhcnRzW3JlbE5hbWVdLmFzVGV4dCgpLHttZXJnZUF0dHJzOnRydWUsZXhwbGljaXRBcnJheTpmYWxzZX0sIChlcnJvciwgZG9jKT0+e1xuXHRcdFx0ZG9jLlJlbGF0aW9uc2hpcHMuUmVsYXRpb25zaGlwLmZvckVhY2goKGEsIGkpPT57XG5cdFx0XHRcdHRoaXMucmVsc1thLklkXT17XG5cdFx0XHRcdFx0dHlwZTphLlR5cGUuc3BsaXQoJy8nKS5wb3AoKSxcblx0XHRcdFx0XHR0YXJnZXRNb2RlOiBhLlRhcmdldE1vZGUsXG5cdFx0XHRcdFx0dGFyZ2V0OihhLlRhcmdldE1vZGUhPVwiRXh0ZXJuYWxcIiA/IChmb2xkZXIgPyAoZm9sZGVyK1wiL1wiKSA6ICcnKSA6ICcnKSthLlRhcmdldH1cblx0XHRcdH0pXG5cdFx0fSlcblx0XHRcdFxuXHR9XG5cdFxuXHRnZXRSZWwoaWQpe1xuXHRcdHZhciByZWw9dGhpcy5yZWxzW2lkXVxuXHRcdGlmKHJlbC50YXJnZXRNb2RlPT0nRXh0ZXJuYWwnKVxuXHRcdFx0cmV0dXJuIHJlbC50YXJnZXRcblx0XHRzd2l0Y2gocmVsLnR5cGUpe1xuXHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRJbWFnZVBhcnQocmVsLnRhcmdldClcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQocmVsLnRhcmdldClcblx0XHR9XG5cdH1cblx0XG5cdHBhcnNlKCl7XG5cdFx0UHJvbWlzZS5yZXNvbHZlKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6dGhpcy5kb2MuY29uc3RydWN0b3IuZXh0LGF0dHJpYnV0ZXM6dGhpc30pKVxuXHR9XG59XG4iXX0=