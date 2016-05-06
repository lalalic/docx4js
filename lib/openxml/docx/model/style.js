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

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Style).apply(this, arguments));

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

	function Properties() {
		_classCallCheck(this, Properties);

		return _possibleConstructorReturn(this, Object.getPrototypeOf(Properties).apply(this, arguments));
	}

	_createClass(Properties, [{
		key: 'parse',

		//use parent visitor to visitor style nodes and attributes
		value: function parse(visitors) {
			var _this3 = this;

			var values = {},
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
	}], [{
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

	return Properties;
}(require('../model'));
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLE1BQUksdUJBQUo7O0lBQ2lCOzs7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxJQUFaLEVBQWlCLElBQWpCLEVBQXNCLE9BQXRCLEVBQThCO3dCQURWLE9BQ1U7O3FFQURWLG1CQUVWLFlBRG9COztBQUU3QixNQUFHLEtBQUssSUFBTCxDQUFVLFdBQVYsS0FBd0IsR0FBeEIsRUFDRixLQUFLLEtBQUwsQ0FBVyxVQUFYLFFBREQ7QUFFQSxRQUFLLElBQUwsR0FBVSxNQUFLLElBQUwsQ0FBVSxNQUFWLENBQVYsQ0FKNkI7QUFLN0IsTUFBRyxNQUFLLEVBQUwsR0FBUSxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQVIsRUFDRixLQUFLLEtBQUwsQ0FBVyxHQUFYLFFBREQ7ZUFMNkI7RUFBOUI7O2NBRG9COzttQ0FTSjtBQUNmLFVBQU8sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixDQUFvQixLQUFLLElBQUwsQ0FBVSxTQUFWLENBQXBCLENBQVAsQ0FEZTs7Ozs4QkFHTDtBQUNWLFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLFdBQWYsS0FBNkIsR0FBN0IsQ0FERzs7Ozs2QkFHRDtBQUNULFVBQU8sQ0FBQyxDQUFELENBREU7Ozs7b0NBR087QUFDaEIsVUFBTyxDQUFDLENBQUQsQ0FEUzs7OztRQWxCRztFQUFjLFFBQVEsVUFBUjs7a0JBQWQ7OztBQXVCckIsSUFBSSxTQUFPLEVBQVA7QUFDSixNQUFNLFVBQU47V0FBdUI7Ozs7Ozs7Ozs7Ozt3QkFNaEIsVUFBUzs7O0FBQ2QsT0FBSSxTQUFPLEVBQVA7T0FBVyxTQUFPLEtBQUssV0FBTCxDQUFpQixNQUFqQjtPQUF5QixPQUFLLEtBQUssV0FBTCxDQUFpQixJQUFqQjtPQUF1QixDQUEzRSxDQURjO0FBRWQsWUFBUyxPQUFULENBQWlC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R0FBRCxDQUFSOzs7O3NCQUhNO0FBQUMsVUFBTyxJQUFQLENBQUQ7Ozs7c0JBQ0U7QUFBQyxVQUFPLE1BQVAsQ0FBRDs7OztRQUZHO0VBQW1CLFFBQVEsVUFBUixFQUExQyIsImZpbGUiOiJzdHlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSR0I9LyhbYS1mQS1GMC05XXsyfT8pezN9Py87XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZSBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdGNvbnN0cnVjdG9yKHdYbWwsd0RvYyxtUGFyZW50KXtcblx0XHRzdXBlciguLi5hcmd1bWVudHMpXG5cdFx0aWYod1htbC5hdHRyKCd3OmRlZmF1bHQnKT09JzEnKVxuXHRcdFx0d0RvYy5zdHlsZS5zZXREZWZhdWx0KHRoaXMpXG5cdFx0dGhpcy5uYW1lPXRoaXMuX3ZhbCgnbmFtZScpXG5cdFx0aWYodGhpcy5pZD10aGlzLl9hdHRyKCd3OnN0eWxlSWQnKSlcblx0XHRcdHdEb2Muc3R5bGUuc2V0KHRoaXMpXG5cdH1cblx0Z2V0UGFyZW50U3R5bGUoKXtcblx0XHRyZXR1cm4gdGhpcy53RG9jLnN0eWxlLmdldCh0aGlzLl92YWwoJ2Jhc2VkT24nKSlcblx0fVxuXHRpc0RlZmF1bHQoKXtcblx0XHRyZXR1cm4gdGhpcy53WG1sLmF0dHIoJ3c6ZGVmYXVsdCcpPT0nMSdcblx0fVxuXHRnZXROdW1JZCgpe1xuXHRcdHJldHVybiAtMVxuXHR9XG5cdGdldE91dGxpbmVMZXZlbCgpe1xuXHRcdHJldHVybiAtMVxuXHR9XG59XG5cbnZhciBuYW1pbmc9e31cblN0eWxlLlByb3BlcnRpZXM9Y2xhc3MgUHJvcGVydGllcyBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBudWxsfVxuXHRzdGF0aWMgZ2V0IG5hbWluZygpe3JldHVybiBuYW1pbmd9XG5cblx0Z2V0IEVNUFRZKCl7cmV0dXJuIC05OTl9XG5cdC8vdXNlIHBhcmVudCB2aXNpdG9yIHRvIHZpc2l0b3Igc3R5bGUgbm9kZXMgYW5kIGF0dHJpYnV0ZXNcblx0cGFyc2UodmlzaXRvcnMpe1xuXHRcdHZhciB2YWx1ZXM9e30sIG5hbWluZz10aGlzLmNvbnN0cnVjdG9yLm5hbWluZywgdHlwZT10aGlzLmNvbnN0cnVjdG9yLnR5cGUsIHRcblx0XHR2aXNpdG9ycy5mb3JFYWNoKCh2aXNpdG9yKT0+e1xuXHRcdFx0W3RoaXMuX2dldFZhbGlkQ2hpbGRyZW4oKSx0aGlzLndYbWwuYXR0cmlidXRlc10uZm9yRWFjaCgoY2hpbGRyZW4pPT57XG5cdFx0XHRcdGZvcih2YXIgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcblx0XHRcdFx0XHR2YXIgbm9kZT1jaGlsZHJlbltpXSwgbmFtZT1ub2RlLmxvY2FsTmFtZVxuXHRcdFx0XHRcdGlmKHZhbHVlc1tuYW1lXT09dW5kZWZpbmVkKXtcblx0XHRcdFx0XHRcdGlmKHR5cGVvZih0aGlzW25hbWVdKT09J2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdFx0dmFsdWVzW25hbWVdPXRoaXNbbmFtZV0obm9kZSlcblx0XHRcdFx0XHRcdGVsc2UgaWYobm9kZS5hdHRyICYmICh0PW5vZGUuYXR0cihcInc6dmFsXCIpKSkvL2xhenkgZGVmYXVsdFxuXHRcdFx0XHRcdFx0XHR2YWx1ZXNbbmFtZV09dFxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YWx1ZXNbbmFtZV0hPXRoaXMuRU1QVFkgJiYgdmlzaXRvci52aXNpdCh2YWx1ZXNbbmFtZV0sbmFtaW5nW25hbWVdfHxuYW1lLHR5cGUpXG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0fSlcblx0fVxuXHRfZ2V0VmFsaWRDaGlsZHJlbigpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuY2hpbGROb2Rlc1xuXHR9XG5cdGJhc2VkT24oeCl7XG5cdFx0cmV0dXJuIHguYXR0cigndzp2YWwnKVxuXHR9XG5cdGFzQ29sb3Iodil7XG5cdFx0aWYoIXYgfHwgdi5sZW5ndGg9PTAgfHwgdj09J2F1dG8nKVxuXHRcdFx0cmV0dXJuICcjMDAwMDAwJ1xuXHRcdHY9di5zcGxpdCgnICcpWzBdXG5cdFx0cmV0dXJuIHYuY2hhckF0KDApPT0nIycgPyB2IDogKFJHQi50ZXN0KHYpID8gJyMnK3YgOiB2KVxuXHR9XG5cdHNoYWRlQ29sb3IoY29sb3IsIHBlcmNlbnQpIHtcblx0XHRpZighUkdCLnRlc3QoY29sb3IpKVxuXHRcdFx0cmV0dXJuIGNvbG9yXG5cdFx0dmFyIFIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMSwzKSwxNik7XG5cdFx0dmFyIEcgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoMyw1KSwxNik7XG5cdFx0dmFyIEIgPSBwYXJzZUludChjb2xvci5zdWJzdHJpbmcoNSw3KSwxNik7XG5cblx0XHRSID0gcGFyc2VJbnQoUiAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cdFx0RyA9IHBhcnNlSW50KEcgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXHRcdEIgPSBwYXJzZUludChCICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblxuXHRcdFIgPSAoUjwyNTUpP1I6MjU1O1xuXHRcdEcgPSAoRzwyNTUpP0c6MjU1O1xuXHRcdEIgPSAoQjwyNTUpP0I6MjU1O1xuXG5cdFx0dmFyIFJSID0gKChSLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK1IudG9TdHJpbmcoMTYpOlIudG9TdHJpbmcoMTYpKTtcblx0XHR2YXIgR0cgPSAoKEcudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrRy50b1N0cmluZygxNik6Ry50b1N0cmluZygxNikpO1xuXHRcdHZhciBCQiA9ICgoQi50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitCLnRvU3RyaW5nKDE2KTpCLnRvU3RyaW5nKDE2KSk7XG5cblx0XHRyZXR1cm4gXCIjXCIrUlIrR0crQkI7XG5cdH1cblx0YXNPYmplY3QoeCwgZil7XG5cdFx0dmFyIG89e31cblx0XHRmb3IodmFyIGk9MCxhdHRycz14LmF0dHJpYnV0ZXMsbGVuPWF0dHJzLmxlbmd0aDtpPGxlbjtpKyspXG5cdFx0XHRvW2F0dHJzW2ldLmxvY2FsTmFtZV09IGYgPyBmKGF0dHJzW2ldLnZhbHVlKSA6IGF0dHJzW2ldLnZhbHVlXG5cdFx0cmV0dXJuIG9cblx0fVxuXHRhc1B0KHgsIHR5cGUpe1xuXHRcdHN3aXRjaCh0eXBlKXtcblx0XHRjYXNlICdjbSc6XG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeCkqMjguMzQ2NDU2Ny8zNjAwMDA7XG5cdFx0ZGVmYXVsdDovL2R4YVxuXHRcdFx0cmV0dXJuIHBhcnNlSW50KHgpLzIwLjBcblx0XHR9XG5cdH1cblx0cHQyUHgoeCl7XG5cdFx0aWYodHlwZW9mKHgpPT0nc3RyaW5nJylcblx0XHRcdHg9cGFyc2VGbG9hdCh4LnJlcGxhY2UoJ3B0JywnJykpXG5cdFx0cmV0dXJuIE1hdGguZmxvb3IoeCo5Ni83Milcblx0fVxufVxuIl19