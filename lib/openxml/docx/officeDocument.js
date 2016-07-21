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

						current.children[0].children = sections;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVFOzs7QUFDTixPQUFJLE9BQUssU0FBTCxDQURFO0FBRU4sVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxRQUFRLE9BQVIsQ0FBZ0IsSUFBSSxJQUFKLENBQWhCLElBQTJCLENBQUMsQ0FBRCxFQUFHO0FBQ2hDLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZjtNQUFSLENBRFAsQ0FEZ0M7S0FBakM7SUFGNkMsQ0FBM0IsQ0FNaEIsTUFOZ0IsQ0FNVDtXQUFHO0lBQUgsQ0FOSCxFQU1VLElBTlYsQ0FNZSxhQUFHO0FBQ3hCLFdBQUssTUFBTCxHQUFZLHFCQUFXLE9BQUssTUFBTCxDQUF2QixDQUR3QjtBQUV4QixXQUFPLElBQUksT0FBSixDQUFZLG1CQUFTO0FBQzNCLFNBQUksT0FBSztBQUNSLFlBQUssT0FBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixHQUFyQjtBQUNMLGdCQUFTLEVBQVQ7TUFGRyxDQUR1QjtBQUszQixTQUFJLE9BQUssSUFBTDtTQUFXLE9BQUssSUFBTDtTQUFXLEtBQUcsSUFBSDtTQUFTLFVBQVEsSUFBUixDQUxSO0FBTTNCLFNBQUksV0FBUyxFQUFULENBTnVCOztBQVEzQixTQUFJLFNBQU8seUJBQVAsQ0FS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bnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1Bhc3NUaHJvdWdofSBmcm9tIFwic3RyZWFtXCJcclxuaW1wb3J0IHNheCBmcm9tIFwic2F4XCJcclxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxyXG5pbXBvcnQgU3R5bGVzIGZyb20gXCIuL3N0eWxlc1wiXHJcblxyXG5jb25zdCBidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBQYXJ0e1xyXG5cdHBhcnNlKCl7XHJcblx0XHRsZXQgYXJncz1hcmd1bWVudHNcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYoYnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbcmVsLnR5cGVdPXBhcnNlZClcclxuXHRcdFx0fVxyXG5cdFx0fSkuZmlsdGVyKGE9PmEpKS50aGVuKGE9PntcclxuXHRcdFx0dGhpcy5zdHlsZXM9bmV3IFN0eWxlcyh0aGlzLnN0eWxlcylcclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0XHRuYW1lOnRoaXMuZG9jLmNvbnN0cnVjdG9yLmV4dCxcclxuXHRcdFx0XHRcdGNoaWxkcmVuOltdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBib2R5PW51bGwsIHNlY3Q9bnVsbCwgcHI9bnVsbCwgY3VycmVudD1yb290XHJcblx0XHRcdFx0bGV0IHNlY3Rpb25zPVtdXHJcblxyXG5cdFx0XHRcdGxldCBzdHJlYW09bmV3IFBhc3NUaHJvdWdoKClcclxuXHRcdFx0XHRzdHJlYW0uZW5kKG5ldyBCdWZmZXIodGhpcy5kYXRhLmFzVWludDhBcnJheSgpKSlcclxuXHRcdFx0XHRzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXHJcblx0XHRcdFx0Lm9uKFwib3BlbnRhZ1wiLCBub2RlPT57XHJcblx0XHRcdFx0XHRub2RlLmNoaWxkcmVuPVtdXHJcblxyXG5cdFx0XHRcdFx0Y3VycmVudC5jaGlsZHJlbi5wdXNoKG5vZGUpXHJcblx0XHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblxyXG5cdFx0XHRcdFx0Y3VycmVudD1ub2RlXHJcblxyXG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0XHRjYXNlICd3OmJvZHknOlxyXG5cdFx0XHRcdFx0XHRib2R5PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlICd3OnNlY3RQcic6XHJcblx0XHRcdFx0XHRcdHByPXNlY3Q9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdGRlZmF1bHQ6XHJcblx0XHRcdFx0XHRcdGlmKHRoaXMuZG9jLmlzUHJvcGVydHkobm9kZS5uYW1lKSAmJiBwcj09bnVsbClcclxuXHRcdFx0XHRcdFx0XHRwcj1jdXJyZW50XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJjbG9zZXRhZ1wiLHRhZz0+e1xyXG5cdFx0XHRcdFx0Y29uc3Qge2F0dHJpYnV0ZXMsIHBhcmVudCwgY2hpbGRyZW4sIGxvY2FsLG5hbWV9PWN1cnJlbnRcclxuXHRcdFx0XHRcdGlmKHByPT1udWxsKXtcclxuXHRcdFx0XHRcdFx0bGV0IGluZGV4PXBhcmVudC5jaGlsZHJlbi5pbmRleE9mKGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMua2V5PWluZGV4XHJcblx0XHRcdFx0XHRcdGxldCBlbGVtZW50PXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoY3VycmVudCwuLi5hcmdzKVxyXG5cclxuXHRcdFx0XHRcdFx0cGFyZW50LmNoaWxkcmVuLnNwbGljZShpbmRleCwxLGVsZW1lbnQpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHR9ZWxzZSBpZihjdXJyZW50PT1wcil7XHJcblx0XHRcdFx0XHRcdGxldCBwcm9wZXJ0eT10aGlzLmRvYy50b1Byb3BlcnR5KGN1cnJlbnQpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQ9cGFyZW50XHJcblx0XHRcdFx0XHRcdGlmKHByIT1zZWN0KVxyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnQuYXR0cmlidXRlcy5kaXJlY3RTdHlsZT1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0XHRlbHNlXHJcblx0XHRcdFx0XHRcdFx0c2VjdD1wcm9wZXJ0eVxyXG5cdFx0XHRcdFx0XHRwcj1udWxsXHJcblx0XHRcdFx0XHR9ZWxzZVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50PXBhcmVudFxyXG5cclxuXHRcdFx0XHRcdGlmKGN1cnJlbnQ9PWJvZHkgJiYgc2VjdCE9bnVsbCl7XHJcblx0XHRcdFx0XHRcdHNlY3Rpb25zLnB1c2godGhpcy5kb2MuY3JlYXRlRWxlbWVudCh7bmFtZTonc2VjdGlvbicsIGF0dHJpYnV0ZXM6IHNlY3QsIGNoaWxkcmVuOiBib2R5LmNoaWxkcmVuLnNwbGljZSgwKX0sLi4uYXJncykpXHJcblx0XHRcdFx0XHRcdHNlY3Q9bnVsbFxyXG5cdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImVuZFwiLCBhPT57XHJcblx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuPXNlY3Rpb25zXHJcblx0XHRcdFx0XHRjdXJyZW50LmF0dHJpYnV0ZXM9dGhpc1xyXG5cdFx0XHRcdFx0cmVzb2x2ZSh0aGlzLmRvYy5jcmVhdGVFbGVtZW50KGN1cnJlbnQsLi4uYXJncykpXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJ0ZXh0XCIsIHRleHQ9PntcclxuXHRcdFx0XHRcdGlmKGN1cnJlbnQucGFyZW50ICYmIGN1cnJlbnQucGFyZW50Lm5hbWU9PVwidzp0XCIpXHJcblx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW4ucHVzaCh0ZXh0KVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG4iXX0=