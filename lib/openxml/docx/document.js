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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(document).apply(this, arguments));

		var rels = _this.rels,
		    builtIn = 'settings,webSettings,theme,styles,stylesWithEffects,fontTable,numbering,footnotes,endnotes'.split(',');
		$.each(_this.partMain.rels, function (id, rel) {
			builtIn.indexOf(rel.type) != -1 && (rels[rel.type] = rel.target);
		});
		_this.style = new _this.constructor.Style();
		_this.parseContext = {
			section: new ParseContext(),
			part: new ParseContext(_this.partMain),
			bookmark: new ParseContext(),
			numbering: new _list2.default.Context(_this),
			table: new _table2.default.Context(_this),
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
		return _this;
	}

	_createClass(document, [{
		key: 'parse',
		value: function parse(visitFactories) {
			_get(Object.getPrototypeOf(document.prototype), 'parse', this).apply(this, arguments);
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
			_get(Object.getPrototypeOf(document.prototype), 'release', this).apply(this, arguments);
		}
	}], [{
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
	}, {
		key: 'factory',
		get: function get() {
			return _factory2.default;
		}
	}]);

	return document;
}(require('../document'));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBR3FCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLE1BQUksT0FBSyxNQUFLLElBQUw7TUFDUixVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSLENBSFc7QUFJWixJQUFFLElBQUYsQ0FBTyxNQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW1CLFVBQVMsRUFBVCxFQUFZLEdBQVosRUFBZ0I7QUFDekMsV0FBUSxPQUFSLENBQWdCLElBQUksSUFBSixDQUFoQixJQUEyQixDQUFDLENBQUQsS0FBTyxLQUFLLElBQUksSUFBSixDQUFMLEdBQWUsSUFBSSxNQUFKLENBQWpELENBRHlDO0dBQWhCLENBQTFCLENBSlk7QUFPWixRQUFLLEtBQUwsR0FBVyxJQUFJLE1BQUssV0FBTCxDQUFpQixLQUFqQixFQUFmLENBUFk7QUFRWixRQUFLLFlBQUwsR0FBa0I7QUFDakIsWUFBUyxJQUFJLFlBQUosRUFBVDtBQUNBLFNBQUssSUFBSSxZQUFKLENBQWlCLE1BQUssUUFBTCxDQUF0QjtBQUNBLGFBQVUsSUFBSSxZQUFKLEVBQVY7QUFDQSxjQUFXLElBQUksZUFBSyxPQUFMLE1BQUosQ0FBWDtBQUNBLFVBQU8sSUFBSSxnQkFBTSxPQUFOLE1BQUosQ0FBUDtBQUNBLFVBQU8sVUFBVSxHQUFULEVBQWE7QUFDcEIsUUFBSSxRQUFKLEdBQWEsVUFBUyxDQUFULEVBQVc7QUFDdkIsVUFBSyxLQUFLLE1BQUwsR0FBWSxDQUFaLENBQUwsQ0FBb0IsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFEdUI7S0FBWCxDQURPO0FBSXBCLFFBQUksUUFBSixHQUFhLFVBQVMsS0FBVCxFQUFlO0FBQzNC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TCxPQUFLLGFBQVMsS0FBVCxFQUFnQixFQUFoQixFQUFtQjtBQUN2QixPQUFJLE1BQUksTUFBTSxFQUFOLENBQVIsR0FBa0IsS0FBbEIsQ0FEdUI7R0FBbkI7RUFWTixFQUZlO0NBQWhCOztJQWtCTSxlQUNMLFNBREssWUFDTCxDQUFZLE9BQVosRUFBb0I7dUJBRGYsY0FDZTs7QUFDbkIsTUFBSyxPQUFMLEdBQWEsT0FBYixDQURtQjtDQUFwQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5IGZyb20gJy4vZmFjdG9yeSdcbmltcG9ydCBGb250VGhlbWUgZnJvbSAnLi90aGVtZS9mb250J1xuaW1wb3J0IENvbG9yVGhlbWUgZnJvbSAnLi90aGVtZS9jb2xvcidcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tICcuL3RoZW1lL2Zvcm1hdCdcblxuaW1wb3J0IFRhYmxlIGZyb20gXCIuL21vZGVsL3RhYmxlXCJcbmltcG9ydCBMaXN0IGZyb20gXCIuL21vZGVsL2xpc3RcIlxuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50IGV4dGVuZHMgcmVxdWlyZSgnLi4vZG9jdW1lbnQnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dmFyIHJlbHM9dGhpcy5yZWxzLFxuXHRcdFx0YnVpbHRJbj0nc2V0dGluZ3Msd2ViU2V0dGluZ3MsdGhlbWUsc3R5bGVzLHN0eWxlc1dpdGhFZmZlY3RzLGZvbnRUYWJsZSxudW1iZXJpbmcsZm9vdG5vdGVzLGVuZG5vdGVzJy5zcGxpdCgnLCcpXG5cdFx0JC5lYWNoKHRoaXMucGFydE1haW4ucmVscyxmdW5jdGlvbihpZCxyZWwpe1xuXHRcdFx0YnVpbHRJbi5pbmRleE9mKHJlbC50eXBlKSE9LTEgJiYgKHJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXQpXG5cdFx0fSlcblx0XHR0aGlzLnN0eWxlPW5ldyB0aGlzLmNvbnN0cnVjdG9yLlN0eWxlKClcblx0XHR0aGlzLnBhcnNlQ29udGV4dD17XG5cdFx0XHRzZWN0aW9uOiBuZXcgUGFyc2VDb250ZXh0KCksXG5cdFx0XHRwYXJ0Om5ldyBQYXJzZUNvbnRleHQodGhpcy5wYXJ0TWFpbiksXG5cdFx0XHRib29rbWFyazogbmV3IFBhcnNlQ29udGV4dCgpLFxuXHRcdFx0bnVtYmVyaW5nOiBuZXcgTGlzdC5Db250ZXh0KHRoaXMpLFxuXHRcdFx0dGFibGU6IG5ldyBUYWJsZS5Db250ZXh0KHRoaXMpLFxuXHRcdFx0ZmllbGQ6IChmdW5jdGlvbihjdHgpe1xuXHRcdFx0XHRjdHguaW5zdHJ1Y3Q9ZnVuY3Rpb24odCl7XG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5pbnN0cnVjdCh0KVxuXHRcdFx0XHR9XG5cdFx0XHRcdGN0eC5zZXBlcmF0ZT1mdW5jdGlvbihtb2RlbCl7XG5cdFx0XHRcdFx0dGhpc1t0aGlzLmxlbmd0aC0xXS5zZXBlcmF0ZShtb2RlbClcblx0XHRcdFx0fVxuXHRcdFx0XHRjdHguZW5kPWZ1bmN0aW9uKGVuZE1vZGVsLCBlbmRWaXNpdG9ycyl7XG5cdFx0XHRcdFx0dGhpcy5wb3AoKS5lbmQoLi4uYXJndW1lbnRzKVxuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBjdHhcblx0XHRcdH0pKFtdKVxuXHRcdH07XG5cdH1cblx0XG5cdHN0YXRpYyBnZXQgZXh0KCl7cmV0dXJuICdkb2N4J31cblxuXHRwYXJzZSh2aXNpdEZhY3Rvcmllcyl7XG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuY29udGVudD10aGlzLmZhY3RvcnkodGhpcy5wYXJ0TWFpbi5kb2N1bWVudEVsZW1lbnQsIHRoaXMpXG5cdFx0dmFyIHJvb3RzPXRoaXMuY29udGVudC5wYXJzZSgkLmlzQXJyYXkodmlzaXRGYWN0b3JpZXMpID8gdmlzaXRGYWN0b3JpZXMgOiAkLnRvQXJyYXkoYXJndW1lbnRzKSlcblx0XHR0aGlzLnJlbGVhc2UoKVxuXHRcdHJldHVybiByb290cy5sZW5ndGg9PTEgPyByb290c1swXSA6IHJvb3RzXG5cdH1cblx0Z2V0UmVsKGlkKXtcblx0XHRyZXR1cm4gdGhpcy5wYXJzZUNvbnRleHQucGFydC5jdXJyZW50LmdldFJlbChpZClcblx0fVxuXHRnZXRDb2xvclRoZW1lKCl7XG5cdFx0aWYodGhpcy5jb2xvclRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuY29sb3JUaGVtZVxuXHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWU9bmV3IENvbG9yVGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnY2xyU2NoZW1lJyksIHRoaXMuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZU1hcHBpbmcnKSlcblx0fVxuXHRnZXRGb250VGhlbWUoKXtcblx0XHRpZih0aGlzLmZvbnRUaGVtZSlcblx0XHRcdHJldHVybiB0aGlzLmZvbnRUaGVtZVxuXHRcdHJldHVybiB0aGlzLmZvbnRUaGVtZT1uZXcgRm9udFRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2ZvbnRTY2hlbWUnKSwgdGhpcy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgndGhlbWVGb250TGFuZycpKVxuXHR9XG5cdGdldEZvcm1hdFRoZW1lKCl7XG5cdFx0aWYodGhpcy5mb3JtYXRUaGVtZSlcblx0XHRcdHJldHVybiB0aGlzLmZvcm1hdFRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuZm9ybWF0VGhlbWU9bmV3IEZvcm1hdFRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2ZtdFNjaGVtZScpLCB0aGlzKVxuXHR9XG5cdHJlbGVhc2UoKXtcblx0XHRkZWxldGUgdGhpcy5wYXJzZUNvbnRleHRcblx0XHRzdXBlci5yZWxlYXNlKC4uLmFyZ3VtZW50cylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBcIldvcmRcIn1cblxuXHRzdGF0aWMgZ2V0IFN0eWxlKCl7cmV0dXJuIFN0eWxlfVxuXG5cdHN0YXRpYyBnZXQgZmFjdG9yeSgpe3JldHVybiBmYWN0b3J5fVxufVxuXG5mdW5jdGlvbiBTdHlsZSgpe1xuXHR2YXIgaWRzPXt9LGRlZmF1bHRzPXt9XG5cdE9iamVjdC5hc3NpZ24odGhpcyx7XG5cdFx0c2V0RGVmYXVsdDogZnVuY3Rpb24oc3R5bGUpe1xuXHRcdFx0ZGVmYXVsdHNbc3R5bGUudHlwZV09c3R5bGVcblx0XHR9LFxuXHRcdGdldERlZmF1bHQ6IGZ1bmN0aW9uKHR5cGUpe1xuXHRcdFx0cmV0dXJuIGRlZmF1bHRzW3R5cGVdXG5cdFx0fSxcblx0XHRnZXQ6IGZ1bmN0aW9uKGlkKXtcblx0XHRcdHJldHVybiBpZHNbaWRdXG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uKHN0eWxlLCBpZCl7XG5cdFx0XHRpZHNbaWR8fHN0eWxlLmlkXT1zdHlsZVxuXHRcdH1cblx0fSlcbn1cblxuY2xhc3MgUGFyc2VDb250ZXh0e1xuXHRjb25zdHJ1Y3RvcihjdXJyZW50KXtcblx0XHR0aGlzLmN1cnJlbnQ9Y3VycmVudFxuXHR9XG59XG4iXX0=