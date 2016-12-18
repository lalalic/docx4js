'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _tool = require('../../tool');

var _tool2 = _interopRequireDefault(_tool);

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

var _font = require('./theme/font');

var _font2 = _interopRequireDefault(_font);

var _color = require('./theme/color');

var _color2 = _interopRequireDefault(_color);

var _format = require('./theme/format');

var _format2 = _interopRequireDefault(_format);

var _table = require('./model/table');

var _table2 = _interopRequireDefault(_table);

var _list = require('./model/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var document = function (_require) {
	_inherits(document, _require);

	function document() {
		_classCallCheck(this, document);

		var _this = _possibleConstructorReturn(this, (document.__proto__ || Object.getPrototypeOf(document)).apply(this, arguments));

		var rels = _this.rels,
		    builtIn = 'settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');
		_tool2.default.each(_this.partMain.rels, function (id, rel) {
			builtIn.indexOf(rel.type) != -1 && (rels[rel.type] = rel.target);
		});
		return _this;
	}

	_createClass(document, [{
		key: 'parse',
		value: function parse(visitFactories) {
			_get(document.prototype.__proto__ || Object.getPrototypeOf(document.prototype), 'parse', this).apply(this, arguments);
			this.style = new this.constructor.Style();
			this.parseContext = {
				section: new ParseContext(),
				part: new ParseContext(this.partMain),
				bookmark: new ParseContext(),
				numbering: new _list2.default.Context(this),
				table: new _table2.default.Context(this),
				field: function (ctx) {
					ctx.instruct = function (t) {
						this[this.length - 1].instruct(t);
					};
					ctx.seperate = function (model) {
						this[this.length - 1].seperate(model);
					};
					ctx.end = function (endModel, endVisitors) {
						var _pop;

						(_pop = this.pop()).end.apply(_pop, arguments);
					};
					return ctx;
				}([])
			};
			this.content = this.factory(this.partMain.documentElement, this);
			var roots = this.content.parse(_tool2.default.isArray(visitFactories) ? visitFactories : _tool2.default.toArray(arguments));
			this.release();
			return roots.length == 1 ? roots[0] : roots;
		}
	}, {
		key: 'getRel',
		value: function getRel(id) {
			return this.parseContext.part.current.getRel(id);
		}
	}, {
		key: 'getColorTheme',
		value: function getColorTheme() {
			if (this.colorTheme) return this.colorTheme;
			return this.colorTheme = new _color2.default(this.getPart('theme').documentElement.$1('clrScheme'), this.getPart('settings').documentElement.$1('clrSchemeMapping'));
		}
	}, {
		key: 'getFontTheme',
		value: function getFontTheme() {
			if (this.fontTheme) return this.fontTheme;
			return this.fontTheme = new _font2.default(this.getPart('theme').documentElement.$1('fontScheme'), this.getPart('settings').documentElement.$1('themeFontLang'));
		}
	}, {
		key: 'getFormatTheme',
		value: function getFormatTheme() {
			if (this.formatTheme) return this.formatTheme;
			return this.formatTheme = new _format2.default(this.getPart('theme').documentElement.$1('fmtScheme'), this);
		}
	}, {
		key: 'release',
		value: function release() {
			delete this.parseContext;

			_get(document.prototype.__proto__ || Object.getPrototypeOf(document.prototype), 'release', this).apply(this, arguments);
		}
	}], [{
		key: 'clone',
		value: function clone(doc) {
			var parts = doc.parts,
			    raw = doc.raw,
			    props = doc.props,
			    rels = doc.rels,
			    partMain = doc.partMain;

			return new document(parts, raw, props);
		}
	}, {
		key: 'ext',
		get: function get() {
			return 'docx';
		}
	}, {
		key: 'type',
		get: function get() {
			return "Word";
		}
	}, {
		key: 'Style',
		get: function get() {
			return Style;
		}
	}]);

	return document;
}(require('../document'));

document.Factory = _factory2.default;
exports.default = document;


function Style() {
	var ids = {},
	    defaults = {};
	Object.assign(this, {
		setDefault: function setDefault(style) {
			defaults[style.type] = style;
		},
		getDefault: function getDefault(type) {
			return defaults[type];
		},
		get: function get(id) {
			return ids[id];
		},
		set: function set(style, id) {
			ids[id || style.id] = style;
		}
	});
}

