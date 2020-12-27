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
            lnSpcReduction: function lnSpcReduction(v) {
                return parseInt(v);
            },
            fontScale: function fontScale(v) {
                return parseInt(v);
            },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ0YWJsZVN0eWxlcyIsInJlbmRlck5vZGUiLCJyb290IiwiY2hpbGRyZW4iLCJnZXQiLCJjb250ZW50IiwiaWQiLCJyaWQiLCJnZXRSZWwiLCJzbGlkZSIsImFyZ3VtZW50cyIsIndYbWxMYXlvdXRJZEluTWFzdGVyIiwibWFzdGVyUm9vdCIsIiQiLCJtYXN0ZXJQYXJ0TmFtZSIsImF0dHJpYnMiLCJwYXJ0IiwiZG9jIiwiZ2V0UmVsT2JqZWN0IiwiaWRlbnRpdGllcyIsInByZXNlbnRhdGlvbiIsIndYbWwiLCJvZmZpY2VEb2N1bWVudCIsInRvQXJyYXkiLCJvcmRlcnMiLCJzb3J0IiwiYSIsImIiLCJuYW1lIiwic3oiLCJjeCIsImN5Iiwid2lkdGgiLCJlbXUyUHgiLCJoZWlnaHQiLCJwcm9wcyIsImZpbHRlciIsInNsZFN6Iiwibm90ZXNTeiIsInR5cGUiLCJzbGRNYXN0ZXJJZCIsIm1hc3RlciIsIiRtYXN0ZXIiLCJzbGRJZCIsIiRzbGlkZSIsInNsaWRlUGFydCIsImdldFJlbFBhcnQiLCJsYXlvdXRUYXJnZXQiLCJub3JtYWxpemVQYXRoIiwiZ2V0UmVsVGFyZ2V0IiwibGF5b3V0UGFydCIsIm1hc3RlclRhcmdldCIsImxheW91dCIsIm5vdGVzTWFzdGVySWQiLCJub3Rlc01hc3RlciIsImhhbmRvdXRNYXN0ZXJJZCIsImhhbmRvdXRNYXN0ZXIiLCJzbGRMYXlvdXRJZCIsIiRsYXlvdXQiLCJzcFRyZWUiLCJ0aWR5IiwiZ3JwU3BQciIsIm52R3JwU3BQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJvdGhlcnMiLCJwaWMiLCJzcFByIiwibnZQaWNQciIsInNwIiwiY29tbW9uUHJvcHMiLCJuYW1lcyIsInNwTG9ja3MiLCJwaCIsImlkeCIsIm52U3BQciIsInR4Qm9keSIsInRleHRTdHlsZSIsImxuU3BjUmVkdWN0aW9uIiwicGFyc2VJbnQiLCJ2IiwiZm9udFNjYWxlIiwibHN0U3R5bGUiLCJib2R5UHIiLCJwIiwic3R5bGUiLCJkZWZhdWx0U3R5bGUiLCJsdmwiLCJyIiwiY2hhcnQiLCJyZWxJZHMiLCJncmFwaGljRnJhbWUiLCJudkdyYXBoaWNGcmFtZVByIiwidGJsIiwidGFibGVTdHlsZUlkIiwiZmluZCIsImRhdGEiLCJ0YmxHcmlkIiwicmVkdWNlIiwiY29scyIsInciLCJwdXNoIiwidGJsUHIiLCJ0YmxTdHlsZSIsInRyIiwiaCIsInRjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0lBRXFCQSxjOzs7Ozs7Ozs7OztnQ0FDVjtBQUNIO0FBQ0EsaUJBQUtDLFVBQUwsQ0FBZ0Isa0NBQWtDQyxLQUFsQyxDQUF3QyxHQUF4QyxDQUFoQjtBQUNIOzs7K0JBRU1DLGEsRUFBeUU7QUFBQSxnQkFBMURDLFFBQTBELHVFQUFqRCxLQUFLQyxXQUFMLENBQWlCRCxRQUFqQixDQUEwQkUsSUFBMUIsQ0FBK0IsS0FBS0QsV0FBcEMsQ0FBaUQ7O0FBQzVFLGdCQUFHLEtBQUtFLFdBQVIsRUFBb0I7QUFDaEIscUJBQUtDLFVBQUwsQ0FBZ0IsS0FBS0QsV0FBTCxDQUFpQkUsSUFBakIsR0FBd0JDLFFBQXhCLEdBQW1DQyxHQUFuQyxDQUF1QyxDQUF2QyxDQUFoQixFQUEyRFIsYUFBM0QsRUFBMEVDLFFBQTFFO0FBQ0g7QUFDRCxtQkFBTyxLQUFLSSxVQUFMLENBQWdCLEtBQUtJLE9BQUwsQ0FBYSxrQkFBYixFQUFpQ0QsR0FBakMsQ0FBcUMsQ0FBckMsQ0FBaEIsRUFBeURSLGFBQXpELEVBQXdFQyxRQUF4RSxDQUFQO0FBQ0g7OztvQ0FFcUI7QUFBQSxnQkFBZlMsRUFBZSxRQUFmQSxFQUFlO0FBQUEsZ0JBQUxDLEdBQUssUUFBWixNQUFZ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RVMsZUFBZVQsQ0FBZixDQUFpQlEsSUFBakIsQ0FBUjtBQUNBLFlBQU1jLFFBQU10QixFQUFFc0IsS0FBRixjQUNMLHNCQUFPYixjQUFQLENBREs7QUFFUmMsb0JBQU8sU0FGQztBQUdSc0UsZUFBRTtBQUFBLHVCQUFHcEYsZUFBZUwsR0FBZixDQUFtQmdCLE1BQW5CLENBQTBCZ0QsQ0FBMUIsQ0FBSDtBQUFBLGFBSE07QUFJUlQsbUJBQU0sRUFBQ2tDLEdBQUUsUUFBSDtBQUpFLFdBQVo7QUFNQSw0QkFBV3ZFLEtBQVgsSUFBa0JoQyxVQUFTa0IsS0FBS2xCLFFBQWhDLEVBQTBDb0MsTUFBSyxJQUEvQztBQUNILEtBbE1hO0FBb01kb0UsTUFwTWMsY0FvTVh0RixJQXBNVyxFQW9NTEMsY0FwTUssRUFvTVU7QUFDcEIsWUFBTWpCLFVBQVEsWUFBZDtBQUNBLFlBQU1RLElBQUVTLGVBQWVULENBQWYsQ0FBaUJRLElBQWpCLENBQVI7QUFDQSxZQUFNbEIsV0FBU1UsRUFBRVYsUUFBRixDQUFXRSxPQUFYLEVBQW9Ca0IsT0FBcEIsRUFBZjtBQUNBLFlBQU1ZLFFBQU10QixFQUFFc0IsS0FBRixDQUFRO0FBQ2hCQyw4QkFBZS9CLE9BQWY7QUFEZ0IsU0FBUixDQUFaO0FBR0EsNEJBQVc4QixLQUFYLElBQWtCSSxNQUFLLElBQXZCLEVBQTZCcEMsa0JBQTdCO0FBQ0g7QUE1TWEsQztrQkFuQ0RWLGMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuaW1wb3J0IGRyYXdtbCBmcm9tIFwiLi4vZHJhd21sXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFwidGFibGVTdHlsZXMsdmlld1Byb3BzLHByZXNQcm9wc1wiLnNwbGl0KFwiLFwiKSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgaWYodGhpcy50YWJsZVN0eWxlcyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy50YWJsZVN0eWxlcy5yb290KCkuY2hpbGRyZW4oKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgc2xpZGUoe2lkLFwicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWwocmlkKVxuICAgIH1cblxuICAgIG1hc3Rlcih7aWQsXCJyOmlkXCI6cmlkfSl7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBub3Rlc01hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgaGFuZG91dE1hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgbWFzdGVyUGFydE9mTGF5b3V0KHdYbWxMYXlvdXRJZEluTWFzdGVyKXtcbiAgICAgICAgY29uc3QgbWFzdGVyUm9vdD10aGlzLiQod1htbExheW91dElkSW5NYXN0ZXIpLnJvb3QoKS5nZXQoMClcbiAgICAgICAgY29uc3Qge3BhcnQ6bWFzdGVyUGFydE5hbWV9PW1hc3RlclJvb3QuYXR0cmlic1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuZ2V0UmVsT2JqZWN0KG1hc3RlclBhcnROYW1lKVxuICAgIH1cblxuICAgIHN0YXRpYyBpZGVudGl0aWVzPXtcbiAgICAgICAgcHJlc2VudGF0aW9uKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpXG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6aGFuZG91dE1hc3RlcklkTHN0LHBcXFxcOm5vdGVzTWFzdGVySWRMc3QscFxcXFw6c2xkSWRMc3QscFxcXFw6c2xkTWFzdGVySWRMc3RcIlxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOnNsZE1hc3RlcklkTHN0XCI6MSwgXCJwOnNsZElkTHN0XCI6Mn1cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICBjb25zdCBzej0oe2F0dHJpYnM6e2N4LGN5fX0pPT4oe3dpZHRoOm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgoY3gpLGhlaWdodDpvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KGN5KX0pXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIHNsZFN6OnN6LCBcbiAgICAgICAgICAgICAgICBub3Rlc1N6OnN6LFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcImRvY3VtZW50XCIsY2hpbGRyZW59XG5cdFx0fSxcblxuICAgICAgICBzbGRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6c2xkTGF5b3V0SWRMc3QscFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50Lm1hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBjb25zdCAkbWFzdGVyPSQoXCJwXFxcXDpzbGRNYXN0ZXJcIilcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRtYXN0ZXIucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JG1hc3Rlci5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOnNsZExheW91dExzdFwiOjEsIFwicDpjU2xkXCI6Mn1cbiAgICAgICAgICAgIGNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBwYXJ0OiAkLnBhcnQsIGNoaWxkcmVuLHR5cGU6XCJzbGlkZU1hc3RlclwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHNsZElkKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOmNTbGRcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5zbGlkZSh3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBjb25zdCAkc2xpZGU9JCgncFxcXFw6c2xkJylcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRzbGlkZS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kc2xpZGUuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG5cbiAgICAgICAgICAgIGNvbnN0IHNsaWRlUGFydD1vZmZpY2VEb2N1bWVudC5nZXRSZWxQYXJ0KHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0Lm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0LmdldFJlbFRhcmdldChcInNsaWRlTGF5b3V0XCIpKSlcbiAgICAgICAgICAgIGNvbnN0IGxheW91dFBhcnQ9bmV3IFBhcnQobGF5b3V0VGFyZ2V0LG9mZmljZURvY3VtZW50LmRvYylcbiAgICAgICAgICAgIGNvbnN0IG1hc3RlclRhcmdldD1vZmZpY2VEb2N1bWVudC5kb2Mubm9ybWFsaXplUGF0aChsYXlvdXRQYXJ0Lm5vcm1hbGl6ZVBhdGgobGF5b3V0UGFydC5nZXRSZWxUYXJnZXQoXCJzbGlkZU1hc3RlclwiKSkpXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHBhcnQ6JC5wYXJ0LCBsYXlvdXQ6bGF5b3V0VGFyZ2V0LCBtYXN0ZXI6bWFzdGVyVGFyZ2V0LCBjaGlsZHJlbiwgdHlwZTpcInNsaWRlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbm90ZXNNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50Lm5vdGVzTWFzdGVyKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIHJldHVybiB7cGFydDokLnBhcnQsdHlwZTpcIm5vdGVNYXN0ZXJcIix9XG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZG91dE1hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuaGFuZG91dE1hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICByZXR1cm4ge3BhcnQ6JC5wYXJ0LHR5cGU6XCJoYW5kb3V0TWFzdGVyXCIsIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzbGRMYXlvdXRJZCh3WG1sLG9mZmljZURvY3VtZW50KXsvL2luIG1hc3RlclxuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOmNTbGRcIlxuICAgICAgICAgICAgY29uc3QgbWFzdGVyPW9mZmljZURvY3VtZW50LiQod1htbCkucGFydCgpXG4gICAgICAgICAgICBjb25zdCAkPW5ldyBQYXJ0KG1hc3RlcixvZmZpY2VEb2N1bWVudC5kb2MpLmdldFJlbCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxuICAgICAgICAgICAgY29uc3QgJGxheW91dD0kKFwicFxcXFw6c2xkTGF5b3V0XCIpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kbGF5b3V0LnByb3BzKHtmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kbGF5b3V0LmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHBhcnQ6JC5wYXJ0LCBtYXN0ZXIsIGNoaWxkcmVuLCB0eXBlOlwic2xpZGVMYXlvdXRcIiwgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwVHJlZSh3WG1sLG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCI6bm90KHBcXFxcOm52R3JwU3BQcixwXFxcXDpncnBTcFByKVwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz1vZmZpY2VEb2N1bWVudC4kKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgcFxcXFw6bnZHcnBTcFByLHBcXFxcOmdycFNwUHJgLFxuICAgICAgICAgICAgICAgIHRpZHk6KHtncnBTcFByLCBudkdycFNwUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIC4uLm90aGVyc30pPT4oey4uLmdycFNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyx0eXBlOlwic3BUcmVlXCIsIGNoaWxkcmVufVxuICAgICAgICB9LFxuXG4gICAgICAgIHBpYyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBwcm9wcz1vZmZpY2VEb2N1bWVudC4kKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIHRpZHk6KHtzcFByLCBudlBpY1ByOntjTnZQcj17fSxjTnZTcFByPXt9LG52UHI9e319LCAuLi5vdGhlcnN9KT0+KHsuLi5zcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHIsLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHR5cGU6XCJwaWN0dXJlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOnR4Qm9keVwiXG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBjb21tb25Qcm9wcz1kcmF3bWwob2ZmaWNlRG9jdW1lbnQpXG4gICAgICAgICAgICBjb25zdCBuYW1lcz17c3BMb2NrczpcImxvY2tzXCIsIHBoOlwicGxhY2Vob2xkZXJcIiwgLi4uY29tbW9uUHJvcHMubmFtZXN9XG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5jb21tb25Qcm9wcyxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICBuYW1lcyxcbiAgICAgICAgICAgICAgICBwaDooe2F0dHJpYnM6e3R5cGU9XCJib2R5XCIsaWR4fX0pPT4oe3R5cGUsaWR4fSksXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52U3BQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fX0pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQcn0pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCB0eEJvZHk9T2ZmaWNlRG9jdW1lbnQuaWRlbnRpdGllcy50eEJvZHkoY2hpbGRyZW5bMF0sb2ZmaWNlRG9jdW1lbnQpXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgLi4udHhCb2R5LCB0eXBlOlwic2hhcGVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0eEJvZHkod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOnBcIlxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKFwiYVxcXFw6cFwiKS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHRleHRTdHlsZT0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGxuU3BjUmVkdWN0aW9uOnY9PnBhcnNlSW50KHYpLFxuICAgICAgICAgICAgICAgIGZvbnRTY2FsZTogdj0+cGFyc2VJbnQodiksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KGFcXFxcOnAsYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGlkeTooe2xzdFN0eWxlPXt9LGJvZHlQcj17fSwuLi5vdGhlcnN9KT0+KHsuLi5vdGhlcnMsIC4uLmJvZHlQciwgLi4ubHN0U3R5bGV9KVxuICAgICAgICAgICAgfSlcblx0XHRcdHJldHVybiB7dGV4dFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInR4Qm9keVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHAod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6cFByLGFcXFxcOmVuZFBhcmFSUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDpwUHJcIikucHJvcHMoZHJhd21sKG9mZmljZURvY3VtZW50KSlcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6ZW5kUGFyYVJQclwiKS5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHtzdHlsZTp7bHZsOjAsIC4uLnN0eWxlfSwgZGVmYXVsdFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInBcIn1cbiAgICAgICAgfSxcblxuICAgICAgICByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6clByKVwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBzdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6clByXCIpLnByb3BzKHsuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpfSlcbiAgICAgICAgICAgIHJldHVybiB7c3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwiclwifVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoYXJ0KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTogXCJjaGFydFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbElkcyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJkaWFncmFtXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JhcGhpY0ZyYW1lKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDpncmFwaGljXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52R3JhcGhpY0ZyYW1lUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIC4uLm90aGVyc30pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuLCB0eXBlOlwiZ3JhcGhpY0ZyYW1lXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGJsKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDp0clwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LCBhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0YWJsZVN0eWxlSWQ6KHtjaGlsZHJlbn0pPT5jaGlsZHJlbi5maW5kKGE9PmEuZGF0YSkuZGF0YSxcbiAgICAgICAgICAgICAgICB0YmxHcmlkOih7Y2hpbGRyZW59KT0+Y2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZSkucmVkdWNlKChjb2xzLHthdHRyaWJzOnt3fX0pPT57XG4gICAgICAgICAgICAgICAgICAgIGNvbHMucHVzaChvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KHcpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29sc1xuICAgICAgICAgICAgICAgIH0sW10pLFxuICAgICAgICAgICAgICAgIHRpZHk6KHt0YmxQciwgdGJsR3JpZDpjb2xzLCAuLi5vdGhlcnN9KT0+KHsuLi50YmxQciwgY29scywgLi4ub3RoZXJzfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbiwgdHlwZTpcInRibFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRibFN0eWxlKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInRibFN0eWxlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHIod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpcIjpub3QoKilcIixcbiAgICAgICAgICAgICAgICBoOnY9Pm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodiksXG4gICAgICAgICAgICAgICAgbmFtZXM6e2g6XCJoZWlnaHRcIn1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLCB0eXBlOlwidHJcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0Yyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiYVxcXFw6dHhCb2R5XCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcInRjXCIsIGNoaWxkcmVufVxuICAgICAgICB9XG4gICAgfVxufSJdfQ==