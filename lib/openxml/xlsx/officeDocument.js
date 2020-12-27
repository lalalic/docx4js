"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _officeDocument = require("../officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var A = "A".charCodeAt(0);
//A=>0, Z=>25, AA=>26
function colStrToInt(col) {
    var last = col.substr(-1).charCodeAt(0) - A;
    if (col.length > 1) {
        return 26 * (colStrToInt(col.substring(0, col.length - 1)) + 1) + last;
    }
    return last;
}
//0=>A, 25=>Z, 26=>AA
function colIntToStr(col) {
    var i0 = String.fromCharCode(A + col % 26);
    if (col >= 26) {
        return colIntToStr(parseInt(col / 26) - 1) + i0;
    } else {
        return i0;
    }
}

var OfficeDocument = function (_Base) {
    _inherits(OfficeDocument, _Base);

    function OfficeDocument() {
        _classCallCheck(this, OfficeDocument);

        return _possibleConstructorReturn(this, (OfficeDocument.__proto__ || Object.getPrototypeOf(OfficeDocument)).apply(this, arguments));
    }

    _createClass(OfficeDocument, [{
        key: "_init",
        value: function _init() {
            var _this2 = this;

            _get(OfficeDocument.prototype.__proto__ || Object.getPrototypeOf(OfficeDocument.prototype), "_init", this).call(this);
            var doc = this.doc;
            this._assignRel(["styles", "sharedStrings"]);
            Object.assign(this.sharedStrings, {
                eq: function eq(i) {
                    return this.root().children("sst").children().eq(parseInt(i));
                },

                doc: doc
            });
            Object.assign(this.styles, { identities: this.constructor.identities, doc: doc });
            this.theme.color = function (i) {
                var $ = this("a\\:clrScheme>a\\:" + ColorIndex[parseInt(i)]).children().first();
                return doc.asColor($.attr("lastClr") || $.attr("val"));
            };
            this.color = function (_ref) {
                var _ref$attribs = _ref.attribs,
                    rgb = _ref$attribs.rgb,
                    theme = _ref$attribs.theme,
                    indexed = _ref$attribs.indexed,
                    tint = _ref$attribs.tint;

                var v = rgb && "#" + rgb.substr(2) || theme && _this2.theme.color(theme) || indexed != undefined && "" + XLSIcv[parseInt(indexed)];
                return tint ? _this2.doc.asColor(v, { tint: parseFloat(tint) }) : v;
            };
        }
    }, {
        key: "cellPlainText",
        value: function cellPlainText(sheetIndex, row, col) {
            row = row + 1;
            col = colIntToStr(col);
            var sheet = this.sheet(this.content("sheets>sheet").get(sheetIndex).attribs);
            var s = sheet("worksheet>sheetData>row[r=" + row + "]>c[r='" + col + row + "']>v").text();
            if (s) {
                return this.sharedStrings.eq(s).text();
            }
            return "";
        }
    }, {
        key: "sheet",
        value: function sheet(_ref2) {
            var rid = _ref2["r:id"];

            return this.getRel(rid);
        }
    }, {
        key: "render",
        value: function render(createElement) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            this.renderNode(this.styles("styleSheet").get(0), createElement, identify);
            return this.renderNode(this.content("workbook").get(0), createElement, identify);
        }
    }]);

    return OfficeDocument;
}(_officeDocument2.default);

