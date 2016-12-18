"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tool = require("../../tool");

var _tool2 = _interopRequireDefault(_tool);

var _parser = require("../parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var model = function (_Parser) {
	_inherits(model, _Parser);

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
		key: "parse",
		value: function parse(visitFactories) {
			var _this2 = this;

			var visitors = [];
			var paramizedVisitFactories = [];
			_tool2.default.map(visitFactories, function (visitFactory) {
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
		key: "_iterate",
		value: function _iterate(f, paramizedVisitFactories) {
			for (var i = 0, children = this._getValidChildren(), l = children ? children.length : 0; i < l; i++) {
				!this._shouldIgnore(children[i]) && f(children[i]);
			}
		}
	}, {
		key: "_getValidChildren",
		value: function _getValidChildren() {
			return this.wXml.childNodes;
		}
	}, {
		key: "_shouldIgnore",
		value: function _shouldIgnore(wXml) {
			return false;
		}
	}, {
		key: "_attr",
		value: function _attr(selector, key) {
			var n = arguments.length == 1 ? (key = selector, this.wXml) : this.wXml.$1(selector);
			return n ? n.attr(key) : null;
		}
	}, {
		key: "_val",
		value: function _val(selector) {
			return this._attr(selector, 'w:val');
		}
	}]);

	return model;
}(_parser2.default);

