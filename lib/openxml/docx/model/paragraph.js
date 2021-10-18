'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _paragraph = require('./style/paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var paragraph = function (_require) {
	_inherits(paragraph, _require);

	function paragraph() {
		_classCallCheck(this, paragraph);

		return _possibleConstructorReturn(this, (paragraph.__proto__ || Object.getPrototypeOf(paragraph)).apply(this, arguments));
	}

	_createClass(paragraph, [{
		key: 'getStyleId',
		value: function getStyleId(a) {
			return this._val('>pPr>pStyle') || (a = this.wDoc.style.getDefault(_paragraph2.default.type)) && a.id;
		}
	}, {
		key: 'getNamedStyle',
		value: function getNamedStyle() {
			return this.wDoc.style.get(this.getStyleId());
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle(pr) {
			if (pr = this.wXml.$1('>pPr')) return new _paragraph2.default.Properties(pr, this.wDoc, this);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore(wXml) {
			return wXml.localName == 'pPr';
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'paragraph';
		}
	}]);

	return paragraph;
}(require('../model'));

exports.default = paragraph;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvcGFyYWdyYXBoLmpzIl0sIm5hbWVzIjpbInBhcmFncmFwaCIsImEiLCJfdmFsIiwid0RvYyIsInN0eWxlIiwiZ2V0RGVmYXVsdCIsIlN0eWxlIiwidHlwZSIsImlkIiwiZ2V0IiwiZ2V0U3R5bGVJZCIsInByIiwid1htbCIsIiQxIiwiUHJvcGVydGllcyIsImxvY2FsTmFtZSIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUNxQkEsUzs7Ozs7Ozs7Ozs7NkJBQ1RDLEMsRUFBRTtBQUNaLFVBQU8sS0FBS0MsSUFBTCxDQUFVLGFBQVYsS0FBNEIsQ0FBQ0QsSUFBRSxLQUFLRSxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLFVBQWhCLENBQTJCQyxvQkFBTUMsSUFBakMsQ0FBSCxLQUE4Q04sRUFBRU8sRUFBbkY7QUFDQTs7O2tDQUNjO0FBQ2QsVUFBTyxLQUFLTCxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JLLEdBQWhCLENBQW9CLEtBQUtDLFVBQUwsRUFBcEIsQ0FBUDtBQUNBOzs7aUNBQ2NDLEUsRUFBRztBQUNqQixPQUFHQSxLQUFHLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBTixFQUNDLE9BQU8sSUFBSVAsb0JBQU1RLFVBQVYsQ0FBcUJILEVBQXJCLEVBQXdCLEtBQUtSLElBQTdCLEVBQWtDLElBQWxDLENBQVA7QUFDRDs7O2dDQUNhUyxJLEVBQUs7QUFDbEIsVUFBT0EsS0FBS0csU0FBTCxJQUFnQixLQUF2QjtBQUNBOzs7c0JBQ2dCO0FBQUMsVUFBTyxXQUFQO0FBQW1COzs7O0VBZENDLFFBQVEsVUFBUixDOztrQkFBbEJoQixTIiwiZmlsZSI6InBhcmFncmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tIFwiLi9zdHlsZS9wYXJhZ3JhcGhcIlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgcGFyYWdyYXBoIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Z2V0U3R5bGVJZChhKXtcblx0XHRyZXR1cm4gdGhpcy5fdmFsKCc+cFByPnBTdHlsZScpfHwgKChhPXRoaXMud0RvYy5zdHlsZS5nZXREZWZhdWx0KFN0eWxlLnR5cGUpKSAmJiBhLmlkKVxuXHR9XG5cdGdldE5hbWVkU3R5bGUoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldCh0aGlzLmdldFN0eWxlSWQoKSlcblx0fVxuXHRnZXREaXJlY3RTdHlsZShwcil7XG5cdFx0aWYocHI9dGhpcy53WG1sLiQxKCc+cFByJykpXG5cdFx0XHRyZXR1cm4gbmV3IFN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdH1cblx0X3Nob3VsZElnbm9yZSh3WG1sKXtcblx0XHRyZXR1cm4gd1htbC5sb2NhbE5hbWU9PSdwUHInXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdwYXJhZ3JhcGgnfVxufVxuIl19