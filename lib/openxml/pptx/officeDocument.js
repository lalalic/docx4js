"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _officeDocument = require("../officeDocument");

var _officeDocument2 = _interopRequireDefault(_officeDocument);

var _part = require("../part");

var _part2 = _interopRequireDefault(_part);

var _drawml = require("../drawml");

var _drawml2 = _interopRequireDefault(_drawml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OfficeDocument = function (_Base) {
    _inherits(OfficeDocument, _Base);

    function OfficeDocument() {
        _classCallCheck(this, OfficeDocument);

        return _possibleConstructorReturn(this, (OfficeDocument.__proto__ || Object.getPrototypeOf(OfficeDocument)).apply(this, arguments));
    }

    _createClass(OfficeDocument, [{
        key: "_init",
        value: function _init() {
            _get(OfficeDocument.prototype.__proto__ || Object.getPrototypeOf(OfficeDocument.prototype), "_init", this).call(this);
            this._assignRel("tableStyles,viewProps,presProps".split(","));
        }
    }, {
        key: "render",
        value: function render(createElement) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            if (this.tableStyles) {
                this.renderNode(this.tableStyles.root().children().get(0), createElement, identify);
            }
            return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify);
        }
    }, {
        key: "slide",
        value: function slide(_ref) {
            var id = _ref.id,
                rid = _ref["r:id"];

            return this.getRel(rid);
        }
    }, {
        key: "master",
        value: function master(_ref2) {
            var id = _ref2.id,
                rid = _ref2["r:id"];

            return this.slide.apply(this, arguments);
        }
    }, {
        key: "notesMaster",
        value: function notesMaster() {
            return this.slide.apply(this, arguments);
        }
    }, {
        key: "handoutMaster",
        value: function handoutMaster() {
            return this.slide.apply(this, arguments);
        }
    }, {
        key: "masterPartOfLayout",
        value: function masterPartOfLayout(wXmlLayoutIdInMaster) {
            var masterRoot = this.$(wXmlLayoutIdInMaster).root().get(0);
            var masterPartName = masterRoot.attribs.part;

            return this.doc.getRelObject(masterPartName);
        }
    }]);

    return OfficeDocument;
}(_officeDocument2.default);

