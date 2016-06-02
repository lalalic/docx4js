'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var documentProperty = function (_require) {
	_inherits(documentProperty, _require);

	function documentProperty(wXml, b, c, name) {
		_classCallCheck(this, documentProperty);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(documentProperty).apply(this, arguments));

		_this.key = name.toLowerCase();
		_this.value = wXml.$1('>sdtContent').textContent.trim();
		if (!_this.wDoc.props[_this.key]) _this.wDoc.props[_this.key] = _this.value;
		return _this;
	}

	_createClass(documentProperty, null, [{
		key: 'type',
		get: function get() {
			return 'documentProperty';
		}
	}]);

	return documentProperty;
}(require('./sdt'));

exports.default = documentProperty;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRQcm9wZXJ0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLGdCQUNwQixDQUFZLElBQVosRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBc0IsSUFBdEIsRUFBMkI7d0JBRFAsa0JBQ087O3FFQURQLDhCQUVWLFlBRGlCOztBQUUxQixRQUFLLEdBQUwsR0FBUyxLQUFLLFdBQUwsRUFBVCxDQUYwQjtBQUcxQixRQUFLLEtBQUwsR0FBVyxLQUFLLEVBQUwsQ0FBUSxhQUFSLEVBQXVCLFdBQXZCLENBQW1DLElBQW5DLEVBQVgsQ0FIMEI7QUFJMUIsTUFBRyxDQUFDLE1BQUssSUFBTCxDQUFVLEtBQVYsQ0FBZ0IsTUFBSyxHQUFMLENBQWpCLEVBQ0YsTUFBSyxJQUFMLENBQVUsS0FBVixDQUFnQixNQUFLLEdBQUwsQ0FBaEIsR0FBMEIsTUFBSyxLQUFMLENBRDNCO2VBSjBCO0VBQTNCOztjQURvQjs7c0JBUUg7QUFBQyxVQUFPLGtCQUFQLENBQUQ7Ozs7UUFSRztFQUF5QixRQUFRLE9BQVI7O2tCQUF6QiIsImZpbGUiOiJkb2N1bWVudFByb3BlcnR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZG9jdW1lbnRQcm9wZXJ0eSBleHRlbmRzIHJlcXVpcmUoJy4vc2R0Jyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsYixjLCBuYW1lKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy5rZXk9bmFtZS50b0xvd2VyQ2FzZSgpXG5cdFx0dGhpcy52YWx1ZT13WG1sLiQxKCc+c2R0Q29udGVudCcpLnRleHRDb250ZW50LnRyaW0oKVxuXHRcdGlmKCF0aGlzLndEb2MucHJvcHNbdGhpcy5rZXldKVxuXHRcdFx0dGhpcy53RG9jLnByb3BzW3RoaXMua2V5XT10aGlzLnZhbHVlXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdkb2N1bWVudFByb3BlcnR5J31cbn1cbiJdfQ==