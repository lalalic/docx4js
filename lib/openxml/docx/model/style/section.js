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

var section = function (_Style) {
	_inherits(section, _Style);

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
}(_style2.default);

exports.default = section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixnQkFBTSxVQUFOLENBQWlCLE1BQWpCLEVBQXdCO0FBQ2xELE9BQUssTUFBTDtBQUNBLFFBQU0sUUFBTjtDQUZTLENBQVA7O0lBSWlCOzs7Ozs7Ozs7Ozt1QkFHZixHQUFFO0FBQ04sVUFBTyxFQUFDLE9BQU0sU0FBUyxFQUFFLElBQUYsQ0FBTyxLQUFQLENBQVQsSUFBd0IsRUFBeEIsRUFBNEIsUUFBTyxTQUFTLEVBQUUsSUFBRixDQUFPLEtBQVAsSUFBYyxFQUFkLENBQWhCLEVBQTFDLENBRE07Ozs7d0JBR0QsR0FBRTtBQUNQLE9BQUksUUFBTSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFVBQVMsQ0FBVCxFQUFXO0FBQUMsV0FBTyxXQUFXLENBQVgsSUFBYyxFQUFkLENBQVI7SUFBWCxDQUF2QixDQURHO0FBRVAsT0FBRyxNQUFNLE1BQU4sSUFBZ0IsS0FBSyxJQUFMLENBQVUsT0FBVixDQUFrQixVQUFsQixFQUE4QixlQUE5QixDQUE4QyxFQUE5QyxDQUFpRCxhQUFqRCxDQUFoQixFQUNGLE1BQU0sYUFBTixHQUFvQixDQUFwQixDQUREO0FBRUEsVUFBTyxLQUFQLENBSk87Ozs7dUJBTUgsR0FBRTtBQUNOLE9BQUksSUFBRSxLQUFLLFFBQUwsQ0FBYyxDQUFkLEVBQWlCLFFBQWpCLENBQUYsQ0FERTtBQUVOLEtBQUUsS0FBRixLQUFZLEVBQUUsS0FBRixHQUFRLEVBQUUsS0FBRixHQUFRLElBQVIsQ0FBcEIsQ0FGTTtBQUdOLFVBQU8sQ0FBUCxDQUhNOzs7O3NCQVhZO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7c0JBZ0JGO0FBQUMsVUFBTyxTQUFQLENBQUQ7Ozs7UUFqQkciLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcblxudmFyIG5hbWluZz1PYmplY3QuYXNzaWduKHt9LFN0eWxlLlByb3BlcnRpZXMubmFtaW5nLHtcblx0XHRwZ1N6OidzaXplJyxcblx0XHRwZ01hcjonbWFyZ2luJ1xuXHR9KVxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VjdGlvbiBleHRlbmRzIFN0eWxle1xuXHRzdGF0aWMgZ2V0IG5hbWluZygpe3JldHVybiBuYW1pbmd9XG5cdFxuXHRwZ1N6KHgpe1xuXHRcdHJldHVybiB7d2lkdGg6cGFyc2VJbnQoeC5hdHRyKCd3OncnKSkvMjAsIGhlaWdodDpwYXJzZUludCh4LmF0dHIoJ3c6aCcpLzIwKX1cblx0fVxuXHRwZ01hcih4KXtcblx0XHR2YXIgdmFsdWU9dGhpcy5hc09iamVjdCh4LCBmdW5jdGlvbih2KXtyZXR1cm4gcGFyc2VGbG9hdCh2KS8yMH0pXG5cdFx0aWYodmFsdWUuZ3V0dGVyICYmIHRoaXMud0RvYy5nZXRQYXJ0KCdzZXR0aW5ncycpLmRvY3VtZW50RWxlbWVudC4kMSgnZ3V0dGVyQXRUb3AnKSlcblx0XHRcdHZhbHVlLmd1dHRlckF0UmlnaHQ9MTtcblx0XHRyZXR1cm4gdmFsdWU7XG5cdH1cblx0Y29scyh4KXtcblx0XHR2YXIgbz10aGlzLmFzT2JqZWN0KHgsIHBhcnNlSW50KVxuXHRcdG8uc3BhY2UgJiYgKG8uc3BhY2U9by5zcGFjZS8yMC4wKVxuXHRcdHJldHVybiBvXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzZWN0aW9uJ31cbn1cbiJdfQ==