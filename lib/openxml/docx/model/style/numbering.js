'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//<styls><style type="numbering">
var Numbering = function (_require) {
	_inherits(Numbering, _require);

	function Numbering() {
		_classCallCheck(this, Numbering);

		return _possibleConstructorReturn(this, (Numbering.__proto__ || Object.getPrototypeOf(Numbering)).apply(this, arguments));
	}

	_createClass(Numbering, [{
		key: 'getNumId',
		value: function getNumId() {
			return this.wXml.$1('numId').attr('w:val');
		}
	}, {
		key: 'asNumberingStyle',
		value: function asNumberingStyle() {
			return this.wDoc.style.get(require('./list').asStyleId(this.getNumId()));
		}
	}, {
		key: '_iterate',
		value: function _iterate() {}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.numbering';
		}
	}]);

	return Numbering;
}(require('../style'));

exports.default = Numbering;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvbnVtYmVyaW5nLmpzIl0sIm5hbWVzIjpbIk51bWJlcmluZyIsIndYbWwiLCIkMSIsImF0dHIiLCJ3RG9jIiwic3R5bGUiLCJnZXQiLCJyZXF1aXJlIiwiYXNTdHlsZUlkIiwiZ2V0TnVtSWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7SUFDcUJBLFM7Ozs7Ozs7Ozs7OzZCQUdWO0FBQ1QsVUFBTyxLQUFLQyxJQUFMLENBQVVDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCQyxJQUF0QixDQUEyQixPQUEzQixDQUFQO0FBQ0E7OztxQ0FFaUI7QUFDakIsVUFBTyxLQUFLQyxJQUFMLENBQVVDLEtBQVYsQ0FBZ0JDLEdBQWhCLENBQW9CQyxRQUFRLFFBQVIsRUFBa0JDLFNBQWxCLENBQTRCLEtBQUtDLFFBQUwsRUFBNUIsQ0FBcEIsQ0FBUDtBQUNBOzs7NkJBRVMsQ0FFVDs7O3NCQVpnQjtBQUFDLFVBQU8saUJBQVA7QUFBeUI7Ozs7RUFETEYsUUFBUSxVQUFSLEM7O2tCQUFsQlAsUyIsImZpbGUiOiJudW1iZXJpbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLzxzdHlscz48c3R5bGUgdHlwZT1cIm51bWJlcmluZ1wiPlxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTnVtYmVyaW5nIGV4dGVuZHMgcmVxdWlyZSgnLi4vc3R5bGUnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS5udW1iZXJpbmcnfVxuXG5cdGdldE51bUlkKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC4kMSgnbnVtSWQnKS5hdHRyKCd3OnZhbCcpXG5cdH1cblxuXHRhc051bWJlcmluZ1N0eWxlKCl7XG5cdFx0cmV0dXJuIHRoaXMud0RvYy5zdHlsZS5nZXQocmVxdWlyZSgnLi9saXN0JykuYXNTdHlsZUlkKHRoaXMuZ2V0TnVtSWQoKSkpXG5cdH1cblxuXHRfaXRlcmF0ZSgpe1xuXHRcdFxuXHR9XG59XG4iXX0=