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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJuYW1pbmciLCJPYmplY3QiLCJhc3NpZ24iLCJQcm9wZXJ0aWVzIiwicGdTeiIsInBnTWFyIiwic2VjdGlvbiIsIngiLCJ3aWR0aCIsInB0MlB4IiwiYXNQdCIsImF0dHIiLCJoZWlnaHQiLCJ2YWx1ZSIsImFzT2JqZWN0IiwidiIsImd1dHRlciIsIndEb2MiLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50IiwiJDEiLCJndXR0ZXJBdFJpZ2h0IiwibyIsInBhcnNlSW50Iiwic3BhY2UiLCJkYXRhIiwiQXJyYXkiLCJmcm9tIiwiJCIsIm1hcCIsImEiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBLElBQUlBLFNBQU9DLE9BQU9DLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLGdCQUFNQyxVQUFOLENBQWlCSCxNQUFsQyxFQUF5QztBQUNsREksT0FBSyxNQUQ2QztBQUVsREMsUUFBTTtBQUY0QyxDQUF6QyxDQUFYOztJQUtxQkMsTzs7Ozs7Ozs7Ozs7dUJBR2ZDLEMsRUFBRTtBQUNOLFVBQU8sRUFBQ0MsT0FBTSxLQUFLQyxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBUCxFQUE2Q0MsUUFBTyxLQUFLSCxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBcEQsRUFBUDtBQUNBOzs7d0JBQ0tKLEMsRUFBRTtBQUFBOztBQUNQLE9BQUlNLFFBQU0sS0FBS0MsUUFBTCxDQUFjUCxDQUFkLEVBQWlCO0FBQUEsV0FBRyxPQUFLRSxLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVSyxDQUFWLENBQVgsQ0FBSDtBQUFBLElBQWpCLENBQVY7QUFDQSxPQUFHRixNQUFNRyxNQUFOLElBQWdCLEtBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQixVQUFsQixFQUE4QkMsZUFBOUIsQ0FBOENDLEVBQTlDLENBQWlELGFBQWpELENBQW5CLEVBQ0NQLE1BQU1RLGFBQU4sR0FBb0IsQ0FBcEI7QUFDRCxVQUFPUixLQUFQO0FBQ0E7Ozt1QkFDSU4sQyxFQUFFO0FBQUE7O0FBQ04sT0FBSWUsSUFBRSxLQUFLUixRQUFMLENBQWNQLENBQWQsRUFBaUJnQixRQUFqQixDQUFOO0FBQ0FELEtBQUVFLEtBQUYsS0FBWUYsRUFBRUUsS0FBRixHQUFRLEtBQUtmLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVZLEVBQUVFLEtBQVosQ0FBWCxDQUFwQjs7QUFFQSxPQUFJQyxPQUFLQyxNQUFNQyxJQUFOLENBQVdwQixFQUFFcUIsQ0FBRixDQUFJLEtBQUosQ0FBWCxFQUF1QkMsR0FBdkIsQ0FBMkIsYUFBRztBQUN0QyxXQUFPO0FBQ05yQixZQUFNLE9BQUtDLEtBQUwsQ0FBVyxPQUFLQyxJQUFMLENBQVVvQixFQUFFbkIsSUFBRixDQUFPLEtBQVAsQ0FBVixDQUFYLENBREE7QUFFTmEsWUFBTSxPQUFLZixLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVb0IsRUFBRW5CLElBQUYsQ0FBTyxTQUFQLENBQVYsQ0FBWDtBQUZBLEtBQVA7QUFJQSxJQUxRLENBQVQ7O0FBT0EsT0FBR2MsUUFBUUEsS0FBS00sTUFBaEIsRUFDQ1QsRUFBRUcsSUFBRixHQUFPQSxJQUFQOztBQUVELFVBQU9ILENBQVA7QUFDQTs7O3NCQTFCa0I7QUFBQyxVQUFPdEIsTUFBUDtBQUFjOzs7c0JBMkJqQjtBQUFDLFVBQU8sU0FBUDtBQUFpQjs7OztFQTVCQyxnQkFBTUcsVTs7a0JBQXRCRyxPIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5cbnZhciBuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxTdHlsZS5Qcm9wZXJ0aWVzLm5hbWluZyx7XG5cdFx0cGdTejonc2l6ZScsXG5cdFx0cGdNYXI6J21hcmdpbidcblx0fSlcblx0XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0c3RhdGljIGdldCBuYW1pbmcoKXtyZXR1cm4gbmFtaW5nfVxuXHRcblx0cGdTeih4KXtcblx0XHRyZXR1cm4ge3dpZHRoOnRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cigndzp3JykpKSwgaGVpZ2h0OnRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cigndzpoJykpKX1cblx0fVxuXHRwZ01hcih4KXtcblx0XHR2YXIgdmFsdWU9dGhpcy5hc09iamVjdCh4LCB2PT50aGlzLnB0MlB4KHRoaXMuYXNQdCh2KSkpXG5cdFx0aWYodmFsdWUuZ3V0dGVyICYmIHRoaXMud0RvYy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgnZ3V0dGVyQXRUb3AnKSlcblx0XHRcdHZhbHVlLmd1dHRlckF0UmlnaHQ9MTtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0Y29scyh4KXtcblx0XHR2YXIgbz10aGlzLmFzT2JqZWN0KHgsIHBhcnNlSW50KVxuXHRcdG8uc3BhY2UgJiYgKG8uc3BhY2U9dGhpcy5wdDJQeCh0aGlzLmFzUHQoby5zcGFjZSkpKTtcblx0XHRcblx0XHRsZXQgZGF0YT1BcnJheS5mcm9tKHguJCgnY29sJykpLm1hcChhPT57XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR3aWR0aDp0aGlzLnB0MlB4KHRoaXMuYXNQdChhLmF0dHIoJ3c6dycpKSksXG5cdFx0XHRcdHNwYWNlOnRoaXMucHQyUHgodGhpcy5hc1B0KGEuYXR0cigndzpzcGFjZScpKSlcblx0XHRcdH1cblx0XHR9KVxuXHRcdFxuXHRcdGlmKGRhdGEgJiYgZGF0YS5sZW5ndGgpXG5cdFx0XHRvLmRhdGE9ZGF0YVxuXHRcdFxuXHRcdHJldHVybiBvXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzZWN0aW9uJ31cbn1cbiJdfQ==