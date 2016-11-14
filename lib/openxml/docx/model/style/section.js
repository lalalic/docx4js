'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var naming = Object.assign({}, _style2.default.Properties.naming, {
	pgSz: 'size',
	pgMar: 'margin'
});

var section = function (_Style$Properties) {
	_inherits(section, _Style$Properties);

	function section() {
		_classCallCheck(this, section);

		return _possibleConstructorReturn(this, (section.__proto__ || Object.getPrototypeOf(section)).apply(this, arguments));
	}

	_createClass(section, [{
		key: 'pgSz',
		value: function pgSz(x) {
			return { width: this.pt2Px(this.asPt(x.attr('w:w'))), height: this.pt2Px(this.asPt(x.attr('w:h'))) };
		}
	}, {
		key: 'pgMar',
		value: function pgMar(x) {
			var _this2 = this;

			var value = this.asObject(x, function (v) {
				return _this2.pt2Px(_this2.asPt(v));
			});
			if (value.gutter && this.wDoc.getPart('settings').documentElement.$1('gutterAtTop')) value.gutterAtRight = 1;
			return value;
		}
	}, {
		key: 'cols',
		value: function cols(x) {
			var _this3 = this;

			var o = this.asObject(x, parseInt);
			o.space && (o.space = this.pt2Px(this.asPt(o.space)));

			var data = Array.from(x.$('col')).map(function (a) {
				return {
					width: _this3.pt2Px(_this3.asPt(a.attr('w:w'))),
					space: _this3.pt2Px(_this3.asPt(a.attr('w:space')))
				};
			});

			if (data && data.length) o.data = data;

			return o;
		}
	}], [{
		key: 'naming',
		get: function get() {
			return naming;
		}
	}, {
		key: 'type',
		get: function get() {
			return 'section';
		}
	}]);

	return section;
}(_style2.default.Properties);

