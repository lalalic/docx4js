"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        key: "parse",
        value: function parse(domHandler) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            var createElement = domHandler.createElement.bind(domHandler);
            function _identify() {
                var model = identify.apply(undefined, arguments);
                if (model && (typeof model === "undefined" ? "undefined" : _typeof(model)) == "object") {
                    domHandler.emit.apply(domHandler, ["*", model].concat(Array.prototype.slice.call(arguments)));
                    domHandler.emit.apply(domHandler, [model.type, model].concat(Array.prototype.slice.call(arguments)));
                    if (domHandler["on" + model.type]) domHandler["on" + model.type].apply(domHandler, [model].concat(Array.prototype.slice.call(arguments)));
                }
                return model;
            }

            return this.render(createElement, _identify);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ0YWJsZVN0eWxlcyIsInJlbmRlck5vZGUiLCJyb290IiwiY2hpbGRyZW4iLCJnZXQiLCJjb250ZW50IiwiZG9tSGFuZGxlciIsIl9pZGVudGlmeSIsIm1vZGVsIiwiYXJndW1lbnRzIiwiZW1pdCIsInR5cGUiLCJyZW5kZXIiLCJpZCIsInJpZCIsImdldFJlbCIsInNsaWRlIiwid1htbExheW91dElkSW5NYXN0ZXIiLCJtYXN0ZXJSb290IiwiJCIsIm1hc3RlclBhcnROYW1lIiwiYXR0cmlicyIsInBhcnQiLCJkb2MiLCJnZXRSZWxPYmplY3QiLCJpZGVudGl0aWVzIiwicHJlc2VudGF0aW9uIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwidG9BcnJheSIsIm9yZGVycyIsInNvcnQiLCJhIiwiYiIsIm5hbWUiLCJzeiIsImN4IiwiY3kiLCJ3aWR0aCIsImVtdTJQeCIsImhlaWdodCIsInByb3BzIiwiX19maWx0ZXIiLCJzbGRTeiIsIm5vdGVzU3oiLCJzbGRNYXN0ZXJJZCIsIm1hc3RlciIsIiRtYXN0ZXIiLCJzbGRJZCIsIiRzbGlkZSIsInNsaWRlUGFydCIsImdldFJlbFBhcnQiLCJsYXlvdXRUYXJnZXQiLCJub3JtYWxpemVQYXRoIiwiZ2V0UmVsVGFyZ2V0IiwibGF5b3V0UGFydCIsIm1hc3RlclRhcmdldCIsImxheW91dCIsIm5vdGVzTWFzdGVySWQiLCJub3Rlc01hc3RlciIsImhhbmRvdXRNYXN0ZXJJZCIsImhhbmRvdXRNYXN0ZXIiLCJzbGRMYXlvdXRJZCIsIiRsYXlvdXQiLCJzcFRyZWUiLCJ0aWR5IiwiZ3JwU3BQciIsIm52R3JwU3BQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJvdGhlcnMiLCJwaWMiLCJzcFByIiwibnZQaWNQciIsInNwIiwiY29tbW9uUHJvcHMiLCJuYW1lcyIsInNwTG9ja3MiLCJwaCIsImlkeCIsIm52U3BQciIsInR4Qm9keSIsInRleHRTdHlsZSIsImxuU3BjUmVkdWN0aW9uIiwicGFyc2VJbnQiLCJ2IiwiZm9udFNjYWxlIiwibHN0U3R5bGUiLCJib2R5UHIiLCJwIiwic3R5bGUiLCJkZWZhdWx0U3R5bGUiLCJsdmwiLCJyIiwiY2hhcnQiLCJyZWxJZHMiLCJncmFwaGljRnJhbWUiLCJudkdyYXBoaWNGcmFtZVByIiwidGJsIiwidGFibGVTdHlsZUlkIiwiZmluZCIsImRhdGEiLCJ0YmxHcmlkIiwiZmlsdGVyIiwicmVkdWNlIiwiY29scyIsInciLCJwdXNoIiwidGJsUHIiLCJ0YmxTdHlsZSIsInRyIiwiaCIsInRjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7O2dDQUNWO0FBQ0g7QUFDQSxpQkFBS0MsVUFBTCxDQUFnQixrQ0FBa0NDLEtBQWxDLENBQXdDLEdBQXhDLENBQWhCO0FBQ0g7OzsrQkFFTUMsYSxFQUF5RTtBQUFBLGdCQUExREMsUUFBMEQsdUVBQWpELEtBQUtDLFdBQUwsQ0FBaUJELFFBQWpCLENBQTBCRSxJQUExQixDQUErQixLQUFLRCxXQUFwQyxDQUFpRDs7QUFDNUUsZ0JBQUcsS0FBS0UsV0FBUixFQUFvQjtBQUNoQixxQkFBS0MsVUFBTCxDQUFnQixLQUFLRCxXQUFMLENBQWlCRSxJQUFqQixHQUF3QkMsUUFBeEIsR0FBbUNDLEdBQW5DLENBQXVDLENBQXZDLENBQWhCLEVBQTJEUixhQUEzRCxFQUEwRUMsUUFBMUU7QUFDSDtBQUNELG1CQUFPLEtBQUtJLFVBQUwsQ0FBZ0IsS0FBS0ksT0FBTCxDQUFhLGtCQUFiLEVBQWlDRCxHQUFqQyxDQUFxQyxDQUFyQyxDQUFoQixFQUF5RFIsYUFBekQsRUFBd0VDLFFBQXhFLENBQVA7QUFDSDs7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QkFBV3ZFLEtBQVgsSUFBa0J0QyxVQUFTd0IsS0FBS3hCLFFBQWhDLEVBQTBDUSxNQUFLLElBQS9DO0FBQ0gsS0FsTWE7QUFvTWRzRyxNQXBNYyxjQW9NWHRGLElBcE1XLEVBb01MQyxjQXBNSyxFQW9NVTtBQUNwQixZQUFNdkIsVUFBUSxZQUFkO0FBQ0EsWUFBTWMsSUFBRVMsZUFBZVQsQ0FBZixDQUFpQlEsSUFBakIsQ0FBUjtBQUNBLFlBQU14QixXQUFTZ0IsRUFBRWhCLFFBQUYsQ0FBV0UsT0FBWCxFQUFvQndCLE9BQXBCLEVBQWY7QUFDQSxZQUFNWSxRQUFNdEIsRUFBRXNCLEtBQUYsQ0FBUTtBQUNoQkMsZ0NBQWlCckMsT0FBakI7QUFEZ0IsU0FBUixDQUFaO0FBR0EsNEJBQVdvQyxLQUFYLElBQWtCOUIsTUFBSyxJQUF2QixFQUE2QlIsa0JBQTdCO0FBQ0g7QUE1TWEsQztrQkFuRERWLGMiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuaW1wb3J0IGRyYXdtbCBmcm9tIFwiLi4vZHJhd21sXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFwidGFibGVTdHlsZXMsdmlld1Byb3BzLHByZXNQcm9wc1wiLnNwbGl0KFwiLFwiKSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgaWYodGhpcy50YWJsZVN0eWxlcyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy50YWJsZVN0eWxlcy5yb290KCkuY2hpbGRyZW4oKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgcGFyc2UoZG9tSGFuZGxlcixpZGVudGlmeT10aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3Rvcikpe1xuXHRcdGNvbnN0IGNyZWF0ZUVsZW1lbnQ9ZG9tSGFuZGxlci5jcmVhdGVFbGVtZW50LmJpbmQoZG9tSGFuZGxlcilcblx0XHRmdW5jdGlvbiBfaWRlbnRpZnkoKXtcblx0XHRcdGxldCBtb2RlbD1pZGVudGlmeSguLi5hcmd1bWVudHMpXG5cdFx0XHRpZihtb2RlbCAmJiB0eXBlb2YobW9kZWwpPT1cIm9iamVjdFwiKXtcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KFwiKlwiLG1vZGVsLC4uLmFyZ3VtZW50cylcblx0XHRcdFx0ZG9tSGFuZGxlci5lbWl0KG1vZGVsLnR5cGUsIG1vZGVsLC4uLmFyZ3VtZW50cylcblx0XHRcdFx0aWYoZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0pXG5cdFx0XHRcdFx0ZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsLi4uYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIG1vZGVsXG5cdFx0fVxuXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcihjcmVhdGVFbGVtZW50LCBfaWRlbnRpZnkpXG5cdH1cblxuICAgIHNsaWRlKHtpZCxcInI6aWRcIjpyaWR9KXtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UmVsKHJpZClcbiAgICB9XG5cbiAgICBtYXN0ZXIoe2lkLFwicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgbm90ZXNNYXN0ZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpZGUoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIGhhbmRvdXRNYXN0ZXIoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpZGUoLi4uYXJndW1lbnRzKVxuICAgIH1cblxuICAgIG1hc3RlclBhcnRPZkxheW91dCh3WG1sTGF5b3V0SWRJbk1hc3Rlcil7XG4gICAgICAgIGNvbnN0IG1hc3RlclJvb3Q9dGhpcy4kKHdYbWxMYXlvdXRJZEluTWFzdGVyKS5yb290KCkuZ2V0KDApXG4gICAgICAgIGNvbnN0IHtwYXJ0Om1hc3RlclBhcnROYW1lfT1tYXN0ZXJSb290LmF0dHJpYnNcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9jLmdldFJlbE9iamVjdChtYXN0ZXJQYXJ0TmFtZSlcbiAgICB9XG5cbiAgICBzdGF0aWMgaWRlbnRpdGllcz17XG4gICAgICAgIHByZXNlbnRhdGlvbih3WG1sLG9mZmljZURvY3VtZW50KXtcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuY29udGVudChcInBcXFxcOnByZXNlbnRhdGlvblwiKVxuICAgICAgICAgICAgY29uc3QgY29udGVudD1cInBcXFxcOmhhbmRvdXRNYXN0ZXJJZExzdCxwXFxcXDpub3Rlc01hc3RlcklkTHN0LHBcXFxcOnNsZElkTHN0LHBcXFxcOnNsZE1hc3RlcklkTHN0XCJcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBvcmRlcnM9e1wicDpzbGRNYXN0ZXJJZExzdFwiOjEsIFwicDpzbGRJZExzdFwiOjJ9XG4gICAgICAgICAgICBjaGlsZHJlbi5zb3J0KChhLGIpPT4ob3JkZXJzW2EubmFtZV18fDk5KS0ob3JkZXJzW2IubmFtZV18fDk5KSlcblxuICAgICAgICAgICAgY29uc3Qgc3o9KHthdHRyaWJzOntjeCxjeX19KT0+KHt3aWR0aDpvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KGN4KSxoZWlnaHQ6b2ZmaWNlRG9jdW1lbnQuZG9jLmVtdTJQeChjeSl9KVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIHNsZFN6OnN6LCBcbiAgICAgICAgICAgICAgICBub3Rlc1N6OnN6LFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgdHlwZTpcImRvY3VtZW50XCIsY2hpbGRyZW59XG5cdFx0fSxcblxuICAgICAgICBzbGRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6c2xkTGF5b3V0SWRMc3QscFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50Lm1hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICBjb25zdCAkbWFzdGVyPSQoXCJwXFxcXDpzbGRNYXN0ZXJcIilcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSRtYXN0ZXIucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kbWFzdGVyLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qgb3JkZXJzPXtcInA6c2xkTGF5b3V0THN0XCI6MSwgXCJwOmNTbGRcIjoyfVxuICAgICAgICAgICAgY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG5cbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIHBhcnQ6ICQucGFydCwgY2hpbGRyZW4sdHlwZTpcInNsaWRlTWFzdGVyXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xkSWQod1htbCxvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LnNsaWRlKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIGNvbnN0ICRzbGlkZT0kKCdwXFxcXDpzbGQnKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JHNsaWRlLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JHNsaWRlLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuXG4gICAgICAgICAgICBjb25zdCBzbGlkZVBhcnQ9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsUGFydCh3WG1sLmF0dHJpYnNbXCJyOmlkXCJdKVxuICAgICAgICAgICAgY29uc3QgbGF5b3V0VGFyZ2V0PW9mZmljZURvY3VtZW50LmRvYy5ub3JtYWxpemVQYXRoKHNsaWRlUGFydC5ub3JtYWxpemVQYXRoKHNsaWRlUGFydC5nZXRSZWxUYXJnZXQoXCJzbGlkZUxheW91dFwiKSkpXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRQYXJ0PW5ldyBQYXJ0KGxheW91dFRhcmdldCxvZmZpY2VEb2N1bWVudC5kb2MpXG4gICAgICAgICAgICBjb25zdCBtYXN0ZXJUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgobGF5b3V0UGFydC5ub3JtYWxpemVQYXRoKGxheW91dFBhcnQuZ2V0UmVsVGFyZ2V0KFwic2xpZGVNYXN0ZXJcIikpKVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyxwYXJ0OiQucGFydCwgbGF5b3V0OmxheW91dFRhcmdldCwgbWFzdGVyOm1hc3RlclRhcmdldCwgY2hpbGRyZW4sIHR5cGU6XCJzbGlkZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIG5vdGVzTWFzdGVySWQod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5ub3Rlc01hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICByZXR1cm4ge3BhcnQ6JC5wYXJ0LHR5cGU6XCJub3RlTWFzdGVyXCIsfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRvdXRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LmhhbmRvdXRNYXN0ZXIod1htbC5hdHRyaWJzKVxuICAgICAgICAgICAgcmV0dXJuIHtwYXJ0OiQucGFydCx0eXBlOlwiaGFuZG91dE1hc3RlclwiLCB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xkTGF5b3V0SWQod1htbCxvZmZpY2VEb2N1bWVudCl7Ly9pbiBtYXN0ZXJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpjU2xkXCJcbiAgICAgICAgICAgIGNvbnN0IG1hc3Rlcj1vZmZpY2VEb2N1bWVudC4kKHdYbWwpLnBhcnQoKVxuICAgICAgICAgICAgY29uc3QgJD1uZXcgUGFydChtYXN0ZXIsb2ZmaWNlRG9jdW1lbnQuZG9jKS5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcbiAgICAgICAgICAgIGNvbnN0ICRsYXlvdXQ9JChcInBcXFxcOnNsZExheW91dFwiKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JGxheW91dC5wcm9wcyh7X19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kbGF5b3V0LmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHBhcnQ6JC5wYXJ0LCBtYXN0ZXIsIGNoaWxkcmVuLCB0eXBlOlwic2xpZGVMYXlvdXRcIiwgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwVHJlZSh3WG1sLG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCI6bm90KHBcXFxcOm52R3JwU3BQcixwXFxcXDpncnBTcFByKVwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz1vZmZpY2VEb2N1bWVudC4kKHdYbWwpLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmBwXFxcXDpudkdycFNwUHIscFxcXFw6Z3JwU3BQcmAsXG4gICAgICAgICAgICAgICAgdGlkeTooe2dycFNwUHIsIG52R3JwU3BQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uZ3JwU3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLHR5cGU6XCJzcFRyZWVcIiwgY2hpbGRyZW59XG4gICAgICAgIH0sXG5cbiAgICAgICAgcGljKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPW9mZmljZURvY3VtZW50LiQod1htbCkucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgdGlkeTooe3NwUHIsIG52UGljUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX0sIC4uLm90aGVyc30pPT4oey4uLnNwUHIsIC4uLmNOdlByLC4uLmNOdlNwUHIsLi4ubnZQciwuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsdHlwZTpcInBpY3R1cmVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICBzcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6dHhCb2R5XCJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IGNvbW1vblByb3BzPWRyYXdtbChvZmZpY2VEb2N1bWVudClcbiAgICAgICAgICAgIGNvbnN0IG5hbWVzPXtzcExvY2tzOlwibG9ja3NcIiwgcGg6XCJwbGFjZWhvbGRlclwiLCAuLi5jb21tb25Qcm9wcy5uYW1lc31cbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbW1vblByb3BzLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgbmFtZXMsXG4gICAgICAgICAgICAgICAgcGg6KHthdHRyaWJzOnt0eXBlPVwiYm9keVwiLGlkeH19KT0+KHt0eXBlLGlkeH0pLFxuICAgICAgICAgICAgICAgIHRpZHk6KHtzcFByLCBudlNwUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX19KT0+KHsuLi5zcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHJ9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgdHhCb2R5PU9mZmljZURvY3VtZW50LmlkZW50aXRpZXMudHhCb2R5KGNoaWxkcmVuWzBdLG9mZmljZURvY3VtZW50KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgY2hpbGRyZW4sIC4uLnR4Qm9keSwgdHlwZTpcInNoYXBlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHhCb2R5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDpwXCJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihcImFcXFxcOnBcIikudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCB0ZXh0U3R5bGU9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBsblNwY1JlZHVjdGlvbjp2PT5wYXJzZUludCh2KSxcbiAgICAgICAgICAgICAgICBmb250U2NhbGU6IHY9PnBhcnNlSW50KHYpLFxuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmA6bm90KGFcXFxcOnAsYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGlkeTooe2xzdFN0eWxlPXt9LGJvZHlQcj17fSwuLi5vdGhlcnN9KT0+KHsuLi5vdGhlcnMsIC4uLmJvZHlQciwgLi4ubHN0U3R5bGV9KVxuICAgICAgICAgICAgfSlcblx0XHRcdHJldHVybiB7dGV4dFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInR4Qm9keVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHAod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6cFByLGFcXFxcOmVuZFBhcmFSUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDpwUHJcIikucHJvcHMoZHJhd21sKG9mZmljZURvY3VtZW50KSlcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRTdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6ZW5kUGFyYVJQclwiKS5wcm9wcyhkcmF3bWwob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgcmV0dXJuIHtzdHlsZTp7bHZsOjAsIC4uLnN0eWxlfSwgZGVmYXVsdFN0eWxlLCBjaGlsZHJlbiwgdHlwZTpcInBcIn1cbiAgICAgICAgfSxcblxuICAgICAgICByKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cIjpub3QoYVxcXFw6clByKVwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oY29udGVudCkudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCBzdHlsZT0kLmNoaWxkcmVuKFwiYVxcXFw6clByXCIpLnByb3BzKHsuLi5kcmF3bWwob2ZmaWNlRG9jdW1lbnQpfSlcbiAgICAgICAgICAgIHJldHVybiB7c3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwiclwifVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoYXJ0KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTogXCJjaGFydFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbElkcyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJkaWFncmFtXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ3JhcGhpY0ZyYW1lKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDpncmFwaGljXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZHcmFwaGljRnJhbWVQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgY2hpbGRyZW4sIHR5cGU6XCJncmFwaGljRnJhbWVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0Ymwod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOnRyXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgX19maWx0ZXI6YDpub3QoJHtjb250ZW50fSwgYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgdGFibGVTdHlsZUlkOih7Y2hpbGRyZW59KT0+Y2hpbGRyZW4uZmluZChhPT5hLmRhdGEpLmRhdGEsXG4gICAgICAgICAgICAgICAgdGJsR3JpZDooe2NoaWxkcmVufSk9PmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpLnJlZHVjZSgoY29scyx7YXR0cmliczp7d319KT0+e1xuICAgICAgICAgICAgICAgICAgICBjb2xzLnB1c2gob2ZmaWNlRG9jdW1lbnQuZG9jLmVtdTJQeCh3KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbHNcbiAgICAgICAgICAgICAgICB9LFtdKSxcbiAgICAgICAgICAgICAgICB0aWR5Oih7dGJsUHIsIHRibEdyaWQ6Y29scywgLi4ub3RoZXJzfSk9Pih7Li4udGJsUHIsIGNvbHMsIC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgY2hpbGRyZW4sIHR5cGU6XCJ0YmxcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0YmxTdHlsZSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoZHJhd21sKG9mZmljZURvY3VtZW50KSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIHR5cGU6XCJ0YmxTdHlsZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRyKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBfX2ZpbHRlcjpcIjpub3QoKilcIixcbiAgICAgICAgICAgICAgICBoOnY9Pm9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodiksXG4gICAgICAgICAgICAgICAgbmFtZXM6e2g6XCJoZWlnaHRcIn1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCBjaGlsZHJlbjp3WG1sLmNoaWxkcmVuLCB0eXBlOlwidHJcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0Yyh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiYVxcXFw6dHhCb2R5XCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIF9fZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCB0eXBlOlwidGNcIiwgY2hpbGRyZW59XG4gICAgICAgIH1cbiAgICB9XG59Il19