OfficeDocument.colStrToInt = colStrToInt;
OfficeDocument.colIntToStr = colIntToStr;
OfficeDocument.identities = {
    workbook: function workbook(wXml, officeDocument) {
        var $ = officeDocument.content("sheets");
        var children = $.children("sheet").toArray();
        return {
            type: "workbook",
            children: children
        };
    },
    sst: function sst(_ref3, od) {
        var _ref3$attribs = _ref3.attribs,
            count = _ref3$attribs.count,
            uniqueCount = _ref3$attribs.uniqueCount;

        return { type: "sharedStrings", count: parseInt(count), uniqueCount: parseInt(uniqueCount) };
    },
    sheet: function sheet(wXml, od) {
        var $ = od.sheet(wXml.attribs);

        var _$$get = $("sheetFormatPr").get(0),
            _$$get$attribs = _$$get.attribs,
            baseColWidth = _$$get$attribs.baseColWidth,
            defaultRowHeight = _$$get$attribs.defaultRowHeight;

        var children = $("sheetData>row").toArray();

        var _wXml$attribs = wXml.attribs,
            rId = _wXml$attribs["r:id"],
            props = _objectWithoutProperties(_wXml$attribs, ["r:id"]);

        var colProps = "customWidth,min,max,style,hidden".split(",").reduce(function (o, k) {
            return o[k] = parseInt, o;
        }, {
            width: parseFloat,
            tidy: function tidy(_ref4) {
                var min = _ref4.min,
                    max = _ref4.max,
                    props = _objectWithoutProperties(_ref4, ["min", "max"]);

                return _extends({}, props, { min: min - 1, max: max - 1 });
            }
        });
        return _extends({}, props, {
            type: "sheet",
            children: children,
            cols: $("cols").children().map(function (i, a) {
                return $(a).props(colProps);
            }).get(),
            colWidth: parseFloat(baseColWidth),
            rowHeight: parseFloat(defaultRowHeight),
            view: $("sheetViews>sheetView").props({ xSplit: parseInt, ySplit: parseInt })
        });
    },
    row: function row(wXml, od) {
        var $ = od.$(wXml);
        var _wXml$attribs2 = wXml.attribs,
            customFormat = _wXml$attribs2.customFormat,
            hidden = _wXml$attribs2.hidden,
            s = _wXml$attribs2.s,
            _wXml$attribs2$style = _wXml$attribs2.style,
            style = _wXml$attribs2$style === undefined ? customFormat && parseInt(s) || undefined : _wXml$attribs2$style,
            r = _wXml$attribs2.r,
            customHeight = _wXml$attribs2.customHeight,
            ht = _wXml$attribs2.ht,
            _wXml$attribs2$height = _wXml$attribs2.height,
            height = _wXml$attribs2$height === undefined ? ht && parseFloat(ht) * (od.doc.precision || 1) : _wXml$attribs2$height;

        var children = $.children("c").toArray();
        return { type: "row", children: children, customHeight: customHeight, height: height, i: parseInt(r) - 1, style: style, hidden: hidden };
    },
    c: function c(wXml, od) {
        var _wXml$attribs3 = wXml.attribs,
            r = _wXml$attribs3.r,
            style = _wXml$attribs3.s;

        var children = od.$(wXml).children().toArray();

        var _$exec = /([A-Z]+)(\d+$)/.exec(r),
            _$exec2 = _slicedToArray(_$exec, 3),
            col = _$exec2[1],
            row = _$exec2[2];

        return {
            type: "cell",
            name: "" + (parseInt(row) - 1) + col,
            col: colStrToInt(col),
            row: parseInt(row) - 1,
            children: children,
            style: style != undefined ? parseInt(style) : undefined
        };
    },
    v: function v(wXml, od) {
        var kind = wXml.parent.attribs.t;

        var _wXml$children = _slicedToArray(wXml.children, 1),
            data = _wXml$children[0].data;

        switch (kind) {
            case "i":
                return { type: "paragraph", kind: kind, children: [].concat(_toConsumableArray(wXml.children)) };
            case "s":
                od.$(wXml).empty().append(od.sharedStrings.eq(data).clone().children());
                break;
            default:
                od.$(wXml).empty().append("<r><t>" + data + "</t></r>");
                break;
        }
        wXml.parent.attribs.t = "i";
        return { type: "paragraph", kind: kind, children: [].concat(_toConsumableArray(wXml.children)) };
    },
    is: function is(wXml, od) {
        wXml.name = "v";
        return { type: "paragraph", kind: "is", children: [].concat(_toConsumableArray(wXml.children)) };
    },
    r: function r(wXml, od) {
        var style = od.$(wXml).find(">rPr").props(TextStyle(od));
        return {
            type: "run",
            style: style,
            children: wXml.children.filter(function (_ref5) {
                var name = _ref5.name;
                return name != "rPr";
            })
        };
    },


    //styles
    numFmt: function numFmt(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props());
    },
    cellStyle: function cellStyle(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props());
    },
    xf: function xf(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props(_extends({
            names: {
                wrapText: "wrap",
                horizontal: "align",
                vertical: "vertAlign"
            },
            wrapText: function wrapText(v) {
                return v == "true" || v == "1" ? true : false;
            }
        }, parseInt4Keys("numFmtId,fontId,fillId,borderId,xfId,applyNumberFormat,applyFont,applyFill,applyBorder,applyAlignment"), {
            tidy: function tidy(_ref6) {
                var applyNumberFormat = _ref6.applyNumberFormat,
                    applyFont = _ref6.applyFont,
                    applyFill = _ref6.applyFill,
                    applyBorder = _ref6.applyBorder,
                    applyAlignment = _ref6.applyAlignment,
                    a = _objectWithoutProperties(_ref6, ["applyNumberFormat", "applyFont", "applyFill", "applyBorder", "applyAlignment"]);

                if (applyNumberFormat == 0) delete a.numFmtId;
                if (applyFont == 0) delete a.fontId;
                if (applyFill == 0) delete a.fillId;
                if (applyBorder == 0) delete a.borderId;
                if (applyAlignment == 0) delete a.alignment;
                return a;
            }
        })));
    },
    tableStyle: function tableStyle(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props());
    },
    font: function font(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props(TextStyle(od)));
    },
    fill: function fill(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props({
            bgColor: od.color,
            fgColor: od.color,
            tidy: function tidy(_ref7) {
                var _ref7$patternFill = _ref7.patternFill,
                    background = _ref7$patternFill.fgColor,
                    patternType = _ref7$patternFill.patternType;

                if (patternType == "none") return {};
                if (patternType && patternType.startsWith("gray")) {
                    var r = Number(parseInt(patternType.substring(4))).toString(16);
                    return { background: "#" + r + r + r };
                }
                return { background: background };
            }
        }));
    },
    border: function border(wXml, od) {
        return _extends({ children: null }, od.styles(wXml).props({
            color: od.color,
            tidy_left: tidy_border,
            tidy_right: tidy_border,
            tidy_bottom: tidy_border,
            tidy_top: tidy_border,
            tidy_diagonal: tidy_border
        }));
    }
};
exports.default = OfficeDocument;


