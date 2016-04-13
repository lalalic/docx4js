'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _drawing = require('./drawing');

var _drawing2 = _interopRequireDefault(_drawing);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var graphic = function (_Drawing) {
	_inherits(graphic, _Drawing);

	function graphic(wXml) {
		_classCallCheck(this, graphic);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(graphic).apply(this, arguments));

		_this.wDrawing = wXml;
		return _this;
	}

	_createClass(graphic, null, [{
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return graphic;
}(_drawing2.default);

exports.default = graphic;


var naming = Object.assign({}, _drawing2.default.Properties.naming, _drawing2.default.SpProperties.naming);

var Properties = function (_Drawing$Properties) {
	_inherits(Properties, _Drawing$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, null, [{
		key: 'naming',
		get: function get() {
			return naming;
		}
	}]);

	return Properties;
}(_drawing2.default.Properties);

Object.assign(Properties.prototype, _drawing2.default.SpProperties.prototype, {
	_getValidChildren: function _getValidChildren(t) {
		var _Drawing$Properties$p;

		return (_Drawing$Properties$p = _drawing2.default.Properties.prototype._getValidChildren).call.apply(_Drawing$Properties$p, [this].concat(Array.prototype.slice.call(arguments))).concat(this.wXml.$1('spPr').childNodes.asArray());
	}
});
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZ3JhcGhpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixDQUFZLElBQVosRUFBaUI7d0JBREcsU0FDSDs7cUVBREcscUJBRVYsWUFETzs7QUFFaEIsUUFBSyxRQUFMLEdBQWMsSUFBZCxDQUZnQjs7RUFBakI7O2NBRG9COztzQkFNRztBQUFDLFVBQU8sVUFBUCxDQUFEOzs7O1FBTkg7Ozs7OztBQVNyQixJQUFJLFNBQU8sT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixrQkFBUSxVQUFSLENBQW1CLE1BQW5CLEVBQTBCLGtCQUFRLFlBQVIsQ0FBcUIsTUFBckIsQ0FBbEQ7O0lBRUU7Ozs7Ozs7Ozs7O3NCQUNjO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFEZDtFQUFtQixrQkFBUSxVQUFSOztBQUl6QixPQUFPLE1BQVAsQ0FBYyxXQUFXLFNBQVgsRUFBcUIsa0JBQVEsWUFBUixDQUFxQixTQUFyQixFQUErQjtBQUNqRSwrQ0FBa0IsR0FBRTs7O0FBQ25CLFNBQU8sMkNBQVEsVUFBUixDQUFtQixTQUFuQixDQUE2QixpQkFBN0IsRUFBK0MsSUFBL0MsK0JBQW9ELHdDQUFRLFdBQTVELEVBQ0wsTUFESyxDQUNFLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFVBQXJCLENBQWdDLE9BQWhDLEVBREYsQ0FBUCxDQURtQjtFQUQ2QztDQUFsRSIsImZpbGUiOiJncmFwaGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERyYXdpbmcgZnJvbSAnLi9kcmF3aW5nJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBncmFwaGljIGV4dGVuZHMgRHJhd2luZ3tcblx0Y29uc3RydWN0b3Iod1htbCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMud0RyYXdpbmc9d1htbFxuXHR9XG5cblx0c3RhdGljIGdldCBQcm9wZXJ0aWVzKCl7cmV0dXJuIFByb3BlcnRpZXN9XG59XG5cbnZhciBuYW1pbmc9T2JqZWN0LmFzc2lnbih7fSxEcmF3aW5nLlByb3BlcnRpZXMubmFtaW5nLERyYXdpbmcuU3BQcm9wZXJ0aWVzLm5hbWluZylcblxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIERyYXdpbmcuUHJvcGVydGllc3tcblx0c3RhdGljIGdldCBuYW1pbmcoKXtyZXR1cm4gbmFtaW5nfVxufVxuXG5PYmplY3QuYXNzaWduKFByb3BlcnRpZXMucHJvdG90eXBlLERyYXdpbmcuU3BQcm9wZXJ0aWVzLnByb3RvdHlwZSx7XG5cdF9nZXRWYWxpZENoaWxkcmVuKHQpe1xuXHRcdHJldHVybiBEcmF3aW5nLlByb3BlcnRpZXMucHJvdG90eXBlLl9nZXRWYWxpZENoaWxkcmVuLmNhbGwodGhpcywuLi5hcmd1bWVudHMpXG5cdFx0XHQuY29uY2F0KHRoaXMud1htbC4kMSgnc3BQcicpLmNoaWxkTm9kZXMuYXNBcnJheSgpKVxuXHR9XG59KVxuIl19