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
        __filter: ":not(a\\:extLst)",
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
            if (!embed) return;
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
        marR: function marR(v) {
            return od.doc.emu2Px(v);
        },
        marT: function marT(v) {
            return od.doc.emu2Px(v);
        },
        marB: function marB(v) {
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

        distL: function distL(v) {
            return od.doc.emu2Px(v);
        },
        distR: function distR(v) {
            return od.doc.emu2Px(v);
        },
        distT: function distT(v) {
            return od.doc.emu2Px(v);
        },
        distB: function distB(v) {
            return od.doc.emu2Px(v);
        },

        ext: function ext(_ref19) {
            var _ref19$attribs = _ref19.attribs,
                cx = _ref19$attribs.cx,
                cy = _ref19$attribs.cy;
            return { width: od.doc.emu2Px(cx), height: od.doc.emu2Px(cy) };
        },
        extent: function extent(_ref20) {
            var _ref20$attribs = _ref20.attribs,
                cx = _ref20$attribs.cx,
                cy = _ref20$attribs.cy;
            return { width: od.doc.emu2Px(cx), height: od.doc.emu2Px(cy) };
        },
        effectExtent: function effectExtent(_ref21) {
            var _ref21$attribs = _ref21.attribs,
                l = _ref21$attribs.l,
                t = _ref21$attribs.t,
                r = _ref21$attribs.r,
                b = _ref21$attribs.b;
            return { left: od.doc.emu2Px(l), right: od.doc.emu2Px(r), top: od.doc.emu2Px(t), bottom: od.doc.emu2Px(b) };
        },
        off: function off(_ref22) {
            var _ref22$attribs = _ref22.attribs,
                x = _ref22$attribs.x,
                y = _ref22$attribs.y;
            return { x: od.doc.emu2Px(x), y: od.doc.emu2Px(y) };
        },
        tidy_xfrm: function tidy_xfrm(_ref23) {
            var _ref23$ext = _ref23.ext,
                ext = _ref23$ext === undefined ? {} : _ref23$ext,
                _ref23$off = _ref23.off,
                off = _ref23$off === undefined ? {} : _ref23$off,
                transform = _objectWithoutProperties(_ref23, ["ext", "off"]);

            return _extends({}, ext, off, transform);
        }

    }, same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref24) {
        var w = _ref24.w,
            props = _objectWithoutProperties(_ref24, ["w"]);

        return _extends({}, props, { w: w ? od.doc.emu2Px(w) : undefined });
    }), same("left,right,top,bottom".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref25) {
        var ln = _ref25.ln;
        return ln;
    }), {
        tidy_tcTxStyle: function tidy_tcTxStyle(_ref26) {
            var color = _ref26.color,
                props = _objectWithoutProperties(_ref26, ["color"]);

            return _extends({}, props, { solidFill: color });
        },

        tidy_lnRef: function tidy_lnRef(_ref27) {
            var idx = _ref27.idx,
                ph = _objectWithoutProperties(_ref27, ["idx"]);

            return od.theme.lnRef(idx, ph);
        },
        tidy_fillRef: function tidy_fillRef(_ref28) {
            var idx = _ref28.idx,
                ph = _objectWithoutProperties(_ref28, ["idx"]);

            return od.theme.fillRef(idx, ph);
        },
        tidy_effectRef: function tidy_effectRef(_ref29) {
            var idx = _ref29.idx,
                ph = _objectWithoutProperties(_ref29, ["idx"]);

            return od.theme.effectRef(idx, ph);
        },
        tidy_fontRef: function tidy_fontRef(_ref30) {
            var idx = _ref30.idx,
                ph = _objectWithoutProperties(_ref30, ["idx"]);

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
            spAutoFit: "autofit", normAutoFit: "autofit", noAutoFit: "autofit",
            gsLst: "[]"
        },

        inherit: function inherit() {
            for (var _len = arguments.length, additions = Array(_len), _key = 0; _key < _len; _key++) {
                additions[_key] = arguments[_key];
            }

            return additions.reduce(function (_ref31, _ref32) {
                var _ref32$__filter = _ref32.__filter,
                    _filter = _ref32$__filter === undefined ? "" : _ref32$__filter,
                    _ref32$names = _ref32.names,
                    _names = _ref32$names === undefined ? {} : _ref32$names,
                    _others = _objectWithoutProperties(_ref32, ["__filter", "names"]);

                var _ref31$__filter = _ref31.__filter,
                    __filter = _ref31$__filter === undefined ? "" : _ref31$__filter,
                    _ref31$names = _ref31.names,
                    names = _ref31$names === undefined ? {} : _ref31$names,
                    others = _objectWithoutProperties(_ref31, ["__filter", "names"]);

                return _extends({}, others, _others, {
                    __filter: [__filter, _filter].filter(function (a) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RyYXdtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfX2ZpbHRlciIsImlkIiwidW5kZWZpbmVkIiwic2FtZSIsInNwbGl0IiwiYXR0cmlicyIsInR5cGVmYWNlIiwib2QiLCJ0aGVtZSIsImZvbnQiLCJ2YWwiLCJwYXJzZUludCIsInRpZHlfc2NoZW1lQ2xyIiwiZWZmZWN0IiwiZG9jIiwiYXNDb2xvciIsImNvbG9yIiwidGlkeV9zcmdiQ2xyIiwidGlkeV9wcnN0Q2xyIiwic3lzQ2xyIiwidGlkeV9zb2xpZEZpbGwiLCJyb3QiLCJ2IiwiYmxpcCIsIm4iLCJlbWJlZCIsInVybCIsInBhcnQiLCIkIiwiZ2V0UmVsIiwicHJzdEdlb20iLCJ4IiwicHJzdCIsInBhdGhMc3QiLCJjaGlsZHJlbiIsInB4IiwiZW11MlB4IiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJkIiwicGF0aCIsImZvckVhY2giLCJwb3AiLCJwdXNoIiwieSIsImpvaW4iLCJ0aWR5X2N1c3RHZW9tIiwibHZsIiwic3BjUHRzIiwicHQyUHgiLCJ0aWR5X3NwY0FmdCIsInRpZHlfc3BjQmVmIiwiYnVGb250IiwiYnVDaGFyIiwiY2hhciIsImJ1U3pQdHMiLCJidVN6UGN0IiwiYnVBdXRvTnVtIiwidGlkeV9idUNsciIsImluZGVudCIsIm1hckwiLCJtYXJSIiwibWFyVCIsIm1hckIiLCJsSW5zIiwicklucyIsImJJbnMiLCJ0SW5zIiwiZGlzdEwiLCJkaXN0UiIsImRpc3RUIiwiZGlzdEIiLCJleHQiLCJjeCIsImN5Iiwid2lkdGgiLCJoZWlnaHQiLCJleHRlbnQiLCJlZmZlY3RFeHRlbnQiLCJsIiwidCIsInIiLCJiIiwibGVmdCIsInJpZ2h0IiwidG9wIiwiYm90dG9tIiwib2ZmIiwidGlkeV94ZnJtIiwidHJhbnNmb3JtIiwibWFwIiwidyIsInByb3BzIiwibG4iLCJ0aWR5X3RjVHhTdHlsZSIsInNvbGlkRmlsbCIsInRpZHlfbG5SZWYiLCJpZHgiLCJwaCIsImxuUmVmIiwidGlkeV9maWxsUmVmIiwiZmlsbFJlZiIsInRpZHlfZWZmZWN0UmVmIiwiZWZmZWN0UmVmIiwidGlkeV9mb250UmVmIiwiZm9udFJlZiIsInRpZHlfbm9BdXRvRml0IiwidGlkeV9ub3JtQXV0b0ZpdCIsInR5cGUiLCJ0aWR5X3NwQXV0b0ZpdCIsIm5hbWVzIiwic2NoZW1lQ2xyIiwic3JnYkNsciIsInByc3RDbHIiLCJjdXN0R2VvbSIsImxuQiIsImxuUiIsImxuTCIsImxuVCIsInNwQXV0b0ZpdCIsIm5vcm1BdXRvRml0Iiwibm9BdXRvRml0IiwiZ3NMc3QiLCJpbmhlcml0IiwiYWRkaXRpb25zIiwiX2ZpbHRlciIsIl9uYW1lcyIsIl9vdGhlcnMiLCJvdGhlcnMiLCJrZXlzIiwiZngiLCJmcyIsImsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7O2tCQUVlO0FBQUE7QUFDWEEsa0JBQVMsa0JBREU7QUFFWEMsWUFBRztBQUFBLG1CQUFJQyxTQUFKO0FBQUE7QUFGUSxPQUdSQyxLQUFLLGNBQWNDLEtBQWQsQ0FBb0IsR0FBcEIsQ0FBTCxFQUE4QjtBQUFBLHlDQUFFQyxPQUFGLENBQVdDLFFBQVg7QUFBQSxZQUFXQSxRQUFYLHlDQUFvQixFQUFwQjtBQUFBLGVBQTJCQyxHQUFHQyxLQUFILENBQVNDLElBQVQsQ0FBY0gsUUFBZCxDQUEzQjtBQUFBLEtBQTlCLENBSFEsRUFLUkgsS0FBSywyQkFBMkJDLEtBQTNCLENBQWlDLEdBQWpDLENBQUwsRUFBMkM7QUFBQSxZQUFXTSxHQUFYLFNBQUVMLE9BQUYsQ0FBV0ssR0FBWDtBQUFBLGVBQW1CQyxTQUFTRCxHQUFULElBQWMsTUFBakM7QUFBQSxLQUEzQyxDQUxRO0FBTVhFLHdCQUFlO0FBQUEsZ0JBQUVGLEdBQUYsU0FBRUEsR0FBRjtBQUFBLGdCQUFTRyxNQUFUOztBQUFBLG1CQUFtQk4sR0FBR08sR0FBSCxDQUFPQyxPQUFQLENBQWVSLEdBQUdDLEtBQUgsQ0FBU1EsS0FBVCxDQUFlTixHQUFmLENBQWYs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O0FBQVZBLHlCQUFVO0FBQUE7O0FBQ2pCLG1CQUFPQSxVQUFVdEYsTUFBVixDQUFpQiwwQkFBd0Y7QUFBQSw2Q0FBbkR4QyxRQUFtRDtBQUFBLG9CQUExQytILE9BQTBDLG1DQUFsQyxFQUFrQztBQUFBLDBDQUEvQmYsS0FBK0I7QUFBQSxvQkFBekJnQixNQUF5QixnQ0FBbEIsRUFBa0I7QUFBQSxvQkFBWEMsT0FBVzs7QUFBQSw2Q0FBdEZqSSxRQUFzRjtBQUFBLG9CQUF0RkEsUUFBc0YsbUNBQTdFLEVBQTZFO0FBQUEsMENBQTFFZ0gsS0FBMEU7QUFBQSxvQkFBMUVBLEtBQTBFLGdDQUFwRSxFQUFvRTtBQUFBLG9CQUE3RGtCLE1BQTZEOztBQUM1RyxvQ0FDT0EsTUFEUCxFQUVPRCxPQUZQO0FBR0lqSSw4QkFBUyxDQUFDQSxRQUFELEVBQVUrSCxPQUFWLEVBQW1CMUYsTUFBbkIsQ0FBMEI7QUFBQSwrQkFBRyxDQUFDLENBQUNDLENBQUw7QUFBQSxxQkFBMUIsRUFBa0NTLElBQWxDLENBQXVDLEdBQXZDLENBSGI7QUFJSWlFLHdDQUFVQSxLQUFWLEVBQW9CZ0IsTUFBcEI7QUFKSjtBQU1ILGFBUE0sRUFPTCxJQVBLLENBQVA7QUFRSDtBQTNIVTtBQUFBLEM7O0FBOEhmLElBQU03SCxPQUFLLFNBQUxBLElBQUssQ0FBQ2dJLElBQUQsRUFBTUMsRUFBTjtBQUFBLFdBQVdELEtBQUszRixNQUFMLENBQVksVUFBQzZGLEVBQUQsRUFBS0MsQ0FBTDtBQUFBLGVBQVVELEdBQUdDLENBQUgsSUFBTUYsRUFBTixFQUFVQyxFQUFwQjtBQUFBLEtBQVosRUFBb0MsRUFBcEMsQ0FBWDtBQUFBLENBQVgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXG5cbmV4cG9ydCBkZWZhdWx0IG9kPT4oe1xuICAgIF9fZmlsdGVyOlwiOm5vdChhXFxcXDpleHRMc3QpXCIsXG4gICAgaWQ6KCk9PnVuZGVmaW5lZCxcbiAgICAuLi5zYW1lKFwibGF0aW4sZWEsY3NcIi5zcGxpdChcIixcIiksKHthdHRyaWJzOnt0eXBlZmFjZT1cIlwifX0pPT5vZC50aGVtZS5mb250KHR5cGVmYWNlKSksXG4gICAgLy9zejp2PT5vZC5kb2MucHQyUHgocGFyc2VJbnQodikvMTAwKSxcbiAgICAuLi5zYW1lKFwibHVtTW9kLGx1bU9mZix0aW50LHNoYWRlXCIuc3BsaXQoXCIsXCIpLCh7YXR0cmliczp7dmFsfX0pPT5wYXJzZUludCh2YWwpLzEwMDAwMCksXG4gICAgdGlkeV9zY2hlbWVDbHI6KHt2YWwsLi4uZWZmZWN0fSk9Pm9kLmRvYy5hc0NvbG9yKG9kLnRoZW1lLmNvbG9yKHZhbCksZWZmZWN0KSxcbiAgICB0aWR5X3NyZ2JDbHI6KHt2YWwsLi4uZWZmZWN0fSk9Pm9kLmRvYy5hc0NvbG9yKHZhbCxlZmZlY3QpLFxuICAgIHRpZHlfcHJzdENscjooe3ZhbCwuLi5lZmZlY3R9KT0+b2QuZG9jLmFzQ29sb3IodmFsLGVmZmVjdCksXG4gICAgc3lzQ2xyOih7YXR0cmliczp7dmFsfX0pPT52YWwsXG4gICAgdGlkeV9zb2xpZEZpbGw6KHtjb2xvcn0pPT5jb2xvcixcbiAgICByb3Q6dj0+cGFyc2VJbnQodikvNjAwMDAsXG5cbiAgICBibGlwOm49PntcbiAgICAgICAgY29uc3Qge2F0dHJpYnM6e1wicjplbWJlZFwiOmVtYmVkLCBcInI6bGlua1wiOnVybH19PW5cbiAgICAgICAgaWYodXJsKVxuICAgICAgICAgICAgcmV0dXJuIHt1cmx9XG4gICAgICAgIGlmKCFlbWJlZClcbiAgICAgICAgICAgIHJldHVybiBcbiAgICAgICAgY29uc3QgcGFydD1vZC4kKG4pLnBhcnQoKVxuICAgICAgICByZXR1cm4gbmV3IFBhcnQocGFydCxvZC5kb2MpLmdldFJlbChlbWJlZClcbiAgICB9LFxuXG4gICAgcHJzdEdlb20oeCl7XG5cdFx0cmV0dXJuIHguYXR0cmlicy5wcnN0XG5cdH0sXG5cdHBhdGhMc3Qoe2NoaWxkcmVufSl7XG5cdFx0Y29uc3QgcHg9eD0+b2QuZG9jLmVtdTJQeCh4KVxuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09XCJhOnBhdGhcIilcbiAgICAgICAgICAgIC5yZWR1Y2UoKGQscGF0aCk9PntcbiAgICAgICAgICAgICAgICBwYXRoLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChhLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ21vdmVUbyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTSAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0Y2FzZSAnbG5Ubyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTCAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ0wgJytweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueCkrJyAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy55KSlcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKCdRICcrcHgoYS5jaGlsZHJlblsxXS5hdHRyaWJzLngpKycgJytweChhLmNoaWxkcmVuWzFdLmF0dHJpYnMueSlcbiAgICAgICAgICAgIFx0XHRcdFx0XHQrJyAnK3B4KGEuY2hpbGRyZW5bMl0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblsyXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2FyY1RvJzpcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKGBBYClcbiAgICAgICAgICAgIFx0XHRcdGJyZWFrXG4gICAgICAgICAgICBcdFx0XHRjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnWicpXG4gICAgICAgICAgICBcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiBkXG4gICAgICAgICAgICB9LFtdKS5qb2luKFwiIFwiKVxuXHR9LFxuICAgIHRpZHlfY3VzdEdlb206KHtwYXRoTHN0fSk9PnBhdGhMc3QsXG5cbiAgICBsdmw6dj0+cGFyc2VJbnQodiksXG4gICAgc3BjUHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIHRpZHlfc3BjQWZ0Oih7c3BjUHRzOmF9KT0+YSxcbiAgICB0aWR5X3NwY0JlZjooe3NwY1B0czphfSk9PmEsXG5cbiAgICBidUZvbnQ6KHthdHRyaWJzOnt0eXBlZmFjZX19KT0+b2QudGhlbWUuZm9udCh0eXBlZmFjZSksXG4gICAgYnVDaGFyOih7YXR0cmliczp7Y2hhcn19KT0+Y2hhcixcbiAgICBidVN6UHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIGJ1U3pQY3Q6KHthdHRyaWJzOnt2YWx9fSk9PnBhcnNlSW50KHZhbCkvMTAwMC8xMDAsXG4gICAgYnVBdXRvTnVtOih7YXR0cmlic30pPT4oey4uLmF0dHJpYnN9KSxcbiAgICB0aWR5X2J1Q2xyOih7Y29sb3J9KT0+Y29sb3IsXG5cbiAgICBpbmRlbnQ6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBtYXJMOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgbWFyUjp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIG1hclQ6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBtYXJCOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgXG4gICAgbEluczp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIHJJbnM6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBiSW5zOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgdEluczp2PT5vZC5kb2MuZW11MlB4KHYpLFxuXG4gICAgZGlzdEw6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBkaXN0Ujp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIGRpc3RUOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgZGlzdEI6dj0+b2QuZG9jLmVtdTJQeCh2KSxcblxuICAgIGV4dDooe2F0dHJpYnM6e2N4LGN5fX0pPT4oe3dpZHRoOm9kLmRvYy5lbXUyUHgoY3gpLGhlaWdodDpvZC5kb2MuZW11MlB4KGN5KX0pLFxuICAgIGV4dGVudDooe2F0dHJpYnM6e2N4LGN5fX0pPT4oe3dpZHRoOm9kLmRvYy5lbXUyUHgoY3gpLGhlaWdodDpvZC5kb2MuZW11MlB4KGN5KX0pLFxuICAgIGVmZmVjdEV4dGVudDooe2F0dHJpYnM6e2wsdCxyLGJ9fSk9Pih7bGVmdDpvZC5kb2MuZW11MlB4KGwpLHJpZ2h0Om9kLmRvYy5lbXUyUHgociksdG9wOm9kLmRvYy5lbXUyUHgodCksYm90dG9tOm9kLmRvYy5lbXUyUHgoYil9KSxcbiAgICBvZmY6KHthdHRyaWJzOnt4LHl9fSk9Pih7eDpvZC5kb2MuZW11MlB4KHgpLHk6b2QuZG9jLmVtdTJQeCh5KX0pLFxuICAgIHRpZHlfeGZybTooe2V4dD17fSxvZmY9e30sIC4uLnRyYW5zZm9ybX0pPT4oey4uLmV4dCwgLi4ub2ZmLCAuLi50cmFuc2Zvcm19KSxcblxuICAgIC4uLnNhbWUoXCJsbixsbkIsbG5SLGxuTCxsblQsbG5UbFRvQnIsbG5CbFRvVHJcIi5zcGxpdChcIixcIikubWFwKGE9Pid0aWR5XycrYSksKHt3LC4uLnByb3BzfSk9Pih7Li4ucHJvcHMsIHc6dyA/IG9kLmRvYy5lbXUyUHgodykgOiB1bmRlZmluZWR9KSksXG4gICAgLi4uc2FtZShcImxlZnQscmlnaHQsdG9wLGJvdHRvbVwiLnNwbGl0KFwiLFwiKS5tYXAoYT0+J3RpZHlfJythKSwoe2xufSk9PmxuKSxcbiAgICB0aWR5X3RjVHhTdHlsZTooe2NvbG9yLC4uLnByb3BzfSk9Pih7Li4ucHJvcHMsIHNvbGlkRmlsbDpjb2xvcn0pLFxuXG4gICAgdGlkeV9sblJlZjooe2lkeCwuLi5waH0pPT5vZC50aGVtZS5sblJlZihpZHgscGgpLFxuICAgIHRpZHlfZmlsbFJlZjooe2lkeCwuLi5waH0pPT5vZC50aGVtZS5maWxsUmVmKGlkeCxwaCksXG4gICAgdGlkeV9lZmZlY3RSZWY6KHtpZHgsLi4ucGh9KT0+b2QudGhlbWUuZWZmZWN0UmVmKGlkeCxwaCksXG4gICAgdGlkeV9mb250UmVmOih7aWR4LC4uLnBofSk9Pm9kLnRoZW1lLmZvbnRSZWYoaWR4LHBoKSxcblxuICAgIHRpZHlfbm9BdXRvRml0OigpPT51bmRlZmluZWQsXG4gICAgdGlkeV9ub3JtQXV0b0ZpdDpwcm9wcz0+KHt0eXBlOlwiZm9udFwiLC4uLnByb3BzfSksXG4gICAgdGlkeV9zcEF1dG9GaXQ6cHJvcHM9Pih7dHlwZTpcImJsb2NrXCIsLi4ucHJvcHN9KSxcblxuICAgIG5hbWVzOntcbiAgICAgICAgc2NoZW1lQ2xyOlwiY29sb3JcIiwgc3JnYkNscjpcImNvbG9yXCIsIHN5c0NscjpcImNvbG9yXCIscHJzdENscjpcImNvbG9yXCIsXG4gICAgICAgIHByc3RHZW9tOlwiZ2VvbWV0cnlcIiwgY3VzdEdlb206XCJnZW9tZXRyeVwiLFxuICAgICAgICBsbkI6XCJib3R0b21cIiwgbG5SOlwicmlnaHRcIiwgbG5MOlwibGVmdFwiLCBsblQ6XCJ0b3BcIixcbiAgICAgICAgcm90Olwicm90YXRlXCIsXG4gICAgICAgIHNwQXV0b0ZpdDpcImF1dG9maXRcIixub3JtQXV0b0ZpdDpcImF1dG9maXRcIixub0F1dG9GaXQ6XCJhdXRvZml0XCIsXG4gICAgICAgIGdzTHN0OlwiW11cIlxuICAgIH0sXG5cbiAgICBpbmhlcml0KC4uLmFkZGl0aW9ucyl7XG4gICAgICAgIHJldHVybiBhZGRpdGlvbnMucmVkdWNlKCh7X19maWx0ZXI9XCJcIixuYW1lcz17fSwgLi4ub3RoZXJzfSwge19fZmlsdGVyOl9maWx0ZXI9XCJcIixuYW1lczpfbmFtZXM9e30sIC4uLl9vdGhlcnN9KT0+e1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5vdGhlcnMsXG4gICAgICAgICAgICAgICAgLi4uX290aGVycyxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpbX19maWx0ZXIsX2ZpbHRlcl0uZmlsdGVyKGE9PiEhYSkuam9pbihcIixcIiksXG4gICAgICAgICAgICAgICAgbmFtZXM6ey4uLm5hbWVzLCAuLi5fbmFtZXN9LFxuICAgICAgICAgICAgfVxuICAgICAgICB9LHRoaXMpXG4gICAgfVxufSlcblxuY29uc3Qgc2FtZT0oa2V5cyxmeCk9PmtleXMucmVkdWNlKChmcywgayk9Pihmc1trXT1meCwgZnMpLHt9KVxuIl19