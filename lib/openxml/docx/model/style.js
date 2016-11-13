'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RGB = /([a-fA-F0-9]{2}?){3}?/;

var Style = function (_require) {
	_inherits(Style, _require);

	function Style(wXml, wDoc, mParent) {
		_classCallCheck(this, Style);

		var _this = _possibleConstructorReturn(this, (Style.__proto__ || Object.getPrototypeOf(Style)).apply(this, arguments));

		if (wXml.attr('w:default') == '1') wDoc.style.setDefault(_this);
		_this.name = _this._val('name');
		if (_this.id = _this._attr('w:styleId')) wDoc.style.set(_this);
		return _this;
	}

	_createClass(Style, [{
		key: 'getParentStyle',
		value: function getParentStyle() {
			return this.wDoc.style.get(this._val('basedOn'));
		}
	}, {
		key: 'isDefault',
		value: function isDefault() {
			return this.wXml.attr('w:default') == '1';
		}
	}, {
		key: 'getNumId',
		value: function getNumId() {
			return -1;
		}
	}, {
		key: 'getOutlineLevel',
		value: function getOutlineLevel() {
			return -1;
		}
	}]);

	return Style;
}(require('../model'));

exports.default = Style;


var naming = {};
Style.Properties = function (_require2) {
	_inherits(Properties, _require2);

	_createClass(Properties, null, [{
		key: 'type',
		get: function get() {
			return null;
		}
	}, {
		key: 'naming',
		get: function get() {
			return naming;
		}
	}]);

	function Properties() {
		_classCallCheck(this, Properties);

		var _this2 = _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));

		_this2.values = {};
		return _this2;
	}

	_createClass(Properties, [{
		key: 'parse',

		//use parent visitor to visitor style nodes and attributes
		value: function parse(visitors) {
			var _this3 = this;

			var values = this.values,
			    naming = this.constructor.naming,
			    type = this.constructor.type,
			    t;
			visitors.forEach(function (visitor) {
				[_this3._getValidChildren(), _this3.wXml.attributes].forEach(function (children) {
					for (var len = children.length, i = 0; i < len; i++) {
						var node = children[i],
						    name = node.localName;
						if (values[name] == undefined) {
							if (typeof _this3[name] == 'function') values[name] = _this3[name](node);else if (node.attr && (t = node.attr("w:val"))) //lazy default
								values[name] = t;
						}
						values[name] != _this3.EMPTY && visitor.visit(values[name], naming[name] || name, type);
					}
				});
			});
		}
	}, {
		key: '_getValidChildren',
		value: function _getValidChildren() {
			return this.wXml.childNodes;
		}
	}, {
		key: 'basedOn',
		value: function basedOn(x) {
			return x.attr('w:val');
		}
	}, {
		key: 'asColor',
		value: function asColor(v) {
			if (!v || v.length == 0 || v == 'auto') return '#000000';
			v = v.split(' ')[0];
			return v.charAt(0) == '#' ? v : RGB.test(v) ? '#' + v : v;
		}
	}, {
		key: 'shadeColor',
		value: function shadeColor(color, percent) {
			if (!RGB.test(color)) return color;
			var R = parseInt(color.substring(1, 3), 16);
			var G = parseInt(color.substring(3, 5), 16);
			var B = parseInt(color.substring(5, 7), 16);

			R = parseInt(R * (100 + percent) / 100);
			G = parseInt(G * (100 + percent) / 100);
			B = parseInt(B * (100 + percent) / 100);

			R = R < 255 ? R : 255;
			G = G < 255 ? G : 255;
			B = B < 255 ? B : 255;

			var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
			var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
			var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

			return "#" + RR + GG + BB;
		}
	}, {
		key: 'asObject',
		value: function asObject(x, f) {
			var o = {};
			for (var i = 0, attrs = x.attributes, len = attrs.length; i < len; i++) {
				o[attrs[i].localName] = f ? f(attrs[i].value) : attrs[i].value;
			}return o;
		}
	}, {
		key: 'asPt',
		value: function asPt(x, type) {
			switch (type) {
				case 'cm':
					return parseInt(x) * 28.3464567 / 360000;
				default:
					//dxa
					return parseInt(x) / 20.0;
			}
		}
	}, {
		key: 'pt2Px',
		value: function pt2Px(x) {
			if (typeof x == 'string') x = parseFloat(x.replace('pt', ''));
			return Math.floor(x * 96 / 72);
		}
	}, {
		key: 'EMPTY',
		get: function get() {
			return -999;
		}
	}]);

	return Properties;
}(require('../model'));
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUuanMiXSwibmFtZXMiOlsiUkdCIiwiU3R5bGUiLCJ3WG1sIiwid0RvYyIsIm1QYXJlbnQiLCJhcmd1bWVudHMiLCJhdHRyIiwic3R5bGUiLCJzZXREZWZhdWx0IiwibmFtZSIsIl92YWwiLCJpZCIsIl9hdHRyIiwic2V0IiwiZ2V0IiwicmVxdWlyZSIsIm5hbWluZyIsIlByb3BlcnRpZXMiLCJ2YWx1ZXMiLCJ2aXNpdG9ycyIsImNvbnN0cnVjdG9yIiwidHlwZSIsInQiLCJmb3JFYWNoIiwidmlzaXRvciIsIl9nZXRWYWxpZENoaWxkcmVuIiwiYXR0cmlidXRlcyIsImNoaWxkcmVuIiwibGVuIiwibGVuZ3RoIiwiaSIsIm5vZGUiLCJsb2NhbE5hbWUiLCJ1bmRlZmluZWQiLCJFTVBUWSIsInZpc2l0IiwiY2hpbGROb2RlcyIsIngiLCJ2Iiwic3BsaXQiLCJjaGFyQXQiLCJ0ZXN0IiwiY29sb3IiLCJwZXJjZW50IiwiUiIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiRyIsIkIiLCJSUiIsInRvU3RyaW5nIiwiR0ciLCJCQiIsImYiLCJvIiwiYXR0cnMiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQUksdUJBQVI7O0lBQ3FCQyxLOzs7QUFDcEIsZ0JBQVlDLElBQVosRUFBaUJDLElBQWpCLEVBQXNCQyxPQUF0QixFQUE4QjtBQUFBOztBQUFBLDZHQUNwQkMsU0FEb0I7O0FBRTdCLE1BQUdILEtBQUtJLElBQUwsQ0FBVSxXQUFWLEtBQXdCLEdBQTNCLEVBQ0NILEtBQUtJLEtBQUwsQ0FBV0MsVUFBWDtBQUNELFFBQUtDLElBQUwsR0FBVSxNQUFLQyxJQUFMLENBQVUsTUFBVixDQUFWO0FBQ0EsTUFBRyxNQUFLQyxFQUFMLEdBQVEsTUFBS0MsS0FBTCxDQUFXLFdBQVgsQ0FBWCxF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QUFQO0FBQ0E7QUE5RUY7QUFBQTtBQUFBLHNCQVFZO0FBQUMsVUFBTyxDQUFDLEdBQVI7QUFBWTtBQVJ6Qjs7QUFBQTtBQUFBLEVBQTBDdEIsUUFBUSxVQUFSLENBQTFDIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Y29uc3RydWN0b3Iod1htbCx3RG9jLG1QYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRpZih3WG1sLmF0dHIoJ3c6ZGVmYXVsdCcpPT0nMScpXG5cdFx0XHR3RG9jLnN0eWxlLnNldERlZmF1bHQodGhpcylcblx0XHR0aGlzLm5hbWU9dGhpcy5fdmFsKCduYW1lJylcblx0XHRpZih0aGlzLmlkPXRoaXMuX2F0dHIoJ3c6c3R5bGVJZCcpKVxuXHRcdFx0d0RvYy5zdHlsZS5zZXQodGhpcylcblx0fVxuXHRnZXRQYXJlbnRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuX3ZhbCgnYmFzZWRPbicpKVxuXHR9XG5cdGlzRGVmYXVsdCgpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuYXR0cigndzpkZWZhdWx0Jyk9PScxJ1xuXHR9XG5cdGdldE51bUlkKCl7XG5cdFx0cmV0dXJuIC0xXG5cdH1cblx0Z2V0T3V0bGluZUxldmVsKCl7XG5cdFx0cmV0dXJuIC0xXG5cdH1cbn1cblxudmFyIG5hbWluZz17fVxuU3R5bGUuUHJvcGVydGllcz1jbGFzcyBQcm9wZXJ0aWVzIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0c3RhdGljIGdldCB0eXBlKCl7cmV0dXJuIG51bGx9XG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cblx0Y29uc3RydWN0b3IoKXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0dGhpcy52YWx1ZXM9e31cblx0fVxuXG5cdGdldCBFTVBUWSgpe3JldHVybiAtOTk5fVxuXHQvL3VzZSBwYXJlbnQgdmlzaXRvciB0byB2aXNpdG9yIHN0eWxlIG5vZGVzIGFuZCBhdHRyaWJ1dGVzXG5cdHBhcnNlKHZpc2l0b3JzKXtcblx0XHR2YXIgdmFsdWVzPXRoaXMudmFsdWVzLCBuYW1pbmc9dGhpcy5jb25zdHJ1Y3Rvci5uYW1pbmcsIHR5cGU9dGhpcy5jb25zdHJ1Y3Rvci50eXBlLCB0XG5cdFx0dmlzaXRvcnMuZm9yRWFjaCgodmlzaXRvcik9Pntcblx0XHRcdFt0aGlzLl9nZXRWYWxpZENoaWxkcmVuKCksdGhpcy53WG1sLmF0dHJpYnV0ZXNdLmZvckVhY2goKGNoaWxkcmVuKT0+e1xuXHRcdFx0XHRmb3IodmFyIGxlbj1jaGlsZHJlbi5sZW5ndGgsaT0wO2k8bGVuO2krKyl7XG5cdFx0XHRcdFx0dmFyIG5vZGU9Y2hpbGRyZW5baV0sIG5hbWU9bm9kZS5sb2NhbE5hbWVcblx0XHRcdFx0XHRpZih2YWx1ZXNbbmFtZV09PXVuZGVmaW5lZCl7XG5cdFx0XHRcdFx0XHRpZih0eXBlb2YodGhpc1tuYW1lXSk9PSdmdW5jdGlvbicpXG5cdFx0XHRcdFx0XHRcdHZhbHVlc1tuYW1lXT10aGlzW25hbWVdKG5vZGUpXG5cdFx0XHRcdFx0XHRlbHNlIGlmKG5vZGUuYXR0ciAmJiAodD1ub2RlLmF0dHIoXCJ3OnZhbFwiKSkpLy9sYXp5IGRlZmF1bHRcblx0XHRcdFx0XHRcdFx0dmFsdWVzW25hbWVdPXRcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFsdWVzW25hbWVdIT10aGlzLkVNUFRZICYmIHZpc2l0b3IudmlzaXQodmFsdWVzW25hbWVdLG5hbWluZ1tuYW1lXXx8bmFtZSx0eXBlKVxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdH0pXG5cdH1cblx0X2dldFZhbGlkQ2hpbGRyZW4oKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmNoaWxkTm9kZXNcblx0fVxuXHRiYXNlZE9uKHgpe1xuXHRcdHJldHVybiB4LmF0dHIoJ3c6dmFsJylcblx0fVxuXHRhc0NvbG9yKHYpe1xuXHRcdGlmKCF2IHx8IHYubGVuZ3RoPT0wIHx8IHY9PSdhdXRvJylcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcblx0XHR2PXYuc3BsaXQoJyAnKVswXVxuXHRcdHJldHVybiB2LmNoYXJBdCgwKT09JyMnID8gdiA6IChSR0IudGVzdCh2KSA/ICcjJyt2IDogdilcblx0fVxuXHRzaGFkZUNvbG9yKGNvbG9yLCBwZXJjZW50KSB7XG5cdFx0aWYoIVJHQi50ZXN0KGNvbG9yKSlcblx0XHRcdHJldHVybiBjb2xvclxuXHRcdHZhciBSID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDEsMyksMTYpO1xuXHRcdHZhciBHID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDMsNSksMTYpO1xuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xuXG5cdFx0UiA9IHBhcnNlSW50KFIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRCID0gcGFyc2VJbnQoQiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcblx0XHRHID0gKEc8MjU1KT9HOjI1NTtcblx0XHRCID0gKEI8MjU1KT9COjI1NTtcblxuXHRcdHZhciBSUiA9ICgoUi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitSLnRvU3RyaW5nKDE2KTpSLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEdHID0gKChHLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0cudG9TdHJpbmcoMTYpOkcudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xuXG5cdFx0cmV0dXJuIFwiI1wiK1JSK0dHK0JCO1xuXHR9XG5cdGFzT2JqZWN0KHgsIGYpe1xuXHRcdHZhciBvPXt9XG5cdFx0Zm9yKHZhciBpPTAsYXR0cnM9eC5hdHRyaWJ1dGVzLGxlbj1hdHRycy5sZW5ndGg7aTxsZW47aSsrKVxuXHRcdFx0b1thdHRyc1tpXS5sb2NhbE5hbWVdPSBmID8gZihhdHRyc1tpXS52YWx1ZSkgOiBhdHRyc1tpXS52YWx1ZVxuXHRcdHJldHVybiBvXG5cdH1cblx0YXNQdCh4LCB0eXBlKXtcblx0XHRzd2l0Y2godHlwZSl7XG5cdFx0Y2FzZSAnY20nOlxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgpKjI4LjM0NjQ1NjcvMzYwMDAwO1xuXHRcdGRlZmF1bHQ6Ly9keGFcblx0XHRcdHJldHVybiBwYXJzZUludCh4KS8yMC4wXG5cdFx0fVxuXHR9XG5cdHB0MlB4KHgpe1xuXHRcdGlmKHR5cGVvZih4KT09J3N0cmluZycpXG5cdFx0XHR4PXBhcnNlRmxvYXQoeC5yZXBsYWNlKCdwdCcsJycpKVxuXHRcdHJldHVybiBNYXRoLmZsb29yKHgqOTYvNzIpXG5cdH1cbn1cbiJdfQ==