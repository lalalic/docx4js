'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _factory = require('./factory');

var _factory2 = _interopRequireDefault(_factory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var model = function (_require) {
	_inherits(model, _require);

	function model(wXml, wDoc, mParent) {
		_classCallCheck(this, model);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(model).apply(this, arguments));

		_this.mParent = mParent;
		_this.content = [];
		if (mParent) mParent.content.push(_this);
		_this.type = _this.constructor.type;
		return _this;
	}

	_createClass(model, [{
		key: 'parse',
		value: function parse(visitFactories) {
			var _this2 = this;

			var visitors = [];
			var paramizedVisitFactories = [];
			$.map(visitFactories, function (visitFactory) {
				var visitor = visitFactory(this);
				if (visitor && visitor.visit() !== false) {
					visitors.push(visitor);
					paramizedVisitFactories.push(visitFactory.with(visitor));
				}
			}.bind(this));

			if (visitors.length > 0) {
				this._iterate(function (wXml) {
					return (0, _factory2.default)(wXml, _this2.wDoc, _this2).parse(paramizedVisitFactories);
				}, paramizedVisitFactories, visitors);
			}

			return visitors;
		}
	}, {
		key: '_iterate',
		value: function _iterate(f, paramizedVisitFactories) {
			for (var i = 0, children = this._getValidChildren(), l = children ? children.length : 0; i < l; i++) {
				!this._shouldIgnore(children[i]) && f(children[i]);
			}
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.childNodes;
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return false;
		}
	}, {
		key: '_attr',
		value: function _attr(selector, key) {
			var n = arguments.length == 1 ? (key = selector, this.wXml) : this.wXml.$1(selector);
			return n ? n.attr(key) : null;
		}
	}, {
		key: '_val',
		value: function _val(selector) {
			return this._attr(selector, 'w:val');
		}
	}]);

	return model;
}(require('../parser'));

exports.default = model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxJQUFaLEVBQWlCLElBQWpCLEVBQXNCLE9BQXRCLEVBQThCO3dCQURWLE9BQ1U7O3FFQURWLG1CQUVWLFlBRG9COztBQUU3QixRQUFLLE9BQUwsR0FBYSxPQUFiLENBRjZCO0FBRzdCLFFBQUssT0FBTCxHQUFhLEVBQWIsQ0FINkI7QUFJN0IsTUFBRyxPQUFILEVBQ0MsUUFBUSxPQUFSLENBQWdCLElBQWhCLFFBREQ7QUFFQSxRQUFLLElBQUwsR0FBVSxNQUFLLFdBQUwsQ0FBaUIsSUFBakIsQ0FObUI7O0VBQTlCOztjQURvQjs7d0JBU2QsZ0JBQWU7OztBQUNwQixPQUFJLFdBQVMsRUFBVCxDQURnQjtBQUVwQixPQUFJLDBCQUF3QixFQUF4QixDQUZnQjtBQUdwQixLQUFFLEdBQUYsQ0FBTSxjQUFOLEVBQXNCLFVBQVMsWUFBVCxFQUFzQjtBQUMzQyxRQUFJLFVBQVEsYUFBYSxJQUFiLENBQVIsQ0FEdUM7QUFFM0MsUUFBRyxXQUFXLFFBQVEsS0FBUixPQUFrQixLQUFsQixFQUF3QjtBQUNyQyxjQUFTLElBQVQsQ0FBYyxPQUFkLEVBRHFDO0FBRXJDLDZCQUF3QixJQUF4QixDQUE2QixhQUFhLElBQWIsQ0FBa0IsT0FBbEIsQ0FBN0IsRUFGcUM7S0FBdEM7SUFGcUIsQ0FNcEIsSUFOb0IsQ0FNZixJQU5lLENBQXRCLEVBSG9COztBQVdwQixPQUFHLFNBQVMsTUFBVCxHQUFnQixDQUFoQixFQUFrQjtBQUNwQixTQUFLLFFBQUwsQ0FDQyxVQUFDLElBQUQ7WUFBUSx1QkFBUSxJQUFSLEVBQWEsT0FBSyxJQUFMLFFBQWIsRUFBNkIsS0FBN0IsQ0FBbUMsdUJBQW5DO0tBQVIsRUFDQyx1QkFGRixFQUUyQixRQUYzQixFQURvQjtJQUFyQjs7QUFNQSxVQUFPLFFBQVAsQ0FqQm9COzs7OzJCQW1CWixHQUFFLHlCQUF3QjtBQUNsQyxRQUFJLElBQUksSUFBRSxDQUFGLEVBQUksV0FBUyxLQUFLLGlCQUFMLEVBQVQsRUFBa0MsSUFBRSxXQUFTLFNBQVMsTUFBVCxHQUFnQixDQUF6QixFQUE0QixJQUFFLENBQUYsRUFBSyxHQUFqRjtBQUNDLEtBQUUsS0FBSyxhQUFMLENBQW1CLFNBQVMsQ0FBVCxDQUFuQixDQUFELElBQXFDLEVBQUUsU0FBUyxDQUFULENBQUYsQ0FBdEM7SUFERDs7OztzQ0FHa0I7QUFDbEIsVUFBTyxLQUFLLElBQUwsQ0FBVSxVQUFWLENBRFc7Ozs7Z0NBR0wsTUFBSztBQUNsQixVQUFPLEtBQVAsQ0FEa0I7Ozs7d0JBR2IsVUFBVSxLQUFJO0FBQ25CLE9BQUksSUFBRSxVQUFVLE1BQVYsSUFBa0IsQ0FBbEIsSUFBdUIsTUFBSSxRQUFKLEVBQWMsS0FBSyxJQUFMLENBQXJDLEdBQWtELEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxRQUFiLENBQWxELENBRGE7QUFFbkIsVUFBTyxJQUFJLEVBQUUsSUFBRixDQUFPLEdBQVAsQ0FBSixHQUFrQixJQUFsQixDQUZZOzs7O3VCQUlmLFVBQVM7QUFDYixVQUFPLEtBQUssS0FBTCxDQUFXLFFBQVgsRUFBb0IsT0FBcEIsQ0FBUCxDQURhOzs7O1FBMUNNO0VBQWMsUUFBUSxXQUFSOztrQkFBZCIsImZpbGUiOiJtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmYWN0b3J5IGZyb20gXCIuL2ZhY3RvcnlcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBtb2RlbCBleHRlbmRzIHJlcXVpcmUoJy4uL3BhcnNlcicpe1xuXHRjb25zdHJ1Y3Rvcih3WG1sLHdEb2MsbVBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubVBhcmVudD1tUGFyZW50XG5cdFx0dGhpcy5jb250ZW50PVtdXG5cdFx0aWYobVBhcmVudClcblx0XHRcdG1QYXJlbnQuY29udGVudC5wdXNoKHRoaXMpXG5cdFx0dGhpcy50eXBlPXRoaXMuY29uc3RydWN0b3IudHlwZVxuXHR9XG5cdHBhcnNlKHZpc2l0RmFjdG9yaWVzKXtcblx0XHR2YXIgdmlzaXRvcnM9W11cblx0XHR2YXIgcGFyYW1pemVkVmlzaXRGYWN0b3JpZXM9W107XG5cdFx0JC5tYXAodmlzaXRGYWN0b3JpZXMsIGZ1bmN0aW9uKHZpc2l0RmFjdG9yeSl7XG5cdFx0XHR2YXIgdmlzaXRvcj12aXNpdEZhY3RvcnkodGhpcylcblx0XHRcdGlmKHZpc2l0b3IgJiYgdmlzaXRvci52aXNpdCgpIT09ZmFsc2Upe1xuXHRcdFx0XHR2aXNpdG9ycy5wdXNoKHZpc2l0b3IpXG5cdFx0XHRcdHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzLnB1c2godmlzaXRGYWN0b3J5LndpdGgodmlzaXRvcikpXG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmKHZpc2l0b3JzLmxlbmd0aD4wKXtcblx0XHRcdHRoaXMuX2l0ZXJhdGUoXG5cdFx0XHRcdCh3WG1sKT0+ZmFjdG9yeSh3WG1sLHRoaXMud0RvYyx0aGlzKS5wYXJzZShwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcylcblx0XHRcdFx0LHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzLCB2aXNpdG9ycylcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlzaXRvcnNcblx0fVxuXHRfaXRlcmF0ZShmLHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLl9nZXRWYWxpZENoaWxkcmVuKCksbD1jaGlsZHJlbj9jaGlsZHJlbi5sZW5ndGg6MDsgaTxsOyBpKyspXG5cdFx0XHQoIXRoaXMuX3Nob3VsZElnbm9yZShjaGlsZHJlbltpXSkpICYmIGYoY2hpbGRyZW5baV0pXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmNoaWxkTm9kZXNcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdF9hdHRyKHNlbGVjdG9yLCBrZXkpe1xuXHRcdHZhciBuPWFyZ3VtZW50cy5sZW5ndGg9PTEgPyAoa2V5PXNlbGVjdG9yLCB0aGlzLndYbWwpIDogdGhpcy53WG1sLiQxKHNlbGVjdG9yKVxuXHRcdHJldHVybiBuID8gbi5hdHRyKGtleSkgOiBudWxsXG5cdH1cblx0X3ZhbChzZWxlY3Rvcil7XG5cdFx0cmV0dXJuIHRoaXMuX2F0dHIoc2VsZWN0b3IsJ3c6dmFsJylcblx0fVxuXG59XG4iXX0=