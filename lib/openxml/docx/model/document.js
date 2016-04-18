'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Document).apply(this, arguments));
	}

	_createClass(Document, [{
		key: 'parse',
		value: function parse() {
			var _this2 = this;

			var visitors = _get(Object.getPrototypeOf(Document.prototype), 'parse', this).apply(this, arguments);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVxQjs7Ozs7Ozs7Ozs7MEJBQ2I7OztBQUNOLE9BQUksc0NBRmUsZ0RBRVMsVUFBeEIsQ0FERTtBQUVOLFlBQVMsT0FBVCxDQUFpQixVQUFDLENBQUQ7V0FBSyxFQUFFLEtBQUYsR0FBUSxPQUFLLElBQUwsQ0FBVSxLQUFWO0lBQWIsQ0FBakIsQ0FGTTtBQUdOLFVBQU8sUUFBUCxDQUhNOzs7O3NDQUtZO0FBQ2xCLE9BQUksV0FBUyxDQUFDLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEIsZUFBNUIsRUFBNEMsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE1BQWIsQ0FBN0MsQ0FBVCxDQURjO0FBRWxCLE9BQUksWUFBVSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLG9CQUFsQixDQUFWLENBRmM7QUFHbEIsT0FBRyxTQUFILEVBQ0MsU0FBUyxNQUFULENBQWdCLENBQWhCLEVBQWtCLENBQWxCLEVBQW9CLFVBQVUsZUFBVixDQUFwQixDQUREO0FBRUEsVUFBTyxRQUFQLENBTGtCOzs7Ozs7Ozs7O3VDQVlDO0FBQ25CLE9BQUksS0FBRyxLQUFLLElBQUwsQ0FBVSxFQUFWLENBQWEsYUFBYixDQUFILENBRGU7QUFFbkIsT0FBSSxVQUFRLElBQUksaUJBQU0sVUFBTixDQUFpQixFQUFyQixFQUF3QixLQUFLLElBQUwsRUFBVSxJQUFsQyxDQUFSLENBRmU7QUFHbkIsT0FBRyxFQUFILEVBQU07QUFDTCxRQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE1BQWIsQ0FBTCxDQURDO0FBRUwsUUFBRyxJQUFILEVBQVE7O0FBQ1AsVUFBSSxPQUFLLElBQUksT0FBSixFQUFMO0FBQ0osV0FBSyxVQUFMLENBQWdCLE9BQWhCLENBQXdCO2NBQUcsS0FBSyxHQUFMLENBQVMsRUFBRSxTQUFGLEVBQVksRUFBRSxLQUFGO09BQXhCLENBQXhCO0FBQ0EsV0FBSyxVQUFMLENBQWdCLFVBQWhCLENBQTJCLE9BQTNCLENBQW1DO2NBQUcsS0FBSyxHQUFMLENBQVMsRUFBRSxTQUFGLEVBQVksRUFBRSxLQUFGO09BQXhCLENBQW5DO0FBQ0EsVUFBRyxLQUFLLEdBQUwsQ0FBUyxXQUFULENBQUgsRUFDQyxLQUFLLFNBQUwsR0FBZSxRQUFRLE9BQVIsQ0FBZ0IsS0FBSyxHQUFMLENBQVMsV0FBVCxDQUFoQixDQUFmLENBREQ7QUFFQSxVQUFHLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBSCxFQUNDLEtBQUssTUFBTCxHQUFZLFFBQVEsT0FBUixDQUFnQixLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWhCLENBQVosQ0FERDs7QUFHQTtVQUFPO09BQVA7U0FUTzs7O0tBQVIsTUFVSztBQUNKLFlBQU8sUUFBUSxLQUFSLENBQWMsRUFBZCxDQUFQLENBREk7S0FWTDtJQUZEOzs7O3NCQWtCZ0I7QUFBQyxVQUFPLFVBQVAsQ0FBRDs7OztRQXZDRztFQUFpQixRQUFRLFVBQVI7O2tCQUFqQiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuL3N0eWxlL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRwYXJzZSgpe1xuXHRcdHZhciB2aXNpdG9ycz1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dmlzaXRvcnMuZm9yRWFjaCgoYSk9PmEucHJvcHM9dGhpcy53RG9jLnByb3BzKVxuXHRcdHJldHVybiB2aXNpdG9yc1xuXHR9XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0dmFyIGNoaWxkcmVuPVt0aGlzLndEb2MuZ2V0UGFydCgnc3R5bGVzJykuZG9jdW1lbnRFbGVtZW50LHRoaXMud1htbC4kMSgnYm9keScpXVxuXHRcdHZhciBudW1iZXJpbmc9dGhpcy53RG9jLmdldFBhcnQoJ3dvcmQvbnVtYmVyaW5nLnhtbCcpXG5cdFx0aWYobnVtYmVyaW5nKVxuXHRcdFx0Y2hpbGRyZW4uc3BsaWNlKDEsMCxudW1iZXJpbmcuZG9jdW1lbnRFbGVtZW50KVxuXHRcdHJldHVybiBjaGlsZHJlblxuXHR9XG5cdFxuXHQvKipcblx0KiByZXR1cm4gY29sb3Igc3RyaW5nLCBvclxuXHQqIFdlYWtNYXA6e2J3bW9kZSxmaWxsY29sb3IsdGFyZ2V0c2NyZWVzaXplLGNvbG9yMixhbmdsZSxmb2N1cyx0eXBlfVxuXHQqL1xuXHRnZXRCYWNrZ3JvdW5kU3R5bGUoKXtcblx0XHR2YXIgcHI9dGhpcy53WG1sLiQxKCc+YmFja2dyb3VuZCcpXG5cdFx0dmFyIHN0eWxlUHI9bmV3IFN0eWxlLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpXG5cdFx0aWYocHIpe1xuXHRcdFx0bGV0IGZpbGw9dGhpcy53WG1sLiQxKCdmaWxsJylcblx0XHRcdGlmKGZpbGwpe1xuXHRcdFx0XHRsZXQgYXR0cj1uZXcgV2Vha01hcCgpXG5cdFx0XHRcdGZpbGwuYXR0cmlidXRlcy5mb3JFYWNoKGE9PmF0dHIuc2V0KGEubG9jYWxOYW1lLGEudmFsdWUpKVxuXHRcdFx0XHRmaWxsLnBhcmVudE5vZGUuYXR0cmlidXRlcy5mb3JFYWNoKGE9PmF0dHIuc2V0KGEubG9jYWxOYW1lLGEudmFsdWUpKVxuXHRcdFx0XHRpZihhdHRyLmhhcygnZmlsbGNvbG9yJykpXG5cdFx0XHRcdFx0YXR0ci5maWxsY29sb3I9c3R5bGVQci5hc0NvbG9yKGF0dHIuZ2V0KCdmaWxsY29sb3InKSlcblx0XHRcdFx0aWYoYXR0ci5oYXMoJ2NvbG9yMicpKVxuXHRcdFx0XHRcdGF0dHIuY29sb3IyPXN0eWxlUHIuYXNDb2xvcihhdHRyLmdldCgnY29sb3IyJykpXG5cdFx0XHRcdFxuXHRcdFx0XHRyZXR1cm4gYXR0clxuXHRcdFx0fWVsc2V7XG5cdFx0XHRcdHJldHVybiBzdHlsZVByLmNvbG9yKHByKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZG9jdW1lbnQnfVxufVxuXG4iXX0=