var parseInt4Keys = function parseInt4Keys(keys) {
    return keys.split(",").reduce(function (s, k) {
        return s[k] = parseInt, s;
    }, {});
};
var ColorIndex = "lt1,dk1,lt2,dk2,accent1,accent2,accent3,accent4,accent5,accent6,hlink,folHlink".split(",");
var tidy_border = function tidy_border(_ref8) {
    var style = _ref8.style,
        a = _objectWithoutProperties(_ref8, ["style"]);

    switch (style) {
        case "thin":
            a.sz = 1;
            break;
        default:
            break;
    }
    return a;
};
var TextStyle = function TextStyle(od) {
    return {
        filter: ":not(scheme,family,charset)",
        names: {
            rFont: "fonts",
            name: "fonts",
            sz: "size",
            b: "bold",
            i: "italic",
            u: "underline",
            vanish: "hidden"
        },
        rFont: function rFont(_ref9) {
            var val = _ref9.attribs.val;
            return val;
        },
        name: function name(_ref10) {
            var val = _ref10.attribs.val;
            return val;
        },
        b: function b(_ref11) {
            var _ref11$attribs$val = _ref11.attribs.val,
                val = _ref11$attribs$val === undefined ? true : _ref11$attribs$val;
            return !!val;
        },
        i: function i(_ref12) {
            var _ref12$attribs$val = _ref12.attribs.val,
                val = _ref12$attribs$val === undefined ? true : _ref12$attribs$val;
            return !!val;
        },
        u: function u(_ref13) {
            var _ref13$attribs$val = _ref13.attribs.val,
                val = _ref13$attribs$val === undefined ? "single" : _ref13$attribs$val;
            return val;
        },
        vanish: function vanish(_ref14) {
            var _ref14$attribs$val = _ref14.attribs.val,
                val = _ref14$attribs$val === undefined ? true : _ref14$attribs$val;
            return !!val;
        },
        sz: function sz(_ref15) {
            var val = _ref15.attribs.val;
            return od.doc.pt2Px(parseInt(val));
        },

        color: od.color
    };
};

