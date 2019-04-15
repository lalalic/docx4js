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
    }, {
        key: "tableStyle",
        value: function tableStyle(id) {
            retu;
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
        var props = $.props(_extends({}, common(officeDocument), {
            filter: ":not(" + content + ",a\\:extLst)",
            sldSz: sz, notesSz: sz
        }));

        return _extends({}, props, { type: "document", children: children });
    },
    sldMasterId: function sldMasterId(wXml, officeDocument) {
        var content = "p\\:sldLayoutIdLst,p\\:cSld";
        var $ = officeDocument.master(wXml.attribs);
        var $master = $("p\\:sldMaster");
        var props = $master.props(_extends({}, common(officeDocument), {
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
        var props = $slide.props(_extends({}, common(officeDocument), {
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
    spTree: function spTree(wXml, od) {
        var nvGrpSpPr = wXml.children.find(function (a) {
            return a.name == "p:nvGrpSpPr";
        });
        var grpSpPr = wXml.children.find(function (a) {
            return a.name == "p:grpSpPr";
        });
        var model = { type: "frame" };
        if (nvGrpSpPr) {
            var _drawml$nvGrpSpPr = _drawml2.default.nvGrpSpPr(nvGrpSpPr, od),
                type = _drawml$nvGrpSpPr.type,
                props = _objectWithoutProperties(_drawml$nvGrpSpPr, ["type"]);

            Object.assign(model, props);
        }

        if (grpSpPr) {
            var _drawml$grpSpPr = _drawml2.default.grpSpPr(grpSpPr, od),
                _type = _drawml$grpSpPr.type,
                _props = _objectWithoutProperties(_drawml$grpSpPr, ["type"]);

            Object.assign(model, _props);
        }
        return model;
    },
    pic: function pic(wXml, officeDocument) {
        var props = officeDocument.$(wXml).props(_extends({}, common(officeDocument), {
            tidy: function tidy(_ref4) {
                var spPr = _ref4.spPr,
                    _ref4$nvPicPr = _ref4.nvPicPr,
                    _ref4$nvPicPr$cNvPr = _ref4$nvPicPr.cNvPr,
                    cNvPr = _ref4$nvPicPr$cNvPr === undefined ? {} : _ref4$nvPicPr$cNvPr,
                    _ref4$nvPicPr$cNvSpPr = _ref4$nvPicPr.cNvSpPr,
                    cNvSpPr = _ref4$nvPicPr$cNvSpPr === undefined ? {} : _ref4$nvPicPr$cNvSpPr,
                    _ref4$nvPicPr$nvPr = _ref4$nvPicPr.nvPr,
                    nvPr = _ref4$nvPicPr$nvPr === undefined ? {} : _ref4$nvPicPr$nvPr,
                    others = _objectWithoutProperties(_ref4, ["spPr", "nvPicPr"]);

                return _extends({}, spPr, cNvPr, cNvSpPr, nvPr, others);
            }
        }));
        return _extends({}, props, { type: "picture" });
    },
    sp: function sp(wXml, officeDocument) {
        var content = "p\\:txBody";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var commonProps = common(officeDocument);
        var names = _extends({ spLocks: "locks", ph: "placeholder" }, commonProps.names);
        var props = $.props(_extends({}, commonProps, {
            filter: ":not(" + content + ",a\\:extLst)",
            names: names,
            ph: function ph(_ref5) {
                var _ref5$attribs = _ref5.attribs,
                    _ref5$attribs$type = _ref5$attribs.type,
                    type = _ref5$attribs$type === undefined ? "body" : _ref5$attribs$type,
                    idx = _ref5$attribs.idx;
                return { type: type, idx: idx };
            },
            tidy: function tidy(_ref6) {
                var spPr = _ref6.spPr,
                    _ref6$nvSpPr = _ref6.nvSpPr,
                    _ref6$nvSpPr$cNvPr = _ref6$nvSpPr.cNvPr,
                    cNvPr = _ref6$nvSpPr$cNvPr === undefined ? {} : _ref6$nvSpPr$cNvPr,
                    _ref6$nvSpPr$cNvSpPr = _ref6$nvSpPr.cNvSpPr,
                    cNvSpPr = _ref6$nvSpPr$cNvSpPr === undefined ? {} : _ref6$nvSpPr$cNvSpPr,
                    _ref6$nvSpPr$nvPr = _ref6$nvSpPr.nvPr,
                    nvPr = _ref6$nvSpPr$nvPr === undefined ? {} : _ref6$nvSpPr$nvPr;
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
        var textStyle = $.props(_extends({}, common(officeDocument), {
            filter: ":not(a\\:p,a\\:extLst)",
            tidy: function tidy(_ref7) {
                var _ref7$lstStyle = _ref7.lstStyle,
                    lstStyle = _ref7$lstStyle === undefined ? {} : _ref7$lstStyle,
                    _ref7$bodyPr = _ref7.bodyPr,
                    bodyPr = _ref7$bodyPr === undefined ? {} : _ref7$bodyPr,
                    others = _objectWithoutProperties(_ref7, ["lstStyle", "bodyPr"]);

                return _extends({}, others, bodyPr, lstStyle);
            }
        }));
        return { textStyle: textStyle, children: children, type: "txBody" };
    },
    p: function p(wXml, officeDocument) {
        var content = ":not(a\\:pPr,a\\:endParaRPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var style = $.children("a\\:pPr").props(common(officeDocument));
        var defaultStyle = $.children("a\\:endParaRPr").props(common(officeDocument));
        return { style: _extends({ lvl: 0 }, style), defaultStyle: defaultStyle, children: children, type: "p" };
    },
    r: function r(wXml, officeDocument) {
        var content = ":not(a\\:rPr)";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var style = $.children("a\\:rPr").props(_extends({}, common(officeDocument)));
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
        var props = $.props(_extends({}, common(officeDocument), {
            filter: ":not(" + content + ",a\\:extLst)",
            tidy: function tidy(_ref8) {
                var spPr = _ref8.spPr,
                    _ref8$nvGraphicFrameP = _ref8.nvGraphicFramePr,
                    _ref8$nvGraphicFrameP2 = _ref8$nvGraphicFrameP.cNvPr,
                    cNvPr = _ref8$nvGraphicFrameP2 === undefined ? {} : _ref8$nvGraphicFrameP2,
                    _ref8$nvGraphicFrameP3 = _ref8$nvGraphicFrameP.cNvSpPr,
                    cNvSpPr = _ref8$nvGraphicFrameP3 === undefined ? {} : _ref8$nvGraphicFrameP3,
                    _ref8$nvGraphicFrameP4 = _ref8$nvGraphicFrameP.nvPr,
                    nvPr = _ref8$nvGraphicFrameP4 === undefined ? {} : _ref8$nvGraphicFrameP4,
                    others = _objectWithoutProperties(_ref8, ["spPr", "nvGraphicFramePr"]);

                return _extends({}, spPr, cNvPr, cNvSpPr, nvPr, others);
            }
        }));
        return _extends({}, props, { children: children, type: "graphicFrame" });
    },
    tbl: function tbl(wXml, officeDocument) {
        var content = "a\\:tr";
        var $ = officeDocument.$(wXml);
        var children = $.children(content).toArray();
        var props = $.props(_extends({}, common(officeDocument), {
            filter: ":not(" + content + ", a\\:extLst)",
            tableStyleId: function tableStyleId(_ref9) {
                var children = _ref9.children;
                return children.find(function (a) {
                    return a.data;
                }).data;
            },
            tblGrid: function tblGrid(_ref10) {
                var children = _ref10.children;
                return children.filter(function (a) {
                    return a.name;
                }).reduce(function (cols, _ref11) {
                    var w = _ref11.attribs.w;

                    cols.push(officeDocument.doc.emu2Px(w));
                    return cols;
                }, []);
            },
            tidy: function tidy(_ref12) {
                var tblPr = _ref12.tblPr,
                    cols = _ref12.tblGrid,
                    others = _objectWithoutProperties(_ref12, ["tblPr", "tblGrid"]);

                return _extends({}, tblPr, { cols: cols }, others);
            }
        }));
        return _extends({}, props, { children: children, type: "tbl" });
    },
    tblStyle: function tblStyle(wXml, officeDocument) {
        var $ = officeDocument.$(wXml);
        var props = $.props(common(officeDocument));
        return _extends({}, props, { type: "tblStyle" });
    },
    tr: function tr(wXml, officeDocument) {
        var $ = officeDocument.$(wXml);
        var props = $.props(_extends({}, common(officeDocument), {
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

var common = function common(od) {
    return _extends({
        filter: ":not(a\\:extLst)"
    }, same("latin,ea,cs".split(","), function (_ref13) {
        var _ref13$attribs$typefa = _ref13.attribs.typeface,
            typeface = _ref13$attribs$typefa === undefined ? "" : _ref13$attribs$typefa;
        return od.theme.font(typeface);
    }), same("lumMod,lumOff,tint".split(","), function (_ref14) {
        var val = _ref14.attribs.val;
        return parseInt(val) / 100000;
    }), {
        tidy_schemeClr: function tidy_schemeClr(_ref15) {
            var val = _ref15.val,
                lumMod = _ref15.lumMod,
                lumOff = _ref15.lumOff,
                tint = _ref15.tint;
            return od.doc.asColor(od.theme.color(val), { lumMod: lumMod, lumOff: lumOff, tint: tint });
        },
        tidy_srgbClr: function tidy_srgbClr(_ref16) {
            var val = _ref16.val,
                lumMod = _ref16.lumMod,
                lumOff = _ref16.lumOff,
                tint = _ref16.tint;
            return od.doc.asColor(val, { lumMod: lumMod, lumOff: lumOff, tint: tint });
        },
        sysClr: function sysClr(_ref17) {
            var val = _ref17.attribs.val;
            return val;
        },
        tidy_solidFill: function tidy_solidFill(_ref18) {
            var color = _ref18.color;
            return color;
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
        pathLst: function pathLst(_ref19) {
            var children = _ref19.children;

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
                            d.push('L ' + px(a.children[0].attr('x')) + ' ' + px(a.children[0].attr('y')));
                            d.push('Q ' + px(a.children[1].attr('x')) + ' ' + px(a.children[1].attr('y')) + ' ' + px(a.children[2].attr('x')) + ' ' + px(a.children[2].attr('y')));
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

        tidy_custGeom: function tidy_custGeom(_ref20) {
            var pathLst = _ref20.pathLst;
            return pathLst;
        },

        lvl: function lvl(v) {
            return parseInt(v);
        },
        spcPts: function spcPts(_ref21) {
            var val = _ref21.attribs.val;
            return od.doc.pt2Px(parseInt(val) / 100);
        },
        tidy_spcAft: function tidy_spcAft(_ref22) {
            var a = _ref22.spcPts;
            return a;
        },
        tidy_spcBef: function tidy_spcBef(_ref23) {
            var a = _ref23.spcPts;
            return a;
        },

        buFont: function buFont(_ref24) {
            var typeface = _ref24.attribs.typeface;
            return typeface;
        },
        buChar: function buChar(_ref25) {
            var char = _ref25.attribs.char;
            return char;
        },
        buSzPts: function buSzPts(_ref26) {
            var val = _ref26.attribs.val;
            return od.doc.pt2Px(parseInt(val) / 100);
        },
        buSzPct: function buSzPct(_ref27) {
            var val = _ref27.attribs.val;
            return parseInt(val) / 1000 / 100;
        },
        buAutoNum: function buAutoNum(_ref28) {
            var attribs = _ref28.attribs;
            return _extends({}, attribs);
        },
        tidy_buClr: function tidy_buClr(_ref29) {
            var color = _ref29.color;
            return color;
        },

        indent: function indent(v) {
            return od.doc.emu2Px(v);
        },
        marL: function marL(v) {
            return od.doc.emu2Px(v);
        },

        ext: function ext(_ref30) {
            var _ref30$attribs = _ref30.attribs,
                cx = _ref30$attribs.cx,
                cy = _ref30$attribs.cy;
            return { width: od.doc.emu2Px(cx), height: od.doc.emu2Px(cy) };
        },
        off: function off(_ref31) {
            var _ref31$attribs = _ref31.attribs,
                x = _ref31$attribs.x,
                y = _ref31$attribs.y;
            return { x: od.doc.emu2Px(x), y: od.doc.emu2Px(y) };
        },
        tidy_xfrm: function tidy_xfrm(_ref32) {
            var _ref32$ext = _ref32.ext,
                ext = _ref32$ext === undefined ? {} : _ref32$ext,
                _ref32$off = _ref32.off,
                off = _ref32$off === undefined ? {} : _ref32$off,
                transform = _objectWithoutProperties(_ref32, ["ext", "off"]);

            return _extends({}, ext, off, transform);
        }

    }, same("ln,lnB,lnR,lnL,lnT,lnTlToBr,lnBlToTr".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref33) {
        var w = _ref33.w,
            props = _objectWithoutProperties(_ref33, ["w"]);

        return _extends({}, props, { w: od.doc.emu2Px(w) });
    }), same("left,right,top,bottom".split(",").map(function (a) {
        return 'tidy_' + a;
    }), function (_ref34) {
        var ln = _ref34.ln;
        return ln;
    }), {
        tidy_tcTxStyle: function tidy_tcTxStyle(_ref35) {
            var color = _ref35.color,
                props = _objectWithoutProperties(_ref35, ["color"]);

            return _extends({}, props, { solidFill: color });
        },
        names: {
            schemeClr: "color", srgbClr: "color", sysClr: "color",
            prstGeom: "geometry", custGeom: "geometry",
            lnB: "bottom", lnR: "right", lnL: "left", lnT: "top"
        }
    });
};

var same = function same(keys, fx) {
    return keys.reduce(function (fs, k) {
        return fs[k] = fx, fs;
    }, {});
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiT2ZmaWNlRG9jdW1lbnQiLCJfYXNzaWduUmVsIiwic3BsaXQiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJ0YWJsZVN0eWxlcyIsInJlbmRlck5vZGUiLCJyb290IiwiY2hpbGRyZW4iLCJnZXQiLCJjb250ZW50IiwiaWQiLCJyaWQiLCJnZXRSZWwiLCJzbGlkZSIsImFyZ3VtZW50cyIsIndYbWxMYXlvdXRJZEluTWFzdGVyIiwibWFzdGVyUm9vdCIsIiQiLCJtYXN0ZXJQYXJ0TmFtZSIsImF0dHJpYnMiLCJwYXJ0IiwiZG9jIiwiZ2V0UmVsT2JqZWN0IiwicmV0dSIsImlkZW50aXRpZXMiLCJwcmVzZW50YXRpb24iLCJ3WG1sIiwib2ZmaWNlRG9jdW1lbnQiLCJ0b0FycmF5Iiwib3JkZXJzIiwic29ydCIsImEiLCJiIiwibmFtZSIsInN6IiwiY3giLCJjeSIsIndpZHRoIiwiZW11MlB4IiwiaGVpZ2h0IiwicHJvcHMiLCJjb21tb24iLCJmaWx0ZXIiLCJzbGRTeiIsIm5vdGVzU3oiLCJ0eXBlIiwic2xkTWFzdGVySWQiLCJtYXN0ZXIiLCIkbWFzdGVyIiwic2xkSWQiLCIkc2xpZGUiLCJzbGlkZVBhcnQiLCJnZXRSZWxQYXJ0IiwibGF5b3V0VGFyZ2V0Iiwibm9ybWFsaXplUGF0aCIsImZvbGRlciIsImdldFJlbFRhcmdldCIsImxheW91dFBhcnQiLCJtYXN0ZXJUYXJnZXQiLCJsYXlvdXQiLCJub3Rlc01hc3RlcklkIiwibm90ZXNNYXN0ZXIiLCJoYW5kb3V0TWFzdGVySWQiLCJoYW5kb3V0TWFzdGVyIiwic2xkTGF5b3V0SWQiLCIkbGF5b3V0Iiwic3BUcmVlIiwib2QiLCJudkdycFNwUHIiLCJmaW5kIiwiZ3JwU3BQciIsIm1vZGVsIiwiT2JqZWN0IiwiYXNzaWduIiwicGljIiwidGlkeSIsInNwUHIiLCJudlBpY1ByIiwiY052UHIiLCJjTnZTcFByIiwibnZQciIsIm90aGVycyIsInNwIiwiY29tbW9uUHJvcHMiLCJuYW1lcyIsInNwTG9ja3MiLCJwaCIsImlkeCIsIm52U3BQciIsInR4Qm9keSIsInRleHRTdHlsZSIsImxzdFN0eWxlIiwiYm9keVByIiwicCIsInN0eWxlIiwiZGVmYXVsdFN0eWxlIiwibHZsIiwiciIsImNoYXJ0IiwicmVsSWRzIiwiZ3JhcGhpY0ZyYW1lIiwibnZHcmFwaGljRnJhbWVQciIsInRibCIsInRhYmxlU3R5bGVJZCIsImRhdGEiLCJ0YmxHcmlkIiwicmVkdWNlIiwiY29scyIsInciLCJwdXNoIiwidGJsUHIiLCJ0YmxTdHlsZSIsInRyIiwiaCIsInYiLCJ0YyIsInNhbWUiLCJ0eXBlZmFjZSIsInRoZW1lIiwiZm9udCIsInZhbCIsInBhcnNlSW50IiwidGlkeV9zY2hlbWVDbHIiLCJsdW1Nb2QiLCJsdW1PZmYiLCJ0aW50IiwiYXNDb2xvciIsImNvbG9yIiwidGlkeV9zcmdiQ2xyIiwic3lzQ2xyIiwidGlkeV9zb2xpZEZpbGwiLCJibGlwIiwibiIsImVtYmVkIiwidXJsIiwicHJzdEdlb20iLCJ4IiwicHJzdCIsInBhdGhMc3QiLCJweCIsImQiLCJwYXRoIiwiZm9yRWFjaCIsInBvcCIsInkiLCJhdHRyIiwiam9pbiIsInRpZHlfY3VzdEdlb20iLCJzcGNQdHMiLCJwdDJQeCIsInRpZHlfc3BjQWZ0IiwidGlkeV9zcGNCZWYiLCJidUZvbnQiLCJidUNoYXIiLCJjaGFyIiwiYnVTelB0cyIsImJ1U3pQY3QiLCJidUF1dG9OdW0iLCJ0aWR5X2J1Q2xyIiwiaW5kZW50IiwibWFyTCIsImV4dCIsIm9mZiIsInRpZHlfeGZybSIsInRyYW5zZm9ybSIsIm1hcCIsImxuIiwidGlkeV90Y1R4U3R5bGUiLCJzb2xpZEZpbGwiLCJzY2hlbWVDbHIiLCJzcmdiQ2xyIiwiY3VzdEdlb20iLCJsbkIiLCJsblIiLCJsbkwiLCJsblQiLCJrZXlzIiwiZngiLCJmcyIsImsiXSwibWFwcGluZ3Mi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QVd2RixLQUFYOztBQUFBLGdDQUF5QkEsS0FBekIsSUFBZ0NnSSxXQUFVekMsS0FBMUM7QUFBQSxTQTFFTjtBQTJFVDNDLGVBQU07QUFDRnFGLHVCQUFVLE9BRFIsRUFDaUJDLFNBQVEsT0FEekIsRUFDa0N6QyxRQUFPLE9BRHpDO0FBRUZNLHNCQUFTLFVBRlAsRUFFbUJvQyxVQUFTLFVBRjVCO0FBR0ZDLGlCQUFJLFFBSEYsRUFHWUMsS0FBSSxPQUhoQixFQUd5QkMsS0FBSSxNQUg3QixFQUdxQ0MsS0FBSTtBQUh6QztBQTNFRztBQUFBLENBQWI7O0FBa0ZBLElBQU0zRCxPQUFLLFNBQUxBLElBQUssQ0FBQzRELElBQUQsRUFBTUMsRUFBTjtBQUFBLFdBQVdELEtBQUt0RSxNQUFMLENBQVksVUFBQ3dFLEVBQUQsRUFBS0MsQ0FBTDtBQUFBLGVBQVVELEdBQUdDLENBQUgsSUFBTUYsRUFBTixFQUFVQyxFQUFwQjtBQUFBLEtBQVosRUFBb0MsRUFBcEMsQ0FBWDtBQUFBLENBQVgiLCJmaWxlIjoib2ZmaWNlRG9jdW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZSBmcm9tIFwiLi4vb2ZmaWNlRG9jdW1lbnRcIlxuaW1wb3J0IFBhcnQgZnJvbSBcIi4uL3BhcnRcIlxuaW1wb3J0IGRyYXdtbCBmcm9tIFwiLi4vZHJhd21sXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT2ZmaWNlRG9jdW1lbnQgZXh0ZW5kcyBCYXNle1xuICAgIF9pbml0KCl7XG4gICAgICAgIHN1cGVyLl9pbml0KClcbiAgICAgICAgdGhpcy5fYXNzaWduUmVsKFwidGFibGVTdHlsZXMsdmlld1Byb3BzLHByZXNQcm9wc1wiLnNwbGl0KFwiLFwiKSlcbiAgICB9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgaWYodGhpcy50YWJsZVN0eWxlcyl7XG4gICAgICAgICAgICB0aGlzLnJlbmRlck5vZGUodGhpcy50YWJsZVN0eWxlcy5yb290KCkuY2hpbGRyZW4oKS5nZXQoMCksIGNyZWF0ZUVsZW1lbnQsIGlkZW50aWZ5KVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUodGhpcy5jb250ZW50KFwicFxcXFw6cHJlc2VudGF0aW9uXCIpLmdldCgwKSwgY3JlYXRlRWxlbWVudCwgaWRlbnRpZnkpXG4gICAgfVxuXG4gICAgc2xpZGUoe2lkLFwicjppZFwiOnJpZH0pe1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRSZWwocmlkKVxuICAgIH1cblxuICAgIG1hc3Rlcih7aWQsXCJyOmlkXCI6cmlkfSl7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWRlKC4uLmFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBub3Rlc01hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgaGFuZG91dE1hc3Rlcigpe1xuICAgICAgICByZXR1cm4gdGhpcy5zbGlkZSguLi5hcmd1bWVudHMpXG4gICAgfVxuXG4gICAgbWFzdGVyUGFydE9mTGF5b3V0KHdYbWxMYXlvdXRJZEluTWFzdGVyKXtcbiAgICAgICAgY29uc3QgbWFzdGVyUm9vdD10aGlzLiQod1htbExheW91dElkSW5NYXN0ZXIpLnJvb3QoKS5nZXQoMClcbiAgICAgICAgY29uc3Qge3BhcnQ6bWFzdGVyUGFydE5hbWV9PW1hc3RlclJvb3QuYXR0cmlic1xuICAgICAgICByZXR1cm4gdGhpcy5kb2MuZ2V0UmVsT2JqZWN0KG1hc3RlclBhcnROYW1lKVxuICAgIH1cblxuICAgIHRhYmxlU3R5bGUoaWQpe1xuICAgICAgICByZXR1XG4gICAgfVxuXG4gICAgc3RhdGljIGlkZW50aXRpZXM9e1xuICAgICAgICBwcmVzZW50YXRpb24od1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQoXCJwXFxcXDpwcmVzZW50YXRpb25cIilcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpoYW5kb3V0TWFzdGVySWRMc3QscFxcXFw6bm90ZXNNYXN0ZXJJZExzdCxwXFxcXDpzbGRJZExzdCxwXFxcXDpzbGRNYXN0ZXJJZExzdFwiXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qgb3JkZXJzPXtcInA6c2xkTWFzdGVySWRMc3RcIjoxLCBcInA6c2xkSWRMc3RcIjoyfVxuICAgICAgICAgICAgY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG5cbiAgICAgICAgICAgIGNvbnN0IHN6PSh7YXR0cmliczp7Y3gsY3l9fSk9Pih7d2lkdGg6b2ZmaWNlRG9jdW1lbnQuZG9jLmVtdTJQeChjeCksaGVpZ2h0Om9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgoY3kpfSlcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbW1vbihvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgc2xkU3o6c3osIG5vdGVzU3o6c3osXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCB0eXBlOlwiZG9jdW1lbnRcIixjaGlsZHJlbn1cblx0XHR9LFxuXG4gICAgICAgIHNsZE1hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpzbGRMYXlvdXRJZExzdCxwXFxcXDpjU2xkXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQubWFzdGVyKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIGNvbnN0ICRtYXN0ZXI9JChcInBcXFxcOnNsZE1hc3RlclwiKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JG1hc3Rlci5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kbWFzdGVyLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qgb3JkZXJzPXtcInA6c2xkTGF5b3V0THN0XCI6MSwgXCJwOmNTbGRcIjoyfVxuICAgICAgICAgICAgY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG5cbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIHBhcnQ6ICQucGFydCwgY2hpbGRyZW4sdHlwZTpcInNsaWRlTWFzdGVyXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xkSWQod1htbCxvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwicFxcXFw6Y1NsZFwiXG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LnNsaWRlKHdYbWwuYXR0cmlicylcbiAgICAgICAgICAgIGNvbnN0ICRzbGlkZT0kKCdwXFxcXDpzbGQnKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JHNsaWRlLnByb3BzKHtcbiAgICAgICAgICAgICAgICAuLi5jb21tb24ob2ZmaWNlRG9jdW1lbnQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcjpgOm5vdCgke2NvbnRlbnR9LGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSRzbGlkZS5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcblxuICAgICAgICAgICAgY29uc3Qgc2xpZGVQYXJ0PW9mZmljZURvY3VtZW50LmdldFJlbFBhcnQod1htbC5hdHRyaWJzW1wicjppZFwiXSlcbiAgICAgICAgICAgIGNvbnN0IGxheW91dFRhcmdldD1vZmZpY2VEb2N1bWVudC5kb2Mubm9ybWFsaXplUGF0aChzbGlkZVBhcnQuZm9sZGVyK3NsaWRlUGFydC5nZXRSZWxUYXJnZXQoXCJzbGlkZUxheW91dFwiKSlcbiAgICAgICAgICAgIGNvbnN0IGxheW91dFBhcnQ9bmV3IFBhcnQobGF5b3V0VGFyZ2V0LG9mZmljZURvY3VtZW50LmRvYylcbiAgICAgICAgICAgIGNvbnN0IG1hc3RlclRhcmdldD1vZmZpY2VEb2N1bWVudC5kb2Mubm9ybWFsaXplUGF0aChsYXlvdXRQYXJ0LmZvbGRlcitsYXlvdXRQYXJ0LmdldFJlbFRhcmdldChcInNsaWRlTWFzdGVyXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyxwYXJ0OiQucGFydCwgbGF5b3V0OmxheW91dFRhcmdldCwgbWFzdGVyOm1hc3RlclRhcmdldCwgY2hpbGRyZW4sIHR5cGU6XCJzbGlkZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIG5vdGVzTWFzdGVySWQod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC5ub3Rlc01hc3Rlcih3WG1sLmF0dHJpYnMpXG4gICAgICAgICAgICByZXR1cm4ge3BhcnQ6JC5wYXJ0LHR5cGU6XCJub3RlTWFzdGVyXCIsfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRvdXRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LmhhbmRvdXRNYXN0ZXIod1htbC5hdHRyaWJzKVxuICAgICAgICAgICAgcmV0dXJuIHtwYXJ0OiQucGFydCx0eXBlOlwiaGFuZG91dE1hc3RlclwiLCB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2xkTGF5b3V0SWQod1htbCxvZmZpY2VEb2N1bWVudCl7Ly9pbiBtYXN0ZXJcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDpjU2xkXCJcbiAgICAgICAgICAgIGNvbnN0IG1hc3Rlcj1vZmZpY2VEb2N1bWVudC4kKHdYbWwpLnBhcnQoKVxuICAgICAgICAgICAgY29uc3QgJD1uZXcgUGFydChtYXN0ZXIsb2ZmaWNlRG9jdW1lbnQuZG9jKS5nZXRSZWwod1htbC5hdHRyaWJzW1wicjppZFwiXSlcbiAgICAgICAgICAgIGNvbnN0ICRsYXlvdXQ9JChcInBcXFxcOnNsZExheW91dFwiKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JGxheW91dC5wcm9wcyh7ZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWB9KVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JGxheW91dC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcblxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyxwYXJ0OiQucGFydCwgbWFzdGVyLCBjaGlsZHJlbiwgdHlwZTpcInNsaWRlTGF5b3V0XCIsIH1cbiAgICAgICAgfSxcblxuICAgICAgICBzcFRyZWUod1htbCxvZCl7XG4gICAgICAgICAgICBjb25zdCBudkdycFNwUHI9d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJwOm52R3JwU3BQclwiKVxuICAgICAgICAgICAgY29uc3QgZ3JwU3BQcj13WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInA6Z3JwU3BQclwiKVxuICAgICAgICAgICAgY29uc3QgbW9kZWw9e3R5cGU6XCJmcmFtZVwifVxuICAgICAgICAgICAgaWYobnZHcnBTcFByKXtcbiAgICAgICAgICAgICAgICBjb25zdCB7dHlwZSwgLi4ucHJvcHN9PWRyYXdtbC5udkdycFNwUHIobnZHcnBTcFByLG9kKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwsIHByb3BzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihncnBTcFByKXtcbiAgICAgICAgICAgICAgICBjb25zdCB7dHlwZSwgLi4ucHJvcHN9PWRyYXdtbC5ncnBTcFByKGdycFNwUHIsb2QpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtb2RlbCwgcHJvcHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgcHJvcHM9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKS5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZQaWNQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcyx0eXBlOlwicGljdHVyZVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJwXFxcXDp0eEJvZHlcIlxuXHRcdFx0Y29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgY29tbW9uUHJvcHM9Y29tbW9uKG9mZmljZURvY3VtZW50KVxuICAgICAgICAgICAgY29uc3QgbmFtZXM9e3NwTG9ja3M6XCJsb2Nrc1wiLCBwaDpcInBsYWNlaG9sZGVyXCIsIC4uLmNvbW1vblByb3BzLm5hbWVzfVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uUHJvcHMsXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWAsXG4gICAgICAgICAgICAgICAgbmFtZXMsXG4gICAgICAgICAgICAgICAgcGg6KHthdHRyaWJzOnt0eXBlPVwiYm9keVwiLGlkeH19KT0+KHt0eXBlLGlkeH0pLFxuICAgICAgICAgICAgICAgIHRpZHk6KHtzcFByLCBudlNwUHI6e2NOdlByPXt9LGNOdlNwUHI9e30sbnZQcj17fX19KT0+KHsuLi5zcFByLCAuLi5jTnZQciwuLi5jTnZTcFByLC4uLm52UHJ9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgdHhCb2R5PU9mZmljZURvY3VtZW50LmlkZW50aXRpZXMudHhCb2R5KGNoaWxkcmVuWzBdLG9mZmljZURvY3VtZW50KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgY2hpbGRyZW4sIC4uLnR4Qm9keSwgdHlwZTpcInNoYXBlXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHhCb2R5KHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDpwXCJcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihcImFcXFxcOnBcIikudG9BcnJheSgpXG4gICAgICAgICAgICBjb25zdCB0ZXh0U3R5bGU9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoYVxcXFw6cCxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7bHN0U3R5bGU9e30sYm9keVByPXt9LC4uLm90aGVyc30pPT4oey4uLm90aGVycywgLi4uYm9keVByLCAuLi5sc3RTdHlsZX0pXG4gICAgICAgICAgICB9KVxuXHRcdFx0cmV0dXJuIHt0ZXh0U3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwidHhCb2R5XCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiOm5vdChhXFxcXDpwUHIsYVxcXFw6ZW5kUGFyYVJQcilcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3Qgc3R5bGU9JC5jaGlsZHJlbihcImFcXFxcOnBQclwiKS5wcm9wcyhjb21tb24ob2ZmaWNlRG9jdW1lbnQpKVxuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDplbmRQYXJhUlByXCIpLnByb3BzKGNvbW1vbihvZmZpY2VEb2N1bWVudCkpXG4gICAgICAgICAgICByZXR1cm4ge3N0eWxlOntsdmw6MCwgLi4uc3R5bGV9LCBkZWZhdWx0U3R5bGUsIGNoaWxkcmVuLCB0eXBlOlwicFwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHIod1htbCxvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBjb250ZW50PVwiOm5vdChhXFxcXDpyUHIpXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlPSQuY2hpbGRyZW4oXCJhXFxcXDpyUHJcIikucHJvcHMoey4uLmNvbW1vbihvZmZpY2VEb2N1bWVudCl9KVxuICAgICAgICAgICAgcmV0dXJuIHtzdHlsZSwgY2hpbGRyZW4sIHR5cGU6XCJyXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hhcnQod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOiBcImNoYXJ0XCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVsSWRzKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcImRpYWdyYW1cIn1cbiAgICAgICAgfSxcblxuICAgICAgICBncmFwaGljRnJhbWUod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOmdyYXBoaWNcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgLi4uY29tbW9uKG9mZmljZURvY3VtZW50KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXI6YDpub3QoJHtjb250ZW50fSxhXFxcXDpleHRMc3QpYCxcbiAgICAgICAgICAgICAgICB0aWR5Oih7c3BQciwgbnZHcmFwaGljRnJhbWVQcjp7Y052UHI9e30sY052U3BQcj17fSxudlByPXt9fSwgLi4ub3RoZXJzfSk9Pih7Li4uc3BQciwgLi4uY052UHIsLi4uY052U3BQciwuLi5udlByLC4uLm90aGVyc30pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHsuLi5wcm9wcywgY2hpbGRyZW4sIHR5cGU6XCJncmFwaGljRnJhbWVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0Ymwod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgY29udGVudD1cImFcXFxcOnRyXCJcbiAgICAgICAgICAgIGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQuJCh3WG1sKVxuICAgICAgICAgICAgY29uc3QgY2hpbGRyZW49JC5jaGlsZHJlbihjb250ZW50KS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbW1vbihvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sIGFcXFxcOmV4dExzdClgLFxuICAgICAgICAgICAgICAgIHRhYmxlU3R5bGVJZDooe2NoaWxkcmVufSk9PmNoaWxkcmVuLmZpbmQoYT0+YS5kYXRhKS5kYXRhLFxuICAgICAgICAgICAgICAgIHRibEdyaWQ6KHtjaGlsZHJlbn0pPT5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lKS5yZWR1Y2UoKGNvbHMse2F0dHJpYnM6e3d9fSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29scy5wdXNoKG9mZmljZURvY3VtZW50LmRvYy5lbXUyUHgodykpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xzXG4gICAgICAgICAgICAgICAgfSxbXSksXG4gICAgICAgICAgICAgICAgdGlkeTooe3RibFByLCB0YmxHcmlkOmNvbHMsIC4uLm90aGVyc30pPT4oey4uLnRibFByLCBjb2xzLCAuLi5vdGhlcnN9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuLCB0eXBlOlwidGJsXCJ9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGJsU3R5bGUod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBwcm9wcz0kLnByb3BzKGNvbW1vbihvZmZpY2VEb2N1bWVudCkpXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCB0eXBlOlwidGJsU3R5bGVcIn1cbiAgICAgICAgfSxcblxuICAgICAgICB0cih3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCAkPW9mZmljZURvY3VtZW50LiQod1htbClcbiAgICAgICAgICAgIGNvbnN0IHByb3BzPSQucHJvcHMoe1xuICAgICAgICAgICAgICAgIC4uLmNvbW1vbihvZmZpY2VEb2N1bWVudCksXG4gICAgICAgICAgICAgICAgZmlsdGVyOlwiOm5vdCgqKVwiLFxuICAgICAgICAgICAgICAgIGg6dj0+b2ZmaWNlRG9jdW1lbnQuZG9jLmVtdTJQeCh2KSxcbiAgICAgICAgICAgICAgICBuYW1lczp7aDpcImhlaWdodFwifVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiB7Li4ucHJvcHMsIGNoaWxkcmVuOndYbWwuY2hpbGRyZW4sIHR5cGU6XCJ0clwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRjKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRlbnQ9XCJhXFxcXDp0eEJvZHlcIlxuICAgICAgICAgICAgY29uc3QgJD1vZmZpY2VEb2N1bWVudC4kKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBjaGlsZHJlbj0kLmNoaWxkcmVuKGNvbnRlbnQpLnRvQXJyYXkoKVxuICAgICAgICAgICAgY29uc3QgcHJvcHM9JC5wcm9wcyh7XG4gICAgICAgICAgICAgICAgZmlsdGVyOmA6bm90KCR7Y29udGVudH0sYVxcXFw6ZXh0THN0KWBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gey4uLnByb3BzLCB0eXBlOlwidGNcIiwgY2hpbGRyZW59XG4gICAgICAgIH1cbiAgICB9XG59XG5jb25zdCBjb21tb249b2Q9Pih7XG4gICAgZmlsdGVyOlwiOm5vdChhXFxcXDpleHRMc3QpXCIsXG4gICAgLi4uc2FtZShcImxhdGluLGVhLGNzXCIuc3BsaXQoXCIsXCIpLCh7YXR0cmliczp7dHlwZWZhY2U9XCJcIn19KT0+b2QudGhlbWUuZm9udCh0eXBlZmFjZSkpLFxuXG4gICAgLi4uc2FtZShcImx1bU1vZCxsdW1PZmYsdGludFwiLnNwbGl0KFwiLFwiKSwoe2F0dHJpYnM6e3ZhbH19KT0+cGFyc2VJbnQodmFsKS8xMDAwMDApLFxuICAgIHRpZHlfc2NoZW1lQ2xyOih7dmFsLGx1bU1vZCxsdW1PZmYsdGludH0pPT5vZC5kb2MuYXNDb2xvcihvZC50aGVtZS5jb2xvcih2YWwpLHtsdW1Nb2QsbHVtT2ZmLHRpbnR9KSxcbiAgICB0aWR5X3NyZ2JDbHI6KHt2YWwsbHVtTW9kLGx1bU9mZix0aW50fSk9Pm9kLmRvYy5hc0NvbG9yKHZhbCx7bHVtTW9kLGx1bU9mZix0aW50fSksXG4gICAgc3lzQ2xyOih7YXR0cmliczp7dmFsfX0pPT52YWwsXG4gICAgdGlkeV9zb2xpZEZpbGw6KHtjb2xvcn0pPT5jb2xvcixcblxuICAgIGJsaXA6bj0+e1xuICAgICAgICBjb25zdCB7YXR0cmliczp7XCJyOmVtYmVkXCI6ZW1iZWQsIFwicjpsaW5rXCI6dXJsfX09blxuICAgICAgICBpZih1cmwpXG4gICAgICAgICAgICByZXR1cm4ge3VybH1cbiAgICAgICAgY29uc3QgcGFydD1vZC4kKG4pLnBhcnQoKVxuICAgICAgICByZXR1cm4gbmV3IFBhcnQocGFydCxvZC5kb2MpLmdldFJlbChlbWJlZClcbiAgICB9LFxuXG4gICAgcHJzdEdlb20oeCl7XG5cdFx0cmV0dXJuIHguYXR0cmlicy5wcnN0XG5cdH0sXG5cdHBhdGhMc3Qoe2NoaWxkcmVufSl7XG5cdFx0Y29uc3QgcHg9eD0+b2QuZG9jLmVtdTJQeCh4KVxuICAgICAgICByZXR1cm4gY2hpbGRyZW4uZmlsdGVyKGE9PmEubmFtZT09XCJhOnBhdGhcIilcbiAgICAgICAgICAgIC5yZWR1Y2UoKGQscGF0aCk9PntcbiAgICAgICAgICAgICAgICBwYXRoLmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIC5mb3JFYWNoKGE9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChhLm5hbWUuc3BsaXQoXCI6XCIpLnBvcCgpKXtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ21vdmVUbyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTSAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0Y2FzZSAnbG5Ubyc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnTCAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cmlicy54KSsnICcrcHgoYS5jaGlsZHJlblswXS5hdHRyaWJzLnkpKVxuICAgICAgICAgICAgXHRcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2N1YmljQmV6VG8nOlxuICAgICAgICAgICAgXHRcdFx0XHRkLnB1c2goJ0wgJytweChhLmNoaWxkcmVuWzBdLmF0dHIoJ3gnKSkrJyAnK3B4KGEuY2hpbGRyZW5bMF0uYXR0cigneScpKSlcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKCdRICcrcHgoYS5jaGlsZHJlblsxXS5hdHRyKCd4JykpKycgJytweChhLmNoaWxkcmVuWzFdLmF0dHIoJ3knKSlcbiAgICAgICAgICAgIFx0XHRcdFx0XHQrJyAnK3B4KGEuY2hpbGRyZW5bMl0uYXR0cigneCcpKSsnICcrcHgoYS5jaGlsZHJlblsyXS5hdHRyKCd5JykpKVxuICAgICAgICAgICAgXHRcdFx0YnJlYWtcbiAgICAgICAgICAgIFx0XHRcdGNhc2UgJ2FyY1RvJzpcbiAgICAgICAgICAgIFx0XHRcdFx0ZC5wdXNoKGBBYClcbiAgICAgICAgICAgIFx0XHRcdGJyZWFrXG4gICAgICAgICAgICBcdFx0XHRjYXNlICdjbG9zZSc6XG4gICAgICAgICAgICBcdFx0XHRcdGQucHVzaCgnWicpXG4gICAgICAgICAgICBcdFx0XHRicmVha1xuICAgICAgICAgICAgXHRcdFx0fVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHJldHVybiBkXG4gICAgICAgICAgICB9LFtdKS5qb2luKFwiIFwiKVxuXHR9LFxuICAgIHRpZHlfY3VzdEdlb206KHtwYXRoTHN0fSk9PnBhdGhMc3QsXG5cbiAgICBsdmw6dj0+cGFyc2VJbnQodiksXG4gICAgc3BjUHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIHRpZHlfc3BjQWZ0Oih7c3BjUHRzOmF9KT0+YSxcbiAgICB0aWR5X3NwY0JlZjooe3NwY1B0czphfSk9PmEsXG5cbiAgICBidUZvbnQ6KHthdHRyaWJzOnt0eXBlZmFjZX19KT0+dHlwZWZhY2UsXG4gICAgYnVDaGFyOih7YXR0cmliczp7Y2hhcn19KT0+Y2hhcixcbiAgICBidVN6UHRzOih7YXR0cmliczp7dmFsfX0pPT5vZC5kb2MucHQyUHgocGFyc2VJbnQodmFsKS8xMDApLFxuICAgIGJ1U3pQY3Q6KHthdHRyaWJzOnt2YWx9fSk9PnBhcnNlSW50KHZhbCkvMTAwMC8xMDAsXG4gICAgYnVBdXRvTnVtOih7YXR0cmlic30pPT4oey4uLmF0dHJpYnN9KSxcbiAgICB0aWR5X2J1Q2xyOih7Y29sb3J9KT0+Y29sb3IsXG5cbiAgICBpbmRlbnQ6dj0+b2QuZG9jLmVtdTJQeCh2KSxcbiAgICBtYXJMOnY9Pm9kLmRvYy5lbXUyUHgodiksXG5cbiAgICBleHQ6KHthdHRyaWJzOntjeCxjeX19KT0+KHt3aWR0aDpvZC5kb2MuZW11MlB4KGN4KSxoZWlnaHQ6b2QuZG9jLmVtdTJQeChjeSl9KSxcbiAgICBvZmY6KHthdHRyaWJzOnt4LHl9fSk9Pih7eDpvZC5kb2MuZW11MlB4KHgpLHk6b2QuZG9jLmVtdTJQeCh5KX0pLFxuICAgIHRpZHlfeGZybTooe2V4dD17fSxvZmY9e30sIC4uLnRyYW5zZm9ybX0pPT4oey4uLmV4dCwgLi4ub2ZmLCAuLi50cmFuc2Zvcm19KSxcblxuICAgIC4uLnNhbWUoXCJsbixsbkIsbG5SLGxuTCxsblQsbG5UbFRvQnIsbG5CbFRvVHJcIi5zcGxpdChcIixcIikubWFwKGE9Pid0aWR5XycrYSksKHt3LC4uLnByb3BzfSk9Pih7Li4ucHJvcHMsIHc6b2QuZG9jLmVtdTJQeCh3KX0pKSxcbiAgICAuLi5zYW1lKFwibGVmdCxyaWdodCx0b3AsYm90dG9tXCIuc3BsaXQoXCIsXCIpLm1hcChhPT4ndGlkeV8nK2EpLCh7bG59KT0+bG4pLFxuICAgIHRpZHlfdGNUeFN0eWxlOih7Y29sb3IsLi4ucHJvcHN9KT0+KHsuLi5wcm9wcywgc29saWRGaWxsOmNvbG9yfSksXG4gICAgbmFtZXM6e1xuICAgICAgICBzY2hlbWVDbHI6XCJjb2xvclwiLCBzcmdiQ2xyOlwiY29sb3JcIiwgc3lzQ2xyOlwiY29sb3JcIixcbiAgICAgICAgcHJzdEdlb206XCJnZW9tZXRyeVwiLCBjdXN0R2VvbTpcImdlb21ldHJ5XCIsXG4gICAgICAgIGxuQjpcImJvdHRvbVwiLCBsblI6XCJyaWdodFwiLCBsbkw6XCJsZWZ0XCIsIGxuVDpcInRvcFwiLFxuICAgIH1cbn0pXG5cbmNvbnN0IHNhbWU9KGtleXMsZngpPT5rZXlzLnJlZHVjZSgoZnMsIGspPT4oZnNba109ZngsIGZzKSx7fSlcbiJdfQ==