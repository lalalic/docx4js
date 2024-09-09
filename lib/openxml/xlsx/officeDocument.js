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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3hsc3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiQSIsImNoYXJDb2RlQXQiLCJjb2xTdHJUb0ludCIsImNvbCIsImxhc3QiLCJzdWJzdHIiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJjb2xJbnRUb1N0ciIsImkwIiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwicGFyc2VJbnQiLCJPZmZpY2VEb2N1bWVudCIsImRvYyIsIl9hc3NpZ25SZWwiLCJPYmplY3QiLCJhc3NpZ24iLCJzaGFyZWRTdHJpbmdzIiwiZXEiLCJpIiwicm9vdCIsImNoaWxkcmVuIiwic3R5bGVzIiwiaWRlbnRpdGllcyIsImNvbnN0cnVjdG9yIiwidGhlbWUiLCJjb2xvciIsIiQiLCJDb2xvckluZGV4IiwiZmlyc3QiLCJhc0NvbG9yIiwiYXR0ciIsImF0dHJpYnMiLCJyZ2IiLCJpbmRleGVkIiwidGludCIsInYiLCJ1bmRlZmluZWQiLCJYTFNJY3YiLCJwYXJzZUZsb2F0Iiwic2hlZXRJbmRleCIsInJvdyIsInNoZWV0IiwiY29udGVudCIsImdldCIsInMiLCJ0ZXh0IiwicmlkIiwiZ2V0UmVsIiwiY3JlYXRlRWxlbWVudCIsImlkZW50aWZ5IiwiYmluZCIsInJlbmRlck5vZGUiLCJ3b3JrYm9vayIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRvQXJyYXkiLCJ0eXBlIiwic3N0Iiwib2QiLCJjb3VudCIsInVuaXF1ZUNvdW50IiwiYmFzZUNvbFdpZHRoIiwiZGVmYXVsdFJvd0hlaWdodCIsInJJZCIsInByb3BzIiwiY29sUHJvcHMiLCJzcGxpdCIsInJlZHVjZSIsIm8iLCJrIiwid2lkdGgiLCJ0aWR5IiwibWluIiwibWF4IiwiY29scyIsIm1hcCIsImEiLCJjb2xXaWR0aCIsInJvd0hlaWdodCIsInZpZXciLCJ4U3BsaXQiLCJ5U3BsaXQiLCJjdXN0b21Gb3JtYXQiLCJoaWRkZW4iLCJzdHlsZSIsInIiLCJjdXN0b21IZWlnaHQiLCJodCIsImhlaWdodCIsInByZWNpc2lvbiIsImMiLCJleGVjIiwibmFtZSIsImtpbmQiLCJwYXJlbnQiLCJ0IiwiZGF0YSIsImVtcHR5IiwiYXBwZW5kIiwiY2xvbmUiLCJpcyIsImZpbmQiLCJUZXh0U3R5bGUiLCJmaWx0ZXIiLCJudW1GbXQiLCJjZWxsU3R5bGUiLCJ4ZiIsIm5hbWVzIiwid3JhcFRleHQiLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJwYXJzZUludDRLZXlzIiwiYXBwbHlOdW1iZXJGb3JtYXQiLCJhcHBseUZvbnQiLCJhcHBseUZpbGwiLCJhcHBseUJvcmRlciIsImFwcGx5QWxpZ25tZW50IiwibnVtRm10SWQiLCJmb250SWQiLCJmaWxsSWQiLCJib3JkZXJJZCIsImFsaWdubWVudCIsInRhYmxlU3R5bGUiLCJmb250IiwiZmlsbCIsImJnQ29sb3IiLCJmZ0NvbG9yIiwicGF0dGVybkZpbGwiLCJiYWNrZ3JvdW5kIiwicGF0dGVyblR5cGUiLCJzdGFydHNXaXRoIiwiTnVtYmVyIiwidG9TdHJpbmciLCJib3JkZXIiLCJ0aWR5X2xlZnQiLCJ0aWR5X2JvcmRlciIsInRpZHlfcmlnaHQiLCJ0aWR5X2JvdHRvbSIsInRpZHlfdG9wIiwidGlkeV9kaWFnb25hbCIsImtleXMiLCJzeiIsIl9fZmlsdGVyIiwickZvbnQiLCJiIiwidSIsInZhbmlzaCIsInZhbCIsInB0MlB4Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsSUFBRSxJQUFJQyxVQUFKLENBQWUsQ0FBZixDQUFSO0FBQ0E7QUFDQSxTQUFTQyxXQUFULENBQXFCQyxHQUFyQixFQUF5QjtBQUNyQixRQUFNQyxPQUFLRCxJQUFJRSxNQUFKLENBQVcsQ0FBQyxDQUFaLEVBQWVKLFVBQWYsQ0FBMEIsQ0FBMUIsSUFBNkJELENBQXhDO0FBQ0EsUUFBR0csSUFBSUcsTUFBSixHQUFXLENBQWQsRUFBZ0I7QUFDWixlQUFPLE1BQUlKLFlBQVlDLElBQUlJLFNBQUosQ0FBYyxDQUFk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MEVIO0FBQ1gsU0EzRWMsRUEyRUg7QUFDWCxTQTVFYyxFQTRFSDtBQUNYLFNBN0VjLEVBNkVIO0FBQ1gsU0E5RWMsRUE4RUg7QUFDWCxTQS9FYyxFQStFSDtBQUNYLFNBaEZjLEVBZ0ZIO0FBQ1gsU0FqRmMsRUFpRkg7QUFDWCxTQWxGYyxDQWtGSjtBQWxGSSxDQUFmIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL29mZmljZURvY3VtZW50XCJcbmNvbnN0IEE9XCJBXCIuY2hhckNvZGVBdCgwKVxuLy9BPT4wLCBaPT4yNSwgQUE9PjI2XG5mdW5jdGlvbiBjb2xTdHJUb0ludChjb2wpe1xuICAgIGNvbnN0IGxhc3Q9Y29sLnN1YnN0cigtMSkuY2hhckNvZGVBdCgwKS1BXG4gICAgaWYoY29sLmxlbmd0aD4xKXtcbiAgICAgICAgcmV0dXJuIDI2Kihjb2xTdHJUb0ludChjb2wuc3Vic3RyaW5nKDAsY29sLmxlbmd0aC0xKSkrMSkrbGFzdFxuICAgIH1cbiAgICByZXR1cm4gbGFzdFxufVxuLy8wPT5BLCAyNT0+WiwgMjY9PkFBXG5mdW5jdGlvbiBjb2xJbnRUb1N0cihjb2wpe1xuICAgIGNvbnN0IGkwPVN0cmluZy5mcm9tQ2hhckNvZGUoQStjb2wlMjYpXG4gICAgaWYoY29sPj0yNil7XG4gICAgICAgIHJldHVybiBjb2xJbnRUb1N0cihwYXJzZUludChjb2wvMjYpLTEpK2kwXG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBpMFxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIHN0YXRpYyBjb2xTdHJUb0ludD1jb2xTdHJUb0ludFxuICAgIHN0YXRpYyBjb2xJbnRUb1N0cj1jb2xJbnRUb1N0clxuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgY29uc3QgZG9jPXRoaXMuZG9jXG4gICAgICAgIHRoaXMuX2Fzc2lnblJlbChbXCJzdHlsZXNcIixcInNoYXJlZFN0cmluZ3NcIl0pXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5zaGFyZWRTdHJpbmdzLHtcbiAgICAgICAgICAgIGVxKGkpe1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvb3QoKS5jaGlsZHJlbihcInNzdFwiKS5jaGlsZHJlbigpLmVxKHBhcnNlSW50KGkpKVxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICBkb2MsIFxuICAgICAgICB9KVxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuc3R5bGVzLHtpZGVudGl0aWVzOnRoaXMuY29uc3RydWN0b3IuaWRlbnRpdGllcyxkb2N9KVxuICAgICAgICB0aGlzLnRoZW1lLmNvbG9yPWZ1bmN0aW9uKGkpe1xuICAgICAgICAgICAgY29uc3QgJD10aGlzKGBhXFxcXDpjbHJTY2hlbWU+YVxcXFw6JHtDb2xvckluZGV4W3BhcnNlSW50KGkpXX1gKS5jaGlsZHJlbigpLmZpcnN0KClcbiAgICAgICAgICAgIHJldHVybiBkb2MuYXNDb2xvcigkLmF0dHIoXCJsYXN0Q2xyXCIpfHwkLmF0dHIoXCJ2YWxcIikpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb2xvcj0oe2F0dHJpYnM6e3JnYix0aGVtZSxpbmRleGVkLHRpbnR9fSk9PntcbiAgICAgICAgICAgIGNvbnN0IHY9KHJnYiYmYCMke3JnYi5zdWJzdHIoMil9YCl8fCh0aGVtZSAmJiB0aGlzLnRoZW1lLmNvbG9yKHRoZW1lKSl8fCAoaW5kZXhlZCE9dW5kZWZpbmVkICYmIGAke1hMU0ljdltwYXJzZUludChpbmRleGVkKV19YClcbiAgICAgICAgICAgIHJldHVybiB0aW50ID8gdGhpcy5kb2MuYXNDb2xvcih2LHt0aW50OnBhcnNlRmxvYXQodGludCl9KSA6IHZcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNlbGxQbGFpblRleHQoc2hlZXRJbmRleCxyb3csY29sKXtcbiAgICAgICAgcm93PXJvdysxXG4gICAgICAgIGNvbD1jb2xJbnRUb1N0cihjb2wpXG4gICAgICAgIGNvbnN0IHNoZWV0PXRoaXMuc2hlZXQodGhpcy5jb250ZW50KGBzaGVldHM+c2hlZXRgKS5nZXQoc2hlZXRJbmRleCkuYXR0cmlicylcbiAgICAgICAgY29uc3Qgcz1zaGVldChgd29ya3NoZWV0PnNoZWV0RGF0YT5yb3dbcj0ke3Jvd31dPmNbcj0nJHtjb2x9JHtyb3d9J10+dmApLnRleHQoKVxuICAgICAgICBpZihzKXtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNoYXJlZFN0cmluZ3MuZXEocykudGV4dCgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFwiXCJcbiAgICB9XG5cbiAgICBzaGVldCh7XCJyOmlkXCI6cmlkfSl7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFJlbChyaWQpXG4gICAgfVxuXG4gICAgcmVuZGVyKGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5PXRoaXMuY29uc3RydWN0b3IuaWRlbnRpZnkuYmluZCh0aGlzLmNvbnN0cnVjdG9yKSl7XG4gICAgICAgIHRoaXMucmVuZGVyTm9kZSh0aGlzLnN0eWxlcyhcInN0eWxlU2hlZXRcIikuZ2V0KDApLGNyZWF0ZUVsZW1lbnQsaWRlbnRpZnkpXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwid29ya2Jvb2tcIikuZ2V0KDApLCBjcmVhdGVFbGVtZW50LCBpZGVudGlmeSlcbiAgICB9XG5cbiAgICBzdGF0aWMgaWRlbnRpdGllcz17XG4gICAgICAgIHdvcmtib29rKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudChcInNoZWV0c1wiKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihcInNoZWV0XCIpLnRvQXJyYXkoKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOlwid29ya2Jvb2tcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlblxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzc3Qoe2F0dHJpYnM6e2NvdW50LCB1bmlxdWVDb3VudH19LG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInNoYXJlZFN0cmluZ3NcIixjb3VudDpwYXJzZUludChjb3VudCksdW5pcXVlQ291bnQ6cGFyc2VJbnQodW5pcXVlQ291bnQpfVxuICAgICAgICB9LFxuICAgICAgICBzaGVldCh3WG1sLCBvZCl7XG4gICAgICAgICAgICBjb25zdCAkPW9kLnNoZWV0KHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3Qge2F0dHJpYnM6e2Jhc2VDb2xXaWR0aCxkZWZhdWx0Um93SGVpZ2h0fX09JChcInNoZWV0Rm9ybWF0UHJcIikuZ2V0KDApXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kKFwic2hlZXREYXRhPnJvd1wiKS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHtcInI6aWRcIjpySWQsLi4ucHJvcHN9PXdYbWwuYXR0cmlic1xuICAgICAgICAgICAgY29uc3QgY29sUHJvcHM9XCJjdXN0b21XaWR0aCxtaW4sbWF4LHN0eWxlLGhpZGRlblwiLnNwbGl0KFwiLFwiKS5yZWR1Y2UoKG8sayk9PihvW2tdPXBhcnNlSW50LG8pLHtcbiAgICAgICAgICAgICAgICB3aWR0aDpwYXJzZUZsb2F0LFxuICAgICAgICAgICAgICAgIHRpZHk6KHttaW4sbWF4LC4uLnByb3BzfSk9Pih7Li4ucHJvcHMsbWluOm1pbi0xLG1heDptYXgtMX0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5wcm9wcyxcbiAgICAgICAgICAgICAgICB0eXBlOlwic2hlZXRcIixcbiAgICAgICAgICAgICAgICBjaGlsZHJlbiwgXG4gICAgICAgICAgICAgICAgY29sczogJChcImNvbHNcIikuY2hpbGRyZW4oKS5tYXAoKGksYSk9PiQoYSkucHJvcHMoY29sUHJvcHMpKS5nZXQoKSxcbiAgICAgICAgICAgICAgICBjb2xXaWR0aDogcGFyc2VGbG9hdChiYXNlQ29sV2lkdGgpLCBcbiAgICAgICAgICAgICAgICByb3dIZWlnaHQ6cGFyc2VGbG9hdChkZWZhdWx0Um93SGVpZ2h0KSxcbiAgICAgICAgICAgICAgICB2aWV3OiQoXCJzaGVldFZpZXdzPnNoZWV0Vmlld1wiKS5wcm9wcyh7eFNwbGl0OnBhcnNlSW50LHlTcGxpdDpwYXJzZUludH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJvdyh3WG1sLCBvZCl7XG4gICAgICAgICAgICBjb25zdCAkPW9kLiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IHtjdXN0b21Gb3JtYXQsIGhpZGRlbixzLCBzdHlsZT1jdXN0b21Gb3JtYXQmJnBhcnNlSW50KHMpfHx1bmRlZmluZWQsIHIsY3VzdG9tSGVpZ2h0LGh0LCBoZWlnaHQ9aHQgJiYgcGFyc2VGbG9hdChodCkqKG9kLmRvYy5wcmVjaXNpb258fDEpfT13WG1sLmF0dHJpYnNcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oXCJjXCIpLnRvQXJyYXkoKVxuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwicm93XCIsY2hpbGRyZW4sIGN1c3RvbUhlaWdodCwgaGVpZ2h0LCBpOnBhcnNlSW50KHIpLTEsIHN0eWxlLGhpZGRlbn1cbiAgICAgICAgfSxcbiAgICAgICAgYyh3WG1sLCBvZCl7XG4gICAgICAgICAgICBjb25zdCB7YXR0cmliczp7cixzOnN0eWxlfX09d1htbFxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49b2QuJCh3WG1sKS5jaGlsZHJlbigpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgWyxjb2wscm93LF09LyhbQS1aXSspKFxcZCskKS8uZXhlYyhyKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB0eXBlOlwiY2VsbFwiLFxuICAgICAgICAgICAgICAgIG5hbWU6YCR7cGFyc2VJbnQocm93KS0xfSR7Y29sfWAsXG4gICAgICAgICAgICAgICAgY29sOmNvbFN0clRvSW50KGNvbCksXG4gICAgICAgICAgICAgICAgcm93OnBhcnNlSW50KHJvdyktMSwgXG4gICAgICAgICAgICAgICAgY2hpbGRyZW4sXG4gICAgICAgICAgICAgICAgc3R5bGU6c3R5bGUhPXVuZGVmaW5lZCA/IHBhcnNlSW50KHN0eWxlKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2KHdYbWwsb2Qpe1xuICAgICAgICAgICAgY29uc3Qge2F0dHJpYnM6e3Q6a2luZH19PXdYbWwucGFyZW50XG4gICAgICAgICAgICBjb25zdCB7Y2hpbGRyZW46W3tkYXRhfV19PXdYbWxcbiAgICAgICAgICAgIHN3aXRjaChraW5kKXtcbiAgICAgICAgICAgIGNhc2UgXCJpXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwicGFyYWdyYXBoXCIsa2luZCxjaGlsZHJlbjpbLi4ud1htbC5jaGlsZHJlbl19XG4gICAgICAgICAgICBjYXNlIFwic1wiOlxuICAgICAgICAgICAgICAgIG9kLiQod1htbCkuZW1wdHkoKS5hcHBlbmQob2Quc2hhcmVkU3RyaW5ncy5lcShkYXRhKS5jbG9uZSgpLmNoaWxkcmVuKCkpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgb2QuJCh3WG1sKS5lbXB0eSgpLmFwcGVuZChgPHI+PHQ+JHtkYXRhfTwvdD48L3I+YClcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd1htbC5wYXJlbnQuYXR0cmlicy50PVwiaVwiXG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJwYXJhZ3JhcGhcIixraW5kLGNoaWxkcmVuOlsuLi53WG1sLmNoaWxkcmVuXX1cbiAgICAgICAgfSxcbiAgICAgICAgaXMod1htbCxvZCl7XG4gICAgICAgICAgICB3WG1sLm5hbWU9XCJ2XCJcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInBhcmFncmFwaFwiLGtpbmQ6XCJpc1wiLGNoaWxkcmVuOlsuLi53WG1sLmNoaWxkcmVuXX1cbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHIod1htbCxvZCl7XG4gICAgICAgICAgICBjb25zdCBzdHlsZT1vZC4kKHdYbWwpLmZpbmQoXCI+clByXCIpLnByb3BzKFRleHRTdHlsZShvZCkpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6XCJydW5cIixcbiAgICAgICAgICAgICAgICBzdHlsZSwgXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7bmFtZX0pPT5uYW1lIT1cInJQclwiKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vc3R5bGVzXG4gICAgICAgIG51bUZtdCh3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoKX1cbiAgICAgICAgfSxcbiAgICAgICAgY2VsbFN0eWxlKHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcygpfVxuICAgICAgICB9LFxuICAgICAgICB4Zih3WG1sLG9kKXtcbiAgICAgICAgICAgIHJldHVybiB7Y2hpbGRyZW46bnVsbCwuLi5vZC5zdHlsZXMod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIG5hbWVzOntcbiAgICAgICAgICAgICAgICAgICAgd3JhcFRleHQ6XCJ3cmFwXCIsXG4gICAgICAgICAgICAgICAgICAgIGhvcml6b250YWw6XCJhbGlnblwiLFxuICAgICAgICAgICAgICAgICAgICB2ZXJ0aWNhbDpcInZlcnRBbGlnblwiLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgd3JhcFRleHQ6dj0+dj09XCJ0cnVlXCJ8fHY9PVwiMVwiID8gdHJ1ZSA6IGZhbHNlLFxuICAgICAgICAgICAgICAgIC4uLnBhcnNlSW50NEtleXMoXCJudW1GbXRJZCxmb250SWQsZmlsbElkLGJvcmRlcklkLHhmSWQsYXBwbHlOdW1iZXJGb3JtYXQsYXBwbHlGb250LGFwcGx5RmlsbCxhcHBseUJvcmRlcixhcHBseUFsaWdubWVudFwiKSxcbiAgICAgICAgICAgICAgICB0aWR5KHthcHBseU51bWJlckZvcm1hdCxhcHBseUZvbnQsYXBwbHlGaWxsLGFwcGx5Qm9yZGVyLGFwcGx5QWxpZ25tZW50LCAuLi5hfSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcGx5TnVtYmVyRm9ybWF0PT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGEubnVtRm10SWRcbiAgICAgICAgICAgICAgICAgICAgaWYoYXBwbHlGb250PT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGEuZm9udElkXG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcGx5RmlsbD09MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhLmZpbGxJZFxuICAgICAgICAgICAgICAgICAgICBpZihhcHBseUJvcmRlcj09MClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhLmJvcmRlcklkXG4gICAgICAgICAgICAgICAgICAgIGlmKGFwcGx5QWxpZ25tZW50PT0wKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGEuYWxpZ25tZW50XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSl9XG4gICAgICAgIH0sXG4gICAgICAgIHRhYmxlU3R5bGUod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKCl9XG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKFRleHRTdHlsZShvZCkpfVxuICAgICAgICB9LFxuICAgICAgICBmaWxsKHdYbWwsb2Qpe1xuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpudWxsLC4uLm9kLnN0eWxlcyh3WG1sKS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgYmdDb2xvcjpvZC5jb2xvcixcbiAgICAgICAgICAgICAgICBmZ0NvbG9yOm9kLmNvbG9yLFxuICAgICAgICAgICAgICAgIHRpZHkoe3BhdHRlcm5GaWxsOntmZ0NvbG9yOmJhY2tncm91bmQscGF0dGVyblR5cGV9fSl7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhdHRlcm5UeXBlPT1cIm5vbmVcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICAgICAgICAgICAgICBpZihwYXR0ZXJuVHlwZSAmJiBwYXR0ZXJuVHlwZS5zdGFydHNXaXRoKFwiZ3JheVwiKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCByPU51bWJlcihwYXJzZUludChwYXR0ZXJuVHlwZS5zdWJzdHJpbmcoNCkpKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7YmFja2dyb3VuZDpgIyR7cn0ke3J9JHtyfWB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtiYWNrZ3JvdW5kfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pfVxuICAgICAgICB9LFxuICAgICAgICBib3JkZXIod1htbCxvZCl7XG4gICAgICAgICAgICByZXR1cm4ge2NoaWxkcmVuOm51bGwsLi4ub2Quc3R5bGVzKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICBjb2xvcjpvZC5jb2xvcixcbiAgICAgICAgICAgICAgICB0aWR5X2xlZnQ6dGlkeV9ib3JkZXIsXG4gICAgICAgICAgICAgICAgdGlkeV9yaWdodDp0aWR5X2JvcmRlcixcbiAgICAgICAgICAgICAgICB0aWR5X2JvdHRvbTp0aWR5X2JvcmRlcixcbiAgICAgICAgICAgICAgICB0aWR5X3RvcDp0aWR5X2JvcmRlcixcbiAgICAgICAgICAgICAgICB0aWR5X2RpYWdvbmFsOiB0aWR5X2JvcmRlcixcbiAgICAgICAgICAgIH0pfVxuICAgICAgICB9LFxuICAgIH1cbn1cblxuXG5jb25zdCBwYXJzZUludDRLZXlzPWtleXM9PmtleXMuc3BsaXQoXCIsXCIpLnJlZHVjZSgocyxrKT0+KHNba109cGFyc2VJbnQscykse30pXG5jb25zdCBDb2xvckluZGV4PVwibHQxLGRrMSxsdDIsZGsyLGFjY2VudDEsYWNjZW50MixhY2NlbnQzLGFjY2VudDQsYWNjZW50NSxhY2NlbnQ2LGhsaW5rLGZvbEhsaW5rXCIuc3BsaXQoXCIsXCIpXG5jb25zdCB0aWR5X2JvcmRlcj0oe3N0eWxlLC4uLmF9KT0+e1xuICAgIHN3aXRjaChzdHlsZSl7XG4gICAgICAgIGNhc2UgXCJ0aGluXCI6XG4gICAgICAgICAgICBhLnN6PTFcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVha1xuICAgIH1cbiAgICByZXR1cm4gYVxufVxuY29uc3QgVGV4dFN0eWxlPW9kPT4oe1xuICAgIF9fZmlsdGVyOlwiOm5vdChzY2hlbWUsZmFtaWx5LGNoYXJzZXQpXCIsXG4gICAgbmFtZXM6e1xuICAgICAgICByRm9udDpcImZvbnRzXCIsXG4gICAgICAgIG5hbWU6XCJmb250c1wiLFxuICAgICAgICBzejpcInNpemVcIixcbiAgICAgICAgYjpcImJvbGRcIixcbiAgICAgICAgaTpcIml0YWxpY1wiLFxuICAgICAgICB1OlwidW5kZXJsaW5lXCIsXG4gICAgICAgIHZhbmlzaDpcImhpZGRlblwiXG4gICAgfSxcbiAgICByRm9udDooe2F0dHJpYnM6e3ZhbH19KT0+dmFsLFxuICAgIG5hbWU6KHthdHRyaWJzOnt2YWx9fSk9PnZhbCxcbiAgICBiOih7YXR0cmliczp7dmFsPXRydWV9fSk9PiEhdmFsLFxuICAgIGk6KHthdHRyaWJzOnt2YWw9dHJ1ZX19KT0+ISF2YWwsXG4gICAgdTooe2F0dHJpYnM6e3ZhbD1cInNpbmdsZVwifX0pPT52YWwsXG4gICAgdmFuaXNoOih7YXR0cmliczp7dmFsPXRydWV9fSk9PiEhdmFsLFxuICAgIHN6Oih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKSksXG5cbiAgICBjb2xvcjpvZC5jb2xvcixcbn0pXG5cbmNvbnN0IFhMU0ljdiA9IFtcbiAgICBcIiMwMDAwMDBcIixcblx0XCIjRkZGRkZGXCIsXG5cdFwiI0ZGMDAwMFwiLFxuXHRcIiMwMEZGMDBcIixcblx0XCIjMDAwMEZGXCIsXG5cdFwiI0ZGRkYwMFwiLFxuXHRcIiNGRjAwRkZcIixcblx0XCIjMDBGRkZGXCIsXG5cdFwiIzAwMDAwMFwiLFxuXHRcIiNGRkZGRkZcIixcblx0XCIjRkYwMDAwXCIsXG5cdFwiIzAwRkYwMFwiLFxuXHRcIiMwMDAwRkZcIixcblx0XCIjRkZGRjAwXCIsXG5cdFwiI0ZGMDBGRlwiLFxuXHRcIiMwMEZGRkZcIixcblx0XCIjODAwMDAwXCIsXG5cdFwiIzAwODAwMFwiLFxuXHRcIiMwMDAwODBcIixcblx0XCIjODA4MDAwXCIsXG5cdFwiIzgwMDA4MFwiLFxuXHRcIiMwMDgwODBcIixcblx0XCIjQzBDMEMwXCIsXG5cdFwiIzgwODA4MFwiLFxuXHRcIiM5OTk5RkZcIixcblx0XCIjOTkzMzY2XCIsXG5cdFwiI0ZGRkZDQ1wiLFxuXHRcIiNDQ0ZGRkZcIixcblx0XCIjNjYwMDY2XCIsXG5cdFwiI0ZGODA4MFwiLFxuXHRcIiMwMDY2Q0NcIixcblx0XCIjQ0NDQ0ZGXCIsXG5cdFwiIzAwMDA4MFwiLFxuXHRcIiNGRjAwRkZcIixcblx0XCIjRkZGRjAwXCIsXG5cdFwiIzAwRkZGRlwiLFxuXHRcIiM4MDAwODBcIixcblx0XCIjODAwMDAwXCIsXG5cdFwiIzAwODA4MFwiLFxuXHRcIiMwMDAwRkZcIixcblx0XCIjMDBDQ0ZGXCIsXG5cdFwiI0NDRkZGRlwiLFxuXHRcIiNDQ0ZGQ0NcIixcblx0XCIjRkZGRjk5XCIsXG5cdFwiIzk5Q0NGRlwiLFxuXHRcIiNGRjk5Q0NcIixcblx0XCIjQ0M5OUZGXCIsXG5cdFwiI0ZGQ0M5OVwiLFxuXHRcIiMzMzY2RkZcIixcblx0XCIjMzNDQ0NDXCIsXG5cdFwiIzk5Q0MwMFwiLFxuXHRcIiNGRkNDMDBcIixcblx0XCIjRkY5OTAwXCIsXG5cdFwiI0ZGNjYwMFwiLFxuXHRcIiM2NjY2OTlcIixcblx0XCIjOTY5Njk2XCIsXG5cdFwiIzAwMzM2NlwiLFxuXHRcIiMzMzk5NjZcIixcblx0XCIjMDAzMzAwXCIsXG5cdFwiIzMzMzMwMFwiLFxuXHRcIiM5OTMzMDBcIixcblx0XCIjOTkzMzY2XCIsXG5cdFwiIzMzMzM5OVwiLFxuXHRcIiMzMzMzMzNcIixcblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQwIGljdkZvcmVncm91bmQgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQxIGljdkJhY2tncm91bmQgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQyIGljdkZyYW1lID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0MyBpY3YzRCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDQgaWN2M0RUZXh0ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0NSBpY3YzREhpbGl0ZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDYgaWN2M0RTaGFkb3cgPz8gKi9cblx0XCIjMDAwMDAwXCIsIC8qIFwiIzQ3IGljdkhpbGl0ZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDggaWN2Q3RsVGV4dCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNDkgaWN2Q3RsU2NybCA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEEgaWN2Q3RsSW52ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0QiBpY3ZDdGxCb2R5ID8/ICovXG5cdFwiIzAwMDAwMFwiLCAvKiBcIiM0QyBpY3ZDdGxGcmFtZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEQgaWN2Q3RsRm9yZSA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEUgaWN2Q3RsQmFjayA/PyAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNEYgaWN2Q3RsTmV1dHJhbCAqL1xuXHRcIiMwMDAwMDBcIiwgLyogXCIjNTAgaWN2SW5mb0JrID8/ICovXG5cdFwiIzAwMDAwMFwiIC8qIFwiIzUxIGljdkluZm9UZXh0ID8/ICovXG5dXG4iXX0=