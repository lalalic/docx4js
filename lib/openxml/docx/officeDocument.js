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
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), "_init", this).call(this);
      this._assignRel("styles,numbering,settings".split(","));

      var $ = this.styles;
      $.prototype.basest = function (selector) {
        var current = this;
        while (current.length > 0) {
          if (current.is(selector)) {
            return $(current);
          }
          current = $.root().find("w\\:style[w\\:styleId=\"" + current.children("w\\:basedOn").attr("w:val") + "\"]");
        }
        return this.not(this);
      };
    }
  }, {
    key: "render",
    value: function render(createElement) {
      var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

      var styles = void 0,
          numbering = void 0;
      if (this.styles) styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, identify);
      if (this.numbering) numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, identify);

      return this.renderNode(this.content("w\\:document").get(0), createElement, identify, { styles: styles, numbering: numbering });
    }
  }, {
    key: "parse",
    value: function parse(domHandler) {
      var identify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.constructor.identify.bind(this.constructor);

      var doc = {};
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

      if (this.styles) doc.styles = this.renderNode(this.styles("w\\:styles").get(0), createElement, _identify);
      if (this.numbering) doc.numbering = this.renderNode(this.numbering("w\\:numbering").get(0), createElement, _identify);
      doc.document = this.renderNode(this.content("w\\:document").get(0), createElement, _identify);
      return doc;
    }
  }]);

  return _class;
}(_officeDocument2.default);

