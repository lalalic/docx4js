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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbIkRvY3VtZW50IiwiYXJndW1lbnRzIiwicmVscyIsIiQiLCJlYWNoIiwiaWQiLCJyZWwiLCJ0eXBlIiwidGFyZ2V0IiwicGFydE1haW4iLCJuYW1lIiwicGFydCIsInBhcnRzIiwiaXMiLCJnZXRQYXJ0IiwiZG9jdW1lbnRFbGVtZW50IiwiZm9yRWFjaCIsIngiLCJ2IiwidGV4dENvbnRlbnQiLCJ0cmltIiwibGVuZ3RoIiwibG9jYWxOYW1lIiwicHJvcHMiLCJrZXl3b3JkcyIsInNwbGl0IiwiZmFjdG9yeSIsIm9wdCIsIkFueSIsIlZpc2l0b3IiLCJyYXdNYXAiLCJzcmNNb2RlbCIsInRhcmdldFBhcmVudCIsIm1hcCIsInZpc2l0b3IiLCJ0IiwicG9wIiwiam9pbiIsIl9zaG91bGRJZ25vcmUiLCJfcmF3IiwiY29udmVydGVyIiwiYXBwbHkiLCJvcHRpb25zIiwid2l0aCIsInBhcmFtaXplZEZhY3RvcnkiLCJyZXF1aXJlIiwicGFyZW50IiwiY29uc29sZSIsImluZm8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFE7OztBQUNwQixxQkFBYTtBQUFBOztBQUFBLG1IQUNIQyxTQURHOztBQUVaLE1BQUlDLE9BQUssTUFBS0EsSUFBTCxHQUFVLEVBQW5CO0FBQ0FDLElBQUVDLElBQUYsQ0FBTyxtQkFBUyxFQUFULFNBQWtCRixJQUF6QixFQUE4QixVQUFTRyxFQUFULEVBQVlDLEdBQVosRUFBZ0I7QUFDN0NKLFFBQUtJLElBQUlDLElBQVQsSUFBZUQsSUFBSUUsTUFBbkI7QUFDQSxHQUZEO0FBR0EsUUFBS0MsUUFBTCxHQUFjLG1CQUFTLE1BQUtQLElBQUwsQ0FBVSxnQkFBVixDQUFULFFBQWQ7QUFOWTtBQU9aOzs7OzBCQUtPUSxJLEVBQUs7QUFDWixPQUFJQyxPQUFLLEtBQUtDLEtBQUwsQ0FBV0YsSUFBWCxLQUFxQixDQUFDQSxPQUFL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QUFDQSIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gJy4vcGFydCdcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRG9jdW1lbnQgZXh0ZW5kcyByZXF1aXJlKCcuLi9kb2N1bWVudCcpe1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHR2YXIgcmVscz10aGlzLnJlbHM9e31cblx0XHQkLmVhY2gobmV3IFBhcnQoXCJcIix0aGlzKS5yZWxzLGZ1bmN0aW9uKGlkLHJlbCl7XG5cdFx0XHRyZWxzW3JlbC50eXBlXT1yZWwudGFyZ2V0XG5cdFx0fSlcblx0XHR0aGlzLnBhcnRNYWluPW5ldyBQYXJ0KHRoaXMucmVsc1snb2ZmaWNlRG9jdW1lbnQnXSx0aGlzKVxuXHR9XG5cdGdldCB2ZW5kZXIoKXtcIk1pY3Jvc29mdFwifVxuXG5cdGdldCBwcm9kdWN0KCl7cmV0dXJuICdPZmZpY2UgMjAxMCd9XG5cblx0Z2V0UGFydChuYW1lKXtcblx0XHR2YXIgcGFydD10aGlzLnBhcnRzW25hbWVdIHx8ICgobmFtZT10aGlzLnJlbHNbbmFtZV0pJiZ0aGlzLnBhcnRzW25hbWVdKVxuXHRcdGlmKCFwYXJ0KVxuXHRcdFx0cmV0dXJuIG51bGxcblxuXHRcdGlmKFBhcnQuaXMocGFydCkpXG5cdFx0XHRyZXR1cm4gcGFydFxuXG5cdFx0cmV0dXJuIHRoaXMucGFydHNbbmFtZV09bmV3IFBhcnQobmFtZSx0aGlzKVxuXHR9XG5cdHBhcnNlKCl7XG5cdFx0c3VwZXIucGFyc2UoLi4uYXJndW1lbnRzKVxuXHRcdHRoaXMuZ2V0UGFydCgnY29yZS1wcm9wZXJ0aWVzJykuZG9jdW1lbnRFbGVtZW50XG5cdFx0LiQoJ2tleXdvcmRzLGRlc2NyaXB0aW9uLHRpdGxlJykuZm9yRWFjaChmdW5jdGlvbih4KXtcblx0XHRcdHZhciB2PXgudGV4dENvbnRlbnQudHJpbSgpO1xuXHRcdFx0di5sZW5ndGggJiYgKHRoaXNbeC5sb2NhbE5hbWVdPXYpXG5cdFx0fSx0aGlzLnByb3BzKVxuXHRcdHR5cGVvZiB0aGlzLnByb3BzLmtleXdvcmRzIT0ndW5kZWZpbmVkJyAmJiAodGhpcy5wcm9wcy5rZXl3b3Jkcz10aGlzLnByb3BzLmtleXdvcmRzLnNwbGl0KCcsJykpO1xuXG5cdFx0dGhpcy5nZXRQYXJ0KCdleHRlbmRlZC1wcm9wZXJ0aWVzJykuZG9jdW1lbnRFbGVtZW50XG5cdFx0LiQoJ1RlbXBsYXRlJykuZm9yRWFjaChmdW5jdGlvbih4KXtcblx0XHRcdHZhciB2PXgudGV4dENvbnRlbnQudHJpbSgpO1xuXHRcdFx0di5sZW5ndGggJiYgKHRoaXNbeC5sb2NhbE5hbWVdPXYpXG5cdFx0fSx0aGlzLnByb3BzKVxuXHR9XG5cblx0c3RhdGljIGdldCBWaXNpdG9yKCl7IHJldHVybiBWaXNpdG9yfVxuXG5cdC8qKlxuXHQgKiAgVG8gY3JlYXRlIGEgZmFjdG9yeSBmdW5jdGlvbiB0aGF0IHRvIGNyZWF0ZSBhIHZpc2l0b3Igc3BlY2lmaWMgdG8gd29yZCBtb2RlbCB0eXBlc1xuXHQgKiAgZmFjdG9yeTogaXQgY291bGQgYmUgZm9sbG93aW5nIHR5cGVcblx0ICogIFx0KiBmdW5jdGlvbih3b3JkTW9kZWwsIHRhcmdldFBhcmVudCkgOlxuXHQgKiAgXHRcdFx0d29yZE1vZGVsOiBpZGVudGlmaWVkIHdvcmQgbW9kZWxcblx0ICogIFx0XHRcdHRhcmdldFBhcmVudDogdGhlIHJlc3VsdCBjcmVhdGVkIGJ5IHZpc2l0b3Igb2Ygc3JjTW9kZWwncyBwYXJlbnQgbW9kZWxcblx0ICogIFx0KiBvYmplY3Q6IHsnd29yZCBtb2RlbCB0eXBlIG5hbWUnOiBWaXNpdG9yIENsYXNzfVxuXHQgKiAgXHQqIHVuZGVmaW5lZDogYSBkZWZhdWx0IGZhY3RvcnkganVzdCB0byBpbmZvIHR5cGUgb2Ygd29yZCBtb2RlbCBpbiBjb25zb2xlXG5cdCAqICBvcHQ6IGEgZ2xvYmFsIG9wdGlvbiB0byBhbGwgdmlzaXRvciBpbnN0YW5jZXMgY3JlYXRlZCBieSB0aGUgZmFjdG9yeSwgcmVmZXJlZCBieSB2aXNpdG9yLm9wdGlvbnNcblx0ICovXG5cdHN0YXRpYyBjcmVhdGVWaXNpdG9yRmFjdG9yeShmYWN0b3J5LCBvcHQpe1xuXHRcdHZhciBBbnk9dGhpcy5WaXNpdG9yXG5cdFx0c3dpdGNoKHR5cGVvZiBmYWN0b3J5KXtcblx0XHRjYXNlICdmdW5jdGlvbic6XG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ29iamVjdCc6XG5cdFx0XHR2YXIgcmF3TWFwPWZhY3Rvcnk7XG5cdFx0XHRmYWN0b3J5PWZ1bmN0aW9uKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpe1xuXHRcdFx0XHR2YXIgbWFwPWZhY3RvcnkubWFwXG5cdFx0XHRcdGlmKG1hcFsnKiddKVxuXHRcdFx0XHRcdEFueT1tYXBbJyonXTtcblx0XHRcdFx0dmFyIFZpc2l0b3I9bWFwW3NyY01vZGVsLnR5cGVdLCB2aXNpdG9yLCB0O1xuXHRcdFx0XHRpZighc3JjTW9kZWwudHlwZSlcblx0XHRcdFx0XHQ7XG5cdFx0XHRcdGVsc2UgaWYoVmlzaXRvcilcblx0XHRcdFx0XHR2aXNpdG9yPW5ldyBWaXNpdG9yKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpXG5cdFx0XHRcdGVsc2UgaWYoKHQ9c3JjTW9kZWwudHlwZS5zcGxpdCgnLicpKS5sZW5ndGg+MSl7XG5cdFx0XHRcdFx0ZG97XG5cdFx0XHRcdFx0XHR0LnBvcCgpXG5cdFx0XHRcdFx0XHRpZigoVmlzaXRvcj1tYXBbdC5qb2luKCcuJyldKSl7XG5cdFx0XHRcdFx0XHRcdHZpc2l0b3I9bmV3IFZpc2l0b3Ioc3JjTW9kZWwsIHRhcmdldFBhcmVudClcblx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9d2hpbGUodC5sZW5ndGg+MSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmKCF2aXNpdG9yKVxuXHRcdFx0XHRcdHZpc2l0b3I9bmV3IEFueShzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KTtcblxuXHRcdFx0XHRpZighdmlzaXRvci5fc2hvdWxkSWdub3JlKCkpXG5cdFx0XHRcdFx0cmV0dXJuIHZpc2l0b3Jcblx0XHRcdH1cblxuXHRcdFx0ZmFjdG9yeS5tYXA9cmF3TWFwXG5cdFx0XHRicmVha1xuXHRcdGNhc2UgJ3VuZGVmaW5lZCc6XG5cdFx0XHRmYWN0b3J5PWZ1bmN0aW9uKHNyY01vZGVsLCB0YXJnZXRQYXJlbnQpe1xuXHRcdFx0XHRyZXR1cm4gbmV3IEFueShzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KVxuXHRcdFx0fVxuXHRcdFx0YnJlYWtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgJ3Vuc3VwcG9ydGVkIGZhY3RvcnknXG5cdFx0fVxuXG5cdFx0aWYob3B0KXtcblx0XHRcdHZhciBfcmF3PWZhY3Rvcnlcblx0XHRcdGZhY3Rvcnk9ZnVuY3Rpb24oKXtcblx0XHRcdFx0dmFyIGNvbnZlcnRlcj1fcmF3LmFwcGx5KG51bGwsYXJndW1lbnRzKVxuXHRcdFx0XHRcdGNvbnZlcnRlciAmJiAoY29udmVydGVyLm9wdGlvbnM9b3B0KTtcblx0XHRcdFx0cmV0dXJuIGNvbnZlcnRlclxuXHRcdFx0fVxuXHRcdFx0aWYodHlwZW9mKF9yYXcubWFwKSE9J3VuZGVmaW5lZCcpXG5cdFx0XHRcdGZhY3RvcnkubWFwPV9yYXcubWFwXG5cdFx0fVxuXG5cdFx0ZmFjdG9yeS53aXRoPWZ1bmN0aW9uKHRhcmdldFBhcmVudCl7XG5cdFx0XHRmdW5jdGlvbiBwYXJhbWl6ZWRGYWN0b3J5KHNyY01vZGVsKXtcblx0XHRcdFx0cmV0dXJuIGZhY3Rvcnkoc3JjTW9kZWwsIHRhcmdldFBhcmVudClcblx0XHRcdH1cblx0XHRcdHBhcmFtaXplZEZhY3Rvcnkud2l0aD1mYWN0b3J5LndpdGhcblx0XHRcdHJldHVybiBwYXJhbWl6ZWRGYWN0b3J5XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhY3Rvcnlcblx0fVxufVxuXG4vKipcbiAqICBBIHZpc2l0b3IgdG8gdmlzaXQgYSB0eXBlIG9mIHdvcmQgbW9kZWxcbiAqICBzcmNNb2RlbDogaWRlbnRpZmllZCB3b3JkIG1vZGVsXG4gKiAgdGFyZ2V0UGFyZW50OiB0aGUgcmVzdWx0IGNyZWF0ZWQgYnkgdmlzaXRvciBvZiBzcmNNb2RlbCdzIHBhcmVudCBtb2RlbFxuICovXG5jbGFzcyBWaXNpdG9ye1xuXHRjb25zdHJ1Y3RvcihzcmNNb2RlbCwgdGFyZ2V0UGFyZW50KXtcblx0XHR0aGlzLnNyY01vZGVsPXNyY01vZGVsXG5cdFx0dGhpcy5wYXJlbnQ9dGFyZ2V0UGFyZW50XG5cdH1cblx0dmlzaXQoKXtcblx0XHRjb25zb2xlLmluZm8odGhpcy5zcmNNb2RlbC50eXBlKVxuXHR9XG5cdF9zaG91bGRJZ25vcmUoKXtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxufVxuIl19