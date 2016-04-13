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
	}], [{
		key: 'Properties',
		get: function get() {
			return Properties;
		}
	}]);

	return Style;
}(require('../model'));

exports.default = Style;


var naming = {};

var Properties = function (_require2) {
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
			    type = this.constructor.type;
			visitors.forEach(function (visitor) {
				[_this3._getValidChildren(), _this3.wXml.attributes].forEach(function (children) {
					for (var len = children.length, i = 0; i < len; i++) {
						var node = children[i],
						    name = node.localName;
						if (values[name] == undefined && typeof _this3[name] == 'function') values[name] = _this3[name](node);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvbW9kZWwvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxJQUFJLE1BQUksdUJBQUo7O0lBQ2lCOzs7QUFDcEIsVUFEb0IsS0FDcEIsQ0FBWSxJQUFaLEVBQWlCLElBQWpCLEVBQXNCLE9BQXRCLEVBQThCO3dCQURWLE9BQ1U7O3FFQURWLG1CQUVWLFlBRG9COztBQUU3QixNQUFHLEtBQUssSUFBTCxDQUFVLFdBQVYsS0FBd0IsR0FBeEIsRUFDRixLQUFLLEtBQUwsQ0FBVyxVQUFYLFFBREQ7QUFFQSxRQUFLLElBQUwsR0FBVSxNQUFLLElBQUwsQ0FBVSxNQUFWLENBQVYsQ0FKNkI7QUFLN0IsTUFBRyxNQUFLLEVBQUwsR0FBUSxNQUFLLEtBQUwsQ0FBVyxXQUFYLENBQVIsRUFDRixLQUFLLEtBQUwsQ0FBVyxHQUFYLFFBREQ7ZUFMNkI7RUFBOUI7O2NBRG9COzttQ0FTSjtBQUNmLFVBQU8sS0FBSyxJQUFMLENBQVUsS0FBVixDQUFnQixHQUFoQixDQUFvQixLQUFLLElBQUwsQ0FBVSxTQUFWLENBQXBCLENBQVAsQ0FEZTs7Ozs4QkFHTDtBQUNWLFVBQU8sS0FBSyxJQUFMLENBQVUsSUFBVixDQUFlLFdBQWYsS0FBNkIsR0FBN0IsQ0FERzs7Ozs2QkFHRDtBQUNULFVBQU8sQ0FBQyxDQUFELENBREU7Ozs7b0NBR087QUFDaEIsVUFBTyxDQUFDLENBQUQsQ0FEUzs7OztzQkFJTTtBQUFDLFVBQU8sVUFBUCxDQUFEOzs7O1FBdEJIO0VBQWMsUUFBUSxVQUFSOztrQkFBZDs7O0FBeUJyQixJQUFJLFNBQU8sRUFBUDs7SUFDRTs7Ozs7Ozs7Ozs7Ozt3QkFNQyxVQUFTOzs7QUFDZCxPQUFJLFNBQU8sRUFBUDtPQUFXLFNBQU8sS0FBSyxXQUFMLENBQWlCLE1BQWpCO09BQXlCLE9BQUssS0FBSyxXQUFMLENBQWlCLElBQWpCLENBRHRDO0FBRWQsWUFBUyxPQUFULENB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eWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIFJHQj0vKFthLWZBLUYwLTldezJ9Pyl7M30/LztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0eWxlIGV4dGVuZHMgcmVxdWlyZSgnLi4vbW9kZWwnKXtcblx0Y29uc3RydWN0b3Iod1htbCx3RG9jLG1QYXJlbnQpe1xuXHRcdHN1cGVyKC4uLmFyZ3VtZW50cylcblx0XHRpZih3WG1sLmF0dHIoJ3c6ZGVmYXVsdCcpPT0nMScpXG5cdFx0XHR3RG9jLnN0eWxlLnNldERlZmF1bHQodGhpcylcblx0XHR0aGlzLm5hbWU9dGhpcy5fdmFsKCduYW1lJylcblx0XHRpZih0aGlzLmlkPXRoaXMuX2F0dHIoJ3c6c3R5bGVJZCcpKVxuXHRcdFx0d0RvYy5zdHlsZS5zZXQodGhpcylcblx0fVxuXHRnZXRQYXJlbnRTdHlsZSgpe1xuXHRcdHJldHVybiB0aGlzLndEb2Muc3R5bGUuZ2V0KHRoaXMuX3ZhbCgnYmFzZWRPbicpKVxuXHR9XG5cdGlzRGVmYXVsdCgpe1xuXHRcdHJldHVybiB0aGlzLndYbWwuYXR0cigndzpkZWZhdWx0Jyk9PScxJ1xuXHR9XG5cdGdldE51bUlkKCl7XG5cdFx0cmV0dXJuIC0xXG5cdH1cblx0Z2V0T3V0bGluZUxldmVsKCl7XG5cdFx0cmV0dXJuIC0xXG5cdH1cblxuXHRzdGF0aWMgZ2V0IFByb3BlcnRpZXMoKXtyZXR1cm4gUHJvcGVydGllc31cbn1cblxudmFyIG5hbWluZz17fVxuY2xhc3MgUHJvcGVydGllcyBleHRlbmRzIHJlcXVpcmUoJy4uL21vZGVsJyl7XG5cdHN0YXRpYyBnZXQgdHlwZSgpe3JldHVybiBudWxsfVxuXHRzdGF0aWMgZ2V0IG5hbWluZygpe3JldHVybiBuYW1pbmd9XG5cblx0Z2V0IEVNUFRZKCl7cmV0dXJuIC05OTl9XG5cdC8vdXNlIHBhcmVudCB2aXNpdG9yIHRvIHZpc2l0b3Igc3R5bGUgbm9kZXMgYW5kIGF0dHJpYnV0ZXNcblx0cGFyc2UodmlzaXRvcnMpe1xuXHRcdHZhciB2YWx1ZXM9e30sIG5hbWluZz10aGlzLmNvbnN0cnVjdG9yLm5hbWluZywgdHlwZT10aGlzLmNvbnN0cnVjdG9yLnR5cGVcblx0XHR2aXNpdG9ycy5mb3JFYWNoKCh2aXNpdG9yKT0+e1xuXHRcdFx0W3RoaXMuX2dldFZhbGlkQ2hpbGRyZW4oKSx0aGlzLndYbWwuYXR0cmlidXRlc10uZm9yRWFjaCgoY2hpbGRyZW4pPT57XG5cdFx0XHRcdGZvcih2YXIgbGVuPWNoaWxkcmVuLmxlbmd0aCxpPTA7aTxsZW47aSsrKXtcblx0XHRcdFx0XHR2YXIgbm9kZT1jaGlsZHJlbltpXSwgbmFtZT1ub2RlLmxvY2FsTmFtZVxuXHRcdFx0XHRcdGlmKHZhbHVlc1tuYW1lXT09dW5kZWZpbmVkICYmIHR5cGVvZih0aGlzW25hbWVdKT09J2Z1bmN0aW9uJylcblx0XHRcdFx0XHRcdHZhbHVlc1tuYW1lXT10aGlzW25hbWVdKG5vZGUpO1xuXHRcdFx0XHRcdHZhbHVlc1tuYW1lXSE9dGhpcy5FTVBUWSAmJiB2aXNpdG9yLnZpc2l0KHZhbHVlc1tuYW1lXSxuYW1pbmdbbmFtZV18fG5hbWUsdHlwZSlcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHR9KVxuXHR9XG5cdF9nZXRWYWxpZENoaWxkcmVuKCl7XG5cdFx0cmV0dXJuIHRoaXMud1htbC5jaGlsZE5vZGVzXG5cdH1cblx0YmFzZWRPbih4KXtcblx0XHRyZXR1cm4geC5hdHRyKCd3OnZhbCcpXG5cdH1cblx0YXNDb2xvcih2KXtcblx0XHRpZighdiB8fCB2Lmxlbmd0aD09MCB8fCB2PT0nYXV0bycpXG5cdFx0XHRyZXR1cm4gJyMwMDAwMDAnXG5cdFx0dj12LnNwbGl0KCcgJylbMF1cblx0XHRyZXR1cm4gdi5jaGFyQXQoMCk9PScjJyA/IHYgOiAoUkdCLnRlc3QodikgPyAnIycrdiA6IHYpXG5cdH1cblx0c2hhZGVDb2xvcihjb2xvciwgcGVyY2VudCkge1xuXHRcdGlmKCFSR0IudGVzdChjb2xvcikpXG5cdFx0XHRyZXR1cm4gY29sb3Jcblx0XHR2YXIgUiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygxLDMpLDE2KTtcblx0XHR2YXIgRyA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZygzLDUpLDE2KTtcblx0XHR2YXIgQiA9IHBhcnNlSW50KGNvbG9yLnN1YnN0cmluZyg1LDcpLDE2KTtcblxuXHRcdFIgPSBwYXJzZUludChSICogKDEwMCArIHBlcmNlbnQpIC8gMTAwKTtcblx0XHRHID0gcGFyc2VJbnQoRyAqICgxMDAgKyBwZXJjZW50KSAvIDEwMCk7XG5cdFx0QiA9IHBhcnNlSW50KEIgKiAoMTAwICsgcGVyY2VudCkgLyAxMDApO1xuXG5cdFx0UiA9IChSPDI1NSk/UjoyNTU7XG5cdFx0RyA9IChHPDI1NSk/RzoyNTU7XG5cdFx0QiA9IChCPDI1NSk/QjoyNTU7XG5cblx0XHR2YXIgUlIgPSAoKFIudG9TdHJpbmcoMTYpLmxlbmd0aD09MSk/XCIwXCIrUi50b1N0cmluZygxNik6Ui50b1N0cmluZygxNikpO1xuXHRcdHZhciBHRyA9ICgoRy50b1N0cmluZygxNikubGVuZ3RoPT0xKT9cIjBcIitHLnRvU3RyaW5nKDE2KTpHLnRvU3RyaW5nKDE2KSk7XG5cdFx0dmFyIEJCID0gKChCLnRvU3RyaW5nKDE2KS5sZW5ndGg9PTEpP1wiMFwiK0IudG9TdHJpbmcoMTYpOkIudG9TdHJpbmcoMTYpKTtcblxuXHRcdHJldHVybiBcIiNcIitSUitHRytCQjtcblx0fVxuXHRhc09iamVjdCh4LCBmKXtcblx0XHR2YXIgbz17fVxuXHRcdGZvcih2YXIgaT0wLGF0dHJzPXguYXR0cmlidXRlcyxsZW49YXR0cnMubGVuZ3RoO2k8bGVuO2krKylcblx0XHRcdG9bYXR0cnNbaV0ubG9jYWxOYW1lXT0gZiA/IGYoYXR0cnNbaV0udmFsdWUpIDogYXR0cnNbaV0udmFsdWVcblx0XHRyZXR1cm4gb1xuXHR9XG5cdGFzUHQoeCwgdHlwZSl7XG5cdFx0c3dpdGNoKHR5cGUpe1xuXHRcdGNhc2UgJ2NtJzpcblx0XHRcdHJldHVybiBwYXJzZUludCh4KSoyOC4zNDY0NTY3LzM2MDAwMDtcblx0XHRkZWZhdWx0Oi8vZHhhXG5cdFx0XHRyZXR1cm4gcGFyc2VJbnQoeCkvMjAuMFxuXHRcdH1cblx0fVxuXHRwdDJQeCh4KXtcblx0XHRpZih0eXBlb2YoeCk9PSdzdHJpbmcnKVxuXHRcdFx0eD1wYXJzZUZsb2F0KHgucmVwbGFjZSgncHQnLCcnKSlcblx0XHRyZXR1cm4gTWF0aC5mbG9vcih4Kjk2LzcyKVxuXHR9XG59XG4iXX0=