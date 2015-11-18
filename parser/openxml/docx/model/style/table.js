'use strict';

define(['../style', './paragraph', './inline'], function (Style, Paragraph, Inline) {
	return Style.extend({
		parse: function parse(factories) {
			Style.prototype.parse.apply(this, arguments);

			var TableStyle = this.constructor;
			for (var styles = this.wXml.$('tblStylePr'), len = styles.length, i = 0; i < len; i++) {
				var model = new TableStyle(styles[i], this.wDoc, this);
				model.id = this.id;
				model.parse(factories);
			}
		},
		_iterate: function _iterate(f, factories, visitors) {
			var pr = null;
			(pr = this.wXml.$1('>tblPr:not(:empty)')) && new this.constructor.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>trPr:not(:empty)')) && new this.constructor.RowProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>tcPr:not(:empty)')) && new this.constructor.CellProperties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>pPr:not(:empty)')) && new Paragraph.Properties(pr, this.wDoc, this).parse(visitors);
			(pr = this.wXml.$1('>rPr:not(:empty)')) && new Inline.Properties(pr, this.wDoc, this).parse(visitors);
		},
		getTarget: function getTarget() {
			return this.wXml.attr('w:type');
		}
	}, {
		type: 'style.table',
		Properties: Style.Properties.extend({
			tblBorders: function tblBorders(x) {
				var value = {};
				for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
					border = value[(border = borders[i]).localName] = this.asObject(border);
					border.sz && (border.sz = border.sz / 8);
					border.color && (border.color = this.asColor(border.color));
				}
				return value;
			},
			tblCellMar: function tblCellMar(x) {
				var value = {};
				for (var borders = x.childNodes, i = 0, len = borders.length, v; i < len; i++) value[borders[i].localName] = parseInt(borders[i].attr('w:w')) / 20;
				return value;
			},
			tblLook: function tblLook(x) {
				return this.asObject(x, function (x) {
					return parseInt(x);
				});
			},
			tblStyleRowBandSize: function tblStyleRowBandSize(x) {
				return parseInt(x.attr('w:val'));
			},
			tblStyleColBandSize: function tblStyleColBandSize(x) {
				return parseInt(x.attr('w:val'));
			},
			tblW: function tblW(x) {
				switch (x.attr('w:type')) {
					case 'pct':
						return parseInt(x.attr('w:w')) * 2 / 100 + '%';
					case 'auto':
						return 'auto';
					default:
						this.asPt(x.attr('w:w')) + 'pt';
				}
			},
			tblInd: function tblInd(x) {
				return this.asPt(x.attr('w:w'));
			}
		}, { type: 'table' }),
		RowProperties: Style.Properties.extend({
			cnfStyle: function cnfStyle(x) {
				return x.attr('w:val');
			}
		}, { type: 'row' }),
		CellProperties: Style.Properties.extend({
			tcBorders: function tcBorders(x) {
				var value = {};
				for (var borders = x.childNodes, border, i = 0, len = borders.length; i < len; i++) {
					border = value[(border = borders[i]).localName] = this.asObject(border);
					border.sz && (border.sz = border.sz / 8);
					border.color && (border.color = this.asColor(border.color));
				}
				return value;
			},
			shd: function shd(x) {
				return this.asColor(x.attr('w:fill'));
			},
			cnfStyle: function cnfStyle(x) {
				return x.attr('w:val');
			},
			gridSpan: function gridSpan(x) {
				return x.attr('w:val');
			}
		}, { type: 'cell' })
	});
});
//# sourceMappingURL=table.js.map