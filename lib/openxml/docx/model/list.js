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
		key: 'label',
		get: function get() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsSUFDcEIsR0FBYTt3QkFETyxNQUNQOztxRUFETyxrQkFFVixZQURHOztBQUdaLE1BQUksUUFBTSxVQUFDLEdBQUc7QUFDYixPQUFJLFFBQU0sQ0FBQyxJQUFFLE1BQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxZQUFiLENBQUYsQ0FBRCxLQUFtQyxJQUFFLEVBQUUsRUFBRixDQUFLLE9BQUwsQ0FBRixDQUFuQyxLQUF3RCxJQUFFLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBRixDQUF4RCxDQURHO0FBRWIsSUFBQyxLQUFELEtBQVcsSUFBRSxNQUFLLGFBQUwsRUFBRixDQUFYLEtBQXVDLFFBQU0sRUFBRSxRQUFGLEVBQU4sQ0FBdkMsQ0FGYTtBQUdiLFVBQU8sS0FBUCxDQUhhO0dBQUgsRUFBUCxDQUhROztBQVNaLE1BQUksUUFBTSxVQUFDLEdBQUc7QUFDYixVQUFPLENBQUMsSUFBRSxNQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsaUJBQWIsQ0FBRixDQUFELEdBQXNDLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBdEMsR0FBd0QsR0FBeEQsQ0FETTtHQUFILEVBQVAsQ0FUUTs7QUFhWixRQUFLLFFBQUwsR0FBYztVQUFJO0dBQUosQ0FiRjs7QUFlWixRQUFLLGNBQUwsR0FBb0I7VUFBSTtHQUFKLENBZlI7O0VBQWI7O2NBRG9COzswQkFrQmI7T0FDRCxZQUFXLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FBWCxVQURDOztBQUVOLGFBQVUsSUFBVixDQUFlLEtBQUssY0FBTCxFQUFmLEVBQXNDLFNBQVMsS0FBSyxRQUFMLEVBQVQsQ0FBdEMsRUFGTTtBQUdOLDhCQXJCbUIsNENBcUJKLFVBQWYsQ0FITTs7OztzQ0FNWTtBQUNsQixVQUFPLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsZUFBTSxTQUFOLENBQWdCLEtBQUssY0FBTCxFQUFoQixDQUFwQixDQUFQLENBRGtCOzs7O3NCQUlSO0FBQ1YsVUFBTyxLQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLFNBQXZCLENBQWlDLFFBQWpDLENBQTBDLEtBQUssY0FBTCxFQUExQyxFQUFpRSxTQUFTLEtBQUssUUFBTCxFQUFULENBQWpFLENBQVAsQ0FEVTs7OztzQkFJTTtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O1FBaENHO0VBQWEsUUFBUSxhQUFSOztBQUFiLEtBa0NiO0FBQ04saUJBQVksR0FBWixFQUFnQjs7O0FBQ2YsT0FBSyxJQUFMLEdBQVUsR0FBVixDQURlO0FBRWYsT0FBSyxNQUFMLEdBQVksSUFBSSxHQUFKLEVBQVosQ0FGZTtFQUFoQjs7Ozt1QkFJSyxJQUFHLE9BQU07QUFDYixPQUFJLGFBQUosQ0FEYTtBQUViLE9BQUcsRUFBRSxPQUFLLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsRUFBaEIsQ0FBTCxDQUFGLEVBQ0YsS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixFQUFoQixFQUFtQixPQUFLLElBQUksR0FBSixFQUFMLENBQW5CLENBREQ7O0FBR0EsUUFBSyxHQUFMLENBQVMsS0FBVCxFQUFlLEtBQUcsS0FBSyxHQUFMLENBQVMsS0FBVCxLQUFpQixDQUFqQixDQUFILENBQWYsQ0FMYTs7OzsyQkFRTCxJQUFHLE9BQU07OztBQUNqQixPQUFJLE1BQUksS0FBSyxNQUFMLENBQVksR0FBWixDQUFnQixFQUFoQixDQUFKLENBRGE7QUFFakIsVUFBTyx3QkFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixDQUFvQixlQUFNLFNBQU4sQ0FBZ0IsRUFBaEIsQ0FBcEIsR0FBeUMsUUFBekMsMkNBQXFELElBQXJELENBQVAsQ0FGaUI7Ozs7Ozs7a0JBL0NDIiwiZmlsZSI6Imxpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSBcIi4vc3R5bGUvbGlzdFwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGxpc3QgZXh0ZW5kcyByZXF1aXJlKCcuL3BhcmFncmFwaCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRcblx0XHRsZXQgbnVtSWQ9KHQ9Pntcblx0XHRcdHZhciBudW1JZD0odD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHInKSkgJiYgKHQ9dC4kMSgnbnVtSWQnKSkgJiYgKHQ9dC5hdHRyKCd3OnZhbCcpKVxuXHRcdFx0IW51bUlkICYmICh0PXRoaXMuZ2V0TmFtZWRTdHlsZSgpKSAmJiAobnVtSWQ9dC5nZXROdW1JZCgpKVxuXHRcdFx0cmV0dXJuIG51bUlkXG5cdFx0fSkoKTtcblx0XHRcblx0XHRsZXQgbGV2ZWw9KHQ9Pntcblx0XHRcdHJldHVybiAodD10aGlzLndYbWwuJDEoJz5wUHI+bnVtUHI+aWx2bCcpKSA/IHQuYXR0cigndzp2YWwnKSA6ICcwJ1xuXHRcdH0pKCk7XG5cdFx0XG5cdFx0dGhpcy5nZXRMZXZlbD0oKT0+bGV2ZWxcblx0XHRcblx0XHR0aGlzLmdldE51bWJlcmluZ0lkPSgpPT5udW1JZFxuXHR9XG5cdHBhcnNlKCl7XG5cdFx0bGV0IHtudW1iZXJpbmd9PXRoaXMud0RvYy5wYXJzZUNvbnRleHRcblx0XHRudW1iZXJpbmcucHVzaCh0aGlzLmdldE51bWJlcmluZ0lkKCksIHBhcnNlSW50KHRoaXMuZ2V0TGV2ZWwoKSkpXG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHR9XG5cdFxuXHRnZXROdW1iZXJpbmdTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KFN0eWxlLmFzU3R5bGVJZCh0aGlzLmdldE51bWJlcmluZ0lkKCkpKVxuXHR9XG5cblx0Z2V0IGxhYmVsKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5wYXJzZUNvbnRleHQubnVtYmVyaW5nLmdldExhYmVsKHRoaXMuZ2V0TnVtYmVyaW5nSWQoKSwgcGFyc2VJbnQodGhpcy5nZXRMZXZlbCgpKSlcblx0fVxuXHRcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdsaXN0J31cblx0XG5cdHN0YXRpYyBDb250ZXh0PWNsYXNzIHtcblx0XHRjb25zdHJ1Y3Rvcihkb2Mpe1xuXHRcdFx0dGhpcy53RG9jPWRvY1xuXHRcdFx0dGhpcy5fc3RhY2s9bmV3IE1hcCgpXG5cdFx0fVxuXHRcdHB1c2goaWQsbGV2ZWwpe1xuXHRcdFx0bGV0IGxpc3Rcblx0XHRcdGlmKCEobGlzdD10aGlzLl9zdGFjay5nZXQoaWQpKSlcblx0XHRcdFx0dGhpcy5fc3RhY2suc2V0KGlkLGxpc3Q9bmV3IE1hcCgpKVxuXHRcdFx0XG5cdFx0XHRsaXN0LnNldChsZXZlbCwxKyhsaXN0LmdldChsZXZlbCl8fDApKVxuXHRcdH1cblx0XHRcblx0XHRnZXRMYWJlbChpZCxsZXZlbCl7XG5cdFx0XHR2YXIgY3R4PXRoaXMuX3N0YWNrLmdldChpZClcblx0XHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KFN0eWxlLmFzU3R5bGVJZChpZCkpLmdldExhYmVsKC4uLmN0eClcblx0XHR9XG5cdH1cbn0iXX0=