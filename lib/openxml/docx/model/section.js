'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _model = require('../model');

var _model2 = _interopRequireDefault(_model);

var _header = require('./header');

var _header2 = _interopRequireDefault(_header);

var _footer = require('./footer');

var _footer2 = _interopRequireDefault(_footer);

var _section = require('./style/section');

var _section2 = _interopRequireDefault(_section);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var section = function (_Model) {
	_inherits(section, _Model);

	function section(wXml, wDoc, mParent) {
		_classCallCheck(this, section);

		var _this = _possibleConstructorReturn(this, (section.__proto__ || Object.getPrototypeOf(section)).apply(this, arguments));

		mParent.content.pop();
		_this.wFirst = mParent.content.length ? mParent.content[mParent.content.length - 1].wLast.nextSibling : mParent.wXml.firstChild;

		_this.wLast = wXml;
		while (_this.wLast.parentNode != mParent.wXml) {
			_this.wLast = _this.wLast.parentNode;
		}if (_this.wLast == wXml) _this.wLast = wXml.previousSibling;

		mParent.content.push(_this);

		wDoc.parseContext.section.current = _this;
		return _this;
	}

	_createClass(section, [{
		key: '_iterate',
		value: function _iterate(f, visitorFactories) {
			this._iterateHeaderFooter(visitorFactories, 'header');
			var current = this.wFirst;
			do {
				f(current);
				current = current == this.wLast ? null : current.nextSibling;
			} while (current);
			this._iterateHeaderFooter(visitorFactories, 'footer');
		}
	}, {
		key: '_iterateHeaderFooter',
		value: function _iterateHeaderFooter(visitorFactories, refType) {
			for (var refs = this.wXml.$(refType + 'Reference'), i = 0, len = refs.length; i < len; i++) {
				var part = this.wDoc.parseContext.part.current = this.wDoc.getRel(refs[i].attr('r:id'));
				var model = new (require('./' + refType))(part.documentElement, this.wDoc, this, refs[i].attr('w:type'));
				model.parse(visitorFactories);
				this.wDoc.parseContext.part.current = this.wDoc.partMain;
			}
		}
	}, {
		key: 'getDirectStyle',
		value: function getDirectStyle() {
			return new _section2.default(this.wXml, this.wDoc, this);
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'section';
		}
	}]);

	return section;
}(_model2.default);

