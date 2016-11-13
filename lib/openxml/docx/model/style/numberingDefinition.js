'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//<w:numbering><w:abstractNum w:abstractNumId="0">
var NumberingDefinition = function (_Style) {
	_inherits(NumberingDefinition, _Style);

	function NumberingDefinition(wXml) {
		_classCallCheck(this, NumberingDefinition);

		var _this = _possibleConstructorReturn(this, (NumberingDefinition.__proto__ || Object.getPrototypeOf(NumberingDefinition)).apply(this, arguments));

		_this.levels = new Map();

		_this.name = _this.id = _this.constructor.asStyleId(wXml.attr('w:abstractNumId'));
		_this.wDoc.style.set(_this);
		var link = wXml.$1('numStyleLink');
		if (link) _this.link = link.attr('w:val');
		return _this;
	}

	_createClass(NumberingDefinition, [{
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			for (var i = 0, children = this.wXml.$('lvl'), l = children.length, t; i < l; i++) {
				t = new this.constructor.Level(children[i], this.wDoc, this);
				this.levels.set(t.level, t);
				t.parse(visitors);
			}
		}
	}, {
		key: 'getDefinitionId',
		value: function getDefinitionId() {
			return this.wXml.attr('w:abstractNumId');
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			var _this2 = this;

			for (var _len = arguments.length, indexes = Array(_len), _key = 0; _key < _len; _key++) {
				indexes[_key] = arguments[_key];
			}

			var _indexes = _slicedToArray(indexes[indexes.length - 1], 1);

			var level = _indexes[0];

			indexes = new Map(indexes);
			var lvlText = this.levels.get(level).values.lvlText;
			var label = lvlText.replace(/%(\d+)/g, function (a, index) {
				var current = parseInt(index) - 1;
				return _this2.levels.get(current).getLabel(indexes.get(current) - 1);
			});
			return label;
		}
	}, {
		key: 'getLabelStyle',
		value: function getLabelStyle(level) {}
	}], [{
		key: 'asStyleId',
		value: function asStyleId(absNumId) {
			return '_numberingDefinition' + absNumId;
		}
	}, {
		key: 'type',
		get: function get() {
			return 'style.numbering.definition';
		}
	}, {
		key: 'Level',
		get: function get() {
			return Level;
		}
	}]);

	return NumberingDefinition;
}(_style2.default);

exports.default = NumberingDefinition;

