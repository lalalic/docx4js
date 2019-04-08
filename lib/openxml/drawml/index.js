'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = {
    pic: function pic(wXml, officeDocument) {
        var blip = officeDocument.content(wXml).find("a\\:blip");
        var rid = blip.attr('r:embed') || blip.attr('r:link');
        return _extends({ type: "picture" }, officeDocument.getRel(rid));
    },
    sp: function sp(wXml, officeDocument) {
        return { type: "shape", children: officeDocument.content(wXml).find(">wps\\:txbx>w\\:txbxContent").children().toArray() };
    },
    nvSpPr: function nvSpPr(wXml, officeDocument) {
        var props = wXml.children.filter(function (a) {
            return a.name;
        }).find(function (a) {
            return a.name.endsWith(":cNvPr");
        }).attribs;
        var sp = wXml.children.filter(function (a) {
            return a.name;
        }).find(function (a) {
            return a.name.endsWith(":cNvSpPr");
        });
        var nvPr = wXml.children.filter(function (a) {
            return a.name;
        }).find(function (a) {
            return a.name.endsWith(":nvPr");
        });
        var locks = undefined,
            nv = undefined;
        if (sp) {
            locks = sp.children.filter(function (a) {
                return a.name;
            }).find(function (a) {
                return a.name.endsWith(":spLocks");
            });
            if (locks) {
                locks = _extends({}, locks.attribs);
            }
        }

        if (nvPr) {
            nv = this.nvPr(nvPr, officeDocument);
        }
        return _extends({}, props, { locks: locks }, nv, { type: "nonVisualProps" });
    },
    nvPicPr: function nvPicPr(wXml, od) {
        return this.nvSpPr.apply(this, arguments);
    },
    nvGrpSpPr: function nvGrpSpPr() {
        return this.nvSpPr.apply(this, arguments);
    },
    grpSpPr: function grpSpPr() {
        return this.spPr.apply(this, arguments);
    },
    nvPr: function nvPr(wXml, od) {
        var ph = wXml.children.filter(function (a) {
            return a.name;
        }).find(function (a) {
            return a.name.endsWith(":ph");
        });
        if (ph) {
            return { placeholder: this.ph(ph, od) };
        }
        return {};
    },
    ph: function ph(_ref) {
        var attribs = _ref.attribs;

        return _extends({}, attribs);
    },
    spPr: function spPr(wXml, od) {
        var _this = this;

        var props = wXml.children.filter(function (a) {
            return a.name;
        }).reduce(function (props, a) {
            var _a$name$split$pop = _this[a.name.split(":").pop()](a, od),
                type = _a$name$split$pop.type,
                attribs = _objectWithoutProperties(_a$name$split$pop, ['type']);

            props[type] = attribs;
            return props;
        }, {});
        return _extends({ type: "shapeProps" }, props, wXml.attribs);
    },
    xfrm: function xfrm(wXml, officeDocument) {
        return _extends({ type: "transform", x: 0, y: 0, width: 0, height: 0 }, wXml.attribs);
    },
    prstGeom: function prstGeom(wXml, officeDocument) {
        return { type: "geometry" };
    },
    custGeom: function custGeom(wXml, officeDocument) {
        return { type: "geometry" };
    },
    solidFill: function solidFill(wXml, od) {
        return { type: "fill" };
    },
    blipFill: function blipFill(wXml, od) {
        return { type: "fill" };
    },
    gradFill: function gradFill(wXml, od) {
        return { type: "fill" };
    },
    pattFill: function pattFill(wXml, od) {
        return { type: "fill" };
    },
    grpFill: function grpFill(wXml, od) {
        return { type: "fill" };
    },
    effectLst: function effectLst(wXml, od) {
        return { type: "effects" };
    },
    ln: function ln(wXml, od) {
        return { type: "outline" };
    },
    sp3d: function sp3d(wXml, od) {
        return { type: "shape3d" };
    },
    scene3d: function scene3d(wXml, od) {
        return { type: "scene3d" };
    },
    lstStyle: function lstStyle(wXml, od) {
        var _this2 = this;

        var isList = /\:lvl\dpPr$/;
        return wXml.children.filter(function (a) {
            return a.name && isList.test(a.name);
        }).reduce(function (nums, a) {
            nums[a.name.substr(-4, 1)] = _this2.lvl1pPr(a, od);
            return nums;
        }, {});
    },
    lvl1pPr: function lvl1pPr(_ref2, od) {
        var _this3 = this;

        var children = _ref2.children,
            attribs = _ref2.attribs;

        return children.filter(function (a) {
            return a.name;
        }).reduce(function (props, a) {
            var k = a.name.split(":").pop();
            switch (k) {
                case "buFont":
                    props.fonts = _extends({}, a.attribs);
                    break;
                case "buChar":
                    props.char = a.attribs.char;
                    break;
                case "buClr":
                    props.color = _this3.color(a, od);
                    break;
                case "buAutoNum":
                    props.autoNum = _extends({}, a.attribs);
            }
            return props;
        }, _extends({}, attribs));
    },
    srgbClr: function srgbClr(_ref3, od) {
        var val = _ref3.attribs.val;

        return od.doc.asColor(val);
    },
    pPr: function pPr(_ref4, od) {
        var _this4 = this;

        var children = _ref4.children,
            _ref4$attribs = _ref4.attribs,
            marL = _ref4$attribs.marL,
            marR = _ref4$attribs.marR,
            indent = _ref4$attribs.indent;

        var props = {};
        if (indent != undefined) props.indent = od.doc.dxa2Px(indent);
        if (marL != undefined) props.marginLeft = od.doc.toPx(parseInt(marL) * 2 / 457200 + 'in');
        if (marR != undefined) props.marginRight = od.doc.toPx(parseInt(marR) * 2 / 457200 + 'in');

        return children.filter(function (a) {
            return a.name;
        }).reduce(function (props, a) {
            switch (a.name.split(":").pop()) {
                case "lnSpc":
                    props.lineHeight = _this4.lnSpc(a, od);
                    break;
                case "spcAft":
                    props.after = _this4.lnSpc(a, od);
                    break;
                case "spcBef":
                    props.before = _this4.lnSpc(a, od);
                    break;
            }
            return props;
        }, props);
    },
    lnSpc: function lnSpc(_ref5, od) {
        var children = _ref5.children;

        return od.doc.pt2Px(parseInt(children.find(function (a) {
            return a.name;
        }).attribs.val) / 100);
    },
    rPr: function rPr(_ref6, od) {
        var _this5 = this;

        var children = _ref6.children,
            _ref6$attribs = _ref6.attribs,
            sz = _ref6$attribs.sz,
            attribs = _objectWithoutProperties(_ref6$attribs, ['sz']);

        var props = _extends({}, attribs);
        if (sz != undefined) {
            props.size = parseInt(sz) / 100;
        }
        return children.filter(function (a) {
            return a.name;
        }).reduce(function (props, a) {
            var _a$name$split$pop2 = _this5[a.name.split(":").pop()](a, od),
                type = _a$name$split$pop2.type,
                attr = _objectWithoutProperties(_a$name$split$pop2, ['type']);

            return Object.assign(props, type ? _defineProperty({}, type, attr) : attr);
        }, props);
    },
    defRPr: function defRPr() {
        return this.rPr.apply(this, arguments);
    },
    defPPr: function defPPr() {
        return this.pPr.apply(this, arguments);
    },
    latin: function latin(_ref8) {
        var attribs = _ref8.attribs;

        return _extends({ type: "fonts" }, attribs);
    },
    hlinkClick: function hlinkClick(n, od) {
        return { href: "" };
    },
    uFill: function uFill(_ref9, od) {
        var children = _ref9.children;

        return { underlineFill: this.color.apply(this, arguments) };
    },
    highlight: function highlight() {
        return { highlight: this.color.apply(this, arguments) };
    },
    color: function color(_ref10, od) {
        var _this6 = this;

        var children = _ref10.children;

        return children.filter(function (a) {
            return a.name;
        }).reduce(function (v, a) {
            return _this6[a.name.split(":").pop()](a, od);
        }, null);
    }
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RyYXdtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJwaWMiLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJibGlwIiwiY29udGVudCIsImZpbmQiLCJyaWQiLCJhdHRyIiwidHlwZSIsImdldFJlbCIsInNwIiwiY2hpbGRyZW4iLCJ0b0FycmF5IiwibnZTcFByIiwicHJvcHMiLCJmaWx0ZXIiLCJhIiwibmFtZSIsImVuZHNXaXRoIiwiYXR0cmlicyIsIm52UHIiLCJsb2NrcyIsInVuZGVmaW5lZCIsIm52IiwibnZQaWNQciIsIm9kIiwiYXJndW1lbnRzIiwibnZHcnBTcFByIiwiZ3JwU3BQciIsInNwUHIiLCJwaCIsInBsYWNlaG9sZGVyIiwicmVkdWNlIiwic3BsaXQiLCJwb3AiLCJ4ZnJtIiwieCIsInkiLCJ3aWR0aCIsImhlaWdodCIsInByc3RHZW9tIiwiY3VzdEdlb20iLCJzb2xpZEZpbGwiLCJibGlwRmlsbCIsImdyYWRGaWxsIiwicGF0dEZpbGwiLCJncnBGaWxsIiwiZWZmZWN0THN0IiwibG4iLCJzcDNkIiwic2NlbmUzZCIsImxzdFN0eWxlIiwiaXNMaXN0IiwidGVzdCIsIm51bXMiLCJzdWJzdHIiLCJsdmwxcFByIiwiayIsImZvbnRzIiwiY2hhciIsImNvbG9yIiwiYXV0b051bSIsInNyZ2JDbHIiLCJ2YWwiLCJkb2MiLCJhc0NvbG9yIiwicFByIiwibWFyTCIsIm1hclIiLCJpbmRlbnQiLCJkeGEyUHgiLCJtYXJnaW5MZWZ0IiwidG9QeCIsInBhcnNlSW50IiwibWFyZ2luUmlnaHQiLCJsaW5lSGVpZ2h0IiwibG5TcGMiLCJhZnRlciIsImJlZm9yZSIsInB0MlB4IiwiclByIiwic3oiLCJzaXplIiwiT2JqZWN0IiwiYXNzaWduIiwiZGVmUlByIiwiZGVmUFByIiwibGF0aW4iLCJobGlua0NsaWNrIiwibiIsImhyZWYiLCJ1RmlsbCIsInVuZGVybGluZUZpbGwiLCJoaWdobGlnaHQiLCJ2Il0sIm1hcHBpbmdz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ZUFBTyxFQUFDaUYsZUFBZSxLQUFLaEMsS0FBTCxhQUFjbEMsU0FBZCxDQUFoQixFQUFQO0FBQ0gsS0F4TVU7QUEwTVhtRSxhQTFNVyx1QkEwTUE7QUFDUCxlQUFPLEVBQUNBLFdBQVUsS0FBS2pDLEtBQUwsYUFBY2xDLFNBQWQsQ0FBWCxFQUFQO0FBQ0gsS0E1TVU7QUE4TVhrQyxTQTlNVyx5QkE4TU1uQyxFQTlNTixFQThNUztBQUFBOztBQUFBLFlBQWJkLFFBQWEsVUFBYkEsUUFBYTs7QUFDaEIsZUFBT0EsU0FBU0ksTUFBVCxDQUFnQjtBQUFBLG1CQUFHQyxFQUFFQyxJQUFMO0FBQUEsU0FBaEIsRUFBMkJlLE1BQTNCLENBQWtDLFVBQUM4RCxDQUFELEVBQUc5RSxDQUFIO0FBQUEsbUJBQU8sT0FBS0EsRUFBRUMsSUFBRixDQUFPZ0IsS0FBUCxDQUFhLEdBQWIsRUFBa0JDLEdBQWxCLEVBQUwsRUFBOEJsQixDQUE5QixFQUFnQ1MsRUFBaEMsQ0FBUDtBQUFBLFNBQWxDLEVBQTZFLElBQTdFLENBQVA7QUFDSDtBQWhOVSxDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICAgIHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgIGxldCBibGlwPW9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCkuZmluZChcImFcXFxcOmJsaXBcIilcbiAgICAgICAgbGV0IHJpZD1ibGlwLmF0dHIoJ3I6ZW1iZWQnKXx8YmxpcC5hdHRyKCdyOmxpbmsnKVxuICAgICAgICByZXR1cm4ge3R5cGU6XCJwaWN0dXJlXCIsLi4ub2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHJpZCl9XG4gICAgfSxcblxuICAgIHNwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgcmV0dXJuIHt0eXBlOlwic2hhcGVcIiwgY2hpbGRyZW46b2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwiPndwc1xcXFw6dHhieD53XFxcXDp0eGJ4Q29udGVudFwiKS5jaGlsZHJlbigpLnRvQXJyYXkoKX1cbiAgICB9LFxuXG5cdG52U3BQcih3WG1sLG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgY29uc3QgcHJvcHM9d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lKS5maW5kKGE9PmEubmFtZS5lbmRzV2l0aChcIjpjTnZQclwiKSkuYXR0cmlic1xuXHRcdGNvbnN0IHNwPXdYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkuZmluZChhPT5hLm5hbWUuZW5kc1dpdGgoXCI6Y052U3BQclwiKSlcbiAgICAgICAgY29uc3QgbnZQcj13WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpLmZpbmQoYT0+YS5uYW1lLmVuZHNXaXRoKFwiOm52UHJcIikpXG5cdFx0dmFyIGxvY2tzPXVuZGVmaW5lZCwgbnY9dW5kZWZpbmVkXG5cdFx0aWYoc3Ape1xuXHRcdFx0bG9ja3M9c3AuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkuZmluZChhPT5hLm5hbWUuZW5kc1dpdGgoXCI6c3BMb2Nrc1wiKSlcblx0XHRcdGlmKGxvY2tzKXtcblx0XHRcdFx0bG9ja3M9ey4uLmxvY2tzLmF0dHJpYnN9XG5cdFx0XHR9XG5cdFx0fVxuXG4gICAgICAgIGlmKG52UHIpe1xuICAgICAgICAgICAgbnY9dGhpcy5udlByKG52UHIsb2ZmaWNlRG9jdW1lbnQpXG4gICAgICAgIH1cblx0XHRyZXR1cm4gey4uLnByb3BzLCBsb2NrcywgLi4ubnYsIHR5cGU6XCJub25WaXN1YWxQcm9wc1wifVxuXHR9LFxuXG5cdG52UGljUHIod1htbCxvZCl7XG5cdFx0cmV0dXJuIHRoaXMubnZTcFByKC4uLmFyZ3VtZW50cylcblx0fSxcblxuXHRudkdycFNwUHIoKXtcblx0XHRyZXR1cm4gdGhpcy5udlNwUHIoLi4uYXJndW1lbnRzKVxuXHR9LFxuXG4gICAgZ3JwU3BQcigpe1xuXHRcdHJldHVybiB0aGlzLnNwUHIoLi4uYXJndW1lbnRzKVxuXHR9LFxuXG4gICAgbnZQcih3WG1sLG9kKXtcbiAgICAgICAgY29uc3QgcGg9d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lKS5maW5kKGE9PmEubmFtZS5lbmRzV2l0aChcIjpwaFwiKSlcbiAgICAgICAgaWYocGgpe1xuICAgICAgICAgICAgcmV0dXJuIHtwbGFjZWhvbGRlcjp0aGlzLnBoKHBoLG9kKX1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge31cbiAgICB9LFxuXG4gICAgcGgoe2F0dHJpYnN9KXtcbiAgICAgICAgcmV0dXJuIHsuLi5hdHRyaWJzfVxuICAgIH0sXG5cblx0c3BQcih3WG1sLG9kKXtcblx0XHRjb25zdCBwcm9wcz13WG1sLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpLnJlZHVjZSgocHJvcHMsYSk9Pntcblx0XHRcdGNvbnN0IHt0eXBlLCAuLi5hdHRyaWJzfT10aGlzW2EubmFtZS5zcGxpdChcIjpcIikucG9wKCldKGEsb2QpXG5cdFx0XHRwcm9wc1t0eXBlXT1hdHRyaWJzXG5cdFx0XHRyZXR1cm4gcHJvcHNcblx0XHR9LHt9KVxuXHRcdHJldHVybiB7dHlwZTpcInNoYXBlUHJvcHNcIiwgLi4ucHJvcHMsIC4uLndYbWwuYXR0cmlic31cblx0fSxcblxuXHR4ZnJtKHdYbWwsIG9mZmljZURvY3VtZW50KXtcblx0XHRyZXR1cm4ge3R5cGU6XCJ0cmFuc2Zvcm1cIix4OjAseTowLHdpZHRoOjAsaGVpZ2h0OjAsLi4ud1htbC5hdHRyaWJzfVxuXHR9LFxuXG5cdHByc3RHZW9tKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdHJldHVybiB7dHlwZTpcImdlb21ldHJ5XCJ9XG5cdH0sXG5cblx0Y3VzdEdlb20od1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdHJldHVybiB7dHlwZTpcImdlb21ldHJ5XCJ9XG5cdH0sXG5cblx0c29saWRGaWxsKHdYbWwsIG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJmaWxsXCJ9XG5cdH0sXG5cblx0YmxpcEZpbGwod1htbCxvZCl7XG5cdFx0cmV0dXJuIHt0eXBlOlwiZmlsbFwifVxuXHR9LFxuXG5cdGdyYWRGaWxsKHdYbWwsb2Qpe1xuXHRcdHJldHVybiB7dHlwZTpcImZpbGxcIn1cblx0fSxcblxuXHRwYXR0RmlsbCh3WG1sLG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJmaWxsXCJ9XG5cdH0sXG5cblx0Z3JwRmlsbCh3WG1sLG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJmaWxsXCJ9XG5cdH0sXG5cblx0ZWZmZWN0THN0KHdYbWwsb2Qpe1xuXHRcdHJldHVybiB7dHlwZTpcImVmZmVjdHNcIn1cblx0fSxcblxuXHRsbih3WG1sLG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJvdXRsaW5lXCJ9XG5cdH0sXG5cblx0c3AzZCh3WG1sLG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJzaGFwZTNkXCJ9XG5cdH0sXG5cblx0c2NlbmUzZCh3WG1sLG9kKXtcblx0XHRyZXR1cm4ge3R5cGU6XCJzY2VuZTNkXCJ9XG5cdH0sXG5cblx0bHN0U3R5bGUod1htbCxvZCl7XG4gICAgICAgIGNvbnN0IGlzTGlzdD0vXFw6bHZsXFxkcFByJC9cbiAgICAgICAgcmV0dXJuIHdYbWwuY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSAmJiBpc0xpc3QudGVzdChhLm5hbWUpKS5yZWR1Y2UoKG51bXMsYSk9PntcbiAgICAgICAgICAgIG51bXNbYS5uYW1lLnN1YnN0cigtNCwxKV09dGhpcy5sdmwxcFByKGEsb2QpXG4gICAgICAgICAgICByZXR1cm4gbnVtc1xuICAgICAgICB9LHt9KVxuXHR9LFxuXG4gICAgbHZsMXBQcih7Y2hpbGRyZW4sYXR0cmlic30sb2Qpe1xuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkucmVkdWNlKChwcm9wcyxhKT0+e1xuICAgICAgICAgICAgY29uc3Qgaz1hLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXG4gICAgICAgICAgICBzd2l0Y2goayl7XG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1Rm9udFwiOlxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5mb250cz17Li4uYS5hdHRyaWJzfVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgXCJidUNoYXJcIjpcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuY2hhcj1hLmF0dHJpYnMuY2hhclxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgXCJidUNsclwiOlxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5jb2xvcj10aGlzLmNvbG9yKGEsb2QpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSBcImJ1QXV0b051bVwiOlxuICAgICAgICAgICAgICAgICAgICBwcm9wcy5hdXRvTnVtPXsuLi5hLmF0dHJpYnN9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcHJvcHNcbiAgICAgICAgfSx7Li4uYXR0cmlic30pXG4gICAgfSxcblxuICAgIHNyZ2JDbHIoe2F0dHJpYnM6e3ZhbH19LG9kKXtcbiAgICAgICAgcmV0dXJuIG9kLmRvYy5hc0NvbG9yKHZhbClcbiAgICB9LFxuXG5cdHBQcih7Y2hpbGRyZW4sYXR0cmliczp7bWFyTCxtYXJSLGluZGVudH19LG9kKXtcbiAgICAgICAgY29uc3QgcHJvcHM9e31cbiAgICAgICAgaWYoaW5kZW50IT11bmRlZmluZWQpXG4gICAgICAgICAgICBwcm9wcy5pbmRlbnQ9b2QuZG9jLmR4YTJQeChpbmRlbnQpXG4gICAgICAgIGlmKG1hckwhPXVuZGVmaW5lZClcbiAgICAgICAgICAgIHByb3BzLm1hcmdpbkxlZnQ9b2QuZG9jLnRvUHgoYCR7cGFyc2VJbnQobWFyTCkqMi80NTcyMDB9aW5gKVxuICAgICAgICBpZihtYXJSIT11bmRlZmluZWQpXG4gICAgICAgICAgICBwcm9wcy5tYXJnaW5SaWdodD1vZC5kb2MudG9QeChgJHtwYXJzZUludChtYXJSKSoyLzQ1NzIwMH1pbmApXG5cbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpLnJlZHVjZSgocHJvcHMsYSk9PntcbiAgICAgICAgICAgIHN3aXRjaChhLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG5TcGNcIjpcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMubGluZUhlaWdodD10aGlzLmxuU3BjKGEsb2QpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwic3BjQWZ0XCI6XG4gICAgICAgICAgICAgICAgICAgIHByb3BzLmFmdGVyPXRoaXMubG5TcGMoYSxvZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzcGNCZWZcIjpcbiAgICAgICAgICAgICAgICAgICAgcHJvcHMuYmVmb3JlPXRoaXMubG5TcGMoYSxvZCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHByb3BzXG4gICAgICAgIH0scHJvcHMpXG5cdH0sXG5cbiAgICBsblNwYyh7Y2hpbGRyZW59LG9kKXtcbiAgICAgICAgcmV0dXJuIG9kLmRvYy5wdDJQeChwYXJzZUludChjaGlsZHJlbi5maW5kKGE9PmEubmFtZSkuYXR0cmlicy52YWwpLzEwMClcbiAgICB9LFxuXG5cdHJQcih7Y2hpbGRyZW4sIGF0dHJpYnM6e3N6LCAuLi5hdHRyaWJzfX0sb2Qpe1xuICAgICAgICBjb25zdCBwcm9wcz17Li4uYXR0cmlic31cbiAgICAgICAgaWYoc3ohPXVuZGVmaW5lZCl7XG4gICAgICAgICAgICBwcm9wcy5zaXplPXBhcnNlSW50KHN6KS8xMDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkucmVkdWNlKChwcm9wcyxhKT0+e1xuICAgICAgICAgICAgY29uc3Qge3R5cGUsIC4uLmF0dHJ9PXRoaXNbYS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKV0oYSxvZClcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHByb3BzLHR5cGUgPyB7W3R5cGVdOmF0dHJ9IDogYXR0cilcbiAgICAgICAgfSxwcm9wcylcblx0fSxcblxuICAgIGRlZlJQcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5yUHIoLi4uYXJndW1lbnRzKVxuICAgIH0sXG5cbiAgICBkZWZQUHIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucFByKC4uLmFyZ3VtZW50cylcbiAgICB9LFxuXG4gICAgbGF0aW4oe2F0dHJpYnN9KXtcbiAgICAgICAgcmV0dXJuIHt0eXBlOlwiZm9udHNcIiwuLi5hdHRyaWJzfVxuICAgIH0sXG5cbiAgICBobGlua0NsaWNrKG4sb2Qpe1xuICAgICAgICByZXR1cm4ge2hyZWY6XCJcIn1cbiAgICB9LFxuXG4gICAgdUZpbGwoe2NoaWxkcmVufSxvZCl7XG4gICAgICAgIHJldHVybiB7dW5kZXJsaW5lRmlsbDogdGhpcy5jb2xvciguLi5hcmd1bWVudHMpfVxuICAgIH0sXG5cbiAgICBoaWdobGlnaHQoKXtcbiAgICAgICAgcmV0dXJuIHtoaWdobGlnaHQ6dGhpcy5jb2xvciguLi5hcmd1bWVudHMpfVxuICAgIH0sXG5cbiAgICBjb2xvcih7Y2hpbGRyZW59LG9kKXtcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpLnJlZHVjZSgodixhKT0+dGhpc1thLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpXShhLG9kKSxudWxsKVxuICAgIH1cbn1cbiJdfQ==