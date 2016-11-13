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

		var _this = _possibleConstructorReturn(this, (model.__proto__ || Object.getPrototypeOf(model)).apply(this, arguments));

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
				(function () {
					var factory = _this2.wDoc.factory.bind(_this2.wDoc);
					_this2._iterate(function (wXml) {
						return factory(wXml, _this2.wDoc, _this2).parse(paramizedVisitFactories);
					}, paramizedVisitFactories, visitors);
				})();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwuanMiXSwibmFtZXMiOlsibW9kZWwiLCJ3WG1sIiwid0RvYyIsIm1QYXJlbnQiLCJhcmd1bWVudHMiLCJjb250ZW50IiwicHVzaCIsInR5cGUiLCJjb25zdHJ1Y3RvciIsInZpc2l0RmFjdG9yaWVzIiwidmlzaXRvcnMiLCJwYXJhbWl6ZWRWaXNpdEZhY3RvcmllcyIsIiQiLCJtYXAiLCJ2aXNpdEZhY3RvcnkiLCJ2aXNpdG9yIiwidmlzaXQiLCJ3aXRoIiwiYmluZCIsImxlbmd0aCIsImZhY3RvcnkiLCJfaXRlcmF0ZSIsInBhcnNlIiwiZiIsImkiLCJjaGlsZHJlbiIsIl9nZXRWYWxpZENoaWxkcmVuIiwibCIsIl9zaG91bGRJZ25vcmUiLCJjaGlsZE5vZGVzIiwic2VsZWN0b3IiLCJrZXkiLCJuIiwiJDEiLCJhdHRyIiwiX2F0dHIiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQkEsSzs7O0FBQ3BCLGdCQUFZQyxJQUFaLEVBQWlCQyxJQUFqQixFQUFzQkMsT0FBdEIsRUFBOEI7QUFBQTs7QUFBQSw2R0FDcEJDLFNBRG9COztBQUU3QixRQUFLRCxPQUFMLEdBQWFBLE9BQWI7QUFDQSxRQUFLRSxPQUFMLEdBQWEsRUFBYjtBQUNBLE1BQUdGLE9BQUgsRUFDQ0EsUUFBUUUsT0FBUixDQUFnQkMsSUFBaEI7QUFDRCxRQUFLQyxJQUFMLEdBQVUsTUFBS0MsV0FBTCxDQUFpQkQsSUFBM0I7QUFONkI7QUFPN0I7Ozs7d0JBQ0tFLGMsRUFBZTtBQUFBOztBQUNwQixPQUFJQyxXQUFTLEVBQWI7QUFDQSxPQUFJQywwQkFBd0IsRUFBNUI7QUFDQUMsS0FBRUMsR0FBRixDQUFNSixjQUFOLEVBQXNCLFVBQVNLLFlBQVQsRUFBc0I7QUFDM0MsUUFBSUMsVUFBUUQsYUFBYSxJQUFiLENBQVo7QUFDQSxRQUFHQyxXQUFXQSxRQUFRQyxLQUFSLE9BQWtCLEtBQWhDLEVBQXNDO0FBQ3JDTixjQUFTSixJQUFULENBQWNTLE9BQWQ7QUFDQUosNkJBQXdCTCxJQUF4QixDQUE2QlEsYUFBYUcsSUFBYixDQUFrQkYsT0FBbEIsQ0FBN0I7QUFDQTtBQUNELElBTnFCLENBTXBCRyxJQU5vQixDQU1mLElBTmUsQ0FBdEI7O0FBUUEsT0FBR1IsU0FBU1MsTUFBVCxHQUFnQixDQUFuQixFQUFxQjtBQUFBO0FBQ3BCLFNBQUlDLFVBQVEsT0FBS2xCLElBQUwsQ0FBVWtCLE9BQVYsQ0FBa0JGLElBQWxCLENBQXVCLE9BQUtoQixJQUE1QixDQUFaO0FBQ0EsWUFBS21CLFFBQUwsQ0FDQyxVQUFDcEIsSUFBRDtBQUFBLGFBQVFtQixRQUFRbkIsSUFBUixFQUFhLE9BQUtDLElBQWxCLFVBQTZCb0IsS0FBN0IsQ0FBbUNYLHVCQUFuQyxDQUFSO0FBQUEsTUFERCxFQUVFQSx1QkFGRixFQUUyQkQsUUFGM0I7QUFGb0I7QUFLcEI7O0FBRUQsVUFBT0EsUUFBUDtBQUNBOzs7MkJBQ1FhLEMsRUFBRVosdUIsRUFBd0I7QUFDbEMsUUFBSSxJQUFJYSxJQUFFLENBQU4sRUFBUUMsV0FBUyxLQUFLQyxpQkFBTCxFQUFqQixFQUEwQ0MsSUFBRUYsV0FBU0EsU0FBU04sTUFBbEIsR0FBeUIsQ0FBekUsRUFBNEVLLElBQUVHLENBQTlFLEVBQWlGSCxHQUFqRjtBQUNFLEtBQUMsS0FBS0ksYUFBTCxDQUFtQkgsU0FBU0QsQ0FBVCxDQUFuQixDQUFGLElBQXNDRCxFQUFFRSxTQUFTRCxDQUFULENBQUYsQ0FBdEM7QUFERDtBQUVBOzs7c0NBQ2tCO0FBQ2xCLFVBQU8sS0FBS3ZCLElBQUwsQ0FBVTRCLFVBQWpCO0FBQ0E7OztnQ0FDYTVCLEksRUFBSztBQUNsQixVQUFPLEtBQVA7QUFDQTs7O3dCQUNLNkIsUSxFQUFVQyxHLEVBQUk7QUFDbkIsT0FBSUMsSUFBRTVCLFVBQVVlLE1BQVYsSUFBa0IsQ0FBbEIsSUFBdUJZLE1BQUlELFFBQUosRUFBYyxLQUFLN0IsSUFBMUMsSUFBa0QsS0FBS0EsSUFBTCxDQUFVZ0MsRUFBVixDQUFhSCxRQUFiLENBQXhEO0FBQ0EsVUFBT0UsSUFBSUEsRUFBRUUsSUFBRixDQUFPSCxHQUFQLENBQUosR0FBa0IsSUFBekI7QUFDQTs7O3VCQUNJRCxRLEVBQVM7QUFDYixVQUFPLEtBQUtLLEtBQUwsQ0FBV0wsUUFBWCxFQUFvQixPQUFwQixDQUFQO0FBQ0E7Ozs7RUE3Q2lDTSxRQUFRLFdBQVIsQzs7a0JBQWRwQyxLIiwiZmlsZSI6Im1vZGVsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgbW9kZWwgZXh0ZW5kcyByZXF1aXJlKCcuLi9wYXJzZXInKXtcblx0Y29uc3RydWN0b3Iod1htbCx3RG9jLG1QYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR0aGlzLm1QYXJlbnQ9bVBhcmVudFxuXHRcdHRoaXMuY29udGVudD1bXVxuXHRcdGlmKG1QYXJlbnQpXG5cdFx0XHRtUGFyZW50LmNvbnRlbnQucHVzaCh0aGlzKVxuXHRcdHRoaXMudHlwZT10aGlzLmNvbnN0cnVjdG9yLnR5cGVcblx0fVxuXHRwYXJzZSh2aXNpdEZhY3Rvcmllcyl7XG5cdFx0dmFyIHZpc2l0b3JzPVtdXG5cdFx0dmFyIHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzPVtdO1xuXHRcdCQubWFwKHZpc2l0RmFjdG9yaWVzLCBmdW5jdGlvbih2aXNpdEZhY3Rvcnkpe1xuXHRcdFx0dmFyIHZpc2l0b3I9dmlzaXRGYWN0b3J5KHRoaXMpXG5cdFx0XHRpZih2aXNpdG9yICYmIHZpc2l0b3IudmlzaXQoKSE9PWZhbHNlKXtcblx0XHRcdFx0dmlzaXRvcnMucHVzaCh2aXNpdG9yKVxuXHRcdFx0XHRwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcy5wdXNoKHZpc2l0RmFjdG9yeS53aXRoKHZpc2l0b3IpKVxuXHRcdFx0fVxuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0XHRpZih2aXNpdG9ycy5sZW5ndGg+MCl7XG5cdFx0XHRsZXQgZmFjdG9yeT10aGlzLndEb2MuZmFjdG9yeS5iaW5kKHRoaXMud0RvYylcblx0XHRcdHRoaXMuX2l0ZXJhdGUoXG5cdFx0XHRcdCh3WG1sKT0+ZmFjdG9yeSh3WG1sLHRoaXMud0RvYyx0aGlzKS5wYXJzZShwYXJhbWl6ZWRWaXNpdEZhY3Rvcmllcylcblx0XHRcdFx0LHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzLCB2aXNpdG9ycylcblx0XHR9XG5cblx0XHRyZXR1cm4gdmlzaXRvcnNcblx0fVxuXHRfaXRlcmF0ZShmLHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLl9nZXRWYWxpZENoaWxkcmVuKCksbD1jaGlsZHJlbj9jaGlsZHJlbi5sZW5ndGg6MDsgaTxsOyBpKyspXG5cdFx0XHQoIXRoaXMuX3Nob3VsZElnbm9yZShjaGlsZHJlbltpXSkpICYmIGYoY2hpbGRyZW5baV0pXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmNoaWxkTm9kZXNcblx0fVxuXHRfc2hvdWxkSWdub3JlKHdYbWwpe1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdF9hdHRyKHNlbGVjdG9yLCBrZXkpe1xuXHRcdHZhciBuPWFyZ3VtZW50cy5sZW5ndGg9PTEgPyAoa2V5PXNlbGVjdG9yLCB0aGlzLndYbWwpIDogdGhpcy53WG1sLiQxKHNlbGVjdG9yKVxuXHRcdHJldHVybiBuID8gbi5hdHRyKGtleSkgOiBudWxsXG5cdH1cblx0X3ZhbChzZWxlY3Rvcil7XG5cdFx0cmV0dXJuIHRoaXMuX2F0dHIoc2VsZWN0b3IsJ3c6dmFsJylcblx0fVxuXG59XG4iXX0=