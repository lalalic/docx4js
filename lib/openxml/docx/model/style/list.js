'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//<w:numbering><w:num w:numId="1">
var List = function (_require) {
	_inherits(List, _require);

	function List(wXml, wDoc, mParent) {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, wXml, wDoc, mParent));

		_this.id = _this.name = _this.constructor.asStyleId(wXml.attr('w:numId'));
		_this.wDoc.style.set(_this);
		_this.levels = new Map();
		return _this;
	}

	_createClass(List, [{
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			for (var i = 0, children = this.wXml.$('lvlOverride'), l = children.length, t; i < l; i++) {
				t = new this.constructor.Level(children[i], this.wDoc, this);
				this.levels.set(t.level, t);
				t.parse(visitors);
			}
		}
	}, {
		key: 'getParentStyle',
		value: function getParentStyle() {
			var definition = this.wDoc.style.get(require('./numberingDefinition').asStyleId(this.wXml.$1('abstractNumId').attr('w:val')));
			if (definition.link) {
				return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle();
			} else return definition;
		}
	}, {
		key: 'getLabel',
		value: function getLabel() {
			var _getParentStyle;

			return (_getParentStyle = this.getParentStyle()).getLabel.apply(_getParentStyle, arguments);
		}
	}, {
		key: 'getNumId',
		value: function getNumId() {
			return this.wXml.attr('w:numId');
		}
	}], [{
		key: 'asStyleId',
		value: function asStyleId(numId) {
			return '_list' + numId;
		}
	}, {
		key: 'type',
		get: function get() {
			return 'style.list';
		}
	}]);

	return List;
}(require('../style'));

