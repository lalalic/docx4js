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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixnQkFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXdCO0FBQ2xELE9BQUssTUFBTDtBQUNBLFFBQU0sUUFBTjtDQUZTLENBQVA7O0lBS2lCOzs7Ozs7Ozs7Ozt1QkFHZixHQUFFO0FBQ04sVUFBTyxFQUFDLE9BQU0sU0FBUyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVQsSUFBd0IsRUFBeEIsRUFBNEIsUUFBTyxTQUFTLEVBQUUsSUFBRixDQUFPLEtBQVAsSUFBYyxFQUFkLENBQWhCLEVBQTFDLENBRE07Ozs7d0JBR0QsR0FBRTtBQUNQLE9BQUksUUFBTSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxXQUFXLENBQVgsSUFBYyxFQUFkLENBQVI7SUFBWCxDQUF2QixDQURHO0FBRVAsT0FBRyxNQUFNLE1BQU4sSUFBZ0IsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFsQixFQUE4QixlQUE5QixDQUE4QyxFQUE5QyxDQUFpRCxhQUFqRCxDQUFoQixFQUNGLE1BQU0sYUFBTixHQUFvQixDQUFwQixDQUREO0FBRUEsVUFBTyxLQUFQLENBSk87Ozs7dUJBTUgsR0FBRTtBQUNOLE9BQUksSUFBRSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLENBQUYsQ0FERTtBQUVOLEtBQUUsS0FBRixLQUFZLEVBQUUsS0FBRixHQUFRLEVBQUUsS0FBRixHQUFRLElBQVIsQ0FBcEIsQ0FGTTtBQUdOLFVBQU8sQ0FBUCxDQUhNOzs7O3NCQVhZO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7c0JBZ0JGO0FBQUMsVUFBTyxTQUFQLENBQUQ7Ozs7UUFqQkc7RUFBZ0IsZ0JBQU0sVUFBTjs7a0JBQWhCIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5cbnZhciBuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxTdHlsZS5Qcm9wZXJ0aWVzLm5hbWluZyx7XG5cdFx0cGdTejonc2l6ZScsXG5cdFx0cGdNYXI6J21hcmdpbidcblx0fSlcblx0XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0c3RhdGljIGdldCBuYW1pbmcoKXtyZXR1cm4gbmFtaW5nfVxuXHRcblx0cGdTeih4KXtcblx0XHRyZXR1cm4ge3dpZHRoOnBhcnNlSW50KHguYXR0cigndzp3JykpLzIwLCBoZWlnaHQ6cGFyc2VJbnQoeC5hdHRyKCd3OmgnKS8yMCl9XG5cdH1cblx0cGdNYXIoeCl7XG5cdFx0dmFyIHZhbHVlPXRoaXMuYXNPYmplY3QoeCwgZnVuY3Rpb24odil7cmV0dXJuIHBhcnNlRmxvYXQodikvMjB9KVxuXHRcdGlmKHZhbHVlLmd1dHRlciAmJiB0aGlzLndEb2MuZ2V0UGFydCgnc2V0dGluZ3MnKS5kb2N1bWVudEVsZW1lbnQuJDEoJ2d1dHRlckF0VG9wJykpXG5cdFx0XHR2YWx1ZS5ndXR0ZXJBdFJpZ2h0PTE7XG5cdFx0cmV0dXJuIHZhbHVlO1xuXHR9XG5cdGNvbHMoeCl7XG5cdFx0dmFyIG89dGhpcy5hc09iamVjdCh4LCBwYXJzZUludClcblx0XHRvLnNwYWNlICYmIChvLnNwYWNlPW8uc3BhY2UvMjAuMClcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2VjdGlvbid9XG59XG4iXX0=