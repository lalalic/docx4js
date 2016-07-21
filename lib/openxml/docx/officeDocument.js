"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require("stream");

var _sax = require("sax");

var _sax2 = _interopRequireDefault(_sax);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _styles = require("./styles");

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var builtIn = 'settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');

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

			var args = arguments;
			return Promise.all(Object.keys(this.rels).map(function (id) {
				var rel = _this2.rels[id];
				if (builtIn.indexOf(rel.type) != -1) {
					return _this2.doc.getObjectPart(rel.target).then(function (parsed) {
						return _this2[rel.type] = parsed;
					});
				}
			}).filter(function (a) {
				return a;
			})).then(function (a) {
				_this2.styles = new _styles2.default(_this2.styles);
				return new Promise(function (resolve) {
					var root = {
						name: _this2.doc.constructor.ext,
						children: []
					};
					var body = null,
					    sect = null,
					    pr = null,
					    current = root;
					var sections = [];

					var stream = new _stream.PassThrough();
					stream.end(new Buffer(_this2.data.asUint8Array()));
					stream.pipe(_sax2.default.createStream(true, { xmlns: false })).on("opentag", function (node) {
						node.children = [];

						current.children.push(node);
						node.parent = current;

						current = node;

						switch (node.name) {
							case 'w:body':
								body = current;
								break;
							case 'w:sectPr':
								pr = sect = current;
								break;
							default:
								if (_this2.doc.isProperty(node.name) && pr == null) pr = current;
						}
					}).on("closetag", function (tag) {
						var _current = current;
						var attributes = _current.attributes;
						var parent = _current.parent;
						var children = _current.children;
						var local = _current.local;
						var name = _current.name;

						if (pr == null) {
							var _doc;

							var index = parent.children.indexOf(current);
							attributes.key = index;
							if (tag == 'w:document') current.children = sections;
							var element = (_doc = _this2.doc).createElement.apply(_doc, [current].concat(_toConsumableArray(args)));

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var property = _this2.doc.toProperty(current);
							current = parent;
							if (pr != sect) current.attributes.directStyle = property;else sect = property;
							pr = null;
						} else current = parent;

						if (current == body && sect != null) {
							var _doc2;

							sections.push((_doc2 = _this2.doc).createElement.apply(_doc2, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
							sect = null;
						}
					}).on("end", function (a) {
						var _doc3;

						current.attributes = _this2;
						resolve((_doc3 = _this2.doc).createElement.apply(_doc3, [current].concat(_toConsumableArray(args))));
					}).on("text", function (text) {
						if (current.parent && current.parent.name == "w:t") current.children.push(text);
					});
				});
			});
		}
	}]);

	return _class;
}(_part2.default);

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVFOzs7QUFDTixPQUFJLE9BQUssU0FBTCxDQURFO0FBRU4sVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxRQUFRLE9BQVIsQ0FBZ0IsSUFBSSxJQUFKLENBQWhCLElBQTJCLENBQUMsQ0FBRCxFQUFHO0FBQ2hDLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZjtNQUFSLENBRFAsQ0FEZ0M7S0FBakM7SUFGNkMsQ0FBM0IsQ0FNaEIsTUFOZ0IsQ0FNVDtXQUFHO0lBQUgsQ0FOSCxFQU1VLElBTlYsQ0FNZSxhQUFHO0FBQ3hCLFdBQUssTUFBTCxHQUFZLHFCQUFXLE9BQUssTUFBTCxDQUF2QixDQUR3QjtBQUV4QixXQUFPLElBQUksT0FBSixDQUFZLG1CQUFTO0FBQzNCLFNBQUksT0FBSztBQUNSLFlBQUssT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQjtBQUNMLGdCQUFTLEVBQVQ7TUFGRyxDQUR1QjtBQUszQixTQUFJLE9BQUssSUFBTDtTQUFXLE9BQUssSUFBTDtTQUFXLEtBQUcsSUFBSDtTQUFTLFVBQVEsSUFBUixDQUxSO0FBTTNCLFNBQUksV0FBUyxFQUFULENBTnVCOztBQVEzQixTQUFJLFNBQU8seUJBQVAsQ0FS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cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UGFzc1Rocm91Z2h9IGZyb20gXCJzdHJlYW1cIlxyXG5pbXBvcnQgc2F4IGZyb20gXCJzYXhcIlxyXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXHJcbmltcG9ydCBTdHlsZXMgZnJvbSBcIi4vc3R5bGVzXCJcclxuXHJcbmNvbnN0IGJ1aWx0SW49J3NldHRpbmdzLHdlYlNldHRpbmdzLHRoZW1lLHN0eWxlcyxzdHlsZXNXaXRoRWZmZWN0cyxmb250VGFibGUsbnVtYmVyaW5nLGZvb3Rub3RlcyxlbmRub3Rlcycuc3BsaXQoJywnKVxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFBhcnR7XHJcblx0cGFyc2UoKXtcclxuXHRcdGxldCBhcmdzPWFyZ3VtZW50c1xyXG5cdFx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKHRoaXMucmVscykubWFwKGlkPT57XHJcblx0XHRcdGxldCByZWw9dGhpcy5yZWxzW2lkXVxyXG5cdFx0XHRpZihidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSl7XHJcblx0XHRcdFx0cmV0dXJuIHRoaXMuZG9jLmdldE9iamVjdFBhcnQocmVsLnRhcmdldClcclxuXHRcdFx0XHRcdC50aGVuKHBhcnNlZD0+dGhpc1tyZWwudHlwZV09cGFyc2VkKVxyXG5cdFx0XHR9XHJcblx0XHR9KS5maWx0ZXIoYT0+YSkpLnRoZW4oYT0+e1xyXG5cdFx0XHR0aGlzLnN0eWxlcz1uZXcgU3R5bGVzKHRoaXMuc3R5bGVzKVxyXG5cdFx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZT0+e1xyXG5cdFx0XHRcdGxldCByb290PXtcclxuXHRcdFx0XHRcdG5hbWU6dGhpcy5kb2MuY29uc3RydWN0b3IuZXh0LFxyXG5cdFx0XHRcdFx0Y2hpbGRyZW46W11cclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGV0IGJvZHk9bnVsbCwgc2VjdD1udWxsLCBwcj1udWxsLCBjdXJyZW50PXJvb3RcclxuXHRcdFx0XHRsZXQgc2VjdGlvbnM9W11cclxuXHJcblx0XHRcdFx0bGV0IHN0cmVhbT1uZXcgUGFzc1Rocm91Z2goKVxyXG5cdFx0XHRcdHN0cmVhbS5lbmQobmV3IEJ1ZmZlcih0aGlzLmRhdGEuYXNVaW50OEFycmF5KCkpKVxyXG5cdFx0XHRcdHN0cmVhbS5waXBlKHNheC5jcmVhdGVTdHJlYW0odHJ1ZSx7eG1sbnM6ZmFsc2V9KSlcclxuXHRcdFx0XHQub24oXCJvcGVudGFnXCIsIG5vZGU9PntcclxuXHRcdFx0XHRcdG5vZGUuY2hpbGRyZW49W11cclxuXHJcblx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2gobm9kZSlcclxuXHRcdFx0XHRcdG5vZGUucGFyZW50PWN1cnJlbnRcclxuXHJcblx0XHRcdFx0XHRjdXJyZW50PW5vZGVcclxuXHJcblx0XHRcdFx0XHRzd2l0Y2gobm9kZS5uYW1lKXtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6Ym9keSc6XHJcblx0XHRcdFx0XHRcdGJvZHk9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGNhc2UgJ3c6c2VjdFByJzpcclxuXHRcdFx0XHRcdFx0cHI9c2VjdD1jdXJyZW50XHJcblx0XHRcdFx0XHRicmVha1xyXG5cdFx0XHRcdFx0ZGVmYXVsdDpcclxuXHRcdFx0XHRcdFx0aWYodGhpcy5kb2MuaXNQcm9wZXJ0eShub2RlLm5hbWUpICYmIHByPT1udWxsKVxyXG5cdFx0XHRcdFx0XHRcdHByPWN1cnJlbnRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImNsb3NldGFnXCIsdGFnPT57XHJcblx0XHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpXHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbj1zZWN0aW9uc1xyXG5cdFx0XHRcdFx0XHRsZXQgZWxlbWVudD10aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQsLi4uYXJncylcclxuXHJcblx0XHRcdFx0XHRcdHBhcmVudC5jaGlsZHJlbi5zcGxpY2UoaW5kZXgsMSxlbGVtZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0fWVsc2UgaWYoY3VycmVudD09cHIpe1xyXG5cdFx0XHRcdFx0XHRsZXQgcHJvcGVydHk9dGhpcy5kb2MudG9Qcm9wZXJ0eShjdXJyZW50KVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cdFx0XHRcdFx0XHRpZihwciE9c2VjdClcclxuXHRcdFx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0ZWxzZVxyXG5cdFx0XHRcdFx0XHRcdHNlY3Q9cHJvcGVydHlcclxuXHRcdFx0XHRcdFx0cHI9bnVsbFxyXG5cdFx0XHRcdFx0fWVsc2VcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9LC4uLmFyZ3MpKVxyXG5cdFx0XHRcdFx0XHRzZWN0PW51bGxcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzPXRoaXNcclxuXHRcdFx0XHRcdHJlc29sdmUodGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50LC4uLmFyZ3MpKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0XHRpZihjdXJyZW50LnBhcmVudCAmJiBjdXJyZW50LnBhcmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19