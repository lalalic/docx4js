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

		return _possibleConstructorReturn(this, Object.getPrototypeOf(RowProperties).apply(this, arguments));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUvdGFibGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRXFCOzs7Ozs7Ozs7Ozt3QkFDZCxXQUFVO0FBQ2YsOEJBRm1CLDZDQUVKLFVBQWYsQ0FEZTs7QUFHZixPQUFJLGFBQVcsS0FBSyxXQUFMLENBSEE7QUFJZixRQUFJLElBQUksU0FBTyxLQUFLLElBQUwsQ0FBVSxDQUFWLENBQVksWUFBWixDQUFQLEVBQWtDLE1BQUksT0FBTyxNQUFQLEVBQWUsSUFBRSxDQUFGLEVBQUksSUFBRSxHQUFGLEVBQU0sR0FBdkUsRUFBMkU7QUFDMUUsUUFBSSxRQUFNLElBQUksVUFBSixDQUFlLE9BQU8sQ0FBUCxDQUFmLEVBQXlCLEtBQUssSUFBTCxFQUFVLElBQW5DLENBQU4sQ0FEc0U7QUFFMUUsVUFBTSxFQUFOLEdBQVMsS0FBSyxFQUFMLENBRmlFO0FBRzFFLFVBQU0sS0FBTixDQUFZLFNBQVosRUFIMEU7SUFBM0U7Ozs7MkJBTVEsR0FBRyxXQUFXLFVBQVM7QUFDL0IsT0FBSSxLQUFHLElBQUgsQ0FEMkI7QUFFL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxvQkFBYixDQUFILENBQUQsSUFBMkMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsVUFBakIsQ0FBNEIsRUFBaEMsRUFBbUMsS0FBSyxJQUFMLEVBQVUsSUFBN0MsRUFBbUQsS0FBbkQsQ0FBeUQsUUFBekQsQ0FBM0MsQ0FGK0I7QUFHL0IsSUFBQyxLQUFHLEtBQUssSUFBTCxDQUFVLEVBQVYsQ0FBYSxtQkFBYixDQUFILENBQUQsSUFBMEMsSUFBSSxLQUFLLFdBQUwsQ0FBaUIsYUFBakIsQ0FBK0IsRUFBbkMsRUFBc0MsS0FBSyxJQUFMLEVBQVUsSUFBaEQsRUFBc0QsS0FBdEQsQ0FBNEQsUUFBNUQsQ0FBMUMsQ0FIK0I7QUFJL0Is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USxDQUFSLEVBQVcsUUFBWCxLQUFzQixDQUF0QixFQUF5QixTQUE1QjtBQUNBLGFBQU8sTUFBTSxDQUFDLFNBQU8sUUFBUSxDQUFSLENBQVAsQ0FBRCxDQUFvQixTQUFwQixDQUFOLEdBQXFDLEtBQUssUUFBTCxDQUFjLE1BQWQsQ0FBckMsQ0FGNkQ7QUFHcEUsV0FBTyxFQUFQLEtBQWMsT0FBTyxFQUFQLEdBQVUsT0FBTyxFQUFQLEdBQVUsQ0FBVixDQUF4QixDQUhvRTtBQUlwRSxXQUFPLEtBQVAsS0FBaUIsT0FBTyxLQUFQLEdBQWEsS0FBSyxPQUFMLENBQWEsT0FBTyxLQUFQLENBQTFCLENBQWpCLENBSm9FO0lBQXJFO0FBTUEsVUFBTyxLQUFQLENBUlc7Ozs7c0JBVVIsR0FBRTtBQUNMLFVBQU8sS0FBSyxPQUFMLENBQWEsRUFBRSxJQUFGLENBQU8sUUFBUCxDQUFiLENBQVAsQ0FESzs7OzsyQkFHRyxHQUFFLEdBQUU7QUFDWixVQUFPLE9BQU8sSUFBUCxDQUFZLElBQUUsS0FBSyxRQUFMLENBQWMsQ0FBZCxDQUFGLENBQVosQ0FBZ0MsR0FBaEMsQ0FBb0M7V0FBRyxFQUFFLENBQUYsS0FBTSxHQUFOLElBQWEsYUFBYSxDQUFiLENBQWI7SUFBSCxDQUFwQyxDQUFxRSxNQUFyRSxDQUE0RTtXQUFHO0lBQUgsQ0FBbkYsQ0FEWTs7OzsyQkFHSixHQUFFO0FBQ1YsVUFBTyxFQUFFLElBQUYsQ0FBTyxPQUFQLENBQVAsQ0FEVTs7OztzQkFHTTtBQUFDLFVBQU8sTUFBUCxDQUFEOzs7O1FBcEJTO0VBQXVCLGdCQUFNLFVBQU4sQ0FBbEQiLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3R5bGUgZnJvbSAnLi4vc3R5bGUnXG5pbXBvcnQgUGFyYWdyYXBoIGZyb20gJy4vcGFyYWdyYXBoJ1xuaW1wb3J0IElubGluZSBmcm9tICcuL2lubGluZSdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGUgZXh0ZW5kcyBTdHlsZXtcblx0cGFyc2UoZmFjdG9yaWVzKXtcblx0XHRzdXBlci5wYXJzZSguLi5hcmd1bWVudHMpXG5cblx0XHR2YXIgVGFibGVTdHlsZT10aGlzLmNvbnN0cnVjdG9yXG5cdFx0Zm9yKHZhciBzdHlsZXM9dGhpcy53WG1sLiQoJ3RibFN0eWxlUHInKSwgbGVuPXN0eWxlcy5sZW5ndGgsIGk9MDtpPGxlbjtpKyspe1xuXHRcdFx0dmFyIG1vZGVsPW5ldyBUYWJsZVN0eWxlKHN0eWxlc1tpXSx0aGlzLndEb2MsdGhpcylcblx0XHRcdG1vZGVsLmlkPXRoaXMuaWRcblx0XHRcdG1vZGVsLnBhcnNlKGZhY3Rvcmllcylcblx0XHR9XG5cdH1cblx0X2l0ZXJhdGUoZiwgZmFjdG9yaWVzLCB2aXNpdG9ycyl7XG5cdFx0dmFyIHByPW51bGw7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnRibFByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyB0aGlzLmNvbnN0cnVjdG9yLlByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+dHJQcjpub3QoOmVtcHR5KScpKSAmJiBuZXcgdGhpcy5jb25zdHJ1Y3Rvci5Sb3dQcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdFx0KHByPXRoaXMud1htbC4kMSgnPnRjUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IHRoaXMuY29uc3RydWN0b3IuQ2VsbFByb3BlcnRpZXMocHIsdGhpcy53RG9jLHRoaXMpLnBhcnNlKHZpc2l0b3JzKTtcblx0XHQocHI9dGhpcy53WG1sLiQxKCc+cFByOm5vdCg6ZW1wdHkpJykpICYmIG5ldyBQYXJhZ3JhcGguUHJvcGVydGllcyhwcix0aGlzLndEb2MsdGhpcykucGFyc2UodmlzaXRvcnMpO1xuXHRcdChwcj10aGlzLndYbWwuJDEoJz5yUHI6bm90KDplbXB0eSknKSkgJiYgbmV3IElubGluZS5Qcm9wZXJ0aWVzKHByLHRoaXMud0RvYyx0aGlzKS5wYXJzZSh2aXNpdG9ycyk7XG5cdH1cblx0Z2V0VGFyZ2V0KCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5hdHRyKCd3OnR5cGUnKVxuXHR9XG5cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdzdHlsZS50YWJsZSd9XG59XG5cblRhYmxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIFN0eWxlLlByb3BlcnRpZXN7XG5cdHRibEJvcmRlcnMoeCl7XG5cdFx0dmFyIHZhbHVlPXt9O1xuXHRcdGZvcih2YXIgYm9yZGVycz14LmNoaWxkTm9kZXMsYm9yZGVyLGk9MCxsZW49Ym9yZGVycy5sZW5ndGg7aTxsZW47aSsrKXtcblx0XHRcdGlmKGJvcmRlcnNbaV0ubm9kZVR5cGUhPT0xKSBjb250aW51ZVxuXHRcdFx0Ym9yZGVyPXZhbHVlWyhib3JkZXI9Ym9yZGVyc1tpXSkubG9jYWxOYW1lXT10aGlzLmFzT2JqZWN0KGJvcmRlcilcblx0XHRcdGJvcmRlci5zeiAmJiAoYm9yZGVyLnN6PWJvcmRlci5zei84KTtcblx0XHRcdGJvcmRlci5jb2xvciAmJiAoYm9yZGVyLmNvbG9yPXRoaXMuYXNDb2xvcihib3JkZXIuY29sb3IpKVxuXHRcdH1cblx0XHRyZXR1cm4gdmFsdWVcblx0fVxuXHR0YmxDZWxsTWFyKHgpe1xuXHRcdHZhciB2YWx1ZT17fTtcblx0XHRmb3IodmFyIGJvcmRlcnM9eC5jaGlsZE5vZGVzLGk9MCxsZW49Ym9yZGVycy5sZW5ndGgsdjtpPGxlbjtpKyspXG5cdFx0XHRib3JkZXJzW2ldLm5vZGVUeXBlPT0xICYmICh2YWx1ZVtib3JkZXJzW2ldLmxvY2FsTmFtZV09cGFyc2VJbnQoYm9yZGVyc1tpXS5hdHRyKCd3OncnKSkvMjApXG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0dGJsTG9vayh4KXtcblx0XHRyZXR1cm4gdGhpcy5hc09iamVjdCh4LGZ1bmN0aW9uKHgpe3JldHVybiBwYXJzZUludCh4KX0pXG5cdH1cblx0dGJsU3R5bGVSb3dCYW5kU2l6ZSh4KXtcblx0XHRyZXR1cm4gcGFyc2VJbnQoeC5hdHRyKCd3OnZhbCcpKVxuXHR9XG5cdHRibFN0eWxlQ29sQmFuZFNpemUoeCl7XG5cdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp2YWwnKSlcblx0fVxuXHR0YmxXKHgpe1xuXHRcdHN3aXRjaCh4LmF0dHIoJ3c6dHlwZScpKXtcblx0XHRjYXNlICdwY3QnOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHguYXR0cigndzp3JykpKjIvMTAwKyclJ1xuXHRcdGNhc2UgJ2F1dG8nOlxuXHRcdFx0cmV0dXJuICdhdXRvJ1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHR0aGlzLmFzUHQoeC5hdHRyKCd3OncnKSkrJ3B0J1xuXHRcdH1cblx0fVxuXHR0YmxJbmQoeCl7XG5cdFx0cmV0dXJuIHRoaXMuYXNQdCh4LmF0dHIoJ3c6dycpKVxuXHR9XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiAndGFibGUnfVxufVxuXG52YXIgU3R5bGVOYW1lTWFwPXtcblx0Zmlyc3RSb3c6XCJmaXJzdFJvd1wiLFxuXHRsYXN0Um93OlwibGFzdFJvd1wiLFxuXHRmaXJzdENvbHVtbjpcImZpcnN0Q29sXCIsXG5cdGxhc3RDb2x1bW46XCJsYXN0Q29sXCIsIFxuXHRvZGRWQmFuZDpcImJhbmQxVmVydFwiICxcblx0ZXZlblZCYW5kOlwiYmFuZDJWZXJ0XCIgLFxuXHRvZGRIQmFuZDpcImJhbmQxSG9yelwiICxcblx0ZXZlbkhCYW5kOlwiYmFuZDJIb3J6XCIgLFxuXHRmaXJzdFJvd0ZpcnN0Q29sdW1uOlwibndDZWxsXCIgLFxuXHRmaXJzdFJvd0xhc3RDb2x1bW46XCJuZUNlbGxcIiAsXG5cdGxhc3RSb3dGaXJzdENvbHVtbjpcInN3Q2VsbFwiICxcblx0bGFzdFJvd0xhc3RDb2x1bW46XCJzZUNlbGxcIlxufVxuXG5UYWJsZS5Sb3dQcm9wZXJ0aWVzPWNsYXNzIFJvd1Byb3BlcnRpZXMgZXh0ZW5kcyBTdHlsZS5Qcm9wZXJ0aWVze1xuXHRjbmZTdHlsZSh4LHQpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0PXRoaXMuYXNPYmplY3QoeCkpLm1hcChhPT50W2FdPT0nMScgJiYgU3R5bGVOYW1lTWFwW2FdKS5maWx0ZXIoYT0+YSlcblx0fVxuXHRzdGF0aWMgZ2V0IHR5cGUoKXtyZXR1cm4gJ3Jvdyd9XG59XG5cblRhYmxlLkNlbGxQcm9wZXJ0aWVzPWNsYXNzIENlbGxQcm9wZXJ0aWVzIGV4dGVuZHMgU3R5bGUuUHJvcGVydGllc3tcblx0dGNCb3JkZXJzKHgpe1xuXHRcdHZhciB2YWx1ZT17fTtcblx0XHRmb3IodmFyIGJvcmRlcnM9eC5jaGlsZE5vZGVzLGJvcmRlcixpPTAsbGVuPWJvcmRlcnMubGVuZ3RoO2k8bGVuO2krKyl7XG5cdFx0XHRpZihib3JkZXJzW2ldLm5vZGVUeXBlIT09MSkgY29udGludWVcblx0XHRcdGJvcmRlcj12YWx1ZVsoYm9yZGVyPWJvcmRlcnNbaV0pLmxvY2FsTmFtZV09dGhpcy5hc09iamVjdChib3JkZXIpXG5cdFx0XHRib3JkZXIuc3ogJiYgKGJvcmRlci5zej1ib3JkZXIuc3ovOCk7XG5cdFx0XHRib3JkZXIuY29sb3IgJiYgKGJvcmRlci5jb2xvcj10aGlzLmFzQ29sb3IoYm9yZGVyLmNvbG9yKSlcblx0XHR9XG5cdFx0cmV0dXJuIHZhbHVlXG5cdH1cblx0c2hkKHgpe1xuXHRcdHJldHVybiB0aGlzLmFzQ29sb3IoeC5hdHRyKCd3OmZpbGwnKSlcblx0fVxuXHRjbmZTdHlsZSh4LHQpe1xuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0PXRoaXMuYXNPYmplY3QoeCkpLm1hcChhPT50W2FdPT0nMScgJiYgU3R5bGVOYW1lTWFwW2FdKS5maWx0ZXIoYT0+YSlcblx0fVxuXHRncmlkU3Bhbih4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuICdjZWxsJ31cbn1cbiJdfQ==