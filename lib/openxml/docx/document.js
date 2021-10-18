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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhcmd1bWVudHMiLCJyZWxzIiwiYnVpbHRJbiIsInNwbGl0IiwiJCIsImVhY2giLCJwYXJ0TWFpbiIsImlkIiwicmVsIiwiaW5kZXhPZiIsInR5cGUiLCJ0YXJnZXQiLCJ2aXNpdEZhY3RvcmllcyIsInN0eWxlIiwiY29uc3RydWN0b3IiLCJTdHlsZSIsInBhcnNlQ29udGV4dCIsInNlY3Rpb24iLCJQYXJzZUNvbnRleHQiLCJwYXJ0IiwiYm9va21hcmsiLCJudW1iZXJpbmciLCJMaXN0IiwiQ29udGV4dCIsInRhYmxlIiwiVGFibGUiLCJmaWVsZCIsImN0eCIsImluc3RydWN0IiwidCIsImxlbmd0aCIsInNlcGVyYXRlIiwibW9kZWwiLCJlbmQiLCJlbmRNb2RlbCIsImVuZFZpc2l0b3JzIiwicG9wIiwiY29udGVudCIsImZhY3RvcnkiLCJkb2N1bWVudEVsZW1lbnQiLCJyb290cyIsInBhcnNlIiwiaXNBcnJheSIsInRvQXJyYXkiLCJyZWxlYXNlIiwiY3VycmVudCIsImdldFJlbCIsImNvbG9yVGhlbWUiLCJDb2xvclRoZW1lIiwiZ2V0UGFydCIsIiQxIiwiZm9udFRoZW1lIiwiRm9udFRoZW1lIiwiZm9ybWF0VGhlbWUiLCJGb3JtYXRUaGVtZSIsImRvYyIsInBhcnRzIiwicmF3IiwicHJvcHMiLCJyZXF1aXJlIiwiRmFjdG9yeSIsImlkcyIsImRlZmF1bHRzIiwiT2JqZWN0IiwiYXNzaWduIiwic2V0RGVmYXVsdCIsImdldERlZmF1bHQiLCJnZXQiLCJzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsUTs7O0FBQ3BCLHFCQUFhO0FBQUE7O0FBQUEsbUhBQ0hDLFNBREc7O0FBRVosTUFBSUMsT0FBSyxNQUFLQSxJQUFkO0FBQUEs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QVksb0JBQVN4RCxJQUFULEVBQWM7QUFDekIsVUFBT29ELFNBQVNwRCxJQUFULENBQVA7QUFDQSxHQU5pQjtBQU9sQnlELE9BQUssYUFBUzVELEVBQVQsRUFBWTtBQUNoQixVQUFPc0QsSUFBSXRELEVBQUosQ0FBUDtBQUNBLEdBVGlCO0FBVWxCNkQsT0FBSyxhQUFTdkQsS0FBVCxFQUFnQk4sRUFBaEIsRUFBbUI7QUFDdkJzRCxPQUFJdEQsTUFBSU0sTUFBTU4sRUFBZCxJQUFrQk0sS0FBbEI7QUFDQTtBQVppQixFQUFuQjtBQWNBOztJQUVLSyxZLEdBQ0wsc0JBQVkyQixPQUFaLEVBQW9CO0FBQUE7O0FBQ25CLE1BQUtBLE9BQUwsR0FBYUEsT0FBYjtBQUNBLEMiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFjdG9yeSBmcm9tICcuL2ZhY3RvcnknXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gJy4vdGhlbWUvZm9udCdcbmltcG9ydCBDb2xvclRoZW1lIGZyb20gJy4vdGhlbWUvY29sb3InXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSAnLi90aGVtZS9mb3JtYXQnXG5cbmltcG9ydCBUYWJsZSBmcm9tIFwiLi9tb2RlbC90YWJsZVwiXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9tb2RlbC9saXN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9kb2N1bWVudCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz10aGlzLnJlbHMsXG5cdFx0XHRidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcblx0XHQkLmVhY2godGhpcy5wYXJ0TWFpbi5yZWxzLGZ1bmN0aW9uKGlkLHJlbCl7XG5cdFx0XHRidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSAmJiAocmVsc1tyZWwudHlwZV09cmVsLnRhcmdldClcblx0XHR9KVxuXHR9XG5cblx0c3RhdGljIGNsb25lKGRvYyl7XG5cdFx0bGV0IHtwYXJ0cyxyYXcscHJvcHMscmVscyxwYXJ0TWFpbn09ZG9jXG5cdFx0cmV0dXJuIG5ldyBkb2N1bWVudChwYXJ0cyxyYXcscHJvcHMpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0cGFyc2UodmlzaXRGYWN0b3JpZXMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLnN0eWxlPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlN0eWxlKClcblx0XHR0aGlzLnBhcnNlQ29udGV4dD17XG5cdFx0XHRzZWN0aW9uOiBuZXcgUGFyc2VDb250ZXh0KCksXG5cdFx0XHRwYXJ0Om5ldyBQYXJzZUNvbnRleHQodGhpcy5wYXJ0TWFpbiksXG5cdFx0XHRib29rbWFyazogbmV3IFBhcnNlQ29udGV4dCgpLFxuXHRcdFx0bnVtYmVyaW5nOiBuZXcgTGlzdC5Db250ZXh0KHRoaXMpLFxuXHRcdFx0dGFibGU6IG5ldyBUYWJsZS5Db250ZXh0KHRoaXMpLFxuXHRcdFx0ZmllbGQ6IChmdW5jdGlvbihjdHgpe1xuXHRcdFx0XHRjdHguaW5zdHJ1Y3Q9ZnVuY3Rpb24odCl7XG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5pbnN0cnVjdCh0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGN0eC5zZXBlcmF0ZT1mdW5jdGlvbihtb2RlbCl7XG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5zZXBlcmF0ZShtb2RlbClcblx0XHRcdFx0fVxuXHRcdFx0XHRjdHguZW5kPWZ1bmN0aW9uKGVuZE1vZGVsLCBlbmRWaXNpdG9ycyl7XG5cdFx0XHRcdFx0dGhpcy5wb3AoKS5lbmQoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjdHhcblx0XHRcdH0pKFtdKVxuXHRcdH1cblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5mYWN0b3J5KHRoaXMucGFydE1haW4uZG9jdW1lbnRFbGVtZW50LCB0aGlzKVxuXHRcdHZhciByb290cz10aGlzLmNvbnRlbnQucGFyc2UoJC5pc0FycmF5KHZpc2l0RmFjdG9yaWVzKSA/IHZpc2l0RmFjdG9yaWVzIDogJC50b0FycmF5KGFyZ3VtZW50cykpXG5cdFx0dGhpcy5yZWxlYXNlKClcblx0XHRyZXR1cm4gcm9vdHMubGVuZ3RoPT0xID8gcm9vdHNbMF0gOiByb290c1xuXHR9XG5cdGdldFJlbChpZCl7XG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudC5nZXRSZWwoaWQpXG5cdH1cblx0Z2V0Q29sb3JUaGVtZSgpe1xuXHRcdGlmKHRoaXMuY29sb3JUaGVtZSlcblx0XHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWVcblx0XHRyZXR1cm4gdGhpcy5jb2xvclRoZW1lPW5ldyBDb2xvclRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWVNYXBwaW5nJykpXG5cdH1cblx0Z2V0Rm9udFRoZW1lKCl7XG5cdFx0aWYodGhpcy5mb250VGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5mb250VGhlbWVcblx0XHRyZXR1cm4gdGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmb250U2NoZW1lJyksIHRoaXMuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ3RoZW1lRm9udExhbmcnKSlcblx0fVxuXHRnZXRGb3JtYXRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9ybWF0VGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZVxuXHRcdHJldHVybiB0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmbXRTY2hlbWUnKSwgdGhpcylcblx0fVxuXHRyZWxlYXNlKCl7XG5cdFx0ZGVsZXRlIHRoaXMucGFyc2VDb250ZXh0XG5cblx0XHRzdXBlci5yZWxlYXNlKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBcIldvcmRcIn1cblxuXHRzdGF0aWMgZ2V0IFN0eWxlKCl7cmV0dXJuIFN0eWxlfVxuXG5cdHN0YXRpYyBGYWN0b3J5PUZhY3Rvcnlcbn1cblxuZnVuY3Rpb24gU3R5bGUoKXtcblx0dmFyIGlkcz17fSxkZWZhdWx0cz17fVxuXHRPYmplY3QuYXNzaWduKHRoaXMse1xuXHRcdHNldERlZmF1bHQ6IGZ1bmN0aW9uKHN0eWxlKXtcblx0XHRcdGRlZmF1bHRzW3N0eWxlLnR5cGVdPXN0eWxlXG5cdFx0fSxcblx0XHRnZXREZWZhdWx0OiBmdW5jdGlvbih0eXBlKXtcblx0XHRcdHJldHVybiBkZWZhdWx0c1t0eXBlXVxuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbihpZCl7XG5cdFx0XHRyZXR1cm4gaWRzW2lkXVxuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbihzdHlsZSwgaWQpe1xuXHRcdFx0aWRzW2lkfHxzdHlsZS5pZF09c3R5bGVcblx0XHR9XG5cdH0pXG59XG5cbmNsYXNzIFBhcnNlQ29udGV4dHtcblx0Y29uc3RydWN0b3IoY3VycmVudCl7XG5cdFx0dGhpcy5jdXJyZW50PWN1cnJlbnRcblx0fVxufVxuIl19