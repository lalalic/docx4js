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
			return { width: parseInt(x.attr('w:w')) / 20, height: parseInt(x.attr('w:h') / 20) };
		}
	}, {
		key: 'pgMar',
		value: function pgMar(x) {
			var value = this.asObject(x, function (v) {
				return parseFloat(v) / 20;
			});
			if (value.gutter && this.wDoc.getPart('settings').documentElement.$1('gutterAtTop')) value.gutterAtRight = 1;
			return value;
		}
	}, {
		key: 'cols',
		value: function cols(x) {
			var o = this.asObject(x, parseInt);
			o.space && (o.space = o.space / 20.0);
			var data = Array.from(x.$('col')).map(function (a) {
				return {
					width: parseInt(a.attr('w:w')) / 20,
					space: parseInt(a.attr('w:space')) / 20
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixnQkFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXdCO0FBQ2xELE9BQUssTUFBTDtBQUNBLFFBQU0sUUFBTjtDQUZTLENBQVA7O0lBS2lCOzs7Ozs7Ozs7Ozt1QkFHZixHQUFFO0FBQ04sVUFBTyxFQUFDLE9BQU0sU0FBUyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVQsSUFBd0IsRUFBeEIsRUFBNEIsUUFBTyxTQUFTLEVBQUUsSUFBRixDQUFPLEtBQVAsSUFBYyxFQUFkLENBQWhCLEVBQTFDLENBRE07Ozs7d0JBR0QsR0FBRTtBQUNQLE9BQUksUUFBTSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxXQUFXLENBQVgsSUFBYyxFQUFkLENBQVI7SUFBWCxDQUF2QixDQURHO0FBRVAsT0FBRyxNQUFNLE1BQU4sSUFBZ0IsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFsQixFQUE4QixlQUE5QixDQUE4QyxFQUE5QyxDQUFpRCxhQUFqRCxDQUFoQixFQUNGLE1BQU0sYUFBTixHQUFvQixDQUFwQixDQUREO0FBRUEsVUFBTyxLQUFQLENBSk87Ozs7dUJBTUgsR0FBRTtBQUNOLE9BQUksSUFBRSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLENBQUYsQ0FERTtBQUVOLEtBQUUsS0FBRixLQUFZLEVBQUUsS0FBRixHQUFRLEVBQUUsS0FBRixHQUFRLElBQVIsQ0FBcEIsQ0FGTTtBQUdOLE9BQUksT0FBSyxNQUFNLElBQU4sQ0FBVyxFQUFFLENBQUYsQ0FBSSxLQUFKLENBQVgsRUFBdUIsR0FBdkIsQ0FBMkIsYUFBRztBQUN0QyxXQUFPO0FBQ04sWUFBTSxTQUFTLEVBQUUsSUFBRixDQUFPLEtBQVAsQ0FBVCxJQUF3QixFQUF4QjtBQUNOLFlBQU0sU0FBUyxFQUFFLElBQUYsQ0FBTyxTQUFQLENBQVQsSUFBNEIsRUFBNUI7S0FGUCxDQURzQztJQUFILENBQWhDLENBSEU7O0FBVU4sT0FBRyxRQUFRLEtBQUssTUFBTCxFQUNWLEVBQUUsSUFBRixHQUFPLElBQVAsQ0FERDs7QUFHQSxVQUFPLENBQVAsQ0FiTTs7OztzQkFYWTtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O3NCQTBCRjtBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBM0JHO0VBQWdCLGdCQUFNLFVBQU47O2tCQUFoQiIsImZpbGUiOiJzZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4uL3N0eWxlJ1xuXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sU3R5bGUuUHJvcGVydGllcy5uYW1pbmcse1xuXHRcdHBnU3o6J3NpemUnLFxuXHRcdHBnTWFyOidtYXJnaW4nXG5cdH0pXG5cdFxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VjdGlvbiBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cblx0XG5cdHBnU3ooeCl7XG5cdFx0cmV0dXJuIHt3aWR0aDpwYXJzZUludCh4LmF0dHIoJ3c6dycpKS8yMCwgaGVpZ2h0OnBhcnNlSW50KHguYXR0cigndzpoJykvMjApfVxuXHR9XG5cdHBnTWFyKHgpe1xuXHRcdHZhciB2YWx1ZT10aGlzLmFzT2JqZWN0KHgsIGZ1bmN0aW9uKHYpe3JldHVybiBwYXJzZUZsb2F0KHYpLzIwfSlcblx0XHRpZih2YWx1ZS5ndXR0ZXIgJiYgdGhpcy53RG9jLmdldFBhcnQoJ3NldHRpbmdzJykuZG9jdW1lbnRFbGVtZW50LiQxKCdndXR0ZXJBdFRvcCcpKVxuXHRcdFx0dmFsdWUuZ3V0dGVyQXRSaWdodD0xO1xuXHRcdHJldHVybiB2YWx1ZTtcblx0fVxuXHRjb2xzKHgpe1xuXHRcdHZhciBvPXRoaXMuYXNPYmplY3QoeCwgcGFyc2VJbnQpXG5cdFx0by5zcGFjZSAmJiAoby5zcGFjZT1vLnNwYWNlLzIwLjApXG5cdFx0bGV0IGRhdGE9QXJyYXkuZnJvbSh4LiQoJ2NvbCcpKS5tYXAoYT0+e1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0d2lkdGg6cGFyc2VJbnQoYS5hdHRyKCd3OncnKSkvMjAsXG5cdFx0XHRcdHNwYWNlOnBhcnNlSW50KGEuYXR0cigndzpzcGFjZScpKS8yMFxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0XG5cdFx0aWYoZGF0YSAmJiBkYXRhLmxlbmd0aClcblx0XHRcdG8uZGF0YT1kYXRhXG5cdFx0XG5cdFx0cmV0dXJuIG9cblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3NlY3Rpb24nfVxufVxuIl19