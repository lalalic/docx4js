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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(section).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixnQkFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXdCO0FBQ2xELE9BQUssTUFBTDtBQUNBLFFBQU0sUUFBTjtDQUZTLENBQVA7O0lBS2lCOzs7Ozs7Ozs7Ozt1QkFHZixHQUFFO0FBQ04sVUFBTyxFQUFDLE9BQU0sS0FBSyxLQUFMLENBQVcsS0FBSyxJQUFMLENBQVUsRUFBRSxJQUFGLENBQU8sS0FBUCxDQUFWLENBQVgsQ0FBTixFQUE0QyxRQUFPLEtBQUssS0FBTCxDQUFXLEtBQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBVixDQUFYLENBQVAsRUFBcEQsQ0FETTs7Ozt3QkFHRCxHQUFFOzs7QUFDUCxPQUFJLFFBQU0sS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQjtXQUFHLE9BQUssS0FBTCxDQUFXLE9BQUssSUFBTCxDQUFVLENBQVYsQ0FBWDtJQUFILENBQXZCLENBREc7QUFFUCxPQUFHLE1BQU0sTUFBTixJQUFnQixLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFVBQWxCLEVBQThCLGVBQTlCLENBQThDLEVBQTlDLENBQWlELGFBQWpELENBQWhCLEVBQ0YsTUFBTSxhQUFOLEdBQW9CLENBQXBCLENBREQ7QUFFQSxVQUFPLEtBQVAsQ0FKTzs7Ozt1QkFNSCxHQUFFOzs7QUFDTixPQUFJLElBQUUsS0FBSyxRQUFMLENBQWMsQ0FBZCxFQUFpQixRQUFqQixDQUFGLENBREU7QUFFTixLQUFFLEtBQUYsS0FBWSxFQUFFLEtBQUYsR0FBUSxLQUFLLEtBQUwsQ0FBVyxLQUFLLElBQUwsQ0FBVSxFQUFFLEtBQUYsQ0FBckIsQ0FBUixDQUFaLENBRk07O0FBSU4sT0FBSSxPQUFLLE1BQU0sSUFBTixDQUFXLEVBQUUsQ0FBRixDQUFJLEtBQUosQ0FBWCxFQUF1QixHQUF2QixDQUEyQixhQUFHO0FBQ3RDLFdBQU87QUFDTixZQUFNLE9BQUssS0FBTCxDQUFXLE9BQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBVixDQUFYLENBQU47QUFDQSxZQUFNLE9BQUssS0FBTCxDQUFXLE9BQUssSUFBTCxDQUFVLEVBQUUsSUFBRixDQUFPLFNBQVAsQ0FBVixDQUFYLENBQU47S0FGRCxDQURzQztJQUFILENBQWhDLENBSkU7O0FBV04sT0FBRyxRQUFRLEtBQUssTUFBTCxFQUNWLEVBQUUsSUFBRixHQUFPLElBQVAsQ0FERDs7QUFHQSxVQUFPLENBQVAsQ0FkTTs7OztzQkFYWTtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O3NCQTJCRjtBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBNUJHO0VBQWdCLGdCQUFNLFVBQU47O2tCQUFoQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sU3R5bGUuUHJvcGVydGllcy5uYW1pbmcse1xuXHRcdHBnU3o6J3NpemUnLFxuXHRcdHBnTWFyOidtYXJnaW4nXG5cdH0pXG5cdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VjdGlvbiBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cblx0XG5cdHBnU3ooeCl7XG5cdFx0cmV0dXJuIHt3aWR0aDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKSksIGhlaWdodDp0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6aCcpKSl9XG5cdH1cblx0cGdNYXIoeCl7XG5cdFx0dmFyIHZhbHVlPXRoaXMuYXNPYmplY3QoeCwgdj0+dGhpcy5wdDJQeCh0aGlzLmFzUHQodikpKVxuXHRcdGlmKHZhbHVlLmd1dHRlciAmJiB0aGlzLndEb2MuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2d1dHRlckF0VG9wJykpXG5cdFx0XHR2YWx1ZS5ndXR0ZXJBdFJpZ2h0PTE7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdGNvbHMoeCl7XG5cdFx0dmFyIG89dGhpcy5hc09iamVjdCh4LCBwYXJzZUludClcblx0XHRvLnNwYWNlICYmIChvLnNwYWNlPXRoaXMucHQyUHgodGhpcy5hc1B0KG8uc3BhY2UpKSk7XG5cdFx0XG5cdFx0bGV0IGRhdGE9QXJyYXkuZnJvbSh4LiQoJ2NvbCcpKS5tYXAoYT0+e1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0d2lkdGg6dGhpcy5wdDJQeCh0aGlzLmFzUHQoYS5hdHRyKCd3OncnKSkpLFxuXHRcdFx0XHRzcGFjZTp0aGlzLnB0MlB4KHRoaXMuYXNQdChhLmF0dHIoJ3c6c3BhY2UnKSkpXG5cdFx0XHR9XG5cdFx0fSlcblx0XHRcblx0XHRpZihkYXRhICYmIGRhdGEubGVuZ3RoKVxuXHRcdFx0by5kYXRhPWRhdGFcblx0XHRcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2VjdGlvbid9XG59XG4iXX0=