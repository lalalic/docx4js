'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XmlObject = function () {
	function XmlObject(objectFromXml2Js) {
		_classCallCheck(this, XmlObject);

		this.raw = objectFromXml2Js;
		this.ns = XmlObject.getNS(this.raw);
	}

	_createClass(XmlObject, [{
		key: 'get',
		value: function get(path) {
			return XmlObject.get(path, this.raw, this.ns);
		}
	}], [{
		key: 'getNS',
		value: function getNS(xmlobj) {
			var withNS = Object.keys(xmlobj).find(function (a) {
				return a != '$' && a != 'get';
			});
			if (withNS) {
				var _withNS$split = withNS.split(':');

				var _withNS$split2 = _slicedToArray(_withNS$split, 2);

				var n = _withNS$split2[0];
				var tag = _withNS$split2[1];

				return tag == undefined ? '' : n + ':';
			}
			return '';
		}
	}, {
		key: 'get',
		value: function get(path, xmlobj, ns) {
			if (ns == undefined) ns = XmlObject.getNS(xmlObj);

			var value = path.split(".").reduce(function (p, key) {
				if (!p) return p;

				if (Array.isArray(p) && p.length == 1) p = p[0];

				if (key != '$' && key.split(':').length == 1) p = p['' + ns + key] || p[key];else p = p[key];

				return p;
			}, xmlobj);

			return value;
		}
	}, {
		key: 'getable',
		value: function getable(xmlobj) {
			xmlobj.get = function (path) {
				var trim = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
				var ns = arguments[2];

				if (typeof trim == 'string') {
					ns = trim;
					trim = true;
				}

				var value = XmlObject.get(path, xmlobj, ns || XmlObject.getNS(xmlobj));

				if (trim) {
					if (Array.isArray(value) && value.length == 1) value = value[0];

					if (value && value.$ && value.$[ns + 'val'] != undefined) value = value.$[ns + 'val'];
				}

				if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return XmlObject.getable(value);
				return value;
			};

			return xmlobj;
		}
	}]);

	return XmlObject;
}();

exports.default = XmlObject;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,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YXVsdCBjbGFzcyBYbWxPYmplY3R7XHJcblx0Y29uc3RydWN0b3Iob2JqZWN0RnJvbVhtbDJKcyl7XHJcblx0XHR0aGlzLnJhdz1vYmplY3RGcm9tWG1sMkpzXHJcblx0XHR0aGlzLm5zPVhtbE9iamVjdC5nZXROUyh0aGlzLnJhdylcclxuXHR9XHJcblx0XHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0cmV0dXJuIFhtbE9iamVjdC5nZXQocGF0aCx0aGlzLnJhdywgdGhpcy5ucylcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldE5TKHhtbG9iail7XHJcblx0XHRsZXQgd2l0aE5TPU9iamVjdC5rZXlzKHhtbG9iaikuZmluZChhPT5hIT0nJCcmJmEhPSdnZXQnKVxyXG5cdFx0aWYod2l0aE5TKXtcclxuXHRcdFx0Y29uc3QgW24sIHRhZ109d2l0aE5TLnNwbGl0KCc6JylcclxuXHRcdFx0cmV0dXJuIHRhZz09dW5kZWZpbmVkID8gJycgOiBuKyc6J1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuICcnXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXQocGF0aCwgeG1sb2JqLCBucyl7XHJcblx0XHRpZihucz09dW5kZWZpbmVkKVxyXG5cdFx0XHRucz1YbWxPYmplY3QuZ2V0TlMoeG1sT2JqKVxyXG5cdFx0XHJcblx0XHRsZXQgdmFsdWU9cGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChwLGtleSk9PntcclxuXHRcdFx0aWYoIXApXHJcblx0XHRcdFx0cmV0dXJuIHBcclxuXHRcdFx0XHJcblx0XHRcdGlmKEFycmF5LmlzQXJyYXkocCkgJiYgcC5sZW5ndGg9PTEpXHJcblx0XHRcdFx0cD1wWzBdXHJcblx0XHJcblx0XHRcdGlmKGtleSE9JyQnICYmIGtleS5zcGxpdCgnOicpLmxlbmd0aD09MSlcclxuXHRcdFx0XHRwPXBbYCR7bnN9JHtrZXl9YF18fHBba2V5XVxyXG5cdFx0XHRlbHNlXHJcblx0XHRcdFx0cD1wW2tleV1cclxuXHJcblx0XHRcdHJldHVybiBwXHJcblx0XHR9LHhtbG9iailcclxuXHRcdFxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cdFxyXG5cdHN0YXRpYyBnZXRhYmxlKHhtbG9iail7XHJcblx0XHR4bWxvYmouZ2V0PWZ1bmN0aW9uKHBhdGgsdHJpbT10cnVlLG5zKXtcclxuXHRcdFx0aWYodHlwZW9mKHRyaW0pPT0nc3RyaW5nJyl7XHJcblx0XHRcdFx0bnM9dHJpbVxyXG5cdFx0XHRcdHRyaW09dHJ1ZVxyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0XHRsZXQgdmFsdWU9WG1sT2JqZWN0LmdldChwYXRoLHhtbG9iaiwgbnN8fFhtbE9iamVjdC5nZXROUyh4bWxvYmopKVxyXG5cdFx0XHRcclxuXHRcdFx0aWYodHJpbSl7XHJcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdFx0dmFsdWU9dmFsdWVbMF1cclxuXHRcdFx0XHJcblx0XHRcdFx0aWYodmFsdWUgJiYgdmFsdWUuJCAmJiB2YWx1ZS4kW2Ake25zfXZhbGBdIT11bmRlZmluZWQpXHJcblx0XHRcdFx0XHR2YWx1ZT12YWx1ZS4kW2Ake25zfXZhbGBdXHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHRcdGlmKHZhbHVlICYmIHR5cGVvZih2YWx1ZSk9PSdvYmplY3QnKVxyXG5cdFx0XHRcdHJldHVybiBYbWxPYmplY3QuZ2V0YWJsZSh2YWx1ZSlcclxuXHRcdFx0cmV0dXJuIHZhbHVlXHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHJldHVybiB4bWxvYmpcclxuXHR9XHJcbn0iXX0=