var ParseContext = function ParseContext(current) {
	_classCallCheck(this, ParseContext);

	this.current = current;
};

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhcmd1bWVudHMiLCJyZWxzIiwiYnVpbHRJbiIsInNwbGl0IiwiZWFjaCIsInBhcnRNYWluIiwiaWQiLCJyZWwiLCJpbmRleE9mIiwidHlwZSIsInRhcmdldCIsInZpc2l0RmFjdG9yaWVzIiwic3R5bGUiLCJjb25zdHJ1Y3RvciIsIlN0eWxlIiwicGFyc2VDb250ZXh0Iiwic2VjdGlvbiIsIlBhcnNlQ29udGV4dCIsInBhcnQiLCJib29rbWFyayIsIm51bWJlcmluZyIsIkNvbnRleHQiLCJ0YWJsZSIsImZpZWxkIiwiY3R4IiwiaW5zdHJ1Y3QiLCJ0IiwibGVuZ3RoIiwic2VwZXJhdGUiLCJtb2RlbCIsImVuZCIsImVuZE1vZGVsIiwiZW5kVmlzaXRvcnMiLCJwb3AiLCJjb250ZW50IiwiZmFjdG9yeSIsImRvY3VtZW50RWxlbWVudCIsInJvb3RzIiwicGFyc2UiLCJpc0FycmF5IiwidG9BcnJheSIsInJlbGVhc2UiLCJjdXJyZW50IiwiZ2V0UmVsIiwiY29sb3JUaGVtZSIsImdldFBhcnQiLCIkMSIsImZvbnRUaGVtZSIsImZvcm1hdFRoZW1lIiwiZG9jIiwicGFydHMiLCJyYXciLCJwcm9wcyIsInJlcXVpcmUiLCJGYWN0b3J5IiwiaWRzIiwiZGVmYXVsdHMiLCJPYmplY3QiLCJhc3NpZ24iLCJzZXREZWZhdWx0IiwiZ2V0RGVmYXVsdCIsImdldCIsInNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7OztBQUNwQixxQkFBYTtBQUFBOztBQUFBLG1IQUNIQyxTQURHOztBQUVaLE1BQUlDLE9BQUssTUFBS0EsSUFBZDtBQUFBLE1BQ0NDLFVBQVEsNkZBQTZGQyxLQUE3RixDQUFtRyxHQUFuRyxDQURUO0FBRUEsaUJB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VUFBT2lELElBQUlqRCxFQUFKLENBQVA7QUFDQSxHQVRpQjtBQVVsQndELE9BQUssYUFBU2xELEtBQVQsRUFBZ0JOLEVBQWhCLEVBQW1CO0FBQ3ZCaUQsT0FBSWpELE1BQUlNLE1BQU1OLEVBQWQsSUFBa0JNLEtBQWxCO0FBQ0E7QUFaaUIsRUFBbkI7QUFjQTs7SUFFS0ssWSxHQUNMLHNCQUFZeUIsT0FBWixFQUFvQjtBQUFBOztBQUNuQixNQUFLQSxPQUFMLEdBQWFBLE9BQWI7QUFDQSxDIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSBcIi4uLy4uL3Rvb2xcIlxuaW1wb3J0IEZhY3RvcnkgZnJvbSAnLi9mYWN0b3J5J1xuaW1wb3J0IEZvbnRUaGVtZSBmcm9tICcuL3RoZW1lL2ZvbnQnXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tICcuL3RoZW1lL2NvbG9yJ1xuaW1wb3J0IEZvcm1hdFRoZW1lIGZyb20gJy4vdGhlbWUvZm9ybWF0J1xuXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vbW9kZWwvdGFibGVcIlxuaW1wb3J0IExpc3QgZnJvbSBcIi4vbW9kZWwvbGlzdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50IGV4dGVuZHMgcmVxdWlyZSgnLi4vZG9jdW1lbnQnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9dGhpcy5yZWxzLFxuXHRcdFx0YnVpbHRJbj0nc2V0dGluZ3Msd2ViU2V0dGluZ3MsdGhlbWUsc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXG5cdFx0JC5lYWNoKHRoaXMucGFydE1haW4ucmVscyxmdW5jdGlvbihpZCxyZWwpe1xuXHRcdFx0YnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEgJiYgKHJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXQpXG5cdFx0fSlcblx0fVxuXG5cdHN0YXRpYyBjbG9uZShkb2Mpe1xuXHRcdGxldCB7cGFydHMscmF3LHByb3BzLHJlbHMscGFydE1haW59PWRvY1xuXHRcdHJldHVybiBuZXcgZG9jdW1lbnQocGFydHMscmF3LHByb3BzKVxuXHR9XG5cblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdHBhcnNlKHZpc2l0RmFjdG9yaWVzKXtcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5zdHlsZT1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5TdHlsZSgpXG5cdFx0dGhpcy5wYXJzZUNvbnRleHQ9e1xuXHRcdFx0c2VjdGlvbjogbmV3IFBhcnNlQ29udGV4dCgpLFxuXHRcdFx0cGFydDpuZXcgUGFyc2VDb250ZXh0KHRoaXMucGFydE1haW4pLFxuXHRcdFx0Ym9va21hcms6IG5ldyBQYXJzZUNvbnRleHQoKSxcblx0XHRcdG51bWJlcmluZzogbmV3IExpc3QuQ29udGV4dCh0aGlzKSxcblx0XHRcdHRhYmxlOiBuZXcgVGFibGUuQ29udGV4dCh0aGlzKSxcblx0XHRcdGZpZWxkOiAoZnVuY3Rpb24oY3R4KXtcblx0XHRcdFx0Y3R4Lmluc3RydWN0PWZ1bmN0aW9uKHQpe1xuXHRcdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGgtMV0uaW5zdHJ1Y3QodClcblx0XHRcdFx0fVxuXHRcdFx0XHRjdHguc2VwZXJhdGU9ZnVuY3Rpb24obW9kZWwpe1xuXHRcdFx0XHRcdHRoaXNbdGhpcy5sZW5ndGgtMV0uc2VwZXJhdGUobW9kZWwpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y3R4LmVuZD1mdW5jdGlvbihlbmRNb2RlbCwgZW5kVmlzaXRvcnMpe1xuXHRcdFx0XHRcdHRoaXMucG9wKCkuZW5kKC4uLmFyZ3VtZW50cylcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gY3R4XG5cdFx0XHR9KShbXSlcblx0XHR9XG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZmFjdG9yeSh0aGlzLnBhcnRNYWluLmRvY3VtZW50RWxlbWVudCwgdGhpcylcblx0XHR2YXIgcm9vdHM9dGhpcy5jb250ZW50LnBhcnNlKCQuaXNBcnJheSh2aXNpdEZhY3RvcmllcykgPyB2aXNpdEZhY3RvcmllcyA6ICQudG9BcnJheShhcmd1bWVudHMpKVxuXHRcdHRoaXMucmVsZWFzZSgpXG5cdFx0cmV0dXJuIHJvb3RzLmxlbmd0aD09MSA/IHJvb3RzWzBdIDogcm9vdHNcblx0fVxuXHRnZXRSZWwoaWQpe1xuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnQuZ2V0UmVsKGlkKVxuXHR9XG5cdGdldENvbG9yVGhlbWUoKXtcblx0XHRpZih0aGlzLmNvbG9yVGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5jb2xvclRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuY29sb3JUaGVtZT1uZXcgQ29sb3JUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWUnKSwgdGhpcy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgnY2xyU2NoZW1lTWFwcGluZycpKVxuXHR9XG5cdGdldEZvbnRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9udFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lPW5ldyBGb250VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm9udFNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCd0aGVtZUZvbnRMYW5nJykpXG5cdH1cblx0Z2V0Rm9ybWF0VGhlbWUoKXtcblx0XHRpZih0aGlzLmZvcm1hdFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9ybWF0VGhlbWVcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZT1uZXcgRm9ybWF0VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm10U2NoZW1lJyksIHRoaXMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdGRlbGV0ZSB0aGlzLnBhcnNlQ29udGV4dFxuXG5cdFx0c3VwZXIucmVsZWFzZSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gXCJXb3JkXCJ9XG5cblx0c3RhdGljIGdldCBTdHlsZSgpe3JldHVybiBTdHlsZX1cblxuXHRzdGF0aWMgRmFjdG9yeT1GYWN0b3J5XG59XG5cbmZ1bmN0aW9uIFN0eWxlKCl7XG5cdHZhciBpZHM9e30sZGVmYXVsdHM9e31cblx0T2JqZWN0LmFzc2lnbih0aGlzLHtcblx0XHRzZXREZWZhdWx0OiBmdW5jdGlvbihzdHlsZSl7XG5cdFx0XHRkZWZhdWx0c1tzdHlsZS50eXBlXT1zdHlsZVxuXHRcdH0sXG5cdFx0Z2V0RGVmYXVsdDogZnVuY3Rpb24odHlwZSl7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdHNbdHlwZV1cblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24oaWQpe1xuXHRcdFx0cmV0dXJuIGlkc1tpZF1cblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oc3R5bGUsIGlkKXtcblx0XHRcdGlkc1tpZHx8c3R5bGUuaWRdPXN0eWxlXG5cdFx0fVxuXHR9KVxufVxuXG5jbGFzcyBQYXJzZUNvbnRleHR7XG5cdGNvbnN0cnVjdG9yKGN1cnJlbnQpe1xuXHRcdHRoaXMuY3VycmVudD1jdXJyZW50XG5cdH1cbn1cbiJdfQ==