exports.default = model;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwuanMiXSwibmFtZXMiOlsibW9kZWwiLCJ3WG1sIiwid0RvYyIsIm1QYXJlbnQiLCJhcmd1bWVudHMiLCJjb250ZW50IiwicHVzaCIsInR5cGUiLCJjb25zdHJ1Y3RvciIsInZpc2l0RmFjdG9yaWVzIiwidmlzaXRvcnMiLCJwYXJhbWl6ZWRWaXNpdEZhY3RvcmllcyIsIm1hcCIsInZpc2l0RmFjdG9yeSIsInZpc2l0b3IiLCJ2aXNpdCIsIndpdGgiLCJiaW5kIiwibGVuZ3RoIiwiZmFjdG9yeSIsIl9pdGVyYXRlIiwicGFyc2UiLCJmIiwiaSIsImNoaWxkcmVuIiwiX2dldFZhbGlkQ2hpbGRyZW4iLCJsIiwiX3Nob3VsZElnbm9yZSIsImNoaWxkTm9kZXMiLCJzZWxlY3RvciIsImtleSIsIm4iLCIkMSIsImF0dHIiLCJfYXR0ciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLEs7OztBQUNwQixnQkFBWUMsSUFBWixFQUFpQkMsSUFBakIsRUFBc0JDLE9BQXRCLEVBQThCO0FBQUE7O0FBQUEsNkdBQ3BCQyxTQURvQjs7QUFFN0IsUUFBS0QsT0FBTCxHQUFhQSxPQUFiO0FBQ0EsUUFBS0UsT0FBTCxHQUFhLEVBQWI7QUFDQSxNQUFHRixPQUFILEVBQ0NBLFFBQVFFLE9BQVIsQ0FBZ0JDLElBQWhCO0FBQ0QsUUFBS0MsSUFBTCxHQUFVLE1BQUtDLFdBQUwsQ0FBaUJELElBQTNCO0FBTjZCO0FBTzdCOzs7O3dCQUNLRSxjLEVBQWU7QUFBQTs7QUFDcEIsT0FBSUMsV0FBUyxFQUFiO0FBQ0EsT0FBSUMsMEJBQXdCLEVBQTVCO0FBQ0Esa0JBQUVDLEdBQUYsQ0FBTUgsY0FBTixFQUFzQixVQUFTSSxZQUFULEVBQXNCO0FBQzNDLFFBQUlDLFVBQVFELGFBQWEsSUFBYixDQUFaO0FBQ0EsUUFBR0MsV0FBV0EsUUFBUUMsS0FBUixPQUFrQixLQUFoQyxFQUFzQztBQUNyQ0wsY0FBU0osSUFBVCxDQUFjUSxPQUFkO0FBQ0FILDZCQUF3QkwsSUFBeEIsQ0FBNkJPLGFBQWFHLElBQWIsQ0FBa0JGLE9BQWxCLENBQTdCO0FBQ0E7QUFDRCxJQU5xQixDQU1wQkcsSUFOb0IsQ0FNZixJQU5lLENBQXRCOztBQVFBLE9BQUdQLFNBQVNRLE1BQVQsR0FBZ0IsQ0FBbkIsRUFBcUI7QUFBQTtBQUNwQixTQUFJQyxVQUFRLE9BQUtqQixJQUFMLENBQVVpQixPQUFWLENBQWtCRixJQUFsQixDQUF1QixPQUFLZixJQUE1QixDQUFaO0FBQ0EsWUFBS2tCLFFBQUwsQ0FDQyxVQUFDbkIsSUFBRDtBQUFBLGFBQVFrQixRQUFRbEIsSUFBUixFQUFhLE9BQUtDLElBQWxCLFVBQTZCbUIsS0FBN0IsQ0FBbUNWLHVCQUFuQyxDQUFSO0FBQUEsTUFERCxFQUVFQSx1QkFGRixFQUUyQkQsUUFGM0I7QUFGb0I7QUFLcEI7O0FBRUQsVUFBT0EsUUFBUDtBQUNBOzs7MkJBQ1FZLEMsRUFBRVgsdUIsRUFBd0I7QUFDbEMsUUFBSSxJQUFJWSxJQUFFLENBQU4sRUFBUUMsV0FBUyxLQUFLQyxpQkFBTCxFQUFqQixFQUEwQ0MsSUFBRUYsV0FBU0EsU0FBU04sTUFBbEIsR0FBeUIsQ0FBekUsRUFBNEVLLElBQUVHLENBQTlFLEVBQWlGSCxHQUFqRjtBQUNFLEtBQUMsS0FBS0ksYUFBTCxDQUFtQkgsU0FBU0QsQ0FBVCxDQUFuQixDQUFGLElBQXNDRCxFQUFFRSxTQUFTRCxDQUFULENBQUYsQ0FBdEM7QUFERDtBQUVBOzs7c0NBQ2tCO0FBQ2xCLFVBQU8sS0FBS3RCLElBQUwsQ0FBVTJCLFVBQWpCO0FBQ0E7OztnQ0FDYTNCLEksRUFBSztBQUNsQixVQUFPLEtBQVA7QUFDQTs7O3dCQUNLNEIsUSxFQUFVQyxHLEVBQUk7QUFDbkIsT0FBSUMsSUFBRTNCLFVBQVVjLE1BQVYsSUFBa0IsQ0FBbEIsSUFBdUJZLE1BQUlELFFBQUosRUFBYyxLQUFLNUIsSUFBMUMsSUFBa0QsS0FBS0EsSUFBTCxDQUFVK0IsRUFBVixDQUFhSCxRQUFiLENBQXhEO0FBQ0EsVUFBT0UsSUFBSUEsRUFBRUUsSUFBRixDQUFPSCxHQUFQLENBQUosR0FBa0IsSUFBekI7QUFDQTs7O3VCQUNJRCxRLEVBQVM7QUFDYixVQUFPLEtBQUtLLEtBQUwsQ0FBV0wsUUFBWCxFQUFvQixPQUFwQixDQUFQO0FBQ0E7Ozs7OztrQkE3Q21CN0IsSyIsImZpbGUiOiJtb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gXCIuLi8uLi90b29sXCJcbmltcG9ydCBQYXJzZXIgZnJvbSBcIi4uL3BhcnNlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIG1vZGVsIGV4dGVuZHMgUGFyc2Vye1xuXHRjb25zdHJ1Y3Rvcih3WG1sLHdEb2MsbVBhcmVudCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMubVBhcmVudD1tUGFyZW50XG5cdFx0dGhpcy5jb250ZW50PVtdXG5cdFx0aWYobVBhcmVudClcblx0XHRcdG1QYXJlbnQuY29udGVudC5wdXNoKHRoaXMpXG5cdFx0dGhpcy50eXBlPXRoaXMuY29uc3RydWN0b3IudHlwZVxuXHR9XG5cdHBhcnNlKHZpc2l0RmFjdG9yaWVzKXtcblx0XHR2YXIgdmlzaXRvcnM9W11cblx0XHR2YXIgcGFyYW1pemVkVmlzaXRGYWN0b3JpZXM9W107XG5cdFx0JC5tYXAodmlzaXRGYWN0b3JpZXMsIGZ1bmN0aW9uKHZpc2l0RmFjdG9yeSl7XG5cdFx0XHR2YXIgdmlzaXRvcj12aXNpdEZhY3RvcnkodGhpcylcblx0XHRcdGlmKHZpc2l0b3IgJiYgdmlzaXRvci52aXNpdCgpIT09ZmFsc2Upe1xuXHRcdFx0XHR2aXNpdG9ycy5wdXNoKHZpc2l0b3IpXG5cdFx0XHRcdHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzLnB1c2godmlzaXRGYWN0b3J5LndpdGgodmlzaXRvcikpXG5cdFx0XHR9XG5cdFx0fS5iaW5kKHRoaXMpKTtcblxuXHRcdGlmKHZpc2l0b3JzLmxlbmd0aD4wKXtcblx0XHRcdGxldCBmYWN0b3J5PXRoaXMud0RvYy5mYWN0b3J5LmJpbmQodGhpcy53RG9jKVxuXHRcdFx0dGhpcy5faXRlcmF0ZShcblx0XHRcdFx0KHdYbWwpPT5mYWN0b3J5KHdYbWwsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHBhcmFtaXplZFZpc2l0RmFjdG9yaWVzKVxuXHRcdFx0XHQscGFyYW1pemVkVmlzaXRGYWN0b3JpZXMsIHZpc2l0b3JzKVxuXHRcdH1cblxuXHRcdHJldHVybiB2aXNpdG9yc1xuXHR9XG5cdF9pdGVyYXRlKGYscGFyYW1pemVkVmlzaXRGYWN0b3JpZXMpe1xuXHRcdGZvcih2YXIgaT0wLGNoaWxkcmVuPXRoaXMuX2dldFZhbGlkQ2hpbGRyZW4oKSxsPWNoaWxkcmVuP2NoaWxkcmVuLmxlbmd0aDowOyBpPGw7IGkrKylcblx0XHRcdCghdGhpcy5fc2hvdWxkSWdub3JlKGNoaWxkcmVuW2ldKSkgJiYgZihjaGlsZHJlbltpXSlcblx0fVxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuY2hpbGROb2Rlc1xuXHR9XG5cdF9zaG91bGRJZ25vcmUod1htbCl7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0X2F0dHIoc2VsZWN0b3IsIGtleSl7XG5cdFx0dmFyIG49YXJndW1lbnRzLmxlbmd0aD09MSA/IChrZXk9c2VsZWN0b3IsIHRoaXMud1htbCkgOiB0aGlzLndYbWwuJDEoc2VsZWN0b3IpXG5cdFx0cmV0dXJuIG4gPyBuLmF0dHIoa2V5KSA6IG51bGxcblx0fVxuXHRfdmFsKHNlbGVjdG9yKXtcblx0XHRyZXR1cm4gdGhpcy5fYXR0cihzZWxlY3Rvciwndzp2YWwnKVxuXHR9XG5cbn1cbiJdfQ==