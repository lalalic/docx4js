'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var List = function (_require) {
	_inherits(List, _require);

	function List(wXml, wDoc, mParent) {
		_classCallCheck(this, List);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(List).call(this, wXml, wDoc, mParent));

		_this.id = _this.name = _this.constructor.asStyleId(wXml.attr('w:numId'));
		_this.wDoc.style.set(_this);
		return _this;
	}

	_createClass(List, [{
		key: 'getParentStyle',
		value: function getParentStyle() {
			var definition = this.wDoc.style.get(require('./numberingDefinition').asStyleId(this.wXml.$1('abstractNumId').attr('w:val')));
			if (definition.link) {
				return this.wDoc.style.get(definition.link).asNumberingStyle().getParentStyle();
			} else return definition;
		}
	}, {
		key: 'getNumId',
		value: function getNumId() {
			return this.wXml.attr('w:numId');
		}
	}, {
		key: 'hasOverride',
		value: function hasOverride() {
			return this.wXml.childNodes.length != 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbGlzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLElBQ3BCLENBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QixPQUF4QixFQUFnQzt3QkFEWixNQUNZOztxRUFEWixpQkFFYixNQUFNLE1BQU0sVUFEYTs7QUFFL0IsUUFBSyxFQUFMLEdBQVEsTUFBSyxJQUFMLEdBQVUsTUFBSyxXQUFMLENBQWlCLFNBQWpCLENBQTJCLEtBQUssSUFBTCxDQUFVLFNBQVYsQ0FBM0IsQ0FBVixDQUZ1QjtBQUcvQixRQUFLLElBQUwsQ0FBVSxLQUFWLENBQWdCLEdBQWhCLFFBSCtCOztFQUFoQzs7Y0FEb0I7O21DQVNKO0FBQ2YsT0FBSSxhQUFXLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsUUFBUSx1QkFBUixFQUFpQyxTQUFqQyxDQUEyQyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsZUFBYixFQUE4QixJQUE5QixDQUFtQyxPQUFuQyxDQUEzQyxDQUFwQixDQUFYLENBRFc7QUFFZixPQUFHLFdBQVcsSUFBWCxFQUFnQjtBQUNsQixXQUFPLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBb0IsV0FBVyxJQUFYLENBQXBCLENBQXFDLGdCQUFyQyxHQUF3RCxjQUF4RCxFQUFQLENBRGtCO0lBQW5CLE1BR0MsT0FBTyxVQUFQLENBSEQ7Ozs7NkJBS1M7QUFDVCxVQUFPLEtBQUssSUFBTCxDQUFVLElBQVYsQ0FBZSxTQUFmLENBQVAsQ0FEUzs7OztnQ0FHRztBQUNaLFVBQU8sS0FBSyxJQUFMLENBQVUsVUFBVixDQUFxQixNQUFyQixJQUE2QixDQUE3QixDQURLOzs7OzRCQUlJLE9BQU07QUFDdEIsVUFBTyxVQUFRLEtBQVIsQ0FEZTs7OztzQkFoQk47QUFBQyxVQUFPLFlBQVAsQ0FBRDs7OztRQVBHO0VBQWEsUUFBUSxVQUFSOztrQkFBYiIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdCBleHRlbmRzIHJlcXVpcmUoJy4uL3N0eWxlJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2MsIG1QYXJlbnQpe1xuXHRcdHN1cGVyKHdYbWwsIHdEb2MsIG1QYXJlbnQpXG5cdFx0dGhpcy5pZD10aGlzLm5hbWU9dGhpcy5jb25zdHJ1Y3Rvci5hc1N0eWxlSWQod1htbC5hdHRyKCd3Om51bUlkJykpXG5cdFx0dGhpcy53RG9jLnN0eWxlLnNldCh0aGlzKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5saXN0J31cblxuXHRnZXRQYXJlbnRTdHlsZSgpe1xuXHRcdHZhciBkZWZpbml0aW9uPXRoaXMud0RvYy5zdHlsZS5nZXQocmVxdWlyZSgnLi9udW1iZXJpbmdEZWZpbml0aW9uJykuYXNTdHlsZUlkKHRoaXMud1htbC4kMSgnYWJzdHJhY3ROdW1JZCcpLmF0dHIoJ3c6dmFsJykpKVxuXHRcdGlmKGRlZmluaXRpb24ubGluayl7XG5cdFx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldChkZWZpbml0aW9uLmxpbmspLmFzTnVtYmVyaW5nU3R5bGUoKS5nZXRQYXJlbnRTdHlsZSgpXG5cdFx0fWVsc2Vcblx0XHRcdHJldHVybiBkZWZpbml0aW9uXG5cdH1cblx0Z2V0TnVtSWQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6bnVtSWQnKVxuXHR9XG5cdGhhc092ZXJyaWRlKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5jaGlsZE5vZGVzLmxlbmd0aCE9MVxuXHR9XG5cblx0c3RhdGljIGFzU3R5bGVJZChudW1JZCl7XG5cdFx0cmV0dXJuICdfbGlzdCcrbnVtSWRcblx0fVxufVxuIl19