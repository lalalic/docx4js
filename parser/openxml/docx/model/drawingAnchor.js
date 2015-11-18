'use strict';

define(['./drawing'], function (Super) {
	function refine(name) {
		return name.replace(/-(\w)/, function (a, b) {
			return b.toUpperCase();
		});
	}
	return Super.extend(function (wXml, wDoc, mParent) {
		Super.apply(this, arguments);
		this.wDrawing = wXml.$1('drawing>:first-child');
	}, {

		_getValidChildren: function _getValidChildren() {
			return this.wDrawing.$('wsp');
		}
	}, {
		type: 'drawing.anchor',
		Properties: Super.Properties.extend({
			type: 'shape',
			naming: $.extend(Super.Properties.prototype.naming, {
				wrapNone: 'wrap',
				wrapSquare: 'wrap',
				wrapTopAndBottom: 'wrap',
				wrapTight: 'wrap',
				wrapThrough: 'wrap'
			}),
			_getValidChildren: function _getValidChildren() {
				var t,
				    children = Super.Properties.prototype._getValidChildren.apply(this, arguments);
				'positionH,positionV,wrapNone,wrapSquare,wrapTopAndBottom,wrapTight,wrapThrough'.split(',').forEach(function (a) {
					(t = this.wXml.$1(a)) && children.push(t);
				}, this);
				return children;
			},
			positionH: function positionH(x) {
				var o = { relativeFrom: x.attr('relativeFrom') };
				o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.asPt(x.firstChild.textContent, 'cm') : x.firstChild.textContent;
				return o;
			},
			positionV: function positionV(x) {
				var o = { relativeFrom: x.attr('relativeFrom') };
				o[x.firstChild.localName] = x.firstChild.localName == 'posOffset' ? this.asPt(x.firstChild.textContent, 'cm') : x.firstChild.textContent;
				return o;
			},
			wrapNone: function wrapNone() {
				return 'none';
			},
			wrapSquare: function wrapSquare() {
				return 'square';
			},
			wrapTopAndBottom: function wrapTopAndBottom() {
				return 'topAndBottom';
			},
			wrapTight: function wrapTight() {
				return 'tight';
			},
			wrapThrough: function wrapThrough() {
				return 'through';
			},
			behindDoc: function behindDoc(x) {
				return x.value == '0' ? this.EMPTY : true;
			}
		})
	});
});
//# sourceMappingURL=drawingAnchor.js.map