var XLSIcv = ["#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#000000", "#FFFFFF", "#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF", "#800000", "#008000", "#000080", "#808000", "#800080", "#008080", "#C0C0C0", "#808080", "#9999FF", "#993366", "#FFFFCC", "#CCFFFF", "#660066", "#FF8080", "#0066CC", "#CCCCFF", "#000080", "#FF00FF", "#FFFF00", "#00FFFF", "#800080", "#800000", "#008080", "#0000FF", "#00CCFF", "#CCFFFF", "#CCFFCC", "#FFFF99", "#99CCFF", "#FF99CC", "#CC99FF", "#FFCC99", "#3366FF", "#33CCCC", "#99CC00", "#FFCC00", "#FF9900", "#FF6600", "#666699", "#969696", "#003366", "#339966", "#003300", "#333300", "#993300", "#993366", "#333399", "#333333", "#000000", /* "#40 icvForeground ?? */
"#000000", /* "#41 icvBackground ?? */
"#000000", /* "#42 icvFrame ?? */
"#000000", /* "#43 icv3D ?? */
"#000000", /* "#44 icv3DText ?? */
"#000000", /* "#45 icv3DHilite ?? */
"#000000", /* "#46 icv3DShadow ?? */
"#000000", /* "#47 icvHilite ?? */
"#000000", /* "#48 icvCtlText ?? */
"#000000", /* "#49 icvCtlScrl ?? */
"#000000", /* "#4A icvCtlInv ?? */
"#000000", /* "#4B icvCtlBody ?? */
"#000000", /* "#4C icvCtlFrame ?? */
"#000000", /* "#4D icvCtlFore ?? */
"#000000", /* "#4E icvCtlBack ?? */
"#000000", /* "#4F icvCtlNeutral */
"#000000", /* "#50 icvInfoBk ?? */
"#000000" /* "#51 icvInfoText ?? */
];
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3hsc3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQSIsImNoYXJDb2RlQXQiLCJjb2xTdHJUb0ludCIsImNvbCIsImxhc3QiLCJzdWJzdHIiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJjb2xJbnRUb1N0ciIsImkwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicGFyc2VJbnQiLCJPZmZpY2VEb2N1bWVudCIsImRvYyIsIl9hc3NpZ25SZWwiLCJPYmplY3QiLCJhc3NpZ24iLCJzaGFyZWRTdHJpbmdzIiwiZXEiLCJpIiwicm9vdCIsImNoaWxkcmVuIiwic3R5bGVzIiwiaWRlbnRpdGllcyIsImNvbnN0cnVjdG9yIiwidGhlbWUiLCJjb2xvciIsIiQiLCJDb2xvckluZGV4IiwiZmlyc3QiLCJhc0NvbG9yIiwiYXR0ciIsImF0dHJpYnMiLCJyZ2IiLCJpbmRleGVkIiwidGludCIsInYiLCJ1bmRlZmluZWQiLCJYTFNJY3YiLCJwYXJzZUZsb2F0Iiwic2hlZXRJbmRleCIsInJvdyIsInNoZWV0IiwiY29udGVudCIsImdldCIsInMiLCJ0ZXh0IiwicmlkIiwiZ2V0UmVsIiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwiYmluZCIsInJlbmRlck5vZGUiLCJ3b3JrYm9vayIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRvQXJyYXkiLCJ0eXBlIiwic3N0Iiwib2QiLCJjb3VudCIsInVuaXF1ZUNvdW50IiwiYmFzZUNvbFdpZHRoIiwiZGVmYXVsdFJvd0hlaWdodCIsInJJZCIsInByb3BzIiwiY29sUHJvcHMiLCJzcGxpdCIsInJlZHVjZSIsIm8iLCJrIiwid2lkdGgiLCJ0aWR5IiwibWluIiwibWF4IiwiY29scyIsIm1hcCIsImEiLCJjb2xXaWR0aCIsInJvd0hlaWdodCIsInZpZXciLCJ4U3BsaXQiLCJ5U3BsaXQiLCJjdXN0b21Gb3JtYXQiLCJoaWRkZW4iLCJzdHlsZSIsInIiLCJjdXN0b21IZWlnaHQiLCJodCIsImhlaWdodCIsInByZWNpc2lvbiIsImMiLCJleGVjIiwibmFtZSIsImtpbmQiLCJwYXJlbnQiLCJ0IiwiZGF0YSIsImVtcHR5IiwiYXBwZW5kIiwiY2xvbmUiLCJpcyIsImZpbmQiLCJUZXh0U3R5bGUiLCJmaWx0ZXIiLCJudW1GbXQiLCJjZWxsU3R5bGUiLCJ4ZiIsIm5hbWVzIiwid3JhcFRleHQiLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJwYXJzZUludDRLZXlzIiwiYXBwbHlOdW1iZXJGb3JtYXQiLCJhcHBseUZvbnQiLCJhcHBseUZpbGwiLCJhcHBseUJvcmRlciIsImFwcGx5QWxpZ25tZW50IiwibnVtRm10SWQiLCJmb250SWQiLCJmaWxsSWQiLCJib3JkZXJJZCIsImFsaWdubWVudCIsInRhYmxlU3R5bGUiLCJmb250IiwiZmlsbCIsImJnQ29sb3IiLCJmZ0NvbG9yIiwicGF0dGVybkZpbGwiLCJiYWNrZ3JvdW5kIiwicGF0dGVyblR5cGUiLCJzdGFydHNXaXRoIiwiTnVtYmVyIiwidG9TdHJpbmciLCJib3JkZXIiLCJ0aWR5X2xlZnQiLCJ0aWR5X2JvcmRlciIsInRpZHlfcmlnaHQiLCJ0aWR5X2JvdHRvbSIsInRpZHlfdG9wIiwidGlkeV9kaWFnb25hbCIsImtleXMiLCJzeiIsInJGb250IiwiYiIsInUiLCJ2YW5pc2giLCJ2YWwiLCJwdDJQeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLElBQUUsSUFBSUMsVUFBSixDQUFlLENBQWYsQ0FBUjtBQUNBO0FBQ0EsU0FBU0MsV0FBVCxDQUFxQkMsR0FBckIsRUFBeUI7QUFDckIsUUFBTUMsT0FBS0QsSUFBSUUsTUFBSixDQUFXLENBQUMsQ0FBWixFQUFlSixVQUFmLENBQTBCLENBQTFCLElBQTZCRCxDQUF4QztBQUNBLFFBQUdHLElBQUlHLE1BQUosR0FBVyxDQUFkLEVBQWdCO0FBQ1osZUFBTyxNQUFJSixZQUFZQyxJQUFJSSxTQUFKLENBQWMsQ0FBZCxFQUFnQkosSUFB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YyxFQTJFSDtBQUNYLFNBNUVjLEVBNEVIO0FBQ1gsU0E3RWMsRUE2RUg7QUFDWCxTQTlFYyxFQThFSDtBQUNYLFNBL0VjLEVBK0VIO0FBQ1gsU0FoRmMsRUFnRkg7QUFDWCxTQWpGYyxFQWlGSDtBQUNYLFNBbEZjLENBa0ZKO0FBbEZJLENBQWYiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuY29uc3QgQT1cIkFcIi5jaGFyQ29kZUF0KDApXG4vL0E9PjAsIFo9PjI1LCBBQT0+MjZcbmZ1bmN0aW9uIGNvbFN0clRvSW50KGNvbCl7XG4gICAgY29uc3QgbGFzdD1jb2wuc3Vic3RyKC0xKS5jaGFyQ29kZUF0KDApLUFcbiAgICBpZihjb2wubGVuZ3RoPjEpe1xuICAgICAgICByZXR1cm4gMjYqKGNvbFN0clRvSW50KGNvbC5zdWJzdHJpbmcoMCxjb2wubGVuZ3RoLTEpKSsxKStsYXN0XG4gICAgfVxuICAgIHJldHVybiBsYXN0XG59XG4vLzA9PkEsIDI1PT5aLCAyNj0+QUFcbmZ1bmN0aW9uIGNvbEludFRvU3RyKGNvbCl7XG4gICAgY29uc3QgaTA9U3RyaW5nLmZyb21DaGFyQ29kZShBK2NvbCUyNilcbiAgICBpZihjb2w+PTI2KXtcbiAgICAgICAgcmV0dXJuIGNvbEludFRvU3RyKHBhcnNlSW50KGNvbC8yNiktMSkraTBcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGkwXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPZmZpY2VEb2N1bWVudCBleHRlbmRzIEJhc2V7XG4gICAgc3RhdGljIGNvbFN0clRvSW50PWNvbFN0clRvSW50XG4gICAgc3RhdGljIGNvbEludFRvU3RyPWNvbEludFRvU3RyXG4gICAgX2luaXQoKXtcbiAgICAgICAgc3VwZXIuX2luaXQoKVxuICAgICAgICBjb25zdCBkb2M9dGhpcy5kb2NcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFtcInN0eWxlc1wiLFwic2hhcmVkU3RyaW5nc1wiXSlcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnNoYXJlZFN0cmluZ3Mse1xuICAgICAgICAgICAgZXEoaSl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdCgpLmNoaWxkcmVuKFwic3N0XCIpLmNoaWxkcmVuKCkuZXEocGFyc2VJbnQoaSkpXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIGRvYywgXG4gICAgICAgIH0pXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zdHlsZXMse2lkZW50aXRpZXM6dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGl0aWVzLGRvY30pXG4gICAgICAgIHRoaXMudGhlbWUuY29sb3I9ZnVuY3Rpb24oaSl7XG4gICAgICAgICAgICBjb25zdCAkPXRoaXMoYGFcXFxcOmNsclNjaGVtZT5hXFxcXDoke0NvbG9ySW5kZXhbcGFyc2VJbnQoaSldfWApLmNoaWxkcmVuKCkuZmlyc3QoKVxuICAgICAgICAgICAgcmV0dXJuIGRvYy5hc0NvbG9yKCQuYXR0cihcImxhc3RDbHJcIil8fCQuYXR0cihcInZhbFwiKSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbG9yPSh7YXR0cmliczp7cmdiLHRoZW1lLGluZGV4ZWQsdGludH19KT0+e1xuICAgICAgICAgICAgY29uc3Qgdj0ocmdiJiZgIyR7cmdiLnN1YnN0cigyKX1gKXx8KHRoZW1lICYmIHRoaXMudGhlbWUuY29sb3IodGhlbWUpKXx8IChpbmRleGVkIT11bmRlZmluZWQgJiYgYCR7WExTSWN2W3BhcnNlSW50KGluZGV4ZWQpXX1gKVxuICAgICAgICAgICAgcmV0dXJuIHRpbnQgPyB0aGlzLmRvYy5hc0NvbG9yKHYse3RpbnQ6cGFyc2VGbG9hdCh0aW50KX0pIDogdlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2VsbFBsYWluVGV4dChzaGVldEluZGV4LHJvdyxjb2wpe1xuICAgICAgICByb3c9cm93KzFcbiAgICAgICAgY29sPWNvbEludFRvU3RyKGNvbClcbiAgICAgICAgY29uc3Qgc2hlZXQ9dGhpcy5zaGVldCh0aGlzLmNvbnRlbnQoYHNoZWV0cz5zaGVldGApLmdldChzaGVldEluZGV4KS5hdHRyaWJzKVxuICAgICAgICBjb25zdCBzPXNoZWV0KGB3b3Jrc2hlZXQ+c2hlZXREYXRhPnJvd1tyPSR7cm93fV0+Y1tyPScke2NvbH0ke3Jvd30nXT52YCkudGV4dCgpXG4gICAgICAgIGlmKHMpe1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2hhcmVkU3RyaW5ncy5lcShzKS50ZXh0KClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gXCJcIlxuICAgIH1cblxuICAgIHNoZWV0KHtcInI6aWRcIjpyaWR9KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVsKHJpZClcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgdGhpcy5yZW5kZXJOb2RlKHRoaXMuc3R5bGVzKFwic3R5bGVTaGVldFwiKS5nZXQoMCksY3JlYXRlRWxlbWVudCxpZGVudGlmeSlcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJ3b3JrYm9va1wiKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgd29ya2Jvb2sod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KFwic2hlZXRzXCIpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKFwic2hlZXRcIikudG9BcnJheSgpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6XCJ3b3JrYm9va1wiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNzdCh7YXR0cmliczp7Y291bnQsIHVuaXF1ZUNvdW50fX0sb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwic2hhcmVkU3RyaW5nc1wiLGNvdW50OnBhcnNlSW50KGNvdW50KSx1bmlxdWVDb3VudDpwYXJzZUludCh1bmlxdWVDb3VudCl9XG4gICAgICAgIH0sXG4gICAgICAgIHNoZWV0KHdYbWwsIG9kKXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2Quc2hlZXQod1htbC5hdHRyaWJzKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB7YXR0cmliczp7YmFzZUNvbFdpZHRoLGRlZmF1bHRSb3dIZWlnaHR9fT0kKFwic2hlZXRGb3JtYXRQclwiKS5nZXQoMClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQoXCJzaGVldERhdGE+cm93XCIpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qge1wicjppZFwiOnJJZCwuLi5wcm9wc309d1htbC5hdHRyaWJzXG4gICAgICAgICAgICBjb25zdCBjb2xQcm9wcz1cImN1c3RvbVdpZHRoLG1pbixtYXgsc3R5bGUsaGlkZGVuXCIuc3BsaXQoXCIsXCIpLnJlZHVjZSgobyxrKT0+KG9ba109cGFyc2VJbnQsbykse1xuICAgICAgICAgICAgICAgIHdpZHRoOnBhcnNlRmxvYXQsXG4gICAgICAgICAgICAgICAgdGlkeTooe21pbixtYXgsLi4ucHJvcHN9KT0+KHsuLi5wcm9wcyxtaW46bWluLTEsbWF4Om1heC0xfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnByb3BzLFxuICAgICAgICAgICAgICAgIHR5cGU6XCJzaGVldFwiLFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLCBcbiAgICAgICAgICAgICAgICBjb2xzOiAkKFwiY29sc1wiKS5jaGlsZHJlbigpLm1hcCgoaSxhKT0+JChhKS5wcm9wcyhjb2xQcm9wcykpLmdldCgpLFxuICAgICAgICAgICAgICAgIGNvbFdpZHRoOiBwYXJzZUZsb2F0KGJhc2VDb2xXaWR0aCksIFxuICAgICAgICAgICAgICAgIHJvd0hlaWdodDpwYXJzZUZsb2F0KGRlZmF1bHRSb3dIZWlnaHQpLFxuICAgICAgICAgICAgICAgIHZpZXc6JChcInNoZWV0Vmlld3M+c2hlZXRWaWV3XCIpLnByb3BzKHt4U3BsaXQ6cGFyc2VJbnQseVNwbGl0OnBhcnNlSW50fSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcm93KHdYbWwsIG9kKXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2QuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3Qge2N1c3RvbUZvcm1hdCwgaGlkZGVuLHMsIHN0eWxlPWN1c3RvbUZvcm1hdCYmcGFyc2VJbnQocyl8fHVuZGVmaW5lZCwgcixjdXN0b21IZWlnaHQsaHQsIGhlaWdodD1odCAmJiBwYXJzZUZsb2F0KGh0KSoob2QuZG9jLnByZWNpc2lvbnx8MSl9PXdYbWwuYXR0cmlic1xuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihcImNcIikudG9BcnJheSgpXG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJyb3dcIixjaGlsZHJlbiwgY3VzdG9tSGVpZ2h0LCBoZWlnaHQsIGk6cGFyc2VJbnQociktMSwgc3R5bGUsaGlkZGVufVxuICAgICAgICB9LFxuICAgICAgICBjKHdYbWwsIG9kKXtcbiAgICAgICAgICAgIGNvbnN0IHthdHRyaWJzOntyLHM6c3R5bGV9fT13WG1sXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj1vZC4kKHdYbWwpLmNoaWxkcmVuKCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBbLGNvbCxyb3csXT0vKFtBLVpdKykoXFxkKyQpLy5leGVjKHIpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6XCJjZWxsXCIsXG4gICAgICAgICAgICAgICAgbmFtZTpgJHtwYXJzZUludChyb3cpLTF9JHtjb2x9YCxcbiAgICAgICAgICAgICAgICBjb2w6Y29sU3RyVG9JbnQoY29sKSxcbiAgICAgICAgICAgICAgICByb3c6cGFyc2VJbnQocm93KS0xLCBcbiAgICAgICAgICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgICAgICAgICBzdHlsZTpzdHlsZSE9dW5kZWZpbmVkID8gcGFyc2VJbnQoc3R5bGUpIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHYod1htbCxvZCl7XG4gICAgICAgICAgICBjb25zdCB7YXR0cmliczp7dDpraW5kfX09d1htbC5wYXJlbnRcbiAgICAgICAgICAgIGNvbnN0IHtjaGlsZHJlbjpbe2RhdGF9XX09d1htbFxuICAgICAgICAgICAgc3dpdGNoKGtpbmQpe1xuICAgICAgICAgICAgY2FzZSBcImlcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJwYXJhZ3JhcGhcIixraW5kLGNoaWxkcmVuOlsuLi53WG1sLmNoaWxkcmVuXX1cbiAgICAgICAgICAgIGNhc2UgXCJzXCI6XG4gICAgICAgICAgICAgICAgb2QuJCh3WG1sKS5lbXB0eSgpLmFwcGVuZChvZC5zaGFyZWRTdHJpbmdzLmVxKGRhdGEpLmNsb25lKCkuY2hpbGRyZW4oKSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBvZC4kKHdYbWwpLmVtcHR5KCkuYXBwZW5kKGA8cj48dD4ke2RhdGF9PC90Pjwvcj5gKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3WG1sLnBhcmVudC5hdHRyaWJzLnQ9XCJpXCJcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInBhcmFncmFwaFwiLGtpbmQsY2hpbGRyZW46Wy4uLndYbWwuY2hpbGRyZW5dfVxuICAgICAgICB9LFxuICAgICAgICBpcyh3WG1sLG9kKXtcbiAgICAgICAgICAgIHdYbWwubmFtZT1cInZcIlxuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwicGFyYWdyYXBoXCIsa2luZDpcImlzXCIsY2hpbGRyZW46Wy4uLndYbWwuY2hpbGRyZW5dfVxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgcih3WG1sLG9kKXtcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPW9kLiQod1htbCkuZmluZChcIj5yUHJcIikucHJvcHMoVGV4dFN0eWxlKG9kKSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTpcInJ1blwiLFxuICAgICAgICAgICAgICAgIHN0eWxlLCBcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogd1htbC5jaGlsZHJlbi5maWx0ZXIoKHtuYW1lfSk9Pm5hbWUhPVwiclByXCIpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLy9zdHlsZXNcbiAgICAgICAgbnVtRm10KHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcygpfVxuICAgICAgICB9LFxuICAgICAgICBjZWxsU3R5bGUod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKCl9XG4gICAgICAgIH0sXG4gICAgICAgIHhmKHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgbmFtZXM6e1xuICAgICAgICAgICAgICAgICAgICB3cmFwVGV4dDpcIndyYXBcIixcbiAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDpcImFsaWduXCIsXG4gICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOlwidmVydEFsaWduXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3cmFwVGV4dDp2PT52PT1cInRydWVcInx8dj09XCIxXCIgPyB0cnVlIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgLi4ucGFyc2VJbnQ0S2V5cyhcIm51bUZtdElkLGZvbnRJZCxmaWxsSWQsYm9yZGVySWQseGZJZCxhcHBseU51bWJlckZvcm1hdCxhcHBseUZvbnQsYXBwbHlGaWxsLGFwcGx5Qm9yZGVyLGFwcGx5QWxpZ25tZW50XCIpLFxuICAgICAgICAgICAgICAgIHRpZHkoe2FwcGx5TnVtYmVyRm9ybWF0LGFwcGx5Rm9udCxhcHBseUZpbGwsYXBwbHlCb3JkZXIsYXBwbHlBbGlnbm1lbnQsIC4uLmF9KXtcbiAgICAgICAgICAgICAgICAgICAgaWYoYXBwbHlOdW1iZXJGb3JtYXQ9PTApXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYS5udW1GbXRJZFxuICAgICAgICAgICAgICAgICAgICBpZihhcHBseUZvbnQ9PTApXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYS5mb250SWRcbiAgICAgICAgICAgICAgICAgICAgaWYoYXBwbHlGaWxsPT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGEuZmlsbElkXG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcGx5Qm9yZGVyPT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGEuYm9yZGVySWRcbiAgICAgICAgICAgICAgICAgICAgaWYoYXBwbHlBbGlnbm1lbnQ9PTApXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYS5hbGlnbm1lbnRcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgfSxcbiAgICAgICAgdGFibGVTdHlsZSh3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoKX1cbiAgICAgICAgfSxcbiAgICAgICAgZm9udCh3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoVGV4dFN0eWxlKG9kKSl9XG4gICAgICAgIH0sXG4gICAgICAgIGZpbGwod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICBiZ0NvbG9yOm9kLmNvbG9yLFxuICAgICAgICAgICAgICAgIGZnQ29sb3I6b2QuY29sb3IsXG4gICAgICAgICAgICAgICAgdGlkeSh7cGF0dGVybkZpbGw6e2ZnQ29sb3I6YmFja2dyb3VuZCxwYXR0ZXJuVHlwZX19KXtcbiAgICAgICAgICAgICAgICAgICAgaWYocGF0dGVyblR5cGU9PVwibm9uZVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdHRlcm5UeXBlICYmIHBhdHRlcm5UeXBlLnN0YXJ0c1dpdGgoXCJncmF5XCIpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHI9TnVtYmVyKHBhcnNlSW50KHBhdHRlcm5UeXBlLnN1YnN0cmluZyg0KSkpLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtiYWNrZ3JvdW5kOmAjJHtyfSR7cn0ke3J9YH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2JhY2tncm91bmR9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSl9XG4gICAgICAgIH0sXG4gICAgICAgIGJvcmRlcih3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIGNvbG9yOm9kLmNvbG9yLFxuICAgICAgICAgICAgICAgIHRpZHlfbGVmdDp0aWR5X2JvcmRlcixcbiAgICAgICAgICAgICAgICB0aWR5X3JpZ2h0OnRpZHlfYm9yZGVyLFxuICAgICAgICAgICAgICAgIHRpZHlfYm90dG9tOnRpZHlfYm9yZGVyLFxuICAgICAgICAgICAgICAgIHRpZHlfdG9wOnRpZHlfYm9yZGVyLFxuICAgICAgICAgICAgICAgIHRpZHlfZGlhZ29uYWw6IHRpZHlfYm9yZGVyLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgIH0sXG4gICAgfVxufVxuXG5cbmNvbnN0IHBhcnNlSW50NEtleXM9a2V5cz0+a2V5cy5zcGxpdChcIixcIikucmVkdWNlKChzLGspPT4oc1trXT1wYXJzZUludCxzKSx7fSlcbmNvbnN0IENvbG9ySW5kZXg9XCJsdDEsZGsxLGx0MixkazIsYWNjZW50MSxhY2NlbnQyLGFjY2VudDMsYWNjZW50NCxhY2NlbnQ1LGFjY2VudDYsaGxpbmssZm9sSGxpbmtcIi5zcGxpdChcIixcIilcbmNvbnN0IHRpZHlfYm9yZGVyPSh7c3R5bGUsLi4uYX0pPT57XG4gICAgc3dpdGNoKHN0eWxlKXtcbiAgICAgICAgY2FzZSBcInRoaW5cIjpcbiAgICAgICAgICAgIGEuc3o9MVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrXG4gICAgfVxuICAgIHJldHVybiBhXG59XG5jb25zdCBUZXh0U3R5bGU9b2Q9Pih7XG4gICAgZmlsdGVyOlwiOm5vdChzY2hlbWUsZmFtaWx5LGNoYXJzZXQpXCIsXG4gICAgbmFtZXM6e1xuICAgICAgICByRm9udDpcImZvbnRzXCIsXG4gICAgICAgIG5hbWU6XCJmb250c1wiLFxuICAgICAgICBzejpcInNpemVcIixcbiAgICAgICAgYjpcImJvbGRcIixcbiAgICAgICAgaTpcIml0YWxpY1wiLFxuICAgICAgICB1OlwidW5kZXJsaW5lXCIsXG4gICAgICAgIHZhbmlzaDpcImhpZGRlblwiXG4gICAgfSxcbiAgICByRm9udDooe2F0dHJpYnM6e3ZhbH19KT0+dmFsLFxuICAgIG5hbWU6KHthdHRyaWJzOnt2YWx9fSk9PnZhbCxcbiAgICBiOih7YXR0cmliczp7dmFsPXRydWV9fSk9PiEhdmFsLFxuICAgIGk6KHthdHRyaWJzOnt2YWw9dHJ1ZX19KT0+ISF2YWwsXG4gICAgdTooe2F0dHJpYnM6e3ZhbD1cInNpbmdsZVwifX0pPT52YWwsXG4gICAgdmFuaXNoOih7YXR0cmliczp7dmFsPXRydWV9fSk9PiEhdmFsLFxuICAgIHN6Oih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKSksXG5cbiAgICBjb2xvcjpvZC5jb2xvcixcbn0pXG5cbmNvbnN0IFhMU0ljdiA9IFtcbiAgICBcIiMwMDAwMDBcIixcblx0XCIjRkZGRkZGXCIsXG5cdFwiI0ZGMDAwMFwiLFxuXHRcIiMwMEZGMDBcIixcblx0XCIjMDAwMEZGXCIsXG5cdFwiI0ZGRkYwMFwiLFxuXHRcIiNGRjAwRkZcIixcblx0XCIjMDBGRkZGXCIsXG5cdFwiIzAwMDAwMFwiLFxuXHRcIiNGRkZGRkZcIixcblx0XCIjRkYwMDAwXCIsXG5cdFwiIzAwRkYwMFwiLFxuXHRcIiMwMDAwRkZcIixcblx0XCIjRkZGRjAwXCIsXG5cdFwiI0ZGMDBGRlwiLFxuXHRcIiMwMEZGRkZcIixcblx0XCIjODAwMDAwXCIsXG5cdFwiIzAwODAwMFwiLFxuXHRcIiMwMDAwODBcIixcblx0XCIjODA4MDAwXCIsXG5cdFwiIzgwMDA4MFwiLFxuXHRcIiMwMDgwODBcIixcblx0XCIjQzBDMEMwXCIsXG5cdFwiIzgwODA4MFwiLFxuXHRcIiM5OTk5RkZcIixcblx0XCIjOTkzMzY2XCIsXG5cdFwiI0ZGRkZDQ1wiLFxuXHRcIiNDQ0ZGRkZcIixcblx0XCIjNjYwMDY2XCIsXG5cdFwiI0ZGODA4MFwiLFxuXHRcIiMwMDY2Q0NcIixcblx0XCIjQ0NDQ0ZGXCIsXG5cdFwiIzAwMDA4MFwiLFxuXHRcIiNGRjAwRkZcIixcblx0XCIjRkZGRjAwXCIsXG5cdFwiIzAwRkZGRlwiLFxuXHRcIiM4MDAwODBcIixcblx0XCIjODAwMDAwXCIsXG5cdFwiIzAwODA4MFwiLFxuXHRcIiMwMDAwRkZcIixcblx0XCIjMDBDQ0ZGXCIsXG5cdFwiI0NDRkZGRlwiLFxuXHRcIiNDQ0ZGQ0NcIixcblx0XCIjRkZGRjk5XCIsXG5cdFwiIzk5Q0NGRlwiLFxuXHRcIiNGRjk5Q0NcIixcblx0XCIjQ0M5OUZGXCIsXG5cdFwiI0ZGQ0M5OVwiLFxuXHRcIiMzMzY2RkZcIixcblx0XCIjMzNDQ0NDXCIsXG5cdFwiIzk5Q0MwMFwiLFxuXHRcIiNGRkNDMDBcIixcblx0XCIjRkY5OTAwXCIsXG5cdFwiI0ZGNjYwMFwiLFxuXHRcIiM2NjY2OTlcIixcblx0XCIjOTY5Njk2XCIsXG5cdFwiIzAwMzM2NlwiLFxuXHRcIiMzMzk5NjZcIixcblx0XCIjMDAzMzAwXCIsXG5cdFwiIzMzMzMwMFwiLFxuXHRcIiM5OTMzMDBcIixcblx0XCIjOTkzMzY2XCIsXG5cdFwiIzMzMzM5OVwiLFxuXHRcIiMzMzMzMzNcIixcblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQwIGljdkZvcmVncm91bmQgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQxIGljdkJhY2tncm91bmQgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQyIGljdkZyYW1lID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0MyBpY3YzRCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDQgaWN2M0RUZXh0ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0NSBpY3YzREhpbGl0ZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDYgaWN2M0RTaGFkb3cgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ3IGljdkhpbGl0ZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDggaWN2Q3RsVGV4dCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDkgaWN2Q3RsU2NybCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEEgaWN2Q3RsSW52ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0QiBpY3ZDdGxCb2R5ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0QyBpY3ZDdGxGcmFtZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEQgaWN2Q3RsRm9yZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEUgaWN2Q3RsQmFjayA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEYgaWN2Q3RsTmV1dHJhbCAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNTAgaWN2SW5mb0JrID8/ICovXG5cdFwiIzAwMDAwMFwiIC8qIFwiIzUxIGljdkluZm9UZXh0ID8/ICovXG5dXG4iXX0=