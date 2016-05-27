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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsUUFDcEIsR0FBYTt3QkFETyxVQUNQOztxRUFETyxzQkFFVixZQURHOztBQUVaLE1BQUksT0FBSyxNQUFLLElBQUw7TUFDUixVQUFRLDZGQUE2RixLQUE3RixDQUFtRyxHQUFuRyxDQUFSLENBSFc7QUFJWixJQUFFLElBQUYsQ0FBTyxNQUFLLFFBQUwsQ0FBYyxJQUFkLEVBQW1CLFVBQVMsRUFBVCxFQUFZLEdBQVosRUFBZ0I7QUFDekMsV0FBUSxPQUFSLENBQWdCLElBQUksSUFBSixDQUFoQixJQUEyQixDQUFDLENBQUQsS0FBTyxLQUFLLElBQUksSUFBSixDQUFMLEdBQWUsSUFBSSxNQUFKLENBQWpELENBRHlDO0dBQWhCLENBQTFCLENBSlk7QUFPWixRQUFLLEtBQUwsR0FBVyxJQUFJLE1BQUssV0FBTCxDQUFpQixLQUFqQixFQUFmLENBUFk7QUFRWixRQUFLLFlBQUwsR0FBa0I7QUFDakIsWUFBUyxJQUFJLFlBQUosRUFBVDtBQUNBLFNBQUssSUFBSSxZQUFKLENBQWlCLE1BQUssUUFBTCxDQUF0QjtBQUNBLGFBQVUsSUFBSSxZQUFKLEVBQVY7QUFDQSxjQUFXLElBQUksZUFBSyxPQUFMLE1BQUosQ0FBWDtBQUNBLFVBQU8sSUFBSSxnQkFBTSxPQUFOLE1BQUosQ0FBUDtBQUNBLFVBQU8sVUFBVSxHQUFULEVBQWE7QUFDcEIsUUFBSSxRQUFKLEdBQWEsVUFBUyxDQUFULEVBQVc7QUFDdkIsVUFBSyxLQUFLLE1BQUwsR0FBWSxDQUFaLENBQUwsQ0FBb0IsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFEdUI7S0FBWCxDQURPO0FBSXBCLFFBQUksUUFBSixHQUFhLFVBQVMsS0FBVCxFQUFlO0FBQzNC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QUFTLEtBQVQsRUFBZ0IsRUFBaEIsRUFBbUI7QUFDdkIsT0FBSSxNQUFJLE1BQU0sRUFBTixDQUFSLEdBQWtCLEtBQWxCLENBRHVCO0dBQW5CO0VBVk4sRUFGZTtDQUFoQjs7SUFrQk0sZUFDTCxTQURLLFlBQ0wsQ0FBWSxPQUFaLEVBQW9CO3VCQURmLGNBQ2U7O0FBQ25CLE1BQUssT0FBTCxHQUFhLE9BQWIsQ0FEbUI7Q0FBcEIiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmFjdG9yeSBmcm9tICcuL2ZhY3RvcnknXG5pbXBvcnQgRm9udFRoZW1lIGZyb20gJy4vdGhlbWUvZm9udCdcbmltcG9ydCBDb2xvclRoZW1lIGZyb20gJy4vdGhlbWUvY29sb3InXG5pbXBvcnQgRm9ybWF0VGhlbWUgZnJvbSAnLi90aGVtZS9mb3JtYXQnXG5cbmltcG9ydCBUYWJsZSBmcm9tIFwiLi9tb2RlbC90YWJsZVwiXG5pbXBvcnQgTGlzdCBmcm9tIFwiLi9tb2RlbC9saXN0XCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9kb2N1bWVudCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz10aGlzLnJlbHMsXG5cdFx0XHRidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcblx0XHQkLmVhY2godGhpcy5wYXJ0TWFpbi5yZWxzLGZ1bmN0aW9uKGlkLHJlbCl7XG5cdFx0XHRidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSAmJiAocmVsc1tyZWwudHlwZV09cmVsLnRhcmdldClcblx0XHR9KVxuXHRcdHRoaXMuc3R5bGU9bmV3IHRoaXMuY29uc3RydWN0b3IuU3R5bGUoKVxuXHRcdHRoaXMucGFyc2VDb250ZXh0PXtcblx0XHRcdHNlY3Rpb246IG5ldyBQYXJzZUNvbnRleHQoKSxcblx0XHRcdHBhcnQ6bmV3IFBhcnNlQ29udGV4dCh0aGlzLnBhcnRNYWluKSxcblx0XHRcdGJvb2ttYXJrOiBuZXcgUGFyc2VDb250ZXh0KCksXG5cdFx0XHRudW1iZXJpbmc6IG5ldyBMaXN0LkNvbnRleHQodGhpcyksXG5cdFx0XHR0YWJsZTogbmV3IFRhYmxlLkNvbnRleHQodGhpcyksXG5cdFx0XHRmaWVsZDogKGZ1bmN0aW9uKGN0eCl7XG5cdFx0XHRcdGN0eC5pbnN0cnVjdD1mdW5jdGlvbih0KXtcblx0XHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoLTFdLmluc3RydWN0KHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y3R4LnNlcGVyYXRlPWZ1bmN0aW9uKG1vZGVsKXtcblx0XHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoLTFdLnNlcGVyYXRlKG1vZGVsKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGN0eC5lbmQ9ZnVuY3Rpb24oZW5kTW9kZWwsIGVuZFZpc2l0b3JzKXtcblx0XHRcdFx0XHR0aGlzLnBvcCgpLmVuZCguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGN0eFxuXHRcdFx0fSkoW10pXG5cdFx0fTtcblx0fVxuXHRcblx0c3RhdGljIGdldCBleHQoKXtyZXR1cm4gJ2RvY3gnfVxuXG5cdHBhcnNlKHZpc2l0RmFjdG9yaWVzKXtcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5jb250ZW50PXRoaXMuZmFjdG9yeSh0aGlzLnBhcnRNYWluLmRvY3VtZW50RWxlbWVudCwgdGhpcylcblx0XHR2YXIgcm9vdHM9dGhpcy5jb250ZW50LnBhcnNlKCQuaXNBcnJheSh2aXNpdEZhY3RvcmllcykgPyB2aXNpdEZhY3RvcmllcyA6ICQudG9BcnJheShhcmd1bWVudHMpKVxuXHRcdHRoaXMucmVsZWFzZSgpXG5cdFx0cmV0dXJuIHJvb3RzLmxlbmd0aD09MSA/IHJvb3RzWzBdIDogcm9vdHNcblx0fVxuXHRnZXRSZWwoaWQpe1xuXHRcdHJldHVybiB0aGlzLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnQuZ2V0UmVsKGlkKVxuXHR9XG5cdGdldENvbG9yVGhlbWUoKXtcblx0XHRpZih0aGlzLmNvbG9yVGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5jb2xvclRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuY29sb3JUaGVtZT1uZXcgQ29sb3JUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWUnKSwgdGhpcy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgnY2xyU2NoZW1lTWFwcGluZycpKVxuXHR9XG5cdGdldEZvbnRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9udFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lXG5cdFx0cmV0dXJuIHRoaXMuZm9udFRoZW1lPW5ldyBGb250VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm9udFNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCd0aGVtZUZvbnRMYW5nJykpXG5cdH1cblx0Z2V0Rm9ybWF0VGhlbWUoKXtcblx0XHRpZih0aGlzLmZvcm1hdFRoZW1lKVxuXHRcdFx0cmV0dXJuIHRoaXMuZm9ybWF0VGhlbWVcblx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZT1uZXcgRm9ybWF0VGhlbWUodGhpcy5nZXRQYXJ0KCd0aGVtZScpLmRvY3VtZW50RWxlbWVudC4kMSgnZm10U2NoZW1lJyksIHRoaXMpXG5cdH1cblx0cmVsZWFzZSgpe1xuXHRcdGRlbGV0ZSB0aGlzLnBhcnNlQ29udGV4dFxuXHRcdHN1cGVyLnJlbGVhc2UoLi4uYXJndW1lbnRzKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuIFwiV29yZFwifVxuXG5cdHN0YXRpYyBnZXQgU3R5bGUoKXtyZXR1cm4gU3R5bGV9XG5cdFxuXHRzdGF0aWMgRmFjdG9yeT1GYWN0b3J5XG59XG5cbmZ1bmN0aW9uIFN0eWxlKCl7XG5cdHZhciBpZHM9e30sZGVmYXVsdHM9e31cblx0T2JqZWN0LmFzc2lnbih0aGlzLHtcblx0XHRzZXREZWZhdWx0OiBmdW5jdGlvbihzdHlsZSl7XG5cdFx0XHRkZWZhdWx0c1tzdHlsZS50eXBlXT1zdHlsZVxuXHRcdH0sXG5cdFx0Z2V0RGVmYXVsdDogZnVuY3Rpb24odHlwZSl7XG5cdFx0XHRyZXR1cm4gZGVmYXVsdHNbdHlwZV1cblx0XHR9LFxuXHRcdGdldDogZnVuY3Rpb24oaWQpe1xuXHRcdFx0cmV0dXJuIGlkc1tpZF1cblx0XHR9LFxuXHRcdHNldDogZnVuY3Rpb24oc3R5bGUsIGlkKXtcblx0XHRcdGlkc1tpZHx8c3R5bGUuaWRdPXN0eWxlXG5cdFx0fVxuXHR9KVxufVxuXG5jbGFzcyBQYXJzZUNvbnRleHR7XG5cdGNvbnN0cnVjdG9yKGN1cnJlbnQpe1xuXHRcdHRoaXMuY3VycmVudD1jdXJyZW50XG5cdH1cbn1cbiJdfQ==