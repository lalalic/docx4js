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
    sysClr: function sysClr(_ref5) {
      var val = _ref5.attribs.val;
      return val;
    },
    tidy_solidFill: function tidy_solidFill(_ref6) {
      var color = _ref6.color;
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
    pathLst: function pathLst(_ref7) {
      var children = _ref7.children;

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
            case "moveTo":
              d.push("M " + px(a.children[0].attribs.x) + " " + px(a.children[0].attribs.y));
              break;
            case "lnTo":
              d.push("L " + px(a.children[0].attribs.x) + " " + px(a.children[0].attribs.y));
              break;
              break;
            case "cubicBezTo":
              d.push("L " + px(a.children[0].attribs.x) + " " + px(a.children[0].attribs.y));
              d.push("Q " + px(a.children[1].attribs.x) + " " + px(a.children[1].attribs.y) + " " + px(a.children[2].attribs.x) + " " + px(a.children[2].attribs.y));
              break;
            case "arcTo":
              d.push("A");
              break;
            case "close":
              d.push("Z");
              break;
          }
        });
        return d;
      }, []).join(" ");
    },

    tidy_custGeom: function tidy_custGeom(_ref8) {
      var pathLst = _ref8.pathLst;
      return pathLst;
    },

    lvl: function lvl(v) {
      return parseInt(v);
    },
    spcPts: function spcPts(_ref9) {
      var val = _ref9.attribs.val;
      return od.doc.pt2Px(parseInt(val) / 100);
    },
    tidy_spcAft: function tidy_spcAft(_ref10) {
      var a = _ref10.spcPts;
      return a;
    },
    tidy_spcBef: function tidy_spcBef(_ref11) {
      var a = _ref11.spcPts;
      return a;
    },

    buFont: function buFont(_ref12) {
      var typeface = _ref12.attribs.typeface;
      return typeface;
    },
    buChar: function buChar(_ref13) {
      var char = _ref13.attribs.char;
      return char;
    },
    buSzPts: function buSzPts(_ref14) {
      var val = _ref14.attribs.val;
      return od.doc.pt2Px(parseInt(val) / 100);
    },
    buSzPct: function buSzPct(_ref15) {
      var val = _ref15.attribs.val;
      return parseInt(val) / 1000 / 100;
    },
    buAutoNum: function buAutoNum(_ref16) {
      var attribs = _ref16.attribs;
      return _extends({}, attribs);
    },
    tidy_buClr: function tidy_buClr(_ref17) {
      var color = _ref17.color;
      return color;
    },

    indent: function indent(v) {
      return od.doc.emu2Px(v);
    },
    marL: function marL(v) {
      return od.doc.emu2Px(v);
    },

    ext: function ext(_ref18) {
      var _ref18$attribs = _ref18.attribs,
          cx = _ref18$attribs.cx,
          cy = _ref18$attribs.cy;
      return {
        width: od.doc.emu2Px(cx),
        height: od.doc.emu2Px(cy)
      };
    },
    off: function off(_ref19) {
      var _ref19$attribs = _ref19.attribs,
          x = _ref19$attribs.x,
          y = _ref19$attribs.y;
      return {
        x: od.doc.emu2Px(x),
        y: od.doc.emu2Px(y)
      };
    },
    tidy_xfrm: function tidy_xfrm(_ref20) {
      var _ref20$ext = _ref20.ext,
          ext = _ref20$ext === undefined ? {} : _ref20$ext,
          _ref20$off = _ref20.off,
          off = _ref20$off === undefined ? {} : _ref20$off,
          transform = _objectWithoutProperties(_ref20, ["ext", "off"]);

      return _extends({}, ext, off, transform);
    }

  }, same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(function (a) {
    return "tidy_" + a;
  }), function (_ref21) {
    var w = _ref21.w,
        props = _objectWithoutProperties(_ref21, ["w"]);

    return _extends({}, props, { w: od.doc.emu2Px(w) });
  }), same("left,right,top,bottom".split(",").map(function (a) {
    return "tidy_" + a;
  }), function (_ref22) {
    var ln = _ref22.ln;
    return ln;
  }), {
    tidy_tcTxStyle: function tidy_tcTxStyle(_ref23) {
      var color = _ref23.color,
          props = _objectWithoutProperties(_ref23, ["color"]);

      return _extends({}, props, { solidFill: color });
    },

    tidy_lnRef: function tidy_lnRef(_ref24) {
      var idx = _ref24.idx,
          ph = _objectWithoutProperties(_ref24, ["idx"]);

      return od.theme.lnRef(idx, ph);
    },
    tidy_fillRef: function tidy_fillRef(_ref25) {
      var idx = _ref25.idx,
          ph = _objectWithoutProperties(_ref25, ["idx"]);

      return od.theme.fillRef(idx, ph);
    },
    tidy_EffectRef: function tidy_EffectRef(_ref26) {
      var idx = _ref26.idx,
          ph = _objectWithoutProperties(_ref26, ["idx"]);

      return od.theme.effectRef(idx, ph);
    },
    tidy_fontRef: function tidy_fontRef(_ref27) {
      var idx = _ref27.idx,
          ph = _objectWithoutProperties(_ref27, ["idx"]);

      return od.theme.fontRef(idx, ph);
    },

    names: {
      schemeClr: "color",
      srgbClr: "color",
      sysClr: "color",
      prstGeom: "geometry",
      custGeom: "geometry",
      lnB: "bottom",
      lnR: "right",
      lnL: "left",
      lnT: "top",
      rot: "rotate"
    }
  });
};

