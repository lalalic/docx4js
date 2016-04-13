'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumberingDefinition = function (_Style) {
	_inherits(NumberingDefinition, _Style);

	function NumberingDefinition(wXml) {
		_classCallCheck(this, NumberingDefinition);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumberingDefinition).apply(this, arguments));

		_this.levels = [];

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
				this.levels.push(t = new this.constructor.Level(children[i], this.wDoc, this));
				t.parse(visitors);
			}
		}
	}, {
		key: 'getDefinitionId',
		value: function getDefinitionId() {
			return this.wXml.attr('w:abstractNumId');
		}
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

		var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Level).apply(this, arguments));

		_this2.type = wXml.attr('w:ilvl');
		return _this2;
	}

	_createClass(Level, [{
		key: 'parse',
		value: function parse(visitors) {
			_get(Object.getPrototypeOf(Level.prototype), 'parse', this).apply(this, arguments);
			var t, pr;
			if (t = this.wXml.$1('>pPr')) {
				var _pr;

				pr = new (require('./paragraph').Properties)(t, this.wDoc, this);
				pr.type = this.type + ' ' + pr.type;
				(_pr = pr).parse.apply(_pr, arguments);
			}

			if (t = this.wXml.$1('>rPr')) {
				var _pr2;

				pr = new _inline2.default.Properties(t, this.wDoc, this);
				pr.type = this.type + ' ' + pr.type;
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
	}]);

	return Level;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbnVtYmVyaW5nRGVmaW5pdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsbUJBQ3BCLENBQVksSUFBWixFQUFpQjt3QkFERyxxQkFDSDs7cUVBREcsaUNBRVYsWUFETzs7QUFFaEIsUUFBSyxNQUFMLEdBQVksRUFBWixDQUZnQjs7QUFJaEIsUUFBSyxJQUFMLEdBQVUsTUFBSyxFQUFMLEdBQVEsTUFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLEtBQUssSUFBTCxDQUFVLGlCQUFWLENBQTNCLENBQVIsQ0FKTTtBQUtoQixRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLFFBTGdCO0FBTWhCLE1BQUksT0FBSyxLQUFLLEVBQUwsQ0FBUSxjQUFSLENBQUwsQ0FOWTtBQU9oQixNQUFHLElBQUgsRUFDQyxNQUFLLElBQUwsR0FBVSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQVYsQ0FERDtlQVBnQjtFQUFqQjs7Y0FEb0I7OzJCQVdYLEdBQUcsV0FBVyxVQUFTO0FBQy9CLFFBQUksSUFBSSxJQUFFLENBQUYsRUFBSSxXQUFTLEtBQUssSUFBTCxDQUFVLENBQVYsQ0FBWSxLQUFaLENBQVQsRUFBNEIsSUFBRSxTQUFTLE1BQVQsRUFBaUIsQ0FBdkQsRUFBMEQsSUFBRSxDQUFGLEVBQUssR0FBbkUsRUFBdUU7QUFDdEUsU0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFFLElBQUksS0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLFNBQVMsQ0FBVCxDQUEzQixFQUF1QyxLQUFLLElBQUwsRUFBVyxJQUFsRCxDQUFGLENBQWpCLENBRHNFO0FBRXRFLE1BQUUsS0FBRixDQUFRLFFBQVIsRUFGc0U7SUFBdkU7Ozs7b0NBS2dCO0FBQ2hCLFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLGlCQUFmLENBQVAsQ0FEZ0I7Ozs7NEJBSUEsVUFBUztBQUN6QixVQUFPLHlCQUF1QixRQUF2QixDQURrQjs7OztzQkFJVDtBQUFDLFVBQU8sNEJBQVAsQ0FBRDs7OztzQkFFQztBQUFDLFVBQU8sS0FBUCxDQUFEOzs7O1FBM0JFOzs7OztJQThCZjs7O0FBQ0wsVUFESyxLQUNMLENBQVksSUFBWixFQUFpQjt3QkFEWixPQUNZOztzRUFEWixtQkFFSyxZQURPOztBQUVoQixTQUFLLElBQUwsR0FBVSxLQUFLLElBQUwsQ0FBVSxRQUFWLENBQVYsQ0FGZ0I7O0VBQWpCOztjQURLOzt3QkFLQyxVQUFTO0FBQ2QsOEJBTkksNkNBTVcsVUFBZixDQURjO0FBRWQsT0FBSSxDQUFKLEVBQU0sRUFBTixDQUZjO0FBR2QsT0FBRyxJQUFFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLENBQUYsRUFBdUI7OztBQUN6QixTQUFHLEtBQUssUUFBUSxhQUFSLEVBQXVCLFVBQXZCLENBQUwsQ0FBd0MsQ0FBeEMsRUFBMEMsS0FBSyxJQUFMLEVBQVUsSUFBcEQsQ0FBSCxDQUR5QjtBQUV6QixPQUFHLElBQUgsR0FBUSxLQUFLLElBQUwsR0FBVSxHQUFWLEdBQWMsR0FBRyxJQUFILENBRkc7QUFHekIsZUFBRyxLQUFILFlBQVksU0FBWixFQUh5QjtJQUExQjs7QUFNQSxPQUFHLElBQUUsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE1BQWIsQ0FBRixFQUF1Qjs7O0FBQ3pCLFNBQUcsSUFBSSxpQkFBTyxVQUFQLENBQWtCLENBQXRCLEVBQXdCLEtBQUssSUFBTCxFQUFVLElBQWxDLENBQUgsQ0FEeUI7QUFFekIsT0FBRyxJQUFILEdBQVEsS0FBSyxJQUFMLEdBQVUsR0FBVixHQUFjLEdBQUcsSUFBSCxDQUZHO0FBR3pCLGdCQUFHLEtBQUgsYUFBWSxTQUFaLEVBSHlCO0lBQTFCOzs7O3dCQU1LLEdBQUU7QUFDUCxVQUFPLFNBQVMsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFULENBQVAsQ0FETzs7Ozt3QkFHRixHQUFFO0FBQ1AsVUFBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVAsQ0FETzs7OzswQkFHQSxHQUFFO0FBQ1QsVUFBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVAsQ0FEUzs7Ozt3QkFHSixHQUFFO0FBQ1AsVUFBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVAsQ0FETzs7OztpQ0FHTyxHQUFFO0FBQ2hCLFVBQU8sRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFQLENBRGdCOzs7O1FBaENaO0VBQWMsZ0JBQU0sVUFBTiIsImZpbGUiOiJudW1iZXJpbmdEZWZpbml0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyaW5nRGVmaW5pdGlvbiBleHRlbmRzIFN0eWxle1xuXHRjb25zdHJ1Y3Rvcih3WG1sKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5sZXZlbHM9W11cblxuXHRcdHRoaXMubmFtZT10aGlzLmlkPXRoaXMuY29uc3RydWN0b3IuYXNTdHlsZUlkKHdYbWwuYXR0cigndzphYnN0cmFjdE51bUlkJykpXG5cdFx0dGhpcy53RG9jLnN0eWxlLnNldCh0aGlzKVxuXHRcdHZhciBsaW5rPXdYbWwuJDEoJ251bVN0eWxlTGluaycpXG5cdFx0aWYobGluaylcblx0XHRcdHRoaXMubGluaz1saW5rLmF0dHIoJ3c6dmFsJylcblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLndYbWwuJCgnbHZsJyksbD1jaGlsZHJlbi5sZW5ndGgsIHQ7IGk8bDsgaSsrKXtcblx0XHRcdHRoaXMubGV2ZWxzLnB1c2godD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5MZXZlbChjaGlsZHJlbltpXSx0aGlzLndEb2MsIHRoaXMpKVxuXHRcdFx0dC5wYXJzZSh2aXNpdG9ycylcblx0XHR9XG5cdH1cblx0Z2V0RGVmaW5pdGlvbklkKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5hdHRyKCd3OmFic3RyYWN0TnVtSWQnKVxuXHR9XG5cblx0c3RhdGljIGFzU3R5bGVJZChhYnNOdW1JZCl7XG5cdFx0cmV0dXJuICdfbnVtYmVyaW5nRGVmaW5pdGlvbicrYWJzTnVtSWRcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc3R5bGUubnVtYmVyaW5nLmRlZmluaXRpb24nfVxuXG5cdHN0YXRpYyBnZXQgTGV2ZWwoKXtyZXR1cm4gTGV2ZWx9XG59XG5cbmNsYXNzIExldmVsIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMudHlwZT13WG1sLmF0dHIoJ3c6aWx2bCcpXG5cdH1cblx0cGFyc2UodmlzaXRvcnMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgdCxwcjtcblx0XHRpZih0PXRoaXMud1htbC4kMSgnPnBQcicpKXtcblx0XHRcdHByPW5ldyAocmVxdWlyZSgnLi9wYXJhZ3JhcGgnKS5Qcm9wZXJ0aWVzKSh0LHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0cHIudHlwZT10aGlzLnR5cGUrJyAnK3ByLnR5cGVcblx0XHRcdHByLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR9XG5cblx0XHRpZih0PXRoaXMud1htbC4kMSgnPnJQcicpKXtcblx0XHRcdHByPW5ldyBJbmxpbmUuUHJvcGVydGllcyh0LHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0cHIudHlwZT10aGlzLnR5cGUrJyAnK3ByLnR5cGVcblx0XHRcdHByLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR9XG5cdH1cblx0c3RhcnQoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHRudW1GbSh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0bHZsVGV4dCh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0bHZsSmMoeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGx2bFBpY0J1bGxldElkKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxufVxuIl19