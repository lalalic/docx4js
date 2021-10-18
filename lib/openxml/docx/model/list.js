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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvbGlzdC5qcyJdLCJuYW1lcyI6WyJsaXN0IiwiYXJndW1lbnRzIiwibnVtSWQiLCJ0Iiwid1htbCIsIiQxIiwiYXR0ciIsImdldE5hbWVkU3R5bGUiLCJnZXROdW1JZCIsImxldmVsIiwiZ2V0TGV2ZWwiLCJnZXROdW1iZXJpbmdJZCIsIm51bWJlcmluZyIsIndEb2MiLCJwYXJzZUNvbnRleHQiLCJwdXNoIiwicGFyc2VJbnQiLCJzdHlsZSIsImdldCIsIlN0eWxlIiwiYXNTdHlsZUlkIiwiZ2V0TGFiZWwiLCJyZXF1aXJlIiwiQ29udGV4dCIsImRvYyIsIl9zdGFjayIsIk1hcCIsImlkIiwic2V0IiwiY3R4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7SUFVcUJBLEk7OztBQUNwQixpQkFBYTtBQUFBOztBQUFBLDJHQUNIQyxTQURHOztBQUdaLE1BQUlDLFFBQU8sYUFBRztBQUNiLE9BQUlBLFFBQU0sQ0FBQ0MsSUFBRSxNQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxZQUFiLENBQUgsTUFBbUNGLElBQUVBLEVBQUVFLEVBQUYsQ0FBSyxPQUFMLENBQXJDLE1BQXdERixJQUFFQSxFQUFFRyxJQUFGLENBQU8sT0FBUCxDQUExRCxDQUFWO0FBQ0EsSUFBQ0osS0FBRCxLQUFXQyxJQUFFLE1BQUtJLGFBQUwsRUFBYixNQUF1Q0wsUUFBTUMsRUFBRUssUUFBRixFQUE3QztBQUNBLFVBQU9OLEtBQVA7QUFDQSxHQUpTLEVBQVY7O0FBTUEsTUFBSU8sUUFBTyxhQUFHO0FBQ2IsVUFBTyxDQUFDTixJQUFFLE1BQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLGlCQUFiLENBQUgsSUFBc0NGLEVBQUVHLElBQUYsQ0FBTyxPQUFQLENBQXRDLEdBQXdELEdBQS9EO0FBQ0EsR0FGUyxFQUFWOztBQUlBLFFBQUtJLFFBQUwsR0FBYztBQUFBLFVBQUlELEtBQUo7QUFBQSxHQUFkOztBQUVBLFFBQUtFLGNBQUwsR0FBb0I7QUFBQSxVQUFJVCxLQUFKO0FBQUEsR0FBcEI7QUFmWTtBQWdCWjs7OzswQkFDTTtBQUFBLE9BQ0RVLFNBREMsR0FDVSxLQUFLQyxJQUFMLENBQVVDLFlBRHBCLENBQ0RGLFNBREM7O0FBRU5BLGFBQVVHLElBQVYsQ0FBZSxLQUFLSixjQUFMLEVBQWYsRUFBc0NLLFNBQVMsS0FBS04sUUFBTCxFQUFULENBQXRDO0FBQ0Esc0dBQWVULFNBQWY7QUFDQTs7O3NDQUVrQjtBQUNsQixVQUFPLEtBQUtZLElBQUwsQ0FBVUksS0FBVixDQUFnQkMsR0FBaEIsQ0FBb0JDLGVBQU1DLFNBQU4sQ0FBZ0IsS0FBS1QsY0FBTCxFQUFoQixDQUFwQixDQUFQO0FBQ0E7Ozs2QkFFUztBQUNULFVBQU8sS0FBS0UsSUFBTCxDQUFVQyxZQUFWLENBQXVCRixTQUF2QixDQUFpQ1MsUUFBakMsQ0FBMEMsS0FBS1YsY0FBTCxFQUExQyxFQUFpRUssU0FBUyxLQUFLTixRQUFMLEVBQVQsQ0FBakUsQ0FBUDtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxNQUFQO0FBQWM7Ozs7RUFoQ0NZLFFBQVEsYUFBUixDOztBQUFidEIsSSxDQWtDYnVCLE87QUFDTixpQkFBWUMsR0FBWixFQUFnQjtBQUFBOztBQUNmLE9BQUtYLElBQUwsR0FBVVcsR0FBVjtBQUNBLE9BQUtDLE1BQUwsR0FBWSxJQUFJQyxHQUFKLEVBQVo7QUFDQTs7Ozt1QkFDSUMsRSxFQUFHbEIsSyxFQUFNO0FBQ2IsT0FBSVQsYUFBSjtBQUNBLE9BQUcsRUFBRUEsT0FBSyxLQUFLeUIsTUFBTCxDQUFZUCxHQUFaLENBQWdCUyxFQUFoQixDQUFQLENBQUgsRUFDQyxLQUFLRixNQUFMLENBQVlHLEdBQVosQ0FBZ0JELEVBQWhCLEVBQW1CM0IsT0FBSyxJQUFJMEIsR0FBSixFQUF4Qjs7QUFFRDFCLFFBQUs0QixHQUFMLENBQVNuQixLQUFULEVBQWUsS0FBR1QsS0FBS2tCLEdBQUwsQ0FBU1QsS0FBVCxLQUFpQixDQUFwQixDQUFmO0FBQ0E7OzsyQkFFUWtCLEUsRUFBR2xCLEssRUFBTTtBQUFBOztBQUNqQixPQUFJb0IsTUFBSSxLQUFLSixNQUFMLENBQVlQLEdBQVosQ0FBZ0JTLEVBQWhCLENBQVI7QUFDQSxVQUFPLHdCQUFLZCxJQUFMLENBQVVJLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CQyxlQUFNQyxTQUFOLENBQWdCTyxFQUFoQixDQUFwQixHQUF5Q04sUUFBekMsMkNBQXFEUSxHQUFyRCxFQUFQO0FBQ0E7Ozs7OztrQkFsRGtCN0IsSSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gXCIuL3N0eWxlL2xpc3RcIlxuXG4vKipcbiogbnVtYmVyaW5nIHN0eWxlIGlzIGEgbm9ybWFsIHBhcmFncmFwaCBzdHlsZSwgcGx1c1xuKiBudW1JZCBTdHlsZSB3aXRoIG92ZXJyaWRlL2RpcmVjdCBsZXZlbCBzdHlsZSwgXG4qIHdoaWNoIGluaGVyaXQgZnJvbSBhYnN0cmFjdCBudW1iZXJpbmcgZGVmaW5pdGlvblxuKiByUHIsIGFuZCBhdHRyaWJ1dGUgb2YgbGV2ZWwgc3R5bGUgaXMgb24gbGFiZWwgb25seVxuKiBwUHIgb2YgbGV2ZWwgc3R5bGUgaXMgb24gcGFyYWdyYXBoXG5saXN0IGxhYmVsOiBudW1JZC5sZXZlbCArIGFic3RyYWN0LmxldmVsXG5saXN0IGNvbnRlbnQ6IG51bUlkLmxldmVsLnBQciArIGFic3RyYWN0LmxldmVsLnBQclxucHJpb3JpdHk6IGxpc3Qgc3R5bGUgPiBwIGRpcmVjdCBzdHlsZSA+bmFtZWQgc3R5bGUgXG4qL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgbGlzdCBleHRlbmRzIHJlcXVpcmUoJy4vcGFyYWdyYXBoJyl7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdFxuXHRcdGxldCBudW1JZD0odD0+e1xuXHRcdFx0dmFyIG51bUlkPSh0PXRoaXMud1htbC4kMSgnPnBQcj5udW1QcicpKSAmJiAodD10LiQxKCdudW1JZCcpKSAmJiAodD10LmF0dHIoJ3c6dmFsJykpXG5cdFx0XHQhbnVtSWQgJiYgKHQ9dGhpcy5nZXROYW1lZFN0eWxlKCkpICYmIChudW1JZD10LmdldE51bUlkKCkpXG5cdFx0XHRyZXR1cm4gbnVtSWRcblx0XHR9KSgpO1xuXHRcdFxuXHRcdGxldCBsZXZlbD0odD0+e1xuXHRcdFx0cmV0dXJuICh0PXRoaXMud1htbC4kMSgnPnBQcj5udW1Qcj5pbHZsJykpID8gdC5hdHRyKCd3OnZhbCcpIDogJzAnXG5cdFx0fSkoKTtcblx0XHRcblx0XHR0aGlzLmdldExldmVsPSgpPT5sZXZlbFxuXHRcdFxuXHRcdHRoaXMuZ2V0TnVtYmVyaW5nSWQ9KCk9Pm51bUlkXG5cdH1cblx0cGFyc2UoKXtcblx0XHRsZXQge251bWJlcmluZ309dGhpcy53RG9jLnBhcnNlQ29udGV4dFxuXHRcdG51bWJlcmluZy5wdXNoKHRoaXMuZ2V0TnVtYmVyaW5nSWQoKSwgcGFyc2VJbnQodGhpcy5nZXRMZXZlbCgpKSlcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdH1cblx0XG5cdGdldE51bWJlcmluZ1N0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQoU3R5bGUuYXNTdHlsZUlkKHRoaXMuZ2V0TnVtYmVyaW5nSWQoKSkpXG5cdH1cblxuXHRnZXRMYWJlbCgpe1xuXHRcdHJldHVybiB0aGlzLndEb2MucGFyc2VDb250ZXh0Lm51bWJlcmluZy5nZXRMYWJlbCh0aGlzLmdldE51bWJlcmluZ0lkKCksIHBhcnNlSW50KHRoaXMuZ2V0TGV2ZWwoKSkpXG5cdH1cblx0XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnbGlzdCd9XG5cdFxuXHRzdGF0aWMgQ29udGV4dD1jbGFzcyB7XG5cdFx0Y29uc3RydWN0b3IoZG9jKXtcblx0XHRcdHRoaXMud0RvYz1kb2Ncblx0XHRcdHRoaXMuX3N0YWNrPW5ldyBNYXAoKVxuXHRcdH1cblx0XHRwdXNoKGlkLGxldmVsKXtcblx0XHRcdGxldCBsaXN0XG5cdFx0XHRpZighKGxpc3Q9dGhpcy5fc3RhY2suZ2V0KGlkKSkpXG5cdFx0XHRcdHRoaXMuX3N0YWNrLnNldChpZCxsaXN0PW5ldyBNYXAoKSlcblx0XHRcdFxuXHRcdFx0bGlzdC5zZXQobGV2ZWwsMSsobGlzdC5nZXQobGV2ZWwpfHwwKSlcblx0XHR9XG5cdFx0XG5cdFx0Z2V0TGFiZWwoaWQsbGV2ZWwpe1xuXHRcdFx0dmFyIGN0eD10aGlzLl9zdGFjay5nZXQoaWQpXG5cdFx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldChTdHlsZS5hc1N0eWxlSWQoaWQpKS5nZXRMYWJlbCguLi5jdHgpXG5cdFx0fVxuXHR9XG59Il19