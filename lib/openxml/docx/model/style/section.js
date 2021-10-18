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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJuYW1pbmciLCJPYmplY3QiLCJhc3NpZ24iLCJTdHlsZSIsIlByb3BlcnRpZXMiLCJwZ1N6IiwicGdNYXIiLCJzZWN0aW9uIiwieCIsIndpZHRoIiwicHQyUHgiLCJhc1B0IiwiYXR0ciIsImhlaWdodCIsInZhbHVlIiwiYXNPYmplY3QiLCJ2IiwiZ3V0dGVyIiwid0RvYyIsImdldFBhcnQiLCJkb2N1bWVudEVsZW1lbnQiLCIkMSIsImd1dHRlckF0UmlnaHQiLCJvIiwicGFyc2VJbnQiLCJzcGFjZSIsImRhdGEiLCJBcnJheSIsImZyb20iLCIkIiwibWFwIiwiYSIsImxlbmd0aCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBSUEsU0FBT0MsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJDLGdCQUFNQyxVQUFOLENBQWlCSixNQUFsQyxFQUF5QztBQUNsREssT0FBSyxNQUQ2QztBQUVsREMsUUFBTTtBQUY0QyxDQUF6QyxDQUFYOztJQUtxQkMsTzs7Ozs7Ozs7Ozs7dUJBR2ZDLEMsRUFBRTtBQUNOLFVBQU8sRUFBQ0MsT0FBTSxLQUFLQyxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBUCxFQUE2Q0MsUUFBTyxLQUFLSCxLQUFMLENBQVcsS0FBS0MsSUFBTCxDQUFVSCxFQUFFSSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBcEQsRUFBUDtBQUNBOzs7d0JBQ0tKLEMsRUFBRTtBQUFBOztBQUNQLE9BQUlNLFFBQU0sS0FBS0MsUUFBTCxDQUFjUCxDQUFkLEVBQWlCO0FBQUEsV0FBRyxPQUFLRSxLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVSyxDQUFWLENBQVgsQ0FBSDtBQUFBLElBQWpCLENBQVY7QUFDQSxPQUFHRixNQUFNRyxNQUFOLElBQWdCLEtBQUtDLElBQUwsQ0FBVUMsT0FBVixDQUFrQixVQUFsQixFQUE4QkMsZUFBOUIsQ0FBOENDLEVBQTlDLENBQWlELGFBQWpELENBQW5CLEVBQ0NQLE1BQU1RLGFBQU4sR0FBb0IsQ0FBcEI7QUFDRCxVQUFPUixLQUFQO0FBQ0E7Ozt1QkFDSU4sQyxFQUFFO0FBQUE7O0FBQ04sT0FBSWUsSUFBRSxLQUFLUixRQUFMLENBQWNQLENBQWQsRUFBaUJnQixRQUFqQixDQUFOO0FBQ0FELEtBQUVFLEtBQUYsS0FBWUYsRUFBRUUsS0FBRixHQUFRLEtBQUtmLEtBQUwsQ0FBVyxLQUFLQyxJQUFMLENBQVVZLEVBQUVFLEtBQVosQ0FBWCxDQUFwQjs7QUFFQSxPQUFJQyxPQUFLQyxNQUFNQyxJQUFOLENBQVdwQixFQUFFcUIsQ0FBRixDQUFJLEtBQUosQ0FBWCxFQUF1QkMsR0FBdkIsQ0FBMkIsYUFBRztBQUN0QyxXQUFPO0FBQ05yQixZQUFNLE9BQUtDLEtBQUwsQ0FBVyxPQUFLQyxJQUFMLENBQVVvQixFQUFFbkIsSUFBRixDQUFPLEtBQVAsQ0FBVixDQUFYLENBREE7QUFFTmEsWUFBTSxPQUFLZixLQUFMLENBQVcsT0FBS0MsSUFBTCxDQUFVb0IsRUFBRW5CLElBQUYsQ0FBTyxTQUFQLENBQVYsQ0FBWDtBQUZBLEtBQVA7QUFJQSxJQUxRLENBQVQ7O0FBT0EsT0FBR2MsUUFBUUEsS0FBS00sTUFBaEIsRUFDQ1QsRUFBRUcsSUFBRixHQUFPQSxJQUFQOztBQUVELFVBQU9ILENBQVA7QUFDQTs7O3NCQTFCa0I7QUFBQyxVQUFPdkIsTUFBUDtBQUFjOzs7c0JBMkJqQjtBQUFDLFVBQU8sU0FBUDtBQUFpQjs7OztFQTVCQ0csZ0JBQU1DLFU7O2tCQUF0QkcsTyIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sU3R5bGUuUHJvcGVydGllcy5uYW1pbmcse1xuXHRcdHBnU3o6J3NpemUnLFxuXHRcdHBnTWFyOidtYXJnaW4nXG5cdH0pXG5cdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VjdGlvbiBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cblx0XG5cdHBnU3ooeCl7XG5cdFx0cmV0dXJuIHt3aWR0aDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKSksIGhlaWdodDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6aCcpKSl9XG5cdH1cblx0cGdNYXIoeCl7XG5cdFx0dmFyIHZhbHVlPXRoaXMuYXNPYmplY3QoeCwgdj0+dGhpcy5wdDJQeCh0aGlzLmFzUHQodikpKVxuXHRcdGlmKHZhbHVlLmd1dHRlciAmJiB0aGlzLndEb2MuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2d1dHRlckF0VG9wJykpXG5cdFx0XHR2YWx1ZS5ndXR0ZXJBdFJpZ2h0PTE7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdGNvbHMoeCl7XG5cdFx0dmFyIG89dGhpcy5hc09iamVjdCh4LCBwYXJzZUludClcblx0XHRvLnNwYWNlICYmIChvLnNwYWNlPXRoaXMucHQyUHgodGhpcy5hc1B0KG8uc3BhY2UpKSk7XG5cdFx0XG5cdFx0bGV0IGRhdGE9QXJyYXkuZnJvbSh4LiQoJ2NvbCcpKS5tYXAoYT0+e1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0d2lkdGg6dGhpcy5wdDJQeCh0aGlzLmFzUHQoYS5hdHRyKCd3OncnKSkpLFxuXHRcdFx0XHRzcGFjZTp0aGlzLnB0MlB4KHRoaXMuYXNQdChhLmF0dHIoJ3c6c3BhY2UnKSkpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRcblx0XHRpZihkYXRhICYmIGRhdGEubGVuZ3RoKVxuXHRcdFx0by5kYXRhPWRhdGFcblx0XHRcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2VjdGlvbid9XG59XG4iXX0=