"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _document = require("../document");

var _document2 = _interopRequireDefault(_document);

var _xmlObject = require("../xmlObject");

var _part = require("./part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Base) {
	_inherits(_class, _Base);

	function _class() {
		_classCallCheck(this, _class);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).apply(this, arguments));

		var rels = new _part2.default("", _this).rels;
		_this.rels = {};
		Object.keys(rels).forEach(function (id) {
			var rel = rels[id];
			_this.rels[rel.type] = rel.target;
		});
		_this.officeDocument = new _this.constructor.OfficeDocument(_this.rels['officeDocument'], _this);
		return _this;
	}

	_createClass(_class, [{
		key: "createElement",
		value: function createElement(node) {
			return node;
		}
	}, {
		key: "isProperty",
		value: function isProperty(tag) {
			return tag.substr(-2) == 'Pr';
		}
	}, {
		key: "onToProperty",
		value: function onToProperty(node) {
			var pr = Object.assign({}, node);
			pr.$ = pr.attributes;
			delete pr.attributes;
			delete pr.name;
			delete pr.parent;
			return pr;
		}
	}, {
		key: "toProperty",
		value: function toProperty(node) {
			return (0, _xmlObject.getable)(this.onToProperty(node));
		}
	}, {
		key: "parse",
		value: function parse() {
			var _this2 = this;

			var parts = this.parts;
			return this.getObjectPart("[Content_Types].xml").then(function (o) {
				return parts["[Content_Types].xml"] = o;
			}).then(function (a) {
				return _this2.officeDocument.parse();
			});
		}
	}, {
		key: "vender",
		get: function get() {}
	}, {
		key: "product",
		get: function get() {
			return 'Office 2010';
		}
	}]);

	return _class;
}(_document2.default);

