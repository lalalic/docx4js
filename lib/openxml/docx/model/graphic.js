'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Graphic = function (_Drawing) {
	_inherits(Graphic, _Drawing);

	function Graphic(wXml) {
		_classCallCheck(this, Graphic);

		var _this = _possibleConstructorReturn(this, (Graphic.__proto__ || Object.getPrototypeOf(Graphic)).apply(this, arguments));

		_this.wDrawing = wXml;
		return _this;
	}

	return Graphic;
}(_drawing2.default);

exports.default = Graphic;


var naming = null;

Graphic.Properties = function (_Drawing$Properties) {
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren(t) {
			return _get(Properties.prototype.__proto__ || Object.getPrototypeOf(Properties.prototype), '_getValidChildren', this).apply(this, arguments).concat(this.wXml.$1('spPr').childNodes.asArray());
		}
	}], [{
		key: 'naming',
		get: function get() {
			if (!naming) naming = Object.assign({}, _drawing2.default.Properties.naming, _drawing2.default.SpProperties.naming);
			return naming;
		}
	}]);

	return Properties;
}(_drawing2.default.Properties);

Graphic.Properties.mixinSpProperties();
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwiRHJhd2luZyIsIm5hbWluZyIsIlByb3BlcnRpZXMiLCJ0IiwiY29uY2F0IiwiJDEiLCJjaGlsZE5vZGVzIiwiYXNBcnJheSIsIk9iamVjdCIsImFzc2lnbiIsIlNwUHJvcGVydGllcyIsIm1peGluU3BQcm9wZXJ0aWVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQkEsTzs7O0FBQ3BCLGtCQUFZQyxJQUFaLEVBQWlCO0FBQUE7O0FBQUEsaUhBQ1BDLFNBRE87O0FBRWhCLFFBQUtDLFFBQUwsR0FBY0YsSUFBZDtBQUZnQjtBQUdoQjs7O0VBSm1DRyxpQjs7a0JBQWhCSixPOzs7QUFPckIsSUFBSUssU0FBTyxJQUFYOztBQUVBTCxRQUFRTSxVQUFSO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQSxvQ0FPbUJDLENBUG5CLEVBT3FCO0FBQ25CLFVBQU8sMkhBQTJCTCxTQUEzQixFQUNMTSxNQURLLENBQ0UsS0FBS1AsSUFBTCxDQUFVUSxFQUFWLENBQWEsTUFBYixFQUFxQkMsVUFBckIsQ0FBZ0NDLE9BQWhDLEVBREYsQ0FBUDtBQUVBO0FBVkY7QUFBQTtBQUFBLHNCQUNvQjtBQUNsQixPQUFHLENBQUNOLE1BQUosRUFDQ0EsU0FBT08sT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBaUJULGtCQUFRRSxVQUFSLENBQW1CRCxNQUFwQyxFQUEyQ0Qsa0JBQVFVLFlBQVIsQ0FBcUJULE1BQWhFLENBQVA7QUFDRCxVQUFPQSxNQUFQO0FBQ0E7QUFMRjs7QUFBQTtBQUFBLEVBQTRDRCxrQkFBUUUsVUFBcEQ7O0FBY0FOLFFBQVFNLFVBQVIsQ0FBbUJTLGlCQUFuQiIsImZpbGUiOiJncmFwaGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljIGV4dGVuZHMgRHJhd2luZ3tcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RyYXdpbmc9d1htbFxuXHR9XG59XG5cbnZhciBuYW1pbmc9bnVsbDtcblxuR3JhcGhpYy5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBEcmF3aW5nLlByb3BlcnRpZXN7XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7XG5cdFx0aWYoIW5hbWluZylcblx0XHRcdG5hbWluZz1PYmplY3QuYXNzaWduKHt9LERyYXdpbmcuUHJvcGVydGllcy5uYW1pbmcsRHJhd2luZy5TcFByb3BlcnRpZXMubmFtaW5nKVxuXHRcdHJldHVybiBuYW1pbmdcblx0fVxuXHRcblx0X2dldFZhbGlkQ2hpbGRyZW4odCl7XG5cdFx0cmV0dXJuIHN1cGVyLl9nZXRWYWxpZENoaWxkcmVuKC4uLmFyZ3VtZW50cylcblx0XHRcdC5jb25jYXQodGhpcy53WG1sLiQxKCdzcFByJykuY2hpbGROb2Rlcy5hc0FycmF5KCkpXG5cdH1cbn1cblxuXG5HcmFwaGljLlByb3BlcnRpZXMubWl4aW5TcFByb3BlcnRpZXMoKSJdfQ==