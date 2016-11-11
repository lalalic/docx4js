'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.getable = getable;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getable(xmlobj) {
	(typeof xmlobj === 'undefined' ? 'undefined' : (0, _typeof3.default)(xmlobj)) == 'object' && (xmlobj.get = function (path) {
		var trim = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

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

		if (value && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) == 'object') return getable(value);
		return value;
	});

	return xmlobj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy94bWxPYmplY3QuanMiXSwibmFtZXMiOlsiZ2V0YWJsZSIsInhtbG9iaiIsImdldCIsInBhdGgiLCJ0cmltIiwidmFsdWUiLCJzcGxpdCIsInJlZHVjZSIsInAiLCJrZXkiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCIkIiwidmFsIiwidW5kZWZpbmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O1FBQWdCQSxPLEdBQUFBLE87Ozs7QUFBVCxTQUFTQSxPQUFULENBQWlCQyxNQUFqQixFQUF3QjtBQUM5QixTQUFPQSxNQUFQLHVEQUFPQSxNQUFQLE1BQWdCLFFBQWhCLEtBQTZCQSxPQUFPQyxHQUFQLEdBQVcsVUFBU0MsSUFBVCxFQUF3QjtBQUFBLE1BQVZDLElBQVUsdUVBQUwsSUFBSzs7QUFDL0QsTUFBSUMsUUFBTUYsS0FBS0csS0FBTCxDQUFXLEdBQVgsRUFBZ0JDLE1BQWhCLENBQXVCLFVBQUNDLENBQUQsRUFBR0MsR0FBSCxFQUFTO0FBQ3pDLE9BQUcsQ0FBQ0QsQ0FBSixFQUNDLE9BQU9BLENBQVA7O0FBRUQsT0FBR0UsTUFBTUMsT0FBTixDQUFjSCxDQUFkLEtBQW9CQSxFQUFFSSxNQUFGLElBQVUsQ0FBakMsRUFDQ0osSUFBRUEsRUFBRSxDQUFGLENBQUY7O0FBRURBLE9BQUVBLEVBQUVDLEdBQUYsQ0FBRjs7QUFFQSxVQUFPRCxDQUFQO0FBQ0EsR0FWUyxFQVVSLElBVlEsQ0FBVjs7QUFZQSxNQUFHSixJQUFILEVBQVE7QUFDUCxPQUFHTSxNQUFNQyxPQUFOLENBQWNOLEtBQWQsS0FBd0JBLE1BQU1PLE1BQU4sSUFBYyxDQUF6QyxFQUNDUCxRQUFNQSxNQUFNLENBQU4sQ0FBTjs7QUFFRCxPQUFHQSxTQUFTQSxNQUFNUSxDQUFmLElBQW9CUixNQUFNUSxDQUFOLENBQVFDLEdBQVIsSUFBYUMsU0FBcEMsRUFDQ1YsUUFBTUEsTUFBTVEsQ0FBTixDQUFRQyxHQUFkO0FBQ0Q7O0FBRUQsTUFBR1QsU0FBUyxRQUFPQSxLQUFQLHVEQUFPQSxLQUFQLE1BQWUsUUFBM0IsRUFDQyxPQUFPTCxRQUFRSyxLQUFSLENBQVA7QUFDRCxTQUFPQSxLQUFQO0FBQ0EsRUF4QkQ7O0FBMEJBLFFBQU9KLE1BQVA7QUFDQSIsImZpbGUiOiJ4bWxPYmplY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0YWJsZSh4bWxvYmope1xyXG5cdHR5cGVvZih4bWxvYmopPT0nb2JqZWN0JyAmJiAoeG1sb2JqLmdldD1mdW5jdGlvbihwYXRoLHRyaW09dHJ1ZSl7XHJcblx0XHRsZXQgdmFsdWU9cGF0aC5zcGxpdChcIi5cIikucmVkdWNlKChwLGtleSk9PntcclxuXHRcdFx0aWYoIXApXHJcblx0XHRcdFx0cmV0dXJuIHBcclxuXHJcblx0XHRcdGlmKEFycmF5LmlzQXJyYXkocCkgJiYgcC5sZW5ndGg9PTEpXHJcblx0XHRcdFx0cD1wWzBdXHJcblxyXG5cdFx0XHRwPXBba2V5XVxyXG5cclxuXHRcdFx0cmV0dXJuIHBcclxuXHRcdH0sdGhpcylcclxuXHJcblx0XHRpZih0cmltKXtcclxuXHRcdFx0aWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoPT0xKVxyXG5cdFx0XHRcdHZhbHVlPXZhbHVlWzBdXHJcblxyXG5cdFx0XHRpZih2YWx1ZSAmJiB2YWx1ZS4kICYmIHZhbHVlLiQudmFsIT11bmRlZmluZWQpXHJcblx0XHRcdFx0dmFsdWU9dmFsdWUuJC52YWxcclxuXHRcdH1cclxuXHJcblx0XHRpZih2YWx1ZSAmJiB0eXBlb2YodmFsdWUpPT0nb2JqZWN0JylcclxuXHRcdFx0cmV0dXJuIGdldGFibGUodmFsdWUpXHJcblx0XHRyZXR1cm4gdmFsdWVcclxuXHR9KVxyXG5cclxuXHRyZXR1cm4geG1sb2JqXHJcbn0iXX0=