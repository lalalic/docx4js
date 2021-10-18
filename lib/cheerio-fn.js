"use strict";

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
        _opt$__filter = opt.__filter,
        __filter = _opt$__filter === undefined ? '*' : _opt$__filter,
        _opt$tidy = opt.tidy,
        tidy = _opt$tidy === undefined ? function (a) {
        return a;
    } : _opt$tidy;

    var propsAttribs = function propsAttribs(attribs) {
        return Object.keys(attribs).filter(function (k) {
            return !k.startsWith("xmlns");
        }).reduce(function (props, attribKey) {
            var value = attribs[attribKey];
            attribKey = attribKey.split(":").pop();
            var parsedValue = opt[attribKey] ? opt[attribKey](value) : value;
            if (parsedValue != undefined) {
                props[nameFn(attribKey)] = parsedValue;
            }
            return props;
        }, {});
    };

    var propsChild = function propsChild(node, parentProps, index) {
        var tagName = node.name.split(":").pop();
        var parsed = opt[tagName] ? opt[tagName](node) : toJS(node);
        if (parsed != undefined) {
            var key = Array.isArray(parentProps) ? index : nameFn(tagName, node, parentProps);
            parentProps[key == "[]" ? tagName : key] = opt["tidy_" + tagName] ? opt["tidy_" + tagName](parsed) : parsed;
        }
        return parentProps;
    };

    var toJS = function toJS(node, p) {
        var children = node.children,
            attribs = node.attribs,
            _node$name = node.name,
            name = _node$name === undefined ? "" : _node$name,
            _node$tagName = node.tagName,
            tagName = _node$tagName === undefined ? name.split(":").pop() : _node$tagName;

        return children.filter(function (a) {
            return a.name && $(a).is(__filter);
        }).reduce(function (parentProps, child, i) {
            return propsChild(child, parentProps, i);
        }, nameFn(tagName, node) === "[]" ? [] : propsAttribs(attribs));
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGVlcmlvLWZuLmpzIl0sIm5hbWVzIjpbImNoZWVyaW8iLCJwcm90b3R5cGUiLCJwcm9wcyIsIm9wdCIsImxlbmd0aCIsIiQiLCJjb25zdHJ1Y3RvciIsIm5hbWVzIiwibmFtZUZuIiwiYSIsIl9fZmlsdGVyIiwidGlkeSIsInByb3BzQXR0cmlicyIsIk9iamVjdCIsImtleXMiLCJhdHRyaWJzIiwiZmlsdGVyIiwiayIsInN0YXJ0c1dpdGgiLCJyZWR1Y2UiLCJhdHRyaWJLZXkiLCJ2YWx1ZSIsInNwbGl0IiwicG9wIiwicGFyc2VkVmFsdWUiLCJ1bmRlZmluZWQiLCJwcm9wc0NoaWxkIiwibm9kZSIsInBhcmVudFByb3BzIiwiaW5kZXgiLCJ0YWdOYW1lIiwibmFtZSIsInBhcnNlZCIsInRvSlMiLCJrZXkiLCJBcnJheSIsImlzQXJyYXkiLCJwIiwiY2hpbGRyZW4iLCJpcyIsImNoaWxkIiwiaSIsImZvcndhcmRVbnRpbCIsInNlbGVjdG9yIiwiRW1wdHkiLCJyb290Iiwibm90IiwiYWRkIiwibiIsInVudGlsIiwiZmlsdGVyZWQiLCJuZXh0IiwiZ2V0IiwicGFyZW50TmV4dCIsInBhcmVudCIsImdldE5leHQiLCIkbiIsImJhY2t3YXJkVW50aWwiLCJwcmV2IiwicGFyZW50UHJldiIsImdldFByZXYiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7OztBQUVBQSxrQkFBUUMsU0FBUixDQUFrQkMsS0FBbEIsR0FBd0IsWUFBZ0I7QUFBQSxRQUFQQyxHQUFPLHVFQUFILEVBQUc7O0FBQ3BDLFFBQUcsS0FBS0MsTUFBTCxJQUFhLENBQWhCLEVBQ0ksT0FBTyxFQUFQO0FBQ0osUUFBTUMsSUFBRSxLQUFLQyxXQUFiOztBQUhvQyxRQUk3QkMsS0FKNkIsR0FJK0JKLEdBSi9CLENBSTdCSSxLQUo2QjtBQUFBLHNCQUkrQkosR0FKL0IsQ0FJdEJLLE1BSnNCO0FBQUEsUUFJdEJBLE1BSnNCLCtCQUlmO0FBQUEsZUFBR0QsU0FBT0EsTUFBTUUsQ0FBTixD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QUFLRSxRQUFRRixJQUFSLENBQWQsQ0FBTixFQUFtQztBQUMvQixZQUFJRixLQUFHbkQsRUFBRXFELElBQUYsQ0FBUDtBQUNBLFlBQUdGLEdBQUdqQixFQUFILENBQU1JLFFBQU4sQ0FBSCxFQUFtQjtBQUNmTSxvQkFBTUEsTUFBTUYsR0FBTixDQUFVVyxJQUFWLENBQU47QUFDQTtBQUNILFNBSEQsTUFHTSxJQUFHMUMsVUFBVXdDLEdBQUdqQixFQUFILENBQU12QixNQUFOLENBQWIsRUFBMkI7QUFDN0JrQyx1QkFBU0EsU0FBU0gsR0FBVCxDQUFhSSxJQUFiLENBQVQ7QUFDSDtBQUNKO0FBQ0QsV0FBT25DLFNBQVNrQyxRQUFULEdBQW9CRCxLQUEzQjtBQUNILENBbEJEIiwiZmlsZSI6ImNoZWVyaW8tZm4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hlZXJpbyBmcm9tIFwiY2hlZXJpb1wiXG5cbmNoZWVyaW8ucHJvdG90eXBlLnByb3BzPWZ1bmN0aW9uKG9wdD17fSl7XG4gICAgaWYodGhpcy5sZW5ndGg9PTApXG4gICAgICAgIHJldHVybiB7fVxuICAgIGNvbnN0ICQ9dGhpcy5jb25zdHJ1Y3RvclxuICAgIGNvbnN0IHtuYW1lcywgbmFtZUZuPWE9Pm5hbWVzJiZuYW1lc1thXXx8YSxfX2ZpbHRlcj0nKicsdGlkeT1hPT5hfT1vcHRcblxuICAgIGNvbnN0IHByb3BzQXR0cmlicz1hdHRyaWJzPT5PYmplY3Qua2V5cyhhdHRyaWJzKVxuICAgICAgICAuZmlsdGVyKGs9PiFrLnN0YXJ0c1dpdGgoXCJ4bWxuc1wiKSlcbiAgICAgICAgLnJlZHVjZSgocHJvcHMsYXR0cmliS2V5KT0+e1xuICAgICAgICAgICAgY29uc3QgdmFsdWU9YXR0cmlic1thdHRyaWJLZXldXG4gICAgICAgICAgICBhdHRyaWJLZXk9YXR0cmliS2V5LnNwbGl0KFwiOlwiKS5wb3AoKVxuICAgICAgICAgICAgY29uc3QgcGFyc2VkVmFsdWU9b3B0W2F0dHJpYktleV0gPyBvcHRbYXR0cmliS2V5XSh2YWx1ZSkgOiB2YWx1ZVxuICAgICAgICAgICAgaWYocGFyc2VkVmFsdWUhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgcHJvcHNbbmFtZUZuKGF0dHJpYktleSldPXBhcnNlZFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgfSx7fSlcblxuXHRjb25zdCBwcm9wc0NoaWxkPShub2RlLHBhcmVudFByb3BzLGluZGV4KT0+e1xuICAgICAgICBjb25zdCB0YWdOYW1lPW5vZGUubmFtZS5zcGxpdChcIjpcIikucG9wKClcbiAgICAgICAgY29uc3QgcGFyc2VkPW9wdFt0YWdOYW1lXT9vcHRbdGFnTmFtZV0obm9kZSk6dG9KUyhub2RlKVxuICAgICAgICBpZihwYXJzZWQhPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjb25zdCBrZXk9IEFycmF5LmlzQXJyYXkocGFyZW50UHJvcHMpID8gaW5kZXggOiBuYW1lRm4odGFnTmFtZSxub2RlLHBhcmVudFByb3BzKVxuICAgICAgICAgICAgcGFyZW50UHJvcHNba2V5PT1cIltdXCI/IHRhZ05hbWUgOiBrZXldPW9wdFtgdGlkeV8ke3RhZ05hbWV9YF0gPyBvcHRbYHRpZHlfJHt0YWdOYW1lfWBdKHBhcnNlZCkgOiBwYXJzZWRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyZW50UHJvcHNcbiAgICB9XG5cbiAgICBjb25zdCB0b0pTPShub2RlLHApPT57XG4gICAgICAgIGNvbnN0e2NoaWxkcmVuLGF0dHJpYnMsbmFtZT1cIlwiLHRhZ05hbWU9bmFtZS5zcGxpdChcIjpcIikucG9wKCl9PW5vZGVcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuXG4gICAgICAgICAgICAuZmlsdGVyKGE9PmEubmFtZSAmJiAkKGEpLmlzKF9fZmlsdGVyKSlcbiAgICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgKHBhcmVudFByb3BzLGNoaWxkLGkpPT5wcm9wc0NoaWxkKGNoaWxkLHBhcmVudFByb3BzLGkpLFxuICAgICAgICAgICAgICAgIG5hbWVGbih0YWdOYW1lLG5vZGUpPT09XCJbXVwiID8gW10gOiBwcm9wc0F0dHJpYnMoYXR0cmlicylcbiAgICAgICAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBwcm9wcz10b0pTKHRoaXNbMF0pXG5cbiAgICByZXR1cm4gdGlkeSA/IHRpZHkocHJvcHMpIDogcHJvcHNcbn1cblxuY2hlZXJpby5wcm90b3R5cGUuZm9yd2FyZFVudGlsPWZ1bmN0aW9uKHNlbGVjdG9yLGZpbHRlcil7XG4gICAgY29uc3QgRW1wdHk9dGhpcy5jb25zdHJ1Y3Rvci5yb290KCkubm90KGE9PnRydWUpXG4gICAgY29uc3QgJD1uPT5FbXB0eS5ub3QoYT0+dHJ1ZSkuYWRkKG4pXG4gICAgbGV0IHVudGlsPUVtcHR5LCBmaWx0ZXJlZD1FbXB0eVxuXG4gICAgbGV0IG5leHQ9dGhpcy5nZXQoMClcbiAgICBjb25zdCBwYXJlbnROZXh0PW5vZGU9Pm5vZGUmJihub2RlLnBhcmVudCAmJiAobm9kZS5wYXJlbnQubmV4dCB8fCBwYXJlbnROZXh0KG5vZGUucGFyZW50KSkpXG4gICAgY29uc3QgZ2V0TmV4dD1ub2RlPT5ub2RlICYmICgobm9kZS5jaGlsZHJlbiYmbm9kZS5jaGlsZHJlblswXSl8fG5vZGUubmV4dHx8cGFyZW50TmV4dChub2RlKSlcbiAgICB3aGlsZShuZXh0ICYmIChuZXh0PWdldE5leHQobmV4dCkpKXtcbiAgICAgICAgbGV0ICRuPSQobmV4dClcbiAgICAgICAgaWYoJG4uaXMoc2VsZWN0b3IpKXtcbiAgICAgICAgICAgIHVudGlsPXVudGlsLmFkZChuZXh0KVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgfWVsc2UgaWYoZmlsdGVyICYmICRuLmlzKGZpbHRlcikpe1xuICAgICAgICAgICAgZmlsdGVyZWQ9ZmlsdGVyZWQuYWRkKG5leHQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpbHRlciA/IGZpbHRlcmVkIDogdW50aWxcbn1cbmNoZWVyaW8ucHJvdG90eXBlLmJhY2t3YXJkVW50aWw9ZnVuY3Rpb24oc2VsZWN0b3IsZmlsdGVyKXtcbiAgICBjb25zdCBFbXB0eT10aGlzLmNvbnN0cnVjdG9yLnJvb3QoKS5ub3QoYT0+dHJ1ZSlcbiAgICBjb25zdCAkPW49PkVtcHR5Lm5vdChhPT50cnVlKS5hZGQobilcbiAgICBsZXQgdW50aWw9RW1wdHksIGZpbHRlcmVkPUVtcHR5XG5cbiAgICBsZXQgcHJldj10aGlzLmdldCgwKVxuICAgIGNvbnN0IHBhcmVudFByZXY9bm9kZT0+bm9kZSAmJiAobm9kZS5wYXJlbnQgJiYgKG5vZGUucGFyZW50LnByZXYgfHwgcGFyZW50UHJldihub2RlLnBhcmVudCkpKVxuICAgIGNvbnN0IGdldFByZXY9bm9kZT0+bm9kZSAmJiAoKG5vZGUuY2hpbGRyZW4mJm5vZGUuY2hpbGRyZW5bbm9kZS5jaGlsZHJlbi5sZW5ndGgtMV0pfHxub2RlLnByZXZ8fHBhcmVudFByZXYobm9kZSkpXG4gICAgd2hpbGUocHJldiAmJiAocHJldj1nZXRQcmV2KHByZXYpKSl7XG4gICAgICAgIGxldCAkbj0kKHByZXYpXG4gICAgICAgIGlmKCRuLmlzKHNlbGVjdG9yKSl7XG4gICAgICAgICAgICB1bnRpbD11bnRpbC5hZGQocHJldilcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1lbHNlIGlmKGZpbHRlciAmJiAkbi5pcyhmaWx0ZXIpKXtcbiAgICAgICAgICAgIGZpbHRlcmVkPWZpbHRlcmVkLmFkZChuZXh0KVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWx0ZXIgPyBmaWx0ZXJlZCA6IHVudGlsXG59XG4iXX0=