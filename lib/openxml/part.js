"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _xml2js = require("xml2js");

var _stream = require("stream");

var _sax = require("sax");

var _sax2 = _interopRequireDefault(_sax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function () {
	function _class(name, doc) {
		var _this = this;

		(0, _classCallCheck3.default)(this, _class);

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

	(0, _createClass3.default)(_class, [{
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
			(0, _keys2.default)($).forEach(function (a) {
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
			return _promise2.default.resolve();
		}
	}]);
	return _class;
}();

exports.default = _class;
module.exports = exports["default"];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsImRhdGEiLCJwYXJ0cyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiYXNUZXh0IiwibWVyZ2VBdHRycyIsImV4cGxpY2l0QXJyYXkiLCJlcnJvciIsIlJlbGF0aW9uc2hpcHMiLCJSZWxhdGlvbnNoaXAiLCJmb3JFYWNoIiwiYSIsIklkIiwidHlwZSIsIlR5cGUiLCJzcGxpdCIsInBvcCIsInRhcmdldE1vZGUiLCJUYXJnZXRNb2RlIiwidGFyZ2V0IiwiVGFyZ2V0IiwiaWQiLCJyZWwiLCJnZXRCdWZmZXJQYXJ0IiwiZ2V0UGFydCIsIm5vZGUiLCIkIiwiYXR0cmlidXRlcyIsInBhcmVudCIsImFzIiwibGVuZ3RoIiwic3RyZWFtIiwiZW5kIiwiQnVmZmVyIiwiYXNVaW50OEFycmF5IiwicGlwZSIsImNyZWF0ZVN0cmVhbSIsInhtbG5zIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7O0FBR0MsaUJBQVlBLElBQVosRUFBaUJDLEdBQWpCLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ3BCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLElBQUwsR0FBVUQsSUFBSUUsS0FBSixDQUFVSCxJQUFWLENBQVY7QUFDQSxPQUFLSSxJQUFMLEdBQVUsRUFBVjs7QUFFQSxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUNDQyxVQUFRLFdBQVNOLElBQVQsR0FBYyxPQUR2QjtBQUFBLE1BRUNPLElBQUVQLEtBQUtRLFdBQUwsQ0FBaUIsR0FBakIsQ0FGSDtBQUdBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0wsS0FBS1MsU0FBTCxDQUFlLENBQWYsRUFBaUJGLENBQWpCLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxTQUFQLEdBQWlCTCxLQUFLUyxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBakIsR0FBcUMsT0FBN0M7QUFDQTs7QUFFRCxNQUFHLENBQUNOLElBQUlFLEtBQUosQ0FBVUcsT0FBVixDQUFKLEVBQXdCO0FBQ3hCLE9BQUtBLE9BQUwsR0FBYUEsT0FBYjs7QUFFQSwyQkFBTUwsSUFBSUUsS0FBSixDQUFVRyxPQUFWLEVBQW1CSSxNQUFuQixFQUFOLEVBQWtDLEVBQUNDLFlBQVcsSUFBWixFQUFpQkMsZUFBYyxLQUEvQixFQUFsQyxFQUF5RSxVQUFDQyxLQUFELEVBQVFaLEdBQVIsRUFBYztBQUN0RkEsT0FBSWEsYUFBSixDQUFrQkMsWUFBbEIsQ0FBK0JDLE9BQS9CLENBQXVDLFVBQUNDLENBQUQsRUFBSVYsQ0FBSixFQUFRO0FBQzlDLFVBQUtILElBQUwsQ0FBVWEsRUFBRUMsRUFBWixJQUFnQjtBQUNmQyxXQUFLRixFQUFFRyxJQUFGLENBQU9DLEtBQVAsQ0FBYSxHQUFiLEVBQWtCQyxHQUFsQixFQURVO0FBRWZDLGlCQUFZTixFQUFFTyxVQUZDO0FBR2ZDLGFBQU8sQ0FBQ1IsRUFBRU8sVUFBRixJQUFjLFVBQWQsR0FBNEJuQixTQUFVQSxTQUFPLEdBQWpCLEdBQXdCLEVBQXBELEdBQTBELEVBQTNELElBQStEWSxFQUFFUyxNQUh6RCxFQUFoQjtBQUlBLElBTEQ7QUFNQSxHQVBEO0FBU0E7Ozs7eUJBRU1DLEUsRUFBRztBQUNULE9BQUlDLE1BQUksS0FBS3hCLElBQUwsQ0FBVXVCLEVBQVYsQ0FBUjtBQUNBLE9BQUdDLElBQUlMLFVBQUosSUFBZ0IsVUFBbkIsRUFDQyxPQUFPSyxJQUFJSCxNQUFYO0FBQ0QsV0FBT0csSUFBSVQsSUFBWDtBQUNBLFNBQUssT0FBTDtBQUNDLFlBQU8sS0FBS2xCLEdBQUwsQ0FBUzRCLGFBQVQsQ0FBdUJELElBQUlILE1BQTNCLENBQVA7QUFDRDtBQUNDLFlBQU8sS0FBS3hCLEdBQUwsQ0FBUzZCLE9BQVQsQ0FBaUJGLElBQUlILE1BQXJCLENBQVA7QUFKRDtBQU1BOzs7OEJBRVdNLEksRUFBSztBQUNoQixPQUFJQyxJQUFFRCxLQUFLQyxDQUFMLEdBQU9ELEtBQUtFLFVBQWxCO0FBQ0EsVUFBT0YsS0FBS0UsVUFBWjtBQUNBLFVBQU9GLEtBQUtHLE1BQVo7QUFDQSxVQUFPSCxLQUFLL0IsSUFBWjtBQUNBLHVCQUFZZ0MsQ0FBWixFQUFlaEIsT0FBZixDQUF1QixhQUFHO0FBQ3pCLFFBQUltQixLQUFHbEIsRUFBRUksS0FBRixDQUFRLEdBQVIsQ0FBUDtBQUNBLFFBQUdjLEdBQUdDLE1BQUgsSUFBVyxDQUFkLEVBQWdCO0FBQ2ZKLE9BQUVHLEdBQUcsQ0FBSCxDQUFGLElBQVNILEVBQUVmLENBQUYsQ0FBVDtBQUNBLFlBQU9lLEVBQUVmLENBQUYsQ0FBUDtBQUNBO0FBQ0QsSUFORDtBQU9BLFVBQU9jLElBQVA7QUFDQTs7O3FDQUVpQjtBQUNqQixPQUFJTSxTQUFPLHlCQUFYO0FBQ0FBLFVBQU9DLEdBQVAsQ0FBVyxJQUFJQyxNQUFKLENBQVcsS0FBS3JDLElBQUwsQ0FBVXNDLFlBQVYsRUFBWCxDQUFYO0FBQ0EsVUFBT0gsT0FBT0ksSUFBUCxDQUFZLGNBQUlDLFlBQUosQ0FBaUIsSUFBakIsRUFBc0IsRUFBQ0MsT0FBTSxLQUFQLEVBQXRCLENBQVosQ0FBUDtBQUNBOzs7MEJBRU07QUFDTixVQUFPLGtCQUFRQyxPQUFSLEVBQVA7QUFDQSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYXJzZVN0cmluZyBhcyBwYXJzZX0gZnJvbSBcInhtbDJqc1wiXG5pbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNze1xuXHRjb25zdHJ1Y3RvcihuYW1lLGRvYyl7XG5cdFx0dGhpcy5uYW1lPW5hbWVcblx0XHR0aGlzLmRvYz1kb2Ncblx0XHR0aGlzLmRhdGE9ZG9jLnBhcnRzW25hbWVdXG5cdFx0dGhpcy5yZWxzPXt9XG5cblx0XHR2YXIgZm9sZGVyPVwiXCIsXG5cdFx0XHRyZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCIsXG5cdFx0XHRpPW5hbWUubGFzdEluZGV4T2YoJy8nKTtcblx0XHRpZihpIT09LTEpe1xuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSlcblx0XHRcdHJlbE5hbWU9Zm9sZGVyK1wiL19yZWxzL1wiK25hbWUuc3Vic3RyaW5nKGkrMSkrXCIucmVsc1wiO1xuXHRcdH1cblxuXHRcdGlmKCFkb2MucGFydHNbcmVsTmFtZV0pIHJldHVybjtcblx0XHR0aGlzLnJlbE5hbWU9cmVsTmFtZVxuXHRcdFxuXHRcdHBhcnNlKGRvYy5wYXJ0c1tyZWxOYW1lXS5hc1RleHQoKSx7bWVyZ2VBdHRyczp0cnVlLGV4cGxpY2l0QXJyYXk6ZmFsc2V9LCAoZXJyb3IsIGRvYyk9Pntcblx0XHRcdGRvYy5SZWxhdGlvbnNoaXBzLlJlbGF0aW9uc2hpcC5mb3JFYWNoKChhLCBpKT0+e1xuXHRcdFx0XHR0aGlzLnJlbHNbYS5JZF09e1xuXHRcdFx0XHRcdHR5cGU6YS5UeXBlLnNwbGl0KCcvJykucG9wKCksXG5cdFx0XHRcdFx0dGFyZ2V0TW9kZTogYS5UYXJnZXRNb2RlLFxuXHRcdFx0XHRcdHRhcmdldDooYS5UYXJnZXRNb2RlIT1cIkV4dGVybmFsXCIgPyAoZm9sZGVyID8gKGZvbGRlcitcIi9cIikgOiAnJykgOiAnJykrYS5UYXJnZXR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0XHRcblx0fVxuXHRcblx0Z2V0UmVsKGlkKXtcblx0XHR2YXIgcmVsPXRoaXMucmVsc1tpZF1cblx0XHRpZihyZWwudGFyZ2V0TW9kZT09J0V4dGVybmFsJylcblx0XHRcdHJldHVybiByZWwudGFyZ2V0XG5cdFx0c3dpdGNoKHJlbC50eXBlKXtcblx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0QnVmZmVyUGFydChyZWwudGFyZ2V0KVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0UGFydChyZWwudGFyZ2V0KVxuXHRcdH1cblx0fVxuXHRcblx0YXNYbWxPYmplY3Qobm9kZSl7XG5cdFx0bGV0ICQ9bm9kZS4kPW5vZGUuYXR0cmlidXRlc1xuXHRcdGRlbGV0ZSBub2RlLmF0dHJpYnV0ZXNcblx0XHRkZWxldGUgbm9kZS5wYXJlbnRcblx0XHRkZWxldGUgbm9kZS5uYW1lXG5cdFx0T2JqZWN0LmtleXMoJCkuZm9yRWFjaChhPT57XG5cdFx0XHRsZXQgYXM9YS5zcGxpdCgnOicpXG5cdFx0XHRpZihhcy5sZW5ndGg9PTIpe1xuXHRcdFx0XHQkW2FzWzFdXT0kW2FdXG5cdFx0XHRcdGRlbGV0ZSAkW2FdXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRyZXR1cm4gbm9kZVxuXHR9XG5cdFxuXHRnZXRDb250ZW50U3RyZWFtKCl7XG5cdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxuXHRcdHN0cmVhbS5lbmQobmV3IEJ1ZmZlcih0aGlzLmRhdGEuYXNVaW50OEFycmF5KCkpKVxuXHRcdHJldHVybiBzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXG5cdH1cblx0XG5cdHBhcnNlKCl7XG5cdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG5cdH1cbn1cbiJdfQ==