'use strict';

define(['../model', './style', './drawing'], function (Super, Style, Drawing) {
	function phClr(o, clr, a) {
		for (var i in o) {
			switch (typeof (a = o[i])) {
				case 'string':
					if (a == 'phClr') o[i] = clr;
					break;
				case 'object':
					phClr(a, clr);
			}
		}
		return o;
	}
	return Super.extend({

		getDirectStyle: function getDirectStyle() {
			return new this.constructor.Properties(this.wXml, this.wDoc, this);
		},
		_getValidChildren: function _getValidChildren() {
			return this.wXml.$('txbxContent');
		}
	}, {
		type: 'shape',
		Properties: Style.Properties.extend($.extend({}, Drawing.SpProperties.prototype, {
			naming: $.extend(Style.Properties.prototype.naming, Drawing.SpProperties.prototype.naming, {}),
			_getValidChildren: function _getValidChildren(t) {
				var children = ((t = this.wXml.$('>style>*')) && t.asArray() || []).concat(this.wXml.$('>spPr>*, >bodyPr>*').asArray());
				var bodyPr = this.wXml.$1('bodyPr');
				if (bodyPr) {
					for (var i = 0, attrs = bodyPr.attributes, len = attrs.length; i < len; i++) children.push(attrs[i]);
				}
				return children;
			},
			lnRef: function lnRef(x) {
				return phClr(this.wDoc.getFormatTheme().line(x.attr('idx')), this.solidFill(x));
			},
			fillRef: function fillRef(x) {
				return phClr(this.wDoc.getFormatTheme().fill(x.attr('idx')), this.solidFill(x));
			},
			fontRef: function fontRef(x) {
				return { color: this.solidFill(x), family: this.wDoc.getFormatTheme().font(x.attr('idx')) };
			},
			effectRef: function effectRef() {},
			spAutoFit: function spAutoFit() {
				return true;
			},
			lIns: function lIns(x) {
				if (x = parseInt(x.value)) return this.asPt(x, 'cm');
				return this.EMPTY;
			},
			tIns: function tIns(x) {
				return this.lIns(x);
			},
			rIns: function rIns(x) {
				return this.lIns(x);
			},
			bIns: function bIns(x) {
				return this.lIns(x);
			},
			anchor: function anchor(x) {
				switch (x.value) {
					case 'b':
						return 'bottom';
					case 't':
						return 'top';
					default:
						return 'middle';
				}
			},
			vert: function vert(x) {
				switch (x.value) {
					case 'horz':
						return this.EMPTY;
					case 'eaVert':
						return 90;
					case 'vert270':
						return 270;
					default:
						console.warn('not support');
						return this.EMPTY;
				}
			}
		}))
	});
});
//# sourceMappingURL=shape.js.map