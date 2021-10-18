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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RyYXdtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJfX2ZpbHRlciIsImlkIiwidW5kZWZpbmVkIiwic2FtZSIsInNwbGl0IiwiYXR0cmlicyIsInR5cGVmYWNlIiwib2QiLCJ0aGVtZSIsImZvbnQiLCJ2YWwiLCJwYXJzZUludCIsInRpZHlfc2NoZW1lQ2xyIiwiZWZmZWN0IiwiZG9jIiwiYXNDb2xvciIsImNvbG9yIiwidGlkeV9zcmdiQ2xyIiwidGlkeV9wcnN0Q2xyIiwic3lzQ2xyIiwidGlkeV9zb2xpZEZpbGwiLCJyb3QiLCJ2IiwiYmxpcCIsIm4iLCJlbWJlZCIsInVybCIsInBhcnQiLCIkIiwiUGFydCIsImdldFJlbCIsInByc3RHZW9tIiwieCIsInByc3QiLCJwYXRoTHN0IiwiY2hpbGRyZW4iLCJweCIsImVtdTJQeCIsImZpbHRlciIsImEiLCJuYW1lIiwicmVkdWNlIiwiZCIsInBhdGgiLCJmb3JFYWNoIiwicG9wIiwicHVzaCIsInkiLCJqb2luIiwidGlkeV9jdXN0R2VvbSIsImx2bCIsInNwY1B0cyIsInB0MlB4IiwidGlkeV9zcGNBZnQiLCJ0aWR5X3NwY0JlZiIsImJ1Rm9udCIsImJ1Q2hhciIsImNoYXIiLCJidVN6UHRzIiwiYnVTelBjdCIsImJ1QXV0b051bSIsInRpZHlfYnVDbHIiLCJpbmRlbnQiLCJtYXJMIiwibWFyUiIsIm1hclQiLCJtYXJCIiwibElucyIsInJJbnMiLCJiSW5zIiwidElucyIsImRpc3RMIiwiZGlzdFIiLCJkaXN0VCIsImRpc3RCIiwiZXh0IiwiY3giLCJjeSIsIndpZHRoIiwiaGVpZ2h0IiwiZXh0ZW50IiwiZWZmZWN0RXh0ZW50IiwibCIsInQiLCJyIiwiYiIsImxlZnQiLCJyaWdodCIsInRvcCIsImJvdHRvbSIsIm9mZiIsInRpZHlfeGZybSIsInRyYW5zZm9ybSIsIm1hcCIsInciLCJwcm9wcyIsImxuIiwidGlkeV90Y1R4U3R5bGUiLCJzb2xpZEZpbGwiLCJ0aWR5X2xuUmVmIiwiaWR4IiwicGgiLCJsblJlZiIsInRpZHlfZmlsbFJlZiIsImZpbGxSZWYiLCJ0aWR5X2VmZmVjdFJlZiIsImVmZmVjdFJlZiIsInRpZHlfZm9udFJlZiIsImZvbnRSZWYiLCJ0aWR5X25vQXV0b0ZpdCIsInRpZHlfbm9ybUF1dG9GaXQiLCJ0eXBlIiwidGlkeV9zcEF1dG9GaXQiLCJuYW1lcyIsInNjaGVtZUNsciIsInNyZ2JDbHIiLCJwcnN0Q2xyIiwiY3VzdEdlb20iLCJsbkIiLCJsblIiLCJsbkwiLCJsblQiLCJzcEF1dG9GaXQiLCJub3JtQXV0b0ZpdCIsIm5vQXV0b0ZpdCIsImdzTHN0IiwiaW5oZXJpdCIsImFkZGl0aW9ucyIsIl9maWx0ZXIiLCJfbmFtZXMiLCJfb3RoZXJzIiwib3RoZXJzIiwia2V5cyIsImZ4IiwiZnMiLCJrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7Ozs7OztrQkFFZTtBQUFBO0FBQ1hBLGtCQUFTLGtCQURFO0FBRVhDLFlBQUc7QUFBQSxtQkFBSUMsU0FBSjtBQUFBO0FBRlEsT0FHUkMsS0FBSyxjQUFjQyxLQUFkLENBQW9CLEdBQXBCLENBQUwsRUFBOEI7QUFBQSx5Q0FBRUMsT0FBRixDQUFXQyxRQUFYO0FBQUEsWUFBV0EsUUFBWCx5Q0FBb0IsRUFBcEI7QUFBQSxlQUEyQkMsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQWNILFFBQWQsQ0FBM0I7QUFBQSxLQUE5QixDQUhRLEVBS1JILEtBQUssMkJBQTJCQyxLQUEzQixDQUFpQyxHQUFqQyxDQUFMLEVBQTJDO0FBQUEsWUFBV00sR0FBWCxTQUFFTCxPQUFGLENBQVdLLEdBQVg7QUFBQSxlQUFtQkMsU0FBU0QsR0FBVCxJQUFjLE1BQWpDO0FBQUEsS0FBM0MsQ0FMUTtBQU1YRSx3QkFBZTtBQUFBLGdCQUFFRixHQUFGLFNBQUVBLEdBQUY7QUFBQSxnQkFBU0csTUFBVDs7QUFBQSxtQkFBbUJOLEdBQUdPLEdBQUgsQ0FBT0MsT0FBUCxDQUFlUixHQUFHQyxLQUFILENBQVNRLEtBQVQsQ0FBZU4sR0FB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QUFVO0FBQUE7O0FBQ2pCLG1CQUFPQSxVQUFVdEYsTUFBVixDQUFpQiwwQkFBd0Y7QUFBQSw2Q0FBbkR6QyxRQUFtRDtBQUFBLG9CQUExQ2dJLE9BQTBDLG1DQUFsQyxFQUFrQztBQUFBLDBDQUEvQmYsS0FBK0I7QUFBQSxvQkFBekJnQixNQUF5QixnQ0FBbEIsRUFBa0I7QUFBQSxvQkFBWEMsT0FBVzs7QUFBQSw2Q0FBdEZsSSxRQUFzRjtBQUFBLG9CQUF0RkEsUUFBc0YsbUNBQTdFLEVBQTZFO0FBQUEsMENBQTFFaUgsS0FBMEU7QUFBQSxvQkFBMUVBLEtBQTBFLGdDQUFwRSxFQUFvRTtBQUFBLG9CQUE3RGtCLE1BQTZEOztBQUM1RyxvQ0FDT0EsTUFEUCxFQUVPRCxPQUZQO0FBR0lsSSw4QkFBUyxDQUFDQSxRQUFELEVBQVVnSSxPQUFWLEVBQW1CMUYsTUFBbkIsQ0FBMEI7QUFBQSwrQkFBRyxDQUFDLENBQUNDLENBQUw7QUFBQSxxQkFBMUIsRUFBa0NTLElBQWxDLENBQXVDLEdBQXZDLENBSGI7QUFJSWlFLHdDQUFVQSxLQUFWLEVBQW9CZ0IsTUFBcEI7QUFKSjtBQU1ILGFBUE0sRUFPTCxJQVBLLENBQVA7QUFRSDtBQXpIVTtBQUFBLEM7O0FBNEhmLElBQU05SCxPQUFLLFNBQUxBLElBQUssQ0FBQ2lJLElBQUQsRUFBTUMsRUFBTjtBQUFBLFdBQVdELEtBQUszRixNQUFMLENBQVksVUFBQzZGLEVBQUQsRUFBS0MsQ0FBTDtBQUFBLGVBQVVELEdBQUdDLENBQUgsSUFBTUYsRUFBTixFQUFVQyxFQUFwQjtBQUFBLEtBQVosRUFBb0MsRUFBcEMsQ0FBWDtBQUFBLENBQVgiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXG5cbmV4cG9ydCBkZWZhdWx0IG9kPT4oe1xuICAgIF9fZmlsdGVyOlwiOm5vdChhXFxcXDpleHRMc3QpXCIsXG4gICAgaWQ6KCk9PnVuZGVmaW5lZCxcbiAgICAuLi5zYW1lKFwibGF0aW4sZWEsY3NcIi5zcGxpdChcIixcIiksKHthdHRyaWJzOnt0eXBlZmFjZT1cIlwifX0pPT5vZC50aGVtZS5mb250KHR5cGVmYWNlKSksXG4gICAgLy9zejp2PT5vZC5kb2MucHQyUHgocGFyc2VJbnQodikvMTAwKSxcbiAgICAuLi5zYW1lKFwibHVtTW9kLGx1bU9mZix0aW50LHNoYWRlXCIuc3BsaXQoXCIsXCIpLCh7YXR0cmliczp7dmFsfX0pPT5wYXJzZUludCh2YWwpLzEwMDAwMCksXG4gICAgdGlkeV9zY2hlbWVDbHI6KHt2YWwsLi4uZWZmZWN0fSk9Pm9kLmRvYy5hc0NvbG9yKG9kLnRoZW1lLmNvbG9yKHZhbCksZWZmZWN0KSxcbiAgICB0aWR5X3NyZ2JDbHI6KHt2YWwsLi4uZWZmZWN0fSk9Pm9kLmRvYy5hc0NvbG9yKHZhbCxlZmZlY3QpLFxuICAgIHRpZHlfcHJzdENscjooe3ZhbCwuLi5lZmZlY3R9KT0+b2QuZG9jLmFzQ29sb3IodmFsLGVmZmVjdCksXG4gICAgc3lzQ2xyOih7YXR0cmliczp7dmFsfX0pPT52YWwsXG4gICAgdGlkeV9zb2xpZEZpbGw6KHtjb2xvcn0pPT5jb2xvcixcbiAgICByb3Q6dj0+cGFyc2VJbnQodikvNjAwMDAsXG5cbiAgICBibGlwOm49PntcbiAgICAgICAgY29uc3Qge2F0dHJpYnM6e1wicjplbWJlZFwiOmVtYmVkLCBcInI6bGlua1wiOnVybH19PW5cbiAgICAgICAgaWYodXJsKVxuICAgICAgICAgICAgcmV0dXJuIHt1cmx9XG4gICAgICAgIGNvbnN0IHBhcnQ9b2QuJChuKS5wYXJ0KClcbiAgICAgICAgcmV0dXJuIG5ldyBQYXJ0KHBhcnQsb2QuZG9jKS5nZXRSZWwoZW1iZWQpXG4gICAgfSxcblxuICAgIHByc3RHZW9tKHgpe1xuXHRcdHJldHVybiB4LmF0dHJpYnMucHJzdFxuXHR9LFxuXHRwYXRoTHN0KHtjaGlsZHJlbn0pe1xuXHRcdGNvbnN0IHB4PXg9Pm9kLmRvYy5lbXUyUHgoeClcbiAgICAgICAgcmV0dXJuIGNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWU9PVwiYTpwYXRoXCIpXG4gICAgICAgICAgICAucmVkdWNlKChkLHBhdGgpPT57XG4gICAgICAgICAgICAgICAgcGF0aC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICAuZm9yRWFjaChhPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goYS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSl7XG4gICAgICAgICAgICBcdFx0XHRjYXNlICdtb3ZlVG8nOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ00gJytweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueCkrJyAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy55KSlcbiAgICAgICAgICAgIFx0XHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2xuVG8nOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ0wgJytweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueCkrJyAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy55KSlcbiAgICAgICAgICAgIFx0XHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGJyZWFrXG4gICAgICAgICAgICBcdFx0XHRjYXNlICdjdWJpY0JlelRvJzpcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKCdMICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLngpKycgJytweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueSkpXG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnUSAnK3B4KGEuY2hpbGRyZW5bMV0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblsxXS5hdHRyaWJzLnkpXG4gICAgICAgICAgICBcdFx0XHRcdFx0KycgJytweChhLmNoaWxkcmVuWzJdLmF0dHJpYnMueCkrJyAnK3B4KGEuY2hpbGRyZW5bMl0uYXR0cmlicy55KSlcbiAgICAgICAgICAgIFx0XHRcdGJyZWFrXG4gICAgICAgICAgICBcdFx0XHRjYXNlICdhcmNUbyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaChgQWApXG4gICAgICAgICAgICBcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0Y2FzZSAnY2xvc2UnOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ1onKVxuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZFxuICAgICAgICAgICAgfSxbXSkuam9pbihcIiBcIilcblx0fSxcbiAgICB0aWR5X2N1c3RHZW9tOih7cGF0aExzdH0pPT5wYXRoTHN0LFxuXG4gICAgbHZsOnY9PnBhcnNlSW50KHYpLFxuICAgIHNwY1B0czooe2F0dHJpYnM6e3ZhbH19KT0+b2QuZG9jLnB0MlB4KHBhcnNlSW50KHZhbCkvMTAwKSxcbiAgICB0aWR5X3NwY0FmdDooe3NwY1B0czphfSk9PmEsXG4gICAgdGlkeV9zcGNCZWY6KHtzcGNQdHM6YX0pPT5hLFxuXG4gICAgYnVGb250Oih7YXR0cmliczp7dHlwZWZhY2V9fSk9Pm9kLnRoZW1lLmZvbnQodHlwZWZhY2UpLFxuICAgIGJ1Q2hhcjooe2F0dHJpYnM6e2NoYXJ9fSk9PmNoYXIsXG4gICAgYnVTelB0czooe2F0dHJpYnM6e3ZhbH19KT0+b2QuZG9jLnB0MlB4KHBhcnNlSW50KHZhbCkvMTAwKSxcbiAgICBidVN6UGN0Oih7YXR0cmliczp7dmFsfX0pPT5wYXJzZUludCh2YWwpLzEwMDAvMTAwLFxuICAgIGJ1QXV0b051bTooe2F0dHJpYnN9KT0+KHsuLi5hdHRyaWJzfSksXG4gICAgdGlkeV9idUNscjooe2NvbG9yfSk9PmNvbG9yLFxuXG4gICAgaW5kZW50OnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgbWFyTDp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIG1hclI6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBtYXJUOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgbWFyQjp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIFxuICAgIGxJbnM6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBySW5zOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgYkluczp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIHRJbnM6dj0+b2QuZG9jLmVtdTJQeCh2KSxcblxuICAgIGRpc3RMOnY9Pm9kLmRvYy5lbXUyUHgodiksXG4gICAgZGlzdFI6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBkaXN0VDp2PT5vZC5kb2MuZW11MlB4KHYpLFxuICAgIGRpc3RCOnY9Pm9kLmRvYy5lbXUyUHgodiksXG5cbiAgICBleHQ6KHthdHRyaWJzOntjeCxjeX19KT0+KHt3aWR0aDpvZC5kb2MuZW11MlB4KGN4KSxoZWlnaHQ6b2QuZG9jLmVtdTJQeChjeSl9KSxcbiAgICBleHRlbnQ6KHthdHRyaWJzOntjeCxjeX19KT0+KHt3aWR0aDpvZC5kb2MuZW11MlB4KGN4KSxoZWlnaHQ6b2QuZG9jLmVtdTJQeChjeSl9KSxcbiAgICBlZmZlY3RFeHRlbnQ6KHthdHRyaWJzOntsLHQscixifX0pPT4oe2xlZnQ6b2QuZG9jLmVtdTJQeChsKSxyaWdodDpvZC5kb2MuZW11MlB4KHIpLHRvcDpvZC5kb2MuZW11MlB4KHQpLGJvdHRvbTpvZC5kb2MuZW11MlB4KGIpfSksXG4gICAgb2ZmOih7YXR0cmliczp7eCx5fX0pPT4oe3g6b2QuZG9jLmVtdTJQeCh4KSx5Om9kLmRvYy5lbXUyUHgoeSl9KSxcbiAgICB0aWR5X3hmcm06KHtleHQ9e30sb2ZmPXt9LCAuLi50cmFuc2Zvcm19KT0+KHsuLi5leHQsIC4uLm9mZiwgLi4udHJhbnNmb3JtfSksXG5cbiAgICAuLi5zYW1lKFwibG4sbG5CLGxuUixsbkwsbG5ULGxuVGxUb0JyLGxuQmxUb1RyXCIuc3BsaXQoXCIsXCIpLm1hcChhPT4ndGlkeV8nK2EpLCh7dywuLi5wcm9wc30pPT4oey4uLnByb3BzLCB3OncgPyBvZC5kb2MuZW11MlB4KHcpIDogdW5kZWZpbmVkfSkpLFxuICAgIC4uLnNhbWUoXCJsZWZ0LHJpZ2h0LHRvcCxib3R0b21cIi5zcGxpdChcIixcIikubWFwKGE9Pid0aWR5XycrYSksKHtsbn0pPT5sbiksXG4gICAgdGlkeV90Y1R4U3R5bGU6KHtjb2xvciwuLi5wcm9wc30pPT4oey4uLnByb3BzLCBzb2xpZEZpbGw6Y29sb3J9KSxcblxuICAgIHRpZHlfbG5SZWY6KHtpZHgsLi4ucGh9KT0+b2QudGhlbWUubG5SZWYoaWR4LHBoKSxcbiAgICB0aWR5X2ZpbGxSZWY6KHtpZHgsLi4ucGh9KT0+b2QudGhlbWUuZmlsbFJlZihpZHgscGgpLFxuICAgIHRpZHlfZWZmZWN0UmVmOih7aWR4LC4uLnBofSk9Pm9kLnRoZW1lLmVmZmVjdFJlZihpZHgscGgpLFxuICAgIHRpZHlfZm9udFJlZjooe2lkeCwuLi5waH0pPT5vZC50aGVtZS5mb250UmVmKGlkeCxwaCksXG5cbiAgICB0aWR5X25vQXV0b0ZpdDooKT0+dW5kZWZpbmVkLFxuICAgIHRpZHlfbm9ybUF1dG9GaXQ6cHJvcHM9Pih7dHlwZTpcImZvbnRcIiwuLi5wcm9wc30pLFxuICAgIHRpZHlfc3BBdXRvRml0OnByb3BzPT4oe3R5cGU6XCJibG9ja1wiLC4uLnByb3BzfSksXG5cbiAgICBuYW1lczp7XG4gICAgICAgIHNjaGVtZUNscjpcImNvbG9yXCIsIHNyZ2JDbHI6XCJjb2xvclwiLCBzeXNDbHI6XCJjb2xvclwiLHByc3RDbHI6XCJjb2xvclwiLFxuICAgICAgICBwcnN0R2VvbTpcImdlb21ldHJ5XCIsIGN1c3RHZW9tOlwiZ2VvbWV0cnlcIixcbiAgICAgICAgbG5COlwiYm90dG9tXCIsIGxuUjpcInJpZ2h0XCIsIGxuTDpcImxlZnRcIiwgbG5UOlwidG9wXCIsXG4gICAgICAgIHJvdDpcInJvdGF0ZVwiLFxuICAgICAgICBzcEF1dG9GaXQ6XCJhdXRvZml0XCIsbm9ybUF1dG9GaXQ6XCJhdXRvZml0XCIsbm9BdXRvRml0OlwiYXV0b2ZpdFwiLFxuICAgICAgICBnc0xzdDpcIltdXCJcbiAgICB9LFxuXG4gICAgaW5oZXJpdCguLi5hZGRpdGlvbnMpe1xuICAgICAgICByZXR1cm4gYWRkaXRpb25zLnJlZHVjZSgoe19fZmlsdGVyPVwiXCIsbmFtZXM9e30sIC4uLm90aGVyc30sIHtfX2ZpbHRlcjpfZmlsdGVyPVwiXCIsbmFtZXM6X25hbWVzPXt9LCAuLi5fb3RoZXJzfSk9PntcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ub3RoZXJzLFxuICAgICAgICAgICAgICAgIC4uLl9vdGhlcnMsXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6W19fZmlsdGVyLF9maWx0ZXJdLmZpbHRlcihhPT4hIWEpLmpvaW4oXCIsXCIpLFxuICAgICAgICAgICAgICAgIG5hbWVzOnsuLi5uYW1lcywgLi4uX25hbWVzfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSx0aGlzKVxuICAgIH1cbn0pXG5cbmNvbnN0IHNhbWU9KGtleXMsZngpPT5rZXlzLnJlZHVjZSgoZnMsIGspPT4oZnNba109ZngsIGZzKSx7fSlcbiJdfQ==