_class.identities = {
  document: function document(wXml, officeDocument) {
    var $ = officeDocument.content;
    var current = null;
    var children = $("w\\:sectPr").each(function (i, sect) {
      var end = $(sect).closest("w\\:body>*");
      sect.content = end.prevUntil(current).toArray().reverse();
      if (!end.is(sect)) sect.content.push(end.get(0));
      current = end;
    }).toArray();
    return { type: "document", children: children };
  },
  sectPr: function sectPr(wXml, officeDocument) {
    var hf = function hf(type) {
      return wXml.children.filter(function (a) {
        return a.name == "w:" + type + "Reference";
      }).reduce(function (headers, a) {
        headers.set(a.attribs["w:type"], officeDocument.getRel(a.attribs["r:id"]));
        return headers;
      }, new Map());
    };

    return {
      type: "section",
      children: wXml.content,
      headers: hf("header"),
      footers: hf("footer"),
      hasTitlePage: !!wXml.children.find(function (a) {
        return a.name == "w:titlePg";
      })
    };
  },
  p: function p(wXml, officeDocument) {
    var $ = officeDocument.content(wXml);
    var type = "p";

    var identity = {
      type: type,
      pr: wXml.children.find(function (_ref) {
        var name = _ref.name;
        return name == "w:pPr";
      }),
      children: wXml.children.filter(function (_ref2) {
        var name = _ref2.name;
        return name != "w:pPr";
      })
    };

    var pPr = $.find("w\\:pPr");
    if (pPr.length) {
      var styleId = pPr.find("w\\:pStyle").attr("w:val");

      var numPr = pPr.children("w\\:numPr");
      if (!numPr.length && styleId) {
        numPr = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"]").basest(":has(w\\:numPr)").find("w\\:numPr");
      }

      if (numPr.length) {
        identity.type = "list";
        identity.numId = numPr.find("w\\:numId").attr("w:val");
        identity.level = parseInt(numPr.find("w\\:ilvl").attr("w:val") || 0);
      }

      if (styleId && styleId.startsWith("Heading")) {
        var outlineLvl = officeDocument.styles("w\\:style[w\\:styleId=\"" + styleId + "\"]").basest(":has(w\\:outlineLvl)").find("w\\:outlineLvl").attr("w:val");
        if (outlineLvl) {
          identity.type = "heading";
          identity.outline = parseInt(outlineLvl) + 1;
        }
      }
    }

    return identity;
  },
  r: function r(wXml) {
    return {
      type: "r",
      pr: wXml.children.find(function (_ref3) {
        var name = _ref3.name;
        return name == "w:rPr";
      }),
      children: wXml.children.filter(function (_ref4) {
        var name = _ref4.name;
        return name != "w:rPr";
      })
    };
  },
  fldChar: function fldChar(wXml) {
    return wXml.attribs["w:fldCharType"];
  },
  inline: function inline(wXml, officeDocument) {
    var $ = officeDocument.content(wXml);
    return {
      type: "drawing.inline",
      children: $.find("a\\:graphic>a\\:graphicData").children().toArray()
    };
  },
  anchor: function anchor(wXml, officeDocument) {
    var $ = officeDocument.content(wXml);
    var graphicData = $.find(">a\\:graphic>a\\:graphicData");
    var type = graphicData.attr("uri").split("/").pop();
    var children = graphicData.children().toArray();
    if (type == "wordprocessingGroup") children = children[0].children.filter(function (a) {
      return a.name.split(":")[0] != "wpg";
    });

    return { type: "drawing.anchor", children: children };
  },
  pic: function pic(wXml, officeDocument) {
    var $ = officeDocument.$(wXml);
    var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), {
      tidy: function tidy(_ref5) {
        var spPr = _ref5.spPr,
            _ref5$nvPicPr = _ref5.nvPicPr,
            _ref5$nvPicPr$cNvPr = _ref5$nvPicPr.cNvPr,
            cNvPr = _ref5$nvPicPr$cNvPr === undefined ? {} : _ref5$nvPicPr$cNvPr,
            _ref5$nvPicPr$cNvSpPr = _ref5$nvPicPr.cNvSpPr,
            cNvSpPr = _ref5$nvPicPr$cNvSpPr === undefined ? {} : _ref5$nvPicPr$cNvSpPr,
            _ref5$nvPicPr$nvPr = _ref5$nvPicPr.nvPr,
            nvPr = _ref5$nvPicPr$nvPr === undefined ? {} : _ref5$nvPicPr$nvPr,
            _ref5$style = _ref5.style;
        _ref5$style = _ref5$style === undefined ? {} : _ref5$style;

        var _ref5$style$lnRef = _ref5$style.lnRef,
            lnRef = _ref5$style$lnRef === undefined ? {} : _ref5$style$lnRef,
            _ref5$style$fillRef = _ref5$style.fillRef,
            fillRef = _ref5$style$fillRef === undefined ? {} : _ref5$style$fillRef,
            _ref5$style$effectRef = _ref5$style.effectRef,
            effectRef = _ref5$style$effectRef === undefined ? {} : _ref5$style$effectRef,
            others = _objectWithoutProperties(_ref5, ["spPr", "nvPicPr", "style"]);

        return _extends({}, lnRef, fillRef, effectRef, spPr, cNvPr, cNvSpPr, nvPr, others);
      }
    }));
    return _extends({}, props, { type: "picture" });
  },
  wsp: function wsp(wXml, officeDocument) {
    var content = "wps\\:txbx";
    var $ = officeDocument.$(wXml);
    var children = $.children(content).children("w\\:txbxContent").children().toArray();
    var same = function same(keys, fx) {
      return keys.reduce(function (fs, k) {
        return fs[k] = fx, fs;
      }, {});
    };

    var props = $.props(_extends({}, (0, _drawml2.default)(officeDocument), same("r,t,l,b".split(",").map(function (a) {
      return a + "Ins";
    }), function (v) {
      return officeDocument.doc.emu2Px(v);
    }), {
      filter: ":not(" + content + ")",
      tidy: function tidy(_ref6) {
        var _ref6$cNvSpPr = _ref6.cNvSpPr,
            cNvSpPr = _ref6$cNvSpPr === undefined ? {} : _ref6$cNvSpPr,
            _ref6$spPr = _ref6.spPr,
            spPr = _ref6$spPr === undefined ? {} : _ref6$spPr,
            _ref6$style = _ref6.style;
        _ref6$style = _ref6$style === undefined ? {} : _ref6$style;

        var _ref6$style$lnRef = _ref6$style.lnRef,
            lnRef = _ref6$style$lnRef === undefined ? {} : _ref6$style$lnRef,
            _ref6$style$fillRef = _ref6$style.fillRef,
            fillRef = _ref6$style$fillRef === undefined ? {} : _ref6$style$fillRef,
            _ref6$style$effectRef = _ref6$style.effectRef,
            effectRef = _ref6$style$effectRef === undefined ? {} : _ref6$style$effectRef,
            _ref6$style$fontRef = _ref6$style.fontRef,
            fontRef = _ref6$style$fontRef === undefined ? {} : _ref6$style$fontRef,
            others = _objectWithoutProperties(_ref6, ["cNvSpPr", "spPr", "style"]);

        return _extends({}, cNvSpPr, lnRef, fillRef, effectRef, spPr, {
          textStyle: fontRef
        }, others);
      }
    }));
    return _extends({}, props, { type: "shape", children: children });
  },
  Fallback: function Fallback() {
    return null;
  },
  sdt: function sdt(wXml, officeDocument) {
    var $ = officeDocument.content(wXml);
    var pr = $.find(">w\\:sdtPr");
    var content = $.find(">w\\:sdtContent");
    var children = content.children().toArray();

    var elBinding = pr.find("w\\:dataBinding").get(0);
    if (elBinding) {
      //properties
      var path = elBinding.attribs["w:xpath"],
          d = path.split(/[\/\:\[]/),
          name = (d.pop(), d.pop());
      var value = content.text();

      return { type: "property", name: name, value: value, children: children };
    } else {
      var _ret = function () {
        //controls
        var prChildren = pr.get(0).children;
        var elType = prChildren[prChildren.length - 1];
        var name = elType.name.split(":").pop();
        var type = "text,picture,docPartList,docPartObj,comboBox,dropDownList,date,checkbox,repeatingSection,repeatingSectionItem".split(",").find(function (a) {
          return a == name;
        });
        var model = { children: children };
        if (type) {
          model.type = "control." + type;
        } else {
          //container
          if (content.find("w\\:p,w\\:tbl,w\\:tr,w\\:tc").length) {
            model.type = "block";
          } else {
            model.type = "inline";
          }
        }

        $ = officeDocument.content;
        switch (model.type) {
          case "control.dropDownList":
          case "control.comboBox":
            {
              var _ret2 = function () {
                var selected = $(content).text();
                model.options = $(elType).find("w\\:listItem").map(function (i, li) {
                  return {
                    displayText: li.attribs["w:displayText"],
                    value: li.attribs["w:value"]
                  };
                }).get();
                model.value = (model.options.find(function (a) {
                  return a.displayText == selected;
                }) || {}).value;
                return "break";
              }();

              if (_ret2 === "break") break;
            }
          case "control.checkbox":
            {
              var ns = elType.name.split(":")[0];
              model.checked = $(elType).find(ns + "\\:checked").attr(ns + ":val") == "1";
              break;
            }
          case "control.text":
            if (content.find("w\\:r [w\\:val~=Placeholder]").length == 0) model.value = content.text();
            break;
          case "control.date":
            model.value = new Date($(elType).attr("w:fullDate"));
            model.format = $(elType).find("w\\:dateFormat").attr("w:val");
            model.locale = $(elType).find("w\\:lid").attr("w:val");
            break;
        }
        return {
          v: model
        };
      }();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
  },
  hyperlink: function hyperlink(wXml, officeDocument) {
    if (wXml.attribs["r:id"]) {
      var url = officeDocument.getRel(wXml.attribs["r:id"]);
      return { type: "hyperlink", url: url };
    } else if (wXml.attribs["w:anchor"]) {
      return { type: "hyperlink", url: "#" + wXml.attribs["w:anchor"] };
    }
  },
  tbl: function tbl(wXml) {
    return wXml.children.reduce(function (state, node) {
      switch (node.name) {
        case "w:tblPr":
          state.pr = node;
          break;
        case "w:tblGrid":
          state.cols = node.children;
          break;
        default:
          state.children.push(node);
      }
      return state;
    }, { type: "tbl", children: [], pr: null, cols: [] });
  },
  tr: function tr(wXml) {
    return wXml.children.reduce(function (state, node) {
      switch (node.name) {
        case "w:trPr":
          state.pr = node;
          state.isHeader = !!node.children.find(function (a) {
            return a.name == "w:tblHeader";
          });
          break;
        default:
          state.children.push(node);
      }
      return state;
    }, { type: "tr", children: [], pr: null });
  },
  tc: function tc(wXml) {
    return wXml.children.reduce(function (state, node) {
      switch (node.name) {
        case "w:tcPr":
          state.pr = node;
          break;
        default:
          state.children.push(node);
      }
      return state;
    }, { type: "tc", children: [], pr: null });
  },
  altChunk: function altChunk(wXml, officeDocument) {
    var rId = wXml.attribs["r:id"];
    var data = officeDocument.getRel(rId);

    var partName = officeDocument.folder + officeDocument.rels("[Id=" + rId + "]").attr("Target");
    var contentType = officeDocument.doc.contentTypes("Override[PartName='" + partName + "']").attr("ContentType");
    return { type: "chunk", data: data, contentType: contentType };
  },
  docDefaults: function docDefaults(wXml) {
    return { type: "style" };
  },
  style: function style(wXml) {
    return { type: "style", id: wXml.attribs["w:styleId"] };
  },
  abstractNum: function abstractNum(wXml) {
    return { type: "abstractNum", id: wXml.attribs["w:abstractNumId"] };
  },
  num: function num(wXml) {
    return {
      type: "num",
      id: wXml.attribs["w:numId"],
      abstractNum: wXml.children.find(function (a) {
        return a.name == "w:abstractNumId";
      }).attribs["w:val"]
    };
  },
  latentStyles: function latentStyles() {
    return null;
  },
  object: function object(wXml, officeDocument) {
    var ole = officeDocument.content(wXml).find("o\\:OLEObject");
    var type = ole.attr("ProgID");
    var embed = ole.attr("Type") === "Embed";
    var rId = ole.attr("r:id");
    return {
      type: "object",
      embed: embed,
      prog: type,
      data: officeDocument.getRelOleObject(rId)
    };
  }
};
exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9vcGVueG1sL2RvY3gvb2ZmaWNlRG9jdW1lbnQuanMiXSwibmFtZXMiOlsiX2Fzc2lnblJlbCIsInNwbGl0IiwiJCIsInN0eWxlcyIsInByb3RvdHlwZSIsImJhc2VzdCIsInNlbGVjdG9yIiwiY3VycmVudCIsImxlbmd0aCIsImlzIiwicm9vdCIsImZpbmQiLCJjaGlsZHJlbiIsImF0dHIiLCJub3QiLCJjcmVhdGVFbGVtZW50IiwiaWRlbnRpZnkiLCJjb25zdHJ1Y3RvciIsImJpbmQiLCJudW1iZXJpbmciLCJyZW5kZXJOb2RlIiwiZ2V0IiwiY29udGVudCIsImRvbUhhbmRsZXIiLCJkb2MiLCJfaWRlbnRpZnkiLCJtb2RlbCIsImFyZ3VtZW50cyIsImVtaXQiLCJ0eXBlIiwiZG9jdW1lbnQiLCJpZGVudGl0aWVzIiwid1htbCIsIm9mZmljZURvY3VtZW50IiwiZWFjaCIsImkiLCJzZWN0IiwiZW5kIiwiY2xvc2VzdCIsInByZXZVbnRpbCIsInRvQXJyYXkiLCJyZXZlcnNlIiwicHVzaCIsInNlY3RQciIsImhmIiwiZmlsdGVyIiwiYSIsIm5hbWUiLCJyZWR1Y2UiLCJoZWFkZXJzIiwic2V0IiwiYXR0cmlicyIsImdldFJlbCIsIk1hcCIsImZvb3RlcnMiLCJoYXNUaXRsZVBhZ2UiLCJwIiwiaWRlbnRpdHkiLCJwciIsInBQciIsInN0eWxlSWQiLCJudW1QciIsIm51bUlkIiwibGV2ZWwiLCJwYXJzZUludCIsInN0YXJ0c1dpdGgiLCJvdXRsaW5lTHZsIiwib3V0bGluZSIsInIiLCJmbGRDaGFyIiwiaW5saW5lIiwiYW5jaG9yIiwiZ3JhcGhpY0RhdGEiLCJwb3AiLCJwaWMiLCJwcm9wcyIsInRpZHkiLCJzcFByIiwibnZQaWNQciIsImNOdlByIiwiY052U3BQciIsIm52UHIiLCJzdHlsZSIsImxuUmVmIiwiZmlsbFJlZiIsImVmZmVjdFJlZiIsIm90aGVycyIsIndzcCIsInNhbWUiLCJrZXlzIiwiZngiLCJmcyIsImsiLCJtYXAiLCJ2IiwiZW11MlB4IiwiZm9udFJlZiIsInRleHRTdHlsZSIsIkZhbGxiYWNrIiwic2R0IiwiZWxCaW5kaW5nIiwicGF0aCIsImQiLCJ2YWx1ZSIsInRleHQiLCJwckNoaWxkcmVuIiwiZWxUeXBlIiwic2VsZWN0ZWQiLCJvcHRpb25zIiwibGkiLCJkaXNwbGF5VGV4dCIsIm5zIiwiY2hlY2tlZCIsIkRhdGUiLCJmb3JtYXQiLCJsb2NhbGUiLCJoeXBlcmxpbmsiLCJ1cmwiLCJ0YmwiLCJzdGF0ZSIsIm5vZGUiLCJjb2xzIiwidHIiLCJpc0hlYWRlciIsInRjIiwiYWx0Q2h1bmsiLCJySWQiLCJkYXRhIiwicGFydE5hbWUiLCJmb2xkZXIiLCJyZWxzIiwiY29udGVudFR5cGUiLCJjb250ZW50VHlwZXMiLCJkb2NEZWZhdWx0cyIsImlkIiwiYWJzdHJhY3ROdW0iLCJudW0iLCJsYXRlbnRTdHlsZXMiLCJvYmplY3QiLCJvbGUiLCJlbWJlZCIsInByb2ciLCJnZXRSZWxPbGVPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFHVTtBQUNOO0FBQ0EsV0FBS0EsVUFBTCxDQUFnQiw0QkFBNEJDLEtBQTVCLENBQWtDLEdBQWxDLENBQWhCOztBQUVBLFVBQUlDLElBQUksS0FBS0MsTUFBYjtBQUNBRCxRQUFFRSxTQUFGLENBQVlDLE1BQVosR0FBcUIsVUFBVUMsUUFBVixFQUFvQjtBQUN2QyxZQUFJQyxVQUFVLElBQWQ7QUFDQSxlQUFPQSxRQUFRQyxNQUFSLEdBQWlCLENBQXhCLEVBQTJCO0FBQ3pCLGNBQUlELFFBQVFFLEVBQVIsQ0FBV0gsUUFBWCxDQUFKLEVBQTBCO0FBQ3hCLG1CQUFPSixFQUFFSyxPQUFGLENBQVA7QUFDRDtBQUNEQSxvQkFBVUwsRUFBRVEsSUFBRixHQUFTQyxJQUFULDhCQUNrQkosUUFDdkJLLFFBRHVCLENBQ2QsYUFEYyxFQUV2QkMsSUFGdUIsQ0FFbEIsT0FGa0IsQ0FEbEIsU0FBVjtBQUtEO0FB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cFVpQjtBQXFVbEJxRixLQXJVa0IsZUFxVWR4RyxJQXJVYyxFQXFVUjtBQUNSLFdBQU87QUFDTEgsWUFBTSxLQUREO0FBRUx5RyxVQUFJdEcsS0FBS21CLE9BQUwsQ0FBYSxTQUFiLENBRkM7QUFHTG9GLG1CQUFhdkcsS0FBS3BCLFFBQUwsQ0FBY0QsSUFBZCxDQUFtQixVQUFDbUMsQ0FBRDtBQUFBLGVBQU9BLEVBQUVDLElBQUYsSUFBVSxpQkFBakI7QUFBQSxPQUFuQixFQUNWSSxPQURVLENBQ0YsT0FERTtBQUhSLEtBQVA7QUFNRCxHQTVVaUI7QUE2VWxCc0YsY0E3VWtCLDBCQTZVSDtBQUNiLFdBQU8sSUFBUDtBQUNELEdBL1VpQjtBQWdWbEJDLFFBaFZrQixrQkFnVlgxRyxJQWhWVyxFQWdWTEMsY0FoVkssRUFnVlc7QUFDM0IsUUFBSTBHLE1BQU0xRyxlQUFlWCxPQUFmLENBQXVCVSxJQUF2QixFQUE2QnJCLElBQTdCLENBQWtDLGVBQWxDLENBQVY7QUFDQSxRQUFJa0IsT0FBTzhHLElBQUk5SCxJQUFKLENBQVMsUUFBVCxDQUFYO0FBQ0EsUUFBSStILFFBQVFELElBQUk5SCxJQUFKLENBQVMsTUFBVCxNQUFxQixPQUFqQztBQUNBLFFBQUlpSCxNQUFNYSxJQUFJOUgsSUFBSixDQUFTLE1BQVQsQ0FBVjtBQUNBLFdBQU87QUFDTGdCLFlBQU0sUUFERDtBQUVMK0csa0JBRks7QUFHTEMsWUFBTWhILElBSEQ7QUFJTGtHLFlBQU05RixlQUFlNkcsZUFBZixDQUErQmhCLEdBQS9CO0FBSkQsS0FBUDtBQU1EO0FBM1ZpQixDIiwiZmlsZSI6Im9mZmljZURvY3VtZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2UgZnJvbSBcIi4uL29mZmljZURvY3VtZW50XCI7XHJcbmltcG9ydCBkcmF3bWwgZnJvbSBcIi4uL2RyYXdtbFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlIHtcclxuICBfaW5pdCgpIHtcclxuICAgIHN1cGVyLl9pbml0KCk7XHJcbiAgICB0aGlzLl9hc3NpZ25SZWwoXCJzdHlsZXMsbnVtYmVyaW5nLHNldHRpbmdzXCIuc3BsaXQoXCIsXCIpKTtcclxuXHJcbiAgICB2YXIgJCA9IHRoaXMuc3R5bGVzO1xyXG4gICAgJC5wcm90b3R5cGUuYmFzZXN0ID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gdGhpcztcclxuICAgICAgd2hpbGUgKGN1cnJlbnQubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIGlmIChjdXJyZW50LmlzKHNlbGVjdG9yKSkge1xyXG4gICAgICAgICAgcmV0dXJuICQoY3VycmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGN1cnJlbnQgPSAkLnJvb3QoKS5maW5kKFxyXG4gICAgICAgICAgYHdcXFxcOnN0eWxlW3dcXFxcOnN0eWxlSWQ9XCIke2N1cnJlbnRcclxuICAgICAgICAgICAgLmNoaWxkcmVuKFwid1xcXFw6YmFzZWRPblwiKVxyXG4gICAgICAgICAgICAuYXR0cihcInc6dmFsXCIpfVwiXWBcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiB0aGlzLm5vdCh0aGlzKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZW5kZXIoXHJcbiAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgaWRlbnRpZnkgPSB0aGlzLmNvbnN0cnVjdG9yLmlkZW50aWZ5LmJpbmQodGhpcy5jb25zdHJ1Y3RvcilcclxuICApIHtcclxuICAgIGxldCBzdHlsZXMsIG51bWJlcmluZztcclxuICAgIGlmICh0aGlzLnN0eWxlcylcclxuICAgICAgc3R5bGVzID0gdGhpcy5yZW5kZXJOb2RlKFxyXG4gICAgICAgIHRoaXMuc3R5bGVzKFwid1xcXFw6c3R5bGVzXCIpLmdldCgwKSxcclxuICAgICAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgICAgIGlkZW50aWZ5XHJcbiAgICAgICk7XHJcbiAgICBpZiAodGhpcy5udW1iZXJpbmcpXHJcbiAgICAgIG51bWJlcmluZyA9IHRoaXMucmVuZGVyTm9kZShcclxuICAgICAgICB0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgICBpZGVudGlmeVxyXG4gICAgICApO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnJlbmRlck5vZGUoXHJcbiAgICAgIHRoaXMuY29udGVudChcIndcXFxcOmRvY3VtZW50XCIpLmdldCgwKSxcclxuICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgaWRlbnRpZnksXHJcbiAgICAgIHsgc3R5bGVzLCBudW1iZXJpbmcgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHBhcnNlKFxyXG4gICAgZG9tSGFuZGxlcixcclxuICAgIGlkZW50aWZ5ID0gdGhpcy5jb25zdHJ1Y3Rvci5pZGVudGlmeS5iaW5kKHRoaXMuY29uc3RydWN0b3IpXHJcbiAgKSB7XHJcbiAgICBjb25zdCBkb2MgPSB7fTtcclxuICAgIGNvbnN0IGNyZWF0ZUVsZW1lbnQgPSBkb21IYW5kbGVyLmNyZWF0ZUVsZW1lbnQuYmluZChkb21IYW5kbGVyKTtcclxuICAgIGZ1bmN0aW9uIF9pZGVudGlmeSgpIHtcclxuICAgICAgbGV0IG1vZGVsID0gaWRlbnRpZnkoLi4uYXJndW1lbnRzKTtcclxuICAgICAgaWYgKG1vZGVsICYmIHR5cGVvZiBtb2RlbCA9PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgZG9tSGFuZGxlci5lbWl0KFwiKlwiLCBtb2RlbCwgLi4uYXJndW1lbnRzKTtcclxuICAgICAgICBkb21IYW5kbGVyLmVtaXQobW9kZWwudHlwZSwgbW9kZWwsIC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgICAgaWYgKGRvbUhhbmRsZXJbYG9uJHttb2RlbC50eXBlfWBdKVxyXG4gICAgICAgICAgZG9tSGFuZGxlcltgb24ke21vZGVsLnR5cGV9YF0obW9kZWwsIC4uLmFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG1vZGVsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnN0eWxlcylcclxuICAgICAgZG9jLnN0eWxlcyA9IHRoaXMucmVuZGVyTm9kZShcclxuICAgICAgICB0aGlzLnN0eWxlcyhcIndcXFxcOnN0eWxlc1wiKS5nZXQoMCksXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgICBfaWRlbnRpZnlcclxuICAgICAgKTtcclxuICAgIGlmICh0aGlzLm51bWJlcmluZylcclxuICAgICAgZG9jLm51bWJlcmluZyA9IHRoaXMucmVuZGVyTm9kZShcclxuICAgICAgICB0aGlzLm51bWJlcmluZyhcIndcXFxcOm51bWJlcmluZ1wiKS5nZXQoMCksXHJcbiAgICAgICAgY3JlYXRlRWxlbWVudCxcclxuICAgICAgICBfaWRlbnRpZnlcclxuICAgICAgKTtcclxuICAgIGRvYy5kb2N1bWVudCA9IHRoaXMucmVuZGVyTm9kZShcclxuICAgICAgdGhpcy5jb250ZW50KFwid1xcXFw6ZG9jdW1lbnRcIikuZ2V0KDApLFxyXG4gICAgICBjcmVhdGVFbGVtZW50LFxyXG4gICAgICBfaWRlbnRpZnlcclxuICAgICk7XHJcbiAgICByZXR1cm4gZG9jO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGlkZW50aXRpZXMgPSB7XHJcbiAgICBkb2N1bWVudCh3WG1sLCBvZmZpY2VEb2N1bWVudCkge1xyXG4gICAgICBsZXQgJCA9IG9mZmljZURvY3VtZW50LmNvbnRlbnQ7XHJcbiAgICAgIGxldCBjdXJyZW50ID0gbnVsbDtcclxuICAgICAgbGV0IGNoaWxkcmVuID0gJChcIndcXFxcOnNlY3RQclwiKVxyXG4gICAgICAgIC5lYWNoKChpLCBzZWN0KSA9PiB7XHJcbiAgICAgICAgICBsZXQgZW5kID0gJChzZWN0KS5jbG9zZXN0KFwid1xcXFw6Ym9keT4qXCIpO1xyXG4gICAgICAgICAgc2VjdC5jb250ZW50ID0gZW5kLnByZXZVbnRpbChjdXJyZW50KS50b0FycmF5KCkucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgaWYgKCFlbmQuaXMoc2VjdCkpIHNlY3QuY29udGVudC5wdXNoKGVuZC5nZXQoMCkpO1xyXG4gICAgICAgICAgY3VycmVudCA9IGVuZDtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50b0FycmF5KCk7XHJcbiAgICAgIHJldHVybiB7IHR5cGU6IFwiZG9jdW1lbnRcIiwgY2hpbGRyZW4gfTtcclxuICAgIH0sXHJcbiAgICBzZWN0UHIod1htbCwgb2ZmaWNlRG9jdW1lbnQpIHtcclxuICAgICAgY29uc3QgaGYgPSAodHlwZSkgPT5cclxuICAgICAgICB3WG1sLmNoaWxkcmVuXHJcbiAgICAgICAgICAuZmlsdGVyKChhKSA9PiBhLm5hbWUgPT0gYHc6JHt0eXBlfVJlZmVyZW5jZWApXHJcbiAgICAgICAgICAucmVkdWNlKChoZWFkZXJzLCBhKSA9PiB7XHJcbiAgICAgICAgICAgIGhlYWRlcnMuc2V0KFxyXG4gICAgICAgICAgICAgIGEuYXR0cmlic1tcInc6dHlwZVwiXSxcclxuICAgICAgICAgICAgICBvZmZpY2VEb2N1bWVudC5nZXRSZWwoYS5hdHRyaWJzW1wicjppZFwiXSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgcmV0dXJuIGhlYWRlcnM7XHJcbiAgICAgICAgICB9LCBuZXcgTWFwKCkpO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBcInNlY3Rpb25cIixcclxuICAgICAgICBjaGlsZHJlbjogd1htbC5jb250ZW50LFxyXG4gICAgICAgIGhlYWRlcnM6IGhmKFwiaGVhZGVyXCIpLFxyXG4gICAgICAgIGZvb3RlcnM6IGhmKFwiZm9vdGVyXCIpLFxyXG4gICAgICAgIGhhc1RpdGxlUGFnZTogISF3WG1sLmNoaWxkcmVuLmZpbmQoKGEpID0+IGEubmFtZSA9PSBcInc6dGl0bGVQZ1wiKSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBwKHdYbWwsIG9mZmljZURvY3VtZW50KSB7XHJcbiAgICAgIGxldCAkID0gb2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKTtcclxuICAgICAgbGV0IHR5cGUgPSBcInBcIjtcclxuXHJcbiAgICAgIGxldCBpZGVudGl0eSA9IHtcclxuICAgICAgICB0eXBlLFxyXG4gICAgICAgIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09IFwidzpwUHJcIiksXHJcbiAgICAgICAgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7IG5hbWUgfSkgPT4gbmFtZSAhPSBcInc6cFByXCIpLFxyXG4gICAgICB9O1xyXG5cclxuICAgICAgbGV0IHBQciA9ICQuZmluZChcIndcXFxcOnBQclwiKTtcclxuICAgICAgaWYgKHBQci5sZW5ndGgpIHtcclxuICAgICAgICBsZXQgc3R5bGVJZCA9IHBQci5maW5kKFwid1xcXFw6cFN0eWxlXCIpLmF0dHIoXCJ3OnZhbFwiKTtcclxuXHJcbiAgICAgICAgbGV0IG51bVByID0gcFByLmNoaWxkcmVuKFwid1xcXFw6bnVtUHJcIik7XHJcbiAgICAgICAgaWYgKCFudW1Qci5sZW5ndGggJiYgc3R5bGVJZCkge1xyXG4gICAgICAgICAgbnVtUHIgPSBvZmZpY2VEb2N1bWVudFxyXG4gICAgICAgICAgICAuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXWApXHJcbiAgICAgICAgICAgIC5iYXNlc3QoYDpoYXMod1xcXFw6bnVtUHIpYClcclxuICAgICAgICAgICAgLmZpbmQoXCJ3XFxcXDpudW1QclwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChudW1Qci5sZW5ndGgpIHtcclxuICAgICAgICAgIGlkZW50aXR5LnR5cGUgPSBcImxpc3RcIjtcclxuICAgICAgICAgIGlkZW50aXR5Lm51bUlkID0gbnVtUHIuZmluZChcIndcXFxcOm51bUlkXCIpLmF0dHIoXCJ3OnZhbFwiKTtcclxuICAgICAgICAgIGlkZW50aXR5LmxldmVsID0gcGFyc2VJbnQobnVtUHIuZmluZChcIndcXFxcOmlsdmxcIikuYXR0cihcInc6dmFsXCIpIHx8IDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHN0eWxlSWQgJiYgc3R5bGVJZC5zdGFydHNXaXRoKFwiSGVhZGluZ1wiKSkge1xyXG4gICAgICAgICAgbGV0IG91dGxpbmVMdmwgPSBvZmZpY2VEb2N1bWVudFxyXG4gICAgICAgICAgICAuc3R5bGVzKGB3XFxcXDpzdHlsZVt3XFxcXDpzdHlsZUlkPVwiJHtzdHlsZUlkfVwiXWApXHJcbiAgICAgICAgICAgIC5iYXNlc3QoXCI6aGFzKHdcXFxcOm91dGxpbmVMdmwpXCIpXHJcbiAgICAgICAgICAgIC5maW5kKFwid1xcXFw6b3V0bGluZUx2bFwiKVxyXG4gICAgICAgICAgICAuYXR0cihcInc6dmFsXCIpO1xyXG4gICAgICAgICAgaWYgKG91dGxpbmVMdmwpIHtcclxuICAgICAgICAgICAgaWRlbnRpdHkudHlwZSA9IFwiaGVhZGluZ1wiO1xyXG4gICAgICAgICAgICBpZGVudGl0eS5vdXRsaW5lID0gcGFyc2VJbnQob3V0bGluZUx2bCkgKyAxO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGlkZW50aXR5O1xyXG4gICAgfSxcclxuICAgIHIod1htbCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIHR5cGU6IFwiclwiLFxyXG4gICAgICAgIHByOiB3WG1sLmNoaWxkcmVuLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09IFwidzpyUHJcIiksXHJcbiAgICAgICAgY2hpbGRyZW46IHdYbWwuY2hpbGRyZW4uZmlsdGVyKCh7IG5hbWUgfSkgPT4gbmFtZSAhPSBcInc6clByXCIpLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIGZsZENoYXIod1htbCkge1xyXG4gICAgICByZXR1cm4gd1htbC5hdHRyaWJzW1widzpmbGRDaGFyVHlwZVwiXTtcclxuICAgIH0sXHJcblxyXG4gICAgaW5saW5lKHdYbWwsIG9mZmljZURvY3VtZW50KSB7XHJcbiAgICAgIGxldCAkID0gb2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBgZHJhd2luZy5pbmxpbmVgLFxyXG4gICAgICAgIGNoaWxkcmVuOiAkLmZpbmQoXCJhXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhXCIpLmNoaWxkcmVuKCkudG9BcnJheSgpLFxyXG4gICAgICB9O1xyXG4gICAgfSxcclxuICAgIGFuY2hvcih3WG1sLCBvZmZpY2VEb2N1bWVudCkge1xyXG4gICAgICBsZXQgJCA9IG9mZmljZURvY3VtZW50LmNvbnRlbnQod1htbCk7XHJcbiAgICAgIGxldCBncmFwaGljRGF0YSA9ICQuZmluZChcIj5hXFxcXDpncmFwaGljPmFcXFxcOmdyYXBoaWNEYXRhXCIpO1xyXG4gICAgICBsZXQgdHlwZSA9IGdyYXBoaWNEYXRhLmF0dHIoXCJ1cmlcIikuc3BsaXQoXCIvXCIpLnBvcCgpO1xyXG4gICAgICBsZXQgY2hpbGRyZW4gPSBncmFwaGljRGF0YS5jaGlsZHJlbigpLnRvQXJyYXkoKTtcclxuICAgICAgaWYgKHR5cGUgPT0gXCJ3b3JkcHJvY2Vzc2luZ0dyb3VwXCIpXHJcbiAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlblswXS5jaGlsZHJlbi5maWx0ZXIoXHJcbiAgICAgICAgICAoYSkgPT4gYS5uYW1lLnNwbGl0KFwiOlwiKVswXSAhPSBcIndwZ1wiXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybiB7IHR5cGU6IFwiZHJhd2luZy5hbmNob3JcIiwgY2hpbGRyZW4gfTtcclxuICAgIH0sXHJcblxyXG4gICAgcGljKHdYbWwsIG9mZmljZURvY3VtZW50KSB7XHJcbiAgICAgIGNvbnN0ICQgPSBvZmZpY2VEb2N1bWVudC4kKHdYbWwpO1xyXG4gICAgICBjb25zdCBwcm9wcyA9ICQucHJvcHMoe1xyXG4gICAgICAgIC4uLmRyYXdtbChvZmZpY2VEb2N1bWVudCksXHJcbiAgICAgICAgdGlkeTogKHtcclxuICAgICAgICAgIHNwUHIsXHJcbiAgICAgICAgICBudlBpY1ByOiB7IGNOdlByID0ge30sIGNOdlNwUHIgPSB7fSwgbnZQciA9IHt9IH0sXHJcbiAgICAgICAgICBzdHlsZTogeyBsblJlZiA9IHt9LCBmaWxsUmVmID0ge30sIGVmZmVjdFJlZiA9IHt9IH0gPSB7fSxcclxuICAgICAgICAgIC4uLm90aGVyc1xyXG4gICAgICAgIH0pID0+ICh7XHJcbiAgICAgICAgICAuLi5sblJlZixcclxuICAgICAgICAgIC4uLmZpbGxSZWYsXHJcbiAgICAgICAgICAuLi5lZmZlY3RSZWYsXHJcbiAgICAgICAgICAuLi5zcFByLFxyXG4gICAgICAgICAgLi4uY052UHIsXHJcbiAgICAgICAgICAuLi5jTnZTcFByLFxyXG4gICAgICAgICAgLi4ubnZQcixcclxuICAgICAgICAgIC4uLm90aGVycyxcclxuICAgICAgICB9KSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiB7IC4uLnByb3BzLCB0eXBlOiBcInBpY3R1cmVcIiB9O1xyXG4gICAgfSxcclxuXHJcbiAgICB3c3Aod1htbCwgb2ZmaWNlRG9jdW1lbnQpIHtcclxuICAgICAgY29uc3QgY29udGVudCA9IFwid3BzXFxcXDp0eGJ4XCI7XHJcbiAgICAgIGNvbnN0ICQgPSBvZmZpY2VEb2N1bWVudC4kKHdYbWwpO1xyXG4gICAgICBjb25zdCBjaGlsZHJlbiA9ICQuY2hpbGRyZW4oY29udGVudClcclxuICAgICAgICAuY2hpbGRyZW4oXCJ3XFxcXDp0eGJ4Q29udGVudFwiKVxyXG4gICAgICAgIC5jaGlsZHJlbigpXHJcbiAgICAgICAgLnRvQXJyYXkoKTtcclxuICAgICAgY29uc3Qgc2FtZSA9IChrZXlzLCBmeCkgPT4ga2V5cy5yZWR1Y2UoKGZzLCBrKSA9PiAoKGZzW2tdID0gZngpLCBmcyksIHt9KTtcclxuXHJcbiAgICAgIGNvbnN0IHByb3BzID0gJC5wcm9wcyh7XHJcbiAgICAgICAgLi4uZHJhd21sKG9mZmljZURvY3VtZW50KSxcclxuICAgICAgICAuLi5zYW1lKFxyXG4gICAgICAgICAgXCJyLHQsbCxiXCIuc3BsaXQoXCIsXCIpLm1hcCgoYSkgPT4gYCR7YX1JbnNgKSxcclxuICAgICAgICAgICh2KSA9PiBvZmZpY2VEb2N1bWVudC5kb2MuZW11MlB4KHYpXHJcbiAgICAgICAgKSxcclxuICAgICAgICBmaWx0ZXI6IGA6bm90KCR7Y29udGVudH0pYCxcclxuICAgICAgICB0aWR5OiAoe1xyXG4gICAgICAgICAgY052U3BQciA9IHt9LFxyXG4gICAgICAgICAgc3BQciA9IHt9LFxyXG4gICAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgbG5SZWYgPSB7fSxcclxuICAgICAgICAgICAgZmlsbFJlZiA9IHt9LFxyXG4gICAgICAgICAgICBlZmZlY3RSZWYgPSB7fSxcclxuICAgICAgICAgICAgZm9udFJlZiA9IHt9LFxyXG4gICAgICAgICAgfSA9IHt9LFxyXG4gICAgICAgICAgLi4ub3RoZXJzXHJcbiAgICAgICAgfSkgPT4gKHtcclxuICAgICAgICAgIC4uLmNOdlNwUHIsXHJcbiAgICAgICAgICAuLi5sblJlZixcclxuICAgICAgICAgIC4uLmZpbGxSZWYsXHJcbiAgICAgICAgICAuLi5lZmZlY3RSZWYsXHJcbiAgICAgICAgICAuLi5zcFByLFxyXG4gICAgICAgICAgdGV4dFN0eWxlOiBmb250UmVmLFxyXG4gICAgICAgICAgLi4ub3RoZXJzLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHsgLi4ucHJvcHMsIHR5cGU6IFwic2hhcGVcIiwgY2hpbGRyZW4gfTtcclxuICAgIH0sXHJcbiAgICBGYWxsYmFjaygpIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9LFxyXG4gICAgc2R0KHdYbWwsIG9mZmljZURvY3VtZW50KSB7XHJcbiAgICAgIGxldCAkID0gb2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKTtcclxuICAgICAgbGV0IHByID0gJC5maW5kKFwiPndcXFxcOnNkdFByXCIpO1xyXG4gICAgICBsZXQgY29udGVudCA9ICQuZmluZChcIj53XFxcXDpzZHRDb250ZW50XCIpO1xyXG4gICAgICBsZXQgY2hpbGRyZW4gPSBjb250ZW50LmNoaWxkcmVuKCkudG9BcnJheSgpO1xyXG5cclxuICAgICAgbGV0IGVsQmluZGluZyA9IHByLmZpbmQoXCJ3XFxcXDpkYXRhQmluZGluZ1wiKS5nZXQoMCk7XHJcbiAgICAgIGlmIChlbEJpbmRpbmcpIHtcclxuICAgICAgICAvL3Byb3BlcnRpZXNcclxuICAgICAgICBsZXQgcGF0aCA9IGVsQmluZGluZy5hdHRyaWJzW1widzp4cGF0aFwiXSxcclxuICAgICAgICAgIGQgPSBwYXRoLnNwbGl0KC9bXFwvXFw6XFxbXS8pLFxyXG4gICAgICAgICAgbmFtZSA9IChkLnBvcCgpLCBkLnBvcCgpKTtcclxuICAgICAgICBsZXQgdmFsdWUgPSBjb250ZW50LnRleHQoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJwcm9wZXJ0eVwiLCBuYW1lLCB2YWx1ZSwgY2hpbGRyZW4gfTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvL2NvbnRyb2xzXHJcbiAgICAgICAgbGV0IHByQ2hpbGRyZW4gPSBwci5nZXQoMCkuY2hpbGRyZW47XHJcbiAgICAgICAgbGV0IGVsVHlwZSA9IHByQ2hpbGRyZW5bcHJDaGlsZHJlbi5sZW5ndGggLSAxXTtcclxuICAgICAgICBsZXQgbmFtZSA9IGVsVHlwZS5uYW1lLnNwbGl0KFwiOlwiKS5wb3AoKTtcclxuICAgICAgICBsZXQgdHlwZSA9IFwidGV4dCxwaWN0dXJlLGRvY1BhcnRMaXN0LGRvY1BhcnRPYmosY29tYm9Cb3gsZHJvcERvd25MaXN0LGRhdGUsY2hlY2tib3gscmVwZWF0aW5nU2VjdGlvbixyZXBlYXRpbmdTZWN0aW9uSXRlbVwiXHJcbiAgICAgICAgICAuc3BsaXQoXCIsXCIpXHJcbiAgICAgICAgICAuZmluZCgoYSkgPT4gYSA9PSBuYW1lKTtcclxuICAgICAgICBsZXQgbW9kZWwgPSB7IGNoaWxkcmVuIH07XHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgIG1vZGVsLnR5cGUgPSBgY29udHJvbC4ke3R5cGV9YDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy9jb250YWluZXJcclxuICAgICAgICAgIGlmIChjb250ZW50LmZpbmQoXCJ3XFxcXDpwLHdcXFxcOnRibCx3XFxcXDp0cix3XFxcXDp0Y1wiKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgbW9kZWwudHlwZSA9IFwiYmxvY2tcIjtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZGVsLnR5cGUgPSBcImlubGluZVwiO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgJCA9IG9mZmljZURvY3VtZW50LmNvbnRlbnQ7XHJcbiAgICAgICAgc3dpdGNoIChtb2RlbC50eXBlKSB7XHJcbiAgICAgICAgICBjYXNlIFwiY29udHJvbC5kcm9wRG93bkxpc3RcIjpcclxuICAgICAgICAgIGNhc2UgXCJjb250cm9sLmNvbWJvQm94XCI6IHtcclxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gJChjb250ZW50KS50ZXh0KCk7XHJcbiAgICAgICAgICAgIG1vZGVsLm9wdGlvbnMgPSAkKGVsVHlwZSlcclxuICAgICAgICAgICAgICAuZmluZChcIndcXFxcOmxpc3RJdGVtXCIpXHJcbiAgICAgICAgICAgICAgLm1hcCgoaSwgbGkpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICAgIGRpc3BsYXlUZXh0OiBsaS5hdHRyaWJzW1widzpkaXNwbGF5VGV4dFwiXSxcclxuICAgICAgICAgICAgICAgICAgdmFsdWU6IGxpLmF0dHJpYnNbXCJ3OnZhbHVlXCJdLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIC5nZXQoKTtcclxuICAgICAgICAgICAgbW9kZWwudmFsdWUgPSAoXHJcbiAgICAgICAgICAgICAgbW9kZWwub3B0aW9ucy5maW5kKChhKSA9PiBhLmRpc3BsYXlUZXh0ID09IHNlbGVjdGVkKSB8fCB7fVxyXG4gICAgICAgICAgICApLnZhbHVlO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNhc2UgXCJjb250cm9sLmNoZWNrYm94XCI6IHtcclxuICAgICAgICAgICAgbGV0IG5zID0gZWxUeXBlLm5hbWUuc3BsaXQoXCI6XCIpWzBdO1xyXG4gICAgICAgICAgICBtb2RlbC5jaGVja2VkID1cclxuICAgICAgICAgICAgICAkKGVsVHlwZSkuZmluZChgJHtuc31cXFxcOmNoZWNrZWRgKS5hdHRyKGAke25zfTp2YWxgKSA9PSBcIjFcIjtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlIFwiY29udHJvbC50ZXh0XCI6XHJcbiAgICAgICAgICAgIGlmIChjb250ZW50LmZpbmQoXCJ3XFxcXDpyIFt3XFxcXDp2YWx+PVBsYWNlaG9sZGVyXVwiKS5sZW5ndGggPT0gMClcclxuICAgICAgICAgICAgICBtb2RlbC52YWx1ZSA9IGNvbnRlbnQudGV4dCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgXCJjb250cm9sLmRhdGVcIjpcclxuICAgICAgICAgICAgbW9kZWwudmFsdWUgPSBuZXcgRGF0ZSgkKGVsVHlwZSkuYXR0cihcInc6ZnVsbERhdGVcIikpO1xyXG4gICAgICAgICAgICBtb2RlbC5mb3JtYXQgPSAkKGVsVHlwZSkuZmluZChcIndcXFxcOmRhdGVGb3JtYXRcIikuYXR0cihcInc6dmFsXCIpO1xyXG4gICAgICAgICAgICBtb2RlbC5sb2NhbGUgPSAkKGVsVHlwZSkuZmluZChcIndcXFxcOmxpZFwiKS5hdHRyKFwidzp2YWxcIik7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbW9kZWw7XHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBoeXBlcmxpbmsod1htbCwgb2ZmaWNlRG9jdW1lbnQpIHtcclxuICAgICAgaWYgKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pIHtcclxuICAgICAgICBsZXQgdXJsID0gb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsKHdYbWwuYXR0cmlic1tcInI6aWRcIl0pO1xyXG4gICAgICAgIHJldHVybiB7IHR5cGU6IFwiaHlwZXJsaW5rXCIsIHVybCB9O1xyXG4gICAgICB9IGVsc2UgaWYgKHdYbWwuYXR0cmlic1tcInc6YW5jaG9yXCJdKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogXCJoeXBlcmxpbmtcIiwgdXJsOiBgIyR7d1htbC5hdHRyaWJzW1widzphbmNob3JcIl19YCB9O1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgdGJsKHdYbWwpIHtcclxuICAgICAgcmV0dXJuIHdYbWwuY2hpbGRyZW4ucmVkdWNlKFxyXG4gICAgICAgIChzdGF0ZSwgbm9kZSkgPT4ge1xyXG4gICAgICAgICAgc3dpdGNoIChub2RlLm5hbWUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInc6dGJsUHJcIjpcclxuICAgICAgICAgICAgICBzdGF0ZS5wciA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3OnRibEdyaWRcIjpcclxuICAgICAgICAgICAgICBzdGF0ZS5jb2xzID0gbm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICBzdGF0ZS5jaGlsZHJlbi5wdXNoKG5vZGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHN0YXRlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgeyB0eXBlOiBcInRibFwiLCBjaGlsZHJlbjogW10sIHByOiBudWxsLCBjb2xzOiBbXSB9XHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgdHIod1htbCkge1xyXG4gICAgICByZXR1cm4gd1htbC5jaGlsZHJlbi5yZWR1Y2UoXHJcbiAgICAgICAgKHN0YXRlLCBub2RlKSA9PiB7XHJcbiAgICAgICAgICBzd2l0Y2ggKG5vZGUubmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwidzp0clByXCI6XHJcbiAgICAgICAgICAgICAgc3RhdGUucHIgPSBub2RlO1xyXG4gICAgICAgICAgICAgIHN0YXRlLmlzSGVhZGVyID0gISFub2RlLmNoaWxkcmVuLmZpbmQoXHJcbiAgICAgICAgICAgICAgICAoYSkgPT4gYS5uYW1lID09IFwidzp0YmxIZWFkZXJcIlxyXG4gICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgc3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogXCJ0clwiLCBjaGlsZHJlbjogW10sIHByOiBudWxsIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICB0Yyh3WG1sKSB7XHJcbiAgICAgIHJldHVybiB3WG1sLmNoaWxkcmVuLnJlZHVjZShcclxuICAgICAgICAoc3RhdGUsIG5vZGUpID0+IHtcclxuICAgICAgICAgIHN3aXRjaCAobm9kZS5uYW1lKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJ3OnRjUHJcIjpcclxuICAgICAgICAgICAgICBzdGF0ZS5wciA9IG5vZGU7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgc3RhdGUuY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiBzdGF0ZTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHsgdHlwZTogXCJ0Y1wiLCBjaGlsZHJlbjogW10sIHByOiBudWxsIH1cclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBhbHRDaHVuayh3WG1sLCBvZmZpY2VEb2N1bWVudCkge1xyXG4gICAgICBsZXQgcklkID0gd1htbC5hdHRyaWJzW1wicjppZFwiXTtcclxuICAgICAgbGV0IGRhdGEgPSBvZmZpY2VEb2N1bWVudC5nZXRSZWwocklkKTtcclxuXHJcbiAgICAgIGxldCBwYXJ0TmFtZSA9XHJcbiAgICAgICAgb2ZmaWNlRG9jdW1lbnQuZm9sZGVyICtcclxuICAgICAgICBvZmZpY2VEb2N1bWVudC5yZWxzKGBbSWQ9JHtySWR9XWApLmF0dHIoXCJUYXJnZXRcIik7XHJcbiAgICAgIGxldCBjb250ZW50VHlwZSA9IG9mZmljZURvY3VtZW50LmRvY1xyXG4gICAgICAgIC5jb250ZW50VHlwZXMoYE92ZXJyaWRlW1BhcnROYW1lPScke3BhcnROYW1lfSddYClcclxuICAgICAgICAuYXR0cihcIkNvbnRlbnRUeXBlXCIpO1xyXG4gICAgICByZXR1cm4geyB0eXBlOiBcImNodW5rXCIsIGRhdGEsIGNvbnRlbnRUeXBlIH07XHJcbiAgICB9LFxyXG4gICAgZG9jRGVmYXVsdHMod1htbCkge1xyXG4gICAgICByZXR1cm4geyB0eXBlOiBcInN0eWxlXCIgfTtcclxuICAgIH0sXHJcbiAgICBzdHlsZSh3WG1sKSB7XHJcbiAgICAgIHJldHVybiB7IHR5cGU6IFwic3R5bGVcIiwgaWQ6IHdYbWwuYXR0cmlic1tcInc6c3R5bGVJZFwiXSB9O1xyXG4gICAgfSxcclxuICAgIGFic3RyYWN0TnVtKHdYbWwpIHtcclxuICAgICAgcmV0dXJuIHsgdHlwZTogXCJhYnN0cmFjdE51bVwiLCBpZDogd1htbC5hdHRyaWJzW1widzphYnN0cmFjdE51bUlkXCJdIH07XHJcbiAgICB9LFxyXG4gICAgbnVtKHdYbWwpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBcIm51bVwiLFxyXG4gICAgICAgIGlkOiB3WG1sLmF0dHJpYnNbXCJ3Om51bUlkXCJdLFxyXG4gICAgICAgIGFic3RyYWN0TnVtOiB3WG1sLmNoaWxkcmVuLmZpbmQoKGEpID0+IGEubmFtZSA9PSBcInc6YWJzdHJhY3ROdW1JZFwiKVxyXG4gICAgICAgICAgLmF0dHJpYnNbXCJ3OnZhbFwiXSxcclxuICAgICAgfTtcclxuICAgIH0sXHJcbiAgICBsYXRlbnRTdHlsZXMoKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfSxcclxuICAgIG9iamVjdCh3WG1sLCBvZmZpY2VEb2N1bWVudCkge1xyXG4gICAgICBsZXQgb2xlID0gb2ZmaWNlRG9jdW1lbnQuY29udGVudCh3WG1sKS5maW5kKFwib1xcXFw6T0xFT2JqZWN0XCIpO1xyXG4gICAgICBsZXQgdHlwZSA9IG9sZS5hdHRyKFwiUHJvZ0lEXCIpO1xyXG4gICAgICBsZXQgZW1iZWQgPSBvbGUuYXR0cihcIlR5cGVcIikgPT09IFwiRW1iZWRcIjtcclxuICAgICAgbGV0IHJJZCA9IG9sZS5hdHRyKFwicjppZFwiKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBcIm9iamVjdFwiLFxyXG4gICAgICAgIGVtYmVkLFxyXG4gICAgICAgIHByb2c6IHR5cGUsXHJcbiAgICAgICAgZGF0YTogb2ZmaWNlRG9jdW1lbnQuZ2V0UmVsT2xlT2JqZWN0KHJJZCksXHJcbiAgICAgIH07XHJcbiAgICB9LFxyXG4gIH07XHJcbn1cclxuIl19