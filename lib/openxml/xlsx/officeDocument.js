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
        __filter: ":not(scheme,family,charset)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3hsc3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQSIsImNoYXJDb2RlQXQiLCJjb2xTdHJUb0ludCIsImNvbCIsImxhc3QiLCJzdWJzdHIiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJjb2xJbnRUb1N0ciIsImkwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicGFyc2VJbnQiLCJPZmZpY2VEb2N1bWVudCIsImRvYyIsIl9hc3NpZ25SZWwiLCJPYmplY3QiLCJhc3NpZ24iLCJzaGFyZWRTdHJpbmdzIiwiZXEiLCJpIiwicm9vdCIsImNoaWxkcmVuIiwic3R5bGVzIiwiaWRlbnRpdGllcyIsImNvbnN0cnVjdG9yIiwidGhlbWUiLCJjb2xvciIsIiQiLCJDb2xvckluZGV4IiwiZmlyc3QiLCJhc0NvbG9yIiwiYXR0ciIsImF0dHJpYnMiLCJyZ2IiLCJpbmRleGVkIiwidGludCIsInYiLCJ1bmRlZmluZWQiLCJYTFNJY3YiLCJwYXJzZUZsb2F0Iiwic2hlZXRJbmRleCIsInJvdyIsInNoZWV0IiwiY29udGVudCIsImdldCIsInMiLCJ0ZXh0IiwicmlkIiwiZ2V0UmVsIiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwiYmluZCIsInJlbmRlck5vZGUiLCJCYXNlIiwid29ya2Jvb2siLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJ0b0FycmF5IiwidHlwZSIsInNzdCIsIm9kIiwiY291bnQiLCJ1bmlxdWVDb3VudCIsImJhc2VDb2xXaWR0aCIsImRlZmF1bHRSb3dIZWlnaHQiLCJySWQiLCJwcm9wcyIsImNvbFByb3BzIiwic3BsaXQiLCJyZWR1Y2UiLCJvIiwiayIsIndpZHRoIiwidGlkeSIsIm1pbiIsIm1heCIsImNvbHMiLCJtYXAiLCJhIiwiY29sV2lkdGgiLCJyb3dIZWlnaHQiLCJ2aWV3IiwieFNwbGl0IiwieVNwbGl0IiwiY3VzdG9tRm9ybWF0IiwiaGlkZGVuIiwic3R5bGUiLCJyIiwiY3VzdG9tSGVpZ2h0IiwiaHQiLCJoZWlnaHQiLCJwcmVjaXNpb24iLCJjIiwiZXhlYyIsIm5hbWUiLCJraW5kIiwicGFyZW50IiwidCIsImRhdGEiLCJlbXB0eSIsImFwcGVuZCIsImNsb25lIiwiaXMiLCJmaW5kIiwiVGV4dFN0eWxlIiwiZmlsdGVyIiwibnVtRm10IiwiY2VsbFN0eWxlIiwieGYiLCJuYW1lcyIsIndyYXBUZXh0IiwiaG9yaXpvbnRhbCIsInZlcnRpY2FsIiwicGFyc2VJbnQ0S2V5cyIsImFwcGx5TnVtYmVyRm9ybWF0IiwiYXBwbHlGb250IiwiYXBwbHlGaWxsIiwiYXBwbHlCb3JkZXIiLCJhcHBseUFsaWdubWVudCIsIm51bUZtdElkIiwiZm9udElkIiwiZmlsbElkIiwiYm9yZGVySWQiLCJhbGlnbm1lbnQiLCJ0YWJsZVN0eWxlIiwiZm9udCIsImZpbGwiLCJiZ0NvbG9yIiwiZmdDb2xvciIsInBhdHRlcm5GaWxsIiwiYmFja2dyb3VuZCIsInBhdHRlcm5UeXBlIiwic3RhcnRzV2l0aCIsIk51bWJlciIsInRvU3RyaW5nIiwiYm9yZGVyIiwidGlkeV9sZWZ0IiwidGlkeV9ib3JkZXIiLCJ0aWR5X3JpZ2h0IiwidGlkeV9ib3R0b20iLCJ0aWR5X3RvcCIsInRpZHlfZGlhZ29uYWwiLCJrZXlzIiwic3oiLCJfX2ZpbHRlciIsInJGb250IiwiYiIsInUiLCJ2YW5pc2giLCJ2YWwiLCJwdDJQeCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLElBQUUsSUFBSUMsVUFBSixDQUFlLENBQWYsQ0FBUjtBQUNBO0FBQ0EsU0FBU0MsV0FBVCxDQUFxQkMsR0FBckIsRUFBeUI7QUFDckIsUUFBTUMsT0FBS0QsSUFBSUUsTUFBSixDQUFXLENBQUMsQ0FBWixFQUFlSixVQUFmLENBQTBCLENBQTFCLElBQTZCRCxDQUF4QztBQUNBLFFBQUdHLElBQUlHLE1BQUosR0FBVyxDQUFkLEVBQWdCO0FBQ1osZUFBTyxNQUFJSixZQUFZQyxJQUFJSSxTQUFKLENB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RUg7QUFDWCxTQTFFYyxFQTBFSDtBQUNYLFNBM0VjLEVBMkVIO0FBQ1gsU0E1RWMsRUE0RUg7QUFDWCxTQTdFYyxFQTZFSDtBQUNYLFNBOUVjLEVBOEVIO0FBQ1gsU0EvRWMsRUErRUg7QUFDWCxTQWhGYyxFQWdGSDtBQUNYLFNBakZjLEVBaUZIO0FBQ1gsU0FsRmMsQ0FrRko7QUFsRkksQ0FBZiIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9vZmZpY2VEb2N1bWVudFwiXG5jb25zdCBBPVwiQVwiLmNoYXJDb2RlQXQoMClcbi8vQT0+MCwgWj0+MjUsIEFBPT4yNlxuZnVuY3Rpb24gY29sU3RyVG9JbnQoY29sKXtcbiAgICBjb25zdCBsYXN0PWNvbC5zdWJzdHIoLTEpLmNoYXJDb2RlQXQoMCktQVxuICAgIGlmKGNvbC5sZW5ndGg+MSl7XG4gICAgICAgIHJldHVybiAyNiooY29sU3RyVG9JbnQoY29sLnN1YnN0cmluZygwLGNvbC5sZW5ndGgtMSkpKzEpK2xhc3RcbiAgICB9XG4gICAgcmV0dXJuIGxhc3Rcbn1cbi8vMD0+QSwgMjU9PlosIDI2PT5BQVxuZnVuY3Rpb24gY29sSW50VG9TdHIoY29sKXtcbiAgICBjb25zdCBpMD1TdHJpbmcuZnJvbUNoYXJDb2RlKEErY29sJTI2KVxuICAgIGlmKGNvbD49MjYpe1xuICAgICAgICByZXR1cm4gY29sSW50VG9TdHIocGFyc2VJbnQoY29sLzI2KS0xKStpMFxuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gaTBcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9mZmljZURvY3VtZW50IGV4dGVuZHMgQmFzZXtcbiAgICBzdGF0aWMgY29sU3RyVG9JbnQ9Y29sU3RyVG9JbnRcbiAgICBzdGF0aWMgY29sSW50VG9TdHI9Y29sSW50VG9TdHJcbiAgICBfaW5pdCgpe1xuICAgICAgICBzdXBlci5faW5pdCgpXG4gICAgICAgIGNvbnN0IGRvYz10aGlzLmRvY1xuICAgICAgICB0aGlzLl9hc3NpZ25SZWwoW1wic3R5bGVzXCIsXCJzaGFyZWRTdHJpbmdzXCJdKVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc2hhcmVkU3RyaW5ncyx7XG4gICAgICAgICAgICBlcShpKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb290KCkuY2hpbGRyZW4oXCJzc3RcIikuY2hpbGRyZW4oKS5lcShwYXJzZUludChpKSlcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgZG9jLCBcbiAgICAgICAgfSlcbiAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLnN0eWxlcyx7aWRlbnRpdGllczp0aGlzLmNvbnN0cnVjdG9yLmlkZW50aXRpZXMsZG9jfSlcbiAgICAgICAgdGhpcy50aGVtZS5jb2xvcj1mdW5jdGlvbihpKXtcbiAgICAgICAgICAgIGNvbnN0ICQ9dGhpcyhgYVxcXFw6Y2xyU2NoZW1lPmFcXFxcOiR7Q29sb3JJbmRleFtwYXJzZUludChpKV19YCkuY2hpbGRyZW4oKS5maXJzdCgpXG4gICAgICAgICAgICByZXR1cm4gZG9jLmFzQ29sb3IoJC5hdHRyKFwibGFzdENsclwiKXx8JC5hdHRyKFwidmFsXCIpKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29sb3I9KHthdHRyaWJzOntyZ2IsdGhlbWUsaW5kZXhlZCx0aW50fX0pPT57XG4gICAgICAgICAgICBjb25zdCB2PShyZ2ImJmAjJHtyZ2Iuc3Vic3RyKDIpfWApfHwodGhlbWUgJiYgdGhpcy50aGVtZS5jb2xvcih0aGVtZSkpfHwgKGluZGV4ZWQhPXVuZGVmaW5lZCAmJiBgJHtYTFNJY3ZbcGFyc2VJbnQoaW5kZXhlZCldfWApXG4gICAgICAgICAgICByZXR1cm4gdGludCA/IHRoaXMuZG9jLmFzQ29sb3Iodix7dGludDpwYXJzZUZsb2F0KHRpbnQpfSkgOiB2XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjZWxsUGxhaW5UZXh0KHNoZWV0SW5kZXgscm93LGNvbCl7XG4gICAgICAgIHJvdz1yb3crMVxuICAgICAgICBjb2w9Y29sSW50VG9TdHIoY29sKVxuICAgICAgICBjb25zdCBzaGVldD10aGlzLnNoZWV0KHRoaXMuY29udGVudChgc2hlZXRzPnNoZWV0YCkuZ2V0KHNoZWV0SW5kZXgpLmF0dHJpYnMpXG4gICAgICAgIGNvbnN0IHM9c2hlZXQoYHdvcmtzaGVldD5zaGVldERhdGE+cm93W3I9JHtyb3d9XT5jW3I9JyR7Y29sfSR7cm93fSddPnZgKS50ZXh0KClcbiAgICAgICAgaWYocyl7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zaGFyZWRTdHJpbmdzLmVxKHMpLnRleHQoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgfVxuXG4gICAgc2hlZXQoe1wicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWwocmlkKVxuICAgIH1cblxuICAgIHJlbmRlcihjcmVhdGVFbGVtZW50LCBpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy5zdHlsZXMoXCJzdHlsZVNoZWV0XCIpLmdldCgwKSxjcmVhdGVFbGVtZW50LGlkZW50aWZ5KVxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJOb2RlKHRoaXMuY29udGVudChcIndvcmtib29rXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgc3RhdGljIGlkZW50aXRpZXM9e1xuICAgICAgICB3b3JrYm9vayh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQoXCJzaGVldHNcIilcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oXCJzaGVldFwiKS50b0FycmF5KClcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTpcIndvcmtib29rXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3N0KHthdHRyaWJzOntjb3VudCwgdW5pcXVlQ291bnR9fSxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJzaGFyZWRTdHJpbmdzXCIsY291bnQ6cGFyc2VJbnQoY291bnQpLHVuaXF1ZUNvdW50OnBhcnNlSW50KHVuaXF1ZUNvdW50KX1cbiAgICAgICAgfSxcbiAgICAgICAgc2hlZXQod1htbCwgb2Qpe1xuICAgICAgICAgICAgY29uc3QgJD1vZC5zaGVldCh3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHthdHRyaWJzOntiYXNlQ29sV2lkdGgsZGVmYXVsdFJvd0hlaWdodH19PSQoXCJzaGVldEZvcm1hdFByXCIpLmdldCgwKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JChcInNoZWV0RGF0YT5yb3dcIikudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCB7XCJyOmlkXCI6cklkLC4uLnByb3BzfT13WG1sLmF0dHJpYnNcbiAgICAgICAgICAgIGNvbnN0IGNvbFByb3BzPVwiY3VzdG9tV2lkdGgsbWluLG1heCxzdHlsZSxoaWRkZW5cIi5zcGxpdChcIixcIikucmVkdWNlKChvLGspPT4ob1trXT1wYXJzZUludCxvKSx7XG4gICAgICAgICAgICAgICAgd2lkdGg6cGFyc2VGbG9hdCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7bWluLG1heCwuLi5wcm9wc30pPT4oey4uLnByb3BzLG1pbjptaW4tMSxtYXg6bWF4LTF9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4ucHJvcHMsXG4gICAgICAgICAgICAgICAgdHlwZTpcInNoZWV0XCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4sIFxuICAgICAgICAgICAgICAgIGNvbHM6ICQoXCJjb2xzXCIpLmNoaWxkcmVuKCkubWFwKChpLGEpPT4kKGEpLnByb3BzKGNvbFByb3BzKSkuZ2V0KCksXG4gICAgICAgICAgICAgICAgY29sV2lkdGg6IHBhcnNlRmxvYXQoYmFzZUNvbFdpZHRoKSwgXG4gICAgICAgICAgICAgICAgcm93SGVpZ2h0OnBhcnNlRmxvYXQoZGVmYXVsdFJvd0hlaWdodCksXG4gICAgICAgICAgICAgICAgdmlldzokKFwic2hlZXRWaWV3cz5zaGVldFZpZXdcIikucHJvcHMoe3hTcGxpdDpwYXJzZUludCx5U3BsaXQ6cGFyc2VJbnR9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByb3cod1htbCwgb2Qpe1xuICAgICAgICAgICAgY29uc3QgJD1vZC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCB7Y3VzdG9tRm9ybWF0LCBoaWRkZW4scywgc3R5bGU9Y3VzdG9tRm9ybWF0JiZwYXJzZUludChzKXx8dW5kZWZpbmVkLCByLGN1c3RvbUhlaWdodCxodCwgaGVpZ2h0PWh0ICYmIHBhcnNlRmxvYXQoaHQpKihvZC5kb2MucHJlY2lzaW9ufHwxKX09d1htbC5hdHRyaWJzXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKFwiY1wiKS50b0FycmF5KClcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInJvd1wiLGNoaWxkcmVuLCBjdXN0b21IZWlnaHQsIGhlaWdodCwgaTpwYXJzZUludChyKS0xLCBzdHlsZSxoaWRkZW59XG4gICAgICAgIH0sXG4gICAgICAgIGMod1htbCwgb2Qpe1xuICAgICAgICAgICAgY29uc3Qge2F0dHJpYnM6e3IsczpzdHlsZX19PXdYbWxcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPW9kLiQod1htbCkuY2hpbGRyZW4oKS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IFssY29sLHJvdyxdPS8oW0EtWl0rKShcXGQrJCkvLmV4ZWMocilcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdHlwZTpcImNlbGxcIixcbiAgICAgICAgICAgICAgICBuYW1lOmAke3BhcnNlSW50KHJvdyktMX0ke2NvbH1gLFxuICAgICAgICAgICAgICAgIGNvbDpjb2xTdHJUb0ludChjb2wpLFxuICAgICAgICAgICAgICAgIHJvdzpwYXJzZUludChyb3cpLTEsIFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuLFxuICAgICAgICAgICAgICAgIHN0eWxlOnN0eWxlIT11bmRlZmluZWQgPyBwYXJzZUludChzdHlsZSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdih3WG1sLG9kKXtcbiAgICAgICAgICAgIGNvbnN0IHthdHRyaWJzOnt0OmtpbmR9fT13WG1sLnBhcmVudFxuICAgICAgICAgICAgY29uc3Qge2NoaWxkcmVuOlt7ZGF0YX1dfT13WG1sXG4gICAgICAgICAgICBzd2l0Y2goa2luZCl7XG4gICAgICAgICAgICBjYXNlIFwiaVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInBhcmFncmFwaFwiLGtpbmQsY2hpbGRyZW46Wy4uLndYbWwuY2hpbGRyZW5dfVxuICAgICAgICAgICAgY2FzZSBcInNcIjpcbiAgICAgICAgICAgICAgICBvZC4kKHdYbWwpLmVtcHR5KCkuYXBwZW5kKG9kLnNoYXJlZFN0cmluZ3MuZXEoZGF0YSkuY2xvbmUoKS5jaGlsZHJlbigpKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIG9kLiQod1htbCkuZW1wdHkoKS5hcHBlbmQoYDxyPjx0PiR7ZGF0YX08L3Q+PC9yPmApXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdYbWwucGFyZW50LmF0dHJpYnMudD1cImlcIlxuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwicGFyYWdyYXBoXCIsa2luZCxjaGlsZHJlbjpbLi4ud1htbC5jaGlsZHJlbl19XG4gICAgICAgIH0sXG4gICAgICAgIGlzKHdYbWwsb2Qpe1xuICAgICAgICAgICAgd1htbC5uYW1lPVwidlwiXG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJwYXJhZ3JhcGhcIixraW5kOlwiaXNcIixjaGlsZHJlbjpbLi4ud1htbC5jaGlsZHJlbl19XG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICByKHdYbWwsb2Qpe1xuICAgICAgICAgICAgY29uc3Qgc3R5bGU9b2QuJCh3WG1sKS5maW5kKFwiPnJQclwiKS5wcm9wcyhUZXh0U3R5bGUob2QpKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOlwicnVuXCIsXG4gICAgICAgICAgICAgICAgc3R5bGUsIFxuICAgICAgICAgICAgICAgIGNoaWxkcmVuOiB3WG1sLmNoaWxkcmVuLmZpbHRlcigoe25hbWV9KT0+bmFtZSE9XCJyUHJcIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICAvL3N0eWxlc1xuICAgICAgICBudW1GbXQod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKCl9XG4gICAgICAgIH0sXG4gICAgICAgIGNlbGxTdHlsZSh3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoKX1cbiAgICAgICAgfSxcbiAgICAgICAgeGYod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICBuYW1lczp7XG4gICAgICAgICAgICAgICAgICAgIHdyYXBUZXh0Olwid3JhcFwiLFxuICAgICAgICAgICAgICAgICAgICBob3Jpem9udGFsOlwiYWxpZ25cIixcbiAgICAgICAgICAgICAgICAgICAgdmVydGljYWw6XCJ2ZXJ0QWxpZ25cIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdyYXBUZXh0OnY9PnY9PVwidHJ1ZVwifHx2PT1cIjFcIiA/IHRydWUgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAuLi5wYXJzZUludDRLZXlzKFwibnVtRm10SWQsZm9udElkLGZpbGxJZCxib3JkZXJJZCx4ZklkLGFwcGx5TnVtYmVyRm9ybWF0LGFwcGx5Rm9udCxhcHBseUZpbGwsYXBwbHlCb3JkZXIsYXBwbHlBbGlnbm1lbnRcIiksXG4gICAgICAgICAgICAgICAgdGlkeSh7YXBwbHlOdW1iZXJGb3JtYXQsYXBwbHlGb250LGFwcGx5RmlsbCxhcHBseUJvcmRlcixhcHBseUFsaWdubWVudCwgLi4uYX0pe1xuICAgICAgICAgICAgICAgICAgICBpZihhcHBseU51bWJlckZvcm1hdD09MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhLm51bUZtdElkXG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcGx5Rm9udD09MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhLmZvbnRJZFxuICAgICAgICAgICAgICAgICAgICBpZihhcHBseUZpbGw9PTApXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYS5maWxsSWRcbiAgICAgICAgICAgICAgICAgICAgaWYoYXBwbHlCb3JkZXI9PTApXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgYS5ib3JkZXJJZFxuICAgICAgICAgICAgICAgICAgICBpZihhcHBseUFsaWdubWVudD09MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhLmFsaWdubWVudFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pfVxuICAgICAgICB9LFxuICAgICAgICB0YWJsZVN0eWxlKHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcygpfVxuICAgICAgICB9LFxuICAgICAgICBmb250KHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcyhUZXh0U3R5bGUob2QpKX1cbiAgICAgICAgfSxcbiAgICAgICAgZmlsbCh3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIGJnQ29sb3I6b2QuY29sb3IsXG4gICAgICAgICAgICAgICAgZmdDb2xvcjpvZC5jb2xvcixcbiAgICAgICAgICAgICAgICB0aWR5KHtwYXR0ZXJuRmlsbDp7ZmdDb2xvcjpiYWNrZ3JvdW5kLHBhdHRlcm5UeXBlfX0pe1xuICAgICAgICAgICAgICAgICAgICBpZihwYXR0ZXJuVHlwZT09XCJub25lXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgICAgICAgICAgaWYocGF0dGVyblR5cGUgJiYgcGF0dGVyblR5cGUuc3RhcnRzV2l0aChcImdyYXlcIikpe1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcj1OdW1iZXIocGFyc2VJbnQocGF0dGVyblR5cGUuc3Vic3RyaW5nKDQpKSkudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge2JhY2tncm91bmQ6YCMke3J9JHtyfSR7cn1gfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7YmFja2dyb3VuZH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KX1cbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyKHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgY29sb3I6b2QuY29sb3IsXG4gICAgICAgICAgICAgICAgdGlkeV9sZWZ0OnRpZHlfYm9yZGVyLFxuICAgICAgICAgICAgICAgIHRpZHlfcmlnaHQ6dGlkeV9ib3JkZXIsXG4gICAgICAgICAgICAgICAgdGlkeV9ib3R0b206dGlkeV9ib3JkZXIsXG4gICAgICAgICAgICAgICAgdGlkeV90b3A6dGlkeV9ib3JkZXIsXG4gICAgICAgICAgICAgICAgdGlkeV9kaWFnb25hbDogdGlkeV9ib3JkZXIsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgfSxcbiAgICB9XG59XG5cblxuY29uc3QgcGFyc2VJbnQ0S2V5cz1rZXlzPT5rZXlzLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKHMsayk9PihzW2tdPXBhcnNlSW50LHMpLHt9KVxuY29uc3QgQ29sb3JJbmRleD1cImx0MSxkazEsbHQyLGRrMixhY2NlbnQxLGFjY2VudDIsYWNjZW50MyxhY2NlbnQ0LGFjY2VudDUsYWNjZW50NixobGluayxmb2xIbGlua1wiLnNwbGl0KFwiLFwiKVxuY29uc3QgdGlkeV9ib3JkZXI9KHtzdHlsZSwuLi5hfSk9PntcbiAgICBzd2l0Y2goc3R5bGUpe1xuICAgICAgICBjYXNlIFwidGhpblwiOlxuICAgICAgICAgICAgYS5zej0xXG4gICAgICAgICAgICBicmVha1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWtcbiAgICB9XG4gICAgcmV0dXJuIGFcbn1cbmNvbnN0IFRleHRTdHlsZT1vZD0+KHtcbiAgICBfX2ZpbHRlcjpcIjpub3Qoc2NoZW1lLGZhbWlseSxjaGFyc2V0KVwiLFxuICAgIG5hbWVzOntcbiAgICAgICAgckZvbnQ6XCJmb250c1wiLFxuICAgICAgICBuYW1lOlwiZm9udHNcIixcbiAgICAgICAgc3o6XCJzaXplXCIsXG4gICAgICAgIGI6XCJib2xkXCIsXG4gICAgICAgIGk6XCJpdGFsaWNcIixcbiAgICAgICAgdTpcInVuZGVybGluZVwiLFxuICAgICAgICB2YW5pc2g6XCJoaWRkZW5cIlxuICAgIH0sXG4gICAgckZvbnQ6KHthdHRyaWJzOnt2YWx9fSk9PnZhbCxcbiAgICBuYW1lOih7YXR0cmliczp7dmFsfX0pPT52YWwsXG4gICAgYjooe2F0dHJpYnM6e3ZhbD10cnVlfX0pPT4hIXZhbCxcbiAgICBpOih7YXR0cmliczp7dmFsPXRydWV9fSk9PiEhdmFsLFxuICAgIHU6KHthdHRyaWJzOnt2YWw9XCJzaW5nbGVcIn19KT0+dmFsLFxuICAgIHZhbmlzaDooe2F0dHJpYnM6e3ZhbD10cnVlfX0pPT4hIXZhbCxcbiAgICBzejooe2F0dHJpYnM6e3ZhbH19KT0+b2QuZG9jLnB0MlB4KHBhcnNlSW50KHZhbCkpLFxuXG4gICAgY29sb3I6b2QuY29sb3IsXG59KVxuXG5jb25zdCBYTFNJY3YgPSBbXG4gICAgXCIjMDAwMDAwXCIsXG5cdFwiI0ZGRkZGRlwiLFxuXHRcIiNGRjAwMDBcIixcblx0XCIjMDBGRjAwXCIsXG5cdFwiIzAwMDBGRlwiLFxuXHRcIiNGRkZGMDBcIixcblx0XCIjRkYwMEZGXCIsXG5cdFwiIzAwRkZGRlwiLFxuXHRcIiMwMDAwMDBcIixcblx0XCIjRkZGRkZGXCIsXG5cdFwiI0ZGMDAwMFwiLFxuXHRcIiMwMEZGMDBcIixcblx0XCIjMDAwMEZGXCIsXG5cdFwiI0ZGRkYwMFwiLFxuXHRcIiNGRjAwRkZcIixcblx0XCIjMDBGRkZGXCIsXG5cdFwiIzgwMDAwMFwiLFxuXHRcIiMwMDgwMDBcIixcblx0XCIjMDAwMDgwXCIsXG5cdFwiIzgwODAwMFwiLFxuXHRcIiM4MDAwODBcIixcblx0XCIjMDA4MDgwXCIsXG5cdFwiI0MwQzBDMFwiLFxuXHRcIiM4MDgwODBcIixcblx0XCIjOTk5OUZGXCIsXG5cdFwiIzk5MzM2NlwiLFxuXHRcIiNGRkZGQ0NcIixcblx0XCIjQ0NGRkZGXCIsXG5cdFwiIzY2MDA2NlwiLFxuXHRcIiNGRjgwODBcIixcblx0XCIjMDA2NkNDXCIsXG5cdFwiI0NDQ0NGRlwiLFxuXHRcIiMwMDAwODBcIixcblx0XCIjRkYwMEZGXCIsXG5cdFwiI0ZGRkYwMFwiLFxuXHRcIiMwMEZGRkZcIixcblx0XCIjODAwMDgwXCIsXG5cdFwiIzgwMDAwMFwiLFxuXHRcIiMwMDgwODBcIixcblx0XCIjMDAwMEZGXCIsXG5cdFwiIzAwQ0NGRlwiLFxuXHRcIiNDQ0ZGRkZcIixcblx0XCIjQ0NGRkNDXCIsXG5cdFwiI0ZGRkY5OVwiLFxuXHRcIiM5OUNDRkZcIixcblx0XCIjRkY5OUNDXCIsXG5cdFwiI0NDOTlGRlwiLFxuXHRcIiNGRkNDOTlcIixcblx0XCIjMzM2NkZGXCIsXG5cdFwiIzMzQ0NDQ1wiLFxuXHRcIiM5OUNDMDBcIixcblx0XCIjRkZDQzAwXCIsXG5cdFwiI0ZGOTkwMFwiLFxuXHRcIiNGRjY2MDBcIixcblx0XCIjNjY2Njk5XCIsXG5cdFwiIzk2OTY5NlwiLFxuXHRcIiMwMDMzNjZcIixcblx0XCIjMzM5OTY2XCIsXG5cdFwiIzAwMzMwMFwiLFxuXHRcIiMzMzMzMDBcIixcblx0XCIjOTkzMzAwXCIsXG5cdFwiIzk5MzM2NlwiLFxuXHRcIiMzMzMzOTlcIixcblx0XCIjMzMzMzMzXCIsXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0MCBpY3ZGb3JlZ3JvdW5kID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0MSBpY3ZCYWNrZ3JvdW5kID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0MiBpY3ZGcmFtZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDMgaWN2M0QgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ0IGljdjNEVGV4dCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDUgaWN2M0RIaWxpdGUgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ2IGljdjNEU2hhZG93ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0NyBpY3ZIaWxpdGUgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ4IGljdkN0bFRleHQgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ5IGljdkN0bFNjcmwgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzRBIGljdkN0bEludiA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEIgaWN2Q3RsQm9keSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEMgaWN2Q3RsRnJhbWUgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzREIGljdkN0bEZvcmUgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzRFIGljdkN0bEJhY2sgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzRGIGljdkN0bE5ldXRyYWwgKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzUwIGljdkluZm9CayA/PyAqL1xuXHRcIiMwMDAwMDBcIiAvKiBcIiM1MSBpY3ZJbmZvVGV4dCA/PyAqL1xuXVxuIl19