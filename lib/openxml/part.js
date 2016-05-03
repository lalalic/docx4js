"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var part = function () {
	function part(name, doc) {
		_classCallCheck(this, part);

		this.name = name;
		this.doc = doc;
		this.documentElement = doc.parts[name] && $.parseXML(doc.parts[name].asText()).documentElement;
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
		//console.log("part:"+name+",relName:"+relName+",folder:"+folder+", text:"+doc.parts[relName].asText())
		$.parseXML(doc.parts[relName].asText()).documentElement.$("Relationship").asArray().forEach(function (a, i) {
			this.rels[a.getAttribute('Id')] = {
				type: a.getAttribute('Type').split('/').pop(),
				targetMode: a.getAttribute('TargetMode'),
				target: (a.getAttribute('TargetMode') != "External" ? folder ? folder + "/" : '' : '') + a.getAttribute('Target') };
		}, this);
	}

	_createClass(part, [{
		key: "getRel",
		value: function getRel(id) {
			var rel = this.rels[id];
			switch (rel.type) {
				case 'image':
					if (rel.targetMode == 'External') return rel.target;
					return this.doc.getImagePart(rel.target);
				default:
					return this.doc.getPart(rel.target);
			}
		}
	}], [{
		key: "is",
		value: function is(o) {
			return o && o.getRel;
		}
	}]);

	return part;
}();

