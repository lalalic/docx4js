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
		this.ns = 'w:';
	}

	_createClass(XmlObject, [{
		key: 'get',
		value: function get(path) {
			return XmlObject.get(path, this.raw, this.ns);
		}
	}], [{
		key: 'getNS',
		value: function getNS(xmlobj) {
			var _Object$keys$0$split = Object.keys(xmlobj)[0].split(':');

			var _Object$keys$0$split2 = _slicedToArray(_Object$keys$0$split, 2);

			var n = _Object$keys$0$split2[0];
			var tag = _Object$keys$0$split2[1];

			return tag == undefined ? '' : n + ':';
		}
	}, {
		key: 'get',
		value: function get(path, xmlobj, ns) {
			if (ns == undefined) ns = XmlObject.getNS(xmlObj);

			return path.split(".").reduce(function (p, key) {
				if (!p) return p;

				if (key != '$' && key.split(':').length == 1) key = '' + ns + key;

				if (Array.isArray(p = p[key]) && p.length == 1) p = p[0];

				if (p && p.$ && p.$[ns + 'val'] != undefined) return p.$[ns + 'val'];

				return p;
			}, xmlobj);
		}
	}, {
		key: 'getable',
		value: function getable(xmlobj) {
			xmlobj.get = function (path) {
				var value = XmlObject.get(path, xmlobj, 'w:');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy94bWxPYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBcUI7QUFDcEIsVUFEb0IsU0FDcEIsQ0FBWSxnQkFBWixFQUE2Qjt3QkFEVCxXQUNTOztBQUM1QixPQUFLLEdBQUwsR0FBUyxnQkFBVCxDQUQ0QjtBQUU1QixPQUFLLEVBQUwsR0FBUSxJQUFSLENBRjRCO0VBQTdCOztjQURvQjs7c0JBTWhCLE1BQUs7QUFDUixVQUFPLFVBQVUsR0FBVixDQUFjLElBQWQsRUFBbUIsS0FBSyxHQUFMLEVBQVUsS0FBSyxFQUFMLENBQXBDLENBRFE7Ozs7d0JBSUksUUFBTzs4QkFDSixPQUFPLElBQVAsQ0FBWSxNQUFaLEVBQW9CLENBQXBCLEVBQXVCLEtBQXZCLENBQTZCLEdBQTdCLEVBREk7Ozs7T0FDWiw2QkFEWTtPQUNULCtCQURTOztBQUVuQixVQUFPLE9BQUssU0FBTCxHQUFpQixFQUFqQixHQUFzQixJQUFFLEdBQUYsQ0FGVjs7OztzQkFLVCxNQUFNLFFBQVEsSUFBRztBQUMzQixPQUFHLE1BQUksU0FBSixFQUNGLEtBQUcsVUFBVSxLQUFWLENBQWdCLE1BQWhCLENBQUgsQ0FERDs7QUFHQSxVQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxDQUFELEVBQUcsR0FBSCxFQUFTO0FBQ3RDLFFBQUcsQ0FBQyxDQUFELEVBQ0YsT0FBTyxDQUFQLENBREQ7O0FBR0EsUUFBRyxPQUFLLEdBQUwsSUFBWSxJQUFJLEtBQUosQ0FBVSxHQUFWLEVBQWUsTUFBZixJQUF1QixDQUF2QixFQUNkLFdBQU8sS0FBSyxHQUFaLENBREQ7O0FBR0EsUUFBRyxNQUFNLE9BQU4sQ0FBYyxJQUFFLEVBQUUsR0FBRixDQUFGLENBQWQsSUFBMkIsRUFBRSxNQUFGLElBQVUsQ0FBVixFQUM3QixJQUFFLEVBQUUsQ0FBRixDQUFGLENBREQ7O0FBR0EsUUFBRyxLQUFLLEVBQUUsQ0FBRixJQUFPLEVBQUUsQ0FBRixDQUFPLFVBQVAsS0FBaUIsU0FBakIsRUFDZCxPQUFPLEVBQUUsQ0FBRixDQUFPLFVBQVAsQ0FBUCxDQUREOztBQUdBLFdBQU8sQ0FBUCxDQWJzQztJQUFULEVBYzVCLE1BZEssQ0FBUCxDQUoyQjs7OzswQkFxQmIsUUFBTztBQUNyQixVQUFPLEdBQVAsR0FBVyxVQUFTLElBQVQsRUFBYztBQUN4QixRQUFJLFFBQU0sVUFBVSxHQUFWLENBQWMsSUFBZCxFQUFtQixNQUFuQixFQUEyQixJQUEzQixDQUFOLENBRG9CO0FBRXhCLFFBQUcsU0FBUyxRQUFPLHFEQUFQLElBQWUsUUFBZixFQUNYLE9BQU8sVUFBVSxPQUFWLENBQWtCLEtBQWxCLENBQVAsQ0FERDtBQUVBLFdBQU8sS0FBUCxDQUp3QjtJQUFkLENBRFU7O0FBUXJCLFVBQU8sTUFBUCxDQVJxQjs7OztRQXBDRiIsImZpbGUiOiJ4bWxPYmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBYbWxPYmplY3R7XHJcblx0Y29uc3RydWN0b3Iob2JqZWN0RnJvbVhtbDJKcyl7XHJcblx0XHR0aGlzLnJhdz1vYmplY3RGcm9tWG1sMkpzXHJcblx0XHR0aGlzLm5zPSd3OidcclxuXHR9XHJcblx0XHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0cmV0dXJuIFhtbE9iamVjdC5nZXQocGF0aCx0aGlzLnJhdywgdGhpcy5ucylcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldE5TKHhtbG9iail7XHJcblx0XHRjb25zdCBbbiwgdGFnXT1PYmplY3Qua2V5cyh4bWxvYmopWzBdLnNwbGl0KCc6JylcclxuXHRcdHJldHVybiB0YWc9PXVuZGVmaW5lZCA/ICcnIDogbisnOidcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldChwYXRoLCB4bWxvYmosIG5zKXtcclxuXHRcdGlmKG5zPT11bmRlZmluZWQpXHJcblx0XHRcdG5zPVhtbE9iamVjdC5nZXROUyh4bWxPYmopXHJcblx0XHRcclxuXHRcdHJldHVybiBwYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+e1xyXG5cdFx0XHRpZighcClcclxuXHRcdFx0XHRyZXR1cm4gcFxyXG5cdFx0XHRcclxuXHRcdFx0aWYoa2V5IT0nJCcgJiYga2V5LnNwbGl0KCc6JykubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdGtleT1gJHtuc30ke2tleX1gXHJcblx0XHRcdFxyXG5cdFx0XHRpZihBcnJheS5pc0FycmF5KHA9cFtrZXldKSAmJiBwLmxlbmd0aD09MSlcclxuXHRcdFx0XHRwPXBbMF1cclxuXHRcdFx0XHJcblx0XHRcdGlmKHAgJiYgcC4kICYmIHAuJFtgJHtuc312YWxgXSE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHJldHVybiBwLiRbYCR7bnN9dmFsYF1cclxuXHRcdFx0XHJcblx0XHRcdHJldHVybiBwXHJcblx0XHR9LHhtbG9iailcclxuXHR9XHJcblx0XHJcblx0c3RhdGljIGdldGFibGUoeG1sb2JqKXtcclxuXHRcdHhtbG9iai5nZXQ9ZnVuY3Rpb24ocGF0aCl7XHJcblx0XHRcdGxldCB2YWx1ZT1YbWxPYmplY3QuZ2V0KHBhdGgseG1sb2JqLCAndzonKVxyXG5cdFx0XHRpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpPT0nb2JqZWN0JylcclxuXHRcdFx0XHRyZXR1cm4gWG1sT2JqZWN0LmdldGFibGUodmFsdWUpXHJcblx0XHRcdHJldHVybiB2YWx1ZVxyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRyZXR1cm4geG1sb2JqXHJcblx0fVxyXG59Il19