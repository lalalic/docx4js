'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _style = require('../style');

var _style2 = _interopRequireDefault(_style);

var _paragraph = require('./paragraph');

var _paragraph2 = _interopRequireDefault(_paragraph);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Table = function (_Style) {
	_inherits(Table, _Style);

	function Table() {
		_classCallCheck(this, Table);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Table).apply(this, arguments));
	}

	_createClass(Table, [{
		key: 'parse',
		value: function parse(factories) {
			_get(Object.getPrototypeOf(Table.prototype), 'parse', this).apply(this, arguments);

			var TableStyle = this.constructor;
			for (var styles = this.wXml.$('tblStylePr'), len = styles.length, i = 0; i < len; i++) {
				var model = new TableStyle(styles[i], this.wDoc, this);
				model.id = this.id;
				model.parse(factories);
			}
		}
	}, {
		key: '_iterate',
		value: function _iterate(f, factories, visitors) {
			var pr = null;
			(pr = this.wXml.$1('>tblPr:not(:empty)')) && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>trPr:not(:empty)')) && new this.constructor.RowProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>tcPr:not(:empty)')) && new this.constructor.CellProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>pPr:not(:empty)')) && new _paragraph2.default.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>rPr:not(:empty)')) && new _inline2.default.Properties(pr, this.wDoc, this).parse(visitors);
		}
	}, {
		key: 'getTarget',
		value: function getTarget() {
			return this.wXml.attr('w:type');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'style.table';
		}
	}, {
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}, {
		key: 'RowProperties',
		get: function get() {
			return RowProperties;
		}
	}, {
		key: 'CellProperties',
		get: function get() {
			return CellProperties;
		}
	}]);

	return Table;
}(_style2.default);

exports.default = Table;

var Properties = function (_Style$Properties) {
	_inherits(Properties, _Style$Properties);

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'tblBorders',
		value: function tblBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				border = value[(border = borders[i]).localName] = this.asObject(border);
				border.sz && (border.sz = border.sz / 8);
				border.color && (border.color = this.asColor(border.color));
			}
			return value;
		}
	}, {
		key: 'tblCellMar',
		value: function tblCellMar(x) {
			var value = {};
			for (var borders = x.childNodes, i = 0, len = borders.length, v; i < len; i++) {
				value[borders[i].localName] = parseInt(borders[i].attr('w:w')) / 20;
			}return value;
		}
	}, {
		key: 'tblLook',
		value: function tblLook(x) {
			return this.asObject(x, function (x) {
				return parseInt(x);
			});
		}
	}, {
		key: 'tblStyleRowBandSize',
		value: function tblStyleRowBandSize(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'tblStyleColBandSize',
		value: function tblStyleColBandSize(x) {
			return parseInt(x.attr('w:val'));
		}
	}, {
		key: 'tblW',
		value: function tblW(x) {
			switch (x.attr('w:type')) {
				case 'pct':
					return parseInt(x.attr('w:w')) * 2 / 100 + '%';
				case 'auto':
					return 'auto';
				default:
					this.asPt(x.attr('w:w')) + 'pt';
			}
		}
	}, {
		key: 'tblInd',
		value: function tblInd(x) {
			return this.asPt(x.attr('w:w'));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'table';
		}
	}]);

	return Properties;
}(_style2.default.Properties);

var RowProperties = function (_Style$Properties2) {
	_inherits(RowProperties, _Style$Properties2);

	function RowProperties() {
		_classCallCheck(this, RowProperties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RowProperties).apply(this, arguments));
	}

	_createClass(RowProperties, [{
		key: 'cnfStyle',
		value: function cnfStyle(x) {
			return x.attr('w:val');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'row';
		}
	}]);

	return RowProperties;
}(_style2.default.Properties);

