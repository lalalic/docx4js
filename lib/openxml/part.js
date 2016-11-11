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
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL3BhcnQuanMiXSwibmFtZXMiOlsibmFtZSIsImRvYyIsImRhdGEiLCJwYXJ0cyIsInJlbHMiLCJmb2xkZXIiLCJyZWxOYW1lIiwiaSIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwiYXNUZXh0IiwibWVyZ2VBdHRycyIsImV4cGxpY2l0QXJyYXkiLCJlcnJvciIsIlJlbGF0aW9uc2hpcHMiLCJSZWxhdGlvbnNoaXAiLCJmb3JFYWNoIiwiYSIsIklkIiwidHlwZSIsIlR5cGUiLCJzcGxpdCIsInBvcCIsInRhcmdldE1vZGUiLCJUYXJnZXRNb2RlIiwidGFyZ2V0IiwiVGFyZ2V0IiwiaWQiLCJyZWwiLCJnZXRCdWZmZXJQYXJ0IiwiZ2V0UGFydCIsIm5vZGUiLCIkIiwiYXR0cmlidXRlcyIsInBhcmVudCIsImFzIiwibGVuZ3RoIiwic3RyZWFtIiwiZW5kIiwiQnVmZmVyIiwiYXNVaW50OEFycmF5IiwicGlwZSIsImNyZWF0ZVN0cmVhbSIsInhtbG5zIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7O0FBR0MsaUJBQVlBLElBQVosRUFBaUJDLEdBQWpCLEVBQXFCO0FBQUE7O0FBQUE7O0FBQ3BCLE9BQUtELElBQUwsR0FBVUEsSUFBVjtBQUNBLE9BQUtDLEdBQUwsR0FBU0EsR0FBVDtBQUNBLE9BQUtDLElBQUwsR0FBVUQsSUFBSUUsS0FBSixDQUFVSCxJQUFWLENBQVY7QUFDQSxPQUFLSSxJQUFMLEdBQVUsRUFBVjs7QUFFQSxNQUFJQyxTQUFPLEVBQVg7QUFBQSxNQUNDQyxVQUFRLFdBQVNOLElBQVQsR0FBYyxPQUR2QjtBQUFBLE1BRUNPLElBQUVQLEtBQUtRLFdBQUwsQ0FBaUIsR0FBakIsQ0FGSDtBQUdBLE1BQUdELE1BQUksQ0FBQyxDQUFSLEVBQVU7QUFDVEYsWUFBT0wsS0FBS1MsU0FBTCxDQUFlLENBQWYsRUFBaUJGLENBQWpCLENBQVA7QUFDQUQsYUFBUUQsU0FBTyxTQUFQLEdBQWlCTCxLQUFLUyxTQUFMLENBQWVGLElBQUUsQ0FBakIsQ0FBakIsR0FBcUMsT0FBN0M7QUFDQTs7QUFFRCxNQUFHLENBQUNOLElBQUlFLEtBQUosQ0FBVUcsT0FBVixDQUFKLEVBQXdCO0FBQ3hCLE9BQUtBLE9BQUwsR0FBYUEsT0FBYjs7QUFFQSwyQkFBTUwsSUFBSUUsS0FBSixDQUFVRyxPQUFWLEVBQW1CSSxNQUFuQixFQUFOLEVBQWtDLEVBQUNDLFlBQVcsSUFBWixFQUFpQkMsZUFBYyxLQUEvQixFQUFsQyxFQUF5RSxVQUFDQyxLQUFELEVBQVFaLEdBQVIsRUFBYztBQUN0RkEsT0FBSWEsYUFBSixDQUFrQkMsWUFBbEIsQ0FBK0JDLE9BQS9CLENBQXVDLFVBQUNDLENBQUQsRUFBSVYsQ0FBSixFQUFRO0FBQzlDLFVBQUtILElBQUwsQ0FBVWEsRUFBRUMsRUFBWixJQUFnQjtBQUNmQyxXQUFLRixFQUFFRyxJQUFGLENBQU9DLEtBQVAsQ0FBYSxHQUFiLEVBQWtCQyxHQUFsQixFQURVO0FBRWZDLGlCQUFZTixFQUFFTyxVQUZDO0FBR2ZDLGFBQU8sQ0FBQ1IsRUFBRU8sVUFBRixJQUFjLFVBQWQsR0FBNEJuQixTQUFVQSxTQUFPLEdBQWpCLEdBQXdCLEVBQXBELEdBQTBELEVBQTNELElBQStEWSxFQUFFUyxNQUh6RCxFQUFoQjtBQUlBLElBTEQ7QUFNQSxHQVBEO0FBU0E7Ozs7eUJBRU1DLEUsRUFBRztBQUNULE9BQUlDLE1BQUksS0FBS3hCLElBQUwsQ0FBVXVCLEVBQVYsQ0FBUjtBQUNBLE9BQUdDLElBQUlMLFVBQUosSUFBZ0IsVUFBbkIsRUFDQyxPQUFPSyxJQUFJSCxNQUFYO0FBQ0QsV0FBT0csSUFBSVQsSUFBWDtBQUNBLFNBQUssT0FBTDtBQUNDLFlBQU8sS0FBS2xCLEdBQUwsQ0FBUzRCLGFBQVQsQ0FBdUJELElBQUlILE1BQTNCLENBQVA7QUFDRDtBQUNDLFlBQU8sS0FBS3hCLEdBQUwsQ0FBUzZCLE9BQVQsQ0FBaUJGLElBQUlILE1BQXJCLENBQVA7QUFKRDtBQU1BOzs7OEJBRVdNLEksRUFBSztBQUNoQixPQUFJQyxJQUFFRCxLQUFLQyxDQUFMLEdBQU9ELEtBQUtFLFVBQWxCO0FBQ0EsVUFBT0YsS0FBS0UsVUFBWjtBQUNBLFVBQU9GLEtBQUtHLE1BQVo7QUFDQSxVQUFPSCxLQUFLL0IsSUFBWjtBQUNBLHVCQUFZZ0MsQ0FBWixFQUFlaEIsT0FBZixDQUF1QixhQUFHO0FBQ3pCLFFBQUltQixLQUFHbEIsRUFBRUksS0FBRixDQUFRLEdBQVIsQ0FBUDtBQUNBLFFBQUdjLEdBQUdDLE1BQUgsSUFBVyxDQUFkLEVBQWdCO0FBQ2ZKLE9BQUVHLEdBQUcsQ0FBSCxDQUFGLElBQVNILEVBQUVmLENBQUYsQ0FBVDtBQUNBLFlBQU9lLEVBQUVmLENBQUYsQ0FBUDtBQUNBO0FBQ0QsSUFORDtBQU9BLFVBQU9jLElBQVA7QUFDQTs7O3FDQUVpQjtBQUNqQixPQUFJTSxTQUFPLHlCQUFYO0FBQ0FBLFVBQU9DLEdBQVAsQ0FBVyxJQUFJQyxNQUFKLENBQVcsS0FBS3JDLElBQUwsQ0FBVXNDLFlBQVYsRUFBWCxDQUFYO0FBQ0EsVUFBT0gsT0FBT0ksSUFBUCxDQUFZLGNBQUlDLFlBQUosQ0FBaUIsSUFBakIsRUFBc0IsRUFBQ0MsT0FBTSxLQUFQLEVBQXRCLENBQVosQ0FBUDtBQUNBOzs7MEJBRU07QUFDTixVQUFPLGtCQUFRQyxPQUFSLEVBQVA7QUFDQSIsImZpbGUiOiJwYXJ0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtwYXJzZVN0cmluZyBhcyBwYXJzZX0gZnJvbSBcInhtbDJqc1wiXHJcbmltcG9ydCB7UGFzc1Rocm91Z2h9IGZyb20gXCJzdHJlYW1cIlxyXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3N7XHJcblx0Y29uc3RydWN0b3IobmFtZSxkb2Mpe1xyXG5cdFx0dGhpcy5uYW1lPW5hbWVcclxuXHRcdHRoaXMuZG9jPWRvY1xyXG5cdFx0dGhpcy5kYXRhPWRvYy5wYXJ0c1tuYW1lXVxyXG5cdFx0dGhpcy5yZWxzPXt9XHJcblxyXG5cdFx0dmFyIGZvbGRlcj1cIlwiLFxyXG5cdFx0XHRyZWxOYW1lPVwiX3JlbHMvXCIrbmFtZStcIi5yZWxzXCIsXHJcblx0XHRcdGk9bmFtZS5sYXN0SW5kZXhPZignLycpO1xyXG5cdFx0aWYoaSE9PS0xKXtcclxuXHRcdFx0Zm9sZGVyPW5hbWUuc3Vic3RyaW5nKDAsaSlcclxuXHRcdFx0cmVsTmFtZT1mb2xkZXIrXCIvX3JlbHMvXCIrbmFtZS5zdWJzdHJpbmcoaSsxKStcIi5yZWxzXCI7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIWRvYy5wYXJ0c1tyZWxOYW1lXSkgcmV0dXJuO1xyXG5cdFx0dGhpcy5yZWxOYW1lPXJlbE5hbWVcclxuXHRcdFxyXG5cdFx0cGFyc2UoZG9jLnBhcnRzW3JlbE5hbWVdLmFzVGV4dCgpLHttZXJnZUF0dHJzOnRydWUsZXhwbGljaXRBcnJheTpmYWxzZX0sIChlcnJvciwgZG9jKT0+e1xyXG5cdFx0XHRkb2MuUmVsYXRpb25zaGlwcy5SZWxhdGlvbnNoaXAuZm9yRWFjaCgoYSwgaSk9PntcclxuXHRcdFx0XHR0aGlzLnJlbHNbYS5JZF09e1xyXG5cdFx0XHRcdFx0dHlwZTphLlR5cGUuc3BsaXQoJy8nKS5wb3AoKSxcclxuXHRcdFx0XHRcdHRhcmdldE1vZGU6IGEuVGFyZ2V0TW9kZSxcclxuXHRcdFx0XHRcdHRhcmdldDooYS5UYXJnZXRNb2RlIT1cIkV4dGVybmFsXCIgPyAoZm9sZGVyID8gKGZvbGRlcitcIi9cIikgOiAnJykgOiAnJykrYS5UYXJnZXR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdFx0XHRcclxuXHR9XHJcblx0XHJcblx0Z2V0UmVsKGlkKXtcclxuXHRcdHZhciByZWw9dGhpcy5yZWxzW2lkXVxyXG5cdFx0aWYocmVsLnRhcmdldE1vZGU9PSdFeHRlcm5hbCcpXHJcblx0XHRcdHJldHVybiByZWwudGFyZ2V0XHJcblx0XHRzd2l0Y2gocmVsLnR5cGUpe1xyXG5cdFx0Y2FzZSAnaW1hZ2UnOlxyXG5cdFx0XHRyZXR1cm4gdGhpcy5kb2MuZ2V0QnVmZmVyUGFydChyZWwudGFyZ2V0KVxyXG5cdFx0ZGVmYXVsdDpcclxuXHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldFBhcnQocmVsLnRhcmdldClcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0YXNYbWxPYmplY3Qobm9kZSl7XHJcblx0XHRsZXQgJD1ub2RlLiQ9bm9kZS5hdHRyaWJ1dGVzXHJcblx0XHRkZWxldGUgbm9kZS5hdHRyaWJ1dGVzXHJcblx0XHRkZWxldGUgbm9kZS5wYXJlbnRcclxuXHRcdGRlbGV0ZSBub2RlLm5hbWVcclxuXHRcdE9iamVjdC5rZXlzKCQpLmZvckVhY2goYT0+e1xyXG5cdFx0XHRsZXQgYXM9YS5zcGxpdCgnOicpXHJcblx0XHRcdGlmKGFzLmxlbmd0aD09Mil7XHJcblx0XHRcdFx0JFthc1sxXV09JFthXVxyXG5cdFx0XHRcdGRlbGV0ZSAkW2FdXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRyZXR1cm4gbm9kZVxyXG5cdH1cclxuXHRcclxuXHRnZXRDb250ZW50U3RyZWFtKCl7XHJcblx0XHRsZXQgc3RyZWFtPW5ldyBQYXNzVGhyb3VnaCgpXHJcblx0XHRzdHJlYW0uZW5kKG5ldyBCdWZmZXIodGhpcy5kYXRhLmFzVWludDhBcnJheSgpKSlcclxuXHRcdHJldHVybiBzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXHJcblx0fVxyXG5cdFxyXG5cdHBhcnNlKCl7XHJcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKClcclxuXHR9XHJcbn1cclxuIl19