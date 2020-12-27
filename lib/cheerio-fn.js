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

_cheerio2.default.prototype.forwardUntil = function (selector, filter) {
    var Empty = this.constructor.root().not(function (a) {
        return true;
    });
    var $ = function $(n) {
        return Empty.not(function (a) {
            return true;
        }).add(n);
    };
    var until = Empty,
        filtered = Empty;

    var next = this.get(0);
    var parentNext = function parentNext(node) {
        return node && node.parent && (node.parent.next || parentNext(node.parent));
    };
    var getNext = function getNext(node) {
        return node && (node.children && node.children[0] || node.next || parentNext(node));
    };
    while (next && (next = getNext(next))) {
        var $n = $(next);
        if ($n.is(selector)) {
            until = until.add(next);
            break;
        } else if (filter && $n.is(filter)) {
            filtered = filtered.add(next);
        }
    }
    return filter ? filtered : until;
};
_cheerio2.default.prototype.backwardUntil = function (selector, filter) {
    var Empty = this.constructor.root().not(function (a) {
        return true;
    });
    var $ = function $(n) {
        return Empty.not(function (a) {
            return true;
        }).add(n);
    };
    var until = Empty,
        filtered = Empty;

    var prev = this.get(0);
    var parentPrev = function parentPrev(node) {
        return node && node.parent && (node.parent.prev || parentPrev(node.parent));
    };
    var getPrev = function getPrev(node) {
        return node && (node.children && node.children[node.children.length - 1] || node.prev || parentPrev(node));
    };
    while (prev && (prev = getPrev(prev))) {
        var $n = $(prev);
        if ($n.is(selector)) {
            until = until.add(prev);
            break;
        } else if (filter && $n.is(filter)) {
            filtered = filtered.add(next);
        }
    }
    return filter ? filtered : until;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGVlcmlvLWZuLmpzIl0sIm5hbWVzIjpbInByb3RvdHlwZSIsInByb3BzIiwib3B0IiwibGVuZ3RoIiwiJCIsImNvbnN0cnVjdG9yIiwibmFtZXMiLCJuYW1lRm4iLCJhIiwiZmlsdGVyIiwidGlkeSIsIl94bWxucyIsIk9iamVjdCIsImtleXMiLCJhdHRyaWJzIiwiayIsInN0YXJ0c1dpdGgiLCJyZWR1Y2UiLCJvIiwidiIsInNwbGl0IiwicG9wIiwiYiIsInVuZGVmaW5lZCIsInNldCIsIm5hbWUiLCJ0b0pTIiwibm9kZSIsInAiLCJjaGlsZHJlbiIsImlzIiwiZm9yd2FyZFVudGlsIiwic2VsZWN0b3IiLCJFbXB0eSIsInJvb3QiLCJub3QiLCJhZGQiLCJuIiwidW50aWwiLCJmaWx0ZXJlZCIsIm5leHQiLCJnZXQiLCJwYXJlbnROZXh0IiwicGFyZW50IiwiZ2V0TmV4dCIsIiRuIiwiYmFja3dhcmRVbnRpbCIsInByZXYiLCJwYXJlbnRQcmV2IiwiZ2V0UHJldiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7QUFFQSxrQkFBUUEsU0FBUixDQUFrQkMsS0FBbEIsR0FBd0IsWUFBZ0I7QUFBQSxRQUFQQyxHQUFPLHVFQUFILEVBQUc7O0FBQ3BDLFFBQUcsS0FBS0MsTUFBTCxJQUFhLENBQWhCLEVBQ0ksT0FBTyxFQUFQO0FBQ0osUUFBTUMsSUFBRSxLQUFLQyxXQUFiO0FBSG9DLFFBSTdCQyxLQUo2QixHQUk2QkosR0FKN0IsQ0FJN0JJLEtBSjZCO0FBQUEsc0JBSTZCSixHQUo3QixDQUl0QkssTUFKc0I7QUFBQSxRQUl0QkEsTUFKc0IsK0JBSWY7QUFBQSxlQUFHRCxTQUFPQSxNQUFNRSxDQUFOLENBQVAsSUFBaUJBLENBQXBCO0FBQUEsS0FKZTtBQUFBLHNCQUk2Qk4sR0FKN0IsQ0FJT08sTUFKUDtBQUFBLFFBSU9BLE1BSlAsK0JBSWMsR0FKZDtBQUFBLG9CQUk2QlAsR0FKN0IsQ0FJa0JRLElBSmxCO0FBQUEsUUFJa0JBLElBSmxC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LFFBQUljLE9BQUssS0FBS04sR0FBTCxDQUFTLENBQVQsQ0FBVDtBQUNBLFFBQU1PLGFBQVcsU0FBWEEsVUFBVztBQUFBLGVBQU1yQixRQUFTQSxLQUFLZ0IsTUFBTCxLQUFnQmhCLEtBQUtnQixNQUFMLENBQVlJLElBQVosSUFBb0JDLFdBQVdyQixLQUFLZ0IsTUFBaEIsQ0FBcEMsQ0FBZjtBQUFBLEtBQWpCO0FBQ0EsUUFBTU0sVUFBUSxTQUFSQSxPQUFRO0FBQUEsZUFBTXRCLFNBQVVBLEtBQUtFLFFBQUwsSUFBZUYsS0FBS0UsUUFBTCxDQUFjRixLQUFLRSxRQUFMLENBQWMxQixNQUFkLEdBQXFCLENBQW5DLENBQWhCLElBQXdEd0IsS0FBS29CLElBQTdELElBQW1FQyxXQUFXckIsSUFBWCxDQUE1RSxDQUFOO0FBQUEsS0FBZDtBQUNBLFdBQU1vQixTQUFTQSxPQUFLRSxRQUFRRixJQUFSLENBQWQsQ0FBTixFQUFtQztBQUMvQixZQUFJRixLQUFHekMsRUFBRTJDLElBQUYsQ0FBUDtBQUNBLFlBQUdGLEdBQUdmLEVBQUgsQ0FBTUUsUUFBTixDQUFILEVBQW1CO0FBQ2ZNLG9CQUFNQSxNQUFNRixHQUFOLENBQVVXLElBQVYsQ0FBTjtBQUNBO0FBQ0gsU0FIRCxNQUdNLElBQUd0QyxVQUFVb0MsR0FBR2YsRUFBSCxDQUFNckIsTUFBTixDQUFiLEVBQTJCO0FBQzdCOEIsdUJBQVNBLFNBQVNILEdBQVQsQ0FBYUksSUFBYixDQUFUO0FBQ0g7QUFDSjtBQUNELFdBQU8vQixTQUFTOEIsUUFBVCxHQUFvQkQsS0FBM0I7QUFDSCxDQWxCRCIsImZpbGUiOiJjaGVlcmlvLWZuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNoZWVyaW8gZnJvbSBcImNoZWVyaW9cIlxuXG5jaGVlcmlvLnByb3RvdHlwZS5wcm9wcz1mdW5jdGlvbihvcHQ9e30pe1xuICAgIGlmKHRoaXMubGVuZ3RoPT0wKVxuICAgICAgICByZXR1cm4ge31cbiAgICBjb25zdCAkPXRoaXMuY29uc3RydWN0b3JcbiAgICBjb25zdCB7bmFtZXMsIG5hbWVGbj1hPT5uYW1lcyYmbmFtZXNbYV18fGEsZmlsdGVyPScqJyx0aWR5PWE9PmF9PW9wdFxuXG4gICAgY29uc3QgX3htbG5zPWF0dHJpYnM9Pk9iamVjdC5rZXlzKGF0dHJpYnMpXG4gICAgICAgIC5maWx0ZXIoaz0+IWsuc3RhcnRzV2l0aChcInhtbG5zXCIpKVxuICAgICAgICAucmVkdWNlKChvLGspPT57XG4gICAgICAgICAgICBjb25zdCB2PWF0dHJpYnNba11cbiAgICAgICAgICAgIGs9ay5zcGxpdChcIjpcIikucG9wKClcbiAgICAgICAgICAgIGNvbnN0IGI9b3B0W2tdID8gb3B0W2tdKHYpIDogdlxuICAgICAgICAgICAgaWYoYiE9dW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICBvW25hbWVGbihrKV09YlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG9cbiAgICAgICAgfSx7fSlcblxuXHRjb25zdCBzZXQ9KGEsbyk9PntcbiAgICAgICAgY29uc3Qgaz1hLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG4gICAgICAgIGNvbnN0IGI9b3B0W2tdP29wdFtrXShhKTp0b0pTKGEpXG4gICAgICAgIGlmKGIhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICBvW25hbWVGbihrLGEsbyldPW9wdFtgdGlkeV8ke2t9YF0gPyBvcHRbYHRpZHlfJHtrfWBdKGIpIDogYlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvXG4gICAgfVxuXG4gICAgY29uc3QgdG9KUz0obm9kZSxwKT0+e1xuICAgICAgICBjb25zdHtjaGlsZHJlbixhdHRyaWJzfT1ub2RlXG4gICAgICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgICAgICAgLmZpbHRlcihhPT5hLm5hbWUgJiYgJChhKS5pcyhmaWx0ZXIpKVxuICAgICAgICAgICAgLnJlZHVjZSgobyxhKT0+c2V0KGEsbyksey4uLl94bWxucyhhdHRyaWJzKX0pXG4gICAgfVxuXG4gICAgY29uc3QgcHJvcHM9dG9KUyh0aGlzWzBdKVxuXG4gICAgcmV0dXJuIHRpZHkgPyB0aWR5KHByb3BzKSA6IHByb3BzXG59XG5cbmNoZWVyaW8ucHJvdG90eXBlLmZvcndhcmRVbnRpbD1mdW5jdGlvbihzZWxlY3RvcixmaWx0ZXIpe1xuICAgIGNvbnN0IEVtcHR5PXRoaXMuY29uc3RydWN0b3Iucm9vdCgpLm5vdChhPT50cnVlKVxuICAgIGNvbnN0ICQ9bj0+RW1wdHkubm90KGE9PnRydWUpLmFkZChuKVxuICAgIGxldCB1bnRpbD1FbXB0eSwgZmlsdGVyZWQ9RW1wdHlcblxuICAgIGxldCBuZXh0PXRoaXMuZ2V0KDApXG4gICAgY29uc3QgcGFyZW50TmV4dD1ub2RlPT5ub2RlJiYobm9kZS5wYXJlbnQgJiYgKG5vZGUucGFyZW50Lm5leHQgfHwgcGFyZW50TmV4dChub2RlLnBhcmVudCkpKVxuICAgIGNvbnN0IGdldE5leHQ9bm9kZT0+bm9kZSAmJiAoKG5vZGUuY2hpbGRyZW4mJm5vZGUuY2hpbGRyZW5bMF0pfHxub2RlLm5leHR8fHBhcmVudE5leHQobm9kZSkpXG4gICAgd2hpbGUobmV4dCAmJiAobmV4dD1nZXROZXh0KG5leHQpKSl7XG4gICAgICAgIGxldCAkbj0kKG5leHQpXG4gICAgICAgIGlmKCRuLmlzKHNlbGVjdG9yKSl7XG4gICAgICAgICAgICB1bnRpbD11bnRpbC5hZGQobmV4dClcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1lbHNlIGlmKGZpbHRlciAmJiAkbi5pcyhmaWx0ZXIpKXtcbiAgICAgICAgICAgIGZpbHRlcmVkPWZpbHRlcmVkLmFkZChuZXh0KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXIgPyBmaWx0ZXJlZCA6IHVudGlsXG59XG5jaGVlcmlvLnByb3RvdHlwZS5iYWNrd2FyZFVudGlsPWZ1bmN0aW9uKHNlbGVjdG9yLGZpbHRlcil7XG4gICAgY29uc3QgRW1wdHk9dGhpcy5jb25zdHJ1Y3Rvci5yb290KCkubm90KGE9PnRydWUpXG4gICAgY29uc3QgJD1uPT5FbXB0eS5ub3QoYT0+dHJ1ZSkuYWRkKG4pXG4gICAgbGV0IHVudGlsPUVtcHR5LCBmaWx0ZXJlZD1FbXB0eVxuXG4gICAgbGV0IHByZXY9dGhpcy5nZXQoMClcbiAgICBjb25zdCBwYXJlbnRQcmV2PW5vZGU9Pm5vZGUgJiYgKG5vZGUucGFyZW50ICYmIChub2RlLnBhcmVudC5wcmV2IHx8IHBhcmVudFByZXYobm9kZS5wYXJlbnQpKSlcbiAgICBjb25zdCBnZXRQcmV2PW5vZGU9Pm5vZGUgJiYgKChub2RlLmNoaWxkcmVuJiZub2RlLmNoaWxkcmVuW25vZGUuY2hpbGRyZW4ubGVuZ3RoLTFdKXx8bm9kZS5wcmV2fHxwYXJlbnRQcmV2KG5vZGUpKVxuICAgIHdoaWxlKHByZXYgJiYgKHByZXY9Z2V0UHJldihwcmV2KSkpe1xuICAgICAgICBsZXQgJG49JChwcmV2KVxuICAgICAgICBpZigkbi5pcyhzZWxlY3Rvcikpe1xuICAgICAgICAgICAgdW50aWw9dW50aWwuYWRkKHByZXYpXG4gICAgICAgICAgICBicmVha1xuICAgICAgICB9ZWxzZSBpZihmaWx0ZXIgJiYgJG4uaXMoZmlsdGVyKSl7XG4gICAgICAgICAgICBmaWx0ZXJlZD1maWx0ZXJlZC5hZGQobmV4dClcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmlsdGVyID8gZmlsdGVyZWQgOiB1bnRpbFxufVxuIl19