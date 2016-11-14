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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUuanMiXSwibmFtZXMiOlsiUkdCIiwiU3R5bGUiLCJ3WG1sIiwid0RvYyIsIm1QYXJlbnQiLCJhcmd1bWVudHMiLCJhdHRyIiwic3R5bGUiLCJzZXREZWZhdWx0IiwibmFtZSIsIl92YWwiLCJpZCIsIl9hdHRyIiwic2V0IiwiZ2V0IiwicmVxdWlyZSIsIm5hbWluZyIsIlByb3BlcnRpZXMiLCJ2YWx1ZXMiLCJ2aXNpdG9ycyIsImNvbnN0cnVjdG9yIiwidHlwZSIsInQiLCJmb3JFYWNoIiwidmlzaXRvciIsIl9nZXRWYWxpZENoaWxkcmVuIiwiYXR0cmlidXRlcyIsImNoaWxkcmVuIiwibGVuIiwibGVuZ3RoIiwiaSIsIm5vZGUiLCJsb2NhbE5hbWUiLCJ1bmRlZmluZWQiLCJFTVBUWSIsInZpc2l0IiwiY2hpbGROb2RlcyIsIngiLCJ2Iiwic3BsaXQiLCJjaGFyQXQiLCJ0ZXN0IiwiY29sb3IiLCJwZXJjZW50IiwiUiIsInBhcnNlSW50Iiwic3Vic3RyaW5nIiwiRyIsIkIiLCJSUiIsInRvU3RyaW5nIiwiR0ciLCJCQiIsImYiLCJvIiwiYXR0cnMiLCJ2YWx1ZSIsInBhcnNlRmxvYXQiLCJyZXBsYWNlIiwiTWF0aCIsImZsb29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQUlBLE1BQUksdUJBQVI7O0lBQ3FCQyxLOzs7QUFDcEIsZ0JBQVlDLElBQVosRUFBaUJDLElBQWpCLEVBQXNCQyxPQUF0QixFQUE4QjtBQUFBOztBQUFBLDZHQUNwQkMsU0FEb0I7O0FBRTdCLE1BQUdILEtBQUtJLElBQUwsQ0FBVSxXQUFWLEtBQXdCLEdBQTNCLEVBQ0NILEtBQUtJLEtBQUwsQ0FBV0MsVUFBWDtBQUNELFFBQUtDLElBQUwsR0FBVSxNQUFLQyxJQUFMLENBQVUsTUFBVixDQUFWO0FBQ0EsTUFBRyxNQUFLQyxFQUFMLEdBQVEsTUFBS0MsS0FBTCxDQUFXLFdBQVgsQ0FBWCxF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QUFQO0FBQ0E7QUE5RUY7QUFBQTtBQUFBLHNCQVFZO0FBQUMsVUFBTyxDQUFDLEdBQVI7QUFBWTtBQVJ6Qjs7QUFBQTtBQUFBLEVBQTBDdEIsUUFBUSxVQUFSLENBQTFDIiwiZmlsZSI6InN0eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3R5bGUgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xyXG5cdGNvbnN0cnVjdG9yKHdYbWwsd0RvYyxtUGFyZW50KXtcclxuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcclxuXHRcdGlmKHdYbWwuYXR0cigndzpkZWZhdWx0Jyk9PScxJylcclxuXHRcdFx0d0RvYy5zdHlsZS5zZXREZWZhdWx0KHRoaXMpXHJcblx0XHR0aGlzLm5hbWU9dGhpcy5fdmFsKCduYW1lJylcclxuXHRcdGlmKHRoaXMuaWQ9dGhpcy5fYXR0cigndzpzdHlsZUlkJykpXHJcblx0XHRcdHdEb2Muc3R5bGUuc2V0KHRoaXMpXHJcblx0fVxyXG5cdGdldFBhcmVudFN0eWxlKCl7XHJcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldCh0aGlzLl92YWwoJ2Jhc2VkT24nKSlcclxuXHR9XHJcblx0aXNEZWZhdWx0KCl7XHJcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6ZGVmYXVsdCcpPT0nMSdcclxuXHR9XHJcblx0Z2V0TnVtSWQoKXtcclxuXHRcdHJldHVybiAtMVxyXG5cdH1cclxuXHRnZXRPdXRsaW5lTGV2ZWwoKXtcclxuXHRcdHJldHVybiAtMVxyXG5cdH1cclxufVxyXG5cclxudmFyIG5hbWluZz17fVxyXG5TdHlsZS5Qcm9wZXJ0aWVzPWNsYXNzIFByb3BlcnRpZXMgZXh0ZW5kcyByZXF1aXJlKCcuLi9tb2RlbCcpe1xyXG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBudWxsfVxyXG5cdHN0YXRpYyBnZXQgbmFtaW5nKCl7cmV0dXJuIG5hbWluZ31cclxuXHRjb25zdHJ1Y3Rvcigpe1xyXG5cdFx0c3VwZXIoLi4uYXJndW1lbnRzKVxyXG5cdFx0dGhpcy52YWx1ZXM9e31cclxuXHR9XHJcblxyXG5cdGdldCBFTVBUWSgpe3JldHVybiAtOTk5fVxyXG5cdC8vdXNlIHBhcmVudCB2aXNpdG9yIHRvIHZpc2l0b3Igc3R5bGUgbm9kZXMgYW5kIGF0dHJpYnV0ZXNcclxuXHRwYXJzZSh2aXNpdG9ycyl7XHJcblx0XHR2YXIgdmFsdWVzPXRoaXMudmFsdWVzLCBuYW1pbmc9dGhpcy5jb25zdHJ1Y3Rvci5uYW1pbmcsIHR5cGU9dGhpcy5jb25zdHJ1Y3Rvci50eXBlLCB0XHJcblx0XHR2aXNpdG9ycy5mb3JFYWNoKCh2aXNpdG9yKT0+e1xyXG5cdFx0XHRbdGhpcy5fZ2V0VmFsaWRDaGlsZHJlbigpLHRoaXMud1htbC5hdHRyaWJ1dGVzXS5mb3JFYWNoKChjaGlsZHJlbik9PntcclxuXHRcdFx0XHRmb3IodmFyIGxlbj1jaGlsZHJlbi5sZW5ndGgsaT0wO2k8bGVuO2krKyl7XHJcblx0XHRcdFx0XHR2YXIgbm9kZT1jaGlsZHJlbltpXSwgbmFtZT1ub2RlLmxvY2FsTmFtZVxyXG5cdFx0XHRcdFx0aWYodmFsdWVzW25hbWVdPT11bmRlZmluZWQpe1xyXG5cdFx0XHRcdFx0XHRpZih0eXBlb2YodGhpc1tuYW1lXSk9PSdmdW5jdGlvbicpXHJcblx0XHRcdFx0XHRcdFx0dmFsdWVzW25hbWVdPXRoaXNbbmFtZV0obm9kZSlcclxuXHRcdFx0XHRcdFx0ZWxzZSBpZihub2RlLmF0dHIgJiYgKHQ9bm9kZS5hdHRyKFwidzp2YWxcIikpKS8vbGF6eSBkZWZhdWx0XHJcblx0XHRcdFx0XHRcdFx0dmFsdWVzW25hbWVdPXRcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHZhbHVlc1tuYW1lXSE9dGhpcy5FTVBUWSAmJiB2aXNpdG9yLnZpc2l0KHZhbHVlc1tuYW1lXSxuYW1pbmdbbmFtZV18fG5hbWUsdHlwZSlcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pXHJcblx0XHR9KVxyXG5cdH1cclxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xyXG5cdFx0cmV0dXJuIHRoaXMud1htbC5jaGlsZE5vZGVzXHJcblx0fVxyXG5cdGJhc2VkT24oeCl7XHJcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXHJcblx0fVxyXG5cdGFzQ29sb3Iodil7XHJcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXHJcblx0XHRcdHJldHVybiAnIzAwMDAwMCdcclxuXHRcdHY9di5zcGxpdCgnICcpWzBdXHJcblx0XHRyZXR1cm4gdi5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXHJcblx0fVxyXG5cdHNoYWRlQ29sb3IoY29sb3IsIHBlcmNlbnQpIHtcclxuXHRcdGlmKCFSR0IudGVzdChjb2xvcikpXHJcblx0XHRcdHJldHVybiBjb2xvclxyXG5cdFx0dmFyIFIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwzKSwxNik7XHJcblx0XHR2YXIgRyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLDUpLDE2KTtcclxuXHRcdHZhciBCID0gcGFyc2VJbnQoY29sb3Iuc3Vic3RyaW5nKDUsNyksMTYpO1xyXG5cclxuXHRcdFIgPSBwYXJzZUludChSICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHRcdEcgPSBwYXJzZUludChHICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHRcdEIgPSBwYXJzZUludChCICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcclxuXHJcblx0XHRSID0gKFI8MjU1KT9SOjI1NTtcclxuXHRcdEcgPSAoRzwyNTUpP0c6MjU1O1xyXG5cdFx0QiA9IChCPDI1NSk/QjoyNTU7XHJcblxyXG5cdFx0dmFyIFJSID0gKChSLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK1IudG9TdHJpbmcoMTYpOlIudG9TdHJpbmcoMTYpKTtcclxuXHRcdHZhciBHRyA9ICgoRy50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitHLnRvU3RyaW5nKDE2KTpHLnRvU3RyaW5nKDE2KSk7XHJcblx0XHR2YXIgQkIgPSAoKEIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrQi50b1N0cmluZygxNik6Qi50b1N0cmluZygxNikpO1xyXG5cclxuXHRcdHJldHVybiBcIiNcIitSUitHRytCQjtcclxuXHR9XHJcblx0YXNPYmplY3QoeCwgZil7XHJcblx0XHR2YXIgbz17fVxyXG5cdFx0Zm9yKHZhciBpPTAsYXR0cnM9eC5hdHRyaWJ1dGVzLGxlbj1hdHRycy5sZW5ndGg7aTxsZW47aSsrKVxyXG5cdFx0XHRvW2F0dHJzW2ldLmxvY2FsTmFtZV09IGYgPyBmKGF0dHJzW2ldLnZhbHVlKSA6IGF0dHJzW2ldLnZhbHVlXHJcblx0XHRyZXR1cm4gb1xyXG5cdH1cclxuXHRhc1B0KHgsIHR5cGUpe1xyXG5cdFx0c3dpdGNoKHR5cGUpe1xyXG5cdFx0Y2FzZSAnY20nOlxyXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeCkqMjguMzQ2NDU2Ny8zNjAwMDA7XHJcblx0XHRkZWZhdWx0Oi8vZHhhXHJcblx0XHRcdHJldHVybiBwYXJzZUludCh4KS8yMC4wXHJcblx0XHR9XHJcblx0fVxyXG5cdHB0MlB4KHgpe1xyXG5cdFx0aWYodHlwZW9mKHgpPT0nc3RyaW5nJylcclxuXHRcdFx0eD1wYXJzZUZsb2F0KHgucmVwbGFjZSgncHQnLCcnKSlcclxuXHRcdHJldHVybiBNYXRoLmZsb29yKHgqOTYvNzIpXHJcblx0fVxyXG59XHJcbiJdfQ==