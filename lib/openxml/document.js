'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _part = require('./part');

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Document = function (_require) {
	_inherits(Document, _require);

	function Document() {
		_classCallCheck(this, Document);

		var _this = _possibleConstructorReturn(this, (Document.__proto__ || Object.getPrototypeOf(Document)).apply(this, arguments));

		var rels = _this.rels = {};
		$.each(new _part2.default("", _this).rels, function (id, rel) {
			rels[rel.type] = rel.target;
		});
		_this.partMain = new _part2.default(_this.rels['officeDocument'], _this);
		return _this;
	}

	_createClass(Document, [{
		key: 'getPart',
		value: function getPart(name) {
			var part = this.parts[name] || (name = this.rels[name]) && this.parts[name];
			if (!part) return null;

			if (_part2.default.is(part)) return part;

			return this.parts[name] = new _part2.default(name, this);
		}
	}, {
		key: 'parse',
		value: function parse() {
			_get(Document.prototype.__proto__ || Object.getPrototypeOf(Document.prototype), 'parse', this).apply(this, arguments);
			this.getPart('core-properties').documentElement.$('keywords,description,title').forEach(function (x) {
				var v = x.textContent.trim();
				v.length && (this[x.localName] = v);
			}, this.props);
			typeof this.props.keywords != 'undefined' && (this.props.keywords = this.props.keywords.split(','));

			this.getPart('extended-properties').documentElement.$('Template').forEach(function (x) {
				var v = x.textContent.trim();
				v.length && (this[x.localName] = v);
			}, this.props);
		}
	}, {
		key: 'vender',
		get: function get() {}
	}, {
		key: 'product',
		get: function get() {
			return 'Office 2010';
		}
	}], [{
		key: 'createVisitorFactory',


		/**
   *  To create a factory function that to create a visitor specific to word model types
   *  factory: it could be following type
   *  	* function(wordModel, targetParent) :
   *  			wordModel: identified word model
   *  			targetParent: the result created by visitor of srcModel's parent model
   *  	* object: {'word model type name': Visitor Class}
   *  	* undefined: a default factory just to info type of word model in console
   *  opt: a global option to all visitor instances created by the factory, refered by visitor.options
   */
		value: function createVisitorFactory(_factory, opt) {
			var Any = this.Visitor;
			switch (typeof _factory === 'undefined' ? 'undefined' : _typeof(_factory)) {
				case 'function':
					break;
				case 'object':
					var rawMap = _factory;
					_factory = function factory(srcModel, targetParent) {
						var map = _factory.map;
						if (map['*']) Any = map['*'];
						var Visitor = map[srcModel.type],
						    visitor,
						    t;
						if (!srcModel.type) ;else if (Visitor) visitor = new Visitor(srcModel, targetParent);else if ((t = srcModel.type.split('.')).length > 1) {
							do {
								t.pop();
								if (Visitor = map[t.join('.')]) {
									visitor = new Visitor(srcModel, targetParent);
									break;
								}
							} while (t.length > 1);
						}

						if (!visitor) visitor = new Any(srcModel, targetParent);

						if (!visitor._shouldIgnore()) return visitor;
					};

					_factory.map = rawMap;
					break;
				case 'undefined':
					_factory = function _factory(srcModel, targetParent) {
						return new Any(srcModel, targetParent);
					};
					break;
				default:
					throw 'unsupported factory';
			}

			if (opt) {
				var _raw = _factory;
				_factory = function _factory() {
					var converter = _raw.apply(null, arguments);
					converter && (converter.options = opt);
					return converter;
				};
				if (typeof _raw.map != 'undefined') _factory.map = _raw.map;
			}

			_factory.with = function (targetParent) {
				function paramizedFactory(srcModel) {
					return _factory(srcModel, targetParent);
				}
				paramizedFactory.with = _factory.with;
				return paramizedFactory;
			};

			return _factory;
		}
	}, {
		key: 'Visitor',
		get: function get() {
			return Visitor;
		}
	}]);

	return Document;
}(require('../document'));

/**
 *  A visitor to visit a type of word model
 *  srcModel: identified word model
 *  targetParent: the result created by visitor of srcModel's parent model
 */


exports.default = Document;

