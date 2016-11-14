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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJkcmF3aW5nQW5jaG9yIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiJDEiLCIkIiwiUHJvcGVydGllcyIsIm5hbWluZyIsIk9iamVjdCIsImFzc2lnbiIsIndyYXBOb25lIiwid3JhcFNxdWFyZSIsIndyYXBUb3BBbmRCb3R0b20iLCJ3cmFwVGlnaHQiLCJ3cmFwVGhyb3VnaCIsInQiLCJjaGlsZHJlbiIsInNwbGl0IiwiZm9yRWFjaCIsImEiLCJwdXNoIiwieCIsIm8iLCJyZWxhdGl2ZUZyb20iLCJhdHRyIiwiZmlyc3RDaGlsZCIsImxvY2FsTmFtZSIsInB0MlB4IiwiYXNQdCIsInRleHRDb250ZW50IiwidHJpbSIsInZhbHVlIiwiRU1QVFkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7QUFDcEIsd0JBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFBQSw2SEFDUEMsU0FETzs7QUFFaEIsUUFBS0MsUUFBTCxHQUFjRixLQUFLRyxFQUFMLENBQVEsc0JBQVIsQ0FBZDtBQUZnQjtBQUdoQjs7OztzQ0FFa0I7QUFDbEIsVUFBTyxLQUFLRCxRQUFMLENBQWNFLENBQWQsQ0FBZ0IsS0FBaEIsQ0FBUDtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxnQkFBUDtBQUF3Qjs7O3NCQUVuQjtBQUFDLFVBQU9DLFVBQVA7QUFBa0I7Ozs7OztrQkFadEJOLGE7OztBQWVyQixJQUFJTyxTQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQixrQkFBUUgsVUFBUixDQUFtQkMsTUFBcEMsRUFBMkM7QUFDckRHLFdBQVMsTUFENEM7QUFFckRDLGFBQVcsTUFGMEM7QUFHckRDLG1CQUFpQixNQUhvQztBQUlyREMsWUFBVSxNQUoyQztBQUtyREMsY0FBWTtBQUx5QyxDQUEzQyxDQUFYOztJQU9NUixVOzs7Ozs7Ozs7OztzQ0FLYztBQUFBOztBQUNsQixPQUFJUyxDQUFKO0FBQUEsT0FBT0Msc0lBQW9DZCxTQUFwQyxDQUFQO0FBQ0Esb0ZBQ0VlLEtBREYsQ0FDUSxHQURSLEVBQ2FDLE9BRGIsQ0FDcUIsVUFBQ0MsQ0FBRCxFQUFLO0FBQUMsS0FBQ0osSUFBRSxPQUFLZCxJQUFMLENBQVVHLEVBQVYsQ0FBYWUsQ0FBYixDQUFILEtBQXVCSCxTQUFTSSxJQUFULENBQWNMLENBQWQsQ0FBdkI7QUFBd0MsSUFEbkU7QUFFQSxVQUFPQyxRQUFQO0FBQ0E7Ozs0QkFFU0ssQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs0QkFDU0QsQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs2QkFDUztBQUNULFVBQU8sTUFBUDtBQUNBOzs7K0JBQ1c7QUFDWCxVQUFPLFFBQVA7QUFDQTs7O3FDQUNpQjtBQUNqQixVQUFPLGNBQVA7QUFDQTs7OzhCQUNVO0FBQ1YsVUFBTyxPQUFQO0FBQ0E7OztnQ0FDWTtBQUNaLFVBQU8sU0FBUDtBQUNBOzs7NEJBQ1NELEMsRUFBRTtBQUNYLFVBQU9BLEVBQUVVLEtBQUYsSUFBUyxHQUFULEdBQWUsS0FBS0MsS0FBcEIsR0FBNEIsSUFBbkM7QUFDQTs7O3NCQXRDZ0I7QUFBQyxVQUFPLE9BQVA7QUFBZTs7O3NCQUVkO0FBQUMsVUFBT3pCLE1BQVA7QUFBYzs7OztFQUhULGtCQUFRRCxVIiwiZmlsZSI6ImRyYXdpbmdBbmNob3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBkcmF3aW5nQW5jaG9yIGV4dGVuZHMgRHJhd2luZ3tcclxuXHRjb25zdHJ1Y3Rvcih3WG1sKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RyYXdpbmc9d1htbC4kMSgnZHJhd2luZz46Zmlyc3QtY2hpbGQnKVxyXG5cdH1cclxuXHJcblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclxuXHRcdHJldHVybiB0aGlzLndEcmF3aW5nLiQoJ3dzcCcpXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2RyYXdpbmcuYW5jaG9yJ31cclxuXHJcblx0c3RhdGljIGdldCBQcm9wZXJ0aWVzKCl7cmV0dXJuIFByb3BlcnRpZXN9XHJcbn1cclxuXHJcbnZhciBuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLHtcclxuXHR3cmFwTm9uZTond3JhcCcsXHJcblx0d3JhcFNxdWFyZTond3JhcCcsXHJcblx0d3JhcFRvcEFuZEJvdHRvbTond3JhcCcsXHJcblx0d3JhcFRpZ2h0Oid3cmFwJyxcclxuXHR3cmFwVGhyb3VnaDond3JhcCdcclxufSlcclxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzICBEcmF3aW5nLlByb3BlcnRpZXN7XHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzaGFwZSd9XHJcblxyXG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cclxuXHJcblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclxuXHRcdHZhciB0LCBjaGlsZHJlbj1zdXBlci5fZ2V0VmFsaWRDaGlsZHJlbiguLi5hcmd1bWVudHMpO1xyXG5cdFx0J3Bvc2l0aW9uSCxwb3NpdGlvblYsd3JhcE5vbmUsd3JhcFNxdWFyZSx3cmFwVG9wQW5kQm90dG9tLHdyYXBUaWdodCx3cmFwVGhyb3VnaCdcclxuXHRcdFx0LnNwbGl0KCcsJykuZm9yRWFjaCgoYSk9PnsodD10aGlzLndYbWwuJDEoYSkpICYmIGNoaWxkcmVuLnB1c2godCl9KVxyXG5cdFx0cmV0dXJuIGNoaWxkcmVuXHJcblx0fVxyXG5cclxuXHRwb3NpdGlvbkgoeCl7XHJcblx0XHR2YXIgbz17cmVsYXRpdmVGcm9tOnguYXR0cigncmVsYXRpdmVGcm9tJyl9XHJcblx0XHRvW3guZmlyc3RDaGlsZC5sb2NhbE5hbWVdPSB4LmZpcnN0Q2hpbGQubG9jYWxOYW1lPT0ncG9zT2Zmc2V0JyA/IHRoaXMucHQyUHgodGhpcy5hc1B0KHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKCksJ2NtJykpIDogeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKVxyXG5cdFx0cmV0dXJuIG9cclxuXHR9XHJcblx0cG9zaXRpb25WKHgpe1xyXG5cdFx0dmFyIG89e3JlbGF0aXZlRnJvbTp4LmF0dHIoJ3JlbGF0aXZlRnJvbScpfVxyXG5cdFx0b1t4LmZpcnN0Q2hpbGQubG9jYWxOYW1lXT0geC5maXJzdENoaWxkLmxvY2FsTmFtZT09J3Bvc09mZnNldCcgPyB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQudHJpbSgpLCdjbScpKSA6IHguZmlyc3RDaGlsZC50ZXh0Q29udGVudC50cmltKClcclxuXHRcdHJldHVybiBvXHJcblx0fVxyXG5cdHdyYXBOb25lKCl7XHJcblx0XHRyZXR1cm4gJ25vbmUnXHJcblx0fVxyXG5cdHdyYXBTcXVhcmUoKXtcclxuXHRcdHJldHVybiAnc3F1YXJlJ1xyXG5cdH1cclxuXHR3cmFwVG9wQW5kQm90dG9tKCl7XHJcblx0XHRyZXR1cm4gJ3RvcEFuZEJvdHRvbSdcclxuXHR9XHJcblx0d3JhcFRpZ2h0KCl7XHJcblx0XHRyZXR1cm4gJ3RpZ2h0J1xyXG5cdH1cclxuXHR3cmFwVGhyb3VnaCgpe1xyXG5cdFx0cmV0dXJuICd0aHJvdWdoJ1xyXG5cdH1cclxuXHRiZWhpbmREb2MoeCl7XHJcblx0XHRyZXR1cm4geC52YWx1ZT09JzAnID8gdGhpcy5FTVBUWSA6IHRydWVcclxuXHR9XHJcbn1cclxuIl19