var Level = function (_Style$Properties) {
	_inherits(Level, _Style$Properties);

	function Level(wXml) {
		_classCallCheck(this, Level);

		var _this3 = _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).apply(this, arguments));

		_this3.level = parseInt(wXml.attr('w:ilvl'));
		return _this3;
	}

	_createClass(Level, [{
		key: 'parse',
		value: function parse(visitors) {
			_get(Level.prototype.__proto__ || Object.getPrototypeOf(Level.prototype), 'parse', this).apply(this, arguments);
			var t, pr;
			if (t = this.wXml.$1('>pPr')) {
				var _pr;

				pr = new (require('./paragraph').Properties)(t, this.wDoc, this);
				pr.type = this.level + ' ' + pr.type;
				(_pr = pr).parse.apply(_pr, arguments);
			}

			if (t = this.wXml.$1('>rPr')) {
				var _pr2;

				pr = new _inline2.default.Properties(t, this.wDoc, this);
				pr.type = this.level + ' ' + pr.type;
				(_pr2 = pr).parse.apply(_pr2, arguments);
			}
		}
	}, {
		key: 'start',
		value: function start(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'numFm',
		value: function numFm(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlText',
		value: function lvlText(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlJc',
		value: function lvlJc(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'lvlPicBulletId',
		value: function lvlPicBulletId(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'getLabel',
		value: function getLabel(index) {
			switch (this.values.numFm) {
				default:
					return new String(this.values.start + index);
			}
		}
		/* number type:
  decimal
  upperRoman
  lowerRoman
  upperLetter
  lowerLetter
  ordinal
  cardinalText
  ordinalText
  hex
  chicago
  ideographDigital
  japaneseCounting
  aiueo
  iroha
  decimalFullWidth
  decimalHalfWidth
  japaneseLegal
  japaneseDigitalTenThousand
  decimalEnclosedCircle
  decimalFullWidth2
  aiueoFullWidth
  irohaFullWidth
  decimalZero
  bullet
  ganada
  chosung
  decimalEnclosedFullstop
  decimalEnclosedParen
  decimalEnclosedCircleChinese
  ideographEnclosedCircle
  ideographTraditional
  ideographZodiac
  ideographZodiacTraditional
  taiwaneseCounting
  ideographLegalTraditional
  taiwaneseCountingThousand
  taiwaneseDigital
  chineseCounting
  chineseLegalSimplified
  chineseCountingThousand
  koreanDigital
  koreanCounting
  koreanLegal
  koreanDigital2
  vietnameseCounting
  russianLower
  russianUpper
  none
  numberInDash
  hebrew1
  hebrew2
  arabicAlpha
  arabicAbjad
  hindiVowels
  hindiConsonants
  hindiNumbers
  hindiCounting
  thaiLetters
  thaiNumbers
  thaiCounting
  */

	}]);

	return Level;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbnVtYmVyaW5nRGVmaW5pdGlvbi5qcyJdLCJuYW1lcyI6WyJOdW1iZXJpbmdEZWZpbml0aW9uIiwid1htbCIsImFyZ3VtZW50cyIsImxldmVscyIsIk1hcCIsIm5hbWUiLCJpZCIsImNvbnN0cnVjdG9yIiwiYXNTdHlsZUlkIiwiYXR0ciIsIndEb2MiLCJzdHlsZSIsInNldCIsImxpbmsiLCIkMSIsImYiLCJmYWN0b3JpZXMiLCJ2aXNpdG9ycyIsImkiLCJjaGlsZHJlbiIsIiQiLCJsIiwibGVuZ3RoIiwidCIsIkxldmVsIiwibGV2ZWwiLCJwYXJzZSIsImluZGV4ZXMiLCJsdmxUZXh0IiwiZ2V0IiwidmFsdWVzIiwibGFiZWwiLCJyZXBsYWNlIiwiYSIsImluZGV4IiwiY3VycmVudCIsInBhcnNlSW50IiwiZ2V0TGFiZWwiLCJhYnNOdW1JZCIsInByIiwicmVxdWlyZSIsIlByb3BlcnRpZXMiLCJ0eXBlIiwieCIsIm51bUZtIiwiU3RyaW5nIiwic3RhcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0lBQ3FCQSxtQjs7O0FBQ3BCLDhCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUEseUlBQ1BDLFNBRE87O0FBRWhCLFFBQUtDLE1BQUwsR0FBWSxJQUFJQyxHQUFKLEVBQVo7O0FBRUEsUUFBS0MsSUFBTCxHQUFVLE1BQUtDLEVBQUwsR0FBUSxNQUFLQyxXQUFMLENBQWlCQyxTQUFqQixDQUEyQlAsS0FBS1EsSUFBTCxDQUFVLGlCQUFWLENBQTNCLENBQWxCO0FBQ0EsUUFBS0MsSUFBTCxDQUFVQyxLQUFWLENBQWdCQyxHQUFoQjtBQUNBLE1BQUlDLE9BQUtaLEtBQUthLEVBQUwsQ0FBUSxjQUFSLENBQVQ7QUFDQSxNQUFHRCxJQUFILEVBQ0MsTUFBS0EsSUFBTCxHQUFVQSxLQUFLSixJQUFMLENBQVUsT0FBVixDQUFWO0FB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d0JBQ0t5QyxDLEVBQUU7QUFDUCxVQUFPUCxTQUFTTyxFQUFFbEMsSUFBRixDQUFPLE9BQVAsQ0FBVCxDQUFQO0FBQ0E7Ozt3QkFDS2tDLEMsRUFBRTtBQUNQLFVBQU9BLEVBQUVsQyxJQUFGLENBQU8sT0FBUCxDQUFQO0FBQ0E7OzswQkFDT2tDLEMsRUFBRTtBQUNULFVBQU9BLEVBQUVsQyxJQUFGLENBQU8sT0FBUCxDQUFQO0FBQ0E7Ozt3QkFDS2tDLEMsRUFBRTtBQUNQLFVBQU9BLEVBQUVsQyxJQUFGLENBQU8sT0FBUCxDQUFQO0FBQ0E7OztpQ0FDY2tDLEMsRUFBRTtBQUNoQixVQUFPQSxFQUFFbEMsSUFBRixDQUFPLE9BQVAsQ0FBUDtBQUNBOzs7MkJBRVF5QixLLEVBQU07QUFDZCxXQUFPLEtBQUtKLE1BQUwsQ0FBWWMsS0FBbkI7QUFDQTtBQUNDLFlBQU8sSUFBSUMsTUFBSixDQUFXLEtBQUtmLE1BQUwsQ0FBWWdCLEtBQVosR0FBa0JaLEtBQTdCLENBQVA7QUFGRDtBQUlBO0FBQ0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQTFDb0IsZ0JBQU1PLFUiLCJmaWxlIjoibnVtYmVyaW5nRGVmaW5pdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcbmltcG9ydCBJbmxpbmUgZnJvbSAnLi9pbmxpbmUnXG5cbi8vPHc6bnVtYmVyaW5nPjx3OmFic3RyYWN0TnVtIHc6YWJzdHJhY3ROdW1JZD1cIjBcIj5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE51bWJlcmluZ0RlZmluaXRpb24gZXh0ZW5kcyBTdHlsZXtcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubGV2ZWxzPW5ldyBNYXAoKVxuXG5cdFx0dGhpcy5uYW1lPXRoaXMuaWQ9dGhpcy5jb25zdHJ1Y3Rvci5hc1N0eWxlSWQod1htbC5hdHRyKCd3OmFic3RyYWN0TnVtSWQnKSlcblx0XHR0aGlzLndEb2Muc3R5bGUuc2V0KHRoaXMpXG5cdFx0dmFyIGxpbms9d1htbC4kMSgnbnVtU3R5bGVMaW5rJylcblx0XHRpZihsaW5rKVxuXHRcdFx0dGhpcy5saW5rPWxpbmsuYXR0cigndzp2YWwnKVxuXHR9XG5cdFxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLndYbWwuJCgnbHZsJyksbD1jaGlsZHJlbi5sZW5ndGgsIHQ7IGk8bDsgaSsrKXtcblx0XHRcdHQ9bmV3IHRoaXMuY29uc3RydWN0b3IuTGV2ZWwoY2hpbGRyZW5baV0sdGhpcy53RG9jLCB0aGlzKVxuXHRcdFx0dGhpcy5sZXZlbHMuc2V0KHQubGV2ZWwsdClcblx0XHRcdHQucGFyc2UodmlzaXRvcnMpXG5cdFx0fVxuXHR9XG5cdFxuXHRnZXREZWZpbml0aW9uSWQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6YWJzdHJhY3ROdW1JZCcpXG5cdH1cblx0XG5cdGdldExhYmVsKC4uLmluZGV4ZXMpe1xuXHRcdGxldCBbbGV2ZWxdPWluZGV4ZXNbaW5kZXhlcy5sZW5ndGgtMV1cblx0XHRpbmRleGVzPW5ldyBNYXAoaW5kZXhlcylcblx0XHRsZXQgbHZsVGV4dD10aGlzLmxldmVscy5nZXQobGV2ZWwpLnZhbHVlcy5sdmxUZXh0XG5cdFx0bGV0IGxhYmVsPWx2bFRleHQucmVwbGFjZSgvJShcXGQrKS9nLChhLGluZGV4KT0+e1xuXHRcdFx0bGV0IGN1cnJlbnQ9cGFyc2VJbnQoaW5kZXgpLTFcblx0XHRcdHJldHVybiB0aGlzLmxldmVscy5nZXQoY3VycmVudCkuZ2V0TGFiZWwoaW5kZXhlcy5nZXQoY3VycmVudCktMSlcblx0XHR9KVxuXHRcdHJldHVybiBsYWJlbFxuXHR9XG5cdFxuXHRnZXRMYWJlbFN0eWxlKGxldmVsKXtcblx0XHRcblx0fVxuXG5cdHN0YXRpYyBhc1N0eWxlSWQoYWJzTnVtSWQpe1xuXHRcdHJldHVybiAnX251bWJlcmluZ0RlZmluaXRpb24nK2Fic051bUlkXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLm51bWJlcmluZy5kZWZpbml0aW9uJ31cblxuXHRzdGF0aWMgZ2V0IExldmVsKCl7cmV0dXJuIExldmVsfVxufVxuXG5jbGFzcyBMZXZlbCBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNvbnN0cnVjdG9yKHdYbWwpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLmxldmVsPXBhcnNlSW50KHdYbWwuYXR0cigndzppbHZsJykpXG5cdH1cblx0cGFyc2UodmlzaXRvcnMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgdCxwcjtcblx0XHRpZih0PXRoaXMud1htbC4kMSgnPnBQcicpKXtcblx0XHRcdHByPW5ldyAocmVxdWlyZSgnLi9wYXJhZ3JhcGgnKS5Qcm9wZXJ0aWVzKSh0LHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0cHIudHlwZT10aGlzLmxldmVsKycgJytwci50eXBlXG5cdFx0XHRwci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0fVxuXG5cdFx0aWYodD10aGlzLndYbWwuJDEoJz5yUHInKSl7XG5cdFx0XHRwcj1uZXcgSW5saW5lLlByb3BlcnRpZXModCx0aGlzLndEb2MsdGhpcylcblx0XHRcdHByLnR5cGU9dGhpcy5sZXZlbCsnICcrcHIudHlwZVxuXHRcdFx0cHIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdH1cblx0fVxuXHRzdGFydCh4KXtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKVxuXHR9XG5cdG51bUZtKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRsdmxUZXh0KHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRsdmxKYyh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0bHZsUGljQnVsbGV0SWQoeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdFxuXHRnZXRMYWJlbChpbmRleCl7XG5cdFx0c3dpdGNoKHRoaXMudmFsdWVzLm51bUZtKXtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIG5ldyBTdHJpbmcodGhpcy52YWx1ZXMuc3RhcnQraW5kZXgpXG5cdFx0fVxuXHR9XG4vKiBudW1iZXIgdHlwZTpcbmRlY2ltYWxcbnVwcGVyUm9tYW5cbmxvd2VyUm9tYW5cbnVwcGVyTGV0dGVyXG5sb3dlckxldHRlclxub3JkaW5hbFxuY2FyZGluYWxUZXh0XG5vcmRpbmFsVGV4dFxuaGV4XG5jaGljYWdvXG5pZGVvZ3JhcGhEaWdpdGFsXG5qYXBhbmVzZUNvdW50aW5nXG5haXVlb1xuaXJvaGFcbmRlY2ltYWxGdWxsV2lkdGhcbmRlY2ltYWxIYWxmV2lkdGhcbmphcGFuZXNlTGVnYWxcbmphcGFuZXNlRGlnaXRhbFRlblRob3VzYW5kXG5kZWNpbWFsRW5jbG9zZWRDaXJjbGVcbmRlY2ltYWxGdWxsV2lkdGgyXG5haXVlb0Z1bGxXaWR0aFxuaXJvaGFGdWxsV2lkdGhcbmRlY2ltYWxaZXJvXG5idWxsZXRcbmdhbmFkYVxuY2hvc3VuZ1xuZGVjaW1hbEVuY2xvc2VkRnVsbHN0b3BcbmRlY2ltYWxFbmNsb3NlZFBhcmVuXG5kZWNpbWFsRW5jbG9zZWRDaXJjbGVDaGluZXNlXG5pZGVvZ3JhcGhFbmNsb3NlZENpcmNsZVxuaWRlb2dyYXBoVHJhZGl0aW9uYWxcbmlkZW9ncmFwaFpvZGlhY1xuaWRlb2dyYXBoWm9kaWFjVHJhZGl0aW9uYWxcbnRhaXdhbmVzZUNvdW50aW5nXG5pZGVvZ3JhcGhMZWdhbFRyYWRpdGlvbmFsXG50YWl3YW5lc2VDb3VudGluZ1Rob3VzYW5kXG50YWl3YW5lc2VEaWdpdGFsXG5jaGluZXNlQ291bnRpbmdcbmNoaW5lc2VMZWdhbFNpbXBsaWZpZWRcbmNoaW5lc2VDb3VudGluZ1Rob3VzYW5kXG5rb3JlYW5EaWdpdGFsXG5rb3JlYW5Db3VudGluZ1xua29yZWFuTGVnYWxcbmtvcmVhbkRpZ2l0YWwyXG52aWV0bmFtZXNlQ291bnRpbmdcbnJ1c3NpYW5Mb3dlclxucnVzc2lhblVwcGVyXG5ub25lXG5udW1iZXJJbkRhc2hcbmhlYnJldzFcbmhlYnJldzJcbmFyYWJpY0FscGhhXG5hcmFiaWNBYmphZFxuaGluZGlWb3dlbHNcbmhpbmRpQ29uc29uYW50c1xuaGluZGlOdW1iZXJzXG5oaW5kaUNvdW50aW5nXG50aGFpTGV0dGVyc1xudGhhaU51bWJlcnNcbnRoYWlDb3VudGluZ1xuKi9cbn1cbiJdfQ==