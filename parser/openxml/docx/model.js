'use strict';

var FOUND_MODELS = {};
define(['../parser', 'require'], function (Parser, require) {
	return Parser.extend(function (wXml, wDoc, mParent) {
		Parser.apply(this, arguments);
		this.mParent = mParent;
		this.content = [];
		if (mParent) mParent.content.push(this);
		this.type = this.constructor.type;
	}, {
		parse: function parse(visitFactories) {
			var visitors = [];
			var paramizedVisitFactories = [];
			$.map(visitFactories, (function (visitFactory) {
				var visitor = visitFactory(this);
				if (visitor) {
					visitors.push(visitor);
					visitor.visit();
					paramizedVisitFactories.push(visitFactory['with'](visitor));
				}
			}).bind(this));

			var factory = require('./factory');
			this._iterate((function (wXml) {
				factory(wXml, this.wDoc, this).parse(paramizedVisitFactories);
			}).bind(this), paramizedVisitFactories, visitors);
			return visitors;
		},
		_iterate: function _iterate(f, paramizedVisitFactories) {
			for (var i = 0, children = this._getValidChildren(), l = children ? children.length : 0; i < l; i++) !this._shouldIgnore(children[i]) && f(children[i]);
		},
		_getValidChildren: function _getValidChildren() {
			return this.wXml.childNodes;
		},
		_shouldIgnore: function _shouldIgnore(wXml) {
			return false;
		},
		_attr: function _attr(selector, key) {
			var n = arguments.length == 1 ? (key = selector, this.wXml) : this.wXml.$1(selector);
			return n ? n.attr(key) : null;
		},
		_val: function _val(selector) {
			return this._attr(selector, 'w:val');
		}
	});
});
//# sourceMappingURL=model.js.map