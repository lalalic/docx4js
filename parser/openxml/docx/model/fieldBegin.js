'use strict';

define(['../model', 'require', './field/hyperlink', './field/date', './field/ref'], function (Super, require) {
	return Super.extend(function (wXml, wDoc, mParent) {
		Super.apply(this, arguments);
		this.commands = [];
	}, {

		parse: function parse() {
			this.wDoc.parseContext.field.push(this);
			Super.prototype.parse.apply(this, arguments);
		},
		instruct: function instruct(t) {
			this.commands.push(t);
		},
		seperate: function seperate(seperator) {},
		end: function end(endVisitors) {},
		_iterate: function _iterate(f, factories, visitors) {
			this.end = function (endVisitors) {
				var model = this.constructor.factory(this.commands.join('').trim(), this.wDoc, this);
				if (model) model.parse(visitors, endVisitors);
			};
		}
	}, {
		type: 'fieldBegin',
		factory: function factory(instruct, wDoc, mParent) {
			var index = instruct.indexOf(' '),
			    type = index != -1 ? instruct.substring(0, index) : instruct;
			type = type.toLowerCase();
			try {
				return new (require('./field/' + type))(instruct.trim(), wDoc, mParent);
			} catch (e) {}
		}
	});
});
//# sourceMappingURL=fieldBegin.js.map