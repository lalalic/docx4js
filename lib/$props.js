"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cheerio2.default.prototype.props = function () {
    var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (this.length == 0) return {};
    var $ = this.constructor;
    var names = opt.names,
        _opt$nameFn = opt.nameFn,
        nameFn = _opt$nameFn === undefined ? function (a) {
        return names && names[a] || a;
    } : _opt$nameFn,
        _opt$filter = opt.filter,
        filter = _opt$filter === undefined ? '*' : _opt$filter,
        _opt$tidy = opt.tidy,
        tidy = _opt$tidy === undefined ? function (a) {
        return a;
    } : _opt$tidy;


    var _xmlns = function _xmlns(attribs) {
        return Object.keys(attribs).filter(function (k) {
            return !k.startsWith("xmlns");
        }).reduce(function (o, k) {
            var v = attribs[k];
            k = k.split(":").pop();
            var b = opt[k] ? opt[k](v) : v;
            if (b != undefined) {
                o[nameFn(k)] = b;
            }
            return o;
        }, {});
    };

    var set = function set(a, o) {
        var k = a.name.split(":").pop();
        var b = opt[k] ? opt[k](a) : toJS(a);
        if (b != undefined) {
            o[nameFn(k, a, o)] = opt["tidy_" + k] ? opt["tidy_" + k](b) : b;
        }
        return o;
    };

    var toJS = function toJS(node, p) {
        var children = node.children,
            attribs = node.attribs;

        return children.filter(function (a) {
            return a.name && $(a).is(filter);
        }).reduce(function (o, a) {
            return set(a, o);
        }, _extends({}, _xmlns(attribs)));
    };

    var props = toJS(this[0]);

    return tidy ? tidy(props) : props;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy8kcHJvcHMuanMiXSwibmFtZXMiOlsicHJvdG90eXBlIiwicHJvcHMiLCJvcHQiLCJsZW5ndGgiLCIkIiwiY29uc3RydWN0b3IiLCJuYW1lcyIsIm5hbWVGbiIsImEiLCJmaWx0ZXIiLCJ0aWR5IiwiX3htbG5zIiwiT2JqZWN0Iiwia2V5cyIsImF0dHJpYnMiLCJrIiwic3RhcnRzV2l0aCIsInJlZHVjZSIsIm8iLCJ2Iiwic3BsaXQiLCJwb3AiLCJiIiwidW5kZWZpbmVkIiwic2V0IiwibmFtZSIsInRvSlMiLCJub2RlIiwicCIsImNoaWxkcmVuIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBRUEsa0JBQVFBLFNBQVIsQ0FBa0JDLEtBQWxCLEdBQXdCLFlBQWdCO0FBQUEsUUFBUEMsR0FBTyx1RUFBSCxFQUFHOztBQUNwQyxRQUFHLEtBQUtDLE1BQUwsSUFBYSxDQUFoQixFQUNJLE9BQU8sRUFBUDtBQUNKLFFBQU1DLElBQUUsS0FBS0MsV0FBYjtBQUhvQyxRQUk3QkMsS0FKNkIsR0FJNkJKLEdBSjdCLENBSTdCSSxLQUo2QjtBQUFBLHNCQUk2QkosR0FKN0IsQ0FJdEJLLE1BSnNCO0FBQUEsUUFJdEJBLE1BSnNCLCtCQUlmO0FBQUEsZUFBR0QsU0FBT0EsTUFBTUUsQ0FBTixDQUFQLElBQWlCQSxDQUFwQjtBQUFBLEtBSmU7QUFBQSxzQkFJNkJOLEdBSjdCLENBSU9PLE1BSlA7QUFBQSxRQUlPQSxNQUpQLCtCQUljLEdBSmQ7QUFBQSxvQkFJNkJQLEdBSjdCLENBSWtCUSxJQUpsQjtBQUFBLFFBSWtCQSxJQUpsQiw2QkFJdUI7QUFBQSxlQUFHRixDQUFIO0FBQUEsS0FKdkI7OztBQU1wQyxRQUFNRyxTQUFPLFNBQVBBLE1BQU87QUFBQSxlQUFTQyxPQUFPQyxJQUFQLENBQVlDLE9BQVosRUFDakJMLE1BRGlCLENBQ1Y7QUFBQSxtQkFBRyxDQUFDTSxFQUFFQyxVQUFGLENBQWEsT0FBYixDQUFKO0FBQUEsU0FEVSxFQUVqQkMsTUFGaUIsQ0FFVixVQUFDQyxDQUFELEVBQUdILENBQUgsRUFBTztBQUNYLGdCQUFNSSxJQUFFTCxRQUFRQyxDQUFSLENBQVI7QUFDQUEsZ0JBQUVBLEVBQUVLLEtBQUYsQ0FBUSxHQUFSLEVBQWFDLEdBQWIsRUFBRjtBQUNBLGdCQUFNQyxJQUFFcEIsSUFBSWEsQ0FBSixJQUFTYixJQUFJYSxDQUFKLEVBQU9JLENBQVAsQ0FBVCxHQUFxQkEsQ0FBN0I7QUFDQSxnQkFBR0csS0FBR0MsU0FBTixFQUFnQjtBQUNaTCxrQkFBRVgsT0FBT1EsQ0FBUCxDQUFGLElBQWFPLENBQWI7QUFDSDtBQUNELG1CQUFPSixDQUFQO0FBQ0gsU0FWaUIsRUFVaEIsRUFWZ0IsQ0FBVDtBQUFBLEtBQWI7O0FBWUgsUUFBTU0sTUFBSSxTQUFKQSxHQUFJLENBQUNoQixDQUFELEVBQUdVLENBQUgsRUFBTztBQUNWLFlBQU1ILElBQUVQLEVBQUVpQixJQUFGLENBQU9MLEtBQVAsQ0FBYSxHQUFiLEVBQWtCQyxHQUFsQixFQUFSO0FBQ0EsWUFBTUMsSUFBRXBCLElBQUlhLENBQUosSUFBT2IsSUFBSWEsQ0FBSixFQUFPUCxDQUFQLENBQVAsR0FBaUJrQixLQUFLbEIsQ0FBTCxDQUF6QjtBQUNBLFlBQUdjLEtBQUdDLFNBQU4sRUFBZ0I7QUFDWkwsY0FBRVgsT0FBT1EsQ0FBUCxFQUFTUCxDQUFULEVBQVdVLENBQVgsQ0FBRixJQUFpQmhCLGNBQVlhLENBQVosSUFBbUJiLGNBQVlhLENBQVosRUFBaUJPLENBQWpCLENBQW5CLEdBQXlDQSxDQUExRDtBQUNIO0FBQ0QsZUFBT0osQ0FBUDtBQUNILEtBUEo7O0FBU0csUUFBTVEsT0FBSyxTQUFMQSxJQUFLLENBQUNDLElBQUQsRUFBTUMsQ0FBTixFQUFVO0FBQUEsWUFDWEMsUUFEVyxHQUNPRixJQURQLENBQ1hFLFFBRFc7QUFBQSxZQUNGZixPQURFLEdBQ09hLElBRFAsQ0FDRmIsT0FERTs7QUFFakIsZUFBT2UsU0FDRnBCLE1BREUsQ0FDSztBQUFBLG1CQUFHRCxFQUFFaUIsSUFBRixJQUFVckIsRUFBRUksQ0FBRixFQUFLc0IsRUFBTCxDQUFRckIsTUFBUixDQUFiO0FBQUEsU0FETCxFQUVGUSxNQUZFLENBRUssVUFBQ0MsQ0FBRCxFQUFHVixDQUFIO0FBQUEsbUJBQU9nQixJQUFJaEIsQ0FBSixFQUFNVSxDQUFOLENBQVA7QUFBQSxTQUZMLGVBRXlCUCxPQUFPRyxPQUFQLENBRnpCLEVBQVA7QUFHSCxLQUxEOztBQU9BLFFBQU1iLFFBQU15QixLQUFLLEtBQUssQ0FBTCxDQUFMLENBQVo7O0FBRUEsV0FBT2hCLE9BQU9BLEtBQUtULEtBQUwsQ0FBUCxHQUFxQkEsS0FBNUI7QUFDSCxDQXJDRCIsImZpbGUiOiIkcHJvcHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlZXJpbyBmcm9tIFwiY2hlZXJpb1wiXG5cbmNoZWVyaW8ucHJvdG90eXBlLnByb3BzPWZ1bmN0aW9uKG9wdD17fSl7XG4gICAgaWYodGhpcy5sZW5ndGg9PTApXG4gICAgICAgIHJldHVybiB7fVxuICAgIGNvbnN0ICQ9dGhpcy5jb25zdHJ1Y3RvclxuICAgIGNvbnN0IHtuYW1lcywgbmFtZUZuPWE9Pm5hbWVzJiZuYW1lc1thXXx8YSxmaWx0ZXI9JyonLHRpZHk9YT0+YX09b3B0XG5cbiAgICBjb25zdCBfeG1sbnM9YXR0cmlicz0+T2JqZWN0LmtleXMoYXR0cmlicylcbiAgICAgICAgLmZpbHRlcihrPT4hay5zdGFydHNXaXRoKFwieG1sbnNcIikpXG4gICAgICAgIC5yZWR1Y2UoKG8sayk9PntcbiAgICAgICAgICAgIGNvbnN0IHY9YXR0cmlic1trXVxuICAgICAgICAgICAgaz1rLnNwbGl0KFwiOlwiKS5wb3AoKVxuICAgICAgICAgICAgY29uc3QgYj1vcHRba10gPyBvcHRba10odikgOiB2XG4gICAgICAgICAgICBpZihiIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgIG9bbmFtZUZuKGspXT1iXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gb1xuICAgICAgICB9LHt9KVxuXG5cdGNvbnN0IHNldD0oYSxvKT0+e1xuICAgICAgICBjb25zdCBrPWEubmFtZS5zcGxpdChcIjpcIikucG9wKClcbiAgICAgICAgY29uc3QgYj1vcHRba10/b3B0W2tdKGEpOnRvSlMoYSlcbiAgICAgICAgaWYoYiE9dW5kZWZpbmVkKXtcbiAgICAgICAgICAgIG9bbmFtZUZuKGssYSxvKV09b3B0W2B0aWR5XyR7a31gXSA/IG9wdFtgdGlkeV8ke2t9YF0oYikgOiBiXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9cbiAgICB9XG5cbiAgICBjb25zdCB0b0pTPShub2RlLHApPT57XG4gICAgICAgIGNvbnN0e2NoaWxkcmVuLGF0dHJpYnN9PW5vZGVcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEubmFtZSAmJiAkKGEpLmlzKGZpbHRlcikpXG4gICAgICAgICAgICAucmVkdWNlKChvLGEpPT5zZXQoYSxvKSx7Li4uX3htbG5zKGF0dHJpYnMpfSlcbiAgICB9XG5cbiAgICBjb25zdCBwcm9wcz10b0pTKHRoaXNbMF0pXG5cbiAgICByZXR1cm4gdGlkeSA/IHRpZHkocHJvcHMpIDogcHJvcHNcbn1cbiJdfQ==