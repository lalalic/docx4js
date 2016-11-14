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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJsaXN0IiwiYXJndW1lbnRzIiwibnVtSWQiLCJ0Iiwid1htbCIsIiQxIiwiYXR0ciIsImdldE5hbWVkU3R5bGUiLCJnZXROdW1JZCIsImxldmVsIiwiZ2V0TGV2ZWwiLCJnZXROdW1iZXJpbmdJZCIsIm51bWJlcmluZyIsIndEb2MiLCJwYXJzZUNvbnRleHQiLCJwdXNoIiwicGFyc2VJbnQiLCJzdHlsZSIsImdldCIsImFzU3R5bGVJZCIsImdldExhYmVsIiwicmVxdWlyZSIsIkNvbnRleHQiLCJkb2MiLCJfc3RhY2siLCJNYXAiLCJpZCIsInNldCIsImN0eCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBVXFCQSxJOzs7QUFDcEIsaUJBQWE7QUFBQTs7QUFBQSwyR0FDSEMsU0FERzs7QUFHWixNQUFJQyxRQUFPLGFBQUc7QUFDYixPQUFJQSxRQUFNLENBQUNDLElBQUUsTUFBS0MsSUFBTCxDQUFVQyxFQUFWLENBQWEsWUFBYixDQUFILE1BQW1DRixJQUFFQSxFQUFFRSxFQUFGLENBQUssT0FBTCxDQUFyQyxNQUF3REYsSUFBRUEsRUFBRUcsSUFBRixDQUFPLE9BQVAsQ0FBMUQsQ0FBVjtBQUNBLElBQUNKLEtBQUQsS0FBV0MsSUFBRSxNQUFLSSxhQUFMLEVBQWIsTUFBdUNMLFFBQU1DLEVBQUVLLFFBQUYsRUFBN0M7QUFDQSxVQUFPTixLQUFQO0FBQ0EsR0FKUyxFQUFWOztBQU1BLE1BQUlPLFFBQU8sYUFBRztBQUNiLFVBQU8sQ0FBQ04sSUFBRSxNQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxpQkFBYixDQUFILElBQXNDRixFQUFFRyxJQUFGLENBQU8sT0FBUCxDQUF0QyxHQUF3RCxHQUEvRDtBQUNBLEdBRlMsRUFBVjs7QUFJQSxRQUFLSSxRQUFMLEdBQWM7QUFBQSxVQUFJRCxLQUFKO0FBQUEsR0FBZDs7QUFFQSxRQUFLRSxjQUFMLEdBQW9CO0FBQUEsVUFBSVQsS0FBSjtBQUFBLEdBQXBCO0FBZlk7QUFnQlo7Ozs7MEJBQ007QUFBQSxPQUNEVSxTQURDLEdBQ1UsS0FBS0MsSUFBTCxDQUFVQyxZQURwQixDQUNERixTQURDOztBQUVOQSxhQUFVRyxJQUFWLENBQWUsS0FBS0osY0FBTCxFQUFmLEVBQXNDSyxTQUFTLEtBQUtOLFFBQUwsRUFBVCxDQUF0QztBQUNBLHNHQUFlVCxTQUFmO0FBQ0E7OztzQ0FFa0I7QUFDbEIsVUFBTyxLQUFLWSxJQUFMLENBQVVJLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CLGVBQU1DLFNBQU4sQ0FBZ0IsS0FBS1IsY0FBTCxFQUFoQixDQUFwQixDQUFQO0FBQ0E7Ozs2QkFFUztBQUNULFVBQU8sS0FBS0UsSUFBTCxDQUFVQyxZQUFWLENBQXVCRixTQUF2QixDQUFpQ1EsUUFBakMsQ0FBMEMsS0FBS1QsY0FBTCxFQUExQyxFQUFpRUssU0FBUyxLQUFLTixRQUFMLEVBQVQsQ0FBakUsQ0FBUDtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxNQUFQO0FBQWM7Ozs7RUFoQ0NXLFFBQVEsYUFBUixDOztBQUFickIsSSxDQWtDYnNCLE87QUFDTixpQkFBWUMsR0FBWixFQUFnQjtBQUFBOztBQUNmLE9BQUtWLElBQUwsR0FBVVUsR0FBVjtBQUNBLE9BQUtDLE1BQUwsR0FBWSxJQUFJQyxHQUFKLEVBQVo7QUFDQTs7Ozt1QkFDSUMsRSxFQUFHakIsSyxFQUFNO0FBQ2IsT0FBSVQsYUFBSjtBQUNBLE9BQUcsRUFBRUEsT0FBSyxLQUFLd0IsTUFBTCxDQUFZTixHQUFaLENBQWdCUSxFQUFoQixDQUFQLENBQUgsRUFDQyxLQUFLRixNQUFMLENBQVlHLEdBQVosQ0FBZ0JELEVBQWhCLEVBQW1CMUIsT0FBSyxJQUFJeUIsR0FBSixFQUF4Qjs7QUFFRHpCLFFBQUsyQixHQUFMLENBQVNsQixLQUFULEVBQWUsS0FBR1QsS0FBS2tCLEdBQUwsQ0FBU1QsS0FBVCxLQUFpQixDQUFwQixDQUFmO0FBQ0E7OzsyQkFFUWlCLEUsRUFBR2pCLEssRUFBTTtBQUFBOztBQUNqQixPQUFJbUIsTUFBSSxLQUFLSixNQUFMLENBQVlOLEdBQVosQ0FBZ0JRLEVBQWhCLENBQVI7QUFDQSxVQUFPLHdCQUFLYixJQUFMLENBQVVJLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CLGVBQU1DLFNBQU4sQ0FBZ0JPLEVBQWhCLENBQXBCLEdBQXlDTixRQUF6QywyQ0FBcURRLEdBQXJELEVBQVA7QUFDQTs7Ozs7O2tCQWxEa0I1QixJIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvbGlzdFwiXHJcblxyXG4vKipcclxuKiBudW1iZXJpbmcgc3R5bGUgaXMgYSBub3JtYWwgcGFyYWdyYXBoIHN0eWxlLCBwbHVzXHJcbiogbnVtSWQgU3R5bGUgd2l0aCBvdmVycmlkZS9kaXJlY3QgbGV2ZWwgc3R5bGUsIFxyXG4qIHdoaWNoIGluaGVyaXQgZnJvbSBhYnN0cmFjdCBudW1iZXJpbmcgZGVmaW5pdGlvblxyXG4qIHJQciwgYW5kIGF0dHJpYnV0ZSBvZiBsZXZlbCBzdHlsZSBpcyBvbiBsYWJlbCBvbmx5XHJcbiogcFByIG9mIGxldmVsIHN0eWxlIGlzIG9uIHBhcmFncmFwaFxyXG5saXN0IGxhYmVsOiBudW1JZC5sZXZlbCArIGFic3RyYWN0LmxldmVsXHJcbmxpc3QgY29udGVudDogbnVtSWQubGV2ZWwucFByICsgYWJzdHJhY3QubGV2ZWwucFByXHJcbnByaW9yaXR5OiBsaXN0IHN0eWxlID4gcCBkaXJlY3Qgc3R5bGUgPm5hbWVkIHN0eWxlIFxyXG4qL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBsaXN0IGV4dGVuZHMgcmVxdWlyZSgnLi9wYXJhZ3JhcGgnKXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0XHJcblx0XHRsZXQgbnVtSWQ9KHQ9PntcclxuXHRcdFx0dmFyIG51bUlkPSh0PXRoaXMud1htbC4kMSgnPnBQcj5udW1QcicpKSAmJiAodD10LiQxKCdudW1JZCcpKSAmJiAodD10LmF0dHIoJ3c6dmFsJykpXHJcblx0XHRcdCFudW1JZCAmJiAodD10aGlzLmdldE5hbWVkU3R5bGUoKSkgJiYgKG51bUlkPXQuZ2V0TnVtSWQoKSlcclxuXHRcdFx0cmV0dXJuIG51bUlkXHJcblx0XHR9KSgpO1xyXG5cdFx0XHJcblx0XHRsZXQgbGV2ZWw9KHQ9PntcclxuXHRcdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnPnBQcj5udW1Qcj5pbHZsJykpID8gdC5hdHRyKCd3OnZhbCcpIDogJzAnXHJcblx0XHR9KSgpO1xyXG5cdFx0XHJcblx0XHR0aGlzLmdldExldmVsPSgpPT5sZXZlbFxyXG5cdFx0XHJcblx0XHR0aGlzLmdldE51bWJlcmluZ0lkPSgpPT5udW1JZFxyXG5cdH1cclxuXHRwYXJzZSgpe1xyXG5cdFx0bGV0IHtudW1iZXJpbmd9PXRoaXMud0RvYy5wYXJzZUNvbnRleHRcclxuXHRcdG51bWJlcmluZy5wdXNoKHRoaXMuZ2V0TnVtYmVyaW5nSWQoKSwgcGFyc2VJbnQodGhpcy5nZXRMZXZlbCgpKSlcclxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHR9XHJcblx0XHJcblx0Z2V0TnVtYmVyaW5nU3R5bGUoKXtcclxuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KFN0eWxlLmFzU3R5bGVJZCh0aGlzLmdldE51bWJlcmluZ0lkKCkpKVxyXG5cdH1cclxuXHJcblx0Z2V0TGFiZWwoKXtcclxuXHRcdHJldHVybiB0aGlzLndEb2MucGFyc2VDb250ZXh0Lm51bWJlcmluZy5nZXRMYWJlbCh0aGlzLmdldE51bWJlcmluZ0lkKCksIHBhcnNlSW50KHRoaXMuZ2V0TGV2ZWwoKSkpXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnbGlzdCd9XHJcblx0XHJcblx0c3RhdGljIENvbnRleHQ9Y2xhc3Mge1xyXG5cdFx0Y29uc3RydWN0b3IoZG9jKXtcclxuXHRcdFx0dGhpcy53RG9jPWRvY1xyXG5cdFx0XHR0aGlzLl9zdGFjaz1uZXcgTWFwKClcclxuXHRcdH1cclxuXHRcdHB1c2goaWQsbGV2ZWwpe1xyXG5cdFx0XHRsZXQgbGlzdFxyXG5cdFx0XHRpZighKGxpc3Q9dGhpcy5fc3RhY2suZ2V0KGlkKSkpXHJcblx0XHRcdFx0dGhpcy5fc3RhY2suc2V0KGlkLGxpc3Q9bmV3IE1hcCgpKVxyXG5cdFx0XHRcclxuXHRcdFx0bGlzdC5zZXQobGV2ZWwsMSsobGlzdC5nZXQobGV2ZWwpfHwwKSlcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0Z2V0TGFiZWwoaWQsbGV2ZWwpe1xyXG5cdFx0XHR2YXIgY3R4PXRoaXMuX3N0YWNrLmdldChpZClcclxuXHRcdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQoU3R5bGUuYXNTdHlsZUlkKGlkKSkuZ2V0TGFiZWwoLi4uY3R4KVxyXG5cdFx0fVxyXG5cdH1cclxufSJdfQ==