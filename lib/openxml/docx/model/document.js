'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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
					var attr = new WeakMap();
					fill.attributes.forEach(function (a) {
						return attr.set(a.localName, a.value);
					});
					fill.parentNode.attributes.forEach(function (a) {
						return attr.set(a.localName, a.value);
					});
					if (attr.has('fillcolor')) attr.fillcolor = stylePr.asColor(attr.get('fillcolor'));
					if (attr.has('color2')) attr.color2 = stylePr.asColor(attr.get('color2'));

					return attr;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOlsiRG9jdW1lbnQiLCJ2aXNpdG9ycyIsImFyZ3VtZW50cyIsImZvckVhY2giLCJhIiwicHJvcHMiLCJ3RG9jIiwiY2hpbGRyZW4iLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50Iiwid1htbCIsIiQxIiwibnVtYmVyaW5nIiwic3BsaWNlIiwicHIiLCJzdHlsZVByIiwiU3R5bGUiLCJQcm9wZXJ0aWVzIiwiZmlsbCIsImF0dHIiLCJXZWFrTWFwIiwiYXR0cmlidXRlcyIsInNldCIsImxvY2FsTmFtZSIsInZhbHVlIiwicGFyZW50Tm9kZSIsImhhcyIsImZpbGxjb2xvciIsImFzQ29sb3IiLCJnZXQiLCJjb2xvcjIiLCJjb2xvciIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRXFCQSxROzs7Ozs7Ozs7OzswQkFDYjtBQUFBOztBQUNOLE9BQUlDLHNIQUF3QkMsU0FBeEIsQ0FBSjtBQUNBRCxZQUFTRSxPQUFULENBQWlCLFVBQUNDLENBQUQ7QUFBQSxXQUFLQSxFQUFFQyxLQUFGLEdBQVEsT0FBS0MsSUFBTCxDQUFVRCxLQUF2QjtBQUFBLElBQWpCO0FBQ0EsVUFBT0osUUFBUDtBQUNBOzs7c0NBQ2tCO0FBQ2xCLE9BQUlNLFdBQVMsQ0FBQyxLQUFLRCxJQUFMLENBQVVFLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEJDLGVBQTdCLEVBQTZDLEtBQUtDLElBQUwsQ0FBVUMsRUFBVixDQUFhLE1BQWIsQ0FBN0MsQ0FBYjtBQUNBLE9BQUlDLFlBQVUsS0FBS04sSUFBTCxDQUFVRSxPQUFWLENBQWtCLG9CQUFsQixDQUFkO0FBQ0EsT0FBR0ksU0FBSCxFQUNDTCxTQUFTTSxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CRCxVQUFVSCxlQUE5QjtBQUNELFVBQU9GLFFBQVA7QUFDQTs7QUFFRDs7Ozs7Ozt1Q0FJb0I7QUFDbkIsT0FBSU8sS0FBRyxLQUFLSixJQUFMLENBQVVDLEVBQVYsQ0FBYSxhQUFiLENBQVA7QUFDQSxPQUFJSSxVQUFRLElBQUlDLGlCQUFNQyxVQUFWLENBQXFCSCxFQUFyQixFQUF3QixLQUFLUixJQUE3QixFQUFrQyxJQUFsQyxDQUFaO0FBQ0EsT0FBR1EsRUFBSCxFQUFNO0FBQ0wsUUFBSUksT0FBSyxLQUFLUixJQUFMLENBQVVDLEVBQVYsQ0FBYSxNQUFiLENBQVQ7QUFDQSxRQUFHTyxJQUFILEVBQVE7QUFDUCxTQUFJQyxPQUFLLElBQUlDLE9BQUosRUFBVDtBQUNBRixVQUFLRyxVQUFMLENBQWdCbEIsT0FBaEIsQ0FBd0I7QUFBQSxhQUFHZ0IsS0FBS0csR0FBTCxDQUFTbEIsRUFBRW1CLFNBQVgsRUFBcUJuQixFQUFFb0IsS0FBdkIsQ0FBSDtBQUFBLE1BQXhCO0FBQ0FOLFVBQUtPLFVBQUwsQ0FBZ0JKLFVBQWhCLENBQTJCbEIsT0FBM0IsQ0FBbUM7QUFBQSxhQUFHZ0IsS0FBS0csR0FBTCxDQUFTbEIsRUFBRW1CLFNBQVgsRUFBcUJuQixFQUFFb0IsS0FBdkIsQ0FBSDtBQUFBLE1BQW5DO0FBQ0EsU0FBR0wsS0FBS08sR0FBTCxDQUFTLFdBQVQsQ0FBSCxFQUNDUCxLQUFLUSxTQUFMLEdBQWVaLFFBQVFhLE9BQVIsQ0FBZ0JULEtBQUtVLEdBQUwsQ0FBUyxXQUFULENBQWhCLENBQWY7QUFDRCxTQUFHVixLQUFLTyxHQUFMLENBQVMsUUFBVCxDQUFILEVBQ0NQLEtBQUtXLE1BQUwsR0FBWWYsUUFBUWEsT0FBUixDQUFnQlQsS0FBS1UsR0FBTCxDQUFTLFFBQVQsQ0FBaEIsQ0FBWjs7QUFFRCxZQUFPVixJQUFQO0FBQ0EsS0FWRCxNQVVLO0FBQ0osWUFBT0osUUFBUWdCLEtBQVIsQ0FBY2pCLEVBQWQsQ0FBUDtBQUNBO0FBQ0Q7QUFDRDs7O3NCQUVnQjtBQUFDLFVBQU8sVUFBUDtBQUFrQjs7OztFQXZDQ2tCLFFBQVEsVUFBUixDOztrQkFBakJoQyxRIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEb2N1bWVudCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHBhcnNlKCl7XG5cdFx0dmFyIHZpc2l0b3JzPXN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblx0XHR2aXNpdG9ycy5mb3JFYWNoKChhKT0+YS5wcm9wcz10aGlzLndEb2MucHJvcHMpXG5cdFx0cmV0dXJuIHZpc2l0b3JzXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHR2YXIgY2hpbGRyZW49W3RoaXMud0RvYy5nZXRQYXJ0KCdzdHlsZXMnKS5kb2N1bWVudEVsZW1lbnQsdGhpcy53WG1sLiQxKCdib2R5JyldXG5cdFx0dmFyIG51bWJlcmluZz10aGlzLndEb2MuZ2V0UGFydCgnd29yZC9udW1iZXJpbmcueG1sJylcblx0XHRpZihudW1iZXJpbmcpXG5cdFx0XHRjaGlsZHJlbi5zcGxpY2UoMSwwLG51bWJlcmluZy5kb2N1bWVudEVsZW1lbnQpXG5cdFx0cmV0dXJuIGNoaWxkcmVuXG5cdH1cblx0XG5cdC8qKlxuXHQqIHJldHVybiBjb2xvciBzdHJpbmcsIG9yXG5cdCogV2Vha01hcDp7Yndtb2RlLGZpbGxjb2xvcix0YXJnZXRzY3JlZXNpemUsY29sb3IyLGFuZ2xlLGZvY3VzLHR5cGV9XG5cdCovXG5cdGdldEJhY2tncm91bmRTdHlsZSgpe1xuXHRcdHZhciBwcj10aGlzLndYbWwuJDEoJz5iYWNrZ3JvdW5kJylcblx0XHR2YXIgc3R5bGVQcj1uZXcgU3R5bGUuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcylcblx0XHRpZihwcil7XG5cdFx0XHRsZXQgZmlsbD10aGlzLndYbWwuJDEoJ2ZpbGwnKVxuXHRcdFx0aWYoZmlsbCl7XG5cdFx0XHRcdGxldCBhdHRyPW5ldyBXZWFrTWFwKClcblx0XHRcdFx0ZmlsbC5hdHRyaWJ1dGVzLmZvckVhY2goYT0+YXR0ci5zZXQoYS5sb2NhbE5hbWUsYS52YWx1ZSkpXG5cdFx0XHRcdGZpbGwucGFyZW50Tm9kZS5hdHRyaWJ1dGVzLmZvckVhY2goYT0+YXR0ci5zZXQoYS5sb2NhbE5hbWUsYS52YWx1ZSkpXG5cdFx0XHRcdGlmKGF0dHIuaGFzKCdmaWxsY29sb3InKSlcblx0XHRcdFx0XHRhdHRyLmZpbGxjb2xvcj1zdHlsZVByLmFzQ29sb3IoYXR0ci5nZXQoJ2ZpbGxjb2xvcicpKVxuXHRcdFx0XHRpZihhdHRyLmhhcygnY29sb3IyJykpXG5cdFx0XHRcdFx0YXR0ci5jb2xvcjI9c3R5bGVQci5hc0NvbG9yKGF0dHIuZ2V0KCdjb2xvcjInKSlcblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiBhdHRyXG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0cmV0dXJuIHN0eWxlUHIuY29sb3IocHIpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdkb2N1bWVudCd9XG59XG5cbiJdfQ==