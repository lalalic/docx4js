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

			var _indexes = _slicedToArray(indexes[indexes.length - 1], 1),
			    level = _indexes[0];

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbnVtYmVyaW5nRGVmaW5pdGlvbi5qcyJdLCJuYW1lcyI6WyJOdW1iZXJpbmdEZWZpbml0aW9uIiwid1htbCIsImFyZ3VtZW50cyIsImxldmVscyIsIk1hcCIsIm5hbWUiLCJpZCIsImNvbnN0cnVjdG9yIiwiYXNTdHlsZUlkIiwiYXR0ciIsIndEb2MiLCJzdHlsZSIsInNldCIsImxpbmsiLCIkMSIsImYiLCJmYWN0b3JpZXMiLCJ2aXNpdG9ycyIsImkiLCJjaGlsZHJlbiIsIiQiLCJsIiwibGVuZ3RoIiwidCIsIkxldmVsIiwibGV2ZWwiLCJwYXJzZSIsImluZGV4ZXMiLCJsdmxUZXh0IiwiZ2V0IiwidmFsdWVzIiwibGFiZWwiLCJyZXBsYWNlIiwiYSIsImluZGV4IiwiY3VycmVudCIsInBhcnNlSW50IiwiZ2V0TGFiZWwiLCJhYnNOdW1JZCIsIlN0eWxlIiwicHIiLCJyZXF1aXJlIiwiUHJvcGVydGllcyIsInR5cGUiLCJJbmxpbmUiLCJ4IiwibnVtRm0iLCJTdHJpbmciLCJzdGFydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7SUFDcUJBLG1COzs7QUFDcEIsOEJBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFBQSx5SUFDUEMsU0FETzs7QUFFaEIsUUFBS0MsTUFBTCxHQUFZLElBQUlDLEdBQUosRUFBWjs7QUFFQSxRQUFLQyxJQUFMLEdBQVUsTUFBS0MsRUFBTCxHQUFRLE1BQUtDLFdBQUwsQ0FBaUJDLFNBQWpCLENBQTJCUCxLQUFLUSxJQUFMLENBQVUsaUJBQVYsQ0FBM0IsQ0FBbEI7QUFDQSxRQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLEdBQWhCO0FBQ0EsTUFBSUMsT0FBS1osS0FBS2EsRUFBTCxDQUFRLGNBQVIsQ0FBVDtBQUNBLE1BQUdELElBQUgsRUFDQyxNQUFLQSxJQUFMLEdBQVVBLEtBQUtKLElBQUws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SCxhQUFZeEIsU0FBWjtBQUNBO0FBQ0Q7Ozt3QkFDSzJDLEMsRUFBRTtBQUNQLFVBQU9ULFNBQVNTLEVBQUVwQyxJQUFGLENBQU8sT0FBUCxDQUFULENBQVA7QUFDQTs7O3dCQUNLb0MsQyxFQUFFO0FBQ1AsVUFBT0EsRUFBRXBDLElBQUYsQ0FBTyxPQUFQLENBQVA7QUFDQTs7OzBCQUNPb0MsQyxFQUFFO0FBQ1QsVUFBT0EsRUFBRXBDLElBQUYsQ0FBTyxPQUFQLENBQVA7QUFDQTs7O3dCQUNLb0MsQyxFQUFFO0FBQ1AsVUFBT0EsRUFBRXBDLElBQUYsQ0FBTyxPQUFQLENBQVA7QUFDQTs7O2lDQUNjb0MsQyxFQUFFO0FBQ2hCLFVBQU9BLEVBQUVwQyxJQUFGLENBQU8sT0FBUCxDQUFQO0FBQ0E7OzsyQkFFUXlCLEssRUFBTTtBQUNkLFdBQU8sS0FBS0osTUFBTCxDQUFZZ0IsS0FBbkI7QUFDQTtBQUNDLFlBQU8sSUFBSUMsTUFBSixDQUFXLEtBQUtqQixNQUFMLENBQVlrQixLQUFaLEdBQWtCZCxLQUE3QixDQUFQO0FBRkQ7QUFJQTtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUExQ29CSyxnQkFBTUcsVSIsImZpbGUiOiJudW1iZXJpbmdEZWZpbml0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuLy88dzpudW1iZXJpbmc+PHc6YWJzdHJhY3ROdW0gdzphYnN0cmFjdE51bUlkPVwiMFwiPlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyaW5nRGVmaW5pdGlvbiBleHRlbmRzIFN0eWxle1xuXHRjb25zdHJ1Y3Rvcih3WG1sKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5sZXZlbHM9bmV3IE1hcCgpXG5cblx0XHR0aGlzLm5hbWU9dGhpcy5pZD10aGlzLmNvbnN0cnVjdG9yLmFzU3R5bGVJZCh3WG1sLmF0dHIoJ3c6YWJzdHJhY3ROdW1JZCcpKVxuXHRcdHRoaXMud0RvYy5zdHlsZS5zZXQodGhpcylcblx0XHR2YXIgbGluaz13WG1sLiQxKCdudW1TdHlsZUxpbmsnKVxuXHRcdGlmKGxpbmspXG5cdFx0XHR0aGlzLmxpbms9bGluay5hdHRyKCd3OnZhbCcpXG5cdH1cblx0XG5cdF9pdGVyYXRlKGYsIGZhY3RvcmllcywgdmlzaXRvcnMpe1xuXHRcdGZvcih2YXIgaT0wLGNoaWxkcmVuPXRoaXMud1htbC4kKCdsdmwnKSxsPWNoaWxkcmVuLmxlbmd0aCwgdDsgaTxsOyBpKyspe1xuXHRcdFx0dD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5MZXZlbChjaGlsZHJlbltpXSx0aGlzLndEb2MsIHRoaXMpXG5cdFx0XHR0aGlzLmxldmVscy5zZXQodC5sZXZlbCx0KVxuXHRcdFx0dC5wYXJzZSh2aXNpdG9ycylcblx0XHR9XG5cdH1cblx0XG5cdGdldERlZmluaXRpb25JZCgpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuYXR0cigndzphYnN0cmFjdE51bUlkJylcblx0fVxuXHRcblx0Z2V0TGFiZWwoLi4uaW5kZXhlcyl7XG5cdFx0bGV0IFtsZXZlbF09aW5kZXhlc1tpbmRleGVzLmxlbmd0aC0xXVxuXHRcdGluZGV4ZXM9bmV3IE1hcChpbmRleGVzKVxuXHRcdGxldCBsdmxUZXh0PXRoaXMubGV2ZWxzLmdldChsZXZlbCkudmFsdWVzLmx2bFRleHRcblx0XHRsZXQgbGFiZWw9bHZsVGV4dC5yZXBsYWNlKC8lKFxcZCspL2csKGEsaW5kZXgpPT57XG5cdFx0XHRsZXQgY3VycmVudD1wYXJzZUludChpbmRleCktMVxuXHRcdFx0cmV0dXJuIHRoaXMubGV2ZWxzLmdldChjdXJyZW50KS5nZXRMYWJlbChpbmRleGVzLmdldChjdXJyZW50KS0xKVxuXHRcdH0pXG5cdFx0cmV0dXJuIGxhYmVsXG5cdH1cblx0XG5cdGdldExhYmVsU3R5bGUobGV2ZWwpe1xuXHRcdFxuXHR9XG5cblx0c3RhdGljIGFzU3R5bGVJZChhYnNOdW1JZCl7XG5cdFx0cmV0dXJuICdfbnVtYmVyaW5nRGVmaW5pdGlvbicrYWJzTnVtSWRcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUubnVtYmVyaW5nLmRlZmluaXRpb24nfVxuXG5cdHN0YXRpYyBnZXQgTGV2ZWwoKXtyZXR1cm4gTGV2ZWx9XG59XG5cbmNsYXNzIExldmVsIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubGV2ZWw9cGFyc2VJbnQod1htbC5hdHRyKCd3OmlsdmwnKSlcblx0fVxuXHRwYXJzZSh2aXNpdG9ycyl7XG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHZhciB0LHByO1xuXHRcdGlmKHQ9dGhpcy53WG1sLiQxKCc+cFByJykpe1xuXHRcdFx0cHI9bmV3IChyZXF1aXJlKCcuL3BhcmFncmFwaCcpLlByb3BlcnRpZXMpKHQsdGhpcy53RG9jLHRoaXMpXG5cdFx0XHRwci50eXBlPXRoaXMubGV2ZWwrJyAnK3ByLnR5cGVcblx0XHRcdHByLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR9XG5cblx0XHRpZih0PXRoaXMud1htbC4kMSgnPnJQcicpKXtcblx0XHRcdHByPW5ldyBJbmxpbmUuUHJvcGVydGllcyh0LHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0cHIudHlwZT10aGlzLmxldmVsKycgJytwci50eXBlXG5cdFx0XHRwci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0fVxuXHR9XG5cdHN0YXJ0KHgpe1xuXHRcdHJldHVybiBwYXJzZUludCh4LmF0dHIoJ3c6dmFsJykpXG5cdH1cblx0bnVtRm0oeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGx2bFRleHQoeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGx2bEpjKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRsdmxQaWNCdWxsZXRJZCh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0XG5cdGdldExhYmVsKGluZGV4KXtcblx0XHRzd2l0Y2godGhpcy52YWx1ZXMubnVtRm0pe1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gbmV3IFN0cmluZyh0aGlzLnZhbHVlcy5zdGFydCtpbmRleClcblx0XHR9XG5cdH1cbi8qIG51bWJlciB0eXBlOlxuZGVjaW1hbFxudXBwZXJSb21hblxubG93ZXJSb21hblxudXBwZXJMZXR0ZXJcbmxvd2VyTGV0dGVyXG5vcmRpbmFsXG5jYXJkaW5hbFRleHRcbm9yZGluYWxUZXh0XG5oZXhcbmNoaWNhZ29cbmlkZW9ncmFwaERpZ2l0YWxcbmphcGFuZXNlQ291bnRpbmdcbmFpdWVvXG5pcm9oYVxuZGVjaW1hbEZ1bGxXaWR0aFxuZGVjaW1hbEhhbGZXaWR0aFxuamFwYW5lc2VMZWdhbFxuamFwYW5lc2VEaWdpdGFsVGVuVGhvdXNhbmRcbmRlY2ltYWxFbmNsb3NlZENpcmNsZVxuZGVjaW1hbEZ1bGxXaWR0aDJcbmFpdWVvRnVsbFdpZHRoXG5pcm9oYUZ1bGxXaWR0aFxuZGVjaW1hbFplcm9cbmJ1bGxldFxuZ2FuYWRhXG5jaG9zdW5nXG5kZWNpbWFsRW5jbG9zZWRGdWxsc3RvcFxuZGVjaW1hbEVuY2xvc2VkUGFyZW5cbmRlY2ltYWxFbmNsb3NlZENpcmNsZUNoaW5lc2VcbmlkZW9ncmFwaEVuY2xvc2VkQ2lyY2xlXG5pZGVvZ3JhcGhUcmFkaXRpb25hbFxuaWRlb2dyYXBoWm9kaWFjXG5pZGVvZ3JhcGhab2RpYWNUcmFkaXRpb25hbFxudGFpd2FuZXNlQ291bnRpbmdcbmlkZW9ncmFwaExlZ2FsVHJhZGl0aW9uYWxcbnRhaXdhbmVzZUNvdW50aW5nVGhvdXNhbmRcbnRhaXdhbmVzZURpZ2l0YWxcbmNoaW5lc2VDb3VudGluZ1xuY2hpbmVzZUxlZ2FsU2ltcGxpZmllZFxuY2hpbmVzZUNvdW50aW5nVGhvdXNhbmRcbmtvcmVhbkRpZ2l0YWxcbmtvcmVhbkNvdW50aW5nXG5rb3JlYW5MZWdhbFxua29yZWFuRGlnaXRhbDJcbnZpZXRuYW1lc2VDb3VudGluZ1xucnVzc2lhbkxvd2VyXG5ydXNzaWFuVXBwZXJcbm5vbmVcbm51bWJlckluRGFzaFxuaGVicmV3MVxuaGVicmV3MlxuYXJhYmljQWxwaGFcbmFyYWJpY0FiamFkXG5oaW5kaVZvd2Vsc1xuaGluZGlDb25zb25hbnRzXG5oaW5kaU51bWJlcnNcbmhpbmRpQ291bnRpbmdcbnRoYWlMZXR0ZXJzXG50aGFpTnVtYmVyc1xudGhhaUNvdW50aW5nXG4qL1xufVxuIl19