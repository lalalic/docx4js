'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inline = require('./style/inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_require) {
	_inherits(Document, _require);

	function Document() {
		_classCallCheck(this, Document);

		return _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));
	}

	_createClass(Document, [{
		key: 'parse',
		value: function parse() {
			var _this2 = this;

			var visitors = _get(Document.prototype.__proto__ || Object.getPrototypeOf(Document.prototype), 'parse', this).apply(this, arguments);
			visitors.forEach(function (a) {
				return a.props = _this2.wDoc.props;
			});
			return visitors;
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			var children = [this.wDoc.getPart('styles').documentElement, this.wXml.$1('body')];
			var numbering = this.wDoc.getPart('word/numbering.xml');
			if (numbering) children.splice(1, 0, numbering.documentElement);
			return children;
		}

		/**
  * return color string, or
  * WeakMap:{bwmode,fillcolor,targetscreesize,color2,angle,focus,type}
  */

	}, {
		key: 'getBackgroundStyle',
		value: function getBackgroundStyle() {
			var pr = this.wXml.$1('>background');
			var stylePr = new _inline2.default.Properties(pr, this.wDoc, this);
			if (pr) {
				var fill = this.wXml.$1('fill');
				if (fill) {
					var _ret = function () {
						var attr = new WeakMap();
						fill.attributes.forEach(function (a) {
							return attr.set(a.localName, a.value);
						});
						fill.parentNode.attributes.forEach(function (a) {
							return attr.set(a.localName, a.value);
						});
						if (attr.has('fillcolor')) attr.fillcolor = stylePr.asColor(attr.get('fillcolor'));
						if (attr.has('color2')) attr.color2 = stylePr.asColor(attr.get('color2'));

						return {
							v: attr
						};
					}();

					if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
				} else {
					return stylePr.color(pr);
				}
			}
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'document';
		}
	}]);

	return Document;
}(require('../model'));

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJ2aXNpdG9ycyIsImFyZ3VtZW50cyIsImZvckVhY2giLCJhIiwicHJvcHMiLCJ3RG9jIiwiY2hpbGRyZW4iLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50Iiwid1htbCIsIiQxIiwibnVtYmVyaW5nIiwic3BsaWNlIiwicHIiLCJzdHlsZVByIiwiUHJvcGVydGllcyIsImZpbGwiLCJhdHRyIiwiV2Vha01hcCIsImF0dHJpYnV0ZXMiLCJzZXQiLCJsb2NhbE5hbWUiLCJ2YWx1ZSIsInBhcmVudE5vZGUiLCJoYXMiLCJmaWxsY29sb3IiLCJhc0NvbG9yIiwiZ2V0IiwiY29sb3IyIiwiY29sb3IiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzswQkFDYjtBQUFBOztBQUNOLE9BQUlDLHNIQUF3QkMsU0FBeEIsQ0FBSjtBQUNBRCxZQUFTRSxPQUFULENBQWlCLFVBQUNDLENBQUQ7QUFBQSxXQUFLQSxFQUFFQyxLQUFGLEdBQVEsT0FBS0MsSUFBTCxDQUFVRCxLQUF2QjtBQUFBLElBQWpCO0FBQ0EsVUFBT0osUUFBUDtBQUNBOzs7c0NBQ2tCO0FBQ2xCLE9BQUlNLFdBQVMsQ0FBQyxLQUFLRCxJQUFMLENBQVVFLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEJDLGVBQTdCLEVBQTZDLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBN0MsQ0FBYjtBQUNBLE9BQUlDLFlBQVUsS0FBS04sSUFBTCxDQUFVRSxPQUFWLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsT0FBR0ksU0FBSCxFQUNDTCxTQUFTTSxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CRCxVQUFVSCxlQUE5QjtBQUNELFVBQU9GLFFBQVA7QUFDQTs7QUFFRDs7Ozs7Ozt1Q0FJb0I7QUFDbkIsT0FBSU8sS0FBRyxLQUFLSixJQUFMLENBQVVDLEVBQVYsQ0FBYSxhQUFiLENBQVA7QUFDQSxPQUFJSSxVQUFRLElBQUksaUJBQU1DLFVBQVYsQ0FBcUJGLEVBQXJCLEVBQXdCLEtBQUtSLElBQTdCLEVBQWtDLElBQWxDLENBQVo7QUFDQSxPQUFHUSxFQUFILEVBQU07QUFDTCxRQUFJRyxPQUFLLEtBQUtQLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBVDtBQUNBLFFBQUdNLElBQUgsRUFBUTtBQUFBO0FBQ1AsVUFBSUMsT0FBSyxJQUFJQyxPQUFKLEVBQVQ7QUFDQUYsV0FBS0csVUFBTCxDQUFnQmpCLE9BQWhCLENBQXdCO0FBQUEsY0FBR2UsS0FBS0csR0FBTCxDQUFTakIsRUFBRWtCLFNBQVgsRUFBcUJsQixFQUFFbUIsS0FBdkIsQ0FBSDtBQUFBLE9BQXhCO0FBQ0FOLFdBQUtPLFVBQUwsQ0FBZ0JKLFVBQWhCLENBQTJCakIsT0FBM0IsQ0FBbUM7QUFBQSxjQUFHZSxLQUFLRyxHQUFMLENBQVNqQixFQUFFa0IsU0FBWCxFQUFxQmxCLEVBQUVtQixLQUF2QixDQUFIO0FBQUEsT0FBbkM7QUFDQSxVQUFHTCxLQUFLTyxHQUFMLENBQVMsV0FBVCxDQUFILEVBQ0NQLEtBQUtRLFNBQUwsR0FBZVgsUUFBUVksT0FBUixDQUFnQlQsS0FBS1UsR0FBTCxDQUFTLFdBQVQsQ0FBaEIsQ0FBZjtBQUNELFVBQUdWLEtBQUtPLEdBQUwsQ0FBUyxRQUFULENBQUgsRUFDQ1AsS0FBS1csTUFBTCxHQUFZZCxRQUFRWSxPQUFSLENBQWdCVCxLQUFLVSxHQUFMLENBQVMsUUFBVCxDQUFoQixDQUFaOztBQUVEO0FBQUEsVUFBT1Y7QUFBUDtBQVRPOztBQUFBO0FBVVAsS0FWRCxNQVVLO0FBQ0osWUFBT0gsUUFBUWUsS0FBUixDQUFjaEIsRUFBZCxDQUFQO0FBQ0E7QUFDRDtBQUNEOzs7c0JBRWdCO0FBQUMsVUFBTyxVQUFQO0FBQWtCOzs7O0VBdkNDaUIsUUFBUSxVQUFSLEM7O2tCQUFqQi9CLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9pbmxpbmUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0cGFyc2UoKXtcblx0XHR2YXIgdmlzaXRvcnM9c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHZpc2l0b3JzLmZvckVhY2goKGEpPT5hLnByb3BzPXRoaXMud0RvYy5wcm9wcylcblx0XHRyZXR1cm4gdmlzaXRvcnNcblx0fVxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHZhciBjaGlsZHJlbj1bdGhpcy53RG9jLmdldFBhcnQoJ3N0eWxlcycpLmRvY3VtZW50RWxlbWVudCx0aGlzLndYbWwuJDEoJ2JvZHknKV1cblx0XHR2YXIgbnVtYmVyaW5nPXRoaXMud0RvYy5nZXRQYXJ0KCd3b3JkL251bWJlcmluZy54bWwnKVxuXHRcdGlmKG51bWJlcmluZylcblx0XHRcdGNoaWxkcmVuLnNwbGljZSgxLDAsbnVtYmVyaW5nLmRvY3VtZW50RWxlbWVudClcblx0XHRyZXR1cm4gY2hpbGRyZW5cblx0fVxuXHRcblx0LyoqXG5cdCogcmV0dXJuIGNvbG9yIHN0cmluZywgb3Jcblx0KiBXZWFrTWFwOntid21vZGUsZmlsbGNvbG9yLHRhcmdldHNjcmVlc2l6ZSxjb2xvcjIsYW5nbGUsZm9jdXMsdHlwZX1cblx0Ki9cblx0Z2V0QmFja2dyb3VuZFN0eWxlKCl7XG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgnPmJhY2tncm91bmQnKVxuXHRcdHZhciBzdHlsZVByPW5ldyBTdHlsZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKVxuXHRcdGlmKHByKXtcblx0XHRcdGxldCBmaWxsPXRoaXMud1htbC4kMSgnZmlsbCcpXG5cdFx0XHRpZihmaWxsKXtcblx0XHRcdFx0bGV0IGF0dHI9bmV3IFdlYWtNYXAoKVxuXHRcdFx0XHRmaWxsLmF0dHJpYnV0ZXMuZm9yRWFjaChhPT5hdHRyLnNldChhLmxvY2FsTmFtZSxhLnZhbHVlKSlcblx0XHRcdFx0ZmlsbC5wYXJlbnROb2RlLmF0dHJpYnV0ZXMuZm9yRWFjaChhPT5hdHRyLnNldChhLmxvY2FsTmFtZSxhLnZhbHVlKSlcblx0XHRcdFx0aWYoYXR0ci5oYXMoJ2ZpbGxjb2xvcicpKVxuXHRcdFx0XHRcdGF0dHIuZmlsbGNvbG9yPXN0eWxlUHIuYXNDb2xvcihhdHRyLmdldCgnZmlsbGNvbG9yJykpXG5cdFx0XHRcdGlmKGF0dHIuaGFzKCdjb2xvcjInKSlcblx0XHRcdFx0XHRhdHRyLmNvbG9yMj1zdHlsZVByLmFzQ29sb3IoYXR0ci5nZXQoJ2NvbG9yMicpKVxuXHRcdFx0XHRcblx0XHRcdFx0cmV0dXJuIGF0dHJcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRyZXR1cm4gc3R5bGVQci5jb2xvcihwcilcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2RvY3VtZW50J31cbn1cblxuIl19