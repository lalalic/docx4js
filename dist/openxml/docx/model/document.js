'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
			var numbering = this.wDoc.getPart('numbering');
			if (numbering) children.splice(1, 0, numbering.documentElement);
			return children;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztJQUFxQjs7Ozs7Ozs7Ozs7MEJBQ2I7OztBQUNOLE9BQUksc0NBRmUsZ0RBRVMsVUFBeEIsQ0FERTtBQUVOLFlBQVMsT0FBVCxDQUFpQixVQUFDLENBQUQ7V0FBSyxFQUFFLEtBQUYsR0FBUSxPQUFLLElBQUwsQ0FBVSxLQUFWO0lBQWIsQ0FBakIsQ0FGTTtBQUdOLFVBQU8sUUFBUCxDQUhNOzs7O3NDQUtZO0FBQ2xCLE9BQUksV0FBUyxDQUFDLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsUUFBbEIsRUFBNEIsZUFBNUIsRUFBNEMsS0FBSyxJQUFMLENBQVUsRUFBVixDQUFhLE1BQWIsQ0FBN0MsQ0FBVCxDQURjO0FBRWxCLE9BQUksWUFBVSxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLFdBQWxCLENBQVYsQ0FGYztBQUdsQixPQUFHLFNBQUgsRUFDQyxTQUFTLE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBa0IsQ0FBbEIsRUFBb0IsVUFBVSxlQUFWLENBQXBCLENBREQ7QUFFQSxVQUFPLFFBQVAsQ0FMa0I7Ozs7c0JBUUY7QUFBQyxVQUFPLFVBQVAsQ0FBRDs7OztRQWRHO0VBQWlCLFFBQVEsVUFBUjs7a0JBQWpCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xuXHRwYXJzZSgpe1xuXHRcdHZhciB2aXNpdG9ycz1zdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cdFx0dmlzaXRvcnMuZm9yRWFjaCgoYSk9PmEucHJvcHM9dGhpcy53RG9jLnByb3BzKVxuXHRcdHJldHVybiB2aXNpdG9yc1xuXHR9XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0dmFyIGNoaWxkcmVuPVt0aGlzLndEb2MuZ2V0UGFydCgnc3R5bGVzJykuZG9jdW1lbnRFbGVtZW50LHRoaXMud1htbC4kMSgnYm9keScpXVxuXHRcdHZhciBudW1iZXJpbmc9dGhpcy53RG9jLmdldFBhcnQoJ251bWJlcmluZycpXG5cdFx0aWYobnVtYmVyaW5nKVxuXHRcdFx0Y2hpbGRyZW4uc3BsaWNlKDEsMCxudW1iZXJpbmcuZG9jdW1lbnRFbGVtZW50KVxuXHRcdHJldHVybiBjaGlsZHJlblxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdkb2N1bWVudCd9XG59XG4iXX0=