exports.default = section;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6WyJzZWN0aW9uIiwid1htbCIsIndEb2MiLCJtUGFyZW50IiwiYXJndW1lbnRzIiwiY29udGVudCIsInBvcCIsIndGaXJzdCIsImxlbmd0aCIsIndMYXN0IiwibmV4dFNpYmxpbmciLCJmaXJzdENoaWxkIiwicGFyZW50Tm9kZSIsInByZXZpb3VzU2libGluZyIsInB1c2giLCJwYXJzZUNvbnRleHQiLCJjdXJyZW50IiwiZiIsInZpc2l0b3JGYWN0b3JpZXMiLCJfaXRlcmF0ZUhlYWRlckZvb3RlciIsInJlZlR5cGUiLCJyZWZzIiwiJCIsImkiLCJsZW4iLCJwYXJ0IiwiZ2V0UmVsIiwiYXR0ciIsIm1vZGVsIiwicmVxdWlyZSIsImRvY3VtZW50RWxlbWVudCIsInBhcnNlIiwicGFydE1haW4iLCJTdHlsZSIsIk1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLE87OztBQUNwQixrQkFBWUMsSUFBWixFQUFrQkMsSUFBbEIsRUFBd0JDLE9BQXhCLEVBQWdDO0FBQUE7O0FBQUEsaUhBQ3RCQyxTQURzQjs7QUFFL0JELFVBQVFFLE9BQVIsQ0FBZ0JDLEdBQWhCO0FBQ0EsUUFBS0MsTUFBTCxHQUFZSixRQUFRRSxPQUFSLENBQWdCRyxNQUFoQixHQUF5QkwsUUFBUUUsT0FBUixDQUFnQkYsUUFBUUUsT0FBUixDQUFnQkcsTUFBaEIsR0FBdUIsQ0FBdkMsRUFBMENDLEtBQTFDLENBQWdEQyxXQUF6RSxHQUF1RlAsUUFBUUYsSUFBUixDQUFhVSxVQUFoSDs7QUFFQSxRQUFLRixLQUFMLEdBQVdSLElBQVg7QUFDQSxTQUFNLE1BQUtRLEtBQUwsQ0FBV0csVUFBWCxJQUF1QlQsUUFBUUYsSUFBckM7QUFDQyxTQUFLUSxLQUFMLEdBQVcsTUFBS0EsS0FBTCxDQUFXRyxVQUF0QjtBQURELEdBRUEsSUFBRyxNQUFLSCxLQUFMLElBQVlSLElBQWYsRUFDQyxNQUFLUSxLQUFMLEdBQVdSLEtBQUtZLGVBQWhCOztBQUVEVixVQUFRRSxPQUFSLENBQWdCUyxJQUFoQjs7QUFFQVosT0FBS2EsWUFBTCxDQUFrQmYsT0FBbEIsQ0FBMEJnQixPQUExQjtBQWIrQjtBQWMvQjs7OzsyQkFFUUMsQyxFQUFHQyxnQixFQUFpQjtBQUM1QixRQUFLQyxvQkFBTCxDQUEwQkQsZ0JBQTFCLEVBQTJDLFFBQTNDO0FBQ0EsT0FBSUYsVUFBUSxLQUFLVCxNQUFqQjtBQUNBLE1BQUU7QUFDRFUsTUFBRUQsT0FBRjtBQUNBQSxjQUFRQSxXQUFTLEtBQUtQLEtBQWQsR0FBc0IsSUFBdEIsR0FBNkJPLFFBQVFOLFdBQTdDO0FBQ0EsSUFIRCxRQUdPTSxPQUhQO0FBSUEsUUFBS0csb0JBQUwsQ0FBMEJELGdCQUExQixFQUEyQyxRQUEzQztBQUNBOzs7dUNBRW9CQSxnQixFQUFpQkUsTyxFQUFRO0FBQzdDLFFBQUksSUFBSUMsT0FBSyxLQUFLcEIsSUFBTCxDQUFVcUIsQ0FBVixDQUFZRixVQUFRLFdBQXBCLENBQVQsRUFBMENHLElBQUUsQ0FBNUMsRUFBOENDLE1BQUlILEtBQUtiLE1BQTNELEVBQWtFZSxJQUFFQyxHQUFwRSxFQUF3RUQsR0FBeEUsRUFBNEU7QUFDM0UsUUFBSUUsT0FBSyxLQUFLdkIsSUFBTCxDQUFVYSxZQUFWLENBQXVCVSxJQUF2QixDQUE0QlQsT0FBNUIsR0FBb0MsS0FBS2QsSUFBTCxDQUFVd0IsTUFBVixDQUFpQkwsS0FBS0UsQ0FBTCxFQUFRSSxJQUFSLENBQWEsTUFBYixDQUFqQixDQUE3QztBQUNBLFFBQUlDLFFBQU0sS0FBS0MsUUFBUSxPQUFLVCxPQUFiLENBQUwsRUFBNEJLLEtBQUtLLGVBQWpDLEVBQWtELEtBQUs1QixJQUF2RCxFQUE2RCxJQUE3RCxFQUFtRW1CLEtBQUtFLENBQUwsRUFBUUksSUFBUixDQUFhLFFBQWIsQ0FBbkUsQ0FBVjtBQUNBQyxVQUFNRyxLQUFOLENBQVliLGdCQUFaO0FBQ0EsU0FBS2hCLElBQUwsQ0FBVWEsWUFBVixDQUF1QlUsSUFBdkIsQ0FBNEJULE9BQTVCLEdBQW9DLEtBQUtkLElBQUwsQ0FBVThCLFFBQTlDO0FBQ0E7QUFDRDs7O21DQUNlO0FBQ2YsVUFBTyxJQUFJQyxpQkFBSixDQUFVLEtBQUtoQyxJQUFmLEVBQW9CLEtBQUtDLElBQXpCLEVBQStCLElBQS9CLENBQVA7QUFDQTs7O3NCQUVnQjtBQUFDLFVBQU8sU0FBUDtBQUFpQjs7OztFQXZDQ2dDLGU7O2tCQUFoQmxDLE8iLCJmaWxlIjoic2VjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IE1vZGVsIGZyb20gJy4uL21vZGVsJ1xuaW1wb3J0IEhlYWRlciBmcm9tICcuL2hlYWRlcidcbmltcG9ydCBGb290ZXIgZnJvbSAnLi9mb290ZXInXG5pbXBvcnQgU3R5bGUgZnJvbSAnLi9zdHlsZS9zZWN0aW9uJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBzZWN0aW9uIGV4dGVuZHMgTW9kZWx7XG5cdGNvbnN0cnVjdG9yKHdYbWwsIHdEb2MsIG1QYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRtUGFyZW50LmNvbnRlbnQucG9wKClcblx0XHR0aGlzLndGaXJzdD1tUGFyZW50LmNvbnRlbnQubGVuZ3RoID8gbVBhcmVudC5jb250ZW50W21QYXJlbnQuY29udGVudC5sZW5ndGgtMV0ud0xhc3QubmV4dFNpYmxpbmcgOiBtUGFyZW50LndYbWwuZmlyc3RDaGlsZFxuXG5cdFx0dGhpcy53TGFzdD13WG1sXG5cdFx0d2hpbGUodGhpcy53TGFzdC5wYXJlbnROb2RlIT1tUGFyZW50LndYbWwpXG5cdFx0XHR0aGlzLndMYXN0PXRoaXMud0xhc3QucGFyZW50Tm9kZVxuXHRcdGlmKHRoaXMud0xhc3Q9PXdYbWwpXG5cdFx0XHR0aGlzLndMYXN0PXdYbWwucHJldmlvdXNTaWJsaW5nXG5cblx0XHRtUGFyZW50LmNvbnRlbnQucHVzaCh0aGlzKVxuXG5cdFx0d0RvYy5wYXJzZUNvbnRleHQuc2VjdGlvbi5jdXJyZW50PXRoaXNcblx0fVxuXG5cdF9pdGVyYXRlKGYsIHZpc2l0b3JGYWN0b3JpZXMpe1xuXHRcdHRoaXMuX2l0ZXJhdGVIZWFkZXJGb290ZXIodmlzaXRvckZhY3RvcmllcywnaGVhZGVyJylcblx0XHR2YXIgY3VycmVudD10aGlzLndGaXJzdFxuXHRcdGRve1xuXHRcdFx0ZihjdXJyZW50KVxuXHRcdFx0Y3VycmVudD1jdXJyZW50PT10aGlzLndMYXN0ID8gbnVsbCA6IGN1cnJlbnQubmV4dFNpYmxpbmdcblx0XHR9d2hpbGUoY3VycmVudClcblx0XHR0aGlzLl9pdGVyYXRlSGVhZGVyRm9vdGVyKHZpc2l0b3JGYWN0b3JpZXMsJ2Zvb3RlcicpXG5cdH1cblxuXHRfaXRlcmF0ZUhlYWRlckZvb3Rlcih2aXNpdG9yRmFjdG9yaWVzLHJlZlR5cGUpe1xuXHRcdGZvcih2YXIgcmVmcz10aGlzLndYbWwuJChyZWZUeXBlKydSZWZlcmVuY2UnKSxpPTAsbGVuPXJlZnMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHR2YXIgcGFydD10aGlzLndEb2MucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudD10aGlzLndEb2MuZ2V0UmVsKHJlZnNbaV0uYXR0cigncjppZCcpKVxuXHRcdFx0dmFyIG1vZGVsPW5ldyAocmVxdWlyZSgnLi8nK3JlZlR5cGUpKShwYXJ0LmRvY3VtZW50RWxlbWVudCwgdGhpcy53RG9jLCB0aGlzLCByZWZzW2ldLmF0dHIoJ3c6dHlwZScpKVxuXHRcdFx0bW9kZWwucGFyc2UodmlzaXRvckZhY3Rvcmllcylcblx0XHRcdHRoaXMud0RvYy5wYXJzZUNvbnRleHQucGFydC5jdXJyZW50PXRoaXMud0RvYy5wYXJ0TWFpblxuXHRcdH1cblx0fVxuXHRnZXREaXJlY3RTdHlsZSgpe1xuXHRcdHJldHVybiBuZXcgU3R5bGUodGhpcy53WG1sLHRoaXMud0RvYywgdGhpcylcblx0fVxuXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnc2VjdGlvbid9XG59XG4iXX0=