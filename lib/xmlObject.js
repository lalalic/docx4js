"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var XmlObject = function () {
	function XmlObject(objectFromXml2Js) {
		_classCallCheck(this, XmlObject);

		this.raw = objectFromXml2Js;
	}

	_createClass(XmlObject, [{
		key: "get",
		value: function get(path) {
			return XmlObject.get(path, this.raw);
		}
	}], [{
		key: "get",
		value: function get(path, xmlobj) {
			var value = path.split(".").reduce(function (p, key) {
				if (!p) return p;

				if (Array.isArray(p) && p.length == 1) p = p[0];

				p = p[key];

				return p;
			}, xmlobj);

			return value;
		}
	}, {
		key: "getable",
		value: function getable(xmlobj) {
			xmlobj.get = function (path) {
				var trim = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

				var value = XmlObject.get(path, xmlobj);

				if (trim) {
					if (Array.isArray(value) && value.length == 1) value = value[0];

					if (value && value.$ && value.$.val != undefined) value = value.$.val;
				}

				if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) == 'object') return XmlObject.getable(value);
				return value;
			};

			return xmlobj;
		}
	}]);

	return XmlObject;
}();

exports.default = XmlObject;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy94bWxPYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQXFCO0FBQ3BCLFVBRG9CLFNBQ3BCLENBQVksZ0JBQVosRUFBNkI7d0JBRFQsV0FDUzs7QUFDNUIsT0FBSyxHQUFMLEdBQVMsZ0JBQVQsQ0FENEI7RUFBN0I7O2NBRG9COztzQkFLaEIsTUFBSztBQUNSLFVBQU8sVUFBVSxHQUFWLENBQWMsSUFBZCxFQUFtQixLQUFLLEdBQUwsQ0FBMUIsQ0FEUTs7OztzQkFJRSxNQUFNLFFBQU87QUFDdkIsT0FBSSxRQUFNLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxDQUFELEVBQUcsR0FBSCxFQUFTO0FBQ3pDLFFBQUcsQ0FBQyxDQUFELEVBQ0YsT0FBTyxDQUFQLENBREQ7O0FBR0EsUUFBRyxNQUFNLE9BQU4sQ0FBYyxDQUFkLEtBQW9CLEVBQUUsTUFBRixJQUFVLENBQVYsRUFDdEIsSUFBRSxFQUFFLENBQUYsQ0FBRixDQUREOztBQUdBLFFBQUUsRUFBRSxHQUFGLENBQUYsQ0FQeUM7O0FBU3pDLFdBQU8sQ0FBUCxDQVR5QztJQUFULEVBVS9CLE1BVlEsQ0FBTixDQURtQjs7QUFhdkIsVUFBTyxLQUFQLENBYnVCOzs7OzBCQWdCVCxRQUFPO0FBQ3JCLFVBQU8sR0FBUCxHQUFXLFVBQVMsSUFBVCxFQUF3QjtRQUFWLDZEQUFLLG9CQUFLOztBQUNsQyxRQUFJLFFBQU0sVUFBVSxHQUFWLENBQWMsSUFBZCxFQUFtQixNQUFuQixDQUFOLENBRDhCOztBQUdsQyxRQUFHLElBQUgsRUFBUTtBQUNQLFNBQUcsTUFBTSxPQUFOLENBQWMsS0FBZCxLQUF3QixNQUFNLE1BQU4sSUFBYyxDQUFkLEVBQzFCLFFBQU0sTUFBTSxDQUFOLENBQU4sQ0FERDs7QUFHQSxTQUFHLFNBQVMsTUFBTSxDQUFOLElBQVcsTUFBTSxDQUFOLENBQVEsR0FBUixJQUFhLFNBQWIsRUFDdEIsUUFBTSxNQUFNLENBQU4sQ0FBUSxHQUFSLENBRFA7S0FKRDs7QUFRQSxRQUFHLFNBQVMsUUFBTyxxREFBUCxJQUFlLFFBQWYsRUFDWCxPQUFPLFVBQVUsT0FBVixDQUFrQixLQUFsQixDQUFQLENBREQ7QUFFQSxXQUFPLEtBQVAsQ0Fia0M7SUFBeEIsQ0FEVTs7QUFpQnJCLFVBQU8sTUFBUCxDQWpCcUI7Ozs7UUF6QkYiLCJmaWxlIjoieG1sT2JqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgWG1sT2JqZWN0e1xyXG5cdGNvbnN0cnVjdG9yKG9iamVjdEZyb21YbWwySnMpe1xyXG5cdFx0dGhpcy5yYXc9b2JqZWN0RnJvbVhtbDJKc1xyXG5cdH1cclxuXHJcblx0Z2V0KHBhdGgpe1xyXG5cdFx0cmV0dXJuIFhtbE9iamVjdC5nZXQocGF0aCx0aGlzLnJhdylcclxuXHR9XHJcblxyXG5cdHN0YXRpYyBnZXQocGF0aCwgeG1sb2JqKXtcclxuXHRcdGxldCB2YWx1ZT1wYXRoLnNwbGl0KFwiLlwiKS5yZWR1Y2UoKHAsa2V5KT0+e1xyXG5cdFx0XHRpZighcClcclxuXHRcdFx0XHRyZXR1cm4gcFxyXG5cclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheShwKSAmJiBwLmxlbmd0aD09MSlcclxuXHRcdFx0XHRwPXBbMF1cclxuXHJcblx0XHRcdHA9cFtrZXldXHJcblxyXG5cdFx0XHRyZXR1cm4gcFxyXG5cdFx0fSx4bWxvYmopXHJcblxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fVxyXG5cclxuXHRzdGF0aWMgZ2V0YWJsZSh4bWxvYmope1xyXG5cdFx0eG1sb2JqLmdldD1mdW5jdGlvbihwYXRoLHRyaW09dHJ1ZSl7XHJcblx0XHRcdGxldCB2YWx1ZT1YbWxPYmplY3QuZ2V0KHBhdGgseG1sb2JqKVxyXG5cclxuXHRcdFx0aWYodHJpbSl7XHJcblx0XHRcdFx0aWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdFx0dmFsdWU9dmFsdWVbMF1cclxuXHJcblx0XHRcdFx0aWYodmFsdWUgJiYgdmFsdWUuJCAmJiB2YWx1ZS4kLnZhbCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdFx0dmFsdWU9dmFsdWUuJC52YWxcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKT09J29iamVjdCcpXHJcblx0XHRcdFx0cmV0dXJuIFhtbE9iamVjdC5nZXRhYmxlKHZhbHVlKVxyXG5cdFx0XHRyZXR1cm4gdmFsdWVcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4geG1sb2JqXHJcblx0fVxyXG59XHJcbiJdfQ==