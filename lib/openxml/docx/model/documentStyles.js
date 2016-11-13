'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var documentStyles = function (_require) {
	_inherits(documentStyles, _require);

	function documentStyles() {
		_classCallCheck(this, documentStyles);

		return _possibleConstructorReturn(this, (documentStyles.__proto__ || Object.getPrototypeOf(documentStyles)).apply(this, arguments));
	}

	_createClass(documentStyles, [{
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.$('docDefaults,style');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'documentStyles';
		}
	}]);

	return documentStyles;
}(require('../model'));

exports.default = documentStyles;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvZG9jdW1lbnRTdHlsZXMuanMiXSwibmFtZXMiOlsiZG9jdW1lbnRTdHlsZXMiLCJ3WG1sIiwiJCIsInJlcXVpcmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQXFCQSxjOzs7Ozs7Ozs7OztzQ0FDRDtBQUNsQixVQUFPLEtBQUtDLElBQUwsQ0FBVUMsQ0FBVixDQUFZLG1CQUFaLENBQVA7QUFDQTs7O3NCQUNnQjtBQUFDLFVBQU8sZ0JBQVA7QUFBd0I7Ozs7RUFKQ0MsUUFBUSxVQUFSLEM7O2tCQUF2QkgsYyIsImZpbGUiOiJkb2N1bWVudFN0eWxlcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIGRvY3VtZW50U3R5bGVzIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLiQoJ2RvY0RlZmF1bHRzLHN0eWxlJylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2RvY3VtZW50U3R5bGVzJ31cbn1cbiJdfQ==