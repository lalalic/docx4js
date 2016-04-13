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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(section).apply(this, arguments));

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc2VjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUI7OztBQUNwQixVQURvQixPQUNwQixDQUFZLElBQVosRUFBa0IsSUFBbEIsRUFBd0IsT0FBeEIsRUFBZ0M7d0JBRFosU0FDWTs7cUVBRFoscUJBRVYsWUFEc0I7O0FBRS9CLFVBQVEsT0FBUixDQUFnQixHQUFoQixHQUYrQjtBQUcvQixRQUFLLE1BQUwsR0FBWSxRQUFRLE9BQVIsQ0FBZ0IsTUFBaEIsR0FBeUIsUUFBUSxPQUFSLENBQWdCLFFBQVEsT0FBUixDQUFnQixNQUFoQixHQUF1QixDQUF2QixDQUFoQixDQUEwQyxLQUExQyxDQUFnRCxXQUFoRCxHQUE4RCxRQUFRLElBQVIsQ0FBYSxVQUFiLENBSHBFOztBQUsvQixRQUFLLEtBQUwsR0FBVyxJQUFYLENBTCtCO0FBTS9CLFNBQU0sTUFBSyxLQUFMLENBQVcsVUFBWCxJQUF1QixRQUFRLElBQVI7QUFDNUIsU0FBSyxLQUFMLEdBQVcsTUFBSyxLQUFMLENBQVcsVUFBWDtHQURaLElBRUcsTUFBSyxLQUFMLElBQVksSUFBWixFQUNGLE1BQUssS0FBTCxHQUFXLEtBQUssZUFBTCxDQURaOztBQUdBLFVBQVEsT0FBUixDQUFnQixJQUFoQixRQVgrQjs7QUFhL0IsT0FBSyxZQUFMLENBQWtCLE9BQWxCLENBQTBCLE9BQTFCLFNBYitCOztFQUFoQzs7Y0FEb0I7OzJCQWlCWCxHQUFHLGtCQUFpQjtBQUM1QixRQUFLLG9CQUFMLENBQTBCLGdCQUExQixFQUEyQyxRQUEzQyxFQUQ0QjtBQUU1QixPQUFJLFVBQVEsS0FBSyxNQUFMLENBRmdCO0FBRzVCLE1BQUU7QUFDRCxNQUFFLE9BQUYsRUFEQztBQUVELGNBQVEsV0FBUyxLQUFLLEtBQUwsR0FBYSxJQUF0QixHQUE2QixRQUFRLFdBQVIsQ0FGcEM7SUFBRixRQUdPLE9BSFAsRUFINEI7QUFPNUIsUUFBSyxvQkFBTCxDQUEwQixnQkFBMUIsRUFBMkMsUUFBM0MsRUFQNEI7Ozs7dUNBVVIsa0JBQWlCLFNBQVE7QUFDN0MsUUFBSSxJQUFJLE9BQUssS0FBSyxJQUFMLENBQVUsQ0FBVixDQUFZLFVBQVEsV0FBUixDQUFqQixFQUFzQyxJQUFFLENBQUYsRUFBSSxNQUFJLEtBQUssTUFBTCxFQUFZLElBQUUsR0FBRixFQUFNLEdBQXhFLEVBQTRFO0FBQzNFLFFBQUksT0FBSyxLQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLElBQXZCLENBQTRCLE9BQTVCLEdBQW9DLEtBQUssSUFBTCxDQUFVLE1BQVYsQ0FBaUIsS0FBSyxDQUFMLEVBQVEsSUFBUixDQUFhLE1BQWIsQ0FBakIsQ0FBcEMsQ0FEa0U7QUFFM0UsUUFBSSxRQUFNLEtBQUssUUFBUSxPQUFLLE9BQUwsRUFBYixDQUE0QixLQUFLLGVBQUwsRUFBc0IsS0FBSyxJQUFMLEVBQVcsSUFBN0QsRUFBbUUsS0FBSyxDQUFMLEVBQVEsSUFBUixDQUFhLFFBQWIsQ0FBbkUsQ0FBTixDQUZ1RTtBQUczRSxVQUFNLEtBQU4sQ0FBWSxnQkFBWixFQUgyRTtBQUkzRSxTQUFLLElBQUwsQ0FBVSxZQUFWLENBQXVCLElBQXZCLENBQTRCLE9BQTVCLEdBQW9DLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FKdUM7SUFBNUU7Ozs7bUNBT2U7QUFDZixVQUFPLHNCQUFVLEtBQUssSUFBTCxFQUFVLEtBQUssSUFBTCxFQUFXLElBQS9CLENBQVAsQ0FEZTs7OztzQkFJQztBQUFDLFVBQU8sU0FBUCxDQUFEOzs7O1FBdkNHIiwiZmlsZSI6InNlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBNb2RlbCBmcm9tICcuLi9tb2RlbCdcbmltcG9ydCBIZWFkZXIgZnJvbSAnLi9oZWFkZXInXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4vZm9vdGVyJ1xuaW1wb3J0IFN0eWxlIGZyb20gJy4vc3R5bGUvc2VjdGlvbidcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mgc2VjdGlvbiBleHRlbmRzIE1vZGVse1xuXHRjb25zdHJ1Y3Rvcih3WG1sLCB3RG9jLCBtUGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0bVBhcmVudC5jb250ZW50LnBvcCgpXG5cdFx0dGhpcy53Rmlyc3Q9bVBhcmVudC5jb250ZW50Lmxlbmd0aCA/IG1QYXJlbnQuY29udGVudFttUGFyZW50LmNvbnRlbnQubGVuZ3RoLTFdLndMYXN0Lm5leHRTaWJsaW5nIDogbVBhcmVudC53WG1sLmZpcnN0Q2hpbGRcblxuXHRcdHRoaXMud0xhc3Q9d1htbFxuXHRcdHdoaWxlKHRoaXMud0xhc3QucGFyZW50Tm9kZSE9bVBhcmVudC53WG1sKVxuXHRcdFx0dGhpcy53TGFzdD10aGlzLndMYXN0LnBhcmVudE5vZGVcblx0XHRpZih0aGlzLndMYXN0PT13WG1sKVxuXHRcdFx0dGhpcy53TGFzdD13WG1sLnByZXZpb3VzU2libGluZ1xuXG5cdFx0bVBhcmVudC5jb250ZW50LnB1c2godGhpcylcblxuXHRcdHdEb2MucGFyc2VDb250ZXh0LnNlY3Rpb24uY3VycmVudD10aGlzXG5cdH1cblxuXHRfaXRlcmF0ZShmLCB2aXNpdG9yRmFjdG9yaWVzKXtcblx0XHR0aGlzLl9pdGVyYXRlSGVhZGVyRm9vdGVyKHZpc2l0b3JGYWN0b3JpZXMsJ2hlYWRlcicpXG5cdFx0dmFyIGN1cnJlbnQ9dGhpcy53Rmlyc3Rcblx0XHRkb3tcblx0XHRcdGYoY3VycmVudClcblx0XHRcdGN1cnJlbnQ9Y3VycmVudD09dGhpcy53TGFzdCA/IG51bGwgOiBjdXJyZW50Lm5leHRTaWJsaW5nXG5cdFx0fXdoaWxlKGN1cnJlbnQpXG5cdFx0dGhpcy5faXRlcmF0ZUhlYWRlckZvb3Rlcih2aXNpdG9yRmFjdG9yaWVzLCdmb290ZXInKVxuXHR9XG5cblx0X2l0ZXJhdGVIZWFkZXJGb290ZXIodmlzaXRvckZhY3RvcmllcyxyZWZUeXBlKXtcblx0XHRmb3IodmFyIHJlZnM9dGhpcy53WG1sLiQocmVmVHlwZSsnUmVmZXJlbmNlJyksaT0wLGxlbj1yZWZzLmxlbmd0aDtpPGxlbjtpKyspe1xuXHRcdFx0dmFyIHBhcnQ9dGhpcy53RG9jLnBhcnNlQ29udGV4dC5wYXJ0LmN1cnJlbnQ9dGhpcy53RG9jLmdldFJlbChyZWZzW2ldLmF0dHIoJ3I6aWQnKSlcblx0XHRcdHZhciBtb2RlbD1uZXcgKHJlcXVpcmUoJy4vJytyZWZUeXBlKSkocGFydC5kb2N1bWVudEVsZW1lbnQsIHRoaXMud0RvYywgdGhpcywgcmVmc1tpXS5hdHRyKCd3OnR5cGUnKSlcblx0XHRcdG1vZGVsLnBhcnNlKHZpc2l0b3JGYWN0b3JpZXMpXG5cdFx0XHR0aGlzLndEb2MucGFyc2VDb250ZXh0LnBhcnQuY3VycmVudD10aGlzLndEb2MucGFydE1haW5cblx0XHR9XG5cdH1cblx0Z2V0RGlyZWN0U3R5bGUoKXtcblx0XHRyZXR1cm4gbmV3IFN0eWxlKHRoaXMud1htbCx0aGlzLndEb2MsIHRoaXMpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3NlY3Rpb24nfVxufVxuIl19