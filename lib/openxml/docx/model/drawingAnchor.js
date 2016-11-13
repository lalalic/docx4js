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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZHJhd2luZ0FuY2hvci5qcyJdLCJuYW1lcyI6WyJkcmF3aW5nQW5jaG9yIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiJDEiLCIkIiwiUHJvcGVydGllcyIsIm5hbWluZyIsIk9iamVjdCIsImFzc2lnbiIsIndyYXBOb25lIiwid3JhcFNxdWFyZSIsIndyYXBUb3BBbmRCb3R0b20iLCJ3cmFwVGlnaHQiLCJ3cmFwVGhyb3VnaCIsInQiLCJjaGlsZHJlbiIsInNwbGl0IiwiZm9yRWFjaCIsImEiLCJwdXNoIiwieCIsIm8iLCJyZWxhdGl2ZUZyb20iLCJhdHRyIiwiZmlyc3RDaGlsZCIsImxvY2FsTmFtZSIsInB0MlB4IiwiYXNQdCIsInRleHRDb250ZW50IiwidHJpbSIsInZhbHVlIiwiRU1QVFkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxhOzs7QUFDcEIsd0JBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFBQSw2SEFDUEMsU0FETzs7QUFFaEIsUUFBS0MsUUFBTCxHQUFjRixLQUFLRyxFQUFMLENBQVEsc0JBQVIsQ0FBZDtBQUZnQjtBQUdoQjs7OztzQ0FFa0I7QUFDbEIsVUFBTyxLQUFLRCxRQUFMLENBQWNFLENBQWQsQ0FBZ0IsS0FBaEIsQ0FBUDtBQUNBOzs7c0JBRWdCO0FBQUMsVUFBTyxnQkFBUDtBQUF3Qjs7O3NCQUVuQjtBQUFDLFVBQU9DLFVBQVA7QUFBa0I7Ozs7OztrQkFadEJOLGE7OztBQWVyQixJQUFJTyxTQUFPQyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQixrQkFBUUgsVUFBUixDQUFtQkMsTUFBcEMsRUFBMkM7QUFDckRHLFdBQVMsTUFENEM7QUFFckRDLGFBQVcsTUFGMEM7QUFHckRDLG1CQUFpQixNQUhvQztBQUlyREMsWUFBVSxNQUoyQztBQUtyREMsY0FBWTtBQUx5QyxDQUEzQyxDQUFYOztJQU9NUixVOzs7Ozs7Ozs7OztzQ0FLYztBQUFBOztBQUNsQixPQUFJUyxDQUFKO0FBQUEsT0FBT0Msc0lBQW9DZCxTQUFwQyxDQUFQO0FBQ0Esb0ZBQ0VlLEtBREYsQ0FDUSxHQURSLEVBQ2FDLE9BRGIsQ0FDcUIsVUFBQ0MsQ0FBRCxFQUFLO0FBQUMsS0FBQ0osSUFBRSxPQUFLZCxJQUFMLENBQVVHLEVBQVYsQ0FBYWUsQ0FBYixDQUFILEtBQXVCSCxTQUFTSSxJQUFULENBQWNMLENBQWQsQ0FBdkI7QUFBd0MsSUFEbkU7QUFFQSxVQUFPQyxRQUFQO0FBQ0E7Ozs0QkFFU0ssQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs0QkFDU0QsQyxFQUFFO0FBQ1gsT0FBSUMsSUFBRSxFQUFDQyxjQUFhRixFQUFFRyxJQUFGLENBQU8sY0FBUCxDQUFkLEVBQU47QUFDQUYsS0FBRUQsRUFBRUksVUFBRixDQUFhQyxTQUFmLElBQTJCTCxFQUFFSSxVQUFGLENBQWFDLFNBQWIsSUFBd0IsV0FBeEIsR0FBc0MsS0FBS0MsS0FBTCxDQUFXLEtBQUtDLElBQUwsQ0FBVVAsRUFBRUksVUFBRixDQUFhSSxXQUFiLENBQXlCQyxJQUF6QixFQUFWLEVBQTBDLElBQTFDLENBQVgsQ0FBdEMsR0FBb0dULEVBQUVJLFVBQUYsQ0FBYUksV0FBYixDQUF5QkMsSUFBekIsRUFBL0g7QUFDQSxVQUFPUixDQUFQO0FBQ0E7Ozs2QkFDUztBQUNULFVBQU8sTUFBUDtBQUNBOzs7K0JBQ1c7QUFDWCxVQUFPLFFBQVA7QUFDQTs7O3FDQUNpQjtBQUNqQixVQUFPLGNBQVA7QUFDQTs7OzhCQUNVO0FBQ1YsVUFBTyxPQUFQO0FBQ0E7OztnQ0FDWTtBQUNaLFVBQU8sU0FBUDtBQUNBOzs7NEJBQ1NELEMsRUFBRTtBQUNYLFVBQU9BLEVBQUVVLEtBQUYsSUFBUyxHQUFULEdBQWUsS0FBS0MsS0FBcEIsR0FBNEIsSUFBbkM7QUFDQTs7O3NCQXRDZ0I7QUFBQyxVQUFPLE9BQVA7QUFBZTs7O3NCQUVkO0FBQUMsVUFBT3pCLE1BQVA7QUFBYzs7OztFQUhULGtCQUFRRCxVIiwiZmlsZSI6ImRyYXdpbmdBbmNob3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGRyYXdpbmdBbmNob3IgZXh0ZW5kcyBEcmF3aW5ne1xuXHRjb25zdHJ1Y3Rvcih3WG1sKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy53RHJhd2luZz13WG1sLiQxKCdkcmF3aW5nPjpmaXJzdC1jaGlsZCcpXG5cdH1cblxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndEcmF3aW5nLiQoJ3dzcCcpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2RyYXdpbmcuYW5jaG9yJ31cblxuXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cbn1cblxudmFyIG5hbWluZz1PYmplY3QuYXNzaWduKHt9LERyYXdpbmcuUHJvcGVydGllcy5uYW1pbmcse1xuXHR3cmFwTm9uZTond3JhcCcsXG5cdHdyYXBTcXVhcmU6J3dyYXAnLFxuXHR3cmFwVG9wQW5kQm90dG9tOid3cmFwJyxcblx0d3JhcFRpZ2h0Oid3cmFwJyxcblx0d3JhcFRocm91Z2g6J3dyYXAnXG59KVxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzICBEcmF3aW5nLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2hhcGUnfVxuXG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cblxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHZhciB0LCBjaGlsZHJlbj1zdXBlci5fZ2V0VmFsaWRDaGlsZHJlbiguLi5hcmd1bWVudHMpO1xuXHRcdCdwb3NpdGlvbkgscG9zaXRpb25WLHdyYXBOb25lLHdyYXBTcXVhcmUsd3JhcFRvcEFuZEJvdHRvbSx3cmFwVGlnaHQsd3JhcFRocm91Z2gnXG5cdFx0XHQuc3BsaXQoJywnKS5mb3JFYWNoKChhKT0+eyh0PXRoaXMud1htbC4kMShhKSkgJiYgY2hpbGRyZW4ucHVzaCh0KX0pXG5cdFx0cmV0dXJuIGNoaWxkcmVuXG5cdH1cblxuXHRwb3NpdGlvbkgoeCl7XG5cdFx0dmFyIG89e3JlbGF0aXZlRnJvbTp4LmF0dHIoJ3JlbGF0aXZlRnJvbScpfVxuXHRcdG9beC5maXJzdENoaWxkLmxvY2FsTmFtZV09IHguZmlyc3RDaGlsZC5sb2NhbE5hbWU9PSdwb3NPZmZzZXQnID8gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKSwnY20nKSkgOiB4LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0cmV0dXJuIG9cblx0fVxuXHRwb3NpdGlvblYoeCl7XG5cdFx0dmFyIG89e3JlbGF0aXZlRnJvbTp4LmF0dHIoJ3JlbGF0aXZlRnJvbScpfVxuXHRcdG9beC5maXJzdENoaWxkLmxvY2FsTmFtZV09IHguZmlyc3RDaGlsZC5sb2NhbE5hbWU9PSdwb3NPZmZzZXQnID8gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5maXJzdENoaWxkLnRleHRDb250ZW50LnRyaW0oKSwnY20nKSkgOiB4LmZpcnN0Q2hpbGQudGV4dENvbnRlbnQudHJpbSgpXG5cdFx0cmV0dXJuIG9cblx0fVxuXHR3cmFwTm9uZSgpe1xuXHRcdHJldHVybiAnbm9uZSdcblx0fVxuXHR3cmFwU3F1YXJlKCl7XG5cdFx0cmV0dXJuICdzcXVhcmUnXG5cdH1cblx0d3JhcFRvcEFuZEJvdHRvbSgpe1xuXHRcdHJldHVybiAndG9wQW5kQm90dG9tJ1xuXHR9XG5cdHdyYXBUaWdodCgpe1xuXHRcdHJldHVybiAndGlnaHQnXG5cdH1cblx0d3JhcFRocm91Z2goKXtcblx0XHRyZXR1cm4gJ3Rocm91Z2gnXG5cdH1cblx0YmVoaW5kRG9jKHgpe1xuXHRcdHJldHVybiB4LnZhbHVlPT0nMCcgPyB0aGlzLkVNUFRZIDogdHJ1ZVxuXHR9XG59XG4iXX0=