OfficeDocument.identities = {
    presentation: function presentation(wXml, officeDocument) {
        var $ = officeDocument.content("p\\:presentation");
        var content = "p\\:handoutMasterIdLst,p\\:notesMasterIdLst,p\\:sldIdLst,p\\:sldMasterIdLst";
        var children = $.children(content).toArray();
        var orders = { "p:sldMasterIdLst": 1, "p:sldIdLst": 2 };
        children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });

        var sz = function sz(_ref3) {
            var _ref3$attribs = _ref3.attribs,
                cx = _ref3$attribs.cx,
                cy = _ref3$attribs.cy;
            return { width: officeDocument.doc.emu2Px(cx), height: officeDocument.doc.emu2Px(cy) };
        };
        var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(" + content + ",a\\:extLst)",
            sldSz: sz,
            notesSz: sz
        }));

        return _extends({}, props, { type: "document", children: children });
    },
    sldMasterId: function sldMasterId(wXml, officeDocument) {
        var content = "p\\:sldLayoutIdLst,p\\:cSld";
        var $ = officeDocument.master(wXml.attribs);
        var $master = $("p\\:sldMaster");
        var props = $master.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(" + content + ",a\\:extLst)"
        }));
        var children = $master.children(content).toArray();
        var orders = { "p:sldLayoutLst": 1, "p:cSld": 2 };
        children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });

        return _extends({}, props, { part: $.part, children: children, type: "slideMaster" });
    },
    sldId: function sldId(wXml, officeDocument) {
        var content = "p\\:cSld";
        var $ = officeDocument.slide(wXml.attribs);
        var $slide = $('p\\:sld');
        var props = $slide.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(" + content + ",a\\:extLst)"
        }));
        var children = $slide.children(content).toArray();

        var slidePart = officeDocument.getRelPart(wXml.attribs["r:id"]);
        var layoutTarget = officeDocument.doc.normalizePath(slidePart.normalizePath(slidePart.getRelTarget("slideLayout")));
        var layoutPart = new _part2.default(layoutTarget, officeDocument.doc);
        var masterTarget = officeDocument.doc.normalizePath(layoutPart.normalizePath(layoutPart.getRelTarget("slideMaster")));
        return _extends({}, props, { part: $.part, layout: layoutTarget, master: masterTarget, children: children, type: "slide" });
    },
    notesMasterId: function notesMasterId(wXml, officeDocument) {
        var $ = officeDocument.notesMaster(wXml.attribs);
        return { part: $.part, type: "noteMaster" };
    },
    handoutMasterId: function handoutMasterId(wXml, officeDocument) {
        var $ = officeDocument.handoutMaster(wXml.attribs);
        return { part: $.part, type: "handoutMaster" };
    },
    sldLayoutId: function sldLayoutId(wXml, officeDocument) {
        //in master
        var content = "p\\:cSld";
        var master = officeDocument.$(wXml).part();
        var $ = new _part2.default(master, officeDocument.doc).getRel(wXml.attribs["r:id"]);
        var $layout = $("p\\:sldLayout");
        var props = $layout.props({ __filter: ":not(" + content + ",a\\:extLst)" });
        var children = $layout.children(content).toArray();

        return _extends({}, props, { part: $.part, master: master, children: children, type: "slideLayout" });
    },
    spTree: function spTree(wXml, officeDocument) {
        var content = ":not(p\\:nvGrpSpPr,p\\:grpSpPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = officeDocument.$(wXml).props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: "p\\:nvGrpSpPr,p\\:grpSpPr",
            tidy: function tidy(_ref4) {
                var grpSpPr = _ref4.grpSpPr,
                    _ref4$nvGrpSpPr = _ref4.nvGrpSpPr,
                    _ref4$nvGrpSpPr$cNvPr = _ref4$nvGrpSpPr.cNvPr,
                    cNvPr = _ref4$nvGrpSpPr$cNvPr === undefined ? {} : _ref4$nvGrpSpPr$cNvPr,
                    _ref4$nvGrpSpPr$cNvSp = _ref4$nvGrpSpPr.cNvSpPr,
                    cNvSpPr = _ref4$nvGrpSpPr$cNvSp === undefined ? {} : _ref4$nvGrpSpPr$cNvSp,
                    _ref4$nvGrpSpPr$nvPr = _ref4$nvGrpSpPr.nvPr,
                    nvPr = _ref4$nvGrpSpPr$nvPr === undefined ? {} : _ref4$nvGrpSpPr$nvPr,
                    others = _objectWithoutProperties(_ref4, ["grpSpPr", "nvGrpSpPr"]);

                return _extends({}, grpSpPr, cNvPr, cNvSpPr, nvPr, others);
            }
        }));

        return _extends({}, props, { type: "spTree", children: children });
    },
    pic: function pic(wXml, officeDocument) {
        var props = officeDocument.$(wXml).props(_extends({}, (0, _drawml2.default)(officeDocument), {
            tidy: function tidy(_ref5) {
                var spPr = _ref5.spPr,
                    _ref5$nvPicPr = _ref5.nvPicPr,
                    _ref5$nvPicPr$cNvPr = _ref5$nvPicPr.cNvPr,
                    cNvPr = _ref5$nvPicPr$cNvPr === undefined ? {} : _ref5$nvPicPr$cNvPr,
                    _ref5$nvPicPr$cNvSpPr = _ref5$nvPicPr.cNvSpPr,
                    cNvSpPr = _ref5$nvPicPr$cNvSpPr === undefined ? {} : _ref5$nvPicPr$cNvSpPr,
                    _ref5$nvPicPr$nvPr = _ref5$nvPicPr.nvPr,
                    nvPr = _ref5$nvPicPr$nvPr === undefined ? {} : _ref5$nvPicPr$nvPr,
                    others = _objectWithoutProperties(_ref5, ["spPr", "nvPicPr"]);

                return _extends({}, spPr, cNvPr, cNvSpPr, nvPr, others);
            }
        }));
        return _extends({}, props, { type: "picture" });
    },
    sp: function sp(wXml, officeDocument) {
        var content = "p\\:txBody";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var commonProps = (0, _drawml2.default)(officeDocument);
        var names = _extends({ spLocks: "locks", ph: "placeholder" }, commonProps.names);
        var props = $.props(_extends({}, commonProps, {
            __filter: ":not(" + content + ",a\\:extLst)",
            names: names,
            ph: function ph(_ref6) {
                var _ref6$attribs = _ref6.attribs,
                    _ref6$attribs$type = _ref6$attribs.type,
                    type = _ref6$attribs$type === undefined ? "body" : _ref6$attribs$type,
                    idx = _ref6$attribs.idx;
                return { type: type, idx: idx };
            },
            tidy: function tidy(_ref7) {
                var spPr = _ref7.spPr,
                    _ref7$nvSpPr = _ref7.nvSpPr,
                    _ref7$nvSpPr$cNvPr = _ref7$nvSpPr.cNvPr,
                    cNvPr = _ref7$nvSpPr$cNvPr === undefined ? {} : _ref7$nvSpPr$cNvPr,
                    _ref7$nvSpPr$cNvSpPr = _ref7$nvSpPr.cNvSpPr,
                    cNvSpPr = _ref7$nvSpPr$cNvSpPr === undefined ? {} : _ref7$nvSpPr$cNvSpPr,
                    _ref7$nvSpPr$nvPr = _ref7$nvSpPr.nvPr,
                    nvPr = _ref7$nvSpPr$nvPr === undefined ? {} : _ref7$nvSpPr$nvPr;
                return _extends({}, spPr, cNvPr, cNvSpPr, nvPr);
            }
        }));

        var txBody = OfficeDocument.identities.txBody(children[0], officeDocument);
        return _extends({}, props, { children: children }, txBody, { type: "shape" });
    },
    txBody: function txBody(wXml, officeDocument) {
        var content = "a\\:p";
        var $ = officeDocument.$(wXml);
        var children = $.children("a\\:p").toArray();
        var textStyle = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            lnSpcReduction: function lnSpcReduction(v) {
                return parseInt(v);
            },
            fontScale: function fontScale(v) {
                return parseInt(v);
            },
            __filter: ":not(a\\:p,a\\:extLst)",
            tidy: function tidy(_ref8) {
                var _ref8$lstStyle = _ref8.lstStyle,
                    lstStyle = _ref8$lstStyle === undefined ? {} : _ref8$lstStyle,
                    _ref8$bodyPr = _ref8.bodyPr,
                    bodyPr = _ref8$bodyPr === undefined ? {} : _ref8$bodyPr,
                    others = _objectWithoutProperties(_ref8, ["lstStyle", "bodyPr"]);

                return _extends({}, others, bodyPr, lstStyle);
            }
        }));
        return { textStyle: textStyle, children: children, type: "txBody" };
    },
    p: function p(wXml, officeDocument) {
        var content = ":not(a\\:pPr,a\\:endParaRPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var style = $.children("a\\:pPr").props((0, _drawml2.default)(officeDocument));
        var defaultStyle = $.children("a\\:endParaRPr").props((0, _drawml2.default)(officeDocument));
        return { style: _extends({ lvl: 0 }, style), defaultStyle: defaultStyle, children: children, type: "p" };
    },
    r: function r(wXml, officeDocument) {
        var content = ":not(a\\:rPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var style = $.children("a\\:rPr").props(_extends({}, (0, _drawml2.default)(officeDocument)));
        return { style: style, children: children, type: "r" };
    },
    chart: function chart(wXml, officeDocument) {
        return { type: "chart" };
    },
    relIds: function relIds(wXml, officeDocument) {
        return { type: "diagram" };
    },
    graphicFrame: function graphicFrame(wXml, officeDocument) {
        var content = "a\\:graphic";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(" + content + ",a\\:extLst)",
            tidy: function tidy(_ref9) {
                var spPr = _ref9.spPr,
                    _ref9$nvGraphicFrameP = _ref9.nvGraphicFramePr,
                    _ref9$nvGraphicFrameP2 = _ref9$nvGraphicFrameP.cNvPr,
                    cNvPr = _ref9$nvGraphicFrameP2 === undefined ? {} : _ref9$nvGraphicFrameP2,
                    _ref9$nvGraphicFrameP3 = _ref9$nvGraphicFrameP.cNvSpPr,
                    cNvSpPr = _ref9$nvGraphicFrameP3 === undefined ? {} : _ref9$nvGraphicFrameP3,
                    _ref9$nvGraphicFrameP4 = _ref9$nvGraphicFrameP.nvPr,
                    nvPr = _ref9$nvGraphicFrameP4 === undefined ? {} : _ref9$nvGraphicFrameP4,
                    others = _objectWithoutProperties(_ref9, ["spPr", "nvGraphicFramePr"]);

                return _extends({}, spPr, cNvPr, cNvSpPr, nvPr, others);
            }
        }));
        return _extends({}, props, { children: children, type: "graphicFrame" });
    },
    tbl: function tbl(wXml, officeDocument) {
        var content = "a\\:tr";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(" + content + ", a\\:extLst)",
            tableStyleId: function tableStyleId(_ref10) {
                var children = _ref10.children;
                return children.find(function (a) {
                    return a.data;
                }).data;
            },
            tblGrid: function tblGrid(_ref11) {
                var children = _ref11.children;
                return children.filter(function (a) {
                    return a.name;
                }).reduce(function (cols, _ref12) {
                    var w = _ref12.attribs.w;

                    cols.push(officeDocument.doc.emu2Px(w));
                    return cols;
                }, []);
            },
            tidy: function tidy(_ref13) {
                var tblPr = _ref13.tblPr,
                    cols = _ref13.tblGrid,
                    others = _objectWithoutProperties(_ref13, ["tblPr", "tblGrid"]);

                return _extends({}, tblPr, { cols: cols }, others);
            }
        }));
        return _extends({}, props, { children: children, type: "tbl" });
    },
    tblStyle: function tblStyle(wXml, officeDocument) {
        var $ = officeDocument.$(wXml);
        var props = $.props((0, _drawml2.default)(officeDocument));
        return _extends({}, props, { type: "tblStyle" });
    },
    tr: function tr(wXml, officeDocument) {
        var $ = officeDocument.$(wXml);
        var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            __filter: ":not(*)",
            h: function h(v) {
                return officeDocument.doc.emu2Px(v);
            },
            names: { h: "height" }
        }));
        return _extends({}, props, { children: wXml.children, type: "tr" });
    },
    tc: function tc(wXml, officeDocument) {
        var content = "a\\:txBody";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = $.props({
            __filter: ":not(" + content + ",a\\:extLst)"
        });
        return _extends({}, props, { type: "tc", children: children });
    }
};
exports.default = OfficeDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ0YWJsZVN0eWxlcyIsInJlbmRlck5vZGUiLCJyb290IiwiY2hpbGRyZW4iLCJnZXQiLCJjb250ZW50IiwiaWQiLCJyaWQiLCJnZXRSZWwiLCJzbGlkZSIsImFyZ3VtZW50cyIsIndYbWxMYXlvdXRJZEluTWFzdGVyIiwibWFzdGVyUm9vdCIsIiQiLCJtYXN0ZXJQYXJ0TmFtZSIsImF0dHJpYnMiLCJwYXJ0IiwiZG9jIiwiZ2V0UmVsT2JqZWN0IiwiQmFzZSIsImlkZW50aXRpZXMiLCJwcmVzZW50YXRpb24iLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJ0b0FycmF5Iiwib3JkZXJzIiwic29ydCIsImEiLCJiIiwibmFtZSIsInN6IiwiY3giLCJjeSIsIndpZHRoIiwiZW11MlB4IiwiaGVpZ2h0IiwicHJvcHMiLCJfX2ZpbHRlciIsInNsZFN6Iiwibm90ZXNTeiIsInR5cGUiLCJzbGRNYXN0ZXJJZCIsIm1hc3RlciIsIiRtYXN0ZXIiLCJzbGRJZCIsIiRzbGlkZSIsInNsaWRlUGFydCIsImdldFJlbFBhcnQiLCJsYXlvdXRUYXJnZXQiLCJub3JtYWxpemVQYXRoIiwiZ2V0UmVsVGFyZ2V0IiwibGF5b3V0UGFydCIsIlBhcnQiLCJtYXN0ZXJUYXJnZXQiLCJsYXlvdXQiLCJub3Rlc01hc3RlcklkIiwibm90ZXNNYXN0ZXIiLCJoYW5kb3V0TWFzdGVySWQiLCJoYW5kb3V0TWFzdGVyIiwic2xkTGF5b3V0SWQiLCIkbGF5b3V0Iiwic3BUcmVlIiwidGlkeSIsImdycFNwUHIiLCJudkdycFNwUHIiLCJjTnZQciIsImNOdlNwUHIiLCJudlByIiwib3RoZXJzIiwicGljIiwic3BQciIsIm52UGljUHIiLCJzcCIsImNvbW1vblByb3BzIiwibmFtZXMiLCJzcExvY2tzIiwicGgiLCJpZHgiLCJudlNwUHIiLCJ0eEJvZHkiLCJ0ZXh0U3R5bGUiLCJsblNwY1JlZHVjdGlvbiIsInBhcnNlSW50IiwidiIsImZvbnRTY2FsZSIsImxzdFN0eWxlIiwiYm9keVByIiwicCIsInN0eWxlIiwiZGVmYXVsdFN0eWxlIiwibHZsIiwiciIsImNoYXJ0IiwicmVsSWRzIiwiZ3JhcGhpY0ZyYW1lIiwibnZHcmFwaGljRnJhbWVQciIsInRibCIsInRhYmxlU3R5bGVJZCIsImZpbmQiLCJkYXRhIiwidGJsR3JpZCIsImZpbHRlciIsInJlZHVjZSIsImNvbHMiLCJ3IiwicHVzaCIsInRibFByIiwidGJsU3R5bGUiLCJ0ciIsImgiLCJ0YyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Z0NBQ1Y7QUFDSDtBQUNBLGlCQUFLQyxVQUFMLENBQWdCLGtDQUFrQ0MsS0FBbEMsQ0FBd0MsR0FBeEMsQ0FBaEI7QUFDSDs7OytCQUVNQyxhLEVBQXlFO0FBQUEsZ0JBQTFEQyxRQUEwRCx1RUFBakQsS0FBS0MsV0FBTCxDQUFpQkQsUUFBakIsQ0FBMEJFLElBQTFCLENBQStCLEtBQUtELFdBQXBDLENBQWlEOztBQUM1RSxnQkFBRyxLQUFLRSxXQUFSLEVBQW9CO0FBQ2hCLHFCQUFLQyxVQUFMLENBQWdCLEtBQUtELFdBQUwsQ0FBaUJFLElBQWpCLEdBQXdCQyxRQUF4QixHQUFtQ0MsR0FBbkMsQ0FBdUMsQ0FBdkMsQ0FBaEIsRUFBMkRSLGFBQTNELEVBQTBFQyxRQUExRTtBQUNIO0FBQ0QsbUJBQU8sS0FBS0ksVUFBTCxDQUFnQixLQUFLSSxPQUFMLENBQWEsa0JBQWIsRUFBaUNELEdBQWpDLENBQXFDLENBQXJDLENBQWhCLEVBQXlEUixhQUF6RCxFQUF3RUMsUUFBeEUsQ0FBUDtBQUNIOzs7b0NBRXFCO0FBQUEsZ0JBQWZTLEVBQWUsUUFBZkEsRUFBZTtBQUFBLGdCQUFMQyxHQUFLLFFBQVosTUFBWTs7QUFDbEIsbUJBQU8sS0FBS0MsTUFBTCxDQUFZRCxHQUFaLENBQVA7QUFDSDs7O3NDQUVzQjtBQUFBLGdCQUFmRCxFQUFlLFNBQWZBLEVBQWU7QUFBQSxnQkFBTEMsR0FBSyxTQUFaLE1BQVk7O0FBQ25CLG1CQUFPLEtBQUtFLEtBQUwsYUFBY0MsU0FBZCxDQUFQO0FBQ0g7OztzQ0FFWTtBQUNULG1CQUFPLEtBQUtELEtBQUwsYUFBY0MsU0FBZCxDQUFQO0FBQ0g7Ozt3Q0FFYztBQUNYLG1CQUFPLEtBQUtELEtBQUwsYUFBY0MsU0FBZCxDQUFQO0FBQ0g7OzsyQ0FFa0JDLG9CLEVBQXFCO0FBQ3BDLGdCQUFNQyxhQUFXLEtBQUtDLENBQUwsQ0FBT0Ysb0JBQVAsRUFBNkJULElBQTdCLEdBQW9DRSxHQUFwQyxDQUF3QyxDQUF4QyxDQUFqQjtBQURvQyxnQkFFeEJVLGNBRndCLEdBRVJGLFdBQVdHLE9BRkgsQ0FFN0JDLElBRjZCOztBQUdwQyxtQkFBTyxLQUFLQyxHQUFMLENBQVNDLFlBQVQsQ0FBc0JKLGNBQXRCLENBQVA7QUFDSDs7OztFQWpDdUNLLHdCOztBQUF2QjFCLGMsQ0FtQ1YyQixVLEdBQVc7QUFDZEMsZ0JBRGMsd0JBQ0RDLElBREMsRUFDSUMsY0FESixFQUNtQjtBQUN0QyxZQUFNVixJQUFFVSxlQUFlbEIsT0FBZixDQUF1QixrQkFBdkIsQ0FBUjtBQUNTLFlBQU1BLFVBQVEsNkVBQWQ7QUFDQSxZQUFNRixXQUFTVSxFQUFFVixRQUFGLENBQVdFLE9BQVgsRUFBb0JtQixPQUFwQixFQUFmO0FBQ0EsWUFBTUMsU0FBTyxFQUFDLG9CQUFtQixDQUFwQixFQUF1QixjQUFhLENBQXBDLEVBQWI7QUFDQXRCLGlCQUFTdUIsSUFBVCxDQUFjLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLG1CQUFPLENBQUNILE9BQU9FLEVBQUVFLElBQVQsS0FBZ0IsRUFBakIsS0FBc0JKLE9BQU9HLEVBQUVDLElBQVQsS0FBZ0IsRUFBdEMsQ0FBUDtBQUFBLFNBQWQ7O0FBRUEsWUFBTUMsS0FBRyxTQUFIQSxFQUFHO0FBQUEsc0NBQUVmLE9BQUY7QUFBQSxnQkFBV2dCLEVBQVgsaUJBQVdBLEVBQVg7QUFBQSxnQkFBY0MsRUFBZCxpQkFBY0EsRUFBZDtBQUFBLG1CQUFzQixFQUFDQyxPQUFNVixlQUFlTixHQUFmLENBQW1CaUIsTUFBbkIsQ0FBMEJILEVBQTFCLENBQVAsRUFBcUNJLFFBQU9aLGVBQWVOLEdBQWYsQ0FBbUJpQixNQUFuQixDQUEwQkYsRUFBMUIsQ0FBNUMsRUFBdEI7QUFBQSxTQUFUO0FBQ0EsWUFBTUksUUFBTXZCLEVBQUV1QixLQUFGLGNBQ0wsc0JBQU9iLGNBQVAsQ0FESztBQUVSYyxnQ0FBaUJoQyxPQUFqQixpQkFGUTtBQUdSaUMsbUJBQU1SLEVBSEU7QUFJUlMscUJBQVFUO0FBSkEsV0FBWjs7QUFPQSw0QkFBV00sS0FBWCxJQUFrQkksTUFBSyxVQUF2QixFQUFrQ3JDLGtCQUFsQztBQUNULEtBakJtQjtBQW1CZHNDLGVBbkJjLHVCQW1CRm5CLElBbkJFLEVBbUJJQyxjQW5CSixFQW1CbUI7QUFDN0IsWUFBTWxCLFVBQVEsNkJBQWQ7QUFDQSxZQUFNUSxJQUFFVSxlQUFlbUIsTUFBZixDQUFzQnBCLEtBQUtQLE9BQTNCLENBQVI7QUFDQSxZQUFNNEIsVUFBUTlCLEVBQUUsZUFBRixDQUFkO0FBQ0EsWUFBTXVCLFFBQU1PLFFBQVFQLEtBQVIsY0FDTCxzQkFBT2IsY0FBUCxDQURLO0FBRVJjLGdDQUFpQmhDLE9BQWpCO0FBRlEsV0FBWjtBQUlBLFlBQU1GLFdBQVN3QyxRQUFReEMsUUFBUixDQUFpQkUsT0FBakIsRUFBMEJtQixPQUExQixFQUFmO0FBQ0EsWUFBTUMsU0FBTyxFQUFDLGtCQUFpQixDQUFsQixFQUFxQixVQUFTLENBQTlCLEVBQWI7QUFDQXRCLGlCQUFTdUIsSUFBVCxDQUFjLFVBQUNDLENBQUQsRUFBR0MsQ0FBSDtBQUFBLG1CQUFPLENBQUNILE9BQU9FLEVBQUVFLElBQVQsS0FBZ0IsRUFBakIsS0FBc0JKLE9BQU9HLEVBQUVDLElBQVQsS0FBZ0IsRUFBdEMsQ0FBUDtBQUFBLFNBQWQ7O0FBRUEsNEJBQVdPLEtBQVgsSUFBa0JwQixNQUFNSCxFQUFFRyxJQUExQixFQUFnQ2Isa0JBQWhDLEVBQXlDcUMsTUFBSyxhQUE5QztBQUNILEtBaENhO0FBa0NkSSxTQWxDYyxpQkFrQ1J0QixJQWxDUSxFQWtDSEMsY0FsQ0csRUFrQ1k7QUFDdEIsWUFBTWxCLFVBQVEsVUFBZDtBQUNBLFlBQU1RLElBQUVVLGVBQWVkLEtBQWYsQ0FBcUJhLEtBQUtQLE9BQTFCLENBQVI7QUFDQSxZQUFNOEIsU0FBT2hDLEVBQUUsU0FBRixDQUFiO0FBQ0EsWUFBTXVCLFFBQU1TLE9BQU9ULEtBQVAsY0FDTCxzQkFBT2IsY0FBUCxDQURLO0FBRVJjLGdDQUFpQmhDLE9BQWpCO0FBRlEsV0FBWjtBQUlBLFlBQU1GLFdBQVMwQyxPQUFPMUMsUUFBUCxDQUFnQkUsT0FBaEIsRUFBeUJtQixPQUF6QixFQUFmOztBQUVBLFlBQU1zQixZQUFVdkIsZUFBZXdCLFVBQWYsQ0FBMEJ6QixLQUFLUCxPQUFMLENBQWEsTUFBYixDQUExQixDQUFoQjtBQUNBLFlBQU1pQyxlQUFhekIsZUFBZU4sR0FBZixDQUFtQmdDLGFBQW5CLENBQWlDSCxVQUFVRyxhQUFWLENBQXdCSCxVQUFVSSxZQUFWLENBQXVCLGFBQXZCLENBQXhCLENBQWpDLENBQW5CO0FBQ0EsWUFBTUMsYUFBVyxJQUFJQyxjQUFKLENBQVNKLFlBQVQsRUFBc0J6QixlQUFlTixHQUFyQyxDQUFqQjtBQUNBLFlBQU1vQyxlQUFhOUIsZUFBZU4sR0FBZixDQUFtQmdDLGFBQW5CLENBQWlDRSxXQUFXRixhQUFYLENBQXlCRSxXQUFXRCxZQUFYLENBQXdCLGFBQXhCLENBQXpCLENBQWpDLENBQW5CO0FBQ0EsNEJBQVdkLEtBQVgsSUFBaUJwQixNQUFLSCxFQUFFRyxJQUF4QixFQUE4QnNDLFFBQU9OLFlBQXJDLEVBQW1ETixRQUFPVyxZQUExRCxFQUF3RWxELGtCQUF4RSxFQUFrRnFDLE1BQUssT0FBdkY7QUFDSCxLQWpEYTtBQW1EZGUsaUJBbkRjLHlCQW1EQWpDLElBbkRBLEVBbURNQyxjQW5ETixFQW1EcUI7QUFDL0IsWUFBTVYsSUFBRVUsZUFBZWlDLFdBQWYsQ0FBMkJsQyxLQUFLUCxPQUFoQyxDQUFSO0FBQ0EsZUFBTyxFQUFDQyxNQUFLSCxFQUFFRyxJQUFSLEVBQWF3QixNQUFLLFlBQWxCLEVBQVA7QUFDSCxLQXREYTtBQXdEZGlCLG1CQXhEYywyQkF3REVuQyxJQXhERixFQXdEUUMsY0F4RFIsRUF3RHVCO0FBQ2pDLFlBQU1WLElBQUVVLGVBQWVtQyxhQUFmLENBQTZCcEMsS0FBS1AsT0FBbEMsQ0FBUjtBQUNBLGVBQU8sRUFBQ0MsTUFBS0gsRUFBRUcsSUFBUixFQUFhd0IsTUFBSyxlQUFsQixFQUFQO0FBQ0gsS0EzRGE7QUE2RGRtQixlQTdEYyx1QkE2REZyQyxJQTdERSxFQTZER0MsY0E3REgsRUE2RGtCO0FBQUM7QUFDN0IsWUFBTWxCLFVBQVEsVUFBZDtBQUNBLFlBQU1xQyxTQUFPbkIsZUFBZVYsQ0FBZixDQUFpQlMsSUFBakIsRUFBdUJOLElBQXZCLEVBQWI7QUFDQSxZQUFNSCxJQUFFLElBQUl1QyxjQUFKLENBQVNWLE1BQVQsRUFBZ0JuQixlQUFlTixHQUEvQixFQUFvQ1QsTUFBcEMsQ0FBMkNjLEtBQUtQLE9BQUwsQ0FBYSxNQUFiLENBQTNDLENBQVI7QUFDQSxZQUFNNkMsVUFBUS9DLEVBQUUsZUFBRixDQUFkO0FBQ0EsWUFBTXVCLFFBQU13QixRQUFReEIsS0FBUixDQUFjLEVBQUNDLG9CQUFpQmhDLE9BQWpCLGlCQUFELEVBQWQsQ0FBWjtBQUNBLFlBQU1GLFdBQVN5RCxRQUFRekQsUUFBUixDQUFpQkUsT0FBakIsRUFBMEJtQixPQUExQixFQUFmOztBQUVBLDRCQUFXWSxLQUFYLElBQWlCcEIsTUFBS0gsRUFBRUcsSUFBeEIsRUFBOEIwQixjQUE5QixFQUFzQ3ZDLGtCQUF0QyxFQUFnRHFDLE1BQUssYUFBckQ7QUFDSCxLQXRFYTtBQXdFZHFCLFVBeEVjLGtCQXdFUHZDLElBeEVPLEVBd0VGQyxjQXhFRSxFQXdFYTtBQUN2QixZQUFNbEIsVUFBUSxpQ0FBZDtBQUNBLFlBQU1RLElBQUVVLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLENBQVI7QUFDQSxZQUFNbkIsV0FBU1UsRUFBRVYsUUFBRixDQUFXRSxPQUFYLEVBQW9CbUIsT0FBcEIsRUFBZjtBQUNBLFlBQU1ZLFFBQU1iLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLEVBQXVCYyxLQUF2QixjQUNMLHNCQUFPYixjQUFQLENBREs7QUFFUmMsaURBRlE7QUFHUnlCLGtCQUFLO0FBQUEsb0JBQUVDLE9BQUYsU0FBRUEsT0FBRjtBQUFBLDRDQUFXQyxTQUFYO0FBQUEsNERBQXNCQyxLQUF0QjtBQUFBLG9CQUFzQkEsS0FBdEIseUNBQTRCLEVBQTVCO0FBQUEsNERBQStCQyxPQUEvQjtBQUFBLG9CQUErQkEsT0FBL0IseUNBQXVDLEVBQXZDO0FBQUEsMkRBQTBDQyxJQUExQztBQUFBLG9CQUEwQ0EsSUFBMUMsd0NBQStDLEVBQS9DO0FBQUEsb0JBQXVEQyxNQUF2RDs7QUFBQSxvQ0FBc0VMLE9BQXRFLEVBQWtGRSxLQUFsRixFQUEyRkMsT0FBM0YsRUFBc0dDLElBQXRHLEVBQThHQyxNQUE5RztBQUFBO0FBSEcsV0FBWjs7QUFNQSw0QkFBV2hDLEtBQVgsSUFBaUJJLE1BQUssUUFBdEIsRUFBZ0NyQyxrQkFBaEM7QUFDSCxLQW5GYTtBQXFGZGtFLE9BckZjLGVBcUZWL0MsSUFyRlUsRUFxRkpDLGNBckZJLEVBcUZXO0FBQ3JCLFlBQU1hLFFBQU1iLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLEVBQXVCYyxLQUF2QixjQUNMLHNCQUFPYixjQUFQLENBREs7QUFFUnVDLGtCQUFLO0FBQUEsb0JBQUVRLElBQUYsU0FBRUEsSUFBRjtBQUFBLDBDQUFRQyxPQUFSO0FBQUEsd0RBQWlCTixLQUFqQjtBQUFBLG9CQUFpQkEsS0FBakIsdUNBQXVCLEVBQXZCO0FBQUEsMERBQTBCQyxPQUExQjtBQUFBLG9CQUEwQkEsT0FBMUIseUNBQWtDLEVBQWxDO0FBQUEsdURBQXFDQyxJQUFyQztBQUFBLG9CQUFxQ0EsSUFBckMsc0NBQTBDLEVBQTFDO0FBQUEsb0JBQWtEQyxNQUFsRDs7QUFBQSxvQ0FBaUVFLElBQWpFLEVBQTBFTCxLQUExRSxFQUFtRkMsT0FBbkYsRUFBOEZDLElBQTlGLEVBQXNHQyxNQUF0RztBQUFBO0FBRkcsV0FBWjtBQUlBLDRCQUFXaEMsS0FBWCxJQUFpQkksTUFBSyxTQUF0QjtBQUNILEtBM0ZhO0FBNkZkZ0MsTUE3RmMsY0E2RlhsRCxJQTdGVyxFQTZGTEMsY0E3RkssRUE2RlU7QUFDcEIsWUFBTWxCLFVBQVEsWUFBZDtBQUNULFlBQU1RLElBQUVVLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLENBQVI7QUFDUyxZQUFNbkIsV0FBU1UsRUFBRVYsUUFBRixDQUFXRSxPQUFYLEVBQW9CbUIsT0FBcEIsRUFBZjtBQUNBLFlBQU1pRCxjQUFZLHNCQUFPbEQsY0FBUCxDQUFsQjtBQUNBLFlBQU1tRCxtQkFBT0MsU0FBUSxPQUFmLEVBQXdCQyxJQUFHLGFBQTNCLElBQTZDSCxZQUFZQyxLQUF6RCxDQUFOO0FBQ0EsWUFBTXRDLFFBQU12QixFQUFFdUIsS0FBRixjQUNMcUMsV0FESztBQUVScEMsZ0NBQWlCaEMsT0FBakIsaUJBRlE7QUFHUnFFLHdCQUhRO0FBSVJFLGdCQUFHO0FBQUEsMENBQUU3RCxPQUFGO0FBQUEsdURBQVd5QixJQUFYO0FBQUEsb0JBQVdBLElBQVgsc0NBQWdCLE1BQWhCO0FBQUEsb0JBQXVCcUMsR0FBdkIsaUJBQXVCQSxHQUF2QjtBQUFBLHVCQUFnQyxFQUFDckMsVUFBRCxFQUFNcUMsUUFBTixFQUFoQztBQUFBLGFBSks7QUFLUmYsa0JBQUs7QUFBQSxvQkFBRVEsSUFBRixTQUFFQSxJQUFGO0FBQUEseUNBQVFRLE1BQVI7QUFBQSxzREFBZ0JiLEtBQWhCO0FBQUEsb0JBQWdCQSxLQUFoQixzQ0FBc0IsRUFBdEI7QUFBQSx3REFBeUJDLE9BQXpCO0FBQUEsb0JBQXlCQSxPQUF6Qix3Q0FBaUMsRUFBakM7QUFBQSxxREFBb0NDLElBQXBDO0FBQUEsb0JBQW9DQSxJQUFwQyxxQ0FBeUMsRUFBekM7QUFBQSxvQ0FBcURHLElBQXJELEVBQThETCxLQUE5RCxFQUF1RUMsT0FBdkUsRUFBa0ZDLElBQWxGO0FBQUE7QUFMRyxXQUFaOztBQVFBLFlBQU1ZLFNBQU90RixlQUFlMkIsVUFBZixDQUEwQjJELE1BQTFCLENBQWlDNUUsU0FBUyxDQUFULENBQWpDLEVBQTZDb0IsY0FBN0MsQ0FBYjtBQUNBLDRCQUFXYSxLQUFYLElBQWtCakMsa0JBQWxCLElBQStCNEUsTUFBL0IsSUFBdUN2QyxNQUFLLE9BQTVDO0FBQ0gsS0E3R2E7QUErR2R1QyxVQS9HYyxrQkErR1B6RCxJQS9HTyxFQStHREMsY0EvR0MsRUErR2M7QUFDeEIsWUFBTWxCLFVBQVEsT0FBZDtBQUNULFlBQU1RLElBQUVVLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLENBQVI7QUFDUyxZQUFNbkIsV0FBU1UsRUFBRVYsUUFBRixDQUFXLE9BQVgsRUFBb0JxQixPQUFwQixFQUFmO0FBQ0EsWUFBTXdELFlBQVVuRSxFQUFFdUIsS0FBRixjQUNULHNCQUFPYixjQUFQLENBRFM7QUFFWjBELDRCQUFlO0FBQUEsdUJBQUdDLFNBQVNDLENBQVQsQ0FBSDtBQUFBLGFBRkg7QUFHWkMsdUJBQVc7QUFBQSx1QkFBR0YsU0FBU0MsQ0FBVCxDQUFIO0FBQUEsYUFIQztBQUlaOUMsOENBSlk7QUFLWnlCLGtCQUFLO0FBQUEsMkNBQUV1QixRQUFGO0FBQUEsb0JBQUVBLFFBQUYsa0NBQVcsRUFBWDtBQUFBLHlDQUFjQyxNQUFkO0FBQUEsb0JBQWNBLE1BQWQsZ0NBQXFCLEVBQXJCO0FBQUEsb0JBQTJCbEIsTUFBM0I7O0FBQUEsb0NBQTBDQSxNQUExQyxFQUFxRGtCLE1BQXJELEVBQWdFRCxRQUFoRTtBQUFBO0FBTE8sV0FBaEI7QUFPVCxlQUFPLEVBQUNMLG9CQUFELEVBQVk3RSxrQkFBWixFQUFzQnFDLE1BQUssUUFBM0IsRUFBUDtBQUNNLEtBM0hhO0FBNkhkK0MsS0E3SGMsYUE2SFpqRSxJQTdIWSxFQTZITkMsY0E3SE0sRUE2SFM7QUFDbkIsWUFBTWxCLFVBQVEsOEJBQWQ7QUFDQSxZQUFNUSxJQUFFVSxlQUFlVixDQUFmLENBQWlCUyxJQUFqQixDQUFSO0FBQ0EsWUFBTW5CLFdBQVNVLEVBQUVWLFFBQUYsQ0FBV0UsT0FBWCxFQUFvQm1CLE9BQXBCLEVBQWY7QUFDQSxZQUFNZ0UsUUFBTTNFLEVBQUVWLFFBQUYsQ0FBVyxTQUFYLEVBQXNCaUMsS0FBdEIsQ0FBNEIsc0JBQU9iLGNBQVAsQ0FBNUIsQ0FBWjtBQUNBLFlBQU1rRSxlQUFhNUUsRUFBRVYsUUFBRixDQUFXLGdCQUFYLEVBQTZCaUMsS0FBN0IsQ0FBbUMsc0JBQU9iLGNBQVAsQ0FBbkMsQ0FBbkI7QUFDQSxlQUFPLEVBQUNpRSxrQkFBT0UsS0FBSSxDQUFYLElBQWlCRixLQUFqQixDQUFELEVBQTBCQywwQkFBMUIsRUFBd0N0RixrQkFBeEMsRUFBa0RxQyxNQUFLLEdBQXZELEVBQVA7QUFDSCxLQXBJYTtBQXNJZG1ELEtBdEljLGFBc0lackUsSUF0SVksRUFzSVBDLGNBdElPLEVBc0lRO0FBQ2xCLFlBQU1sQixVQUFRLGVBQWQ7QUFDQSxZQUFNUSxJQUFFVSxlQUFlVixDQUFmLENBQWlCUyxJQUFqQixDQUFSO0FBQ0EsWUFBTW5CLFdBQVNVLEVBQUVWLFFBQUYsQ0FBV0UsT0FBWCxFQUFvQm1CLE9BQXBCLEVBQWY7QUFDQSxZQUFNZ0UsUUFBTTNFLEVBQUVWLFFBQUYsQ0FBVyxTQUFYLEVBQXNCaUMsS0FBdEIsY0FBZ0Msc0JBQU9iLGNBQVAsQ0FBaEMsRUFBWjtBQUNBLGVBQU8sRUFBQ2lFLFlBQUQsRUFBUXJGLGtCQUFSLEVBQWtCcUMsTUFBSyxHQUF2QixFQUFQO0FBQ0gsS0E1SWE7QUE4SWRvRCxTQTlJYyxpQkE4SVJ0RSxJQTlJUSxFQThJRkMsY0E5SUUsRUE4SWE7QUFDdkIsZUFBTyxFQUFDaUIsTUFBTSxPQUFQLEVBQVA7QUFDSCxLQWhKYTtBQWtKZHFELFVBbEpjLGtCQWtKUHZFLElBbEpPLEVBa0pEQyxjQWxKQyxFQWtKYztBQUN4QixlQUFPLEVBQUNpQixNQUFLLFNBQU4sRUFBUDtBQUNILEtBcEphO0FBc0pkc0QsZ0JBdEpjLHdCQXNKRHhFLElBdEpDLEVBc0pLQyxjQXRKTCxFQXNKb0I7QUFDOUIsWUFBTWxCLFVBQVEsYUFBZDtBQUNBLFlBQU1RLElBQUVVLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLENBQVI7QUFDQSxZQUFNbkIsV0FBU1UsRUFBRVYsUUFBRixDQUFXRSxPQUFYLEVBQW9CbUIsT0FBcEIsRUFBZjtBQUNBLFlBQU1ZLFFBQU12QixFQUFFdUIsS0FBRixjQUNMLHNCQUFPYixjQUFQLENBREs7QUFFUmMsZ0NBQWlCaEMsT0FBakIsaUJBRlE7QUFHUnlELGtCQUFLO0FBQUEsb0JBQUVRLElBQUYsU0FBRUEsSUFBRjtBQUFBLGtEQUFReUIsZ0JBQVI7QUFBQSxtRUFBMEI5QixLQUExQjtBQUFBLG9CQUEwQkEsS0FBMUIsMENBQWdDLEVBQWhDO0FBQUEsbUVBQW1DQyxPQUFuQztBQUFBLG9CQUFtQ0EsT0FBbkMsMENBQTJDLEVBQTNDO0FBQUEsbUVBQThDQyxJQUE5QztBQUFBLG9CQUE4Q0EsSUFBOUMsMENBQW1ELEVBQW5EO0FBQUEsb0JBQTJEQyxNQUEzRDs7QUFBQSxvQ0FBMEVFLElBQTFFLEVBQW1GTCxLQUFuRixFQUE0RkMsT0FBNUYsRUFBdUdDLElBQXZHLEVBQStHQyxNQUEvRztBQUFBO0FBSEcsV0FBWjtBQUtBLDRCQUFXaEMsS0FBWCxJQUFrQmpDLGtCQUFsQixFQUE0QnFDLE1BQUssY0FBakM7QUFDSCxLQWhLYTtBQWtLZHdELE9BbEtjLGVBa0tWMUUsSUFsS1UsRUFrS0pDLGNBbEtJLEVBa0tXO0FBQ3JCLFlBQU1sQixVQUFRLFFBQWQ7QUFDQSxZQUFNUSxJQUFFVSxlQUFlVixDQUFmLENBQWlCUyxJQUFqQixDQUFSO0FBQ0EsWUFBTW5CLFdBQVNVLEVBQUVWLFFBQUYsQ0FBV0UsT0FBWCxFQUFvQm1CLE9BQXBCLEVBQWY7QUFDQSxZQUFNWSxRQUFNdkIsRUFBRXVCLEtBQUYsY0FDTCxzQkFBT2IsY0FBUCxDQURLO0FBRVJjLGdDQUFpQmhDLE9BQWpCLGtCQUZRO0FBR1I0RiwwQkFBYTtBQUFBLG9CQUFFOUYsUUFBRixVQUFFQSxRQUFGO0FBQUEsdUJBQWNBLFNBQVMrRixJQUFULENBQWM7QUFBQSwyQkFBR3ZFLEVBQUV3RSxJQUFMO0FBQUEsaUJBQWQsRUFBeUJBLElBQXZDO0FBQUEsYUFITDtBQUlSQyxxQkFBUTtBQUFBLG9CQUFFakcsUUFBRixVQUFFQSxRQUFGO0FBQUEsdUJBQWNBLFNBQVNrRyxNQUFULENBQWdCO0FBQUEsMkJBQUcxRSxFQUFFRSxJQUFMO0FBQUEsaUJBQWhCLEVBQTJCeUUsTUFBM0IsQ0FBa0MsVUFBQ0MsSUFBRCxVQUFzQjtBQUFBLHdCQUFOQyxDQUFNLFVBQWZ6RixPQUFlLENBQU55RixDQUFNOztBQUMxRUQseUJBQUtFLElBQUwsQ0FBVWxGLGVBQWVOLEdBQWYsQ0FBbUJpQixNQUFuQixDQUEwQnNFLENBQTFCLENBQVY7QUFDQSwyQkFBT0QsSUFBUDtBQUNILGlCQUhxQixFQUdwQixFQUhvQixDQUFkO0FBQUEsYUFKQTtBQVFSekMsa0JBQUs7QUFBQSxvQkFBRTRDLEtBQUYsVUFBRUEsS0FBRjtBQUFBLG9CQUFpQkgsSUFBakIsVUFBU0gsT0FBVDtBQUFBLG9CQUEwQmhDLE1BQTFCOztBQUFBLG9DQUF5Q3NDLEtBQXpDLElBQWdESCxVQUFoRCxJQUF5RG5DLE1BQXpEO0FBQUE7QUFSRyxXQUFaO0FBVUEsNEJBQVdoQyxLQUFYLElBQWtCakMsa0JBQWxCLEVBQTRCcUMsTUFBSyxLQUFqQztBQUNILEtBakxhO0FBbUxkbUUsWUFuTGMsb0JBbUxMckYsSUFuTEssRUFtTENDLGNBbkxELEVBbUxnQjtBQUMxQixZQUFNVixJQUFFVSxlQUFlVixDQUFmLENBQWlCUyxJQUFqQixDQUFSO0FBQ0EsWUFBTWMsUUFBTXZCLEVBQUV1QixLQUFGLENBQVEsc0JBQU9iLGNBQVAsQ0FBUixDQUFaO0FBQ0EsNEJBQVdhLEtBQVgsSUFBa0JJLE1BQUssVUFBdkI7QUFDSCxLQXZMYTtBQXlMZG9FLE1BekxjLGNBeUxYdEYsSUF6TFcsRUF5TExDLGNBekxLLEVBeUxVO0FBQ3BCLFlBQU1WLElBQUVVLGVBQWVWLENBQWYsQ0FBaUJTLElBQWpCLENBQVI7QUFDQSxZQUFNYyxRQUFNdkIsRUFBRXVCLEtBQUYsY0FDTCxzQkFBT2IsY0FBUCxDQURLO0FBRVJjLHNCQUFTLFNBRkQ7QUFHUndFLGVBQUU7QUFBQSx1QkFBR3RGLGVBQWVOLEdBQWYsQ0FBbUJpQixNQUFuQixDQUEwQmlELENBQTFCLENBQUg7QUFBQSxhQUhNO0FBSVJULG1CQUFNLEVBQUNtQyxHQUFFLFFBQUg7QUFKRSxXQUFaO0FBTUEsNEJBQVd6RSxLQUFYLElBQWtCakMsVUFBU21CLEtBQUtuQixRQUFoQyxFQUEwQ3FDLE1BQUssSUFBL0M7QUFDSCxLQWxNYTtBQW9NZHNFLE1BcE1jLGNBb01YeEYsSUFwTVcsRUFvTUxDLGNBcE1LLEVBb01VO0FBQ3BCLFlBQU1sQixVQUFRLFlBQWQ7QUFDQSxZQUFNUSxJQUFFVSxlQUFlVixDQUFmLENBQWlCUyxJQUFqQixDQUFSO0FBQ0EsWUFBTW5CLFdBQVNVLEVBQUVWLFFBQUYsQ0FBV0UsT0FBWCxFQUFvQm1CLE9BQXBCLEVBQWY7QUFDQSxZQUFNWSxRQUFNdkIsRUFBRXVCLEtBQUYsQ0FBUTtBQUNoQkMsZ0NBQWlCaEMsT0FBakI7QUFEZ0IsU0FBUixDQUFaO0FBR0EsNEJBQVcrQixLQUFYLElBQWtCSSxNQUFLLElBQXZCLEVBQTZCckMsa0JBQTdCO0FBQ0g7QUE1TWEsQztrQkFuQ0RWLGMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuaW1wb3J0IGRyYXdtbCBmcm9tIFwiLi4vZHJhd21sXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFwidGFibGVTdHlsZXMsdmlld1Byb3BzLHByZXNQcm9wc1wiLnNwbGl0KFwiLFwiKSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgaWYodGhpcy50YWJsZVN0eWxlcyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy50YWJsZVN0eWxlcy5yb290KCkuY2hpbGRyZW4oKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgc2xpZGUoe2lkLFwicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWwocmlkKVxuICAgIH1cblxuICAgIG1hc3Rlcih7aWQsXCJyOmlkXCI6cmlkfSl7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBub3Rlc01hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgaGFuZG91dE1hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgbWFzdGVyUGFydE9mTGF5b3V0KHdYbWxMYXlvdXRJZEluTWFzdGVyKXtcbiAgICAgICAgY29uc3QgbWFzdGVyUm9vdD10aGlzLiQod1htbExheW91dElkSW5NYXN0ZXIpLnJvb3QoKS5nZXQoMClcbiAgICAgICAgY29uc3Qge3BhcnQ6bWFzdGVyUGFydE5hbWV9PW1hc3RlclJvb3QuYXR0cmlic1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuZ2V0UmVsT2JqZWN0KG1hc3RlclBhcnROYW1lKVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgcHJlc2VudGF0aW9uKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpXG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6aGFuZG91dE1hc3RlcklkTHN0LHBcXFxcOm5vdGVzTWFzdGVySWRMc3QscFxcXFw6c2xkSWRMc3QscFxcXFw6c2xkTWFzdGVySWRMc3RcIlxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOnNsZE1hc3RlcklkTHN0XCI6MSwgXCJwOnNsZElkTHN0XCI6Mn1cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICBjb25zdCBzej0oe2F0dHJpYnM6e2N4LGN5fX0pPT4oe3dpZHRoOm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgoY3gpLGhlaWdodDpvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KGN5KX0pXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgc2xkU3o6c3osIFxuICAgICAgICAgICAgICAgIG5vdGVzU3o6c3osXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCB0eXBlOlwiZG9jdW1lbnRcIixjaGlsZHJlbn1cblx0XHR9LFxuXG4gICAgICAgIHNsZE1hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpzbGRMYXlvdXRJZExzdCxwXFxcXDpjU2xkXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQubWFzdGVyKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIGNvbnN0ICRtYXN0ZXI9JChcInBcXFxcOnNsZE1hc3RlclwiKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JG1hc3Rlci5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSRtYXN0ZXIuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBvcmRlcnM9e1wicDpzbGRMYXlvdXRMc3RcIjoxLCBcInA6Y1NsZFwiOjJ9XG4gICAgICAgICAgICBjaGlsZHJlbi5zb3J0KChhLGIpPT4ob3JkZXJzW2EubmFtZV18fDk5KS0ob3JkZXJzW2IubmFtZV18fDk5KSlcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgcGFydDogJC5wYXJ0LCBjaGlsZHJlbix0eXBlOlwic2xpZGVNYXN0ZXJcIn1cbiAgICAgICAgfSxcblxuICAgICAgICBzbGRJZCh3WG1sLG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpjU2xkXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuc2xpZGUod1htbC5hdHRyaWJzKVxuICAgICAgICAgICAgY29uc3QgJHNsaWRlPSQoJ3BcXFxcOnNsZCcpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kc2xpZGUucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kc2xpZGUuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG5cbiAgICAgICAgICAgIGNvbnN0IHNsaWRlUGFydD1vZmZpY2VEb2N1bWVudC5nZXRSZWxQYXJ0KHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0Lm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0LmdldFJlbFRhcmdldChcInNsaWRlTGF5b3V0XCIpKSlcbiAgICAgICAgICAgIGNvbnN0IGxheW91dFBhcnQ9bmV3IFBhcnQobGF5b3V0VGFyZ2V0LG9mZmljZURvY3VtZW50LmRvYylcbiAgICAgICAgICAgIGNvbnN0IG1hc3RlclRhcmdldD1vZmZpY2VEb2N1bWVudC5kb2Mubm9ybWFsaXplUGF0aChsYXlvdXRQYXJ0Lm5vcm1hbGl6ZVBhdGgobGF5b3V0UGFydC5nZXRSZWxUYXJnZXQoXCJzbGlkZU1hc3RlclwiKSkpXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHBhcnQ6JC5wYXJ0LCBsYXlvdXQ6bGF5b3V0VGFyZ2V0LCBtYXN0ZXI6bWFzdGVyVGFyZ2V0LCBjaGlsZHJlbiwgdHlwZTpcInNsaWRlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbm90ZXNNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50Lm5vdGVzTWFzdGVyKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIHJldHVybiB7cGFydDokLnBhcnQsdHlwZTpcIm5vdGVNYXN0ZXJcIix9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZG91dE1hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuaGFuZG91dE1hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICByZXR1cm4ge3BhcnQ6JC5wYXJ0LHR5cGU6XCJoYW5kb3V0TWFzdGVyXCIsIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzbGRMYXlvdXRJZCh3WG1sLG9mZmljZURvY3VtZW50KXsvL2luIG1hc3RlclxuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOmNTbGRcIlxuICAgICAgICAgICAgY29uc3QgbWFzdGVyPW9mZmljZURvY3VtZW50LiQod1htbCkucGFydCgpXG4gICAgICAgICAgICBjb25zdCAkPW5ldyBQYXJ0KG1hc3RlcixvZmZpY2VEb2N1bWVudC5kb2MpLmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxuICAgICAgICAgICAgY29uc3QgJGxheW91dD0kKFwicFxcXFw6c2xkTGF5b3V0XCIpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kbGF5b3V0LnByb3BzKHtfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgfSlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSRsYXlvdXQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG5cbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMscGFydDokLnBhcnQsIG1hc3RlciwgY2hpbGRyZW4sIHR5cGU6XCJzbGlkZUxheW91dFwiLCB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BUcmVlKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QocFxcXFw6bnZHcnBTcFByLHBcXFxcOmdycFNwUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPW9mZmljZURvY3VtZW50LiQod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YHBcXFxcOm52R3JwU3BQcixwXFxcXDpncnBTcFByYCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7Z3JwU3BQciwgbnZHcnBTcFByOntjTnZQcj17fSxjTnZTcFByPXt9LG52UHI9e319LCAuLi5vdGhlcnN9KT0+KHsuLi5ncnBTcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHIsLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsdHlwZTpcInNwVHJlZVwiLCBjaGlsZHJlbn1cbiAgICAgICAgfSxcblxuICAgICAgICBwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgcHJvcHM9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZQaWNQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyx0eXBlOlwicGljdHVyZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDp0eEJvZHlcIlxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgY29tbW9uUHJvcHM9ZHJhd21sKG9mZmljZURvY3VtZW50KVxuICAgICAgICAgICAgY29uc3QgbmFtZXM9e3NwTG9ja3M6XCJsb2Nrc1wiLCBwaDpcInBsYWNlaG9sZGVyXCIsIC4uLmNvbW1vblByb3BzLm5hbWVzfVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uUHJvcHMsXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICBuYW1lcyxcbiAgICAgICAgICAgICAgICBwaDooe2F0dHJpYnM6e3R5cGU9XCJib2R5XCIsaWR4fX0pPT4oe3R5cGUsaWR4fSksXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52U3BQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fX0pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQcn0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCB0eEJvZHk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpdGllcy50eEJvZHkoY2hpbGRyZW5bMF0sb2ZmaWNlRG9jdW1lbnQpXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgLi4udHhCb2R5LCB0eXBlOlwic2hhcGVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0eEJvZHkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOnBcIlxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKFwiYVxcXFw6cFwiKS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHRleHRTdHlsZT0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGxuU3BjUmVkdWN0aW9uOnY9PnBhcnNlSW50KHYpLFxuICAgICAgICAgICAgICAgIGZvbnRTY2FsZTogdj0+cGFyc2VJbnQodiksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoYVxcXFw6cCxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7bHN0U3R5bGU9e30sYm9keVByPXt9LC4uLm90aGVyc30pPT4oey4uLm90aGVycywgLi4uYm9keVByLCAuLi5sc3RTdHlsZX0pXG4gICAgICAgICAgICB9KVxuXHRcdFx0cmV0dXJuIHt0ZXh0U3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwidHhCb2R5XCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiOm5vdChhXFxcXDpwUHIsYVxcXFw6ZW5kUGFyYVJQcilcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qgc3R5bGU9JC5jaGlsZHJlbihcImFcXFxcOnBQclwiKS5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDplbmRQYXJhUlByXCIpLnByb3BzKGRyYXdtbChvZmZpY2VEb2N1bWVudCkpXG4gICAgICAgICAgICByZXR1cm4ge3N0eWxlOntsdmw6MCwgLi4uc3R5bGV9LCBkZWZhdWx0U3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwicFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHIod1htbCxvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiOm5vdChhXFxcXDpyUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDpyUHJcIikucHJvcHMoey4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCl9KVxuICAgICAgICAgICAgcmV0dXJuIHtzdHlsZSwgY2hpbGRyZW4sIHR5cGU6XCJyXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hhcnQod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOiBcImNoYXJ0XCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVsSWRzKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcImRpYWdyYW1cIn1cbiAgICAgICAgfSxcblxuICAgICAgICBncmFwaGljRnJhbWUod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOmdyYXBoaWNcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIHRpZHk6KHtzcFByLCBudkdyYXBoaWNGcmFtZVByOntjTnZQcj17fSxjTnZTcFByPXt9LG52UHI9e319LCAuLi5vdGhlcnN9KT0+KHsuLi5zcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHIsLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgdHlwZTpcImdyYXBoaWNGcmFtZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRibCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiYVxcXFw6dHJcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LCBhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0YWJsZVN0eWxlSWQ6KHtjaGlsZHJlbn0pPT5jaGlsZHJlbi5maW5kKGE9PmEuZGF0YSkuZGF0YSxcbiAgICAgICAgICAgICAgICB0YmxHcmlkOih7Y2hpbGRyZW59KT0+Y2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkucmVkdWNlKChjb2xzLHthdHRyaWJzOnt3fX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbHMucHVzaChvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KHcpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sc1xuICAgICAgICAgICAgICAgIH0sW10pLFxuICAgICAgICAgICAgICAgIHRpZHk6KHt0YmxQciwgdGJsR3JpZDpjb2xzLCAuLi5vdGhlcnN9KT0+KHsuLi50YmxQciwgY29scywgLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgdHlwZTpcInRibFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRibFN0eWxlKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInRibFN0eWxlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHIod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOlwiOm5vdCgqKVwiLFxuICAgICAgICAgICAgICAgIGg6dj0+b2ZmaWNlRG9jdW1lbnQuZG9jLmVtdTJQeCh2KSxcbiAgICAgICAgICAgICAgICBuYW1lczp7aDpcImhlaWdodFwifVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuOndYbWwuY2hpbGRyZW4sIHR5cGU6XCJ0clwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRjKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDp0eEJvZHlcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIHR5cGU6XCJ0Y1wiLCBjaGlsZHJlbn1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=