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

		return _possibleConstructorReturn(this, (Table.__proto__ || Object.getPrototypeOf(Table)).apply(this, arguments));
	}

	_createClass(Table, [{
		key: 'parse',
		value: function parse(factories) {
			_get(Table.prototype.__proto__ || Object.getPrototypeOf(Table.prototype), 'parse', this).apply(this, arguments);

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

		return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'tblBorders',
		value: function tblBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				if (borders[i].nodeType !== 1) continue;
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
				borders[i].nodeType == 1 && (value[borders[i].localName] = this.pt2Px(this.asPt(borders[i].attr('w:w'))));
			}return value;
		}
	}, {
		key: 'tblCellSpacing',
		value: function tblCellSpacing(x) {
			return this.pt2Px(this.asPt(x.attr('w:val')));
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
					return this.pt2Px(this.asPt(x.attr('w:w')));
			}
		}
	}, {
		key: 'tblInd',
		value: function tblInd(x) {
			return this.pt2Px(this.asPt(x.attr('w:w')));
		}
	}], [{
		key: 'type',
		get: function get() {
			return 'table';
		}
	}]);

	return Properties;
}(_style2.default.Properties);

var StyleNameMap = {
	firstRow: "firstRow",
	lastRow: "lastRow",
	firstColumn: "firstCol",
	lastColumn: "lastCol",
	oddVBand: "band1Vert",
	evenVBand: "band2Vert",
	oddHBand: "band1Horz",
	evenHBand: "band2Horz",
	firstRowFirstColumn: "nwCell",
	firstRowLastColumn: "neCell",
	lastRowFirstColumn: "swCell",
	lastRowLastColumn: "seCell"
};

