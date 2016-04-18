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
	}]);

	return Table;
}(_style2.default);

exports.default = Table;


Table.Properties = function (_Style$Properties) {
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
				borders[i].nodeType == 1 && (value[borders[i].localName] = parseInt(borders[i].attr('w:w')) / 20);
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

Table.RowProperties = function (_Style$Properties2) {
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

Table.CellProperties = function (_Style$Properties3) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt3QkFDZCxXQUFVO0FBQ2YsOEJBRm1CLDZDQUVKLFVBQWYsQ0FEZTs7QUFHZixPQUFJLGFBQVcsS0FBSyxXQUFMLENBSEE7QUFJZixRQUFJLElBQUksU0FBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksWUFBWixDQUFQLEVBQWtDLE1BQUksT0FBTyxNQUFQLEVBQWUsSUFBRSxDQUFGLEVBQUksSUFBRSxHQUFGLEVBQU0sR0FBdkUsRUFBMkU7QUFDMUUsUUFBSSxRQUFNLElBQUksVUFBSixDQUFlLE9BQU8sQ0FBUCxDQUFmLEVBQXlCLEtBQUssSUFBTCxFQUFVLElBQW5DLENBQU4sQ0FEc0U7QUFFMUUsVUFBTSxFQUFOLEdBQVMsS0FBSyxFQUFMLENBRmlFO0FBRzFFLFVBQU0sS0FBTixDQUFZLFNBQVosRUFIMEU7SUFBM0U7Ozs7MkJBTVEsR0FBRyxXQUFXLFVBQVM7QUFDL0IsT0FBSSxLQUFHLElBQUgsQ0FEMkI7QUFFL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxvQkFBYixDQUFILENBQUQsSUFBMkMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsRUFBaEMsRUFBbUMsS0FBSyxJQUFMLEVBQVUsSUFBN0MsRUFBbUQsS0FBbkQsQ0FBeUQsUUFBekQsQ0FBM0MsQ0FGK0I7QUFHL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxtQkFBYixDQUFILENBQUQsSUFBMEMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsYUFBakIsQ0FBK0IsRUFBbkMsRUFBc0MsS0FBSyxJQUFMLEVBQVUsSUFBaEQsRUFBc0QsS0FBdEQsQ0FBNEQsUUFBNUQsQ0FBMUMsQ0FIK0I7QUFJL0Is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VixVQUFPLEVBQUUsSUFBRixDQUFPLE9BQVAsQ0FBUCxDQURVOzs7O3NCQUdNO0FBQUMsVUFBTyxNQUFQLENBQUQ7Ozs7UUFuQlM7RUFBdUIsZ0JBQU0sVUFBTixDQUFsRCIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN0eWxle1xuXHRwYXJzZShmYWN0b3JpZXMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblxuXHRcdHZhciBUYWJsZVN0eWxlPXRoaXMuY29uc3RydWN0b3Jcblx0XHRmb3IodmFyIHN0eWxlcz10aGlzLndYbWwuJCgndGJsU3R5bGVQcicpLCBsZW49c3R5bGVzLmxlbmd0aCwgaT0wO2k8bGVuO2krKyl7XG5cdFx0XHR2YXIgbW9kZWw9bmV3IFRhYmxlU3R5bGUoc3R5bGVzW2ldLHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0bW9kZWwuaWQ9dGhpcy5pZFxuXHRcdFx0bW9kZWwucGFyc2UoZmFjdG9yaWVzKVxuXHRcdH1cblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHR2YXIgcHI9bnVsbDtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGJsUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz50clByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlJvd1Byb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGNQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5DZWxsUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz5wUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IFBhcmFncmFwaC5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnJQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgSW5saW5lLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0fVxuXHRnZXRUYXJnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6dHlwZScpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLnRhYmxlJ31cbn1cblxuVGFibGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0dGJsQm9yZGVycyh4KXtcblx0XHR2YXIgdmFsdWU9e307XG5cdFx0Zm9yKHZhciBib3JkZXJzPXguY2hpbGROb2Rlcyxib3JkZXIsaT0wLGxlbj1ib3JkZXJzLmxlbmd0aDtpPGxlbjtpKyspe1xuXHRcdFx0Ym9yZGVyPXZhbHVlWyhib3JkZXI9Ym9yZGVyc1tpXSkubG9jYWxOYW1lXT10aGlzLmFzT2JqZWN0KGJvcmRlcilcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHR0YmxDZWxsTWFyKHgpe1xuXHRcdHZhciB2YWx1ZT17fTtcblx0XHRmb3IodmFyIGJvcmRlcnM9eC5jaGlsZE5vZGVzLGk9MCxsZW49Ym9yZGVycy5sZW5ndGgsdjtpPGxlbjtpKyspXG5cdFx0XHRib3JkZXJzW2ldLm5vZGVUeXBlPT0xICYmICh2YWx1ZVtib3JkZXJzW2ldLmxvY2FsTmFtZV09cGFyc2VJbnQoYm9yZGVyc1tpXS5hdHRyKCd3OncnKSkvMjApXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0dGJsTG9vayh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LGZ1bmN0aW9uKHgpe3JldHVybiBwYXJzZUludCh4KX0pXG5cdH1cblx0dGJsU3R5bGVSb3dCYW5kU2l6ZSh4KXtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKVxuXHR9XG5cdHRibFN0eWxlQ29sQmFuZFNpemUoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHR0YmxXKHgpe1xuXHRcdHN3aXRjaCh4LmF0dHIoJ3c6dHlwZScpKXtcblx0XHRjYXNlICdwY3QnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp3JykpKjIvMTAwKyclJ1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0cmV0dXJuICdhdXRvJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aGlzLmFzUHQoeC5hdHRyKCd3OncnKSkrJ3B0J1xuXHRcdH1cblx0fVxuXHR0YmxJbmQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxufVxuXG5UYWJsZS5Sb3dQcm9wZXJ0aWVzPWNsYXNzIFJvd1Byb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjbmZTdHlsZSh4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdyb3cnfVxufVxuXG5UYWJsZS5DZWxsUHJvcGVydGllcz1jbGFzcyBDZWxsUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHRjQm9yZGVycyh4KXtcblx0XHR2YXIgdmFsdWU9e307XG5cdFx0Zm9yKHZhciBib3JkZXJzPXguY2hpbGROb2Rlcyxib3JkZXIsaT0wLGxlbj1ib3JkZXJzLmxlbmd0aDtpPGxlbjtpKyspe1xuXHRcdFx0Ym9yZGVyPXZhbHVlWyhib3JkZXI9Ym9yZGVyc1tpXSkubG9jYWxOYW1lXT10aGlzLmFzT2JqZWN0KGJvcmRlcilcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRzaGQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmF0dHIoJ3c6ZmlsbCcpKVxuXHR9XG5cdGNuZlN0eWxlKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRncmlkU3Bhbih4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdjZWxsJ31cbn1cbiJdfQ==