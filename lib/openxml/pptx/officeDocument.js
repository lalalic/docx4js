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

var _class = function (_Base) {
    _inherits(_class, _Base);

    function _class() {
        _classCallCheck(this, _class);

        return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
        key: "_init",
        value: function _init() {
            var _this2 = this;

            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).call(this);
            this.content("p\\:sldMasterId,p\\:sldId,p\\:notesMasterId,p\\:handoutMasterId").each(function (i, a) {
                return _this2.linkRel(a);
            }).filter("p\\:sldMasterId").each(function (i, a) {
                var master = _this2.getRelPart(a.attribs["r:id"]);
                master.content("p\\:sldLayoutId").each(function (i, a) {
                    return _this2.linkRel.call(master, a);
                });
            });
        }
    }, {
        key: "render",
        value: function render(createElement) {
            var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

            return this.renderNode(this.content("p\\:presentation").get(0), createElement, identify);
        }
    }, {
        key: "linkRel",
        value: function linkRel(_ref, context) {
            var _ref$attribs = _ref.attribs,
                id = _ref$attribs.id,
                rid = _ref$attribs["r:id"];

            var target = this.rels("Relationship[Id=\"" + rid + "\"]").attr("Target");
            var $ = this.getRelObject(target);
            Object.assign($.root()[0].attribs, { id: id, rid: rid, part: target });
            if (context) {
                var node = $(context)[0];
                var attribs = Object.keys(node.attribs).filter(function (a) {
                    return a.startsWith("xmlns");
                }).reduce(function (a, k) {
                    return delete a[k], a;
                }, _extends({}, node.attribs));
                return _extends({ children: node.children }, attribs, { part: target });
            }
            return {};
        }
    }, {
        key: "node",
        value: function node(wXml) {
            return this.getRelObject(root(wXml).attribs.part.replace("../", ""))(wXml);
        }
    }]);

    return _class;
}(_officeDocument2.default);

