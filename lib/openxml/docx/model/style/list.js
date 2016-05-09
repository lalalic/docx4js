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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, wXml, wDoc, mParent));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0lBQ3FCOzs7QUFDcEIsVUFEb0IsSUFDcEIsQ0FBWSxJQUFaLEVBQWtCLElBQWxCLEVBQXdCLE9BQXhCLEVBQWdDO3dCQURaLE1BQ1k7O3FFQURaLGlCQUViLE1BQU0sTUFBTSxVQURhOztBQUUvQixRQUFLLEVBQUwsR0FBUSxNQUFLLElBQUwsR0FBVSxNQUFLLFdBQUwsQ0FBaUIsU0FBakIsQ0FBMkIsS0FBSyxJQUFMLENBQVUsU0FBVixDQUEzQixDQUFWLENBRnVCO0FBRy9CLFFBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsUUFIK0I7QUFJL0IsUUFBSyxNQUFMLEdBQVksSUFBSSxHQUFKLEVBQVosQ0FKK0I7O0VBQWhDOztjQURvQjs7MkJBUVgsR0FBRyxXQUFXLFVBQVM7QUFDL0IsUUFBSSxJQUFJLElBQUUsQ0FBRixFQUFJLFdBQVMsS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLGFBQVosQ0FBVCxFQUFvQyxJQUFFLFNBQVMsTUFBVCxFQUFpQixDQUEvRCxFQUFrRSxJQUFFLENBQUYsRUFBSyxHQUEzRSxFQUErRTtBQUM5RSxRQUFFLElBQUksS0FBSyxXQUFMLENBQWlCLEtBQWpCLENBQXVCLFNBQVMsQ0FBVCxDQUEzQixFQUF1QyxLQUFLLElBQUwsRUFBVyxJQUFsRCxDQUFGLENBRDhFO0FBRTlFLFNBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsRUFBRSxLQUFGLEVBQVEsQ0FBeEIsRUFGOEU7QUFHOUUsTUFBRSxLQUFGLENBQVEsUUFBUixFQUg4RTtJQUEvRTs7OzttQ0FTZTtBQUNmLE9BQUksYUFBVyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLFFBQVEsdUJBQVIsRUFBaUMsU0FBakMsQ0FBMkMsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLGVBQWIsRUFBOEIsSUFBOUIsQ0FBbUMsT0FBbkMsQ0FBM0MsQ0FBcEIsQ0FBWCxDQURXO0FBRWYsT0FBRyxXQUFXLElBQVgsRUFBZ0I7QUFDbEIsV0FBTyxLQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLENBQW9CLFdBQVcsSUFBWCxDQUFwQixDQUFxQyxnQkFBckMsR0FBd0QsY0FBeEQsRUFBUCxDQURrQjtJQUFuQixNQUdDLE9BQU8sVUFBUCxDQUhEOzs7OzZCQU1TOzs7QUFDVCxVQUFPLHdCQUFLLGNBQUwsSUFBc0IsUUFBdEIsd0JBQWtDLFNBQWxDLENBQVAsQ0FEUzs7Ozs2QkFJQTtBQUNULFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLFNBQWYsQ0FBUCxDQURTOzs7OzRCQUlPLE9BQU07QUFDdEIsVUFBTyxVQUFRLEtBQVIsQ0FEZTs7OztzQkFsQk47QUFBQyxVQUFPLFlBQVAsQ0FBRDs7OztRQWhCRztFQUFhLFFBQVEsVUFBUjs7a0JBQWIiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vPHc6bnVtYmVyaW5nPjx3Om51bSB3Om51bUlkPVwiMVwiPlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIHJlcXVpcmUoJy4uL3N0eWxlJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2MsIG1QYXJlbnQpe1xuXHRcdHN1cGVyKHdYbWwsIHdEb2MsIG1QYXJlbnQpXG5cdFx0dGhpcy5pZD10aGlzLm5hbWU9dGhpcy5jb25zdHJ1Y3Rvci5hc1N0eWxlSWQod1htbC5hdHRyKCd3Om51bUlkJykpXG5cdFx0dGhpcy53RG9jLnN0eWxlLnNldCh0aGlzKVxuXHRcdHRoaXMubGV2ZWxzPW5ldyBNYXAoKVxuXHR9XG5cdFxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHRmb3IodmFyIGk9MCxjaGlsZHJlbj10aGlzLndYbWwuJCgnbHZsT3ZlcnJpZGUnKSxsPWNoaWxkcmVuLmxlbmd0aCwgdDsgaTxsOyBpKyspe1xuXHRcdFx0dD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5MZXZlbChjaGlsZHJlbltpXSx0aGlzLndEb2MsIHRoaXMpXG5cdFx0XHR0aGlzLmxldmVscy5zZXQodC5sZXZlbCx0KVxuXHRcdFx0dC5wYXJzZSh2aXNpdG9ycylcblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLmxpc3QnfVxuXG5cdGdldFBhcmVudFN0eWxlKCl7XG5cdFx0dmFyIGRlZmluaXRpb249dGhpcy53RG9jLnN0eWxlLmdldChyZXF1aXJlKCcuL251bWJlcmluZ0RlZmluaXRpb24nKS5hc1N0eWxlSWQodGhpcy53WG1sLiQxKCdhYnN0cmFjdE51bUlkJykuYXR0cigndzp2YWwnKSkpXG5cdFx0aWYoZGVmaW5pdGlvbi5saW5rKXtcblx0XHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KGRlZmluaXRpb24ubGluaykuYXNOdW1iZXJpbmdTdHlsZSgpLmdldFBhcmVudFN0eWxlKClcblx0XHR9ZWxzZVxuXHRcdFx0cmV0dXJuIGRlZmluaXRpb25cblx0fVxuXHRcblx0Z2V0TGFiZWwoKXtcblx0XHRyZXR1cm4gdGhpcy5nZXRQYXJlbnRTdHlsZSgpLmdldExhYmVsKC4uLmFyZ3VtZW50cylcblx0fVxuXHRcblx0Z2V0TnVtSWQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6bnVtSWQnKVxuXHR9XG5cblx0c3RhdGljIGFzU3R5bGVJZChudW1JZCl7XG5cdFx0cmV0dXJuICdfbGlzdCcrbnVtSWRcblx0fVxufVxuIl19