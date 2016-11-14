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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJ2aXNpdG9ycyIsImFyZ3VtZW50cyIsImZvckVhY2giLCJhIiwicHJvcHMiLCJ3RG9jIiwiY2hpbGRyZW4iLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50Iiwid1htbCIsIiQxIiwibnVtYmVyaW5nIiwic3BsaWNlIiwicHIiLCJzdHlsZVByIiwiUHJvcGVydGllcyIsImZpbGwiLCJhdHRyIiwiV2Vha01hcCIsImF0dHJpYnV0ZXMiLCJzZXQiLCJsb2NhbE5hbWUiLCJ2YWx1ZSIsInBhcmVudE5vZGUiLCJoYXMiLCJmaWxsY29sb3IiLCJhc0NvbG9yIiwiZ2V0IiwiY29sb3IyIiwiY29sb3IiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzswQkFDYjtBQUFBOztBQUNOLE9BQUlDLHNIQUF3QkMsU0FBeEIsQ0FBSjtBQUNBRCxZQUFTRSxPQUFULENBQWlCLFVBQUNDLENBQUQ7QUFBQSxXQUFLQSxFQUFFQyxLQUFGLEdBQVEsT0FBS0MsSUFBTCxDQUFVRCxLQUF2QjtBQUFBLElBQWpCO0FBQ0EsVUFBT0osUUFBUDtBQUNBOzs7c0NBQ2tCO0FBQ2xCLE9BQUlNLFdBQVMsQ0FBQyxLQUFLRCxJQUFMLENBQVVFLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEJDLGVBQTdCLEVBQTZDLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBN0MsQ0FBYjtBQUNBLE9BQUlDLFlBQVUsS0FBS04sSUFBTCxDQUFVRSxPQUFWLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsT0FBR0ksU0FBSCxFQUNDTCxTQUFTTSxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CRCxVQUFVSCxlQUE5QjtBQUNELFVBQU9GLFFBQVA7QUFDQTs7QUFFRDs7Ozs7Ozt1Q0FJb0I7QUFDbkIsT0FBSU8sS0FBRyxLQUFLSixJQUFMLENBQVVDLEVBQVYsQ0FBYSxhQUFiLENBQVA7QUFDQSxPQUFJSSxVQUFRLElBQUksaUJBQU1DLFVBQVYsQ0FBcUJGLEVBQXJCLEVBQXdCLEtBQUtSLElBQTdCLEVBQWtDLElBQWxDLENBQVo7QUFDQSxPQUFHUSxFQUFILEVBQU07QUFDTCxRQUFJRyxPQUFLLEtBQUtQLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBVDtBQUNBLFFBQUdNLElBQUgsRUFBUTtBQUFBO0FBQ1AsVUFBSUMsT0FBSyxJQUFJQyxPQUFKLEVBQVQ7QUFDQUYsV0FBS0csVUFBTCxDQUFnQmpCLE9BQWhCLENBQXdCO0FBQUEsY0FBR2UsS0FBS0csR0FBTCxDQUFTakIsRUFBRWtCLFNBQVgsRUFBcUJsQixFQUFFbUIsS0FBdkIsQ0FBSDtBQUFBLE9BQXhCO0FBQ0FOLFdBQUtPLFVBQUwsQ0FBZ0JKLFVBQWhCLENBQTJCakIsT0FBM0IsQ0FBbUM7QUFBQSxjQUFHZSxLQUFLRyxHQUFMLENBQVNqQixFQUFFa0IsU0FBWCxFQUFxQmxCLEVBQUVtQixLQUF2QixDQUFIO0FBQUEsT0FBbkM7QUFDQSxVQUFHTCxLQUFLTyxHQUFMLENBQVMsV0FBVCxDQUFILEVBQ0NQLEtBQUtRLFNBQUwsR0FBZVgsUUFBUVksT0FBUixDQUFnQlQsS0FBS1UsR0FBTCxDQUFTLFdBQVQsQ0FBaEIsQ0FBZjtBQUNELFVBQUdWLEtBQUtPLEdBQUwsQ0FBUyxRQUFULENBQUgsRUFDQ1AsS0FBS1csTUFBTCxHQUFZZCxRQUFRWSxPQUFSLENBQWdCVCxLQUFLVSxHQUFMLENBQVMsUUFBVCxDQUFoQixDQUFaOztBQUVEO0FBQUEsVUFBT1Y7QUFBUDtBQVRPOztBQUFBO0FBVVAsS0FWRCxNQVVLO0FBQ0osWUFBT0gsUUFBUWUsS0FBUixDQUFjaEIsRUFBZCxDQUFQO0FBQ0E7QUFDRDtBQUNEOzs7c0JBRWdCO0FBQUMsVUFBTyxVQUFQO0FBQWtCOzs7O0VBdkNDaUIsUUFBUSxVQUFSLEM7O2tCQUFqQi9CLFEiLCJmaWxlIjoiZG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9pbmxpbmUnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XHJcblx0cGFyc2UoKXtcclxuXHRcdHZhciB2aXNpdG9ycz1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXHJcblx0XHR2aXNpdG9ycy5mb3JFYWNoKChhKT0+YS5wcm9wcz10aGlzLndEb2MucHJvcHMpXHJcblx0XHRyZXR1cm4gdmlzaXRvcnNcclxuXHR9XHJcblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcclxuXHRcdHZhciBjaGlsZHJlbj1bdGhpcy53RG9jLmdldFBhcnQoJ3N0eWxlcycpLmRvY3VtZW50RWxlbWVudCx0aGlzLndYbWwuJDEoJ2JvZHknKV1cclxuXHRcdHZhciBudW1iZXJpbmc9dGhpcy53RG9jLmdldFBhcnQoJ3dvcmQvbnVtYmVyaW5nLnhtbCcpXHJcblx0XHRpZihudW1iZXJpbmcpXHJcblx0XHRcdGNoaWxkcmVuLnNwbGljZSgxLDAsbnVtYmVyaW5nLmRvY3VtZW50RWxlbWVudClcclxuXHRcdHJldHVybiBjaGlsZHJlblxyXG5cdH1cclxuXHRcclxuXHQvKipcclxuXHQqIHJldHVybiBjb2xvciBzdHJpbmcsIG9yXHJcblx0KiBXZWFrTWFwOntid21vZGUsZmlsbGNvbG9yLHRhcmdldHNjcmVlc2l6ZSxjb2xvcjIsYW5nbGUsZm9jdXMsdHlwZX1cclxuXHQqL1xyXG5cdGdldEJhY2tncm91bmRTdHlsZSgpe1xyXG5cdFx0dmFyIHByPXRoaXMud1htbC4kMSgnPmJhY2tncm91bmQnKVxyXG5cdFx0dmFyIHN0eWxlUHI9bmV3IFN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXHJcblx0XHRpZihwcil7XHJcblx0XHRcdGxldCBmaWxsPXRoaXMud1htbC4kMSgnZmlsbCcpXHJcblx0XHRcdGlmKGZpbGwpe1xyXG5cdFx0XHRcdGxldCBhdHRyPW5ldyBXZWFrTWFwKClcclxuXHRcdFx0XHRmaWxsLmF0dHJpYnV0ZXMuZm9yRWFjaChhPT5hdHRyLnNldChhLmxvY2FsTmFtZSxhLnZhbHVlKSlcclxuXHRcdFx0XHRmaWxsLnBhcmVudE5vZGUuYXR0cmlidXRlcy5mb3JFYWNoKGE9PmF0dHIuc2V0KGEubG9jYWxOYW1lLGEudmFsdWUpKVxyXG5cdFx0XHRcdGlmKGF0dHIuaGFzKCdmaWxsY29sb3InKSlcclxuXHRcdFx0XHRcdGF0dHIuZmlsbGNvbG9yPXN0eWxlUHIuYXNDb2xvcihhdHRyLmdldCgnZmlsbGNvbG9yJykpXHJcblx0XHRcdFx0aWYoYXR0ci5oYXMoJ2NvbG9yMicpKVxyXG5cdFx0XHRcdFx0YXR0ci5jb2xvcjI9c3R5bGVQci5hc0NvbG9yKGF0dHIuZ2V0KCdjb2xvcjInKSlcclxuXHRcdFx0XHRcclxuXHRcdFx0XHRyZXR1cm4gYXR0clxyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRyZXR1cm4gc3R5bGVQci5jb2xvcihwcilcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdkb2N1bWVudCd9XHJcbn1cclxuXHJcbiJdfQ==