_class.identities = {
    presentation: function presentation(wXml, officeDocument) {
        var $ = officeDocument.content("p\\:presentation");
        var children = $.children().not("p\\:sldSz, p\\:notesSz").toArray();
        var orders = { "p:embeddedFontLst": 1, "p:defaultTextStyle": 3, "p:sldMasterIdLst": 5, "p:sldIdLst": 7 };
        children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });
        var model = { type: "document", children: children };

        var normalize = function normalize(_ref2) {
            var _ref2$cx = _ref2.cx,
                cx = _ref2$cx === undefined ? 0 : _ref2$cx,
                _ref2$cy = _ref2.cy,
                cy = _ref2$cy === undefined ? 0 : _ref2$cy,
                attr = _objectWithoutProperties(_ref2, ["cx", "cy"]);

            return _extends({}, attr, { width: officeDocument.doc.dxa2Px(cx), height: officeDocument.doc.dxa2Px(cy) });
        };
        var size = ($.find("p\\:sldSz").get(0) || {}).attribs;
        var noteSize = ($.find("p\\:notesSz").get(0) || {}).attribs;

        if (size) model.size = normalize(size);

        if (noteSize) model.noteSize = normalize(noteSize);

        return model;
    },
    sldMasterId: function sldMasterId(wXml, officeDocument) {
        var model = _extends({}, officeDocument.linkRel(wXml, "p\\:sldMaster"), { type: "slideMaster" });
        var orders = { "p:clrMap": 1, "p:sldLayoutLst": 100, "p:cSld": 101 };
        model.children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });
        return model;
    },
    sldId: function sldId(wXml, officeDocument) {
        var slidePart = officeDocument.getRelPart(wXml.attribs["r:id"]);
        var layoutTarget = officeDocument.doc.normalizePath(slidePart.folder + slidePart.getRelTarget("slideLayout"));
        var model = _extends({}, officeDocument.linkRel(wXml, "p\\:sld"), { type: "slide", layout: layoutTarget });
        var orders = { "p:clrMapOvr": 1, "p:cSld": 101 };
        model.children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });

        return model;
    },
    notesMasterId: function notesMasterId(wXml, officeDocument) {
        return _extends({}, officeDocument.linkRel(wXml, "p\\:notesMaster"), { type: "noteMaster" });
    },
    handoutMasterId: function handoutMasterId(wXml, officeDocument) {
        return _extends({}, officeDocument.linkRel(wXml, "p\\:handoutMaster"), { type: "handoutMaster" });
    },
    sldLayoutId: function sldLayoutId(wXml, officeDocument) {
        var rid = root(wXml).attribs.rid;

        var master = officeDocument.getRelPart(rid);
        var attribs = officeDocument.linkRel.call(master, wXml, "p\\:sldLayout");
        var model = _extends({}, attribs, { type: "slideLayout", master: master.name });

        var orders = { "p:clrMapOvr": 1, "p:cSld": 101 };
        model.children.sort(function (a, b) {
            return (orders[a.name] || 99) - (orders[b.name] || 99);
        });
        return model;
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
        var node = officeDocument.node(wXml);
        var blip = node.children("a\\:blip");
        var rid = blip.attr('r:embed') || blip.attr('r:link');
        return _extends({ type: "picture" }, part.getRel(rid));
    },
    sp: function sp(wXml, officeDocument) {
        var $ = officeDocument.node(wXml);
        var nvSpPr = $.children("p\\:nvSpPr")[0];
        var spPr = $.children("p\\:spPr")[0];
        return _extends({}, nvSpPr ? _drawml2.default.nvSpPr(nvSpPr, officeDocument) : {}, spPr ? _drawml2.default.spPr(spPr, officeDocument) : {}, {
            type: "shape",
            children: $.children("p\\:txBody").toArray()
        });
    },
    txBody: function txBody(wXml, officeDocument) {
        var model = { type: "textBox", children: wXml.children.filter(function (a) {
                return a.name && a.name.endsWith(":p");
            }) };
        var pr = wXml.children.find(function (a) {
            return a.name && a.name.endsWith(":bodyPr");
        });
        if (pr) Object.assign(model, pr.attribs);
        var listStyle = wXml.children.find(function (a) {
            return a.name && a.name.endsWith(":lstStyle");
        });
        if (listStyle) model.list = _drawml2.default.lstStyle(listStyle, officeDocument);
        return model;
    },
    p: function p(_ref3, od) {
        var children = _ref3.children,
            attribs = _ref3.attribs;

        var model = { type: "p", children: children.filter(function (a) {
                return a.name && !a.name.endsWith(":pPr");
            }) };
        var pr = children.find(function (a) {
            return a.name && a.name.endsWith(":pPr");
        });
        if (pr) {
            Object.assign(model, _drawml2.default.pPr(pr, od));
        }
        return model;
    },
    r: function r(_ref4, od) {
        var children = _ref4.children,
            attribs = _ref4.attribs;

        var model = { type: "r", children: children.filter(function (a) {
                return a.name && !a.name.endsWith(":rPr");
            }) };
        var pr = children.find(function (a) {
            return a.name && a.name.endsWith(":rPr");
        });
        if (pr) {
            Object.assign(model, _drawml2.default.rPr(pr, od));
        }
        return model;
    },
    graphicFrame: function graphicFrame(wXml, officeDocument) {
        return { type: "graphic", children: officeDocument.node(wXml).find("c\\:chart, dgm\\:relIds, a\\:tbl").toArray() };
    },
    chart: function chart(wXml, officeDocument) {
        return { type: "chart" };
    },
    relIds: function relIds(wXml, officeDocument) {
        return { type: "diagram" };
    },
    tbl: function tbl(wXml, officeDocument) {
        return { type: "table" };
    }
};
exports.default = _class;