exports.default = List;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0Iiwid1htbCIsIndEb2MiLCJtUGFyZW50IiwiaWQiLCJuYW1lIiwiY29uc3RydWN0b3IiLCJhc1N0eWxlSWQiLCJhdHRyIiwic3R5bGUiLCJzZXQiLCJsZXZlbHMiLCJNYXAiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJpIiwiY2hpbGRyZW4iLCIkIiwibCIsImxlbmd0aCIsInQiLCJMZXZlbCIsImxldmVsIiwicGFyc2UiLCJkZWZpbml0aW9uIiwiZ2V0IiwicmVxdWlyZSIsIiQxIiwibGluayIsImFzTnVtYmVyaW5nU3R5bGUiLCJnZXRQYXJlbnRTdHlsZSIsImdldExhYmVsIiwiYXJndW1lbnRzIiwibnVtSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFDcUJBLEk7OztBQUNwQixlQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF3QkMsT0FBeEIsRUFBZ0M7QUFBQTs7QUFBQSwwR0FDekJGLElBRHlCLEVBQ25CQyxJQURtQixFQUNiQyxPQURhOztBQUUvQixRQUFLQyxFQUFMLEdBQVEsTUFBS0MsSUFBTCxHQUFVLE1BQUtDLFdBQUwsQ0FBaUJDLFNBQWpCLENBQTJCTixLQUFLTyxJQUFMLENBQVUsU0FBVixDQUEzQixDQUFsQjtBQUNBLFFBQUtOLElBQUwsQ0FBVU8sS0FBVixDQUFnQkMsR0FBaEI7QUFDQSxRQUFLQyxNQUFMLEdBQVksSUFBSUMsR0FBSixFQUFaO0FBSitCO0FBSy9COzs7OzJCQUVRQyxDLEVBQUdDLFMsRUFBV0MsUSxFQUFTO0FBQy9CLFFBQUksSUFBSUMsSUFBRSxDQUFOLEVBQVFDLFdBQVMsS0FBS2hCLElBQUwsQ0FBVWlCLENBQVYsQ0FBWSxhQUFaLENBQWpCLEVBQTRDQyxJQUFFRixTQUFTRyxNQUF2RCxFQUErREMsQ0FBbkUsRUFBc0VMLElBQUVHLENBQXhFLEVBQTJFSCxHQUEzRSxFQUErRTtBQUM5RUssUUFBRSxJQUFJLEtBQUtmLFdBQUwsQ0FBaUJnQixLQUFyQixDQUEyQkwsU0FBU0QsQ0FBVCxDQUEzQixFQUF1QyxLQUFLZCxJQUE1QyxFQUFrRCxJQUFsRCxDQUFGO0FBQ0EsU0FBS1MsTUFBTCxDQUFZRCxHQUFaLENBQWdCVyxFQUFFRSxLQUFsQixFQUF3QkYsQ0FBeEI7QUFDQUEsTUFBRUcsS0FBRixDQUFRVCxRQUFSO0FBQ0E7QUFDRDs7O21DQUllO0FBQ2YsT0FBSVUsYUFBVyxLQUFLdkIsSUFBTCxDQUFVTyxLQUFWLENBQWdCaUIsR0FBaEIsQ0FBb0JDLFFBQVEsdUJBQVIsRUFBaUNwQixTQUFqQyxDQUEyQyxLQUFLTixJQUFMLENBQVUyQixFQUFWLENBQWEsZUFBYixFQUE4QnBCLElBQTlCLENBQW1DLE9BQW5DLENBQTNDLENBQXBCLENBQWY7QUFDQSxPQUFHaUIsV0FBV0ksSUFBZCxFQUFtQjtBQUNsQixXQUFPLEtBQUszQixJQUFMLENBQVVPLEtBQVYsQ0FBZ0JpQixHQUFoQixDQUFvQkQsV0FBV0ksSUFBL0IsRUFBcUNDLGdCQUFyQyxHQUF3REMsY0FBeEQsRUFBUDtBQUNBLElBRkQsTUFHQyxPQUFPTixVQUFQO0FBQ0Q7Ozs2QkFFUztBQUFBOztBQUNULFVBQU8sd0JBQUtNLGNBQUwsSUFBc0JDLFFBQXRCLHdCQUFrQ0MsU0FBbEMsQ0FBUDtBQUNBOzs7NkJBRVM7QUFDVCxVQUFPLEtBQUtoQyxJQUFMLENBQVVPLElBQVYsQ0FBZSxTQUFmLENBQVA7QUFDQTs7OzRCQUVnQjBCLEssRUFBTTtBQUN0QixVQUFPLFVBQVFBLEtBQWY7QUFDQTs7O3NCQXBCZ0I7QUFBQyxVQUFPLFlBQVA7QUFBb0I7Ozs7RUFoQkxQLFFBQVEsVUFBUixDOztrQkFBYjNCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vPHc6bnVtYmVyaW5nPjx3Om51bSB3Om51bUlkPVwiMVwiPlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIHJlcXVpcmUoJy4uL3N0eWxlJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2MsIG1QYXJlbnQpe1xuXHRcdHN1cGVyKHdYbWwsIHdEb2MsIG1QYXJlbnQpXG5cdFx0dGhpcy5pZD10aGlzLm5hbWU9dGhpcy5jb25zdHJ1Y3Rvci5hc1N0eWxlSWQod1htbC5hdHRyKCd3Om51bUlkJykpXG5cdFx0dGhpcy53RG9jLnN0eWxlLnNldCh0aGlzKVxuXHRcdHRoaXMubGV2ZWxzPW5ldyBNYXAoKVxuXHR9XG5cdFxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLndYbWwuJCgnbHZsT3ZlcnJpZGUnKSxsPWNoaWxkcmVuLmxlbmd0aCwgdDsgaTxsOyBpKyspe1xuXHRcdFx0dD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5MZXZlbChjaGlsZHJlbltpXSx0aGlzLndEb2MsIHRoaXMpXG5cdFx0XHR0aGlzLmxldmVscy5zZXQodC5sZXZlbCx0KVxuXHRcdFx0dC5wYXJzZSh2aXNpdG9ycylcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLmxpc3QnfVxuXG5cdGdldFBhcmVudFN0eWxlKCl7XG5cdFx0dmFyIGRlZmluaXRpb249dGhpcy53RG9jLnN0eWxlLmdldChyZXF1aXJlKCcuL251bWJlcmluZ0RlZmluaXRpb24nKS5hc1N0eWxlSWQodGhpcy53WG1sLiQxKCdhYnN0cmFjdE51bUlkJykuYXR0cigndzp2YWwnKSkpXG5cdFx0aWYoZGVmaW5pdGlvbi5saW5rKXtcblx0XHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KGRlZmluaXRpb24ubGluaykuYXNOdW1iZXJpbmdTdHlsZSgpLmdldFBhcmVudFN0eWxlKClcblx0XHR9ZWxzZVxuXHRcdFx0cmV0dXJuIGRlZmluaXRpb25cblx0fVxuXHRcblx0Z2V0TGFiZWwoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQYXJlbnRTdHlsZSgpLmdldExhYmVsKC4uLmFyZ3VtZW50cylcblx0fVxuXHRcblx0Z2V0TnVtSWQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6bnVtSWQnKVxuXHR9XG5cblx0c3RhdGljIGFzU3R5bGVJZChudW1JZCl7XG5cdFx0cmV0dXJuICdfbGlzdCcrbnVtSWRcblx0fVxufVxuIl19