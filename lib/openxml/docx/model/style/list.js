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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6WyJMaXN0Iiwid1htbCIsIndEb2MiLCJtUGFyZW50IiwiaWQiLCJuYW1lIiwiY29uc3RydWN0b3IiLCJhc1N0eWxlSWQiLCJhdHRyIiwic3R5bGUiLCJzZXQiLCJsZXZlbHMiLCJNYXAiLCJmIiwiZmFjdG9yaWVzIiwidmlzaXRvcnMiLCJpIiwiY2hpbGRyZW4iLCIkIiwibCIsImxlbmd0aCIsInQiLCJMZXZlbCIsImxldmVsIiwicGFyc2UiLCJkZWZpbml0aW9uIiwiZ2V0IiwicmVxdWlyZSIsIiQxIiwibGluayIsImFzTnVtYmVyaW5nU3R5bGUiLCJnZXRQYXJlbnRTdHlsZSIsImdldExhYmVsIiwiYXJndW1lbnRzIiwibnVtSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFDcUJBLEk7OztBQUNwQixlQUFZQyxJQUFaLEVBQWtCQyxJQUFsQixFQUF3QkMsT0FBeEIsRUFBZ0M7QUFBQTs7QUFBQSwwR0FDekJGLElBRHlCLEVBQ25CQyxJQURtQixFQUNiQyxPQURhOztBQUUvQixRQUFLQyxFQUFMLEdBQVEsTUFBS0MsSUFBTCxHQUFVLE1BQUtDLFdBQUwsQ0FBaUJDLFNBQWpCLENBQTJCTixLQUFLTyxJQUFMLENBQVUsU0FBVixDQUEzQixDQUFsQjtBQUNBLFFBQUtOLElBQUwsQ0FBVU8sS0FBVixDQUFnQkMsR0FBaEI7QUFDQSxRQUFLQyxNQUFMLEdBQVksSUFBSUMsR0FBSixFQUFaO0FBSitCO0FBSy9COzs7OzJCQUVRQyxDLEVBQUdDLFMsRUFBV0MsUSxFQUFTO0FBQy9CLFFBQUksSUFBSUMsSUFBRSxDQUFOLEVBQVFDLFdBQVMsS0FBS2hCLElBQUwsQ0FBVWlCLENBQVYsQ0FBWSxhQUFaLENBQWpCLEVBQTRDQyxJQUFFRixTQUFTRyxNQUF2RCxFQUErREMsQ0FBbkUsRUFBc0VMLElBQUVHLENBQXhFLEVBQTJFSCxHQUEzRSxFQUErRTtBQUM5RUssUUFBRSxJQUFJLEtBQUtmLFdBQUwsQ0FBaUJnQixLQUFyQixDQUEyQkwsU0FBU0QsQ0FBVCxDQUEzQixFQUF1QyxLQUFLZCxJQUE1QyxFQUFrRCxJQUFsRCxDQUFGO0FBQ0EsU0FBS1MsTUFBTCxDQUFZRCxHQUFaLENBQWdCVyxFQUFFRSxLQUFsQixFQUF3QkYsQ0FBeEI7QUFDQUEsTUFBRUcsS0FBRixDQUFRVCxRQUFSO0FBQ0E7QUFDRDs7O21DQUllO0FBQ2YsT0FBSVUsYUFBVyxLQUFLdkIsSUFBTCxDQUFVTyxLQUFWLENBQWdCaUIsR0FBaEIsQ0FBb0JDLFFBQVEsdUJBQVIsRUFBaUNwQixTQUFqQyxDQUEyQyxLQUFLTixJQUFMLENBQVUyQixFQUFWLENBQWEsZUFBYixFQUE4QnBCLElBQTlCLENBQW1DLE9BQW5DLENBQTNDLENBQXBCLENBQWY7QUFDQSxPQUFHaUIsV0FBV0ksSUFBZCxFQUFtQjtBQUNsQixXQUFPLEtBQUszQixJQUFMLENBQVVPLEtBQVYsQ0FBZ0JpQixHQUFoQixDQUFvQkQsV0FBV0ksSUFBL0IsRUFBcUNDLGdCQUFyQyxHQUF3REMsY0FBeEQsRUFBUDtBQUNBLElBRkQsTUFHQyxPQUFPTixVQUFQO0FBQ0Q7Ozs2QkFFUztBQUFBOztBQUNULFVBQU8sd0JBQUtNLGNBQUwsSUFBc0JDLFFBQXRCLHdCQUFrQ0MsU0FBbEMsQ0FBUDtBQUNBOzs7NkJBRVM7QUFDVCxVQUFPLEtBQUtoQyxJQUFMLENBQVVPLElBQVYsQ0FBZSxTQUFmLENBQVA7QUFDQTs7OzRCQUVnQjBCLEssRUFBTTtBQUN0QixVQUFPLFVBQVFBLEtBQWY7QUFDQTs7O3NCQXBCZ0I7QUFBQyxVQUFPLFlBQVA7QUFBb0I7Ozs7RUFoQkxQLFFBQVEsVUFBUixDOztrQkFBYjNCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vPHc6bnVtYmVyaW5nPjx3Om51bSB3Om51bUlkPVwiMVwiPlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMaXN0IGV4dGVuZHMgcmVxdWlyZSgnLi4vc3R5bGUnKXtcclxuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jLCBtUGFyZW50KXtcclxuXHRcdHN1cGVyKHdYbWwsIHdEb2MsIG1QYXJlbnQpXHJcblx0XHR0aGlzLmlkPXRoaXMubmFtZT10aGlzLmNvbnN0cnVjdG9yLmFzU3R5bGVJZCh3WG1sLmF0dHIoJ3c6bnVtSWQnKSlcclxuXHRcdHRoaXMud0RvYy5zdHlsZS5zZXQodGhpcylcclxuXHRcdHRoaXMubGV2ZWxzPW5ldyBNYXAoKVxyXG5cdH1cclxuXHRcclxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcclxuXHRcdGZvcih2YXIgaT0wLGNoaWxkcmVuPXRoaXMud1htbC4kKCdsdmxPdmVycmlkZScpLGw9Y2hpbGRyZW4ubGVuZ3RoLCB0OyBpPGw7IGkrKyl7XHJcblx0XHRcdHQ9bmV3IHRoaXMuY29uc3RydWN0b3IuTGV2ZWwoY2hpbGRyZW5baV0sdGhpcy53RG9jLCB0aGlzKVxyXG5cdFx0XHR0aGlzLmxldmVscy5zZXQodC5sZXZlbCx0KVxyXG5cdFx0XHR0LnBhcnNlKHZpc2l0b3JzKVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5saXN0J31cclxuXHJcblx0Z2V0UGFyZW50U3R5bGUoKXtcclxuXHRcdHZhciBkZWZpbml0aW9uPXRoaXMud0RvYy5zdHlsZS5nZXQocmVxdWlyZSgnLi9udW1iZXJpbmdEZWZpbml0aW9uJykuYXNTdHlsZUlkKHRoaXMud1htbC4kMSgnYWJzdHJhY3ROdW1JZCcpLmF0dHIoJ3c6dmFsJykpKVxyXG5cdFx0aWYoZGVmaW5pdGlvbi5saW5rKXtcclxuXHRcdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQoZGVmaW5pdGlvbi5saW5rKS5hc051bWJlcmluZ1N0eWxlKCkuZ2V0UGFyZW50U3R5bGUoKVxyXG5cdFx0fWVsc2VcclxuXHRcdFx0cmV0dXJuIGRlZmluaXRpb25cclxuXHR9XHJcblx0XHJcblx0Z2V0TGFiZWwoKXtcclxuXHRcdHJldHVybiB0aGlzLmdldFBhcmVudFN0eWxlKCkuZ2V0TGFiZWwoLi4uYXJndW1lbnRzKVxyXG5cdH1cclxuXHRcclxuXHRnZXROdW1JZCgpe1xyXG5cdFx0cmV0dXJuIHRoaXMud1htbC5hdHRyKCd3Om51bUlkJylcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBhc1N0eWxlSWQobnVtSWQpe1xyXG5cdFx0cmV0dXJuICdfbGlzdCcrbnVtSWRcclxuXHR9XHJcbn1cclxuIl19