var root = function root(a) {
    return a.root || root(a.parent);
};
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL3BwdHgvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiY29udGVudCIsImVhY2giLCJpIiwiYSIsImxpbmtSZWwiLCJmaWx0ZXIiLCJtYXN0ZXIiLCJnZXRSZWxQYXJ0IiwiYXR0cmlicyIsImNhbGwiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGV4dCIsImlkIiwicmlkIiwidGFyZ2V0IiwicmVscyIsImF0dHIiLCIkIiwiZ2V0UmVsT2JqZWN0IiwiT2JqZWN0IiwiYXNzaWduIiwicm9vdCIsInBhcnQiLCJub2RlIiwia2V5cyIsInN0YXJ0c1dpdGgiLCJyZWR1Y2UiLCJrIiwiY2hpbGRyZW4iLCJ3WG1sIiwicmVwbGFjZSIsImlkZW50aXRpZXMiLCJwcmVzZW50YXRpb24iLCJvZmZpY2VEb2N1bWVudCIsIm5vdCIsInRvQXJyYXkiLCJvcmRlcnMiLCJzb3J0IiwiYiIsIm5hbWUiLCJtb2RlbCIsInR5cGUiLCJub3JtYWxpemUiLCJjeCIsImN5Iiwid2lkdGgiLCJkb2MiLCJkeGEyUHgiLCJoZWlnaHQiLCJzaXplIiwiZmluZCIsIm5vdGVTaXplIiwic2xkTWFzdGVySWQiLCJzbGRJZCIsInNsaWRlUGFydCIsImxheW91dFRhcmdldCIsIm5vcm1hbGl6ZVBhdGgiLCJmb2xkZXIiLCJnZXRSZWxUYXJnZXQiLCJsYXlvdXQiLCJub3Rlc01hc3RlcklkIiwiaGFuZG91dE1hc3RlcklkIiwic2xkTGF5b3V0SWQiLCJzcFRyZWUiLCJvZCIsIm52R3JwU3BQciIsImdycFNwUHIiLCJwcm9wcyIsInBpYyIsImJsaXAiLCJnZXRSZWwiLCJzcCIsIm52U3BQciIsInNwUHIiLCJ0eEJvZHkiLCJlbmRzV2l0aCIsInByIiwibGlzdFN0eWxlIiwibGlzdCIsImxzdFN0eWxlIiwicCIsInBQciIsInIiLCJyUHIiLCJncmFwaGljRnJhbWUiLCJj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QixFQUFFMEYsTUFBUCxDQUFiO0FBQUEsQ0FBWCIsImZpbGUiOiJvZmZpY2VEb2N1bWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlIGZyb20gXCIuLi9vZmZpY2VEb2N1bWVudFwiXG5pbXBvcnQgUGFydCBmcm9tIFwiLi4vcGFydFwiXG5pbXBvcnQgZHJhd21sIGZyb20gXCIuLi9kcmF3bWxcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2V7XG4gICAgX2luaXQoKXtcblx0XHRzdXBlci5faW5pdCgpXG4gICAgICAgIHRoaXMuY29udGVudChcInBcXFxcOnNsZE1hc3RlcklkLHBcXFxcOnNsZElkLHBcXFxcOm5vdGVzTWFzdGVySWQscFxcXFw6aGFuZG91dE1hc3RlcklkXCIpXG4gICAgICAgICAgICAuZWFjaCgoaSxhKT0+dGhpcy5saW5rUmVsKGEpKVxuICAgICAgICAgICAgLmZpbHRlcihcInBcXFxcOnNsZE1hc3RlcklkXCIpXG4gICAgICAgICAgICAuZWFjaCgoaSxhKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IG1hc3Rlcj10aGlzLmdldFJlbFBhcnQoYS5hdHRyaWJzW1wicjppZFwiXSlcbiAgICAgICAgICAgICAgICBtYXN0ZXIuY29udGVudChcInBcXFxcOnNsZExheW91dElkXCIpXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKChpLGEpPT50aGlzLmxpbmtSZWwuY2FsbChtYXN0ZXIsYSkpXG4gICAgICAgICAgICB9KVxuXHR9XG5cbiAgICByZW5kZXIoY3JlYXRlRWxlbWVudCwgaWRlbnRpZnk9dGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpKXtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyTm9kZSh0aGlzLmNvbnRlbnQoXCJwXFxcXDpwcmVzZW50YXRpb25cIikuZ2V0KDApLCBjcmVhdGVFbGVtZW50LCBpZGVudGlmeSlcbiAgICB9XG5cbiAgICBsaW5rUmVsKHthdHRyaWJzOntpZCxcInI6aWRcIjpyaWR9fSxjb250ZXh0KXtcbiAgICAgICAgY29uc3QgdGFyZ2V0PXRoaXMucmVscyhgUmVsYXRpb25zaGlwW0lkPVwiJHtyaWR9XCJdYCkuYXR0cihcIlRhcmdldFwiKVxuICAgICAgICBjb25zdCAkPXRoaXMuZ2V0UmVsT2JqZWN0KHRhcmdldClcbiAgICAgICAgT2JqZWN0LmFzc2lnbigkLnJvb3QoKVswXS5hdHRyaWJzLHtpZCxyaWQscGFydDp0YXJnZXR9KVxuICAgICAgICBpZihjb250ZXh0KXtcbiAgICAgICAgICAgIGNvbnN0IG5vZGU9JChjb250ZXh0KVswXVxuICAgICAgICAgICAgY29uc3QgYXR0cmlicz1PYmplY3Qua2V5cyhub2RlLmF0dHJpYnMpLmZpbHRlcihhPT5hLnN0YXJ0c1dpdGgoXCJ4bWxuc1wiKSkucmVkdWNlKChhLGspPT4oZGVsZXRlIGFba10sIGEpLHsuLi5ub2RlLmF0dHJpYnN9KVxuICAgICAgICAgICAgcmV0dXJuIHtjaGlsZHJlbjpub2RlLmNoaWxkcmVuLCAuLi5hdHRyaWJzLCBwYXJ0OnRhcmdldH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge31cbiAgICB9XG5cbiAgICBub2RlKHdYbWwpe1xuXHRcdHJldHVybiB0aGlzLmdldFJlbE9iamVjdChyb290KHdYbWwpLmF0dHJpYnMucGFydC5yZXBsYWNlKFwiLi4vXCIsXCJcIikpKHdYbWwpXG4gICAgfVxuXG4gICAgc3RhdGljIGlkZW50aXRpZXM9e1xuICAgICAgICBwcmVzZW50YXRpb24od1htbCxvZmZpY2VEb2N1bWVudCl7XG5cdFx0XHRjb25zdCAkPW9mZmljZURvY3VtZW50LmNvbnRlbnQoXCJwXFxcXDpwcmVzZW50YXRpb25cIilcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuPSQuY2hpbGRyZW4oKS5ub3QoXCJwXFxcXDpzbGRTeiwgcFxcXFw6bm90ZXNTelwiKS50b0FycmF5KClcbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOmVtYmVkZGVkRm9udExzdFwiOjEsXCJwOmRlZmF1bHRUZXh0U3R5bGVcIjozLFwicDpzbGRNYXN0ZXJJZExzdFwiOjUsIFwicDpzbGRJZExzdFwiOjcsfVxuICAgICAgICAgICAgY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG4gICAgICAgICAgICBjb25zdCBtb2RlbD17dHlwZTpcImRvY3VtZW50XCIsY2hpbGRyZW59XG5cbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZT0oe2N4PTAsIGN5PTAsIC4uLmF0dHJ9KT0+KHsuLi5hdHRyLCB3aWR0aDpvZmZpY2VEb2N1bWVudC5kb2MuZHhhMlB4KGN4KSxoZWlnaHQ6b2ZmaWNlRG9jdW1lbnQuZG9jLmR4YTJQeChjeSl9KVxuICAgICAgICAgICAgY29uc3Qgc2l6ZT0oJC5maW5kKFwicFxcXFw6c2xkU3pcIikuZ2V0KDApfHx7fSkuYXR0cmlic1xuICAgICAgICAgICAgY29uc3Qgbm90ZVNpemU9KCQuZmluZChcInBcXFxcOm5vdGVzU3pcIikuZ2V0KDApfHx7fSkuYXR0cmlic1xuXG4gICAgICAgICAgICBpZihzaXplKVxuICAgICAgICAgICAgICAgIG1vZGVsLnNpemU9bm9ybWFsaXplKHNpemUpXG5cbiAgICAgICAgICAgIGlmKG5vdGVTaXplKVxuICAgICAgICAgICAgICAgIG1vZGVsLm5vdGVTaXplPW5vcm1hbGl6ZShub3RlU2l6ZSlcblxuXHRcdFx0cmV0dXJuIG1vZGVsXG5cdFx0fSxcblxuICAgICAgICBzbGRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBtb2RlbD17Li4ub2ZmaWNlRG9jdW1lbnQubGlua1JlbCh3WG1sLFwicFxcXFw6c2xkTWFzdGVyXCIpLHR5cGU6XCJzbGlkZU1hc3RlclwiLH1cbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOmNsck1hcFwiOjEsIFwicDpzbGRMYXlvdXRMc3RcIjoxMDAsIFwicDpjU2xkXCI6MTAxfVxuICAgICAgICAgICAgbW9kZWwuY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBzbGRJZCh3WG1sLG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIGNvbnN0IHNsaWRlUGFydD1vZmZpY2VEb2N1bWVudC5nZXRSZWxQYXJ0KHdYbWwuYXR0cmlic1tcInI6aWRcIl0pXG4gICAgICAgICAgICBjb25zdCBsYXlvdXRUYXJnZXQ9b2ZmaWNlRG9jdW1lbnQuZG9jLm5vcm1hbGl6ZVBhdGgoc2xpZGVQYXJ0LmZvbGRlcitzbGlkZVBhcnQuZ2V0UmVsVGFyZ2V0KFwic2xpZGVMYXlvdXRcIikpXG4gICAgICAgICAgICBjb25zdCBtb2RlbD17Li4ub2ZmaWNlRG9jdW1lbnQubGlua1JlbCh3WG1sLFwicFxcXFw6c2xkXCIpLHR5cGU6XCJzbGlkZVwiLGxheW91dDpsYXlvdXRUYXJnZXR9XG4gICAgICAgICAgICBjb25zdCBvcmRlcnM9e1wicDpjbHJNYXBPdnJcIjoxLCBcInA6Y1NsZFwiOjEwMX1cbiAgICAgICAgICAgIG1vZGVsLmNoaWxkcmVuLnNvcnQoKGEsYik9PihvcmRlcnNbYS5uYW1lXXx8OTkpLShvcmRlcnNbYi5uYW1lXXx8OTkpKVxuXG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBub3Rlc01hc3RlcklkKHdYbWwsIG9mZmljZURvY3VtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLm9mZmljZURvY3VtZW50LmxpbmtSZWwod1htbCxcInBcXFxcOm5vdGVzTWFzdGVyXCIpLHR5cGU6XCJub3RlTWFzdGVyXCIsfVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRvdXRNYXN0ZXJJZCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4gey4uLm9mZmljZURvY3VtZW50LmxpbmtSZWwod1htbCxcInBcXFxcOmhhbmRvdXRNYXN0ZXJcIiksdHlwZTpcImhhbmRvdXRNYXN0ZXJcIiwgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNsZExheW91dElkKHdYbWwsb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3Qge3JpZH09cm9vdCh3WG1sKS5hdHRyaWJzXG4gICAgICAgICAgICBjb25zdCBtYXN0ZXI9b2ZmaWNlRG9jdW1lbnQuZ2V0UmVsUGFydChyaWQpXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJzPW9mZmljZURvY3VtZW50LmxpbmtSZWwuY2FsbChtYXN0ZXIsIHdYbWwsXCJwXFxcXDpzbGRMYXlvdXRcIilcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsPXsuLi5hdHRyaWJzLHR5cGU6XCJzbGlkZUxheW91dFwiLCBtYXN0ZXI6bWFzdGVyLm5hbWV9XG5cbiAgICAgICAgICAgIGNvbnN0IG9yZGVycz17XCJwOmNsck1hcE92clwiOjEsIFwicDpjU2xkXCI6MTAxfVxuICAgICAgICAgICAgbW9kZWwuY2hpbGRyZW4uc29ydCgoYSxiKT0+KG9yZGVyc1thLm5hbWVdfHw5OSktKG9yZGVyc1tiLm5hbWVdfHw5OSkpXG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBzcFRyZWUod1htbCxvZCl7XG4gICAgICAgICAgICBjb25zdCBudkdycFNwUHI9d1htbC5jaGlsZHJlbi5maW5kKGE9PmEubmFtZT09XCJwOm52R3JwU3BQclwiKVxuICAgICAgICAgICAgY29uc3QgZ3JwU3BQcj13WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lPT1cInA6Z3JwU3BQclwiKVxuICAgICAgICAgICAgY29uc3QgbW9kZWw9e3R5cGU6XCJmcmFtZVwifVxuICAgICAgICAgICAgaWYobnZHcnBTcFByKXtcbiAgICAgICAgICAgICAgICBjb25zdCB7dHlwZSwgLi4ucHJvcHN9PWRyYXdtbC5udkdycFNwUHIobnZHcnBTcFByLG9kKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwsIHByb3BzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihncnBTcFByKXtcbiAgICAgICAgICAgICAgICBjb25zdCB7dHlwZSwgLi4ucHJvcHN9PWRyYXdtbC5ncnBTcFByKGdycFNwUHIsb2QpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihtb2RlbCwgcHJvcHMpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBwaWMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgY29uc3Qgbm9kZT1vZmZpY2VEb2N1bWVudC5ub2RlKHdYbWwpXG4gICAgICAgICAgICBjb25zdCBibGlwPW5vZGUuY2hpbGRyZW4oXCJhXFxcXDpibGlwXCIpXG4gICAgICAgICAgICBjb25zdCByaWQ9YmxpcC5hdHRyKCdyOmVtYmVkJyl8fGJsaXAuYXR0cigncjpsaW5rJylcbiAgICAgICAgICAgIHJldHVybiB7dHlwZTpcInBpY3R1cmVcIiwuLi5wYXJ0LmdldFJlbChyaWQpfVxuICAgICAgICB9LFxuXG4gICAgICAgIHNwKHdYbWwsIG9mZmljZURvY3VtZW50KXtcblx0XHRcdGNvbnN0ICQ9b2ZmaWNlRG9jdW1lbnQubm9kZSh3WG1sKVxuICAgICAgICAgICAgY29uc3QgbnZTcFByPSQuY2hpbGRyZW4oXCJwXFxcXDpudlNwUHJcIilbMF1cbiAgICAgICAgICAgIGNvbnN0IHNwUHI9JC5jaGlsZHJlbihcInBcXFxcOnNwUHJcIilbMF1cblx0XHRcdHJldHVybiB7XG4gICAgICAgICAgICAgICAgLi4uKG52U3BQciA/IGRyYXdtbC5udlNwUHIobnZTcFByLCBvZmZpY2VEb2N1bWVudCkgOiB7fSksXG4gICAgICAgICAgICAgICAgLi4uKHNwUHIgPyBkcmF3bWwuc3BQcihzcFByLCBvZmZpY2VEb2N1bWVudCkgOiB7fSksXG4gICAgICAgICAgICAgICAgdHlwZTpcInNoYXBlXCIsXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46JC5jaGlsZHJlbihcInBcXFxcOnR4Qm9keVwiKS50b0FycmF5KClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB0eEJvZHkod1htbCxvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICBjb25zdCBtb2RlbD17dHlwZTpcInRleHRCb3hcIiwgY2hpbGRyZW46d1htbC5jaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lICYmIGEubmFtZS5lbmRzV2l0aChcIjpwXCIpKX1cbiAgICAgICAgICAgIGNvbnN0IHByPXdYbWwuY2hpbGRyZW4uZmluZChhPT5hLm5hbWUgJiYgYS5uYW1lLmVuZHNXaXRoKFwiOmJvZHlQclwiKSlcbiAgICAgICAgICAgIGlmKHByKVxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwscHIuYXR0cmlicylcbiAgICAgICAgICAgIGNvbnN0IGxpc3RTdHlsZT13WG1sLmNoaWxkcmVuLmZpbmQoYT0+YS5uYW1lICYmIGEubmFtZS5lbmRzV2l0aChcIjpsc3RTdHlsZVwiKSlcbiAgICAgICAgICAgIGlmKGxpc3RTdHlsZSlcbiAgICAgICAgICAgICAgICBtb2RlbC5saXN0PWRyYXdtbC5sc3RTdHlsZShsaXN0U3R5bGUsb2ZmaWNlRG9jdW1lbnQpXG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICBwKHtjaGlsZHJlbiwgYXR0cmlic30sIG9kKXtcbiAgICAgICAgICAgIGNvbnN0IG1vZGVsPXt0eXBlOlwicFwiLCBjaGlsZHJlbjpjaGlsZHJlbi5maWx0ZXIoYT0+YS5uYW1lICYmICFhLm5hbWUuZW5kc1dpdGgoXCI6cFByXCIpKSwgfVxuICAgICAgICAgICAgY29uc3QgcHI9Y2hpbGRyZW4uZmluZChhPT5hLm5hbWUgJiYgYS5uYW1lLmVuZHNXaXRoKFwiOnBQclwiKSlcbiAgICAgICAgICAgIGlmKHByKXtcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG1vZGVsLCBkcmF3bWwucFByKHByLCBvZCkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbW9kZWxcbiAgICAgICAgfSxcblxuICAgICAgICByKHtjaGlsZHJlbiwgYXR0cmlic30sb2Qpe1xuICAgICAgICAgICAgY29uc3QgbW9kZWw9e3R5cGU6XCJyXCIsIGNoaWxkcmVuOmNoaWxkcmVuLmZpbHRlcihhPT5hLm5hbWUgJiYgIWEubmFtZS5lbmRzV2l0aChcIjpyUHJcIikpLCB9XG4gICAgICAgICAgICBjb25zdCBwcj1jaGlsZHJlbi5maW5kKGE9PmEubmFtZSAmJiBhLm5hbWUuZW5kc1dpdGgoXCI6clByXCIpKVxuICAgICAgICAgICAgaWYocHIpe1xuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24obW9kZWwsIGRyYXdtbC5yUHIocHIsIG9kKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBtb2RlbFxuICAgICAgICB9LFxuXG4gICAgICAgIGdyYXBoaWNGcmFtZSh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJncmFwaGljXCIsIGNoaWxkcmVuOm9mZmljZURvY3VtZW50Lm5vZGUod1htbCkuZmluZChcImNcXFxcOmNoYXJ0LCBkZ21cXFxcOnJlbElkcywgYVxcXFw6dGJsXCIpLnRvQXJyYXkoKX1cbiAgICAgICAgfSxcblxuICAgICAgICBjaGFydCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6IFwiY2hhcnRcIn1cbiAgICAgICAgfSxcblxuICAgICAgICByZWxJZHMod1htbCwgb2ZmaWNlRG9jdW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHt0eXBlOlwiZGlhZ3JhbVwifVxuICAgICAgICB9LFxuXG4gICAgICAgIHRibCh3WG1sLCBvZmZpY2VEb2N1bWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge3R5cGU6XCJ0YWJsZVwifVxuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCByb290PWE9PmEucm9vdCB8fCByb290KGEucGFyZW50KVxuIl19