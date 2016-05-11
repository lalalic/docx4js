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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(list).apply(this, arguments));

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
			_get(Object.getPrototypeOf(list.prototype), 'parse', this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFZcUI7OztBQUNwQixVQURvQixJQUNwQixHQUFhO3dCQURPLE1BQ1A7O3FFQURPLGtCQUVWLFlBREc7O0FBR1osTUFBSSxRQUFNLFVBQUMsR0FBRztBQUNiLE9BQUksUUFBTSxDQUFDLElBQUUsTUFBSyxJQUFMLENBQVUsRUFBVixDQUFhLFlBQWIsQ0FBRixDQUFELEtBQW1DLElBQUUsRUFBRSxFQUFGLENBQUssT0FBTCxDQUFGLENBQW5DLEtBQXdELElBQUUsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUFGLENBQXhELENBREc7QUFFYixJQUFDLEtBQUQsS0FBVyxJQUFFLE1BQUssYUFBTCxFQUFGLENBQVgsS0FBdUMsUUFBTSxFQUFFLFFBQUYsRUFBTixDQUF2QyxDQUZhO0FBR2IsVUFBTyxLQUFQLENBSGE7R0FBSCxFQUFQLENBSFE7O0FBU1osTUFBSSxRQUFNLFVBQUMsR0FBRztBQUNiLFVBQU8sQ0FBQyxJQUFFLE1BQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxpQkFBYixDQUFGLENBQUQsR0FBc0MsRUFBRSxJQUFGLENBQU8sT0FBUCxDQUF0QyxHQUF3RCxHQUF4RCxDQURNO0dBQUgsRUFBUCxDQVRROztBQWFaLFFBQUssUUFBTCxHQUFjO1VBQUk7R0FBSixDQWJGOztBQWVaLFFBQUssY0FBTCxHQUFvQjtVQUFJO0dBQUosQ0FmUjs7RUFBYjs7Y0FEb0I7OzBCQWtCYjtPQUNELFlBQVcsS0FBSyxJQUFMLENBQVUsWUFBVixDQUFYLFVBREM7O0FBRU4sYUFBVSxJQUFWLENBQWUsS0FBSyxjQUFMLEVBQWYsRUFBc0MsU0FBUyxLQUFLLFFBQUwsRUFBVCxDQUF0QyxFQUZNO0FBR04sOEJBckJtQiw0Q0FxQkosVUFBZixDQUhNOzs7O3NDQU1ZO0FBQ2xCLFVBQU8sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixDQUFvQixlQUFNLFNBQU4sQ0FBZ0IsS0FBSyxjQUFMLEVBQWhCLENBQXBCLENBQVAsQ0FEa0I7Ozs7NkJBSVQ7QUFDVCxVQUFPLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FBdUIsU0FBdkIsQ0FBaUMsUUFBakMsQ0FBMEMsS0FBSyxjQUFMLEVBQTFDLEVBQWlFLFNBQVMsS0FBSyxRQUFMLEVBQVQsQ0FBakUsQ0FBUCxDQURTOzs7O3NCQUlPO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFoQ0c7RUFBYSxRQUFRLGFBQVI7O0FBQWIsS0FrQ2I7QUFDTixpQkFBWSxHQUFaLEVBQWdCOzs7QUFDZixPQUFLLElBQUwsR0FBVSxHQUFWLENBRGU7QUFFZixPQUFLLE1BQUwsR0FBWSxJQUFJLEdBQUosRUFBWixDQUZlO0VBQWhCOzs7O3VCQUlLLElBQUcsT0FBTTtBQUNiLE9BQUksYUFBSixDQURhO0FBRWIsT0FBRyxFQUFFLE9BQUssS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixFQUFoQixDQUFMLENBQUYsRUFDRixLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLEVBQWhCLEVBQW1CLE9BQUssSUFBSSxHQUFKLEVBQUwsQ0FBbkIsQ0FERDs7QUFHQSxRQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWUsS0FBRyxLQUFLLEdBQUwsQ0FBUyxLQUFULEtBQWlCLENBQWpCLENBQUgsQ0FBZixDQUxhOzs7OzJCQVFMLElBQUcsT0FBTTs7O0FBQ2pCLE9BQUksTUFBSSxLQUFLLE1BQUwsQ0FBWSxHQUFaLENBQWdCLEVBQWhCLENBQUosQ0FEYTtBQUVqQixVQUFPLHdCQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLGVBQU0sU0FBTixDQUFnQixFQUFoQixDQUFwQixHQUF5QyxRQUF6QywyQ0FBcUQsSUFBckQsQ0FBUCxDQUZpQjs7Ozs7OztrQkEvQ0MiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZS9saXN0XCJcblxuLyoqXG4qIG51bWJlcmluZyBzdHlsZSBpcyBhIG5vcm1hbCBwYXJhZ3JhcGggc3R5bGUsIHBsdXNcbiogbnVtSWQgU3R5bGUgd2l0aCBvdmVycmlkZS9kaXJlY3QgbGV2ZWwgc3R5bGUsIFxuKiB3aGljaCBpbmhlcml0IGZyb20gYWJzdHJhY3QgbnVtYmVyaW5nIGRlZmluaXRpb25cbiogclByLCBhbmQgYXR0cmlidXRlIG9mIGxldmVsIHN0eWxlIGlzIG9uIGxhYmVsIG9ubHlcbiogcFByIG9mIGxldmVsIHN0eWxlIGlzIG9uIHBhcmFncmFwaFxubGlzdCBsYWJlbDogbnVtSWQubGV2ZWwgKyBhYnN0cmFjdC5sZXZlbFxubGlzdCBjb250ZW50OiBudW1JZC5sZXZlbC5wUHIgKyBhYnN0cmFjdC5sZXZlbC5wUHJcbnByaW9yaXR5OiBsaXN0IHN0eWxlID4gcCBkaXJlY3Qgc3R5bGUgPm5hbWVkIHN0eWxlIFxuKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyByZXF1aXJlKCcuL3BhcmFncmFwaCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRcblx0XHRsZXQgbnVtSWQ9KHQ9Pntcblx0XHRcdHZhciBudW1JZD0odD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHInKSkgJiYgKHQ9dC4kMSgnbnVtSWQnKSkgJiYgKHQ9dC5hdHRyKCd3OnZhbCcpKVxuXHRcdFx0IW51bUlkICYmICh0PXRoaXMuZ2V0TmFtZWRTdHlsZSgpKSAmJiAobnVtSWQ9dC5nZXROdW1JZCgpKVxuXHRcdFx0cmV0dXJuIG51bUlkXG5cdFx0fSkoKTtcblx0XHRcblx0XHRsZXQgbGV2ZWw9KHQ9Pntcblx0XHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHI+aWx2bCcpKSA/IHQuYXR0cigndzp2YWwnKSA6ICcwJ1xuXHRcdH0pKCk7XG5cdFx0XG5cdFx0dGhpcy5nZXRMZXZlbD0oKT0+bGV2ZWxcblx0XHRcblx0XHR0aGlzLmdldE51bWJlcmluZ0lkPSgpPT5udW1JZFxuXHR9XG5cdHBhcnNlKCl7XG5cdFx0bGV0IHtudW1iZXJpbmd9PXRoaXMud0RvYy5wYXJzZUNvbnRleHRcblx0XHRudW1iZXJpbmcucHVzaCh0aGlzLmdldE51bWJlcmluZ0lkKCksIHBhcnNlSW50KHRoaXMuZ2V0TGV2ZWwoKSkpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHR9XG5cdFxuXHRnZXROdW1iZXJpbmdTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KFN0eWxlLmFzU3R5bGVJZCh0aGlzLmdldE51bWJlcmluZ0lkKCkpKVxuXHR9XG5cblx0Z2V0TGFiZWwoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnBhcnNlQ29udGV4dC5udW1iZXJpbmcuZ2V0TGFiZWwodGhpcy5nZXROdW1iZXJpbmdJZCgpLCBwYXJzZUludCh0aGlzLmdldExldmVsKCkpKVxuXHR9XG5cdFxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2xpc3QnfVxuXHRcblx0c3RhdGljIENvbnRleHQ9Y2xhc3Mge1xuXHRcdGNvbnN0cnVjdG9yKGRvYyl7XG5cdFx0XHR0aGlzLndEb2M9ZG9jXG5cdFx0XHR0aGlzLl9zdGFjaz1uZXcgTWFwKClcblx0XHR9XG5cdFx0cHVzaChpZCxsZXZlbCl7XG5cdFx0XHRsZXQgbGlzdFxuXHRcdFx0aWYoIShsaXN0PXRoaXMuX3N0YWNrLmdldChpZCkpKVxuXHRcdFx0XHR0aGlzLl9zdGFjay5zZXQoaWQsbGlzdD1uZXcgTWFwKCkpXG5cdFx0XHRcblx0XHRcdGxpc3Quc2V0KGxldmVsLDErKGxpc3QuZ2V0KGxldmVsKXx8MCkpXG5cdFx0fVxuXHRcdFxuXHRcdGdldExhYmVsKGlkLGxldmVsKXtcblx0XHRcdHZhciBjdHg9dGhpcy5fc3RhY2suZ2V0KGlkKVxuXHRcdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQoU3R5bGUuYXNTdHlsZUlkKGlkKSkuZ2V0TGFiZWwoLi4uY3R4KVxuXHRcdH1cblx0fVxufSJdfQ==