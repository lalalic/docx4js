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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy8kcHJvcHMuanMiXSwibmFtZXMiOlsicHJvdG90eXBlIiwicHJvcHMiLCJvcHQiLCJsZW5ndGgiLCIkIiwiY29uc3RydWN0b3IiLCJuYW1lcyIsIm5hbWVGbiIsImEiLCJmaWx0ZXIiLCJ0aWR5IiwiX3htbG5zIiwiT2JqZWN0Iiwia2V5cyIsImF0dHJpYnMiLCJrIiwic3RhcnRzV2l0aCIsInJlZHVjZSIsIm8iLCJ2IiwiYiIsInVuZGVmaW5lZCIsInNldCIsIm5hbWUiLCJzcGxpdCIsInBvcCIsInRvSlMiLCJub2RlIiwicCIsImNoaWxkcmVuIiwiaXMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0FBRUEsa0JBQVFBLFNBQVIsQ0FBa0JDLEtBQWxCLEdBQXdCLFlBQWdCO0FBQUEsUUFBUEMsR0FBTyx1RUFBSCxFQUFHOztBQUNwQyxRQUFHLEtBQUtDLE1BQUwsSUFBYSxDQUFoQixFQUNJLE9BQU8sRUFBUDtBQUNKLFFBQU1DLElBQUUsS0FBS0MsV0FBYjtBQUhvQyxRQUk3QkMsS0FKNkIsR0FJNkJKLEdBSjdCLENBSTdCSSxLQUo2QjtBQUFBLHNCQUk2QkosR0FKN0IsQ0FJdEJLLE1BSnNCO0FBQUEsUUFJdEJBLE1BSnNCLCtCQUlmO0FBQUEsZUFBR0QsU0FBT0EsTUFBTUUsQ0FBTixDQUFQLElBQWlCQSxDQUFwQjtBQUFBLEtBSmU7QUFBQSxzQkFJNkJOLEdBSjdCLENBSU9PLE1BSlA7QUFBQSxRQUlPQSxNQUpQLCtCQUljLEdBSmQ7QUFBQSxvQkFJNkJQLEdBSjdCLENBSWtCUSxJQUpsQjtBQUFBLFFBSWtCQSxJQUpsQiw2QkFJdUI7QUFBQSxlQUFHRixDQUFIO0FBQUEsS0FKdkI7OztBQU1wQyxRQUFNRyxTQUFPLFNBQVBBLE1BQU87QUFBQSxlQUFTQyxPQUFPQyxJQUFQLENBQVlDLE9BQVosRUFDakJMLE1BRGlCLENBQ1Y7QUFBQSxtQkFBRyxDQUFDTSxFQUFFQyxVQUFGLENBQWEsT0FBYixDQUFKO0FBQUEsU0FEVSxFQUVqQkMsTUFGaUIsQ0FFVixVQUFDQyxDQUFELEVBQUdILENBQUgsRUFBTztBQUNYLGdCQUFNSSxJQUFFTCxRQUFRQyxDQUFSLENBQVI7QUFDQSxnQkFBTUssSUFBRWxCLElBQUlhLENBQUosSUFBU2IsSUFBSWEsQ0FBSixFQUFPSSxDQUFQLENBQVQsR0FBcUJBLENBQTdCO0FBQ0EsZ0JBQUdDLEtBQUdDLFNBQU4sRUFBZ0I7QUFDWkgsa0JBQUVYLE9BQU9RLENBQVAsQ0FBRixJQUFhSyxDQUFiO0FBQ0g7QUFDRCxtQkFBT0YsQ0FBUDtBQUNILFNBVGlCLEVBU2hCLEVBVGdCLENBQVQ7QUFBQSxLQUFiOztBQVdILFFBQU1JLE1BQUksU0FBSkEsR0FBSSxDQUFDZCxDQUFELEVBQUdVLENBQUgsRUFBTztBQUNWLFlBQU1ILElBQUVQLEVBQUVlLElBQUYsQ0FBT0MsS0FBUCxDQUFhLEdBQWIsRUFBa0JDLEdBQWxCLEVBQVI7QUFDQSxZQUFNTCxJQUFFbEIsSUFBSWEsQ0FBSixJQUFPYixJQUFJYSxDQUFKLEVBQU9QLENBQVAsQ0FBUCxHQUFpQmtCLEtBQUtsQixDQUFMLENBQXpCO0FBQ0EsWUFBR1ksS0FBR0MsU0FBTixFQUFnQjtBQUNaSCxjQUFFWCxPQUFPUSxDQUFQLEVBQVNQLENBQVQsRUFBV1UsQ0FBWCxDQUFGLElBQWlCaEIsY0FBWWEsQ0FBWixJQUFtQmIsY0FBWWEsQ0FBWixFQUFpQkssQ0FBakIsQ0FBbkIsR0FBeUNBLENBQTFEO0FBQ0g7QUFDRCxlQUFPRixDQUFQO0FBQ0gsS0FQSjs7QUFTRyxRQUFNUSxPQUFLLFNBQUxBLElBQUssQ0FBQ0MsSUFBRCxFQUFNQyxDQUFOLEVBQVU7QUFBQSxZQUNYQyxRQURXLEdBQ09GLElBRFAsQ0FDWEUsUUFEVztBQUFBLFlBQ0ZmLE9BREUsR0FDT2EsSUFEUCxDQUNGYixPQURFOztBQUVqQixlQUFPZSxTQUNGcEIsTUFERSxDQUNLO0FBQUEsbUJBQUdELEVBQUVlLElBQUYsSUFBVW5CLEVBQUVJLENBQUYsRUFBS3NCLEVBQUwsQ0FBUXJCLE1BQVIsQ0FBYjtBQUFBLFNBREwsRUFFRlEsTUFGRSxDQUVLLFVBQUNDLENBQUQsRUFBR1YsQ0FBSDtBQUFBLG1CQUFPYyxJQUFJZCxDQUFKLEVBQU1VLENBQU4sQ0FBUDtBQUFBLFNBRkwsZUFFeUJQLE9BQU9HLE9BQVAsQ0FGekIsRUFBUDtBQUdILEtBTEQ7O0FBT0EsUUFBTWIsUUFBTXlCLEtBQUssS0FBSyxDQUFMLENBQUwsQ0FBWjs7QUFFQSxXQUFPaEIsT0FBT0EsS0FBS1QsS0FBTCxDQUFQLEdBQXFCQSxLQUE1QjtBQUNILENBcENEIiwiZmlsZSI6IiRwcm9wcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGVlcmlvIGZyb20gXCJjaGVlcmlvXCJcblxuY2hlZXJpby5wcm90b3R5cGUucHJvcHM9ZnVuY3Rpb24ob3B0PXt9KXtcbiAgICBpZih0aGlzLmxlbmd0aD09MClcbiAgICAgICAgcmV0dXJuIHt9XG4gICAgY29uc3QgJD10aGlzLmNvbnN0cnVjdG9yXG4gICAgY29uc3Qge25hbWVzLCBuYW1lRm49YT0+bmFtZXMmJm5hbWVzW2FdfHxhLGZpbHRlcj0nKicsdGlkeT1hPT5hfT1vcHRcblxuICAgIGNvbnN0IF94bWxucz1hdHRyaWJzPT5PYmplY3Qua2V5cyhhdHRyaWJzKVxuICAgICAgICAuZmlsdGVyKGs9PiFrLnN0YXJ0c1dpdGgoXCJ4bWxuc1wiKSlcbiAgICAgICAgLnJlZHVjZSgobyxrKT0+e1xuICAgICAgICAgICAgY29uc3Qgdj1hdHRyaWJzW2tdXG4gICAgICAgICAgICBjb25zdCBiPW9wdFtrXSA/IG9wdFtrXSh2KSA6IHZcbiAgICAgICAgICAgIGlmKGIhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgb1tuYW1lRm4oayldPWJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvXG4gICAgICAgIH0se30pXG5cblx0Y29uc3Qgc2V0PShhLG8pPT57XG4gICAgICAgIGNvbnN0IGs9YS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKVxuICAgICAgICBjb25zdCBiPW9wdFtrXT9vcHRba10oYSk6dG9KUyhhKVxuICAgICAgICBpZihiIT11bmRlZmluZWQpe1xuICAgICAgICAgICAgb1tuYW1lRm4oayxhLG8pXT1vcHRbYHRpZHlfJHtrfWBdID8gb3B0W2B0aWR5XyR7a31gXShiKSA6IGJcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb1xuICAgIH1cblxuICAgIGNvbnN0IHRvSlM9KG5vZGUscCk9PntcbiAgICAgICAgY29uc3R7Y2hpbGRyZW4sYXR0cmlic309bm9kZVxuICAgICAgICByZXR1cm4gY2hpbGRyZW5cbiAgICAgICAgICAgIC5maWx0ZXIoYT0+YS5uYW1lICYmICQoYSkuaXMoZmlsdGVyKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoKG8sYSk9PnNldChhLG8pLHsuLi5feG1sbnMoYXR0cmlicyl9KVxuICAgIH1cblxuICAgIGNvbnN0IHByb3BzPXRvSlModGhpc1swXSlcblxuICAgIHJldHVybiB0aWR5ID8gdGlkeShwcm9wcykgOiBwcm9wc1xufVxuIl19