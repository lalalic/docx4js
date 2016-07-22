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

var _font = require("./theme/font");

var _font2 = _interopRequireDefault(_font);

var _color = require("./theme/color");

var _color2 = _interopRequireDefault(_color);

var _format = require("./theme/format");

var _format2 = _interopRequireDefault(_format);

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

				_this2.styles = new _styles2.default(_this2.styles, _this2.doc);
				_this2.fontTheme = new _font2.default(_this2.theme.get('theme.themeElements.fontScheme'), _this2.settings.get('settings.themeFontLang').$);
				_this2.colorTheme = new _color2.default(_this2.theme.get('theme.themeElements.clrScheme'), _this2.settings.get('settings.clrSchemeMapping').$);
				_this2.formatTheme = new _format2.default(_this2.theme.get('theme.themeElements.fmtScheme'));

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
						if (_this2.doc.isProperty(node.name) && pr == null) pr = node;

						node.parent = current;
						current = node;

						if (pr == null) {
							node.children = [];
							node.parent.children.push(node);
						}
						switch (node.name) {
							case 'w:body':
								body = current;
								break;
							case 'w:sectPr':
								sect = current;
								break;
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
							if (tag == 'w:document') {
								current.children = sections;
								builtIn.forEach(function (a) {
									return attributes[a] = _this2[a];
								});
								attributes.directStyle = _this2.styles.getDefault("document");
							}
							var element = (_doc = _this2.doc).createElement.apply(_doc, [current].concat(_toConsumableArray(args)));

							parent.children.splice(index, 1, element);
							current = parent;
						} else if (current == pr) {
							var property = _this2.doc.toProperty(current);
							current = parent;
							if (pr != sect) current.attributes.directStyle = property;else sect = property;

							pr = null;
						} else {
							parent[tag.split(':').pop()] = _this2.doc.onToProperty(current);
							current = parent;
						}

						if (current == body && sect != null) {
							var _doc2;

							sections.push((_doc2 = _this2.doc).createElement.apply(_doc2, [{ name: 'section', attributes: sect, children: body.children.splice(0) }].concat(_toConsumableArray(args))));
							sect = null;
						}
					}).on("end", function (a) {
						resolve(root.children[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSOzs7Ozs7Ozs7Ozs7OzBCQUVFOzs7QUFDTixPQUFJLE9BQUssU0FBTCxDQURFO0FBRU4sVUFBTyxRQUFRLEdBQVIsQ0FBWSxPQUFPLElBQVAsQ0FBWSxLQUFLLElBQUwsQ0FBWixDQUF1QixHQUF2QixDQUEyQixjQUFJO0FBQ2pELFFBQUksTUFBSSxPQUFLLElBQUwsQ0FBVSxFQUFWLENBQUosQ0FENkM7QUFFakQsUUFBRyxRQUFRLE9BQVIsQ0FBZ0IsSUFBSSxJQUFKLENBQWhCLElBQTJCLENBQUMsQ0FBRCxFQUFHO0FBQ2hDLFlBQU8sT0FBSyxHQUFMLENBQVMsYUFBVCxDQUF1QixJQUFJLE1BQUosQ0FBdkIsQ0FDTCxJQURLLENBQ0E7YUFBUSxPQUFLLElBQUksSUFBSixDQUFMLEdBQWUsTUFBZjtNQUFSLENBRFAsQ0FEZ0M7S0FBakM7SUFGNkMsQ0FBM0IsQ0FNaEIsTUFOZ0IsQ0FNVDtXQUFHO0lBQUgsQ0FOSCxFQU1VLElBTlYsQ0FNZSxhQUFHOztBQUV4QixXQUFLLE1BQUwsR0FBWSxxQkFBVyxPQUFLLE1BQUwsRUFBYSxPQUFLLEdBQUwsQ0FBcEMsQ0FGd0I7QUFHeEIsV0FBSyxTQUFMLEdBQWUsbUJBQWMsT0FBSyxLQUFMLENBQVcsR0FBWCxDQUFlLGdDQUFmLENBQWQsRUFBK0QsT0FBSyxRQUFMLENBQWMsR0FBZCxDQUFrQix3QkFBbEIsRUFBNEMsQ0FBNUMsQ0FBOUUsQ0FId0I7QUFJeEIsV0FBSyxVQUFMLEdBQWdCLG9CQUFlLE9BQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSwrQkFBZixDQUFmLEVBQStELE9BQUss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QWYsRUFBUCxJQUE2QixPQUFLLEdBQUwsQ0FBUyxZQUFULENBQXNCLE9BQXRCLENBQTdCLENBREk7QUFFSixpQkFBUSxNQUFSLENBRkk7T0FUQzs7QUFjTixVQUFHLFdBQVMsSUFBVCxJQUFpQixRQUFNLElBQU4sRUFBVzs7O0FBQzlCLGdCQUFTLElBQVQsQ0FBYyxnQkFBSyxHQUFMLEVBQVMsYUFBVCxlQUF1QixFQUFDLE1BQUssU0FBTCxFQUFnQixZQUFZLElBQVosRUFBa0IsVUFBVSxLQUFLLFFBQUwsQ0FBYyxNQUFkLENBQXFCLENBQXJCLENBQVYsOEJBQXNDLE1BQWhHLENBQWQsRUFEOEI7QUFFOUIsY0FBSyxJQUFMLENBRjhCO09BQS9CO01BNUJjLENBckJmLENBdURDLEVBdkRELENBdURJLEtBdkRKLEVBdURXLGFBQUc7QUFDYixjQUFRLEtBQUssUUFBTCxDQUFjLENBQWQsQ0FBUixFQURhO01BQUgsQ0F2RFgsQ0EwREMsRUExREQsQ0EwREksTUExREosRUEwRFksZ0JBQU07QUFDakIsVUFBRyxRQUFRLE1BQVIsSUFBa0IsUUFBUSxNQUFSLENBQWUsSUFBZixJQUFxQixLQUFyQixFQUNwQixRQUFRLFFBQVIsQ0FBaUIsSUFBakIsQ0FBc0IsSUFBdEIsRUFERDtNQURXLENBMURaLENBVjJCO0tBQVQsQ0FBbkIsQ0FQd0I7SUFBSCxDQU50QixDQUZNIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQYXNzVGhyb3VnaH0gZnJvbSBcInN0cmVhbVwiXHJcbmltcG9ydCBzYXggZnJvbSBcInNheFwiXHJcbmltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCJcclxuaW1wb3J0IFN0eWxlcyBmcm9tIFwiLi9zdHlsZXNcIlxyXG5cclxuaW1wb3J0IEZvbnRUaGVtZSBmcm9tIFwiLi90aGVtZS9mb250XCJcclxuaW1wb3J0IENvbG9yVGhlbWUgZnJvbSBcIi4vdGhlbWUvY29sb3JcIlxyXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSBcIi4vdGhlbWUvZm9ybWF0XCJcclxuXHJcblxyXG5jb25zdCBidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBQYXJ0e1xyXG5cdHBhcnNlKCl7XHJcblx0XHRsZXQgYXJncz1hcmd1bWVudHNcclxuXHRcdHJldHVybiBQcm9taXNlLmFsbChPYmplY3Qua2V5cyh0aGlzLnJlbHMpLm1hcChpZD0+e1xyXG5cdFx0XHRsZXQgcmVsPXRoaXMucmVsc1tpZF1cclxuXHRcdFx0aWYoYnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEpe1xyXG5cdFx0XHRcdHJldHVybiB0aGlzLmRvYy5nZXRPYmplY3RQYXJ0KHJlbC50YXJnZXQpXHJcblx0XHRcdFx0XHQudGhlbihwYXJzZWQ9PnRoaXNbcmVsLnR5cGVdPXBhcnNlZClcclxuXHRcdFx0fVxyXG5cdFx0fSkuZmlsdGVyKGE9PmEpKS50aGVuKGE9PntcclxuXHJcblx0XHRcdHRoaXMuc3R5bGVzPW5ldyBTdHlsZXModGhpcy5zdHlsZXMsIHRoaXMuZG9jKVxyXG5cdFx0XHR0aGlzLmZvbnRUaGVtZT1uZXcgRm9udFRoZW1lKHRoaXMudGhlbWUuZ2V0KCd0aGVtZS50aGVtZUVsZW1lbnRzLmZvbnRTY2hlbWUnKSx0aGlzLnNldHRpbmdzLmdldCgnc2V0dGluZ3MudGhlbWVGb250TGFuZycpLiQpXHJcblx0XHRcdHRoaXMuY29sb3JUaGVtZT1uZXcgQ29sb3JUaGVtZSh0aGlzLnRoZW1lLmdldCgndGhlbWUudGhlbWVFbGVtZW50cy5jbHJTY2hlbWUnKSx0aGlzLnNldHRpbmdzLmdldCgnc2V0dGluZ3MuY2xyU2NoZW1lTWFwcGluZycpLiQpXHJcblx0XHRcdHRoaXMuZm9ybWF0VGhlbWU9bmV3IEZvcm1hdFRoZW1lKHRoaXMudGhlbWUuZ2V0KCd0aGVtZS50aGVtZUVsZW1lbnRzLmZtdFNjaGVtZScpKVxyXG5cclxuXHRcdFx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmU9PntcclxuXHRcdFx0XHRsZXQgcm9vdD17XHJcblx0XHRcdFx0XHRuYW1lOnRoaXMuZG9jLmNvbnN0cnVjdG9yLmV4dCxcclxuXHRcdFx0XHRcdGNoaWxkcmVuOltdXHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdGxldCBib2R5PW51bGwsIHNlY3Q9bnVsbCwgcHI9bnVsbCwgY3VycmVudD1yb290XHJcblx0XHRcdFx0bGV0IHNlY3Rpb25zPVtdXHJcblxyXG5cdFx0XHRcdGxldCBzdHJlYW09bmV3IFBhc3NUaHJvdWdoKClcclxuXHRcdFx0XHRzdHJlYW0uZW5kKG5ldyBCdWZmZXIodGhpcy5kYXRhLmFzVWludDhBcnJheSgpKSlcclxuXHRcdFx0XHRzdHJlYW0ucGlwZShzYXguY3JlYXRlU3RyZWFtKHRydWUse3htbG5zOmZhbHNlfSkpXHJcblx0XHRcdFx0Lm9uKFwib3BlbnRhZ1wiLCBub2RlPT57XHJcblx0XHRcdFx0XHRpZih0aGlzLmRvYy5pc1Byb3BlcnR5KG5vZGUubmFtZSkgJiYgcHI9PW51bGwpXHJcblx0XHRcdFx0XHRcdHByPW5vZGVcclxuXHJcblx0XHRcdFx0XHRub2RlLnBhcmVudD1jdXJyZW50XHJcblx0XHRcdFx0XHRjdXJyZW50PW5vZGVcclxuXHJcblx0XHRcdFx0XHRpZihwcj09bnVsbCl7XHJcblx0XHRcdFx0XHRcdG5vZGUuY2hpbGRyZW49W11cclxuXHRcdFx0XHRcdFx0bm9kZS5wYXJlbnQuY2hpbGRyZW4ucHVzaChub2RlKVxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c3dpdGNoKG5vZGUubmFtZSl7XHJcblx0XHRcdFx0XHRjYXNlICd3OmJvZHknOlxyXG5cdFx0XHRcdFx0XHRib2R5PWN1cnJlbnRcclxuXHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRjYXNlICd3OnNlY3RQcic6XHJcblx0XHRcdFx0XHRcdHNlY3Q9Y3VycmVudFxyXG5cdFx0XHRcdFx0YnJlYWtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdC5vbihcImNsb3NldGFnXCIsdGFnPT57XHJcblx0XHRcdFx0XHRjb25zdCB7YXR0cmlidXRlcywgcGFyZW50LCBjaGlsZHJlbiwgbG9jYWwsbmFtZX09Y3VycmVudFxyXG5cdFx0XHRcdFx0aWYocHI9PW51bGwpe1xyXG5cdFx0XHRcdFx0XHRsZXQgaW5kZXg9cGFyZW50LmNoaWxkcmVuLmluZGV4T2YoY3VycmVudClcclxuXHRcdFx0XHRcdFx0YXR0cmlidXRlcy5rZXk9aW5kZXhcclxuXHRcdFx0XHRcdFx0aWYodGFnPT0ndzpkb2N1bWVudCcpe1xyXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnQuY2hpbGRyZW49c2VjdGlvbnNcclxuXHRcdFx0XHRcdFx0XHRidWlsdEluLmZvckVhY2goYT0+YXR0cmlidXRlc1thXT10aGlzW2FdKVxyXG5cdFx0XHRcdFx0XHRcdGF0dHJpYnV0ZXMuZGlyZWN0U3R5bGU9dGhpcy5zdHlsZXMuZ2V0RGVmYXVsdChcImRvY3VtZW50XCIpXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdFx0bGV0IGVsZW1lbnQ9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChjdXJyZW50LC4uLmFyZ3MpXHJcblxyXG5cdFx0XHRcdFx0XHRwYXJlbnQuY2hpbGRyZW4uc3BsaWNlKGluZGV4LDEsZWxlbWVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1lbHNlIGlmKGN1cnJlbnQ9PXByKXtcclxuXHRcdFx0XHRcdFx0bGV0IHByb3BlcnR5PXRoaXMuZG9jLnRvUHJvcGVydHkoY3VycmVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdFx0aWYocHIhPXNlY3QpXHJcblx0XHRcdFx0XHRcdFx0Y3VycmVudC5hdHRyaWJ1dGVzLmRpcmVjdFN0eWxlPXByb3BlcnR5XHJcblx0XHRcdFx0XHRcdGVsc2VcclxuXHRcdFx0XHRcdFx0XHRzZWN0PXByb3BlcnR5XHJcblxyXG5cdFx0XHRcdFx0XHRwcj1udWxsXHJcblx0XHRcdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRcdFx0cGFyZW50W3RhZy5zcGxpdCgnOicpLnBvcCgpXT10aGlzLmRvYy5vblRvUHJvcGVydHkoY3VycmVudClcclxuXHRcdFx0XHRcdFx0Y3VycmVudD1wYXJlbnRcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRpZihjdXJyZW50PT1ib2R5ICYmIHNlY3QhPW51bGwpe1xyXG5cdFx0XHRcdFx0XHRzZWN0aW9ucy5wdXNoKHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoe25hbWU6J3NlY3Rpb24nLCBhdHRyaWJ1dGVzOiBzZWN0LCBjaGlsZHJlbjogYm9keS5jaGlsZHJlbi5zcGxpY2UoMCl9LC4uLmFyZ3MpKVxyXG5cdFx0XHRcdFx0XHRzZWN0PW51bGxcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQub24oXCJlbmRcIiwgYT0+e1xyXG5cdFx0XHRcdFx0cmVzb2x2ZShyb290LmNoaWxkcmVuWzBdKVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0Lm9uKFwidGV4dFwiLCB0ZXh0PT57XHJcblx0XHRcdFx0XHRpZihjdXJyZW50LnBhcmVudCAmJiBjdXJyZW50LnBhcmVudC5uYW1lPT1cInc6dFwiKVxyXG5cdFx0XHRcdFx0XHRjdXJyZW50LmNoaWxkcmVuLnB1c2godGV4dClcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9KVxyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuIl19