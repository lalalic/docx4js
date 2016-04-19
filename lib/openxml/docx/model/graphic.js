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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Graphic).apply(this, arguments));

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: '_getValidChildren',
		value: function _getValidChildren(t) {
			return _get(Object.getPrototypeOf(Properties.prototype), '_getValidChildren', this).apply(this, arguments).concat(this.wXml.$1('spPr').childNodes.asArray());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7O0FBQ3BCLFVBRG9CLE9BQ3BCLENBQVksSUFBWixFQUFpQjt3QkFERyxTQUNIOztxRUFERyxxQkFFVixZQURPOztBQUVoQixRQUFLLFFBQUwsR0FBYyxJQUFkLENBRmdCOztFQUFqQjs7UUFEb0I7Ozs7OztBQU9yQixJQUFJLFNBQU8sSUFBUDs7QUFFSixRQUFRLFVBQVI7V0FBeUI7Ozs7Ozs7Ozs7b0NBT04sR0FBRTtBQUNuQixVQUFPLDJCQVJnQiw4REFRVyxVQUEzQixDQUNMLE1BREssQ0FDRSxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsTUFBYixFQUFxQixVQUFyQixDQUFnQyxPQUFoQyxFQURGLENBQVAsQ0FEbUI7Ozs7c0JBTkQ7QUFDbEIsT0FBRyxDQUFDLE1BQUQsRUFDRixTQUFPLE9BQU8sTUFBUCxDQUFjLEVBQWQsRUFBaUIsa0JBQVEsVUFBUixDQUFtQixNQUFuQixFQUEwQixrQkFBUSxZQUFSLENBQXFCLE1BQXJCLENBQWxELENBREQ7QUFFQSxVQUFPLE1BQVAsQ0FIa0I7Ozs7UUFESztFQUFtQixrQkFBUSxVQUFSLENBQTVDOztBQWNBLFFBQVEsVUFBUixDQUFtQixpQkFBbkIiLCJmaWxlIjoiZ3JhcGhpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEcmF3aW5nIGZyb20gJy4vZHJhd2luZydcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR3JhcGhpYyBleHRlbmRzIERyYXdpbmd7XG5cdGNvbnN0cnVjdG9yKHdYbWwpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLndEcmF3aW5nPXdYbWxcblx0fVxufVxuXG52YXIgbmFtaW5nPW51bGw7XG5cbkdyYXBoaWMuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgRHJhd2luZy5Qcm9wZXJ0aWVze1xuXHRzdGF0aWMgZ2V0IG5hbWluZygpe1xuXHRcdGlmKCFuYW1pbmcpXG5cdFx0XHRuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLERyYXdpbmcuU3BQcm9wZXJ0aWVzLm5hbWluZylcblx0XHRyZXR1cm4gbmFtaW5nXG5cdH1cblx0XG5cdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xuXHRcdHJldHVybiBzdXBlci5fZ2V0VmFsaWRDaGlsZHJlbiguLi5hcmd1bWVudHMpXG5cdFx0XHQuY29uY2F0KHRoaXMud1htbC4kMSgnc3BQcicpLmNoaWxkTm9kZXMuYXNBcnJheSgpKVxuXHR9XG59XG5cblxuR3JhcGhpYy5Qcm9wZXJ0aWVzLm1peGluU3BQcm9wZXJ0aWVzKCkiXX0=