'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list = require('./style/list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* numbering style is a normal paragraph style, plus
* numId Style with override/direct level style, 
* which inherit from abstract numbering definition
* rPr, and attribute of level style is on label only
* pPr of level style is on paragraph
list label: numId.level + abstract.level
list content: numId.level.pPr + abstract.level.pPr
priority: list style > p direct style >named style 
*/
var list = function (_require) {
	_inherits(list, _require);

	function list() {
		_classCallCheck(this, list);

		var _this = _possibleConstructorReturn(this, (list.__proto__ || Object.getPrototypeOf(list)).apply(this, arguments));

		var numId = function (t) {
			var numId = (t = _this.wXml.$1('>pPr>numPr')) && (t = t.$1('numId')) && (t = t.attr('w:val'));
			!numId && (t = _this.getNamedStyle()) && (numId = t.getNumId());
			return numId;
		}();

		var level = function (t) {
			return (t = _this.wXml.$1('>pPr>numPr>ilvl')) ? t.attr('w:val') : '0';
		}();

		_this.getLevel = function () {
			return level;
		};

		_this.getNumberingId = function () {
			return numId;
		};
		return _this;
	}

	_createClass(list, [{
		key: 'parse',
		value: function parse() {
			var numbering = this.wDoc.parseContext.numbering;

			numbering.push(this.getNumberingId(), parseInt(this.getLevel()));
			_get(list.prototype.__proto__ || Object.getPrototypeOf(list.prototype), 'parse', this).apply(this, arguments);
		}
	}, {
		key: 'getNumberingStyle',
		value: function getNumberingStyle() {
			return this.wDoc.style.get(_list2.default.asStyleId(this.getNumberingId()));
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			return this.wDoc.parseContext.numbering.getLabel(this.getNumberingId(), parseInt(this.getLevel()));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'list';
		}
	}]);

	return list;
}(require('./paragraph'));

list.Context = function () {
	function _class(doc) {
		_classCallCheck(this, _class);

		this.wDoc = doc;
		this._stack = new Map();
	}

	_createClass(_class, [{
		key: 'push',
		value: function push(id, level) {
			var list = void 0;
			if (!(list = this._stack.get(id))) this._stack.set(id, list = new Map());

			list.set(level, 1 + (list.get(level) || 0));
		}
	}, {
		key: 'getLabel',
		value: function getLabel(id, level) {
			var _wDoc$style$get;

			var ctx = this._stack.get(id);
			return (_wDoc$style$get = this.wDoc.style.get(_list2.default.asStyleId(id))).getLabel.apply(_wDoc$style$get, _toConsumableArray(ctx));
		}
	}]);

	return _class;
}();

exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJsaXN0IiwiYXJndW1lbnRzIiwibnVtSWQiLCJ0Iiwid1htbCIsIiQxIiwiYXR0ciIsImdldE5hbWVkU3R5bGUiLCJnZXROdW1JZCIsImxldmVsIiwiZ2V0TGV2ZWwiLCJnZXROdW1iZXJpbmdJZCIsIm51bWJlcmluZyIsIndEb2MiLCJwYXJzZUNvbnRleHQiLCJwdXNoIiwicGFyc2VJbnQiLCJzdHlsZSIsImdldCIsImFzU3R5bGVJZCIsImdldExhYmVsIiwicmVxdWlyZSIsIkNvbnRleHQiLCJkb2MiLCJfc3RhY2siLCJNYXAiLCJpZCIsInNldCIsImN0eCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBVXFCQSxJOzs7QUFDcEIsaUJBQWE7QUFBQTs7QUFBQSwyR0FDSEMsU0FERzs7QUFHWixNQUFJQyxRQUFPLGFBQUc7QUFDYixPQUFJQSxRQUFNLENBQUNDLElBQUUsTUFBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWEsWUFBYixDQUFILE1BQW1DRixJQUFFQSxFQUFFRSxFQUFGLENBQUssT0FBTCxDQUFyQyxNQUF3REYsSUFBRUEsRUFBRUcsSUFBRixDQUFPLE9BQVAsQ0FBMUQsQ0FBVjtBQUNBLElBQUNKLEtBQUQsS0FBV0MsSUFBRSxNQUFLSSxhQUFMLEVBQWIsTUFBdUNMLFFBQU1DLEVBQUVLLFFBQUYsRUFBN0M7QUFDQSxVQUFPTixLQUFQO0FBQ0EsR0FKUyxFQUFWOztBQU1BLE1BQUlPLFFBQU8sYUFBRztBQUNiLFVBQU8sQ0FBQ04sSUFBRSxNQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxpQkFBYixDQUFILElBQXNDRixFQUFFRyxJQUFGLENBQU8sT0FBUCxDQUF0QyxHQUF3RCxHQUEvRDtBQUNBLEdBRlMsRUFBVjs7QUFJQSxRQUFLSSxRQUFMLEdBQWM7QUFBQSxVQUFJRCxLQUFKO0FBQUEsR0FBZDs7QUFFQSxRQUFLRSxjQUFMLEdBQW9CO0FBQUEsVUFBSVQsS0FBSjtBQUFBLEdBQXBCO0FBZlk7QUFnQlo7Ozs7MEJBQ007QUFBQSxPQUNEVSxTQURDLEdBQ1UsS0FBS0MsSUFBTCxDQUFVQyxZQURwQixDQUNERixTQURDOztBQUVOQSxhQUFVRyxJQUFWLENBQWUsS0FBS0osY0FBTCxFQUFmLEVBQXNDSyxTQUFTLEtBQUtOLFFBQUwsRUFBVCxDQUF0QztBQUNBLHNHQUFlVCxTQUFmO0FBQ0E7OztzQ0FFa0I7QUFDbEIsVUFBTyxLQUFLWSxJQUFMLENBQVVJLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CLGVBQU1DLFNBQU4sQ0FBZ0IsS0FBS1IsY0FBTCxFQUFoQixDQUFwQixDQUFQO0FBQ0E7Ozs2QkFFUztBQUNULFVBQU8sS0FBS0UsSUFBTCxDQUFVQyxZQUFWLENBQXVCRixTQUF2QixDQUFpQ1EsUUFBakMsQ0FBMEMsS0FBS1QsY0FBTCxFQUExQyxFQUFpRUssU0FBUyxLQUFLTixRQUFMLEVBQVQsQ0FBakUsQ0FBUDtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxNQUFQO0FBQWM7Ozs7RUFoQ0NXLFFBQVEsYUFBUixDOztBQUFickIsSSxDQWtDYnNCLE87QUFDTixpQkFBWUMsR0FBWixFQUFnQjtBQUFBOztBQUNmLE9BQUtWLElBQUwsR0FBVVUsR0FBVjtBQUNBLE9BQUtDLE1BQUwsR0FBWSxJQUFJQyxHQUFKLEVBQVo7QUFDQTs7Ozt1QkFDSUMsRSxFQUFHakIsSyxFQUFNO0FBQ2IsT0FBSVQsYUFBSjtBQUNBLE9BQUcsRUFBRUEsT0FBSyxLQUFLd0IsTUFBTCxDQUFZTixHQUFaLENBQWdCUSxFQUFoQixDQUFQLENBQUgsRUFDQyxLQUFLRixNQUFMLENBQVlHLEdBQVosQ0FBZ0JELEVBQWhCLEVBQW1CMUIsT0FBSyxJQUFJeUIsR0FBSixFQUF4Qjs7QUFFRHpCLFFBQUsyQixHQUFMLENBQVNsQixLQUFULEVBQWUsS0FBR1QsS0FBS2tCLEdBQUwsQ0FBU1QsS0FBVCxLQUFpQixDQUFwQixDQUFmO0FBQ0E7OzsyQkFFUWlCLEUsRUFBR2pCLEssRUFBTTtBQUFBOztBQUNqQixPQUFJbUIsTUFBSSxLQUFLSixNQUFMLENBQVlOLEdBQVosQ0FBZ0JRLEVBQWhCLENBQVI7QUFDQSxVQUFPLHdCQUFLYixJQUFMLENBQVVJLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CLGVBQU1DLFNBQU4sQ0FBZ0JPLEVBQWhCLENBQXBCLEdBQXlDTixRQUF6QywyQ0FBcURRLEdBQXJELEVBQVA7QUFDQTs7Ozs7O2tCQWxEa0I1QixJIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvbGlzdFwiXG5cbi8qKlxuKiBudW1iZXJpbmcgc3R5bGUgaXMgYSBub3JtYWwgcGFyYWdyYXBoIHN0eWxlLCBwbHVzXG4qIG51bUlkIFN0eWxlIHdpdGggb3ZlcnJpZGUvZGlyZWN0IGxldmVsIHN0eWxlLCBcbiogd2hpY2ggaW5oZXJpdCBmcm9tIGFic3RyYWN0IG51bWJlcmluZyBkZWZpbml0aW9uXG4qIHJQciwgYW5kIGF0dHJpYnV0ZSBvZiBsZXZlbCBzdHlsZSBpcyBvbiBsYWJlbCBvbmx5XG4qIHBQciBvZiBsZXZlbCBzdHlsZSBpcyBvbiBwYXJhZ3JhcGhcbmxpc3QgbGFiZWw6IG51bUlkLmxldmVsICsgYWJzdHJhY3QubGV2ZWxcbmxpc3QgY29udGVudDogbnVtSWQubGV2ZWwucFByICsgYWJzdHJhY3QubGV2ZWwucFByXG5wcmlvcml0eTogbGlzdCBzdHlsZSA+IHAgZGlyZWN0IHN0eWxlID5uYW1lZCBzdHlsZSBcbiovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsaXN0IGV4dGVuZHMgcmVxdWlyZSgnLi9wYXJhZ3JhcGgnKXtcblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0XG5cdFx0bGV0IG51bUlkPSh0PT57XG5cdFx0XHR2YXIgbnVtSWQ9KHQ9dGhpcy53WG1sLiQxKCc+cFByPm51bVByJykpICYmICh0PXQuJDEoJ251bUlkJykpICYmICh0PXQuYXR0cigndzp2YWwnKSlcblx0XHRcdCFudW1JZCAmJiAodD10aGlzLmdldE5hbWVkU3R5bGUoKSkgJiYgKG51bUlkPXQuZ2V0TnVtSWQoKSlcblx0XHRcdHJldHVybiBudW1JZFxuXHRcdH0pKCk7XG5cdFx0XG5cdFx0bGV0IGxldmVsPSh0PT57XG5cdFx0XHRyZXR1cm4gKHQ9dGhpcy53WG1sLiQxKCc+cFByPm51bVByPmlsdmwnKSkgPyB0LmF0dHIoJ3c6dmFsJykgOiAnMCdcblx0XHR9KSgpO1xuXHRcdFxuXHRcdHRoaXMuZ2V0TGV2ZWw9KCk9PmxldmVsXG5cdFx0XG5cdFx0dGhpcy5nZXROdW1iZXJpbmdJZD0oKT0+bnVtSWRcblx0fVxuXHRwYXJzZSgpe1xuXHRcdGxldCB7bnVtYmVyaW5nfT10aGlzLndEb2MucGFyc2VDb250ZXh0XG5cdFx0bnVtYmVyaW5nLnB1c2godGhpcy5nZXROdW1iZXJpbmdJZCgpLCBwYXJzZUludCh0aGlzLmdldExldmVsKCkpKVxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0fVxuXHRcblx0Z2V0TnVtYmVyaW5nU3R5bGUoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldChTdHlsZS5hc1N0eWxlSWQodGhpcy5nZXROdW1iZXJpbmdJZCgpKSlcblx0fVxuXG5cdGdldExhYmVsKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQubnVtYmVyaW5nLmdldExhYmVsKHRoaXMuZ2V0TnVtYmVyaW5nSWQoKSwgcGFyc2VJbnQodGhpcy5nZXRMZXZlbCgpKSlcblx0fVxuXHRcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdsaXN0J31cblx0XG5cdHN0YXRpYyBDb250ZXh0PWNsYXNzIHtcblx0XHRjb25zdHJ1Y3Rvcihkb2Mpe1xuXHRcdFx0dGhpcy53RG9jPWRvY1xuXHRcdFx0dGhpcy5fc3RhY2s9bmV3IE1hcCgpXG5cdFx0fVxuXHRcdHB1c2goaWQsbGV2ZWwpe1xuXHRcdFx0bGV0IGxpc3Rcblx0XHRcdGlmKCEobGlzdD10aGlzLl9zdGFjay5nZXQoaWQpKSlcblx0XHRcdFx0dGhpcy5fc3RhY2suc2V0KGlkLGxpc3Q9bmV3IE1hcCgpKVxuXHRcdFx0XG5cdFx0XHRsaXN0LnNldChsZXZlbCwxKyhsaXN0LmdldChsZXZlbCl8fDApKVxuXHRcdH1cblx0XHRcblx0XHRnZXRMYWJlbChpZCxsZXZlbCl7XG5cdFx0XHR2YXIgY3R4PXRoaXMuX3N0YWNrLmdldChpZClcblx0XHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KFN0eWxlLmFzU3R5bGVJZChpZCkpLmdldExhYmVsKC4uLmN0eClcblx0XHR9XG5cdH1cbn0iXX0=