var Visitor = function () {
	function Visitor(srcModel, targetParent) {
		_classCallCheck(this, Visitor);

		this.srcModel = srcModel;
		this.parent = targetParent;
	}

	_createClass(Visitor, [{
		key: 'visit',
		value: function visit() {
			console.info(this.srcModel.type);
		}
	}, {
		key: '_shouldIgnore',
		value: function _shouldIgnore() {
			return false;
		}
	}]);

	return Visitor;
}();

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiYXJndW1lbnRzIiwicmVscyIsIiQiLCJlYWNoIiwiaWQiLCJyZWwiLCJ0eXBlIiwidGFyZ2V0IiwicGFydE1haW4iLCJuYW1lIiwicGFydCIsInBhcnRzIiwiaXMiLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50IiwiZm9yRWFjaCIsIngiLCJ2IiwidGV4dENvbnRlbnQiLCJ0cmltIiwibGVuZ3RoIiwibG9jYWxOYW1lIiwicHJvcHMiLCJrZXl3b3JkcyIsInNwbGl0IiwiZmFjdG9yeSIsIm9wdCIsIkFueSIsIlZpc2l0b3IiLCJyYXdNYXAiLCJzcmNNb2RlbCIsInRhcmdldFBhcmVudCIsIm1hcCIsInZpc2l0b3IiLCJ0IiwicG9wIiwiam9pbiIsIl9zaG91bGRJZ25vcmUiLCJfcmF3IiwiY29udmVydGVyIiwiYXBwbHkiLCJvcHRpb25zIiwid2l0aCIsInBhcmFtaXplZEZhY3RvcnkiLCJyZXF1aXJlIiwicGFyZW50IiwiY29uc29sZSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7OztBQUNwQixxQkFBYTtBQUFBOztBQUFBLG1IQUNIQyxTQURHOztBQUVaLE1BQUlDLE9BQUssTUFBS0EsSUFBTCxHQUFVLEVBQW5CO0FBQ0FDLElBQUVDLElBQUYsQ0FBTyxtQkFBUyxFQUFULFNBQWtCRixJQUF6QixFQUE4QixVQUFTRyxFQUFULEVBQVlDLEdBQVosRUFBZ0I7QUFDN0NKLFFBQUtJLElBQUlDLElBQVQsSUFBZUQsSUFBSUUsTUFBbkI7QUFDQSxHQUZEO0FBR0EsUUFBS0MsUUFBTCxHQUFjLG1CQUFTLE1BQUtQLElBQUwsQ0FBVSxnQkFBVixDQUFULFFBQWQ7QUFOWTtBQU9aOzs7OzBCQUtPUSxJLEVBQUs7QUFDWixPQUFJQyxPQUFLLEtBQUtDLEtBQUwsQ0FBV0YsSUFBWCxLQUFxQixDQUFDQSxPQUFL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QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERvY3VtZW50IGV4dGVuZHMgcmVxdWlyZSgnLi4vZG9jdW1lbnQnKXtcclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dmFyIHJlbHM9dGhpcy5yZWxzPXt9XHJcblx0XHQkLmVhY2gobmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzLGZ1bmN0aW9uKGlkLHJlbCl7XHJcblx0XHRcdHJlbHNbcmVsLnR5cGVdPXJlbC50YXJnZXRcclxuXHRcdH0pXHJcblx0XHR0aGlzLnBhcnRNYWluPW5ldyBQYXJ0KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxyXG5cdH1cclxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cclxuXHJcblx0Z2V0IHByb2R1Y3QoKXtyZXR1cm4gJ09mZmljZSAyMDEwJ31cclxuXHJcblx0Z2V0UGFydChuYW1lKXtcclxuXHRcdHZhciBwYXJ0PXRoaXMucGFydHNbbmFtZV0gfHwgKChuYW1lPXRoaXMucmVsc1tuYW1lXSkmJnRoaXMucGFydHNbbmFtZV0pXHJcblx0XHRpZighcGFydClcclxuXHRcdFx0cmV0dXJuIG51bGxcclxuXHJcblx0XHRpZihQYXJ0LmlzKHBhcnQpKVxyXG5cdFx0XHRyZXR1cm4gcGFydFxyXG5cclxuXHRcdHJldHVybiB0aGlzLnBhcnRzW25hbWVdPW5ldyBQYXJ0KG5hbWUsdGhpcylcclxuXHR9XHJcblx0cGFyc2UoKXtcclxuXHRcdHN1cGVyLnBhcnNlKC4uLmFyZ3VtZW50cylcclxuXHRcdHRoaXMuZ2V0UGFydCgnY29yZS1wcm9wZXJ0aWVzJykuZG9jdW1lbnRFbGVtZW50XHJcblx0XHQuJCgna2V5d29yZHMsZGVzY3JpcHRpb24sdGl0bGUnKS5mb3JFYWNoKGZ1bmN0aW9uKHgpe1xyXG5cdFx0XHR2YXIgdj14LnRleHRDb250ZW50LnRyaW0oKTtcclxuXHRcdFx0di5sZW5ndGggJiYgKHRoaXNbeC5sb2NhbE5hbWVdPXYpXHJcblx0XHR9LHRoaXMucHJvcHMpXHJcblx0XHR0eXBlb2YgdGhpcy5wcm9wcy5rZXl3b3JkcyE9J3VuZGVmaW5lZCcgJiYgKHRoaXMucHJvcHMua2V5d29yZHM9dGhpcy5wcm9wcy5rZXl3b3Jkcy5zcGxpdCgnLCcpKTtcclxuXHJcblx0XHR0aGlzLmdldFBhcnQoJ2V4dGVuZGVkLXByb3BlcnRpZXMnKS5kb2N1bWVudEVsZW1lbnRcclxuXHRcdC4kKCdUZW1wbGF0ZScpLmZvckVhY2goZnVuY3Rpb24oeCl7XHJcblx0XHRcdHZhciB2PXgudGV4dENvbnRlbnQudHJpbSgpO1xyXG5cdFx0XHR2Lmxlbmd0aCAmJiAodGhpc1t4LmxvY2FsTmFtZV09dilcclxuXHRcdH0sdGhpcy5wcm9wcylcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQgVmlzaXRvcigpeyByZXR1cm4gVmlzaXRvcn1cclxuXHJcblx0LyoqXHJcblx0ICogIFRvIGNyZWF0ZSBhIGZhY3RvcnkgZnVuY3Rpb24gdGhhdCB0byBjcmVhdGUgYSB2aXNpdG9yIHNwZWNpZmljIHRvIHdvcmQgbW9kZWwgdHlwZXNcclxuXHQgKiAgZmFjdG9yeTogaXQgY291bGQgYmUgZm9sbG93aW5nIHR5cGVcclxuXHQgKiAgXHQqIGZ1bmN0aW9uKHdvcmRNb2RlbCwgdGFyZ2V0UGFyZW50KSA6XHJcblx0ICogIFx0XHRcdHdvcmRNb2RlbDogaWRlbnRpZmllZCB3b3JkIG1vZGVsXHJcblx0ICogIFx0XHRcdHRhcmdldFBhcmVudDogdGhlIHJlc3VsdCBjcmVhdGVkIGJ5IHZpc2l0b3Igb2Ygc3JjTW9kZWwncyBwYXJlbnQgbW9kZWxcclxuXHQgKiAgXHQqIG9iamVjdDogeyd3b3JkIG1vZGVsIHR5cGUgbmFtZSc6IFZpc2l0b3IgQ2xhc3N9XHJcblx0ICogIFx0KiB1bmRlZmluZWQ6IGEgZGVmYXVsdCBmYWN0b3J5IGp1c3QgdG8gaW5mbyB0eXBlIG9mIHdvcmQgbW9kZWwgaW4gY29uc29sZVxyXG5cdCAqICBvcHQ6IGEgZ2xvYmFsIG9wdGlvbiB0byBhbGwgdmlzaXRvciBpbnN0YW5jZXMgY3JlYXRlZCBieSB0aGUgZmFjdG9yeSwgcmVmZXJlZCBieSB2aXNpdG9yLm9wdGlvbnNcclxuXHQgKi9cclxuXHRzdGF0aWMgY3JlYXRlVmlzaXRvckZhY3RvcnkoZmFjdG9yeSwgb3B0KXtcclxuXHRcdHZhciBBbnk9dGhpcy5WaXNpdG9yXHJcblx0XHRzd2l0Y2godHlwZW9mIGZhY3Rvcnkpe1xyXG5cdFx0Y2FzZSAnZnVuY3Rpb24nOlxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAnb2JqZWN0JzpcclxuXHRcdFx0dmFyIHJhd01hcD1mYWN0b3J5O1xyXG5cdFx0XHRmYWN0b3J5PWZ1bmN0aW9uKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpe1xyXG5cdFx0XHRcdHZhciBtYXA9ZmFjdG9yeS5tYXBcclxuXHRcdFx0XHRpZihtYXBbJyonXSlcclxuXHRcdFx0XHRcdEFueT1tYXBbJyonXTtcclxuXHRcdFx0XHR2YXIgVmlzaXRvcj1tYXBbc3JjTW9kZWwudHlwZV0sIHZpc2l0b3IsIHQ7XHJcblx0XHRcdFx0aWYoIXNyY01vZGVsLnR5cGUpXHJcblx0XHRcdFx0XHQ7XHJcblx0XHRcdFx0ZWxzZSBpZihWaXNpdG9yKVxyXG5cdFx0XHRcdFx0dmlzaXRvcj1uZXcgVmlzaXRvcihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdGVsc2UgaWYoKHQ9c3JjTW9kZWwudHlwZS5zcGxpdCgnLicpKS5sZW5ndGg+MSl7XHJcblx0XHRcdFx0XHRkb3tcclxuXHRcdFx0XHRcdFx0dC5wb3AoKVxyXG5cdFx0XHRcdFx0XHRpZigoVmlzaXRvcj1tYXBbdC5qb2luKCcuJyldKSl7XHJcblx0XHRcdFx0XHRcdFx0dmlzaXRvcj1uZXcgVmlzaXRvcihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KVxyXG5cdFx0XHRcdFx0XHRcdGJyZWFrXHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH13aGlsZSh0Lmxlbmd0aD4xKVxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoIXZpc2l0b3IpXHJcblx0XHRcdFx0XHR2aXNpdG9yPW5ldyBBbnkoc3JjTW9kZWwsIHRhcmdldFBhcmVudCk7XHJcblxyXG5cdFx0XHRcdGlmKCF2aXNpdG9yLl9zaG91bGRJZ25vcmUoKSlcclxuXHRcdFx0XHRcdHJldHVybiB2aXNpdG9yXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGZhY3RvcnkubWFwPXJhd01hcFxyXG5cdFx0XHRicmVha1xyXG5cdFx0Y2FzZSAndW5kZWZpbmVkJzpcclxuXHRcdFx0ZmFjdG9yeT1mdW5jdGlvbihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KXtcclxuXHRcdFx0XHRyZXR1cm4gbmV3IEFueShzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KVxyXG5cdFx0XHR9XHJcblx0XHRcdGJyZWFrXHJcblx0XHRkZWZhdWx0OlxyXG5cdFx0XHR0aHJvdyAndW5zdXBwb3J0ZWQgZmFjdG9yeSdcclxuXHRcdH1cclxuXHJcblx0XHRpZihvcHQpe1xyXG5cdFx0XHR2YXIgX3Jhdz1mYWN0b3J5XHJcblx0XHRcdGZhY3Rvcnk9ZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgY29udmVydGVyPV9yYXcuYXBwbHkobnVsbCxhcmd1bWVudHMpXHJcblx0XHRcdFx0XHRjb252ZXJ0ZXIgJiYgKGNvbnZlcnRlci5vcHRpb25zPW9wdCk7XHJcblx0XHRcdFx0cmV0dXJuIGNvbnZlcnRlclxyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHR5cGVvZihfcmF3Lm1hcCkhPSd1bmRlZmluZWQnKVxyXG5cdFx0XHRcdGZhY3RvcnkubWFwPV9yYXcubWFwXHJcblx0XHR9XHJcblxyXG5cdFx0ZmFjdG9yeS53aXRoPWZ1bmN0aW9uKHRhcmdldFBhcmVudCl7XHJcblx0XHRcdGZ1bmN0aW9uIHBhcmFtaXplZEZhY3Rvcnkoc3JjTW9kZWwpe1xyXG5cdFx0XHRcdHJldHVybiBmYWN0b3J5KHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpXHJcblx0XHRcdH1cclxuXHRcdFx0cGFyYW1pemVkRmFjdG9yeS53aXRoPWZhY3Rvcnkud2l0aFxyXG5cdFx0XHRyZXR1cm4gcGFyYW1pemVkRmFjdG9yeVxyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiBmYWN0b3J5XHJcblx0fVxyXG59XHJcblxyXG4vKipcclxuICogIEEgdmlzaXRvciB0byB2aXNpdCBhIHR5cGUgb2Ygd29yZCBtb2RlbFxyXG4gKiAgc3JjTW9kZWw6IGlkZW50aWZpZWQgd29yZCBtb2RlbFxyXG4gKiAgdGFyZ2V0UGFyZW50OiB0aGUgcmVzdWx0IGNyZWF0ZWQgYnkgdmlzaXRvciBvZiBzcmNNb2RlbCdzIHBhcmVudCBtb2RlbFxyXG4gKi9cclxuY2xhc3MgVmlzaXRvcntcclxuXHRjb25zdHJ1Y3RvcihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KXtcclxuXHRcdHRoaXMuc3JjTW9kZWw9c3JjTW9kZWxcclxuXHRcdHRoaXMucGFyZW50PXRhcmdldFBhcmVudFxyXG5cdH1cclxuXHR2aXNpdCgpe1xyXG5cdFx0Y29uc29sZS5pbmZvKHRoaXMuc3JjTW9kZWwudHlwZSlcclxuXHR9XHJcblx0X3Nob3VsZElnbm9yZSgpe1xyXG5cdFx0cmV0dXJuIGZhbHNlXHJcblx0fVxyXG59XHJcbiJdfQ==