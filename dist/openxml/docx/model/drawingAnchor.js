'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var drawingAnchor = function (_Drawing) {
	_inherits(drawingAnchor, _Drawing);

	function drawingAnchor(wXml) {
		_classCallCheck(this, drawingAnchor);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(drawingAnchor).apply(this, arguments));

		_this.wDrawing = wXml.$1('drawing>:first-child');
		return _this;
	}

	_createClass(drawingAnchor, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wDrawing.$('wsp');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'drawing.anchor';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return drawingAnchor;
}(_drawing2.default);

exports.default = drawingAnchor;


var naming = Object.assign({}, _drawing2.default.Properties.naming, {
	wrapNone: 'wrap',
	wrapSquare: 'wrap',
	wrapTopAndBottom: 'wrap',
	wrapTight: 'wrap',
	wrapThrough: 'wrap'
});

var Properties = function (_Drawing$Properties) {
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			var _this3 = this;

			var t,
			    children = _get(Object.getPrototypeOf(Properties.prototype), '_getValidChildren', this).apply(this, arguments);
			'positionH,positionV,wrapNone,wrapSquare,wrapTopAndBottom,wrapTight,wrapThrough'.split(',').forEach(function (a) {
				(t = _this3.wXml.$1(a)) && children.push(t);
			});
			return children;
		}
	}, {
		key: 'positionH',
		value: function positionH(x) {
			var o = { relativeFrom: x.attr('relativeFrom') };
			o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.asPt(x.firstChild.textContent.trim(), 'cm') : x.firstChild.textContent.trim();
			return o;
		}
	}, {
		key: 'positionV',
		value: function positionV(x) {
			var o = { relativeFrom: x.attr('relativeFrom') };
			o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.asPt(x.firstChild.textContent.trim(), 'cm') : x.firstChild.textContent.trim();
			return o;
		}
	}, {
		key: 'wrapNone',
		value: function wrapNone() {
			return 'none';
		}
	}, {
		key: 'wrapSquare',
		value: function wrapSquare() {
			return 'square';
		}
	}, {
		key: 'wrapTopAndBottom',
		value: function wrapTopAndBottom() {
			return 'topAndBottom';
		}
	}, {
		key: 'wrapTight',
		value: function wrapTight() {
			return 'tight';
		}
	}, {
		key: 'wrapThrough',
		value: function wrapThrough() {
			return 'through';
		}
	}, {
		key: 'behindDoc',
		value: function behindDoc(x) {
			return x.value == '0' ? this.EMPTY : true;
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'shape';
		}
	}, {
		key: 'naming',
		get: function get() {
			return naming;
		}
	}]);

	return Properties;
}(_drawing2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLGFBQ3BCLENBQVksSUFBWixFQUFpQjt3QkFERyxlQUNIOztxRUFERywyQkFFVixZQURPOztBQUVoQixRQUFLLFFBQUwsR0FBYyxLQUFLLEVBQUwsQ0FBUSxzQkFBUixDQUFkLENBRmdCOztFQUFqQjs7Y0FEb0I7O3NDQU1EO0FBQ2xCLFVBQU8sS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFnQixLQUFoQixDQUFQLENBRGtCOzs7O3NCQUlGO0FBQUMsVUFBTyxnQkFBUCxDQUFEOzs7O3NCQUVNO0FBQUMsVUFBTyxVQUFQLENBQUQ7Ozs7UUFaSDs7Ozs7O0FBZXJCLElBQUksU0FBTyxPQUFPLE1BQVAsQ0FBYyxFQUFkLEVBQWlCLGtCQUFRLFVBQVIsQ0FBbUIsTUFBbkIsRUFBMEI7QUFDckQsV0FBUyxNQUFUO0FBQ0EsYUFBVyxNQUFYO0FBQ0EsbUJBQWlCLE1BQWpCO0FBQ0EsWUFBVSxNQUFWO0FBQ0EsY0FBWSxNQUFaO0NBTFUsQ0FBUDs7SUFPRTs7Ozs7Ozs7Ozs7c0NBS2M7OztBQUNsQixPQUFJLENBQUo7T0FBTyxzQ0FOSCw4REFNdUMsVUFBcEMsQ0FEVztBQUVsQixvRkFDRSxLQURGLENBQ1EsR0FEUixFQUNhLE9BRGIsQ0FDcUIsVUFBQyxDQUFELEVBQUs7QUFBQyxLQUFDLElBQUUsT0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLENBQWIsQ0FBRixDQUFELElBQXVCLFNBQVMsSUFBVCxDQUFjLENBQWQsQ0FBdkIsQ0FBRDtJQUFMLENBRHJCLENBRmtCO0FBSWxCLFVBQU8sUUFBUCxDQUprQjs7Ozs0QkFPVCxHQUFFO0FBQ1gsT0FBSSxJQUFFLEVBQUMsY0FBYSxFQUFFLElBQUYsQ0FBTyxjQUFQLENBQWIsRUFBSCxDQURPO0FBRVgsS0FBRSxFQUFFLFVBQUYsQ0FBYSxTQUFiLENBQUYsR0FBMkIsRUFBRSxVQUFGLENBQWEsU0FBYixJQUF3QixXQUF4QixHQUFzQyxLQUFLLElBQUwsQ0FBVSxFQUFFLFVBQUYsQ0FBYSxXQUFiLENBQXlCLElBQXpCLEVBQVYsRUFBMEMsSUFBMUMsQ0FBdEMsR0FBd0YsRUFBRSxVQUFGLENBQWEsV0FBYixDQUF5QixJQUF6QixFQUF4RixDQUZoQjtBQUdYLFVBQU8sQ0FBUCxDQUhXOzs7OzRCQUtGLEdBQUU7QUFDWCxPQUFJLElBQUUsRUFBQyxjQUFhLEVBQUUsSUFBRixDQUFPLGNBQVAsQ0FBYixFQUFILENBRE87QUFFWCxLQUFFLEVBQUUsVUFBRixDQUFhLFNBQWIsQ0FBRixHQUEyQixFQUFFLFVBQUYsQ0FBYSxTQUFiLElBQXdCLFdBQXhCLEdBQXNDLEtBQUssSUFBTCxDQUFVLEVBQUUsVUFBRixDQUFhLFdBQWIsQ0FBeUIsSUFBekIsRUFBVixFQUEwQyxJQUExQyxDQUF0QyxHQUF3RixFQUFFLFVBQUYsQ0FBYSxXQUFiLENBQXlCLElBQXpCLEVBQXhGLENBRmhCO0FBR1gsVUFBTyxDQUFQLENBSFc7Ozs7NkJBS0Y7QUFDVCxVQUFPLE1BQVAsQ0FEUzs7OzsrQkFHRTtBQUNYLFVBQU8sUUFBUCxDQURXOzs7O3FDQUdNO0FBQ2pCLFVBQU8sY0FBUCxDQURpQjs7Ozs4QkFHUDtBQUNWLFVBQU8sT0FBUCxDQURVOzs7O2dDQUdFO0FBQ1osVUFBTyxTQUFQLENBRFk7Ozs7NEJBR0gsR0FBRTtBQUNYLFVBQU8sRUFBRSxLQUFGLElBQVMsR0FBVCxHQUFlLEtBQUssS0FBTCxHQUFhLElBQTVCLENBREk7Ozs7c0JBcENLO0FBQUMsVUFBTyxPQUFQLENBQUQ7Ozs7c0JBRUU7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7OztRQUhkO0VBQW9CLGtCQUFRLFVBQVIiLCJmaWxlIjoiZHJhd2luZ0FuY2hvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZHJhd2luZ0FuY2hvciBleHRlbmRzIERyYXdpbmd7XG5cdGNvbnN0cnVjdG9yKHdYbWwpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndEcmF3aW5nPXdYbWwuJDEoJ2RyYXdpbmc+OmZpcnN0LWNoaWxkJylcblx0fVxuXG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RyYXdpbmcuJCgnd3NwJylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZHJhd2luZy5hbmNob3InfVxuXG5cdHN0YXRpYyBnZXQgUHJvcGVydGllcygpe3JldHVybiBQcm9wZXJ0aWVzfVxufVxuXG52YXIgbmFtaW5nPU9iamVjdC5hc3NpZ24oe30sRHJhd2luZy5Qcm9wZXJ0aWVzLm5hbWluZyx7XG5cdHdyYXBOb25lOid3cmFwJyxcblx0d3JhcFNxdWFyZTond3JhcCcsXG5cdHdyYXBUb3BBbmRCb3R0b206J3dyYXAnLFxuXHR3cmFwVGlnaHQ6J3dyYXAnLFxuXHR3cmFwVGhyb3VnaDond3JhcCdcbn0pXG5jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgIERyYXdpbmcuUHJvcGVydGllc3tcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzaGFwZSd9XG5cblx0c3RhdGljIGdldCBuYW1pbmcoKXtyZXR1cm4gbmFtaW5nfVxuXG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0dmFyIHQsIGNoaWxkcmVuPXN1cGVyLl9nZXRWYWxpZENoaWxkcmVuKC4uLmFyZ3VtZW50cyk7XG5cdFx0J3Bvc2l0aW9uSCxwb3NpdGlvblYsd3JhcE5vbmUsd3JhcFNxdWFyZSx3cmFwVG9wQW5kQm90dG9tLHdyYXBUaWdodCx3cmFwVGhyb3VnaCdcblx0XHRcdC5zcGxpdCgnLCcpLmZvckVhY2goKGEpPT57KHQ9dGhpcy53WG1sLiQxKGEpKSAmJiBjaGlsZHJlbi5wdXNoKHQpfSlcblx0XHRyZXR1cm4gY2hpbGRyZW5cblx0fVxuXG5cdHBvc2l0aW9uSCh4KXtcblx0XHR2YXIgbz17cmVsYXRpdmVGcm9tOnguYXR0cigncmVsYXRpdmVGcm9tJyl9XG5cdFx0b1t4LmZpcnN0Q2hpbGQubG9jYWxOYW1lXT0geC5maXJzdENoaWxkLmxvY2FsTmFtZT09J3Bvc09mZnNldCcgPyB0aGlzLmFzUHQoeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKSwnY20nKSA6IHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKClcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHBvc2l0aW9uVih4KXtcblx0XHR2YXIgbz17cmVsYXRpdmVGcm9tOnguYXR0cigncmVsYXRpdmVGcm9tJyl9XG5cdFx0b1t4LmZpcnN0Q2hpbGQubG9jYWxOYW1lXT0geC5maXJzdENoaWxkLmxvY2FsTmFtZT09J3Bvc09mZnNldCcgPyB0aGlzLmFzUHQoeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKSwnY20nKSA6IHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKClcblx0XHRyZXR1cm4gb1xuXHR9XG5cdHdyYXBOb25lKCl7XG5cdFx0cmV0dXJuICdub25lJ1xuXHR9XG5cdHdyYXBTcXVhcmUoKXtcblx0XHRyZXR1cm4gJ3NxdWFyZSdcblx0fVxuXHR3cmFwVG9wQW5kQm90dG9tKCl7XG5cdFx0cmV0dXJuICd0b3BBbmRCb3R0b20nXG5cdH1cblx0d3JhcFRpZ2h0KCl7XG5cdFx0cmV0dXJuICd0aWdodCdcblx0fVxuXHR3cmFwVGhyb3VnaCgpe1xuXHRcdHJldHVybiAndGhyb3VnaCdcblx0fVxuXHRiZWhpbmREb2MoeCl7XG5cdFx0cmV0dXJuIHgudmFsdWU9PScwJyA/IHRoaXMuRU1QVFkgOiB0cnVlXG5cdH1cbn1cbiJdfQ==