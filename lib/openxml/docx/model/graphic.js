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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6WyJHcmFwaGljIiwid1htbCIsImFyZ3VtZW50cyIsIndEcmF3aW5nIiwibmFtaW5nIiwiUHJvcGVydGllcyIsInQiLCJjb25jYXQiLCIkMSIsImNoaWxkTm9kZXMiLCJhc0FycmF5IiwiT2JqZWN0IiwiYXNzaWduIiwiU3BQcm9wZXJ0aWVzIiwibWl4aW5TcFByb3BlcnRpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxPOzs7QUFDcEIsa0JBQVlDLElBQVosRUFBaUI7QUFBQTs7QUFBQSxpSEFDUEMsU0FETzs7QUFFaEIsUUFBS0MsUUFBTCxHQUFjRixJQUFkO0FBRmdCO0FBR2hCOzs7OztrQkFKbUJELE87OztBQU9yQixJQUFJSSxTQUFPLElBQVg7O0FBRUFKLFFBQVFLLFVBQVI7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBLG9DQU9tQkMsQ0FQbkIsRUFPcUI7QUFDbkIsVUFBTywySEFBMkJKLFNBQTNCLEVBQ0xLLE1BREssQ0FDRSxLQUFLTixJQUFMLENBQVVPLEVBQVYsQ0FBYSxNQUFiLEVBQXFCQyxVQUFyQixDQUFnQ0MsT0FBaEMsRUFERixDQUFQO0FBRUE7QUFWRjtBQUFBO0FBQUEsc0JBQ29CO0FBQ2xCLE9BQUcsQ0FBQ04sTUFBSixFQUNDQSxTQUFPTyxPQUFPQyxNQUFQLENBQWMsRUFBZCxFQUFpQixrQkFBUVAsVUFBUixDQUFtQkQsTUFBcEMsRUFBMkMsa0JBQVFTLFlBQVIsQ0FBcUJULE1BQWhFLENBQVA7QUFDRCxVQUFPQSxNQUFQO0FBQ0E7QUFMRjs7QUFBQTtBQUFBLEVBQTRDLGtCQUFRQyxVQUFwRDs7QUFjQUwsUUFBUUssVUFBUixDQUFtQlMsaUJBQW5CIiwiZmlsZSI6ImdyYXBoaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRHJhd2luZyBmcm9tICcuL2RyYXdpbmcnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHcmFwaGljIGV4dGVuZHMgRHJhd2luZ3tcclxuXHRjb25zdHJ1Y3Rvcih3WG1sKXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMud0RyYXdpbmc9d1htbFxyXG5cdH1cclxufVxyXG5cclxudmFyIG5hbWluZz1udWxsO1xyXG5cclxuR3JhcGhpYy5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyBEcmF3aW5nLlByb3BlcnRpZXN7XHJcblx0c3RhdGljIGdldCBuYW1pbmcoKXtcclxuXHRcdGlmKCFuYW1pbmcpXHJcblx0XHRcdG5hbWluZz1PYmplY3QuYXNzaWduKHt9LERyYXdpbmcuUHJvcGVydGllcy5uYW1pbmcsRHJhd2luZy5TcFByb3BlcnRpZXMubmFtaW5nKVxyXG5cdFx0cmV0dXJuIG5hbWluZ1xyXG5cdH1cclxuXHRcclxuXHRfZ2V0VmFsaWRDaGlsZHJlbih0KXtcclxuXHRcdHJldHVybiBzdXBlci5fZ2V0VmFsaWRDaGlsZHJlbiguLi5hcmd1bWVudHMpXHJcblx0XHRcdC5jb25jYXQodGhpcy53WG1sLiQxKCdzcFByJykuY2hpbGROb2Rlcy5hc0FycmF5KCkpXHJcblx0fVxyXG59XHJcblxyXG5cclxuR3JhcGhpYy5Qcm9wZXJ0aWVzLm1peGluU3BQcm9wZXJ0aWVzKCkiXX0=