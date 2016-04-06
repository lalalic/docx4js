"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_require) {
	_inherits(Document, _require);

	function Document(wXml, wDoc, mParent) {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Document).call(this, wXml, wDoc, mParent));

		wDoc.style.setDefault(_this);
		return _this;
	}

	_createClass(Document, [{
		key: "isDefault",
		value: function isDefault() {
			return true;
		}
	}], [{
		key: "type",
		get: function get() {
			return 'style.document';
		}
	}]);

	return Document;
}(require("./paragraph"));

exports.default = Document;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvZG9jdW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUI7OztBQUNwQixVQURvQixRQUNwQixDQUFZLElBQVosRUFBaUIsSUFBakIsRUFBc0IsT0FBdEIsRUFBOEI7d0JBRFYsVUFDVTs7cUVBRFYscUJBRWIsTUFBSyxNQUFLLFVBRGE7O0FBRTdCLE9BQUssS0FBTCxDQUFXLFVBQVgsUUFGNkI7O0VBQTlCOztjQURvQjs7OEJBTVQ7QUFDVixVQUFPLElBQVAsQ0FEVTs7OztzQkFJTTtBQUFDLFVBQU8sZ0JBQVAsQ0FBRDs7OztRQVZHO0VBQWlCLFFBQVEsYUFBUjs7a0JBQWpCIiwiZmlsZSI6ImRvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKFwiLi9wYXJhZ3JhcGhcIil7XG5cdGNvbnN0cnVjdG9yKHdYbWwsd0RvYyxtUGFyZW50KXtcblx0XHRzdXBlcih3WG1sLHdEb2MsbVBhcmVudClcblx0XHR3RG9jLnN0eWxlLnNldERlZmF1bHQodGhpcylcblx0fVxuXG5cdGlzRGVmYXVsdCgpe1xuXHRcdHJldHVybiB0cnVlXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLmRvY3VtZW50J31cbn1cbiJdfQ==