exports.default = part;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUFxQjtBQUNwQixVQURvQixJQUNwQixDQUFZLElBQVosRUFBaUIsR0FBakIsRUFBcUI7d0JBREQsTUFDQzs7QUFDcEIsT0FBSyxJQUFMLEdBQVUsSUFBVixDQURvQjtBQUVwQixPQUFLLEdBQUwsR0FBUyxHQUFULENBRm9CO0FBR3BCLE9BQUssZUFBTCxHQUFxQixJQUFJLEtBQUosQ0FBVSxJQUFWLEtBQW1CLEVBQUUsUUFBRixDQUFXLElBQUksS0FBSixDQUFVLElBQVYsRUFBZ0IsTUFBaEIsRUFBWCxFQUFxQyxlQUFyQyxDQUhwQjtBQUlwQixPQUFLLElBQUwsR0FBVSxFQUFWLENBSm9COztBQU1wQixNQUFJLFNBQU8sRUFBUDtNQUNILFVBQVEsV0FBUyxJQUFULEdBQWMsT0FBZDtNQUNSLElBQUUsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQUYsQ0FSbUI7QUFTcEIsTUFBRyxNQUFJLENBQUMsQ0FBRCxFQUFHO0FBQ1QsWUFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVAsQ0FEUztBQUVULGFBQVEsU0FBTyxTQUFQLEdBQWlCLEtBQUssU0FBTCxDQUFlLElBQUUsQ0FBRixDQUFoQyxHQUFxQyxPQUFyQyxDQUZDO0dBQVY7O0FBS0EsTUFBRyxDQUFDLElBQUksS0FBSixDQUFVLE9BQVYsQ0FBRCxFQUFxQixPQUF4QjtBQUNBLE9BQUssT0FBTCxHQUFhLE9BQWI7O0FBZm9CLEdBaUJwQixDQUFFLFFBQUYsQ0FBVyxJQUFJLEtBQUosQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQVgsRUFDRSxlQURGLENBRUUsQ0FGRixDQUVJLGNBRkosRUFHRSxPQUhGLEdBSUUsT0FKRixDQUlVLFVBQVMsQ0FBVCxFQUFZLENBQVosRUFBYztBQUN0QixRQUFLLElBQUwsQ0FBVSxFQUFFLFlBQUYsQ0FBZSxJQUFmLENBQVYsSUFBZ0M7QUFDL0IsVUFBSyxFQUFFLFlBQUYsQ0FBZSxNQUFmLEVBQXVCLEtBQXZCLENBQTZCLEdBQTdCLEVBQWtDLEdBQWxDLEVBQUw7QUFDQSxnQkFBWSxFQUFFLFlBQUYsQ0FBZSxZQUFmLENBQVo7QUFDQSxZQUFPLENBQUMsRUFBRSxZQUFGLENBQWUsWUFBZixLQUE4QixVQUE5QixHQUE0QyxTQUFVLFNBQU8sR0FBUCxHQUFjLEVBQXhCLEdBQThCLEVBQTFFLENBQUQsR0FBK0UsRUFBRSxZQUFGLENBQWUsUUFBZixDQUEvRSxFQUhSLENBRHNCO0dBQWQsRUFLUCxJQVRILEVBakJvQjtFQUFyQjs7Y0FEb0I7O3lCQTZCYixJQUFHO0FBQ1QsT0FBSSxNQUFJLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBSixDQURLO0FBRVQsV0FBTyxJQUFJLElBQUo7QUFDUCxTQUFLLE9BQUw7QUFDQyxTQUFHLElBQUksVUFBSixJQUFnQixVQUFoQixFQUNGLE9BQU8sSUFBSSxNQUFKLENBRFI7QUFFQSxZQUFPLEtBQUssR0FBTCxDQUFTLFlBQVQsQ0FBc0IsSUFBSSxNQUFKLENBQTdCLENBSEQ7QUFEQTtBQU1DLFlBQU8sS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixJQUFJLE1BQUosQ0FBeEIsQ0FERDtBQUxBLElBRlM7Ozs7cUJBWUEsR0FBRTtBQUNYLFVBQU8sS0FBSyxFQUFFLE1BQUYsQ0FERDs7OztRQXpDUSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFydHtcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xuXHRcdHRoaXMubmFtZT1uYW1lXG5cdFx0dGhpcy5kb2M9ZG9jXG5cdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQ9ZG9jLnBhcnRzW25hbWVdICYmICQucGFyc2VYTUwoZG9jLnBhcnRzW25hbWVdLmFzVGV4dCgpKS5kb2N1bWVudEVsZW1lbnRcblx0XHR0aGlzLnJlbHM9e31cblxuXHRcdHZhciBmb2xkZXI9XCJcIixcblx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIixcblx0XHRcdGk9bmFtZS5sYXN0SW5kZXhPZignLycpO1xuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKVxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoIWRvYy5wYXJ0c1tyZWxOYW1lXSkgcmV0dXJuO1xuXHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0Ly9jb25zb2xlLmxvZyhcInBhcnQ6XCIrbmFtZStcIixyZWxOYW1lOlwiK3JlbE5hbWUrXCIsZm9sZGVyOlwiK2ZvbGRlcitcIiwgdGV4dDpcIitkb2MucGFydHNbcmVsTmFtZV0uYXNUZXh0KCkpXG5cdFx0JC5wYXJzZVhNTChkb2MucGFydHNbcmVsTmFtZV0uYXNUZXh0KCkpXG5cdFx0XHQuZG9jdW1lbnRFbGVtZW50XG5cdFx0XHQuJChcIlJlbGF0aW9uc2hpcFwiKVxuXHRcdFx0LmFzQXJyYXkoKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24oYSwgaSl7XG5cdFx0XHRcdHRoaXMucmVsc1thLmdldEF0dHJpYnV0ZSgnSWQnKV09e1xuXHRcdFx0XHRcdHR5cGU6YS5nZXRBdHRyaWJ1dGUoJ1R5cGUnKS5zcGxpdCgnLycpLnBvcCgpLFxuXHRcdFx0XHRcdHRhcmdldE1vZGU6IGEuZ2V0QXR0cmlidXRlKCdUYXJnZXRNb2RlJyksXG5cdFx0XHRcdFx0dGFyZ2V0OihhLmdldEF0dHJpYnV0ZSgnVGFyZ2V0TW9kZScpIT1cIkV4dGVybmFsXCIgPyAoZm9sZGVyID8gKGZvbGRlcitcIi9cIikgOiAnJykgOiAnJykrYS5nZXRBdHRyaWJ1dGUoJ1RhcmdldCcpfVxuXHRcdFx0fSx0aGlzKVxuXHR9XG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHNbaWRdXG5cdFx0c3dpdGNoKHJlbC50eXBlKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRpZihyZWwudGFyZ2V0TW9kZT09J0V4dGVybmFsJylcblx0XHRcdFx0cmV0dXJuIHJlbC50YXJnZXRcblx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRJbWFnZVBhcnQocmVsLnRhcmdldClcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQocmVsLnRhcmdldClcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgaXMobyl7XG5cdFx0cmV0dXJuIG8gJiYgby5nZXRSZWxcblx0fVxufVxuIl19