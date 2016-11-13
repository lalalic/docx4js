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
			if (rel.targetMode == 'External') return rel.target;
			switch (rel.type) {
				case 'image':
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
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsicGFydCIsIm5hbWUiLCJkb2MiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJ0cyIsIiQiLCJwYXJzZVhNTCIsImFzVGV4dCIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiYXNBcnJheSIsImZvckVhY2giLCJhIiwiZ2V0QXR0cmlidXRlIiwidHlwZSIsInNwbGl0IiwicG9wIiwidGFyZ2V0TW9kZSIsInRhcmdldCIsImlkIiwicmVsIiwiZ2V0SW1hZ2VQYXJ0IiwiZ2V0UGFydCIsIm8iLCJnZXRSZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBcUJBLEk7QUFDcEIsZUFBWUMsSUFBWixFQUFpQkMsR0FBakIsRUFBcUI7QUFBQTs7QUFDcEIsT0FBS0QsSUFBTCxHQUFVQSxJQUFWO0FBQ0EsT0FBS0MsR0FBTCxHQUFTQSxHQUFUO0FBQ0EsT0FBS0MsZUFBTCxHQUFxQkQsSUFBSUUsS0FBSixDQUFVSCxJQUFWLEtBQW1CSSxFQUFFQyxRQUFGLENBQVdKLElBQUlFLEtBQUosQ0FBVUgsSUFBVixFQUFnQk0sTUFBaEIsRUFBWCxFQUFxQ0osZUFBN0U7QUFDQSxPQUFLSyxJQUFMLEdBQVUsRUFBVjs7QUFFQSxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUNDQyxVQUFRLFdBQVNULElBQVQsR0FBYyxPQUR2QjtBQUFBLE1BRUNVLElBQUVWLEtBQUtXLFdBQUwsQ0FBaUIsR0FBakIsQ0FGSDtBQUdBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT1IsS0FBS1ksU0FBTCxDQUFlLENBQWYsRUFBaUJGLENBQWpCLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxTQUFQLEdBQWlCUixLQUFLWSxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBakIsR0FBcUMsT0FBN0M7QUFDQTs7QUFFRCxNQUFHLENBQUNULElBQUlFLEtBQUosQ0FBVU0sT0FBVixDQUFKLEVBQXdCO0FBQ3hCLE9BQUtBLE9BQUwsR0FBYUEsT0FBYjtBQUNBO0FBQ0FMLElBQUVDLFFBQUYsQ0FBV0osSUFBSUUsS0FBSixDQUFVTSxPQUFWLEVBQW1CSCxNQUFuQixFQUFYLEVBQ0VKLGVBREYsQ0FFRUUsQ0FGRixDQUVJLGNBRkosRUFHRVMsT0FIRixHQUlFQyxPQUpGLENBSVUsVUFBU0MsQ0FBVCxFQUFZTCxDQUFaLEVBQWM7QUFDdEIsUUFBS0gsSUFBTCxDQUFVUSxFQUFFQyxZQUFGLENBQWUsSUFBZixDQUFWLElBQWdDO0FBQy9CQyxVQUFLRixFQUFFQyxZQUFGLENBQWUsTUFBZixFQUF1QkUsS0FBdkIsQ0FBNkIsR0FBN0IsRUFBa0NDLEdBQWxDLEVBRDBCO0FBRS9CQyxnQkFBWUwsRUFBRUMsWUFBRixDQUFlLFlBQWYsQ0FGbUI7QUFHL0JLLFlBQU8sQ0FBQ04sRUFBRUMsWUFBRixDQUFlLFlBQWYsS0FBOEIsVUFBOUIsR0FBNENSLFNBQVVBLFNBQU8sR0FBakIsR0FBd0IsRUFBcEUsR0FBMEUsRUFBM0UsSUFBK0VPLEVBQUVDLFlBQUYsQ0FBZSxRQUFmLENBSHZELEVBQWhDO0FBSUEsR0FURixFQVNHLElBVEg7QUFVQTs7Ozt5QkFDTU0sRSxFQUFHO0FBQ1QsT0FBSUMsTUFBSSxLQUFLaEIsSUFBTCxDQUFVZSxFQUFWLENBQVI7QUFDQSxPQUFHQyxJQUFJSCxVQUFKLElBQWdCLFVBQW5CLEVBQ0MsT0FBT0csSUFBSUYsTUFBWDtBQUNELFdBQU9FLElBQUlOLElBQVg7QUFDQSxTQUFLLE9BQUw7QUFDQyxZQUFPLEtBQUtoQixHQUFMLENBQVN1QixZQUFULENBQXNCRCxJQUFJRixNQUExQixDQUFQO0FBQ0Q7QUFDQyxZQUFPLEtBQUtwQixHQUFMLENBQVN3QixPQUFULENBQWlCRixJQUFJRixNQUFyQixDQUFQO0FBSkQ7QUFNQTs7O3FCQUVTSyxDLEVBQUU7QUFDWCxVQUFPQSxLQUFLQSxFQUFFQyxNQUFkO0FBQ0E7Ozs7OztrQkEzQ21CNUIsSSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFydHtcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xuXHRcdHRoaXMubmFtZT1uYW1lXG5cdFx0dGhpcy5kb2M9ZG9jXG5cdFx0dGhpcy5kb2N1bWVudEVsZW1lbnQ9ZG9jLnBhcnRzW25hbWVdICYmICQucGFyc2VYTUwoZG9jLnBhcnRzW25hbWVdLmFzVGV4dCgpKS5kb2N1bWVudEVsZW1lbnRcblx0XHR0aGlzLnJlbHM9e31cblxuXHRcdHZhciBmb2xkZXI9XCJcIixcblx0XHRcdHJlbE5hbWU9XCJfcmVscy9cIituYW1lK1wiLnJlbHNcIixcblx0XHRcdGk9bmFtZS5sYXN0SW5kZXhPZignLycpO1xuXHRcdGlmKGkhPT0tMSl7XG5cdFx0XHRmb2xkZXI9bmFtZS5zdWJzdHJpbmcoMCxpKVxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XG5cdFx0fVxuXG5cdFx0aWYoIWRvYy5wYXJ0c1tyZWxOYW1lXSkgcmV0dXJuO1xuXHRcdHRoaXMucmVsTmFtZT1yZWxOYW1lXG5cdFx0Ly9jb25zb2xlLmxvZyhcInBhcnQ6XCIrbmFtZStcIixyZWxOYW1lOlwiK3JlbE5hbWUrXCIsZm9sZGVyOlwiK2ZvbGRlcitcIiwgdGV4dDpcIitkb2MucGFydHNbcmVsTmFtZV0uYXNUZXh0KCkpXG5cdFx0JC5wYXJzZVhNTChkb2MucGFydHNbcmVsTmFtZV0uYXNUZXh0KCkpXG5cdFx0XHQuZG9jdW1lbnRFbGVtZW50XG5cdFx0XHQuJChcIlJlbGF0aW9uc2hpcFwiKVxuXHRcdFx0LmFzQXJyYXkoKVxuXHRcdFx0LmZvckVhY2goZnVuY3Rpb24oYSwgaSl7XG5cdFx0XHRcdHRoaXMucmVsc1thLmdldEF0dHJpYnV0ZSgnSWQnKV09e1xuXHRcdFx0XHRcdHR5cGU6YS5nZXRBdHRyaWJ1dGUoJ1R5cGUnKS5zcGxpdCgnLycpLnBvcCgpLFxuXHRcdFx0XHRcdHRhcmdldE1vZGU6IGEuZ2V0QXR0cmlidXRlKCdUYXJnZXRNb2RlJyksXG5cdFx0XHRcdFx0dGFyZ2V0OihhLmdldEF0dHJpYnV0ZSgnVGFyZ2V0TW9kZScpIT1cIkV4dGVybmFsXCIgPyAoZm9sZGVyID8gKGZvbGRlcitcIi9cIikgOiAnJykgOiAnJykrYS5nZXRBdHRyaWJ1dGUoJ1RhcmdldCcpfVxuXHRcdFx0fSx0aGlzKVxuXHR9XG5cdGdldFJlbChpZCl7XG5cdFx0dmFyIHJlbD10aGlzLnJlbHNbaWRdXG5cdFx0aWYocmVsLnRhcmdldE1vZGU9PSdFeHRlcm5hbCcpXG5cdFx0XHRyZXR1cm4gcmVsLnRhcmdldFxuXHRcdHN3aXRjaChyZWwudHlwZSl7XG5cdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldEltYWdlUGFydChyZWwudGFyZ2V0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydChyZWwudGFyZ2V0KVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBpcyhvKXtcblx0XHRyZXR1cm4gbyAmJiBvLmdldFJlbFxuXHR9XG59XG4iXX0=