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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixRQUNwQixHQUFhO3dCQURPLFVBQ1A7O3FFQURPLHNCQUVWLFlBREc7O0FBRVosTUFBSSxPQUFLLE1BQUssSUFBTDtNQUNSLFVBQVEsNkZBQTZGLEtBQTdGLENBQW1HLEdBQW5HLENBQVIsQ0FIVztBQUlaLElBQUUsSUFBRixDQUFPLE1BQUssUUFBTCxDQUFjLElBQWQsRUFBbUIsVUFBUyxFQUFULEVBQVksR0FBWixFQUFnQjtBQUN6QyxXQUFRLE9BQVIsQ0FBZ0IsSUFBSSxJQUFKLENBQWhCLElBQTJCLENBQUMsQ0FBRCxLQUFPLEtBQUssSUFBSSxJQUFKLENBQUwsR0FBZSxJQUFJLE1BQUosQ0FBakQsQ0FEeUM7R0FBaEIsQ0FBMUIsQ0FKWTtBQU9aLFFBQUssS0FBTCxHQUFXLElBQUksTUFBSyxXQUFMLENBQWlCLEtBQWpCLEVBQWYsQ0FQWTtBQVFaLFFBQUssWUFBTCxHQUFrQjtBQUNqQixZQUFTLElBQUksWUFBSixFQUFUO0FBQ0EsU0FBSyxJQUFJLFlBQUosQ0FBaUIsTUFBSyxRQUFMLENBQXRCO0FBQ0EsYUFBVSxJQUFJLFlBQUosRUFBVjtBQUNBLFVBQU8sVUFBVSxHQUFULEVBQWE7QUFDcEIsUUFBSSxRQUFKLEdBQWEsVUFBUyxDQUFULEVBQVc7QUFDdkIsVUFBSyxLQUFLLE1BQUwsR0FBWSxDQUFaLENBQUwsQ0FBb0IsUUFBcEIsQ0FBNkIsQ0FBN0IsRUFEdUI7S0FBWCxDQURPO0FBSXBCLFFBQUksUUFBSixHQUFhLFVBQVMsS0FBVCxFQUFlO0FBQzNCLFVBQUssS0FBSyxNQUFMLEdBQVksQ0FBWixDQUFMLENBQW9CLFFBQXBCLENBQTZCLEtBQTdCLEVBRDJCO0tBQWYsQ0FKTztBQU9wQixRQUFJLEdBQUos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bkI7RUFWTixFQUZlO0NBQWhCOztJQWtCTSxlQUNMLFNBREssWUFDTCxDQUFZLE9BQVosRUFBb0I7dUJBRGYsY0FDZTs7QUFDbkIsTUFBSyxPQUFMLEdBQWEsT0FBYixDQURtQjtDQUFwQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5IGZyb20gJy4vZmFjdG9yeSdcbmltcG9ydCBGb250VGhlbWUgZnJvbSAnLi90aGVtZS9mb250J1xuaW1wb3J0IENvbG9yVGhlbWUgZnJvbSAnLi90aGVtZS9jb2xvcidcbmltcG9ydCBGb3JtYXRUaGVtZSBmcm9tICcuL3RoZW1lL2Zvcm1hdCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9kb2N1bWVudCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz10aGlzLnJlbHMsXG5cdFx0XHRidWlsdEluPSdzZXR0aW5ncyx3ZWJTZXR0aW5ncyx0aGVtZSxzdHlsZXMsc3R5bGVzV2l0aEVmZmVjdHMsZm9udFRhYmxlLG51bWJlcmluZyxmb290bm90ZXMsZW5kbm90ZXMnLnNwbGl0KCcsJylcblx0XHQkLmVhY2godGhpcy5wYXJ0TWFpbi5yZWxzLGZ1bmN0aW9uKGlkLHJlbCl7XG5cdFx0XHRidWlsdEluLmluZGV4T2YocmVsLnR5cGUpIT0tMSAmJiAocmVsc1tyZWwudHlwZV09cmVsLnRhcmdldClcblx0XHR9KVxuXHRcdHRoaXMuc3R5bGU9bmV3IHRoaXMuY29uc3RydWN0b3IuU3R5bGUoKVxuXHRcdHRoaXMucGFyc2VDb250ZXh0PXtcblx0XHRcdHNlY3Rpb246IG5ldyBQYXJzZUNvbnRleHQoKSxcblx0XHRcdHBhcnQ6bmV3IFBhcnNlQ29udGV4dCh0aGlzLnBhcnRNYWluKSxcblx0XHRcdGJvb2ttYXJrOiBuZXcgUGFyc2VDb250ZXh0KCksXG5cdFx0XHRmaWVsZDogKGZ1bmN0aW9uKGN0eCl7XG5cdFx0XHRcdGN0eC5pbnN0cnVjdD1mdW5jdGlvbih0KXtcblx0XHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoLTFdLmluc3RydWN0KHQpXG5cdFx0XHRcdH1cblx0XHRcdFx0Y3R4LnNlcGVyYXRlPWZ1bmN0aW9uKG1vZGVsKXtcblx0XHRcdFx0XHR0aGlzW3RoaXMubGVuZ3RoLTFdLnNlcGVyYXRlKG1vZGVsKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGN0eC5lbmQ9ZnVuY3Rpb24oZW5kTW9kZWwsIGVuZFZpc2l0b3JzKXtcblx0XHRcdFx0XHR0aGlzLnBvcCgpLmVuZCguLi5hcmd1bWVudHMpXG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGN0eFxuXHRcdFx0fSkoW10pXG5cdFx0fTtcblx0fVxuXHRzdGF0aWMgZ2V0IGV4dCgpe3JldHVybiAnZG9jeCd9XG5cblx0cGFyc2UodmlzaXRGYWN0b3JpZXMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmNvbnRlbnQ9dGhpcy5mYWN0b3J5KHRoaXMucGFydE1haW4uZG9jdW1lbnRFbGVtZW50LCB0aGlzKVxuXHRcdHZhciByb290cz10aGlzLmNvbnRlbnQucGFyc2UoJC5pc0FycmF5KHZpc2l0RmFjdG9yaWVzKSA/IHZpc2l0RmFjdG9yaWVzIDogJC50b0FycmF5KGFyZ3VtZW50cykpXG5cdFx0dGhpcy5yZWxlYXNlKClcblx0XHRyZXR1cm4gcm9vdHMubGVuZ3RoPT0xID8gcm9vdHNbMF0gOiByb290c1xuXHR9XG5cdGdldFJlbChpZCl7XG5cdFx0cmV0dXJuIHRoaXMucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudC5nZXRSZWwoaWQpXG5cdH1cblx0Z2V0Q29sb3JUaGVtZSgpe1xuXHRcdGlmKHRoaXMuY29sb3JUaGVtZSlcblx0XHRcdHJldHVybiB0aGlzLmNvbG9yVGhlbWVcblx0XHRyZXR1cm4gdGhpcy5jb2xvclRoZW1lPW5ldyBDb2xvclRoZW1lKHRoaXMuZ2V0UGFydCgndGhlbWUnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2NsclNjaGVtZScpLCB0aGlzLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCdjbHJTY2hlbWVNYXBwaW5nJykpXG5cdH1cblx0Z2V0Rm9udFRoZW1lKCl7XG5cdFx0aWYodGhpcy5mb250VGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5mb250VGhlbWVcblx0XHRyZXR1cm4gdGhpcy5mb250VGhlbWU9bmV3IEZvbnRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmb250U2NoZW1lJyksIHRoaXMuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ3RoZW1lRm9udExhbmcnKSlcblx0fVxuXHRnZXRGb3JtYXRUaGVtZSgpe1xuXHRcdGlmKHRoaXMuZm9ybWF0VGhlbWUpXG5cdFx0XHRyZXR1cm4gdGhpcy5mb3JtYXRUaGVtZVxuXHRcdHJldHVybiB0aGlzLmZvcm1hdFRoZW1lPW5ldyBGb3JtYXRUaGVtZSh0aGlzLmdldFBhcnQoJ3RoZW1lJykuZG9jdW1lbnRFbGVtZW50LiQxKCdmbXRTY2hlbWUnKSwgdGhpcylcblx0fVxuXHRyZWxlYXNlKCl7XG5cdFx0ZGVsZXRlIHRoaXMucGFyc2VDb250ZXh0XG5cdFx0c3VwZXIucmVsZWFzZSguLi5hcmd1bWVudHMpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gXCJXb3JkXCJ9XG5cblx0c3RhdGljIGdldCBTdHlsZSgpe3JldHVybiBTdHlsZX1cblxuXHRzdGF0aWMgZ2V0IGZhY3RvcnkoKXtyZXR1cm4gZmFjdG9yeX1cbn1cblxuZnVuY3Rpb24gU3R5bGUoKXtcblx0dmFyIGlkcz17fSxkZWZhdWx0cz17fVxuXHRPYmplY3QuYXNzaWduKHRoaXMse1xuXHRcdHNldERlZmF1bHQ6IGZ1bmN0aW9uKHN0eWxlKXtcblx0XHRcdGRlZmF1bHRzW3N0eWxlLnR5cGVdPXN0eWxlXG5cdFx0fSxcblx0XHRnZXREZWZhdWx0OiBmdW5jdGlvbih0eXBlKXtcblx0XHRcdHJldHVybiBkZWZhdWx0c1t0eXBlXVxuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbihpZCl7XG5cdFx0XHRyZXR1cm4gaWRzW2lkXVxuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbihzdHlsZSwgaWQpe1xuXHRcdFx0aWRzW2lkfHxzdHlsZS5pZF09c3R5bGVcblx0XHR9XG5cdH0pXG59XG5cbmNsYXNzIFBhcnNlQ29udGV4dHtcblx0Y29uc3RydWN0b3IoY3VycmVudCl7XG5cdFx0dGhpcy5jdXJyZW50PWN1cnJlbnRcblx0fVxufVxuIl19