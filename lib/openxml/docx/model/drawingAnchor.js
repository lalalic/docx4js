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

		var _this = _possibleConstructorReturn(this, (drawingAnchor.__proto__ || Object.getPrototypeOf(drawingAnchor)).apply(this, arguments));

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

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			var _this3 = this;

			var t,
			    children = _get(Properties.prototype.__proto__ || Object.getPrototypeOf(Properties.prototype), '_getValidChildren', this).apply(this, arguments);
			'positionH,positionV,wrapNone,wrapSquare,wrapTopAndBottom,wrapTight,wrapThrough'.split(',').forEach(function (a) {
				(t = _this3.wXml.$1(a)) && children.push(t);
			});
			return children;
		}
	}, {
		key: 'positionH',
		value: function positionH(x) {
			var o = { relativeFrom: x.attr('relativeFrom') };
			o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.pt2Px(this.asPt(x.firstChild.textContent.trim(), 'cm')) : x.firstChild.textContent.trim();
			return o;
		}
	}, {
		key: 'positionV',
		value: function positionV(x) {
			var o = { relativeFrom: x.attr('relativeFrom') };
			o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.pt2Px(this.asPt(x.firstChild.textContent.trim(), 'cm')) : x.firstChild.textContent.trim();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJkcmF3aW5nQW5jaG9yIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiJDEiLCIkIiwiUHJvcGVydGllcyIsIkRyYXdpbmciLCJuYW1pbmciLCJPYmplY3QiLCJhc3NpZ24iLCJ3cmFwTm9uZSIsIndyYXBTcXVhcmUiLCJ3cmFwVG9wQW5kQm90dG9tIiwid3JhcFRpZ2h0Iiwid3JhcFRocm91Z2giLCJ0IiwiY2hpbGRyZW4iLCJzcGxpdCIsImZvckVhY2giLCJhIiwicHVzaCIsIngiLCJvIiwicmVsYXRpdmVGcm9tIiwiYXR0ciIsImZpcnN0Q2hpbGQiLCJsb2NhbE5hbWUiLCJwdDJQeCIsImFzUHQiLCJ0ZXh0Q29udGVudCIsInRyaW0iLCJ2YWx1ZSIsIkVNUFRZIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7O0FBQ3BCLHdCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUEsNkhBQ1BDLFNBRE87O0FBRWhCLFFBQUtDLFFBQUwsR0FBY0YsS0FBS0csRUFBTCxDQUFRLHNCQUFSLENBQWQ7QUFGZ0I7QUFHaEI7Ozs7c0NBRWtCO0FBQ2xCLFVBQU8sS0FBS0QsUUFBTCxDQUFjRSxDQUFkLENBQWdCLEtBQWhCLENBQVA7QUFDQTs7O3NCQUVnQjtBQUFDLFVBQU8sZ0JBQVA7QUFBd0I7OztzQkFFbkI7QUFBQyxVQUFPQyxVQUFQO0FBQWtCOzs7O0VBWkFDLGlCOztrQkFBdEJQLGE7OztBQWVyQixJQUFJUSxTQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQkgsa0JBQVFELFVBQVIsQ0FBbUJFLE1BQXBDLEVBQTJDO0FBQ3JERyxXQUFTLE1BRDRDO0FBRXJEQyxhQUFXLE1BRjBDO0FBR3JEQyxtQkFBaUIsTUFIb0M7QUFJckRDLFlBQVUsTUFKMkM7QUFLckRDLGNBQVk7QUFMeUMsQ0FBM0MsQ0FBWDs7SUFPTVQsVTs7Ozs7Ozs7Ozs7c0NBS2M7QUFBQTs7QUFDbEIsT0FBSVUsQ0FBSjtBQUFBLE9BQU9DLHNJQUFvQ2YsU0FBcEMsQ0FBUDtBQUNBLG9GQUNFZ0IsS0FERixDQUNRLEdBRFIsRUFDYUMsT0FEYixDQUNxQixVQUFDQyxDQUFELEVBQUs7QUFBQyxLQUFDSixJQUFFLE9BQUtmLElBQUwsQ0FBVUcsRUFBVixDQUFhZ0IsQ0FBYixDQUFILEtBQXVCSCxTQUFTSSxJQUFULENBQWNMLENBQWQsQ0FBdkI7QUFBd0MsSUFEbkU7QUFFQSxVQUFPQyxRQUFQO0FBQ0E7Ozs0QkFFU0ssQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs0QkFDU0QsQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs2QkFDUztBQUNULFVBQU8sTUFBUDtBQUNBOzs7K0JBQ1c7QUFDWCxVQUFPLFFBQVA7QUFDQTs7O3FDQUNpQjtBQUNqQixVQUFPLGNBQVA7QUFDQTs7OzhCQUNVO0FBQ1YsVUFBTyxPQUFQO0FBQ0E7OztnQ0FDWTtBQUNaLFVBQU8sU0FBUDtBQUNBOzs7NEJBQ1NELEMsRUFBRTtBQUNYLFVBQU9BLEVBQUVVLEtBQUYsSUFBUyxHQUFULEdBQWUsS0FBS0MsS0FBcEIsR0FBNEIsSUFBbkM7QUFDQTs7O3NCQXRDZ0I7QUFBQyxVQUFPLE9BQVA7QUFBZTs7O3NCQUVkO0FBQUMsVUFBT3pCLE1BQVA7QUFBYzs7OztFQUhURCxrQkFBUUQsVSIsImZpbGUiOiJkcmF3aW5nQW5jaG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkcmF3aW5nQW5jaG9yIGV4dGVuZHMgRHJhd2luZ3tcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RyYXdpbmc9d1htbC4kMSgnZHJhd2luZz46Zmlyc3QtY2hpbGQnKVxuXHR9XG5cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53RHJhd2luZy4kKCd3c3AnKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdkcmF3aW5nLmFuY2hvcid9XG5cblx0c3RhdGljIGdldCBQcm9wZXJ0aWVzKCl7cmV0dXJuIFByb3BlcnRpZXN9XG59XG5cbnZhciBuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLHtcblx0d3JhcE5vbmU6J3dyYXAnLFxuXHR3cmFwU3F1YXJlOid3cmFwJyxcblx0d3JhcFRvcEFuZEJvdHRvbTond3JhcCcsXG5cdHdyYXBUaWdodDond3JhcCcsXG5cdHdyYXBUaHJvdWdoOid3cmFwJ1xufSlcbmNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyAgRHJhd2luZy5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3NoYXBlJ31cblxuXHRzdGF0aWMgZ2V0IG5hbWluZygpe3JldHVybiBuYW1pbmd9XG5cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHR2YXIgdCwgY2hpbGRyZW49c3VwZXIuX2dldFZhbGlkQ2hpbGRyZW4oLi4uYXJndW1lbnRzKTtcblx0XHQncG9zaXRpb25ILHBvc2l0aW9uVix3cmFwTm9uZSx3cmFwU3F1YXJlLHdyYXBUb3BBbmRCb3R0b20sd3JhcFRpZ2h0LHdyYXBUaHJvdWdoJ1xuXHRcdFx0LnNwbGl0KCcsJykuZm9yRWFjaCgoYSk9PnsodD10aGlzLndYbWwuJDEoYSkpICYmIGNoaWxkcmVuLnB1c2godCl9KVxuXHRcdHJldHVybiBjaGlsZHJlblxuXHR9XG5cblx0cG9zaXRpb25IKHgpe1xuXHRcdHZhciBvPXtyZWxhdGl2ZUZyb206eC5hdHRyKCdyZWxhdGl2ZUZyb20nKX1cblx0XHRvW3guZmlyc3RDaGlsZC5sb2NhbE5hbWVdPSB4LmZpcnN0Q2hpbGQubG9jYWxOYW1lPT0ncG9zT2Zmc2V0JyA/IHRoaXMucHQyUHgodGhpcy5hc1B0KHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKCksJ2NtJykpIDogeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKVxuXHRcdHJldHVybiBvXG5cdH1cblx0cG9zaXRpb25WKHgpe1xuXHRcdHZhciBvPXtyZWxhdGl2ZUZyb206eC5hdHRyKCdyZWxhdGl2ZUZyb20nKX1cblx0XHRvW3guZmlyc3RDaGlsZC5sb2NhbE5hbWVdPSB4LmZpcnN0Q2hpbGQubG9jYWxOYW1lPT0ncG9zT2Zmc2V0JyA/IHRoaXMucHQyUHgodGhpcy5hc1B0KHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKCksJ2NtJykpIDogeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKVxuXHRcdHJldHVybiBvXG5cdH1cblx0d3JhcE5vbmUoKXtcblx0XHRyZXR1cm4gJ25vbmUnXG5cdH1cblx0d3JhcFNxdWFyZSgpe1xuXHRcdHJldHVybiAnc3F1YXJlJ1xuXHR9XG5cdHdyYXBUb3BBbmRCb3R0b20oKXtcblx0XHRyZXR1cm4gJ3RvcEFuZEJvdHRvbSdcblx0fVxuXHR3cmFwVGlnaHQoKXtcblx0XHRyZXR1cm4gJ3RpZ2h0J1xuXHR9XG5cdHdyYXBUaHJvdWdoKCl7XG5cdFx0cmV0dXJuICd0aHJvdWdoJ1xuXHR9XG5cdGJlaGluZERvYyh4KXtcblx0XHRyZXR1cm4geC52YWx1ZT09JzAnID8gdGhpcy5FTVBUWSA6IHRydWVcblx0fVxufVxuIl19