var CellProperties = function (_Style$Properties3) {
	_inherits(CellProperties, _Style$Properties3);

	function CellProperties() {
		_classCallCheck(this, CellProperties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(CellProperties).apply(this, arguments));
	}

	_createClass(CellProperties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				border = value[(border = borders[i]).localName] = this.asObject(border);
				border.sz && (border.sz = border.sz / 8);
				border.color && (border.color = this.asColor(border.color));
			}
			return value;
		}
	}, {
		key: 'shd',
		value: function shd(x) {
			return this.asColor(x.attr('w:fill'));
		}
	}, {
		key: 'cnfStyle',
		value: function cnfStyle(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'gridSpan',
		value: function gridSpan(x) {
			return x.attr('w:val');
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'cell';
		}
	}]);

	return CellProperties;
}(_style2.default.Properties);

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt3QkFDZCxXQUFVO0FBQ2YsOEJBRm1CLDZDQUVKLFVBQWYsQ0FEZTs7QUFHZixPQUFJLGFBQVcsS0FBSyxXQUFMLENBSEE7QUFJZixRQUFJLElBQUksU0FBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksWUFBWixDQUFQLEVBQWtDLE1BQUksT0FBTyxNQUFQLEVBQWUsSUFBRSxDQUFGLEVBQUksSUFBRSxHQUFGLEVBQU0sR0FBdkUsRUFBMkU7QUFDMUUsUUFBSSxRQUFNLElBQUksVUFBSixDQUFlLE9BQU8sQ0FBUCxDQUFmLEVBQXlCLEtBQUssSUFBTCxFQUFVLElBQW5DLENBQU4sQ0FEc0U7QUFFMUUsVUFBTSxFQUFOLEdBQVMsS0FBSyxFQUFMLENBRmlFO0FBRzFFLFVBQU0sS0FBTixDQUFZLFNBQVosRUFIMEU7SUFBM0U7Ozs7MkJBTVEsR0FBRyxXQUFXLFVBQVM7QUFDL0IsT0FBSSxLQUFHLElBQUgsQ0FEMkI7QUFFL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxvQkFBYixDQUFILENBQUQsSUFBMkMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsRUFBaEMsRUFBbUMsS0FBSyxJQUFMLEVBQVUsSUFBN0MsRUFBbUQsS0FBbkQsQ0FBeUQsUUFBekQsQ0FBM0MsQ0FGK0I7QUFHL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxtQkFBYixDQUFILENBQUQsSUFBMEMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsYUFBakIsQ0FBK0IsRUFBbkMsRUFBc0MsS0FBSyxJQUFMLEVBQVUsSUFBaEQsRUFBc0QsS0FBdEQsQ0FBNEQsUUFBNUQsQ0FBMUMsQ0FIK0I7QUFJL0Is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RixDQUFPLE9BQVAsQ0FBUCxDQURVOzs7O3NCQUdNO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFuQlo7RUFBdUIsZ0JBQU0sVUFBTiIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN0eWxle1xuXHRwYXJzZShmYWN0b3JpZXMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblxuXHRcdHZhciBUYWJsZVN0eWxlPXRoaXMuY29uc3RydWN0b3Jcblx0XHRmb3IodmFyIHN0eWxlcz10aGlzLndYbWwuJCgndGJsU3R5bGVQcicpLCBsZW49c3R5bGVzLmxlbmd0aCwgaT0wO2k8bGVuO2krKyl7XG5cdFx0XHR2YXIgbW9kZWw9bmV3IFRhYmxlU3R5bGUoc3R5bGVzW2ldLHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0bW9kZWwuaWQ9dGhpcy5pZFxuXHRcdFx0bW9kZWwucGFyc2UoZmFjdG9yaWVzKVxuXHRcdH1cblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHR2YXIgcHI9bnVsbDtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGJsUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz50clByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlJvd1Byb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGNQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5DZWxsUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz5wUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IFBhcmFncmFwaC5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnJQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgSW5saW5lLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0fVxuXHRnZXRUYXJnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6dHlwZScpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLnRhYmxlJ31cblxuXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cblxuXHRzdGF0aWMgZ2V0IFJvd1Byb3BlcnRpZXMoKXtyZXR1cm4gUm93UHJvcGVydGllc31cblxuXHRzdGF0aWMgZ2V0IENlbGxQcm9wZXJ0aWVzKCl7cmV0dXJuIENlbGxQcm9wZXJ0aWVzfVxufVxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHRibEJvcmRlcnMoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsYm9yZGVyLGk9MCxsZW49Ym9yZGVycy5sZW5ndGg7aTxsZW47aSsrKXtcblx0XHRcdGJvcmRlcj12YWx1ZVsoYm9yZGVyPWJvcmRlcnNbaV0pLmxvY2FsTmFtZV09dGhpcy5hc09iamVjdChib3JkZXIpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0dGJsQ2VsbE1hcih4KXtcblx0XHR2YXIgdmFsdWU9e307XG5cdFx0Zm9yKHZhciBib3JkZXJzPXguY2hpbGROb2RlcyxpPTAsbGVuPWJvcmRlcnMubGVuZ3RoLHY7aTxsZW47aSsrKVxuXHRcdFx0dmFsdWVbYm9yZGVyc1tpXS5sb2NhbE5hbWVdPXBhcnNlSW50KGJvcmRlcnNbaV0uYXR0cigndzp3JykpLzIwXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0dGJsTG9vayh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LGZ1bmN0aW9uKHgpe3JldHVybiBwYXJzZUludCh4KX0pXG5cdH1cblx0dGJsU3R5bGVSb3dCYW5kU2l6ZSh4KXtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKVxuXHR9XG5cdHRibFN0eWxlQ29sQmFuZFNpemUoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHR0YmxXKHgpe1xuXHRcdHN3aXRjaCh4LmF0dHIoJ3c6dHlwZScpKXtcblx0XHRjYXNlICdwY3QnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp3JykpKjIvMTAwKyclJ1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0cmV0dXJuICdhdXRvJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aGlzLmFzUHQoeC5hdHRyKCd3OncnKSkrJ3B0J1xuXHRcdH1cblx0fVxuXHR0YmxJbmQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxufVxuXG5jbGFzcyBSb3dQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0Y25mU3R5bGUoeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAncm93J31cbn1cblxuY2xhc3MgQ2VsbFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHR0Y0JvcmRlcnMoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsYm9yZGVyLGk9MCxsZW49Ym9yZGVycy5sZW5ndGg7aTxsZW47aSsrKXtcblx0XHRcdGJvcmRlcj12YWx1ZVsoYm9yZGVyPWJvcmRlcnNbaV0pLmxvY2FsTmFtZV09dGhpcy5hc09iamVjdChib3JkZXIpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0c2hkKHgpe1xuXHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5hdHRyKCd3OmZpbGwnKSlcblx0fVxuXHRjbmZTdHlsZSh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0Z3JpZFNwYW4oeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAnY2VsbCd9XG59XG4iXX0=