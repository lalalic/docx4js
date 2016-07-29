'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.getable = getable;
function getable(xmlobj) {
	(typeof xmlobj === 'undefined' ? 'undefined' : _typeof(xmlobj)) == 'object' && (xmlobj.get = function (path) {
		var trim = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

		var value = path.split(".").reduce(function (p, key) {
			if (!p) return p;

			if (Array.isArray(p) && p.length == 1) p = p[0];

			p = p[key];

			return p;
		}, this);

		if (trim) {
			if (Array.isArray(value) && value.length == 1) value = value[0];

			if (value && value.$ && value.$.val != undefined) value = value.$.val;
		}

		if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') return getable(value);
		return value;
	});

	return xmlobj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy94bWxPYmplY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7UUFBZ0I7QUFBVCxTQUFTLE9BQVQsQ0FBaUIsTUFBakIsRUFBd0I7QUFDOUIsU0FBTyx1REFBUCxJQUFnQixRQUFoQixLQUE2QixPQUFPLEdBQVAsR0FBVyxVQUFTLElBQVQsRUFBd0I7TUFBViw2REFBSyxvQkFBSzs7QUFDL0QsTUFBSSxRQUFNLEtBQUssS0FBTCxDQUFXLEdBQVgsRUFBZ0IsTUFBaEIsQ0FBdUIsVUFBQyxDQUFELEVBQUcsR0FBSCxFQUFTO0FBQ3pDLE9BQUcsQ0FBQyxDQUFELEVBQ0YsT0FBTyxDQUFQLENBREQ7O0FBR0EsT0FBRyxNQUFNLE9BQU4sQ0FBYyxDQUFkLEtBQW9CLEVBQUUsTUFBRixJQUFVLENBQVYsRUFDdEIsSUFBRSxFQUFFLENBQUYsQ0FBRixDQUREOztBQUdBLE9BQUUsRUFBRSxHQUFGLENBQUYsQ0FQeUM7O0FBU3pDLFVBQU8sQ0FBUCxDQVR5QztHQUFULEVBVS9CLElBVlEsQ0FBTixDQUQyRDs7QUFhL0QsTUFBRyxJQUFILEVBQVE7QUFDUCxPQUFHLE1BQU0sT0FBTixDQUFjLEtBQWQsS0FBd0IsTUFBTSxNQUFOLElBQWMsQ0FBZCxFQUMxQixRQUFNLE1BQU0sQ0FBTixDQUFOLENBREQ7O0FBR0EsT0FBRyxTQUFTLE1BQU0sQ0FBTixJQUFXLE1BQU0sQ0FBTixDQUFRLEdBQVIsSUFBYSxTQUFiLEVBQ3RCLFFBQU0sTUFBTSxDQUFOLENBQVEsR0FBUixDQURQO0dBSkQ7O0FBUUEsTUFBRyxTQUFTLFFBQU8scURBQVAsSUFBZSxRQUFmLEVBQ1gsT0FBTyxRQUFRLEtBQVIsQ0FBUCxDQUREO0FBRUEsU0FBTyxLQUFQLENBdkIrRDtFQUF4QixDQUF4QyxDQUQ4Qjs7QUEyQjlCLFFBQU8sTUFBUCxDQTNCOEI7Q0FBeEIiLCJmaWxlIjoieG1sT2JqZWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldGFibGUoeG1sb2JqKXtcclxuXHR0eXBlb2YoeG1sb2JqKT09J29iamVjdCcgJiYgKHhtbG9iai5nZXQ9ZnVuY3Rpb24ocGF0aCx0cmltPXRydWUpe1xyXG5cdFx0bGV0IHZhbHVlPXBhdGguc3BsaXQoXCIuXCIpLnJlZHVjZSgocCxrZXkpPT57XHJcblx0XHRcdGlmKCFwKVxyXG5cdFx0XHRcdHJldHVybiBwXHJcblxyXG5cdFx0XHRpZihBcnJheS5pc0FycmF5KHApICYmIHAubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHA9cFswXVxyXG5cclxuXHRcdFx0cD1wW2tleV1cclxuXHJcblx0XHRcdHJldHVybiBwXHJcblx0XHR9LHRoaXMpXHJcblxyXG5cdFx0aWYodHJpbSl7XHJcblx0XHRcdGlmKEFycmF5LmlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aD09MSlcclxuXHRcdFx0XHR2YWx1ZT12YWx1ZVswXVxyXG5cclxuXHRcdFx0aWYodmFsdWUgJiYgdmFsdWUuJCAmJiB2YWx1ZS4kLnZhbCE9dW5kZWZpbmVkKVxyXG5cdFx0XHRcdHZhbHVlPXZhbHVlLiQudmFsXHJcblx0XHR9XHJcblxyXG5cdFx0aWYodmFsdWUgJiYgdHlwZW9mKHZhbHVlKT09J29iamVjdCcpXHJcblx0XHRcdHJldHVybiBnZXRhYmxlKHZhbHVlKVxyXG5cdFx0cmV0dXJuIHZhbHVlXHJcblx0fSlcclxuXHJcblx0cmV0dXJuIHhtbG9ialxyXG59Il19