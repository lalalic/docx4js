'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fieldInstruct = function (_require) {
	_inherits(fieldInstruct, _require);

	function fieldInstruct(wXml, wDoc, mParent) {
		_classCallCheck(this, fieldInstruct);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(fieldInstruct).apply(this, arguments));

		wDoc.parseContext.field.instruct(wXml.textContent.trim());
		return _this;
	}

	_createClass(fieldInstruct, [{
		key: 'parse',
		value: function parse() {}
	}], [{
		key: 'type',
		get: function get() {
			return 'fieldInstruct';
		}
	}]);

	return fieldInstruct;
}(require('../model'));

exports.default = fieldInstruct;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2xpYi9vcGVueG1sL2RvY3gvbW9kZWwvZmllbGRJbnN0cnVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFxQjs7O0FBQ3BCLFVBRG9CLGFBQ3BCLENBQVksSUFBWixFQUFpQixJQUFqQixFQUFzQixPQUF0QixFQUE4Qjt3QkFEVixlQUNVOztxRUFEViwyQkFFVixZQURvQjs7QUFFN0IsT0FBSyxZQUFMLENBQWtCLEtBQWxCLENBQXdCLFFBQXhCLENBQWlDLEtBQUssV0FBTCxDQUFpQixJQUFqQixFQUFqQyxFQUY2Qjs7RUFBOUI7O2NBRG9COzswQkFLYjs7O3NCQUdVO0FBQUMsVUFBTyxlQUFQLENBQUQ7Ozs7UUFSRztFQUFzQixRQUFRLFVBQVI7O2tCQUF0QiIsImZpbGUiOiJmaWVsZEluc3RydWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgZmllbGRJbnN0cnVjdCBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsd0RvYyxtUGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0d0RvYy5wYXJzZUNvbnRleHQuZmllbGQuaW5zdHJ1Y3Qod1htbC50ZXh0Q29udGVudC50cmltKCkpXG5cdH1cblx0cGFyc2UoKXtcblxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnZmllbGRJbnN0cnVjdCd9XG59XG4iXX0=