var same = function same(keys, fx) {
  return keys.reduce(function (fs, k) {
    return fs[k] = fx, fs;
  }, {});
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RyYXdtbC9pbmRleC5qcyJdLCJuYW1lcyI6WyJvZCIsImZpbHRlciIsImlkIiwidW5kZWZpbmVkIiwic2FtZSIsInNwbGl0IiwiYXR0cmlicyIsInR5cGVmYWNlIiwidGhlbWUiLCJmb250IiwidmFsIiwicGFyc2VJbnQiLCJ0aWR5X3NjaGVtZUNsciIsImVmZmVjdCIsImRvYyIsImFzQ29sb3IiLCJjb2xvciIsInRpZHlfc3JnYkNsciIsInN5c0NsciIsInRpZHlfc29saWRGaWxsIiwicm90IiwidiIsImJsaXAiLCJuIiwiZW1iZWQiLCJ1cmwiLCJwYXJ0IiwiJCIsImdldFJlbCIsInByc3RHZW9tIiwieCIsInByc3QiLCJwYXRoTHN0IiwiY2hpbGRyZW4iLCJweCIsImVtdTJQeCIsImEiLCJuYW1lIiwicmVkdWNlIiwiZCIsInBhdGgiLCJmb3JFYWNoIiwicG9wIiwicHVzaCIsInkiLCJqb2luIiwidGlkeV9jdXN0R2VvbSIsImx2bCIsInNwY1B0cyIsInB0MlB4IiwidGlkeV9zcGNBZnQiLCJ0aWR5X3NwY0JlZiIsImJ1Rm9udCIsImJ1Q2hhciIsImNoYXIiLCJidVN6UHRzIiwiYnVTelBjdCIsImJ1QXV0b051bSIsInRpZHlfYnVDbHIiLCJpbmRlbnQiLCJtYXJMIiwiZXh0IiwiY3giLCJjeSIsIndpZHRoIiwiaGVpZ2h0Iiwib2ZmIiwidGlkeV94ZnJtIiwidHJhbnNmb3JtIiwibWFwIiwidyIsInByb3BzIiwibG4iLCJ0aWR5X3RjVHhTdHlsZSIsInNvbGlkRmlsbCIsInRpZHlfbG5SZWYiLCJpZHgiLCJwaCIsImxuUmVmIiwidGlkeV9maWxsUmVmIiwiZmlsbFJlZiIsInRpZHlfRWZmZWN0UmVmIiwiZWZmZWN0UmVmIiwidGlkeV9mb250UmVmIiwiZm9udFJlZiIsIm5hbWVzIiwic2NoZW1lQ2xyIiwic3JnYkNsciIsImN1c3RHZW9tIiwibG5CIiwibG5SIiwibG5MIiwibG5UIiwia2V5cyIsImZ4IiwiZnMi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QUFIO0FBQUEsVUFBV0MsRUFBWDs7QUFBQSxhQUFvQjdFLEdBQUdRLEtBQUgsQ0FBUzBFLFNBQVQsQ0FBbUJOLEdBQW5CLEVBQXdCQyxFQUF4QixDQUFwQjtBQUFBLEtBaklIO0FBa0liTSxrQkFBYztBQUFBLFVBQUdQLEdBQUgsVUFBR0EsR0FBSDtBQUFBLFVBQVdDLEVBQVg7O0FBQUEsYUFBb0I3RSxHQUFHUSxLQUFILENBQVM0RSxPQUFULENBQWlCUixHQUFqQixFQUFzQkMsRUFBdEIsQ0FBcEI7QUFBQSxLQWxJRDs7QUFvSWJRLFdBQU87QUFDTEMsaUJBQVcsT0FETjtBQUVMQyxlQUFTLE9BRko7QUFHTHJFLGNBQVEsT0FISDtBQUlMVyxnQkFBVSxVQUpMO0FBS0wyRCxnQkFBVSxVQUxMO0FBTUxDLFdBQUssUUFOQTtBQU9MQyxXQUFLLE9BUEE7QUFRTEMsV0FBSyxNQVJBO0FBU0xDLFdBQUssS0FUQTtBQVVMeEUsV0FBSztBQVZBO0FBcElNO0FBQUEsQzs7QUFrSmYsSUFBTWhCLE9BQU8sU0FBUEEsSUFBTyxDQUFDeUYsSUFBRCxFQUFPQyxFQUFQO0FBQUEsU0FBY0QsS0FBS3ZELE1BQUwsQ0FBWSxVQUFDeUQsRUFBRCxFQUFLQyxDQUFMO0FBQUEsV0FBYUQsR0FBR0MsQ0FBSCxJQUFRRixFQUFULEVBQWNDLEVBQTFCO0FBQUEsR0FBWixFQUEyQyxFQUEzQyxDQUFkO0FBQUEsQ0FBYiIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJ0IGZyb20gXCIuLi9wYXJ0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IChvZCkgPT4gKHtcbiAgZmlsdGVyOiBcIjpub3QoYVxcXFw6ZXh0THN0KVwiLFxuICBpZDogKCkgPT4gdW5kZWZpbmVkLFxuICAuLi5zYW1lKFwibGF0aW4sZWEsY3NcIi5zcGxpdChcIixcIiksICh7IGF0dHJpYnM6IHsgdHlwZWZhY2UgPSBcIlwiIH0gfSkgPT5cbiAgICBvZC50aGVtZS5mb250KHR5cGVmYWNlKVxuICApLFxuXG4gIC4uLnNhbWUoXG4gICAgXCJsdW1Nb2QsbHVtT2ZmLHRpbnQsc2hhZGVcIi5zcGxpdChcIixcIiksXG4gICAgKHsgYXR0cmliczogeyB2YWwgfSB9KSA9PiBwYXJzZUludCh2YWwpIC8gMTAwMDAwXG4gICksXG4gIHRpZHlfc2NoZW1lQ2xyOiAoeyB2YWwsIC4uLmVmZmVjdCB9KSA9PlxuICAgIG9kLmRvYy5hc0NvbG9yKG9kLnRoZW1lLmNvbG9yKHZhbCksIGVmZmVjdCksXG4gIHRpZHlfc3JnYkNscjogKHsgdmFsLCAuLi5lZmZlY3QgfSkgPT4gb2QuZG9jLmFzQ29sb3IodmFsLCBlZmZlY3QpLFxuICBzeXNDbHI6ICh7IGF0dHJpYnM6IHsgdmFsIH0gfSkgPT4gdmFsLFxuICB0aWR5X3NvbGlkRmlsbDogKHsgY29sb3IgfSkgPT4gY29sb3IsXG4gIHJvdDogKHYpID0+IHBhcnNlSW50KHYpIC8gNjAwMDAsXG5cbiAgYmxpcDogKG4pID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBhdHRyaWJzOiB7IFwicjplbWJlZFwiOiBlbWJlZCwgXCJyOmxpbmtcIjogdXJsIH0sXG4gICAgfSA9IG47XG4gICAgaWYgKHVybCkgcmV0dXJuIHsgdXJsIH07XG4gICAgY29uc3QgcGFydCA9IG9kLiQobikucGFydCgpO1xuICAgIHJldHVybiBuZXcgUGFydChwYXJ0LCBvZC5kb2MpLmdldFJlbChlbWJlZCk7XG4gIH0sXG5cbiAgcHJzdEdlb20oeCkge1xuICAgIHJldHVybiB4LmF0dHJpYnMucHJzdDtcbiAgfSxcbiAgcGF0aExzdCh7IGNoaWxkcmVuIH0pIHtcbiAgICBjb25zdCBweCA9ICh4KSA9PiBvZC5kb2MuZW11MlB4KHgpO1xuICAgIHJldHVybiBjaGlsZHJlblxuICAgICAgLmZpbHRlcigoYSkgPT4gYS5uYW1lID09IFwiYTpwYXRoXCIpXG4gICAgICAucmVkdWNlKChkLCBwYXRoKSA9PiB7XG4gICAgICAgIHBhdGguY2hpbGRyZW5cbiAgICAgICAgICAuZmlsdGVyKChhKSA9PiBhLm5hbWUpXG4gICAgICAgICAgLmZvckVhY2goKGEpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoYS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKSkge1xuICAgICAgICAgICAgICBjYXNlIFwibW92ZVRvXCI6XG4gICAgICAgICAgICAgICAgZC5wdXNoKFxuICAgICAgICAgICAgICAgICAgXCJNIFwiICtcbiAgICAgICAgICAgICAgICAgICAgcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLngpICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICBweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwibG5Ub1wiOlxuICAgICAgICAgICAgICAgIGQucHVzaChcbiAgICAgICAgICAgICAgICAgIFwiTCBcIiArXG4gICAgICAgICAgICAgICAgICAgIHB4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImN1YmljQmV6VG9cIjpcbiAgICAgICAgICAgICAgICBkLnB1c2goXG4gICAgICAgICAgICAgICAgICBcIkwgXCIgK1xuICAgICAgICAgICAgICAgICAgICBweChhLmNoaWxkcmVuWzBdLmF0dHJpYnMueCkgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHB4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy55KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgZC5wdXNoKFxuICAgICAgICAgICAgICAgICAgXCJRIFwiICtcbiAgICAgICAgICAgICAgICAgICAgcHgoYS5jaGlsZHJlblsxXS5hdHRyaWJzLngpICtcbiAgICAgICAgICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgICAgICAgICBweChhLmNoaWxkcmVuWzFdLmF0dHJpYnMueSkgK1xuICAgICAgICAgICAgICAgICAgICBcIiBcIiArXG4gICAgICAgICAgICAgICAgICAgIHB4KGEuY2hpbGRyZW5bMl0uYXR0cmlicy54KSArXG4gICAgICAgICAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICAgICAgICAgcHgoYS5jaGlsZHJlblsyXS5hdHRyaWJzLnkpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcImFyY1RvXCI6XG4gICAgICAgICAgICAgICAgZC5wdXNoKGBBYCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICAgIGQucHVzaChcIlpcIik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkO1xuICAgICAgfSwgW10pXG4gICAgICAuam9pbihcIiBcIik7XG4gIH0sXG4gIHRpZHlfY3VzdEdlb206ICh7IHBhdGhMc3QgfSkgPT4gcGF0aExzdCxcblxuICBsdmw6ICh2KSA9PiBwYXJzZUludCh2KSxcbiAgc3BjUHRzOiAoeyBhdHRyaWJzOiB7IHZhbCB9IH0pID0+IG9kLmRvYy5wdDJQeChwYXJzZUludCh2YWwpIC8gMTAwKSxcbiAgdGlkeV9zcGNBZnQ6ICh7IHNwY1B0czogYSB9KSA9PiBhLFxuICB0aWR5X3NwY0JlZjogKHsgc3BjUHRzOiBhIH0pID0+IGEsXG5cbiAgYnVGb250OiAoeyBhdHRyaWJzOiB7IHR5cGVmYWNlIH0gfSkgPT4gdHlwZWZhY2UsXG4gIGJ1Q2hhcjogKHsgYXR0cmliczogeyBjaGFyIH0gfSkgPT4gY2hhcixcbiAgYnVTelB0czogKHsgYXR0cmliczogeyB2YWwgfSB9KSA9PiBvZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKSAvIDEwMCksXG4gIGJ1U3pQY3Q6ICh7IGF0dHJpYnM6IHsgdmFsIH0gfSkgPT4gcGFyc2VJbnQodmFsKSAvIDEwMDAgLyAxMDAsXG4gIGJ1QXV0b051bTogKHsgYXR0cmlicyB9KSA9PiAoeyAuLi5hdHRyaWJzIH0pLFxuICB0aWR5X2J1Q2xyOiAoeyBjb2xvciB9KSA9PiBjb2xvcixcblxuICBpbmRlbnQ6ICh2KSA9PiBvZC5kb2MuZW11MlB4KHYpLFxuICBtYXJMOiAodikgPT4gb2QuZG9jLmVtdTJQeCh2KSxcblxuICBleHQ6ICh7IGF0dHJpYnM6IHsgY3gsIGN5IH0gfSkgPT4gKHtcbiAgICB3aWR0aDogb2QuZG9jLmVtdTJQeChjeCksXG4gICAgaGVpZ2h0OiBvZC5kb2MuZW11MlB4KGN5KSxcbiAgfSksXG4gIG9mZjogKHsgYXR0cmliczogeyB4LCB5IH0gfSkgPT4gKHtcbiAgICB4OiBvZC5kb2MuZW11MlB4KHgpLFxuICAgIHk6IG9kLmRvYy5lbXUyUHgoeSksXG4gIH0pLFxuICB0aWR5X3hmcm06ICh7IGV4dCA9IHt9LCBvZmYgPSB7fSwgLi4udHJhbnNmb3JtIH0pID0+ICh7XG4gICAgLi4uZXh0LFxuICAgIC4uLm9mZixcbiAgICAuLi50cmFuc2Zvcm0sXG4gIH0pLFxuXG4gIC4uLnNhbWUoXG4gICAgXCJsbixsbkIsbG5SLGxuTCxsblQsbG5UbFRvQnIsbG5CbFRvVHJcIi5zcGxpdChcIixcIikubWFwKChhKSA9PiBcInRpZHlfXCIgKyBhKSxcbiAgICAoeyB3LCAuLi5wcm9wcyB9KSA9PiAoeyAuLi5wcm9wcywgdzogb2QuZG9jLmVtdTJQeCh3KSB9KVxuICApLFxuICAuLi5zYW1lKFxuICAgIFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLm1hcCgoYSkgPT4gXCJ0aWR5X1wiICsgYSksXG4gICAgKHsgbG4gfSkgPT4gbG5cbiAgKSxcbiAgdGlkeV90Y1R4U3R5bGU6ICh7IGNvbG9yLCAuLi5wcm9wcyB9KSA9PiAoeyAuLi5wcm9wcywgc29saWRGaWxsOiBjb2xvciB9KSxcblxuICB0aWR5X2xuUmVmOiAoeyBpZHgsIC4uLnBoIH0pID0+IG9kLnRoZW1lLmxuUmVmKGlkeCwgcGgpLFxuICB0aWR5X2ZpbGxSZWY6ICh7IGlkeCwgLi4ucGggfSkgPT4gb2QudGhlbWUuZmlsbFJlZihpZHgsIHBoKSxcbiAgdGlkeV9FZmZlY3RSZWY6ICh7IGlkeCwgLi4ucGggfSkgPT4gb2QudGhlbWUuZWZmZWN0UmVmKGlkeCwgcGgpLFxuICB0aWR5X2ZvbnRSZWY6ICh7IGlkeCwgLi4ucGggfSkgPT4gb2QudGhlbWUuZm9udFJlZihpZHgsIHBoKSxcblxuICBuYW1lczoge1xuICAgIHNjaGVtZUNscjogXCJjb2xvclwiLFxuICAgIHNyZ2JDbHI6IFwiY29sb3JcIixcbiAgICBzeXNDbHI6IFwiY29sb3JcIixcbiAgICBwcnN0R2VvbTogXCJnZW9tZXRyeVwiLFxuICAgIGN1c3RHZW9tOiBcImdlb21ldHJ5XCIsXG4gICAgbG5COiBcImJvdHRvbVwiLFxuICAgIGxuUjogXCJyaWdodFwiLFxuICAgIGxuTDogXCJsZWZ0XCIsXG4gICAgbG5UOiBcInRvcFwiLFxuICAgIHJvdDogXCJyb3RhdGVcIixcbiAgfSxcbn0pO1xuXG5jb25zdCBzYW1lID0gKGtleXMsIGZ4KSA9PiBrZXlzLnJlZHVjZSgoZnMsIGspID0+ICgoZnNba10gPSBmeCksIGZzKSwge30pO1xuIl19