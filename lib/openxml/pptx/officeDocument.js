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
            filter: ":not(" + content + ",a\\:extLst)",
            sldSz: sz, notesSz: sz
        }));

        return _extends({}, props, { type: "document", children: children });
    },
    sldMasterId: function sldMasterId(wXml, officeDocument) {
        var content = "p\\:sldLayoutIdLst,p\\:cSld";
        var $ = officeDocument.master(wXml.attribs);
        var $master = $("p\\:sldMaster");
        var props = $master.props(_extends({}, (0, _drawml2.default)(officeDocument), {
            filter: ":not(" + content + ",a\\:extLst)"
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
            filter: ":not(" + content + ",a\\:extLst)"
        }));
        var children = $slide.children(content).toArray();

        var slidePart = officeDocument.getRelPart(wXml.attribs["r:id"]);
        var layoutTarget = officeDocument.doc.normalizePath(slidePart.folder + slidePart.getRelTarget("slideLayout"));
        var layoutPart = new _part2.default(layoutTarget, officeDocument.doc);
        var masterTarget = officeDocument.doc.normalizePath(layoutPart.folder + layoutPart.getRelTarget("slideMaster"));
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
        var props = $layout.props({ filter: ":not(" + content + ",a\\:extLst)" });
        var children = $layout.children(content).toArray();

        return _extends({}, props, { part: $.part, master: master, children: children, type: "slideLayout" });
    },
    spTree: function spTree(wXml, officeDocument) {
        var content = ":not(p\\:nvGrpSpPr,p\\:grpSpPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = officeDocument.$(wXml).props(_extends({}, (0, _drawml2.default)(officeDocument), {
            filter: "p\\:nvGrpSpPr,p\\:grpSpPr",
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
            filter: ":not(" + content + ",a\\:extLst)",
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
            filter: ":not(a\\:p,a\\:extLst)",
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
            filter: ":not(" + content + ",a\\:extLst)",
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
            filter: ":not(" + content + ", a\\:extLst)",
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
            filter: ":not(*)",
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
            filter: ":not(" + content + ",a\\:extLst)"
        });
        return _extends({}, props, { type: "tc", children: children });
    }
};
exports.default = OfficeDocument;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ0YWJsZVN0eWxlcyIsInJlbmRlck5vZGUiLCJyb290IiwiY2hpbGRyZW4iLCJnZXQiLCJjb250ZW50IiwiaWQiLCJyaWQiLCJnZXRSZWwiLCJzbGlkZSIsImFyZ3VtZW50cyIsIndYbWxMYXlvdXRJZEluTWFzdGVyIiwibWFzdGVyUm9vdCIsIiQiLCJtYXN0ZXJQYXJ0TmFtZSIsImF0dHJpYnMiLCJwYXJ0IiwiZG9jIiwiZ2V0UmVsT2JqZWN0IiwiaWRlbnRpdGllcyIsInByZXNlbnRhdGlvbiIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRvQXJyYXkiLCJvcmRlcnMiLCJzb3J0IiwiYSIsImIiLCJuYW1lIiwic3oiLCJjeCIsImN5Iiwid2lkdGgiLCJlbXUyUHgiLCJoZWlnaHQiLCJwcm9wcyIsImZpbHRlciIsInNsZFN6Iiwibm90ZXNTeiIsInR5cGUiLCJzbGRNYXN0ZXJJZCIsIm1hc3RlciIsIiRtYXN0ZXIiLCJzbGRJZCIsIiRzbGlkZSIsInNsaWRlUGFydCIsImdldFJlbFBhcnQiLCJsYXlvdXRUYXJnZXQiLCJub3JtYWxpemVQYXRoIiwiZm9sZGVyIiwiZ2V0UmVsVGFyZ2V0IiwibGF5b3V0UGFydCIsIm1hc3RlclRhcmdldCIsImxheW91dCIsIm5vdGVzTWFzdGVySWQiLCJub3Rlc01hc3RlciIsImhhbmRvdXRNYXN0ZXJJZCIsImhhbmRvdXRNYXN0ZXIiLCJzbGRMYXlvdXRJZCIsIiRsYXlvdXQiLCJzcFRyZWUiLCJ0aWR5IiwiZ3JwU3BQciIsIm52R3JwU3BQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJvdGhlcnMiLCJwaWMiLCJzcFByIiwibnZQaWNQciIsInNwIiwiY29tbW9uUHJvcHMiLCJuYW1lcyIsInNwTG9ja3MiLCJwaCIsImlkeCIsIm52U3BQciIsInR4Qm9keSIsInRleHRTdHlsZSIsImxzdFN0eWxlIiwiYm9keVByIiwicCIsInN0eWxlIiwiZGVmYXVsdFN0eWxlIiwibHZsIiwiciIsImNoYXJ0IiwicmVsSWRzIiwiZ3JhcGhpY0ZyYW1lIiwibnZHcmFwaGljRnJhbWVQciIsInRibCIsInRhYmxlU3R5bGVJZCIsImZpbmQiLCJkYXRhIiwidGJsR3JpZCIsInJlZHVjZSIsImNvbHMiLCJ3IiwicHVzaCIsInRibFByIiwidGJsU3R5bGUiLCJ0ciIsImgiLCJ2IiwidGMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7O2dDQUNWO0FBQ0g7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQixrQ0FBa0NDLEtBQWxDLENBQXdDLEdBQXhDLENBQWhCO0FBQ0g7OzsrQkFFTUMsYSxFQUF5RTtBQUFBLGdCQUExREMsUUFBMEQsdUVBQWpELEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxDQUFpRDs7QUFDNUUsZ0JBQUcsS0FBS0UsV0FBUixFQUFvQjtBQUNoQixxQkFBS0MsVUFBTCxDQUFnQixLQUFLRCxXQUFMLENBQWlCRSxJQUFqQixHQUF3QkMsUUFBeEIsR0FBbUNDLEdBQW5DLENBQXVDLENBQXZDLENBQWhCLEVBQTJEUixhQUEzRCxFQUEwRUMsUUFBMUU7QUFDSDtBQUNELG1CQUFPLEtBQUtJLFVBQUwsQ0FBZ0IsS0FBS0ksT0FBTCxDQUFhLGtCQUFiLEVBQWlDRCxHQUFqQyxDQUFxQyxDQUFyQyxDQUFoQixFQUF5RFIsYUFBekQsRUFBd0VDLFFBQXhFLENBQVA7QUFDSDs7O29DQUVxQjtBQUFBLGdCQUFmUyxFQUFlLFFBQWZBLEVBQWU7QUFBQSxnQkFBTEMsR0FBSyxRQUFaLE1BQVk7O0FBQ2xCLG1CQUFPLEtBQUtDLE1BQUwsQ0FBWUQs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bkIsQ0FBMEJ1RSxDQUExQixDQUFIO0FBQUEsYUFITTtBQUlSL0IsbUJBQU0sRUFBQzhCLEdBQUUsUUFBSDtBQUpFLFdBQVo7QUFNQSw0QkFBV3BFLEtBQVgsSUFBa0JoQyxVQUFTa0IsS0FBS2xCLFFBQWhDLEVBQTBDb0MsTUFBSyxJQUEvQztBQUNILEtBL0xhO0FBaU1ka0UsTUFqTWMsY0FpTVhwRixJQWpNVyxFQWlNTEMsY0FqTUssRUFpTVU7QUFDcEIsWUFBTWpCLFVBQVEsWUFBZDtBQUNBLFlBQU1RLElBQUVTLGVBQWVULENBQWYsQ0FBaUJRLElBQWpCLENBQVI7QUFDQSxZQUFNbEIsV0FBU1UsRUFBRVYsUUFBRixDQUFXRSxPQUFYLEVBQW9Ca0IsT0FBcEIsRUFBZjtBQUNBLFlBQU1ZLFFBQU10QixFQUFFc0IsS0FBRixDQUFRO0FBQ2hCQyw4QkFBZS9CLE9BQWY7QUFEZ0IsU0FBUixDQUFaO0FBR0EsNEJBQVc4QixLQUFYLElBQWtCSSxNQUFLLElBQXZCLEVBQTZCcEMsa0JBQTdCO0FBQ0g7QUF6TWEsQztrQkFuQ0RWLGMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuaW1wb3J0IGRyYXdtbCBmcm9tIFwiLi4vZHJhd21sXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFwidGFibGVTdHlsZXMsdmlld1Byb3BzLHByZXNQcm9wc1wiLnNwbGl0KFwiLFwiKSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgaWYodGhpcy50YWJsZVN0eWxlcyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy50YWJsZVN0eWxlcy5yb290KCkuY2hpbGRyZW4oKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgc2xpZGUoe2lkLFwicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWwocmlkKVxuICAgIH1cblxuICAgIG1hc3Rlcih7aWQsXCJyOmlkXCI6cmlkfSl7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBub3Rlc01hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgaGFuZG91dE1hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgbWFzdGVyUGFydE9mTGF5b3V0KHdYbWxMYXlvdXRJZEluTWFzdGVyKXtcbiAgICAgICAgY29uc3QgbWFzdGVyUm9vdD10aGlzLiQod1htbExheW91dElkSW5NYXN0ZXIpLnJvb3QoKS5nZXQoMClcbiAgICAgICAgY29uc3Qge3BhcnQ6bWFzdGVyUGFydE5hbWV9PW1hc3RlclJvb3QuYXR0cmlic1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuZ2V0UmVsT2JqZWN0KG1hc3RlclBhcnROYW1lKVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgcHJlc2VudGF0aW9uKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpXG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6aGFuZG91dE1hc3RlcklkTHN0LHBcXFxcOm5vdGVzTWFzdGVySWRMc3QscFxcXFw6c2xkSWRMc3QscFxcXFw6c2xkTWFzdGVySWRMc3RcIlxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOnNsZE1hc3RlcklkTHN0XCI6MSwgXCJwOnNsZElkTHN0XCI6Mn1cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICBjb25zdCBzej0oe2F0dHJpYnM6e2N4LGN5fX0pPT4oe3dpZHRoOm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgoY3gpLGhlaWdodDpvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KGN5KX0pXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIHNsZFN6OnN6LCBub3Rlc1N6OnN6LFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcImRvY3VtZW50XCIsY2hpbGRyZW59XG5cdFx0fSxcblxuICAgICAgICBzbGRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6c2xkTGF5b3V0SWRMc3QscFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50Lm1hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBjb25zdCAkbWFzdGVyPSQoXCJwXFxcXDpzbGRNYXN0ZXJcIilcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRtYXN0ZXIucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JG1hc3Rlci5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOnNsZExheW91dExzdFwiOjEsIFwicDpjU2xkXCI6Mn1cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBwYXJ0OiAkLnBhcnQsIGNoaWxkcmVuLHR5cGU6XCJzbGlkZU1hc3RlclwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHNsZElkKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOmNTbGRcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5zbGlkZSh3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBjb25zdCAkc2xpZGU9JCgncFxcXFw6c2xkJylcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRzbGlkZS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kc2xpZGUuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG5cbiAgICAgICAgICAgIGNvbnN0IHNsaWRlUGFydD1vZmZpY2VEb2N1bWVudC5nZXRSZWxQYXJ0KHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0LmZvbGRlcitzbGlkZVBhcnQuZ2V0UmVsVGFyZ2V0KFwic2xpZGVMYXlvdXRcIikpXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRQYXJ0PW5ldyBQYXJ0KGxheW91dFRhcmdldCxvZmZpY2VEb2N1bWVudC5kb2MpXG4gICAgICAgICAgICBjb25zdCBtYXN0ZXJUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgobGF5b3V0UGFydC5mb2xkZXIrbGF5b3V0UGFydC5nZXRSZWxUYXJnZXQoXCJzbGlkZU1hc3RlclwiKSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMscGFydDokLnBhcnQsIGxheW91dDpsYXlvdXRUYXJnZXQsIG1hc3RlcjptYXN0ZXJUYXJnZXQsIGNoaWxkcmVuLCB0eXBlOlwic2xpZGVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICBub3Rlc01hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQubm90ZXNNYXN0ZXIod1htbC5hdHRyaWJzKVxuICAgICAgICAgICAgcmV0dXJuIHtwYXJ0OiQucGFydCx0eXBlOlwibm90ZU1hc3RlclwiLH1cbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kb3V0TWFzdGVySWQod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5oYW5kb3V0TWFzdGVyKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIHJldHVybiB7cGFydDokLnBhcnQsdHlwZTpcImhhbmRvdXRNYXN0ZXJcIiwgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNsZExheW91dElkKHdYbWwsb2ZmaWNlRG9jdW1lbnQpey8vaW4gbWFzdGVyXG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCBtYXN0ZXI9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKS5wYXJ0KClcbiAgICAgICAgICAgIGNvbnN0ICQ9bmV3IFBhcnQobWFzdGVyLG9mZmljZURvY3VtZW50LmRvYykuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG4gICAgICAgICAgICBjb25zdCAkbGF5b3V0PSQoXCJwXFxcXDpzbGRMYXlvdXRcIilcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRsYXlvdXQucHJvcHMoe2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgfSlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSRsYXlvdXQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG5cbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMscGFydDokLnBhcnQsIG1hc3RlciwgY2hpbGRyZW4sIHR5cGU6XCJzbGlkZUxheW91dFwiLCB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3BUcmVlKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QocFxcXFw6bnZHcnBTcFByLHBcXFxcOmdycFNwUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPW9mZmljZURvY3VtZW50LiQod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmBwXFxcXDpudkdycFNwUHIscFxcXFw6Z3JwU3BQcmAsXG4gICAgICAgICAgICAgICAgdGlkeTooe2dycFNwUHIsIG52R3JwU3BQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uZ3JwU3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHR5cGU6XCJzcFRyZWVcIiwgY2hpbGRyZW59XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPW9mZmljZURvY3VtZW50LiQod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52UGljUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIC4uLm90aGVyc30pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsdHlwZTpcInBpY3R1cmVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICBzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6dHhCb2R5XCJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IGNvbW1vblByb3BzPWRyYXdtbChvZmZpY2VEb2N1bWVudClcbiAgICAgICAgICAgIGNvbnN0IG5hbWVzPXtzcExvY2tzOlwibG9ja3NcIiwgcGg6XCJwbGFjZWhvbGRlclwiLCAuLi5jb21tb25Qcm9wcy5uYW1lc31cbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbW1vblByb3BzLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIG5hbWVzLFxuICAgICAgICAgICAgICAgIHBoOih7YXR0cmliczp7dHlwZT1cImJvZHlcIixpZHh9fSk9Pih7dHlwZSxpZHh9KSxcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZTcFByOntjTnZQcj17fSxjTnZTcFByPXt9LG52UHI9e319fSk9Pih7Li4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbnN0IHR4Qm9keT1PZmZpY2VEb2N1bWVudC5pZGVudGl0aWVzLnR4Qm9keShjaGlsZHJlblswXSxvZmZpY2VEb2N1bWVudClcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuLCAuLi50eEJvZHksIHR5cGU6XCJzaGFwZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHR4Qm9keSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiYVxcXFw6cFwiXG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oXCJhXFxcXDpwXCIpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgdGV4dFN0eWxlPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KGFcXFxcOnAsYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGlkeTooe2xzdFN0eWxlPXt9LGJvZHlQcj17fSwuLi5vdGhlcnN9KT0+KHsuLi5vdGhlcnMsIC4uLmJvZHlQciwgLi4ubHN0U3R5bGV9KVxuICAgICAgICAgICAgfSlcblx0XHRcdHJldHVybiB7dGV4dFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInR4Qm9keVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHAod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6cFByLGFcXFxcOmVuZFBhcmFSUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDpwUHJcIikucHJvcHMoZHJhd21sKG9mZmljZURvY3VtZW50KSlcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6ZW5kUGFyYVJQclwiKS5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHtzdHlsZTp7bHZsOjAsIC4uLnN0eWxlfSwgZGVmYXVsdFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInBcIn1cbiAgICAgICAgfSxcblxuICAgICAgICByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6clByKVwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBzdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6clByXCIpLnByb3BzKHsuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpfSlcbiAgICAgICAgICAgIHJldHVybiB7c3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwiclwifVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoYXJ0KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTogXCJjaGFydFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbElkcyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJkaWFncmFtXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JhcGhpY0ZyYW1lKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDpncmFwaGljXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52R3JhcGhpY0ZyYW1lUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIC4uLm90aGVyc30pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuLCB0eXBlOlwiZ3JhcGhpY0ZyYW1lXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGJsKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDp0clwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LCBhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0YWJsZVN0eWxlSWQ6KHtjaGlsZHJlbn0pPT5jaGlsZHJlbi5maW5kKGE9PmEuZGF0YSkuZGF0YSxcbiAgICAgICAgICAgICAgICB0YmxHcmlkOih7Y2hpbGRyZW59KT0+Y2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkucmVkdWNlKChjb2xzLHthdHRyaWJzOnt3fX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbHMucHVzaChvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KHcpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sc1xuICAgICAgICAgICAgICAgIH0sW10pLFxuICAgICAgICAgICAgICAgIHRpZHk6KHt0YmxQciwgdGJsR3JpZDpjb2xzLCAuLi5vdGhlcnN9KT0+KHsuLi50YmxQciwgY29scywgLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgdHlwZTpcInRibFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRibFN0eWxlKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInRibFN0eWxlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHIod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpcIjpub3QoKilcIixcbiAgICAgICAgICAgICAgICBoOnY9Pm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodiksXG4gICAgICAgICAgICAgICAgbmFtZXM6e2g6XCJoZWlnaHRcIn1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLCB0eXBlOlwidHJcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0Yyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiYVxcXFw6dHhCb2R5XCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInRjXCIsIGNoaWxkcmVufVxuICAgICAgICB9XG4gICAgfVxufVxuIl19