"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _xml2js = require("xml2js");

var _stream = require("stream");

var _sax = require("sax");

var _sax2 = _interopRequireDefault(_sax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
					return this.doc.getBufferPart(rel.target);
				default:
					return this.doc.getPart(rel.target);
			}
		}
	}, {
		key: "asXmlObject",
		value: function asXmlObject(node) {
			var $ = node.$ = node.attributes;
			delete node.attributes;
			delete node.parent;
			delete node.name;
			Object.keys($).forEach(function (a) {
				var as = a.split(':');
				if (as.length == 2) {
					$[as[1]] = $[a];
					delete $[a];
				}
			});
			return node;
		}
	}, {
		key: "getContentStream",
		value: function getContentStream() {
			var stream = new _stream.PassThrough();
			stream.end(new Buffer(this.data.asUint8Array()));
			return stream.pipe(_sax2.default.createStream(true, { xmlns: false }));
		}
	}, {
		key: "parse",
		value: function parse() {
			return Promise.resolve();
		}
	}]);

	return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7O0FBR0MsaUJBQVksSUFBWixFQUFpQixHQUFqQixFQUFxQjs7Ozs7QUFDcEIsT0FBSyxJQUFMLEdBQVUsSUFBVixDQURvQjtBQUVwQixPQUFLLEdBQUwsR0FBUyxHQUFULENBRm9CO0FBR3BCLE9BQUssSUFBTCxHQUFVLElBQUksS0FBSixDQUFVLElBQVYsQ0FBVixDQUhvQjtBQUlwQixPQUFLLElBQUwsR0FBVSxFQUFWLENBSm9COztBQU1wQixNQUFJLFNBQU8sRUFBUDtNQUNILFVBQVEsV0FBUyxJQUFULEdBQWMsT0FBZDtNQUNSLElBQUUsS0FBSyxXQUFMLENBQWlCLEdBQWpCLENBQUYsQ0FSbUI7QUFTcEIsTUFBRyxNQUFJLENBQUMsQ0FBRCxFQUFHO0FBQ1QsWUFBTyxLQUFLLFNBQUwsQ0FBZSxDQUFmLEVBQWlCLENBQWpCLENBQVAsQ0FEUztBQUVULGFBQVEsU0FBTyxTQUFQLEdBQWlCLEtBQUssU0FBTCxDQUFlLElBQUUsQ0FBRixDQUFoQyxHQUFxQyxPQUFyQyxDQUZDO0dBQVY7O0FBS0EsTUFBRyxDQUFDLElBQUksS0FBSixDQUFVLE9BQVYsQ0FBRCxFQUFxQixPQUF4QjtBQUNBLE9BQUssT0FBTCxHQUFhLE9BQWIsQ0Fmb0I7O0FBaUJwQiwyQkFBTSxJQUFJLEtBQUosQ0FBVSxPQUFWLEVBQW1CLE1BQW5CLEVBQU4sRUFBa0MsRUFBQyxZQUFXLElBQVgsRUFBZ0IsZUFBYyxLQUFkLEVBQW5ELEVBQXlFLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYztBQUN0RixPQUFJLGFBQUosQ0FBa0IsWUFBbEIsQ0FBK0IsT0FBL0IsQ0FBdUMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFRO0FBQzlDLFVBQUssSUFBTCxDQUFVLEVBQUUsRUFBRixDQUFWLEdBQWdCO0FBQ2YsV0FBSyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQWEsR0FBYixFQUFrQixHQUFsQixFQUFMO0FBQ0EsaUJBQVksRUFBRSxVQUFGO0FBQ1osYUFBTyxDQUFDLEVBQUUsVUFBRixJQUFjLFVBQWQsR0FBNEIsU0FBVSxTQUFPLEdBQVAsR0FBYyxFQUF4QixHQUE4QixFQUExRCxDQUFELEdBQStELEVBQUUsTUFBRixFQUh2RSxDQUQ4QztJQUFSLENBQXZDLENBRHNGO0dBQWQsQ0FBekUsQ0FqQm9CO0VBQXJCOzs7O3lCQTRCTyxJQUFHO0FBQ1QsT0FBSSxNQUFJLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBSixDQURLO0FBRVQsT0FBRyxJQUFJLFVBQUosSUFBZ0IsVUFBaEIsRUFDRixPQUFPLElBQUksTUFBSixDQURSO0FBRUEsV0FBTyxJQUFJLElBQUo7QUFDUCxTQUFLLE9BQUw7QUFDQyxZQUFPLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBdUIsSUFBSSxNQUFKLENBQTlCLENBREQ7QUFEQTtBQUlDLFlBQU8sS0FBSyxHQUFMLENBQVMsT0FBVCxDQUFpQixJQUFJLE1BQUosQ0FBeEIsQ0FERDtBQUhBLElBSlM7Ozs7OEJBWUUsTUFBSztBQUNoQixPQUFJLElBQUUsS0FBSyxDQUFMLEdBQU8sS0FBSyxVQUFMLENBREc7QUFFaEIsVUFBTyxLQUFLLFVBQUwsQ0FGUztBQUdoQixVQUFPLEtBQUssTUFBTCxDQUhTO0FBSWhCLFVBQU8sS0FBSyxJQUFMLENBSlM7QUFLaEIsVUFBTyxJQUFQLENBQVksQ0FBWixFQUFlLE9BQWYsQ0FBdUIsYUFBRztBQUN6QixRQUFJLEtBQUcsRUFBRSxLQUFGLENBQVEsR0FBUixDQUFILENBRHFCO0FBRXpCLFFBQUcsR0FBRyxNQUFILElBQVcsQ0FBWCxFQUFhO0FBQ2YsT0FBRSxHQUFHLENBQUgsQ0FBRixJQUFTLEVBQUUsQ0FBRixDQUFULENBRGU7QUFFZixZQUFPLEVBQUUsQ0FBRixDQUFQLENBRmU7S0FBaEI7SUFGc0IsQ0FBdkIsQ0FMZ0I7QUFZaEIsVUFBTyxJQUFQLENBWmdCOzs7O3FDQWVDO0FBQ2pCLE9BQUksU0FBTyx5QkFBUCxDQURhO0FBRWpCLFVBQU8sR0FBUCxDQUFXLElBQUksTUFBSixDQUFXLEtBQUssSUFBTCxDQUFVLFlBQVYsRUFBWCxDQUFYLEVBRmlCO0FBR2pCLFVBQU8sT0FBTyxJQUFQLENBQVksY0FBSSxZQUFKLENBQWlCLElBQWpCLEVBQXNCLEVBQUMsT0FBTSxLQUFOLEVBQXZCLENBQVosQ0FBUCxDQUhpQjs7OzswQkFNWDtBQUNOLFVBQU8sUUFBUSxPQUFSLEVBQVAsQ0FETSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYXJzZVN0cmluZyBhcyBwYXJzZX0gZnJvbSBcInhtbDJqc1wiXG5pbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XG5cdFx0dGhpcy5uYW1lPW5hbWVcblx0XHR0aGlzLmRvYz1kb2Ncblx0XHR0aGlzLmRhdGE9ZG9jLnBhcnRzW25hbWVdXG5cdFx0dGhpcy5yZWxzPXt9XG5cblx0XHR2YXIgZm9sZGVyPVwiXCIsXG5cdFx0XHRyZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCIsXG5cdFx0XHRpPW5hbWUubGFzdEluZGV4T2YoJy8nKTtcblx0XHRpZihpIT09LTEpe1xuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiL19yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xuXHRcdH1cblxuXHRcdGlmKCFkb2MucGFydHNbcmVsTmFtZV0pIHJldHVybjtcblx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxuXHRcdFxuXHRcdHBhcnNlKGRvYy5wYXJ0c1tyZWxOYW1lXS5hc1RleHQoKSx7bWVyZ2VBdHRyczp0cnVlLGV4cGxpY2l0QXJyYXk6ZmFsc2V9LCAoZXJyb3IsIGRvYyk9Pntcblx0XHRcdGRvYy5SZWxhdGlvbnNoaXBzLlJlbGF0aW9uc2hpcC5mb3JFYWNoKChhLCBpKT0+e1xuXHRcdFx0XHR0aGlzLnJlbHNbYS5JZF09e1xuXHRcdFx0XHRcdHR5cGU6YS5UeXBlLnNwbGl0KCcvJykucG9wKCksXG5cdFx0XHRcdFx0dGFyZ2V0TW9kZTogYS5UYXJnZXRNb2RlLFxuXHRcdFx0XHRcdHRhcmdldDooYS5UYXJnZXRNb2RlIT1cIkV4dGVybmFsXCIgPyAoZm9sZGVyID8gKGZvbGRlcitcIi9cIikgOiAnJykgOiAnJykrYS5UYXJnZXR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0XHRcblx0fVxuXHRcblx0Z2V0UmVsKGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVsc1tpZF1cblx0XHRpZihyZWwudGFyZ2V0TW9kZT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiByZWwudGFyZ2V0XG5cdFx0c3dpdGNoKHJlbC50eXBlKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0QnVmZmVyUGFydChyZWwudGFyZ2V0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydChyZWwudGFyZ2V0KVxuXHRcdH1cblx0fVxuXHRcblx0YXNYbWxPYmplY3Qobm9kZSl7XG5cdFx0bGV0ICQ9bm9kZS4kPW5vZGUuYXR0cmlidXRlc1xuXHRcdGRlbGV0ZSBub2RlLmF0dHJpYnV0ZXNcblx0XHRkZWxldGUgbm9kZS5wYXJlbnRcblx0XHRkZWxldGUgbm9kZS5uYW1lXG5cdFx0T2JqZWN0LmtleXMoJCkuZm9yRWFjaChhPT57XG5cdFx0XHRsZXQgYXM9YS5zcGxpdCgnOicpXG5cdFx0XHRpZihhcy5sZW5ndGg9PTIpe1xuXHRcdFx0XHQkW2FzWzFdXT0kW2FdXG5cdFx0XHRcdGRlbGV0ZSAkW2FdXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRyZXR1cm4gbm9kZVxuXHR9XG5cdFxuXHRnZXRDb250ZW50U3RyZWFtKCl7XG5cdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxuXHRcdHN0cmVhbS5lbmQobmV3IEJ1ZmZlcih0aGlzLmRhdGEuYXNVaW50OEFycmF5KCkpKVxuXHRcdHJldHVybiBzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXG5cdH1cblx0XG5cdHBhcnNlKCl7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdH1cbn1cbiJdfQ==