_class.OfficeDocument = _part2.default;
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcGVueG1sL2RvY3VtZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FBR0MsbUJBQWE7Ozt5RkFDSCxZQURHOztBQUVaLE1BQUksT0FBSyxtQkFBUyxFQUFULFNBQWtCLElBQWxCLENBRkc7QUFHWixRQUFLLElBQUwsR0FBVSxFQUFWLENBSFk7QUFJWixTQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLE9BQWxCLENBQTBCLGNBQUk7QUFDN0IsT0FBSSxNQUFJLEtBQUssRUFBTCxDQUFKLENBRHlCO0FBRTdCLFNBQUssSUFBTCxDQUFVLElBQUksSUFBSixDQUFWLEdBQW9CLElBQUksTUFBSixDQUZTO0dBQUosQ0FBMUIsQ0FKWTtBQVFaLFFBQUssY0FBTCxHQUFvQixJQUFJLE1BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxNQUFLLElBQUwsQ0FBVSxnQkFBVixDQUFwQyxRQUFwQixDQVJZOztFQUFiOzs7O2dDQWNjLE1BQUs7QUFDbEIsVUFBTyxJQUFQLENBRGtCOzs7OzZCQUlSLEtBQUk7QUFDZCxVQUFPLElBQUksTUFBSixDQUFXLENBQUMsQ0FBRCxDQUFYLElBQWdCLElBQWhCLENBRE87Ozs7K0JBSUYsTUFBSztBQUNqQixPQUFJLEtBQUcsT0FBTyxNQUFQLENBQWMsRUFBZCxFQUFpQixJQUFqQixDQUFILENBRGE7QUFFakIsTUFBRyxDQUFILEdBQUssR0FBRyxVQUFILENBRlk7QUFHakIsVUFBTyxHQUFHLFVBQUgsQ0FIVTtBQUlqQixVQUFPLEdBQUcsSUFBSCxDQUpVO0FBS2pCLFVBQU8sR0FBRyxNQUFILENBTFU7QUFNakIsVUFBTyxFQUFQLENBTmlCOzs7OzZCQVNQLE1BQUs7QUFDZixVQUFPLHdCQUFRLEtBQUssWUFBTCxDQUFrQixJQUFsQixDQUFSLENBQVAsQ0FEZTs7OzswQkFJVDs7O0FBQ04sT0FBTSxRQUFNLEtBQUssS0FBTCxDQUROO0FBRU4sVUFBTyxLQUFLLGFBQUwsQ0FBbUIscUJBQW5CLEVBQ0wsSUFESyxDQUNBO1dBQUcsTUFBTSxxQkFBTixJQUE2QixDQUE3QjtJQUFILENBREEsQ0FFTCxJQUZLLENBRUE7V0FBRyxPQUFLLGNBQUwsQ0FBb0IsS0FBcEI7SUFBSCxDQUZQLENBRk07Ozs7c0JBekJLOzs7c0JBRUM7QUFBQyxVQUFPLGFBQVAsQ0FBRDs7Ozs7OztPQThCTiIsImZpbGUiOiJkb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9kb2N1bWVudFwiXG5pbXBvcnQge2dldGFibGV9IGZyb20gXCIuLi94bWxPYmplY3RcIlxuaW1wb3J0IFBhcnQgZnJvbSAnLi9wYXJ0J1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG5cdGNvbnN0cnVjdG9yKCl7XG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxuXHRcdHZhciByZWxzPW5ldyBQYXJ0KFwiXCIsdGhpcykucmVsc1xuXHRcdHRoaXMucmVscz17fVxuXHRcdE9iamVjdC5rZXlzKHJlbHMpLmZvckVhY2goaWQ9Pntcblx0XHRcdGxldCByZWw9cmVsc1tpZF1cblx0XHRcdHRoaXMucmVsc1tyZWwudHlwZV09cmVsLnRhcmdldFxuXHRcdH0pXG5cdFx0dGhpcy5vZmZpY2VEb2N1bWVudD1uZXcgdGhpcy5jb25zdHJ1Y3Rvci5PZmZpY2VEb2N1bWVudCh0aGlzLnJlbHNbJ29mZmljZURvY3VtZW50J10sdGhpcylcblx0fVxuXHRnZXQgdmVuZGVyKCl7XCJNaWNyb3NvZnRcIn1cblxuXHRnZXQgcHJvZHVjdCgpe3JldHVybiAnT2ZmaWNlIDIwMTAnfVxuXG5cdGNyZWF0ZUVsZW1lbnQobm9kZSl7XG5cdFx0cmV0dXJuIG5vZGVcblx0fVxuXG5cdGlzUHJvcGVydHkodGFnKXtcblx0XHRyZXR1cm4gdGFnLnN1YnN0cigtMik9PSdQcidcblx0fVxuXG5cdG9uVG9Qcm9wZXJ0eShub2RlKXtcblx0XHRsZXQgcHI9T2JqZWN0LmFzc2lnbih7fSxub2RlKVxuXHRcdHByLiQ9cHIuYXR0cmlidXRlc1xuXHRcdGRlbGV0ZSBwci5hdHRyaWJ1dGVzXG5cdFx0ZGVsZXRlIHByLm5hbWVcblx0XHRkZWxldGUgcHIucGFyZW50XG5cdFx0cmV0dXJuIHByXG5cdH1cblxuXHR0b1Byb3BlcnR5KG5vZGUpe1xuXHRcdHJldHVybiBnZXRhYmxlKHRoaXMub25Ub1Byb3BlcnR5KG5vZGUpKVxuXHR9XG5cblx0cGFyc2UoKXtcblx0XHRjb25zdCBwYXJ0cz10aGlzLnBhcnRzXG5cdFx0cmV0dXJuIHRoaXMuZ2V0T2JqZWN0UGFydChcIltDb250ZW50X1R5cGVzXS54bWxcIilcblx0XHRcdC50aGVuKG89PnBhcnRzW1wiW0NvbnRlbnRfVHlwZXNdLnhtbFwiXT1vKVxuXHRcdFx0LnRoZW4oYT0+dGhpcy5vZmZpY2VEb2N1bWVudC5wYXJzZSgpKVxuXHR9XG5cblx0c3RhdGljIE9mZmljZURvY3VtZW50PVBhcnRcbn1cbiJdfQ==