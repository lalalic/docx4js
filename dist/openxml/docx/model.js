'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
				if (visitor) {
					visitors.push(visitor);
					visitor.visit();
					paramizedVisitFactories.push(visitFactory.with(visitor));
				}
			}.bind(this));

			var factory = require('./factory');
			this._iterate(function (wXml) {
				return factory(wXml, _this2.wDoc, _this2).parse(paramizedVisitFactories);
			}, paramizedVisitFactories, visitors);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFDcUI7OztBQUNwQixVQURvQixLQUNwQixDQUFZLElBQVosRUFBaUIsSUFBakIsRUFBc0IsT0FBdEIsRUFBOEI7d0JBRFYsT0FDVTs7cUVBRFYsbUJBRVYsWUFEb0I7O0FBRTdCLFFBQUssT0FBTCxHQUFhLE9BQWIsQ0FGNkI7QUFHN0IsUUFBSyxPQUFMLEdBQWEsRUFBYixDQUg2QjtBQUk3QixNQUFHLE9BQUgsRUFDQyxRQUFRLE9BQVIsQ0FBZ0IsSUFBaEIsUUFERDtBQUVBLFFBQUssSUFBTCxHQUFVLE1BQUssV0FBTCxDQUFpQixJQUFqQixDQU5tQjs7RUFBOUI7O2NBRG9COzt3QkFTZCxnQkFBZTs7O0FBQ3BCLE9BQUksV0FBUyxFQUFULENBRGdCO0FBRXBCLE9BQUksMEJBQXdCLEVBQXhCLENBRmdCO0FBR3BCLEtBQUUsR0FBRixDQUFNLGNBQU4sRUFBc0IsVUFBUyxZQUFULEVBQXNCO0FBQzNDLFFBQUksVUFBUSxhQUFhLElBQWIsQ0FBUixDQUR1QztBQUUzQyxRQUFHLE9BQUgsRUFBVztBQUNWLGNBQVMsSUFBVCxDQUFjLE9BQWQsRUFEVTtBQUVWLGFBQVEsS0FBUixHQUZVO0FBR1YsNkJBQXdCLElBQXhCLENBQTZCLGFBQWEsSUFBYixDQUFrQixPQUFsQixDQUE3QixFQUhVO0tBQVg7SUFGcUIsQ0FPcEIsSUFQb0IsQ0FPZixJQVBlLENBQXRCLEVBSG9COztBQVlwQixPQUFJLFVBQVEsUUFBUSxXQUFSLENBQVIsQ0FaZ0I7QUFhcEIsUUFBSyxRQUFMLENBQ0MsVUFBQyxJQUFEO1dBQVEsUUFBUSxJQUFSLEVBQWEsT0FBSyxJQUFMLFFBQWIsRUFBNkIsS0FBN0IsQ0FBbUMsdUJBQW5DO0lBQVIsRUFDQyx1QkFGRixFQUUyQixRQUYzQixFQWJvQjtBQWdCcEIsVUFBTyxRQUFQLENBaEJvQjs7OzsyQkFrQlosR0FBRSx5QkFBd0I7QUFDbEMsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLFdBQVMsS0FBSyxpQkFBTCxFQUFULEVBQWtDLElBQUUsV0FBUyxTQUFTLE1BQVQsR0FBZ0IsQ0FBekIsRUFBNEIsSUFBRSxDQUFGLEVBQUssR0FBakY7QUFDQyxLQUFFLEtBQUssYUFBTCxDQUFtQixTQUFTLENBQVQsQ0FBbkIsQ0FBRCxJQUFxQyxFQUFFLFNBQVMsQ0FBVCxDQUFGLENBQXRDO0lBREQ7Ozs7c0NBR2tCO0FBQ2xCLFVBQU8sS0FBSyxJQUFMLENBQVUsVUFBVixDQURXOzs7O2dDQUdMLE1BQUs7QUFDbEIsVUFBTyxLQUFQLENBRGtCOzs7O3dCQUdiLFVBQVUsS0FBSTtBQUNuQixPQUFJLElBQUUsVUFBVSxNQUFWLElBQWtCLENBQWxCLElBQXVCLE1BQUksUUFBSixFQUFjLEtBQUssSUFBTCxDQUFyQyxHQUFrRCxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsUUFBYixDQUFsRCxDQURhO0FBRW5CLFVBQU8sSUFBSSxFQUFFLElBQUYsQ0FBTyxHQUFQLENBQUosR0FBa0IsSUFBbEIsQ0FGWTs7Ozt1QkFJZixVQUFTO0FBQ2IsVUFBTyxLQUFLLEtBQUwsQ0FBVyxRQUFYLEVBQW9CLE9BQXBCLENBQVAsQ0FEYTs7OztRQXpDTTtFQUFjLFFBQVEsV0FBUjs7a0JBQWQiLCJmaWxlIjoibW9kZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vZGVsIGV4dGVuZHMgcmVxdWlyZSgnLi4vcGFyc2VyJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsd0RvYyxtUGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5tUGFyZW50PW1QYXJlbnRcblx0XHR0aGlzLmNvbnRlbnQ9W11cblx0XHRpZihtUGFyZW50KVxuXHRcdFx0bVBhcmVudC5jb250ZW50LnB1c2godGhpcylcblx0XHR0aGlzLnR5cGU9dGhpcy5jb25zdHJ1Y3Rvci50eXBlXG5cdH1cblx0cGFyc2UodmlzaXRGYWN0b3JpZXMpe1xuXHRcdHZhciB2aXNpdG9ycz1bXVxuXHRcdHZhciBwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcz1bXTtcblx0XHQkLm1hcCh2aXNpdEZhY3RvcmllcywgZnVuY3Rpb24odmlzaXRGYWN0b3J5KXtcblx0XHRcdHZhciB2aXNpdG9yPXZpc2l0RmFjdG9yeSh0aGlzKVxuXHRcdFx0aWYodmlzaXRvcil7XG5cdFx0XHRcdHZpc2l0b3JzLnB1c2godmlzaXRvcilcblx0XHRcdFx0dmlzaXRvci52aXNpdCgpXG5cdFx0XHRcdHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzLnB1c2godmlzaXRGYWN0b3J5LndpdGgodmlzaXRvcikpXG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdHZhciBmYWN0b3J5PXJlcXVpcmUoJy4vZmFjdG9yeScpXG5cdFx0dGhpcy5faXRlcmF0ZShcblx0XHRcdCh3WG1sKT0+ZmFjdG9yeSh3WG1sLHRoaXMud0RvYyx0aGlzKS5wYXJzZShwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcylcblx0XHRcdCxwYXJhbWl6ZWRWaXNpdEZhY3RvcmllcywgdmlzaXRvcnMpXG5cdFx0cmV0dXJuIHZpc2l0b3JzXG5cdH1cblx0X2l0ZXJhdGUoZixwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcyl7XG5cdFx0Zm9yKHZhciBpPTAsY2hpbGRyZW49dGhpcy5fZ2V0VmFsaWRDaGlsZHJlbigpLGw9Y2hpbGRyZW4/Y2hpbGRyZW4ubGVuZ3RoOjA7IGk8bDsgaSsrKVxuXHRcdFx0KCF0aGlzLl9zaG91bGRJZ25vcmUoY2hpbGRyZW5baV0pKSAmJiBmKGNoaWxkcmVuW2ldKVxuXHR9XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5jaGlsZE5vZGVzXG5cdH1cblx0X3Nob3VsZElnbm9yZSh3WG1sKXtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRfYXR0cihzZWxlY3Rvciwga2V5KXtcblx0XHR2YXIgbj1hcmd1bWVudHMubGVuZ3RoPT0xID8gKGtleT1zZWxlY3RvciwgdGhpcy53WG1sKSA6IHRoaXMud1htbC4kMShzZWxlY3Rvcilcblx0XHRyZXR1cm4gbiA/IG4uYXR0cihrZXkpIDogbnVsbFxuXHR9XG5cdF92YWwoc2VsZWN0b3Ipe1xuXHRcdHJldHVybiB0aGlzLl9hdHRyKHNlbGVjdG9yLCd3OnZhbCcpXG5cdH1cblxufVxuIl19