Table.RowProperties = function (_Style$Properties2) {
	_inherits(RowProperties, _Style$Properties2);

	function RowProperties() {
		_classCallCheck(this, RowProperties);

		return _possibleConstructorReturn(this, (RowProperties.__proto__ || Object.getPrototypeOf(RowProperties)).apply(this, arguments));
	}

	_createClass(RowProperties, [{
		key: 'cnfStyle',
		value: function cnfStyle(x, t) {
			return Object.keys(t = this.asObject(x)).map(function (a) {
				return t[a] == '1' && StyleNameMap[a];
			}).filter(function (a) {
				return a;
			});
		}
	}, {
		key: 'tblCellSpacing',
		value: function tblCellSpacing(x) {
			return this.pt2Px(this.asPt(x.attr('w:val')));
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

		return _possibleConstructorReturn(this, (CellProperties.__proto__ || Object.getPrototypeOf(CellProperties)).apply(this, arguments));
	}

	_createClass(CellProperties, [{
		key: 'tcBorders',
		value: function tcBorders(x) {
			var value = {};
			for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
				if (borders[i].nodeType !== 1) continue;
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
		value: function cnfStyle(x, t) {
			return Object.keys(t = this.asObject(x)).map(function (a) {
				return t[a] == '1' && StyleNameMap[a];
			}).filter(function (a) {
				return a;
			});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOlsiVGFibGUiLCJmYWN0b3JpZXMiLCJhcmd1bWVudHMiLCJUYWJsZVN0eWxlIiwiY29uc3RydWN0b3IiLCJzdHlsZXMiLCJ3WG1sIiwiJCIsImxlbiIsImxlbmd0aCIsImkiLCJtb2RlbCIsIndEb2MiLCJpZCIsInBhcnNlIiwiZiIsInZpc2l0b3JzIiwicHIiLCIkMSIsIlByb3BlcnRpZXMiLCJSb3dQcm9wZXJ0aWVzIiwiQ2VsbFByb3BlcnRpZXMiLCJQYXJhZ3JhcGgiLCJJbmxpbmUiLCJhdHRyIiwiU3R5bGUiLCJ4IiwidmFsdWUiLCJib3JkZXJzIiwiY2hpbGROb2RlcyIsImJvcmRlciIsIm5vZGVUeXBlIiwibG9jYWxOYW1lIiwiYXNPYmplY3QiLCJzeiIsImNvbG9yIiwiYXNDb2xvciIsInYiLCJwdDJQeCIsImFzUHQiLCJwYXJzZUludCIsIlN0eWxlTmFtZU1hcCIsImZpcnN0Um93IiwibGFzdFJvdyIsImZpcnN0Q29sdW1uIiwibGFzdENvbHVtbiIsIm9kZFZCYW5kIiwiZXZlblZCYW5kIiwib2RkSEJhbmQiLCJldmVuSEJhbmQiLCJmaXJzdFJvd0ZpcnN0Q29sdW1uIiwiZmlyc3RSb3dMYXN0Q29sdW1uIiwibGFzdFJvd0ZpcnN0Q29sdW1uIiwibGFzdFJvd0xhc3RDb2x1bW4iLCJ0IiwiT2JqZWN0Iiwia2V5cyIsIm1hcCIsImEiLCJmaWx0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsSzs7Ozs7Ozs7Ozs7d0JBQ2RDLFMsRUFBVTtBQUNmLHdHQUFlQyxTQUFmOztBQUVBLE9BQUlDLGFBQVcsS0FBS0MsV0FBcEI7QUFDQSxRQUFJLElBQUlDLFNBQU8sS0FBS0MsSUFBTCxDQUFVQyxDQUFWLENBQVksWUFBWixDQUFYLEVBQXNDQyxNQUFJSCxPQUFPSSxNQUFq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RSxLQUFLckIsUUFBTCxDQUFjUCxDQUFkLENBQWQsRUFBZ0MrQixHQUFoQyxDQUFvQztBQUFBLFdBQUdILEVBQUVJLENBQUYsS0FBTSxHQUFOLElBQWFqQixhQUFhaUIsQ0FBYixDQUFoQjtBQUFBLElBQXBDLEVBQXFFQyxNQUFyRSxDQUE0RTtBQUFBLFdBQUdELENBQUg7QUFBQSxJQUE1RSxDQUFQO0FBQ0E7QUFoQkY7QUFBQTtBQUFBLDJCQWlCVWhDLENBakJWLEVBaUJZO0FBQ1YsVUFBT0EsRUFBRUYsSUFBRixDQUFPLE9BQVAsQ0FBUDtBQUNBO0FBbkJGO0FBQUE7QUFBQSxzQkFvQmtCO0FBQUMsVUFBTyxNQUFQO0FBQWM7QUFwQmpDOztBQUFBO0FBQUEsRUFBa0RDLGdCQUFNTixVQUF4RCIsImZpbGUiOiJ0YWJsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHlsZSBmcm9tICcuLi9zdHlsZSdcbmltcG9ydCBQYXJhZ3JhcGggZnJvbSAnLi9wYXJhZ3JhcGgnXG5pbXBvcnQgSW5saW5lIGZyb20gJy4vaW5saW5lJ1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJsZSBleHRlbmRzIFN0eWxle1xuXHRwYXJzZShmYWN0b3JpZXMpe1xuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcblxuXHRcdHZhciBUYWJsZVN0eWxlPXRoaXMuY29uc3RydWN0b3Jcblx0XHRmb3IodmFyIHN0eWxlcz10aGlzLndYbWwuJCgndGJsU3R5bGVQcicpLCBsZW49c3R5bGVzLmxlbmd0aCwgaT0wO2k8bGVuO2krKyl7XG5cdFx0XHR2YXIgbW9kZWw9bmV3IFRhYmxlU3R5bGUoc3R5bGVzW2ldLHRoaXMud0RvYyx0aGlzKVxuXHRcdFx0bW9kZWwuaWQ9dGhpcy5pZFxuXHRcdFx0bW9kZWwucGFyc2UoZmFjdG9yaWVzKVxuXHRcdH1cblx0fVxuXHRfaXRlcmF0ZShmLCBmYWN0b3JpZXMsIHZpc2l0b3JzKXtcblx0XHR2YXIgcHI9bnVsbDtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGJsUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz50clByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlJvd1Byb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dGNQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5DZWxsUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz5wUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IFBhcmFncmFwaC5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnJQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgSW5saW5lLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0fVxuXHRnZXRUYXJnZXQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6dHlwZScpXG5cdH1cblxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3N0eWxlLnRhYmxlJ31cbn1cblxuVGFibGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0dGJsQm9yZGVycyh4KXtcblx0XHR2YXIgdmFsdWU9e307XG5cdFx0Zm9yKHZhciBib3JkZXJzPXguY2hpbGROb2Rlcyxib3JkZXIsaT0wLGxlbj1ib3JkZXJzLmxlbmd0aDtpPGxlbjtpKyspe1xuXHRcdFx0aWYoYm9yZGVyc1tpXS5ub2RlVHlwZSE9PTEpIGNvbnRpbnVlXG5cdFx0XHRib3JkZXI9dmFsdWVbKGJvcmRlcj1ib3JkZXJzW2ldKS5sb2NhbE5hbWVdPXRoaXMuYXNPYmplY3QoYm9yZGVyKVxuXHRcdFx0Ym9yZGVyLnN6ICYmIChib3JkZXIuc3o9Ym9yZGVyLnN6LzgpO1xuXHRcdFx0Ym9yZGVyLmNvbG9yICYmIChib3JkZXIuY29sb3I9dGhpcy5hc0NvbG9yKGJvcmRlci5jb2xvcikpXG5cdFx0fVxuXHRcdHJldHVybiB2YWx1ZVxuXHR9XG5cdHRibENlbGxNYXIoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsaT0wLGxlbj1ib3JkZXJzLmxlbmd0aCx2O2k8bGVuO2krKylcblx0XHRcdGJvcmRlcnNbaV0ubm9kZVR5cGU9PTEgJiYgKHZhbHVlW2JvcmRlcnNbaV0ubG9jYWxOYW1lXT10aGlzLnB0MlB4KHRoaXMuYXNQdChib3JkZXJzW2ldLmF0dHIoJ3c6dycpKSkpXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0dGJsQ2VsbFNwYWNpbmcoeCl7XG5cdFx0cmV0dXJuIHRoaXMucHQyUHgodGhpcy5hc1B0KHguYXR0cigndzp2YWwnKSkpXG5cdH1cblx0dGJsTG9vayh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LGZ1bmN0aW9uKHgpe3JldHVybiBwYXJzZUludCh4KX0pXG5cdH1cblx0dGJsU3R5bGVSb3dCYW5kU2l6ZSh4KXtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKVxuXHR9XG5cdHRibFN0eWxlQ29sQmFuZFNpemUoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHR0YmxXKHgpe1xuXHRcdHN3aXRjaCh4LmF0dHIoJ3c6dHlwZScpKXtcblx0XHRjYXNlICdwY3QnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp3JykpKjIvMTAwKyclJ1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0cmV0dXJuICdhdXRvJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCd3OncnKSkpXG5cdFx0fVxuXHR9XG5cdHRibEluZCh4KXtcblx0XHRyZXR1cm4gdGhpcy5wdDJQeCh0aGlzLmFzUHQoeC5hdHRyKCd3OncnKSkpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICd0YWJsZSd9XG59XG5cbnZhciBTdHlsZU5hbWVNYXA9e1xuXHRmaXJzdFJvdzpcImZpcnN0Um93XCIsXG5cdGxhc3RSb3c6XCJsYXN0Um93XCIsXG5cdGZpcnN0Q29sdW1uOlwiZmlyc3RDb2xcIixcblx0bGFzdENvbHVtbjpcImxhc3RDb2xcIiwgXG5cdG9kZFZCYW5kOlwiYmFuZDFWZXJ0XCIgLFxuXHRldmVuVkJhbmQ6XCJiYW5kMlZlcnRcIiAsXG5cdG9kZEhCYW5kOlwiYmFuZDFIb3J6XCIgLFxuXHRldmVuSEJhbmQ6XCJiYW5kMkhvcnpcIiAsXG5cdGZpcnN0Um93Rmlyc3RDb2x1bW46XCJud0NlbGxcIiAsXG5cdGZpcnN0Um93TGFzdENvbHVtbjpcIm5lQ2VsbFwiICxcblx0bGFzdFJvd0ZpcnN0Q29sdW1uOlwic3dDZWxsXCIgLFxuXHRsYXN0Um93TGFzdENvbHVtbjpcInNlQ2VsbFwiXG59XG5cblRhYmxlLlJvd1Byb3BlcnRpZXM9Y2xhc3MgUm93UHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdGNuZlN0eWxlKHgsdCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHQ9dGhpcy5hc09iamVjdCh4KSkubWFwKGE9PnRbYV09PScxJyAmJiBTdHlsZU5hbWVNYXBbYV0pLmZpbHRlcihhPT5hKVxuXHR9XG5cdHRibENlbGxTcGFjaW5nKHgpe1xuXHRcdHJldHVybiB0aGlzLnB0MlB4KHRoaXMuYXNQdCh4LmF0dHIoJ3c6dmFsJykpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAncm93J31cbn1cblxuVGFibGUuQ2VsbFByb3BlcnRpZXM9Y2xhc3MgQ2VsbFByb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHR0Y0JvcmRlcnMoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsYm9yZGVyLGk9MCxsZW49Ym9yZGVycy5sZW5ndGg7aTxsZW47aSsrKXtcblx0XHRcdGlmKGJvcmRlcnNbaV0ubm9kZVR5cGUhPT0xKSBjb250aW51ZVxuXHRcdFx0Ym9yZGVyPXZhbHVlWyhib3JkZXI9Ym9yZGVyc1tpXSkubG9jYWxOYW1lXT10aGlzLmFzT2JqZWN0KGJvcmRlcilcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHRzaGQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNDb2xvcih4LmF0dHIoJ3c6ZmlsbCcpKVxuXHR9XG5cdGNuZlN0eWxlKHgsdCl7XG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHQ9dGhpcy5hc09iamVjdCh4KSkubWFwKGE9PnRbYV09PScxJyAmJiBTdHlsZU5hbWVNYXBbYV0pLmZpbHRlcihhPT5hKVxuXHR9XG5cdGdyaWRTcGFuKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ2NlbGwnfVxufVxuIl19