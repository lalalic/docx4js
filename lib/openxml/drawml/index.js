"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = function (od) {
    return _extends({
        filter: ":not(a\\:extLst)",
        id: function id() {
            return undefined;
        }
    }, same("latin,ea,cs".split(","), function (_ref) {
        var _ref$attribs$typeface = _ref.attribs.typeface,
            typeface = _ref$attribs$typeface === undefined ? "" : _ref$attribs$typeface;
        return od.theme.font(typeface);
    }), same("lumMod,lumOff,tint,shade".split(","), function (_ref2) {
        var val = _ref2.attribs.val;
        return parseInt(val) / 100000;
    }), {
        tidy_schemeClr: function tidy_schemeClr(_ref3) {
            var val = _ref3.val,
                effect = _objectWithoutProperties(_ref3, ["val"]);

            return od.doc.asColor(od.theme.color(val), effect);
        },
        tidy_srgbClr: function tidy_srgbClr(_ref4) {
            var val = _ref4.val,
                effect = _objectWithoutProperties(_ref4, ["val"]);

            return od.doc.asColor(val, effect);
        },
        tidy_prstClr: function tidy_prstClr(_ref5) {
            var val = _ref5.val,
                effect = _objectWithoutProperties(_ref5, ["val"]);

            return od.doc.asColor(val, effect);
        },
        sysClr: function sysClr(_ref6) {
            var val = _ref6.attribs.val;
            return val;
        },
        tidy_solidFill: function tidy_solidFill(_ref7) {
            var color = _ref7.color;
            return color;
        },
        rot: function rot(v) {
            return parseInt(v) / 60000;
        },

        blip: function blip(n) {
            var _n$attribs = n.attribs,
                embed = _n$attribs["r:embed"],
                url = _n$attribs["r:link"];

            if (url) return { url: url };
            var part = od.$(n).part();
            return new _part2.default(part, od.doc).getRel(embed);
        },

        prstGeom: function prstGeom(x) {
            return x.attribs.prst;
        },
        pathLst: function pathLst(_ref8) {
            var children = _ref8.children;

            var px = function px(x) {
                return od.doc.emu2Px(x);
            };
            return children.filter(function (a) {
                return a.name == "a:path";
            }).reduce(function (d, path) {
                path.children.filter(function (a) {
                    return a.name;
                }).forEach(function (a) {
                    switch (a.name.split(":").pop()) {
                        case 'moveTo':
                            d.push('M ' + px(a.children[0].attribs.x) + ' ' + px(a.children[0].attribs.y));
                            break;
                        case 'lnTo':
                            d.push('L ' + px(a.children[0].attribs.x) + ' ' + px(a.children[0].attribs.y));
                            break;
                            break;
                        case 'cubicBezTo':
                            d.push('L ' + px(a.children[0].attribs.x) + ' ' + px(a.children[0].attribs.y));
                            d.push('Q ' + px(a.children[1].attribs.x) + ' ' + px(a.children[1].attribs.y) + ' ' + px(a.children[2].attribs.x) + ' ' + px(a.children[2].attribs.y));
                            break;
                        case 'arcTo':
                            d.push("A");
                            break;
                        case 'close':
                            d.push('Z');
                            break;
                    }
                });
                return d;
            }, []).join(" ");
        },

        tidy_custGeom: function tidy_custGeom(_ref9) {
            var pathLst = _ref9.pathLst;
            return pathLst;
        },

        lvl: function lvl(v) {
            return parseInt(v);
        },
        spcPts: function spcPts(_ref10) {
            var val = _ref10.attribs.val;
            return od.doc.pt2Px(parseInt(val) / 100);
        },
        tidy_spcAft: function tidy_spcAft(_ref11) {
            var a = _ref11.spcPts;
            return a;
        },
        tidy_spcBef: function tidy_spcBef(_ref12) {
            var a = _ref12.spcPts;
            return a;
        },

        buFont: function buFont(_ref13) {
            var typeface = _ref13.attribs.typeface;
            return od.theme.font(typeface);
        },
        buChar: function buChar(_ref14) {
            var char = _ref14.attribs.char;
            return char;
        },
        buSzPts: function buSzPts(_ref15) {
            var val = _ref15.attribs.val;
            return od.doc.pt2Px(parseInt(val) / 100);
        },
        buSzPct: function buSzPct(_ref16) {
            var val = _ref16.attribs.val;
            return parseInt(val) / 1000 / 100;
        },
        buAutoNum: function buAutoNum(_ref17) {
            var attribs = _ref17.attribs;
            return _extends({}, attribs);
        },
        tidy_buClr: function tidy_buClr(_ref18) {
            var color = _ref18.color;
            return color;
        },

        indent: function indent(v) {
            return od.doc.emu2Px(v);
        },
        marL: function marL(v) {
            return od.doc.emu2Px(v);
        },
        lIns: function lIns(v) {
            return od.doc.emu2Px(v);
        },
        rIns: function rIns(v) {
            return od.doc.emu2Px(v);
        },
        bIns: function bIns(v) {
            return od.doc.emu2Px(v);
        },
        tIns: function tIns(v) {
            return od.doc.emu2Px(v);
        },

        ext: function ext(_ref19) {
            var _ref19$attribs = _ref19.attribs,
                cx = _ref19$attribs.cx,
                cy = _ref19$attribs.cy;
            return { width: od.doc.emu2Px(cx), height: od.doc.emu2Px(cy) };
        },
        off: function off(_ref20) {
            var _ref20$attribs = _ref20.attribs,
                x = _ref20$attribs.x,
                y = _ref20$attribs.y;
            return { x: od.doc.emu2Px(x), y: od.doc.emu2Px(y) };
        },
        tidy_xfrm: function tidy_xfrm(_ref21) {
            var _ref21$ext = _ref21.ext,
                ext = _ref21$ext === undefined ? {} : _ref21$ext,
                _ref21$off = _ref21.off,
                off = _ref21$off === undefined ? {} : _ref21$off,
                transform = _objectWithoutProperties(_ref21, ["ext", "off"]);

            return _extends({}, ext, off, transform);
        }

    }, same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref22) {
        var w = _ref22.w,
            props = _objectWithoutProperties(_ref22, ["w"]);

        return _extends({}, props, { w: w ? od.doc.emu2Px(w) : undefined });
    }), same("left,right,top,bottom".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref23) {
        var ln = _ref23.ln;
        return ln;
    }), {
        tidy_tcTxStyle: function tidy_tcTxStyle(_ref24) {
            var color = _ref24.color,
                props = _objectWithoutProperties(_ref24, ["color"]);

            return _extends({}, props, { solidFill: color });
        },

        tidy_lnRef: function tidy_lnRef(_ref25) {
            var idx = _ref25.idx,
                ph = _objectWithoutProperties(_ref25, ["idx"]);

            return od.theme.lnRef(idx, ph);
        },
        tidy_fillRef: function tidy_fillRef(_ref26) {
            var idx = _ref26.idx,
                ph = _objectWithoutProperties(_ref26, ["idx"]);

            return od.theme.fillRef(idx, ph);
        },
        tidy_EffectRef: function tidy_EffectRef(_ref27) {
            var idx = _ref27.idx,
                ph = _objectWithoutProperties(_ref27, ["idx"]);

            return od.theme.effectRef(idx, ph);
        },
        tidy_fontRef: function tidy_fontRef(_ref28) {
            var idx = _ref28.idx,
                ph = _objectWithoutProperties(_ref28, ["idx"]);

            return od.theme.fontRef(idx, ph);
        },

        tidy_noAutoFit: function tidy_noAutoFit() {
            return undefined;
        },
        tidy_normAutoFit: function tidy_normAutoFit(props) {
            return _extends({ type: "font" }, props);
        },
        tidy_spAutoFit: function tidy_spAutoFit(props) {
            return _extends({ type: "block" }, props);
        },

        names: {
            schemeClr: "color", srgbClr: "color", sysClr: "color", prstClr: "color",
            prstGeom: "geometry", custGeom: "geometry",
            lnB: "bottom", lnR: "right", lnL: "left", lnT: "top",
            rot: "rotate",
            spAutoFit: "autofit", normAutoFit: "autofit", noAutoFit: "autofit"
        },

        inherit: function inherit() {
            for (var _len = arguments.length, additions = Array(_len), _key = 0; _key < _len; _key++) {
                additions[_key] = arguments[_key];
            }

            return additions.reduce(function (_ref29, _ref30) {
                var _ref30$filter = _ref30.filter,
                    _filter = _ref30$filter === undefined ? "" : _ref30$filter,
                    _ref30$names = _ref30.names,
                    _names = _ref30$names === undefined ? {} : _ref30$names,
                    _others = _objectWithoutProperties(_ref30, ["filter", "names"]);

                var _ref29$filter = _ref29.filter,
                    filter = _ref29$filter === undefined ? "" : _ref29$filter,
                    _ref29$names = _ref29.names,
                    names = _ref29$names === undefined ? {} : _ref29$names,
                    others = _objectWithoutProperties(_ref29, ["filter", "names"]);

                return _extends({}, others, _others, {
                    filter: [filter, _filter].filter(function (a) {
                        return !!a;
                    }).join(","),
                    names: _extends({}, names, _names)
                });
            }, this);
        }
    });
};