exports.default = section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJuYW1pbmciLCJPYmplY3QiLCJhc3NpZ24iLCJQcm9wZXJ0aWVzIiwicGdTeiIsInBnTWFyIiwic2VjdGlvbiIsIngiLCJ3aWR0aCIsInB0MlB4IiwiYXNQdCIsImF0dHIiLCJoZWlnaHQiLCJ2YWx1ZSIsImFzT2JqZWN0IiwidiIsImd1dHRlciIsIndEb2MiLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50IiwiJDEiLCJndXR0ZXJBdFJpZ2h0IiwibyIsInBhcnNlSW50Iiwic3BhY2UiLCJkYXRhIiwiQXJyYXkiLCJmcm9tIiwiJCIsIm1hcCIsImEiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLGdCQUFNQyxVQUFOLENBQWlCSCxNQUFsQyxFQUF5QztBQUNsREksT0FBSyxNQUQ2QztBQUVsREMsUUFBTTtBQUY0QyxDQUF6QyxDQUFYOztJQUtxQkMsTzs7Ozs7Ozs7Ozs7dUJBR2ZDLEMsRUFBRTtBQUNOLFVBQU8sRUFBQ0MsT0FBTSxLQUFLQyxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBUCxFQUE2Q0MsUUFBTyxLQUFLSCxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBcEQsRUFBUDtBQUNBOzs7d0JBQ0tKLEMsRUFBRTtBQUFBOztBQUNQLE9BQUlNLFFBQU0sS0FBS0MsUUFBTCxDQUFjUCxDQUFkLEVBQWlCO0FBQUEsV0FBRyxPQUFLRSxLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVSyxDQUFWLENBQVgsQ0FBSDtBQUFBLElBQWpCLENBQVY7QUFDQSxPQUFHRixNQUFNRyxNQUFOLElBQWdCLEtBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQixVQUFsQixFQUE4QkMsZUFBOUIsQ0FBOENDLEVBQTlDLENBQWlELGFBQWpELENBQW5CLEVBQ0NQLE1BQU1RLGFBQU4sR0FBb0IsQ0FBcEI7QUFDRCxVQUFPUixLQUFQO0FBQ0E7Ozt1QkFDSU4sQyxFQUFFO0FBQUE7O0FBQ04sT0FBSWUsSUFBRSxLQUFLUixRQUFMLENBQWNQLENBQWQsRUFBaUJnQixRQUFqQixDQUFOO0FBQ0FELEtBQUVFLEtBQUYsS0FBWUYsRUFBRUUsS0FBRixHQUFRLEtBQUtmLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVZLEVBQUVFLEtBQVosQ0FBWCxDQUFwQjs7QUFFQSxPQUFJQyxPQUFLQyxNQUFNQyxJQUFOLENBQVdwQixFQUFFcUIsQ0FBRixDQUFJLEtBQUosQ0FBWCxFQUF1QkMsR0FBdkIsQ0FBMkIsYUFBRztBQUN0QyxXQUFPO0FBQ05yQixZQUFNLE9BQUtDLEtBQUwsQ0FBVyxPQUFLQyxJQUFMLENBQVVvQixFQUFFbkIsSUFBRixDQUFPLEtBQVAsQ0FBVixDQUFYLENBREE7QUFFTmEsWUFBTSxPQUFLZixLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVb0IsRUFBRW5CLElBQUYsQ0FBTyxTQUFQLENBQVYsQ0FBWDtBQUZBLEtBQVA7QUFJQSxJQUxRLENBQVQ7O0FBT0EsT0FBR2MsUUFBUUEsS0FBS00sTUFBaEIsRUFDQ1QsRUFBRUcsSUFBRixHQUFPQSxJQUFQOztBQUVELFVBQU9ILENBQVA7QUFDQTs7O3NCQTFCa0I7QUFBQyxVQUFPdEIsTUFBUDtBQUFjOzs7c0JBMkJqQjtBQUFDLFVBQU8sU0FBUDtBQUFpQjs7OztFQTVCQyxnQkFBTUcsVTs7a0JBQXRCRyxPIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXHJcblxyXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sU3R5bGUuUHJvcGVydGllcy5uYW1pbmcse1xyXG5cdFx0cGdTejonc2l6ZScsXHJcblx0XHRwZ01hcjonbWFyZ2luJ1xyXG5cdH0pXHJcblx0XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHNlY3Rpb24gZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xyXG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cclxuXHRcclxuXHRwZ1N6KHgpe1xyXG5cdFx0cmV0dXJuIHt3aWR0aDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKSksIGhlaWdodDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6aCcpKSl9XHJcblx0fVxyXG5cdHBnTWFyKHgpe1xyXG5cdFx0dmFyIHZhbHVlPXRoaXMuYXNPYmplY3QoeCwgdj0+dGhpcy5wdDJQeCh0aGlzLmFzUHQodikpKVxyXG5cdFx0aWYodmFsdWUuZ3V0dGVyICYmIHRoaXMud0RvYy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgnZ3V0dGVyQXRUb3AnKSlcclxuXHRcdFx0dmFsdWUuZ3V0dGVyQXRSaWdodD0xO1xyXG5cdFx0cmV0dXJuIHZhbHVlO1xyXG5cdH1cclxuXHRjb2xzKHgpe1xyXG5cdFx0dmFyIG89dGhpcy5hc09iamVjdCh4LCBwYXJzZUludClcclxuXHRcdG8uc3BhY2UgJiYgKG8uc3BhY2U9dGhpcy5wdDJQeCh0aGlzLmFzUHQoby5zcGFjZSkpKTtcclxuXHRcdFxyXG5cdFx0bGV0IGRhdGE9QXJyYXkuZnJvbSh4LiQoJ2NvbCcpKS5tYXAoYT0+e1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdHdpZHRoOnRoaXMucHQyUHgodGhpcy5hc1B0KGEuYXR0cigndzp3JykpKSxcclxuXHRcdFx0XHRzcGFjZTp0aGlzLnB0MlB4KHRoaXMuYXNQdChhLmF0dHIoJ3c6c3BhY2UnKSkpXHJcblx0XHRcdH1cclxuXHRcdH0pXHJcblx0XHRcclxuXHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpXHJcblx0XHRcdG8uZGF0YT1kYXRhXHJcblx0XHRcclxuXHRcdHJldHVybiBvXHJcblx0fVxyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2VjdGlvbid9XHJcbn1cclxuIl19