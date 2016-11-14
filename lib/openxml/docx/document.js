'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
		$.each(_this.partMain.rels, function (id, rel) {
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
			var roots = this.content.parse($.isArray(visitFactories) ? visitFactories : $.toArray(arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhcmd1bWVudHMiLCJyZWxzIiwiYnVpbHRJbiIsInNwbGl0IiwiJCIsImVhY2giLCJwYXJ0TWFpbiIsImlkIiwicmVsIiwiaW5kZXhPZiIsInR5cGUiLCJ0YXJnZXQiLCJ2aXNpdEZhY3RvcmllcyIsInN0eWxlIiwiY29uc3RydWN0b3IiLCJTdHlsZSIsInBhcnNlQ29udGV4dCIsInNlY3Rpb24iLCJQYXJzZUNvbnRleHQiLCJwYXJ0IiwiYm9va21hcmsiLCJudW1iZXJpbmciLCJDb250ZXh0IiwidGFibGUiLCJmaWVsZCIsImN0eCIsImluc3RydWN0IiwidCIsImxlbmd0aCIsInNlcGVyYXRlIiwibW9kZWwiLCJlbmQiLCJlbmRNb2RlbCIsImVuZFZpc2l0b3JzIiwicG9wIiwiY29udGVudCIsImZhY3RvcnkiLCJkb2N1bWVudEVsZW1lbnQiLCJyb290cyIsInBhcnNlIiwiaXNBcnJheSIsInRvQXJyYXkiLCJyZWxlYXNlIiwiY3VycmVudCIsImdldFJlbCIsImNvbG9yVGhlbWUiLCJnZXRQYXJ0IiwiJDEiLCJmb250VGhlbWUiLCJmb3JtYXRUaGVtZSIsImRvYyIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJyZXF1aXJlIiwiRmFjdG9yeSIsImlkcyIsImRlZmF1bHRzIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0RGVmYXVsdCIsImdldERlZmF1bHQiLCJnZXQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7O0FBQ3BCLHFCQUFhO0FBQUE7O0FBQUEsbUhBQ0hDLFNBREc7O0FBRVosTUFBSUMsT0FBSyxNQUFLQSxJQUFkO0FBQUEsTUFDQ0MsVUFBUSw2RkFBNkZDLEtBQTdGLENBQW1HLEdBQW5HLENBRFQ7QUFFQUMsSUFBRUMs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QixVQUFPaUQsSUFBSWpELEVBQUosQ0FBUDtBQUNBLEdBVGlCO0FBVWxCd0QsT0FBSyxhQUFTbEQsS0FBVCxFQUFnQk4sRUFBaEIsRUFBbUI7QUFDdkJpRCxPQUFJakQsTUFBSU0sTUFBTU4sRUFBZCxJQUFrQk0sS0FBbEI7QUFDQTtBQVppQixFQUFuQjtBQWNBOztJQUVLSyxZLEdBQ0wsc0JBQVl5QixPQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE1BQUtBLE9BQUwsR0FBYUEsT0FBYjtBQUNBLEMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFjdG9yeSBmcm9tICcuL2ZhY3RvcnknXHJcbmltcG9ydCBGb250VGhlbWUgZnJvbSAnLi90aGVtZS9mb250J1xyXG5pbXBvcnQgQ29sb3JUaGVtZSBmcm9tICcuL3RoZW1lL2NvbG9yJ1xyXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSAnLi90aGVtZS9mb3JtYXQnXHJcblxyXG5pbXBvcnQgVGFibGUgZnJvbSBcIi4vbW9kZWwvdGFibGVcIlxyXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9tb2RlbC9saXN0XCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50IGV4dGVuZHMgcmVxdWlyZSgnLi4vZG9jdW1lbnQnKXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dmFyIHJlbHM9dGhpcy5yZWxzLFxyXG5cdFx0XHRidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcclxuXHRcdCQuZWFjaCh0aGlzLnBhcnRNYWluLnJlbHMsZnVuY3Rpb24oaWQscmVsKXtcclxuXHRcdFx0YnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEgJiYgKHJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXQpXHJcblx0XHR9KVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGNsb25lKGRvYyl7XHJcblx0XHRsZXQge3BhcnRzLHJhdyxwcm9wcyxyZWxzLHBhcnRNYWlufT1kb2NcclxuXHRcdHJldHVybiBuZXcgZG9jdW1lbnQocGFydHMscmF3LHByb3BzKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxyXG5cclxuXHRwYXJzZSh2aXNpdEZhY3Rvcmllcyl7XHJcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR0aGlzLnN0eWxlPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlN0eWxlKClcclxuXHRcdHRoaXMucGFyc2VDb250ZXh0PXtcclxuXHRcdFx0c2VjdGlvbjogbmV3IFBhcnNlQ29udGV4dCgpLFxyXG5cdFx0XHRwYXJ0Om5ldyBQYXJzZUNvbnRleHQodGhpcy5wYXJ0TWFpbiksXHJcblx0XHRcdGJvb2ttYXJrOiBuZXcgUGFyc2VDb250ZXh0KCksXHJcblx0XHRcdG51bWJlcmluZzogbmV3IExpc3QuQ29udGV4dCh0aGlzKSxcclxuXHRcdFx0dGFibGU6IG5ldyBUYWJsZS5Db250ZXh0KHRoaXMpLFxyXG5cdFx0XHRmaWVsZDogKGZ1bmN0aW9uKGN0eCl7XHJcblx0XHRcdFx0Y3R4Lmluc3RydWN0PWZ1bmN0aW9uKHQpe1xyXG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5pbnN0cnVjdCh0KVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjdHguc2VwZXJhdGU9ZnVuY3Rpb24obW9kZWwpe1xyXG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5zZXBlcmF0ZShtb2RlbClcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0Y3R4LmVuZD1mdW5jdGlvbihlbmRNb2RlbCwgZW5kVmlzaXRvcnMpe1xyXG5cdFx0XHRcdFx0dGhpcy5wb3AoKS5lbmQoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXR1cm4gY3R4XHJcblx0XHRcdH0pKFtdKVxyXG5cdFx0fVxyXG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZmFjdG9yeSh0aGlzLnBhcnRNYWluLmRvY3VtZW50RWxlbWVudCwgdGhpcylcclxuXHRcdHZhciByb290cz10aGlzLmNvbnRlbnQucGFyc2UoJC5pc0FycmF5KHZpc2l0RmFjdG9yaWVzKSA/IHZpc2l0RmFjdG9yaWVzIDogJC50b0FycmF5KGFyZ3VtZW50cykpXHJcblx0XHR0aGlzLnJlbGVhc2UoKVxyXG5cdFx0cmV0dXJuIHJvb3RzLmxlbmd0aD09MSA/IHJvb3RzWzBdIDogcm9vdHNcclxuXHR9XHJcblx0Z2V0UmVsKGlkKXtcclxuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnQuZ2V0UmVsKGlkKVxyXG5cdH1cclxuXHRnZXRDb2xvclRoZW1lKCl7XHJcblx0XHRpZih0aGlzLmNvbG9yVGhlbWUpXHJcblx0XHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWVcclxuXHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnY2xyU2NoZW1lJyksIHRoaXMuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZU1hcHBpbmcnKSlcclxuXHR9XHJcblx0Z2V0Rm9udFRoZW1lKCl7XHJcblx0XHRpZih0aGlzLmZvbnRUaGVtZSlcclxuXHRcdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lXHJcblx0XHRyZXR1cm4gdGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmb250U2NoZW1lJyksIHRoaXMuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ3RoZW1lRm9udExhbmcnKSlcclxuXHR9XHJcblx0Z2V0Rm9ybWF0VGhlbWUoKXtcclxuXHRcdGlmKHRoaXMuZm9ybWF0VGhlbWUpXHJcblx0XHRcdHJldHVybiB0aGlzLmZvcm1hdFRoZW1lXHJcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZT1uZXcgRm9ybWF0VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm10U2NoZW1lJyksIHRoaXMpXHJcblx0fVxyXG5cdHJlbGVhc2UoKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnBhcnNlQ29udGV4dFxyXG5cclxuXHRcdHN1cGVyLnJlbGVhc2UoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuIFwiV29yZFwifVxyXG5cclxuXHRzdGF0aWMgZ2V0IFN0eWxlKCl7cmV0dXJuIFN0eWxlfVxyXG5cclxuXHRzdGF0aWMgRmFjdG9yeT1GYWN0b3J5XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFN0eWxlKCl7XHJcblx0dmFyIGlkcz17fSxkZWZhdWx0cz17fVxyXG5cdE9iamVjdC5hc3NpZ24odGhpcyx7XHJcblx0XHRzZXREZWZhdWx0OiBmdW5jdGlvbihzdHlsZSl7XHJcblx0XHRcdGRlZmF1bHRzW3N0eWxlLnR5cGVdPXN0eWxlXHJcblx0XHR9LFxyXG5cdFx0Z2V0RGVmYXVsdDogZnVuY3Rpb24odHlwZSl7XHJcblx0XHRcdHJldHVybiBkZWZhdWx0c1t0eXBlXVxyXG5cdFx0fSxcclxuXHRcdGdldDogZnVuY3Rpb24oaWQpe1xyXG5cdFx0XHRyZXR1cm4gaWRzW2lkXVxyXG5cdFx0fSxcclxuXHRcdHNldDogZnVuY3Rpb24oc3R5bGUsIGlkKXtcclxuXHRcdFx0aWRzW2lkfHxzdHlsZS5pZF09c3R5bGVcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5jbGFzcyBQYXJzZUNvbnRleHR7XHJcblx0Y29uc3RydWN0b3IoY3VycmVudCl7XHJcblx0XHR0aGlzLmN1cnJlbnQ9Y3VycmVudFxyXG5cdH1cclxufVxyXG4iXX0=