var same = function same(keys, fx) {
    return keys.reduce(function (fs, k) {
        return fs[k] = fx, fs;
    }, {});
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RyYXdtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJmaWx0ZXIiLCJpZCIsInVuZGVmaW5lZCIsInNhbWUiLCJzcGxpdCIsImF0dHJpYnMiLCJ0eXBlZmFjZSIsIm9kIiwidGhlbWUiLCJmb250IiwidmFsIiwicGFyc2VJbnQiLCJ0aWR5X3NjaGVtZUNsciIsImVmZmVjdCIsImRvYyIsImFzQ29sb3IiLCJjb2xvciIsInRpZHlfc3JnYkNsciIsInRpZHlfcHJzdENsciIsInN5c0NsciIsInRpZHlfc29saWRGaWxsIiwicm90IiwidiIsImJsaXAiLCJuIiwiZW1iZWQiLCJ1cmwiLCJwYXJ0IiwiJCIsImdldFJlbCIsInByc3RHZW9tIiwieCIsInByc3QiLCJwYXRoTHN0IiwiY2hpbGRyZW4iLCJweCIsImVtdTJQeCIsImEiLCJuYW1lIiwicmVkdWNlIiwiZCIsInBhdGgiLCJmb3JFYWNoIiwicG9wIiwicHVzaCIsInkiLCJqb2luIiwidGlkeV9jdXN0R2VvbSIsImx2bCIsInNwY1B0cyIsInB0MlB4IiwidGlkeV9zcGNBZnQiLCJ0aWR5X3NwY0JlZiIsImJ1Rm9udCIsImJ1Q2hhciIsImNoYXIiLCJidVN6UHRzIiwiYnVTelBjdCIsImJ1QXV0b051bSIsInRpZHlfYnVDbHIiLCJpbmRlbnQiLCJtYXJMIiwibElucyIsInJJbnMiLCJiSW5zIiwidElucyIsImV4dCIsImN4IiwiY3kiLCJ3aWR0aCIsImhlaWdodCIsIm9mZiIsInRpZHlfeGZybSIsInRyYW5zZm9ybSIsIm1hcCIsInciLCJwcm9wcyIsImxuIiwidGlkeV90Y1R4U3R5bGUiLCJzb2xpZEZpbGwiLCJ0aWR5X2xuUmVmIiwiaWR4IiwicGgiLCJsblJlZiIsInRpZHlfZmlsbFJlZiIsImZpbGxSZWYiLCJ0aWR5X0VmZmVjdFJlZiIsImVmZmVjdFJlZiIsInRpZHlfZm9udFJlZiIsImZvbnRSZWYiLCJ0aWR5X25vQXV0b0ZpdCIsInRpZHlfbm9ybUF1dG9GaXQiLCJ0eXBlIiwidGlkeV9zcEF1dG9GaXQiLCJuYW1lcyIsInNjaGVtZUNsciIsInNyZ2JDbHIiLCJwcnN0Q2xyIiwiY3VzdEdlb20iLCJsbkIiLCJsblIiLCJsbkwiLCJsblQiLCJzcEF1dG9GaXQiLCJub3JtQXV0b0ZpdCIsIm5vQXV0b0ZpdCIsImluaGVyaXQiLCJhZGRpdGlvbnMiLCJfZmlsdGVyIiwiX25hbWVzIiwiX290aGVycyIsIm90aGVycyIsImtleXMiLCJmeCIsImZzIiwiayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7a0JBRWU7QUFBQTtBQUNYQSxnQkFBTyxrQkFESTtBQUVYQyxZQUFHO0FBQUEsbUJBQUlDLFNBQUo7QUFBQTtBQUZRLE9BR1JDLEtBQUssY0FBY0MsS0FBZCxDQUFvQixHQUFwQixDQUFMLEVBQThCO0FBQUEseUNBQUVDLE9BQUYsQ0FBV0MsUUFBWDtBQUFBLFlBQVdBLFFBQVgseUNBQW9CLEVBQXBCO0FBQUEsZUFBMkJDLEdBQUdDLEtBQUgsQ0FBU0MsSUFBVCxDQUFjSCxRQUFkLENBQTNCO0FBQUEsS0FBOUIsQ0FIUSxFQUtSSCxLQUFLLDJCQUEyQkMsS0FBM0IsQ0FBaUMsR0FBakMsQ0FBTCxFQUEyQztBQUFBLFlBQVdNLEdBQVgsU0FBRUwsT0FBRixDQUFXSyxHQUFYO0FBQUEsZUFBbUJDLFNBQVNELEdBQVQsSUFBYyxNQUFqQztBQUFBLEtBQTNDLENBTFE7QUFNWEUsd0JBQWU7QUFBQSxnQkFBRUYsR0FBRixTQUFFQSxHQUFGO0FBQUEsZ0JBQVNHLE1BQVQ7O0FBQUEsbUJBQW1CTixHQUFHTyxHQUFILENBQU9DLE9BQVAsQ0FBZVIsR0FBR0MsS0FBSCxDQUFTUSxLQUFULENBQWVOLEdBQWYsQ0FBZixFQUFtQ0csTUFBbkMsQ0FBbkI7QUFBQSxTQU5KO0FBT1hJLHNCQUFhO0FBQUEsZ0JBQUVQLEdBQUYsU0FBRUEsR0FBRjtBQUFBLGdCQUFTRyxNQUFUOztBQUFBLG1CQUFtQk4sR0FBR08sR0FBSCxDQUFPQyxPQUFQLENBQWVMLEdBQWYsRUFBbUJHLE1B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cUMsR0FBckMsQ0FIWDtBQUlJZ0Qsd0NBQVVBLEtBQVYsRUFBb0JlLE1BQXBCO0FBSko7QUFNSCxhQVBNLEVBT0wsSUFQSyxDQUFQO0FBUUg7QUE3R1U7QUFBQSxDOztBQWdIZixJQUFNMUcsT0FBSyxTQUFMQSxJQUFLLENBQUM2RyxJQUFELEVBQU1DLEVBQU47QUFBQSxXQUFXRCxLQUFLekUsTUFBTCxDQUFZLFVBQUMyRSxFQUFELEVBQUtDLENBQUw7QUFBQSxlQUFVRCxHQUFHQyxDQUFILElBQU1GLEVBQU4sRUFBVUMsRUFBcEI7QUFBQSxLQUFaLEVBQW9DLEVBQXBDLENBQVg7QUFBQSxDQUFYIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuXG5leHBvcnQgZGVmYXVsdCBvZD0+KHtcbiAgICBmaWx0ZXI6XCI6bm90KGFcXFxcOmV4dExzdClcIixcbiAgICBpZDooKT0+dW5kZWZpbmVkLFxuICAgIC4uLnNhbWUoXCJsYXRpbixlYSxjc1wiLnNwbGl0KFwiLFwiKSwoe2F0dHJpYnM6e3R5cGVmYWNlPVwiXCJ9fSk9Pm9kLnRoZW1lLmZvbnQodHlwZWZhY2UpKSxcbiAgICAvL3N6OnY9Pm9kLmRvYy5wdDJQeChwYXJzZUludCh2KS8xMDApLFxuICAgIC4uLnNhbWUoXCJsdW1Nb2QsbHVtT2ZmLHRpbnQsc2hhZGVcIi5zcGxpdChcIixcIiksKHthdHRyaWJzOnt2YWx9fSk9PnBhcnNlSW50KHZhbCkvMTAwMDAwKSxcbiAgICB0aWR5X3NjaGVtZUNscjooe3ZhbCwuLi5lZmZlY3R9KT0+b2QuZG9jLmFzQ29sb3Iob2QudGhlbWUuY29sb3IodmFsKSxlZmZlY3QpLFxuICAgIHRpZHlfc3JnYkNscjooe3ZhbCwuLi5lZmZlY3R9KT0+b2QuZG9jLmFzQ29sb3IodmFsLGVmZmVjdCksXG4gICAgdGlkeV9wcnN0Q2xyOih7dmFsLC4uLmVmZmVjdH0pPT5vZC5kb2MuYXNDb2xvcih2YWwsZWZmZWN0KSxcbiAgICBzeXNDbHI6KHthdHRyaWJzOnt2YWx9fSk9PnZhbCxcbiAgICB0aWR5X3NvbGlkRmlsbDooe2NvbG9yfSk9PmNvbG9yLFxuICAgIHJvdDp2PT5wYXJzZUludCh2KS82MDAwMCxcblxuICAgIGJsaXA6bj0+e1xuICAgICAgICBjb25zdCB7YXR0cmliczp7XCJyOmVtYmVkXCI6ZW1iZWQsIFwicjpsaW5rXCI6dXJsfX09blxuICAgICAgICBpZih1cmwpXG4gICAgICAgICAgICByZXR1cm4ge3VybH1cbiAgICAgICAgY29uc3QgcGFydD1vZC4kKG4pLnBhcnQoKVxuICAgICAgICByZXR1cm4gbmV3IFBhcnQocGFydCxvZC5kb2MpLmdldFJlbChlbWJlZClcbiAgICB9LFxuXG4gICAgcHJzdEdlb20oeCl7XG5cdFx0cmV0dXJuIHguYXR0cmlicy5wcnN0XG5cdH0sXG5cdHBhdGhMc3Qoe2NoaWxkcmVufSl7XG5cdFx0Y29uc3QgcHg9eD0+b2QuZG9jLmVtdTJQeCh4KVxuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09XCJhOnBhdGhcIilcbiAgICAgICAgICAgIC5yZWR1Y2UoKGQscGF0aCk9PntcbiAgICAgICAgICAgICAgICBwYXRoLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChhLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ21vdmVUbyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTSAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0Y2FzZSAnbG5Ubyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTCAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ0wgJytweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueCkrJyAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy55KSlcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKCdRICcrcHgoYS5jaGlsZHJlblsxXS5hdHRyaWJzLngpKycgJytweChhLmNoaWxkcmVuWzFdLmF0dHJpYnMueSlcbiAgICAgICAgICAgIFx0XHRcdFx0XHQrJyAnK3B4KGEuY2hpbGRyZW5bMl0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblsyXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2FyY1RvJzpcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKGBBYClcbiAgICAgICAgICAgIFx0XHRcdGJyZWFrXG4gICAgICAgICAgICBcdFx0XHRjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnWicpXG4gICAgICAgICAgICBcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiBkXG4gICAgICAgICAgICB9LFtdKS5qb2luKFwiIFwiKVxuXHR9LFxuICAgIHRpZHlfY3VzdEdlb206KHtwYXRoTHN0fSk9PnBhdGhMc3QsXG5cbiAgICBsdmw6dj0+cGFyc2VJbnQodiksXG4gICAgc3BjUHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIHRpZHlfc3BjQWZ0Oih7c3BjUHRzOmF9KT0+YSxcbiAgICB0aWR5X3NwY0JlZjooe3NwY1B0czphfSk9PmEsXG5cbiAgICBidUZvbnQ6KHthdHRyaWJzOnt0eXBlZmFjZX19KT0+b2QudGhlbWUuZm9udCh0eXBlZmFjZSksXG4gICAgYnVDaGFyOih7YXR0cmliczp7Y2hhcn19KT0+Y2hhcixcbiAgICBidVN6UHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIGJ1U3pQY3Q6KHthdHRyaWJzOnt2YWx9fSk9PnBhcnNlSW50KHZhbCkvMTAwMC8xMDAsXG4gICAgYnVBdXRvTnVtOih7YXR0cmlic30pPT4oey4uLmF0dHJpYnN9KSxcbiAgICB0aWR5X2J1Q2xyOih7Y29sb3J9KT0+Y29sb3IsXG5cbiAgICBpbmRlbnQ6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBtYXJMOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgbEluczp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIHJJbnM6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBiSW5zOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgdEluczp2PT5vZC5kb2MuZW11MlB4KHYpLFxuXG4gICAgZXh0Oih7YXR0cmliczp7Y3gsY3l9fSk9Pih7d2lkdGg6b2QuZG9jLmVtdTJQeChjeCksaGVpZ2h0Om9kLmRvYy5lbXUyUHgoY3kpfSksXG4gICAgb2ZmOih7YXR0cmliczp7eCx5fX0pPT4oe3g6b2QuZG9jLmVtdTJQeCh4KSx5Om9kLmRvYy5lbXUyUHgoeSl9KSxcbiAgICB0aWR5X3hmcm06KHtleHQ9e30sb2ZmPXt9LCAuLi50cmFuc2Zvcm19KT0+KHsuLi5leHQsIC4uLm9mZiwgLi4udHJhbnNmb3JtfSksXG5cbiAgICAuLi5zYW1lKFwibG4sbG5CLGxuUixsbkwsbG5ULGxuVGxUb0JyLGxuQmxUb1RyXCIuc3BsaXQoXCIsXCIpLm1hcChhPT4ndGlkeV8nK2EpLCh7dywuLi5wcm9wc30pPT4oey4uLnByb3BzLCB3OncgPyBvZC5kb2MuZW11MlB4KHcpIDogdW5kZWZpbmVkfSkpLFxuICAgIC4uLnNhbWUoXCJsZWZ0LHJpZ2h0LHRvcCxib3R0b21cIi5zcGxpdChcIixcIikubWFwKGE9Pid0aWR5XycrYSksKHtsbn0pPT5sbiksXG4gICAgdGlkeV90Y1R4U3R5bGU6KHtjb2xvciwuLi5wcm9wc30pPT4oey4uLnByb3BzLCBzb2xpZEZpbGw6Y29sb3J9KSxcblxuICAgIHRpZHlfbG5SZWY6KHtpZHgsLi4ucGh9KT0+b2QudGhlbWUubG5SZWYoaWR4LHBoKSxcbiAgICB0aWR5X2ZpbGxSZWY6KHtpZHgsLi4ucGh9KT0+b2QudGhlbWUuZmlsbFJlZihpZHgscGgpLFxuICAgIHRpZHlfRWZmZWN0UmVmOih7aWR4LC4uLnBofSk9Pm9kLnRoZW1lLmVmZmVjdFJlZihpZHgscGgpLFxuICAgIHRpZHlfZm9udFJlZjooe2lkeCwuLi5waH0pPT5vZC50aGVtZS5mb250UmVmKGlkeCxwaCksXG5cbiAgICB0aWR5X25vQXV0b0ZpdDooKT0+dW5kZWZpbmVkLFxuICAgIHRpZHlfbm9ybUF1dG9GaXQ6cHJvcHM9Pih7dHlwZTpcImZvbnRcIiwuLi5wcm9wc30pLFxuICAgIHRpZHlfc3BBdXRvRml0OnByb3BzPT4oe3R5cGU6XCJibG9ja1wiLC4uLnByb3BzfSksXG5cbiAgICBuYW1lczp7XG4gICAgICAgIHNjaGVtZUNscjpcImNvbG9yXCIsIHNyZ2JDbHI6XCJjb2xvclwiLCBzeXNDbHI6XCJjb2xvclwiLHByc3RDbHI6XCJjb2xvclwiLFxuICAgICAgICBwcnN0R2VvbTpcImdlb21ldHJ5XCIsIGN1c3RHZW9tOlwiZ2VvbWV0cnlcIixcbiAgICAgICAgbG5COlwiYm90dG9tXCIsIGxuUjpcInJpZ2h0XCIsIGxuTDpcImxlZnRcIiwgbG5UOlwidG9wXCIsXG4gICAgICAgIHJvdDpcInJvdGF0ZVwiLFxuICAgICAgICBzcEF1dG9GaXQ6XCJhdXRvZml0XCIsbm9ybUF1dG9GaXQ6XCJhdXRvZml0XCIsbm9BdXRvRml0OlwiYXV0b2ZpdFwiLFxuICAgIH0sXG5cbiAgICBpbmhlcml0KC4uLmFkZGl0aW9ucyl7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbnMucmVkdWNlKCh7ZmlsdGVyPVwiXCIsbmFtZXM9e30sIC4uLm90aGVyc30sIHtmaWx0ZXI6X2ZpbHRlcj1cIlwiLG5hbWVzOl9uYW1lcz17fSwgLi4uX290aGVyc30pPT57XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLm90aGVycyxcbiAgICAgICAgICAgICAgICAuLi5fb3RoZXJzLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpbZmlsdGVyLF9maWx0ZXJdLmZpbHRlcihhPT4hIWEpLmpvaW4oXCIsXCIpLFxuICAgICAgICAgICAgICAgIG5hbWVzOnsuLi5uYW1lcywgLi4uX25hbWVzfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSx0aGlzKVxuICAgIH1cbn0pXG5cbmNvbnN0IHNhbWU9KGtleXMsZngpPT5rZXlzLnJlZHVjZSgoZnMsIGspPT4oZnNba109ZngsIGZzKSx7fSlcbiJdfQ==